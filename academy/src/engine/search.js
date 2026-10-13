/* Full-text search across lessons, prompts, glossary, labs, scenes, cases and book pages.
   Arabic-aware normalisation (diacritics, alef/ya/ta-marbuta forms), prefix matching and simple scoring. */
"use strict";
(function () {
  const App = ACAD.App; const { h, t, tr, $ } = App;

  const norm = App.norm = (s) => String(s || "").toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "")
    .replace(/[إأآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  const STOP = new Set(["في", "من", "على", "الى", "عن", "ما", "هو", "هي", "او", "ثم", "مع", "the", "a", "an", "of", "to", "in", "and", "or", "is", "for", "how", "what"]);
  const stem = (w) => w.length > 4 && w.startsWith("ال") ? w.slice(2) : w;
  const words = (s) => norm(s).split(" ").filter((w) => w && !STOP.has(w)).map(stem);

  let index = null, indexLang = null;
  function build() {
    const L = App.lang(); const items = [];
    const add = (type, id, href, title, body, extra) => items.push({ type, id, href, title: App.strip(title), body: App.strip(body), extra: extra || "", ti: norm(App.strip(title)), bi: norm(App.strip(body) + " " + (extra || "")) });
    const both = (v) => (v && typeof v === "object" && !Array.isArray(v) ? [v.ar, v.en].join(" ") : v || "");
    for (const l of ACAD.lessons) {
      const lv = l.levels || {};
      add("lesson", l.id, "#/lesson/" + l.id, l.title, [tr(l.hook), tr(l.book), tr(lv.simple), tr(lv.mech), tr(lv.practice), tr(lv.adv)].join(" "), both(l.title) + " " + (l.tags || []).join(" ") + " " + (l.pages || []).map((p) => "p" + p).join(" "));
    }
    for (const p of ACAD.prompts) add("prompt", p.id, "#/prompts/" + p.id, p.title, [tr(p.goal), tr(p.text), tr(p.tip)].join(" "), both(p.title));
    for (const g of ACAD.glossary) add("term", g.id, "#/glossary?s=g-" + g.id, g.term, tr(g.def), (g.en || "") + " " + both(g.term));
    for (const id in ACAD.labs) { const lab = ACAD.labs[id]; add("lab", id, "#/lab/" + id, lab.title, tr(lab.intro), both(lab.title)); }
    for (const id in ACAD.scenes) { const s = ACAD.scenes[id]; add("scene", id, "#/scenes/" + id, s.title, (s.steps || []).map((x) => tr(x.t) + " " + tr(x.c)).join(" ")); }
    for (const c of ACAD.cases) add("case", c.id, "#/cases?s=c-" + c.id, c.title, [tr(c.problem), tr(c.ai), tr(c.steps)].join(" "));
    for (const pg of ACAD.pageMap || []) add("page", String(pg.n), "#/page/" + pg.n, { ar: "صفحة " + pg.n + " — " + tr(pg.title), en: "Page " + pg.n + " — " + (pg.title.en || "") }, tr(pg.summary));
    index = items; indexLang = L;
  }
  App.search = (q, limit = 40) => {
    if (!index || indexLang !== App.lang()) build();
    const qw = words(q); const qn = norm(q);
    if (!qw.length) return [];
    const res = [];
    for (const it of index) {
      let score = 0, all = true;
      for (const w of qw) {
        let s = 0;
        if (it.ti.includes(w)) s += 8 + (new RegExp("(^| )" + w).test(it.ti) ? 4 : 0);
        if (it.bi.includes(w)) s += 2 + Math.min(4, it.bi.split(w).length - 1);
        if (!s) { all = false; break; }
        score += s;
      }
      if (!all) continue;
      if (qn.length > 3 && it.ti.includes(qn)) score += 15;
      score += { lesson: 6, term: 4, prompt: 3, lab: 3, scene: 3, case: 2, page: 1 }[it.type] || 0;
      res.push({ it, score });
    }
    return res.sort((a, b) => b.score - a.score).slice(0, limit).map((r) => r.it);
  };
  function snippet(body, q) {
    const qw = words(q); const raw = body; const n = norm(raw);
    let pos = -1; for (const w of qw) { pos = n.indexOf(w); if (pos >= 0) break; }
    // approximate position mapping: normalised text is close in length to the raw text
    const start = Math.max(0, pos - 50); let s = raw.slice(start, start + 160);
    if (start > 0) s = "… " + s; if (start + 160 < raw.length) s += " …";
    let html = App.esc(s);
    for (const w of qw) { if (w.length < 2) continue; try { html = html.replace(new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>"); } catch (e) {} }
    return html;
  }
  const TYPE_ICON = { lesson: "📘", prompt: "⚡", term: "🔤", lab: "🧪", scene: "🎬", case: "💼", page: "📄" };
  App.typeLabel = (type) => t("type_" + type);

  /* ---------- palette dialog ---------- */
  App.openSearch = (initial) => {
    let dlg = $("#searchDlg");
    if (!dlg) { dlg = h("dialog", { id: "searchDlg", "aria-label": t("search") }); document.body.append(dlg); }
    const input = h("input", { type: "search", placeholder: t("searchPh"), "aria-label": t("search"), autocomplete: "off", role: "combobox", "aria-controls": "searchRes", "aria-expanded": "true" });
    const results = h("div", { class: "palette-res", id: "searchRes", role: "listbox" });
    let sel = 0, flat = [];
    const draw = () => {
      const q = input.value.trim();
      results.replaceChildren(); flat = [];
      if (!q) {
        results.append(h("div", { class: "res-group" }, t("trySearch")),
          h("div", { class: "row", style: { padding: "6px 10px" } }, (App.isAr() ? ["سياق", "البرومبت الذهبي", "ماكرو", "وكيل", "نافذة السياق", "Git", "فحص الجودة", "لوحة معلومات"] : ["context", "golden prompt", "macro", "agent", "context window", "Git", "data quality", "dashboard"]).map((s) => h("button", { class: "chip", onclick: () => { input.value = s; draw(); input.focus(); } }, s))));
        return;
      }
      const found = App.search(q);
      if (!found.length) { results.append(h("div", { class: "empty" }, h("div", { class: "big" }, "🔍"), t("noResults"), h("div", { class: "muted", style: { fontSize: "13px" } }, t("noResultsTip")))); return; }
      const groups = {};
      for (const it of found) (groups[it.type] = groups[it.type] || []).push(it);
      for (const type of ["lesson", "scene", "lab", "prompt", "term", "case", "page"]) {
        if (!groups[type]) continue;
        results.append(h("div", { class: "res-group" }, App.typeLabel(type) + " · " + App.num(groups[type].length)));
        for (const it of groups[type].slice(0, 8)) {
          const i = flat.length; flat.push(it);
          results.append(h("a", { class: "res", href: it.href, role: "option", id: "res-" + i, "aria-selected": i === sel ? "true" : "false", onclick: () => dlg.close() },
            h("span", { class: "ri", "aria-hidden": "true" }, TYPE_ICON[it.type]), h("span", null, h("b", null, it.title), h("small", { html: snippet(it.body, q) }))));
        }
      }
    };
    const move = (d) => { if (!flat.length) return; sel = (sel + d + flat.length) % flat.length; results.querySelectorAll(".res").forEach((r, i) => r.setAttribute("aria-selected", i === sel ? "true" : "false")); const cur = results.querySelector("#res-" + sel); cur && cur.scrollIntoView({ block: "nearest" }); input.setAttribute("aria-activedescendant", "res-" + sel); };
    input.addEventListener("input", App.debounce(() => { sel = 0; draw(); }, 90));
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter" && flat[sel]) { e.preventDefault(); location.hash = flat[sel].href; dlg.close(); }
    });
    dlg.replaceChildren(h("div", { class: "palette" },
      h("div", { class: "palette-in" }, App.icon("search"), input, h("button", { class: "iconbtn", "aria-label": t("close"), onclick: () => dlg.close() }, App.icon("close"))),
      results,
      h("div", { class: "muted", style: { padding: "8px 16px", fontSize: "12px", borderTop: "1px solid var(--line)" } }, "↑↓ ", t("navigate"), " · Enter ", t("open"), " · Esc ", t("close"))));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    if (!dlg.open) dlg.showModal();
    input.value = initial || ""; draw(); input.focus();
  };
})();
