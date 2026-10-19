// Data integrity: every page mapped, every link resolves, every prompt variable appears, every UI key exists.
// Run: node --test academy/test/data.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import path from "node:path";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");
const DATA = ["ui", "meta", "stories", "scenes", "lessons-u0", "lessons-u1", "lessons-u2", "lessons-u3u4", "lessons-u5", "lessons-xl", "course-order", "plain-talk-a", "plain-talk-b", "prompts", "quiz", "glossary", "compare", "history", "model-story", "context-story", "window-story", "agents-story", "work-story", "limits-story", "auto-story", "big-story", "kit-story", "deliver-story", "stack-story", "lookup-story", "report-story", "run-story", "xl-sample"];
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
  assert.equal(u1.join(" "), "x1 x2 x3 x4 x5 x6", "unit 1 (shown as 2): the kit, delivery, the three tools, fixing");
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

test("the unit-2 sample kit: a correct tool, run on the files, finds exactly the figures the lessons and the answer key quote", () => {
  const S = A.xlSample, E = S.expected;
  for (const lang of ["ar", "en"]) {
    const files = S.build(lang), H = S.headers, at = (head, h) => head.indexOf(h[lang]);
    const weeks = files.filter((f) => f.path.startsWith("Production_2026_Q1/"));
    assert.equal(weeks.length, E.files);
    let read = 0, skipped = 0, text = 0;
    const rows = [], seen = new Set(), dups = [];
    for (const f of weeks) {
      const [head, ...body] = f.sheets[0].rows;
      const qi = at(head, H.prod[4]) >= 0 ? at(head, H.prod[4]) : at(head, H.qtyAlt), vi = at(head, H.prod[5]);   // by name, with the agreed alias
      assert.ok(qi >= 0 && vi >= 0, `${f.path}: columns`);
      for (const r of body) {
        if (r[1] === null) { skipped++; continue; }
        read++; if (typeof r[0] === "string") text++;
        const key = JSON.stringify(r);
        if (seen.has(key)) { dups.push(r); continue; } seen.add(key);
        rows.push({ day: typeof r[0] === "string" ? Math.round((Date.UTC(2026, +r[0].slice(3, 5) - 1, +r[0].slice(0, 2)) - Date.UTC(2026, 0, 1)) / 864e5) : r[0].d - S.serial0, ln: String(r[2]).trim().toUpperCase(), raw: r[2], mc: r[3], q: r[qi], v: r[vi] });
      }
    }
    const sum = (a, k = "v") => a.reduce((s, x) => s + x[k], 0);
    assert.equal(read, E.rowsRead); assert.equal(skipped, E.totalsRowSkipped); assert.equal(dups.length, E.duplicates); assert.equal(rows.length, E.rowsClean);
    assert.equal(text, E.textDates); assert.equal(sum(rows), E.value); assert.equal(sum(rows, "q"), E.units); assert.equal(rows.filter((r) => r.q < 0).length, E.returns);
    assert.equal(rows.filter((r) => r.raw === "L04 ").length, E.spacedLine); assert.equal(rows.filter((r) => r.raw === "l03").length, E.lowerLine);
    assert.equal(sum(rows), sum(S.truth()), "the planted problems, handled, give back the true output");
    const masters = files.find((f) => f.path === "Masters.xlsx"), mod = masters.sheets[1].rows.slice(1);
    const codes = mod.map((p) => p[0]), twice = codes.filter((c, i) => codes.indexOf(c) !== i);
    assert.equal(twice.join(), "M108", "one model listed twice");
    const un = rows.filter((r) => !codes.includes(r.mc));
    assert.ok(un.every((r) => r.mc === E.unmatched.code)); assert.equal(un.length, E.unmatched.rows); assert.equal(sum(un, "q"), E.unmatched.units); assert.equal(sum(un), E.unmatched.value);
    assert.ok(rows.every((r) => S.lines.includes(r.ln)), "every line matches once normalised");
    const pl = files.find((f) => f.path === "Plan_2026_Q1.xlsx").sheets[0].rows.slice(1);
    assert.equal(pl.length, E.plans); assert.ok(!pl.some((t) => t[0] === E.missingPlan.line && t[1] === E.missingPlan.month));
    const pct = pl.map(([b, m, g]) => ({ b, m, p: Math.round((sum(rows.filter((r) => r.ln === b && "2026-0" + S.monthOf(r.day) === m), "q") / g) * 1000) / 10 }));
    const hi = pct.reduce((a, x) => (x.p > a.p ? x : a)), lo = pct.reduce((a, x) => (x.p < a.p ? x : a));
    assert.equal([hi.b, hi.m, hi.p, lo.b, lo.m, lo.p].join(), [E.best.line, E.best.month, E.best.pct, E.worst.line, E.worst.month, E.worst.pct].join());
    const w11 = weeks.find((f) => f.path.endsWith("Week_11.xlsx")).sheets[0].rows;
    assert.equal(w11.length - 1, E.week11Rows); assert.ok(!w11[0].includes(H.prod[4][lang]), "week 11 renames the quantity column");
    assert.ok(S.answerKey(lang).includes(E.value.toLocaleString("en-US")) && S.readme(lang).includes("Week_13.xlsx"));
  }
});

test("the unit-2 kit's figures appear the same in Arabic and English lesson texts", () => {
  const ar = (s) => String(s).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[٬,]/g, "").replace(/٫/g, ".");
  const nums = (s) => [...ar(s).matchAll(/\d+(?:\.\d+)?/g)].map((m) => m[0]).sort().join(" ");
  for (const l of A.lessons.filter((x) => x.unit === "u1")) for (const k of Object.keys(l.levels)) for (const x of l.levels[k])
    assert.equal(nums(x.ar), nums(x.en), `${l.id}.${k}.${x.k}: Arabic and English quote different figures`);
});
