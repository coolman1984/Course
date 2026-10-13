// Browser smoke test: opens every route of the built file in AR and EN (desktop light, mobile dark),
// fails on any JS error, empty page, horizontal overflow on mobile, or missing-text marker.
// Run: node test/e2e-smoke.mjs   (needs Playwright + Chromium; see README)
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { root, loadAcademy } from "./load.mjs";

const PW = process.env.PLAYWRIGHT_MODULE || "playwright";
const { chromium } = await import(PW);
const A = loadAcademy();
const file = pathToFileURL(join(root, "AI-Essentials-Academy.html")).href;
const routes = ["#/", "#/map", "#/lessons", "#/labs", "#/scenes", "#/prompts", "#/cases", "#/compare", "#/glossary", "#/graph", "#/path", "#/notebook",
  "#/pages", "#/coverage", "#/review", "#/settings", "#/help", "#/quiz", "#/project",
  ...A.units.map((u) => "#/unit/" + u.id), ...A.lessons.map((l) => "#/lesson/" + l.id), ...Object.keys(A.labs).map((k) => "#/lab/" + k),
  ...Object.keys(A.scenes).map((k) => "#/scenes/" + k), ...A.quizzes.map((q) => "#/quiz/" + q.id), "#/present/" + A.lessons[0].id, "#/page/1", "#/page/41"];

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const problems = [];
let visits = 0;
for (const cfg of [{ lang: "ar", theme: "light", vp: { width: 1360, height: 900 } }, { lang: "en", theme: "light", vp: { width: 1360, height: 900 } }, { lang: "ar", theme: "dark", vp: { width: 390, height: 844 } }, { lang: "en", theme: "dark", vp: { width: 390, height: 844 } }]) {
  const ctx = await browser.newContext({ viewport: cfg.vp });
  await ctx.addInitScript((c) => { try { if (!sessionStorage.getItem("seeded")) { localStorage.setItem("ai-essentials-academy.v1", JSON.stringify({ v: 1, lang: c.lang, theme: c.theme })); sessionStorage.setItem("seeded", "1"); } } catch (e) {} }, cfg);
  const page = await ctx.newPage();
  const tag = `${cfg.lang}/${cfg.theme}/${cfg.vp.width}`;
  page.on("pageerror", (e) => problems.push(`${tag} ${page.url().split("#")[1]}: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") problems.push(`${tag} ${page.url().split("#")[1]}: console ${m.text()}`); });
  await page.goto(file + "#/");
  for (const r of routes) {
    await page.evaluate((h) => { location.hash = h; }, r);
    await page.waitForTimeout(120);
    visits++;
    const info = await page.evaluate(() => {
      const m = document.querySelector("#main");
      const W = document.documentElement.clientWidth, rtl = document.documentElement.dir === "rtl";
      const culprit = [...document.querySelectorAll("body *")].filter((el) => { const r = el.getBoundingClientRect(); return r.width && (rtl ? r.left < -1 : r.right > W + 1) && !el.closest(".sidebar"); }).slice(0, 3).map((el) => el.tagName.toLowerCase() + "." + String(el.className.baseVal ?? el.className).split(" ")[0]).join(",");
      return { culprit, len: m ? m.innerText.trim().length : 0, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, undef: /\bundefined\b|\[object Object\]|NaN/.test(m ? m.innerText : ""), dir: document.documentElement.dir };
    });
    if (info.len < 40) problems.push(`${tag} ${r}: page nearly empty (${info.len} chars)`);
    if (info.overflow > 2) problems.push(`${tag} ${r}: horizontal overflow ${info.overflow}px (${info.culprit})`);
    if (info.undef) problems.push(`${tag} ${r}: shows undefined/NaN/[object Object]`);
    if (info.dir !== (cfg.lang === "ar" ? "rtl" : "ltr")) problems.push(`${tag} ${r}: dir=${info.dir}`);
  }
  await ctx.close();
}
await browser.close();
console.log(`${visits} page visits across 4 configurations (${routes.length} routes each).`);
if (problems.length) { console.log(problems.length + " problem(s):\n" + [...new Set(problems)].join("\n")); process.exit(1); }
console.log("no problems found");
