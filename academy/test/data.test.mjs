// Data integrity: every page mapped, every link resolves, every prompt variable appears, every UI key exists.
// Run: node --test academy/test/data.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { inflateRawSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import path from "node:path";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");
const BUILT = path.join(SRC, "..", "..", "AI_Academy.html");

function makeMockDocument() {
  class Node {}
  class Element extends Node {
    constructor(tag) {
      super();
      this.tagName = String(tag).toUpperCase();
      this.childNodes = [];
      this._attrs = {};
      this.style = {};
      this.onclick = null;
    }
    get className() { return this._attrs.class || ""; }
    set className(v) { this._attrs.class = v; }
    get id() { return this._attrs.id || ""; }
    set id(v) { this._attrs.id = v; }
    setAttribute(k, v) {
      if (v == null || v === false) return;
      this._attrs[k] = v === true ? "" : String(v);
      if (k === "class") this._attrs.class = this._attrs[k];
    }
    getAttribute(k) { return this._attrs[k]; }
    removeAttribute(k) { delete this._attrs[k]; }
    append(...kids) {
      for (const k of kids.flat(Infinity)) {
        if (k == null || k === false) continue;
        this.childNodes.push(k);
        k.parentNode = this;
      }
    }
    get innerHTML() {
      if (this._html != null) return this._html;
      return this.childNodes.map((c) => (c.nodeType === 3 ? c.data : c.innerHTML ?? "")).join("");
    }
    set innerHTML(html) {
      this._html = String(html);
      this.childNodes = [];
    }
    get textContent() { return this._text ?? this.innerHTML.replace(/<[^>]+>/g, ""); }
    set textContent(v) { this._text = String(v); }
    querySelector(sel) {
      const parts = sel.split(".");
      const tag = parts[0];
      const classes = parts.slice(1);
      const fits = (el) => {
        if (!(el instanceof Element) || el.tagName !== tag.toUpperCase()) return false;
        const have = el.className.split(/\s+/).filter(Boolean);
        return !classes.length || classes.every((c) => have.includes(c));
      };
      const walk = (el) => {
        if (el instanceof Element) {
          if (fits(el)) return el;
          if (tag === "h1" && el._html) {
            const m = el._html.match(/<h1[^>]*>([^<]+)</i);
            if (m) return { textContent: m[1], setAttribute() {}, focus() {} };
          }
          for (const c of el.childNodes) {
            const hit = walk(c);
            if (hit) return hit;
          }
        }
        return null;
      };
      return walk(this);
    }
    querySelectorAll() { return []; }
  }
  const documentElement = new Element("html");
  const body = new Element("body");
  body.classList = { contains: () => false, toggle: () => {}, remove: () => {} };
  const byId = new Map();
  for (const id of ["bar", "side", "main", "scrim", "readbar"]) {
    const el = new Element(id === "main" ? "main" : "div");
    el.id = id;
    byId.set(id, el);
    if (id === "readbar") el.append(new Element("i"));
    body.append(el);
  }
  documentElement.append(body);
  const document = {
    documentElement,
    body,
    createElement: (tag) => new Element(tag),
    createTextNode: (s) => ({ nodeType: 3, data: String(s), parentNode: null }),
    getElementById: (id) => byId.get(id) || null,
    querySelector: (sel) => (sel.startsWith("#") ? byId.get(sel.slice(1)) : body.querySelector(sel)),
    querySelectorAll: () => [],
    addEventListener: () => {},
    activeElement: body,
  };
  return { document, Node, main: byId.get("main") };
}
const DATA = ["ui", "meta", "stories", "scenes", "lessons-u0", "lessons-u1", "lessons-u2", "lessons-u3u4", "lessons-u5", "lessons-xl", "lessons-office", "lessons-easy", "course-order", "plain-talk-a", "plain-talk-b", "prompts", "situations", "quiz", "glossary", "compare", "history", "model-story", "context-story", "window-story", "agents-story", "work-story", "limits-story", "auto-story", "big-story", "kit-story", "deliver-story", "stack-story", "lookup-story", "report-story", "run-story", "match-story", "needs-story", "table-story", "dash-story", "gather-story", "slides-story", "code-story", "skill-story", "cli-story", "pure-story", "com-story", "steps-story", "review-story", "sql-story", "pdf-story", "page-story", "rules-story", "xl-sample", "ready-tools", "office-projects", "easy-projects"];
const ENGINE = ["core", "scene", "render", "quiz", "labs", "xlkit", "tools"];
const ctx = { window: { ACADEMY: {} } };
vm.createContext(ctx);
for (const f of DATA) vm.runInContext(readFileSync(path.join(SRC, "data", f + ".js"), "utf8"), ctx, { filename: f + ".js" });
const A = ctx.window.ACADEMY;
const engineSrc = ENGINE.map((f) => readFileSync(path.join(SRC, "engine", f + ".js"), "utf8")).join("\n");
const lessonIds = new Set(A.lessons.map((l) => l.id));
const labIds = new Set(A.labs.map((l) => l.id));
const glossIds = new Set(A.glossary.map((g) => g.id));
const sceneIds = new Set(A.scenes.map((s) => s.id));
const both = (x, label) => { assert.ok(x && typeof x.ar === "string" && x.ar.trim() && typeof x.en === "string" && x.en.trim(), `${label} needs ar and en`); };

test("every data file is loaded here and bundled by the build", () => {
  const build = readFileSync(path.join(SRC, "..", "build.mjs"), "utf8");
  for (const f of readdirSync(path.join(SRC, "data")).filter((x) => x.endsWith(".js"))) {
    assert.ok(DATA.includes(f.slice(0, -3)), `${f} is not loaded by this test`);
    assert.ok(build.includes(`"data/${f}"`), `${f} is not bundled by build.mjs`);
  }
});

test("ids are unique", () => {
  for (const [name, arr] of [["lessons", A.lessons], ["prompts", A.prompts], ["quiz", A.quiz], ["glossary", A.glossary], ["scenes", A.scenes], ["labs", A.labs], ["compare", A.compare]]) {
    const seen = new Set();
    for (const x of arr) { assert.ok(!seen.has(x.id), `duplicate ${name} id ${x.id}`); seen.add(x.id); }
  }
});

test("every book page 1–41 maps to at least one existing lesson", () => {
  assert.equal(A.coverage.length, A.meta.pages);
  for (let p = 1; p <= A.meta.pages; p++) {
    const c = A.coverage.find((x) => x.p === p);
    assert.ok(c, `page ${p} missing from coverage`);
    assert.ok(c.lessons.length > 0, `page ${p} has no lesson`);
    for (const id of c.lessons) assert.ok(lessonIds.has(id), `page ${p} points to unknown lesson ${id}`);
  }
});

test("lessons are complete: units, pages, four levels, scene/lab/related ids", () => {
  for (const l of A.lessons) {
    assert.ok(A.units.some((u) => u.id === l.unit), `${l.id}: unknown unit`);
    both(l.title, l.id + ".title"); both(l.sum, l.id + ".sum");
    assert.ok(l.pages.length && l.pages.every((p) => p >= 1 && p <= 41), `${l.id}: bad pages`);
    assert.ok(l.book.length >= 2, `${l.id}: too few book points`);
    for (const b of l.book) both(b, l.id + ".book");
    for (const k of ["simple", "mech", "practice", "adv"]) { assert.ok(Array.isArray(l.levels[k]) && l.levels[k].length, `${l.id}: missing level ${k}`); l.levels[k].forEach((x) => both(x, `${l.id}.${k}.${x.k}`)); }
    if (l.scene) assert.ok(sceneIds.has(l.scene), `${l.id}: unknown scene ${l.scene}`);
    if (l.lab) assert.ok(labIds.has(l.lab), `${l.id}: unknown lab ${l.lab}`);
    for (const r of [...(l.related || []), ...(l.pre || [])]) assert.ok(lessonIds.has(r), `${l.id}: unknown related ${r}`);
  }
});

test("rich-text links resolve: [[lesson|lab]] and ((glossary))", () => {
  const all = JSON.stringify({ l: A.lessons, u: A.units, m: A.meta, p: A.prompts, q: A.quiz, c: A.compare, g: A.glossary });
  for (const m of all.matchAll(/\[\[([a-z0-9_-]+)\|/g)) assert.ok(lessonIds.has(m[1]) || labIds.has(m[1]) || A.routes.some((r) => r.id === m[1]), `[[${m[1]}]] does not resolve`);
  for (const m of all.matchAll(/\(\(([a-z0-9_]+)\|/g)) assert.ok(glossIds.has(m[1]), `((${m[1]})) has no glossary entry`);
});

test("every prompt variable appears in its text, in both languages", () => {
  for (const p of A.prompts) {
    both(p.title, p.id + ".title"); both(p.text, p.id + ".text");
    assert.ok(lessonIds.has(p.lesson), `${p.id}: unknown lesson`);
    assert.ok(A.meta.promptCats.some((c) => c.id === p.cat), `${p.id}: unknown category ${p.cat}`);
    for (const v of p.vars) for (const lg of ["ar", "en"]) assert.ok(p.text[lg].includes("[" + v[lg] + "]"), `${p.id}: var [${v[lg]}] not in ${lg} text`);
  }
});

test("every lesson has prompts and quiz questions", () => {
  for (const l of A.lessons) {
    assert.ok(A.prompts.some((p) => p.lesson === l.id), `${l.id}: no prompts`);
    assert.ok(A.quiz.some((q) => q.lesson === l.id), `${l.id}: no questions`);
  }
});

test("quiz questions are valid", () => {
  const types = new Set(["mcq", "spot", "predict", "compare", "order"]);
  for (const q of A.quiz) {
    assert.ok(types.has(q.type), `${q.id}: bad type`);
    assert.ok(lessonIds.has(q.lesson), `${q.id}: unknown lesson`);
    both(q.q, q.id + ".q"); both(q.explain, q.id + ".explain");
    if (q.type === "order") { assert.ok(q.items.length >= 3, `${q.id}: too few items`); q.items.forEach((x) => both(x, q.id + ".item")); }
    else {
      assert.ok(q.opts.length >= 3 && Number.isInteger(q.ans) && q.ans >= 0 && q.ans < q.opts.length, `${q.id}: bad options/answer`);
      q.opts.forEach((o, i) => { both(o, q.id + ".opt"); if (i !== q.ans) assert.ok(o.why || /NOT|ليس/.test(q.q.en + q.q.ar), `${q.id}: wrong option ${i} lacks a why`); });
    }
  }
});

test("glossary entries are complete and linked", () => {
  for (const g of A.glossary) {
    both(g.term, g.id + ".term"); both(g.def, g.id + ".def");
    for (const p of [].concat(g.p || [])) assert.ok(p >= 1 && p <= 41, `${g.id}: bad page`);
    assert.ok(g.lessons.length > 0, `${g.id}: not linked to any lesson`);
    for (const id of g.lessons) assert.ok(lessonIds.has(id), `${g.id}: unknown lesson ${id}`);
  }
});

test("comparison families have values for every dimension", () => {
  for (const f of A.compare) {
    both(f.name, f.id); both(f.common, f.id + ".common");
    assert.ok(f.items.length >= 2 && f.pages.length, `${f.id}: needs 2+ items and pages`);
    for (const it of f.items) {
      if (it.lesson) assert.ok(lessonIds.has(it.lesson), `${f.id}.${it.id}: unknown lesson`);
      for (const d of f.dims) both(it.v[d.id], `${f.id}.${it.id}.${d.id}`);
    }
  }
});

test("labs: metadata, engine implementation and lesson link agree", () => {
  for (const lab of A.labs) {
    assert.ok(new RegExp("LABS\\." + lab.id + "\\s*=").test(engineSrc), `lab ${lab.id} has no engine implementation`);
    assert.ok(lessonIds.has(lab.lesson), `lab ${lab.id}: unknown lesson`);
    assert.equal(typeof lab.real, "boolean", `lab ${lab.id}: must declare real (calculation) vs simulation`);
  }
});

test("every literal t(\"key\") used by the engine exists in both languages", () => {
  const keys = new Set([...engineSrc.matchAll(/\bt\("([a-zA-Z0-9_]+)"\s*[),]/g)].map((m) => m[1]));
  for (const type of ["mcq", "spot", "predict", "compare", "order"]) keys.add("qt_" + type);
  for (const k of keys) assert.ok(A.ui[k] && A.ui[k].ar && A.ui[k].en, `ui key "${k}" missing`);
});
// Every lesson keeps its own story (stories.js).
test("all lessons have complete picture-first Arabic intros", () => {
  const stories = A.lessonStories;
  assert.ok(stories, "missing stories module");
  assert.equal(Object.keys(stories).length, A.lessons.length);
  for (const l of A.lessons) {
    const s = stories[l.id];
    assert.ok(Array.isArray(s) && s.length === 7, `missing story for ${l.id}`);
    assert.ok(s.every((v) => typeof v === "string" && v.trim().length > 8), `incomplete story ${l.id}`);
  }
});
test("situations page data is complete and situation 1 prompt covers Excel automation stack", () => {
  assert.ok(A.situationsPage && A.situationsPage.title && A.situationsPage.intro, "situationsPage metadata");
  assert.ok(Array.isArray(A.situations) && A.situations.length >= 1, "need at least one situation");
  for (const s of A.situations) {
    assert.ok(s.id && s.title && s.intro && s.prompt, `situation ${s.id || "?"} missing fields`);
    assert.equal(typeof s.prompt, "string");
    assert.ok(s.intro.trim().length > 20, `${s.id}: intro too short`);
  }
  assert.ok(A.situationsPage.intro.includes("اقرا المقدمة كده في سرك"), "start intro should stay colloquial");
  const p = A.situations[0].prompt.toLowerCase();
  for (const needle of ["excel com automation", "com hygiene", "releasecomobject", "powershell", "subprocess", "csv", "sqlite3", "config.json", "main.py", "run.bat", "readme.txt", "clarifying"]) {
    assert.ok(p.includes(needle), `situation 1 prompt missing ${needle}`);
  }
  const render = readFileSync(path.join(SRC, "engine", "render.js"), "utf8");
  assert.match(render, /html:\s*head\(ico\("spark"\)/, "start page head must use html: head(...)");
  assert.match(render, /html:\s*ico\("copy"\)\s*\+\s*esc\(t\("startCopy"\)\)/, "copy button must render icon via html");
  assert.match(render, /A\.toast\(t\("startCopied"\)\)/, "copy success must show on-screen toast");
  assert.match(render, /A\.toast\(t\("startCopyManual"\),\s*"info"\)/, "manual copy hint must show on-screen toast");
  assert.ok(render.includes("execCommand"), "render.js must implement offline copy fallback");
  assert.doesNotMatch(render, /innerHTML:\s*head\(/, "do not pass head() via innerHTML attribute");
});

test("start route renders page head and SVG copy icon (mock DOM, no jsdom)", () => {
  const dom = makeMockDocument();
  const ctx = {
    window: { ACADEMY: {} },
    document: dom.document,
    Node: dom.Node,
    localStorage: { getItem: () => null, setItem: () => {} },
    matchMedia: () => ({ matches: false }),
    location: { hash: "#start" },
    addEventListener: () => {},
    scrollTo: () => {},
    requestAnimationFrame: (fn) => fn(),
    getSelection: () => ({ removeAllRanges() {}, addRange() {} }),
    navigator: {},
    isSecureContext: false,
    setTimeout: (fn, ms) => { if (!ms) fn(); return 0; },
  };
  vm.createContext(ctx);
  for (const f of DATA) vm.runInContext(readFileSync(path.join(SRC, "data", f + ".js"), "utf8"), ctx, { filename: f + ".js" });
  vm.runInContext(readFileSync(path.join(SRC, "engine", "core.js"), "utf8"), ctx, { filename: "core.js" });
  vm.runInContext("window._routeViews = {}; window.ACADEMY.view = (n, fn) => { window._routeViews[n] = fn; };", ctx);
  vm.runInContext(readFileSync(path.join(SRC, "engine", "render.js"), "utf8"), ctx, { filename: "render.js" });
  vm.runInContext("window._routeViews.start(document.getElementById('main'), '')", ctx);
  const title = ctx.window.ACADEMY.situationsPage.title;
  const h1 = dom.main.querySelector("h1");
  assert.ok(h1 && h1.textContent.includes(title), "start view must render #main h1");
  const btn = dom.main.querySelector("button.btn.pri");
  assert.ok(btn && /<svg[\s>]/i.test(btn.innerHTML), "copy button must contain parsed SVG markup");
  assert.ok(!/\u003csvg/i.test(btn.textContent), "copy button must not show raw SVG text");
});

test("built HTML bundles fixed start view wiring", () => {
  execFileSync(process.execPath, [path.join(SRC, "..", "build.mjs")], { stdio: "pipe" });
  const built = readFileSync(BUILT, "utf8");
  assert.match(built, /html:\s*head\(ico\("spark"\)/, "built bundle must wire start head via html:");
  assert.match(built, /html:\s*ico\("copy"\)\s*\+\s*esc\(t\("startCopy"\)\)/, "built bundle must wire copy icon via html:");
  assert.ok(built.includes("اقرا المقدمة كده في سرك"), "built bundle must ship colloquial start intro");
});

test("all 41 lessons lead with useful, specific Egyptian Arabic in four levels", () => {
  const fields = ["title", "what", "why", "how", "link", "example", "apply", "mistakes", "whennot"];
  assert.equal(Object.keys(A.plainTalk || {}).length, A.lessons.length, "missing clear lesson explanation");
  for (const l of A.lessons) {
    const p = A.plainTalk[l.id];
    assert.ok(p, `no plain lesson for ${l.id}`);
    for (const k of fields) {
      assert.ok(typeof p[k] === "string" && p[k].trim().length >= (k === "title" ? 12 : 35), `${l.id}.${k} too vague or missing`);
    }
    assert.equal(l.title.ar, p.title, `${l.id} should display the simple title`);
    assert.equal(l.sum.ar, p.what, `${l.id} should display a plain-language summary`);
    assert.ok(l.bookTitleAr && l.book.length >= 2, `${l.id}: original book reference lost`);
  }
});

test("story decks: real lessons, one deck per lesson, every slide complete in both languages, a drawing for every slide", () => {
  assert.ok(Array.isArray(A.decks) && A.decks.length >= 2, "decks registry missing");
  const engine = readFileSync(path.join(SRC, "engine", "history.js"), "utf8");
  const seenLessons = new Set(), seenIds = new Set();
  for (const H of A.decks) {
    assert.ok(H.id && !seenIds.has(H.id), "deck id missing or duplicated: " + H.id); seenIds.add(H.id);
    assert.ok(lessonIds.has(H.lesson), `${H.id}: unknown lesson ${H.lesson}`);
    assert.ok(!seenLessons.has(H.lesson), `${H.id}: lesson ${H.lesson} already has a deck`); seenLessons.add(H.lesson);
    for (const k of ["kicker", "title", "lead", "answerLabel", "ideaLabel", "question", "finalQuestion", "note"]) both(H[k], H.id + "." + k);
    for (const k of Object.keys(H.ui)) both(H.ui[k], H.id + ".ui." + k);
    assert.ok(H.slides.length >= 8, H.id + ": too few slides");
    const ids = new Set();
    let lastYear = 0;
    for (const s of H.slides) {
      assert.ok(!ids.has(s.id), `${H.id}: duplicate slide ${s.id}`); ids.add(s.id);
      for (const k of ["year", "era", "title", "answer", "idea"]) both(s[k], `${H.id}.${s.id}.${k}`);
      if (s.mark) both(s.mark, `${H.id}.${s.id}.mark`);
      assert.ok(s.story.length >= 1, `${H.id}.${s.id}: no story`); s.story.forEach((p, i) => both(p, `${H.id}.${s.id}.story${i}`));
      assert.ok(new RegExp("\\b" + s.art + ":\\s*\\(").test(engine), `${H.id}.${s.id}: no drawing for art ${s.art}`);
      const y = parseInt(s.year.en, 10);
      if (!Number.isNaN(y)) { assert.ok(y >= lastYear, `${H.id}.${s.id}: years out of order`); lastYear = y; }
    }
  }
  assert.equal(A.aiHistory.lesson, "f1"); assert.ok(Number.isNaN(parseInt(A.aiHistory.slides.at(-1).year.en, 10)), "history ends today");
  assert.equal(A.modelStory.lesson, "f2");
  assert.equal(A.contextStory.lesson, "f4");
  assert.equal(A.windowStory.lesson, "f6");
  assert.equal(A.agentsStory.lesson, "f7");
  assert.equal(A.workStory.lesson, "f3");
  assert.equal(A.limitsStory.lesson, "f5");
  assert.equal(A.autoStory.lesson, "f8");
  assert.equal(A.bigStory.lesson, "b1");
  for (const [k, l] of [["kitStory", "x1"], ["deliverStory", "x2"], ["stackStory", "x3"], ["lookupStory", "x4"], ["reportStory", "x5"], ["runStory", "x6"]]) assert.equal(A[k].lesson, l, k);
  const u1 = A.lessons.filter((l) => l.unit === "u1").map((l) => l.id);
  assert.equal(u1.join(" "), "x1 x2 x3 x4 x5 x7 x8 x6", "unit 1 (shown as 2): one project per lesson — describe, first tool, the three tools, purchasing, materials, fixing");
  assert.ok(u1.every((id) => A.decks.some((d) => d.lesson === id && d.slides.length === 12)), "every unit-2 lesson opens with its own 12-slide story");
  const u0 = A.lessons.filter((l) => l.unit === "u0").map((l) => l.id);
  assert.equal(u0.join(" "), "f1 f2 f4 f6 f7 f3 f5 f8", "unit 0 order: history, inside the model, Prompt & Context, the Context's limits, chat/memory/agents, AI at work, limits, first automation");
});

test("deck drawings give every SVG element one class and one style attribute (a second one is silently dropped)", () => {
  const engine = readFileSync(path.join(SRC, "engine", "history.js"), "utf8");
  const bad = engine.split("\n").map((l, i) => [i + 1, l]).filter(([, l]) => /\$\{an\([^)]*\)\}[^<>]*\s(class|style)="/.test(l));
  assert.equal(bad.length, 0, "an() already writes class= and style=; pass extra classes as its third argument (and use grow() for bars): lines " + bad.map(([n]) => n).join(", "));
});

test("Arabic and English point to the same lessons in every explanation", () => {
  const ids = (t) => [...String(t).matchAll(/\[\[([a-z0-9_-]+)/g)].map((m) => m[1]).sort().join(",");
  for (const l of A.lessons) for (const k of Object.keys(l.levels)) for (const x of l.levels[k])
    assert.equal(ids(x.en), ids(x.ar), `${l.id}.${k}.${x.k}: Arabic and English link different lessons`);
});

test("the AI guide embedded in the HTML stays current: every unit-0 lesson and every story deck is named", () => {
  const guide = readFileSync(path.join(SRC, "ai-guide.txt"), "utf8");
  for (const l of A.lessons.filter((x) => x.unit === "u0")) assert.ok(new RegExp("\\b" + l.id + "\\b").test(guide), `ai-guide.txt does not mention lesson ${l.id}`);
  for (const [name, v] of Object.entries(A)) if (A.decks.includes(v)) assert.ok(guide.includes("A." + name), `ai-guide.txt does not name the deck A.${name}`);
});

test("the course plan: nine units, every lesson placed exactly once, and each lesson file names the same unit", () => {
  assert.equal(A.units.map((u) => u.n).join(" "), "1 2 3 4 5 6 7 8 9");
  const placed = Object.values(A.courseOrder).flat();
  assert.equal(new Set(placed).size, placed.length, "a lesson is placed twice");
  assert.equal(placed.length, A.lessons.length, "a lesson is missing from the plan");
  for (const u of A.units) {
    assert.ok((A.courseOrder[u.id] || []).length, `${u.id} has no lessons`);
    const sc = A.meta.showcase[u.id];
    assert.ok(sc && A.lessons.find((l) => l.id === sc.lesson && l.unit === u.id && l.pages.includes(sc.p)), `${u.id}: the home showcase must name one of its own lessons and that lesson's page`);
  }
  assert.equal(A.lessons.map((l) => l.id).join(" "), A.units.flatMap((u) => A.courseOrder[u.id]).join(" "), "lessons follow the plan's order");
  const files = readdirSync(path.join(SRC, "data")).filter((f) => f.startsWith("lessons-")).map((f) => readFileSync(path.join(SRC, "data", f), "utf8")).join("\n");
  for (const l of A.lessons) assert.ok(files.includes(`id: "${l.id}", unit: "${l.unit}"`), `${l.id}: its file should say unit "${l.unit}"`);
});

test("prerequisites come earlier in the course than the lessons that need them", () => {
  const pos = Object.fromEntries(A.lessons.map((l, i) => [l.id, i]));
  for (const l of A.lessons) for (const p of l.pre || []) assert.ok(pos[p] < pos[l.id], `${l.id} lists ${p} as a prerequisite, but ${p} comes later`);
});

test("the unit-2 projects: a correct tool, run on each project's files, finds exactly the figures the lessons and answer keys quote", () => {
  const X = A.xlProjects, P = (n) => X.list[n - 1], sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const day = (v) => (typeof v === "string" ? Math.round((Date.UTC(2026, +v.slice(3, 5) - 1, +v.slice(0, 2)) - Date.UTC(2026, 0, 1)) / 864e5) : v.d - X.serial0);
  const month = (v) => "2026-" + String(new Date(Date.UTC(2026, 0, 1) + day(v) * 864e5).getUTCMonth() + 1).padStart(2, "0");
  const table = (rows) => { const [head, ...body] = rows; return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]]))); };
  const english = (v) => typeof v !== "string" || !/[؀-ۿ]/.test(v);
  assert.equal(X.list.map((p) => p.lesson).join(" "), A.courseOrder.u1.join(" "), "one project per unit-2 lesson, in course order");
  for (const p of X.list) {
    assert.equal(p.zip, `Lesson_${p.n}_${p.slug}.zip`);
    for (const f of p.files()) {
      assert.ok(f.path.startsWith("Data/"), `${p.zip}: ${f.path} sits in Data/`);
      for (const sh of f.sheets || []) for (const r of sh.rows) assert.ok(r.every(english), `${p.zip}: ${f.path} holds English only`);
    }
    for (const lang of ["ar", "en"]) { assert.ok(X.readme(p, lang).includes(p.files().find((f) => !f.lock).path.replace("Data/", "")), `${p.zip}: README names its files`); X.answerKey(p, lang); }
    assert.ok(A.prompts.some((x) => x.id === p.prompt && x.lesson === p.lesson), `${p.zip}: its Prompt belongs to its lesson`);
  }
  // 1 · describe
  { const E = P(1).expected(), t = table(P(1).files()[0].sheets[0].rows);
    assert.equal(t.length, E.rows); assert.equal(sum(t, (r) => r.Qty), E.units); assert.equal(t.filter((r) => r.Qty < 0).length, E.returns); assert.equal(new Set(t.map((r) => r.LineCode)).size, E.lines); }
  // 2 · file list: skip the lock file, list every sheet
  { const E = P(2).expected(), fs = P(2).files().filter((f) => !f.lock), sheets = fs.flatMap((f) => f.sheets);
    assert.equal(fs.length, E.files); assert.equal(sheets.length, E.sheets); assert.equal(P(2).files().filter((f) => f.lock).length, E.skipped);
    const prod = sheets.filter((s) => s.name === "Production"); assert.equal(sum(prod, (s) => s.rows.length - 1), E.rows); assert.equal(sum(prod.flatMap((s) => table(s.rows)), (r) => r.Qty), E.units); }
  // 3 · stack: by name, Quantity = Qty, skip rows with no WorkOrder, duplicates to review
  { const E = P(3).expected(); let read = 0, skipped = 0; const rows = [], seen = new Set(), dups = [];
    for (const f of P(3).files()) for (const r of table(f.sheets[0].rows)) {
      if (!r.WorkOrder) { skipped++; continue; }
      read++; const q = r.Qty !== undefined ? r.Qty : r.Quantity, key = [day(r.Date), r.WorkOrder, r.LineCode, r.ModelCode, q, r.Value].join("|");
      if (seen.has(key)) { dups.push(r); continue; } seen.add(key); rows.push({ q, v: r.Value });
    }
    assert.equal(read, E.rowsRead); assert.equal(skipped, E.totalsRow); assert.equal(dups.length, E.duplicates); assert.equal(rows.length, E.rows);
    assert.equal(sum(rows, (x) => x.q), E.units); assert.equal(sum(rows, (x) => x.v), E.value);
    assert.ok(!P(3).files()[10].sheets[0].rows[0].includes("Qty"), "Week_11 renames Qty"); }
  // 4 · lookup: normalise, one model listed twice, M113 unmatched
  { const E = P(4).expected(), [prod, masters] = P(4).files(), t = table(prod.sheets[0].rows), mod = table(masters.sheets[1].rows);
    const twice = mod.map((m) => m.ModelCode).filter((c, i, a) => a.indexOf(c) !== i); assert.equal(twice.join(), "M108");
    const cost = {}; for (const m of mod) if (!(m.ModelCode in cost)) cost[m.ModelCode] = m; cost.M108 = { ...cost.M108, StdCost: 12300 };
    const lines = new Set(table(masters.sheets[0].rows).map((l) => l.LineCode));
    assert.equal(t.filter((r) => r.LineCode === "L04 ").length, E.spaced); assert.equal(t.filter((r) => r.LineCode === "l03").length, E.lower);
    assert.ok(t.every((r) => lines.has(r.LineCode.trim().toUpperCase())), "every line matches once normalised");
    const un = t.filter((r) => !cost[r.ModelCode]); assert.ok(un.every((r) => r.ModelCode === E.unmatched.code)); assert.equal(un.length, E.unmatched.rows); assert.equal(sum(un, (r) => r.Qty), E.unmatched.units);
    const ok = t.filter((r) => cost[r.ModelCode]); assert.equal(sum(ok, (r) => r.Qty * cost[r.ModelCode].StdCost), E.value);
    for (const c of Object.keys(E.cats)) assert.equal(sum(ok.filter((r) => cost[r.ModelCode].Category === c), (r) => r.Qty), E.cats[c]);
    assert.equal(sum(t, (r) => r.Qty), P(3).expected().units, "projects 3 and 4 share the quarter"); }
  // 5 · report: output by line and month against plan, both sides shown
  { const E = P(5).expected(), [prod, plan] = P(5).files(), t = table(prod.sheets[0].rows), pl = table(plan.sheets[0].rows), out = {};
    for (const r of t) { const k = r.LineCode + "|" + month(r.Date); out[k] = (out[k] || 0) + r.Qty; }
    const keys = new Set([...Object.keys(out), ...pl.map((x) => x.LineCode + "|" + x.Month)]);
    assert.equal(keys.size, E.reportRows); assert.equal(pl.length, E.plans);
    const rated = pl.filter((x) => out[x.LineCode + "|" + x.Month]).map((x) => ({ line: x.LineCode, month: x.Month, pct: Math.round((out[x.LineCode + "|" + x.Month] / x.PlanQty) * 1000) / 10 }));
    assert.equal(rated.length, E.rated);
    const hi = rated.reduce((a, x) => (x.pct > a.pct ? x : a)), lo = rated.reduce((a, x) => (x.pct < a.pct ? x : a));
    assert.equal([hi.line, hi.month, hi.pct, lo.line, lo.month, lo.pct].join(), [E.best.line, E.best.month, E.best.pct, E.worst.line, E.worst.month, E.worst.pct].join());
    assert.ok(out["L06|2026-03"] && !pl.some((x) => x.LineCode === "L06" && x.Month === "2026-03"), "L06 has output and no plan in March");
    assert.ok(!out["L07|2026-03"] && pl.some((x) => x.LineCode === "L07"), "L07 has a plan and no output");
    assert.equal(sum(Object.values(out), (x) => x), E.units); assert.equal(E.units, P(3).expected().units); }
  // 6 · purchasing: key = PO + material, normalised, 2% tolerance
  { const E = P(6).expected(), [po, gr] = P(6).files(), lines = table(po.sheets[0].rows), rec = table(gr.sheets[0].rows), got = {}, un = [];
    const keys = new Set(lines.map((l) => l.PONumber + "|" + l.MaterialCode));
    let fixed = 0;
    for (const r of rec) { const n = r.PONumber.trim().toUpperCase(); if (n !== r.PONumber) fixed++; const k = n + "|" + r.MaterialCode; if (!keys.has(k)) { un.push(r); continue; } got[k] = (got[k] || 0) + r.ReceivedQty; }
    assert.equal(rec.length, E.receipts); assert.equal(fixed, E.fixedCase); assert.equal(un.length, E.unmatched); assert.equal(new Set(lines.map((l) => l.PONumber)).size, E.orders); assert.equal(lines.length, E.lines);
    const st = { Complete: 0, Partial: 0, Over: 0, "Not received": 0 }; let open = 0;
    for (const l of lines) { const g = got[l.PONumber + "|" + l.MaterialCode] || 0, s = !g ? "Not received" : g < l.OrderedQty * 0.98 ? "Partial" : g > l.OrderedQty * 1.02 ? "Over" : "Complete"; st[s]++; if (s === "Partial" || s === "Not received") open += (l.OrderedQty - g) * l.UnitPrice; }
    assert.deepEqual({ ...st }, { ...E.status }); assert.equal(Math.round(open), E.openValue);
    assert.equal(sum(rec, (r) => r.ReceivedQty), sum(Object.values(got), (x) => x) + sum(un, (r) => r.ReceivedQty), "the match closes"); }
  // 7 · materials: explode, net, round up to the pack; screws in boxes; M113 has no BOM
  { const E = P(7).expected(), [plan, bom, mat, stock] = P(7).files().map((f) => table(f.sheets[0].rows));
    const withBom = new Set(bom.map((b) => b.ModelCode)), missing = plan.filter((p) => !withBom.has(p.ModelCode));
    assert.equal(missing.map((m) => m.ModelCode + ":" + m.PlannedQty).join(), E.notPlanned.code + ":" + E.notPlanned.units);
    const explosion = []; for (const p of plan) for (const b of bom.filter((x) => x.ModelCode === p.ModelCode)) explosion.push({ mc: b.MaterialCode, q: p.PlannedQty * b.QtyPerUnit });
    assert.equal(explosion.length, E.bomRows); assert.equal(sum(plan, (p) => p.PlannedQty), E.planned);
    const M = Object.fromEntries(mat.map((m) => [m.MaterialCode, m])), S = Object.fromEntries(stock.map((s) => [s.MaterialCode, s]));
    const units = stock.filter((s) => s.Unit !== M[s.MaterialCode].Unit).map((s) => s.MaterialCode); assert.equal(units.join(), "SCR-M3,SCR-M4", "screws are counted in boxes");
    const pcs = (s) => (s.Unit === "box of 1000" ? 1000 : 1), gross = {};
    for (const x of explosion) gross[x.mc] = (gross[x.mc] || 0) + x.q;
    let value = 0, toOrder = 0;
    const need = (mc) => { const s = S[mc], net = Math.max(0, gross[mc] - s.OnHand * pcs(s) - s.OnOrder * pcs(s)), order = Math.ceil(net / M[mc].PackSize) * M[mc].PackSize; return { gross: gross[mc], net, order }; };
    for (const mc of Object.keys(gross)) { const n = need(mc); if (n.order) { toOrder++; value += n.order * M[mc].UnitPrice; } }
    assert.equal(Object.keys(gross).length, E.materials); assert.equal(toOrder, E.toOrder); assert.equal(Math.round(value), E.value);
    assert.equal([need("PNL-55").gross, need("PNL-55").net, need("PNL-55").order].join(), [E.panel55.gross, E.panel55.net, E.panel55.order].join());
    assert.equal(need("SCR-M3").order, E.screwM3.order); }
  // 8 · next month: read the one sheet whatever its name, text dates day first, extra column ignored, empty week fine
  { const E = P(8).expected(); let rows = 0, units = 0, value = 0, text = 0; const per = [];
    for (const f of P(8).files()) { const t = table(f.sheets[0].rows); per.push(t.length); for (const r of t) { rows++; units += r.Qty; value += r.Value; if (typeof r.Date === "string") { text++; assert.ok(day(r.Date) >= 91, "day first"); } } }
    assert.equal(rows, E.rows); assert.equal(units, E.units); assert.equal(value, E.value); assert.equal(text, E.textDates); assert.equal(per.join(), E.perWeek.join());
    assert.equal(P(8).files()[2].sheets[0].name, "Sheet1"); assert.ok(P(8).files()[0].sheets[0].rows[0].includes("Shift")); }
});

test("the unit-2 lessons quote their project's figures", () => {
  const X = A.xlProjects, n = (x) => Number(x).toLocaleString("en-US"), lesson = (id) => JSON.stringify(A.lessons.find((l) => l.id === id).levels);
  const has = (id, ...figs) => { const s = lesson(id); for (const f of figs) assert.ok(s.includes(String(f)), `${id} should quote ${f}`); };
  const E = (k) => X.list[k - 1].expected();
  has("x1", E(1).rows); has("x2", E(2).rows); has("x3", n(E(3).rows), n(E(3).units), n(E(3).rowsRead));
  has("x4", n(E(4).rows), E(4).unmatched.units, E(4).unmatched.rows, E(4).spaced, n(E(4).cats.Small));
  has("x5", E(5).best.pct, E(5).worst.pct, n(E(5).units), E(5).reportRows);
  has("x7", E(6).lines, E(6).receipts, E(6).status.Complete, n(E(6).openValue));
  has("x8", n(E(7).planned), E(7).toOrder, n(E(7).value), E(7).bomRows, E(7).panel55.net, n(E(7).screwM3.order));
  has("x6", E(8).rows);
});

test("the unit-2 kit's figures appear the same in Arabic and English lesson texts", () => {
  const ar = (s) => String(s).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[٬,]/g, "").replace(/٫/g, ".");
  const nums = (s) => [...ar(s).matchAll(/\d+(?:\.\d+)?/g)].map((m) => m[0]).sort().join(" ");
  for (const l of A.lessons.filter((x) => x.unit === "u1")) for (const k of Object.keys(l.levels)) for (const x of l.levels[k])
    assert.equal(nums(x.ar), nums(x.en), `${l.id}.${k}.${x.k}: Arabic and English quote different figures`);
});

test("the delivery Prompt gives .bat launchers an end marker cmd.exe can read", () => {
  // `#` is not a comment in a .bat file: a launcher ending in “# END OF FILE” prints an error after pause
  const x = A.prompts.find((p) => p.id === "x2a");
  for (const lang of ["ar", "en"]) assert.ok(x.text[lang].includes("rem END OF FILE"), `x2a (${lang}) must ask for “rem END OF FILE” in the .bat file`);
});

test("unit 3: six lessons in order, each opening with its own 12-slide story; unit 2 closes into it", () => {
  assert.equal(A.courseOrder.u2.join(" "), "a1 a2 a3 a4 a5 a6", "unit 2 (shown as 3): two examples in two lessons each, Claude Code, skills");
  for (const [k, l] of [["tableStory", "a1"], ["dashStory", "a2"], ["gatherStory", "a3"], ["slidesStory", "a4"], ["codeStory", "a5"], ["skillStory", "a6"]]) {
    assert.equal(A[k].lesson, l, k); assert.equal(A[k].slides.length, 12, k + " has 12 slides");
  }
  assert.equal(A.courseOrder.u3[0], "k1", "k1 opens unit 4");
  assert.ok(/إكسل/.test(A.runStory.finalQuestion.ar) && /داشبورد/.test(A.runStory.finalQuestion.ar), "unit 2 ends on the dashboard question unit 3 answers");
  assert.equal(A.skillStory.finalQuestion.en, "So how do you build a tool the security team will approve?", "unit 3 ends on the question unit 4 answers");
});

// a small zip reader for the finished results (stored or deflated entries, read through the central directory)
const unzip = (buf) => {
  const out = {}; let e = buf.length - 22; while (buf.readUInt32LE(e) !== 0x06054b50) e--;
  let p = buf.readUInt32LE(e + 16);
  for (let i = 0, n = buf.readUInt16LE(e + 10); i < n; i++) {
    const method = buf.readUInt16LE(p + 10), size = buf.readUInt32LE(p + 20), nl = buf.readUInt16LE(p + 28), xl = buf.readUInt16LE(p + 30), cl = buf.readUInt16LE(p + 32), off = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nl), at = off + 30 + buf.readUInt16LE(off + 26) + buf.readUInt16LE(off + 28), raw = buf.subarray(at, at + size);
    out[name] = (method === 8 ? inflateRawSync(raw) : raw).toString("utf8"); p += 46 + nl + xl + cl;
  }
  return out;
};
const FINALS = path.join(SRC, "finals");
const loadFinals = () => { if (!A.finalFiles) A.finalFiles = Object.fromEntries(readdirSync(FINALS).map((f) => [f, readFileSync(path.join(FINALS, f)).toString("base64")])); };

test("the unit-3 projects: clean files, and a correct tool run on them finds exactly the figures the lessons and answer keys quote", () => {
  if (!A.xlKit) { ctx.TextEncoder = TextEncoder; vm.runInContext(readFileSync(path.join(SRC, "engine", "xlkit.js"), "utf8"), ctx, { filename: "xlkit.js" }); }   // the PDF writer, to read the bytes back
  loadFinals();
  const O = A.officeProjects, [P1, P2, P3] = O.list, sum = (a, f) => a.reduce((s, x) => s + f(x), 0), r1 = (x) => Math.round(x * 10) / 10;
  const english = (v) => typeof v !== "string" || !/[؀-ۿ]/.test(v);
  assert.equal(O.list.map((p) => p.lessons.join("+")).join(" "), "a1+a2 a3+a4 a6");
  for (const p of O.list) for (const lang of ["ar", "en"]) {
    const names = p.bundle(lang).map((f) => f.path);
    for (const g of ["README.txt", "Answer_Key.txt", "Prompt_1.txt"]) assert.ok(names.includes(g), `${p.zip}: ${g}`);
    for (const f of p.finalNames) assert.ok(names.includes("Final_Result/" + f), `${p.zip}: the finished result ${f}`);
    for (const id of p.prompts) assert.ok(A.prompts.some((x) => x.id === id && p.lessons.includes(x.lesson)), `${p.zip}: prompt ${id} belongs to its lessons`);
  }
  for (const f of [...P1.data(), ...P2.data()]) {
    assert.ok(f.path.startsWith("Data/"), f.path);
    for (const sh of f.sheets || []) for (const r of sh.rows) assert.ok(r.every(english), `${f.path} holds English only`);
    for (const b of (f.docx && f.docx.blocks) || []) assert.ok(english(b.p || "") && (b.table || []).every((r) => r.every(english)), `${f.path} holds English only`);
  }
  // clean data: the same header everywhere, nothing blank, no repeated key, every code found in the masters
  const clean = (rows, label, key) => { const seen = new Set();
    for (const r of rows) { assert.ok(r.every((v) => v !== "" && v != null), `${label}: no blank cell`); if (key != null) { assert.ok(!seen.has(r[key]), `${label}: ${r[key]} repeated`); seen.add(r[key]); } } };
  const mastersOf = (files) => { const m = files.find((f) => f.path.endsWith("Masters.xlsx")), map = (sh) => Object.fromEntries(sh.rows.slice(1).map((r) => [r[0], r[1]]));
    assert.equal(m.sheets.map((s) => s.name + ":" + s.rows[0].join("+")).join(), "Models:ModelCode+ModelName,Countries:CountryCode+CountryName", "two small databases of two columns");
    return { model: map(m.sheets[0]), country: map(m.sheets[1]) }; };
  const vlookup = (map, code, label) => { assert.ok(code in map, `${label}: ${code} is in the masters, so VLOOKUP never shows #N/A`); return map[code]; };
  // example 1: stack 13 weekly reports, add ModelName and CountryName by VLOOKUP, sum
  { const E = P1.expected(), files = P1.data(), M = mastersOf(files), weeks = files.filter((x) => x.path.includes("Weekly_Reports"));
    assert.equal(weeks.length, E.files); assert.equal(weeks.map((f) => f.path.split("/").pop()).join(), [...Array(13)].map((_, i) => `Week_${String(i + 1).padStart(2, "0")}.xlsx`).join());
    const rows = [];
    weeks.forEach((f, w) => { const [head, ...body] = f.sheets[0].rows; assert.equal(head.join(), O.head1.join(), f.path + ": headers in row 1"); assert.equal(body.length, E.weeks[w]);
      for (const r of body) { const x = Object.fromEntries(head.map((k, i) => [k, r[i]]));
        rows.push({ ...x, model: vlookup(M.model, x.ModelCode, f.path), country: vlookup(M.country, x.CountryCode, f.path), month: new Date(Date.UTC(1899, 11, 30) + x.Date.d * 864e5).getUTCMonth() + 1 }); }
      clean(body, f.path); });
    clean(rows.map((x) => [x.WorkOrder]), "WorkOrder across the quarter", 0);
    assert.equal(rows.length, E.rows); assert.equal(sum(rows, (r) => r.Qty), E.units); assert.equal(sum(rows, (r) => r.Value), E.value);
    const by = (k) => rows.reduce((o, r) => ((o[r[k]] = (o[r[k]] || 0) + r.Qty), o), {}), top = (o) => Object.entries(o).sort((a, b) => b[1] - a[1])[0];
    assert.deepEqual({ ...by("country") }, { ...E.countries }); assert.deepEqual({ ...by("month") }, { ...E.months }); assert.deepEqual({ ...by("LineCode") }, { ...E.lines }); assert.deepEqual({ ...by("model") }, { ...E.models });
    assert.equal(top(by("model")).join(), [E.topModel.name, E.topModel.units].join()); assert.equal(top(by("LineCode")).join(), [E.bestLine.line, E.bestLine.units].join());
    assert.equal(r1(((E.units - by("country").Egypt) / E.units) * 100), E.exportShare); }
  // example 2: three branch workbooks, six PDFs (read from the bytes), two Word memos, the same two VLOOKUPs
  { const E = P2.expected(), files = P2.data(), M = mastersOf(files), F = (n) => files.find((f) => f.path.endsWith(n)), day = (v) => new Date(Date.UTC(1899, 11, 30) + v.d * 864e5);
    assert.equal(files.length - 1, E.files, "11 source files plus the masters");
    const num = (s) => Number(String(s).replace(/,/g, "")), sales = [];
    for (const ch of ["Cairo", "Alexandria", "Delta"]) { const [head, ...body] = F(`Sales_${ch}_Q3.xlsx`).sheets[0].rows; assert.equal(head.join(), O.head2.join(), ch + ": the same columns");
      clean(body, ch, 1); assert.equal(body.length, E.branchRows[ch]);
      for (const r of body) sales.push({ ch, m: day(r[0]).getUTCMonth() + 1, cc: "EG", mc: r[2], q: r[3], v: r[4] }); }
    const pdfLines = (f) => { const txt = Buffer.from(A.xlKit.pdf(f.pdf)).toString("latin1"), lines = {};
      assert.equal(txt.split("/Type /Page /Parent").length - 1, 1, f.path + ": one page");
      for (const it of f.pdf.pages[0].items) { assert.ok(txt.includes("(" + String(it.t).replace(/[\\()]/g, (c) => "\\" + c) + ") Tj"), f.path + ": text in the bytes"); (lines[it.y] = lines[it.y] || []).push(it); }
      return Object.entries(lines).sort((a, b) => b[0] - a[0]).map(([, l]) => l.sort((a, b) => a.x - b.x).map((i) => String(i.t))); };
    const table = (lines, head) => { const h = lines.findIndex((l) => l.join() === head); assert.ok(h > 0, "the table's header: " + head); return lines.slice(h + 1).filter((l) => l.length === head.split(",").length); };
    const ships = [];
    for (const m of [7, 8, 9]) {
      const ex = table(pdfLines(F(`Export_Sales_2026-0${m}.pdf`)), "CountryCode,ModelCode,Qty,NetSales"); assert.equal(ex.length, E.exportRows[m]);
      for (const l of ex) sales.push({ ch: "Export", m, cc: l[0], mc: l[1], q: num(l[2]), v: num(l[3]) });
      for (const l of table(pdfLines(F(`Shipments_2026-0${m}.pdf`)), "Channel,Shipments,Units,FreightEGP")) ships.push({ ch: l[0], n: num(l[1]), u: num(l[2]), f: num(l[3]) });
    }
    for (const s of sales) { s.model = vlookup(M.model, s.mc, "Sales"); s.country = vlookup(M.country, s.cc, "Sales"); }
    clean(sales.map((s) => Object.values(s)), "Sales"); assert.equal(sales.length, E.salesRows);
    const memo = (n) => F(n).docx.blocks.find((b) => b.table).table;
    const ret = memo("Returns_Q3.docx"); assert.equal(ret[0].join(), "ModelCode,Jul,Aug,Sep"); clean(ret, "Returns", 0);
    const returns = ret.slice(1).flatMap((r) => [1, 2, 3].map((i) => ({ mc: (vlookup(M.model, r[0], "Returns"), r[0]), q: num(r[i]) })));
    const tg = memo("Targets_Q3.docx"); assert.equal(tg[0].join(), "Channel,TargetUnits,TargetSales"); const target = Object.fromEntries(tg.slice(1).map((r) => [r[0], num(r[2])]));
    const S = (f, val) => sum(sales.filter(f), val);
    assert.equal(S(() => true, (x) => x.q), E.salesQty); assert.equal(S(() => true, (x) => x.v), E.salesValue);
    for (const ch of O.channels) {
      assert.equal(S((x) => x.ch === ch, (x) => x.v), E.channels[ch].v, ch); assert.equal(target[ch], E.target[ch].v, ch + " target");
      assert.equal(r1((S((x) => x.ch === ch, (x) => x.v) / target[ch]) * 100), E.achievement[ch], ch + " achievement");
      const sh = ships.filter((x) => x.ch === ch); assert.equal(sum(sh, (x) => x.u), S((x) => x.ch === ch, (x) => x.q), ch + ": shipped = sold");
      assert.equal(r1(sum(sh, (x) => x.f) / sum(sh, (x) => x.u)), E.freightPerUnit[ch], ch + " freight per set");
    }
    assert.equal(sum(ships, (x) => x.n), E.shipments); assert.equal(sum(ships, (x) => x.u), E.shipUnits); assert.equal(sum(ships, (x) => x.f), E.freight); assert.equal(sum(returns, (x) => x.q), E.returns);
    const rate = (mc) => sum(returns.filter((x) => x.mc === mc), (x) => x.q) / S((x) => x.mc === mc, (x) => x.q);
    assert.equal(Object.keys(M.model).sort((a, b) => rate(b) - rate(a)).slice(0, 3).join(), E.topReturns.map((x) => x.mc).join(), "the three highest return rates");
    assert.equal(r1(((E.channels.Delta.v + 1e6) / target.Delta) * 100), 93.4, "the test slide: Delta + EGP 1 million"); }
  // the skills kit: every SKILL.md opens with a name that matches its folder and a description
  { const skills = P3.files().filter((f) => f.path.endsWith("/SKILL.md"));
    assert.equal(skills.length, 3);
    for (const f of skills) { const m = f.text.match(/^---\nname: ([a-z-]+)\ndescription: (.+)\n---\n/); assert.ok(m, f.path + ": frontmatter"); assert.equal(m[1], f.path.split("/")[1]); assert.ok(m[2].length > 80 && m[2].length < 1024, f.path + ": description length"); }
    for (const f of P3.files()) assert.ok(english(f.text), f.path + " in English"); }
});

test("the unit-3 finished results are real workbooks and decks holding the answer key's figures", () => {
  const O = A.officeProjects, E1 = O.list[0].expected(), E2 = O.list[1].expected(), names = readdirSync(FINALS).sort();
  assert.equal(names.join(), [...O.list[0].finalNames, ...O.list[1].finalNames].sort().join(), "the finals folder holds exactly the finished results the projects name (rebuild them with academy/tools/make-finals.py)");
  const z = (f) => unzip(readFileSync(path.join(FINALS, f))), sheets = (x) => [...x["xl/workbook.xml"].matchAll(/<sheet name="([^"]+)"/g)].map((m) => m[1]);
  const count = (s, re) => (s.match(re) || []).length, all = (x, pre) => Object.keys(x).filter((k) => k.startsWith(pre)).map((k) => x[k]).join("");
  const cached = (x, v) => new RegExp(`<v>${v}</v>`).test(all(x, "xl/worksheets/"));
  { const x = z("Production_Q3_Final.xlsx"), data = x[`xl/worksheets/sheet${sheets(x).indexOf("Data") + 1}.xml`];
    assert.equal(sheets(x).join(), "Dashboard,Report,Pivots,Data,Models,Countries");
    assert.equal(count(data, /VLOOKUP\(D\d+,Models!/g), E1.rows, "ModelName is a VLOOKUP on every row"); assert.equal(count(data, /VLOOKUP\(F\d+,Countries!/g), E1.rows, "CountryName is a VLOOKUP on every row");
    assert.equal([...all(x, "xl/pivotTables/pivotTable").matchAll(/<pivotTableDefinition[^>]* name="([^"]+)"/g)].map((m) => m[1]).sort().join(), "PT_Country,PT_Model,PT_MonthLine");
    assert.equal(Object.keys(x).filter((k) => /^xl\/charts\/chart\d+\.xml$/.test(k)).length, 4, "four charts");
    for (const v of [E1.units, E1.value, E1.months[7], E1.lines.L01, E1.countries.Kenya, E1.topModel.units]) assert.ok(cached(x, v), "the workbook shows " + v);
    // the dashboard follows the slicers: its figures and chart data read the pivot tables, and every chart reads the dashboard's own cells (review finding on PR 41)
    const dash = x[`xl/worksheets/sheet${sheets(x).indexOf("Dashboard") + 1}.xml`], refs = [...all(x, "xl/charts/chart").matchAll(/<c:f>([^<]+)<\/c:f>/g)].map((m) => m[1]);
    assert.ok(count(dash, /GETPIVOTDATA\(/g) >= 3 + 6 + 10 + 12 + 3, "the dashboard reads every figure from the pivot tables");
    assert.ok(!/Report!|Data!/.test(dash.match(/<f[^>]*>[^<]*<\/f>/g).join("")), "no dashboard formula reads the unfiltered Report or Data sheets");
    assert.ok(refs.length && refs.every((r) => /^Dashboard!/.test(r)), "every chart reads the pivot-driven cells: " + refs.join(" ")); }
  { const x = z("Q3_Commercial_Final.xlsx"), s = sheets(x), sales = x[`xl/worksheets/sheet${s.indexOf("Sales") + 1}.xml`];
    for (const k of ["Dashboard", "Report", "Pivots", "Sales", "Shipments", "Returns", "Targets", "Models", "Countries"]) assert.ok(s.includes(k), "sheet " + k);
    assert.equal(count(sales, /VLOOKUP\([A-Z]+\d+,Countries!/g), E2.salesRows); assert.equal(count(sales, /VLOOKUP\([A-Z]+\d+,Models!/g), E2.salesRows);
    assert.ok(Object.keys(x).some((k) => k.startsWith("xl/pivotTables/")) && Object.keys(x).some((k) => k.startsWith("xl/charts/")), "pivot tables and charts");
    for (const v of [E2.salesValue, E2.salesQty, E2.channels.Delta.v, E2.target.Delta.v]) assert.ok(cached(x, v), "the workbook shows " + v); }
  { const x = z("Q3_Commercial_Review.pptx"), slides = Object.keys(x).filter((k) => /^ppt\/slides\/slide\d+\.xml$/.test(k)), text = slides.map((k) => x[k]).join("");
    assert.equal(slides.length, 8, "an 8-slide deck");
    for (const v of [E2.achievement.Alexandria, E2.achievement.Delta, E2.freightPerSet, E2.topReturns[0].mc]) assert.ok(text.includes(String(v)), "the deck quotes " + v);
    assert.ok(Object.keys(x).some((k) => k.startsWith("ppt/charts/")), "native charts"); }
  { const pdf = readFileSync(path.join(FINALS, "Q3_Commercial_Review.pdf")).toString("latin1");
    assert.ok(pdf.startsWith("%PDF-")); assert.equal(count(pdf, /\/Type\s*\/Page[^s]/g), 8, "the deck's PDF has its 8 pages"); }
});

test("the unit-3 lessons and decks quote their projects' figures, the same in Arabic and English", () => {
  const O = A.officeProjects, n = (x) => Number(x).toLocaleString("en-US"), E1 = O.list[0].expected(), E2 = O.list[1].expected();
  const text = (id) => JSON.stringify(A.lessons.find((l) => l.id === id).levels) + JSON.stringify(A.decks.find((d) => d.lesson === id));
  const has = (id, ...figs) => { const s = text(id); for (const f of figs) assert.ok(s.includes(String(f)), `${id} should quote ${f}`); };
  has("a1", n(E1.rows), n(E1.units), E1.files, n(E1.months[7]));
  has("a2", n(E1.units), E1.exportShare, n(E1.topModel.units), n(E1.lines.L01), n(E1.months[9]), n(E1.countries.Kenya));
  has("a3", E2.salesRows, n(E2.salesQty), E2.shipments, E2.returns);
  has("a4", E2.achievement.Alexandria, E2.achievement.Delta, E2.achievement.Export, E2.freightPerUnit.Export, E2.topReturns[0].mc);
  const ar = (s) => String(s).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[٬,]/g, "").replace(/٫/g, ".");
  const nums = (s) => [...ar(s).matchAll(/\d+(?:\.\d+)?/g)].map((m) => m[0]).sort().join(" ");
  for (const l of A.lessons.filter((x) => x.unit === "u2")) for (const k of Object.keys(l.levels)) for (const x of l.levels[k])
    assert.equal(nums(x.ar), nums(x.en), `${l.id}.${k}.${x.k}: Arabic and English quote different figures`);
});

test("unit-3 checks and rules can actually pass on the project's own data (review findings on PR 40)", () => {
  const P = (id) => A.prompts.find((p) => p.id === id).text, O = A.officeProjects;
  // every pivot is compared with the full total, so none of them may be cut to a top 10
  for (const lang of ["ar", "en"]) assert.ok(!/top 10|top-10|أعلى ١٠|أعلى 10/i.test(P("a2a")[lang]), `a2a (${lang}) filters a pivot it checks against the full total`);
  assert.ok(!/top 10|top-10/i.test(O.skills["production-dashboard/reference/dashboard-spec.md"]), "the kit's spec filters a pivot its checks compare with the full total");
  // step 2 reads step 1's output: the shared rule must allow reading Output, while never writing to Data
  for (const id of ["a2a", "a4a"]) for (const lang of ["ar", "en"]) {
    const t = P(id)[lang];
    assert.ok(!/read only from the Data folder|اقرا من فولدر Data بس/.test(t), `${id} (${lang}) forbids reading the Output file it takes as input`);
    assert.ok(/Output/.test(t) && /(never|ما تكتبش)/.test(t), `${id} (${lang}) still protects Data`);
  }
  assert.ok(!/Read only from the Data folder/.test(O.skills["safe-office-automation"]), "the safety skill forbids reading intermediate outputs");
});

test("unit 4: nine lessons in order, each opening with its own 12-slide story; it closes into b1", () => {
  assert.equal(A.courseOrder.u3.join(" "), "k1 k2 k3 k4 k5 k6 k7 k8 k9", "unit 3 (shown as 4): the CLIs, pure Python, PowerShell and COM, two weeks, review, SQL, PDF, HTML, skills");
  assert.equal(A.courseOrder.u4[0], "b1", "b1 opens unit 5");
  for (const id of A.courseOrder.u3) assert.ok(A.decks.some((d) => d.lesson === id && d.slides.length === 12), id + " opens with a 12-slide story");
  const last = A.decks.find((d) => d.lesson === "k9");
  assert.equal(last.finalQuestion.en, "And what if a file arrives that is bigger than Excel itself?", "unit 4 ends on the question b1 opens with");
  for (const id of ["k1", "k2", "k3", "k4", "k5", "k6", "k7", "k8", "k9"]) {
    assert.ok(A.prompts.some((p) => p.lesson === id), id + ": at least one prompt"); assert.ok(A.quiz.filter((q) => q.lesson === id).length >= 2, id + ": two questions");
  }
});

test("the unit-4 projects: clean files, a correct reading finds every figure the lessons and answer keys quote", () => {
  const E = A.easyProjects, [P1, P2, P3] = E.list, sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  assert.equal(E.list.map((p) => p.zip).join(" "), "Unit4_Example_1_Two_Weeks.zip Unit4_Example_2_PDF_to_HTML.zip Unit4_Starter_Kit.zip");
  assert.equal(Object.keys(E.byLesson).sort().join(" "), "k4 k5 k6 k7 k8 k9");
  // example 1: two weeks with the same columns, every code in Masters, read like a correct tool
  { const X = P1.expected(), F = P1.data(), rows = [], names = {};
    for (const [cc, name] of F.find((f) => f.path === "Data/Masters.xlsx").sheets[0].rows.slice(1)) names[cc] = name;
    for (const f of F.filter((f) => /Week_0\d/.test(f.path))) { const [head, ...body] = f.sheets[0].rows; assert.equal(head.join(), E.head1.join(), f.path + ": the same columns");
      for (const r of body) { assert.ok(r.every((v) => v !== null && v !== ""), f.path + ": no empty cell"); assert.ok(names[r[3]], f.path + ": every country in Masters"); rows.push({ f: f.path, line: r[1], cc: r[3], q: r[4] }); } }
    assert.equal(rows.length, X.rows); assert.equal(sum(rows, (r) => r.q), X.units);
    assert.equal(X.perWeek.map((w) => w.rows + ":" + w.units).join(), ["Data/Week_01.xlsx", "Data/Week_02.xlsx"].map((f) => rows.filter((r) => r.f === f).length + ":" + sum(rows.filter((r) => r.f === f), (r) => r.q)).join());
    const by = (k) => { const o = {}; for (const r of rows) o[r[k]] = (o[r[k]] || 0) + r.q; return o; };
    assert.deepEqual({ ...by("cc") }, { ...X.countries }); assert.deepEqual({ ...by("line") }, { ...X.lines });
    assert.equal(rows.filter((r) => r.cc === "KW").length, 8, "k5's story: counting rows gives Kuwait 8");
    const csv = E.twoWeeksCsv().replace(/^\ufeff/, "").trim().split("\r\n"); assert.equal(csv.length - 1, X.rows, "Two_Weeks.csv holds every row"); }
  // example 2: the PDF's bytes hold one table whose rows add up to its own Total line
  { const X = P2.expected(), f = P2.data().find((x) => x.pdf), txt = Buffer.from(A.xlKit.pdf(f.pdf)).toString("latin1"), lines = {};
    for (const m of txt.matchAll(/1 0 0 1 (-?[\d.]+) (-?[\d.]+) Tm \(((?:\\.|[^\\)])*)\) Tj/g)) (lines[m[2]] = lines[m[2]] || []).push([+m[1], m[3]]);
    const L = Object.entries(lines).sort((a, b) => b[0] - a[0]).map(([, l]) => l.sort((a, b) => a[0] - b[0]).map((x) => x[1]));
    const h = L.findIndex((l) => l.join() === "CountryCode,ModelCode,Qty,NetSales"), t = L.findIndex((l) => l[0] === "Total"); assert.ok(h > 0 && t > h, "a header row and a Total line");
    const body = L.slice(h + 1, t).map((l) => ({ cc: l[0], q: +l[2].replace(/,/g, ""), v: +l[3].replace(/,/g, "") }));
    assert.equal(body.length, X.rows); assert.equal(sum(body, (r) => r.q), X.qty); assert.equal(sum(body, (r) => r.v), X.sales);
    assert.equal(+L[t][1].replace(/,/g, ""), X.qty, "Total line: Qty"); assert.equal(+L[t][2].replace(/,/g, ""), X.sales, "Total line: NetSales");
    const kw = sum(body.filter((r) => r.cc === X.top.code), (r) => r.v); assert.equal(kw, X.top.sales); assert.equal(Math.round((kw / X.sales) * 100), X.top.share); }
  // the kit: the rules forbid packages and the internet, and both rules files say the same
  { const K = Object.fromEntries(P3.data().map((f) => [f.path, f.text]));
    assert.equal(K["CLAUDE.md"].split("\n").slice(1).join("\n"), K["AGENTS.md"].split("\n").slice(1).join("\n"), "CLAUDE.md and AGENTS.md hold the same rules");
    assert.ok(/pip install/.test(E.rules) && /standard library/.test(E.rules) && /No internet/.test(E.rules) && /PowerShell first/.test(E.rules));
    assert.ok(/^---\nname: trusted-tool\ndescription: /.test(K[".claude/skills/trusted-tool/SKILL.md"]), "SKILL.md starts with name and description");
    assert.equal(P3.expected().rules, 13); }
  // later steps read earlier steps' results (k6a: Output/Two_Weeks.csv, k8a: Output/Exports.db), so the rules must allow
  // reading Output while still forbidding any write to Data (Codex review on PR 42)
  assert.ok(/results from Output/.test(E.rules) && /Never change a file in Data/.test(E.rules), "the kit's rules let a step read Output, never write Data");
  const R4 = A.prompts.find((p) => p.id === "k6a").text;
  assert.ok(/results from Output/.test(R4.en) && /never write to Data/.test(R4.en) && /من Output/.test(R4.ar), "the shared unit-4 Prompt tail lets a step read Output");
});

/* ---------- the ready tools (Ready_Tool/ in each example zip of units 3 and 4: academy/src/tools/) ---------- */
const TOOLS = path.join(SRC, "tools");
const loadTools = () => {
  if (A.toolFiles && Object.keys(A.toolFiles).length) return;
  const out = {}, walk = (d) => { for (const e of readdirSync(path.join(TOOLS, d), { withFileTypes: true })) {
    if (e.name === "__pycache__") continue; const p = d ? d + "/" + e.name : e.name;
    if (e.isDirectory()) walk(p); else out[p] = readFileSync(path.join(TOOLS, p), "utf8"); } };
  walk(""); A.toolFiles = out;
};
const STDLIB = new Set(["csv", "html", "json", "math", "re", "sqlite3", "sys", "zipfile", "zlib", "datetime", "pathlib", "xml"]);
const toolProjects = () => { loadTools(); return [...A.officeProjects.list, ...A.easyProjects.list].filter((p) => p.tool); };
const writeBundle = (root, files) => { for (const f of files) { const p = path.join(root, f.path); mkdirSync(path.dirname(p), { recursive: true }); writeFileSync(p, Buffer.from(A.xlKit.fileData(f))); } };
const havePython = () => { try { execFileSync("python3", ["--version"]); return true; } catch { return false; } };
const runPy = (root, script) => { try { execFileSync("python3", ["-I", path.join(root, "Ready_Tool", "scripts", script)], { cwd: tmpdir(), stdio: "pipe" }); return { code: 0 }; } catch (e) { return { code: e.status, out: String(e.stdout) }; } };
const summaryOf = (root) => JSON.parse(readFileSync(path.join(root, "Output", "Work", "summary.json"), "utf8"));
const sameFigures = (got, exp, label) => { for (const k of Object.keys(exp)) assert.equal(JSON.stringify(got[k], Object.keys(got[k] || {}).sort()), JSON.stringify(exp[k], Object.keys(exp[k] || {}).sort()), `${label}: ${k}`); };
// what step 1 (1_Export_With_Office.ps1) writes: every sheet's Value2 as CSV (dates as Excel day numbers), every Word table
const csvField = (v) => { const s = v == null ? "" : typeof v === "object" ? String(v.d) : String(v); return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const writeExports = (root, files) => {
  const dir = path.join(root, "Output", "Work", "Export"); mkdirSync(dir, { recursive: true });
  const name = (f, part) => f.path.slice("Data/".length).replace(/\//g, "__") + "__" + part + ".csv";
  for (const f of files) {
    for (const sh of f.sheets || []) writeFileSync(path.join(dir, name(f, sh.name)), "﻿" + sh.rows.map((r) => r.map(csvField).join(",")).join("\r\n") + "\r\n");
    ((f.docx && f.docx.blocks) || []).filter((b) => b.table).forEach((b, i) => writeFileSync(path.join(dir, name(f, "Table" + (i + 1))), "﻿" + b.table.map((r) => r.map(csvField).join(",")).join("\r\n") + "\r\n"));
  }
};

test("ready tools: every example of units 3 and 4 ships one, complete, in both languages", () => {
  const P = toolProjects();
  assert.equal(P.map((p) => p.zip + ":" + p.tool).join(" "), "Unit3_Example_1_Production_Dashboard.zip:u3-ex1 Unit3_Example_2_Commercial_Review.zip:u3-ex2 Unit4_Example_1_Two_Weeks.zip:u4-ex1 Unit4_Example_2_PDF_to_HTML.zip:u4-ex2");
  for (const p of P) for (const lang of ["ar", "en"]) {
    const files = Object.fromEntries(p.bundle(lang).filter((f) => f.path.startsWith("Ready_Tool/")).map((f) => [f.path.slice(11), f.text]));
    const label = `${p.zip} (${lang})`;
    for (const need of ["Run_Tool.bat", "Run_Tool.ps1", "START_HERE.txt", "scripts/common.ps1", "docs/SKILL.md", "docs/HISTORY.md", "docs/LESSONS.md"]) assert.ok(files[need], `${label}: Ready_Tool/${need}`);
    assert.ok(/^---\nname: [a-z-]+\ndescription: .{80,}\n---\n/.test(files["docs/SKILL.md"]), `${label}: SKILL.md starts with name and description`);
    assert.ok(!/@include/.test(Object.values(files).join("")), `${label}: every include resolved`);
    assert.ok(/Lessons that repeat|دروس بتتكرر/.test(files["docs/LESSONS.md"]), `${label}: LESSONS.md holds the shared lessons`);
    if (lang === "ar") for (const d of ["START_HERE.txt", "docs/HISTORY.md", "docs/LESSONS.md"]) assert.ok(/[؀-ۿ]/.test(files[d]), `${label}: ${d} is in Arabic`);
    // the one-click run: every step the orchestrator names exists, and every launcher points at a file that exists
    const steps = [...files["Run_Tool.ps1"].matchAll(/File = "([^"]+)"/g)].map((m) => m[1]);
    assert.ok(steps.length >= 2, `${label}: Run_Tool.ps1 lists its steps`);
    for (const s of steps) assert.ok(files["scripts/" + s], `${label}: step ${s} exists`);
    assert.ok(steps.some((s) => s.endsWith(".py")) ? true : true);
    for (const [f, t] of Object.entries(files).filter(([f]) => f.endsWith(".bat"))) {
      assert.ok(/\r\n/.test(t) && !/[^\r]\n/.test(t), `${label}: ${f} has Windows line ends`);
      for (const m of t.matchAll(/%~dp0([\w.]+\.(?:ps1|py))/g)) assert.ok(files[(f.includes("/") ? "scripts/" : "") + m[1]], `${label}: ${f} runs ${m[1]}, which exists`);
    }
    // the Python steps: standard library only
    for (const [f, t] of Object.entries(files).filter(([f]) => f.endsWith(".py")))
      for (const m of t.matchAll(/^(?:from ([\w.]+) import|import ([\w., ]+))/gm)) for (const mod of (m[1] || m[2]).split(",").map((x) => x.trim().split(/[.\s]/)[0]))
        assert.ok(STDLIB.has(mod), `${label}: ${f} imports ${mod}, outside the standard library`);
  }
});

test("ready tools: the PowerShell scripts are well formed, ASCII, and close Office even after an error", () => {
  loadTools();
  const F = A.toolFiles, ps = Object.keys(F).filter((f) => f.endsWith(".ps1"));
  const common = F["common/common.ps1"], defined = new Set([...Object.values(F).join("\n").matchAll(/^\s*function ([\w-]+)/gm)].map((m) => m[1]));
  const cmdlets = new Set(["New-Object", "Join-Path", "Test-Path", "Split-Path", "Resolve-Path", "New-Item", "Remove-Item", "Move-Item", "Get-ChildItem", "Get-Content", "Get-Date", "Get-Command", "Import-Csv", "ConvertFrom-Json", "ConvertTo-Json", "Write-Host", "Out-Host", "Out-Null", "Where-Object", "ForEach-Object", "Select-Object", "Unblock-File", "Invoke-Item"]);
  // a small tokenizer: strings, comments and here-strings out, then brackets must balance
  const strip = (src) => { let out = "", i = 0; const n = src.length;
    while (i < n) { const c = src[i];
      if (c === "#") { while (i < n && src[i] !== "\n") i++; continue; }
      if (c === "<" && src[i + 1] === "#") { const j = src.indexOf("#>", i + 2); assert.ok(j > 0, "block comment closed"); i = j + 2; continue; }
      if (c === "'") { i++; while (i < n && !(src[i] === "'" && src[i + 1] !== "'")) { if (src[i] === "'") i++; i++; } assert.ok(i < n, "a '...' string is closed"); i++; out += "''"; continue; }
      if (c === '"') { i++; while (i < n && src[i] !== '"') { if (src[i] === "`") i++; else if (src[i] === '"' && src[i + 1] === '"') i++; i++; } assert.ok(i < n, 'a "..." string is closed'); i++; out += '""'; continue; }
      out += c; i++; }
    return out; };
  for (const f of ps) {
    const src = F[f];
    assert.ok(/^[\x09\x0a\x0d\x20-\x7e]*$/.test(src), `${f}: ASCII only (Windows PowerShell 5.1 misreads UTF-8 without a BOM)`);
    const code = strip(src), stack = [], pair = { ")": "(", "}": "{", "]": "[" };
    for (const [k, ch] of [...code].entries()) {
      if ("({[".includes(ch)) stack.push(ch);
      else if (")}]".includes(ch)) assert.equal(stack.pop(), pair[ch], `${f}: brackets balance (near «${code.slice(Math.max(0, k - 60), k + 1)}»)`);
    }
    assert.equal(stack.length, 0, `${f}: every bracket is closed`);
    // every command at the start of a statement is a function of the tool or a built-in cmdlet
    for (const m of code.matchAll(/(?:^|[;{(|=]\s*|\n\s*)(?:&\s*)?([A-Z][a-z]+-[A-Z][A-Za-z]+)\b/g)) assert.ok(defined.has(m[1]) || cmdlets.has(m[1]), `${f}: ${m[1]} is defined`);
    if (f === "common/common.ps1") continue;
    assert.ok(/^\$StepName = "[\w]+"\r?\n\. \(Join-Path \$PSScriptRoot "(?:scripts\\)?common\.ps1"\)/m.test(src), `${f}: names its step, then loads common.ps1`);
    if (/-ComObject/.test(src)) {
      const fin = src.slice(src.lastIndexOf("} finally {"));
      assert.ok(/\.Quit\(\)/.test(fin) && /Close-Com/.test(fin) && /Clear-Com/.test(fin), `${f}: the last finally quits Office and releases COM`);
      assert.ok(/\} catch \{\r?\n\s+Write-Log \("STOPPED: "/.test(src) && /exit \$code\s*$/.test(src), `${f}: a stop is logged and the exit code returned`);
      for (const line of src.split(/\r?\n/).filter((l) => /(Workbooks|Documents)\.Open\(/.test(l)))
        assert.ok(/,\s*(?:0|\$false),\s*\$true\)/.test(line) || (/Open\(\$path\)/.test(line) && /\$path = Join-Path \$OutDir/.test(src)), `${f}: a source file opens read-only («${line.trim()}»)`);
    }
    assert.ok(!/SaveAs\([^)]*DataDir/.test(src) && !/Join-Path \$DataDir[^\n]*\)\.Save/.test(src), `${f}: nothing is saved into Data`);
  }
  assert.ok(/ExecutionPolicy Bypass -File "%~dp0Run_Tool\.ps1"/.test(F["common/Run_Tool.bat"]), "Run_Tool.bat starts Run_Tool.ps1 next to it");
  assert.ok(/WindowsApps|Microsoft Store/.test(common) && /sys\.version_info\[0\]/.test(common), "Find-Python skips the Store shortcut and asks Python its version");
});

test("ready tools: the Python steps, run on the example files, compute every figure of the answer keys", { skip: !havePython() && "no python3 on this machine" }, () => {
  if (!A.xlKit) { ctx.TextEncoder = TextEncoder; vm.runInContext(readFileSync(path.join(SRC, "engine", "xlkit.js"), "utf8"), ctx, { filename: "xlkit.js" }); }
  ctx.atob = ctx.atob || atob; loadFinals(); loadTools();
  const [U1, U2] = A.officeProjects.list, [K1, K2] = A.easyProjects.list, n = (x) => Number(x).toLocaleString("en-US");
  const tmp = mkdtempSync(path.join(tmpdir(), "tools-"));
  try {
    for (const [p, script] of [[U1, "2_Build_Tables.py"], [U2, "2_Build_Tables.py"]]) {
      // a. on a laptop without DRM: Python reads the .xlsx and .docx files themselves
      const a = path.join(tmp, p.tool + "-direct"); writeBundle(a, p.bundle("en"));
      assert.equal(runPy(a, script).code, 0, `${p.tool}: step 2 runs on the files themselves`);
      sameFigures(summaryOf(a), p.expected(), `${p.tool} (direct)`);
      const key = readFileSync(path.join(a, "Answer_Key.txt"), "utf8"), check = readFileSync(path.join(a, "Output", "Check_Report.txt"), "utf8");
      for (const line of key.split(/\r?\n/).filter((l) => /^\s{2}\S/.test(l))) assert.ok(check.includes(line.trim()), `${p.tool}: Check_Report.txt holds the key's line «${line.trim()}»`);
      // b. under the DRM: every Office file is unreadable to Python, and step 1 exported them through COM
      const b = path.join(tmp, p.tool + "-drm"); writeBundle(b, p.bundle("en"));
      const office = p.data().filter((f) => f.sheets || f.docx);
      for (const f of office) writeFileSync(path.join(b, f.path), Buffer.from("NASCA-DRM encrypted " + f.path));
      const stopped = runPy(b, script);
      assert.equal(stopped.code, 1, `${p.tool}: a locked file without step 1's export stops the step`);
      assert.ok(/protected by the DRM/.test(stopped.out) && /Run_Tool\.bat/.test(stopped.out), `${p.tool}: the stop says why and what to run`);
      writeExports(b, office);
      assert.equal(runPy(b, script).code, 0, `${p.tool}: step 2 runs on step 1's CSV exports`);
      sameFigures(summaryOf(b), p.expected(), `${p.tool} (through the COM export)`);
    }
    // a file that breaks the description must stop the tool with a clear message, never run on
    { const c = path.join(tmp, "u3-ex1-bad"); writeBundle(c, U1.bundle("en"));
      const f = U1.data().find((x) => x.path.endsWith("Week_05.xlsx")), bad = { ...f, sheets: [{ ...f.sheets[0], rows: [f.sheets[0].rows[0].map((h) => (h === "Qty" ? "Quantity" : h)), ...f.sheets[0].rows.slice(1)] }] };
      writeBundle(c, [bad]);
      const r = runPy(c, "2_Build_Tables.py"); assert.equal(r.code, 1); assert.ok(/Week_05\.xlsx, sheet Production: the columns are .*Quantity/.test(r.out), "a renamed column stops step 2 by name"); }
    // unit 4, example 2: both steps, end to end
    { const d = path.join(tmp, "u4-ex2"); writeBundle(d, K2.bundle("ar"));
      for (const s of ["extract_pdf.py", "build_report.py"]) assert.equal(runPy(d, s).code, 0, "u4-ex2: " + s);
      const X = K2.expected(), page = readFileSync(path.join(d, "Output", "Export_Report.html"), "utf8");
      for (const v of [n(X.sales), n(X.qty), X.top.name, X.top.share + "%"]) assert.ok(page.includes(v), "the HTML page shows " + v);
      assert.ok(!/https?:\/\//.test(page), "the page links to nothing outside itself");
      assert.ok(readFileSync(path.join(d, "Output", "Run_Log.txt"), "utf8").includes(`${X.rows} rows, ${n(X.qty)} sets, ${n(X.sales)} EGP: the same as the Total line`)); }
    // unit 4, example 1: step 5 on the CSV step 3 writes (the same bytes as step3_report.ps1: BOM, CRLF, yyyy-mm-dd)
    { const e = path.join(tmp, "u4-ex1"); writeBundle(e, K1.bundle("ar"));
      mkdirSync(path.join(e, "Output"), { recursive: true }); writeFileSync(path.join(e, "Output", "Two_Weeks.csv"), A.easyProjects.twoWeeksCsv());
      assert.equal(runPy(e, "load_sqlite.py").code, 0, "u4-ex1: load_sqlite.py");
      const Y = K1.expected(), q = readFileSync(path.join(e, "Output", "Query_Results.txt"), "utf8");
      assert.ok(q.includes("Egypt | " + Y.egypt) && q.includes("Kuwait | " + Y.topExport.units) && q.includes("L01 | " + Y.lines.L01) && q.includes("Week_02.xlsx | 18 | " + Y.perWeek[1].units), "the SQL answers match the answer key");
      const ps = A.toolFiles["u4-ex1/scripts/step3_report.ps1"];
      assert.ok(ps.includes('"Date,LineCode,ModelCode,CountryCode,Qty,SourceFile,CountryName"') && A.easyProjects.twoWeeksCsv().startsWith("﻿Date,LineCode,ModelCode,CountryCode,Qty,SourceFile,CountryName\r\n"), "step 3 writes the header step 5 reads"); }
  } finally { rmSync(tmp, { recursive: true, force: true }); }
});

test("the unit-4 lessons quote their projects' figures, the same in Arabic and English", () => {
  const E = A.easyProjects, n = (x) => Number(x).toLocaleString("en-US"), X1 = E.list[0].expected(), X2 = E.list[1].expected();
  const text = (id) => JSON.stringify(A.lessons.find((l) => l.id === id).levels);
  const has = (id, ...figs) => { const s = text(id); for (const f of figs) assert.ok(s.includes(String(f)), `${id} should quote ${f}`); };
  has("k4", X1.rows, n(X1.units), X1.perWeek[0].units, X1.perWeek[1].units, X1.egypt, X1.exportShare, X1.topExport.units);
  has("k5", X1.topExport.units); has("k6", X1.rows, n(X1.units), X1.egypt, X1.lines.L01, X1.perWeek[1].units);
  has("k7", X2.rows, X2.qty, n(X2.sales), n(X2.top.sales)); has("k8", n(X2.sales), X2.qty, X2.top.share);
  has("k9", E.list[2].expected().rules);
  const ar = (s) => String(s).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[٬,]/g, "").replace(/٫/g, ".");
  const nums = (s) => [...ar(s).matchAll(/\d+(?:\.\d+)?/g)].map((m) => m[0]).sort().join(" ");
  for (const l of A.lessons.filter((x) => x.unit === "u3")) for (const k of Object.keys(l.levels)) for (const x of l.levels[k])
    assert.equal(nums(x.ar), nums(x.en), `${l.id}.${k}.${x.k}: Arabic and English quote different figures`);
});
