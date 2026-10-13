/* Unit 4 — Guide 4, pages 26–31: from the editor to a complete web app on your machine. */
(function () {
  const L = (ar, en) => ({ ar, en });

  ACAD.L({
    id: "u4-vscode", unit: "u4", pages: [26], icon: "🧑‍💻", diff: 1, mins: 9, tags: ["web"],
    title: L("بيئة العمل: محرر VS Code", "The workspace: the VS Code editor"),
    hook: L("قبل أي كود تحتاج مكانًا واحدًا ترى فيه ملفاتك وتكتب وتشغّل الأوامر — وهو بيت المساعد البرمجي.", "Before any code you need one place to see files, write and run commands — and it’s home to the coding assistant."),
    book: L(`**الدليل الرابع: من المحرر إلى تطبيق ويب متكامل على جهازك** {p26} — وحدة تقنية من ست صفحات: بيئة العمل، والمساعد البرمجي، وتقنيات الواجهة، وتقنيات الخادم، ثم بناء تطبيق تحليل وعرض متكامل يعمل على الحاسوب الشخصي كأنه برنامج مثبّت. (المستوى متوسط · لا تتطلب خبرة برمجية سابقة · المخرج: تطبيق يعمل محليًا.)

**أولًا — VS Code: المحطة الأولى.** قبل أي كود، تحتاج مكانًا واحدًا ترى فيه ملفاتك، وتكتب فيه، وتشغّل منه الأوامر.
- **ما هو؟** محرر نصوص وأكواد مجاني من مايكروسوفت، يعمل على ويندوز وماك ولينكس، خفيف وسريع، وأصبح المعيار العملي لمعظم المطورين.
- **لماذا هو؟** لأنه يجمع في نافذة واحدة: متصفح الملفات، ومحرر الكود، والطرفية (Terminal)، ومعاينة النتيجة.
- **الأهم للمبتدئ**: أنه **بيت المساعد البرمجي Claude Code**، يعمل داخله مباشرة، فتكتب التعديلات في ملفاتك وأنت تراها تحدث أمامك.

**الواجهة في خمس مناطق:** ١ شريط الأنشطة (الملفات، البحث، الإضافات، التحكم في الإصدارات) · ٢ مستكشف الملفات (شجرة مجلد المشروع) · ٣ منطقة المحرر (تبويبات متعددة كالمتصفح) · ٤ الطرفية (تشغّل التطبيق وتثبّت المكتبات وتستدعي المساعد) · ٥ لوحة الأوامر (مربع بحث يصل لأي أمر بالاسم).

**أول خمس خطوات:** ١ التثبيت من الموقع الرسمي · ٢ أنشئ مجلد المشروع وافتحه من المحرر — هذا المجلد هو «مشروعك» · ٣ ثبّت الإضافات الأساسية: حزمة العربية للواجهة، وPython، وClaude Code · ٤ افتح الطرفية وتأكد أن المسار هو مجلد مشروعك (أكثر نقطة يخطئ فيها المبتدئون) · ٥ فعّل الحفظ التلقائي.

**ثلاثة أخطاء شائعة:** فتح ملف بدل مجلد (فلا يرى المساعد بقية المشروع) · مسارات فيها مسافات وعربية (سمِّ المجلدات بالإنجليزية بلا مسافات) · تثبيت عشرات الإضافات (ابدأ بثلاث فقط).`,
      `**Guide 4: from the editor to a complete web app on your machine** {p26} — a six-page technical unit: the workspace, the coding assistant, front-end and back-end technologies, then building a complete analysis app that runs on your PC like an installed program. (Level: intermediate · no prior coding needed · output: an app that runs locally.)

**First — VS Code: station one.** Before any code you need one place to see your files, write, and run commands.
- **What is it?** A free text and code editor from Microsoft, running on Windows, Mac and Linux; light, fast, and the practical standard for most developers.
- **Why it?** Because it brings together in one window: the file explorer, the code editor, the terminal, and a preview of the result.
- **Most important for beginners**: it is **home to the Claude Code coding assistant**, which works right inside it, so edits land in your files while you watch.

**The interface in five areas:** 1 the activity bar (files, search, extensions, version control) · 2 the file explorer (the project folder tree) · 3 the editor area (multiple tabs, like a browser) · 4 the terminal (run the app, install libraries, call the assistant) · 5 the command palette (a search box reaching any command by name).

**First five steps:** 1 install from the official site · 2 create a project folder and open it in the editor — this folder is “your project” · 3 install the core extensions: the Arabic language pack, Python, and Claude Code · 4 open the terminal and make sure its path is your project folder (the commonest beginner slip) · 5 turn on auto-save.

**Three common mistakes:** opening a file instead of a folder (the assistant can’t see the rest of the project) · paths with spaces and Arabic (name folders in English without spaces) · installing dozens of extensions (start with three).`),
    levels: {
      simple: L(`VS Code هو **مكتبك الرقمي**: على اليمين أدراج الملفات (المستكشف)، وفي النص الورقة التي تكتب فيها (المحرر)، وتحت «الهاتف» الذي تعطي منه الأوامر (الطرفية).

والجديد هنا أن على هذا المكتب **مساعدًا ذكيًا** (Claude Code) يقرأ كل أدراجك ويكتب في أوراقك وأنت تراه. لكن لكي يرى كل الأدراج، يجب أن **تفتح المجلد كله، لا ورقة واحدة**.`,
        `VS Code is your **digital desk**: on one side the file drawers (explorer), in the middle the page you write on (editor), and below the “phone” you give orders through (terminal).

What’s new is a **smart assistant** (Claude Code) on this desk who reads all your drawers and writes on your pages while you watch. But to see every drawer, you must **open the whole folder, not one page**.`),
      mech: L(`## لماذا «المجلد» مهم إلى هذا الحد؟
المساعد البرمجي يعمل على **المشروع كله**: يقرأ الملفات المرتبطة، ويفهم البنية، ويعدّل في أكثر من ملف. عندما تفتح ملفًا مفردًا، يصبح «المشروع» ملفًا واحدًا؛ فيقترح تعديلات تكسر ملفات لا يراها.

## الطرفية والمسار
الطرفية تنفذ الأوامر **في المجلد الذي يظهر مساره**. إن كان المسار مجلدًا آخر، فأمر مثل «شغّل التطبيق» سيبحث عن ملفات غير موجودة. لذلك الكتاب يقول: «هذه أكثر نقطة يخطئ فيها المبتدئون» {p26}.

## لماذا مسارات إنجليزية بلا مسافات؟
بعض الأدوات «تتعثر» عند تحليل المسار: المسافة قد تُفهم كفاصل بين أمرين، والحروف العربية قد لا تُقرأ في كل الأنظمة. اسم مثل \`sales-dashboard\` آمن دائمًا.`,
        `## Why does “the folder” matter so much?
The coding assistant works on **the whole project**: it reads related files, understands the structure and edits several files. Open a single file and the “project” becomes one file, so it suggests edits that break files it can’t see.

## The terminal and the path
The terminal runs commands **in the folder its path shows**. If that’s another folder, a command like “run the app” looks for files that aren’t there. Hence the book: “this is where beginners slip most” {p26}.

## Why English paths without spaces?
Some tools “stumble” parsing paths: a space may be read as a separator between two commands, and Arabic letters may not be read on every system. A name like \`sales-dashboard\` is always safe.`),
      practice: L(`## إعداد أول مشروع (خطوة بخطوة)
1. أنشئ مجلد \`C:\\projects\\sales-dashboard\`.
2. من VS Code: File ← Open Folder ← اختر المجلد.
3. من لوح الإضافات: ثبّت Arabic Language Pack وPython وClaude Code — ثلاث فقط.
4. Terminal ← New Terminal، وتأكد أن السطر يبدأ بـ\`C:\\projects\\sales-dashboard>\`.
5. File ← Auto Save.

**اختبار سريع:** أنشئ ملف \`hello.txt\` من المستكشف واكتب فيه سطرًا. إن ظهر في المجلد على القرص، فأنت جاهز.`,
        `## Setting up your first project (step by step)
1. Create the folder \`C:\\projects\\sales-dashboard\`.
2. In VS Code: File → Open Folder → pick the folder.
3. From the extensions panel: install the Arabic Language Pack, Python, and Claude Code — only three.
4. Terminal → New Terminal, and check the prompt starts with \`C:\\projects\\sales-dashboard>\`.
5. File → Auto Save.

**Quick test:** create \`hello.txt\` from the explorer and type a line. If it appears in the folder on disk, you’re ready.`),
      adv: L(`## لماذا «ثلاث إضافات فقط»؟
كل إضافة تبطئ المحرر وتضيف قائمة وإشعارات. والأهم للمبتدئ: إضافات متعارضة قد تعيد تنسيق ملفاتك أو تغيّر سلوك الحفظ دون أن تفهم السبب. أضف إضافة **عند الحاجة الفعلية**، لا قبلها {p26}.

## الحفظ التلقائي: لماذا هو مهم مع المساعد؟
عندما تعدل ملفًا ولا تحفظه، فالمساعد والطرفية يريان **النسخة القديمة على القرص**. «يوفّر عليك ساعات من الحيرة أمام تعديل كتبته ولم يظهر أثره» {p26}.

## المحرر ليس شرطًا
الكتاب يذكر أن هناك تطبيق سطح مكتب رسميًا لـClaude Code بواجهة رسومية كاملة، وهو الأنسب لمن لا يريد الطرفية أصلًا {p27}. المحرر هو البيئة الأكثر شيوعًا، لا الوحيدة.`,
        `## Why “only three extensions”?
Each extension slows the editor and adds menus and notifications. More importantly for beginners: conflicting extensions may reformat your files or change saving behaviour without you understanding why. Add one **when you actually need it**, not before {p26}.

## Auto-save: why it matters with the assistant
When you edit a file without saving, the assistant and terminal see **the old version on disk**. It “saves you hours of confusion over an edit you made that had no effect” {p26}.

## The editor isn’t mandatory
The book notes there’s an official desktop app for Claude Code with a full graphical interface, best for those who don’t want the terminal at all {p27}. The editor is the most common environment, not the only one.`),
    },
    card: {
      what: L("محرر مجاني يجمع الملفات والمحرر والطرفية والمعاينة، وهو بيت المساعد البرمجي {p26}.", "A free editor combining files, editor, terminal and preview — home to the coding assistant {p26}."),
      why: L("لأن المساعد يحتاج رؤية المشروع كله في مكان واحد.", "Because the assistant needs to see the whole project in one place."),
      how: L("خمس مناطق: الأنشطة، المستكشف، المحرر، الطرفية، لوحة الأوامر.", "Five areas: activity bar, explorer, editor, terminal, command palette."),
      inside: L("الطرفية تنفذ في المسار الظاهر؛ والمساعد يعمل على المجلد المفتوح.", "The terminal runs in the shown path; the assistant works on the open folder."),
      relation: L("المحطة الأولى قبل المساعد البرمجي والتطبيق المحلي.", "Station one before the coding assistant and local app."),
      example: L("مجلد sales-dashboard مفتوح، والطرفية على نفس المسار.", "The sales-dashboard folder open, the terminal on the same path."),
      apply: L("نفّذ الخطوات الخمس الآن على مجلد تجريبي.", "Do the five steps now on a test folder."),
      mistakes: L("فتح ملف بدل مجلد، ومسارات عربية بمسافات، وعشرات الإضافات.", "Opening a file not a folder, Arabic paths with spaces, dozens of extensions."),
      check: L("هل تعرف كيف تتأكد أن الطرفية في مجلد مشروعك؟", "Do you know how to confirm the terminal is in your project folder?"),
      next: L("المساعد البرمجي Claude Code.", "The Claude Code assistant."),
    },
    keys: L(["VS Code يجمع الملفات والمحرر والطرفية والمعاينة في نافذة واحدة {p26}.", "الأهم: أنه بيت المساعد البرمجي Claude Code.", "افتح المجلد لا الملف، وتأكد من مسار الطرفية.", "مجلدات بأسماء إنجليزية بلا مسافات.", "ثلاث إضافات فقط، وفعّل الحفظ التلقائي."],
      ["VS Code combines files, editor, terminal and preview in one window {p26}.", "Most important: it’s home to the Claude Code assistant.", "Open the folder, not a file; check the terminal’s path.", "English folder names without spaces.", "Only three extensions; turn on auto-save."]),
    scene: "vscode-areas", prompts: ["u4-p-tour"],
    quick: [
      { q: L("فتحت ملفًا واحدًا بدل مجلد المشروع. ما المشكلة؟", "You opened one file instead of the project folder. What’s the problem?"), opts: L(["لا مشكلة", "المساعد البرمجي لن يرى بقية مشروعك", "المحرر سيغلق", "ستُحذف الملفات"], ["No problem", "The coding assistant won’t see the rest of your project", "The editor will close", "Files get deleted"]), a: 1, why: L("«افتح المجلد دائمًا لا الملف المفرد، وإلا لن يرى المساعد البرمجي بقية مشروعك» {p26}.", "“Always open the folder, not a single file; otherwise the coding assistant won’t see the rest of your project” {p26}.") },
      { q: L("ما «أكثر نقطة يخطئ فيها المبتدئون» حسب الكتاب؟", "What is “where beginners slip most” according to the book?"), opts: L(["اختيار لون المحرر", "مسار الطرفية ليس مجلد المشروع", "عدد التبويبات", "اللغة العربية"], ["Picking the editor colour", "The terminal path isn’t the project folder", "Number of tabs", "The Arabic language"]), a: 1, why: L("الخطوة ٤: «تأكد أن المسار الظاهر فيها هو مجلد مشروعك… هذه أكثر نقطة يخطئ فيها المبتدئون» {p26}.", "Step 4: “make sure its path is your project folder… this is where beginners slip most” {p26}.") },
    ],
    related: ["u4-claudecode", "u4-localapp"], req: [], terms: ["vscode", "terminal", "extension"],
  });

  ACAD.L({
    id: "u4-claudecode", unit: "u4", pages: [27], icon: "🛠️", diff: 2, mins: 12, tags: ["web", "automation"],
    title: L("المساعد البرمجي Claude Code: أنت تراجع وتوافق", "The Claude Code assistant: you review and approve"),
    hook: L("في المحادثة العادية أنت الوسيط في كل خطوة. هنا يقرأ ويكتب ويشغّل ويصلح، وأنت تراجع.", "In ordinary chat you’re the go-between at every step. Here it reads, writes, runs and fixes — you review."),
    book: L(`**ثانيًا — المساعد البرمجي Claude Code** {p27}: أداة برمجية من Anthropic تعمل في الطرفية أو داخل المحرر، تقرأ مشروعك كله، وتكتب الملفات، وتشغّل الأوامر، وتصلح أخطاءها بنفسها — بالعربية أو بالإنجليزية.

**ما الفرق بينه وبين المحادثة العادية؟ الفرق في موقعك أنت من العملية.** في المحادثة العادية تعطيك كودًا نصيًا، وأنت تنسخه وتلصقه في الملف الصحيح، وتشغّله، وتعود إليها بالخطأ إن وقع — **أنت الوسيط في كل خطوة**. أما Claude Code فيقرأ مشروعك، وينشئ الملفات ويعدلها مباشرة، ويشغّل الأمر، ويرى الخطأ بنفسه، ويصلحه، ثم يعيد التشغيل. **أنت تراجع وتوافق فقط.**

**متطلبات التشغيل** (كما وردت في الكتاب): ويندوز ١٠ (إصدار 1809) فأحدث، أو macOS 13 فأحدث، أو توزيعات لينكس الشائعة · ذاكرة ٤ جيجابايت فأكثر، ومعالج x64 أو ARM64، واتصال دائم بالإنترنت · يتطلب اشتراك Pro أو Max أو Team أو Enterprise أو حساب Console؛ والخطة المجانية لا تشمله. **أمر التثبيت**: ويندوز (PowerShell): \`irm https://claude.ai/install.ps1 | iex\` · ماك أو لينكس: \`curl -fsSL https://claude.ai/install.sh | bash\`. **لا تريد الطرفية أصلًا؟** هناك تطبيق سطح مكتب رسمي بواجهة رسومية كاملة — الخيار الأنسب لمن يبدأ من الصفر.

**أول جلسة: ست خطوات:** ١ تحقق من التثبيت (\`claude --version\`) · ٢ إن لم يعمل، \`claude doctor\` يفحص ويقترح الحل · ٣ ابدأ من مجلد المشروع: اكتب \`claude\` وسجّل الدخول من المتصفح · ٤ عرّفه بمشروعك: \`/init\` يفحص المشروع وينشئ ملف CLAUDE.md · ٥ **ابدأ بطلب قراءة لا تعديل**: اطلب أن يشرح المشروع أولًا · ٦ **راجع كل تعديل**: يعرض ما سيغيره قبل التنفيذ؛ اقرأ قبل الموافقة خاصة في أول أسبوع.

**ملف CLAUDE.md — أهم ملف في مشروعك**: ملف نصي في جذر المشروع يُقرأ تلقائيًا في بداية كل جلسة: التقنيات، وقواعد الكتابة، وأوامر التشغيل، وما يُمنع لمسه. كتابته مرة توفر إعادة شرح المشروع في كل محادثة.

**ثلاثة ضوابط أمان من أول يوم:** شغّله في مجلد مشروع خاص، لا في مجلد فيه ملفاتك الشخصية أو بيانات عمل حساسة · لا تفعّل الموافقة التلقائية على كل الأوامر في بداية تعلمك ولو كان أبطأ · لا تكتب كلمات المرور داخل الملفات إطلاقًا — تُقرأ من ملف إعدادات منفصل لا يُشارك.`,
      `**Second — the Claude Code assistant** {p27}: a coding tool from Anthropic that works in the terminal or inside the editor, reads your whole project, writes files, runs commands and fixes its own errors — in Arabic or English.

**How does it differ from ordinary chat? The difference is your position in the process.** In ordinary chat it gives you code as text; you copy and paste it into the right file, run it, and come back with the error if one occurs — **you are the go-between at every step**. Claude Code reads your project, creates and edits files directly, runs the command, sees the error itself, fixes it and reruns. **You only review and approve.**

**Requirements** (as stated in the book): Windows 10 (version 1809) or later, macOS 13 or later, or common Linux distributions · 4 GB of memory or more, an x64 or ARM64 processor, and a constant internet connection · a Pro, Max, Team or Enterprise subscription or a Console account; the free plan doesn’t include it. **Install command**: Windows (PowerShell): \`irm https://claude.ai/install.ps1 | iex\` · Mac or Linux: \`curl -fsSL https://claude.ai/install.sh | bash\`. **Don’t want the terminal at all?** There’s an official desktop app with a full graphical interface — the best option for those starting from zero.

**A first session in six steps:** 1 check the install (\`claude --version\`) · 2 if it doesn’t work, \`claude doctor\` checks and suggests a fix · 3 start from the project folder: type \`claude\` and sign in through the browser · 4 introduce your project: \`/init\` scans it and creates a CLAUDE.md file · 5 **start with a read request, not an edit**: ask it to explain the project first · 6 **review every change**: it shows what it will change before executing; read before approving, especially in the first week.

**CLAUDE.md — the most important file in your project**: a plain-text file at the project root, read automatically at the start of every session: technologies, writing rules, run commands, and what must not be touched. Writing it once saves re-explaining the project in every conversation.

**Three safety controls from day one:** run it in a dedicated project folder, not one holding personal files or sensitive work data · don’t enable auto-approval of all commands while learning, even if it’s slower · never write passwords inside files — read them from a separate settings file that isn’t shared.`),
    levels: {
      simple: L(`الفرق يشبه الفرق بين أن **يُملي عليك سبّاك** الإصلاح بالهاتف (تمسك المفتاح، تفك، تقول له «لسه بتنقط»، يقول لك جرّب كذا…) وبين أن **يأتي السبّاك بنفسه** فيفحص ويفك ويركّب ويجرب، وأنت تقف تراقب وتقول «موافق» قبل أن يكسر الحائط.

Claude Code هو السبّاك الذي يأتي بنفسه. ودورك: **تقرأ قبل أن توافق**، وتعطيه مجلدًا خاصًا للعمل فيه، لا بيتك كله.`,
        `It’s like the difference between **a plumber dictating a repair by phone** (you hold the wrench, loosen, say “still dripping”, they say try this…) and **the plumber coming in person** to inspect, loosen, fit and test while you watch and say “OK” before they break the wall.

Claude Code is the plumber who comes in person. Your role: **read before approving**, and give it a dedicated folder to work in, not your whole house.`),
      mech: L(`## الحلقة التي تختفي منها أنت كوسيط
**المحادثة العادية:** طلب ← كود نصي ← **أنت تنسخ** ← **أنت تلصق** ← **أنت تشغل** ← **أنت تنقل الخطأ** ← …
**Claude Code:** طلب ← يقرأ المشروع ← يقترح خطة ← **أنت توافق** ← يكتب ← يشغل ← يرى الخطأ ← يصلح ← يعيد التشغيل.
هذه نفس حلقة [[l:u5-agents|الوكيل]]: هدف + أدوات + تكرار {p39}. شاهدها في [[scene:claude-loop|مشهد الحلقة]].

## لماذا CLAUDE.md «أهم ملف»؟
لأنه **سياق دائم** (راجع [[l:u0-assistant|السياق]]): يُقرأ تلقائيًا كل جلسة، فلا تعيد شرح «نستخدم Python، ولا تلمس مجلد data، وأمر التشغيل كذا». والكتاب يطلب أن تكون كل تعليمة فيه «قابلة للتحقق، لا نصيحة عامة» {p27}.

## لماذا «قراءة قبل تعديل»؟
لأن أول طلب قراءة يكشف لك: هل فهم المشروع صح؟ إن أخطأ في الفهم، فأي تعديل بعدها مبني على فهم خاطئ.`,
        `## The loop that removes you as go-between
**Ordinary chat:** request → code as text → **you copy** → **you paste** → **you run** → **you relay the error** → …
**Claude Code:** request → reads the project → proposes a plan → **you approve** → writes → runs → sees the error → fixes → reruns.
This is the [[l:u5-agents|agent]] loop: goal + tools + iteration {p39}. Watch it in [[scene:claude-loop|the loop scene]].

## Why is CLAUDE.md “the most important file”?
Because it’s **permanent context** (see [[l:u0-assistant|context]]): read automatically each session, so you don’t re-explain “we use Python, don’t touch the data folder, the run command is X”. The book wants every instruction in it to be “verifiable, not general advice” {p27}.

## Why “read before edit”?
Because the first read request shows you whether it understood the project. If its understanding is wrong, every edit after builds on it.`),
      practice: L(`## مثال ملف CLAUDE.md قصير لمشروع لوحة مبيعات
\`\`\`
# مشروع لوحة المبيعات
- التقنيات: Python 3.12 + FastAPI للخادم، HTML + Tailwind للواجهة.
- التشغيل: start.bat (يبدأ الخادم ويفتح المتصفح).
- الاختبار: python -m pytest
- ممنوع: تعديل أي ملف داخل data/ (الملفات الأصلية).
- كل رسائل الخطأ للمستخدم بالعربية.
- كلمات المرور في config.local (غير مرفوع).
\`\`\`

## البرومبت اليومي: «الخطة قبل التنفيذ»
استخدمه مع كل طلب تعديل: يعرض الملفات التي سيغيرها والمخاطر، وينتظر موافقتك؛ وإن كان يصلح خطأ: يشخص **السبب لا العَرَض**، ويشرحه بالعربية، ثم يشغّل التطبيق ليتأكد أن الإصلاح نجح فعلًا {p27}.`,
        `## A short CLAUDE.md example for a sales-dashboard project
\`\`\`
# Sales dashboard project
- Stack: Python 3.12 + FastAPI server, HTML + Tailwind front end.
- Run: start.bat (starts the server and opens the browser).
- Test: python -m pytest
- Forbidden: editing any file in data/ (original files).
- All user-facing error messages in Arabic.
- Passwords in config.local (not committed).
\`\`\`

## The daily prompt: “plan before executing”
Use it with every change request: it shows which files it will change and the risks, and waits for your approval; when fixing a bug, it diagnoses **the cause, not the symptom**, explains it in Arabic, then runs the app to confirm the fix really worked {p27}.`),
      adv: L(`## الضوابط الثلاثة: لماذا كل واحد؟
- **مجلد مشروع خاص**: لأن الأداة تقرأ وتكتب في المجلد. مجلد فيه ملفاتك الشخصية يعني أن خطأً واحدًا قد يلمس ما لا يجب.
- **لا موافقة تلقائية في البداية**: الموافقة اليدوية بطيئة، لكنها **تعلّمك** ماذا تفعل الأداة. بعد أن تفهم أنماطها، تقرر أين تمنح ثقة أكبر.
- **لا كلمات مرور في الملفات**: لأن المساعد يقرأ الملفات، ولأن المشروع قد يُرفع على [[l:u5-git|GitHub]] حيث يجب استثناء الأسرار بملف .gitignore {p33}.

## ملاحظة على المتطلبات والأسعار
المتطلبات والاشتراكات المذكورة هي ما ورد في الكتاب وقت كتابته؛ مثل كل منتجات الذكاء الاصطناعي، تحقق من الموقع الرسمي قبل التثبيت.

## حدود المساعد
هو يكتب ويشغّل، لكن **صحة الأرقام** مسؤوليتك: لذلك المرحلة السابعة في التطبيق «طابق الأرقام يدويًا… غير قابلة للتخطي» {p30}.`,
        `## The three controls: why each?
- **A dedicated project folder**: because the tool reads and writes in the folder. A folder with personal files means one error could touch what it shouldn’t.
- **No auto-approval at first**: manual approval is slow but it **teaches** you what the tool does. Once you know its patterns, you decide where to grant more trust.
- **No passwords in files**: because the assistant reads files, and because the project may be pushed to [[l:u5-git|GitHub]], where secrets must be excluded with a .gitignore file {p33}.

## A note on requirements and prices
The requirements and subscriptions listed are what the book stated at the time of writing; like all AI products, check the official site before installing.

## The assistant’s limits
It writes and runs, but **the correctness of the numbers** is your responsibility: hence the app’s stage seven, “match the numbers by hand… not skippable” {p30}.`),
    },
    card: {
      what: L("أداة برمجية تقرأ المشروع وتكتب وتشغّل وتصلح، وأنت تراجع وتوافق {p27}.", "A coding tool that reads the project, writes, runs and fixes, while you review and approve {p27}."),
      why: L("لتخرج من دور الوسيط الذي ينسخ ويلصق وينقل الأخطاء.", "To stop being the go-between who copies, pastes and relays errors."),
      how: L("تثبيت ← تحقق ← init ← قراءة أولًا ← خطة قبل التنفيذ ← مراجعة كل تعديل.", "Install → check → init → read first → plan before executing → review every change."),
      inside: L("حلقة وكيل: يقرأ، يخطط، ينفذ، يرى الخطأ، يصلح، يعيد التشغيل.", "An agent loop: read, plan, act, see the error, fix, rerun."),
      relation: L("أول وكيل حقيقي تستخدمه؛ ويمهد للفريق الرقمي في الدليل الخامس.", "The first real agent you use; it prepares Guide 5’s digital team."),
      example: L("CLAUDE.md يمنع لمس مجلد data ويذكر أمر التشغيل.", "CLAUDE.md forbids touching data/ and states the run command."),
      apply: L("اكتب CLAUDE.md لمشروع تجريبي ببرومبت الكتاب.", "Write a CLAUDE.md for a test project with the book’s prompt."),
      mistakes: L("موافقة تلقائية مبكرة، ومجلد فيه بيانات شخصية، وكلمات مرور في الملفات.", "Early auto-approval, a folder with personal data, passwords in files."),
      check: L("هل تشرح الفرق في «موقعك من العملية» بين المحادثة وClaude Code؟", "Can you explain the difference in “your position in the process” between chat and Claude Code?"),
      next: L("الواجهة الأمامية: ما يراه المستخدم.", "The front end: what the user sees."),
    },
    keys: L(["في المحادثة أنت الوسيط؛ مع Claude Code أنت تراجع وتوافق فقط {p27}.", "ابدأ بطلب قراءة لا تعديل، وراجع كل تعديل قبل الموافقة.", "CLAUDE.md: سياق دائم بتعليمات قابلة للتحقق.", "البرومبت اليومي: الخطة قبل التنفيذ، وإصلاح السبب لا العَرَض.", "مجلد خاص، ولا موافقة تلقائية في البداية، ولا كلمات مرور في الملفات."],
      ["In chat you’re the go-between; with Claude Code you only review and approve {p27}.", "Start with a read request, not an edit; review every change before approving.", "CLAUDE.md: permanent context with verifiable instructions.", "The daily prompt: plan before executing; fix the cause, not the symptom.", "A dedicated folder, no early auto-approval, no passwords in files."]),
    scene: "claude-loop", prompts: ["u4-p-claudemd", "u4-p-plan-first", "u4-p-explain-project"],
    quick: [
      { q: L("ما أول ما يُنصح بطلبه في أول جلسة؟", "What should you ask for first in a first session?"), opts: L(["تعديل كل الملفات", "أن يشرح المشروع أولًا قبل أي تعديل", "حذف الملفات القديمة", "تفعيل الموافقة التلقائية"], ["Edit all files", "Explain the project first before any edit", "Delete old files", "Turn on auto-approval"]), a: 1, why: L("الخطوة ٥: «ابدأ بطلب قراءة لا تعديل» {p27}.", "Step 5: “start with a read request, not an edit” {p27}.") },
      { q: L("ما وظيفة ملف CLAUDE.md؟", "What is the CLAUDE.md file for?"), opts: L(["تخزين كلمات المرور", "تعليمات دائمة تُقرأ تلقائيًا في بداية كل جلسة: التقنيات والقواعد والأوامر والممنوعات", "حفظ نسخة احتياطية", "تسريع الجهاز"], ["Storing passwords", "Permanent instructions read at every session start: stack, rules, commands, no-go areas", "Keeping a backup", "Speeding up the PC"]), a: 1, why: L("«ملف نصي بسيط في جذر المشروع، يُقرأ تلقائيًا في بداية كل جلسة» {p27}.", "“A simple text file at the project root, read automatically at the start of each session” {p27}.") },
    ],
    related: ["u4-vscode", "u5-agents", "u0-assistant"], req: ["u4-vscode"], terms: ["claude-code", "claude-md", "terminal"],
  });

  ACAD.L({
    id: "u4-frontend", unit: "u4", pages: [28], icon: "🎨", diff: 2, mins: 11, tags: ["web", "dashboard"],
    title: L("الواجهة الأمامية: ما يراه المستخدم", "The front end: what the user sees"),
    hook: L("الهيكل، والشكل، والسلوك — ولا تبدأ بإطار عمل.", "Structure, look and behaviour — and don’t start with a framework."),
    book: L(`**ثالثًا — الواجهة الأمامية (Front-end): ما يراه المستخدم** {p28}. كل ما يظهر على الشاشة ويتفاعل معه المستخدم: الأزرار، والجداول، والرسوم، والفلاتر. يعمل داخل المتصفح، **ولا يلمس البيانات مباشرة**.

**الأعمدة الثلاثة التي يقوم عليها كل شيء:**
- **HTML — الهيكل**: يحدد ماذا يوجد في الصفحة: عنوان، وجدول، وزر، وحقل إدخال. مثل **الهيكل الخرساني للمبنى**: يحدد الغرف دون أن يزيّنها.
- **CSS — الشكل**: كيف تبدو العناصر: الألوان، والمسافات، والخطوط، والترتيب على الشاشات المختلفة. هو **التشطيب والديكور**.
- **JavaScript — السلوك**: ماذا يحدث عند التفاعل: ضغطة زر تحدّث الرسم، وتغيير فلتر يعيد حساب الأرقام. هو **الكهرباء والحركة في المبنى**.

**الطبقة الثانية: أدوات تختصر الوقت** — Tailwind CSS (أسماء جاهزة داخل العنصر فتتشكل الواجهة فورًا) · مكتبات الرسوم (Chart.js للبساطة، وECharts للوحات الغنية، وPlotly للتحليل العلمي) · مكتبات الجداول (فرز وتصفية وبحث وتصدير لإكسل بأسطر قليلة) · أطر العمل (React وغيره: تنظم الواجهات المعقدة في مكونات؛ مفيدة للتطبيقات الكبيرة ولا حاجة لها في البداية).

**قرار مهم للمبتدئ**: **لا تبدأ بإطار عمل.** صفحة HTML واحدة مع Tailwind ومكتبة رسوم تكفي لبناء لوحة تحليل احترافية بالكامل. الإطار يُضاف حين يصبح المشروع كبيرًا فعلًا — وإضافته مبكرًا تضاعف التعقيد بلا فائدة.

**ما يجب أن تعرفه لا أن تتقنه:**
| المفهوم | ما تحتاج معرفته | لماذا يهمك عمليًا |
|---|---|---|
| العنصر والوسم | الصفحة مبنية من عناصر متداخلة لكل منها اسم | لتفهم ما يصفه لك المساعد |
| المُحدِّد (Selector) | التنسيق يُطبق على عنصر محدد بالاسم أو الفئة | لتطلب تغيير لون عنصر بعينه بدقة |
| الحدث (Event) | الضغط أو التغيير يستدعي دالة تنفذ شيئًا | لتصف التفاعل الذي تريده بوضوح |
| الاستجابة (Responsive) | الصفحة تتكيف مع حجم الشاشة | لتعمل لوحتك على الحاسوب والهاتف |
| الاستدعاء (API Call) | الواجهة تطلب البيانات من الخادم ولا تملكها | لتفهم أين المشكلة عند غياب الأرقام |

**برومبتان**: بناء صفحة لوحة تحليل، وربط الفلاتر ببعضها (بالأسفل).`,
      `**Third — the front end: what the user sees** {p28}. Everything on screen the user interacts with: buttons, tables, charts, filters. It runs in the browser **and doesn’t touch the data directly**.

**The three pillars everything rests on:**
- **HTML — structure**: defines what’s on the page: a title, a table, a button, an input field. Like **a building’s concrete frame**: it defines the rooms without decorating them.
- **CSS — look**: how elements appear: colours, spacing, fonts, layout on different screens. It’s **the finishing and decor**.
- **JavaScript — behaviour**: what happens on interaction: a click updates the chart; changing a filter recomputes the numbers. It’s **the building’s electricity and movement**.

**Layer two: time-saving tools** — Tailwind CSS (ready names inside the element so the interface takes shape instantly) · chart libraries (Chart.js for simplicity, ECharts for rich dashboards, Plotly for scientific analysis) · table libraries (sorting, filtering, search and Excel export in a few lines) · frameworks (React and others: organise complex interfaces into components; useful for large apps, not needed at first).

**An important beginner decision**: **don’t start with a framework.** One HTML page with Tailwind and a chart library is enough to build a fully professional analysis dashboard. A framework is added when the project really grows — adding it early doubles complexity for nothing.

**What to know, not master:**
| Concept | What you need to know | Why it matters in practice |
|---|---|---|
| Element & tag | the page is built of nested, named elements | to understand what the assistant describes |
| Selector | styling applies to a specific element by name or class | to ask precisely for one element’s colour to change |
| Event | a click or change calls a function that does something | to describe the interaction you want clearly |
| Responsive | the page adapts to screen size | so your dashboard works on PC and phone |
| API call | the interface requests data from the server; it doesn’t own it | to understand where the problem is when numbers are missing |

**Two prompts**: building an analysis-dashboard page, and linking the filters together (below).`),
    levels: {
      simple: L(`صفحة الويب **مبنى**:
- **HTML** هو الخرسانة: هنا غرفة (جدول)، وهنا باب (زر).
- **CSS** هو التشطيب: الألوان، والإضاءة، وترتيب الأثاث.
- **JavaScript** هو الكهرباء: تضغط المفتاح فتضيء اللمبة (تضغط الفلتر فيتغير الرسم).

ولا تحتاج أن تكون مهندسًا معماريًا؛ تحتاج أن تعرف هذه الكلمات لتشرح للمساعد البرمجي ما تريد: «غيّر **شكل** البطاقة» = CSS، «لما أضغط الزر يحصل كذا» = JavaScript.`,
        `A web page is **a building**:
- **HTML** is the concrete: a room here (a table), a door there (a button).
- **CSS** is the finishing: colours, lighting, furniture layout.
- **JavaScript** is the electricity: flip the switch and the lamp lights (click the filter and the chart changes).

You don’t need to be an architect; you need these words to tell the coding assistant what you want: “change the card’s **look**” = CSS, “when I click the button, X happens” = JavaScript.`),
      mech: L(`## «لا يلمس البيانات مباشرة»
الواجهة في المتصفح **تعرض** ولا **تملك**. البيانات تأتي من الخادم عبر [[t:api|استدعاء]]. لذلك عند غياب الأرقام، المشكلة قد تكون في: الاستدعاء (لم يصل)، أو الخادم (لم يحسب)، أو الواجهة (لم ترسم). معرفة هذا التقسيم توفر ساعات من البحث العشوائي.

## الفلاتر المتزامنة من الداخل
عند تغيير فلتر: **حدث** (Event) ← دالة تقرأ قيمة الفلاتر ← تطلب البيانات المفلترة **من مصدر واحد** ← تعيد رسم البطاقات والرسوم والجدول **معًا**. الكلمة المهمة في برومبت الكتاب: «من مصدر البيانات نفسه، دون إعادة تحميل الصفحة» {p28}. جرّب ذلك في [[lab:dashboard|مختبر اللوحة]] — وهو مبني بهذه الطريقة بالضبط.

## لماذا لا إطار عمل في البداية؟
الإطار يضيف: أدوات بناء، ومفاهيم جديدة (مكونات، حالة)، وملفات أكثر. صفحة واحدة يفهمها المساعد وتفهمها أنت أفضل من مشروع منظم لا تستطيع قراءته. (هذه الأكاديمية نفسها مبنية بلا إطار عمل، كملف واحد.)`,
        `## “Doesn’t touch the data directly”
The browser interface **displays**, it doesn’t **own**. Data comes from the server via an [[t:api|API call]]. So when numbers are missing, the problem could be in the call (didn’t arrive), the server (didn’t compute) or the interface (didn’t draw). Knowing this split saves hours of random searching.

## Synced filters from the inside
On a filter change: an **event** → a function reads the filter values → requests filtered data **from one source** → redraws cards, charts and table **together**. The key phrase in the book’s prompt: “from the same data source, without reloading the page” {p28}. Try it in [[lab:dashboard|the dashboard lab]] — built exactly this way.

## Why no framework at first?
A framework adds build tools, new concepts (components, state) and more files. A single page that both you and the assistant can read beats an organised project you can’t. (This academy itself is built without a framework, as one file.)`),
      practice: L(`## اطلب تعديلات الواجهة بدقة
| بدل أن تقول | قل |
|---|---|
| «الشكل مش حلو» | «كبّر خط الأرقام في البطاقات (CSS)، واجعل المسافة بين البطاقات أكبر» |
| «الزرار مش شغال» | «عند الضغط على زر التصدير (Event) لا يحدث شيء؛ افحص الدالة المرتبطة به» |
| «الأرقام مش ظاهرة» | «البطاقات فارغة؛ تحقق هل الاستدعاء للخادم (API Call) يعيد بيانات، وما الرد بالضبط» |
| «مش مظبوطة على الموبايل» | «الجدول يخرج عن الشاشة على الهاتف؛ اجعله Responsive بتمرير أفقي» |

## اتجاه اليمين لليسار
برومبت الكتاب يطلب صراحة «اجعل الاتجاه من اليمين إلى اليسار وكل النصوص بالعربية» — لا تفترض أن الأداة ستعرف ذلك وحدها {p28}.`,
        `## Request interface changes precisely
| Instead of | Say |
|---|---|
| “it doesn’t look nice” | “enlarge the number font on the cards (CSS) and widen the gap between cards” |
| “the button doesn’t work” | “clicking export (event) does nothing; check the function bound to it” |
| “numbers don’t show” | “cards are empty; check whether the server call (API call) returns data, and what exactly it returns” |
| “not right on mobile” | “the table overflows on phones; make it responsive with horizontal scroll” |

## Right-to-left
The book’s prompt explicitly asks: “make the direction right-to-left and all text Arabic” — don’t assume the tool will know {p28}.`),
      adv: L(`## الواجهة لا تحسب
في التطبيق المتكامل، الكتاب يشدد: «الواجهة تعرض فقط، ولا تحسب شيئًا بنفسها» {p30}. لماذا؟ لأن الحساب في الواجهة يعني أن **قواعد العمل** موزعة بين أماكن؛ فإذا تغيرت قاعدة (مثل تعريف الهامش)، قد تُعدَّل في الخادم وتُنسى في الواجهة، فتتضارب الأرقام. هذا نفس مبدأ «مصدر حقيقة واحد» {p37}.

## اختيار مكتبة الرسوم
Chart.js للبساطة، وECharts للوحات الغنية بالتفاعل، وPlotly للتحليل العلمي وحفظ الصفحة مستقلة {p21, p28}. القاعدة: اختر الأبسط الذي يحقق رسوم «المحطات السبع» — لا أكثر.`,
        `## The interface doesn’t calculate
In the complete app, the book insists: “the interface only displays and calculates nothing itself” {p30}. Why? Because calculating in the interface spreads **business rules** across places; if a rule changes (like the margin definition), it may be updated in the server and forgotten in the interface, and numbers conflict. Same principle as “a single source of truth” {p37}.

## Choosing a chart library
Chart.js for simplicity, ECharts for richly interactive dashboards, Plotly for scientific analysis and standalone pages {p21, p28}. The rule: pick the simplest that delivers “the seven stations” charts — no more.`),
    },
    card: {
      what: L("HTML للهيكل، وCSS للشكل، وJavaScript للسلوك، مع أدوات تختصر الوقت {p28}.", "HTML for structure, CSS for look, JavaScript for behaviour, plus time-saving tools {p28}."),
      why: L("لتصف للمساعد ما تريده بدقة وتفهم أين المشكلة.", "To describe precisely what you want and know where problems lie."),
      how: L("صفحة HTML واحدة + Tailwind + مكتبة رسوم، والبيانات من الخادم.", "One HTML page + Tailwind + a chart library, with data from the server."),
      inside: L("حدث ← دالة ← طلب بيانات من مصدر واحد ← إعادة رسم كل العناصر معًا.", "Event → function → data request from one source → redraw everything together."),
      relation: L("الوجه المرئي للوحات الدليل الثالث والصفحة التنفيذية.", "The visible face of Guide 3’s dashboards and the executive page."),
      example: L("«عند الضغط على التصدير لا يحدث شيء» = مشكلة حدث ودالة.", "“Clicking export does nothing” = an event/function issue."),
      apply: L("استخدم برومبت بناء الصفحة على بيانات تجريبية.", "Use the page-building prompt on sample data."),
      mistakes: L("البدء بإطار عمل، والحساب داخل الواجهة.", "Starting with a framework; calculating inside the interface."),
      check: L("هل تحدد إن كان طلب ما يخص HTML أم CSS أم JavaScript؟", "Can you tell whether a request concerns HTML, CSS or JavaScript?"),
      next: L("الواجهة الخلفية: ما لا يراه المستخدم.", "The back end: what the user doesn’t see."),
    },
    keys: L(["HTML الهيكل، CSS الشكل، JavaScript السلوك {p28}.", "الواجهة تعمل في المتصفح ولا تلمس البيانات مباشرة.", "لا تبدأ بإطار عمل: صفحة + Tailwind + مكتبة رسوم تكفي.", "اعرف المفاهيم الخمسة: العنصر، المحدد، الحدث، الاستجابة، الاستدعاء.", "الفلاتر تحدّث كل العناصر من مصدر واحد دون إعادة تحميل."],
      ["HTML structure, CSS look, JavaScript behaviour {p28}.", "The interface runs in the browser and doesn’t touch data directly.", "Don’t start with a framework: a page + Tailwind + a chart library is enough.", "Know five concepts: element, selector, event, responsive, API call.", "Filters update every element from one source without reloading."]),
    scene: "building", lab: "dashboard", prompts: ["u4-p-dash-page", "u4-p-filters", "u4-p-fix-ui"],
    quick: [
      { q: L("في تشبيه المبنى، ما الذي يمثله JavaScript؟", "In the building analogy, what does JavaScript represent?"), opts: L(["الهيكل الخرساني", "التشطيب والديكور", "الكهرباء والحركة", "الأرض"], ["The concrete frame", "Finishing and decor", "Electricity and movement", "The ground"]), a: 2, why: L("HTML الهيكل، وCSS التشطيب، وJavaScript «الكهرباء والحركة في المبنى» {p28}.", "HTML the frame, CSS the finishing, JavaScript “the building’s electricity and movement” {p28}.") },
      { q: L("ما «القرار المهم للمبتدئ» في الواجهة؟", "What is “the important beginner decision” for the front end?"), opts: L(["ابدأ بـReact", "لا تبدأ بإطار عمل؛ صفحة واحدة مع Tailwind ومكتبة رسوم تكفي", "لا تستخدم CSS", "اكتب كل شيء بـJavaScript فقط"], ["Start with React", "Don’t start with a framework; one page with Tailwind and a chart library is enough", "Don’t use CSS", "Write everything in JavaScript only"]), a: 1, why: L("«لا تبدأ بإطار عمل… الإطار يُضاف حين يصبح المشروع كبيرًا فعلًا» {p28}.", "“Don’t start with a framework… it’s added when the project really grows” {p28}.") },
    ],
    related: ["u4-backend", "u3-stages", "u2-level3"], req: ["u4-claudecode"], terms: ["html", "css", "javascript", "tailwind", "framework", "responsive", "selector", "event", "api"],
  });

  ACAD.L({
    id: "u4-backend", unit: "u4", pages: [29], icon: "⚙️", diff: 2, mins: 12, tags: ["web", "python"],
    title: L("الواجهة الخلفية: العقل الذي لا يراه المستخدم", "The back end: the brain the user doesn’t see"),
    hook: L("يقرأ الملفات، ويحسب، ويطبّق قواعد العمل، ويسلّم النتيجة جاهزة — ومنطقه مكتوب في مكان واحد.", "It reads files, computes, applies business rules and hands over a ready result — with its logic in one place."),
    book: L(`**رابعًا — الواجهة الخلفية (Back-end): ما لا يراه المستخدم** {p29}. العقل الذي يقرأ الملفات، ويحسب، ويطبّق قواعد العمل، ويسلّم النتيجة جاهزة للواجهة. لا يظهر على الشاشة إطلاقًا، لكنه مصدر كل رقم عليها.

**لماذا نحتاج خادمًا أصلًا؟** لأن **المتصفح محدود**: لا يستطيع قراءة ملفات جهازك بحرية، ولا الاتصال بقواعد البيانات، ولا معالجة ملايين الصفوف بكفاءة. ولأن **المنطق يجب أن يكون في مكان واحد**: قواعد الحساب والتصنيف تُكتب مرة واحدة في الخادم، فلا تتضارب بين شاشة وأخرى.

**الطقم الموصى به لتطبيق تحليل محلي:** Python (اللغة: الأقرب للمحلل غير المبرمج، ومكتباتها في التحليل الأغنى) · FastAPI (إطار الخادم: يحوّل دوال بايثون إلى نقاط وصول تستدعيها الواجهة، ويولّد صفحة توثيق تفاعلية تلقائيًا) · pandas (المعالجة: قراءة إكسل والنصوص، والتنظيف والدمج والتجميع) · DuckDB (الاستعلام بـSQL مباشرة على الملفات) · SQLite (التخزين: قاعدة بيانات كاملة في ملف واحد بلا خادم ولا تثبيت).

**ولماذا ليس قاعدة بيانات كبيرة؟** لأن التطبيق يعمل على جهاز شخصي لمستخدم واحد؛ قاعدة مؤسسية تتطلب خادمًا وتثبيتًا وصيانة وصلاحيات — بلا فائدة هنا. SQLite ملف واحد ينتقل مع مشروعك، وDuckDB لا يحتاج حتى استيراد البيانات.

**رحلة طلب واحد:** ١ المستخدم يغيّر فلترًا ← ٢ الواجهة ترسل طلبًا ← ٣ الخادم يستقبله ← ٤ يقرأ البيانات ويحسب ← ٥ يعيد النتيجة منظمة ← ٦ الواجهة ترسم النتيجة.

**المصطلحات الثلاثة:** **API** باب محدد في الخادم له عنوان تطلب منه شيئًا · **JSON** صيغة نصية منظمة تنتقل بها البيانات بين الطرفين · **Endpoint** عنوان الباب الواحد، مثل «أعطني ملخص المبيعات».

**مبادئ تصميم لا تتنازل عنها:** لا تُمس البيانات الأصلية (يقرأ فقط ويكتب نتائجه في مجلد منفصل) · فصل القراءة عن الحساب عن العرض (ثلاث وحدات مستقلة) · الفشل الصريح لا الصامت · سجل تشغيل مكتوب. **وبرومبت بناء الخادم** بالأسفل.`,
      `**Fourth — the back end: what the user doesn’t see** {p29}. The brain that reads files, computes, applies business rules and hands the interface a ready result. It never appears on screen, yet it’s the source of every number on it.

**Why do we need a server at all?** Because **the browser is limited**: it can’t freely read your machine’s files, connect to databases, or process millions of rows efficiently. And because **logic must live in one place**: calculation and classification rules are written once in the server, so they don’t conflict between screens.

**The recommended stack for a local analysis app:** Python (the language: closest to a non-programmer analyst, with the richest analysis libraries) · FastAPI (the server framework: turns Python functions into endpoints the interface calls, and generates an interactive documentation page automatically) · pandas (processing: reading Excel and text, cleaning, merging, aggregating) · DuckDB (querying files directly with SQL) · SQLite (storage: a full database in a single file with no server or installation).

**Why not a big database?** Because the app runs on a personal machine for one user; an enterprise database needs a server, installation, maintenance and permissions — useless here. SQLite is one file that travels with your project, and DuckDB doesn’t even need importing.

**The journey of one request:** 1 the user changes a filter → 2 the interface sends a request → 3 the server receives it → 4 reads the data and computes → 5 returns an organised result → 6 the interface draws it.

**The three terms:** **API** a specific door in the server with an address you ask something from · **JSON** an organised text format carrying data between the two sides · **Endpoint** the address of one door, like “give me the sales summary”.

**Design principles you don’t compromise on:** never touch the original data (read only, write results to a separate folder) · separate reading from calculation from display (three independent units) · explicit, not silent, failure · a written run log. **And the server-building prompt** is below.`),
    levels: {
      simple: L(`المطعم فيه **صالة** و**مطبخ**. الصالة (الواجهة الأمامية) جميلة وفيها القائمة والطاولات. المطبخ (الواجهة الخلفية) لا يراه الزبون، لكن **كل طبق يخرج منه**.

الزبون يطلب من الجرسون (الـAPI) طبقًا محددًا (Endpoint: «طبق المبيعات الشهرية من فضلك»)، والمطبخ يحضّره ويرسله على صينية منظمة (JSON)، والجرسون يضعه على الطاولة (الواجهة ترسم).

ولماذا لا يطبخ الزبون على الطاولة؟ لأن الطاولة لا فيها فرن ولا مخزن (المتصفح محدود)، ولأن **الوصفة يجب أن تكون واحدة** في المطبخ، لا وصفة مختلفة على كل طاولة.`,
        `A restaurant has a **dining room** and a **kitchen**. The dining room (front end) is pretty, with the menu and tables. The kitchen (back end) is hidden from the customer, yet **every dish comes from it**.

The customer asks the waiter (the API) for a specific dish (endpoint: “the monthly sales dish, please”); the kitchen prepares it and sends it on an organised tray (JSON); the waiter puts it on the table (the interface draws).

Why doesn’t the customer cook at the table? Because the table has no oven or pantry (the browser is limited), and because **the recipe must be one**, in the kitchen — not a different recipe on every table.`),
      mech: L(`## رحلة الطلب خطوة خطوة
شاهدها في [[scene:request-journey|مشهد رحلة الطلب]]: فلتر ← طلب ← خادم ← قراءة وحساب ← JSON ← رسم. لاحظ أن **الحساب يحدث مرة واحدة في الخادم**، والواجهة لا تعرف كيف حُسب الرقم، فقط تعرضه.

## لماذا FastAPI مناسب للمبتدئ؟
لأنه يولّد **صفحة توثيق تفاعلية تلقائيًا**: تفتحها في المتصفح وتجرب كل نقطة وصول بنفسك وترى الأرقام قبل أي واجهة. لذلك المرحلة الرابعة في التطبيق: «تأكد أن الأرقام صحيحة من صفحة التوثيق التلقائية قبل رسم أي شيء» {p30}.

## الوحدات الثلاث
**القراءة** (من الملفات) ← **الحساب** (قواعد العمل) ← **العرض** (نقاط الوصول). نفس فكرة «الوحدات الصغيرة المستقلة» {p18}: لو تغيّر شكل الملف، تُعدَّل وحدة القراءة فقط.`,
        `## The request’s journey step by step
Watch it in [[scene:request-journey|the request-journey scene]]: filter → request → server → read & compute → JSON → draw. Note **the calculation happens once, in the server**; the interface doesn’t know how the number was computed — it just shows it.

## Why is FastAPI good for beginners?
Because it generates **an interactive documentation page automatically**: open it in the browser, try each endpoint yourself and see the numbers before any interface. Hence app stage four: “confirm the numbers are right from the automatic documentation page before drawing anything” {p30}.

## The three units
**Reading** (from files) → **calculation** (business rules) → **serving** (endpoints). The “small independent units” idea {p18}: if the file’s shape changes, only the reading unit is edited.`),
      practice: L(`## نقاط وصول نموذجية لتطبيق مبيعات
| Endpoint | ماذا يعيد | فلاتر |
|---|---|---|
| \`/summary\` | المؤشرات الرئيسية (المبيعات، الهامش، الوحدات) | الفترة، الفئة، المنطقة |
| \`/trend\` | المبيعات حسب الشهر | نفسها |
| \`/compare\` | المقارنة بين الفئات | نفسها |
| \`/details\` | جدول التفاصيل | نفسها + ترتيب |

**مثال رد JSON من \`/summary\`:**
\`{"sales": 1840000, "margin": 0.31, "units": 9420, "period": "2026-09"}\`

لاحظ: الواجهة لن تحسب الهامش؛ ستعرض \`0.31\` كـ«٣١٪».`,
        `## Typical endpoints for a sales app
| Endpoint | Returns | Filters |
|---|---|---|
| \`/summary\` | key KPIs (sales, margin, units) | period, category, region |
| \`/trend\` | sales by month | same |
| \`/compare\` | comparison between categories | same |
| \`/details\` | the details table | same + sorting |

**Sample JSON reply from \`/summary\`:**
\`{"sales": 1840000, "margin": 0.31, "units": 9420, "period": "2026-09"}\`

Note: the interface won’t compute the margin; it displays \`0.31\` as “31%”.`),
      adv: L(`## لماذا «بلا قاعدة بيانات كبيرة» قرار ذكي؟
كل مكون إضافي = شيء يتعطل ويحتاج صيانة وصلاحيات. للمستخدم الواحد على جهاز واحد، SQLite وDuckDB يقدمان قوة كاملة بلا تكلفة تشغيل. عندما يصبح عدد المستخدمين كبيرًا وتظهر طلبات الصلاحيات، تعود إلى [[l:u2-platform|إشارات المنصة]].

## الخصوصية بالتصميم
الخادم **محلي** (localhost) — «يعمل على جهازك أنت فقط، ولا يراه أحد سواك» {p31}. لا رفع، ولا سحابة، ولا طرف ثالث: شرط أساسي لبيانات العمل الحساسة {p30}.

## الفشل الصريح في الخادم
«عند عمود مفقود أو ملف تالف، يتوقف برسالة واضحة بدل إخراج أرقام خاطئة» {p29}. وفي البرومبت: «توقف برسالة عربية واضحة» {p31} — لأن مستخدم التطبيق لن يقرأ سجلات تقنية.`,
        `## Why is “no big database” a smart call?
Each extra component is something that breaks and needs maintenance and permissions. For one user on one machine, SQLite and DuckDB give full power with no running cost. When users grow and permission requests appear, return to [[l:u2-platform|the platform signals]].

## Privacy by design
The server is **local** (localhost) — “it runs on your machine only, and nobody else sees it” {p31}. No uploads, no cloud, no third party: a basic condition for sensitive work data {p30}.

## Explicit failure in the server
“On a missing column or damaged file, it stops with a clear message instead of outputting wrong numbers” {p29}. And in the prompt: “stop with a clear Arabic message” {p31} — because the app’s user won’t read technical logs.`),
    },
    card: {
      what: L("الخادم: يقرأ ويحسب ويطبّق القواعد ويسلّم النتيجة للواجهة عبر نقاط وصول {p29}.", "The server: reads, computes, applies rules and hands results to the interface via endpoints {p29}."),
      why: L("لأن المتصفح محدود، ولأن المنطق يجب أن يُكتب في مكان واحد.", "Because the browser is limited and logic must live in one place."),
      how: L("Python + FastAPI + pandas/DuckDB + SQLite؛ وطلب ← حساب ← JSON ← رسم.", "Python + FastAPI + pandas/DuckDB + SQLite; request → compute → JSON → draw."),
      inside: L("ثلاث وحدات مستقلة: قراءة، حساب، عرض.", "Three independent units: read, compute, serve."),
      relation: L("المطبخ الذي يغذي الواجهة الأمامية؛ وتطبيق لمبادئ الدليل الثاني الهندسية.", "The kitchen feeding the front end; applying Guide 2’s engineering principles."),
      example: L("‎/summary يعيد المبيعات والهامش، والواجهة تعرض فقط.", "/summary returns sales and margin; the interface only displays."),
      apply: L("اطلب خادمًا بالبرومبت، ثم جرّب نقاطه من صفحة التوثيق قبل أي واجهة.", "Request a server with the prompt, then try its endpoints from the docs page before any UI."),
      mistakes: L("حساب في الواجهة، وقاعدة بيانات كبيرة بلا حاجة، وأرقام خاطئة بصمت.", "Calculating in the UI, a needless big database, silently wrong numbers."),
      check: L("هل تشرح API وJSON وEndpoint بتشبيه المطعم؟", "Can you explain API, JSON and endpoint with the restaurant analogy?"),
      next: L("بناء التطبيق المتكامل على جهازك.", "Building the complete app on your machine."),
    },
    keys: L(["الخادم مصدر كل رقم على الشاشة رغم أنه لا يظهر {p29}.", "نحتاجه لأن المتصفح محدود، ولأن المنطق يجب أن يكون في مكان واحد.", "الطقم: Python، FastAPI، pandas، DuckDB، SQLite.", "API باب، JSON صيغة النقل، Endpoint عنوان الباب.", "لا تمس الأصل، وافصل القراءة عن الحساب عن العرض، وافشل بصراحة، وسجّل."],
      ["The server is the source of every number on screen though unseen {p29}.", "We need it because the browser is limited and logic must be in one place.", "The stack: Python, FastAPI, pandas, DuckDB, SQLite.", "API is a door, JSON the transport format, endpoint the door’s address.", "Don’t touch originals; separate read/compute/serve; fail explicitly; log."]),
    scene: "request-journey", prompts: ["u4-p-server"],
    quick: [
      { type: "order", q: L("رتّب رحلة طلب واحد:", "Order the journey of one request:"), items: L(["المستخدم يغيّر فلترًا", "الواجهة ترسل طلبًا", "الخادم يقرأ البيانات ويحسب", "يعيد النتيجة منظمة", "الواجهة ترسم النتيجة"], ["The user changes a filter", "The interface sends a request", "The server reads the data and computes", "It returns an organised result", "The interface draws the result"]), why: L("الرحلة في الكتاب {p29}: الحساب في الخادم، والرسم في الواجهة.", "The journey in the book {p29}: computing in the server, drawing in the interface.") },
      { q: L("لماذا SQLite وليس قاعدة بيانات مؤسسية للتطبيق المحلي؟", "Why SQLite rather than an enterprise database for the local app?"), opts: L(["لأنها أقوى", "لأن التطبيق لمستخدم واحد على جهاز شخصي، وSQLite ملف واحد بلا خادم ولا تثبيت", "لأنها مدفوعة", "لأنها سحابية"], ["It’s more powerful", "The app is for one user on a personal machine; SQLite is one file with no server or install", "It’s paid", "It’s in the cloud"]), a: 1, why: L("قاعدة مؤسسية تتطلب خادمًا وتثبيتًا وصيانة وصلاحيات «بلا فائدة هنا» {p29}.", "An enterprise database needs a server, installation, maintenance and permissions — “useless here” {p29}.") },
    ],
    related: ["u4-frontend", "u4-localapp", "u2-compass"], req: ["u4-frontend"], terms: ["server", "fastapi", "pandas", "sqlite", "duckdb", "api", "json", "endpoint", "localhost"],
  });

  ACAD.L({
    id: "u4-localapp", unit: "u4", pages: [30], icon: "🏠", diff: 2, mins: 11, tags: ["web"],
    title: L("بناء تطبيق ويب متكامل على جهازك: الخطة والبنية", "Building a complete web app on your machine: plan and structure"),
    hook: L("برنامج تحليل وعرض يُفتح بنقرة، بلا إنترنت، ودون رفع أي بيانات — والترتيب ليس اقتراحًا.", "An analysis app opened in one click, offline, uploading nothing — and the order isn’t a suggestion."),
    book: L(`**خامسًا — بناء تطبيق ويب متكامل على جهازك (المشروع التطبيقي · الجزء الأول)** {p30}. **الهدف**: برنامج تحليل وعرض يفتحه المتدرب بنقرة واحدة على حاسوبه، يقرأ ملفاته، ويعرض لوحة تفاعلية — دون إنترنت ودون رفع أي بيانات إلى أي جهة.

**لماذا تطبيق ويب محلي تحديدًا؟** **الخصوصية الكاملة**: البيانات لا تغادر الجهاز إطلاقًا، لا رفع ولا سحابة ولا طرف ثالث — شرط أساسي لبيانات العمل الحساسة · **واجهة المتصفح بلا قيوده**: جمال الويب ومرونته، مع قدرة كاملة على قراءة ملفات الجهاز ومعالجتها · **قابلية التوسع لاحقًا**: يمكن نقله إلى خادم داخلي للشركة دون إعادة بناء لأن بنيته صحيحة من البداية.

**بنية المشروع: خمسة مجلدات فقط**
| المجلد أو الملف | ماذا بداخله | من يتعامل معه |
|---|---|---|
| /data | ملفات إكسل الأصلية كما هي، دون أي تعديل | أنت تضع الملفات هنا |
| /backend | كود بايثون: القراءة، والتنظيف، والحساب، ونقاط الوصول | المساعد البرمجي يكتبه |
| /frontend | صفحة الواجهة: البطاقات، والرسوم، والفلاتر، والجدول | المساعد البرمجي يكتبه |
| /output | التقارير المصدّرة والملفات الناتجة عن التشغيل | يُنشأ تلقائيًا |
| CLAUDE.md | تعريف المشروع وقواعده وأوامر تشغيله | تكتبه مرة وتحدّثه |

**المسار الكامل: ثماني مراحل بالترتيب:** ١ حدد السؤال قبل الأداة (أي قرار تخدمه؟ من سيفتحها وكم مرة؟) · ٢ جهّز بيانة واحدة حقيقية (ملف واحد فعلي وصغير؛ **الوهمية تخفي المشكلات الحقيقية**) · ٣ أنشئ المشروع وعرّفه (مجلد فارغ، افتحه، شغّل Claude Code ونفّذ /init) · ٤ ابنِ الخادم أولًا (قبل أي واجهة، وتأكد من الأرقام من صفحة التوثيق) · ٥ ثم ابنِ الواجهة (تعرض فقط ولا تحسب) · ٦ اربط الفلاتر (فلتر واحد يحدّث كل العناصر؛ اختبره على حالة حدّية: فترة بلا بيانات) · ٧ طابق الأرقام يدويًا (كل مؤشر بحسابك في إكسل مرة واحدة — **غير قابلة للتخطي**) · ٨ اجعله يفتح بنقرة (ملف تشغيل يبدأ الخادم ويفتح المتصفح).

**الترتيب ليس اقتراحًا**: بناء الواجهة قبل التأكد من صحة الأرقام هو **الخطأ الأكثر تكرارًا**. ستقضي ساعات في تجميل لوحة تعرض أرقامًا خاطئة، ثم تكتشف أن المشكلة في قراءة الملف من الأساس فتعيد كل شيء.`,
      `**Fifth — building a complete web app on your machine (applied project · part one)** {p30}. **Goal**: an analysis and display program the learner opens in one click on their computer, which reads their files and shows an interactive dashboard — with no internet and without uploading any data anywhere.

**Why a local web app specifically?** **Full privacy**: data never leaves the machine — no upload, no cloud, no third party; a basic condition for sensitive work data · **a browser interface without its limits**: the web’s beauty and flexibility, with full ability to read and process the machine’s files · **room to grow later**: it can move to an internal company server without rebuilding, because its structure is right from the start.

**Project structure: just five folders**
| Folder or file | Contents | Who handles it |
|---|---|---|
| /data | the original Excel files, untouched | you put files here |
| /backend | Python code: reading, cleaning, computing, endpoints | the coding assistant writes it |
| /frontend | the interface page: cards, charts, filters, table | the coding assistant writes it |
| /output | exported reports and files produced by runs | created automatically |
| CLAUDE.md | the project definition, its rules and run commands | you write it once and update it |

**The full path: eight stages in order:** 1 define the question before the tool (which decision does it serve? who opens it and how often?) · 2 prepare one real data file (one small, actual file; **fake data hides real problems**) · 3 create and introduce the project (empty folder, open it, run Claude Code and /init) · 4 build the server first (before any interface; confirm numbers from the docs page) · 5 then build the interface (it only displays, never computes) · 6 link the filters (one filter updates everything; test an edge case: a period with no data) · 7 match the numbers by hand (each KPI against your Excel calculation once — **not skippable**) · 8 make it open in one click (a launcher that starts the server and opens the browser).

**The order isn’t a suggestion**: building the interface before confirming the numbers is **the most frequent mistake**. You’ll spend hours polishing a dashboard showing wrong numbers, then discover the problem was in reading the file all along, and redo everything.`),
    levels: {
      simple: L(`تخيّل أنك تفتح **مطعمًا صغيرًا في بيتك**: المطبخ (الخادم) والصالة (الواجهة) والمخزن (data) وصندوق الطلبات الجاهزة (output)، ودفتر قواعد المطبخ (CLAUDE.md).

القاعدة الذهبية: **جرّب الطبخ وذوقه قبل تزيين الصالة**. لا تقضِ أسبوعًا في اختيار الأطباق والإضاءة ثم تكتشف أن الأكل نفسه غير صالح. وكذلك التطبيق: **الأرقام أولًا، ثم الشكل**.

وكل شيء داخل بيتك: لا أحد غريب يدخل المطبخ (لا رفع ولا سحابة).`,
        `Imagine opening **a small restaurant at home**: the kitchen (server), the dining room (interface), the pantry (data), the ready-orders box (output), and the kitchen rulebook (CLAUDE.md).

The golden rule: **cook and taste before decorating the dining room**. Don’t spend a week choosing plates and lighting only to find the food itself is bad. Same for the app: **numbers first, then looks**.

And everything stays at home: no stranger enters the kitchen (no upload, no cloud).`),
      mech: L(`## لماذا الخادم قبل الواجهة؟
الخطأ في قراءة الملف أو الحساب يظهر في **كل** ما بعده. إن بنيت الواجهة أولًا، ستصلح أخطاء الواجهة وأنت تظن أن الأرقام سليمة، ثم تكتشف أن الأرقام نفسها خاطئة. صفحة التوثيق التلقائية في FastAPI تجعلك تختبر الأرقام **مجردة** قبل أن يجمّلها أي رسم.

## لماذا «بيانة حقيقية» لا وهمية؟
البيانات الوهمية نظيفة دائمًا: لا تواريخ بصيغتين، ولا خلايا فارغة، ولا أعمدة بأسماء غريبة. فينجح التطبيق عليها ثم يفشل أول يوم على البيانات الحقيقية. «الوهمية تخفي المشكلات الحقيقية» {p30}.

## المرحلة ٧: «غير قابلة للتخطي»
لأنها الوحيدة التي تقارن التطبيق **بشيء خارجه**: حسابك اليدوي. كل المراحل الأخرى قد تمر وكل شيء «يبدو» سليمًا. نفس فلسفة «مقارنة شهر حقيقي رقمًا برقم» في [[l:u2-project|المشروع المرجعي]] {p22}.`,
        `## Why the server before the interface?
An error in reading the file or calculating shows up in **everything** after. Build the interface first and you’ll fix UI issues believing the numbers are fine, then discover the numbers themselves are wrong. FastAPI’s automatic docs page lets you test the numbers **bare**, before any chart dresses them up.

## Why “real data”, not fake?
Fake data is always clean: no two date formats, no blanks, no oddly named columns. So the app works on it, then fails on day one with real data. “Fake data hides real problems” {p30}.

## Stage 7: “not skippable”
Because it’s the only stage comparing the app with **something outside it**: your manual calculation. Every other stage can pass with everything “looking” fine. Same philosophy as “compare a real month number by number” in [[l:u2-project|the reference project]] {p22}.`),
      practice: L(`## شكل المجلد بعد المرحلة ٣
\`\`\`
sales-dashboard/
├─ data/          ← مبيعات_سبتمبر.xlsx (كما هي)
├─ backend/       ← فارغ الآن
├─ frontend/      ← فارغ الآن
├─ output/        ← يُنشأ تلقائيًا
└─ CLAUDE.md      ← أنشأه /init
\`\`\`

## اختبار الحالة الحدية في المرحلة ٦
اختر فترة لا توجد فيها مبيعات (مثلًا شهر قبل افتتاح الفرع). المتوقع: رسالة «لا توجد بيانات للفترة» وبطاقات فارغة بوضوح — **لا** أصفار مضللة ولا خطأ تقني. جرّبها في [[lab:dashboard|مختبر اللوحة]] بتضييق الفلاتر.`,
        `## The folder after stage 3
\`\`\`
sales-dashboard/
├─ data/          ← september_sales.xlsx (as is)
├─ backend/       ← empty for now
├─ frontend/      ← empty for now
├─ output/        ← created automatically
└─ CLAUDE.md      ← created by /init
\`\`\`

## The stage-6 edge-case test
Pick a period with no sales (say, a month before the branch opened). Expected: a “no data for this period” message and clearly empty cards — **not** misleading zeros or a technical error. Try it in [[lab:dashboard|the dashboard lab]] by narrowing the filters.`),
      adv: L(`## «قابلية التوسع لاحقًا»: ما الذي يجعلها ممكنة؟
الفصل بين data وbackend وfrontend. لأن الواجهة لا تحسب، ولأن الخادم يتحدث عبر نقاط وصول، يمكن نقل الخادم لخادم داخلي في الشركة وتبقى الواجهة كما هي تقريبًا. لو كان الحساب داخل الواجهة، لكان النقل إعادة بناء.

## الخصوصية: حدودها
البيانات لا تغادر جهازك **أثناء تشغيل التطبيق**. لكن أثناء البناء، المساعد البرمجي متصل بالإنترنت ويقرأ ملفات المشروع {p27}. لذلك: ملف بيانات صغير وحقيقي، لكن **بلا معلومات حساسة** في مرحلة البناء إن لم تسمح سياسة شركتك؛ أو أخفِ الأعمدة الحساسة. (وهذا ما يفتح باب [[l:u5-local|التشغيل المحلي للنماذج]].)`,
        `## “Room to grow later”: what makes it possible?
Separating data, backend and frontend. Because the interface doesn’t compute and the server talks through endpoints, the server can move to an internal company server while the interface stays roughly the same. If calculation lived in the interface, moving would mean rebuilding.

## Privacy: its limits
Data doesn’t leave your machine **while the app runs**. But during building, the coding assistant is online and reads the project files {p27}. So: a small, real data file — but **without sensitive information** during the build if your company policy doesn’t allow it; or mask sensitive columns. (This opens the door to [[l:u5-local|running models locally]].)`),
    },
    card: {
      what: L("تطبيق تحليل محلي يُفتح بنقرة، بخمسة مجلدات وثماني مراحل مرتبة {p30}.", "A local analysis app opened in one click, with five folders and eight ordered stages {p30}."),
      why: L("للخصوصية الكاملة، وجمال الويب بقدرة كاملة على ملفات الجهاز، وقابلية التوسع.", "For full privacy, web looks with full file access, and room to grow."),
      how: L("سؤال ← بيانة حقيقية ← مشروع ← خادم ← واجهة ← فلاتر ← مطابقة يدوية ← نقرة واحدة.", "Question → real data → project → server → interface → filters → manual match → one click."),
      inside: L("فصل البيانات عن الخادم عن الواجهة يجعل التطبيق قابلًا للاختبار والنقل.", "Separating data, server and interface makes the app testable and portable."),
      relation: L("يجمع المحرر والمساعد والواجهتين في مشروع واحد.", "Brings the editor, assistant and both ends into one project."),
      example: L("اختبار فترة بلا بيانات يعطي رسالة واضحة لا أصفارًا مضللة.", "Testing a no-data period yields a clear message, not misleading zeros."),
      apply: L("أنشئ المجلدات الخمسة لمشروعك وابدأ بالمرحلة ١ و٢.", "Create the five folders for your project and start stages 1 and 2."),
      mistakes: L("الواجهة قبل الأرقام، والبيانات الوهمية، وتخطي المطابقة اليدوية.", "Interface before numbers, fake data, skipping manual matching."),
      check: L("هل تشرح لماذا الخادم قبل الواجهة؟", "Can you explain why the server comes before the interface?"),
      next: L("خمسة برومبتات تبني التطبيق بالترتيب.", "Five prompts that build the app in order."),
    },
    keys: L(["الهدف: برنامج يُفتح بنقرة، بلا إنترنت، دون رفع بيانات {p30}.", "خمسة مجلدات: data، backend، frontend، output، CLAUDE.md.", "بيانة حقيقية صغيرة: الوهمية تخفي المشكلات الحقيقية.", "الخادم أولًا والواجهة تعرض فقط؛ والمطابقة اليدوية غير قابلة للتخطي.", "الواجهة قبل صحة الأرقام هو الخطأ الأكثر تكرارًا."],
      ["Goal: a one-click program, offline, uploading no data {p30}.", "Five folders: data, backend, frontend, output, CLAUDE.md.", "Small real data: fake data hides real problems.", "Server first, interface only displays; manual matching isn’t skippable.", "Interface before correct numbers is the most frequent mistake."]),
    scene: "app-stages", prompts: ["u4-p-a1"],
    quick: [
      { q: L("لماذا يطلب الكتاب ملف بيانات حقيقيًا صغيرًا بدل بيانات وهمية؟", "Why does the book want a small real data file rather than fake data?"), opts: L(["لأن الوهمية أكبر", "لأن البيانات الوهمية تخفي المشكلات الحقيقية", "لأن الحقيقية أسرع", "لا فرق"], ["Fake data is bigger", "Fake data hides the real problems", "Real data is faster", "No difference"]), a: 1, why: L("«ملف إكسل واحد فعلي وصغير، لا بيانات وهمية. الوهمية تخفي المشكلات الحقيقية» {p30}.", "“One real, small Excel file, not fake data. Fake data hides real problems” {p30}.") },
      { q: L("ما «الخطأ الأكثر تكرارًا» في بناء التطبيق؟", "What is “the most frequent mistake” in building the app?"), opts: L(["اختيار خط غير مناسب", "بناء الواجهة قبل التأكد من صحة الأرقام", "عدد المجلدات", "تشغيل الخادم أولًا"], ["Choosing the wrong font", "Building the interface before confirming the numbers", "The number of folders", "Running the server first"]), a: 1, why: L("«بناء الواجهة قبل التأكد من صحة الأرقام هو الخطأ الأكثر تكرارًا» {p30}.", "“Building the interface before confirming the numbers is the most frequent mistake” {p30}.") },
    ],
    related: ["u4-backend", "u4-build", "u2-project"], req: ["u4-backend"], terms: ["localhost", "claude-md"],
  });

  ACAD.L({
    id: "u4-build", unit: "u4", pages: [31], icon: "🚀", diff: 2, mins: 11, tags: ["web"],
    title: L("خمسة برومبتات تبني التطبيق بالترتيب", "Five prompts that build the app in order"),
    hook: L("انسخ ونفّذ بالترتيب، ولا تنتقل للتالي قبل أن يعمل السابق فعلًا.", "Copy and run in order; don’t move on until the previous one truly works."),
    book: L(`**المشروع التطبيقي — الجزء الثاني: برومبتات التنفيذ** {p31}. خمسة برومبتات متتابعة تبني التطبيق كاملًا. نفّذها بالترتيب، **ولا تنتقل إلى التالي قبل أن يعمل السابق فعلًا**:
1. **التأسيس والتخطيط**: صف بياناتك والمستخدم والقرار؛ «اسألني عن أي معلومة ناقصة»، ثم بنية المجلدات والتقنيات ولماذا وترتيب المراحل — **لا تنفذ شيئًا حتى أوافق**.
2. **قراءة البيانات والتحقق من جودتها**: الخطوة الأولى فقط: تقرير جودة الملف (الصفوف، الأعمدة وأنواعها، الناقص، المكرر، الشاذ، الفترة المغطاة) — لا مؤشرات بعد، ولا تعديل للأصل.
3. **بناء الخادم ونقاط الوصول**: FastAPI بمؤشرات وقاعدة حساب كل منها؛ نقاط: الملخص، والاتجاه، والمقارنة، والتفاصيل بالفلاتر؛ سجل تشغيل؛ وتوقف برسالة عربية واضحة عند عمود مفقود.
4. **بناء الواجهة وربطها**: صفحة واحدة بالعربية من اليمين لليسار، Tailwind ومكتبة رسوم؛ تسحب كل شيء من نقاط الوصول ولا تحسب شيئًا؛ فلاتر تحدّث كل العناصر؛ تعمل على الحاسوب والهاتف.
5. **التغليف والتشغيل بنقرة**: ملف تشغيل يبدأ الخادم ويفتح المتصفح، وزر تصدير يحفظ التقرير في output، وملف تعليمات قصير بالعربية لزميل لم يرَ المشروع.

**قائمة تحقق قبل اعتماد التطبيق:** يعمل كاملًا بنقرة دون كتابة أي أمر؟ · رسالة عربية واضحة عند ملف ناقص أو عمود مفقود؟ · طابقت كل مؤشر بحسابك اليدوي مرة على الأقل؟ · تُفهم الرسالة الأساسية خلال أول ثلاثين ثانية؟ · الملفات الأصلية في data سليمة؟ · يستطيع زميل تشغيله من ملف التعليمات وحده؟

**مسرد سريع:** الطرفية (نافذة أوامر نصية) · المكتبة (كود جاهز كتبه غيرك تستدعيه) · الخادم المحلي localhost (يعمل على جهازك أنت فقط) · نقطة الوصول Endpoint (عنوان محدد تطلب منه بيانات بعينها).

**الخلاصة**: المتدرب لا يتعلم البرمجة، بل **إدارة مشروع برمجي**: كيف يصف ما يريد بدقة، وكيف يراجع ما يُبنى له، وكيف يتحقق من صحته. والترتيب هو الدرس الأهم: **البيانات أولًا، ثم صحة الأرقام، ثم العرض، ثم التجميل** — وأي قفز يُنتج لوحة جميلة لا يثق بها أحد. **الخطوة التالية**: خذ ملف إكسل واحدًا صغيرًا تستخدمه فعلًا هذا الأسبوع، ونفّذ البرومبتات الخمسة عليه بالترتيب دون تعديل، حتى يصبح لديك تطبيق واحد يعمل — ثم وسّعه.`,
      `**Applied project — part two: the execution prompts** {p31}. Five sequential prompts build the whole app. Run them in order, **and don’t move to the next until the previous really works**:
1. **Foundation & planning**: describe your data, user and decision; “ask me about any missing information”, then the folder structure, technologies and why, and the stage order — **don’t execute anything until I approve**.
2. **Reading the data and checking its quality**: the first step only: a quality report on the file (rows, columns and types, missing, duplicates, outliers, period covered) — no KPIs yet, no editing the original.
3. **Building the server and endpoints**: FastAPI with KPIs and each one’s calculation rule; endpoints: summary, trend, comparison, details, with filters; a run log; and a clear Arabic message on a missing column.
4. **Building and connecting the interface**: one Arabic right-to-left page with Tailwind and a chart library; it pulls everything from the endpoints and computes nothing; filters update every element; works on PC and phone.
5. **Packaging and one-click launch**: a launcher that starts the server and opens the browser, an export button saving the report to output, and a short Arabic instruction file for a colleague who has never seen the project.

**Checklist before approving the app:** runs fully in one click without typing commands? · a clear Arabic message on a missing file or column? · every KPI matched against your manual calculation at least once? · the core message understood in the first thirty seconds? · the original files in data intact? · can a colleague run it from the instruction file alone?

**Quick glossary:** terminal (a window for text commands) · library (ready code written by others that you call) · local server, localhost (runs on your machine only) · endpoint (a specific address you request certain data from).

**Conclusion**: the learner doesn’t learn programming but **managing a software project**: describing precisely what they want, reviewing what’s built, and verifying it. Order is the key lesson: **data first, then correct numbers, then display, then polish** — any shortcut produces a beautiful dashboard nobody trusts. **Next step**: take one small Excel file you actually use this week and run the five prompts on it in order, unchanged, until you have one working app — then expand it.`),
    levels: {
      simple: L(`الخمسة برومبتات مثل **خمس مراحل لبناء بيت** مع مقاول ذكي:
١ نتفق على الرسم وتسأل المقاول أسئلتك (لا يبدأ قبل موافقتك) · ٢ نفحص الأرض (جودة البيانات) · ٣ نبني الأساسات والسباكة والكهرباء (الخادم) · ٤ نشطّب ونطلي (الواجهة) · ٥ نسلّم المفتاح ودليل الاستخدام (التشغيل بنقرة والتعليمات).

لا يُطلى حائط قبل اختبار الكهرباء. ولا تنتقل لمرحلة قبل أن تعمل التي قبلها **فعلًا**.`,
        `The five prompts are like **five stages of building a house** with a smart contractor:
1 agree the plan and ask your questions (nothing starts without your approval) · 2 survey the land (data quality) · 3 build foundations, plumbing and wiring (the server) · 4 finish and paint (the interface) · 5 hand over the key and the user guide (one-click launch and instructions).

No wall is painted before the wiring is tested. And you don’t move on until the previous stage **really** works.`),
      mech: L(`## ما الذي يحميه كل برومبت؟
| البرومبت | يمنع |
|---|---|
| ١ «لا تنفذ حتى أوافق» | بناء شيء لم تتفق عليه |
| ٢ «الخطوة الأولى فقط… لا تحسب مؤشرات» | تحليل بيانات معطوبة |
| ٣ «قاعدة حساب كل مؤشر» + «توقف برسالة عربية» | أرقام بتعريفات ضمنية، وأخطاء صامتة |
| ٤ «لا تحسب أي شيء في الواجهة» | منطق موزع ومتضارب |
| ٥ «ملف تعليمات لزميل لم يرَ المشروع» | أداة يعرف تشغيلها شخص واحد فقط |

لاحظ أن كل سطر هو درس سابق: [[l:u1-ask|«اسألني عن الناقص»]]، و[[l:u2-analysis|الجودة أولًا]]، و[[l:u2-compass|الفشل الصريح]]، و«مصدر حقيقة واحد»، و[[l:u2-level1|التوثيق في صفحة]]. **البرومبتات الخمسة هي الكتاب كله في مشروع واحد.**`,
        `## What does each prompt protect?
| Prompt | Prevents |
|---|---|
| 1 “don’t execute until I approve” | building something you didn’t agree to |
| 2 “first step only… no KPIs” | analysing broken data |
| 3 “each KPI’s calculation rule” + “stop with an Arabic message” | numbers with implicit definitions, and silent errors |
| 4 “compute nothing in the interface” | scattered, conflicting logic |
| 5 “instructions for a colleague who never saw it” | a tool only one person can run |

Notice each line is an earlier lesson: [[l:u1-ask|“ask me what’s missing”]], [[l:u2-analysis|quality first]], [[l:u2-compass|explicit failure]], “one source of truth”, and [[l:u2-level1|one-page documentation]]. **The five prompts are the whole book in one project.**`),
      practice: L(`## جدول متابعة تنفيذ البرومبتات (انسخه في ملاحظاتك)
| # | نفّذت؟ | يعمل فعلًا؟ (كيف تحققت) |
|---|---|---|
| ١ التأسيس | ☐ | وافقت على البنية والتقنيات |
| ٢ الجودة | ☐ | قرأت تقرير الجودة وأصلحت أهم مشكلة |
| ٣ الخادم | ☐ | جرّبت كل نقطة من صفحة التوثيق، وطابقت الإجمالي |
| ٤ الواجهة | ☐ | الفلاتر تحدّث كل شيء؛ اختبرت فترة بلا بيانات |
| ٥ التغليف | ☐ | زميل شغّله من ملف التعليمات وحده |

## المسرد في جملة
عندما يقول لك المساعد «سأضيف **مكتبة** pandas وأشغّل **الخادم المحلي** على **localhost:8000** وأضيف **Endpoint** للملخص»، أصبحت تفهم كل كلمة.`,
        `## A tracker for running the prompts (copy it into your notes)
| # | Done? | Really works? (how you checked) |
|---|---|---|
| 1 Foundation | ☐ | approved the structure and stack |
| 2 Quality | ☐ | read the quality report, fixed the top issue |
| 3 Server | ☐ | tried each endpoint from the docs page; matched the total |
| 4 Interface | ☐ | filters update everything; tested a no-data period |
| 5 Packaging | ☐ | a colleague ran it from the instructions alone |

## The glossary in one sentence
When the assistant says “I’ll add the pandas **library**, run the **local server** on **localhost:8000** and add an **endpoint** for the summary”, you now understand every word.`),
      adv: L(`## «لا تنتقل قبل أن يعمل السابق فعلًا» — ماذا تعني «فعلًا»؟
تعني اختبارًا **خارج كلام المساعد**: أن تفتح صفحة التوثيق وتجرّب بنفسك، أو تقارن رقمًا بإكسل، أو تطلب من زميل التشغيل. المساعد قد يقول «تم بنجاح» بينما الحالة الحدّية لم تُختبر.

## إدارة مشروع برمجي = المهارة الحقيقية
الكتاب يختم الوحدة بهذه الفكرة: الوصف الدقيق، والمراجعة، والتحقق — هي نفسها مهارات [[l:u5-team|إدارة فريق رقمي]] لاحقًا: بطاقة تعريف واضحة، وحدود توقف، ومعيار نجاح قابل للفحص {p40}.

## التوسع بعد أول تطبيق
بعد أن يعمل، أضف ميزة واحدة في كل مرة ببرومبت «الخطة قبل التنفيذ» {p27}، واحفظ كل خطوة كنقطة في [[l:u5-git|Git]] حتى تستطيع الرجوع لأي نسخة سليمة.`,
        `## “Don’t move on until it really works” — what does “really” mean?
A test **outside the assistant’s words**: opening the docs page and trying yourself, comparing a number with Excel, or asking a colleague to run it. The assistant may say “done successfully” while the edge case was never tested.

## Managing a software project = the real skill
The book closes the unit with this idea: precise description, review and verification — the same skills as [[l:u5-team|managing a digital team]] later: a clear identity card, stop limits, a checkable success criterion {p40}.

## Growing after the first app
Once it works, add one feature at a time with the “plan before executing” prompt {p27}, and save each step as a [[l:u5-git|Git]] commit so you can return to any sound version.`),
    },
    card: {
      what: L("خمسة برومبتات متتابعة: تأسيس، جودة، خادم، واجهة، تغليف — مع قائمة تحقق {p31}.", "Five sequential prompts: foundation, quality, server, interface, packaging — with a checklist {p31}."),
      why: L("لأن الترتيب هو الدرس الأهم: البيانات ← صحة الأرقام ← العرض ← التجميل.", "Because order is the key lesson: data → correct numbers → display → polish."),
      how: L("نفّذ واحدًا، وتحقق أنه يعمل فعلًا، ثم انتقل.", "Run one, verify it really works, then move on."),
      inside: L("كل سطر في البرومبتات تطبيق لدرس سابق من الكتاب.", "Every line of the prompts applies an earlier lesson of the book."),
      relation: L("الجزء التنفيذي من مشروع التطبيق المحلي.", "The execution half of the local-app project."),
      example: L("زميل يشغّل التطبيق من ملف التعليمات وحده = نجاح البرومبت ٥.", "A colleague runs the app from the instructions alone = prompt 5 succeeded."),
      apply: L("نفّذ الخمسة على ملف إكسل صغير تستخدمه هذا الأسبوع {p31}.", "Run all five on a small Excel file you use this week {p31}."),
      mistakes: L("دمج البرومبتات معًا، والانتقال لأن المساعد قال «تم».", "Merging the prompts, moving on because the assistant said “done”."),
      check: L("هل تذكر ما يمنعه كل برومبت من الخمسة؟", "Can you say what each of the five prompts prevents?"),
      next: L("الدليل الخامس: GitHub ذاكرة مشروعك.", "Guide 5: GitHub, your project’s memory."),
    },
    keys: L(["نفّذ بالترتيب، ولا تنتقل قبل أن يعمل السابق فعلًا {p31}.", "١ لا تنفيذ قبل موافقتك · ٢ الجودة فقط · ٣ خادم بقواعد حساب صريحة.", "٤ واجهة لا تحسب شيئًا · ٥ نقرة واحدة وتعليمات لزميل.", "قائمة التحقق: نقرة، رسالة عربية، مطابقة، ٣٠ ثانية، أصل سليم، زميل يشغّل.", "المهارة: إدارة مشروع برمجي، لا البرمجة."],
      ["Run in order; don’t move on until the previous really works {p31}.", "1 nothing executes before you approve · 2 quality only · 3 a server with explicit calculation rules.", "4 an interface that computes nothing · 5 one click and instructions for a colleague.", "Checklist: one click, Arabic messages, matching, 30 seconds, intact originals, a colleague can run it.", "The skill: managing a software project, not programming."]),
    prompts: ["u4-p-a1", "u4-p-a2", "u4-p-a3", "u4-p-a4", "u4-p-a5"],
    quick: [
      { q: L("في البرومبت الثاني، ماذا يُطلب تحديدًا؟", "What exactly does the second prompt ask for?"), opts: L(["حساب كل المؤشرات", "تقرير جودة الملف فقط، دون حساب مؤشرات ودون تعديل الأصل", "بناء الواجهة", "تغليف التطبيق"], ["Compute all KPIs", "Only a file quality report — no KPIs, no editing the original", "Build the interface", "Package the app"]), a: 1, why: L("«ابدأ بالخطوة الأولى فقط… لا تحسب أي مؤشر بعد، ولا تعدّل الملف الأصلي» {p31}.", "“Start with the first step only… don’t compute any KPI yet, and don’t edit the original file” {p31}.") },
      { q: L("ما «الدرس الأهم» في هذه الوحدة حسب الكتاب؟", "What is the unit’s “key lesson” according to the book?"), opts: L(["تعلم JavaScript", "الترتيب: البيانات أولًا، ثم صحة الأرقام، ثم العرض، ثم التجميل", "اختيار أجمل الألوان", "استخدام إطار عمل"], ["Learning JavaScript", "Order: data first, then correct numbers, then display, then polish", "Choosing the nicest colours", "Using a framework"]), a: 1, why: L("«والترتيب هو الدرس الأهم…» {p31}.", "“And order is the most important lesson…” {p31}.") },
    ],
    related: ["u4-localapp", "u2-project", "u5-git"], req: ["u4-localapp"], terms: ["terminal", "library", "localhost", "endpoint"],
  });
})();
