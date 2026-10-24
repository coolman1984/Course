/* The unit-2 projects: one downloadable project per lesson, climbing in difficulty, all in one television factory (no
   factory or company is named). Every Excel file is in English, the way the factory's own files are; the guide files
   (README, Prompt, answer key) follow the reader's language.
   A seeded generator builds the same rows every time, so the figures quoted in the lessons and the answer keys never
   drift: data.test.mjs recomputes every `expected` figure from the files, the way a correct tool would. Projects 3, 4
   and 5 share one true quarter of production (Q1 2026), so their totals agree; each still downloads and works on its
   own. Problems planted on purpose («الفخاخ») are listed per project. Everything is illustrative. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  const LN = [   // code, name, hall, batches a day at most
    ["L01", "Assembly Line 1", "Hall A", 6], ["L02", "Assembly Line 2", "Hall A", 5], ["L03", "Assembly Line 3", "Hall B", 5],
    ["L04", "Assembly Line 4", "Hall B", 4], ["L05", "Assembly Line 5", "Hall C", 4], ["L06", "Assembly Line 6", "Hall C", 3],
  ];
  const MD = [   // code, name, category, standard cost per unit (EGP), most units in one batch, panel size
    ["M101", "24-inch HD TV", "Small", 2900, 60, 24], ["M102", "32-inch HD TV", "Small", 3900, 60, 32], ["M103", "32-inch Smart TV", "Small", 4600, 60, 32],
    ["M104", "40-inch Full HD TV", "Medium", 6200, 45, 40], ["M105", "43-inch Full HD TV", "Medium", 6900, 45, 43], ["M106", "43-inch Smart TV", "Medium", 7800, 45, 43],
    ["M107", "50-inch 4K TV", "Large", 10400, 30, 50], ["M108", "55-inch 4K TV", "Large", 12300, 30, 55], ["M109", "55-inch QLED TV", "Large", 15600, 30, 55],
    ["M110", "65-inch 4K TV", "Extra Large", 19800, 18, 65], ["M111", "65-inch QLED TV", "Extra Large", 24500, 18, 65], ["M112", "75-inch 4K TV", "Extra Large", 31200, 12, 75],
  ];
  const NEW = ["M113", "58-inch 4K TV", 13800, 30];   // built from mid-March, not yet in the models sheet or the bill of materials
  const PROD = ["Date", "WorkOrder", "LineCode", "ModelCode", "Qty", "Value"];

  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const DAY0 = Date.UTC(2026, 0, 1), SERIAL0 = Math.round((DAY0 - Date.UTC(1899, 11, 30)) / 864e5);   // Excel's day number for 1 Jan 2026
  const date = (day) => ({ d: SERIAL0 + day });                                                    // a real Excel date
  const dmy = (day) => { const t = new Date(DAY0 + day * 864e5), p = (n) => String(n).padStart(2, "0"); return p(t.getUTCDate()) + "/" + p(t.getUTCMonth() + 1) + "/2026"; };
  const monthOf = (day) => new Date(DAY0 + day * 864e5).getUTCMonth() + 1;
  const pad = (n) => String(n).padStart(2, "0");
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);

  /* true production: one row per batch, in date order. Q1 is days 0–89; weeks 14–17 (lesson 8) are days 91–118, 2–29 April */
  function batches(from, to, seed, woFrom) {
    const r = rng(seed), rows = [];
    let wo = woFrom;
    for (let d = from; d < to; d++) {
      if (new Date(DAY0 + d * 864e5).getUTCDay() === 5) continue;   // Friday: the factory is closed
      for (const [code, , , size] of LN) {
        const n = 1 + Math.floor(r() * size);
        for (let k = 0; k < n; k++) {
          let m = MD[Math.floor(r() * MD.length)], mc = m[0], cost = m[3], most = m[4];
          if (d >= 70 && r() < 0.06) { mc = NEW[0]; cost = NEW[2]; most = NEW[3]; }
          let q = 5 + Math.floor(r() * most);
          if (r() < 0.012) q = -(2 + Math.floor(r() * 5));   // units sent back by quality: a real correction that reduces net output
          rows.push({ day: d, week: Math.floor(d / 7) + 1, wo: "WO-" + String(++wo).padStart(5, "0"), ln: code, mc, q, v: q * cost });
        }
      }
    }
    return rows;
  }
  let Q1 = null, APR = null;
  const q1 = () => (Q1 = Q1 || batches(0, 90, 20260101, 0));
  const apr = () => (APR = APR || batches(91, 119, 20260401, q1().length));
  const prodRow = (x) => [date(x.day), x.wo, x.ln, x.mc, x.q, x.v];
  const sheet = (name, head, rows) => ({ name, rows: [head, ...rows] });
  const PLAN_F = [1.08, 0.94, 1.02, 1.12, 0.97, 1.05];
  function planRows() {   // each line's monthly plan, rounded to hundreds; line 6 has none for March, and a new line 7 has one
    const pl = [];
    for (const [code] of LN) for (let m = 1; m <= 3; m++) {
      if (code === "L06" && m === 3) continue;
      const actual = sum(q1().filter((x) => x.ln === code && monthOf(x.day) === m), (x) => x.q), f = PLAN_F[Number(code.slice(1)) - 1] + (m - 2) * 0.03;
      pl.push([code, "2026-" + pad(m), Math.round((actual * f) / 100) * 100]);
    }
    pl.push(["L07", "2026-03", 1500]);
    return pl;
  }

  /* ---------- purchasing and materials (lessons 6 and 7) ---------- */
  const SUP = { PNL: "Panels Supplier", MB: "Boards Supplier", PSU: "Boards Supplier", LED: "Backlight Supplier", RC: "Remotes Supplier", CTN: "Packaging Supplier", STD: "Plastics Supplier", SCR: "Hardware Supplier", CBL: "Cables Supplier", MAN: "Printing Supplier" };
  const MAT = [   // code, name, unit price (EGP), order multiple (pack), lead time in days
    ["PNL-24", "LCD panel 24-inch", 950, 20, 30], ["PNL-32", "LCD panel 32-inch", 1350, 20, 30], ["PNL-40", "LCD panel 40-inch", 2100, 10, 30], ["PNL-43", "LCD panel 43-inch", 2350, 10, 30],
    ["PNL-50", "LCD panel 50-inch", 3600, 10, 35], ["PNL-55", "LCD panel 55-inch", 4300, 10, 35], ["PNL-55Q", "QLED panel 55-inch", 6200, 10, 35], ["PNL-65", "LCD panel 65-inch", 7400, 5, 40],
    ["PNL-65Q", "QLED panel 65-inch", 9800, 5, 40], ["PNL-75", "LCD panel 75-inch", 12500, 5, 45],
    ["MB-HD", "Main board HD", 520, 50, 21], ["MB-SM", "Main board Smart", 780, 50, 21], ["MB-4K", "Main board 4K", 1150, 50, 21],
    ["PSU-S", "Power board up to 43-inch", 260, 50, 14], ["PSU-L", "Power board 50-inch and above", 410, 50, 14],
    ["LED-24", "Backlight set 24-inch", 140, 50, 21], ["LED-32", "Backlight set 32-inch", 180, 50, 21], ["LED-43", "Backlight set 40/43-inch", 240, 50, 21],
    ["LED-55", "Backlight set 50/55-inch", 330, 50, 21], ["LED-65", "Backlight set 65/75-inch", 460, 25, 21],
    ["RC-01", "Remote control basic", 45, 100, 14], ["RC-02", "Remote control smart", 85, 100, 14],
    ["CTN-S", "Carton up to 32-inch", 38, 100, 7], ["CTN-M", "Carton 40/43-inch", 55, 100, 7], ["CTN-L", "Carton 50/55-inch", 78, 50, 7], ["CTN-X", "Carton 65/75-inch", 115, 50, 7],
    ["STD-S", "Stand set small", 60, 100, 14], ["STD-L", "Stand set large", 120, 50, 14],
    ["SCR-M3", "Screw M3", 0.2, 1000, 7], ["SCR-M4", "Screw M4", 0.3, 1000, 7], ["CBL-PWR", "Power cable", 18, 200, 10], ["MAN-01", "User manual", 6, 500, 7],
  ];
  const matBy = Object.fromEntries(MAT.map((m) => [m[0], m]));
  const supOf = (code) => SUP[code.split("-")[0]];
  function bom(m) {   // bill of materials of one model: [material, qty per TV]
    const [mc, , cat, , , size] = m, q = mc === "M109" || mc === "M111";
    const panel = "PNL-" + size + (q ? "Q" : ""), smart = /Smart|QLED/.test(m[1]) || size >= 50;
    const led = size <= 24 ? "LED-24" : size <= 32 ? "LED-32" : size <= 43 ? "LED-43" : size <= 55 ? "LED-55" : "LED-65";
    const ctn = size <= 32 ? "CTN-S" : size <= 43 ? "CTN-M" : size <= 55 ? "CTN-L" : "CTN-X";
    return [[panel, 1], [size >= 50 ? "MB-4K" : smart ? "MB-SM" : "MB-HD", 1], [size >= 50 ? "PSU-L" : "PSU-S", 1], [led, 1], [smart ? "RC-02" : "RC-01", 1],
      [ctn, 1], [cat === "Small" || cat === "Medium" ? "STD-S" : "STD-L", 1], ["SCR-M3", size <= 43 ? 14 : 18], ["SCR-M4", size <= 43 ? 4 : size <= 55 ? 8 : 12], ["CBL-PWR", 1], ["MAN-01", 1]];
  }

  /* ---------- the eight projects ---------- */
  const P = [];

  /* 1 · describe the data before any tool (no code) */
  P.push({
    n: 1, lesson: "x1", slug: "Describe_The_Data", level: 0, short: u("وصف البيانات", "Describe the data"),
    title: u("صِف الملف قبل ما تطلب أي أداة", "Describe the file before you ask for any tool"),
    files() {
      const w3 = q1().filter((x) => x.week === 3);
      return [{ path: "Data/Production_Week_03.xlsx", sheets: [sheet("Production", PROD, w3.map(prodRow))] }];
    },
    expected() {
      const w3 = q1().filter((x) => x.week === 3), neg = w3.filter((x) => x.q < 0);
      return { rows: w3.length, days: new Set(w3.map((x) => x.day)).size, lines: new Set(w3.map((x) => x.ln)).size, models: new Set(w3.map((x) => x.mc)).size,
        returns: neg.length, returnUnits: -sum(neg, (x) => x.q), units: sum(w3, (x) => x.q), value: sum(w3, (x) => x.v), first: "2026-01-15", last: "2026-01-21", firstWO: w3[0].wo, lastWO: w3.at(-1).wo };
    },
  });

  /* 2 · a first small tool: list what is in a folder (read only) */
  P.push({
    n: 2, lesson: "x2", slug: "First_Tool_File_List", level: 0, short: u("قايمة الملفات", "File list"),
    title: u("أول أداة: قايمة بكل ملف في الفولدر", "A first tool: a list of every file in the folder"),
    files() {
      const w2 = q1().filter((x) => x.week === 2), out = [];
      for (const [code] of LN) {
        const sh = [sheet("Production", PROD, w2.filter((x) => x.ln === code).map(prodRow))];
        if (code === "L04") sh.push(sheet("Old_Draft", PROD, w2.filter((x) => x.ln === code).slice(0, 5).map(prodRow)));   // trap: a second sheet
        out.push({ path: `Data/Line_${code}_Week_02.xlsx`, sheets: sh });
      }
      out.splice(3, 0, { path: "Data/~$Line_L03_Week_02.xlsx", lock: true });   // trap: Excel's lock file, left by a colleague who has the file open
      return out;
    },
    expected() {
      const w2 = q1().filter((x) => x.week === 2);
      return { files: 6, sheets: 7, skipped: 1, rows: w2.length, units: sum(w2, (x) => x.q), perLine: LN.map(([c]) => w2.filter((x) => x.ln === c).length) };
    },
  });

  /* 3 · tool one: stack 13 weekly reports */
  P.push({
    n: 3, lesson: "x3", slug: "Stack_Weekly_Reports", level: 1, short: u("تحت بعض", "Stack"),
    title: u("الأداة الأولى: ١٣ تقرير أسبوعي في جدول واحد", "Tool one: 13 weekly reports into one table"),
    files() {
      const out = [];
      for (let w = 1; w <= 13; w++) {
        let head = PROD.slice(), body = q1().filter((x) => x.week === w).map(prodRow);
        if (w === 7) { head = ["Date", "WorkOrder", "LineCode", "Qty", "Notes", "ModelCode", "Value"]; body = q1().filter((x) => x.week === w).map((x) => [date(x.day), x.wo, x.ln, x.q, x.q < 0 ? "returned by quality" : "", x.mc, x.v]); }   // trap: another column order, and a Notes column
        if (w === 11) head[4] = "Quantity";                                                                                     // trap: a renamed column
        if (w === 4) { body.splice(10, 0, body[9].slice()); body.splice(31, 0, body[30].slice()); }                             // trap: two batches entered twice
        if (w === 2) body.push([null, null, "Total", null, sum(body, (r) => r[4]), sum(body, (r) => r[5])]);                   // trap: a totals row at the bottom
        out.push({ path: `Data/Week_${pad(w)}.xlsx`, sheets: [{ name: "Production", rows: [head, ...body] }] });
      }
      return out;
    },
    expected() {
      const all = q1();
      return { files: 13, rowsRead: all.length + 2, totalsRow: 1, duplicates: 2, rows: all.length, units: sum(all, (x) => x.q), value: sum(all, (x) => x.v), week11: all.filter((x) => x.week === 11).length, week7: all.filter((x) => x.week === 7).length };
    },
  });

  /* 4 · tool two: every code finds its name (and its cost) */
  P.push({
    n: 4, lesson: "x4", slug: "Lookup_Names_And_Costs", level: 2, short: u("بحث وربط", "Lookup"),
    title: u("الأداة التانية: كل كود يلاقي اسمه وتكلفته", "Tool two: every code finds its name and cost"),
    files() {
      const rows = q1().map((x) => {
        let ln = x.ln;
        if (x.week === 5 && ln === "L04") ln = "L04 ";   // trap: a stray space
        if (x.week === 6 && ln === "L03") ln = "l03";    // trap: lower case
        return [date(x.day), x.wo, ln, x.mc, x.q];
      });
      const models = MD.map((m) => [m[0], m[1], m[2], m[3]]);
      models.splice(8, 0, ["M108", "55-inch 4K TV", "Large", 12900]);   // trap: one model listed twice, with two costs
      return [
        { path: "Data/Production_Q1.xlsx", sheets: [sheet("Data", ["Date", "WorkOrder", "LineCode", "ModelCode", "Qty"], rows)] },
        { path: "Data/Masters.xlsx", sheets: [sheet("Lines", ["LineCode", "LineName", "Hall"], LN.map((l) => [l[0], l[1], l[2]])), sheet("Models", ["ModelCode", "ModelName", "Category", "StdCost"], models)] },
      ];
    },
    expected() {
      const all = q1(), un = all.filter((x) => x.mc === NEW[0]), ok = all.filter((x) => x.mc !== NEW[0]);
      const cat = (c) => sum(ok.filter((x) => MD.find((m) => m[0] === x.mc)[2] === c), (x) => x.q);
      return { rows: all.length, spaced: all.filter((x) => x.week === 5 && x.ln === "L04").length, lower: all.filter((x) => x.week === 6 && x.ln === "L03").length,
        unmatched: { code: NEW[0], rows: un.length, units: sum(un, (x) => x.q) }, units: sum(all, (x) => x.q), value: sum(ok, (x) => x.v),
        cats: { Small: cat("Small"), Medium: cat("Medium"), Large: cat("Large"), "Extra Large": cat("Extra Large") } };
    },
  });

  /* 5 · tool three: output against plan */
  P.push({
    n: 5, lesson: "x5", slug: "Output_vs_Plan_Report", level: 3, short: u("قصاد الخطة", "Against plan"),
    title: u("الأداة التالتة: تقرير الإنتاج قصاد الخطة", "Tool three: the output-against-plan report"),
    files() {
      const name = Object.fromEntries(LN.map((l) => [l[0], l[1]]));
      return [
        { path: "Data/Production_Q1.xlsx", sheets: [sheet("Data", ["Date", "WorkOrder", "LineCode", "LineName", "ModelCode", "Qty"], q1().map((x) => [date(x.day), x.wo, x.ln, name[x.ln], x.mc, x.q]))] },
        { path: "Data/Plan_Q1.xlsx", sheets: [sheet("Plan", ["LineCode", "Month", "PlanQty"], planRows())] },
      ];
    },
    expected() {
      const all = q1(), pl = planRows(), out = (c, m) => sum(all.filter((x) => x.ln === c && "2026-" + pad(monthOf(x.day)) === m), (x) => x.q);
      const rates = pl.filter((p) => p[0] !== "L07").map(([c, m, g]) => ({ line: c, month: m, pct: Math.round((out(c, m) / g) * 1000) / 10 }));
      const best = rates.reduce((a, x) => (x.pct > a.pct ? x : a)), worst = rates.reduce((a, x) => (x.pct < a.pct ? x : a));
      const per = {};
      for (const [c] of LN) per[c] = [1, 2, 3].map((m) => out(c, "2026-0" + m));
      return { plans: pl.length, reportRows: 19, rated: rates.length, units: sum(all, (x) => x.q), returns: all.filter((x) => x.q < 0).length, returnUnits: -sum(all.filter((x) => x.q < 0), (x) => x.q),
        noPlan: { line: "L06", month: "2026-03", units: out("L06", "2026-03") }, noOutput: { line: "L07", month: "2026-03", plan: 1500 }, best, worst, per };
    },
  });

  /* 6 · tool four: match purchase orders and goods receipts (February) */
  function purchasing() {
    const r = rng(20260201), lines = [], recs = [];
    let po = 200, grn = 0;
    const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };   // Fisher–Yates: the same order in every browser
    const groups = Object.keys(SUP).reduce((g, k) => { const s = SUP[k]; (g[s] = g[s] || []).push(...MAT.filter((m) => m[0].startsWith(k + "-")).map((m) => m[0])); return g; }, {});
    const sups = Object.keys(groups);
    for (let i = 0; i < 14; i++) {
      const s = sups[i % sups.length], pn = "PO-26-" + String(++po).padStart(4, "0"), mats = shuffle(groups[s].slice()).slice(0, Math.min(groups[s].length, 2 + Math.floor(r() * 3)));
      const due = 3 + Math.floor(r() * 20);
      for (const mc of mats) {
        const m = matBy[mc], qty = m[3] * (2 + Math.floor(r() * 8));
        lines.push({ po: pn, sup: s, mc, qty, price: m[2], due: 31 + due });
      }
    }
    // receipts: most lines arrive in one or more deliveries; some are short, some over, a few not yet
    lines.forEach((l, i) => {
      const kind = i % 9 === 4 ? "none" : i % 7 === 3 ? "partial" : i % 11 === 6 ? "over" : i % 5 === 2 ? "near" : "full";
      if (kind === "none") return;
      let total = kind === "partial" ? Math.round(l.qty * (0.4 + r() * 0.4)) : kind === "over" ? Math.round(l.qty * 1.1) : kind === "near" ? l.qty - Math.max(1, Math.floor(l.qty * 0.01)) : l.qty;
      const parts = total > 60 && r() < 0.6 ? 2 + Math.floor(r() * 2) : 1;
      let left = total;
      for (let k = 0; k < parts; k++) {
        const q = k === parts - 1 ? left : Math.round(total / parts);
        left -= q;
        recs.push({ grn: "GRN-26-" + String(++grn).padStart(4, "0"), day: Math.max(31, Math.min(58, l.due - 6 + k * 4 + Math.floor(r() * 3))), po: l.po, mc: l.mc, q });
      }
    });
    recs.sort((a, b) => a.day - b.day || a.grn.localeCompare(b.grn));
    recs.forEach((x, i) => (x.grn = "GRN-26-" + String(i + 1).padStart(4, "0")));
    return { lines, recs };
  }
  P.push({
    n: 6, lesson: "x7", slug: "Match_Orders_And_Receipts", level: 4, short: u("مطابقة الاستلام", "Match receipts"),
    title: u("الأداة الرابعة: أوامر الشراء قصاد الاستلام", "Tool four: purchase orders against goods received"),
    files() {
      const { lines, recs } = purchasing();
      const rows = recs.map((x) => [date(x.day), x.grn, x.po, x.mc, x.q]);
      rows.forEach((row, i) => { if (i % 13 === 5) row[2] = row[2].toLowerCase() + " "; });                              // trap: PO numbers typed in lower case with a space
      rows.splice(17, 0, [date(40), "GRN-26-9001", "PO-26-0299", "CBL-PWR", 400]);                                          // trap: an order number that doesn't exist
      rows.splice(29, 0, [date(47), "GRN-26-9002", lines[0].po, "RC-02", 300]);                                             // trap: a material that isn't on that order
      return [
        { path: "Data/Purchase_Orders_Feb.xlsx", sheets: [sheet("PO_Lines", ["PONumber", "Supplier", "MaterialCode", "OrderedQty", "UnitPrice", "DueDate"], lines.map((l) => [l.po, l.sup, l.mc, l.qty, l.price, date(l.due)]))] },
        { path: "Data/Goods_Receipts_Feb.xlsx", sheets: [sheet("Receipts", ["Date", "ReceiptNo", "PONumber", "MaterialCode", "ReceivedQty"], rows)] },
      ];
    },
    expected() {
      const { lines, recs } = purchasing(), st = { Complete: 0, Partial: 0, Over: 0, "Not received": 0 };
      let open = 0;
      for (const l of lines) {
        const got = sum(recs.filter((x) => x.po === l.po && x.mc === l.mc), (x) => x.q), s = got === 0 ? "Not received" : got < l.qty * 0.98 ? "Partial" : got > l.qty * 1.02 ? "Over" : "Complete";
        st[s]++; if (s === "Partial" || s === "Not received") open += (l.qty - got) * l.price;
      }
      return { orders: new Set(lines.map((l) => l.po)).size, lines: lines.length, receipts: recs.length + 2, fixedCase: recs.filter((_, i) => i % 13 === 5).length, unmatched: 2, status: st, openValue: Math.round(open) };
    },
  });

  /* 7 · tool five: from the production plan to the materials to order (April) */
  const APR_PLAN = { M101: 900, M102: 1400, M103: 1600, M104: 700, M105: 1200, M106: 1500, M107: 800, M108: 1100, M109: 500, M110: 450, M111: 250, M112: 150, M113: 600 };
  function needs() {
    const gross = {};
    for (const m of MD) for (const [mc, q] of bom(m)) gross[mc] = (gross[mc] || 0) + APR_PLAN[m[0]] * q;
    const r = rng(20260415), stock = {};
    for (const [mc] of MAT) { const g = gross[mc] || 0, k = mc.startsWith("SCR") ? 1000 : 10; stock[mc] = { on: Math.round((g * (0.15 + r() * 0.6)) / k) * k, ord: r() < 0.4 ? Math.round((g * r() * 0.4) / k) * k : 0 }; }
    stock["PNL-24"].on = Math.round(gross["PNL-24"] * 1.3); stock["PNL-24"].ord = 0;   // more than enough: nothing to order
    const out = MAT.filter(([mc]) => gross[mc]).map(([mc, name, price, pack, lead]) => {
      const g = gross[mc], s = stock[mc], net = Math.max(0, g - s.on - s.ord), order = Math.ceil(net / pack) * pack;
      return { mc, name, sup: supOf(mc), g, on: s.on, ord: s.ord, net, pack, order, value: Math.round(order * price * 100) / 100, lead };
    });
    return { gross, stock, out };
  }
  P.push({
    n: 7, lesson: "x8", slug: "Material_Needs_From_Plan", level: 5, short: u("طلب الخامات", "Materials order"),
    title: u("الأداة الخامسة: من خطة الإنتاج لطلب الخامات", "Tool five: from the production plan to the materials order"),
    files() {
      const { stock } = needs(), bomRows = [];
      for (const m of MD) for (const [mc, q] of bom(m)) bomRows.push([m[0], mc, q]);
      const st = MAT.map(([mc]) => [mc, mc.startsWith("SCR") ? "box of 1000" : "pcs", mc.startsWith("SCR") ? stock[mc].on / 1000 : stock[mc].on, mc.startsWith("SCR") ? stock[mc].ord / 1000 : stock[mc].ord]);   // trap: screws counted in boxes
      return [
        { path: "Data/Production_Plan_Apr.xlsx", sheets: [sheet("Plan", ["ModelCode", "PlannedQty"], Object.entries(APR_PLAN))] },   // trap: M113 has no bill of materials yet
        { path: "Data/BOM.xlsx", sheets: [sheet("BOM", ["ModelCode", "MaterialCode", "QtyPerUnit"], bomRows)] },
        { path: "Data/Materials.xlsx", sheets: [sheet("Materials", ["MaterialCode", "MaterialName", "Unit", "Supplier", "PackSize", "UnitPrice", "LeadTimeDays"], MAT.map(([mc, name, price, pack, lead]) => [mc, name, "pcs", supOf(mc), pack, price, lead]))] },
        { path: "Data/Stock.xlsx", sheets: [sheet("Stock", ["MaterialCode", "Unit", "OnHand", "OnOrder"], st)] },
      ];
    },
    expected() {
      const { out, gross } = needs(), toOrder = out.filter((x) => x.order > 0);
      const pick = (mc) => { const x = out.find((y) => y.mc === mc); return { gross: x.g, onHand: x.on, onOrder: x.ord, net: x.net, order: x.order }; };
      return { planned: Object.values(APR_PLAN).reduce((a, b) => a + b, 0), notPlanned: { code: NEW[0], units: APR_PLAN.M113 }, bomRows: MD.length * 11, materials: out.length,
        toOrder: toOrder.length, nothing: out.length - toOrder.length, value: Math.round(sum(toOrder, (x) => x.value)), panel55: pick("PNL-55"), screwM3: pick("SCR-M3"), gross55: gross["PNL-55"] };
    },
  });

  /* 8 · when a tool stops: next month's files bring changes (April, for the tool from lesson 3) */
  P.push({
    n: 8, lesson: "x6", slug: "Next_Month_Changes", level: 3, short: u("لما توقف", "When it stops"),
    title: u("لما الأداة توقف: ملفات الشهر الجديد", "When the tool stops: next month's files"),
    files() {
      const out = [];
      for (let w = 14; w <= 17; w++) {
        const rows = apr().filter((x) => x.week === w);
        let head = PROD.slice(), body = rows.map(prodRow), name = "Production";
        if (w === 14) { head = [...PROD, "Shift"]; body = rows.map((x, i) => [...prodRow(x), i % 2 ? "B" : "A"]); }   // change: a new column at the end
        if (w === 15) body = rows.map((x) => [dmy(x.day), x.wo, x.ln, x.mc, x.q, x.v]);                                // change: dates typed as text
        if (w === 16) name = "Sheet1";                                                                                // change: the sheet was renamed
        if (w === 17) body = [];                                                                                      // change: a maintenance week, headers only
        out.push({ path: `Data/Week_${w}.xlsx`, sheets: [{ name, rows: [head, ...body] }] });
      }
      return out;
    },
    expected() {
      const a = apr().filter((x) => x.week >= 14 && x.week <= 16);
      return { files: 4, rows: a.length, units: sum(a, (x) => x.q), value: sum(a, (x) => x.v), perWeek: [14, 15, 16, 17].map((w) => (w === 17 ? 0 : apr().filter((x) => x.week === w).length)), textDates: apr().filter((x) => x.week === 15).length };
    },
  });

  /* ---------- the guide files: README.txt (the task and the data dictionary) and Answer_Key.txt ---------- */
  const n = (x) => Number(x).toLocaleString("en-US");
  const ad = (x) => String(x).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  const PROMPT = { 1: "x1a", 2: "x2c", 3: "x3a", 4: "x4a", 5: "x5a", 6: "x7a", 7: "x8a", 8: "x6a" };
  const TOOL = { 2: "file_list", 3: "stack_tool", 4: "lookup_tool", 5: "report_tool", 6: "match_tool", 7: "needs_tool", 8: "stack_tool" };
  const G = {
    1: (T, E) => ({
      about: T("قبل أي أداة، النموذج لازم يعرف الملف زي ما إنت عارفه. المشروع ده من غير كود: هتكتب «دليل بيانات» لتقرير إنتاج أسبوعي واحد، وتختبره مع النموذج.", "Before any tool, the model must know the file as well as you do. This project has no code: you write a “data dictionary” for one weekly production report, and test it with the model."),
      data: [T("- Data/Production_Week_03.xlsx: شيت واحد اسمه Production، صف عناوين واحد، صف لكل دفعة إنتاج.", "- Data/Production_Week_03.xlsx: one sheet named Production, one header row, one row per production batch."), "  " + PROD.join(" | ")],
      rules: [T("- الدفعة = أمر تشغيل واحد على خط واحد لموديل واحد.", "- A batch = one work order on one line for one model."), T("- الكمية السالبة = وحدات رجعت من الجودة، وبتتخصم من الصافي.", "- A negative quantity = units sent back by quality; it reduces net output."), T("- المصنع قافل يوم الجمعة.", "- The factory is closed on Fridays.")],
      out: [T("- ملف نصّي Data_Dictionary.txt جنب فولدر Data، فيه لكل عمود: الاسم بالحرف، والنوع، والشكل، ومثال، والقيم المسموحة، ومعنى أي قيمة غريبة.", "- A text file Data_Dictionary.txt next to the Data folder holding, for each column: the name letter for letter, the type, the shape, an example, the allowed values and the meaning of any odd value.")],
      steps: [T("١. افتح الملف واقرا العناوين والصفوف بنفسك. ما تعدّلش فيه حاجة.", "1. Open the file and read the headers and rows yourself. Change nothing in it."), T("٢. انسخ Prompt.txt في ChatGPT أو Gemini Enterprise، واملأ الأقواس من الملف: اسم الملف والشيت، والعناوين بالحرف، وخمس صفوف من حالات مختلفة (منهم صف كميته سالبة).", "2. Copy Prompt.txt into ChatGPT or Gemini Enterprise and fill the brackets from the file: the file and sheet name, the headers letter for letter, and five rows from different cases (one with a negative quantity)."), T("٣. جاوب أسئلة النموذج من «قواعد الشغل» فوق، وخلّيه يكتب الدليل. احفظه في Data_Dictionary.txt.", "3. Answer the model's questions from the “Business rules” above and let it write the dictionary. Save it as Data_Dictionary.txt."), T("٤. اختبار الدليل: افتح محادثة جديدة، والصق الدليل بس، واسأل: «كم عمود؟ الكمية السالبة معناها إيه؟ التاريخ نوعه إيه؟». لو جاوب صح من الدليل لوحده، الدليل جاهز.", "4. Test the dictionary: open a new chat, paste only the dictionary and ask: “How many columns? What does a negative quantity mean? What type is the date?” If it answers correctly from the dictionary alone, it's ready."), T("٥. قارن دليلك بـ Answer_Key.txt.", "5. Compare your dictionary with Answer_Key.txt.")],
      key: [T(`- صفوف البيانات: ${E.rows} دفعة · الأيام: ${E.days} (من ${E.first} لـ ${E.last}، من غير الجمعة) · الخطوط: ${E.lines} · الموديلات: ${E.models}`, `- Data rows: ${E.rows} batches · days: ${E.days} (${E.first} to ${E.last}, Friday excluded) · lines: ${E.lines} · models: ${E.models}`),
        T(`- صافي الكمية: ${n(E.units)} جهاز · القيمة: ${n(E.value)} جنيه · صفوف كميتها سالبة: ${E.returns} (${E.returnUnits} وحدات رجعت من الجودة)`, `- Net quantity: ${n(E.units)} units · value: EGP ${n(E.value)} · rows with a negative quantity: ${E.returns} (${E.returnUnits} units sent back by quality)`),
        "", T("دليل البيانات المتوقع:", "The expected dictionary:"),
        T("  Date: تاريخ حقيقي (مش نص)، يوم واحد في الصف", "  Date: a real date (not text), one day per row"),
        T(`  WorkOrder: نص بالشكل WO-00000، فريد لكل دفعة (من ${E.firstWO} لـ ${E.lastWO})`, `  WorkOrder: text shaped WO-00000, unique per batch (${E.firstWO} to ${E.lastWO})`),
        T("  LineCode: نص من L01 لـ L06 · ModelCode: نص من M101 لـ M112", "  LineCode: text, L01 to L06 · ModelCode: text, M101 to M112"),
        T("  Qty: رقم صحيح، عدد الأجهزة السليمة؛ السالب = وحدات رجعت من الجودة", "  Qty: whole number, good units; negative = units sent back by quality"),
        T("  Value: جنيه، = Qty × التكلفة المعيارية للموديل (سالبة لو الكمية سالبة)", "  Value: EGP, = Qty × the model's standard cost (negative when Qty is)")],
      traps: [],
    }),
    2: (T, E) => ({
      about: T("أول أداة حقيقية، وأسهل واحدة: بتقرا وما بتغيّرش أي حاجة. كل خط بعت تقرير أسبوع ٢ في ملف لوحده، والأداة بتعمل قايمة بكل ملف وشيتاته وعدد صفوفه. الهدف إنك تتعلّم توصّل الأداة من الشات لجهازك وتشغّلها بأمان.", "The first real tool, and the easiest: it reads and changes nothing. Each line sent its week-2 report in a file of its own, and the tool lists every file, its sheets and its row count. The goal is to learn to bring a tool from the chat to your laptop and run it safely."),
      data: [T("- Data/Line_L01_Week_02.xlsx … Line_L06_Week_02.xlsx: ملف لكل خط، فيه شيت Production بنفس أعمدة الإنتاج:", "- Data/Line_L01_Week_02.xlsx … Line_L06_Week_02.xlsx: one file per line, each with a Production sheet holding the production columns:"), "  " + PROD.join(" | ")],
      rules: [T("- الأداة بتقرا بس: ما تفتحش أي ملف للكتابة، وما تحفظش في فولدر Data.", "- The tool only reads: it opens no file for writing and saves nothing in the Data folder."), T("- اعرض كل شيت في الملف، مش أول شيت بس.", "- List every sheet in a file, not just the first."), T("- أي ملف ما ينفعش يتفتح يتسجّل ويتساب، والأداة تكمّل.", "- Any file that can't be opened is logged and skipped, and the tool carries on.")],
      out: [T("- Output/File_List.xlsx: صف لكل شيت: File، Sheet، Rows (من غير صف العناوين)، Columns، TotalQty (لو فيه عمود Qty).", "- Output/File_List.xlsx: one row per sheet: File, Sheet, Rows (header excluded), Columns, TotalQty (when there is a Qty column)."), T("- Output/Run_Log.txt: كل ملف اتقرا أو اتساب وليه.", "- Output/Run_Log.txt: every file read or skipped, and why.")],
      traps: [{ file: "~$Line_L03_Week_02.xlsx", t: u("ملف قفل صغير من إكسل", "A small Excel lock file"), d: u("إكسل بيعمله لما حد يكون فاتح الملف. مش تقرير: الأداة تسيبه وتسجّله، ما توقفش عنده.", "Excel makes it while someone has the file open. It isn't a report: the tool skips and logs it, without stopping.") },
        { file: "Line_L04_Week_02.xlsx", t: u("شيت تاني اسمه Old_Draft", "A second sheet named Old_Draft"), d: u("الأداة لازم تعرضه في القايمة؛ إنت اللي تقرر بعد كده إنه مسودة قديمة ما تتجمعش.", "The tool must list it; you then decide it's an old draft that isn't counted.") }],
      key: [T(`- ملفات تقارير: ${E.files} · شيتات: ${E.sheets} · ملف اتساب: ${E.skipped} (~$Line_L03_Week_02.xlsx)`, `- Report files: ${E.files} · sheets: ${E.sheets} · skipped: ${E.skipped} (~$Line_L03_Week_02.xlsx)`),
        ...LN.map(([c], i) => `  Line_${c}_Week_02.xlsx · Production: ${E.perLine[i]}` + (c === "L04" ? " · Old_Draft: 5" : "")),
        T(`- إجمالي صفوف شيتات Production: ${E.rows} · إجمالي الكمية: ${n(E.units)} جهاز (من غير Old_Draft)`, `- Total rows on the Production sheets: ${E.rows} · total quantity: ${n(E.units)} units (Old_Draft excluded)`)],
    }),
    3: (T, E) => ({
      about: T("كل أسبوع الخطوط بتبعت تقرير إنتاج، وكل ربع سنة حد بيقعد ينسخهم تحت بعض بإيده. الأداة الأولى بتعمل ده في ثواني: ١٣ ملف في جدول واحد، مع عمود بيقول كل صف جه من أنهي ملف.", "Every week the lines send a production report, and every quarter someone copies them under each other by hand. Tool one does it in seconds: 13 files into one table, with a column saying which file each row came from."),
      data: [T("- Data/Week_01.xlsx … Week_13.xlsx: الربع الأول ٢٠٢٦. في كل ملف شيت Production، صف عناوين واحد، صف لكل دفعة:", "- Data/Week_01.xlsx … Week_13.xlsx: Q1 2026. Each file has a Production sheet, one header row, one row per batch:"), "  " + PROD.join(" | "), T("  Date تاريخ · WorkOrder نص WO-00001 · الأكواد نص · Qty عدد الأجهزة السليمة · Value بالجنيه", "  Date: date · WorkOrder: text WO-00001 · codes: text · Qty: good units · Value: EGP")],
      rules: [T("- الدفعة اللي مالهاش WorkOrder مش دفعة (زي صف إجمالي): ما تتجمعش وتتسجّل.", "- A row with no WorkOrder isn't a batch (a totals row, say): it isn't stacked, and it's logged."), T("- الأعمدة تتطابق بالاسم. العمود الزيادة يتسجّل ويتساب. العمود الناقص أو اللي اسمه مختلف: وقّف واسأل.", "- Columns are matched by name. An extra column is logged and left out. A missing or renamed column: stop and ask."), T("- الصف المتكرر بالظبط ما يتحذفش لوحده: يتنسخ في شيت To_Review، وإنت تقرر.", "- An exact duplicate row isn't deleted on its own: it's copied to a To_Review sheet, and you decide."), T("- الكمية السالبة وحدات رجعت من الجودة، وتفضل زي ما هي.", "- A negative quantity is units sent back by quality, and stays as it is.")],
      out: [T("- Output/Stacked.xlsx: شيت Data (كل الأعمدة + SourceFile)، وشيت To_Review (المتكرر).", "- Output/Stacked.xlsx: a Data sheet (every column + SourceFile) and a To_Review sheet (the duplicates)."), T("- Output/Run_Log.txt: كل ملف وعدد صفوفه، وأي حاجة اتسابت وليه، والإجماليات في الآخر.", "- Output/Run_Log.txt: each file and its row count, anything left out and why, and the totals at the end.")],
      traps: [{ file: "Week_02", t: u("صف «Total» في آخر الشيت", "A “Total” row at the bottom of the sheet"), d: u("لو اتجمّع، إنتاج الأسبوع يتحسب مرتين.", "Stacked, the week's output counts twice.") },
        { file: "Week_04", t: u("دفعتين متسجّلين مرتين", "Two batches entered twice"), d: u("نفس WorkOrder مرتين. الأداة تنقلهم للمراجعة، وإنت توافق على الحذف.", "The same WorkOrder twice. The tool moves them to review; you approve removing them.") },
        { file: "Week_07", t: u("ترتيب أعمدة مختلف، وعمود Notes زيادة", "A different column order, and an extra Notes column"), d: u("الربط بترتيب الأعمدة يحط الكمية مكان الموديل؛ لازم الربط بالاسم.", "Matching by position puts the quantity where the model belongs; match by name.") },
        { file: "Week_11", t: u("العمود Qty مكتوب Quantity", "The Qty column is titled Quantity"), d: u("الأداة الصح توقف وتسمّي الملف والعمود، وإنت تقرر إن الاتنين واحد.", "A good tool stops and names the file and the column; you decide the two are the same.") }],
      key: [T(`- ملفات: ${E.files} · صفوف بيانات اتقرت: ${n(E.rowsRead)} · صف Total اتساب: ${E.totalsRow} (Week_02)`, `- Files: ${E.files} · data rows read: ${n(E.rowsRead)} · Total row skipped: ${E.totalsRow} (Week_02)`),
        T(`- متكرر بالظبط: ${E.duplicates} (Week_04) · الصفوف بعد حذفهم: ${n(E.rows)}`, `- Exact duplicates: ${E.duplicates} (Week_04) · rows after removing them: ${n(E.rows)}`),
        T(`- صافي إنتاج الربع: ${n(E.units)} جهاز · القيمة: ${n(E.value)} جنيه`, `- Net output for the quarter: ${n(E.units)} units · value: EGP ${n(E.value)}`),
        T(`- أول تشغيل لازم يوقف عند Week_11 (العمود Quantity)؛ بعد قاعدة «Quantity = Qty» يكمّل ويقرا ${E.week11} صف منه. Week_07 فيه ${E.week7} صف.`, `- The first run must stop at Week_11 (column Quantity); after the rule “Quantity = Qty” it carries on and reads ${E.week11} rows from it. Week_07 holds ${E.week7} rows.`)],
    }),
    4: (T, E) => ({
      about: T("جدول الإنتاج فيه أكواد بس: L03 وM108. المدير عايز يشوف أسماء وعنابر وفئات وقيمة. الأداة التانية بتجيب لكل كود اسمه من شيتات Masters، وتحسب القيمة من التكلفة المعيارية، وتطلّع كل كود ما لقاش مقابل في شيت لوحده.", "The production table holds only codes: L03 and M108. The manager wants names, halls, categories and value. Tool two brings each code its name from the Masters sheets, computes the value from the standard cost, and lists every code with no match on a sheet of its own."),
      data: [T("- Data/Production_Q1.xlsx: شيت Data، صف لكل دفعة في الربع الأول:", "- Data/Production_Q1.xlsx: a Data sheet, one row per batch in Q1:"), "  Date | WorkOrder | LineCode | ModelCode | Qty",
        T("- Data/Masters.xlsx: شيت Lines (LineCode | LineName | Hall) وشيت Models (ModelCode | ModelName | Category | StdCost بالجنيه للجهاز).", "- Data/Masters.xlsx: sheet Lines (LineCode | LineName | Hall) and sheet Models (ModelCode | ModelName | Category | StdCost, EGP per unit).")],
      rules: [T("- الأكواد تتظبط قبل الربط: من غير مسافات، وبحروف كبيرة.", "- Codes are normalised before joining: no spaces, upper case."), T("- كل صفوف الإنتاج تفضل في الناتج، حتى اللي ما اتربطش.", "- Every production row stays in the output, even when it doesn't match."), T("- القيمة = Qty × StdCost. الصف اللي ما اتربطش قيمته فاضية، مش صفر.", "- Value = Qty × StdCost. An unmatched row's value is blank, not zero."), T("- لو كود متسجّل مرتين في Masters ببيانات مختلفة: وقّف واسأل.", "- If a code is listed twice in Masters with different data: stop and ask.")],
      out: [T("- Output/Production_Enriched_Q1.xlsx: شيت Data (الأعمدة + LineName وHall وModelName وCategory وStdCost وValue)، وشيت Unmatched (كل كود وعدد صفوفه وكمياته)، وشيت By_Category (الكمية والقيمة لكل فئة).", "- Output/Production_Enriched_Q1.xlsx: a Data sheet (the columns + LineName, Hall, ModelName, Category, StdCost, Value), an Unmatched sheet (each code with its row count and units) and a By_Category sheet (units and value per category)."), T("- Output/Run_Log.txt", "- Output/Run_Log.txt")],
      traps: [{ file: "Production_Q1", t: u("«L04 » بمسافة، و«l03» بحروف صغيرة", "“L04 ” with a space, and “l03” in lower case"), d: u("من غير تظبيط، الخط يظهر كأنه خطّين، أو ما يتربطش.", "Without normalising, one line shows up as two, or doesn't match.") },
        { file: "Production_Q1", t: u("موديل جديد M113 مش في شيت Models", "A new model, M113, missing from the Models sheet"), d: u("يظهر في Unmatched، وكميته تفضل محسوبة لخطه.", "It goes on Unmatched, and its units still count for its line.") },
        { file: "Masters.xlsx", t: u("M108 متسجّل مرتين بتكلفتين", "M108 listed twice with two costs"), d: u("الأداة توقف وتسأل أنهي تكلفة. المعتمدة من قسم التكاليف 12300.", "The tool stops and asks which cost. Cost accounting's approved figure is 12300.") }],
      key: [T(`- صفوف الإنتاج: ${n(E.rows)} · «L04 » بمسافة: ${E.spaced} صف · «l03»: ${E.lower} صف (كلهم اتربطوا بعد التظبيط)`, `- Production rows: ${n(E.rows)} · “L04 ” with a space: ${E.spaced} rows · “l03”: ${E.lower} rows (all matched after normalising)`),
        T(`- أول تشغيل لازم يوقف عند M108 (12300 و12900). المعتمد: 12300.`, `- The first run must stop at M108 (12300 and 12900). Approved: 12300.`),
        T(`- Unmatched: ${E.unmatched.code} بس، في ${E.unmatched.rows} صف، ${n(E.unmatched.units)} جهاز`, `- Unmatched: only ${E.unmatched.code}, on ${E.unmatched.rows} rows, ${n(E.unmatched.units)} units`),
        T(`- By_Category بالأجهزة: Small ${n(E.cats.Small)} · Medium ${n(E.cats.Medium)} · Large ${n(E.cats.Large)} · Extra Large ${n(E.cats["Extra Large"])} · من غير فئة ${n(E.unmatched.units)}`, `- By_Category in units: Small ${n(E.cats.Small)} · Medium ${n(E.cats.Medium)} · Large ${n(E.cats.Large)} · Extra Large ${n(E.cats["Extra Large"])} · no category ${n(E.unmatched.units)}`),
        T(`- إجمالي الكمية: ${n(E.units)} جهاز · إجمالي القيمة (من غير M113): ${n(E.value)} جنيه`, `- Total units: ${n(E.units)} · total value (M113 excluded): EGP ${n(E.value)}`)],
    }),
    5: (T, E) => ({
      about: T("آخر كل شهر، مدير المصنع بيسأل: كل خط عمل كام من خطته؟ الأداة التالتة بتجمع إنتاج كل خط في كل شهر من ملف، وتجيب الخطة من ملف تاني، وتحسب نسبة التحقيق والترتيب، وتراجع نفسها قبل ما تقول «خلصت».", "At every month's end the factory manager asks: how much of its plan did each line make? Tool three sums each line's output per month from one workbook, brings the plan from another, computes achievement and rank, and checks itself before saying “done”."),
      data: [T("- Data/Production_Q1.xlsx: شيت Data، صف لكل دفعة:", "- Data/Production_Q1.xlsx: a Data sheet, one row per batch:"), "  Date | WorkOrder | LineCode | LineName | ModelCode | Qty",
        T("- Data/Plan_Q1.xlsx: شيت Plan: LineCode | Month (نص بالشكل 2026-01) | PlanQty (بالأجهزة).", "- Data/Plan_Q1.xlsx: a Plan sheet: LineCode | Month (text shaped 2026-01) | PlanQty (units).")],
      rules: [T("- المفتاح المشترك: LineCode + الشهر. الشهر من Date لازم يتكتب بنفس شكل Month.", "- The shared key: LineCode + month. The month taken from Date must be written the same way as Month."), T("- النسبة = الإنتاج ÷ الخطة، برقم عشري واحد. الترتيب جوّه كل شهر على النسبة.", "- Rate = output ÷ plan, to one decimal place. Rank within each month, by rate."), T("- خط له إنتاج من غير خطة: «No plan»، من غير نسبة ولا ترتيب. خط له خطة من غير إنتاج: «No output».", "- A line with output and no plan: “No plan”, with no rate or rank. A line with a plan and no output: “No output”."), T("- الكمية السالبة وحدات رجعت من الجودة، بتتخصم من الإنتاج.", "- A negative quantity is units sent back by quality; it reduces output.")],
      out: [T("- Output/Output_vs_Plan_Q1.xlsx: شيت Report: Month | LineCode | LineName | Output | Plan | Rate | Rank | Status، وشيت Check: إجمالي التقرير قصاد إجمالي المصدر.", "- Output/Output_vs_Plan_Q1.xlsx: a Report sheet: Month | LineCode | LineName | Output | Plan | Rate | Rank | Status, and a Check sheet: the report's total against the source's."), T("- النسبة تحت ٩٠٪ بلون، وأعمدة بعرض مناسب، وأرقام بفاصل الآلاف.", "- Rates under 90% coloured, sensible column widths, thousands separators.")],
      traps: [{ file: "Plan_Q1", t: u("L06 من غير خطة لشهر مارس", "L06 has no plan for March"), d: u("يتكتب «No plan»، مش صفر ولا قسمة على صفر، وإنتاجه يفضل في الإجمالي.", "It reads “No plan”, not zero and not a division by zero, and its output stays in the total.") },
        { file: "Plan_Q1", t: u("خط جديد L07 له خطة ومالوش إنتاج", "A new line, L07, has a plan and no output"), d: u("الخط لسه ما اشتغلش. يظهر في التقرير «No output»، ما يختفيش.", "The line hasn't started. It shows in the report as “No output”; it doesn't vanish.") },
        { file: "Production_Q1", t: u("كميات سالبة من الجودة", "Negative quantities from quality"), d: u("بتتخصم من الإنتاج؛ ما تتحذفش علشان «شكلها غلط».", "They reduce output; never delete them because they “look wrong”.") }],
      key: [T(`- صفوف التقرير: ${E.reportRows} (${E.rated} بنسبة، و«No plan» لـ L06 في مارس، و«No output» لـ L07 في مارس) · الخطط في الملف: ${E.plans}`, `- Report rows: ${E.reportRows} (${E.rated} with a rate, “No plan” for L06 in March, “No output” for L07 in March) · plans in the file: ${E.plans}`),
        T(`- أعلى نسبة: ${E.best.line} في ${E.best.month} = ${E.best.pct}% · أقل نسبة: ${E.worst.line} في ${E.worst.month} = ${E.worst.pct}%`, `- Highest rate: ${E.best.line} in ${E.best.month} = ${E.best.pct}% · lowest: ${E.worst.line} in ${E.worst.month} = ${E.worst.pct}%`),
        T(`- إجمالي التقرير = إجمالي المصدر = ${n(E.units)} جهاز (بعد خصم ${E.returnUnits} وحدة رجعت من الجودة في ${E.returns} صف)`, `- Report total = source total = ${n(E.units)} units (after ${E.returnUnits} units sent back by quality on ${E.returns} rows)`),
        "", T("الإنتاج / الخطة لكل خط وشهر:", "Output / plan per line and month:")],
    }),
    6: (T, E) => ({
      about: T("المثال التاني من المصنع: المشتريات. كل شهر، المشتريات والمخازن بيسألوا نفس السؤال: كل أمر شراء وصل منه قد إيه؟ الأداة الرابعة بتطابق كل سطر في أوامر الشراء مع كل اللي اتستلم عليه، حتى لو وصل على كذا دفعة، وتدّي كل سطر حالة.", "The factory's second example: purchasing. Every month purchasing and the stores ask the same question: how much of each purchase order has arrived? Tool four matches every purchase-order line with everything received against it, even across several deliveries, and gives each line a status."),
      data: [T("- Data/Purchase_Orders_Feb.xlsx: شيت PO_Lines: PONumber | Supplier | MaterialCode | OrderedQty | UnitPrice | DueDate. سطر لكل خامة في كل أمر.", "- Data/Purchase_Orders_Feb.xlsx: a PO_Lines sheet: PONumber | Supplier | MaterialCode | OrderedQty | UnitPrice | DueDate. One row per material on each order."),
        T("- Data/Goods_Receipts_Feb.xlsx: شيت Receipts: Date | ReceiptNo | PONumber | MaterialCode | ReceivedQty. صف لكل استلام؛ السطر الواحد ممكن يوصل على كذا استلام.", "- Data/Goods_Receipts_Feb.xlsx: a Receipts sheet: Date | ReceiptNo | PONumber | MaterialCode | ReceivedQty. One row per receipt; one order line may arrive in several receipts.")],
      rules: [T("- المفتاح: PONumber + MaterialCode مع بعض (نفس الخامة ممكن تبقى على أكتر من أمر).", "- The key: PONumber + MaterialCode together (the same material can be on more than one order)."), T("- الأرقام تتظبط قبل المطابقة: من غير مسافات، وبحروف كبيرة.", "- Numbers are normalised before matching: no spaces, upper case."), T("- سياسة المشتريات: الفرق لحد ٢٪ من المطلوب = Complete. أقل = Partial. أكتر = Over. مفيش استلام = Not received.", "- Purchasing policy: within 2% of the ordered quantity = Complete. Less = Partial. More = Over. Nothing received = Not received."), T("- الاستلام اللي مالوش سطر أمر شراء يتكتب في شيت لوحده، وما يتجمعش على أي سطر.", "- A receipt with no order line goes on a sheet of its own and isn't added to any line.")],
      out: [T("- Output/PO_Match_Feb.xlsx: شيت Status (سطر لكل سطر أمر: Ordered، Received، Difference، Status، OpenValue)، وشيت Unmatched_Receipts، وشيت Summary (عدد كل حالة، وقيمة المتبقي لكل مورّد).", "- Output/PO_Match_Feb.xlsx: a Status sheet (one row per order line: Ordered, Received, Difference, Status, OpenValue), an Unmatched_Receipts sheet, and a Summary sheet (the count of each status, and the open value per supplier).")],
      traps: [{ file: "Goods_Receipts_Feb", t: u("أرقام أوامر بحروف صغيرة ومسافة", "Order numbers in lower case with a space"), d: u("«po-26-0207 » هي نفسها PO-26-0207 بعد التظبيط.", "“po-26-0207 ” is PO-26-0207 once normalised.") },
        { file: "Goods_Receipts_Feb", t: u("استلام على أمر مش موجود (PO-26-0299)", "A receipt against an order that doesn't exist (PO-26-0299)"), d: u("يروح Unmatched_Receipts، والمخازن تراجع رقم الأمر.", "It goes to Unmatched_Receipts, and the stores check the order number.") },
        { file: "Goods_Receipts_Feb", t: u("استلام لخامة مش على الأمر ده", "A receipt for a material that isn't on that order"), d: u("رقم الأمر صح بس الخامة مش عليه: برضه Unmatched، مش سطر جديد.", "The order number is right but the material isn't on it: Unmatched too, not a new line.") }],
      key: [T(`- أوامر شراء: ${E.orders} · سطور: ${E.lines} · صفوف استلام: ${E.receipts} (منهم ${E.fixedCase} رقم أمرهم اتظبط)`, `- Purchase orders: ${E.orders} · lines: ${E.lines} · receipt rows: ${E.receipts} (${E.fixedCase} of them with an order number normalised)`),
        T(`- الحالات: Complete ${E.status.Complete} · Partial ${E.status.Partial} · Over ${E.status.Over} · Not received ${E.status["Not received"]}`, `- Statuses: Complete ${E.status.Complete} · Partial ${E.status.Partial} · Over ${E.status.Over} · Not received ${E.status["Not received"]}`),
        T(`- Unmatched_Receipts: ${E.unmatched} (GRN-26-9001 على PO-26-0299، وGRN-26-9002 لخامة RC-02 مش على أمرها)`, `- Unmatched_Receipts: ${E.unmatched} (GRN-26-9001 on PO-26-0299, and GRN-26-9002 for RC-02, which isn't on its order)`),
        T(`- قيمة المتبقي (Partial + Not received): ${n(E.openValue)} جنيه`, `- Open value (Partial + Not received): EGP ${n(E.openValue)}`),
        "", T("كل سطر: الأمر · الخامة · المطلوب / المستلم · الحالة", "Every line: order · material · ordered / received · status")],
    }),
    7: (T, E) => ({
      about: T("أصعب مشروع، وبيجمع المثالين: خطة إنتاج أبريل بتقول هنعمل كام جهاز من كل موديل، وقايمة المكوّنات (BOM) بتقول كل جهاز محتاج إيه. الأداة الخامسة بتحسب كل خامة محتاجين منها قد إيه، وتطرح المخزون واللي في الطريق، وتقرّب لحجم العبوة، وتطلّع طلب شراء جاهز للمراجعة.", "The hardest project, joining both examples: April's production plan says how many TVs of each model, and the bill of materials (BOM) says what each TV needs. Tool five works out how much of each material is needed, subtracts stock and what's on order, rounds up to the pack size, and produces a purchase request ready for review."),
      data: [T("- Data/Production_Plan_Apr.xlsx: شيت Plan: ModelCode | PlannedQty.", "- Data/Production_Plan_Apr.xlsx: a Plan sheet: ModelCode | PlannedQty."), T("- Data/BOM.xlsx: شيت BOM: ModelCode | MaterialCode | QtyPerUnit (كام قطعة في الجهاز الواحد).", "- Data/BOM.xlsx: a BOM sheet: ModelCode | MaterialCode | QtyPerUnit (pieces in one TV)."),
        T("- Data/Materials.xlsx: شيت Materials: MaterialCode | MaterialName | Unit | Supplier | PackSize | UnitPrice | LeadTimeDays.", "- Data/Materials.xlsx: a Materials sheet: MaterialCode | MaterialName | Unit | Supplier | PackSize | UnitPrice | LeadTimeDays."), T("- Data/Stock.xlsx: شيت Stock: MaterialCode | Unit | OnHand | OnOrder.", "- Data/Stock.xlsx: a Stock sheet: MaterialCode | Unit | OnHand | OnOrder.")],
      rules: [T("- الاحتياج الإجمالي = مجموع (PlannedQty × QtyPerUnit) على كل الموديلات.", "- Gross need = the sum of (PlannedQty × QtyPerUnit) over all models."), T("- الصافي = الإجمالي − OnHand − OnOrder، ولو سالب يبقى صفر.", "- Net = gross − OnHand − OnOrder, and zero if negative."), T("- الكمية المطلوبة = الصافي متقرّب لفوق لأقرب مضاعف لـ PackSize.", "- Order quantity = net rounded up to the nearest multiple of PackSize."), T("- كل الكميات لازم تكون بنفس الوحدة قبل أي طرح. لو الوحدة مختلفة بين ملفين: وقّف واسأل.", "- Every quantity must be in the same unit before any subtraction. If two files use different units: stop and ask."), T("- موديل في الخطة مالوش BOM: وقّف واسأل؛ ما تكمّلش كأنه مش موجود.", "- A planned model with no BOM: stop and ask; don't carry on as if it weren't there.")],
      out: [T("- Output/Material_Needs_Apr.xlsx: شيت Explosion (موديل × خامة: الخطوة الوسطانية للمراجعة)، وشيت Needs (لكل خامة: Gross، OnHand، OnOrder، Net، PackSize، OrderQty، Value، Supplier، LeadTimeDays)، وشيت Not_Planned، وشيت Check.", "- Output/Material_Needs_Apr.xlsx: an Explosion sheet (model × material: the middle step, for review), a Needs sheet (per material: Gross, OnHand, OnOrder, Net, PackSize, OrderQty, Value, Supplier, LeadTimeDays), a Not_Planned sheet and a Check sheet.")],
      traps: [{ file: "Production_Plan_Apr", t: u("الموديل M113 في الخطة ومالوش BOM", "M113 is in the plan with no BOM"), d: u("الأداة توقف وتسأل. القرار: يتكتب في Not_Planned لحد ما الهندسة تبعت الـ BOM، وباقي الطلب يكمّل.", "The tool stops and asks. The decision: it goes on Not_Planned until engineering sends its BOM, and the rest of the order goes ahead.") },
        { file: "Stock.xlsx", t: u("المسامير متعدودة بالعلبة (box of 1000)", "Screws counted in boxes (box of 1000)"), d: u("الـ BOM بالقطعة والمخزون بالعلبة. من غير تحويل، المخزون يبان ألف مرة أقل، والطلب يطلع ضخم.", "The BOM counts pieces and the stock counts boxes. Without converting, stock looks a thousand times smaller and the order comes out huge.") }],
      key: [T(`- الخطة: ${n(E.planned)} جهاز في ${Object.keys(APR_PLAN).length} موديل · Not_Planned: ${E.notPlanned.code} (${n(E.notPlanned.units)} جهاز، مالوش BOM) · سطور BOM: ${E.bomRows}`, `- The plan: ${n(E.planned)} TVs across ${Object.keys(APR_PLAN).length} models · Not_Planned: ${E.notPlanned.code} (${n(E.notPlanned.units)} TVs, no BOM) · BOM rows: ${E.bomRows}`),
        T(`- خامات محسوبة: ${E.materials} · محتاجة طلب: ${E.toOrder} · مش محتاجة: ${E.nothing} · قيمة الطلب: ${n(E.value)} جنيه`, `- Materials worked out: ${E.materials} · to order: ${E.toOrder} · nothing to order: ${E.nothing} · order value: EGP ${n(E.value)}`),
        T(`- مثال للمراجعة: PNL-55: إجمالي ${n(E.panel55.gross)} − مخزون ${n(E.panel55.onHand)} − في الطريق ${n(E.panel55.onOrder)} = ${n(E.panel55.net)} → طلب ${n(E.panel55.order)}`, `- A check: PNL-55: gross ${n(E.panel55.gross)} − stock ${n(E.panel55.onHand)} − on order ${n(E.panel55.onOrder)} = ${n(E.panel55.net)} → order ${n(E.panel55.order)}`),
        T(`- المسامير: SCR-M3: إجمالي ${n(E.screwM3.gross)} قطعة − مخزون ${n(E.screwM3.onHand)} قطعة (${n(E.screwM3.onHand / 1000)} علبة) = ${n(E.screwM3.net)} → طلب ${n(E.screwM3.order)}`, `- Screws: SCR-M3: gross ${n(E.screwM3.gross)} pieces − stock ${n(E.screwM3.onHand)} pieces (${n(E.screwM3.onHand / 1000)} boxes) = ${n(E.screwM3.net)} → order ${n(E.screwM3.order)}`),
        "", T("كل خامة: الإجمالي · المخزون · في الطريق · الصافي → الطلب", "Every material: gross · stock · on order · net → order")],
    }),
    8: (T, E) => ({
      about: T("الأداة الأولى (الدرس ٣) اشتغلت على الربع الأول. دلوقتي وصلت تقارير أبريل، وفيها تغييرات ما حدش قال عليها. المشروع ده بيدرّبك تقرا رسالة الوقف، وترجع للنموذج بالمعلومات الصح، وتضيف قاعدة واحدة في المرة.", "Tool one (lesson 3) worked on the first quarter. Now April's reports have arrived, with changes nobody announced. This project trains you to read a stop message, go back to the model with the right information, and add one rule at a time."),
      data: [T("- Data/Week_14.xlsx … Week_17.xlsx: تقارير أسابيع أبريل ٢٠٢٦، بنفس شكل الدرس ٣ (شيت Production):", "- Data/Week_14.xlsx … Week_17.xlsx: April 2026's weekly reports, shaped as in lesson 3 (a Production sheet):"), "  " + PROD.join(" | ")],
      rulesTitle: T("طريقة الشغل", "How to work"),
      rules: [T("- كل مرة توقف: الرسالة بالحرف + آخر سطور السجل + اسم الملف، في نفس المحادثة اللي بنيت فيها الأداة.", "- Each time it stops: the message word for word + the last lines of the log + the file name, in the same chat where you built the tool."), T("- تعديل واحد في المرة، ونسخة جديدة باسم جديد (stack_tool_v2.ps1، v3…)، والقديمة تفضل زي ما هي.", "- One change at a time, each new version under a new name (stack_tool_v2.ps1, v3…), and the old one kept as it is."), T("- إنت اللي تقرر القاعدة، مش النموذج: هو بيقترح، وإنت بتوافق أو بتعدّل.", "- You decide the rule, not the model: it proposes, you agree or adjust.")],
      steps: [T("١. فك الملف في فولدر لوحده، وانسخ stack_tool.ps1 وrun_stack.bat من مشروع الدرس ٣ جنب فولدر Data. لو مش معاك، ابنيها الأول من Prompt.txt بتاع الدرس ٣.", "1. Unzip into a folder of its own and copy stack_tool.ps1 and run_stack.bat from the lesson-3 project next to the Data folder. If you don't have them, build them first from lesson 3's Prompt.txt."),
        T("٢. شغّل بدبل كليك على run_stack.bat.", "2. Double-click run_stack.bat."),
        T("٣. لما توقف: افتح Prompt.txt، واملاه بالرسالة بالحرف، وآخر سطور Output/Run_Log.txt، واسم الملف، ونسخة PowerShell، والصقه في نفس المحادثة اللي بنيت فيها الأداة.", "3. When it stops: open Prompt.txt, fill it with the message word for word, the last lines of Output/Run_Log.txt, the file name and the PowerShell version, and paste it into the same chat where you built the tool."),
        T("٤. النموذج بيشرح السبب الأول. اتفقوا على قاعدة واحدة، واحفظ النسخة الجديدة stack_tool_v2.ps1، وغيّر الاسم في ملف ‎.bat.", "4. The model explains the cause first. Agree on one rule, save the new version as stack_tool_v2.ps1, and change the name in the .bat file."),
        T("٥. شغّل تاني. كرّر لحد ما تخلص من غير وقفة، واكتب كل قاعدة في Tool_Card.txt.", "5. Run again. Repeat until it finishes without a stop, and write each rule into Tool_Card.txt."),
        T("٦. قارن الناتج بـ Answer_Key.txt.", "6. Compare the output with Answer_Key.txt.")],
      out: [T("- نفس ناتج الدرس ٣ (Output/Stacked.xlsx وRun_Log.txt) لأسابيع أبريل، وبطاقة للأداة Tool_Card.txt فيها كل القواعد الجديدة.", "- The same output as lesson 3 (Output/Stacked.xlsx and Run_Log.txt) for April's weeks, and a tool card Tool_Card.txt holding every new rule.")],
      traps: [{ file: "Week_14", t: u("عمود جديد Shift في الآخر", "A new Shift column at the end"), d: u("لو الأداة بتطابق بالاسم، بتسجّله وتكمّل. لو وقفت، القاعدة: العمود الزيادة يتساب ويتسجّل.", "If the tool matches by name, it logs it and carries on. If it stops, the rule: an extra column is left out and logged.") },
        { file: "Week_15", t: u("التواريخ مكتوبة كنص (يوم/شهر/سنة)", "Dates typed as text (day/month/year)"), d: u("النموذج لازم يسألك: اليوم الأول ولا الشهر؟ الإجابة: اليوم الأول.", "The model must ask: day first or month first? The answer: day first.") },
        { file: "Week_16", t: u("الشيت اسمه Sheet1 مش Production", "The sheet is named Sheet1, not Production"), d: u("رسالة «الشيت مش موجود». القاعدة: لو الملف فيه شيت واحد بس، يتقري مهما كان اسمه، ويتسجّل.", "A “sheet not found” message. The rule: if the file has only one sheet, read it whatever its name, and log that.") },
        { file: "Week_17", t: u("أسبوع صيانة: العناوين بس", "A maintenance week: headers only"), d: u("صفر صفوف مش خطأ: الأداة تكتب «0 rows» في السجل وتكمّل، ما توقفش.", "Zero rows isn't an error: the tool logs “0 rows” and carries on, without stopping.") }],
      key: [T(`- ملفات: ${E.files} · صفوف: Week_14 ${E.perWeek[0]} · Week_15 ${E.perWeek[1]} · Week_16 ${E.perWeek[2]} · Week_17 ${E.perWeek[3]} (أسبوع صيانة)`, `- Files: ${E.files} · rows: Week_14 ${E.perWeek[0]} · Week_15 ${E.perWeek[1]} · Week_16 ${E.perWeek[2]} · Week_17 ${E.perWeek[3]} (maintenance week)`),
        T(`- بعد القواعد الأربعة: ${E.rows} صف · ${n(E.units)} جهاز · ${n(E.value)} جنيه · ${E.textDates} تاريخ اتحوّل من نص (Week_15)`, `- After the four rules: ${E.rows} rows · ${n(E.units)} units · EGP ${n(E.value)} · ${E.textDates} dates converted from text (Week_15)`),
        T("- الترتيب المتوقع للوقفات: Week_15 (سؤال التاريخ، لو الأداة بتسأل قبل ما تبدأ) ثم Week_16 (الشيت). Week_14 وWeek_17 ما المفروض يوقفوش أداة مكتوبة كويس.", "- The expected stops, in order: Week_15 (the date question, if the tool asks before starting) then Week_16 (the sheet). Week_14 and Week_17 shouldn't stop a well-written tool.")],
    }),
  };

  function readme(p, lang) {
    const T = (ar, en) => (lang === "ar" ? ar : en), E = p.expected(), g = G[p.n](T, E), tool = TOOL[p.n], rule = "=".repeat(40);
    const steps = g.steps || [
      T(`١. فك الملف في فولدر لوحده، مثلًا C:\\Automation\\${p.folder}، وخلّي فولدر Data زي ما هو.`, `1. Unzip into a folder of its own, for example C:\\Automation\\${p.folder}, and leave the Data folder as it is.`),
      T("٢. افتح Prompt.txt، وحط مسار الفولدر بتاعك مكان [مسار الفولدر] (وأي قوس تاني من «قواعد الشغل»)، والصقه كله في ChatGPT أو Gemini Enterprise.", "2. Open Prompt.txt, put your folder's path in place of [folder path] (and any other bracket from the “Business rules”), and paste all of it into ChatGPT or Gemini Enterprise."),
      T("٣. النموذج هيسأل قبل ما يكتب الكود. جاوب من «قواعد الشغل» فوق. ما تقولوش المشاكل اللي في الملفات: الأداة الكويسة هي اللي تكتشفها.", "3. The model will ask before writing code. Answer from the “Business rules” above. Don't tell it the files' problems: a good tool is one that finds them."),
      T(`٤. احفظ ${tool}.ps1 و run_${tool.replace("_tool", "")}.bat جنب فولدر Data (الدرس ٢ بيشرح الحفظ)، وشغّل بدبل كليك على ملف ‎.bat.`, `4. Save ${tool}.ps1 and run_${tool.replace("_tool", "")}.bat next to the Data folder (lesson 2 explains saving), and double-click the .bat file.`),
      T("٥. لو وقفت برسالة: ده شغلها الصح. ارجع للنموذج بالرسالة بالحرف وآخر سطور Run_Log.txt.", "5. If it stops with a message, that is it working properly. Go back to the model with the message word for word and the last lines of Run_Log.txt."),
      T("٦. بعد ما تخلص، قارن الناتج بـ Answer_Key.txt رقم برقم.", "6. When it finishes, compare the output with Answer_Key.txt figure by figure."),
    ];
    return [
      T(`مشروع الدرس ${ad(p.n)} — ${p.title.ar}`, `Lesson ${p.n} project — ${p.title.en}`),
      T(`الوحدة ٢: أتمتة إكسل · المشروع ${ad(p.n)} من ٨ · كل ملفات إكسل بالإنجليزي · كل الأرقام توضيحية`, `Unit 2: Excel automation · project ${p.n} of 8 · every Excel file is in English · every figure is illustrative`), rule, "",
      T("الموقف", "The situation"), g.about, "",
      T("في الفولدر", "In this folder"),
      T("- Data/: ملفات الإكسل اللي هتشتغل عليها (ما تعدّلش فيها).", "- Data/: the Excel files you work on (don't edit them)."),
      T("- Prompt.txt: الـ Prompt جاهز تنسخه.", "- Prompt.txt: the Prompt, ready to copy."),
      T("- Answer_Key.txt: النتيجة الصح. افتحه بعد التشغيل، مش قبله.", "- Answer_Key.txt: the right result. Open it after the run, not before."), "",
      T("البيانات (الجزء ده بيروح للنموذج)", "The data (this part goes to the model)"), ...g.data, "",
      g.rulesTitle || T("قواعد الشغل (قولها لما النموذج يسأل)", "Business rules (give them when the model asks)"), ...g.rules, "",
      T("المطلوب", "What to produce"), ...g.out, "",
      T("الخطوات", "Steps"), ...steps, "",
      T("قبل ما تعتمد النتيجة", "Before you rely on the result"),
      T("- الأداة اشتغلت على Data وما غيّرتش فيه حاجة؟ الناتج في فولدر Output لوحده؟", "- Did the tool leave Data unchanged, with its output in a separate Output folder?"),
      T("- عدد الصفوف والإجماليات في السجل نفس مفتاح الإجابة؟", "- Do the log's row counts and totals match the answer key?"),
      T("- كل وقفة أو صف اتساب له سبب مكتوب في السجل؟", "- Does every stop or skipped row have a reason written in the log?"),
    ].join("\r\n") + "\r\n";
  }

  function answerKey(p, lang) {
    const T = (ar, en) => (lang === "ar" ? ar : en), E = p.expected(), g = G[p.n](T, E), lines = [...g.key];
    if (p.n === 5) {
      const pl = planRows();
      for (let m = 1; m <= 3; m++) for (const [c] of [...LN, ["L07"]]) {
        const o = c === "L07" ? 0 : E.per[c][m - 1], t = pl.find((r) => r[0] === c && r[1] === "2026-0" + m);
        if (c === "L07" && !t) continue;
        lines.push(`  2026-0${m} ${c}: ${n(o)} / ${t ? n(t[2]) + (o ? " = " + ((o / t[2]) * 100).toFixed(1) + "%" : " · No output") : "No plan"}`);
      }
    }
    if (p.n === 6) {
      const { lines: pl, recs } = purchasing();
      for (const l of pl) { const got = sum(recs.filter((x) => x.po === l.po && x.mc === l.mc), (x) => x.q), s = got === 0 ? "Not received" : got < l.qty * 0.98 ? "Partial" : got > l.qty * 1.02 ? "Over" : "Complete"; lines.push(`  ${l.po} · ${l.mc} · ${n(l.qty)} / ${n(got)} · ${s}`); }
    }
    if (p.n === 7) for (const x of needs().out) lines.push(`  ${x.mc} · ${n(x.g)} · ${n(x.on)} · ${n(x.ord)} · ${n(x.net)} → ${n(x.order)}`);
    if (g.traps.length) { lines.push("", T("المشاكل المتعمّدة، وإزاي الأداة الصح تتعامل معاها", "The planted problems, and how a correct tool handles them")); for (const x of g.traps) lines.push(`- ${x.file}: ${x.t[lang]} — ${x.d[lang]}`); }
    return [T(`مفتاح الإجابة — مشروع الدرس ${ad(p.n)}`, `Answer key — lesson ${p.n} project`), T("راجعه بعد التشغيل، مش قبله.", "Check it after the run, not before."), "", ...lines].join("\r\n") + "\r\n";
  }

  for (const p of P) { p.folder = `Lesson_${p.n}_${p.slug}`; p.zip = p.folder + ".zip"; p.tool = TOOL[p.n] || null; p.prompt = PROMPT[p.n]; p.traps = G[p.n]((ar, en) => en, p.expected()).traps; }
  A.xlProjects = {
    list: P, byLesson: Object.fromEntries(P.map((p) => [p.lesson, p])), serial0: SERIAL0, lines: LN.map((l) => l[0]), models: MD.map((m) => m[0]), newModel: NEW[0],
    linesTable: LN, modelsTable: MD, rng,   // the factory itself, shared with the unit-3 projects (data/office-projects.js)
    q1, apr, monthOf, planRows, bom, materials: MAT, aprPlan: APR_PLAN, purchasing, needs, readme, answerKey, guide: (p, lang) => G[p.n]((ar, en) => (lang === "ar" ? ar : en), p.expected()),
  };
})(window.ACADEMY = window.ACADEMY || {});
