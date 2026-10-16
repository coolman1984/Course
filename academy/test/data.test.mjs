// Data integrity: every page mapped, every link resolves, every prompt variable appears, every UI key exists.
// Run: node --test academy/test/data.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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
const DATA = ["ui", "meta", "stories", "scenes", "lessons-u0", "lessons-u1", "lessons-u2", "lessons-u3u4", "lessons-u5", "plain-talk-a", "plain-talk-b", "prompts", "situations", "quiz", "glossary", "compare", "history", "model-story", "context-story"];
const ENGINE = ["core", "scene", "render", "quiz", "labs", "tools"];
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
// The per-lesson stories still feed the home-page motion theatre (engine/motion.js), so every lesson keeps one.
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
});

