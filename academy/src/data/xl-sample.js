/* The unit-2 sample data kit: one invented distribution company, one quarter (Q1 2026), every file the three tools
   of lesson f8 work on. A seeded generator builds the same rows every time, so the figures quoted in the lessons and the
   answer key never drift (data.test.mjs recomputes them from the files, the way a correct tool would).
   Ten problems are planted on purpose («الفخاخ»): each lesson of the unit meets some of them. The kit is offered in the
   reader's language (headers, names); codes, file names, sheet names and every figure are the same in both.
   Everything is illustrative: no real company, branch or price. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  const BR = [   // code, name, region
    ["BR01", u("مدينة نصر", "Nasr City"), u("القاهرة", "Cairo"), 6],
    ["BR02", u("الدقي", "Dokki"), u("الجيزة", "Giza"), 5],
    ["BR03", u("سموحة", "Smouha"), u("الإسكندرية", "Alexandria"), 5],
    ["BR04", u("طنطا", "Tanta"), u("الدلتا", "Delta"), 4],
    ["BR05", u("المنصورة", "Mansoura"), u("الدلتا", "Delta"), 4],
    ["BR06", u("أسيوط", "Assiut"), u("الصعيد", "Upper Egypt"), 3],
  ];
  const CAT = { ac: u("تكييف", "Air conditioning"), fr: u("ثلاجات", "Refrigeration"), wa: u("غسالات", "Washers"), ki: u("أجهزة مطبخ", "Kitchen"), sm: u("أجهزة صغيرة", "Small appliances") };
  const PR = [   // code, name, category, unit price (EGP, illustrative), max quantity per invoice line
    ["P101", u("تكييف 1.5 حصان", "Air conditioner 1.5 HP"), "ac", 21500, 2],
    ["P102", u("تكييف 2.25 حصان", "Air conditioner 2.25 HP"), "ac", 28900, 2],
    ["P103", u("ثلاجة 14 قدم", "Refrigerator 14 ft"), "fr", 17800, 2],
    ["P104", u("ثلاجة 18 قدم", "Refrigerator 18 ft"), "fr", 24600, 2],
    ["P105", u("ديب فريزر", "Chest freezer"), "fr", 13900, 2],
    ["P106", u("غسالة 8 كيلو", "Washer 8 kg"), "wa", 15400, 2],
    ["P107", u("غسالة 10 كيلو", "Washer 10 kg"), "wa", 19700, 2],
    ["P108", u("بوتاجاز 5 شعلة", "Gas cooker 5 burners"), "ki", 11200, 3],
    ["P109", u("ميكروويف", "Microwave"), "ki", 4300, 3],
    ["P110", u("خلاط", "Blender"), "sm", 1650, 6],
    ["P111", u("مكواة بخار", "Steam iron"), "sm", 1250, 6],
    ["P112", u("مكنسة كهربا", "Vacuum cleaner"), "sm", 3900, 4],
  ];
  const NEW = ["P113", 6800];   // a water heater, sold from week 10, not yet in the products sheet (trap 7)
  const H = {   // headers
    sales: [u("التاريخ", "Date"), u("رقم الفاتورة", "InvoiceNo"), u("كود الفرع", "BranchCode"), u("كود الصنف", "ProductCode"), u("الكمية", "Qty"), u("القيمة", "Value")],
    qtyAlt: u("الكميه", "Quantity"), notes: u("ملاحظات", "Notes"), total: u("الإجمالي", "Total"),
    branches: [u("كود الفرع", "BranchCode"), u("اسم الفرع", "BranchName"), u("المنطقة", "Region")],
    products: [u("كود الصنف", "ProductCode"), u("اسم الصنف", "ProductName"), u("الفئة", "Category"), u("سعر الوحدة", "UnitPrice")],
    targets: [u("كود الفرع", "BranchCode"), u("الشهر", "Month"), u("الهدف", "Target")],
  };

  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const DAY0 = Date.UTC(2026, 0, 1), SERIAL0 = Math.round((DAY0 - Date.UTC(1899, 11, 30)) / 864e5);   // Excel's day number for 1 Jan 2026

  /* the true sales of the quarter: one row per invoice line, in date order */
  function truth() {
    const r = rng(20260101), rows = [];
    let inv = 0;
    for (let d = 0; d < 90; d++) {
      const date = new Date(DAY0 + d * 864e5);
      if (date.getUTCDay() === 5) continue;   // Friday: branches closed
      for (const [code, , , size] of BR) {
        const n = 1 + Math.floor(r() * size);
        for (let k = 0; k < n; k++) {
          let p = PR[Math.floor(r() * PR.length)], price = p[3], pc = p[0];
          if (d >= 63 && r() < 0.06) { pc = NEW[0]; price = NEW[1]; }
          let q = 1 + Math.floor(r() * p[4]);
          if (r() < 0.012) q = -1;   // a return: legitimate, counts against net sales
          rows.push({ day: d, week: Math.floor(d / 7) + 1, inv: "INV-" + String(++inv).padStart(5, "0"), br: code, pc, q, v: q * price });
        }
      }
    }
    return rows;
  }

  /* the files as the branches really send them, with the planted problems */
  function build(lang) {
    const L = (x) => x[lang] || x.en;
    const all = truth(), files = [];
    const pad = (n) => String(n).padStart(2, "0");
    for (let w = 1; w <= 13; w++) {
      const head = H.sales.map(L);
      if (w === 11) head[4] = L(H.qtyAlt);                               // trap 3: a renamed column
      if (w === 7) head.splice(5, 0, L(H.notes));                       // trap 2: an extra column in the middle
      const body = [];
      for (const x of all.filter((x) => x.week === w)) {
        let date = { d: SERIAL0 + x.day };
        if (w === 9) { const dt = new Date(DAY0 + x.day * 864e5); date = pad(dt.getUTCDate()) + "/" + pad(dt.getUTCMonth() + 1) + "/2026"; }   // trap 4: dates typed as text
        let br = x.br;
        if (w === 5 && br === "BR04") br = "BR04 ";                       // trap 6: a stray space
        if (w === 6 && br === "BR03") br = "br03";                        // trap 6: lower case
        const row = [date, x.inv, br, x.pc, x.q, x.v];
        if (w === 7) row.splice(5, 0, x.q < 0 ? L(u("مرتجع", "return")) : "");
        body.push(row);
      }
      if (w === 4) { body.splice(10, 0, body[9].slice()); body.splice(31, 0, body[30].slice()); }   // trap 5: two rows entered twice
      if (w === 2) { const vi = head.length - 1; body.push([null, null, L(H.total), null, body.reduce((s, r) => s + r[4], 0), body.reduce((s, r) => s + r[vi], 0)]); }   // trap 1: a totals row at the bottom
      files.push({ path: `Sales_2026_Q1/Week_${pad(w)}.xlsx`, sheets: [{ name: "Sales", rows: [head, ...body] }] });
    }
    const prod = PR.map((p) => [p[0], L(p[1]), L(CAT[p[2]]), p[3]]);
    prod.splice(8, 0, ["P108", L(PR[7][1]), L(CAT.ki), 11900]);           // trap 8: one code listed twice, with two prices
    files.push({ path: "Masters.xlsx", sheets: [
      { name: "Branches", rows: [H.branches.map(L), ...BR.map((b) => [b[0], L(b[1]), L(b[2])])] },
      { name: "Products", rows: [H.products.map(L), ...prod] },
    ] });
    const tg = [];
    for (const [code] of BR) for (let m = 1; m <= 3; m++) {
      if (code === "BR06" && m === 3) continue;                          // trap 9: a branch with no target for March
      const actual = all.filter((x) => x.br === code && monthOf(x.day) === m).reduce((s, x) => s + x.v, 0);
      const f = [1.08, 0.94, 1.02, 1.12, 0.97, 1.05][Number(code.slice(3)) - 1] + (m - 2) * 0.03;
      tg.push([code, "2026-" + pad(m), Math.round((actual * f) / 50000) * 50000]);
    }
    files.push({ path: "Targets_2026_Q1.xlsx", sheets: [{ name: "Targets", rows: [H.targets.map(L), ...tg] }] });
    return files;
  }
  const monthOf = (day) => (day < 31 ? 1 : day < 59 ? 2 : 3);
  const n = (x) => Number(x).toLocaleString("en-US");
  const rowsAr = (k) => (k >= 3 && k <= 10 ? "صفوف" : "صف");

  /* README.txt: the data dictionary — exactly the description a Prompt needs, and safe to paste anywhere */
  function readme(lang) {
    const L = (x) => x[lang] || x.en, T = (ar, en) => (lang === "ar" ? ar : en);
    return [
      T("حقيبة بيانات تدريبية: أتمتة إكسل (الوحدة ٢)", "Training data kit: Excel automation (unit 2)"),
      T("شركة توزيع أجهزة منزلية متخيّلة، ٦ فروع، الربع الأول ٢٠٢٦. كل الأسماء والأرقام توضيحية.", "An invented home-appliance distributor, 6 branches, Q1 2026. Every name and figure is illustrative."),
      "",
      T("الملفات", "Files"),
      T("- Sales_2026_Q1/Week_01.xlsx … Week_13.xlsx: شيت اسمه Sales، صف عناوين واحد، صف لكل سطر فاتورة.", "- Sales_2026_Q1/Week_01.xlsx … Week_13.xlsx: one sheet named Sales, one header row, one row per invoice line."),
      "  " + H.sales.map(L).join(" | "),
      T("  التاريخ: تاريخ · رقم الفاتورة: نص INV-00001 · الكود: نص · الكمية: رقم صحيح (السالب = مرتجع) · القيمة: بالجنيه = الكمية × سعر الوحدة", "  Date: date · InvoiceNo: text INV-00001 · codes: text · Qty: whole number (negative = a return) · Value: EGP = Qty × unit price"),
      T("- Masters.xlsx: شيت Branches (", "- Masters.xlsx: sheet Branches (") + H.branches.map(L).join(" | ") + T(") وشيت Products (", ") and sheet Products (") + H.products.map(L).join(" | ") + ")",
      T("- Targets_2026_Q1.xlsx: شيت Targets (", "- Targets_2026_Q1.xlsx: sheet Targets (") + H.targets.map(L).join(" | ") + T(")، الشهر نص بالشكل 2026-01.", "), the month as text like 2026-01."),
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
    const tg = build(lang).at(-1).sheets[0].rows.slice(1), lines = [];
    lines.push(T("مفتاح الإجابة — راجعه بعد التشغيل", "Answer key — check it after the run"), "");
    lines.push(T(`- ملفات الأسابيع: ${E.files} · صفوف بيانات اتقرت: ${n(E.rowsRead)} · صف إجمالي اتساب: ${E.totalsRowSkipped} (Week_02)`, `- Weekly files: ${E.files} · data rows read: ${n(E.rowsRead)} · totals row skipped: ${E.totalsRowSkipped} (Week_02)`));
    lines.push(T(`- متكرر بالظبط: ${E.duplicates} (Week_04) · الصفوف بعد حذفهم: ${n(E.rowsClean)} · مرتجعات: ${E.returns}`, `- Exact duplicates: ${E.duplicates} (Week_04) · rows after removing them: ${n(E.rowsClean)} · returns: ${E.returns}`));
    lines.push(T(`- صافي مبيعات الربع: ${n(E.value)} جنيه`, `- Net sales for the quarter: EGP ${n(E.value)}`));
    lines.push(T(`- تواريخ كنص: ${E.textDates} ${rowsAr(E.textDates)} (Week_09) · «BR04 » بمسافة: ${E.spacedBranch} ${rowsAr(E.spacedBranch)} (Week_05) · «br03»: ${E.lowerBranch} ${rowsAr(E.lowerBranch)} (Week_06)`, `- Dates as text: ${E.textDates} rows (Week_09) · “BR04 ” with a space: ${E.spacedBranch} rows (Week_05) · “br03”: ${E.lowerBranch} rows (Week_06)`));
    lines.push(T(`- ما اتربطش: ${E.unmatched.code} في ${E.unmatched.rows} ${rowsAr(E.unmatched.rows)}، قيمتهم ${n(E.unmatched.value)} جنيه · P108 مكرر في شيت الأصناف (11200 و11900)`, `- Unmatched: ${E.unmatched.code} on ${E.unmatched.rows} rows worth EGP ${n(E.unmatched.value)} · P108 listed twice in Products (11200 and 11900)`));
    lines.push("", T("المبيعات والهدف لكل فرع وشهر", "Sales and target per branch and month"));
    for (const [code, name] of BR) for (let m = 1; m <= 3; m++) {
      const s = all.filter((x) => x.br === code && monthOf(x.day) === m).reduce((a, x) => a + x.v, 0), t = tg.find((r) => r[0] === code && r[1] === "2026-0" + m);
      lines.push(`  ${code} ${L(name)} 2026-0${m}: ${n(s)} / ${t ? n(t[2]) + " = " + ((s / t[2]) * 100).toFixed(1) + "%" : T("مفيش هدف", "no target")}`);
    }
    return lines.join("\r\n") + "\r\n";
  }

  A.xlSample = {
    folder: "Excel_Automation_Kit", serial0: SERIAL0, build, truth, monthOf, readme, answerKey, headers: H,
    branches: BR.map((b) => b[0]), products: PR.map((p) => p[0]),
    /* what a correct run finds (data.test.mjs recomputes every figure from the files) */
    expected: {
      files: 13, rowsRead: 1304, totalsRowSkipped: 1, duplicates: 2, rowsClean: 1302, returns: 16, value: 28428150,
      unmatched: { code: "P113", rows: 20, value: 292400 }, spacedBranch: 9, lowerBranch: 17, textDates: 99, week11Rows: 116,
      targets: 17, missingTarget: { br: "BR06", month: "2026-03" },
      best: { br: "BR02", month: "2026-01", pct: 111.6 }, worst: { br: "BR04", month: "2026-02", pct: 87.9 },
    },
    traps: [
      { id: 1, tool: "stack", file: "Week_02", t: u("صف «الإجمالي» في آخر الشيت", "A “Total” row at the bottom of the sheet"), d: u("لو اتجمّع مع الصفوف، مبيعات الأسبوع هتتحسب مرتين.", "Stacked with the rows, the week's sales count twice.") },
      { id: 2, tool: "stack", file: "Week_07", t: u("عمود «ملاحظات» زيادة في النص", "An extra “Notes” column in the middle"), d: u("الربط بترتيب الأعمدة هيحط الملاحظات مكان القيمة؛ لازم الربط باسم العمود.", "Matching columns by position puts the notes where the value belongs; match by column name.") },
      { id: 3, tool: "stack", file: "Week_11", t: u("عمود «الكمية» مكتوب «الكميه»", "The “Qty” column is titled “Quantity”"), d: u("الأداة الصح بتوقف وتسمّي الملف والعمود، وإنت تقرر القاعدة.", "A good tool stops and names the file and the column; you decide the rule.") },
      { id: 4, tool: "stack", file: "Week_09", t: u("التواريخ مكتوبة كنص (يوم/شهر/سنة)", "Dates typed as text (day/month/year)"), d: u("لازم تتحوّل لتاريخ حقيقي، والنموذج لازم يسألك: اليوم الأول ولا الشهر؟", "They must become real dates, and the model must ask: day first or month first?") },
      { id: 5, tool: "stack", file: "Week_04", t: u("صفّين متكررين بالظبط", "Two rows entered twice"), d: u("نفس رقم الفاتورة مرتين. الأداة تبلّغ عنهم، وإنت توافق على الحذف.", "The same invoice number twice. The tool reports them; you approve removing them.") },
      { id: 6, tool: "lookup", file: "Week_05, Week_06", t: u("«BR04 » بمسافة، و«br03» بحروف صغيرة", "“BR04 ” with a space, and “br03” in lower case"), d: u("من غير تظبيط الأكواد، الفرع هيظهر كأنه فرعين.", "Without normalising codes, one branch shows up as two.") },
      { id: 7, tool: "lookup", file: "Week_10 … Week_13", t: u("صنف جديد P113 مش في شيت الأصناف", "A new product, P113, missing from the products sheet"), d: u("يظهر في شيت «ما اتربطش»، ومبيعاته تفضل محسوبة للفرع.", "It belongs on the “Unmatched” sheet, and its sales still count for the branch.") },
      { id: 8, tool: "lookup", file: "Masters.xlsx", t: u("الصنف P108 متسجّل مرتين بسعرين", "Product P108 listed twice, with two prices"), d: u("الأداة لازم توقف وتسألك أنهي سعر، مش تاخد أول واحد وتسكت.", "The tool must stop and ask which price, not take the first and stay silent.") },
      { id: 9, tool: "report", file: "Targets_2026_Q1.xlsx", t: u("فرع أسيوط من غير هدف لشهر مارس", "Assiut has no target for March"), d: u("التقرير يكتب «مفيش هدف»، مش صفر ولا قسمة على صفر.", "The report writes “no target”, not zero and not a division by zero.") },
      { id: 10, tool: "report", file: "Week_01 … Week_13", t: u("مرتجعات بكمية سالبة", "Returns with a negative quantity"), d: u("مرتجعات حقيقية بتتخصم من صافي المبيعات؛ متتحذفش.", "Real returns that reduce net sales; never delete them.") },
    ],
  };
})(window.ACADEMY = window.ACADEMY || {});
