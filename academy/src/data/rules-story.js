/* Skills and the rules files — the story deck of lesson k9, the last deck of unit 4, on Unit4_Starter_Kit.
   The planning engineer of unit 3 carries every slide with one question: «إزاي القواعد دي تتطبق كل مرة من
   غير ما أعيدها؟». The deck turns the unit's rules into a kit: all thirteen rules, CLAUDE.md and AGENTS.md with the same
   text, the trusted-tool skill, its description, its references, Check_Setup.bat, the test in a new session, updating
   the checklist, keeping both files identical, and the security team's verdict; it ends on the file bigger than Excel
   that opens unit 5 (b1). Drawings are the ru_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.rulesStory = {
    id: "rules", lesson: "k9",
    kicker: u("المهارات وملفات القواعد · الحكاية في ٨ دقايق", "Skills and rules files · the story in 8 minutes"),
    title: u("القواعد تتكتب مرة… وتتطبق كل مرة", "Rules written once… applied every time"),
    lead: u("فاكر مهندس المصنع التالت اللي سأل «أبدأ منين؟»؟ في الحكاية دي مهندس التخطيط بيجمع كل قواعد الوحدة في طقم واحد: ملفين قواعد، ومهارة، وملف فحص، علشان أي حد وأي جلسة يشتغلوا بنفس الطريقة.",
      "Remember the third plant's engineer who asked “where do I start?”? In this story the planning engineer gathers every rule of the unit into one kit: two rules files, a skill and a check file, so anyone and any session work the same way."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي القواعد دي تتطبق كل مرة من غير ما أعيدها؟", "How do these rules apply every time without my repeating them?"),
    finalQuestion: u("طب لو جالك ملف أكبر من إكسل نفسه؟", "And what if a file arrives that is bigger than Excel itself?"),
    note: u("طريقة إضافة المهارات في الأدوات ممكن يتغيّر شكلها، لكن الفكرة ثابتة. ملفات الطقم موجودة في الدرس.", "How tools add skills may change in look; the idea stays. The kit's files are in the lesson."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("المهارات وملفات القواعد، في شرائح", "Skills and rules files, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "scattered", art: "ru_scattered", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("قواعد متفرقة", "Scattered rules"),
        title: u("١٢ Prompt… وقاعدة واحدة اتنست", "12 Prompts… and one rule forgotten"),
        story: [u("مهندس المصنع التالت بدأ ينسخ الـ Prompts. في التالت نسي سطر «المكتبة القياسية بس»، فالأداة رجعت لـ pandas. وفي الخامس نسي «اعرض الخطة واستنى»، فالأداة كتبت ٢٠٠ سطر مرة واحدة.",
          "The third plant's engineer started copying the Prompts. In the third he forgot the line “standard library only”, and the tool went back to pandas. In the fifth he forgot “show the plan and wait”, and the tool wrote 200 lines at once."),
        u("ومهندس التخطيط فهم إن المشكلة مش في زميله: القواعد كانت متفرقة في ١٢ Prompt، وجزء منها في ذاكرته هو بس. والسؤال اللي معانا في الحكاية دي: إزاي القواعد دي تتطبق كل مرة من غير ما أعيدها؟",
          "And the planning engineer understood the problem wasn't his colleague: the rules were scattered across 12 Prompts, and some lived only in his own memory. The question we carry in this story: how are these rules applied every time without my repeating them?")],
        answer: u("أي قاعدة لازم تتطبق كل مرة، ما تسيبهاش جوّه Prompt. لأن الـ Prompt ممكن يتنسخ ناقص، والقاعدة الناقصة بترجّع الغلط اللي اتصلّح.", "Any rule that must apply every time shouldn't live inside a Prompt — Prompts get copied incomplete, and a missing rule brings back the mistake that was fixed."),
        idea: u("القاعدة جوّه Prompt… بتتنسي.", "A rule inside a Prompt… gets forgotten.")
      },
      {
        id: "list", art: "ru_list", year: u("القواعد", "The rules"), mark: u("٠٢", "02"), era: u("١٣ قاعدة", "13 rules"),
        title: u("كل الوحدة… في ١٣ قاعدة", "The whole unit… in 13 rules"),
        story: [u("اجتمع مع زميله وكتبوا كل اللي اتعلموه، وقسّموه تلات أجزاء. أولًا إيه اللي يشتغل: PowerShell الأول، وPython النقي، والتأكد إن Python موجودة، ومفيش نت. وتانيًا إزاي نبني: خطوة واحدة والخطة الأول، وData للقراءة، والسجل، والوقفة، وملف التشغيل، وCOM بأمان.",
          "He met his colleague and they wrote down everything they had learned, in three parts. First, what may run: PowerShell first, pure Python, checking Python is there, no internet. Second, how to build: one step and the plan first, Data read-only, the log, the stop, the launcher, COM done safely."),
        u("وتالتًا قبل «خلصت»: شغّل ووريني المراجعات، واشرح كل جزء في سطرين، وادّيني رقم أراجعه بإيدي. ١٣ قاعدة، كل واحدة سطر أو اتنين، ووراها حكاية من الوحدة دي.",
          "Third, before “done”: run it and show me the checks, explain each part in two lines, and give me a figure to check by hand. 13 rules, each one or two lines, and behind each a story from this unit.")],
        answer: u("اكتب قواعدك قصيرة ومتقسمة، كل قاعدة سطر أو اتنين. لأن النموذج بيطبّق القاعدة القصيرة، والفقرة الطويلة ممكن يفهم نصها بس.", "Write your rules short and grouped, each one or two lines — a model applies a short rule; a long paragraph it half understands."),
        idea: u("كل قاعدة… وراها حكاية.", "Every rule… has a story behind it.")
      },
      {
        id: "files", art: "ru_files", year: u("ملفين", "Two files"), mark: u("٠٣", "03"), era: u("لكل أداة ملف", "A file per tool"),
        title: u("CLAUDE.md وAGENTS.md: نفس النص", "CLAUDE.md and AGENTS.md: the same text"),
        story: [u("فاكر ملف القواعد من أول درس؟ Claude Code بيقرا CLAUDE.md أول كل جلسة، وCodex بيقرا AGENTS.md. فحطوا الـ ١٣ قاعدة في الملفين بنفس النص بالظبط، والسطر الأول بس مختلف: بيقول أنهي أداة بتقراه.",
          "Remember the rules file from the first lesson? Claude Code reads CLAUDE.md at the start of every session, and Codex reads AGENTS.md. So they put the 13 rules in both files with exactly the same text; only the first line differs, saying which tool reads it."),
        u("وليه مش ملف واحد؟ لأن كل أداة بتدوّر على اسمها. والأهم إن الاتنين يقولوا نفس الكلام، علشان سواء المصنع استخدم Claude Code أو Codex، الأداة تتبني بنفس الطريقة.",
          "And why not one file? Because each tool looks for its own name. More important, both say the same thing, so whether the plant uses Claude Code or Codex, the tool is built the same way.")],
        answer: u("حط القواعد الدايمة في ملف القواعد بتاع كل أداة، بنفس النص. لأن الملف ده بيتقري أول كل جلسة من غير ما حد يفتكره.", "Put the always-on rules in each tool's rules file, with the same text — that file is read at the start of every session without anyone remembering it."),
        idea: u("أداتين… وقواعد واحدة.", "Two tools… one set of rules.")
      },
      {
        id: "skill", art: "ru_skill", year: u("المهارة", "The skill"), mark: u("٠٤", "04"), era: u("trusted-tool", "trusted-tool"),
        title: u("المهارة: الطريقة نفسها، خطوة بخطوة", "The skill: the method itself, step by step"),
        story: [u("القواعد بتقول «إيه المسموح»، لكن مش بتقول «نبدأ إزاي». فعملوا مهارة اسمها trusted-tool: اقرا README وبص على Data، وقسّم الشغل خطوات واعرضها واستنى، وابني خطوة، وشغّلها، وراجعها بالقايمة، وبعدها اللي بعدها.",
          "The rules say “what is allowed”, but not “how do we start”. So they made a skill named trusted-tool: read the README and look at Data, split the work into steps, show them and wait, build a step, run it, review it with the checklist, then the next."),
        u("فاكر الوحدة التالتة؟ هناك المهارات كانت للمثالين الكبار. هنا المهارة للطريقة نفسها: أي أداة أوفيس أو بيانات، في أي مصنع. وبنفس شكل المهارة: فولدر فيه SKILL.md، وفولدر reference.",
          "Remember unit 3? There the skills were for the two big examples. Here the skill is for the method itself: any Office or data tool, at any plant. And in the same shape: a folder holding SKILL.md and a reference folder.")],
        answer: u("القواعد مكانها ملف القواعد، والطريقة مكانها المهارة. لأن القاعدة لازمة دايمًا، والطريقة محتاجها بس لما تيجي مهمة من النوع ده.", "Rules in the rules file, the method in a skill — a rule is needed always; the method only when that kind of task arrives."),
        idea: u("القاعدة دايمًا… والطريقة وقت المهمة.", "Rules always… the method when the task comes.")
      },
      {
        id: "desc", art: "ru_desc", year: u("الوصف", "Description"), mark: u("٠٥", "05"), era: u("بالكلام اللي هتقوله", "In your own words"),
        title: u("الوصف بالكلام اللي الناس هتطلب بيه", "The description in the words people will ask with"),
        story: [u("أول نسخة من الوصف كانت «مهارة أتمتة». جرّبوا طلب «جمّعلي الأسبوعين واعمل تقرير»، والأداة ما استخدمتهاش. فكتبوا الوصف من جديد: بتبني أداة صغيرة قسم الأمن بيقبلها، PowerShell للأوفيس، وPython النقي للبيانات والـ PDF وSQLite وHTML، خطوة بخطوة.",
          "The first version of the description was “an automation skill”. They tried the request “combine the two weeks and make a report”, and the tool didn't use it. So they wrote the description again: it builds a small tool the security team accepts, PowerShell for Office, pure Python for data, PDF, SQLite and HTML, step by step."),
        u("وفي آخره: «استخدمها لما حد يطلب أتمتة تقرير، أو تجميع ملفات إكسل، أو قراءة PDF لجدول، أو قاعدة بيانات، أو تقرير HTML». وجرّبوا نفس الطلب تاني، والأداة لقت المهارة لوحدها.",
          "And at its end: “Use when someone asks to automate a report, combine Excel files, read a PDF into a table, build a database, or make an HTML report.” They tried the same request again, and the tool found the skill by itself.")],
        answer: u("اكتب وصف المهارة بالكلام اللي الناس هتطلب بيه فعلًا. لأن الوصف هو الحاجة الوحيدة اللي الأداة شايفاها طول الوقت، ومنه بتعرف إمتى تستخدم المهارة.", "Write the skill's description in the words people will really use — the description is the only part the tool sees all the time, and from it, it knows when to use the skill."),
        idea: u("الوصف العام… مهارة محدش بيلاقيها.", "A vague description… a skill nobody finds.")
      },
      {
        id: "refs", art: "ru_refs", year: u("المراجع", "References"), mark: u("٠٦", "06"), era: u("وقت الحاجة", "When needed"),
        title: u("التفاصيل في ملفات مرجع… بتتقري وقت الحاجة", "The details in reference files… read when needed"),
        story: [u("المهارة نفسها قصيرة. والتفاصيل الطويلة في ٣ ملفات reference: powershell-com.md فيه شكل أي سكريبت أوفيس (القراءة بس، والرسايل، وfinally)، وpure-python.md فيه خريطة البدائل، وreview-checklist.md فيه أسئلة المراجعة التسعة.",
          "The skill itself is short. The long details are in 3 reference files: powershell-com.md holds the shape of any Office script (read-only, alerts, finally), pure-python.md holds the map of alternatives, and review-checklist.md holds the nine review questions."),
        u("وليه مش كله في SKILL.md؟ فاكر مساحة العمل من الوحدة الأولى؟ كل كلمة بتتقري بتاخد مكان. الوصف بيتقري دايمًا، والمهارة لما المهمة تيجي، والمرجع لما خطوة تحتاجه. كده المساحة بتفضل للشغل نفسه.",
          "And why not all of it in SKILL.md? Remember the workspace from unit 1? Every word read takes room. The description is read always, the skill when the task comes, and a reference when a step needs it. That way the room stays for the work itself.")],
        answer: u("خلّي SKILL.md قصير، والتفاصيل الطويلة في ملفات مرجع، ووضّح إمتى يتقري كل واحد. لأن مساحة العمل محدودة، والتفاصيل اللي مش محتاجها دلوقتي بتزاحم اللي محتاجه.", "Keep SKILL.md short and the long details in reference files, saying when each is read — the workspace is limited, and details you don't need now crowd out the ones you do."),
        idea: u("الوصف دايمًا… والتفاصيل وقت الحاجة.", "The description always… details when needed.")
      },
      {
        id: "setup", art: "ru_setup", year: u("الفحص", "The check"), mark: u("٠٧", "07"), era: u("Check_Setup.bat", "Check_Setup.bat"),
        title: u("أول حاجة في أي مصنع: الجهاز عليه إيه؟", "First thing at any plant: what's on the machine?"),
        story: [u("فاكر جهاز مشرف الخط اللي ما كانش عليه Python؟ علشان كده ضافوا للطقم ملف Check_Setup.bat. دبل كليك، وبيطبع نسخة PowerShell، ونسخة Python، وسطر بيجرّب sqlite3 وcsv وzipfile وhtml: «OK - SQLite» ورقم النسخة.",
          "Remember the line supervisor's machine that had no Python? That's why they added a Check_Setup.bat file to the kit. A double-click, and it prints the PowerShell version, the Python version, and a line that tries sqlite3, csv, zipfile and html: “OK - SQLite” and its version."),
        u("ولو Python مش موجودة، أو الأمر فتح Microsoft Store، الملف بيقول: «اطلب Python المعتمدة من الـ IT، وما تنزّلهاش بنفسك». ومهندس المصنع التالت شغّله وطلع: PowerShell 5.1، وPython 3.12، وOK. يعني جاهز.",
          "And if Python is missing, or the command opens the Microsoft Store, the file says: “Ask IT for the approved Python; don't download it yourself.” The third plant's engineer ran it and got: PowerShell 5.1, Python 3.12 and OK. Ready.")],
        answer: u("ابدأ أي شغل على جهاز جديد بفحص اللي عليه. لأن أول غلطة في أي مصنع جديد إنك تفترض إن جهازهم زي جهازك.", "Start any work on a new machine by checking what it has — the first mistake at any new plant is assuming its machine is like yours."),
        idea: u("جهازهم مش جهازك… افحصه.", "Their machine isn't yours… check.")
      },
      {
        id: "test", art: "ru_test", year: u("الاختبار", "The test"), mark: u("٠٨", "08"), era: u("جلسة جديدة", "A new session"),
        title: u("جلسة جديدة… ومن غير أي شرح", "A new session… and no explanation"),
        story: [u("الاختبار الحقيقي: مهندس المصنع التالت نسخ الطقم لفولدر المثال الأول، وفتح Codex، وكتب جملة واحدة: «ابنيلي أداة للمثال ده»، من غير ولا قاعدة في الطلب.",
          "The real test: the third plant's engineer copied the kit into the first example's folder, opened Codex and wrote one sentence: “build me a tool for this example”, without a single rule in the request."),
        u("Codex قرا AGENTS.md ورد: «هقسّمها ٥ خطوات: تحت بعض، واسم البلد، والتقرير بـ PowerShell، والمراجعة، والقاعدة بـ Python من المكتبة القياسية بس. دي الخطة للخطوة ١… أكمّل؟»، واستنى.",
          "Codex read AGENTS.md and replied: “I'll split it into 5 steps: stacking, the country name and the report with PowerShell, the review, and the database with Python's standard library only. Here is the plan for step 1… shall I go on?”, and waited.")],
        answer: u("اختبر الطقم في جلسة جديدة بطلب من غير أي قاعدة. لأن لو الأداة مشيت على القواعد من غير ما تقولها، يبقى الطقم شغال فعلًا.", "Test the kit in a new session with a request holding no rules — if the tool follows the rules without being told, the kit really works."),
        idea: u("لو اشتغلت من غير شرح… الطقم جاهز.", "If it works unexplained… the kit is ready.")
      },
      {
        id: "update", art: "ru_update", year: u("التحديث", "Updating"), mark: u("٠٩", "09"), era: u("كل غلطة بتبقى سطر", "Every mistake becomes a line"),
        title: u("كل غلطة اتكشفت… بقت سطر في القايمة", "Every mistake caught… became a line in the list"),
        story: [u("فاكر «الكويت ٨»؟ المراجعة كانت سبع أسئلة، لكن الغلطة دي علّمتهم حاجة جديدة: لما يكون فيه جدول بالبلاد، لازم مجموعه يساوي الإجمالي. فزوّدوا سطر للقايمة: «مجموع كل جدول يتكتب في السجل ويتقارن بالإجمالي».",
          "Remember “Kuwait 8”? The review had seven questions, but that mistake taught them something new: when there is a table of countries, its sum must equal the total. So they added a line to the list: “every table's sum is written in the log and compared with the total”."),
        u("وكمان سطر من درس COM: «بعد التشغيل، Task Manager ما يكونش فيه EXCEL.EXE». فبقت تسعة. والطقم مش ملف بيتكتب مرة ويتنسي: كل غلطة بتتكشف بتبقى سطر، علشان الأداة الجاية ما تقعش فيها.",
          "And a line from the COM lesson: “after a run, Task Manager shows no EXCEL.EXE”. So it became nine. The kit isn't a file written once and forgotten: every mistake caught becomes a line, so the next tool doesn't fall into it.")],
        answer: u("كل غلطة تتكشف في مراجعة، حوّلها لسطر في القايمة أو في القواعد. لأن الغلطة اللي ما اتكتبتش هتتكرر في الأداة الجاية.", "Turn every mistake caught in a review into a line in the checklist or the rules — a mistake left unwritten repeats in the next tool."),
        idea: u("الغلطة اللي اتكتبت… ما بتتكررش.", "A mistake written down… doesn't repeat.")
      },
      {
        id: "same", art: "ru_same", year: u("النسختين", "Both copies"), mark: u("١٠", "10"), era: u("ما يختلفوش", "Never drifting"),
        title: u("لما تعدّل قاعدة… عدّلها في الملفين", "When you change a rule… change it in both files"),
        story: [u("بعد شهر، مهندس عدّل CLAUDE.md وزوّد قاعدة: «اكتب التاريخ yyyy-mm-dd»، ونسي AGENTS.md. فالمصنع اللي بيستخدم Codex فضل يكتب التاريخ بشكل تاني، والتقارير بين المصنعين بقت مش متطابقة.",
          "A month later, an engineer edited CLAUDE.md and added a rule: “write dates as yyyy-mm-dd”, and forgot AGENTS.md. The plant using Codex kept writing dates another way, and the reports of the two plants no longer matched."),
        u("والحل إن أي تعديل يتعمل في الملفين مع بعض، ويتراجع بمقارنة سريعة: الملفين لازم يكونوا نفس النص ما عدا أول سطر. والأحسن يتحفظوا على GitHub، علشان كل تعديل يبان مين عمله وإمتى.",
          "The fix: every change is made in both files together, and checked with a quick comparison: the two files must hold the same text except the first line. Better still, keep them on GitHub, so every change shows who made it and when.")],
        answer: u("خلّي ملفي القواعد نسخة واحدة، وأي تعديل يتعمل في الاتنين مع بعض. لأن الملفين لو اختلفوا، الأداتين هيبنوا بطريقتين، والأرقام هتختلف.", "Keep the two rules files one copy, and make every change in both together — if they differ, the two tools build two ways, and the figures differ."),
        idea: u("ملفين… نسخة واحدة.", "Two files… one copy.")
      },
      {
        id: "verdict", art: "ru_verdict", year: u("قسم الأمن", "Security"), mark: u("١١", "11"), era: u("الإجابة", "The answer"),
        title: u("قسم الأمن قرا ملف واحد… ووافق", "The security team read one file… and approved"),
        story: [u("مهندس التخطيط بعت الطقم لقسم الأمن، ومعاه أدوات المثالين. والمسؤول فتح AGENTS.md وقرا: «PowerShell الأول، المكتبة القياسية بس، ممنوع pip، ممنوع النت، Data للقراءة بس، سجل، ومراجعة بالإيد». ودي إجابة سؤاله الأول.",
          "The planning engineer sent the kit to the security team, with the two examples' tools. The officer opened AGENTS.md and read: “PowerShell first, the standard library only, no pip, no internet, Data read-only, a log, a check by hand.” That is the answer to his first question."),
        u("وسؤاله التاني «مين راجعه وإزاي؟» إجابته في review-checklist.md، وفي السجل اللي جنب كل أداة. ووافق إن الأدوات تتنقل للمصانع التانية. والسؤالين اللي في آخر الوحدة التالتة اتجاوبوا بملفات، مش بكلام.",
          "His second question, “who reviewed it, and how?”, is answered in review-checklist.md and in the log beside every tool. He approved moving the tools to the other plants. The two questions at the end of unit 3 were answered with files, not words.")],
        answer: u("خلّي قواعد أدواتك مكتوبة في ملف أي حد يقدر يراجعه. لأن قسم الأمن بيوافق على اللي يقدر يقراه ويتأكد منه، مش على الوعود.", "Keep your tools' rules written in a file anyone can review — a security team approves what it can read and verify, not promises."),
        idea: u("الإجابة في ملف… مش في كلام.", "The answer in a file… not in words.")
      },
      {
        id: "cliff", art: "ru_cliff", year: u("الوحدة الجاية", "Next unit"), mark: u("١٢", "12"), era: u("ملف الإدارة", "Head office's file"),
        title: u("الأدوات اتعمّمت… لحد ما وصل ملف الإدارة", "The tools spread… until management's file arrived"),
        story: [u("في ديسمبر، الطقم بقى في ٣ مصانع، والأدوات بتشتغل بضغطة، وقسم الأمن مطمّن. لحد ما وصل ملف من نظام الإدارة: كل نتايج محطات الفحص للربع، ٣٠٠ ألف صف، وخلايا مدموجة في العناوين، وتواريخ مكتوبة كنص. والمطلوب يدخل في التقرير.",
          "In December the kit is at 3 plants, the tools run in one click, and the security team is at ease. Then a file arrived from the management system: every result of the inspection stations for the quarter, 300 thousand rows, merged cells in the headers, and dates written as text. It must go into the report."),
        u("الأداة عملت الصح ووقفت برسالة واضحة. لكن المرة دي إكسل نفسه وقف عند ٧٠٪ برسالة «لا يستجيب». إكسل معمول للجداول اللي بتشوفها بعينك، مش لمئات الآلاف من الصفوف. ومن هنا بتبدأ الوحدة الجاية: طب لو جالك ملف أكبر من إكسل نفسه؟",
          "The tool did the right thing and stopped with a clear message. But this time Excel itself froze at 70% with “Not responding”. Excel is made for tables you see with your eyes, not for hundreds of thousands of rows. And here the next unit begins: what if a file arrives that is bigger than Excel itself?")],
        answer: u("واجب الوحدة: نزّل طقم البداية، وشغّل Check_Setup.bat، وحطه في فولدر مثال، واطلب أداة في جلسة جديدة من غير قواعد، واكتب نسخة لشغلك إنت. والأدوات الجاهزة في فولدر Ready_Tool في كل مثال هي النسخة المكتملة اللي تقارن بيها.", "The unit's homework: download the starter kit, run Check_Setup.bat, put it in an example's folder, ask for a tool in a new session with no rules, and write a version for your own work. The ready tools in each example's Ready_Tool folder are the finished version to compare with."),
        idea: u("إكسل معمول علشان تشوف البيانات… مش علشان يشيلها كلها.", "Excel is made for seeing data… not for holding all of it.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.rulesStory]);
})(window.ACADEMY = window.ACADEMY || {});
