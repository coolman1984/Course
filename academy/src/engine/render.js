/* Views: home, unit, lesson, map, coverage, path, review, glossary, prompts, compare, notebook, labs, lab, project. */
"use strict";
(function (A) {
  const { h, ico, L, t, esc, rich, S } = A;
  const lessonsOf = (u) => A.lessons.filter((l) => l.unit === u);
  const pageChips = (pages) => (pages || []).map((p) => `<button type="button" class="chip book num" data-page="${p}" title="${esc(t("openPage"))}">${ico("page")}${esc(t("pShort", { n: p }))}</button>`).join("");
  const diffLabel = (d) => t("diff" + (d || 1));
  const head = (eyebrow, title, lead, extra = "") => `<header class="page-head">${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}<h1>${esc(title)}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}${extra}</header>`;
  const secHead = (icon, title, sub, tone = "") => `<div class="sec-h"><span class="ic ${tone}">${ico(icon)}</span><div><h2>${esc(title)}</h2>${sub ? `<p>${esc(sub)}</p>` : ""}</div></div>`;
  function unitProgress(uid) { const ls = lessonsOf(uid); const d = ls.filter((l) => S.get("done")[l.id]).length; return { d, n: ls.length, pct: ls.length ? Math.round((d / ls.length) * 100) : 0 }; }
  A.unitProgress = unitProgress;
  A.pageChips = pageChips;

  /* ================= HOME ================= */
  A.view("home", (main) => {
    const p = A.progress();
    const last = S.get("last") && A.byId[S.get("last")];
    const first = A.lessons[0];
    const ar = A.lang() === "ar";
    const tile = (icon, c) => `<span class="tile" style="--tc:${c}">${ico(icon)}</span>`;
    const tick = `<span class="tick">${ico("check")}</span>`;
    const nLessons = (n) => (ar ? (n === 2 ? "درسان" : n <= 10 ? n + " دروس" : n + " درسًا") : t("lessonsN", { n }));
    const lines = `<div class="hero-deco" aria-hidden="true">
      <svg class="circuit c-a" viewBox="0 0 320 360" aria-hidden="true"><path d="M0 40 H40 Q66 40 66 66 V128" class="ln v"/><circle cx="66" cy="132" r="4" class="dt v"/><path d="M0 214 H40 Q66 214 66 240 V250 Q66 262 78 262 H272" class="ln g"/><circle cx="276" cy="262" r="4" class="dt g"/><path d="M0 290 H66" class="ln b"/><circle cx="66" cy="290" r="4" class="dt b"/><path d="M0 340 H272" class="ln t"/><circle cx="276" cy="340" r="4" class="dt t"/></svg>
      <svg class="circuit c-b" viewBox="0 0 320 360" aria-hidden="true"><path d="M320 120 H48" class="ln a"/><circle cx="44" cy="120" r="4" class="dt a"/><path d="M320 270 H48" class="ln p"/><circle cx="44" cy="270" r="4" class="dt p"/></svg></div>`;
    const wrap = h("div", { class: "home" });
    wrap.innerHTML = `
      <section class="hero2">
        ${lines}
        <div class="hero2-in soft-in">
          <h1>${esc(t("heroTitle"))}</h1>
          <p class="lead">${esc(t("heroLead"))}</p>
          <div class="cta">
            <a class="btn pri lg" href="#lesson-${(last || first).id}">${ico("play")}${esc(last ? t("continueLast") : t("startHere"))}</a>
            <a class="btn lg" href="#map">${esc(t("nav_map"))}</a>
          </div>
          <p class="cred">${esc(t("heroCredOf", { pg: A.meta.pages, l: A.lessons.length, s: A.scenes.length, b: A.labs.length, p: A.prompts.length }))}</p>
        </div>
      </section>

      <section class="showcase soft-in" aria-label="${esc(t("unitsCard"))}">
        <span class="float f1">${tile("chart", "var(--sig-amber)")}</span>
        <span class="float f2">${tile("spark", "var(--sig-violet)")}</span>
        <div class="win" id="win"></div>
      </section>

      <section class="band">
        <div class="center-head">
          <h2>${esc(t("palTitle"))}</h2>
          <p class="lead">${esc(t("palLead", { n: A.prompts.length }))}</p>
        </div>
        <div class="cmdk" id="cmdk"></div>
      </section>

      <section class="split">
        <div class="split-txt">
          <span class="eyebrow">${ico("page")} ${esc(t("eqSecEyebrow"))}</span>
          <h2>${esc(t("eqSecTitle"))}</h2>
          <p class="lead">${esc(t("eqSecLead"))}</p>
          <ul class="ticks">${["eqB1", "eqB2", "eqB3", "eqB4"].map((k) => `<li>${tick}${esc(t(k))}</li>`).join("")}</ul>
        </div>
        <div class="split-art"><span class="float f3">${tile("msg", "var(--sig-teal)")}</span><div class="eq card" id="eq" aria-label="${esc(t("eqAria"))}"></div></div>
      </section>

      <section class="band">
        <div class="center-head">
          <h2>${esc(t("ladderSecTitle"))}</h2>
          <p class="lead">${esc(t("ladderSub"))}</p>
        </div>
        <ol class="ladder2" id="ladder"></ol>
      </section>

      <section class="split rev">
        <div class="split-txt">
          <span class="eyebrow">${ico("layers")} ${esc(t("unitsTitle"))}</span>
          <h2>${esc(t("unitsSecTitle"))}</h2>
          <p class="lead">${esc(t("unitsSecLead"))}</p>
          <ul class="ticks">
            <li>${tick}${esc(t("unitsB1", { l: A.lessons.length }))}</li><li>${tick}${esc(t("unitsB2", { s: A.scenes.length }))}</li>
            <li>${tick}${esc(t("unitsB3", { b: A.labs.length }))}</li><li>${tick}${esc(t("unitsB4", { q: A.quiz.length }))}</li>
          </ul>
        </div>
        <div class="split-art"><span class="float f4">${tile("layers", "var(--accent)")}</span>
          <div class="ulist"><div class="ulist-h">${ico("layers")} ${esc(t("unitsCard"))}</div><div id="units"></div></div>
        </div>
      </section>

      <section class="band">
        <div class="center-head">
          <h2>${esc(t("labsSecTitle"))}</h2>
          <p class="lead">${esc(t("featuredLabsSub"))}</p>
        </div>
        <div class="grid g3 wrap-wide" id="flabs"></div>
      </section>

      <section class="honest wrap-wide">
        <div class="legend"><span class="chip book">${ico("book")}${esc(t("legendBook"))}</span><span class="chip add">${ico("spark")}${esc(t("legendAdded"))}</span><span class="chip vi">${ico("flask")}${esc(t("legendSim"))}</span><span class="chip ok">${ico("check")}${esc(t("legendReal"))}</span></div>
        <p class="muted small">${esc(t("honestyBody"))}</p>
        <p class="small muted">${esc(t("progressTitle", { d: p.done, t: p.total }))} · <a href="#notebook">${esc(t("manageData"))}</a></p>
        <p class="foot">${esc(t("footLine"))}</p>
      </section>`;
    main.append(wrap);

    /* ---- app window: units → lessons → a before/after rule from the book ---- */
    const win = A.$("#win");
    let cur = (last && last.unit) || "u1";
    const drawWin = () => {
      const u = A.unitById[cur];
      const ls = lessonsOf(u.id);
      const sc = A.meta.showcase[u.id];
      const sl = A.byId[sc.lesson];
      const done = S.get("done");
      const badge = (l) => l.lab ? `<span class="lb g" title="${esc(t("hasLab"))}">${ar ? "خ" : "L"}</span>` : l.scene ? `<span class="lb b" title="${esc(t("hasScene"))}">${ar ? "م" : "S"}</span>` : `<span class="lb a">${ar ? "ك" : "B"}</span>`;
      let n = 13;
      const code = (rows) => rows.map(([k, txt]) => { const a = k === "-" ? n : k === "+" ? "" : n, b = k === "-" ? "" : ++n; return `<div class="cl ${k === "-" ? "del" : k === "+" ? "add" : ""}"><span class="ln">${a}</span><span class="ln">${b}</span><span class="cx">${k === " " ? "" : k}${esc(txt)}</span></div>`; }).join("");
      win.innerHTML = `
        <aside class="win-side">
          <div class="lights" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="win-h">${ico("chev")} ${esc(t("winUnits"))}</div>
          <div class="win-nav" role="tablist" aria-label="${esc(t("winUnits"))}">${A.units.map((x) => `<button type="button" role="tab" data-u="${x.id}" aria-selected="${x.id === cur}"><span class="ub" style="background:${x.color}">${esc(x.badge)}</span><span>${esc(L(x.short))}</span></button>`).join("")}</div>
          <div class="win-h">${ico("chev")} ${esc(t("winLabs"))}</div>
          <div class="win-nav">${A.labs.slice(0, 8).map((lb) => `<a href="#lab-${lb.id}">${ico(lb.icon || "flask")}<span>${esc(L(lb.title))}</span></a>`).join("")}</div>
        </aside>
        <div class="win-mid" role="tabpanel">
          <div class="win-top"><span class="pill2">${ico("route")}${ico("spark")}</span><div><b>${esc(L(u.short))}</b><small>${esc(t("pagesRange", { a: u.pages[0], b: u.pages[1] }))}</small></div></div>
          <div class="win-sub"><b>${esc(t("winLessons"))}</b><span class="num">${ls.length}</span><span class="sp"></span><a href="#unit-${u.id}" class="small">${esc(t("winAll"))}</a></div>
          <ul class="steps">${ls.map((l) => `<li class="${l.id === sc.lesson ? "on" : ""}"><button type="button" class="cbx" data-done="${l.id}" aria-pressed="${!!done[l.id]}" aria-label="${esc(t("winToggle") + ": " + L(l.title))}">${ico("check")}</button>${badge(l)}<a href="#lesson-${l.id}">${esc(L(l.title))}</a></li>`).join("")}</ul>
          <p class="win-legend">${esc(t("winLegend"))}</p>
        </div>
        <div class="win-code">
          <div class="cb-h"><span>${esc(L(sl.title))} · ${esc(L(sc.file))}</span><span>${esc(t("winBefore"))}</span></div>
          <div class="code">${code([[" ", ar ? "افتح الشات" : "open the chat"], ...sc.del.map((x) => ["-", L({ ar: x[0], en: x[1] })]), ...sc.add.map((x) => ["+", L({ ar: x[0], en: x[1] })]), [" ", ar ? `ص ${sc.p} من الكتاب` : `book p. ${sc.p}`]])}</div>
          <div class="cb-h"><span>${esc(t("winHumanTitle"))}</span><span>${esc(t("winHuman"))}</span></div>
          <div class="code">${(n = 37, code([[" ", t("winH1")], ["+", t("winH2")], ["+", t("winH3")], [" ", t("winH4")]]))}</div>
          <div class="cb-f">${pageChips([sc.p, 41])}</div>
        </div>`;
      A.$$("[data-u]", win).forEach((b) => (b.onclick = () => { cur = b.dataset.u; drawWin(); A.$(`[data-u="${cur}"]`, win).focus(); }));
      A.$$("[data-done]", win).forEach((b) => (b.onclick = () => { const id = b.dataset.done; S.patch("done", id, !S.get("done")[id]); A.renderBar(); A.renderSide(); drawWin(); A.$(`[data-done="${id}"]`, win).focus(); }));
    };
    drawWin();

    /* ---- command palette preview: real prompts from the library ---- */
    const cmdk = A.$("#cmdk");
    const picks = ["p5", "p7", "p9", "y4", "d1", "w2", "s2"].map((id) => A.prompts.find((x) => x.lesson === id)).filter(Boolean);
    const catName = (c) => { const x = A.meta.promptCats.find((k) => k.id === c); return x ? L(x.name) : c; };
    cmdk.innerHTML = `<button type="button" class="cmdk-in" id="cmdk-in">${ico("search")}<span>${esc(t("palPh"))}</span><kbd>Ctrl K</kbd></button>
      <div class="cmdk-list">${picks.map((x, i) => `<a class="cmdk-it${i === 2 ? " on" : ""}" href="#prompts-${x.id}">${ico((A.meta.promptCats.find((k) => k.id === x.cat) || {}).icon || "msg")}<span class="tt">${esc(L(x.title))}</span><span class="cmdk-k"><span class="chip">${esc(catName(x.cat))}</span>${x.p ? `<kbd>${ar ? "ص" : "p."}${x.p}</kbd>` : ""}</span></a>`).join("")}</div>
      <a class="cmdk-foot" href="#prompts">${esc(t("palAll"))} ${ico(ar ? "prev" : "next")}</a>`;
    A.$("#cmdk-in").onclick = () => A.openPalette();

    /* ---- governing equation (book p7) ---- */
    const eq = A.$("#eq");
    const parts = A.meta.equation;
    const on = new Set([0]);
    const draw = () => {
      const score = parts.reduce((s, q, i) => s + (on.has(i) ? q.w : 0), 0);
      const outKey = on.size === 4 ? "full" : on.size === 0 ? "none" : [...on].sort().join("");
      const out = A.meta.equationOut[outKey] || A.meta.equationOut.partial;
      eq.innerHTML = `<div class="eq-head"><b>${esc(t("eqTitle"))}</b>${pageChips([7])}</div>
        <div class="eq-row">${parts.map((q, i) => `${i ? '<span class="eq-op" aria-hidden="true">+</span>' : ""}<button type="button" class="eq-b" data-i="${i}" aria-pressed="${on.has(i)}"><span class="n">${i + 1}</span><b>${esc(L(q.name))}</b><small>${esc(L(q.hint))}</small></button>`).join("")}</div>
        <div class="eq-res"><div class="eq-head"><b>${esc(t("eqResult"))}</b><span class="num">${score}%</span></div>
        <div class="bar-meter" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${score}" aria-label="${esc(t("eqQuality"))}"><i style="width:${score}%"></i></div>
        <p class="eq-out"><b>${esc(t("eqSample"))}</b> ${esc(L(out))}</p></div>
        <p class="hint">${esc(t("eqHint"))} <a href="#lab-prompt">${esc(t("eqLab"))}</a></p>`;
      A.$$(".eq-b", eq).forEach((b) => (b.onclick = () => { const i = Number(b.dataset.i); on.has(i) ? on.delete(i) : on.add(i); draw(); A.$(`.eq-b[data-i="${i}"]`, eq).focus(); }));
    };
    draw();

    /* ---- ladder (book p4) ---- */
    const lad = A.$("#ladder");
    A.meta.ladder.forEach((r, i) => {
      const ls = (r.lessons || []).map((id) => A.byId[id]).filter(Boolean);
      const d = ls.filter((l) => S.get("done")[l.id]).length;
      lad.append(h("li", null, h("a", { class: "rung2", href: "#lesson-" + (r.lessons[0] || first.id), html: `<span class="k num">${String(i + 1).padStart(2, "0")}</span><b>${esc(L(r.name))}</b><small>${esc(L(r.desc))}</small><span class="fill"><i style="width:${ls.length ? (d / ls.length) * 100 : 0}%"></i></span>` })));
    });

    /* ---- units list ---- */
    const ug = A.$("#units");
    for (const u of A.units) {
      const pr = unitProgress(u.id);
      ug.append(h("a", { class: "urow", href: "#unit-" + u.id, html: `<span class="tile sm" style="--tc:${u.color}"><b>${esc(u.badge)}</b></span><span class="ut"><b>${esc(L(u.title))}</b><small>${esc(t("pagesRange", { a: u.pages[0], b: u.pages[1] }))} · ${esc(nLessons(pr.n))}</small></span>${pr.d === pr.n ? `<span class="tick">${ico("check")}</span>` : `<span class="ring" style="--p:${pr.pct}" title="${pr.pct}%"></span>`}` }));
    }

    /* ---- featured labs ---- */
    const fl = A.$("#flabs");
    for (const id of A.meta.featuredLabs) { const lb = A.labsById[id]; if (lb) fl.append(labCard(lb)); }
  });

  const labTone = { prompt: "var(--sig-blue)", brain: "var(--sig-violet)", formula: "var(--sig-green)", worth: "var(--sig-amber)", pipeline: "var(--sig-teal)", quality: "var(--sig-green)", dashboard: "var(--sig-amber)", request: "var(--sig-blue)", git: "var(--sig-pink)", tokens: "var(--sig-violet)", local: "var(--sig-teal)", system: "var(--sig-blue)", agents: "var(--sig-pink)" };
  function labCard(lb) {
    const ls = A.byId[lb.lesson];
    return h("a", { class: "card card-link labcard", href: "#lab-" + lb.id, html: `
      <div class="row" style="justify-content:space-between"><span class="tile" style="--tc:${labTone[lb.id] || "var(--accent)"}">${ico(lb.icon || "flask")}</span><span class="chip ${lb.real ? "ok" : "vi"}">${esc(lb.real ? t("realCalc") : t("eduSim"))}</span></div>
      <h3>${esc(L(lb.title))}</h3><p class="muted small">${esc(L(lb.sum))}</p>
      ${ls ? `<span class="lc-l">${ico("book")} ${esc(L(ls.title))}</span>` : ""}` });
  }
  A.labCard = labCard;

  /* ================= UNIT ================= */
  A.view("unit", (main, id) => {
    const u = A.unitById[id] || A.units[0];
    const ls = lessonsOf(u.id);
    const pr = unitProgress(u.id);
    const wrap = h("div", { class: "wrap stack" });
    wrap.innerHTML = `
      <nav class="crumbs" aria-label="${esc(t("crumbs"))}"><a href="#home">${esc(t("home"))}</a> › <span>${esc(L(u.short))}</span></nav>
      ${head(`<span class="chip" style="background:${u.color};color:#fff;border:0">${esc(u.badge)}</span> ${esc(t("unitN", { n: u.n }))}`, L(u.title), esc(L(u.sum)), `<div class="row">${pageChips([u.pages[0]])}<span class="chip num">${esc(t("pagesRange", { a: u.pages[0], b: u.pages[1] }))}</span><span class="chip num">${ico("book")}${ls.length} ${esc(t("lessonsWord"))}</span><span class="chip ok num">${pr.pct}%</span></div>`)}
      <div class="note bk">${ico("target")}<div><b>${esc(t("bigIdea"))}</b><div>${A.inline(L(u.big))}</div></div></div>
      <section class="sec">${secHead("route", t("unitLessons"))}<div class="stack" id="ul"></div></section>
      <section class="sec">${secHead("bolt", t("unitTools"))}<div class="grid g3">
        <a class="card card-link" href="#quiz-${u.id}"><h3>${ico("quiz")} ${esc(t("unitQuiz"))}</h3><p class="muted small">${esc(t("unitQuizSub"))}</p></a>
        <a class="card card-link" href="#review-${u.id}"><h3>${ico("bolt")} ${esc(t("nav_review"))}</h3><p class="muted small">${esc(t("reviewSub"))}</p></a>
        <a class="card card-link" href="#present-${u.id}"><h3>${ico("screen")} ${esc(t("nav_present"))}</h3><p class="muted small">${esc(t("presentSub"))}</p></a>
      </div></section>`;
    main.append(wrap);
    const ul = A.$("#ul");
    ls.forEach((l, i) => {
      const done = S.get("done")[l.id];
      ul.append(h("a", { class: "path-step " + (done ? "done" : A.needsReview(l.id) ? "rev" : ""), href: "#lesson-" + l.id, html: `
        <span class="chip num">${i + 1}</span><span class="t">${esc(L(l.title))}<br><span class="muted small" style="font-weight:400">${esc(L(l.sum))}</span></span>
        <span class="row">${l.scene ? `<span class="chip vi" title="${esc(t("hasScene"))}">${ico("film")}</span>` : ""}${l.lab ? `<span class="chip vi" title="${esc(t("hasLab"))}">${ico("flask")}</span>` : ""}<span class="chip num">${ico("clock")}${l.min}′</span>${done ? `<span class="chip ok">${ico("check")}${esc(t("done"))}</span>` : ""}</span>` }));
    });
  });

  /* ================= LESSON ================= */
  A.view("lesson", (main, id) => {
    const l = A.byId[id] || A.lessons[0];
    const u = A.unitById[l.unit];
    const ls = lessonsOf(l.unit);
    const idx = ls.indexOf(l);
    const gi = A.lessons.indexOf(l);
    const prev = A.lessons[gi - 1], next = A.lessons[gi + 1];
    S.set("last", l.id);
    S.patch("visited", l.id, Date.now());
    const done = !!S.get("done")[l.id];
    const bm = S.get("bookmarks").includes(l.id);
    const prompts = A.prompts.filter((p) => p.lesson === l.id);
    const qs = A.quiz.filter((q) => q.lesson === l.id);
    const story = A.lang() === "ar" ? A.lessonStories?.[l.id] : null;
    const pictureFirst = story ? `<section class="mental sec" id="sec-mental">
      <div class="mental-kicker">ابدأ بالمشكلة، مش بالمصطلح</div>
      <h2>تخيّل الموقف ده 👇</h2>
      <p class="mental-situation">${esc(story[0])}</p>
      <p class="mental-note">مثال تعليمي للتوضيح. مش بيانات حقيقية عن أي شركة.</p>
      <div class="mental-flow" role="list" aria-label="من المشكلة للنتيجة">
        <div class="mental-step" role="listitem"><span>١ • إيه اللي معاك؟</span><strong>${esc(story[1])}</strong></div>
        <span class="mental-arrow" aria-hidden="true">←</span>
        <div class="mental-step" role="listitem"><span>٢ • هيحصل إيه؟</span><strong>${esc(story[2])}</strong></div>
        <span class="mental-arrow" aria-hidden="true">←</span>
        <div class="mental-step result" role="listitem"><span>٣ • هتستفيد بإيه؟</span><strong>${esc(story[3])}</strong></div>
      </div>
      <div class="mental-danger"><b>خد بالك:</b> ${esc(story[4])}</div>
      <details class="mental-question"><summary><span aria-hidden="true">🧠</span> جرّب تفكر: ${esc(story[5])}</summary><p>${esc(story[6])}</p></details>
      <p class="mental-hint">دلوقتي شوف الشرح والرسوم اللي تحت. هتعرف اسم الفكرة وليه بنستخدمها.</p>
    </section>` : "";
    const wrap = h("article", { class: "wrap" });
    const compass = A.meta.compass.map((c) => `<button type="button" class="chip" data-jump="${c.to}">${esc(L(c.q))}</button>`).join("");
    wrap.innerHTML = `
      <nav class="crumbs" aria-label="${esc(t("crumbs"))}"><a href="#home">${esc(t("home"))}</a> › <a href="#unit-${u.id}">${esc(L(u.short))}</a> › <span class="num">${esc(t("lessonOf", { n: idx + 1, t: ls.length }))}</span></nav>
      ${head(`<span class="chip" style="background:${u.color};color:#fff;border:0">${esc(u.badge)}</span> ${esc(L(u.short))}`, L(l.title), esc(story ? story[0] : L(l.sum)),
        `<div class="lesson-meta">${pageChips(l.pages)}<span class="chip num">${ico("clock")}${l.min} ${esc(t("minutes"))}</span><span class="chip">${ico("target")}${esc(diffLabel(l.diff))}</span>
         <span class="bar-spacer"></span>
         <button type="button" class="chip" id="bm" aria-pressed="${bm}">${ico("bookmark")}${esc(bm ? t("bookmarked") : t("bookmark"))}</button>
         <button type="button" class="chip ${done ? "ok" : ""}" id="donetop" aria-pressed="${done}">${ico("check")}${esc(done ? t("done") : t("markDone"))}</button></div>`)}
      ${A.aiHistory && A.aiHistory.lesson === l.id ? '<section id="sec-history"></section>' : ""}
      ${pictureFirst}
      <div class="compass" aria-label="${esc(t("compassAria"))}"><b>${esc(t("compassTitle"))}</b>${compass}</div>
      <div id="sec-scene"></div>
      <section class="sec" id="sec-book">${story ? '<details class="book-original"><summary>📖 افتح كلام الكتاب الأصلي وربطه بصفحاته</summary>' : secHead("book", t("bookSays"), t("bookSaysSub"))}<div class="bookpts">${(l.book || []).map((b) => `<div class="bookpt"><div>${A.inline(L(b))}</div>${pageChips([b.p])}</div>`).join("")}</div>${story ? "</details>" : ""}</section>
      <section class="sec levels" id="sec-levels">${secHead("layers", t("levelsTitle"), t("levelsSub"), "sp")}<div id="lv"></div></section>
      <div id="sec-lab"></div>
      <div id="sec-case"></div>
      <div id="sec-prompts"></div>
      <section class="sec" id="sec-check">${secHead("quiz", t("quickCheck"), t("quickCheckSub"), "mt")}<div id="qc" class="qc"></div></section>
      <section class="sec" id="sec-next">${secHead("graph", t("connections"), t("connectionsSub"), "vi")}<div id="rel"></div></section>
      <section class="sec" id="sec-notes">${secHead("pen", t("myNotes"), t("myNotesSub"))}<label class="sr-only" for="note-ta">${esc(t("myNotes"))}</label><textarea id="note-ta" class="input notes-ta" placeholder="${esc(t("notesPh"))}"></textarea><p class="hint" id="note-st"></p></section>
      <div class="donebox"><div><b>${esc(t("doneQ"))}</b><p class="small muted">${esc(t("doneHint"))}</p></div><button type="button" class="btn ${done ? "" : "ok"}" id="donebtn">${ico("check")}${esc(done ? t("unmark") : t("markDone"))}</button></div>
      <nav class="pn" aria-label="${esc(t("pnAria"))}">
        ${prev ? `<a href="#lesson-${prev.id}"><small>${ico(A.lang() === "ar" ? "next" : "prev")}${esc(t("prevLesson"))}</small><b>${esc(L(prev.title))}</b></a>` : "<span></span>"}
        ${next ? `<a class="nx" href="#lesson-${next.id}"><small>${esc(t("nextLesson"))}${ico(A.lang() === "ar" ? "prev" : "next")}</small><b>${esc(L(next.title))}</b></a>` : `<a class="nx" href="#project"><small>${esc(t("finalStep"))}</small><b>${esc(t("nav_project"))}</b></a>`}
      </nav>`;
    main.append(wrap);
    if (A.mountHistory && A.$("#sec-history")) A.mountHistory(A.$("#sec-history"));
    // compass jumps
    A.$$("[data-jump]", wrap).forEach((b) => (b.onclick = () => {
      const to = b.dataset.jump;
      if (to.startsWith("lv:")) { setLevelTab(to.slice(3)); A.$("#sec-levels").scrollIntoView({ behavior: A.reduceMotion() ? "auto" : "smooth" }); }
      else { const el = A.$("#" + to); el && el.scrollIntoView({ behavior: A.reduceMotion() ? "auto" : "smooth" }); }
    }));
    // scene
    if (l.scene && A.sceneById[l.scene]) {
      const sc = A.$("#sec-scene");
      sc.className = "sec";
      sc.innerHTML = secHead("film", t("watch"), t("watchSub"), "vi");
      A.mountScene(sc, l.scene);
    }
    // levels
    const lvHost = A.$("#lv");
    let showAll = false;
    function setLevelTab(k) { if (k === "all") { showAll = true; } else { showAll = false; curLv = k; } drawLevels(); }
    let curLv = A.levels.some((x) => x.id === S.get("level")) ? S.get("level") : "simple";
    function lvBlock(k) {
      const items = (l.levels && l.levels[k]) || [];
      if (!items.length) return `<p class="muted">${esc(t("noLevel"))}</p>`;
      // Start with the practical Egyptian-Arabic explanation. Book-level detail
      // remains available on demand, so depth does not bury the mental model.
      const talk = A.lang() === "ar" && A.plainTalk?.[l.id];
      if (talk) {
        const fields = {
          simple: [["what", "what"], ["why", "why"]],
          mech: [["how", "how"], ["link", "link"]],
          practice: [["example", "example"], ["apply", "apply"]],
          adv: [["mistakes", "mistakes"], ["whennot", "whennot"]]
        }[k] || [];
        const clear = fields.map(([key, field]) =>
          `<div class="lv-sec plain-sec"><h4><span class="q">${esc(t("q_" + key))}</span></h4><p class="plain-copy">${esc(talk[field])}</p></div>`
        ).join("");
        const original = items.map((it) =>
          `<div class="lv-sec"><h4><span class="q">${esc(t("q_" + it.k))}</span></h4><div class="rt">${rich(L(it))}</div></div>`
        ).join("");
        return clear + `<details class="orig-layer"><summary>📖 شرح أعمق من الكتاب، لو محتاج تفاصيل زيادة</summary><div class="stack">${original}</div></details>`;
      }
      return items.map((it) => `<div class="lv-sec"><h4><span class="q">${esc(t("q_" + it.k))}</span></h4><div class="rt">${rich(L(it))}</div></div>`).join("");
    }
    function drawLevels() {
      lvHost.innerHTML = "";
      const tabs = h("div", { class: "tabs", role: "tablist", "aria-label": t("levelsTitle") });
      for (const lv of A.levels) {
        const b = h("button", { role: "tab", type: "button", id: "tab-" + lv.id, "aria-selected": String(!showAll && curLv === lv.id), "aria-controls": "lvpanel", tabindex: !showAll && curLv === lv.id ? "0" : "-1", html: `<span class="e" aria-hidden="true">${lv.e}</span>${esc(L(lv.name))}` });
        b.onclick = () => { curLv = lv.id; showAll = false; drawLevels(); A.$("#tab-" + lv.id).focus(); };
        tabs.append(b);
      }
      const ball = h("button", { role: "tab", type: "button", id: "tab-all", "aria-selected": String(showAll), "aria-controls": "lvpanel", tabindex: showAll ? "0" : "-1", html: ico("layers") + esc(t("allLevels")) });
      ball.onclick = () => { showAll = true; drawLevels(); A.$("#tab-all").focus(); };
      tabs.append(ball);
      tabs.addEventListener("keydown", (e) => {
        const btns = [...tabs.children]; const i = btns.indexOf(document.activeElement);
        if (i < 0) return;
        const dir = (e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0) * (A.lang() === "ar" ? -1 : 1);
        if (dir) { e.preventDefault(); const nb = btns[(i + dir + btns.length) % btns.length]; nb.click(); }
      });
      const panel = h("div", { class: "tabpanel", id: "lvpanel", role: "tabpanel", "aria-labelledby": showAll ? "tab-all" : "tab-" + curLv });
      const note = `<p class="addnote">${ico("spark")}${esc(t("levelAddedNote"))}</p>`;
      if (showAll) {
        panel.className += " lv-all";
        panel.innerHTML = note + A.levels.map((lv) => `<div class="lv-group"><h3><span aria-hidden="true">${lv.e}</span>${esc(L(lv.name))} <span class="muted small" style="font-weight:400">— ${esc(L(lv.desc))}</span></h3>${lvBlock(lv.id)}</div>`).join("");
      } else {
        const lv = A.levels.find((x) => x.id === curLv);
        panel.innerHTML = `${note}<p class="muted small" style="margin-bottom:10px">${esc(L(lv.desc))}</p><div class="stack" style="gap:12px">${lvBlock(curLv)}</div>`;
      }
      lvHost.append(tabs, panel);
    }
    drawLevels();
    const offLevel = A.on("level", (k) => { curLv = k; showAll = false; drawLevels(); });
    A.onLeave(offLevel);
    // lab
    if (l.lab && A.labsById[l.lab]) {
      const sl = A.$("#sec-lab"); sl.className = "sec";
      sl.innerHTML = secHead("flask", t("tryIt"), t("tryItSub"), "vi");
      A.mountLab(sl, l.lab);
    }
    // case
    if (l.case) {
      const c = l.case, sc = A.$("#sec-case"); sc.className = "sec";
      const order = ["problem", "old", "idea", "steps", "result", "risks"];
      const icons = { problem: "flag", old: "clock", idea: "spark", steps: "route", result: "chart", risks: "shield" };
      sc.innerHTML = secHead("users", t("caseTitle"), t("caseSub"), "sp") + `<div class="case"><div class="case-head"><div class="row"><span class="chip add">${ico("spark")}${esc(t("addedCase"))}</span>${c.field ? `<span class="chip">${esc(L(c.field))}</span>` : ""}</div><h3>${esc(L(c.title))}</h3>${c.assumed !== false ? `<p class="small muted">${esc(t("assumedNums"))}</p>` : ""}</div><div class="case-steps">${order.filter((k) => c.steps[k]).map((k) => `<div class="case-step"><span class="k">${ico(icons[k])}</span><div><b>${esc(t("case_" + k))}</b><div class="rt" style="font-size:15px">${rich(L(c.steps[k]))}</div></div></div>`).join("")}</div></div>`;
    }
    // prompts
    if (prompts.length) {
      const sp = A.$("#sec-prompts"); sp.className = "sec";
      sp.innerHTML = secHead("msg", t("lessonPrompts"), t("lessonPromptsSub", { n: prompts.length }));
      const g = h("div", { class: "grid g2" });
      prompts.forEach((p) => g.append(A.promptCard(p, { compact: true })));
      sp.append(g, h("p", { style: "margin-top:12px" }, h("a", { class: "btn sm", href: "#prompts", html: ico("msg") + esc(t("allPrompts")) })));
    }
    // quick check
    const qc = A.$("#qc");
    if (qs.length) qs.forEach((q) => qc.append(A.questionCard(q)));
    else qc.innerHTML = `<p class="muted">${esc(t("noQuick"))}</p>`;
    qc.append(h("a", { class: "btn sm", href: "#quiz-" + l.unit, html: ico("quiz") + esc(t("unitQuiz")) }));
    // related
    const rel = A.$("#rel");
    const relL = (l.related || []).map((x) => A.byId[x]).filter(Boolean);
    rel.innerHTML = `<div class="stack" style="gap:10px">
      ${relL.length ? `<div class="related">${relL.map((r) => `<a class="chip" href="#lesson-${r.id}">${ico("graph")}${esc(L(r.title))}</a>`).join("")}</div>` : ""}
      ${(l.pre || []).length ? `<p class="small muted">${esc(t("prereq"))}: ${(l.pre || []).map((x) => A.byId[x] ? `<a href="#lesson-${x}">${esc(L(A.byId[x].title))}</a>` : "").join(" · ")}</p>` : ""}
      ${next ? `<div class="note">${ico("next")}<div><b>${esc(t("nextIdea"))}</b><div>${esc(L(next.title))} — <span class="muted">${esc(L(next.sum))}</span></div></div></div>` : ""}
      <a class="small" href="#knowledge">${esc(t("seeInGraph"))}</a></div>`;
    // notes
    const ta = A.$("#note-ta"), st = A.$("#note-st");
    ta.value = S.get("notes")[l.id] || "";
    const save = A.debounce(() => { S.patch("notes", l.id, ta.value.trim() ? ta.value : undefined); st.textContent = S.ok() ? t("saved") : t("notSaved"); }, 400);
    ta.addEventListener("input", () => { st.textContent = t("saving"); save(); });
    // done / bookmark
    const toggleDone = () => {
      const now = !S.get("done")[l.id];
      S.patch("done", l.id, now ? Date.now() : undefined);
      A.toast(now ? t("markedDone") : t("unmarked"));
      A._restoreScroll = scrollY;
      A.go("#lesson-" + l.id);
    };
    A.$("#donebtn").onclick = toggleDone;
    A.$("#donetop").onclick = toggleDone;
    A.$("#bm").onclick = () => {
      const list = S.get("bookmarks").slice(); const i = list.indexOf(l.id);
      i >= 0 ? list.splice(i, 1) : list.push(l.id);
      S.set("bookmarks", list);
      const on = list.includes(l.id);
      const b = A.$("#bm"); b.setAttribute("aria-pressed", on); b.innerHTML = ico("bookmark") + esc(on ? t("bookmarked") : t("bookmark"));
      A.toast(on ? t("bookmarkAdded") : t("bookmarkRemoved"), "bookmark");
    };
  });

  /* ================= BOOK MAP + COVERAGE ================= */
  function unitOfPage(p) { return A.units.find((u) => p >= u.pages[0] && p <= u.pages[1]) || A.units.find((u) => (u.extraPages || []).includes(p)); }
  A.view("map", (main) => {
    const wrap = h("div", { class: "wrap-wide stack" });
    wrap.innerHTML = head(ico("map") + " " + esc(t("nav_map")), t("mapTitle"), esc(t("mapLead"))) + `
      <div class="legend">${A.units.map((u) => `<span class="row" style="gap:6px"><span style="width:12px;height:12px;border-radius:4px;background:${u.color}"></span>${esc(L(u.short))} <span class="muted num">(${u.pages[0]}–${u.pages[1]})</span></span>`).join("")}<span class="row" style="gap:6px"><span style="width:12px;height:12px;border-radius:4px;background:repeating-linear-gradient(45deg,var(--line-2),var(--line-2) 2px,transparent 2px,transparent 4px)"></span>${esc(t("visualPage"))}</span></div>
      <div class="shelf" id="shelf" role="list"></div>
      <section class="sec">${secHead("layers", t("bookParts"))}<div class="stack" id="parts"></div></section>
      <p><a class="btn" href="#coverage">${ico("check")}${esc(t("nav_coverage"))}</a></p>`;
    main.append(wrap);
    const shelf = A.$("#shelf");
    for (const c of A.coverage) {
      const u = unitOfPage(c.p);
      shelf.append(h("button", { type: "button", role: "listitem", class: "pg" + (c.kind === "image" ? " img" : ""), "data-page": c.p, style: u ? "--uc:" + u.color : "", title: L(c.title), "aria-label": t("pageN", { n: c.p }) + ": " + L(c.title), html: `<small>${esc(t("pShort", { n: "" }).trim())}</small><span class="num">${c.p}</span>` }));
    }
    const parts = A.$("#parts");
    for (const u of A.units) {
      const ls = lessonsOf(u.id);
      parts.append(h("div", { class: "card flat", style: "border-inline-start:5px solid " + u.color, html: `<div class="row" style="justify-content:space-between"><h3>${esc(u.badge)} · ${esc(L(u.title))}</h3><span class="chip num">${esc(t("pagesRange", { a: u.pages[0], b: u.pages[1] }))}${(u.extraPages || []).length ? " + " + u.extraPages.join(", ") : ""}</span></div><p class="muted small" style="margin-block:6px 10px">${esc(L(u.sum))}</p><div class="related">${ls.map((l) => `<a class="chip" href="#lesson-${l.id}">${esc(L(l.title))}</a>`).join("")}</div>` }));
    }
  });
  A.view("coverage", (main) => {
    const wrap = h("div", { class: "wrap-wide stack" });
    const mapped = A.coverage.filter((c) => (c.lessons || []).length).length;
    wrap.innerHTML = head(ico("check") + " " + esc(t("nav_coverage")), t("covTitle"), esc(t("covLead"))) + `
      <div class="statgrid"><div class="stat ok"><small>${esc(t("covPages"))}</small><b class="num">${mapped}/${A.meta.pages}</b></div><div class="stat"><small>${esc(t("covLessons"))}</small><b class="num">${A.lessons.length}</b></div><div class="stat"><small>${esc(t("covScenes"))}</small><b class="num">${A.scenes.length}</b></div><div class="stat"><small>${esc(t("covLabs"))}</small><b class="num">${A.labs.length}</b></div><div class="stat"><small>${esc(t("covPrompts"))}</small><b class="num">${A.prompts.length}</b></div><div class="stat"><small>${esc(t("covQs"))}</small><b class="num">${A.quiz.length}</b></div><div class="stat"><small>${esc(t("covTerms"))}</small><b class="num">${A.glossary.length}</b></div></div>
      <div class="note sp">${ico("info")}<div>${esc(t("covMethod"))}</div></div>
      <section class="sec">${secHead("page", t("covTable"))}<div class="table-wrap"><table class="t"><thead><tr><th>${esc(t("colPage"))}</th><th>${esc(t("colContent"))}</th><th>${esc(t("colKind"))}</th><th>${esc(t("colWhere"))}</th></tr></thead><tbody id="covb"></tbody></table></div></section>
      <section class="sec">${secHead("layers", t("idxTable"), t("idxSub"))}<div class="table-wrap"><table class="t"><thead><tr><th>${esc(t("colUnit"))}</th><th>${esc(t("colLesson"))}</th><th>${esc(t("colPages"))}</th><th>${esc(t("colScene"))}</th><th>${esc(t("colLab"))}</th><th>${esc(t("colPrompts"))}</th><th>${esc(t("colQs"))}</th></tr></thead><tbody id="idxb"></tbody></table></div></section>`;
    main.append(wrap);
    const tb = A.$("#covb");
    for (const c of A.coverage) {
      tb.append(h("tr", null,
        h("td", { class: "n", html: `<button type="button" class="chip book num" data-page="${c.p}">${c.p}</button>` }),
        h("td", { html: `<b>${esc(L(c.title))}</b><div class="small muted">${esc(L(c.sum))}</div>` }),
        h("td", null, t("kind_" + c.kind)),
        h("td", { html: (c.lessons || []).map((id) => A.byId[id] ? `<a href="#lesson-${id}">${esc(L(A.byId[id].title))}</a>` : "").join("<br>") + (c.also ? `<div class="small muted">${esc(L(c.also))}</div>` : "") })));
    }
    const ib = A.$("#idxb");
    for (const l of A.lessons) {
      const u = A.unitById[l.unit];
      ib.append(h("tr", { html: `<td><span class="chip" style="background:${u.color};color:#fff;border:0">${esc(u.badge)}</span></td><td><a href="#lesson-${l.id}">${esc(L(l.title))}</a></td><td class="n">${l.pages.join(", ")}</td><td>${l.scene ? esc(L(A.sceneById[l.scene].title)) : "—"}</td><td>${l.lab ? `<a href="#lab-${l.lab}">${esc(L(A.labsById[l.lab].title))}</a>` : "—"}</td><td class="n">${A.prompts.filter((p) => p.lesson === l.id).length}</td><td class="n">${A.quiz.filter((q) => q.lesson === l.id).length}</td>` }));
    }
  });

  /* ================= PATH ================= */
  A.view("path", (main) => {
    const p = A.progress();
    const wrap = h("div", { class: "wrap stack" });
    const nextUp = A.lessons.find((l) => !S.get("done")[l.id]);
    const review = A.lessons.filter((l) => A.needsReview(l.id));
    wrap.innerHTML = head(ico("route") + " " + esc(t("nav_path")), t("pathTitle"), esc(t("pathLead"))) + `
      <div class="statgrid"><div class="stat"><small>${esc(t("progress"))}</small><b class="num">${p.pct}%</b></div><div class="stat ok"><small>${esc(t("doneLessons"))}</small><b class="num">${p.done}/${p.total}</b></div><div class="stat sp"><small>${esc(t("toReview"))}</small><b class="num">${review.length}</b></div><div class="stat"><small>${esc(t("answered"))}</small><b class="num">${Object.keys(S.get("quiz")).length}/${A.quiz.length}</b></div></div>
      ${nextUp ? `<a class="continue" href="#lesson-${nextUp.id}" style="margin:0">${ico("play")}<span><small>${esc(t("recommendedNext"))}</small><b>${esc(L(nextUp.title))}</b></span></a>` : `<div class="note ok">${ico("star")}<div><b>${esc(t("allDone"))}</b> <a href="#project">${esc(t("nav_project"))}</a></div></div>`}
      ${review.length ? `<div class="note sp">${ico("restart")}<div><b>${esc(t("toReview"))}</b><div class="related" style="margin-top:6px">${review.map((l) => `<a class="chip add" href="#lesson-${l.id}">${esc(L(l.title))}</a>`).join("")}</div></div></div>` : ""}
      <div class="legend"><span class="row" style="gap:6px"><span class="dot done"></span>${esc(t("done"))}</span><span class="row" style="gap:6px"><span class="dot rev"></span>${esc(t("toReview"))}</span><span class="row" style="gap:6px"><span class="dot"></span>${esc(t("notStarted"))}</span></div>
      <div class="path" id="pth"></div>`;
    main.append(wrap);
    const pth = A.$("#pth");
    for (const u of A.units) {
      const ls = lessonsOf(u.id);
      const pr = unitProgress(u.id);
      const box = h("div", { class: "path-unit", style: "--uc:" + u.color });
      box.innerHTML = `<h3><span class="ub">${esc(u.badge)}</span>${esc(L(u.title))} <span class="chip num" style="margin-inline-start:auto">${pr.d}/${pr.n}</span></h3>`;
      const steps = h("div", { class: "path-steps" });
      for (const l of ls) {
        const done = S.get("done")[l.id], rev = A.needsReview(l.id);
        const missing = (l.pre || []).filter((x) => !S.get("done")[x]);
        steps.append(h("a", { class: "path-step " + (done ? "done" : rev ? "rev" : S.get("last") === l.id ? "cur" : ""), href: "#lesson-" + l.id, html: `<span class="t">${esc(L(l.title))}</span>${!done && missing.length ? `<span class="small muted">${esc(t("readFirst"))}: ${missing.map((x) => esc(L(A.byId[x].title))).join("، ")}</span>` : ""}<span class="chip num">${ico("clock")}${l.min}′</span>` }));
      }
      box.append(steps);
      pth.append(box);
    }
  });

  /* ================= QUICK REVIEW ================= */
  A.view("review", (main, uid) => {
    const wrap = h("div", { class: "wrap stack" });
    wrap.innerHTML = head(ico("bolt") + " " + esc(t("nav_review")), t("reviewTitle"), esc(t("reviewLead"))) + `<div class="row" id="rf"></div><div class="stack" id="rv"></div>`;
    main.append(wrap);
    const rf = A.$("#rf"), rv = A.$("#rv");
    let cur = uid && A.unitById[uid] ? uid : "all";
    function draw() {
      rf.innerHTML = "";
      rf.append(h("button", { class: "chip", type: "button", "aria-pressed": String(cur === "all"), onclick: () => { cur = "all"; draw(); } }, t("allUnits")));
      for (const u of A.units) rf.append(h("button", { class: "chip", type: "button", "aria-pressed": String(cur === u.id), onclick: () => { cur = u.id; draw(); } }, u.badge + " · " + L(u.short)));
      rv.innerHTML = "";
      for (const u of A.units) {
        if (cur !== "all" && cur !== u.id) continue;
        const r = u.review;
        rv.append(h("section", { class: "card stack", style: "border-top:5px solid " + u.color, html: `
          <div class="row" style="justify-content:space-between"><h2>${esc(u.badge)} · ${esc(L(u.title))}</h2><a class="chip" href="#unit-${u.id}">${esc(t("openUnit"))}</a></div>
          <div class="note bk">${ico("target")}<div><b>${esc(t("bigIdea"))}</b><div>${A.inline(L(u.big))}</div></div></div>
          <div class="rt"><ul>${r.points.map((x) => `<li>${A.inline(L(x))}</li>`).join("")}</ul></div>
          <div><b class="small">${esc(t("chainOfIdeas"))}</b><div class="journey" style="margin-top:8px">${r.chain.map((x, i) => (i ? `<span class="ar" style="border:0;background:none;padding:0">${A.lang() === "ar" ? "←" : "→"}</span>` : "") + `<span>${esc(L(x))}</span>`).join("")}</div></div>
          ${r.remember ? `<div class="note sp">${ico("star")}<div><b>${esc(t("rememberThis"))}</b><div>${A.inline(L(r.remember))}</div></div></div>` : ""}` }));
      }
      if (cur === "all") rv.append(h("section", { class: "card stack", html: `<h2>${ico("graph")} ${esc(t("bookThread"))}</h2><div class="rt">${rich(L(A.meta.thread))}</div>` }));
    }
    draw();
  });

  /* ================= GLOSSARY ================= */
  A.view("glossary", (main, focus) => {
    const wrap = h("div", { class: "wrap stack" });
    wrap.innerHTML = head(ico("abc") + " " + esc(t("nav_glossary")), t("glossTitle"), esc(t("glossLead"))) + `
      <div class="pfilters"><div class="field"><label for="gq">${esc(t("search"))}</label><input id="gq" class="input" type="search" placeholder="${esc(t("glossPh"))}"></div><div class="row" id="gu"></div></div>
      <p class="small muted" id="gcount"></p><div class="grid g2" id="gl"></div>`;
    main.append(wrap);
    let unit = "all";
    const gq = A.$("#gq"), gl = A.$("#gl"), gu = A.$("#gu");
    function draw() {
      gu.innerHTML = "";
      gu.append(h("button", { class: "chip", type: "button", "aria-pressed": String(unit === "all"), onclick: () => { unit = "all"; draw(); } }, t("allUnits")));
      for (const u of A.units) gu.append(h("button", { class: "chip", type: "button", "aria-pressed": String(unit === u.id), onclick: () => { unit = u.id; draw(); } }, u.badge));
      const q = A.norm(gq.value);
      const list = A.glossary.filter((g) => (unit === "all" || (g.lessons || []).some((id) => A.byId[id] && A.byId[id].unit === unit)) && (!q || A.norm(g.term.ar + " " + g.term.en + " " + (g.en_term || "") + " " + g.def.ar + " " + g.def.en).includes(q)));
      A.$("#gcount").textContent = t("nTerms", { n: list.length });
      gl.innerHTML = list.length ? "" : `<div class="empty">${ico("search")}<p>${esc(t("noResults"))}</p></div>`;
      for (const g of list) {
        gl.append(h("div", { class: "card stack", id: "g-" + g.id, style: "gap:8px", html: `
          <div class="row" style="justify-content:space-between"><h3>${esc(L(g.term))}</h3>${g.en_term ? `<span class="chip ltr">${esc(g.en_term)}</span>` : ""}</div>
          <p>${A.inline(L(g.def))}</p>
          ${g.ex ? `<p class="small muted"><b>${esc(t("example"))}:</b> ${esc(L(g.ex))}</p>` : ""}
          <div class="row">${g.p ? pageChips(Array.isArray(g.p) ? g.p : [g.p]) + `<span class="chip book">${esc(t("defFromBook"))}</span>` : `<span class="chip add">${ico("spark")}${esc(t("defAdded"))}</span>`}${(g.lessons || []).map((id) => A.byId[id] ? `<a class="chip" href="#lesson-${id}">${esc(L(A.byId[id].title))}</a>` : "").join("")}</div>` }));
      }
    }
    gq.addEventListener("input", draw);
    draw();
    if (focus) setTimeout(() => { const el = A.$("#g-" + focus); if (el) { el.scrollIntoView({ block: "center" }); el.style.borderColor = "var(--accent)"; el.style.boxShadow = "0 0 0 4px var(--accent-soft)"; } }, 30);
  });

  /* ================= PROMPTS ================= */
  function fillPrompt(p, vals, opt) {
    let txt = L(p.text);
    (p.vars || []).forEach((v, i) => { const val = vals && vals[i]; if (val && val.trim()) txt = txt.split("[" + L(v) + "]").join(val.trim()); });
    const extra = [];
    if (opt && opt.domain && opt.domain !== "none") extra.push(L(A.meta.domains.find((d) => d.id === opt.domain).line));
    if (opt && opt.goal && opt.goal.trim()) extra.push(t("goalLine") + " " + opt.goal.trim());
    if (opt && opt.detail && opt.detail !== "std") extra.push(t("detail_" + opt.detail + "_line"));
    return extra.length ? txt + "\n\n" + extra.join("\n") : txt;
  }
  function highlightVars(text, p, vals) {
    let s = esc(text);
    (p.vars || []).forEach((v, i) => {
      const key = esc("[" + L(v) + "]");
      s = s.split(key).join(`<span class="v">${key}</span>`);
      const val = vals && vals[i] && vals[i].trim();
      if (val) s = s.split(esc(val)).join(`<span class="v filled">${esc(val)}</span>`);
    });
    return s;
  }
  A.promptCustom = { domain: "none", goal: "", detail: "std" };
  A.promptCard = function (p, o = {}) {
    const card = h("article", { class: "pcard", id: "pc-" + p.id });
    const vals = [];
    const ls = A.byId[p.lesson];
    const cat = A.meta.promptCats.find((c) => c.id === p.cat);
    const saved = () => S.get("saved").includes(p.id);
    function draw() {
      const finalText = fillPrompt(p, vals, A.promptCustom);
      card.innerHTML = `
        <div class="row" style="justify-content:space-between;align-items:flex-start"><h3>${esc(L(p.title))}</h3>${p.p ? pageChips([p.p]) : `<span class="chip add">${ico("spark")}${esc(t("addedPrompt"))}</span>`}</div>
        <p class="goal"><b>${esc(t("promptGoal"))}:</b> ${esc(L(p.goal))}</p>
        <div class="ptext" id="pt-${p.id}">${highlightVars(finalText, p, vals)}</div>
        ${(p.vars || []).length ? `<details class="more"><summary>${ico("pen")}${esc(t("fillVars", { n: p.vars.length }))}</summary><div class="grid g2" style="gap:8px">${p.vars.map((v, i) => `<div class="field"><label for="v-${p.id}-${i}">${esc(L(v))}</label><input class="input" id="v-${p.id}-${i}" data-i="${i}" value="${esc(vals[i] || "")}" placeholder="${esc(L(v))}"></div>`).join("")}</div></details>` : ""}
        ${p.ex ? `<div class="pex"><b>${esc(t("exampleOut"))}</b>${esc(L(p.ex))}</div>` : ""}
        ${p.tip ? `<p class="ptip">${ico("star")}<span><b>${esc(t("tip"))}:</b> ${esc(L(p.tip))}</span></p>` : ""}
        <div class="pmeta">${cat ? `<span class="chip">${ico(cat.icon)}${esc(L(cat.name))}</span>` : ""}${ls && !o.compact ? `<a class="chip" href="#lesson-${ls.id}">${ico("book")}${esc(L(ls.title))}</a>` : ""}
          <span class="bar-spacer" style="flex:1"></span>
          <button type="button" class="btn sm" data-act="save" aria-pressed="${saved()}">${ico("bookmark")}${esc(saved() ? t("savedPrompt") : t("savePrompt"))}</button>
          <button type="button" class="btn sm pri" data-act="copy">${ico("copy")}${esc(t("copy"))}</button></div>`;
      card.querySelector('[data-act="copy"]').onclick = () => A.copyText(fillPrompt(p, vals, A.promptCustom), card.querySelector(".ptext"));
      card.querySelector('[data-act="save"]').onclick = () => {
        const list = S.get("saved").slice(); const i = list.indexOf(p.id);
        i >= 0 ? list.splice(i, 1) : list.push(p.id); S.set("saved", list); draw();
        A.toast(list.includes(p.id) ? t("promptSaved") : t("promptUnsaved"), "bookmark");
      };
      A.$$("input[data-i]", card).forEach((inp) => inp.addEventListener("input", () => {
        vals[Number(inp.dataset.i)] = inp.value;
        card.querySelector(".ptext").innerHTML = highlightVars(fillPrompt(p, vals, A.promptCustom), p, vals);
      }));
      const det = card.querySelector("details"); if (det && vals.some(Boolean)) det.open = true;
    }
    card._redraw = draw;
    draw();
    return card;
  };
  A.view("prompts", (main, focus) => {
    const wrap = h("div", { class: "wrap-wide stack" });
    const cu = A.promptCustom;
    wrap.innerHTML = head(ico("msg") + " " + esc(t("nav_prompts")), t("promptsTitle"), esc(t("promptsLead"))) + `
      <section class="custom" aria-label="${esc(t("customizer"))}">
        <div class="row" style="justify-content:space-between"><b>${ico("wrench")} ${esc(t("customizer"))}</b><span class="small muted">${esc(t("customizerSub"))}</span></div>
        <div class="grid g3">
          <div class="field"><label for="c-dom">${esc(t("domain"))}</label><select id="c-dom" class="input">${A.meta.domains.map((d) => `<option value="${d.id}" ${cu.domain === d.id ? "selected" : ""}>${esc(L(d.name))}</option>`).join("")}</select></div>
          <div class="field"><label for="c-goal">${esc(t("yourGoal"))}</label><input id="c-goal" class="input" value="${esc(cu.goal)}" placeholder="${esc(t("yourGoalPh"))}"></div>
          <div class="field"><label for="c-det">${esc(t("detailLevel"))}</label><select id="c-det" class="input">${["brief", "std", "deep"].map((d) => `<option value="${d}" ${cu.detail === d ? "selected" : ""}>${esc(t("detail_" + d))}</option>`).join("")}</select></div>
        </div>
      </section>
      <div class="pfilters">
        <div class="grid g3"><div class="field"><label for="pq">${esc(t("search"))}</label><input id="pq" type="search" class="input" placeholder="${esc(t("promptsPh"))}"></div>
        <div class="field"><label for="pu">${esc(t("colUnit"))}</label><select id="pu" class="input"><option value="all">${esc(t("allUnits"))}</option>${A.units.map((u) => `<option value="${u.id}">${esc(u.badge + " · " + L(u.short))}</option>`).join("")}</select></div>
        <div class="field"><label for="ps">${esc(t("source"))}</label><select id="ps" class="input"><option value="all">${esc(t("allSources"))}</option><option value="book">${esc(t("legendBook"))}</option><option value="added">${esc(t("legendAdded"))}</option><option value="saved">${esc(t("savedPrompts"))}</option></select></div></div>
        <div class="row" id="pcat" role="group" aria-label="${esc(t("category"))}"></div>
      </div>
      <p class="small muted" id="pcount" aria-live="polite"></p>
      <div class="grid g2" id="plist"></div>`;
    main.append(wrap);
    let cat = "all";
    const pq = A.$("#pq"), pu = A.$("#pu"), ps = A.$("#ps"), pl = A.$("#plist");
    const pc = A.$("#pcat");
    function drawCats() {
      pc.innerHTML = "";
      pc.append(h("button", { type: "button", class: "chip", "aria-pressed": String(cat === "all"), onclick: () => { cat = "all"; drawCats(); draw(); } }, t("allCats")));
      for (const c of A.meta.promptCats) pc.append(h("button", { type: "button", class: "chip", "aria-pressed": String(cat === c.id), onclick: () => { cat = c.id; drawCats(); draw(); }, html: ico(c.icon) + esc(L(c.name)) }));
    }
    const cards = new Map();
    function draw() {
      const q = A.norm(pq.value);
      const list = A.prompts.filter((p) => {
        if (cat !== "all" && p.cat !== cat) return false;
        if (pu.value !== "all" && (!A.byId[p.lesson] || A.byId[p.lesson].unit !== pu.value)) return false;
        if (ps.value === "book" && !p.p) return false;
        if (ps.value === "added" && p.p) return false;
        if (ps.value === "saved" && !S.get("saved").includes(p.id)) return false;
        if (q && !A.norm(p.title.ar + " " + p.title.en + " " + p.goal.ar + " " + p.goal.en + " " + p.text.ar + " " + p.text.en).includes(q)) return false;
        return true;
      });
      A.$("#pcount").textContent = t("nPrompts", { n: list.length });
      pl.innerHTML = "";
      if (!list.length) { pl.innerHTML = `<div class="empty">${ico("msg")}<p>${esc(t("noResults"))}</p></div>`; return; }
      for (const p of list) { if (!cards.has(p.id)) cards.set(p.id, A.promptCard(p)); else cards.get(p.id)._redraw(); pl.append(cards.get(p.id)); }
    }
    const refresh = () => cards.forEach((c) => c._redraw());
    A.$("#c-dom").onchange = (e) => { cu.domain = e.target.value; refresh(); };
    A.$("#c-goal").addEventListener("input", A.debounce((e) => { cu.goal = e.target.value; refresh(); }, 250));
    A.$("#c-det").onchange = (e) => { cu.detail = e.target.value; refresh(); };
    pq.addEventListener("input", A.debounce(draw, 120)); pu.onchange = draw; ps.onchange = draw;
    drawCats(); draw();
    if (focus) setTimeout(() => { const el = A.$("#pc-" + focus); if (el) { el.scrollIntoView({ block: "center" }); el.style.borderColor = "var(--accent)"; el.style.boxShadow = "0 0 0 4px var(--accent-soft)"; } }, 30);
  });

  /* ================= COMPARE ================= */
  A.view("compare", (main, arg) => {
    const wrap = h("div", { class: "wrap-wide stack" });
    wrap.innerHTML = head(ico("compare") + " " + esc(t("nav_compare")), t("cmpTitle"), esc(t("cmpLead"))) + `
      <div class="card stack"><div class="grid g3">
        <div class="field"><label for="cf">${esc(t("cmpFamily"))}</label><select id="cf" class="input"></select></div>
        <div class="field"><label for="ca">${esc(t("cmpA"))}</label><select id="ca" class="input"></select></div>
        <div class="field"><label for="cb">${esc(t("cmpB"))}</label><select id="cb" class="input"></select></div>
      </div><button type="button" class="btn sm ghost" id="cswap">${ico("compare")}${esc(t("swap"))}</button></div>
      <div id="cres"></div>
      <section class="sec">${secHead("bolt", t("quickPairs"))}<div class="row" id="cqp"></div></section>`;
    main.append(wrap);
    const cf = A.$("#cf"), ca = A.$("#ca"), cb = A.$("#cb");
    cf.innerHTML = A.compare.map((f) => `<option value="${f.id}">${esc(L(f.name))}</option>`).join("");
    let fam = A.compare[0];
    const [af, aa, ab] = (arg || "").split(".");
    if (af && A.compare.find((f) => f.id === af)) fam = A.compare.find((f) => f.id === af);
    cf.value = fam.id;
    function fillItems(a, b) {
      ca.innerHTML = cb.innerHTML = fam.items.map((it) => `<option value="${it.id}">${esc(L(it.name))}</option>`).join("");
      ca.value = a || fam.items[0].id; cb.value = b || fam.items[1].id;
    }
    function draw() {
      const A1 = fam.items.find((x) => x.id === ca.value), B1 = fam.items.find((x) => x.id === cb.value);
      const res = A.$("#cres");
      if (!A1 || !B1) { res.innerHTML = ""; return; }
      if (A1 === B1) { res.innerHTML = `<div class="note sp">${ico("info")}<div>${esc(t("cmpSame"))}</div></div>`; return; }
      const rows = fam.dims.map((d) => `<tr><th scope="row">${esc(L(d.name))}</th><td>${A.inline(L(A1.v[d.id]))}</td><td>${A.inline(L(B1.v[d.id]))}</td></tr>`).join("");
      res.innerHTML = `
        <div class="grid g2" style="margin-bottom:16px">
          <div class="card" style="border-top:4px solid var(--accent)"><h3>${esc(L(A1.name))}</h3><p class="muted small">${esc(L(A1.sum))}</p><p class="small" style="margin-top:8px"><b>${esc(t("useWhen"))}:</b> ${A.inline(L(A1.when))}</p>${A1.lesson ? `<a class="chip" style="margin-top:8px" href="#lesson-${A1.lesson}">${ico("book")}${esc(L(A.byId[A1.lesson].title))}</a>` : ""}</div>
          <div class="card" style="border-top:4px solid var(--spark)"><h3>${esc(L(B1.name))}</h3><p class="muted small">${esc(L(B1.sum))}</p><p class="small" style="margin-top:8px"><b>${esc(t("useWhen"))}:</b> ${A.inline(L(B1.when))}</p>${B1.lesson ? `<a class="chip" style="margin-top:8px" href="#lesson-${B1.lesson}">${ico("book")}${esc(L(A.byId[B1.lesson].title))}</a>` : ""}</div>
        </div>
        <div class="table-wrap"><table class="t"><thead><tr><th>${esc(t("dimension"))}</th><th>${esc(L(A1.name))}</th><th>${esc(L(B1.name))}</th></tr></thead><tbody>${rows}</tbody></table></div>
        <div class="grid g2" style="margin-top:16px"><div class="note ok">${ico("check")}<div><b>${esc(t("similar"))}</b><div>${A.inline(L(fam.common))}</div></div></div><div class="note bk">${ico("book")}<div><b>${esc(t("sourceNote"))}</b><div>${pageChips(fam.pages)}</div></div></div></div>`;
    }
    fillItems(aa, ab); draw();
    cf.onchange = () => { fam = A.compare.find((f) => f.id === cf.value); fillItems(); draw(); };
    ca.onchange = cb.onchange = draw;
    A.$("#cswap").onclick = () => { const x = ca.value; ca.value = cb.value; cb.value = x; draw(); };
    const qp = A.$("#cqp");
    for (const f of A.compare) qp.append(h("button", { type: "button", class: "chip", onclick: () => { fam = f; cf.value = f.id; fillItems(); draw(); A.$("#cres").scrollIntoView({ behavior: "smooth", block: "start" }); } }, L(f.items[0].name) + " ⇄ " + L(f.items[1].name)));
  });

  /* ================= NOTEBOOK ================= */
  A.view("notebook", (main) => {
    const wrap = h("div", { class: "wrap stack" });
    const st = S.all();
    const notes = A.lessons.filter((l) => st.notes[l.id]);
    const bms = st.bookmarks.map((id) => A.byId[id]).filter(Boolean);
    const saved = st.saved.map((id) => A.promptsById[id]).filter(Boolean);
    wrap.innerHTML = head(ico("note") + " " + esc(t("nav_notebook")), t("nbTitle"), esc(t("nbLead"))) + `
      ${S.ok() ? "" : `<div class="note bad">${ico("info")}<div>${esc(t("storageFail"))}</div></div>`}
      <section class="sec">${secHead("bookmark", t("bookmarks"), t("nItems", { n: bms.length }))}${bms.length ? `<div class="related">${bms.map((l) => `<a class="chip" href="#lesson-${l.id}">${ico("bookmark")}${esc(L(l.title))}</a>`).join("")}</div>` : `<div class="empty">${ico("bookmark")}<p>${esc(t("noBookmarks"))}</p></div>`}</section>
      <section class="sec">${secHead("pen", t("myNotes"), t("nItems", { n: notes.length }))}<div class="stack" id="nbn">${notes.length ? "" : `<div class="empty">${ico("pen")}<p>${esc(t("noNotes"))}</p></div>`}</div></section>
      <section class="sec">${secHead("msg", t("savedPrompts"), t("nItems", { n: saved.length }))}<div class="grid g2" id="nbp">${saved.length ? "" : `<div class="empty">${ico("msg")}<p>${esc(t("noSaved"))}</p></div>`}</div></section>
      <section class="sec">${secHead("db", t("myData"), t("myDataSub"))}
        <div class="row"><button type="button" class="btn" id="exj">${ico("download")}${esc(t("exportJson"))}</button><button type="button" class="btn" id="exm">${ico("download")}${esc(t("exportMd"))}</button>
        <label class="btn" for="imp" style="cursor:pointer">${ico("upload")}${esc(t("importJson"))}</label><input type="file" id="imp" accept="application/json,.json" class="sr-only">
        <button type="button" class="btn danger" id="rst">${ico("trash")}${esc(t("resetAll"))}</button></div>
        <div id="exout"></div></section>`;
    main.append(wrap);
    const nbn = A.$("#nbn");
    for (const l of notes) {
      const box = h("div", { class: "card stack", style: "gap:8px" });
      box.innerHTML = `<div class="row" style="justify-content:space-between"><a href="#lesson-${l.id}"><b>${esc(L(l.title))}</b></a><span class="chip">${esc(A.unitById[l.unit].badge)}</span></div>`;
      const ta = h("textarea", { class: "input", "aria-label": t("myNotes") + ": " + L(l.title) });
      ta.value = st.notes[l.id];
      ta.addEventListener("input", A.debounce(() => S.patch("notes", l.id, ta.value.trim() ? ta.value : undefined), 400));
      box.append(ta); nbn.append(box);
    }
    const nbp = A.$("#nbp"); saved.forEach((p) => nbp.append(A.promptCard(p)));
    const showOut = (txt) => { const o = A.$("#exout"); o.innerHTML = `<details class="more" style="margin-top:12px"><summary>${esc(t("exportFallback"))}</summary><textarea class="input" rows="8" readonly></textarea></details>`; o.querySelector("textarea").value = txt; };
    A.$("#exj").onclick = () => showOut(A.exportData("json"));
    A.$("#exm").onclick = () => showOut(A.exportData("md"));
    A.$("#imp").onchange = (e) => { const f = e.target.files[0]; if (f) A.importData(f); };
    A.$("#rst").onclick = () => A.confirmBox(t("resetConfirm"), t("resetAll"), () => { S.reset(); A.renderBar(); A.renderSide(); A.go("#notebook"); A.toast(t("resetDone")); });
  });

  /* ================= LABS ================= */
  A.view("labs", (main) => {
    const wrap = h("div", { class: "wrap-wide stack" });
    wrap.innerHTML = head(ico("flask") + " " + esc(t("nav_labs")), t("labsTitle"), esc(t("labsLead"))) + `<div class="note">${ico("info")}<div>${esc(t("labsHonesty"))}</div></div><div id="lbg"></div>`;
    main.append(wrap);
    const host = A.$("#lbg");
    for (const u of A.units) {
      const labs = A.labs.filter((lb) => A.byId[lb.lesson] && A.byId[lb.lesson].unit === u.id);
      if (!labs.length) continue;
      const sec = h("section", { class: "sec" });
      sec.innerHTML = `<h2 style="margin-bottom:12px"><span class="chip" style="background:${u.color};color:#fff;border:0">${esc(u.badge)}</span> ${esc(L(u.title))}</h2>`;
      const g = h("div", { class: "grid g3" }); labs.forEach((lb) => g.append(labCard(lb))); sec.append(g); host.append(sec);
    }
  });
  A.view("lab", (main, id) => {
    const lb = A.labsById[id] || A.labs[0];
    const ls = A.byId[lb.lesson];
    const wrap = h("div", { class: "wrap-wide stack" });
    wrap.innerHTML = `<nav class="crumbs" aria-label="${esc(t("crumbs"))}"><a href="#home">${esc(t("home"))}</a> › <a href="#labs">${esc(t("nav_labs"))}</a> › <span>${esc(L(lb.title))}</span></nav>` + head(ico("flask") + " " + esc(t("labWord")), L(lb.title), esc(L(lb.sum)), ls ? `<div class="row"><a class="chip" href="#lesson-${ls.id}">${ico("book")}${esc(L(ls.title))}</a>${pageChips(ls.pages)}</div>` : "");
    main.append(wrap);
    A.mountLab(wrap, lb.id);
  });

  /* ================= FINAL PROJECT ================= */
  A.view("project", (main) => {
    const pj = A.meta.project;
    const st = S.get("project") || {};
    const wrap = h("div", { class: "wrap stack" });
    wrap.innerHTML = head(ico("flag") + " " + esc(t("nav_project")), L(pj.title), esc(L(pj.lead)), `<div class="row">${pageChips(pj.pages)}<span class="chip add">${ico("spark")}${esc(t("projectAdded"))}</span></div>`) + `
      <section class="sec">${secHead("target", t("projBrief"))}<div class="card rt">${rich(L(pj.brief))}</div></section>
      <section class="sec">${secHead("route", t("projSteps"), t("projStepsSub"))}<div class="stack" id="pjs"></div></section>
      <section class="sec">${secHead("check", t("projRubric"), t("projRubricSub"), "mt")}<div class="card stack" id="pjr"></div><div class="bar-meter" style="margin-top:10px"><i id="pjm"></i></div><p class="small muted" id="pjt"></p></section>`;
    main.append(wrap);
    const pjs = A.$("#pjs");
    pj.steps.forEach((s, i) => {
      const key = "s" + i;
      const row = h("label", { class: "card check", style: "padding:14px 16px" });
      const cb = h("input", { type: "checkbox", id: "pj-" + key });
      cb.checked = !!st[key];
      cb.onchange = () => { S.patch("project", key, cb.checked || undefined); score(); };
      row.append(cb, h("div", { html: `<b>${i + 1}. ${esc(L(s.t))}</b><div class="small muted">${A.inline(L(s.d))}</div>${(s.lessons || []).map((id) => A.byId[id] ? `<a class="chip" style="margin-top:6px;margin-inline-end:6px" href="#lesson-${id}">${esc(L(A.byId[id].title))}</a>` : "").join("")}` }));
      pjs.append(row);
    });
    const pjr = A.$("#pjr");
    pj.rubric.forEach((r, i) => {
      const key = "r" + i;
      const row = h("label", { class: "check" });
      const cb = h("input", { type: "checkbox", id: "pj-" + key });
      cb.checked = !!st[key];
      cb.onchange = () => { S.patch("project", key, cb.checked || undefined); score(); };
      row.append(cb, h("span", { html: A.inline(L(r)) }));
      pjr.append(row);
    });
    function score() {
      const s2 = S.get("project") || {};
      const n = pj.rubric.filter((_, i) => s2["r" + i]).length;
      A.$("#pjm").style.width = (n / pj.rubric.length) * 100 + "%";
      A.$("#pjt").textContent = t("rubricScore", { n, t: pj.rubric.length });
    }
    score();
  });
})(window.ACADEMY);