/* Unit 1 (part A) — Guide 1, pages 7–10: the equation, five elements, the strongest technique, mistakes,
   managing the conversation, and productivity prompts. */
(function () {
  const L = (ar, en) => ({ ar, en });

  ACAD.L({
    id: "u1-equation", unit: "u1", pages: [7], icon: "🧮", diff: 1, mins: 9, tags: ["prompting"],
    title: L("المعادلة الحاكمة: من «إجابة» إلى «نتيجة قابلة للتنفيذ»", "The governing equation: from an “answer” to an “actionable result”"),
    hook: L("هدف واضح + سياق كافٍ + طلب محدد + شكل النتيجة = نتيجة قابلة للتنفيذ.", "Clear goal + enough context + specific request + output format = actionable result."),
    book: L(`**الملخص التنفيذي** {p7}: معظم من يستخدمون الذكاء الاصطناعي اليوم يستخدمونه كمحرك بحث سريع: **سؤال، فإجابة، ثم نسيان**. وهذا أضعف استخدام ممكن. الاستخدام الحقيقي يبدأ حين تتوقف عن طلب «إجابة»، وتبدأ بطلب **نتيجة قابلة للتنفيذ**: خطة، أو قرار، أو أداة تعمل نيابة عنك.

**خريطة الدليل: أربعة أقسام وقفزة أخيرة**
- **١ الصياغة**: كيف تبني برومبتًا قويًا، والمعادلة التي تحكم كل طلب ناجح، والأخطاء التي تُفسد النتيجة.
- **٢ الإنتاجية**: تنظيم اليوم، والاجتماعات، والمهام، والكتابة المهنية، والمتابعة، وتحسين العمليات.
- **٣ الاستراتيجية**: الفهم العميق، والتشخيص، والأولويات، والسيناريوهات، وتحدي الأفكار، والتخطيط.
- **٤ العقل الثاني**: تحويل ملفاتك ومصادرك المبعثرة إلى نظام معرفة قابل للسؤال والتحليل.
- **القفزة الأخيرة · الأتمتة**: من معادلة في إكسل، إلى ماكرو مسجّل، إلى كود يكتبه الذكاء الاصطناعي، إلى عرض تقديمي جاهز للإدارة — سلسلة واحدة تبدأ ببيانات خام وتنتهي بقرار.

**المعادلة الحاكمة لكل برومبت ناجح:** ١ هدف واضح + ٢ سياق كافٍ + ٣ طلب محدد + ٤ شكل النتيجة = ★ نتيجة قابلة للتنفيذ.

**كيف تستخدم هذا الدليل عمليًا:** انسخ البرومبت كما هو، ثم غيّر ما بين الأقواس المربعة [ ] بمعطياتك الحقيقية، ثم أضف بياناتك أو موقفك الفعلي. **لا تحفظ البرومبت؛ افهم هدفه أولًا**، فتستطيع تعديله لأي موقف مشابه لاحقًا.`,
      `**Executive summary** {p7}: most people use AI today like a fast search engine: **question, answer, forget**. That is the weakest possible use. Real use begins when you stop asking for an “answer” and start asking for an **actionable result**: a plan, a decision, or a tool that works for you.

**The guide’s map: four sections and a final leap**
- **1 Phrasing**: how to build a strong prompt, the equation behind every successful request, and the mistakes that spoil results.
- **2 Productivity**: organising the day, meetings, tasks, professional writing, follow-up and process improvement.
- **3 Strategy**: deep understanding, diagnosis, priorities, scenarios, challenging ideas, planning.
- **4 Second brain**: turning your scattered files and sources into a knowledge system you can question and analyse.
- **The final leap · automation**: from an Excel formula, to a recorded macro, to code written by AI, to a presentation ready for management — one chain that starts with raw data and ends with a decision.

**The governing equation of every successful prompt:** 1 clear goal + 2 enough context + 3 specific request + 4 output format = ★ actionable result.

**How to use this guide in practice:** copy the prompt as is, replace what’s inside the square brackets [ ] with your real details, then add your data or actual situation. **Don’t memorise the prompt; understand its goal first**, so you can adapt it to any similar situation later.`),
    levels: {
      simple: L(`تخيّل أنك تطلب من مطعم: «عايز أكل». سيأتيك أي طبق. لكن لو قلت: «عايز غداء خفيف لشخصين، بدون لحوم، خلال ٢٠ دقيقة، في علب للتيك أواي»، ستحصل على ما تحتاجه بالضبط.

المعادلة تعمل بنفس الطريقة:
- **هدف واضح**: ماذا تريد أن تحقق؟
- **سياق كافٍ**: ما الخلفية التي يجب أن يعرفها؟
- **طلب محدد**: ما المطلوب بالضبط؟
- **شكل النتيجة**: بأي شكل تريد استلامها؟

**الفكرة الكبيرة:** لا تطلب «إجابة» تقرؤها ثم تنساها؛ اطلب **شيئًا تستخدمه**: خطة، رسالة جاهزة، جدول قرار.`,
        `Imagine telling a restaurant: “I want food.” You’ll get any dish. But say: “a light lunch for two, no meat, within 20 minutes, in takeaway boxes,” and you get exactly what you need.

The equation works the same way:
- **Clear goal**: what do you want to achieve?
- **Enough context**: what background must it know?
- **Specific request**: what exactly is needed?
- **Output format**: in what shape do you want it?

**The big idea:** don’t ask for an “answer” you read and forget; ask for **something you’ll use**: a plan, a ready message, a decision table.`),
      mech: L(`## لماذا «جمع» العناصر وليس اختيار واحد منها؟
كل عنصر يغلق بابًا مختلفًا للتخمين:
- الهدف يحدد **ماذا يُعتبر نجاحًا**.
- السياق يقلل **الافتراضات الصامتة** (تذكّر: النموذج يملأ الفراغ بالأكثر شيوعًا، راجع [[l:u0-model|كيف يعمل النموذج]]).
- الطلب المحدد يمنع **التشتت** إلى مواضيع جانبية.
- شكل النتيجة يوفر عليك **جولة تعديل كاملة** {p7}.

غياب أي عنصر لا يجعل النتيجة «أقل بقليل»؛ بل قد يجعلها **في اتجاه آخر تمامًا**.

## لماذا يتدرج الدليل في خمس مراحل؟
لأن كل مرحلة تحتاج مهارة التي قبلها: لن تدير يومك بالذكاء الاصطناعي قبل أن تصوغ طلبًا جيدًا، ولن تبني عقلًا ثانيًا قبل أن تعرف كيف تسأل، ولن تؤتمت قبل أن تصف العملية بدقة.`,
        `## Why “add” the elements instead of picking one?
Each element closes a different door to guessing:
- The goal defines **what counts as success**.
- Context reduces **silent assumptions** (remember: the model fills gaps with the most common option; see [[l:u0-model|how the model works]]).
- A specific request prevents **drifting** into side topics.
- The output format saves you **a whole editing round** {p7}.

Missing one element doesn’t make the result “slightly worse”; it can send it **in a different direction entirely**.

## Why does the guide climb in five stages?
Because each stage needs the previous skill: you won’t run your day with AI before phrasing a good request, won’t build a second brain before you know how to ask, and won’t automate before you can describe the process precisely.`),
      practice: L(`## نفس المهمة قبل وبعد المعادلة
**قبل:** «اكتب لي عن المرتجعات.»

**بعد:** «**هدفي** تقليل المرتجعات في فرع المنصورة. **السياق:** المرتجعات زادت من ٣٪ إلى ٧٪ خلال شهرين، وأغلبها في منتج واحد. **المطلوب:** اقترح ٥ أسباب محتملة وكيف أتحقق من كل سبب. **الشكل:** جدول من ثلاثة أعمدة (السبب، الدليل المطلوب، طريقة التحقق).»

الأولى تعطيك مقالًا عامًا عن المرتجعات. الثانية تعطيك **خطة تحقيق** تبدأ بها غدًا.

## طبّق الآن
خذ آخر طلب كتبته للذكاء الاصطناعي. ما العنصر الناقص فيه من الأربعة؟ أعد كتابته، ثم استخدم [[lab:prompt-builder|مختبر بناء الطلب]] لفحصه.`,
        `## The same task before and after the equation
**Before:** “Write to me about returns.”

**After:** “**My goal** is to reduce returns at the Mansoura branch. **Context:** returns rose from 3% to 7% in two months, mostly on one product. **Request:** suggest 5 possible causes and how to check each. **Format:** a three-column table (cause, evidence needed, how to check).”

The first gives a generic essay about returns. The second gives you an **investigation plan** you can start tomorrow.

## Apply now
Take the last request you wrote to an AI. Which of the four elements was missing? Rewrite it, then check it with [[lab:prompt-builder|the request-builder lab]].`),
      adv: L(`## حدود المعادلة
- **ليست قالبًا جامدًا**: في الطلبات البسيطة («ترجم هذه الجملة») يكفي طلب محدد. المعادلة للطلبات المهمة.
- **السياق الكافي ≠ السياق الأطول**: المعلومات غير المتعلقة تشتت. أعطِ ما يغيّر الإجابة فقط.
- **«قابلة للتنفيذ» تحتاج حكمك**: النتيجة قد تبدو قابلة للتنفيذ لكنها مبنية على افتراض خاطئ؛ لذلك تأتي بعدها [[l:u1-ask|تقنية «اسألني عن الناقص»]] و[[l:u1-mistakes|برومبت التحقق]].

## لماذا «لا تحفظ البرومبت»؟
لأن البرومبت المحفوظ ينكسر عند أول موقف مختلف. أما من فهم **لماذا** كل سطر موجود، فيستطيع بناء برومبت جديد لأي موقف. هذه نفس فكرة الكتاب عن [[l:u1-macro|البرومبت الذهبي للكود]]: كل سطر فيه يمنع نوعًا معروفًا من الفشل {p14}.`,
        `## Limits of the equation
- **It isn’t a rigid template**: for simple requests (“translate this sentence”) a specific request is enough. The equation is for important requests.
- **Enough context ≠ longest context**: irrelevant information distracts. Give only what changes the answer.
- **“Actionable” needs your judgement**: a result may look actionable yet rest on a wrong assumption; hence [[l:u1-ask|the “ask me what’s missing” technique]] and [[l:u1-mistakes|the verification prompt]] that follow.

## Why “don’t memorise the prompt”?
Because a memorised prompt breaks at the first different situation. Someone who understands **why** each line exists can build a new prompt for any situation. Same idea as the book’s [[l:u1-macro|golden code prompt]]: every line prevents a known type of failure {p14}.`),
    },
    card: {
      what: L("هدف واضح + سياق كافٍ + طلب محدد + شكل النتيجة = نتيجة قابلة للتنفيذ {p7}.", "Clear goal + enough context + specific request + output format = actionable result {p7}."),
      why: L("لأن «سؤال، فإجابة، ثم نسيان» أضعف استخدام ممكن.", "Because “question, answer, forget” is the weakest possible use."),
      how: L("كل عنصر يغلق بابًا للتخمين: النجاح، الافتراضات، التشتت، جولة التعديل.", "Each element closes a door to guessing: success, assumptions, drift, editing rounds."),
      inside: L("السياق والقيود يوجّهان احتمالات النموذج نحو موقفك أنت.", "Context and constraints steer the model’s probabilities toward your situation."),
      relation: L("تطبيق مباشر لفكرة السياق في المدخل، ومقدمة للعناصر الخمسة.", "A direct application of context from the opening, leading into the five elements."),
      example: L("«اكتب عن المرتجعات» مقابل جدول أسباب ودليل وطريقة تحقق.", "“Write about returns” versus a table of causes, evidence and checks."),
      apply: L("أعد كتابة آخر طلب لك بالعناصر الأربعة.", "Rewrite your last request with the four elements."),
      mistakes: L("حفظ البرومبتات بدل فهم هدفها، وطلب «إجابة» بدل «نتيجة».", "Memorising prompts instead of understanding them; asking for an “answer” not a “result”."),
      check: L("هل تحدد العنصر الناقص في أي طلب تقرؤه؟", "Can you spot the missing element in any request you read?"),
      next: L("العناصر الخمسة لأي طلب ناجح.", "The five elements of any successful request."),
    },
    keys: L(["أضعف استخدام: سؤال، فإجابة، ثم نسيان {p7}.", "اطلب نتيجة قابلة للتنفيذ: خطة، قرار، أداة.", "المعادلة: هدف واضح + سياق كافٍ + طلب محدد + شكل النتيجة.", "الدليل يتدرج: صياغة ← إنتاجية ← استراتيجية ← عقل ثانٍ ← أتمتة.", "لا تحفظ البرومبت؛ افهم هدفه لتعدّله لأي موقف."],
      ["The weakest use: question, answer, forget {p7}.", "Ask for an actionable result: a plan, a decision, a tool.", "The equation: clear goal + enough context + specific request + output format.", "The guide climbs: phrasing → productivity → strategy → second brain → automation.", "Don’t memorise the prompt; understand its goal so you can adapt it."]),
    scene: "equation", lab: "prompt-builder",
    quick: [
      { q: L("أي العناصر التالية ليس جزءًا من «المعادلة الحاكمة» في الكتاب؟", "Which of these is NOT part of the book’s “governing equation”?"), opts: L(["هدف واضح", "سياق كافٍ", "أحدث نموذج متاح", "شكل النتيجة"], ["A clear goal", "Enough context", "The newest model available", "Output format"]), a: 2, why: L("المعادلة: هدف واضح + سياق كافٍ + طلب محدد + شكل النتيجة {p7}. الفرق في الطلب لا في الأداة.", "The equation: clear goal + enough context + specific request + output format {p7}. The difference lies in the request, not the tool.") },
      { q: L("ماذا ينصحك الكتاب أن تفعل بالبرومبتات الجاهزة؟", "What does the book advise doing with ready prompts?"), opts: L(["احفظها حرفيًا", "انسخها، وغيّر ما بين الأقواس بمعطياتك، وافهم هدفها", "استخدمها بدون تعديل", "لا تستخدمها أبدًا"], ["Memorise them word for word", "Copy them, replace the bracketed parts with your details, and understand their goal", "Use them unchanged", "Never use them"]), a: 1, why: L("«لا تحفظ البرومبت؛ افهم هدفه أولًا، فتستطيع تعديله لأي موقف مشابه لاحقًا» {p7}.", "“Don’t memorise the prompt; understand its goal first, so you can adapt it to any similar situation later” {p7}.") },
    ],
    related: ["u1-five", "u1-ask", "u0-assistant"], req: ["u0-assistant"], terms: ["prompt", "context", "actionable-result"],
  });

  ACAD.L({
    id: "u1-five", unit: "u1", pages: [7], icon: "🧩", diff: 1, mins: 10, tags: ["prompting"],
    title: L("العناصر الخمسة لأي طلب ناجح", "The five elements of any successful request"),
    hook: L("الفرق بين نتيجة عامة لا تفيد ونتيجة تغيّر قرارك ليس في الأداة، بل في خمسة عناصر تضعها قبل الإرسال.", "The gap between a useless generic result and one that changes your decision isn’t the tool; it’s five elements you add before sending."),
    book: L(`**القسم الأول — كيف تبني برومبتًا قويًا** {p7}. الفرق بين نتيجة عامة لا تفيد ونتيجة تغيّر قرارك **ليس في الأداة**، بل في خمسة عناصر تضعها في الطلب قبل أن ترسله:

| العنصر | ماذا يعني؟ |
|---|---|
| ١ الهدف | ماذا تريد بالضبط؟ لا «ساعدني في التقرير»، بل «أريد معرفة سبب انخفاض المبيعات». |
| ٢ السياق | ما الخلفية والوضع الحالي؟ الأداة لا تعرف عن عملك شيئًا إلا ما تخبرها به أنت. |
| ٣ الجمهور | لمن هذه النتيجة؟ شرح لمبتدئ يختلف جذريًا عن ملخص لمدير تنفيذي مشغول. |
| ٤ شكل النتيجة | نقاط، أم جدول، أم خطة، أم رسالة؟ تحديد الشكل يوفر عليك جولة تعديل كاملة. |
| ٥ القيود والأمثلة | الميزانية، والوقت المتاح، والأسلوب المطلوب، وأي مثال على ما تريده أو ما لا تريده. القيد الواضح يمنع اقتراحات غير قابلة للتنفيذ أصلًا في ظروفك. |`,
      `**Section 1 — how to build a strong prompt** {p7}. The difference between a generic, useless result and one that changes your decision **isn’t the tool**; it is five elements you put into the request before sending it:

| Element | What it means |
|---|---|
| 1 Goal | What exactly do you want? Not “help me with the report” but “I want to know why sales dropped”. |
| 2 Context | What is the background and current situation? The tool knows nothing about your work except what you tell it. |
| 3 Audience | Who is the result for? An explanation for a beginner differs radically from a summary for a busy executive. |
| 4 Output format | Bullets, a table, a plan or a message? Choosing the format saves a whole editing round. |
| 5 Constraints & examples | Budget, available time, required style, and any example of what you want or don’t want. A clear constraint prevents suggestions you could never carry out in your circumstances. |`),
    levels: {
      simple: L(`فكّر في الطلب كأنه **تكليف لزميل جديد**. لو قلت له «جهّز تقرير»، سيسألك خمسة أسئلة:
1. **عايز توصل لإيه؟** (الهدف)
2. **إيه اللي حصل لحد دلوقتي؟** (السياق)
3. **التقرير لمين؟** (الجمهور)
4. **عايزه شكله إيه؟** (شكل النتيجة)
5. **فيه حاجة ممنوعة أو حدود؟** (القيود)

الذكاء الاصطناعي لا يسأل هذه الأسئلة دائمًا؛ **يخمّن الإجابات**. والعناصر الخمسة هي ببساطة أن تجيب عن الأسئلة الخمسة قبل أن تُطرح.`,
        `Think of a request as **briefing a new colleague**. Say “prepare a report” and they’ll ask five questions:
1. **What are you trying to achieve?** (goal)
2. **What has happened so far?** (context)
3. **Who is it for?** (audience)
4. **What should it look like?** (format)
5. **Any limits or no-gos?** (constraints)

AI doesn’t always ask these; it **guesses the answers**. The five elements simply mean answering the five questions before they’re asked.`),
      mech: L(`## ماذا يتغير داخل النتيجة مع كل عنصر؟
- **الهدف** يغيّر **محور** الإجابة: «سبب انخفاض المبيعات» يقود إلى تحليل أسباب، و«تقرير المبيعات» يقود إلى وصف أرقام.
- **السياق** يغيّر **المادة الخام**: بدونه يستخدم النموذج معرفة عامة، ومعه يستخدم واقعك.
- **الجمهور** يغيّر **المستوى واللغة والطول**: المدير التنفيذي يريد القرار أولًا، والمبتدئ يريد الشرح أولًا.
- **الشكل** يغيّر **البنية**: الجدول يجبر على المقارنة، والخطة تجبر على خطوات ومسؤولين.
- **القيود** تغيّر **مساحة الحلول**: «بدون ميزانية إضافية» تحذف نصف الاقتراحات غير الواقعية.

## لماذا الأمثلة قوية جدًا؟
المثال يختصر صفحة من الشرح: «أريد رسالة بهذا الأسلوب: …» يوجّه النموذج أدق من أي وصف للأسلوب.`,
        `## What each element changes in the result
- **Goal** changes the **focus**: “why sales dropped” leads to cause analysis; “sales report” leads to describing numbers.
- **Context** changes the **raw material**: without it the model uses general knowledge; with it, your reality.
- **Audience** changes **level, language and length**: an executive wants the decision first; a beginner wants the explanation first.
- **Format** changes **structure**: a table forces comparison; a plan forces steps and owners.
- **Constraints** change the **solution space**: “no extra budget” removes half the unrealistic suggestions.

## Why are examples so powerful?
An example replaces a page of explanation: “I want a message in this style: …” steers the model more precisely than any description of style.`),
      practice: L(`## العناصر الخمسة في ثلاثة أقسام
| القسم | الطلب الضعيف | العنصر الذي يصنع الفرق |
|---|---|---|
| الموارد البشرية | «اكتب إعلان وظيفة» | **الجمهور**: «لخريجين جدد في الصعيد، بلغة بسيطة ومشجعة» |
| المالية | «حلل المصروفات» | **الهدف**: «أريد معرفة أي بند تجاوز الموازنة بأكثر من ١٠٪ ولماذا» |
| المصنع | «اقترح تحسينات للصيانة» | **القيود**: «بدون إيقاف الخط أكثر من ساعتين أسبوعيًا، وبدون توظيف» |

## تمرين
خذ مهمة متكررة عندك واكتبها بالعناصر الخمسة في [[lab:prompt-builder|مختبر بناء الطلب]]. لاحظ أي عنصر كان الأصعب في كتابته: غالبًا هو العنصر الذي كنت تتركه للتخمين.`,
        `## The five elements in three departments
| Department | Weak request | The element that makes the difference |
|---|---|---|
| HR | “Write a job ad” | **Audience**: “for fresh graduates in Upper Egypt, in simple, encouraging language” |
| Finance | “Analyse expenses” | **Goal**: “I want to know which line exceeded budget by more than 10% and why” |
| Factory | “Suggest maintenance improvements” | **Constraints**: “without stopping the line more than two hours a week, and no hiring” |

## Exercise
Take a repetitive task and write it with the five elements in [[lab:prompt-builder|the request-builder lab]]. Notice which element was hardest to write: it’s usually the one you used to leave to guesswork.`),
      adv: L(`## أخطاء متقدمة في العناصر الخمسة
- **هدفان في طلب واحد**: «حلل المبيعات واكتب خطة تسويق» يُضعف الاثنين. قسّمها لطلبين متتابعين، كما يفعل الكتاب في [[l:u3-stages|مراحل لوحة المعلومات]] حيث «دمج كل المتطلبات في طلب واحد» من الأخطاء الشائعة {p25}.
- **سياق يحتوي استنتاجك**: «المبيعات انخفضت بسبب المنافس، حلل السبب» يدفع النموذج لتأكيد رأيك. اذكر الحقائق، ودع الاستنتاج للتحليل، أو اطلب صراحة [[l:u1-scenarios|اختبار فكرتك]].
- **قيد يناقض الهدف**: «تحليل عميق في ثلاثة أسطر». عندما تتعارض القيود، حدد أيها أهم.
- **البيانات الحساسة داخل السياق**: الجمهور والقيود لا تبرر رفع بيانات شخصية؛ أخفِ الأسماء أو استخدم بيانات تجريبية {p41}.`,
        `## Advanced mistakes with the five elements
- **Two goals in one request**: “analyse sales and write a marketing plan” weakens both. Split them into two sequential requests, as the book does in [[l:u3-stages|the dashboard stages]], where “merging all requirements into one request” is a common mistake {p25}.
- **Context that contains your conclusion**: “sales dropped because of the competitor; analyse the cause” pushes the model to confirm your view. State facts and let analysis conclude, or explicitly ask to [[l:u1-scenarios|test your idea]].
- **A constraint that contradicts the goal**: “a deep analysis in three lines”. When constraints conflict, say which matters more.
- **Sensitive data inside the context**: audience and constraints don’t justify uploading personal data; mask names or use sample data {p41}.`),
    },
    card: {
      what: L("الهدف، السياق، الجمهور، شكل النتيجة، القيود والأمثلة {p7}.", "Goal, context, audience, output format, constraints & examples {p7}."),
      why: L("لأن الأداة لا تعرف عن عملك شيئًا إلا ما تخبرها به.", "Because the tool knows nothing about your work except what you tell it."),
      how: L("كل عنصر يجيب سؤالًا كان النموذج سيخمّن إجابته.", "Each element answers a question the model would otherwise guess."),
      inside: L("العناصر تغيّر محور الإجابة ومادتها ومستواها وبنيتها ومساحة حلولها.", "The elements change the answer’s focus, material, level, structure and solution space."),
      relation: L("تفصيل للمعادلة الحاكمة بإضافة الجمهور والقيود.", "Expands the governing equation by adding audience and constraints."),
      example: L("«أريد معرفة سبب انخفاض المبيعات» بدل «ساعدني في التقرير» {p7}.", "“I want to know why sales dropped” instead of “help me with the report” {p7}."),
      apply: L("قبل أي طلب مهم، اكتب سطرًا لكل عنصر.", "Before any important request, write one line per element."),
      mistakes: L("هدفان في طلب واحد، أو وضع استنتاجك داخل السياق.", "Two goals in one request, or putting your conclusion inside the context."),
      check: L("هل تستطيع تصنيف كل جملة في طلبك إلى أحد العناصر الخمسة؟", "Can you tag each sentence of your request with one of the five elements?"),
      next: L("أقوى تقنية في الدليل: «اسألني عن الناقص».", "The strongest technique in the guide: “ask me what’s missing”."),
    },
    keys: L(["الفرق في خمسة عناصر، لا في الأداة {p7}.", "الهدف: محدد وقابل للقياس، لا «ساعدني».", "السياق: الأداة لا تعرف إلا ما تخبرها به.", "الجمهور والشكل: يوفران جولة تعديل كاملة.", "القيود والأمثلة: تمنع اقتراحات غير قابلة للتنفيذ."],
      ["The difference lies in five elements, not the tool {p7}.", "Goal: specific and measurable, not “help me”.", "Context: the tool only knows what you tell it.", "Audience and format: save a whole editing round.", "Constraints and examples: prevent unworkable suggestions."]),
    lab: "prompt-builder", prompts: ["u1-p-improve", "u1-p-five-template", "u1-p-audience"],
    quick: [
      { q: L("«ساعدني في التقرير» — ما العنصر الأضعف هنا؟", "“Help me with the report” — which element is weakest here?"), opts: L(["الجمهور", "الهدف", "القيود", "شكل النتيجة"], ["Audience", "Goal", "Constraints", "Output format"]), a: 1, why: L("الكتاب يستخدم هذا المثال بالضبط للهدف: لا «ساعدني في التقرير»، بل «أريد معرفة سبب انخفاض المبيعات» {p7}. (بقية العناصر ناقصة أيضًا، لكن الهدف هو الأساس.)", "The book uses this exact example for the goal: not “help me with the report” but “I want to know why sales dropped” {p7}. (The others are missing too, but the goal comes first.)") },
      { q: L("طلبت خطة تسويق فجاءتك اقتراحات تحتاج ميزانية لا تملكها. أي عنصر كان سيمنع ذلك؟", "You asked for a marketing plan and got ideas needing budget you don’t have. Which element would have prevented that?"), opts: L(["الجمهور", "القيود", "شكل النتيجة", "لا شيء، هذا طبيعي"], ["Audience", "Constraints", "Output format", "Nothing, that’s normal"]), a: 1, why: L("القيد الواضح (الميزانية والوقت) يمنع اقتراحات غير قابلة للتنفيذ أصلًا في ظروفك {p7}.", "A clear constraint (budget, time) prevents suggestions that can’t be carried out in your circumstances {p7}.") },
    ],
    related: ["u1-equation", "u1-ask", "u1-mistakes"], req: ["u1-equation"], terms: ["prompt", "context", "audience", "constraints"],
  });

  ACAD.L({
    id: "u1-ask", unit: "u1", pages: [7], icon: "⭐", diff: 1, mins: 8, tags: ["prompting"],
    title: L("أقوى تقنية في الدليل كله: «اسألني عن الناقص»", "The strongest technique in the guide: “ask me what’s missing”"),
    hook: L("جملة واحدة في بداية كل طلب مهم تعالج ثلاث مشكلات دفعة واحدة.", "One sentence at the start of every important request fixes three problems at once."),
    book: L(`**أقوى تقنية في هذا الدليل كله — اجعلها بداية كل طلب مهم** {p7}:

> قبل أن تعطيني الإجابة، اسألني عن أي معلومة ناقصة تحتاجها. وبعد أن أجيبك، أعطني أبسط حل ممكن، واشرحه لي ببساطة، واختبر الحالات الاستثنائية.

**لماذا هذه الجملة بالذات؟** لأنها تعالج ثلاث مشكلات دفعة واحدة:
- **«اسألني عن الناقص»** يجبر الأداة على كشف افتراضاتها بدل تخمينها بصمت.
- **«أبسط حل ممكن»** يمنع التعقيد الذي لن تستطيع صيانته أو فهمه لاحقًا.
- **«اختبر الحالات الاستثنائية»** يكشف الأخطاء قبل أن تصل إلى تقرير الإدارة، لا بعده.`,
      `**The strongest technique in this whole guide — make it the start of every important request** {p7}:

> Before you give me the answer, ask me about any missing information you need. After I answer, give me the simplest possible solution, explain it to me simply, and test the edge cases.

**Why this sentence in particular?** Because it fixes three problems at once:
- **“Ask me what’s missing”** forces the tool to reveal its assumptions instead of silently guessing them.
- **“The simplest possible solution”** prevents complexity you won’t be able to maintain or understand later.
- **“Test the edge cases”** reveals errors before they reach the management report, not after.`),
    levels: {
      simple: L(`تخيّل نجّارًا ممتازًا تقول له: «اعملّي دولاب». لو بدأ فورًا، سيصنع دولابًا جميلًا… لكن ربما بمقاس لا يدخل غرفتك.

النجّار الأفضل يسألك أولًا: «المقاس كام؟ لونه إيه؟ هيتحط فين؟». ثم يصنع **أبسط** تصميم يحقق المطلوب، ثم **يجرّب** الأبواب والأدراج قبل التسليم.

الجملة الذهبية تجعل الذكاء الاصطناعي يتصرف كهذا النجّار: **يسأل، ثم يبسّط، ثم يختبر**.`,
        `Imagine an excellent carpenter you tell: “build me a wardrobe.” If they start immediately, you get a beautiful wardrobe… that may not fit your room.

A better carpenter asks first: “What size? What colour? Where will it go?” Then builds the **simplest** design that does the job, then **tests** the doors and drawers before delivery.

The golden sentence makes AI behave like that carpenter: **ask, then simplify, then test**.`),
      mech: L(`## ثلاث آليات في جملة واحدة
1. **كشف الافتراضات**: النموذج يملأ أي فراغ في طلبك بالاحتمال الأكثر شيوعًا (راجع [[l:u0-model|كيف يعمل النموذج]]). عندما تطلب منه السؤال أولًا، تتحول هذه الافتراضات الصامتة إلى **أسئلة ظاهرة** تجيب عنها أنت بمعلومات حقيقية.
2. **الحد من التعقيد**: النماذج تميل أحيانًا لحلول «مبهرة» متعددة الخطوات. طلب «أبسط حل» يغيّر معيار النجاح من «الأشمل» إلى «الأسهل صيانة».
3. **الاختبار المبكر**: «اختبر الحالات الاستثنائية» يجعل النموذج يفكر في: الخلية الفارغة، والقسمة على صفر، والبيانات المكررة، قبل أن تصادفها أنت في الملف الحقيقي.

## لماذا «بعد أن أجيبك»؟
لأن الترتيب مهم: أسئلة ← إجاباتك ← حل. لو طلبت الحل والأسئلة معًا ستحصل على حل مبني على تخمين، ثم أسئلة لا فائدة منها.`,
        `## Three mechanisms in one sentence
1. **Exposing assumptions**: the model fills any gap with the most common option (see [[l:u0-model|how the model works]]). Asking it to question you first turns silent assumptions into **visible questions** you answer with real information.
2. **Limiting complexity**: models sometimes favour “impressive” multi-step solutions. Asking for “the simplest solution” changes the success criterion from “most complete” to “easiest to maintain”.
3. **Early testing**: “test the edge cases” makes the model consider blank cells, division by zero and duplicates before you meet them in the real file.

## Why “after I answer”?
Because order matters: questions → your answers → solution. Ask for both at once and you get a solution built on guesses, then pointless questions.`),
      practice: L(`## مثال حقيقي الشكل
**الطلب:** «قبل أن تعطيني الإجابة، اسألني عن أي معلومة ناقصة… أريد طريقة لحساب حوافز فريق المبيعات الشهرية.»

**أسئلة متوقعة من النموذج:** هل الحافز على المبيعات أم على الربح؟ هل هناك حد أدنى للتحقيق؟ كيف تعاملون المرتجعات؟ هل يختلف الهدف من فرع لآخر؟

كل سؤال من هذه كان سيُجاب **بتخمين صامت** لو لم تستخدم الجملة. سؤال المرتجعات وحده قد يغيّر الحافز بنسبة كبيرة.

## متى تستخدمها؟
- عند أي طلب يترتب عليه **قرار** أو **رقم رسمي** أو **كود** سيعمل على بياناتك.
- لا تحتاجها في المهام البسيطة جدًا (إعادة صياغة جملة).`,
        `## A realistic example
**Request:** “Before you answer, ask me about any missing information… I want a way to calculate the sales team’s monthly incentives.”

**Expected questions from the model:** Is the incentive on sales or profit? Is there a minimum threshold? How do you treat returns? Does the target differ by branch?

Each of these would have been answered by a **silent guess** without the sentence. The returns question alone could change the incentive substantially.

## When to use it
- For any request that leads to a **decision**, an **official number** or **code** that will run on your data.
- You don’t need it for very simple tasks (rephrasing a sentence).`),
      adv: L(`## حدود التقنية
- **الأسئلة قد تكون كثيرة أو عامة**: اطلب «أهم ٣–٥ أسئلة فقط»، كما يفعل الكتاب في مرحلة تحديد الغرض للوحة المعلومات {p24}.
- **«أبسط حل» قد يُفهم كحل ناقص**: البساطة لا تعني تجاهل الحالات الاستثنائية؛ لذلك الجملة تجمع بينهما.
- **«اختبر» لا تعني «ضمنت»**: النموذج يقترح اختبارات ويحاكيها نصيًا، لكن التشغيل الحقيقي على نسخة من بياناتك هو الاختبار الفعلي {p8, p16}.

## نفس الفكرة في كل الكتاب
الجملة تتكرر بأشكال مختلفة: «اسألني عن أي معلومة ناقصة» في برومبت التأسيس للتطبيق {p31}، و«إن كانت هناك معلومات ناقصة فاذكرها قبل أن تبدأ» في البرومبتات الشاملة {p10, p11}، و«خمس حالات اختبار» في البرومبت الذهبي للكود {p14}. هذا هو **الخيط الجامع** للدليل.`,
        `## Limits of the technique
- **Questions may be many or generic**: ask for “only the 3–5 most important questions”, as the book does in the dashboard purpose stage {p24}.
- **“Simplest solution” can be read as incomplete**: simplicity doesn’t mean ignoring edge cases; the sentence pairs them deliberately.
- **“Test” doesn’t mean “guaranteed”**: the model proposes tests and simulates them in text; running on a copy of your data is the real test {p8, p16}.

## The same idea across the book
The sentence recurs in different forms: “ask me about any missing information” in the app foundation prompt {p31}, “if information is missing, state it before you start” in the master prompts {p10, p11}, and “five test cases” in the golden code prompt {p14}. It is the guide’s **connecting thread**.`),
    },
    card: {
      what: L("جملة افتتاحية: اسألني عن الناقص، ثم أبسط حل، واشرحه، واختبر الحالات الاستثنائية {p7}.", "An opening sentence: ask what’s missing, then the simplest solution, explained, with edge cases tested {p7}."),
      why: L("لأنها تعالج ثلاث مشكلات: الافتراضات الصامتة، والتعقيد، والأخطاء المتأخرة.", "Because it fixes three problems: silent assumptions, complexity, late errors."),
      how: L("أسئلة ← إجاباتك ← حل بسيط ← اختبار الحالات الحدية.", "Questions → your answers → simple solution → edge-case tests."),
      inside: L("تحوّل التخمين الداخلي للنموذج إلى أسئلة ظاهرة تجيبها بمعلومات حقيقية.", "It turns the model’s internal guessing into visible questions you answer with facts."),
      relation: L("تكمل العناصر الخمسة: تكشف العنصر الذي نسيته.", "Completes the five elements by exposing the one you forgot."),
      example: L("حساب الحوافز: سؤال «كيف تعاملون المرتجعات؟» يغيّر النتيجة.", "Incentive calculation: “how do you treat returns?” changes the result."),
      apply: L("ابدأ بها أي طلب يترتب عليه قرار أو رقم رسمي أو كود.", "Start any request leading to a decision, official number or code with it."),
      mistakes: L("طلب الحل والأسئلة معًا، أو اعتبار اختبار النموذج النصي اختبارًا نهائيًا.", "Asking for solution and questions together, or treating text-simulated tests as final."),
      check: L("هل تستطيع شرح فائدة كل جزء من الجملة الثلاثة؟", "Can you explain what each of the three parts does?"),
      next: L("أربعة أخطاء تفسد النتيجة وكيف تصححها.", "Four mistakes that spoil results and how to fix them."),
    },
    keys: L(["اجعلها بداية كل طلب مهم {p7}.", "«اسألني عن الناقص» يكشف الافتراضات بدل تخمينها بصمت.", "«أبسط حل ممكن» يمنع تعقيدًا لا تستطيع صيانته.", "«اختبر الحالات الاستثنائية» يكشف الأخطاء قبل تقرير الإدارة.", "الترتيب: أسئلة ثم إجاباتك ثم الحل."],
      ["Make it the start of every important request {p7}.", "“Ask me what’s missing” exposes assumptions instead of silent guesses.", "“Simplest possible solution” prevents complexity you can’t maintain.", "“Test the edge cases” catches errors before the management report.", "Order: questions, then your answers, then the solution."]),
    scene: "ask-first", prompts: ["u1-p-golden-sentence", "u1-p-questions-first"],
    quick: [
      { q: L("ما الذي يعالجه جزء «اسألني عن أي معلومة ناقصة»؟", "What does “ask me about any missing information” fix?"), opts: L(["طول الإجابة", "تخمين الأداة لافتراضاتها بصمت", "سرعة الأداة", "أخطاء الإملاء"], ["Answer length", "The tool silently guessing its assumptions", "Tool speed", "Spelling errors"]), a: 1, why: L("«يجبر الأداة على كشف افتراضاتها بدل تخمينها بصمت» {p7}.", "“It forces the tool to reveal its assumptions instead of silently guessing them” {p7}.") },
      { type: "order", q: L("رتّب ما تطلبه الجملة الذهبية:", "Order what the golden sentence asks for:"), items: L(["اسألني عن المعلومات الناقصة", "انتظر إجاباتي", "أعطني أبسط حل واشرحه", "اختبر الحالات الاستثنائية"], ["Ask me for missing information", "Wait for my answers", "Give the simplest solution, explained", "Test the edge cases"]), why: L("الترتيب يمنع حلًا مبنيًا على تخمين: أسئلة ← إجابات ← حل ← اختبار {p7}.", "The order prevents a solution built on guesses: questions → answers → solution → tests {p7}.") },
    ],
    related: ["u1-five", "u1-mistakes", "u1-macro"], req: ["u1-five"], terms: ["edge-case", "assumption"],
  });

  ACAD.L({
    id: "u1-mistakes", unit: "u1", pages: [8], icon: "🧯", diff: 1, mins: 9, tags: ["prompting", "safety"],
    title: L("أربعة أخطاء تُفسد النتيجة — وثلاثة برومبتات تنقذها", "Four mistakes that spoil results — and three prompts that rescue them"),
    hook: L("وصف مبهم، وقبول أول إجابة، وتجاهل الناقص، والتطبيق فورًا على الملف الحقيقي.", "Vague descriptions, accepting the first answer, ignoring gaps, and applying straight to the real file."),
    book: L(`**أربعة أخطاء تُفسد النتيجة — وتصحيحها** {p8}:
| الخطأ | الصواب |
|---|---|
| **وصف مبهم للمعطيات**: «عندي جدول مبيعات» | سمِّ الأعمدة بأسمائها الحقيقية، واذكر نوع كل عمود، وعدد الصفوف تقريبًا. |
| **قبول أول إجابة**: أخذ أول نتيجة والمضي بها | اطلب نسخة أبسط، ثم قارن بين النسختين قبل الاعتماد. |
| **تجاهل الحالات الناقصة**: افتراض أن البيانات كاملة دائمًا | حدّد سلفًا ماذا يحدث عند الخلية الفارغة أو القسمة على صفر. |
| **التطبيق فورًا على الملف الحقيقي** | جرّب على نسخة وبيانات صغيرة أولًا، ثم عمّم. |

**ثلاثة برومبتات تحسّن أي طلب كتبته بالفعل:** (١) لتحسين برومبت ضعيف، (٢) حين تكون النتيجة عامة ولا تفيد، (٣) للتحقق قبل الاعتماد النهائي. تجدها كاملة في قسم الأوامر بالأسفل.`,
      `**Four mistakes that spoil the result — and their fixes** {p8}:
| Mistake | Fix |
|---|---|
| **Vague description of the data**: “I have a sales table” | Name the columns by their real names, state each column’s type and the approximate row count. |
| **Accepting the first answer**: taking the first result and moving on | Ask for a simpler version, then compare the two before relying on either. |
| **Ignoring missing cases**: assuming data is always complete | Decide in advance what happens with a blank cell or division by zero. |
| **Applying straight to the real file** | Try on a copy and small data first, then generalise. |

**Three prompts that improve any request you’ve written:** (1) to improve a weak prompt, (2) when the result is generic and useless, (3) to verify before final reliance. They appear in full in the prompts section below.`),
    levels: {
      simple: L(`الأخطاء الأربعة تشبه أخطاء الطبخ:
- **وصف مبهم** = أن تقول للطاهي «عندي خضار» بدل «عندي طماطم وبصل وكوسة».
- **قبول أول إجابة** = أن تقدّم أول طبخة للضيوف بدون تذوق.
- **تجاهل الناقص** = ألا تسأل نفسك: ماذا لو نفد الملح؟
- **التطبيق فورًا** = أن تجرّب وصفة جديدة لأول مرة في عزومة كبيرة.

والحل في كل مرة بسيط: **سمِّ الأشياء بأسمائها، قارن، فكّر في الناقص، جرّب على صغير**.`,
        `The four mistakes are like cooking mistakes:
- **Vague description** = telling the cook “I have vegetables” instead of “tomatoes, onions and courgettes”.
- **Accepting the first answer** = serving the first attempt to guests without tasting.
- **Ignoring gaps** = not asking: what if we run out of salt?
- **Applying straight away** = trying a new recipe for the first time at a big dinner.

The fix each time is simple: **name things precisely, compare, think about gaps, test small**.`),
      mech: L(`## لماذا تقع هذه الأخطاء أصلًا؟
- **الوصف المبهم**: لأننا نرى الجدول أمامنا فننسى أن النموذج لا يراه. «عمود السعر» عندك قد يكون بالجنيه أو بالآلاف أو فيه نصوص.
- **قبول أول إجابة**: لأن الإجابة الأولى تأتي واثقة ومرتبة، فتبدو نهائية. لكنها مجرد أول عينة من احتمالات كثيرة.
- **تجاهل الناقص**: لأن أمثلتنا الذهنية دائمًا «نظيفة»، والبيانات الحقيقية ليست كذلك.
- **التطبيق فورًا**: لأن الوقت ضيق، والتجربة على نسخة تبدو خطوة زائدة… حتى تمسح بيانات حقيقية.

## البرومبتات الثلاثة كدورة
**حسّن الطلب** ← **إن جاءت النتيجة عامة: اطلب التخصيص** ← **قبل الاعتماد: اطلب النقد الذاتي**. البرومبت الثالث خصوصًا يطلب من النموذج أن يذكر الافتراضات التي بناها ولم تذكرها أنت، وما قد يكون خاطئًا في سياقك.`,
        `## Why do these mistakes happen at all?
- **Vague description**: we see the table, so we forget the model doesn’t. Your “price column” might be in pounds, in thousands, or contain text.
- **Accepting the first answer**: the first answer arrives confident and tidy, so it feels final. It’s just the first sample of many possibilities.
- **Ignoring gaps**: our mental examples are always “clean”; real data isn’t.
- **Applying straight away**: time is short and testing on a copy feels unnecessary… until real data gets wiped.

## The three prompts as a cycle
**Improve the request** → **if the result is generic, demand specifics** → **before relying, ask for self-critique**. The third prompt in particular asks the model to list assumptions it made that you never stated, and what might be wrong in your context.`),
      practice: L(`## من المكتب: وصف دقيق للمعطيات
❌ «عندي جدول مبيعات، احسب الربح.»

✅ «عندي جدول مبيعات من ٢٤٠٠ صف تقريبًا. الأعمدة: التاريخ (تاريخ)، الفرع (نص)، المنتج (نص)، الكمية (رقم صحيح)، سعر البيع (رقم بالجنيه)، التكلفة (رقم بالجنيه، وفيها خلايا فارغة لبعض المنتجات الجديدة).»

لاحظ كيف أن ذكر «خلايا فارغة» وحده يجعل النموذج يقترح معالجة لها، وهو [[l:u1-excel|نفس منطق مثال المعادلة]] في الكتاب {p13}.

## جرّب بنفسك
[[lab:formula|مختبر معادلة الهامش]] يُظهر بالأرقام ماذا يحدث عند تجاهل الحالات الناقصة.`,
        `## From the office: describing the data precisely
❌ “I have a sales table; calculate profit.”

✅ “I have a sales table of about 2,400 rows. Columns: date (date), branch (text), product (text), quantity (integer), sale price (number, EGP), cost (number, EGP, with blank cells for some new products).”

Notice how mentioning “blank cells” alone makes the model suggest handling them — the [[l:u1-excel|same logic as the book’s formula example]] {p13}.

## Try it
[[lab:formula|The margin-formula lab]] shows in numbers what happens when missing cases are ignored.`),
      adv: L(`## ما وراء الأخطاء الأربعة
- **«النسخة الأبسط» أداة تشخيص**: إذا كانت النسخة الأبسط تؤدي نفس النتيجة، فالتعقيد في الأولى كان بلا داعٍ. وإذا فشلت، فهمت ما الذي يضيفه التعقيد.
- **النقد الذاتي له حدود**: النموذج قد يراجع إجابته ويؤكدها بنفس الخطأ. لذلك برومبت التحقق يطلب أيضًا «ما الذي يجب أن أتحقق منه بنفسي؟» — أي يُعيد المسؤولية إليك {p8}.
- **من الأخطاء الفردية إلى قواعد هندسية**: هذه الأخطاء الأربعة تصبح في الدليل الثاني قواعد بناء: «لا تُمسّ البيانات الأصلية»، و«الفشل الصريح أفضل من النجاح الصامت»، و«تشغيل تجريبي أولًا» {p17-18}.`,
        `## Beyond the four mistakes
- **“The simpler version” is a diagnostic tool**: if the simpler version gives the same result, the first one’s complexity was unnecessary. If it fails, you learn what the complexity adds.
- **Self-critique has limits**: the model may review its answer and confirm the same error. So the verification prompt also asks “what must I check myself?” — returning responsibility to you {p8}.
- **From individual mistakes to engineering rules**: in Guide 2 these four mistakes become build rules: “never touch the original data”, “explicit failure beats silent success”, “trial run first” {p17-18}.`),
    },
    card: {
      what: L("أربعة أخطاء: وصف مبهم، قبول أول إجابة، تجاهل الناقص، التطبيق فورًا على الأصل {p8}.", "Four mistakes: vague description, accepting the first answer, ignoring gaps, applying straight to the original {p8}."),
      why: L("لأنها السبب الأشيع لنتائج تبدو صحيحة وهي خاطئة.", "Because they’re the commonest cause of results that look right but are wrong."),
      how: L("سمِّ الأعمدة، قارن نسختين، حدد سلوك الناقص، جرّب على نسخة.", "Name columns, compare two versions, define missing-data behaviour, test on a copy."),
      inside: L("كل خطأ يترك فراغًا يملؤه النموذج بافتراض شائع.", "Each mistake leaves a gap the model fills with a common assumption."),
      relation: L("يتحول لاحقًا إلى القواعد الهندسية في الدليل الثاني.", "Later becomes Guide 2’s engineering rules."),
      example: L("ذكر «خلايا فارغة في التكلفة» يجعل المعادلة تتعامل معها.", "Mentioning “blank cost cells” makes the formula handle them."),
      apply: L("قبل اعتماد أي نتيجة، شغّل برومبت التحقق.", "Before relying on any result, run the verification prompt."),
      mistakes: L("الاعتقاد أن النقد الذاتي للنموذج يغني عن تحققك أنت.", "Believing the model’s self-critique replaces your own check."),
      check: L("هل تستطيع إعادة كتابة وصف بياناتك بالأعمدة والأنواع والحجم؟", "Can you rewrite your data description with columns, types and size?"),
      next: L("ماذا تفعل حين لا تعجبك النتيجة: إدارة المحادثة.", "What to do when you don’t like the result: managing the conversation."),
    },
    keys: L(["سمِّ الأعمدة بأسمائها وأنواعها وحجمها {p8}.", "لا تقبل أول إجابة: اطلب نسخة أبسط وقارن.", "حدد سلفًا ماذا يحدث عند الفراغ والقسمة على صفر.", "جرّب على نسخة صغيرة أولًا ثم عمّم.", "برومبت التحقق يطلب الافتراضات غير المعلنة وما يجب أن تتحقق منه بنفسك."],
      ["Name columns with their types and size {p8}.", "Don’t accept the first answer: ask for a simpler version and compare.", "Decide in advance what happens with blanks and division by zero.", "Test on a small copy first, then generalise.", "The verification prompt asks for unstated assumptions and what you must check yourself."]),
    lab: "formula", prompts: ["u1-p-improve", "u1-p-generic", "u1-p-verify"],
    quick: [
      { q: L("ما التصحيح الذي يقترحه الكتاب لخطأ «قبول أول إجابة»؟", "What fix does the book suggest for “accepting the first answer”?"), opts: L(["اسأل نموذجًا آخر", "اطلب نسخة أبسط ثم قارن بين النسختين قبل الاعتماد", "اطلب إجابة أطول", "أعد السؤال بنفس الصيغة"], ["Ask another model", "Ask for a simpler version, then compare both before relying", "Ask for a longer answer", "Repeat the question verbatim"]), a: 1, why: L("«اطلب نسخة أبسط، ثم قارن بين النسختين قبل الاعتماد» {p8}.", "“Ask for a simpler version, then compare the two before relying” {p8}.") },
      { q: L("أي برومبت تستخدم قبل الاعتماد النهائي على نتيجة؟", "Which prompt do you use before final reliance on a result?"), opts: L(["برومبت تحسين الطلب الضعيف", "برومبت التحقق: الافتراضات غير المعلنة وما يجب أن أتحقق منه بنفسي", "برومبت تنظيم اليوم", "لا حاجة لبرومبت"], ["The weak-prompt improver", "The verification prompt: unstated assumptions and what I must check myself", "The day-planning prompt", "No prompt is needed"]), a: 1, why: L("البرومبت الثالث في الصفحة مخصص للتحقق قبل الاعتماد النهائي {p8}.", "The page’s third prompt is dedicated to verifying before final reliance {p8}.") },
    ],
    related: ["u1-ask", "u1-conversation", "u0-limits", "u2-compass"], req: ["u1-five"], terms: ["edge-case", "assumption"],
  });

  ACAD.L({
    id: "u1-conversation", unit: "u1", pages: [8], icon: "🔁", diff: 1, mins: 8, tags: ["prompting"],
    title: L("إدارة المحادثة: ماذا تفعل حين لا تعجبك النتيجة؟", "Managing the conversation: what to do when you don’t like the result"),
    hook: L("المبتدئ يبدأ محادثة جديدة، والمتمكن يصحح المسار في المحادثة نفسها.", "A beginner starts a new chat; a skilled user corrects course in the same chat."),
    book: L(`**أكبر فرق بين مستخدم مبتدئ ومستخدم متمكن ليس في الطلب الأول، بل في ما يفعله بعده.** المبتدئ يبدأ محادثة جديدة، والمتمكن يصحح المسار في المحادثة نفسها {p8}.

**الخطوات الخمس:** ١ اطلب ← ٢ اقرأ بعين ناقدة ← ٣ حدّد الخلل بدقة ← ٤ صحّح في المحادثة نفسها ← ٥ اعتمد أو كرّر.

**ثلاث حالات وعبارة لكل منها:**
- **النتيجة طويلة ومشتتة** ← قل: «اختصرها إلى نصف الطول مع الحفاظ على كل نقطة قابلة للتنفيذ، واحذف كل ما هو تمهيد أو تكرار».
- **النتيجة صحيحة لكنها لا تناسبني** ← قل: «هذا صحيح عمومًا، لكن وضعي يختلف في [حدّد الفرق]. أعد الحل بناءً على هذا القيد تحديدًا».
- **النتيجة تبدو مخترعة** ← قل: «اذكر لكل رقم أو ادعاء مصدره، وميّز بوضوح ما أنت واثق منه عما هو ترجيح منك».`,
      `**The biggest difference between a beginner and a skilled user isn’t the first request but what they do after it.** The beginner starts a new chat; the skilled user corrects course in the same chat {p8}.

**The five steps:** 1 ask → 2 read critically → 3 pinpoint the flaw → 4 correct in the same chat → 5 approve or repeat.

**Three situations, one phrase each:**
- **Long and scattered result** → say: “Cut it to half the length, keeping every actionable point, and delete all preamble and repetition.”
- **Correct but doesn’t fit me** → say: “This is generally right, but my situation differs in [state the difference]. Redo the solution based on this constraint specifically.”
- **The result seems invented** → say: “Give the source for every number or claim, and clearly separate what you’re sure of from what is your estimate.”`),
    levels: {
      simple: L(`المحادثة مع الذكاء الاصطناعي تشبه **العمل مع مصمم جرافيك**. لو جاءك التصميم الأول ولم يعجبك، لن تطلب مصممًا جديدًا وتشرح له كل شيء من الأول؛ بل ستقول: «اللون غامق شوية، والعنوان صغير». التعليق المحدد في نفس الجلسة يصل للنتيجة أسرع.

المحادثة نفسها فيها كل ما شرحته من قبل، فلماذا ترميه وتبدأ من الصفر؟`,
        `A chat with AI is like **working with a graphic designer**. If the first design isn’t right, you don’t hire a new designer and re-explain everything; you say: “the colour is a bit dark and the title is small.” A specific comment in the same session gets there faster.

The chat already holds everything you explained, so why throw it away and start from zero?`),
      mech: L(`## لماذا التصحيح في نفس المحادثة أقوى؟
المحادثة كلها جزء من **السياق** (راجع [[l:u0-assistant|المساعد الاستراتيجي]]). عندما تصحح فيها، يرى النموذج: طلبك الأصلي، وإجابته، وما الذي لم يعجبك تحديدًا. هذه معلومات ثمينة تضيع إذا بدأت محادثة جديدة.

## سر الخطوة الثالثة: «حدّد الخلل بدقة»
«مش عاجبني» لا تفيد. أما «طويلة ومشتتة» أو «لا تناسب وضعي في كذا» أو «تبدو مخترعة» فكل واحدة تشير لنوع مختلف من الخلل، ولها علاج مختلف:
| الخلل | السبب المرجح | العلاج |
|---|---|---|
| طويلة ومشتتة | لم تحدد الشكل والطول | اختصار مع الحفاظ على القابل للتنفيذ |
| لا تناسبني | سياق أو قيد ناقص | أضف القيد الناقص وأعد الحل |
| تبدو مخترعة | النموذج يملأ الفراغ بأرقام محتملة | اطلب المصادر والفصل بين اليقين والترجيح |`,
        `## Why is correcting in the same chat stronger?
The whole conversation is part of the **context** (see [[l:u0-assistant|the strategic assistant]]). When you correct within it, the model sees your original request, its answer, and exactly what you disliked. That valuable information is lost if you start a new chat.

## The secret of step three: “pinpoint the flaw”
“I don’t like it” helps nobody. But “long and scattered”, “doesn’t fit my situation in X”, or “seems invented” each point to a different kind of flaw with a different fix:
| Flaw | Likely cause | Fix |
|---|---|---|
| Long and scattered | format and length not specified | shorten while keeping the actionable |
| Doesn’t fit me | missing context or constraint | add the missing constraint and redo |
| Seems invented | model fills gaps with plausible numbers | ask for sources and certainty vs estimate |`),
      practice: L(`## مثال من المبيعات
**الطلب:** خطة لزيادة مبيعات فرع.
**الرد الأول:** ١٥ نقطة، منها إعلانات تلفزيونية وفتح فرع جديد.
**الخلل الدقيق:** لا يناسب الوضع (ميزانية محدودة) + طويل.
**التصحيح في نفس المحادثة:** «هذا صحيح عمومًا، لكن وضعي يختلف في أن الميزانية الشهرية لا تتجاوز ١٠ آلاف جنيه. أعد الحل بناءً على هذا القيد تحديدًا، واختصره إلى أهم ٥ إجراءات.»

## متى تبدأ محادثة جديدة فعلًا؟
عندما تتغير المهمة تمامًا، أو عندما تطول المحادثة جدًا وتبدأ النتائج في نسيان تفاصيل البداية (حدود [[t:context-window|نافذة السياق]]). وقتها لخّص أهم القرارات وابدأ بها المحادثة الجديدة.`,
        `## A sales example
**Request:** a plan to grow a branch’s sales.
**First reply:** 15 points, including TV ads and opening a new branch.
**Pinpointed flaw:** doesn’t fit (limited budget) + too long.
**Correction in the same chat:** “This is generally right, but my situation differs in that the monthly budget doesn’t exceed 10,000 EGP. Redo the solution based on this constraint specifically, and cut it to the 5 most important actions.”

## When should you actually start a new chat?
When the task changes completely, or when the chat grows so long that results begin forgetting early details (the limits of the [[t:context-window|context window]]). Then summarise the key decisions and open the new chat with them.`),
      adv: L(`## الفخ: التصحيح الذي يدفع النموذج لمجاملتك
إذا قلت «أنا متأكد أن السبب هو المنافس، صحّح التحليل»، قد يعيد النموذج كتابة التحليل ليتفق معك. التصحيح الجيد يضيف **حقيقة أو قيدًا**، لا رأيًا يريد تأكيده. وإن أردت اختبار رأيك، استخدم [[l:u1-scenarios|برومبت «لا توافقني تلقائيًا»]] {p11}.

## «اعتمد أو كرّر» تعني أن هناك معيار توقف
لا تكرر بلا نهاية. حدد مسبقًا متى تعتبر النتيجة كافية: هل تجيب عن الهدف؟ هل يمكن تنفيذها غدًا؟ هل مرت على [[l:u1-mistakes|برومبت التحقق]]؟ هذا هو نفس مبدأ «حدود التوقف» الذي سيظهر لاحقًا مع [[l:u5-team|الوكلاء]] {p40}.`,
        `## The trap: corrections that make the model flatter you
If you say “I’m sure the competitor is the cause; fix the analysis,” the model may rewrite the analysis to agree with you. A good correction adds **a fact or a constraint**, not an opinion to be confirmed. To test your view, use [[l:u1-scenarios|the “don’t just agree with me” prompt]] {p11}.

## “Approve or repeat” implies a stopping rule
Don’t loop forever. Decide in advance when the result is good enough: does it answer the goal? can it be executed tomorrow? has it passed [[l:u1-mistakes|the verification prompt]]? It’s the same principle as the “stop limits” that later appear with [[l:u5-team|agents]] {p40}.`),
    },
    card: {
      what: L("خمس خطوات: اطلب، اقرأ بعين ناقدة، حدّد الخلل، صحّح في نفس المحادثة، اعتمد أو كرّر {p8}.", "Five steps: ask, read critically, pinpoint the flaw, correct in the same chat, approve or repeat {p8}."),
      why: L("لأن المحادثة تحمل سياقًا ثمينًا يضيع مع كل بداية جديدة.", "Because the chat holds valuable context lost with every fresh start."),
      how: L("سمِّ نوع الخلل، ثم استخدم عبارته: اختصار، أو قيد إضافي، أو طلب مصادر.", "Name the flaw type, then use its phrase: shorten, add a constraint, or ask for sources."),
      inside: L("التصحيح يضيف للسياق ما لم يعجبك تحديدًا، فيغيّر الاحتمالات.", "The correction adds exactly what you disliked to the context, shifting probabilities."),
      relation: L("يكمل الأخطاء الأربعة: ماذا تفعل بعد ظهور النتيجة.", "Completes the four mistakes: what to do once a result appears."),
      example: L("«وضعي يختلف في أن الميزانية ١٠ آلاف؛ أعد الحل على هذا القيد».", "“My situation differs: budget is 10k; redo it on this constraint.”"),
      apply: L("في المرة القادمة، صحّح مرتين في نفس المحادثة قبل أن تبدأ من جديد.", "Next time, correct twice in the same chat before starting over."),
      mistakes: L("«مش عاجبني» بدون تحديد، أو تصحيح يفرض رأيك على التحليل.", "“I don’t like it” with no specifics, or a correction that imposes your view."),
      check: L("هل تعرف العبارة المناسبة لكل نوع من الخلل الثلاثة؟", "Do you know the phrase for each of the three flaw types?"),
      next: L("القسم الثاني: برومبتات تنظيم اليوم والاجتماعات.", "Section 2: prompts for organising the day and meetings."),
    },
    keys: L(["الفرق بين المبتدئ والمتمكن فيما يفعله بعد الطلب الأول {p8}.", "اطلب ← اقرأ بعين ناقدة ← حدّد الخلل ← صحّح في نفس المحادثة ← اعتمد أو كرّر.", "طويلة: اختصر للنصف مع الحفاظ على القابل للتنفيذ.", "لا تناسبني: أضف القيد المختلف وأعد الحل.", "مخترعة: اطلب مصدر كل رقم وافصل اليقين عن الترجيح."],
      ["The difference between beginner and expert is what they do after the first request {p8}.", "Ask → read critically → pinpoint → correct in the same chat → approve or repeat.", "Too long: cut to half while keeping the actionable.", "Doesn’t fit: add the differing constraint and redo.", "Invented: ask for each number’s source; separate certainty from estimate."]),
    scene: "conversation-loop", prompts: ["u1-p-shorten", "u1-p-fit", "u1-p-source"],
    quick: [
      { q: L("النتيجة تحتوي أرقامًا لا تعرف من أين جاءت. ما العبارة المناسبة؟", "The result contains numbers of unknown origin. Which phrase fits?"), opts: L(["اختصرها إلى النصف", "اذكر لكل رقم أو ادعاء مصدره، وميّز ما أنت واثق منه عما هو ترجيح", "أعد الحل بقيد مختلف", "ابدأ محادثة جديدة"], ["Cut it to half", "Give each number or claim’s source and separate certainty from estimate", "Redo with a different constraint", "Start a new chat"]), a: 1, why: L("هذه هي العبارة المخصصة لحالة «النتيجة تبدو مخترعة» {p8}.", "That is the phrase for “the result seems invented” {p8}.") },
      { q: L("ما الذي يفعله المستخدم المتمكن حين لا تعجبه النتيجة؟", "What does a skilled user do when they don’t like the result?"), opts: L(["يبدأ محادثة جديدة فورًا", "يصحح المسار في المحادثة نفسها بعد تحديد الخلل بدقة", "يغيّر الأداة", "يقبلها كما هي"], ["Starts a new chat at once", "Corrects course in the same chat after pinpointing the flaw", "Switches tools", "Accepts it as is"]), a: 1, why: L("«المبتدئ يبدأ محادثة جديدة، والمتمكن يصحح المسار في المحادثة نفسها» {p8}.", "“The beginner starts a new chat; the skilled user corrects course in the same chat” {p8}.") },
    ],
    related: ["u1-mistakes", "u1-scenarios", "u0-assistant"], req: ["u1-mistakes"], terms: ["context", "context-window"],
  });

  ACAD.L({
    id: "u1-day", unit: "u1", pages: [8, 9], icon: "🗓️", diff: 1, mins: 10, tags: ["productivity"],
    title: L("نظّم يومك واجتماعاتك ومهامك", "Organise your day, meetings and tasks"),
    hook: L("لا تطلب إجابة فقط؛ اطلب نتيجة قابلة للتنفيذ: ترتيب، وجدول زمني، وأجندة، ومحضر.", "Don’t just ask for an answer; ask for something usable: an order, a timetable, an agenda, minutes."),
    book: L(`**القسم الثاني — برومبتات الإنتاجية والتنفيذ: إدارة العمل اليومي** {p8}. برومبتات عملية تساعدك على التنظيم، والمتابعة، والإنجاز، وإدارة الاجتماعات، بوضوح وسرعة.

**١ · لتنظيم اليوم**
- **ترتيب المهام**: رتّبها حسب الأولوية والوقت اللازم والطاقة الذهنية، واقترح أول ثلاث مهام مع سبب كل اختيار، وما يمكن تأجيله بأمان.
- **تقسيم اليوم إلى فترات**: فترات تركيز عميق، وراحة، ومتابعة ورد على الرسائل، مع مراعاة وقت طاقتك الأعلى وارتباطاتك الثابتة، في جدول زمني واضح.

**٢ · للاجتماعات الفعّالة**
- **قبل الاجتماع**: حوّل الموضوع إلى أجندة مختصرة: الهدف، والقرارات المطلوبة، ومن يجب أن يحضر فعلًا ومن يكفيه الملخص، والوقت لكل بند.
- **بعد الاجتماع** {p9}: حوّل الملاحظات المبعثرة إلى محضر مرتب: ملخص تنفيذي في ثلاثة أسطر، والقرارات المتخذة، ونقاط المتابعة مع المسؤول والموعد، والمسائل التي لم تُحسم.

**٣ · لإدارة المهام والمشروعات — من هدف إلى مهام**: حوّل الهدف إلى مهام صغيرة مرتبة حسب تسلسل التنفيذ، لكل منها مسؤول وموعد و**معيار إنجاز يثبت أنها اكتملت فعلًا**، ثم استخرج العوائق المحتملة وطريقة التعامل مع كل عائق.`,
      `**Section 2 — productivity and execution prompts: managing daily work** {p8}. Practical prompts that help you organise, follow up, get things done and run meetings, clearly and quickly.

**1 · Organising the day**
- **Ordering tasks**: rank them by priority, time needed and mental energy; suggest the first three tasks with a reason for each, and what can safely be postponed.
- **Splitting the day into blocks**: deep-focus blocks, breaks, and follow-up/reply blocks, respecting when your energy peaks and your fixed commitments, as a clear timetable.

**2 · Effective meetings**
- **Before the meeting**: turn the topic into a short agenda: the goal, the decisions needed, who must actually attend and who just needs the summary, and time per item.
- **After the meeting** {p9}: turn scattered notes into tidy minutes: a three-line executive summary, decisions made, follow-ups with owner and date, and open issues.

**3 · Managing tasks and projects — from goal to tasks**: turn the goal into small tasks in execution order, each with an owner, a date and **a done-criterion proving it is really complete**; then extract likely obstacles and how to handle each.`),
    levels: {
      simple: L(`كلنا نبدأ اليوم بقائمة طويلة ونشعر أن كل شيء عاجل. الذكاء الاصطناعي هنا يعمل كـ**منظّم شخصي** يقول لك: «ابدأ بهذه الثلاث، وهذه يمكن أن تنتظر للغد بأمان».

ونفس الشيء مع الاجتماعات: بدل اجتماع ينتهي بـ«نتواصل لاحقًا»، تحصل قبله على **أجندة** واضحة، وبعده على **محضر** فيه من سيفعل ماذا ومتى.

**الفكرة الأساسية:** كل برومبت في هذا الدرس ينتهي بشيء **تستخدمه فورًا**: ترتيب، جدول، أجندة، محضر، قائمة مهام.`,
        `We all start the day with a long list and feel everything is urgent. Here AI acts as a **personal organiser** saying: “start with these three; these can safely wait until tomorrow.”

Same with meetings: instead of a meeting ending with “let’s catch up later”, you get a clear **agenda** before and **minutes** after, showing who does what and when.

**The key idea:** every prompt in this lesson ends in something you **use immediately**: an order, a timetable, an agenda, minutes, a task list.`),
      mech: L(`## لماذا تنجح هذه البرومبتات؟ ثلاثة أنماط متكررة
1. **معايير صريحة للترتيب**: «الأولوية، والوقت اللازم، والطاقة الذهنية» تحوّل الترتيب من إحساس إلى حكم بمعايير. بدونها سيرتب النموذج حسب ما يبدو مهمًا لغويًا.
2. **السبب مع كل اختيار**: «مع سبب كل اختيار» يجعلك قادرًا على رفض الترتيب إن كان السبب خاطئًا في سياقك.
3. **مخرج له صاحب وموعد**: المحضر والمهام تطلب دائمًا **مسؤولًا وموعدًا**. هذا ما يحوّل الكلام إلى تنفيذ؛ وستراه يتكرر في [[l:u2-level3|الصفحة التنفيذية]] حيث «ثلاثة قرارات واضحة، كل واحد بمسؤول وموعد» {p21}.

## «معيار الإنجاز»: أهم كلمتين في الدرس
مهمة «تحسين التقرير» لا تنتهي أبدًا. مهمة «تقرير يُفهم في ٣٠ ثانية ويوافق عليه المدير» لها نهاية واضحة. نفس المنطق الذي يجعل [[l:u2-principles|الاختبارات]] أهم عنصر في مواصفة الأداة {p17}.`,
        `## Why do these prompts work? Three recurring patterns
1. **Explicit ordering criteria**: “priority, time needed, mental energy” turn ordering from a feeling into a judgement with criteria. Without them the model orders by what sounds important.
2. **A reason for each choice**: “with the reason for each choice” lets you reject the order if the reason is wrong in your context.
3. **An output with an owner and a date**: minutes and tasks always ask for **an owner and a deadline**. That’s what turns talk into execution — repeated in [[l:u2-level3|the executive page]]: “three clear decisions, each with an owner and a date” {p21}.

## “Done-criterion”: the two key words of this lesson
A task “improve the report” never ends. A task “a report understood in 30 seconds and approved by the manager” has a clear end. Same logic that makes [[l:u2-principles|tests]] the most important element of a tool spec {p17}.`),
      practice: L(`## يوم مشرف وردية في مصنع
**المهام:** مراجعة سجل التوقفات، اجتماع السلامة، تدريب عامل جديد، الرد على ٢٠ رسالة، تقرير الإنتاج، متابعة طلب قطع غيار.
**الوقت المتاح:** ٦ ساعات، والطاقة أعلى صباحًا.
**ما يقترحه برومبت الترتيب عادةً:** تقرير الإنتاج وسجل التوقفات صباحًا (يحتاجان تركيزًا)، والرسائل في فترتين قصيرتين، وتأجيل جزء من التدريب إن ضاق الوقت مع ذكر الأثر.

## اجتماع شهري للمبيعات
قبل الاجتماع: أجندة فيها **القرارات المطلوبة**، لا المواضيع فقط. بعده: الصق ملاحظاتك المبعثرة واحصل على محضر بثلاثة أسطر، وقرارات، ومتابعات بمسؤول وموعد. هذا تحديدًا ما يدربك عليه [[p:u1-p-minutes|برومبت ما بعد الاجتماع]].`,
        `## A shift supervisor’s day in a factory
**Tasks:** review the stoppage log, safety meeting, train a new worker, reply to 20 messages, production report, chase a spare-parts order.
**Time available:** 6 hours; energy peaks in the morning.
**What the ordering prompt usually suggests:** production report and stoppage log in the morning (they need focus), messages in two short blocks, and postponing part of the training if time runs short, stating the impact.

## A monthly sales meeting
Before: an agenda listing the **decisions needed**, not just topics. After: paste your scattered notes and get three-line minutes, decisions, and follow-ups with owner and date. That’s exactly what [[p:u1-p-minutes|the after-meeting prompt]] trains you to do.`),
      adv: L(`## حدود الترتيب الآلي
- **النموذج لا يعرف السياسة الداخلية**: مهمة يطلبها المدير العام قد تكون أهم مما تبدو. أضفها كقيد صريح.
- **«التأجيل بأمان» حكم يحتاج مراجعتك**: النموذج يقدّر الأثر، وأنت تعرف العواقب الحقيقية.
- **المحاضر والخصوصية**: ملاحظات الاجتماعات قد تحتوي معلومات حساسة عن أشخاص أو صفقات؛ راجع سياسة شركتك قبل لصقها {p13}.

## من البرومبت إلى العادة إلى الأتمتة
الكتاب يقترح أسبوعًا كاملًا لتطبيق برومبتات تنظيم اليوم والاجتماعات على عملك الفعلي، بهدف **توفير ساعة واحدة على الأقل أسبوعيًا بشكل ملموس** {p16}. وعندما يتكرر نفس البرومبت كل يوم بنفس الشكل، فهذه إشارة أنه مرشح لـ[[l:u2-compass|الأتمتة]].`,
        `## Limits of automatic ordering
- **The model doesn’t know internal politics**: a task from the general manager may matter more than it looks. Add it as an explicit constraint.
- **“Safe to postpone” needs your review**: the model estimates impact; you know the real consequences.
- **Minutes and privacy**: meeting notes may contain sensitive information about people or deals; check company policy before pasting {p13}.

## From prompt to habit to automation
The book suggests a whole week applying the day and meeting prompts to real work, aiming to **save at least one tangible hour per week** {p16}. When the same prompt repeats daily in the same form, that’s a sign it is a candidate for [[l:u2-compass|automation]].`),
    },
    card: {
      what: L("برومبتات لترتيب المهام، وتقسيم اليوم، والأجندة، والمحضر، وتحويل الهدف لمهام {p8-9}.", "Prompts for ordering tasks, time-blocking, agendas, minutes, and turning goals into tasks {p8-9}."),
      why: L("لتتحول المهام والاجتماعات من كلام إلى تنفيذ له مسؤول وموعد.", "To turn tasks and meetings from talk into execution with owners and dates."),
      how: L("معايير صريحة للترتيب + سبب لكل اختيار + مخرج بمسؤول وموعد.", "Explicit ordering criteria + a reason per choice + output with owner and date."),
      inside: L("المعايير تحوّل الترتيب من انطباع لغوي إلى حكم قابل للمراجعة.", "Criteria turn ordering from a linguistic impression into a reviewable judgement."),
      relation: L("تطبيق مباشر للعناصر الخمسة على العمل اليومي.", "A direct application of the five elements to daily work."),
      example: L("محضر بثلاثة أسطر وقرارات ومتابعات بمسؤول وموعد.", "Three-line minutes with decisions and owner-dated follow-ups."),
      apply: L("طبّق برومبت ترتيب المهام على قائمة الغد قبل نهاية اليوم.", "Run the task-ordering prompt on tomorrow’s list before today ends."),
      mistakes: L("مهام بلا معيار إنجاز، ولصق محاضر حساسة دون مراجعة السياسة.", "Tasks without a done-criterion; pasting sensitive minutes without checking policy."),
      check: L("هل لكل مهمة في قائمتك معيار يثبت اكتمالها؟", "Does every task on your list have a criterion proving it’s done?"),
      next: L("الكتابة المهنية والتفويض والمتابعة والبرومبت الشامل.", "Professional writing, delegation, follow-up and the master prompt."),
    },
    keys: L(["رتّب بمعايير صريحة: الأولوية والوقت والطاقة الذهنية {p8}.", "قسّم اليوم إلى تركيز عميق وراحة ومتابعة حسب طاقتك.", "الأجندة تحدد القرارات المطلوبة ومن يحضر فعلًا.", "المحضر: ٣ أسطر، قرارات، متابعات بمسؤول وموعد، ومسائل معلّقة {p9}.", "كل مهمة تحتاج معيار إنجاز يثبت اكتمالها."],
      ["Order with explicit criteria: priority, time, mental energy {p8}.", "Block the day into deep focus, breaks and follow-up around your energy.", "An agenda states the decisions needed and who must attend.", "Minutes: 3 lines, decisions, owner-dated follow-ups, open issues {p9}.", "Every task needs a done-criterion."]),
    prompts: ["u1-p-order", "u1-p-blocks", "u1-p-agenda", "u1-p-minutes", "u1-p-tasks"],
    quick: [
      { q: L("ما الذي يجعل محضر الاجتماع «قابلًا للتنفيذ» حسب البرومبت؟", "What makes meeting minutes “actionable” according to the prompt?"), opts: L(["طوله وتفصيله", "نقاط المتابعة مع المسؤول والموعد لكل بند", "تنسيقه الجميل", "ذكر كل ما قيل"], ["Its length and detail", "Follow-ups with an owner and a date for each item", "Nice formatting", "Recording everything said"]), a: 1, why: L("البرومبت يطلب «نقاط المتابعة مع المسؤول والموعد لكل بند» {p9}.", "The prompt asks for “follow-ups with the owner and date for each item” {p9}.") },
      { q: L("في برومبت «من هدف إلى مهام»، لماذا «معيار الإنجاز» مهم؟", "In “from goal to tasks”, why does the “done-criterion” matter?"), opts: L(["لأنه يجعل القائمة أطول", "لأنه يثبت أن المهمة اكتملت فعلًا بدل أن تظل مفتوحة", "لأنه مطلوب في إكسل", "ليس مهمًا"], ["It makes the list longer", "It proves the task is really complete instead of staying open", "Excel requires it", "It doesn’t matter"]), a: 1, why: L("«ومعيار الإنجاز الذي يثبت أنها اكتملت فعلًا» {p9}.", "“…and the done-criterion that proves it is really complete” {p9}.") },
    ],
    related: ["u1-write", "u1-five", "u1-habit"], req: ["u1-five"], terms: ["done-criterion"],
  });

  ACAD.L({
    id: "u1-write", unit: "u1", pages: [9, 10], icon: "✉️", diff: 1, mins: 11, tags: ["productivity"],
    title: L("اكتب، ابحث، تابع، فوّض… ثم البرومبت الشامل", "Write, research, follow up, delegate… then the master prompt"),
    hook: L("ستة مواقف يومية وبرومبت لكل منها، ودورة عمل يومية من خمس خطوات.", "Six daily situations with a prompt for each, and a five-step daily work cycle."),
    book: L(`**٤ · للكتابة المهنية** {p9}: رسالة مهنية واضحة ومختصرة تحدد الجهة المستقبِلة والنبرة والنتيجة المطلوبة، وتنتهي بطلب واضح. وحين يكون الهدف **الإقناع**: ابدأ بما يهمه هو لا بما يهمك أنت، وادعم الطلب بمنفعة واضحة له، وقلّل التبريرات، واختم بخطوة واحدة سهلة يستطيع اتخاذها فورًا.

**٥ · للبحث وجمع المعلومات — استخراج منظم**: استخرج الحقائق والأرقام والأسماء والمواعيد في جدول، ثم — **وهذا هو الأهم** — فرّق بين ما هو حقيقة مؤكدة وما هو رأي وما هو افتراض، واذكر المعلومات الناقصة قبل أي خطوة.

**٦ · للمتابعة والتقييم — تقرير متابعة**: قارن الخطة بالإنجاز الفعلي، واذكر ما تأخر ولماذا وأثره، واقترح إجراءات تصحيحية، وأنشئ تقرير متابعة مختصرًا يصلح للمدير مباشرة.

**٧ · للتفكير في تحسين العمليات**: حلّل عملية متكررة: نقاط الضعف، ومواضع الهدر، والخطوات المكررة بلا داعٍ، ثم خمسة تحسينات مرتبة حسب سهولة التنفيذ وقوة الأثر، وحدد **ما يمكن أتمتته بالكامل وما يمكن تبسيطه فقط**.

**٨ · للتفويض ومتابعة الفريق**: نص تكليف يتضمن النتيجة المطلوبة، والصلاحيات وحدودها، والموعد، ومعيار القبول، والنقاط التي يجب الرجوع فيها قبل القرار. ورسالة متابعة قصيرة لا تبدو ضغطًا ولا تشكيكًا.

**٩ · لتصفية الرسائل** {p10}: صنّف ما وردك إلى أربع فئات: رد مني اليوم، تفويض، تأجيل آمن، تجاهل تام — مع رد مقترح لكل بند في الفئة الأولى.

**١٠ · البرومبت الشامل للإنتاجية** — حين لا تعرف من أين تبدأ: حلّل الوضع، ثم نظّم المعلومات، ثم اقترح أفضل الخيارات، ثم حوّل الأفضل إلى خطوات تنفيذية.

**دورة العمل اليومية:** ١ افهم: حدّد الهدف والسياق ← ٢ نظّم: رتّب المعلومات ← ٣ قرّر: قارن واختر ← ٤ نفّذ: حوّلها إلى خطوات ← ٥ راجع: حسّن وكرّر.`,
      `**4 · Professional writing** {p9}: a clear, short message that states the recipient, tone and desired outcome, ending with a clear request. When the aim is to **persuade**: start with what matters to them, not to you; support the request with a clear benefit for them; cut justifications; and end with one easy step they can take at once.

**5 · Research and gathering information — structured extraction**: extract facts, numbers, names and dates into a table, then — **most importantly** — separate confirmed fact from opinion from assumption, and list missing information before any step.

**6 · Follow-up and evaluation — a follow-up report**: compare plan with actual delivery, state what slipped, why, and its impact, propose corrective actions, and write a short follow-up report ready for the manager.

**7 · Thinking about process improvement**: analyse a recurring process: weak points, waste, needlessly repeated steps; then five improvements ranked by ease and impact, specifying **what can be fully automated and what can only be simplified**.

**8 · Delegation and team follow-up**: an assignment stating the exact result, the authority granted and its limits, the deadline, the acceptance criterion, and the points to check back on before deciding. And a short follow-up message that feels neither pushy nor distrustful.

**9 · Filtering incoming messages** {p10}: sort what came in into four groups: reply today, delegate, safely postpone, ignore — with a suggested reply for each item in the first group.

**10 · The master productivity prompt** — when you don’t know where to start: analyse the situation, then organise the information, then propose the best options, then turn the best one into executable steps.

**The daily work cycle:** 1 understand: goal and context → 2 organise: order the information → 3 decide: compare and choose → 4 execute: turn it into steps → 5 review: improve and repeat.`),
    levels: {
      simple: L(`هذا الدرس مثل **صندوق أدوات** للمكتب: لكل موقف يومي أداة.
- رسالة مهمة؟ ← برومبت الرسالة المهنية.
- تريد إقناع مديرك؟ ← برومبت الإقناع.
- نص طويل فيه معلومات كثيرة؟ ← الاستخراج المنظم.
- مشروع متأخر؟ ← تقرير المتابعة.
- عمل يتكرر بشكل ممل؟ ← تحليل العملية.
- تريد تسليم مهمة لزميل؟ ← نص التكليف.
- بريد مزدحم؟ ← الفرز السريع.
- لا تعرف من أين تبدأ؟ ← **البرومبت الشامل**.

ولا تحتاج حفظ كل هذا: افتح [[p:u1-p-master-prod|البرومبت الشامل]] عندما تتوه.`,
        `This lesson is like an office **toolbox**: one tool per daily situation.
- An important message? → the professional message prompt.
- Need to persuade your manager? → the persuasion prompt.
- A long text full of information? → structured extraction.
- A late project? → the follow-up report.
- Boring repetitive work? → process analysis.
- Handing a task to a colleague? → the assignment text.
- Crowded inbox? → quick triage.
- Don’t know where to start? → **the master prompt**.

No need to memorise it all: open [[p:u1-p-master-prod|the master prompt]] when you’re lost.`),
      mech: L(`## الأسرار الثلاثة المشتركة بين هذه البرومبتات
1. **الفصل بين الأنواع**: الاستخراج المنظم يفصل الحقيقة عن الرأي عن الافتراض. والفرز يفصل الرد عن التفويض عن التأجيل عن التجاهل. **التصنيف يحوّل الكومة إلى قرارات**.
2. **منظور الطرف الآخر**: برومبت الإقناع يبدأ «بما يهمه هو لا بما يهمني أنا». ونص التكليف يحدد ما يحتاج المفوَّض معرفته ليعمل باستقلال.
3. **ترتيب إلزامي للتفكير**: البرومبت الشامل يفرض: تحليل ← تنظيم ← خيارات ← خطوات. نفس ترتيب دورة العمل اليومية. هذا الترتيب يمنع القفز إلى الحل، وسنراه بصورة أقوى في [[l:u1-scenarios|البرومبت الشامل الاستراتيجي]] {p11}.

## تحليل العملية: بذرة الأتمتة
سؤال «ما الذي يمكن أتمتته بالكامل وما الذي يمكن تبسيطه فقط» هو أول خطوة نحو [[l:u1-macro|القفزة الأخيرة]] و[[l:u5-system|النظام]]: أنت تبدأ في رؤية عملك كخطوات قابلة للتحسين.`,
        `## Three secrets these prompts share
1. **Separating kinds**: structured extraction separates fact from opinion from assumption. Triage separates reply from delegate from postpone from ignore. **Classifying turns a pile into decisions.**
2. **The other party’s perspective**: the persuasion prompt starts “with what matters to them, not to me”. The assignment text states what the delegate needs to work independently.
3. **A mandatory order of thinking**: the master prompt imposes analyse → organise → options → steps — the same order as the daily cycle. It prevents jumping to the solution; you’ll see a stronger version in [[l:u1-scenarios|the master strategic prompt]] {p11}.

## Process analysis: the seed of automation
Asking “what can be fully automated and what can only be simplified” is the first step towards [[l:u1-macro|the final leap]] and [[l:u5-system|the system]]: you start seeing your work as improvable steps.`),
      practice: L(`## حالة: تفويض في إدارة المخازن
**المهمة:** جرد ربع سنوي لمخزن قطع الغيار، تُفوَّض لمشرف جديد.
**نص التكليف الجيد (بعد البرومبت) يحدد:**
- **النتيجة**: كشف جرد مطابق للنظام، والفروقات أكثر من ٢٪ موضحة بالأسباب.
- **الصلاحيات وحدودها**: يستطيع إيقاف الصرف يومين؛ لا يستطيع تسوية الفروقات في النظام.
- **الموعد**: الخميس ٣ م.
- **معيار القبول**: الكشف موقّع من أمين المخزن.
- **نقاط الرجوع**: أي فرق في صنف قيمته أعلى من ٥٠ ألف جنيه.

## حالة: استخراج منظم من عقد مورد
الصق العقد واطلب الاستخراج. القيمة الكبرى في عمود «حقيقة / رأي / افتراض»: «التسليم خلال ٣٠ يومًا» حقيقة في العقد، و«المورد ملتزم دائمًا» رأي من المندوب.`,
        `## Case: delegation in warehouse management
**Task:** a quarterly count of the spare-parts store, delegated to a new supervisor.
**A good assignment (after the prompt) states:**
- **Result**: a count sheet matching the system, with differences above 2% explained.
- **Authority and limits**: may freeze issues for two days; may not adjust differences in the system.
- **Deadline**: Thursday 3 pm.
- **Acceptance criterion**: sheet signed by the storekeeper.
- **Check-back points**: any difference on an item worth more than 50,000 EGP.

## Case: structured extraction from a supplier contract
Paste the contract and ask for extraction. The big value is in the “fact / opinion / assumption” column: “delivery within 30 days” is a fact in the contract; “the supplier is always reliable” is the sales rep’s opinion.`),
      adv: L(`## متى لا تكفي هذه البرومبتات؟
- **الإقناع ليس تلاعبًا**: البرومبت يحسّن العرض، لكن لا تطلب مبالغة في المنفعة أو إخفاء العيوب؛ الثقة أهم من رسالة واحدة.
- **تقرير المتابعة يحتاج أرقامًا صحيحة**: إن كانت «الخطة» و«الإنجاز» من ذاكرتك فقد يبني تقريرًا مقنعًا على أرقام غير دقيقة. انسخها من المصدر.
- **الفرز يحتاج قواعدك**: «ما يمكن تجاهله» يختلف بين وظيفة وأخرى. أعطه قاعدتين أو ثلاثًا من خبرتك.

## الربط بالبرومبت الشامل
البرومبت الشامل للإنتاجية مفيد حين لا تعرف من أين تبدأ، لكنه **ليس بديلًا** عن البرومبتات المتخصصة. استخدمه للخروج من التشتت، ثم انتقل للبرومبت المتخصص عندما يتضح نوع المهمة. الفهرس السريع في الكتاب يساعدك على هذا الاختيار {p15}.`,
        `## When are these prompts not enough?
- **Persuasion isn’t manipulation**: the prompt improves the pitch, but don’t ask it to exaggerate benefits or hide flaws; trust beats one message.
- **A follow-up report needs correct numbers**: if the “plan” and “delivery” come from memory, it may build a convincing report on inaccurate numbers. Copy them from the source.
- **Triage needs your rules**: what “can be ignored” differs by job. Give it two or three rules from experience.

## Linking to the master prompt
The master productivity prompt helps when you don’t know where to start, but it’s **not a substitute** for the specialised prompts. Use it to escape confusion, then switch to the specialised prompt once the task type is clear. The book’s quick index helps you choose {p15}.`),
    },
    card: {
      what: L("برومبتات الكتابة والإقناع والاستخراج والمتابعة وتحسين العمليات والتفويض والفرز، والبرومبت الشامل {p9-10}.", "Prompts for writing, persuasion, extraction, follow-up, process improvement, delegation, triage, and the master prompt {p9-10}."),
      why: L("لأن معظم يوم العمل مواقف متكررة من هذه الأنواع.", "Because most of the workday is recurring situations of these kinds."),
      how: L("تصنيف الأنواع + منظور الطرف الآخر + ترتيب إلزامي للتفكير.", "Classifying kinds + the other party’s perspective + a mandatory thinking order."),
      inside: L("كل برومبت يفرض بنية تحوّل النص الحر إلى مخرج قابل للاستخدام.", "Each prompt imposes a structure turning free text into a usable output."),
      relation: L("يستكمل القسم الثاني ويمهد للقسم الاستراتيجي والأتمتة.", "Completes section 2 and prepares strategy and automation."),
      example: L("تكليف جرد بصلاحيات وحدود ومعيار قبول ونقاط رجوع.", "A stock-count assignment with authority, limits, acceptance and check-back points."),
      apply: L("استخدم الفرز السريع على بريد اليوم، وقِس الوقت الموفّر.", "Use quick triage on today’s inbox and measure time saved."),
      mistakes: L("بناء تقرير متابعة على أرقام من الذاكرة، أو طلب إقناع مبالغ فيه.", "Building a follow-up report on remembered numbers, or over-the-top persuasion."),
      check: L("هل تختار البرومبت المناسب لكل موقف من الستة دون الرجوع للقائمة؟", "Can you pick the right prompt for each of the six situations without the list?"),
      next: L("القسم الثالث: البرومبتات الاستراتيجية للفهم والتحليل والقرار.", "Section 3: strategic prompts for understanding, analysis and decisions."),
    },
    keys: L(["الإقناع: ابدأ بما يهمه هو، ومنفعة واضحة، وخطوة واحدة سهلة {p9}.", "الاستخراج المنظم: افصل الحقيقة عن الرأي عن الافتراض.", "تحسين العمليات: حدد ما يُؤتمت بالكامل وما يُبسّط فقط.", "التفويض: نتيجة، صلاحيات وحدود، موعد، معيار قبول، نقاط رجوع.", "دورة العمل: افهم ← نظّم ← قرّر ← نفّذ ← راجع {p10}."],
      ["Persuasion: start with what matters to them, a clear benefit, one easy step {p9}.", "Structured extraction: separate fact from opinion from assumption.", "Process improvement: say what can be fully automated vs only simplified.", "Delegation: result, authority and limits, deadline, acceptance criterion, check-back points.", "Daily cycle: understand → organise → decide → execute → review {p10}."]),
    scene: "daily-cycle", prompts: ["u1-p-message", "u1-p-persuade", "u1-p-extract", "u1-p-followup-report", "u1-p-process", "u1-p-delegate", "u1-p-nudge", "u1-p-triage", "u1-p-master-prod"],
    quick: [
      { q: L("ما «الأهم» في برومبت الاستخراج المنظم حسب الكتاب؟", "What is “most important” in the structured-extraction prompt?"), opts: L(["ترتيب الجدول أبجديًا", "التفرقة بين الحقيقة المؤكدة والرأي والافتراض", "استخراج الأسماء فقط", "طول الملخص"], ["Alphabetical order", "Separating confirmed fact, opinion and assumption", "Extracting names only", "Summary length"]), a: 1, why: L("«ثم — وهذا هو الأهم — فرّق بوضوح بين ما هو حقيقة مؤكدة، وما هو رأي، وما هو افتراض» {p9}.", "“Then — and this is most important — clearly separate confirmed fact, opinion and assumption” {p9}.") },
      { type: "order", q: L("رتّب دورة العمل اليومية:", "Order the daily work cycle:"), items: L(["افهم", "نظّم", "قرّر", "نفّذ", "راجع"], ["Understand", "Organise", "Decide", "Execute", "Review"]), why: L("دورة العمل اليومية في الكتاب {p10}: افهم ← نظّم ← قرّر ← نفّذ ← راجع.", "The book’s daily cycle {p10}: understand → organise → decide → execute → review.") },
    ],
    related: ["u1-day", "u1-think", "u5-system"], req: ["u1-day"], terms: ["done-criterion", "acceptance-criterion"],
  });
})();
