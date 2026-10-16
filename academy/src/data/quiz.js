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
    Q("f1a", "f1", "mcq", ["إيه «المعاملات» (الأوزان) جوّا النموذج؟", "What are a model’s “parameters” (weights)?"], [
      o("أرقام جوّا النموذج بيتعلّمها في التدريب وبيخزّن فيها معرفته", "Internal numbers learned in training that store its knowledge"),
      o("عدد الأسئلة اللي تقدر تسألها في اليوم", "How many questions you can ask per day", "ده حدّ استخدام في الخدمة، مش جزء من النموذج نفسه.", "That’s a service usage limit, not part of the model."),
      o("قاعدة بيانات فيها إجابات جاهزة", "A database of ready answers", "النموذج مش بيحفظ إجابات جاهزة؛ بيولّد الإجابة على حسب اللي اتعلّمه في أوزانه.", "The model doesn’t store ready answers; it generates them from what its weights learned."),
      o("ملفات شركتك اللي رفعتها", "Your company files you uploaded", "ملفاتك جزء من الـ Context اللي بتدّيه له، مش من أوزانه.", "Your files are context you give it, not its weights.")
    ], 0, ["الكتاب (ص 34): المعاملات أرقام جوّا النموذج بيتعلّمها في التدريب وبتخزّن معرفته، وبيتقاسوا بالمليارات (B) أو التريليونات (T).", "The book (p. 34): parameters are internal numbers learned in training that store the model’s knowledge, measured in billions (B) or trillions (T)."]),
    Q("f1b", "f1", "spot", ["زميلك بيقول: «النموذج ردّ بثقة عالية جدًا، يبقى الإجابة صح». فين الغلط؟", "A colleague says: “The model answered very confidently, so it must be right.” Where’s the flaw?"], [
      o("الثقة في الكلام مش دليل على الصحة؛ النموذج ممكن يغلط وهو واثق", "Confident wording isn’t proof; the model can be wrong confidently"),
      o("مفيش غلط؛ النماذج مش بتبان واثقة إلا لما تكون متأكدة", "No flaw; models only sound confident when sure", "ده بالظبط اللي الكتاب بيحذّر منه: ممكن يديك معلومة غلط بثقة.", "That’s exactly what the book warns about: it can give wrong information confidently."),
      o("الغلط إنه كان لازم يستخدم نموذج أكبر", "The flaw is not using a bigger model", "حتى النماذج الكبيرة ممكن تغلط؛ المشكلة في طريقة الحكم مش في الحجم.", "Even big models can be wrong; the problem is how we judge, not size."),
      o("الغلط إن السؤال كان بالعربي", "The flaw is that the question was in Arabic", "اللغة ملهاش علاقة بالغلط المنطقي ده.", "Language has nothing to do with this reasoning error.")
    ], 0, ["الذكاء الاصطناعي «قوي جدًا بس مش معصوم»، وممكن يقدّم معلومة غلط بثقة (ص 34 و41). الحل: راجع واتأكد من المصادر قبل ما تقرر.", "AI is “very powerful but not infallible” and can give wrong information confidently (pp. 34, 41). The fix: review and verify sources before deciding."]),

    Q("f2a", "f2", "mcq", ["إيه الجملة اللي الكورس عاوزك تقولها في الآخر؟", "Which sentence does the course want you to say at the end?"], [
      o("«عندي مشكلة، وعارف أحوّلها لنظام ذكي»", "“I have a problem, and I know how to turn it into a smart system”"),
      o("«عارف أستخدم الذكاء الاصطناعي»", "“I know how to use AI”", "دي نقطة البداية اللي الكتاب بيذكرها، مش الوصول.", "That’s the starting point the book mentions, not the destination."),
      o("«حفظت كل الـ Prompts»", "“I memorised all the prompts”", "الكتاب بيقول صراحة: ماتحفظش الـ Prompts، افهم غرضها.", "The book says plainly: don’t memorise prompts, understand their purpose."),
      o("«جرّبت كل الأدوات الجديدة»", "“I tried every new tool”", "جمع الأدوات من الأخطاء اللي بتعطّل التغيير (ص 16).", "Collecting tools is one of the mistakes that block change (p. 16).")
    ], 0, ["الهدف مش استخدام الأدوات بس، لكن تشوف الشغل كنظام متكامل (ص 3–4).", "The goal isn’t just using tools but seeing work as an integrated system (pp. 3–4)."]),
    O("f2b", "f2", ["رتّب أول خمس درجات في سلّم التدرّج زي ما في الكتاب:", "Order the first five steps of the learning ladder as in the book:"], [
      ["مساعد شخصي", "Personal assistant"], ["عقل ثانٍ", "Second brain"], ["موظف رقمي", "Digital employee"], ["أتمتة", "Automation"], ["أداة", "Tool"]
    ], ["السلّم الكامل: مساعد شخصي ← عقل ثانٍ ← موظف رقمي ← أتمتة ← أداة ← تطبيق ← نظام ← فريق رقمي ذكي (ص 4).", "The full ladder: personal assistant → second brain → digital employee → automation → tool → application → system → smart digital team (p. 4)."]),

    Q("f3a", "f3", "mcq", ["حسب الكتاب، إيه اللي بيرفع قيمة النتيجة في رحلة «من البيانات للقرار»؟", "Per the book, what raises the value of the result in the “data to decision” journey?"], [
      o("جودة البيانات والـ Context", "The quality of data and context"),
      o("طول الإجابة", "The length of the answer", "الإجابة الطويلة مش أحسن؛ الكتاب ساعات بيطلب تقصّرها للنص.", "A long answer isn’t better; the book sometimes asks to cut it in half."),
      o("عدد الأدوات المستخدمة", "The number of tools used", "كترة الأدوات مش بتعوّض ضعف البيانات.", "More tools don’t make up for weak data."),
      o("سرعة النت", "Internet speed", "ملهاش علاقة بجودة التحليل.", "Unrelated to analysis quality.")
    ], 0, ["«كل ما البيانات والـ Context أحسن، النتيجة بتبقى أغلى قيمة» (ص 5).", "“The better the data and context, the more valuable the result” (p. 5)."]),
    O("f3b", "f3", ["رتّب خطوات رحلة «من البيانات للقرار»:", "Order the “data to decision” journey:"], [
      ["جمع", "Collect"], ["تحليل", "Analyse"], ["تلخيص", "Summarise"], ["مقارنة", "Compare"], ["اقتراح", "Suggest"]
    ], ["جمع ← تحليل ← تلخيص ← مقارنة ← اقتراح (ص 5).", "Collect → analyse → summarise → compare → suggest (p. 5)."]),

    Q("f7a", "f7", "compare", ["إنت محتاج حد يخطط ويستخدم أدوات وينفّذ المهمة ويتابعها. هتختار إيه؟", "You need something that plans, uses tools, carries out the task and follows up. Which do you pick?"], [
      o("وكيل ذكي", "A smart agent"),
      o("دردشة عادية", "Traditional chat", "الدردشة: بتسأل وتاخد إجابة وبعدين بتقف.", "Chat: you ask, get an answer, and it stops."),
      o("مساعد شخصي", "A personal assistant", "المساعد بيفهمك وبيذكّر الـ Context، بس التخطيط والتنفيذ بالأدوات صفة الوكيل.", "An assistant understands and remembers context, but planning and executing with tools is the agent’s trait."),
      o("محرك بحث", "A search engine", "محرك البحث بيرجع روابط بس.", "A search engine only returns links.")
    ], 0, ["الكتاب (ص 6): الدردشة بتجيب، المساعد بيفهم وبيذكّر، والوكيل بيخطط ويستخدم الأدوات وينفّذ ويتابع.", "The book (p. 6): chat answers, an assistant understands and remembers, an agent plans, uses tools, executes and follows up."]),
    Q("f4b", "f4", "mcq", ["إيه العلاقة بين «الـ Prompt» و«الـ Context»؟", "How do the “prompt” and the “context” relate?"], [
      o("الـ Prompt جزء من الـ Context: بيحدد المهمة وشكل الإجابة", "The prompt is part of the context: it sets the task and the answer’s shape"),
      o("هما نفس الحاجة", "They’re the same thing", "الـ Context أوسع: كل المعلومات عن وضعك وهدفك ومشكلتك.", "Context is wider: all the information about your situation, goal and problem."),
      o("الـ Context جزء من الـ Prompt", "The context is part of the prompt", "العكس هو الصح حسب الكتاب.", "It’s the other way round, per the book."),
      o("مفيش علاقة بينهم", "They’re unrelated", "الـ Prompt بيشتغل جوّا الـ Context.", "The prompt works inside the context.")
    ], 0, ["الـ Context كل اللي بتدّيه للذكاء الاصطناعي عشان يفهم وضعك؛ والـ Prompt جزء منه بيحدد المهمة وإزاي عاوز الإجابة (ص 6).", "Context is everything you give AI to understand your situation; the prompt is part of it and sets the task and the answer’s form (p. 6)."]),

    Q("f6a", "f6", "predict", ["محادثة طويلة قلت في أولها «كل الأرقام بالجنيه»، وبعد ساعتين ورفع ملفات كتير طلبت الملخص. إيه الأرجح يحصل؟", "In a long chat you said at the start “every figure in pounds”; two hours and many uploads later you ask for the summary. What is most likely?"], [
      o("ممكن يكتب بعملة تانية، لأن الشرط وقع من الـ Context أو اتلخّص", "It may use another currency, because the rule fell out of the Context or was summarised"),
      o("هيلتزم بالشرط أكيد، لأن المحادثة كلها لسه ظاهرة على الشاشة", "It will surely keep the rule, because the whole chat is still on screen", "اللي ظاهر قدامك مش بالضرورة لسه قدام الموديل؛ لما الترابيزة تتملي الأقدم بيقع.", "What you see isn’t necessarily still in front of the model; when the table fills, the oldest falls off."),
      o("هيرفض يكمّل لحد ما تعيد الشرط", "It will refuse to continue until you restate the rule", "الموديل ما بيعرفش إن حاجة وقعت؛ بيكمّل بالأرجح من خبرته العامة.", "The model doesn’t know something fell off; it carries on with the most likely option."),
      o("هيسألك عن العملة دايمًا قبل ما يكتب", "It will always ask you about the currency first", "ممكن يسأل لو طلبت منه كده، لكن من غير طلب غالبًا هيختار الأرجح.", "It may ask if you told it to; otherwise it usually picks the likeliest option.")
    ], 0, ["نافذة الـ Context محدودة (ص 34): لما تتملي، التطبيق بيشيل الأقدم أو يلخّصه، والشرط اللي اتقال في الأول هو أول حاجة ممكن تضيع. كرّر الشروط المهمة في الطلب المهم.", "The context window is limited (p. 34): when it fills, the app drops or summarises the oldest part, and a rule given at the start is the first thing that can be lost. Repeat key rules in the important request."]),
    Q("f6b", "f6", "mcq", ["ليه نافذة الـ Context ما بتكبرش من غير حد؟", "Why can’t the context window grow without limit?"], [
      o("لأن كل كلمة بتبص على اللي قبلها، فالشغل والذاكرة والتكلفة بيكبروا أسرع من طول الكلام", "Because every word looks at those before it, so work, memory and cost grow faster than the text"),
      o("لأن الشركات مش عايزة تديك مساحة أكبر", "Because companies don’t want to give you more room", "الخطط والأسعار بتأثر، بس السبب الأساسي هندسي: الحساب بيكبر أسرع من الكلام.", "Plans and prices play a part, but the root cause is engineering: computation grows faster than text."),
      o("لأن الموديل بيحفظ المحادثات القديمة في أوزانه", "Because the model stores old chats in its weights", "الأوزان ما بتتغيّرش وإنت بتكلّمه؛ المحادثة كلها بتتقري تاني في الـ Context مع كل رسالة.", "The weights don’t change while you talk; the whole chat is re-read in the Context with every message."),
      o("لأن العربي ما ينفعش في النصوص الطويلة", "Because Arabic doesn’t work for long texts", "العربي بياخد توكنز أكتر، لكنه مش سبب الحد.", "Arabic takes more tokens, but it isn’t the cause of the limit.")
    ], 0, ["الانتباه بيخلّي كل كلمة تبص على كل اللي قبلها: ضعف الكلام ≈ ٤ أضعاف الشغل، ومعاه ذاكرة ووقت وتكلفة أكتر. وحتى لو الكلام دخل كله، النص بياخد انتباه أقل.", "Attention makes every word look at everything before it: double the text ≈ 4× the work, plus more memory, time and cost. And even when everything fits, the middle gets less attention."]),

    Q("f7b", "f7", "mcq", ["التطبيق قالك «أنا فاكر إنك في قسم الجودة». ده معناه إيه فعلًا؟", "The app says “I remember you work in quality”. What does that really mean?"], [
      o("التطبيق حافظ ملاحظة عنك برّه الموديل، وبيحطها على الترابيزة في أول كل محادثة", "The app keeps a note about you outside the model and places it on the table at the start of each chat"),
      o("أوزان الموديل اتغيّرت واتعلّم عنك", "The model’s weights changed and it learned about you", "الأوزان ما بتتغيّرش من محادثاتك؛ اتحددت وقت التدريب.", "The weights don’t change from your chats; they were fixed in training."),
      o("الموديل بيفتكر كل محادثاتك القديمة كلها بالتفصيل", "The model remembers all your old chats in full detail", "الذاكرة ملاحظات مختارة ومحدودة، وبتاخد من مساحة الترابيزة.", "Memory is selected, limited notes that take table space."),
      o("المعلومة دي مستحيل تبقى غلط أو قديمة", "That information can never be wrong or stale", "الذاكرة ممكن تبقى قديمة؛ راجعها وامسح اللي اتغيّر.", "Memory can go stale; review it and delete what has changed.")
    ], 0, ["الذاكرة نص متخزّن برّه الموديل (تعليمات، أو ذاكرة تلقائية، أو ملفات مشروع)، والتطبيق بيحطه على الترابيزة. علشان كده ممكن تراجعه وتمسحه، وممكن يبقى قديم.", "Memory is text stored outside the model (instructions, automatic memory or project files) that the app places on the table — so you can review and delete it, and it can go stale."]),

    Q("f5a", "f5", "mcq", ["إيه المعادلة اللي الكتاب بيختم بيها لأحسن نتيجة؟", "Which equation does the book end with for the best result?"], [
      o("إنسان بيفكّر + بيانات كويسة + ذكاء اصطناعي", "A thinking human + good data + AI"),
      o("أقوى نموذج + أطول Prompt", "The strongest model + the longest prompt", "الكتاب مش بيربط الجودة بالطول ولا بالحجم لوحده.", "The book ties quality neither to length nor to size alone."),
      o("ذكاء اصطناعي بدل الإنسان", "AI instead of the human", "الكتاب: «بيشتغل أحسن معاك، مش بدالك».", "The book: “it works best with you, not instead of you.”"),
      o("بيانات كتير من غير مراجعة", "Lots of data without review", "القرارات الحساسة محتاجة مراجعة بشرية.", "Sensitive decisions need human review.")
    ], 0, ["أحسن نتيجة = إنسان بيفكّر + بيانات كويسة + ذكاء اصطناعي (ص 41).", "Best result = a thinking human + good data + AI (p. 41)."]),
    O("f5b", "f5", ["رتّب خطوات الاستخدام الواعي:", "Order the steps of wise use:"], [
      ["حدّد الهدف", "Define the goal"], ["ادّي الـ Context", "Give context"], ["راجع النتيجة", "Review the result"], ["اتأكد من المصادر", "Verify sources"], ["خُد القرار", "Decide"]
    ], ["حدّد الهدف ← ادّي الـ Context ← راجع النتيجة ← اتأكد من المصادر ← خُد القرار (ص 41). القرار دايمًا عندك.", "Define the goal → give context → review → verify sources → decide (p. 41). The decision is always yours."]),

    /* ---------- Unit 1: personal assistant & second brain ---------- */
    Q("p1a", "p1", "mcq", ["إيه المعادلة الحاكمة لأي Prompt كويس؟", "What is the governing equation of any good prompt?"], [
      o("هدف واضح + Context كافي + طلب محدد + شكل مخرج = نتيجة تنفع تنفّذها", "Clear goal + enough context + specific request + output format = an actionable result"),
      o("سؤال قصير + نموذج قوي = إجابة صح", "Short question + strong model = right answer", "ده «الاستخدام الأضعف» اللي الكتاب بيحذّر منه.", "That’s the “weakest use” the book warns about."),
      o("أمثلة كتير + إنجليزي = نتيجة أحسن", "Many examples + English = better result", "الأمثلة عنصر مفيد، بس مش المعادلة كلها، واللغة مش شرط.", "Examples help but aren’t the whole equation, and language isn’t a requirement."),
      o("كلمات مفتاحية + تكرار = دقة", "Keywords + repetition = precision", "ده أسلوب محركات البحث مش أسلوب الـ Prompt.", "That’s search-engine style, not prompting.")
    ], 0, ["المعادلة في ص 7 بتحوّل السؤال العابر لنتيجة تنفع تنفّذها: خطة أو قرار أو أداة.", "The equation on p. 7 turns a passing question into an actionable result: a plan, a decision or a tool."]),
    Q("p1b", "p1", "spot", ["Prompt: «ساعدني في التقرير». إيه العنصر اللي واضح إنه ناقص؟", "Prompt: “Help me with the report.” Which element is most clearly missing?"], [
      o("الهدف: إنت عاوز تعرف إيه أو تقرر إيه بالظبط", "The goal: what exactly you want to know or decide"),
      o("مفيش حاجة؛ النموذج هيفهم لوحده", "Nothing; the model will figure it out", "الأداة مش عارفة عن شغلك غير اللي إنت بتقوله.", "The tool knows nothing about your work except what you tell it."),
      o("علامات الترقيم", "Punctuation", "مش دي المشكلة؛ المشكلة غياب الهدف والـ Context.", "Not the issue; the issue is missing goal and context."),
      o("اسم النموذج", "The model’s name", "اسم الأداة مش بيغيّر حاجة هنا.", "The tool’s name changes nothing here.")
    ], 0, ["الكتاب بيضرب المثال ده: مش «ساعدني في التقرير» لكن «عاوز أعرف ليه المبيعات نزلت» (ص 7).", "The book uses this example: not “help me with the report” but “I want to know why sales fell” (p. 7)."]),

    Q("p2a", "p2", "mcq", ["ليه «أهم تقنية» بتبدأ بـ «اسألني عن أي معلومة ناقصة»؟", "Why does the “strongest technique” start with “ask me about any missing information”?"], [
      o("عشان تجبر الأداة تكشف افتراضاتها بدل ما تخمّن من غير ما تقول", "To force the tool to reveal its assumptions instead of silently guessing"),
      o("عشان تطوّل المحادثة", "To make the conversation longer", "الهدف الدقة مش الطول.", "The aim is precision, not length."),
      o("عشان النموذج مش بيرد من غيرها", "Because the model won’t answer without it", "هيرد، بس هيخمّن اللي ناقص.", "It will answer, but it will guess what’s missing."),
      o("عشان توفّر التوكنز", "To save tokens", "مش ده سببها في الكتاب.", "That’s not its reason in the book.")
    ], 0, ["الجملة بتحل تلات مشاكل: كشف الافتراضات، ومنع التعقيد، والتقاط الأخطاء باختبار الحالات الطرفية (ص 7).", "The sentence fixes three problems: revealing assumptions, preventing complexity, and catching errors by testing edge cases (p. 7)."]),
    Q("p2b", "p2", "compare", ["أي جزء في الجملة بيمنع حل معقّد مش هتعرف تصلّحه؟", "Which part of the sentence prevents a complex solution you can’t maintain?"], [
      o("«أبسط حل ممكن»", "“The simplest possible solution”"),
      o("«اسألني عن الناقص»", "“Ask me what’s missing”", "ده بيكشف الافتراضات.", "That reveals assumptions."),
      o("«اختبر الحالات الطرفية»", "“Test the edge cases”", "ده بيلقط الأخطاء.", "That catches errors."),
      o("«اشرحه ببساطة»", "“Explain it simply”", "بيساعد على الفهم، بس منع التعقيد بيجي من طلب أبسط حل.", "Helps understanding, but preventing complexity comes from asking for the simplest solution.")
    ], 0, ["كل جزء ليه وظيفة: الناقص ← الافتراضات، الأبسط ← التعقيد، الحالات الطرفية ← الأخطاء.", "Each part has a job: missing → assumptions, simplest → complexity, edge cases → errors."]),

    Q("p3a", "p3", "spot", ["موظف طلب معادلة، عجبته النتيجة فطبّقها على طول على ملف المبيعات الأصلي. إيه الغلط؟", "An employee got a formula, liked it, and applied it straight to the original sales file. What’s wrong?"], [
      o("التطبيق على الملف الأصلي؛ الصح تجرب على نسخة ببيانات صغيرة الأول", "Applying it to the original; test on a copy with small data first"),
      o("مفيش غلط؛ النتيجة عجبته", "No mistake; he liked the result", "الإعجاب مش اختبار.", "Liking it isn’t testing it."),
      o("كان لازم يطلب معادلة أطول", "He should have asked for a longer formula", "الطول مش معيار؛ الكتاب بيفضّل الأبسط.", "Length isn’t a criterion; the book prefers simpler."),
      o("كان لازم يستخدم أداة تانية", "He should have used another tool", "المشكلة في طريقة التطبيق مش في الأداة.", "The problem is how he applied it, not the tool.")
    ], 0, ["من الأخطاء الأربعة: قبول أول إجابة، والتطبيق على طول على الملف الحقيقي. اختبر على نسخة وبعدين عمّم (ص 8).", "Among the four mistakes: accepting the first answer and applying straight to the real file. Test on a copy, then roll out (p. 8)."]),
    Q("p3b", "p3", "mcq", ["إيه الوصف الصح للبيانات حسب الكتاب؟", "What is the right way to describe data, per the book?"], [
      o("أسماء الأعمدة الحقيقية ونوع كل عمود والعدد التقريبي للصفوف", "Real column names, each column’s type and the approximate row count"),
      o("«عندي جدول مبيعات»", "“I have a sales table”", "ده بالظبط مثال «الوصف المبهم» في الكتاب.", "That’s exactly the book’s “vague description” example."),
      o("إرسال الملف كامل من غير أي شرح", "Sending the whole file with no explanation", "ممكن يكون حساس، ومش بيشرح القواعد أو المطلوب.", "It may be sensitive and doesn’t explain rules or the goal."),
      o("وصف شكل الجدول وألوانه", "Describing the table’s look and colours", "الشكل مش بيفيد في بناء المنطق.", "Looks don’t help build the logic.")
    ], 0, ["الوصف الدقيق لبنية البيانات بيمنع أغلب الأخطاء (ص 8).", "Describing data structure precisely prevents most errors (p. 8)."]),

    Q("p4a", "p4", "predict", ["النتيجة «صح بشكل عام بس مش مناسبة لوضعك». المستخدم الماهر بيعمل إيه؟", "The result is “generally right but doesn’t fit your situation.” What does a skilled user do?"], [
      o("بيصحّح في نفس المحادثة: «وضعي مختلف في [الفرق]، أعد الحل على أساس القيد ده»", "Corrects in the same chat: “My situation differs in [the difference]; redo it with that constraint”"),
      o("بيبدأ محادثة جديدة من الصفر", "Starts a new chat from scratch", "ده اللي المبتدئ بيعمله؛ وبيضيّع الـ Context اللي بنيته.", "That’s what a beginner does, and it loses the context you built."),
      o("بيقبل النتيجة زي ما هي", "Accepts it as is", "النتيجة مش مناسبة لوضعك؛ قبولها يعني قرار غلط.", "It doesn’t fit your case; accepting it means a wrong decision."),
      o("بيغيّر الأداة على طول", "Switches tools immediately", "المشكلة في القيد الناقص مش في الأداة.", "The problem is the missing constraint, not the tool.")
    ], 0, ["المبتدئ بيبدأ محادثة جديدة، والماهر بيعدّل المسار في نفس المحادثة (ص 8).", "The beginner starts a new chat; the skilled user corrects course in the same chat (p. 8)."]),
    O("p4b", "p4", ["رتّب حلقة إدارة المحادثة:", "Order the conversation-management loop:"], [
      ["اطلب", "Ask"], ["اقرأ بعين ناقدة", "Read critically"], ["حدّد الغلط", "Pinpoint the flaw"], ["صحّح في نفس المحادثة", "Correct in the same chat"], ["اعتمد أو كرّر", "Adopt or repeat"]
    ], ["الحلقة زي ما في ص 8.", "The loop as on p. 8."]),

    Q("p5a", "p5", "mcq", ["في Prompt «الفرز السريع»، إيه المجموعات الأربعة؟", "In the “quick triage” prompt, what are the four groups?"], [
      o("رد اليوم، فوّض، أجّل بأمان، تجاهل", "Reply today, delegate, safely postpone, ignore"),
      o("مهم، عاجل، سهل، صعب", "Important, urgent, easy, hard", "قريب من مصفوفات تانية، بس مش تقسيم الكتاب.", "Close to other matrices, but not the book’s split."),
      o("صباح، ظهر، مساء، ليل", "Morning, noon, evening, night", "ده تقسيم وقت مش فرز.", "That’s a time split, not triage."),
      o("مدير، زميل، عميل، مورّد", "Manager, colleague, client, supplier", "التقسيم حسب الإجراء مش حسب الشخص.", "The split is by action, not by person.")
    ], 0, ["الفرز السريع: أربع مجموعات مع رد جاهز لكل بند عاجل (ص 10).", "Quick triage: four groups with a ready reply for each urgent item (p. 10)."]),
    O("p5b", "p5", ["رتّب الدورة اليومية للإنتاجية:", "Order the daily productivity cycle:"], [
      ["افهم", "Understand"], ["نظّم", "Organise"], ["قرّر", "Decide"], ["نفّذ", "Execute"], ["راجع", "Review"]
    ], ["افهم (الهدف والـ Context) ← نظّم ← قرّر ← نفّذ ← راجع (ص 10).", "Understand (goal and context) → organise → decide → execute → review (p. 10)."]),

    Q("p6a", "p6", "mcq", ["إيه العنصر اللي بتضيفه مقارنة الخيارين في الكتاب، وناس كتير بتغفل عنه؟", "What does the book’s option comparison add that many people miss?"], [
      o("مدى إمكانية التراجع عن القرار", "How reversible the decision is"),
      o("لون العرض", "The presentation colour", "ملوش علاقة بالقرار.", "Irrelevant to the decision."),
      o("رأي أغلب الزملاء", "What most colleagues think", "الكتاب بيعتمد معايير مش تصويت.", "The book uses criteria, not a vote."),
      o("أيهما أحدث", "Which is newer", "الحداثة مش معيار في الكتاب.", "Newness isn’t a criterion in the book.")
    ], 0, ["المقارنة بالتكلفة والوقت والمخاطرة والعائد والسهولة ومدى إمكانية التراجع، في جدول مع توصية وسببها (ص 10).", "Compare by cost, time, risk, return, ease and reversibility, in a table with a recommendation and its reason (p. 10)."]),
    Q("p6b", "p6", "compare", ["إيه الفرق بين Prompts الإنتاجية والـ Prompts الاستراتيجية؟", "The difference between productivity and strategic prompts?"], [
      o("الأولى بتساعدك تنجز الشغل، والتانية بتساعدك تعرف أي شغل يستاهل تتعمل أصلًا", "The first help you get work done; the second help you know which work is worth doing at all"),
      o("التانية أطول بس", "The second are just longer", "الفرق في الغرض مش في الطول.", "The difference is purpose, not length."),
      o("الأولى للمديرين والتانية للموظفين", "The first for managers, the second for staff", "الاتنين للكل.", "Both are for everyone."),
      o("مفيش فرق", "No difference", "الكتاب بيسمّيه «فرق جوهري».", "The book calls it a “fundamental difference”.")
    ], 0, ["ص 10: القسم اللي فات بيساعدك على الإنجاز، والقسم ده بيساعدك تختار إيه يستاهل.", "p. 10: the previous section helps you get things done; this one helps you choose what’s worth doing."]),

    Q("p7a", "p7", "mcq", ["ليه «الـ Prompt الاستراتيجي الشامل» بينجح؟", "Why does the “all-in-one strategic prompt” work?"], [
      o("عشان بيفرض ترتيب مفيش قفز فوقه: فهم ← تحليل ← تشخيص ← مخاطر ← خيارات ← قرار ← خطوات", "It enforces an order you can’t skip: understand → analyse → diagnose → risks → options → decision → steps"),
      o("عشان أطول Prompt في الدليل", "It’s the longest prompt in the guide", "الطول مش السبب.", "Length isn’t the reason."),
      o("عشان بيديك الحل الأول", "It gives the solution first", "العكس: أغلب القرارات السيئة بتبدأ بالحل قبل ما تفهم المشكلة.", "The opposite: most bad decisions start with the solution before understanding the problem."),
      o("عشان بيشتغل مع أداة واحدة بس", "It only works with one tool", "بيشتغل مع أي مساعد.", "It works with any assistant.")
    ], 0, ["«أغلب القرارات السيئة بتيجي من البدء بالحل قبل ما تفهم المشكلة» (ص 11).", "“Most bad decisions come from starting with the solution before understanding the problem” (p. 11)."]),
    Q("p7b", "p7", "predict", ["كتبت: «ماتوافقنيش تلقائي. اختبر فكرتي…». إيه اللي تتوقع تاخده الأول؟", "You wrote: “Don’t automatically agree with me. Test my idea…” What should you get first?"], [
      o("نقاط الضعف والافتراضات اللي مش متقولة، وبعدين التحسين بعد النقد", "Weaknesses and unstated assumptions, then improvement after the critique"),
      o("مديح للفكرة", "Praise for the idea", "ده بالظبط اللي الجملة بتمنعه.", "That’s exactly what the sentence prevents."),
      o("خطة تنفيذ على طول", "An immediate execution plan", "التنفيذ بيجي بعد النقد والتحسين.", "Execution comes after critique and improvement."),
      o("رفض كامل للفكرة", "A total rejection", "المطلوب نقد بنّاء وبعدين تحسين، مش رفض.", "The ask is constructive critique then improvement, not rejection.")
    ], 0, ["Prompt اختبار الفكرة بيطلب النقد الأول، وبعده بس إزاي تتحسن (ص 11).", "The idea-test prompt asks for critique first, and only then how to improve (p. 11)."]),

    Q("p8a", "p8", "compare", ["إيه اللي بيميّز NotebookLM عن المساعد العادي؟", "What sets NotebookLM apart from an ordinary assistant?"], [
      o("بيجيب بس من المصادر اللي اخترتها في الدفتر", "It answers only from the sources you chose in the notebook"),
      o("أسرع دايمًا", "It’s always faster", "السرعة مش الفرق اللي الكتاب بيذكره.", "Speed isn’t the difference the book names."),
      o("بيكتب كود أحسن", "It writes better code", "مش ده دوره في الكتاب.", "That’s not its role in the book."),
      o("مش محتاج أي مصادر", "It needs no sources", "العكس: قيمته في المصادر اللي إنت بتحددها.", "The opposite: its value is in the sources you set.")
    ], 0, ["المساعد العادي ممكن يخلط مصادرك ببحث برّه، والدفتر بيلتزم بمصادرك (ص 12).", "An ordinary assistant may mix your sources with outside search; the notebook sticks to yours (p. 12)."]),
    Q("p8b", "p8", "spot", ["خطة: «هحط كل ملفات الإدارة في دفتر واحد كبير وأسأله أي حاجة». إيه القاعدة اللي اتكسرت؟", "Plan: “I’ll put all department files in one big notebook and ask it anything.” What rule is broken?"], [
      o("دفتر واحد = هدف واحد", "One notebook = one goal"),
      o("مفيش مخالفة؛ كل ما زادت المصادر زادت الدقة", "None; more sources means more precision", "المصادر اللي ملهاش علاقة بالموضوع بتشوّش الإجابات.", "Unrelated sources muddy the answers."),
      o("لازم تستخدم دفترين بس", "You must use exactly two notebooks", "مفيش عدد ثابت؛ القاعدة هدف لكل دفتر.", "There’s no fixed count; the rule is one goal per notebook."),
      o("الدفاتر مش بتقبل ملفات إكسل", "Notebooks don’t accept Excel files", "بتقبل الجداول ضمن أنواع كتير.", "They accept spreadsheets among many types.")
    ], 0, ["أول القواعد العشر: دفتر واحد = هدف واحد. وافتكر الخصوصية: سياسة الشركة الأول (ص 13).", "The first of the ten rules: one notebook = one goal. And remember privacy: company policy first (p. 13)."]),

    Q("p9a", "p9", "spot", ["طلب: «عاوز معادلة هامش الربح». إيه العنصر الناقص من التلاتة؟", "Request: “I want a profit margin formula.” Which of the three elements is missing?"], [
      o("كلها تقريبًا: بنية البيانات، وتعريف المخرج، وقاعدة الحالة الطرفية", "Nearly all: data structure, output definition and the edge-case rule"),
      o("مفيش حاجة", "Nothing", "من غير أعمدة وقاعدة للفراغ هتيجي معادلة عامة وممكن تغلط.", "Without columns and a blank rule you get a generic formula that may be wrong."),
      o("اسم الملف بس", "Only the file name", "اسم الملف أقل أهمية من بنية الأعمدة.", "The file name matters less than the column structure."),
      o("لون الخلية", "The cell colour", "مش مهم للمنطق.", "Irrelevant to the logic.")
    ], 0, ["التلاتة: وصف دقيق لبنية البيانات، وتعريف واضح للمخرج، وقاعدة صريحة للحالة الطرفية (ص 13).", "The three: a precise data structure, a clear output definition and an explicit edge-case rule (p. 13)."]),
    O("p9b", "p9", ["رتّب خطوات العمل مع إكسل والذكاء الاصطناعي:", "Order the Excel-with-AI steps:"], [
      ["اشرح المشكلة", "Explain the problem"], ["دعه يبني المعادلة", "Let it build the formula"], ["افهمها", "Understand it"], ["اختبرها", "Test it"], ["طبّقها", "Apply it"]
    ], ["«ماتبدأش بالكود، ابدأ بالمشكلة» (ص 13).", "“Don’t start with code, start with a problem” (p. 13)."]),

    Q("p10a", "p10", "mcq", ["إيه «المهارة الجديدة» في الأتمتة حسب الكتاب؟", "What is the “new skill” in automation, per the book?"], [
      o("وصف العملية بدقة، مش كتابة الكود", "Describing the process precisely, not writing code"),
      o("حفظ أوامر VBA", "Memorising VBA commands", "الكتاب بيقول إن القالب الذهبي أهم من تعلّم عشرات الأوامر.", "The book says the golden template beats learning dozens of commands."),
      o("شراء برامج أتمتة", "Buying automation software", "مش ده اللي الكتاب يقصده.", "Not what the book means."),
      o("الكتابة بسرعة على الكيبورد", "Fast typing", "ملهاش علاقة.", "Unrelated.")
    ], 0, ["الرسالة الأساسية (ص 13): الذكاء الاصطناعي محتاج يفهم منطق الشغل وخطواته عشان يكتب كود صح.", "The core message (p. 13): AI needs to understand the business logic and steps to write correct code."]),
    Q("p10b", "p10", "spot", ["حد كتب ماكرو واحد ضخم بيعمل كل حاجة، وجرّبه على الملف الأصلي. كام قاعدة اتكسرت؟", "Someone wrote one huge macro that does everything and ran it on the original file. How many rules were broken?"], [
      o("القاعدتين: الشغل على نسخة، ووحدات صغيرة مش وحش واحد", "Both: work on a copy, and small modules not one monster"),
      o("مفيش حاجة", "None", "أفعال الماكرو مش بتتلغى بالطريقة العادية.", "Macro actions can’t be undone the usual way."),
      o("واحدة بس: الحجم", "Only one: size", "التشغيل على الأصل كسر القاعدة الأولى كمان.", "Running on the original breaks the first rule too."),
      o("واحدة بس: النسخة", "Only one: the copy", "الماكرو الضخم بيكسر قاعدة الوحدات الصغيرة.", "A huge macro breaks the small-modules rule.")
    ], 0, ["قاعدتين ماتكسرهمش (ص 14): اعمل دايمًا على نسخة، ووحدات صغيرة كل واحدة بوظيفة واحدة.", "Two unbreakable rules (p. 14): always work on a copy, and small modules each with one job."]),

    Q("p11a", "p11", "mcq", ["إيه الترتيب الصح لبناء عرض الإدارة؟", "What’s the right order for building a management deck?"], [
      o("المصدر الأول، وبعدين القصة، وبعدين الصورة", "Source first, then story, then image"),
      o("التصميم الأول", "Design first", "الكتاب: ماتبدأش بالتصميم أبدًا.", "The book: never start with design."),
      o("القصة وبعدين المصدر", "Story then source", "القصة بتتبني على حقيقة موثّقة.", "The story is built on documented truth."),
      o("الترتيب مش مهم", "Order doesn’t matter", "الكتاب بيأكد إن الترتيب مهم.", "The book stresses that order matters.")
    ], 0, ["تلات أدوار: عقل المحتوى (الدفتر)، مخرج القصة (المساعد)، الاستوديو البصري (مولّد الصور). وخلط الأدوار هو الغلطة القاتلة (ص 14).", "Three roles: content brain (notebook), story director (assistant), visual studio (image generator). Mixing roles is the fatal mistake (p. 14)."]),
    Q("p11b", "p11", "mcq", ["إيه معيار النجاح الأخير لمشروع التخرج؟", "What is the capstone’s final success criterion?"], [
      o("إنه يخلص بقرار مش بملخص", "It ends with a decision, not a summary"),
      o("إنه يكون فيه أكبر عدد شرائح", "It has the most slides", "الكمية مش معيار.", "Quantity isn’t a criterion."),
      o("إنه يستخدم أحدث أداة", "It uses the newest tool", "مش من المعايير.", "Not one of the criteria."),
      o("إنه يكون ملوّن", "It’s colourful", "الجمال من غير معنى من أخطاء خلط الأدوار.", "Beauty without meaning is a role-mixing mistake.")
    ], 0, ["المعايير: بيشتغل بزر واحد؟ البيانات الأصلية سليمة؟ مدير ما شافش الملف يفهمه؟ يخلص بقرار؟ (ص 15).", "Criteria: runs with one button? Original data intact? Understood by a manager who never saw the file? Ends with a decision? (p. 15)."]),

    Q("p12a", "p12", "spot", ["متدرّب بدأ الأسبوع التاني من خطة التلاتين يوم رغم إنه لسه ما اتعودش على الأسبوع الأول. إيه المشكلة؟", "A trainee started week two of the 30-day plan before week one became a habit. What’s the problem?"], [
      o("خالف قاعدة الخطة: ماتبدأ أسبوع جديد لحد ما اللي قبله يبقى عادة", "He broke the plan’s rule: don’t start a new week until the last is a habit"),
      o("مفيش مشكلة؛ الأسرع أحسن", "No problem; faster is better", "الكتاب بيقدّم العادة على السرعة.", "The book puts habit before speed."),
      o("كان لازم يبدأ بالأسبوع الرابع", "He should have started with week four", "الأتمتة بتيجي بعد الصياغة والإنتاجية.", "Automation comes after wording and productivity."),
      o("الخطة اختيارية بالكامل", "The plan is entirely optional", "القاعدة جزء أساسي منها.", "The rule is a core part of it.")
    ], 0, ["خطة التلاتين يوم: صياغة ← إنتاجية ← قرارات ومعرفة ← أتمتة، ومفيش انتقال قبل العادة (ص 16).", "The 30-day plan: wording → productivity → decisions and knowledge → automation, no moving on before the habit (p. 16)."]),
    Q("p12b", "p12", "mcq", ["إيه من دول مش من الأخطاء التلاتة اللي بتعطّل التغيير؟", "Which of these is NOT one of the three mistakes that block change?"], [
      o("البدء بمشكلة صغيرة متكررة", "Starting with a small recurring problem", "ده الحل اللي الكتاب بيقترحه، مش الغلط.", "That’s the book’s suggested fix, not a mistake."),
      o("جمع الأدوات بدل ما تتقن واحدة", "Collecting tools instead of mastering one"),
      o("الاكتفاء بالإعجاب بالنتيجة", "Just admiring the result"),
      o("البدء بأكبر مشكلة", "Starting with your biggest problem")
    ], 0, ["الأخطاء التلاتة: جمع الأدوات، والإعجاب بس، والبدء بالأكبر. الاختبار الوحيد: حاجة اتغيّرت في الشغل الأسبوع ده؟ (ص 16).", "The three mistakes: collecting tools, just admiring, starting with the biggest. The only test: did something change at work this week? (p. 16)."]),

    /* ---------- Unit 2: Python tools ---------- */
    Q("y1a", "y1", "mcq", ["إيه العنصر الخامس في مواصفة المهمة، اللي غيابه سبب أغلب فشل الأدوات؟", "What is the task spec’s fifth element, whose absence causes most tool failures?"], [
      o("الاختبارات: إزاي نعرف إن النتيجة صح، محددة قبل البناء", "Tests: how we know the result is right, defined before building"),
      o("لغة البرمجة", "The programming language", "مش ضمن المواصفة؛ الأداة بتختارها.", "Not part of the spec; the tool picks it."),
      o("اسم المطوّر", "The developer’s name", "ملوش علاقة.", "Irrelevant."),
      o("ألوان الواجهة", "The interface colours", "مش من عناصر المواصفة.", "Not a spec element.")
    ], 0, ["من غير اختبارات الأداة شكلها شغالة، بس محدش عارف إمتى نتيجتها غلط (ص 17).", "Without tests the tool seems to work, but nobody knows when its result is wrong (p. 17)."]),
    O("y1b", "y1", ["رتّب أول أربعة عناصر في مواصفة المهمة:", "Order the first four elements of the task spec:"], [
      ["المشكلة (بالدقائق مش بالتخمين)", "Problem (in minutes, not guesses)"], ["المدخلات (البنية الحقيقية)", "Inputs (real structure)"], ["القواعد (زي ما بتتطبّق فعلًا)", "Rules (as actually applied)"], ["النتيجة المطلوبة", "Required result"]
    ], ["وبعدين ييجي العنصر الخامس: الاختبارات (ص 17).", "Then comes the fifth element: tests (p. 17)."]),

    Q("y2a", "y2", "predict", ["مهمة بتحصل مرة كل سنة، وقواعدها بتتغيّر كل مرة. تستاهل أداة؟", "A task happens once a year and its rules change every time. Does it deserve a tool?"], [
      o("غالبًا لأ: بتفشل في سؤالي التكرار والثبات", "Probably not: it fails the frequency and stability questions"),
      o("أيوه دايمًا", "Always yes", "الكتاب بيحط أربعة أسئلة قبل الأتمتة.", "The book puts four questions before automating."),
      o("أيوه، عشان هي صعبة", "Yes, because it’s hard", "الصعوبة مش من الأسئلة الأربعة.", "Difficulty isn’t one of the four questions."),
      o("مش ممكن تحكم أبدًا", "It can never be judged", "الأسئلة الأربعة بتحكم بوضوح.", "The four questions judge clearly.")
    ], 0, ["الأسئلة الأربعة: التكرار، والثبات، وتكلفة الغلط اليدوي، وقابلية التحقق (ص 17).", "The four questions: frequency, stability, manual error cost, verifiability (p. 17)."]),
    Q("y2b", "y2", "mcq", ["لما يوصل ملف ببنية مش متوقعة، الأداة لازم تعمل إيه؟", "When a file arrives with an unexpected structure, what should the tool do?"], [
      o("تقف برسالة واضحة: الفشل الصريح أحسن من النجاح الصامت", "Stop with a clear message: explicit failure beats silent success"),
      o("تكمل وتخمّن الأعمدة", "Carry on and guess the columns", "ده «نجاح صامت» بيطلع أرقام غلط.", "That’s “silent success” producing wrong numbers."),
      o("تمسح الملف", "Delete the file", "ماتلمس البيانات الأصلية أبدًا.", "Never touch the original data."),
      o("تعيد التشغيل من غير نهاية", "Restart endlessly", "مش بيحل المشكلة.", "Doesn’t solve the problem.")
    ], 0, ["من القواعد الأربعة: ماتلمس الأصل، سجل تشغيل مكتوب، وحدات صغيرة مستقلة، فشل صريح (ص 18).", "Among the four rules: don’t touch originals, a written run log, small independent modules, explicit failure (p. 18)."]),

    Q("y3a", "y3", "compare", ["أي طريقة أتمتة بتيجي الأول في ترتيب التفضيل عشان هي الأثبت؟", "Which automation approach comes first in the preference order because it’s most stable?"], [
      o("الملف أو واجهة البرمجة (API)", "File or API"),
      o("محاكاة الماوس والكيبورد (PyAutoGUI)", "Mouse and keyboard simulation (PyAutoGUI)", "دي الملاذ الأخير والأكثر هشاشة.", "That’s the last resort and most fragile."),
      o("عناصر واجهة البرنامج (pywinauto)", "App UI elements (pywinauto)", "بتيجي تالت.", "It comes third."),
      o("التحكم المباشر في البرنامج", "Direct app control", "بتيجي تاني (xlwings وPlaywright).", "It comes second (xlwings, Playwright).")
    ], 0, ["كل ما المستوى ارتفع قلّ احتمال إن الأداة تتكسر مع أي تحديث للشاشة (ص 18).", "The higher the level, the less likely the tool breaks on any screen update (p. 18)."]),
    O("y3b", "y3", ["رتّب سلسلة الأتمتة النموذجية بدون تدخل يدوي:", "Order the typical hands-off automation chain:"], [
      ["وصول ملف جديد", "A new file arrives"], ["فحص البنية والأعمدة", "Check structure and columns"], ["تنظيف وتوحيد ودمج", "Clean, unify and merge"], ["حساب المؤشرات والشذوذ", "Compute KPIs and anomalies"], ["بناء التقرير وحفظه", "Build and save the report"], ["إشعار الأشخاص بالرابط", "Notify people with the link"]
    ], ["السلسلة زي ما في ص 19.", "The chain as on p. 19."]),

    Q("y4a", "y4", "mcq", ["ليه «الجودة الأول» في التحليل؟", "Why “quality first” in analysis?"], [
      o("عشان نتيجة دقيقة على بيانات معطوبة بتدي قرار غلط بثقة عالية جدًا", "A precise result on broken data gives a wrong decision with very high confidence"),
      o("عشان فحص الجودة سريع بس", "Because quality checks are just quick", "السرعة مش السبب.", "Speed isn’t the reason."),
      o("عشان الإدارة بتطلبه", "Because management asks for it", "السبب منطقي مش إداري.", "The reason is logical, not administrative."),
      o("ممكن تأجيله للآخر", "It can wait until the end", "الكتاب: خطوة أولى إلزامية مش اختيارية تتساب للآخر.", "The book: a mandatory first step, not optional for the end.")
    ], 0, ["فحص الجودة خطوة أولى إلزامية (ص 19).", "The quality check is a mandatory first step (p. 19)."]),
    Q("y4b", "y4", "compare", ["إنت عاوز استعلام SQL مباشرة على مجلد كامل من ملفات إكسل ونصوص. أي أداة؟", "You want a direct SQL query over a whole folder of Excel and text files. Which tool?"], [
      o("DuckDB", "DuckDB"),
      o("Polars", "Polars", "ممتازة للمعالجة السريعة للجداول الكبيرة، بس الاستعلام بـSQL على الملفات مباشرة ميزة DuckDB في الكتاب.", "Great for fast processing of big tables, but direct SQL on files is DuckDB’s feature in the book."),
      o("ydata-profiling", "ydata-profiling", "دي لتقرير جودة تلقائي.", "That’s for an automatic quality report."),
      o("PyAutoGUI", "PyAutoGUI", "دي لمحاكاة الماوس.", "That’s for mouse simulation.")
    ], 0, ["تلات أدوات تكفي أغلب الحالات: DuckDB للاستعلام، وPolars للسرعة، وydata-profiling للجودة (ص 19–20).", "Three tools cover most cases: DuckDB to query, Polars for speed, ydata-profiling for quality (pp. 19–20)."]),
    O("y4c", "y4", ["رتّب أول خمسة من الأسئلة السبعة قبل أي رسم:", "Order the first five of the seven questions before any chart:"], [
      ["إيه اللي حصل؟", "What happened?"], ["فين؟", "Where?"], ["ليه؟", "Why?"], ["إيه العوامل؟", "Which factors?"], ["مرة ولا متكرر؟", "One-off or recurring?"]
    ], ["وبعدين: الأثر الكمي والمالي، وإيه لو استمر — وكلها بخدمة: إيه القرار المطلوب؟ (ص 20).", "Then: quantitative and financial impact, and what if it continues — all serving: what decision is needed? (p. 20)."]),

    Q("y5a", "y5", "compare", ["تقرير فريق صغير في قسم واحد بيستخدمه بمنطق خاص بالشركة. إيه اللي يناسب؟", "A report used by a small team in one department with company-specific logic. What fits?"], [
      o("بايثون", "Python"),
      o("منصة مؤسسية على طول", "An enterprise platform right away", "المنصة بتتحتاج لما المستخدمين يكتروا وتتعدد الصلاحيات والحوكمة المركزية.", "A platform is needed when users multiply with different permissions and central governance."),
      o("مفيش حاجة؛ الورق يكفي", "Nothing; paper is enough", "الأتمتة هنا مفيدة.", "Automation helps here."),
      o("الاتنين مع بعض من الأول", "Both from the start", "الكتاب: ابنِ الحل الأخف الأول.", "The book: build the lighter solution first.")
    ], 0, ["بايثون يكفي لما النطاق محدود والمنطق خاص والتوزيع بسيط (ص 20).", "Python suffices when scope is limited, logic is specific and distribution is simple (p. 20)."]),
    Q("y5b", "y5", "mcq", ["إيه من دول إشارة للانتقال لمنصة مؤسسية؟", "Which of these signals a move to an enterprise platform?"], [
      o("نسخ كتير بأرقام مختلفة بين الإدارات", "Multiple copies with different numbers across departments"),
      o("إن التقرير شغال كويس", "The report works well", "دي مش إشارة انتقال.", "That’s not a switch signal."),
      o("إن الكود قصير", "The code is short", "طول الكود مش من الإشارات.", "Code length isn’t a signal."),
      o("إن الفريق صغير", "The team is small", "ده بيرجّح بايثون.", "That favours Python.")
    ], 0, ["الإشارات الأربعة: نسخ بأرقام مختلفة، وطلبات صلاحيات متكررة، والاعتماد على شخص واحد بيشغّل الملف من جهازه، ومؤشرات مش متطابقة بين تقارير متعددة المصادر (ص 21).", "The four signals: copies with different numbers, repeated permission requests, dependence on one person running the file from their PC, and metrics that don’t match across multi-source reports (p. 21)."]),

    Q("y6a", "y6", "mcq", ["إيه اختبار النجاح الوحيد للصفحة الإدارية التفاعلية؟", "What is the only success test for the interactive executive page?"], [
      o("فهم الرسالة الأساسية في أول تلاتين ثانية", "The core message is understood within the first thirty seconds"),
      o("عدد الرسوم", "The number of charts", "«جدار الرسوم» عكس المطلوب.", "A “wall of charts” is the opposite of the goal."),
      o("وجود حركة", "Having animation", "«الحركة قبل الأولوية» من الأخطاء الستة.", "“Motion before priority” is one of the six mistakes."),
      o("كترة الفلاتر", "Many filters", "الفلاتر اللي مش بتتستخدم من الأخطاء الستة.", "Unused filters are one of the six mistakes.")
    ], 0, ["سبع محطات بتقود القارئ من النتيجة للقرار، والتفاصيل لمن عاوز (ص 22).", "Seven stations lead the reader from result to decision, with detail for those who want it (p. 22)."]),
    Q("y6b", "y6", "spot", ["لوحة اللون الأحمر فيها معناه «انخفاض» في رسم و«منطقة الشمال» في رسم تاني. أي غلطة ده؟", "A board uses the same red for “decline” in one chart and “North region” in another. Which mistake is this?"], [
      o("ألوان من غير معنى", "Meaningless colours"),
      o("أرقام من غير مرجع", "Numbers with no reference", "ده غلطة تانية: رقم من غير مقارنة بخطة أو فترة.", "That’s another mistake: a number with no comparison to plan or period."),
      o("حركة قبل الأولوية", "Motion before priority", "مفيش حركة هنا.", "There’s no motion here."),
      o("مفيش غلط", "No mistake", "نفس اللون بمعنيين بيربك القارئ.", "The same colour with two meanings confuses the reader.")
    ], 0, ["من الأخطاء الستة: ألوان من غير معنى (نفس اللون بمعانٍ مختلفة) (ص 22).", "Among the six mistakes: meaningless colours (the same colour meaning different things) (p. 22)."]),

    Q("y7a", "y7", "mcq", ["إيه من دول مش من معايير قبول المشروع المرجعي؟", "Which of these is NOT an acceptance criterion of the reference project?"], [
      o("استخدام أكبر عدد من المكتبات", "Using as many libraries as possible", "مش من المعايير؛ البساطة أحسن.", "Not a criterion; simpler is better."),
      o("تشغيل متكامل واحد من غير خطوة يدوية", "One integrated run with no manual step"),
      o("البيانات الأصلية سليمة بعد كل تشغيل", "Original data intact after every run"),
      o("سجل تشغيل واضح", "A clear run log")
    ], 0, ["المعايير: تشغيل متكامل، أصل سليم، سجل واضح، ويخلص بقرار مش بملخص (ص 23).", "Criteria: integrated run, intact originals, clear log, ends with a decision not a summary (p. 23)."]),
    Q("y7b", "y7", "predict", ["عندك بيانات بس مش عارف ليه اتغيّر مؤشر كفاءة خط. هتبدأ بأي مستوى؟", "You have data but don’t know why a line’s efficiency indicator changed. Which level do you start with?"], [
      o("التحليل", "Analysis"),
      o("التشغيل", "Run", "التشغيل لحد بيعمل مهمة يدوية متكررة.", "Run is for someone doing a recurring manual task."),
      o("التقرير", "Reporting", "التقرير لحد عنده تحليل جاهز ومحتاج يعرضه.", "Reporting is for someone with analysis ready to present."),
      o("المنصة المؤسسية", "Enterprise platform", "مش مستوى بداية.", "Not a starting level.")
    ], 0, ["الكتاب (ص 23): التشغيل للمهمة اليدوية المتكررة، والتحليل لما مش عارف ليه المؤشر اتغيّر، والتقرير لما محتاج تعرضه.", "The book (p. 23): run for a recurring manual task, analysis when you don’t know why an indicator changed, reporting when you need to present it."]),

    /* ---------- Unit 3: dashboards ---------- */
    Q("d1a", "d1", "mcq", ["اللوحة الكويسة بتبدأ منين في المرحلة الأولى؟", "Where does a good dashboard start, per stage 1?"], [
      o("من القرار اللي بتخدمه، مش من البيانات المتاحة", "From the decision it serves, not the data available"),
      o("من أكبر عدد رسوم", "From as many charts as possible", "ده بيطلع لوحة عامة مش بتخدم قرار.", "That produces a generic board serving no decision."),
      o("من الألوان والتصميم", "From colours and design", "الهوية البصرية المرحلة السادسة.", "Visual identity is stage 6."),
      o("من الأداة الأحدث", "From the newest tool", "الفرق مش في الأداة، لكن في إدارة المحادثة.", "The difference isn’t the tool but how you run the conversation.")
    ], 0, ["خلي النموذج يسألك 3–5 أسئلة أساسية الأول (ص 24).", "Have the model ask you 3–5 key questions first (p. 24)."]),
    Q("d1b", "d1", "spot", ["ملف إكسل فيه صفّين عناوين فوق بعض وخلايا مدموجة وعمود اسمه Column1. إيه المشكلة؟", "An Excel file has two stacked header rows, merged cells and a column named Column1. What’s the problem?"], [
      o("البيانات مش مهيأة: صف أول للعناوين بس، أسماء ليها معنى، وفك الدمج", "The data isn’t prepared: first row for headers only, meaningful names, unmerge"),
      o("مفيش مشكلة", "No problem", "دي بالظبط أخطاء التهيئة اللي الكتاب بيذكرها.", "These are exactly the prep errors the book lists."),
      o("المشكلة في حجم الملف", "The file size", "الحجم مش المشكلة هنا.", "Size isn’t the issue here."),
      o("لازم يتحوّل لصورة", "It should be turned into an image", "ده بيزوّد المشكلة.", "That makes it worse.")
    ], 0, ["تهيئة البيانات: خمس دقايق توفّر ساعات (ص 24).", "Data prep: five minutes that save hours (p. 24)."]),

    O("d2a", "d2", ["رتّب مراحل اللوحة من 4 إلى 8:", "Order dashboard stages 4 to 8:"], [
      ["البناء", "Build"], ["الفلاتر المتزامنة", "Synced filters"], ["الهوية البصرية", "Visual identity"], ["التحقق من الأرقام", "Verify the numbers"], ["الحفظ والمشاركة", "Save and share"]
    ], ["المراحل زي ما في ص 24–25. خد بالك: التحقق قبل المشاركة دايمًا.", "The stages as on pp. 24–25. Note: verify always comes before sharing."]),
    Q("d2b", "d2", "mcq", ["إيه أكتر مرحلة حساسة في بناء اللوحة؟", "Which dashboard stage is the most sensitive?"], [
      o("التحقق من الأرقام", "Verifying the numbers"),
      o("اختيار الألوان", "Choosing colours", "مهم، بس مش الأكتر حساسية.", "Important, but not the most sensitive."),
      o("تسمية الملف", "Naming the file", "مش مرحلة في الكتاب.", "Not a stage in the book."),
      o("الوضع الداكن", "Dark mode", "تعديل بصري بسيط.", "A simple visual tweak.")
    ], 0, ["«المخرج المصقول مش بالضرورة صح» — المراجعة البشرية واجبة قبل أي مشاركة (ص 25).", "“A polished output isn’t necessarily correct” — human review is a must before any sharing (p. 25)."]),

    /* ---------- Unit 4: building a web app ---------- */
    Q("w1a", "w1", "spot", ["متدرب فتح ملف واحد في VS Code بدل المجلد، واسم المجلد «مشروع المبيعات النهائي». كام غلطة؟", "A trainee opened a single file in VS Code instead of the folder, and the folder is named “مشروع المبيعات النهائي”. How many mistakes?"], [
      o("غلطتين: فتح ملف بدل مجلد، ومسار بالعربي ومسافات", "Two: opening a file instead of a folder, and a path with Arabic and spaces"),
      o("مفيش حاجة", "None", "الاتنين من الأخطاء الشائعة التلاتة.", "Both are among the three common mistakes."),
      o("غلطة واحدة: اسم المجلد", "One: the folder name", "فتح ملف لوحده بيمنع المساعد يشوف باقي المشروع.", "Opening a lone file stops the assistant seeing the rest of the project."),
      o("غلطة واحدة: فتح الملف", "One: opening the file", "الأسماء العربية والمسافات بتسبب مشاكل في المسارات.", "Arabic names and spaces cause path problems.")
    ], 0, ["الأخطاء التلاتة: فتح ملف بدل مجلد، ومسارات بمسافات وعربي، وتثبيت عشرات الإضافات (ص 26).", "The three mistakes: a file instead of a folder, paths with spaces and Arabic, installing dozens of extensions (p. 26)."]),
    Q("w1b", "w1", "mcq", ["إيه وظيفة «الطرفية» (Terminal) جوّا VS Code؟", "What does the terminal do inside VS Code?"], [
      o("نافذة أوامر نصية لتشغيل التطبيق وتثبيت المكتبات واستدعاء المساعد", "A text command window to run the app, install libraries and call the assistant"),
      o("عرض الملفات بس", "Only showing files", "ده دور مستكشف الملفات.", "That’s the file explorer’s job."),
      o("تصميم الواجهات بالسحب والإفلات", "Drag-and-drop UI design", "مش وظيفتها.", "Not its job."),
      o("تصفح النت", "Browsing the web", "مش متصفح.", "It isn’t a browser.")
    ], 0, ["المناطق الخمس: شريط النشاط، المستكشف، المحرر، الطرفية، لوحة الأوامر (ص 26).", "The five areas: activity bar, explorer, editor, terminal, command palette (p. 26)."]),

    Q("w2a", "w2", "mcq", ["إيه ملف CLAUDE.md؟", "What is CLAUDE.md?"], [
      o("ملف نصي في جذر المشروع بيتقرا تلقائي في بداية كل جلسة: التقنيات والقواعد وأوامر التشغيل وإيه اللي ماتلمسهوش", "A text file at the project root read automatically each session: tech, rules, run commands and what not to touch"),
      o("باسورد المساعد", "The assistant’s password", "ماتحطش أسرار فيه أبدًا.", "Never put secrets in it."),
      o("سجل الأخطاء", "The error log", "مش ده دوره.", "Not its role."),
      o("نسخة احتياطية من الكود", "A code backup", "النسخ الاحتياطي دور Git.", "Backup is Git’s job.")
    ], 0, ["الأمر ‎/init‎ بينشئه، وده أهم ملف في مشروعك (ص 27).", "The /init command creates it; it’s your project’s most important file (p. 27)."]),
    Q("w2b", "w2", "spot", ["متدرّب أثناء التعلم فعّل «الموافقة التلقائية» لكل الأوامر، وشغّل المساعد في مجلد المستندات الشخصية. إيه المخالفات؟", "While learning, someone enabled auto-approve for all commands and ran the assistant in their personal documents folder. What’s violated?"], [
      o("ضابطين أمنيين: مجلد مخصص للمشروع، وممنوع تفعيل الموافقة التلقائية", "Two security controls: a dedicated project folder, and no auto-approve"),
      o("مفيش حاجة؛ ده أسرع", "Nothing; it’s faster", "الكتاب بيقبل البطء مقابل الأمان أثناء التعلم.", "The book accepts slowness for safety while learning."),
      o("المجلد بس", "Only the folder", "الموافقة التلقائية مخالفة كمان.", "Auto-approve is a violation too."),
      o("الموافقة التلقائية بس", "Only auto-approve", "المجلد الشخصي مخالفة كمان.", "The personal folder is a violation too.")
    ], 0, ["تلات ضوابط من اليوم الأول: مجلد مخصص، مفيش موافقة تلقائية، ومفيش أسرار في الكود أو CLAUDE.md (ص 27).", "Three controls from day one: a dedicated folder, no auto-approve, and no secrets in code or CLAUDE.md (p. 27)."]),

    Q("w3a", "w3", "compare", ["مين من التلاتة مسؤول عن «الشكل»: الألوان والمسافات والخطوط؟", "Which of the three handles “look”: colours, spacing and fonts?"], [
      o("CSS", "CSS"),
      o("HTML", "HTML", "HTML هو الهيكل: العناوين والجداول والأزرار.", "HTML is structure: headings, tables, buttons."),
      o("JavaScript", "JavaScript", "JavaScript هو السلوك: إيه اللي بيحصل عند الضغط والتصفية.", "JavaScript is behaviour: what happens on click and filter."),
      o("FastAPI", "FastAPI", "دي في الواجهة الخلفية.", "That’s back-end.")
    ], 0, ["HTML هيكل (زي الخرسانة)، CSS شكل (زي التشطيب)، JavaScript سلوك (ص 28).", "HTML is structure (like concrete), CSS is look (like finishing), JavaScript is behaviour (p. 28)."]),
    Q("w3b", "w3", "mcq", ["إيه نصيحة الكتاب للمبتدئ بخصوص أُطر العمل (Frameworks)؟", "What’s the book’s advice to beginners about frameworks?"], [
      o("ماتبدأش بإطار؛ صفحة HTML مع Tailwind ومكتبة رسوم تكفي", "Don’t start with a framework; one HTML page with Tailwind and a chart library is enough"),
      o("ابدأ بأكبر إطار متاح", "Start with the biggest framework available", "إضافته بدري بتزوّد تعقيد من غير فايدة.", "Adding it early adds complexity with no benefit."),
      o("اتعلّم تلات أطر قبل ما تبدأ", "Learn three frameworks first", "مش ده اللي الكتاب بيقوله.", "Not what the book says."),
      o("الأطر ممنوعة دايمًا", "Frameworks are always banned", "بتتضاف لما المشروع يكبر فعلًا.", "They’re added once the project really grows.")
    ], 0, ["قرار أساسي للمبتدئ (ص 28): الإطار لما المشروع يكبر فعلًا.", "A key beginner decision (p. 28): a framework only when the project truly grows."]),

    O("w4a", "w4", ["رتّب رحلة الطلب الواحد:", "Order one request’s journey:"], [
      ["المستخدم يغيّر فلترًا", "The user changes a filter"], ["الواجهة الأمامية ترسل طلبًا", "The front-end sends a request"], ["الخادم يستقبله", "The server receives it"], ["يقرأ البيانات ويحسب", "Reads data and computes"], ["يعيد نتيجة منظمة", "Returns an organised result"], ["الواجهة ترسمها", "The front-end draws it"]
    ], ["الرحلة زي ما في ص 29.", "The journey as on p. 29."]),
    Q("w4b", "w4", "mcq", ["ليه محتاجين خادم (Server) بدل ما نحط كل حاجة في المتصفح؟", "Why do we need a server instead of putting everything in the browser?"], [
      o("عشان المتصفح محدود في قراءة الملفات والاتصال بقواعد البيانات، والمنطق لازم يكون في مكان واحد", "The browser is limited in reading files and connecting to databases, and logic must live in one place"),
      o("عشان الخادم شكله أفضل", "The server looks nicer", "الخادم مش بيظهر على الشاشة.", "The server never appears on screen."),
      o("عشان النت بيطلب كده", "The internet requires it", "الخادم هنا محلي من غير نت.", "The server here is local with no internet."),
      o("مش محتاجينه أبدًا", "We never need one", "الكتاب بيشرح سببين واضحين.", "The book gives two clear reasons.")
    ], 0, ["الواجهة الخلفية هي العقل: بتقرا وتحسب وتطبّق القواعد وتسلّم النتائج (ص 29).", "The back-end is the brain: it reads, computes, applies rules and hands over results (p. 29)."]),

    Q("w5a", "w5", "spot", ["فريق قضى أيام يجمّل واجهة اللوحة، وبعدين اكتشف إن الأرقام غلط بسبب طريقة قراءة الملف. إيه الغلط؟", "A team spent days polishing the dashboard UI, then found the numbers were wrong because of how the file was read. What went wrong?"], [
      o("بنوا الواجهة قبل ما يتأكدوا من الأرقام", "They built the UI before verifying the numbers"),
      o("اختاروا ألوان غلط", "They chose the wrong colours", "الألوان مش سبب الأرقام الغلط.", "Colours aren’t why the numbers are wrong."),
      o("استخدموا بيانات حقيقية", "They used real data", "البيانات الحقيقية هي الصح؛ المزيفة بتخبّي المشاكل.", "Real data is right; fake data hides problems."),
      o("مفيش غلط", "No mistake", "الترتيب مش اقتراح.", "The order isn’t a suggestion.")
    ], 0, ["«الترتيب مش اقتراح»: الخادم الأول وتحقق الأرقام في صفحة التوثيق، وبعدين الواجهة (ص 30).", "“The order isn’t a suggestion”: server first and check numbers on the docs page, then the UI (p. 30)."]),
    Q("w5b", "w5", "mcq", ["أي مجلد بتحط فيه ملفات الإكسل الأصلية زي ما هي؟", "Which folder holds the original Excel files as they are?"], [
      o("‎/data", "/data"),
      o("‎/backend", "/backend", "هنا كود بايثون اللي المساعد بيكتبه.", "That holds the Python code the assistant writes."),
      o("‎/frontend", "/frontend", "هنا صفحات الواجهة.", "That holds the interface pages."),
      o("‎/output", "/output", "المخرجات بتتكتب في مكان منفصل عن الأصل.", "Outputs are written separately from originals.")
    ], 0, ["خمس مجلدات بس، و‎/data‎ للأصل زي ما هو (ص 30).", "Just five folders, and /data holds the originals as they are (p. 30)."]),

    Q("w6a", "w6", "mcq", ["إيه القاعدة في تشغيل Prompts التنفيذ الخمسة؟", "What’s the rule for running the five execution prompts?"], [
      o("بالترتيب، وماتتقدّمش لحد ما اللي قبله يشتغل فعلًا", "In order, and don’t move on until the previous one actually works"),
      o("كلهم في رسالة واحدة", "All in one message", "حشو كل المتطلبات في طلب واحد بيقلّل الدقة.", "Cramming everything into one request reduces precision."),
      o("بأي ترتيب", "In any order", "الترتيب هو الدرس الأساسي.", "Order is the key lesson."),
      o("ابدأ بالواجهة", "Start with the UI", "الواجهة الـ Prompt الرابع.", "The UI is prompt four.")
    ], 0, ["البيانات الأول، وبعدين أرقام صح، وبعدين عرض، وبعدين تلميع (ص 31).", "Data first, then correct numbers, then display, then polish (p. 31)."]),
    Q("w6b", "w6", "mcq", ["إيه معنى localhost؟", "What does localhost mean?"], [
      o("خادم على جهازك بس محدش غيرك شايفه", "A server only on your machine that nobody else sees"),
      o("موقع على النت", "A website on the internet", "العكس: محلي من غير نشر.", "The opposite: local, not published."),
      o("خدمة سحابية مدفوعة", "A paid cloud service", "مش سحابي.", "It isn’t cloud."),
      o("اسم مكتبة رسوم", "A chart library name", "مش مكتبة.", "Not a library.")
    ], 0, ["من مسرد الوحدة (ص 31).", "From the unit glossary (p. 31)."]),

    /* ---------- Unit 5: GitHub, models, system, team ---------- */
    Q("g1a", "g1", "compare", ["إيه الفرق بين Git وGitHub؟", "What’s the difference between Git and GitHub?"], [
      o("Git أداة على جهازك بتسجّل كل تغيير حتى من غير نت، وGitHub خدمة بتستضيف المشاريع على النت", "Git is a tool on your PC recording every change even offline; GitHub is a service hosting projects online"),
      o("هما نفس الحاجة", "They’re the same", "الكتاب بيفرّق بوضوح بين الأداة والخدمة.", "The book clearly separates the tool from the service."),
      o("GitHub بيشتغل من غير Git", "GitHub works without Git", "GitHub بيستضيف مشاريع Git.", "GitHub hosts Git projects."),
      o("Git للصور بس", "Git is only for images", "Git لأي ملفات نصية وكود.", "Git is for any text files and code.")
    ], 0, ["Git الأداة، وGitHub الخدمة (ص 32).", "Git is the tool, GitHub is the service (p. 32)."]),
    Q("g1b", "g1", "mcq", ["في تشبيهات الكتاب، إيه «الـ commit»؟", "In the book’s analogies, what is a “commit”?"], [
      o("محضر اجتماع موقّع ومؤرّخ", "Signed, dated meeting minutes"),
      o("ملف القضية بكل أوراقه", "The case file with all its papers", "ده تشبيه المستودع (repo).", "That’s the repository analogy."),
      o("مسودة جانبية جنب النسخة المعتمدة", "A side draft next to the approved version", "ده الفرع (branch).", "That’s a branch."),
      o("اعتماد المسودة ودمجها", "Approving and merging the draft", "ده الدمج (merge).", "That’s a merge.")
    ], 0, ["سبع مفاهيم بتشبيهات من الشغل المكتبي (ص 32).", "Seven concepts with office-work analogies (p. 32)."]),

    O("g2a", "g2", ["رتّب دورة العمل الكاملة في Git:", "Order the full Git workflow:"], [
      ["pull", "pull"], ["branch", "branch"], ["العمل والتعديل", "Work and edit"], ["status", "status"], ["add", "add"], ["commit", "commit"], ["push", "push"], ["pull request", "pull request"]
    ], ["الدورة الكاملة زي ما في ص 33.", "The full cycle as on p. 33."]),
    Q("g2b", "g2", "spot", ["رسالة commit: «تعديل»، والملف ‎.env‎ بكلمات المرور مرفوع للمستودع. إيه المشكلتين؟", "Commit message: “edit”, and the .env file with passwords was pushed to the repository. What are the two problems?"], [
      o("رسالة من غير معنى، ورفع أسرار من غير ‎.gitignore", "A meaningless message, and secrets pushed without a .gitignore"),
      o("مفيش مشكلة", "No problem", "الاتنين من الأخطاء الشائعة في الكتاب.", "Both are common mistakes in the book."),
      o("الرسالة بس", "Only the message", "رفع الأسرار أخطر.", "Pushing secrets is worse."),
      o("الملف بس", "Only the file", "الرسالة لازم تقول إيه وليه.", "The message should say what and why.")
    ], 0, ["اعمل ‎.gitignore‎ يستبعد الإعدادات والمفاتيح، واكتب رسائل «إيه وليه» (ص 33).", "Create a .gitignore excluding settings and keys, and write “what and why” messages (p. 33)."]),

    Q("m1a", "m1", "mcq", ["إيه معنى «770B إجمالي، 40B نشط» في نموذج MoE؟", "What does “770B total, 40B active” mean in an MoE model?"], [
      o("نموذج ضخم إجمالًا بس بيشغّل جزء صغير لكل سؤال: ذكاء كبير بتكلفة قريبة من الصغير", "Huge overall but activates a small part per question: big intelligence at near-small cost"),
      o("إن 40B بس شغالة والباقي معطّل للأبد", "Only 40B works and the rest is disabled forever", "الأجزاء النشطة بتتغيّر حسب السؤال.", "The active parts change per question."),
      o("إن النموذج بيقرأ 770 كتاب", "The model reads 770 books", "الأرقام للمعاملات مش للكتب.", "The numbers are parameters, not books."),
      o("السعر بالدولار", "The price in dollars", "مش أسعار.", "They aren’t prices.")
    ], 0, ["خليط الخبراء تصميم حديث (ص 34).", "Mixture of Experts is a modern design (p. 34)."]),
    Q("m1b", "m1", "predict", ["تطبيقك بيطلع ردود طويلة جدًا. إيه اللي بيحصل للتكلفة مقارنة بسعر المدخلات المعلن؟", "Your app generates very long replies. What happens to cost compared with the listed input price?"], [
      o("بتزيد كتير عشان المخرجات أغلى 3–6 مرات من المدخلات", "It rises a lot because output costs 3–6× input"),
      o("مش بتتغيّر", "It doesn’t change", "التسعير رقمين مختلفين للمدخل والمخرج.", "Pricing is two different numbers for input and output."),
      o("بتقل", "It drops", "العكس.", "The opposite."),
      o("بتبقى مجانية", "It becomes free", "لأ.", "No.")
    ], 0, ["التسعير دايمًا رقمين: المدخل أرخص، والمخرج أغلى 3–6 مرات. والعربي بيستهلك توكنز أكتر (ص 34–35).", "Pricing is always two numbers: input cheaper, output 3–6× pricier. And Arabic uses more tokens (pp. 34–35)."]),

    Q("m2a", "m2", "mcq", ["إيه معنى «الأوزان المفتوحة»؟", "What do “open weights” mean?"], [
      o("تقدر تنزّل النموذج وتشغّله جوّا شبكة شركتك فالبيانات ما تخرجش — بس مش بالضرورة ترخيص مجاني بالكامل", "You can download and run the model inside your company network so data stays in — but not necessarily a fully free licence"),
      o("إن النموذج مجاني دايمًا لأي استخدام", "The model is always free for any use", "الكتاب بيحذّر: مش بالضرورة ترخيص مجاني بالكامل.", "The book warns: it doesn’t necessarily mean a fully free licence."),
      o("إن الشركة بتنشر بياناتك", "The company publishes your data", "العكس: البيانات بتفضل عندك.", "The opposite: your data stays with you."),
      o("إنه بيشتغل على النت بس", "It only works online", "ممكن تشغّله محلي.", "It can run locally.")
    ], 0, ["اقرأ الترخيص دايمًا (ص 35).", "Always read the licence (p. 35)."]),
    Q("m2b", "m2", "spot", ["مقارنة تكلفة اعتمدت بس على سعر المدخلات، وسعر ترويجي بينتهي الشهر الجاي. إيه الفخاخ؟", "A cost comparison used only the input price and an introductory price ending next month. Which traps?"], [
      o("فخّين من تلاتة: تجاهل غلاء المخرجات، والسعر الترويجي المؤقت", "Two of the three: ignoring pricier output, and the temporary introductory price"),
      o("مفيش فخاخ", "No traps", "الاتنين من فخاخ التسعير في الكتاب.", "Both are pricing traps from the book."),
      o("فخ واحد بس", "Only one trap", "فيه اتنين واضحين.", "There are two clear ones."),
      o("المشكلة في اسم النموذج", "The problem is the model’s name", "الأسماء بتتغيّر؛ الفخاخ في التسعير.", "Names change; the traps are in pricing.")
    ], 0, ["الفخاخ التلاتة: المخرجات 3–6 أضعاف، ومضاعفة السعر بعد طول Context معين، والأسعار الترويجية المؤقتة (ص 35).", "The three traps: output 3–6×, price doubling past a context length, and temporary introductory prices (p. 35)."]),

    Q("m3a", "m3", "compare", ["مبتدئ عاوز يدور على نموذج وينزّله بضغطة ويعرف يناسب ذاكرته ولا لأ. أي أداة؟", "A beginner wants to search, download a model with a click, and see if it fits their memory. Which tool?"], [
      o("LM Studio", "LM Studio"),
      o("Ollama", "Ollama", "Ollama خفيف للأوامر والتضمين؛ الواجهة الرسومية للمبتدئ هي LM Studio.", "Ollama is light, for commands and embedding; the beginner GUI is LM Studio."),
      o("Git", "Git", "Git لتاريخ المشروع.", "Git is for project history."),
      o("DuckDB", "DuckDB", "DuckDB للاستعلام.", "DuckDB is for querying.")
    ], 0, ["LM Studio واجهة رسومية للمبتدئ، وOllama سطر أوامر سهل التضمين — والاتنين بيوفّروا خادم متوافق مع OpenAI API (ص 36).", "LM Studio is a GUI for beginners; Ollama is a command line easy to embed — both offer an OpenAI-API-compatible server (p. 36)."]),
    Q("m3b", "m3", "mcq", ["جهازك فيه 16 جيجابايت ذاكرة. أي حجم نموذج يناسبه تقريبًا حسب الكتاب؟", "Your machine has 16 GB of memory. Roughly which model size fits, per the book?"], [
      o("7–9B", "7–9B"),
      o("70B+", "70B+", "ده محتاج 64 جيجابايت أو أكتر.", "That needs 64 GB or more."),
      o("14–32B", "14–32B", "ده لـ 24–32 جيجابايت.", "That’s for 24–32 GB."),
      o("3–4B بس", "Only 3–4B", "ده لـ 8 جيجابايت؛ 16 تسمح بحجم أكبر.", "That’s for 8 GB; 16 allows bigger.")
    ], 0, ["الدليل التقريبي: 8 ← 3–4B، 16 ← 7–9B، 24–32 ← 14–32B، 64+ ← 70B+. والذاكرة قبل المعالج (ص 36).", "The rough guide: 8 → 3–4B, 16 → 7–9B, 24–32 → 14–32B, 64+ → 70B+. Memory before processor (p. 36)."]),

    Q("s1a", "s1", "mcq", ["إيه الاختبار الحاسم عشان تعرف حجم الفجوات في نظامك؟", "What’s the decisive test of how many gaps your system has?"], [
      o("عدد مرات نقل حاجة يدوي في العملية", "How many times something is moved by hand in the process"),
      o("عدد الأدوات المستخدمة", "The number of tools used", "كترة الأدوات مش معناها نظام.", "More tools don’t mean a system."),
      o("عدد الموظفين", "Headcount", "مش مقياس الكتاب.", "Not the book’s measure."),
      o("سرعة الأجهزة", "Machine speed", "ملهاش علاقة.", "Unrelated.")
    ], 0, ["كل نقل يدوي فجوة: نقطة تأخير ومصدر غلط واعتماد على شخص. عدّها (ص 37).", "Every manual hand-off is a gap: a delay point, error source and dependence on one person. Count them (p. 37)."]),
    Q("s1b", "s1", "spot", ["إدارتين مختلفين على رقم «الوحدات المنتجة» وبيعقدوا اجتماعات عشان يعرفوا مين الصح. أي مبدأ ناقص؟", "Two departments disagree on “units produced” and hold meetings over which number is right. Which principle is missing?"], [
      o("مصدر واحد للحقيقة", "A single source of truth"),
      o("التشغيل بالحدث", "Event-driven running", "مبدأ مهم، بس مش بيحل تعدد التعريفات.", "Important, but it doesn’t fix multiple definitions."),
      o("الإشعارات", "Notifications", "مش بتحل الخلاف على التعريف.", "They don’t fix the definition dispute."),
      o("مفيش حاجة ناقصة", "Nothing’s missing", "تعدد التعريفات بيطلع بالظبط الاجتماعات دي.", "Multiple definitions breed exactly these meetings.")
    ], 0, ["لكل رقم تعريف واحد ومكان حساب واحد (ص 37).", "Every number has one definition and one place it’s computed (p. 37)."]),

    Q("s2a", "s2", "mcq", ["إيه معنى «ابنِ عميق مش عريض»؟", "What does “build deep, not wide” mean?"], [
      o("اختار عملية صغيرة وابنِ لها كل الطبقات الخمسة لحد الإشعار والقرار", "Pick one small process and build all five layers up to notification and decision"),
      o("ابنِ طبقة التجميع لكل بيانات الشركة الأول", "Build the collection layer for all company data first", "هتقضي شهور من غير ما حد يشوف حاجة.", "You’d spend months with nothing anyone can see."),
      o("ابدأ بأصعب عملية", "Start with the hardest process", "من الأخطاء القاتلة التلاتة.", "One of the three project-killing mistakes."),
      o("استخدم أكبر نموذج", "Use the biggest model", "ملوش علاقة بمفهوم الشريحة.", "Unrelated to the slice idea.")
    ], 0, ["الشريحة العمودية: سلسلة ضيقة شغالة من الأول للآخر (ص 38).", "The vertical slice: one narrow chain working end to end (p. 38)."]),
    Q("s2b", "s2", "spot", ["فريق خلّى النموذج اللغوي يحسب مؤشرات الكفاءة الرسمية بدل معادلات ثابتة. أي غلطة؟", "A team let the language model compute official efficiency KPIs instead of fixed formulas. Which mistake?"], [
      o("ذكاء اصطناعي في مكان الحساب", "AI where calculation belongs"),
      o("البدء بأصعب عملية", "Starting with the hardest process", "غلطة تانية من التلاتة.", "Another of the three."),
      o("مفيش غلط", "No mistake", "الحساب الرسمي مكانه القواعد الثابتة؛ والذكاء الاصطناعي للشرح.", "Official calculation belongs to fixed rules; AI is for explaining."),
      o("كترة الإشعارات", "Too many notifications", "مش دي المشكلة هنا.", "Not the issue here.")
    ], 0, ["في رحلة الحدث: القواعد بتحسب وبيكشف الانحراف، وبعدين الذكاء الاصطناعي بيشرح (ص 37–38).", "In the event journey: rules compute and detect deviation, then AI explains (pp. 37–38)."]),

    Q("t1a", "t1", "mcq", ["الكتاب بيوصي تبدأ بأي فريق؟", "Which team does the book recommend starting with?"], [
      o("تلاتة: جامع البيانات، والمحلل، والناقد", "Three: collector, analyst, critic"),
      o("الأدوار السبعة كاملة", "All seven roles", "الكتاب: ماتبدأش بسبعة.", "The book: don’t start with seven."),
      o("وكيل واحد بيعمل كل حاجة", "One agent doing everything", "ده اللي الفريق بيحاول يتجاوزه.", "That’s what the team tries to move past."),
      o("عشرة وكلاء", "Ten agents", "تعقيد من غير مبرر.", "Unjustified complexity.")
    ], 0, ["ضيف دور بس لما التجربة تظهر فشل محدد (ص 39).", "Add a role only when experience shows a specific failure (p. 39)."]),
    Q("t1b", "t1", "compare", ["عملية بترتيب ثابت: خطوة بعد خطوة. أي نمط تنسيق أبسط وأسهل تتبّعه؟", "A process with a fixed order: step after step. Which coordination pattern is simplest and easiest to trace?"], [
      o("السلسلة", "Chain"),
      o("التوزيع والتجميع", "Fan-out/fan-in", "لمصادر متعددة متوازية وبعدين الدمج.", "For several parallel sources then merging."),
      o("مفيش نمط", "No pattern", "النمط بيحدد مين بيسلّم لمين.", "The pattern defines who hands to whom."),
      o("كل الوكلاء مع بعض من غير ترتيب", "All agents at once with no order", "صعب تتبّعه.", "Hard to trace.")
    ], 0, ["تلات أنماط: السلسلة (للترتيب الثابت)، والتوزيع والتجميع (لمصادر أو إدارات متعددة)، والمنفّذ والناقد (لما الجودة تتقدم على السرعة) (ص 39).", "Three patterns: chain (fixed order), fan-out/fan-in (several sources or departments), and executor and critic (when quality beats speed) (p. 39)."]),

    Q("t2a", "t2", "mcq", ["في الحوكمة، أي الأفعال محتاجة دايمًا موافقة بشرية؟", "In governance, which actions always need human approval?"], [
      o("الإرسال والحذف", "Sending and deleting"),
      o("القراءة", "Reading", "القراءة أقل خطر؛ المبدأ أقل صلاحية ممكنة.", "Reading is lower risk; the principle is least privilege."),
      o("الحساب", "Computing", "الحساب جوّا.", "Computing is internal."),
      o("مفيش حاجة", "Nothing", "الكتاب بيحدد الإرسال والحذف.", "The book names sending and deleting.")
    ], 0, ["أقل صلاحية ممكنة، وسجل كامل لكل خطوة (ص 40).", "Least possible privilege, and a full log of every step (p. 40)."]),
    Q("t2b", "t2", "spot", ["بطاقة وكيل فيها: الهدف «يساعد في كل حاجة»، ومفيش حدود توقف. إيه الغلط؟", "An agent card says: goal “helps with everything”, and no stop limits. What’s wrong?"], [
      o("الهدف مش جملة واحدة محددة، وحدود التوقف ناقصة", "The goal isn’t one specific sentence, and stop limits are missing"),
      o("مفيش غلط", "Nothing", "البطاقة ناقصها عنصرين من الخمسة.", "The card misses two of the five elements."),
      o("البطاقة لازم تكون صورة", "The card should be an image", "بتتكتب في ملف نصي عشان يسهل مراجعتها.", "It’s written in a text file to ease review."),
      o("لازم تمسح الأدوات", "The tools should be removed", "الأدوات عنصر أساسي.", "Tools are a core element.")
    ], 0, ["البطاقة خمس عناصر: الهدف (جملة واحدة)، والمدخل والمخرج، والأدوات (المسموح والممنوع)، وحدود التوقف (إمتى يقف ويسأل إنسان)، ومعيار النجاح (شرط ينفع يتفحص) (ص 40).", "The card has five elements: goal (one sentence), input and output, tools (allowed and forbidden), stop limits (when to stop and ask a human), and a success criterion (a checkable condition) (p. 40)."])
  ];
})(window.ACADEMY);
