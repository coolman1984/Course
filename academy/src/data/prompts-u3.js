/* Prompt library — Guide 3 (pages 24–25). */
(function () {
  const L = (ar, en) => ({ ar, en });
  const P = (o) => ACAD.P(Object.assign({ src: "book" }, o));

  P({ id: "u3-p-prep-check", lesson: "u3-prepare", pages: [24], src: "add", cat: "analyze", icon: "🧽",
    title: L("افحص جاهزية ملف الإكسل قبل اللوحة", "Check an Excel file is dashboard-ready"),
    goal: L("قائمة مشاكل التهيئة الست في ملفك قبل أي تحليل.", "A list of the six prep problems in your file before any analysis."),
    text: L("هذا ملف إكسل سأبني منه لوحة معلومات (الملف مرفق). لا تحلل الأرقام بعد. افحص جاهزيته فقط وفق ست قواعد: هل الصف الأول مخصص لأسماء الأعمدة دون عناوين متراكبة؟ هل أسماء الأعمدة دالة وواضحة؟ هل توجد صفوف أو أعمدة فارغة داخل النطاق؟ هل توجد خلايا مدمجة؟ هل صيغ التواريخ والأرقام موحدة دون خلط نصوص بأرقام في العمود ذاته؟ وإن تعددت الأوراق، أيها الورقة المحورية التي نبدأ بها؟ أعطني جدولًا: القاعدة، والحالة (سليم / يحتاج إصلاح)، ومكان المشكلة بالضبط، وطريقة إصلاحها يدويًا.", "Here is an Excel file I’ll build a dashboard from (attached). Don’t analyse the numbers yet. Only check its readiness against six rules: Is the first row only column names, with no stacked titles? Are the column names meaningful? Are there blank rows or columns inside the range? Are there merged cells? Are date and number formats consistent, with no text mixed into numeric columns? If there are several sheets, which core sheet should we start with? Give me a table: rule, status (OK / needs fixing), the exact location of the problem, and how to fix it by hand."),
    example: L("القاعدة ٤ — خلايا مدمجة: يحتاج إصلاح — العناوين A1:F1 مدمجة — فك الدمج واترك صف عناوين واحدًا.", "Rule 4 — merged cells: needs fixing — headers A1:F1 are merged — unmerge and keep one header row."),
    tip: L("خمس دقائق هنا توفّر ساعات مراجعة لاحقًا {p24}.", "Five minutes here save hours of review later {p24}.") });

  P({ id: "u3-p-s1", lesson: "u3-stages", pages: [24], cat: "decide", icon: "🎯",
    title: L("المرحلة ١: الغرض والجمهور", "Stage 1: purpose and audience"),
    goal: L("أن يفهم النموذج القرار الذي ستخدمه اللوحة قبل أي خطوة.", "Make the model understand the decision the board serves before any step."),
    text: L("لديّ بيانات مبيعات شهرية، وستُعرض لوحة المعلومات على مدير الإدارة أسبوعيًا لاتخاذ قرار سريع بشأن الأداء. قبل تنفيذ أي خطوة، اطرح عليّ من ثلاثة إلى خمسة أسئلة جوهرية تمكّنك من فهم الاحتياج بدقة.", "I have monthly sales data, and the dashboard will be shown to the department manager weekly to make a quick decision about performance. Before taking any step, ask me three to five essential questions that let you understand the need precisely."),
    tip: L("معيار الانتقال: وضوح القرار الذي تخدمه اللوحة {p25}.", "Exit criterion: clarity on the decision the board serves {p25}.") });

  P({ id: "u3-p-s2", lesson: "u3-stages", pages: [24], cat: "analyze", icon: "🔎",
    title: L("المرحلة ٢: التحليل الأولي واشتقاق المؤشرات", "Stage 2: initial analysis and KPIs"),
    goal: L("مؤشرات مشتقة من بنية البيانات نفسها، مع تبرير كل مؤشر.", "KPIs derived from the data’s own structure, each justified."),
    text: L("هذه بيانات المبيعات (الملف مرفق). حلّل الأعمدة المتاحة، واقترح أهم أربعة إلى ستة مؤشرات أداء رئيسية (KPIs) تستحق الظهور في صدر اللوحة، مع تبرير موجز لأهمية كل مؤشر في سياق اتخاذ القرار.", "Here is the sales data (file attached). Analyse the available columns and suggest the four to six most important key performance indicators (KPIs) that deserve the top of the dashboard, with a brief justification of each indicator’s importance for decision-making."),
    tip: L("معيار الانتقال: اعتماد قائمة مؤشرات مبرَّرة {p25}.", "Exit criterion: an approved, justified KPI list {p25}.") });

  P({ id: "u3-p-s3", lesson: "u3-stages", pages: [24], cat: "build", icon: "📐",
    title: L("المرحلة ٣: اعتماد التصميم قبل التنفيذ", "Stage 3: approve the layout before building"),
    goal: L("مخطط نصي سريع تراجعه وتعدّله قبل استهلاك الوقت في البناء.", "A quick text layout to review and adjust before spending time building."),
    text: L("قبل البناء، اعرض عليّ تصورًا مقترحًا لتقسيم الصفحة: عدد بطاقات المؤشرات في الأعلى، وأنواع الرسوم البيانية الملائمة لكل مؤشر ومبرر اختيارها، وموضع جدول التفاصيل. اعرضه في نقاط موجزة دون تنفيذ.", "Before building, show me a proposed page layout: the number of KPI cards at the top, the suitable chart type for each indicator and why, and where the details table goes. Present it as brief bullet points without building anything."),
    tip: L("مراجعة المخطط نصًا أسرع وأقل كلفة من مراجعة مخرَج منفّذ {p24}.", "Reviewing a text layout is faster and cheaper than reviewing a built output {p24}.") });

  P({ id: "u3-p-s4", lesson: "u3-stages", pages: [24], cat: "build", icon: "🏗️",
    title: L("المرحلة ٤: بناء اللوحة", "Stage 4: build the dashboard"),
    goal: L("لوحة كاملة مطابقة للتصور المعتمد من المحاولة الأولى.", "A complete board matching the approved plan on the first try."),
    text: L("نفّذ الآن لوحة معلومات تفاعلية كاملة وفق التصور المعتمد: بطاقات المؤشرات في الأعلى، والرسوم البيانية في الوسط، وجدول تفاصيل قابل للفرز في الأسفل. بتنسيق احترافي وألوان هادئة، ومتجاوب مع الشاشات الصغيرة، وفي ملف واحد يعمل دون اتصال بالإنترنت.", "Now build a complete interactive dashboard following the approved plan: KPI cards at the top, charts in the middle, and a sortable details table at the bottom. Professional styling with calm colours, responsive on small screens, in a single file that works offline."),
    tip: L("معيار الانتقال: مخرَج مطابق للمواصفات المتفق عليها {p25}.", "Exit criterion: output matching the agreed spec {p25}.") });

  P({ id: "u3-p-s5", lesson: "u3-stages", pages: [24], cat: "build", icon: "🎚️",
    title: L("المرحلة ٥: عوامل التصفية والتفاعلية", "Stage 5: filters and interactivity"),
    goal: L("تحويل التقرير الثابت إلى أداة استكشاف يقطّع فيها المستخدم البيانات بنفسه.", "Turn a static report into an exploration tool the user can slice."),
    text: L("أضف عوامل تصفية في أعلى اللوحة: تصفية بالفترة الزمنية، وبالمنتج، وبالمنطقة. وعند تغيير أي منها، يجب أن تتحدث جميع البطاقات والرسوم والجدول تلقائيًا وبصورة متزامنة.", "Add filters at the top of the dashboard: by time period, by product and by region. When any of them changes, all cards, charts and the table must update automatically and in sync."),
    tip: L("اختبر فلترًا يُنتج نتيجة فارغة: هل تظهر رسالة واضحة أم صفر مضلل؟", "Test a filter that yields nothing: is there a clear message or a misleading zero?") });

  P({ id: "u3-p-s6", lesson: "u3-stages", pages: [25], cat: "build", icon: "🎨",
    title: L("المرحلة ٦: ضبط الهوية البصرية", "Stage 6: visual identity"),
    goal: L("ألوان وخطوط ووضع داكن وطباعة — بتعديلات قصيرة متتابعة.", "Colours, fonts, dark mode and print — in short successive tweaks."),
    text: L("اجعل اللون الأساسي أزرق داكنًا متوافقًا مع الهوية المؤسسية، وكبّر حجم خط الأرقام لتحسين الوضوح عند العرض، وأضف وضعًا داكنًا (Dark Mode) وتنسيقًا مخصصًا للطباعة.", "Make the primary colour a dark blue matching the corporate identity, enlarge the number font for clarity when presenting, and add a dark mode and a print-specific layout."),
    tip: L("هذه المرحلة لا تحتاج صياغة مطولة؛ التعديلات القصيرة المتتابعة أدق وأسرع {p25}.", "This stage needs no long wording; short successive tweaks are more precise and faster {p25}.") });

  P({ id: "u3-p-s7", lesson: "u3-stages", pages: [25], cat: "analyze", icon: "🔍",
    title: L("المرحلة ٧: التحقق من صحة الأرقام", "Stage 7: verify the numbers"),
    goal: L("قائمة بالقيم المشكوك فيها لتدقيقها يدويًا قبل أي مشاركة.", "A list of doubtful values to audit by hand before any sharing."),
    text: L("راجع جميع الأرقام الظاهرة في اللوحة وتحقق من مطابقتها الكاملة لبيانات الملف الأصلي، ثم أبلغني بأي قيمة شاذة أو غير متسقة تستدعي تدقيقًا يدويًا من جانبي.", "Review every number shown on the dashboard and check it fully matches the original file’s data, then tell me about any outlier or inconsistent value that needs a manual check on my side."),
    tip: L("هذا الطلب لا يغني عن مراجعتك أنت: طابق رقمين على الأقل بنفسك في إكسل {p25}.", "This request doesn’t replace your own review: match at least two numbers yourself in Excel {p25}.") });

  P({ id: "u3-p-audit", lesson: "u3-mistakes", pages: [25], src: "add", cat: "decide", icon: "🚧",
    title: L("دقّق لوحتي ضد الأخطاء الستة الشائعة", "Audit my dashboard against the six common mistakes"),
    goal: L("مراجعة نقدية سريعة قبل العرض على الجمهور.", "A quick critical review before showing it to the audience."),
    text: L("هذه لوحة معلومات بنيتها [صفها أو أرفقها] وجمهورها [صف الجمهور: إدارة تنفيذية / فريق تشغيل]. راجعها كمدقق صارم ضد ستة أخطاء شائعة: بيانات غير مهيأة، وطلب مفرط في العمومية لا يخدم قرارًا، وقبول الأرقام دون تحقق، ودمج كل المتطلبات في طلب واحد، وحجم بيانات مفرط دون تجميع مسبق، وإهمال جمهور العرض. لكل خطأ: هل يظهر في لوحتي؟ ما الدليل؟ وما الإصلاح في خطوة واحدة؟ ثم رتّب الإصلاحات حسب الخطورة.", "Here is a dashboard I built [describe or attach it]; its audience is [executive management / operations team]. Review it as a strict auditor against six common mistakes: unprepared data, an overly generic request that serves no decision, accepting numbers without checking, cramming every requirement into one request, excessive data volume without pre-aggregation, and ignoring the audience. For each: does it appear in my dashboard? What’s the evidence? What’s the one-step fix? Then rank the fixes by severity."),
    tip: L("أكثر من عشرة آلاف صف؟ لخّصها قبل العرض {p25}.", "Over ten thousand rows? Summarise before displaying {p25}.") });
})();
