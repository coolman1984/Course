/* Scene definitions (designed in LTR coordinates on an 800×450 canvas; Arabic mirrors automatically).
   B = box, X = text, R = arrow, M = meter, S = stage. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  const B = (id, x, y, w, h, ar, en, o = {}) => Object.assign({ k: "box", id, x, y, w, h, l: u(ar, en) }, o);
  const X = (id, x, y, w, h, ar, en, o = {}) => Object.assign({ k: "text", id, x, y, w, h, l: u(ar, en) }, o);
  const R = (from, to, inn = 0, o = {}) => Object.assign({ k: "arrow", from, to, in: inn }, o);
  const M = (id, x, y, w, h, vals, ar, en, o = {}) => Object.assign({ k: "meter", id, x, y, w, h, vals, l: u(ar, en) }, o);
  const S = (tar, ten, car, cen, d = 4, vb) => ({ t: u(tar, ten), c: u(car, cen), d, vb });
  const s2 = (ar, en) => ({ s2: u(ar, en) });
  const inf = (ar, en) => ({ info: u(ar, en) });

  A.scenes = [
    /* ---------- U0 ---------- */
    { id: "modelflow", title: u("إزاي النموذج بيجاوب على سؤالك؟", "How does a model answer you?"),
      stages: [
        S("سؤالك", "Your question", "بتكتب سؤال بلغتك. النموذج مش بيشوف «كلمات» زي ما إحنا بنشوفها.", "You type a question in your language. The model doesn’t see “words” the way we do.", 3.5),
        S("تقطيع إلى توكنات", "Split into tokens", "النص بيتقسّم لقطع صغيرة اسمها **توكنات** — والعربي بياخد توكنات أكتر من الإنجليزي لنفس المعنى.", "The text is cut into small pieces called **tokens** — Arabic uses more tokens than English for the same meaning.", 4),
        S("النموذج ونافذة السياق", "The model and its context window", "النموذج فيه مليارات أرقام جوّاه (**معاملات**) اتعلّمت أنماط اللغة من بيانات ضخمة. **نافذة السياق** هي اللي يقدر يقراها ويفتكرها في الطلب الواحد.", "The model is billions of internal numbers (**parameters**) that learned language patterns from huge data. The **context window** is what it can read and remember in one request.", 5, [250, 10, 520, 330]),
        S("توقّع الكلمة التالية", "Predict the next piece", "النموذج بيتوقع أنسب قطعة جاية، ويضيفها وبيتوقع اللي بعدها… وكده لحد ما الإجابة تكمل.", "The model predicts the most fitting next piece, adds it, predicts the next… until the answer is complete.", 5),
        S("الإجابة", "The answer", "الإجابة بتتبني قطعة ورا قطعة من الأنماط اللي اتعلّمها ومن السياق اللي اديتهوله.", "The answer is built piece by piece from learned patterns and the context you gave.", 3.5),
        S("لماذا يخطئ أحيانًا؟", "Why is it sometimes wrong?", "لو السياق ناقص، بيكمّل بالأرجح مش بالأصح — فيديك معلومة غلط بثقة. عشان كده السياق الكويس والمراجعة البشرية أساس.", "When context is missing it completes with the most likely, not the most correct — confidently wrong. Hence good context and human review.", 5),
      ],
      els: [
        B("q", 30, 190, 140, 70, "سؤالك", "Your question", { tone: "ink", ico: "msg", ...inf("نص باللغة اللي بتتكلمها عادي.", "Text in your natural language.") }),
        B("tok", 210, 190, 130, 70, "توكنات", "Tokens", { in: 1, tone: "violet", ...s2("قطع صغيرة من النص", "small text pieces"), ...inf("الوحدة المحاسبية للنموذج؛ التسعير بالمليون توكن (صفحة 34).", "The model’s billing unit; pricing is per million tokens (page 34).") }),
        B("ctx", 380, 40, 200, 64, "نافذة السياق", "Context window", { in: 2, tone: "amber", ...s2("اللي بيشوفه في الطلب الواحد", "what it sees per request"), hi: [5], ...inf("مليون توكن ≈ كتاب ضخم (صفحة 34).", "One million tokens ≈ a huge book (page 34).") }),
        B("model", 380, 150, 200, 130, "النموذج", "The model", { in: 2, tone: "blue", ico: "cpu", ...s2("معاملات اتعلّمت أنماط", "parameters that learned patterns"), hi: [2], ...inf("المعاملات (الأوزان) مخزن معرفة النموذج، وتتقاس بالمليار (B).", "Parameters (weights) store the model’s knowledge, measured in billions (B).") }),
        B("next", 620, 120, 150, 70, "القطعة التالية", "Next piece", { in: 3, tone: "violet", ...s2("الأنسب", "the most fitting"), hi: [3] }),
        B("ans", 620, 290, 150, 70, "الإجابة", "The answer", { in: 4, tone: "mint", ico: "check" }),
        B("warn", 210, 330, 220, 70, "تخمين واثق", "Confident guess", { in: 5, tone: "rose", ...s2("لما السياق ينقص", "when context is missing"), ...inf("ممكن يديك معلومة غلط بثقة (صفحة 41).", "It can give wrong information confidently (page 41).") }),
        R("q", "tok", 1, { flow: true, until: 3 }),
        R("tok", "model", 2, { flow: true }),
        R("ctx", "model", 2),
        R("model", "next", 3, { flow: true }),
        R("next", "model", 3, { bend: 40, l: u("وبعدين اللي بعدها…", "then the next…") }),
        R("next", "ans", 4, { flow: true }),
        R("warn", "model", 5, { bend: -30 }),
      ] },

    { id: "ladder", title: u("سلّم التدرج: تمان درجات", "The ladder: eight steps"),
      stages: [
        S("البداية: الاستخدام الشخصي", "Start: personal use", "**مساعد شخصي** بيسأل ويكتب ويلخّص، وبعدين **عقل تاني** بيحفظ المعرفة عشان ماتبدأش من صفر.", "A **personal assistant** asks, writes and summarises; then a **second brain** keeps knowledge so you never start from zero.", 4),
        S("تكليف بمهام كاملة", "Handing over whole tasks", "**موظف رقمي** بتكلّفه تحليل ومراجعة، وبعدين **أتمتة** بتحوّل الخطوات المتكررة لعمليات بتشتغل لوحدها.", "A **digital employee** you assign analysis and review, then **automation** turns repeated steps into self-running processes.", 4),
        S("البناء", "Building", "**أداة** بسيطة سهل تستخدمها، وبعدين **تطبيق** عملي يخدم الشغل الحقيقي.", "A simple **tool**, then a practical **application** for real work.", 4),
        S("المنظومة والفريق", "System and team", "**نظام** بيربط العمليات والبيانات، وبعدين **فريق رقمي ذكي** بينسّق بين حلول ووكلاء كتير.", "A **system** connecting processes and data, then a **smart digital team** coordinating solutions and agents.", 4),
        S("التحول", "The transformation", "في الأول بتقول: «أنا عارف أستخدم الذكاء الاصطناعي». وفي الآخر: «عندي مشكلة، وعارف أحوّلها لنظام ذكي».", "At first you say: “I know how to use AI.” At the end: “I have a problem, and I know how to turn it into a smart system.”", 5),
      ],
      els: [
        ...[["مساعد شخصي", "Assistant"], ["عقل ثانٍ", "Second brain"], ["موظف رقمي", "Digital employee"], ["أتمتة", "Automation"], ["أداة", "Tool"], ["تطبيق", "Application"], ["نظام", "System"], ["فريق رقمي", "Digital team"]].map((n, i) =>
          B("r" + i, 18 + i * 97, 360 - i * 40, 90, 62, n[0], n[1], { in: Math.floor(i / 2), tone: i < 2 ? "violet" : i < 4 ? "blue" : i < 6 ? "mint" : "amber", ...s2(String(i + 1), String(i + 1)), hi: [Math.floor(i / 2)] })),
        ...[0, 1, 2, 3, 4, 5, 6].map((i) => R("r" + i, "r" + (i + 1), Math.floor((i + 1) / 2))),
        X("from", 20, 30, 330, 60, "«أنا عارف أستخدم الذكاء الاصطناعي»", "“I know how to use AI”", { in: 4, size: 17, color: "--ink-3" }),
        X("to", 360, 30, 420, 60, "«عارف أحوّل مشكلتي لنظام ذكي»", "“I know how to turn my problem into a smart system”", { in: 4, size: 18, color: "--accent" }),
      ] },

    { id: "datadecision", title: u("من البيانات للقرار", "From data to decision"),
      stages: [
        S("يجمع", "Collect", "بيجمع من ملفات Excel وPDF وملفات الشركة ومن أكتر من مصدر.", "It gathers from Excel, PDFs, company files and multiple sources.", 3),
        S("يحلل", "Analyse", "بيكتشف الأنماط والمشاكل وبيقارن التقارير.", "It finds patterns and problems and compares reports.", 3),
        S("يختصر", "Summarise", "بيحوّل المستندات الطويلة لملخص تنفيذي وبيطلع القرارات والأرقام.", "It turns long documents into an executive summary and pulls out decisions and numbers.", 3),
        S("يقارن", "Compare", "بيقارن الخطط والمستندات وبيكتشف التناقضات والنواقص.", "It compares plans and documents and spots contradictions and gaps.", 3),
        S("يقترح", "Suggest", "بيبني سيناريوهات وبيقيّم البدائل والمخاطر والفرص — والقرار ليك.", "It builds scenarios and weighs options, risks and opportunities — the decision stays yours.", 3.5),
        S("السر: جودة البيانات والسياق", "The secret: data and context quality", "كل ما البيانات والسياق يبقوا أحسن، قيمة النتيجة بتزيد.", "The better the data and context, the more valuable the result.", 4.5),
      ],
      els: [
        ...[["يجمع", "Collect", "db"], ["يحلل", "Analyse", "chart"], ["يختصر", "Summarise", "note"], ["يقارن", "Compare", "compare"], ["يقترح", "Suggest", "spark"]].map((n, i) => B("d" + i, 20 + i * 155, 150, 130, 80, n[0], n[1], { in: i, tone: i === 4 ? "mint" : "blue", ico: n[2], hi: [i] })),
        ...[0, 1, 2, 3].map((i) => R("d" + i, "d" + (i + 1), i + 1, { flow: true })),
        B("dec", 300, 300, 200, 64, "قرارك", "Your decision", { in: 4, tone: "solid", ico: "target" }),
        R("d4", "dec", 4, { flow: true }),
        M("val", 120, 410, 560, 14, [0.15, 0.3, 0.45, 0.6, 0.75, 1], "قيمة النتيجة", "Value of the result", { tone: "mint", in: 0 }),
      ] },

    { id: "chatagent", title: u("من شات لوكيل ذكي", "From chat to smart agent"),
      stages: [
        S("الشات التقليدي", "Traditional chat", "بتسأل سؤال وبتاخد إجابة، وخلاص.", "You ask, you get an answer, and that’s it.", 3.5),
        S("المساعد الشخصي", "Personal assistant", "بيفهمك، وبيفتكر السياق، وبيساعدك على طول.", "It understands you, remembers context and keeps helping.", 4),
        S("الوكيل الذكي", "Smart agent", "بيخطط، وبيستخدم أدوات، وبينفّذ مهام، وبيتابع النتائج.", "It plans, uses tools, carries out tasks and follows up on results.", 5),
        S("المشترك بينها", "What they share", "كل حاجة بتبدأ من **سياق واضح وبرومبت ذكي** — البرومبت جزء من السياق.", "Everything starts with **clear context and a smart prompt** — the prompt is part of the context.", 4.5),
      ],
      els: [
        X("h1", 20, 20, 220, 40, "الشات التقليدي", "Traditional chat", { size: 16 }),
        B("q1", 50, 90, 160, 60, "سؤال", "Question", { tone: "ink", ico: "msg" }),
        B("a1", 50, 250, 160, 60, "إجابة", "Answer", { tone: "ink" }),
        R("q1", "a1", 0, { flow: true, until: 1 }),
        X("h2", 285, 20, 220, 40, "مساعد شخصي", "Personal assistant", { in: 1, size: 16 }),
        B("you", 300, 90, 180, 60, "إنت", "You", { in: 1, tone: "ink", ico: "users" }),
        B("as", 300, 250, 180, 60, "المساعد", "The assistant", { in: 1, tone: "blue" }),
        B("mem", 300, 360, 180, 56, "سياق محفوظ", "Saved context", { in: 1, tone: "amber", hi: [3] }),
        R("you", "as", 1, { bend: 30, flow: true }), R("as", "you", 1, { bend: 30 }), R("mem", "as", 1),
        X("h3", 560, 20, 220, 40, "وكيل ذكي", "Smart agent", { in: 2, size: 16 }),
        B("goal", 580, 75, 180, 52, "هدف", "Goal", { in: 2, tone: "solid", ico: "target", hi: [3] }),
        B("plan", 540, 160, 120, 52, "يخطط", "Plans", { in: 2, tone: "violet" }),
        B("tools", 680, 160, 110, 52, "أدوات", "Tools", { in: 2, tone: "violet", ico: "wrench" }),
        B("act", 540, 260, 120, 52, "ينفذ", "Acts", { in: 2, tone: "violet" }),
        B("check", 680, 260, 110, 52, "يتابع", "Checks", { in: 2, tone: "mint" }),
        R("goal", "plan", 2), R("plan", "act", 2, { flow: true }), R("tools", "act", 2), R("act", "check", 2, { flow: true }), R("check", "plan", 2, { bend: -30, l: u("بيصحّح", "corrects") }),
      ] },

    { id: "limits", title: u("استخدمه بذكاء… وماتعتمدش عليه لوحده", "Use it wisely… don’t rely on it alone"),
      stages: [
        S("قوي لكنه ليس معصومًا", "Powerful, not infallible", "ممكن يديك معلومة غلط بثقة، وممكن يفهم السؤال غلط لو السياق ناقص.", "It can be confidently wrong and can misread a question when context is missing.", 4),
        S("حدّد الهدف وأعطه السياق", "Define the goal, give context", "جودة النتيجة بتعتمد على جودة البيانات والتعليمات، ومش هيعرف بيانات شركتك إلا لو وفرتها له.", "Result quality depends on data and instructions; it knows your company’s data only if you provide it.", 4),
        S("راجع وتأكد من المصادر", "Review and verify sources", "بعض المعلومات ممكن تكون قديمة أو ناقصة؛ القرارات الحساسة محتاجة مراجعة بشرية.", "Some information may be outdated or incomplete; sensitive decisions need human review.", 4),
        S("أنت تتخذ القرار", "You make the decision", "هو بيدعم القرار، بس مش هو اللي بيتحمّل مسؤوليته. وماتدخلش بيانات حساسة من غير ضوابط واضحة.", "It supports the decision but doesn’t own it. And never enter sensitive data without clear controls.", 4),
        S("أفضل نتيجة", "The best result", "**إنسان يفكّر + بيانات كويسة + ذكاء اصطناعي.**", "**A thinking human + good data + AI.**", 4.5),
      ],
      els: [
        B("ai", 320, 30, 160, 64, "ذكاء اصطناعي", "AI", { tone: "blue", ico: "cpu" }),
        B("err", 540, 30, 200, 64, "ممكن يغلّط بثقة", "Can be confidently wrong", { tone: "rose", out: 4 }),
        R("ai", "err", 0, { out: 4 }),
        ...[["حدّد الهدف", "Define the goal", "target"], ["اديله السياق", "Give context", "note"], ["راجع النتيجة", "Review the result", "eye"], ["اتأكد من المصادر", "Verify sources", "book"], ["خد القرار", "Decide", "check"]].map((n, i) => B("w" + i, 20 + i * 156, 170, 136, 70, n[0], n[1], { in: [1, 1, 2, 2, 3][i], tone: i === 4 ? "solid" : "mint", ico: n[2], hi: [[1, 1, 2, 2, 3][i]], out: 4 })),
        ...[0, 1, 2, 3].map((i) => R("w" + i, "w" + (i + 1), [1, 2, 2, 3][i], { flow: true, out: 4 })),
        B("hum", 60, 300, 170, 70, "إنسان يفكّر", "A thinking human", { in: 4, tone: "amber", ico: "users" }),
        X("p1", 240, 310, 40, 50, "+", "+", { in: 4, size: 28 }),
        B("data", 290, 300, 170, 70, "بيانات كويسة", "Good data", { in: 4, tone: "amber", ico: "db" }),
        X("p2", 470, 310, 40, 50, "+", "+", { in: 4, size: 28 }),
        B("ai2", 520, 300, 200, 70, "ذكاء اصطناعي", "AI", { in: 4, tone: "amber", ico: "cpu" }),
        X("eq", 200, 390, 400, 46, "= أحسن نتيجة", "= the best result", { in: 4, size: 22, color: "--mint" }),
      ] },

    /* ---------- U1 ---------- */
    { id: "equation", title: u("المعادلة اللي بتحكم كل برومبت ناجح", "The governing equation of every good prompt"),
      stages: [
        S("طلب عادي", "An ordinary request", "«ساعدني في التقرير» — الأداة مش عارفة إنت عاوز إيه وليه وللمين، فبتطلعلك نتيجة عامة.", "“Help me with the report” — the tool doesn’t know what, why or for whom, so the result is generic.", 4),
        S("1 · هدف واضح", "1 · A clear goal", "ليس «ساعدني في التقرير» بل «عايز أعرف ليه المبيعات نزلت».", "Not “help me with the report” but “I want to know why sales fell”.", 3.5),
        S("2 · سياق كافٍ", "2 · Enough context", "الخلفية والوضع الحالي: الأداة مش عارفة عن شغلك حاجة إلا اللي إنت بتقولهولها.", "Background and situation: the tool knows nothing about your work except what you tell it.", 3.5),
        S("3 · طلب محدد", "3 · A specific request", "المهمة نفسها بالظبط: حلّل، قارن، اقترح… بمعايير واضحة.", "The task itself, precisely: analyse, compare, suggest… with clear criteria.", 3.5),
        S("4 · شكل النتيجة", "4 · Output format", "نقاط؟ جدول؟ خطة؟ رسالة؟ لما تحدّد الشكل بتوفر جولة تعديل كاملة.", "Bullets, table, plan or message? Setting the format saves a whole revision round.", 3.5),
        S("= نتيجة قابلة للتنفيذ", "= An actionable result", "الأربع عناصر مع بعض بيدّوك خطة أو قرار أو أداة — مش مجرد إجابة.", "All four together give a plan, a decision or a tool — not just an answer.", 4.5),
      ],
      els: [
        B("weak", 250, 40, 300, 64, "«ساعدني في التقرير»", "“Help me with the report”", { tone: "ink", ico: "msg", out: 1 }),
        B("g", 330, -80, 150, 80, "هدف واضح", "Clear goal", { in: 1, tone: "blue", ico: "target", mv: { 1: [20, 150] }, hi: [1], ...inf("إنت عاوز إيه بالظبط؟", "What exactly do you want?") }),
        B("c", 330, -80, 150, 80, "سياق كافٍ", "Enough context", { in: 2, tone: "blue", ico: "note", mv: { 2: [215, 150] }, hi: [2], ...inf("الخلفية والوضع الحالي.", "Background and current situation.") }),
        B("r", 330, -80, 150, 80, "طلب محدد", "Specific request", { in: 3, tone: "blue", ico: "pen", mv: { 3: [410, 150] }, hi: [3], ...inf("المهمة بالظبط ومعاييرها.", "The exact task and its criteria.") }),
        B("f", 330, -80, 150, 80, "شكل النتيجة", "Output format", { in: 4, tone: "blue", ico: "layers", mv: { 4: [605, 150] }, hi: [4], ...inf("نقاط، جدول، خطة، رسالة…", "Bullets, table, plan, message…") }),
        X("p1", 170, 165, 45, 50, "+", "+", { in: 2, size: 28 }), X("p2", 365, 165, 45, 50, "+", "+", { in: 3, size: 28 }), X("p3", 560, 165, 45, 50, "+", "+", { in: 4, size: 28 }),
        B("bad", 270, 300, 260, 70, "نتيجة عامة", "A generic result", { tone: "rose", out: 5, ...s2("صح بس مش بتفيد", "true but useless") }),
        B("good", 250, 300, 300, 74, "نتيجة قابلة للتنفيذ", "An actionable result", { in: 5, tone: "solid", ico: "star", hi: [5] }),
        M("q", 200, 420, 400, 14, [0.12, 0.35, 0.58, 0.78, 0.9, 1], "قابلية التنفيذ", "Actionability", { tone: "mint" }),
      ] },

    { id: "technique", title: u("أقوى تقنية: جملة واحدة بتحل تلات مشاكل", "The strongest technique: one sentence, three fixes"),
      stages: [
        S("ثلاث مشكلات صامتة", "Three silent problems", "الأداة بتخمّن افتراضاتها في السكت، وبتميل للتعقيد، ومش بتختبر الحالات الاستثنائية.", "The tool silently guesses its assumptions, drifts into complexity, and doesn’t test edge cases.", 4),
        S("«اسألني عن الناقص»", "“Ask me what’s missing”", "بتجبر الأداة تكشف افتراضاتها بدل ما تخمّنها في السكت.", "Forces the tool to reveal its assumptions instead of silently guessing.", 3.5),
        S("«أبسط حل ممكن»", "“The simplest possible solution”", "بيمنع التعقيد اللي مش هتعرف تصونه أو تفهمه بعدين.", "Prevents complexity you won’t be able to maintain or understand later.", 3.5),
        S("«اختبر الحالات الاستثنائية»", "“Test the edge cases”", "بيكشف الأخطاء قبل ما توصل لتقرير الإدارة، مش بعده.", "Catches errors before they reach the management report, not after.", 3.5),
        S("اجعلها بداية كل طلب مهم", "Start every important request with it", "جملة واحدة بتحل تلات مشاكل مرة واحدة.", "One sentence fixes three problems at once.", 4),
      ],
      els: [
        B("p1", 40, 60, 200, 70, "افتراضات صامتة", "Silent assumptions", { tone: "rose", out: 1 }),
        B("p2", 300, 60, 200, 70, "تعقيد زايد", "Needless complexity", { tone: "rose", out: 2 }),
        B("p3", 560, 60, 200, 70, "أخطاء ما اتختبرتش", "Untested errors", { tone: "rose", out: 3 }),
        B("s1", 40, 60, 200, 70, "اسألني عن الناقص", "Ask me what’s missing", { in: 1, tone: "mint", ico: "msg", hi: [1] }),
        B("s2", 300, 60, 200, 70, "أبسط حل", "Simplest solution", { in: 2, tone: "mint", ico: "spark", hi: [2] }),
        B("s3", 560, 60, 200, 70, "اختبر الاستثناءات", "Test edge cases", { in: 3, tone: "mint", ico: "check", hi: [3] }),
        B("res1", 40, 200, 200, 64, "افتراضات مكشوفة", "Assumptions revealed", { in: 1, tone: "ink" }),
        B("res2", 300, 200, 200, 64, "حل تفهمه وتصونه", "A fix you can maintain", { in: 2, tone: "ink" }),
        B("res3", 560, 200, 200, 64, "غلطة تتكشف بدري", "Errors caught early", { in: 3, tone: "ink" }),
        R("s1", "res1", 1, { flow: true }), R("s2", "res2", 2, { flow: true }), R("s3", "res3", 3, { flow: true }),
        B("all", 200, 330, 400, 76, "جملة واحدة في أول كل طلب مهم", "One sentence at the start of every important request", { in: 4, tone: "solid", ico: "star" }),
        R("res1", "all", 4), R("res2", "all", 4), R("res3", "all", 4),
      ] },

    { id: "convo", title: u("إدارة المحادثة: الدورة الخماسية", "Managing the conversation: the five-step loop"),
      stages: [
        S("1 · اطلب", "1 · Ask", "ابدأ بطلب مبني على الخمس عناصر.", "Start with a request built on the five elements.", 3),
        S("2 · اقرأ بعين ناقدة", "2 · Read critically", "ماتاخدش أول نتيجة وتمشي. اقرأ كأنك المراجع.", "Don’t take the first result and run. Read like a reviewer.", 3),
        S("3 · حدّد الخلل بدقة", "3 · Pinpoint the flaw", "طويلة ومشتتة؟ صح بس مش مناسبة ليك؟ شكلها متاخدة على الخفيف؟", "Long and scattered? Right but unfit? Looks made up?", 3.5),
        S("4 · صحّح في المحادثة نفسها", "4 · Fix in the same chat", "المبتدئ بيفتح محادثة جديدة؛ الشاطر بيصحّح هنا عشان السياق موجود.", "Beginners start a new chat; skilled users correct course here because the context is here.", 4),
        S("5 · اعتمد أو كرّر", "5 · Adopt or repeat", "لو ظبطت، اعتمدها؛ وإلا كرّر الدورة.", "If it’s good, adopt it; otherwise repeat the loop.", 3.5),
      ],
      els: [
        ...[["اطلب", "Ask", "msg"], ["اقرأ بعين ناقدة", "Read critically", "eye"], ["حدّد الخلل", "Pinpoint the flaw", "target"], ["صحّح هنا", "Fix here", "pen"], ["اعتمد أو كرّر", "Adopt or repeat", "check"]].map((n, i) => {
          const a = -Math.PI / 2 + (i / 5) * Math.PI * 2; return B("c" + i, 400 + Math.cos(a) * 165 - 70, 220 + Math.sin(a) * 160 - 30, 140, 60, n[0], n[1], { in: i, tone: i === 3 ? "solid" : "blue", ico: n[2], hi: [i] });
        }),
        ...[0, 1, 2, 3, 4].map((i) => R("c" + i, "c" + ((i + 1) % 5), i === 4 ? 4 : i + 1, { flow: true, bend: 18 })),
        X("mid", 300, 195, 200, 56, "في المحادثة نفسها", "In the same chat", { in: 3, size: 17, color: "--accent" }),
      ] },

    { id: "daily", title: u("دورة الشغل اليومي", "The daily work cycle"),
      stages: [
        S("افهم", "Understand", "حدّد الهدف والسياق قبل أي حاجة.", "Set the goal and context first.", 3),
        S("نظّم", "Organise", "رتّب المعلومات: المهام والوقت والطاقة الذهنية.", "Arrange the information: tasks, time and mental energy.", 3),
        S("قرّر", "Decide", "قارن واختار — وإيه اللي ممكن يتأجل بأمان.", "Compare and choose — and what can safely wait.", 3),
        S("نفّذ", "Execute", "حوّل الاختيار لخطوات بمسؤول وموعد.", "Turn the choice into steps with an owner and a date.", 3),
        S("راجع", "Review", "حلّل وكرّر: إيه اللي اتأخر وليه، وإيه التصحيح.", "Analyse and repeat: what slipped, why, and the fix.", 3.5),
      ],
      els: [
        ...[["افهم", "Understand", "target"], ["نظّم", "Organise", "layers"], ["قرّر", "Decide", "compare"], ["نفّذ", "Execute", "route"], ["راجع", "Review", "restart"]].map((n, i) => B("d" + i, 20 + i * 155, 170, 135, 80, n[0], n[1], { in: i, tone: "blue", ico: n[2], hi: [i] })),
        ...[0, 1, 2, 3].map((i) => R("d" + i, "d" + (i + 1), i + 1, { flow: true })),
        R("d4", "d0", 4, { bend: 120, l: u("الدورة بتتكرر", "the cycle repeats") }),
        X("t", 150, 330, 500, 60, "اطلب نتيجة تنفع تنفيذها، مش إجابة بس", "Ask for an actionable result, not just an answer", { in: 4, size: 18, color: "--accent" }),
      ] },

    { id: "strategic", title: u("ليه البرومبت الاستراتيجي بينفع؟", "Why the strategic prompt works"),
      stages: [
        S("القفز إلى الحل", "Jumping to the solution", "أغلب القرارات الوحشة بتيجي من إنك تبدأ بالحل قبل ما تفهم المشكلة.", "Most bad decisions come from starting with the solution before understanding the problem.", 4),
        S("الفهم ثم التحليل ثم التشخيص", "Understand, analyse, diagnose", "البرومبت بيفرض ترتيب ماتقدرش تقفز عليه.", "The prompt enforces an order that can’t be skipped.", 4),
        S("المخاطر والبدائل", "Risks and options", "اكشف المخاطر والفرص، وبعدين اعرض البدائل.", "Reveal risks and opportunities, then lay out options.", 3.5),
        S("القرار والخطوات", "Decision and steps", "انصح بأحسن قرار، توقّع النتائج، وبعدين حوّله لخطوات تنفيذ.", "Recommend the best decision, forecast outcomes, then turn it into steps.", 4),
        S("افصل الحقائق عن الافتراضات", "Separate facts from assumptions", "واذكر المعلومات الناقصة قبل ما تبدأ.", "And state missing information before starting.", 4),
      ],
      els: [
        B("pb", 30, 40, 130, 60, "مشكلة", "Problem", { tone: "ink" }),
        B("sol", 300, 40, 150, 60, "حل سريع", "Quick fix", { tone: "rose" }),
        B("bad", 600, 40, 170, 60, "قرار سيئ", "Bad decision", { tone: "rose" }),
        R("pb", "sol", 0, { flow: true, until: 1 }), R("sol", "bad", 0),
        ...[["افهم", "Understand"], ["حلّل", "Analyse"], ["شخّص", "Diagnose"], ["المخاطر", "Risks"], ["البدائل", "Options"], ["القرار", "Decision"], ["الخطوات", "Steps"]].map((n, i) => B("s" + i, 24 + i * 108, 200, 96, 64, n[0], n[1], { in: [1, 1, 1, 2, 2, 3, 3][i], tone: i >= 5 ? "mint" : "blue", hi: [[1, 1, 1, 2, 2, 3, 3][i]] })),
        ...[0, 1, 2, 3, 4, 5].map((i) => R("s" + i, "s" + (i + 1), [1, 1, 2, 2, 3, 3][i], { flow: true })),
        B("facts", 140, 330, 220, 64, "حقائق", "Facts", { in: 4, tone: "mint", ico: "check" }),
        B("assum", 440, 330, 220, 64, "افتراضات", "Assumptions", { in: 4, tone: "amber", ico: "info" }),
      ] },

    { id: "brain", title: u("دورة العقل التاني", "The second-brain cycle"),
      stages: [
        S("اجمع المصادر", "Collect sources", "تقارير رسمية ووثائق الشركة وأبحاث وأدلة تشغيل — وبعدين المصادر الثانوية.", "Official reports, company documents, research and manuals — then secondary sources.", 3.5),
        S("صفِّ المصادر", "Filter sources", "استخدم البحث تكتشف المصادر، وبعدين راجعها بنفسك وحط الأحسن بس.", "Use search to discover sources, review them yourself, and add only the best.", 3.5),
        S("دفتر واحد لهدف واحد", "One notebook, one goal", "كل الإجابات بتيجي من مصادرك إنت بس، مش من بحث برّه.", "Every answer comes only from your sources, not outside search.", 4),
        S("اكتشف التناقضات", "Find contradictions", "المصادر بتختلف فين؟ كل مصدر بيأكد إيه؟ إيه الادعاءات ضعيفة الدليل؟", "Where do sources disagree? What does each confirm? Which claims have weak evidence?", 4),
        S("استنتاجات موثقة", "Documented conclusions", "كل إجابة معاها استشهاد يرجّعك للمكان الأصلي — عشان تتأكد بنفسك.", "Every answer carries a citation back to the original place — so you verify yourself.", 4),
        S("حدّث باستمرار", "Keep updating", "وإلا الدفتر بعد شهرين بيتحوّل لمتحف رقمي.", "Otherwise in two months the notebook becomes a digital museum.", 3.5),
      ],
      els: [
        B("s1", 20, 40, 150, 56, "تقرير رسمي", "Official report", { tone: "blue", ico: "book" }),
        B("s2", 20, 120, 150, 56, "وثيقة الشركة", "Company document", { tone: "blue", ico: "page", hi: [3] }),
        B("s3", 20, 200, 150, 56, "دليل تشغيل", "Manual", { tone: "blue", ico: "note", hi: [3] }),
        B("s4", 20, 280, 150, 56, "مقال ضعيف", "Weak article", { tone: "rose", out: 1 }),
        B("nb", 300, 130, 190, 110, "الدفتر", "The notebook", { in: 2, tone: "solid", ico: "db", ...s2("هدف واحد", "one goal") }),
        R("s1", "nb", 2, { flow: true }), R("s2", "nb", 2, { flow: true }), R("s3", "nb", 2, { flow: true }),
        B("ctr", 300, 300, 190, 60, "تناقض بين مصدرين", "Two sources disagree", { in: 3, out: 5, tone: "rose" }),
        B("ans", 600, 130, 180, 110, "إجابة باستشهاد", "Cited answer", { in: 4, tone: "mint", ico: "check", ...s2("[1] [2]", "[1] [2]") }),
        R("nb", "ans", 4, { flow: true }),
        B("upd", 600, 300, 180, 60, "تحديث على طول", "Continuous update", { in: 5, tone: "amber", ico: "restart" }),
        R("upd", "nb", 5, { flow: true, bend: 30 }),
      ] },

    { id: "leap", title: u("القفزة: من معادلة لقرار", "The leap: from a formula to a decision"),
      stages: [
        S("بيانات خام", "Raw data", "نقطة البداية: «أنا عارف النتيجة اللي عايزها، بس مش عارف أكتب المعادلة إزاي».", "The starting point: “I know the result I want but not how to write the formula.”", 3.5),
        S("معادلة في إكسل", "An Excel formula", "الأداة بتبني المعادلات وبشرحها وبصلّح اللي موجود.", "The tool builds formulas, explains them and fixes existing ones.", 3.5),
        S("ماكرو مسجّل", "A recorded macro", "مسجّل الماكرو بيحوّل خطواتك اليدوية لكود من غير ما تكتب حرف.", "The macro recorder turns your manual steps into code without typing a letter.", 3.5),
        S("كود يكتبه الذكاء الاصطناعي", "AI-written code", "المطلوب منك توصف العملية بالظبط: الملف، الأوراق، الأعمدة، الخطوات، الناتج.", "Your job is to describe the process precisely: file, sheets, columns, steps, output.", 4),
        S("عرض جاهز للإدارة", "A management-ready pitch", "سلسلة واحدة بتبدأ ببيانات خام وبتنتهي بقرار.", "One chain that starts with raw data and ends with a decision.", 4),
      ],
      els: [
        B("raw", 20, 360, 140, 60, "بيانات خام", "Raw data", { tone: "ink", ico: "db" }),
        B("xl", 170, 280, 150, 64, "معادلة إكسل", "Excel formula", { in: 1, tone: "blue", ico: "chart", hi: [1] }),
        B("mc", 330, 200, 150, 64, "ماكرو", "Macro", { in: 2, tone: "blue", ico: "film", hi: [2] }),
        B("cd", 490, 120, 150, 64, "كود بالذكاء الاصطناعي", "AI-written code", { in: 3, tone: "blue", ico: "code", hi: [3] }),
        B("pr", 640, 40, 150, 64, "عرض للإدارة", "Management pitch", { in: 4, tone: "solid", ico: "screen", hi: [4] }),
        R("raw", "xl", 1, { flow: true }), R("xl", "mc", 2, { flow: true }), R("mc", "cd", 3, { flow: true }), R("cd", "pr", 4, { flow: true }),
        X("msg", 20, 40, 380, 70, "المهارة الجديدة: توصف العملية بالظبط، مش تكتب الكود", "The new skill: describing the process precisely, not writing code", { in: 3, size: 16, color: "--accent" }),
      ] },

    { id: "macro", title: u("مسجّل الماكرو وكود الذكاء الاصطناعي", "The macro recorder and AI code"),
      stages: [
        S("نسّق التقرير يدويًا مرة", "Format the report by hand once", "اعرف الخطوات بنفسك الأول.", "Know the steps yourself first.", 3),
        S("شغّل التسجيل ونفّذ الخطوات", "Start recording, do the steps", "الأداة بتسجّل خطواتك وإنت بتنفّذها بإيدك.", "The tool records your steps as you do them.", 3.5),
        S("أوقف التسجيل", "Stop recording", "الخطوات بتتحوّل تلقائيًا لكود جاهز — بتقراه فبتفهم خطواتك بقت أوامر إزاي.", "The steps become ready code — you read it and see how your steps turn into commands.", 4),
        S("اضغط زرًا واحدًا", "Press one button", "التقرير بينسّق لوحده: أتمتة فورية من أول مرة.", "And the report formats itself: instant automation, first time.", 3.5),
        S("قاعدتان لا تُكسران", "Two unbreakable rules", "دايمًا اشتغل على نسخة (الماكرو مفيهوش تراجع عادي)، ووحدات صغيرة مش وحش كبير.", "Always work on a copy (macros have no normal undo), and small modules, not one monster.", 4.5),
      ],
      els: [
        ...[["نسّق يدويًا", "Format by hand", "pen"], ["شغّل التسجيل", "Start recording", "film"], ["نفّذ الخطوات", "Do the steps", "route"], ["أوقف التسجيل", "Stop recording", "pause"], ["زر واحد", "One button", "play"]].map((n, i) => B("m" + i, 20 + i * 155, 110, 135, 76, n[0], n[1], { in: [0, 1, 1, 2, 3][i], tone: i === 4 ? "solid" : "blue", ico: n[2], hi: [[0, 1, 1, 2, 3][i]] })),
        ...[0, 1, 2, 3].map((i) => R("m" + i, "m" + (i + 1), [1, 1, 2, 3][i], { flow: true })),
        B("code", 330, 240, 150, 56, "كود تقراه", "Code you can read", { in: 2, tone: "violet", ico: "code" }),
        R("m3", "code", 2),
        B("r1", 80, 340, 280, 64, "دايمًا اشتغل على نسخة", "Always work on a copy", { in: 4, tone: "rose", ico: "shield" }),
        B("r2", 440, 340, 280, 64, "وحدات صغيرة مش وحش كبير", "Small modules, not a monster", { in: 4, tone: "rose", ico: "layers" }),
      ] },

    { id: "capstone", title: u("من التقرير لعرض يقنع الإدارة", "From report to a convincing pitch"),
      stages: [
        S("عقل المحتوى — الدفتر", "Content brain — the notebook", "مسؤول عن الصدق والمصادر: بيعمل شرائح تتعدّل ويرجّع كل معلومة لمصدرها.", "Owns truth and sources: makes editable slides and ties each fact to its source.", 4),
        S("مدير القصة — المساعد المحادثي", "Story director — the chat assistant", "مسؤول عن الرسالة والترتيب: الرسالة إيه؟ الجمهور مين؟ أهم تلات أفكار؟ إيه اللي يتشال؟", "Owns message and order: what’s the message, who’s the audience, top three ideas, what to cut?", 4),
        S("الاستوديو البصري — مولّد الصور", "Visual studio — the image generator", "مسؤول عن الفهم البصري: صور افتتاحية ومخططات وإنفوجرافيك.", "Owns visual understanding: opening images, diagrams, infographics.", 4),
        S("الترتيب مهم", "Order matters", "ماتبدأش بالتصميم أبدًا: المصدر الأول، وبعدين القصة، وبعدين الصورة.", "Never start with design: source first, then story, then image.", 4),
        S("خلط الأدوار هو الخطأ القاتل", "Mixing roles is the fatal mistake", "بيعمل عرض حلو من غير معنى، أو صح من غير تأثير.", "It produces a pretty deck without meaning, or a correct one without impact.", 4),
      ],
      els: [
        B("nb", 40, 90, 200, 90, "الدفتر", "The notebook", { tone: "blue", ico: "db", ...s2("الصدق والمصادر", "truth & sources"), hi: [0, 3] }),
        B("ch", 300, 90, 200, 90, "المساعد المحادثي", "Chat assistant", { in: 1, tone: "violet", ico: "msg", ...s2("الرسالة والترتيب", "message & order"), hi: [1, 3] }),
        B("im", 560, 90, 200, 90, "مولّد الصور", "Image generator", { in: 2, tone: "amber", ico: "eye", ...s2("الفهم البصري", "visual understanding"), hi: [2, 3] }),
        R("nb", "ch", 3, { flow: true, l: u("الأول", "first") }), R("ch", "im", 3, { flow: true, l: u("بعدين", "then") }),
        B("deck", 280, 260, 240, 76, "عرض إداري ينتهي بقرار", "A pitch ending in a decision", { in: 3, tone: "solid", ico: "screen" }),
        R("im", "deck", 3),
        B("mix", 40, 360, 300, 60, "عرض حلو من غير معنى", "Pretty deck, no meaning", { in: 4, tone: "rose" }),
        B("mix2", 460, 360, 300, 60, "عرض صح من غير تأثير", "Correct deck, no impact", { in: 4, tone: "rose" }),
      ] },

    { id: "plan30", title: u("خطة التلاتين يوم", "The 30-day plan"),
      stages: [
        S("الأسبوع 1 — الصياغة", "Week 1 — wording", "اكتب تاني كل طلب مهم بالخمس عناصر وابدأه بـ«اسألني عن أي معلومة ناقصة».", "Rewrite every important request with the five elements and start it with “ask me about anything missing”.", 3.5),
        S("الأسبوع 2 — الإنتاجية", "Week 2 — productivity", "طبّق برومبتات تنظيم اليوم والاجتماعات كل يوم. الهدف: توفّر ساعة في الأسبوع على الأقل.", "Use the day and meeting prompts daily. Goal: save at least an hour a week.", 3.5),
        S("الأسبوع 3 — القرار والمعرفة", "Week 3 — decisions & knowledge", "طبّق البرومبت الاستراتيجي على قرار حقيقي، واعمل دفتر واحد لمشروع واحد.", "Apply the strategic prompt to a real decision and create one notebook for one project.", 3.5),
        S("الأسبوع 4 — الأتمتة", "Week 4 — automation", "سجّل ماكرو لأصغر مهمة بتكررها، وبعدين البرومبت الذهبي للكود.", "Record a macro for your smallest recurring task, then use the golden code prompt.", 3.5),
        S("قاعدة الخطة", "The plan’s rule", "ماتنتقلش لأسبوع جديد قبل ما اللي قبله يبقى عادة. أسبوع متقن أحسن من أربعة مقروءة على عجل.", "Don’t move on until the previous week is a habit. One mastered week beats four rushed ones.", 4.5),
      ],
      els: [
        ...[["الصياغة", "Wording"], ["الإنتاجية", "Productivity"], ["القرار والمعرفة", "Decisions & knowledge"], ["الأتمتة", "Automation"]].map((n, i) => B("w" + i, 40 + i * 185, 320 - i * 80, 160, 70, n[0], n[1], { in: i, tone: ["violet", "blue", "mint", "amber"][i], ...s2(["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4"][i], ["Week 1", "Week 2", "Week 3", "Week 4"][i]), hi: [i] })),
        ...[0, 1, 2].map((i) => R("w" + i, "w" + (i + 1), i + 1, { flow: true })),
        X("rule", 30, 30, 460, 80, "عادة مش بتفكّر فيها قبل ما تنتقل", "A habit you don’t think about before moving on", { in: 4, size: 18, color: "--accent" }),
      ] },

    /* ---------- U2 ---------- */
    { id: "spec", title: u("مواصفة المهمة: خمس عناصر قبل أي سطر", "Task spec: five elements before any line"),
      stages: [
        S("1 · المشكلة", "1 · The problem", "إيه اللي بيتعمل بإيدك النهارده، وبياخد كام دقيقة — مش تقدير.", "What’s done by hand today, and how long it takes in minutes — not a guess.", 3),
        S("2 · المدخلات", "2 · Inputs", "الملفات الفعلية: أسماؤها وأماكنها وبنيتها الحقيقية، مش الشكل المثالي.", "The actual files: names, locations and real structure, not the ideal one.", 3),
        S("3 · القواعد", "3 · Rules", "منطق الشغل زي ما بيتطبّق على الأرض، مع كل استثناء وحالة نقص.", "The business logic as actually applied, with every exception and gap.", 3),
        S("4 · النتيجة", "4 · Result", "شكل المخرج بالظبط، وفين بيروح، ومين هيتسلّمه.", "The exact output shape, where it goes, and who receives it.", 3),
        S("5 · الاختبارات — الأهم", "5 · Tests — the most important", "حالات محددة تثبت إن الناتج صح. غيابها هو السبب الأشيع لفشل الأدوات.", "Specific cases proving the output is right. Missing them is the commonest cause of failed tools.", 4.5),
        S("أداة يُعتمد عليها", "A tool you can rely on", "لما تحدّد الاختبارات قبل البناء، «كود شكله صح» بيتحوّل لأداة في دورة تشغيل شهرية.", "Defining tests before building turns “code that looks right” into a tool for a monthly run.", 4),
      ],
      els: [
        ...[["المشكلة", "Problem", "flag"], ["المدخلات", "Inputs", "folder"], ["القواعد", "Rules", "gear"], ["النتيجة", "Result", "page"], ["الاختبارات", "Tests", "check"]].map((n, i) => B("e" + i, 330, -90, 140, 70, n[0], n[1], { in: i, tone: i === 4 ? "amber" : "blue", ico: n[2], mv: { [i]: [20 + i * 156, 120] }, hi: [i] })),
        B("tool", 280, 300, 240, 80, "أداة تقدر تعتمد عليها", "A reliable tool", { in: 5, tone: "solid", ico: "wrench" }),
        ...[0, 1, 2, 3, 4].map((i) => R("e" + i, "tool", 5)),
      ] },

    { id: "compass", title: u("بوصلة القرار: إمتى المهمة تستاهل أداة؟", "Decision compass: when does a task deserve a tool?"),
      stages: [
        S("التكرار", "Frequency", "بتتنفّذ أسبوعي أو أكتر، أو شهري بس بتاخد ساعات.", "Done weekly or more, or monthly but taking hours.", 3),
        S("الثبات", "Stability", "قواعدها مش بتتغيّر، والاستثناءات قليلة وممكن تحصرها من الأول.", "Its rules don’t change; exceptions are few and can be listed upfront.", 3),
        S("كلفة الخطأ اليدوي", "Manual error cost", "النسخ واللصق بيطلع أخطاء صامتة ما بتتكشفش إلا بعد ما يفوت الوقت.", "Copy-paste creates silent errors found too late.", 3),
        S("قابلية التحقق", "Verifiability", "تقدر تقارن ناتج الأداة بناتج يدوي معروف ولو مرة.", "The tool’s output can be compared with a known manual result, even once.", 3),
        S("القرار", "The decision", "لو الشروط اتحققت، تستاهل أداة؛ وإلا أسرع بالإيد.", "If the conditions hold, build a tool; otherwise it stays faster by hand.", 3.5),
        S("أربع قواعد تحمي الأداة", "Four rules that protect the tool", "ماتلمسش الأصل، سجل تشغيل، وحدات صغيرة، الفشل الصريح أحسن من النجاح الصامت.", "Don’t touch originals, run log, small modules, explicit failure beats silent success.", 4.5),
      ],
      els: [
        ...[["التكرار", "Frequency", "restart"], ["الثبات", "Stability", "shield"], ["كلفة الخطأ", "Error cost", "info"], ["قابلية التحقق", "Verifiable", "check"]].map((n, i) => B("c" + i, 20 + i * 195, 50, 170, 70, n[0], n[1], { in: i, tone: "blue", ico: n[2], hi: [i] })),
        B("dec", 280, 200, 240, 76, "تستحق أداة؟", "Worth a tool?", { in: 4, tone: "solid", ico: "target" }),
        ...[0, 1, 2, 3].map((i) => R("c" + i, "dec", 4, { flow: true })),
        ...[["ماتلمسش الأصل", "Don’t touch originals"], ["سجل تشغيل", "Run log"], ["وحدات صغيرة", "Small modules"], ["فشل صريح", "Explicit failure"]].map((n, i) => B("g" + i, 20 + i * 195, 340, 170, 60, n[0], n[1], { in: 5, tone: "mint", ico: "shield" })),
        ...[0, 1, 2, 3].map((i) => R("dec", "g" + i, 5)),
      ] },

    { id: "prefer", title: u("ترتيب الأفضلية: إيه اللي تجربه الأول؟", "Preference order: what to try first?"),
      stages: [
        S("1 · ملف أو واجهة برمجية", "1 · File or API", "الأثبت: تتعامل مع البيانات نفسها، مش اللي ظاهر على الشاشة.", "Most stable: work directly with the data, not what’s on screen.", 3.5),
        S("2 · التحكم المباشر في التطبيق", "2 · Direct app control", "إكسل عبر xlwings، أو المتصفح عبر Playwright — أداة بتكلّم البرنامج مباشرة.", "Excel via xlwings or the browser via Playwright — a tool that talks to the app directly.", 3.5),
        S("3 · عناصر واجهة البرنامج", "3 · App UI elements", "pywinauto لبرامج سطح المكتب المغلقة: عبر أزرارها الحقيقية مش مكانها على الشاشة.", "pywinauto for closed desktop apps: via real buttons, not screen positions.", 3.5),
        S("4 · محاكاة المستخدم", "4 · User simulation", "PyAutoGUI بيحرّك الماوس وبيكتب — الأكثر عرضة للانكسار. ملاذ أخير بس، ودوّن السبب في الكود.", "PyAutoGUI moves the mouse and types — the most fragile. Last resort only; note why in the code.", 4),
        S("القاعدة الحاكمة", "The governing rule", "كل ما المستوى يطلع، احتمال الانكسار مع أي تحديث بيقل. النزول لازم يكون قرار واعي.", "The higher the level, the less likely it breaks on updates. Going lower must be a conscious decision.", 4.5),
      ],
      els: [
        ...[["ملف / واجهة برمجية", "File / API", "db"], ["تحكم مباشر", "Direct control", "code"], ["عناصر الواجهة", "UI elements", "layers"], ["محاكاة المستخدم", "User simulation", "eye"]].map((n, i) => B("l" + i, 60, 30 + i * 100, 300, 74, n[0], n[1], { in: i, tone: ["mint", "blue", "amber", "rose"][i], ico: n[2], hi: [i], ...s2(["الأثبت", "xlwings · Playwright", "pywinauto", "PyAutoGUI — الملاذ الأخير"][i], ["most stable", "xlwings · Playwright", "pywinauto", "PyAutoGUI — last resort"][i]) })),
        ...[0, 1, 2].map((i) => R("l" + i, "l" + (i + 1), i + 1)),
        M("brk", 440, 210, 320, 18, [0.1, 0.3, 0.55, 0.95, 0.95], "احتمال الانكسار مع التحديث", "Chance of breaking on updates", { tone: "rose" }),
        X("rule", 420, 280, 360, 80, "اطلع لأعلى قد ما تقدر", "Stay as high as you can", { in: 4, size: 20, color: "--accent" }),
      ] },

    { id: "drill7", title: u("لما التقرير يقول: «الكفاءة نزلت 7%»", "When the report says “efficiency fell 7%”"),
      stages: [
        S("رقم وحده", "A number alone", "الرقم لوحده مش بيوصلك لقرار.", "A number alone leads to no decision.", 3.5, [250, 130, 300, 190]),
        S("فكّك: أين؟", "Break it down: where?", "أي موديل أو منتج؟ أي خط إنتاج أو فرع؟ أي وردية أو فترة؟", "Which model or product? Which line or branch? Which shift or period?", 4.5),
        S("فكّك: لماذا؟", "Break it down: why?", "إيه التوقفات وأسبابها؟ الخامات نقصت؟ تغيير الموديل أخد قد إيه؟", "What stoppages and causes? Material shortage? How long did the model changeover take?", 4.5),
        S("فكّك: متى وكم؟", "Break it down: when and how much?", "من إمتى بدأ؟ حصل قبل كده؟ الكمية كانت أقل من العادي؟ الأثر المالي إيه؟", "Since when? Has it happened before? Was output below normal? What’s the financial impact?", 4.5),
        S("سبب محدد قابل للمعالجة", "A specific, fixable cause", "التفكيك الصح بيحوّل رقم عام لسبب محدد — وبعدين قرار.", "Proper breakdown turns a general number into a specific cause — then a decision.", 4.5, [180, 220, 440, 230]),
      ],
      els: [
        B("kpi", 300, 190, 200, 70, "الكفاءة −7%", "Efficiency −7%", { tone: "rose", ico: "chart", hi: [0] }),
        B("a1", 40, 40, 150, 52, "أي منتج؟", "Which product?", { in: 1, tone: "blue" }),
        B("a2", 325, 40, 150, 52, "أي خط؟", "Which line?", { in: 1, tone: "blue", hi: [4] }),
        B("a3", 610, 40, 150, 52, "أي وردية؟", "Which shift?", { in: 1, tone: "blue" }),
        B("b1", 20, 190, 160, 52, "التوقفات", "Stoppages", { in: 2, tone: "violet", hi: [4] }),
        B("b2", 620, 160, 160, 52, "نقص الخامات؟", "Materials short?", { in: 2, tone: "violet" }),
        B("b3", 620, 225, 160, 52, "تغيير الموديل", "Model changeover", { in: 2, tone: "violet" }),
        B("c1", 40, 340, 150, 52, "منذ متى؟", "Since when?", { in: 3, tone: "amber" }),
        B("c2", 230, 340, 150, 52, "حصل قبل كده؟", "Happened before?", { in: 3, tone: "amber" }),
        B("c3", 420, 340, 150, 52, "الكمية؟", "Output?", { in: 3, tone: "amber" }),
        B("c4", 610, 340, 150, 52, "الأثر المالي", "Financial impact", { in: 3, tone: "amber" }),
        ...["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3", "c4"].map((id) => R("kpi", id, { a: 1, b: 2, c: 3 }[id[0]])),
        B("cause", 250, 260, 300, 70, "خط 2 · توقفات الوردية الليلية", "Line 2 · night-shift stoppages", { in: 4, tone: "solid", ico: "target", mv: { 4: [250, 260] } }),
      ] },

    { id: "stations", title: u("القصة الإدارية: سبع محطات بدل حيطة رسوم", "The executive story: seven stations, not a wall of charts"),
      stages: [
        S("ماذا حدث؟ جيد أم سيئ؟", "What happened? Good or bad?", "رقم واحد كبير مالوش تأويل مزدوج، وبعدين مقارنة فورية بالخطة والفترة اللي فاتت والهدف.", "One big unambiguous number, then an instant comparison with plan, prior period and target.", 4),
        S("أين المشكلة؟ لماذا حدثت؟", "Where is the problem? Why?", "رسم تفاعلي واحد للتصفية والتعمق، وتحليل الأسباب مرتب من الأكثر تأثيرًا.", "One interactive chart for filtering and drilling, and causes ranked by impact.", 4),
        S("أين التركيز؟ ماذا لو استمر؟", "Where to focus? What if it continues?", "أعلى تلات مناطق تأثير بس، وتوقع بسيط بأثر رقمي واضح.", "Only the top three impact areas, and a simple forecast with a clear numeric effect.", 4),
        S("ماذا نفعل الآن؟", "What do we do now?", "تلات قرارات واضحة بس، كل واحد بمسؤول وموعد.", "Only three clear decisions, each with an owner and a date.", 4),
        S("معيار النجاح الوحيد", "The only success criterion", "الرسالة تتفهم في أول تلاتين ثانية، والتعمق لمن عايزه بس.", "The message is understood in the first thirty seconds; deeper detail only for those who want it.", 4),
      ],
      els: [
        ...[["ماذا حدث؟", "What happened?"], ["جيد أم سيئ؟", "Good or bad?"], ["أين المشكلة؟", "Where?"], ["لماذا؟", "Why?"], ["أين التركيز؟", "Focus where?"], ["ماذا لو استمر؟", "If it continues?"], ["ماذا نفعل الآن؟", "What now?"]].map((n, i) => {
          const row = i < 4 ? 0 : 1; const col = row ? 3 - (i - 4) : i;
          return B("s" + i, 30 + col * 190 + (row ? 95 : 0), row ? 250 : 80, 160, 72, n[0], n[1], { in: [0, 0, 1, 1, 2, 2, 3][i], tone: i === 6 ? "solid" : "blue", ...s2(String(i + 1), String(i + 1)), hi: [[0, 0, 1, 1, 2, 2, 3][i]] });
        }),
        ...[0, 1, 2, 3, 4, 5].map((i) => R("s" + i, "s" + (i + 1), [0, 1, 1, 2, 2, 3][i], { flow: true })),
        X("t30", 200, 380, 400, 50, "⏱ الرسالة في 30 ثانية", "⏱ The message in 30 seconds", { in: 4, size: 20, color: "--mint" }),
      ] },

    { id: "pipeline10", title: u("المشروع المرجعي: عشر خطوات من غير تدخل يدوي", "Reference project: ten steps, no manual work"),
      stages: [
        S("المراقبة والقراءة", "Watch and read", "مراقبة المجلد وبعدين قراءة تلقائية لكل ملف جديد.", "Watch the folder, then read each new file automatically.", 3.5),
        S("التنظيف والجودة", "Clean and check", "تنظيف ودمج، وبعدين فحص الجودة قبل أي استنتاج.", "Clean and merge, then check quality before any conclusion.", 3.5),
        S("التحليل واكتشاف المشاكل", "Analyse and detect", "محرك التحليل، وبعدين اكتشاف المشاكل والشذوذ.", "The analysis engine, then detecting problems and anomalies.", 3.5),
        S("المؤشرات والرسوم", "KPIs and charts", "حساب المؤشرات، وبعدين بناء الرسوم.", "Compute KPIs, then build charts.", 3.5),
        S("صفحة تفاعلية وملف واحد يُرسل", "Interactive page, one file sent", "صفحة تفاعلية، وبعدين ملف واحد يتبعت ويتفتح بنقرة.", "An interactive page, then one file sent and opened in a click.", 4),
      ],
      els: [
        ...[["مراقبة المجلد", "Watch folder"], ["قراءة تلقائية", "Auto read"], ["تنظيف ودمج", "Clean & merge"], ["فحص الجودة", "Quality check"], ["محرك التحليل", "Analysis engine"], ["اكتشاف المشاكل", "Detect issues"], ["حساب المؤشرات", "Compute KPIs"], ["بناء الرسوم", "Build charts"], ["صفحة تفاعلية", "Interactive page"], ["ملف واحد يتبعت", "One file sent"]].map((n, i) => {
          const row = i < 5 ? 0 : 1; const col = row ? 4 - (i - 5) : i;
          return B("p" + i, 20 + col * 156, row ? 260 : 80, 136, 70, n[0], n[1], { in: Math.floor(i / 2), tone: i === 9 ? "solid" : i === 3 ? "amber" : "blue", ...s2(String(i + 1), String(i + 1)), hi: [Math.floor(i / 2)] });
        }),
        ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => R("p" + i, "p" + (i + 1), Math.floor((i + 1) / 2), { flow: true })),
      ] },

    /* ---------- U3 ---------- */
    { id: "prep", title: u("تهيئة البيانات: خمس دقايق توفّر ساعات", "Data prep: five minutes save hours"),
      stages: [
        S("جدول مبعثر", "A messy sheet", "عناوين متراكبة، خلايا مدمجة، صفوف فاضية، أعمدة اسمها Column1، تواريخ بصيغ مختلفة.", "Stacked headers, merged cells, blank rows, columns named Column1, mixed date formats.", 4),
        S("صف عناوين واحد وأسماء دالة", "One header row, meaningful names", "«تاريخ البيع» أوضح بكتير من «Column1».", "“Sale date” is far clearer than “Column1”.", 3.5),
        S("لا فراغات ولا خلايا مدمجة", "No gaps, no merged cells", "امسح الصفوف والأعمدة الفاضية، وفكّ الخلايا المدمجة بالكامل.", "Delete empty rows and columns, and fully unmerge cells.", 3.5),
        S("صيغ موحدة وورقة محورية", "Unified formats, one core sheet", "وحّد التواريخ والأرقام، وماتخلطش نص بأرقام، وابدأ بورقة واحدة.", "Unify dates and numbers, don’t mix text and numbers, and start with one sheet.", 3.5),
        S("جاهز للوحة", "Ready for the dashboard", "بيانات مهيّأة = مؤشرات صح من أول محاولة.", "Prepared data = correct indicators on the first try.", 3.5),
      ],
      els: [
        B("m1", 40, 60, 220, 56, "عناوين متراكبة", "Stacked headers", { tone: "rose", out: 1 }),
        B("m2", 40, 140, 220, 56, "Column1", "Column1", { tone: "rose", out: 1 }),
        B("m3", 40, 220, 220, 56, "صفوف فارغة", "Blank rows", { tone: "rose", out: 2 }),
        B("m4", 40, 300, 220, 56, "خلايا مدمجة", "Merged cells", { tone: "rose", out: 2 }),
        B("m5", 40, 380, 220, 56, "تواريخ مختلطة", "Mixed dates", { tone: "rose", out: 3 }),
        B("ok1", 300, 60, 220, 56, "صف عناوين واحد", "One header row", { in: 1, tone: "mint", ico: "check" }),
        B("ok2", 300, 140, 220, 56, "تاريخ البيع", "Sale date", { in: 1, tone: "mint", ico: "check" }),
        B("ok3", 300, 220, 220, 56, "لا فراغات", "No gaps", { in: 2, tone: "mint", ico: "check" }),
        B("ok4", 300, 300, 220, 56, "خلايا مفكوكة", "Unmerged cells", { in: 2, tone: "mint", ico: "check" }),
        B("ok5", 300, 380, 220, 56, "صيغة واحدة", "One format", { in: 3, tone: "mint", ico: "check" }),
        B("dash", 580, 190, 190, 90, "لوحة صحيحة", "A correct dashboard", { in: 4, tone: "solid", ico: "chart" }),
        ...["ok1", "ok2", "ok3", "ok4", "ok5"].map((id) => R(id, "dash", 4, { flow: true })),
      ] },

    { id: "dash8", title: u("تمان مراحل من الجدول للوحة", "Eight stages from sheet to dashboard"),
      stages: [
        S("الغرض والمؤشرات", "Purpose and KPIs", "ابدأ من القرار اللي اللوحة هتخدمه، واطلب من النموذج 3–5 أسئلة الأول، وبعدين اشتق المؤشرات من بنية البيانات.", "Start from the decision; have the model ask 3–5 questions first, then derive KPIs from the data.", 4),
        S("اعتماد التصميم قبل التنفيذ", "Approve the design first", "مراجعة المخطط كنص أسرع وأرخص من مراجعة مخرَج منفّذ.", "Reviewing a text outline is faster and cheaper than reviewing a built output.", 3.5),
        S("البناء والتفاعل", "Build and interact", "نفّذ على التصور المعتمد، وبعدين ضيف فلاتر بتحدّث كل حاجة مع بعض.", "Build to the approved outline, then add filters that update everything together.", 3.5),
        S("الهوية البصرية", "Visual identity", "تعديلات قصيرة ورا بعض أدق: لون، حجم أرقام، وضع داكن، طباعة.", "Short successive tweaks work best: colour, number size, dark mode, print.", 3),
        S("التحقق — الأكثر حساسية", "Verify — the most sensitive", "مخرجات النماذج ممكن تغلط؛ المراجعة البشرية شرط قبل أي مشاركة.", "Model outputs can be wrong; human review is required before sharing.", 4),
        S("الحفظ والمشاركة", "Save and share", "ملف واحد بيفتح على أي جهاز. التحديث من نظام حي مرحلة بعدين ومحتاجة ربط مصدر.", "One file that opens anywhere. Live updates are a later stage needing a data connection.", 3.5),
      ],
      els: [
        ...[["الغرض", "Purpose"], ["المؤشرات", "KPIs"], ["التصميم نصًا", "Design as text"], ["البناء", "Build"], ["التفاعل", "Interactivity"], ["الهوية", "Identity"], ["التحقق", "Verify"], ["المشاركة", "Share"]].map((n, i) => {
          const row = i < 4 ? 0 : 1; const col = row ? 3 - (i - 4) : i;
          return B("s" + i, 30 + col * 190, row ? 260 : 80, 160, 72, n[0], n[1], { in: [0, 0, 1, 2, 2, 3, 4, 5][i], tone: i === 6 ? "rose" : i === 7 ? "solid" : "blue", ...s2(String(i + 1), String(i + 1)), hi: [[0, 0, 1, 2, 2, 3, 4, 5][i]] });
        }),
        ...[0, 1, 2, 3, 4, 5, 6].map((i) => R("s" + i, "s" + (i + 1), [0, 1, 2, 2, 3, 4, 5][i], { flow: true })),
        X("v", 200, 380, 400, 50, "المخرَج الشيك ≠ المخرَج الصح", "Polished ≠ correct", { in: 4, size: 19, color: "--rose" }),
      ] },

    /* ---------- U4 ---------- */
    { id: "vscode", title: u("VS Code في خمس مناطق", "VS Code in five areas"),
      stages: [
        S("شريط الأنشطة", "Activity bar", "الشريط الجانبي الضيق: الملفات، البحث، الإضافات، التحكم في الإصدارات.", "The narrow side bar: files, search, extensions, version control.", 3),
        S("مستكشف الملفات", "File explorer", "شجرة مجلد المشروع — افتح المجلد مش الملف.", "The project folder tree — open the folder, not a file.", 3),
        S("منطقة المحرر", "Editor area", "هنا الملفات بتتعرض وبتتعدّل بتبويبات كتير زي المتصفح.", "Where files are shown and edited, in tabs like a browser.", 3),
        S("الطرفية", "Terminal", "سطر الأوامر جوّا المحرر: بتشغّل التطبيق وبتثبّت المكتبات وبتنادي المساعد البرمجي. اتأكد إن المسار هو مجلد مشروعك.", "The command line inside the editor: run the app, install libraries, call the assistant. Check the path is your project folder.", 4),
        S("لوحة الأوامر", "Command palette", "مربع بحث يوصلك لكل أمر بالاسم — أسرع طريقة تعمل أي حاجة.", "A search box reaching every command by name — the fastest way to do anything.", 3.5),
      ],
      els: [
        B("frame", 40, 30, 720, 390, "", "", { tone: "ink", r: 16 }),
        B("act", 50, 40, 56, 370, "أنشطة", "Activity", { in: 0, tone: "violet", hi: [0], r: 10 }),
        B("exp", 116, 40, 170, 370, "مستكشف الملفات", "Explorer", { in: 1, tone: "blue", ico: "folder", hi: [1], r: 10 }),
        B("ed", 296, 40, 454, 240, "المحرر", "Editor", { in: 2, tone: "ink", ico: "code", hi: [2], r: 10 }),
        B("term", 296, 290, 454, 120, "الطرفية", "Terminal", { in: 3, tone: "amber", ico: "code", hi: [3], r: 10, ...s2("claude · npm · python", "claude · npm · python") }),
        B("pal", 380, 60, 290, 56, "لوحة الأوامر", "Command palette", { in: 4, tone: "solid", ico: "search", hi: [4], r: 12 }),
      ] },

    { id: "claude", title: u("المحادثة العادية مقابل Claude Code", "Ordinary chat vs Claude Code"),
      stages: [
        S("أنت الوسيط", "You are the middleman", "في المحادثة العادية: بيديك كود كنص، بتنسخه وتلصقه وتشغّله وترجع بالخطأ — في كل خطوة.", "In ordinary chat: it gives you text code; you copy, paste, run and bring back the error — every step.", 4.5),
        S("Claude Code يقرأ المشروع", "Claude Code reads the project", "بيقرأ مشروعك كله وبيفهم بنيته — وبيقرأ CLAUDE.md في أول كل جلسة.", "It reads your whole project and its structure — and reads CLAUDE.md at the start of every session.", 3.5),
        S("يعدّل ويشغّل ويرى الخطأ", "Edits, runs, sees the error", "بينشئ الملفات وبعدّلها على طول، وبيشغّل الأمر، وبيشوف الخطأ بنفسه.", "It creates and edits files directly, runs the command and sees the error itself.", 4),
        S("يصلح ويعيد التشغيل", "Fixes and reruns", "بيصلّح السبب الحقيقي مش العرض، وبعدين بيعيد التشغيل للتأكد.", "It fixes the real cause, not the symptom, then reruns to confirm.", 3.5),
        S("أنت تراجع وتوافق", "You review and approve", "بيعرض إيه اللي هيتغيّر قبل التنفيذ. اقرأ قبل الموافقة، خصوصًا في أول أسبوع.", "It shows what it will change before executing. Read before approving, especially the first week.", 4),
      ],
      els: [
        B("you1", 40, 60, 130, 56, "إنت", "You", { tone: "amber", ico: "users", out: 1 }),
        B("chat", 40, 180, 130, 56, "المحادثة", "Chat", { tone: "ink", ico: "msg", out: 1 }),
        B("file", 40, 300, 130, 56, "الملف", "The file", { tone: "ink", ico: "page", out: 1 }),
        R("chat", "you1", 0, { out: 1, bend: 30, l: u("نسخ", "copy") }), R("you1", "file", 0, { out: 1, bend: -60, l: u("لصق وتشغيل", "paste & run") }), R("file", "chat", 0, { out: 1, bend: 30, l: u("الخطأ", "error") }),
        B("proj", 300, 40, 200, 60, "يقرأ المشروع", "Reads the project", { in: 1, tone: "blue", ico: "folder", hi: [1] }),
        B("edit", 560, 150, 190, 60, "يعدّل الملفات", "Edits files", { in: 2, tone: "blue", ico: "pen", hi: [2] }),
        B("run", 560, 290, 190, 60, "يشغّل ويرى الخطأ", "Runs, sees error", { in: 2, tone: "violet", ico: "play", hi: [2] }),
        B("fix", 300, 290, 200, 60, "يصلح السبب", "Fixes the cause", { in: 3, tone: "mint", ico: "wrench", hi: [3] }),
        R("proj", "edit", 2, { flow: true }), R("edit", "run", 2, { flow: true }), R("run", "fix", 3, { flow: true }), R("fix", "edit", 3, { bend: -30 }),
        B("you2", 40, 170, 180, 70, "إنت: تراجع وتوافق", "You: review & approve", { in: 4, tone: "amber", ico: "eye", hi: [4] }),
        R("you2", "proj", 4), R("you2", "fix", 4),
      ] },

    { id: "building", title: u("الواجهة الأمامية كمبنى", "The front-end as a building"),
      stages: [
        S("HTML — الهيكل", "HTML — the structure", "بيحدد إيه الموجود في الصفحة: عنوان وجدول وزر وحقل. زي الهيكل الخرساني: بيحدد الغرف من غير ما يزيّنها.", "Defines what’s on the page: title, table, button, field. Like the concrete frame: rooms without decoration.", 4),
        S("CSS — الشكل", "CSS — the look", "بيحدد العناصر شكلها إزاي: الألوان والمسافات والخطوط والترتيب على شاشات مختلفة. التشطيب والديكور.", "Defines how things look: colours, spacing, fonts, layout on different screens. The finishing and décor.", 4),
        S("JavaScript — السلوك", "JavaScript — behaviour", "بيحدد إيه اللي بيحصل لما تتفاعل: ضغطة زر بتحدّث الرسم، وفلتر بيعيد الحساب. الكهرباء والحركة في المبنى.", "Defines what happens on interaction: a click updates a chart, a filter recalculates. The electricity and motion.", 4),
        S("صفحة كاملة", "A complete page", "الواجهة بتعرض بس ومش بتمس البيانات على طول — بتطلبها من الخادم.", "The front-end only displays and doesn’t touch data directly — it asks the server.", 4),
      ],
      els: [
        B("html", 60, 260, 200, 110, "HTML", "HTML", { tone: "blue", ico: "layers", ...s2("الهيكل", "structure"), hi: [0] }),
        B("css", 300, 260, 200, 110, "CSS", "CSS", { in: 1, tone: "violet", ico: "eye", ...s2("الشكل", "look"), hi: [1] }),
        B("js", 540, 260, 200, 110, "JavaScript", "JavaScript", { in: 2, tone: "amber", ico: "bolt", ...s2("السلوك", "behaviour"), hi: [2] }),
        B("page", 250, 60, 300, 90, "صفحة لوحة تحليل", "An analysis page", { in: 3, tone: "solid", ico: "screen" }),
        R("html", "page", 3, { flow: true }), R("css", "page", 3, { flow: true }), R("js", "page", 3, { flow: true }),
      ] },

    { id: "request", title: u("إزاي الطرفين بيتكلموا؟ رحلة طلب واحد", "How the two sides talk: one request’s journey"),
      stages: [
        S("المستخدم يغيّر فلترًا", "The user changes a filter", "كل حاجة بتبدأ بتفاعل على الشاشة.", "It all starts with an interaction on screen.", 3),
        S("الواجهة ترسل طلبًا", "The front-end sends a request", "بتطلب من باب محدد في الخادم (API) ليه عنوان (Endpoint).", "It asks a specific door in the server (API) at an address (endpoint).", 3.5),
        S("الخادم يستقبله ويقرأ البيانات", "The server receives and reads", "بيقرأ الملفات وبيطلع الحساب وبيطبّق قواعد الشغل — في مكان واحد.", "It reads files, computes and applies business rules — in one place.", 4),
        S("يعيد النتيجة منظمة", "It returns an organised result", "بصيغة JSON النصية المنظمة.", "In the organised text format JSON.", 3),
        S("الواجهة ترسم النتيجة", "The front-end draws it", "الواجهة مش بتحسب حاجة — بتعرض اللي الخادم رجّعه.", "The front-end computes nothing — it shows what the server returned.", 3.5),
      ],
      els: [
        B("user", 30, 180, 120, 70, "المستخدم", "User", { tone: "amber", ico: "users", hi: [0] }),
        B("fe", 200, 180, 150, 80, "الواجهة", "Front-end", { tone: "blue", ico: "screen", hi: [1, 4] }),
        B("api", 400, 60, 140, 60, "API", "API", { in: 1, tone: "violet", ...s2("Endpoint", "Endpoint") }),
        B("srv", 420, 190, 160, 80, "الخادم", "Server", { in: 2, tone: "blue", ico: "cpu", hi: [2], ...s2("FastAPI", "FastAPI") }),
        B("data", 640, 190, 130, 80, "البيانات", "Data", { in: 2, tone: "ink", ico: "db", ...s2("Excel · SQLite", "Excel · SQLite") }),
        B("json", 400, 340, 180, 60, "JSON", "JSON", { in: 3, tone: "mint", ico: "code", hi: [3] }),
        R("user", "fe", 0, { flow: true, until: 1 }), R("fe", "api", 1, { flow: true, until: 2 }), R("api", "srv", 2), R("srv", "data", 2, { flow: true, bend: 20 }), R("data", "srv", 2, { bend: 20 }), R("srv", "json", 3, { flow: true }), R("json", "fe", 4, { flow: true }),
      ] },

    { id: "appbuild", title: u("تطبيق ويب محلي: البنية والترتيب", "A local web app: structure and order"),
      stages: [
        S("/data — الأصل كما هو", "/data — originals as they are", "ملفات إكسل الأصلية من غير أي تعديل. إنت بتحطها هنا.", "The original Excel files, untouched. You put them here.", 3.5),
        S("/backend أولًا", "/backend first", "القراءة والتنظيف والحساب ونقاط الوصول — واتأكد إن الأرقام صح قبل ما ترسم أي حاجة.", "Reading, cleaning, computing and endpoints — check the numbers are right before drawing anything.", 4),
        S("/frontend بعدها", "/frontend after", "البطاقات والرسوم والفلاتر والجدول — بتعرض بس ومش بتحسب.", "Cards, charts, filters and table — display only, no calculation.", 3.5),
        S("/output و CLAUDE.md", "/output and CLAUDE.md", "التقارير المصدّرة بتتعمل تلقائيًا، وCLAUDE.md بيعرّف المشروع وقواعده.", "Exported reports are created automatically; CLAUDE.md defines the project and its rules.", 3.5),
        S("طابق الأرقام يدويًا", "Match the numbers by hand", "قارن كل مؤشر بحسابك في إكسل مرة واحدة — خطوة ماتتخطّهاش.", "Compare each indicator with your Excel calculation once — a step you can’t skip.", 4),
        S("يفتح بنقرة", "Opens in one click", "ملف تشغيل واحد بيشغّل الخادم وبيفتح المتصفح تلقائيًا — من غير إنترنت ومن غير رفع بيانات.", "One launcher starts the server and opens the browser — no internet, no uploads.", 3.5),
      ],
      els: [
        B("data", 30, 190, 150, 70, "/data", "/data", { tone: "ink", ico: "folder", ...s2("الأصل", "originals") }),
        B("be", 230, 190, 160, 70, "/backend", "/backend", { in: 1, tone: "blue", ico: "cpu", hi: [1, 4] }),
        B("fe", 440, 190, 160, 70, "/frontend", "/frontend", { in: 2, tone: "violet", ico: "screen", hi: [2] }),
        B("out", 640, 190, 140, 70, "/output", "/output", { in: 3, tone: "mint", ico: "download" }),
        B("cm", 300, 50, 200, 56, "CLAUDE.md", "CLAUDE.md", { in: 3, tone: "amber", ico: "note" }),
        R("data", "be", 1, { flow: true }), R("be", "fe", 2, { flow: true }), R("fe", "out", 3), R("cm", "be", 3), R("cm", "fe", 3),
        B("match", 200, 320, 200, 64, "طابق بالإكسل", "Match against Excel", { in: 4, tone: "rose", ico: "check", hi: [4] }),
        R("be", "match", 4),
        B("click", 460, 320, 200, 64, "تشغيل بنقرة", "One-click launch", { in: 5, tone: "solid", ico: "play" }),
        R("match", "click", 5, { flow: true }),
      ] },

    /* ---------- U5 ---------- */
    { id: "github", title: u("من فوضى النسخ لذاكرة المشروع", "From version chaos to project memory"),
      stages: [
        S("المشكلة التي يعرفها الجميع", "The problem everyone knows", "«التقرير_نهائي»، «التقرير_نهائي_2»، «التقرير_نهائي_المعتمد_آخر_تعديل» — أيّهم الأحدث؟ وإيه الفرق؟", "“report_final”, “report_final_2”, “report_final_approved_latest” — which is newest? What changed?", 4),
        S("نسخة واحدة وتاريخ كامل", "One copy, full history", "Git بيسجّل كل تغيير كنقطة محفوظة تقدر ترجع لها — وبيشتغل من غير إنترنت.", "Git records every change as a saved point you can return to — and works offline.", 4),
        S("من، متى، ولماذا", "Who, when and why", "كل نقطة حفظ برسالة بتشرح ليه، فالسجل بيبقى وثيقة حية لقرارات المشروع.", "Every commit has a message explaining why, so the log becomes a living record of decisions.", 3.5),
        S("GitHub: نسخة خارج جهازك", "GitHub: a copy off your machine", "بيستضيف المشروع على النت، ففريقك بيشتغل عليه من غير ما حد يمسح شغل التاني.", "Hosts the project online so your team works on it without overwriting each other.", 4),
      ],
      els: [
        B("f1", 40, 60, 210, 54, "التقرير_نهائي", "report_final", { tone: "rose", out: 1 }),
        B("f2", 80, 140, 210, 54, "التقرير_نهائي_2", "report_final_2", { tone: "rose", out: 1 }),
        B("f3", 30, 220, 260, 54, "نهائي_المعتمد_آخر_تعديل", "final_approved_latest", { tone: "rose", out: 1 }),
        B("one", 40, 170, 200, 76, "نسخة واحدة", "One copy", { in: 1, tone: "solid", ico: "page" }),
        ...[1, 2, 3, 4].map((i) => B("c" + i, 290 + (i - 1) * 120, 180, 90, 56, "c" + i, "c" + i, { in: i === 1 ? 1 : 2, tone: "blue", ico: "check", ...s2(["البداية", "الهامش", "الرسم", "إصلاح"][i - 1], ["start", "margin", "chart", "fix"][i - 1]) })),
        R("one", "c1", 1), R("c1", "c2", 2), R("c2", "c3", 2), R("c3", "c4", 2),
        B("gh", 420, 330, 240, 70, "GitHub", "GitHub", { in: 3, tone: "violet", ico: "users", ...s2("الفريق والنسخة الاحتياطي", "team & backup") }),
        R("c4", "gh", 3, { flow: true, l: u("push", "push") }),
      ] },

    { id: "gitflow", title: u("دورة الشغل الكاملة على GitHub", "The full GitHub workflow"),
      stages: [
        S("pull ثم branch", "pull, then branch", "ابدأ يومك بسحب تعديلات زمايلك، وبعدين افتح فرع للمهمة مهما كانت صغيرة.", "Start the day by pulling teammates’ changes, then open a branch for the task, however small.", 4),
        S("اعمل وعدّل ثم status", "Work, edit, then status", "status أكتر أمر هتستخدمه: إيه اللي اتغيّر وإيه الجاهز للحفظ.", "status is the command you’ll use most: what changed and what’s ready.", 3.5),
        S("add ثم commit", "add, then commit", "اختار التعديلات وبعدين احفظها برسالة «إيه اللي عملته وليه» — مش «تعديل».", "Stage changes then commit with a “what and why” message — not “update”.", 4),
        S("push ثم Pull Request", "push, then a Pull Request", "ارفع على GitHub، واطلب مراجعة قبل الدمج في المسار الرئيسي.", "Push to GitHub and ask for review before merging into the main line.", 4),
        S("لا ترفع أسرارًا", "Never push secrets", "ملف .gitignore بيستثني الإعدادات والمفاتيح وكلمات المرور والبيانات الكبيرة.", "A .gitignore excludes settings, keys, passwords and large data.", 3.5),
      ],
      els: [
        ...[["pull", "pull"], ["branch", "branch"], ["اعمل وعدّل", "work & edit"], ["status", "status"], ["add", "add"], ["commit", "commit"], ["push", "push"], ["Pull Request", "Pull Request"]].map((n, i) => {
          const row = i < 4 ? 0 : 1; const col = row ? 3 - (i - 4) : i;
          return B("g" + i, 30 + col * 190, row ? 250 : 70, 160, 64, n[0], n[1], { in: [0, 0, 1, 1, 2, 2, 3, 3][i], tone: i === 7 ? "solid" : "blue", ...s2(String(i + 1), String(i + 1)), hi: [[0, 0, 1, 1, 2, 2, 3, 3][i]] });
        }),
        ...[0, 1, 2, 3, 4, 5, 6].map((i) => R("g" + i, "g" + (i + 1), [0, 1, 1, 2, 2, 3, 3][i], { flow: true })),
        B("ign", 260, 370, 280, 60, ".gitignore", ".gitignore", { in: 4, tone: "rose", ico: "shield", ...s2("لا مفاتيح ولا كلمات مرور", "no keys or passwords") }),
      ] },

    { id: "moe", title: u("الخبراء المتفرقون (MoE): ذكاء الكبير بتكلفة الصغير", "Mixture of Experts: big-model brains at small-model cost"),
      stages: [
        S("نموذج ضخم إجمالًا", "A huge model overall", "النموذج كله ضخم: مثلًا 770 مليار معامل إجمالي.", "The whole model is huge: e.g. 770B parameters in total.", 3.5),
        S("داخله خبراء كثيرون", "Many experts inside", "مقسّم لـ«خبراء» متخصصين.", "It’s split into specialised “experts”.", 3.5),
        S("سؤالك يصل", "Your question arrives", "موجّه جوّاه بيختار الخبراء الأنسب للسؤال ده بس.", "An internal router picks only the best-suited experts for this question.", 4),
        S("جزء صغير ينشط", "Only a small part activates", "40 مليار نشط بس من 770 — فبتاخد ذكاء الكبير بتكلفة قريبة من الصغير.", "Only 40B of 770B are active — big-model intelligence at near small-model cost.", 4.5),
      ],
      els: [
        B("big", 230, 40, 340, 360, "", "", { tone: "ink", r: 24, ...inf("770 مليار معامل إجمالي (مثال الكتاب، صفحة 34).", "770B total parameters (the book’s example, page 34).") }),
        X("lbl", 250, 50, 300, 40, "770B إجمالي", "770B total", { size: 16, color: "--ink-3" }),
        ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => B("e" + i, 260 + (i % 4) * 72, 120 + Math.floor(i / 4) * 120, 60, 60, "E" + (i + 1), "E" + (i + 1), { in: 1, shape: "circle", tone: i === 2 || i === 5 ? "solid" : "ink", hi: i === 2 || i === 5 ? [3] : [] })),
        B("q", 30, 190, 150, 64, "سؤالك", "Your question", { in: 2, tone: "amber", ico: "msg" }),
        B("router", 30, 300, 150, 56, "الموجّه", "Router", { in: 2, tone: "violet", ico: "route" }),
        R("q", "router", 2), R("router", "e2", 2, { flow: true }), R("router", "e5", 2, { flow: true }),
        B("ans", 620, 190, 160, 64, "40B نشطة", "40B active", { in: 3, tone: "mint", ico: "bolt" }),
        R("e2", "ans", 3, { flow: true }), R("e5", "ans", 3, { flow: true }),
      ] },

    { id: "layers", title: u("الطبقات الخمس لأي منظومة", "The five layers of any system"),
      stages: [
        S("طبقة المصادر", "Sources layer", "البيانات جاية منين: أنظمة المؤسسة وإكسل والبريد والنماذج الميدانية والأجهزة.", "Where data comes from: company systems, Excel, email, field forms, devices.", 3),
        S("طبقة التجميع والتوحيد", "Collect & unify", "قراءة المصادر وتنظيفها وتوحيد المسميات والتواريخ في بنية واحدة.", "Read, clean and unify names and dates into one structure.", 3),
        S("طبقة المنطق والقواعد", "Logic & rules", "قواعد الحساب والتصنيف والحدود الحرجة، بتتكتب مرة واحدة هنا.", "Calculation, classification and thresholds, written once here.", 3),
        S("طبقة الذكاء", "Intelligence layer", "اللي محتاج حكم مش حساب: تفسير الانحراف، تصنيف نص حر، اقتراح سبب.", "What needs judgement, not arithmetic: explaining deviations, classifying free text, suggesting causes.", 3.5),
        S("طبقة العرض والإجراء", "Display & action", "مش لوحة بس: إشعار ومهمة بتتفتح وتقرير في ميعاده. النظام اللي بيقف عند العرض نصف نظام.", "Not just a board: a notification, a task opened, a report on time. A system ending at display is half a system.", 4),
        S("رحلة حدث واحد", "One event’s journey", "حدث ← تجميع ← فحص ← قواعد ← كشف انحراف ← تفسير ← إشعار المسؤول ← قرار موثّق.", "Event → collect → check → rules → detect deviation → explain → notify the owner → documented decision.", 5),
      ],
      els: [
        ...[["المصادر", "Sources", "db"], ["التجميع والتوحيد", "Collect & unify", "layers"], ["المنطق والقواعد", "Logic & rules", "gear"], ["الذكاء", "Intelligence", "spark"], ["العرض والإجراء", "Display & action", "bolt"]].map((n, i) => B("l" + i, 120, 360 - i * 78, 400, 64, n[0], n[1], { in: i, tone: ["ink", "blue", "violet", "amber", "mint"][i], ico: n[2], hi: [i, 5] })),
        ...[0, 1, 2, 3].map((i) => R("l" + i, "l" + (i + 1), 5, { flow: true })),
        B("ev", 600, 360, 170, 64, "حدث: بيانات جديدة", "Event: new data", { in: 5, tone: "amber", ico: "bolt" }),
        B("dec", 600, 50, 170, 64, "قرار موثّق", "Documented decision", { in: 5, tone: "solid", ico: "check" }),
        R("ev", "l0", 5, { flow: true }), R("l4", "dec", 5, { flow: true }),
      ] },

    { id: "slice", title: u("ابدأ ضيق وعميق: الشريحة العمودية", "Start narrow and deep: the vertical slice"),
      stages: [
        S("أربع عمليات وخمس طبقات", "Four processes, five layers", "كل عملية محتاجة الطبقات الخمس عشان تشتغل فعلًا.", "Every process needs all five layers to actually work.", 3.5),
        S("الطريق الفاشل: عرضًا", "The failing way: across", "بتبني طبقة التجميع لكل بيانات المؤسسة وبعدين تنتقل للي بعدها — شهور من غير مخرج حد يشوفه.", "Build the collection layer for all company data first — months with nothing anyone can see.", 4),
        S("الطريق الناجح: عمقًا", "The winning way: deep", "اختار عملية واحدة صغيرة وابنِ لها الطبقات الخمس كاملة لحد الإشعار والقرار.", "Pick one small process and build all five layers up to notification and decision.", 4),
        S("ثم توسّع بثقة", "Then widen with confidence", "نظام شغّال فعلًا ونموذج مثبت تتوسع منه أفقيًا بمعرفة اكتسبتها.", "A real working system and a proven model to widen from, with knowledge gained.", 4),
      ],
      els: [
        ...[0, 1, 2, 3].flatMap((c) => [0, 1, 2, 3, 4].map((r) => B(`g${c}${r}`, 200 + c * 140, 360 - r * 74, 120, 56, ["مصادر", "تجميع", "قواعد", "ذكاء", "إجراء"][r], ["Sources", "Collect", "Rules", "Intelligence", "Action"][r], { tone: "ink", hi: c === 0 ? [2, 3] : r === 0 ? [1] : [] }))),
        X("t1", 20, 360, 170, 56, "شهور من غير مخرج", "Months, no output", { in: 1, out: 2, size: 15, color: "--rose" }),
        X("t2", 20, 150, 170, 80, "نظام يعمل ✓", "A working system ✓", { in: 2, size: 17, color: "--mint" }),
        X("t3", 200, 20, 560, 40, "عملية 1 · 2 · 3 · 4", "Process 1 · 2 · 3 · 4", { size: 14, color: "--ink-3" }),
      ] },

    { id: "team", title: u("تلات أنماط لتنسيق الفريق الرقمي", "Three ways to coordinate a digital team"),
      stages: [
        S("السلسلة", "Chain", "وكيل ورا وكيل؛ مخرج كل واحد مدخل اللي بعده. الأبسط والأوضح في التتبع، للعمليات بترتيب ثابت.", "Agent after agent; each output feeds the next. Simplest and easiest to trace, for fixed-order processes.", 4.5),
        S("التوزيع والتجميع", "Fan-out / fan-in", "كذا وكيل بيشتغلوا مع بعض على أجزاء مختلفة، وبعدين المنسق بيدمج نتائجهم. لتحليل مصادر أو أقسام كتير.", "Several agents work on different parts at once, then the coordinator merges. For several sources or departments.", 4.5),
        S("المنفذ والناقد", "Executor and critic", "وكيل بيطلع ووكيل بيراجع وبيرجّعه للتصحيح، في دورتين أو تلات. لما الجودة أهم من السرعة.", "One agent produces, another reviews and sends it back, two or three rounds. When quality beats speed.", 4.5),
        S("ابدأ بثلاثة", "Start with three", "جامع ومحلل ومراجع: نواة بتدي معظم الفايدة بأقل تعقيد.", "Collector, analyst, critic: a core that gives most of the value with least complexity.", 4),
      ],
      els: [
        X("h1", 20, 10, 240, 36, "السلسلة", "Chain", { size: 15 }),
        B("c1", 20, 60, 110, 50, "جامع", "Collector", { tone: "blue", hi: [3] }), B("c2", 150, 60, 110, 50, "محلل", "Analyst", { tone: "blue", hi: [3] }), B("c3", 20, 150, 240, 50, "محرّر", "Editor", { tone: "blue" }),
        R("c1", "c2", 0, { flow: true }), R("c2", "c3", 0, { flow: true }),
        X("h2", 290, 10, 220, 36, "التوزيع والتجميع", "Fan-out / fan-in", { in: 1, size: 15 }),
        B("co", 340, 60, 120, 50, "منسق", "Coordinator", { in: 1, tone: "violet" }),
        B("a1", 290, 150, 64, 50, "1", "1", { in: 1, tone: "violet", shape: "circle" }), B("a2", 368, 150, 64, 50, "2", "2", { in: 1, tone: "violet", shape: "circle" }), B("a3", 446, 150, 64, 50, "3", "3", { in: 1, tone: "violet", shape: "circle" }),
        B("mg", 340, 250, 120, 50, "دمج", "Merge", { in: 1, tone: "violet" }),
        R("co", "a1", 1, { flow: true }), R("co", "a2", 1, { flow: true }), R("co", "a3", 1, { flow: true }), R("a1", "mg", 1), R("a2", "mg", 1), R("a3", "mg", 1),
        X("h3", 550, 10, 230, 36, "المنفذ والناقد", "Executor & critic", { in: 2, size: 15 }),
        B("ex", 560, 70, 200, 56, "المنفذ", "Executor", { in: 2, tone: "amber" }),
        B("cr", 560, 200, 200, 56, "الناقد", "Critic", { in: 2, tone: "amber", hi: [3] }),
        R("ex", "cr", 2, { flow: true, bend: 30 }), R("cr", "ex", 2, { bend: 30, l: u("رجّع مع ملاحظات", "redo with notes") }),
        B("hum", 560, 330, 200, 56, "إنسان بعد دورتين", "Human after two rounds", { in: 2, tone: "rose", ico: "users" }),
        R("cr", "hum", 2),
        X("core", 20, 340, 500, 70, "النواة: جامع + محلل + مراجع", "The core: collector + analyst + critic", { in: 3, size: 19, color: "--accent" }),
      ] },

    { id: "card", title: u("بطاقة تعريف الوكيل وضوابط الحوكمة", "The agent card and governance controls"),
      stages: [
        S("الهدف", "Goal", "جملة واحدة بتوصف إيه اللي الوكيل ده بينجزه ومش أكتر.", "One sentence describing what this agent achieves and nothing else.", 3),
        S("المدخل والمخرج والأدوات", "Input, output, tools", "إيه اللي بيستقبله وإيه اللي بيسلّمه بصيغة محددة، وإيه المسموح له وإيه الممنوع عليه صراحة.", "What it receives and delivers in a fixed format, and what it may and may not use.", 3.5),
        S("حدود التوقف ومعيار النجاح", "Stop limits and success test", "إمتى يوقف ويسأل الإنسان، وشرط تقدر تفحصه يثبت إن شغله صح.", "When it stops to ask a human, and a checkable condition proving its work is right.", 3.5),
        S("ضوابط الحوكمة", "Governance controls", "أقل صلاحية ممكنة، سجل كامل لكل خطوة، سقف للتكلفة والمحاولات، نموذج مناسب لكل دور.", "Least privilege, a full log of every step, caps on cost and attempts, the right model per role.", 4.5),
      ],
      els: [
        B("ag", 320, 170, 160, 100, "الوكيل", "The agent", { tone: "solid", ico: "users", shape: "circle" }),
        B("k1", 310, 30, 180, 56, "الهدف", "Goal", { in: 0, tone: "blue", ico: "target", hi: [0] }),
        B("k2", 40, 120, 190, 56, "المدخل والمخرج", "Input & output", { in: 1, tone: "blue", ico: "route", hi: [1] }),
        B("k3", 570, 120, 190, 56, "الأدوات", "Tools", { in: 1, tone: "blue", ico: "wrench", hi: [1] }),
        B("k4", 40, 270, 190, 56, "حدود التوقف", "Stop limits", { in: 2, tone: "amber", ico: "pause", hi: [2] }),
        B("k5", 570, 270, 190, 56, "معيار النجاح", "Success test", { in: 2, tone: "mint", ico: "check", hi: [2] }),
        ...["k1", "k2", "k3", "k4", "k5"].map((k, i) => R(k, "ag", [0, 1, 1, 2, 2][i])),
        ...[["أقل صلاحية", "Least privilege"], ["سجل كامل", "Full log"], ["سقف التكلفة", "Cost cap"], ["نموذج لكل دور", "Model per role"]].map((n, i) => B("gv" + i, 20 + i * 195, 380, 175, 50, n[0], n[1], { in: 3, tone: "rose", ico: "shield" })),
      ] },
  ];
})(window.ACADEMY = window.ACADEMY || {});
