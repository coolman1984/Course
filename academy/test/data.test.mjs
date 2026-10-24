// Data integrity: every page mapped, every link resolves, every prompt variable appears, every UI key exists.
// Run: node --test academy/test/data.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
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
const DATA = ["ui", "meta", "stories", "scenes", "lessons-u0", "lessons-u1", "lessons-u2", "lessons-u3u4", "lessons-u5", "lessons-xl", "lessons-office", "course-order", "plain-talk-a", "plain-talk-b", "prompts", "situations", "quiz", "glossary", "compare", "history", "model-story", "context-story", "window-story", "agents-story", "work-story", "limits-story", "auto-story", "big-story", "kit-story", "deliver-story", "stack-story", "lookup-story", "report-story", "run-story", "match-story", "needs-story", "table-story", "dash-story", "gather-story", "slides-story", "code-story", "skill-story", "xl-sample", "office-projects"];
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

test("the course plan: eight units, every lesson placed exactly once, and each lesson file names the same unit", () => {
  assert.equal(A.units.map((u) => u.n).join(" "), "1 2 3 4 5 6 7 8");
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
  assert.equal(A.courseOrder.u3[0], "b1", "b1 opens unit 4");
  assert.ok(/إكسل/.test(A.runStory.finalQuestion.ar) && /داشبورد/.test(A.runStory.finalQuestion.ar), "unit 2 ends on the dashboard question unit 3 answers");
  assert.equal(A.skillStory.finalQuestion.en, "And what if a file arrives that is bigger than Excel itself?", "unit 3 ends on the question b1 opens with");
});

test("the unit-3 projects: a correct tool, run on the files, finds exactly the figures the lessons and answer keys quote", () => {
  if (!A.xlKit) { ctx.TextEncoder = TextEncoder; vm.runInContext(readFileSync(path.join(SRC, "engine", "xlkit.js"), "utf8"), ctx, { filename: "xlkit.js" }); }   // the PDF writer, to read the bytes back
  const O = A.officeProjects, X = A.xlProjects, [P1, P2, P3] = O.list, sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const english = (v) => typeof v !== "string" || !/[؀-ۿ]/.test(v);
  assert.equal(O.list.map((p) => p.lessons.join("+")).join(" "), "a1+a2 a3+a4 a6");
  for (const p of O.list) for (const lang of ["ar", "en"]) {
    const names = p.bundle(lang).map((f) => f.path);
    for (const g of ["README.txt", "Answer_Key.txt", "Prompt_1.txt"]) assert.ok(names.includes(g), `${p.zip}: ${g}`);
    for (const id of p.prompts) assert.ok(A.prompts.some((x) => x.id === id && p.lessons.includes(x.lesson)), `${p.zip}: prompt ${id} belongs to its lessons`);
  }
  for (const f of [...P1.files(), ...P2.files()]) {
    assert.ok(f.path.startsWith("Data/"), f.path);
    for (const sh of f.sheets || []) for (const r of sh.rows) assert.ok(r.every(english), `${f.path} holds English only`);
    for (const b of (f.docx && f.docx.blocks) || []) assert.ok(english(b.p || "") && (b.table || []).every((r) => r.every(english)), `${f.path} holds English only`);
  }
  // example 1: find the header row by name, Prod Order unique, blank market = stock, unmatched kept
  { const E = P1.expected(), files = P1.files(), masters = files.find((f) => f.path.endsWith("Masters.xlsx"));
    const map = (sh) => Object.fromEntries(sh.rows.slice(1).map((r) => [r[0], r[1]])), models = map(masters.sheets[0]), markets = map(masters.sheets[1]);
    assert.equal(masters.sheets.map((s) => s.rows[0].length).join(), "2,2", "two small databases of two columns");
    const seen = new Set(), rows = []; let read = 0, skippedFiles = 0;
    for (const f of files.filter((x) => x.path.includes("Weekly_Exports"))) {
      const all = f.sheets[0].rows, h = all.findIndex((r) => r.includes("Prod Order")); assert.equal(h, 3, "headers sit on row 4");
      const head = all[h], body = all.slice(h + 1).map((r) => Object.fromEntries(head.map((k, i) => [k, r[i]])));
      read += body.length;
      if (body.every((r) => seen.has(r["Prod Order"]))) { skippedFiles++; assert.ok(f.path.endsWith(E.dupFile)); continue; }
      for (const r of body) { if (seen.has(r["Prod Order"])) continue; seen.add(r["Prod Order"]);
        rows.push({ q: r["Confirmed Qty"], v: r["Std Value EGP"], line: r.Line, model: models[r.Material] || "(not in master)", country: r.Market === "" || r.Market == null ? "Unallocated (stock)" : markets[r.Market] || "(not in master)", month: new Date(Date.UTC(1899, 11, 30) + r["Posting Date"].d * 864e5).getUTCMonth() + 1 }); }
    }
    assert.equal(read, E.rowsRead); assert.equal(skippedFiles, 1); assert.equal(rows.length, E.rows); assert.equal(sum(rows, (r) => r.q), E.units); assert.equal(sum(rows, (r) => r.v), E.value);
    const by = (k) => rows.reduce((o, r) => ((o[r[k]] = (o[r[k]] || 0) + r.q), o), {});
    assert.deepEqual({ ...by("country") }, { ...E.countries }); assert.deepEqual({ ...by("month") }, { ...E.months }); assert.deepEqual({ ...by("line") }, { ...E.lines });
    const m = Object.entries(by("model")).filter(([k]) => k !== "(not in master)").sort((a, b) => b[1] - a[1])[0]; assert.equal(m.join(), [E.topModel.name, E.topModel.units].join());
    const ex = sum(rows.filter((r) => !["Egypt", "Unallocated (stock)"].includes(r.country)), (r) => r.q); assert.equal(Math.round((ex / E.units) * 1000) / 10, E.exportShare);
    assert.equal(E.countries["(not in master)"], E.newMarket.units); assert.equal(E.units - E.newMarket.units, 29488, "the card that left out OM");
    assert.equal(by("line").L01, 6311); }
  // example 2: three Excel shapes, PDFs (read from the bytes), Word memos, into one long table
  { const E = P2.expected(), files = P2.files(), F = (n) => files.find((f) => f.path.endsWith(n)), day = (v) => new Date(Date.UTC(1899, 11, 30) + v.d * 864e5);
    const models = Object.fromEntries(F("Masters.xlsx").sheets[0].rows.slice(1).map((r) => [r[1], r[0]]));
    const fact = [], add = (ch, m, measure, value) => fact.push({ ch, m, measure, value });
    for (const r of F("Sales_Cairo_Q3.xlsx").sheets[0].rows.slice(1)) { const d = day(r[0]); if (d < new Date(Date.UTC(2026, 6, 1))) continue; add("Cairo", d.getUTCMonth() + 1, "SalesQty", r[4]); add("Cairo", d.getUTCMonth() + 1, "NetSalesEGP", r[5]); }
    const alex = F("Sales_Alexandria_Q3.xlsx").sheets[0].rows; for (const r of alex.slice(1)) if (r[0] !== "Total") [7, 8, 9].forEach((m, i) => { add("Alexandria", m, "SalesQty", r[1 + i * 2]); add("Alexandria", m, "NetSalesEGP", r[2 + i * 2]); });
    for (const sh of F("Sales_Delta_Q3.xlsx").sheets) { const m = { Jul: 7, Aug: 8, Sep: 9 }[sh.name.slice(0, 3)]; for (const r of sh.rows.slice(1)) if (r[0] !== "Total") { add("Delta", m, "SalesQty", r[1]); add("Delta", m, "NetSalesEGP", r[2]); } }
    const num = (s) => (/^\(.*\)$/.test(s) ? -1 : 1) * Number(s.replace(/[(),]/g, ""));
    const pdfLines = (f) => { const txt = Buffer.from(A.xlKit.pdf(f.pdf)).toString("latin1"), pages = txt.split("/Type /Page /Parent").length - 1, lines = {};
      assert.equal(pages, f.pdf.pages.length, f.path + ": page count");
      let pg = 0; for (const p of f.pdf.pages) { pg++; for (const it of p.items) { assert.ok(txt.includes("(" + String(it.t).replace(/[\\()]/g, (c) => "\\" + c) + ") Tj"), f.path + ": text in the bytes"); (lines[pg + ":" + it.y] = lines[pg + ":" + it.y] || []).push(it); } }
      return Object.values(lines).map((l) => l.sort((a, b) => a.x - b.x).map((i) => String(i.t))); };
    const pdfTotals = {};
    for (const m of [7, 8, 9]) {
      const ex = pdfLines(F(`Export_Sales_2026-0${m}.pdf`)), rows = ex.filter((l) => l.length === 5 && l[0] !== "Country" && l[0] !== "TOTAL"), tot = ex.find((l) => l[0] === "TOTAL");
      assert.equal(sum(rows, (l) => num(l[3])), num(tot[1]), `export ${m}: rows = TOTAL`); assert.equal(sum(rows, (l) => num(l[4])), num(tot[2]));
      for (const l of rows) { add("Export", m, "SalesQty", num(l[3])); add("Export", m, "NetSalesEGP", num(l[4])); }
      const sp = pdfLines(F(`Outbound_Shipments_2026-0${m}.pdf`)), srows = sp.filter((l) => /^SHP-/.test(l[0])), stot = sp.find((l) => l[0] === "TOTAL");
      assert.equal(sum(srows, (l) => num(l[4])), num(stot[2])); assert.equal(`${srows.length} shipments`, stot[1]);
      for (const l of srows) { const ch = ["Cairo", "Alexandria", "Delta"].includes(l[2]) ? l[2] : "Export"; add(ch, m, "ShippedUnits", num(l[4])); add(ch, m, "FreightEGP", num(l[5])); }
      pdfTotals[m] = { exportQty: num(tot[1]), shipments: srows.length };
    }
    const ret = F("Returns_Memo_Q3.docx").docx.blocks.find((b) => b.table).table, ret0 = {};
    for (const r of ret.slice(1)) { const code = models[r[0]]; assert.ok(code, "every returned model found by name"); ret0[code] = [1, 2, 3].reduce((s, i) => s + num(r[i]), 0); add("Returns", 0, "ReturnUnits", ret0[code]); }
    const tg = F("Targets_Memo_Q3.docx").docx.blocks.find((b) => b.table).table; assert.ok(/000/.test(tg[0][2]), "targets are in thousands");
    const target = Object.fromEntries(tg.slice(1).map((r) => [r[0], num(r[2]) * 1000]));
    const S = (ch, measure) => sum(fact.filter((x) => (!ch || x.ch === ch) && x.measure === measure), (x) => x.value);
    assert.equal(S(null, "SalesQty"), E.salesQty); assert.equal(S(null, "NetSalesEGP"), E.salesValue);
    for (const ch of ["Cairo", "Alexandria", "Delta", "Export"]) {
      assert.equal(S(ch, "NetSalesEGP"), E.channels[ch].v, ch); assert.equal(target[ch], E.target[ch].v, ch + " target");
      assert.equal(Math.round((S(ch, "NetSalesEGP") / target[ch]) * 1000) / 10, E.achievement[ch], ch + " achievement");
      assert.equal(Math.round((S(ch, "FreightEGP") / S(ch, "ShippedUnits")) * 10) / 10, E.freightPerUnit[ch], ch + " freight per set");
    }
    assert.equal(S(null, "ShippedUnits"), E.shipUnits); assert.equal(S(null, "FreightEGP"), E.freight); assert.equal(sum(Object.values(ret0), (x) => x), E.returns);
    assert.ok(F("Returns_Memo_Q3.docx").docx.blocks.some((b) => b.p && b.p.includes(Number(E.returns).toLocaleString("en-US") + " sets")), "the memo's text quotes its own total");
    for (const t of E.pdfTotals) { assert.equal(pdfTotals[t.m].exportQty, t.exportQty); assert.equal(pdfTotals[t.m].shipments, t.shipments); }
    assert.equal(sum(Object.values(pdfTotals), (x) => x.shipments), E.shipments);
    assert.equal(Math.round(((S("Delta", "NetSalesEGP") + 1e6) / target.Delta) * 1000) / 10, 92.6, "the test slide: Delta + EGP 1 million"); }
  // the skills kit: every SKILL.md opens with a name that matches its folder and a description
  { const skills = P3.files().filter((f) => f.path.endsWith("/SKILL.md"));
    assert.equal(skills.length, 3);
    for (const f of skills) { const m = f.text.match(/^---\nname: ([a-z-]+)\ndescription: (.+)\n---\n/); assert.ok(m, f.path + ": frontmatter"); assert.equal(m[1], f.path.split("/")[1]); assert.ok(m[2].length > 80 && m[2].length < 1024, f.path + ": description length"); }
    for (const f of P3.files()) assert.ok(english(f.text), f.path + " in English"); }
});

test("the unit-3 lessons and decks quote their projects' figures, the same in Arabic and English", () => {
  const O = A.officeProjects, n = (x) => Number(x).toLocaleString("en-US"), E1 = O.list[0].expected(), E2 = O.list[1].expected();
  const text = (id) => JSON.stringify(A.lessons.find((l) => l.id === id).levels) + JSON.stringify(A.decks.find((d) => d.lesson === id));
  const has = (id, ...figs) => { const s = text(id); for (const f of figs) assert.ok(s.includes(String(f)), `${id} should quote ${f}`); };
  has("a1", n(E1.rows), n(E1.units), n(E1.rowsRead), E1.dupRows, E1.newModel.units, E1.newMarket.units, E1.blank.units, n(E1.months[7]));
  has("a2", n(E1.units), E1.exportShare, n(E1.topModel.units), n(E1.lines.L01), n(E1.months[9]), n(E1.countries.Kenya));
  has("a3", n(E2.salesQty), E2.shipments, n(E2.shipUnits), E2.pdfTotals[2].exportQty.toLocaleString("en-US"), E2.returns);
  has("a4", n(E2.salesValue), E2.achievement.Alexandria, E2.achievement.Delta, E2.achievement.Export, E2.freightPerUnit.Export, E2.topReturn.rate);
  const ar = (s) => String(s).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[٬,]/g, "").replace(/٫/g, ".");
  const nums = (s) => [...ar(s).matchAll(/\d+(?:\.\d+)?/g)].map((m) => m[0]).sort().join(" ");
  for (const l of A.lessons.filter((x) => x.unit === "u2")) for (const k of Object.keys(l.levels)) for (const x of l.levels[k])
    assert.equal(nums(x.ar), nums(x.en), `${l.id}.${k}.${x.k}: Arabic and English quote different figures`);
});

test("unit-3 checks and rules can actually pass on the project's own data (review findings on PR 40)", () => {
  const P = (id) => A.prompts.find((p) => p.id === id).text, O = A.officeProjects, E = O.list[0].expected();
  // the top-10 model pivot can't equal the full total, so the check must name only the unfiltered pivots
  const byModel = {}; for (const x of O.production()) { const k = x.mc; byModel[k] = (byModel[k] || 0) + x.q; }
  const top10 = Object.values(byModel).sort((a, b) => b - a).slice(0, 10).reduce((s, x) => s + x, 0);
  assert.ok(top10 < E.units, "the data has more than 10 models, so a top-10 pivot is a subset");
  for (const lang of ["ar", "en"]) {
    assert.ok(!/every pivot table|كل جدول محوري/.test(P("a2a")[lang]), `a2a (${lang}) checks a filtered top-10 pivot against the full total`);
    assert.ok(/PT_MonthLine/.test(P("a2a")[lang].split(/before formatting|قبل التنسيق/)[1] || ""), `a2a (${lang}) names the unfiltered pivots in its check`);
  }
  const kit = O.skills["production-dashboard/reference/checks.md"]; assert.ok(!/every pivot table/.test(kit), "the kit's checks.md repeats the impossible check");
  // step 2 reads step 1's output: the shared rule must allow reading Output, while never writing to Data
  for (const id of ["a2a", "a4a"]) for (const lang of ["ar", "en"]) {
    const t = P(id)[lang];
    assert.ok(!/read only from the Data folder|اقرا من فولدر Data بس/.test(t), `${id} (${lang}) forbids reading the Output file it takes as input`);
    assert.ok(/Output/.test(t) && /(never|ما تكتبش)/.test(t), `${id} (${lang}) still protects Data`);
  }
  assert.ok(!/Read only from the Data folder/.test(O.skills["safe-office-automation"]), "the safety skill forbids reading intermediate outputs");
});
