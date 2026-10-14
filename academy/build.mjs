#!/usr/bin/env node
// Builds the single-file academy: one HTML with styles, fonts, book data, engine and page images inlined.
// Usage: node academy/build.mjs [--fragment <path>]   (fragment = same page without <html>/<head>/<body>, for hosts that add them)
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "src");
const out = join(here, "..", "AI_Academy.html");
const read = (p) => readFileSync(join(src, p), "utf8");
const b64 = (p) => readFileSync(join(src, p)).toString("base64");

const DATA = ["data/ui.js", "data/meta.js", "data/stories.js", "data/scenes.js", "data/lessons-u0.js", "data/lessons-u1.js", "data/lessons-u2.js", "data/lessons-u3u4.js", "data/lessons-u5.js", "data/plain-talk-a.js", "data/plain-talk-b.js", "data/prompts.js", "data/quiz.js", "data/glossary.js", "data/compare.js"];
const ENGINE = ["engine/core.js", "engine/scene.js", "engine/render.js", "engine/quiz.js", "engine/labs.js", "engine/tools.js", "engine/motion.js"];

for (const f of [...DATA, ...ENGINE]) if (!existsSync(join(src, f))) throw new Error("Missing source file: " + f);

let css = read("styles.css") + "\n" + read("motion.css")
  .replace(/__FONT:([\w.-]+)__/g, (m, f) => "data:font/woff2;base64," + b64("fonts/" + f));

const pages = {};
for (const f of readdirSync(join(src, "pages")).filter((x) => /^p\d+\.webp$/.test(x)).sort()) pages[Number(f.slice(1, 3))] = "data:image/webp;base64," + b64("pages/" + f);

const guard = (s) => s.replace(/<\/script/gi, "<\\/script");
const dataJs = DATA.map((f) => `/* ${f} */\n${read(f)}`).join("\n");
const engineJs = ENGINE.map((f) => `/* ${f} */\n${read(f)}`).join("\n");
const boot = `window.addEventListener("DOMContentLoaded",function(){try{window.ACADEMY.boot()}catch(e){console.error(e);var m=document.getElementById("main");if(m)m.innerHTML='<div style="padding:24px;font-family:sans-serif">تعذّر تشغيل الأكاديمية. جرّب متصفحًا حديثًا (Chrome أو Edge أو Firefox أو Safari). — The academy could not start. Try a modern browser.</div>'}});`;

const licence = "Fonts: Inter, IBM Plex Sans Arabic and JetBrains Mono, SIL Open Font License 1.1 (see academy/src/fonts). Book content © Mohamed Fawzy.";
const head = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>أكاديمية أساسيات الذكاء الاصطناعي</title>
<meta name="description" content="Interactive academy built from the book AI Essentials for the Modern Workspace — lessons, animated scenes, labs, prompts, quizzes. Works offline.">
<meta name="color-scheme" content="light dark">
<!-- ${licence} -->
<style>${css}</style>`;
const body = `<a class="skip" href="#main" onclick="event.preventDefault();document.getElementById('main').focus()">تخطَّ إلى المحتوى / Skip to content</a>
<header class="bar" id="bar" role="banner"></header>
<div class="readbar" id="readbar" aria-hidden="true"><i></i></div>
<div class="shell">
  <nav class="side" id="side" aria-label="Index"></nav>
  <main id="main" tabindex="-1"></main>
</div>
<div class="scrim" id="scrim"></div>
<noscript><div style="padding:24px">هذه الأكاديمية تحتاج تفعيل JavaScript. — This academy needs JavaScript enabled.</div></noscript>
<script type="application/json" id="book-pages">${JSON.stringify(pages)}</script>
<script>${guard(dataJs)}</script>
<script>${guard(engineJs)}</script>
<script>${boot}</script>`;

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
${head}
</head>
<body>
${body}
</body>
</html>
`;
writeFileSync(out, html);
const fi = process.argv.indexOf("--fragment");
if (fi > 0 && process.argv[fi + 1]) writeFileSync(process.argv[fi + 1], `${head.replace('<meta charset="utf-8">\n', "").replace(/<meta name="viewport"[^>]*>\n/, "")}\n${body}\n`);
const kb = (n) => (n / 1024).toFixed(0) + " KB";
console.log(`Built ${out} — ${kb(Buffer.byteLength(html))} (pages ${Object.keys(pages).length}, css ${kb(css.length)}, data ${kb(dataJs.length)}, engine ${kb(engineJs.length)})`);