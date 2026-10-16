/* Comparison engine data: families of comparable things, each with shared dimensions.
   Every family cites the book pages it comes from; cells only restate or simply explain what the book says. */
"use strict";
(function (A) {
  const v = (ar, en) => ({ ar, en });
  const I = (id, lesson, name, sum, when, vals) => ({ id, lesson, name: v(name[0], name[1]), sum: v(sum[0], sum[1]), when: v(when[0], when[1]), v: Object.fromEntries(Object.entries(vals).map(([k, x]) => [k, v(x[0], x[1])])) });
  const D = (id, ar, en) => ({ id, name: v(ar, en) });

  A.compare = [
    { id: "assist", name: v("دردشة أم مساعد أم وكيل؟", "Chat, assistant or agent?"), pages: [6, 39], common: v("كلها شغالة بنموذج لغوي، وكلها بتبدأ من Context واضح.", "All run on a language model, and all start from clear context."),
      dims: [D("does", "ماذا يفعل", "What it does"), D("memory", "الـ Context والذاكرة", "Context and memory"), D("tools", "الأدوات", "Tools"), D("risk", "الرقابة المطلوبة", "Oversight needed")],
      items: [
        I("chat", "f4", ["الدردشة التقليدية", "Traditional chat"], ["بتسأل وبتاخد إجابة.", "You ask and get an answer."], ["سؤال سريع لوحده.", "A quick standalone question."], { does: ["بيجيب وبيوقف", "Answers and stops"], memory: ["محدودة بالمحادثة", "Limited to the chat"], tools: ["مفيش غالبًا", "Usually none"], risk: ["راجع المعلومة", "Check the information"] }),
        I("assistant", "f4", ["المساعد الشخصي", "Personal assistant"], ["بيفهمك وبيفتكر الـ Context وبيفضل يساعدك باستمرار.", "Understands you, remembers context, keeps helping."], ["شغل متواصل على مشروع أو موضوع.", "Ongoing work on a project or topic."], { does: ["بيحلل ويكتب ويقترح معاك", "Analyses, writes and suggests with you"], memory: ["بيبني «وعي» بمشروعك من الـ Context", "Builds “awareness” of your project from context"], tools: ["قليلة", "Few"], risk: ["راجع قبل ما تعتمد", "Review before adopting"] }),
        I("agent", "t1", ["الوكيل الذكي", "Smart agent"], ["هدف وأدوات وتكرار: بيخطط وينفّذ ويتابع.", "Goal, tools, repetition: plans, executes, follows up."], ["مهمة فيها خطوات كتير ومحتاجة أدوات.", "A multi-step task needing tools."], { does: ["بينفّذ ويلاحظ ويعدّل لحد الهدف", "Acts, observes, adjusts until the goal"], memory: ["هدف محدد وبطاقة دور", "A defined goal and role card"], tools: ["قراءة ملفات، استعلام، إرسال", "Read files, query, send"], risk: ["أقل صلاحية، وموافقة بشرية للإرسال والحذف", "Least privilege; human approval to send and delete"] })
      ] },

    { id: "notebook", name: v("دفتر المصادر أم المساعد العادي؟", "Source notebook or ordinary assistant?"), pages: [12, 13], common: v("الاتنين بيلخّصوا وبيجاوبوا وبيحلّلوا؛ الفرق في حدود المعرفة.", "Both summarise, answer and analyse; the difference is the knowledge boundary."),
      dims: [D("source", "مصدر الإجابة", "Answer source"), D("verify", "التحقق", "Verification"), D("best", "الأفضل في", "Best at")],
      items: [
        I("nlm", "p8", ["NotebookLM", "NotebookLM"], ["بيجيب بس من المصادر اللي إنت اخترتها.", "Answers only from the sources you chose."], ["لما الحقيقة والمصادر مهمة: سياسات، تقارير، أبحاث.", "When truth and sources matter: policies, reports, research."], { source: ["مصادرك بس", "Only your sources"], verify: ["استشهاد مع كل إجابة للمكان الأصلي", "A citation with every answer back to the original place"], best: ["عقل المحتوى: الحقيقة والمصادر", "The content brain: truth and sources"] }),
        I("chatbot", "p11", ["المساعد العادي", "Ordinary assistant"], ["ممكن يخلط مصادرك ببحث برا ومعرفته العامة.", "May mix your sources with outside search and general knowledge."], ["لما محتاج صياغة وقصة وترتيب.", "When you need wording, story and order."], { source: ["مصادرك + معرفته العامة + بحث", "Your sources + general knowledge + search"], verify: ["اطلب المصدر لكل رقم وافصل اليقين عن التخمين", "Ask for a source for every number; separate certainty from guessing"], best: ["مخرج القصة: الرسالة والترتيب", "The story director: message and order"] })
      ] },

    { id: "macro", name: v("مسجّل الماكرو أم كود يكتبه الذكاء الاصطناعي؟", "Macro recorder or AI-written code?"), pages: [13, 14], common: v("الاتنين بيحوّلوا خطواتك اليدوية لأتمتة في إكسل، والاتنين بتجرّبهم على نسخة.", "Both turn your manual steps into Excel automation, and both are tried on a copy."),
      dims: [D("how", "كيف يعمل", "How it works"), D("flex", "المرونة", "Flexibility"), D("learn", "ما تتعلمه", "What you learn"), D("risk", "الخطر", "Risk")],
      items: [
        I("recorder", "p10", ["مسجّل الماكرو", "Macro recorder"], ["بيسجّل خطواتك وإنت بتنفّذها وبيحوّلها لكود.", "Records your steps as you do them and turns them into code."], ["مهمة ثابتة تقدر تعملها بنفسك مرة واحدة.", "A fixed task you can perform once yourself."], { how: ["إنت بتنفّذ الخطوات وبيسجّلها", "You perform, it records"], flex: ["بينسخ اللي عملته حرفيًا", "Copies what you did literally"], learn: ["بتشوف خطواتك بتتحول لأوامر", "You see how your steps become commands"], risk: ["أفعاله ما بتتلغاش بالطريقة المعتادة", "Its actions can’t be undone the usual way"] }),
        I("aicode", "p10", ["كود بالقالب الذهبي", "Code from the golden prompt"], ["بتوصف الملف والخطوات والنتيجة، وبيكتب الكود.", "You describe the file, steps and result, and it writes the code."], ["مهمة فيها شروط واستثناءات وحالات ناقصة.", "A task with conditions, exceptions and missing cases."], { how: ["وصف دقيق ← كود", "Precise description → code"], flex: ["بيعالج الفراغات والأخطاء لو طلبت", "Handles blanks and errors if asked"], learn: ["وصف العملية بدقة: المهارة الجديدة", "Describing the process precisely: the new skill"], risk: ["ممكن يفترض أسماء مش موجودة لو ما منعتهوش", "May assume names that don’t exist unless told not to"] })
      ] },

    { id: "platform", name: v("بايثون أم منصة تقارير مؤسسية؟", "Python or an enterprise reporting platform?"), pages: [20, 21], common: v("مش متنافسين: ابني الحل الأخف الأول، وانتقل لما التقرير يبقى أصل بيستخدمه ناس كتير.", "They aren’t rivals: build the lighter solution first, and move when the report becomes an asset many use."),
      dims: [D("speed", "الوقت لأول نتيجة", "Time to first result"), D("freedom", "حرية التحليل", "Analysis freedom"), D("gov", "الصلاحيات والحوكمة", "Permissions and governance"), D("cost", "تكلفة التشغيل", "Running cost")],
      items: [
        I("py", "y5", ["بايثون", "Python"], ["حل خفيف لنطاق محدود ومنطق خاص.", "A light solution for a limited scope and specific logic."], ["قسم واحد، منطق خاص، توزيع بسيط.", "One department, specific logic, simple distribution."], { speed: ["ساعات لأيام", "Hours to days"], freedom: ["كاملة", "Full"], gov: ["بتتبني يدوي", "Built by hand"], cost: ["صيانة الكود والاعتماد على معرفة شخص واحد", "Code upkeep and reliance on one person’s knowledge"] }),
        I("ent", "y5", ["منصة مؤسسية", "Enterprise platform"], ["أصل طويل المدى بحوكمة مركزية.", "A long-term asset with central governance."], ["مستخدمين كتير بصلاحيات مختلفة ومقاييس موحّدة.", "Many users with different permissions and unified metrics."], { speed: ["أيام لأسابيع", "Days to weeks"], freedom: ["محدودة بما المنتج يسمح", "Limited by the product"], gov: ["مدمجة ومركزية", "Built-in and central"], cost: ["تراخيص وإدارة مركزية", "Licences and central management"] })
      ] },

    { id: "present", name: v("Plotly أم Streamlit أم Dash؟", "Plotly, Streamlit or Dash?"), pages: [21, 22], common: v("كلها بتحوّل التحليل لعرض تفاعلي، والنجاح واحد: الرسالة تتفهم في 30 ثانية.", "All turn analysis into interactive display, and success is the same: the message understood in 30 seconds."),
      dims: [D("type", "نوع المخرج", "Output type"), D("run", "طريقة الفتح", "How it opens"), D("stage", "المرحلة المناسبة", "Right stage")],
      items: [
        I("plotly", "y6", ["Plotly", "Plotly"], ["رسوم تفاعلية بتتحفظ كصفحة واحدة.", "Interactive charts saved as one page."], ["تقرير لوحده يتبعت كملف.", "A standalone report sent as a file."], { type: ["مخرج مستقل، أكتر من 40 نوع رسم", "Standalone output, 40+ chart types"], run: ["صفحة ويب بتشتغل من غير إنترنت ومن غير تثبيت", "A web page working offline with no install"], stage: ["أي وقت محتاج ملف يتفتح بنقرة", "Whenever you need a file that opens in a click"] }),
        I("streamlit", "y6", ["Streamlit", "Streamlit"], ["تطبيق تحليل بأسطر قليلة.", "An analytics app in a few lines."], ["نموذج أولي سريع لاختبار الفكرة.", "A quick prototype to validate the idea."], { type: ["تطبيق تحليل كامل", "Full analytics app"], run: ["بيشتغل كتطبيق بخادم صغير", "Runs as an app with a small server"], stage: ["البداية: تأكد من الفكرة", "Start: validate the idea"] }),
        I("dash", "y6", ["Dash", "Dash"], ["أداة دائمة بتحكم أدق.", "A permanent tool with finer control."], ["بعد ما المتطلبات تستقر.", "Once requirements settle."], { type: ["تطبيق تحليل كامل", "Full analytics app"], run: ["بيشتغل كتطبيق بخادم", "Runs as an app with a server"], stage: ["بعدين: أداة دائمة", "Later: a permanent tool"] })
      ] },

    { id: "auto", name: v("أدوات أتمتة التشغيل", "Run-automation tools"), pages: [18], common: v("كلها بتشيل شغل يدوي متكرر؛ والقاعدة: كل ما المستوى طلع، الانكسار بيقل.", "All remove repeated manual work; the rule: the higher the level, the fewer the breakages."),
      dims: [D("drives", "ماذا تقود", "What it drives"), D("level", "مستوى الثبات", "Stability level"), D("break", "متى تنكسر", "When it breaks")],
      items: [
        I("pw", "y3", ["Playwright", "Playwright"], ["بتقود المتصفح مباشرة.", "Drives the browser directly."], ["مواقع ونماذج وتنزيل تقارير.", "Sites, forms and report downloads."], { drives: ["المتصفح", "The browser"], level: ["٢ — تحكم مباشر", "2 — direct control"], break: ["لما هيكل الصفحة يتغيّر جذريًا", "When the page structure changes radically"] }),
        I("xw", "y3", ["xlwings", "xlwings"], ["بتتحكم في ملفات إكسل الحقيقية.", "Controls real Excel files."], ["حسابات جوا إكسل نفسه.", "Calculations inside Excel itself."], { drives: ["إكسل", "Excel"], level: ["٢ — تحكم مباشر", "2 — direct control"], break: ["نادرًا؛ لما بنية الملف تتغيّر", "Rarely; when the file structure changes"] }),
        I("pwa", "y3", ["pywinauto", "pywinauto"], ["بتتعامل مع برامج ويندوز عن طريق أزرارها.", "Handles Windows apps through their buttons."], ["برنامج من غير ملف أو API.", "An app with no file or API."], { drives: ["برامج ويندوز", "Windows apps"], level: ["٣ — عناصر الواجهة", "3 — UI elements"], break: ["مع تحديث يغيّر العناصر", "With an update changing the elements"] }),
        I("pag", "y3", ["PyAutoGUI", "PyAutoGUI"], ["بتحاكي الماوس ولوحة المفاتيح.", "Simulates mouse and keyboard."], ["الملاذ الأخير، مع كتابة السبب في الكود.", "The last resort, with the reason written in the code."], { drives: ["الشاشة كإنسان", "The screen, like a person"], level: ["٤ — محاكاة المستخدم", "4 — user simulation"], break: ["مع أي تغيير في الشاشة أو الدقة", "With any screen or resolution change"] })
      ] },

    { id: "analysis", name: v("DuckDB أم Polars أم pandas؟", "DuckDB, Polars or pandas?"), pages: [19, 20, 29], common: v("كلها بتشتغل على جهاز واحد من غير خادم قاعدة بيانات، وكلها محتاجة فحص جودة الأول.", "All run on one machine with no database server, and all need a quality check first."),
      dims: [D("style", "الأسلوب", "Style"), D("strength", "نقطة القوة", "Strength"), D("use", "استخدام نموذجي", "Typical use")],
      items: [
        I("duck", "y4", ["DuckDB", "DuckDB"], ["استعلامات SQL على الملفات مباشرة.", "SQL queries straight on files."], ["أسئلة سريعة على فولدر ملفات.", "Quick questions over a folder of files."], { style: ["لغة SQL", "SQL language"], strength: ["فولدر كامل مرة واحدة", "A whole folder at once"], use: ["«كم بعنا في كل فرع الشهر ده؟»", "“How much did each branch sell this month?”"] }),
        I("pol", "y4", ["Polars", "Polars"], ["معالجة سريعة جدًا للجداول الكبيرة.", "Very fast processing of big tables."], ["جداول ضخمة أكبر من الذاكرة.", "Huge tables beyond memory."], { style: ["أوامر بايثون", "Python commands"], strength: ["السرعة مع الحجم الكبير", "Speed at large scale"], use: ["ملايين الصفوف من سجلات الإنتاج", "Millions of production-log rows"] }),
        I("pd", "w4", ["pandas", "pandas"], ["المكتبة الأشهر للقراءة والتنظيف والدمج.", "The best-known library to read, clean and merge."], ["تطبيق محلي حجم متوسط.", "A medium-sized local app."], { style: ["أوامر بايثون", "Python commands"], strength: ["شائعة ومرنة وموثّقة كويس", "Common, flexible, well documented"], use: ["تنظيف ودمج وتجميع لتطبيق الويب المحلي", "Cleaning, merging and aggregating for the local web app"] })
      ] },

    { id: "storage", name: v("SQLite أم قاعدة بيانات مؤسسية؟", "SQLite or an enterprise database?"), pages: [29], common: v("الاتنين بيخزّنوا البيانات والاستعلام بـSQL.", "Both store data and are queried with SQL."),
      dims: [D("setup", "التثبيت", "Setup"), D("fit", "يناسب", "Fits"), D("care", "الصيانة", "Upkeep")],
      items: [
        I("sqlite", "w4", ["SQLite", "SQLite"], ["قاعدة بيانات كاملة في ملف واحد.", "A full database in one file."], ["تطبيق على جهاز شخص واحد.", "An app on one person’s PC."], { setup: ["مفيش خادم ومفيش تثبيت", "No server, no install"], fit: ["تطبيق محلي بيمشي مع المشروع", "A local app that travels with the project"], care: ["شبه معدومة", "Almost none"] }),
        I("entdb", "w4", ["قاعدة بيانات مؤسسية", "Enterprise database"], ["خادم مركزي لمستخدمين كتير.", "A central server for many users."], ["نظام مشترك بصلاحيات.", "A shared system with permissions."], { setup: ["خادم وتثبيت وصلاحيات", "Server, install and permissions"], fit: ["مستخدمين كتير في نفس الوقت", "Many simultaneous users"], care: ["صيانة مستمرة من فريق مختص", "Ongoing upkeep by a specialist team"] })
      ] },

    { id: "fe", name: v("الواجهة الأمامية أم الخلفية؟", "Front-end or back-end?"), pages: [28, 29], common: v("بيشتغلوا مع بعض عن طريق الـAPI: الأمامية بتطلب، والخلفية بتحسب وبترد.", "They work together through the API: the front-end asks, the back-end computes and replies."),
      dims: [D("where", "أين تعمل", "Where it runs"), D("job", "الوظيفة", "Job"), D("data", "علاقتها بالبيانات", "Relation to data"), D("tools", "الأدوات في الكتاب", "Tools in the book")],
      items: [
        I("front", "w3", ["الواجهة الأمامية", "Front-end"], ["اللي المستخدم بيشوفه وبيتفاعل معاه.", "What the user sees and interacts with."], ["تصميم العرض والتفاعل.", "Designing display and interaction."], { where: ["المتصفح", "The browser"], job: ["عرض وتفاعل وفلاتر", "Display, interaction, filters"], data: ["ما بتمسّهاش مباشرة؛ بتطلبها", "Doesn’t touch it directly; requests it"], tools: ["HTML وCSS وJavaScript وTailwind ومكتبات الرسوم", "HTML, CSS, JavaScript, Tailwind, chart libraries"] }),
        I("back", "w4", ["الواجهة الخلفية", "Back-end"], ["العقل اللي مش بيظهر بس هو مصدر كل رقم.", "The unseen brain that sources every number."], ["القراءة والحساب وقواعد العمل.", "Reading, computing and business rules."], { where: ["الخادم (محلي هنا)", "The server (local here)"], job: ["قراءة وحساب وتطبيق قواعد", "Read, compute, apply rules"], data: ["بتقرا بس، وبتكتب في فولدر منفصل", "Reads only; writes to a separate folder"], tools: ["بايثون وFastAPI وpandas وDuckDB وSQLite", "Python, FastAPI, pandas, DuckDB, SQLite"] })
      ] },

    { id: "git", name: v("Git أم GitHub؟", "Git or GitHub?"), pages: [32, 33], common: v("بيشتغلوا مع بعض: Git بيسجّل التاريخ، وGitHub بيحفظه ويشاركه.", "They work together: Git records history; GitHub keeps and shares it."),
      dims: [D("what", "ما هو", "What it is"), D("where", "أين", "Where"), D("net", "الإنترنت", "Internet"), D("why", "لماذا تحتاجه", "Why you need it")],
      items: [
        I("gitt", "g1", ["Git", "Git"], ["الأداة اللي بتسجّل كل تغيير.", "The tool that records every change."], ["دايمًا، حتى في مشروع شخصي.", "Always, even on a personal project."], { what: ["أداة", "A tool"], where: ["على جهازك", "On your PC"], net: ["مش محتاج", "Not needed"], why: ["رجوع لأي لحظة فاتت وتجارب آمنة", "Return to any past moment and safe experiments"] }),
        I("gh", "g1", ["GitHub", "GitHub"], ["الخدمة اللي بتستضيف مشاريع Git.", "The service hosting Git projects."], ["نسخة برا جهازك أو شغل فريق.", "A copy off your machine or team work."], { what: ["خدمة/موقع", "A service/website"], where: ["على النت", "Online"], net: ["مطلوب", "Required"], why: ["نسخة احتياطية ومراجعة وتعاون", "Backup, review and collaboration"] })
      ] },

    { id: "localrun", name: v("LM Studio أم Ollama؟", "LM Studio or Ollama?"), pages: [36], common: v("الاتنين بيشغّلوا النماذج محلي وبيوفروا خادم متوافق مع OpenAI API — بتغيّر العنوان بس.", "Both run models locally and offer an OpenAI-API-compatible server — you change only the address."),
      dims: [D("ui", "الواجهة", "Interface"), D("for", "لمن", "For whom"), D("strength", "الميزة", "Strength")],
      items: [
        I("lms", "m3", ["LM Studio", "LM Studio"], ["تطبيق رسومي للبحث والتنزيل والمحادثة.", "A GUI app to search, download and chat."], ["أول تجربة تشغيل محلي.", "Your first local run."], { ui: ["رسومية", "Graphical"], for: ["المبتدئين", "Beginners"], strength: ["بيريك النموذج يناسب ذاكرتك ولا لأ", "Shows whether a model fits your memory"] }),
        I("oll", "m3", ["Ollama", "Ollama"], ["سطر أوامر خفيف.", "A light command line."], ["تضمين النموذج في أداة أو تطبيق.", "Embedding the model in a tool or app."], { ui: ["سطر أوامر", "Command line"], for: ["اللي بيبني أدوات", "Tool builders"], strength: ["خفيف وسهل التضمين", "Light and easy to embed"] })
      ] },

    { id: "where", name: v("نموذج محلي أم سحابي؟", "Local or cloud model?"), pages: [35, 36], common: v("الاتنين نموذج لغوي بتستخدمهم بنفس الطريقة؛ الفرق في مكان التشغيل.", "Both are language models used the same way; the difference is where they run."),
      dims: [D("privacy", "الخصوصية", "Privacy"), D("quality", "الجودة", "Quality"), D("cost", "التكلفة", "Cost"), D("when", "استخدمه حين", "Use it when")],
      items: [
        I("local", "m3", ["نموذج محلي", "Local model"], ["بيشتغل جوا جهازك من غير إنترنت.", "Runs inside your PC with no internet."], ["بيانات حساسة، شغل من غير نت، حجم ضخم، أو تجربة وتعلّم.", "Sensitive data, offline work, huge volume, or experimenting."], { privacy: ["البيانات ما بتخرجش من الجهاز", "Data never leaves the device"], quality: ["بتقرب من السحابي مع ذاكرة 64+ جيجابايت", "Nears cloud quality with 64+ GB memory"], cost: ["مفيش فاتورة؛ تكلفة الجهاز", "No bill; the hardware cost"], when: ["البيانات ما ينفعش تترفع", "Data can’t be uploaded"] }),
        I("cloud", "m2", ["نموذج سحابي", "Cloud model"], ["خدمة على خوادم الشركة المزوّدة.", "A service on the provider’s servers."], ["أعلى جودة لمهام معقدة وبيانات مسموح تترفع.", "Top quality for complex tasks with data allowed to be uploaded."], { privacy: ["خاضعة لسياسة الشركة والمزوّد", "Subject to company and provider policy"], quality: ["الأعلى في الفئة الطليعية", "Highest in the frontier tier"], cost: ["بالمليون توكن، والمخرج أغلى 3–6 مرات", "Per million tokens; output 3–6× pricier"], when: ["المهمة معقدة والبيانات مسموح بها", "The task is complex and data is allowed"] })
      ] },

    { id: "size", name: v("نموذج كبير أم صغير؟", "Big or small model?"), pages: [34], common: v("الأكبر مش دايمًا الأحسن ليك: اختار حسب التكلفة والسرعة وملاءمة المهمة.", "Bigger isn’t always best for you: choose by cost, speed and task fit."),
      dims: [D("ability", "القدرة", "Ability"), D("speed", "السرعة", "Speed"), D("cost", "التكلفة", "Cost"), D("tasks", "مهام مناسبة", "Suitable tasks")],
      items: [
        I("big", "m1", ["نموذج طليعي كبير", "Big frontier model"], ["أعلى قدرة لأصعب المهام.", "Top ability for the hardest tasks."], ["تحليل معقد وبرمجة صعبة.", "Complex analysis and hard coding."], { ability: ["الأعلى", "Highest"], speed: ["أبطأ", "Slower"], cost: ["الأعلى (الفرق ممكن يعدّي 100 ضعف)", "Highest (the gap can exceed 100×)"], tasks: ["تحليل معقد، برمجة صعبة", "Complex analysis, hard coding"] }),
        I("small", "m1", ["نموذج سريع رخيص", "Fast, cheap model"], ["سرعة وتكلفة قليلة على نطاق واسع.", "Speed and low cost at scale."], ["تصنيف وتلخيص بكميات كبيرة.", "Classification and summarising at scale."], { ability: ["كافية لمهام محددة", "Enough for defined tasks"], speed: ["أسرع", "Faster"], cost: ["الأقل", "Lowest"], tasks: ["تصنيف، تلخيص بالجملة، تطبيقات تفاعلية", "Classification, bulk summaries, interactive apps"] })
      ] },

    { id: "tool", name: v("أداة أم نظام؟", "Tool or system?"), pages: [37, 38], common: v("الاتنين بيوفّروا وقت؛ النظام بيربط الأدوات من غير ساعي بشري بينها.", "Both save time; a system links tools with no human courier between them."),
      dims: [D("scope", "النطاق", "Scope"), D("handoff", "النقل اليدوي", "Manual hand-off"), D("ends", "ينتهي عند", "Ends at"), D("build", "كيف يُبنى", "How it’s built")],
      items: [
        I("tl", "s1", ["الأداة", "Tool"], ["بتحل خطوة واحدة.", "Solves one step."], ["مشكلة محددة متكررة.", "A specific recurring problem."], { scope: ["خطوة واحدة", "One step"], handoff: ["إنسان بينقل الناتج للخطوة اللي بعدها", "A person carries output to the next step"], ends: ["مخرج مستني حد ينقله", "Output waiting to be carried"], build: ["مواصفة مهمة وأداة صغيرة", "A task spec and a small tool"] }),
        I("sys", "s1", ["النظام", "System"], ["بيربط العمليات والبيانات في منظومة.", "Links processes and data into one."], ["سلسلة فيها نقل يدوي متكرر.", "A chain with repeated manual hand-offs."], { scope: ["خمس طبقات من المصدر للفعل", "Five layers from source to action"], handoff: ["صفر قد ما تقدر", "As close to zero as possible"], ends: ["إشعار وقرار موثّق", "A notice and a documented decision"], build: ["شريحة عمودية: عميق مش عريض", "A vertical slice: deep, not wide"] })
      ] },

    { id: "team", name: v("وكيل واحد أم فريق؟ وأنماط التنسيق", "One agent or a team? And coordination patterns"), pages: [39, 40], common: v("كلها محتاجة بطاقة دور وصلاحيات محدودة وسجل كامل.", "All need a role card, limited permissions and a full log."),
      dims: [D("how", "كيف يعمل", "How it works"), D("when", "متى", "When"), D("trace", "سهولة التتبع", "Ease of tracing")],
      items: [
        I("single", "t1", ["وكيل عام واحد", "One general agent"], ["بيعمل كل حاجة بمستوى متوسط.", "Does everything at an average level."], ["مهمة صغيرة واحدة.", "A single small task."], { how: ["تعليمات عامة لكل حاجة", "General instructions for everything"], when: ["مهمة بسيطة", "A simple task"], trace: ["بسيط بس الأخطاء مش محصورة", "Simple, but errors aren’t contained"] }),
        I("chain", "t1", ["فريق: السلسلة", "Team: chain"], ["وكيل بعد وكيل.", "Agent after agent."], ["عملية بترتيب ثابت.", "A fixed-order process."], { how: ["كل وكيل بيسلّم للي بعده", "Each agent hands to the next"], when: ["ترتيب ثابت", "Fixed order"], trace: ["الأسهل", "Easiest"] }),
        I("fan", "t1", ["فريق: التوزيع والتجميع", "Team: fan-out/fan-in"], ["وكلاء كتير بيشتغلوا على أجزاء، وبعدين المنسّق بيدمج.", "Several agents on parts, then the coordinator merges."], ["مصادر أو إدارات متعددة.", "Several sources or departments."], { how: ["توزيع متوازي وبعدين دمج", "Parallel split, then merge"], when: ["مصادر متعددة", "Multiple sources"], trace: ["متوسط", "Medium"] }),
        I("critic", "t1", ["فريق: المنفّذ والناقد", "Team: executor and critic"], ["واحد بينتج وواحد بيراجع ويرجّع للتصحيح.", "One produces, another reviews and returns it."], ["لما الجودة أهم من السرعة.", "When quality beats speed."], { how: ["جولتين أو تلاتة مراجعة", "Two or three review rounds"], when: ["الجودة أهم من السرعة", "Quality over speed"], trace: ["واضح بس أبطأ", "Clear but slower"] })
      ] }
  ];
})(window.ACADEMY);
