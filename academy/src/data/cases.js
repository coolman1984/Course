/* Applied cases: problem → traditional way → the AI idea → steps → result → risks.
   The settings are realistic workplaces; every number is hypothetical and labelled as such on screen. */
(function () {
  const L = (ar, en) => ({ ar, en });
  const C = (o) => ACAD.cases.push(Object.assign({ src: "add" }, o));

  /* ---- one case per guide (shown on the unit page) ---- */
  C({ id: "capstone", icon: "🗓️", sector: "office", lesson: "u1-habit", pages: [7, 15, 16],
    title: L("مسؤولة إدارية تستعيد ساعة يوميًا", "An admin officer wins back an hour a day"),
    problem: L("ردود بريد متكررة، وتقرير أسبوعي يُكتب من الصفر، ومعادلات إكسل تُنسخ يدويًا — نحو ٦ ساعات أسبوعيًا (رقم افتراضي).", "Repeated email replies, a weekly report written from scratch, Excel formulas copied by hand — about 6 hours a week (hypothetical)."),
    traditional: L("كل مهمة تُنفَّذ يدويًا كل مرة، والأخطاء تُكتشف بعد الإرسال.", "Every task done by hand each time; errors found after sending."),
    ai: L("تطبيق «المعادلة» والعناصر الخمسة على أكثر ثلاث مهام تكرارًا، ثم حفظ الطلبات الناجحة كقوالب {p7}.", "Apply “the equation” and the five elements to the three most repeated tasks, then keep the winning prompts as templates {p7}."),
    steps: L("١ قائمة المهام بالوقت · ٢ برومبت لكل مهمة مع «اسألني عن أي معلومة ناقصة» · ٣ معادلة الهامش مع اختبار ثلاث حالات · ٤ عادة يومية ٢٠ دقيقة لتحسين القوالب {p15}.", "1 list tasks with time · 2 a prompt per task with “ask me about missing info” · 3 the margin formula tested on three cases · 4 a daily 20-minute habit to refine templates {p15}."),
    result: L("التقرير الأسبوعي من ٩٠ إلى ٣٠ دقيقة، وصفر أخطاء معادلات في شهرين (افتراضي).", "Weekly report from 90 to 30 minutes, zero formula errors in two months (hypothetical)."),
    risks: L("إرسال نص لم يُراجع، أو لصق بيانات حساسة في أداة عامة. الحل: مراجعة بشرية دائمًا وإخفاء الأسماء.", "Sending unreviewed text, or pasting sensitive data into a public tool. Fix: always review, and mask names.") });

  C({ id: "efficiency", icon: "🏭", sector: "factory", lesson: "u2-project", pages: [17, 22, 23],
    title: L("مصنع: تقرير الكفاءة من نصف يوم إلى دقائق", "A factory: the efficiency report from half a day to minutes"),
    problem: L("ملفات إنتاج وتوقفات من ثلاث ورديات تُدمج يدويًا كل أسبوع، والتعريفات تختلف بين الأقسام.", "Production and downtime files from three shifts merged by hand weekly, with definitions differing between departments."),
    traditional: L("مهندس يقضي ٤ ساعات في النسخ والدمج والرسم، ثم تُعرض شرائح لا تجيب «ماذا نفعل؟».", "An engineer spends 4 hours copying, merging and charting, then shows slides that don’t answer “what do we do?”."),
    ai: L("المسار الكامل للدليل الثاني: أداة أتمتة، ثم محرك تحليل بفحص جودة، ثم صفحة تنفيذية بالمحطات السبع {p21}.", "Guide 2’s full path: an automation tool, then an analysis engine with quality checks, then an executive page with the seven stations {p21}."),
    steps: L("١ مواصفة بخمسة عناصر واختبارات · ٢ أداة تقرأ مجلد الورديات بسجل تشغيل · ٣ تقرير جودة قبل أي رسم · ٤ صفحة واحدة تبدأ بالنتيجة وتنتهي بالقرار {p22}.", "1 a five-element spec with tests · 2 a tool reading the shifts folder with a run log · 3 a quality report before any chart · 4 one page starting with the result and ending with the decision {p22}."),
    result: L("التقرير جاهز صباح الأحد تلقائيًا، والاجتماع يبدأ بالقرار لا بالجدال حول الأرقام (افتراضي).", "The report is ready automatically on Sunday morning; the meeting starts with the decision, not arguing over numbers (hypothetical)."),
    risks: L("تغيير شكل ملف وردية دون إبلاغ. الحل: توقف صريح برسالة واضحة، ومالك محدد للأداة.", "A shift file changing shape unannounced. Fix: an explicit stop with a clear message, and a named tool owner.") });

  C({ id: "dashboard", icon: "📊", sector: "sales", lesson: "u3-stages", pages: [24, 25],
    title: L("مدير مبيعات يحصل على لوحة قرار أسبوعية", "A sales manager gets a weekly decision board"),
    problem: L("ملف مبيعات شهري بـ ١٢ عمودًا ولا أحد يعرف أي رقم يستحق الانتباه.", "A monthly sales file with 12 columns and nobody knows which number deserves attention."),
    traditional: L("جدول محوري جديد كل أسبوع وألوان يدوية، والنتيجة تختلف حسب من أعدّها.", "A new pivot table each week with manual colours; the result varies by who made it."),
    ai: L("المراحل الثماني بطلب قصير لكل مرحلة، بدءًا من «اطرح عليّ ٣–٥ أسئلة» وانتهاءً بالتحقق من الأرقام {p24}.", "The eight stages with a short request each, from “ask me 3–5 questions” to verifying the numbers {p24}."),
    steps: L("١ تهيئة الملف بالقواعد الست · ٢ أسئلة الغرض · ٣ اشتقاق ٥ مؤشرات · ٤ المخطط نصًا · ٥ البناء والفلاتر · ٦ مطابقة رقمين يدويًا قبل المشاركة {p25}.", "1 prep the file with the six rules · 2 purpose questions · 3 derive 5 KPIs · 4 layout as text · 5 build and filters · 6 match two numbers by hand before sharing {p25}."),
    result: L("لوحة بملف واحد تُفتح في الاجتماع، وزمن الإعداد من ساعتين إلى ٢٠ دقيقة (افتراضي).", "A one-file board opened in the meeting; prep time from two hours to 20 minutes (hypothetical)."),
    risks: L("رقم أنيق خاطئ يقود قرارًا. الحل: المرحلة السابعة ليست اختيارية.", "A pretty but wrong number driving a decision. Fix: stage seven isn’t optional.") });

  C({ id: "localapp", icon: "🏠", sector: "finance", lesson: "u4-build", pages: [30, 31],
    title: L("محلل مالي يبني تطبيقًا لا تغادر بياناته الجهاز", "A financial analyst builds an app whose data never leaves the machine"),
    problem: L("بيانات مصروفات حساسة لا يجوز رفعها لأي خدمة، والتحليل اليدوي يستهلك يومين شهريًا.", "Sensitive expense data that can’t be uploaded anywhere; manual analysis takes two days a month."),
    traditional: L("إكسل ضخم بروابط بين أوراق تنكسر عند أي تعديل.", "A huge Excel with cross-sheet links that break at any change."),
    ai: L("تطبيق ويب محلي ببرومبتات التنفيذ الخمسة بالترتيب: تخطيط، فجودة، فخادم، فواجهة، فتغليف {p31}.", "A local web app via the five execution prompts in order: plan, quality, server, front end, packaging {p31}."),
    steps: L("١ CLAUDE.md للمشروع · ٢ تقرير جودة الملف · ٣ خادم FastAPI ونقاط وصول مفلترة · ٤ واجهة تعرض فقط · ٥ ملف تشغيل بنقرة وتعليمات لزميل {p31}.", "1 a project CLAUDE.md · 2 a file quality report · 3 a FastAPI server with filtered endpoints · 4 a display-only front end · 5 a one-click launcher and a colleague guide {p31}."),
    result: L("التحليل الشهري في ساعة، وزميل يشغّله من التعليمات وحدها (افتراضي).", "Monthly analysis in an hour; a colleague runs it from the guide alone (hypothetical)."),
    risks: L("بناء الواجهة قبل التأكد من الأرقام. الحل: الخادم أولًا ومطابقة يدوية غير قابلة للتخطي {p30}.", "Building the UI before checking the numbers. Fix: server first and an unskippable manual match {p30}.") });

  C({ id: "team", icon: "👥", sector: "warehouse", lesson: "u5-team", pages: [37, 38, 39, 40],
    title: L("مخزن: فريق من ثلاثة وكلاء يراقب النواقص", "A warehouse: a three-agent team watches for shortages"),
    problem: L("تقرير النواقص اليومي يمر بأربع نقلات يدوية بين النظام والبريد وإكسل والمشتريات.", "The daily shortage report passes through four manual handoffs between the system, email, Excel and purchasing."),
    traditional: L("أمين المخزن يجمع ويحسب ويرسل، وأي غياب يوقف التقرير.", "The storekeeper gathers, computes and sends; any absence stops the report."),
    ai: L("شريحة عمودية واحدة (صنف حرج واحد أولًا) يديرها جامع ومحلل ومراجع، والإرسال بموافقة بشرية {p38}.", "One vertical slice (one critical item first) run by a gatherer, analyst and reviewer, with sending under human approval {p38}."),
    steps: L("١ تشخيص العملية وعدّ النقلات · ٢ قاموس تعريفات «حد الطلب» · ٣ بطاقة لكل وكيل وأقل صلاحية · ٤ سقف للمحاولات وسجل كامل · ٥ قياس النقلات التي اختفت {p40}.", "1 diagnose the process and count handoffs · 2 a definitions dictionary for “reorder level” · 3 a card per agent with least privilege · 4 a cap on attempts and a full log · 5 measure the handoffs that vanished {p40}."),
    result: L("أربع نقلات أصبحت واحدة (الموافقة)، والتنبيه يصل عند وصول الملف لا في الموعد (افتراضي).", "Four handoffs became one (approval); the alert arrives when the file does, not at a fixed time (hypothetical)."),
    risks: L("وكيل بصلاحية إرسال بلا موافقة، أو حلقة لا تنتهي. الحل: ضوابط الحوكمة الأربعة {p40}.", "An agent able to send without approval, or an endless loop. Fix: the four governance controls {p40}.") });

  /* ---- lesson cases (shown inside the lesson) ---- */
  C({ id: "hr-ask", icon: "🧑‍💼", sector: "hr", lesson: "u1-ask", pages: [7],
    title: L("الموارد البشرية: إعلان وظيفة بلا تخمين", "HR: a job ad without guessing"),
    problem: L("إعلان وظيفة يُكتب ويُعاد ثلاث مرات لأن النموذج افترض مستوى خبرة ومزايا خاطئة.", "A job ad rewritten three times because the model assumed the wrong seniority and benefits."),
    traditional: L("نسخ إعلان قديم وتعديله يدويًا.", "Copying an old ad and editing it by hand."),
    ai: L("إضافة «اسألني عن أي معلومة ناقصة قبل الإجابة» فيسأل النموذج عن الخبرة والراتب ونمط العمل أولًا {p7}.", "Adding “ask me about any missing information first” so the model asks about experience, salary and work mode {p7}."),
    steps: L("١ الطلب الأساسي · ٢ جملة الأسئلة أولًا · ٣ الإجابة عن ٤ أسئلة · ٤ طلب نسخة مختصرة لـ LinkedIn.", "1 the basic request · 2 the ask-first sentence · 3 answer 4 questions · 4 request a short LinkedIn version."),
    result: L("نسخة صحيحة من أول مرة بعد الأسئلة (افتراضي).", "A correct version first time after the questions (hypothetical)."),
    risks: L("لغة قد تميّز ضد فئة دون قصد. الحل: اطلب مراجعة الحياد قبل النشر.", "Wording that unintentionally discriminates. Fix: ask for a neutrality review before posting.") });

  C({ id: "fin-excel", icon: "🧮", sector: "finance", lesson: "u1-excel", pages: [13],
    title: L("المحاسبة: معادلة هامش لا تنكسر", "Accounting: a margin formula that doesn’t break"),
    problem: L("عمود الهامش يمتلئ بأخطاء القسمة على صفر فتنهار المجاميع والرسوم.", "The margin column fills with divide-by-zero errors, breaking totals and charts."),
    traditional: L("حذف الأخطاء يدويًا كل شهر.", "Deleting errors by hand each month."),
    ai: L("طلب الكتاب: معادلة تظهر فارغة عند نقص البيانات، مشروحة ببساطة ومختبرة على ثلاث حالات {p13}.", "The book’s request: a formula that shows empty on missing data, explained simply and tested on three cases {p13}."),
    steps: L("١ وصف الأعمدة بدقة · ٢ طلب المعادلة · ٣ اختبار: صف كامل، وكمية صفر، وخلية فارغة · ٤ تفضيل الشرط الصريح على إخفاء كل الأخطاء.", "1 describe the columns precisely · 2 request the formula · 3 test: full row, zero quantity, empty cell · 4 prefer an explicit condition over hiding every error."),
    result: L("عمود نظيف ومجاميع صحيحة، وخطأ المرجع الحقيقي يبقى ظاهرًا (افتراضي).", "A clean column and correct totals, with real reference errors still visible (hypothetical)."),
    risks: L("IFERROR يخفي أخطاء حقيقية. الحل: عالج الحالات المحددة فقط.", "IFERROR hides real errors. Fix: handle only the named cases.") });

  C({ id: "mkt-think", icon: "📣", sector: "marketing", lesson: "u1-scenarios", pages: [11],
    title: L("التسويق: حملة تُختبر قبل إطلاقها", "Marketing: a campaign tested before launch"),
    problem: L("فريق متحمس لحملة كبيرة دون مناقشة ما قد يفشلها.", "A team excited about a big campaign without discussing what could make it fail."),
    traditional: L("اجتماع يوافق فيه الجميع ثم مراجعة بعد الخسارة.", "A meeting where everyone agrees, then a post-mortem after the loss."),
    ai: L("برومبت «لا توافقني تلقائيًا» مع تشريح مسبق: «افترض أن الحملة فشلت بعد ٣ أشهر؛ لماذا؟» {p11}.", "The “don’t agree automatically” prompt with a pre-mortem: “assume the campaign failed after 3 months — why?” {p11}."),
    steps: L("١ اعرض الخطة · ٢ اطلب أقوى ٥ أسباب للفشل · ٣ ثلاثة سيناريوهات بأرقام · ٤ تعديل الخطة وتحديد مؤشر إيقاف مبكر.", "1 present the plan · 2 ask for the 5 strongest failure reasons · 3 three scenarios with numbers · 4 adjust the plan and set an early-stop indicator."),
    result: L("إطلاق تجريبي في مدينة واحدة بدل الإطلاق الشامل (افتراضي).", "A pilot in one city instead of a full launch (hypothetical)."),
    risks: L("طلب نقد مصطنع لتأكيد رأي مسبق. الحل: اطلب الأدلة لا الآراء.", "Asking for staged criticism to confirm a prior view. Fix: ask for evidence, not opinions.") });

  C({ id: "office-brain", icon: "📚", sector: "office", lesson: "u1-brain", pages: [12, 13],
    title: L("الإدارة القانونية: إجابات من اللوائح الداخلية فقط", "Legal department: answers from internal policies only"),
    problem: L("موظفون يسألون نفس الأسئلة عن اللوائح، والإجابات تختلف حسب من يُسأل.", "Staff ask the same policy questions, and answers vary by who is asked."),
    traditional: L("البحث في ملفات PDF طويلة أو سؤال زميل خبير.", "Searching long PDFs or asking an expert colleague."),
    ai: L("دفتر معرفة يجيب من مصادرك أنت فقط مع إحالة لموضع كل إجابة {p12}.", "A notebook that answers only from your sources, citing where each answer came from {p12}."),
    steps: L("١ رفع اللوائح المعتمدة فقط · ٢ اختبار ١٠ أسئلة معروفة الإجابة · ٣ فحص الإحالات · ٤ تحديث المصادر عند صدور لائحة جديدة.", "1 upload approved policies only · 2 test 10 questions with known answers · 3 check citations · 4 refresh sources when a new policy is issued."),
    result: L("إجابة موحدة بإحالة خلال ثوانٍ (افتراضي).", "A consistent, cited answer in seconds (hypothetical)."),
    risks: L("مصدر قديم يعطي إجابة قديمة بثقة. الحل: مالك للمصادر وتاريخ مراجعة.", "An outdated source giving an outdated answer confidently. Fix: a source owner and review date.") });

  C({ id: "wh-auto", icon: "📦", sector: "warehouse", lesson: "u2-level1", pages: [18, 19],
    title: L("المخازن: تجميع ملفات الفروع كل صباح", "Warehousing: gathering branch files every morning"),
    problem: L("١٢ ملف جرد يصل بالبريد يوميًا ويُنسخ في ملف رئيسي.", "12 inventory files arrive by email daily and are copied into a master file."),
    traditional: L("ساعة نسخ ولصق يومية مع أخطاء صفوف مكررة.", "An hour of daily copy-paste with duplicated-row errors."),
    ai: L("أداة بايثون بأثبت طريقة (قراءة الملفات مباشرة، لا محاكاة الفأرة) تراقب المجلد وتتوقف بصراحة عند ملف غريب {p18}.", "A Python tool using the most stable way (reading files directly, no mouse simulation) that watches the folder and stops explicitly on an odd file {p18}."),
    steps: L("١ مواصفة بخمسة عناصر · ٢ برومبت بناء أداة الأتمتة كما هو · ٣ خمس حالات اختبار بينها ملف ناقص · ٤ تشغيل تلقائي عند وصول ملف.", "1 a five-element spec · 2 the automation-tool prompt as-is · 3 five test cases including a missing file · 4 auto-run on file arrival."),
    result: L("الملف الرئيسي جاهز قبل وصول الموظفين، مع سجل لكل ملف (افتراضي).", "The master file ready before staff arrive, with a log per file (hypothetical)."),
    risks: L("تعديل الملفات الأصلية. الحل: قراءة فقط والكتابة في مجلد منفصل.", "Modifying original files. Fix: read only, write to a separate folder.") });

  C({ id: "sb-exec", icon: "🏪", sector: "smallbiz", lesson: "u2-level3", pages: [21],
    title: L("شركة صغيرة: صفحة واحدة للشريك المموّل", "A small business: one page for the investing partner"),
    problem: L("الشريك يريد أن يفهم وضع الفروع في دقائق لا في ملف من ٤٠ ورقة.", "The partner wants to grasp the branches’ status in minutes, not a 40-sheet file."),
    traditional: L("إرسال إكسل كامل وانتظار الأسئلة.", "Sending the whole Excel and waiting for questions."),
    ai: L("الصفحة التنفيذية: النتيجة أولًا، ثم المشكلة والأسباب والأثر والقرار، ومعيار الثلاثين ثانية {p21}.", "The executive page: result first, then problem, causes, impact and decision — with the 30-second rule {p21}."),
    steps: L("١ تحليل نظيف · ٢ برومبت الصفحة التنفيذية · ٣ حركة لتوجيه الانتباه فقط · ٤ ملف واحد يعمل بلا إنترنت.", "1 a clean analysis · 2 the executive-page prompt · 3 motion only to guide attention · 4 one file that works offline."),
    result: L("قرار إغلاق فرع خاسر في اجتماع واحد (افتراضي).", "A decision to close a losing branch in one meeting (hypothetical)."),
    risks: L("تجميل يخفي ضعف البيانات. الحل: جدول التفاصيل في الأسفل لمن يريد التحقق.", "Polish hiding weak data. Fix: a details table at the bottom for anyone who wants to check.") });

  C({ id: "sales-backend", icon: "🛰️", sector: "sales", lesson: "u4-backend", pages: [29],
    title: L("المبيعات: رقم واحد في كل الشاشات", "Sales: one number on every screen"),
    problem: L("لوحتان تعرضان «صافي المبيعات» برقمين مختلفين لأن كلًا منهما يحسبه بطريقته.", "Two dashboards show “net sales” with different numbers because each computes it its own way."),
    traditional: L("اجتماع لتحديد أي الرقمين صحيح.", "A meeting to decide which number is right."),
    ai: L("نقل الحساب إلى الخادم في مكان واحد، والواجهات تعرض فقط عبر نقاط الوصول {p29}.", "Moving the calculation to the server in one place; interfaces only display via endpoints {p29}."),
    steps: L("١ تعريف واحد للمؤشر · ٢ نقطة وصول /summary · ٣ ربط اللوحتين بها · ٤ اختبار الفلاتر على فترة بلا بيانات.", "1 one indicator definition · 2 a /summary endpoint · 3 connect both boards to it · 4 test filters on an empty period."),
    result: L("نفس الرقم في كل مكان، والجدال انتهى (افتراضي).", "The same number everywhere; the arguing stopped (hypothetical)."),
    risks: L("خادم يفشل بصمت. الحل: سجل تشغيل ورسالة واضحة.", "A server failing silently. Fix: a run log and a clear message.") });

  C({ id: "local-hr", icon: "🔐", sector: "hr", lesson: "u5-local", pages: [36],
    title: L("الموارد البشرية: تلخيص تقييمات سرية محليًا", "HR: summarising confidential reviews locally"),
    problem: L("٣٠٠ تقييم أداء سري تحتاج تلخيصًا، ورفعها لأي خدمة سحابية ممنوع.", "300 confidential performance reviews need summarising, and uploading them to any cloud service is forbidden."),
    traditional: L("قراءة يدوية لأسبوعين.", "Two weeks of manual reading."),
    ai: L("نموذج 8B مضغوط (Q4_K_M) عبر LM Studio على جهاز ١٦ جيجا؛ البيانات لا تغادر الجهاز {p36}.", "A compressed 8B model (Q4_K_M) via LM Studio on a 16 GB machine; data never leaves the machine {p36}."),
    steps: L("١ اختيار الحجم من جدول الكتاب · ٢ اختبار السرعة على ١٠ تقييمات · ٣ قالب تلخيص ثابت · ٤ مراجعة بشرية لعينة.", "1 pick the size from the book’s table · 2 test speed on 10 reviews · 3 a fixed summary template · 4 human review of a sample."),
    result: L("التلخيص في يومين بدل أسبوعين، بلا أي رفع (افتراضي).", "Summaries in two days instead of two weeks, with no uploads (hypothetical)."),
    risks: L("جودة أقل من القمة السحابية. الحل: مهمة تلخيص بسيطة تناسب المحلي، ومراجعة العينة.", "Lower quality than the cloud frontier. Fix: a simple summarising task that suits local, plus sample review.") });

  C({ id: "fin-model", icon: "💸", sector: "finance", lesson: "u5-market", pages: [34, 35],
    title: L("المالية: ميزانية نموذج قبل التعاقد", "Finance: a model budget before signing"),
    problem: L("عرض اشتراك سنوي بأقوى نموذج لتصنيف ٤٠٠٠ فاتورة يوميًا.", "An annual subscription offer for the strongest model to classify 4,000 invoices daily."),
    traditional: L("قبول العرض لأن «الأقوى أضمن».", "Accepting because “the strongest is safest”."),
    ai: L("قاعدة «ابدأ من الأسفل»: اختبار نموذج اقتصادي ونموذج متوسط على ٢٠٠ فاتورة حقيقية بمعيار دقة محدد {p34}.", "The “start at the bottom” rule: test an economy and a mid model on 200 real invoices against a set accuracy bar {p34}."),
    steps: L("١ برومبت اختيار النموذج · ٢ حساب التكلفة الشهرية بنطاقات الكتاب · ٣ الاختبار على العينة · ٤ فحص الفخاخ الثلاثة في العقد {p35}.", "1 the model-selection prompt · 2 monthly cost with the book’s bands · 3 test on the sample · 4 check the three traps in the contract {p35}."),
    result: L("النموذج الاقتصادي حقق الدقة المطلوبة بجزء صغير من التكلفة (افتراضي).", "The economy model met the accuracy bar at a small fraction of the cost (hypothetical)."),
    risks: L("سعر تمهيدي ينتهي بعد ٣ أشهر. الحل: اقرأ الحواشي قبل ميزانية سنوية.", "An introductory price that ends after 3 months. Fix: read the footnotes before an annual budget.") });
})();
