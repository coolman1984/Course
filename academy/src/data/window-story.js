/* Why the Context is limited — the story deck that opens lesson f6 (fourth in unit 0, right after the Prompt & Context deck).
   One hero runs through every slide: a long chat where the model «forgot» the first rule («الأرقام بالجنيه»), and the question
   «ليه نسي اللي قلتهوله في الأول؟». The picture that carries the deck is the Context as a workspace of fixed size: what is on it
   the model sees, what falls off does not exist for it. Each slide gives one rule with its reason («القاعدة، وليه؟»).
   Model names carry a word joiner after the hyphen (GPT-\u20604) so a line never breaks inside them.
   Sizes are rounded public figures; page counts assume ~500 English words a page and ~¾ of a word per token.
   Same slide schema as data/model-story.js; drawings are the w_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.windowStory = {
    id: "window", lesson: "f6",
    kicker: u("ذاكرة الموديل القصيرة · الحكاية كاملة في ٧ دقايق", "The model's short memory · the whole story in 7 minutes"),
    title: u("ليه الـ Context محدود؟ وإزاي الموديل بينسى؟", "Why is the Context limited, and how does a model forget?"),
    lead: u("في الدرس اللي فات عرفنا إن الموديل ما بيشوفش غير الـ Context. في الحكاية دي هنعرف إن المساحة دي ليها حد: كانت صغيرة وكبرت، وليه ما بتكبرش على طول، وإيه اللي بيحصل لما تتملي، وإزاي تختار إنت إيه اللي يفضل قدامه.",
      "In the last lesson we saw that a model sees nothing but the Context. In this story we'll see that this space has a limit: how it was small and grew, why it can't simply keep growing, what happens when it fills up, and how you decide what stays in front of it."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("ليه نسي اللي قلتهوله في الأول؟", "Why did it forget what I told it at the start?"),
    finalQuestion: u("إيه اللي يستاهل مكان في مساحة العمل؟", "What deserves a place in the workspace?"),
    note: u("الأحجام والتواريخ أرقام عامة مقرّبة، وتحويلها لصفحات تقريبي للنص الإنجليزي. «مساحة العمل» تشبيه مبسّط لعملية أعقد.", "Sizes and dates are rounded public figures; page counts are rough, for English text. The “workspace” is a simplified picture of a more complex process."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("ليه الـ Context محدود وإزاي الموديل بينسى، في شرائح", "Why the Context is limited and how a model forgets, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "forgot", art: "w_forgot", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("محادثة طويلة", "A long chat"),
        title: u("قلتله «الأرقام بالجنيه»… وبعد ساعتين كتب بالدولار", "You said “figures in pounds”… two hours later it wrote dollars"),
        story: [u("الساعة تسعة الصبح فتحت محادثة جديدة، وأول رسالة كتبت فيها: «التقرير للمدير العام، وكل الأرقام بالجنيه المصري». وبعدها اشتغلتوا مع بعض: رفعت ملفات المبيعات، وسألت، وعدّلت، وطلبت جداول.",
          "At nine in the morning you opened a new chat and wrote, in the first message: “The report is for the general manager, and every figure is in Egyptian pounds.” Then you worked together: you uploaded the sales files, asked, edited and asked for tables."),
        u("الساعة حداشر طلبت الملخص النهائي، فطلع شكله مظبوط ومرتب… بس الإجمالي مكتوب بالدولار. الموديل ما اتغيّرش، وإنت ما غيّرتش طلبك. طب إيه اللي حصل؟",
          "At eleven you asked for the final summary. It came out neat and well organised… but the total was in dollars. The model didn't change and neither did your request. So what happened?")],
        answer: u("لما الموديل يتجاهل شرط قلته بدري، ما تفترضش إنه «عنيد». الأرجح إن الشرط ده ما بقاش قدامه.", "When a model ignores a rule you gave early on, don't assume it is “stubborn” — most likely the rule is no longer in front of it."),
        idea: u("الموديل ما بينساش زينا. هو بيشتغل على اللي قدامه بس.", "A model doesn't forget the way we do. It only works with what is in front of it.")
      },
      {
        id: "workspace", art: "w_table", year: u("مساحة العمل", "Workspace"), mark: u("٠٢", "02"), era: u("صورة تقرّب الفكرة", "A picture of the idea"),
        title: u("الـ Context مساحة عمل حجمها ثابت", "The Context is a workspace of fixed size"),
        story: [u("اعتبر الـ Context مساحة عمل قدام الموديل. أي حاجة لازم تكون جوّاها علشان يشوفها: تعليمات التطبيق، والملفات اللي رفعتها، ورسايلك، وكمان ردوده هو. ومع كل رسالة جديدة، التطبيق بيبعتله المساحة دي كلها تاني من الأول.",
          "Picture the Context as a workspace in front of the model. Everything has to be placed on it for the model to see it: the app's instructions, the files you uploaded, your messages — and its own replies too. With every new message, the app sends it the whole workspace again from the start."),
        u("وحجم المساحة دي ثابت لكل موديل. طول ما المحادثة قصيرة، كل حاجة جوّاها. لكن لما تتملي، لازم حاجة تخرج علشان الجديد يلاقي مكان. واللي بيخرج ما بيتخزّنش في أي حتة، ده بيختفي بالنسبة للموديل تمامًا.",
          "And the workspace's size is fixed for each model. While the chat is short, everything fits. Once it is full, something has to go to make room for the new. What goes doesn't move to “a corner of its memory” — for the model it simply ceases to exist.")],
        answer: u("اعتبر كل محادثة مساحة محدودة، وفكّر قبل ما تحط فيها حاجة. لأن الموديل ما يقدرش يشوف أي حاجة برّاها.", "Treat every chat as a workspace with limited room and think before you put things on it — the model cannot look at anything off it."),
        idea: u("اللي جوّه المساحة موجود، واللي خرج منها مش موجود.", "What's in the workspace exists; what fell off doesn't.")
      },
      {
        id: "tokens", art: "w_tokens", year: u("المقياس", "Measure"), mark: u("٠٣", "03"), era: u("بنقيس بإيه؟", "Measured in what?"),
        title: u("المساحة بتتقاس بالتوكنز، مش بالصفحات", "The workspace is measured in tokens, not pages"),
        story: [u("فاكر التوكنز من «جوّا الموديل»؟ الموديل بيقطّع النص لحتت صغيرة، والحتت دي هي اللي بتشغل المساحة. كلمة إنجليزي قصيرة ممكن تبقى توكن واحد، وكلمة طويلة ممكن تبقى تلاتة.",
          "Remember tokens from “Inside the model”? The model cuts text into small pieces, and those pieces are what take up room in the workspace. A short English word may be one token; a long word may be three."),
        u("ومعلومة مهمة لينا: العربي بيستهلك توكنز أكتر من الإنجليزي لنفس المعنى، وساعات الضعف. يعني نفس التقرير بالعربي بياخد مساحة أكبر. وملف PDF طويل ممكن ياخد نص المساحة لوحده، وردود الموديل الطويلة بتاكل من نفس المساحة.",
          "And something that matters to us: Arabic uses more tokens than English for the same meaning — sometimes twice as many. So the same report in Arabic takes more room. A long PDF can take half the workspace by itself, and the model's long replies eat into the same space.")],
        answer: u("احسب المساحة بالمحتوى مش بعدد الرسايل. لأن ملف واحد كبير أو رد واحد طويل ممكن يملا المساحة أسرع من عشرين سؤال.", "Count room by content, not by number of messages — one big file or one long reply can fill the workspace faster than twenty questions."),
        idea: u("كل حرف بتحطه بياخد جزء من المساحة.", "Every character in the workspace costs space.")
      },
      {
        id: "grew", art: "w_grew", year: u("٢٠١٩–٢٠٢٤", "2019–2024"), mark: u("٠٤", "04"), era: u("كانت صغيرة… وكبرت", "Small… then big"),
        title: u("المساحة كانت صفحة ونص… وبقت تشيل كتب كاملة", "The workspace was a page and a half… now it's a small library"),
        story: [u("سنة ٢٠١٩ الموديل المشهور وقتها (GPT-\u20602) كان بيشوف حوالي ألف توكن، يعني صفحة ونص تقريبًا. وفي ٢٠٢٠ بقوا ألفين (GPT-\u20603). ولما ChatGPT نزل في آخر ٢٠٢٢ كان حوالي ٤ آلاف، يعني ست صفحات. علشان كده المحادثات الطويلة وقتها كانت بتفقد تركيزها بسرعة.",
          "In 2019 the well-known model of the day (GPT-\u20602) saw about a thousand tokens — roughly a page and a half. In 2020 it was two thousand (GPT-\u20603). When ChatGPT launched at the end of 2022 it was about 4,000 — six pages. That's why long chats back then got muddled so quickly."),
        u("وبعدين الحجم قفز: في ٢٠٢٣ وصل ٣٢ ألف (GPT-\u20604) وبعدها ١٠٠ ألف (Claude)، يعني كتاب متوسط. وفي ٢٠٢٤ وصل مليون توكن (Gemini 1.5)، يعني حوالي ١٥٠٠ صفحة. النهارده موديلات كتير بتشتغل بمئات الآلاف، وفيه موديلات بمليون وأكتر.",
          "Then size leapt: in 2023 it reached 32,000 (GPT-\u20604) and then 100,000 (Claude) — a mid-sized book. In 2024 it reached a million tokens (Gemini 1.5), around 1,500 pages. Today many models work with hundreds of thousands, and some with a million or more.")],
        answer: u("اعرف حجم المساحة في الأداة اللي بتستخدمها، ولاحظ إن النسخ المجانية ساعات بتديك مساحة أقل. لأن الحجم بيختلف من موديل لموديل ومن خطة لخطة.", "Know the workspace size of the tool you use, and note that free tiers sometimes give you less — size differs by model and by plan."),
        idea: u("في خمس سنين المساحة كبرت حوالي ألف مرة.", "In five years the workspace grew about a thousand times.")
      },
      {
        id: "grewwhy", art: "w_grewwhy", year: u("ليه كبرت؟", "Why it grew"), mark: u("٠٥", "05"), era: u("تلات أسباب", "Three reasons"),
        title: u("ليه قدروا يكبّروها؟", "How did they manage to make it bigger?"),
        story: [u("أول سبب: الأجهزة. الموديل بيشتغل على شرايح حسابات فيها ذاكرة سريعة، والذاكرة دي زادت جدًا مع كل جيل. وتاني سبب: الحساب بقى أذكى. المهندسين لقوا طرق ترتيب للحساب نفسه بتخلّي الجهاز يعمل نفس الشغل بذاكرة ووقت أقل.",
          "First: hardware. Models run on compute chips with fast memory, and that memory grew a lot with each generation. Second: smarter computation. Engineers found ways to arrange the same calculation so the chip does the same work with less memory and time."),
        u("وتالت سبب: التدريب. الموديل لازم يتدرّب على نصوص طويلة علشان يعرف يربط أولها بآخرها. فبقوا يكمّلوا تدريبه على نصوص أطول وأطول بالتدريج. ومع ده الطلب زاد: الناس عايزة ترفع عقود كاملة وتقارير سنوية ومشاريع برمجة.",
          "Third: training. A model has to be trained on long texts to learn to connect their beginning to their end, so it was trained further on longer and longer texts, step by step. And demand grew alongside: people want to upload whole contracts, annual reports and software projects.")],
        answer: u("ما تتعاملش مع الحجم الكبير كإنه من غير تمن. لأن كل زيادة جت بمجهود هندسي، وليها تمن لسه موجود: في الوقت، والتكلفة، والجودة.", "Don't treat a big size as free — each increase came from engineering effort and still carries a price in time, cost and quality."),
        idea: u("المساحة كبرت بالهندسة، لكن الحد لسه موجود.", "The workspace grew through engineering — not because the limit went away.")
      },
      {
        id: "square", art: "w_square", year: u("الحد الأول", "Limit 1"), mark: u("٠٦", "06"), era: u("ضعف الكلام = ٤ أضعاف الشغل", "Double the text, 4× the work"),
        title: u("كل كلمة بتبص على كل اللي قبلها", "Every word looks at everything before it"),
        story: [u("في «جوّا الموديل» شفنا الانتباه: كل كلمة بتبص على الكلمات اللي قبلها علشان تفهم معناها. ده سر قوة الموديل، وهو كمان سبب الحد. ٤ كلمات محتاجين ١٠ نظرات. ٨ كلمات محتاجين ٣٦، يعني الكلام اتضاعف والشغل بقى حوالي ٤ أضعاف.",
          "In “Inside the model” we saw attention: every word looks at the words before it to understand its meaning. That is the model's strength — and also the source of the limit. Four words need 10 looks. Eight words need 36: the text doubled and the work became about four times as much."),
        u("ومع مليون توكن، الرقم بيوصل حوالي ٥٠٠ مليار نظرة، وده في كل طبقة من طبقات الموديل. علشان كده تكبير المساحة صعب: كل زيادة في الطول بتكلّف أكتر من اللي قبلها.",
          "With a million tokens the count reaches about 500 billion looks — in every layer of the model. That's why enlarging the workspace is hard: every extra length costs more than the one before.")],
        answer: u("خلّي الـ Context على قد المهمة. لأن الشغل بيكبر أسرع بكتير من طول الكلام.", "Keep the Context sized to the task — the work grows much faster than the length of the text."),
        idea: u("الكلام بيزيد بنسبة، والحساب بيزيد بنسبة أكبر بكتير.", "The text grows a little; the computation grows far more.")
      },
      {
        id: "cost", art: "w_cost", year: u("الحد التاني", "Limit 2"), mark: u("٠٧", "07"), era: u("ذاكرة ووقت وفلوس", "Memory, time, money"),
        title: u("كل حاجة في المساحة بتاخد ذاكرة ووقت وفلوس", "Everything in the workspace costs memory, time and money"),
        story: [u("علشان الموديل يرد بسرعة، بيحتفظ بملاحظة صغيرة عن كل توكن في المساحة جوّه ذاكرة الشريحة نفسها. مساحة أكبر يعني ذاكرة أكتر لكل مستخدم في نفس اللحظة. والذاكرة دي أغلى حاجة في الجهاز.",
          "To reply quickly, the model keeps a small note about every token in the workspace in the chip's own memory. A bigger workspace means more memory for each user at the same moment — and that memory is the most expensive part of the machine."),
        u("وكمان، كل رسالة جديدة بتتقري معاها المساحة كلها. فالمحادثة الطويلة بتبقى أبطأ في الرد، وأغلى في الحساب لأن الخدمة بتحاسب على كل التوكنز اللي بتتقري، وده سبب إن الخطط المجانية ساعات بتقفل المحادثة أو تقصّرها.",
          "And every new message is read together with the whole workspace. So a long chat replies more slowly and costs more, because the service bills for every token it reads — one reason free plans sometimes cap or shorten a conversation.")],
        answer: u("افتح محادثة جديدة لما الموضوع يتغيّر. لأن المحادثة الطويلة بتدفع تمن كل اللي فات في كل رسالة.", "Open a new chat when the topic changes — a long chat pays for everything before it in every message."),
        idea: u("المساحة المليانة أبطأ وأغلى.", "A full workspace is slower and dearer.")
      },
      {
        id: "middle", art: "w_middle", year: u("الحد التالت", "Limit 3"), mark: u("٠٨", "08"), era: u("الكبير مش دايمًا أحسن", "Bigger isn't always better"),
        title: u("حتى لو الملف دخل كله… النص بياخد انتباه أقل", "Even when the whole file fits… the middle gets lost"),
        story: [u("طب ليه ما نحطش كل حاجة وخلاص؟ لأن وجود المعلومة في المساحة مش معناه إنها هتاخد انتباه. دراسة مشهورة سنة ٢٠٢٣ اسمها «الضياع في المنتصف» لقت إن الموديلات بتستخدم المعلومة اللي في أول الكلام وآخره أحسن بكتير من اللي في نصه.",
          "So why not just put everything in? Because being in the workspace doesn't mean getting attention. A well-known 2023 study, “Lost in the Middle”, found that models use information at the start and end of the text far better than information in its middle."),
        u("يعني لو رفعت عقد ٣٠٠ صفحة والشرط المهم في صفحة ١٥٠، ممكن يعدّي عليه. وكل ما المساحة تتملي بكلام ملوش لازمة، الانتباه بيتوزّع أكتر، والإجابة بتضعف حتى لو الحد لسه ما اتملاش.",
          "So if you upload a 300-page contract and the key clause is on page 150, it may pass right over it. And the more the workspace fills with irrelevant text, the thinner the attention is spread and the weaker the answer — even before the limit is reached.")],
        answer: u("ادّيه الجزء اللي يخص سؤالك، وقوله المعلومة المهمة فين. لأن الكلام الزيادة بيسحب الانتباه من المهم.", "Give it the part that concerns your question and tell it where the key fact is — padding pulls attention away from what matters."),
        idea: u("مساحة أكبر مش معناها فهم أكتر.", "More room doesn't mean more understanding.")
      },
      {
        id: "falloff", art: "w_falloff", year: u("النسيان ١", "Forgetting 1"), mark: u("٠٩", "09"), era: u("الأقدم بيخرج الأول", "First in, first out"),
        title: u("لما المساحة تتملي، الأقدم بيخرج الأول", "When the workspace is full, the oldest falls first"),
        story: [u("نرجع لموقفنا. المحادثة طولت والملفات كترت، والمساحة اتملت. ساعتها التطبيق بيعمل حاجة من اتنين: يا يقولك «المحادثة طويلة، افتح واحدة جديدة»، يا يشيل أقدم الرسايل بهدوء علشان يفضل يرد، وغالبًا من غير ما ينبّهك.",
          "Back to our scene. The chat grew long, the files piled up and the workspace filled. At that point the app does one of two things: it tells you “this chat is too long, start a new one”, or it quietly drops the oldest messages so it can keep replying — usually without telling you."),
        u("وأقدم رسالة كانت إيه؟ «كل الأرقام بالجنيه». أهم شرط اتقال في أول دقيقة، فكان أول حاجة خرجت. والموديل لما كتب الملخص ما شافش أي حاجة عن العملة، فاختار الأرجح من خبرته العامة: الدولار.",
          "And what was the oldest message? “Every figure in pounds.” The most important rule, given in the first minute, was the first thing to fall off. When the model wrote the summary it saw nothing about currency, so it chose the most likely option from general experience: dollars.")],
        answer: u("كرّر الشروط المهمة في الطلب المهم نفسه. لأن الشرط اللي اتقال في الأول هو أول حاجة ممكن تخرج.", "Repeat key rules inside the important request itself — a rule given at the start is the first thing that can fall off."),
        idea: u("أقدم رسالة هي أول رسالة بتتنسي.", "The oldest message is the first to be forgotten.")
      },
      {
        id: "compact", art: "w_compact", year: u("النسيان ٢", "Forgetting 2"), mark: u("١٠", "10"), era: u("التلخيص بيضيّع تفاصيل", "Summaries drop details"),
        title: u("وساعات بدل ما يشيل… بيلخّص", "Sometimes instead of dropping… it summarises"),
        story: [u("فيه تطبيقات أذكى: بدل ما ترمي الرسايل القديمة، بتلخّصها في كام سطر وتحط الملخص مكانها. ده اسمه ضغط الـ Context. الملخص بيحافظ على الفكرة العامة: «بنجهّز تقرير مبيعات الربع للمدير».",
          "Some apps are smarter: instead of throwing old messages away, they summarise them in a few lines and put the summary in their place. This is called Context compaction. The summary keeps the general idea: “we're preparing the quarterly sales report for the manager.”"),
        u("بس الملخص بطبيعته بيضيّع تفاصيل: العملة، والاستثناء اللي قلته «ما عدا فرع طنطا»، والرقم الدقيق ٣٫٧٪. والتفاصيل دي بالظبط هي اللي بتفرق بين تقرير مظبوط وتقرير شكله مظبوط. وهنشوف في الدرس الجاي إن الوكلاء بيعملوا الضغط ده كتير جدًا.",
          "But a summary drops details by nature: the currency, the exception you gave (“except the Tanta branch”), the exact 3.7%. Those details are exactly what separate a correct report from one that only looks correct. In the next lesson we'll see that agents compact like this very often.")],
        answer: u("اكتب التفاصيل الحرجة في مكان ثابت برّه المحادثة، والصقها تاني لما تحتاجها. لأن أي ملخص تلقائي ممكن يشيلها.", "Keep critical details somewhere fixed outside the chat and paste them back when needed — any automatic summary may drop them."),
        idea: u("الملخص بيفتكر الحكاية، وبينسى الأرقام.", "A summary remembers the story and forgets the numbers.")
      },
      {
        id: "habits", art: "w_habits", year: u("إنت بتعمل إيه؟", "What you do"), mark: u("١١", "11"), era: u("خمس عادات", "Five habits"),
        title: u("خمس عادات تحمي شروطك المهمة", "Five habits that protect your key rules"),
        story: [u("الحل مش إنك تخاف من المحادثات الطويلة. الحل إنك تبقى إنت اللي بتقرر إيه اللي يدخل المساحة: الشروط المهمة تتقال في الأول وتتكرر في الطلب المهم، وكل مهمة جديدة في محادثة جديدة ومعاها ملخص قصير إنت كاتبه.",
          "The answer isn't to fear long chats. It's to be the one who decides what goes in the workspace: key rules stated at the start and repeated in the important request, and each new task in a new chat, with a short summary you wrote yourself."),
        u("وادّيه من الملف الجزء اللي يخص سؤالك، مش الملف كله. وقبل الخطوة الكبيرة اطلب منه يكتب الشروط اللي فاكرها، فلو حاجة خرجت هتعرف قبل ما تظهر غلطة في التقرير. وخلّي عندك «ورقة Context» محفوظة برّه تلصقها لما تحتاجها.",
          "Give it the part of the file that concerns your question, not the whole file. Before a big step, ask it to list the rules it remembers — if something fell off, you'll see it before it shows up in the report. And keep a “Context sheet” saved outside the chat to paste in when needed.")],
        answer: u("قبل أي خطوة مهمة، اسأله: «إيه الشروط اللي إنت شغال بيها دلوقتي؟». لأن ده بيكشف اللي خرج في ثانية.", "Before any important step, ask: “What rules are you working with right now?” — it reveals what fell off in seconds."),
        idea: u("إنت اللي بتحدد إيه اللي يدخل المساحة، مش الموديل.", "You decide what goes in, not the model.")
      },
      {
        id: "recap", art: "w_recap", year: u("الخلاصة", "Summary"), mark: u("١٢", "12"), era: u("الحكاية في سطر", "The story in one line"),
        title: u("الخلاصة: مساحة محدودة، وإنت اللي بتختار اللي جوّاها", "In short: a limited workspace, and you choose what's on it"),
        story: [u("نرجع لسؤالنا: ليه نسي «بالجنيه»؟ لأن الـ Context مساحة محدودة. الحساب بيكبر أسرع من الكلام، وكل حاجة في المساحة بتاخد ذاكرة ووقت وفلوس، ونص الكلام الطويل بياخد انتباه أقل. ولما المساحة تتملي، الأقدم بيخرج أو بيتلخّص.",
          "Back to our question: why did it forget “in pounds”? Because the Context is a limited workspace: the computation grows faster than the text, space costs memory, time and money, and a long middle gets lost. When the workspace is full, the oldest falls off or gets summarised."),
        u("والفكرة الأساسية: اللي جوّه المساحة بس هو اللي موجود. وفي الدرس الجاي هنشوف إزاي الذاكرة والمساعد والوكيل بيتعاملوا مع المساحة دي، وليه الوكيل كل شوية بيضغط الـ Context.",
          "The sentence to leave with: only what is in the workspace exists. In the next lesson we'll see how memory, assistants and agents deal with this workspace — and why an agent keeps compacting its Context.")],
        answer: u("اختار اللي يتحط قدامه بنفس الاهتمام اللي بتختار بيه كلام الـ Prompt. لأن المساحة محدودة، والموديل بيفهم على قد اللي قدامه.", "Choose what goes in front of it with the same care you give the words of your Prompt — space is limited, and the model understands only as much as is in front of it."),
        idea: u("مش مهم المساحة قد إيه، المهم إيه اللي جوّاها.", "What matters isn't the size of the workspace but what's on it.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.windowStory]);
})(window.ACADEMY = window.ACADEMY || {});
