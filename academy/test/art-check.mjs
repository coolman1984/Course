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
  const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
  await page.goto(file);
  await page.evaluate((lang) => { localStorage.setItem("aiAcademy.v1", JSON.stringify({ lang })); document.documentElement.dataset.motion = "off"; }, lang);
  for (const id of want) {
    await page.evaluate((l) => { location.hash = "lesson-" + l; location.reload(); }, DECKS[id]);
    await page.waitForSelector(`#sec-${id} .aih-stage`);
    const n = await page.$$eval(`#sec-${id} .aih-slide`, (s) => s.length);
    for (let i = 0; i < n; i++) {
      await page.click(`#sec-${id} [data-aih-go="${i}"]`);
      await page.waitForTimeout(450);
      const found = await page.$eval(`#sec-${id} .aih-slide[data-i="${i}"] svg`, (svg) => {
        const T = [...svg.querySelectorAll("text")].map((t) => { const b = t.getBBox(); return { s: t.textContent, x: b.x, y: b.y, w: b.width, h: b.height }; });
        const out = T.filter((t) => t.x < -1 || t.y < -1 || t.x + t.w > 481 || t.y + t.h > 321).map((t) => ["OUT", t.s]);
        const ov = [];
        for (let a = 0; a < T.length; a++) for (let c = a + 1; c < T.length; c++) {
          const A = T[a], B = T[c];
          const ix = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x), iy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
          if (ix > 2 && iy > 2) ov.push(["OVERLAP", A.s, B.s]);
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
