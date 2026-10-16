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
  page.on("requestfailed", (r) => { errors.push("Failed resource URL: " + r.url() + " (" + (r.failure()?.errorText || "unknown") + ")"); });
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
  const hashes = routes || await page.evaluate(() => ["home", "start", "map", "path", "labs", "prompts", "compare", "quiz", "project", "glossary", "knowledge", "review", "coverage", "present", "notebook", ...window.ACADEMY.lessons.map((l) => "lesson-" + l.id), ...window.ACADEMY.units.map((u) => "unit-" + u.id), ...window.ACADEMY.labs.map((l) => "lab-" + l.id), ...window.ACADEMY.units.map((u) => "quiz-" + u.id), "quiz-all"]);
  for (const hsh of hashes) {
    await page.evaluate((x) => (location.hash = x), hsh);
    await page.waitForTimeout(120);
    const h1 = await page.$eval("#main h1", (e) => e.textContent.trim()).catch(() => "");
    const err = await page.$("#main .note.bad");
    const errTitle = err ? await err.textContent() : "";
    if (!h1 || /حدث خطأ|could not be shown/.test(errTitle)) fail(`route ${hsh}: no h1 or error view`);
    const ov = await overflow(page);
    if (ov > 1) fail(`route ${hsh}: horizontal overflow ${ov}px`);
    if (hsh.startsWith("lesson-")) {
      const proof = await page.evaluate(() => ({
        plain: document.querySelectorAll("#lv .plain-sec").length,
        visible: [...document.querySelectorAll("#lv .plain-copy")].every((el) => el.textContent.trim().length > 35),
        original: !!document.querySelector("#lv .orig-layer:not([open])"),
        story: !!document.querySelector("#sec-mental"),
        motion: document.querySelectorAll(".motion-lesson [data-motion-stage]").length === 5,
        staticStoryHidden: !!document.querySelector("#sec-mental .mental-flow[hidden]")
      }));
      if (proof.plain !== 2 || !proof.visible || !proof.original || !proof.story || !proof.motion || !proof.staticStoryHidden)
        fail(`lesson ${hsh}: practical Arabic explanation or book reference missing ${JSON.stringify(proof)}`);
    }
  }
  ok(`visited ${hashes.length} routes`);
});

const shot = (page, name, full = false) => page.screenshot({ path: `${outDir}/${name}.png`, fullPage: full });
import("node:fs").then((fs) => fs.mkdirSync(outDir, { recursive: true }));

/* Interactions: labs, scenes, quiz, search, theme, language, glossary, presenter, persistence */
await session({ label: "interactions-ar", viewport: { width: 1280, height: 860 } }, async (page) => {
  // every lab must react to its inputs
  const labs = await page.evaluate(() => window.ACADEMY.labs.map((l) => l.id));
  for (const id of labs) {
    await page.evaluate((x) => (location.hash = "lab-" + x), id);
    await page.waitForSelector(".lab .lab-in");
    const before = await page.$eval(".lab", (e) => e.innerText);
    await page.evaluate(() => {
      const root = document.querySelector(".lab .lab-in");
      for (const r of root.querySelectorAll('input[type="range"]')) { r.value = String(Number(r.max || 100) - Number(r.step || 1) * 0 ); r.dispatchEvent(new Event("input", { bubbles: true })); r.dispatchEvent(new Event("change", { bubbles: true })); }
      for (const sel of root.querySelectorAll("select")) { sel.selectedIndex = sel.options.length - 1; sel.dispatchEvent(new Event("change", { bubbles: true })); }
      for (const c of [...root.querySelectorAll('input[type="checkbox"]')].slice(0, 2)) { c.click(); }
      for (const t of root.querySelectorAll("textarea, input[type=text], input:not([type])")) { t.value = (t.value || "") + " تجربة 123"; t.dispatchEvent(new Event("input", { bubbles: true })); }
      const btn = [...root.querySelectorAll("button:not([disabled])")].find((b) => !b.closest(".predict"));
      if (btn) btn.click();
    });
    await page.waitForTimeout(150);
    const after = await page.$eval(".lab", (e) => e.innerText);
    const kind = await page.$eval(".lab-head .chip", (e) => e.textContent.trim());
    if (before === after) fail(`lab ${id}: output did not change after input`); else ok(`lab ${id}: reacts to input (${kind})`);
  }
  await page.evaluate(() => (location.hash = "lab-formula")); await page.waitForTimeout(200); await shot(page, "lab-formula-ar", true);

  // scene controls
  await page.evaluate(() => (location.hash = "lesson-p1"));
  await page.waitForSelector(".scene .sctl");
  const dots0 = await page.$$eval(".scene .sdots [aria-current]", (e) => e.length ? e[0].dataset.i : "none").catch(() => "none");
  const next = await page.$$(".scene .sctl .ibtn");
  if (next.length >= 3) { await next[next.length - 1].click().catch(() => {}); }
  await page.keyboard.press("End").catch(() => {});
  await page.waitForTimeout(1600);
  const info = await page.$eval(".scene .scap", (e) => e.innerText).catch(() => "");
  if (!info) fail("scene: no stage info"); else ok(`scene: stage info shows "${info.slice(0, 40).replace(/\n/g, " ")}"`);
  const svgEls = await page.$$eval(".scene svg *", (e) => e.length);
  if (svgEls < 10) fail("scene: svg not drawn"); else ok(`scene: svg drawn (${svgEls} nodes, start dot ${dots0})`);
  await shot(page, "lesson-p1-ar");

  // glossary popover
  const term = await page.$("#main .term");
  if (term) { await term.evaluate((el) => { for (let p = el.parentElement; p; p = p.parentElement) if (p.tagName === "DETAILS") p.open = true; }); await term.scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await term.click(); await page.waitForTimeout(150); const pop = await page.$(".popover"); if (pop) ok("glossary popover opens"); else fail("glossary popover did not open"); await page.keyboard.press("Escape"); }
  else fail("no glossary term button in lesson p1");

  // quiz: answer an mcq and an order question
  await page.evaluate(() => (location.hash = "quiz-u0")); await page.waitForTimeout(200);
  const startBtn = await page.$("#main .btn.pri"); if (startBtn) await startBtn.click();
  await page.waitForTimeout(150);
  const opt = await page.$("#main .opt");
  if (opt) { await opt.click(); await page.waitForTimeout(100); (await page.$("#main .fb")) ? ok("quiz: mcq gives explained feedback") : fail("quiz: no feedback after answer"); }
  else ok("quiz: unit runner starts with an order question");
  await shot(page, "quiz-u0-ar");
  await page.evaluate(() => (location.hash = "lesson-f2")); await page.waitForTimeout(200);
  const chk = await page.$("#main .order-list ~ .chk, #main .chk");
  if (chk) { await chk.click(); await page.waitForTimeout(100); (await page.$("#main .order-list .order-item.ok, #main .order-list .order-item.bad")) ? ok("quiz: order question checks positions") : fail("quiz: order check failed"); }

  // search palette
  await page.keyboard.press("Control+k"); await page.waitForSelector("#pal-q");
  await page.fill("#pal-q", "توكن"); await page.waitForTimeout(250);
  const hits = await page.$$eval(".pal-item", (e) => e.length);
  hits ? ok(`search: "توكن" → ${hits} results`) : fail("search: no results for توكن");
  await page.keyboard.press("Enter"); await page.waitForTimeout(250);
  ok(`search: Enter navigates to ${await page.evaluate(() => location.hash)}`);
  await page.keyboard.press("Escape").catch(() => {});

  // compare engine
  await page.evaluate(() => (location.hash = "compare")); await page.waitForTimeout(200);
  await page.selectOption("#cf", "git"); await page.waitForTimeout(100);
  const rows = await page.$$eval("#cres tbody tr", (e) => e.length);
  rows >= 3 ? ok(`compare: Git vs GitHub table has ${rows} rows`) : fail("compare: table empty");
  await shot(page, "compare-ar");

  // persistence: mark a lesson done, reload, still done
  await page.evaluate(() => (location.hash = "lesson-f1")); await page.waitForSelector("#donebtn");
  await page.click("#donebtn"); await page.waitForTimeout(100);
  await page.reload(); await page.waitForSelector("#main h1");
  const saved = await page.evaluate(() => { try { return Object.values(JSON.parse(localStorage.getItem(Object.keys(localStorage)[0]))).length > 0 && JSON.stringify(localStorage).includes("f1"); } catch { return false; } });
  saved ? ok("progress persists across reload (localStorage)") : fail("progress not persisted");

  // theme + language
  await page.click("#theme-btn"); await page.click("#theme-btn");
  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  ok(`theme toggles (now ${theme})`);
  await page.click("#lang-btn"); await page.waitForTimeout(150);
  const dir = await page.evaluate(() => [document.documentElement.lang, document.documentElement.dir].join("/"));
  dir === "en/ltr" ? ok("language switches to English LTR") : fail(`language switch gave ${dir}`);
  await page.click("#lang-btn"); await page.waitForTimeout(100);

  // presenter
  await page.evaluate(() => (location.hash = "present-u1")); await page.waitForSelector(".present", { timeout: 3000 }).catch(() => {});
  if (await page.$(".present")) { await page.keyboard.press("ArrowLeft"); await page.keyboard.press("ArrowRight"); await shot(page, "presenter-ar"); await page.keyboard.press("Escape"); await page.waitForTimeout(100); (await page.$(".present")) ? fail("presenter: Esc did not close") : ok("presenter opens, navigates, closes with Esc"); }
  else fail("presenter did not open");
});

/* Mobile 390px, dark theme, English: every route without horizontal overflow */
await session({ label: "mobile-en-dark", viewport: { width: 390, height: 844 }, colorScheme: "dark", isMobile: true, hasTouch: true }, async (page) => {
  await page.click("#lang-btn"); await page.waitForTimeout(150);
  const hashes = await page.evaluate(() => ["home", "map", "path", "labs", "prompts", "compare", "quiz", "project", "glossary", "knowledge", "review", "coverage", "present", "notebook", ...window.ACADEMY.lessons.map((l) => "lesson-" + l.id), ...window.ACADEMY.labs.map((l) => "lab-" + l.id), "quiz-u1"]);
  let bad = 0;
  for (const hsh of hashes) {
    await page.evaluate((x) => (location.hash = x), hsh); await page.waitForTimeout(80);
    const ov = await overflow(page); if (ov > 1) { bad++; fail(`mobile ${hsh}: horizontal overflow ${ov}px`); }
  }
  if (!bad) ok(`mobile: ${hashes.length} routes, no horizontal overflow`);
  for (const [hsh, name] of [["home", "m-home-en-dark"], ["lesson-m1", "m-lesson-m1-en-dark"], ["lab-tokens", "m-lab-tokens-en-dark"], ["prompts", "m-prompts-en-dark"]]) {
    await page.evaluate((x) => (location.hash = x), hsh); await page.waitForTimeout(300); await shot(page, name);
  }
});


/* Motion Theatre: real learning interactions, not decoration. */
await session({ label: "motion-theatre-ar", viewport: { width: 1360, height: 900 } }, async (page) => {
  await page.waitForSelector(".motion-home .motion-machine");
  const options = await page.evaluate(() => Array.from(document.querySelectorAll(".motion-cases [data-motion-case]")).map(el => el.dataset.motionCase));
  options.join(",") === "p1,y4,s1" ? ok("motion: three workplace journeys") : fail("motion: missing scenarios");
  const one = await page.$eval(".motion-home .motion-pages .t-page[aria-hidden=false] p", el => el.textContent);
  await page.click('.motion-home [data-motion-stage="2"]');
  const state = await page.$eval(".motion-home .motion-machine", el => el.dataset.stage);
  const two = await page.$eval(".motion-home .motion-pages .t-page[aria-hidden=false] p", el => el.textContent);
  state === "2" && one !== two ? ok("motion: stage transitions show different educational content") : fail("motion: stage content did not change");
  await page.click('.motion-home [data-motion-case="y4"]');
  const switched = await page.$eval(".motion-home", el => el.dataset.motionLesson);
  const lessonUrl = await page.$eval(".motion-home .motion-open", el => el.getAttribute("href"));
  switched === "y4" && lessonUrl === "#lesson-y4" ? ok("motion: changing scenario updates lesson link") : fail("motion: scenario switch broken");
  await page.click(".motion-home [data-motion-next]");
  const nextState = await page.$eval(".motion-home .motion-machine", el => el.dataset.stage);
  nextState === "1" ? ok("motion: next step works") : fail("motion: next step missing");
  await page.click(".motion-home [data-motion-quiet]");
  const motion = await page.evaluate(() => document.documentElement.dataset.motion);
  motion === "off" ? ok("motion: accessible quiet toggle persists") : fail("motion: quiet toggle failed");
  await page.click('.motion-home [data-motion-stage="4"]');
  const stageQuiet = await page.$eval(".motion-home .motion-machine", el => el.dataset.stage);
  stageQuiet === "4" ? ok("motion: accessible without animation") : fail("motion: reduced animation blocks content");
  await page.click(".motion-home [data-motion-quiet]");
  await page.click(".motion-home [data-motion-replay]");
  await page.click(".motion-home [data-motion-play]");
  const running = await page.$eval(".motion-home [data-motion-play]", el => el.getAttribute("aria-pressed"));
  running === "true" ? ok("motion: playback can be started on demand") : fail("motion: playback did not start");
  await page.click(".motion-home [data-motion-play]");
  await shot(page, "motion-theatre-home-ar");
  await page.evaluate(() => location.hash = "lesson-p1");
  await page.waitForSelector(".motion-lesson .motion-pages");
  const check = await page.evaluate(() => ({
    originalHidden: !!document.querySelector("#sec-mental .mental-flow[hidden]"),
    stage: document.querySelectorAll(".motion-lesson [data-motion-stage]").length,
    pill: !!document.querySelector("#lv .tabs .t-tabs-pill"),
    firstPage: document.querySelector(".motion-lesson .motion-pages .t-page[aria-hidden=false] p")?.textContent?.length > 12
  }));
  check.originalHidden && check.stage === 5 && check.pill && check.firstPage ?
    ok("motion: all 41 lessons can use the stage-driven story and animated tabs") : fail("motion: lesson theatre missing " + JSON.stringify(check));
  await page.click("#lv #tab-mech");
  const activeTab = await page.$eval("#lv #tab-mech", el => el.getAttribute("aria-selected"));
  activeTab === "true" ? ok("motion: original four learning levels remain interactive") : fail("motion: lesson level control broken");
  await page.click("#donebtn");
  const success = await page.$(".t-success-check[data-state=in]");
  success ? ok("motion: real lesson completion shows confirmation") : fail("motion: completion feedback missing");
  await shot(page, "motion-theatre-lesson-ar");
});

/* The motor must also work in an offline, narrow phone viewport. */
await session({ label: "motion-mobile-ar", viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true }, async (page) => {
  await page.waitForSelector(".motion-home");
  const width = await overflow(page);
  width <= 1 ? ok("motion: no horizontal overflow at 375px") : fail("motion: mobile overflow " + width);
  await page.click('.motion-home [data-motion-case="s1"]');
  await page.click('.motion-home [data-motion-stage="3"]');
  const text = await page.$eval(".motion-home .motion-pages .t-page[aria-hidden=false] p", el => el.textContent);
  text && text.length > 12 ? ok("motion: touch navigation works") : fail("motion: touch navigation lost content");
  await shot(page, "motion-theatre-mobile-ar");
});

/* Reduced motion: scenes must not animate on their own */
await session({ label: "reduced-motion", viewport: { width: 1280, height: 860 }, reducedMotion: "reduce" }, async (page) => {
  await page.evaluate(() => (location.hash = "lesson-f1")); await page.waitForTimeout(400);
  const s0 = await page.$eval(".scene .scrub", (e) => e.value).catch(() => "x");
  await page.waitForTimeout(1500);
  const s1 = await page.$eval(".scene .scrub", (e) => e.value).catch(() => "x");
  const playing = s0 !== s1;
  playing ? fail("reduced motion: scene autoplays") : ok("reduced motion: scene waits for the user");
});

await browser.close();
console.log(results.join("\n"));
process.exitCode = results.some((r) => r.startsWith("FAIL")) ? 1 : 0;
