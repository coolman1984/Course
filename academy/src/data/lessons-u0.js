/* Unit 0 — Foundations (book pages 1–6 and 41). Book points carry page numbers; levels are academy explanations. */
"use strict";
(function (A) {
  const bp = (p, ar, en) => ({ p, ar, en });
  const L = (k, ar, en) => ({ k, ar, en });
  A.lessons = (A.lessons || []).concat([
    {
      id: "f1", unit: "u0", pages: [2, 6, 34, 41], diff: 1, min: 8, scene: "modelflow", related: ["f4", "m1", "f5"], pre: [],
      title: { ar: "ماذا يحدث خلف الشاشة؟", en: "What happens behind the screen?" },
      sum: { ar: "كيف يتعلم النموذج من البيانات، وأين تُخزَّن معرفته، وكيف يولّد الإجابة كلمة بعد كلمة.", en: "How a model learns from data, where its knowledge lives, and how it generates an answer piece by piece." },
      book: [
        bp(2, "نستخدم الذكاء الاصطناعي اليوم في الكتابة والتحليل والبحث والتعلم واتخاذ القرارات وأتمتة المهام، لكن خلف هذه النتائج المدهشة **أسئلة أساسية** تستحق أن نفهمها بوضوح.", "We use AI today for writing, analysis, research, learning, decisions and automation — but behind these impressive results are **basic questions** worth understanding clearly."),
        bp(2, "أسئلة تقود الرحلة: ما الذكاء الاصطناعي فعلًا؟ ما معنى نموذج؟ كيف تتعلم الآلة من البيانات؟ أين تُخزَّن المعرفة داخل النموذج؟ كيف يفهم اللغة ويولّد الإجابات؟ وكيف تطورنا من البرامج التقليدية إلى المساعدين والوكلاء؟", "Guiding questions: What is AI really? What is a model? How does a machine learn from data? Where is knowledge stored inside the model? How does it understand language and generate answers? How did we move from traditional software to assistants and agents?"),
        bp(2, "قد يبدو الذكاء الاصطناعي غامضًا حين نرى النتيجة فقط، لكن حين نفهم ما يحدث خلف الشاشة **يتحول الغموض إلى فهم، والفهم إلى قدرة حقيقية على الاستخدام**.", "AI can seem mysterious when we only see the result, but once we understand what happens behind the screen, **mystery becomes understanding, and understanding becomes real ability**."),
        bp(6, "ماذا يحدث داخل النموذج؟ البرومبت يُترجَم إلى تعليمات يفهمها النموذج، ويستخدم السياق لبناء «الوعي» حول مشروعك.", "What happens inside the model? The prompt is translated into instructions the model understands, and it uses the context to build “awareness” of your project."),
        bp(34, "**المعاملات (الأوزان)**: أرقام داخلية يتعلمها النموذج أثناء التدريب، وهي مخزن معرفته، وتُقاس بالمليار (B) أو التريليون (T).", "**Parameters (weights)**: internal numbers the model learns during training; they store its knowledge and are counted in billions (B) or trillions (T)."),
        bp(41, "الذكاء الاصطناعي قوي جدًا لكنه ليس معصومًا من الخطأ: **قد يعطي معلومة خاطئة بثقة**.", "AI is very powerful but not infallible: **it can give wrong information confidently**."),
      ],
      levels: {
        simple: [
          L("what", "الأدوات التي تستخدمها في العمل مثل ChatGPT وClaude تعتمد على **((model|نموذج لغوي))** تعلّم من كمية ضخمة جدًا من النصوص كيف تُكتب اللغة وكيف تترابط الأفكار.\n\nتشبيه بسيط: تخيّل موظفًا قرأ ملايين الكتب والتقارير والرسائل، فصار يعرف «كيف يُقال الكلام عادةً» في أي موضوع — لكنه **لم يرَ ملفات شركتك أبدًا**.", "Tools you use at work, like ChatGPT and Claude, run on a **((model|language model))** that learned from a huge amount of text how language is written and how ideas connect.\n\nA simple picture: imagine an employee who read millions of books, reports and emails, so they know “how things are usually said” on any topic — but **has never seen your company’s files**."),
          L("why", "لأن الكتاب يبدأ من هنا: حين تفهم ما يحدث خلف الشاشة تعرف **لماذا** يجيد التلخيص والصياغة، و**لماذا** يخطئ أحيانًا بثقة، و**لماذا** يتحسن كثيرًا حين تعطيه سياقًا من عملك. هذا الفهم هو ما يحوّلك من مستخدم مندهش إلى مستخدم متمكن.", "Because the book starts here: once you understand what happens behind the screen, you know **why** it’s good at summarising and wording, **why** it’s sometimes confidently wrong, and **why** it improves so much with context from your work. That understanding turns an amazed user into a skilled one."),
        ],
        mech: [
          L("how", "1. تكتب سؤالك.\n2. يُقطَّع النص إلى قطع صغيرة اسمها ((token|توكنات)).\n3. تمر التوكنات على النموذج: مليارات الأرقام الداخلية (((parameters|المعاملات))) التي ضبطها التدريب.\n4. يتوقع النموذج أنسب قطعة تالية، فيضيفها، ثم يتوقع التي بعدها… حتى تكتمل الإجابة.", "1. You type your question.\n2. The text is cut into small pieces called ((token|tokens)).\n3. The tokens pass through the model: billions of internal numbers (((parameters|parameters))) tuned by training.\n4. The model predicts the most fitting next piece, adds it, predicts the next… until the answer is complete."),
          L("inside", "**كيف تعلّم من البيانات؟** أثناء التدريب يُعرض عليه نص ويُطلب منه توقع ما يأتي بعده آلاف المليارات من المرات؛ وفي كل مرة تُعدَّل المعاملات قليلًا لتصبح توقعاته أدق.\n\n**أين تُخزَّن المعرفة؟** ليست جملًا محفوظة في قاعدة بيانات، بل **أنماط موزعة داخل المعاملات**. لذلك يستطيع صياغة كلام جديد لم يُكتب من قبل، ولا يستطيع أن «يتذكر مصدرًا» بدقة ما لم تعطه المصدر. وكل ما يراه في الطلب الواحد محدود بـ((context_window|نافذة السياق)).", "**How did it learn from data?** In training it’s shown text and asked to predict what comes next, trillions of times; each time the parameters are nudged so its predictions get better.\n\n**Where is knowledge stored?** Not as saved sentences in a database but as **patterns spread across the parameters**. That’s why it can phrase things never written before, and why it can’t precisely “remember a source” unless you give it one. Everything it sees in one request is limited by the ((context_window|context window))."),
          L("link", "هذا يفسر قاعدة الكتاب الأساسية: **البرومبت جزء من السياق**، وكلما كان السياق أوضح كان الفهم أدق ([[f4]]). ويفسر لماذا يقدّم الكتاب «العقل الثاني» ([[p8]]): أن تعطيه مصادرك أنت بدل أن يعتمد على ذاكرته العامة. أما الأرقام (المعاملات، التوكنات، الحجم والسعر) فتجدها مفصلة في [[m1]].", "This explains the book’s core rule: **the prompt is part of the context**, and the clearer the context the sharper the understanding ([[f4]]). It also explains the “second brain” ([[p8]]): giving it your own sources instead of relying on its general memory. The numbers (parameters, tokens, size and price) are detailed in [[m1]]."),
        ],
        practice: [
          L("example", "مدير مصنع يسأل: «لماذا زادت التوقفات هذا الشهر؟» دون أي بيانات. ستأتيه أسباب عامة شائعة في كل المصانع (صيانة، خامات، تدريب) لأن النموذج **يكمل بالأرجح**. حين يلصق جدول التوقفات بأعمدته وتواريخه، يصبح الجواب عن مصنعه هو، ويستطيع أن يشير إلى الخط والوردية.", "A plant manager asks: “Why did stoppages rise this month?” with no data. They get generic reasons common to all factories (maintenance, materials, training) because the model **completes with the likely**. Once they paste the stoppage table with its columns and dates, the answer is about their plant and can point to the line and shift."),
          L("apply", "جرّب الآن: اسأل أداتك سؤالًا عن عملك **بلا أي سياق**، ثم اسأل نفس السؤال مع ثلاثة أسطر سياق (القسم، البيانات المتاحة، ما تريد أن تقرره). قارن الإجابتين، ودوّن الفرق في «ملاحظاتي» أسفل هذا الدرس.", "Try it now: ask your tool a work question **with no context**, then ask the same question with three lines of context (your department, the data you have, what you need to decide). Compare the two answers and note the difference in “My notes” below."),
        ],
        adv: [
          L("mistakes", "- **معاملته كمحرك بحث يعرف الحقيقة**: هو يولّد الأرجح، لا يسترجع الحقيقة.\n- **افتراض أنه يعرف بيانات شركتك** أو آخر الأخبار — لا يعرفها إلا إن أعطيته إياها (صفحة 41).\n- **الثقة في نبرة الإجابة**: الأسلوب الواثق ليس دليلًا على الصحة.", "- **Treating it like a search engine that knows the truth**: it generates the likely, it doesn’t retrieve the truth.\n- **Assuming it knows your company’s data** or the latest news — it doesn’t unless you give it (page 41).\n- **Trusting the tone**: a confident style is no proof of correctness."),
          L("whennot", "لا تعتمد عليه وحده في رقم يدخل تقريرًا رسميًا، أو قرار مالي أو قانوني، أو معلومة حديثة جدًا، دون مصدر ومراجعة بشرية. استخدمه لتسريع التفكير والكتابة والتحليل — لا ليحل محل التحقق ([[f5]]).", "Don’t rely on it alone for a number in an official report, a financial or legal decision, or very recent information without a source and human review. Use it to speed up thinking, writing and analysis — not to replace verification ([[f5]])."),
        ],
      },
    },
    {
      id: "f2", unit: "u0", pages: [1, 3, 4], diff: 1, min: 6, scene: "ladder", related: ["f3", "p12", "t1"], pre: [],
      title: { ar: "هدف الكورس وسلّم التدرّج", en: "The course goal and the learning ladder" },
      sum: { ar: "من الاستخدام المشتت إلى رؤية عملك كنظام متكامل — عبر ثماني درجات تبني كل واحدة على ما قبلها.", en: "From scattered use to seeing your work as one system — through eight steps, each building on the last." },
      book: [
        bp(1, "دورة تعلّم الذكاء الاصطناعي 2026: «ابنِ مهارات عملية وثقة أكبر، وأساليب عمل أذكى بالذكاء الاصطناعي».", "AI learning course 2026: “Build practical skills, more confidence and smarter ways of working with AI.”"),
        bp(3, "الكورس مصمم لينقلك **من البداية المشتتة** إلى فهم واضح، واستخدام عملي، وقدرة حقيقية على تطوير عملك بالذكاء الاصطناعي والأتمتة.", "The course is designed to move you **from a scattered start** to clear understanding, practical use and a real ability to improve your work with AI and automation."),
        bp(3, "بنهاية الكورس ستتمكن من: فهم قدرات الذكاء الاصطناعي وحدوده، واستخدامه كشريك عمل في التحليل والتفكير، واكتشاف المهام القابلة للأتمتة، وتنظيم البيانات وربط الخطوات والملفات، وبناء حلول عملية لاتخاذ قرارات أسرع، والانتقال من تحسين مهمة واحدة إلى تحسين سير العمل بالكامل.", "By the end you’ll be able to: understand AI’s capabilities and limits, use it as a partner in analysis and thinking, spot automatable tasks, organise data and connect steps and files, build practical solutions for faster decisions, and move from improving one task to improving the whole workflow."),
        bp(3, "الهدف ليس فقط أن تستخدم أدوات الذكاء الاصطناعي، **بل أن ترى عملك كنظام متكامل** وتعرف أين يمكن للتقنية أن تصنع أثرًا حقيقيًا.", "The goal isn’t only to use AI tools but **to see your work as an integrated system** and know where technology can make a real impact."),
        bp(4, "ثماني درجات: مساعد شخصي ← عقل ثانٍ ← موظف رقمي ← أتمتة ← أداة ← تطبيق ← نظام ← فريق رقمي ذكي.", "Eight steps: personal assistant → second brain → digital employee → automation → tool → application → system → smart digital team."),
        bp(4, "في البداية قد تقول: «أنا أعرف أستخدم الذكاء الاصطناعي». وفي النهاية ستقول: «**عندي مشكلة، وأعرف كيف أحوّلها إلى نظام ذكي**».", "At first you might say: “I know how to use AI.” In the end you’ll say: “**I have a problem, and I know how to turn it into a smart system.**”"),
      ],
      levels: {
        simple: [
          L("what", "سلّم من ثماني درجات يصف رحلتك: تبدأ بأداة تساعدك في الكتابة والبحث، وتنتهي بفريق من الوكلاء الأذكياء يدير جزءًا من عملك. تشبيه: مثل تعلّم القيادة — لا تبدأ بالطريق السريع، بل بموقف السيارات.", "An eight-step ladder describing your journey: you start with a tool that helps you write and search, and end with a team of smart agents running part of your work. Like learning to drive — you don’t start on the motorway but in the car park."),
          L("why", "لأن أكثر ما يُفسد التجربة هو **التشتت**: تجربة كل أداة جديدة دون أثر حقيقي. السلّم يعطيك ترتيبًا واضحًا: لا تقفز للأنظمة والوكلاء قبل أن تتقن الطلب الجيد والعقل الثاني.", "Because what ruins the experience most is **scatter**: trying every new tool with no real impact. The ladder gives a clear order: don’t jump to systems and agents before mastering good requests and the second brain."),
        ],
        mech: [
          L("how", "كل درجة تضيف قدرة واحدة فوق السابقة:\n- **مساعد شخصي** و**عقل ثانٍ**: أنت تستخدم الأداة.\n- **موظف رقمي** و**أتمتة**: الأداة تنجز مهامًا كاملة ومتكررة.\n- **أداة** و**تطبيق**: أنت تبني حلولًا يستخدمها غيرك.\n- **نظام** و**فريق رقمي**: الحلول تتصل ببعضها وتعمل معًا.", "Each step adds one ability on top of the last:\n- **Assistant** and **second brain**: you use the tool.\n- **Digital employee** and **automation**: the tool does whole, recurring tasks.\n- **Tool** and **application**: you build solutions others use.\n- **System** and **digital team**: solutions connect and work together."),
          L("link", "الأدلة الخمسة في الكتاب تمشي على نفس السلّم: الدليل الأول للصياغة والعقل الثاني والأتمتة الأولى، والثاني للأدوات، والثالث والرابع للتطبيقات، والخامس للنظام والفريق. والجلسات الثمانية للكورس تحمل نفس الأسماء.", "The book’s five guides follow the same ladder: guide 1 for wording, second brain and first automation; guide 2 for tools; guides 3 and 4 for applications; guide 5 for systems and teams. The course’s eight sessions carry the same names."),
        ],
        practice: [
          L("example", "موظفة في الموارد البشرية: تبدأ بصياغة إعلانات الوظائف (مساعد)، ثم تضع سياسات الشركة في دفتر يجيب عن أسئلة الموظفين (عقل ثانٍ)، ثم تكلّف الأداة بفرز السير الذاتية وتلخيصها (موظف رقمي)، ثم تؤتمت تقرير الإجازات الشهري (أتمتة)… وهكذا درجة بعد درجة.", "An HR officer starts by wording job ads (assistant), puts company policies into a notebook that answers staff questions (second brain), has the tool sort and summarise CVs (digital employee), then automates the monthly leave report (automation)… step by step."),
          L("apply", "حدّد درجتك الآن بصدق. ثم اختر **مهمة واحدة** من عملك وحدّد: في أي درجة تقع اليوم؟ وما الدرجة التالية لها؟ اكتب ذلك في ملاحظاتك — ستعود إليه في [[p12|خطة الثلاثين يومًا]].", "Be honest about your current step. Then pick **one task** from your work: which step is it on today, and what’s its next step? Write it in your notes — you’ll return to it in [[p12|the 30-day plan]]."),
        ],
        adv: [
          L("mistakes", "- القفز إلى «فريق وكلاء» قبل إتقان الطلب الجيد: النتيجة فوضى أسرع.\n- الوقوف عند الدرجة الأولى للأبد: الأداة تصبح محرك بحث سريعًا فقط — وهو أضعف استخدام ممكن (صفحة 7).", "- Jumping to an “agent team” before mastering good requests: you just get faster chaos.\n- Staying on step one forever: the tool becomes a quick search engine — the weakest possible use (page 7)."),
          L("whennot", "السلّم ترتيب للتعلم وليس سباقًا: ليست كل مهمة تحتاج نظامًا أو فريقًا. كثير من المهام يكفيها برومبت جيد، وبعضها يبقى أسرع باليد ([[y2]]).", "The ladder is a learning order, not a race: not every task needs a system or a team. Many tasks only need a good prompt, and some stay faster by hand ([[y2]])."),
        ],
      },
    },
    {
      id: "f3", unit: "u0", pages: [5], diff: 1, min: 6, scene: "datadecision", related: ["f1", "f4", "y4"], pre: ["f1"],
      title: { ar: "كيف يساعدك الذكاء الاصطناعي في العمل؟", en: "How AI helps you at work" },
      sum: { ar: "ست قدرات عملية، وسلسلة من البيانات إلى القرار: يجمع، يحلل، يختصر، يقارن، يقترح.", en: "Six practical capabilities and a chain from data to decision: collect, analyse, summarise, compare, suggest." },
      book: [
        bp(5, "يمكن للذكاء الاصطناعي أن يختصر الوقت، ويرفع جودة العمل، ويساعدك في التحليل والبحث والكتابة والمراجعة واتخاذ القرار بشكل أسرع وأوضح.", "AI can save time, raise work quality, and help you analyse, research, write, review and decide faster and more clearly."),
        bp(5, "**التحليل**: تحليل ملفات Excel كبيرة، وتحليل عدة ملفات PDF، ومقارنة التقارير، واكتشاف الأنماط والمشكلات.", "**Analysis**: analysing large Excel files and several PDFs, comparing reports, finding patterns and problems."),
        bp(5, "**التلخيص واستخراج المعلومات**: تلخيص التقارير الطويلة، واستخراج القرارات والأرقام، وتحويل مستندات كبيرة إلى ملخص تنفيذي.", "**Summarising and extraction**: summarising long reports, pulling out decisions and numbers, turning big documents into an executive summary."),
        bp(5, "**البحث داخل المعرفة**: البحث داخل ملفات الشركة، والإجابة عن السياسات والإجراءات، وربط المعلومات من أكثر من مصدر.", "**Searching knowledge**: searching company files, answering about policies and procedures, linking information from several sources."),
        bp(5, "**الكتابة وإعادة الصياغة**، **المقارنة والمراجعة** (اكتشاف التناقضات والنواقص)، **دعم القرار والتوقع** (سيناريوهات وبدائل ومخاطر وفرص).", "**Writing and rewording**, **comparing and reviewing** (finding contradictions and gaps), **decision support and forecasting** (scenarios, options, risks, opportunities)."),
        bp(5, "من البيانات إلى القرار: يجمع ← يحلل ← يختصر ← يقارن ← يقترح. **كلما زادت جودة البيانات والسياق، زادت قيمة النتيجة.**", "From data to decision: collect → analyse → summarise → compare → suggest. **The better the data and context, the more valuable the result.**"),
      ],
      levels: {
        simple: [
          L("what", "ست «مهارات» تستطيع أن تطلبها من الذكاء الاصطناعي في عملك اليومي: يحلل، يلخّص، يبحث في ملفاتك، يكتب، يقارن ويراجع، ويساعدك في القرار. تشبيه: مساعد ذكي جدًا وسريع جدًا — لكنه يحتاج منك أن تشرح له المطلوب.", "Six “skills” you can ask AI for in daily work: analyse, summarise, search your files, write, compare and review, and support decisions. Picture a very smart, very fast assistant — who needs you to explain what you want."),
          L("why", "لأن معرفة القدرات تجعلك ترى الفرص في عملك: كل تقرير طويل فرصة تلخيص، وكل ملفين متشابهين فرصة مقارنة، وكل قرار متكرر فرصة سيناريوهات.", "Knowing the capabilities lets you see opportunities at work: every long report is a summarising chance, every two similar files a comparison, every recurring decision a scenario exercise."),
        ],
        mech: [
          L("how", "السلسلة في الكتاب ترتيب منطقي: لا يمكن أن «يقترح» قبل أن «يقارن»، ولا أن يقارن قبل أن «يحلل»، ولا أن يحلل قبل أن «يجمع». كل حلقة تعتمد على جودة ما قبلها.", "The book’s chain is a logical order: it can’t “suggest” before it “compares”, compare before it “analyses”, or analyse before it “collects”. Each link depends on the quality of the one before."),
          L("link", "قاعدة «جودة البيانات والسياق» هنا هي نفسها قاعدة [[f1]] (النموذج يكمل بالأرجح إن نقص السياق)، وهي نفسها التي تتحول لاحقًا إلى «الجودة أولًا» في [[y4]].", "The “data and context quality” rule here is the same as in [[f1]] (the model completes with the likely when context is missing), and it later becomes “quality first” in [[y4]]."),
        ],
        practice: [
          L("example", "**المالية**: مقارنة موازنتين وكشف البنود التي تغيّرت. **التسويق**: تلخيص 50 تعليقًا للعملاء إلى أهم 5 شكاوى. **المبيعات**: سيناريوهات الربع القادم. **المصنع**: تحليل ملف توقفات كبير لاكتشاف نمط متكرر في وردية معينة.", "**Finance**: compare two budgets and flag changed items. **Marketing**: summarise 50 customer comments into the top 5 complaints. **Sales**: scenarios for next quarter. **Factory**: analyse a large stoppage file to find a pattern in one shift."),
          L("apply", "اكتب قائمة بخمس مهام من أسبوعك، وبجانب كل مهمة اكتب أي قدرة من الست تناسبها. ابدأ بالمهمة الأصغر والأكثر تكرارًا.", "List five tasks from your week, and next to each write which of the six capabilities fits. Start with the smallest, most frequent one."),
        ],
        adv: [
          L("mistakes", "- طلب «اقتراح» مباشرة دون إعطاء بيانات للتحليل: اقتراح عام.\n- إعطاء بيانات معطوبة ثم الثقة في التحليل: نتيجة دقيقة الشكل خاطئة المضمون.", "- Asking for a “suggestion” straight away with no data to analyse: a generic suggestion.\n- Feeding broken data then trusting the analysis: precise-looking, wrong-in-substance results."),
          L("whennot", "في «دعم القرار» يبقى القرار لك: الأداة تقترح وتعرض البدائل والمخاطر، لكنها لا تتحمل مسؤولية القرار ([[f5]]).", "In “decision support” the decision stays yours: the tool suggests and lays out options and risks but doesn’t own the decision ([[f5]])."),
        ],
      },
      case: { field: { ar: "المبيعات", en: "Sales" }, title: { ar: "تقرير مبيعات شهري من 3 فروع", en: "A monthly sales report from 3 branches" },
        steps: {
          problem: { ar: "مشرف مبيعات يقضي نحو يوم كامل كل شهر في دمج ملفات 3 فروع وكتابة ملخص للمدير.", en: "A sales supervisor spends about a full day each month merging 3 branch files and writing a summary for the manager." },
          old: { ar: "نسخ ولصق يدوي، ثم قراءة الأرقام بالعين، ثم كتابة فقرة عامة: «المبيعات جيدة هذا الشهر».", en: "Manual copy-paste, eyeballing numbers, then a vague paragraph: “sales were good this month”." },
          idea: { ar: "يمشي على سلسلة الكتاب: يجمع الملفات، يحلل الفروق، يختصر في ملخص تنفيذي، يقارن بالشهر السابق، ويقترح إجراءات.", en: "Follow the book’s chain: collect the files, analyse differences, summarise for executives, compare with last month, suggest actions." },
          steps: { ar: "1. يرفع الملفات الثلاثة ويصف أعمدتها.\n2. يطلب تحليل الفروق بين الفروع والشهور.\n3. يطلب ملخصًا من خمسة أسطر لمدير مشغول.\n4. يطلب ثلاثة إجراءات مع سبب كل إجراء.", en: "1. Upload the three files and describe their columns.\n2. Ask for differences across branches and months.\n3. Ask for a five-line summary for a busy manager.\n4. Ask for three actions with the reason for each." },
          result: { ar: "مسودة جاهزة خلال ساعة تقريبًا بدل يوم (رقم افتراضي)، يراجع المشرف أرقامها ثم يرسلها.", en: "A ready draft in about an hour instead of a day (hypothetical), whose numbers the supervisor checks before sending." },
          risks: { ar: "إن كانت ملفات الفروع بأسماء أعمدة مختلفة قد يخطئ الدمج؛ ويجب أن يطابق المشرف الإجماليات بنفسه قبل الإرسال.", en: "If branch files use different column names the merge can go wrong; the supervisor must match totals personally before sending." },
        } },
    },
    {
      id: "f4", unit: "u0", pages: [6], diff: 1, min: 7, scene: "chatagent", related: ["f1", "p1", "t1"], pre: ["f1"],
      title: { ar: "من السؤال إلى مساعدك الاستراتيجي", en: "From a question to your strategic assistant" },
      sum: { ar: "السياق والبرومبت وأهمية السياق، وأدواتك، والانتقال من الشات التقليدي إلى المساعد الشخصي إلى الوكيل الذكي.", en: "Context, prompt and why context matters; your tools; and the move from traditional chat to personal assistant to smart agent." },
      book: [
        bp(6, "ليست قوة الذكاء الاصطناعي في الإجابة فقط، بل في قدرته على **فهم السياق، وتحليل المشكلة، وتقديم حلول عملية تناسب هدفك**.", "AI’s power isn’t only in answering but in its ability to **understand context, analyse the problem and offer practical solutions that fit your goal**."),
        bp(6, "**السياق (Context)**: كل المعلومات التي تعطيها للذكاء الاصطناعي ليفهم صورتك وهدفك والمشكلة بالكامل.", "**Context**: all the information you give AI so it fully understands your situation, goal and problem."),
        bp(6, "**البرومبت (Prompt)**: جزء من السياق، ويحدد المهمة المطلوبة والطريقة التي تريد بها الإجابة.", "**Prompt**: part of the context; it sets the task and how you want the answer."),
        bp(6, "**أهمية السياق**: كلما كان السياق أوضح وأغنى، كان فهم النموذج أدق والنتيجة أفضل.", "**Why context matters**: the clearer and richer the context, the more precise the model’s understanding and the better the result."),
        bp(6, "أدواتك: **Claude** متميز في التحليل العميق والبرمجة وفهم الملفات الطويلة والمعقدة، و**ChatGPT** مناسب للمحادثة والتحليل والكتابة والمشاريع المتنوعة.", "Your tools: **Claude** excels at deep analysis, coding and long complex files; **ChatGPT** suits conversation, analysis, writing and varied projects."),
        bp(6, "**الشات التقليدي**: تسأل وتحصل على إجابة. **المساعد الشخصي**: يفهمك ويتذكر السياق ويساعدك باستمرار. **الوكيل الذكي**: يخطط ويستخدم أدوات وينفذ مهام ويتابع النتائج. **كل شيء يبدأ من سياق واضح وبرومبت ذكي.**", "**Traditional chat**: ask and get an answer. **Personal assistant**: understands you, remembers context, keeps helping. **Smart agent**: plans, uses tools, carries out tasks, follows up. **Everything starts with clear context and a smart prompt.**"),
      ],
      levels: {
        simple: [
          L("what", "**السياق** هو كل ما تخبر به الأداة عن وضعك. و**البرومبت** هو الجزء الذي يقول لها «افعل هذا بهذه الطريقة». تشبيه: حين تكلّف زميلًا جديدًا بمهمة، تشرح له الخلفية (سياق) ثم المطلوب (برومبت).", "**Context** is everything you tell the tool about your situation. The **prompt** is the part that says “do this, this way”. Like briefing a new colleague: you explain the background (context) and then the task (prompt)."),
          L("why", "لأن نفس السؤال بسياقين مختلفين يعطي إجابتين مختلفتين تمامًا. والانتقال من «شات» إلى «مساعد» إلى «وكيل» هو في الحقيقة زيادة في السياق والقدرة على الفعل.", "Because the same question with two different contexts gives two completely different answers. And moving from “chat” to “assistant” to “agent” is really an increase in context and ability to act."),
        ],
        mech: [
          L("how", "- **الشات**: سؤال ← إجابة، بلا ذاكرة طويلة.\n- **المساعد**: يحتفظ بسياقك (مشروعك، أسلوبك، ملفاتك) فيبني عليه في كل مرة.\n- **الوكيل**: يُعطى هدفًا وأدوات (قراءة ملف، إرسال رسالة…) ويكرر: يخطط ← ينفذ ← يرى النتيجة ← يصحح.", "- **Chat**: question → answer, no long memory.\n- **Assistant**: keeps your context (project, style, files) and builds on it each time.\n- **Agent**: given a goal and tools (read a file, send a message…), it loops: plan → act → observe → correct."),
          L("inside", "حين يقول الكتاب إن النموذج «يبني الوعي» حول مشروعك، فالمقصود أن كل ما في نافذة السياق — تعليماتك وملفاتك والمحادثة السابقة — يؤثر على كل كلمة يولّدها ([[f1]]).", "When the book says the model “builds awareness” of your project, it means everything in the context window — your instructions, files and prior conversation — shapes every word it generates ([[f1]])."),
          L("link", "هذا الدرس هو الجسر إلى [[p1]] (كيف تكتب برومبتًا قويًا) وإلى [[t1]] (الوكلاء والفريق الرقمي).", "This lesson bridges to [[p1]] (writing a strong prompt) and [[t1]] (agents and the digital team)."),
        ],
        practice: [
          L("example", "في التسويق: «اكتب منشورًا» (شات) يعطي منشورًا عامًا. مساعد يعرف هوية العلامة والجمهور والحملة السابقة يكتب منشورًا مناسبًا. ووكيل يُكلَّف بهدف «جهّز خطة منشورات الأسبوع» يقرأ التقويم والنتائج السابقة ويقترح خمسة منشورات ويرسلها للمراجعة.", "In marketing: “Write a post” (chat) gives a generic post. An assistant that knows the brand, audience and last campaign writes a fitting one. An agent tasked with “prepare this week’s posting plan” reads the calendar and past results, proposes five posts and sends them for review."),
          L("apply", "اكتب «ورقة سياق» من خمسة أسطر عن عملك (القسم، الجمهور، البيانات المعتادة، الأسلوب، الممنوعات) واحفظها. الصقها في بداية أي محادثة مهمة — هذا أول تحويل للشات إلى مساعد.", "Write a five-line “context sheet” about your work (department, audience, usual data, style, don’ts) and keep it. Paste it at the start of any important chat — your first step from chat to assistant."),
        ],
        adv: [
          L("mistakes", "- الظن أن البرومبت وحده يكفي: البرومبت بلا سياق مثل تكليف بلا خلفية.\n- اختيار الأداة بالاسم لا بالمهمة: قارن على مهمتك أنت ([[m2]]).", "- Thinking the prompt alone is enough: a prompt without context is a task without a briefing.\n- Picking the tool by brand, not task: compare on your own task ([[m2]])."),
          L("whennot", "الوكيل ليس الحل الأفضل دائمًا: إن كانت المهمة سؤالًا واحدًا، فالشات أسرع وأرخص وأوضح. استخدم الوكيل حين توجد خطوات متعددة وأدوات وحدود واضحة للتوقف.", "An agent isn’t always best: for a single question, chat is faster, cheaper and clearer. Use an agent when there are several steps, tools and clear stop limits."),
        ],
      },
    },
    {
      id: "f5", unit: "u0", pages: [41], diff: 1, min: 6, scene: "limits", related: ["f1", "p3", "p12"], pre: [],
      title: { ar: "حدود الذكاء الاصطناعي والاستخدام الواعي", en: "AI’s limits and wise use" },
      sum: { ar: "ثمانية حدود يجب أن تعرفها، وسلسلة الاستخدام الواعي: حدّد الهدف، أعطه السياق، راجع، تأكد من المصادر، اتخذ القرار.", en: "Eight limits to know, and the wise-use chain: define the goal, give context, review, verify sources, decide." },
      book: [
        bp(41, "الذكاء الاصطناعي قوي جدًا، لكنه ليس معصومًا من الخطأ. **أفضل استخدام له هو أن يعمل معك، لا بدلًا منك.**", "AI is very powerful but not infallible. **It works best with you, not instead of you.**"),
        bp(41, "قد يعطي معلومة خاطئة بثقة، وقد يسيء فهم السؤال إذا كان السياق ناقصًا، وجودة النتيجة تعتمد على جودة البيانات والتعليمات.", "It can give wrong information confidently, misread a question when context is missing, and its result quality depends on data and instruction quality."),
        bp(41, "القرارات الحساسة تحتاج مراجعة بشرية قبل الاعتماد، ولا يعرف بيانات شركتك إلا إذا وفرتها له أو ربطته بمصادرها.", "Sensitive decisions need human review before adoption, and it doesn’t know your company’s data unless you provide it or connect it to the sources."),
        bp(41, "بعض المعلومات قد تكون قديمة أو غير مكتملة، ولا يجب إدخال بيانات حساسة بدون ضوابط واضحة. **هو يدعم القرار، لكنه لا يتحمل مسؤولية القرار.**", "Some information may be outdated or incomplete, and sensitive data shouldn’t be entered without clear controls. **It supports the decision but doesn’t bear responsibility for it.**"),
        bp(41, "أفضل استخدام واعٍ: حدّد الهدف ← أعطه السياق ← راجع النتيجة ← تأكد من المصادر ← اتخذ القرار.", "Wise use: define the goal → give context → review the result → verify sources → decide."),
        bp(41, "**أفضل نتيجة = إنسان يفكر + بيانات جيدة + ذكاء اصطناعي.**", "**Best result = a thinking human + good data + AI.**"),
      ],
      levels: {
        simple: [
          L("what", "قائمة بما **لا** يستطيع الذكاء الاصطناعي ضمانه: الصحة الدائمة، ومعرفة بياناتك، وحداثة المعلومات، وتحمل مسؤولية القرار. تشبيه: مستشار سريع وذكي — لكنك أنت من يوقّع.", "A list of what AI **can’t** guarantee: always being right, knowing your data, current information, and owning the decision. Think of a fast, smart adviser — but you are the one who signs."),
          L("why", "لأن خطأً واحدًا بثقة في تقرير للإدارة قد يكلّف أكثر من كل الوقت الذي وفّرته الأداة. معرفة الحدود هي ما يجعلك تستخدم القوة بأمان.", "Because one confident mistake in a management report can cost more than all the time the tool saved. Knowing the limits lets you use the power safely."),
        ],
        mech: [
          L("how", "الحدود الثمانية ليست عشوائية؛ أغلبها نتيجة مباشرة لطريقة عمل النموذج ([[f1]]): يكمل بالأرجح، ويرى فقط ما في نافذة السياق، وتعلّم من بيانات لها تاريخ توقف.", "The eight limits aren’t random; most follow directly from how the model works ([[f1]]): it completes with the likely, sees only what’s in the context window, and learned from data with a cut-off date."),
          L("link", "سلسلة الاستخدام الواعي هي نسخة مختصرة من قائمة التحقق في [[p12]] ومن برومبتات التحقق في [[p3]].", "The wise-use chain is a short version of the checklist in [[p12]] and the verification prompts in [[p3]]."),
        ],
        practice: [
          L("example", "محاسب يطلب من الأداة حساب ضريبة فاتورة. تعطيه رقمًا بثقة. قبل الاعتماد: يتأكد من النسبة المعتمدة رسميًا، ويحسب مثالًا واحدًا يدويًا، ويطلب من الأداة ذكر الافتراضات التي بنت عليها. هذا هو الفرق بين الاستخدام والاعتماد الأعمى.", "An accountant asks the tool to compute a tax on an invoice and gets a confident number. Before adopting it: check the official rate, compute one example by hand, and ask the tool to state its assumptions. That’s the difference between using and blind reliance."),
          L("apply", "قبل إرسال أي مخرج من الذكاء الاصطناعي هذا الأسبوع، طبّق السلسلة الخماسية عليه حرفيًا، وعلّم كل خطوة. وراجع سياسة شركتك قبل رفع أي مستند حساس.", "Before sending any AI output this week, apply the five-step chain literally and tick each step. And check your company policy before uploading any sensitive document."),
        ],
        adv: [
          L("mistakes", "- «الأداة قالت كذا» كمبرر لقرار: المسؤولية لا تُفوَّض للأداة.\n- رفع بيانات العملاء أو الرواتب دون ضوابط.\n- افتراض أن المعلومة حديثة لأنها مكتوبة بثقة.", "- “The tool said so” as a justification: responsibility can’t be delegated to a tool.\n- Uploading customer or salary data without controls.\n- Assuming information is current because it sounds confident."),
          L("whennot", "لا تستخدمه بديلًا عن القرار البشري في الأمور ذات الأثر المالي أو التنظيمي، ولا في أي بيانات تمنع سياسة شركتك رفعها. في هذه الحالات استخدمه في التحضير فقط، أو استخدم نموذجًا محليًا ([[m3]]).", "Don’t use it in place of human decisions with financial or organisational impact, or with data your company forbids uploading. In those cases use it only for preparation, or use a local model ([[m3]])."),
        ],
      },
    },
  ]);
})(window.ACADEMY = window.ACADEMY || {});
