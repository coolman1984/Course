/* Unit 0 — the opening and closing pages: what AI is, the course goal and journey, abilities, from question to assistant, limits. */
(function () {
  const L = (ar, en) => ({ ar, en });

  ACAD.L({
    id: "u0-model", unit: "u0", pages: [2, 34, 6], icon: "🔮", diff: 1, mins: 12, tags: ["foundations", "models"],
    title: L("كيف يعمل نموذج الذكاء الاصطناعي من الداخل؟", "How does an AI model work inside?"),
    hook: L("الكتاب يبدأ بستة أسئلة. هنا نجيب عنها بالترتيب: من «ما الذكاء الاصطناعي؟» إلى «كيف يكتب إجابة كاملة؟».", "The book opens with six questions. Here we answer them in order: from “what is AI?” to “how does it write a whole answer?”."),
    book: L(`نستخدم الذكاء الاصطناعي اليوم في الكتابة والتحليل والبحث والتعلم واتخاذ القرارات وأتمتة المهام {p2}. لكن خلف النتائج المدهشة **أسئلة تستحق أن نفهمها بوضوح**:
1. ما هو الذكاء الاصطناعي فعلًا؟
2. ما معنى نموذج ذكاء اصطناعي؟
3. كيف تتعلم الآلة من البيانات؟
4. أين تُخزَّن المعرفة داخل النموذج؟
5. كيف يفهم اللغة ويولّد الإجابات؟
6. كيف تطورنا من البرامج التقليدية إلى المساعدين والوكلاء الأذكياء؟

وفي موضع آخر يجيب الكتاب عن جزء منها: المعاملات (الأوزان) هي **أرقام داخلية يتعلمها النموذج أثناء التدريب، وهي مخزن معرفته** {p34}، والتوكن قطعة نص صغيرة (كلمة أو جزء منها) {p34}، والبرومبت **يُترجَم إلى تعليمات يفهمها النموذج، ويستخدم السياق لبناء «الوعي» حول مشروعك** {p6}.

> قد يبدو الذكاء الاصطناعي غامضًا عندما نرى النتيجة فقط. لكن عندما نفهم ما يحدث خلف الشاشة، يتحول الغموض إلى فهم، والفهم إلى قدرة حقيقية على الاستخدام {p2}.`,
      `Today we use AI for writing, analysis, research, learning, decisions and automating tasks {p2}. But behind the impressive results are **questions worth understanding clearly**:
1. What is AI, really?
2. What is an AI model?
3. How does a machine learn from data?
4. Where is knowledge stored inside the model?
5. How does it understand language and generate answers?
6. How did we evolve from traditional programs to smart assistants and agents?

Elsewhere the book answers part of this: parameters (weights) are **internal numbers the model learns during training, and they are its store of knowledge** {p34}; a token is a small piece of text (a word or part of one) {p34}; and the prompt **is translated into instructions the model understands, while context is used to build “awareness” of your project** {p6}.

> AI can seem mysterious when we only see the result. Once we understand what happens behind the screen, mystery becomes understanding, and understanding becomes real ability {p2}.`),
    levels: {
      simple: L(`تخيّل موظفًا جديدًا قرأ ملايين الكتب والرسائل والتقارير، لكنه **لم يحفظها حرفيًا**؛ بل تعلّم منها «إحساسًا» بأي كلمة تأتي عادةً بعد أي كلمة. عندما تسأله سؤالًا، لا يبحث في درج عن الإجابة؛ بل **يكتبها كلمة بعد كلمة**، ويختار في كل مرة الكلمة الأنسب حسب ما تعلمه وحسب ما قلته له.

- **الذكاء الاصطناعي**: برامج تؤدي مهامًا كنا نظنها تحتاج عقلًا بشريًا، مثل الكتابة والتلخيص والتصنيف.
- **النموذج**: هو «عقل» هذا البرنامج: ملف ضخم من الأرقام تعلّم الأنماط من البيانات.
- **التعلم**: يشبه طالبًا يحل آلاف التمارين ويصحح نفسه بعد كل خطأ حتى يتحسن.

**سؤال بسيط:** لو كان النموذج يكتب الكلمة «الأكثر احتمالًا»، فهل يضمن ذلك أن تكون المعلومة صحيحة؟ (فكّر فيها قبل أن تنتقل للمستوى التالي.)`,
        `Imagine a new employee who has read millions of books, emails and reports, but **did not memorise them word for word**; instead they learned a “feel” for which word usually comes after which. When you ask a question, they don’t look the answer up in a drawer; they **write it word by word**, each time choosing the most fitting next word given what they learned and what you told them.

- **AI**: software that does tasks we thought needed a human mind, like writing, summarising and classifying.
- **The model**: the “brain” of that software — a huge file of numbers that learned patterns from data.
- **Learning**: like a student solving thousands of exercises and correcting themselves after each mistake until they improve.

**A simple question:** if the model writes the “most likely” word, does that guarantee the information is true? (Think about it before moving to the next level.)`),
      mech: L(`## ١. من نص إلى أرقام
النص يُقطَّع إلى **[[t:token|توكنات]]**: كلمات أو أجزاء كلمات {p34}، وكل توكن يتحول إلى رقم يفهمه الحاسوب.

## ٢. التعلم من البيانات (التدريب)
أثناء التدريب يرى النموذج نصوصًا ضخمة، ويحاول توقّع التوكن التالي. عندما يخطئ تُعدَّل **[[t:parameters|المعاملات]]** قليلًا حتى يقل الخطأ. التكرار مليارات المرات يجعل المعاملات تحمل أنماط اللغة والمعرفة. لذلك يقول الكتاب إنها **مخزن معرفته** {p34}: المعرفة ليست في جدول أو قاعدة بيانات، بل موزعة في أرقام.

## ٣. فهم طلبك
طلبك و**[[t:context|السياق]]** الذي تعطيه يدخلان معًا. ما يستطيع النموذج «رؤيته» في الطلب الواحد محدود بـ**[[t:context-window|نافذة السياق]]** {p34}.

## ٤. توليد الإجابة
يحسب النموذج احتمال كل توكن ممكن، ويختار واحدًا، ثم يضيفه ويكرر الحساب للتوكن الذي بعده… حتى تكتمل الإجابة. «درجة الحرارة» تتحكم في جرأة الاختيار.

## ٥. من البرامج إلى الوكلاء
- **البرنامج التقليدي**: قواعد يكتبها مبرمج: «إذا حدث كذا فافعل كذا».
- **التعلم الآلي**: البرنامج يتعلم القاعدة من الأمثلة.
- **المساعد التوليدي**: نموذج لغوي يفهم طلبك ويكتب إجابة.
- **الوكيل**: نموذج يُعطى هدفًا وأدوات ويكرر المحاولة حتى يحقق الهدف {p39}.`,
        `## 1. From text to numbers
Text is cut into **[[t:token|tokens]]**: words or parts of words {p34}, and each token becomes a number the computer can handle.

## 2. Learning from data (training)
During training the model sees huge amounts of text and tries to predict the next token. When it is wrong, its **[[t:parameters|parameters]]** are nudged slightly to reduce the error. Repeating this billions of times makes the parameters hold the patterns of language and knowledge. That is why the book calls them **its store of knowledge** {p34}: knowledge isn’t in a table or database; it is spread across numbers.

## 3. Understanding your request
Your request and the **[[t:context|context]]** you give enter together. What the model can “see” in one request is limited by the **[[t:context-window|context window]]** {p34}.

## 4. Generating the answer
The model computes a probability for every possible token, picks one, appends it, and repeats for the next token… until the answer is complete. “Temperature” controls how bold the choice is.

## 5. From programs to agents
- **Traditional program**: rules a programmer writes: “if this happens, do that”.
- **Machine learning**: the program learns the rule from examples.
- **Generative assistant**: a language model that understands your request and writes an answer.
- **Agent**: a model given a goal and tools that keeps trying until the goal is met {p39}.`),
      practice: L(`## ماذا يعني ذلك في شغلك اليومي؟
- **السياق يغيّر الاحتمالات**: نفس السؤال «اكتب تقريرًا» ينتج نصًا عامًا. لكن «اكتب تقرير مبيعات أسبوعيًا لمدير الفرع، من هذا الجدول، في خمس نقاط» يغيّر احتمالات كل كلمة لصالح ما تريده. هذا هو سر العناصر الخمسة في [[l:u1-five|الدرس القادم]].
- **الأرقام تحتاج مصدرًا**: النموذج يكتب أرقامًا «تبدو» منطقية. في التقارير الرسمية، اطلب منه ذكر مصدر كل رقم {p8}، وتحقق بنفسك {p16}.
- **النموذج لا يعرف ملفات شركتك** إلا إذا أعطيته إياها أو ربطته بمصادرها {p41}. لذلك ارفع المستند أو الصق الجدول.
- **العربية أغلى**: النص العربي يستهلك توكنات أكثر لنفس المعنى، وأحيانًا الضعف {p34}، فخذ ذلك في الحسبان مع المستندات الطويلة.

## مثال من المصنع
مشرف إنتاج يسأل: «لماذا انخفضت الكفاءة؟» بدون بيانات. النموذج سيكتب أسبابًا شائعة عامة (صيانة، خامات، عمالة) لأنها **الأكثر احتمالًا** في النصوص التي تدرب عليها، لا لأنها سبب مشكلتك أنت. عندما يلصق المشرف سجل التوقفات للأسبوع، تتغير الإجابة لتعتمد على بياناته.`,
        `## What does this mean in your daily work?
- **Context changes the probabilities**: the same request “write a report” gives generic text. But “write a weekly sales report for the branch manager, from this table, in five points” shifts the probability of every word towards what you want. That is the secret of the five elements in [[l:u1-five|the next lesson]].
- **Numbers need a source**: the model writes numbers that “look” plausible. For official reports, ask it to cite the source of each number {p8} and check it yourself {p16}.
- **The model doesn’t know your company’s files** unless you give them to it or connect it to their sources {p41}. So upload the document or paste the table.
- **Arabic costs more**: Arabic text uses more tokens for the same meaning, sometimes double {p34}; keep that in mind with long documents.

## A factory example
A production supervisor asks: “Why did efficiency drop?” with no data. The model will list common generic causes (maintenance, materials, staffing) because they are **most likely** in the text it trained on, not because they caused your problem. Once the supervisor pastes the week’s stoppage log, the answer starts to rely on their data.`),
      adv: L(`## الحدود التي تنتج عن طريقة العمل نفسها
- **الطلاقة ليست صدقًا**: النموذج مُدرَّب على إنتاج نص محتمل، لا نص صحيح. لذلك **قد يعطي معلومة خاطئة بثقة** {p41}. هذا ليس عطلًا عابرًا، بل نتيجة طبيعية لطريقة التوليد.
- **المعرفة لها تاريخ**: ما تعلمه النموذج متوقف عند تاريخ تدريبه، فبعض المعلومات قد تكون قديمة أو ناقصة {p41}.
- **نافذة السياق ليست ذاكرة دائمة**: ما خارج النافذة لا يراه النموذج، وفي المحادثات الطويلة قد يفقد تفاصيل البداية.
- **الحجم ليس كل شيء**: نموذج أكبر يحمل معرفة أكثر لكنه أبطأ وأغلى، ونموذج متوسط مضبوط لمهمة بعينها قد يتفوق عليه فيها {p34}.

## متى لا تعتمد على «التوقع» وحده؟
في الحسابات المالية والقرارات الحساسة. الكتاب واضح: **لا تجعل طبقة الذكاء تحسب أرقامًا**؛ الحساب للقواعد الثابتة، والذكاء للتفسير والتصنيف والتوصية {p38}. وراجع بشريًا أي قرار حساس قبل الاعتماد {p41}.

## سؤال للتفكير
لماذا قد يعطيك النموذج إجابتين مختلفتين لنفس السؤال؟ (تلميح: الاختيار الاحتمالي ودرجة الحرارة.) وماذا يعني ذلك لتقرير يجب أن يكون ثابتًا كل شهر؟`,
        `## Limits that come from how it works
- **Fluency is not truth**: the model is trained to produce likely text, not true text. So **it may give wrong information with confidence** {p41}. This isn’t a passing glitch; it follows naturally from how generation works.
- **Knowledge has a date**: what the model learned stops at its training date, so some information may be outdated or incomplete {p41}.
- **The context window isn’t permanent memory**: the model can’t see what falls outside the window, and long chats may lose early details.
- **Size isn’t everything**: a larger model holds more knowledge but is slower and costlier, and a mid-size model tuned for a task may beat it at that task {p34}.

## When not to rely on “prediction” alone
In financial calculations and sensitive decisions. The book is clear: **don’t let the AI layer calculate numbers**; calculation belongs to fixed rules, AI to explaining, classifying and recommending {p38}. Have a human review any sensitive decision before relying on it {p41}.

## A question to think about
Why might the model give two different answers to the same question? (Hint: probabilistic choice and temperature.) What does that mean for a report that must be consistent every month?`),
    },
    card: {
      what: L("برنامج تعلّم أنماط اللغة والمعرفة من بيانات ضخمة، ويكتب الإجابة بتوقع التوكن التالي مرة بعد مرة.", "A program that learned language and knowledge patterns from huge data and writes answers by predicting the next token, again and again."),
      why: L("لأن فهم طريقة عمله يشرح لماذا تحتاج سياقًا واضحًا ولماذا تراجع النتيجة.", "Because understanding how it works explains why you need clear context and why you review results."),
      how: L("نص ← توكنات ← حساب احتمالات بالمعاملات ← اختيار توكن ← تكرار حتى تكتمل الإجابة.", "Text → tokens → probabilities computed with parameters → pick a token → repeat until done."),
      inside: L("مليارات الأرقام (المعاملات) تعدّلت أثناء التدريب حتى صارت تخزن الأنماط والمعرفة {p34}.", "Billions of numbers (parameters) adjusted during training until they store patterns and knowledge {p34}."),
      relation: L("هو الأساس لكل ما بعده: السياق والبرومبت والحدود والوكلاء.", "It underpins everything that follows: context, prompts, limits and agents."),
      example: L("نفس سؤال «لماذا انخفضت الكفاءة؟» ينتج إجابة عامة بدون بيانات، ومحددة مع سجل التوقفات.", "The same “why did efficiency drop?” gives a generic answer without data and a specific one with the stoppage log."),
      apply: L("أعطِ النموذج بياناتك وسياقك دائمًا، واطلب مصدرًا لكل رقم.", "Always give the model your data and context, and ask for a source for every number."),
      mistakes: L("اعتبار الإجابة الواثقة إجابة صحيحة، وافتراض أن النموذج يعرف ملفات شركتك.", "Treating a confident answer as a correct one, and assuming the model knows your company files."),
      check: L("هل تستطيع أن تشرح لزميل لماذا قد يخطئ النموذج بثقة؟", "Can you explain to a colleague why the model can be wrong with confidence?"),
      next: L("هدف الكورس ورحلة المستويات الثمانية.", "The course goal and the eight-level journey."),
    },
    keys: L(["النموذج يتوقع التوكن التالي، ولا «يعرف» الحقيقة.", "المعاملات (الأوزان) هي مخزن المعرفة، وتتعلم أثناء التدريب {p34}.", "السياق الذي تعطيه يغيّر احتمالات كل كلمة في الإجابة.", "الطلاقة ليست دليلًا على الصحة: قد يخطئ بثقة {p41}.", "تطورنا من قواعد مكتوبة ← تعلم من الأمثلة ← مساعد توليدي ← وكيل بأهداف وأدوات."],
      ["The model predicts the next token; it doesn’t “know” the truth.", "Parameters (weights) store knowledge and are learned during training {p34}.", "The context you give shifts the probability of every word in the answer.", "Fluency is no proof of truth: it can be confidently wrong {p41}.", "We moved from written rules → learning from examples → generative assistants → agents with goals and tools."]),
    scene: "model-flow", lab: "tokens", prompts: ["u0-p-explain"],
    quick: [
      { q: L("أين تُخزَّن «معرفة» النموذج حسب الكتاب؟", "Where is the model’s “knowledge” stored, according to the book?"), opts: L(["في قاعدة بيانات من الأسئلة والإجابات", "في المعاملات (الأوزان) التي تعلّمها أثناء التدريب", "في الإنترنت، يبحث فيه عند كل سؤال", "في نافذة السياق"], ["In a database of questions and answers", "In the parameters (weights) learned during training", "On the internet, searched for every question", "In the context window"]), a: 1, why: L("المعاملات أرقام داخلية يتعلمها النموذج أثناء التدريب، وهي مخزن معرفته {p34}. نافذة السياق هي ما يقرؤه في الطلب الحالي فقط.", "Parameters are internal numbers learned during training; they are its store of knowledge {p34}. The context window is only what it reads in the current request.") },
      { q: L("نموذج كتب رقمًا دقيق المظهر في تقرير. ما الاستنتاج الصحيح؟", "A model wrote a precise-looking number in a report. What is the right conclusion?"), opts: L(["الرقم صحيح لأن النموذج واثق", "الرقم يحتاج مصدرًا وتحققًا، لأن النموذج يولّد النص المحتمل لا الصحيح بالضرورة", "الرقم خاطئ دائمًا", "يكفي أن نسأله مرة ثانية"], ["The number is correct because the model is confident", "The number needs a source and a check, because the model produces likely text, not necessarily true text", "The number is always wrong", "Asking again is enough"]), a: 1, why: L("قد يعطي النموذج معلومة خاطئة بثقة {p41}، لذلك يطلب الكتاب ذكر مصدر كل رقم والتحقق من كل رقم يدخل تقريرًا رسميًا {p8, p16}.", "The model may give wrong information confidently {p41}, so the book asks for a source for every number and a check of every number that enters an official report {p8, p16}.") },
    ],
    related: ["u0-assistant", "u0-limits", "u5-models"], terms: ["token", "parameters", "context", "context-window", "training"],
  });

  ACAD.L({
    id: "u0-journey", unit: "u0", pages: [1, 3, 4], icon: "🎯", diff: 1, mins: 8, tags: ["foundations"],
    title: L("هدف الكورس ورحلة المستويات الثمانية", "The course goal and the eight-level journey"),
    hook: L("من «أنا أعرف أستخدم الذكاء الاصطناعي» إلى «عندي مشكلة، وأعرف كيف أحولها إلى نظام ذكي».", "From “I can use AI” to “I have a problem and I know how to turn it into a smart system”."),
    book: L(`**الهدف: من التشتت إلى بناء بيئة عمل أذكى** {p3}. بنهاية الكورس ستتمكن من:
- فهم قدرات الذكاء الاصطناعي وحدوده بوضوح.
- استخدامه كشريك عمل في التحليل والتفكير.
- اكتشاف المهام القابلة للأتمتة في عملك.
- تنظيم البيانات وربط الخطوات والملفات.
- بناء حلول عملية لإدارتك واتخاذ قرارات أسرع.
- الانتقال من تحسين مهمة واحدة إلى تحسين سير العمل بالكامل.

> الهدف ليس فقط أن تستخدم أدوات الذكاء الاصطناعي… بل أن ترى عملك كنظام متكامل، وتعرف أين يمكن للتقنية أن تصنع أثرًا حقيقيًا {p3}.

**رحلة التعلم والتدرج** {p4} في ثمانية مستويات: مساعد شخصي ← عقل ثانٍ ← موظف رقمي ← أتمتة ← أداة ← تطبيق ← نظام ← فريق رقمي ذكي. في البداية قد تقول: «أنا أعرف أستخدم الذكاء الاصطناعي». وفي النهاية ستقول: «عندي مشكلة، وأعرف كيف أحولها إلى نظام ذكي».`,
      `**The goal: from scattered to a smarter workplace** {p3}. By the end of the course you will be able to:
- understand AI’s abilities and limits clearly;
- use it as a work partner for analysis and thinking;
- spot the automatable tasks in your work;
- organise data and connect steps and files;
- build practical solutions for your department and decide faster;
- move from improving one task to improving the whole workflow.

> The goal isn’t just to use AI tools… it’s to see your work as one integrated system and know where technology can create real impact {p3}.

**The learning journey** {p4} has eight levels: personal assistant → second brain → digital employee → automation → tool → application → system → smart digital team. At the start you might say: “I can use AI”. At the end you will say: “I have a problem, and I know how to turn it into a smart system”.`),
    levels: {
      simple: L(`فكّر في سلّم من ثماني درجات. الدرجة الأولى سهلة: تسأل الذكاء الاصطناعي فيرد عليك، كأنه **سكرتير ذكي**. وفي الدرجة الأخيرة تدير **فريقًا رقميًا** يعمل نيابة عنك، وأنت تتابع وتقرر.

لا أحد يقفز إلى آخر السلم مرة واحدة. كل درجة تعطيك مهارة تحتاجها في التي بعدها: لن تبني أداة جيدة قبل أن تعرف كيف تصف المهمة بوضوح، ولن تبني نظامًا قبل أن تنجح في أداة.

**اسأل نفسك:** في أي درجة أنت الآن؟ معظم الناس في الدرجة الأولى، ويستخدمون الذكاء الاصطناعي كمحرك بحث سريع {p7}.`,
        `Think of an eight-step ladder. The first step is easy: you ask AI and it answers, like a **smart secretary**. On the last step you run a **digital team** that works for you while you follow up and decide.

Nobody jumps to the top at once. Each step gives you a skill you need for the next: you won’t build a good tool before you can describe a task clearly, and you won’t build a system before a tool succeeds.

**Ask yourself:** which step are you on now? Most people are on the first, using AI as a fast search engine {p7}.`),
      mech: L(`## ما الذي يتغير من مستوى لآخر؟
ثلاثة أشياء تكبر مع كل درجة:
1. **حجم ما تسلّمه للذكاء الاصطناعي**: سؤال ← مهمة كاملة ← عملية متكررة ← سلسلة عمليات.
2. **مدة بقاء الحل**: إجابة تُنسى ← أداة تعمل كل أسبوع ← نظام يعمل وحده.
3. **دورك أنت**: من كاتب الأسئلة إلى **مصمم النظام** الذي يحدد الأهداف والقواعد ويراجع القرارات.

## كيف تتوزع المستويات على الكتاب؟
- **١–٣** (مساعد، عقل ثانٍ، موظف رقمي): [[l:u1-five|الدليل الأول]] بأقسامه الأربعة.
- **٤–٥** (أتمتة، أداة): القفزة الأخيرة في الدليل الأول {p13}، و[[l:u2-principles|الدليل الثاني]]، و[[l:u3-stages|الثالث]].
- **٦** (تطبيق): [[l:u4-localapp|الدليل الرابع]].
- **٧–٨** (نظام، فريق رقمي): [[l:u5-system|الدليل الخامس]].`,
        `## What changes from level to level?
Three things grow at each step:
1. **How much you hand to AI**: a question → a whole task → a repeating process → a chain of processes.
2. **How long the solution lasts**: a forgotten answer → a weekly tool → a system that runs by itself.
3. **Your role**: from question-writer to **system designer** who sets goals and rules and reviews decisions.

## How the levels map onto the book
- **1–3** (assistant, second brain, digital employee): [[l:u1-five|Guide 1]] and its four sections.
- **4–5** (automation, tool): the final leap of Guide 1 {p13}, [[l:u2-principles|Guide 2]] and [[l:u3-stages|Guide 3]].
- **6** (application): [[l:u4-localapp|Guide 4]].
- **7–8** (system, digital team): [[l:u5-system|Guide 5]].`),
      practice: L(`## مثال: موظفة مشتريات تصعد السلم
- **مساعد**: تطلب صياغة رسالة لمورّد متأخر.
- **عقل ثانٍ**: تضع دليل المشتريات وسياسات الشركة في دفتر، وتسأله: «هل يحتاج هذا الشراء ثلاثة عروض أسعار؟».
- **موظف رقمي**: تكلّفه بمقارنة ثلاثة عروض في جدول مع توصية.
- **أتمتة/أداة**: ماكرو يجمع طلبات الشراء الأسبوعية في تقرير واحد.
- **تطبيق**: لوحة تفتحها بنقرة تعرض الطلبات المتأخرة.
- **نظام**: وصول طلب جديد يبدأ سلسلة: فحص ← تصنيف ← إشعار المسؤول.
- **فريق رقمي**: وكيل يجمع العروض، ووكيل يحلل، ووكيل يراجع، وهي توافق على القرار.

**طبّق الآن:** اكتب مهمة واحدة من شغلك، وحدد في أي مستوى تحلها اليوم، وما المستوى التالي الممكن لها.`,
        `## Example: a purchasing officer climbs the ladder
- **Assistant**: drafts a message to a late supplier.
- **Second brain**: puts the purchasing guide and company policies in a notebook and asks: “Does this purchase need three quotes?”
- **Digital employee**: has it compare three quotes in a table with a recommendation.
- **Automation/tool**: a macro that gathers weekly purchase requests into one report.
- **Application**: a one-click dashboard of late requests.
- **System**: a new request triggers a chain: check → classify → notify the owner.
- **Digital team**: one agent collects quotes, one analyses, one reviews, and she approves the decision.

**Apply now:** write one task from your work, note which level you solve it at today, and the next level it could reach.`),
      adv: L(`## تحذيرات الصعود
- **لا تقفز درجتين**: البدء بأكبر مشكلة عندك يفشل لأنها الأعقد والأكثر استثناءات، فتنطفئ الحماسة. ابدأ بأصغر مهمة متكررة {p16}.
- **ليس كل شيء يستحق الصعود**: مهمة نادرة أو قواعدها متغيرة تبقى أسرع باليد {p17}. الصعود للمستوى الأعلى قرار له تكلفة.
- **الأدوات تتغير، والمنهج يبقى**: الكتاب نفسه يذكّر أن خريطة النماذج تتغير كل أسابيع {p35}، لذلك المهارة الدائمة هي: وصف المهمة بدقة، والتحقق، وبناء الأنظمة.
- **الهدف هو الأثر لا الإعجاب**: «النتيجة المبهرة التي لا تُستخدم في عمل فعلي لا قيمة لها». المعيار: هل تغيّر شيء في عملك هذا الأسبوع؟ {p16}`,
        `## Warnings for the climb
- **Don’t skip two steps**: starting with your biggest problem fails because it is the most complex with the most exceptions, and enthusiasm dies. Start with the smallest repetitive task {p16}.
- **Not everything deserves to climb**: a rare task or one with shifting rules stays faster by hand {p17}. Moving up has a cost.
- **Tools change; the method stays**: the book itself notes the model map changes every few weeks {p35}, so the lasting skill is describing tasks precisely, verifying, and building systems.
- **The aim is impact, not admiration**: “an impressive result not used in real work has no value”. The test: did something change in your work this week? {p16}`),
    },
    card: {
      what: L("هدف الكورس: أن ترى عملك كنظام وتعرف أين تصنع التقنية أثرًا، عبر ثمانية مستويات متدرجة.", "The course goal: see your work as a system and know where technology creates impact, through eight graded levels."),
      why: L("لأن التعلم بلا سلّم يتحول إلى تجربة أدوات متفرقة بلا أثر.", "Because learning without a ladder becomes scattered tool-tasting with no impact."),
      how: L("كل مستوى يزيد حجم ما تسلّمه للذكاء الاصطناعي ومدة بقاء الحل ودورك كمصمم.", "Each level increases what you hand to AI, how long the solution lasts, and your role as designer."),
      inside: L("المهارة الأساسية الثابتة: وصف المهمة بدقة، ثم التحقق، ثم الربط.", "The constant core skill: describe the task precisely, verify, then connect."),
      relation: L("يربط كل أدلة الكتاب الخمسة في مسار واحد.", "It ties the book’s five guides into one path."),
      example: L("موظفة مشتريات تبدأ برسالة لمورد وتنتهي بفريق رقمي يقارن العروض.", "A purchasing officer starts with a supplier email and ends with a digital team comparing quotes."),
      apply: L("حدد مستوى مهمة واحدة اليوم والمستوى التالي الممكن لها.", "Identify the level of one task today and its next possible level."),
      mistakes: L("القفز إلى النظام قبل إتقان الطلب الواضح، والبدء بأكبر مشكلة.", "Jumping to systems before mastering clear requests; starting with the biggest problem."),
      check: L("هل تستطيع ذكر المستويات الثمانية بالترتيب ومثال لكل منها؟", "Can you list the eight levels in order with an example of each?"),
      next: L("ماذا يستطيع الذكاء الاصطناعي أن يفعل في العمل فعلًا؟", "What can AI actually do at work?"),
    },
    keys: L(["الهدف: أن ترى عملك كنظام متكامل وتعرف أين تصنع التقنية أثرًا حقيقيًا {p3}.", "ثمانية مستويات: مساعد ← عقل ثانٍ ← موظف رقمي ← أتمتة ← أداة ← تطبيق ← نظام ← فريق رقمي {p4}.", "كل مستوى يعتمد على مهارة المستوى الذي قبله.", "ابدأ بأصغر مهمة متكررة، لا بأكبر مشكلة {p16}."],
      ["Goal: see your work as one integrated system and know where technology creates real impact {p3}.", "Eight levels: assistant → second brain → digital employee → automation → tool → application → system → digital team {p4}.", "Each level relies on the skill of the one before.", "Start with the smallest repetitive task, not the biggest problem {p16}."]),
    scene: "journey", prompts: ["u0-p-map"],
    quick: [
      { type: "order", q: L("رتّب هذه المستويات كما وردت في رحلة التعلم:", "Put these levels in the order of the learning journey:"), items: L(["مساعد شخصي", "عقل ثانٍ", "أتمتة", "تطبيق", "فريق رقمي ذكي"], ["Personal assistant", "Second brain", "Automation", "Application", "Smart digital team"]), why: L("الترتيب في الكتاب {p4}: مساعد، عقل ثانٍ، موظف رقمي، أتمتة، أداة، تطبيق، نظام، فريق رقمي ذكي.", "The book’s order {p4}: assistant, second brain, digital employee, automation, tool, application, system, smart digital team.") },
      { q: L("ما العبارة التي يقولها المتدرب في نهاية الرحلة؟", "What does the learner say at the end of the journey?"), opts: L(["أنا أعرف أستخدم الذكاء الاصطناعي", "أنا أعرف كل الأدوات الجديدة", "عندي مشكلة، وأعرف كيف أحولها إلى نظام ذكي", "أنا أبرمج بلغة بايثون"], ["I can use AI", "I know all the new tools", "I have a problem, and I know how to turn it into a smart system", "I code in Python"]), a: 2, why: L("هذا هو التحول الذي يحدده الكتاب {p4}: من مستخدم إلى من يحوّل المشكلات إلى أنظمة.", "That is the shift the book defines {p4}: from user to someone who turns problems into systems.") },
    ],
    related: ["u0-capabilities", "u1-habit"], req: [], terms: ["automation", "system", "agent"],
  });

  ACAD.L({
    id: "u0-capabilities", unit: "u0", pages: [5], icon: "💼", diff: 1, mins: 8, tags: ["foundations", "analysis"],
    title: L("كيف يساعدك الذكاء الاصطناعي في العمل؟", "How does AI help you at work?"),
    hook: L("ست قدرات عملية، وسلسلة واحدة تحوّل البيانات إلى قرار.", "Six practical abilities, and one chain that turns data into a decision."),
    book: L(`يمكن للذكاء الاصطناعي أن **يختصر الوقت، ويرفع جودة العمل**، ويساعدك في التحليل والبحث والكتابة والمراجعة واتخاذ القرار بشكل أسرع وأوضح {p5}.

**أهم القدرات العملية:**
1. **التحليل**: تحليل ملفات Excel كبيرة، وتحليل عدة ملفات PDF، ومقارنة التقارير، واكتشاف الأنماط والمشكلات.
2. **التلخيص واستخراج المعلومات**: تلخيص التقارير الطويلة، واستخراج القرارات والأرقام، وتحويل مستندات كبيرة إلى ملخص تنفيذي.
3. **البحث داخل المعرفة**: البحث داخل ملفات الشركة، والإجابة عن السياسات والإجراءات، وربط المعلومات من أكثر من مصدر.
4. **الكتابة وإعادة الصياغة**: كتابة تقارير ورسائل وعروض تقديمية، وتبسيط المحتوى، وتغيير الأسلوب حسب الجمهور.
5. **المقارنة والمراجعة**: مقارنة الخطط والمستندات، ومراجعة البيانات، واكتشاف التناقضات والنواقص.
6. **دعم القرار والتوقع**: تحليل البيانات السابقة، وبناء سيناريوهات، وتقييم البدائل، وتحديد المخاطر والفرص.

**من البيانات إلى القرار:** يجمع ← يحلل ← يختصر ← يقارن ← يقترح.

> كلما زادت جودة البيانات والسياق، زادت قيمة النتيجة {p5}.`,
      `AI can **save time and raise the quality of work**, and help you analyse, research, write, review and decide faster and more clearly {p5}.

**The key practical abilities:**
1. **Analysis**: analysing large Excel files and several PDFs, comparing reports, spotting patterns and problems.
2. **Summarising and extraction**: summarising long reports, extracting decisions and numbers, turning large documents into an executive summary.
3. **Searching knowledge**: searching company files, answering about policies and procedures, linking information from several sources.
4. **Writing and rephrasing**: writing reports, messages and presentations, simplifying content, adapting style to the audience.
5. **Comparing and reviewing**: comparing plans and documents, reviewing data, spotting contradictions and gaps.
6. **Decision support and forecasting**: analysing past data, building scenarios, evaluating options, identifying risks and opportunities.

**From data to decision:** collect → analyse → condense → compare → suggest.

> The better the data and context, the more valuable the result {p5}.`),
    levels: {
      simple: L(`تخيّل أن عندك **مساعدًا سريع القراءة جدًا**. تعطيه ملفًا من مئة صفحة فيقرؤه في ثوانٍ، ويقول لك أهم خمس نقاط، ويقارنه بملف الشهر الماضي، ويكتب لك رسالة للمدير.

لكن هذا المساعد يعتمد كليًا على **ما تعطيه**. لو أعطيته ملفًا ناقصًا أو قديمًا، فسيكتب ملخصًا ناقصًا أو قديمًا بنفس الثقة. لذلك الجملة الأهم في الصفحة: **جودة البيانات والسياق تحدد قيمة النتيجة**.

**جرّب في ذهنك:** أي قدرة من الست ستوفر لك أكبر وقت هذا الأسبوع؟`,
        `Imagine a **very fast-reading assistant**. You hand it a hundred-page file; it reads it in seconds, tells you the five key points, compares it with last month’s file and drafts a message to your manager.

But this assistant depends entirely on **what you give it**. Give it an incomplete or outdated file and it writes an incomplete or outdated summary with the same confidence. That is why the key sentence on the page is: **data and context quality decide the value of the result**.

**Try in your head:** which of the six abilities would save you the most time this week?`),
      mech: L(`## السلسلة خطوة بخطوة
1. **يجمع**: يقرأ ما تعطيه من ملفات ونصوص. لا يرى إلا ما وصله.
2. **يحلل**: يبحث عن الأنماط والعلاقات والأرقام غير الطبيعية.
3. **يختصر**: يحوّل الكثير إلى القليل المهم.
4. **يقارن**: يضع الخيارات أو الفترات أو المستندات جنبًا إلى جنب.
5. **يقترح**: يقدم توصية أو بدائل، **والقرار يبقى لك** {p41}.

## لماذا البيانات والسياق تحديدًا؟
كل خطوة في السلسلة تبني على التي قبلها. خطأ في «يجمع» (ملف ناقص) يمر عبر التحليل والاختصار والمقارنة ويصل إلى «يقترح» على شكل توصية مقنعة وخاطئة. وهذا نفس منطق [[l:u2-analysis|فحص الجودة أولًا]] في الدليل الثاني {p19}.`,
        `## The chain step by step
1. **Collect**: reads the files and text you give it. It sees only what reaches it.
2. **Analyse**: looks for patterns, relationships and abnormal numbers.
3. **Condense**: turns a lot into the little that matters.
4. **Compare**: puts options, periods or documents side by side.
5. **Suggest**: offers a recommendation or options — **the decision stays yours** {p41}.

## Why data and context specifically?
Each step builds on the one before. An error in “collect” (a missing file) flows through analysis, condensing and comparing, and arrives at “suggest” as a convincing but wrong recommendation. Same logic as [[l:u2-analysis|quality first]] in Guide 2 {p19}.`),
      practice: L(`## القدرات الست في أقسام مختلفة
| القدرة | مثال عملي |
|---|---|
| التحليل | المبيعات: «أي فرع انخفضت مبيعاته وما المنتج المسؤول؟» |
| التلخيص | الإدارة: تحويل محضر اجتماع طويل إلى ٣ أسطر وقرارات ومسؤولين |
| البحث في المعرفة | الموارد البشرية: «كم يوم إجازة يستحق موظف بعد سنة؟» من سياسة الشركة |
| الكتابة | خدمة العملاء: رد مهذب ومختصر على شكوى |
| المقارنة والمراجعة | المشتريات: مقارنة ثلاثة عروض أسعار واكتشاف شرط مختلف |
| دعم القرار | المصنع: ثلاثة سيناريوهات لتغيير موعد الصيانة |

**نصيحة:** ابدأ بالقدرة التي تستهلك وقتك أكثر، وجرّبها على مهمة حقيقية صغيرة.`,
        `## The six abilities across departments
| Ability | Practical example |
|---|---|
| Analysis | Sales: “Which branch dropped, and which product caused it?” |
| Summarising | Admin: turn long meeting notes into 3 lines plus decisions and owners |
| Knowledge search | HR: “How many leave days after one year?” from company policy |
| Writing | Customer service: a polite, short reply to a complaint |
| Comparing & reviewing | Purchasing: compare three quotes and spot a different clause |
| Decision support | Factory: three scenarios for moving the maintenance date |

**Tip:** start with the ability that eats most of your time, and try it on a small real task.`),
      adv: L(`## أين تتوقف القدرات؟
- **«يحلل» لا يعني «يحسب بدقة دائمًا»**: للأرقام المهمة اطلب كودًا أو معادلة تحسب، أو تحقق يدويًا، ولا تعتمد على حساب نصي {p38}.
- **«البحث في المعرفة» يحتاج مصادرك**: بدون ملفات الشركة سيجيب من معرفة عامة قد لا تنطبق عليك {p41}. الحل: [[l:u1-brain|العقل الثاني]].
- **«يقترح» ليس «يقرر»**: القرارات الحساسة تحتاج مراجعة بشرية، والذكاء الاصطناعي لا يتحمل مسؤولية القرار {p41}.
- **الخصوصية**: قبل رفع بيانات العمل، راجع سياسة شركتك ولا تُدخل بيانات حساسة بدون ضوابط {p13, p41}.`,
        `## Where do the abilities stop?
- **“Analyse” doesn’t mean “always computes precisely”**: for important numbers, ask for code or a formula, or check by hand; don’t rely on text arithmetic {p38}.
- **“Knowledge search” needs your sources**: without company files it answers from general knowledge that may not apply to you {p41}. The fix: [[l:u1-brain|the second brain]].
- **“Suggest” isn’t “decide”**: sensitive decisions need human review, and AI doesn’t bear responsibility for the decision {p41}.
- **Privacy**: before uploading work data, check company policy and don’t enter sensitive data without controls {p13, p41}.`),
    },
    card: {
      what: L("ست قدرات: التحليل، التلخيص، البحث في المعرفة، الكتابة، المقارنة والمراجعة، دعم القرار.", "Six abilities: analysis, summarising, knowledge search, writing, comparing & reviewing, decision support."),
      why: L("لتعرف أين يوفر وقتك فعلًا، بدل تجربته عشوائيًا.", "To know where it really saves your time, instead of random trial."),
      how: L("يجمع ← يحلل ← يختصر ← يقارن ← يقترح.", "Collect → analyse → condense → compare → suggest."),
      inside: L("كل خطوة تبني على التي قبلها، فخطأ البيانات ينتقل إلى التوصية.", "Each step builds on the last, so a data error carries into the recommendation."),
      relation: L("يطبّق مبدأ «التوقع» من الدرس السابق: النتيجة تتبع المدخلات.", "Applies the “prediction” idea from the last lesson: output follows input."),
      example: L("تلخيص محضر اجتماع إلى ٣ أسطر وقرارات بمسؤول وموعد.", "Condensing meeting notes into 3 lines plus decisions with owner and date."),
      apply: L("اختر القدرة الأكثر استهلاكًا لوقتك وجرّبها على مهمة صغيرة حقيقية.", "Pick the ability that costs you most time and try it on a small real task."),
      mistakes: L("إعطاؤه بيانات ناقصة ثم الثقة في التوصية.", "Giving it incomplete data, then trusting the recommendation."),
      check: L("هل تستطيع ربط كل قدرة بمثال من قسمك؟", "Can you link each ability to an example from your department?"),
      next: L("كيف تتحول المحادثة إلى مساعد استراتيجي ثم وكيل؟", "How does chat become a strategic assistant, then an agent?"),
    },
    keys: L(["ست قدرات: تحليل، تلخيص، بحث في المعرفة، كتابة، مقارنة ومراجعة، دعم قرار {p5}.", "السلسلة: يجمع ← يحلل ← يختصر ← يقارن ← يقترح.", "كلما زادت جودة البيانات والسياق زادت قيمة النتيجة {p5}.", "الاقتراح ليس قرارًا: القرار ومسؤوليته لك {p41}."],
      ["Six abilities: analysis, summarising, knowledge search, writing, comparing & reviewing, decision support {p5}.", "The chain: collect → analyse → condense → compare → suggest.", "Better data and context mean more valuable results {p5}.", "A suggestion isn’t a decision: the decision and its responsibility are yours {p41}."]),
    scene: "data-decision", prompts: ["u0-p-capabilities"],
    quick: [
      { q: L("ملف المبيعات ينقصه أسبوع كامل، وطلبت من الذكاء الاصطناعي توصية. ما المتوقع؟", "The sales file misses a whole week and you ask AI for a recommendation. What to expect?"), opts: L(["توصية دقيقة لأن النموذج قوي", "توصية مقنعة الشكل لكنها مبنية على صورة ناقصة", "رفض تلقائي للمهمة", "سيكمل الأسبوع الناقص من الإنترنت"], ["An accurate recommendation, the model is strong", "A convincing-looking recommendation built on an incomplete picture", "An automatic refusal", "It will fill the missing week from the internet"]), a: 1, why: L("كل خطوة في السلسلة تبني على التي قبلها؛ لذلك جودة البيانات تحدد قيمة النتيجة {p5}.", "Each step builds on the last; data quality decides the result’s value {p5}.") },
      { q: L("أي مما يلي ليس من القدرات الست في الكتاب؟", "Which of these is NOT one of the book’s six abilities?"), opts: L(["المقارنة والمراجعة", "دعم القرار والتوقع", "تحمّل مسؤولية القرار", "البحث داخل المعرفة"], ["Comparing and reviewing", "Decision support and forecasting", "Bearing responsibility for the decision", "Searching knowledge"]), a: 2, why: L("الذكاء الاصطناعي يدعم القرار لكنه لا يتحمل مسؤوليته {p41}.", "AI supports decisions but does not bear responsibility for them {p41}.") },
    ],
    related: ["u0-model", "u2-analysis", "u1-brain"], req: ["u0-model"], terms: ["context", "decision-support"],
  });

  ACAD.L({
    id: "u0-assistant", unit: "u0", pages: [6], icon: "🧑‍💼", diff: 1, mins: 10, tags: ["foundations", "prompting", "agents"],
    title: L("من السؤال إلى مساعدك الاستراتيجي", "From a question to your strategic assistant"),
    hook: L("القوة ليست في الإجابة، بل في فهم السياق. ومن هنا يبدأ الطريق من الشات إلى الوكيل.", "The power isn’t in the answer but in understanding context. That’s where the road from chat to agent begins."),
    book: L(`ليست قوة الذكاء الاصطناعي في الإجابة فقط، بل في قدرته على **فهم السياق، وتحليل المشكلة، وتقديم حلول عملية تناسب هدفك** {p6}.

**المفاهيم الأساسية:**
1. **السياق (Context)**: كل المعلومات التي تعطيها للذكاء الاصطناعي ليفهم صورتك وهدفك والمشكلة بالكامل.
2. **البرومبت (Prompt)**: جزء من السياق، يحدد المهمة المطلوبة والطريقة التي تريد بها الإجابة.
3. **أهمية السياق**: كلما كان السياق أوضح وأغنى، كان فهم النموذج أدق والنتيجة أفضل.
4. **ماذا يحدث داخل النموذج؟** البرومبت يُترجَم إلى تعليمات يفهمها النموذج، ويستخدم السياق لبناء «الوعي» حول مشروعك.

**أدواتك في هذا الجزء:** Claude متميز في التحليل العميق والبرمجة وفهم الملفات الطويلة والمعقدة. وChatGPT مناسب للمحادثة والتحليل والكتابة والمشاريع المتنوعة.

**من شات إلى وكيل ذكي (AI Agent):** الشات التقليدي: تسأل سؤالًا وتحصل على إجابة ← المساعد الشخصي: يفهمك ويتذكر السياق ويساعدك باستمرار ← الوكيل الذكي: يخطط ويستخدم أدوات وينفذ مهام ويتابع النتائج.

> كل شيء يبدأ من سياق واضح وبرومبت ذكي {p6}.`,
      `AI’s power isn’t only in answering; it is in **understanding context, analysing the problem, and offering practical solutions that fit your goal** {p6}.

**Core concepts:**
1. **Context**: all the information you give AI so it understands your situation, goal and the whole problem.
2. **Prompt**: part of the context; it defines the task and how you want the answer.
3. **Why context matters**: the clearer and richer the context, the more accurate the model’s understanding and the better the result.
4. **What happens inside the model?** The prompt is translated into instructions the model understands, and context is used to build “awareness” of your project.

**Your tools here:** Claude excels at deep analysis, coding and understanding long, complex files. ChatGPT suits conversation, analysis, writing and varied projects.

**From chat to AI agent:** traditional chat: ask a question, get an answer → personal assistant: understands you, remembers context, helps continuously → AI agent: plans, uses tools, carries out tasks and follows up results.

> Everything starts with clear context and a smart prompt {p6}.`),
    levels: {
      simple: L(`تخيّل أنك تطلب من زميل جديد: «جهّز التقرير». سيسألك: أي تقرير؟ لمن؟ بأي شكل؟ متى؟ الذكاء الاصطناعي **لا يسأل دائمًا**؛ أحيانًا يخمّن ويكمل.

- **البرومبت** هو جملتك: «جهّز التقرير».
- **السياق** هو كل ما حولها: أنه تقرير مبيعات سبتمبر، للمدير الإقليمي، من هذا الملف، في صفحة واحدة.

والفرق بين الشات والمساعد والوكيل يشبه الفرق بين: **موظف استقبال** يجيب سؤالك ويمشي، و**سكرتير** يتذكر مواعيدك ويتابع معك، و**مدير مشروع** تعطيه هدفًا فيخطط وينفذ ويرجع لك بالنتيجة.`,
        `Imagine asking a new colleague: “Prepare the report.” They will ask: which report? for whom? in what format? by when? AI **doesn’t always ask**; sometimes it guesses and carries on.

- **The prompt** is your sentence: “Prepare the report.”
- **The context** is everything around it: it’s the September sales report, for the regional manager, from this file, on one page.

The difference between chat, assistant and agent is like the difference between a **receptionist** who answers and moves on, a **secretary** who remembers your schedule and follows up, and a **project manager** who takes a goal, plans, executes and returns with the result.`),
      mech: L(`## السياق أكبر من البرومبت
البرومبت جزء من السياق {p6}. السياق يشمل أيضًا: الملفات المرفقة، والرسائل السابقة في المحادثة، وتعليمات ثابتة مثل ملف [[t:claude-md|CLAUDE.md]] في المشاريع {p27}. كل هذا يدخل [[t:context-window|نافذة السياق]] ويغيّر احتمالات الإجابة (راجع [[l:u0-model|كيف يعمل النموذج]]).

## ما الذي يضيفه كل مستوى؟
| | الشات | المساعد الشخصي | الوكيل |
|---|---|---|---|
| الذاكرة | الرسالة الحالية | يتذكر السياق | يتذكر الهدف والخطوات |
| الفعل | يكتب نصًا | يساعدك باستمرار | يستخدم أدوات وينفذ |
| التكرار | مرة واحدة | معك في المحادثة | يكرر حتى يحقق الهدف |

الوكيل يُعطى **هدفًا، وأدوات، وتكرارًا**: ينفذ، ويرى النتيجة، ويصحح، حتى يتحقق الهدف أو يتوقف عند حد محدد سلفًا {p39}.`,
        `## Context is bigger than the prompt
The prompt is part of the context {p6}. Context also includes attached files, earlier messages in the chat, and standing instructions such as a [[t:claude-md|CLAUDE.md]] file in projects {p27}. All of this enters the [[t:context-window|context window]] and shifts the answer’s probabilities (see [[l:u0-model|how the model works]]).

## What each level adds
| | Chat | Personal assistant | Agent |
|---|---|---|---|
| Memory | the current message | remembers context | remembers the goal and steps |
| Action | writes text | helps continuously | uses tools and executes |
| Iteration | once | with you in the chat | repeats until the goal is met |

An agent is given **a goal, tools and iteration**: it acts, sees the result, corrects, until the goal is met or it stops at a preset limit {p39}.`),
      practice: L(`## نفس الطلب بثلاث درجات من السياق
- **ضعيف:** «اكتب رسالة لعميل متأخر في الدفع.»
- **أفضل:** «اكتب رسالة مهذبة لعميل تأخر ٣٠ يومًا في سداد فاتورة بقيمة ٤٥ ألف جنيه.»
- **مساعد استراتيجي:** «نحن شركة توزيع، والعميل شريك منذ ٥ سنوات ودفعه منتظم عادةً، وتأخر ٣٠ يومًا في فاتورة ٤٥ ألف جنيه. هدفي استلام المبلغ مع الحفاظ على العلاقة. اكتب رسالة قصيرة بنبرة ودية، واقترح خيار تقسيط واحدًا، واختم بطلب رد خلال أسبوع.»

## أي أداة أستخدم؟
الكتاب يقترح {p6}: **Claude** للتحليل العميق والملفات الطويلة والبرمجة، و**ChatGPT** للمحادثة والكتابة والمشاريع المتنوعة. والمهم ليس اسم الأداة، بل جودة السياق الذي تعطيه.`,
        `## The same request with three levels of context
- **Weak:** “Write a message to a client who is late paying.”
- **Better:** “Write a polite message to a client 30 days late on a 45,000 EGP invoice.”
- **Strategic assistant:** “We’re a distribution company; the client has been a partner for 5 years and usually pays on time, and is 30 days late on a 45,000 EGP invoice. My goal is to collect while keeping the relationship. Write a short, friendly message, offer one instalment option, and end by asking for a reply within a week.”

## Which tool?
The book suggests {p6}: **Claude** for deep analysis, long files and coding; **ChatGPT** for conversation, writing and varied projects. What matters isn’t the tool’s name but the quality of the context you give.`),
      adv: L(`## سياق أكثر ≠ نتيجة أفضل دائمًا
- **السياق المشتت يضر**: لو أضفت ٤٠ مستندًا والسؤال يخص ٦ فقط، يزيد التشويش. فعّل المصادر المعنية فقط فتدقّ الإجابة {p12}.
- **السياق السري خطر**: لا تضع بيانات حساسة بدون ضوابط واضحة {p41}، وراجع سياسة شركتك قبل رفع أي مستند {p13}.
- **الوكيل يحتاج حدودًا**: قدرته على التنفيذ تعني أن خطأه أكبر أثرًا. لذلك يحدد الكتاب: أقل صلاحية ممكنة، وسقف للتكلفة والمحاولات، وموافقة بشرية على الإرسال والحذف {p40}.
- **«الوعي» مجاز**: النموذج لا يفهم مشروعك كما يفهمه إنسان، بل يستخدم السياق لتوجيه احتمالاته. عامل نتائجه كمسودة ذكية، لا كحكم نهائي.`,
        `## More context ≠ always a better result
- **Scattered context hurts**: if you add 40 documents and the question concerns only 6, noise grows. Enable only the relevant sources and the answer sharpens {p12}.
- **Confidential context is risky**: don’t add sensitive data without clear controls {p41}, and check company policy before uploading any document {p13}.
- **An agent needs limits**: its ability to act means its mistakes weigh more. Hence the book’s rules: least privilege, caps on cost and attempts, human approval for sending and deleting {p40}.
- **“Awareness” is a metaphor**: the model doesn’t understand your project as a person does; it uses context to steer its probabilities. Treat its output as a smart draft, not a final verdict.`),
    },
    card: {
      what: L("السياق: كل ما تعطيه للنموذج ليفهم صورتك. والبرومبت: الجزء الذي يحدد المهمة وشكل الإجابة {p6}.", "Context: everything you give the model to understand your situation. Prompt: the part that defines the task and answer format {p6}."),
      why: L("لأن الإجابة لا تكون أدق من السياق الذي بُنيت عليه.", "Because an answer can’t be more precise than the context it rests on."),
      how: L("البرومبت يُترجم إلى تعليمات، والسياق يوجّه احتمالات الإجابة نحو مشروعك.", "The prompt becomes instructions; context steers the answer’s probabilities towards your project."),
      inside: L("كل السياق يدخل نافذة السياق، وما خارجها لا يراه النموذج.", "All context enters the context window; what’s outside it, the model can’t see."),
      relation: L("يمهد للعناصر الخمسة في الدليل الأول وللوكلاء في الدليل الخامس.", "Leads to the five elements (Guide 1) and agents (Guide 5)."),
      example: L("رسالة تحصيل لعميل قديم منتظم الدفع تختلف كليًا عن رسالة لعميل جديد.", "A collection message to a long-standing punctual client differs completely from one to a new client."),
      apply: L("قبل أي طلب مهم، اكتب ثلاثة أسطر سياق: من أنت، ما الوضع، ما الهدف.", "Before any important request, write three lines of context: who you are, the situation, the goal."),
      mistakes: L("طلب قصير بلا سياق ثم لوم الأداة على النتيجة العامة.", "A short request without context, then blaming the tool for a generic result."),
      check: L("هل تفرّق بين البرومبت والسياق، وبين المساعد والوكيل؟", "Can you tell prompt from context, and assistant from agent?"),
      next: L("حدود الذكاء الاصطناعي: استخدمه بذكاء ولا تعتمد عليه وحده.", "AI’s limits: use it smartly, don’t rely on it alone."),
    },
    keys: L(["القوة في فهم السياق وتحليل المشكلة، لا في الإجابة فقط {p6}.", "البرومبت جزء من السياق؛ السياق هو الصورة الكاملة.", "شات ← مساعد يتذكر ← وكيل يخطط وينفذ بأدوات.", "Claude للتحليل العميق والملفات الطويلة، وChatGPT للمحادثة والكتابة {p6}.", "كل شيء يبدأ من سياق واضح وبرومبت ذكي."],
      ["The power is in understanding context and analysing the problem, not just answering {p6}.", "The prompt is part of the context; context is the full picture.", "Chat → assistant that remembers → agent that plans and acts with tools.", "Claude for deep analysis and long files; ChatGPT for conversation and writing {p6}.", "Everything starts with clear context and a smart prompt."]),
    scene: "chat-agent", prompts: ["u0-p-context"],
    quick: [
      { q: L("ما العلاقة بين البرومبت والسياق حسب الكتاب؟", "What is the relation between prompt and context in the book?"), opts: L(["هما الشيء نفسه", "البرومبت جزء من السياق يحدد المهمة وشكل الإجابة", "السياق جزء من البرومبت", "لا علاقة بينهما"], ["They are the same", "The prompt is part of the context, defining the task and answer format", "Context is part of the prompt", "They are unrelated"]), a: 1, why: L("الكتاب يعرّف البرومبت بأنه «جزء من السياق، ويحدد المهمة المطلوبة والطريقة» {p6}.", "The book defines the prompt as “part of the context; it defines the task and the way” {p6}.") },
      { q: L("ما الذي يميز الوكيل الذكي عن المساعد الشخصي؟", "What distinguishes an AI agent from a personal assistant?"), opts: L(["يكتب أسرع", "يخطط ويستخدم أدوات وينفذ مهامًا ويتابع النتائج", "يتذكر السياق", "يتحدث بالعربية"], ["It writes faster", "It plans, uses tools, carries out tasks and tracks results", "It remembers context", "It speaks Arabic"]), a: 1, ex: [null, null, L("تذكّر السياق صفة المساعد الشخصي أصلًا.", "Remembering context is already the personal assistant’s trait."), null], why: L("المساعد يفهمك ويتذكر السياق، أما الوكيل فيخطط ويستخدم أدوات وينفذ ويتابع {p6}.", "The assistant understands and remembers; the agent plans, uses tools, executes and follows up {p6}.") },
    ],
    related: ["u0-model", "u1-five", "u5-agents"], req: ["u0-model"], terms: ["context", "prompt", "agent", "context-window"],
  });

  ACAD.L({
    id: "u0-limits", unit: "u0", pages: [41], icon: "🛡️", diff: 1, mins: 9, tags: ["foundations", "safety"],
    title: L("استخدمه بذكاء… ولا تعتمد عليه وحده", "Use it smartly… don’t rely on it alone"),
    hook: L("ثمانية حدود يجب أن تعرفها، وخمس خطوات تحوّل الذكاء الاصطناعي من مخاطرة إلى شريك.", "Eight limits you must know, and five steps that turn AI from a risk into a partner."),
    book: L(`الذكاء الاصطناعي قوي جدًا، لكنه **ليس معصومًا من الخطأ**. أفضل استخدام له هو أن **يعمل معك، لا بدلًا منك** {p41}.

**أهم الحدود التي يجب أن تعرفها:**
1. قد يعطي معلومة خاطئة بثقة.
2. قد يسيء فهم السؤال إذا كان السياق ناقصًا.
3. جودة النتيجة تعتمد على جودة البيانات والتعليمات.
4. القرارات الحساسة تحتاج مراجعة بشرية قبل الاعتماد.
5. لا يعرف بيانات شركتك إلا إذا وفرتها له أو ربطته بمصادرها.
6. بعض المعلومات قد تكون قديمة أو غير مكتملة.
7. لا يجب إدخال بيانات حساسة بدون ضوابط واضحة.
8. هو يدعم القرار، لكنه لا يتحمل مسؤولية القرار.

**أفضل استخدام واعٍ:** حدد الهدف ← أعطه السياق ← راجع النتيجة ← تأكد من المصادر ← اتخذ القرار.

> أفضل نتيجة = إنسان يفكر + بيانات جيدة + ذكاء اصطناعي {p41}.`,
      `AI is very powerful, but **not infallible**. Its best use is to **work with you, not instead of you** {p41}.

**The key limits to know:**
1. It may give wrong information with confidence.
2. It may misunderstand the question if context is missing.
3. Result quality depends on the quality of data and instructions.
4. Sensitive decisions need human review before relying on them.
5. It doesn’t know your company’s data unless you provide it or connect it to its sources.
6. Some information may be outdated or incomplete.
7. Sensitive data must not be entered without clear controls.
8. It supports the decision but doesn’t bear responsibility for it.

**The best conscious use:** set the goal → give context → review the result → check the sources → make the decision.

> Best result = a thinking human + good data + AI {p41}.`),
    levels: {
      simple: L(`فكّر في الذكاء الاصطناعي كـ**متدرب ذكي جدًا وسريع جدًا**، لكنه جديد في شركتك. يكتب بطلاقة، ويقرأ بسرعة، ويقترح أفكارًا جيدة. لكنه:
- لا يعرف أسرار شغلكم إلا إذا أخبرته.
- أحيانًا يقول معلومة غلط وهو واثق جدًا.
- لا يوقّع على القرار؛ أنت من يوقّع.

هل تعطي متدربًا جديدًا قرار صرف مليون جنيه بدون مراجعة؟ بالطبع لا. ونفس المنطق هنا.`,
        `Think of AI as a **very smart, very fast intern** who is new to your company. It writes fluently, reads quickly and suggests good ideas. But it:
- doesn’t know your work’s specifics unless you tell it;
- sometimes states something wrong with great confidence;
- doesn’t sign the decision — you do.

Would you let a new intern approve a million-pound payment without review? Of course not. Same logic here.`),
      mech: L(`## من أين تأتي هذه الحدود؟
كل حد له سبب في [[l:u0-model|طريقة عمل النموذج]]:
- **الخطأ بثقة**: لأنه يولّد النص الأكثر احتمالًا، والاحتمال ليس صدقًا.
- **سوء الفهم**: لأن السياق الناقص يترك فراغات يملؤها بأكثر الافتراضات شيوعًا.
- **المعلومات القديمة**: لأن معرفته متوقفة عند تاريخ تدريبه.
- **لا يعرف بيانات شركتك**: لأن معاملاته تعلمت من بيانات عامة لا من ملفاتكم.

## لماذا خمس خطوات بهذا الترتيب؟
**حدد الهدف** أولًا لأن كل ما بعده يُقاس به. **أعطه السياق** ليقل التخمين. **راجع النتيجة** بعين ناقدة. **تأكد من المصادر** لكل رقم وادعاء. **اتخذ القرار** أنت، لأن المسؤولية لك. وهي نفس روح [[l:u1-mistakes|برومبت التحقق قبل الاعتماد]] {p8}.`,
        `## Where do these limits come from?
Each limit has a cause in [[l:u0-model|how the model works]]:
- **Confidently wrong**: it produces the most likely text, and likely isn’t true.
- **Misunderstanding**: missing context leaves gaps it fills with the most common assumptions.
- **Outdated info**: its knowledge stops at its training date.
- **Doesn’t know your data**: its parameters learned from general data, not your files.

## Why five steps in this order?
**Set the goal** first, because everything after is measured against it. **Give context** so there’s less guessing. **Review the result** critically. **Check sources** for every number and claim. **Decide** yourself, because the responsibility is yours. Same spirit as [[l:u1-mistakes|the verify-before-relying prompt]] {p8}.`),
      practice: L(`## قائمة سريعة قبل أي اعتماد (من الكتاب)
من قائمة التحقق في الدليل الأول {p16}:
- هل فصلت النتيجة بوضوح بين الحقائق والافتراضات؟
- هل تحققت بنفسك من كل رقم سيدخل تقريرًا رسميًا؟
- هل جرّبت الحل على نسخة قبل الملف الحقيقي؟
- هل طلبت نسخة أبسط وقارنت بينها وبين الأولى؟
- هل تعرف ماذا يحدث عند بيانات ناقصة أو غير متوقعة؟
- هل تستطيع شرح النتيجة لزميل دون العودة للأداة؟

## موقف من الموارد البشرية
موظف يسأل: «هل يحق لي إجازة مرضية بدون تقرير طبي؟». الذكاء الاصطناعي بدون سياسة الشركة سيجيب من قوانين عامة قد لا تنطبق. **الصحيح:** ارفع سياسة الإجازات، واطلب الإجابة منها فقط مع ذكر البند، ثم راجعها مع مسؤول الموارد البشرية.`,
        `## A quick pre-approval list (from the book)
From Guide 1’s checklist {p16}:
- Did the result clearly separate facts from assumptions?
- Did you personally check every number going into an official report?
- Did you try the solution on a copy before the real file?
- Did you ask for a simpler version and compare?
- Do you know what happens with missing or unexpected data?
- Can you explain the result to a colleague without going back to the tool?

## An HR situation
An employee asks: “Can I take sick leave without a medical report?” Without company policy, AI will answer from general rules that may not apply. **The right way:** upload the leave policy, ask for an answer from it only, citing the clause, then check with the HR officer.`),
      adv: L(`## متى يصبح «الاعتماد عليه وحده» خطرًا حقيقيًا؟
- عندما يترتب على النتيجة **أثر مالي أو تنظيمي أو قانوني** {p37}.
- عندما **لا يمكن التحقق** من النتيجة بمقارنتها بمصدر أو بنتيجة يدوية {p17}.
- عندما تكون **البيانات حساسة** ولا توجد ضوابط واضحة {p41}.

## التوازن الصحيح
الكتاب لا يدعو للخوف من الأداة، بل لتصميم مكان واضح للإنسان: **الأتمتة تتولى النقل والحساب والتنبيه، والقرار ذو الأثر يبقى بموافقة بشرية صريحة** {p37}. وفي الوكلاء: سقف للتكلفة والمحاولات، وسجل كامل، وأقل صلاحية {p40}.

## سؤال للنقاش
ما المهمة في عملك التي يمكن أن تثق فيها بالنتيجة بعد مراجعة سريعة، وما المهمة التي تحتاج تحققًا كاملًا كل مرة؟ ما الذي يفرق بينهما؟`,
        `## When does “relying on it alone” become a real risk?
- When the result has **financial, organisational or legal impact** {p37}.
- When the result **can’t be verified** against a source or a manual result {p17}.
- When the **data is sensitive** and there are no clear controls {p41}.

## The right balance
The book doesn’t preach fear of the tool; it designs a clear place for the human: **automation handles transfer, calculation and alerts; impactful decisions keep explicit human approval** {p37}. For agents: caps on cost and attempts, a full log, least privilege {p40}.

## A question for discussion
Which task in your work can you trust after a quick review, and which needs full verification every time? What separates them?`),
    },
    card: {
      what: L("ثمانية حدود للذكاء الاصطناعي وطريقة استخدام واعية من خمس خطوات {p41}.", "Eight limits of AI and a five-step conscious way of using it {p41}."),
      why: L("لتستفيد من قوته دون أن تدفع ثمن أخطائه في قرارات حقيقية.", "To benefit from its power without paying for its mistakes in real decisions."),
      how: L("حدد الهدف ← أعطه السياق ← راجع ← تأكد من المصادر ← قرّر.", "Goal → context → review → check sources → decide."),
      inside: L("الحدود نتيجة طبيعية للتوليد الاحتمالي وتاريخ التدريب وغياب بياناتك.", "The limits follow from probabilistic generation, training cut-off and the absence of your data."),
      relation: L("يكمل درس «كيف يعمل النموذج»، ويمهد لكل قوائم التحقق في الكتاب.", "Completes “how the model works” and prepares every checklist in the book."),
      example: L("سؤال عن الإجازة المرضية يُجاب من سياسة الشركة المرفوعة، لا من معرفة عامة.", "A sick-leave question answered from the uploaded company policy, not general knowledge."),
      apply: L("طبّق قائمة التحقق الست قبل اعتماد أي مخرج مهم {p16}.", "Run the six-point checklist before relying on any important output {p16}."),
      mistakes: L("اعتماد رقم بلا مصدر، ورفع بيانات حساسة بلا ضوابط.", "Relying on an unsourced number; uploading sensitive data without controls."),
      check: L("هل تذكر ٥ حدود على الأقل والسبب وراء كل منها؟", "Can you name at least 5 limits and the reason behind each?"),
      next: L("الدليل الأول: كيف تكتب طلبًا قويًا يقلل هذه الأخطاء.", "Guide 1: writing a strong request that reduces these errors."),
    },
    keys: L(["قوي لكنه ليس معصومًا: يعمل معك لا بدلًا منك {p41}.", "قد يخطئ بثقة، ويسيء الفهم إذا نقص السياق، ولا يعرف بيانات شركتك.", "القرارات الحساسة تحتاج مراجعة بشرية؛ وهو لا يتحمل مسؤولية القرار.", "الاستخدام الواعي: هدف ← سياق ← مراجعة ← مصادر ← قرار.", "أفضل نتيجة = إنسان يفكر + بيانات جيدة + ذكاء اصطناعي."],
      ["Powerful but not infallible: it works with you, not instead of you {p41}.", "It can be confidently wrong, misunderstand with missing context, and doesn’t know your company data.", "Sensitive decisions need human review; it doesn’t bear responsibility.", "Conscious use: goal → context → review → sources → decision.", "Best result = a thinking human + good data + AI."]),
    scene: "verify-gate", prompts: ["u0-p-verify"],
    quick: [
      { type: "order", q: L("رتّب خطوات «أفضل استخدام واعٍ»:", "Order the steps of “the best conscious use”:"), items: L(["حدد الهدف", "أعطه السياق", "راجع النتيجة", "تأكد من المصادر", "اتخذ القرار"], ["Set the goal", "Give context", "Review the result", "Check the sources", "Make the decision"]), why: L("هذا هو الترتيب في الكتاب {p41}: كل خطوة تحمي التي بعدها.", "This is the book’s order {p41}: each step protects the next.") },
      { q: L("أكمل المعادلة: أفضل نتيجة = إنسان يفكر + … + ذكاء اصطناعي", "Complete: best result = a thinking human + … + AI"), opts: L(["أحدث نموذج", "بيانات جيدة", "سرعة عالية", "اشتراك مدفوع"], ["The newest model", "Good data", "High speed", "A paid subscription"]), a: 1, why: L("الكتاب يضع البيانات الجيدة في قلب المعادلة {p41}، وهو ما يتكرر في كل الأدلة.", "The book puts good data at the heart of the equation {p41}, a theme repeated in every guide.") },
    ],
    related: ["u0-model", "u1-mistakes", "u1-habit"], req: ["u0-model"], terms: ["hallucination", "human-review", "context"],
  });
})();
