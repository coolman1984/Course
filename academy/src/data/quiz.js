/* Question bank: about two questions per lesson, mixed types.
   mcq = understanding · spot = find the flaw · predict = what happens next · compare = pick the right tool/option · order = arrange steps.
   Every wrong option carries a "why" so feedback teaches, and every question points back to its lesson. Order items are written in the correct order. */
"use strict";
(function (A) {
  const o = (ar, en, war, wen) => (war ? { ar, en, why: { ar: war, en: wen } } : { ar, en });
  const Q = (id, lesson, type, q, opts, ans, ex) => ({ id, lesson, type, q: { ar: q[0], en: q[1] }, opts, ans, explain: { ar: ex[0], en: ex[1] } });
  const O = (id, lesson, q, items, ex) => ({ id, lesson, type: "order", q: { ar: q[0], en: q[1] }, items: items.map(([ar, en]) => ({ ar, en })), explain: { ar: ex[0], en: ex[1] } });

  A.quiz = [
    /* ---------- Unit 0: foundations ---------- */
    Q("f1a", "f1", "mcq", ["ما «المعاملات» (الأوزان) داخل النموذج؟", "What are a model’s “parameters” (weights)?"], [
      o("أرقام داخلية يتعلمها النموذج أثناء التدريب وتُخزّن معرفته", "Internal numbers learned in training that store its knowledge"),
      o("عدد الأسئلة التي يمكنك طرحها يوميًا", "How many questions you can ask per day", "هذا حدّ استخدام في الخدمة، لا جزء من النموذج نفسه.", "That’s a service usage limit, not part of the model."),
      o("قاعدة بيانات بالإجابات الجاهزة", "A database of ready answers", "النموذج لا يحفظ إجابات جاهزة؛ يولّد الإجابة اعتمادًا على ما تعلّمه في أوزانه.", "The model doesn’t store ready answers; it generates them from what its weights learned."),
      o("ملفات شركتك التي رفعتها", "Your company files you uploaded", "ملفاتك جزء من السياق الذي تعطيه له، لا من أوزانه.", "Your files are context you give it, not its weights.")
    ], 0, ["الكتاب (ص 34): المعاملات أرقام داخلية يتعلمها النموذج أثناء التدريب وتخزّن معرفته، وتُقاس بالمليارات (B) أو التريليونات (T).", "The book (p. 34): parameters are internal numbers learned in training that store the model’s knowledge, measured in billions (B) or trillions (T)."]),
    Q("f1b", "f1", "spot", ["زميلك يقول: «النموذج أجاب بثقة عالية جدًا، إذن الإجابة صحيحة». أين الخلل؟", "A colleague says: “The model answered very confidently, so it must be right.” Where’s the flaw?"], [
      o("الثقة في الصياغة ليست دليلًا على الصحة؛ النموذج قد يخطئ بثقة", "Confident wording isn’t proof; the model can be wrong confidently"),
      o("لا خلل؛ النماذج لا تُظهر الثقة إلا حين تكون متأكدة", "No flaw; models only sound confident when sure", "هذا تحديدًا ما يحذّر منه الكتاب: قد يعطي معلومة خاطئة بثقة.", "That’s exactly what the book warns about: it can give wrong information confidently."),
      o("الخلل أنه كان يجب استخدام نموذج أكبر", "The flaw is not using a bigger model", "حتى النماذج الكبيرة قد تخطئ؛ المشكلة في طريقة الحكم لا في الحجم.", "Even big models can be wrong; the problem is how we judge, not size."),
      o("الخلل أن السؤال كان بالعربية", "The flaw is that the question was in Arabic", "اللغة لا علاقة لها بهذا الخطأ المنطقي.", "Language has nothing to do with this reasoning error.")
    ], 0, ["الذكاء الاصطناعي «قوي جدًا لكنه غير معصوم»، وقد يقدّم معلومة خاطئة بثقة (ص 34 و41). الحل: راجع وتحقق من المصادر قبل القرار.", "AI is “very powerful but not infallible” and can give wrong information confidently (pp. 34, 41). The fix: review and verify sources before deciding."]),

    Q("f2a", "f2", "mcq", ["ما الجملة التي يريد الكورس أن تقولها في نهايته؟", "Which sentence does the course want you to say at the end?"], [
      o("«لديّ مشكلة، وأعرف كيف أحولها إلى نظام ذكي»", "“I have a problem, and I know how to turn it into a smart system”"),
      o("«أعرف كيف أستخدم الذكاء الاصطناعي»", "“I know how to use AI”", "هذه نقطة البداية التي يذكرها الكتاب، لا الوصول.", "That’s the starting point the book mentions, not the destination."),
      o("«حفظتُ كل البرومبتات»", "“I memorised all the prompts”", "الكتاب يقول صراحة: لا تحفظ البرومبتات، افهم غرضها.", "The book says plainly: don’t memorise prompts, understand their purpose."),
      o("«جرّبتُ كل الأدوات الجديدة»", "“I tried every new tool”", "جمع الأدوات أحد الأخطاء التي تعطل التغيير (ص 16).", "Collecting tools is one of the mistakes that block change (p. 16).")
    ], 0, ["الهدف ليس استخدام الأدوات فقط، بل رؤية العمل كنظام متكامل (ص 3–4).", "The goal isn’t just using tools but seeing work as an integrated system (pp. 3–4)."]),
    O("f2b", "f2", ["رتّب أول خمس درجات من سلّم التدرّج كما في الكتاب:", "Order the first five steps of the learning ladder as in the book:"], [
      ["مساعد شخصي", "Personal assistant"], ["عقل ثانٍ", "Second brain"], ["موظف رقمي", "Digital employee"], ["أتمتة", "Automation"], ["أداة", "Tool"]
    ], ["السلّم الكامل: مساعد شخصي ← عقل ثانٍ ← موظف رقمي ← أتمتة ← أداة ← تطبيق ← نظام ← فريق رقمي ذكي (ص 4).", "The full ladder: personal assistant → second brain → digital employee → automation → tool → application → system → smart digital team (p. 4)."]),

    Q("f3a", "f3", "mcq", ["حسب الكتاب، ما الذي يرفع قيمة النتيجة في رحلة «من البيانات إلى القرار»؟", "Per the book, what raises the value of the result in the “data to decision” journey?"], [
      o("جودة البيانات والسياق", "The quality of data and context"),
      o("طول الإجابة", "The length of the answer", "الإجابة الطويلة ليست أفضل؛ الكتاب يطلب أحيانًا اختصارها للنصف.", "A long answer isn’t better; the book sometimes asks to cut it in half."),
      o("عدد الأدوات المستخدمة", "The number of tools used", "كثرة الأدوات لا تعوّض ضعف البيانات.", "More tools don’t make up for weak data."),
      o("سرعة الإنترنت", "Internet speed", "لا علاقة لها بجودة التحليل.", "Unrelated to analysis quality.")
    ], 0, ["«كلما كانت البيانات والسياق أفضل، كانت النتيجة أكثر قيمة» (ص 5).", "“The better the data and context, the more valuable the result” (p. 5)."]),
    O("f3b", "f3", ["رتّب خطوات رحلة «من البيانات إلى القرار»:", "Order the “data to decision” journey:"], [
      ["جمع", "Collect"], ["تحليل", "Analyse"], ["تلخيص", "Summarise"], ["مقارنة", "Compare"], ["اقتراح", "Suggest"]
    ], ["جمع ← تحليل ← تلخيص ← مقارنة ← اقتراح (ص 5).", "Collect → analyse → summarise → compare → suggest (p. 5)."]),

    Q("f4a", "f4", "compare", ["تحتاج من يخطط ويستخدم أدوات وينفذ المهمة ويتابعها. ماذا تختار؟", "You need something that plans, uses tools, carries out the task and follows up. Which do you pick?"], [
      o("وكيل ذكي", "A smart agent"),
      o("دردشة تقليدية", "Traditional chat", "الدردشة: تسأل فتحصل على إجابة ثم تتوقف.", "Chat: you ask, get an answer, and it stops."),
      o("مساعد شخصي", "A personal assistant", "المساعد يفهمك ويتذكر السياق، لكن التخطيط والتنفيذ بالأدوات صفة الوكيل.", "An assistant understands and remembers context, but planning and executing with tools is the agent’s trait."),
      o("محرك بحث", "A search engine", "محرك البحث يعيد روابط فقط.", "A search engine only returns links.")
    ], 0, ["الكتاب (ص 6): الدردشة تجيب، المساعد يفهم ويتذكر، والوكيل يخطط ويستخدم الأدوات وينفذ ويتابع.", "The book (p. 6): chat answers, an assistant understands and remembers, an agent plans, uses tools, executes and follows up."]),
    Q("f4b", "f4", "mcq", ["ما العلاقة بين «البرومبت» و«السياق»؟", "How do the “prompt” and the “context” relate?"], [
      o("البرومبت جزء من السياق: يحدد المهمة وشكل الإجابة", "The prompt is part of the context: it sets the task and the answer’s shape"),
      o("هما الشيء نفسه", "They’re the same thing", "السياق أوسع: كل المعلومات عن وضعك وهدفك ومشكلتك.", "Context is wider: all the information about your situation, goal and problem."),
      o("السياق جزء من البرومبت", "The context is part of the prompt", "العكس هو الصحيح حسب الكتاب.", "It’s the other way round, per the book."),
      o("لا علاقة بينهما", "They’re unrelated", "البرومبت يعمل داخل السياق.", "The prompt works inside the context.")
    ], 0, ["السياق كل ما تعطيه للذكاء الاصطناعي ليفهم وضعك؛ والبرومبت جزء منه يحدد المهمة وكيف تريد الإجابة (ص 6).", "Context is everything you give AI to understand your situation; the prompt is part of it and sets the task and the answer’s form (p. 6)."]),

    Q("f5a", "f5", "mcq", ["أي معادلة يختم بها الكتاب لأفضل نتيجة؟", "Which equation does the book end with for the best result?"], [
      o("إنسان يفكر + بيانات جيدة + ذكاء اصطناعي", "A thinking human + good data + AI"),
      o("أقوى نموذج + أطول برومبت", "The strongest model + the longest prompt", "الكتاب لا يربط الجودة بالطول ولا بالحجم وحده.", "The book ties quality neither to length nor to size alone."),
      o("ذكاء اصطناعي بدلًا من الإنسان", "AI instead of the human", "الكتاب: «يعمل بشكل أفضل معك، لا بدلًا منك».", "The book: “it works best with you, not instead of you.”"),
      o("بيانات كثيرة بدون مراجعة", "Lots of data without review", "القرارات الحساسة تحتاج مراجعة بشرية.", "Sensitive decisions need human review.")
    ], 0, ["أفضل نتيجة = إنسان يفكر + بيانات جيدة + ذكاء اصطناعي (ص 41).", "Best result = a thinking human + good data + AI (p. 41)."]),
    O("f5b", "f5", ["رتّب خطوات الاستخدام الواعي:", "Order the steps of wise use:"], [
      ["حدّد الهدف", "Define the goal"], ["أعطِ السياق", "Give context"], ["راجع النتيجة", "Review the result"], ["تحقق من المصادر", "Verify sources"], ["اتخذ القرار", "Decide"]
    ], ["حدّد الهدف ← أعطِ السياق ← راجع النتيجة ← تحقق من المصادر ← اتخذ القرار (ص 41). القرار دائمًا عندك.", "Define the goal → give context → review → verify sources → decide (p. 41). The decision is always yours."]),

    /* ---------- Unit 1: personal assistant & second brain ---------- */
    Q("p1a", "p1", "mcq", ["ما المعادلة الحاكمة لأي برومبت جيد؟", "What is the governing equation of any good prompt?"], [
      o("هدف واضح + سياق كافٍ + طلب محدد + شكل مخرج = نتيجة قابلة للتنفيذ", "Clear goal + enough context + specific request + output format = an actionable result"),
      o("سؤال قصير + نموذج قوي = إجابة صحيحة", "Short question + strong model = right answer", "هذا هو «الاستخدام الأضعف» الذي يحذر منه الكتاب.", "That’s the “weakest use” the book warns about."),
      o("أمثلة كثيرة + لغة إنجليزية = نتيجة أفضل", "Many examples + English = better result", "الأمثلة عنصر مفيد، لكنها ليست المعادلة كلها، واللغة ليست شرطًا.", "Examples help but aren’t the whole equation, and language isn’t a requirement."),
      o("كلمات مفتاحية + تكرار = دقة", "Keywords + repetition = precision", "هذا أسلوب محركات البحث لا أسلوب البرومبت.", "That’s search-engine style, not prompting.")
    ], 0, ["المعادلة في ص 7 تحوّل السؤال العابر إلى نتيجة قابلة للتنفيذ: خطة أو قرار أو أداة.", "The equation on p. 7 turns a passing question into an actionable result: a plan, a decision or a tool."]),
    Q("p1b", "p1", "spot", ["برومبت: «ساعدني في التقرير». ما العنصر الأوضح غيابًا؟", "Prompt: “Help me with the report.” Which element is most clearly missing?"], [
      o("الهدف: ماذا تريد أن تعرف أو تقرر بالتحديد", "The goal: what exactly you want to know or decide"),
      o("لا شيء؛ النموذج سيفهم وحده", "Nothing; the model will figure it out", "الأداة لا تعرف عن عملك إلا ما تخبرها به.", "The tool knows nothing about your work except what you tell it."),
      o("علامات الترقيم", "Punctuation", "ليست المشكلة؛ المشكلة غياب الهدف والسياق.", "Not the issue; the issue is missing goal and context."),
      o("اسم النموذج", "The model’s name", "اسم الأداة لا يغيّر شيئًا هنا.", "The tool’s name changes nothing here.")
    ], 0, ["الكتاب يضرب هذا المثال: ليس «ساعدني في التقرير» بل «أريد أن أعرف لماذا انخفضت المبيعات» (ص 7).", "The book uses this example: not “help me with the report” but “I want to know why sales fell” (p. 7)."]),

    Q("p2a", "p2", "mcq", ["لماذا تبدأ «أقوى تقنية» بطلب «اسألني عن أي معلومة ناقصة»؟", "Why does the “strongest technique” start with “ask me about any missing information”?"], [
      o("لتجبر الأداة على كشف افتراضاتها بدل التخمين بصمت", "To force the tool to reveal its assumptions instead of silently guessing"),
      o("لتطيل المحادثة", "To make the conversation longer", "الهدف الدقة لا الطول.", "The aim is precision, not length."),
      o("لأن النموذج لا يجيب بدونها", "Because the model won’t answer without it", "سيجيب، لكنه سيخمّن ما ينقصه.", "It will answer, but it will guess what’s missing."),
      o("لتوفير التوكنز", "To save tokens", "ليس هذا سببها في الكتاب.", "That’s not its reason in the book.")
    ], 0, ["الجملة تحل ثلاث مشكلات: كشف الافتراضات، ومنع التعقيد، والتقاط الأخطاء باختبار الحالات الطرفية (ص 7).", "The sentence fixes three problems: revealing assumptions, preventing complexity, and catching errors by testing edge cases (p. 7)."]),
    Q("p2b", "p2", "compare", ["أي جزء من الجملة يمنع حلًا معقدًا لن تستطيع صيانته؟", "Which part of the sentence prevents a complex solution you can’t maintain?"], [
      o("«أبسط حل ممكن»", "“The simplest possible solution”"),
      o("«اسألني عن الناقص»", "“Ask me what’s missing”", "هذا يكشف الافتراضات.", "That reveals assumptions."),
      o("«اختبر الحالات الطرفية»", "“Test the edge cases”", "هذا يلتقط الأخطاء.", "That catches errors."),
      o("«اشرحه ببساطة»", "“Explain it simply”", "يساعد على الفهم، لكن منع التعقيد يأتي من طلب أبسط حل.", "Helps understanding, but preventing complexity comes from asking for the simplest solution.")
    ], 0, ["كل جزء له وظيفة: الناقص ← الافتراضات، الأبسط ← التعقيد، الحالات الطرفية ← الأخطاء.", "Each part has a job: missing → assumptions, simplest → complexity, edge cases → errors."]),

    Q("p3a", "p3", "spot", ["موظف طلب معادلة، أعجبته النتيجة فطبّقها مباشرة على ملف المبيعات الأصلي. ما الخطأ؟", "An employee got a formula, liked it, and applied it straight to the original sales file. What’s wrong?"], [
      o("التطبيق على الملف الأصلي؛ الصحيح التجربة على نسخة ببيانات صغيرة أولًا", "Applying it to the original; test on a copy with small data first"),
      o("لا خطأ؛ النتيجة أعجبته", "No mistake; he liked the result", "الإعجاب ليس اختبارًا.", "Liking it isn’t testing it."),
      o("كان يجب أن يطلب معادلة أطول", "He should have asked for a longer formula", "الطول ليس معيارًا؛ الكتاب يفضّل الأبسط.", "Length isn’t a criterion; the book prefers simpler."),
      o("كان يجب أن يستخدم أداة أخرى", "He should have used another tool", "المشكلة في طريقة التطبيق لا في الأداة.", "The problem is how he applied it, not the tool.")
    ], 0, ["من الأخطاء الأربعة: قبول أول إجابة، والتطبيق مباشرة على الملف الحقيقي. اختبر على نسخة ثم عمّم (ص 8).", "Among the four mistakes: accepting the first answer and applying straight to the real file. Test on a copy, then roll out (p. 8)."]),
    Q("p3b", "p3", "mcq", ["ما الوصف الصحيح للبيانات حسب الكتاب؟", "What is the right way to describe data, per the book?"], [
      o("أسماء الأعمدة الحقيقية ونوع كل عمود والعدد التقريبي للصفوف", "Real column names, each column’s type and the approximate row count"),
      o("«عندي جدول مبيعات»", "“I have a sales table”", "هذا بالضبط مثال «الوصف المبهم» في الكتاب.", "That’s exactly the book’s “vague description” example."),
      o("إرسال الملف كاملًا بدون أي شرح", "Sending the whole file with no explanation", "قد يكون حساسًا، ولا يشرح القواعد أو المطلوب.", "It may be sensitive and doesn’t explain rules or the goal."),
      o("وصف شكل الجدول وألوانه", "Describing the table’s look and colours", "الشكل لا يفيد في بناء المنطق.", "Looks don’t help build the logic.")
    ], 0, ["الوصف الدقيق لبنية البيانات يمنع أغلب الأخطاء (ص 8).", "Describing data structure precisely prevents most errors (p. 8)."]),

    Q("p4a", "p4", "predict", ["النتيجة «صحيحة عمومًا لكن لا تناسب وضعك». ماذا يفعل المستخدم الماهر؟", "The result is “generally right but doesn’t fit your situation.” What does a skilled user do?"], [
      o("يصحّح في المحادثة نفسها: «وضعي يختلف في [الفرق]، أعد الحل بناءً على هذا القيد»", "Corrects in the same chat: “My situation differs in [the difference]; redo it with that constraint”"),
      o("يبدأ محادثة جديدة من الصفر", "Starts a new chat from scratch", "هذا ما يفعله المبتدئ؛ ويضيّع السياق الذي بنيته.", "That’s what a beginner does, and it loses the context you built."),
      o("يقبل النتيجة كما هي", "Accepts it as is", "النتيجة لا تناسب وضعك؛ قبولها يعني قرارًا خاطئًا.", "It doesn’t fit your case; accepting it means a wrong decision."),
      o("يغيّر الأداة فورًا", "Switches tools immediately", "المشكلة في القيد الناقص لا في الأداة.", "The problem is the missing constraint, not the tool.")
    ], 0, ["المبتدئ يبدأ محادثة جديدة، والماهر يعدّل المسار في المحادثة نفسها (ص 8).", "The beginner starts a new chat; the skilled user corrects course in the same chat (p. 8)."]),
    O("p4b", "p4", ["رتّب حلقة إدارة المحادثة:", "Order the conversation-management loop:"], [
      ["اطلب", "Ask"], ["اقرأ بعين ناقدة", "Read critically"], ["حدّد الخلل", "Pinpoint the flaw"], ["صحّح في المحادثة نفسها", "Correct in the same chat"], ["اعتمد أو كرّر", "Adopt or repeat"]
    ], ["الحلقة كما في ص 8.", "The loop as on p. 8."]),

    Q("p5a", "p5", "mcq", ["في برومبت «الفرز السريع»، ما المجموعات الأربع؟", "In the “quick triage” prompt, what are the four groups?"], [
      o("رد اليوم، فوّض، أجّل بأمان، تجاهل", "Reply today, delegate, safely postpone, ignore"),
      o("مهم، عاجل، سهل، صعب", "Important, urgent, easy, hard", "قريب من مصفوفات أخرى، لكنه ليس تقسيم الكتاب.", "Close to other matrices, but not the book’s split."),
      o("صباح، ظهر، مساء، ليل", "Morning, noon, evening, night", "هذا تقسيم وقت لا فرز.", "That’s a time split, not triage."),
      o("مدير، زميل، عميل، مورّد", "Manager, colleague, client, supplier", "التقسيم حسب الإجراء لا حسب الشخص.", "The split is by action, not by person.")
    ], 0, ["الفرز السريع: أربع مجموعات مع رد جاهز لكل بند عاجل (ص 10).", "Quick triage: four groups with a ready reply for each urgent item (p. 10)."]),
    O("p5b", "p5", ["رتّب الدورة اليومية للإنتاجية:", "Order the daily productivity cycle:"], [
      ["افهم", "Understand"], ["نظّم", "Organise"], ["قرّر", "Decide"], ["نفّذ", "Execute"], ["راجع", "Review"]
    ], ["افهم (الهدف والسياق) ← نظّم ← قرّر ← نفّذ ← راجع (ص 10).", "Understand (goal and context) → organise → decide → execute → review (p. 10)."]),

    Q("p6a", "p6", "mcq", ["ما الذي تضيفه مقارنة الخيارين في الكتاب ولا ينتبه له كثيرون؟", "What does the book’s option comparison add that many people miss?"], [
      o("مدى قابلية القرار للتراجع عنه", "How reversible the decision is"),
      o("لون العرض", "The presentation colour", "لا علاقة له بالقرار.", "Irrelevant to the decision."),
      o("رأي أغلب الزملاء", "What most colleagues think", "الكتاب يعتمد معايير لا تصويتًا.", "The book uses criteria, not a vote."),
      o("أيهما أحدث", "Which is newer", "الحداثة ليست معيارًا في الكتاب.", "Newness isn’t a criterion in the book.")
    ], 0, ["المقارنة بالتكلفة والوقت والمخاطرة والعائد والسهولة ومدى إمكانية التراجع، في جدول مع توصية وسببها (ص 10).", "Compare by cost, time, risk, return, ease and reversibility, in a table with a recommendation and its reason (p. 10)."]),
    Q("p6b", "p6", "compare", ["الفرق بين برومبتات الإنتاجية والبرومبتات الاستراتيجية؟", "The difference between productivity and strategic prompts?"], [
      o("الأولى تساعدك على إنجاز العمل، والثانية تساعدك على معرفة أي عمل يستحق الإنجاز أصلًا", "The first help you get work done; the second help you know which work is worth doing at all"),
      o("الثانية أطول فقط", "The second are just longer", "الفرق في الغرض لا الطول.", "The difference is purpose, not length."),
      o("الأولى للمديرين والثانية للموظفين", "The first for managers, the second for staff", "كلاهما للجميع.", "Both are for everyone."),
      o("لا فرق", "No difference", "الكتاب يسميه «فرقًا جوهريًا».", "The book calls it a “fundamental difference”.")
    ], 0, ["ص 10: القسم السابق يساعدك على الإنجاز، وهذا القسم يساعدك على اختيار ما يستحق.", "p. 10: the previous section helps you get things done; this one helps you choose what’s worth doing."]),

    Q("p7a", "p7", "mcq", ["لماذا ينجح «البرومبت الاستراتيجي الشامل»؟", "Why does the “all-in-one strategic prompt” work?"], [
      o("لأنه يفرض ترتيبًا لا يمكن القفز فوقه: فهم ← تحليل ← تشخيص ← مخاطر ← خيارات ← قرار ← خطوات", "It enforces an order you can’t skip: understand → analyse → diagnose → risks → options → decision → steps"),
      o("لأنه أطول برومبت في الدليل", "It’s the longest prompt in the guide", "الطول ليس السبب.", "Length isn’t the reason."),
      o("لأنه يعطي الحل أولًا", "It gives the solution first", "العكس: أغلب القرارات السيئة تبدأ بالحل قبل فهم المشكلة.", "The opposite: most bad decisions start with the solution before understanding the problem."),
      o("لأنه يعمل مع أداة واحدة فقط", "It only works with one tool", "يعمل مع أي مساعد.", "It works with any assistant.")
    ], 0, ["«أغلب القرارات السيئة تأتي من البدء بالحل قبل فهم المشكلة» (ص 11).", "“Most bad decisions come from starting with the solution before understanding the problem” (p. 11)."]),
    Q("p7b", "p7", "predict", ["كتبت: «لا توافقني تلقائيًا. اختبر فكرتي…». ماذا تتوقع أن تحصل عليه أولًا؟", "You wrote: “Don’t automatically agree with me. Test my idea…” What should you get first?"], [
      o("نقاط الضعف والافتراضات غير المعلنة، ثم التحسين بعد النقد", "Weaknesses and unstated assumptions, then improvement after the critique"),
      o("مديحًا للفكرة", "Praise for the idea", "هذا ما تمنعه الجملة تحديدًا.", "That’s exactly what the sentence prevents."),
      o("خطة تنفيذ فورية", "An immediate execution plan", "التنفيذ يأتي بعد النقد والتحسين.", "Execution comes after critique and improvement."),
      o("رفضًا كاملًا للفكرة", "A total rejection", "المطلوب نقد بنّاء ثم تحسين، لا رفض.", "The ask is constructive critique then improvement, not rejection.")
    ], 0, ["برومبت اختبار الفكرة يطلب النقد أولًا، وبعده فقط كيف تتحسن (ص 11).", "The idea-test prompt asks for critique first, and only then how to improve (p. 11)."]),

    Q("p8a", "p8", "compare", ["ما الذي يميّز NotebookLM عن المساعد العادي؟", "What sets NotebookLM apart from an ordinary assistant?"], [
      o("يجيب فقط من المصادر التي اخترتها في الدفتر", "It answers only from the sources you chose in the notebook"),
      o("أسرع دائمًا", "It’s always faster", "السرعة ليست الفرق الذي يذكره الكتاب.", "Speed isn’t the difference the book names."),
      o("يكتب كودًا أفضل", "It writes better code", "ليس هذا دوره في الكتاب.", "That’s not its role in the book."),
      o("لا يحتاج أي مصادر", "It needs no sources", "العكس: قيمته في المصادر التي تحددها.", "The opposite: its value is in the sources you set.")
    ], 0, ["المساعد العادي قد يخلط مصادرك ببحث خارجي، أما الدفتر فيلتزم بمصادرك (ص 12).", "An ordinary assistant may mix your sources with outside search; the notebook sticks to yours (p. 12)."]),
    Q("p8b", "p8", "spot", ["خطة: «سأضع كل ملفات الإدارة في دفتر واحد كبير وأسأله أي شيء». ما المخالفة؟", "Plan: “I’ll put all department files in one big notebook and ask it anything.” What rule is broken?"], [
      o("دفتر واحد = هدف واحد", "One notebook = one goal"),
      o("لا مخالفة؛ كلما زادت المصادر زادت الدقة", "None; more sources means more precision", "المصادر غير المتعلقة تشوّش الإجابات.", "Unrelated sources muddy the answers."),
      o("يجب استخدام دفترين فقط", "You must use exactly two notebooks", "لا يوجد عدد ثابت؛ القاعدة هدف لكل دفتر.", "There’s no fixed count; the rule is one goal per notebook."),
      o("الدفاتر لا تقبل ملفات إكسل", "Notebooks don’t accept Excel files", "تقبل الجداول ضمن أنواع كثيرة.", "They accept spreadsheets among many types.")
    ], 0, ["أول القواعد العشر: دفتر واحد = هدف واحد. وتذكّر الخصوصية: سياسة الشركة أولًا (ص 13).", "The first of the ten rules: one notebook = one goal. And remember privacy: company policy first (p. 13)."]),

    Q("p9a", "p9", "spot", ["طلب: «أريد معادلة هامش الربح». ما العنصر الناقص من العناصر الثلاثة؟", "Request: “I want a profit margin formula.” Which of the three elements is missing?"], [
      o("كلها تقريبًا: بنية البيانات، وتعريف المخرج، وقاعدة الحالة الطرفية", "Nearly all: data structure, output definition and the edge-case rule"),
      o("لا شيء", "Nothing", "بدون أعمدة وقاعدة للفراغ ستأتي معادلة عامة قد تخطئ.", "Without columns and a blank rule you get a generic formula that may be wrong."),
      o("اسم الملف فقط", "Only the file name", "اسم الملف أقل أهمية من بنية الأعمدة.", "The file name matters less than the column structure."),
      o("لون الخلية", "The cell colour", "غير مهم للمنطق.", "Irrelevant to the logic.")
    ], 0, ["الثلاثة: وصف دقيق لبنية البيانات، وتعريف واضح للمخرج، وقاعدة صريحة للحالة الطرفية (ص 13).", "The three: a precise data structure, a clear output definition and an explicit edge-case rule (p. 13)."]),
    O("p9b", "p9", ["رتّب خطوات العمل مع إكسل والذكاء الاصطناعي:", "Order the Excel-with-AI steps:"], [
      ["اشرح المشكلة", "Explain the problem"], ["دعه يبني المعادلة", "Let it build the formula"], ["افهمها", "Understand it"], ["اختبرها", "Test it"], ["طبّقها", "Apply it"]
    ], ["«لا تبدأ بالكود، ابدأ بالمشكلة» (ص 13).", "“Don’t start with code, start with a problem” (p. 13)."]),

    Q("p10a", "p10", "mcq", ["ما «المهارة الجديدة» في الأتمتة حسب الكتاب؟", "What is the “new skill” in automation, per the book?"], [
      o("وصف العملية بدقة، لا كتابة الكود", "Describing the process precisely, not writing code"),
      o("حفظ أوامر VBA", "Memorising VBA commands", "الكتاب يقول إن القالب الذهبي أهم من تعلّم عشرات الأوامر.", "The book says the golden template beats learning dozens of commands."),
      o("شراء برامج أتمتة", "Buying automation software", "ليس هذا ما يقصده الكتاب.", "Not what the book means."),
      o("الكتابة بسرعة على لوحة المفاتيح", "Fast typing", "لا علاقة له.", "Unrelated.")
    ], 0, ["الرسالة الأساسية (ص 13): الذكاء الاصطناعي يحتاج أن يفهم منطق العمل وخطواته ليكتب كودًا صحيحًا.", "The core message (p. 13): AI needs to understand the business logic and steps to write correct code."]),
    Q("p10b", "p10", "spot", ["شخص كتب ماكرو واحدًا ضخمًا يفعل كل شيء، وجرّبه على الملف الأصلي. كم قاعدة كسر؟", "Someone wrote one huge macro that does everything and ran it on the original file. How many rules were broken?"], [
      o("القاعدتين: العمل على نسخة، ووحدات صغيرة لا وحش واحد", "Both: work on a copy, and small modules not one monster"),
      o("لا شيء", "None", "أفعال الماكرو لا تُلغى بالطريقة المعتادة.", "Macro actions can’t be undone the usual way."),
      o("واحدة فقط: الحجم", "Only one: size", "التشغيل على الأصل كسر للقاعدة الأولى أيضًا.", "Running on the original breaks the first rule too."),
      o("واحدة فقط: النسخة", "Only one: the copy", "الماكرو الضخم يكسر قاعدة الوحدات الصغيرة.", "A huge macro breaks the small-modules rule.")
    ], 0, ["قاعدتان لا تُكسران (ص 14): اعمل دائمًا على نسخة، ووحدات صغيرة كل منها بوظيفة واحدة.", "Two unbreakable rules (p. 14): always work on a copy, and small modules each with one job."]),

    Q("p11a", "p11", "mcq", ["ما الترتيب الصحيح لبناء عرض الإدارة؟", "What’s the right order for building a management deck?"], [
      o("المصدر أولًا، ثم القصة، ثم الصورة", "Source first, then story, then image"),
      o("التصميم أولًا", "Design first", "الكتاب: لا تبدأ بالتصميم أبدًا.", "The book: never start with design."),
      o("القصة ثم المصدر", "Story then source", "القصة تُبنى على حقيقة موثّقة.", "The story is built on documented truth."),
      o("لا يهم الترتيب", "Order doesn’t matter", "الكتاب يؤكد أن الترتيب مهم.", "The book stresses that order matters.")
    ], 0, ["ثلاثة أدوار: عقل المحتوى (الدفتر)، مخرج القصة (المساعد)، الاستوديو البصري (مولّد الصور). وخلط الأدوار هو الخطأ القاتل (ص 14).", "Three roles: content brain (notebook), story director (assistant), visual studio (image generator). Mixing roles is the fatal mistake (p. 14)."]),
    Q("p11b", "p11", "mcq", ["ما معيار النجاح الأخير لمشروع التخرج؟", "What is the capstone’s final success criterion?"], [
      o("أن ينتهي بقرار لا بملخص", "It ends with a decision, not a summary"),
      o("أن يحتوي أكبر عدد من الشرائح", "It has the most slides", "الكمية ليست معيارًا.", "Quantity isn’t a criterion."),
      o("أن يستخدم أحدث أداة", "It uses the newest tool", "ليس من المعايير.", "Not one of the criteria."),
      o("أن يكون ملوّنًا", "It’s colourful", "الجمال بدون معنى أحد أخطاء خلط الأدوار.", "Beauty without meaning is a role-mixing mistake.")
    ], 0, ["المعايير: يعمل بزر واحد؟ البيانات الأصلية سليمة؟ يفهمه مدير لم يرَ الملف؟ ينتهي بقرار؟ (ص 15).", "Criteria: runs with one button? Original data intact? Understood by a manager who never saw the file? Ends with a decision? (p. 15)."]),

    Q("p12a", "p12", "spot", ["متدرّب بدأ الأسبوع الثاني من خطة الثلاثين يومًا رغم أنه لم يعتد على الأسبوع الأول بعد. ما المشكلة؟", "A trainee started week two of the 30-day plan before week one became a habit. What’s the problem?"], [
      o("كسر قاعدة الخطة: لا تبدأ أسبوعًا جديدًا حتى يصبح السابق عادة", "He broke the plan’s rule: don’t start a new week until the last is a habit"),
      o("لا مشكلة؛ الأسرع أفضل", "No problem; faster is better", "الكتاب يقدّم العادة على السرعة.", "The book puts habit before speed."),
      o("كان يجب أن يبدأ بالأسبوع الرابع", "He should have started with week four", "الأتمتة تأتي بعد الصياغة والإنتاجية.", "Automation comes after wording and productivity."),
      o("الخطة اختيارية بالكامل", "The plan is entirely optional", "القاعدة جزء أساسي منها.", "The rule is a core part of it.")
    ], 0, ["خطة الثلاثين يومًا: صياغة ← إنتاجية ← قرارات ومعرفة ← أتمتة، ولا انتقال قبل العادة (ص 16).", "The 30-day plan: wording → productivity → decisions and knowledge → automation, no moving on before the habit (p. 16)."]),
    Q("p12b", "p12", "mcq", ["أي مما يلي ليس من الأخطاء الثلاثة التي تعطل التغيير؟", "Which of these is NOT one of the three mistakes that block change?"], [
      o("البدء بمشكلة صغيرة متكررة", "Starting with a small recurring problem", "هذا هو الحل الذي يقترحه الكتاب، لا الخطأ.", "That’s the book’s suggested fix, not a mistake."),
      o("جمع الأدوات بدل إتقان واحدة", "Collecting tools instead of mastering one"),
      o("الاكتفاء بالإعجاب بالنتيجة", "Just admiring the result"),
      o("البدء بأكبر مشكلة", "Starting with your biggest problem")
    ], 0, ["الأخطاء الثلاثة: جمع الأدوات، والإعجاب فقط، والبدء بالأكبر. الاختبار الوحيد: هل تغيّر شيء في العمل هذا الأسبوع؟ (ص 16).", "The three mistakes: collecting tools, just admiring, starting with the biggest. The only test: did something change at work this week? (p. 16)."]),

    /* ---------- Unit 2: Python tools ---------- */
    Q("y1a", "y1", "mcq", ["ما العنصر الخامس في مواصفة المهمة، الذي يسبب غيابه أغلب فشل الأدوات؟", "What is the task spec’s fifth element, whose absence causes most tool failures?"], [
      o("الاختبارات: كيف نعرف أن النتيجة صحيحة، محددة قبل البناء", "Tests: how we know the result is right, defined before building"),
      o("لغة البرمجة", "The programming language", "ليست ضمن المواصفة؛ الأداة تختارها.", "Not part of the spec; the tool picks it."),
      o("اسم المطوّر", "The developer’s name", "لا علاقة له.", "Irrelevant."),
      o("ألوان الواجهة", "The interface colours", "ليست من عناصر المواصفة.", "Not a spec element.")
    ], 0, ["بدون اختبارات تبدو الأداة تعمل، لكن لا أحد يعرف متى تكون نتيجتها خاطئة (ص 17).", "Without tests the tool seems to work, but nobody knows when its result is wrong (p. 17)."]),
    O("y1b", "y1", ["رتّب أول أربعة عناصر في مواصفة المهمة:", "Order the first four elements of the task spec:"], [
      ["المشكلة (بالدقائق لا بالتخمين)", "Problem (in minutes, not guesses)"], ["المدخلات (البنية الحقيقية)", "Inputs (real structure)"], ["القواعد (كما تُطبّق فعلًا)", "Rules (as actually applied)"], ["النتيجة المطلوبة", "Required result"]
    ], ["ثم يأتي العنصر الخامس: الاختبارات (ص 17).", "Then comes the fifth element: tests (p. 17)."]),

    Q("y2a", "y2", "predict", ["مهمة تحدث مرة كل سنة، وقواعدها تتغير كل مرة. هل تستحق أداة؟", "A task happens once a year and its rules change every time. Does it deserve a tool?"], [
      o("غالبًا لا: تفشل في سؤالي التكرار والثبات", "Probably not: it fails the frequency and stability questions"),
      o("نعم دائمًا", "Always yes", "الكتاب يضع أربعة أسئلة قبل الأتمتة.", "The book puts four questions before automating."),
      o("نعم لأنها صعبة", "Yes, because it’s hard", "الصعوبة ليست من الأسئلة الأربعة.", "Difficulty isn’t one of the four questions."),
      o("لا يمكن الحكم أبدًا", "It can never be judged", "الأسئلة الأربعة تحكم بوضوح.", "The four questions judge clearly.")
    ], 0, ["الأسئلة الأربعة: التكرار، والثبات، وتكلفة الخطأ اليدوي، وقابلية التحقق (ص 17).", "The four questions: frequency, stability, manual error cost, verifiability (p. 17)."]),
    Q("y2b", "y2", "mcq", ["عند وصول ملف ببنية غير متوقعة، ماذا يجب أن تفعل الأداة؟", "When a file arrives with an unexpected structure, what should the tool do?"], [
      o("تتوقف برسالة واضحة: الفشل الصريح أفضل من النجاح الصامت", "Stop with a clear message: explicit failure beats silent success"),
      o("تكمل وتخمّن الأعمدة", "Carry on and guess the columns", "هذا «نجاح صامت» يُنتج أرقامًا خاطئة.", "That’s “silent success” producing wrong numbers."),
      o("تحذف الملف", "Delete the file", "لا تلمس البيانات الأصلية أبدًا.", "Never touch the original data."),
      o("تعيد التشغيل بلا نهاية", "Restart endlessly", "لا تحل المشكلة.", "Doesn’t solve the problem.")
    ], 0, ["من القواعد الأربع: لا تلمس الأصل، سجل تشغيل مكتوب، وحدات صغيرة مستقلة، فشل صريح (ص 18).", "Among the four rules: don’t touch originals, a written run log, small independent modules, explicit failure (p. 18)."]),

    Q("y3a", "y3", "compare", ["أي طريقة أتمتة تأتي أولًا في ترتيب التفضيل لأنها الأكثر ثباتًا؟", "Which automation approach comes first in the preference order because it’s most stable?"], [
      o("الملف أو واجهة البرمجة (API)", "File or API"),
      o("محاكاة الفأرة ولوحة المفاتيح (PyAutoGUI)", "Mouse and keyboard simulation (PyAutoGUI)", "هذه الملاذ الأخير والأكثر هشاشة.", "That’s the last resort and most fragile."),
      o("عناصر واجهة البرنامج (pywinauto)", "App UI elements (pywinauto)", "تأتي ثالثًا.", "It comes third."),
      o("التحكم المباشر في البرنامج", "Direct app control", "تأتي ثانيًا (xlwings وPlaywright).", "It comes second (xlwings, Playwright).")
    ], 0, ["كلما ارتفع المستوى قلّ احتمال انكسار الأداة مع أي تحديث للشاشة (ص 18).", "The higher the level, the less likely the tool breaks on any screen update (p. 18)."]),
    O("y3b", "y3", ["رتّب سلسلة الأتمتة النموذجية بدون تدخل يدوي:", "Order the typical hands-off automation chain:"], [
      ["وصول ملف جديد", "A new file arrives"], ["فحص البنية والأعمدة", "Check structure and columns"], ["تنظيف وتوحيد ودمج", "Clean, unify and merge"], ["حساب المؤشرات والشذوذ", "Compute KPIs and anomalies"], ["بناء التقرير وحفظه", "Build and save the report"], ["إشعار الأشخاص بالرابط", "Notify people with the link"]
    ], ["السلسلة كما في ص 19.", "The chain as on p. 19."]),

    Q("y4a", "y4", "mcq", ["لماذا «الجودة أولًا» في التحليل؟", "Why “quality first” in analysis?"], [
      o("لأن نتيجة دقيقة على بيانات معطوبة تعطي قرارًا خاطئًا بثقة عالية جدًا", "A precise result on broken data gives a wrong decision with very high confidence"),
      o("لأن فحص الجودة سريع فقط", "Because quality checks are just quick", "السرعة ليست السبب.", "Speed isn’t the reason."),
      o("لأن الإدارة تطلبه", "Because management asks for it", "السبب منطقي لا إداري.", "The reason is logical, not administrative."),
      o("يمكن تأجيله للنهاية", "It can wait until the end", "الكتاب: خطوة أولى إلزامية لا اختيارية تُترك للنهاية.", "The book: a mandatory first step, not optional for the end.")
    ], 0, ["فحص الجودة خطوة أولى إلزامية (ص 19).", "The quality check is a mandatory first step (p. 19)."]),
    Q("y4b", "y4", "compare", ["تريد استعلام SQL مباشرًا على مجلد كامل من ملفات إكسل والنصوص. أي أداة؟", "You want a direct SQL query over a whole folder of Excel and text files. Which tool?"], [
      o("DuckDB", "DuckDB"),
      o("Polars", "Polars", "ممتازة للمعالجة السريعة للجداول الكبيرة، لكن الاستعلام بـSQL على الملفات مباشرة ميزة DuckDB في الكتاب.", "Great for fast processing of big tables, but direct SQL on files is DuckDB’s feature in the book."),
      o("ydata-profiling", "ydata-profiling", "هذه لتقرير جودة تلقائي.", "That’s for an automatic quality report."),
      o("PyAutoGUI", "PyAutoGUI", "هذه لمحاكاة الفأرة.", "That’s for mouse simulation.")
    ], 0, ["ثلاث أدوات تكفي أغلب الحالات: DuckDB للاستعلام، وPolars للسرعة، وydata-profiling للجودة (ص 19–20).", "Three tools cover most cases: DuckDB to query, Polars for speed, ydata-profiling for quality (pp. 19–20)."]),
    O("y4c", "y4", ["رتّب أول خمسة من الأسئلة السبعة قبل أي رسم:", "Order the first five of the seven questions before any chart:"], [
      ["ماذا حدث؟", "What happened?"], ["أين؟", "Where?"], ["لماذا؟", "Why?"], ["ما العوامل؟", "Which factors?"], ["مرة أم متكرر؟", "One-off or recurring?"]
    ], ["ثم: الأثر الكمي والمالي، وماذا لو استمر — وكلها تخدم: ما القرار المطلوب؟ (ص 20).", "Then: quantitative and financial impact, and what if it continues — all serving: what decision is needed? (p. 20)."]),

    Q("y5a", "y5", "compare", ["تقرير يستخدمه فريق صغير في قسم واحد بمنطق خاص بالشركة. ماذا يناسب؟", "A report used by a small team in one department with company-specific logic. What fits?"], [
      o("بايثون", "Python"),
      o("منصة مؤسسية فورًا", "An enterprise platform right away", "المنصة تُحتاج حين يكثر المستخدمون وتتعدد الصلاحيات والحوكمة المركزية.", "A platform is needed when users multiply with different permissions and central governance."),
      o("لا شيء؛ يكفي الورق", "Nothing; paper is enough", "الأتمتة هنا مفيدة.", "Automation helps here."),
      o("الاثنان معًا من البداية", "Both from the start", "الكتاب: ابنِ الحل الأخف أولًا.", "The book: build the lighter solution first.")
    ], 0, ["بايثون يكفي حين يكون النطاق محدودًا والمنطق خاصًا والتوزيع بسيطًا (ص 20).", "Python suffices when scope is limited, logic is specific and distribution is simple (p. 20)."]),
    Q("y5b", "y5", "mcq", ["أي مما يلي إشارة للانتقال إلى منصة مؤسسية؟", "Which of these signals a move to an enterprise platform?"], [
      o("نسخ متعددة بأرقام مختلفة بين الإدارات", "Multiple copies with different numbers across departments"),
      o("أن التقرير يعمل جيدًا", "The report works well", "هذه ليست إشارة انتقال.", "That’s not a switch signal."),
      o("أن الكود قصير", "The code is short", "طول الكود ليس من الإشارات.", "Code length isn’t a signal."),
      o("أن الفريق صغير", "The team is small", "هذا يرجّح بايثون.", "That favours Python.")
    ], 0, ["الإشارات الأربع: نسخ بأرقام مختلفة، وطلبات صلاحيات متكررة، والاعتماد على شخص واحد يشغّل الملف من جهازه، ومؤشرات لا تتطابق بين التقارير متعددة المصادر (ص 21).", "The four signals: copies with different numbers, repeated permission requests, dependence on one person running the file from their PC, and metrics that don’t match across multi-source reports (p. 21)."]),

    Q("y6a", "y6", "mcq", ["ما اختبار النجاح الوحيد للصفحة الإدارية التفاعلية؟", "What is the only success test for the interactive executive page?"], [
      o("فهم الرسالة الأساسية خلال أول ثلاثين ثانية", "The core message is understood within the first thirty seconds"),
      o("عدد الرسوم", "The number of charts", "«جدار الرسوم» عكس المطلوب.", "A “wall of charts” is the opposite of the goal."),
      o("وجود حركة", "Having animation", "«الحركة قبل الأولوية» من الأخطاء الستة.", "“Motion before priority” is one of the six mistakes."),
      o("كثرة الفلاتر", "Many filters", "الفلاتر غير المستخدمة من الأخطاء الستة.", "Unused filters are one of the six mistakes.")
    ], 0, ["سبع محطات تقود القارئ من النتيجة إلى القرار، والتفاصيل لمن يريد (ص 22).", "Seven stations lead the reader from result to decision, with detail for those who want it (p. 22)."]),
    Q("y6b", "y6", "spot", ["لوحة فيها نفس اللون الأحمر يعني «انخفاض» في رسم و«منطقة الشمال» في رسم آخر. أي خطأ هذا؟", "A board uses the same red for “decline” in one chart and “North region” in another. Which mistake is this?"], [
      o("ألوان بلا معنى", "Meaningless colours"),
      o("أرقام بلا مرجع", "Numbers with no reference", "ذاك خطأ آخر: رقم بلا مقارنة بخطة أو فترة.", "That’s another mistake: a number with no comparison to plan or period."),
      o("حركة قبل الأولوية", "Motion before priority", "لا حركة هنا.", "There’s no motion here."),
      o("لا خطأ", "No mistake", "اللون نفسه بمعنيين يربك القارئ.", "The same colour with two meanings confuses the reader.")
    ], 0, ["من الأخطاء الستة: ألوان بلا معنى (اللون نفسه بمعانٍ مختلفة) (ص 22).", "Among the six mistakes: meaningless colours (the same colour meaning different things) (p. 22)."]),

    Q("y7a", "y7", "mcq", ["أي من هذه ليس من معايير قبول المشروع المرجعي؟", "Which of these is NOT an acceptance criterion of the reference project?"], [
      o("استخدام أكبر عدد من المكتبات", "Using as many libraries as possible", "ليس من المعايير؛ البساطة أفضل.", "Not a criterion; simpler is better."),
      o("تشغيل متكامل واحد بلا خطوة يدوية", "One integrated run with no manual step"),
      o("البيانات الأصلية سليمة بعد كل تشغيل", "Original data intact after every run"),
      o("سجل تشغيل واضح", "A clear run log")
    ], 0, ["المعايير: تشغيل متكامل، أصل سليم، سجل واضح، وينتهي بقرار لا بملخص (ص 23).", "Criteria: integrated run, intact originals, clear log, ends with a decision not a summary (p. 23)."]),
    Q("y7b", "y7", "predict", ["عندك بيانات لكن لا تعرف لماذا تغيّر مؤشر كفاءة خط ما. بأي مستوى تبدأ؟", "You have data but don’t know why a line’s efficiency indicator changed. Which level do you start with?"], [
      o("التحليل", "Analysis"),
      o("التشغيل", "Run", "التشغيل لمن يقوم بمهمة يدوية متكررة.", "Run is for someone doing a recurring manual task."),
      o("التقرير", "Reporting", "التقرير لمن عنده تحليل جاهز ويحتاج عرضه.", "Reporting is for someone with analysis ready to present."),
      o("المنصة المؤسسية", "Enterprise platform", "ليست مستوى بداية.", "Not a starting level.")
    ], 0, ["الكتاب (ص 23): التشغيل للمهمة اليدوية المتكررة، والتحليل حين لا تعرف لماذا تغيّر المؤشر، والتقرير حين تحتاج عرضه.", "The book (p. 23): run for a recurring manual task, analysis when you don’t know why an indicator changed, reporting when you need to present it."]),

    /* ---------- Unit 3: dashboards ---------- */
    Q("d1a", "d1", "mcq", ["من أين تبدأ اللوحة الجيدة حسب المرحلة الأولى؟", "Where does a good dashboard start, per stage 1?"], [
      o("من القرار الذي تخدمه، لا من البيانات المتاحة", "From the decision it serves, not the data available"),
      o("من أكبر عدد من الرسوم", "From as many charts as possible", "هذا يُنتج لوحة عامة لا تخدم قرارًا.", "That produces a generic board serving no decision."),
      o("من الألوان والتصميم", "From colours and design", "الهوية البصرية المرحلة السادسة.", "Visual identity is stage 6."),
      o("من الأداة الأحدث", "From the newest tool", "الفرق ليس في الأداة بل في إدارة المحادثة.", "The difference isn’t the tool but how you run the conversation.")
    ], 0, ["اجعل النموذج يسألك 3–5 أسئلة أساسية أولًا (ص 24).", "Have the model ask you 3–5 key questions first (p. 24)."]),
    Q("d1b", "d1", "spot", ["ملف إكسل فيه صفّا عناوين متراكبان وخلايا مدموجة وعمود اسمه Column1. ما المشكلة؟", "An Excel file has two stacked header rows, merged cells and a column named Column1. What’s the problem?"], [
      o("البيانات غير مهيأة: صف أول للعناوين فقط، أسماء ذات معنى، وفك الدمج", "The data isn’t prepared: first row for headers only, meaningful names, unmerge"),
      o("لا مشكلة", "No problem", "هذه بالضبط أخطاء التهيئة التي يذكرها الكتاب.", "These are exactly the prep errors the book lists."),
      o("المشكلة في حجم الملف", "The file size", "الحجم ليس المشكلة هنا.", "Size isn’t the issue here."),
      o("يجب تحويله لصورة", "It should be turned into an image", "هذا يزيد المشكلة.", "That makes it worse.")
    ], 0, ["تهيئة البيانات: خمس دقائق توفر ساعات (ص 24).", "Data prep: five minutes that save hours (p. 24)."]),

    O("d2a", "d2", ["رتّب مراحل اللوحة من 4 إلى 8:", "Order dashboard stages 4 to 8:"], [
      ["البناء", "Build"], ["الفلاتر المتزامنة", "Synced filters"], ["الهوية البصرية", "Visual identity"], ["التحقق من الأرقام", "Verify the numbers"], ["الحفظ والمشاركة", "Save and share"]
    ], ["المراحل كما في ص 24–25. لاحظ: التحقق قبل المشاركة دائمًا.", "The stages as on pp. 24–25. Note: verify always comes before sharing."]),
    Q("d2b", "d2", "mcq", ["ما المرحلة الأكثر حساسية في بناء اللوحة؟", "Which dashboard stage is the most sensitive?"], [
      o("التحقق من الأرقام", "Verifying the numbers"),
      o("اختيار الألوان", "Choosing colours", "مهم، لكنه ليس الأكثر حساسية.", "Important, but not the most sensitive."),
      o("تسمية الملف", "Naming the file", "ليست مرحلة في الكتاب.", "Not a stage in the book."),
      o("الوضع الداكن", "Dark mode", "تعديل بصري بسيط.", "A simple visual tweak.")
    ], 0, ["«المخرَج المصقول ليس بالضرورة صحيحًا» — المراجعة البشرية واجبة قبل أي مشاركة (ص 25).", "“A polished output isn’t necessarily correct” — human review is a must before any sharing (p. 25)."]),

    /* ---------- Unit 4: building a web app ---------- */
    Q("w1a", "w1", "spot", ["متدرب فتح ملفًا واحدًا في VS Code بدل المجلد، واسم المجلد «مشروع المبيعات النهائي». كم خطأ؟", "A trainee opened a single file in VS Code instead of the folder, and the folder is named “مشروع المبيعات النهائي”. How many mistakes?"], [
      o("خطآن: فتح ملف بدل مجلد، ومسار بالعربية ومسافات", "Two: opening a file instead of a folder, and a path with Arabic and spaces"),
      o("لا شيء", "None", "كلاهما من الأخطاء الشائعة الثلاثة.", "Both are among the three common mistakes."),
      o("خطأ واحد: اسم المجلد", "One: the folder name", "فتح ملف وحده يمنع المساعد من رؤية بقية المشروع.", "Opening a lone file stops the assistant seeing the rest of the project."),
      o("خطأ واحد: فتح الملف", "One: opening the file", "الأسماء العربية والمسافات تسبب مشكلات في المسارات.", "Arabic names and spaces cause path problems.")
    ], 0, ["الأخطاء الثلاثة: فتح ملف بدل مجلد، ومسارات بمسافات وعربية، وتثبيت عشرات الإضافات (ص 26).", "The three mistakes: a file instead of a folder, paths with spaces and Arabic, installing dozens of extensions (p. 26)."]),
    Q("w1b", "w1", "mcq", ["ما وظيفة «الطرفية» (Terminal) داخل VS Code؟", "What does the terminal do inside VS Code?"], [
      o("نافذة أوامر نصية لتشغيل التطبيق وتثبيت المكتبات واستدعاء المساعد", "A text command window to run the app, install libraries and call the assistant"),
      o("عرض الملفات فقط", "Only showing files", "هذا دور مستكشف الملفات.", "That’s the file explorer’s job."),
      o("تصميم الواجهات بالسحب والإفلات", "Drag-and-drop UI design", "ليست وظيفتها.", "Not its job."),
      o("تصفح الإنترنت", "Browsing the web", "ليست متصفحًا.", "It isn’t a browser.")
    ], 0, ["المناطق الخمس: شريط النشاط، المستكشف، المحرر، الطرفية، لوحة الأوامر (ص 26).", "The five areas: activity bar, explorer, editor, terminal, command palette (p. 26)."]),

    Q("w2a", "w2", "mcq", ["ما ملف CLAUDE.md؟", "What is CLAUDE.md?"], [
      o("ملف نصي في جذر المشروع يُقرأ تلقائيًا في بداية كل جلسة: التقنيات والقواعد وأوامر التشغيل وما لا يُلمس", "A text file at the project root read automatically each session: tech, rules, run commands and what not to touch"),
      o("كلمة مرور المساعد", "The assistant’s password", "لا تضع أسرارًا فيه أبدًا.", "Never put secrets in it."),
      o("سجل الأخطاء", "The error log", "ليس هذا دوره.", "Not its role."),
      o("نسخة احتياطية من الكود", "A code backup", "النسخ الاحتياطي دور Git.", "Backup is Git’s job.")
    ], 0, ["الأمر ‎/init‎ ينشئه، وهو أهم ملف في مشروعك (ص 27).", "The /init command creates it; it’s your project’s most important file (p. 27)."]),
    Q("w2b", "w2", "spot", ["خلال التعلم فعّل شخص «الموافقة التلقائية» لكل الأوامر، وشغّل المساعد في مجلد المستندات الشخصية. ما المخالفات؟", "While learning, someone enabled auto-approve for all commands and ran the assistant in their personal documents folder. What’s violated?"], [
      o("ضابطان أمنيان: مجلد مخصص للمشروع، وعدم تفعيل الموافقة التلقائية", "Two security controls: a dedicated project folder, and no auto-approve"),
      o("لا شيء؛ هذا أسرع", "Nothing; it’s faster", "الكتاب يقبل البطء مقابل الأمان أثناء التعلم.", "The book accepts slowness for safety while learning."),
      o("فقط المجلد", "Only the folder", "الموافقة التلقائية مخالفة أيضًا.", "Auto-approve is a violation too."),
      o("فقط الموافقة التلقائية", "Only auto-approve", "المجلد الشخصي مخالفة أيضًا.", "The personal folder is a violation too.")
    ], 0, ["ثلاثة ضوابط من اليوم الأول: مجلد مخصص، لا موافقة تلقائية، ولا أسرار في الكود أو CLAUDE.md (ص 27).", "Three controls from day one: a dedicated folder, no auto-approve, and no secrets in code or CLAUDE.md (p. 27)."]),

    Q("w3a", "w3", "compare", ["أي من الثلاثة مسؤول عن «الشكل»: الألوان والمسافات والخطوط؟", "Which of the three handles “look”: colours, spacing and fonts?"], [
      o("CSS", "CSS"),
      o("HTML", "HTML", "HTML هو الهيكل: العناوين والجداول والأزرار.", "HTML is structure: headings, tables, buttons."),
      o("JavaScript", "JavaScript", "JavaScript هو السلوك: ما يحدث عند النقر والتصفية.", "JavaScript is behaviour: what happens on click and filter."),
      o("FastAPI", "FastAPI", "هذه في الواجهة الخلفية.", "That’s back-end.")
    ], 0, ["HTML هيكل (كالخرسانة)، CSS شكل (كالتشطيب)، JavaScript سلوك (ص 28).", "HTML is structure (like concrete), CSS is look (like finishing), JavaScript is behaviour (p. 28)."]),
    Q("w3b", "w3", "mcq", ["ما نصيحة الكتاب للمبتدئ بخصوص أُطر العمل (Frameworks)؟", "What’s the book’s advice to beginners about frameworks?"], [
      o("لا تبدأ بإطار؛ صفحة HTML مع Tailwind ومكتبة رسوم تكفي", "Don’t start with a framework; one HTML page with Tailwind and a chart library is enough"),
      o("ابدأ بأكبر إطار متاح", "Start with the biggest framework available", "إضافته مبكرًا تضيف تعقيدًا بلا فائدة.", "Adding it early adds complexity with no benefit."),
      o("تعلّم ثلاثة أطر قبل البدء", "Learn three frameworks first", "ليس هذا ما يقوله الكتاب.", "Not what the book says."),
      o("الأطر ممنوعة دائمًا", "Frameworks are always banned", "تُضاف حين يكبر المشروع فعلًا.", "They’re added once the project really grows.")
    ], 0, ["قرار أساسي للمبتدئ (ص 28): الإطار حين يكبر المشروع فعلًا.", "A key beginner decision (p. 28): a framework only when the project truly grows."]),

    O("w4a", "w4", ["رتّب رحلة الطلب الواحد:", "Order one request’s journey:"], [
      ["المستخدم يغيّر فلترًا", "The user changes a filter"], ["الواجهة الأمامية ترسل طلبًا", "The front-end sends a request"], ["الخادم يستقبله", "The server receives it"], ["يقرأ البيانات ويحسب", "Reads data and computes"], ["يعيد نتيجة منظمة", "Returns an organised result"], ["الواجهة ترسمها", "The front-end draws it"]
    ], ["الرحلة كما في ص 29.", "The journey as on p. 29."]),
    Q("w4b", "w4", "mcq", ["لماذا نحتاج خادمًا (Server) بدل وضع كل شيء في المتصفح؟", "Why do we need a server instead of putting everything in the browser?"], [
      o("لأن المتصفح محدود في قراءة الملفات والاتصال بقواعد البيانات، ولأن المنطق يجب أن يكون في مكان واحد", "The browser is limited in reading files and connecting to databases, and logic must live in one place"),
      o("لأن الخادم أجمل", "The server looks nicer", "الخادم لا يظهر على الشاشة.", "The server never appears on screen."),
      o("لأن الإنترنت يتطلب ذلك", "The internet requires it", "الخادم هنا محلي بلا إنترنت.", "The server here is local with no internet."),
      o("لا نحتاجه أبدًا", "We never need one", "الكتاب يشرح سببين واضحين.", "The book gives two clear reasons.")
    ], 0, ["الواجهة الخلفية هي العقل: تقرأ وتحسب وتطبّق القواعد وتسلّم النتائج (ص 29).", "The back-end is the brain: it reads, computes, applies rules and hands over results (p. 29)."]),

    Q("w5a", "w5", "spot", ["فريق قضى أيامًا يجمّل واجهة اللوحة، ثم اكتشف أن الأرقام خاطئة بسبب طريقة قراءة الملف. ما الخطأ؟", "A team spent days polishing the dashboard UI, then found the numbers were wrong because of how the file was read. What went wrong?"], [
      o("بنوا الواجهة قبل التحقق من الأرقام", "They built the UI before verifying the numbers"),
      o("اختاروا ألوانًا خاطئة", "They chose the wrong colours", "الألوان ليست سبب الأرقام الخاطئة.", "Colours aren’t why the numbers are wrong."),
      o("استخدموا بيانات حقيقية", "They used real data", "البيانات الحقيقية هي الصحيحة؛ المزيفة تخفي المشكلات.", "Real data is right; fake data hides problems."),
      o("لا خطأ", "No mistake", "الترتيب ليس اقتراحًا.", "The order isn’t a suggestion.")
    ], 0, ["«الترتيب ليس اقتراحًا»: الخادم أولًا وتحقق الأرقام في صفحة التوثيق، ثم الواجهة (ص 30).", "“The order isn’t a suggestion”: server first and check numbers on the docs page, then the UI (p. 30)."]),
    Q("w5b", "w5", "mcq", ["أي مجلد تضع فيه ملفات الإكسل الأصلية كما هي؟", "Which folder holds the original Excel files as they are?"], [
      o("‎/data", "/data"),
      o("‎/backend", "/backend", "هنا كود بايثون الذي يكتبه المساعد.", "That holds the Python code the assistant writes."),
      o("‎/frontend", "/frontend", "هنا صفحات الواجهة.", "That holds the interface pages."),
      o("‎/output", "/output", "المخرجات تُكتب في مكان منفصل عن الأصل.", "Outputs are written separately from originals.")
    ], 0, ["خمسة مجلدات فقط، و‎/data‎ للأصل كما هو (ص 30).", "Just five folders, and /data holds the originals as they are (p. 30)."]),

    Q("w6a", "w6", "mcq", ["ما القاعدة في تشغيل برومبتات التنفيذ الخمسة؟", "What’s the rule for running the five execution prompts?"], [
      o("بالترتيب، ولا تنتقل حتى يعمل السابق فعلًا", "In order, and don’t move on until the previous one actually works"),
      o("كلها في رسالة واحدة", "All in one message", "حشو كل المتطلبات في طلب واحد يقلل الدقة.", "Cramming everything into one request reduces precision."),
      o("بأي ترتيب", "In any order", "الترتيب هو الدرس الأساسي.", "Order is the key lesson."),
      o("ابدأ بالواجهة", "Start with the UI", "الواجهة البرومبت الرابع.", "The UI is prompt four.")
    ], 0, ["البيانات أولًا، ثم أرقام صحيحة، ثم عرض، ثم تلميع (ص 31).", "Data first, then correct numbers, then display, then polish (p. 31)."]),
    Q("w6b", "w6", "mcq", ["ما معنى localhost؟", "What does localhost mean?"], [
      o("خادم على جهازك فقط لا يراه أحد غيرك", "A server only on your machine that nobody else sees"),
      o("موقع على الإنترنت", "A website on the internet", "العكس: محلي بلا نشر.", "The opposite: local, not published."),
      o("خدمة سحابية مدفوعة", "A paid cloud service", "ليس سحابيًا.", "It isn’t cloud."),
      o("اسم مكتبة رسوم", "A chart library name", "ليس مكتبة.", "Not a library.")
    ], 0, ["من مسرد الوحدة (ص 31).", "From the unit glossary (p. 31)."]),

    /* ---------- Unit 5: GitHub, models, system, team ---------- */
    Q("g1a", "g1", "compare", ["ما الفرق بين Git وGitHub؟", "What’s the difference between Git and GitHub?"], [
      o("Git أداة على جهازك تسجّل كل تغيير حتى بدون إنترنت، وGitHub خدمة تستضيف المشاريع على الإنترنت", "Git is a tool on your PC recording every change even offline; GitHub is a service hosting projects online"),
      o("هما الشيء نفسه", "They’re the same", "الكتاب يفرّق بوضوح بين الأداة والخدمة.", "The book clearly separates the tool from the service."),
      o("GitHub يعمل بدون Git", "GitHub works without Git", "GitHub يستضيف مشاريع Git.", "GitHub hosts Git projects."),
      o("Git للصور فقط", "Git is only for images", "Git لأي ملفات نصية وكود.", "Git is for any text files and code.")
    ], 0, ["Git الأداة، وGitHub الخدمة (ص 32).", "Git is the tool, GitHub is the service (p. 32)."]),
    Q("g1b", "g1", "mcq", ["في تشبيهات الكتاب، ما «الـ commit»؟", "In the book’s analogies, what is a “commit”?"], [
      o("محضر اجتماع موقّع ومؤرخ", "Signed, dated meeting minutes"),
      o("ملف القضية بكل أوراقه", "The case file with all its papers", "هذا تشبيه المستودع (repo).", "That’s the repository analogy."),
      o("مسودة جانبية بجانب النسخة المعتمدة", "A side draft next to the approved version", "هذا الفرع (branch).", "That’s a branch."),
      o("اعتماد المسودة ودمجها", "Approving and merging the draft", "هذا الدمج (merge).", "That’s a merge.")
    ], 0, ["سبعة مفاهيم بتشبيهات من العمل المكتبي (ص 32).", "Seven concepts with office-work analogies (p. 32)."]),

    O("g2a", "g2", ["رتّب دورة العمل الكاملة في Git:", "Order the full Git workflow:"], [
      ["pull", "pull"], ["branch", "branch"], ["العمل والتعديل", "Work and edit"], ["status", "status"], ["add", "add"], ["commit", "commit"], ["push", "push"], ["pull request", "pull request"]
    ], ["الدورة الكاملة كما في ص 33.", "The full cycle as on p. 33."]),
    Q("g2b", "g2", "spot", ["رسالة commit: «تعديل»، والملف ‎.env‎ بكلمات المرور مرفوع للمستودع. ما المشكلتان؟", "Commit message: “edit”, and the .env file with passwords was pushed to the repository. What are the two problems?"], [
      o("رسالة بلا معنى، ورفع أسرار دون ‎.gitignore", "A meaningless message, and secrets pushed without a .gitignore"),
      o("لا مشكلة", "No problem", "كلاهما من الأخطاء الشائعة في الكتاب.", "Both are common mistakes in the book."),
      o("فقط الرسالة", "Only the message", "رفع الأسرار أخطر.", "Pushing secrets is worse."),
      o("فقط الملف", "Only the file", "الرسالة يجب أن تقول ماذا ولماذا.", "The message should say what and why.")
    ], 0, ["أنشئ ‎.gitignore‎ يستبعد الإعدادات والمفاتيح، واكتب رسائل «ماذا ولماذا» (ص 33).", "Create a .gitignore excluding settings and keys, and write “what and why” messages (p. 33)."]),

    Q("m1a", "m1", "mcq", ["ماذا تعني «770B إجمالي، 40B نشط» في نموذج MoE؟", "What does “770B total, 40B active” mean in an MoE model?"], [
      o("نموذج ضخم إجمالًا لكنه يشغّل جزءًا صغيرًا لكل سؤال: ذكاء كبير بتكلفة قريبة من الصغير", "Huge overall but activates a small part per question: big intelligence at near-small cost"),
      o("أن 40B فقط تعمل والباقي معطّل للأبد", "Only 40B works and the rest is disabled forever", "الأجزاء النشطة تتغير حسب السؤال.", "The active parts change per question."),
      o("أن النموذج يقرأ 770 كتابًا", "The model reads 770 books", "الأرقام للمعاملات لا للكتب.", "The numbers are parameters, not books."),
      o("السعر بالدولار", "The price in dollars", "ليست أسعارًا.", "They aren’t prices.")
    ], 0, ["خليط الخبراء تصميم حديث (ص 34).", "Mixture of Experts is a modern design (p. 34)."]),
    Q("m1b", "m1", "predict", ["تطبيقك يولّد ردودًا طويلة جدًا. ماذا يحدث للتكلفة مقارنة بالسعر المعلن للمدخلات؟", "Your app generates very long replies. What happens to cost compared with the listed input price?"], [
      o("ترتفع كثيرًا لأن المخرجات أغلى 3–6 مرات من المدخلات", "It rises a lot because output costs 3–6× input"),
      o("لا تتغير", "It doesn’t change", "التسعير رقمان مختلفان للمدخل والمخرج.", "Pricing is two different numbers for input and output."),
      o("تنخفض", "It drops", "العكس.", "The opposite."),
      o("تصبح مجانية", "It becomes free", "لا.", "No.")
    ], 0, ["التسعير دائمًا رقمان: المدخل أرخص، والمخرج أغلى 3–6 مرات. والعربية تستهلك توكنز أكثر (ص 34–35).", "Pricing is always two numbers: input cheaper, output 3–6× pricier. And Arabic uses more tokens (pp. 34–35)."]),

    Q("m2a", "m2", "mcq", ["ماذا تعني «الأوزان المفتوحة»؟", "What do “open weights” mean?"], [
      o("يمكنك تنزيل النموذج وتشغيله داخل شبكة شركتك فلا تخرج البيانات — لكن ليس بالضرورة ترخيصًا مجانيًا بالكامل", "You can download and run the model inside your company network so data stays in — but not necessarily a fully free licence"),
      o("أن النموذج مجاني دائمًا لأي استخدام", "The model is always free for any use", "الكتاب يحذر: لا تعني بالضرورة ترخيصًا مجانيًا كاملًا.", "The book warns: it doesn’t necessarily mean a fully free licence."),
      o("أن الشركة تنشر بياناتك", "The company publishes your data", "العكس: البيانات تبقى عندك.", "The opposite: your data stays with you."),
      o("أنه يعمل على الإنترنت فقط", "It only works online", "يمكن تشغيله محليًا.", "It can run locally.")
    ], 0, ["اقرأ الترخيص دائمًا (ص 35).", "Always read the licence (p. 35)."]),
    Q("m2b", "m2", "spot", ["مقارنة تكلفة اعتمدت فقط على سعر المدخلات، وسعر ترويجي ينتهي الشهر القادم. ما الفخاخ؟", "A cost comparison used only the input price and an introductory price ending next month. Which traps?"], [
      o("فخّان من ثلاثة: تجاهل غلاء المخرجات، والسعر الترويجي المؤقت", "Two of the three: ignoring pricier output, and the temporary introductory price"),
      o("لا فخاخ", "No traps", "كلاهما من فخاخ التسعير في الكتاب.", "Both are pricing traps from the book."),
      o("فخ واحد فقط", "Only one trap", "هناك اثنان واضحان.", "There are two clear ones."),
      o("المشكلة في اسم النموذج", "The problem is the model’s name", "الأسماء تتغير؛ الفخاخ في التسعير.", "Names change; the traps are in pricing.")
    ], 0, ["الفخاخ الثلاثة: المخرجات 3–6 أضعاف، ومضاعفة السعر بعد طول سياق معين، والأسعار الترويجية المؤقتة (ص 35).", "The three traps: output 3–6×, price doubling past a context length, and temporary introductory prices (p. 35)."]),

    Q("m3a", "m3", "compare", ["مبتدئ يريد البحث عن نموذج وتنزيله بنقرة ومعرفة إن كان يناسب ذاكرته. أي أداة؟", "A beginner wants to search, download a model with a click, and see if it fits their memory. Which tool?"], [
      o("LM Studio", "LM Studio"),
      o("Ollama", "Ollama", "Ollama خفيف للأوامر والتضمين؛ الواجهة الرسومية للمبتدئ هي LM Studio.", "Ollama is light, for commands and embedding; the beginner GUI is LM Studio."),
      o("Git", "Git", "Git لتاريخ المشروع.", "Git is for project history."),
      o("DuckDB", "DuckDB", "DuckDB للاستعلام.", "DuckDB is for querying.")
    ], 0, ["LM Studio واجهة رسومية للمبتدئ، وOllama سطر أوامر سهل التضمين — وكلاهما يوفر خادمًا متوافقًا مع OpenAI API (ص 36).", "LM Studio is a GUI for beginners; Ollama is a command line easy to embed — both offer an OpenAI-API-compatible server (p. 36)."]),
    Q("m3b", "m3", "mcq", ["جهازك فيه 16 جيجابايت ذاكرة. أي حجم نموذج يناسبه تقريبًا حسب الكتاب؟", "Your machine has 16 GB of memory. Roughly which model size fits, per the book?"], [
      o("7–9B", "7–9B"),
      o("70B+", "70B+", "هذا يحتاج 64 جيجابايت أو أكثر.", "That needs 64 GB or more."),
      o("14–32B", "14–32B", "هذا لـ 24–32 جيجابايت.", "That’s for 24–32 GB."),
      o("3–4B فقط", "Only 3–4B", "هذا لـ 8 جيجابايت؛ 16 تسمح بأكبر.", "That’s for 8 GB; 16 allows bigger.")
    ], 0, ["الدليل التقريبي: 8 ← 3–4B، 16 ← 7–9B، 24–32 ← 14–32B، 64+ ← 70B+. والذاكرة قبل المعالج (ص 36).", "The rough guide: 8 → 3–4B, 16 → 7–9B, 24–32 → 14–32B, 64+ → 70B+. Memory before processor (p. 36)."]),

    Q("s1a", "s1", "mcq", ["ما الاختبار الحاسم لمعرفة حجم الفجوات في نظامك؟", "What’s the decisive test of how many gaps your system has?"], [
      o("عدد مرات نقل شيء يدويًا في العملية", "How many times something is moved by hand in the process"),
      o("عدد الأدوات المستخدمة", "The number of tools used", "كثرة الأدوات لا تعني نظامًا.", "More tools don’t mean a system."),
      o("عدد الموظفين", "Headcount", "ليس مقياس الكتاب.", "Not the book’s measure."),
      o("سرعة الأجهزة", "Machine speed", "لا علاقة لها.", "Unrelated.")
    ], 0, ["كل نقل يدوي فجوة: نقطة تأخير ومصدر خطأ واعتماد على شخص. عدّها (ص 37).", "Every manual hand-off is a gap: a delay point, error source and dependence on one person. Count them (p. 37)."]),
    Q("s1b", "s1", "spot", ["إدارتان تختلفان في رقم «الوحدات المنتجة» وتعقدان اجتماعات لمعرفة أيهما الصحيح. أي مبدأ مفقود؟", "Two departments disagree on “units produced” and hold meetings over which number is right. Which principle is missing?"], [
      o("مصدر واحد للحقيقة", "A single source of truth"),
      o("التشغيل بالحدث", "Event-driven running", "مبدأ مهم، لكنه لا يحل تعدد التعريفات.", "Important, but it doesn’t fix multiple definitions."),
      o("الإشعارات", "Notifications", "لا تحل الخلاف على التعريف.", "They don’t fix the definition dispute."),
      o("لا شيء مفقود", "Nothing’s missing", "تعدد التعريفات يولّد بالضبط هذه الاجتماعات.", "Multiple definitions breed exactly these meetings.")
    ], 0, ["لكل رقم تعريف واحد ومكان حساب واحد (ص 37).", "Every number has one definition and one place it’s computed (p. 37)."]),

    Q("s2a", "s2", "mcq", ["ما معنى «ابنِ عميقًا لا عريضًا»؟", "What does “build deep, not wide” mean?"], [
      o("اختر عملية صغيرة وابنِ لها كل الطبقات الخمس حتى الإشعار والقرار", "Pick one small process and build all five layers up to notification and decision"),
      o("ابنِ طبقة التجميع لكل بيانات الشركة أولًا", "Build the collection layer for all company data first", "ستقضي شهورًا بلا شيء يراه أحد.", "You’d spend months with nothing anyone can see."),
      o("ابدأ بأصعب عملية", "Start with the hardest process", "من الأخطاء القاتلة الثلاثة.", "One of the three project-killing mistakes."),
      o("استخدم أكبر نموذج", "Use the biggest model", "لا علاقة له بمفهوم الشريحة.", "Unrelated to the slice idea.")
    ], 0, ["الشريحة العمودية: سلسلة ضيقة تعمل من البداية للنهاية (ص 38).", "The vertical slice: one narrow chain working end to end (p. 38)."]),
    Q("s2b", "s2", "spot", ["فريق ترك النموذج اللغوي يحسب مؤشرات الكفاءة الرسمية بدل معادلات ثابتة. أي خطأ؟", "A team let the language model compute official efficiency KPIs instead of fixed formulas. Which mistake?"], [
      o("ذكاء اصطناعي حيث مكان الحساب", "AI where calculation belongs"),
      o("البدء بأصعب عملية", "Starting with the hardest process", "خطأ آخر من الثلاثة.", "Another of the three."),
      o("لا خطأ", "No mistake", "الحساب الرسمي مكانه القواعد الثابتة؛ والذكاء الاصطناعي للشرح.", "Official calculation belongs to fixed rules; AI is for explaining."),
      o("كثرة الإشعارات", "Too many notifications", "ليست هي المشكلة هنا.", "Not the issue here.")
    ], 0, ["في رحلة الحدث: القواعد تحسب وتكشف الانحراف، ثم الذكاء الاصطناعي يشرح (ص 37–38).", "In the event journey: rules compute and detect deviation, then AI explains (pp. 37–38)."]),

    Q("t1a", "t1", "mcq", ["بأي فريق يوصي الكتاب أن تبدأ؟", "Which team does the book recommend starting with?"], [
      o("ثلاثة: جامع البيانات، والمحلل، والناقد", "Three: collector, analyst, critic"),
      o("الأدوار السبعة كاملة", "All seven roles", "الكتاب: لا تبدأ بسبعة.", "The book: don’t start with seven."),
      o("وكيل واحد يفعل كل شيء", "One agent doing everything", "هذا ما يحاول الفريق تجاوزه.", "That’s what the team tries to move past."),
      o("عشرة وكلاء", "Ten agents", "تعقيد بلا مبرر.", "Unjustified complexity.")
    ], 0, ["أضف دورًا فقط حين تُظهر التجربة فشلًا محددًا (ص 39).", "Add a role only when experience shows a specific failure (p. 39)."]),
    Q("t1b", "t1", "compare", ["عملية بترتيب ثابت: خطوة بعد خطوة. أي نمط تنسيق أبسط وأسهل تتبعًا؟", "A process with a fixed order: step after step. Which coordination pattern is simplest and easiest to trace?"], [
      o("السلسلة", "Chain"),
      o("التوزيع والتجميع", "Fan-out/fan-in", "لمصادر متعددة متوازية ثم الدمج.", "For several parallel sources then merging."),
      o("لا نمط", "No pattern", "النمط يحدد من يسلّم لمن.", "The pattern defines who hands to whom."),
      o("كل الوكلاء معًا بلا ترتيب", "All agents at once with no order", "يصعب تتبعه.", "Hard to trace.")
    ], 0, ["ثلاثة أنماط: السلسلة (للترتيب الثابت)، والتوزيع والتجميع (لمصادر أو إدارات متعددة)، والمنفّذ والناقد (حين تتقدم الجودة على السرعة) (ص 39).", "Three patterns: chain (fixed order), fan-out/fan-in (several sources or departments), and executor and critic (when quality beats speed) (p. 39)."]),

    Q("t2a", "t2", "mcq", ["في الحوكمة، أي الأفعال تحتاج دائمًا موافقة بشرية؟", "In governance, which actions always need human approval?"], [
      o("الإرسال والحذف", "Sending and deleting"),
      o("القراءة", "Reading", "القراءة أقل خطرًا؛ المبدأ أقل صلاحية ممكنة.", "Reading is lower risk; the principle is least privilege."),
      o("الحساب", "Computing", "الحساب داخلي.", "Computing is internal."),
      o("لا شيء", "Nothing", "الكتاب يحدد الإرسال والحذف.", "The book names sending and deleting.")
    ], 0, ["أقل صلاحية ممكنة، وسجل كامل لكل خطوة (ص 40).", "Least possible privilege, and a full log of every step (p. 40)."]),
    Q("t2b", "t2", "spot", ["بطاقة وكيل فيها: الهدف «يساعد في كل شيء»، ولا حدود توقف. ما الخلل؟", "An agent card says: goal “helps with everything”, and no stop limits. What’s wrong?"], [
      o("الهدف ليس جملة واحدة محددة، وحدود التوقف مفقودة", "The goal isn’t one specific sentence, and stop limits are missing"),
      o("لا خلل", "Nothing", "البطاقة تفقد عنصرين من الخمسة.", "The card misses two of the five elements."),
      o("البطاقة يجب أن تكون صورة", "The card should be an image", "تُكتب في ملف نصي ليسهل مراجعتها.", "It’s written in a text file to ease review."),
      o("يجب حذف الأدوات", "The tools should be removed", "الأدوات عنصر أساسي.", "Tools are a core element.")
    ], 0, ["البطاقة خمسة عناصر: الهدف (جملة واحدة)، والمدخل والمخرج، والأدوات (المسموح والممنوع)، وحدود التوقف (متى يتوقف ويسأل إنسانًا)، ومعيار النجاح (شرط قابل للفحص) (ص 40).", "The card has five elements: goal (one sentence), input and output, tools (allowed and forbidden), stop limits (when to stop and ask a human), and a success criterion (a checkable condition) (p. 40)."])
  ];
})(window.ACADEMY);
