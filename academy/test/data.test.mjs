// Data-integrity tests: every page covered, every cross-reference resolves, both languages present.
// Run: node --test test/
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadAcademy, strings, pairs, src, engineFiles } from "./load.mjs";

const A = loadAcademy();
const lessonIds = new Set(A.lessons.map((l) => l.id));
const promptIds = new Set(A.prompts.map((p) => p.id));
const termIds = new Set(A.glossary.map((g) => g.id));
const quizIds = new Set(A.quizzes.map((q) => q.id));
const unitIds = new Set(A.units.map((u) => u.id));
const PROMPT_CATS = new Set(["learn", "analyze", "research", "work", "automate", "build", "decide"]);
const everything = { lessons: A.lessons, prompts: A.prompts, glossary: A.glossary, quizzes: A.quizzes, cases: A.cases, compare: A.compare, pairs: A.pairs, units: A.units, scenes: A.scenes, labs: A.labs, pages: A.pages, UI: A.UI, projectChains: A.projectChains };

const pageNums = (v) => (Array.isArray(v) ? v : []).filter((n) => Number.isInteger(n));

test("every book page 1–41 is taught by at least one lesson", () => {
  const covered = new Set(A.lessons.flatMap((l) => pageNums(l.pages)));
  const missing = []; for (let p = 1; p <= 41; p++) if (!covered.has(p)) missing.push(p);
  assert.deepEqual(missing, [], "pages without a lesson: " + missing.join(", "));
});

test("ids are unique", () => {
  for (const [name, list] of [["lesson", A.lessons], ["prompt", A.prompts], ["term", A.glossary], ["quiz", A.quizzes], ["case", A.cases]]) {
    const seen = new Set(), dup = [];
    for (const x of list) { if (seen.has(x.id)) dup.push(x.id); seen.add(x.id); }
    assert.deepEqual(dup, [], `duplicate ${name} ids`);
  }
});

test("lessons reference existing units, scenes, labs, prompts, lessons and terms", () => {
  const bad = [];
  for (const l of A.lessons) {
    if (!unitIds.has(l.unit)) bad.push(`${l.id}: unit ${l.unit}`);
    if (l.scene && !A.scenes[l.scene]) bad.push(`${l.id}: scene ${l.scene}`);
    for (const lab of [].concat(l.lab || [])) if (!A.labs[lab]) bad.push(`${l.id}: lab ${lab}`);
    for (const p of l.prompts || []) if (!promptIds.has(p)) bad.push(`${l.id}: prompt ${p}`);
    for (const r of [...(l.related || []), ...(l.req || [])]) if (!lessonIds.has(r)) bad.push(`${l.id}: lesson ${r}`);
    for (const t of l.terms || []) if (!termIds.has(t)) bad.push(`${l.id}: term ${t}`);
    for (const k of ["what", "why", "how", "inside", "relation", "example", "apply", "mistakes", "check", "next"]) if (!l.card || !l.card[k]) bad.push(`${l.id}: card.${k}`);
    for (const k of ["simple", "mech", "practice", "adv"]) if (!l.levels || !l.levels[k]) bad.push(`${l.id}: level ${k}`);
    if (!l.keys || l.keys.ar.length !== l.keys.en.length) bad.push(`${l.id}: keys ar/en length`);
  }
  assert.deepEqual(bad, []);
});

test("prompts are complete and point at real lessons", () => {
  const bad = [];
  for (const p of A.prompts) {
    if (!lessonIds.has(p.lesson)) bad.push(`${p.id}: lesson ${p.lesson}`);
    if (!PROMPT_CATS.has(p.cat)) bad.push(`${p.id}: cat ${p.cat}`);
    if (!["book", "add"].includes(p.src)) bad.push(`${p.id}: src ${p.src}`);
    for (const k of ["title", "goal", "text", "tip"]) if (!p[k] || !p[k].ar || !p[k].en) bad.push(`${p.id}: ${k}`);
  }
  for (const chain in A.projectChains || {}) for (const id of A.projectChains[chain]) if (!promptIds.has(id)) bad.push(`chain ${chain}: ${id}`);
  assert.deepEqual(bad, []);
  // every lesson's unit has prompts
  for (const u of unitIds) assert.ok(A.prompts.some((p) => A.lessons.find((l) => l.id === p.lesson)?.unit === u), "no prompts for " + u);
});

test("scenes are internally consistent", () => {
  const bad = [];
  for (const [id, s] of Object.entries(A.scenes)) {
    const nodes = new Set(s.nodes.map((n) => n.id)), zones = new Set((s.zones || []).map((z) => z.id));
    const links = new Set((s.links || []).map((l) => l.from + ">" + l.to));
    if (s.lesson && !lessonIds.has(s.lesson)) bad.push(`${id}: lesson ${s.lesson}`);
    for (const l of s.links || []) if (!nodes.has(l.from) || !nodes.has(l.to)) bad.push(`${id}: link ${l.from}>${l.to}`);
    s.steps.forEach((st, i) => {
      for (const key of ["show", "add", "hl", "dim", "pulse"]) for (const n of st[key] === "*" ? [] : st[key] || []) if (!nodes.has(n)) bad.push(`${id}#${i}: ${key} ${n}`);
      for (const n of Object.keys(st.cls || {})) if (!nodes.has(n)) bad.push(`${id}#${i}: cls ${n}`);
      for (const z of st.zones || []) if (!zones.has(z)) bad.push(`${id}#${i}: zone ${z}`);
      for (const f of st.flow || []) if (!links.has(f)) bad.push(`${id}#${i}: flow ${f}`);
      if (!st.t || !st.c) bad.push(`${id}#${i}: text`);
    });
    if (s.predict) { if (!(s.predict.a >= 0 && s.predict.a < s.predict.opts.length)) bad.push(`${id}: predict.a`); if (!(s.predict.at >= 1 && s.predict.at <= s.steps.length)) bad.push(`${id}: predict.at`); }
    if (s.steps.length < 3 || s.steps.length > 8) bad.push(`${id}: ${s.steps.length} steps`);
  }
  assert.deepEqual(bad, []);
});

test("questions have valid answers (quick checks, unit quizzes, cases)", () => {
  const bad = [];
  const check = (q, where) => {
    if (q.type === "order") { if (!q.items || q.items.ar.length !== q.items.en.length || q.items.ar.length < 3) bad.push(where + ": order items"); return; }
    const n = Array.isArray(q.opts) ? q.opts.length : q.opts && q.opts.ar ? q.opts.ar.length : 0;
    if (q.opts && q.opts.ar && q.opts.ar.length !== q.opts.en.length) bad.push(where + ": opts ar/en length");
    if (!(Number.isInteger(q.a) && q.a >= 0 && q.a < n)) bad.push(where + ": answer index " + q.a + " of " + n);
    if (!q.why) bad.push(where + ": why");
  };
  for (const l of A.lessons) (l.quick || []).forEach((q, i) => check(q, `${l.id}.quick[${i}]`));
  for (const z of A.quizzes) { (z.questions || []).forEach((q, i) => { check(q, `${z.id}[${i}]`); if (q.lesson && !lessonIds.has(q.lesson)) bad.push(`${z.id}[${i}]: lesson ${q.lesson}`); }); }
  assert.deepEqual(bad, []);
});

test("every bilingual text has both Arabic and English", () => {
  const bad = [];
  for (const [path, v] of pairs(everything)) {
    const okAr = Array.isArray(v.ar) ? v.ar.length : typeof v.ar === "string" && v.ar.trim();
    const okEn = Array.isArray(v.en) ? v.en.length : typeof v.en === "string" && v.en.trim();
    if (!okAr || !okEn) bad.push(path);
  }
  assert.deepEqual(bad.slice(0, 20), []);
});

test("cross-links and page chips in all texts resolve", () => {
  const bad = [];
  const has = { t: (id) => termIds.has(id), l: (id) => lessonIds.has(id), lab: (id) => !!A.labs[id], scene: (id) => !!A.scenes[id], p: (id) => promptIds.has(id), q: (id) => quizIds.has(id) || id === "project" || id === "final" };
  for (const [path, s] of strings(everything)) {
    for (const m of s.matchAll(/\[\[(t|l|lab|scene|p|q):([\w-]+)\|[^\]]+\]\]/g)) if (!has[m[1]](m[2])) bad.push(`${path}: ${m[1]}:${m[2]}`);
    for (const m of s.matchAll(/\{p(\d+)(?:[-–](\d+))?/g)) for (const n of [m[1], m[2]].filter(Boolean)) if (+n < 1 || +n > 41) bad.push(`${path}: page ${n}`);
  }
  assert.deepEqual(bad, []);
});

test("every UI string the engine asks for exists in both languages", () => {
  const keys = new Set();
  for (const f of engineFiles) for (const m of readFileSync(src("engine", f), "utf8").matchAll(/\bt\("([\w.-]+)"\)/g)) keys.add(m[1]);
  // keys built from data values: t("kind_" + scene.kind), t("tag_" + tag), …
  for (const s of Object.values(A.scenes)) keys.add("kind_" + s.kind);
  for (const l of A.lessons) { (l.tags || []).forEach((x) => keys.add("tag_" + x)); keys.add("diff_" + (l.diff || 1)); }
  for (const p of A.prompts) keys.add("cat_" + p.cat);
  for (const c of A.cases) if (c.sector) keys.add("sector_" + c.sector);
  const missing = [...keys].filter((k) => !A.UI[k] || !A.UI[k].ar || !A.UI[k].en);
  assert.deepEqual(missing, []);
});

test("glossary terms are complete and linked to real lessons", () => {
  const bad = [];
  for (const g of A.glossary) {
    if (!g.term || !g.def) bad.push(g.id + ": term/def");
    for (const l of g.lessons || []) if (!lessonIds.has(l)) bad.push(`${g.id}: lesson ${l}`);
    for (const p of pageNums(g.pages)) if (p < 1 || p > 41) bad.push(`${g.id}: page ${p}`);
  }
  assert.deepEqual(bad, []);
  assert.ok(A.glossary.length >= 80, "glossary has " + A.glossary.length + " terms");
});

test("lab truth values stay correct (quality lab reconciles to 21,540)", () => {
  const code = readFileSync(src("engine", "labs-a.js"), "utf8");
  assert.match(code, /21540/);
  assert.doesNotMatch(code, /25890/);
});

test("cases, comparisons and pairs point at real things", () => {
  const bad = [], caseIds = new Set(A.cases.map((c) => c.id)), cmpIds = new Set(A.compare.map((c) => c.id));
  for (const u of A.units) if (u.case && !caseIds.has(u.case)) bad.push(`unit ${u.id}: case ${u.case}`);
  for (const c of A.cases) { if (c.lesson && !lessonIds.has(c.lesson)) bad.push(`case ${c.id}: lesson ${c.lesson}`); for (const k of ["title", "problem", "traditional", "ai", "steps", "result", "risks"]) if (!c[k]) bad.push(`case ${c.id}: ${k}`); }
  for (const x of A.compare) { if (x.lesson && !lessonIds.has(x.lesson)) bad.push(`compare ${x.id}: lesson`); if (!unitIds.has(x.unit)) bad.push(`compare ${x.id}: unit`); }
  for (const p of A.pairs || []) if (!cmpIds.has(p.a) || !cmpIds.has(p.b)) bad.push(`pair ${p.a}/${p.b}`);
  assert.deepEqual(bad, []);
  for (const u of unitIds) assert.ok(A.quizzes.some((q) => q.unit === u), "no quiz for " + u);
  assert.ok(A.quizzes.some((q) => q.final), "final exam missing");
});
