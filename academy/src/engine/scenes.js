/* Scene engine: step-based explanatory animations drawn in SVG.
   A scene is data: nodes, links, zones and steps (show / highlight / dim / move / zoom / flow / classes).
   Supports play/pause, step navigation, speed, replay, "whole picture", click-to-explain, prediction questions,
   custom cause-and-effect controls, and scroll-driven steps (scrollytelling). Honours reduced motion. */
"use strict";
(function () {
  const App = ACAD.App; const { h, t, tr } = App;
  const NS = "http://www.w3.org/2000/svg";
  const S = (tag, attrs) => { const el = document.createElementNS(NS, tag); for (const k in attrs || {}) if (attrs[k] != null) el.setAttribute(k, attrs[k]); return el; };

  function wrapText(textEl, str, maxChars, lineH) {
    const words = String(str).split(" "); const lines = []; let cur = "";
    for (const w of words) { if ((cur + " " + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim(); }
    if (cur) lines.push(cur);
    const x = textEl.getAttribute("x");
    const y0 = -((lines.length - 1) * lineH) / 2;
    lines.forEach((ln, i) => { const ts = S("tspan", { x, dy: i === 0 ? y0 : lineH }); ts.textContent = ln; textEl.append(ts); });
  }

  /** Mount a scene into a container. Returns a controller. opts: {compact, external:true (no own controls, for scrolly), dark} */
  App.mountScene = (id, opts = {}) => {
    const def = ACAD.scenes[id];
    if (!def) return h("div", { class: "empty" }, t("missing"));
    const W = def.w || 960, H = def.h || 500;
    const rtl = App.isAr() && def.mirror !== false;
    const X = (x, w = 0) => (rtl ? W - x - w : x);
    const root = h("section", { class: "scene", "aria-label": tr(def.title) });
    const svg = S("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": tr(def.title), preserveAspectRatio: "xMidYMid meet" });
    const defs = S("defs");
    defs.innerHTML = `<marker id="arr-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--line-2)"/></marker><marker id="arrh-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>`;
    svg.append(defs);
    const gZones = S("g"), gLinks = S("g"), gNodes = S("g"), gFlow = S("g");
    svg.append(gZones, gLinks, gNodes, gFlow);
    const nodeEls = {}, linkEls = {}, zoneEls = {}, nodeDefs = {};
    for (const z of def.zones || []) {
      const g = S("g", { class: "s-el" });
      g.append(S("rect", { x: X(z.x, z.w), y: z.y, width: z.w, height: z.h, rx: 18, class: "s-zone", style: z.color ? `fill:${z.color}` : null }));
      if (z.label) { const ar = App.isAr(); const tx = S("text", { x: X(z.x, z.w) + (rtl ? z.w - 14 : 14), y: z.y + 22, class: "s-sub", direction: ar ? "rtl" : "ltr", "text-anchor": rtl === ar ? "start" : "end", style: "font-weight:800;font-size:12.5px" }); tx.textContent = tr(z.label); g.append(tx); }
      gZones.append(g); zoneEls[z.id] = g;
    }
    const center = (n) => ({ x: X(n.x, n.w || 0) + (n.w || 0) / 2, y: n.y + (n.h || 0) / 2 });
    for (const n of def.nodes) {
      nodeDefs[n.id] = n;
      const w = n.w || 150, hh = n.h || 70; n.w = w; n.h = hh;
      const g = S("g", { class: "s-el" + (n.info ? " clickable" : ""), "data-id": n.id, tabindex: n.info ? "0" : null, role: n.info ? "button" : null, "aria-label": tr(n.label) + (n.info ? " — " + t("tapToExplain") : "") });
      const x = X(n.x, w);
      if (n.shape === "circle") g.append(S("circle", { cx: x + w / 2, cy: n.y + hh / 2, r: Math.min(w, hh) / 2, class: "s-box" }));
      else g.append(S("rect", { x, y: n.y, width: w, height: hh, rx: n.shape === "pill" ? hh / 2 : 14, class: "s-box", style: n.fill ? `fill:${n.fill}` : null }));
      const hasIco = !!n.ico;
      // compact nodes put the icon beside the label; tall nodes stack icon above label
      const side = hasIco && w >= 120 && (hh < 96 || (n.sub && hh < 112));
      const cx = side ? x + w / 2 + (rtl ? -15 : 15) : x + w / 2;
      n._wrap = n.wrap || Math.max(6, Math.floor((side ? w - 48 : w) / 10.5));
      if (hasIco) { const ic = S("text", { x: side ? x + (rtl ? w - 24 : 24) : x + w / 2, y: side ? n.y + hh / 2 - (n.sub ? 8 : 0) : n.y + (n.sub ? 22 : 24), "text-anchor": "middle", class: "s-ico", "dominant-baseline": "middle" }); ic.textContent = n.ico; g.append(ic); }
      const lbl = S("text", { x: cx, y: n.y + hh / 2 + (hasIco && !side ? 12 : 0) - (n.sub ? 9 : 0), "text-anchor": "middle", "dominant-baseline": "middle", class: "s-label", direction: rtl ? "rtl" : "ltr", style: n.size ? `font-size:${n.size}px` : null });
      wrapText(lbl, tr(n.label), n._wrap, 21); g.append(lbl);
      if (n.sub) { const sb = S("text", { x: cx, y: n.y + hh - 11, "text-anchor": "middle", class: "s-sub", direction: rtl ? "rtl" : "ltr" }); sb.textContent = tr(n.sub); g.append(sb); }
      gNodes.append(g); nodeEls[n.id] = g;
    }
    const edgePoint = (n, toward) => {
      const c = center(n); const dx = toward.x - c.x, dy = toward.y - c.y;
      if (n.shape === "circle") { const r = Math.min(n.w, n.h) / 2 + 4; const d = Math.hypot(dx, dy) || 1; return { x: c.x + (dx / d) * r, y: c.y + (dy / d) * r }; }
      const hw = n.w / 2 + 4, hh = n.h / 2 + 4; const s = Math.min(hw / Math.abs(dx || 1e-6), hh / Math.abs(dy || 1e-6));
      return { x: c.x + dx * s, y: c.y + dy * s };
    };
    for (const l of def.links || []) {
      const a = nodeDefs[l.from], b = nodeDefs[l.to]; if (!a || !b) continue;
      const ca = center(a), cb = center(b);
      const p1 = edgePoint(a, cb), p2 = edgePoint(b, ca);
      const curve = l.curve || 0; const mx = (p1.x + p2.x) / 2 - (p2.y - p1.y) * curve, my = (p1.y + p2.y) / 2 + (p2.x - p1.x) * curve;
      const path = S("path", { d: `M${p1.x} ${p1.y} Q${mx} ${my} ${p2.x} ${p2.y}`, class: "s-link", "marker-end": l.noArrow ? null : `url(#arr-${id})` });
      gLinks.append(path); linkEls[l.id || l.from + ">" + l.to] = path;
      if (!l.id) l.id = l.from + ">" + l.to;
      if (l.label) { const tx = S("text", { x: mx, y: my - 6, "text-anchor": "middle", class: "s-sub", style: "font-weight:700" }); tx.textContent = tr(l.label); gLinks.append(tx); path._label = tx; }
    }
    const stage = h("div", { class: "stage", style: def.ratio ? { aspectRatio: def.ratio } : null }, svg);
    const caption = h("div", { class: "caption", "aria-live": "polite" });
    let step = 0, playing = false, timer = null, speed = 1, flowRaf = null, view = [0, 0, W, H], viewAnim = null, popEl = null;
    const custom = {};

    function setView(target, instant) {
      cancelAnimationFrame(viewAnim);
      const from = view.slice(); const to = target || [0, 0, W, H];
      if (instant || App.reduced()) { view = to; svg.setAttribute("viewBox", view.join(" ")); return; }
      const t0 = performance.now(), dur = 700 / speed;
      const tick = (now) => { const k = Math.min(1, (now - t0) / dur); const e = 1 - Math.pow(1 - k, 3); view = from.map((v, i) => v + (to[i] - v) * e); svg.setAttribute("viewBox", view.join(" ")); if (k < 1) viewAnim = requestAnimationFrame(tick); };
      viewAnim = requestAnimationFrame(tick);
    }
    function runFlow(ids) {
      cancelAnimationFrame(flowRaf); gFlow.replaceChildren();
      if (!ids || !ids.length || App.reduced()) return;
      const dots = [];
      ids.forEach((lid, k) => { const p = linkEls[lid]; if (!p) return; for (let j = 0; j < 3; j++) { const c = S("circle", { r: 5, class: "s-dot" }); gFlow.append(c); dots.push({ c, p, len: p.getTotalLength(), off: j / 3 + k * 0.17 }); } });
      const t0 = performance.now();
      const tick = (now) => { const tt = ((now - t0) / 1600) * speed; for (const d of dots) { const pt = d.p.getPointAtLength(((tt + d.off) % 1) * d.len); d.c.setAttribute("cx", pt.x); d.c.setAttribute("cy", pt.y); } flowRaf = requestAnimationFrame(tick); };
      flowRaf = requestAnimationFrame(tick);
    }
    function stateAt(i) {
      // accumulate "show" across steps unless a step sets show explicitly
      let show = null; const st = def.steps;
      for (let k = 0; k <= i; k++) { if (st[k].show) show = st[k].show === "*" ? def.nodes.map((n) => n.id) : (st[k].add ? (show || []).concat(st[k].show) : st[k].show.slice()); else if (st[k].add) show = (show || []).concat(st[k].add); }
      return show || def.nodes.map((n) => n.id);
    }
    function apply(i, instant) {
      step = Math.max(0, Math.min(def.steps.length - 1, i));
      const s = def.steps[step];
      const show = new Set(stateAt(step));
      const hl = new Set(s.hl || []), dim = new Set(s.dim || []), pulse = new Set(s.pulse || []);
      for (const nid in nodeEls) {
        const g = nodeEls[nid];
        const cls = ["s-el"]; if (nodeDefs[nid].info) cls.push("clickable");
        if (!show.has(nid)) cls.push("hide");
        if (hl.has(nid)) cls.push("hl");
        if (dim.has(nid) || (s.focus && !hl.has(nid))) cls.push("dim");
        if (pulse.has(nid)) cls.push("pulse");
        const c = (s.cls || {})[nid] || custom[nid]; if (c) cls.push(c);
        g.setAttribute("class", cls.join(" "));
        const mv = (s.move || {})[nid]; const sc = (s.scale || {})[nid];
        const dx = mv ? (rtl ? -mv[0] : mv[0]) : 0, dy = mv ? mv[1] : 0;
        g.style.transform = (mv ? `translate(${dx}px,${dy}px)` : "") + (sc ? ` scale(${sc})` : "");
      }
      for (const zid in zoneEls) zoneEls[zid].setAttribute("class", "s-el" + ((s.zones || []).includes(zid) || (!s.zones && !s.hideZones) ? "" : " hide"));
      const flows = new Set(s.flow || []);
      for (const l of def.links || []) {
        const p = linkEls[l.id]; if (!p) continue;
        const visible = (s.links ? s.links.includes(l.id) : show.has(l.from) && show.has(l.to)) && !(s.hideLinks || []).includes(l.id);
        p.setAttribute("class", "s-link" + (visible ? "" : " hide") + (flows.has(l.id) || (s.on || []).includes(l.id) ? " on" : ""));
        p.setAttribute("marker-end", l.noArrow ? "" : `url(#${flows.has(l.id) ? "arrh" : "arr"}-${id})`);
        if (p._label) p._label.style.opacity = visible ? 1 : 0;
      }
      runFlow([...flows].filter((f) => linkEls[f]));
      setView(s.view, instant);
      caption.replaceChildren(h("b", { class: "step-t" }, t("step") + " " + App.num(step + 1) + "/" + App.num(def.steps.length) + " · " + tr(s.t)), h("p", { html: App.inline(tr(s.c)) }));
      dotsWrap && dotsWrap.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", k === step ? "step" : "false"));
      if (prevBtn) { prevBtn.disabled = step === 0; nextBtn.disabled = step === def.steps.length - 1 && !playing; }
      if (def.predict && def.predict.at === step + 1 && !answered && predictBox) predictBox.hidden = false;
      if (def.onStep) def.onStep(step, api);
      closePop();
    }
    function closePop() { if (popEl) { popEl.remove(); popEl = null; } }
    function showInfo(nid) {
      closePop(); const n = nodeDefs[nid]; if (!n || !n.info) return;
      const g = nodeEls[nid]; const sr = stage.getBoundingClientRect(); const gr = g.getBoundingClientRect();
      popEl = h("div", { class: "info-pop", role: "note" }, h("b", null, (n.ico ? n.ico + " " : "") + tr(n.label)), h("span", { html: App.inline(tr(n.info)) }));
      stage.append(popEl);
      const pw = Math.min(280, sr.width - 20);
      let left = gr.left - sr.left + gr.width / 2 - pw / 2; left = Math.max(10, Math.min(sr.width - pw - 10, left));
      let top = gr.bottom - sr.top + 8; if (top + 110 > sr.height) top = Math.max(6, gr.top - sr.top - 110);
      Object.assign(popEl.style, { left: left + "px", top: top + "px", width: pw + "px" });
    }
    svg.addEventListener("click", (e) => { const g = e.target.closest(".s-el[data-id]"); if (g && nodeDefs[g.dataset.id].info) showInfo(g.dataset.id); else closePop(); });
    svg.addEventListener("keydown", (e) => { const g = e.target.closest && e.target.closest(".s-el[data-id]"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); showInfo(g.dataset.id); } });

    function play() {
      if (step >= def.steps.length - 1) apply(0);
      playing = true; updPlay();
      const tick = () => { if (!playing) return; if (step >= def.steps.length - 1) { playing = false; updPlay(); return; } apply(step + 1); timer = setTimeout(tick, (def.steps[step].dur || 3800) / speed); };
      timer = setTimeout(tick, (def.steps[step].dur || 3200) / speed);
    }
    function pause() { playing = false; clearTimeout(timer); updPlay(); }
    let playBtn, prevBtn, nextBtn, dotsWrap, predictBox, answered = !!(App.state.predicts || {})[id];
    const updPlay = () => { if (!playBtn) return; playBtn.replaceChildren(App.icon(playing ? "pause" : "play", 18), h("span", { class: "hide-sm" }, t(playing ? "pause" : "play"))); playBtn.setAttribute("aria-label", t(playing ? "pause" : "play")); };

    const api = {
      root, svg, apply, step: () => step, goto: (i) => apply(i), count: def.steps.length,
      setClass: (nid, cls) => { if (cls) custom[nid] = cls; else delete custom[nid]; apply(step, true); },
      setLabel: (nid, text) => { const g = nodeEls[nid]; if (!g) return; const tx = g.querySelector(".s-label"); tx.replaceChildren(); wrapText(tx, text, nodeDefs[nid]._wrap, 21); },
      setSub: (nid, text) => { const g = nodeEls[nid]; const sb = g && g.querySelector(".s-sub"); if (sb) sb.textContent = text; },
      caption: (html) => caption.replaceChildren(h("p", { html })),
      flow: runFlow, destroy: () => { pause(); cancelAnimationFrame(flowRaf); cancelAnimationFrame(viewAnim); },
    };

    const top = h("div", { class: "scene-top" },
      h("span", { class: "sec-ico", "aria-hidden": "true" }, def.icon || "🎬"),
      h("h3", null, tr(def.title)),
      h("span", { class: "spacer" }),
      App.srcBadge(def.src || "add", def.pages), def.kind ? h("span", { class: "chip" }, t("kind_" + def.kind)) : null);
    if (!opts.external) {
      prevBtn = h("button", { class: "btn sm", "aria-label": t("prevStep"), onclick: () => { pause(); apply(step - 1); } }, App.icon(App.isAr() ? "next" : "prev", 18));
      nextBtn = h("button", { class: "btn sm", "aria-label": t("nextStep"), onclick: () => { pause(); apply(step + 1); } }, App.icon(App.isAr() ? "prev" : "next", 18));
      playBtn = h("button", { class: "btn sm primary", onclick: () => (playing ? pause() : play()) });
      dotsWrap = h("div", { class: "steps-dots", role: "group", "aria-label": t("steps") }, def.steps.map((s, k) => h("button", { "aria-label": t("step") + " " + (k + 1) + ": " + tr(s.t), title: tr(s.t), onclick: () => { pause(); apply(k); } }, App.num(k + 1))));
      const ctrl = h("div", { class: "scene-ctrl" }, playBtn, prevBtn, nextBtn, dotsWrap, h("span", { class: "spacer" }),
        h("button", { class: "btn sm ghost", title: t("replay"), "aria-label": t("replay"), onclick: () => { pause(); apply(0); play(); } }, App.icon("replay", 18)),
        h("button", { class: "btn sm ghost", title: t("wholePicture"), "aria-label": t("wholePicture"), onclick: () => { pause(); apply(def.steps.length - 1); setView(null); } }, App.icon("zoomout", 18), h("span", { class: "hide-sm" }, t("wholePicture"))),
        h("label", { class: "sr", for: "spd-" + id }, t("speed")),
        h("select", { class: "speed", id: "spd-" + id, title: t("speed"), onchange: (e) => (speed = +e.target.value) }, [0.5, 0.75, 1, 1.5, 2].map((v) => h("option", { value: v, selected: v === 1 }, "×" + v))));
      root.append(top, stage, caption);
      if (def.predict) {
        const pr = def.predict;
        predictBox = h("div", { class: "predict", hidden: true },
          h("b", null, "🤔 ", t("predictFirst"), " "), h("span", null, tr(pr.q)),
          h("div", { class: "opts" }, pr.opts.map((o, k) => h("button", {
            class: "chip", onclick: (e) => {
              answered = true; (App.state.predicts || (App.state.predicts = {}))[id] = k === pr.a ? "right" : "wrong"; App.save();
              predictBox.replaceChildren(h("div", { class: "explain " + (k === pr.a ? "right" : "wrong") }, h("b", null, k === pr.a ? t("goodPrediction") : t("notQuite")), " ", tr(pr.why)));
            },
          }, tr(o)))));
        root.append(predictBox);
      }
      if (def.interact) { const panel = def.interact(api); if (panel) root.append(h("div", { class: "scene-ctrl", style: { background: "var(--surface)" } }, panel)); }
      root.append(ctrl);
      stage.tabIndex = 0; stage.setAttribute("aria-label", t("sceneKeys"));
      stage.addEventListener("keydown", (e) => {
        const fwd = App.isAr() ? "ArrowLeft" : "ArrowRight", back = App.isAr() ? "ArrowRight" : "ArrowLeft";
        if (e.key === fwd) { e.preventDefault(); pause(); apply(step + 1); } else if (e.key === back) { e.preventDefault(); pause(); apply(step - 1); }
        else if (e.key === " " && e.target === stage) { e.preventDefault(); playing ? pause() : play(); }
      });
      updPlay();
    } else {
      root.append(top, stage, caption);
      if (def.interact) { const panel = def.interact(api); if (panel) root.append(h("div", { class: "scene-ctrl", style: { background: "var(--surface)" } }, panel)); }
    }
    // pause animation work when off-screen
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (!en.isIntersecting) { if (playing) pause(); cancelAnimationFrame(flowRaf); } else if (!flowRaf || gFlow.childNodes.length === 0) apply(step, true); }), { threshold: 0.05 });
      io.observe(root); App.onLeave(() => io.disconnect());
    }
    App.onLeave(() => api.destroy());
    apply(opts.start || 0, true);
    root._api = api;
    return root;
  };
})();
