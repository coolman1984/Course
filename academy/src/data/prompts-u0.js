/* Prompt library — the introduction (pages 1–6, 41). All are academy additions built on the book’s ideas. */
(function () {
  const L = (ar, en) => ({ ar, en });
  const P = (o) => ACAD.P(Object.assign({ src: "add" }, o));

  P({ id: "u0-p-explain", lesson: "u0-model", pages: [2], cat: "learn", icon: "🔍",
    title: L("اشرح لي كيف وصلت لهذه الإجابة", "Explain how you reached this answer"),
    goal: L("أن ترى الافتراضات والمصادر خلف الإجابة بدل أن تقبلها كصندوق أسود.", "See the assumptions and sources behind an answer instead of accepting a black box."),
    text: L("أجبتني للتو عن: [الصق السؤال]. لا تغيّر الإجابة الآن. اشرح لي بلغة بسيطة: ما الافتراضات التي بنيت عليها؟ ما الجزء الذي تعرفه بثقة، وما الجزء الذي استنتجته أو خمّنته؟ وما المعلومة التي لو عرفتها منّي لتغيّرت إجابتك؟", "You just answered: [paste the question]. Don’t change the answer now. Explain in simple language: which assumptions did you build on? Which part do you know confidently, and which part did you infer or guess? And what information, if I gave it to you, would change your answer?"),
    tip: L("النموذج يتوقع الكلمة التالية من أنماط تعلّمها؛ هذا البرومبت يكشف أين كان التوقع ضعيفًا.", "The model predicts the next word from learned patterns; this prompt reveals where that prediction was weak.") });

  P({ id: "u0-p-map", lesson: "u0-journey", pages: [3, 4], cat: "decide", icon: "🗺️",
    title: L("ارسم رحلتي: من مهمة إلى نظام", "Map my journey: from a task to a system"),
    goal: L("قائمة بمهام عملك مصنفة: تحسين بالذكاء، أو أتمتة، أو ربط في نظام.", "Your work tasks sorted into: improve with AI, automate, or connect into a system."),
    text: L("أعمل في [وظيفتك وإدارتك]. هذه مهامي الأسبوعية: [اذكرها مع الوقت التقريبي لكل مهمة]. صنّفها في ثلاث مجموعات: (١) مهام يحسّنها الذكاء الاصطناعي كشريك تفكير، (٢) مهام متكررة قابلة للأتمتة، (٣) مهام مترابطة يُنقل بينها شيء يدويًا وتصلح لتكون نظامًا. لكل مهمة اذكر السبب في سطر، ثم اقترح أول مهمة أبدأ بها هذا الأسبوع ولماذا.", "I work as [your role and department]. These are my weekly tasks: [list them with rough time each]. Sort them into three groups: (1) tasks AI improves as a thinking partner, (2) repetitive tasks that can be automated, (3) linked tasks with manual handoffs that could become a system. Give a one-line reason for each, then suggest the first task to start this week and why."),
    tip: L("ابدأ بمهمة صغيرة متكررة؛ النجاح الأول أهم من الطموح الكبير.", "Start with a small recurring task; a first win beats a big ambition.") });

  P({ id: "u0-p-capabilities", lesson: "u0-capabilities", pages: [5], cat: "work", icon: "🧭",
    title: L("أين يفيدني الذكاء الاصطناعي في وظيفتي؟", "Where does AI help in my job?"),
    goal: L("أمثلة عملية من دورك أنت، مع حدود كل استخدام.", "Practical examples from your own role, with each use’s limits."),
    text: L("وظيفتي: [صفها في سطرين]. أعطني ستة استخدامات عملية للذكاء الاصطناعي في عملي اليومي موزعة على: الكتابة، والتحليل، والبحث، والتعلم، ودعم القرار، والأتمتة. لكل استخدام: مثال محدد من وظيفتي، وما الذي يجب أن أراجعه بنفسي قبل الاعتماد على النتيجة.", "My job: [describe it in two lines]. Give me six practical uses of AI in my daily work across: writing, analysis, research, learning, decision support and automation. For each: a specific example from my job, and what I must review myself before relying on the result."),
    tip: L("الشق الثاني (ماذا أراجع) هو ما يحوّل القائمة من حماس إلى خطة آمنة.", "The second half (what to review) turns the list from enthusiasm into a safe plan.") });

  P({ id: "u0-p-context", lesson: "u0-assistant", pages: [6], cat: "work", icon: "🗂️",
    title: L("عرّف مساعدك بسياقك مرة واحدة", "Brief your assistant on your context once"),
    goal: L("فقرة تعريف ثابتة تحوّل الشات العام إلى مساعد يفهمك.", "A fixed briefing paragraph that turns a generic chat into an assistant that knows you."),
    text: L("ساعدني أكتب فقرة تعريف ثابتة أضعها في بداية محادثاتي (أو في التعليمات الدائمة) حتى تفهم سياقي دون إعادة شرح. اسألني سؤالًا واحدًا في كل مرة عن: وظيفتي، وجمهوري المعتاد، والأدوات التي أستخدمها، والأسلوب الذي أفضّله في الإجابات، والأشياء التي لا أريدها أبدًا. ثم اكتب الفقرة في أقل من ١٥٠ كلمة.", "Help me write a fixed briefing paragraph to put at the start of my chats (or in standing instructions) so you understand my context without re-explaining. Ask me one question at a time about: my job, my usual audience, the tools I use, the answer style I prefer, and things I never want. Then write the paragraph in under 150 words."),
    tip: L("هذا هو الفرق بين «شات» يبدأ من الصفر و«مساعد» يتذكر سياقك.", "This is the difference between a chat that starts from zero and an assistant that remembers your context.") });

  P({ id: "u0-p-verify", lesson: "u0-limits", pages: [41], cat: "decide", icon: "🛡️",
    title: L("افحص إجابتك قبل أن أعتمدها", "Check your answer before I rely on it"),
    goal: L("قائمة بالادعاءات التي تحتاج تحققًا بشريًا، مرتبة حسب الخطورة.", "A list of claims that need human checking, ranked by risk."),
    text: L("راجع إجابتك السابقة كمدقق مستقل. استخرج كل رقم وتاريخ واسم ومصدر وادعاء محدد فيها. لكل عنصر: هل هو من معلومات قدمتُها أنا، أم من معرفتك العامة، أم استنتاج؟ ما درجة ثقتك (عالية/متوسطة/منخفضة)؟ وكيف أتحقق منه بنفسي في خطوة واحدة؟ رتّب العناصر بحيث يأتي أخطرها إن كان خاطئًا أولًا.", "Review your previous answer as an independent auditor. Extract every number, date, name, source and specific claim in it. For each item: did it come from information I gave, your general knowledge, or an inference? What’s your confidence (high/medium/low)? And how can I verify it myself in one step? Order the items so the most dangerous-if-wrong comes first."),
    tip: L("المراجعة البشرية تبقى إلزامية؛ هذا البرومبت يدلّك أين تبدأ {p41}.", "Human review remains mandatory; this prompt shows you where to start {p41}.") });
})();
