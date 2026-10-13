/* Labs, part B: synchronized dashboard, explicit-failure pipeline, agent loop with limits, digital team patterns,
   model cost calculator, local model fit, Git simulator, manual-process-to-system. */
"use strict";
(function () {
  const App = ACAD.App; const { h, t, tr, L, T } = App;
  const why = App.labWhy, range = App.labRange, select = App.labSelect;
  const NS = "http://www.w3.org/2000/svg";

  /* ===== 8. Dashboard with synchronized filters ===== */
  function salesData() {
    const r = App.rng(42); const regions = ["north", "south", "east", "west"], prods = ["A", "B", "C"]; const out = [];
    for (let m = 1; m <= 12; m++) for (const g of regions) for (const p of prods) {
      const base = { A: 120, B: 80, C: 45 }[p] * { north: 1.2, south: 0.8, east: 1, west: 0.9 }[g];
      const season = 1 + 0.25 * Math.sin((m / 12) * Math.PI * 2) + (g === "south" && m >= 8 ? -0.28 : 0);
      const units = Math.round(base * season * (0.85 + r() * 0.3));
      const price = { A: 150, B: 220, C: 480 }[p]; const cost = { A: 95, B: 150, C: 300 }[p];
      out.push({ m, g, p, units, sales: units * price, profit: units * (price - cost) });
    }
    return out;
  }
  const RG = { north: L("الشمال", "North"), south: L("الجنوب", "South"), east: L("الشرق", "East"), west: L("الغرب", "West") };
  ACAD.labs.dashboard = {
    icon: "📊", lesson: "u3-stages", pages: [24, 25, 28],
    title: L("مختبر: لوحة معلومات بفلاتر متزامنة", "Lab: a dashboard with synchronized filters"),
    intro: L("بيانات مبيعات **افتراضية** لسنة كاملة (٤ مناطق × ٣ منتجات). غيّر أي فلتر: البطاقات والرسمين والجدول بيتحدثوا مع بعض من نفس مصدر البيانات (المرحلة ٥ في الكتاب). ورتّب الجدول بالضغط على العناوين.", "A full year of **fictional** sales (4 regions × 3 products). Change any filter: the cards, both charts and the table update together from the same data source (stage 5 in the book). Sort the table by clicking headers."),
    lessonLearned: L("اللوحة بتتحول من تقرير ثابت لأداة استكشاف لما المستخدم يقدر يقطّع البيانات بنفسه، بشرط إن كل العناصر تتحدث **مع بعض** من مصدر واحد {p24}.", "A dashboard turns from a static report into an exploration tool when users slice the data themselves — provided all elements update **together** from one source {p24}."),
    build({ inEl, outEl, whyEl }) {
      const D = salesData(); const f = { from: 1, to: 12, p: "", g: "" }; let sort = { k: "sales", d: -1 };
      const months = App.isAr() ? ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      inEl.append(range(T("📅 من شهر", "📅 From month"), 1, 12, 1, 1, (v) => { f.from = Math.min(v, f.to); draw(); }, (v) => months[v - 1]), range(T("📅 إلى شهر", "📅 To month"), 1, 12, 1, 12, (v) => { f.to = Math.max(v, f.from); draw(); }, (v) => months[v - 1]),
        select(T("📦 المنتج", "📦 Product"), [["", t("all")], ["A", "A"], ["B", "B"], ["C", "C"]], "", (v) => { f.p = v; draw(); }),
        select(T("🗺️ المنطقة", "🗺️ Region"), [["", t("all")], ...Object.keys(RG).map((k) => [k, tr(RG[k])])], "", (v) => { f.g = v; draw(); }),
        h("div", { class: "callout", style: { fontSize: "13.5px" } }, T("🕵️ تحدّي: اكتشف المنطقة اللي مبيعاتها وقعت في آخر السنة، ومن إمتى بدأ الانخفاض؟", "🕵️ Challenge: find the region whose sales fell late in the year — and when did the drop start?")));
      const fmt = (n) => App.num(Math.round(n));
      const draw = () => {
        const rows = D.filter((r) => r.m >= f.from && r.m <= f.to && (!f.p || r.p === f.p) && (!f.g || r.g === f.g));
        if (!rows.length) { outEl.replaceChildren(h("div", { class: "empty" }, h("div", { class: "big" }, "🫙"), T("مفيش بيانات للفترة دي. (ده اختبار الحالة الحدّية في الكتاب: «فترة بلا بيانات» {p30})", "No data for this period. (This is the book’s edge-case test: “a period with no data”)").replace(" {p30}", ""))); return; }
        const sum = (k, arr = rows) => arr.reduce((a, r) => a + r[k], 0);
        const byM = {}; rows.forEach((r) => (byM[r.m] = (byM[r.m] || 0) + r.sales));
        const byG = {}; rows.forEach((r) => (byG[r.g] = (byG[r.g] || 0) + r.sales));
        const best = Object.entries(byG).sort((a, b) => b[1] - a[1])[0];
        // line chart
        const W = 520, H = 170, P = 26; const ms = Object.keys(byM).map(Number).sort((a, b) => a - b); const mx = Math.max(...Object.values(byM)) * 1.1;
        const xs = (m) => P + ((m - ms[0]) / Math.max(1, ms[ms.length - 1] - ms[0])) * (W - 2 * P); const ys = (v) => H - P - (v / mx) * (H - 2 * P);
        const svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.setAttribute("role", "img"); svg.setAttribute("aria-label", T("اتجاه المبيعات الشهري", "Monthly sales trend")); svg.style.width = "100%"; svg.style.direction = "ltr";
        const pts = ms.map((m) => `${xs(m)},${ys(byM[m])}`).join(" ");
        svg.innerHTML = `<line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="var(--line-2)"/><polyline points="${P},${H - P} ${pts} ${W - P},${H - P}" fill="var(--accent-soft)" stroke="none" opacity=".7"/><polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linejoin="round"/>` + ms.map((m) => `<circle cx="${xs(m)}" cy="${ys(byM[m])}" r="4" fill="var(--accent)"><title>${months[m - 1]}: ${fmt(byM[m])}</title></circle><text x="${xs(m)}" y="${H - 8}" text-anchor="middle" font-size="10" fill="var(--ink-3)">${months[m - 1].slice(0, 3)}</text>`).join("");
        const maxG = Math.max(...Object.values(byG));
        const sorted = Object.values(rows.reduce((acc, r) => { const k = r.g + r.p; acc[k] = acc[k] || { g: r.g, p: r.p, units: 0, sales: 0, profit: 0 }; acc[k].units += r.units; acc[k].sales += r.sales; acc[k].profit += r.profit; return acc; }, {})).sort((a, b) => (a[sort.k] > b[sort.k] ? 1 : -1) * sort.d);
        const th = (k, l) => h("th", { style: { cursor: "pointer" }, "aria-sort": sort.k === k ? (sort.d > 0 ? "ascending" : "descending") : "none", tabindex: 0, onclick: () => { sort = { k, d: sort.k === k ? -sort.d : -1 }; draw(); }, onkeydown: (e) => { if (e.key === "Enter") { sort = { k, d: sort.k === k ? -sort.d : -1 }; draw(); } } }, l + (sort.k === k ? (sort.d > 0 ? " ▲" : " ▼") : ""));
        outEl.replaceChildren(
          h("div", { class: "kpis" }, h("div", { class: "kpi" }, h("small", null, T("المبيعات", "Sales")), h("b", null, fmt(sum("sales")))), h("div", { class: "kpi" }, h("small", null, T("هامش الربح", "Margin")), h("b", null, App.pct(Math.round((sum("profit") / sum("sales")) * 100)))), h("div", { class: "kpi" }, h("small", null, T("الوحدات", "Units")), h("b", null, fmt(sum("units")))), h("div", { class: "kpi" }, h("small", null, T("أفضل منطقة", "Best region")), h("b", { style: { fontSize: "18px" } }, tr(RG[best[0]])))),
          h("b", null, T("الاتجاه الزمني", "Trend")), svg,
          h("b", { style: { display: "block", marginTop: "8px" } }, T("المقارنة بين المناطق", "Regions compared")), h("div", { class: "bars" }, Object.entries(byG).sort((a, b) => b[1] - a[1]).map(([g, v]) => h("div", { class: "b" }, h("span", null, tr(RG[g])), h("i", { style: { width: (v / maxG) * 100 + "%", background: g === "south" ? "var(--rose)" : "var(--accent)" } }), h("span", null, App.num(Math.round(v / 1000)) + "k")))),
          h("div", { class: "tbl-wrap", style: { marginTop: "8px" } }, h("table", { class: "tbl" }, h("thead", null, h("tr", null, th("g", T("المنطقة", "Region")), th("p", T("المنتج", "Product")), th("units", T("وحدات", "Units")), th("sales", T("مبيعات", "Sales")), th("profit", T("ربح", "Profit")))),
            h("tbody", null, sorted.map((r) => h("tr", null, h("td", null, tr(RG[r.g])), h("td", null, r.p), h("td", null, fmt(r.units)), h("td", null, fmt(r.sales)), h("td", null, fmt(r.profit))))))));
        why(whyEl, T(`كل عنصر بيتحسب من نفس الصفوف المفلترة (${App.num(rows.length)} صف)، فمستحيل البطاقة تقول رقم والجدول يقول رقم تاني. في البيانات دي منطقة الجنوب بتقع من أغسطس، والرسم الزمني لوحده مش هيوريك ده إلا لما تفلتر بالمنطقة: ده سبب وجود الفلاتر.`, `Every element is computed from the same filtered rows (${rows.length}), so a card can never disagree with the table. In this data the South region drops from August, and the trend line alone won’t show it until you filter by region — that is why filters exist.`));
      };
      draw();
    },
  };

  /* ===== 9. Pipeline: explicit failure beats silent success ===== */
  ACAD.labs.pipeline = {
    icon: "🏭", lesson: "u2-level1", pages: [18, 22],
    title: L("مختبر: سلسلة تشغيل بتقف بوضوح لما يحصل غلط", "Lab: a run pipeline that stops clearly on errors"),
    intro: L("اختار الملف اللي «وصل للمجلد»، وشغّل السلسلة. كل خطوة بتفحص قبل ما تكمّل وتكتب في سجل التشغيل. قارن بين «الفشل الصريح» و«النجاح الصامت».", "Pick the file that “arrived in the folder” and run the pipeline. Each step checks before continuing and writes to the run log. Compare “explicit failure” with “silent success”."),
    lessonLearned: L("عند بنية ملف غير متوقعة، التنفيذ يتوقف برسالة واضحة، بدل إنتاج تقرير شكله صح وهو غلط. والسجل يقول: إيه اتقرا، وكام صف، وإيه اتستبعد وليه {p17}.", "On an unexpected file structure, execution stops with a clear message instead of producing a report that looks right but is wrong. And the log says what was read, how many rows, what was excluded and why {p17}."),
    build({ inEl, outEl, whyEl }) {
      let file = "good", mode = "explicit", running = false;
      const files = [["good", T("✅ ملف سليم (١٢٠ صف)", "✅ Valid file (120 rows)")], ["missing", T("❌ عمود «السعر» ناقص", "❌ “price” column missing")], ["dups", T("⚠️ فيه ٨ صفوف مكررة", "⚠️ Contains 8 duplicate rows")], ["empty", T("❌ ملف فاضي", "❌ Empty file")]];
      const STEPS = [T("وصول ملف", "File arrives"), T("فحص البنية", "Check structure"), T("تنظيف ودمج", "Clean & merge"), T("فحص الجودة", "Quality check"), T("حساب المؤشرات", "Compute KPIs"), T("بناء التقرير", "Build report"), T("إشعار المعنيين", "Notify owners")];
      inEl.append(h("div", { class: "lbl", style: { fontWeight: 800, marginBottom: "6px" } }, T("📥 الملف الواصل", "📥 Incoming file")), files.map(([k, l]) => h("label", { class: "check" }, h("input", { type: "radio", name: "pf", checked: k === file, onchange: () => { file = k; draw(); } }), l)),
        select(T("فلسفة التصميم", "Design philosophy"), [["explicit", T("فشل صريح (اللي الكتاب بيطلبه)", "Explicit failure (what the book asks)")], ["silent", T("نجاح صامت (يكمّل مهما حصل)", "Silent success (carries on regardless)")]], mode, (v) => { mode = v; draw(); }),
        h("button", { class: "btn primary", style: { marginTop: "6px" }, onclick: () => run() }, "▶️ " + T("شغّل السلسلة", "Run the pipeline")));
      const chips = STEPS.map((s) => h("span", { class: "pipe" }, s));
      const pipe = h("div", { class: "pipeline" }, chips.flatMap((c, i) => (i ? [h("span", { class: "pipe-arrow" }, App.isAr() ? "←" : "→"), c] : [c])));
      const log = h("div", { class: "log", style: { marginTop: "12px", minHeight: "120px" } });
      const verdict = h("div", { style: { marginTop: "12px" } });
      const draw = () => { chips.forEach((c) => (c.className = "pipe")); log.replaceChildren(h("div", { class: "dim" }, "# run log — " + T("اضغط تشغيل", "press run"))); verdict.replaceChildren(); outEl.replaceChildren(pipe, log, verdict); };
      const line = (cls, msg) => log.append(h("div", { class: cls }, new Date().toTimeString().slice(0, 8) + "  ", h("span", { class: "ar" }, msg)));
      const run = async () => {
        if (running) return; running = true; draw(); log.replaceChildren();
        const wait = (ms) => new Promise((r) => setTimeout(r, App.reduced() ? 0 : ms));
        const plan = { good: { fail: -1 }, missing: { fail: 1, msg: T("العمود «السعر» غير موجود. المتوقع: التاريخ، الفرع، المنتج، الكمية، السعر.", "Column “price” not found. Expected: date, branch, product, qty, price.") }, dups: { warn: 3 }, empty: { fail: 1, msg: T("الملف فاضي (٠ صف). مفيش حاجة تتحسب.", "The file is empty (0 rows). Nothing to compute.") } }[file];
        let rows = file === "empty" ? 0 : 120; let silentWrong = false;
        for (let i = 0; i < STEPS.length; i++) {
          chips[i].className = "pipe run"; await wait(380);
          if (i === plan.fail) {
            if (mode === "explicit") { chips[i].className = "pipe bad"; line("bad", "STOP · " + plan.msg); line("dim", T("لم يتم إنشاء تقرير. الملف الأصلي لم يُمس. تم إشعار صاحب الأداة.", "No report created. Original file untouched. Tool owner notified.")); verdict.replaceChildren(h("div", { class: "verdict ok" }, h("big", null, T("وقفت صح ✅", "Stopped correctly ✅")), T("محدش هياخد قرار على أرقام غلط، والرسالة بتقول بالظبط إيه اللي ناقص.", "Nobody will decide on wrong numbers, and the message says exactly what is missing."))); running = false; return; }
            chips[i].className = "pipe ok"; line("warn", T("(تجاهل صامت) كمّلنا رغم المشكلة…", "(silently ignored) carried on despite the problem…")); silentWrong = true; continue;
          }
          if (i === plan.warn) { if (mode === "explicit") { line("warn", T(`استبعاد ٨ صفوف مكررة (السبب: نفس رقم الفاتورة) · المتبقي ${120 - 8}`, `excluded 8 duplicate rows (reason: same invoice no.) · remaining ${120 - 8}`)); rows = 112; } else { silentWrong = true; line("dim", T("فحص الجودة: تم", "quality check: done")); } }
          else line("ok", [T(`ملف جديد: sales_${file}.xlsx`, `new file: sales_${file}.xlsx`), T(`البنية سليمة · ${rows} صف`, `structure ok · ${rows} rows`), T("توحيد التواريخ والفروع", "dates and branches unified"), T("لا مشاكل جودة", "no quality issues"), T(`المؤشرات محسوبة على ${rows} صف`, `KPIs computed on ${rows} rows`), T("output/report.html محفوظ (الأصلي لم يُعدّل)", "output/report.html saved (original untouched)"), T("تم إرسال الرابط للمعنيين", "link sent to owners")][i]);
          chips[i].className = "pipe ok";
        }
        line("dim", T(`زمن التنفيذ: ٣٫٢ ث · مقروء ${rows} · مستبعد ${120 - rows}`, `run time: 3.2 s · read ${rows} · excluded ${120 - rows}`));
        verdict.replaceChildren(silentWrong ? h("div", { class: "verdict bad" }, h("big", null, T("تقرير شكله سليم… وهو غلط ❌", "A report that looks fine… and is wrong ❌")), T("الإشعار وصل للإدارة والأرقام فيها مشكلة محدش شافها. ده «النجاح الصامت» اللي الكتاب بيحذّر منه.", "The notification reached management with numbers nobody checked. This is the “silent success” the book warns about.")) : h("div", { class: "verdict ok" }, h("big", null, T("تقرير سليم ✅", "A sound report ✅")), T("كل خطوة اتفحصت واتسجلت.", "Every step was checked and logged.")));
        running = false;
      };
      draw();
      why(whyEl, T("كل خطوة بتسأل «هل اللي وصلني زي المتوقع؟» قبل ما تشتغل. في التصميم الصامت، الخطوات بتفترض إن كل حاجة تمام، فالغلط بيعدّي لحد التقرير النهائي. السجل هو اللي بيخليك تعرف بعد شهر ليه رقم معين طلع كده.", "Each step asks “is what I received as expected?” before working. In the silent design, steps assume everything is fine, so the error flows into the final report. The log is what lets you know, a month later, why a number came out the way it did."));
    },
  };

  /* ===== 10. Agent loop with limits and human approval ===== */
  ACAD.labs.agent = {
    icon: "🤖", lesson: "u5-agents", pages: [6, 39, 40],
    title: L("مختبر: وكيل ذكي بيخطط وينفّذ ويصحّح… في حدود", "Lab: an agent that plans, acts and corrects — within limits"),
    intro: L("الوكيل هنا **محاكاة مكتوبة مسبقًا** لدورة الوكيل كما يصفها الكتاب: هدف ← أدوات ← تنفيذ ← رؤية النتيجة ← تصحيح، لحد ما الهدف يتحقق أو يوصل لحد التوقف. غيّر الإعدادات والمشاكل، وشوف سلوكه بيتغير إزاي.", "The agent is a **scripted simulation** of the agent loop the book describes: goal → tools → act → observe → correct, until the goal is met or a stop limit is reached. Change settings and problems and see how its behaviour changes."),
    lessonLearned: L("الوكيل = هدف + أدوات + تكرار. والحوكمة مش رفاهية: أقل صلاحية ممكنة، وسقف للمحاولات والتكلفة، وسجل لكل خطوة، وموافقة بشرية قبل الإرسال {p40}.", "Agent = goal + tools + iteration. Governance is not optional: least privilege, caps on attempts and cost, a log of every step, and human approval before sending {p40}."),
    build({ inEl, outEl, whyEl }) {
      const s = { maxTry: 3, budget: 10, approval: true, toolDb: true, toolSend: true, fault: "none" };
      inEl.append(h("div", { class: "card soft", style: { padding: "10px 12px", marginBottom: "12px" } }, h("b", null, "🎯 " + T("الهدف", "Goal") + ": "), T("جهّز ملخص مبيعات الأسبوع وابعته لمدير المبيعات.", "Prepare this week’s sales summary and send it to the sales manager.")),
        range(T("🔁 أقصى عدد محاولات", "🔁 Max attempts"), 1, 5, 1, s.maxTry, (v) => { s.maxTry = v; }),
        range(T("💰 سقف التكلفة (وحدات)", "💰 Cost cap (units)"), 3, 20, 1, s.budget, (v) => { s.budget = v; }),
        h("div", { class: "lbl", style: { fontWeight: 800, margin: "6px 0" } }, T("🧰 الأدوات المسموحة", "🧰 Allowed tools")),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: true, disabled: true }), T("قراءة ملف (دايمًا)", "Read file (always)")),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: s.toolDb, onchange: (e) => (s.toolDb = e.target.checked) }), T("استعلام قاعدة البيانات", "Query the database")),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: s.toolSend, onchange: (e) => (s.toolSend = e.target.checked) }), T("إرسال بريد", "Send email")),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: s.approval, onchange: (e) => (s.approval = e.target.checked) }), T("الإرسال يحتاج موافقة بشرية", "Sending needs human approval")),
        select(T("⚡ مشكلة في الطريق", "⚡ A problem on the way"), [["none", T("مفيش", "None")], ["missing", T("ملف الأسبوع ناقص يوم", "This week’s file misses a day")], ["conflict", T("رقمين متناقضين بين الملف والقاعدة", "File and database disagree")], ["stuck", T("القاعدة مش بترد", "Database not responding")]], s.fault, (v) => (s.fault = v)),
        h("button", { class: "btn primary", onclick: () => run() }, "▶️ " + T("شغّل الوكيل", "Run the agent")));
      const log = h("div", { class: "log", style: { minHeight: "220px" } }, h("div", { class: "dim" }, "# agent log"));
      const meters = h("div", { class: "kpis" });
      const footer = h("div", { style: { marginTop: "10px" } });
      outEl.append(meters, log, footer);
      let cost = 0, tries = 0;
      const meter = () => meters.replaceChildren(h("div", { class: "kpi" + (tries >= s.maxTry ? " bad" : "") }, h("small", null, T("المحاولات", "Attempts")), h("b", null, App.frac(tries, s.maxTry))), h("div", { class: "kpi" + (cost >= s.budget ? " bad" : "") }, h("small", null, T("التكلفة", "Cost")), h("b", null, App.frac(cost, s.budget))));
      const wait = (ms) => new Promise((r) => setTimeout(r, App.reduced() ? 0 : ms));
      const say = async (cls, tag, msg, c = 1) => { cost += c; meter(); log.append(h("div", { class: cls }, tag.padEnd(8) + " ", h("span", { class: "ar" }, msg))); log.scrollTop = log.scrollHeight; await wait(420); };
      let busy = false;
      const run = async () => {
        if (busy) return; busy = true; cost = 0; tries = 0; log.replaceChildren(); footer.replaceChildren(); meter();
        const over = () => cost >= s.budget || tries >= s.maxTry;
        const stop = async (why) => { await say("bad", "STOP", why, 0); footer.replaceChildren(h("div", { class: "verdict warn" }, h("big", null, T("وقف وسأل الإنسان ✋", "Stopped and asked a human ✋")), why)); busy = false; };
        await say("dim", "PLAN", T("١) أقرأ ملف الأسبوع ٢) أتحقق من الأرقام من القاعدة ٣) أكتب الملخص ٤) أرسله", "1) read the week file 2) verify numbers in the DB 3) write summary 4) send it"));
        tries++; await say("ok", "ACT", T("قراءة sales_week.xlsx", "read sales_week.xlsx"));
        if (s.fault === "missing") {
          await say("warn", "OBSERVE", T("الملف فيه ٦ أيام بس (الخميس ناقص)", "the file has only 6 days (Thursday missing)"));
          while (!over()) { tries++; await say("ok", "RETRY", T("أدوّر على ملف الخميس في مجلد الوارد…", "looking for Thursday’s file in the inbox folder…")); await say("warn", "OBSERVE", T("مش لاقيه", "not found")); }
          return stop(T("بيانات ناقصة بعد " + tries + " محاولات. الوكيل مايخمنش أرقام يوم ناقص.", "Missing data after " + tries + " attempts. The agent does not guess a missing day."));
        }
        if (!s.toolDb) { await say("warn", "SKIP", T("مفيش صلاحية للقاعدة، هكتب الملخص من الملف لوحده وأنوّه إنه غير متحقق منه", "no DB permission; writing the summary from the file only, marked unverified")); }
        else {
          tries++; await say("ok", "ACT", T("استعلام إجمالي الأسبوع من قاعدة المبيعات", "query weekly total from the sales DB"), 2);
          if (s.fault === "stuck") { while (!over()) { tries++; await say("warn", "RETRY", T("مهلة انتهت… أعيد المحاولة", "timeout… retrying"), 2); } return stop(T("القاعدة مش بترد ووصلت لسقف المحاولات/التكلفة. ده بالظبط سبب وجود السقف: من غيره كان هيلف في حلقة بتصرف الميزانية بصمت.", "The DB is not responding and the attempt/cost cap was reached. This is exactly why the cap exists: without it the loop would quietly burn the budget.")); }
          if (s.fault === "conflict") { await say("warn", "OBSERVE", T("الملف: ٤١٢ ألف · القاعدة: ٣٩٨ ألف (فرق ٣٫٤٪)", "file: 412k · DB: 398k (3.4% gap)")); return stop(T("تناقض في رقم هيروح للإدارة. القرار هنا مش للوكيل: محتاج إنسان يحدد مصدر الحقيقة.", "A conflict in a number going to management. This is not the agent’s call: a human must decide the source of truth.")); }
          await say("ok", "OBSERVE", T("الأرقام متطابقة ✓", "numbers match ✓"));
        }
        await say("ok", "ACT", T("كتابة الملخص: ٣ أرقام رئيسية + أهم تغيير + قرار مطلوب", "write summary: 3 key numbers + top change + decision needed"), 2);
        if (!s.toolSend) { footer.replaceChildren(h("div", { class: "verdict ok" }, h("big", null, T("الملخص جاهز في مجلد output ✅", "Summary ready in output ✅")), T("مفيش صلاحية إرسال، فالإنسان هو اللي يبعته. ده «أقل صلاحية ممكنة».", "No send permission, so a human sends it. That is “least privilege”."))); busy = false; return; }
        if (s.approval) {
          await say("warn", "WAIT", T("الإرسال محتاج موافقة بشرية…", "sending needs human approval…"), 0);
          footer.replaceChildren(h("div", { class: "row" }, h("button", { class: "btn primary sm", onclick: async () => { footer.replaceChildren(); await say("ok", "ACT", T("تم الإرسال لمدير المبيعات ✓ (مسجّل)", "sent to the sales manager ✓ (logged)")); footer.replaceChildren(h("div", { class: "verdict ok" }, h("big", null, T("الهدف اتحقق ✅", "Goal achieved ✅")), T("بعد موافقتك، ومع سجل كامل لكل خطوة.", "After your approval, with a full log of every step."))); busy = false; } }, "✅ " + T("موافقة", "Approve")), h("button", { class: "btn sm", onclick: async () => { footer.replaceChildren(); await say("dim", "HALT", T("رفض بشري — لم يُرسل شيء", "human rejected — nothing sent"), 0); busy = false; } }, "❌ " + T("رفض", "Reject"))));
          return;
        }
        await say("ok", "ACT", T("تم الإرسال تلقائيًا", "sent automatically"));
        footer.replaceChildren(h("div", { class: "verdict warn" }, h("big", null, T("اتبعت… من غير ما حد يشوفه", "Sent… without anyone seeing it")), T("نجح المرة دي، لكن الكتاب بيقول إن صلاحية الإرسال تفضل مشروطة بموافقة بشرية دايمًا.", "It worked this time, but the book says send permission should always require human approval.")));
        busy = false;
      };
      meter();
      why(whyEl, T("المساعد العادي بيجاوب ويقف. الوكيل بيكرر: ينفّذ، يشوف النتيجة، يصحح. التكرار ده قوة، وفي نفس الوقت خطر لو مفيش حدود: عشان كده كل وكيل محتاج «حدود توقف» واضحة (مبلغ، بيانات ناقصة، عدد محاولات) يسأل عندها الإنسان.", "An ordinary assistant answers and stops. An agent repeats: act, observe, correct. That repetition is power, and danger without limits: so every agent needs clear “stop limits” (an amount, missing data, a number of attempts) where it asks a human."));
    },
  };

  /* ===== 11. Digital team: coordination patterns ===== */
  ACAD.labs.team = {
    icon: "👥", lesson: "u5-team", pages: [39, 40],
    title: L("مختبر: صمّم فريقك الرقمي واختبره بالأخطاء", "Lab: design your digital team and test it with errors"),
    intro: L("اختار نمط التنسيق والأدوار، وازرع أخطاء في البيانات أو التحليل، وشوف مين في الفريق بيمسكها، والوقت والتكلفة. الأرقام هنا **نموذج تعليمي مبسّط** بيعكس منطق الكتاب، مش قياس لأدوات حقيقية.", "Choose a coordination pattern and roles, plant errors in the data or analysis, and see who catches them, plus time and cost. Numbers are a **simplified teaching model** that reflects the book’s logic, not a measurement of real tools."),
    lessonLearned: L("ابدأ بثلاثة (جامع، محلل، مراجع). ضيف دور بس لما التجربة تثبت إن الفريق بيفشل في حاجة بعينها، وخلي النموذج القوي للمحلل والمراجع بس {p39-40}.", "Start with three (collector, analyst, reviewer). Add a role only when testing proves the team fails at something specific, and keep the strong model for analyst and reviewer only {p39-40}."),
    build({ inEl, outEl, whyEl }) {
      const ROLES = [["coord", "🧭", T("المنسّق", "Coordinator")], ["collect", "📥", T("جامع البيانات", "Data collector")], ["qa", "🩺", T("فاحص الجودة", "Quality checker")], ["analyst", "📈", T("المحلل", "Analyst")], ["critic", "🧐", T("المراجع الناقد", "Critical reviewer")], ["editor", "✍️", T("المحرّر", "Editor")], ["exec", "🚀", T("المنفّذ", "Executor")]];
      const s = { pattern: "chain", roles: new Set(["collect", "analyst", "critic"]), errData: true, errLogic: true, errTone: false, strongAll: false };
      inEl.append(select(T("🔀 نمط التنسيق", "🔀 Pattern"), [["chain", T("السلسلة", "Chain")], ["fan", T("التوزيع والتجميع", "Fan-out / fan-in")], ["maker", T("المنفّذ والناقد", "Maker–checker")]], s.pattern, (v) => { s.pattern = v; draw(); }),
        h("div", { class: "lbl", style: { fontWeight: 800, margin: "6px 0" } }, T("👥 الأدوار", "👥 Roles")), ROLES.map(([k, ico, l]) => h("label", { class: "check" }, h("input", { type: "checkbox", checked: s.roles.has(k), onchange: (e) => { e.target.checked ? s.roles.add(k) : s.roles.delete(k); draw(); } }), ico + " " + l)),
        h("div", { class: "lbl", style: { fontWeight: 800, margin: "6px 0" } }, T("🐞 أخطاء مزروعة", "🐞 Planted errors")),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: s.errData, onchange: (e) => { s.errData = e.target.checked; draw(); } }), T("صفوف مكررة في البيانات", "Duplicate rows in the data")),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: s.errLogic, onchange: (e) => { s.errLogic = e.target.checked; draw(); } }), T("استنتاج مش مدعوم بالبيانات", "A conclusion not backed by data")),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: s.errTone, onchange: (e) => { s.errTone = e.target.checked; draw(); } }), T("صياغة تقنية مش مناسبة للإدارة", "Technical wording unfit for management")),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: s.strongAll, onchange: (e) => { s.strongAll = e.target.checked; draw(); } }), T("شغّل الكل على أقوى نموذج", "Run everyone on the strongest model")));
      const draw = () => {
        const R = s.roles; const n = R.size;
        const catches = []; const misses = [];
        if (s.errData) (R.has("qa") ? catches.push(T("فاحص الجودة مسك الصفوف المكررة قبل التحليل", "Quality checker caught the duplicates before analysis")) : R.has("critic") && s.pattern !== "fan" ? catches.push(T("المراجع لاحظ رقم غريب ورجّع الشغل (متأخر ومكلف)", "Reviewer spotted an odd number and sent it back (late and costly)")) : misses.push(T("المكرر عدّى وضخّم الأرقام", "Duplicates slipped through and inflated numbers")));
        if (s.errLogic) (R.has("critic") ? catches.push(T("المراجع الناقد سأل: فين الدليل؟ ورجّعها للمحلل", "The critic asked: where is the evidence? and returned it to the analyst")) : misses.push(T("استنتاج بلا دليل وصل للإدارة", "An unsupported conclusion reached management")));
        if (s.errTone) (R.has("editor") ? catches.push(T("المحرّر صاغها بلغة النتائج", "The editor rewrote it in the language of results")) : misses.push(T("التقرير طلع بلغة تقنية صعبة", "The report came out in hard technical language")));
        const base = { coord: 1, collect: 1, qa: 1, analyst: 3, critic: 2, editor: 1, exec: 1 };
        const strong = (k) => s.strongAll || k === "analyst" || k === "critic";
        const cost = [...R].reduce((a, k) => a + base[k] * (strong(k) ? 5 : 1), 0) * (s.pattern === "maker" ? 1.6 : 1);
        const times = [...R].map((k) => base[k] * 2);
        const time = s.pattern === "fan" ? Math.max(...times, 0) + (R.has("coord") ? 2 : 4) : times.reduce((a, b) => a + b, 0) * (s.pattern === "maker" ? 1.5 : 1);
        const quality = Math.max(0, 100 - misses.length * 30 - (n > 5 ? 8 : 0) + (s.pattern === "maker" ? 5 : 0));
        const flow = h("div", { class: "pipeline", style: { margin: "6px 0 12px" } }, s.pattern === "fan"
          ? [h("span", { class: "pipe" }, "🧭 " + (R.has("coord") ? T("المنسّق يوزّع", "Coordinator splits") : T("توزيع", "Split"))), h("span", { class: "pipe-arrow" }, "⇉"), ...[...R].filter((k) => k !== "coord").map((k) => h("span", { class: "pipe run" }, ROLES.find((x) => x[0] === k)[1])), h("span", { class: "pipe-arrow" }, "⇉"), h("span", { class: "pipe" }, "🧩 " + T("تجميع", "Merge"))]
          : [...R].flatMap((k, i) => [i ? h("span", { class: "pipe-arrow" }, s.pattern === "maker" && k === "critic" ? "⇄" : App.isAr() ? "←" : "→") : null, h("span", { class: "pipe" + (k === "critic" ? " run" : "") }, ROLES.find((x) => x[0] === k)[1] + " " + ROLES.find((x) => x[0] === k)[2])]).filter(Boolean));
        outEl.replaceChildren(flow,
          h("div", { class: "kpis" }, h("div", { class: "kpi " + (quality >= 85 ? "ok" : "bad") }, h("small", null, T("جودة المخرج", "Output quality")), h("b", null, App.pct(quality))), h("div", { class: "kpi" }, h("small", null, T("زمن نسبي", "Relative time")), h("b", null, App.num(Math.round(time)))), h("div", { class: "kpi" + (cost > 30 ? " bad" : "") }, h("small", null, T("تكلفة نسبية", "Relative cost")), h("b", null, App.num(Math.round(cost)))), h("div", { class: "kpi" }, h("small", null, T("الأدوار", "Roles")), h("b", null, App.num(n)))),
          catches.length ? h("div", null, catches.map((c) => h("div", { class: "check", style: { cursor: "default" } }, "✅ ", c))) : null,
          misses.length ? h("div", null, misses.map((c) => h("div", { class: "check", style: { cursor: "default", color: "var(--bad)" } }, "❌ ", c))) : null,
          n > 5 ? h("div", { class: "callout warn", style: { fontSize: "14px" } }, T("فريق كبير: لما يحصل غلط، صعب تعرف مين السبب. الكتاب: «ثلاثة أدوار تعمل بثقة أفضل من سبعة لا يعرف أحد أيها أخطأ».", "A big team: when something breaks, it’s hard to know who caused it. The book: “three roles that work reliably beat seven where nobody knows which one failed”.")) : null,
          s.strongAll ? h("div", { class: "callout warn", style: { fontSize: "14px" } }, T("كل الأدوار على أقوى نموذج: التكلفة اتضاعفت من غير مكسب جودة يذكر للجامع والمحرّر.", "Every role on the strongest model: cost multiplied with little quality gain for collector and editor.")) : null);
        why(whyEl, T("التخصص بيرفع الجودة (كل دور تعليماته مركّزة)، وفصل الصلاحيات بيحصر الغلط، والمراجعة المتبادلة بتمسك اللي المنفّذ مش شايفه. «السلسلة» أوضح في التتبع، و«التوزيع» أسرع لأن الأجزاء بتشتغل مع بعض، و«المنفّذ والناقد» أدق لكنه أبطأ وأغلى.", "Specialisation lifts quality (each role has focused instructions), separating permissions contains errors, and cross-review catches what the maker can’t see. “Chain” is easiest to trace, “fan-out” is faster because parts run together, and “maker–checker” is more accurate but slower and costlier."));
      };
      draw();
    },
  };

  /* ===== 12. Model cost calculator (book price bands, Sept 2026) ===== */
  App.estTokens = (text) => {
    const ar = (text.match(/[؀-ۿ]+/g) || []); const en = (text.match(/[A-Za-z]+/g) || []); const num = (text.match(/[0-9٠-٩]+/g) || []).length; const punct = (text.match(/[^\s\w؀-ۿ]/g) || []).length;
    const arT = ar.reduce((a, w) => a + Math.max(1, Math.ceil(w.replace(/^(وال|بال|فال|كال|لل|ال|و|ب|ل|ف)/, "").length / 3) + (/^(وال|بال|فال|كال|لل|ال|و|ب|ل|ف)/.test(w) ? 1 : 0)), 0);
    const enT = en.reduce((a, w) => a + (w.length <= 6 ? 1 : Math.ceil(w.length / 5)), 0);
    return { total: arT + enT + num + Math.ceil(punct / 2), ar: arT, en: enT, words: ar.length + en.length };
  };
  ACAD.labs.cost = {
    icon: "💸", lesson: "u5-market", pages: [34, 35],
    title: L("مختبر: احسب تكلفة النموذج قبل ما تلتزم", "Lab: compute model cost before you commit"),
    intro: L("الحساب بيستخدم **نطاقات الأسعار المذكورة في الكتاب (سبتمبر ٢٠٢٦)** لكل مليون توكن، وتقدير تعليمي تقريبي لعدد التوكنات. اكتب نص شبه نصوصك، وحدد الحجم اليومي، وشوف التكلفة الشهرية لكل فئة.", "The calculation uses **the price bands stated in the book (September 2026)** per million tokens, plus a rough teaching estimate of token counts. Paste text like yours, set the daily volume, and see the monthly cost per tier."),
    lessonLearned: L("ابدأ من الطبقة الأرخص اللي بتنجح في **مهمتك أنت**، مش من لوحة التصنيف. وخلي بالك: الإخراج أغلى ٣–٦ مرات، والعربي بيستهلك توكنات أكتر {p34}.", "Start from the cheapest tier that succeeds at **your** task, not from a leaderboard. Remember: output costs 3–6× more, and Arabic consumes more tokens {p34}."),
    build({ inEl, outEl, whyEl }) {
      const TIERS = [["top", T("القمة", "Frontier"), [5, 10], [25, 50]], ["strong", T("الوسط القوي", "Strong mid"), [2, 5], [12, 25]], ["daily", T("العملي اليومي", "Everyday"), [1, 3], [4, 12]], ["eco", T("الاقتصادي", "Economy"), [0.3, 1], [1, 2]]];
      const s = { text: T("حلّل شكاوى العملاء التالية وصنّفها حسب السبب واقترح ردًا مختصرًا لكل شكوى، مع ذكر الأولوية.", "Analyse the following customer complaints, classify them by cause and suggest a short reply for each, with a priority."), docTokens: 1500, outTokens: 600, perDay: 200, days: 22 };
      const ta = h("textarea", { rows: 3, oninput: (e) => { s.text = e.target.value; draw(); } }, s.text);
      inEl.append(h("div", { class: "field" }, h("label", null, T("✍️ نص طلب نموذجي", "✍️ A typical request")), ta, h("small", null, T("التقدير تقريبي: كل أداة لها طريقة تقطيع مختلفة.", "Rough estimate: every tool tokenises differently."))),
        range(T("📄 توكنات المستند المرفق مع كل طلب", "📄 Attached document tokens per request"), 0, 50000, 500, s.docTokens, (v) => { s.docTokens = v; draw(); }),
        range(T("🧾 طول الإجابة (توكن)", "🧾 Answer length (tokens)"), 100, 4000, 100, s.outTokens, (v) => { s.outTokens = v; draw(); }),
        range(T("📈 طلبات في اليوم", "📈 Requests per day"), 1, 5000, 1, s.perDay, (v) => { s.perDay = v; draw(); }),
        range(T("📅 أيام عمل في الشهر", "📅 Working days per month"), 1, 31, 1, s.days, (v) => { s.days = v; draw(); }));
      const money = (x) => "$" + (x >= 100 ? Math.round(x).toLocaleString("en-US") : x.toFixed(2));
      const draw = () => {
        const tk = App.estTokens(s.text); const inTok = tk.total + s.docTokens; const reqs = s.perDay * s.days;
        const rows = TIERS.map(([k, name, i, o]) => { const lo = (reqs * (inTok * i[0] + s.outTokens * o[0])) / 1e6, hi = (reqs * (inTok * i[1] + s.outTokens * o[1])) / 1e6; return { k, name, lo, hi, outShare: (s.outTokens * o[0]) / (inTok * i[0] + s.outTokens * o[0]) }; });
        const max = rows[0].hi;
        outEl.replaceChildren(
          h("div", { class: "kpis" }, h("div", { class: "kpi" }, h("small", null, T("توكنات طلبك (تقدير)", "Your request tokens (est.)")), h("b", null, App.num(tk.total))), h("div", { class: "kpi" }, h("small", null, T("كلمات", "Words")), h("b", null, App.num(tk.words))), h("div", { class: "kpi" }, h("small", null, T("طلبات في الشهر", "Requests / month")), h("b", null, App.num(reqs)))),
          tk.ar && tk.words ? h("div", { class: "callout", style: { fontSize: "13.5px" } }, T(`📝 نسبة التوكن للكلمة هنا ≈ ${(tk.total / tk.words).toFixed(1)}. الكتاب: النص العربي بيستهلك توكنات أكتر من الإنجليزي لنفس المعنى، أحيانًا الضعف.`, `📝 Token-to-word ratio here ≈ ${(tk.total / tk.words).toFixed(1)}. The book: Arabic consumes more tokens than English for the same meaning, sometimes double.`)) : null,
          h("b", null, T("التكلفة الشهرية المتوقعة (أقل ← أعلى سعر في النطاق)", "Expected monthly cost (low → high of the band)")),
          h("div", { class: "bars" }, rows.map((r) => h("div", { class: "b", style: { gridTemplateColumns: "110px 1fr 120px" } }, h("span", null, r.name), h("i", { style: { width: Math.max(1, (r.hi / max) * 100) + "%", background: r.k === "top" ? "var(--rose)" : r.k === "eco" ? "var(--ok)" : "var(--accent)" } }), h("span", { class: "ltr" }, money(r.lo) + "–" + money(r.hi))))),
          h("p", { class: "muted", style: { fontSize: "13.5px" } }, T(`الإجابة بتمثل حوالي ${Math.round(rows[2].outShare * 100)}٪ من التكلفة رغم إنها أقصر من المدخل، لأن سعر الإخراج أعلى.`, `The answer makes up about ${Math.round(rows[2].outShare * 100)}% of the cost although it is shorter than the input, because output is priced higher.`)),
          h("div", { class: "callout warn", style: { fontSize: "13.5px" } }, T("⚠️ فخاخ مش ظاهرة في السعر المعلن (من الكتاب): بعض النماذج بتضاعف السعر بعد طول سياق معيّن، والأسعار التمهيدية ليها تاريخ انتهاء. اقرأ الحواشي قبل ميزانية سنوية.", "⚠️ Hidden traps (from the book): some models double the price beyond a certain context length, and introductory prices expire. Read the fine print before an annual budget.")));
        why(whyEl, T(`التكلفة = عدد الطلبات × (توكنات الإدخال × سعر الإدخال + توكنات الإخراج × سعر الإخراج) ÷ مليون. بنفس الحجم، الفرق بين أرخص وأغلى فئة بيوصل لـ${App.num(Math.round(rows[0].hi / Math.max(0.01, rows[3].lo)))} ضعف، وده سبب قاعدة «ابدأ من تحت».`, `Cost = requests × (input tokens × input price + output tokens × output price) ÷ one million. At the same volume the gap between the cheapest and the dearest tier reaches ${Math.round(rows[0].hi / Math.max(0.01, rows[3].lo))}×, which is why the rule says “start from the bottom”.`));
      };
      draw();
    },
  };

  /* ===== 13. Local model fit ===== */
  ACAD.labs.local = {
    icon: "💻", lesson: "u5-local", pages: [36],
    title: L("مختبر: النموذج ده هيشتغل على جهازي؟", "Lab: will this model run on my machine?"),
    intro: L("حدد ذاكرة جهازك وحجم النموذج ومستوى الضغط. الحساب التقريبي: الحجم ≈ عدد المعاملات × عدد البتات ÷ ٨ + حوالي ٢٠٪ زيادة للتشغيل. والجدول المرجعي هو جدول الكتاب.", "Set your memory, the model size and the compression level. The rough calculation: size ≈ parameters × bits ÷ 8 + about 20% runtime overhead. The reference table is the book’s."),
    lessonLearned: L("الضغط (Quantization) بيصغّر النموذج للربع تقريبًا مع فقد بسيط جدًا في الجودة، وQ4_K_M هو التوازن المبدئي. والذاكرة أهم من المعالج {p36}.", "Quantization shrinks a model to about a quarter with very little quality loss; Q4_K_M is the default balance. Memory matters more than the processor {p36}."),
    build({ inEl, outEl, whyEl }) {
      const s = { ram: 16, params: 8, bits: 4.5 };
      inEl.append(range(T("🧠 ذاكرة الجهاز/كرت الشاشة (جيجا)", "🧠 Machine / GPU memory (GB)"), 4, 128, 4, s.ram, (v) => { s.ram = v; draw(); }),
        range(T("📦 حجم النموذج (مليار معامل)", "📦 Model size (billion parameters)"), 1, 120, 1, s.params, (v) => { s.params = v; draw(); }, (v) => App.num(v) + "B"),
        select(T("🗜️ مستوى الضغط", "🗜️ Compression level"), [["16", T("بدون ضغط (١٦ بت)", "None (16-bit)")], ["8", "Q8 (8 bit)"], ["4.5", "Q4_K_M (~4.5 bit) — " + T("المبدئي", "default")], ["3.5", "Q3 (~3.5 bit)"]], String(s.bits), (v) => { s.bits = +v; draw(); }));
      const BOOK = [[8, T("٣–٤ مليار", "3–4B"), T("تلخيص، وتصنيف، وأسئلة بسيطة", "Summaries, classification, simple Q&A")], [16, T("٧–٩ مليار", "7–9B"), T("الاستخدام اليومي وكتابة أكواد قصيرة", "Daily use and short code")], [32, T("١٤–٣٢ مليار", "14–32B"), T("تحليل أعمق ومهام متعددة الخطوات", "Deeper analysis, multi-step tasks")], [64, T("٧٠ مليار فأعلى", "70B+"), T("أقرب ما يكون لجودة الخدمات السحابية", "Closest to cloud quality")]];
      const draw = () => {
        const need = (s.params * s.bits) / 8 * 1.2; const full = (s.params * 16) / 8 * 1.2; const fits = need <= s.ram * 0.9;
        const rowIdx = BOOK.reduce((a, r, i) => (s.ram >= r[0] ? i : a), -1);
        outEl.replaceChildren(h("div", { class: "verdict " + (fits ? "ok" : "bad") }, h("big", null, fits ? T("هيشتغل ✅", "It fits ✅") : T("مش هيكفي ❌", "Won’t fit ❌")), T(`محتاج حوالي ${need.toFixed(1)} جيجا من ${s.ram} متاحين.`, `Needs about ${need.toFixed(1)} GB of ${s.ram} available.`)),
          h("div", { class: "bars", style: { marginTop: "12px" } }, [[T("بدون ضغط", "Uncompressed"), full], [T("بالضغط المختار", "With chosen compression"), need], [T("ذاكرتك", "Your memory"), s.ram]].map(([l, v], i) => h("div", { class: "b", style: { gridTemplateColumns: "130px 1fr 70px" } }, h("span", null, l), h("i", { style: { width: Math.min(100, (v / Math.max(full, s.ram)) * 100) + "%", background: i === 2 ? "var(--teal)" : i === 0 ? "var(--rose)" : "var(--accent)" } }), h("span", null, v.toFixed(1) + " GB")))),
          h("b", { style: { display: "block", marginTop: "12px" } }, T("جدول الكتاب التقريبي", "The book’s rough guide") + " "), App.srcBadge("book", [36]),
          h("div", { class: "tbl-wrap", style: { marginTop: "6px" } }, h("table", { class: "tbl" }, h("thead", null, h("tr", null, h("th", null, T("الذاكرة", "Memory")), h("th", null, T("الحجم المناسب", "Suitable size")), h("th", null, T("يصلح لـ", "Good for")))),
            h("tbody", null, BOOK.map((r, i) => h("tr", { class: i === rowIdx ? "warnrow" : "" }, h("td", null, (i === 3 ? "≥ " : "") + r[0] + " GB"), h("td", null, r[1]), h("td", { style: { whiteSpace: "normal" } }, r[2])))))));
        why(whyEl, T(`كل معامل بيتخزن كرقم؛ بدون ضغط الرقم ١٦ بت (٢ بايت)، فنموذج ${s.params}B ياخد حوالي ${full.toFixed(0)} جيجا. الضغط لـ ${s.bits} بت بيقلل الحجم ${(16 / s.bits).toFixed(1)} مرة. وسرعة التوليد بتحكمها سعة الذاكرة وعرض نطاقها أكتر من قوة المعالج.`, `Each parameter is stored as a number; uncompressed that is 16 bits (2 bytes), so an ${s.params}B model takes about ${full.toFixed(0)} GB. Compressing to ${s.bits} bits shrinks it ${(16 / s.bits).toFixed(1)}×. Generation speed depends on memory size and bandwidth more than on processor power.`));
      };
      draw();
    },
  };

  /* ===== 14. Git simulator ===== */
  ACAD.labs.git = {
    icon: "🌿", lesson: "u5-git-cmds", pages: [32, 33],
    title: L("مختبر: جرّب Git من غير ما تخاف", "Lab: try Git without fear"),
    intro: L("مستودع تجريبي داخل الصفحة (مش Git حقيقي، لكنه بيتبع نفس القواعد). عدّل الملف، واعمل add وcommit، وافتح فرع للتجربة، وادمجه، وارجع في أي تعديل. الرسم بيوريك التاريخ بيتبني إزاي.", "An in-page practice repository (not real Git, but it follows the same rules). Edit the file, add and commit, open a branch to experiment, merge it, and undo any change. The graph shows how history is built."),
    lessonLearned: L("نسخة واحدة على جهازك، وتاريخ كامل وراها. الفرع بيخليك تجرّب أي فكرة من غير ما تمس الأصل: نجحت؟ ادمجها. فشلت؟ امسحها ومفيش أثر {p32}.", "One copy on your machine with full history behind it. A branch lets you try any idea without touching the original: worked? merge it. failed? delete it, no trace {p32}."),
    build({ inEl, outEl, whyEl }) {
      const G = { branch: "main", branches: { main: ["c1"] }, commits: { c1: { msg: T("أول نسخة من التقرير", "first version of the report"), br: "main", file: [T("# تقرير المبيعات", "# Sales report")] } }, work: [T("# تقرير المبيعات", "# Sales report")], staged: false, n: 1 };
      const head = () => G.branches[G.branch][G.branches[G.branch].length - 1];
      const committed = () => G.commits[head()].file;
      const dirty = () => JSON.stringify(G.work) !== JSON.stringify(committed());
      const term = h("div", { class: "log", style: { minHeight: "130px" } });
      const out = (cmd, lines) => { term.append(h("div", null, h("span", { class: "ok" }, "$ "), cmd)); (lines || []).forEach(([c, m]) => term.append(h("div", { class: c || "" }, h("span", { class: "ar" }, m)))); term.scrollTop = term.scrollHeight; draw(); };
      const edits = App.isAr() ? ["إضافة جدول المبيعات الشهري", "إصلاح حساب الهامش عند الكمية صفر", "إضافة رسم بياني للاتجاه", "تعديل عنوان الملخص"] : ["add the monthly sales table", "fix margin calculation when quantity is zero", "add a trend chart", "change the summary title"];
      let msgSel;
      const cmds = [
        ["edit", "✏️ " + T("عدّل الملف", "Edit the file"), () => { const e = edits[(G.work.length - 1) % edits.length]; G.work = G.work.concat("- " + e); G.staged = false; out(T("(تعديل في report.md)", "(edit report.md)"), [["dim", "+ " + e]]); }],
        ["status", "git status", () => out("git status", [[dirty() ? "warn" : "ok", dirty() ? (G.staged ? T("تعديلات جاهزة للحفظ (staged)", "changes staged for commit") : T("تعديلات غير مختارة: report.md", "changes not staged: report.md")) : T("لا يوجد ما يُحفظ، المجلد نظيف", "nothing to commit, working tree clean")], ["dim", T("على الفرع: ", "on branch: ") + G.branch]])],
        ["add", "git add .", () => { if (!dirty()) return out("git add .", [["dim", T("مفيش تعديلات", "no changes")]]); G.staged = true; out("git add .", [["ok", T("تم اختيار التعديلات", "changes staged")]]); }],
        ["commit", 'git commit -m "…"', () => { if (!G.staged) return out('git commit -m "…"', [["bad", T("مفيش حاجة مختارة. اعمل git add الأول.", "nothing staged. run git add first.")]]); const id = "c" + ++G.n; const msg = msgSel.value; G.commits[id] = { msg, br: G.branch, file: G.work.slice() }; G.branches[G.branch].push(id); G.staged = false; out('git commit -m "' + msg + '"', [["ok", "[" + G.branch + " " + id + "] " + msg]]); }],
        ["branch", "git branch experiment", () => { if (G.branches.experiment) return out("git branch experiment", [["warn", T("الفرع موجود بالفعل", "branch already exists")]]); G.branches.experiment = [head()]; out("git branch experiment", [["ok", T("اتعمل فرع جانبي من النقطة الحالية", "side branch created from the current point")]]); }],
        ["checkout", "git checkout …", () => { const to = G.branch === "main" ? "experiment" : "main"; if (!G.branches[to]) return out("git checkout " + to, [["bad", T("الفرع مش موجود. اعمله الأول.", "branch does not exist. create it first.")]]); if (dirty()) return out("git checkout " + to, [["bad", T("عندك تعديلات مش محفوظة. احفظها أو تراجع الأول.", "you have unsaved changes. commit or restore first.")]]); G.branch = to; G.work = committed().slice(); out("git checkout " + to, [["ok", T("انتقلت إلى ", "switched to ") + to + T(" — الملف اتغير حسب الفرع", " — the file changed to match the branch")]]); }],
        ["merge", "git merge experiment", () => { if (G.branch !== "main" || !G.branches.experiment) return out("git merge experiment", [["bad", T("لازم تكون على main ويكون فيه فرع experiment", "you must be on main and an experiment branch must exist")]]); const ex = G.branches.experiment; const exHead = ex[ex.length - 1]; if (G.branches.main.includes(exHead)) return out("git merge experiment", [["dim", T("مفيش جديد للدمج", "already up to date")]]); const id = "c" + ++G.n; const merged = [...new Set(committed().concat(G.commits[exHead].file))]; G.commits[id] = { msg: T("دمج التجربة في الرئيسي", "merge experiment into main"), br: "main", file: merged, merge: exHead }; G.branches.main.push(id); G.work = merged.slice(); out("git merge experiment", [["ok", T("تم الدمج بنجاح", "merge successful")]]); }],
        ["restore", "git restore report.md", () => { if (!dirty()) return out("git restore report.md", [["dim", T("مفيش تعديلات للتراجع عنها", "nothing to restore")]]); G.work = committed().slice(); G.staged = false; out("git restore report.md", [["ok", T("رجع الملف لآخر حالة محفوظة", "file restored to the last commit")]]); }],
        ["log", "git log --oneline", () => out("git log --oneline", G.branches[G.branch].slice().reverse().map((id) => ["", id + "  " + G.commits[id].msg]))],
      ];
      msgSel = h("select", { "aria-label": T("رسالة الحفظ", "Commit message") }, [T("إضافة جدول المبيعات الشهري", "Add monthly sales table"), T("إصلاح حساب الهامش عند الكمية صفر", "Fix margin when quantity is zero"), T("تعديل", "update")].map((m) => h("option", null, m)));
      inEl.append(h("div", { class: "grid g2", style: { gap: "6px" } }, cmds.map(([k, l, fn]) => h("button", { class: "btn sm" + (k === "edit" ? " primary" : ""), onclick: fn, style: { fontFamily: k === "edit" ? "" : "var(--mono)", direction: "ltr" } }, l))),
        h("div", { class: "field", style: { marginTop: "10px" } }, h("label", null, T("💬 رسالة الحفظ", "💬 Commit message")), msgSel, h("small", null, T("قارن «تعديل» برسالة واضحة: بعد شهر، أي واحدة هتفهم منها اللي حصل؟", "Compare “update” with a clear message: a month from now, which one tells you what happened?"))));
      const graph = h("div");
      const fileView = h("div", { class: "prompt-text", style: { fontFamily: "var(--mono)", fontSize: "13px" } });
      const draw = () => {
        const W = 520, H = 120; const all = Object.keys(G.commits); const x = (id) => 30 + all.indexOf(id) * Math.min(70, (W - 60) / Math.max(1, all.length - 1)); const y = (id) => (G.commits[id].br === "main" ? 40 : 90);
        let svgS = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;direction:ltr" role="img" aria-label="commit graph">`;
        for (const b in G.branches) { const arr = G.branches[b]; for (let i = 1; i < arr.length; i++) svgS += `<line x1="${x(arr[i - 1])}" y1="${y(arr[i - 1])}" x2="${x(arr[i])}" y2="${y(arr[i])}" stroke="${b === "main" ? "var(--accent)" : "var(--teal)"}" stroke-width="3"/>`; }
        all.forEach((id) => { const c = G.commits[id]; if (c.merge) svgS += `<line x1="${x(c.merge)}" y1="${y(c.merge)}" x2="${x(id)}" y2="${y(id)}" stroke="var(--teal)" stroke-width="3" stroke-dasharray="5 4"/>`; });
        all.forEach((id) => { const isHead = id === head(); svgS += `<circle cx="${x(id)}" cy="${y(id)}" r="${isHead ? 11 : 8}" fill="${G.commits[id].br === "main" ? "var(--accent)" : "var(--teal)"}" stroke="var(--surface)" stroke-width="3"><title>${App.esc(G.commits[id].msg)}</title></circle><text x="${x(id)}" y="${y(id) - 15}" text-anchor="middle" font-size="10" fill="var(--ink-3)">${id}</text>`; });
        svgS += `<text x="6" y="44" font-size="10" fill="var(--accent)">main</text>${G.branches.experiment ? '<text x="6" y="94" font-size="10" fill="var(--teal)">exp</text>' : ""}</svg>`;
        graph.innerHTML = svgS;
        fileView.textContent = "report.md" + (dirty() ? T("  (معدّل ●)", "  (modified ●)") : "") + "\n" + G.work.join("\n");
        outEl.replaceChildren(h("div", { class: "row" }, h("span", { class: "chip on" }, "🌿 " + G.branch), dirty() ? h("span", { class: "badge sim" }, G.staged ? "staged" : T("تعديلات غير محفوظة", "unsaved changes")) : h("span", { class: "badge ok" }, T("نظيف", "clean"))), graph, fileView, h("div", { style: { marginTop: "8px" } }, term));
      };
      term.append(h("div", { class: "dim" }, T("# جرّب: عدّل ← add ← commit ← branch ← checkout ← عدّل ← commit ← checkout ← merge", "# try: edit → add → commit → branch → checkout → edit → commit → checkout → merge")));
      draw();
      why(whyEl, T("كل commit نقطة حفظ ليها اسم وسبب وتاريخ. الفرع مجرد مؤشر على نقطة؛ لما تحفظ عليه بيتحرك هو بس، فالرئيسي مايتأثرش. الدمج بيعمل نقطة جديدة فيها الاتنين. وrestore بيلغي التعديل اللي لسه ماتحفظش، فمفيش خوف من التجربة.", "Each commit is a save point with a name, a reason and a time. A branch is just a pointer to a point; committing on it moves only that pointer, so main is untouched. Merging creates a new point containing both. Restore discards unsaved edits, so there is no fear in experimenting."));
    },
  };

  /* ===== 15. From manual process to system ===== */
  ACAD.labs.system = {
    icon: "🔗", lesson: "u5-system", pages: [37, 38],
    title: L("مختبر: عدّ النقلات اليدوية واقفل الفجوات", "Lab: count manual handoffs and close the gaps"),
    intro: L("عملية «تقرير الكفاءة الأسبوعي» في مصنع **افتراضي**، بنقلاتها اليدوية. اضغط على أي نقلة عشان تأتمتها، وشوف الوقت والأخطاء المحتملة بتتغير. وجرّب تأتمت «قرار» عشان تشوف إيه اللي هيحصل.", "The “weekly efficiency report” process in a **fictional** factory, with its manual handoffs. Click any handoff to automate it and watch time and error points change. Try automating a “decision” to see what happens."),
    lessonLearned: L("كل نقلة يدوية فجوة: تأخير، وخطأ محتمل، واعتماد على شخص. الأتمتة تتولى النقل والحساب والتنبيه، أما القرار اللي ليه أثر مالي أو تنظيمي فيفضل بموافقة بشرية صريحة {p37}.", "Every manual handoff is a gap: delay, possible error, dependence on one person. Automation handles transfer, calculation and alerts; decisions with financial or organisational impact keep explicit human approval {p37}."),
    build({ inEl, outEl, whyEl }) {
      const STEPS = [
        { k: "s1", t: T("تنزيل تقرير الإنتاج من النظام", "Download production report from the system"), min: 20, err: 1 },
        { k: "s2", t: T("نسخ الأرقام إلى إكسل", "Copy numbers into Excel"), min: 35, err: 3 },
        { k: "s3", t: T("دمج ملفات الورديات الثلاث", "Merge the three shift files"), min: 30, err: 2 },
        { k: "s4", t: T("حساب الكفاءة لكل خط", "Compute efficiency per line"), min: 25, err: 2 },
        { k: "s5", t: T("كتابة تفسير الانحرافات", "Write an explanation of deviations"), min: 30, err: 1, ai: true },
        { k: "s6", t: T("قرار: إيقاف خط للصيانة؟", "Decision: stop a line for maintenance?"), min: 15, err: 0, decision: true },
        { k: "s7", t: T("إرسال التقرير للمدير بالبريد", "Email the report to the manager"), min: 10, err: 1 },
      ];
      const auto = new Set();
      inEl.append(h("p", { class: "muted", style: { fontSize: "14px" } }, T("اضغط على أي خطوة لتحويلها من يدوي إلى آلي (أو العكس).", "Click any step to switch it between manual and automated.")),
        ...STEPS.map((s) => h("button", { class: "btn", style: { width: "100%", justifyContent: "flex-start", marginBottom: "6px", whiteSpace: "normal", height: "auto", padding: "8px 12px", textAlign: "start" }, "aria-pressed": "false", onclick: (e) => { auto.has(s.k) ? auto.delete(s.k) : auto.add(s.k); e.currentTarget.setAttribute("aria-pressed", String(auto.has(s.k))); e.currentTarget.style.borderColor = auto.has(s.k) ? (s.decision ? "var(--bad)" : "var(--ok)") : ""; e.currentTarget.style.background = auto.has(s.k) ? (s.decision ? "var(--bad-soft)" : "var(--ok-soft)") : ""; draw(); } }, (s.decision ? "⚖️ " : s.ai ? "🧠 " : "✋ ") + s.t + " · " + App.num(s.min) + T(" د", " min"))));
      const draw = () => {
        const manual = STEPS.filter((s) => !auto.has(s.k));
        const handoffs = STEPS.filter((s, i) => i > 0 && (!auto.has(s.k) || !auto.has(STEPS[i - 1].k))).length;
        const minutes = manual.reduce((a, s) => a + s.min, 0) + STEPS.filter((s) => auto.has(s.k)).length * 2;
        const errs = manual.reduce((a, s) => a + s.err, 0);
        const decAuto = auto.has("s6");
        outEl.replaceChildren(
          h("div", { class: "kpis" }, h("div", { class: "kpi" }, h("small", null, T("نقلات يدوية", "Manual handoffs")), h("b", null, App.num(handoffs))), h("div", { class: "kpi" + (minutes < 60 ? " ok" : "") }, h("small", null, T("دقائق أسبوعيًا", "Minutes / week")), h("b", null, App.num(minutes))), h("div", { class: "kpi" + (errs > 4 ? " bad" : " ok") }, h("small", null, T("نقاط خطأ محتملة", "Possible error points")), h("b", null, App.num(errs)))),
          h("div", { class: "pipeline" }, STEPS.flatMap((s, i) => [i ? h("span", { class: "pipe-arrow" }, App.isAr() ? "←" : "→") : null, h("span", { class: "pipe " + (auto.has(s.k) ? (s.decision ? "bad" : "ok") : "") }, (auto.has(s.k) ? "⚙️ " : "✋ ") + s.t)]).filter(Boolean)),
          decAuto ? h("div", { class: "callout bad", style: { marginTop: "12px" } }, h("b", { class: "t" }, "⛔ " + T("قرار اتأتمت", "A decision was automated")), T("إيقاف خط إنتاج قرار ليه أثر مالي وتنظيمي. المبدأ: الإنسان في نقاط القرار. خلي النظام يجهّز التوصية والدليل، والإنسان يوافق.", "Stopping a production line has financial and organisational impact. Principle: humans at decision points. Let the system prepare the recommendation and evidence; a human approves.")) : null,
          auto.has("s5") && !auto.has("s4") ? h("div", { class: "callout warn", style: { marginTop: "12px" } }, T("طبقة الذكاء اتأتمتت قبل طبقة القواعد: الذكاء للتفسير والتصنيف والتوصية، لكن الحساب نفسه لازم يكون قواعد ثابتة، وإلا الأرقام هتختلف من تشغيل للتاني.", "The AI layer was automated before the rules layer: AI is for explaining, classifying and recommending, but the calculation itself must be fixed rules, or numbers will vary from run to run.")) : null,
          auto.size === STEPS.length - 1 && !decAuto ? h("div", { class: "verdict ok", style: { marginTop: "12px" } }, h("big", null, T("نظام حقيقي ✅", "A real system ✅")), T("الحدث بيبدأ السلسلة، والإنسان بيتدخل عند القرار بس. وده رقم تعرضه على الإدارة: كام نقلة اختفت وكام ساعة اتوفرت.", "An event starts the chain and a human steps in only at the decision. That is a number for management: how many handoffs disappeared and how many hours were saved.")) : null);
        why(whyEl, T("الأداة بتحل خطوة واحدة، وبعدها إنسان بينقل مخرجها للخطوة اللي بعدها: الإنسان ده هو عنق الزجاجة. النظام بيربط الخطوات فمخرج كل خطوة يبقى مدخل اللي بعدها تلقائيًا. عدّ النقلات اليدوية: هي بالظبط قائمة اللي هتبنيه.", "A tool solves one step, then a person carries its output to the next step: that person is the bottleneck. A system links steps so each output becomes the next input automatically. Count the manual handoffs: they are exactly your build list."));
      };
      draw();
    },
  };
})();
