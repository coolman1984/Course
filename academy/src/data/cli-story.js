/* The two CLIs — the story deck of lesson k1, the first deck of unit 4.
   The planning engineer of unit 3 (the same hero, now answering the security team's questions) carries every slide with one
   question: «إزاي النموذج يشتغل جوّه فولدري، وأنا اللي بقرر؟». The deck goes from copying code out of a chat to Claude
   Code and Codex in the terminal: what a CLI is, the two tools side by side, the folder as the boundary, a read request
   first, approvals, the plan, the run-and-fix loop, the rules files, who installs it, and the two compared; it ends on
   the blocked package that opens k2. Drawings are the cl_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.cliStory = {
    id: "cli", lesson: "k1",
    kicker: u("أداتين في الطرفية · الحكاية في ٨ دقايق", "Two tools in the terminal · the story in 8 minutes"),
    title: u("النموذج يشتغل جوّه فولدرك… والقرار ليك", "The model works inside your folder… and the decision stays yours"),
    lead: u("فاكر سؤالين قسم الأمن في آخر الوحدة التالتة؟ الوحدة دي بتجاوب عليهم بأبسط أمثلة ممكنة. ومعانا نفس مهندس التخطيط: المرة دي هيبني نفس الشغل بطريقة أي زميل يقدر يكررها، ويبدأ بنقل الشغل من الشات للطرفية.",
      "Remember the security team's two questions at the end of unit 3? This unit answers them with the simplest possible examples. The same planning engineer is with us: this time he builds the same work in a way any colleague can repeat, and starts by moving the work from the chat to the terminal."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي النموذج يشتغل جوّه فولدري، والقرار يفضل ليّا؟", "How does the model work inside my folder, with the decision staying mine?"),
    finalQuestion: u("طب لو الكود محتاج باكدج، والشركة مانعاها؟", "And what if the code needs a package the company blocks?"),
    note: u("شكل الأداتين وأوامرهم بيتغيّر مع كل تحديث، لكن الفكرة ثابتة. الأرقام توضيحية.", "The two tools' look and commands change with every update, but the idea stays. The figures are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("الأداتين في الطرفية، في شرائح", "Two tools in the terminal, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "copy", art: "cl_copy", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("نسخ ولصق", "Copy and paste"),
        title: u("خمس مرات رايح جاي بين الشات والمفكرة", "Five trips back and forth between the chat and Notepad"),
        story: [u("فاكر الوحدة التانية؟ مهندس التخطيط كان بينسخ الكود من الشات، ويحفظه في المفكرة، ويشغّله، وبعدين ينسخ الخطأ الأحمر ويرجّعه للشات. حصل ده خمس مرات في أداة واحدة، وفي كل مرة النموذج كان بيصلّح حاجة ويغيّر حاجة تانية.",
          "Remember unit 2? The planning engineer copied the code from the chat, saved it in Notepad, ran it, then copied the red error back into the chat. That happened five times for one tool, and each time the model fixed one thing and changed another."),
        u("وفي الآخر عرف السبب: الكود بيدوّر على عمود اسمه Quantity، والملف فيه Qty. النموذج عمره ما شاف الملف، فخمّن. والسؤال اللي معانا في الحكاية دي: إزاي النموذج يشتغل جوّه فولدري، والقرار يفضل ليّا؟",
          "In the end he found the reason: the code was looking for a column named Quantity, and the file says Qty. The model had never seen the file, so it guessed. The question we carry in this story: how does the model work inside my folder, with the decision staying mine?")],
        answer: u("لو النموذج ما شافش ملفك، اعتبر كل اسم عمود في الكود تخمين لحد ما تتأكد منه. لأن النموذج بيكمّل الناقص بالحاجة الأكثر شيوعًا، مش بالحقيقة.", "If the model hasn't seen your file, treat every column name in its code as a guess until you check it — a model fills gaps with what is most common, not with the truth."),
        idea: u("النموذج اللي ما شافش ملفك… بيخمّن.", "A model that hasn't seen your file… guesses.")
      },
      {
        id: "cli", art: "cl_cli", year: u("CLI", "CLI"), mark: u("٠٢", "02"), era: u("سطر الأوامر", "The command line"),
        title: u("برنامج من غير زراير", "A program with no buttons"),
        story: [u("الحل إن النموذج يشوف الفولدر بنفسه. ده بيحصل في نافذة سودا اسمها الطرفية. الـ CLI اختصار Command Line Interface، يعني «واجهة سطر الأوامر»: برنامج من غير زراير، بتكلّمه بالكتابة وتضغط Enter.",
          "The answer is for the model to see the folder itself. That happens in a black window called the terminal. CLI stands for Command Line Interface: a program with no buttons; you talk to it by typing and pressing Enter."),
        u("مهندس التخطيط كتب كلمة واحدة: claude، وضغط Enter، فظهر سطر مستني طلبه. من هنا بيكتب طلبه بالعربي زي الشات بالظبط. الفرق إن البرنامج موجود جوّه الفولدر نفسه، وشايف ملفاته.",
          "The planning engineer typed one word, claude, and pressed Enter, and a line appeared waiting for his request. From here he writes his request in Arabic, just like the chat. The difference is that the program sits inside the folder itself, and sees its files.")],
        answer: u("الـ CLI مش أصعب من الشات: نفس الطلب بالعربي، لكن في الطرفية. لأن الكلام هو هو، والفرق في المكان اللي البرنامج شغال منه.", "A CLI is no harder than chat: the same request in Arabic, only in the terminal — the words are the same; the difference is where the program sits."),
        idea: u("نفس الطلب… لكن من جوّه الفولدر.", "The same request… from inside the folder.")
      },
      {
        id: "two", art: "cl_two", year: u("الأداتين", "The two tools"), mark: u("٠٣", "03"), era: u("نفس الفكرة", "One idea"),
        title: u("Claude Code وCodex: فكرة واحدة من شركتين", "Claude Code and Codex: one idea from two companies"),
        story: [u("فيه أداتين معروفين بالشكل ده: Claude Code من Anthropic، وCodex من OpenAI. الاتنين بيتفتحوا في الطرفية جوّه فولدر، وبيقروا ويكتبوا ويشغّلوا، وبيستأذنوا قبل أي خطوة. الفرق بينهم في التفاصيل والأوامر، مش في الفكرة.",
          "Two tools are well known in this shape: Claude Code from Anthropic and Codex from OpenAI. Both open in the terminal inside a folder, read, write and run, and ask permission before any step. They differ in the details and the commands, not in the idea."),
        u("مهندس التخطيط اشتغل بـ Claude Code في الوحدة التالتة، وزمايله في مواقع تانية عندهم Codex. فقرر يكتب كل Prompt في الوحدة دي بطريقة تشتغل في الاتنين. الفكرة بتتعلّم مرة واحدة، والأداة ممكن تتغيّر عادي.",
          "The planning engineer worked with Claude Code in unit 3, and colleagues at other sites have Codex. So he decided to write every Prompt in this unit so that it works in both. The idea is learned once, and the tool may change without trouble.")],
        answer: u("اتعلّم الفكرة قبل الأداة: فولدر، وطلب، وموافقة، وتشغيل. لأن الأدوات بتتحدّث كل شهر، والطريقة بتفضل زي ما هي.", "Learn the idea before the tool: a folder, a request, an approval, a run — tools are updated every month, and the method stays as it is."),
        idea: u("أداتين… وطريقة واحدة.", "Two tools… one method.")
      },
      {
        id: "folder", art: "cl_folder", year: u("الفولدر", "The folder"), mark: u("٠٤", "04"), era: u("حدود الأداة", "The tool's boundary"),
        title: u("الفولدر اللي بتفتحها فيه… هو حدودها", "The folder you open it in… is its boundary"),
        story: [u("فتح File Explorer على فولدر المثال الأول، وكتب powershell في شريط العنوان، فاتفتحت الطرفية جوّه الفولدر نفسه. كده كل اللي الأداة تقدر تشوفه هو فولدر Data وملف README، ومفيش غيرهم.",
          "He opened File Explorer on the first example's folder and typed powershell in the address bar, and the terminal opened inside that very folder. Now everything the tool can see is the Data folder and the README file, and nothing else."),
        u("ولو فتحها على سطح المكتب، هيبقى قدامها كل ملفاته: الشخصية والمرتبات وأي حاجة تانية. علشان كده كل مشروع ليه فولدر لوحده، وفيه نسخة من الملفات اللي المشروع محتاجها بس.",
          "Had he opened it on the Desktop, all his files would be in front of it: personal files, salaries, anything else. That's why every project has a folder of its own, holding a copy of only the files the project needs.")],
        answer: u("افتح الأداة دايمًا في فولدر مشروع لوحده، فيه اللي محتاجه بس. لأن أي ملف جوّه الفولدر ممكن يتقري ويتبعت للنموذج.", "Always open the tool in a project folder of its own, holding only what it needs — any file inside the folder may be read and sent to the model."),
        idea: u("فولدر صغير… يعني حدود آمنة.", "A small folder… means safe boundaries.")
      },
      {
        id: "read", art: "cl_read", year: u("أول طلب", "First request"), mark: u("٠٥", "05"), era: u("قراءة بس", "Reading only"),
        title: u("أول طلب: اقرا… ومن غير ما تغيّر حاجة", "First request: read… without changing anything"),
        story: [u("أول طلب كتبه كان: «اقرا README.txt وبص على فولدر Data، وقولّي فهمت إيه، من غير ما تعدّل أي حاجة». الأداة فتحت الملفات ورجعت بنقط قصيرة: ملفين أسبوعيين بنفس الخمس أعمدة، وملف Masters فيه شيت البلاد، والمطلوب ٥ خطوات.",
          "His first request was: “Read README.txt and look at the Data folder, and tell me what you understood, without changing anything.” The tool opened the files and came back with short points: two weekly files with the same five columns, a Masters file holding the countries sheet, and 5 steps required."),
        u("وفي الآخر سألت: «Qty بعدد الأجهزة؟». المرة دي ما خمّنتش اسم العمود، لأنها قرته. مهندس التخطيط قارن الرد بالـ README سطر سطر، ولقى الفهم مظبوط قبل ما يتكتب سطر كود واحد.",
          "And at the end it asked: “Is Qty in sets?” This time it didn't guess the column name, because it read it. The planning engineer compared the reply with the README line by line, and found the understanding right before a single line of code was written.")],
        answer: u("ابدأ أي جلسة بطلب قراءة بس، وقارن فهم الأداة بالملفات. لأن الفهم الغلط لو ظهر هنا بيتصلّح بكلمة، ولو ظهر بعد الكود بيتصلّح في ساعة.", "Start any session with a reading request only, and compare the tool's understanding with the files — a wrong understanding caught here is fixed with a word; caught after the code, it takes an hour."),
        idea: u("الفهم الأول… وبعده الكود.", "Understanding first… then the code.")
      },
      {
        id: "approve", art: "cl_approve", year: u("الموافقة", "Approval"), mark: u("٠٦", "06"), era: u("قبل كل خطوة", "Before each step"),
        title: u("قبل ما تكتب أو تشغّل… بتستأذن", "Before it writes or runs… it asks"),
        story: [u("لما طلب أول خطوة، الأداة كتبت السكريبت ووقفت برسالة: «أشغّل step1_stack.ps1؟»، وتحتها تلات اختيارات: أيوه المرة دي، وأيوه دايمًا، ولأ. في الأول اختار «المرة دي» بس، وقرا الأمر قبل ما يوافق.",
          "When he asked for the first step, the tool wrote the script and stopped with a message: “Run step1_stack.ps1?”, with three choices under it: yes this time, yes always, and no. At first he chose “this time” only, and read the command before approving."),
        u("و«دايمًا» ليها وقتها: لما يبقى عارف الأداة بتعمل إيه بالظبط، ولأوامر القراءة بس. أي أمر بيمسح أو بيبعت أو بيكتب برّه الفولدر، بيوافق عليه بنفسه كل مرة.",
          "And “always” has its time: when he knows exactly what the tool does, and for reading commands only. Any command that deletes, sends or writes outside the folder, he approves himself every time.")],
        answer: u("وافق خطوة بخطوة في الأول، واقرا الأمر قبل الموافقة. لأن الموافقة الأوتوماتيك بتشيل الإنسان من المكان الوحيد اللي بيكتشف فيه الغلط قبل ما يحصل.", "Approve step by step at first, and read the command before approving — automatic approval removes the person from the one place where mistakes are caught before they happen."),
        idea: u("الموافقة مش زرار… الموافقة مراجعة.", "Approval isn't a button… approval is a review.")
      },
      {
        id: "plan", art: "cl_plan", year: u("الخطة", "The plan"), mark: u("٠٧", "07"), era: u("قبل التنفيذ", "Before building"),
        title: u("الخطة الأول… وبعدها الكود", "The plan first… then the code"),
        story: [u("الطلب التاني كان أكبر، فكتب: «قبل ما تكتب أي كود، اعرض عليّا خطة الخطوة في ٣ لـ ٥ سطور، واستنى موافقتي». ورجعت الخطة: هفتح الملفين للقراءة بس، وأحطهم تحت بعض، وأضيف SourceFile، وأكتب العدد والإجمالي في السجل.",
          "The second request was bigger, so he wrote: “Before writing any code, show me the step's plan in 3 to 5 lines, and wait for my approval.” The plan came back: I'll open both files read-only, stack them, add SourceFile, and write the count and the total in the log."),
        u("لاحظ إن الخطة ما قالتش هتحفظ فين، فسأل، وجاله الرد: «Output\\Two_Weeks.xlsx». وبعدها وافق. وفي Claude Code فيه وضع خاص بالخطة بيمنع أي تعديل لحد ما توافق، وفي Codex بتطلب نفس الحاجة بنفس الجملة.",
          "He noticed the plan didn't say where it would save, so he asked, and the reply came: “Output\\Two_Weeks.xlsx.” Then he approved. Claude Code has a plan mode of its own that blocks any change until you approve; in Codex you ask for the same thing with the same sentence.")],
        answer: u("اطلب خطة كل خطوة قبل الكود بتاعها، وما توافقش على خطة ناقصة. لأن السؤال عن سطر في الخطة أسهل بكتير من السؤال عن سطر في الكود.", "Ask for each step's plan before its code, and don't approve an incomplete plan — a question about a line of the plan is much easier than a question about a line of code."),
        idea: u("سطر في الخطة… بيوفّر عشرة في الكود.", "A line in the plan… saves ten in the code.")
      },
      {
        id: "run", art: "cl_run", year: u("التشغيل", "The run"), mark: u("٠٨", "08"), era: u("التصليح جوّه الطرفية", "Fixing inside the terminal"),
        title: u("الخمس مرات رايح جاي… بقوا جوّه الطرفية", "The five trips back and forth… now happen inside the terminal"),
        story: [u("الأداة شغّلت السكريبت، وطلع خطأ: الشيت اسمه Production مش Sheet1. شافت الخطأ بنفسها، وقرت الملف، وصلّحت السطر، وشغّلت تاني. نفس الخطوات اللي مهندس التخطيط عملها بإيده خمس مرات في الوحدة التانية، خلصت جوّه الطرفية في دقيقة.",
          "The tool ran the script, and an error came up: the sheet is named Production, not Sheet1. It saw the error itself, read the file, fixed the line and ran again. The same steps the planning engineer did by hand five times in unit 2 finished inside the terminal in a minute."),
        u("وفي الآخر السجل قال: ملفين، و١٨ + ١٨ = ٣٦ صف، و١٬٧٦٥ جهاز. ما نسخش ولا لزق حاجة؛ قرا كل خطوة عملتها الأداة، ووافق على كل أمر. ووقته كله راح في المراجعة، مش في النقل.",
          "In the end the log said: two files, 18 + 18 = 36 rows, and 1,765 sets. He copied and pasted nothing; he read every step the tool took and approved every command. All his time went into reviewing, not moving text around.")],
        answer: u("سيب الأداة تشغّل وتصلّح، وإنت اقرا اللي عملته واقرا السجل. لأن تكرار الخطوات شغل آلي، والحكم على النتيجة هو اللي محتاجك.", "Let the tool run and fix, and you read what it did and read the log — repeating the steps is mechanical work; judging the result is what needs you."),
        idea: u("هي بتكرر الخطوات… وإنت اللي بتحكم.", "It repeats the steps… and you are the one who judges.")
      },
      {
        id: "rules", art: "cl_rules", year: u("ملف القواعد", "Rules file"), mark: u("٠٩", "09"), era: u("أول كل جلسة", "Every session's start"),
        title: u("ملف الأداة بتقراه قبل ما تكلّمها", "A file the tool reads before you talk to it"),
        story: [u("تاني يوم فتح جلسة جديدة، والأداة ما افتكرتش حاجة من امبارح. فكتب /init، والأداة قرت الفولدر وعملت ملف قواعد: Claude Code بيسمّيه CLAUDE.md، وCodex بيسمّيه AGENTS.md. وأي جلسة جديدة بتقرا الملف ده الأول.",
          "The next day he opened a new session, and the tool remembered nothing from yesterday. So he typed /init, and the tool read the folder and made a rules file: Claude Code calls it CLAUDE.md, and Codex calls it AGENTS.md. Every new session reads this file first."),
        u("كتب فيه قاعدتين: «اقرا من Data واكتب في Output بس»، و«اعرض الخطة واستنى موافقتي». ومن ساعتها ما احتاجش يكتبهم تاني في أي طلب. وفي آخر الوحدة هنكتب الملف ده كامل بقواعد قسم الأمن.",
          "He wrote two rules in it: “Read from Data, write to Output only”, and “Show the plan and wait for my approval.” Since then he never needed to write them again in any request. At the end of the unit we will write this file in full, with the security team's rules.")],
        answer: u("أي قاعدة بتكررها في كل طلب، اكتبها في ملف القواعد. لأن الجلسة الجديدة ما بتفتكرش، والملف بيتقري كل مرة.", "Any rule you repeat in every request, write it in the rules file — a new session doesn't remember, and the file is read every time."),
        idea: u("اللي بيتكرر… يتكتب مرة واحدة.", "What repeats… is written once.")
      },
      {
        id: "install", art: "cl_install", year: u("التثبيت", "Installing"), mark: u("١٠", "10"), era: u("مرة واحدة، عن طريق الـ IT", "Once, through IT"),
        title: u("البرنامج على جهازك… والنموذج على السحابة", "The program on your machine… the model in the cloud"),
        story: [u("الأداة ما بتتنزّلش من أي موقع: قسم الـ IT بيثبّتها مرة واحدة بالطريقة الرسمية المعتمدة. البرنامج الصغير اللي في الطرفية موجود على جهازك، لكن النموذج نفسه شغال على السحابة.",
          "The tool isn't downloaded from any website: the IT department installs it once, in the official approved way. The small program in the terminal sits on your machine, but the model itself runs in the cloud."),
        u("وده معناه إن اللي الأداة بتقراه بيتبعت للنموذج علشان يفهمه، على حساب الشركة المعتمد. علشان كده الفولدر الصغير مهم، وعلشان كده مفيش داعي يتحط فيه أي باسورد أو بيانات حساسة مالهاش لازمة.",
          "That means what the tool reads is sent to the model so it can understand it, on the company's approved account. That's why the small folder matters, and why there is no reason to put any password or sensitive data in it that the work doesn't need.")],
        answer: u("التثبيت عن طريق الـ IT بس، والحساب حساب الشركة المعتمد. لأن الأداة اللي بتقرا ملفات الشغل لازم تكون معروفة ومتراجعة، مش نسخة من أي موقع.", "Installed through IT only, and the account is the company's approved one — a tool that reads work files must be known and reviewed, not a copy from any website."),
        idea: u("أداة معتمدة… من مصدر معتمد.", "An approved tool… from an approved source.")
      },
      {
        id: "compare", art: "cl_compare", year: u("المقارنة", "Comparison"), mark: u("١١", "11"), era: u("نفس الطلب", "The same request"),
        title: u("نفس الطلب في الأداتين… ونفس الفهم", "The same request in both tools… and the same understanding"),
        story: [u("علشان يتطمن، جرّب نفس طلب القراءة في Codex. الرد جه بكلام مختلف، لكن بنفس المعلومات: ملفين بنفس الخمس أعمدة، وشيت البلاد، و٥ خطوات، وسؤال عن Qty. الفكرة واحدة، والـ Prompt هو هو.",
          "To be sure, he tried the same reading request in Codex. The reply came in different words but with the same facts: two files with the same five columns, the countries sheet, 5 steps, and a question about Qty. One idea, and the same Prompt."),
        u("وفهم حاجة أهم: طالما الأداتين قروا الملفات بنفس الشكل، يبقى مشكلة الوحدة التانية ما كانتش في النموذج؛ كانت في إن النموذج ما شافش الملف. والوحدة كلها هتمشي على الأداة اللي الشركة معتمداها.",
          "And he understood something more important: since both tools read the files the same way, unit 2's problem was never the model; it was that the model never saw the file. The whole unit will run on the tool the company has approved.")],
        answer: u("اختبر أي أداة جديدة بطلب قراءة إنت عارف إجابته. لأن الأداة اللي فهمت ملفات معروفة صح هي الأداة اللي تقدر تكمّل بيها.", "Test any new tool with a reading request whose answer you know — the tool that understands known files correctly is the tool you can carry on with."),
        idea: u("المشكلة ما كانتش في النموذج… كانت في اللي شافه.", "The problem was never the model… it was what it saw.")
      },
      {
        id: "cliff", art: "cl_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("سطر واحد", "One line"),
        title: u("أول سطر في الكود… والشبكة رفضت", "The code's first line… and the network refused"),
        story: [u("مهندس التخطيط طلب من Codex أداة صغيرة تجمع الأسبوعين بـ Python. أول سطر في السكريبت كان import pandas، والتشغيل وقف برسالة ModuleNotFoundError. والأداة اقترحت ببساطة: «أشغّل pip install pandas؟».",
          "The planning engineer asked Codex for a small tool to combine the two weeks in Python. The first line of the script was import pandas, and the run stopped with the message ModuleNotFoundError. The tool simply suggested: “Shall I run pip install pandas?”"),
        u("وافق، والشبكة رفضت: «الحزمة دي ممنوعة على أجهزة الشركة». افتكر سؤال قسم الأمن الأول: «الكود ده بيستخدم أي حاجة نازلة من النت؟». ومن هنا بيبدأ الدرس الجاي: طب لو الكود محتاج باكدج، والشركة مانعاها؟",
          "He approved, and the network refused: “This package is blocked on company machines.” He remembered the security team's first question: “Does this code use anything downloaded from the internet?” And here the next lesson begins: what if the code needs a package the company blocks?")],
        answer: u("واجب الدرس: افتح الأداة اللي عندك في فولدر المثال الأول، واطلب قراءة بس، وقارن ردها بالـ README. لأن الأداة اللي فهمت الملفات صح هي اللي هنبني بيها الوحدة كلها.", "The lesson's homework: open the tool you have in the first example's folder, ask for a reading only, and compare its reply with the README — the tool that understood the files correctly is the one we will build the whole unit with."),
        idea: u("الأداة شايفة الفولدر… لكن لسه ما تعرفش قواعد الشركة.", "The tool sees the folder… but doesn't know the company's rules yet.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.cliStory]);
})(window.ACADEMY = window.ACADEMY || {});
