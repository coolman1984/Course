/* Scenes for Guide 1 (pages 7–16). */
(function () {
  const L = (ar, en) => ({ ar, en }), I = L;
  const S = ACAD.scenes;
  const N = (id, x, y, w, h, ico, ar, en, more) => Object.assign({ id, x, y, w, h, ico, label: L(ar, en) }, more || {});

  S.equation = {
    icon: "🧮", kind: "cause", lesson: "u1-equation", pages: [7], src: "book",
    title: L("المعادلة الحاكمة: جمّع العناصر وشاهد النتيجة", "The governing equation: assemble the parts and watch the result"),
    lead: L("أطفئ أي عنصر وشاهد ماذا يحدث للنتيجة.", "Switch off any element and see what happens to the result."),
    nodes: [
      N("goal", 20, 190, 150, 100, "🎯", "هدف واضح", "Clear goal", { info: I("ماذا تريد بالضبط؟ يحدد ماذا يُعتبر نجاحًا.", "What exactly do you want? It defines what counts as success.") }),
      N("ctx", 205, 190, 150, 100, "🧭", "سياق كافٍ", "Enough context", { info: I("الأداة لا تعرف عن عملك إلا ما تخبرها به {p7}.", "The tool knows only what you tell it {p7}.") }),
      N("req", 390, 190, 150, 100, "📌", "طلب محدد", "Specific request", { info: I("يمنع التشتت إلى مواضيع جانبية.", "Prevents drifting into side topics.") }),
      N("fmt", 575, 190, 150, 100, "🧾", "شكل النتيجة", "Output format", { info: I("يوفر جولة تعديل كاملة {p7}.", "Saves a full editing round {p7}.") }),
      N("res", 770, 170, 170, 140, "★", "نتيجة قابلة للتنفيذ", "Actionable result", { sub: I("خطة · قرار · أداة", "plan · decision · tool") }),
      N("p1", 172, 225, 30, 30, "", "+", "+", { shape: "circle" }), N("p2", 357, 225, 30, 30, "", "+", "+", { shape: "circle" }), N("p3", 542, 225, 30, 30, "", "+", "+", { shape: "circle" }), N("eq", 730, 225, 34, 30, "", "=", "=", { shape: "circle" }),
    ],
    links: [],
    steps: [
      { t: I("هدف واضح", "A clear goal"), c: I("لا «ساعدني في التقرير»، بل «أريد معرفة سبب انخفاض المبيعات».", "Not “help me with the report” but “I want to know why sales dropped”."), show: ["goal"], hl: ["goal"] },
      { t: I("+ سياق كافٍ", "+ enough context"), c: I("الخلفية والوضع الحالي والبيانات المتاحة.", "Background, current situation, available data."), add: ["p1", "ctx"], hl: ["ctx"] },
      { t: I("+ طلب محدد", "+ a specific request"), c: I("ما المطلوب بالضبط من هذه المحادثة؟", "What exactly is needed from this conversation?"), add: ["p2", "req"], hl: ["req"] },
      { t: I("+ شكل النتيجة", "+ the output format"), c: I("جدول؟ خطة؟ رسالة؟ قرّر مسبقًا.", "A table? A plan? A message? Decide upfront."), add: ["p3", "fmt"], hl: ["fmt"] },
      { t: I("= نتيجة قابلة للتنفيذ", "= an actionable result"), c: I("الآن جرّب المفاتيح بالأسفل: أطفئ أي عنصر وشاهد النتيجة تتحول إلى «إجابة عامة».", "Now try the switches below: turn off any element and watch the result decay into a “generic answer”."), add: ["eq", "res"], hl: ["res"], cls: { res: "good" } },
    ],
    interact(api) {
      const App = ACAD.App, h = App.h, T = (a, e) => (App.isAr() ? a : e);
      const on = { goal: true, ctx: true, req: true, fmt: true };
      const names = { goal: T("الهدف", "Goal"), ctx: T("السياق", "Context"), req: T("الطلب", "Request"), fmt: T("الشكل", "Format") };
      const effects = { goal: T("بلا هدف: إجابة عن «الموضوع» لا عن مشكلتك.", "No goal: an answer about the “topic”, not your problem."), ctx: T("بلا سياق: افتراضات صامتة ونصائح عامة.", "No context: silent assumptions and generic advice."), req: T("بلا طلب محدد: تشتت ونقاط جانبية.", "No specific request: drift and side points."), fmt: T("بلا شكل: نص طويل يحتاج جولة تعديل.", "No format: long text needing another round.") };
      const msg = h("div", { class: "muted", style: { fontSize: "13.5px", flexBasis: "100%" }, "aria-live": "polite" });
      const upd = () => {
        const n = Object.values(on).filter(Boolean).length;
        for (const k in on) api.setClass(k, on[k] ? null : "dim");
        api.setClass("res", n === 4 ? "good" : n >= 2 ? "warn" : "bad");
        api.setLabel("res", n === 4 ? T("نتيجة قابلة للتنفيذ", "Actionable result") : n >= 2 ? T("نتيجة متوسطة", "So-so result") : T("إجابة عامة", "Generic answer"));
        msg.textContent = n === 4 ? T("كل العناصر موجودة ✅", "All elements present ✅") : Object.keys(on).filter((k) => !on[k]).map((k) => effects[k]).join("  ");
      };
      const panel = h("div", { class: "row", style: { width: "100%" } }, ...Object.keys(on).map((k) => h("label", { class: "check" }, h("input", { type: "checkbox", checked: true, onchange: (e) => { on[k] = e.target.checked; if (api.step() < 4) api.goto(4); upd(); } }), names[k])), msg);
      return panel;
    },
  };

  S["ask-first"] = {
    icon: "⭐", kind: "compare", lesson: "u1-ask", pages: [7], src: "book",
    title: L("بدون الجملة الذهبية… ومعها", "Without the golden sentence… and with it"),
    zones: [{ id: "za", x: 10, y: 10, w: 460, h: 480, label: I("بدون: تخمين صامت", "Without: silent guessing"), color: "var(--rose)" }, { id: "zb", x: 490, y: 10, w: 460, h: 480, label: I("مع: اسأل ← بسّط ← اختبر", "With: ask → simplify → test"), color: "var(--teal)" }],
    nodes: [
      N("a1", 60, 60, 360, 64, "📝", "طلب: احسب حوافز المبيعات", "Request: compute sales incentives"),
      N("a2", 60, 170, 360, 80, "🤫", "افتراضات صامتة: على المبيعات؟ المرتجعات؟", "Silent guesses: on sales? returns?", { info: I("كل فراغ في طلبك يُملأ بالاحتمال الأكثر شيوعًا دون أن تعرف.", "Every gap is filled with the most common option without you knowing.") }),
      N("a3", 60, 300, 360, 70, "🧱", "حل معقد يصعب فهمه", "A complex solution, hard to grasp"),
      N("a4", 60, 400, 360, 70, "💥", "خطأ يظهر في تقرير الإدارة", "An error surfaces in the management report"),
      N("b1", 540, 60, 360, 64, "❓", "١ يسألك: الأساس؟ المرتجعات؟ الحد الأدنى؟", "1 Asks: the basis? returns? threshold?"),
      N("b2", 540, 170, 360, 80, "🗣️", "تجيب بمعلومات حقيقية", "You answer with real information"),
      N("b3", 540, 300, 360, 70, "🧩", "٢ أبسط حل ممكن مشروح ببساطة", "2 The simplest solution, simply explained"),
      N("b4", 540, 400, 360, 70, "🧪", "٣ اختبار الحالات: صفر، مرتجع، فرع جديد", "3 Edge cases: zero, a return, a new branch"),
    ],
    links: [{ from: "a1", to: "a2" }, { from: "a2", to: "a3" }, { from: "a3", to: "a4" }, { from: "b1", to: "b2" }, { from: "b2", to: "b3" }, { from: "b3", to: "b4" }],
    steps: [
      { t: I("نفس الطلب", "The same request"), c: I("طلب بسيط يبدو واضحًا لك لأنك تعرف تفاصيل شغلك.", "A simple request that looks clear to you because you know your work."), show: ["a1"], zones: ["za"] },
      { t: I("بدون الجملة: تخمين", "Without: guessing"), c: I("النموذج يملأ الفراغات بأكثر الافتراضات شيوعًا دون أن يخبرك.", "The model fills gaps with the most common assumptions without telling you."), add: ["a2", "a3", "a4"], zones: ["za"], flow: ["a1>a2", "a2>a3", "a3>a4"], cls: { a4: "bad" } },
      { t: I("مع الجملة: يسألك أولًا", "With it: it asks first"), c: I("«اسألني عن أي معلومة ناقصة» تحوّل الافتراضات إلى أسئلة ظاهرة.", "“Ask me about any missing information” turns assumptions into visible questions."), add: ["b1", "b2"], zones: ["za", "zb"], hl: ["b1"], flow: ["b1>b2"], cls: { a4: "bad" } },
      { t: I("ثم يبسّط ويختبر", "Then simplifies and tests"), c: I("«أبسط حل» يمنع التعقيد، و«اختبر الحالات الاستثنائية» يكشف الأخطاء قبل الإدارة {p7}.", "“Simplest solution” prevents complexity; “test the edge cases” catches errors before management {p7}."), add: ["b3", "b4"], zones: ["za", "zb"], flow: ["b2>b3", "b3>b4"], cls: { a4: "bad", b4: "good" } },
    ],
    predict: { at: 3, q: I("ما الذي سيحدث لو طلبت الحل والأسئلة في نفس الوقت؟", "What happens if you ask for the solution and the questions at once?"), opts: [I("حل أدق", "A more precise solution"), I("حل مبني على تخمين، ثم أسئلة بلا فائدة", "A solution built on guesses, then useless questions"), I("لا فرق", "No difference")], a: 1, why: I("الترتيب مهم: الأسئلة أولًا، ثم إجاباتك، ثم الحل.", "Order matters: questions first, then your answers, then the solution.") },
  };

  S["conversation-loop"] = {
    icon: "🔁", kind: "flow", lesson: "u1-conversation", pages: [8], src: "book",
    title: L("دورة إدارة المحادثة", "The conversation-management loop"),
    nodes: [
      N("c1", 20, 200, 140, 80, "✍️", "١ اطلب", "1 Ask"), N("c2", 190, 200, 140, 80, "🧐", "٢ اقرأ بعين ناقدة", "2 Read critically"), N("c3", 360, 200, 140, 80, "🎯", "٣ حدّد الخلل بدقة", "3 Pinpoint the flaw"),
      N("c4", 530, 200, 160, 80, "🔧", "٤ صحّح في المحادثة نفسها", "4 Correct in the same chat"), N("c5", 730, 200, 200, 80, "✅", "٥ اعتمد أو كرّر", "5 Approve or repeat"),
      N("f1", 300, 30, 200, 76, "📏", "طويلة ومشتتة", "Long & scattered", { fill: "var(--warn-soft)", info: I("«اختصرها إلى نصف الطول مع الحفاظ على كل نقطة قابلة للتنفيذ…» {p8}", "“Cut it to half the length, keeping every actionable point…” {p8}") }),
      N("f2", 300, 380, 200, 76, "🧩", "لا تناسب وضعي", "Doesn’t fit me", { fill: "var(--warn-soft)", info: I("«هذا صحيح عمومًا، لكن وضعي يختلف في [حدّد الفرق]…» {p8}", "“Generally right, but my situation differs in [the difference]…” {p8}") }),
      N("f3", 560, 30, 200, 76, "🧪", "تبدو مخترعة", "Seems invented", { fill: "var(--warn-soft)", info: I("«اذكر لكل رقم أو ادعاء مصدره، وميّز ما أنت واثق منه…» {p8}", "“Give each number or claim’s source and separate what you’re sure of…” {p8}") }),
      N("new", 560, 380, 200, 76, "🗑️", "محادثة جديدة؟", "A new chat?", { fill: "var(--bad-soft)", info: I("المبتدئ يبدأ محادثة جديدة فيخسر كل السياق السابق.", "The beginner starts a new chat and loses all previous context.") }),
    ],
    links: [{ from: "c1", to: "c2" }, { from: "c2", to: "c3" }, { from: "c3", to: "c4" }, { from: "c4", to: "c5" }, { from: "c5", to: "c2", curve: 0.25, label: I("كرّر", "repeat") }, { from: "c3", to: "f1" }, { from: "c3", to: "f2" }, { from: "c3", to: "f3" }, { from: "c3", to: "new" }],
    steps: [
      { t: I("اطلب واقرأ", "Ask and read"), c: I("أول رد ليس النهاية. اقرأه بعين ناقدة.", "The first reply isn’t the end. Read it critically."), show: ["c1", "c2"], flow: ["c1>c2"] },
      { t: I("حدّد الخلل", "Pinpoint the flaw"), c: I("«مش عاجبني» لا تفيد. ما نوع الخلل بالضبط؟", "“I don’t like it” helps nobody. What exactly is the flaw?"), add: ["c3"], hl: ["c3"], flow: ["c2>c3"] },
      { t: I("ثلاثة أنواع وثلاث عبارات", "Three types, three phrases"), c: I("اضغط على كل نوع لترى العبارة التي يقترحها الكتاب.", "Click each type to see the phrase the book suggests."), add: ["f1", "f2", "f3"], hl: ["f1", "f2", "f3"], flow: ["c3>f1", "c3>f2", "c3>f3"] },
      { t: I("الفخ: البدء من جديد", "The trap: starting over"), c: I("المحادثة الجديدة ترمي كل السياق الذي شرحته.", "A new chat throws away all the context you explained."), add: ["new"], cls: { new: "bad" }, flow: ["c3>new"] },
      { t: I("صحّح ثم اعتمد", "Correct, then approve"), c: I("المتمكن يصحح في المحادثة نفسها، ثم يعتمد أو يكرر حتى تكفي النتيجة {p8}.", "The skilled user corrects in the same chat, then approves or repeats until it’s good enough {p8}."), add: ["c4", "c5"], hl: ["c4", "c5"], dim: ["new"], flow: ["c3>c4", "c4>c5", "c5>c2"] },
    ],
  };

  S["daily-cycle"] = {
    icon: "🔄", kind: "flow", lesson: "u1-write", pages: [10], src: "book",
    title: L("دورة العمل اليومية", "The daily work cycle"),
    nodes: [
      N("d1", 400, 20, 160, 86, "💡", "١ افهم", "1 Understand", { sub: I("الهدف والسياق", "goal & context") }),
      N("d2", 720, 150, 160, 86, "🗂️", "٢ نظّم", "2 Organise", { sub: I("رتّب المعلومات", "order the info") }),
      N("d3", 620, 370, 160, 86, "⚖️", "٣ قرّر", "3 Decide", { sub: I("قارن واختر", "compare & choose") }),
      N("d4", 180, 370, 160, 86, "🛠️", "٤ نفّذ", "4 Execute", { sub: I("حوّلها لخطوات", "turn into steps") }),
      N("d5", 80, 150, 160, 86, "🔍", "٥ راجع", "5 Review", { sub: I("حسّن وكرّر", "improve & repeat") }),
      N("core", 380, 205, 200, 90, "⚡", "البرومبت الشامل", "Master prompt", { fill: "var(--accent-soft)", info: I("حين لا تعرف من أين تبدأ: حلّل ← نظّم ← اقترح الخيارات ← حوّل الأفضل لخطوات {p10}.", "When you don’t know where to start: analyse → organise → options → steps {p10}.") }),
    ],
    links: [{ from: "d1", to: "d2", curve: -0.15 }, { from: "d2", to: "d3", curve: -0.15 }, { from: "d3", to: "d4", curve: -0.15 }, { from: "d4", to: "d5", curve: -0.15 }, { from: "d5", to: "d1", curve: -0.15 }],
    steps: [
      { t: I("افهم", "Understand"), c: I("حدّد الهدف والسياق قبل أي شيء.", "Set the goal and context before anything else."), show: ["d1"], hl: ["d1"] },
      { t: I("نظّم", "Organise"), c: I("رتّب المعلومات: ما المؤكد؟ ما الناقص؟", "Order the information: what’s certain? what’s missing?"), add: ["d2"], hl: ["d2"], flow: ["d1>d2"] },
      { t: I("قرّر", "Decide"), c: I("قارن الخيارات واختر واحدًا.", "Compare the options and choose one."), add: ["d3"], hl: ["d3"], flow: ["d2>d3"] },
      { t: I("نفّذ", "Execute"), c: I("حوّل القرار إلى خطوات بمسؤول وموعد.", "Turn the decision into steps with owners and dates."), add: ["d4"], hl: ["d4"], flow: ["d3>d4"] },
      { t: I("راجع وكرّر", "Review and repeat"), c: I("حسّن، وابدأ الدورة من جديد. والبرومبت الشامل يمشي بنفس الترتيب {p10}.", "Improve and restart. The master prompt follows the same order {p10}."), add: ["d5", "core"], hl: ["core"], flow: ["d4>d5", "d5>d1"] },
    ],
  };

  S["strategic-order"] = {
    icon: "🧭", kind: "cause", lesson: "u1-scenarios", pages: [11], src: "book",
    title: L("الترتيب الإلزامي: لا قفز إلى الحل", "The forced order: no jumping to the solution"),
    lead: L("جرّب زر «اقفز للحل» وشاهد ما يضيع.", "Try the “jump to the solution” button and see what gets lost."),
    nodes: [
      N("s1", 20, 60, 200, 70, "👂", "١ افهم الوضع", "1 Understand"), N("s2", 250, 60, 200, 70, "🔬", "٢ حلّله", "2 Analyse"), N("s3", 480, 60, 200, 70, "🩺", "٣ شخّص الأسباب", "3 Diagnose causes"), N("s4", 710, 60, 230, 70, "⚠️", "٤ المخاطر والفرص", "4 Risks & opportunities"),
      N("s5", 710, 250, 230, 70, "🔀", "٥ البدائل", "5 Options"), N("s6", 480, 250, 200, 70, "✅", "٦ أفضل قرار", "6 Best decision"), N("s7", 250, 250, 200, 70, "🔮", "٧ توقع النتائج", "7 Predict outcomes"), N("s8", 20, 250, 200, 70, "🪜", "٨ خطوات تنفيذ", "8 Execution steps"),
      N("facts", 250, 400, 460, 70, "⚖️", "افصل الحقائق عن الافتراضات طوال الطريق", "Separate facts from assumptions all the way", { fill: "var(--surface-3)" }),
    ],
    links: [{ from: "s1", to: "s2" }, { from: "s2", to: "s3" }, { from: "s3", to: "s4" }, { from: "s4", to: "s5" }, { from: "s5", to: "s6" }, { from: "s6", to: "s7" }, { from: "s7", to: "s8" }],
    steps: [
      { t: I("الفهم أولًا", "Understanding first"), c: I("لا تبدأ بالحل مباشرة: افهم الوضع {p11}.", "Don’t start with the solution: understand the situation {p11}."), show: ["s1"], hl: ["s1"] },
      { t: I("تحليل وتشخيص", "Analysis and diagnosis"), c: I("حلّل، ثم شخّص الأسباب لا الأعراض.", "Analyse, then diagnose causes, not symptoms."), add: ["s2", "s3"], hl: ["s2", "s3"], flow: ["s1>s2", "s2>s3"] },
      { t: I("المخاطر والبدائل", "Risks and options"), c: I("قبل القرار: ما المخاطر والفرص؟ وما البدائل؟", "Before deciding: what are the risks and opportunities? the options?"), add: ["s4", "s5"], hl: ["s4", "s5"], flow: ["s3>s4", "s4>s5"] },
      { t: I("القرار وتوقع نتائجه", "Decision and its outcomes"), c: I("التوصية تأتي متأخرة عمدًا، ومعها توقع النتائج.", "The recommendation comes deliberately late, with predicted outcomes."), add: ["s6", "s7"], hl: ["s6"], flow: ["s5>s6", "s6>s7"] },
      { t: I("خطوات… والفصل بين الحقائق والافتراضات", "Steps… and facts vs assumptions"), c: I("ثماني محطات بترتيب لا يمكن القفز فوقه. جرّب الآن زر القفز بالأسفل.", "Eight stations in an unskippable order. Now try the jump button below."), add: ["s8", "facts"], hl: ["s8", "facts"], flow: ["s7>s8"] },
    ],
    interact(api) {
      const App = ACAD.App, h = App.h, T = (a, e) => (App.isAr() ? a : e);
      const out = h("span", { class: "muted", style: { fontSize: "13.5px" }, "aria-live": "polite" });
      let jumped = false;
      const btn = h("button", { class: "btn sm", onclick: () => {
        jumped = !jumped; api.goto(4);
        ["s1", "s2", "s3", "s4", "s5"].forEach((k) => api.setClass(k, jumped ? "dim" : null));
        api.setClass("s6", jumped ? "bad" : null); api.setLabel("s6", jumped ? T("قرار متسرّع", "A rushed decision") : T("٦ أفضل قرار", "6 Best decision"));
        btn.textContent = jumped ? T("↩️ ارجع للترتيب الصحيح", "↩️ Back to the right order") : T("⏩ اقفز للحل مباشرة", "⏩ Jump straight to the solution");
        out.textContent = jumped ? T("قفزت إلى القرار بدون فهم ولا تشخيص ولا مخاطر ولا بدائل: «أغلب القرارات السيئة تنشأ من البدء بالحل قبل فهم المشكلة» {p11}.".replace(" {p11}", ""), "You jumped to the decision without understanding, diagnosis, risks or options: “most bad decisions come from starting with the solution before understanding the problem”.") : "";
      } }, T("⏩ اقفز للحل مباشرة", "⏩ Jump straight to the solution"));
      return h("div", { class: "row", style: { width: "100%" } }, btn, out);
    },
  };

  S.notebook = {
    icon: "📚", kind: "overlay", lesson: "u1-brain", pages: [12], src: "book",
    title: L("المساعد العادي مقابل الدفتر", "Ordinary assistant vs the notebook"),
    zones: [{ id: "web", x: 10, y: 10, w: 450, h: 480, label: I("المساعد العادي: مصادرك + الخارج", "Ordinary assistant: your sources + outside"), color: "var(--amber)" }, { id: "nb", x: 500, y: 10, w: 450, h: 480, label: I("الدفتر: مصادرك أنت فقط", "Notebook: your sources only"), color: "var(--teal)" }],
    nodes: [
      N("w1", 60, 70, 160, 64, "📄", "سياسة الشركة", "Company policy"), N("w2", 250, 70, 170, 64, "🌐", "بحث خارجي", "Outside search", { fill: "var(--warn-soft)" }), N("w3", 60, 170, 360, 64, "🧠", "معرفة عامة من التدريب", "General training knowledge", { fill: "var(--warn-soft)" }),
      N("wa", 60, 330, 360, 90, "💬", "إجابة مختلطة: من أين جاء هذا الرقم؟", "A mixed answer: where did this number come from?", { info: I("قد يخلط مصادرك بالبحث الخارجي {p12}.", "May mix your sources with outside search {p12}.") }),
      N("n1", 540, 70, 170, 64, "📄", "سياسة السفر", "Travel policy"), N("n2", 740, 70, 170, 64, "📄", "دليل الموظف", "Employee guide"), N("n3", 540, 170, 370, 64, "🎛️", "تختار المصادر قبل كل سؤال", "You choose sources before each question"),
      N("na", 540, 300, 370, 90, "💬", "إجابة من مصادرك", "An answer from your sources"),
      N("cite", 600, 410, 250, 60, "🔗", "[١] سياسة السفر · سطر ٢", "[1] Travel policy · line 2", { fill: "var(--accent-soft)", info: I("الاستشهاد يرجعك إلى المكان الأصلي فتتحقق بنفسك بدل التصديق الأعمى {p12}.", "The citation takes you to the original spot so you verify instead of believing blindly {p12}.") }),
    ],
    links: [{ from: "w1", to: "wa" }, { from: "w2", to: "wa" }, { from: "w3", to: "wa" }, { from: "n1", to: "n3" }, { from: "n2", to: "n3" }, { from: "n3", to: "na" }, { from: "na", to: "cite" }],
    steps: [
      { t: I("المساعد العادي", "The ordinary assistant"), c: I("يجيب من خليط: ملفك، وبحث خارجي، ومعرفة عامة.", "Answers from a mix: your file, outside search, general knowledge."), show: ["w1", "w2", "w3"], zones: ["web"] },
      { t: I("إجابة لا تعرف مصدرها", "An answer of unknown origin"), c: I("كل شيء يبدو متساويًا في الثقة، ولا تعرف أي جملة جاءت من أين.", "Everything looks equally confident; you can’t tell which sentence came from where."), add: ["wa"], zones: ["web"], cls: { wa: "warn" }, flow: ["w1>wa", "w2>wa", "w3>wa"] },
      { t: I("الدفتر: أنت تحدد المعرفة", "The notebook: you set the knowledge"), c: I("تضع المصادر التي تثق بها، وتفعّل ما يخص السؤال فقط.", "You add sources you trust and enable only those relevant to the question."), add: ["n1", "n2", "n3"], zones: ["web", "nb"], dim: ["w1", "w2", "w3", "wa"], flow: ["n1>n3", "n2>n3"] },
      { t: I("إجابة + استشهاد", "Answer + citation"), c: I("كل إجابة مصحوبة باستشهاد يرجعك للمصدر: هذه هي «الضمانة» {p12}. جرّبها في المختبر.", "Every answer carries a citation back to the source — the “guarantee” {p12}. Try it in the lab."), add: ["na", "cite"], zones: ["web", "nb"], hl: ["cite"], dim: ["w1", "w2", "w3", "wa"], cls: { na: "good" }, flow: ["n3>na", "na>cite"] },
    ],
  };

  S["golden-prompt"] = {
    icon: "🏆", kind: "assemble", lesson: "u1-macro", pages: [14], src: "book",
    title: L("تشريح البرومبت الذهبي للكود", "Anatomy of the golden code prompt"),
    lead: L("كل سطر يُضاف يغلق بابًا معروفًا للفشل.", "Every added line closes a known door to failure."),
    nodes: [
      N("l1", 20, 30, 430, 64, "🗂️", "بنية الملف بأسمائها الحقيقية", "The file’s structure with real names"),
      N("l2", 20, 110, 430, 64, "🚫", "لا تفترض أسماء غير موجودة", "Don’t assume names that don’t exist"),
      N("l3", 20, 190, 430, 64, "🕳️", "تعامل مع الفارغ والأخطاء والناقص", "Handle blanks, errors and missing data"),
      N("l4", 20, 270, 430, 64, "🛡️", "لا تحذف البيانات الأصلية", "Don’t delete the original data"),
      N("l5", 20, 350, 430, 64, "📖", "اشرح أين أضعه وكيف أشغله", "Explain where to put it and how to run it"),
      N("l6", 20, 430, 430, 60, "🧪", "خمس حالات أختبر بها الكود", "Five cases to test the code"),
      N("f1", 520, 30, 420, 64, "❌", "كود على أعمدة غير موجودة", "Code on columns that don’t exist", { fill: "var(--bad-soft)" }),
      N("f2", 520, 150, 420, 64, "❌", "انهيار عند أول بيان سيئ", "Crash on the first bad value", { fill: "var(--bad-soft)" }),
      N("f3", 520, 270, 420, 64, "❌", "فقدان البيانات", "Data loss", { fill: "var(--bad-soft)" }),
      N("f4", 520, 350, 420, 64, "❌", "كود صحيح لا يعرف أحد تشغيله", "Correct code nobody can run", { fill: "var(--bad-soft)" }),
      N("f5", 520, 430, 420, 60, "❌", "تسليم بلا تحقق", "Delivery without verification", { fill: "var(--bad-soft)" }),
    ],
    links: [{ from: "l2", to: "f1", label: I("يمنع", "prevents") }, { from: "l3", to: "f2" }, { from: "l4", to: "f3" }, { from: "l5", to: "f4" }, { from: "l6", to: "f5" }],
    steps: [
      { t: I("المخاطر بدون قالب", "The risks without a template"), c: I("هذه أشهر طرق فشل الكود الذي يكتبه الذكاء الاصطناعي لملفات حقيقية.", "These are the commonest ways AI-written code fails on real files."), show: ["f1", "f2", "f3", "f4", "f5"], cls: { f1: "bad", f2: "bad", f3: "bad", f4: "bad", f5: "bad" } },
      { t: I("البنية + لا تفترض", "Structure + don’t assume"), c: I("«لا تفترض أسماء» يمنع الافتراضات الخاطئة {p14}.", "“Don’t assume names” prevents wrong assumptions {p14}."), add: ["l1", "l2"], hl: ["l2"], flow: ["l2>f1"], cls: { f1: "good", f2: "bad", f3: "bad", f4: "bad", f5: "bad" } },
      { t: I("تعامل مع الناقص", "Handle missing data"), c: I("يمنع الانهيار عند أول بيان سيئ.", "Prevents crashing on the first bad value."), add: ["l3"], hl: ["l3"], flow: ["l3>f2"], cls: { f1: "good", f2: "good", f3: "bad", f4: "bad", f5: "bad" } },
      { t: I("لا تحذف الأصلية", "Don’t delete the original"), c: I("يمنع فقدان البيانات.", "Prevents data loss."), add: ["l4"], hl: ["l4"], flow: ["l4>f3"], cls: { f1: "good", f2: "good", f3: "good", f4: "bad", f5: "bad" } },
      { t: I("اشرح التشغيل + اختبر", "Explain the run + test"), c: I("الشرح يجعل الكود قابلًا للاستخدام، وخمس حالات اختبار تمنع التسليم بلا تحقق. لذلك القالب أهم من حفظ عشرات الأوامر.", "Explanation makes the code usable; five tests prevent delivery without verification. That’s why the template beats memorising dozens of commands."), add: ["l5", "l6"], hl: ["l5", "l6"], flow: ["l5>f4", "l6>f5"], cls: { f1: "good", f2: "good", f3: "good", f4: "good", f5: "good" } },
    ],
  };

  S["three-tools"] = {
    icon: "🎤", kind: "assemble", lesson: "u1-present", pages: [14], src: "book",
    title: L("ثلاث أدوات، ثلاثة أدوار، ترتيب واحد", "Three tools, three roles, one order"),
    nodes: [
      N("rep", 20, 200, 150, 90, "📑", "التقرير النهائي", "Final report"),
      N("nb", 230, 60, 200, 100, "📚", "عقل المحتوى", "Content brain", { sub: I("الدفتر: الصدق والمصادر", "notebook: truth & sources"), info: I("يُنشئ شرائح قابلة للتعديل ويُرجع كل معلومة لمصدرها {p14}.", "Builds editable slides, tracing every fact to its source {p14}.") }),
      N("story", 470, 200, 200, 100, "🎬", "مدير القصة", "Story director", { sub: I("المساعد: الرسالة والترتيب", "assistant: message & order"), info: I("ما الرسالة؟ من الجمهور؟ أهم ثلاث أفكار؟ ما الذي يُحذف؟ {p14}", "What’s the message? who’s the audience? top three ideas? what gets cut? {p14}") }),
      N("vis", 230, 340, 200, 100, "🎨", "الاستوديو البصري", "Visual studio", { sub: I("مولد الصور: الفهم البصري", "image generator: visuals"), info: I("صور ومخططات وإنفوجرافيك لكل شريحة — بلا أرقام مخترعة.", "Images, charts and infographics per slide — no invented numbers.") }),
      N("deck", 740, 190, 200, 110, "✅", "عرض ينتهي بقرار", "A deck that ends in a decision", { sub: I("رسالة في ٣٠ ثانية", "message in 30 s") }),
    ],
    links: [{ from: "rep", to: "nb" }, { from: "nb", to: "story", label: I("١ المصدر", "1 source") }, { from: "story", to: "vis", label: I("٢ القصة", "2 story") }, { from: "vis", to: "deck", label: I("٣ الصورة", "3 visuals"), curve: -0.2 }, { from: "story", to: "deck" }],
    steps: [
      { t: I("تقرير جاهز", "A finished report"), c: I("إذا انتهى التقرير… فلماذا تصنع العرض بنفسك؟", "If the report is done… why build the deck yourself?"), show: ["rep"] },
      { t: I("المصدر أولًا", "Source first"), c: I("الدفتر مسؤول عن الصدق: كل شريحة ترجع لمصدرها.", "The notebook owns truth: every slide traces to its source."), add: ["nb"], hl: ["nb"], flow: ["rep>nb"] },
      { t: I("ثم القصة", "Then the story"), c: I("المساعد يقرر الرسالة والترتيب وما يُحذف.", "The assistant decides the message, the order and what gets cut."), add: ["story"], hl: ["story"], flow: ["nb>story"] },
      { t: I("ثم الصورة", "Then the visuals"), c: I("البصريات لأفكار مؤكدة فقط؛ وإلا صنعت صورًا لأفكار ستحذفها {p14}.", "Visuals only for confirmed ideas; otherwise you make images for ideas you’ll cut {p14}."), add: ["vis"], hl: ["vis"], flow: ["story>vis"] },
      { t: I("عرض ينتهي بقرار", "A deck that ends in a decision"), c: I("خلط الأدوار هو الخطأ القاتل: جميل بلا معنى، أو صحيح بلا تأثير.", "Mixing roles is the fatal mistake: beautiful but meaningless, or correct but without impact."), add: ["deck"], hl: ["deck"], cls: { deck: "good" }, flow: ["vis>deck", "story>deck"] },
    ],
  };

  S["thirty-days"] = {
    icon: "🌱", kind: "build", lesson: "u1-habit", pages: [15, 16], src: "book",
    title: L("خطة الثلاثين يومًا", "The thirty-day plan"),
    nodes: [
      N("w1", 20, 330, 210, 120, "✍️", "الأسبوع ١: الصياغة", "Week 1: phrasing", { sub: I("العناصر الخمسة + «اسألني»", "five elements + “ask me”") }),
      N("w2", 255, 240, 210, 120, "⏱️", "الأسبوع ٢: الإنتاجية", "Week 2: productivity", { sub: I("وفّر ساعة أسبوعيًا", "save an hour a week") }),
      N("w3", 490, 150, 210, 120, "🧭", "الأسبوع ٣: القرار والمعرفة", "Week 3: decisions & knowledge", { sub: I("قرار حقيقي + دفتر واحد", "a real decision + one notebook") }),
      N("w4", 725, 60, 215, 120, "⚙️", "الأسبوع ٤: الأتمتة", "Week 4: automation", { sub: I("أداة بضغطة زر", "a one-click tool") }),
      N("rule", 20, 40, 420, 76, "📏", "لا تنتقل قبل أن يصبح ما قبله عادة", "Don’t move on before the last becomes a habit", { fill: "var(--surface-3)" }),
      N("goal", 560, 370, 380, 90, "🏁", "«بنيت نظامًا يبدأ بالبيانات وينتهي بعرض للإدارة»", "“I built a system from data to a management deck”", { fill: "var(--ok-soft)" }),
    ],
    links: [{ from: "w1", to: "w2" }, { from: "w2", to: "w3" }, { from: "w3", to: "w4" }],
    steps: [
      { t: I("الأسبوع الأول", "Week one"), c: I("أعد كتابة كل طلب مهم بالعناصر الخمسة. الهدف: أن تصبح الصياغة الدقيقة عادة لا جهدًا {p16}.", "Rewrite every important request with the five elements. Goal: precise phrasing becomes habit, not effort {p16}."), show: ["w1", "rule"], hl: ["w1"] },
      { t: I("الأسبوع الثاني", "Week two"), c: I("طبّق برومبتات اليوم والاجتماعات يوميًا. الهدف: ساعة واحدة على الأقل أسبوعيًا.", "Apply the day and meeting prompts daily. Goal: at least one hour a week."), add: ["w2"], hl: ["w2"], flow: ["w1>w2"] },
      { t: I("الأسبوع الثالث", "Week three"), c: I("البرومبت الاستراتيجي على قرار حقيقي، ودفتر واحد لمشروع واحد. الهدف: عمق التحليل لا سرعته.", "The strategic prompt on a real decision, and one notebook for one project. Goal: depth, not speed."), add: ["w3"], hl: ["w3"], flow: ["w2>w3"] },
      { t: I("الأسبوع الرابع", "Week four"), c: I("أصغر مهمة متكررة: ماكرو، ثم البرومبت الذهبي. الهدف: أداة تعمل فعلًا بضغطة زر.", "The smallest repetitive task: a macro, then the golden prompt. Goal: a tool that truly works at one click."), add: ["w4"], hl: ["w4"], flow: ["w3>w4"] },
      { t: I("التحول", "The transformation"), c: I("أسبوع واحد متقن أفضل من أربعة أسابيع مقروءة على عجل.", "One mastered week beats four rushed ones."), add: ["goal"], hl: ["goal"] },
    ],
  };
})();
