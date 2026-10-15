// Data integrity: every page mapped, every link resolves, every prompt variable appears, every UI key exists.
// Run: node --test academy/test/data.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import path from "node:path";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");
const DATA = ["ui", "meta", "stories", "scenes", "lessons-u0", "lessons-u1", "lessons-u2", "lessons-u3u4", "lessons-u5", "plain-talk-a", "plain-talk-b", "prompts", "quiz", "glossary", "compare", "history"];
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
// Picture-first examples must exist for every lesson and must be concrete enough to show a full causal chain.
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

test("the story-of-AI deck: real lesson, every slide complete in both languages, years in order", () => {
  const H = A.aiHistory;
  assert.ok(H && lessonIds.has(H.lesson), "aiHistory must point to an existing lesson");
  for (const k of ["kicker", "title", "lead", "answerLabel", "ideaLabel", "question", "finalQuestion", "note"]) both(H[k], "aiHistory." + k);
  for (const k of Object.keys(H.ui)) both(H.ui[k], "aiHistory.ui." + k);
  assert.ok(H.slides.length >= 8, "the story needs its eras");
  const engine = readFileSync(path.join(SRC, "engine", "history.js"), "utf8");
  const ids = new Set();
  let lastYear = 0;
  for (const s of H.slides) {
    assert.ok(!ids.has(s.id), "duplicate slide " + s.id); ids.add(s.id);
    for (const k of ["year", "era", "title", "answer", "idea"]) both(s[k], s.id + "." + k);
    assert.ok(s.story.length >= 1, s.id + ": no story"); s.story.forEach((p, i) => both(p, s.id + ".story" + i));
    assert.ok(new RegExp("\\b" + s.art + ":\\s*\\(").test(engine), s.id + ": no drawing for art " + s.art);
    const y = parseInt(s.year.en, 10);
    if (!Number.isNaN(y)) { assert.ok(y >= lastYear, s.id + ": years out of order"); lastYear = y; }
  }
  assert.ok(Number.isNaN(parseInt(H.slides[H.slides.length - 1].year.en, 10)), "the last slide is today");
});
