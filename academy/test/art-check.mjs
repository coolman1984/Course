// Drawing check for every story deck, in Arabic and English: every <text> label stays inside the 480 × 320 viewBox
// and clear of every other label. Run after a build: node academy/test/art-check.mjs [deckId ...] [--shots dir]
// It walks each deck slide by slide (drawings are built on demand), waits for the entrance animations to settle,
// and reads each label's real box from the browser. Exit code 1 when anything is found.
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch { pw = require(execSync("npm root -g").toString().trim() + "/playwright"); }
const file = "file://" + resolve(new URL("../../AI_Academy.html", import.meta.url).pathname);
const args = process.argv.slice(2), si = args.indexOf("--shots"), shots = si >= 0 ? args.splice(si, 2)[1] : null;
if (shots) mkdirSync(shots, { recursive: true });
// deck id → lesson that opens with it
const DECKS = { history: "f1", model: "f2", context: "f4", window: "f6", agents: "f7", work: "f3", limits: "f5", auto: "f8" };
// intentional overlaps: the history deck's stacked rule cards
const ALLOW = [["history", 4, "IF", "THEN"]];
const want = args.length ? args : Object.keys(DECKS);
const browser = await pw.chromium.launch();
let problems = 0;
for (const lang of ["ar", "en"]) {
  // reduced motion: every drawing is shown in its final state at once, so boxes are measured where they end up
  const page = await browser.newPage({ viewport: { width: 1360, height: 900 }, reducedMotion: "reduce" });
  await page.goto(file);
  await page.evaluate((lang) => localStorage.setItem("aiAcademy.v1", JSON.stringify({ lang })), lang);
  for (const id of want) {
    await page.evaluate((l) => { location.hash = "lesson-" + l; location.reload(); }, DECKS[id]);
    await page.waitForSelector(`#sec-${id} .aih-stage`);
    // the embedded fonts load lazily (font-display: swap); measuring before they arrive reads the wider fallback font,
    // which differs between machines — load every face first so the boxes are the ones readers see
    const fonts = await page.evaluate(async () => { await Promise.all([...document.fonts].map((f) => f.load())); await document.fonts.ready; return [...document.fonts].filter((f) => f.status !== "loaded").length; });
    if (fonts) { problems++; console.log(`${lang} ${id}: ${fonts} font face(s) failed to load`); }
    const n = await page.$$eval(`#sec-${id} .aih-slide`, (s) => s.length);
    for (let i = 0; i < n; i++) {
      await page.click(`#sec-${id} [data-aih-go="${i}"]`);
      await page.waitForTimeout(150);
      const found = await page.$eval(`#sec-${id} .aih-slide[data-i="${i}"] svg`, (svg) => {
        // boxes in the root SVG's coordinates: getBBox() ignores ancestor transforms (rotated stamps, translated groups),
        // so map the four corners through the element's CTM relative to the root
        const root = svg.getScreenCTM().inverse();
        const T = [...svg.querySelectorAll("text")].map((t) => {
          const b = t.getBBox(), m = root.multiply(t.getScreenCTM()), P = svg.createSVGPoint();
          const pts = [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]].map(([x, y]) => { P.x = x; P.y = y; return P.matrixTransform(m); });
          const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
          return { s: t.textContent, x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
        });
        // a 4px safety margin: text widths differ by a few pixels between machines (CI renders slightly wider)
        const out = T.filter((t) => t.x < 4 || t.y < 1 || t.x + t.w > 476 || t.y + t.h > 319).map((t) => ["OUT", t.s]);
        const ov = [];
        for (let a = 0; a < T.length; a++) for (let c = a + 1; c < T.length; c++) {
          const A = T[a], B = T[c];
          const ix = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x), iy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
          if (ix > -2 && iy > 2) ov.push(["OVERLAP", A.s, B.s]);   // side by side, labels need at least 2px between them (same reason)
        }
        return [...out, ...ov];
      });
      const real = found.filter(([k, a, b]) => !(k === "OVERLAP" && ALLOW.some(([d, s, x, y]) => d === id && s === i && [a, b].sort().join() === [x, y].sort().join())));
      for (const f of real) { problems++; console.log(`${lang} ${id} slide ${i + 1}: ${f[0]} ${f.slice(1).map((s) => `«${s}»`).join(" / ")}`); }
      if (shots) await (await page.$(`#sec-${id} .aih-slide[data-i="${i}"] .aih-art`)).screenshot({ path: `${shots}/${id}-${lang}-${String(i + 1).padStart(2, "0")}.png` });
    }
  }
  await page.close();
}
await browser.close();
console.log(problems ? `${problems} drawing problem(s)` : `all drawings clean (${want.length} decks × 2 languages)`);
process.exit(problems ? 1 : 0);
