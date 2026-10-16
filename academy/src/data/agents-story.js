/* Chat, memory and agents — the story deck that opens lesson f7 (fifth in unit 0, right after "why the Context is limited").
   One hero runs through every slide: one weekly task («تقرير التوقفات الأسبوعي»), done three ways — by chat, by an assistant
   with memory, by an agent — and the question «مين يشيل المهمة دي؟». It keeps the previous deck's picture (the Context is a
   workspace of fixed size) to explain where memory lives, why an agent fills the workspace fast and compacts it.
   Each slide gives one rule with its reason («القاعدة، وليه؟»). Same slide schema as data/model-story.js;
   drawings are the a_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.agentsStory = {
    id: "agents", lesson: "f7",
    kicker: u("الشات والذاكرة والوكيل · الحكاية كاملة في ٨ دقايق", "Chat, memory and agents · the whole story in 8 minutes"),
    title: u("شات ولا مساعد ولا وكيل؟ والذاكرة بتشتغل إزاي؟", "Chat, assistant or agent? And how does memory work?"),
    lead: u("عرفنا إن الموديل ما بيشوفش غير اللي جوّه مساحة العمل، وإن المساحة دي محدودة. في الحكاية دي هناخد مهمة واحدة من شغلك ونعملها بتلات طرق: بالشات، وبمساعد عنده ذاكرة، وبوكيل. وهنعرف الذاكرة دي متخزّنة فين، والوكيل بيشتغل إزاي، وليه بيضغط الـ Context كل شوية.",
      "We know the model sees only the workspace, and that the workspace is limited. In this story we take one task from your work and do it three ways: by chat, by an assistant with memory, and by an agent. We'll see where that memory is kept, how an agent works, and why it keeps compacting its Context."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("مين يشيل المهمة دي: شات ولا مساعد ولا وكيل؟", "Who takes this task: chat, assistant or agent?"),
    finalQuestion: u("المهمة الجاية بتاعتك… محتاجة مين؟", "Your next task… who does it need?"),
    note: u("الأمثلة توضيحية، وأسماء المزايا بتختلف من تطبيق للتاني. «مساحة العمل» تشبيه مبسّط لنافذة الـ Context.", "Examples are illustrative, and feature names differ between apps. The “workspace” is a simplified picture of the context window."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("الشات والذاكرة والوكيل، في شرائح", "Chat, memory and agents, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "task", art: "a_task", year: u("المهمة", "The task"), mark: u("٠١", "01"), era: u("مهمة كل أسبوع", "Every week"),
        title: u("كل أحد: تقرير التوقفات الأسبوعي", "Every Sunday: the weekly stoppage report"),
        story: [u("كل يوم أحد بتعمل نفس الشغل: تسحب ملف التوقفات من السيستم، وتقارنه بالأسبوع اللي فات، وتكتب ملخص بأهم ٣ أسباب، وتبعته للمدير. ساعتين كل أسبوع، بنفس الخطوات.",
          "Every Sunday you do the same job: pull the stoppage file from the system, compare it with last week, write a summary of the top three causes and send it to the manager. Two hours a week, the same steps."),
        u("المهمة دي ممكن تتعمل بالذكاء الاصطناعي بتلات طرق مختلفة جدًا: شات، ومساعد عنده ذاكرة، ووكيل. والفرق بينهم مش في «ذكاء» الموديل، لأنه ممكن يبقى نفس الموديل في التلاتة. الفرق في اللي حوالين الموديل: إيه اللي بيدخل مساحة العمل بتاعته، وإيه اللي يقدر يعمله.",
          "AI can take this task in three very different ways: a chat, an assistant with memory, and an agent. The difference isn't how “smart” the model is — it can be the same model in all three. The difference is what surrounds the model: what goes in its workspace, and what it is able to do.")],
        answer: u("قبل ما تختار أداة، اكتب خطوات مهمتك. لأن الخطوات هي اللي بتحدد إنت محتاج مين.", "Before choosing a tool, write down your task's steps — the steps decide what you need."),
        idea: u("نفس الموديل، بس اللي حواليه بيفرق.", "The same model; what surrounds it makes the difference.")
      },
      {
        id: "chat", art: "a_chat", year: u("الشات", "Chat"), mark: u("٠٢", "02"), era: u("الطريقة الأولى", "Way one"),
        title: u("الشات: كل محادثة جديدة بتبدأ بمساحة فاضية", "Chat: every new conversation starts with an empty workspace"),
        story: [u("بالشات: بتفتح محادثة، وتلصق البيانات، وتكتب طلبك، وتاخد الملخص، وتنسخه في الإيميل بنفسك. ده شغّال كويس. بس الأحد الجاي لما تفتح محادثة جديدة، الموديل ما يعرفش أي حاجة عن الأحد اللي فات.",
          "With chat: you open a conversation, paste the data, write your request, get the summary and copy it into the email yourself. That works well. But next Sunday, when you open a new chat, the model knows nothing about last Sunday."),
        u("فاكر ليه؟ الموديل نفسه ما بيتغيّرش وإنت بتكلّمه. جوّه نفس المحادثة بيبان إنه فاكر لأن التطبيق بيبعتله المحادثة كلها تاني مع كل رسالة. لكن المحادثة الجديدة مساحة جديدة فاضية، فهتشرح شكل التقرير وأسماء الخطوط من الأول.",
          "Remember why? The model itself doesn't change as you talk to it. Within one chat it seems to remember because the app resends the whole conversation with each message. A new chat is a new, empty workspace — so you explain the report format and the line names all over again.")],
        answer: u("استخدم الشات للسؤال اللي بيخلص في محادثة واحدة. لأن كل محادثة جديدة بتبدأ من الصفر.", "Use chat for a question that ends in one sitting — every new chat starts from zero."),
        idea: u("الشات بيجاوب كويس… وبينسى كل أسبوع.", "Chat answers well… and forgets every week.")
      },
      {
        id: "where", art: "a_where", year: u("الذاكرة", "Memory"), mark: u("٠٣", "03"), era: u("متخزّنة فين؟", "Kept where?"),
        title: u("الذاكرة مش جوّه عقل الموديل", "Memory isn't inside the model's mind"),
        story: [u("لما تطبيق يقولك «أنا فاكر إنك في قسم الجودة»، ده ما معناهوش إن الموديل اتعلّم حاجة عنك. أوزان الموديل، اللي فيها معرفته، ما بتتغيّرش من كلامك معاه. هي اتحددت وقت التدريب وخلاص.",
          "When an app says “I remember you work in quality”, it doesn't mean the model learned something about you. The model's weights, which hold its knowledge, don't change from your conversations. They were fixed during training."),
        u("الذاكرة في الحقيقة ملاحظات مكتوبة متخزّنة برّه الموديل، زي دفتر جنب مساحة العمل. ولما تفتح محادثة جديدة، التطبيق بينقل منه السطور المناسبة ويحطها في المساحة قبل رسالتك. يعني الموديل «بيفتكر» لأنه بيقرا الملاحظات من جديد في أول كل محادثة.",
          "Memory is really written notes stored outside the model, like a notebook next to the workspace. When you open a new chat, the app copies the relevant lines into the workspace before your message. The model “remembers” because it reads those notes afresh at the start of every chat.")],
        answer: u("تعامل مع الذاكرة كملاحظات تقدر تقراها وتعدّلها، مش كعقل بيتعلّم. لأنها فعلًا نص متخزّن برّه، بيتحط في مساحة العمل.", "Treat memory as notes you can read and edit, not a mind that learns — it really is stored text placed in the workspace."),
        idea: u("الذاكرة = دفتر برّه، بيتقري في أول كل محادثة.", "Memory = a notebook outside, read at the start of each chat.")
      },
      {
        id: "kinds", art: "a_kinds", year: u("أنواعها", "Kinds"), mark: u("٠٤", "04"), era: u("تلات مصادر", "Three sources"),
        title: u("تلات أنواع ذاكرة، وكلها بتنتهي في نفس المساحة", "Three kinds of memory, all ending in the same workspace"),
        story: [u("النوع الأول: تعليمات ثابتة إنت بتكتبها مرة واحدة، زي «أنا مهندس جودة، وبحب التقارير في جدول». والنوع التاني: ذاكرة تلقائية، التطبيق بيستنتج فيها حاجات من محادثاتك ويحفظها لوحده، وتقدر تشوفها وتمسحها من الإعدادات.",
          "Kind one: fixed instructions you write once, like “I'm a quality engineer and I like reports as tables”. Kind two: automatic memory, where the app infers things from your chats and saves them itself — you can view and delete them in the settings."),
        u("والنوع التالت: ملفات مشروع، بترفع فيها تقاريرك القديمة ودليل الشغل مرة واحدة. ولما الملفات تبقى كتير، التطبيق ما بيحطهاش كلها في المساحة؛ بيدوّر فيها ويختار الأجزاء اللي تخص سؤالك بس. التلاتة في الآخر سطور في نفس المساحة المحدودة.",
          "Kind three: project files, where you upload your old reports and work guide once. When there are many files, the app doesn't put them all in the workspace; it searches them and picks only the parts relevant to your question. In the end all three are lines in the same limited workspace.")],
        answer: u("حط في التعليمات الثابتة اللي لازم يتطبّق كل مرة، وسيب التفاصيل الكبيرة لملفات المشروع. لأن التعليمات بتتحط دايمًا، والملفات بيتاخد منها اللي يلزم بس.", "Put what must apply every time in the fixed instructions, and leave bulky detail to project files — instructions are always loaded, files only in the parts needed."),
        idea: u("تعليمات، وذاكرة تلقائية، وملفات… والمساحة واحدة.", "Instructions, automatic memory, files… one workspace.")
      },
      {
        id: "stale", art: "a_stale", year: u("تمنها", "Its price"), mark: u("٠٥", "05"), era: u("الذاكرة ليها تمن", "Memory isn't free"),
        title: u("الذاكرة بتاخد مكان… وممكن تبقى قديمة", "Memory takes room… and can go stale"),
        story: [u("بما إن الذاكرة بتتحط في مساحة العمل، فهي بتاخد من نفس المساحة اللي محتاجها لملفك وسؤالك. ذاكرة طويلة مليانة تفاصيل مالهاش لازمة بتزاحم الشغل المهم وبتشتت الانتباه.",
          "Since memory is placed in the workspace, it takes from the same room you need for your file and your question. A long memory full of irrelevant detail crowds out the important work and spreads attention thin."),
        u("والأخطر إنها ممكن تبقى قديمة. التطبيق حفظ من ست شهور «المدير أحمد»، وأحمد اتنقل، والمديرة دلوقتي منى. فالموديل بيلاقي قدامه معلومتين متعارضتين، وممكن يكتب الإيميل لأحمد. معلومة قديمة في الذاكرة بتشدّ التفكير للاتجاه الغلط، بالظبط زي ما شفنا مع الـ Context.",
          "Worse, it can go stale. Six months ago the app saved “manager: Ahmed”; Ahmed has moved on and the manager is now Mona. The model finds two conflicting facts in the workspace and may address the email to Ahmed. Stale information in memory pulls the reasoning the wrong way — exactly as we saw with the Context.")],
        answer: u("راجع الذاكرة كل فترة، وامسح القديم، وقوله صراحة «انسى المعلومة دي» لما حاجة تتغيّر. لأن الموديل ما يعرفش أنهي معلومة اتغيّرت.", "Review memory now and then, delete what's stale, and say plainly “forget this” when something changes — the model can't tell which fact has changed."),
        idea: u("ذاكرة قديمة أخطر من ذاكرة فاضية.", "Stale memory is worse than no memory.")
      },
      {
        id: "assistant", art: "a_assistant", year: u("المساعد", "Assistant"), mark: u("٠٦", "06"), era: u("الطريقة التانية", "Way two"),
        title: u("المساعد: شات ومعاه ذاكرة وملفاتك", "The assistant: chat plus memory and your files"),
        story: [u("دلوقتي نعمل المهمة بمساعد: مشروع فيه تعليمات ثابتة بشكل التقرير، وتقارير الأسابيع اللي فاتت، ودليل أسماء الخطوط. الأحد ده بتكتب «تقرير الأسبوع» وترفع الملف، فيطلع التقرير بالشكل المعتاد من أول مرة، ويقارن بالأسبوع اللي فات لوحده.",
          "Now let's do the task with an assistant: a project with fixed instructions for the report format, past weeks' reports and a guide to line names. This Sunday you write “this week's report” and upload the file, and the report comes out in the usual format first time, comparing with last week on its own."),
        u("وفّرت وقت كتير، بس لاحظ: إنت لسه اللي بتسحب الملف من السيستم، وإنت اللي بتبعت الإيميل. المساعد بيفكّر ويكتب، لكنه ما بيعملش حاجة برّه المحادثة. التنفيذ لسه عليك.",
          "You saved a lot of time, but notice: you still pull the file from the system, and you still send the email. The assistant thinks and writes, but it does nothing outside the conversation. You are its hands.")],
        answer: u("استخدم المساعد للشغل المتكرر على نفس الموضوع. لأنه بيبني على اللي فات بدل ما تعيد الشرح كل مرة.", "Use an assistant for recurring work on the same topic — it builds on what came before instead of you re-explaining each time."),
        idea: u("المساعد فاكر شغلك… والتنفيذ لسه عليك.", "The assistant remembers your work… and you're still its hands.")
      },
      {
        id: "loop", art: "a_loop", year: u("الوكيل", "Agent"), mark: u("٠٧", "07"), era: u("الطريقة التالتة", "Way three"),
        title: u("الوكيل: هدف، وأدوات، وخطوات متكررة لحد ما يخلص", "The agent: a goal, tools, and loops until done"),
        story: [u("الوكيل بتديله هدف مش سؤال: «جهّز تقرير التوقفات الأسبوعي وحضّر الإيميل للمدير». وتديله أدوات: يقرا ملفات، ويحسب، ويكتب مسودة إيميل. وبعدين بيكرر نفس الدورة: يخطط الخطوة الجاية، وينفّذها بأداة، ويشوف النتيجة، ويصحّح، ويكرر.",
          "You give an agent a goal, not a question: “prepare the weekly stoppage report and draft the email to the manager”. And you give it tools: read files, calculate, write an email draft. Then it loops: plan the next step, carry it out with a tool, look at the result, correct, repeat."),
        u("لو قرا الملف ولقى عمود ناقص، بيدوّر عليه في ملف تاني. ولو الحساب طلع غريب، بيراجعه. وبيقف لما الهدف يتحقق، أو لما يوصل لحد إنت محدده من الأول، زي عدد خطوات معيّن، أو «استنى موافقتي قبل ما تبعت».",
          "If it reads the file and finds a missing column, it looks in another file. If a calculation looks odd, it rechecks. It stops when the goal is met, or when it hits a limit you set in advance — a number of steps, or “wait for my approval before sending”.")],
        answer: u("ادّي الوكيل هدف واضح وحدود واضحة للتوقف. لأنه هيفضل يكرر الدورة لحد ما واحد منهم يتحقق.", "Give an agent a clear goal and clear stop limits — it keeps looping until one of them is met."),
        idea: u("الشات بيجاوب. الوكيل بيكرر الخطوات لحد ما يخلص.", "Chat answers. An agent loops until it's done.")
      },
      {
        id: "tools", art: "a_tools", year: u("الأدوات", "Tools"), mark: u("٠٨", "08"), era: u("إزاي بيعمل حاجة؟", "How does it act?"),
        title: u("الموديل ما بيلمسش حاجة… بيكتب طلب، والبرنامج بينفّذ", "The model touches nothing… it writes a request, the program carries it out"),
        story: [u("الموديل لسه آلة نص: بيقرا ويكتب بس. فإزاي «بيقرا ملف»؟ بيكتب طلب بشكل متفق عليه، زي «اقرا ملف توقفات_الأسبوع.xlsx». البرنامج اللي حواليه بيشوف الطلب، ويتأكد إنه مسموح، وينفّذه، ويحط النتيجة في مساحة العمل.",
          "The model is still a text machine: it only reads and writes. So how does it “read a file”? It writes a request in an agreed form, such as “read file weekly_stoppages.xlsx”. The program around it sees the request, checks it is allowed, carries it out and puts the result in the workspace."),
        u("علشان كده الصلاحيات هي اللي بتحدد الوكيل يقدر يعمل إيه، مش الموديل. لو أداة الإرسال مش مسموحة، أقصى حاجة هيعملها إنه يكتب مسودة. والصح إن الأدوات اللي ليها أثر برّه، زي الإرسال والمسح والدفع، تحتاج موافقتك إنت.",
          "That's why permissions decide what an agent can do — not the model. If the send tool isn't allowed, the most it can do is write a draft. And tools with effects outside, such as sending, deleting or paying, should need your approval.")],
        answer: u("ادّي الوكيل أقل صلاحيات تكفي المهمة، وخلّي الأثر الكبير بموافقتك. لأن الغلطة اللي ما عندوش صلاحية يعملها، مش هتحصل.", "Give an agent the fewest permissions the task needs and keep big effects behind your approval — a mistake it has no permission to make cannot happen."),
        idea: u("الموديل بيطلب، والبرنامج بينفّذ، والصلاحيات بتحكم.", "The model asks, the program acts, permissions rule.")
      },
      {
        id: "fills", art: "a_fills", year: u("الامتلاء", "Filling up"), mark: u("٠٩", "09"), era: u("المساحة بتتملي بسرعة", "The workspace fills fast"),
        title: u("ليه الوكيل بيملا المساحة أسرع بكتير من الشات؟", "Why does an agent fill the workspace so much faster than chat?"),
        story: [u("فاكر إن كل حاجة في مساحة العمل بتاخد مكان؟ في الشات، اللي بيتحط هو رسايلك وردوده. لكن في الوكيل، نتيجة كل أداة بتتحط في المساحة كمان: محتوى ملف كامل، ونتايج بحث، ورسالة خطأ، ومحاولة تانية، ونتيجة حساب.",
          "Remember that everything in the workspace takes room? In chat, what goes on it is your messages and its replies. With an agent, every tool result goes in the workspace too: a whole file's contents, search results, an error message, a second attempt, a calculation result."),
        u("ملف إكسل واحد ممكن ياخد عشرات الآلاف من التوكنز لوحده. ومهمة فيها تلاتين خطوة ممكن تملا المساحة في نص ساعة، وده شيء محادثة عادية ممكن ما توصلوش في يوم كامل. علشان كده الوكيل بيقابل حد الـ Context كتير جدًا.",
          "A single Excel file can take tens of thousands of tokens by itself. A thirty-step task can fill the workspace in half an hour — something an ordinary chat might not reach in a whole day. That's why agents hit the Context limit so often.")],
        answer: u("ادّي الوكيل الملفات اللي يحتاجها بس، واطلب منه يقرا الأجزاء المهمة مش الملف كله. لأن كل نتيجة أداة بتاخد جزء من المساحة.", "Give an agent only the files it needs, and ask it to read the relevant parts, not whole files — every tool result eats into the workspace."),
        idea: u("كل أداة بيستخدمها = حاجة جديدة في المساحة.", "Every tool it uses = something new in the workspace.")
      },
      {
        id: "compact", art: "a_compact", year: u("الضغط", "Compacting"), mark: u("١٠", "10"), era: u("بيلخّص ويكمّل", "Summarise and go on"),
        title: u("فبيضغط الـ Context… والوكيل الكويس بيكتب ملاحظاته برّه", "So it compacts the Context… and a good agent writes its notes outside"),
        story: [u("لما المساحة تقرب تتملي، الوكيل بيلخّص الخطوات القديمة ويكمّل، زي ما شفنا في الدرس اللي فات. وده ممكن يضيّع شرط زي «من غير فرع طنطا» في نص المهمة، فتلاقيه فجأة رجّع طنطا في الحساب.",
          "When the workspace nears full, the agent summarises the old steps and carries on, as we saw in the last lesson. That can drop a rule such as “excluding the Tanta branch” mid-task — and suddenly Tanta is back in the calculation."),
        u("علشان كده الوكلاء الكويسين بيكتبوا الخطة والشروط في ملف ملاحظات برّه مساحة العمل، ويرجعوا يقروه بعد كل ضغط. وفي المهام الكبيرة بيقسموا الشغل على وكلاء مساعدين، كل واحد بمساحة جديدة فاضية، ويرجّعوا ملخص قصير بس للوكيل الرئيسي.",
          "That's why good agents write the plan and the rules into a notes file outside the workspace, and re-read it after every compaction. On big tasks they split the work among helper agents, each with a fresh empty workspace, which return only a short summary to the main agent.")],
        answer: u("اكتب الشروط المهمة في ملف أو تعليمات ثابتة يرجعلها الوكيل، وراجع النتيجة النهائية على الشروط دي. لأن أي ضغط ممكن يشيل شرط في النص.", "Put key rules in a file or fixed instructions the agent returns to, and check the final result against them — any compaction may drop a rule midway."),
        idea: u("الوكيل الكويس ما بيعتمدش على مساحة العمل بس.", "A good agent doesn't rely in the workspace alone.")
      },
      {
        id: "choose", art: "a_choose", year: u("تختار إزاي؟", "Choosing"), mark: u("١١", "11"), era: u("على قد المهمة", "Fit the task"),
        title: u("كل واحد ليه شغله… وكل ما القوة تزيد، الرقابة تزيد", "Each has its job… and more power needs more oversight"),
        story: [u("الشات للسؤال السريع اللي بيخلص في محادثة واحدة. والمساعد بذاكرته وملفاته للشغل المتكرر على نفس الموضوع، زي تقريرك الأسبوعي لو إنت اللي بتسحب الملف وتبعته. والوكيل للمهمة اللي فيها خطوات وأدوات، وتستاهل إنك تعرّفها وتراجعها كويس.",
          "Chat for the quick question that ends in one sitting. An assistant with memory and files for recurring work on the same topic — like your weekly report, if you pull the file and send it yourself. An agent for a task with steps and tools that is worth defining and reviewing properly."),
        u("وكل ما الأداة تقدر تعمل أكتر، الغلطة بتبقى أكبر. الشات أقصى غلطاته إجابة غلط إنت شايفها. لكن الوكيل ممكن يبعت إيميل غلط لمديرك. علشان كده الوكيل محتاج صلاحيات محدودة، وحد للتوقف، وموافقتك قبل أي أثر برّه.",
          "And the more a tool can do, the bigger its mistakes. Chat's worst mistake is a wrong answer you can see. An agent could send a wrong email to your manager. That's why an agent needs limited permissions, a stop limit, and your approval before any outside effect.")],
        answer: u("ابدأ بأبسط أداة تكفي المهمة، واطلع خطوة لما تحتاج. لأن الأداة الأقوى أغلى وأبطأ ومحتاجة رقابة أكتر.", "Start with the simplest tool that does the job and step up only when needed — a stronger tool costs more, runs slower and needs more oversight."),
        idea: u("الأداة على قد المهمة، والرقابة على قد الأداة.", "The tool fits the task; the oversight fits the tool.")
      },
      {
        id: "recap", art: "a_recap", year: u("الخلاصة", "Summary"), mark: u("١٢", "12"), era: u("الحكاية في سطر", "The story in one line"),
        title: u("الخلاصة: نفس الموديل، والفرق في مساحة العمل والأدوات", "In short: the same model; the difference is the workspace and the tools"),
        story: [u("نرجع لتقرير الأحد. الشات بيكتبه ويستناك تشرحله كل أسبوع. والمساعد فاكر شكله من ذاكرته وملفاته، بس التنفيذ عليك. والوكيل بيسحب ويحسب ويحضّر الإيميل لوحده، وبيستنى موافقتك قبل ما يبعت.",
          "Back to the Sunday report. Chat writes it and waits for you to explain every week. The assistant remembers its format from memory and files, but you're its hands. The agent pulls, calculates and drafts the email by itself, then waits for your approval before sending."),
        u("وفي التلاتة الموديل ما اتغيّرش: الذاكرة ملاحظات بتتحط في مساحة العمل، والأدوات طلبات البرنامج بينفّذها، والمساحة محدودة فبتتضغط. ولما تفهم ده، هتعرف تختار، وتعرف ليه حصل الغلط لما يحصل. وفي الدرس الجاي هنشوف الذكاء الاصطناعي يقدر يعمل إيه في شغلك.",
          "In all three the model didn't change: memory is notes placed in the workspace, tools are requests the program carries out, and the workspace is limited so it gets compacted. Understand this and you'll know how to choose — and why a mistake happened when it does. In the next lesson we'll see what AI can do in your work.")],
        answer: u("قبل أي مهمة اسأل تلات أسئلة: محتاج يفتكر إيه؟ محتاج يعمل إيه؟ وأراجعه فين؟ لأن الإجابات دي بتختارلك الأداة.", "Before any task ask three questions: what must it remember, what must it do, and where do I check it? The answers choose the tool for you."),
        idea: u("الموديل واحد. إنت اللي بتختار يفتكر إيه ويعمل إيه.", "One model. You choose what it remembers and what it does.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.agentsStory]);
})(window.ACADEMY = window.ACADEMY || {});
