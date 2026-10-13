/* Scenes for Guide 2 (pages 17–23). */
(function () {
  const L = (ar, en) => ({ ar, en }), I = L;
  const S = ACAD.scenes;
  const N = (id, x, y, w, h, ico, ar, en, more) => Object.assign({ id, x, y, w, h, ico, label: L(ar, en) }, more || {});

  S["task-spec"] = {
    icon: "📐", kind: "assemble", lesson: "u2-principles", pages: [17], src: "book",
    title: L("مواصفة المهمة: خمسة عناصر تُبنى عليها الأداة", "The task spec: five elements the tool is built on"),
    nodes: [
      N("e1", 20, 30, 260, 76, "🧩", "١ المشكلة: كم دقيقة يدويًا؟", "1 Problem: how many minutes by hand?"),
      N("e2", 20, 125, 260, 76, "📥", "٢ المدخلات: ملفات وأعمدة حقيقية", "2 Inputs: real files and columns"),
      N("e3", 20, 220, 260, 76, "📏", "٣ القواعد مع كل استثناء", "3 Rules with every exception"),
      N("e4", 20, 315, 260, 76, "📤", "٤ النتيجة: شكلها ومكانها ومستلمها", "4 Output: form, place, recipient"),
      N("e5", 20, 410, 260, 76, "🧪", "٥ الاختبارات (الأهم)", "5 Tests (the most important)", { info: I("غياب هذا العنصر هو السبب الأشيع لفشل الأدوات: لا أحد يعرف متى تكون النتيجة خاطئة {p17}.", "Missing this element is the commonest cause of tool failure: nobody knows when the result is wrong {p17}.") }),
      N("ai", 360, 200, 200, 100, "🤖", "الذكاء الاصطناعي يبني", "AI builds"),
      N("tool", 640, 120, 300, 90, "🛠️", "أداة تبدو صحيحة", "A tool that looks right", { fill: "var(--warn-soft)" }),
      N("trust", 640, 300, 300, 90, "✅", "أداة يُعتمد عليها شهريًا", "A tool you rely on monthly", { fill: "var(--ok-soft)" }),
    ],
    links: [{ from: "e1", to: "ai" }, { from: "e2", to: "ai" }, { from: "e3", to: "ai" }, { from: "e4", to: "ai" }, { from: "ai", to: "tool" }, { from: "e5", to: "trust", curve: 0.15 }, { from: "ai", to: "trust" }],
    steps: [
      { t: I("المشكلة والمدخلات", "Problem and inputs"), c: I("بالدقائق لا بالتقدير، وبالملفات الحقيقية لا المثالية.", "In minutes, not guesses; with real files, not ideal ones."), show: ["e1", "e2"], hl: ["e1", "e2"] },
      { t: I("القواعد والنتيجة", "Rules and output"), c: I("المنطق كما يُطبَّق فعلًا مع استثناءاته، وشكل المخرج ومن يستلمه.", "The logic as actually applied with exceptions, and the output’s form and recipient."), add: ["e3", "e4"], hl: ["e3", "e4"] },
      { t: I("بدون اختبارات", "Without tests"), c: I("الذكاء الاصطناعي يبني أداة **تبدو** صحيحة — ولا أحد يعرف متى تخطئ.", "AI builds a tool that **looks** right — and nobody knows when it’s wrong."), add: ["ai", "tool"], flow: ["e1>ai", "e2>ai", "e3>ai", "e4>ai", "ai>tool"], cls: { tool: "warn" } },
      { t: I("مع الاختبارات المحددة مسبقًا", "With tests defined in advance"), c: I("الاختبارات قبل البناء تحوّل «كودًا يبدو صحيحًا» إلى أداة يُعتمد عليها في دورة تشغيل شهرية {p17}.", "Tests before building turn “code that looks right” into a tool relied on in a monthly cycle {p17}."), add: ["e5", "trust"], hl: ["e5", "trust"], dim: ["tool"], flow: ["e5>trust", "ai>trust"], cls: { trust: "good" } },
    ],
  };

  S["automation-ladder"] = {
    icon: "🪜", kind: "compare", lesson: "u2-level1", pages: [18], src: "book",
    title: L("سلّم الأفضلية: كلما اقتربت من البيانات ثبتت الأتمتة", "The preference ladder: closer to the data, steadier automation"),
    nodes: [
      N("data", 20, 200, 150, 100, "🗄️", "البيانات نفسها", "The data itself"),
      N("r1", 230, 40, 330, 80, "📄", "١ ملف أو واجهة برمجية", "1 A file or an API", { sub: I("الأكثر ثباتًا", "most stable"), info: I("تعامل مباشر مع البيانات، لا مع ما يظهر على الشاشة {p18}.", "Working directly with data, not what’s on screen {p18}.") }),
      N("r2", 230, 150, 330, 80, "🧠", "٢ تحكم مباشر بالتطبيق", "2 Direct app control", { sub: I("xlwings · Playwright", "xlwings · Playwright") }),
      N("r3", 230, 260, 330, 80, "🔘", "٣ عناصر واجهة البرنامج", "3 Program UI elements", { sub: I("pywinauto", "pywinauto") }),
      N("r4", 230, 370, 330, 80, "🖱️", "٤ محاكاة المستخدم", "4 User simulation", { sub: I("PyAutoGUI — ملاذ أخير", "PyAutoGUI — last resort"), info: I("يحرك الفأرة ويطابق الصور؛ الأكثر عرضة للانكسار، ويجب تدوين سبب اللجوء إليه داخل الكود {p18}.", "Moves the mouse, matches images; the most breakable — document why in the code {p18}.") }),
      N("m1", 610, 40, 330, 80, "🟢", "يتأثر ببنية البيانات فقط", "Affected only by data structure"),
      N("m2", 610, 150, 330, 80, "🟡", "+ أسماء الأوراق والعناصر", "+ sheet and element names"),
      N("m3", 610, 260, 330, 80, "🟠", "+ أسماء الأزرار والحقول", "+ button and field names"),
      N("m4", 610, 370, 330, 80, "🔴", "+ مكان الزر ودقة الشاشة وحجم النافذة", "+ button position, resolution, window size"),
    ],
    links: [{ from: "data", to: "r1" }, { from: "r1", to: "m1", noArrow: true }, { from: "r2", to: "m2", noArrow: true }, { from: "r3", to: "m3", noArrow: true }, { from: "r4", to: "m4", noArrow: true }],
    steps: [
      { t: I("الأقرب للبيانات", "Closest to the data"), c: I("ملف أو واجهة برمجية: لا يهتم بشكل الشاشة إطلاقًا.", "A file or API: doesn’t care about the screen at all."), show: ["data", "r1", "m1"], hl: ["r1"], cls: { m1: "good" } },
      { t: I("التحكم في التطبيق", "Controlling the app"), c: I("xlwings لإكسل وPlaywright للمتصفح: يتحدثان مع البرنامج مباشرة.", "xlwings for Excel, Playwright for the browser: they talk to the program directly."), add: ["r2", "m2"], hl: ["r2"], cls: { m1: "good", m2: "good" } },
      { t: I("عناصر الواجهة", "UI elements"), c: I("pywinauto للبرامج المغلقة بلا واجهة برمجية: يعمل عبر الأزرار الحقيقية.", "pywinauto for closed programs without an API: works through real buttons."), add: ["r3", "m3"], hl: ["r3"], cls: { m1: "good", m2: "good", m3: "warn" } },
      { t: I("محاكاة المستخدم", "User simulation"), c: I("كل تحديث بسيط في الشاشة يكسرها. **النزول لمستوى أدنى قرار واعٍ لا عادة سريعة** {p18}.", "Any small screen change breaks it. **Going lower must be a conscious decision, not a quick habit** {p18}."), add: ["r4", "m4"], hl: ["r4"], cls: { m1: "good", m2: "good", m3: "warn", m4: "bad" } },
    ],
    predict: { at: 3, q: I("تحديث جديد غيّر مكان زر «تصدير» في البرنامج. أي طريقة ستنكسر؟", "An update moved the “Export” button. Which approach breaks?"), opts: [I("الملف أو الواجهة البرمجية", "File or API"), I("محاكاة الفأرة بالإحداثيات", "Mouse simulation by coordinates"), I("لا شيء", "Nothing")], a: 1, why: I("المحاكاة تعتمد على مكان الزر على الشاشة، فتضغط في المكان الخطأ.", "Simulation depends on the button’s screen position, so it clicks the wrong place.") },
  };

  S["seven-questions"] = {
    icon: "❓", kind: "zoom", lesson: "u2-analysis", pages: [19], src: "book",
    title: L("من «الكفاءة −٧٪» إلى قرار: الجودة أولًا ثم سبعة أسئلة", "From “efficiency −7%” to a decision: quality first, then seven questions"),
    nodes: [
      N("num", 380, 20, 200, 80, "📉", "الكفاءة −٧٪", "Efficiency −7%", { fill: "var(--bad-soft)" }),
      N("qc", 380, 120, 200, 64, "🩺", "فحص الجودة أولًا", "Quality check first", { info: I("نتيجة دقيقة على بيانات معطوبة تعطي قرارًا خاطئًا بثقة عالية {p19}.", "Precise results on broken data give confidently wrong decisions {p19}.") }),
      N("q1", 20, 220, 170, 70, "", "١ ماذا حدث؟", "1 What happened?"), N("q2", 205, 220, 170, 70, "", "٢ أين؟ خط ٣", "2 Where? Line 3"), N("q3", 390, 220, 170, 70, "", "٣ لماذا؟", "3 Why?"), N("q4", 575, 220, 170, 70, "", "٤ العوامل", "4 Factors"), N("q5", 760, 220, 180, 70, "", "٥ متكرر؟ نعم", "5 Recurring? Yes"),
      N("q6", 205, 320, 260, 70, "💰", "٦ الأثر: ~١٨٠ ألف/شهر", "6 Impact: ~180k/month"), N("q7", 495, 320, 260, 70, "⏳", "٧ لو استمر؟", "7 If it continues?"),
      N("dec", 300, 420, 360, 70, "✅", "القرار: تغييرات أقل ليلًا + صيانة التغليف", "Decision: fewer night changeovers + packing upkeep", { fill: "var(--ok-soft)" }),
    ],
    links: [{ from: "num", to: "qc" }, { from: "qc", to: "q1" }, { from: "q1", to: "q2" }, { from: "q2", to: "q3" }, { from: "q3", to: "q4" }, { from: "q4", to: "q5" }, { from: "q5", to: "q7", curve: 0.2 }, { from: "q6", to: "dec" }, { from: "q7", to: "dec" }],
    steps: [
      { t: I("رقم وحده لا يقرر", "A number alone decides nothing"), c: I("«الكفاءة انخفضت ٧٪»… فماذا نفعل؟ لا أحد يعرف بعد.", "“Efficiency dropped 7%”… so what do we do? Nobody knows yet."), show: ["num"], hl: ["num"] },
      { t: I("الجودة أولًا", "Quality first"), c: I("قبل أي سؤال: هل البيانات نفسها سليمة؟", "Before any question: is the data itself sound?"), add: ["qc"], hl: ["qc"], flow: ["num>qc"] },
      { t: I("ماذا، أين، لماذا", "What, where, why"), c: I("كل سؤال يضيّق نطاق الذي بعده.", "Each question narrows the next."), add: ["q1", "q2", "q3"], hl: ["q2"], flow: ["qc>q1", "q1>q2", "q2>q3"], view: [0, 160, 600, 260] },
      { t: I("العوامل، والتكرار", "Factors and recurrence"), c: I("تغييرات الموديل وتوقفات التغليف؛ وحدث في مارس بنفس النمط.", "Model changeovers and packing stoppages; it happened in March with the same pattern."), add: ["q4", "q5"], hl: ["q4", "q5"], flow: ["q3>q4", "q4>q5"], view: [340, 160, 620, 260] },
      { t: I("الأثر والاستمرار", "Impact and continuation"), c: I("الأثر المالي يحدد الأولوية، و«ماذا لو استمر؟» يحدد الاستعجال.", "Financial impact sets priority; “what if it continues?” sets urgency."), add: ["q6", "q7"], hl: ["q6", "q7"], flow: ["q5>q7"] },
      { t: I("القرار", "The decision"), c: I("الرسم البياني يأتي الآن فقط، ليوضح هذه القصة {p19}. *(أرقام افتراضية)*", "Only now does the chart come, to show this story {p19}. *(hypothetical numbers)*"), add: ["dec"], hl: ["dec"], flow: ["q6>dec", "q7>dec"], cls: { dec: "good" } },
    ],
  };

  S["seven-stations"] = {
    icon: "🖥️", kind: "build", lesson: "u2-level3", pages: [21], src: "book",
    title: L("الصفحة التنفيذية: سبع محطات بدل حائط من الرسوم", "The executive page: seven stations instead of a wall of charts"),
    nodes: [
      N("hero", 40, 20, 880, 80, "1️⃣", "ماذا حدث؟ −٧٪ كفاءة", "What happened? −7% efficiency", { size: 24 }),
      N("cmp", 40, 115, 280, 76, "2️⃣", "جيد أم سيئ؟ الخطة +٢٪", "Good or bad? Plan +2%"), N("where", 340, 115, 280, 76, "3️⃣", "أين؟ أعلى ٣ مناطق", "Where? Top 3 areas"), N("why", 640, 115, 280, 76, "4️⃣", "لماذا؟ مرتبة بالأثر", "Why? Ranked by impact"),
      N("focus", 40, 210, 580, 120, "5️⃣", "أين التركيز؟ رسم تفاعلي واحد", "Where to focus? One interactive chart"),
      N("trend", 640, 210, 280, 120, "6️⃣", "لو استمر؟ ~١٨٠ ألف/شهر", "If it continues? ~180k/month"),
      N("acts", 40, 350, 880, 120, "7️⃣", "ماذا نفعل الآن؟ ٣ قرارات بمسؤول وموعد", "What now? 3 decisions with owner & date", { fill: "var(--ok-soft)" }),
      N("clock", 790, 20, 130, 80, "⏱️", "٣٠ ث", "30 s", { fill: "var(--accent-soft)" }),
    ],
    links: [],
    steps: [
      { t: I("رقم واحد كبير", "One big number"), c: I("لا يحتمل أي تأويل مزدوج.", "Leaves no room for double meaning."), show: ["hero"], hl: ["hero"] },
      { t: I("مقارنة ومكان وسبب", "Comparison, place, cause"), c: I("مقارنة بالخطة والفترة السابقة والهدف، ثم أعلى ثلاث مناطق، ثم الأسباب مرتبة.", "Against plan, previous period and target; then the top three areas; then ranked causes."), add: ["cmp", "where", "why"], hl: ["cmp", "where", "why"] },
      { t: I("التركيز والتوقع", "Focus and forecast"), c: I("رسم تفاعلي واحد للتعمق دون مغادرة الصفحة، وتوقع بسيط بأثر رقمي.", "One interactive chart for drilling down without leaving the page, and a simple numeric forecast."), add: ["focus", "trend"], hl: ["focus", "trend"] },
      { t: I("ثلاثة قرارات", "Three decisions"), c: I("كل قرار بمسؤول وموعد محدد. هنا تنتهي الصفحة: بقرار لا بملخص.", "Each decision with an owner and a date. The page ends here: with a decision, not a summary."), add: ["acts"], hl: ["acts"], cls: { acts: "good" } },
      { t: I("معيار الثلاثين ثانية", "The thirty-second test"), c: I("تُفهم الرسالة الأساسية في أول ٣٠ ثانية، والتعمق لمن يريده فقط {p21}. *(أرقام افتراضية)*", "The core message is understood in the first 30 seconds; deeper detail only for those who want it {p21}. *(hypothetical numbers)*"), add: ["clock"], hl: ["clock", "hero"], dim: ["focus", "trend"] },
    ],
  };

  S.pipeline10 = {
    icon: "🏗️", kind: "flow", lesson: "u2-project", pages: [22], src: "book",
    title: L("خط الأنابيب الكامل: عشر خطوات بلا تدخل يدوي", "The full pipeline: ten steps, no manual step"),
    zones: [{ id: "z1", x: 10, y: 10, w: 940, h: 150, label: I("المستوى ١: التشغيل", "Level 1: running") }, { id: "z2", x: 10, y: 175, w: 940, h: 150, label: I("المستوى ٢: التحليل", "Level 2: analysis"), color: "var(--violet)" }, { id: "z3", x: 10, y: 340, w: 940, h: 150, label: I("المستوى ٣: العرض", "Level 3: presentation"), color: "var(--teal)" }],
    nodes: [
      N("p1", 60, 50, 250, 80, "👁️", "١ مراقبة المجلد", "1 Watch the folder"), N("p2", 355, 50, 250, 80, "📖", "٢ قراءة تلقائية", "2 Auto-read"), N("p3", 650, 50, 260, 80, "🧹", "٣ تنظيف ودمج", "3 Clean & merge"),
      N("p4", 30, 215, 210, 80, "🩺", "٤ فحص الجودة", "4 Quality check"), N("p5", 260, 215, 210, 80, "⚙️", "٥ محرك التحليل", "5 Analysis engine"), N("p6", 490, 215, 210, 80, "🚨", "٦ اكتشاف المشاكل", "6 Detect problems"), N("p7", 720, 215, 210, 80, "📊", "٧ حساب المؤشرات", "7 Compute KPIs"),
      N("p8", 60, 380, 250, 80, "📈", "٨ بناء الرسوم", "8 Build charts"), N("p9", 355, 380, 250, 80, "🖥️", "٩ صفحة تفاعلية", "9 Interactive page"), N("p10", 650, 380, 260, 80, "✉️", "١٠ ملف واحد يُرسل", "10 One file sent"),
    ],
    links: [{ from: "p1", to: "p2" }, { from: "p2", to: "p3" }, { from: "p3", to: "p4", curve: 0.1 }, { from: "p4", to: "p5" }, { from: "p5", to: "p6" }, { from: "p6", to: "p7" }, { from: "p7", to: "p8", curve: 0.1 }, { from: "p8", to: "p9" }, { from: "p9", to: "p10" }],
    steps: [
      { t: I("التشغيل", "Running"), c: I("ملف يصل، فيُقرأ ويُنظّف ويُدمج تلقائيًا.", "A file arrives and is read, cleaned and merged automatically."), show: ["p1", "p2", "p3"], zones: ["z1"], flow: ["p1>p2", "p2>p3"] },
      { t: I("الجودة قبل التحليل", "Quality before analysis"), c: I("فحص الجودة يأتي قبل محرك التحليل، واكتشاف المشاكل قبل المؤشرات.", "The quality check precedes the analysis engine, and problem detection precedes KPIs."), add: ["p4", "p5", "p6", "p7"], zones: ["z1", "z2"], hl: ["p4"], flow: ["p3>p4", "p4>p5", "p5>p6", "p6>p7"] },
      { t: I("العرض", "Presentation"), c: I("رسوم، ثم صفحة تفاعلية، ثم ملف واحد يُرسل ويُفتح بنقرة.", "Charts, then an interactive page, then one file sent and opened in a click."), add: ["p8", "p9", "p10"], zones: ["z1", "z2", "z3"], flow: ["p7>p8", "p8>p9", "p9>p10"] },
      { t: I("معايير القبول", "Acceptance criteria"), c: I("تشغيل واحد متكامل، وبيانات أصلية سليمة، وسجل واضح، وينتهي بقرار {p22}.", "One integrated run, intact originals, a clear log, ending in a decision {p22}."), zones: ["z1", "z2", "z3"], hl: ["p1", "p10"], cls: { p10: "good" } },
    ],
  };
})();
