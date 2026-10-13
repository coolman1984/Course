/* Core: namespace, DOM helpers, i18n, safe mini-markdown, storage, toasts, icons. */
"use strict";
const ACAD = window.ACAD || (window.ACAD = {});
ACAD.units = ACAD.units || []; ACAD.lessons = ACAD.lessons || []; ACAD.prompts = ACAD.prompts || [];
ACAD.glossary = ACAD.glossary || []; ACAD.quizzes = ACAD.quizzes || []; ACAD.compare = ACAD.compare || [];
ACAD.scenes = ACAD.scenes || {}; ACAD.labs = ACAD.labs || {}; ACAD.cases = ACAD.cases || [];
ACAD.L = (o) => ACAD.lessons.push(o);
ACAD.P = (o) => ACAD.prompts.push(o);

const App = ACAD.App = {};

/* ---------- DOM ---------- */
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) for (const k in attrs) {
    const v = attrs[k];
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v;
    else if (k === "text") el.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat(Infinity)) {
    if (kid == null || kid === false) continue;
    el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return el;
}
App.h = h;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
App.$ = $; App.$$ = $$;
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
App.esc = esc;

/* ---------- i18n ---------- */
App.lang = () => App.state.lang || "ar";
App.isAr = () => App.lang() === "ar";
/** Pick a localized value: {ar,en} objects, plain strings, or arrays pass through. */
function tr(v) {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return v;
  if (Array.isArray(v)) return v;
  return v[App.lang()] != null ? v[App.lang()] : (v.ar != null ? v.ar : v.en);
}
App.tr = tr;
const UI = ACAD.UI = {};
function t(key, vars) {
  const e = UI[key];
  let s = e ? (e[App.lang()] || e.ar) : key;
  if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
  return s;
}
App.t = t;
App.pct = (n) => (App.isAr() ? App.num(n) + "٪" : n + "%");
App.frac = (a, b) => (App.isAr() ? App.num(a) + " من " + App.num(b) : a + "/" + b);
App.num = (n, opts) => {
  try { return new Intl.NumberFormat(App.isAr() ? "ar-EG" : "en-US", opts).format(n); } catch (e) { return String(n); }
};

/* ---------- mini markdown (escape first, then a small whitelist of syntax) ---------- */
function inline(s) {
  s = esc(s);
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // page chips: {p7}, {p39-40}, {p8, p16}
  s = s.replace(/\{p(\d+(?:[-–]\d+)?(?:\s*[,،]\s*p?\d+(?:[-–]\d+)?)*)\}/g, (m, list) => list.split(/\s*[,،]\s*p?/).map((p) => {
    const parts = p.split(/[-–]/); const first = parts[0];
    return `<a class="pg" href="#/page/${first}" title="${esc(t("bookPage"))} ${p}">📖 ${t("pShort")} ${App.num(+first)}${parts[1] ? "–" + App.num(+parts[1]) : ""}</a>`;
  }).join(""));
  s = s.replace(/\[\[(t|l|lab|scene|p|q):([\w-]+)\|([^\]]+)\]\]/g, (m, kind, id, label) => {
    if (kind === "t") return `<button type="button" class="term" data-term="${id}">${label}</button>`;
    const href = kind === "q" && id === "project" ? "#/project" : { l: "#/lesson/", lab: "#/lab/", scene: "#/scenes/", p: "#/prompts/", q: "#/quiz/" }[kind] + id;
    return `<a class="xref" href="${href}">${label}</a>`;
  });
  return s;
}
function md(src) {
  if (!src) return "";
  const lines = String(src).replace(/\r/g, "").trim().split("\n");
  let out = "", list = null, para = [], table = null;
  const flushPara = () => { if (para.length) { out += "<p>" + inline(para.join(" ")) + "</p>"; para = []; } };
  const flushList = () => { if (list) { out += `<${list.t}>` + list.items.map((i) => "<li>" + inline(i) + "</li>").join("") + `</${list.t}>`; list = null; } };
  const flushTable = () => {
    if (table) {
      const rows = table.filter((r) => !/^\s*\|?\s*:?-{2,}/.test(r)).map((r) => r.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim()));
      out += "<table><thead><tr>" + rows[0].map((c) => "<th>" + inline(c) + "</th>").join("") + "</tr></thead><tbody>" +
        rows.slice(1).map((r) => "<tr>" + r.map((c) => "<td>" + inline(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table>";
      table = null;
    }
  };
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) { flushPara(); flushList(); flushTable(); continue; }
    if (l.startsWith("|")) { flushPara(); flushList(); (table = table || []).push(l); continue; } else flushTable();
    let m;
    if ((m = l.match(/^##\s+(.*)/))) { flushPara(); flushList(); out += "<h4>" + inline(m[1]) + "</h4>"; continue; }
    if ((m = l.match(/^>\s?(.*)/))) { flushPara(); flushList(); out += "<blockquote>" + inline(m[1]) + "</blockquote>"; continue; }
    if ((m = l.match(/^[-•]\s+(.*)/))) { flushPara(); if (!list || list.t !== "ul") { flushList(); list = { t: "ul", items: [] }; } list.items.push(m[1]); continue; }
    if ((m = l.match(/^\d+[.)]\s+(.*)/))) { flushPara(); if (!list || list.t !== "ol") { flushList(); list = { t: "ol", items: [] }; } list.items.push(m[1]); continue; }
    flushList(); para.push(l);
  }
  flushPara(); flushList(); flushTable();
  return out;
}
App.md = md; App.inline = inline;
App.mdLoc = (v) => md(tr(v));
App.strip = (s) => String(tr(s) || "").replace(/\{p[\dp–,، -]+\}/g, "").replace(/\[\[\w+:[\w-]+\|([^\]]+)\]\]/g, "$1").replace(/[*`#>|]/g, " ").replace(/\s+/g, " ").trim();

/* ---------- storage (localStorage with safe fallback) ---------- */
const KEY = "ai-essentials-academy.v1";
const DEFAULTS = () => ({ v: 1, lang: "ar", theme: "auto", level: "simple", lessons: {}, quizzes: {}, notes: {}, bookmarks: [], saved: [], labs: {}, predicts: {}, project: {}, last: null });
App.storageOk = true;
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS();
    const s = JSON.parse(raw);
    return Object.assign(DEFAULTS(), s && typeof s === "object" ? s : {});
  } catch (e) { App.storageOk = false; return DEFAULTS(); }
}
App.state = load();
let saveTimer = null;
App.save = (now) => {
  clearTimeout(saveTimer);
  const doSave = () => {
    try { localStorage.setItem(KEY, JSON.stringify(App.state)); App.storageOk = true; }
    catch (e) { if (App.storageOk) { App.storageOk = false; App.toast(t("storageFail")); } }
  };
  if (now) doSave(); else saveTimer = setTimeout(doSave, 250);
};
window.addEventListener("pagehide", () => App.save(true));
App.resetAll = () => { const keep = { lang: App.state.lang, theme: App.state.theme }; App.state = Object.assign(DEFAULTS(), keep); App.save(true); };
App.exportData = () => {
  const blob = new Blob([JSON.stringify({ app: "ai-essentials-academy", exported: new Date().toISOString(), data: App.state }, null, 2)], { type: "application/json" });
  const a = h("a", { href: URL.createObjectURL(blob), download: "academy-progress-" + new Date().toISOString().slice(0, 10) + ".json" });
  document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
};
App.importData = (text) => {
  const parsed = JSON.parse(text);
  const data = parsed && parsed.data ? parsed.data : parsed;
  if (!data || typeof data !== "object" || data.v !== 1 || typeof data.lessons !== "object") throw new Error("bad");
  App.state = Object.assign(DEFAULTS(), data); App.save(true);
};

/* ---------- progress helpers ---------- */
App.lessonState = (id) => App.state.lessons[id] || {};
App.markSeen = (id) => { const s = App.state.lessons[id] || (App.state.lessons[id] = {}); if (!s.seen) { s.seen = Date.now(); App.save(); } };
App.markDone = (id, on = true) => { const s = App.state.lessons[id] || (App.state.lessons[id] = {}); if (on) s.done = s.done || Date.now(); else delete s.done; App.save(); App.emit("progress"); };
App.progress = (unitId) => {
  const ls = ACAD.lessons.filter((l) => !unitId || l.unit === unitId);
  const done = ls.filter((l) => App.lessonState(l.id).done).length;
  return { done, total: ls.length, pct: ls.length ? Math.round((done / ls.length) * 100) : 0 };
};
App.isBookmarked = (type, id) => App.state.bookmarks.some((b) => b.type === type && b.id === id);
App.toggleBookmark = (type, id) => {
  const i = App.state.bookmarks.findIndex((b) => b.type === type && b.id === id);
  if (i >= 0) App.state.bookmarks.splice(i, 1); else App.state.bookmarks.unshift({ type, id, ts: Date.now() });
  App.save(); App.emit("bookmarks"); return i < 0;
};

/* ---------- events ---------- */
const listeners = {};
App.on = (ev, fn) => { (listeners[ev] = listeners[ev] || []).push(fn); return () => { listeners[ev] = (listeners[ev] || []).filter((f) => f !== fn); }; };
App.emit = (ev, d) => (listeners[ev] || []).forEach((fn) => { try { fn(d); } catch (e) { console.error(e); } });

/* ---------- toast ---------- */
let toastTimer;
App.toast = (msg) => {
  $$(".toast").forEach((x) => x.remove());
  const el = h("div", { class: "toast", role: "status" }, msg);
  document.body.append(el); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.remove(), 2600);
};
App.copy = async (text) => {
  try { await navigator.clipboard.writeText(text); App.toast(t("copied")); return true; }
  catch (e) {
    const ta = h("textarea", { style: { position: "fixed", opacity: "0" } }); ta.value = text; document.body.append(ta); ta.select();
    let ok = false; try { ok = document.execCommand("copy"); } catch (_) {}
    ta.remove(); App.toast(ok ? t("copied") : t("copyFail")); return ok;
  }
};

/* ---------- lookup ---------- */
App.unit = (id) => ACAD.units.find((u) => u.id === id);
App.lesson = (id) => ACAD.lessons.find((l) => l.id === id);
App.prompt = (id) => ACAD.prompts.find((p) => p.id === id);
App.term = (id) => ACAD.glossary.find((g) => g.id === id);
App.unitLessons = (uid) => ACAD.lessons.filter((l) => l.unit === uid);
App.ordered = () => ACAD.units.flatMap((u) => App.unitLessons(u.id));
App.reduced = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- icons (stroke icons drawn from primitive geometry, in the Apps Factory af-icons style) ---------- */
const ICONS = {
  home: "M3 11 12 3l9 8M5 9.5V20h5v-6h4v6h5V9.5", map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14",
  book: "M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4ZM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7Z", play: "M7 4 20 12 7 20Z",
  flask: "M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3M7 15h10", briefcase: "M3 8h18v12H3zM8 8V5h8v3M3 13h18",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7Z", scale: "M12 3v18M6 21h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0ZM19 7l-3 7a3 3 0 0 0 6 0Z",
  check: "M4 12l5 5L20 6", quiz: "M9 9a3 3 0 1 1 4.5 2.6c-.9.5-1.5 1.2-1.5 2.4M12 18h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
  abc: "M4 18 8 6l4 12M5.5 14h5M15 6h3a2.5 2.5 0 0 1 0 5h-3zM15 11h3.5a2.5 2.5 0 0 1 0 5H15z", star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z",
  graph: "M6 6m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M18 7m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M12 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M8 7.5l7.5-.3M7.3 8.3l3.6 7.4M16.8 9.2l-3.6 6.6",
  path: "M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 17h7a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h7",
  note: "M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h6", search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4",
  sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  moon: "M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z", menu: "M4 6h16M4 12h16M4 18h16", close: "M6 6l12 12M18 6 6 18",
  pages: "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM9 8h6M9 12h6M9 16h4", screen: "M3 4h18v12H3zM8 20h8M12 16v4",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5", bookmark: "M6 3h12v18l-6-4-6 4Z", copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 4.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 9h.1a2 2 0 1 1 0 4H21a1.7 1.7 0 0 0-1.6 2Z",
  pause: "M6 4h4v16H6zM14 4h4v16h-4z", replay: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5", prev: "M15 18l-6-6 6-6", next: "M9 18l6-6-6-6",
  full: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5", zoomout: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4M8 11h6",
  review: "M4 5h16M4 10h10M4 15h16M4 20h10", target: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0M12 12h.01",
  download: "M12 3v12M7 10l5 5 5-5M4 19h16", upload: "M12 21V9M7 14l5-5 5 5M4 5h16", trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  help: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5M12 17.5h.01", grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
};
App.icon = (name, size = 20) => {
  const d = ICONS[name] || ICONS.star;
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("width", size); svg.setAttribute("height", size);
  svg.setAttribute("fill", "none"); svg.setAttribute("stroke", "currentColor"); svg.setAttribute("stroke-width", "1.9");
  svg.setAttribute("stroke-linecap", "round"); svg.setAttribute("stroke-linejoin", "round"); svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("class", "ico");
  const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); svg.append(p);
  return svg;
};

/* ---------- shared small components ---------- */
App.srcBadge = (kind, pages) => {
  if (kind === "book") return h("span", { class: "badge book", title: t("fromBookTip") }, "📖 ", t("fromBook"), pages && pages.length ? " · " + t("pShort") + " " + pages.map((p) => App.num(p)).join("، ") : "");
  if (kind === "sim") return h("span", { class: "badge sim", title: t("simTip") }, "🧪 ", t("simulation"));
  return h("span", { class: "badge add", title: t("addTip") }, "✨ ", t("addition"));
};
App.pageLinks = (pages) => (pages || []).map((p) => h("a", { class: "pg", href: "#/page/" + p }, "📖 " + t("pShort") + " " + App.num(p)));
App.unitColor = (uid) => "var(--" + uid + ")";
App.debounce = (fn, ms) => { let tm; return (...a) => { clearTimeout(tm); tm = setTimeout(() => fn(...a), ms); }; };
App.fmtDate = (ts) => { try { return new Date(ts).toLocaleDateString(App.isAr() ? "ar-EG" : "en-GB", { day: "numeric", month: "short" }); } catch (e) { return ""; } };
