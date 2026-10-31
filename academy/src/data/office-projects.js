/* The unit-3 projects: two big examples and a kit of skills, in the same TV factory as unit 2 (no factory or company is
   named). Both examples are deliberately clean: every file has the same simple shape, every code is in the masters,
   nothing is missing or repeated. The point is the method, step by step, and the finished result.
   Example 1 (lessons a1–a2): 13 weekly production reports stacked into one big sheet, two columns added with VLOOKUP
   from two small two-column masters (the model name and the country name), then pivot tables, a report, charts and a
   dashboard. Example 2 (lessons a3–a4): the third quarter's commercial review from three branch Excel files, six PDF
   reports (export sales and shipments) and two Word memos (returns and targets), into one workbook of tables with the same
   two VLOOKUP columns, then a report, charts and a PowerPoint deck. The kit (lesson a6) holds the skills that repeat both.
   Each example also ships its finished result (Final_Result/): real workbooks with formulas, pivot tables and charts,
   and the finished deck, built by academy/tools/make-finals.py from these same generators and embedded by the build.
   Every data file is in English, like the factory's own; README, Prompts and answer keys follow the reader's language.
   Seeded generators build the same rows every time, and data.test.mjs recomputes every `expected` figure from the files.
   Everything is illustrative. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  const X = A.xlProjects, LN = X.linesTable, MD = X.modelsTable, rng = X.rng, SERIAL0 = X.serial0;
  const DAY0 = Date.UTC(2026, 0, 1);
  const date = (day) => ({ d: SERIAL0 + day });
  const monthOf = (day) => new Date(DAY0 + day * 864e5).getUTCMonth() + 1;
  const ym = (m) => "2026-" + String(m).padStart(2, "0");
  const pad = (n) => String(n).padStart(2, "0");
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const n = (x) => Number(x).toLocaleString("en-US");
  const Q3 = [181, 273];   // 1 July – 30 September 2026 (day numbers from 1 January)
  const MONTH1 = { 7: 181, 8: 212, 9: 243 }, MON = { 7: "July", 8: "August", 9: "September" };
  const modelName = Object.fromEntries(MD.map((m) => [m[0], m[1]]));
  const MK = [["EG", "Egypt"], ["SA", "Saudi Arabia"], ["AE", "United Arab Emirates"], ["KW", "Kuwait"], ["JO", "Jordan"], ["IQ", "Iraq"], ["LY", "Libya"], ["MA", "Morocco"], ["KE", "Kenya"], ["NG", "Nigeria"]];
  const countryName = Object.fromEntries(MK);
  const masters = () => ({ path: "Data/Masters.xlsx", sheets: [
    { name: "Models", rows: [["ModelCode", "ModelName"], ...MD.map((m) => [m[0], m[1]])] },
    { name: "Countries", rows: [["CountryCode", "CountryName"], ...MK] },
  ] });

  /* ================= example 1 · production: 13 weekly reports → one big sheet + 2 VLOOKUP columns → dashboard ================= */
  const HEAD1 = ["Date", "WorkOrder", "LineCode", "ModelCode", "CountryCode", "Qty", "Value"];
  let PROD = null;
  function production() {   // one row per production batch, in date order
    if (PROD) return PROD;
    const r = rng(20260701), rows = [];
    let wo = 4102000;
    for (let d = Q3[0]; d < Q3[1]; d++) {
      if (new Date(DAY0 + d * 864e5).getUTCDay() === 5) continue;   // Friday: the factory is closed
      for (const [line, , , size] of LN) {
        const k = 1 + Math.floor(r() * size);
        for (let i = 0; i < k; i++) {
          const m = MD[Math.floor(r() * MD.length)], x = r();
          const cc = x < 0.56 ? "EG" : MK[1 + Math.min(MK.length - 2, Math.floor(((x - 0.56) / 0.44) * (MK.length - 1)))][0];
          const q = 5 + Math.floor(r() * m[4]);
          rows.push({ day: d, week: Math.min(13, Math.floor((d - Q3[0]) / 7) + 1), wo: "WO-" + ++wo, line, mc: m[0], cc, q, v: q * m[3] });
        }
      }
    }
    return (PROD = rows);
  }
  const prodRow = (x) => [date(x.day), x.wo, x.line, x.mc, x.cc, x.q, x.v];
  function ex1Files() {
    const out = [];
    for (let w = 1; w <= 13; w++) out.push({ path: `Data/Weekly_Reports/Week_${pad(w)}.xlsx`, sheets: [{ name: "Production", rows: [HEAD1, ...production().filter((x) => x.week === w).map(prodRow)] }] });
    out.push(masters());
    return out;
  }
  function ex1Expected() {
    const all = production(), by = (f, val = (x) => x.q) => { const o = {}; for (const x of all) o[f(x)] = (o[f(x)] || 0) + val(x); return o; };
    const top = (o) => Object.entries(o).sort((a, b) => b[1] - a[1])[0];
    const units = sum(all, (x) => x.q), egypt = sum(all.filter((x) => x.cc === "EG"), (x) => x.q);
    const models = by((x) => modelName[x.mc]), lines = by((x) => x.line), tm = top(models), tl = top(lines);
    return { files: 13, weeks: [...Array(13)].map((_, i) => all.filter((x) => x.week === i + 1).length), rows: all.length, units, value: sum(all, (x) => x.v),
      months: by((x) => monthOf(x.day)), monthValue: by((x) => monthOf(x.day), (x) => x.v), lines, countries: by((x) => countryName[x.cc]), countryValue: by((x) => countryName[x.cc], (x) => x.v), models,
      topModel: { name: tm[0], units: tm[1] }, bestLine: { line: tl[0], units: tl[1] }, exportShare: Math.round(((units - egypt) / units) * 1000) / 10, first: "2026-07-01", last: "2026-09-30" };
  }

  /* ================= example 2 · the commercial review: Excel + PDF + Word → tables with 2 VLOOKUP columns → report → PowerPoint ================= */
  const PRICE = Object.fromEntries(MD.map((m) => [m[0], Math.round((m[3] * 1.24) / 10) * 10]));   // a net selling price per model (EGP)
  const EXPRICE = Object.fromEntries(MD.map((m) => [m[0], Math.round((PRICE[m[0]] * 0.94) / 10) * 10]));   // the export price
  const DOM = ["Cairo", "Alexandria", "Delta"], CH = [...DOM, "Export"];
  const SHIP = { Cairo: [150, 2800], Alexandria: [150, 4200], Delta: [150, 3500], Export: [420, 48000] };   // sets per shipment, EGP per shipment
  const TF = { Cairo: 1.04, Alexandria: 0.93, Delta: 1.09, Export: 0.97 };                               // how far the target sat above or below
  let COM = null;
  function commercial() {
    if (COM) return COM;
    const r = rng(20261001), branch = { Cairo: [], Alexandria: [], Delta: [] }, exp = [], returns = [];
    let inv = 50000;
    for (const m of [7, 8, 9]) {
      for (const ch of DOM) for (const md of MD) {   // each branch sells most models every month, in one to three invoices
        if (r() < 0.15) continue;
        const base = ch === "Cairo" ? 620 : ch === "Delta" ? 400 : 330, w = md[2] === "Small" ? 1.3 : md[2] === "Medium" ? 1 : md[2] === "Large" ? 0.6 : 0.3;
        let left = 10 + Math.floor(r() * base * w);
        const parts = 1 + Math.floor(r() * 3);
        for (let k = 0; k < parts && left > 0; k++) {
          const q = k === parts - 1 ? left : Math.max(1, Math.floor(left / (parts - k)));
          left -= q;
          branch[ch].push({ m, day: MONTH1[m] + Math.floor(r() * 28), inv: "INV-" + ++inv, mc: md[0], q, v: q * PRICE[md[0]] });
        }
      }
      for (const [cc] of MK.slice(1)) for (const md of MD) {   // export: each country buys a handful of models
        if (r() < 0.62) continue;
        const q = 20 + Math.floor(r() * 120);
        exp.push({ m, cc, mc: md[0], q, v: q * EXPRICE[md[0]] });
      }
    }
    for (const ch of DOM) branch[ch].sort((a, b) => a.day - b.day || a.inv.localeCompare(b.inv));
    exp.sort((a, b) => a.m - b.m || a.cc.localeCompare(b.cc) || a.mc.localeCompare(b.mc));
    const sales = [...DOM.flatMap((ch) => branch[ch].map((x) => ({ ...x, ch, cc: "EG" }))), ...exp.map((x) => ({ ...x, ch: "Export" }))];
    const ships = [];
    for (const m of [7, 8, 9]) for (const ch of CH) {
      const units = sum(sales.filter((x) => x.m === m && x.ch === ch), (x) => x.q), k = Math.ceil(units / SHIP[ch][0]);
      ships.push({ m, ch, shipments: k, units, freight: k * SHIP[ch][1] });
    }
    for (const md of MD) for (const m of [7, 8, 9]) { const sold = sum(sales.filter((x) => x.mc === md[0] && x.m === m), (x) => x.q); returns.push({ mc: md[0], m, q: Math.round(sold * (0.004 + r() * (md[2] === "Extra Large" ? 0.03 : 0.012))) }); }
    const target = Object.fromEntries(CH.map((ch) => { const s = sales.filter((x) => x.ch === ch); return [ch, { u: Math.round((sum(s, (x) => x.q) * TF[ch]) / 100) * 100, v: Math.round((sum(s, (x) => x.v) * TF[ch]) / 1e6) * 1e6 }]; }));
    return (COM = { branch, exp, sales, ships, returns, target });
  }

  // a one-page PDF report: a title, the period, one table with right-aligned figures
  function pdfReport(title, sub, cols, rows) {   // cols: [{ h, x, right }]
    const items = [{ x: 40, y: 800, t: title, size: 14, bold: true }, { x: 40, y: 782, t: sub, size: 9 }, { x: 555, y: 800, t: "SYSTEM REPORT", size: 8, bold: true, right: true }];
    let y = 748;
    for (const c of cols) items.push({ x: c.x, y, t: c.h, size: 8.5, bold: true, right: c.right });
    for (const row of rows) { y -= 15; row.forEach((v, i) => items.push({ x: cols[i].x, y, t: typeof v === "number" ? n(v) : v, size: 8.5, right: cols[i].right })); }
    items.push({ x: 555, y: 40, t: "Page 1 of 1", size: 8, right: true }, { x: 40, y: 40, t: "Printed by the plant reporting system. Figures in EGP.", size: 8 });
    return { title, pages: [{ items, rules: [[40, 742, 555, 742]], bands: [[40, 742, 515, 18]] }] };
  }
  const exportRows = (m) => commercial().exp.filter((x) => x.m === m);
  const lastDay = (m) => (m === 9 ? 30 : 31);
  function exportPdf(m) {
    const cols = [{ h: "CountryCode", x: 40 }, { h: "ModelCode", x: 160 }, { h: "Qty", x: 400, right: true }, { h: "NetSales", x: 555, right: true }];
    return pdfReport(`Export Sales - ${MON[m]} 2026`, `Period: ${ym(m)}-01 to ${ym(m)}-${lastDay(m)}    Currency: EGP`, cols, exportRows(m).map((x) => [x.cc, x.mc, x.q, x.v]));
  }
  function shipPdf(m) {
    const cols = [{ h: "Channel", x: 40 }, { h: "Shipments", x: 300, right: true }, { h: "Units", x: 420, right: true }, { h: "FreightEGP", x: 555, right: true }];
    return pdfReport(`Shipments - ${MON[m]} 2026`, `Period: ${ym(m)}-01 to ${ym(m)}-${lastDay(m)}    Warehouse: Finished Goods`, cols, commercial().ships.filter((x) => x.m === m).map((x) => [x.ch, x.shipments, x.units, x.freight]));
  }
  const HEAD2 = ["Date", "InvoiceNo", "ModelCode", "Qty", "NetSales"];
  function ex2Files() {
    const C = commercial();
    return [
      ...DOM.map((ch) => ({ path: `Data/Excel/Sales_${ch}_Q3.xlsx`, sheets: [{ name: "Sales", rows: [HEAD2, ...C.branch[ch].map((x) => [date(x.day), x.inv, x.mc, x.q, x.v])] }] })),
      { ...masters(), path: "Data/Excel/Masters.xlsx" },
      ...[7, 8, 9].map((m) => ({ path: `Data/PDF/Export_Sales_${ym(m)}.pdf`, pdf: exportPdf(m) })),
      ...[7, 8, 9].map((m) => ({ path: `Data/PDF/Shipments_${ym(m)}.pdf`, pdf: shipPdf(m) })),
      { path: "Data/Word/Returns_Q3.docx", docx: { blocks: [
        { p: "Quality Department - Market Returns, Q3 2026", bold: true, size: 28 },
        { p: "To: Commercial Director    From: Quality Manager" },
        { p: "Returned sets per model and month, counted when the set reaches the service centre." },
        { table: [["ModelCode", "Jul", "Aug", "Sep"], ...MD.map((md) => [md[0], ...[7, 8, 9].map((m) => String(C.returns.find((x) => x.mc === md[0] && x.m === m).q))])] },
      ] } },
      { path: "Data/Word/Targets_Q3.docx", docx: { blocks: [
        { p: "Commercial Department - Q3 2026 Targets", bold: true, size: 28 },
        { p: "To: Planning    From: Commercial Director" },
        { p: "These are the approved third-quarter targets per channel, in sets and in EGP." },
        { table: [["Channel", "TargetUnits", "TargetSales"], ...CH.map((ch) => [ch, String(C.target[ch].u), String(C.target[ch].v)])] },
      ] } },
    ];
  }
  function ex2Expected() {
    const C = commercial(), ch = {}, months = { 7: 0, 8: 0, 9: 0 }, countries = {};
    for (const s of C.sales) { ch[s.ch] = ch[s.ch] || { q: 0, v: 0 }; ch[s.ch].q += s.q; ch[s.ch].v += s.v; months[s.m] += s.v; }
    for (const s of C.exp) countries[countryName[s.cc]] = (countries[countryName[s.cc]] || 0) + s.v;
    const ach = Object.fromEntries(CH.map((k) => [k, Math.round((ch[k].v / C.target[k].v) * 1000) / 10]));
    const fr = {}; for (const s of C.ships) { fr[s.ch] = fr[s.ch] || { u: 0, f: 0, n: 0 }; fr[s.ch].u += s.units; fr[s.ch].f += s.freight; fr[s.ch].n += s.shipments; }
    const perUnit = Object.fromEntries(CH.map((k) => [k, Math.round((fr[k].f / fr[k].u) * 10) / 10]));
    const rr = MD.map((m) => { const sold = sum(C.sales.filter((x) => x.mc === m[0]), (x) => x.q), ret = sum(C.returns.filter((x) => x.mc === m[0]), (x) => x.q); return { mc: m[0], name: m[1], ret, sold, rate: Math.round((ret / sold) * 1000) / 10 }; }).sort((a, b) => b.ret / b.sold - a.ret / a.sold);
    return { files: 11, salesRows: C.sales.length, branchRows: Object.fromEntries(DOM.map((k) => [k, C.branch[k].length])), exportRows: { 7: exportRows(7).length, 8: exportRows(8).length, 9: exportRows(9).length },
      salesQty: sum(C.sales, (x) => x.q), salesValue: sum(C.sales, (x) => x.v), channels: ch, months, countries, achievement: ach, target: C.target,
      shipments: sum(C.ships, (x) => x.shipments), shipUnits: sum(C.ships, (x) => x.units), freight: sum(C.ships, (x) => x.freight), freightPerUnit: perUnit,
      returns: sum(C.returns, (x) => x.q), topReturns: rr.slice(0, 3), returnRates: rr,
      achievementAll: Math.round((sum(C.sales, (x) => x.v) / sum(CH, (k) => C.target[k].v)) * 1000) / 10, freightPerSet: Math.round((sum(C.ships, (x) => x.freight) / sum(C.ships, (x) => x.units)) * 10) / 10 };
  }

  /* ================= the skills kit (lesson a6) ================= */
  const SK = {
    "safe-office-automation": `---
name: safe-office-automation
description: House rules for any tool that reads Excel, Word, PDF or PowerPoint files on this laptop. Use whenever you write or change a script that opens Office files, so the originals stay untouched, every run is logged and the totals are checked.
---

# Safe Office automation

Apply these rules to every script you write for Office files. They are not optional.

1. Read the original files from Data, and intermediate workbooks made earlier from Output. Open every file
   read-only. Never save into Data.
2. Write every result to an Output folder next to Data. Name versions _v2, _v3; never overwrite an approved output.
3. Turn Office alerts off while the tool runs, and close and release Excel, Word and PowerPoint at the end,
   even after an error (try/finally, then release every COM object).
4. Write Output/Run_Log.txt: one line per file read with its row count and its total, and the grand totals.
5. Stop with a message naming the file and the column when a file doesn't match the description.
6. Before writing code, ask about anything the description doesn't say, and wait for the answers.
7. Deliver the script, a double-click launcher, a short guide, and a check that compares the result's totals with
   the totals of the files it read.
`,
    "production-dashboard": `---
name: production-dashboard
description: Builds the quarterly production workbook and its Excel dashboard from the weekly reports (Week_nn.xlsx) and Masters.xlsx. Use when asked to refresh, rebuild or check the production dashboard, or when a new quarter's weekly reports arrive.
---

# Production dashboard

Follow the house rules in the safe-office-automation skill first.

## Inputs
- Data/Weekly_Reports/Week_nn.xlsx: sheet Production, headers in row 1. The columns are in reference/data-dictionary.md.
- Data/Masters.xlsx: sheet Models (ModelCode, ModelName) and sheet Countries (CountryCode, CountryName).

## Step 1 - the big sheet (Output/Production_Q.xlsx)
Stack every weekly report under the other in one Data sheet, add SourceFile and Month (yyyy-mm), copy the two master
sheets into the workbook, and add two columns with VLOOKUP formulas: ModelName from Models and CountryName from
Countries. Make the data an Excel Table named tblProduction.

## Step 2 - the dashboard (Output/Production_Q_Dashboard.xlsx)
Build what reference/dashboard-spec.md lists: the pivot tables, the Report sheet, the charts and the Dashboard sheet.
Compare it with the finished example in Final_Result/ when one is given.

## Checks before you say it is done
Run every check in reference/checks.md and paste the results at the end of the log.
`,
    "production-dashboard/reference/data-dictionary.md": `# Data dictionary - weekly production reports

| Column | Type | Meaning |
|---|---|---|
| Date | date | the day the batch was produced |
| WorkOrder | text WO-nnnnnnn | the batch's work order |
| LineCode | text L01-L06 | assembly line |
| ModelCode | text M101-M112 | TV model; its name is in Masters, sheet Models |
| CountryCode | text, two letters | where the batch is sold; the name is in Masters, sheet Countries |
| Qty | whole number | sets produced |
| Value | number | Qty x standard cost, in EGP |
`,
    "production-dashboard/reference/dashboard-spec.md": `# Dashboard specification

- Pivots sheet: PT_MonthLine (rows Month, columns LineCode, sum of Qty); PT_Country (rows CountryName, sum of Qty
  and of Value, largest first); PT_Model (rows ModelName, sum of Qty, largest first).
- Report sheet: title and period; four figures (total sets, total value in EGP million, export share %, top model);
  a month-by-month table; thousands separators; landscape, one page wide.
- Charts: sets by month and line (columns), sets by country (bars), sets by model (bars).
- Dashboard sheet: the four figures, the three charts, and slicers for Month, LineCode and CountryName connected to
  every pivot table.
- Everything refreshes with Data > Refresh All when tblProduction changes. No figure is typed by hand.
`,
    "production-dashboard/reference/checks.md": `# Checks

1. Rows in tblProduction = the sum of the rows of the weekly reports.
2. Sum of Qty in tblProduction = the sum of Qty in the weekly reports = the grand total of every pivot table.
3. No ModelName or CountryName shows #N/A.
4. Pick one slicer value (one line) and compare one figure with a filter on tblProduction.
`,
    "commercial-review-pack": `---
name: commercial-review-pack
description: Gathers the quarter's commercial figures from the branch Excel files, the PDF reports (export sales, shipments) and the Word memos (returns, targets) into one workbook, then builds the review report and the PowerPoint deck. Use for the quarterly commercial review or when any of these sources is refreshed.
---

# Commercial review pack

Follow the house rules in the safe-office-automation skill first.

## Sources (see reference/sources.md)
Excel: Sales_Cairo, Sales_Alexandria, Sales_Delta (the same columns). PDF: Export_Sales_yyyy-mm, Shipments_yyyy-mm (one
table each). Word: Returns_Q, Targets_Q (one table each). Masters: Models, Countries.

## Step 1 - one workbook of tables (Output/Q_Commercial_DB.xlsx)
Sales (Month, Channel, CountryCode, CountryName, ModelCode, ModelName, Qty, NetSales, SourceFile) with CountryName and
ModelName as VLOOKUP formulas; Shipments; Returns; Targets. A Sources sheet lists every file with its rows and total.

## Step 2 - the review and the deck
Pivot tables, a Report sheet and charts; then Output/Q_Commercial_Review.pptx following reference/deck-outline.md,
with the charts from the workbook and every number read from the pivot tables. The last slide is left for the
director's own conclusions: never write conclusions for them. Compare with Final_Result/ when it is given.
`,
    "commercial-review-pack/reference/sources.md": `# Sources

- Sales_<Branch>_Q3.xlsx: sheet Sales; Date, InvoiceNo, ModelCode, Qty, NetSales. Channel = the branch in the file
  name, CountryCode = EG.
- Export_Sales_yyyy-mm.pdf: one table: CountryCode, ModelCode, Qty, NetSales. Channel = Export.
- Shipments_yyyy-mm.pdf: one table: Channel, Shipments, Units, FreightEGP.
- Returns_Q3.docx: one table: ModelCode, Jul, Aug, Sep (sets returned).
- Targets_Q3.docx: one table: Channel, TargetUnits, TargetSales (EGP).
- Masters.xlsx: Models (ModelCode, ModelName), Countries (CountryCode, CountryName).
`,
    "commercial-review-pack/reference/deck-outline.md": `# Deck outline (8 slides)

1. Title: Q3 commercial review and the period.
2. Key figures: net sales, sets sold, achievement against target, freight per set.
3. Sales against target by channel (chart and four numbers).
4. Monthly trend (chart).
5. Export sales by country (chart).
6. Logistics: shipments, sets shipped, freight per set by channel.
7. Returns: the three models with the highest return rate.
8. For discussion: an empty slide for the director's conclusions and decisions.
`,
  };

  /* ================= the projects ================= */
  const T = (lang) => (a, e) => (lang === "ar" ? a : e);
  const bom = "\ufeff";
  const crlf = (s) => s.replace(/\r?\n/g, "\r\n");
  const prompt = (id, lang) => { const p = (A.prompts || []).find((x) => x.id === id); return p ? crlf(p.text[lang]) + "\r\n" : ""; };
  // the finished results, built by academy/tools/make-finals.py and embedded by the build as base64 (#final-files)
  const finals = () => {
    if (!A.finalFiles) { const el = typeof document !== "undefined" && document.getElementById && document.getElementById("final-files"); A.finalFiles = el ? JSON.parse(el.textContent) : {}; }
    return A.finalFiles;
  };
  const finalFiles = (names) => names.filter((f) => finals()[f]).map((f) => ({ path: "Final_Result/" + f, b64: finals()[f] }));
  const P = [];

  P.push({
    n: 1, lessons: ["a1", "a2"], lesson: "a1", slug: "Production_Dashboard", short: u("الإنتاج وداشبورد", "Production dashboard"),
    title: u("المثال الأول: ١٣ تقرير أسبوعي في شيت واحد، وداشبورد جوّه إكسل", "Example 1: 13 weekly reports in one sheet, and a dashboard inside Excel"),
    about: u("١٣ تقرير إنتاج أسبوعي للربع التالت، كلهم بنفس الأعمدة. بيتحطوا تحت بعض في شيت واحد كبير، ويتضاف لهم عمودين بـ VLOOKUP من ملف Masters: اسم الموديل واسم البلد. وبعدين جداول محورية، وتقرير، ورسوم، وداشبورد. والنتيجة النهائية جاهزة في فولدر Final_Result تقارن بيها.",
      "13 weekly production reports for the third quarter, all with the same columns. They are stacked into one big sheet, and two columns are added with VLOOKUP from the Masters file: the model name and the country name. Then come pivot tables, a report, charts and a dashboard. The finished result is ready in the Final_Result folder to compare with."),
    tool: "u3-ex1", prompts: ["a1a", "a2a"], finalNames: ["Production_Q3_Final.xlsx"], data: ex1Files, expected: ex1Expected,
  });
  P.push({
    n: 2, lessons: ["a3", "a4"], lesson: "a3", slug: "Commercial_Review", short: u("المراجعة التجارية", "Commercial review"),
    title: u("المثال التاني: إكسل وPDF ووورد في ملف واحد، وعرض باوربوينت في الآخر", "Example 2: Excel, PDF and Word in one workbook, and a PowerPoint deck at the end"),
    about: u("مراجعة الربع التالت التجارية من ١١ ملف في ٣ أشكال: ٣ ملفات إكسل لمبيعات الفروع بنفس الأعمدة، و٦ تقارير PDF (مبيعات التصدير والشحنات)، ومذكرتين وورد (المرتجعات والمستهدف). كلهم بيتجمعوا في ملف واحد بنفس عمودين الـ VLOOKUP، وبعدين تقرير ورسوم، وفي الآخر عرض باوربوينت. والنتيجة النهائية جاهزة في Final_Result.",
      "The third quarter's commercial review from 11 files in 3 formats: 3 Excel files of branch sales with the same columns, 6 PDF reports (export sales and shipments) and 2 Word memos (returns and targets). They are gathered into one workbook with the same two VLOOKUP columns, then a report and charts, and finally a PowerPoint deck. The finished result is ready in Final_Result."),
    tool: "u3-ex2", prompts: ["a3a", "a4a"], finalNames: ["Q3_Commercial_Final.xlsx", "Q3_Commercial_Review.pptx", "Q3_Commercial_Review.pdf"], data: ex2Files, expected: ex2Expected,
  });
  P.push({
    n: 3, lessons: ["a6"], lesson: "a6", slug: "Skills_Kit", short: u("طقم المهارات", "Skills kit"),
    title: u("طقم المهارات: المثالين بيتكرروا بأمر واحد", "The skills kit: both examples repeat with one command"),
    about: u("تلات مهارات جاهزة لـ Claude Code: مهارة لقواعد الأمان في أي أداة أوفيس، ومهارة لداشبورد الإنتاج، ومهارة لمراجعة الربع التجارية. كل مهارة فولدر فيه ملف SKILL.md وملفات مرجع، وتتحط في فولدر المشروع أو تترفع على حسابك.",
      "Three ready skills for Claude Code: one for the safety rules of any Office tool, one for the production dashboard, and one for the quarter's commercial review. Each skill is a folder holding a SKILL.md file and reference files, placed in the project folder or uploaded to your account."),
    prompts: ["a6a"], finalNames: [], data: () => Object.entries(SK).map(([k, text]) => ({ path: "skills/" + (k.includes("/") ? k : k + "/SKILL.md"), text })), expected: () => ({ skills: Object.keys(SK).filter((k) => !k.includes("/")), files: Object.keys(SK).length }),
  });

  /* ---------- the guide files ---------- */
  function guide(p, lang) {
    const t = T(lang), E = p.expected(), k = (x) => n(Math.round(x));
    if (p.n === 1) return {
      data: [t("- Data/Weekly_Reports/Week_01.xlsx … Week_13.xlsx: تقرير إنتاج لكل أسبوع، شيت Production، العناوين في الصف الأول:", "- Data/Weekly_Reports/Week_01.xlsx … Week_13.xlsx: one production report per week, sheet Production, headers in row 1:"), "  " + HEAD1.join(" | "),
        t("- Data/Masters.xlsx: شيت Models (ModelCode، ModelName) وشيت Countries (CountryCode، CountryName): قاعدتين صغيرين، كل واحدة عمودين.", "- Data/Masters.xlsx: sheet Models (ModelCode, ModelName) and sheet Countries (CountryCode, CountryName): two small databases of two columns each.")],
      rules: [t("- كل الملفات بنفس الأعمدة وبنفس الترتيب، وكل كود موجود في Masters.", "- Every file has the same columns in the same order, and every code is in Masters."), t("- الكمية Qty بعدد الأجهزة، والقيمة Value بالجنيه.", "- Qty is in sets, and Value in EGP."), t("- المصنع قافل يوم الجمعة.", "- The factory is closed on Fridays.")],
      out: [t("- الخطوة ١ (الدرس ١): Output/Production_Q3.xlsx: شيت Data فيه كل الصفوف تحت بعض، ومعاهم SourceFile وMonth، وعمودين بمعادلات VLOOKUP: ModelName وCountryName، وجدول إكسل اسمه tblProduction.", "- Step 1 (lesson 1): Output/Production_Q3.xlsx: a Data sheet holding every row stacked, with SourceFile and Month, and two columns of VLOOKUP formulas: ModelName and CountryName, as an Excel Table named tblProduction."),
        t("- الخطوة ٢ (الدرس ٢): Output/Production_Q3_Dashboard.xlsx: جداول محورية، وتقرير، ورسوم، وداشبورد بسلايسر.", "- Step 2 (lesson 2): Output/Production_Q3_Dashboard.xlsx: pivot tables, a report, charts, and a dashboard with slicers."),
        t("- النتيجة النهائية للمقارنة: Final_Result/Production_Q3_Final.xlsx (البيانات بعمودين الـ VLOOKUP، والجداول المحورية، والتقرير بمعادلات، والرسوم، والداشبورد؛ والسلايسر بتتضاف فيه بدوسة، والطريقة مكتوبة في أول الداشبورد).", "- The finished result to compare with: Final_Result/Production_Q3_Final.xlsx (the data with the two VLOOKUP columns, the pivot tables, the report as formulas, the charts and the dashboard; slicers are added to it with one click, as noted at the top of the dashboard).")],
      key: [t(`- ملفات: ${E.files} · صفوف الشيت الكبير: ${n(E.rows)} · الأجهزة: ${n(E.units)} · القيمة: ${n(E.value)} جنيه`, `- Files: ${E.files} · rows in the big sheet: ${n(E.rows)} · sets: ${n(E.units)} · value: EGP ${n(E.value)}`),
        t(`- حسب الشهر: يوليو ${n(E.months[7])} · أغسطس ${n(E.months[8])} · سبتمبر ${n(E.months[9])}`, `- By month: July ${n(E.months[7])} · August ${n(E.months[8])} · September ${n(E.months[9])}`),
        t(`- نسبة التصدير: ${E.exportShare}٪ · أعلى موديل: ${E.topModel.name} (${n(E.topModel.units)}) · أعلى خط: ${E.bestLine.line} (${n(E.bestLine.units)})`, `- Export share: ${E.exportShare}% · top model: ${E.topModel.name} (${n(E.topModel.units)}) · top line: ${E.bestLine.line} (${n(E.bestLine.units)})`),
        "", t("حسب الخط:", "By line:"), ...Object.entries(E.lines).sort().map(([c, q]) => `  ${c}: ${n(q)}`),
        "", t("حسب البلد:", "By country:"), ...Object.entries(E.countries).sort((a, b) => b[1] - a[1]).map(([c, q]) => `  ${c}: ${n(q)}`),
        "", t("حسب الموديل:", "By model:"), ...Object.entries(E.models).sort((a, b) => b[1] - a[1]).map(([c, q]) => `  ${c}: ${n(q)}`)],
    };
    if (p.n === 2) return {
      data: [t("- Data/Excel/Sales_Cairo_Q3.xlsx وSales_Alexandria_Q3.xlsx وSales_Delta_Q3.xlsx: مبيعات كل فرع، شيت Sales بنفس الأعمدة:", "- Data/Excel/Sales_Cairo_Q3.xlsx, Sales_Alexandria_Q3.xlsx and Sales_Delta_Q3.xlsx: each branch's sales, sheet Sales with the same columns:"), "  " + HEAD2.join(" | "),
        t("- Data/Excel/Masters.xlsx: شيت Models (ModelCode، ModelName) وشيت Countries (CountryCode، CountryName).", "- Data/Excel/Masters.xlsx: sheet Models (ModelCode, ModelName) and sheet Countries (CountryCode, CountryName)."),
        t("- Data/PDF/Export_Sales_2026-07.pdf … 09: جدول واحد: CountryCode، ModelCode، Qty، NetSales.", "- Data/PDF/Export_Sales_2026-07.pdf … 09: one table: CountryCode, ModelCode, Qty, NetSales."),
        t("- Data/PDF/Shipments_2026-07.pdf … 09: جدول واحد: Channel، Shipments، Units، FreightEGP.", "- Data/PDF/Shipments_2026-07.pdf … 09: one table: Channel, Shipments, Units, FreightEGP."),
        t("- Data/Word/Returns_Q3.docx: جدول المرتجعات: ModelCode، Jul، Aug، Sep.", "- Data/Word/Returns_Q3.docx: the returns table: ModelCode, Jul, Aug, Sep."),
        t("- Data/Word/Targets_Q3.docx: جدول المستهدف: Channel، TargetUnits، TargetSales (بالجنيه).", "- Data/Word/Targets_Q3.docx: the targets table: Channel, TargetUnits, TargetSales (EGP).")],
      rules: [t("- القنوات أربعة: Cairo وAlexandria وDelta (من ملفات الإكسل، CountryCode = EG) وExport (من الـ PDF).", "- There are four channels: Cairo, Alexandria and Delta (from the Excel files, CountryCode = EG) and Export (from the PDFs)."), t("- الشهر من التاريخ في الإكسل، ومن اسم الملف في الـ PDF.", "- The month comes from the date in the Excel files, and from the file name for the PDFs."), t("- كل المبالغ بالجنيه، وكل كود موجود في Masters.", "- Every amount is in EGP, and every code is in Masters.")],
      out: [t("- الخطوة ١ (الدرس ٣): Output/Q3_Commercial_DB.xlsx: شيت Sales (Month، Channel، CountryCode، CountryName، ModelCode، ModelName، Qty، NetSales، SourceFile) واسم البلد واسم الموديل بمعادلات VLOOKUP، وشيت Shipments، وشيت Returns، وشيت Targets، وشيت Sources.", "- Step 1 (lesson 3): Output/Q3_Commercial_DB.xlsx: a Sales sheet (Month, Channel, CountryCode, CountryName, ModelCode, ModelName, Qty, NetSales, SourceFile) with the country and model names as VLOOKUP formulas, plus Shipments, Returns, Targets and Sources sheets."),
        t("- الخطوة ٢ (الدرس ٤): Output/Q3_Commercial_Review.xlsx (جداول محورية وتقرير ورسوم) وOutput/Q3_Commercial_Review.pptx (٨ شرائح).", "- Step 2 (lesson 4): Output/Q3_Commercial_Review.xlsx (pivot tables, report, charts) and Output/Q3_Commercial_Review.pptx (8 slides)."),
        t("- النتيجة النهائية للمقارنة: Final_Result/Q3_Commercial_Final.xlsx وQ3_Commercial_Review.pptx وPDF منه.", "- The finished result to compare with: Final_Result/Q3_Commercial_Final.xlsx, Q3_Commercial_Review.pptx and its PDF.")],
      key: [t(`- صفوف المبيعات: ${n(E.salesRows)} · صافي المبيعات: ${k(E.salesValue)} جنيه · ${n(E.salesQty)} جهاز`, `- Sales rows: ${n(E.salesRows)} · net sales: EGP ${k(E.salesValue)} · ${n(E.salesQty)} sets`),
        ...CH.map((c) => t(`  ${c}: ${n(E.channels[c].q)} جهاز · ${k(E.channels[c].v)} جنيه · المستهدف ${k(E.target[c].v)} · التحقيق ${E.achievement[c]}٪`, `  ${c}: ${n(E.channels[c].q)} sets · EGP ${k(E.channels[c].v)} · target ${k(E.target[c].v)} · achievement ${E.achievement[c]}%`)),
        t(`- حسب الشهر (جنيه): يوليو ${k(E.months[7])} · أغسطس ${k(E.months[8])} · سبتمبر ${k(E.months[9])}`, `- By month (EGP): July ${k(E.months[7])} · August ${k(E.months[8])} · September ${k(E.months[9])}`),
        t(`- الشحنات: ${E.shipments} شحنة · ${n(E.shipUnits)} جهاز · نولون ${k(E.freight)} جنيه`, `- Shipments: ${E.shipments} · ${n(E.shipUnits)} sets · freight EGP ${k(E.freight)}`),
        t(`- النولون للجهاز: القاهرة ${E.freightPerUnit.Cairo} · الإسكندرية ${E.freightPerUnit.Alexandria} · الدلتا ${E.freightPerUnit.Delta} · التصدير ${E.freightPerUnit.Export} جنيه`, `- Freight per set: Cairo ${E.freightPerUnit.Cairo} · Alexandria ${E.freightPerUnit.Alexandria} · Delta ${E.freightPerUnit.Delta} · Export EGP ${E.freightPerUnit.Export}`),
        t(`- المرتجعات: ${n(E.returns)} جهاز · أعلى ٣ نسب: ${E.topReturns.map((x) => `${x.mc} (${x.rate}٪)`).join(" · ")}`, `- Returns: ${n(E.returns)} sets · top 3 rates: ${E.topReturns.map((x) => `${x.mc} (${x.rate}%)`).join(" · ")}`),
        "", t("مبيعات التصدير حسب البلد (جنيه):", "Export sales by country (EGP):"), ...Object.entries(E.countries).sort((a, b) => b[1] - a[1]).map(([c, v]) => `  ${c}: ${k(v)}`)],
    };
    return {
      data: [t("- skills/safe-office-automation/SKILL.md: قواعد الأمان في أي أداة بتفتح ملفات أوفيس.", "- skills/safe-office-automation/SKILL.md: the safety rules for any tool that opens Office files."),
        t("- skills/production-dashboard/: المثال الأول كمهارة: SKILL.md وفولدر reference فيه دليل البيانات ومواصفة الداشبورد والمراجعات.", "- skills/production-dashboard/: example 1 as a skill: SKILL.md and a reference folder holding the data dictionary, the dashboard specification and the checks."),
        t("- skills/commercial-review-pack/: المثال التاني كمهارة: SKILL.md وفولدر reference فيه المصادر وترتيب الشرايح.", "- skills/commercial-review-pack/: example 2 as a skill: SKILL.md and a reference folder holding the sources and the slide outline.")],
      rules: [t("- ملفات المهارة بالإنجليزي، زي ملفات المصنع، علشان أي نموذج وأي زميل يقراها بنفس الشكل.", "- The skill files are in English, like the factory's files, so any model and any colleague read them the same way."), t("- أول سطور SKILL.md (بين علامتين ---) فيها name وdescription: الوصف هو اللي بيخلّي Claude يعرف إمتى يستخدم المهارة لوحده.", "- SKILL.md's first lines (between two --- marks) hold name and description: the description is how Claude knows when to use the skill on its own.")],
      out: [t("- مكان المهارات في المشروع: ‎.claude\\skills\\<اسم المهارة>\\SKILL.md جوّه فولدر المشروع، أو ‎%USERPROFILE%\\.claude\\skills لكل مشاريعك على الجهاز.", "- Where the skills go: .claude\\skills\\<skill name>\\SKILL.md inside the project folder, or %USERPROFILE%\\.claude\\skills for all your projects on this machine."),
        t("- في تطبيق Claude: من إعدادات المهارات، ارفع فولدر المهارة مضغوط، فتشتغل في الويب وفي الجلسات اللي على السحابة.", "- In the Claude app: from the skills settings, upload the skill folder as a zip, and it works on the web and in cloud sessions.")],
      steps: [t("١. فك الملف، وانسخ فولدر skills بالتلات مهارات جوّه ‎.claude في فولدر المشروع (جنب فولدر Data بتاع المثالين).", "1. Unzip, and copy the skills folder with its three skills into .claude inside the project folder (next to the two examples' Data folders)."),
        t("٢. افتح Claude Code في الفولدر ده، واكتب ‎/skills: لازم تشوف التلاتة.", "2. Open Claude Code in that folder and type /skills: you should see all three."),
        t("٣. اكتب ‎/production-dashboard أو اطلب بالكلام: «حدّث داشبورد الإنتاج من تقارير الأسابيع الجديدة».", "3. Type /production-dashboard, or ask in words: “refresh the production dashboard from the new weekly reports”."),
        t("٤. قارن النتيجة بالنتيجة النهائية الجاهزة في المثال، وبعدين غيّر سطر واحد في المهارة وجرّب تاني.", "4. Compare the result with the example's finished result, then change one line in the skill and try again."),
        t("٥. اكتب مهارتك الأولى لشغلك إنت، بنفس الشكل: Prompt_1.txt فيه الطلب.", "5. Write your first skill for your own work, in the same shape: Prompt_1.txt holds the request.")],
      key: [t(`- ${E.skills.length} مهارات · ${E.files} ملف`, `- ${E.skills.length} skills · ${E.files} files`), ...E.skills.map((s) => "  " + s)],
    };
  }
  function readme(p, lang) {
    const t = T(lang), g = guide(p, lang), rule = "=".repeat(40), files = p.prompts.map((id, i) => `Prompt_${i + 1}.txt`);
    const steps = g.steps || [
      t(`١. فك الملف في فولدر لوحده، مثلًا C:\\Automation\\${p.folder}، وخلّي فولدر Data زي ما هو.`, `1. Unzip into a folder of its own, for example C:\\Automation\\${p.folder}, and leave the Data folder as it is.`),
      t("٢. افتح Prompt_1.txt، وحط مسار الفولدر بتاعك مكان [مسار الفولدر]، والصقه كله في ChatGPT أو Gemini Enterprise أو Claude.", "2. Open Prompt_1.txt, put your folder's path in place of [folder path], and paste all of it into ChatGPT, Gemini Enterprise or Claude."),
      t("٣. جاوب أسئلة النموذج من «قواعد الشغل» فوق.", "3. Answer the model's questions from the “Business rules” above."),
      t("٤. احفظ الأداة جنب فولدر Data (نفس طريقة الوحدة التانية)، وشغّلها، واقرا Run_Log.txt.", "4. Save the tool next to the Data folder (the same way as in unit 2), run it and read Run_Log.txt."),
      t("٥. كمّل بـ Prompt_2.txt في نفس المحادثة.", "5. Go on with Prompt_2.txt in the same chat."),
      t("٦. قارن الناتج بـ Answer_Key.txt وبالنتيجة النهائية في Final_Result: نفس الأرقام ونفس الشكل.", "6. Compare your output with Answer_Key.txt and with the finished result in Final_Result: the same figures and the same layout."),
      t("٧. وفي المحاضرة، لو الوقت ضيق: افتح Ready_Tool واعمل دبل كليك على Run_Tool.bat، والأداة الجاهزة هتطلّع نفس النتيجة على جهازك (التفاصيل في Ready_Tool\\START_HERE.txt).", "7. In a lecture, if time is short: open Ready_Tool and double-click Run_Tool.bat, and the ready tool produces the same result on your machine (details in Ready_Tool\\START_HERE.txt)."),
    ];
    return crlf([
      t(`الوحدة ٣ — ${p.title.ar}`, `Unit 3 — ${p.title.en}`),
      t("كل ملفات البيانات بالإنجليزي · كل الأرقام توضيحية", "Every data file is in English · every figure is illustrative"), rule, "",
      t("الموقف", "The situation"), p.about[lang], "",
      t("في الفولدر", "In this folder"),
      p.n === 3 ? t("- skills/: التلات مهارات.", "- skills/: the three skills.") : t("- Data/: الملفات اللي هتشتغل عليها (ما تعدّلش فيها).", "- Data/: the files you work on (don't edit them)."),
      ...(p.finalNames.length ? [t("- Final_Result/: النتيجة النهائية جاهزة، علشان تشوف شكلها قبل وبعد ما تبني.", "- Final_Result/: the finished result, so you can see it before and after you build.")] : []),
      ...(p.tool ? [t("- Ready_Tool/: الأداة الجاهزة كاملة: Run_Tool.bat بيشغّل الخطوات كلها بضغطة (إكسل ووورد وباوربوينت بطريقة COM، والحساب بـ Python النقي)، والتوثيق في docs (SKILL.md وHISTORY.md وLESSONS.md).", "- Ready_Tool/: the complete ready tool: Run_Tool.bat runs every step in one click (Excel, Word and PowerPoint through COM, the arithmetic in pure Python), with its documentation in docs (SKILL.md, HISTORY.md and LESSONS.md).")] : []),
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
    p.folder = `Unit3_${p.n === 3 ? "" : "Example_" + p.n + "_"}${p.slug}`; p.zip = p.folder + ".zip";
    p.files = () => [...p.data(), ...finalFiles(p.finalNames)];   // the data, then the finished result
    p.guides = (lang) => [{ path: "README.txt", text: bom + readme(p, lang) }, ...p.prompts.map((id, i) => ({ path: `Prompt_${i + 1}.txt`, text: bom + prompt(id, lang) })), { path: "Answer_Key.txt", text: bom + answerKey(p, lang) }];
    p.readyTool = (lang) => (p.tool && A.readyTools ? A.readyTools.bundle(p.tool, lang) : []);   // Ready_Tool/: the finished automation, one click
    p.bundle = (lang) => [...p.guides(lang), ...p.files(), ...p.readyTool(lang)];
  }
  A.officeProjects = {
    list: P, byLesson: Object.fromEntries(P.flatMap((p) => p.lessons.map((l) => [l, p]))), guide, readme, answerKey,
    production, commercial, masters: MK, price: PRICE, exportPrice: EXPRICE, skills: SK, head1: HEAD1, head2: HEAD2, channels: CH,
  };
})(window.ACADEMY = window.ACADEMY || {});
