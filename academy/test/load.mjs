// Loads the academy's engine core + all data files (+ lab definitions) into a sandbox, without a browser.
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const src = (...p) => join(root, "src", ...p);
export const dataFiles = readdirSync(src("data")).filter((f) => f.endsWith(".js")).sort();
export const engineFiles = readdirSync(src("engine")).filter((f) => f.endsWith(".js"));

export function loadAcademy() {
  const stubEl = () => ({ style: {}, setAttribute() {}, append() {}, addEventListener() {}, classList: { add() {}, remove() {}, toggle() {} } });
  const ctx = {
    console, Intl, Math, JSON, Date, setTimeout, clearTimeout,
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    document: { createElement: stubEl, createElementNS: stubEl, createTextNode: () => ({}), querySelector: () => null, querySelectorAll: () => [], documentElement: stubEl(), addEventListener() {}, getElementById: () => null },
    location: { hash: "" }, addEventListener() {}, navigator: {},
  };
  ctx.window = ctx; vm.createContext(ctx);
  const run = (file) => vm.runInContext(readFileSync(file, "utf8"), ctx, { filename: file });
  run(src("engine", "core.js"));
  for (const f of dataFiles) run(src("data", f));
  for (const f of ["labs-a.js", "labs-b.js"]) run(src("engine", f));
  return ctx.ACAD;
}

/** Walks any value and yields every string found, with a path for error messages. */
export function* strings(v, path = "") {
  if (typeof v === "string") yield [path, v];
  else if (Array.isArray(v)) for (let i = 0; i < v.length; i++) yield* strings(v[i], path + "[" + i + "]");
  else if (v && typeof v === "object") for (const k in v) if (typeof v[k] !== "function") yield* strings(v[k], path + "." + k);
}
/** Yields every {ar, en} pair object. */
export function* pairs(v, path = "") {
  if (Array.isArray(v)) { for (let i = 0; i < v.length; i++) yield* pairs(v[i], path + "[" + i + "]"); return; }
  if (!v || typeof v !== "object") return;
  if ("ar" in v || "en" in v) { yield [path, v]; return; }
  for (const k in v) if (typeof v[k] !== "function") yield* pairs(v[k], path + "." + k);
}
