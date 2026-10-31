/* The unit-4 projects: unit 3's two examples made very simple, so the model solves them easily and the reader sees
   every step. Same TV factory as units 2 and 3 (no factory or company is named), the same clean data on purpose.
   Example 1 (lessons k4–k6): two weekly production reports + a Masters file with one sheet (Countries) → one table with
   the country name by VLOOKUP → a short report and a CSV (PowerShell driving Excel through COM, three small steps) →
   a code review → a SQLite database and three SQL questions (pure Python). Example 2 (lessons k7–k8): one PDF report
   from the system (export sales for July) → a table in a SQLite database, checked against the PDF's Total line → one
   HTML page for management (pure Python). The starter kit (lesson k9) holds the rules files and a skill.
   Every data file is in English, like the factory's own; README, Prompts and answer keys follow the reader's language.
   Seeded generators build the same rows every time, and data.test.mjs recomputes every `expected` figure from the
   files and runs the Solution/ scripts (data/easy-solutions.js) with python3. Everything is illustrative. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  const X = A.xlProjects, MD = X.modelsTable, rng = X.rng, SERIAL0 = X.serial0;
  const DAY0 = Date.UTC(2026, 0, 1);
  const iso = (day) => new Date(DAY0 + day * 864e5).toISOString().slice(0, 10);
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const n = (x) => Number(x).toLocaleString("en-US");
  const modelName = Object.fromEntries(MD.map((m) => [m[0], m[1]]));
  const CT = [["EG", "Egypt"], ["SA", "Saudi Arabia"], ["AE", "United Arab Emirates"], ["KW", "Kuwait"], ["JO", "Jordan"]];
  const countryName = Object.fromEntries(CT);

  /* ================= example 1 · two weeks → one table with the country name → a report → SQLite ================= */
  const HEAD1 = ["Date", "LineCode", "ModelCode", "CountryCode", "Qty"];
  const LINES = ["L01", "L02", "L03"], MODELS1 = ["M101", "M103", "M105", "M108"];
  const WEEK1 = 184;   // Saturday 4 July 2026; the factory works Saturday to Thursday
  let ROWS1 = null;
  function twoWeeks() {   // one row per line per working day: 2 weeks × 6 days × 3 lines = 36 rows
    if (ROWS1) return ROWS1;
    const r = rng(20260704), rows = [];
    for (let w = 1; w <= 2; w++) for (let k = 0; k < 6; k++) for (const line of LINES) {
      const day = WEEK1 + (w - 1) * 7 + k, x = r();
      const cc = x < 0.5 ? "EG" : CT[1 + Math.min(3, Math.floor(((x - 0.5) / 0.5) * 4))][0];
      rows.push({ week: w, day, line, mc: MODELS1[Math.floor(r() * MODELS1.length)], cc, q: 40 + 5 * Math.floor(r() * 5) });
    }
    return (ROWS1 = rows);
  }
  const weekFile = (w) => `Week_${String(w).padStart(2, "0")}.xlsx`;
  const ex1Files = () => [
    ...[1, 2].map((w) => ({ path: "Data/" + weekFile(w), sheets: [{ name: "Production", rows: [HEAD1, ...twoWeeks().filter((x) => x.week === w).map((x) => [{ d: SERIAL0 + x.day }, x.line, x.mc, x.cc, x.q])] }] })),
    { path: "Data/Masters.xlsx", sheets: [{ name: "Countries", rows: [["CountryCode", "CountryName"], ...CT] }] },
  ];
  // what step 3 writes (Output/Two_Weeks.csv), and step 5 reads: the test feeds this to Solution/load_sqlite.py
  const twoWeeksCsv = () => "\ufeff" + [[...HEAD1, "SourceFile", "CountryName"].join(","), ...twoWeeks().map((x) => [iso(x.day), x.line, x.mc, x.cc, x.q, weekFile(x.week), countryName[x.cc]].join(","))].join("\r\n") + "\r\n";
  function ex1Expected() {
    const t = twoWeeks(), by = (f) => { const o = {}; for (const x of t) o[f(x)] = (o[f(x)] || 0) + x.q; return o; };
    const countries = by((x) => x.cc), lines = by((x) => x.line), units = sum(t, (x) => x.q);
    const exp = Object.entries(countries).filter(([c]) => c !== "EG").sort((a, b) => b[1] - a[1])[0];
    return {
      files: 2, rows: t.length, units, perWeek: [1, 2].map((w) => ({ rows: t.filter((x) => x.week === w).length, units: sum(t.filter((x) => x.week === w), (x) => x.q) })),
      countries, countryNames: countryName, lines, egypt: countries.EG, exportShare: Math.round(((units - countries.EG) / units) * 100),
      topExport: { code: exp[0], name: countryName[exp[0]], units: exp[1] }, first: iso(WEEK1), last: iso(WEEK1 + 12),
    };
  }

  /* ================= example 2 · one PDF → a table in SQLite → one HTML page ================= */
  const PRICE2 = { M103: 5500, M105: 8200, M108: 14600 };   // export price per set (EGP)
  const EXP = ["SA", "AE", "KW", "JO"];
  let ROWS2 = null;
  function exports() {   // July's export sales: one row per country and model, sorted the way the system prints them
    if (ROWS2) return ROWS2;
    const r = rng(20260731), rows = [];
    for (const cc of EXP) for (const mc of Object.keys(PRICE2)) { const q = 20 + 5 * Math.floor(r() * 13); rows.push({ cc, mc, q, v: q * PRICE2[mc] }); }
    return (ROWS2 = rows);
  }
  function exportPdf() {   // a one-page system report: title, period, one table with right-aligned figures, a Total line
    const cols = [{ h: "CountryCode", x: 40 }, { h: "ModelCode", x: 160 }, { h: "Qty", x: 400, right: true }, { h: "NetSales", x: 555, right: true }];
    const items = [{ x: 40, y: 800, t: "Export Sales - July 2026", size: 14, bold: true }, { x: 40, y: 782, t: "Period: 2026-07-01 to 2026-07-31    Currency: EGP", size: 9 }, { x: 555, y: 800, t: "SYSTEM REPORT", size: 8, bold: true, right: true }];
    let y = 748;
    for (const c of cols) items.push({ x: c.x, y, t: c.h, size: 8.5, bold: true, right: c.right });
    for (const x of exports()) { y -= 15; [x.cc, x.mc, n(x.q), n(x.v)].forEach((v, i) => items.push({ x: cols[i].x, y, t: v, size: 8.5, right: cols[i].right })); }
    y -= 20;
    const E = exports();
    items.push({ x: 40, y, t: "Total", size: 8.5, bold: true }, { x: 400, y, t: n(sum(E, (x) => x.q)), size: 8.5, bold: true, right: true }, { x: 555, y, t: n(sum(E, (x) => x.v)), size: 8.5, bold: true, right: true });
    items.push({ x: 555, y: 40, t: "Page 1 of 1", size: 8, right: true }, { x: 40, y: 40, t: "Printed by the plant reporting system. Figures in EGP.", size: 8 });
    return { title: "Export Sales - July 2026", pages: [{ items, rules: [[40, 742, 555, 742], [40, y + 12, 555, y + 12]], bands: [[40, 742, 515, 18]] }] };
  }
  const countriesCsv = () => "\ufeff" + ["CountryCode,CountryName", ...CT.map((c) => c.join(","))].join("\r\n") + "\r\n";
  const ex2Files = () => [{ path: "Data/Export_Sales_2026-07.pdf", pdf: exportPdf() }, { path: "Data/Countries.csv", text: countriesCsv() }];
  function ex2Expected() {
    const E = exports(), by = (f) => { const o = {}; for (const x of E) o[f(x)] = (o[f(x)] || 0) + x.v; return o; };
    const countries = by((x) => x.cc), models = by((x) => x.mc), sales = sum(E, (x) => x.v);
    const top = Object.entries(countries).sort((a, b) => b[1] - a[1])[0];
    return { rows: E.length, qty: sum(E, (x) => x.q), sales, countries, models, top: { code: top[0], name: countryName[top[0]], sales: top[1], share: Math.round((top[1] / sales) * 100) }, prices: PRICE2 };
  }

  /* ================= the starter kit (lesson k9): the rules files and one skill ================= */
  const RULES = `These rules come from our information-security team. Follow them in every session, without exception.

## What may run
1. PowerShell first. Windows PowerShell 5.1 is on every company laptop. Use it for anything that opens Excel, Word or
   PowerPoint, through COM (New-Object -ComObject Excel.Application).
2. Python only with its standard library ("pure Python"): csv, sqlite3, zipfile, xml.etree, json, re, zlib, html,
   pathlib, datetime. Never run pip install. Never import a module that is not in the standard library. If a package
   would help, write the few functions you need yourself, inside the script, and say so in a comment.
3. Before using Python, check that it exists: python --version (or py --version). If it is missing, stop and tell me.
   Do not install it.
4. No internet: no downloads, no web requests, and no links to outside files in any page you build.

## How to build
5. One step at a time. Each step is one small script with one job: it reads, works, checks itself and writes.
   Show me the plan for the step and wait for my approval; then build it, run it, and show me the log.
6. Read the source files from Data\\ and earlier steps' results from Output\\; write only to Output\\.
   Never change a file in Data\\.
7. Every script adds its lines to Output\\Run_Log.txt: what it read, how many rows, every check and its result.
8. Stop with a clear message when anything is unexpected: a missing file, a missing column, totals that don't match.
   Never carry on silently.
9. Every step gets a Run_<step>.bat launcher, so it runs on a double-click.
10. Excel through COM: open source files read-only, turn alerts off, and close and release every COM object in a
    finally block, even after an error.

## Before you say "done"
11. Run it, and show me the checks: rows and totals against the source.
12. Explain each part of the script in two plain lines.
13. Give me one check I can do by hand.
`;
  const KIT = {
    "CLAUDE.md": "# Rules for every tool in this folder (Claude Code reads this file at the start of every session)\n\n" + RULES,
    "AGENTS.md": "# Rules for every tool in this folder (Codex reads this file at the start of every session)\n\n" + RULES,
    ".claude/skills/trusted-tool/SKILL.md": `---
name: trusted-tool
description: Builds a small automation tool that the company's security team accepts - PowerShell for Excel, Word and PowerPoint (through COM), pure Python (standard library only) for data, PDF text, SQLite and HTML pages - one checked step at a time, each step runnable with a double-click. Use when asked to automate a report, combine Excel files, read a PDF into a table, build a database, or make an HTML report.
---

# Trusted tool

Follow CLAUDE.md first. This skill adds the method.

## Steps
1. Read README.txt and list the files in Data\\. Ask me about anything missing before you plan.
2. Split the work into steps of one job each (for example: stack, look up, report, database, page).
   Show me the list and wait for my approval.
3. Build one step. Excel, Word or PowerPoint: PowerShell through COM, see reference/powershell-com.md.
   Data, PDF text, SQLite, HTML: pure Python, see reference/pure-python.md.
4. Give the step its Run_<step>.bat, run it, and read Output\\Run_Log.txt.
5. Review the step with reference/review-checklist.md. Only then start the next step.

## Before you say "done"
- Every check in the log passed: rows and totals against the source.
- No pip install, no import outside the standard library, no internet.
- Data\\ is unchanged.
`,
    ".claude/skills/trusted-tool/reference/powershell-com.md": `# PowerShell and COM: the pattern for every Office script

COM (Component Object Model) is the way one Windows program drives another. Excel, Word and PowerPoint each offer a
COM object; PowerShell creates it and then reads, writes and saves through it, as if it were your hands.

    $ErrorActionPreference = "Stop"
    $here = Split-Path -Parent $MyInvocation.MyCommand.Path
    $xl = $null; $wb = $null
    try {
        $xl = New-Object -ComObject Excel.Application
        $xl.Visible = $false; $xl.DisplayAlerts = $false
        $wb = $xl.Workbooks.Open((Join-Path $here "Data\\Week_01.xlsx"), 0, $true)   # read-only
        $values = $wb.Worksheets.Item("Production").UsedRange.Value2                 # the whole sheet in one read
        # ... work on $values in memory, then write one block at once with Range.Value2 = array
    }
    finally {
        if ($wb) { $wb.Close($false); [void][Runtime.InteropServices.Marshal]::ReleaseComObject($wb) }
        if ($xl) { $xl.Quit(); [void][Runtime.InteropServices.Marshal]::ReleaseComObject($xl) }
        [GC]::Collect(); [GC]::WaitForPendingFinalizers()
    }

- Read a sheet once into an array, write once: cell by cell through COM is very slow.
- Value2 gives dates as Excel day numbers: [DateTime]::FromOADate($v) turns one into a date.
- Save scripts holding Arabic as UTF-8 with BOM, or Windows PowerShell 5.1 misreads them.
- The launcher Run_<step>.bat:  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0<script>.ps1"  then  pause
`,
    ".claude/skills/trusted-tool/reference/pure-python.md": `# Pure Python: the standard library instead of packages

Packages are code from outside the company (pip, PyPI). They are blocked on company laptops, so write the small part
you need with the standard library, which ships inside Python itself.

| Instead of            | Use                                                            |
|-----------------------|----------------------------------------------------------------|
| pandas (read, group)  | csv.DictReader, then a dict of sums; or load into sqlite3 and GROUP BY |
| openpyxl (read .xlsx) | let PowerShell save the sheet as CSV through COM; or zipfile + xml.etree |
| pdfplumber, PyPDF2    | re + zlib on the PDF's text streams (a text PDF, not a scan)   |
| SQLAlchemy            | sqlite3                                                        |
| requests              | nothing: no internet                                           |
| plotly, matplotlib    | an inline SVG written as text inside the HTML page             |
| jinja2                | an f-string, with html.escape on every value                   |

- Check Python first: python --version. If the command opens the Microsoft Store, Python is not installed.
- Read with encoding="utf-8-sig" (files from Excel start with a byte-order mark).
- Paths from the script's own folder: Path(__file__).resolve().parent
- The launcher Run_<step>.bat:  python "%~dp0<script>.py"  then  pause
`,
    ".claude/skills/trusted-tool/reference/review-checklist.md": `# Review checklist: before you accept a step

1. The plan: does the step do one job, and the job I asked for?
2. Imports: only the standard library (Python), only built-in commands and COM (PowerShell). No pip, no internet.
3. Data\\ is opened read-only and nothing is written there.
4. The log: files read, rows, totals, each table's sum against the total, every check and its result.
5. The numbers: one total checked by hand (filter the source in Excel, or add a few rows on paper).
6. The bad file: run it once on a copy with one column renamed. It must stop with a clear message.
7. Clean-up: after a run, Task Manager shows no EXCEL.EXE left behind.
8. Explanation: ask "explain each part in two lines". If the answer doesn't match the code, ask again.
9. A second opinion: give the script to another model (Codex or Claude) with this checklist, and compare.
`,
    "Check_Setup.bat": `@echo off
echo === PowerShell ===
powershell -NoProfile -Command "$PSVersionTable.PSVersion.ToString()"
echo.
echo === Python ===
python --version
py --version
echo.
echo === The standard library: sqlite3, csv, zipfile, html ===
python -c "import sqlite3, csv, zipfile, html; print('OK - SQLite', sqlite3.sqlite_version)"
echo.
echo If Python is missing (or "python" opens the Microsoft Store), ask IT for the approved Python. Do not download it yourself.
pause
`,
  };

  /* ================= the projects ================= */
  const T = (lang) => (a, e) => (lang === "ar" ? a : e);
  const bom = "\ufeff";
  const crlf = (s) => s.replace(/\r?\n/g, "\r\n");
  const prompt = (id, lang) => { const p = (A.prompts || []).find((x) => x.id === id); return p ? crlf(p.text[lang]) + "\r\n" : ""; };
  const S = () => A.easySolutions || {};
  const sol = (names) => names.map((f) => ({ path: "Solution/" + f, text: crlf(S()[f] || "") }));
  const runBat = (py) => ({ path: "Solution/Run_" + py.replace(/\.py$/, "") + ".bat", text: crlf(`@echo off\ncd /d "%~dp0.."\npython "%~dp0${py}"\npause\nrem END OF FILE Run_${py.replace(/\.py$/, "")}.bat\n`) });
  const P = [];
  P.push({
    n: 1, lessons: ["k4", "k5", "k6"], lesson: "k4", slug: "Two_Weeks", short: u("أسبوعين", "Two weeks"),
    title: u("المثال الأول، بسيط: أسبوعين في جدول واحد، واسم البلد، وتقرير، وقاعدة بيانات", "Example 1, simply: two weeks in one table, the country name, a report and a database"),
    about: u("تقريرين إنتاج أسبوعيين بنفس الأعمدة (٣٦ صف بس)، وملف Masters فيه شيت واحد للبلاد. الأداة بتتبني ٥ خطوات صغيرة: تحت بعض، وبعدين اسم البلد بـ VLOOKUP، وبعدين تقرير قصير وملف CSV (كلهم بـ PowerShell وإكسل)، وبعدين مراجعة الكود، وفي الآخر قاعدة بيانات SQLite وتلات أسئلة بـ SQL (بـ Python النقي).",
      "Two weekly production reports with the same columns (36 rows only), and a Masters file with one sheet of countries. The tool is built in 5 small steps: stacking, then the country name by VLOOKUP, then a short report and a CSV file (all with PowerShell and Excel), then a review of the code, and finally a SQLite database and three SQL questions (with pure Python)."),
    prompts: ["k4a", "k4b", "k4c", "k5a", "k6a"], data: ex1Files, expected: ex1Expected, solution: ["load_sqlite.py"],
    head: u("المثال ١ من ٢", "Example 1 of 2"), note: u("ملفات البيانات بالإنجليزي، ومعاها README وPrompt لكل خطوة ومفتاح إجابة، والحل النموذجي لخطوة Python. فكّه في فولدر لوحده.", "The data files are in English, with a README, a Prompt per step, an answer key and the reference solution of the Python step. Unzip it into a folder of its own."),
  });
  P.push({
    n: 2, lessons: ["k7", "k8"], lesson: "k7", slug: "PDF_to_HTML", short: u("من PDF لصفحة", "PDF to a page"),
    title: u("المثال التاني، بسيط: تقرير PDF واحد في قاعدة بيانات، وصفحة HTML للإدارة", "Example 2, simply: one PDF report into a database, and an HTML page for management"),
    about: u("تقرير PDF واحد من النظام: مبيعات التصدير لشهر يوليو، جدول واحد ١٢ صف وتحته سطر الإجمالي. الأداة بـ Python النقي بتقرا النص من الـ PDF، وتراجع مجموع الصفوف على سطر الإجمالي، وتحطهم في قاعدة بيانات SQLite. وبعدين خطوة تانية بتعمل صفحة HTML واحدة: أرقام ورسوم وجدول، وزرار عرض للإدارة.",
      "One PDF report from the system: July's export sales, one 12-row table with a Total line under it. The pure-Python tool reads the PDF's text, checks the rows' sum against the Total line, and loads them into a SQLite database. Then a second step makes one HTML page: figures, charts, a table, and a Present button for management."),
    prompts: ["k7a", "k8a"], data: ex2Files, expected: ex2Expected, solution: ["extract_pdf.py", "build_report.py"],
    head: u("المثال ٢ من ٢", "Example 2 of 2"), note: u("الـ PDF وملف البلاد بالإنجليزي، ومعاهم README وPrompt لكل خطوة ومفتاح إجابة، والحل النموذجي بـ Python النقي. فكّه في فولدر لوحده.", "The PDF and the countries file are in English, with a README, a Prompt per step, an answer key and the pure-Python reference solution. Unzip it into a folder of its own."),
  });
  P.push({
    n: 3, lessons: ["k9"], lesson: "k9", slug: "Starter_Kit", short: u("طقم البداية", "Starter kit"),
    title: u("طقم البداية: ملفات القواعد ومهارة الأداة الآمنة", "The starter kit: the rules files and the trusted-tool skill"),
    about: u("ملف CLAUDE.md لـ Claude Code، وملف AGENTS.md لـ Codex، بنفس قواعد الأمان: PowerShell الأول، وPython النقي، وخطوة خطوة، وسجل، ووقفة واضحة، وملف تشغيل. ومعاهم مهارة trusted-tool بمراجعها، وملف Check_Setup.bat بيتأكد إن PowerShell وPython موجودين على جهازك.",
      "A CLAUDE.md for Claude Code and an AGENTS.md for Codex, with the same security rules: PowerShell first, pure Python, step by step, a log, a clear stop, a launcher. With them, the trusted-tool skill and its references, and a Check_Setup.bat that checks PowerShell and Python are on your machine."),
    prompts: ["k9a"], data: () => Object.entries(KIT).map(([path, text]) => ({ path, text: path.endsWith(".bat") ? crlf(text) : text })), expected: () => ({ files: Object.keys(KIT).length, rules: (RULES.match(/^\d+\. /gm) || []).length }),
    head: u("طقم البداية", "The starter kit"), note: u("الملفات بالإنجليزي، ومعاها README وPrompt. فكّه وانسخ الملفات لفولدر مشروعك جنب فولدر Data.", "The files are in English, with a README and a Prompt. Unzip it and copy the files into your project folder, next to the Data folder."),
  });

  /* ---------- the guide files ---------- */
  function guide(p, lang) {
    const t = T(lang), E = p.expected();
    if (p.n === 1) return {
      data: [t("- Data/Week_01.xlsx وData/Week_02.xlsx: تقرير إنتاج لكل أسبوع، شيت Production، العناوين في الصف الأول:", "- Data/Week_01.xlsx and Data/Week_02.xlsx: one production report per week, sheet Production, headers in row 1:"), "  " + HEAD1.join(" | "),
        t("- Data/Masters.xlsx: شيت واحد Countries فيه عمودين: CountryCode وCountryName.", "- Data/Masters.xlsx: one sheet, Countries, with two columns: CountryCode and CountryName.")],
      rules: [t("- الملفين بنفس الأعمدة وبنفس الترتيب، وكل كود بلد موجود في Masters، ومفيش خلية فاضية.", "- Both files have the same columns in the same order, every country code is in Masters, and no cell is empty."), t("- Qty بعدد الأجهزة. المصنع بيشتغل من السبت للخميس، وفيه ٣ خطوط: L01 وL02 وL03.", "- Qty is in sets. The factory works Saturday to Thursday, on 3 lines: L01, L02 and L03."), t("- EG يعني السوق المحلي، وأي بلد تاني تصدير.", "- EG is the home market; any other country is export.")],
      out: [t("- الخطوة ١ (Prompt_1): Output/Two_Weeks.xlsx: شيت Data فيه الملفين تحت بعض، ومعاهم عمود SourceFile.", "- Step 1 (Prompt_1): Output/Two_Weeks.xlsx: a Data sheet holding both files stacked, with a SourceFile column."),
        t("- الخطوة ٢ (Prompt_2): نفس الملف: عمود CountryName بمعادلة VLOOKUP من شيت Countries (اتنسخ جوّه الملف).", "- Step 2 (Prompt_2): the same workbook: a CountryName column as a VLOOKUP formula on the Countries sheet (copied inside the workbook)."),
        t("- الخطوة ٣ (Prompt_3): شيت Report (الإجمالي، وكل بلد، وكل خط) وOutput/Two_Weeks.csv.", "- Step 3 (Prompt_3): a Report sheet (the total, each country, each line) and Output/Two_Weeks.csv."),
        t("- الخطوة ٤ (Prompt_4): مراجعة الكود بقايمة المراجعة، من غير ما يتعدّل حاجة قبل ما توافق.", "- Step 4 (Prompt_4): a review of the code with the checklist, with nothing changed before you approve."),
        t("- الخطوة ٥ (Prompt_5): Output/Factory.db (جدول Production) وOutput/Query_Results.txt (تلات أسئلة بـ SQL). الحل النموذجي في Solution/load_sqlite.py.", "- Step 5 (Prompt_5): Output/Factory.db (table Production) and Output/Query_Results.txt (three SQL questions). The reference solution is Solution/load_sqlite.py.")],
      key: [t(`- ملفات: ${E.files} · صفوف: ${E.rows} (${E.perWeek.map((w) => w.rows).join(" + ")}) · الأجهزة: ${n(E.units)} (${E.perWeek.map((w) => n(w.units)).join(" + ")})`, `- Files: ${E.files} · rows: ${E.rows} (${E.perWeek.map((w) => w.rows).join(" + ")}) · sets: ${n(E.units)} (${E.perWeek.map((w) => n(w.units)).join(" + ")})`),
        t(`- من ${E.first} لـ ${E.last} · مصر: ${n(E.egypt)} جهاز · التصدير: ${E.exportShare}٪ · أعلى بلد تصدير: ${E.topExport.name} (${n(E.topExport.units)})`, `- From ${E.first} to ${E.last} · Egypt: ${n(E.egypt)} sets · export: ${E.exportShare}% · top export country: ${E.topExport.name} (${n(E.topExport.units)})`),
        "", t("حسب البلد:", "By country:"), ...Object.entries(E.countries).sort((a, b) => b[1] - a[1]).map(([c, q]) => `  ${c} ${E.countryNames[c]}: ${n(q)}`),
        "", t("حسب الخط:", "By line:"), ...Object.entries(E.lines).sort().map(([c, q]) => `  ${c}: ${n(q)}`)],
    };
    if (p.n === 2) return {
      data: [t("- Data/Export_Sales_2026-07.pdf: تقرير من النظام، صفحة واحدة، جدول واحد:", "- Data/Export_Sales_2026-07.pdf: a system report, one page, one table:"), "  CountryCode | ModelCode | Qty | NetSales", t("  وتحت الجدول سطر Total فيه إجمالي Qty وإجمالي NetSales.", "  and under the table a Total line with the total Qty and the total NetSales."),
        t("- Data/Countries.csv: عمودين CountryCode وCountryName (نفس شيت Countries في المثال الأول، محفوظ CSV).", "- Data/Countries.csv: two columns, CountryCode and CountryName (the same Countries sheet as example 1, saved as CSV).")],
      rules: [t("- الـ PDF مكتوب (نص مش صورة)، والأرقام فيها فاصلة الآلاف (1,234).", "- The PDF is a text PDF (not a scan), and its figures carry thousands separators (1,234)."), t("- كل المبالغ بالجنيه، والشهر من اسم الملف (2026-07).", "- Every amount is in EGP, and the month comes from the file name (2026-07)."), t("- مجموع الصفوف لازم يساوي سطر Total بالظبط، وإلا الأداة توقف.", "- The rows must add up to the Total line exactly, or the tool stops.")],
      out: [t("- الخطوة ١ (Prompt_1): Output/Exports.db فيها جدولين: Exports (Month، CountryCode، ModelCode، Qty، NetSales، SourceFile) وCountries.", "- Step 1 (Prompt_1): Output/Exports.db holding two tables: Exports (Month, CountryCode, ModelCode, Qty, NetSales, SourceFile) and Countries."),
        t("- الخطوة ٢ (Prompt_2): Output/Export_Report.html: صفحة واحدة من غير نت: ٣ أرقام، ورسمين، وجدول، وزرار Present.", "- Step 2 (Prompt_2): Output/Export_Report.html: one page with no internet: 3 figures, two charts, a table and a Present button."),
        t("- الحل النموذجي في Solution/ (extract_pdf.py وbuild_report.py، وملف تشغيل لكل واحد). جرّب حلّك الأول.", "- The reference solution is in Solution/ (extract_pdf.py and build_report.py, with a launcher for each). Try your own first.")],
      key: [t(`- صفوف: ${E.rows} · الأجهزة: ${n(E.qty)} · صافي المبيعات: ${n(E.sales)} جنيه`, `- Rows: ${E.rows} · sets: ${n(E.qty)} · net sales: EGP ${n(E.sales)}`),
        t(`- أعلى بلد: ${E.top.name} (${n(E.top.sales)} جنيه، ${E.top.share}٪)`, `- Top country: ${E.top.name} (EGP ${n(E.top.sales)}, ${E.top.share}%)`),
        "", t("حسب البلد (جنيه):", "By country (EGP):"), ...Object.entries(E.countries).sort((a, b) => b[1] - a[1]).map(([c, v]) => `  ${c} ${countryName[c]}: ${n(v)}`),
        "", t("حسب الموديل (جنيه):", "By model (EGP):"), ...Object.entries(E.models).sort((a, b) => b[1] - a[1]).map(([m, v]) => `  ${m} ${modelName[m]}: ${n(v)}`)],
    };
    return {
      data: [t("- CLAUDE.md: القواعد اللي Claude Code بيقراها أول كل جلسة.", "- CLAUDE.md: the rules Claude Code reads at the start of every session."), t("- AGENTS.md: نفس القواعد، للـ Codex.", "- AGENTS.md: the same rules, for Codex."),
        t("- ‎.claude/skills/trusted-tool/: المهارة (SKILL.md) وفولدر reference فيه: PowerShell وCOM، وPython النقي، وقايمة المراجعة.", "- .claude/skills/trusted-tool/: the skill (SKILL.md) and a reference folder: PowerShell and COM, pure Python, and the review checklist."),
        t("- Check_Setup.bat: بيتأكد إن PowerShell وPython والمكتبة القياسية موجودين.", "- Check_Setup.bat: checks that PowerShell, Python and the standard library are there.")],
      rules: [t("- الملفات بالإنجليزي، علشان أي نموذج وأي زميل يقراها بنفس الشكل.", "- The files are in English, so any model and any colleague read them the same way."), t(`- القواعد ${E.rules}، ومتقسمة: إيه اللي يشتغل، وإزاي نبني، وقبل «خلصت».`, `- ${E.rules} rules, in three parts: what may run, how to build, and before “done”.`)],
      out: [t("- حط CLAUDE.md وAGENTS.md وفولدر ‎.claude في فولدر مشروعك، جنب فولدر Data.", "- Put CLAUDE.md, AGENTS.md and the .claude folder in your project folder, next to the Data folder.")],
      steps: [t("١. شغّل Check_Setup.bat واقرا النتيجة: نسخة PowerShell، ونسخة Python، وسطر OK.", "1. Run Check_Setup.bat and read the result: the PowerShell version, the Python version, and an OK line."),
        t("٢. انسخ الملفات لفولدر المثال الأول أو التاني.", "2. Copy the files into the folder of example 1 or 2."),
        t("٣. افتح Claude Code أو Codex في الفولدر، واكتب: «ابنيلي أداة للمثال ده خطوة خطوة».", "3. Open Claude Code or Codex in the folder and write: “build me a tool for this example, step by step”."),
        t("٤. لاحظ: النموذج هيعرض الخطوات ويستنى موافقتك، ومش هيستخدم باكدجات.", "4. Notice: the model shows the steps and waits for your approval, and uses no packages."),
        t("٥. اكتب نسخة لشغلك إنت بـ Prompt_1.txt.", "5. Write a version for your own work with Prompt_1.txt.")],
      key: [t(`- ${E.files} ملفات · ${E.rules} قاعدة`, `- ${E.files} files · ${E.rules} rules`)],
    };
  }
  function readme(p, lang) {
    const t = T(lang), g = guide(p, lang), rule = "=".repeat(40), files = p.prompts.map((id, i) => `Prompt_${i + 1}.txt`);
    const steps = g.steps || [
      t(`١. فك الملف في فولدر لوحده، مثلًا C:\\Automation\\${p.folder}، وخلّي فولدر Data زي ما هو.`, `1. Unzip into a folder of its own, for example C:\\Automation\\${p.folder}, and leave the Data folder as it is.`),
      t("٢. افتح Prompt_1.txt، وحط مسار الفولدر مكان [مسار الفولدر]، والصقه في Claude Code أو Codex جوّه الفولدر (أو في ChatGPT أو Gemini Enterprise).", "2. Open Prompt_1.txt, put your folder's path in place of [folder path], and paste it into Claude Code or Codex inside the folder (or into ChatGPT or Gemini Enterprise)."),
      t("٣. اقرا خطة الخطوة، ووافق، وشغّل ملف التشغيل بدبل كليك، واقرا Output\\Run_Log.txt.", "3. Read the step's plan, approve, run the launcher with a double-click, and read Output\\Run_Log.txt."),
      t("٤. ما تروحش للـ Prompt اللي بعده غير لما الخطوة دي تشتغل وتتراجع.", "4. Don't move to the next Prompt until this step runs and is checked."),
      t("٥. قارن بـ Answer_Key.txt، وبعدين بالحل النموذجي في Solution.", "5. Compare with Answer_Key.txt, then with the reference solution in Solution."),
    ];
    return crlf([
      t(`الوحدة ٤ — ${p.title.ar}`, `Unit 4 — ${p.title.en}`),
      t("كل ملفات البيانات بالإنجليزي · كل الأرقام توضيحية", "Every data file is in English · every figure is illustrative"), rule, "",
      t("الموقف", "The situation"), p.about[lang], "",
      t("في الفولدر", "In this folder"),
      p.n === 3 ? t("- ملفات القواعد والمهارة وملف الفحص.", "- The rules files, the skill and the check file.") : t("- Data/: الملفات اللي هتشتغل عليها (ما تعدّلش فيها).", "- Data/: the files you work on (don't edit them)."),
      ...(p.solution ? [t("- Solution/: الحل النموذجي لخطوات Python، تقارن بيه بعد ما تبني.", "- Solution/: the reference solution of the Python steps, to compare with after you build.")] : []),
      t(`- ${files.join("، ")}: الـ Prompt جاهز تنسخه${files.length > 1 ? "، واحد لكل خطوة" : ""}.`, `- ${files.join(", ")}: the Prompt${files.length > 1 ? "s, one per step," : ""} ready to copy.`),
      t("- Answer_Key.txt: الأرقام الصح.", "- Answer_Key.txt: the right figures."), "",
      t("البيانات (الجزء ده بيروح للنموذج)", "The data (this part goes to the model)"), ...g.data, "",
      t("قواعد الشغل (قولها لما النموذج يسأل)", "Business rules (give them when the model asks)"), ...g.rules, "",
      t("المطلوب", "What to produce"), ...g.out, "",
      t("الخطوات", "Steps"), ...steps, "",
    ].join("\n"));
  }
  function answerKey(p, lang) {
    const t = T(lang), g = guide(p, lang);
    return crlf([t(`مفتاح الإجابة — ${p.title.ar}`, `Answer key — ${p.title.en}`), "", ...g.key].join("\n")) + "\r\n";
  }
  for (const p of P) {
    p.folder = `Unit4_${p.n === 3 ? "" : "Example_" + p.n + "_"}${p.slug}`; p.zip = p.folder + ".zip";
    p.files = () => [...p.data(), ...(p.solution ? [...sol(p.solution), ...p.solution.map(runBat)] : [])];   // the data, then the reference solution
    p.guides = (lang) => [{ path: "README.txt", text: bom + readme(p, lang) }, ...p.prompts.map((id, i) => ({ path: `Prompt_${i + 1}.txt`, text: bom + prompt(id, lang) })), { path: "Answer_Key.txt", text: bom + answerKey(p, lang) }];
    p.bundle = (lang) => [...p.guides(lang), ...p.files()];
  }
  A.easyProjects = {
    list: P, byLesson: Object.fromEntries(P.flatMap((p) => p.lessons.map((l) => [l, p]))), guide, readme, answerKey,
    twoWeeks, twoWeeksCsv, exports, countries: CT, head1: HEAD1, kit: KIT, rules: RULES,
  };
})(window.ACADEMY = window.ACADEMY || {});
