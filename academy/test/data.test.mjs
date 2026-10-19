// Data integrity: every page mapped, every link resolves, every prompt variable appears, every UI key exists.
// Run: node --test academy/test/data.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import path from "node:path";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");
const DATA = ["ui", "meta", "stories", "scenes", "lessons-u0", "lessons-u1", "lessons-u2", "lessons-u3u4", "lessons-u5", "lessons-xl", "course-order", "plain-talk-a", "plain-talk-b", "prompts", "quiz", "glossary", "compare", "history", "model-story", "context-story", "window-story", "agents-story", "work-story", "limits-story", "auto-story", "big-story", "kit-story", "deliver-story", "stack-story", "lookup-story", "report-story", "run-story", "match-story", "needs-story", "xl-sample"];
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
