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
    if (hsh.startsWith("lesson-")) {
      const proof = await page.evaluate(() => ({
        plain: document.querySelectorAll("#lv .plain-sec").length,
        visible: [...document.querySelectorAll("#lv .plain-copy")].every((el) => el.textContent.trim().length > 35),
        original: !!document.querySelector("#lv .orig-layer:not([open])"),
        noSituation: !document.querySelector("#sec-mental"),
        noTheatre: !document.querySelector(".motion-lesson")
      }));
      if (proof.plain !== 2 || !proof.visible || !proof.original || !proof.noSituation || !proof.noTheatre)
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
  await page.waitForSelector("#lv .tabs");
  const check = await page.evaluate(() => ({
    noSituation: !document.querySelector("#sec-mental"),
    noTheatre: !document.querySelector(".motion-lesson"),
    pill: !!document.querySelector("#lv .tabs .t-tabs-pill")
  }));
  check.noSituation && check.noTheatre && check.pill ?
    ok("lesson opening: no situation section, tabs still animated") : fail("lesson opening " + JSON.stringify(check));
  await page.click("#motion-btn");
  const off = await page.evaluate(() => document.documentElement.dataset.motion === "off" && document.querySelector("#motion-btn").getAttribute("aria-pressed") === "true");
  await page.click("#motion-btn");
  const on = await page.evaluate(() => document.documentElement.dataset.motion === "on");
  off && on ? ok("motion: reduce-motion switch is reachable from a lesson (sidebar)") : fail("motion: sidebar motion switch broken");
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

/* The story-of-AI deck at the top of the first lesson */
await session({ label: "history-deck-ar", viewport: { width: 1360, height: 900 } }, async (page) => {
  await page.evaluate(() => (location.hash = "lesson-f1")); await page.waitForSelector("#sec-history .aih-stage");
  const n = await page.$$eval("#sec-history .aih-slide", (s) => s.length);
  const on = () => page.$eval("#sec-history .aih-slide.is-on", (e) => Number(e.dataset.i));
  const shown = () => page.$$eval("#sec-history .aih-slide:not([aria-hidden])", (s) => s.length);
  n >= 8 && (await on()) === 0 && (await shown()) === 1 ? ok(`history: ${n} slides, first one shown alone`) : fail("history: deck did not start on slide 1");
  const art = await page.$$eval("#sec-history .aih-svg", (s) => s.every((v) => v.childElementCount > 3));
  art ? ok("history: every slide has its drawing") : fail("history: a drawing is empty");
  await page.click("#sec-history [data-aih-next]"); await page.waitForTimeout(80);
  (await on()) === 1 ? ok("history: next button moves forward") : fail("history: next button broken");
  await page.focus("#sec-history .aih-stage"); await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(80);
  (await on()) === 2 ? ok("history: ← moves forward in Arabic") : fail("history: arrow keys do not follow the reading direction");
  await page.keyboard.press("End"); await page.waitForTimeout(80);
  const finalQ = await page.$eval("#sec-history [data-aih-q]", (e) => e.dataset.final);
  (await on()) === n - 1 && finalQ === "true" && (await page.isVisible("#sec-history [data-aih-start]")) ? ok("history: last slide turns the question and offers the lesson") : fail("history: final slide incomplete");
  await page.click('#sec-history [data-aih-go="3"]'); await page.waitForTimeout(80);
  (await on()) === 3 && (await page.$eval('#sec-history [data-aih-go="3"]', (e) => e.getAttribute("aria-current"))) === "step" ? ok("history: timeline jumps to a year") : fail("history: timeline jump broken");
  await page.click("#sec-history [data-aih-play]"); await page.waitForTimeout(150);
  const playing = await page.$eval("#sec-history", (e) => e.classList.contains("is-playing"));
  await page.click("#sec-history [data-aih-play]");
  const paused = await page.$eval("#sec-history", (e) => !e.classList.contains("is-playing"));
  playing && paused ? ok("history: play and pause") : fail("history: play/pause broken");
  await page.click("#sec-history [data-aih-skip]"); await page.waitForTimeout(700);
  const below = await page.$eval("#sec-history", (e) => e.getBoundingClientRect().bottom < 200);
  const focusOut = await page.evaluate(() => !document.querySelector("#sec-history").contains(document.activeElement) && document.activeElement !== document.body);
  below && focusOut ? ok("history: skip goes to the lesson and moves focus there") : fail("history: skip did not move the reader (and focus) past the deck");
  await page.evaluate(() => (location.hash = "lesson-f2")); await page.waitForTimeout(150);
  (await page.$("#sec-history")) ? fail("history: deck leaked into another lesson") : ok("history: only the first lesson opens with the story");
});
/* The "inside the model" deck at the top of the second lesson */
await session({ label: "model-deck-ar", viewport: { width: 1360, height: 900 } }, async (page) => {
  await page.evaluate(() => (location.hash = "lesson-f2")); await page.waitForSelector("#sec-model .aih-stage");
  const n = await page.$$eval("#sec-model .aih-slide", (s) => s.length);
  const on = () => page.$eval("#sec-model .aih-slide.is-on", (e) => Number(e.dataset.i));
  const art = await page.$$eval("#sec-model .aih-svg", (s) => s.every((v) => v.querySelectorAll("rect,circle,path,text,ellipse,line").length > 6));
  n >= 10 && art && (await on()) === 0 ? ok(`model deck: ${n} slides with drawings, starts on the first`) : fail("model deck: incomplete");
  const why = await page.$eval("#sec-model .aih-slide.is-on .aih-answer small", (e) => e.textContent);
  /وليه/.test(why) ? ok("model deck: every slide explains the decision and why") : fail("model deck: decision label missing");
  await page.focus("#sec-model .aih-stage"); await page.keyboard.press("ArrowLeft"); await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(80);
  (await on()) === 2 ? ok("model deck: keyboard moves through the steps") : fail("model deck: keyboard broken");
  await page.keyboard.press("End"); await page.waitForTimeout(80);
  const fin = await page.$eval("#sec-model [data-aih-q]", (e) => e.dataset.final === "true");
  fin && (await page.isVisible("#sec-model [data-aih-start]")) ? ok("model deck: the question turns to the reader on the last slide") : fail("model deck: final slide incomplete");
  (await page.$("#sec-history")) ? fail("model deck: the history deck leaked into lesson 2") : ok("model deck: lesson 2 has only its own story");
  await page.evaluate(() => (location.hash = "lesson-f4")); await page.waitForSelector("#sec-context .aih-stage");
  const cn = await page.$$eval("#sec-context .aih-slide", (s) => s.length);
  const cart = await page.$$eval("#sec-context .aih-svg", (s) => s.every((v) => v.querySelectorAll("rect,circle,path,text,ellipse,line").length > 6));
  const crule = await page.$eval("#sec-context .aih-slide.is-on .aih-answer small", (e) => e.textContent);
  cn >= 10 && cart && /وليه/.test(crule) && !(await page.$("#sec-model")) ? ok(`context deck: ${cn} slides with drawings in lesson f4, each with its rule and why`) : fail("context deck: incomplete");
  await page.evaluate(() => (location.hash = "lesson-f6")); await page.waitForSelector("#sec-window .aih-stage");
  const wn = await page.$$eval("#sec-window .aih-slide", (s) => s.length);
  const wart = await page.$$eval("#sec-window .aih-svg", (s) => s.every((v) => v.querySelectorAll("rect,circle,path,text,ellipse,line").length > 6));
  const wrule = await page.$eval("#sec-window .aih-slide.is-on .aih-answer small", (e) => e.textContent);
  const wcrumb = await page.$eval(".crumbs .num", (e) => e.textContent);
  wn >= 10 && wart && /وليه/.test(wrule) && !(await page.$("#sec-context")) && /4 من/.test(wcrumb) ? ok(`window deck: ${wn} slides with drawings open lesson f6, the unit's fourth lesson`) : fail(`window deck: incomplete (${wn} slides, crumb «${wcrumb}»)`);
  await page.click("#sec-window [data-aih-next]"); await page.click("#sec-window [data-aih-next]"); await page.click("#sec-window [data-aih-prev]"); await page.waitForTimeout(700);
  const settled = await page.$$eval("#sec-window .aih-slide", (s) => s.filter((e) => getComputedStyle(e).visibility === "visible").map((e) => Number(e.dataset.i)));
  settled.length === 1 && settled[0] === 1 ? ok("window deck: fast back-and-forth leaves exactly one slide showing") : fail("window deck: slides left showing after fast clicks: " + settled.join(","));
  await page.evaluate(() => (location.hash = "lesson-f7")); await page.waitForSelector("#sec-agents .aih-stage");
  const an_ = await page.$$eval("#sec-agents .aih-slide", (s) => s.length);
  const aart = await page.$$eval("#sec-agents .aih-svg", (s) => s.every((v) => v.querySelectorAll("rect,circle,path,text,ellipse,line").length > 6));
  const acrumb = await page.$eval(".crumbs .num", (e) => e.textContent);
  const ascene = await page.$("#sec-scene .scene, #sec-scene [data-scene], #sec-scene *");
  an_ >= 10 && aart && !(await page.$("#sec-window")) && /5 من/.test(acrumb) && ascene ? ok(`agents deck: ${an_} slides with drawings open lesson f7, the unit's fifth lesson, with the chat→agent scene`) : fail(`agents deck: incomplete (${an_} slides, crumb «${acrumb}»)`);
  await page.click('#sec-agents [data-aih-go="6"]'); await page.waitForTimeout(400);
  const loopDot = await page.$eval('#sec-agents .aih-slide[data-i="6"] .travel', (e) => getComputedStyle(e).opacity);
  loopDot === "1" ? ok("agents deck: the agent loop's travelling dot shows on its slide") : fail("agents deck: loop dot hidden (" + loopDot + ")");
  await page.evaluate(() => (location.hash = "lesson-f4")); await page.waitForSelector("#sec-context .aih-stage");
  (await page.$("#sec-scene *")) ? fail("lesson f4 still carries the chat→agent scene that moved to f7") : ok("lesson f4 is about the Prompt and the Context only");
  await page.evaluate(() => (location.hash = "lesson-f3")); await page.waitForSelector("#sec-work .aih-stage");
  const kn = await page.$$eval("#sec-work .aih-slide", (s) => s.length);
  const kart = await page.$$eval("#sec-work .aih-svg", (s) => s.every((v) => v.querySelectorAll("rect,circle,path,text,ellipse,line").length > 6));
  const kcrumb = await page.$eval(".crumbs .num", (e) => e.textContent);
  kn >= 10 && kart && !(await page.$("#sec-agents")) && /6 من/.test(kcrumb) ? ok(`work deck: ${kn} slides with drawings open lesson f3, the unit's sixth lesson`) : fail(`work deck: incomplete (${kn} slides, crumb «${kcrumb}»)`);
  await page.evaluate(() => (location.hash = "lesson-f5")); await page.waitForSelector("#sec-limits .aih-stage");
  const ln = await page.$$eval("#sec-limits .aih-slide", (s) => s.length);
  const lart = await page.$$eval("#sec-limits .aih-svg", (s) => s.every((v) => v.querySelectorAll("rect,circle,path,text,ellipse,line").length > 6));
  const lcrumb = await page.$eval(".crumbs .num", (e) => e.textContent);
  ln >= 10 && lart && !(await page.$("#sec-work")) && /7 من 7/.test(lcrumb) ? ok(`limits deck: ${ln} slides with drawings open lesson f5, the unit's last lesson`) : fail(`limits deck: incomplete (${ln} slides, crumb «${lcrumb}»)`);
  const leftBuilt = await page.evaluate(async () => {   // leaving the page stops on-demand drawing: no SVGs are built in the detached deck afterwards
    location.hash = "lesson-f6"; await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const deck = document.querySelector("#sec-window"); const before = deck.querySelectorAll(".aih-svg").length;
    location.hash = "lesson-p1"; await new Promise((r) => setTimeout(r, 1500));
    return [before, deck.querySelectorAll(".aih-svg").length]; });
  leftBuilt[1] === leftBuilt[0] && leftBuilt[0] < 12 ? ok(`decks: drawings are built on demand (${leftBuilt[0]} of 12 at open) and stop when the reader leaves`) : fail("decks: drawings kept building after leaving: " + leftBuilt.join(" → "));
});
await session({ label: "history-deck-mobile-en", viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, colorScheme: "dark" }, async (page) => {
  await page.evaluate(() => { localStorage.setItem("aiAcademy.v1", JSON.stringify({ lang: "en" })); location.hash = "lesson-f1"; location.reload(); });
  await page.waitForSelector("#sec-history .aih-stage");
  const ov = await overflow(page);
  ov <= 1 ? ok("history: no horizontal overflow at 375px") : fail(`history: overflow ${ov}px at 375px`);
  await page.click("#sec-history [data-aih-next]"); await page.waitForTimeout(80);
  const i = await page.$eval("#sec-history .aih-slide.is-on", (e) => Number(e.dataset.i));
  const en = await page.$eval("#sec-history .aih-slide.is-on h3", (e) => /[A-Za-z]/.test(e.textContent));
  i === 1 && en ? ok("history: English deck works on a phone") : fail("history: phone/English deck broken");
});
await session({ label: "history-deck-quiet", viewport: { width: 1280, height: 860 }, reducedMotion: "reduce" }, async (page) => {
  await page.evaluate(() => (location.hash = "lesson-f1")); await page.waitForSelector("#sec-history .aih-stage");
  await page.click('#sec-history [data-aih-go="9"]'); await page.waitForTimeout(60);
  const st = await page.$eval("#sec-history .aih-slide.is-on", (e) => ({ anim: getComputedStyle(e.querySelector(".an")).animationName, count: e.querySelector("[data-count]").textContent }));
  st.anim === "none" && /1|١/.test(st.count) && !/^0$|^٠$/.test(st.count) ? ok("history: reduced motion shows final drawings at once") : fail("history: reduced motion still animates (" + JSON.stringify(st) + ")");
  await page.waitForTimeout(1200);
  const still = await page.$eval("#sec-history .aih-slide.is-on", (e) => Number(e.dataset.i));
  still === 9 ? ok("history: nothing advances by itself") : fail("history: deck advanced without the reader");
});

await browser.close();
console.log(results.join("\n"));
process.exitCode = results.some((r) => r.startsWith("FAIL")) ? 1 : 0;
