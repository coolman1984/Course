/* Labs, part A: framework + next-word model, prompt builder, notebook retrieval, automation compass,
   data quality, Excel formula edge cases, macro recorder. Every lab computes its result from the inputs;
   none of them calls a real AI model, and each says so. */
"use strict";
(function () {
  const App = ACAD.App; const { h, t, tr } = App;
  const L = (ar, en) => ({ ar, en });
  const T = (ar, en) => (App.isAr() ? ar : en);
  App.L = L; App.T = T;

  /** Standard lab frame: head (title, intro, honesty badge) | inputs | outputs | why | lesson learned. */
  App.mountLab = (id) => {
    const lab = ACAD.labs[id]; if (!lab) return h("div", { class: "empty" }, t("missing"));
    App.state.labs[id] = App.state.labs[id] || Date.now(); App.save();
    const inEl = h("div", { class: "lab-in" }), outEl = h("div", { class: "lab-out", "aria-live": "polite" });
    const whyEl = h("div", { class: "lab-why" });
    const root = h("section", { class: "lab", id: "lab-" + id, "aria-label": tr(lab.title) },
      h("div", { class: "lab-head" }, h("span", { class: "sec-ico", "aria-hidden": "true" }, lab.icon),
        h("div", { style: { flex: 1, minWidth: "220px" } }, h("h3", null, tr(lab.title)), h("p", { class: "muted", style: { margin: "2px 0 0", fontSize: "14.5px" }, html: App.inline(tr(lab.intro)) })),
        h("span", { class: "row", style: { gap: "4px" } }, App.srcBadge("sim"), ...App.pageLinks(lab.pages))),
      h("div", { class: "lab-body" }, inEl, outEl), whyEl,
      lab.lessonLearned ? h("div", { class: "lab-lesson" }, "🎓 " + t("lessonLearned") + ": ", h("span", { html: App.inline(tr(lab.lessonLearned)), style: { fontWeight: 600 } })) : null);
    try { lab.build({ inEl, outEl, whyEl, root }); }
    catch (e) { console.error(e); outEl.replaceChildren(h("div", { class: "callout bad" }, t("labError"))); }
    return root;
  };
  const why = (el, html) => el.replaceChildren(h("b", null, "🔍 " + t("whyHappened") + " "), h("span", { html }));
  App.labWhy = why;
  const range = (label, min, max, step, val, on, fmt) => { const o = h("output", null, fmt ? fmt(val) : App.num(val)); const inp = h("input", { type: "range", min, max, step, value: val, "aria-label": label, oninput: (e) => { o.textContent = fmt ? fmt(+e.target.value) : App.num(+e.target.value); on(+e.target.value); } }); return h("div", { class: "field" }, h("label", null, h("span", null, label), o), inp); };
  const select = (label, opts, val, on) => h("div", { class: "field" }, h("label", null, label), h("select", { onchange: (e) => on(e.target.value) }, opts.map(([v, l]) => h("option", { value: v, selected: v === val }, l))));
  App.labRange = range; App.labSelect = select;
  function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  App.rng = rng;

  /* ===== 1. Next-word prediction (toy bigram/trigram model) ===== */
  const CORPUS = {
    ar: `المدير طلب تقرير المبيعات الأسبوعي قبل الاجتماع . المدير طلب ملخص قصير للمبيعات . تقرير المبيعات يوضح انخفاض الكفاءة في خط الإنتاج . الكفاءة انخفضت بسبب توقف الماكينة . الكفاءة انخفضت في الوردية الليلية . فريق المبيعات حقق الهدف الشهري . فريق المبيعات يحتاج خطة واضحة . الخطة تحتاج مسؤول وموعد . الخطة تحتاج بيانات دقيقة . البيانات تحتاج فحص الجودة قبل التحليل . البيانات الناقصة تعطي قرار خاطئ . التحليل يبدأ بسؤال واضح . التحليل يحتاج سياق كامل . السياق الكامل يعطي نتيجة أدق . النتيجة تحتاج مراجعة بشرية . المراجعة البشرية تمنع الأخطاء الصامتة . الذكاء الاصطناعي يكتب ملخص سريع . الذكاء الاصطناعي يحتاج سياق واضح . الذكاء الاصطناعي قد يعطي معلومة خاطئة بثقة . الاجتماع انتهى بقرار واضح . الاجتماع انتهى بدون قرار . المبيعات ارتفعت في فرع القاهرة . المبيعات انخفضت في فرع الإسكندرية .`,
    en: `the manager asked for the weekly sales report before the meeting . the manager asked for a short summary of sales . the sales report shows lower efficiency on the line . efficiency dropped because the machine stopped . efficiency dropped on the night shift . the sales team reached the monthly target . the sales team needs a clear plan . the plan needs an owner and a date . the plan needs accurate data . the data needs a quality check before analysis . missing data gives a wrong decision . analysis starts with a clear question . analysis needs full context . full context gives a more accurate result . the result needs a human review . a human review prevents silent errors . the AI writes a quick summary . the AI needs clear context . the AI may give wrong information with confidence . the meeting ended with a clear decision . the meeting ended without a decision . sales rose in the cairo branch . sales fell in the alexandria branch .`,
  };
  function buildModel(text) {
    const w = text.split(/\s+/).filter(Boolean); const bi = {}, tri = {};
    for (let i = 0; i < w.length - 1; i++) { (bi[w[i]] = bi[w[i]] || {})[w[i + 1]] = ((bi[w[i]] || {})[w[i + 1]] || 0) + 1; if (i < w.length - 2) { const k = w[i] + " " + w[i + 1]; (tri[k] = tri[k] || {})[w[i + 2]] = ((tri[k] || {})[w[i + 2]] || 0) + 1; } }
    return { bi, tri, starts: [...new Set(w.filter((x, i) => i === 0 || w[i - 1] === "."))] };
  }
  ACAD.labs.tokens = {
    icon: "🔮", lesson: "u0-model", pages: [2, 34, 41],
    title: L("مختبر: كيف يتوقع النموذج الكلمة التالية؟", "Lab: how does a model predict the next word?"),
    intro: L("نموذج لغوي مصغّر جدًا (من تعليم الأكاديمية) اتدرّب على ٢٣ جملة شغل بس. اختار بداية، وغيّر «درجة الحرارة»، وشوف الاحتمالات وهي بتتحسب قدامك. النموذج الحقيقي فكرته شبه دي، لكن بمليارات الأوزان بدل جدول عدّ صغير.", "A tiny language model (built for this academy) trained on just 23 work sentences. Pick a start, change the “temperature”, and watch the probabilities being computed. Real models follow the same idea, with billions of weights instead of a small count table."),
    lessonLearned: L("النموذج بيختار الكلمة **المحتملة** مش الكلمة **الصحيحة**. الطلاقة مش دليل على الصحة، عشان كده المراجعة البشرية والتحقق من المصادر ضرورة {p41}.", "The model picks the **likely** word, not the **true** one. Fluency is not evidence of truth, so human review and source checks are essential {p41}."),
    build({ inEl, outEl, whyEl }) {
      const lang = App.lang(); const M = buildModel(CORPUS[lang]);
      let temp = 0.7, seed = 7, seq = [lang === "ar" ? "الذكاء" : "the"], r = rng(seed);
      if (lang === "ar") seq = ["الذكاء", "الاصطناعي"]; else seq = ["the", "AI"];
      const dist = () => {
        const last = seq[seq.length - 1], prev2 = seq.slice(-2).join(" ");
        const src = M.tri[prev2] || M.bi[last] || {};
        const used = M.tri[prev2] ? "tri" : M.bi[last] ? "bi" : "none";
        const ents = Object.entries(src); const tot = ents.reduce((a, [, c]) => a + Math.pow(c, 1 / temp), 0);
        return { used, list: ents.map(([w, c]) => ({ w, c, p: Math.pow(c, 1 / temp) / tot })).sort((a, b) => b.p - a.p) };
      };
      const stepOnce = () => { const d = dist(); if (!d.list.length) return false; let x = r(), acc = 0; for (const it of d.list) { acc += it.p; if (x <= acc) { seq.push(it.w); return it; } } seq.push(d.list[0].w); return d.list[0]; };
      const startSel = select(T("ابدأ الجملة بـ", "Start the sentence with"), (lang === "ar" ? [["الذكاء الاصطناعي", "الذكاء الاصطناعي"], ["المدير طلب", "المدير طلب"], ["الكفاءة انخفضت", "الكفاءة انخفضت"], ["البيانات", "البيانات"], ["المبيعات", "المبيعات"]] : [["the AI", "the AI"], ["the manager", "the manager"], ["efficiency dropped", "efficiency dropped"], ["the data", "the data"], ["sales", "sales"]]), seq.join(" "), (v) => { seq = v.split(" "); draw(); });
      inEl.append(startSel,
        range(T("درجة الحرارة (العشوائية)", "Temperature (randomness)"), 0.1, 2, 0.1, temp, (v) => { temp = v; draw(); }, (v) => v.toFixed(1)),
        h("div", { class: "row" },
          h("button", { class: "btn primary sm", onclick: () => { stepOnce(); draw(); } }, T("➕ الكلمة التالية", "➕ Next word")),
          h("button", { class: "btn sm", onclick: () => { for (let i = 0; i < 10; i++) { const it = stepOnce(); if (!it || it.w === ".") break; } draw(); } }, T("⏩ كمّل الجملة", "⏩ Finish the sentence")),
          h("button", { class: "btn sm ghost", onclick: () => { seed++; r = rng(seed); seq = startSel.querySelector("select").value.split(" "); draw(); } }, T("🎲 بذرة جديدة", "🎲 New seed"))),
        h("p", { class: "muted", style: { fontSize: "13px", marginTop: "10px" } }, T("💡 جرّب حرارة ٠٫١ وبعدين ٢: عند الصفر تقريبًا النموذج بيختار الأعلى احتمالًا دايمًا، وعند ٢ بيجرّب اختيارات نادرة.", "💡 Try temperature 0.1 then 2: near zero the model always takes the top choice; at 2 it tries rare ones.")));
      const draw = () => {
        const d = dist();
        outEl.replaceChildren(
          h("b", null, T("النص المتولّد:", "Generated text:")),
          h("div", { class: "tokens" }, seq.map((w, i) => h("span", { class: "tok", style: { background: i >= seq.length - 1 ? "var(--accent-soft)" : "var(--surface-3)" } }, w))),
          h("b", { style: { display: "block", marginTop: "12px" } }, T("احتمالات الكلمة التالية بعد «", "Next-word probabilities after “") + seq.slice(-1)[0] + T("»", "”") + " ", h("span", { class: "chip" }, d.used === "tri" ? T("سياق كلمتين", "2-word context") : d.used === "bi" ? T("سياق كلمة", "1-word context") : T("مفيش بيانات", "no data"))),
          d.list.length ? h("div", null, d.list.slice(0, 7).map((it, i) => h("div", { class: "prob" + (i === 0 ? " pick" : "") }, h("b", null, it.w), h("i", { style: { width: Math.max(2, it.p * 100) + "%" } }), h("span", null, App.pct(Math.round(it.p * 100)))))) :
            h("div", { class: "callout warn" }, T("النموذج وصل لكلمة ماشافهاش قبل كده في تدريبه، فمش عارف يكمّل. النماذج الكبيرة بتواجه نفس المشكلة مع المواضيع اللي ماتدرّبتش عليها، بس بدل ما تقف ممكن تخمّن.", "The model reached a word it never saw in training, so it cannot continue. Large models face the same gap on unseen topics, except that they may guess instead of stopping.")));
        const flu = seq.join(" ");
        why(whyEl, T(`الاحتمال = عدد مرات ظهور الكلمة بعد اللي قبلها في جمل التدريب، مرفوع لأُس (١ ÷ الحرارة). مع حرارة <b>${temp.toFixed(1)}</b> ${temp < 0.5 ? "الفرق بين الاحتمالات بيكبر، فالاختيار بيبقى متوقع ومكرر." : temp > 1.3 ? "الاحتمالات بتقرب من بعض، فالنتيجة بتبقى أغرب وممكن تخرج عن المعنى." : "بيحصل توازن بين المتوقع والمتنوع."} لاحظ إن الجملة ممكن تطلع سليمة لغويًا ومع ذلك غلط في الواقع (مثلًا «المبيعات ارتفعت في فرع الإسكندرية»)، لأن النموذج ماعندوش أي فكرة عن الحقيقة.`,
          `Probability = how often a word followed the previous one in training, raised to the power (1 ÷ temperature). At temperature <b>${temp.toFixed(1)}</b> ${temp < 0.5 ? "the gaps between options grow, so choices become predictable and repetitive." : temp > 1.3 ? "options become closer, so the output gets stranger and can drift from the meaning." : "there is a balance between predictable and varied."} Notice that a sentence can be grammatically perfect yet factually wrong (e.g. “sales rose in the alexandria branch”), because the model has no notion of truth.`));
      };
      draw();
    },
  };

  /* ===== 2. Prompt builder: five elements + the strongest sentence ===== */
  ACAD.labs["prompt-builder"] = {
    icon: "🧩", lesson: "u1-five", pages: [7, 8],
    title: L("مختبر: ابنِ طلبك بالعناصر الخمسة", "Lab: build your request with the five elements"),
    intro: L("اكتب طلب حقيقي من شغلك على مراحل. المختبر **بيفحص بناء الطلب** بقواعد الكتاب (الهدف، السياق، الجمهور، شكل النتيجة، القيود)، ومش بيشغّل ذكاء اصطناعي. وفي الآخر بيطلّعلك الطلب جاهز للنسخ.", "Write a real work request step by step. The lab **checks the structure** of the request against the book’s rules (goal, context, audience, output format, constraints); it does not run any AI. You get a ready-to-copy request at the end."),
    lessonLearned: L("جودة النتيجة بتتحدد قبل ما تبعت الطلب: كل عنصر ناقص هو تخمين هيعمله النموذج بداله {p7}.", "Output quality is decided before you hit send: every missing element is a guess the model will make for you {p7}."),
    build({ inEl, outEl, whyEl }) {
      const ex = App.isAr()
        ? { goal: "أريد معرفة سبب انخفاض مبيعات فرع الإسكندرية في سبتمبر مقارنة بأغسطس", ctx: "عندي ملف إكسل فيه أعمدة: التاريخ، الفرع، المنتج، الكمية، السعر. الانخفاض حوالي ١٢٪، والفروع التانية ثابتة", aud: "مدير المبيعات الإقليمي، مشغول وعنده ٥ دقائق", fmt: "جدول بأهم ٣ أسباب محتملة، ولكل سبب الدليل من البيانات وخطوة تحقق", con: "بدون ميزانية إضافية، والتحليل لازم يخلص النهارده، وماتفترضش أعمدة مش موجودة" }
        : { goal: "I want to know why the Alexandria branch’s sales dropped in September compared with August", ctx: "I have an Excel file with columns: date, branch, product, quantity, price. The drop is about 12%; other branches are flat", aud: "The regional sales manager, busy, with 5 minutes", fmt: "A table of the 3 most likely causes, each with evidence from the data and one check to confirm it", con: "No extra budget, analysis due today, do not assume columns that don’t exist" };
      const st = { goal: "", ctx: "", aud: "", fmt: "", con: "", ask: true, simple: true, edge: true };
      const F = [["goal", "🎯", T("١. الهدف", "1. Goal"), T("ماذا تريد بالضبط؟", "What exactly do you want?")], ["ctx", "🧭", T("٢. السياق", "2. Context"), T("الخلفية والوضع الحالي والبيانات", "Background, current situation, data")], ["aud", "👥", T("٣. الجمهور", "3. Audience"), T("لمن هذه النتيجة؟", "Who is the result for?")], ["fmt", "🧾", T("٤. شكل النتيجة", "4. Output format"), T("نقاط؟ جدول؟ خطة؟ رسالة؟", "Bullets? Table? Plan? Message?")], ["con", "🚧", T("٥. القيود والأمثلة", "5. Constraints & examples"), T("الميزانية والوقت والأسلوب وأمثلة", "Budget, time, style, examples")]];
      const inputs = {};
      inEl.append(...F.map(([k, ico, lab, ph]) => h("div", { class: "field" }, h("label", { for: "pb-" + k }, ico + " " + lab), inputs[k] = h("textarea", { id: "pb-" + k, placeholder: ph, rows: 2, oninput: (e) => { st[k] = e.target.value; draw(); } }))),
        h("div", { class: "card soft", style: { padding: "10px 12px" } }, h("b", { style: { fontSize: "13.5px" } }, "⭐ " + T("أقوى جملة في الدليل {p7}", "The strongest sentence in the guide {p7}").replace("{p7}", "")),
          [["ask", T("اسألني عن أي معلومة ناقصة قبل الإجابة", "Ask me about any missing information first")], ["simple", T("أعطني أبسط حل ممكن واشرحه ببساطة", "Give me the simplest possible solution, explained simply")], ["edge", T("اختبر الحالات الاستثنائية", "Test the edge cases")]].map(([k, l]) => h("label", { class: "check" }, h("input", { type: "checkbox", checked: st[k], onchange: (e) => { st[k] = e.target.checked; draw(); } }), l))),
        h("div", { class: "row", style: { marginTop: "10px" } }, h("button", { class: "btn sm", onclick: () => { Object.assign(st, ex); for (const k in inputs) inputs[k].value = ex[k]; draw(); } }, T("✍️ املأ بمثال", "✍️ Fill with an example")), h("button", { class: "btn sm ghost", onclick: () => { for (const k in inputs) { inputs[k].value = ""; st[k] = ""; } draw(); } }, T("مسح", "Clear"))));
      const score = (k, v) => {
        v = (v || "").trim(); if (!v) return 0;
        let s = Math.min(1, v.split(/\s+/).length / ({ goal: 9, ctx: 14, aud: 4, fmt: 5, con: 6 }[k]));
        const has = (re) => re.test(v);
        if (k === "goal" && has(/ساعد|help me|عن التقرير|about the report/i) && v.split(/\s+/).length < 6) s *= 0.4;
        if (k === "ctx" && has(/[0-9٠-٩]|عمود|أعمدة|column|ملف|file/i)) s = Math.min(1, s + 0.25);
        if (k === "aud" && has(/مدير|مبتدئ|عميل|فريق|manager|beginner|client|team|executive|تنفيذي/i)) s = Math.min(1, s + 0.3);
        if (k === "fmt" && has(/جدول|نقاط|خطة|رسالة|table|bullet|plan|message|email|بريد/i)) s = Math.min(1, s + 0.35);
        if (k === "con" && has(/[0-9٠-٩]|ميزانية|وقت|يوم|budget|time|day|لا |don.t|without|بدون/i)) s = Math.min(1, s + 0.25);
        return Math.round(s * 100);
      };
      const issues = { goal: T("بدون هدف محدد هتاخد «إجابة» بدل «نتيجة قابلة للتنفيذ».", "Without a precise goal you get an “answer” instead of an actionable result."), ctx: T("الأداة ماتعرفش عن شغلك حاجة إلا اللي تقوله؛ هتملأ الفراغ بافتراضات صامتة.", "The tool knows nothing about your work except what you say; it will fill gaps with silent assumptions."), aud: T("شرح لمبتدئ غير ملخص لمدير مشغول؛ من غير جمهور الأسلوب هيبقى عام.", "An explanation for a beginner differs from a summary for a busy manager; without an audience the style stays generic."), fmt: T("من غير شكل محدد هتحتاج جولة تعديل كاملة.", "Without a format you will need a full editing round."), con: T("القيد الواضح بيمنع اقتراحات مش قابلة للتنفيذ في ظروفك.", "A clear constraint prevents suggestions you can’t execute.") };
      const draw = () => {
        const sc = F.map(([k]) => score(k, st[k])); const avg = Math.round(sc.reduce((a, b) => a + b, 0) / 5 * 0.85 + (st.ask + st.simple + st.edge) * 5);
        const parts = [];
        if (st.ask || st.simple || st.edge) parts.push(T("قبل أن تعطيني الإجابة، ", "Before you answer, ") + [st.ask ? T("اسألني عن أي معلومة ناقصة تحتاجها", "ask me about any missing information you need") : null].filter(Boolean).join("") + (st.ask ? T(". وبعد أن أجيبك، ", ". After I reply, ") : "") + [st.simple ? T("أعطني أبسط حل ممكن واشرحه لي ببساطة", "give me the simplest possible solution and explain it simply") : null, st.edge ? T("واختبر الحالات الاستثنائية", "and test the edge cases") : null].filter(Boolean).join(T("، ", ", ")) + ".");
        if (st.goal) parts.push(T("الهدف: ", "Goal: ") + st.goal);
        if (st.ctx) parts.push(T("السياق: ", "Context: ") + st.ctx);
        if (st.aud) parts.push(T("الجمهور: ", "Audience: ") + st.aud);
        if (st.fmt) parts.push(T("شكل النتيجة: ", "Output format: ") + st.fmt);
        if (st.con) parts.push(T("القيود: ", "Constraints: ") + st.con);
        const text = parts.join("\n");
        const color = avg >= 75 ? "var(--ok)" : avg >= 45 ? "var(--amber)" : "var(--bad)";
        outEl.replaceChildren(
          h("div", { class: "kpis" }, h("div", { class: "kpi" }, h("small", null, T("جاهزية الطلب", "Request readiness")), h("b", { style: { color } }, App.pct(Math.min(100, avg)))), h("div", { class: "kpi" }, h("small", null, T("العناصر المكتملة", "Elements filled")), h("b", null, App.num(sc.filter((x) => x >= 60).length) + "/5"))),
          h("div", { class: "bars" }, F.map(([k, ico, lab], i) => h("div", { class: "b" }, h("span", null, ico + " " + lab.replace(/^[\d١-٥.]+\s*/, "")), h("i", { style: { width: Math.max(2, sc[i]) + "%", background: sc[i] >= 60 ? "var(--ok)" : sc[i] >= 30 ? "var(--amber)" : "var(--bad)" } }), h("span", null, App.pct(sc[i]))))),
          F.some(([k], i) => sc[i] < 60) ? h("div", { class: "callout warn", style: { fontSize: "14px" } }, h("b", { class: "t" }, T("هيحصل إيه لو بعته كده؟", "What happens if you send it like this?")), h("ul", { style: { margin: 0, paddingInlineStart: "1.2em" } }, F.filter(([k], i) => sc[i] < 60).map(([k]) => h("li", null, issues[k])))) : h("div", { class: "callout tip" }, "✅ " + T("طلب متكامل. الخطوة الجاية: اقرأ أول رد بعين ناقدة وصحّح في نفس المحادثة {p8}.", "A complete request. Next: read the first reply critically and correct within the same chat.").replace(" {p8}", "")),
          h("b", null, T("الطلب النهائي:", "Final request:")), h("div", { class: "prompt-text", style: { marginTop: "6px" } }, text || T("ابدأ بكتابة الهدف…", "Start by writing the goal…")),
          h("div", { class: "row", style: { marginTop: "8px" } }, h("button", { class: "btn sm primary", disabled: !text, onclick: () => App.copy(text) }, App.icon("copy", 16), t("copy")), h("button", { class: "btn sm", disabled: !text, onclick: () => { App.state.saved.unshift({ id: "b" + Date.now(), text, ts: Date.now() }); App.save(); App.emit("bookmarks"); App.toast(t("savedToNotebook")); } }, App.icon("bookmark", 16), t("save"))));
        why(whyEl, T("المختبر بيقيس وجود كل عنصر ومدى تحديده: أرقام، أسماء أعمدة، جمهور معروف، شكل نتيجة صريح، قيد واضح. ده نفس اللي الكتاب بيقول إنه بيفرق بين «نتيجة عامة لا تفيد» و«نتيجة تغيّر قرارك». الجملة الذهبية بتضيف ٣ حمايات: بتكشف الافتراضات، وبتمنع التعقيد، وبتلاقي الأخطاء قبل ما توصل للإدارة.", "The lab measures whether each element exists and how specific it is: numbers, column names, a named audience, an explicit format, a clear constraint. That is exactly what the book says separates “a generic result” from “a result that changes your decision”. The golden sentence adds three guards: it exposes assumptions, prevents complexity, and catches errors before they reach management."));
      };
      draw();
    },
  };

  /* ===== 3. Second brain: grounded retrieval with citations (TF-IDF over fictional documents) ===== */
  const DOCS = [
    { id: "leave", t: L("سياسة الإجازات", "Leave policy"), s: [L("يستحق الموظف ٢١ يوم إجازة سنوية بعد إتمام سنة خدمة.", "An employee is entitled to 21 days of annual leave after one year of service."), L("تقدم طلبات الإجازة قبل أسبوعين على الأقل عبر المدير المباشر.", "Leave requests are submitted at least two weeks ahead through the direct manager."), L("الإجازة المرضية تحتاج تقريرًا طبيًا إذا زادت عن يومين.", "Sick leave needs a medical report if it exceeds two days.")] },
    { id: "travel25", t: L("سياسة السفر ٢٠٢٥", "Travel policy 2025"), s: [L("بدل السفر اليومي داخل مصر ٤٠٠ جنيه.", "The daily travel allowance inside Egypt is 400 EGP."), L("حجز الفنادق يتم عبر إدارة المشتريات فقط.", "Hotel bookings go through the purchasing department only."), L("تسوية مصروفات السفر خلال خمسة أيام عمل من العودة.", "Travel expenses are settled within five working days of return.")] },
    { id: "travel26", t: L("تحديث سياسة السفر ٢٠٢٦", "Travel policy update 2026"), s: [L("اعتبارًا من يناير ٢٠٢٦ أصبح بدل السفر اليومي داخل مصر ٥٥٠ جنيه.", "From January 2026 the daily travel allowance inside Egypt is 550 EGP."), L("يسمح بحجز الفنادق مباشرة إذا قلت التكلفة عن الحد المعتمد.", "Direct hotel booking is allowed if the cost is below the approved limit.")] },
    { id: "returns", t: L("إجراءات المرتجعات", "Returns procedure"), s: [L("يقبل المرتجع خلال ١٤ يومًا من تاريخ الفاتورة مع وجود الفاتورة الأصلية.", "Returns are accepted within 14 days of the invoice date with the original invoice."), L("المرتجع التالف يحتاج تقرير فحص من الجودة قبل رد المبلغ.", "A damaged return needs a quality inspection report before refunding."), L("يسجل كل مرتجع في نظام المخزون في نفس اليوم.", "Every return is logged in the inventory system the same day.")] },
    { id: "purchase", t: L("دليل المشتريات", "Purchasing guide"), s: [L("أي شراء أعلى من ٢٠ ألف جنيه يحتاج ثلاثة عروض أسعار.", "Any purchase above 20,000 EGP needs three price quotes."), L("يعتمد المدير المالي طلبات الشراء الأعلى من ١٠٠ ألف جنيه.", "The finance manager approves purchase requests above 100,000 EGP.")] },
    { id: "onboard", t: L("دليل الموظف الجديد", "New employee guide"), s: [L("يحصل الموظف الجديد على حساب البريد خلال يوم العمل الأول.", "A new employee gets an email account on the first working day."), L("التدريب التعريفي يستمر ثلاثة أيام ويشمل الأمان والجودة.", "Induction training lasts three days and covers safety and quality.")] },
  ];
  ACAD.labs.retrieval = {
    icon: "📚", lesson: "u1-brain", pages: [12, 13],
    title: L("مختبر: العقل التاني يجاوب من مصادرك بس", "Lab: a second brain that answers from your sources only"),
    intro: L("٦ مستندات لشركة **افتراضية** (للتعليم بس). اسأل سؤال، واختار المصادر المفعّلة (القاعدة ٤ في الكتاب)، وشوف الإجابة جاية من أي جملة بالضبط، والتناقضات بين المصادر. البحث هنا حقيقي بطريقة مطابقة الكلمات (TF-IDF)، ومش نموذج لغوي.", "Six documents from a **fictional** company (for teaching). Ask a question, choose the active sources (rule 4 in the book), and see exactly which sentence each answer comes from, plus contradictions between sources. Retrieval here is real word matching (TF-IDF), not a language model."),
    lessonLearned: L("الإجابة الموثوقة هي اللي ترجع لجملة في مصدر تقدر تفتحه بنفسك. ولما المصادر تتعارض، الأداة لازم توريك التعارض مش تختار في صمت {p12}.", "A trustworthy answer points to a sentence in a source you can open yourself. When sources disagree, the tool must show the conflict, not pick silently {p12}."),
    build({ inEl, outEl, whyEl }) {
      const active = new Set(DOCS.map((d) => d.id)); let q = T("كم بدل السفر اليومي داخل مصر؟", "What is the daily travel allowance inside Egypt?"); let mode = "notebook";
      const samples = App.isAr() ? ["كم بدل السفر اليومي داخل مصر؟", "متى يقبل المرتجع؟", "من يعتمد طلب شراء ١٥٠ ألف جنيه؟", "كم يوم إجازة سنوية؟", "ما سياسة العمل من المنزل؟"] : ["What is the daily travel allowance inside Egypt?", "When is a return accepted?", "Who approves a 150,000 EGP purchase request?", "How many annual leave days?", "What is the work-from-home policy?"];
      const qi = h("input", { type: "text", value: q, "aria-label": T("سؤالك", "Your question"), oninput: (e) => { q = e.target.value; draw(); } });
      inEl.append(h("div", { class: "field" }, h("label", null, T("❓ سؤالك", "❓ Your question")), qi), h("div", { class: "row", style: { gap: "6px", marginBottom: "12px" } }, samples.map((s) => h("button", { class: "chip", onclick: () => { q = s; qi.value = s; draw(); } }, s))),
        h("div", { class: "field" }, h("div", { class: "lbl" }, T("📂 المصادر المفعّلة", "📂 Active sources")), DOCS.map((d) => h("label", { class: "check" }, h("input", { type: "checkbox", checked: true, onchange: (e) => { e.target.checked ? active.add(d.id) : active.delete(d.id); draw(); } }), tr(d.t)))),
        select(T("طريقة الإجابة", "Answer mode"), [["notebook", T("دفتر: من المصادر فقط", "Notebook: sources only")], ["general", T("مساعد عادي: يخلط بمعلومات عامة", "Ordinary assistant: mixes general knowledge")]], mode, (v) => { mode = v; draw(); }));
      const tok = (s) => App.norm(s).split(" ").filter((w) => w.length > 1).map((w) => (w.length > 4 && w.startsWith("ال") ? w.slice(2) : w));
      const draw = () => {
        const sents = DOCS.filter((d) => active.has(d.id)).flatMap((d) => d.s.map((s, i) => ({ d, i, text: tr(s), toks: tok(tr(s)) })));
        const N = sents.length || 1; const df = {}; sents.forEach((s) => new Set(s.toks).forEach((w) => (df[w] = (df[w] || 0) + 1)));
        const qt = tok(q);
        const scored = sents.map((s) => ({ s, score: qt.reduce((a, w) => a + (s.toks.includes(w) ? Math.log(1 + N / (df[w] || 1)) : 0), 0) })).filter((x) => x.score > 0.9).sort((a, b) => b.score - a.score).slice(0, 3);
        const nums = scored.map((x) => (x.s.text.match(/[\d٠-٩][\d٠-٩,.]*/g) || []).join(" "));
        const conflict = scored.length > 1 && scored[0].s.d.id !== scored[1].s.d.id && nums[0] && nums[1] && nums[0] !== nums[1] && scored[1].score > scored[0].score * 0.6;
        const kids = [];
        if (!active.size) kids.push(h("div", { class: "callout warn" }, T("مفيش مصادر مفعّلة. الدفتر مش هيجاوب من دماغه.", "No active sources. The notebook will not answer from thin air.")));
        else if (!scored.length) kids.push(h("div", { class: "verdict warn" }, h("big", null, T("لا يوجد دليل في المصادر", "No evidence in the sources")), T("الإجابة الأمينة هنا: «المصادر المفعّلة مابتتكلمش عن ده». ضيف المصدر الصح أو غيّر السؤال.", "The honest answer here: “the active sources do not cover this”. Add the right source or rephrase.")));
        else {
          kids.push(h("b", null, T("الإجابة مع الاستشهادات:", "Answer with citations:")));
          scored.forEach((x, k) => kids.push(h("div", { class: "card soft", style: { padding: "10px 12px", margin: "6px 0" } }, h("span", null, x.s.text + " "), h("span", { class: "badge book" }, "[" + App.num(k + 1) + "] " + tr(x.s.d.t) + " · " + T("سطر ", "line ") + App.num(x.s.i + 1)), h("small", { class: "muted", style: { display: "block" } }, T("درجة المطابقة: ", "Match score: ") + x.score.toFixed(2)))));
          if (conflict) kids.push(h("div", { class: "callout bad" }, h("b", { class: "t" }, "⚠️ " + T("تعارض بين المصادر", "Sources disagree")), T(`«${tr(scored[0].s.d.t)}» و«${tr(scored[1].s.d.t)}» بيدّوا أرقام مختلفة. الأحدث غالبًا هو الساري، لكن اتأكد بنفسك وشيل القديم من الدفتر (القاعدة ١٠: حدّث المصادر).`, `“${tr(scored[0].s.d.t)}” and “${tr(scored[1].s.d.t)}” give different numbers. The newer one is probably in force, but verify and remove the outdated one (rule 10: keep sources updated).`)));
        }
        if (mode === "general" && active.size) kids.push(h("div", { class: "callout warn" }, h("b", { class: "t" }, T("🌐 جملة من «معلومات عامة» (محاكاة)", "🌐 A “general knowledge” sentence (simulated)")), T("«في أغلب الشركات بيكون البدل بين ٣٠٠ و٦٠٠ جنيه.» الجملة دي مالهاش مصدر عندك، وده بالظبط الخلط اللي الدفتر بيمنعه.", "“In most companies the allowance is between 300 and 600 EGP.” This sentence has no source of yours, which is exactly the mixing a notebook prevents.")));
        outEl.replaceChildren(...kids);
        why(whyEl, T(`بنقسم كل مستند لجمل، ونوزن كل كلمة في سؤالك حسب ندرتها في المصادر المفعّلة (الكلمة النادرة أهم). أعلى الجمل هي الإجابة، وكل واحدة معاها مصدرها. لو قفلت «تحديث ٢٠٢٦» هتلاقي الإجابة اتغيرت لـ٤٠٠ جنيه، وده يوضح القاعدة ٤: <b>اختيار المصادر قبل كل سؤال بيغيّر الإجابة</b>.`, `Each document is split into sentences, and each word of your question is weighted by how rare it is in the active sources (rare words matter more). The top sentences become the answer, each with its source. Turn off “update 2026” and the answer changes to 400 EGP, which shows rule 4: <b>choosing sources before each question changes the answer</b>.`));
      };
      draw();
    },
  };

  /* ===== 4. Automation compass: does this task deserve a tool? ===== */
  ACAD.labs.compass = {
    icon: "🧭", lesson: "u2-compass", pages: [17, 18],
    title: L("مختبر بوصلة القرار: المهمة دي تستاهل أداة؟", "Lab: decision compass — does this task deserve a tool?"),
    intro: L("حرّك المؤشرات حسب مهمة حقيقية عندك. الحساب بيطبّق شروط الكتاب الأربعة (التكرار، الثبات، كلفة الخطأ، قابلية التحقق) ويحسب نقطة التعادل: إمتى الوقت اللي وفّرته يغطي وقت البناء.", "Move the sliders for a real task of yours. The calculation applies the book’s four conditions (repetition, stability, error cost, verifiability) and computes the break-even point: when saved time covers build time."),
    lessonLearned: L("الأداة تتبني بس لمهمة **متكررة، ثابتة القواعد، ونتيجتها قابلة للتحقق**. أي مهمة ناقصها شرط، اليد أسرع {p17}.", "A tool is built only for a **repetitive task with stable rules and a verifiable result**. Missing any condition? Doing it by hand is faster {p17}."),
    build({ inEl, outEl, whyEl }) {
      const s = { freq: 3, mins: 40, stab: "2", cost: "2", verify: true, build: 6, auto: 85 };
      inEl.append(range(T("🔁 كام مرة في الأسبوع؟", "🔁 Times per week"), 0.25, 20, 0.25, s.freq, (v) => { s.freq = v; draw(); }, (v) => (v < 1 ? T("مرة كل ", "once every ") + App.num(Math.round(1 / v)) + T(" أسابيع", " weeks") : App.num(v))),
        range(T("⏱️ دقائق في كل مرة", "⏱️ Minutes each time"), 5, 240, 5, s.mins, (v) => { s.mins = v; draw(); }),
        select(T("📏 ثبات القواعد", "📏 Rule stability"), [["3", T("ثابتة تمامًا", "Fully stable")], ["2", T("ثابتة مع استثناءات محدودة", "Stable, limited exceptions")], ["1", T("بتتغير كل مرة", "Change every time")]], s.stab, (v) => { s.stab = v; draw(); }),
        select(T("💥 كلفة الخطأ اليدوي", "💥 Cost of a manual error"), [["3", T("عالية (أرقام للإدارة/فلوس)", "High (management numbers / money)")], ["2", T("متوسطة", "Medium")], ["1", T("بسيطة", "Low")]], s.cost, (v) => { s.cost = v; draw(); }),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: s.verify, onchange: (e) => { s.verify = e.target.checked; draw(); } }), T("✔️ أقدر أقارن الناتج بنتيجة يدوية معروفة", "✔️ I can compare the output with a known manual result")),
        range(T("🛠️ ساعات بناء الأداة (تقدير)", "🛠️ Hours to build the tool (estimate)"), 1, 60, 1, s.build, (v) => { s.build = v; draw(); }),
        range(T("⚙️ نسبة الشغل اللي هتتأتمت", "⚙️ Share of work automated"), 30, 100, 5, s.auto, (v) => { s.auto = v; draw(); }, (v) => App.pct(v)));
      const draw = () => {
        const rep = s.freq >= 1 || s.freq * s.mins * 4 >= 120; const stab = +s.stab >= 2; const costHi = +s.cost >= 2; const ver = s.verify;
        const savedWeek = s.freq * s.mins * (s.auto / 100); const be = savedWeek > 0 ? (s.build * 60) / savedWeek : Infinity; const yearH = (savedWeek * 48) / 60;
        const conds = [[rep, T("التكرار: أسبوعي أو أكثر، أو شهري ياخد ساعات", "Repetition: weekly or more, or monthly but takes hours")], [stab, T("الثبات: القواعد مابتتغيرش والاستثناءات محصورة", "Stability: rules don’t change; exceptions are known")], [costHi, T("كلفة الخطأ: النسخ واللصق بيعمل أخطاء صامتة مكلفة", "Error cost: copy-paste creates costly silent errors")], [ver, T("التحقق: تقدر تقارن الناتج بنتيجة يدوية مرة واحدة", "Verifiability: you can compare against a manual result once")]];
        const ok = conds.filter((c) => c[0]).length;
        let v, cls;
        if (!stab || !ver) { v = T("بسّط أو ثبّت القواعد الأول", "Simplify or fix the rules first"); cls = "warn"; }
        else if (ok === 4 && be <= 26) { v = T("ابنِ الأداة ✅", "Build the tool ✅"); cls = "ok"; }
        else if (ok >= 3 && be <= 52) { v = T("تستاهل، بس ابدأ بأصغر نسخة", "Worth it — start with the smallest version"); cls = "ok"; }
        else { v = T("خليها يدوي دلوقتي", "Keep it manual for now"); cls = "bad"; }
        outEl.replaceChildren(h("div", { class: "verdict " + cls }, h("big", null, v), T(`الشروط المتحققة: ${App.num(ok)} من ٤`, `Conditions met: ${ok} of 4`)),
          h("div", { style: { margin: "12px 0" } }, conds.map(([c, l]) => h("div", { class: "check", style: { cursor: "default" } }, h("span", null, c ? "✅" : "❌"), h("span", null, l)))),
          h("div", { class: "kpis" }, h("div", { class: "kpi" }, h("small", null, T("وقت موفّر أسبوعيًا", "Time saved / week")), h("b", null, App.num(Math.round(savedWeek)) + T(" د", " min"))), h("div", { class: "kpi" }, h("small", null, T("نقطة التعادل", "Break-even")), h("b", null, isFinite(be) ? App.num(Math.ceil(be)) + T(" أسبوع", " wk") : "∞")), h("div", { class: "kpi ok" }, h("small", null, T("ساعات موفّرة في السنة", "Hours saved / year")), h("b", null, App.num(Math.round(yearH))))));
        why(whyEl, T(`الوقت الموفّر = ${App.num(s.freq)} مرة × ${App.num(s.mins)} دقيقة × ${App.num(s.auto)}٪ = ${App.num(Math.round(savedWeek))} دقيقة في الأسبوع. البناء بياخد ${App.num(s.build * 60)} دقيقة، فالأداة بترجّع وقتها بعد ${isFinite(be) ? App.num(Math.ceil(be)) : "∞"} أسبوع تقريبًا (محسوبة على ٤٨ أسبوع شغل). ولو القواعد بتتغير كل مرة، الأداة هتحتاج إعادة بناء مستمرة، فالأتمتة بتخسر حتى لو الأرقام شكلها حلو.`, `Saved time = ${s.freq} × ${s.mins} min × ${s.auto}% = ${Math.round(savedWeek)} min per week. Building takes ${s.build * 60} min, so the tool pays back after about ${isFinite(be) ? Math.ceil(be) : "∞"} weeks (48 working weeks a year). If the rules change every time, the tool needs constant rebuilding, so automation loses even when the numbers look good.`));
      };
      draw();
    },
  };

  /* ===== 5. Data quality first ===== */
  function dirtyData() {
    const rows = [["2026-09-01", "القاهرة|Cairo", "A", 12, 150], ["2026-09-01", "الجيزة|Giza", "B", 8, 220], ["2026-09-02", "القاهرة|Cairo", "B", 5, 220], ["02/09/2026", "الإسكندرية|Alexandria", "A", 9, 150], ["2026-09-03", "المنصورة|Mansoura", "C", 4, 480], ["2026-09-03", "القاهرة|Cairo", "A", null, 150], ["2026-09-04", "الجيزة|Giza", "C", 3, 4800], ["2026-09-04", "الجيزة|Giza", "C", 3, 4800], ["2026-09-05", "الإسكندرية|Alexandria", "B", "سبعة|seven", 220], ["2026-09-06", "القاهرة|Cairo", "C", 6, 480], ["", "", "", null, null], ["2026-09-07", "المنصورة|Mansoura", "A", 10, 150], ["2026-09-08", "القاهرة|Cairo", "B", 7, 220], ["09/09/2026", "الجيزة|Giza", "A", 11, 150], ["2026-09-12", "الإسكندرية|Alexandria", "C", 2, 480], ["2026-09-13", "القاهرة|Cairo", "A", 14, 150]];
    return rows.map((r, i) => ({ i: i + 1, date: r[0], branch: r[1], prod: r[2], qty: r[3], price: r[4] }));
  }
  ACAD.labs.quality = {
    icon: "🩺", lesson: "u2-analysis", pages: [19, 20, 24],
    title: L("مختبر: فحص الجودة قبل أي رسم", "Lab: quality check before any chart"),
    intro: L("ملف مبيعات **افتراضي** فيه مشاكل حقيقية الشكل: صف فاضي، صف مكرر، رقم مكتوب بالحروف، سعر فيه صفر زيادة، تواريخ بصيغتين، وقيمة ناقصة. شغّل تقرير الجودة، وفعّل خطوات التنظيف، وشوف إجمالي المبيعات بيتغير قد إيه.", "A **fictional** sales file with realistic problems: an empty row, a duplicate, a number written as a word, a price with an extra zero, two date formats, and a missing value. Run the quality report, switch on cleaning steps, and watch the sales total move."),
    lessonLearned: L("«نتيجة دقيقة على بيانات معطوبة تعطي قرارًا خاطئًا بثقة عالية جدًا» — فحص الجودة خطوة أولى إلزامية {p19}.", "“A precise result on broken data gives a wrong decision with very high confidence” — quality checking is a mandatory first step {p19}."),
    build({ inEl, outEl, whyEl }) {
      const fix = { empty: false, dup: false, types: false, outlier: false, dates: false };
      const steps = [["empty", T("احذف الصفوف الفاضية", "Remove empty rows")], ["dup", T("احذف المكرر", "Remove duplicates")], ["types", T("وحّد الأنواع (حروف ← أرقام، أو استبعاد)", "Fix types (words → numbers, or exclude)")], ["outlier", T("علّم الأرقام الشاذة وراجعها", "Flag and review outliers")], ["dates", T("وحّد صيغة التاريخ", "Unify date format")]];
      inEl.append(h("div", { class: "lbl", style: { fontWeight: 800, marginBottom: "6px" } }, T("🧹 خطوات التنظيف", "🧹 Cleaning steps")), steps.map(([k, l]) => h("label", { class: "check" }, h("input", { type: "checkbox", onchange: (e) => { fix[k] = e.target.checked; draw(); } }), l)),
        h("div", { class: "callout", style: { fontSize: "13.5px" } }, T("💡 القرار الصح في الصف ٦ (كمية ناقصة): ماتخمّنش رقم. استبعده وسجّل السبب في سجل التشغيل.", "💡 The right call for row 6 (missing quantity): don’t guess. Exclude it and record why in the run log.")));
      const draw = () => {
        const B = (x) => (x ? x.split("|")[App.isAr() ? 0 : 1] : "");
        let rows = dirtyData(); const log = [];
        const isEmpty = (r) => !r.date && !r.branch;
        const key = (r) => [r.date, r.branch, r.prod, r.qty, r.price].join("|");
        const report = { rows: rows.length, empty: rows.filter(isEmpty).length, dup: rows.length - new Set(rows.map(key)).size, missing: rows.filter((r) => !isEmpty(r) && r.qty == null).length, text: rows.filter((r) => typeof r.qty === "string").length, dates: rows.filter((r) => r.date && !/^\d{4}-/.test(r.date)).length, outlier: rows.filter((r) => r.price > 1000).length };
        if (fix.empty) { const n = rows.length; rows = rows.filter((r) => !isEmpty(r)); log.push(["ok", T(`حذف ${n - rows.length} صف فاضي`, `removed ${n - rows.length} empty row`)]); }
        if (fix.dup) { const seen = new Set(); const n = rows.length; rows = rows.filter((r) => (seen.has(key(r)) ? false : seen.add(key(r)))); log.push(["ok", T(`حذف ${n - rows.length} صف مكرر`, `removed ${n - rows.length} duplicate`)]); }
        if (fix.types) { rows = rows.map((r) => (typeof r.qty === "string" ? Object.assign({}, r, { qty: 7, fixed: true }) : r)); const n = rows.length; rows = rows.filter((r) => isEmpty(r) || r.qty != null); log.push(["ok", T("«سبعة» ← 7", "“seven” → 7")]); if (n !== rows.length) log.push(["warn", T(`استبعاد ${n - rows.length} صف كميته ناقصة (مسجّل)`, `excluded ${n - rows.length} row with missing qty (logged)`)]); }
        if (fix.outlier) { rows = rows.map((r) => (r.price > 1000 ? Object.assign({}, r, { price: r.price / 10, fixed: true }) : r)); log.push(["warn", T("سعر 4800 غالبًا 480 (صفر زيادة) — اتصحح بعد المراجعة", "price 4800 likely 480 (extra zero) — corrected after review")]); }
        if (fix.dates) { rows = rows.map((r) => (r.date && !/^\d{4}-/.test(r.date) ? Object.assign({}, r, { date: r.date.split("/").reverse().join("-"), fixed: true }) : r)); log.push(["ok", T("توحيد التواريخ إلى YYYY-MM-DD", "dates unified to YYYY-MM-DD")]); }
        const valid = rows.filter((r) => typeof r.qty === "number" && typeof r.price === "number");
        const total = valid.reduce((a, r) => a + r.qty * r.price, 0);
        const truth = 21540; // total after all five fixes (checked by test/labs.test.mjs)
        const err = Math.round(((total - truth) / truth) * 100);
        outEl.replaceChildren(
          h("div", { class: "kpis" },
            h("div", { class: "kpi " + (Math.abs(err) <= 1 ? "ok" : "bad") }, h("small", null, T("إجمالي المبيعات المحسوب", "Computed sales total")), h("b", null, App.num(Math.round(total)))),
            h("div", { class: "kpi " + (Math.abs(err) <= 1 ? "ok" : "bad") }, h("small", null, T("الانحراف عن الرقم الصحيح", "Deviation from the true total")), h("b", null, (err > 0 ? "+" : "") + App.pct(err))),
            h("div", { class: "kpi" }, h("small", null, T("صفوف صالحة للحساب", "Rows usable")), h("b", null, App.frac(valid.length, report.rows)))),
          h("details", { open: true }, h("summary", { style: { fontWeight: 800, cursor: "pointer" } }, "📋 " + T("تقرير الجودة (قبل التنظيف)", "Quality report (before cleaning)")),
            h("div", { class: "grid g3", style: { gap: "6px", margin: "8px 0" } }, [[T("صفوف", "rows"), report.rows], [T("فاضية", "empty"), report.empty], [T("مكررة", "duplicates"), report.dup], [T("قيم ناقصة", "missing"), report.missing], [T("نص في عمود رقمي", "text in number column"), report.text], [T("صيغة تاريخ مختلفة", "other date format"), report.dates], [T("سعر شاذ", "outlier price"), report.outlier]].map(([l, n]) => h("div", { class: "chip", style: { justifyContent: "space-between", height: "auto", padding: "4px 10px" } }, l, h("b", null, App.num(n)))))),
          h("div", { class: "tbl-wrap", style: { marginTop: "8px" } }, h("table", { class: "tbl" }, h("thead", null, h("tr", null, ["#", T("التاريخ", "Date"), T("الفرع", "Branch"), T("المنتج", "Product"), T("الكمية", "Qty"), T("السعر", "Price")].map((x) => h("th", null, x)))),
            h("tbody", null, rows.map((r) => h("tr", { class: isEmpty(r) || r.qty == null || typeof r.qty === "string" || r.price > 1000 ? "flag" : r.fixed ? "warnrow" : "" }, h("td", null, App.num(r.i)), h("td", { class: "ltr" }, r.date || "—"), h("td", null, B(r.branch) || "—"), h("td", null, r.prod || "—"), h("td", null, r.qty == null ? "—" : typeof r.qty === "string" ? B(r.qty) : App.num(r.qty)), h("td", null, r.price == null ? "—" : App.num(r.price))))))),
          log.length ? h("div", { class: "log", style: { marginTop: "10px" } }, log.map(([c, m]) => h("div", { class: c }, "[clean] ", h("span", { class: "ar" }, m)))) : null);
        why(whyEl, T(`الرقم الصحيح بعد كل التنظيف ${App.num(truth)}. الصف المكرر بيضيف مبيعات ماحصلتش، والسعر الشاذ لوحده بيضخّم الإجمالي جدًا، والرقم المكتوب بالحروف بيختفي من الحساب في صمت. عشان كده الكتاب بيقول: افحص الجودة الأول بلغة مبسطة، وبعدين حلّل.`, `The true total after all cleaning is ${truth.toLocaleString()}. The duplicate adds sales that never happened, the outlier price alone inflates the total hugely, and the number written as a word silently drops out of the calculation. That is why the book says: check quality first, in plain language, then analyse.`));
      };
      draw();
    },
  };

  /* ===== 6. Excel formula with edge cases ===== */
  ACAD.labs.formula = {
    icon: "🧮", lesson: "u1-excel", pages: [13],
    title: L("مختبر: معادلة هامش الربح والحالات الاستثنائية", "Lab: the profit-margin formula and its edge cases"),
    intro: L("نفس مثال الكتاب: أعمدة المنتج والكمية والسعر والتكلفة، والمطلوب هامش الربح كنسبة مئوية، **وتظهر الخلية فارغة لو البيانات ناقصة**. اختار صيغة المعادلة، وشوف هتنجح في الحالات الثلاث ولا لأ.", "The book’s own example: product, quantity, price and cost columns; the goal is profit margin as a percentage, **with an empty cell when data is missing**. Pick a formula version and see whether it passes the three test cases."),
    lessonLearned: L("الطلب الصح فيه ٣ عناصر: وصف دقيق لبنية البيانات، وتعريف الناتج، و**قاعدة صريحة للحالة الاستثنائية**. غياب أي واحد منهم هو سبب معظم المعادلات الغلط {p13}.", "A correct request has 3 elements: an exact data description, a defined output, and **an explicit rule for the edge case**. Missing any of them causes most wrong formulas {p13}."),
    build({ inEl, outEl, whyEl }) {
      const rows = [{ n: T("منتج أ", "Product A"), q: 10, c: 150, d: 100 }, { n: T("منتج ب", "Product B"), q: 4, c: "", d: 80 }, { n: T("منتج ج", "Product C"), q: 3, c: 0, d: 50 }, { n: T("منتج د", "Product D"), q: 7, c: 200, d: 260 }];
      const variants = [
        ["naive", "=(C2-D2)/C2", T("بدون أي حماية", "No protection")],
        ["iferror", '=IFERROR((C2-D2)/C2,"")', T("يخفي كل الأخطاء", "Hides every error")],
        ["guard", '=IF(OR(C2="",D2="",C2=0),"",(C2-D2)/C2)', T("قاعدة صريحة للناقص والصفر", "Explicit rule for missing and zero")],
      ];
      let v = "naive";
      inEl.append(h("div", { class: "lbl", style: { fontWeight: 800, marginBottom: "6px" } }, T("اختار صيغة المعادلة", "Choose a formula version")),
        variants.map(([k, f, d]) => h("label", { class: "check", style: { alignItems: "flex-start" } }, h("input", { type: "radio", name: "fv", checked: k === v, onchange: () => { v = k; draw(); } }), h("span", null, h("code", null, f), h("small", { class: "muted", style: { display: "block" } }, d)))),
        h("div", { class: "callout", style: { fontSize: "13.5px" } }, h("b", { class: "t" }, T("نموذج الطلب من الكتاب", "The book’s request template")), T("«...أريد معادلة تحسب هامش الربح كنسبة مئوية، لكن إذا كانت البيانات ناقصة تظهر الخلية فارغة بدل رسالة خطأ. اكتب المعادلة، واشرحها ببساطة، واختبرها على ثلاث حالات مختلفة.»", "“…I want a formula that computes profit margin as a percentage, but if data is missing the cell shows empty instead of an error. Write the formula, explain it simply, and test it on three different cases.”")));
      const calc = (r) => {
        const C = r.c, D = r.d;
        if (v === "naive") { if (C === "") return { out: "#VALUE!", err: true }; if (C === 0) return { out: "#DIV/0!", err: true }; return { out: Math.round(((C - D) / C) * 100) + "%" }; }
        if (v === "iferror") { if (C === "" || C === 0) return { out: T("(فارغة)", "(blank)") }; return { out: Math.round(((C - D) / C) * 100) + "%" }; }
        if (C === "" || D === "" || C === 0) return { out: T("(فارغة)", "(blank)") };
        return { out: Math.round(((C - D) / C) * 100) + "%" };
      };
      const draw = () => {
        const res = rows.map(calc);
        const tests = [[T("صف كامل (أ) = ٣٣٪", "Complete row (A) = 33%"), res[0].out === "33%"], [T("سعر ناقص (ب) = فارغة", "Missing price (B) = blank"), !res[1].err && /فارغة|blank/.test(res[1].out)], [T("سعر صفر (ج) = فارغة", "Zero price (C) = blank"), !res[2].err && /فارغة|blank/.test(res[2].out)]];
        outEl.replaceChildren(h("div", { class: "tbl-wrap" }, h("table", { class: "tbl" }, h("thead", null, h("tr", null, [T("المنتج (أ)", "Product (A)"), T("الكمية (ب)", "Qty (B)"), T("السعر (ج)", "Price (C)"), T("التكلفة (د)", "Cost (D)"), T("الهامش", "Margin")].map((x) => h("th", null, x)))),
          h("tbody", null, rows.map((r, i) => h("tr", { class: res[i].err ? "flag" : "" }, h("td", null, r.n), h("td", null, App.num(r.q)), h("td", null, r.c === "" ? "—" : App.num(r.c)), h("td", null, App.num(r.d)), h("td", { class: "ltr", style: { fontWeight: 800 } }, res[i].out)))))),
          h("b", { style: { display: "block", marginTop: "12px" } }, T("🧪 حالات الاختبار", "🧪 Test cases")), tests.map(([l, ok]) => h("div", { class: "check", style: { cursor: "default" } }, ok ? "✅" : "❌", " ", l)),
          res[3].out.startsWith("-") ? h("div", { class: "callout warn", style: { fontSize: "14px" } }, T("لاحظ منتج د: هامش سالب (بيتباع بخسارة). المعادلة صح، والرقم ده معلومة مهمة مش خطأ — متخبيهوش.", "Note product D: a negative margin (sold at a loss). The formula is right; this number is important information, not an error. Don’t hide it.")) : null);
        why(whyEl, v === "naive" ? T("من غير قاعدة للحالة الاستثنائية، الخلية الفاضية والصفر بيطلّعوا أخطاء بتبوّظ أي مجموع أو رسم بعدها.", "Without a rule for the edge case, blanks and zeros produce errors that break every total or chart after them.") : v === "iferror" ? T("IFERROR بيعدّي الاختبارات هنا، لكنه بيخفي <b>أي</b> خطأ حتى لو كان عمود غلط أو مرجع مكسور، فالخطأ بيبقى صامت. الكتاب بيقول: «الفشل الصريح أفضل من النجاح الصامت» {p18}.", "IFERROR passes the tests here, but it hides <b>every</b> error, even a wrong column or a broken reference, so mistakes become silent. The book says: “explicit failure beats silent success”.") : T("الشرط الصريح بيتعامل بس مع الحالات اللي حددتها (ناقص أو صفر)، وأي خطأ تاني هيفضل ظاهر. ده بالظبط معنى «قاعدة صريحة للحالة الاستثنائية».", "The explicit condition handles only the cases you named (missing or zero); any other error stays visible. That is exactly what “an explicit rule for the edge case” means."));
      };
      draw();
    },
  };

  /* ===== 7. Macro recorder: manual steps become code ===== */
  ACAD.labs.macro = {
    icon: "⏺️", lesson: "u1-macro", pages: [13, 14],
    title: L("مختبر: مسجّل الماكرو بيحوّل خطواتك لكود", "Lab: the macro recorder turns your steps into code"),
    intro: L("اضغط «ابدأ التسجيل»، ونفّذ خطوات تنسيق تقرير بالأزرار، وشوف كل خطوة بتتحوّل لسطر كود قدامك (كود VBA تعليمي مبسّط). بعدها شغّل الماكرو على تقرير جديد بضغطة واحدة.", "Press “Start recording”, apply report-formatting steps with the buttons, and watch each step become a line of code (simplified teaching VBA). Then run the macro on a fresh report in one click."),
    lessonLearned: L("الفايدة مزدوجة: أتمتة فورية من أول مرة، وكود مكتوب قدامك تفهم منه إزاي خطواتك اليدوية بتتحول لأوامر. واشتغل دايمًا على نسخة: إجراءات الماكرو مالهاش تراجع عادي {p14}.", "A double benefit: instant automation from the first run, and code you can read to see how manual steps become commands. Always work on a copy: macro actions can’t be undone normally {p14}."),
    build({ inEl, outEl, whyEl }) {
      let rec = false; let code = []; const fresh = () => ({ bold: false, sorted: false, num: false, width: false, freeze: false, total: false });
      let sheet = fresh();
      const data = [[T("المنتج", "Product"), T("المبيعات", "Sales")], [T("ج", "C"), 1250.5], [T("أ", "A"), 980], [T("ب", "B"), 2310.25]];
      const actions = [
        ["bold", T("عناوين عريضة", "Bold headers"), 'Range("A1:B1").Font.Bold = True'],
        ["sorted", T("ترتيب تنازلي بالمبيعات", "Sort by sales desc"), 'Range("A1:B4").Sort Key1:=Range("B2"), Order1:=xlDescending, Header:=xlYes'],
        ["num", T("تنسيق الأرقام", "Number format"), 'Range("B2:B4").NumberFormat = "#,##0"'],
        ["width", T("ضبط عرض الأعمدة", "Autofit columns"), 'Columns("A:B").AutoFit'],
        ["freeze", T("تثبيت صف العناوين", "Freeze header row"), 'Rows("2:2").Select: ActiveWindow.FreezePanes = True'],
        ["total", T("إضافة صف إجمالي", "Add a total row"), 'Range("B5").Formula = "=SUM(B2:B4)"'],
      ];
      const recBtn = h("button", { class: "btn sm primary", onclick: () => { rec = !rec; if (rec) { code = []; sheet = fresh(); } draw(); } });
      inEl.append(h("div", { class: "row" }, recBtn, h("button", { class: "btn sm", onclick: () => { if (!code.length) return App.toast(T("سجّل خطوات الأول", "Record some steps first")); sheet = fresh(); draw(); setTimeout(() => { sheet = fresh(); code.forEach((c) => (sheet[c.k] = true)); draw(true); }, 450); } }, "▶️ " + T("شغّل الماكرو على تقرير جديد", "Run macro on a fresh report"))),
        h("div", { class: "grid g2", style: { gap: "6px", marginTop: "12px" } }, actions.map(([k, l, c]) => h("button", { class: "btn sm", onclick: () => { sheet[k] = true; if (rec && !code.some((x) => x.k === k)) code.push({ k, c }); draw(); } }, l))),
        h("div", { class: "callout warn", style: { fontSize: "13.5px", marginTop: "12px" } }, "⚠️ " + T("قاعدة لا تُكسر: شغّل على نسخة. ووحدات صغيرة لكل وظيفة، مش ماكرو وحش واحد.", "Unbreakable rule: run on a copy. Small units, one job each — not one monster macro.")));
      const draw = (ran) => {
        recBtn.textContent = rec ? "⏹️ " + T("أوقف التسجيل", "Stop recording") : "⏺️ " + T("ابدأ التسجيل", "Start recording");
        let rows = data.slice(1).slice(); if (sheet.sorted) rows.sort((a, b) => b[1] - a[1]);
        const fmt = (n) => (sheet.num ? Math.round(n).toLocaleString("en-US") : String(n));
        outEl.replaceChildren(
          h("div", { class: "row", style: { marginBottom: "6px" } }, rec ? h("span", { class: "badge", style: { background: "var(--bad-soft)", color: "var(--bad)" } }, "● REC") : null, ran ? h("span", { class: "badge ok" }, T("اتنفّذ في ثانية ✅", "Done in a second ✅")) : null),
          h("div", { class: "tbl-wrap", style: { maxHeight: "none" } }, h("table", { class: "tbl", style: { tableLayout: sheet.width ? "auto" : "fixed" } },
            h("thead", null, h("tr", { style: sheet.freeze ? { boxShadow: "0 3px 0 var(--accent)" } : null }, data[0].map((x) => h("th", { style: { fontWeight: sheet.bold ? 900 : 400 } }, x)))),
            h("tbody", null, rows.map((r) => h("tr", null, h("td", null, r[0]), h("td", { class: "ltr" }, fmt(r[1])))), sheet.total ? h("tr", null, h("td", { style: { fontWeight: 900 } }, T("الإجمالي", "Total")), h("td", { class: "ltr", style: { fontWeight: 900 } }, fmt(rows.reduce((a, r) => a + r[1], 0)))) : null))),
          h("b", { style: { display: "block", marginTop: "12px" } }, T("الكود المسجّل:", "Recorded code:")),
          h("div", { class: "log" }, h("div", { class: "dim" }, "Sub FormatReport()"), code.map((c) => h("div", null, "    " + c.c)), h("div", { class: "dim" }, "End Sub")));
        why(whyEl, T("كل زرار ضغطته وانت بتسجّل اتحوّل لسطر أوامر بيقول لإكسل يعمل نفس الحركة. الماكرو مش «ذكي»: بيعيد نفس الخطوات بالظبط، فلو بنية الملف اتغيرت (عمود اتنقل مثلًا) ممكن ينفّذ صح على المكان الغلط. هنا ييجي دور المرحلة التالتة: توصف العملية للذكاء الاصطناعي عشان يكتب كود أذكى بيتعامل مع الاستثناءات.", "Every button you pressed while recording became a command telling Excel to repeat the action. A macro is not “smart”: it replays the exact steps, so if the file’s structure changes (a moved column, say) it may run correctly on the wrong place. That is where stage three comes in: describe the process to AI so it writes smarter code that handles exceptions."));
      };
      draw();
    },
  };
})();
