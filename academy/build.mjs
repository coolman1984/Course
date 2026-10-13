// Builds the single-file academy: inlines CSS, the Cairo font, images, book-page previews, data and engine.
// Usage: node build.mjs   →   AI-Essentials-Academy.html (next to this file)
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const src = (...p) => join(root, "src", ...p);
const b64 = (p) => readFileSync(p).toString("base64");

const ENGINE_BEFORE_DATA = ["core.js"];
const ENGINE_AFTER_DATA = ["shell.js", "search.js", "scenes.js", "labs-a.js", "labs-b.js", "views-main.js", "views-tools.js", "quiz.js", "main.js"];
// Data files only register content (no cross-file work at load time), so alphabetical order is enough:
// lesson order inside a unit follows file name then position in the file (u1a before u1b).
const present = readdirSync(src("data")).filter((f) => f.endsWith(".js")).sort();

const images = {};
for (const f of readdirSync(src("assets")).filter((f) => f.endsWith(".webp"))) images[f.replace(".webp", "")] = "data:image/webp;base64," + b64(src("assets", f));
const pages = {};
for (const f of readdirSync(src("pages")).filter((f) => f.endsWith(".webp"))) pages[+f.match(/\d+/)[0]] = "data:image/webp;base64," + b64(src("pages", f));

const js = [
  "/* AI Essentials Academy — single-file build. Source: academy/src (edit there, then run node build.mjs). */",
  ...ENGINE_BEFORE_DATA.map((f) => `/* engine/${f} */\n` + readFileSync(src("engine", f), "utf8")),
  "ACAD.img = " + JSON.stringify(images) + ";",
  'ACAD.pdfPath = "../AI_Essentials_Course_For_Modern_Workspace.pdf";',
  ...present.map((f) => `/* data/${f} */\n` + readFileSync(src("data", f), "utf8")),
  ...ENGINE_AFTER_DATA.map((f) => `/* engine/${f} */\n` + readFileSync(src("engine", f), "utf8")),
].join("\n;\n");

const css = readFileSync(src("styles.css"), "utf8").replace("__FONT_CAIRO__", "data:font/woff2;base64," + b64(src("assets", "cairo.woff2")));
let html = readFileSync(src("index.html"), "utf8");
if (js.includes("</script")) throw new Error("A source file contains </script — escape it.");
html = html.replace("/*__CSS__*/", () => css).replace("/*__PAGES__*/", () => JSON.stringify(pages)).replace("/*__JS__*/", () => js);
const out = join(root, "AI-Essentials-Academy.html");
writeFileSync(out, html);
console.log(`built ${out} — ${(statSync(out).size / 1048576).toFixed(2)} MB, ${present.length} data files, ${Object.keys(pages).length} page previews`);
