/* Scene engine — explains an idea in stages.
   Pattern borrowed from promo-video-generator: a scene is a pure function of time t, so play, pause,
   scrub, step and speed are exact and repeatable. Elements: box, text, arrow, meter.
   Box keyframes (mv) give assembly / decomposition; stage viewBoxes give zoom; arrows with flow dots give
   information flow; hi[] gives emphasis; meters give cause → effect. Arabic mirrors the x axis. */
"use strict";
(function (A) {
  const NS = "http://www.w3.org/2000/svg";
  const XH = "http://www.w3.org/1999/xhtml";
  const FADE = 0.6, MOVE = 0.9, DRAW = 0.7, VBT = 1.0;
  const ease = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const lerp = (a, b, k) => a + (b - a) * k;
  const cl = (x) => Math.max(0, Math.min(1, x));
  const s = (tag, attrs) => { const e = document.createElementNS(NS, tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  function mount(host, id, opts = {}) {
    const def = A.sceneById[id];
    if (!def) return null;
    const { h, ico, L, t: tr, esc } = A;
    const rtl = A.lang() === "ar" && def.mirror !== false;
    const VB = def.vb || [0, 0, 800, 450];
    const W = VB[2];
    const stages = def.stages;
    const T = []; let acc = 0;
    for (const st of stages) { T.push(acc); acc += st.d || 4; }
    const total = acc;
    const rm = A.reduceMotion();

    const root = h("section", { class: "scene", "aria-label": tr("sceneAria", { t: L(def.title) }) });
    const top = h("div", { class: "scene-top", html: `<h3>${ico("film")}${esc(L(def.title))}</h3><span class="chip vi tag">${esc(tr("sceneTag"))}</span>` });
    const wrap = h("div", { class: "stage-wrap", tabindex: "0", "aria-label": tr("sceneKeys") });
    const svg = s("svg", { class: "stage-svg", viewBox: VB.join(" "), role: "img", "aria-label": L(def.title), preserveAspectRatio: "xMidYMid meet" });
    wrap.append(svg);
    const info = h("div", { class: "sinfo", hidden: true });
    wrap.append(info);
    const cap = h("div", { class: "scap", "aria-live": "polite" });
    const ctl = h("div", { class: "sctl" });
    root.append(top, wrap, cap, ctl);
    host.append(root);

    /* --- controls --- */
    const bRestart = h("button", { class: "ibtn", type: "button", "aria-label": tr("sRestart"), title: tr("sRestart"), html: ico("restart") });
    const bPrev = h("button", { class: "ibtn", type: "button", "aria-label": tr("sPrev"), title: tr("sPrev"), html: ico(rtl ? "next" : "prev") });
    const bPlay = h("button", { class: "ibtn", type: "button", "aria-label": tr("sPlay"), title: tr("sPlay"), html: ico("play") });
    const bNext = h("button", { class: "ibtn", type: "button", "aria-label": tr("sNext"), title: tr("sNext"), html: ico(rtl ? "prev" : "next") });
    const dots = h("div", { class: "sdots", role: "group", "aria-label": tr("sStages") });
    stages.forEach((st, i) => dots.append(h("button", { type: "button", "aria-label": tr("sStageN", { n: i + 1 }) + ": " + L(st.t), title: L(st.t), "data-i": i }, String(i + 1))));
    const scrub = h("input", { type: "range", class: "scrub", min: "0", max: "1000", value: "0", "aria-label": tr("sScrub") });
    const speed = h("select", { class: "speed", "aria-label": tr("sSpeed") }, ...[0.5, 1, 1.5, 2].map((v) => h("option", { value: v, selected: v === 1 || null }, v + "×")));
    const bFull = h("button", { class: "ibtn", type: "button", "aria-label": tr("sFull"), title: tr("sFull"), html: ico("full") + `<span class="lbl">${esc(tr("sFullShort"))}</span>` });
    ctl.append(bRestart, bPrev, bPlay, bNext, dots, scrub, speed, bFull);

    /* --- build svg --- */
    const defs = s("defs");
    svg.append(defs);
    const gArrows = s("g"), gNodes = s("g"), gTop = s("g");
    svg.append(gArrows, gNodes, gTop);
    const nodes = {};
    const mx = (x, w = 0) => (rtl ? W - x - w : x);

    function foLabel(w, hh, html, cls) {
      const fo = s("foreignObject", { x: 0, y: 0, width: w, height: hh });
      const div = document.createElementNS(XH, "div");
      div.setAttribute("class", cls);
      div.innerHTML = html;
      fo.append(div);
      return fo;
    }
    for (const el of def.els) {
      if (el.k === "box" || el.k === "text" || el.k === "meter") {
        const w = el.w || 140, hh = el.h || 64;
        const g = s("g", { class: (el.k === "box" ? "sv-node " : "") + "tone-" + (el.tone || "ink") });
        const inner = s("g");
        g.append(inner);
        if (el.k === "box") {
          const shape = el.shape || "rect";
          let glow, shp;
          if (shape === "circle") {
            const r = Math.min(w, hh) / 2;
            glow = s("circle", { class: "sv-glow", cx: w / 2, cy: hh / 2, r: r + 6 });
            shp = s("circle", { class: "sv-shape", cx: w / 2, cy: hh / 2, r });
          } else {
            const rr = shape === "pill" ? hh / 2 : el.r ?? 14;
            glow = s("rect", { class: "sv-glow", x: -5, y: -5, width: w + 10, height: hh + 10, rx: rr + 5 });
            shp = s("rect", { class: "sv-shape", x: 0, y: 0, width: w, height: hh, rx: rr });
          }
          inner.append(glow, shp);
          const icon = el.ico ? `<span class="ico">${ico(el.ico)}</span>` : "";
          inner.append(foLabel(w, hh, `${icon}<b>${esc(L(el.l))}</b>${el.s2 ? `<small>${esc(L(el.s2))}</small>` : ""}`, "sv-lbl"));
          g.setAttribute("tabindex", "0");
          g.setAttribute("role", "button");
          g.setAttribute("aria-label", L(el.l) + (el.info ? ". " + L(el.info) : ""));
          const show = () => showInfo(el);
          g.addEventListener("click", show);
          g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); show(); } });
          nodes[el.id] = { el, g, inner, glow, w, hh };
        } else if (el.k === "text") {
          const size = el.size || 18;
          inner.append(foLabel(w, hh, `<span style="font-size:${size}px;font-weight:${el.weight || 650};color:var(${el.color || "--ink"})">${esc(L(el.l))}</span>`, "sv-txt"));
          nodes[el.id] = { el, g, inner, w, hh };
        } else {
          const bg = s("rect", { class: "sv-bar-bg", x: 0, y: 0, width: w, height: hh, rx: hh / 2 });
          const bar = s("rect", { class: "sv-bar", x: 0, y: 0, width: 0, height: hh, rx: hh / 2 });
          inner.append(bg, bar);
          if (el.l) {
            const lab = foLabel(w, 22, `<span>${esc(L(el.l))}</span>`, "sv-alabel");
            lab.setAttribute("y", -24);
            inner.append(lab);
          }
          nodes[el.id] = { el, g, inner, bar, w, hh };
        }
        (el.k === "box" ? gNodes : gTop).append(g);
      }
    }
    const arrows = [];
    for (const el of def.els) if (el.k === "arrow") {
      const g = s("g");
      const path = s("path", { class: "sv-arrow", pathLength: "1", "stroke-dasharray": "1", "stroke-dashoffset": "1" });
      const head = s("path", { class: "sv-head", d: "M0 0 L-10 -5 L-10 5 Z" });
      g.append(path, head);
      const flows = [0, 1, 2].map(() => { const c = s("circle", { class: "sv-flow", r: 4, opacity: 0 }); g.append(c); return c; });
      let lab = null;
      if (el.l) { lab = foLabel(130, 34, `<span>${esc(L(el.l))}</span>`, "sv-alabel"); g.append(lab); }
      gArrows.append(g);
      arrows.push({ el, g, path, head, flows, lab });
    }

    /* --- per-node position at time t --- */
    function stageAt(tt) { let i = 0; for (let k = 0; k < T.length; k++) if (tt >= T[k] - 1e-6) i = k; return i; }
    function posOf(n, tt) {
      const el = n.el;
      const keys = [[-1, el.x, el.y]];
      if (el.mv) for (const k of Object.keys(el.mv).map(Number).sort((a, b) => a - b)) keys.push([k, el.mv[k][0], el.mv[k][1]]);
      let idx = 0;
      for (let k = 1; k < keys.length; k++) if (tt >= T[keys[k][0]]) idx = k;
      let x = keys[idx][1], y = keys[idx][2];
      if (idx > 0) {
        const p = ease(cl((tt - T[keys[idx][0]]) / (rm ? 0.001 : MOVE)));
        x = lerp(keys[idx - 1][1], x, p); y = lerp(keys[idx - 1][2], y, p);
      }
      return [mx(x, n.w), y];
    }
    function alphaOf(el, tt) {
      const tin = T[el.in || 0] + (el.delay || 0);
      let a = ease(cl((tt - tin) / (rm ? 0.001 : FADE)));
      if (el.in === 0 && !el.delay && tt <= 0.0001) a = opts.startVisible ? 1 : a;
      if (el.out != null) a *= 1 - ease(cl((tt - T[el.out]) / (rm ? 0.001 : 0.4)));
      return a;
    }
    function edge(n, p, toward) {
      const cx = p[0] + n.w / 2, cy = p[1] + n.hh / 2;
      const dx = toward[0] - cx, dy = toward[1] - cy;
      if (!dx && !dy) return [cx, cy];
      if ((n.el.shape || "rect") === "circle") {
        const r = Math.min(n.w, n.hh) / 2 + 4, d = Math.hypot(dx, dy);
        return [cx + (dx / d) * r, cy + (dy / d) * r];
      }
      const hw = n.w / 2 + 4, hh = n.hh / 2 + 4;
      const k = Math.min(Math.abs(dx) > 1e-6 ? hw / Math.abs(dx) : 1e9, Math.abs(dy) > 1e-6 ? hh / Math.abs(dy) : 1e9);
      return [cx + dx * k, cy + dy * k];
    }

    let tNow = 0, playing = false, last = 0, raf = 0, curStage = -1, full = false, built = true;
    function render(tt) {
      const st = stageAt(tt);
      // viewBox (zoom)
      let vb = VB;
      if (!full) {
        const target = stages[st].vb || VB;
        const prev = st > 0 ? stages[st - 1].vb || VB : target;
        const k = ease(cl((tt - T[st]) / (rm ? 0.001 : VBT)));
        vb = target.map((v, i) => lerp(prev[i], v, k));
        if (rtl) vb = [W - vb[0] - vb[2], vb[1], vb[2], vb[3]];
      }
      svg.setAttribute("viewBox", vb.map((v) => v.toFixed(1)).join(" "));
      const pos = {};
      for (const id in nodes) {
        const n = nodes[id];
        const a = alphaOf(n.el, tt);
        const p = posOf(n, tt);
        pos[id] = p;
        const sc = n.el.k === "box" ? 0.92 + 0.08 * a : 1;
        n.g.setAttribute("transform", `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`);
        n.inner.setAttribute("transform", `translate(${(n.w / 2) * (1 - sc)} ${(n.hh / 2) * (1 - sc)}) scale(${sc.toFixed(3)})`);
        n.g.style.opacity = a.toFixed(3);
        n.g.style.pointerEvents = a > 0.5 ? "" : "none";
        if (n.el.k === "box") {
          n.g.setAttribute("tabindex", a > 0.5 ? "0" : "-1");
          const hi = n.el.hi && n.el.hi.includes(st);
          n.glow.style.opacity = hi ? (rm ? 0.7 : (0.45 + 0.35 * Math.sin(tt * 4)).toFixed(3)) : 0;
        }
        if (n.el.k === "meter") {
          const vals = n.el.vals;
          const cur = vals[Math.min(st, vals.length - 1)], prv = st > 0 ? vals[Math.min(st - 1, vals.length - 1)] : 0;
          const v = lerp(prv, cur, ease(cl((tt - T[st]) / (rm ? 0.001 : 0.8))));
          const bw = Math.max(0, n.w * v);
          n.bar.setAttribute("width", bw.toFixed(1));
          if (rtl) n.bar.setAttribute("x", (n.w - bw).toFixed(1));
        }
      }
      for (const ar of arrows) {
        const A1 = nodes[ar.el.from], B1 = nodes[ar.el.to];
        if (!A1 || !B1) continue;
        const pa = pos[ar.el.from], pb = pos[ar.el.to];
        const ca = [pa[0] + A1.w / 2, pa[1] + A1.hh / 2], cb = [pb[0] + B1.w / 2, pb[1] + B1.hh / 2];
        const bend = (ar.el.bend || 0) * (rtl ? -1 : 1);
        const mid = [(ca[0] + cb[0]) / 2, (ca[1] + cb[1]) / 2];
        const len = Math.hypot(cb[0] - ca[0], cb[1] - ca[1]) || 1;
        const nx = -(cb[1] - ca[1]) / len, ny = (cb[0] - ca[0]) / len;
        const ctrl = [mid[0] + nx * bend, mid[1] + ny * bend];
        const p0 = edge(A1, pa, ctrl), p2 = edge(B1, pb, ctrl);
        ar.path.setAttribute("d", `M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} Q${ctrl[0].toFixed(1)} ${ctrl[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
        const tin = T[ar.el.in || 0] + (ar.el.delay || 0);
        const pr = ease(cl((tt - tin) / (rm ? 0.001 : DRAW)));
        const vis = Math.min(alphaOf(A1.el, tt), alphaOf(B1.el, tt), ar.el.out != null ? 1 - cl((tt - T[ar.el.out]) / 0.4) : 1);
        ar.g.style.opacity = (vis * (pr > 0 ? 1 : 0)).toFixed(3);
        ar.path.setAttribute("stroke-dashoffset", (1 - pr).toFixed(3));
        const active = st >= (ar.el.in || 0) && (ar.el.until == null || st < ar.el.until) && pr >= 1;
        const on = st === (ar.el.in || 0) || (ar.el.flow && active);
        ar.path.classList.toggle("on", !!on);
        ar.head.classList.toggle("on", !!on);
        // arrow head at p2, oriented along tangent
        const tx = p2[0] - ctrl[0], ty = p2[1] - ctrl[1];
        const ang = (Math.atan2(ty, tx) * 180) / Math.PI;
        ar.head.setAttribute("transform", `translate(${p2[0].toFixed(1)} ${p2[1].toFixed(1)}) rotate(${ang.toFixed(1)})`);
        ar.head.style.opacity = pr > 0.95 ? 1 : 0;
        const q = (u) => [(1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * ctrl[0] + u * u * p2[0], (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * ctrl[1] + u * u * p2[1]];
        ar.flows.forEach((c, k) => {
          if (ar.el.flow && active && !rm) {
            const u = (tt * 0.45 + k / 3) % 1;
            const pt = q(u);
            c.setAttribute("cx", pt[0].toFixed(1)); c.setAttribute("cy", pt[1].toFixed(1));
            c.setAttribute("opacity", (Math.sin(Math.PI * u) * 0.95).toFixed(2));
          } else c.setAttribute("opacity", 0);
        });
        if (ar.lab) { const m = q(0.5); ar.lab.setAttribute("x", (m[0] - 65).toFixed(1)); ar.lab.setAttribute("y", (m[1] - 36).toFixed(1)); }
      }
      if (st !== curStage) {
        curStage = st;
        cap.innerHTML = `<b>${esc(tr("sStageN", { n: st + 1 }))} / ${stages.length} · ${esc(L(stages[st].t))}</b><p>${A.inline(L(stages[st].c))}</p>`;
        [...dots.children].forEach((b, i) => { b.classList.toggle("past", i < st); if (i === st) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
        if (opts.onStage) opts.onStage(st);
      }
      scrub.value = String(Math.round((tt / total) * 1000));
    }
    function showInfo(el) {
      info.hidden = false;
      info.innerHTML = `<button class="x" type="button" aria-label="${esc(tr("close"))}">${ico("x")}</button><b>${esc(L(el.l))}</b><span>${A.inline(L(el.info) || L(el.s2) || "")}</span>`;
      info.querySelector(".x").onclick = () => (info.hidden = true);
    }
    function frame(now) {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      const end = stopAt == null ? total : stopAt;
      tNow = Math.min(end, tNow + dt * Number(speed.value));
      render(tNow);
      if (tNow >= end) { stopAt = null; pause(); return; }
      raf = requestAnimationFrame(frame);
    }
    let stopAt = null;   // presenter mode plays one stage and stops at its end
    function playStage(i) {
      i = Math.max(0, Math.min(stages.length - 1, i));
      if (rm) return goto(i, false);
      if (playing) { playing = false; cancelAnimationFrame(raf); }
      full = false; tNow = T[i]; stopAt = T[i] + (stages[i].d || 4) * 0.999; render(tNow); play();
    }
    function play() {
      if (playing) return;
      full = false;
      if (tNow >= total - 0.01) tNow = 0;
      playing = true; last = performance.now();
      bPlay.innerHTML = ico("pause"); bPlay.setAttribute("aria-label", tr("sPause")); bPlay.title = tr("sPause");
      raf = requestAnimationFrame(frame);
    }
    function pause() {
      if (!playing) stopAt = null;
      playing = false; cancelAnimationFrame(raf);
      bPlay.innerHTML = ico("play"); bPlay.setAttribute("aria-label", tr("sPlay")); bPlay.title = tr("sPlay");
      render(tNow);
    }
    function goto(i, autoplay) {
      full = false;
      i = Math.max(0, Math.min(stages.length - 1, i));
      tNow = rm || !autoplay ? T[i] + (stages[i].d || 4) * 0.999 : T[i];
      if (!rm && autoplay) { render(tNow); if (!playing) play(); }
      else { pause(); }
    }
    // Step-wise navigation shows the finished state of a stage (static, readable); play animates.
    bPlay.onclick = () => (playing ? pause() : play());
    bRestart.onclick = () => { tNow = 0; full = false; render(0); play(); };
    bPrev.onclick = () => goto(curStage - (playing ? 1 : (tNow > T[curStage] + 0.6 * (stages[curStage].d || 4) ? 0 : 1)), false);
    bNext.onclick = () => goto(curStage + 1, false);
    dots.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) goto(Number(b.dataset.i), false); });
    scrub.addEventListener("input", () => { full = false; if (playing) pause(); tNow = (Number(scrub.value) / 1000) * total; render(tNow); });
    bFull.onclick = () => { pause(); tNow = total; full = true; render(total); };
    wrap.addEventListener("keydown", (e) => {
      if (e.target !== wrap) return;
      const nextKey = rtl ? "ArrowLeft" : "ArrowRight", prevKey = rtl ? "ArrowRight" : "ArrowLeft";
      if (e.key === " " || e.key === "k") { e.preventDefault(); playing ? pause() : play(); }
      else if (e.key === nextKey) { e.preventDefault(); bNext.click(); }
      else if (e.key === prevKey) { e.preventDefault(); bPrev.click(); }
      else if (e.key === "Home") { e.preventDefault(); goto(0, false); }
      else if (e.key === "End") { e.preventDefault(); bFull.click(); }
    });

    // start: first stage readable at rest (no blank first frame)
    if (opts.initialStage != null) { tNow = T[opts.initialStage] + (stages[opts.initialStage].d || 4) * 0.999; }
    else tNow = (stages[0].d || 4) * 0.999;
    render(tNow);
    let io = null;
    if (opts.autoplay !== false && !rm && "IntersectionObserver" in window) {
      let started = false;
      io = new IntersectionObserver((rec) => {
        for (const r of rec) {
          if (r.isIntersecting && r.intersectionRatio > 0.45) { if (!started) { started = true; tNow = 0; render(0); play(); } }
          else if (!r.isIntersecting && playing) pause();
        }
      }, { threshold: [0, 0.45, 0.8] });
      io.observe(wrap);
    }
    const api = { root, play, pause, playStage, goto: (i) => goto(i, false), next: () => bNext.click(), prev: () => bPrev.click(), get stage() { return curStage; }, get count() { return stages.length; }, destroy() { pause(); io && io.disconnect(); root.remove(); } };
    A.onLeave && A.onLeave(() => { pause(); io && io.disconnect(); });
    return api;
  }
  A.mountScene = mount;
})(window.ACADEMY);
