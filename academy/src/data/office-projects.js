/* The unit-3 projects: two big examples and a kit of skills, in the same TV factory as unit 2 (no factory or company is
   named). Example 1 (lessons a1–a2): thirteen weekly exports from the production system stacked into one table, two
   small two-column masters looked up into new columns, then pivot tables, a formatted report, a charts sheet and a
   dashboard with slicers inside Excel. Example 2 (lessons a3–a4): the third quarter's commercial review gathered from
   three Excel files of three shapes, six PDF reports printed by the system (export sales and outbound shipments) and two
   Word memos, into one raw-data table; then the report, its charts, and a PowerPoint deck built from them. The kit
   (lesson a6) holds the skills that make both examples repeat.
   Every data file is in English, like the factory's own; README, Prompts and answer keys follow the reader's language.
   Seeded generators build the same rows every time, and data.test.mjs recomputes every `expected` figure from the files,
   the way a correct tool would. Problems planted on purpose are listed per project. Everything is illustrative. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  const X = A.xlProjects, LN = X.linesTable, MD = X.modelsTable, rng = X.rng, SERIAL0 = X.serial0;
  const DAY0 = Date.UTC(2026, 0, 1);
  const date = (day) => ({ d: SERIAL0 + day });
  const iso = (day) => new Date(DAY0 + day * 864e5).toISOString().slice(0, 10);
  const monthOf = (day) => new Date(DAY0 + day * 864e5).getUTCMonth() + 1;
  const ym = (m) => "2026-" + String(m).padStart(2, "0");
  const pad = (n) => String(n).padStart(2, "0");
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const n = (x) => Number(x).toLocaleString("en-US");
  const ad = (x) => String(x).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  const Q3 = [181, 273];   // 1 July – 30 September 2026 (day numbers from 1 January)
  const MON = { 7: "July", 8: "August", 9: "September" };
  const modelName = Object.fromEntries(MD.map((m) => [m[0], m[1]]));

  /* ================= example 1 · production: weekly exports → one table → pivots, report, charts, dashboard ================= */
  const MK = [["EG", "Egypt"], ["SA", "Saudi Arabia"], ["AE", "United Arab Emirates"], ["KW", "Kuwait"], ["JO", "Jordan"], ["IQ", "Iraq"], ["LY", "Libya"], ["MA", "Morocco"], ["KE", "Kenya"], ["NG", "Nigeria"]];
  const NEWM = ["M114", "50-inch QLED TV", 13900, 30];   // launched in August; the Models sheet hasn't been updated
  const NEWMK = "OM";                                     // Oman: first orders in September; not in the Markets sheet yet
  const EXP = ["Posting Date", "Prod Order", "Line", "Material", "Market", "Confirmed Qty", "Std Value EGP"];
  let PROD = null;
  function production() {   // one row per confirmed production order, in date order
    if (PROD) return PROD;
    const r = rng(20260701), rows = [];
    let order = 4102000;
    for (let d = Q3[0]; d < Q3[1]; d++) {
      if (new Date(DAY0 + d * 864e5).getUTCDay() === 5) continue;   // Friday: the factory is closed
      for (const [line, , , size] of LN) {
        const k = 1 + Math.floor(r() * size);
        for (let i = 0; i < k; i++) {
          let m = MD[Math.floor(r() * MD.length)], mc = m[0], cost = m[3], most = m[4];
          if (d >= 212 && r() < 0.05) { mc = NEWM[0]; cost = NEWM[2]; most = NEWM[3]; }
          const x = r();
          let mk = x < 0.56 ? "EG" : x < 0.58 ? "" : MK[1 + Math.floor(((x - 0.58) / 0.42) * (MK.length - 1))][0];
          if (d >= 243 && mk !== "EG" && mk !== "" && r() < 0.12) mk = NEWMK;
          const q = 5 + Math.floor(r() * most);
          rows.push({ day: d, week: Math.min(13, Math.floor((d - Q3[0]) / 7) + 1), order: ++order, line, mc, mk, q, v: q * cost });
        }
      }
    }
    return (PROD = rows);
  }
  const weekSpan = (w) => { const days = production().filter((x) => x.week === w).map((x) => x.day); return [Math.min(...days), Math.max(...days)]; };
  function exportSheet(w) {   // what the system prints: two title lines and a blank line above the header
    const [a, b] = weekSpan(w), body = production().filter((x) => x.week === w).map((x) => [date(x.day), x.order, x.line, x.mc, x.mk, x.q, x.v]);
    return { name: "Export", head: 3, rows: [["Production Confirmations - TV Assembly Plant"], [`Period: ${iso(a)} to ${iso(b)}    Exported: ${iso(b + 1)} 06:00    User: PLANNING01`], [], EXP, ...body] };
  }
  const DUP_WEEK = 6;
  function ex1Files() {
    const out = [];
    for (let w = 1; w <= 13; w++) {
      out.push({ path: `Data/Weekly_Exports/Confirmations_W${pad(w)}.xlsx`, sheets: [exportSheet(w)] });
      if (w === DUP_WEEK) out.push({ path: `Data/Weekly_Exports/Confirmations_W${pad(w)} (1).xlsx`, sheets: [exportSheet(w)] });   // trap: the same export downloaded twice
    }
    out.push({ path: "Data/Masters.xlsx", sheets: [
      { name: "Models", rows: [["ModelCode", "ModelName"], ...MD.map((m) => [m[0], m[1]])] },
      { name: "Markets", rows: [["MarketCode", "Country"], ...MK] },
    ] });
    return out;
  }
  function ex1Expected() {
    const all = production(), dup = all.filter((x) => x.week === DUP_WEEK);
    const country = (x) => (x.mk === "" ? "Unallocated (stock)" : x.mk === NEWMK ? "(not in master)" : MK.find((m) => m[0] === x.mk)[1]);
    const by = (f) => { const o = {}; for (const x of all) o[f(x)] = (o[f(x)] || 0) + x.q; return o; };
    const byModel = by((x) => modelName[x.mc] || "(not in master)"), named = Object.entries(byModel).filter(([k]) => k !== "(not in master)").sort((a, b) => b[1] - a[1]);
    const units = sum(all, (x) => x.q), exported = sum(all.filter((x) => x.mk !== "EG" && x.mk !== ""), (x) => x.q);
    const nm = all.filter((x) => x.mc === NEWM[0]), nk = all.filter((x) => x.mk === NEWMK), blank = all.filter((x) => x.mk === "");
    const months = { 7: 0, 8: 0, 9: 0 }, value = { 7: 0, 8: 0, 9: 0 };
    for (const x of all) { months[monthOf(x.day)] += x.q; value[monthOf(x.day)] += x.v; }
    const lines = by((x) => x.line), bestLine = Object.entries(lines).sort((a, b) => b[1] - a[1])[0];
    return { files: 14, weeks: 13, rowsRead: all.length + dup.length, dupFile: `Confirmations_W${pad(DUP_WEEK)} (1).xlsx`, dupRows: dup.length, rows: all.length, units, value: sum(all, (x) => x.v),
      months, monthValue: value, countries: by(country), lines, bestLine: { line: bestLine[0], units: bestLine[1] },
      topModel: { name: named[0][0], units: named[0][1] }, exportShare: Math.round((exported / units) * 1000) / 10,
      newModel: { code: NEWM[0], rows: nm.length, units: sum(nm, (x) => x.q) }, newMarket: { code: NEWMK, rows: nk.length, units: sum(nk, (x) => x.q) },
      blank: { rows: blank.length, units: sum(blank, (x) => x.q) }, firstDay: iso(Q3[0]), lastDay: iso(Q3[1] - 1) };
  }

  /* ================= example 2 · the commercial review: Excel + PDF + Word → one raw table → report → PowerPoint ================= */
  const PRICE = Object.fromEntries(MD.map((m) => [m[0], Math.round((m[3] * 1.24) / 10) * 10]));   // a net selling price per model (EGP)
  const DOM = ["Cairo", "Alexandria", "Delta"];
  const EXPC = MK.slice(1).map((m) => m[1]);                                                       // export countries, by name
  const FREIGHT = { Cairo: 2800, Alexandria: 4200, Delta: 3500 };                                  // EGP per truck
  const CONT = { "Saudi Arabia": 36500, "United Arab Emirates": 41200, Kuwait: 44800, Jordan: 33900, Iraq: 52600, Libya: 39400, Morocco: 61500, Kenya: 68200, Nigeria: 74900 };   // EGP per container
  let COM = null;
  function commercial() {
    if (COM) return COM;
    const r = rng(20261001), sales = [], ships = [], returns = [];
    let inv = 50000, ship = 7300;
    for (const m of [7, 8, 9]) {
      for (const ch of DOM) for (const md of MD) {   // domestic: every channel sells most models every month
        if (r() < 0.18) continue;
        const base = ch === "Cairo" ? 620 : ch === "Delta" ? 400 : 330, q = 10 + Math.floor(r() * base * (md[2] === "Small" ? 1.3 : md[2] === "Medium" ? 1 : md[2] === "Large" ? 0.6 : 0.3));
        sales.push({ m, ch, country: "Egypt", mc: md[0], q, v: q * PRICE[md[0]] });
      }
      for (const c of EXPC) for (const md of MD) {   // export: each country buys a handful of models
        if (r() < 0.62) continue;
        const q = 20 + Math.floor(r() * 120);
        sales.push({ m, ch: "Export", country: c, mc: md[0], q, v: q * Math.round((PRICE[md[0]] * 0.94) / 10) * 10 });
      }
    }
    // Cairo's invoice lines: each month's quantity split over a few invoices, two credit notes, one June invoice left in the file
    const cairo = [];
    for (const s of sales.filter((x) => x.ch === "Cairo")) {
      let left = s.q;
      while (left > 0) { const part = Math.min(left, 20 + Math.floor(r() * 90)); left -= part; const day = [181, 212, 243][s.m - 7] + Math.floor(r() * 28); cairo.push({ day, inv: "INV-C-" + ++inv, type: "INV", mc: s.mc, q: part, v: part * PRICE[s.mc] }); }
    }
    cairo.sort((a, b) => a.day - b.day || a.inv.localeCompare(b.inv));
    for (const [q, m] of [[8, 8], [4, 9]]) {   // credit notes: sets sent back by a dealer, credited in the month
      const s = sales.find((x) => x.ch === "Cairo" && x.m === m && x.q > 40 && x.mc > "M104"), mc = s.mc;
      s.q -= q; s.v -= q * PRICE[mc]; cairo.push({ day: [181, 212, 243][m - 7] + 20, inv: "CN-C-" + ++inv, type: "CN", mc, q: -q, v: -q * PRICE[mc] });
    }
    const june = { day: 180, inv: "INV-C-49871", type: "INV", mc: "M102", q: 36, v: 36 * PRICE.M102 };   // trap: dated 30 June, outside the quarter
    // shipments: every month's positive domestic sales leave in trucks of up to 150 sets, export in containers of up to 420
    for (const m of [7, 8, 9]) for (const dest of [...DOM, ...EXPC]) {
      const units = sum(sales.filter((x) => x.m === m && (x.ch === dest || x.country === dest) && (DOM.includes(dest) ? x.ch === dest : x.ch === "Export")), (x) => Math.max(0, x.q));
      const cap = DOM.includes(dest) ? 150 : 420;
      let left = units, k = 0;
      while (left > 0) { const u_ = Math.min(left, cap); left -= u_; ships.push({ m, no: "SHP-" + ++ship, day: [181, 212, 243][m - 7] + 1 + ((k++ * 3 + dest.length) % 27), dest, mode: DOM.includes(dest) ? "Truck" : "Container", units: u_, freight: DOM.includes(dest) ? FREIGHT[dest] : CONT[dest] }); }
    }
    ships.sort((a, b) => a.day - b.day || a.no.localeCompare(b.no));
    // returns from the market, by model and month (reported by quality, by model name)
    for (const md of MD) for (const m of [7, 8, 9]) { const sold = sum(sales.filter((x) => x.mc === md[0] && x.m === m), (x) => Math.max(0, x.q)); returns.push({ mc: md[0], m, q: Math.round(sold * (0.004 + r() * (md[2] === "Extra Large" ? 0.03 : 0.012))) }); }
    const target = { Cairo: { u: 0, v: 0 }, Alexandria: { u: 0, v: 0 }, Delta: { u: 0, v: 0 }, Export: { u: 0, v: 0 } };
    const TF = { Cairo: 1.04, Alexandria: 0.93, Delta: 1.09, Export: 0.97 };
    for (const ch of Object.keys(target)) { const s = sales.filter((x) => x.ch === ch); target[ch] = { u: Math.round((sum(s, (x) => x.q) * TF[ch]) / 100) * 100, v: Math.round((sum(s, (x) => x.v) * TF[ch]) / 1e6) * 1e6 }; }
    return (COM = { sales, cairo, june, ships, returns, target });
  }

  // the PDF reports: a header band, the period, a table that runs on to page 2 with its header repeated, page numbers, a TOTAL line
  const fmtN = (v) => (v < 0 ? "(" + n(-v) + ")" : n(v));
  function pdfReport(title, sub, cols, rows, total) {   // cols: [{ h, x, right }]
    const per = 34, pages = [], chunks = [];
    for (let i = 0; i < rows.length; i += per) chunks.push(rows.slice(i, i + per));
    chunks.forEach((ch, pi) => {
      const items = [{ x: 40, y: 800, t: title, size: 14, bold: true }, { x: 40, y: 782, t: sub, size: 9 }, { x: 555, y: 800, t: "SYSTEM REPORT", size: 8, bold: true, right: true }];
      let y = 748;
      if (pi > 0) items.push({ x: 40, y: 764, t: "(continued)", size: 8 });
      for (const c of cols) items.push({ x: c.x, y, t: c.h, size: 8.5, bold: true, right: c.right });
      const rules = [[40, y - 6, 555, y - 6]], bands = [[40, y - 6, 515, 18]];
      for (const row of ch) { y -= 18; row.forEach((v, i) => items.push({ x: cols[i].x, y, t: typeof v === "number" ? fmtN(v) : v, size: 8.5, right: cols[i].right })); }
      if (pi === chunks.length - 1) { y -= 22; rules.push([40, y + 14, 555, y + 14]); total.forEach((v, i) => v !== "" && items.push({ x: cols[i].x, y, t: typeof v === "number" ? fmtN(v) : v, size: 8.5, bold: true, right: cols[i].right })); }
      items.push({ x: 555, y: 40, t: `Page ${pi + 1} of ${chunks.length}`, size: 8, right: true }, { x: 40, y: 40, t: "Printed by the plant reporting system. Figures in EGP.", size: 8 });
      pages.push({ items, rules, bands });
    });
    return { title, pages };
  }
  const exportRows = (m) => commercial().sales.filter((x) => x.ch === "Export" && x.m === m).sort((a, b) => a.country.localeCompare(b.country) || a.mc.localeCompare(b.mc));
  function exportPdf(m) {
    const rows = exportRows(m).map((x) => [x.country, x.mc, modelName[x.mc], x.q, x.v]);
    if (m === 9) { const c = commercial().sales.find((x) => x.ch === "Export" && x.m === 9 && x.country === "Kuwait"); rows.push(["Kuwait", c.mc, modelName[c.mc] + " - credit note", -12, -12 * Math.round(c.v / c.q)]); }   // trap: a credit note printed in brackets
    const cols = [{ h: "Country", x: 40 }, { h: "Model", x: 160 }, { h: "Description", x: 210 }, { h: "Qty", x: 440, right: true }, { h: "Net Sales EGP", x: 555, right: true }];
    return pdfReport(`Export Sales Summary - ${MON[m]} 2026`, `Period: ${ym(m)}-01 to ${ym(m)}-${m === 7 || m === 8 ? 31 : 30}    Currency: EGP    Source: billing`, cols, rows, ["TOTAL", "", "", sum(rows, (r) => r[3]), sum(rows, (r) => r[4])]);
  }
  function shipPdf(m) {
    const rows = commercial().ships.filter((x) => x.m === m).map((x) => [x.no, iso(x.day), x.dest, x.mode, x.units, x.freight]);
    const cols = [{ h: "Shipment", x: 40 }, { h: "Date", x: 120 }, { h: "Destination", x: 200 }, { h: "Mode", x: 330 }, { h: "Units", x: 450, right: true }, { h: "Freight EGP", x: 555, right: true }];
    return pdfReport(`Outbound Shipments - ${MON[m]} 2026`, `Period: ${ym(m)}    Warehouse: Finished Goods    Source: dispatch`, cols, rows, ["TOTAL", `${rows.length} shipments`, "", "", sum(rows, (r) => r[4]), sum(rows, (r) => r[5])]);
  }
  function ex2Files() {
    const C = commercial(), sales = (ch, m) => C.sales.filter((x) => x.ch === ch && (!m || x.m === m));
    const cairoRows = [C.june, ...C.cairo].map((x) => [date(x.day), x.inv, x.type, x.mc, x.q, x.v]);
    const alex = MD.map((md) => { const row = [md[0]]; let tq = 0, tv = 0; for (const m of [7, 8, 9]) { const s = sales("Alexandria", m).find((x) => x.mc === md[0]); row.push(s ? s.q : 0, s ? s.v : 0); tq += s ? s.q : 0; tv += s ? s.v : 0; } row.push(tq, tv); return row; });
    alex.push(["Total", ...[1, 2, 3, 4, 5, 6, 7, 8].map((i) => sum(alex, (r) => r[i]))]);   // trap: a totals row and a totals column
    const delta = [7, 8, 9].map((m) => { const rows = sales("Delta", m).map((x) => [x.mc, x.q, x.v]); return { name: m === 9 ? "September" : MON[m].slice(0, 3), rows: [["Model", "Qty", "Net Sales"], ...rows, ["Total", sum(rows, (r) => r[1]), sum(rows, (r) => r[2])]] }; });
    const ret = MD.map((md) => { const q = [7, 8, 9].map((m) => C.returns.find((x) => x.mc === md[0] && x.m === m).q); return [md[1], ...q.map(String), String(q[0] + q[1] + q[2])]; });
    const tot = sum(C.returns, (x) => x.q);
    return [
      { path: "Data/Excel/Sales_Cairo_Q3.xlsx", sheets: [{ name: "Invoices", rows: [["Invoice Date", "Document", "Type", "Model", "Qty", "Net Sales"], ...cairoRows] }] },
      { path: "Data/Excel/Sales_Alexandria_Q3.xlsx", sheets: [{ name: "Summary", rows: [["Model", "Jul Qty", "Jul Sales", "Aug Qty", "Aug Sales", "Sep Qty", "Sep Sales", "Q3 Qty", "Q3 Sales"], ...alex] }] },
      { path: "Data/Excel/Sales_Delta_Q3.xlsx", sheets: delta },
      { path: "Data/Excel/Masters.xlsx", sheets: [{ name: "Models", rows: [["ModelCode", "ModelName"], ...MD.map((m) => [m[0], m[1]])] }] },
      ...[7, 8, 9].map((m) => ({ path: `Data/PDF/Export_Sales_${ym(m)}.pdf`, pdf: exportPdf(m) })),
      ...[7, 8, 9].map((m) => ({ path: `Data/PDF/Outbound_Shipments_${ym(m)}.pdf`, pdf: shipPdf(m) })),
      { path: "Data/Word/Returns_Memo_Q3.docx", docx: { blocks: [
        { p: "Quality Department - Market Returns, Q3 2026", bold: true, size: 28 },
        { p: "To: Commercial Director    From: Quality Manager    Date: 2026-10-04" },
        { p: `Market returns in the third quarter came to ${n(tot)} sets. The table below lists them by model and month of return. Returns are counted when the set reaches the service centre.` },
        { table: [["Model", "July", "August", "September", "Q3"], ...ret] },
        { p: "Large and extra-large sets carry most of the returns, mainly transport damage to panels. We propose a packaging review with logistics." },
      ] } },
      { path: "Data/Word/Targets_Memo_Q3.docx", docx: { blocks: [
        { p: "Commercial Department - Q3 2026 Targets", bold: true, size: 28 },
        { p: "To: Planning    From: Commercial Director    Date: 2026-06-24" },
        { p: `These are the approved third-quarter targets per channel. The export target, EGP ${n(C.target.Export.v / 1e6)} million, includes every export market.` },
        { table: [["Channel", "Target Units", "Target Net Sales (EGP 000)"], ...Object.entries(C.target).map(([ch, t]) => [ch, n(t.u), n(t.v / 1000)])] },
        { p: "Please report achievement against these figures in the quarterly review." },
      ] } },
    ];
  }
  function ex2Expected() {
    const C = commercial(), ch = {}, bym = { 7: 0, 8: 0, 9: 0 }, byc = {};
    for (const s of C.sales) { ch[s.ch] = ch[s.ch] || { q: 0, v: 0 }; ch[s.ch].q += s.q; ch[s.ch].v += s.v; bym[s.m] += s.v; }
    const kw = C.sales.find((x) => x.ch === "Export" && x.m === 9 && x.country === "Kuwait"), credit = { q: -12, v: -12 * Math.round(kw.v / kw.q) };
    ch.Export.q += credit.q; ch.Export.v += credit.v; bym[9] += credit.v;
    for (const s of C.sales.filter((x) => x.ch === "Export")) byc[s.country] = (byc[s.country] || 0) + s.v;
    byc.Kuwait += credit.v;
    const ach = Object.fromEntries(Object.keys(C.target).map((k) => [k, Math.round((ch[k].v / C.target[k].v) * 1000) / 10]));
    const fr = {}; for (const s of C.ships) { const k = DOM.includes(s.dest) ? s.dest : "Export"; fr[k] = fr[k] || { u: 0, f: 0, n: 0 }; fr[k].u += s.units; fr[k].f += s.freight; fr[k].n++; }
    const perUnit = Object.fromEntries(Object.entries(fr).map(([k, x]) => [k, Math.round((x.f / x.u) * 10) / 10]));
    const sold = {}; for (const s of C.sales) sold[s.mc] = (sold[s.mc] || 0) + Math.max(0, s.q);
    const rr = MD.map((m) => ({ mc: m[0], name: m[1], ret: sum(C.returns.filter((x) => x.mc === m[0]), (x) => x.q), rate: 0 }));
    for (const x of rr) x.rate = Math.round((x.ret / sold[x.mc]) * 1000) / 10;
    rr.sort((a, b) => b.rate - a.rate);
    const salesQ = sum(Object.values(ch), (x) => x.q), salesV = sum(Object.values(ch), (x) => x.v);
    const pdfTotals = [7, 8, 9].map((m) => ({ m, exportQty: sum(exportRows(m), (x) => x.q) + (m === 9 ? credit.q : 0), shipments: C.ships.filter((x) => x.m === m).length, units: sum(C.ships.filter((x) => x.m === m), (x) => x.units) }));
    return { files: 14, salesQty: salesQ, salesValue: salesV, channels: ch, months: bym, countries: byc, achievement: ach, target: C.target,
      shipments: C.ships.length, shipUnits: sum(C.ships, (x) => x.units), freight: sum(C.ships, (x) => x.freight), freightPerUnit: perUnit,
      returns: sum(C.returns, (x) => x.q), topReturn: rr[0], cairoLines: C.cairo.length, credit, june: C.june, pdfTotals,
      bestChannel: Object.entries(ach).sort((a, b) => b[1] - a[1])[0], worstChannel: Object.entries(ach).sort((a, b) => a[1] - b[1])[0] };
  }

  /* ================= the skills kit (lesson a6) ================= */
  const SK = {
    "safe-office-automation": `---
name: safe-office-automation
description: House rules for any tool that reads Excel, Word, PDF or PowerPoint files on this laptop. Use whenever you write or change a script that opens Office files, so the originals stay untouched, every run is logged and the tool stops with a clear message instead of guessing.
---

# Safe Office automation

Apply these rules to every script you write for Office files. They are not optional.

1. Read only from the Data folder. Open every file read-only. Never save into Data.
2. Write every result to an Output folder next to Data. Name versions _v2, _v3; never overwrite an approved output.
3. Turn Office alerts off while the tool runs, and close and release Excel, Word and PowerPoint at the end,
   even after an error (try/finally, then release every COM object).
4. Write Output/Run_Log.txt: one line per file read, every rule applied, every row skipped and why, and the totals.
5. Stop with a message naming the file, the sheet or page and the column when something doesn't fit the description.
   Never guess a column, a unit or a date format.
6. Before writing code, ask about anything the description doesn't say, and wait for the answers.
7. Deliver the script, a double-click launcher, a short guide and three tests: a normal run, a run on a copy with
   one column removed (it must stop), and a run on a copy with one duplicate (it must report it).
`,
    "production-dashboard": `---
name: production-dashboard
description: Builds the quarterly production table and Excel dashboard from the weekly confirmation exports (Confirmations_Wnn.xlsx) and Masters.xlsx. Use when asked to refresh, rebuild or check the production dashboard, or when new weekly exports arrive.
---

# Production dashboard

Follow the house rules in the safe-office-automation skill first.

## Inputs
- Data/Weekly_Exports/Confirmations_Wnn.xlsx: sheet Export; two title lines and a blank line above the header.
  Find the header row by the cell "Prod Order"; never assume row 1.
- Data/Masters.xlsx: sheet Models (ModelCode, ModelName) and sheet Markets (MarketCode, Country).
- The columns, their types and their meaning are in reference/data-dictionary.md. Read it before any change.

## Step 1 - the table (Output/Production_Q.xlsx)
Stack every export by column name, add ModelName and Country by lookup, Month as text yyyy-mm and SourceFile.
Rules: Prod Order is unique (an order seen before is not added again; a file whose orders were all seen is a
duplicate download: skip it and log it); a blank Market means "Unallocated (stock)"; a code missing from a master
gets "(not in master)" and goes on the Unmatched sheet with its rows and quantity. Make the data an Excel Table
named tblProduction.

## Step 2 - the dashboard (Output/Production_Q_Dashboard.xlsx)
Build exactly what reference/dashboard-spec.md lists: three pivot tables, the Report sheet, the Charts sheet and the
Dashboard sheet with slicers for Month, Line and Country connected to every pivot table.

## Checks before you say it is done
Run every check in reference/checks.md and paste their results at the end of the log. If one fails, stop and say which.
`,
    "production-dashboard/reference/data-dictionary.md": `# Data dictionary - weekly confirmation exports

| Column | Type | Meaning |
|---|---|---|
| Posting Date | date | the day the production order was confirmed |
| Prod Order | whole number | production order number, unique across the quarter |
| Line | text L01-L06 | assembly line |
| Material | text M101-M1nn | TV model code; new models may be missing from Masters |
| Market | text, two letters, may be blank | destination market; blank = built for stock, not yet allocated |
| Confirmed Qty | whole number | good sets confirmed |
| Std Value EGP | number | Confirmed Qty x standard cost, from the system (keep it even when the model is unmatched) |
`,
    "production-dashboard/reference/dashboard-spec.md": `# Dashboard specification

- Pivots sheet: PT_MonthLine (rows Month, columns Line, sum of Qty); PT_Country (rows Country, sum of Qty and of
  ValueEGP, largest first); PT_Model (rows ModelName, sum of Qty, top 10).
- Report sheet: title and period; four KPI cells (total sets, total value in EGP million, export share %, top model);
  a month-by-month table; number formats with thousands separators; landscape, one page wide.
- Charts sheet: a clustered column chart of PT_MonthLine, a bar chart of PT_Country, a doughnut of Egypt / export /
  unallocated.
- Dashboard sheet: the three charts as pivot charts, slicers for Month, Line and Country connected to all three
  pivot tables, KPI cards that read the pivots with GETPIVOTDATA, gridlines off.
- Everything refreshes with Data > Refresh All when tblProduction changes. No figure is typed by hand.
`,
    "production-dashboard/reference/checks.md": `# Checks

1. Rows in tblProduction = the sum of data rows read, minus the duplicate download. Write both numbers.
2. Sum of Qty in tblProduction = the grand total of every pivot table.
3. Every Unmatched code is listed with its rows and quantity; nothing was dropped.
4. With every slicer cleared, the KPI cards equal the Report sheet.
5. Pick one slicer value (one line) and compare one figure with a filter on tblProduction.
`,
    "commercial-review-pack": `---
name: commercial-review-pack
description: Gathers the quarter's commercial figures from the regional Excel files, the system PDF reports (export sales, outbound shipments) and the Word memos (returns, targets) into one raw-data table, then builds the review workbook and the PowerPoint deck. Use for the quarterly commercial review or when any of these sources is refreshed.
---

# Commercial review pack

Follow the house rules in the safe-office-automation skill first.

## Sources (see reference/sources.md for each file's shape and traps)
Excel: Sales_Cairo (invoice lines), Sales_Alexandria (one row per model, months as columns), Sales_Delta (one sheet per
month). PDF: Export_Sales_yyyy-mm, Outbound_Shipments_yyyy-mm. Word: Returns_Memo, Targets_Memo. Masters: Models.

## Step 1 - one raw-data table (Output/Q_Commercial_DB.xlsx, sheet Fact)
Columns: Month, Channel, Country, ModelCode, Measure, Value, Source, SourceFile. Measures: SalesQty, NetSalesEGP,
ShippedUnits, FreightEGP, ReturnUnits, TargetUnits, TargetNetSalesEGP. A Sources sheet lists every file with rows read
and its control total; each PDF's TOTAL line must equal the sum of its rows, or stop.

## Step 2 - the review workbook and the deck
Pivot tables for sales against target by channel, the monthly trend, export sales by country, freight per unit by
channel and the return rate by model; a Report sheet and a Charts sheet; then Output/Q_Commercial_Review.pptx
following reference/deck-outline.md, with the charts pasted from the workbook and every number read from the pivots.
The last slide is left for the director's own conclusions: never write conclusions for them.
`,
    "commercial-review-pack/reference/sources.md": `# Sources and their traps

- Sales_Cairo_Q3.xlsx: one row per invoice line; Type CN = credit note (negative, keep it); rows outside the quarter
  (an invoice dated in June) are left out and logged.
- Sales_Alexandria_Q3.xlsx: months as columns (Jul Qty, Jul Sales, ...): unpivot to rows; skip the Total row and the
  Q3 columns.
- Sales_Delta_Q3.xlsx: one sheet per month; read the month from the sheet name's first three letters (Jul, Aug,
  September); skip each Total row.
- Export_Sales_yyyy-mm.pdf: may run onto a second page with the header repeated; numbers have thousands separators;
  a credit note is printed in brackets, (1,234) = -1234; check the TOTAL line.
- Outbound_Shipments_yyyy-mm.pdf: one row per shipment; Destination is a region (domestic) or a country (export).
- Returns_Memo_Q3.docx: the table names models by ModelName: look the code up in Masters; the Q3 column is a total.
- Targets_Memo_Q3.docx: net sales targets are in EGP thousands (see the column header): multiply by 1,000.
`,
    "commercial-review-pack/reference/deck-outline.md": `# Deck outline (8 slides)

1. Title: Q3 commercial review, period, prepared from the system and the memos.
2. Key figures: net sales, sets sold, achievement against target, freight per set.
3. Sales against target by channel (chart and four numbers).
4. Monthly trend (chart).
5. Export sales by country (chart).
6. Logistics: shipments, sets shipped, freight per set by channel (chart and table).
7. Returns: the three models with the highest return rate.
8. For discussion: an empty slide for the director's conclusions and decisions.
`,
  };

  /* ================= the projects ================= */
  const T = (lang) => (a, e) => (lang === "ar" ? a : e);
  const bom = "\ufeff";
  const crlf = (s) => s.replace(/\r?\n/g, "\r\n");
  const prompt = (id, lang) => { const p = (A.prompts || []).find((x) => x.id === id); return p ? crlf(p.text[lang]) + "\r\n" : ""; };
  const P = [];

  P.push({
    n: 1, lessons: ["a1", "a2"], lesson: "a1", slug: "Production_Dashboard", short: u("الإنتاج وداشبورد", "Production dashboard"),
    title: u("المثال الأول: من ١٣ تصدير أسبوعي لداشبورد جوّه إكسل", "Example 1: from 13 weekly exports to a dashboard inside Excel"),
    about: u("١٣ ملف أسبوعي نزلوا من نظام الإنتاج للربع التالت، كل ملف فوقه سطرين عنوان. بيتحطوا تحت بعض في جدول واحد كبير، وبيتضاف لهم عمودين من ملف Masters (اسم الموديل واسم البلد)، وبعدين جداول محورية، وتقرير منسّق، وشيت رسوم بيانية، وداشبورد بسلايسر جوّه إكسل نفسه.",
      "13 weekly files exported from the production system for the third quarter, each with two title lines on top. They are stacked into one big table, two columns are added from the Masters file (the model name and the country name), and then come pivot tables, a formatted report, a charts sheet and a dashboard with slicers inside Excel itself."),
    prompts: ["a1a", "a2a"], files: ex1Files, expected: ex1Expected,
  });
  P.push({
    n: 2, lessons: ["a3", "a4"], lesson: "a3", slug: "Commercial_Review", short: u("المراجعة التجارية", "Commercial review"),
    title: u("المثال التاني: إكسل وPDF ووورد في قاعدة واحدة، وعرض باوربوينت في الآخر", "Example 2: Excel, PDF and Word into one database, and a PowerPoint deck at the end"),
    about: u("مراجعة الربع التالت التجارية من ١٣ ملف في ٣ أشكال: ٣ ملفات إكسل لمبيعات الفروع كل واحد بشكل، و٦ تقارير PDF من النظام (مبيعات التصدير والشحنات)، ومذكرتين وورد (المرتجعات والمستهدف). كلهم بيتجمعوا في جدول بيانات خام واحد، وبعدين تقرير ورسوم، وفي الآخر عرض باوربوينت جاهز.",
      "The third quarter's commercial review from 13 files in 3 formats: 3 Excel files of branch sales, each shaped its own way; 6 PDF reports from the system (export sales and shipments); and 2 Word memos (returns and targets). All of them are gathered into one raw-data table, then a report and charts, and finally a ready PowerPoint deck."),
    prompts: ["a3a", "a4a"], files: ex2Files, expected: ex2Expected,
  });
  P.push({
    n: 3, lessons: ["a6"], lesson: "a6", slug: "Skills_Kit", short: u("طقم المهارات", "Skills kit"),
    title: u("طقم المهارات: المثالين بيتكرروا بأمر واحد", "The skills kit: both examples repeat with one command"),
    about: u("تلات مهارات جاهزة لـ Claude Code: مهارة لقواعد الأمان في أي أداة أوفيس، ومهارة لداشبورد الإنتاج، ومهارة لمراجعة الربع التجارية. كل مهارة فولدر فيه ملف SKILL.md وملفات مرجع، وتتحط في فولدر المشروع أو تترفع على حسابك.",
      "Three ready skills for Claude Code: one for the safety rules of any Office tool, one for the production dashboard, and one for the quarter's commercial review. Each skill is a folder holding a SKILL.md file and reference files, placed in the project folder or uploaded to your account."),
    prompts: ["a6a"], files: () => Object.entries(SK).map(([k, text]) => ({ path: "skills/" + (k.includes("/") ? k : k + "/SKILL.md"), text })), expected: () => ({ skills: Object.keys(SK).filter((k) => !k.includes("/")), files: Object.keys(SK).length }),
  });

  /* ---------- the guide files ---------- */
  function guide(p, lang) {
    const t = T(lang), E = p.expected();
    if (p.n === 1) return {
      data: [t("- Data/Weekly_Exports/Confirmations_W01.xlsx … W13.xlsx: تصدير أسبوعي من نظام الإنتاج، شيت Export. فوق العناوين سطرين عنوان وسطر فاضي، والعناوين في الصف الرابع:", "- Data/Weekly_Exports/Confirmations_W01.xlsx … W13.xlsx: weekly exports from the production system, sheet Export. Two title lines and a blank line sit above the headers, which are on row 4:"), "  " + EXP.join(" | "),
        t("- Data/Masters.xlsx: شيت Models (ModelCode، ModelName) وشيت Markets (MarketCode، Country): قاعدتين صغيرين، كل واحدة عمودين.", "- Data/Masters.xlsx: sheet Models (ModelCode, ModelName) and sheet Markets (MarketCode, Country): two small databases of two columns each.")],
      rules: [t("- Prod Order رقم فريد في الربع كله: الأمر اللي اتقرا قبل كده ما يتضافش تاني.", "- Prod Order is unique across the quarter: an order already read is not added again."), t("- Market فاضي = اتعمل للمخزن ولسه ما اتحددلوش سوق: Country = «Unallocated (stock)».", "- A blank Market = built for stock, not yet allocated: Country = “Unallocated (stock)”."), t("- Std Value EGP جاية من النظام: تفضل زي ما هي حتى لو الموديل مش في Masters.", "- Std Value EGP comes from the system: it stays as it is even when the model isn't in Masters."), t("- المصنع قافل يوم الجمعة.", "- The factory is closed on Fridays.")],
      out: [t("- الخطوة ١ (الدرس ١): Output/Production_Q3.xlsx: شيت Data كجدول إكسل اسمه tblProduction: PostingDate، ProdOrder، Line، Material، ModelName، Market، Country، Qty، ValueEGP، Month، SourceFile؛ وشيت Unmatched؛ وشيت Check.", "- Step 1 (lesson 1): Output/Production_Q3.xlsx: a Data sheet as an Excel Table named tblProduction: PostingDate, ProdOrder, Line, Material, ModelName, Market, Country, Qty, ValueEGP, Month, SourceFile; an Unmatched sheet; and a Check sheet."),
        t("- الخطوة ٢ (الدرس ٢): Output/Production_Q3_Dashboard.xlsx: شيت Pivots (٣ جداول محورية)، وشيت Report منسّق، وشيت Charts، وشيت Dashboard فيه رسوم محورية وسلايسر للشهر والخط والبلد.", "- Step 2 (lesson 2): Output/Production_Q3_Dashboard.xlsx: a Pivots sheet (3 pivot tables), a formatted Report sheet, a Charts sheet, and a Dashboard sheet with pivot charts and slicers for month, line and country.")],
      key: [t(`- ملفات اتقرت: ${E.files} (منهم ملف متكرر: ${E.dupFile}، ${E.dupRows} صف اتسابوا لأنهم اتقروا قبل كده)`, `- Files read: ${E.files} (one a duplicate download: ${E.dupFile}, ${E.dupRows} rows skipped because they were already read)`),
        t(`- صفوف اتقرت: ${n(E.rowsRead)} · صفوف في tblProduction: ${n(E.rows)} · إجمالي الكمية: ${n(E.units)} جهاز · القيمة: ${n(E.value)} جنيه`, `- Rows read: ${n(E.rowsRead)} · rows in tblProduction: ${n(E.rows)} · total quantity: ${n(E.units)} sets · value: EGP ${n(E.value)}`),
        t(`- حسب الشهر: يوليو ${n(E.months[7])} · أغسطس ${n(E.months[8])} · سبتمبر ${n(E.months[9])}`, `- By month: July ${n(E.months[7])} · August ${n(E.months[8])} · September ${n(E.months[9])}`),
        t(`- Unmatched: ${E.newModel.code} (موديل جديد مش في Models): ${E.newModel.rows} صف، ${n(E.newModel.units)} جهاز · ${E.newMarket.code} (سوق جديد مش في Markets): ${E.newMarket.rows} صف، ${n(E.newMarket.units)} جهاز`, `- Unmatched: ${E.newModel.code} (a new model not in Models): ${E.newModel.rows} rows, ${n(E.newModel.units)} sets · ${E.newMarket.code} (a new market not in Markets): ${E.newMarket.rows} rows, ${n(E.newMarket.units)} sets`),
        t(`- Unallocated (stock): ${E.blank.rows} صف، ${n(E.blank.units)} جهاز`, `- Unallocated (stock): ${E.blank.rows} rows, ${n(E.blank.units)} sets`),
        t(`- نسبة التصدير: ${E.exportShare}٪ · أعلى موديل: ${E.topModel.name} (${n(E.topModel.units)} جهاز) · أعلى خط: ${E.bestLine.line} (${n(E.bestLine.units)} جهاز)`, `- Export share: ${E.exportShare}% · top model: ${E.topModel.name} (${n(E.topModel.units)} sets) · top line: ${E.bestLine.line} (${n(E.bestLine.units)} sets)`),
        "", t("حسب البلد (PT_Country):", "By country (PT_Country):"), ...Object.entries(E.countries).sort((a, b) => b[1] - a[1]).map(([c, q]) => `  ${c}: ${n(q)}`)],
      traps: [
        [t("كل الملفات", "every file"), t("سطرين عنوان وسطر فاضي فوق العناوين", "two title lines and a blank line above the headers"), t("الأداة تدوّر على صف العناوين بالخلية «Prod Order»، مش تفترض الصف الأول.", "The tool finds the header row by the cell “Prod Order” instead of assuming row 1.")],
        [E.dupFile, t("نفس تصدير الأسبوع ٦ اتنزّل مرتين", "week 6's export downloaded twice"), t("كل أوامره اتقرت قبل كده: الملف يتساب كله ويتسجّل، والإجمالي ما يتضاعفش.", "All its orders were already read: the whole file is skipped and logged, and the total doesn't double.")],
        ["Market", t(`${E.blank.rows} صف السوق فيهم فاضي`, `${E.blank.rows} rows with a blank market`), t("ما يتمسحوش: Country = «Unallocated (stock)».", "They aren't dropped: Country = “Unallocated (stock)”.")],
        [E.newModel.code, t("موديل جديد من أغسطس مش في Models", "a new model from August, not in Models"), t("ModelName = «(not in master)»، والقيمة تفضل، ويظهر في Unmatched.", "ModelName = “(not in master)”, the value stays, and it appears on Unmatched.")],
        [E.newMarket.code, t("سوق جديد من سبتمبر مش في Markets", "a new market from September, not in Markets"), t("Country = «(not in master)» ويظهر في Unmatched، لحد ما Masters يتحدّث.", "Country = “(not in master)” and it appears on Unmatched, until Masters is updated.")],
      ],
    };
    if (p.n === 2) {
      const ch = E.channels, k = (x) => n(Math.round(x));
      return {
        data: [t("- Data/Excel/Sales_Cairo_Q3.xlsx: سطر لكل بند فاتورة: Invoice Date، Document، Type (INV أو CN)، Model، Qty، Net Sales.", "- Data/Excel/Sales_Cairo_Q3.xlsx: one row per invoice line: Invoice Date, Document, Type (INV or CN), Model, Qty, Net Sales."),
          t("- Data/Excel/Sales_Alexandria_Q3.xlsx: صف لكل موديل، والشهور أعمدة: Jul Qty، Jul Sales، Aug Qty …، وعمودين Q3.", "- Data/Excel/Sales_Alexandria_Q3.xlsx: one row per model with the months as columns: Jul Qty, Jul Sales, Aug Qty … and two Q3 columns."),
          t("- Data/Excel/Sales_Delta_Q3.xlsx: شيت لكل شهر (Jul، Aug، September): Model، Qty، Net Sales، وصف Total.", "- Data/Excel/Sales_Delta_Q3.xlsx: one sheet per month (Jul, Aug, September): Model, Qty, Net Sales, and a Total row."),
          t("- Data/Excel/Masters.xlsx: شيت Models (ModelCode، ModelName).", "- Data/Excel/Masters.xlsx: sheet Models (ModelCode, ModelName)."),
          t("- Data/PDF/Export_Sales_2026-07.pdf … 09: مبيعات التصدير من النظام: Country، Model، Description، Qty، Net Sales EGP، وسطر TOTAL.", "- Data/PDF/Export_Sales_2026-07.pdf … 09: export sales from the system: Country, Model, Description, Qty, Net Sales EGP, and a TOTAL line."),
          t("- Data/PDF/Outbound_Shipments_2026-07.pdf … 09: الشحنات: Shipment، Date، Destination، Mode، Units، Freight EGP، وسطر TOTAL.", "- Data/PDF/Outbound_Shipments_2026-07.pdf … 09: shipments: Shipment, Date, Destination, Mode, Units, Freight EGP, and a TOTAL line."),
          t("- Data/Word/Returns_Memo_Q3.docx: مذكرة الجودة، فيها جدول المرتجعات حسب اسم الموديل والشهر.", "- Data/Word/Returns_Memo_Q3.docx: the quality memo, with a table of returns by model name and month."),
          t("- Data/Word/Targets_Memo_Q3.docx: مذكرة المدير التجاري، فيها جدول المستهدف لكل قناة.", "- Data/Word/Targets_Memo_Q3.docx: the commercial director's memo, with a table of targets per channel.")],
        rules: [t("- القنوات أربعة: Cairo وAlexandria وDelta (محلي، Country = Egypt) وExport (البلد من الـ PDF).", "- There are four channels: Cairo, Alexandria and Delta (domestic, Country = Egypt) and Export (the country from the PDF)."), t("- إشعار الدائن (CN أو رقم بين قوسين) بيتخصم وما يتمسحش.", "- A credit note (CN, or a number in brackets) is deducted, never dropped."), t("- الربع = ١ يوليو لـ ٣٠ سبتمبر ٢٠٢٦. أي حاجة برّه الفترة تتساب وتتسجّل.", "- The quarter = 1 July to 30 September 2026. Anything outside it is left out and logged."), t("- كل قيمة بالجنيه. لو العنوان بيقول «بالألف»، اضرب في ١٬٠٠٠.", "- Every value is in EGP. If a header says “thousands”, multiply by 1,000.")],
        out: [t("- الخطوة ١ (الدرس ٣): Output/Q3_Commercial_DB.xlsx: شيت Fact (Month، Channel، Country، ModelCode، Measure، Value، Source، SourceFile)، وشيت Sources فيه لكل ملف عدد الصفوف والإجمالي المرجعي.", "- Step 1 (lesson 3): Output/Q3_Commercial_DB.xlsx: a Fact sheet (Month, Channel, Country, ModelCode, Measure, Value, Source, SourceFile) and a Sources sheet listing each file's rows and control total."),
          t("- الخطوة ٢ (الدرس ٤): Output/Q3_Commercial_Review.xlsx (جداول محورية وتقرير ورسوم) وOutput/Q3_Commercial_Review.pptx (٨ شرائح).", "- Step 2 (lesson 4): Output/Q3_Commercial_Review.xlsx (pivot tables, report, charts) and Output/Q3_Commercial_Review.pptx (8 slides).")],
        key: [t(`- صافي المبيعات: ${k(E.salesValue)} جنيه · ${n(E.salesQty)} جهاز`, `- Net sales: EGP ${k(E.salesValue)} · ${n(E.salesQty)} sets`),
          ...Object.keys(E.target).map((c) => t(`  ${c}: ${n(ch[c].q)} جهاز · ${k(ch[c].v)} جنيه · المستهدف ${k(E.target[c].v)} · التحقيق ${E.achievement[c]}٪`, `  ${c}: ${n(ch[c].q)} sets · EGP ${k(ch[c].v)} · target ${k(E.target[c].v)} · achievement ${E.achievement[c]}%`)),
          t(`- حسب الشهر (جنيه): يوليو ${k(E.months[7])} · أغسطس ${k(E.months[8])} · سبتمبر ${k(E.months[9])}`, `- By month (EGP): July ${k(E.months[7])} · August ${k(E.months[8])} · September ${k(E.months[9])}`),
          t(`- الشحنات: ${E.shipments} شحنة · ${n(E.shipUnits)} جهاز · نولون ${k(E.freight)} جنيه`, `- Shipments: ${E.shipments} · ${n(E.shipUnits)} sets · freight EGP ${k(E.freight)}`),
          t(`- النولون للجهاز: القاهرة ${E.freightPerUnit.Cairo} · الإسكندرية ${E.freightPerUnit.Alexandria} · الدلتا ${E.freightPerUnit.Delta} · التصدير ${E.freightPerUnit.Export} جنيه`, `- Freight per set: Cairo ${E.freightPerUnit.Cairo} · Alexandria ${E.freightPerUnit.Alexandria} · Delta ${E.freightPerUnit.Delta} · Export EGP ${E.freightPerUnit.Export}`),
          t(`- المرتجعات: ${n(E.returns)} جهاز · أعلى نسبة: ${E.topReturn.mc} ${E.topReturn.name} (${E.topReturn.rate}٪)`, `- Returns: ${n(E.returns)} sets · highest rate: ${E.topReturn.mc} ${E.topReturn.name} (${E.topReturn.rate}%)`),
          "", t("مبيعات التصدير حسب البلد (جنيه):", "Export sales by country (EGP):"), ...Object.entries(E.countries).sort((a, b) => b[1] - a[1]).map(([c, v]) => `  ${c}: ${k(v)}`),
          "", t("إجماليات الـ PDF المرجعية:", "The PDFs' control totals:"), ...E.pdfTotals.map((x) => t(`  ${ym(x.m)}: تصدير ${n(x.exportQty)} جهاز · ${x.shipments} شحنة · ${n(x.units)} جهاز اتشحن`, `  ${ym(x.m)}: export ${n(x.exportQty)} sets · ${x.shipments} shipments · ${n(x.units)} sets shipped`))],
        traps: [
          ["Sales_Cairo_Q3.xlsx", t(`فاتورة ${E.june.inv} بتاريخ ٣٠ يونيو`, `invoice ${E.june.inv} dated 30 June`), t("برّه الربع: تتساب وتتسجّل.", "Outside the quarter: left out and logged.")],
          ["Sales_Cairo_Q3.xlsx", t("إشعارين دائن (Type = CN) بكميات سالبة", "two credit notes (Type = CN) with negative quantities"), t("بيتخصموا من المبيعات، وما يتمسحوش.", "They are deducted from sales, never dropped.")],
          ["Sales_Alexandria_Q3.xlsx", t("الشهور أعمدة، وصف Total وعمودين Q3", "months as columns, a Total row and two Q3 columns"), t("تتفك لصفوف (unpivot)، والإجماليات تتساب.", "Unpivoted into rows; the totals are skipped.")],
          ["Sales_Delta_Q3.xlsx", t("الشيت التالت اسمه September مش Sep، وفي كل شيت صف Total", "the third sheet is named September, not Sep, and each sheet has a Total row"), t("الشهر من أول ٣ حروف في اسم الشيت، والإجمالي يتساب.", "The month comes from the sheet name's first 3 letters; the total is skipped.")],
          ["Export_Sales_2026-09.pdf", t("إشعار دائن مكتوب بين قوسين: (12)", "a credit note printed in brackets: (12)"), t("القوسين = سالب.", "Brackets = negative.")],
          [t("ملفات الـ PDF", "the PDFs"), t("الجدول بيكمّل في صفحة تانية والعناوين بتتكرر", "the table runs onto a second page with the headers repeated"), t("صف العناوين المكرر يتساب، وسطر TOTAL يتقارن بمجموع الصفوف.", "The repeated header is skipped, and the TOTAL line is compared with the sum of the rows.")],
          ["Returns_Memo_Q3.docx", t("الموديلات بالاسم مش بالكود، والأرقام مكتوبة كنص", "models by name, not code, and the numbers stored as text"), t("الكود من Masters بالاسم، والنص يتحوّل رقم، وعمود Q3 يتساب.", "The code comes from Masters by name, the text becomes a number, and the Q3 column is skipped.")],
          ["Targets_Memo_Q3.docx", t("المستهدف بالألف جنيه (EGP 000)", "targets in EGP thousands (EGP 000)"), t("× ١٬٠٠٠ قبل أي مقارنة.", "× 1,000 before any comparison.")],
        ],
      };
    }
    return {
      data: [t("- skills/safe-office-automation/SKILL.md: قواعد الأمان في أي أداة بتفتح ملفات أوفيس.", "- skills/safe-office-automation/SKILL.md: the safety rules for any tool that opens Office files."),
        t("- skills/production-dashboard/: المثال الأول كمهارة: SKILL.md وفولدر reference فيه دليل البيانات ومواصفة الداشبورد والمراجعات.", "- skills/production-dashboard/: example 1 as a skill: SKILL.md and a reference folder holding the data dictionary, the dashboard specification and the checks."),
        t("- skills/commercial-review-pack/: المثال التاني كمهارة: SKILL.md وفولدر reference فيه شكل كل مصدر وفخاخه وترتيب الشرايح.", "- skills/commercial-review-pack/: example 2 as a skill: SKILL.md and a reference folder holding each source's shape and traps, and the slide outline.")],
      rules: [t("- ملفات المهارة بالإنجليزي، زي ملفات المصنع، علشان أي نموذج وأي زميل يقراها بنفس الشكل.", "- The skill files are in English, like the factory's files, so any model and any colleague read them the same way."), t("- أول سطور SKILL.md (بين علامتين ---) فيها name وdescription: الوصف هو اللي بيخلّي Claude يعرف إمتى يستخدم المهارة لوحده.", "- SKILL.md's first lines (between two --- marks) hold name and description: the description is how Claude knows when to use the skill on its own.")],
      out: [t("- مكان المهارات في المشروع: ‎.claude\\skills\\<اسم المهارة>\\SKILL.md جوّه فولدر المشروع، أو ‎%USERPROFILE%\\.claude\\skills لكل مشاريعك على الجهاز.", "- Where the skills go: .claude\\skills\\<skill name>\\SKILL.md inside the project folder, or %USERPROFILE%\\.claude\\skills for all your projects on this machine."),
        t("- في تطبيق Claude: من إعدادات المهارات، ارفع فولدر المهارة مضغوط، فتشتغل في الويب وفي الجلسات اللي على السحابة.", "- In the Claude app: from the skills settings, upload the skill folder as a zip, and it works on the web and in cloud sessions.")],
      steps: [t("١. فك الملف، وانسخ فولدر skills بالتلات مهارات جوّه ‎.claude في فولدر المشروع (جنب فولدر Data بتاع المثالين).", "1. Unzip, and copy the skills folder with its three skills into .claude inside the project folder (next to the two examples' Data folders)."),
        t("٢. افتح Claude Code في الفولدر ده، واكتب ‎/skills: لازم تشوف التلاتة.", "2. Open Claude Code in that folder and type /skills: you should see all three."),
        t("٣. اكتب ‎/production-dashboard أو اطلب بالكلام: «حدّث داشبورد الإنتاج من ملفات الأسبوع الجديدة».", "3. Type /production-dashboard, or ask in words: “refresh the production dashboard from the new weekly files”."),
        t("٤. قارن النتيجة بمفتاح الإجابة بتاع المثال، وبعدين غيّر سطر واحد في المهارة وجرّب تاني.", "4. Compare the result with the example's answer key, then change one line in the skill and try again."),
        t("٥. اكتب مهارتك الأولى لشغلك إنت، بنفس الشكل: Prompt.txt فيه الطلب.", "5. Write your first skill for your own work, in the same shape: Prompt.txt holds the request.")],
      key: [t(`- ${E.skills.length} مهارات · ${E.files} ملف`, `- ${E.skills.length} skills · ${E.files} files`), ...E.skills.map((s) => "  " + s)],
      traps: [],
    };
  }
  function readme(p, lang) {
    const t = T(lang), g = guide(p, lang), rule = "=".repeat(40), files = p.prompts.map((id, i) => `Prompt_${i + 1}.txt`);
    const steps = g.steps || [
      t(`١. فك الملف في فولدر لوحده، مثلًا C:\\Automation\\${p.folder}، وخلّي فولدر Data زي ما هو.`, `1. Unzip into a folder of its own, for example C:\\Automation\\${p.folder}, and leave the Data folder as it is.`),
      t("٢. افتح Prompt_1.txt، وحط مسار الفولدر بتاعك مكان [مسار الفولدر]، والصقه كله في ChatGPT أو Gemini Enterprise أو Claude.", "2. Open Prompt_1.txt, put your folder's path in place of [folder path], and paste all of it into ChatGPT, Gemini Enterprise or Claude."),
      t("٣. جاوب أسئلة النموذج من «قواعد الشغل» فوق. ما تقولوش المشاكل المتعمّدة: الأداة الكويسة هي اللي تكتشفها.", "3. Answer the model's questions from the “Business rules” above. Don't tell it the planted problems: a good tool is one that finds them."),
      t("٤. احفظ الأداة جنب فولدر Data (نفس طريقة الوحدة التانية)، وشغّلها، واقرا Run_Log.txt.", "4. Save the tool next to the Data folder (the same way as in unit 2), run it and read Run_Log.txt."),
      t("٥. قارن بـ Answer_Key.txt، وبعدين كمّل بـ Prompt_2.txt في نفس المحادثة.", "5. Compare with Answer_Key.txt, then go on with Prompt_2.txt in the same chat."),
    ];
    return crlf([
      t(`الوحدة ٣ — ${p.title.ar}`, `Unit 3 — ${p.title.en}`),
      t("كل ملفات البيانات بالإنجليزي · كل الأرقام توضيحية", "Every data file is in English · every figure is illustrative"), rule, "",
      t("الموقف", "The situation"), p.about[lang], "",
      t("في الفولدر", "In this folder"),
      p.n === 3 ? t("- skills/: التلات مهارات.", "- skills/: the three skills.") : t("- Data/: الملفات اللي هتشتغل عليها (ما تعدّلش فيها).", "- Data/: the files you work on (don't edit them)."),
      t(`- ${files.join("، ")}: الـ Prompt جاهز تنسخه${files.length > 1 ? "، واحد لكل خطوة" : ""}.`, `- ${files.join(", ")}: the Prompt${files.length > 1 ? "s, one per step," : ""} ready to copy.`),
      t("- Answer_Key.txt: النتيجة الصح. افتحه بعد التشغيل، مش قبله.", "- Answer_Key.txt: the right result. Open it after the run, not before."), "",
      t("البيانات (الجزء ده بيروح للنموذج)", "The data (this part goes to the model)"), ...g.data, "",
      t("قواعد الشغل (قولها لما النموذج يسأل)", "Business rules (give them when the model asks)"), ...g.rules, "",
      t("المطلوب", "What to produce"), ...g.out, "",
      t("الخطوات", "Steps"), ...steps, "",
    ].join("\n"));
  }
  function answerKey(p, lang) {
    const t = T(lang), g = guide(p, lang), lines = [...g.key];
    if (g.traps.length) { lines.push("", t("المشاكل المتعمّدة، وإزاي الأداة الصح تتعامل معاها", "The planted problems, and how a correct tool handles them")); for (const [f, what, how] of g.traps) lines.push(`- ${f}: ${what} — ${how}`); }
    return crlf([t(`مفتاح الإجابة — ${p.title.ar}`, `Answer key — ${p.title.en}`), t("راجعه بعد التشغيل، مش قبله.", "Check it after the run, not before."), "", ...lines].join("\n")) + "\r\n";
  }
  for (const p of P) {
    p.folder = `Unit3_${p.n === 3 ? "" : "Example_" + p.n + "_"}${p.slug}`; p.zip = p.folder + ".zip";
    p.guides = (lang) => [{ path: "README.txt", text: bom + readme(p, lang) }, ...p.prompts.map((id, i) => ({ path: `Prompt_${i + 1}.txt`, text: bom + prompt(id, lang) })), { path: "Answer_Key.txt", text: bom + answerKey(p, lang) }];
    p.bundle = (lang) => [...p.guides(lang), ...p.files()];
  }
  A.officeProjects = {
    list: P, byLesson: Object.fromEntries(P.flatMap((p) => p.lessons.map((l) => [l, p]))), guide, readme, answerKey,
    production, commercial, markets: MK, newModel: NEWM[0], newMarket: NEWMK, price: PRICE, skills: SK,
  };
})(window.ACADEMY = window.ACADEMY || {});
