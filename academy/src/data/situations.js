/* Situations for «البداية مع الذكاء الاصطناعي» — add new entries to A.situations only. */
"use strict";
(function (A) {
  A.situationsPage = {
    title: "البداية مع الذكاء الاصطناعي",
    intro:
      "الصفحة دي ليك لو بتستخدم نماذج شات مجانية بس. اختار موقفك من اللي تحت، اقرا المقدمة كده في سرك، وانسخ الـ Prompt الإنجليزي وحطّه في الشات. النموذج هيسألك أسئلة — جاوب عليه صراحة. بعد ما يخلص، هتاخد أداة جاهزة تنفّذها على لابتوبك.",
  };

  A.situations = [
    {
      id: "excel-company-laptop",
      title: "أتمتة ملفات Excel على لابتوب الشركة",
      intro:
        "تخيّل إن لابتوب الشغل مقفول عليك: ممنوع تنزّل حاجة، ومفيش pandas ولا openpyxl. Python العادي موجود بس. الـ Prompt ده بيخلّي النموذج يبني لك أداة كاملة: PowerShell يفتح Excel من برّه، يصدّر الشيتات CSV، وPython يحمّلها في SQLite ويعمل التقارير — من غير ما يلمس الملف الأصلي.",
      prompt: `You are a senior Python and Windows desktop automation engineer. I work on a company laptop with strict DRM: I cannot install third-party Python packages (no pandas, openpyxl, pywin32, xlwings, etc.). I only have the Python standard library plus whatever ships with Windows (Excel, PowerShell, cscript).

Your job: design and deliver a complete, production-minded automation that reads Excel workbooks, loads data into SQLite, runs SQL for joins/aggregations/calculations, and writes outputs — without ever modifying my original files.

## Hard constraints (non-negotiable)
1. **Excel access**: Use Excel COM automation driven by a PowerShell script (\`export_excel.ps1\`) that Python generates and runs via:
   \`subprocess.run(["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", path_to_ps1, ...], ...)\`
   VBScript is an acceptable alternative only if you document why PowerShell is unsuitable on my machine.
2. **No pywin32**: Python must NOT use COM directly; only subprocess to PowerShell/VBScript.
3. **CSV bridge**: For each sheet needed, export to CSV (UTF-8). Python reads CSV with the \`csv\` module only.
4. **Standard library only** in Python: no pip packages. Pure Python logic; heavy work in SQL.
5. **SQLite**: Use \`sqlite3\`. Load CSV rows into tables; perform queries, joins, aggregations, and calculations in SQL, not Python loops over large datasets.
6. **Never touch originals**: Copy all inputs to a working folder first; open workbooks read-only in COM. Document this in README.
7. **COM hygiene**: In PowerShell, always \`DisplayAlerts = $false\`, release COM objects (\`[System.Runtime.InteropServices.Marshal]::ReleaseComObject\`), call \`[GC]::Collect()\`, and \`Quit()\` Excel in \`try/finally\` so no orphan EXCEL.EXE processes remain on errors.
8. **Arabic & Excel quirks**: UTF-8 with BOM when writing CSV for Excel; read with \`utf-8-sig\` in Python; set PowerShell output encoding appropriately. Handle merged cells (unmerge on the working copy and fill down), Excel serial dates and text dates (normalize to ISO YYYY-MM-DD), empty rows, and header row detection.
9. **Configuration**: All paths, sheet names, column mapping, output folder, and log level live in \`config.json\`. Validate config on startup with clear, actionable error messages.
10. **Logging**: Use Python \`logging\` with timestamps; write a log file (rotating or per-run). Print clear console messages for operators.
11. **Deliverables** (each file written out **in full** in your answer — no placeholders, no "...", no "rest of code here"):
    - \`main.py\`
    - \`config.json\` (with sensible defaults and comments in a separate README section if JSON cannot hold comments)
    - \`export_excel.ps1\`
    - \`README.txt\` (operator steps, assumptions, troubleshooting)
    - \`run.bat\` (double-click friendly)
    Plus step-by-step instructions to zip the project folder using Windows Explorer ("Send to > Compressed (zipped) folder") and PowerShell \`Compress-Archive\`.

## How you must work with me
**Before writing ANY code**, ask clarifying questions about everything that is missing, including at minimum:
- Exact input file names and folder paths
- Which sheets to process and their purpose
- Column names, types, and business meaning
- Required calculations, reports, and output format (Excel, CSV, SQLite views, printed summary)
- Excel version and locale
- PowerShell execution policy restrictions on my machine
- Python version (\`python --version\` output)
Wait for my answers. Only then produce the full deliverables.

Include a short **"Context to fill in"** block with bracketed fields I should complete before I send this prompt, for example:
[INPUT_FOLDER], [OUTPUT_FOLDER], [WORKBOOK_NAMES], [SHEETS_AND_COLUMNS], [REPORT_DESCRIPTION], [PYTHON_VERSION], [EXCEL_VERSION], [EXECUTION_POLICY].

Start by presenting the "Context to fill in" block and your clarifying questions. Do not write code until I reply.`,
    },
  ];
})(window.ACADEMY = window.ACADEMY || {});
