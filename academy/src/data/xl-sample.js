/* The unit-2 sample data kit: the production lines of a television factory (no factory or company is named), one
   quarter (Q1 2026), every file the three tools of lesson f8 work on. A seeded generator builds the same rows every
   time, so the figures quoted in the lessons and the answer key never drift (data.test.mjs recomputes them from the
   files, the way a correct tool would).
   Each row is one production batch: a work order on a line, building one TV model; Value is the quantity at the model's
   standard cost. Ten problems are planted on purpose («الفخاخ»): each lesson of the unit meets some of them. The kit is
   offered in the reader's language (headers, names); codes, file names, sheet names and every figure are the same in
   both. Everything is illustrative. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  const LN = [   // code, name, hall, batches a day at most
    ["L01", u("خط تجميع ١", "Assembly line 1"), u("عنبر أ", "Hall A"), 6],
    ["L02", u("خط تجميع ٢", "Assembly line 2"), u("عنبر أ", "Hall A"), 5],
    ["L03", u("خط تجميع ٣", "Assembly line 3"), u("عنبر ب", "Hall B"), 5],
    ["L04", u("خط تجميع ٤", "Assembly line 4"), u("عنبر ب", "Hall B"), 4],
    ["L05", u("خط تجميع ٥", "Assembly line 5"), u("عنبر ج", "Hall C"), 4],
    ["L06", u("خط تجميع ٦", "Assembly line 6"), u("عنبر ج", "Hall C"), 3],
  ];
  const CAT = { s: u("شاشات صغيرة", "Small screens"), m: u("شاشات متوسطة", "Medium screens"), l: u("شاشات كبيرة", "Large screens"), x: u("شاشات كبيرة جدًا", "Extra-large screens") };
  const MD = [   // code, name, category, standard cost per unit (EGP, illustrative), most units in one batch
    ["M101", u("شاشة 24 بوصة HD", "24-inch HD TV"), "s", 2900, 60],
    ["M102", u("شاشة 32 بوصة HD", "32-inch HD TV"), "s", 3900, 60],
    ["M103", u("شاشة 32 بوصة سمارت", "32-inch smart TV"), "s", 4600, 60],
    ["M104", u("شاشة 40 بوصة Full HD", "40-inch Full HD TV"), "m", 6200, 45],
    ["M105", u("شاشة 43 بوصة Full HD", "43-inch Full HD TV"), "m", 6900, 45],
    ["M106", u("شاشة 43 بوصة سمارت", "43-inch smart TV"), "m", 7800, 45],
    ["M107", u("شاشة 50 بوصة 4K", "50-inch 4K TV"), "l", 10400, 30],
    ["M108", u("شاشة 55 بوصة 4K", "55-inch 4K TV"), "l", 12300, 30],
    ["M109", u("شاشة 55 بوصة QLED", "55-inch QLED TV"), "l", 15600, 30],
    ["M110", u("شاشة 65 بوصة 4K", "65-inch 4K TV"), "x", 19800, 18],
    ["M111", u("شاشة 65 بوصة QLED", "65-inch QLED TV"), "x", 24500, 18],
    ["M112", u("شاشة 75 بوصة 4K", "75-inch 4K TV"), "x", 31200, 12],
  ];
  const NEW = ["M113", 13800, 30];   // a 58-inch model built from week 10, not yet in the models sheet (trap 7)
  const H = {   // headers
    prod: [u("التاريخ", "Date"), u("رقم أمر التشغيل", "WorkOrder"), u("كود الخط", "LineCode"), u("كود الموديل", "ModelCode"), u("الكمية", "Qty"), u("القيمة", "Value")],
    qtyAlt: u("الكميه", "Quantity"), notes: u("ملاحظات", "Notes"), total: u("الإجمالي", "Total"),
    lines: [u("كود الخط", "LineCode"), u("اسم الخط", "LineName"), u("العنبر", "Hall")],
    models: [u("كود الموديل", "ModelCode"), u("اسم الموديل", "ModelName"), u("الفئة", "Category"), u("التكلفة المعيارية", "StdCost")],
    plan: [u("كود الخط", "LineCode"), u("الشهر", "Month"), u("الخطة", "Plan")],
  };

  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const DAY0 = Date.UTC(2026, 0, 1), SERIAL0 = Math.round((DAY0 - Date.UTC(1899, 11, 30)) / 864e5);   // Excel's day number for 1 Jan 2026
  const monthOf = (day) => (day < 31 ? 1 : day < 59 ? 2 : 3);

  /* the true production of the quarter: one row per batch, in date order */
  function truth() {
    const r = rng(20260101), rows = [];
    let wo = 0;
    for (let d = 0; d < 90; d++) {
      const date = new Date(DAY0 + d * 864e5);
      if (date.getUTCDay() === 5) continue;   // Friday: the factory is closed
      for (const [code, , , size] of LN) {
        const n = 1 + Math.floor(r() * size);
        for (let k = 0; k < n; k++) {
          let m = MD[Math.floor(r() * MD.length)], mc = m[0], cost = m[3], most = m[4];
          if (d >= 63 && r() < 0.06) { mc = NEW[0]; cost = NEW[1]; most = NEW[2]; }
          let q = 5 + Math.floor(r() * most);
          if (r() < 0.012) q = -(2 + Math.floor(r() * 5));   // units sent back by quality: a real correction, it reduces net output
          rows.push({ day: d, week: Math.floor(d / 7) + 1, wo: "WO-" + String(++wo).padStart(5, "0"), ln: code, mc, q, v: q * cost });
        }
      }
    }
    return rows;
  }

  /* the files as the lines really send them, with the planted problems */
  function build(lang) {
    const L = (x) => x[lang] || x.en;
    const all = truth(), files = [];
    const pad = (n) => String(n).padStart(2, "0");
    for (let w = 1; w <= 13; w++) {
      const head = H.prod.map(L);
      if (w === 11) head[4] = L(H.qtyAlt);                               // trap 3: a renamed column
      if (w === 7) head.splice(5, 0, L(H.notes));                       // trap 2: an extra column in the middle
      const body = [];
      for (const x of all.filter((x) => x.week === w)) {
        let date = { d: SERIAL0 + x.day };
        if (w === 9) { const dt = new Date(DAY0 + x.day * 864e5); date = pad(dt.getUTCDate()) + "/" + pad(dt.getUTCMonth() + 1) + "/2026"; }   // trap 4: dates typed as text
        let ln = x.ln;
        if (w === 5 && ln === "L04") ln = "L04 ";                         // trap 6: a stray space
        if (w === 6 && ln === "L03") ln = "l03";                          // trap 6: lower case
        const row = [date, x.wo, ln, x.mc, x.q, x.v];
        if (w === 7) row.splice(5, 0, x.q < 0 ? L(u("مرتجع من الجودة", "back from quality")) : "");
        body.push(row);
      }
      if (w === 4) { body.splice(10, 0, body[9].slice()); body.splice(31, 0, body[30].slice()); }   // trap 5: two batches entered twice
      if (w === 2) { const vi = head.length - 1; body.push([null, null, L(H.total), null, body.reduce((s, r) => s + r[4], 0), body.reduce((s, r) => s + r[vi], 0)]); }   // trap 1: a totals row at the bottom
      files.push({ path: `Production_2026_Q1/Week_${pad(w)}.xlsx`, sheets: [{ name: "Production", rows: [head, ...body] }] });
    }
    const mod = MD.map((m) => [m[0], L(m[1]), L(CAT[m[2]]), m[3]]);
    mod.splice(8, 0, ["M108", L(MD[7][1]), L(CAT.l), 12900]);            // trap 8: one code listed twice, with two standard costs
    files.push({ path: "Masters.xlsx", sheets: [
      { name: "Lines", rows: [H.lines.map(L), ...LN.map((b) => [b[0], L(b[1]), L(b[2])])] },
      { name: "Models", rows: [H.models.map(L), ...mod] },
    ] });
    const pl = [];
    for (const [code] of LN) for (let m = 1; m <= 3; m++) {
      if (code === "L06" && m === 3) continue;                           // trap 9: a line with no plan for March
      const actual = all.filter((x) => x.ln === code && monthOf(x.day) === m).reduce((s, x) => s + x.q, 0);
      const f = [1.08, 0.94, 1.02, 1.12, 0.97, 1.05][Number(code.slice(1)) - 1] + (m - 2) * 0.03;
      pl.push([code, "2026-" + pad(m), Math.round((actual * f) / 100) * 100]);
    }
    files.push({ path: "Plan_2026_Q1.xlsx", sheets: [{ name: "Plan", rows: [H.plan.map(L), ...pl] }] });
    return files;
  }
  const n = (x) => Number(x).toLocaleString("en-US");
  const rowsAr = (k) => (k >= 3 && k <= 10 ? "صفوف" : "صف");

  /* README.txt: the data dictionary — exactly the description a Prompt needs */
  function readme(lang) {
    const L = (x) => x[lang] || x.en, T = (ar, en) => (lang === "ar" ? ar : en);
    return [
      T("حقيبة بيانات تدريبية: أتمتة إكسل (الوحدة ٢)", "Training data kit: Excel automation (unit 2)"),
      T("خطوط إنتاج مصنع تلفزيونات: ٦ خطوط في ٣ عنابر، ١٢ موديل، الربع الأول ٢٠٢٦. كل الأرقام توضيحية.", "The production lines of a television factory: 6 lines in 3 halls, 12 models, Q1 2026. Every figure is illustrative."),
      "",
      T("الملفات", "Files"),
      T("- Production_2026_Q1/Week_01.xlsx … Week_13.xlsx: شيت اسمه Production، صف عناوين واحد، صف لكل دفعة إنتاج.", "- Production_2026_Q1/Week_01.xlsx … Week_13.xlsx: one sheet named Production, one header row, one row per production batch."),
      "  " + H.prod.map(L).join(" | "),
      T("  التاريخ: تاريخ · رقم أمر التشغيل: نص WO-00001 · الأكواد: نص · الكمية: عدد الأجهزة السليمة (السالب = وحدات رجعت من الجودة) · القيمة: بالجنيه = الكمية × التكلفة المعيارية", "  Date: date · WorkOrder: text WO-00001 · codes: text · Qty: good units (negative = units sent back by quality) · Value: EGP = Qty × standard cost"),
      T("- Masters.xlsx: شيت Lines (", "- Masters.xlsx: sheet Lines (") + H.lines.map(L).join(" | ") + T(") وشيت Models (", ") and sheet Models (") + H.models.map(L).join(" | ") + ")",
      T("- Plan_2026_Q1.xlsx: شيت Plan (", "- Plan_2026_Q1.xlsx: sheet Plan (") + H.plan.map(L).join(" | ") + T(")، الخطة بعدد الأجهزة، والشهر نص بالشكل 2026-01.", "), the plan in units, the month as text like 2026-01."),
      "",
      T("مهم", "Important"),
      T("- في الملفات مشاكل متعمّدة زي اللي بتقابلها في الشغل. ما تقولهاش للنموذج: الأداة الكويسة هي اللي تكتشفها أو توقف عندها.", "- The files hold deliberate problems like the ones you meet at work. Don't tell the model: a good tool is one that finds them or stops at them."),
      T("- اشتغل دايمًا على نسخة من الفولدر، وسيب الأصل زي ما هو.", "- Always work on a copy of the folder and leave the original as it is."),
      T("- قارن نتيجة الأداة بملف Answer_key.txt بعد التشغيل، مش قبله.", "- Compare the tool's result with Answer_key.txt after the run, not before."),
    ].join("\r\n") + "\r\n";
  }

  /* Answer_key.txt: what a correct run must find, computed from the true rows */
  function answerKey(lang) {
    const L = (x) => x[lang] || x.en, T = (ar, en) => (lang === "ar" ? ar : en), E = A.xlSample.expected, all = truth();
    const pl = build(lang).at(-1).sheets[0].rows.slice(1), lines = [];
    lines.push(T("مفتاح الإجابة — راجعه بعد التشغيل", "Answer key — check it after the run"), "");
    lines.push(T(`- ملفات الأسابيع: ${E.files} · صفوف بيانات اتقرت: ${n(E.rowsRead)} · صف إجمالي اتساب: ${E.totalsRowSkipped} (Week_02)`, `- Weekly files: ${E.files} · data rows read: ${n(E.rowsRead)} · totals row skipped: ${E.totalsRowSkipped} (Week_02)`));
    lines.push(T(`- متكرر بالظبط: ${E.duplicates} (Week_04) · الصفوف بعد حذفهم: ${n(E.rowsClean)} · تصحيحات من الجودة بالسالب: ${E.returns}`, `- Exact duplicates: ${E.duplicates} (Week_04) · rows after removing them: ${n(E.rowsClean)} · negative corrections from quality: ${E.returns}`));
    lines.push(T(`- صافي إنتاج الربع: ${n(E.units)} جهاز · قيمته بالتكلفة المعيارية: ${n(E.value)} جنيه`, `- Net output for the quarter: ${n(E.units)} units · at standard cost: EGP ${n(E.value)}`));
    lines.push(T(`- تواريخ كنص: ${E.textDates} ${rowsAr(E.textDates)} (Week_09) · «L04 » بمسافة: ${E.spacedLine} ${rowsAr(E.spacedLine)} (Week_05) · «l03»: ${E.lowerLine} ${rowsAr(E.lowerLine)} (Week_06)`, `- Dates as text: ${E.textDates} rows (Week_09) · “L04 ” with a space: ${E.spacedLine} rows (Week_05) · “l03”: ${E.lowerLine} rows (Week_06)`));
    lines.push(T(`- ما اتربطش: ${E.unmatched.code} في ${E.unmatched.rows} ${rowsAr(E.unmatched.rows)}، ${n(E.unmatched.units)} جهاز، قيمتهم ${n(E.unmatched.value)} جنيه · M108 مكرر في شيت الموديلات (12300 و12900)`, `- Unmatched: ${E.unmatched.code} on ${E.unmatched.rows} rows, ${n(E.unmatched.units)} units worth EGP ${n(E.unmatched.value)} · M108 listed twice in Models (12300 and 12900)`));
    lines.push("", T("الإنتاج والخطة لكل خط وشهر (بعدد الأجهزة)", "Output and plan per line and month (units)"));
    for (const [code, name] of LN) for (let m = 1; m <= 3; m++) {
      const s = all.filter((x) => x.ln === code && monthOf(x.day) === m).reduce((a, x) => a + x.q, 0), t = pl.find((r) => r[0] === code && r[1] === "2026-0" + m);
      lines.push(`  ${code} ${L(name)} 2026-0${m}: ${n(s)} / ${t ? n(t[2]) + " = " + ((s / t[2]) * 100).toFixed(1) + "%" : T("مفيش خطة", "no plan")}`);
    }
    return lines.join("\r\n") + "\r\n";
  }

  A.xlSample = {
    folder: "Excel_Automation_Kit", serial0: SERIAL0, build, truth, monthOf, readme, answerKey, headers: H,
    lines: LN.map((b) => b[0]), models: MD.map((p) => p[0]),
    /* what a correct run finds (data.test.mjs recomputes every figure from the files) */
    expected: {
      files: 13, rowsRead: 1290, totalsRowSkipped: 1, duplicates: 2, rowsClean: 1288, returns: 14, units: 29304, value: 275234900,
      unmatched: { code: "M113", rows: 23, units: 407, value: 5616600 }, spacedLine: 18, lowerLine: 19, textDates: 98, week11Rows: 104,
      plans: 17, missingPlan: { line: "L06", month: "2026-03" },
      best: { line: "L02", month: "2026-01", pct: 111.1 }, worst: { line: "L04", month: "2026-03", pct: 85.1 },
    },
    traps: [
      { id: 1, tool: "stack", file: "Week_02", t: u("صف «الإجمالي» في آخر الشيت", "A “Total” row at the bottom of the sheet"), d: u("لو اتجمّع مع الصفوف، إنتاج الأسبوع هيتحسب مرتين.", "Stacked with the rows, the week's output counts twice.") },
      { id: 2, tool: "stack", file: "Week_07", t: u("عمود «ملاحظات» زيادة في النص", "An extra “Notes” column in the middle"), d: u("الربط بترتيب الأعمدة هيحط الملاحظات مكان القيمة؛ لازم الربط باسم العمود.", "Matching columns by position puts the notes where the value belongs; match by column name.") },
      { id: 3, tool: "stack", file: "Week_11", t: u("عمود «الكمية» مكتوب «الكميه»", "The “Qty” column is titled “Quantity”"), d: u("الأداة الصح بتوقف وتسمّي الملف والعمود، وإنت تقرر القاعدة.", "A good tool stops and names the file and the column; you decide the rule.") },
      { id: 4, tool: "stack", file: "Week_09", t: u("التواريخ مكتوبة كنص (يوم/شهر/سنة)", "Dates typed as text (day/month/year)"), d: u("لازم تتحوّل لتاريخ حقيقي، والنموذج لازم يسألك: اليوم الأول ولا الشهر؟", "They must become real dates, and the model must ask: day first or month first?") },
      { id: 5, tool: "stack", file: "Week_04", t: u("دفعتين متسجّلين مرتين", "Two batches entered twice"), d: u("نفس رقم أمر التشغيل مرتين. الأداة تبلّغ عنهم، وإنت توافق على الحذف.", "The same work order twice. The tool reports them; you approve removing them.") },
      { id: 6, tool: "lookup", file: "Week_05, Week_06", t: u("«L04 » بمسافة، و«l03» بحروف صغيرة", "“L04 ” with a space, and “l03” in lower case"), d: u("من غير تظبيط الأكواد، الخط هيظهر كأنه خطّين.", "Without normalising codes, one line shows up as two.") },
      { id: 7, tool: "lookup", file: "Week_10 … Week_13", t: u("موديل جديد M113 مش في شيت الموديلات", "A new model, M113, missing from the models sheet"), d: u("يظهر في شيت «ما اتربطش»، وإنتاجه يفضل محسوب للخط.", "It belongs on the “Unmatched” sheet, and its output still counts for the line.") },
      { id: 8, tool: "lookup", file: "Masters.xlsx", t: u("الموديل M108 متسجّل مرتين بتكلفتين", "Model M108 listed twice, with two standard costs"), d: u("الأداة لازم توقف وتسألك أنهي تكلفة، مش تاخد أول واحدة وتسكت.", "The tool must stop and ask which cost, not take the first and stay silent.") },
      { id: 9, tool: "report", file: "Plan_2026_Q1.xlsx", t: u("خط ٦ من غير خطة لشهر مارس", "Line 6 has no plan for March"), d: u("التقرير يكتب «مفيش خطة»، مش صفر ولا قسمة على صفر.", "The report writes “no plan”, not zero and not a division by zero.") },
      { id: 10, tool: "report", file: "Week_01 … Week_13", t: u("تصحيحات بكمية سالبة من الجودة", "Negative corrections from quality"), d: u("وحدات رجعت من الجودة بتتخصم من صافي الإنتاج؛ متتحذفش.", "Units sent back by quality reduce net output; never delete them.") },
    ],
  };
})(window.ACADEMY = window.ACADEMY || {});
