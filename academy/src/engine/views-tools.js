/* Secondary views: scenes gallery + scrollytelling, labs, cases, prompt library & customiser, comparisons,
   glossary, knowledge graph, learning path, notebook, book pages, coverage, review, presenter, settings, help. */
"use strict";
(function () {
  const App = ACAD.App; const { h, t, tr } = App;
  const page = (eyebrow, title, lead, ...kids) => h("div", { class: "wrap" }, h("div", { class: "eyebrow" }, eyebrow), h("h1", null, title), lead ? h("p", { class: "lead" }, lead) : null, ...kids);
  const qparam = (k) => { const m = (location.hash.split("?")[1] || "").match(new RegExp("(?:^|&)" + k + "=([^&]*)")); return m ? decodeURIComponent(m[1]) : ""; };
  App.qparam = qparam;

  /* ---------- SCENES ---------- */
  App.route(/^#\/scenes$/, () => {
    const ids = Object.keys(ACAD.scenes);
    const kinds = [...new Set(ids.map((id) => ACAD.scenes[id].kind).filter(Boolean))];
    let kind = "";
    const grid = h("div", { class: "grid g3" });
    const draw = () => grid.replaceChildren(...ids.filter((id) => !kind || ACAD.scenes[id].kind === kind).map((id) => {
      const s = ACAD.scenes[id]; const l = App.lesson(s.lesson);
      return h("a", { class: "card hover", href: "#/scenes/" + id },
        h("div", { class: "row", style: { justifyContent: "space-between" } }, h("span", { style: { fontSize: "28px" } }, s.icon || "🎬"), h("span", { class: "chip" }, t("kind_" + s.kind))),
        h("h3", { style: { marginTop: "8px" } }, tr(s.title)), h("p", { class: "muted", style: { fontSize: "14px" } }, tr(s.lead || "")),
        h("div", { class: "row", style: { gap: "6px" } }, h("span", { class: "chip" }, App.num(s.steps.length) + " " + t("stepsWord")), l ? h("span", { class: "chip" }, "📘 " + tr(l.title)) : null));
    }));
    draw();
    return page(t("interactiveLessons"), t("scenesTitle"), t("scenesLead"),
      h("div", { class: "filters" }, h("button", { class: "chip on", onclick: (e) => { kind = ""; e.target.parentNode.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === e.target)); draw(); } }, t("all")),
        kinds.map((k) => h("button", { class: "chip", onclick: (e) => { kind = k; e.target.parentNode.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === e.target)); draw(); } }, t("kind_" + k)))),
      grid);
  });
  // scrollytelling: sticky stage, step cards drive the scene as they scroll into view
  App.route(/^#\/scenes\/([\w-]+)$/, (id) => {
    const s = ACAD.scenes[id]; if (!s) return null;
    const l = App.lesson(s.lesson);
    let mode = "scroll";
    const holder = h("div");
    const draw = () => {
      App.onLeave(() => {});
      if (mode === "player") { holder.replaceChildren(App.mountScene(id)); return; }
      const sc = App.mountScene(id, { external: true });
      const cards = s.steps.map((st, i) => h("div", { class: "card", "data-i": i, style: { margin: "0 0 50vh", opacity: .55, transition: "opacity .3s" } }, h("b", { class: "muted", style: { fontSize: "13px" } }, t("step") + " " + App.num(i + 1)), h("h3", null, tr(st.t)), h("p", { html: App.inline(tr(st.c)), style: { margin: 0 } })));
      const grid = h("div", { style: { display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,.9fr)", gap: "24px" }, class: "scrolly" },
        h("div", { style: { position: "sticky", top: "calc(var(--appbar) + 16px)", alignSelf: "start" } }, sc),
        h("div", { style: { paddingTop: "10vh" } }, cards, h("div", { class: "card soft" }, h("b", null, "✅ " + t("sceneEnd")), l ? h("p", null, h("a", { href: "#/lesson/" + l.id }, "📘 " + tr(l.title))) : null)));
      holder.replaceChildren(grid);
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { const i = +en.target.dataset.i; sc._api.goto(i); cards.forEach((c, k) => (c.style.opacity = k === i ? 1 : .45)); } }), { rootMargin: "-45% 0px -45% 0px" });
        cards.forEach((c) => io.observe(c)); App.onLeave(() => io.disconnect());
      }
      if (window.innerWidth < 900) { grid.style.gridTemplateColumns = "1fr"; grid.firstChild.style.top = "calc(var(--appbar) + 4px)"; grid.firstChild.style.zIndex = 3; cards.forEach((c) => (c.style.margin = "0 0 40vh")); }
    };
    draw();
    const modeBtns = h("div", { class: "row" }, ["scroll", "player"].map((m) => h("button", { class: "chip" + (m === mode ? " on" : ""), "aria-pressed": String(m === mode), onclick: (e) => { mode = m; modeBtns.querySelectorAll(".chip").forEach((c) => { c.classList.toggle("on", c === e.currentTarget); c.setAttribute("aria-pressed", String(c === e.currentTarget)); }); draw(); } }, t("mode_" + m))));
    return h("div", { class: "wrap" },
      h("div", { class: "crumbs" }, h("a", { href: "#/" }, t("home")), "›", h("a", { href: "#/scenes" }, t("interactiveLessons")), "›", h("span", null, tr(s.title))),
      h("h1", null, (s.icon || "🎬") + " " + tr(s.title)), s.lead ? h("p", { class: "lead" }, tr(s.lead)) : null,
      h("div", { class: "row", style: { marginBottom: "16px" } }, modeBtns, h("span", { class: "spacer" }), l ? h("a", { class: "btn sm", href: "#/lesson/" + l.id }, "📘 " + t("relatedLesson")) : null, ...App.pageLinks(s.pages)),
      holder);
  });

  /* ---------- LABS ---------- */
  App.route(/^#\/labs$/, () => page(t("labs"), t("labsTitle"), t("labsLead"),
    h("div", { class: "callout warn" }, "🧪 ", t("simHonesty")),
    h("div", { class: "grid g3" }, Object.keys(ACAD.labs).map((id) => { const lab = ACAD.labs[id]; const l = App.lesson(lab.lesson); const tried = App.state.labs[id];
      return h("a", { class: "card hover", href: "#/lab/" + id }, h("div", { class: "row", style: { justifyContent: "space-between" } }, h("span", { style: { fontSize: "28px" } }, lab.icon), tried ? h("span", { class: "badge ok" }, "✓ " + t("tried")) : null),
        h("h3", { style: { marginTop: "8px" } }, tr(lab.title)), h("p", { class: "muted", style: { fontSize: "14px" } }, App.strip(lab.intro).slice(0, 150)), l ? h("span", { class: "chip" }, "📘 " + tr(l.title)) : null); }))));
  App.route(/^#\/lab\/([\w-]+)$/, (id) => {
    const lab = ACAD.labs[id]; if (!lab) return null; const l = App.lesson(lab.lesson);
    return h("div", { class: "wrap" }, h("div", { class: "crumbs" }, h("a", { href: "#/" }, t("home")), "›", h("a", { href: "#/labs" }, t("labs")), "›", h("span", null, tr(lab.title))),
      h("h1", null, lab.icon + " " + tr(lab.title)), App.mountLab(id), l ? h("div", { class: "row", style: { marginTop: "16px" } }, h("a", { class: "btn", href: "#/lesson/" + l.id }, "📘 " + t("relatedLesson") + ": " + tr(l.title))) : null);
  });

  /* ---------- CASES ---------- */
  App.route(/^#\/cases(?:\?.*)?$/, () => {
    let sector = "";
    const list = h("div", { class: "grid", style: { gap: "18px" } });
    const sectors = [...new Set(ACAD.cases.map((c) => c.sector).filter(Boolean))];
    const draw = () => list.replaceChildren(...ACAD.cases.filter((c) => !sector || c.sector === sector).map(App.caseCard));
    draw();
    return page(t("applications"), t("casesTitle"), t("casesLead"),
      h("div", { class: "filters" }, h("button", { class: "chip on", onclick: (e) => { sector = ""; e.target.parentNode.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === e.target)); draw(); } }, t("all")),
        sectors.map((s) => h("button", { class: "chip", onclick: (e) => { sector = s; e.target.parentNode.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === e.target)); draw(); } }, t("sector_" + s)))),
      list);
  });

  /* ---------- PROMPT LIBRARY ---------- */
  App.route(/^#\/prompts(?:\/([\w-]+))?(?:\?.*)?$/, (pid) => {
    const f = { q: "", unit: "", cat: "", src: "", lesson: qparam("l") };
    const list = h("div", { class: "grid", style: { gap: "10px" } });
    const count = h("span", { class: "chip" });
    const cats = [...new Set(ACAD.prompts.map((p) => p.cat).filter(Boolean))];
    const draw = () => {
      const qn = App.norm(f.q);
      const ps = ACAD.prompts.filter((p) => { const l = App.lesson(p.lesson) || {}; return (!f.unit || l.unit === f.unit) && (!f.cat || p.cat === f.cat) && (!f.src || (p.src || "book") === f.src) && (!f.lesson || p.lesson === f.lesson) && (!qn || App.norm(App.strip(p.title) + " " + App.strip(p.goal) + " " + App.strip(p.text)).includes(qn)); });
      count.textContent = App.num(ps.length) + " " + t("prompt");
      list.replaceChildren(...(ps.length ? ps.map((p) => App.promptCard(p, { open: p.id === pid })) : [h("div", { class: "empty" }, h("div", { class: "big" }, "⚡"), t("noMatch"))]));
      if (pid) setTimeout(() => { const el = document.getElementById("pr-" + pid); el && el.scrollIntoView({ block: "start" }); }, 30);
    };
    const sel = (key, label, options) => h("select", { "aria-label": label, onchange: (e) => { f[key] = e.target.value; draw(); } }, h("option", { value: "" }, label + ": " + t("all")), options.map(([v, l]) => h("option", { value: v, selected: f[key] === v }, l)));
    const view = page(t("promptLib"), t("promptsTitle"), t("promptsLead"),
      App.customizer(),
      h("div", { class: "filters", style: { marginTop: "22px" } },
        h("input", { type: "search", placeholder: t("filterPromptPh"), "aria-label": t("filterPromptPh"), oninput: App.debounce((e) => { f.q = e.target.value; draw(); }, 120) }),
        sel("unit", t("unit"), ACAD.units.map((u) => [u.id, tr(u.short)])),
        sel("cat", t("category"), cats.map((c) => [c, t("cat_" + c)])),
        sel("src", t("source"), [["book", "📖 " + t("fromBook")], ["add", "✨ " + t("addition")]]),
        f.lesson ? h("button", { class: "chip on", onclick: (e) => { f.lesson = ""; e.currentTarget.remove(); draw(); } }, "📘 " + tr((App.lesson(f.lesson) || {}).title) + " ✕") : null,
        count),
      list);
    draw();
    return view;
  });
  /* customiser: wraps any prompt with domain / goal / depth / format choices */
  App.customizer = () => {
    const ar = App.isAr();
    const opts = {
      domain: ACAD.custom.domains, goal: ACAD.custom.goals, depth: ACAD.custom.depths, format: ACAD.custom.formats,
    };
    const st = { domain: 0, goal: 0, depth: 1, format: 0, base: ACAD.prompts[0] ? ACAD.prompts[0].id : "" };
    const out = h("div", { class: "prompt-text", "aria-live": "polite" });
    const draw = () => {
      const p = App.prompt(st.base); const d = opts.domain[st.domain], g = opts.goal[st.goal], dp = opts.depth[st.depth], fm = opts.format[st.format];
      const lines = [tr(d.ctx), tr(g.ctx), p ? tr(p.text) : "", tr(dp.ctx), tr(fm.ctx)].filter(Boolean);
      out.innerHTML = App.esc(lines.join("\n\n")).replace(/\[([^\]\[]{1,60})\]/g, '<span class="var">[$1]</span>');
      out.dataset.text = lines.join("\n\n");
    };
    const select = (key, label, list) => h("div", { class: "field" }, h("label", { for: "cz-" + key }, label), h("select", { id: "cz-" + key, onchange: (e) => { st[key] = +e.target.value; draw(); } }, list.map((o, i) => h("option", { value: i, selected: st[key] === i }, tr(o.label)))));
    const base = h("div", { class: "field" }, h("label", { for: "cz-base" }, t("basePrompt")), h("select", { id: "cz-base", onchange: (e) => { st.base = e.target.value; draw(); } }, ACAD.units.map((u) => h("optgroup", { label: tr(u.short) }, ACAD.prompts.filter((p) => (App.lesson(p.lesson) || {}).unit === u.id).map((p) => h("option", { value: p.id }, tr(p.title)))))));
    draw();
    return h("section", { class: "lab", id: "customizer" },
      h("div", { class: "lab-head" }, h("span", { class: "sec-ico" }, "🎛️"), h("div", null, h("h3", null, t("customizerTitle")), h("p", { class: "muted", style: { margin: 0 } }, t("customizerLead")))),
      h("div", { class: "lab-body" },
        h("div", { class: "lab-in" }, base, select("domain", t("cz_domain"), opts.domain), select("goal", t("cz_goal"), opts.goal), select("depth", t("cz_depth"), opts.depth), select("format", t("cz_format"), opts.format)),
        h("div", { class: "lab-out" }, out, h("div", { class: "row", style: { marginTop: "10px" } }, h("button", { class: "btn primary sm", onclick: () => App.copy(out.dataset.text) }, App.icon("copy", 16), t("copy")),
          h("button", { class: "btn sm", onclick: () => { App.state.saved.unshift({ id: "c" + Date.now(), text: out.dataset.text, ts: Date.now() }); App.save(); App.emit("bookmarks"); App.toast(t("savedToNotebook")); } }, App.icon("bookmark", 16), t("save"))),
          h("p", { class: "muted", style: { fontSize: "13px", marginTop: "8px" } }, "💡 ", t("customizerTip")))));
  };

  /* ---------- COMPARE ---------- */
  App.route(/^#\/compare(?:\?.*)?$/, () => {
    const items = ACAD.compare;
    let a = qparam("a") || (items[0] || {}).id, b = qparam("b") || (items[1] || {}).id;
    const out = h("div");
    const fields = ["what", "strength", "limit", "useWhen", "avoidWhen", "cost", "example"];
    const draw = () => {
      const A = items.find((x) => x.id === a), B = items.find((x) => x.id === b);
      if (!A || !B) return;
      const pair = (ACAD.pairs || []).find((p) => (p.a === a && p.b === b) || (p.a === b && p.b === a));
      out.replaceChildren(
        h("div", { class: "card", style: { overflowX: "auto", padding: 0, marginTop: "16px" } },
          h("table", { class: "tbl", style: { fontSize: "14.5px" } },
            h("thead", null, h("tr", null, h("th", { style: { width: "18%" } }, ""), h("th", null, A.icon + " " + tr(A.name)), h("th", null, B.icon + " " + tr(B.name)))),
            h("tbody", null, fields.map((k) => h("tr", null, h("th", { style: { position: "static" } }, t("cmp_" + k)), h("td", { style: { whiteSpace: "normal" }, html: App.inline(tr(A[k]) || "—") }), h("td", { style: { whiteSpace: "normal" }, html: App.inline(tr(B[k]) || "—") })))))),
        pair ? h("div", { class: "callout key" }, h("strong", { class: "t" }, "⚖️ " + t("keyDifference")), h("span", { html: App.inline(tr(pair.diff)) }), pair.both ? h("div", { style: { marginTop: "6px" }, html: "🤝 <b>" + App.esc(t("whatShared")) + ":</b> " + App.inline(tr(pair.both)) }) : null) :
          h("div", { class: "callout" }, "ℹ️ ", t("noPairNote")),
        h("div", { class: "row" }, ...[A, B].map((x) => x.lesson ? h("a", { class: "btn sm", href: "#/lesson/" + x.lesson }, "📘 " + tr(App.lesson(x.lesson).title)) : null), ...App.pageLinks([...new Set([...(A.pages || []), ...(B.pages || [])])])));
    };
    const mk = (val, set, label) => h("div", { class: "field", style: { flex: 1, minWidth: "220px" } }, h("label", null, label), h("select", { onchange: (e) => { set(e.target.value); draw(); } }, ACAD.units.map((u) => { const g = items.filter((x) => x.unit === u.id); return g.length ? h("optgroup", { label: tr(u.short) }, g.map((x) => h("option", { value: x.id, selected: x.id === val }, x.icon + " " + tr(x.name)))) : null; })));
    draw();
    return page(t("comparisons"), t("compareTitle"), t("compareLead"),
      h("div", { class: "card soft" }, h("div", { class: "row", style: { alignItems: "flex-end" } }, mk(a, (v) => (a = v), t("conceptA")), h("button", { class: "btn", "aria-label": t("swap"), onclick: () => { [a, b] = [b, a]; App.render(); location.hash = "#/compare?a=" + a + "&b=" + b; } }, "⇄"), mk(b, (v) => (b = v), t("conceptB")))),
      h("h3", { style: { marginTop: "18px" } }, t("popularPairs")),
      h("div", { class: "row" }, (ACAD.pairs || []).map((p) => { const A = items.find((x) => x.id === p.a), B = items.find((x) => x.id === p.b); return A && B ? h("a", { class: "chip", href: "#/compare?a=" + p.a + "&b=" + p.b, onclick: () => setTimeout(App.render, 0) }, tr(A.name) + " ⇄ " + tr(B.name)) : null; })),
      out);
  });

  /* ---------- GLOSSARY ---------- */
  App.route(/^#\/glossary(?:\?.*)?$/, () => {
    let q = "", unit = "";
    const list = h("div", { class: "grid g2" });
    const draw = () => {
      const qn = App.norm(q);
      const gs = ACAD.glossary.filter((g) => (!unit || (g.units || []).includes(unit)) && (!qn || App.norm(tr(g.term) + " " + (g.en || "") + " " + tr(g.def)).includes(qn)))
        .sort((x, y) => tr(x.term).localeCompare(tr(y.term), App.lang()));
      list.replaceChildren(...(gs.length ? gs.map((g) => h("article", { class: "card", id: "g-" + g.id },
        h("div", { class: "row" }, h("h3", { style: { margin: 0 } }, tr(g.term)), g.en ? h("span", { class: "chip ltr" }, g.en) : null, h("span", { class: "spacer" }), App.srcBadge(g.src || "book", g.pages)),
        h("p", { style: { margin: "8px 0" } }, tr(g.def)),
        g.analogy ? h("p", { class: "muted", style: { fontSize: "14.5px" } }, "🧩 ", tr(g.analogy)) : null,
        h("div", { class: "row", style: { gap: "6px" } }, ...(g.lessons || []).map((id) => App.lesson(id)).filter(Boolean).map((l) => h("a", { class: "chip", href: "#/lesson/" + l.id }, "📘 " + tr(l.title))), ...App.pageLinks(g.pages))))
        : [h("div", { class: "empty" }, h("div", { class: "big" }, "🔤"), t("noMatch"))]));
    };
    draw();
    return page(t("glossary"), t("glossaryTitle"), t("glossaryLead"),
      h("div", { class: "filters" }, h("input", { type: "search", placeholder: t("filterTermPh"), "aria-label": t("filterTermPh"), oninput: App.debounce((e) => { q = e.target.value; draw(); }, 100) }),
        h("select", { "aria-label": t("unit"), onchange: (e) => { unit = e.target.value; draw(); } }, h("option", { value: "" }, t("unit") + ": " + t("all")), ACAD.units.map((u) => h("option", { value: u.id }, tr(u.short)))),
        h("span", { class: "chip" }, App.num(ACAD.glossary.length) + " " + t("termsWord"))),
      list);
  });

  /* ---------- KNOWLEDGE GRAPH (force layout computed once, pan/zoom, focus on node) ---------- */
  App.route(/^#\/graph$/, () => {
    const W = 1200, H = 820;
    const nodes = ACAD.lessons.map((l, i) => ({ id: l.id, l, u: ACAD.units.findIndex((u) => u.id === l.unit) }));
    const idx = Object.fromEntries(nodes.map((n, i) => [n.id, i]));
    const edges = [];
    for (const l of ACAD.lessons) { for (const r of l.req || []) if (idx[r] != null) edges.push({ s: idx[r], t: idx[l.id], req: true }); for (const r of l.related || []) if (idx[r] != null && !edges.some((e) => (e.s === idx[r] && e.t === idx[l.id]) || (e.s === idx[l.id] && e.t === idx[r]))) edges.push({ s: idx[l.id], t: idx[r] }); }
    // seeded deterministic layout: units on a ring, then force relaxation
    const U = ACAD.units.length;
    nodes.forEach((n, i) => { const k = App.unitLessons(n.l.unit).indexOf(n.l); const ang = (n.u / U) * Math.PI * 2 - Math.PI / 2; const r = 270; n.x = W / 2 + Math.cos(ang) * r + Math.cos(k * 2.4) * (40 + k * 10); n.y = H / 2 + Math.sin(ang) * r + Math.sin(k * 2.4) * (40 + k * 10); n.vx = 0; n.vy = 0; });
    for (let it = 0; it < 320; it++) {
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i], b = nodes[j]; let dx = a.x - b.x, dy = a.y - b.y; const d2 = dx * dx + dy * dy + 0.01; const f = 2600 / d2; const d = Math.sqrt(d2); dx /= d; dy /= d; a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f; }
      for (const e of edges) { const a = nodes[e.s], b = nodes[e.t]; const dx = b.x - a.x, dy = b.y - a.y; const d = Math.hypot(dx, dy) || 1; const f = (d - 95) * 0.012; a.vx += (dx / d) * f; a.vy += (dy / d) * f; b.vx -= (dx / d) * f; b.vy -= (dy / d) * f; }
      for (const n of nodes) { const ang = (n.u / U) * Math.PI * 2 - Math.PI / 2; n.vx += (W / 2 + Math.cos(ang) * 250 - n.x) * 0.006; n.vy += (H / 2 + Math.sin(ang) * 250 - n.y) * 0.006; n.x += n.vx * 0.5; n.y += n.vy * 0.5; n.vx *= 0.6; n.vy *= 0.6; n.x = Math.max(60, Math.min(W - 60, n.x)); n.y = Math.max(40, Math.min(H - 40, n.y)); }
    }
    const NS = "http://www.w3.org/2000/svg"; const S = (tg, at) => { const e = document.createElementNS(NS, tg); for (const k in at) e.setAttribute(k, at[k]); return e; };
    const svg = S("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": t("knowledgeMap") });
    const gE = S("g", {}), gN = S("g", {}); svg.append(gE, gN);
    const edgeEls = edges.map((e) => { const a = nodes[e.s], b = nodes[e.t]; const el = S("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: "g-edge" + (e.req ? " req" : "") }); gE.append(el); return el; });
    const info = h("div", { class: "card", "aria-live": "polite" }, h("p", { class: "muted", style: { margin: 0 } }, t("graphHint")));
    let focus = null;
    const setFocus = (i) => {
      focus = i;
      const nb = new Set([i]); edges.forEach((e) => { if (e.s === i) nb.add(e.t); if (e.t === i) nb.add(e.s); });
      nodeEls.forEach((g, k) => g.setAttribute("class", "g-node" + (i == null || nb.has(k) ? "" : " dim")));
      edgeEls.forEach((el, k) => { const e = edges[k]; el.setAttribute("class", "g-edge" + (e.req ? " req" : "") + (i == null ? "" : e.s === i || e.t === i ? " hot" : " dim")); });
      if (i == null) { info.replaceChildren(h("p", { class: "muted", style: { margin: 0 } }, t("graphHint"))); return; }
      const l = nodes[i].l; const reqs = (l.req || []).map(App.lesson).filter(Boolean); const leads = ACAD.lessons.filter((x) => (x.req || []).includes(l.id));
      info.replaceChildren(h("div", { class: "row" }, h("span", { style: { fontSize: "24px" } }, l.icon), h("h3", { style: { margin: 0 } }, tr(l.title)), h("span", { class: "spacer" }), h("a", { class: "btn sm primary", href: "#/lesson/" + l.id }, t("openLesson"))),
        h("p", { class: "muted" }, tr(l.hook)),
        reqs.length ? h("div", null, h("b", null, "⬅️ " + t("buildsOn") + ": "), reqs.map((r) => h("button", { class: "chip", onclick: () => setFocus(idx[r.id]) }, tr(r.title)))) : null,
        leads.length ? h("div", { style: { marginTop: "6px" } }, h("b", null, "➡️ " + t("leadsTo") + ": "), leads.map((r) => h("button", { class: "chip", onclick: () => setFocus(idx[r.id]) }, tr(r.title)))) : null);
    };
    const nodeEls = nodes.map((n, i) => {
      const g = S("g", { class: "g-node", tabindex: 0, role: "button", "aria-label": tr(n.l.title) });
      const done = App.lessonState(n.id).done;
      g.append(S("circle", { cx: n.x, cy: n.y, r: 14 + ((n.l.related || []).length + (n.l.req || []).length) * 1.2, fill: `var(--u${n.u})`, opacity: done ? 1 : 0.78 }));
      const tx = S("text", { x: n.x, y: n.y + 30, "text-anchor": "middle" }); tx.textContent = App.strip(n.l.title).slice(0, 26); g.append(tx);
      if (done) { const c = S("text", { x: n.x, y: n.y + 4, "text-anchor": "middle", style: "fill:#fff;font-size:13px;stroke:none" }); c.textContent = "✓"; g.append(c); }
      g.addEventListener("click", (e) => { e.stopPropagation(); setFocus(i); });
      g.addEventListener("dblclick", () => (location.hash = "#/lesson/" + n.id));
      g.addEventListener("keydown", (e) => { if (e.key === "Enter") location.hash = "#/lesson/" + n.id; if (e.key === " ") { e.preventDefault(); setFocus(i); } });
      gN.append(g); return g;
    });
    // pan & zoom
    let vb = [0, 0, W, H], drag = null;
    const setVB = () => svg.setAttribute("viewBox", vb.join(" "));
    svg.addEventListener("click", () => setFocus(null));
    svg.addEventListener("wheel", (e) => { e.preventDefault(); const k = e.deltaY > 0 ? 1.1 : 0.9; const r = svg.getBoundingClientRect(); const mx = vb[0] + ((e.clientX - r.left) / r.width) * vb[2], my = vb[1] + ((e.clientY - r.top) / r.height) * vb[3]; vb = [mx - (mx - vb[0]) * k, my - (my - vb[1]) * k, vb[2] * k, vb[3] * k]; setVB(); }, { passive: false });
    svg.addEventListener("pointerdown", (e) => { if (e.target.closest(".g-node")) return; drag = { x: e.clientX, y: e.clientY, vb: vb.slice() }; svg.setPointerCapture(e.pointerId); });
    svg.addEventListener("pointermove", (e) => { if (!drag) return; const r = svg.getBoundingClientRect(); vb[0] = drag.vb[0] - ((e.clientX - drag.x) / r.width) * vb[2]; vb[1] = drag.vb[1] - ((e.clientY - drag.y) / r.height) * vb[3]; setVB(); });
    svg.addEventListener("pointerup", () => (drag = null));
    const zoom = (k) => { const cx = vb[0] + vb[2] / 2, cy = vb[1] + vb[3] / 2; vb = [cx - (vb[2] * k) / 2, cy - (vb[3] * k) / 2, vb[2] * k, vb[3] * k]; setVB(); };
    return page(t("knowledgeMap"), t("graphTitle"), t("graphLead"),
      h("div", { class: "row", style: { marginBottom: "10px" } }, h("div", { class: "legend" }, ACAD.units.map((u, i) => h("span", null, h("i", { style: { background: `var(--u${i})` } }), tr(u.short)))), h("span", { class: "spacer" }),
        h("button", { class: "btn sm", "aria-label": t("zoomIn"), onclick: () => zoom(0.8) }, "＋"), h("button", { class: "btn sm", "aria-label": t("zoomOut"), onclick: () => zoom(1.25) }, "－"), h("button", { class: "btn sm", onclick: () => { vb = [0, 0, W, H]; setVB(); setFocus(null); } }, t("reset"))),
      h("div", { class: "graph-wrap" }, svg), h("div", { style: { marginTop: "12px" } }, info),
      h("p", { class: "muted", style: { fontSize: "13px", marginTop: "8px" } }, "— — ", t("edgeReq"), " · ─── ", t("edgeRel")));
  });

  /* ---------- LEARNING PATH ---------- */
  App.route(/^#\/path$/, () => {
    const all = App.progress();
    const quizState = (id) => (App.state.quizzes[id] || {});
    const weak = new Set(); Object.values(App.state.quizzes).forEach((q) => (q.weak || []).forEach((w) => weak.add(w)));
    const nextUp = App.ordered().find((l) => !App.lessonState(l.id).done && (l.req || []).every((r) => App.lessonState(r).done)) || App.ordered().find((l) => !App.lessonState(l.id).done);
    return page(t("learningPath"), t("pathTitle"), t("pathLead"),
      h("div", { class: "grid g3" },
        h("div", { class: "card" }, h("small", { class: "muted" }, t("overall")), h("div", { style: { fontSize: "36px", fontWeight: 900 } }, App.pct(all.pct)), h("div", { class: "bar" }, h("i", { style: { width: all.pct + "%" } })), h("div", { class: "muted", style: { marginTop: "6px" } }, App.num(all.done) + " / " + App.num(all.total) + " " + t("lessonsWord"))),
        h("div", { class: "card" }, h("small", { class: "muted" }, t("nextBest")), nextUp ? h("div", null, h("h3", { style: { margin: "6px 0" } }, nextUp.icon + " " + tr(nextUp.title)), h("p", { class: "muted", style: { fontSize: "14px" } }, t("whyNext")), h("a", { class: "btn primary sm", href: "#/lesson/" + nextUp.id }, t("openLesson"))) : h("p", null, "🎉 " + t("allDone"))),
        h("div", { class: "card" }, h("small", { class: "muted" }, t("toReview")), weak.size ? h("div", { class: "related", style: { marginTop: "6px" } }, [...weak].map(App.lesson).filter(Boolean).map((l) => h("a", { class: "chip", href: "#/lesson/" + l.id }, "🔁 " + tr(l.title)))) : h("p", { class: "muted" }, t("noWeak")))),
      ACAD.units.map((u) => { const pr = App.progress(u.id); const qz = ACAD.quizzes.find((q) => q.unit === u.id); const qs = qz ? quizState(qz.id) : {};
        return h("section", { class: "section", style: { "--uc": App.unitColor(u.id) } },
          h("div", { class: "section-head" }, h("h2", null, u.icon + " " + tr(u.short)), h("span", { class: "row" }, h("span", { class: "chip" }, App.pct(pr.pct)), qz ? h("a", { class: "chip", href: "#/quiz/" + qz.id }, "🏆 " + (qs.best != null ? App.pct(qs.best) : t("notTaken"))) : null)),
          h("div", { class: "bar", style: { marginBottom: "12px" } }, h("i", { style: { width: pr.pct + "%" } })),
          h("div", { class: "grid", style: { gap: "8px" } }, App.unitLessons(u.id).map((l) => { const s = App.lessonState(l.id); const blocked = (l.req || []).filter((r) => !App.lessonState(r).done).map(App.lesson).filter(Boolean);
            return h("a", { class: "card hover", href: "#/lesson/" + l.id, style: { padding: "10px 14px", display: "flex", gap: "12px", alignItems: "center" } },
              h("span", { class: "lesson-state" + (s.done ? " done" : s.seen ? " seen" : "") }), h("span", { style: { flex: 1 } }, h("b", null, tr(l.title)), blocked.length && !s.done ? h("small", { class: "muted", style: { display: "block" } }, "⬅️ " + t("prepFirst") + ": " + blocked.map((b) => tr(b.title)).join("، ")) : null),
              weak.has(l.id) ? h("span", { class: "badge sim" }, "🔁 " + t("review")) : null, s.done ? h("span", { class: "badge ok" }, "✓") : s.seen ? h("span", { class: "chip" }, t("started")) : null); })));
      }));
  });

  /* ---------- NOTEBOOK ---------- */
  App.route(/^#\/notebook$/, () => {
    const notes = Object.entries(App.state.notes).filter(([, v]) => v && v.trim());
    const bms = App.state.bookmarks;
    const toMd = () => {
      let s = "# " + t("notebook") + "\n\n";
      for (const [id, v] of notes) s += "## " + tr((App.lesson(id) || {}).title || id) + "\n\n" + v + "\n\n";
      if (App.state.saved.length) { s += "## " + t("savedPrompts") + "\n\n"; App.state.saved.forEach((x) => (s += "```\n" + x.text + "\n```\n\n")); }
      return s;
    };
    const dl = () => { const a = h("a", { href: URL.createObjectURL(new Blob([toMd()], { type: "text/markdown" })), download: "notebook.md" }); document.body.append(a); a.click(); a.remove(); };
    return page(t("notebook"), t("notebookTitle"), t("notebookLead"),
      h("div", { class: "row", style: { marginBottom: "18px" } }, h("button", { class: "btn", onclick: dl }, App.icon("download", 18), t("exportNotes")), h("a", { class: "btn", href: "#/settings" }, App.icon("gear", 18), t("dataSettings"))),
      h("section", { class: "section" }, h("div", { class: "section-head" }, h("h2", null, "🔖 " + t("bookmarks"))),
        bms.length ? h("div", { class: "grid g3" }, bms.map((b) => {
          const obj = b.type === "lesson" ? App.lesson(b.id) : App.prompt(b.id); if (!obj) return null;
          return h("div", { class: "card" }, h("div", { class: "row" }, h("span", { class: "chip" }, b.type === "lesson" ? "📘 " + t("type_lesson") : "⚡ " + t("type_prompt")), h("span", { class: "spacer" }), h("button", { class: "btn sm ghost", "aria-label": t("remove"), onclick: () => { App.toggleBookmark(b.type, b.id); App.render(); } }, App.icon("trash", 16))),
            h("h3", { style: { fontSize: "16px", marginTop: "8px" } }, tr(obj.title)), h("a", { class: "btn sm", href: b.type === "lesson" ? "#/lesson/" + b.id : "#/prompts/" + b.id }, t("open")));
        })) : h("div", { class: "empty" }, h("div", { class: "big" }, "🔖"), t("noBookmarks"))),
      h("section", { class: "section" }, h("div", { class: "section-head" }, h("h2", null, "📝 " + t("myNotes"))),
        notes.length ? h("div", { class: "grid g2" }, notes.map(([id, v]) => h("div", { class: "card" }, h("h3", { style: { fontSize: "16px" } }, tr((App.lesson(id) || {}).title || id)), h("p", { style: { whiteSpace: "pre-wrap", fontSize: "14.5px" } }, v), h("a", { class: "btn sm", href: "#/lesson/" + id + "?s=s-notes" }, t("editNote"))))) : h("div", { class: "empty" }, h("div", { class: "big" }, "📝"), t("noNotes"))),
      h("section", { class: "section" }, h("div", { class: "section-head" }, h("h2", null, "⚡ " + t("savedPrompts"))),
        App.state.saved.length ? h("div", { class: "grid", style: { gap: "10px" } }, App.state.saved.map((x, i) => h("div", { class: "card" }, h("div", { class: "prompt-text" }, x.text), h("div", { class: "row", style: { marginTop: "8px" } }, h("button", { class: "btn sm primary", onclick: () => App.copy(x.text) }, App.icon("copy", 16), t("copy")), h("button", { class: "btn sm ghost", onclick: () => { App.state.saved.splice(i, 1); App.save(); App.render(); } }, App.icon("trash", 16), t("remove")))))) : h("div", { class: "empty" }, h("div", { class: "big" }, "⚡"), t("noSaved"))));
  });

  /* ---------- BOOK PAGES ---------- */
  App.pageImg = (n) => { if (!ACAD._pages) { try { ACAD._pages = JSON.parse(document.getElementById("pages-data").textContent); } catch (e) { ACAD._pages = {}; } } return ACAD._pages[n] || ""; };
  App.route(/^#\/pages$/, () => page(t("bookPages"), t("pagesTitle"), t("pagesLead"),
    h("div", { class: "pages-grid" }, (ACAD.pageMap || []).map((p) => h("a", { class: "page-thumb", href: "#/page/" + p.n }, h("div", { class: "ph", "data-n": p.n, role: "img", "aria-label": t("pageN") + " " + p.n }), h("div", { class: "cap" }, App.num(p.n) + " · " + tr(p.title))))),
    (() => { setTimeout(() => { const io = "IntersectionObserver" in window ? new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.style.backgroundImage = `url(${App.pageImg(en.target.dataset.n)})`; io.unobserve(en.target); } }), { rootMargin: "200px" }) : null; document.querySelectorAll(".ph[data-n]").forEach((el) => (io ? io.observe(el) : (el.style.backgroundImage = `url(${App.pageImg(el.dataset.n)})`))); io && App.onLeave(() => io.disconnect()); }, 0); return null; })()));
  App.route(/^#\/page\/(\d+)$/, (nStr) => {
    const n = +nStr; const p = (ACAD.pageMap || []).find((x) => x.n === n); if (!p) return null;
    const lessons = ACAD.lessons.filter((l) => (l.pages || []).includes(n));
    const prompts = ACAD.prompts.filter((x) => (x.pages || []).includes(n) && (x.src || "book") === "book");
    return h("div", { class: "wrap" },
      h("div", { class: "crumbs" }, h("a", { href: "#/" }, t("home")), "›", h("a", { href: "#/pages" }, t("bookPages")), "›", h("span", null, t("pageN") + " " + App.num(n))),
      h("div", { class: "row", style: { marginBottom: "12px" } }, h("h1", { style: { margin: 0 } }, t("pageN") + " " + App.num(n) + " — " + tr(p.title)), h("span", { class: "spacer" }),
        n > 1 ? h("a", { class: "btn sm", href: "#/page/" + (n - 1) }, App.icon(App.isAr() ? "next" : "prev", 16), t("prevPage")) : null,
        n < 41 ? h("a", { class: "btn sm", href: "#/page/" + (n + 1) }, t("nextPage"), App.icon(App.isAr() ? "prev" : "next", 16)) : null),
      h("div", { class: "page-view" },
        h("div", null, h("img", { class: "page-img", src: App.pageImg(n), alt: t("pageN") + " " + n + " — " + tr(p.title), loading: "lazy" }),
          h("p", { class: "muted", style: { fontSize: "13px", marginTop: "8px" } }, "ℹ️ ", t("pageImgNote"), " ", h("a", { href: ACAD.pdfPath + "#page=" + n, target: "_blank", rel: "noopener" }, t("openPdf")))),
        h("aside", null,
          h("div", { class: "card" }, h("h3", null, "🧭 " + t("pageSummary")), h("p", { style: { fontSize: "15px" } }, tr(p.summary)), p.note ? h("div", { class: "callout warn", style: { fontSize: "14px" } }, tr(p.note)) : null),
          h("div", { class: "card", style: { marginTop: "12px" } }, h("h3", null, "📘 " + t("explainedIn")), lessons.length ? h("div", { class: "grid", style: { gap: "6px" } }, lessons.map((l) => h("a", { class: "chip", href: "#/lesson/" + l.id, style: { height: "auto", padding: "6px 10px", whiteSpace: "normal" } }, l.icon + " " + tr(l.title)))) : h("p", { class: "muted" }, tr(p.where || "")),
            prompts.length ? h("div", { style: { marginTop: "10px" } }, h("b", null, "⚡ " + App.num(prompts.length) + " " + t("promptsFromPage")), h("div", { class: "related", style: { marginTop: "6px" } }, prompts.map((x) => h("a", { class: "chip", href: "#/prompts/" + x.id }, tr(x.title))))) : null))));
  });

  /* ---------- COVERAGE REPORT ---------- */
  App.route(/^#\/coverage$/, () => {
    const pm = ACAD.pageMap || [];
    const covered = pm.filter((p) => ACAD.lessons.some((l) => (l.pages || []).includes(p.n)) || p.where);
    return page(t("coverage"), t("coverageTitle"), t("coverageLead"),
      h("div", { class: "grid g3", style: { marginBottom: "18px" } },
        h("div", { class: "card" }, h("small", { class: "muted" }, t("pagesReviewed")), h("div", { style: { fontSize: "32px", fontWeight: 900 } }, App.num(pm.length) + " / " + App.num(41))),
        h("div", { class: "card" }, h("small", { class: "muted" }, t("pagesMapped")), h("div", { style: { fontSize: "32px", fontWeight: 900 } }, App.num(covered.length) + " / " + App.num(41))),
        h("div", { class: "card" }, h("small", { class: "muted" }, t("bookPromptsIncluded")), h("div", { style: { fontSize: "32px", fontWeight: 900 } }, App.num(ACAD.prompts.filter((p) => (p.src || "book") === "book").length)))),
      h("div", { class: "card", style: { padding: 0, overflow: "hidden" } },
        h("div", { class: "cov-row cov-head" }, h("span", null, t("pageWord")), h("span", null, t("pageContent")), h("span", null, t("whereExplained"))),
        pm.map((p) => { const ls = ACAD.lessons.filter((l) => (l.pages || []).includes(p.n));
          return h("div", { class: "cov-row" }, h("a", { href: "#/page/" + p.n, class: "pg", style: { fontSize: "13px" } }, "📖 " + App.num(p.n)),
            h("span", null, h("b", null, tr(p.title)), h("div", { class: "muted", style: { fontSize: "13.5px" } }, tr(p.summary))),
            h("span", { class: "related" }, ls.map((l) => h("a", { class: "chip", href: "#/lesson/" + l.id, style: { height: "auto", whiteSpace: "normal", padding: "4px 10px" } }, tr(l.title))), p.where ? h("span", { class: "muted", style: { fontSize: "13.5px" } }, tr(p.where)) : null)); })));
  });

  /* ---------- QUICK / FINAL REVIEW ---------- */
  App.route(/^#\/review(?:\?.*)?$/, () => {
    const only = qparam("u");
    return page(t("finalReview"), t("reviewTitle"), t("reviewLead"),
      h("div", { class: "row", style: { marginBottom: "14px" } }, h("a", { class: "chip" + (!only ? " on" : ""), href: "#/review" }, t("all")), ACAD.units.map((u) => h("a", { class: "chip" + (only === u.id ? " on" : ""), href: "#/review?u=" + u.id }, u.icon + " " + tr(u.short))), h("span", { class: "spacer" }), h("button", { class: "btn sm", onclick: () => window.print() }, "🖨️ " + t("print"))),
      ACAD.units.filter((u) => !only || u.id === only).map((u) => h("section", { class: "section", style: { "--uc": App.unitColor(u.id) } },
        h("div", { class: "section-head" }, h("h2", null, u.icon + " " + tr(u.title))),
        u.thread ? h("div", { class: "callout key" }, h("strong", { class: "t" }, "🧵 " + t("theThread")), tr(u.thread)) : null,
        h("div", { class: "grid g2" }, App.unitLessons(u.id).map((l) => h("div", { class: "card" },
          h("div", { class: "row" }, h("span", { style: { fontSize: "20px" } }, l.icon), h("h3", { style: { margin: 0, fontSize: "16.5px" } }, tr(l.title)), h("span", { class: "spacer" }), ...App.pageLinks(l.pages).slice(0, 2)),
          h("ul", { class: "keypoints", style: { marginTop: "10px" } }, (tr(l.keys) || []).map((k) => h("li", { html: App.inline(k), style: { fontSize: "14.5px", padding: "7px 12px" } }))),
          (l.related || []).length ? h("div", { class: "muted", style: { fontSize: "13px", marginTop: "8px" } }, "🔗 ", (l.related || []).map(App.lesson).filter(Boolean).map((r) => tr(r.title)).join(" · ")) : null))))));
  });

  /* ---------- PRESENTER MODE ---------- */
  App.route(/^#\/present\/([\w-]+)$/, (id) => {
    const l = App.lesson(id); if (!l) return null;
    const slides = [];
    slides.push({ kind: "title", notes: tr(l.hook) });
    if (l.book) slides.push({ kind: "md", title: t("bookSays"), md: tr(l.book), notes: t("pn_book") });
    if (l.levels && l.levels.simple) slides.push({ kind: "md", title: "🌱 " + t("lv_simple"), md: tr(l.levels.simple), notes: t("pn_simple") });
    [].concat(l.scene || []).forEach((sid) => ACAD.scenes[sid] && ACAD.scenes[sid].steps.forEach((st, i) => slides.push({ kind: "scene", sid, step: i, notes: tr(st.c) })));
    if (l.levels && l.levels.mech) slides.push({ kind: "md", title: "🔍 " + t("lv_mech"), md: tr(l.levels.mech), notes: t("pn_mech") });
    if (l.levels && l.levels.practice) slides.push({ kind: "md", title: "🛠️ " + t("lv_practice"), md: tr(l.levels.practice), notes: t("pn_practice") });
    if (l.keys) slides.push({ kind: "keys", notes: t("pn_keys") });
    if (l.quick) l.quick.forEach((q) => slides.push({ kind: "ask", q, notes: tr(q.why) }));
    if (l.card && l.card.check) slides.push({ kind: "discuss", notes: t("pn_discuss") });
    let i = 0;
    const box = h("div", { class: "present", role: "dialog", "aria-label": t("presenterMode") });
    const stage = h("div", { class: "present-stage" }); const notes = h("aside", { class: "notes", "aria-label": t("speakerNotes") });
    const counter = h("span", null); const bar = h("div", { class: "pbar" }, h("i"));
    let showNotes = window.innerWidth > 1100;
    const draw = () => {
      App.onLeave(() => {}); const s = slides[i]; let body;
      if (s.kind === "title") body = h("div", { class: "slide" }, h("div", { class: "eyebrow", style: { color: "#8fb1ff" } }, tr(App.unit(l.unit).short)), h("h1", null, l.icon + " " + tr(l.title)), h("p", { class: "lead" }, tr(l.hook)), h("div", { class: "row" }, ...App.pageLinks(l.pages)));
      else if (s.kind === "md") body = h("div", { class: "slide" }, h("h2", null, s.title), h("div", { class: "prose", html: App.md(s.md) }));
      else if (s.kind === "scene") body = h("div", { class: "slide", style: { justifyContent: "flex-start" } }, App.mountScene(s.sid, { start: s.step, external: true }));
      else if (s.kind === "keys") body = h("div", { class: "slide" }, h("h2", null, "✦ " + t("keyPoints")), h("ul", null, tr(l.keys).map((k) => h("li", { html: App.inline(k) }))));
      else if (s.kind === "ask") { let shown = false; const ans = h("div", { hidden: true }, h("p", { style: { color: "#7ff0c0" } }, "✅ ", tr(s.q.opts || s.q.items)[s.q.a] || ""), h("p", { html: App.inline(tr(s.q.why)) }));
        body = h("div", { class: "slide" }, h("div", { class: "eyebrow", style: { color: "#ffd77a" } }, "🙋 " + t("askAudience")), h("h2", null, tr(s.q.q)), s.q.opts ? h("ol", null, tr(s.q.opts).map((o) => h("li", null, o))) : null, h("div", null, h("button", { class: "btn", onclick: () => { shown = !shown; ans.hidden = !shown; } }, t("revealAnswer"))), ans); }
      else body = h("div", { class: "slide" }, h("div", { class: "eyebrow", style: { color: "#ffd77a" } }, "💬 " + t("discussion")), h("h2", null, tr(l.card.check)), l.card.apply ? h("p", null, "✋ ", tr(l.card.apply)) : null);
      stage.replaceChildren(body, showNotes ? notes : "");
      notes.replaceChildren(h("h4", null, "🗒️ " + t("speakerNotes")), h("p", { html: App.inline(s.notes || "") }), h("h4", null, "⌨️"), h("p", { class: "muted" }, t("presentKeys")));
      counter.textContent = App.num(i + 1) + " / " + App.num(slides.length);
      bar.firstChild.style.width = ((i + 1) / slides.length) * 100 + "%";
    };
    const go = (d) => { i = Math.max(0, Math.min(slides.length - 1, i + d)); draw(); };
    const exit = () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); location.hash = "#/lesson/" + id; };
    const key = (e) => { const fwd = App.isAr() ? "ArrowLeft" : "ArrowRight", back = App.isAr() ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd || e.key === "PageDown" || (e.key === " " && e.target === document.body)) { e.preventDefault(); go(1); } else if (e.key === back || e.key === "PageUp") { e.preventDefault(); go(-1); }
      else if (e.key.toLowerCase() === "n") { showNotes = !showNotes; draw(); } else if (e.key.toLowerCase() === "f") { (box.requestFullscreen ? box.requestFullscreen() : Promise.reject()).catch(() => {}); } else if (e.key === "Escape" && !document.fullscreenElement) exit(); };
    document.addEventListener("keydown", key); App.onLeave(() => document.removeEventListener("keydown", key));
    box.append(h("div", { class: "present-top" }, h("b", null, "🎤 " + t("presenterMode")), h("span", { class: "muted" }, tr(l.title)), h("span", { class: "spacer" }), h("button", { class: "btn sm", onclick: () => { showNotes = !showNotes; draw(); } }, "🗒️ " + t("speakerNotes")), h("button", { class: "btn sm", onclick: () => box.requestFullscreen && box.requestFullscreen().catch(() => {}) }, App.icon("full", 16)), h("button", { class: "btn sm", onclick: exit, "aria-label": t("close") }, App.icon("close", 16))),
      stage, h("div", { class: "present-bot" }, h("button", { class: "btn", onclick: () => go(-1), "aria-label": t("prev") }, App.icon(App.isAr() ? "next" : "prev", 18)), bar, counter, h("button", { class: "btn primary", onclick: () => go(1), "aria-label": t("next") }, App.icon(App.isAr() ? "prev" : "next", 18))));
    draw();
    return box;
  });

  /* ---------- SETTINGS (data) ---------- */
  App.route(/^#\/settings$/, () => {
    const file = h("input", { type: "file", accept: "application/json,.json", hidden: true, onchange: (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { App.importData(r.result); App.toast(t("imported")); App.applyLang(); App.rerender(); } catch (err) { App.toast(t("importFail")); } }; r.readAsText(f); } });
    const used = (() => { try { return Math.round((localStorage.getItem("ai-essentials-academy.v1") || "").length / 1024); } catch (e) { return 0; } })();
    return page(t("dataSettings"), t("settingsTitle"), t("settingsLead"),
      !App.storageOk ? h("div", { class: "banner" }, "⚠️ ", t("storageFail")) : null,
      h("div", { class: "grid g3" },
        h("div", { class: "card" }, h("h3", null, "⬇️ " + t("exportData")), h("p", { class: "muted" }, t("exportDesc")), h("button", { class: "btn primary", onclick: App.exportData }, App.icon("download", 18), t("exportData"))),
        h("div", { class: "card" }, h("h3", null, "⬆️ " + t("importData")), h("p", { class: "muted" }, t("importDesc")), file, h("button", { class: "btn", onclick: () => file.click() }, App.icon("upload", 18), t("importData"))),
        h("div", { class: "card" }, h("h3", null, "🗑️ " + t("clearData")), h("p", { class: "muted" }, t("clearDesc")), h("button", { class: "btn danger", onclick: () => { if (confirm(t("clearConfirm"))) { App.resetAll(); App.toast(t("cleared")); App.rerender(); } } }, App.icon("trash", 18), t("clearData")))),
      h("div", { class: "card soft", style: { marginTop: "16px" } }, h("b", null, "💾 " + t("whereData")), h("p", { class: "muted", style: { margin: "4px 0 0" } }, t("whereDataDesc") + " (" + App.num(used) + " KB)")));
  });

  /* ---------- HELP ---------- */
  App.route(/^#\/help$/, () => page(t("howToUse"), t("helpTitle"), t("helpLead"),
    h("div", { class: "grid g2" }, ACAD.help.map((x) => h("div", { class: "card" }, h("h3", null, x.ico + " " + tr(x.t)), h("div", { class: "prose", html: App.mdLoc(x.c) })))),
    h("div", { class: "card soft", style: { marginTop: "16px" } }, h("h3", null, "⌨️ " + t("shortcuts")), h("ul", { class: "prose" }, (App.isAr() ? ["/ أو Ctrl+K: البحث الشامل", "الأسهم داخل المشهد: الخطوة التالية والسابقة، والمسافة للتشغيل والإيقاف", "في وضع المحاضر: الأسهم للتنقل، N للملاحظات، F لملء الشاشة، Esc للخروج", "Esc يغلق أي نافذة أو قائمة مفتوحة"] : ["/ or Ctrl+K: global search", "Arrow keys inside a scene: next/previous step; Space: play/pause", "Presenter mode: arrows to move, N for notes, F for full screen, Esc to exit", "Esc closes any open dialog or menu"]).map((s) => h("li", null, s))))));
})();
