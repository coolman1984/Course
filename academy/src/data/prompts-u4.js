/* Prompt library — Guide 4 (pages 26–31). */
(function () {
  const L = (ar, en) => ({ ar, en });
  const P = (o) => ACAD.P(Object.assign({ src: "book" }, o));

  P({ id: "u4-p-tour", lesson: "u4-vscode", pages: [26], src: "add", cat: "learn", icon: "🧭",
    title: L("جولة إرشادية في مشروعي داخل المحرر", "A guided tour of my project in the editor"),
    goal: L("أن تفهم ما في مجلدك قبل أن تطلب أي تعديل.", "Understand what’s in your folder before asking for any change."),
    text: L("أنا مبتدئ تمامًا وفتحت للتو هذا المجلد في VS Code. لا تعدّل أي ملف. اشرح لي بالعربية وبلغة بسيطة: ما هذا المشروع؟ ما دور كل مجلد وملف رئيسي في سطر واحد؟ ما الملف الذي أبدأ بقراءته؟ وما الأمر الذي أكتبه في الطرفية لتشغيله، وكيف أتأكد أن الطرفية مفتوحة على مجلد المشروع الصحيح؟", "I’m a complete beginner and just opened this folder in VS Code. Don’t modify any file. Explain to me in simple language: what is this project? What does each main folder and file do, in one line? Which file should I read first? Which command do I type in the terminal to run it, and how do I check the terminal is open in the right project folder?"),
    tip: L("القراءة قبل التعديل هي الخطوة الخامسة في أول جلسة {p27}.", "Read before edit is step five of your first session {p27}.") });

  P({ id: "u4-p-claudemd", lesson: "u4-claudecode", pages: [27], cat: "build", icon: "📘",
    title: L("بناء ملف CLAUDE.md", "Build the CLAUDE.md file"),
    goal: L("ملف تعريف دائم يُقرأ تلقائيًا في بداية كل جلسة.", "A permanent briefing file read automatically at the start of each session."),
    text: L("افحص هذا المشروع، ثم أنشئ ملف CLAUDE.md يشرح: التقنيات المستخدمة، وبنية المجلدات، وأوامر التشغيل والاختبار، وقواعد التسمية المتبعة، والملفات التي يجب ألّا تُعدَّل إطلاقًا. اجعله مختصرًا وكل تعليمة فيه قابلة للتحقق، لا نصيحة عامة.", "Examine this project, then create a CLAUDE.md file that explains: the technologies used, the folder structure, the run and test commands, the naming rules followed, and the files that must never be modified. Keep it short, with every instruction verifiable — not general advice."),
    example: L("مثال سطر جيد: «لا تعدّل أي ملف داخل data/ — يُقرأ فقط». مثال سطر ضعيف: «اكتب كودًا نظيفًا».", "A good line: “Never modify files in data/ — read only.” A weak line: “Write clean code.”"),
    tip: L("كتابته مرة واحدة توفّر إعادة شرح المشروع في كل محادثة {p27}.", "Writing it once saves re-explaining the project in every chat {p27}.") });

  P({ id: "u4-p-plan-first", lesson: "u4-claudecode", pages: [27], cat: "build", icon: "🗺️",
    title: L("البرومبت اليومي: الخطة قبل التنفيذ", "The daily prompt: plan before execution"),
    goal: L("تراجع ما سيتغير قبل أن يتغير، وتعالج السبب لا العَرَض.", "Review what will change before it changes; treat the cause, not the symptom."),
    text: L("أريد [صف الميزة أو الإصلاح]. قبل أن تكتب أي كود، اعرض عليّ خطتك: ما الملفات التي ستنشئها أو تعدّلها، وما التغيير في كل منها، وما المخاطر المحتملة. انتظر موافقتي قبل التنفيذ. وإن كنت تصلح خطأ، شخّص سببه الحقيقي لا عَرَضه، واشرحه لي بالعربية، ثم أصلحه، ثم شغّل التطبيق للتأكد أن الإصلاح نجح فعلًا.", "I want [describe the feature or fix]. Before writing any code, show me your plan: which files you’ll create or modify, what changes in each, and the possible risks. Wait for my approval before executing. If you’re fixing a bug, diagnose its real cause, not the symptom, explain it to me, fix it, then run the app to confirm the fix actually worked."),
    tip: L("استخدمه مع كل طلب تعديل {p27}.", "Use it with every change request {p27}.") });

  P({ id: "u4-p-explain-project", lesson: "u4-claudecode", pages: [27], src: "add", cat: "learn", icon: "🔦",
    title: L("اشرح لي ما فعلتَه للتو", "Explain what you just did"),
    goal: L("أن تفهم كل تعديل وتتعلم منه بدل أن تقبله أعمى.", "Understand every change and learn from it instead of accepting blindly."),
    text: L("راجع آخر تعديل نفّذته في المشروع. اشرح لي بالعربية لشخص غير مبرمج: ما الذي تغيّر وفي أي ملف، ولماذا كان ضروريًا، وما الذي قد ينكسر بسببه، وكيف أتأكد بنفسي أنه يعمل (خطوة أنفذها وأرى نتيجتها). ثم اقترح سطرًا واحدًا يستحق الإضافة إلى CLAUDE.md حتى لا نكرر نفس المشكلة.", "Review the last change you made to the project. Explain to me, as a non-programmer: what changed and in which file, why it was necessary, what might break because of it, and how I can check it works myself (a step I perform and see the result). Then suggest one line worth adding to CLAUDE.md so we don’t repeat the same issue."),
    tip: L("السطر المضاف لـ CLAUDE.md يحوّل كل خطأ إلى قاعدة دائمة.", "A line added to CLAUDE.md turns each mistake into a permanent rule.") });

  P({ id: "u4-p-dash-page", lesson: "u4-frontend", pages: [28], cat: "build", icon: "🖥️",
    title: L("بناء صفحة لوحة تحليل", "Build a dashboard page"),
    goal: L("صفحة واحدة عربية تعمل بفتحها مباشرة، بلا إطار عمل.", "One Arabic page that runs when opened, with no framework."),
    text: L("أنشئ صفحة ويب واحدة بلغة HTML، تستخدم Tailwind للتنسيق ومكتبة رسوم تفاعلية. الصفحة تعرض: أربع بطاقات مؤشرات في الأعلى، ورسمًا خطيًا للاتجاه الزمني، ورسمًا عموديًا للمقارنة بين الفئات، وجدول تفاصيل قابلًا للفرز والبحث في الأسفل. اجعل الاتجاه من اليمين إلى اليسار وكل النصوص بالعربية. لا تستخدم أي إطار عمل، وأريد ملفًا واحدًا يعمل بفتحه مباشرة.", "Create a single HTML web page that uses Tailwind for styling and an interactive chart library. The page shows: four KPI cards at the top, a line chart for the time trend, a bar chart comparing categories, and a sortable, searchable details table at the bottom. Make it right-to-left with all text in Arabic. Don’t use any framework; I want one file that works when opened directly."),
    tip: L("إن احتجت واجهة إنجليزية، غيّر جملة الاتجاه واللغة فقط.", "For an English UI, change only the direction and language sentence.") });

  P({ id: "u4-p-filters", lesson: "u4-frontend", pages: [28], cat: "build", icon: "🎚️",
    title: L("ربط الفلاتر ببعضها", "Link the filters together"),
    goal: L("فلاتر تحدّث كل العناصر معًا من مصدر واحد، مع شرح مكان المنطق.", "Filters updating everything together from one source, with the logic’s location explained."),
    text: L("أضف إلى أعلى الصفحة ثلاثة فلاتر: بالفترة الزمنية، وبالفئة، وبالمنطقة. عند تغيير أي فلتر، يجب أن تتحدّث جميع البطاقات والرسوم والجدول تلقائيًا ومعًا من مصدر البيانات نفسه، دون إعادة تحميل الصفحة. اشرح لي بالعربية أين وضعت منطق التصفية وكيف أعدّله لاحقًا.", "Add three filters at the top of the page: by time period, by category and by region. When any filter changes, all cards, charts and the table must update automatically and together from the same data source, without reloading the page. Explain to me where you put the filtering logic and how I can modify it later."),
    tip: L("جملة «اشرح لي أين وضعت المنطق» هي ما يجعلك قادرًا على الصيانة بعد ذلك.", "“Explain where you put the logic” is what lets you maintain it later.") });

  P({ id: "u4-p-fix-ui", lesson: "u4-frontend", pages: [28], src: "add", cat: "build", icon: "🩹",
    title: L("أصلح عنصرًا بعينه بدقة", "Fix one specific element precisely"),
    goal: L("طلب تعديل واجهة واضح باستخدام مفاهيم العنصر والمحدِّد والحدث.", "A clear UI change request using the element, selector and event concepts."),
    text: L("في الصفحة الحالية، العنصر [صف العنصر: بطاقة إجمالي المبيعات / زر التصدير / جدول التفاصيل] يظهر [صف المشكلة كما تراها، مثل: يتداخل مع الرسم على الهاتف]. المطلوب [صف الشكل أو السلوك المتوقع]. لا تغيّر أي عنصر آخر. أخبرني بالعنصر والمحدِّد (Selector) الذي عدّلته، وإن كان السلوك مرتبطًا بحدث (Event) فاذكر أيّ حدث، ثم اطلب مني اختبارًا محددًا على الحاسوب والهاتف.", "On the current page, the element [describe: total-sales card / export button / details table] shows [the problem as you see it, e.g. overlaps the chart on mobile]. What I want is [the expected look or behaviour]. Don’t change any other element. Tell me which element and selector you modified, and if the behaviour is tied to an event, which one; then ask me for a specific test on desktop and phone."),
    tip: L("صف ما تراه لا ما تظنه السبب؛ التشخيص مهمته هو {p27}.", "Describe what you see, not what you think the cause is; diagnosis is its job {p27}.") });

  P({ id: "u4-p-server", lesson: "u4-backend", pages: [29], cat: "build", icon: "⚙️",
    title: L("برومبت بناء الخادم", "The server-building prompt"),
    goal: L("خادم محلي بنقاط وصول مفلترة، بسجل تشغيل وفشل صريح.", "A local server with filtered endpoints, a run log and explicit failure."),
    text: L("أنشئ خادمًا بلغة Python باستخدام FastAPI لتطبيق تحليل يعمل محليًا. يقرأ ملفات إكسل من مجلد اسمه data، وينظّفها، ويحسب المؤشرات التالية: [اذكر المؤشرات]. وفّر نقاط وصول تعيد: ملخص المؤشرات، وبيانات الاتجاه الزمني، والمقارنة بين الفئات، وجدول التفاصيل — وكلها تقبل معاملات التصفية بالفترة والفئة والمنطقة. لا تعدّل الملفات الأصلية إطلاقًا. أضف سجل تشغيل، ومعالجة واضحة للأخطاء، وتوقفًا صريحًا عند بنية ملف غير متوقعة. اشرح لي بالعربية كيف أشغّله خطوة بخطوة.", "Create a Python server using FastAPI for an analysis app that runs locally. It reads Excel files from a folder named data, cleans them, and computes the following indicators: [list the indicators]. Provide endpoints that return: the KPI summary, the time-trend data, the category comparison and the details table — all accepting filter parameters for period, category and region. Never modify the original files. Add a run log, clear error handling, and an explicit stop on an unexpected file structure. Explain to me step by step how to run it."),
    tip: L("بعد التشغيل افتح صفحة التوثيق التلقائية وجرّب كل نقطة وصول قبل أي واجهة.", "After running it, open the auto-generated docs page and try each endpoint before any UI.") });

  P({ id: "u4-p-a1", lesson: "u4-build", pages: [31], cat: "build", icon: "1️⃣",
    title: L("التطبيق ١/٥: التأسيس والتخطيط", "App 1/5: foundation and planning"),
    goal: L("خطة معتمدة (مجلدات، تقنيات، مراحل) قبل أي كود.", "An approved plan (folders, tech, stages) before any code."),
    text: L("أريد بناء تطبيق ويب يعمل محليًا على جهازي لتحليل بيانات [صف بياناتك] وعرضها في لوحة تفاعلية. المستخدم هو [صف المستخدم]، والقرار المطلوب من اللوحة هو [صف القرار]. قبل كتابة أي كود، اسألني عن أي معلومة ناقصة، ثم اعرض عليّ: بنية المجلدات المقترحة، والتقنيات التي ستستخدمها ولماذا اخترت كل واحدة، وترتيب مراحل التنفيذ. لا تنفّذ شيئًا حتى أوافق.", "I want to build a web app that runs locally on my computer to analyse [describe your data] and show it in an interactive dashboard. The user is [describe the user], and the decision the dashboard must support is [describe the decision]. Before writing any code, ask me about any missing information, then show me: the proposed folder structure, the technologies you’ll use and why you chose each, and the order of implementation stages. Don’t execute anything until I approve."),
    tip: L("لا تنتقل للبرومبت التالي قبل أن يعمل السابق فعلًا {p31}.", "Don’t move to the next prompt until the previous one actually works {p31}.") });

  P({ id: "u4-p-a2", lesson: "u4-build", pages: [31], cat: "analyze", icon: "2️⃣",
    title: L("التطبيق ٢/٥: قراءة البيانات وفحص جودتها", "App 2/5: read the data and check its quality"),
    goal: L("تقرير جودة كامل قبل حساب أي مؤشر.", "A full quality report before computing any KPI."),
    text: L("ابدأ بالخطوة الأولى فقط: اقرأ ملف إكسل الموجود في مجلد data واعرض عليّ تقريرًا عن جودته — عدد الصفوف، وأسماء الأعمدة وأنواعها، والقيم الناقصة في كل عمود، والصفوف المكررة، والقيم الشاذة، والفترة الزمنية المغطاة. لا تحسب أي مؤشر بعد، ولا تعدّل الملف الأصلي. أريد أن أرى ما في البيانات فعلًا قبل أن نبني عليها.", "Start with the first step only: read the Excel file in the data folder and show me a report on its quality — number of rows, column names and types, missing values per column, duplicate rows, outliers, and the time period covered. Don’t compute any indicator yet, and don’t modify the original file. I want to see what’s really in the data before we build on it."),
    tip: L("قارن عدد الصفوف بما تراه في إكسل؛ أول اختلاف هو أول درس.", "Compare the row count with what you see in Excel; the first mismatch is the first lesson.") });

  P({ id: "u4-p-a3", lesson: "u4-build", pages: [31], cat: "build", icon: "3️⃣",
    title: L("التطبيق ٣/٥: بناء الخادم ونقاط الوصول", "App 3/5: build the server and endpoints"),
    goal: L("أرقام صحيحة من الخادم، برسائل عربية واضحة عند الخطأ.", "Correct numbers from the server, with clear messages on errors."),
    text: L("ابنِ الآن الخادم بـ FastAPI. احسب المؤشرات التالية: [اذكرها بدقة مع قاعدة حساب كل مؤشر]. وفّر نقاط وصول تعيد: الملخص، والاتجاه الزمني، والمقارنة بين الفئات، وجدول التفاصيل — وكلها تقبل التصفية بالفترة والفئة. أضف سجل تشغيل يوضح ما قُرئ وما استُبعد ولماذا. عند عمود مفقود أو بنية غير متوقعة، توقف برسالة عربية واضحة بدل إخراج رقم خاطئ. ثم اشرح لي كيف أشغّله وأتأكد من صحة كل نقطة وصول قبل بناء الواجهة.", "Now build the server with FastAPI. Compute the following indicators: [list them precisely with each one’s calculation rule]. Provide endpoints returning: the summary, the time trend, the category comparison and the details table — all filterable by period and category. Add a run log showing what was read, what was excluded and why. On a missing column or unexpected structure, stop with a clear message instead of outputting a wrong number. Then explain how I run it and check each endpoint before building the UI."),
    tip: L("«قاعدة حساب كل مؤشر» تمنع النموذج من اختيار تعريف لا تقصده.", "“Each indicator’s calculation rule” stops the model picking a definition you didn’t mean.") });

  P({ id: "u4-p-a4", lesson: "u4-build", pages: [31], cat: "build", icon: "4️⃣",
    title: L("التطبيق ٤/٥: بناء الواجهة وربطها", "App 4/5: build and connect the front end"),
    goal: L("واجهة تعرض فقط من نقاط الوصول، وفلاتر تحدّث كل شيء.", "A front end that only displays from the endpoints, with filters updating everything."),
    text: L("ابنِ الآن الواجهة في مجلد frontend كصفحة واحدة بالعربية واتجاه من اليمين لليسار، تستخدم Tailwind ومكتبة رسوم تفاعلية. اعرض: بطاقات المؤشرات في الأعلى، ثم الاتجاه الزمني، ثم المقارنة بين الفئات، ثم جدول التفاصيل القابل للفرز والبحث. اسحب كل البيانات من نقاط الوصول التي بنيناها ولا تحسب أي شيء في الواجهة. أضف الفلاتر في الأعلى بحيث يحدّث أي تغيير كل العناصر معًا. اجعلها تعمل على الحاسوب والهاتف.", "Now build the front end in the frontend folder as a single Arabic right-to-left page using Tailwind and an interactive chart library. Show: KPI cards at the top, then the time trend, then the category comparison, then the sortable, searchable details table. Pull all data from the endpoints we built and compute nothing in the front end. Add the filters at the top so any change updates every element together. Make it work on desktop and phone."),
    tip: L("اختبر حالة حدّية: فترة بلا بيانات {p30}.", "Test an edge case: a period with no data {p30}.") });

  P({ id: "u4-p-a5", lesson: "u4-build", pages: [31], cat: "automate", icon: "5️⃣",
    title: L("التطبيق ٥/٥: التغليف والتشغيل بنقرة", "App 5/5: package and one-click launch"),
    goal: L("تطبيق يعمل كبرنامج مثبت، مع زر تصدير وملف تعليمات لزميل.", "An app that behaves like installed software, with an export button and a guide for a colleague."),
    text: L("أريد الآن أن يعمل التطبيق كأنه برنامج مثبّت. أنشئ ملف تشغيل واحدًا يبدأ الخادم ويفتح المتصفح تلقائيًا على اللوحة. وأضف زر تصدير في الواجهة يحفظ اللوحة الحالية كتقرير في مجلد output. ثم اكتب لي ملف تعليمات قصيرًا بالعربية يشرح لزميل لم يرَ المشروع: كيف يشغّله، وأين يضع ملفاته، وماذا يفعل إن ظهر خطأ.", "Now I want the app to work like installed software. Create a single launcher file that starts the server and automatically opens the browser on the dashboard. Add an export button in the UI that saves the current dashboard as a report in the output folder. Then write me a short instructions file explaining to a colleague who hasn’t seen the project: how to run it, where to put their files, and what to do if an error appears."),
    tip: L("الاختبار الحقيقي: هل يشغّله زميل من ملف التعليمات وحده دون سؤالك؟ {p31}", "The real test: can a colleague run it from the instructions alone without asking you? {p31}") });
})();
