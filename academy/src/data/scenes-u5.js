/* Scenes for Guide 5 (pages 32–40). */
(function () {
  const L = (ar, en) => ({ ar, en }), I = L;
  const S = ACAD.scenes;
  const N = (id, x, y, w, h, ico, ar, en, more) => Object.assign({ id, x, y, w, h, ico, label: L(ar, en) }, more || {});

  S["git-flow"] = {
    icon: "🌿", kind: "flow", lesson: "u5-git-cmds", pages: [32, 33], src: "book",
    title: L("دورة العمل الكاملة: من pull إلى Pull Request", "The full work cycle: from pull to pull request"),
    lead: L("تابع التعديل وهو ينتقل من جهازك إلى الأرشيف المركزي، ولاحظ أين يقع الفرع.", "Follow a change from your machine to the central archive, and see where the branch sits."),
    zones: [{ id: "zl", x: 10, y: 10, w: 620, h: 480, label: I("جهازك (محلي)", "Your machine (local)"), color: "var(--accent)" }, { id: "zr", x: 650, y: 10, w: 300, h: 480, label: I("GitHub (البعيد)", "GitHub (remote)"), color: "var(--teal)" }],
    nodes: [
      N("pull", 40, 50, 170, 70, "⬇️", "١ pull", "1 pull", { sub: I("أول اليوم", "start of day") }),
      N("branch", 240, 50, 170, 70, "🌱", "٢ branch", "2 branch", { sub: I("مسودة جانبية", "a side draft") }),
      N("edit", 440, 50, 170, 70, "✏️", "٣ اعمل وعدّل", "3 Work & edit"),
      N("status", 440, 170, 170, 70, "👀", "٤ status", "4 status", { sub: I("ماذا تغيّر؟", "what changed?") }),
      N("add", 240, 170, 170, 70, "🧺", "٥ add", "5 add", { sub: I("اختيار التعديلات", "select changes") }),
      N("commit", 40, 170, 170, 70, "📌", "٦ commit", "6 commit", { sub: I("ماذا ولماذا", "what & why"), info: I("نقطة حفظ مسماة برسالة «ماذا فعلت ولماذا»؛ «تعديل» لا تفيد بعد شهر {p33}.", "A named save point with a “what I did and why” message; “update” is useless a month later {p33}.") }),
      N("hist", 40, 310, 570, 90, "🕰️", "التاريخ المحلي: نقاط حفظ متسلسلة", "Local history: a chain of save points", { sub: I("يعمل بلا إنترنت", "works offline") }),
      N("origin", 680, 170, 240, 90, "☁️", "٧ push ← origin", "7 push → origin", { sub: I("نسخة خارج جهازك", "a copy off your machine") }),
      N("pr", 680, 310, 240, 90, "📝", "٨ Pull Request", "8 Pull request", { sub: I("مراجعة قبل الدمج", "review before merge"), info: I("رفع مذكرة للاعتماد قبل التنفيذ {p32}.", "Submitting a memo for approval before execution {p32}.") }),
      N("main", 680, 420, 240, 60, "✅", "merge إلى main", "merge into main"),
    ],
    links: [{ from: "origin", to: "pull", curve: -0.25, label: I("تعديلات الزملاء", "colleagues’ changes") }, { from: "pull", to: "branch" }, { from: "branch", to: "edit" }, { from: "edit", to: "status" }, { from: "status", to: "add" }, { from: "add", to: "commit" }, { from: "commit", to: "hist" }, { from: "hist", to: "origin", curve: -0.2 }, { from: "origin", to: "pr" }, { from: "pr", to: "main" }],
    steps: [
      { t: I("ابدأ بآخر نسخة", "Start from the latest copy"), c: I("‏pull في بداية كل يوم قبل أي تعديل، ثم فرع لكل مهمة مهما صغرت {p33}.", "pull at the start of each day before any edit, then a branch per task however small {p33}."), show: ["pull", "branch", "origin"], zones: ["zl", "zr"], flow: ["origin>pull", "pull>branch"] },
      { t: I("اعمل وراقب", "Work and watch"), c: I("عدّل، ثم status «قبل وبعد كل خطوة» — أكثر أمر ستستخدمه.", "Edit, then status “before and after every step” — your most-used command."), add: ["edit", "status"], zones: ["zl", "zr"], flow: ["branch>edit", "edit>status"], hl: ["status"] },
      { t: I("اختر ثم احفظ", "Select, then save"), c: I("‏add يختار التعديلات، وcommit يحفظها كنقطة مسماة في التاريخ المحلي.", "add selects changes, and commit saves them as a named point in local history."), add: ["add", "commit", "hist"], zones: ["zl", "zr"], flow: ["status>add", "add>commit", "commit>hist"], hl: ["commit"] },
      { t: I("ارفع واطلب المراجعة", "Push and ask for review"), c: I("بدون push يبقى عملك على جهازك وحده. ثم Pull Request ليُراجَع قبل الدمج في المسار الرئيسي {p33}.", "Without push your work stays on your machine alone. Then a pull request for review before merging into main {p33}."), add: ["pr", "main"], zones: ["zl", "zr"], flow: ["hist>origin", "origin>pr", "pr>main"], cls: { main: "good" } },
    ],
  };

  S["model-tiers"] = {
    icon: "🏔️", kind: "compare", lesson: "u5-models", pages: [34, 35], src: "book",
    title: L("طبقات النماذج: ابدأ من الأسفل لا من الأعلى", "Model tiers: start at the bottom, not the top"),
    lead: L("كل طبقة لها سعر واستخدام. اصعد خطوة فقط حين يفشل الأدنى في مهمتك أنت.", "Each tier has a price and a use. Climb only when the lower one fails at your task."),
    nodes: [
      N("t1", 280, 30, 400, 76, "🏔️", "الحدود القصوى", "Frontier", { sub: I("٥–١٠ / ٢٥–٥٠$ · تحليل معقد", "$5–10 / 25–50 · complex analysis"), info: I("أقوى ما يُباع وأغلاه وأبطؤه غالبًا {p34}.", "The strongest, priciest and usually slowest on sale {p34}.") }),
      N("t2", 230, 120, 500, 76, "🏢", "الوسط العملي", "Practical mid", { sub: I("قريب من القمة بجزء من السعر", "near the top at a fraction of the price") }),
      N("t3", 180, 210, 600, 76, "⚡", "السريع الرخيص", "Fast & cheap", { sub: I("تصنيف وتلخيص وفرز بحجم كبير", "classify, summarise, sort at volume") }),
      N("t4", 130, 300, 700, 76, "🔓", "المفتوح الأوزان", "Open weights", { sub: I("بيانات حساسة لا تغادر المؤسسة", "sensitive data stays in-house") }),
      N("t5", 80, 390, 800, 76, "💻", "المحلي الصغير", "Small local", { sub: I("خصوصية كاملة وعمل بلا اتصال", "full privacy, offline work") }),
      N("you", 30, 210, 130, 76, "🧪", "مهمتك", "Your task", { fill: "var(--accent-soft)" }),
      N("board", 800, 30, 150, 76, "🏆", "لوحة التصنيف", "Leaderboard", { fill: "var(--warn-soft)", info: I("اللوحات تقيس متوسط مهام عامة، وأنت تهمك مهمة واحدة بعينها {p34}.", "Leaderboards measure the average of general tasks; you care about one specific task {p34}.") }),
    ],
    links: [{ from: "you", to: "t3" }, { from: "t3", to: "t2", label: I("فقط إن فشل", "only if it fails") }, { from: "board", to: "t1", noArrow: true }],
    steps: [
      { t: I("خمس طبقات", "Five tiers"), c: I("من القمة الغالية إلى المحلي الصغير؛ الفارق بين الأرخص والأغلى يتجاوز مئة ضعف {p34}.", "From the costly frontier to small local; the cheapest–priciest gap exceeds 100× {p34}."), show: ["t1", "t2", "t3", "t4", "t5"] },
      { t: I("الإغراء", "The temptation"), c: I("لوحة التصنيف تشير للقمة… لكنها تقيس متوسط مهام عامة لا مهمتك.", "The leaderboard points to the top… but it measures general averages, not your task."), add: ["board"], hl: ["board", "t1"], cls: { board: "warn" } },
      { t: I("ابدأ من الأسفل", "Start at the bottom"), c: I("جرّب مهمتك على نموذج رخيص أو متوسط أولًا. إن كانت النتيجة كافية، وفّرت أضعافًا.", "Try your task on a cheap or mid model first. If it’s good enough, you’ve saved multiples."), add: ["you"], hl: ["you", "t3"], dim: ["board", "t1"], flow: ["you>t3"] },
      { t: I("اصعد عند الفشل فقط", "Climb only on failure"), c: I("لا تصعد للطبقة الأعلى إلا حين يفشل الأدنى فعليًا في **مهمتك أنت** {p34}.", "Climb only when the lower tier actually fails at **your** task {p34}."), hl: ["t2"], dim: ["board"], flow: ["you>t3", "t3>t2"], cls: { t3: "good" } },
    ],
    predict: { at: 2, q: I("مهمتك: تصنيف ٥٠٠٠ شكوى يوميًا. من أين تبدأ؟", "Your task: classify 5,000 complaints daily. Where do you start?"), opts: [I("نموذج القمة لأنه الأدق", "The frontier model, it’s most accurate"), I("السريع الرخيص، وأصعد فقط إن فشل", "Fast & cheap, climbing only if it fails"), I("أي نموذج مشهور", "Any famous model")], a: 1, why: I("حجم كبير ومهمة بسيطة: طبقة السريع الرخيص صُممت لها {p34}.", "High volume, simple task: the fast & cheap tier is built for it {p34}.") },
  };

  S["quantize"] = {
    icon: "🗜️", kind: "zoom", lesson: "u5-local", pages: [36], src: "book",
    title: L("الضغط: كيف صار النموذج يدخل جهازك؟", "Quantization: how did the model fit your machine?"),
    lead: L("نفس النموذج، أرقام أقل دقة، حجم أصغر بكثير — وجودة شبه ثابتة.", "The same model, lower-precision numbers, a much smaller size — and nearly the same quality."),
    nodes: [
      N("full", 40, 60, 400, 160, "📦", "نموذج 8B بدقة ١٦ بت", "An 8B model at 16-bit", { sub: I("≈ ١٦ جيجابايت", "≈ 16 GB") }),
      N("q", 500, 100, 140, 80, "🗜️", "Q4_K_M", "Q4_K_M", { info: I("مستوى الضغط المبدئي وأفضل توازن؛ لا ترفعه إلا إن لاحظت ضعفًا في مهمتك {p36}.", "The default compression and best balance; don’t raise it unless you notice weakness in your task {p36}.") }),
      N("small", 700, 90, 220, 100, "📦", "≈ ٤–٥ جيجابايت", "≈ 4–5 GB", { sub: I("الربع تقريبًا", "about a quarter") }),
      N("ram8", 40, 300, 200, 80, "💾", "٨ جيجا", "8 GB", { sub: I("3–4B", "3–4B") }),
      N("ram16", 260, 300, 200, 80, "💾", "١٦ جيجا", "16 GB", { sub: I("7–9B", "7–9B") }),
      N("ram32", 480, 300, 200, 80, "💾", "٢٤–٣٢ جيجا", "24–32 GB", { sub: I("14–32B", "14–32B") }),
      N("ram64", 700, 300, 220, 80, "💾", "٦٤+ جيجا", "64+ GB", { sub: I("70B+", "70B+") }),
      N("mem", 260, 410, 440, 70, "🧠", "الذاكرة قبل المعالج", "Memory before processor", { fill: "var(--accent-soft)" }),
    ],
    links: [{ from: "full", to: "q" }, { from: "q", to: "small" }, { from: "small", to: "ram16", curve: 0.2, label: I("يناسب", "fits") }],
    steps: [
      { t: I("بلا ضغط", "Uncompressed"), c: I("كل معامل رقم بـ١٦ بت؛ نموذج بـ٨ مليارات يحتاج نحو ١٦ جيجا من ذاكرة كرت الشاشة.", "Each parameter is a 16-bit number; an 8B model needs about 16 GB of GPU memory."), show: ["full"], hl: ["full"] },
      { t: I("الضغط", "Compression"), c: I("ضغط الأرقام لدقة أقل يقلص الحجم للربع تقريبًا «مع فقد بسيط جدًا في الجودة» {p36}.", "Compressing numbers to lower precision shrinks size to about a quarter “with very little quality loss” {p36}."), add: ["q", "small"], flow: ["full>q", "q>small"], hl: ["q", "small"] },
      { t: I("ماذا يناسب جهازك؟", "What fits your machine?"), c: I("الجدول التقريبي في الكتاب: كلما زادت الذاكرة، كبر النموذج الممكن.", "The book’s rough table: more memory, bigger possible model."), add: ["ram8", "ram16", "ram32", "ram64"], flow: ["small>ram16"], cls: { ram16: "good" } },
      { t: I("ما يحسم السرعة", "What decides speed"), c: I("السرعة تحكمها سعة الذاكرة وعرض نطاقها أكثر من قوة المعالج {p36}.", "Speed is governed by memory capacity and bandwidth more than processor power {p36}."), add: ["mem"], hl: ["mem"] },
    ],
  };

  S["system-layers"] = {
    icon: "🧱", kind: "build", lesson: "u5-system", pages: [37], src: "book",
    title: L("الطبقات الخمس: من حدث إلى قرار بلا ساعٍ بشري", "The five layers: from event to decision with no human runner"),
    lead: L("أولًا الوضع الحالي بنقلاته اليدوية، ثم النظام طبقةً فوق طبقة.", "First the current state with its manual handoffs, then the system layer by layer."),
    nodes: [
      N("l1", 40, 380, 560, 70, "🗂️", "١ المصادر", "1 Sources", { sub: I("أنظمة · إكسل · بريد · نماذج ميدانية", "systems · Excel · email · field forms") }),
      N("l2", 40, 300, 560, 70, "🧹", "٢ التجميع والتوحيد", "2 Gather & unify", { sub: I("أسماء وتواريخ موحدة", "unified names and dates") }),
      N("l3", 40, 220, 560, 70, "📏", "٣ المنطق والقواعد", "3 Logic & rules", { sub: I("تُكتب مرة واحدة", "written once") }),
      N("l4", 40, 140, 560, 70, "🧠", "٤ الذكاء", "4 Intelligence", { sub: I("حكم لا حساب: تفسير وتصنيف وتوصية", "judgement not arithmetic") }),
      N("l5", 40, 60, 560, 70, "🔔", "٥ العرض والإجراء", "5 Display & action", { sub: I("إشعار · مهمة · تقرير", "alert · task · report"), info: I("النظام الذي ينتهي عند العرض نصف نظام {p37}.", "A system that ends at display is half a system {p37}.") }),
      N("runner", 660, 220, 260, 90, "🏃", "الساعي البشري", "The human runner", { sub: I("نقلة يدوية = فجوة", "manual handoff = a gap"), fill: "var(--bad-soft)" }),
      N("human", 660, 50, 260, 90, "🧑‍⚖️", "الإنسان في القرار", "The human at the decision", { fill: "var(--ok-soft)", info: I("القرار ذو الأثر المالي أو التنظيمي يبقى بموافقة بشرية صريحة {p37}.", "Decisions with financial or organisational impact keep explicit human approval {p37}.") }),
      N("ev", 660, 380, 260, 70, "⚡", "حدث: ملف جديد", "Event: a new file"),
    ],
    links: [{ from: "ev", to: "l1", curve: 0.1 }, { from: "l1", to: "l2" }, { from: "l2", to: "l3" }, { from: "l3", to: "l4" }, { from: "l4", to: "l5" }, { from: "l5", to: "human", label: I("قرار", "decision") }],
    steps: [
      { t: I("اليوم: ساعٍ بين الأدوات", "Today: a runner between tools"), c: I("أدوات متفرقة، وإنسان ينقل المخرجات بينها — عنق الزجاجة ومصدر التأخير والخطأ {p37}.", "Scattered tools and a person carrying outputs between them — the bottleneck and source of delay and error {p37}."), show: ["l1", "runner"], hl: ["runner"], cls: { runner: "bad" } },
      { t: I("الحدث يبدأ السلسلة", "The event starts the chain"), c: I("«عند وصول ملف جديد» أفضل من «كل يوم التاسعة» {p37}.", "“When a new file arrives” beats “every day at 9” {p37}."), add: ["ev", "l2"], flow: ["ev>l1", "l1>l2"], dim: ["runner"] },
      { t: I("القواعد ثم الذكاء", "Rules, then intelligence"), c: I("القواعد تحسب في مكان واحد، والذكاء يفسّر ما يحتاج حكمًا فقط.", "Rules compute in one place; intelligence explains only what needs judgement."), add: ["l3", "l4"], flow: ["l2>l3", "l3>l4"], dim: ["runner"] },
      { t: I("أغلق الحلقة", "Close the loop"), c: I("إشعار ومهمة وتقرير — والإنسان يتفرغ للقرار لا للنقل {p37}.", "Alert, task, report — and the person is freed for the decision, not transport {p37}."), add: ["l5", "human"], flow: ["l4>l5", "l5>human"], dim: ["runner"], cls: { human: "good" } },
    ],
  };

  S["vertical-slice"] = {
    icon: "🍰", kind: "compare", lesson: "u5-build-system", pages: [38], src: "book",
    title: L("عرضًا أم عمقًا؟ الشريحة العمودية", "Wide or deep? The vertical slice"),
    lead: L("نفس الجهد بطريقتين: طبقة كاملة لكل المؤسسة، أم عملية واحدة بكل طبقاتها.", "The same effort two ways: one full layer for the whole company, or one process through every layer."),
    zones: [{ id: "zw", x: 10, y: 10, w: 460, h: 480, label: I("عرضًا: طبقة تلو طبقة", "Wide: layer after layer"), color: "var(--rose)" }, { id: "zd", x: 490, y: 10, w: 460, h: 480, label: I("عمقًا: شريحة واحدة كاملة", "Deep: one full slice"), color: "var(--teal)" }],
    nodes: [
      N("w1", 40, 370, 400, 70, "🧹", "تجميع كل بيانات المؤسسة", "Gather all company data", { sub: I("شهور…", "months…") }),
      N("w2", 40, 280, 400, 70, "📏", "القواعد… لم تبدأ", "Rules… not started", { fill: "var(--surface-2)" }),
      N("w3", 40, 190, 400, 70, "🔔", "الإجراء… لم يبدأ", "Action… not started", { fill: "var(--surface-2)" }),
      N("wx", 40, 70, 400, 90, "💸", "لا مخرج يراه أحد ← تُغلق الميزانية", "No visible output → budget closed", { fill: "var(--bad-soft)" }),
      N("d1", 610, 370, 220, 70, "🧹", "تجميع: عملية واحدة", "Gather: one process"),
      N("d2", 610, 290, 220, 70, "📏", "قواعد من ملف واحد", "Rules from one file"),
      N("d3", 610, 210, 220, 70, "🧠", "ذكاء: تفسير فقط", "AI: explaining only"),
      N("d4", 610, 130, 220, 70, "🔔", "إشعار وقرار", "Alert and decision"),
      N("dm", 560, 40, 320, 70, "📈", "قِس: نقلات اختفت ووقت وُفّر", "Measure: handoffs gone, time saved", { fill: "var(--ok-soft)" }),
    ],
    links: [{ from: "d1", to: "d2" }, { from: "d2", to: "d3" }, { from: "d3", to: "d4" }, { from: "d4", to: "dm" }, { from: "w1", to: "wx", curve: 0.3 }],
    steps: [
      { t: I("الإغراء: ابدأ كبيرًا", "The temptation: start big"), c: I("طبقة التجميع لكل بيانات المؤسسة أولًا… «ستقضي شهورًا بلا مخرج يراه أحد» {p38}.", "The gathering layer for all company data first… “months with no output anyone sees” {p38}."), show: ["w1", "w2", "w3"], zones: ["zw"], hl: ["w1"] },
      { t: I("النتيجة المتوقعة", "The expected result"), c: I("أكثر مشاريع المنظومة المتكاملة تفشل لسبب واحد: تبدأ كبيرة.", "Most integrated-system projects fail for one reason: they start big."), add: ["wx"], zones: ["zw"], flow: ["w1>wx"], cls: { wx: "bad" } },
      { t: I("البديل: عمقًا", "The alternative: deep"), c: I("عملية واحدة صغيرة بكل طبقاتها الخمس حتى الإشعار والقرار.", "One small process through all five layers to the alert and decision."), add: ["d1", "d2", "d3", "d4"], zones: ["zw", "zd"], dim: ["w1", "w2", "w3", "wx"], flow: ["d1>d2", "d2>d3", "d3>d4"] },
      { t: I("الرقم الذي يفتح التوسع", "The number that unlocks expansion"), c: I("كم نقلة اختفت؟ وكم وقتًا وُفّر؟ هذا ما تعرضه على الإدارة للتوسع {p38}.", "How many handoffs vanished? How much time was saved? That’s what you show management to expand {p38}."), add: ["dm"], zones: ["zw", "zd"], dim: ["w1", "w2", "w3", "wx"], flow: ["d4>dm"], cls: { dm: "good" } },
    ],
  };

  S["agent-loop"] = {
    icon: "🔁", kind: "cause", lesson: "u5-agents", pages: [39], src: "book",
    title: L("حلقة الوكيل: هدف، وأدوات، وتكرار", "The agent loop: goal, tools, iteration"),
    lead: L("المساعد يجيب ويتوقف. الوكيل يكرر حتى الهدف — أو حتى حدّ التوقف.", "An assistant answers and stops. An agent loops until the goal — or the stop limit."),
    nodes: [
      N("goal", 380, 30, 200, 76, "🎯", "الهدف", "The goal"),
      N("act", 660, 170, 220, 76, "🛠️", "ينفّذ بأداة", "Acts with a tool", { sub: I("قراءة · استعلام · رسالة", "read · query · message") }),
      N("obs", 380, 310, 200, 76, "👀", "يرى النتيجة", "Observes the result"),
      N("fix", 80, 170, 220, 76, "🔧", "يصحّح", "Corrects"),
      N("done", 380, 170, 200, 76, "✅", "تحقق الهدف؟", "Goal met?"),
      N("stop", 640, 380, 280, 86, "🛑", "حدّ التوقف: يسأل الإنسان", "Stop limit: ask the human", { fill: "var(--warn-soft)", info: I("عند تجاوز مبلغ، أو بيانات ناقصة، أو بعد عدد محاولات {p40}.", "Over an amount, missing data, or after N attempts {p40}.") }),
      N("asst", 40, 380, 280, 86, "💬", "المساعد العادي: يجيب ثم يتوقف", "Ordinary assistant: answers, then stops", { fill: "var(--surface-2)" }),
    ],
    links: [{ from: "goal", to: "act", curve: 0.15 }, { from: "act", to: "obs", curve: 0.15 }, { from: "obs", to: "done" }, { from: "done", to: "fix", label: I("لا", "no") }, { from: "fix", to: "goal", curve: 0.15 }, { from: "obs", to: "stop", curve: -0.15 }],
    steps: [
      { t: I("المساعد العادي", "The ordinary assistant"), c: I("سؤال، فإجابة، ثم يتوقف.", "A question, an answer, then it stops."), show: ["asst"], hl: ["asst"] },
      { t: I("الوكيل يُعطى هدفًا", "The agent gets a goal"), c: I("ويملك أدوات: قراءة ملف، أو استعلام قاعدة بيانات، أو إرسال رسالة {p39}.", "And holds tools: reading a file, querying a database, sending a message {p39}."), add: ["goal", "act"], dim: ["asst"], flow: ["goal>act"] },
      { t: I("يرى ويحكم", "Sees and judges"), c: I("ينفّذ، ثم يرى النتيجة ويقارنها بالهدف.", "It acts, then sees the result and compares it with the goal."), add: ["obs", "done"], dim: ["asst"], flow: ["act>obs", "obs>done"] },
      { t: I("ويكرر", "And iterates"), c: I("لم يتحقق؟ يصحح ويعيد المحاولة.", "Not met? It corrects and tries again."), add: ["fix"], dim: ["asst"], flow: ["done>fix", "fix>goal", "goal>act", "act>obs"] },
      { t: I("حتى الهدف أو حدّ التوقف", "Until the goal or the stop limit"), c: I("وكيل بلا حدّ توقف قد يدور بلا نهاية؛ الحد المحدد سلفًا يعيده للإنسان {p39}.", "An agent without a stop limit may loop forever; a preset limit hands back to the human {p39}."), add: ["stop"], dim: ["asst"], flow: ["obs>stop"], cls: { stop: "warn" } },
    ],
  };

  S["team-patterns"] = {
    icon: "👥", kind: "compare", lesson: "u5-team", pages: [39, 40], src: "book",
    title: L("ثلاثة أنماط تنسيق للفريق الرقمي", "Three coordination patterns for the digital team"),
    lead: L("السلسلة للترتيب الثابت، والتوزيع للمصادر المتعددة، والناقد حين تكون الجودة أهم.", "Chain for fixed order, fan-out for many sources, critic when quality matters most."),
    zones: [{ id: "z1", x: 10, y: 10, w: 300, h: 480, label: I("السلسلة", "Chain") }, { id: "z2", x: 330, y: 10, w: 300, h: 480, label: I("التوزيع والتجميع", "Fan-out & gather") }, { id: "z3", x: 650, y: 10, w: 300, h: 480, label: I("المنفذ والناقد", "Doer & critic") }],
    nodes: [
      N("c1", 60, 60, 200, 66, "📥", "جامع", "Gatherer", { sub: I("قراءة فقط", "read only") }),
      N("c2", 60, 180, 200, 66, "🧮", "محلل", "Analyst", { sub: I("حساب بلا إرسال", "compute, no send") }),
      N("c3", 60, 300, 200, 66, "🔍", "مراجع", "Reviewer", { sub: I("قراءة النتائج", "reads results") }),
      N("o", 380, 60, 200, 66, "🧭", "المنسّق", "Coordinator", { sub: I("لا يلمس البيانات", "never touches data") }),
      N("p1", 350, 200, 120, 66, "🏬", "فرع أ", "Branch A"),
      N("p2", 490, 200, 120, 66, "🏬", "فرع ب", "Branch B"),
      N("merge", 380, 330, 200, 66, "🧩", "دمج النتائج", "Merge results"),
      N("d", 700, 80, 200, 66, "✍️", "المنفّذ", "The doer"),
      N("k", 700, 240, 200, 66, "🧐", "الناقد", "The critic", { sub: I("دورتان كحد أقصى", "two rounds max") }),
      N("h", 680, 380, 240, 76, "🧑‍⚖️", "الإنسان يحسم ما بقي", "The human settles the rest", { fill: "var(--ok-soft)" }),
    ],
    links: [{ from: "c1", to: "c2" }, { from: "c2", to: "c3" }, { from: "o", to: "p1" }, { from: "o", to: "p2" }, { from: "p1", to: "merge" }, { from: "p2", to: "merge" }, { from: "d", to: "k", curve: 0.25 }, { from: "k", to: "d", curve: 0.25, label: I("ملاحظات", "notes") }, { from: "k", to: "h" }],
    steps: [
      { t: I("السلسلة", "The chain"), c: I("وكيل بعد وكيل؛ الأبسط والأوضح تتبعًا، للعمليات ذات الترتيب الثابت — وهي نواة الثلاثة {p39}.", "Agent after agent; simplest to trace, for fixed-order processes — the three-agent core {p39}."), show: ["c1", "c2", "c3"], zones: ["z1"], flow: ["c1>c2", "c2>c3"] },
      { t: I("التوزيع والتجميع", "Fan-out & gather"), c: I("عدة وكلاء معًا على أجزاء مختلفة، ثم يدمج المنسّق نتائجهم — لتحليل عدة مصادر أو أقسام.", "Several agents at once on different parts, then the coordinator merges — for several sources or departments."), add: ["o", "p1", "p2", "merge"], zones: ["z1", "z2"], flow: ["o>p1", "o>p2", "p1>merge", "p2>merge"] },
      { t: I("المنفذ والناقد", "Doer & critic"), c: I("وكيل ينتج وآخر يراجع ويعيده للتصحيح في دورتين أو ثلاث — حين تكون الجودة أهم من السرعة.", "One produces, another reviews and returns it for correction in two or three rounds — when quality beats speed."), add: ["d", "k"], zones: ["z1", "z2", "z3"], flow: ["d>k", "k>d"] },
      { t: I("الإنسان في النهاية", "The human at the end"), c: I("بعد دورتين يرفع الناقد ما بقي دون حسم إلى الإنسان {p40}.", "After two rounds the critic escalates what’s unresolved to the human {p40}."), add: ["h"], zones: ["z1", "z2", "z3"], flow: ["k>h"], cls: { h: "good" } },
    ],
    predict: { at: 2, q: I("تحليل مبيعات خمسة فروع في وقت واحد: أي نمط؟", "Analysing five branches’ sales at once: which pattern?"), opts: [I("السلسلة", "Chain"), I("التوزيع والتجميع", "Fan-out & gather"), I("المنفذ والناقد", "Doer & critic")], a: 1, why: I("أجزاء مستقلة تعمل معًا ثم تُدمج {p39}.", "Independent parts work together, then merge {p39}.") },
  };
})();
