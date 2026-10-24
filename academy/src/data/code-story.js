/* Claude Code in detail — the story deck of lesson a5 (unit 3), on example 2's folder.
   The planning engineer carries every slide with one question: «إمتى أستخدم Claude Code، وفين، وبأنهي موديل ومستوى تفكير؟».
   The deck shows what changes when the assistant works inside the folder: the four places it runs, the web against the
   PC, a first session on Windows, permission modes and Plan mode, the models and the levels of thinking, the tools around
   it (CLAUDE.md, skills, helpers, connectors, schedules) and the safety rules. Drawings are the cc_* entries in
   engine/history.js. Names of models and settings change over time; the deck tells the reader how to see the current ones. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.codeStory = {
    id: "ccode", lesson: "a5",
    kicker: u("Claude Code · الحكاية في ٨ دقايق", "Claude Code · the story in 8 minutes"),
    title: u("لما المساعد يشتغل جوّه الفولدر نفسه", "When the assistant works inside the folder itself"),
    lead: u("في المثال التاني مهندس التخطيط كان الوسيط بين الشات والملفات: ٣٤ رسالة رايحة جاية. في الحكاية دي بيعيد نفس المثال بـ Claude Code، ويتعلّم يشتغل فين، ويستأذن في إيه، وبأنهي موديل ومستوى تفكير.",
      "In example 2 the planning engineer was the go-between for the chat and the files: 34 messages back and forth. In this story he redoes the same example with Claude Code, and learns where it runs, what it asks first, and which model and level of thinking to use."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إمتى أستخدم Claude Code، وفين، وبأنهي موديل ومستوى تفكير؟", "When do I use Claude Code, where, and with which model and level of thinking?"),
    finalQuestion: u("طب إزاي كل اللي اتعلمه ده ما يضيعش المرة الجاية؟", "So how does everything it learned not get lost next time?"),
    note: u("أسماء الموديلات والإعدادات بتتحدّث باستمرار: اكتب ‎/model و‎/effort علشان تشوف المتاح عندك. الأوقات والأرقام توضيحية.", "Model names and settings are updated regularly: type /model and /effort to see what's available to you. Times and figures are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("Claude Code، في شرائح", "Claude Code, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "middle", art: "cc_middle", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("٣٤ رسالة", "34 messages"),
        title: u("٣٤ رسالة بين الشات والفولدر", "34 messages between the chat and the folder"),
        story: [u("فاكر آخر المثال التاني؟ النموذج كتب الأداة صح، بس مهندس التخطيط هو اللي كان بيوصّل: ينسخ الكود، ويحفظه، ويشغّل، ويقرا الرسالة، ويرجع يلصقها. ٣٤ رسالة. والنموذج عمره ما شاف الملفات بنفسه: كل اللي يعرفه هو الوصف.",
          "Remember the end of example 2? The model wrote the tool correctly, but the planning engineer did the carrying: copy the code, save it, run, read the message, paste it back. 34 messages. And the model never saw the files itself: all it knew was the description."),
        u("زميل في التطوير قاله: «جرّب Claude Code. ده نفس النموذج، بس بيشتغل جوّه الفولدر». والسؤال اللي ماشي معانا في الحكاية: إمتى أستخدم Claude Code، وفين، وبأنهي موديل ومستوى تفكير؟",
          "A colleague in development told him: “Try Claude Code. It's the same model, but it works inside the folder.” And the question we carry through the story: when do I use Claude Code, where, and with which model and level of thinking?")],
        answer: u("لما تلاقي نفسك وسيط بين الشات والملفات، ده وقت أداة بتشتغل على الملفات بنفسها. لأن النقل بينهم وقت ضايع وفرصة لغلطة.", "When you find yourself the go-between for a chat and your files, it's time for a tool that works on the files itself — carrying between them wastes time and invites mistakes."),
        idea: u("نفس النموذج… بس جوّه الفولدر.", "The same model… inside the folder.")
      },
      {
        id: "loop", art: "cc_loop", year: u("الفرق", "The difference"), mark: u("٠٢", "02"), era: u("يقرا ويشغّل", "It reads and runs"),
        title: u("بيقرا، ويكتب، ويشغّل، ويصلّح… وإنت بتوافق", "It reads, writes, runs, fixes… and you approve"),
        story: [u("في الشات: إنت بتوصف، والنموذج بيكتب، وإنت بتشغّل. في Claude Code: هو بيفتح الملفات ويشوف شكلها، ويكتب السكريبت في الفولدر، ويشغّله، ويقرا الرسالة، ولو وقفت يصلّح ويشغّل تاني. اللفة اللي كانت ٣٤ رسالة بقت بتحصل جوّاه.",
          "In a chat: you describe, the model writes, you run. In Claude Code: it opens the files and sees their shape, writes the script in the folder, runs it, reads the message, and if it stops, fixes and runs again. The loop that took 34 messages now happens inside it."),
        u("بس فيه فرق مهم: صلاحيته أكبر. ممكن يعدّل ملفات ويشغّل أوامر. علشان كده بيستأذنك قبل الحاجات المهمة: «أعدّل الملف ده؟»، «أشغّل الأمر ده؟». وإنت اللي بتحدد يستأذن في إيه، وده موضوع الشرايح الجاية.",
          "But there's an important difference: it has more access. It can edit files and run commands. That's why it asks you before important things: “Shall I edit this file?”, “Shall I run this command?” And you decide what it must ask about, which is the subject of the next slides.")],
        answer: u("استخدمه لما الشغل محتاج ملفات حقيقية تتقري وكود يتشغّل ويتختبر. لأن الشات كفاية للأسئلة والشرح، وClaude Code ليه لازمة لما في تنفيذ.", "Use it when the work needs real files read and code run and tested — chat is enough for questions and explanations; Claude Code earns its place when there's doing."),
        idea: u("الشات بيقترح… وClaude Code بينفّذ ويستأذن.", "Chat suggests… Claude Code does, and asks.")
      },
      {
        id: "places", art: "cc_places", year: u("الأماكن", "Places"), mark: u("٠٣", "03"), era: u("٤ أماكن", "4 places"),
        title: u("٤ أماكن… ونفس المساعد", "4 places… and the same assistant"),
        story: [u("Claude Code بيشتغل في ٤ أماكن. على الويب، في claude.ai/code أو تطبيق الموبايل. وتطبيق سطح المكتب على ويندوز وماك، تبويب Code. والطرفية: تكتب claude جوّه الفولدر. وجوّه المحرر: إضافة لـ VS Code وJetBrains.",
          "Claude Code runs in 4 places. On the web, at claude.ai/code or in the mobile app. The desktop app on Windows and Mac, the Code tab. The terminal: you type claude inside the folder. And inside the editor: an extension for VS Code and JetBrains."),
        u("الأربعة نفس المحرك: نفس الموديلات، ونفس ملف CLAUDE.md، ونفس المهارات. الفرق في المكان اللي الملفات فيه، وفي شكل الشغل: تطبيق سطح المكتب بيوريك التعديلات قبل وبعد بشكل مريح، والطرفية أسرع للي متعوّد، والمحرر للي فاتح الكود قدامه.",
          "All four share one engine: the same models, the same CLAUDE.md file, the same skills. The difference is where the files are, and the style of work: the desktop app shows changes before and after comfortably, the terminal is quicker for those used to it, and the editor suits whoever has the code open in front of them.")],
        answer: u("اختار المكان على حسب الملفات فين وإنت مرتاح في إيه، مش على حسب «الأقوى». لأن المحرك واحد في الأربعة.", "Choose the place by where the files are and what you're comfortable with, not by “the strongest” — the engine is the same in all four."),
        idea: u("محرك واحد… ٤ أبواب.", "One engine… 4 doors.")
      },
      {
        id: "webpc", art: "cc_webpc", year: u("الويب والجهاز", "Web and PC"), mark: u("٠٤", "04"), era: u("الملفات فين؟", "Where are the files?"),
        title: u("الويب لمستودعات GitHub… والجهاز لملفاتك", "The web for GitHub repositories… your PC for your files"),
        story: [u("على الويب، Claude Code بيشتغل على جهاز في السحابة، على مستودع GitHub. تقدر تبدأ مهمة وتقفل اللابتوب، وهي تكمّل؛ وتشغّل كذا مهمة مع بعض؛ وتتابع من الموبايل. ده مناسب للكود اللي عايش على GitHub، زي الموقع اللي بتقرا فيه الدرس ده.",
          "On the web, Claude Code runs on a machine in the cloud, on a GitHub repository. You can start a task and close your laptop while it carries on; run several tasks at once; and follow along from your phone. That suits code that lives on GitHub, such as the site you're reading this lesson on."),
        u("بس ملفات المثال التاني على لابتوب مهندس التخطيط، وفيها أرقام مبيعات الشركة. يبقى المكان الصح تطبيق سطح المكتب أو الطرفية على جهازه: الملفات ما بتسيبش الجهاز للسحابة. القاعدة بسيطة: الملفات فين؟ هناك يشتغل.",
          "But example 2's files sit on the planning engineer's laptop, and they hold the company's sales figures. So the right place is the desktop app or the terminal on his machine: the files don't leave the laptop for the cloud. The rule is simple: where are the files? It works there.")],
        answer: u("ملفات الشغل اللي على جهازك تشتغل عليها من جهازك، والويب للمستودعات والمهام الطويلة. لأن البيانات الحساسة مكانها الجهاز، وسياسة الشركة قبل أي سرعة.", "Work files on your laptop are handled from your laptop; the web is for repositories and long tasks — sensitive data belongs on the machine, and company policy comes before any speed."),
        idea: u("الملفات فين؟… هناك يشتغل.", "Where are the files?… it works there.")
      },
      {
        id: "first", art: "cc_first", year: u("أول جلسة", "First session"), mark: u("٠٥", "05"), era: u("على ويندوز", "On Windows"),
        title: u("أول جلسة على ويندوز: نسخة من الفولدر، وCLAUDE.md", "A first session on Windows: a copy of the folder, and CLAUDE.md"),
        story: [u("مهندس التخطيط نزّل تطبيق سطح المكتب، ودخل بحساب الشركة، وفتح تبويب Code. (اللي بيحب الطرفية بيكتب سطر واحد في PowerShell لتثبيته، وبعدين claude.) وقبل أي حاجة عمل نسخة من فولدر المثال التاني، وفتح Claude Code على النسخة، مش على الأصل.",
          "The planning engineer installed the desktop app, signed in with the company account and opened the Code tab. (Those who prefer the terminal type one line in PowerShell to install it, then claude.) Before anything else he made a copy of example 2's folder, and opened Claude Code on the copy, not the original."),
        u("وأول أمر: ‎/init. Claude Code قرا الفولدر وكتب ملف CLAUDE.md: «المشروع: مراجعة الربع التجارية. Data للقراية بس. كل الناتج في Output». مهندس التخطيط زوّد سطر: «ممنوع إرسال أي ملف برّه الجهاز». الملف ده بيتقري في أول كل جلسة.",
          "And the first command: /init. Claude Code read the folder and wrote a CLAUDE.md file: “Project: the quarter's commercial review. Data is read-only. All output goes to Output.” The planning engineer added a line: “Never send any file off this machine.” That file is read at the start of every session.")],
        answer: u("ابدأ على نسخة، واكتب قواعد المشروع في CLAUDE.md من أول جلسة. لأن القاعدة المكتوبة بتتطبق كل مرة، واللي في دماغك بتتنسي.", "Start on a copy, and write the project's rules in CLAUDE.md from the first session — a written rule applies every time; one in your head gets forgotten."),
        idea: u("نسخة… وقواعد مكتوبة.", "A copy… and written rules.")
      },
      {
        id: "modes", art: "cc_modes", year: u("الصلاحيات", "Permissions"), mark: u("٠٦", "06"), era: u("يستأذن في إيه", "What it asks"),
        title: u("أوضاع الصلاحيات: من «اسألني في كل حاجة» لـ «خطة بس»", "Permission modes: from “ask me everything” to “plan only”"),
        story: [u("Claude Code ليه أوضاع: الافتراضي بيستأذن قبل ما يعدّل ملف أو يشغّل أمر. ووضع قبول التعديلات بيعدّل من غير ما يسأل، وبيستأذن في الأوامر. والوضع التلقائي بيكمّل لوحده في الحاجات الآمنة. ووضع الخطة (Plan mode) بيقرا ويفكّر ويكتب خطة بس، ومن غير ما يلمس حاجة.",
          "Claude Code has modes: the default asks before editing a file or running a command. Accept-edits mode edits without asking, and still asks about commands. Auto mode carries on by itself in safe matters. And Plan mode only reads, thinks and writes a plan, without touching anything."),
        u("مهندس التخطيط بدأ بوضع الخطة، وبعدين الافتراضي. وما فتحش أي وضع أوسع غير بعد ما شاف شغله أسبوع. نفس القاعدة اللي بنستخدمها مع أي زميل جديد: الثقة بتتبني بالتجربة، والصلاحية بتكبر معاها.",
          "The planning engineer started in Plan mode, then the default. He opened no wider mode until he had seen its work for a week. The same rule we use with any new colleague: trust is built by experience, and access grows with it.")],
        answer: u("ابدأ بأضيق صلاحية، ووسّعها بعد ما تشوف الشغل. لأن الصلاحية الواسعة من أول يوم معناها إنك بتوافق على حاجات ما شفتهاش.", "Start with the narrowest access and widen it after you've seen the work — wide access from day one means approving things you haven't seen."),
        idea: u("الصلاحية بتكبر مع الثقة.", "Access grows with trust.")
      },
      {
        id: "plan", art: "cc_plan", year: u("الخطة", "The plan"), mark: u("٠٧", "07"), era: u("Plan mode", "Plan mode"),
        title: u("وضع الخطة: لقى ٣ حاجات قبل ولا سطر كود", "Plan mode: it found 3 things before a line of code"),
        story: [u("مهندس التخطيط لصق الـ Prompt الجاهز من الدرس، وهو في وضع الخطة. Claude Code فتح كل ملف في Data بنفسه، ورجع بخطة من ٦ خطوات، وأولها: «لقيت ٣ حاجات مختلفة عن الوصف: الشيت التالت في ملف الدلتا اسمه September، وفي فاتورة بتاريخ ٣٠ يونيو، والـ PDF فيه رقم بين قوسين».",
          "The planning engineer pasted this lesson's ready Prompt while in Plan mode. Claude Code opened every file in Data itself and came back with a 6-step plan, opening with: “I found 3 things that differ from the description: the third Delta sheet is named September, an invoice is dated 30 June, and a PDF holds a number in brackets.”"),
        u("الحاجات دي في الشات كانت بتطلع بعد كام تشغيل فاشل. هنا طلعت قبل ما يتكتب سطر، لأنه شاف الملفات. ومهندس التخطيط قرا الخطة، ولقى خطوة الاختبار ناقصها مقارنة الـ TOTAL، فكتب: «زوّد مقارنة الإجمالي المطبوع». وبعدين وافق.",
          "In the chat these things surfaced after a few failed runs. Here they surfaced before a line was written, because it saw the files. The planning engineer read the plan, found the test step missing the TOTAL comparison, and wrote: “Add the printed-total comparison.” Then he approved.")],
        answer: u("ابدأ أي مهمة على ملفات حقيقية بوضع الخطة، واقرا الخطة قبل ما توافق. لأن تعديل خطة أسهل بكتير من تصليح أداة.", "Start any task on real files in Plan mode, and read the plan before approving — editing a plan is far easier than fixing a tool."),
        idea: u("شاف الملفات… فلقى المشاكل بدري.", "It saw the files… so it found the problems early.")
      },
      {
        id: "models", art: "cc_models", year: u("الموديلات", "Models"), mark: u("٠٨", "08"), era: u("٤ عائلات", "4 families"),
        title: u("Opus وSonnet وHaiku وFable: كل واحد لشغلة", "Opus, Sonnet, Haiku and Fable: each for a job"),
        story: [u("بالأمر ‎/model بتختار الموديل. Opus 5.5 الافتراضي للمشتركين، للتفكير المعقّد والمهام اللي فيها قرارات. Sonnet 5.5 للشغل اليومي، أسرع وأرخص. Haiku 5.5 الأسرع، للحاجات البسيطة زي تغيير اسم أو تلخيص سجل. وFable 5.1 الأقوى، للمهام الطويلة والغامضة، وبتختاره بنفسك.",
          "With the /model command you choose the model. Opus 5.5 is the default for subscribers, for complex reasoning and tasks full of decisions. Sonnet 5.5 for everyday work, faster and cheaper. Haiku 5.5, the fastest, for simple things such as renaming or summarising a log. And Fable 5.1, the most capable, for long and ambiguous tasks, chosen by you."),
        u("فاكر درس النماذج في الكتاب؟ «الأكبر مش دايمًا الأحسن». مهندس التخطيط بنى أداة المثال التاني بـ Opus، وبعدها لما احتاج يغيّر لون في الرسوم استخدم Haiku. والموديلات دي كمان بتشيل مساحة عمل كبيرة، حوالي مليون توكن، تكفي فولدر المثال كله بسجلاته.",
          "Remember the book's models lesson? “Bigger isn't always better.” The planning engineer built example 2's tool with Opus, then used Haiku when he needed to change a colour in the charts. These models also hold a large workspace, about a million tokens, enough for the whole example folder with its logs.")],
        answer: u("اختار الموديل على قد المهمة: الأقوى للقرارات المعقدة، والأسرع للتعديلات البسيطة. لأن الأقوى في كل حاجة أبطأ وأغلى من غير فايدة.", "Choose the model to fit the task: the most capable for complex decisions, the fastest for simple changes — the most capable for everything is slower and dearer for nothing."),
        idea: u("الموديل على قد الشغلة.", "The model fits the job.")
      },
      {
        id: "effort", art: "cc_effort", year: u("التفكير", "Thinking"), mark: u("٠٩", "09"), era: u("مستويات التفكير", "Levels of thinking"),
        title: u("مستوى التفكير: من low لـ max", "The level of thinking: from low to max"),
        story: [u("غير الموديل، فيه «مستوى التفكير» بالأمر ‎/effort: قد إيه النموذج يفكر قبل ما يرد. low للتعديلات الصغيرة اللي هتراجعها بنفسك. medium الافتراضي في Opus 5.5 وSonnet 5.5 وHaiku 5.5، ويكفي أغلب الشغل. high لما المراجعة مهمة والحالات الغريبة متوقعة.",
          "Besides the model, there's the “level of thinking”, set with /effort: how much the model thinks before replying. low for small changes you'll review yourself. medium, the default on Opus 5.5, Sonnet 5.5 and Haiku 5.5, enough for most work. high when checking matters and odd cases are likely."),
        u("وxhigh تفكير أعمق بتكلفة أكبر. وmax للمشاكل الصعبة جدًا اللي عايزه يشتغل فيها لوحده، وممكن يفكّر زيادة عن اللزوم. مهندس التخطيط بنى أداة المثال بـ high علشان فيها فخاخ، وغيّر الألوان بـ low. وفيه كمان ‎/fast: نفس Opus بردود أسرع.",
          "xhigh is deeper thinking at a higher cost. max is for very hard problems you want it to work through alone, and it may overthink. The planning engineer built the example's tool on high because it has traps, and changed the colours on low. There's also /fast: the same Opus with faster replies.")],
        answer: u("ارفع مستوى التفكير لما الغلطة غالية والحالات كتير، ونزّله للحاجات اللي هتراجعها بعينك. لأن التفكير الزيادة وقت وتكلفة، مش ضمان.", "Raise the level of thinking when a mistake is costly and cases are many, and lower it for things you'll check by eye — extra thinking is time and cost, not a guarantee."),
        idea: u("فكّر على قد الغلطة.", "Think as much as the mistake costs.")
      },
      {
        id: "around", art: "cc_around", year: u("الأدوات", "Tools"), mark: u("١٠", "10"), era: u("حواليه", "Around it"),
        title: u("CLAUDE.md، والمهارات، والمساعدين، والوصلات، والمواعيد", "CLAUDE.md, skills, helpers, connectors and schedules"),
        story: [u("حوالين Claude Code أدوات بتكبّر شغله. CLAUDE.md: قواعد المشروع، بتتقري في كل جلسة. والمهارات: طرق شغل محفوظة لمهام معيّنة، وده الدرس الجاي. والمساعدين (subagents): Claude Code يقدر يقسّم مهمة كبيرة على مساعدين بيشتغلوا مع بعض، كل واحد على جزء.",
          "Around Claude Code sit tools that extend its work. CLAUDE.md: the project's rules, read every session. Skills: saved ways of working for particular tasks, the subject of the next lesson. Helpers (subagents): Claude Code can split a big task among helpers working together, each on a part."),
        u("والوصلات (MCP): بتوصّله بأدوات تانية زي Google Drive أو Jira، لو الشركة سمحت. والمواعيد: مهمة بتتكرر لوحدها، زي «كل أحد الصبح حدّث الداشبورد»، من تطبيق سطح المكتب أو السحابة. كل واحدة من دول بتخلّي شغل اتعمل مرة يتكرر من غيرك.",
          "Connectors (MCP): they link it to other tools such as Google Drive or Jira, if the company allows. And schedules: a task that repeats by itself, such as “every Sunday morning refresh the dashboard”, from the desktop app or the cloud. Each of these lets work done once repeat without you.")],
        answer: u("ابدأ بـ CLAUDE.md والمهارات، وسيب الوصلات والمواعيد لحد ما الشغل يثبت. لأن الأتمتة اللي بتتكرر لوحدها لازم تكون اتجربت كتير قبل كده.", "Start with CLAUDE.md and skills, and leave connectors and schedules until the work is proven — automation that repeats by itself must have been tried many times first."),
        idea: u("كل أداة حواليه… شغل بيتكرر من غيرك.", "Every tool around it… work repeating without you.")
      },
      {
        id: "safe", art: "cc_safe", year: u("الأمان", "Safety"), mark: u("١١", "11"), era: u("٤ قواعد", "4 rules"),
        title: u("النتيجة في ٢٥ دقيقة… وأربع قواعد ما بتتكسرش", "The result in 25 minutes… and four rules that never break"),
        story: [u("بعد الموافقة، Claude Code بنى الأداة، وشغّلها، ووقف لوحده عند القوسين في PDF سبتمبر، وصلّح، وشغّل تاني، وكتب شيت Sources كله OK: ١٤٠ شحنة، و٢٤٬٥٠٢ جهاز. ٢٥ دقيقة، ومهندس التخطيط بيقرا ويوافق بس. وقارن بنفسه بمفتاح الإجابة.",
          "After approval, Claude Code built the tool, ran it, stopped by itself at the brackets in September's PDF, fixed it, ran again, and wrote a Sources sheet all OK: 140 shipments, 24,502 sets. 25 minutes, with the planning engineer only reading and approving. And he compared with the answer key himself."),
        u("وكتب لنفسه ٤ قواعد: اشتغل على نسخة دايمًا. اقرا الخطة قبل الموافقة. ما تحطش ملفات سرية في مستودع على الويب. وراجع النتيجة بنفسك قبل ما تعتمدها، حتى لو Claude Code قال «خلصت والاختبارات عدّت». القرار والمسؤولية لسه عليك.",
          "And he wrote himself 4 rules: always work on a copy. Read the plan before approving. Never put confidential files in a repository on the web. And check the result yourself before relying on it, even when Claude Code says “done, tests passed”. The decision and the responsibility are still yours.")],
        answer: u("استخدم السرعة، بس خلّي المراجعة الأخيرة بتاعتك. لأن المساعد اللي بيشتغل لوحده بيغلط برضه، والفرق إن غلطته بتبقى أسرع.", "Use the speed, but keep the last check yours — an assistant working by itself still makes mistakes; they just come faster."),
        idea: u("أسرع… والمراجعة لسه عليك.", "Faster… and the check is still yours.")
      },
      {
        id: "cliff", art: "cc_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("الشهر الجاي", "Next month"),
        title: u("كل حاجة اشتغلت… طب الشهر الجاي؟", "Everything worked… and next month?"),
        story: [u("في الجلسة دي Claude Code اتعلّم حاجات كتير: إن الدلتا شيت لكل شهر، وإن القوسين سالب، وإن المستهدف بالألف، وإن الـ TOTAL لازم يتقارن. ومهندس التخطيط عارف إن الربع الجاي هيفتح جلسة جديدة، والجلسة الجديدة ما بتفتكرش الجلسة اللي فاتت.",
          "In this session Claude Code learned a lot: that Delta has a sheet per month, that brackets are negative, that the target is in thousands, that the TOTAL must be compared. And the planning engineer knows next quarter he'll open a new session, and a new session doesn't remember the last one."),
        u("وزميله في الإجازة الأسبوع الجاي محتاج يعمل داشبورد الإنتاج. هيشرحله كل حاجة من الأول؟ ولا هيسيبله ٣٤ رسالة يقراها؟ والسؤال اللي الدرس الجاي بيجاوبه: طب إزاي كل اللي اتعلمه ده ما يضيعش المرة الجاية؟",
          "And his colleague covering next week's leave needs to make the production dashboard. Will he explain everything from scratch? Or leave him 34 messages to read? And the question the next lesson answers: so how does everything it learned not get lost next time?")],
        answer: u("واجب الدرس: جرّب Claude Code على نسخة من المثال التاني بوضع الخطة، واقرا الخطة، وجرّب مستويين تفكير، وقارن بالمفتاح. لأن الأداة اللي ما جربتهاش بإيدك ما تعرفش تحكم عليها.", "This lesson's task: try Claude Code on a copy of example 2 in Plan mode, read the plan, try two levels of thinking, and compare with the key — you can't judge a tool you haven't tried yourself."),
        idea: u("الجلسة بتخلص… والطريقة لازم تفضل.", "The session ends… the method must stay.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.codeStory]);
})(window.ACADEMY = window.ACADEMY || {});
