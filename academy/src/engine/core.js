/* Core engine: state, i18n, icons, text formatting, router, shell, overlays, search.
   Book data lives in A.units / A.lessons / A.prompts / A.quiz / A.glossary / A.compare / A.coverage (data/*.js).
   This file never contains book content. */
"use strict";
(function (A) {
  const doc = document;

  /* ---------- tiny DOM helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (sel, root = doc) => root.querySelector(sel);
  const $$ = (sel, root = doc) => [...root.querySelectorAll(sel)];
  function h(tag, attrs, ...kids) {
    const el = doc.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const k of kids.flat(Infinity)) if (k != null && k !== false) el.append(k instanceof Node ? k : doc.createTextNode(String(k)));
    return el;
  }
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const reduceMotion = () => !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------- state (localStorage with safe fallback) ---------- */
  const KEY = "aiAcademy.v1";
  const blank = () => ({ lang: "ar", theme: "auto", level: "simple", done: {}, visited: {}, last: null, quiz: {}, notes: {}, bookmarks: [], saved: [], project: {}, scroll: {} });
  let memory = blank();
  let storageOk = true;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) memory = Object.assign(blank(), JSON.parse(raw));
    } catch (e) { storageOk = false; }
  }
  const persist = debounce(() => {
    try { localStorage.setItem(KEY, JSON.stringify(memory)); storageOk = true; }
    catch (e) { if (storageOk) toast(t("storageFail")); storageOk = false; }
  }, 250);
  const S = {
    get: (k) => memory[k],
    set(k, v) { memory[k] = v; persist(); A.emit("state", k); },
    patch(k, sub, v) { memory[k] = Object.assign({}, memory[k], { [sub]: v }); if (v === undefined) delete memory[k][sub]; persist(); A.emit("state", k); },
    all: () => JSON.parse(JSON.stringify(memory)),
    replace(obj) { memory = Object.assign(blank(), obj); persist(); },
    reset() { const keep = { lang: memory.lang, theme: memory.theme }; memory = Object.assign(blank(), keep); persist(); },
    ok: () => storageOk,
  };

  /* ---------- events ---------- */
  const handlers = {};
  A.on = (ev, fn) => ((handlers[ev] ||= []).push(fn), () => (handlers[ev] = handlers[ev].filter((f) => f !== fn)));
  A.emit = (ev, data) => (handlers[ev] || []).forEach((f) => { try { f(data); } catch (e) { console.error(e); } });

  /* ---------- i18n ---------- */
  const lang = () => memory.lang === "en" ? "en" : "ar";
  const L = (o) => o == null ? "" : typeof o === "string" ? o : (o[lang()] ?? o.ar ?? o.en ?? "");
  function t(key, vars) {
    const e = A.ui[key];
    let s = e ? L(e) : key;
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll("{" + k + "}", v);
    return s;
  }
  function applyLang() {
    const l = lang();
    doc.documentElement.lang = l;
    doc.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    doc.title = t("docTitle");
  }
  function applyTheme() {
    const th = memory.theme;
    if (th === "light" || th === "dark") doc.documentElement.setAttribute("data-theme", th);
    else doc.documentElement.removeAttribute("data-theme");
  }

  /* ---------- icons (one stroke family, 24px grid, original geometry) ---------- */
  const IC = {
    home: "M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z",
    map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14",
    book: "M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2zM4 20a2 2 0 0 0 2 1h13M8 7h7",
    layers: "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
    flask: "M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3M7 15h10",
    msg: "M4 5h16v11H9l-5 4zM8 9h8M8 12h5",
    compare: "M8 4v16M16 4v16M3 8h5M16 8h5M3 16h5M16 16h5M10 12h4",
    quiz: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6M12 17h.01",
    abc: "M4 18 8 6l4 12M5.5 14h5M14 6h3.5a2.5 2.5 0 0 1 0 5H14zM14 11h4a2.5 2.5 0 0 1 0 5h-4z",
    graph: "M6 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M18 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M12 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M7.5 7.5 11 16M16.5 7.5 13 16M8 6h8",
    bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
    route: "M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M18 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M8 19h8a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h8",
    pen: "M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4",
    screen: "M3 4h18v12H3zM8 20h8M12 16v4",
    search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
    sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
    moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z",
    auto: "M12 21a9 9 0 1 0 0-18v18zM12 3a9 9 0 0 1 0 18",
    menu: "M4 7h16M4 12h16M4 17h16",
    x: "M6 6l12 12M18 6 6 18",
    play: "M7 4 20 12 7 20V4Z",
    pause: "M6 4h4v16H6zM14 4h4v16h-4z",
    restart: "M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5",
    prev: "M15 6l-6 6 6 6",
    next: "M9 6l6 6-6 6",
    bookmark: "M6 3h12v18l-6-4-6 4z",
    check: "M5 12l5 5L20 7",
    copy: "M9 9h11v11H9zM5 15V4h11",
    download: "M12 4v12M7 11l5 5 5-5M4 20h16",
    upload: "M12 20V8M7 13l5-5 5 5M4 4h16",
    trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
    info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v6M12 7.5h.01",
    ext: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
    page: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5",
    chev: "M6 9l6 6 6-6",
    spark: "M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z",
    target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 7.5M22 21a7 7 0 0 0-4-6.3",
    gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15.1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 4.2V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.9 11H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
    db: "M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
    code: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16",
    chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    folder: "M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
    branch: "M6 3v12M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9",
    cpu: "M6 6h12v12H6zM9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4",
    shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
    clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
    eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    full: "M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M3 15v4a2 2 0 0 0 2 2h4M21 15v4a2 2 0 0 1-2 2h-4",
    note: "M5 3h14v18l-4-3-3 3-3-3-4 3zM9 8h6M9 12h6",
    film: "M3 4h18v16H3zM7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4",
    lang: "M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c0 4-3 7-7 8M13 21l4-10 4 10M14.5 17h5",
    star: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z",
    flag: "M5 21V4M5 4h11l-2 4 2 4H5",
    wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    up: "M12 19V5M6 11l6-6 6 6",
    down: "M12 5v14M6 13l6 6 6-6",
    zoomin: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4M8 11h6M11 8v6",
    zoomout: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4M8 11h6",
    ladder: "M7 3v18M17 3v18M7 7h10M7 12h10M7 17h10",
  };
  const ico = (name, cls = "") => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[name] || IC.info}"/></svg>`;
  const icoEl = (name, cls) => { const s = doc.createElement("span"); s.innerHTML = ico(name, cls); return s.firstChild; };

  /* ---------- rich text ----------
     **bold**, lines "- " => list, "1. " => ordered list, [[lessonId]] or [[lessonId|label]] => link,
     ((term)) or ((key|shown)) => glossary popover, blank line => paragraph. Input is escaped first. */
  function inline(s) {
    let x = esc(s);
    x = x.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    x = x.replace(/\[\[([a-z0-9_]+)(?:\|([^\]]+))?\]\]/gi, (m, id, lab) => {
      const ls = A.byId[id];
      const text = lab || (ls ? L(ls.title) : id);
      const href = ls ? "#lesson-" + id : A.labsById && A.labsById[id] ? "#lab-" + id : A.routes.some((r) => r.id === id) ? "#" + id : "#home";
      return `<a class="xl" href="${href}">${text}</a>`;
    });
    x = x.replace(/\(\(([^)|]+)(?:\|([^)]+))?\)\)/g, (m, key, shown) => {
      const g = A.glossById && A.glossById[key.trim()];
      const label = shown || (g ? L(g.term) : key);
      return g ? `<button type="button" class="term" data-term="${esc(key.trim())}">${label}</button>` : label;
    });
    return x;
  }
  function rich(s) {
    if (!s) return "";
    const blocks = String(s).split(/\n{2,}/);
    return blocks.map((b) => {
      const lines = b.split("\n");
      if (lines.every((l) => /^\s*-\s+/.test(l))) return "<ul>" + lines.map((l) => "<li>" + inline(l.replace(/^\s*-\s+/, "")) + "</li>").join("") + "</ul>";
      if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l))) return "<ol>" + lines.map((l) => "<li>" + inline(l.replace(/^\s*\d+[.)]\s+/, "")) + "</li>").join("") + "</ol>";
      return "<p>" + lines.map(inline).join("<br>") + "</p>";
    }).join("");
  }

  /* ---------- Arabic-aware search normalisation ---------- */
  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/[ً-ٰٟـ]/g, "")
      .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
      .replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  }

  /* ---------- toast & dialogs ---------- */
  function toast(msg, icon = "check") {
    let z = $(".toast-zone");
    if (!z) { z = h("div", { class: "toast-zone", role: "status", "aria-live": "polite" }); doc.body.append(z); }
    const el = h("div", { class: "toast", html: ico(icon) + "<span>" + esc(msg) + "</span>" });
    z.append(el);
    setTimeout(() => el.remove(), 2600);
  }
  let lastFocus = null;
  function openDialog({ title, body, cls = "", wide = false, onClose }) {
    closeDialog();
    lastFocus = doc.activeElement;
    const ov = h("div", { class: "overlay " + cls, role: "presentation" });
    const dl = h("div", { class: "dialog", role: "dialog", "aria-modal": "true", "aria-label": title || "" });
    if (wide) dl.style.width = "min(1000px,100%)";
    if (title != null) {
      const head = h("div", { class: "dialog-h" }, h("h2", null, title), h("button", { class: "ibtn", "aria-label": t("close"), html: ico("x"), onclick: closeDialog }));
      dl.append(head);
    }
    const b = h("div", { class: "dialog-b" });
    if (typeof body === "string") b.innerHTML = body; else if (body) b.append(body);
    dl.append(b);
    ov.append(dl);
    ov.addEventListener("mousedown", (e) => { if (e.target === ov) closeDialog(); });
    ov._onClose = onClose;
    doc.body.append(ov);
    const f = dl.querySelector("input,button,[href],select,textarea,[tabindex]:not([tabindex='-1'])");
    (f || dl).focus();
    return { ov, dl, body: b };
  }
  function closeDialog() {
    const ov = $(".overlay");
    if (!ov) return;
    ov._onClose && ov._onClose();
    ov.remove();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function confirmBox(msg, okLabel, onOk) {
    const body = h("div", { class: "stack" },
      h("p", null, msg),
      h("div", { class: "row" },
        h("button", { class: "btn danger", onclick: () => { closeDialog(); onOk(); } }, okLabel),
        h("button", { class: "btn ghost", onclick: closeDialog }, t("cancel"))));
    openDialog({ title: t("confirm"), body });
  }
  doc.addEventListener("keydown", (e) => {
    const ov = $(".overlay");
    if (!ov) return;
    if (e.key === "Escape") { e.preventDefault(); closeDialog(); }
    if (e.key === "Tab") {
      const f = $$("input,button,[href],select,textarea,[tabindex]:not([tabindex='-1'])", ov).filter((x) => !x.disabled && x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- copy ---------- */
  async function copyText(text, el) {
    try { await navigator.clipboard.writeText(text); toast(t("copied")); }
    catch (e) {
      const ta = h("textarea", { class: "sr-only" }); ta.value = text; doc.body.append(ta); ta.select();
      let ok = false; try { ok = doc.execCommand("copy"); } catch (_) {}
      ta.remove();
      if (ok) toast(t("copied")); else { if (el) { const r = doc.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } toast(t("copyManual"), "info"); }
    }
  }

  /* ---------- book page viewer (embedded page images) ---------- */
  let pageCache = null;
  function pageImg(n) {
    if (!pageCache) {
      try { const el = doc.getElementById("book-pages"); pageCache = el ? JSON.parse(el.textContent) : {}; } catch (e) { pageCache = {}; }
    }
    return pageCache[n] || null;
  }
  function openPage(n) {
    n = clamp(Number(n) || 1, 1, A.meta.pages);
    const cov = A.coverage.find((c) => c.p === n);
    const box = h("div", { class: "stack pageview" });
    const nav = h("div", { class: "row" },
      h("button", { class: "btn sm", disabled: n <= 1 || null, onclick: () => openPage(n - 1), html: ico(lang() === "ar" ? "next" : "prev") + t("prevPage") }),
      h("span", { class: "chip book num" }, t("pageN", { n })),
      h("button", { class: "btn sm", disabled: n >= A.meta.pages || null, onclick: () => openPage(n + 1), html: t("nextPage") + ico(lang() === "ar" ? "prev" : "next") }),
      h("a", { class: "btn sm ghost", href: A.meta.pdf + "#page=" + n, target: "_blank", rel: "noopener", html: ico("ext") + t("openPdf") }));
    box.append(nav);
    if (cov) {
      const ls = (cov.lessons || []).map((id) => A.byId[id]).filter(Boolean);
      box.append(h("div", { class: "note bk", html: ico("book") + "<div><b>" + esc(L(cov.title)) + "</b><div class='small'>" + esc(L(cov.sum)) + "</div></div>" }));
      if (ls.length) box.append(h("div", { class: "row" }, h("span", { class: "small muted" }, t("explainedIn")), ...ls.map((l) => h("a", { class: "chip", href: "#lesson-" + l.id, onclick: closeDialog }, L(l.title)))));
    }
    const src = pageImg(n);
    if (src) box.append(h("img", { src, alt: t("pageAlt", { n }), loading: "lazy", width: "820", height: "1159" }));
    else box.append(h("div", { class: "empty", html: ico("page") + "<p>" + esc(t("pageMissing")) + "</p>" }));
    openDialog({ title: t("bookPage"), body: box, cls: "pages" });
  }

  /* ---------- glossary popover ---------- */
  let pop = null;
  function closePop() { if (pop) { pop.remove(); pop = null; } }
  doc.addEventListener("click", (e) => {
    const tb = e.target.closest && e.target.closest(".term");
    if (tb) {
      e.preventDefault();
      closePop();
      const g = A.glossById[tb.dataset.term];
      if (!g) return;
      pop = h("div", { class: "popover", role: "tooltip", html: "<b>" + esc(L(g.term)) + (g.en_term ? " · <span class='ltr'>" + esc(g.en_term) + "</span>" : "") + "</b>" + esc(L(g.def)) + "<div style='margin-top:6px'><a href='#glossary-" + esc(g.id) + "' class='small'>" + esc(t("openGlossary")) + "</a></div>" });
      pop._y = scrollY;
      doc.body.append(pop);
      const r = tb.getBoundingClientRect();
      const w = Math.min(320, innerWidth - 24);
      pop.style.width = w + "px";
      pop.style.left = clamp(r.left + r.width / 2 - w / 2, 12, innerWidth - w - 12) + "px";
      const top = r.bottom + 8;
      pop.style.top = (top + 160 > innerHeight ? Math.max(12, r.top - 8 - pop.offsetHeight) : top) + "px";
      return;
    }
    if (pop && !e.target.closest(".popover")) closePop();
    const pb = e.target.closest && e.target.closest("[data-page]");
    if (pb) { e.preventDefault(); openPage(pb.dataset.page); }
  });
  addEventListener("scroll", () => { if (pop && Math.abs(scrollY - pop._y) > 60) closePop(); }, { passive: true });

  /* ---------- search ---------- */
  let index = null;
  function buildIndex() {
    const items = [];
    const both = (o) => (o ? (o.ar || "") + " " + (o.en || "") : "");
    for (const l of A.lessons) {
      const parts = [both(l.title), both(l.sum), ...(l.book || []).map(both)];
      for (const g of Object.values(l.levels || {})) for (const s of g) parts.push(both(s));
      if (l.case) parts.push(both(l.case.title), ...Object.values(l.case.steps || {}).map(both));
      items.push({ type: "lesson", id: l.id, href: "#lesson-" + l.id, title: l.title, sub: l.sum, icon: "book", hay: norm(parts.join(" ")), th: norm(both(l.title)) });
    }
    for (const p of A.prompts) items.push({ type: "prompt", id: p.id, href: "#prompts-" + p.id, title: p.title, sub: p.goal, icon: "msg", hay: norm([both(p.title), both(p.goal), both(p.text)].join(" ")), th: norm(both(p.title)) });
    for (const g of A.glossary) items.push({ type: "term", id: g.id, href: "#glossary-" + g.id, title: { ar: g.term.ar + (g.en_term ? " · " + g.en_term : ""), en: g.term.en + (g.en_term && g.en_term !== g.term.en ? " · " + g.en_term : "") }, sub: g.def, icon: "abc", hay: norm([both(g.term), g.en_term, both(g.def)].join(" ")), th: norm(both(g.term) + " " + (g.en_term || "")) });
    for (const lb of A.labs) items.push({ type: "lab", id: lb.id, href: "#lab-" + lb.id, title: lb.title, sub: lb.sum, icon: "flask", hay: norm([both(lb.title), both(lb.sum)].join(" ")), th: norm(both(lb.title)) });
    for (const c of A.coverage) items.push({ type: "page", id: "p" + c.p, page: c.p, title: { ar: "ص " + c.p + " — " + c.title.ar, en: "Page " + c.p + " — " + c.title.en }, sub: c.sum, icon: "page", hay: norm([both(c.title), both(c.sum), "صفحه " + c.p, "ص " + c.p, "page " + c.p].join(" ")), th: norm(both(c.title)) });
    for (const r of A.routes) items.push({ type: "nav", id: r.id, href: "#" + r.id, title: r.label, sub: r.desc, icon: r.icon, hay: norm(both(r.label) + " " + both(r.desc)), th: norm(both(r.label)) });
    return items;
  }
  function search(q, limit = 40) {
    index ||= buildIndex();
    const nq = norm(q);
    if (!nq) return [];
    const toks = nq.split(" ").filter(Boolean);
    const out = [];
    for (const it of index) {
      let score = 0, ok = true;
      for (const tk of toks) {
        if (!it.hay.includes(tk)) { ok = false; break; }
        score += it.th.includes(tk) ? 6 : 1;
        if (it.th.startsWith(tk)) score += 3;
      }
      if (ok) out.push({ it, score: score + ({ nav: 2, lesson: 1.5, lab: 1.2, term: 1, prompt: .8, page: .5 }[it.type] || 0) });
    }
    return out.sort((a, b) => b.score - a.score).slice(0, limit).map((x) => x.it);
  }
  function mark(text, q) {
    const s = esc(text);
    const toks = String(q || "").trim().split(/\s+/).filter((x) => x.length > 1).map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!toks.length) return s;
    try { return s.replace(new RegExp("(" + toks.join("|") + ")", "gi"), "<mark>$1</mark>"); } catch (e) { return s; }
  }
  function openPalette(initial = "") {
    const input = h("input", { type: "search", id: "pal-q", placeholder: t("searchPh"), "aria-label": t("search"), autocomplete: "off", "aria-controls": "pal-res" });
    const res = h("div", { class: "pal-res", id: "pal-res", role: "listbox" });
    const wrap = h("div", null,
      h("div", { class: "pal-in", html: ico("search") }, input),
      res,
      h("div", { class: "pal-foot", html: `<span><kbd>↑</kbd> <kbd>↓</kbd> ${esc(t("palMove"))}</span><span><kbd>Enter</kbd> ${esc(t("palOpen"))}</span><span><kbd>Esc</kbd> ${esc(t("close"))}</span>` }));
    const d = openDialog({ title: null, body: wrap, cls: "palette" });
    d.body.style.padding = "0";
    let sel = 0, items = [];
    const groups = { nav: "grpNav", lesson: "grpLessons", lab: "grpLabs", prompt: "grpPrompts", term: "grpTerms", page: "grpPages" };
    function draw() {
      const q = input.value;
      items = q.trim() ? search(q) : A.routes.slice(0, 9).map((r) => ({ type: "nav", href: "#" + r.id, title: r.label, sub: r.desc, icon: r.icon }));
      res.innerHTML = "";
      if (!items.length) { res.append(h("div", { class: "empty", html: ico("search") + "<p>" + esc(t("noResults")) + "</p>" })); return; }
      let lastType = null;
      items.forEach((it, i) => {
        if (it.type !== lastType) { res.append(h("div", { class: "pal-g" }, t(groups[it.type] || "grpNav"))); lastType = it.type; }
        const a = h("a", { class: "pal-item", role: "option", id: "pal-" + i, "aria-selected": i === sel ? "true" : "false", href: it.href || "#", html: ico(it.icon) + "<div><b>" + mark(L(it.title), q) + "</b><small>" + mark(L(it.sub).slice(0, 140), q) + "</small></div>" });
        a.addEventListener("click", (e) => { if (it.page) { e.preventDefault(); closeDialog(); openPage(it.page); } else closeDialog(); });
        a.addEventListener("mousemove", () => { if (sel !== i) { sel = i; mark2(); } });
        res.append(a);
      });
    }
    function mark2() { $$(".pal-item", res).forEach((a, i) => a.setAttribute("aria-selected", i === sel ? "true" : "false")); const cur = $("#pal-" + sel); cur && cur.scrollIntoView({ block: "nearest" }); input.setAttribute("aria-activedescendant", "pal-" + sel); }
    input.addEventListener("input", () => { sel = 0; draw(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(items.length - 1, sel + 1); mark2(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(0, sel - 1); mark2(); }
      else if (e.key === "Enter") { const a = $("#pal-" + sel); if (a) { e.preventDefault(); a.click(); if (!items[sel].page) location.hash = items[sel].href; } }
    });
    input.value = initial;
    draw();
    input.focus();
  }

  /* ---------- router ---------- */
  const views = {};
  A.view = (name, fn) => (views[name] = fn);
  let cleanup = [];
  A.onLeave = (fn) => cleanup.push(fn);
  function parse() {
    const raw = decodeURIComponent((location.hash || "#home").slice(1));
    const i = raw.indexOf("-");
    return i < 0 ? { name: raw || "home", arg: "" } : { name: raw.slice(0, i), arg: raw.slice(i + 1) };
  }
  function route() {
    cleanup.forEach((f) => { try { f(); } catch (e) {} });
    cleanup = [];
    closePop();
    if ($(".overlay")) closeDialog();
    let { name, arg } = parse();
    if (!views[name]) { name = "home"; arg = ""; }
    const main = $("#main");
    main.innerHTML = "";
    try { views[name](main, arg); }
    catch (e) {
      console.error(e);
      main.innerHTML = "";
      main.append(h("div", { class: "wrap" }, h("div", { class: "note bad", html: ico("info") + "<div><b>" + esc(t("errTitle")) + "</b><p>" + esc(t("errBody")) + "</p></div>" }), h("p", null, h("a", { class: "btn", href: "#home" }, t("home")))));
    }
    A.current = { name, arg };
    markNav();
    doc.body.classList.remove("nav-open");
    const restore = A._restoreScroll; A._restoreScroll = null;
    scrollTo({ top: restore || 0, behavior: "instant" });
    const h1 = main.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
    updateReadbar();
    A.emit("route", A.current);
  }
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }

  /* ---------- shell ---------- */
  function progress() {
    const total = A.lessons.length;
    const done = A.lessons.filter((l) => memory.done[l.id]).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }
  function needsReview(id) {
    return A.quiz.some((q) => q.lesson === id && memory.quiz[q.id] && memory.quiz[q.id].ok === false);
  }
  function renderBar() {
    const bar = $("#bar");
    const lv = memory.level;
    const p = progress();
    const themeIcon = memory.theme === "dark" ? "moon" : memory.theme === "light" ? "sun" : "auto";
    const themeLbl = t("theme_" + memory.theme);
    bar.innerHTML = `
      <button class="ibtn menu-btn" id="menu-btn" aria-label="${esc(t("menu"))}" aria-controls="side" aria-expanded="${doc.body.classList.contains("nav-open")}">${ico("menu")}</button>
      <a class="brand" href="#home" aria-label="${esc(t("home"))}">
        <span class="brand-mark">${A.logo}</span>
        <span class="brand-txt"><b>${esc(t("brand"))}</b><small>${esc(t("brandSub"))}</small></span>
      </a>
      <span class="bar-spacer"></span>
      <button class="watchbtn" id="watch-btn" aria-label="${esc(t("tourTitle"))}" title="${esc(t("tourTitle"))}">${ico("play")}<span>${esc(t("tourBtn"))}</span></button>
      <button class="searchbtn" id="search-btn" aria-label="${esc(t("search"))}">${ico("search")}<span class="t">${esc(t("searchShort"))}</span><kbd>Ctrl K</kbd></button>
      <div class="levelseg hide-sm" role="group" aria-label="${esc(t("levelPick"))}">
        ${A.levels.map((x) => `<button type="button" data-level="${x.id}" aria-pressed="${lv === x.id}" title="${esc(L(x.desc))}"><span class="e" aria-hidden="true">${x.e}</span><span class="t">${esc(L(x.name))}</span></button>`).join("")}
      </div>
      <a class="prog" href="#path" title="${esc(t("progressTitle", { d: p.done, t: p.total }))}" aria-label="${esc(t("progressTitle", { d: p.done, t: p.total }))}"><span class="ring" style="--p:${p.pct}"></span><b class="num">${p.pct}%</b></a>
      <a class="ibtn hide-sm" href="#knowledge" aria-label="${esc(t("nav_knowledge"))}" title="${esc(t("nav_knowledge"))}">${ico("graph")}</a>
      <a class="ibtn" href="#notebook" aria-label="${esc(t("nav_notebook"))}" title="${esc(t("nav_notebook"))}">${ico("note")}</a>
      <button class="ibtn" id="lang-btn" aria-label="${esc(t("switchLang"))}" title="${esc(t("switchLang"))}">${ico("lang")}<span class="lbl">${lang() === "ar" ? "EN" : "ع"}</span></button>
      <button class="ibtn" id="theme-btn" aria-label="${esc(t("themeBtn") + ": " + themeLbl)}" title="${esc(t("themeBtn") + ": " + themeLbl)}">${ico(themeIcon)}</button>`;
    $("#menu-btn").onclick = () => { doc.body.classList.toggle("nav-open"); $("#menu-btn").setAttribute("aria-expanded", doc.body.classList.contains("nav-open")); };
    $("#search-btn").onclick = () => openPalette();
    $("#watch-btn").onclick = openTour;
    $$("[data-level]", bar).forEach((b) => (b.onclick = () => { S.set("level", b.dataset.level); renderBar(); A.emit("level", b.dataset.level); }));
    $("#lang-btn").onclick = () => { S.set("lang", lang() === "ar" ? "en" : "ar"); index = null; applyLang(); renderAll(); };
    $("#theme-btn").onclick = () => { const order = ["auto", "light", "dark"]; S.set("theme", order[(order.indexOf(memory.theme) + 1) % 3]); applyTheme(); renderBar(); toast(t("themeBtn") + ": " + t("theme_" + memory.theme), memory.theme === "dark" ? "moon" : memory.theme === "light" ? "sun" : "auto"); };
  }
  // the 15 s tour video lives next to the HTML file and loads only when asked for (nothing is fetched at start-up);
  // an offline copy without the file gets a plain message instead of a broken player
  const TOUR = "AI_Academy_tour.mp4";
  function openTour() {
    const v = h("video", { class: "tour-v", src: TOUR, controls: "", autoplay: "", playsinline: "", preload: "auto" });
    v.onerror = () => v.replaceWith(h("p", { class: "tour-miss" }, t("tourMissing")));
    openDialog({ title: t("tourTitle"), body: v, cls: "tour" });
    const p = v.play(); if (p && p.catch) p.catch(() => {});
  }
  const openGroups = new Set(["start", "units", "practice", "reference", "tools"]);
  function renderSide() {
    const side = $("#side");
    const last = memory.last && A.byId[memory.last];
    const grp = (id, label, inner) => `
      <div class="side-sec"><button class="side-h" aria-expanded="${openGroups.has(id)}" data-grp="${id}">${esc(label)}${ico("chev", "chev")}</button>
      <div ${openGroups.has(id) ? "" : "hidden"} data-grp-body="${id}">${inner}</div></div>`;
    const navItems = (ids) => `<ul class="nav">${ids.map((id) => { const r = A.routes.find((x) => x.id === id); return `<li><a href="#${id}" data-nav="${id}">${ico(r.icon)}<span>${esc(L(r.label))}</span>${r.count ? `<span class="cnt num">${r.count()}</span>` : ""}</a></li>`; }).join("")}</ul>`;
    const units = A.units.map((u) => {
      const ls = A.lessons.filter((l) => l.unit === u.id);
      const done = ls.filter((l) => memory.done[l.id]).length;
      const open = A._openUnits.has(u.id);
      return `<div class="unit-g" style="--uc:${u.color}">
        <button class="unit-t" aria-expanded="${open}" data-unit="${u.id}"><span class="ub">${esc(u.badge)}</span><span>${esc(L(u.short))}</span><span class="cnt small muted num" style="margin-inline-start:auto">${done}/${ls.length}</span>${ico("chev", "chev")}</button>
        <ul class="unit-l" ${open ? "" : "hidden"}>
          <li><a href="#unit-${u.id}" data-nav="unit-${u.id}"><span class="dot" style="border-color:${u.color}"></span><span>${esc(t("unitOverview"))}</span></a></li>
          ${ls.map((l) => `<li><a href="#lesson-${l.id}" data-nav="lesson-${l.id}"><span class="dot ${memory.done[l.id] ? "done" : needsReview(l.id) ? "rev" : ""}" aria-hidden="true"></span><span>${esc(L(l.title))}</span><span class="sr-only">${memory.done[l.id] ? esc(t("doneSr")) : ""}</span></a></li>`).join("")}
        </ul></div>`;
    }).join("");
    side.innerHTML = `
      ${last ? `<a class="continue" href="#lesson-${last.id}">${ico("play")}<span><small>${esc(t("continueLast"))}</small><b>${esc(L(last.title))}</b></span></a>` : ""}
      ${grp("start", t("grpStart"), navItems(["home", "map", "path"]))}
      ${grp("units", t("grpUnits"), units)}
      ${grp("practice", t("grpPractice"), navItems(["labs", "prompts", "compare", "quiz", "project"]))}
      ${grp("reference", t("grpReference"), navItems(["glossary", "knowledge", "review", "coverage"]))}
      ${grp("tools", t("grpTools"), navItems(["present", "notebook"]))}
      <div class="side-foot">${esc(t("sideFoot"))}</div>`;
    $$("[data-grp]", side).forEach((b) => (b.onclick = () => {
      const id = b.dataset.grp; const body = $(`[data-grp-body="${id}"]`, side);
      const open = body.hidden; body.hidden = !open; b.setAttribute("aria-expanded", open);
      open ? openGroups.add(id) : openGroups.delete(id);
    }));
    $$("[data-unit]", side).forEach((b) => (b.onclick = () => {
      const id = b.dataset.unit; const list = b.nextElementSibling; const open = list.hidden;
      list.hidden = !open; b.setAttribute("aria-expanded", open);
      open ? A._openUnits.add(id) : A._openUnits.delete(id);
    }));
    markNav();
  }
  function markNav() {
    const cur = A.current ? (A.current.arg ? A.current.name + "-" + A.current.arg : A.current.name) : "home";
    $$("[data-nav]").forEach((a) => {
      const on = a.dataset.nav === cur || (A.current && a.dataset.nav === A.current.name && !a.dataset.nav.includes("-"));
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  function updateReadbar() {
    const i = $("#readbar i");
    if (!i) return;
    const max = doc.documentElement.scrollHeight - innerHeight;
    i.style.width = (max > 40 ? clamp((scrollY / max) * 100, 0, 100) : 0) + "%";
  }
  addEventListener("scroll", () => requestAnimationFrame(updateReadbar), { passive: true });
  function renderAll() {
    renderBar();
    renderSide();
    route();
  }

  /* ---------- export / import ---------- */
  function exportData(kind = "json") {
    const data = S.all();
    let text, name, type;
    if (kind === "md") {
      const lines = ["# " + t("brand") + " — " + t("nav_notebook"), ""];
      const p = progress();
      lines.push(t("progressTitle", { d: p.done, t: p.total }), "");
      for (const l of A.lessons) {
        const n = data.notes[l.id];
        const bm = data.bookmarks.includes(l.id);
        if (!n && !bm) continue;
        lines.push("## " + L(l.title) + (bm ? " ★" : ""), "", n || "", "");
      }
      if (data.saved.length) { lines.push("## " + t("savedPrompts"), ""); for (const id of data.saved) { const pr = A.promptsById[id]; if (pr) lines.push("### " + L(pr.title), "", L(pr.text), ""); } }
      text = lines.join("\n"); name = "ai-academy-notes.md"; type = "text/markdown";
    } else { text = JSON.stringify({ app: "ai-academy", version: 1, exported: new Date().toISOString(), data }, null, 2); name = "ai-academy-progress.json"; type = "application/json"; }
    try {
      const url = URL.createObjectURL(new Blob([text], { type }));
      const a = h("a", { href: url, download: name }); doc.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      toast(t("exported"));
    } catch (e) { /* downloads blocked (e.g. sandboxed viewer): show text to copy */ }
    return text;
  }
  function importData(file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        const d = obj && obj.data ? obj.data : obj;
        if (!d || typeof d !== "object" || !("done" in d)) throw new Error("bad");
        S.replace(d); applyLang(); applyTheme(); renderAll(); toast(t("imported"));
      } catch (e) { toast(t("importFail"), "info"); }
    };
    r.readAsText(file);
  }

  /* ---------- boot ---------- */
  function boot() {
    load();
    A.byId = Object.fromEntries(A.lessons.map((l) => [l.id, l]));
    A.unitById = Object.fromEntries(A.units.map((u) => [u.id, u]));
    A.promptsById = Object.fromEntries(A.prompts.map((p) => [p.id, p]));
    A.glossById = Object.fromEntries(A.glossary.map((g) => [g.id, g]));
    A.labsById = Object.fromEntries(A.labs.map((l) => [l.id, l]));
    A.sceneById = Object.fromEntries(A.scenes.map((s) => [s.id, s]));
    A._openUnits = new Set();
    const cur = parse();
    if (cur.name === "lesson" && A.byId[cur.arg]) A._openUnits.add(A.byId[cur.arg].unit);
    else if (cur.name === "unit") A._openUnits.add(cur.arg);
    else A._openUnits.add(A.units[0].id);
    applyLang(); applyTheme();
    renderBar(); renderSide();
    addEventListener("hashchange", () => {
      const c = parse();
      if (c.name === "lesson" && A.byId[c.arg] && !A._openUnits.has(A.byId[c.arg].unit)) { A._openUnits.add(A.byId[c.arg].unit); renderSide(); }
      route();
    });
    A.on("state", (k) => { if (k === "done" || k === "quiz") { renderBar(); renderSide(); } });
    doc.addEventListener("keydown", (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(doc.activeElement.tagName) || doc.activeElement.isContentEditable;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPalette(); }
      else if (e.key === "/" && !typing && !$(".overlay") && !$(".present")) { e.preventDefault(); openPalette(); }
    });
    $("#scrim").onclick = () => doc.body.classList.remove("nav-open");
    route();
  }

  Object.assign(A, { esc, $, $$, h, clamp, debounce, reduceMotion, S, L, t, lang, ico, icoEl, rich, inline, norm, toast, openDialog, closeDialog, confirmBox, copyText, openPage, search, openPalette, go, progress, needsReview, renderBar, renderSide, exportData, importData, boot, mark });
})(window.ACADEMY = window.ACADEMY || {});
