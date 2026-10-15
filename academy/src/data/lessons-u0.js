/* Unit 0 — Foundations (book pages 1–6 and 41). Book points carry page numbers; levels are academy explanations. */
"use strict";
(function (A) {
  const bp = (p, ar, en) => ({ p, ar, en });
  const L = (k, ar, en) => ({ k, ar, en });
  A.lessons = (A.lessons || []).concat([
    {
      id: "f1", unit: "u0", pages: [2, 6, 34, 41], diff: 1, min: 8, scene: "modelflow", related: ["f4", "m1", "f5"], pre: [],
      title: { ar: "إيه اللي بيحصل ورا الشاشة؟", en: "What happens behind the screen?" },
      sum: { ar: "النموذج بيتعلّم من البيانات إزاي، ومعرفته متخزّنة فين، وإزاي بيولّد الإجابة حرف بحرف.", en: "How a model learns from data, where its knowledge lives, and how it generates an answer piece by piece." },
      book: [
        bp(2, "احنا بنستخدم الذكاء الاصطناعي النهاردة في الكتابة والتحليل والبحث والتعلّم واتخاذ القرارات وأتمتة المهام، بس ورا النتائج المدهشة دي **أسئلة أساسية** تستاهل تفهمها بوضوح.", "We use AI today for writing, analysis, research, learning, decisions and automation — but behind these impressive results are **basic questions** worth understanding clearly."),
        bp(2, "أسئلة هتقودك في الرحلة: الذكاء الاصطناعي إيه فعلًا؟ نموذج يعني إيه؟ الآلة بتتعلّم من البيانات إزاي؟ المعرفة متخزّنة فين جوّا النموذج؟ بيفهم اللغة وبيولّد الإجابات إزاي؟ وإزاي وصلنا من البرامج التقليدية للمساعدين والوكلاء؟", "Guiding questions: What is AI really? What is a model? How does a machine learn from data? Where is knowledge stored inside the model? How does it understand language and generate answers? How did we move from traditional software to assistants and agents?"),
        bp(2, "الذكاء الاصطناعي ممكن يبان غامض لما تشوف النتيجة بس، بس لما تفهم إيه اللي بيحصل ورا الشاشة **الغموض بيتحوّل لفهم، والفهم لقدرة حقيقية على الاستخدام**.", "AI can seem mysterious when we only see the result, but once we understand what happens behind the screen, **mystery becomes understanding, and understanding becomes real ability**."),
        bp(6, "إيه اللي بيحصل جوّا النموذج؟ البرومبت بيترجم لتعليمات النموذج بيفهمها، وبيستخدم السياق عشان يبني «وعي» حوالين مشروعك.", "What happens inside the model? The prompt is translated into instructions the model understands, and it uses the context to build “awareness” of your project."),
        bp(34, "**المعاملات (الأوزان)**: أرقام جوّا النموذج بيتعلّمها وقت التدريب، ودي مخزن معرفته، وبنقيسها بالمليار (B) أو التريليون (T).", "**Parameters (weights)**: internal numbers the model learns during training; they store its knowledge and are counted in billions (B) or trillions (T)."),
        bp(41, "الذكاء الاصطناعي قوي جدًا بس مش معصوم من الغلط: **ممكن يديك معلومة غلط بثقة**.", "AI is very powerful but not infallible: **it can give wrong information confidently**."),
      ],
      levels: {
        simple: [
          L("what", "الأدوات اللي بتستخدمها في الشغل زي ChatGPT وClaude بتعتمد على **((model|نموذج لغوي))** اتعلّم من كمية نصوص ضخمة جدًا إزاي اللغة بتتكتب وإزاي الأفكار بتترابط.\n\nتشبيه بسيط: تخيّل موظف قرا ملايين الكتب والتقارير والرسائل، وبقى يعرف «الكلام بيتقال إزاي عادةً» في أي موضوع — بس **ما شاف ملفات شركتك خالص**.", "Tools you use at work, like ChatGPT and Claude, run on a **((model|language model))** that learned from a huge amount of text how language is written and how ideas connect.\n\nA simple picture: imagine an employee who read millions of books, reports and emails, so they know “how things are usually said” on any topic — but **has never seen your company’s files**."),
          L("why", "لأن الكتاب بيبدأ من هنا: لما تفهم إيه اللي بيحصل ورا الشاشة هتعرف **ليه** شاطر في التلخيص والصياغة، و**ليه** بيغلط أحيانًا بثقة، و**ليه** بيتحسّن كتير لما تديله سياق من شغلك. الفهم ده هو اللي بيحوّلك من مستخدم مندهش لمستخدم متمكّن.", "Because the book starts here: once you understand what happens behind the screen, you know **why** it’s good at summarising and wording, **why** it’s sometimes confidently wrong, and **why** it improves so much with context from your work. That understanding turns an amazed user into a skilled one."),
        ],
        mech: [
          L("how", "1. بتكتب سؤالك.\n2. النص بيتقطّع لقطع صغيرة اسمها ((token|توكنات)).\n3. التوكنات بتمر على النموذج: مليارات الأرقام الجوّا (((parameters|المعاملات))) اللي التدريب ضبطها.\n4. النموذج بيتوقع أنسب قطعة جاية، بيضيفها، وبعدين يتوقع اللي بعدها… لحد ما الإجابة تكمل.", "1. You type your question.\n2. The text is cut into small pieces called ((token|tokens)).\n3. The tokens pass through the model: billions of internal numbers (((parameters|parameters))) tuned by training.\n4. The model predicts the most fitting next piece, adds it, predicts the next… until the answer is complete."),
          L("inside", "**اتعلّم من البيانات إزاي؟** وقت التدريب بيعرض عليه نص وبيطلب منه يتوقع اللي جاي بعده تريليونات المرات؛ وكل مرة المعاملات بتتعدّل شوية عشان توقعاته تبقى أدق.\n\n**المعرفة متخزّنة فين؟** مش جمل محفوظة في قاعدة بيانات، لكن **أنماط موزّعة جوّا المعاملات**. عشان كده يقدر يصيغ كلام جديد ما اتكتبش قبل كده، وما يقدرش «يتذكر مصدر» بدقة إلا لو إنت اديته المصدر. وكل اللي بيشوفه في الطلب الواحد محدود بـ((context_window|نافذة السياق)).", "**How did it learn from data?** In training it’s shown text and asked to predict what comes next, trillions of times; each time the parameters are nudged so its predictions get better.\n\n**Where is knowledge stored?** Not as saved sentences in a database but as **patterns spread across the parameters**. That’s why it can phrase things never written before, and why it can’t precisely “remember a source” unless you give it one. Everything it sees in one request is limited by the ((context_window|context window))."),
          L("link", "ده بيفسّر قاعدة الكتاب الأساسية: **البرومبت جزء من السياق**، وكل ما السياق يبقى أوضح الفهم يبقى أدق ([[f4]]). وبيفسّر ليه الكتاب بيقدّم «العقل الثاني» ([[p8]]): إنك تديله مصادرك إنت بدل ما يعتمد على ذاكرته العامة. وأرقام (المعاملات، التوكنات، الحجم والسعر) هتلاقيها مفصّلة في [[m1]].", "This explains the book’s core rule: **the prompt is part of the context**, and the clearer the context the sharper the understanding ([[f4]]). It also explains the “second brain” ([[p8]]): giving it your own sources instead of relying on its general memory. The numbers (parameters, tokens, size and price) are detailed in [[m1]]."),
        ],
        practice: [
          L("example", "مدير مصنع بيسأل: «ليه التوقفات زادت الشهر ده؟» من غير أي بيانات. هتجيله أسباب عامة شائعة في كل المصانع (صيانة، خامات، تدريب) لأن النموذج **بيكمّل بالأرجح**. لما يلصق جدول التوقفات بأعمدته وتواريخه، الجواب بيبقى عن مصنعه هو، ويقدر يشير للخط والوردية.", "A plant manager asks: “Why did stoppages rise this month?” with no data. They get generic reasons common to all factories (maintenance, materials, training) because the model **completes with the likely**. Once they paste the stoppage table with its columns and dates, the answer is about their plant and can point to the line and shift."),
          L("apply", "جرّب دلوقتي: اسأل أداتك سؤال عن شغلك **من غير أي سياق**، وبعدين اسأل نفس السؤال مع تلات أسطر سياق (القسم، البيانات المتاحة، إنت عاوز تقرّر إيه). قارن الإجابتين، واكتب الفرق في «ملاحظاتي» تحت الدرس ده.", "Try it now: ask your tool a work question **with no context**, then ask the same question with three lines of context (your department, the data you have, what you need to decide). Compare the two answers and note the difference in “My notes” below."),
        ],
        adv: [
          L("mistakes", "- **تتعامل معاه كمحرك بحث عارف الحقيقة**: هو بيولّد الأرجح، مش بيجيب الحقيقة.\n- **تفترض إنه عارف بيانات شركتك** أو آخر الأخبار — مش هيعرفها إلا لو إنت اديتهاله (صفحة 41).\n- **الثقة في نبرة الإجابة**: الأسلوب الواثق مش دليل على الصحة.", "- **Treating it like a search engine that knows the truth**: it generates the likely, it doesn’t retrieve the truth.\n- **Assuming it knows your company’s data** or the latest news — it doesn’t unless you give it (page 41).\n- **Trusting the tone**: a confident style is no proof of correctness."),
          L("whennot", "ما تعتمدش عليه لوحده في رقم هيدخل تقرير رسمي، أو قرار مالي أو قانوني، أو معلومة حديثة جدًا، من غير مصدر ومراجعة بشرية. استخدمه عشان تسرّع التفكير والكتابة والتحليل — مش عشان يحلّ محل التحقق ([[f5]]).", "Don’t rely on it alone for a number in an official report, a financial or legal decision, or very recent information without a source and human review. Use it to speed up thinking, writing and analysis — not to replace verification ([[f5]])."),
        ],
      },
    },
    {
      id: "f2", unit: "u0", pages: [1, 3, 4], diff: 1, min: 6, scene: "ladder", related: ["f3", "p12", "t1"], pre: [],
      title: { ar: "هدف الكورس وسلّم التدرّج", en: "The course goal and the learning ladder" },
      sum: { ar: "من استخدام مشتت لرؤية شغلك كنظام متكامل — على تمان درجات، كل واحدة بتبني على اللي قبلها.", en: "From scattered use to seeing your work as one system — through eight steps, each building on the last." },
      book: [
        bp(1, "دورة تعلّم الذكاء الاصطناعي 2026: «ابنِ مهارات عملية وثقة أكبر، وأساليب عمل أذكى بالذكاء الاصطناعي».", "AI learning course 2026: “Build practical skills, more confidence and smarter ways of working with AI.”"),
        bp(3, "الكورس متصمم ينقلك **من البداية المشتتة** لفهم واضح، واستخدام عملي، وقدرة حقيقية على تطوير شغلك بالذكاء الاصطناعي والأتمتة.", "The course is designed to move you **from a scattered start** to clear understanding, practical use and a real ability to improve your work with AI and automation."),
        bp(3, "آخر الكورس هتقدر: تفهم قدرات الذكاء الاصطناعي وحدوده، وتستخدمه كشريك في التحليل والتفكير، وتكتشف المهام اللي تنفع للأتمتة، وتنظّم البيانات وربط الخطوات والملفات، وتبني حلول عملية لقرارات أسرع، وتتحوّل من تحسين مهمة واحدة لتحسين سير الشغل كله.", "By the end you’ll be able to: understand AI’s capabilities and limits, use it as a partner in analysis and thinking, spot automatable tasks, organise data and connect steps and files, build practical solutions for faster decisions, and move from improving one task to improving the whole workflow."),
        bp(3, "الهدف مش بس إنك تستخدم أدوات الذكاء الاصطناعي، **لكن إنك تشوف شغلك كنظام متكامل** وتعرف فين التقنية تقدر تصنع أثر حقيقي.", "The goal isn’t only to use AI tools but **to see your work as an integrated system** and know where technology can make a real impact."),
        bp(4, "تمان درجات: مساعد شخصي ← عقل ثانٍ ← موظف رقمي ← أتمتة ← أداة ← تطبيق ← نظام ← فريق رقمي ذكي.", "Eight steps: personal assistant → second brain → digital employee → automation → tool → application → system → smart digital team."),
        bp(4, "في الأول ممكن تقول: «أنا عارف أستخدم الذكاء الاصطناعي». وفي الآخر هتقول: «**عندي مشكلة، وعارف أحوّلها لنظام ذكي**».", "At first you might say: “I know how to use AI.” In the end you’ll say: “**I have a problem, and I know how to turn it into a smart system.**”"),
      ],
      levels: {
        simple: [
          L("what", "سلّم من تمان درجات بيوصف رحلتك: بتبدأ بأداة تساعدك في الكتابة والبحث، وبتنتهي بفريق وكلاء أذكياء بيدير جزء من شغلك. زي أي موظف جديد: بيتقن مهمة محددة الأول، وبعدين بياخد مسؤوليات أكبر.", "An eight-step ladder describing your journey: you start with a tool that helps you write and search, and end with a team of smart agents running part of your work. Like learning to drive — you don’t start on the motorway but in the car park."),
          L("why", "لأن أكتر ما يفسد التجربة هو **التشتت**: تجربة كل أداة جديدة من غير أثر حقيقي. السلّم بيديك ترتيب واضح: ما تقفزش للأنظمة والوكلاء قبل ما تتقن الطلب الجيد والعقل الثاني.", "Because what ruins the experience most is **scatter**: trying every new tool with no real impact. The ladder gives a clear order: don’t jump to systems and agents before mastering good requests and the second brain."),
        ],
        mech: [
          L("how", "كل درجة بتضيف قدرة واحدة فوق اللي قبلها:\n- **مساعد شخصي** و**عقل ثانٍ**: إنت اللي بتستخدم الأداة.\n- **موظف رقمي** و**أتمتة**: الأداة بتنجز مهام كاملة ومتكررة.\n- **أداة** و**تطبيق**: إنت اللي بتبني حلول غيرك بيستخدمها.\n- **نظام** و**فريق رقمي**: الحلول بتتصل ببعض وبتشتغل مع بعض.", "Each step adds one ability on top of the last:\n- **Assistant** and **second brain**: you use the tool.\n- **Digital employee** and **automation**: the tool does whole, recurring tasks.\n- **Tool** and **application**: you build solutions others use.\n- **System** and **digital team**: solutions connect and work together."),
          L("link", "الأدلة الخمسة في الكتاب ماشية على نفس السلّم: الدليل الأول للصياغة والعقل الثاني والأتمتة الأولى، والتاني للأدوات، والتالت والرابع للتطبيقات، والخامس للنظام والفريق. والجلسات التمانية للكورس بنفس الأسماء.", "The book’s five guides follow the same ladder: guide 1 for wording, second brain and first automation; guide 2 for tools; guides 3 and 4 for applications; guide 5 for systems and teams. The course’s eight sessions carry the same names."),
        ],
        practice: [
          L("example", "موظفة في الموارد البشرية: بتبدأ بصياغة إعلانات الوظايف (مساعد)، وبعدين تحط سياسات الشركة في دفتر يجاوب على أسئلة الموظفين (عقل ثانٍ)، وبعدين تكلف الأداة بفرز السير الذاتية وتلخيصها (موظف رقمي)، وبعدين تأتمت تقرير الإجازات الشهري (أتمتة)… وهكذا درجة ورا درجة.", "An HR officer starts by wording job ads (assistant), puts company policies into a notebook that answers staff questions (second brain), has the tool sort and summarise CVs (digital employee), then automates the monthly leave report (automation)… step by step."),
          L("apply", "حدّد درجتك دلوقتي بصدق. وبعدين اختار **مهمة واحدة** من شغلك وحدّد: في أي درجة هي النهاردة؟ وإيه الدرجة اللي بعدها؟ اكتب ده في ملاحظاتك — هترجعله في [[p12|خطة الثلاثين يومًا]].", "Be honest about your current step. Then pick **one task** from your work: which step is it on today, and what’s its next step? Write it in your notes — you’ll return to it in [[p12|the 30-day plan]]."),
        ],
        adv: [
          L("mistakes", "- القفز لـ«فريق وكلاء» قبل ما تتقن الطلب الجيد: النتيجة فوضى أسرع.\n- الوقوف في الدرجة الأولى للأبد: الأداة بتبقى محرك بحث سريع بس — وده أضعف استخدام ممكن (صفحة 7).", "- Jumping to an “agent team” before mastering good requests: you just get faster chaos.\n- Staying on step one forever: the tool becomes a quick search engine — the weakest possible use (page 7)."),
          L("whennot", "السلّم ترتيب للتعلّم مش سباق: مش كل مهمة محتاجة نظام أو فريق. مهام كتير يكفيها برومبت كويس، وبعضها إنجازه يدويًا أسرع ([[y2]]).", "The ladder is a learning order, not a race: not every task needs a system or a team. Many tasks only need a good prompt, and some stay faster by hand ([[y2]])."),
        ],
      },
    },
    {
      id: "f3", unit: "u0", pages: [5], diff: 1, min: 6, scene: "datadecision", related: ["f1", "f4", "y4"], pre: ["f1"],
      title: { ar: "الذكاء الاصطناعي بيساعدك في الشغل إزاي؟", en: "How AI helps you at work" },
      sum: { ar: "ست قدرات عملية، وسلسلة من البيانات للقرار: يجمع، يحلل، يختصر، يقارن، يقترح.", en: "Six practical capabilities and a chain from data to decision: collect, analyse, summarise, compare, suggest." },
      book: [
        bp(5, "الذكاء الاصطناعي يقدر يختصر الوقت، ويرفع جودة الشغل، ويساعدك في التحليل والبحث والكتابة والمراجعة واتخاذ القرار أسرع وأوضح.", "AI can save time, raise work quality, and help you analyse, research, write, review and decide faster and more clearly."),
        bp(5, "**التحليل**: تحليل ملفات Excel كبيرة، وتحليل كذا ملف PDF، ومقارنة التقارير، واكتشاف الأنماط والمشكلات.", "**Analysis**: analysing large Excel files and several PDFs, comparing reports, finding patterns and problems."),
        bp(5, "**التلخيص واستخراج المعلومات**: تلخيص التقارير الطويلة، واستخراج القرارات والأرقام، وتحويل مستندات كبيرة لملخص تنفيذي.", "**Summarising and extraction**: summarising long reports, pulling out decisions and numbers, turning big documents into an executive summary."),
        bp(5, "**البحث جوّا المعرفة**: البحث في ملفات الشركة، والإجابة عن السياسات والإجراءات، وربط المعلومات من أكتر من مصدر.", "**Searching knowledge**: searching company files, answering about policies and procedures, linking information from several sources."),
        bp(5, "**الكتابة وإعادة الصياغة**، **المقارنة والمراجعة** (اكتشاف التناقضات والنواقص)، **دعم القرار والتوقع** (سيناريوهات وبدائل ومخاطر وفرص).", "**Writing and rewording**, **comparing and reviewing** (finding contradictions and gaps), **decision support and forecasting** (scenarios, options, risks, opportunities)."),
        bp(5, "من البيانات للقرار: يجمع ← يحلل ← يختصر ← يقارن ← يقترح. **كل ما جودة البيانات والسياق تزيد، قيمة النتيجة بتزيد.**", "From data to decision: collect → analyse → summarise → compare → suggest. **The better the data and context, the more valuable the result.**"),
      ],
      levels: {
        simple: [
          L("what", "ست «مهارات» تقدر تطلبها من الذكاء الاصطناعي في شغلك اليومي: يحلل، يلخّص، يبحث في ملفاتك، يكتب، يقارن ويراجع، ويساعدك في القرار. تشبيه: مساعد ذكي وسريع جدًا — بس محتاج منك تشرحله المطلوب.", "Six “skills” you can ask AI for in daily work: analyse, summarise, search your files, write, compare and review, and support decisions. Picture a very smart, very fast assistant — who needs you to explain what you want."),
          L("why", "لأن معرفة القدرات بتخليك تشوف الفرص في شغلك: كل تقرير طويل فرصة تلخيص، وكل ملفين شبه بعض فرصة مقارنة، وكل قرار متكرر فرصة سيناريوهات.", "Knowing the capabilities lets you see opportunities at work: every long report is a summarising chance, every two similar files a comparison, every recurring decision a scenario exercise."),
        ],
        mech: [
          L("how", "السلسلة في الكتاب ترتيب منطقي: مش ممكن «يقترح» قبل ما «يقارن»، ولا يقارن قبل ما «يحلل»، ولا يحلل قبل ما «يجمع». كل حلقة معتمدة على جودة اللي قبلها.", "The book’s chain is a logical order: it can’t “suggest” before it “compares”, compare before it “analyses”, or analyse before it “collects”. Each link depends on the quality of the one before."),
          L("link", "قاعدة «جودة البيانات والسياق» هنا هي نفس قاعدة [[f1]] (النموذج بيكمّل بالأرجح لو السياق ناقص)، ونفسها اللي بتتحوّل بعدين لـ«الجودة أولًا» في [[y4]].", "The “data and context quality” rule here is the same as in [[f1]] (the model completes with the likely when context is missing), and it later becomes “quality first” in [[y4]]."),
        ],
        practice: [
          L("example", "**المالية**: مقارنة موازنتين وكشف البنود اللي اتغيّرت. **التسويق**: تلخيص 50 تعليق للعملاء لأهم 5 شكاوى. **المبيعات**: سيناريوهات الربع الجاي. **المصنع**: تحليل ملف توقفات كبير لاكتشاف نمط متكرر في وردية معيّنة.", "**Finance**: compare two budgets and flag changed items. **Marketing**: summarise 50 customer comments into the top 5 complaints. **Sales**: scenarios for next quarter. **Factory**: analyse a large stoppage file to find a pattern in one shift."),
          L("apply", "اكتب قائمة بخمس مهام من أسبوعك، وجنب كل مهمة اكتب أي قدرة من الست تناسبها. ابدأ بالمهمة الأصغر والأكتر تكرارًا.", "List five tasks from your week, and next to each write which of the six capabilities fits. Start with the smallest, most frequent one."),
        ],
        adv: [
          L("mistakes", "- تطلب «اقتراح» على طول من غير ما تدي بيانات للتحليل: اقتراح عام.\n- تدي بيانات فيها أخطاء وبعدين تثق في التحليل: نتيجة شكلها دقيق ومضمونها غلط.", "- Asking for a “suggestion” straight away with no data to analyse: a generic suggestion.\n- Feeding broken data then trusting the analysis: precise-looking, wrong-in-substance results."),
          L("whennot", "في «دعم القرار» القرار يفضل ليك: الأداة بتقترح وبتعرض البدائل والمخاطر، بس مش هتتحمل مسؤولية القرار ([[f5]]).", "In “decision support” the decision stays yours: the tool suggests and lays out options and risks but doesn’t own the decision ([[f5]])."),
        ],
      },
      case: { field: { ar: "المبيعات", en: "Sales" }, title: { ar: "تقرير مبيعات شهري من 3 فروع", en: "A monthly sales report from 3 branches" },
        steps: {
          problem: { ar: "مشرف مبيعات بيقضي حوالي يوم كامل كل شهر في دمج ملفات 3 فروع وكتابة ملخص للمدير.", en: "A sales supervisor spends about a full day each month merging 3 branch files and writing a summary for the manager." },
          old: { ar: "نسخ ولصق بالإيد، وبعدين قراءة الأرقام بالعين، وبعدين كتابة فقرة عامة: «المبيعات كويسة الشهر ده».", en: "Manual copy-paste, eyeballing numbers, then a vague paragraph: “sales were good this month”." },
          idea: { ar: "يمشي على سلسلة الكتاب: يجمع الملفات، يحلل الفروق، يختصر في ملخص تنفيذي، يقارن بالشهر اللي فات، ويقترح إجراءات.", en: "Follow the book’s chain: collect the files, analyse differences, summarise for executives, compare with last month, suggest actions." },
          steps: { ar: "1. يرفع الملفات التلاتة ويوصف أعمدتها.\n2. يطلب تحليل الفروق بين الفروع والشهور.\n3. يطلب ملخص من خمسة أسطر لمدير مشغول.\n4. يطلب تلات إجراءات مع سبب كل إجراء.", en: "1. Upload the three files and describe their columns.\n2. Ask for differences across branches and months.\n3. Ask for a five-line summary for a busy manager.\n4. Ask for three actions with the reason for each." },
          result: { ar: "مسودة جاهزة في حوالي ساعة بدل يوم (رقم افتراضي)، المشرف بيراجع أرقامها وبعدين يبعتها.", en: "A ready draft in about an hour instead of a day (hypothetical), whose numbers the supervisor checks before sending." },
          risks: { ar: "لو ملفات الفروع بأسماء أعمدة مختلفة الدمج ممكن يغلط؛ ولازم المشرف يطابق الإجماليات بنفسه قبل الإرسال.", en: "If branch files use different column names the merge can go wrong; the supervisor must match totals personally before sending." },
        } },
    },
    {
      id: "f4", unit: "u0", pages: [6], diff: 1, min: 7, scene: "chatagent", related: ["f1", "p1", "t1"], pre: ["f1"],
      title: { ar: "من السؤال لمساعدك الاستراتيجي", en: "From a question to your strategic assistant" },
      sum: { ar: "السياق والبرومبت وليه السياق مهم، وأدواتك، والانتقال من الشات التقليدي للمساعد الشخصي للوكيل الذكي.", en: "Context, prompt and why context matters; your tools; and the move from traditional chat to personal assistant to smart agent." },
      book: [
        bp(6, "قوة الذكاء الاصطناعي مش في الإجابة بس، لكن في قدرته على **فهم السياق، وتحليل المشكلة، وتقديم حلول عملية تناسب هدفك**.", "AI’s power isn’t only in answering but in its ability to **understand context, analyse the problem and offer practical solutions that fit your goal**."),
        bp(6, "**السياق (Context)**: كل المعلومات اللي بتديها للذكاء الاصطناعي عشان يفهم صورتك وهدفك والمشكلة كاملة.", "**Context**: all the information you give AI so it fully understands your situation, goal and problem."),
        bp(6, "**البرومبت (Prompt)**: جزء من السياق، وبيوضّح المهمة المطلوبة والطريقة اللي عاوز الإجابة بيها.", "**Prompt**: part of the context; it sets the task and how you want the answer."),
        bp(6, "**ليه السياق مهم**: كل ما السياق يبقى أوضح وأغنى، فهم النموذج يبقى أدق والنتيجة أحسن.", "**Why context matters**: the clearer and richer the context, the more precise the model’s understanding and the better the result."),
        bp(6, "أدواتك: **Claude** متميز في التحليل العميق والبرمجة وفهم الملفات الطويلة والمعقّدة، و**ChatGPT** مناسب للمحادثة والتحليل والكتابة والمشاريع المتنوعة.", "Your tools: **Claude** excels at deep analysis, coding and long complex files; **ChatGPT** suits conversation, analysis, writing and varied projects."),
        bp(6, "**الشات التقليدي**: بتسأل وبتاخد إجابة. **المساعد الشخصي**: بيفهمك وبيحفظ السياق وبيساعدك على طول. **الوكيل الذكي**: بيخطط وبيستخدم أدوات وبينفّذ مهام وبيتابع النتائج. **كل حاجة بتبدأ من سياق واضح وبرومبت ذكي.**", "**Traditional chat**: ask and get an answer. **Personal assistant**: understands you, remembers context, keeps helping. **Smart agent**: plans, uses tools, carries out tasks, follows up. **Everything starts with clear context and a smart prompt.**"),
      ],
      levels: {
        simple: [
          L("what", "**السياق** هو كل اللي بتقوله للأداة عن وضعك. و**البرومبت** هو الجزء اللي بيقوللها «اعمل ده بالطريقة دي». تشبيه: لما تكلف زميل جديد بمهمة، بتشرحله الخلفية (سياق) وبعدين المطلوب (برومبت).", "**Context** is everything you tell the tool about your situation. The **prompt** is the part that says “do this, this way”. Like briefing a new colleague: you explain the background (context) and then the task (prompt)."),
          L("why", "لأن نفس السؤال بسياقين مختلفين بيدي إجابتين مختلفتين تمامًا. والانتقال من «شات» لـ«مساعد» لـ«وكيل» هو في جوهره زيادة في السياق والقدرة على الفعل.", "Because the same question with two different contexts gives two completely different answers. And moving from “chat” to “assistant” to “agent” is really an increase in context and ability to act."),
        ],
        mech: [
          L("how", "- **الشات**: سؤال ← إجابة، من غير ذاكرة طويلة.\n- **المساعد**: بيحفظ سياقك (مشروعك، أسلوبك، ملفاتك) وبيبني عليه كل مرة.\n- **الوكيل**: بيتاخد هدف وأدوات (قراءة ملف، إرسال رسالة…) ويكرر: يخطط ← ينفّذ ← يشوف النتيجة ← يصحّح.", "- **Chat**: question → answer, no long memory.\n- **Assistant**: keeps your context (project, style, files) and builds on it each time.\n- **Agent**: given a goal and tools (read a file, send a message…), it loops: plan → act → observe → correct."),
          L("inside", "لما الكتاب بيقول إن النموذج «بيبني الوعي» حوالين مشروعك، المقصود إن كل اللي في نافذة السياق — تعليماتك وملفاتك والمحادثة اللي فاتت — بيأثر على كل كلمة بيولّدها ([[f1]]).", "When the book says the model “builds awareness” of your project, it means everything in the context window — your instructions, files and prior conversation — shapes every word it generates ([[f1]])."),
          L("link", "الدرس ده هو الجسر لـ[[p1]] (إزاي تكتب برومبت قوي) ولـ[[t1]] (الوكلاء والفريق الرقمي).", "This lesson bridges to [[p1]] (writing a strong prompt) and [[t1]] (agents and the digital team)."),
        ],
        practice: [
          L("example", "في التسويق: «اكتب منشور» (شات) بيدي منشور عام. مساعد عارف هوية العلامة والجمهور والحملة اللي فاتت بيكتب منشور مناسب. ووكيل مكلف بهدف «جهّز خطة منشورات الأسبوع» بيقرا التقويم والنتائج اللي فاتت وبيقترح خمسة منشورات وبيبعتهم للمراجعة.", "In marketing: “Write a post” (chat) gives a generic post. An assistant that knows the brand, audience and last campaign writes a fitting one. An agent tasked with “prepare this week’s posting plan” reads the calendar and past results, proposes five posts and sends them for review."),
          L("apply", "اكتب «ورقة سياق» من خمسة أسطر عن شغلك (القسم، الجمهور، البيانات المعتادة، الأسلوب، الممنوعات) واحفظها. الصقها في بداية أي محادثة مهمة — ده أول تحويل من الشات لمساعد.", "Write a five-line “context sheet” about your work (department, audience, usual data, style, don’ts) and keep it. Paste it at the start of any important chat — your first step from chat to assistant."),
        ],
        adv: [
          L("mistakes", "- تفتكر إن البرومبت لوحده يكفي: برومبت من غير سياق زي تكليف من غير خلفية.\n- تختار الأداة بالاسم مش بالمهمة: قارن على مهمتك إنت ([[m2]]).", "- Thinking the prompt alone is enough: a prompt without context is a task without a briefing.\n- Picking the tool by brand, not task: compare on your own task ([[m2]])."),
          L("whennot", "الوكيل مش الحل الأحسن دايمًا: لو المهمة سؤال واحد، الشات أسرع وأرخص وأوضح. استخدم الوكيل لما يكون في خطوات كتير وأدوات وحدود واضحة للتوقف.", "An agent isn’t always best: for a single question, chat is faster, cheaper and clearer. Use an agent when there are several steps, tools and clear stop limits."),
        ],
      },
    },
    {
      id: "f5", unit: "u0", pages: [41], diff: 1, min: 6, scene: "limits", related: ["f1", "p3", "p12"], pre: [],
      title: { ar: "حدود الذكاء الاصطناعي والاستخدام الواعي", en: "AI’s limits and wise use" },
      sum: { ar: "تمان حدود لازم تعرفها، وسلسلة الاستخدام الواعي: حدّد الهدف، اديله السياق، راجع، اتأكد من المصادر، خد القرار.", en: "Eight limits to know, and the wise-use chain: define the goal, give context, review, verify sources, decide." },
      book: [
        bp(41, "الذكاء الاصطناعي قوي جدًا، بس مش معصوم من الغلط. **أحسن استخدام ليه إنه يشتغل معاك، مش بدالك.**", "AI is very powerful but not infallible. **It works best with you, not instead of you.**"),
        bp(41, "ممكن يديك معلومة غلط بثقة، وممكن يفهم السؤال غلط لو السياق ناقص، وجودة النتيجة معتمدة على جودة البيانات والتعليمات.", "It can give wrong information confidently, misread a question when context is missing, and its result quality depends on data and instruction quality."),
        bp(41, "القرارات الحساسة محتاجة مراجعة بشرية قبل الاعتماد، ومش هيعرف بيانات شركتك إلا لو وفرتها له أو ربطته بمصادرها.", "Sensitive decisions need human review before adoption, and it doesn’t know your company’s data unless you provide it or connect it to the sources."),
        bp(41, "معلومات ممكن تكون قديمة أو ناقصة، وماتدخلش بيانات حساسة من غير ضوابط واضحة. **هو بيدعم القرار، بس مش بيتحمل مسؤولية القرار.**", "Some information may be outdated or incomplete, and sensitive data shouldn’t be entered without clear controls. **It supports the decision but doesn’t bear responsibility for it.**"),
        bp(41, "أحسن استخدام واعي: حدّد الهدف ← اديله السياق ← راجع النتيجة ← اتأكد من المصادر ← خد القرار.", "Wise use: define the goal → give context → review the result → verify sources → decide."),
        bp(41, "**أحسن نتيجة = إنسان بيفكر + بيانات كويسة + ذكاء اصطناعي.**", "**Best result = a thinking human + good data + AI.**"),
      ],
      levels: {
        simple: [
          L("what", "قائمة باللي الذكاء الاصطناعي **ما يقدرش** يضمنه: الصحة دايمًا، ومعرفة بياناتك، وحداثة المعلومات، وتحمّل مسؤولية القرار. تشبيه: مستشار سريع وذكي — بس إنت اللي بتوقّع.", "A list of what AI **can’t** guarantee: always being right, knowing your data, current information, and owning the decision. Think of a fast, smart adviser — but you are the one who signs."),
          L("why", "لأن غلطة واحدة بثقة في تقرير للإدارة ممكن تكلف أكتر من كل الوقت اللي وفّرته الأداة. معرفة الحدود هي اللي بتخليك تستخدم القوة بأمان.", "Because one confident mistake in a management report can cost more than all the time the tool saved. Knowing the limits lets you use the power safely."),
        ],
        mech: [
          L("how", "الحدود التمانية مش عشوائية؛ معظمها نتيجة مباشرة لطريقة عمل النموذج ([[f1]]): بيكمّل بالأرجح، وبيشوف بس اللي في نافذة السياق، واتعلّم من بيانات لها تاريخ توقف.", "The eight limits aren’t random; most follow directly from how the model works ([[f1]]): it completes with the likely, sees only what’s in the context window, and learned from data with a cut-off date."),
          L("link", "سلسلة الاستخدام الواعي نسخة مختصرة من قائمة التحقق في [[p12]] ومن برومبتات التحقق في [[p3]].", "The wise-use chain is a short version of the checklist in [[p12]] and the verification prompts in [[p3]]."),
        ],
        practice: [
          L("example", "محاسب بيطلب من الأداة حساب ضريبة فاتورة. بتديله رقم بثقة. قبل الاعتماد: بيتأكد من النسبة المعتمدة رسميًا، وبيحسب مثال واحد بالإيد، وبيطلب من الأداة تذكر الافتراضات اللي بنت عليها. ده الفرق بين الاستخدام والاعتماد الأعمى.", "An accountant asks the tool to compute a tax on an invoice and gets a confident number. Before adopting it: check the official rate, compute one example by hand, and ask the tool to state its assumptions. That’s the difference between using and blind reliance."),
          L("apply", "قبل ما تبعت أي مخرج من الذكاء الاصطناعي الأسبوع ده، طبّق السلسلة الخماسية عليه حرفيًا، وعلّم كل خطوة. وراجع سياسة شركتك قبل ما ترفع أي مستند حساس.", "Before sending any AI output this week, apply the five-step chain literally and tick each step. And check your company policy before uploading any sensitive document."),
        ],
        adv: [
          L("mistakes", "- «الأداة قالت كذا» كمبرر لقرار: المسؤولية ما بتتفوّض للأداة.\n- رفع بيانات العملاء أو الرواتب من غير ضوابط.\n- تفترض إن المعلومة حديثة لأنها مكتوبة بثقة.", "- “The tool said so” as a justification: responsibility can’t be delegated to a tool.\n- Uploading customer or salary data without controls.\n- Assuming information is current because it sounds confident."),
          L("whennot", "ما تستخدموش بدل القرار البشري في حاجات ليها أثر مالي أو تنظيمي، ولا في أي بيانات سياسة شركتك بتمنع رفعها. في الحالات دي استخدمه في التحضير بس، أو استخدم نموذج محلي ([[m3]]).", "Don’t use it in place of human decisions with financial or organisational impact, or with data your company forbids uploading. In those cases use it only for preparation, or use a local model ([[m3]])."),
        ],
      },
    },
  ]);
})(window.ACADEMY = window.ACADEMY || {});
