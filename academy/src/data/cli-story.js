/* The two CLIs — the story deck of lesson k1, the first deck of unit 4.
   The planning engineer at the second plant (unit 3 ended on that plant's questions) carries every slide with one
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
    title: u("النموذج جوّه فولدرك… وإنت اللي بتقرر", "The model inside your folder… and you decide"),
    lead: u("فاكر سؤالين قسم الأمن في آخر الوحدة التالتة؟ الوحدة دي بتجاوبهم بأبسط أمثلة ممكنة. وأول حكاية لمهندسة التخطيط في المصنع التاني، اللي لسه جديدة على الأتمتة، وهي بتنقل الشغل من الشات للطرفية.",
      "Remember the security team's two questions at the end of unit 3? This unit answers them with the simplest possible examples. The first story belongs to the planning engineer at the second plant, still new to automation, as she moves the work from the chat to the terminal."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي النموذج يشتغل جوّه فولدري، وأنا اللي بقرر؟", "How does the model work inside my folder, with me deciding?"),
    finalQuestion: u("طب لو الكود اللي كتبه محتاج باكدج، والشركة مانعاها؟", "And what if the code it wrote needs a package the company blocks?"),
    note: u("شكل الأداتين وأوامرهم بيتغيّر مع كل تحديث؛ الفكرة نفسها ثابتة. الأرقام توضيحية.", "The two tools' look and commands change with every update; the idea itself stays. The figures are illustrative."),
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
        title: u("خمس رحلات بين الشات والمفكرة", "Five trips between the chat and Notepad"),
        story: [u("مهندسة التخطيط في المصنع التاني قضت العصر كله رايحة جاية: تنسخ الكود من الشات، وتحفظه في المفكرة، وتشغّله، وتنسخ الخطأ الأحمر وترجّعه للشات. خمس مرات. وفي كل مرة النموذج بيصلّح حاجة ويغيّر حاجة تانية.",
          "The planning engineer at the second plant spent the whole afternoon going back and forth: copying code from the chat, saving it in Notepad, running it, then copying the red error back into the chat. Five times. And each time the model fixed one thing and changed another."),
        u("في الآخر عرفت السبب: الكود بيدوّر على عمود اسمه Quantity، والملف فيه Qty. النموذج عمره ما شاف الملف، فخمّن. والسؤال اللي ماشي معانا: إزاي النموذج يشتغل جوّه فولدري، وأنا اللي بقرر؟",
          "In the end she found the reason: the code was looking for a column named Quantity, and the file says Qty. The model had never seen the file, so it guessed. The question we carry: how does the model work inside my folder, with me deciding?")],
        answer: u("لو النموذج ما شافش ملفك، اعتبر كل اسم عمود في الكود تخمين لحد ما يتأكد. لأن النموذج بيكمّل الناقص بأكتر حاجة شائعة، مش بالحقيقة.", "If the model hasn't seen your file, treat every column name in its code as a guess until checked — a model fills gaps with what is most common, not with the truth."),
        idea: u("النموذج اللي ما شافش ملفك… بيخمّن.", "A model that hasn't seen your file… guesses.")
      },
      {
        id: "cli", art: "cl_cli", year: u("CLI", "CLI"), mark: u("٠٢", "02"), era: u("سطر الأوامر", "The command line"),
        title: u("برنامج من غير زراير", "A program with no buttons"),
        story: [u("زميل من فريق الأتمتة قالها: «ليه ما تخلّيش النموذج يشوف الفولدر بنفسه؟» وفتحلها نافذة سودا: الطرفية. «ده CLI، اختصار Command Line Interface، يعني واجهة سطر الأوامر: برنامج ما فيهوش زراير، بتكلّمه بالكتابة وتضغط Enter».",
          "A colleague from the automation team asked her: “Why not let the model see the folder itself?” and opened a black window for her: the terminal. “This is a CLI, short for Command Line Interface: a program with no buttons; you talk to it by typing and pressing Enter.”"),
        u("كتب كلمة واحدة: claude، وضغط Enter. ظهر سطر بيستنى. «من هنا تكتبي طلبك بالعربي، زي الشات بالظبط. الفرق إن البرنامج ده قاعد جوّه الفولدر ده، وشايف ملفاته».",
          "He typed one word, claude, and pressed Enter. A waiting line appeared. “From here you write your request in Arabic, just like the chat. The difference is that this program sits inside this folder, and sees its files.”")],
        answer: u("الـ CLI مش أصعب من الشات: نفس الطلب بالعربي، بس في الطرفية. لأن الكلام هو هو، والفرق في المكان اللي البرنامج قاعد فيه.", "A CLI is no harder than chat: the same request in Arabic, only in the terminal — the words are the same; the difference is where the program sits."),
        idea: u("نفس الطلب… بس من جوّه الفولدر.", "The same request… from inside the folder.")
      },
      {
        id: "two", art: "cl_two", year: u("الأداتين", "The two tools"), mark: u("٠٣", "03"), era: u("نفس الفكرة", "One idea"),
        title: u("Claude Code وCodex: نفس الفكرة، شركتين", "Claude Code and Codex: one idea, two companies"),
        story: [u("«فيه أداتين مشهورين بالشكل ده: Claude Code من Anthropic، وCodex من OpenAI. الاتنين بيتفتحوا في الطرفية جوّه فولدر، ويقروا ويكتبوا ويشغّلوا، وبيستأذنوا قبل أي خطوة. الفرق في التفاصيل والأوامر، مش في الفكرة».",
          "“There are two well-known tools of this kind: Claude Code from Anthropic and Codex from OpenAI. Both open in the terminal inside a folder, read, write and run, and ask before every step. The difference is in the details and the commands, not the idea.”"),
        u("سألته: «أستخدم أنهي واحد؟» قال: «اللي الشركة معتمداه على حسابها. والـ Prompts اللي هنكتبها في الوحدة دي بتشتغل في الاتنين. اتعلّمي الفكرة مرة، والأداة تتغيّر عادي».",
          "She asked: “Which one should I use?” He said: “The one the company has approved on its account. And the Prompts we write in this unit work in both. Learn the idea once, and the tool can change.”")],
        answer: u("اتعلّم الفكرة مش الأداة: فولدر، وطلب، وموافقة، وتشغيل. لأن الأدوات بتتحدّث كل شهر، والطريقة بتفضل.", "Learn the idea, not the tool: a folder, a request, an approval, a run — the tools update every month; the method stays."),
        idea: u("أداتين… وطريقة واحدة.", "Two tools… one method.")
      },
      {
        id: "folder", art: "cl_folder", year: u("الفولدر", "The folder"), mark: u("٠٤", "04"), era: u("حدود الأداة", "The tool's boundary"),
        title: u("الفولدر اللي بتفتحه فيه… هو حدوده", "The folder you open it in… is its boundary"),
        story: [u("الزميل فتح File Explorer على فولدر المثال الأول، وكتب powershell في شريط العنوان، فاتفتحت الطرفية جوّه الفولدر نفسه. «كده كل اللي الأداة تقدر تشوفه: فولدر Data وملف README، ومفيش غيرهم».",
          "The colleague opened File Explorer on the first example's folder, typed powershell in the address bar, and the terminal opened inside that very folder. “Now all the tool can see is the Data folder and the README, nothing else.”"),
        u("«ولو فتحتيها على سطح المكتب؟» «يبقى قدامها كل ملفاتك: الشخصي والمرتبات وأي حاجة. علشان كده كل مشروع ليه فولدر لوحده، وفيه نسخة من الملفات اللي محتاجاها بس».",
          "“And if I opened it on the Desktop?” “Then all your files are in front of it: personal ones, payroll, anything. That's why each project gets a folder of its own, holding copies of only the files it needs.”")],
        answer: u("افتح الأداة دايمًا في فولدر مشروع لوحده، فيه اللي محتاجه بس. لأن كل اللي جوّه الفولدر ممكن يتقري ويتبعت للنموذج.", "Always open the tool in a project folder of its own, holding only what it needs — everything inside the folder may be read and sent to the model."),
        idea: u("الفولدر الصغير… حدود آمنة.", "A small folder… safe boundaries.")
      },
      {
        id: "read", art: "cl_read", year: u("أول طلب", "First request"), mark: u("٠٥", "05"), era: u("قراءة بس", "Reading only"),
        title: u("أول طلب: اقرا… وما تلمسش حاجة", "The first request: read… and touch nothing"),
        story: [u("كتبت أول طلب: «اقرا README.txt وبص على فولدر Data، وقولّي فهمت إيه، من غير ما تعدّل أي حاجة». الأداة فتحت الملفات، ورجعت بنقط قصيرة: ملفين أسبوعيين بنفس ٥ أعمدة، وملف Masters فيه شيت البلاد، والمطلوب ٥ خطوات.",
          "She wrote her first request: “Read README.txt and look at the Data folder, and tell me what you understood, without changing anything.” The tool opened the files and came back with short points: two weekly files with the same 5 columns, a Masters file with the countries sheet, and 5 steps required."),
        u("وفي الآخر سؤال: «Qty بعدد الأجهزة؟». المرة دي ما خمّنتش اسم العمود: قرته. مهندسة التخطيط قارنت الرد بالـ README سطر سطر، ولقت الفهم مظبوط قبل ما يتكتب ولا سطر كود.",
          "And at the end a question: “Is Qty in sets?” This time it didn't guess the column's name: it read it. The planning engineer compared the reply with the README line by line, and found the understanding right before a single line of code was written.")],
        answer: u("ابدأ أي جلسة بطلب قراءة بس، وقارن فهم الأداة بالملفات. لأن الفهم الغلط لو اتمسك هنا بيتصلّح بكلمة، ولو اتمسك بعد الكود بيتصلّح بساعة.", "Start any session with a reading request only, and compare the tool's understanding with the files — a misunderstanding caught here costs a word; caught after the code, an hour."),
        idea: u("الفهم الأول… وبعدين الكود.", "Understanding first… then the code.")
      },
      {
        id: "approve", art: "cl_approve", year: u("الموافقة", "Approval"), mark: u("٠٦", "06"), era: u("قبل كل خطوة", "Before each step"),
        title: u("قبل ما يكتب أو يشغّل… بيستأذن", "Before it writes or runs… it asks"),
        story: [u("لما طلبت أول خطوة، الأداة كتبت السكريبت، ووقفت برسالة: «أشغّل step1_stack.ps1؟» وتحتها اختيارات: أيوه المرة دي، أيوه دايمًا، لأ. الزميل قالها: «في الأول اختاري المرة دي، واقري الأمر قبل ما توافقي».",
          "When she asked for the first step, the tool wrote the script and stopped with a message: “Run step1_stack.ps1?” Under it, choices: yes this time, yes always, no. The colleague told her: “At first choose this time, and read the command before approving.”"),
        u("«و«دايمًا» إمتى؟» «لما تعرفي الأداة بتعمل إيه بالظبط، ولأوامر بتقرا بس. أي أمر بيمسح أو بيبعت أو بيكتب برّه الفولدر، فضّلي توافقي عليه بنفسك كل مرة».",
          "“And when is ‘always’ fine?” “When you know exactly what the tool does, and for commands that only read. Any command that deletes, sends, or writes outside the folder, keep approving it yourself every time.”")],
        answer: u("وافق خطوة خطوة في الأول، واقرا الأمر قبل الموافقة. لأن الموافقة الأوتوماتيك بتشيل الإنسان من المكان الوحيد اللي بيمسك فيه الغلط قبل ما يحصل.", "Approve step by step at first, and read the command before approving — automatic approval removes the person from the one place where a mistake is caught before it happens."),
        idea: u("الموافقة مش زرار… دي مراجعة.", "Approval isn't a button… it's a review.")
      },
      {
        id: "plan", art: "cl_plan", year: u("الخطة", "The plan"), mark: u("٠٧", "07"), era: u("قبل التنفيذ", "Before building"),
        title: u("الخطة على الورق… قبل الكود", "The plan on paper… before the code"),
        story: [u("الطلب التاني كان أكبر، فكتبت: «قبل ما تكتب أي كود، اعرض عليّا خطة الخطوة في ٣ لـ ٥ سطور، واستنى موافقتي». الخطة رجعت: هفتح الملفين للقراءة بس، وأحطهم تحت بعض، وأضيف SourceFile، وأكتب العدد والإجمالي في السجل.",
          "The second request was bigger, so she wrote: “Before writing any code, show me the step's plan in 3 to 5 lines, and wait for my approval.” The plan came back: I'll open both files read-only, stack them, add SourceFile, and write the count and the total to the log."),
        u("لاحظت إن الخطة ما قالتش هيحفظ فين، فسألت. الرد: «Output\\Two_Weeks.xlsx». وافقت. وفي Claude Code فيه وضع للخطة لوحده بيمنع أي تعديل لحد ما توافق، وفي Codex بتطلبها بالكلام بنفس الجملة.",
          "She noticed the plan didn't say where it would save, so she asked. The reply: “Output\\Two_Weeks.xlsx.” She approved. Claude Code has a plan mode of its own that blocks any change until you approve, and in Codex you ask for it in words with the same sentence.")],
        answer: u("اطلب خطة كل خطوة قبل كودها، وما توافقش على خطة ناقصة. لأن السؤال على سطر في الخطة أسهل كتير من السؤال على سطر في كود.", "Ask for each step's plan before its code, and don't approve an incomplete plan — a question about a line of plan is far easier than one about a line of code."),
        idea: u("سطر في الخطة… يوفّر عشرة في الكود.", "One line of plan… saves ten of code.")
      },
      {
        id: "run", art: "cl_run", year: u("التشغيل", "The run"), mark: u("٠٨", "08"), era: u("الدايرة جوّه", "The loop inside"),
        title: u("الرحلات الخمسة… بقت جوّه الطرفية", "The five trips… now happen inside the terminal"),
        story: [u("الأداة شغّلت السكريبت، وطلع خطأ: الشيت اسمه Production مش Sheet1. شافت الخطأ بنفسها، وقرت الملف، وصلّحت السطر، وشغّلت تاني. نفس الدايرة اللي مهندسة التخطيط عملتها خمس مرات بإيدها، حصلت جوّه في دقيقة.",
          "The tool ran the script and an error came up: the sheet is named Production, not Sheet1. It saw the error itself, read the file, fixed the line and ran again. The same loop the planning engineer had done five times by hand happened inside, in a minute."),
        u("وفي الآخر السجل قال: ملفين، ١٨ + ١٨ = ٣٦ صف، و١٬٧٦٥ جهاز. هي ما نسختش ولا لصقت، بس قرت كل خطوة الأداة عملتها، ووافقت على كل أمر. وقتها راح في المراجعة، مش في النقل.",
          "In the end the log said: two files, 18 + 18 = 36 rows, and 1,765 sets. She neither copied nor pasted; she read every step the tool took and approved every command. Her time went into reviewing, not carrying.")],
        answer: u("سيب الأداة تشغّل وتصلّح، وإنت اقرا اللي عملته والسجل. لأن الدايرة دي ميكانيكية، والحكم على النتيجة هو اللي محتاجك.", "Let the tool run and fix, while you read what it did and the log — that loop is mechanical; judging the result is what needs you."),
        idea: u("هي بتكرر الخطوات… وإنت بتحكم.", "It runs the loop… you judge.")
      },
      {
        id: "rules", art: "cl_rules", year: u("ملف القواعد", "Rules file"), mark: u("٠٩", "09"), era: u("أول كل جلسة", "Every session's start"),
        title: u("ملف بتقراه الأداة قبل ما تكلّمها", "A file the tool reads before you speak"),
        story: [u("تاني يوم فتحت جلسة جديدة، والأداة ما افتكرتش حاجة من امبارح. الزميل قالها: «اكتبي /init». الأداة قرت الفولدر وعملت ملف قواعد: Claude Code بيسمّيه CLAUDE.md، وCodex بيسمّيه AGENTS.md. وأي جلسة جديدة بتقراه الأول.",
          "The next day she opened a new session, and the tool remembered nothing from yesterday. The colleague told her: “Type /init.” The tool read the folder and made a rules file: Claude Code calls it CLAUDE.md, and Codex calls it AGENTS.md. Every new session reads it first."),
        u("حطّت فيه سطرين: «اقرا من Data واكتب في Output بس»، و«اعرض الخطة واستنى موافقتي». ومن ساعتها ما كتبتهمش تاني في أي طلب. وفي آخر الوحدة هنكتب الملف ده كامل بقواعد قسم الأمن.",
          "She put two lines in it: “Read from Data, write to Output only”, and “Show the plan and wait for my approval.” Since then she never wrote them again in any request. At the end of this unit we will write this file in full with the security team's rules.")],
        answer: u("أي قاعدة بتكرّرها في كل طلب، حطها في ملف القواعد. لأن الجلسة الجديدة ما بتفتكرش، والملف بيتقري كل مرة.", "Any rule you repeat in every request, put it in the rules file — a new session remembers nothing, and the file is read every time."),
        idea: u("اللي بيتكرر… يتكتب مرة.", "What repeats… is written once.")
      },
      {
        id: "install", art: "cl_install", year: u("التثبيت", "Installing"), mark: u("١٠", "10"), era: u("مرة واحدة، من الـ IT", "Once, by IT"),
        title: u("البرنامج على جهازك… والنموذج على السحابة", "The program on your machine… the model in the cloud"),
        story: [u("سألت: «أنزّلها منين؟» الزميل قال: «مش إنتي. الـ IT بيسطّبها مرة واحدة بالطريقة الرسمية المعتمدة. البرنامج الصغير اللي في الطرفية على جهازك، بس النموذج نفسه شغال على السحابة».",
          "She asked: “Where do I download it from?” The colleague said: “Not you. IT installs it once, in the official approved way. The small program in the terminal is on your machine, but the model itself runs in the cloud.”"),
        u("«يعني الملفات بتطلع برّه؟» «اللي الأداة بتقراه بيتبعت للنموذج علشان يفهمه، على حساب الشركة المعتمد. علشان كده الفولدر الصغير مهم، وعلشان كده ما تحطيش فيه باسورد ولا بيانات حساسة مالهاش لازمة».",
          "“So the files leave the machine?” “What the tool reads is sent to the model so it can understand it, on the company's approved account. That's why the small folder matters, and why you never put a password or needless sensitive data in it.”")],
        answer: u("التثبيت من الـ IT بس، والحساب حساب الشركة المعتمد. لأن الأداة اللي بتقرا ملفات الشغل لازم تبقى معروفة ومتراجعة، مش نسخة من أي موقع.", "Installation by IT only, on the company's approved account — a tool that reads work files must be known and reviewed, not a copy from any website."),
        idea: u("الأداة المعتمدة… من المصدر المعتمد.", "An approved tool… from the approved source.")
      },
      {
        id: "compare", art: "cl_compare", year: u("المقارنة", "Comparison"), mark: u("١١", "11"), era: u("نفس الطلب", "The same request"),
        title: u("نفس الطلب في الأداتين… نفس الفهم", "The same request in both tools… the same understanding"),
        story: [u("علشان تتطمن، جرّبت نفس طلب القراءة في Codex. الرد جه بكلام تاني، بس بنفس المعلومات: ملفين بنفس ٥ أعمدة، وشيت البلاد، و٥ خطوات، وسؤال عن Qty. الفكرة واحدة، والـ Prompt هو هو.",
          "To be sure, she tried the same reading request in Codex. The reply came in other words, but with the same facts: two files with the same 5 columns, the countries sheet, 5 steps, and a question about Qty. One idea, and the same Prompt."),
        u("وفهمت حاجة أهم: لو الأداتين قروا الملفات بنفس الشكل، يبقى المشكلة اللي كانت عندها ما كانتش في النموذج: كانت في إن النموذج ما شافش الملف. والوحدة كلها هتمشي على الأداة اللي الشركة معتمداها.",
          "And she understood something more important: if both tools read the files the same way, her old problem was never the model; it was that the model never saw the file. The whole unit will run on the tool the company approves.")],
        answer: u("اختبر أي أداة جديدة بطلب قراءة معروف إجابته. لأن الأداة اللي فهمت ملفات معروفة صح هي الأداة اللي تقدر تكمّل معاها.", "Test any new tool with a reading request whose answer you know — a tool that understood known files correctly is one you can carry on with."),
        idea: u("المشكلة ما كانتش في النموذج… كانت في اللي شافه.", "The problem was never the model… it was what it saw.")
      },
      {
        id: "cliff", art: "cl_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("سطر واحد", "One line"),
        title: u("أول سطر في الكود… والشبكة رفضت", "The code's first line… and the network refused"),
        story: [u("مهندسة التخطيط طلبت من Codex أداة صغيرة تجمع الأسبوعين بـ Python. أول سطر في السكريبت كان import pandas، والتشغيل وقف: ModuleNotFoundError. الأداة اقترحت بكل بساطة: «أشغّل pip install pandas؟».",
          "The planning engineer asked Codex for a small tool to combine the two weeks in Python. The script's first line was import pandas, and the run stopped: ModuleNotFoundError. The tool suggested, quite simply: “Shall I run pip install pandas?”"),
        u("وافقت، والشبكة رفضت: «الحزمة دي ممنوعة على أجهزة الشركة». افتكرت سؤال قسم الأمن الأول: «الكود ده بيستخدم أي حاجة نازلة من النت؟». والسؤال اللي الدرس الجاي بيبدأ بيه: طب لو الكود اللي كتبه محتاج باكدج، والشركة مانعاها؟",
          "She approved, and the network refused: “This package is blocked on company machines.” She remembered the security team's first question: “Does this code use anything downloaded from the internet?” And the question the next lesson opens with: what if the code it wrote needs a package the company blocks?")],
        answer: u("واجب الدرس: افتح الأداة اللي عندك في فولدر المثال الأول، واطلب قراءة بس، وقارن ردها بالـ README. لأن الأداة اللي فهمت الملفات صح هي اللي هنبني بيها كل الوحدة.", "This lesson's task: open your tool in the first example's folder, ask for a reading only, and compare its reply with the README — the tool that understood the files correctly is the one we build the whole unit with."),
        idea: u("الأداة شايفة الفولدر… بس لسه ما تعرفش قواعد الشركة.", "The tool sees the folder… but doesn't yet know the company's rules.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.cliStory]);
})(window.ACADEMY = window.ACADEMY || {});
