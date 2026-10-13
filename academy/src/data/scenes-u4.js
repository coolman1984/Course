/* Scenes for Guide 4 (pages 26–31). */
(function () {
  const L = (ar, en) => ({ ar, en }), I = L;
  const S = ACAD.scenes;
  const N = (id, x, y, w, h, ico, ar, en, more) => Object.assign({ id, x, y, w, h, ico, label: L(ar, en) }, more || {});

  /* The editor window keeps its real left-to-right layout in both languages. */
  S["vscode-areas"] = {
    icon: "🧑‍💻", kind: "decompose", lesson: "u4-vscode", pages: [26], src: "book", mirror: false,
    title: L("نافذة المحرر في خمس مناطق فقط", "The editor window in just five areas"),
    lead: L("فكّك النافذة منطقةً منطقة، واضغط أي منطقة لتعرف دورها.", "Take the window apart area by area; click any area to learn its role."),
    zones: [{ id: "win", x: 10, y: 10, w: 940, h: 480, label: I("VS Code — مجلد المشروع", "VS Code — the project folder") }],
    nodes: [
      N("bar", 24, 50, 70, 420, "🧭", "١ شريط الأنشطة", "1 Activity bar", { size: 13, info: I("الشريط الجانبي الضيق: الملفات، والبحث، والإضافات، والتحكم في الإصدارات. كل أيقونة تفتح لوحًا مختلفًا {p26}.", "The narrow sidebar: files, search, extensions, version control. Each icon opens a different panel {p26}.") }),
      N("exp", 106, 50, 220, 420, "🗂️", "٢ مستكشف الملفات", "2 File explorer", { sub: I("شجرة المشروع", "the project tree"), info: I("شجرة مجلد المشروع؛ ما تفتحه هنا يُفتح في المحرر {p26}.", "The project folder tree; what you open here opens in the editor {p26}.") }),
      N("ed", 340, 50, 596, 250, "", "٣ منطقة المحرر", "3 Editor area", { sub: I("تبويبات كالمتصفح", "tabs like a browser"), info: I("حيث تُعرض الملفات وتُحرَّر، بتبويبات متعددة كالمتصفح تمامًا {p26}.", "Where files are shown and edited, with multiple tabs just like a browser {p26}.") }),
      N("term", 340, 314, 340, 156, "⌨️", "٤ الطرفية", "4 Terminal", { sub: I("تشغيل · تثبيت · المساعد", "run · install · assistant"), info: I("سطر الأوامر داخل المحرر: تشغّل منه التطبيق وتثبّت المكتبات وتستدعي المساعد البرمجي {p26}.", "The command line inside the editor: run the app, install libraries, call the coding assistant {p26}.") }),
      N("cmd", 500, 62, 300, 56, "🔎", "٥ لوحة الأوامر", "5 Command palette", { fill: "var(--accent-soft)", info: I("مربع بحث يصل إلى كل أمر بالاسم — أسرع من البحث في القوائم {p26}.", "A search box that reaches every command by name — faster than menus {p26}.") }),
      N("cc", 696, 314, 240, 156, "🤖", "المساعد يعمل هنا", "The assistant works here", { fill: "var(--teal-soft)", info: I("Claude Code يعمل داخل المحرر مباشرة، فترى تعديلاته تحدث أمامك {p26}.", "Claude Code works right inside the editor, so you watch its edits happen {p26}.") }),
    ],
    links: [{ from: "exp", to: "ed", label: I("افتح ملفًا", "open a file") }, { from: "cc", to: "ed", curve: -0.2, label: I("يعدّل", "edits") }],
    steps: [
      { t: I("نافذة واحدة بدل برامج متفرقة", "One window instead of scattered programs"), c: I("المحرر يجمع: متصفح الملفات، ومحرر الكود، والطرفية، ومعاينة النتيجة {p26}.", "The editor gathers: the file browser, code editor, terminal and result preview {p26}."), show: ["bar", "exp", "ed", "term"], zones: ["win"] },
      { t: I("١ شريط الأنشطة", "1 Activity bar"), c: I("كل أيقونة تفتح لوحًا مختلفًا: ملفات، بحث، إضافات، إصدارات.", "Each icon opens a different panel: files, search, extensions, versions."), show: ["bar", "exp", "ed", "term"], zones: ["win"], hl: ["bar"], dim: ["exp", "ed", "term"], view: [0, 0, 480, 500] },
      { t: I("٢ المستكشف ← ٣ المحرر", "2 Explorer → 3 Editor"), c: I("اضغط ملفًا في الشجرة فيُفتح في تبويب. افتح **المجلد** دائمًا، لا ملفًا منفردًا.", "Click a file in the tree and it opens in a tab. Always open the **folder**, never a lone file."), show: ["bar", "exp", "ed", "term"], zones: ["win"], hl: ["exp", "ed"], dim: ["bar", "term"], flow: ["exp>ed"] },
      { t: I("٤ الطرفية", "4 Terminal"), c: I("تأكد أن المسار الظاهر فيها هو مجلد مشروعك — أكثر نقطة يخطئ فيها المبتدئون {p26}.", "Check the path shown is your project folder — the beginner’s most common slip {p26}."), show: ["bar", "exp", "ed", "term"], zones: ["win"], hl: ["term"], dim: ["bar", "exp", "ed"], view: [330, 290, 620, 200] },
      { t: I("٥ لوحة الأوامر", "5 Command palette"), c: I("تفتح بضغطة (Ctrl/Cmd + Shift + P) وتصل لأي أمر بالاسم.", "Opens in one keystroke (Ctrl/Cmd + Shift + P) and reaches any command by name."), add: ["cmd"], zones: ["win"], hl: ["cmd"], dim: ["bar", "exp", "term"] },
      { t: I("بيت المساعد البرمجي", "The coding assistant’s home"), c: I("الأهم للمبتدئ: Claude Code يعمل داخل المحرر، يكتب في ملفاتك وأنت تراها {p26}.", "Most important for beginners: Claude Code runs inside the editor and writes your files while you watch {p26}."), add: ["cc"], zones: ["win"], hl: ["cc", "ed"], dim: ["cmd"], flow: ["cc>ed"], cls: { cc: "good" } },
    ],
  };

  S["claude-loop"] = {
    icon: "🔁", kind: "compare", lesson: "u4-claudecode", pages: [27], src: "book",
    title: L("أين تقف أنت؟ المحادثة العادية مقابل المساعد البرمجي", "Where do you stand? Ordinary chat vs the coding assistant"),
    lead: L("نفس المهمة بطريقتين. راقب من يحمل الكود بين الخطوات.", "The same task two ways. Watch who carries the code between steps."),
    zones: [{ id: "za", x: 10, y: 10, w: 460, h: 480, label: I("المحادثة العادية: أنت الوسيط", "Ordinary chat: you’re the middleman"), color: "var(--rose)" }, { id: "zb", x: 490, y: 10, w: 460, h: 480, label: I("Claude Code: أنت المراجِع", "Claude Code: you’re the reviewer"), color: "var(--teal)" }],
    nodes: [
      N("a1", 40, 60, 190, 64, "💬", "يعطيك كودًا نصيًا", "Gives you text code"),
      N("a2", 250, 60, 190, 64, "📋", "أنت تنسخ وتلصق", "You copy and paste", { fill: "var(--rose-soft)" }),
      N("a3", 250, 190, 190, 64, "▶️", "أنت تشغّل", "You run it", { fill: "var(--rose-soft)" }),
      N("a4", 250, 320, 190, 64, "🐞", "أنت تنقل الخطأ", "You carry the error back", { fill: "var(--rose-soft)" }),
      N("a5", 40, 320, 190, 64, "🔁", "ويتكرر الدور…", "And again…"),
      N("b1", 520, 60, 190, 64, "📂", "يقرأ مشروعك", "Reads your project"),
      N("b2", 730, 60, 190, 64, "✍️", "ينشئ ويعدّل الملفات", "Creates and edits files"),
      N("b3", 730, 190, 190, 64, "▶️", "يشغّل الأمر", "Runs the command"),
      N("b4", 730, 320, 190, 64, "🩺", "يرى الخطأ ويصلحه", "Sees and fixes the error"),
      N("you", 520, 250, 190, 110, "🧑‍⚖️", "أنت: تراجع وتوافق", "You: review and approve", { fill: "var(--teal-soft)", info: I("أنت تراجع وتوافق فقط {p27}. في أول أسبوع اقرأ كل تعديل قبل الموافقة.", "You only review and approve {p27}. In your first week, read every change before approving.") }),
    ],
    links: [{ from: "a1", to: "a2" }, { from: "a2", to: "a3" }, { from: "a3", to: "a4" }, { from: "a4", to: "a5" }, { from: "a5", to: "a1" }, { from: "b1", to: "b2" }, { from: "b2", to: "b3" }, { from: "b3", to: "b4" }, { from: "b4", to: "b3", curve: 0.35 }, { from: "b2", to: "you", curve: -0.1, label: I("خطة", "plan") }, { from: "you", to: "b3", curve: 0.1, label: I("موافقة", "approve") }],
    steps: [
      { t: I("المحادثة العادية", "Ordinary chat"), c: I("تعطيك كودًا نصيًا، وأنت تنسخه وتلصقه في الملف الصحيح.", "It gives you text code; you copy and paste it into the right file."), show: ["a1", "a2"], zones: ["za"], flow: ["a1>a2"] },
      { t: I("أنت الوسيط في كل خطوة", "You’re the middleman at every step"), c: I("تشغّل، ثم تعود إليها بالخطأ إن وقع — والدور يتكرر {p27}.", "You run it, then go back with the error if one appears — and the loop repeats {p27}."), add: ["a3", "a4", "a5"], zones: ["za"], hl: ["a2", "a3", "a4"], flow: ["a2>a3", "a3>a4", "a4>a5", "a5>a1"], cls: { a4: "warn" } },
      { t: I("المساعد البرمجي", "The coding assistant"), c: I("يقرأ مشروعك كله، ثم ينشئ الملفات ويعدّلها مباشرة.", "It reads your whole project, then creates and edits files directly."), add: ["b1", "b2"], zones: ["za", "zb"], flow: ["b1>b2"] },
      { t: I("يشغّل ويصلح بنفسه", "Runs and fixes by itself"), c: I("يشغّل الأمر، ويرى الخطأ بنفسه، ويصلحه، ثم يعيد التشغيل {p27}.", "It runs the command, sees the error itself, fixes it and runs again {p27}."), add: ["b3", "b4"], zones: ["za", "zb"], flow: ["b2>b3", "b3>b4", "b4>b3"] },
      { t: I("موقعك تغيّر", "Your position changed"), c: I("الفرق في موقعك أنت: من ناقل للكود إلى مراجِع يوافق على الخطة. ولهذا تحتاج **الخطة قبل التنفيذ**.", "The difference is your position: from code carrier to a reviewer who approves the plan. That’s why you need **the plan before execution**."), add: ["you"], zones: ["za", "zb"], hl: ["you"], dim: ["a1", "a2", "a3", "a4", "a5"], flow: ["b2>you", "you>b3"], cls: { you: "good" } },
    ],
    predict: { at: 4, q: I("مع المساعد البرمجي، ما أهم ما يبقى عليك أنت؟", "With the coding assistant, what stays most your job?"), opts: [I("كتابة الكود سطرًا سطرًا", "Writing code line by line"), I("قراءة الخطة والتعديلات قبل الموافقة", "Reading the plan and changes before approving"), I("لا شيء؛ يعمل وحده", "Nothing; it works alone")], a: 1, why: I("هو يعرض ما سيغيّره قبل التنفيذ، وأنت تقرأ قبل الموافقة — خاصة في أول أسبوع {p27}.", "It shows what it will change before acting; you read before approving — especially in week one {p27}.") },
  };

  S["building"] = {
    icon: "🏢", kind: "overlay", lesson: "u4-frontend", pages: [28], src: "book",
    title: L("الواجهة كمبنى: هيكل، ثم تشطيب، ثم كهرباء", "The front end as a building: structure, finish, wiring"),
    lead: L("ثلاث طبقات فوق بعض. كل طبقة لها سؤال واحد تجيب عنه.", "Three layers on top of each other. Each answers one question."),
    nodes: [
      N("html", 40, 330, 400, 120, "🧱", "HTML — الهيكل", "HTML — structure", { sub: I("ماذا يوجد؟ عنوان، جدول، زر", "What’s there? title, table, button"), info: I("مثل الهيكل الخرساني: يحدد الغرف دون أن يزيّنها {p28}.", "Like a concrete frame: defines the rooms without decorating them {p28}.") }),
      N("css", 40, 190, 400, 120, "🎨", "CSS — الشكل", "CSS — look", { sub: I("كيف يبدو؟ ألوان، مسافات، شاشات", "How does it look? colours, spacing, screens"), info: I("التشطيب والديكور: الألوان والمسافات والخطوط والترتيب على الشاشات المختلفة {p28}.", "The finish and décor: colours, spacing, fonts, layout across screens {p28}.") }),
      N("js", 40, 50, 400, 120, "⚡", "JavaScript — السلوك", "JavaScript — behaviour", { sub: I("ماذا يحدث عند التفاعل؟", "What happens on interaction?"), info: I("الكهرباء والحركة: ضغطة زر تحدّث الرسم، وتغيير فلتر يعيد حساب الأرقام {p28}.", "The wiring and motion: a click updates a chart, a filter change recomputes numbers {p28}.") }),
      N("tw", 520, 50, 200, 80, "💨", "Tailwind", "Tailwind", { sub: I("تنسيق سريع", "fast styling") }),
      N("ch", 740, 50, 200, 80, "📈", "مكتبة رسوم", "Chart library", { sub: I("Chart.js · ECharts", "Chart.js · ECharts") }),
      N("tb", 520, 150, 200, 80, "📋", "مكتبة جداول", "Table library", { sub: I("فرز وبحث وتصدير", "sort, search, export") }),
      N("fw", 740, 150, 200, 80, "🧩", "إطار عمل", "Framework", { sub: I("لاحقًا فقط", "only later"), fill: "var(--warn-soft)", info: I("لا تبدأ بإطار عمل؛ إضافته مبكرًا تضاعف التعقيد بلا فائدة {p28}.", "Don’t start with a framework; adding it early doubles complexity for nothing {p28}.") }),
      N("page", 520, 290, 420, 160, "🖥️", "لوحة تحليل احترافية", "A professional analysis dashboard", { sub: I("HTML + Tailwind + مكتبة رسوم تكفي", "HTML + Tailwind + a chart library is enough") }),
    ],
    links: [{ from: "html", to: "css", noArrow: true }, { from: "css", to: "js", noArrow: true }, { from: "tw", to: "page" }, { from: "ch", to: "page" }, { from: "tb", to: "page" }, { from: "js", to: "page", curve: 0.2 }],
    steps: [
      { t: I("الهيكل أولًا", "Structure first"), c: I("HTML يحدد **ماذا** يوجد في الصفحة، كالهيكل الخرساني للمبنى.", "HTML defines **what** is on the page, like a building’s concrete frame."), show: ["html"], hl: ["html"] },
      { t: I("ثم التشطيب", "Then the finish"), c: I("CSS يحدد **كيف** يبدو كل عنصر، وكيف يتكيف مع الهاتف والحاسوب.", "CSS defines **how** each element looks and adapts to phone and desktop."), add: ["css"], hl: ["css"] },
      { t: I("ثم الكهرباء", "Then the wiring"), c: I("JavaScript يحدد **ماذا يحدث** عند الضغط أو تغيير فلتر.", "JavaScript defines **what happens** on a click or filter change."), add: ["js"], hl: ["js"] },
      { t: I("أدوات تختصر الوقت", "Time-saving tools"), c: I("لا تُرسم المخططات يدويًا ولا تُبنى الجداول من الصفر: مكتبات جاهزة بأسطر قليلة {p28}.", "Charts aren’t drawn by hand and tables aren’t built from scratch: ready libraries in a few lines {p28}."), add: ["tw", "ch", "tb"], hl: ["tw", "ch", "tb"] },
      { t: I("قرار المبتدئ", "The beginner’s decision"), c: I("صفحة HTML واحدة + Tailwind + مكتبة رسوم تكفي لبناء لوحة احترافية كاملة. الإطار يُضاف حين يكبر المشروع فعلًا {p28}.", "One HTML page + Tailwind + a chart library is enough for a complete professional dashboard. A framework comes when the project truly grows {p28}."), add: ["fw", "page"], hl: ["page"], dim: ["fw"], flow: ["tw>page", "ch>page", "tb>page", "js>page"], cls: { page: "good", fw: "warn" } },
    ],
  };

  S["request-journey"] = {
    icon: "🔄", kind: "flow", lesson: "u4-backend", pages: [29], src: "book",
    title: L("رحلة طلب واحد: من الفلتر إلى الرسم", "One request’s journey: from filter to chart"),
    lead: L("غيّر الفلتر بالأسفل وتابع الطلب وهو يذهب للخادم ويعود بالنتيجة.", "Change the filter below and follow the request to the server and back."),
    zones: [{ id: "zf", x: 10, y: 10, w: 330, h: 480, label: I("الواجهة (المتصفح)", "Front end (browser)"), color: "var(--accent)" }, { id: "zb", x: 620, y: 10, w: 330, h: 480, label: I("الخادم (بايثون)", "Server (Python)"), color: "var(--teal)" }],
    nodes: [
      N("f1", 40, 60, 270, 80, "🎚️", "١ المستخدم يغيّر فلترًا", "1 The user changes a filter", { sub: I("المنطقة: الكل", "Region: all") }),
      N("f2", 40, 200, 270, 80, "📨", "٢ الواجهة ترسل طلبًا", "2 The front end sends a request", { sub: I("/api/summary", "/api/summary") }),
      N("b3", 650, 60, 270, 80, "🚪", "٣ الخادم يستقبله", "3 The server receives it", { sub: I("نقطة وصول Endpoint", "an endpoint") }),
      N("b4", 650, 200, 270, 80, "🧮", "٤ يقرأ البيانات ويحسب", "4 Reads the data and computes", { sub: I("pandas · DuckDB", "pandas · DuckDB") }),
      N("db", 650, 340, 270, 80, "🗄️", "data/ — الملفات الأصلية", "data/ — the original files", { sub: I("قراءة فقط", "read only"), info: I("لا تُمَس البيانات الأصلية: يقرأ الخادم فقط ويكتب نتائجه في مجلد منفصل {p29}.", "Original data is never touched: the server only reads and writes results to a separate folder {p29}.") }),
      N("json", 360, 270, 240, 80, "📦", "٥ يعيد النتيجة JSON", "5 Returns the result as JSON", { sub: I("{\"sales\": 1240}", "{\"sales\": 1240}") }),
      N("f6", 40, 340, 270, 80, "📊", "٦ الواجهة ترسم النتيجة", "6 The front end draws it", { sub: I("المبيعات: ١٬٢٤٠", "Sales: 1,240") }),
    ],
    links: [{ from: "f1", to: "f2" }, { from: "f2", to: "b3", label: I("طلب API", "API call") }, { from: "b3", to: "b4" }, { from: "db", to: "b4", label: I("قراءة", "read") }, { from: "b4", to: "json", curve: 0.15 }, { from: "json", to: "f6", curve: 0.15 }],
    steps: [
      { t: I("المستخدم يغيّر فلترًا", "The user changes a filter"), c: I("كل شيء يبدأ من تفاعل في المتصفح.", "Everything starts with an interaction in the browser."), show: ["f1"], zones: ["zf"], hl: ["f1"] },
      { t: I("الواجهة لا تملك البيانات", "The front end doesn’t own the data"), c: I("ترسل طلبًا (API Call) إلى باب محدد في الخادم له عنوان: نقطة الوصول.", "It sends a request (API call) to a specific door on the server with an address: the endpoint."), add: ["f2", "b3"], zones: ["zf", "zb"], flow: ["f1>f2", "f2>b3"] },
      { t: I("العقل الخفي", "The hidden brain"), c: I("الخادم يقرأ الملفات ويحسب ويطبّق قواعد العمل في مكان واحد، فلا تتضارب الأرقام بين شاشة وأخرى {p29}.", "The server reads files, computes and applies business rules in one place, so numbers never conflict between screens {p29}."), add: ["b4", "db"], zones: ["zf", "zb"], hl: ["b4"], flow: ["b3>b4", "db>b4"] },
      { t: I("لغة مشتركة: JSON", "A shared language: JSON"), c: I("النتيجة تعود نصًا منظمًا تفهمه الواجهة، ثم تُرسم {p29}.", "The result returns as structured text the front end understands, then gets drawn {p29}."), add: ["json", "f6"], zones: ["zf", "zb"], hl: ["json", "f6"], flow: ["b4>json", "json>f6"], cls: { f6: "good" } },
    ],
    interact(api) {
      const App = ACAD.App, h = App.h, T = (a, e) => (App.isAr() ? a : e);
      const data = { all: 1240, north: 520, south: 410, east: 310, none: 0 };
      const names = { all: ["الكل", "All"], north: ["الشمال", "North"], south: ["الجنوب", "South"], east: ["الشرق", "East"], none: ["منطقة بلا بيانات", "A region with no data"] };
      const out = h("code", { "aria-live": "polite", style: { direction: "ltr", unicodeBidi: "isolate" } });
      const sel = h("select", { "aria-label": T("المنطقة", "Region") }, Object.keys(names).map((k) => h("option", { value: k }, T(names[k][0], names[k][1]))));
      const run = () => {
        const k = sel.value, v = data[k], nm = T(names[k][0], names[k][1]);
        api.setSub("f1", T("المنطقة: ", "Region: ") + nm);
        api.setSub("f2", "/api/summary?region=" + k);
        api.setSub("json", v ? `{"sales": ${v}}` : `{"sales": 0, "rows": 0}`);
        api.setSub("f6", v ? T("المبيعات: ", "Sales: ") + App.num(v) : T("لا توجد بيانات لهذه الفترة", "No data for this selection"));
        api.setClass("f6", v ? "good" : "warn");
        out.textContent = "GET /api/summary?region=" + k + "  →  " + (v ? `{"sales": ${v}}` : `{"sales": 0, "rows": 0}`);
        api.goto(api.count - 1); api.flow(["f1>f2", "f2>b3", "b3>b4", "db>b4", "b4>json", "json>f6"]);
      };
      sel.addEventListener("change", run);
      return h("div", { class: "row", style: { width: "100%", alignItems: "center", gap: "10px" } },
        h("label", { class: "field", style: { margin: 0, minWidth: "180px" } }, h("span", { class: "lbl", style: { fontWeight: 800, fontSize: "13px" } }, T("جرّب فلترًا", "Try a filter")), sel), out,
        h("small", { class: "muted" }, T("🧪 محاكاة تعليمية بأرقام افتراضية.", "🧪 Teaching simulation with hypothetical numbers.")));
    },
  };

  S["app-stages"] = {
    icon: "🏠", kind: "build", lesson: "u4-localapp", pages: [30], src: "book",
    title: L("التطبيق المحلي: ثماني مراحل بالترتيب — والترتيب ليس اقتراحًا", "The local app: eight stages in order — and the order isn’t a suggestion"),
    lead: L("البيانات أولًا، ثم صحة الأرقام، ثم العرض، ثم التجميل.", "Data first, then correct numbers, then display, then polish."),
    nodes: [
      N("a1", 30, 40, 200, 80, "❓", "١ السؤال قبل الأداة", "1 The question before the tool"),
      N("a2", 260, 40, 200, 80, "📗", "٢ بيانات حقيقية صغيرة", "2 Small real data", { info: I("ملف إكسل واحد فعلي وصغير، لا بيانات وهمية؛ الوهمية تخفي المشكلات الحقيقية {p30}.", "One small real Excel file, not fake data; fake data hides real problems {p30}.") }),
      N("a3", 490, 40, 200, 80, "📁", "٣ المشروع و CLAUDE.md", "3 Project & CLAUDE.md"),
      N("a4", 720, 40, 210, 80, "⚙️", "٤ الخادم أولًا", "4 Server first", { info: I("تأكد أن الأرقام صحيحة من صفحة التوثيق التلقائية قبل رسم أي شيء {p30}.", "Confirm the numbers from the auto-generated docs page before drawing anything {p30}.") }),
      N("a5", 720, 180, 210, 80, "🖥️", "٥ ثم الواجهة", "5 Then the front end", { sub: I("تعرض فقط ولا تحسب", "displays, never computes") }),
      N("a6", 490, 180, 200, 80, "🎚️", "٦ الفلاتر", "6 Filters", { sub: I("اختبر فترة بلا بيانات", "test an empty period") }),
      N("a7", 260, 180, 200, 80, "🧮", "٧ مطابقة يدوية", "7 Manual match", { sub: I("غير قابلة للتخطي", "cannot be skipped"), info: I("قارن كل مؤشر بحسابك اليدوي في إكسل مرة واحدة {p30}.", "Compare every KPI with your own Excel calculation once {p30}.") }),
      N("a8", 30, 180, 200, 80, "🖱️", "٨ يفتح بنقرة", "8 Opens in one click"),
      N("app", 30, 330, 430, 120, "✅", "تطبيق يثق به الجميع", "An app everyone trusts", { fill: "var(--ok-soft)" }),
      N("trap", 500, 330, 430, 120, "🎀", "قفزت للواجهة أولًا: ساعات تجميل لأرقام خاطئة", "Jumped to the UI first: hours polishing wrong numbers", { fill: "var(--bad-soft)", info: I("بناء الواجهة قبل التأكد من صحة الأرقام هو الخطأ الأكثر تكرارًا؛ ثم تكتشف أن المشكلة في قراءة الملف فتعيد كل شيء {p30}.", "Building the UI before checking the numbers is the most common mistake; then you find the problem was reading the file and redo everything {p30}.") }),
    ],
    links: [{ from: "a1", to: "a2" }, { from: "a2", to: "a3" }, { from: "a3", to: "a4" }, { from: "a4", to: "a5" }, { from: "a5", to: "a6" }, { from: "a6", to: "a7" }, { from: "a7", to: "a8" }, { from: "a8", to: "app" }, { from: "a3", to: "trap", curve: 0.25, label: I("قفزة", "a jump") }],
    steps: [
      { t: I("السؤال والبيانات", "Question and data"), c: I("ما القرار الذي ستخدمه اللوحة؟ ومن سيفتحها وكم مرة؟ ثم ملف حقيقي صغير.", "What decision will the board serve? Who opens it and how often? Then a small real file."), show: ["a1", "a2"], hl: ["a1", "a2"], flow: ["a1>a2"] },
      { t: I("المشروع", "The project"), c: I("مجلد فارغ، افتحه في المحرر، شغّل Claude Code ونفّذ ‎/init‎.", "An empty folder, open it in the editor, run Claude Code and execute /init."), add: ["a3"], hl: ["a3"], flow: ["a2>a3"] },
      { t: I("الإغراء", "The temptation"), c: I("القفز للواجهة لأنها «الجزء الممتع»… يُنتج لوحة جميلة لا يثق بها أحد {p31}.", "Jumping to the UI because it’s “the fun part”… yields a pretty board nobody trusts {p31}."), add: ["trap"], hl: ["trap"], flow: ["a3>trap"], cls: { trap: "bad" } },
      { t: I("الخادم أولًا ثم الواجهة", "Server first, then the front end"), c: I("الأرقام تُثبت من صفحة التوثيق، ثم الواجهة تعرض فقط ولا تحسب شيئًا بنفسها.", "Numbers are confirmed from the docs page, then the front end only displays."), add: ["a4", "a5", "a6"], hl: ["a4"], dim: ["trap"], flow: ["a3>a4", "a4>a5", "a5>a6"] },
      { t: I("المطابقة ثم النقرة الواحدة", "Matching, then one click"), c: I("مطابقة يدوية لا تُتخطى، ثم ملف تشغيل واحد يبدأ الخادم ويفتح المتصفح {p30}.", "A manual match that can’t be skipped, then one launcher that starts the server and opens the browser {p30}."), add: ["a7", "a8", "app"], hl: ["a7", "app"], dim: ["trap"], flow: ["a6>a7", "a7>a8", "a8>app"], cls: { a7: "warn", app: "good" } },
    ],
    predict: { at: 3, q: I("ما الخطوة التالية الصحيحة بعد إنشاء المشروع؟", "What’s the right next step after creating the project?"), opts: [I("بناء الواجهة لنرى الشكل", "Build the UI to see the look"), I("بناء الخادم والتأكد من الأرقام", "Build the server and confirm the numbers"), I("إضافة الألوان والهوية", "Add colours and identity")], a: 1, why: I("الترتيب هو الدرس الأهم: البيانات، ثم صحة الأرقام، ثم العرض، ثم التجميل {p31}.", "Order is the key lesson: data, then correct numbers, then display, then polish {p31}.") },
  };
})();
