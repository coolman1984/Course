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
      const b = h("button", { type: "button", class: "unit-card", style: "--uc:" + u.color + ";text-align:start;font:inherit;cursor:pointer", html: `<span class="ub">${esc(u.badge)}</span><h3>${esc(L(u.title))}</h3><p>${esc(t("prSlidesN", { n: buildSlides(u).length }))}</p>` });
      b.onclick = () => openPresenter(u.id);
      prl.append(b);
    }
    if (uid && A.unitById[uid]) setTimeout(() => openPresenter(uid), 0);
  });

  function buildSlides(u) {
    const slides = [{ kind: "title", u }];
    slides.push({ kind: "big", u });
    for (const l of A.lessons.filter((x) => x.unit === u.id)) {
      slides.push({ kind: "lesson", l });
      if (l.scene && A.sceneById[l.scene]) slides.push({ kind: "scene", l });
      const q = A.quiz.find((x) => x.lesson === l.id && x.type !== "order");
      if (q) slides.push({ kind: "ask", l, q });
    }
    slides.push({ kind: "review", u });
    return slides;
  }
  function openPresenter(uid) {
    const u = A.unitById[uid];
    const slides = buildSlides(u);
    let i = 0, reveal = false, notesOn = innerWidth > 1024, sceneApi = null;
    const prevFocus = document.activeElement;
    const ov = h("div", { class: "present", role: "dialog", "aria-modal": "true", "aria-label": t("nav_present") + ": " + L(u.title) });
    document.body.append(ov);
    document.body.style.overflow = "hidden";
    function notesFor(s) {
      const pick = (l, keys) => keys.flatMap((k) => (l.levels && l.levels[k]) || []).slice(0, 3).map((x) => A.rich(L(x))).join("");
      if (s.kind === "lesson") return `<b>${esc(t("prNoteTeach"))}</b><div class="rt" style="font-size:14.5px">${pick(s.l, ["simple", "practice"])}</div>`;
      if (s.kind === "scene") return `<b>${esc(t("prNoteScene"))}</b><p>${esc(t("prNoteSceneBody"))}</p>`;
      if (s.kind === "ask") return `<b>${esc(t("prNoteAsk"))}</b><p>${A.inline(L(s.q.explain))}</p>`;
      if (s.kind === "big" || s.kind === "title") return `<b>${esc(t("prNoteOpen"))}</b><p>${A.inline(L(s.u.sum))}</p>`;
      return `<b>${esc(t("prNoteClose"))}</b><p>${A.inline(L(s.u.review.remember || s.u.big))}</p>`;
    }
    function draw() {
      sceneApi && sceneApi.destroy(); sceneApi = null;
      const s = slides[i];
      const rtl = A.lang() === "ar";
      ov.innerHTML = `
        <div class="pr-top"><span class="chip" style="background:${u.color};color:#fff;border:0">${esc(u.badge)}</span><b>${esc(L(u.title))}</b><span class="bar-spacer" style="flex:1"></span>
          <button type="button" class="ibtn" id="pr-notes" aria-pressed="${notesOn}">${ico("note")}<span class="lbl">${esc(t("prNotes"))}</span></button>
          <button type="button" class="ibtn" id="pr-fs" aria-label="${esc(t("prFull"))}">${ico("full")}</button>
          <button type="button" class="ibtn" id="pr-x" aria-label="${esc(t("prExit"))}">${ico("x")}<span class="lbl">${esc(t("prExit"))}</span></button></div>
        <div class="pr-stage ${notesOn ? "notes" : ""}"><div class="pr-slide" id="pr-s"></div><aside class="pr-notes" ${notesOn ? "" : "hidden"} aria-label="${esc(t("prNotes"))}">${notesFor(s)}</aside></div>
        <div class="pr-bot"><button type="button" class="btn sm" id="pr-p">${ico(rtl ? "next" : "prev")}${esc(t("prev"))}</button><div class="qprog"><i style="width:${((i + 1) / slides.length) * 100}%"></i></div><span class="num small muted">${i + 1} / ${slides.length}</span><button type="button" class="btn sm pri" id="pr-n">${esc(t("next"))}${ico(rtl ? "prev" : "next")}</button></div>`;
      const box = ov.querySelector("#pr-s");
      if (s.kind === "title") box.innerHTML = `<span class="eyebrow">${esc(t("unitN", { n: u.n }))} · ${esc(t("pagesRange", { a: u.pages[0], b: u.pages[1] }))}</span><h1>${esc(L(u.title))}</h1><p class="lead">${esc(L(u.sum))}</p>`;
      else if (s.kind === "big") box.innerHTML = `<span class="eyebrow">${esc(t("bigIdea"))}</span><h1 style="font-size:clamp(1.6rem,1rem + 2.6vw,3rem)">${A.inline(L(u.big))}</h1>`;
      else if (s.kind === "lesson") box.innerHTML = `<span class="eyebrow">${A.pageChips(s.l.pages)}</span><h1>${esc(L(s.l.title))}</h1><p class="lead">${esc(L(s.l.sum))}</p><ul class="pr-points">${(s.l.book || []).slice(0, 5).map((b) => `<li>${A.inline(L(b))}</li>`).join("")}</ul>`;
      else if (s.kind === "scene") { box.innerHTML = `<h2>${esc(L(s.l.title))}</h2>`; sceneApi = A.mountScene(box, s.l.scene, { autoplay: false, initialStage: 0 }); }
      else if (s.kind === "ask") {
        const q = s.q;
        box.innerHTML = `<span class="eyebrow">${ico("users")} ${esc(t("prAsk"))}</span><h1 style="font-size:clamp(1.4rem,1rem + 2vw,2.4rem)">${A.inline(L(q.q))}</h1>
          <ol class="pr-points" type="A">${q.opts.map((o, k) => `<li style="${reveal && k === q.ans ? "color:var(--mint);font-weight:700" : ""}">${A.inline(L(o))}</li>`).join("")}</ol>
          ${reveal ? `<div class="note ok">${ico("check")}<div>${A.inline(L(q.explain))}</div></div>` : `<button type="button" class="btn" id="pr-r">${ico("eye")}${esc(t("prReveal"))} <kbd>R</kbd></button>`}`;
        const rb = box.querySelector("#pr-r"); if (rb) rb.onclick = () => { reveal = true; draw(); };
      } else box.innerHTML = `<span class="eyebrow">${esc(t("nav_review"))}</span><h1>${esc(L(u.title))}</h1><div class="journey">${u.review.chain.map((x, k) => (k ? `<span class="ar" style="border:0;background:none">${rtl ? "←" : "→"}</span>` : "") + `<span style="font-size:1.1rem">${esc(L(x))}</span>`).join("")}</div>${u.review.remember ? `<div class="note sp">${ico("star")}<div>${A.inline(L(u.review.remember))}</div></div>` : ""}`;
      ov.querySelector("#pr-p").disabled = i === 0;
      ov.querySelector("#pr-n").disabled = i === slides.length - 1;
      ov.querySelector("#pr-p").onclick = prev;
      ov.querySelector("#pr-n").onclick = next;
      ov.querySelector("#pr-x").onclick = close;
      ov.querySelector("#pr-notes").onclick = () => { notesOn = !notesOn; draw(); };
      ov.querySelector("#pr-fs").onclick = () => { try { document.fullscreenElement ? document.exitFullscreen() : ov.requestFullscreen(); } catch (e) {} };
      ov.querySelector("#pr-n").focus({ preventScroll: true });
    }
    function next() {
      if (sceneApi && sceneApi.stage < sceneApi.count - 1) { sceneApi.next(); return; }
      if (i < slides.length - 1) { i++; reveal = false; draw(); }
    }
    function prev() {
      if (sceneApi && sceneApi.stage > 0) { sceneApi.prev(); return; }
      if (i > 0) { i--; reveal = false; draw(); }
    }
    function key(e) {
      const rtl = A.lang() === "ar";
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === (rtl ? "ArrowLeft" : "ArrowRight") || e.key === "PageDown" || (e.key === " " && e.target.tagName !== "BUTTON")) { e.preventDefault(); next(); }
      else if (e.key === (rtl ? "ArrowRight" : "ArrowLeft") || e.key === "PageUp") { e.preventDefault(); prev(); }
      else if (e.key.toLowerCase() === "n") { notesOn = !notesOn; draw(); }
      else if (e.key.toLowerCase() === "r" && slides[i].kind === "ask") { reveal = true; draw(); }
      else if (e.key.toLowerCase() === "f") { try { document.fullscreenElement ? document.exitFullscreen() : ov.requestFullscreen(); } catch (er) {} }
    }
    function close() {
      sceneApi && sceneApi.destroy();
      removeEventListener("keydown", key, true);
      try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {}
      ov.remove(); document.body.style.overflow = "";
      prevFocus && prevFocus.focus && prevFocus.focus();
    }
    addEventListener("keydown", key, true);
    A.onLeave(() => { if (document.body.contains(ov)) close(); });
    draw();
  }
  A.openPresenter = openPresenter;
})(window.ACADEMY);
