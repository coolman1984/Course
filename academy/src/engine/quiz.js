/* Quiz engine: inline question cards (quick checks) and full unit / comprehensive tests.
   Types: mcq, spot (find the flaw), predict (before a simulation), compare, order (arrange steps). */
"use strict";
(function (A) {
  const { h, ico, L, t, esc, S } = A;
  const typeIcon = { mcq: "quiz", spot: "eye", predict: "spark", compare: "compare", order: "route" };
  function seeded(id) { let x = 0; for (const c of id) x = (x * 31 + c.charCodeAt(0)) >>> 0; return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function shuffled(arr, id) {
    const r = seeded(id); const a = arr.map((v, i) => i);
    for (let k = 0; k < 4; k++) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } if (a.some((v, i) => v !== i)) break; }
    return a;
  }
  function record(q, ok) {
    const prev = S.get("quiz")[q.id];
    S.patch("quiz", q.id, { ok, at: Date.now(), tries: (prev ? prev.tries : 0) + 1 });
  }
  function reviewLink(q) {
    const l = A.byId[q.lesson];
    return l ? `<a href="#lesson-${l.id}" class="small">${ico("book")} ${esc(t("reviewLesson"))}: ${esc(L(l.title))}</a>` : "";
  }

  /* one question; onAnswer(ok) lets the runner advance */
  function questionCard(q, opts = {}) {
    const card = h("div", { class: "card quiz", id: "q-" + q.id });
    const prevRec = S.get("quiz")[q.id];
    function drawMcq() {
      const order = q.shuffle === false ? q.opts.map((_, i) => i) : shuffled(q.opts, q.id);
      card.innerHTML = `<div class="qhead"><span class="chip vi">${ico(typeIcon[q.type] || "quiz")}${esc(t("qt_" + q.type))}</span>${prevRec && !opts.fresh ? `<span class="chip ${prevRec.ok ? "ok" : "bad"}">${esc(prevRec.ok ? t("answeredRight") : t("answeredWrong"))}</span>` : ""}</div>
        <p class="qtext">${A.inline(L(q.q))}</p>
        ${q.code ? `<div class="ptext">${esc(L(q.code))}</div>` : ""}
        <div class="opts" role="group" aria-label="${esc(t("chooseOne"))}">${order.map((oi, k) => `<button type="button" class="opt" data-oi="${oi}"><span class="k">${"ABCDEF"[k]}</span><span>${A.inline(L(q.opts[oi]))}</span></button>`).join("")}</div>
        <div class="fbz" aria-live="polite"></div>`;
      A.$$(".opt", card).forEach((b) => (b.onclick = () => {
        const oi = Number(b.dataset.oi);
        const ok = oi === q.ans;
        A.$$(".opt", card).forEach((x) => { x.disabled = true; const xi = Number(x.dataset.oi); if (xi === q.ans) x.classList.add("ok"); else if (x === b) x.classList.add("bad"); else x.classList.add("dim"); });
        const why = q.opts[oi].why ? L(q.opts[oi].why) : "";
        const fb = A.$(".fbz", card);
        fb.innerHTML = `<div class="fb ${ok ? "ok" : "bad"}"><b>${ico(ok ? "check" : "x")} ${esc(ok ? t("correct") : t("notQuite"))}</b>
          ${!ok && why ? `<p>${A.inline(why)}</p>` : ""}<p>${A.inline(L(q.explain))}</p>${!ok ? reviewLink(q) : ""}</div>
          ${opts.runner ? "" : `<button type="button" class="btn sm ghost retry">${ico("restart")}${esc(t("tryAgain"))}</button>`}`;
        record(q, ok);
        const r = A.$(".retry", card); if (r) r.onclick = () => drawMcq();
        opts.onAnswer && opts.onAnswer(ok);
      }));
    }
    function drawOrder() {
      let cur = shuffled(q.items, q.id);
      const render = (checked) => {
        card.innerHTML = `<div class="qhead"><span class="chip vi">${ico("route")}${esc(t("qt_order"))}</span>${prevRec && !opts.fresh ? `<span class="chip ${prevRec.ok ? "ok" : "bad"}">${esc(prevRec.ok ? t("answeredRight") : t("answeredWrong"))}</span>` : ""}</div>
          <p class="qtext">${A.inline(L(q.q))}</p><p class="hint">${esc(t("orderHint"))}</p>
          <ol class="order-list">${cur.map((ii, pos) => `<li class="order-item ${checked ? (ii === pos ? "ok" : "bad") : ""}"><span class="pos num">${pos + 1}</span><span>${esc(L(q.items[ii]))}</span><span class="mv"><button type="button" class="ibtn" data-up="${pos}" aria-label="${esc(t("moveUp"))}" ${pos === 0 || checked ? "disabled" : ""}>${ico("up")}</button><button type="button" class="ibtn" data-down="${pos}" aria-label="${esc(t("moveDown"))}" ${pos === cur.length - 1 || checked ? "disabled" : ""}>${ico("down")}</button></span></li>`).join("")}</ol>
          ${checked ? "" : `<button type="button" class="btn pri sm chk">${ico("check")}${esc(t("check"))}</button>`}
          <div class="fbz" aria-live="polite"></div>`;
        A.$$("[data-up]", card).forEach((b) => (b.onclick = () => { const p = Number(b.dataset.up); [cur[p - 1], cur[p]] = [cur[p], cur[p - 1]]; render(false); A.$(`[data-up="${p - 1}"]`, card)?.focus() || A.$(`[data-down="${p - 1}"]`, card)?.focus(); }));
        A.$$("[data-down]", card).forEach((b) => (b.onclick = () => { const p = Number(b.dataset.down); [cur[p + 1], cur[p]] = [cur[p], cur[p + 1]]; render(false); A.$(`[data-down="${p + 1}"]`, card)?.focus() || A.$(`[data-up="${p + 1}"]`, card)?.focus(); }));
        const chk = A.$(".chk", card);
        if (chk) chk.onclick = () => {
          const ok = cur.every((v, i) => v === i);
          render(true);
          A.$(".fbz", card).innerHTML = `<div class="fb ${ok ? "ok" : "bad"}"><b>${ico(ok ? "check" : "x")} ${esc(ok ? t("correct") : t("notQuite"))}</b>${ok ? "" : `<p>${esc(t("rightOrder"))}: ${q.items.map((x, i) => `${i + 1}) ${esc(L(x))}`).join(" ← ".replace("←", A.lang() === "ar" ? "←" : "→"))}</p>`}<p>${A.inline(L(q.explain))}</p>${ok ? "" : reviewLink(q)}</div>${opts.runner ? "" : `<button type="button" class="btn sm ghost retry">${ico("restart")}${esc(t("tryAgain"))}</button>`}`;
          record(q, ok);
          const r = A.$(".retry", card); if (r) r.onclick = () => drawOrder();
          opts.onAnswer && opts.onAnswer(ok);
        };
      };
      render(false);
    }
    q.type === "order" ? drawOrder() : drawMcq();
    return card;
  }
  A.questionCard = questionCard;

  /* ---------- hub ---------- */
  A.view("quiz", (main, arg) => {
    if (arg) return runQuiz(main, arg);
    const wrap = h("div", { class: "wrap stack" });
    const scores = S.get("scores") || {};
    const wrongN = A.quiz.filter((q) => S.get("quiz")[q.id] && !S.get("quiz")[q.id].ok).length;
    wrap.innerHTML = `<header class="page-head"><span class="eyebrow">${ico("quiz")} ${esc(t("nav_quiz"))}</span><h1>${esc(t("quizTitle"))}</h1><p class="lead">${esc(t("quizLead"))}</p></header>
      <div class="grid g2" id="qh"></div>
      <div class="grid g2" style="margin-top:8px">
        <a class="card card-link" href="#quiz-all"><h3>${ico("star")} ${esc(t("quizAll"))}</h3><p class="muted small">${esc(t("quizAllSub", { n: A.quiz.length }))}</p>${scores.all ? `<span class="chip ok num">${esc(t("best"))}: ${scores.all.best}%</span>` : ""}</a>
        <a class="card card-link" href="#quiz-mistakes" ${wrongN ? "" : 'aria-disabled="true"'}><h3>${ico("restart")} ${esc(t("quizMistakes"))}</h3><p class="muted small">${esc(t("quizMistakesSub", { n: wrongN }))}</p></a>
      </div>`;
    main.append(wrap);
    const qh = A.$("#qh");
    for (const u of A.units) {
      const qs = A.quiz.filter((q) => A.byId[q.lesson] && A.byId[q.lesson].unit === u.id);
      const sc = scores[u.id];
      qh.append(h("a", { class: "unit-card", href: "#quiz-" + u.id, style: "--uc:" + u.color, html: `<div class="row" style="justify-content:space-between"><span class="ub">${esc(u.badge)}</span>${sc ? `<span class="chip ${sc.best >= 70 ? "ok" : "add"} num">${esc(t("best"))}: ${sc.best}%</span>` : `<span class="chip">${esc(t("notTaken"))}</span>`}</div><h3>${esc(L(u.title))}</h3><p>${esc(t("nQuestions", { n: qs.length }))}</p>` }));
    }
  });

  function runQuiz(main, arg) {
    let qs, title;
    if (arg === "all") { qs = A.quiz.slice(); title = t("quizAll"); }
    else if (arg === "mistakes") { qs = A.quiz.filter((q) => S.get("quiz")[q.id] && !S.get("quiz")[q.id].ok); title = t("quizMistakes"); }
    else { const u = A.unitById[arg] || A.units[0]; arg = u.id; qs = A.quiz.filter((q) => A.byId[q.lesson] && A.byId[q.lesson].unit === u.id); title = t("unitQuiz") + " · " + L(u.title); }
    const wrap = h("div", { class: "wrap stack" });
    main.append(wrap);
    if (!qs.length) { wrap.innerHTML = `<header class="page-head"><h1>${esc(title)}</h1></header><div class="empty">${ico("check")}<p>${esc(t("noMistakes"))}</p></div><a class="btn" href="#quiz">${esc(t("nav_quiz"))}</a>`; return; }
    let i = 0; const results = [];
    function step() {
      wrap.innerHTML = `<nav class="crumbs"><a href="#quiz">${esc(t("nav_quiz"))}</a> › <span>${esc(title)}</span></nav><header class="page-head"><h1>${esc(title)}</h1></header>
        <div class="qhead"><span class="num small muted">${esc(t("qOf", { n: i + 1, t: qs.length }))}</span><span class="num small muted">${esc(t("scoreSoFar", { n: results.filter(Boolean).length }))}</span></div>
        <div class="qprog"><i style="width:${(i / qs.length) * 100}%"></i></div><div id="qslot"></div><div class="row" id="qnav"></div>`;
      const slot = A.$("#qslot", wrap), nav = A.$("#qnav", wrap);
      const card = questionCard(qs[i], { runner: true, fresh: true, onAnswer: (ok) => {
        results[i] = ok;
        nav.innerHTML = "";
        nav.append(h("button", { class: "btn pri", type: "button", onclick: () => { i++; i < qs.length ? step() : finish(); }, html: (i + 1 < qs.length ? esc(t("nextQ")) : esc(t("seeResult"))) + ico(A.lang() === "ar" ? "prev" : "next") }));
        nav.querySelector("button").focus();
      } });
      slot.append(card);
      const f = card.querySelector("button"); f && f.focus();
    }
    function finish() {
      const n = results.filter(Boolean).length;
      const pct = Math.round((n / qs.length) * 100);
      if (arg !== "mistakes") { const sc = (S.get("scores") || {})[arg]; S.patch("scores", arg, { best: Math.max(pct, sc ? sc.best : 0), last: pct, at: Date.now() }); }
      const wrong = qs.filter((_, k) => !results[k]);
      const lessons = [...new Set(wrong.map((q) => q.lesson))].map((id) => A.byId[id]).filter(Boolean);
      const verdict = pct >= 90 ? t("v90") : pct >= 70 ? t("v70") : pct >= 50 ? t("v50") : t("v0");
      wrap.innerHTML = `<nav class="crumbs"><a href="#quiz">${esc(t("nav_quiz"))}</a> › <span>${esc(title)}</span></nav>
        <div class="score"><span class="big num">${pct}%</span><b>${esc(t("youGot", { n, t: qs.length }))}</b><p class="muted">${esc(verdict)}</p><p class="small muted">${esc(t("passMark"))}</p></div>
        ${lessons.length ? `<section class="sec"><div class="sec-h"><span class="ic sp">${ico("restart")}</span><div><h2>${esc(t("reviewThese"))}</h2><p>${esc(t("reviewTheseSub"))}</p></div></div><div class="stack">${wrong.map((q) => `<div class="card flat"><p><b>${A.inline(L(q.q))}</b></p><p class="small" style="margin-top:6px">${A.inline(L(q.explain))}</p><p style="margin-top:6px">${reviewLink(q)}</p></div>`).join("")}</div></section>` : `<div class="note ok">${ico("star")}<div>${esc(t("perfect"))}</div></div>`}
        <div class="row"><button type="button" class="btn pri" id="again">${ico("restart")}${esc(t("retake"))}</button><a class="btn" href="#quiz">${esc(t("nav_quiz"))}</a>${wrong.length ? `<a class="btn" href="#quiz-mistakes">${esc(t("quizMistakes"))}</a>` : ""}</div>`;
      A.$("#again", wrap).onclick = () => { i = 0; results.length = 0; step(); };
      A.$(".big", wrap).focus && wrap.querySelector(".score").setAttribute("tabindex", "-1");
      wrap.querySelector(".score").focus();
    }
    step();
  }
})(window.ACADEMY);
