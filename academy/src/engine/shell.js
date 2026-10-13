/* Shell: app bar, sidebar, theme/lang/level, router, term popovers, keyboard. */
"use strict";
(function () {
  const { h, t, tr, $, $$ } = ACAD.App;
  const App = ACAD.App;

  /* ---------- theme & language ---------- */
  App.applyTheme = () => {
    const pref = App.state.theme;
    const dark = pref === "dark" || (pref === "auto" && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const b = $("#themeBtn"); if (b) { b.replaceChildren(App.icon(dark ? "sun" : "moon")); b.setAttribute("aria-label", t(dark ? "lightMode" : "darkMode")); b.title = t(dark ? "lightMode" : "darkMode"); }
  };
  App.applyLang = () => {
    const ar = App.isAr();
    document.documentElement.lang = ar ? "ar" : "en";
    document.documentElement.dir = ar ? "rtl" : "ltr";
    document.title = t("appTitle");
  };
  if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => App.state.theme === "auto" && App.applyTheme());

  /* ---------- app bar ---------- */
  function ring(pct) {
    const r = 14, c = 2 * Math.PI * r;
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", 34); svg.setAttribute("height", 34); svg.setAttribute("viewBox", "0 0 34 34"); svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = `<circle cx="17" cy="17" r="${r}" fill="none" stroke="var(--surface-3)" stroke-width="4"/><circle cx="17" cy="17" r="${r}" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c - (c * pct) / 100}" style="transition:stroke-dashoffset .6s"/>`;
    return svg;
  }
  App.renderBar = () => {
    const bar = $("#appbar");
    const p = App.progress();
    const levelSel = h("select", { class: "lvl", id: "levelSel", "aria-label": t("explainLevel"), title: t("explainLevel"), onchange: (e) => { App.state.level = e.target.value; App.save(); App.emit("level"); } },
      ["simple", "mech", "practice", "adv"].map((k) => h("option", { value: k, selected: App.state.level === k }, t("lv_" + k))));
    const nb = App.state.bookmarks.length + Object.values(App.state.notes).filter((x) => x && x.trim()).length;
    bar.replaceChildren(
      h("button", { class: "iconbtn menu-btn", id: "menuBtn", "aria-label": t("menu"), "aria-controls": "sidebar", "aria-expanded": "false", onclick: App.toggleNav }, App.icon("menu")),
      h("button", { class: "iconbtn hide-sm", id: "collapseBtn", "aria-label": t("toggleSidebar"), title: t("toggleSidebar"), onclick: App.toggleNav, style: { display: window.innerWidth < 1024 ? "none" : "" } }, App.icon("menu")),
      h("a", { class: "brand", href: "#/" }, h("span", { class: "brand-mark", "aria-hidden": "true" }, "AI"), h("span", { class: "brand-text" }, h("b", null, t("brandShort")), h("small", null, t("brandSub")))),
      h("button", { class: "searchbtn", id: "searchBtn", onclick: () => App.openSearch(), "aria-label": t("search") }, App.icon("search", 18), h("span", null, t("searchPh")), h("kbd", null, "/")),
      h("div", { class: "bar-actions" },
        h("a", { class: "ring", href: "#/path", title: t("myProgress") + " " + p.pct + "%", "aria-label": t("myProgress") + " " + p.pct + "%" }, ring(p.pct), h("span", null, App.pct(p.pct))),
        levelSel,
        h("button", { class: "iconbtn", id: "mapBtn", title: t("learnMap"), "aria-label": t("learnMap"), onclick: () => (location.hash = "#/graph") }, App.icon("graph")),
        h("button", { class: "iconbtn", id: "noteBtn", title: t("notebook"), "aria-label": t("notebook"), onclick: () => (location.hash = "#/notebook") }, App.icon("bookmark"), nb ? h("span", { class: "dot" }, App.num(nb)) : null),
        h("button", { class: "iconbtn lang", id: "langBtn", title: t("switchLang"), "aria-label": t("switchLang"), onclick: () => { App.state.lang = App.isAr() ? "en" : "ar"; App.save(true); App.applyLang(); App.rerender(); } }, App.isAr() ? "EN" : "ع"),
        h("button", { class: "iconbtn", id: "themeBtn", onclick: () => { const cur = document.documentElement.dataset.theme; App.state.theme = cur === "dark" ? "light" : "dark"; App.save(); App.applyTheme(); } }),
      ),
    );
    App.applyTheme();
  };

  /* ---------- sidebar ---------- */
  const openUnits = new Set();
  App.renderNav = () => {
    const nav = $("#sidebar");
    const cur = location.hash || "#/";
    const link = (href, icon, label, extra) => h("a", { href, "aria-current": cur === href || (href !== "#/" && cur.startsWith(href + "/")) ? "page" : null }, App.icon(icon, 18), h("span", null, label), extra || null);
    const curLesson = (cur.match(/^#\/lesson\/([\w-]+)/) || [])[1];
    const curUnit = curLesson ? (App.lesson(curLesson) || {}).unit : (cur.match(/^#\/unit\/([\w-]+)/) || [])[1];
    if (curUnit) openUnits.add(curUnit);
    const units = ACAD.units.map((u) => {
      const open = openUnits.has(u.id);
      const pr = App.progress(u.id);
      const lid = "nav-" + u.id;
      return h("div", { class: "nav-unit" },
        h("button", { class: "unit-toggle", "aria-expanded": String(open), "aria-controls": lid, onclick: (e) => { open ? openUnits.delete(u.id) : openUnits.add(u.id); App.renderNav(); } },
          h("span", { class: "unit-dot", style: { background: App.unitColor(u.id) } }), h("span", null, tr(u.short)), h("small", { class: "muted" }, App.frac(pr.done, pr.total)), h("span", { class: "chev", "aria-hidden": "true" }, "▾")),
        h("div", { class: "unit-lessons", id: lid, hidden: !open },
          h("a", { href: "#/unit/" + u.id, "aria-current": cur === "#/unit/" + u.id ? "page" : null }, h("span", { class: "lesson-state" }), h("span", null, t("unitOverview"))),
          App.unitLessons(u.id).map((l) => {
            const s = App.lessonState(l.id);
            return h("a", { href: "#/lesson/" + l.id, "aria-current": curLesson === l.id ? "page" : null },
              h("span", { class: "lesson-state" + (s.done ? " done" : s.seen ? " seen" : ""), "aria-label": s.done ? t("done") : "" }), h("span", null, tr(l.title)));
          })));
    });
    nav.replaceChildren(
      h("nav", { class: "nav", "aria-label": t("mainNav") },
        h("div", { class: "nav-group" },
          link("#/", "home", t("home")),
          link("#/map", "map", t("bookMap")),
          App.state.last && App.state.last !== cur ? h("a", { href: App.state.last }, App.icon("replay", 18), h("span", null, t("resume"))) : null),
        h("div", { class: "nav-group" }, h("div", { class: "nav-label" }, t("unitsChapters")), units),
        h("div", { class: "nav-group" }, h("div", { class: "nav-label" }, t("learnAndPractice")),
          link("#/scenes", "play", t("interactiveLessons")),
          link("#/labs", "flask", t("labs")),
          link("#/cases", "briefcase", t("applications")),
          link("#/prompts", "bolt", t("promptLib")),
          link("#/compare", "scale", t("comparisons")),
          link("#/quiz", "quiz", t("tests")),
          link("#/glossary", "abc", t("glossary")),
          link("#/review", "review", t("finalReview"))),
        h("div", { class: "nav-group" }, h("div", { class: "nav-label" }, t("thinkTools")),
          link("#/graph", "graph", t("knowledgeMap")),
          link("#/path", "path", t("learningPath")),
          link("#/notebook", "note", t("notebook")),
          link("#/pages", "pages", t("bookPages")),
          link("#/coverage", "check", t("coverage")),
          link("#/help", "help", t("howToUse")),
          link("#/settings", "gear", t("dataSettings")))));
  };
  App.toggleNav = () => {
    if (window.innerWidth < 1024) {
      const open = !document.body.classList.contains("nav-open");
      document.body.classList.toggle("nav-open", open);
      const mb = $("#menuBtn"); if (mb) mb.setAttribute("aria-expanded", String(open));
      if (open) setTimeout(() => { const a = $("#sidebar a[aria-current=page]") || $("#sidebar a"); a && a.focus(); }, 50);
    } else {
      document.body.classList.toggle("nav-collapsed");
      App.state.navCollapsed = document.body.classList.contains("nav-collapsed"); App.save();
    }
  };
  App.closeNav = () => { document.body.classList.remove("nav-open"); const mb = $("#menuBtn"); if (mb) mb.setAttribute("aria-expanded", "false"); };

  /* ---------- router ---------- */
  const routes = [];
  App.route = (re, fn) => routes.push({ re, fn });
  let cleanup = [];
  App.onLeave = (fn) => cleanup.push(fn);
  App.rerender = () => { App.renderBar(); App.render(); };
  App.render = () => {
    cleanup.forEach((fn) => { try { fn(); } catch (e) {} }); cleanup = [];
    const hash = location.hash || "#/";
    const main = $("#main");
    let view = null;
    for (const r of routes) { const m = hash.match(r.re); if (m) { try { view = r.fn(...m.slice(1)); } catch (e) { console.error(e); view = App.errorView(e); } break; } }
    if (!view) view = App.notFound();
    const wrap = h("div", { class: "view-enter" }, view);
    main.replaceChildren(wrap);
    if (!/^#\/(present|settings|help|notebook|search)/.test(hash)) { App.state.last = hash; App.save(); }
    App.renderNav(); App.closeNav();
    const target = hash.split("?")[1];
    if (target && target.startsWith("s=")) { const el = document.getElementById(decodeURIComponent(target.slice(2))); if (el) { el.scrollIntoView({ block: "start" }); } else window.scrollTo(0, 0); }
    else window.scrollTo(0, 0);
    const h1 = main.querySelector("h1"); if (h1) { h1.setAttribute("tabindex", "-1"); if (App._navigated) h1.focus({ preventScroll: true }); }
    App._navigated = true;
    App.emit("rendered", hash);
  };
  App.errorView = (e) => h("div", { class: "empty" }, h("div", { class: "big" }, "⚠️"), h("h2", null, t("errTitle")), h("p", null, t("errBody")), h("a", { class: "btn primary", href: "#/" }, t("home")));
  App.notFound = () => h("div", { class: "empty" }, h("div", { class: "big" }, "🧭"), h("h2", null, t("nfTitle")), h("p", null, t("nfBody")), h("a", { class: "btn primary", href: "#/" }, t("home")));
  window.addEventListener("hashchange", App.render);

  /* ---------- glossary term popovers ---------- */
  let pop = null;
  const closePop = () => { if (pop) { pop.remove(); pop = null; } };
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".term");
    if (!b) { if (pop && !e.target.closest(".term-pop")) closePop(); return; }
    e.preventDefault(); closePop();
    const g = App.term(b.dataset.term); if (!g) return;
    pop = h("div", { class: "term-pop", role: "dialog", "aria-label": tr(g.term) },
      h("b", null, tr(g.term), g.en && App.isAr() ? h("span", { class: "muted ltr", style: { fontWeight: 600, fontSize: "12px", marginInlineStart: "6px" } }, g.en) : null),
      h("div", null, tr(g.def)),
      h("div", { class: "row", style: { marginTop: "8px" } }, h("a", { href: "#/glossary?s=g-" + g.id, class: "btn sm" }, t("openGlossary"))));
    document.body.append(pop);
    const r = b.getBoundingClientRect();
    const w = Math.min(320, window.innerWidth - 20);
    let left = Math.max(10, Math.min(window.innerWidth - w - 10, r.left + r.width / 2 - w / 2));
    let top = r.bottom + 8; if (top + 160 > window.innerHeight) top = Math.max(70, r.top - 170);
    Object.assign(pop.style, { left: left + "px", top: top + "px", width: w + "px" });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closePop(); App.closeNav(); }
    const typing = /input|textarea|select/i.test((e.target.tagName || "")) || e.target.isContentEditable;
    if (!typing && (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k"))) { e.preventDefault(); App.openSearch(); }
  });
  window.addEventListener("scroll", () => closePop(), { passive: true });

  /* reading progress bar */
  const readbar = () => {
    const i = $("#readbar i"); if (!i) return;
    const lessonView = /^#\/lesson\//.test(location.hash);
    if (!lessonView) { i.style.width = "0"; return; }
    const d = document.documentElement; const max = d.scrollHeight - d.clientHeight;
    i.style.width = (max > 0 ? Math.min(100, (d.scrollTop / max) * 100) : 0) + "%";
  };
  window.addEventListener("scroll", readbar, { passive: true });
  App.on("rendered", readbar);
  App.on("progress", () => App.renderBar());
  App.on("bookmarks", () => App.renderBar());
  window.addEventListener("resize", App.debounce(() => { const c = $("#collapseBtn"); if (c) c.style.display = window.innerWidth < 1024 ? "none" : ""; if (window.innerWidth >= 1024) App.closeNav(); }, 150));
})();
