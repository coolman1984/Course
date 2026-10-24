/* Skills — the story deck of lesson a6 (unit 3), on Unit3_Skills_Kit. The last deck of unit 3.
   The planning engineer carries every slide with one question: «إزاي الشغل اللي نجح مرة يتكرر بنفس الجودة كل مرة؟».
   The deck turns both examples into skills: what a skill is, the description, steps, rules and checks, reference files
   read on demand, scripts, where skills live, the kit's three skills, skill against CLAUDE.md and Prompt, the test in a
   new session, skills that act only on command; and it ends on the file bigger than Excel that opens unit 4.
   Drawings are the sk_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.skillStory = {
    id: "skillset", lesson: "a6",
    kicker: u("المهارات · الحكاية في ٨ دقايق", "Skills · the story in 8 minutes"),
    title: u("الشغل اللي نجح… يتكرر بأمر واحد", "Work that succeeded… repeats with one command"),
    lead: u("المثالين اشتغلوا، وClaude Code اتعلّم فيهم كل الفخاخ. في الحكاية دي مهندس التخطيط بيحوّل كل ده لمهارات: فولدرات صغيرة بتخلّي الشغل يتكرر بنفس الجودة، عنده وعند أي زميل.",
      "Both examples work, and Claude Code learned every trap in them. In this story the planning engineer turns all of it into skills: small folders that make the work repeat with the same quality, for him and for any colleague."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي الشغل اللي نجح مرة يتكرر بنفس الجودة كل مرة؟", "How does work that succeeded once repeat with the same quality every time?"),
    finalQuestion: u("طب لو جالك ملف أكبر من إكسل نفسه؟", "And what if a file arrives that is bigger than Excel itself?"),
    note: u("طريقة رفع المهارات في التطبيق ممكن تتغيّر شكلها؛ الفكرة نفسها ثابتة. ملفات المهارات في طقم الدرس.", "How skills are uploaded in the app may change in look; the idea itself stays. The skill files are in this lesson's kit."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("المهارات، في شرائح", "Skills, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "lost", art: "sk_lost", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("المحادثة القديمة", "The old chat"),
        title: u("ملفات أكتوبر وصلت… والطريقة في محادثة قديمة", "October's files arrived… and the method is in an old chat"),
        story: [u("أول نوفمبر، تصديرات أكتوبر وصلت، ومهندس التخطيط عنده إجازة. زميله لازم يحدّث داشبورد الإنتاج. فتح Claude Code وكتب: «حدّث الداشبورد». Claude سأل: «أنهي داشبورد؟ الملفات شكلها إيه؟ القواعد إيه؟». كل اللي اتعلمناه في الربع التالت كان في جلسة قفلت.",
          "Early November, October's exports arrived, and the planning engineer is on leave. His colleague must refresh the production dashboard. He opened Claude Code and wrote: “Refresh the dashboard.” Claude asked: “Which dashboard? What do the files look like? What are the rules?” Everything learned in the third quarter was in a session that had closed."),
        u("الزميل اتصل بمهندس التخطيط في إجازته، واتكلموا نص ساعة على التليفون: صف العناوين، والملف المتكرر، والسوق الفاضي. والسؤال اللي ماشي معانا: إزاي الشغل اللي نجح مرة يتكرر بنفس الجودة كل مرة؟",
          "The colleague phoned the planning engineer on his leave, and they spent half an hour on the line: the header row, the repeated file, the blank market. The question we carry: how does work that succeeded once repeat with the same quality every time?")],
        answer: u("أي طريقة شغل نجحت واتراجعت، احفظها في مكان يتقري، مش في محادثة. لأن المحادثة بتخلص، والطريقة لازم تفضل.", "Any way of working that succeeded and was checked, keep it somewhere readable, not in a chat — chats end; methods must stay."),
        idea: u("اللي في المحادثة… بيضيع معاها.", "What's in the chat… is lost with it.")
      },
      {
        id: "what", art: "sk_what", year: u("المهارة", "The skill"), mark: u("٠٢", "02"), era: u("فولدر صغير", "A small folder"),
        title: u("المهارة: فولدر فيه ملف SKILL.md", "A skill: a folder holding a SKILL.md file"),
        story: [u("المهارة (Skill) فولدر صغير جوّه ‎.claude\\skills. جواه ملف اسمه SKILL.md، أوله سطرين بين علامتين ---: name واسم المهارة، وdescription بيقول بتعمل إيه وإمتى. وبعدهم الخطوات والقواعد والمراجعات، بلغة عادية زي ما بتشرح لزميل.",
          "A skill is a small folder inside .claude\\skills. It holds a file named SKILL.md whose first two lines sit between two --- marks: name, the skill's name, and description, saying what it does and when. Then come the steps, rules and checks, in plain language, as you'd explain to a colleague."),
        u("فاكر بطاقة الوكيل في الكتاب؟ هدف، وخطوات، وحدود، ومراجعة. المهارة نفس الفكرة، بس Claude بيقراها ويشتغل بيها. ولما تطلب «حدّث داشبورد الإنتاج»، بيلاقي المهارة اللي وصفها بيقول كده، ويفتحها، ويمشي على خطواتها.",
          "Remember the book's agent card? A goal, steps, limits and a check. A skill is the same idea, only Claude reads it and works by it. When you ask “refresh the production dashboard”, it finds the skill whose description says so, opens it and follows its steps.")],
        answer: u("اكتب المهارة زي ما تكتب تعليمات لزميل جديد: إمتى، وإزاي، وإيه الممنوع، وإزاي تتأكد. لأن المهارة اللي زميل يفهمها، Claude يفهمها.", "Write a skill as you would instructions for a new colleague: when, how, what's forbidden, how to check — a skill a colleague understands, Claude understands."),
        idea: u("المهارة… تعليمات زميل جديد.", "A skill… a new colleague's instructions.")
      },
      {
        id: "desc", art: "sk_desc", year: u("الوصف", "The description"), mark: u("٠٣", "03"), era: u("أهم سطر", "The key line"),
        title: u("الوصف: السطر الوحيد اللي Claude شايفه طول الوقت", "The description: the only line Claude sees all the time"),
        story: [u("أول مسودة كان وصفها: «مهارة إكسل». الزميل كتب «حدّث داشبورد الإنتاج»، وClaude ما استخدمهاش. ليه؟ لأن «مهارة إكسل» ما بتقولش بتعمل إيه ولا إمتى. وClaude ما بيقراش المهارة كلها علشان يقرر؛ بيقرا الوصف بس.",
          "The first draft's description read: “an Excel skill”. The colleague wrote “refresh the production dashboard”, and Claude didn't use it. Why? Because “an Excel skill” says neither what it does nor when. And Claude doesn't read the whole skill to decide; it reads the description only."),
        u("الوصف الجديد: «بيبني جدول الإنتاج الربعي والداشبورد من التصديرات الأسبوعية Confirmations_Wnn.xlsx وMasters.xlsx. استخدمه لما حد يطلب يحدّث أو يبني أو يراجع داشبورد الإنتاج، أو لما تصديرات أسبوعية جديدة توصل». الزميل جرّب تاني، وClaude لقاها على طول.",
          "The new description: “Builds the quarterly production table and Excel dashboard from the weekly exports Confirmations_Wnn.xlsx and Masters.xlsx. Use when asked to refresh, rebuild or check the production dashboard, or when new weekly exports arrive.” The colleague tried again, and Claude found it straight away.")],
        answer: u("اكتب في الوصف المهارة بتعمل إيه، وإمتى، وأسماء الملفات، بالكلام اللي الناس هتقوله فعلًا. لأن الوصف هو اللي بيخلّي Claude يلاقي المهارة أصلًا.", "Write in the description what the skill does, when, and the file names, in the words people will actually use — the description is what lets Claude find the skill at all."),
        idea: u("وصف واضح… المهارة تتلاقي.", "A clear description… the skill gets found.")
      },
      {
        id: "body", art: "sk_body", year: u("الخطوات", "Steps"), mark: u("٠٤", "04"), era: u("جوّه SKILL.md", "Inside SKILL.md"),
        title: u("جوّه SKILL.md: الخطوات، والقواعد، والمراجعات", "Inside SKILL.md: the steps, the rules and the checks"),
        story: [u("بعد الوصف، مهارة production-dashboard فيها ٤ أجزاء قصيرة: المدخلات (الملفات وفين صف العناوين)، والخطوة ١ (الجدول وقواعده: Prod Order فريد، والسوق الفاضي، واللي ما لقاش اسم)، والخطوة ٢ (الداشبورد)، و«قبل ما تقول خلصت»: شغّل كل المراجعات واكتب نتيجتها في السجل.",
          "After the description, the production-dashboard skill holds 4 short parts: the inputs (the files and where the header row is), step 1 (the table and its rules: Prod Order unique, the blank market, codes with no name), step 2 (the dashboard), and “before you say it's done”: run every check and write its result in the log."),
        u("كل قاعدة في المهارة جت من حاجة حصلت فعلًا في الربع التالت: الملف المتكرر، والكارت اللي ساب ٥٥٦ جهاز. ومفيش ولا سطر فيها جه من تخمين. علشان كده المهارة الكويسة بتتكتب بعد ما الشغل ينجح، مش قبله.",
          "Every rule in the skill came from something that really happened in the third quarter: the repeated file, the card that left out 556 sets. Not a single line came from guesswork. That's why a good skill is written after the work succeeds, not before.")],
        answer: u("حط في المهارة القواعد اللي اتعلمتها من التجربة، والمراجعات اللي لازم تعدّي. لأن المهارة اللي بتقول «خلصت» من غير مراجعة بتكرر الغلط بسرعة.", "Put in the skill the rules learned from experience and the checks that must pass — a skill that says “done” without checking repeats mistakes quickly."),
        idea: u("كل قاعدة… جت من تجربة.", "Every rule… came from experience.")
      },
      {
        id: "refs", art: "sk_refs", year: u("المراجع", "References"), mark: u("٠٥", "05"), era: u("وقت الحاجة", "When needed"),
        title: u("التفاصيل الطويلة في reference… وبتتقري وقت الحاجة", "The long details in reference… read only when needed"),
        story: [u("دليل البيانات، ومواصفة الداشبورد، والخمس مراجعات طوال. لو اتحطوا كلهم في SKILL.md هيبقى طويل وصعب يتقري. فاتحطوا في فولدر reference جنبه: data-dictionary.md وdashboard-spec.md وchecks.md. وSKILL.md بيقول: «قبل أي تعديل اقرا دليل البيانات».",
          "The data dictionary, the dashboard specification and the five checks are long. Put all of them in SKILL.md and it becomes long and hard to read. So they went into a reference folder beside it: data-dictionary.md, dashboard-spec.md and checks.md. And SKILL.md says: “Before any change, read the data dictionary.”"),
        u("والميزة الأهم: Claude بيقرا الوصف بس طول الوقت، والمهارة نفسها لما تتستخدم، وملفات reference لما الخطوة تحتاجها. فاكر ليه مساحة العمل محدودة؟ علشان كده تقدر يبقى عندك عشرات المهارات، ومساحة العمل فاضية للشغل نفسه.",
          "And the bigger advantage: Claude reads only the description all the time, the skill itself when it's used, and the reference files when a step needs them. Remember why the workspace is limited? That's why you can hold dozens of skills while the workspace stays free for the work itself.")],
        answer: u("خلّي SKILL.md قصير، وابعت التفاصيل الطويلة لملفات reference وقول إمتى تتقري. لأن اللي بيتقري وقت الحاجة بس ما بيزحمش مساحة العمل.", "Keep SKILL.md short, send long details to reference files, and say when to read them — what's read only when needed doesn't crowd the workspace."),
        idea: u("الوصف دايمًا… والتفاصيل وقت الحاجة.", "The description always… details when needed.")
      },
      {
        id: "scripts", art: "sk_scripts", year: u("السكريبتات", "Scripts"), mark: u("٠٦", "06"), era: u("أدوات اشتغلت", "Tools that worked"),
        title: u("السكريبتات اللي اشتغلت تتحط في scripts", "The scripts that worked go into scripts"),
        story: [u("أداة المثال الأول اشتغلت واتراجعت. ليه Claude يكتبها من الأول كل ربع، ويمكن يكتبها بشكل مختلف؟ فمهندس التخطيط حط السكريبتين في فولدر scripts جوّه المهارة، وكتب في SKILL.md: «شغّل scripts/build_table.ps1، وبعدين build_dashboard.ps1».",
          "Example 1's tool worked and was checked. Why should Claude rewrite it every quarter, maybe differently? So the planning engineer put the two scripts in a scripts folder inside the skill, and wrote in SKILL.md: “Run scripts/build_table.ps1, then build_dashboard.ps1.”"),
        u("كده المهارة فيها الاتنين: الطريقة (إمتى وليه وإزاي تتأكد) والأداة نفسها اللي اتجربت. ولو حاجة في الملفات اتغيّرت، Claude بيعدّل السكريبت بنسخة جديدة، ويشغّل المراجعات، ويحفظ النسخة الجديدة جنب القديمة.",
          "So the skill holds both: the method (when, why and how to check) and the tool itself, already tried. If something in the files changes, Claude edits the script into a new version, runs the checks, and saves the new version beside the old one.")],
        answer: u("حط الأداة اللي اشتغلت جوّه المهارة بدل ما تتكتب من الأول كل مرة. لأن الكود اللي اتجرّب أثبت من كود جديد كل ربع.", "Put the tool that worked inside the skill instead of having it rewritten every time — tried code is steadier than new code every quarter."),
        idea: u("الطريقة والأداة… في فولدر واحد.", "The method and the tool… in one folder.")
      },
      {
        id: "where", art: "sk_where", year: u("المكان", "Where"), mark: u("٠٧", "07"), era: u("٣ أماكن", "3 places"),
        title: u("المشروع، أو الجهاز، أو حسابك", "The project, the machine, or your account"),
        story: [u("المهارة ليها ٣ أماكن. جوّه فولدر المشروع في ‎.claude\\skills: للمشروع ده بس، وأي حد بياخد الفولدر بياخدها معاه. أو في فولدر المستخدم على جهازك: لكل مشاريعك. أو تترفع على حسابك في Claude: فتشتغل على الويب وفي الجلسات اللي على السحابة.",
          "A skill has 3 places. Inside the project folder in .claude\\skills: for this project only, and anyone who takes the folder takes it too. Or in your user folder on the laptop: for all your projects. Or uploaded to your Claude account: so it works on the web and in cloud sessions."),
        u("مهندس التخطيط حط مهارتين المثالين جوّه فولدر المشروع، علشان مربوطين بملفاته. وحط مهارة قواعد الأمان في فولدر المستخدم، علشان تشتغل مع أي أداة أوفيس في أي مشروع. والزميل لما أخد فولدر المشروع، المهارتين كانوا معاه.",
          "The planning engineer put the two examples' skills inside the project folder, because they're tied to its files. And he put the safety-rules skill in his user folder, so it works with any Office tool in any project. When his colleague took the project folder, both skills came with it.")],
        answer: u("المهارة الخاصة بمشروع جوّه المشروع، والعامة في جهازك أو حسابك. لأن مكان المهارة بيحدد مين يستخدمها وإمتى.", "A project's own skill goes inside the project; a general one on your machine or account — where a skill lives decides who uses it and when."),
        idea: u("المكان بيحدد مين يستخدمها.", "Its place decides who uses it.")
      },
      {
        id: "kit", art: "sk_kit", year: u("الطقم", "The kit"), mark: u("٠٨", "08"), era: u("٣ مهارات", "3 skills"),
        title: u("طقم الدرس: ٣ مهارات بتشتغل مع بعض", "The lesson's kit: 3 skills working together"),
        story: [u("الطقم اللي تنزّله فيه ٣ مهارات. safe-office-automation: القواعد السبعة لأي أداة بتفتح ملفات أوفيس: اقرا بس، واكتب في Output، وسجّل، ووقّف، واقفل البرامج. production-dashboard: المثال الأول. وcommercial-review-pack: المثال التاني.",
          "The kit you download holds 3 skills. safe-office-automation: the seven rules for any tool that opens Office files: read only, write to Output, log, stop, close the programs. production-dashboard: example 1. And commercial-review-pack: example 2."),
        u("والمهارتين التانيين أول سطر فيهم: «اتبع قواعد safe-office-automation الأول». يعني قواعد الأمان مكتوبة مرة واحدة، وكل مهارة بتستخدمها. ولو قاعدة أمان اتغيّرت، بتتغيّر في مكان واحد، وكل المهارات بتمشي عليها.",
          "And the first line of the other two skills reads: “Follow the safe-office-automation rules first.” So the safety rules are written once, and every skill uses them. If a safety rule changes, it changes in one place, and every skill follows it.")],
        answer: u("حط القواعد المشتركة في مهارة لوحدها، والمهارات التانية تشاور عليها. لأن القاعدة المكتوبة في مكان واحد ما بتتناقضش مع نفسها.", "Put shared rules in a skill of their own, and have the other skills point to it — a rule written in one place never contradicts itself."),
        idea: u("قواعد الأمان مرة… وكل المهارات تستخدمها.", "Safety rules once… every skill uses them.")
      },
      {
        id: "which", art: "sk_which", year: u("الفرق", "The difference"), mark: u("٠٩", "09"), era: u("مهارة ولا CLAUDE.md؟", "Skill or CLAUDE.md?"),
        title: u("Prompt، ومهارة، وCLAUDE.md: كل واحد إمتى؟", "A Prompt, a skill and CLAUDE.md: when each?"),
        story: [u("مهندس التخطيط كان محتار: «ما تعدّلش أي ملف في Data» أكتبها فين؟ القاعدة: CLAUDE.md للحاجات اللي لازم تتطبق في كل جلسة في المشروع، وبيتقري في أول كل جلسة. فالقاعدة دي مكانها هناك، مش في مهارة ممكن ما تتفتحش.",
          "The planning engineer was unsure: where should “never edit any file in Data” go? The rule: CLAUDE.md holds what must apply in every session of the project, and is read at the start of each. So that rule belongs there, not in a skill that might not open."),
        u("والمهارة لطريقة شغل لمهمة معيّنة بتتكرر: «حدّث داشبورد الإنتاج». بتتقري لما المهمة تيجي. والـ Prompt لطلب مرة واحدة: «غيّر لون الرسم ده». تلات أدوات، كل واحدة ليها مكان، والخلط بينهم بيخلّي الحاجة يا تتقري كل مرة من غير لازمة، يا ما تتقريش لما تلزم.",
          "A skill is for the way of working on one recurring task: “refresh the production dashboard”. It's read when the task arrives. And a Prompt is for a one-time request: “change this chart's colour”. Three tools, each with its place; mixing them means something is either read every time for nothing, or not read when needed.")],
        answer: u("قاعدة دايمة في CLAUDE.md، وطريقة مهمة بتتكرر في مهارة، وطلب مرة واحدة في Prompt. لأن كل واحد بيتقري في وقت مختلف.", "An always-on rule in CLAUDE.md, the method for a recurring task in a skill, a one-time request in a Prompt — each is read at a different time."),
        idea: u("دايمًا، ولما المهمة تيجي، ومرة واحدة.", "Always, when the task comes, and once.")
      },
      {
        id: "test", art: "sk_test", year: u("التجربة", "The test"), mark: u("١٠", "10"), era: u("جلسة جديدة", "A new session"),
        title: u("الاختبار الحقيقي: جلسة جديدة، ومن غير شرح", "The real test: a new session, with no explanation"),
        story: [u("بعد ما رجع من الإجازة، مهندس التخطيط اختبر المهارات زي ما بيختبر أي أداة. فتح جلسة جديدة على نسخة فيها ملفات أكتوبر، وكتب جملة واحدة من غير اسم المهارة: «حدّث داشبورد الإنتاج من ملفات الأسبوع الجديدة». وما شرحش حاجة.",
          "Back from leave, the planning engineer tested the skills as he tests any tool. He opened a new session on a copy holding October's files, and wrote one sentence without naming the skill: “Refresh the production dashboard from the new weekly files.” And he explained nothing."),
        u("Claude لقى production-dashboard، وقرا قواعد الأمان، وشغّل السكريبتين، ووقف عند كود جديد في Unmatched، وكتب نتيجة الخمس مراجعات في آخر السجل. وجرّب كمان ‎/production-dashboard بالاسم: نفس النتيجة. المهارة شغالة لوحدها، يبقى الوصف والخطوات كافيين.",
          "Claude found production-dashboard, read the safety rules, ran the two scripts, listed a new code on Unmatched, and wrote the result of the five checks at the end of the log. He also tried /production-dashboard by name: the same result. The skill works by itself, so the description and steps are enough.")],
        answer: u("اختبر المهارة في جلسة جديدة، بكلام عادي، من غير ما تشرح. لأن لو احتاجت شرح، يبقى في حاجة ناقصة في الوصف أو الخطوات.", "Test a skill in a new session, in plain words, without explaining — if it needs explaining, something is missing from its description or steps."),
        idea: u("لو اشتغلت من غير شرح… جاهزة.", "If it works unexplained… it's ready.")
      },
      {
        id: "command", art: "sk_command", year: u("الحدود", "Limits"), mark: u("١١", "11"), era: u("بأمرك بس", "On command only"),
        title: u("المهارة اللي بتبعت أو بتمسح… بأمرك بس", "A skill that sends or deletes… on your command only"),
        story: [u("المدير التجاري طلب مهارة تبعت العرض بالإيميل للإدارة بعد ما يتعمل. مهندس التخطيط كتبها، بس زوّد في أولها سطر disable-model-invocation: true. معناه إن Claude ما يشغّلهاش لوحده أبدًا حتى لو الكلام طابق الوصف؛ بتشتغل بس لما حد يكتب اسمها بنفسه.",
          "The commercial director asked for a skill that e-mails the deck to management once it's made. The planning engineer wrote it, but added at its top the line disable-model-invocation: true. It means Claude never runs it by itself, even when the words match the description; it runs only when someone types its name."),
        u("ليه؟ لأن الإرسال ما بيترجعش. مهارة بتبني جدول ممكن تتشغّل لوحدها وتتراجع، لكن مهارة بتبعت أو بتمسح أو بتنشر لازم الإنسان يقرر يشغّلها. وده نفس مبدأ «أقل صلاحية ممكنة» في ضوابط الفريق الرقمي في الكتاب.",
          "Why? Because sending can't be undone. A skill that builds a table may run by itself and be checked, but a skill that sends, deletes or publishes must be started by a person's decision. That's the same principle of “least possible access” in the book's digital-team controls.")],
        answer: u("أي مهارة بتعمل حاجة ما بترجعش (إرسال، مسح، نشر) خلّيها تشتغل بأمرك بس. لأن الغلطة اللي اتبعتت ما بتتصلّحش بتشغيل تاني.", "Any skill that does something irreversible (sending, deleting, publishing) should run on your command only — a mistake that's been sent isn't fixed by running again."),
        idea: u("اللي ما بيرجعش… بأمرك إنت.", "What can't be undone… on your command.")
      },
      {
        id: "cliff", art: "sk_cliff", year: u("الوحدة الجاية", "Next unit"), mark: u("١٢", "12"), era: u("ملف الإدارة", "Head office's file"),
        title: u("كل حاجة بتتكرر… لحد ما وصل ملف الإدارة", "Everything repeats… until head office's file arrived"),
        story: [u("ديسمبر: ٣ مهارات شغالة، والداشبورد بيتحدّث في ٥ دقايق، والمراجعة التجارية في ٢٠. لحد ما وصل ملف من نظام الإدارة: كل نتايج محطات الفحص للربع، ٣٠٠ ألف صف، وخلايا مدموجة في العناوين، وتواريخ مكتوبة كنص. والمطلوب ينضم للمراجعة.",
          "December: 3 skills running, the dashboard refreshing in 5 minutes, the commercial review in 20. Until a file arrived from the management system: every test-station result for the quarter, 300,000 rows, merged cells in the headers, dates typed as text. And it was to join the review."),
        u("الأداة عملت الصح ووقفت برسالة واضحة. بس المرة دي إكسل نفسه وقف عند ٧٠٪ ورسالة «لا يستجيب». إكسل اتعمل للجداول اللي بتشوفها بعينك، مش لمئات الآلاف من الصفوف. والسؤال اللي الوحدة الجاية بتبدأ بيه: طب لو جالك ملف أكبر من إكسل نفسه؟",
          "The tool did the right thing and stopped with a clear message. But this time Excel itself froze at 70% with “Not responding”. Excel was built for tables you look at, not for hundreds of thousands of rows. And the question the next unit opens with: what if a file arrives that is bigger than Excel itself?")],
        answer: u("واجب الوحدة: نزّل طقم المهارات، وحطه في فولدر المثالين، واختبره في جلسة جديدة، واكتب مهارتك الأولى لشغلك. لأن الشغل اللي بقى مهارة هو الشغل اللي بقى بتاع الفريق كله.", "This unit's task: download the skills kit, put it in the examples' folder, test it in a new session, and write your first skill for your own work — work that became a skill became the whole team's work."),
        idea: u("إكسل اتعمل علشان تشوف البيانات… مش علشان يشيلها كلها.", "Excel was built for looking at data… not for holding all of it.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.skillStory]);
})(window.ACADEMY = window.ACADEMY || {});
