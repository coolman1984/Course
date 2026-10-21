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
  const hashes = routes || await page.evaluate(() => ["home", "start", "start-excel-company-laptop", "map", "path", "labs", "prompts", "compare", "quiz", "project", "glossary", "knowledge", "review", "coverage", "present", "notebook", ...window.ACADEMY.lessons.map((l) => "lesson-" + l.id), ...window.ACADEMY.units.map((u) => "unit-" + u.id), ...window.ACADEMY.labs.map((l) => "lab-" + l.id), ...window.ACADEMY.units.map((u) => "quiz-" + u.id), "quiz-all"]);
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

  // presenter: a full-screen player per unit; remote keys, black screen, resume, a lesson's own button
  await page.evaluate(() => (location.hash = "present-u0")); await page.waitForSelector(".cine", { timeout: 3000 }).catch(() => {});
  if (await page.$(".cine")) {
    const cnt = () => page.$eval("[data-c-count]", (e) => Number(e.textContent.split("/")[0]));
    const a = await cnt();
    await page.keyboard.press("PageDown"); await page.keyboard.press("PageDown"); await page.keyboard.press("PageDown"); await page.waitForTimeout(200);
    const b = await cnt();
    const deckOn = await page.$(".cine-frame .aih-present .aih-slide.is-on");
    b === a + 3 && deckOn ? ok("presenter: remote PageDown steps into the lesson's story deck") : fail(`presenter: PageDown ${a} → ${b}, deck ${!!deckOn}`);
    await page.keyboard.press("PageUp"); await page.waitForTimeout(150);
    (await cnt()) === b - 1 ? ok("presenter: PageUp goes back") : fail("presenter: PageUp did not go back");
    await page.keyboard.press("b"); const black = await page.$eval("[data-c-screen]", (e) => !e.hidden && e.classList.contains("black"));
    await page.keyboard.press("PageDown"); const back = await page.$eval("[data-c-screen]", (e) => e.hidden);
    black && back && (await cnt()) === b - 1 ? ok("presenter: B blanks the screen, the next key only brings the picture back") : fail("presenter: black screen");
    await page.keyboard.press("b"); await page.keyboard.press("l"); await page.waitForTimeout(60);
    const nb = await page.evaluate(() => ({ screen: document.querySelector("[data-c-screen]").hidden, spot: document.querySelector("[data-c-spotlight]").hidden }));
    nb.screen && nb.spot ? ok("presenter: on a blank screen any key (even L) only brings the picture back") : fail("presenter: shortcut acted behind the blank screen " + JSON.stringify(nb));
    await page.keyboard.press("3"); await page.keyboard.press("0"); await page.keyboard.press("Enter"); await page.waitForTimeout(150);
    (await cnt()) === 30 ? ok("presenter: typing a number + Enter jumps to that slide") : fail("presenter: jump went to " + (await cnt()));
    // the whole story is on screen (no notes panel): both paragraphs of the current deck slide are visible inside the frame
    const fits = await page.evaluate(() => { const sl = document.querySelector(".cine-frame .aih-slide.is-on"); if (!sl) return "no deck slide"; const f = document.querySelector(".cine-frame").getBoundingClientRect(); const ps = [...sl.querySelectorAll(".aih-txt p, .aih-answer, .aih-idea")]; return ps.length >= 4 && ps.every((p) => { const r = p.getBoundingClientRect(); return r.height > 0 && r.top >= f.top - 1 && r.bottom <= f.bottom + 1; }) ? "ok" : "cut"; });
    fits === "ok" ? ok("presenter: the full story text shows inside the frame") : fail("presenter: story text " + fits);
    await shot(page, "presenter-ar");
    await page.keyboard.press("Escape"); await page.waitForTimeout(100);
    (await page.$(".cine")) ? fail("presenter: Escape did not close it") : ok("presenter: Escape closes it");
    await page.evaluate(() => window.ACADEMY.openPresenter("u0")); await page.waitForSelector(".cine");
    (await cnt()) === 30 ? ok("presenter: reopens where it stopped") : fail("presenter: did not resume (" + (await cnt()) + ")");
    // the saved place survives turning the questions off (the plan gets shorter): it is kept by lesson and part, not index
    const place = () => page.evaluate(() => document.querySelector("[data-c-chapter]").textContent + " · slide " + (document.querySelector(".cine-frame .aih-slide.is-on") || {}).dataset?.i);
    const before = await place();
    await page.keyboard.press("c"); await page.waitForSelector("[data-c-qs]"); await page.click("[data-c-qs]"); await page.keyboard.press("Escape");
    await page.keyboard.press("Escape"); await page.waitForTimeout(80);
    await page.evaluate(() => window.ACADEMY.openPresenter("u0")); await page.waitForSelector(".cine");
    const after = await place();
    after === before ? ok("presenter: resumes on the same slide after the questions setting changes") : fail(`presenter: resumed at «${after}», expected «${before}»`);
    await page.keyboard.press("c"); await page.waitForSelector("[data-c-qs]"); await page.click("[data-c-qs]"); await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");
    await page.evaluate(() => (location.hash = "lesson-f6")); await page.waitForSelector("#present-l");
    await page.click("#present-l"); await page.waitForSelector(".cine");
    const ch = await page.$eval("[data-c-chapter]", (e) => e.textContent);
    /4/.test(ch) ? ok("presenter: a lesson's button opens the show at that lesson") : fail("presenter: lesson button opened at " + ch);
    await page.keyboard.press("Escape");
  } else fail("presenter did not open");
});

/* Mobile 390px, dark theme, English: every route without horizontal overflow */
await session({ label: "mobile-en-dark", viewport: { width: 390, height: 844 }, colorScheme: "dark", isMobile: true, hasTouch: true }, async (page) => {
  await page.click("#more-btn"); await page.click("#lang-btn"); await page.waitForTimeout(150);   // on a phone the language switch sits behind «المزيد»
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


/* The home page has no motion theatre (removed 2026-10-17); lessons keep their animated level tabs. */
await session({ label: "motion-lesson-ar", viewport: { width: 1360, height: 900 } }, async (page) => {
  await page.waitForSelector("#main .home");
  const gone = await page.evaluate(() => !document.querySelector(".motion-theatre, .motion-home, [data-motion-case]"));
  gone ? ok("home: the motion theatre section is gone") : fail("home: motion theatre still rendered");
  const desk = await page.evaluate(() => getComputedStyle(document.querySelector("#more-btn")).display === "none" && document.querySelector("#theme-btn").getBoundingClientRect().width > 0);
  desk ? ok("header: desktop keeps every action inline, no «المزيد»") : fail("header: desktop header changed");
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

/* Phone header: four main actions at full tap size; the rest behind «المزيد». */
await session({ label: "phone-header-ar", viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true }, async (page) => {
  await page.waitForSelector("#main .home");
  const width = await overflow(page);
  width <= 1 ? ok("home: no horizontal overflow at 375px") : fail("home: mobile overflow " + width);
  const sizes = await page.evaluate(() => ["#menu-btn", "#watch-btn", "#search-btn", "#more-btn"].map((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [s, Math.round(r.width), Math.round(r.height)]; }));
  sizes.every(([, w, h]) => w >= 44 && h >= 44) ? ok("header: main phone buttons are at least 44px") : fail("header sizes " + JSON.stringify(sizes));
  const hidden = await page.evaluate(() => getComputedStyle(document.querySelector("#bar-x")).display === "none" && document.querySelector("#more-btn").getAttribute("aria-expanded") === "false");
  hidden ? ok("header: secondary actions start folded") : fail("header: secondary actions visible on phone");
  const brand = await page.evaluate(() => { const a = document.querySelector(".brand-mark").getBoundingClientRect(), b = document.querySelector("#watch-btn").getBoundingClientRect(); return Math.min(a.right, b.right) - Math.max(a.left, b.left); });
  brand <= 0 ? ok("header: watch button no longer covers the logo") : fail("header: watch overlaps logo by " + brand + "px");
  await page.click("#more-btn");
  const open = await page.evaluate(() => { const x = document.querySelector("#bar-x"); return getComputedStyle(x).display !== "none" && document.querySelector("#more-btn").getAttribute("aria-expanded") === "true" && ["#theme-btn", "#lang-btn", "#view-btn"].every((s) => document.querySelector(s).getBoundingClientRect().height >= 44); });
  open ? ok("header: «المزيد» opens theme, language and reading settings") : fail("header: more panel did not open");
  await page.keyboard.press("Escape");
  const closed = await page.evaluate(() => getComputedStyle(document.querySelector("#bar-x")).display === "none");
  closed ? ok("header: Escape closes the panel") : fail("header: Escape left the panel open");
  // reading settings opened from «المزيد»: the panel stays on screen, and Escape closes it alone, focus on a visible button
  const inView = async () => page.evaluate(() => { const r = document.querySelector(".vpanel").getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; });
  await page.click("#more-btn"); await page.click("#view-btn"); await page.waitForSelector(".vpanel");
  (await inView()) ? ok("header: reading settings panel fits the phone screen (Arabic)") : fail("header: reading settings panel runs off the screen (Arabic)");
  await page.keyboard.press("Escape");
  const step = await page.evaluate(() => { const f = document.activeElement; return !document.querySelector(".vpanel") && getComputedStyle(document.querySelector("#bar-x")).display !== "none" && f.id === "view-btn" && f.getBoundingClientRect().width > 0; });
  step ? ok("header: Escape closes reading settings first, «المزيد» stays open") : fail("header: Escape from reading settings left focus on a hidden button");
  await page.keyboard.press("Escape");
  await page.click("#more-btn"); await page.click("#lang-btn"); await page.waitForTimeout(150); await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 320, height: 640 });
  await page.click("#more-btn"); await page.click("#view-btn"); await page.waitForSelector(".vpanel");
  (await inView()) ? ok("header: reading settings panel fits a 320px screen (English)") : fail("header: reading settings panel runs off the screen (English)");
  await page.keyboard.press("Escape"); await page.keyboard.press("Escape");
  await shot(page, "phone-header-ar");
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
  const pace = await page.$eval("#sec-model", (host) => { const el = host.querySelector(".aih-slide.is-on .an.pop"); const cs = el && getComputedStyle(el); return { slow: host.classList.contains("slow"), dur: cs && cs.animationDuration, d: el && parseFloat(el.style.getPropertyValue("--d")), delay: cs && parseFloat(cs.animationDelay) }; });
  pace.slow && pace.dur === "1s" && Math.abs(pace.delay - pace.d * 1.7) < 0.01 ? ok("model deck: slow pace stretches each entrance (1 s, delays × 1.7)") : fail("model deck: pace " + JSON.stringify(pace));
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
  ln >= 10 && lart && !(await page.$("#sec-work")) && /7 من 8/.test(lcrumb) ? ok(`limits deck: ${ln} slides with drawings open lesson f5, the unit's last lesson`) : fail(`limits deck: incomplete (${ln} slides, crumb «${lcrumb}»)`);
  await page.evaluate(() => (location.hash = "lesson-f8")); await page.waitForSelector("#sec-auto .aih-stage");
  const xn = await page.$$eval("#sec-auto .aih-slide", (s) => s.length);
  const xcrumb = await page.$eval(".crumbs .num", (e) => e.textContent);
  const xprompts = await page.$$eval("#sec-prompts .prompt, #sec-prompts article, #sec-prompts [data-prompt]", (s) => s.length);
  await page.click('#sec-auto [data-aih-go="11"]'); await page.waitForTimeout(700);
  const xfinal = await page.$eval("#sec-auto [data-aih-q]", (e) => e.dataset.final === "true" && /إكسل/.test(e.textContent));
  xn >= 10 && /8 من 8/.test(xcrumb) && xfinal ? ok(`automation deck: ${xn} slides close unit 0 (lesson 8 of 8) on the cliffhanger question`) : fail(`automation deck: incomplete (${xn} slides, crumb «${xcrumb}», final ${xfinal})`);
  xprompts >= 3 ? ok(`automation lesson: ${xprompts} copy-ready automation prompts`) : fail("automation lesson: prompts missing (" + xprompts + ")");
  // unit 2: every lesson opens with its own 12-slide story; the last one ends on the question that opens unit 3
  for (const [deck, lesson, k] of [["kit", "x1", 1], ["deliver", "x2", 2], ["stack", "x3", 3], ["lookup", "x4", 4], ["report", "x5", 5], ["match", "x7", 6], ["needs", "x8", 7], ["run", "x6", 8]]) {
    await page.evaluate((l) => (location.hash = "lesson-" + l), lesson); await page.waitForSelector(`#sec-${deck} .aih-stage`);
    const n = await page.$$eval(`#sec-${deck} .aih-slide`, (s) => s.length);
    const crumb = await page.$eval(".crumbs .num", (e) => e.textContent);
    await page.click(`#sec-${deck} [data-aih-go="11"]`); await page.waitForTimeout(500);
    const fin = await page.$eval(`#sec-${deck} [data-aih-q]`, (e) => e.dataset.final === "true");
    const art = await page.$eval(`#sec-${deck} .aih-slide[data-i="11"] .aih-svg`, (v) => v.querySelectorAll("rect,circle,path,text").length > 8);
    n === 12 && new RegExp(`(^|\\s)${k} من 8`).test(crumb) && fin && art ? ok(`unit 2 deck ${deck}: 12 slides open lesson ${k} of 8 and end on its question`) : fail(`unit 2 deck ${deck}: ${n} slides, crumb «${crumb}», final ${fin}, art ${art}`);
  }
  const xfin = await page.$eval("#sec-run [data-aih-q]", (e) => /إكسل/.test(e.textContent));
  xfin ? ok("unit 2 ends on a file bigger than Excel, the question unit 3 opens with") : fail("unit 2: closing question lost");
  // unit 3 opens with lesson b1's story, ending on the question its Office lessons answer
  await page.evaluate(() => (location.hash = "lesson-b1")); await page.waitForSelector("#sec-big .aih-stage");
  const bn = await page.$$eval("#sec-big .aih-slide", (s) => s.length);
  const bcrumb = await page.$eval(".crumbs .num", (e) => e.textContent);
  await page.click('#sec-big [data-aih-go="11"]'); await page.waitForTimeout(700);
  const bfinal = await page.$eval("#sec-big [data-aih-q]", (e) => e.dataset.final === "true" && /فرع/.test(e.textContent));
  const bart = await page.$eval('#sec-big .aih-slide[data-i="11"] .aih-svg', (v) => v.querySelectorAll("rect,circle,path,text").length > 8);
  bn === 12 && /(^|\s)1 من 7/.test(bcrumb) && bfinal && bart ? ok("unit 3 deck: 12 slides open the unit (lesson 1 of 7) and end on the question its Office lessons answer") : fail(`unit 3 deck: ${bn} slides, crumb «${bcrumb}», final ${bfinal}, art ${bart}`);
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

await session({ label: "plan-3-migration", viewport: { width: 1280, height: 860 } }, async (page) => {
  // a learner from the plan where unit 2 was big data: its u1 and u2 best scores belong to other questions now
  await page.evaluate(() => { localStorage.setItem("aiAcademy.v1", JSON.stringify({ lang: "ar", plan: 2, scores: { u0: { best: 80, last: 80 }, u1: { best: 90, last: 90 }, u2: { best: 60, last: 60 }, u3: { best: 70, last: 70 } } })); location.hash = "quiz"; location.reload(); });
  await page.waitForSelector("#main .unit-card"); await page.waitForTimeout(400);
  const s = await page.evaluate(() => { const v = JSON.parse(localStorage.getItem("aiAcademy.v1") || "{}"); return { k: Object.keys(v.scores || {}).sort().join(" "), plan: v.plan }; });
  s.k === "u0 u3" && s.plan === 4 ? ok("upgrade to plan 3: units 2 and 3 scores cleared, the others kept") : fail("plan 3 upgrade: " + JSON.stringify(s));
  await page.evaluate(() => location.reload()); await page.waitForSelector("#main h1"); await page.waitForTimeout(300);
  const again = await page.evaluate(() => JSON.parse(localStorage.getItem("aiAcademy.v1") || "{}").plan);
  again === 4 ? ok("plan upgrade runs once") : fail("plan upgrade repeats: plan " + again);
});

await session({ label: "plan-4-migration", viewport: { width: 1280, height: 860 } }, async (page) => {
  // a learner from plan 3: unit 2 became eight projects with new questions, so only its old score goes
  await page.evaluate(() => { localStorage.setItem("aiAcademy.v1", JSON.stringify({ lang: "ar", plan: 3, scores: { u0: { best: 80, last: 80 }, u1: { best: 90, last: 90 }, u2: { best: 60, last: 60 } } })); location.hash = "quiz"; location.reload(); });
  await page.waitForSelector("#main .unit-card"); await page.waitForTimeout(400);
  const s = await page.evaluate(() => { const v = JSON.parse(localStorage.getItem("aiAcademy.v1") || "{}"); return { k: Object.keys(v.scores || {}).sort().join(" "), plan: v.plan }; });
  s.k === "u0 u2" && s.plan === 4 ? ok("upgrade to plan 4: only unit 2's score cleared") : fail("plan 4 upgrade: " + JSON.stringify(s));
});

const unzip = async (dl) => {   // walk a stored zip's entries and check each one's CRC
  const { readFileSync } = await import("node:fs"); const zlib = await import("node:zlib");
  const buf = readFileSync(await dl.path()), names = []; let bad = 0;
  for (let o = 0; o + 30 < buf.length && buf.readUInt32LE(o) === 0x04034b50;) {
    const size = buf.readUInt32LE(o + 18), nl = buf.readUInt16LE(o + 26), name = buf.slice(o + 30, o + 30 + nl).toString("utf8"), data = buf.slice(o + 30 + nl, o + 30 + nl + size);
    if (zlib.crc32(data) !== buf.readUInt32LE(o + 14)) bad++;
    names.push(name); o += 30 + nl + size;
  }
  return { names, bad };
};
await session({ label: "icons-not-letters", viewport: { width: 390, height: 844 } }, async (page) => {
  // what a lesson opens with, the quiz choices and lab checks are drawn icons, never letters or font glyphs
  const units = await page.evaluate(() => window.ACADEMY.units.map((u) => u.id));
  let bad = [], seen = 0;
  for (const u of units) {
    await page.evaluate((x) => document.querySelector(`#win [data-u="${x}"]`).click(), u); await page.waitForTimeout(80);
    const r = await page.$$eval("#win .steps .lb, #win .win-legend .lb", (els) => els.map((e) => ({ t: e.textContent.trim(), svg: !!e.querySelector("svg") })));
    seen += r.length; bad = bad.concat(r.filter((x) => x.t || !x.svg).map((x) => u + ":" + x.t));
  }
  seen > 40 && !bad.length ? ok(`home: ${seen} lesson badges are icons, none a letter`) : fail("home badges: " + bad.slice(0, 5).join(", "));
  await page.evaluate(() => (location.hash = "lesson-f1")); await page.waitForSelector("#qc .opt");
  const q = await page.$$eval("#qc .opt .k", (els) => els.map((e) => e.textContent.trim()).join(""));
  await page.evaluate(() => (location.hash = "lab-worth")); await page.waitForSelector(".lab .ck .m");
  const c = await page.$$eval(".lab .ck .m", (els) => els.every((e) => !e.textContent.trim() && e.querySelector("svg")));
  !q && c ? ok("quiz choices and lab checks: drawn icons, no letters or glyphs") : fail(`quiz markers «${q}», lab checks icons ${c}`);
});

await session({ label: "unit-2-projects", viewport: { width: 1280, height: 860 }, acceptDownloads: true }, async (page) => {
  // every unit-2 lesson has its own project, downloaded as one zip of real English workbooks, generated in the page offline
  await page.evaluate(() => (location.hash = "lesson-x3")); await page.waitForSelector("#sec-proj .xp-card");
  const head = await page.$eval("#sec-proj", (e) => ({ steps: e.querySelectorAll(".xp-ladder li").length, on: e.querySelector(".xp-ladder li.on")?.textContent.trim(), zip: e.querySelector("[data-dl]")?.textContent.trim() }));
  head.steps === 8 && /^3/.test(head.on) && head.zip === "Lesson_3_Stack_Weekly_Reports.zip" ? ok("project: lesson 3 shows step 3 of 8 and its own zip") : fail("project head: " + JSON.stringify(head));
  await page.click('#sec-proj [data-f="10"]');
  const prev = await page.$eval("#sec-proj .xp-peek table", (e) => e.textContent);
  /Quantity/.test(prev) && !/[\u0600-\u06ff]/.test(prev) ? ok("project: Week_11's preview shows only English cells") : fail("project preview: " + prev.slice(0, 120));
  const [dl] = await Promise.all([page.waitForEvent("download"), page.click("#sec-proj [data-dl]")]);
  const z = await unzip(dl), weeks = z.names.filter((n) => /^Lesson_3_Stack_Weekly_Reports\/Data\/Week_\d\d\.xlsx$/.test(n)).length;
  dl.suggestedFilename() === "Lesson_3_Stack_Weekly_Reports.zip" && weeks === 13 && ["README.txt", "Prompt.txt", "Answer_Key.txt"].every((f) => z.names.includes("Lesson_3_Stack_Weekly_Reports/" + f)) && !z.bad
    ? ok(`project: Lesson_3 zip holds ${z.names.length} files, 13 weekly workbooks, the guide files, every CRC valid`) : fail(`project zip: ${z.names.length} files, ${weeks} weeks, ${z.bad} bad CRC`);
  // the lab shows the whole ladder and switches between projects
  await page.evaluate(() => (location.hash = "lab-xlkit")); await page.waitForSelector(".lab-xp .xp-ladder");
  await page.click('.lab-xp [data-p="2"]');
  const [dl2] = await Promise.all([page.waitForEvent("download"), page.click(".lab-xp [data-dl]")]);
  const z2 = await unzip(dl2);
  dl2.suggestedFilename() === "Lesson_2_First_Tool_File_List.zip" && z2.names.some((n) => n.endsWith("Data/~$Line_L03_Week_02.xlsx")) && z2.names.filter((n) => /Line_L0\d_Week_02\.xlsx$/.test(n) && !n.includes("~$")).length === 6 && !z2.bad
    ? ok("lab: the ladder switches to project 2, whose zip holds six reports and an Excel lock file") : fail("lab project 2 zip: " + z2.names.join(", "));
});
/* A narrow phone (340px), both languages: unit-2 lessons, whose download button carries a long zip name, stay inside the screen */
await session({ label: "unit-2-narrow", viewport: { width: 340, height: 760 }, isMobile: true, hasTouch: true }, async (page) => {
  const bad = [];
  for (const lang of ["ar", "en"]) {
    if (lang === "en") { await page.click("#more-btn"); await page.click("#lang-btn"); await page.waitForTimeout(150); }
    for (const id of await page.evaluate(() => window.ACADEMY.lessons.filter((l) => l.unit === "u1").map((l) => l.id))) {
      await page.evaluate((x) => (location.hash = "lesson-" + x), id); await page.waitForSelector("#sec-proj .xp-card");
      const ov = await overflow(page); if (ov > 1) bad.push(`${lang} ${id} ${ov}px`);
    }
  }
  bad.length ? fail("unit 2 at 340px: horizontal overflow " + bad.join(", ")) : ok("unit 2 at 340px: every lesson fits the screen, Arabic and English");
});

await session({ label: "plan-2-migration", viewport: { width: 1280, height: 860 } }, async (page) => {
  // a learner from the six-unit course: old best scores for u1–u5 belong to other questions now and must not show
  await page.evaluate(() => { localStorage.setItem("aiAcademy.v1", JSON.stringify({ lang: "en", scores: { u0: { best: 80, last: 80 }, u1: { best: 90, last: 90 }, all: { best: 70, last: 70 } } })); location.hash = "quiz"; location.reload(); });
  await page.waitForSelector("#main .unit-card"); await page.waitForTimeout(400);
  const kept = await page.evaluate(() => { const s = JSON.parse(localStorage.getItem("aiAcademy.v1") || "{}"); return { u0: !!(s.scores || {}).u0, u1: !!(s.scores || {}).u1, all: !!(s.scores || {}).all, plan: s.plan }; });
  kept.u0 && !kept.u1 && kept.all ? ok("upgrade: old unit scores cleared, unit 1 and overall scores kept") : fail("upgrade: scores " + JSON.stringify(kept));
  await page.evaluate(() => { location.hash = "home"; }); await page.waitForTimeout(200);
  await page.click("#view-btn"); await page.waitForSelector(".vpanel");
  await page.click('.vpanel [data-vk="font"][data-vv="cairo"]'); await page.click('.vpanel [data-vk="width"][data-vv="lg"]'); await page.click('.vpanel [data-vk="size"][data-vv="xl"]');
  const v = await page.evaluate(() => ({ d: { ...document.documentElement.dataset }, ff: getComputedStyle(document.body).fontFamily, art: getComputedStyle(document.documentElement).getPropertyValue("--font-art") }));
  v.d.font === "cairo" && v.d.width === "lg" && v.d.fsize === "xl" && /R Cairo/.test(v.ff) && /UI Latin/.test(v.art) ? ok("reading settings: font, width and size apply; drawings keep their font") : fail("reading settings: " + JSON.stringify(v));
  await page.keyboard.press("Escape"); await page.waitForTimeout(50);
  (await page.$(".vpanel")) ? fail("reading settings: panel stays open after Escape") : ok("reading settings: Escape closes the panel");
  await page.reload(); await page.waitForTimeout(300);
  (await page.evaluate(() => document.documentElement.dataset.font)) === "cairo" ? ok("reading settings: remembered after reload") : fail("reading settings: lost after reload");
});

await browser.close();
console.log(results.join("\n"));
process.exitCode = results.some((r) => r.startsWith("FAIL")) ? 1 : 0;
