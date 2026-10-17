/* Knowledge graph and presenter mode. */
"use strict";
(function (A) {
  const { h, ico, L, t, esc, S } = A;
  const NS = "http://www.w3.org/2000/svg";
  const sv = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  /* ================= KNOWLEDGE GRAPH ================= */
  A.view("knowledge", (main) => {
    const wrap = h("div", { class: "wrap-wide stack" });
    wrap.innerHTML = `<header class="page-head"><span class="eyebrow">${ico("graph")} ${esc(t("nav_knowledge"))}</span><h1>${esc(t("kgTitle"))}</h1><p class="lead">${esc(t("kgLead"))}</p></header>
      <div class="kg-ctl"><label class="sr-only" for="kgq">${esc(t("search"))}</label><input id="kgq" class="input" type="search" style="max-width:260px" placeholder="${esc(t("kgSearch"))}">
        <div class="row" id="kgu"></div><span class="bar-spacer" style="flex:1"></span>
        <button type="button" class="ibtn" id="kz-in" aria-label="${esc(t("zoomIn"))}">${ico("zoomin")}</button><button type="button" class="ibtn" id="kz-out" aria-label="${esc(t("zoomOut"))}">${ico("zoomout")}</button><button type="button" class="ibtn" id="kz-0" aria-label="${esc(t("zoomReset"))}">${ico("full")}</button></div>
      <div style="position:relative" id="kgbox"></div>
      <p class="hint">${esc(t("kgHint"))}</p>
      <details class="more"><summary>${ico("layers")}${esc(t("kgList"))}</summary><div class="table-wrap"><table class="t"><thead><tr><th>${esc(t("colLesson"))}</th><th>${esc(t("kgLinks"))}</th></tr></thead><tbody id="kgl"></tbody></table></div></details>`;
    main.append(wrap);
    const box = A.$("#kgbox");
    const W = 1000, H = 820, cx = 500, cy = 410, R = 300;
    const svg = sv("svg", { class: "kgraph", viewBox: `0 0 ${W} ${H}`, role: "group", "aria-label": t("kgTitle") });
    box.append(svg);
    const gE = sv("g", {}), gN = sv("g", {});
    const vp = sv("g", {}); vp.append(gE, gN); svg.append(vp);
    const nodes = [], byId = {};
    const n = A.units.length;
    A.units.forEach((u, i) => {
      const ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
      const hx = cx + Math.cos(ang) * R * 0.62, hy = cy + Math.sin(ang) * R * 0.62;
      const hub = { id: "u:" + u.id, unit: u.id, hub: true, x: hx, y: hy, label: u.badge + " · " + L(u.short), href: "#unit-" + u.id, color: u.color, sum: L(u.sum) };
      nodes.push(hub); byId[hub.id] = hub;
      const ls = A.lessons.filter((l) => l.unit === u.id);
      const spread = Math.min(Math.PI * 1.25, 0.5 + ls.length * 0.2);
      ls.forEach((l, k) => {
        const a = ang + (ls.length === 1 ? 0 : -spread / 2 + (k / (ls.length - 1)) * spread);
        const rr = 120 + (k % 2) * 34;
        const nd = { id: l.id, unit: u.id, x: hx + Math.cos(a) * rr, y: hy + Math.sin(a) * rr, label: L(l.title), href: "#lesson-" + l.id, color: u.color, sum: L(l.sum), done: !!S.get("done")[l.id], a };
        nodes.push(nd); byId[nd.id] = nd;
      });
    });
    const edges = [];
    for (const l of A.lessons) {
      edges.push({ a: "u:" + l.unit, b: l.id, hub: true });
      for (const r of l.related || []) if (byId[r] && !edges.some((e) => (e.a === r && e.b === l.id) || (e.a === l.id && e.b === r))) edges.push({ a: l.id, b: r });
    }
    for (let i = 0; i < A.units.length - 1; i++) edges.push({ a: "u:" + A.units[i].id, b: "u:" + A.units[i + 1].id, hub: true, spine: true });
    const nbr = {};
    for (const e of edges) { (nbr[e.a] ||= new Set()).add(e.b); (nbr[e.b] ||= new Set()).add(e.a); }
    for (const e of edges) {
      const p = byId[e.a], q = byId[e.b];
      const mx = (p.x + q.x) / 2 + (e.hub ? 0 : (cy - (p.y + q.y) / 2) * 0.25), my = (p.y + q.y) / 2 + (e.hub ? 0 : ((p.x + q.x) / 2 - cx) * 0.25);
      e.el = sv("path", { class: "kg-edge", d: `M${p.x} ${p.y} Q${mx} ${my} ${q.x} ${q.y}`, "stroke-dasharray": e.hub ? "" : "4 4", opacity: e.hub ? ".7" : ".55" });
      if (e.spine) e.el.setAttribute("stroke-width", "3");
      gE.append(e.el);
    }
    const tip = h("div", { class: "kg-tip", hidden: true });
    box.append(tip);
    for (const nd of nodes) {
      const g = sv("g", { class: "kg-node" + (nd.hub ? " hub" : ""), tabindex: "0", role: "link", "aria-label": nd.label + ". " + nd.sum });
      const c = sv("circle", { cx: nd.x, cy: nd.y, r: nd.hub ? 22 : 9, fill: nd.color, opacity: nd.hub || nd.done ? 1 : 0.75 });
      g.append(c);
      if (nd.done && !nd.hub) g.append(sv("circle", { cx: nd.x, cy: nd.y, r: 3.5, fill: "#fff" }));
      const lab = nd.label.length > 24 ? nd.label.slice(0, 23) + "…" : nd.label;
      /* lesson labels point away from their hub so neighbouring labels don't pile up */
      const cs = nd.hub ? 0 : Math.cos(nd.a), sn = nd.hub ? 1 : Math.sin(nd.a);
      const rtl = A.lang() === "ar";
      const anchor = nd.hub || Math.abs(cs) < 0.35 ? "middle" : (cs > 0) !== rtl ? "start" : "end";
      const tx = sv("text", nd.hub ? { x: nd.x, y: nd.y + 40, "text-anchor": "middle" } : { x: nd.x + cs * 11, y: nd.y + (Math.abs(cs) < 0.35 ? (sn > 0 ? 20 : -12) : sn * 6 + 4), "text-anchor": anchor });
      tx.textContent = lab;
      g.append(tx);
      nd.g = g;
      const enter = () => focusNode(nd);
      g.addEventListener("mouseenter", enter); g.addEventListener("focus", enter);
      g.addEventListener("mouseleave", () => focusNode(null)); g.addEventListener("blur", () => focusNode(null));
      g.addEventListener("click", () => { if (!moved) location.hash = nd.href; });
      g.addEventListener("keydown", (e) => { if (e.key === "Enter") location.hash = nd.href; });
      gN.append(g);
    }
    function focusNode(nd) {
      const set = nd ? new Set([nd.id, ...(nbr[nd.id] || [])]) : null;
      for (const x of nodes) x.g.classList.toggle("dim", !!set && !set.has(x.id) && !filterMatch(x));
      for (const e of edges) e.el.classList.toggle("hi", !!nd && (e.a === nd.id || e.b === nd.id));
      if (nd) {
        tip.hidden = false;
        tip.innerHTML = `<b>${esc(nd.label)}</b><div class="muted">${esc(nd.sum)}</div><div class="small" style="margin-top:4px;color:var(--accent)">${esc(t("kgLinksN", { n: (nbr[nd.id] || new Set()).size }))}</div>`;
        const r = svg.getBoundingClientRect(), b = box.getBoundingClientRect();
        const ctm = nd.g.querySelector("circle").getBoundingClientRect();
        tip.style.left = Math.min(Math.max(8, ctm.left - b.left + 16), b.width - 290) + "px";
        tip.style.top = Math.max(8, ctm.top - b.top - 10) + "px";
        void r;
      } else { tip.hidden = true; applyFilter(); }
    }
    // filter
    let unitF = "all";
    const kq = A.$("#kgq");
    function filterMatch(x) { return false && x; }
    function applyFilter() {
      const q = A.norm(kq.value);
      for (const x of nodes) {
        const okU = unitF === "all" || x.unit === unitF;
        const okQ = !q || A.norm(x.label + " " + x.sum).includes(q);
        x.g.classList.toggle("dim", !(okU && okQ));
      }
    }
    const ku = A.$("#kgu");
    function drawChips() {
      ku.innerHTML = "";
      ku.append(h("button", { class: "chip", type: "button", "aria-pressed": String(unitF === "all"), onclick: () => { unitF = "all"; drawChips(); applyFilter(); } }, t("allUnits")));
      for (const u of A.units) ku.append(h("button", { class: "chip", type: "button", "aria-pressed": String(unitF === u.id), style: unitF === u.id ? "" : `border-color:${u.color}`, onclick: () => { unitF = u.id; drawChips(); applyFilter(); } }, u.badge));
    }
    drawChips();
    kq.addEventListener("input", applyFilter);
    // pan & zoom
    let z = 1, ox = 0, oy = 0, moved = false;
    const apply = () => vp.setAttribute("transform", `translate(${ox} ${oy}) scale(${z})`);
    const zoom = (f, px = W / 2, py = H / 2) => { const nz = Math.max(0.6, Math.min(3, z * f)); ox = px - ((px - ox) * nz) / z; oy = py - ((py - oy) * nz) / z; z = nz; apply(); };
    A.$("#kz-in").onclick = () => zoom(1.25); A.$("#kz-out").onclick = () => zoom(0.8); A.$("#kz-0").onclick = () => { z = 1; ox = oy = 0; apply(); };
    const toSvg = (e) => { const r = svg.getBoundingClientRect(); const s = Math.min(r.width / W, r.height / H); const offX = (r.width - W * s) / 2, offY = (r.height - H * s) / 2; return [(e.clientX - r.left - offX) / s, (e.clientY - r.top - offY) / s]; };
    svg.addEventListener("wheel", (e) => { if (!e.ctrlKey) return; e.preventDefault(); const [px, py] = toSvg(e); zoom(e.deltaY < 0 ? 1.1 : 0.9, px, py); }, { passive: false });
    let drag = null;
    svg.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, ox, oy }; moved = false; });
    addEventListener("pointermove", (e) => { if (!drag) return; const r = svg.getBoundingClientRect(); const s = Math.min(r.width / W, r.height / H); const dx = (e.clientX - drag.x) / s, dy = (e.clientY - drag.y) / s; if (Math.abs(dx) + Math.abs(dy) > 4) moved = true; ox = drag.ox + dx; oy = drag.oy + dy; apply(); });
    const up = () => { drag = null; setTimeout(() => (moved = false), 0); };
    addEventListener("pointerup", up);
    A.onLeave(() => { removeEventListener("pointerup", up); });
    svg.addEventListener("dblclick", (e) => { const [px, py] = toSvg(e); zoom(1.4, px, py); });
    // accessible list
    const kgl = A.$("#kgl");
    for (const l of A.lessons) kgl.append(h("tr", { html: `<td><a href="#lesson-${l.id}">${esc(L(l.title))}</a></td><td>${[...(nbr[l.id] || [])].filter((x) => !x.startsWith("u:")).map((x) => `<a href="#lesson-${x}">${esc(L(A.byId[x].title))}</a>`).join(" · ") || "—"}</td>` }));
  });

  /* ================= PRESENTER ================= */
  A.view("present", (main, uid) => {
    const wrap = h("div", { class: "wrap stack" });
    wrap.innerHTML = `<header class="page-head"><span class="eyebrow">${ico("screen")} ${esc(t("nav_present"))}</span><h1>${esc(t("prTitle"))}</h1><p class="lead">${esc(t("prLead"))}</p></header>
      <div class="note">${ico("info")}<div>${esc(t("prKeys"))}</div></div><div class="grid g2" id="prl"></div>`;
    main.append(wrap);
    const prl = A.$("#prl");
    for (const u of A.units) {
      const b = h("button", { type: "button", class: "unit-card", style: "--uc:" + u.color + ";text-align:start;font:inherit;cursor:pointer", html: `<span class="ub">${esc(u.badge)}</span><h3>${esc(L(u.title))}</h3><p>${esc(t("prSlidesN", { n: buildSlides(u, S.get("presenter") || {}).steps.length }))}</p>` });
      b.onclick = () => openPresenter(u.id);
      prl.append(b);
    }
    if (uid && A.unitById[uid]) setTimeout(() => openPresenter(uid), 0);
  });

  /* The presenter: a full-screen player for one unit. Each lesson plays as a chapter: a title card, its story deck
     (the same animated slides as the lesson page), then its animated scene stage by stage, then a question for the room.
     Built for a lecture hall: works with a USB presenter remote (PageUp/PageDown, arrows, B/. for a black screen,
     F5/Esc), hides its controls and the cursor when idle, keeps the screen awake, and resumes where it stopped. */
  function buildSlides(u, opts = {}) {
    const blocks = [{ kind: "title", n: 1 }];
    const lessons = A.lessons.filter((x) => x.unit === u.id);
    lessons.forEach((l, li) => {
      const ch = li;
      blocks.push({ kind: "lesson", l, ch, n: 1 });
      const deck = (A.decks || []).find((d) => d.lesson === l.id);
      if (deck) blocks.push({ kind: "deck", l, ch, deck, n: deck.slides.length });
      const sc = l.scene && A.sceneById[l.scene];
      if (sc) blocks.push({ kind: "scene", l, ch, sc, n: sc.stages.length });
      const q = opts.questions === false ? null : A.quiz.find((x) => x.lesson === l.id && x.type !== "order");
      if (q) blocks.push({ kind: "ask", l, ch, q, n: 2 });
    });
    blocks.push({ kind: "review", n: 1 });
    const steps = [];
    blocks.forEach((b, bi) => { for (let k = 0; k < b.n; k++) steps.push({ b: bi, k }); });
    return { blocks, steps, lessons };
  }

  function openPresenter(uid, lessonId) {
    const u = A.unitById[uid];
    if (!u || document.querySelector(".cine")) return;
    const pref = Object.assign({ questions: true }, S.get("presenter") || {});
    let plan = buildSlides(u, pref);
    // start at the lesson asked for, else where the last show of this unit stopped
    const atLesson = lessonId ? plan.steps.findIndex((s) => (plan.blocks[s.b].l || {}).id === lessonId) : -1;
    // the place is saved as (lesson, part, sub-step), not a raw index: the plan's length changes with the questions setting
    const saved = (S.get("presentPos") || {})[uid];
    const findPlace = (p) => {
      if (!p || typeof p !== "object") return -1;
      const i = plan.steps.findIndex((s) => { const b = plan.blocks[s.b]; return b.kind === p.kind && ((b.l || {}).id || null) === (p.l || null) && s.k === p.k; });
      return i >= 0 ? i : p.l ? plan.steps.findIndex((s) => (plan.blocks[s.b].l || {}).id === p.l) : -1;
    };
    let pos = atLesson >= 0 ? atLesson : Math.max(0, findPlace(saved));
    let cur = { b: -1 }, api = null, playing = false, playT = 0, screen = "", spot = false, jump = "", jumpT = 0, idleT = 0, clockT = 0, lock = null;
    const t0 = Date.now();
    const rtl = A.lang() === "ar";
    const prevFocus = document.activeElement;
    const ov = h("div", { class: "cine", role: "dialog", "aria-modal": "true", "aria-label": t("nav_present") + ": " + L(u.title), style: "--uc:" + u.color });
    ov.innerHTML = `
      <div class="cine-top">
        <span class="cine-badge">${esc(u.badge)}</span>
        <div class="cine-tt"><b>${esc(L(u.title))}</b><small data-c-chapter></small></div>
        <span class="cine-sp"></span>
        <button type="button" class="cine-ib" data-c="chapters" aria-haspopup="true" title="${esc(t("cnChapters"))} (C)">${ico("layers")}<span>${esc(t("cnChapters"))}</span></button>
        <button type="button" class="cine-ib" data-c="spot" title="${esc(t("cnSpot"))} (L)">${ico("target")}</button>
        <button type="button" class="cine-ib" data-c="black" title="${esc(t("cnBlack"))} (B)">${ico("moon")}</button>
        <button type="button" class="cine-ib" data-c="help" title="${esc(t("cnHelp"))} (?)">${ico("info")}</button>
        <button type="button" class="cine-ib" data-c="fs" title="${esc(t("prFull"))} (F)">${ico("full")}</button>
        <button type="button" class="cine-ib" data-c="close" title="${esc(t("prExit"))} (Esc)">${ico("x")}</button>
      </div>
      <div class="cine-view"><div class="cine-frame" data-c-frame></div></div>
      <div class="cine-bot">
        <button type="button" class="cine-pb" data-c="prev" aria-label="${esc(t("prev"))}">${ico(rtl ? "next" : "prev")}</button>
        <button type="button" class="cine-pb main" data-c="play" aria-label="${esc(t("cnPlay"))}">${ico("play")}</button>
        <button type="button" class="cine-pb" data-c="next" aria-label="${esc(t("next"))}">${ico(rtl ? "prev" : "next")}</button>
        <div class="cine-scrub" data-c-scrub role="slider" tabindex="0" aria-label="${esc(t("cnProgress"))}"><div class="cine-track"><i data-c-fill></i></div><div class="cine-marks" data-c-marks></div><div class="cine-tip" data-c-tip hidden></div></div>
        <span class="cine-time num" dir="ltr" data-c-time></span>
        <span class="cine-count num" dir="ltr" data-c-count></span>
      </div>
      <div class="cine-screen" data-c-screen hidden></div>
      <div class="cine-spot" data-c-spotlight hidden></div>
      <div class="cine-jump num" data-c-jump hidden></div>
      <div class="cine-menu" data-c-menu hidden></div>
      <div class="cine-help" data-c-help hidden></div>`;
    document.body.append(ov);
    document.body.style.overflow = "hidden";
    const q = (s) => ov.querySelector(s);
    const frame = q("[data-c-frame]");

    // the frame is laid out at 1600 × 900 and scaled to the screen, so a slide looks the same on a laptop and a projector
    function fit() {
      const v = q(".cine-view").getBoundingClientRect();
      const z = Math.max(0.25, Math.min(v.width / 1600, v.height / 900));
      frame.style.zoom = z;
    }
    const ro = "ResizeObserver" in window ? new ResizeObserver(fit) : null;
    ro ? ro.observe(q(".cine-view")) : addEventListener("resize", fit);

    // chapter marks on the scrubber: one segment per lesson
    function marks() {
      const total = plan.steps.length;
      const firsts = plan.lessons.map((l) => plan.steps.findIndex((s) => plan.blocks[s.b].l === l));
      q("[data-c-marks]").innerHTML = firsts.map((f, i) => `<button type="button" class="cine-mark" data-go="${f}" style="inset-inline-start:${(f / total) * 100}%" aria-label="${esc(t("lessonN", { n: i + 1 }) + ": " + L(plan.lessons[i].title))}"><span>${i + 1}</span></button>`).join("");
    }

    function lessonCard(l, ch) {
      return `<div class="cine-card lesson" data-n="${ch + 1}"><span class="cine-k">${esc(t("lessonN", { n: ch + 1 }))} · ${esc(L(u.short))}</span><h1>${esc(L(l.title))}</h1><p>${esc(L(l.sum))}</p></div>`;
    }
    function render(step, dir) {
      const s = plan.steps[step], b = plan.blocks[s.b];
      const same = cur.b === s.b && api;
      if (!same) {
        api && api.destroy && api.destroy(); api = null;
        frame.className = "cine-frame k-" + b.kind + (dir < 0 ? " back" : "");
        frame.innerHTML = "";
        if (b.kind === "title") frame.innerHTML = `<div class="cine-card big"><span class="cine-k">${esc(t("unitN", { n: u.n }))}</span><h1>${esc(L(u.title))}</h1><p>${A.inline(L(u.big))}</p><div class="cine-chain">${u.review.chain.map((x) => `<span>${esc(L(x))}</span>`).join(`<i>${rtl ? "←" : "→"}</i>`)}</div></div>`;
        else if (b.kind === "lesson") frame.innerHTML = lessonCard(b.l, b.ch);
        else if (b.kind === "deck") { const host = h("section", {}); frame.append(host); api = A.mountDeck(host, b.deck, { present: true, start: s.k }); }
        else if (b.kind === "scene") {
          const box = h("div", { class: "cine-sc" }); frame.append(box);
          api = A.mountScene(box, b.sc.id, { autoplay: false, initialStage: s.k });
          if (dir > 0 && s.k === 0 && api.playStage) api.playStage(0);
        } else if (b.kind === "ask") frame.innerHTML = askHtml(b.q, s.k === 1);
        else frame.innerHTML = `<div class="cine-card big"><span class="cine-k">${esc(t("nav_review"))}</span><h1>${esc(L(u.title))}</h1><ul class="cine-pts">${u.review.points.slice(0, 5).map((x) => `<li>${A.inline(L(x))}</li>`).join("")}</ul>${u.review.remember ? `<p class="cine-rem">${A.inline(L(u.review.remember))}</p>` : ""}</div>`;
        fit();
      } else if (b.kind === "deck") api.go(s.k);
      else if (b.kind === "scene") { dir > 0 && api.playStage ? api.playStage(s.k) : api.goto(s.k); }
      if (b.kind === "ask" && same) frame.innerHTML = askHtml(b.q, s.k === 1);
      cur = { b: s.b, k: s.k };
      pos = step;
      S.patch("presentPos", uid, { l: b.l ? b.l.id : null, kind: b.kind, k: s.k });
      // chrome: chapter, counter, progress
      q("[data-c-chapter]").textContent = b.l ? t("lessonN", { n: b.ch + 1 }) + " · " + L(b.l.title) : "";
      q("[data-c-count]").textContent = `${step + 1} / ${plan.steps.length}`;
      q("[data-c-fill]").style.width = ((step + 1) / plan.steps.length) * 100 + "%";
      q("[data-c-scrub]").setAttribute("aria-valuenow", step + 1); q("[data-c-scrub]").setAttribute("aria-valuemax", plan.steps.length);
      ov.querySelectorAll(".cine-mark").forEach((m) => m.classList.toggle("on", Number(m.dataset.go) <= step));
      q('[data-c="prev"]').disabled = step === 0; q('[data-c="next"]').disabled = step === plan.steps.length - 1;
      if (playing) schedule();
    }
    function askHtml(qq, shown) {
      return `<div class="cine-card ask"><span class="cine-k">${ico("users")} ${esc(t("prAsk"))}</span><h1>${A.inline(L(qq.q))}</h1>
        <ol class="cine-opts" type="A">${qq.opts.map((o, k) => `<li class="${shown && k === qq.ans ? "ok" : shown ? "dim" : ""}">${A.inline(L(o))}</li>`).join("")}</ol>
        ${shown ? `<div class="cine-why">${A.inline(L(qq.explain))}</div>` : `<p class="cine-hint">${esc(t("cnRevealHint"))}</p>`}</div>`;
    }
    // auto-advance ("play"): each step waits as long as it needs to be read or animated
    function dwell() {
      const s = plan.steps[pos], b = plan.blocks[s.b];
      if (b.kind === "deck") { const x = b.deck.slides[s.k]; return Math.min(16, Math.max(8, (L(x.title) + L(x.answer) + L(x.idea)).length / 9)) * 1000; }
      if (b.kind === "scene") return ((b.sc.stages[s.k].d || 4) + 2.5) * 1000;
      if (b.kind === "ask") return s.k === 0 ? 12000 : 9000;
      return 6000;
    }
    function schedule() { clearTimeout(playT); playT = setTimeout(() => { if (pos < plan.steps.length - 1) go(pos + 1); else setPlay(false); }, dwell()); }
    function setPlay(on) {
      playing = on; clearTimeout(playT);
      const b = q('[data-c="play"]'); b.innerHTML = ico(on ? "pause" : "play"); b.setAttribute("aria-label", t(on ? "cnPause" : "cnPlay"));
      ov.classList.toggle("is-playing", on);
      if (on) schedule();
    }

    function go(step) {
      step = Math.max(0, Math.min(plan.steps.length - 1, step));
      if (step === pos && cur.b >= 0) return;
      const dir = step > pos ? 1 : -1;
      setScreen("");
      render(step, dir);
    }
    const next = () => go(pos + 1), prev = () => go(pos - 1);

    function setScreen(kind) { screen = screen === kind ? "" : kind; const el = q("[data-c-screen]"); el.hidden = !screen; el.className = "cine-screen " + screen; if (screen) setPlay(false); }
    function toggleSpot() { spot = !spot; q("[data-c-spotlight]").hidden = !spot; q('[data-c="spot"]').setAttribute("aria-pressed", spot); }
    function savePref() { S.set("presenter", pref); }
    function fullscreen(on) {
      try {
        const is = !!document.fullscreenElement;
        if (on === undefined) on = !is;
        if (on && !is) ov.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
        else if (!on && is) document.exitFullscreen().catch(() => {});
      } catch (e) { /* fullscreen unavailable */ }
    }
    function menu(open) {
      const m = q("[data-c-menu]");
      if (open === undefined) open = m.hidden;
      m.hidden = !open;
      if (!open) return;
      m.innerHTML = `<b>${esc(t("cnChapters"))}</b><ol>${plan.lessons.map((l, i) => { const f = plan.steps.findIndex((s) => plan.blocks[s.b].l === l); const on = plan.blocks[plan.steps[pos].b].l === l; return `<li><button type="button" data-go="${f}" class="${on ? "on" : ""}"><span class="num">${i + 1}</span>${esc(L(l.title))}</button></li>`; }).join("")}</ol>
        <label class="cine-opt"><input type="checkbox" data-c-qs ${pref.questions ? "checked" : ""}> ${esc(t("cnQuestions"))}</label>`;
      m.querySelectorAll("[data-go]").forEach((x) => (x.onclick = () => { menu(false); go(Number(x.dataset.go)); }));
      q("[data-c-qs]").onchange = (e) => {   // rebuild the plan and stay on the same slide (or its lesson, if a question was removed)
        const s0 = plan.steps[pos], b0 = plan.blocks[s0.b], here = { l: b0.l ? b0.l.id : null, kind: b0.kind, k: s0.k };
        pref.questions = e.target.checked; savePref(); plan = buildSlides(u, pref); marks();
        cur = { b: -1 }; pos = -1; render(Math.max(0, findPlace(here)), 1);
      };
      (m.querySelector("button.on") || m.querySelector("button")).focus();
    }
    function help(open) {
      const hp = q("[data-c-help]");
      if (open === undefined) open = hp.hidden;
      hp.hidden = !open;
      if (open) hp.innerHTML = `<b>${esc(t("cnHelp"))}</b><dl>${A.ui.cnKeys ? L(A.ui.cnKeys).split("|").map((r) => { const [k, d] = r.split("="); return `<dt>${k.split("+").map((x) => `<kbd>${esc(x.trim())}</kbd>`).join(" ")}</dt><dd>${esc(d)}</dd>`; }).join("") : ""}</dl><p>${esc(t("cnRemote"))}</p>`;
    }

    // controls
    ov.addEventListener("click", (e) => {
      const b = e.target.closest("[data-c],[data-go]");
      if (!b) return;
      if (b.dataset.go != null && !b.closest("[data-c-menu]")) return go(Number(b.dataset.go));
      const c = b.dataset.c;
      if (c === "prev") prev(); else if (c === "next") next(); else if (c === "play") setPlay(!playing);
      else if (c === "fs") fullscreen(); else if (c === "close") close();
      else if (c === "spot") toggleSpot(); else if (c === "black") setScreen("black"); else if (c === "help") help(); else if (c === "chapters") menu();
    });
    const scrub = q("[data-c-scrub]"), tip = q("[data-c-tip]");
    const stepAt = (x) => { const r = scrub.getBoundingClientRect(); let f = (x - r.left) / r.width; if (rtl) f = 1 - f; return Math.max(0, Math.min(plan.steps.length - 1, Math.floor(f * plan.steps.length))); };
    scrub.addEventListener("pointerdown", (e) => { if (e.target.closest(".cine-mark")) return; go(stepAt(e.clientX)); });
    scrub.addEventListener("pointermove", (e) => { const s = plan.steps[stepAt(e.clientX)], b = plan.blocks[s.b]; tip.hidden = false; tip.textContent = b.l ? `${t("lessonN", { n: b.ch + 1 })} · ${L(b.l.title)}` : L(u.short); const r = scrub.getBoundingClientRect(); tip.style.left = Math.max(0, Math.min(r.width - 220, e.clientX - r.left - 110)) + "px"; });
    scrub.addEventListener("pointerleave", () => (tip.hidden = true));
    scrub.addEventListener("keydown", (e) => { if (e.key === "Home") { e.preventDefault(); go(0); } else if (e.key === "End") { e.preventDefault(); go(plan.steps.length - 1); } });
    ov.addEventListener("pointermove", (e) => {
      wake();
      if (spot) { const sp = q("[data-c-spotlight]"); sp.style.setProperty("--x", e.clientX + "px"); sp.style.setProperty("--y", e.clientY + "px"); }
    });
    // swipe on touch screens
    let sx = 0, sy = 0, sdown = false;
    q(".cine-view").addEventListener("pointerdown", (e) => { if (e.pointerType === "mouse") return; sdown = true; sx = e.clientX; sy = e.clientY; });
    q(".cine-view").addEventListener("pointerup", (e) => { if (!sdown) return; sdown = false; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) (rtl ? dx > 0 : dx < 0) ? next() : prev(); });

    // idle: hide the controls and the cursor after a few quiet seconds
    function wake() { ov.classList.remove("idle"); clearTimeout(idleT); idleT = setTimeout(() => { if (q("[data-c-menu]").hidden && q("[data-c-help]").hidden) ov.classList.add("idle"); }, 2600); }
    // the session clock (since opening) and the time of day
    function clock() { const s = Math.floor((Date.now() - t0) / 1000), mm = String(Math.floor(s / 60)).padStart(2, "0"), ss = String(s % 60).padStart(2, "0"); const now = new Date(); q("[data-c-time]").textContent = `${mm}:${ss} · ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`; }
    clockT = setInterval(clock, 1000); clock();
    async function keepAwake() { try { if ("wakeLock" in navigator && !document.hidden) lock = await navigator.wakeLock.request("screen"); } catch (e) { lock = null; } }
    const vis = () => { if (!document.hidden) keepAwake(); };
    document.addEventListener("visibilitychange", vis); keepAwake();

    // keys: arrows follow the reading direction; presenter remotes send PageUp/PageDown, B or "." (black), F5/Esc
    function key(e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const k = e.key, low = k.length === 1 ? k.toLowerCase() : k;
      const fwd = rtl ? "ArrowLeft" : "ArrowRight", back = rtl ? "ArrowRight" : "ArrowLeft";
      const inMenu = e.target.closest && e.target.closest("[data-c-menu]");
      let done = true;
      wake();
      if (screen && !["Shift", "Control", "Alt", "Meta", "CapsLock"].includes(k)) { setScreen(screen); e.preventDefault(); e.stopPropagation(); return; }   // a blank screen: any key only brings the picture back
      if (/^[0-9]$/.test(k)) { jump += k; clearTimeout(jumpT); const j = q("[data-c-jump]"); j.hidden = false; j.textContent = t("cnGoTo", { n: jump }); jumpT = setTimeout(() => { jump = ""; j.hidden = true; }, 2200); }
      else if (k === "Enter" && jump) { const n = Number(jump); jump = ""; q("[data-c-jump]").hidden = true; go(n - 1); }
      else if (k === "Escape") { if (!q("[data-c-menu]").hidden) menu(false); else if (!q("[data-c-help]").hidden) help(false); else if (screen) setScreen(screen); else if (spot) toggleSpot(); else if (!document.fullscreenElement) close(); }
      else if (inMenu && (k === "Enter" || k === " " || k === "ArrowUp" || k === "ArrowDown" || k === "Tab")) done = false;
      else if (k === "PageDown" || k === fwd || k === "ArrowDown" || (k === " " && !(e.target.closest && e.target.closest("button"))) || k === "Enter") next();
      else if (k === "PageUp" || k === back || k === "ArrowUp" || k === "Backspace") prev();
      else if (k === "Home") go(0); else if (k === "End") go(plan.steps.length - 1);
      else if (low === "b" || k === ".") setScreen("black");
      else if (low === "w" || k === ",") setScreen("white");
      else if (k === "F5") fullscreen(true);
      else if (low === "f") fullscreen();
      else if (low === "p" || low === "k") setPlay(!playing);
      else if (low === "l") toggleSpot();
      else if (low === "c") menu(); else if (k === "?" || low === "h") help();
      else done = false;
      if (done) { e.preventDefault(); e.stopPropagation(); }
    }

    function close() {
      setPlay(false); clearInterval(clockT); clearTimeout(idleT);
      api && api.destroy && api.destroy();
      ro && ro.disconnect(); removeEventListener("resize", fit);
      removeEventListener("keydown", key, true);
      document.removeEventListener("visibilitychange", vis);
      try { lock && lock.release(); } catch (e) { /* already released */ }
      try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) { /* not fullscreen */ }
      ov.remove(); document.body.style.overflow = "";
      prevFocus && prevFocus.focus && prevFocus.focus();
    }
    addEventListener("keydown", key, true);
    A.onLeave(() => { if (document.body.contains(ov)) close(); });
    q('[data-c="spot"]').setAttribute("aria-pressed", false);
    marks();
    render(pos, 1);
    wake();
    q('[data-c="next"]').focus({ preventScroll: true });
    return { go, next, prev, close, get pos() { return pos; }, get total() { return plan.steps.length; } };
  }
  A.openPresenter = openPresenter;
})(window.ACADEMY);
