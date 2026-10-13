// Browser journey test: opens the built file offline in Chromium, walks every route, exercises labs,
// checks console errors, network requests, horizontal overflow, and saves screenshots.
// Run: node academy/test/e2e.mjs [outDir]
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { resolve } from "node:path";
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch { pw = require(execSync("npm root -g").toString().trim() + "/playwright"); }
const file = "file://" + resolve(new URL("../../AI_Academy.html", import.meta.url).pathname);
const outDir = process.argv[2] || "/tmp/academy-shots";
const results = []; const fail = (m) => results.push("FAIL " + m); const ok = (m) => results.push("ok   " + m);
const browser = await pw.chromium.launch();
async function session(opts, fn) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errors = []; const net = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("request", (r) => { if (!r.url().startsWith("file:") && !r.url().startsWith("data:") && !r.url().startsWith("blob:")) net.push(r.url()); });
  await page.goto(file);
  await page.waitForSelector("#main h1");
  await fn(page);
  if (errors.length) fail(`${opts.label}: console errors: ${[...new Set(errors)].slice(0, 6).join(" | ")}`); else ok(`${opts.label}: no console errors`);
  if (net.length) fail(`${opts.label}: network requests: ${net.slice(0, 3).join(", ")}`); else ok(`${opts.label}: zero network requests (offline)`);
  await ctx.close();
}
const overflow = (page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
export { session, overflow, ok, fail, results, browser, outDir };
const routes = process.env.ROUTES ? process.env.ROUTES.split(",") : null;
await session({ label: "desktop-ar", viewport: { width: 1440, height: 900 } }, async (page) => {
  const hashes = routes || await page.evaluate(() => ["home", "map", "path", "labs", "prompts", "compare", "quiz", "project", "glossary", "knowledge", "review", "coverage", "present", "notebook", ...window.ACADEMY.lessons.map((l) => "lesson-" + l.id), ...window.ACADEMY.units.map((u) => "unit-" + u.id), ...window.ACADEMY.labs.map((l) => "lab-" + l.id), ...window.ACADEMY.units.map((u) => "quiz-" + u.id), "quiz-all"]);
  for (const hsh of hashes) {
    await page.evaluate((x) => (location.hash = x), hsh);
    await page.waitForTimeout(120);
    const h1 = await page.$eval("#main h1", (e) => e.textContent.trim()).catch(() => "");
    const err = await page.$("#main .note.bad");
    const errTitle = err ? await err.textContent() : "";
    if (!h1 || /حدث خطأ|could not be shown/.test(errTitle)) fail(`route ${hsh}: no h1 or error view`);
    const ov = await overflow(page);
    if (ov > 1) fail(`route ${hsh}: horizontal overflow ${ov}px`);
  }
  ok(`visited ${hashes.length} routes`);
});
await browser.close();
console.log(results.join("\n"));
process.exitCode = results.some((r) => r.startsWith("FAIL")) ? 1 : 0;
