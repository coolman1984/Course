/* Unit 2 — Guide 2, pages 17–23: building work tools and systems with Python on Windows. */
(function () {
  const L = (ar, en) => ({ ar, en });

  ACAD.L({
    id: "u2-principles", unit: "u2", pages: [17], icon: "📐", diff: 2, mins: 11, tags: ["python", "automation"],
    title: L("ثلاث أفكار تحكم كل شيء، ومواصفة المهمة بخمسة عناصر", "Three governing ideas, and the five-element task spec"),
    hook: L("المهارة ليست كتابة الكود، بل وصف العملية كما تشرحها لموظف جديد — والاختبارات هي العنصر الأهم.", "The skill isn’t writing code but describing the process as you would to a new employee — and tests are the most important element."),
    book: L(`**الملخص التنفيذي** {p17}: أصبح بإمكان أي موظف — دون خلفية برمجية — أن يطلب من الذكاء الاصطناعي بناء أداة **بايثون** (لغة برمجة سهلة القراءة نسبيًا) تنفذ مهمة متكررة على جهازه، ثم تحلل نتائجها، ثم تعرضها في تقرير تفاعلي يفتحه أي زميل بنقرة واحدة. **المهارة المطلوبة ليست تعلم البرمجة، بل وصف العملية وصفًا دقيقًا وقابلًا للتنفيذ.**

**ثلاث أفكار تحكم كل ما يلي:**
- **المبدأ**: كل ما يحتاجه الذكاء الاصطناعي هو أن تشرح له المهمة كما تشرحها لموظف جديد.
- **البنية**: ثلاثة مستويات متتابعة: أتمتة التشغيل، ثم التحليل، ثم العرض الإداري. كل مستوى يعتمد فعليًا على مخرجات الذي قبله.
- **الحد الفاصل**: لا تُبنى أداة إلا لمهمة **متكررة، وذات قواعد ثابتة، ونتيجة يمكن التحقق منها**. أي مهمة لا تحقق الشروط الثلاثة تظل أسرع باليد.

**مواصفة المهمة: خمسة عناصر قبل كتابة أي سطر** — أهم خطوة في المشروع كله، وأسهلها تجاهلًا. كل عنصر ناقص هنا يتحول لاحقًا إلى مشكلة حقيقية في الأداة:
1. **المشكلة**: ما الذي يُنفَّذ يدويًا اليوم، وكم وقتًا يستغرق بالدقائق أو الساعات، لا بالتقدير التقريبي؟
2. **المدخلات**: الملفات والمصادر المستخدمة فعليًا: أسماؤها، وأماكنها، وبنيتها الحقيقية لا الشكل المثالي المتوقع.
3. **القواعد**: منطق العمل كما يُطبَّق فعليًا على الأرض، مع كل استثناء وحالة نقص قد تحدث.
4. **النتيجة**: الشكل النهائي الدقيق للمخرج، ومكانه، ومن سيستقبله ويستخدمه بعد كل تشغيل.
5. **الاختبارات**: حالات محددة تثبت أن الناتج صحيح فعليًا — **وهذا العنصر هو الأهم بين الخمسة جميعًا**.

غياب العنصر الخامس هو السبب الأشيع لفشل الأدوات المبنية بمساعدة الذكاء الاصطناعي: الأداة تعمل ظاهريًا، لكن لا أحد يعرف متى تكون نتيجتها خاطئة. **تحديد الاختبارات قبل البناء** يحوّل «كودًا يبدو صحيحًا» إلى أداة يُعتمد عليها فعليًا في دورة تشغيل شهرية.`,
      `**Executive summary** {p17}: any employee — with no programming background — can now ask AI to build a **Python** tool (a relatively readable programming language) that performs a repetitive task on their machine, then analyses the results, then presents them in an interactive report any colleague opens in one click. **The required skill isn’t learning to program; it’s describing the process precisely and executably.**

**Three ideas that govern everything after:**
- **Principle**: all AI needs is for you to explain the task as you would to a new employee.
- **Structure**: three sequential levels: run automation, then analysis, then the management presentation. Each level truly depends on the previous level’s outputs.
- **Boundary**: a tool is built only for a task that is **repetitive, has stable rules, and has a verifiable result**. Any task failing the three conditions stays faster by hand.

**The task spec: five elements before writing a single line** — the most important step of the whole project, and the easiest to skip. Every missing element here later becomes a real problem in the tool:
1. **Problem**: what is done by hand today, and how long it takes in minutes or hours — not a rough guess.
2. **Inputs**: the files and sources actually used: their names, locations and real structure, not the ideal expected shape.
3. **Rules**: the business logic as actually applied on the ground, with every exception and missing-data case that can happen.
4. **Output**: the exact final form of the output, where it goes, and who receives and uses it after each run.
5. **Tests**: specific cases proving the output is really correct — **the most important of all five**.

Missing the fifth element is the commonest reason AI-assisted tools fail: the tool seems to work, but nobody knows when its result is wrong. **Defining the tests before building** turns “code that looks right” into a tool you can rely on in a monthly run cycle.`),
    levels: {
      simple: L(`تخيّل أنك تكتب **وصفة طبخ** لشخص لم يدخل مطبخك أبدًا. لن تكتب «اعمل الأكلة المعتادة»، بل: المكونات (المدخلات)، والخطوات بالترتيب ومتى تزود الملح (القواعد والاستثناءات)، وشكل الطبق النهائي (النتيجة)، و**كيف تعرف أنها استوت** (الاختبارات).

الذكاء الاصطناعي هو هذا الطاهي الجديد: ماهر جدًا، لكنه لا يعرف مطبخك. ومواصفة المهمة هي الوصفة.

**والأهم:** بدون «كيف أعرف أنها استوت؟»، ستأكل الطبق دون أن تعرف إن كان صالحًا. هذا هو عنصر الاختبارات.`,
        `Imagine writing a **recipe** for someone who has never been in your kitchen. You wouldn’t write “make the usual dish” but: ingredients (inputs), steps in order and when to add salt (rules and exceptions), what the final dish looks like (output), and **how to tell it’s done** (tests).

AI is that new cook: very skilled, but it doesn’t know your kitchen. The task spec is the recipe.

**Most importantly:** without “how do I know it’s done?”, you’ll eat the dish without knowing whether it’s safe. That’s the tests element.`),
      mech: L(`## لماذا تتحول العناصر الناقصة إلى مشكلات؟
| العنصر الناقص | ما يحدث في الأداة |
|---|---|
| المشكلة بلا قياس | لا تعرف إن كانت الأداة وفّرت وقتًا فعلًا |
| المدخلات «المثالية» | الأداة تنكسر أول ما يصلها الملف الحقيقي بأعمدته الغريبة |
| القواعد بلا استثناءات | تنجح ٩٠٪ من الوقت وتفشل بصمت في الـ١٠٪ |
| النتيجة غير محددة | مخرج صحيح في المكان الخطأ أو بالشكل الخطأ |
| بلا اختبارات | **لا أحد يعرف متى تكون النتيجة خاطئة** |

## لماذا ثلاثة مستويات متتابعة؟
**التشغيل** ينتج بيانات منظمة، و**التحليل** يستخرج منها معنى، و**العرض** يحوّل المعنى إلى قرار. لو بدأت بالعرض، ستعرض أرقامًا لم تُفحص؛ ولو بدأت بالتحليل، ستحلل بيانات تُجمع يدويًا بأخطاء النسخ واللصق.

## الحد الفاصل: ثلاثة شروط
متكررة + قواعد ثابتة + نتيجة قابلة للتحقق. جرّبها على مهامك في [[lab:compass|مختبر البوصلة]].`,
        `## Why do missing elements become problems?
| Missing element | What happens in the tool |
|---|---|
| Problem not measured | you can’t tell whether the tool saved time |
| “Ideal” inputs | the tool breaks as soon as the real file with odd columns arrives |
| Rules without exceptions | works 90% of the time, fails silently in the other 10% |
| Output not defined | a correct output in the wrong place or format |
| No tests | **nobody knows when the result is wrong** |

## Why three sequential levels?
**Running** produces organised data, **analysis** extracts meaning, and **presentation** turns meaning into a decision. Start with presentation and you show unchecked numbers; start with analysis and you analyse data gathered by hand with copy-paste errors.

## The boundary: three conditions
Repetitive + stable rules + verifiable result. Try them on your tasks in [[lab:compass|the compass lab]].`),
      practice: L(`## مواصفة كاملة لمهمة حقيقية الشكل
**المهمة:** تجميع مبيعات أربعة فروع في تقرير أسبوعي.
1. **المشكلة:** كل أحد، فتح ٤ ملفات ونسخها في ملف واحد وحساب الإجماليات: ٩٠ دقيقة.
2. **المدخلات:** مجلد \`data\` فيه \`القاهرة.xlsx\` و\`الجيزة.xlsx\` و\`الإسكندرية.xlsx\` و\`المنصورة.xlsx\`، وكل ملف فيه أعمدة: التاريخ، المنتج، الكمية، السعر. (ملف الإسكندرية أحيانًا يكتب «السعر» باسم «سعر الوحدة».)
3. **القواعد:** الإجمالي = الكمية × السعر؛ المرتجعات بكمية سالبة تُطرح؛ الأيام بلا مبيعات تظهر صفرًا لا تُحذف.
4. **النتيجة:** ملف \`output/تقرير_الأسبوع.xlsx\` بورقة لكل فرع وورقة ملخص، يُرسل لمدير المبيعات.
5. **الاختبارات:** (أ) أسبوع معروف إجماليه يدويًا = ٤١٢٬٣٥٠ — (ب) ملف ناقص فرع ⇐ رسالة واضحة — (ج) عمود باسم مختلف ⇐ يُكتشف ولا يُتجاهل — (د) مرتجع ⇐ يُطرح — (هـ) تشغيل مرتين ⇐ الملفات الأصلية لم تتغير.

*الأرقام افتراضية للتوضيح.*`,
        `## A full spec for a realistic task
**Task:** combine four branches’ sales into a weekly report.
1. **Problem:** every Sunday, open 4 files, copy them into one, compute totals: 90 minutes.
2. **Inputs:** a \`data\` folder with \`Cairo.xlsx\`, \`Giza.xlsx\`, \`Alexandria.xlsx\`, \`Mansoura.xlsx\`; columns: date, product, quantity, price. (Alexandria sometimes names “price” as “unit price”.)
3. **Rules:** total = quantity × price; returns with negative quantity are subtracted; days without sales show zero, not deleted.
4. **Output:** \`output/weekly_report.xlsx\` with one sheet per branch and a summary sheet, sent to the sales manager.
5. **Tests:** (a) a known week whose manual total = 412,350 — (b) a missing branch file ⇒ a clear message — (c) a differently named column ⇒ detected, not ignored — (d) a return ⇒ subtracted — (e) run twice ⇒ original files unchanged.

*Hypothetical numbers for illustration.*`),
      adv: L(`## حدود الأداة المبنية بالذكاء الاصطناعي
- **الكود الذي «يبدو صحيحًا» خطر خاص**: لأنه نظيف ومرتب ومشروح، يُصدَّق أسرع. الاختبارات المحددة مسبقًا هي الحماية الوحيدة.
- **من يملك الأداة؟** أداة يفهمها شخص واحد تصبح «اعتمادًا مركزًا على شخص واحد»، وهي إشارة سيذكرها الكتاب لاحقًا للانتقال لمنصة {p20}. لذلك «توثيق في صفحة واحدة» شرط تشغيل {p18}.
- **المواصفة تتغير**: عندما تتغير القواعد، حدّث المواصفة أولًا ثم اطلب التعديل، وأخبر الذكاء الاصطناعي بأي فرضية غيّرتها، كما في برومبت المتابعة بعد أول تشغيل {p19}.

## لماذا «بالدقائق لا بالتقدير»؟
لأن قرار البناء نفسه (هل تستحق المهمة أداة؟) يعتمد على هذا الرقم، كما سترى في [[l:u2-compass|بوصلة القرار]]. والرقم الدقيق هو أيضًا ما ستعرضه على الإدارة لاحقًا لإثبات القيمة.`,
        `## Limits of AI-built tools
- **Code that “looks right” is a special danger**: because it’s clean, tidy and explained, it’s believed faster. Tests defined in advance are the only protection.
- **Who owns the tool?** A tool only one person understands becomes “dependence concentrated on one person” — a signal the book later lists for moving to a platform {p20}. Hence “one-page documentation” is a run control {p18}.
- **Specs change**: when rules change, update the spec first, then request the change, and tell the AI which assumption you changed, as in the first-run follow-up prompt {p19}.

## Why “in minutes, not a guess”?
Because the build decision itself (does the task deserve a tool?) depends on that number, as you’ll see in [[l:u2-compass|the decision compass]]. And the precise number is what you’ll later show management to prove value.`),
    },
    card: {
      what: L("مبدأ (الوصف لا الكود) + بنية (تشغيل ← تحليل ← عرض) + حد فاصل (متكررة، ثابتة، قابلة للتحقق) + مواصفة بخمسة عناصر {p17}.", "A principle (description not code) + structure (run → analyse → present) + boundary (repetitive, stable, verifiable) + a five-element spec {p17}."),
      why: L("لأن كل عنصر ناقص في المواصفة يصبح مشكلة حقيقية في الأداة.", "Because every missing spec element becomes a real problem in the tool."),
      how: L("تكتب المشكلة والمدخلات والقواعد والنتيجة والاختبارات قبل أي سطر كود.", "You write problem, inputs, rules, output and tests before any code."),
      inside: L("الاختبارات تحوّل «كودًا يبدو صحيحًا» إلى أداة يُعتمد عليها.", "Tests turn “code that looks right” into a dependable tool."),
      relation: L("تكمل البرومبت الذهبي للكود في الدليل الأول بمستوى أعمق.", "Takes Guide 1’s golden code prompt to a deeper level."),
      example: L("تجميع ٤ فروع: ٩٠ دقيقة يدويًا، و٥ اختبارات منها ملف ناقص وعمود بأسم مختلف.", "Combining 4 branches: 90 minutes by hand, 5 tests including a missing file and a renamed column."),
      apply: L("اكتب مواصفة بخمسة عناصر لأصغر مهمة متكررة عندك.", "Write a five-element spec for your smallest repetitive task."),
      mistakes: L("وصف المدخلات «المثالية» بدل الحقيقية، وتأجيل الاختبارات لما بعد البناء.", "Describing “ideal” inputs instead of real ones; deferring tests until after building."),
      check: L("هل تستطيع كتابة ٣ حالات اختبار لمهمتك قبل أن تطلب الكود؟", "Can you write 3 test cases for your task before requesting code?"),
      next: L("بوصلة القرار: متى تستحق المهمة أداة؟", "The decision compass: when does a task deserve a tool?"),
    },
    keys: L(["المهارة: وصف العملية بدقة كما تشرحها لموظف جديد {p17}.", "ثلاثة مستويات متتابعة: تشغيل ← تحليل ← عرض إداري.", "الحد الفاصل: متكررة + قواعد ثابتة + نتيجة قابلة للتحقق.", "المواصفة: المشكلة، المدخلات، القواعد، النتيجة، الاختبارات.", "الاختبارات أهم عنصر: حددها قبل البناء."],
      ["The skill: describe the process precisely, as to a new employee {p17}.", "Three sequential levels: run → analyse → management presentation.", "The boundary: repetitive + stable rules + verifiable result.", "The spec: problem, inputs, rules, output, tests.", "Tests are the key element: define them before building."]),
    scene: "task-spec", prompts: ["u2-p-spec"],
    quick: [
      { q: L("أي عناصر المواصفة الخمسة يعتبره الكتاب الأهم؟", "Which of the five spec elements does the book call the most important?"), opts: L(["المشكلة", "القواعد", "النتيجة", "الاختبارات"], ["Problem", "Rules", "Output", "Tests"]), a: 3, why: L("«وهذا العنصر هو الأهم بين الخمسة جميعًا»؛ غيابه السبب الأشيع لفشل الأدوات {p17}.", "“This element is the most important of all five”; its absence is the commonest cause of tool failure {p17}.") },
      { q: L("مهمة تتغير قواعدها في كل مرة. ماذا يقول الحد الفاصل؟", "A task whose rules change every time. What does the boundary say?"), opts: L(["ابنِ أداة متقدمة", "تظل أسرع باليد لأنها لا تحقق شرط الثبات", "استخدم ماكرو", "اطلب من الذكاء الاصطناعي أن يخمن القواعد"], ["Build an advanced tool", "It stays faster by hand because it fails the stability condition", "Use a macro", "Let AI guess the rules"]), a: 1, why: L("الأداة تُبنى فقط لمهمة متكررة، ثابتة القواعد، ونتيجتها قابلة للتحقق؛ وإلا «تظل أسرع باليد» {p17}.", "A tool is built only for a repetitive, rule-stable, verifiable task; otherwise it “stays faster by hand” {p17}.") },
    ],
    related: ["u1-macro", "u2-compass", "u2-project"], req: ["u1-macro"], terms: ["python", "task-spec", "test-case"],
  });

  ACAD.L({
    id: "u2-compass", unit: "u2", pages: [17, 18], icon: "🧭", diff: 2, mins: 10, tags: ["automation"],
    title: L("بوصلة القرار وقواعد تحمي الأداة من إعادة البناء", "The decision compass and rules that protect the tool from rebuilds"),
    hook: L("أربعة أسئلة تحدد هل الأتمتة تستحق الوقت، وأربع قواعد تجعل الأداة تصمد.", "Four questions decide whether automation is worth the time, and four rules make the tool last."),
    book: L(`**بوصلة القرار: متى تستحق المهمة أداة؟** {p17} — قبل أي طلب للذكاء الاصطناعي، أربعة أسئلة:
- **التكرار**: تُنفَّذ أسبوعيًا أو أكثر، أو شهريًا لكنها تستغرق ساعات كاملة.
- **الثبات**: قواعدها لا تتغير في كل مرة، والاستثناءات محدودة ويمكن حصرها جميعًا مسبقًا.
- **كلفة الخطأ اليدوي**: النسخ واللصق يُنتج أخطاء صامتة لا تُكتشف إلا بعد فوات الوقت.
- **قابلية التحقق**: يمكن مقارنة ناتج الأداة بناتج يدوي معروف، ولو لمرة واحدة فقط.

**قواعد هندسية تحمي الأداة من إعادة البناء** {p17-18}:
- **لا تُمَسّ البيانات الأصلية**: كل معالجة تُكتب في نسخة أو مجلد ناتج منفصل، فلا خطر على الملف الأصلي مهما حدث خطأ.
- **سجل تشغيل مكتوب**: ماذا قُرئ، وكم صفًا، وما الذي استُبعد ولماذا، وزمن التنفيذ — سطر واحد يوضح كل تشغيل بدقة.
- **وحدات صغيرة مستقلة**: قراءة، ثم تنظيف، ثم تحليل، ثم إخراج — أربع خطوات منفصلة يسهل اختبار كل منها وتعديلها بمفردها.
- **الفشل الصريح أفضل من النجاح الصامت**: عند بنية ملف غير متوقعة، يتوقف التنفيذ برسالة واضحة، بدل إنتاج تقرير يبدو صحيحًا وهو خاطئ فعليًا.`,
      `**The decision compass: when does a task deserve a tool?** {p17} — before any request to AI, four questions:
- **Repetition**: done weekly or more, or monthly but taking whole hours.
- **Stability**: its rules don’t change each time, and the exceptions are limited and can all be listed in advance.
- **Cost of manual error**: copy-paste produces silent errors discovered only when it’s too late.
- **Verifiability**: the tool’s output can be compared with a known manual result, even just once.

**Engineering rules that protect the tool from being rebuilt** {p17-18}:
- **Never touch the original data**: every operation writes to a copy or a separate output folder, so the original file is safe whatever goes wrong.
- **A written run log**: what was read, how many rows, what was excluded and why, and run time — one line explaining each run precisely.
- **Small independent units**: read, then clean, then analyse, then output — four separate steps, each easy to test and change on its own.
- **Explicit failure beats silent success**: on an unexpected file structure, execution stops with a clear message instead of producing a report that looks right but is actually wrong.`),
    levels: {
      simple: L(`قبل أن تشتري ماكينة غسيل أطباق، تسأل: كم مرة أغسل أطباقًا؟ هل الأطباق متشابهة؟ هل أكسر أطباقًا وأنا أغسل يدويًا؟ هل أستطيع أن أرى إن كانت نظيفة؟ لو كانت الإجابات «نعم»، فالماكينة تستحق.

البوصلة تسأل نفس الأسئلة عن أي مهمة في شغلك.

والقواعد الأربع هي **عادات الأمان**: لا تلمس الأصل، واكتب ماذا حدث، وقسّم الشغل لقطع، ولو فيه مشكلة **قف وقل** بدل ما تكمل وتخبي.`,
        `Before buying a dishwasher you ask: how often do I wash dishes? are they similar? do I break dishes washing by hand? can I see whether they’re clean? If the answers are “yes”, the machine is worth it.

The compass asks the same questions about any task at work.

And the four rules are **safety habits**: don’t touch the original, write down what happened, split the work into pieces, and if there’s a problem, **stop and say so** rather than carry on and hide it.`),
      mech: L(`## الحساب وراء البوصلة
الوقت الموفّر أسبوعيًا = عدد المرات × الدقائق × نسبة ما يُؤتمت. ونقطة التعادل = وقت البناء ÷ الوقت الموفّر أسبوعيًا. لكن الأرقام وحدها لا تكفي: مهمة قواعدها متغيرة تحتاج **إعادة بناء** مستمرة، فتأكل كل الوقت الموفّر. جرّب الحساب في [[lab:compass|مختبر البوصلة]].

## لماذا «الفشل الصريح» أفضل؟
لأن ثمن الخطأ ليس في الأداة بل **في القرار** الذي يُتخذ على نتيجتها. أداة تتوقف وتقول «العمود السعر غير موجود» تكلف دقيقة. أداة تكمل وتحسب على عمود فارغ تكلف قرارًا خاطئًا. شاهد الفرق في [[lab:pipeline|مختبر سلسلة التشغيل]].

## لماذا الوحدات الصغيرة؟
عندما يحدث خطأ، تعرف فورًا في أي مرحلة (قراءة؟ تنظيف؟ تحليل؟ إخراج؟)، وتطلب من الذكاء الاصطناعي إصلاح تلك الوحدة فقط بدل إعادة كتابة كل شيء — نفس قاعدة «وحدات صغيرة لا وحش ضخم» في الماكرو {p14}.`,
        `## The arithmetic behind the compass
Weekly time saved = times × minutes × share automated. Break-even = build time ÷ weekly time saved. But numbers alone aren’t enough: a task with shifting rules needs constant **rebuilding**, eating all the saved time. Try the calculation in [[lab:compass|the compass lab]].

## Why is “explicit failure” better?
Because the cost of an error isn’t in the tool but **in the decision** made on its result. A tool that stops and says “column price not found” costs a minute. A tool that carries on and computes on an empty column costs a wrong decision. See the difference in [[lab:pipeline|the pipeline lab]].

## Why small units?
When something breaks you know immediately which stage (read? clean? analyse? output?) and ask AI to fix that unit only instead of rewriting everything — the same “small units, not a monster” rule as for macros {p14}.`),
      practice: L(`## تطبيق البوصلة على ثلاث مهام
| المهمة | التكرار | الثبات | كلفة الخطأ | التحقق | القرار |
|---|---|---|---|---|---|
| تجميع مبيعات ٤ فروع أسبوعيًا | ✅ | ✅ | ✅ عالية | ✅ | **ابنِ أداة** |
| تقرير سنوي لمجلس الإدارة | ❌ مرة في السنة | ⚠️ يتغير | ✅ | ✅ | يدوي + برومبتات |
| الرد على شكاوى متنوعة | ✅ | ❌ كل حالة مختلفة | ⚠️ | ❌ | برومبت مساعد لا أداة |

## سجل التشغيل: مثال سطر واحد
\`2026-10-12 09:03 · قرأ 4 ملفات · 1,184 صفًا · استبعد 6 (تاريخ فارغ) · الزمن 3.4 ث · output/تقرير_الأسبوع.xlsx\`

هذا السطر يجيب بعد شهر عن السؤال: «ليه رقم الأسبوع ده أقل؟».`,
        `## Applying the compass to three tasks
| Task | Repetition | Stability | Error cost | Verifiable | Decision |
|---|---|---|---|---|---|
| Combining 4 branches’ sales weekly | ✅ | ✅ | ✅ high | ✅ | **build a tool** |
| Annual board report | ❌ once a year | ⚠️ changes | ✅ | ✅ | manual + prompts |
| Answering varied complaints | ✅ | ❌ each case differs | ⚠️ | ❌ | a helper prompt, not a tool |

## The run log: a one-line example
\`2026-10-12 09:03 · read 4 files · 1,184 rows · excluded 6 (blank date) · 3.4 s · output/weekly_report.xlsx\`

That line answers, a month later, the question: “why is this week’s number lower?”`),
      adv: L(`## متى تخدعك البوصلة؟
- **التكرار المخفي**: مهمة «شهرية» لكنها تُعاد ثلاث مرات كل شهر بسبب التعديلات = أسبوعية فعليًا.
- **الثبات الظاهري**: القواعد تبدو ثابتة لأن شخصًا واحدًا يطبقها «من دماغه». اكتب الاستثناءات أولًا؛ إن لم تستطع حصرها، فالشرط غير متحقق.
- **قابلية التحقق ولو مرة**: حتى لو كانت النتيجة «صعبة التحقق»، مقارنة شهر واحد يدويًا رقمًا برقم كافية للبدء {p22}.

## القواعد الأربع ليست للمبرمجين فقط
هي نفسها مبادئ [[l:u4-backend|الواجهة الخلفية]] {p29} و[[l:u5-system|النظام]] {p37}: لا تمس الأصل، وسجل، وفصل المسؤوليات، وفشل صريح. **الكتاب يكرر نفس الهندسة على كل مستوى** لأن هذه هي الطريقة التي تبني بها شيئًا يُوثق به.`,
        `## When does the compass mislead you?
- **Hidden repetition**: a “monthly” task redone three times a month due to edits = effectively weekly.
- **Apparent stability**: rules look stable because one person applies them “from memory”. Write the exceptions down first; if you can’t list them, the condition isn’t met.
- **Verifiable even once**: even if the result is “hard to check”, comparing one month by hand number by number is enough to start {p22}.

## The four rules aren’t only for programmers
They’re the same principles as [[l:u4-backend|the back end]] {p29} and [[l:u5-system|the system]] {p37}: don’t touch the original, log, separate responsibilities, fail explicitly. **The book repeats the same engineering at every level** because that’s how you build something trustworthy.`),
    },
    card: {
      what: L("أربعة أسئلة (تكرار، ثبات، كلفة خطأ، تحقق) وأربع قواعد (لا تمس الأصل، سجل، وحدات، فشل صريح) {p17-18}.", "Four questions (repetition, stability, error cost, verifiability) and four rules (don’t touch originals, log, units, explicit failure) {p17-18}."),
      why: L("لتبني أدوات تستحق وتصمد بدل أدوات تُعاد كل شهر.", "To build tools that are worth it and last, instead of tools rebuilt monthly."),
      how: L("احسب الوقت الموفّر ونقطة التعادل، ثم طبّق القواعد في التصميم.", "Compute saved time and break-even, then apply the rules in the design."),
      inside: L("الفشل الصريح ينقل الخطأ من قرار الإدارة إلى رسالة واضحة في السجل.", "Explicit failure moves the error from a management decision to a clear log message."),
      relation: L("تحويل أخطاء الدليل الأول الأربعة إلى قواعد هندسية.", "Turns Guide 1’s four mistakes into engineering rules."),
      example: L("سجل: «قرأ ٤ ملفات، استبعد ٦ صفوف بتاريخ فارغ».", "Log: “read 4 files, excluded 6 rows with a blank date”."),
      apply: L("طبّق الأسئلة الأربعة على ثلاث مهام عندك واختر واحدة.", "Apply the four questions to three of your tasks and pick one."),
      mistakes: L("أتمتة مهمة متغيرة القواعد، وأداة تكمل بصمت عند ملف غريب.", "Automating a shifting task; a tool that silently continues on an odd file."),
      check: L("هل تشرح لماذا الفشل الصريح أرخص من النجاح الصامت؟", "Can you explain why explicit failure is cheaper than silent success?"),
      next: L("المستوى الأول: أتمتة التشغيل وأدواتها.", "Level 1: run automation and its tools."),
    },
    keys: L(["تستحق الأداة إذا: تكررت، وثبتت قواعدها، وكان الخطأ اليدوي مكلفًا، وأمكن التحقق {p17}.", "لا تُمس البيانات الأصلية: الناتج في مجلد منفصل.", "سجل تشغيل: ماذا قُرئ، وكم، وما استُبعد ولماذا، والزمن.", "وحدات مستقلة: قراءة ← تنظيف ← تحليل ← إخراج {p18}.", "الفشل الصريح أفضل من النجاح الصامت."],
      ["A tool is worth it if: repetitive, rule-stable, costly manual errors, verifiable {p17}.", "Never touch the original data: output goes to a separate folder.", "A run log: what was read, how much, what was excluded and why, run time.", "Independent units: read → clean → analyse → output {p18}.", "Explicit failure beats silent success."]),
    lab: ["compass", "pipeline"],
    quick: [
      { q: L("ملف وصل بعمود مفقود. ماذا تفعل الأداة الجيدة حسب الكتاب؟", "A file arrives with a missing column. What does a good tool do, per the book?"), opts: L(["تكمل وتحسب على باقي الأعمدة", "تتوقف برسالة واضحة بدل إنتاج تقرير يبدو صحيحًا", "تحذف الملف", "تخمّن قيم العمود"], ["Continue and compute on the remaining columns", "Stop with a clear message instead of a right-looking report", "Delete the file", "Guess the column’s values"]), a: 1, why: L("«الفشل الصريح أفضل من النجاح الصامت» {p18}.", "“Explicit failure beats silent success” {p18}.") },
      { q: L("أي مما يلي ليس من أسئلة بوصلة القرار؟", "Which is NOT one of the compass questions?"), opts: L(["التكرار", "الثبات", "شهرة الأداة المستخدمة", "قابلية التحقق"], ["Repetition", "Stability", "How famous the tool is", "Verifiability"]), a: 2, why: L("الأسئلة الأربعة: التكرار، والثبات، وكلفة الخطأ اليدوي، وقابلية التحقق {p17}.", "The four: repetition, stability, cost of manual error, verifiability {p17}.") },
    ],
    related: ["u2-principles", "u2-level1", "u5-system"], req: ["u2-principles"], terms: ["run-log", "explicit-failure", "automation"],
  });

  ACAD.L({
    id: "u2-level1", unit: "u2", pages: [18, 19], icon: "🤖", diff: 2, mins: 13, tags: ["python", "automation"],
    title: L("المستوى الأول: أتمتة التشغيل — الأداة المناسبة لكل طبقة", "Level 1: run automation — the right tool for each layer"),
    hook: L("ترتيب الاختيار بين الأدوات هو الفارق بين أتمتة تصمد لسنوات وأتمتة تنكسر مع أول تحديث.", "The order in which you choose tools separates automation that lasts years from automation that breaks at the first update."),
    book: L(`**المسار الكامل: ثلاثة مستويات متتابعة** {p18}: **التشغيل** (الملفات وإكسل والمتصفح وبرامج ويندوز، بجدولة تلغي التدخل اليدوي المتكرر) ← **التحليل** (استعلام مباشر على الملفات، ومعالجة سريعة، وفحص جودة تلقائي) ← **العرض** (صفحة تفاعلية واحدة تنقل القارئ من النتيجة إلى القرار في دقائق).

**خريطة الأدوات: ماذا تستخدم في كل حالة؟**
| الأداة | الدور |
|---|---|
| **Playwright** | التحكم في المتصفح: يسجل الدخول، ويعبئ النماذج، وينزّل التقارير الدورية من المواقع وبوابات الأنظمة، وينتظر ظهور كل عنصر تلقائيًا. |
| **xlwings** | التحكم في ملفات إكسل الحقيقية من داخل بايثون؛ بدل ماكرو إكسل المعقد، مع بقاء الملف كما يعرفه زملاؤك. |
| **PyAutoGUI** | المحاكاة المباشرة: يحرك الفأرة ويكتب ويطابق الصور. **الأكثر عرضة للانكسار** — لا تُستخدم إلا حين لا يوجد بديل. |
| **pywinauto** | برامج سطح المكتب عبر أزرارها وحقولها الحقيقية لا مكان ظهورها، فيعمل مع تغيّر حجم النافذة أو دقة الشاشة. |
| **watchdog** | يراقب مجلدًا ويبدأ التنفيذ لحظة وصول ملف جديد. |
| **جدولة ويندوز + PyInstaller** | الجدولة تشغّل الأداة في توقيت محدد، وPyInstaller يحولها إلى ملف واحد يعمل على جهاز أي زميل ولو بلا بايثون. |

**ترتيب الأفضلية: أيها تُجرّب أولًا؟** ١ ملف أو واجهة برمجية (الأكثر ثباتًا: تعامل مع البيانات نفسها) ← ٢ التحكم المباشر في التطبيق (xlwings، Playwright) ← ٣ عناصر واجهة البرنامج (pywinauto للبرامج المغلقة) ← ٤ محاكاة المستخدم (الملاذ الأخير، مع تدوين سبب اللجوء إليه داخل الكود). **القاعدة الحاكمة**: كلما ارتفع المستوى المختار، قلّت احتمالية الانكسار؛ والنزول لمستوى أدنى قرار واعٍ لا عادة سريعة.

**سلسلة تشغيل نموذجية بلا تدخل يدوي:** ملف جديد يصل للمجلد ← فحص البنية والأعمدة ← تنظيف وتوحيد ودمج ← حساب المؤشرات والشذوذ ← بناء التقرير وحفظه ← إشعار المعنيين بالرابط.

**ضوابط تشغيل لا غنى عنها:** تشغيل تجريبي أولًا على نسخة ومقارنته بمخرج يدوي معتمد · كلمات المرور لا تُكتب في الكود أبدًا (ملف إعدادات محمي أو خزنة النظام) · مهلة زمنية لكل خطوة ومفتاح إيقاف فوري في أتمتة الواجهات · توثيق في صفحة واحدة يكفي لتسليم الأداة لزميل.

**برومبتان جاهزان** {p19}: بناء أداة الأتمتة، والمتابعة بعد أول تشغيل حقيقي (بالأسفل).`,
      `**The full path: three sequential levels** {p18}: **running** (files, Excel, the browser and Windows programs, with scheduling that removes repeated manual work) → **analysis** (direct queries on files, fast processing, automatic quality checks) → **presentation** (one interactive page taking the reader from result to decision in minutes).

**The tool map: what to use when?**
| Tool | Role |
|---|---|
| **Playwright** | Browser control: logs in, fills forms, downloads periodic reports from websites and system portals, and waits for each element automatically. |
| **xlwings** | Controls real Excel files from Python; instead of complex Excel macros, while the file stays as colleagues know it. |
| **PyAutoGUI** | Direct simulation: moves the mouse, types and matches images. **The most breakable** — use only when no alternative exists. |
| **pywinauto** | Desktop programs via their real buttons and fields, not screen position, so it keeps working when window size or resolution changes. |
| **watchdog** | Watches a folder and starts running the moment a new file arrives. |
| **Windows scheduling + PyInstaller** | Scheduling runs the tool at a set time; PyInstaller turns it into a single file that runs on any colleague’s machine, even without Python. |

**Preference order: which to try first?** 1 a file or an API (most stable: working with the data itself) → 2 direct control of the application (xlwings, Playwright) → 3 the program’s UI elements (pywinauto for closed desktop programs) → 4 user simulation (the last resort, with the reason documented in the code). **The governing rule**: the higher the level you choose, the lower the chance of breaking; going lower must be a conscious decision, not a quick habit.

**A typical run chain with no manual step:** a new file arrives in the folder → check structure and columns → clean, unify and merge → compute KPIs and anomalies → build and save the report → notify the owners with the link.

**Essential run controls:** a trial run first on a copy, compared with an approved manual output · passwords never written in code (a protected settings file or the system vault) · a time limit per step and an instant stop switch in UI automation · one-page documentation enough to hand the tool to a colleague.

**Two ready prompts** {p19}: building the automation tool, and following up after the first real run (below).`),
    levels: {
      simple: L(`تخيّل أنك تريد معرفة رصيدك في البنك كل صباح. عندك أربع طرق:
1. **البنك يرسل لك ملفًا** بالرصيد (الأفضل: البيانات نفسها).
2. **تطبيق البنك** تفتحه وتقرأ الرقم (جيد).
3. **موقع قديم** تضغط فيه على أزرار معروفة (مقبول).
4. **روبوت يحرك الفأرة** على الشاشة ويضغط حيث يتوقع الزر (يتعطل لو تغير مكان الزر!).

ترتيب الأفضلية في الكتاب هو نفس هذا المنطق: **كلما اقتربت من البيانات نفسها، كانت الأتمتة أثبت**.`,
        `Imagine you want your bank balance every morning. Four ways:
1. **The bank sends you a file** with the balance (best: the data itself).
2. **The bank’s app** you open and read (good).
3. **An old website** where you click known buttons (acceptable).
4. **A robot moving the mouse** on screen, clicking where it expects the button (breaks if the button moves!).

The book’s preference order follows the same logic: **the closer you get to the data itself, the more stable the automation**.`),
      mech: L(`## لماذا تنكسر الأتمتة؟
كل طبقة أبعد عن البيانات تعتمد على أشياء أكثر قد تتغير:
- **الملف/الواجهة البرمجية**: يعتمد على بنية البيانات فقط.
- **التحكم في التطبيق**: يعتمد على أسماء الأوراق والعناصر.
- **عناصر الواجهة**: يعتمد على أسماء الأزرار والحقول.
- **محاكاة المستخدم**: يعتمد على **مكان** الزر على الشاشة ودقة الشاشة وحجم النافذة وسرعة الجهاز… أي تحديث بسيط يكسره.

## السلسلة النموذجية = الوحدات الصغيرة
لاحظ أن السلسلة (وصول ← فحص ← تنظيف ← حساب ← تقرير ← إشعار) هي نفسها قاعدة «الوحدات المستقلة»، ومع **watchdog** تبدأ بحدث «وصل ملف» لا بموعد — نفس مبدأ «البناء على الأحداث لا المواعيد» في [[l:u5-system|النظام]] {p37}. شغّلها وجرّب ملفات معطوبة في [[lab:pipeline|مختبر السلسلة]].

## لماذا كلمات المرور خارج الكود؟
لأن الكود يُنسخ ويُرسل ويُرفع على GitHub. كلمة مرور داخل الكود تنتشر معه. ملف إعدادات محمي لا يُشارك، أو خزنة النظام، يفصل السر عن المنطق {p18, p27, p33}.`,
        `## Why does automation break?
Each layer further from the data depends on more things that can change:
- **File/API**: depends only on the data structure.
- **Application control**: depends on sheet and element names.
- **UI elements**: depends on button and field names.
- **User simulation**: depends on a button’s **position**, screen resolution, window size, machine speed… any small update breaks it.

## The typical chain = small units
Notice the chain (arrive → check → clean → compute → report → notify) is the “independent units” rule, and with **watchdog** it starts from an event (“a file arrived”), not a time — the same “events, not schedules” principle as [[l:u5-system|the system]] {p37}. Run it and try broken files in [[lab:pipeline|the pipeline lab]].

## Why keep passwords out of code?
Because code gets copied, emailed and pushed to GitHub. A password inside the code spreads with it. A protected, unshared settings file or the system vault separates the secret from the logic {p18, p27, p33}.`),
      practice: L(`## اختيار الأداة لثلاث مهام
| المهمة | الأداة المناسبة | لماذا؟ |
|---|---|---|
| تنزيل تقرير يومي من بوابة نظام ERP على الويب | **Playwright** | متصفح، تسجيل دخول، انتظار العناصر |
| تحديث ملف موازنة مشترك يحبه المحاسبون كما هو | **xlwings** | يتحكم في الملف الحقيقي دون تغيير شكله |
| إدخال بيانات في برنامج محاسبة قديم بلا واجهة برمجية | **pywinauto** | يعمل بأزرار البرنامج الحقيقية |
| نفس البرنامج لكن أزراره «مرسومة» ولا تُقرأ | **PyAutoGUI** (ملاذ أخير) | مع تعليق في الكود يشرح السبب ومهلة ومفتاح إيقاف |

## من أداة يدوية إلى تلقائية
**watchdog** يبدأ عند وصول الملف، و**جدولة ويندوز** تشغّل كل يوم ٨ صباحًا، و**PyInstaller** يجعل زميلك يشغلها بنقرة دون تثبيت بايثون.`,
        `## Choosing the tool for three tasks
| Task | Right tool | Why? |
|---|---|---|
| Download a daily report from a web ERP portal | **Playwright** | browser, login, waiting for elements |
| Update a shared budget file accountants love as is | **xlwings** | controls the real file without changing its form |
| Enter data into an old accounting program with no API | **pywinauto** | works with the program’s real buttons |
| Same program but its buttons are “drawn” and unreadable | **PyAutoGUI** (last resort) | with a code comment explaining why, a timeout and a kill switch |

## From manual to automatic
**watchdog** starts when the file arrives, **Windows scheduling** runs it daily at 8 am, and **PyInstaller** lets a colleague run it in one click without installing Python.`),
      adv: L(`## الأخطاء المكلفة في المستوى الأول
- **البدء بمحاكاة الفأرة لأنها «أسهل في التخيل»**: تبدو سهلة لأنها تقلد ما تفعله بيدك، لكنها الأكثر انكسارًا. الكتاب يطلب أن يكون النزول للمستوى الأدنى **قرارًا واعيًا** مكتوبًا سببه في الكود {p18}.
- **الأتمتة بلا مفتاح إيقاف**: أداة تحرك الفأرة بلا توقف يمكن أن تضغط في أماكن خاطئة وتكتب بيانات في برنامج آخر. المهلة الزمنية ومفتاح الإيقاف شرط.
- **الأداة الصامتة بعد الجدولة**: عندما تعمل وحدها كل صباح، لن تراها. السجل والإشعار هما عيناك.

## برومبت المتابعة بعد أول تشغيل
أول تشغيل حقيقي يكشف فروقًا. البرومبت يطلب تحديد **مصدر الفرق**: القواعد التي وصفتها أنت؟ أم بنية الملفات؟ أم الكود؟ ثم «أخبرني بأي فرضية غيّرتها». هذا يحمي من إصلاح يكسر شيئًا آخر بصمت {p19}.`,
        `## Costly mistakes at level one
- **Starting with mouse simulation because it’s “easy to imagine”**: it seems easy because it mimics your hand, but it’s the most fragile. The book wants going lower to be a **conscious decision** with the reason written in the code {p18}.
- **Automation without a kill switch**: a tool moving the mouse non-stop can click wrong places and type into another program. Timeouts and a stop switch are mandatory.
- **The silent tool after scheduling**: once it runs alone every morning you won’t see it. The log and notifications are your eyes.

## The first-run follow-up prompt
The first real run reveals differences. The prompt asks to pinpoint **the source of the difference**: the rules you described? the file structure? the code? Then “tell me which assumption you changed”. This prevents a fix that silently breaks something else {p19}.`),
    },
    card: {
      what: L("أدوات المستوى الأول: Playwright وxlwings وpywinauto وPyAutoGUI وwatchdog والجدولة وPyInstaller، وترتيب أفضلية رباعي {p18}.", "Level-one tools: Playwright, xlwings, pywinauto, PyAutoGUI, watchdog, scheduling, PyInstaller, and a four-step preference order {p18}."),
      why: L("لأن اختيار الطبقة الخطأ يجعل الأتمتة تنكسر مع أول تحديث.", "Because choosing the wrong layer makes automation break at the first update."),
      how: L("ابدأ من الأقرب للبيانات: ملف/واجهة ← تطبيق ← عناصر واجهة ← محاكاة.", "Start closest to the data: file/API → application → UI elements → simulation."),
      inside: L("كل طبقة أبعد تعتمد على أشياء أكثر قابلة للتغير.", "Each further layer depends on more things that can change."),
      relation: L("يطبق القواعد الهندسية في سلسلة تشغيل كاملة.", "Applies the engineering rules in a full run chain."),
      example: L("تنزيل تقرير ERP يوميًا بـPlaywright، ثم watchdog يبدأ المعالجة.", "Downloading an ERP report daily with Playwright, then watchdog triggers processing."),
      apply: L("استخدم برومبت بناء الأداة على مهمتك مع مواصفتها الخمسية.", "Use the tool-building prompt on your task with its five-element spec."),
      mistakes: L("البدء بمحاكاة الفأرة، وكلمات مرور في الكود، وبلا مفتاح إيقاف.", "Starting with mouse simulation, passwords in code, no kill switch."),
      check: L("هل ترتب الطرق الأربع من الأثبت للأكثر انكسارًا؟", "Can you order the four ways from most stable to most fragile?"),
      next: L("المستوى الثاني: محرك التحليل.", "Level 2: the analysis engine."),
    },
    keys: L(["ترتيب الأفضلية: ملف/واجهة برمجية ← تحكم بالتطبيق ← عناصر الواجهة ← محاكاة المستخدم {p18}.", "PyAutoGUI الأكثر انكسارًا: ملاذ أخير بسبب مكتوب.", "watchdog يبدأ عند وصول ملف؛ والجدولة وPyInstaller تجعلها تعمل وحدها.", "ضوابط: تشغيل تجريبي، لا كلمات مرور في الكود، مهلة ومفتاح إيقاف، توثيق صفحة.", "بعد أول تشغيل: حدد مصدر الفرق وأي فرضية تغيّرت {p19}."],
      ["Preference: file/API → app control → UI elements → user simulation {p18}.", "PyAutoGUI is the most fragile: a last resort with a written reason.", "watchdog starts on file arrival; scheduling and PyInstaller make it run alone.", "Controls: trial run, no passwords in code, timeouts and a stop switch, one-page docs.", "After the first run: find the difference’s source and which assumption changed {p19}."]),
    scene: "automation-ladder", lab: "pipeline", prompts: ["u2-p-build-tool", "u2-p-followup", "u2-p-docs"],
    quick: [
      { q: L("أي طريقة يجب تجربتها أولًا للحصول على تقرير من نظام؟", "Which approach should you try first to get a report from a system?"), opts: L(["محاكاة الفأرة بـPyAutoGUI", "ملف أو واجهة برمجية", "عناصر واجهة البرنامج", "نسخ يدوي"], ["Mouse simulation with PyAutoGUI", "A file or an API", "The program’s UI elements", "Manual copying"]), a: 1, why: L("الأكثر ثباتًا على الإطلاق: التعامل مع البيانات نفسها لا مع ما يظهر على الشاشة {p18}.", "The most stable of all: dealing with the data itself, not what appears on screen {p18}.") },
      { q: L("أين تُحفظ كلمات المرور في أداة الأتمتة؟", "Where should passwords live in an automation tool?"), opts: L(["داخل الكود لسهولة التشغيل", "في ملف إعدادات محمي أو خزنة النظام", "في اسم الملف", "في رسالة بريد"], ["In the code for convenience", "In a protected settings file or the system vault", "In the file name", "In an email"]), a: 1, why: L("«لا تُكتب داخل الكود أبدًا؛ تُقرأ من ملف إعدادات محمي أو من خزنة النظام» {p18}.", "“Never written in the code; read from a protected settings file or the system vault” {p18}.") },
    ],
    related: ["u2-compass", "u2-analysis", "u4-claudecode"], req: ["u2-compass"], terms: ["playwright", "xlwings", "pyautogui", "pywinauto", "watchdog", "pyinstaller", "api"],
  });

  ACAD.L({
    id: "u2-analysis", unit: "u2", pages: [19, 20], icon: "🩺", diff: 2, mins: 13, tags: ["python", "analysis"],
    title: L("المستوى الثاني: محرك التحليل — الجودة أولًا، ثم سبعة أسئلة", "Level 2: the analysis engine — quality first, then seven questions"),
    hook: L("نتيجة دقيقة على بيانات معطوبة تعطي قرارًا خاطئًا بثقة عالية جدًا.", "A precise result on broken data gives a wrong decision with very high confidence."),
    book: L(`**المستوى الثاني — محرك التحليل** {p19}. ثلاث أدوات تغطي معظم احتياجات التحليل على جهاز واحد، دون بناء أي بنية تحتية معقدة:
- **DuckDB — الاستعلام المباشر**: أسئلة بلغة استعلام بسيطة (SQL) مباشرة على ملفات إكسل أو النصوص، بل على مجلد كامل دفعة واحدة، دون استيرادها لقاعدة بيانات.
- **Polars — المعالجة السريعة**: معالجة الجداول الكبيرة بسرعة عالية جدًا، تخطط للحساب كاملًا قبل تنفيذه؛ تناسب الملفات التي تتجاوز ذاكرة الجهاز.
- **ydata-profiling — فحص الجودة أولًا**: تقرير فوري عن أي ملف جديد: القيم الناقصة، والتكرارات، والأرقام الشاذة، والعلاقات بين الأعمدة، قبل أي تحليل فعلي.

**لماذا الجودة أولًا؟** نتيجة دقيقة على بيانات معطوبة تعطي قرارًا خاطئًا بثقة عالية جدًا. فحص الجودة **خطوة أولى إلزامية**، لا خطوة اختيارية تُترك لآخر الوقت.

**منهجية التحليل: سبعة أسئلة قبل أي رسم بياني:** ١ ماذا حدث؟ ← ٢ أين حدث؟ ← ٣ لماذا حدث؟ ← ٤ ما العوامل المؤثرة؟ ← ٥ استثنائي أم متكرر؟ ← ٦ أثره الكمي والمالي؟ ← ٧ ماذا لو استمر؟ ⟵ **ما القرار المطلوب؟** الرسم البياني نتيجة لهذه الأسئلة لا بديل عنها؛ فالتحليل الذي يبدأ بالرسوم ينتهي غالبًا إلى لوحة مزدحمة لا تغيّر قرارًا واحدًا.

**تطبيق عملي: حين يقول التقرير «الكفاءة انخفضت ٧٪»** — الرقم وحده لا يقود إلى قرار. التفكيك الصحيح يحوّله إلى سبب محدد قابل للمعالجة: أي موديل أو منتج تأثر؟ أي خط أو فرع؟ أي وردية أو فترة؟ منذ متى بدأ؟ كم استغرق تغيير الموديل؟ ما التوقفات المسجلة وأسبابها؟ هل كانت الكمية أقل من الطبيعي؟ هل حدث نقص خامات؟ هل تكررت المشكلة؟ ما الأثر المالي الفعلي؟

**برومبتان** {p19-20}: التحليل المنضبط (لا تبدأ برسم أي شيء؛ ابدأ بفحص الجودة… خمسة استنتاجات وثلاثة إجراءات مع الدليل الرقمي، وما لا يمكن الجزم به)، وفحص الجودة بلغة مبسطة.`,
      `**Level 2 — the analysis engine** {p19}. Three tools cover most analysis needs on a single machine without any complex infrastructure:
- **DuckDB — direct querying**: questions in a simple query language (SQL) directly on Excel or text files, even on a whole folder at once, without importing into a database.
- **Polars — fast processing**: processes large tables very fast, planning the whole computation before running it; suits files larger than the machine’s memory.
- **ydata-profiling — quality check first**: an instant report on any new file: missing values, duplicates, outliers and relationships between columns, before any real analysis.

**Why quality first?** A precise result on broken data gives a wrong decision with very high confidence. Quality checking is **a mandatory first step**, not an optional one left for the end.

**The method: seven questions before any chart:** 1 what happened? → 2 where? → 3 why? → 4 what factors? → 5 one-off or recurring? → 6 quantitative and financial impact? → 7 what if it continues? ⟵ **what decision is required?** The chart is a result of these questions, not a substitute; analysis that starts with charts usually ends in a crowded dashboard that changes no decision.

**Worked case: when the report says “efficiency dropped 7%”** — the number alone leads to no decision. The right breakdown turns it into a specific, fixable cause: which model or product was affected? which line or branch? which shift or period? since when? how long did the model changeover take? what stoppages were recorded and why? was output lower than normal? was there a material shortage? has it happened before? what is the actual financial impact?

**Two prompts** {p19-20}: disciplined analysis (don’t draw anything; start with a quality check… five conclusions and three actions with numerical evidence, plus what cannot be determined), and a plain-language quality check.`),
    levels: {
      simple: L(`الطبيب الجيد لا يكتب دواءً قبل أن يتأكد أن **نتيجة التحليل المعملي سليمة**: لو العينة اتلوثت، كل التشخيص بعدها غلط مهما كان الطبيب ماهرًا.

البيانات كذلك. قبل أي رسم أو استنتاج: هل فيها صفوف مكررة؟ أرقام غريبة؟ أيام ناقصة؟ هذا هو «فحص الجودة».

وبعدها، بدل أن تقفز للرسم البياني، اسأل سبعة أسئلة بالترتيب، تبدأ بـ«ماذا حدث؟» وتنتهي بـ«ماذا نقرر؟». الرسم يأتي **في الآخر** ليوضح الإجابة، لا ليبحث عنها.`,
        `A good doctor won’t prescribe before checking that **the lab result is sound**: if the sample was contaminated, the whole diagnosis is wrong however skilled the doctor.

Data is the same. Before any chart or conclusion: are there duplicate rows? strange numbers? missing days? That’s the “quality check”.

Then, instead of jumping to a chart, ask seven questions in order, from “what happened?” to “what do we decide?”. The chart comes **last**, to show the answer — not to look for it.`),
      mech: L(`## كيف تُفسد البيانات المعطوبة القرار؟
| المشكلة | أثرها على الرقم |
|---|---|
| صف مكرر | مبيعات «حدثت مرتين» ← تضخيم |
| سعر فيه صفر زائد | رقم شاذ يرفع المتوسط كله |
| رقم مكتوب بالحروف | يختفي من الحساب بصمت ← تقليل |
| أسبوع ناقص | «انخفاض» غير حقيقي |
جرّب هذه المشكلات حرفيًا في [[lab:quality|مختبر الجودة]] وشاهد الإجمالي يتغير بأكثر من الضعف.

## لماذا هذا الترتيب للأسئلة السبعة؟
كل سؤال يضيّق الذي بعده: **ماذا** يحدد المؤشر، و**أين** تحدد الخط أو الفرع، و**لماذا** تبحث عن السبب فيه تحديدًا، و**العوامل** تفصل السبب الرئيسي عن الثانوي، و**استثنائي أم متكرر** يحدد نوع الحل (إصلاح مرة أم تغيير نظام)، و**الأثر المالي** يحدد الأولوية، و**ماذا لو استمر** يحدد الاستعجال. وكلها تصب في **القرار**.

## الأدوات الثلاث بلغة بسيطة
DuckDB «يسأل» الملفات بلغة SQL كأنها قاعدة بيانات، وPolars «يعالج» الجداول الضخمة بسرعة، وydata-profiling «يفحص» الملف قبل كل شيء.`,
        `## How does broken data spoil the decision?
| Problem | Effect on the number |
|---|---|
| duplicate row | sales that “happened twice” → inflation |
| price with an extra zero | an outlier lifting the whole average |
| number written as a word | silently drops out → understatement |
| missing week | a “drop” that isn’t real |
Try these problems literally in [[lab:quality|the quality lab]] and watch the total more than double.

## Why this order of the seven questions?
Each question narrows the next: **what** sets the metric, **where** pins the line or branch, **why** searches for the cause there specifically, **factors** separate main from secondary causes, **one-off or recurring** decides the kind of fix (one repair vs a system change), **financial impact** sets priority, and **what if it continues** sets urgency. All flow into **the decision**.

## The three tools in plain words
DuckDB “asks” files in SQL as if they were a database, Polars “processes” huge tables fast, and ydata-profiling “checks” the file before anything else.`),
      practice: L(`## حالة «الكفاءة انخفضت ٧٪» مطبّقة
| السؤال | ما وجدناه (مثال افتراضي) |
|---|---|
| أي خط؟ | خط ٣ فقط |
| أي وردية؟ | الليلية |
| منذ متى؟ | منذ ١٢ سبتمبر |
| تغيير الموديل؟ | ٣ تغييرات أسبوعيًا بدل ١، كل تغيير ٤٥ دقيقة |
| التوقفات؟ | ٦٠٪ منها في ماكينة التغليف |
| متكرر؟ | حدث في مارس بنفس النمط |
| الأثر المالي؟ | ~١٨٠ ألف جنيه شهريًا |
**القرار:** تقليل تغييرات الموديل في الوردية الليلية + صيانة وقائية لماكينة التغليف — بدل «حملة لرفع الكفاءة» عامة.

الرقم ٧٪ وحده لم يكن ليقود لهذا القرار أبدًا. *الأرقام افتراضية للتوضيح.*`,
        `## The “efficiency dropped 7%” case, applied
| Question | What we found (hypothetical) |
|---|---|
| Which line? | line 3 only |
| Which shift? | night |
| Since when? | since 12 September |
| Model changeovers? | 3 a week instead of 1, 45 minutes each |
| Stoppages? | 60% at the packing machine |
| Recurring? | happened in March with the same pattern |
| Financial impact? | ~180,000 EGP a month |
**Decision:** fewer model changeovers on the night shift + preventive maintenance on the packing machine — instead of a generic “efficiency campaign”.

The 7% alone would never have led to this decision. *Hypothetical numbers for illustration.*`),
      adv: L(`## حدود التحليل الآلي
- **«ما لا يمكن الجزم به»**: البرومبت المنضبط يطلب صراحة قائمة بما لا يمكن الجزم به من هذه البيانات. بدونها، يعرض النموذج كل استنتاج بنفس الثقة.
- **الارتباط ليس سببية**: وجود علاقة بين الوردية الليلية والانخفاض لا يعني أن الوردية هي السبب؛ ربما لأن تغييرات الموديل تُجدول ليلًا. السؤال ٤ (العوامل المؤثرة) يحمي من هذا الخلط.
- **الحساب للقواعد لا للنموذج**: اطلب كودًا (DuckDB/Polars) يحسب الأرقام، واجعل النموذج يفسرها. لا تطلب منه «حساب المتوسط» نصيًا على آلاف الصفوف {p38}.

## الجسر للمستوى الثالث
عندما تجيب عن الأسئلة السبعة، يصبح عندك محتوى الصفحة التنفيذية جاهزًا تقريبًا: [[l:u2-level3|المحطات السبع للقصة الإدارية]] {p21} هي نفس الأسئلة بصيغة عرض.`,
        `## Limits of automated analysis
- **“What cannot be determined”**: the disciplined prompt explicitly asks for a list of what this data cannot establish. Without it, the model presents every conclusion with equal confidence.
- **Correlation isn’t causation**: a link between the night shift and the drop doesn’t mean the shift is the cause; maybe changeovers are scheduled at night. Question 4 (factors) guards against this confusion.
- **Calculation belongs to rules, not the model**: ask for code (DuckDB/Polars) to compute numbers and let the model interpret them. Don’t ask it to “compute the average” in text over thousands of rows {p38}.

## The bridge to level three
Once you answer the seven questions, the executive page’s content is almost ready: [[l:u2-level3|the seven stations of the management story]] {p21} are the same questions in presentation form.`),
    },
    card: {
      what: L("DuckDB للاستعلام، وPolars للمعالجة، وydata-profiling للجودة، وسبعة أسئلة قبل أي رسم {p19}.", "DuckDB to query, Polars to process, ydata-profiling for quality, and seven questions before any chart {p19}."),
      why: L("لأن البيانات المعطوبة تنتج قرارات خاطئة واثقة، والرسوم المبكرة تنتج لوحات بلا قرار.", "Because broken data produces confident wrong decisions, and early charts produce decisionless dashboards."),
      how: L("فحص جودة ← ماذا ← أين ← لماذا ← العوامل ← متكرر؟ ← الأثر ← ماذا لو استمر ← القرار.", "Quality check → what → where → why → factors → recurring? → impact → if it continues → decision."),
      inside: L("كل سؤال يضيّق نطاق الذي بعده حتى يصل لسبب قابل للمعالجة.", "Each question narrows the next until a fixable cause emerges."),
      relation: L("يبني على مخرجات المستوى الأول ويغذي العرض في المستوى الثالث.", "Builds on level one’s output and feeds level three’s presentation."),
      example: L("«الكفاءة ٧٪» تتحول إلى: خط ٣، الوردية الليلية، تغييرات الموديل، ماكينة التغليف.", "“Efficiency 7%” becomes: line 3, night shift, changeovers, packing machine."),
      apply: L("شغّل برومبت فحص الجودة على آخر ملف بيانات تعاملت معه.", "Run the quality-check prompt on the last data file you used."),
      mistakes: L("البدء بالرسم، والخلط بين الارتباط والسببية، وترك الحساب للنموذج.", "Starting with charts, confusing correlation with causation, leaving calculation to the model."),
      check: L("هل تذكر الأسئلة السبعة بالترتيب، وما الذي يصب فيه كلها؟", "Can you recite the seven questions in order, and what they all feed into?"),
      next: L("بايثون أم منصة تقارير مؤسسية؟", "Python or an enterprise reporting platform?"),
    },
    keys: L(["الجودة أولًا: نتيجة دقيقة على بيانات معطوبة = قرار خاطئ بثقة عالية {p19}.", "DuckDB يستعلم عن الملفات، Polars يعالج الكبير، ydata-profiling يفحص الجودة.", "سبعة أسئلة قبل أي رسم، وكلها تصب في: ما القرار المطلوب؟", "الرقم وحده (٧٪) لا يقود لقرار؛ التفكيك يقود لسبب قابل للمعالجة.", "اطلب ما لا يمكن الجزم به من البيانات."],
      ["Quality first: precise results on broken data = confidently wrong decisions {p19}.", "DuckDB queries files, Polars processes big tables, ydata-profiling checks quality.", "Seven questions before any chart, all feeding: what decision is required?", "A number alone (7%) leads nowhere; breaking it down leads to a fixable cause.", "Ask for what the data cannot establish."]),
    scene: "seven-questions", lab: "quality", prompts: ["u2-p-analysis", "u2-p-quality", "u2-p-seven-drill"],
    quick: [
      { q: L("ما الخطوة الأولى الإلزامية في محرك التحليل؟", "What is the mandatory first step of the analysis engine?"), opts: L(["الرسم البياني", "فحص جودة البيانات", "كتابة التوصيات", "اختيار الألوان"], ["The chart", "Checking data quality", "Writing recommendations", "Choosing colours"]), a: 1, why: L("«فحص الجودة خطوة أولى إلزامية، لا خطوة اختيارية تُترك لآخر الوقت» {p19}.", "“Quality checking is a mandatory first step, not an optional one left to the end” {p19}.") },
      { type: "order", q: L("رتّب أول خمسة من الأسئلة السبعة:", "Order the first five of the seven questions:"), items: L(["ماذا حدث؟", "أين حدث؟", "لماذا حدث؟", "ما العوامل المؤثرة؟", "استثنائي أم متكرر؟"], ["What happened?", "Where did it happen?", "Why did it happen?", "What factors?", "One-off or recurring?"]), why: L("المنهجية في الكتاب {p19}: كل سؤال يضيق نطاق الذي بعده.", "The book’s method {p19}: each question narrows the next.") },
    ],
    related: ["u2-level1", "u2-level3", "u1-think", "u3-mistakes"], req: ["u2-level1"], terms: ["duckdb", "polars", "ydata-profiling", "sql", "outlier", "data-quality"],
  });

  ACAD.L({
    id: "u2-platform", unit: "u2", pages: [20, 21], icon: "🏢", diff: 3, mins: 9, tags: ["python", "analysis"],
    title: L("بايثون أم منصة تقارير مؤسسية؟", "Python or an enterprise reporting platform?"),
    hook: L("السؤال ليس أيهما أقوى، بل أيهما يطابق حجم الاستخدام ومتطلبات الحوكمة في مؤسستك.", "The question isn’t which is stronger, but which matches your usage scale and governance needs."),
    book: L(`**بايثون أم منصة تقارير مؤسسية؟** {p20}. السؤال ليس أيهما أقوى، بل أيهما **يطابق حجم الاستخدام ومتطلبات الحوكمة** في مؤسستك فعليًا.

**يكفي حل بايثون عندما…** النطاق محدود (إدارة واحدة أو موقع أو فريق صغير) · المنطق خاص بالمؤسسة (قواعد حساب داخلية، أو تنبؤ، أو سيناريوهات لا تدعمها القوالب) · التوزيع بسيط (ملف أو صفحة لعدد محدود) · السلسلة متكاملة (القراءة والتنظيف والدمج والتحليل والرسوم والصفحة في أداة واحدة).

**تلزم المنصة المؤسسية عندما…** مستخدمون كثيرون بصلاحيات مختلفة على نفس البيانات · مقاييس موحدة يجب أن تتطابق عبر كل التقارير والإدارات · حوكمة مركزية (تحديث مجدول ومراقبة من قسم تقني لا من جهاز موظف) · أصل مؤسسي طويل الأجل يبقى عاملًا بعد انتقال صاحبه.

| المحور | حل بايثون | منصة مؤسسية |
|---|---|---|
| سرعة أول نتيجة | ساعات إلى أيام | أيام إلى أسابيع، مع اعتمادات |
| حرية منطق التحليل | كاملة، بما فيها النمذجة والتنبؤ | محدودة بما يسمح به المنتج |
| الصلاحيات والحوكمة | تُبنى يدويًا وتضعف مع زيادة المستخدمين | مدمجة ومركزية من التصميم |
| كلفة الاستمرار | صيانة كود ومعرفة فردية | تراخيص سنوية وإدارة منصة |

**الخلاصة المهنية**: الحلّان ليسا بديلين متنافسين. **يُبنى الحل الأخف أولًا** للإجابة عن السؤال المطروح؛ فإن تحول التقرير فعليًا إلى أصل يستخدمه كثيرون ويحتاج صلاحيات ومقاييس موحدة، يُنتقل إلى المنصة **بمعرفة مكتسبة من النموذج الأول، لا بافتراضات نظرية**.

**أربع إشارات تستوجب الانتقال:** تعدد النسخ (أرقام مختلفة للتقرير نفسه بين الإدارات) · طلبات صلاحيات متكررة («هذا القسم لا يجب أن يرى بيانات الآخر») · اعتماد مركز على شخص واحد يشغّل الملف من جهازه · تضارب في المقاييس عبر تقارير متعددة المصادر. وبرومبت خطة الترقية {p21} بالأسفل.`,
      `**Python or an enterprise reporting platform?** {p20}. The question isn’t which is stronger but which **matches the usage scale and governance requirements** of your organisation.

**Python is enough when…** the scope is limited (one department, site or small team) · the logic is organisation-specific (internal rules, forecasting or scenarios templates don’t support) · distribution is simple (a file or page for a few people) · the chain is integrated (reading, cleaning, merging, analysis, charts and the page in one tool).

**An enterprise platform is needed when…** many users need different permissions on the same data · metrics must match across all reports and departments · governance is central (scheduled refresh and monitoring by an IT team, not an employee’s PC) · the report is a long-term asset that keeps working after its creator moves on.

| Axis | Python solution | Enterprise platform |
|---|---|---|
| Time to first result | hours to days | days to weeks, with approvals |
| Freedom of analysis logic | full, including modelling and forecasting | limited to what the product allows |
| Permissions & governance | built by hand, weakens as users grow | built in and central by design |
| Ongoing cost | code maintenance and individual knowledge | annual licences and platform admin |

**The professional conclusion**: the two aren’t competing substitutes. **Build the lightest solution first** to answer the question at hand; if the report really becomes an asset many people use, needing permissions and unified metrics, move to the platform **with knowledge gained from the first model, not theoretical assumptions**.

**Four signals that call for the move:** multiple versions (the same report with different numbers across departments) · repeated permission requests (“this department shouldn’t see the other’s data”) · concentrated dependence on one person running the file from their PC · conflicting metrics across multi-source reports. And the upgrade-plan prompt {p21} below.`),
    levels: {
      simple: L(`الفرق يشبه الفرق بين **سيارتك الخاصة** و**أتوبيس الشركة**. السيارة سريعة ومرنة وتأخذك أينما تريد فورًا (بايثون). الأتوبيس ينقل الجميع بانتظام وبقواعد واضحة، لكنه يحتاج تنظيمًا وتكلفة ثابتة (المنصة).

لن تشتري أتوبيسًا لتوصيل شخصين. ولن تنقل مصنعًا كاملًا بسيارات خاصة. **ابدأ بالسيارة، وانتقل للأتوبيس عندما يكبر الركاب فعلًا.**`,
        `It’s like the difference between **your own car** and **the company bus**. The car is fast, flexible and takes you anywhere right away (Python). The bus carries everyone regularly with clear rules but needs organisation and fixed cost (the platform).

You won’t buy a bus to drive two people. You won’t move a whole factory in private cars. **Start with the car; switch to the bus when the passengers really grow.**`),
      mech: L(`## لماذا «الأخف أولًا»؟
بناء منصة قبل التأكد من الحاجة يعني أسابيع من الاعتمادات والتراخيص لتقرير قد لا يستخدمه أحد، أو منطق تحليل سيتغير بعد أول عرض. النموذج الأول (ببايثون) يجيب عن ثلاثة أسئلة رخيصة: هل التقرير مفيد؟ ما المقاييس الصحيحة فعلًا؟ من يستخدمه؟

## الإشارات الأربع كأعراض
كل إشارة هي عرَض لمشكلة **حوكمة**، لا مشكلة تقنية:
- **تعدد النسخ** = لا يوجد «مصدر حقيقة واحد».
- **طلبات الصلاحيات** = الحل الفردي لا يفصل الوصول.
- **الاعتماد على شخص** = خطر استمرارية.
- **تضارب المقاييس** = لكل رقم أكثر من تعريف — وهو تحديدًا ما يعالجه مبدأ «مصدر حقيقة واحد» في [[l:u5-system|النظام]] {p37}.`,
        `## Why “lightest first”?
Building a platform before confirming the need means weeks of approvals and licences for a report nobody may use, or analysis logic that changes after the first presentation. The first model (in Python) cheaply answers three questions: is the report useful? what are the right metrics really? who uses it?

## The four signals as symptoms
Each signal is a symptom of a **governance** problem, not a technical one:
- **Multiple versions** = no “single source of truth”.
- **Permission requests** = the individual solution can’t separate access.
- **Dependence on one person** = a continuity risk.
- **Conflicting metrics** = more than one definition per number — exactly what the “single source of truth” principle in [[l:u5-system|the system]] fixes {p37}.`),
      practice: L(`## قصة نموذجية لتقرير ينمو
- **الشهر ١:** محلل في إدارة المبيعات يبني تقرير بايثون أسبوعيًا لمديره. ✅ بايثون مناسب.
- **الشهر ٦:** ثلاث إدارات تطلب نسخة، وكل إدارة عدّلت التعريف قليلًا ← **تعدد نسخ وتضارب مقاييس**.
- **الشهر ٨:** إدارة المالية تطلب ألا يرى فريق المبيعات الهوامش ← **طلبات صلاحيات**.
- **الشهر ٩:** المحلل في إجازة، ولا أحد يشغّل التقرير ← **اعتماد على شخص**.

الآن حان الانتقال، ومنطق بايثون يصبح **مرجعًا للتحقق** من أرقام المنصة الجديدة، كما يطلب برومبت خطة الترقية {p21}.`,
        `## A typical story of a growing report
- **Month 1:** an analyst in sales builds a weekly Python report for their manager. ✅ Python fits.
- **Month 6:** three departments want a copy, each tweaking the definition ← **multiple versions and conflicting metrics**.
- **Month 8:** finance asks that sales not see margins ← **permission requests**.
- **Month 9:** the analyst is on leave and nobody runs the report ← **dependence on one person**.

Now it’s time to move, and the Python logic becomes **the reference to verify** the new platform’s numbers, as the upgrade prompt asks {p21}.`),
      adv: L(`## أخطاء القرار في الاتجاهين
- **التمسك ببايثون بعد ظهور الإشارات**: يبدو رخيصًا، لكن كلفته الحقيقية في الأرقام المتضاربة والقرارات المبنية على نسخ مختلفة.
- **القفز للمنصة مبكرًا**: «سنعمل داشبورد على المنصة» قبل معرفة المقاييس الصحيحة ينتج منصة مكلفة تعرض أرقامًا خاطئة بشكل رسمي.
- **الانتقال بدون مرجع**: نقل التقرير للمنصة دون مقارنة أرقامها بالنسخة الأولى رقمًا برقم يفقدك الثقة في الاثنين.

## ملاحظة
الكتاب لا يسمّي منصة بعينها، بل يتكلم عن «منصة مؤسسية متاحة لديكم». القرار مبني على **خصائص الاستخدام** لا على اسم المنتج.`,
        `## Decision mistakes both ways
- **Clinging to Python after the signals appear**: it looks cheap, but its real cost lies in conflicting numbers and decisions made on different versions.
- **Jumping to a platform too early**: “let’s build a dashboard on the platform” before knowing the right metrics yields a costly platform officially displaying wrong numbers.
- **Moving without a reference**: migrating without comparing the platform’s numbers to the first version, number by number, costs you trust in both.

## Note
The book names no specific platform; it speaks of “an enterprise platform available to you”. The decision rests on **usage characteristics**, not a product name.`),
    },
    card: {
      what: L("مقارنة بين حل بايثون ومنصة مؤسسية على أربعة محاور، مع أربع إشارات للانتقال {p20}.", "Comparing a Python solution and an enterprise platform on four axes, with four signals to move {p20}."),
      why: L("لاختيار الحل حسب حجم الاستخدام والحوكمة لا حسب القوة.", "To choose by usage scale and governance, not raw power."),
      how: L("الأخف أولًا، ثم المنصة عند ظهور الإشارات، بمعرفة من النموذج الأول.", "Lightest first, then the platform when signals appear, using knowledge from the first model."),
      inside: L("الإشارات الأربع أعراض لمشكلات حوكمة: مصدر حقيقة، صلاحيات، استمرارية، تعريفات.", "The four signals are governance symptoms: source of truth, permissions, continuity, definitions."),
      relation: L("يجهّز لمبدأ «مصدر حقيقة واحد» في النظام.", "Prepares the “single source of truth” principle of systems."),
      example: L("تقرير مبيعات ينمو من مدير واحد إلى ثلاث إدارات بأرقام مختلفة.", "A sales report growing from one manager to three departments with different numbers."),
      apply: L("افحص تقاريرك: هل تظهر أي إشارة من الأربع؟", "Check your reports: do any of the four signals appear?"),
      mistakes: L("المنصة قبل معرفة المقاييس، أو التمسك ببايثون مع تضارب الأرقام.", "A platform before knowing the metrics, or clinging to Python amid conflicting numbers."),
      check: L("هل تذكر الإشارات الأربع؟", "Can you name the four signals?"),
      next: L("المستوى الثالث: من التحليل إلى تجربة إدارية تفاعلية.", "Level 3: from analysis to an interactive management experience."),
    },
    keys: L(["السؤال: أيهما يطابق حجم الاستخدام والحوكمة، لا أيهما أقوى {p20}.", "بايثون: نطاق محدود، منطق خاص، توزيع بسيط، سلسلة متكاملة.", "المنصة: مستخدمون بصلاحيات، مقاييس موحدة، حوكمة مركزية، أصل طويل الأجل.", "ابنِ الأخف أولًا، وانتقل بمعرفة مكتسبة لا بافتراضات.", "إشارات الانتقال: تعدد النسخ، طلبات الصلاحيات، الاعتماد على شخص، تضارب المقاييس."],
      ["The question: which matches usage and governance, not which is stronger {p20}.", "Python: limited scope, specific logic, simple distribution, integrated chain.", "Platform: users with permissions, unified metrics, central governance, a long-term asset.", "Build the lightest first; move with gained knowledge, not assumptions.", "Signals to move: multiple versions, permission requests, one-person dependence, conflicting metrics."]),
    prompts: ["u2-p-upgrade"],
    quick: [
      { q: L("ثلاث إدارات تعرض نفس التقرير بأرقام مختلفة. ماذا تعني هذه الإشارة؟", "Three departments show the same report with different numbers. What does this signal mean?"), opts: L(["التقرير ممتاز", "إشارة «تعدد النسخ» التي تستوجب الانتقال لمنصة مركزية", "يجب حذف التقرير", "بايثون أبطأ من اللازم"], ["The report is excellent", "The “multiple versions” signal calling for a central platform", "The report should be deleted", "Python is too slow"]), a: 1, why: L("تعدد النسخ بأرقام مختلفة أولى الإشارات الأربع {p20}.", "Multiple versions with different numbers is the first of the four signals {p20}.") },
      { q: L("ما «الخلاصة المهنية» في الكتاب؟", "What is the book’s “professional conclusion”?"), opts: L(["المنصة دائمًا أفضل", "بايثون دائمًا أفضل", "يُبنى الحل الأخف أولًا، ويُنتقل للمنصة بمعرفة مكتسبة عند الحاجة", "استخدم الاثنين معًا دائمًا"], ["The platform is always better", "Python is always better", "Build the lightest first; move to the platform with gained knowledge when needed", "Always use both"]), a: 2, why: L("«الحلان ليسا بديلين متنافسين… يُبنى الحل الأخف أولًا» {p20}.", "“The two aren’t competing substitutes… build the lightest solution first” {p20}.") },
    ],
    related: ["u2-analysis", "u2-level3", "u5-system"], req: ["u2-analysis"], terms: ["governance", "single-source-of-truth"],
  });

  ACAD.L({
    id: "u2-level3", unit: "u2", pages: [21, 22], icon: "🖥️", diff: 2, mins: 12, tags: ["presentation", "dashboard"],
    title: L("المستوى الثالث: صفحة تنفيذية تقود من النتيجة إلى القرار", "Level 3: an executive page leading from result to decision"),
    hook: L("ليس تجميل الأرقام، بل صفحة واحدة تُفتح بضغطة وتُفهم رسالتها في ثلاثين ثانية.", "Not prettifying numbers, but one page that opens in a click and is understood in thirty seconds."),
    book: L(`**المستوى الثالث — من التحليل إلى تجربة إدارية تفاعلية** {p21}. الهدف ليس تجميل الأرقام، بل بناء **صفحة واحدة** تُفتح بضغطة، وتقود قارئها من النتيجة إلى القرار خلال دقائق.

**طريقتان للبناء:** **تطبيق تحليلي كامل** (Streamlit يبني تطبيق بيانات بأسطر قليلة ومناسب للنماذج السريعة، وDash أنسب حين يصبح المشروع أداة دائمة بتحكم أدق) · **مخرج مستقل: صفحة واحدة** (مكتبة Plotly توفر أكثر من أربعين نوعًا من الرسوم التفاعلية وتحفظها كصفحة ويب واحدة تعمل بلا إنترنت وبلا تثبيت — ملف يُرسل بالبريد ويُفتح بنقرة). **المسار الموصى به**: نموذج سريع بـStreamlit للتحقق من الفكرة، ثم Dash فقط بعد أن تثبت المتطلبات.

**بنية القصة الإدارية: سبع محطات بدل حائط من الرسوم:** ١ ماذا حدث؟ (رقم واحد كبير واضح) · ٢ جيد أم سيئ؟ (مقارنة بالخطة والفترة السابقة والهدف) · ٣ أين المشكلة؟ (أعلى ثلاث مناطق تأثير فقط) · ٤ لماذا حدثت؟ (الأسباب مرتبة بالتأثير) · ٥ أين التركيز؟ (رسم تفاعلي واحد للتصفية والتعمق) · ٦ ماذا لو استمر؟ (توقع بسيط بأثر رقمي) · ٧ ماذا نفعل الآن؟ (ثلاثة قرارات، كل منها بمسؤول وموعد).

**معيار النجاح الوحيد**: تُفهم الرسالة الأساسية خلال **أول ثلاثين ثانية**، ثم يُترك التعمق لمن يريده فقط.

**طبقة تحسين العرض (اختيارية)**: Jinja (قوالب يتغير فيها المحتوى الشهري ويبقى الشكل والهوية) · GSAP (حركة موجّهة تربط ظهور كل عنصر بموضع القارئ: المشكلة، ثم الرسم، ثم السبب، ثم الحل) · Reveal.js (يحول الصفحة نفسها إلى عرض شرائح بملاحظات متحدث). **القاعدة الحاكمة للحركة**: الحركة وسيلة لتوجيه الانتباه إلى تسلسل الفكرة، **ليست زينة**؛ أي حركة لا تسهّل فهم الفكرة التالية تُحذف فورًا.

**ستة أخطاء تُفسد الصفحة التنفيذية:** رسوم بلا قرار · أرقام بلا مرجع (لا خطة ولا فترة سابقة ولا هدف) · فلاتر بلا استخدام · ألوان بلا دلالة (نفس اللون يعني شيئًا مختلفًا كل مرة) · حركة سابقة للأولوية (تبدأ قبل أن يقرأ المستخدم الرقم الأساسي) · تفاصيل قبل الرسالة.

**برومبتان** {p22}: الصفحة التنفيذية، وصياغة السبع محطات نصًا أولًا.`,
      `**Level 3 — from analysis to an interactive management experience** {p21}. The goal isn’t prettifying numbers but building **one page** that opens in a click and leads its reader from the result to the decision in minutes.

**Two ways to build:** **a full analysis app** (Streamlit builds a data app in a few lines, good for quick prototypes; Dash suits a permanent tool with finer control) · **a standalone output: one page** (Plotly offers 40+ interactive chart types and saves them as a single web page that works offline with no installation — a file emailed and opened in a click). **The recommended path**: a quick Streamlit prototype to validate the idea, then Dash only once requirements are stable.

**The structure of the management story: seven stations instead of a wall of charts:** 1 what happened? (one big, clear number) · 2 good or bad? (compared with plan, the previous period and target) · 3 where’s the problem? (the top three impact areas only) · 4 why? (causes ranked by impact) · 5 where to focus? (one interactive chart for filtering and drilling down) · 6 what if it continues? (a simple forecast with a numeric impact) · 7 what do we do now? (three decisions, each with an owner and a date).

**The only success criterion**: the core message is understood in **the first thirty seconds**; deeper exploration is left to those who want it.

**The presentation layer (optional)**: Jinja (templates where monthly content changes while layout and identity stay) · GSAP (guided motion tying each element’s appearance to the reader’s position: problem, then chart, then cause, then solution) · Reveal.js (turns the page itself into slides with speaker notes). **The governing rule for motion**: motion directs attention along the idea’s sequence; **it isn’t decoration**. Any motion that doesn’t ease understanding of the next idea is deleted at once.

**Six mistakes that ruin the executive page:** charts with no decision · numbers with no reference (no plan, previous period or target) · filters nobody uses · colours with no meaning (the same colour meaning different things) · motion before priority (animating before the user reads the key number) · details before the message.

**Two prompts** {p22}: the executive page, and drafting the seven stations as text first.`),
    levels: {
      simple: L(`فكّر في نشرة الأخبار الجيدة: تبدأ بالخبر الأهم في جملة، ثم «هل هذا جيد أم سيئ؟»، ثم التفاصيل، ثم «ماذا بعد؟». لا تبدأ بعشر خرائط وجداول.

الصفحة التنفيذية تعمل بنفس الطريقة: **رقم واحد كبير**، ثم مقارنته، ثم أين المشكلة ولماذا، ثم **ثلاثة قرارات** بأسماء ومواعيد. ومدير مشغول يجب أن يفهم الرسالة قبل أن يشرب رشفة من قهوته: **ثلاثون ثانية**.`,
        `Think of a good news bulletin: it opens with the main story in one sentence, then “is this good or bad?”, then details, then “what next?”. It doesn’t open with ten maps and tables.

The executive page works the same way: **one big number**, then its comparison, then where the problem is and why, then **three decisions** with names and dates. A busy manager must get the message before their first sip of coffee: **thirty seconds**.`),
      mech: L(`## لماذا سبع محطات بهذا الترتيب؟
لأنها تتبع **أسئلة المدير الطبيعية** بالترتيب الذي تخطر به: ماذا حدث؟ هل هو مهم؟ أين؟ لماذا؟ أين أنظر؟ وماذا لو تركناه؟ وماذا أفعل؟ وهي امتداد مباشر لـ[[l:u2-analysis|الأسئلة السبعة]] في التحليل: هناك تُسأل للفهم، وهنا تُعرض للقرار.

## لماذا «ثلاث» فقط في كل شيء؟
أعلى ثلاث مناطق، وثلاثة قرارات. لأن الذاكرة العاملة للقارئ المشغول محدودة؛ القائمة الطويلة تتحول إلى ضوضاء. «قائمة طويلة مشتتة» هي عكس التركيز.

## الحركة كأداة توجيه
GSAP يربط ظهور العنصر بموضع القارئ: يقرأ المشكلة أولًا فيظهر الرسم، ثم السبب، ثم الحل. هذه **نفس فلسفة هذه الأكاديمية** في [[scene:seven-stations|المشاهد]]: الحركة تخدم ترتيب الفهم. وأي حركة لا تفعل ذلك تُحذف {p21}.`,
        `## Why seven stations in this order?
Because they follow a **manager’s natural questions** in the order they arise: what happened? does it matter? where? why? where should I look? what if we leave it? what do I do? They extend [[l:u2-analysis|the seven questions]] of analysis: there they’re asked to understand; here they’re shown to decide.

## Why only “three” of everything?
Top three areas, three decisions. Because a busy reader’s working memory is limited; long lists turn into noise. “A long, scattered list” is the opposite of focus.

## Motion as a steering tool
GSAP ties an element’s appearance to the reader’s position: they read the problem, then the chart appears, then the cause, then the solution. This is **the same philosophy as this academy’s** [[scene:seven-stations|scenes]]: motion serves the order of understanding. Any motion that doesn’t is deleted {p21}.`),
      practice: L(`## الصفحة التنفيذية لحالة «الكفاءة ٧٪»
| المحطة | المحتوى |
|---|---|
| ١ ماذا حدث؟ | **−٧٪ كفاءة في سبتمبر** |
| ٢ جيد أم سيئ؟ | الخطة +٢٪، أغسطس ثابت ← سيئ بفارق ٩ نقاط |
| ٣ أين؟ | خط ٣، الوردية الليلية، ماكينة التغليف |
| ٤ لماذا؟ | ٣ تغييرات موديل أسبوعيًا (٤٥ د لكل)، توقفات التغليف |
| ٥ أين التركيز؟ | رسم تفاعلي واحد: التوقفات حسب الماكينة والوردية |
| ٦ لو استمر؟ | ~١٨٠ ألف جنيه شهريًا |
| ٧ القرارات | تقليل التغييرات ليلًا (مدير الإنتاج، الأحد) · صيانة التغليف (الصيانة، خلال أسبوع) · مراجعة بعد شهر (الجودة) |

*أرقام افتراضية.* جرّب فلاتر لوحة تفاعلية في [[lab:dashboard|مختبر اللوحة]].`,
        `## The executive page for the “efficiency 7%” case
| Station | Content |
|---|---|
| 1 What happened? | **−7% efficiency in September** |
| 2 Good or bad? | plan +2%, August flat → bad by 9 points |
| 3 Where? | line 3, night shift, packing machine |
| 4 Why? | 3 model changeovers weekly (45 min each), packing stoppages |
| 5 Focus | one interactive chart: stoppages by machine and shift |
| 6 If it continues? | ~180,000 EGP a month |
| 7 Decisions | fewer night changeovers (production manager, Sunday) · packing maintenance (maintenance, within a week) · review in a month (quality) |

*Hypothetical numbers.* Try a dashboard’s filters in [[lab:dashboard|the dashboard lab]].`),
      adv: L(`## الأخطاء الستة كقائمة مراجعة عكسية
قبل إرسال أي صفحة، اسأل عن كل خطأ: هل كل رسم يؤدي لقرار؟ هل لكل رقم مرجع (خطة/فترة سابقة/هدف)؟ هل كل فلتر يستخدمه الجمهور فعلًا؟ هل لكل لون معنى ثابت؟ هل الرقم الأساسي يُقرأ قبل أي حركة؟ هل الرسالة تسبق التفاصيل؟

## «صياغة السبع محطات نصًا أولًا»
البرومبت الثاني يطلب محتوى المحطات **كنص قبل أي رسم أو صفحة** {p22}. لأن الصفحة الجميلة تخفي ضعف القصة؛ أما النص فيكشفه فورًا. نفس منطق [[l:u3-stages|اعتماد التصميم نصًا قبل التنفيذ]] في الدليل الثالث {p24}.

## حدود الصفحة الواحدة
صفحة HTML مستقلة ممتازة للتوزيع، لكنها **لقطة** في لحظة. إن احتاج الناس أرقامًا محدثة لحظيًا أو صلاحيات مختلفة، فأنت أمام [[l:u2-platform|إشارات المنصة]] أو [[l:u4-localapp|تطبيق بخادم]].`,
        `## The six mistakes as a reverse checklist
Before sending any page, ask about each: does every chart lead to a decision? does every number have a reference (plan/previous period/target)? is every filter actually used by the audience? does every colour have a fixed meaning? is the key number read before any motion? does the message come before details?

## “Draft the seven stations as text first”
The second prompt asks for the stations’ content **as text before any chart or page** {p22}. A beautiful page hides a weak story; text exposes it immediately. Same logic as [[l:u3-stages|approving the layout as text before building]] in Guide 3 {p24}.

## Limits of the single page
A standalone HTML page is excellent for distribution but it’s a **snapshot**. If people need live-updating numbers or different permissions, you face [[l:u2-platform|the platform signals]] or [[l:u4-localapp|an app with a server]].`),
    },
    card: {
      what: L("صفحة تنفيذية واحدة بسبع محطات، تُفهم رسالتها في ٣٠ ثانية، مع طبقة عرض اختيارية {p21}.", "One executive page with seven stations, its message understood in 30 seconds, with an optional presentation layer {p21}."),
      why: L("لأن «حائط الرسوم» لا يغيّر قرارًا واحدًا.", "Because a “wall of charts” changes no decision."),
      how: L("رقم ← مقارنة ← أين ← لماذا ← تركيز ← لو استمر ← ثلاثة قرارات بمسؤول وموعد.", "Number → comparison → where → why → focus → if it continues → three owner-dated decisions."),
      inside: L("المحطات تتبع أسئلة المدير الطبيعية؛ والحركة توجّه الترتيب ولا تزيّن.", "Stations follow a manager’s natural questions; motion guides order, not decorates."),
      relation: L("امتداد للأسئلة السبعة في التحليل، ولقاعدة الثلاثين ثانية في الدليل الأول.", "Extends the seven analysis questions and Guide 1’s thirty-second rule."),
      example: L("صفحة «الكفاءة −٧٪» تنتهي بثلاثة قرارات بمسؤولين ومواعيد.", "The “efficiency −7%” page ends with three owner-dated decisions."),
      apply: L("اكتب محطاتك السبع نصًا لتقرير قادم قبل أن ترسم أي شيء.", "Write your seven stations as text for an upcoming report before drawing anything."),
      mistakes: L("رسوم بلا قرار، وأرقام بلا مرجع، وألوان بلا دلالة، وحركة قبل الرقم.", "Charts without decisions, numbers without references, meaningless colours, motion before the number."),
      check: L("هل تذكر المحطات السبع والأخطاء الستة؟", "Can you name the seven stations and six mistakes?"),
      next: L("المشروع المرجعي: ربط المستويات الثلاثة.", "The reference project: linking the three levels."),
    },
    keys: L(["الهدف صفحة واحدة تقود من النتيجة إلى القرار في دقائق {p21}.", "Streamlit للنموذج السريع، Dash للأداة الدائمة، Plotly لصفحة مستقلة بلا إنترنت.", "سبع محطات: ماذا ← جيد أم سيئ ← أين ← لماذا ← التركيز ← لو استمر ← ماذا نفعل.", "معيار النجاح: الرسالة في أول ٣٠ ثانية.", "الحركة لتوجيه الانتباه لا للزينة؛ وستة أخطاء تُفسد الصفحة."],
      ["The goal: one page leading from result to decision in minutes {p21}.", "Streamlit for quick prototypes, Dash for permanent tools, Plotly for an offline standalone page.", "Seven stations: what → good or bad → where → why → focus → if it continues → what now.", "Success criterion: the message in the first 30 seconds.", "Motion directs attention, not decoration; six mistakes ruin the page."]),
    scene: "seven-stations", lab: "dashboard", prompts: ["u2-p-exec-page", "u2-p-seven"],
    quick: [
      { q: L("ما «معيار النجاح الوحيد» للصفحة التنفيذية؟", "What is the executive page’s “only success criterion”?"), opts: L(["عدد الرسوم", "فهم الرسالة الأساسية خلال أول ثلاثين ثانية", "جمال الألوان", "عدد الفلاتر"], ["Number of charts", "Understanding the core message in the first thirty seconds", "Beautiful colours", "Number of filters"]), a: 1, why: L("«تُفهم الرسالة الأساسية خلال أول ثلاثين ثانية… ثم يُترك التعمق لمن يريده» {p21}.", "“The core message is understood in the first thirty seconds… deeper exploration is left to those who want it” {p21}.") },
      { q: L("صفحة تبدأ بحركة الرسوم قبل أن يقرأ المدير الرقم الأساسي. أي خطأ هذا؟", "A page animates charts before the manager reads the key number. Which mistake is this?"), opts: L(["ألوان بلا دلالة", "حركة سابقة للأولوية", "فلاتر بلا استخدام", "أرقام بلا مرجع"], ["Colours without meaning", "Motion before priority", "Unused filters", "Numbers without reference"]), a: 1, why: L("«حركة سابقة للأولوية: تبدأ الحركة قبل أن يقرأ المستخدم الرقم الأساسي» {p21}.", "“Motion before priority: animation starts before the user reads the key number” {p21}.") },
    ],
    related: ["u2-analysis", "u1-present", "u3-stages"], req: ["u2-analysis"], terms: ["streamlit", "dash", "plotly", "jinja", "gsap", "revealjs", "thirty-seconds"],
  });

  ACAD.L({
    id: "u2-project", unit: "u2", pages: [22, 23], icon: "🏗️", diff: 2, mins: 12, tags: ["python", "automation", "analysis"],
    title: L("المشروع المرجعي: من ملفات خام إلى تقرير يُفتح بنقرة", "The reference project: from raw files to a one-click report"),
    hook: L("عشر خطوات تعمل من نفسها، ومعايير قبول تثبت أنه جاهز فعلًا — ومن أين تبدأ أنت.", "Ten steps that run by themselves, acceptance criteria proving it’s really ready — and where you start."),
    book: L(`**المشروع المرجعي — ربط المستويات الثلاثة** {p22}: مشروع واحد يجمع الأتمتة والتحليل والعرض في نظام متكامل يعمل من نفسه، بلا تدخل يدوي بعد الإعداد الأول.

**خط الأنابيب الكامل: عشر خطوات:** ١ مراقبة المجلد ← ٢ قراءة تلقائية ← ٣ تنظيف ودمج ← ٤ فحص الجودة ← ٥ محرك التحليل ← ٦ اكتشاف المشاكل ← ٧ حساب المؤشرات ← ٨ بناء الرسوم ← ٩ صفحة تفاعلية ← ١٠ ملف واحد يُرسل.

**معايير قبول المشروع: كيف تعرف أنه جاهز فعلًا؟** تشغيل واحد متكامل بلا تدخل يدوي في الوسط · سلامة البيانات الأصلية تمامًا بعد كل تشغيل · سجل تشغيل واضح (ماذا قُرئ، وما استُبعد ولماذا) · ينتهي بقرار لا بملخص، ويفهمه القارئ دون شرح شفهي.

**قائمة تحقق قبل التسليم النهائي:** اختبار كامل على بيانات شهر حقيقي، ومقارنة النتيجة رقمًا برقم بالمخرج اليدوي المعتمد · سلوك محدد ومعروف مسبقًا عند ملف ناقص أو عمود مفقود أو صف تالف · مسار واضح ومجرّب لاسترجاع النسخة السابقة من التقرير · صفحة توثيق واحدة تكفي لتسليم الأداة لزميل · مراجعة أن كل رقم ظاهر له مصدر يمكن تتبعه · زمن تنفيذ معلوم ومقبول ضمن نافذة التشغيل.

**مسرد مبسط للمبتدئين** {p22-23}: لا حاجة لحفظ الأسماء؛ يكفي أن تعرف متى تذكرها للذكاء الاصطناعي، وهو يتولى التفاصيل التقنية (Python، xlwings، Playwright، pywinauto، watchdog، DuckDB، Polars، ydata-profiling، Plotly، Streamlit، Dash، Jinja/GSAP/Reveal.js — في القاموس).

**الجدول المرجعي: أي مستوى يناسب حالتك؟** {p23}
| المستوى | يبدأ منه | مثال |
|---|---|---|
| الأول — التشغيل | من ينفذ مهمة يدوية متكررة يوميًا أو أسبوعيًا | نسخ بيانات من نظام إلى إكسل كل صباح |
| الثاني — التحليل | من يملك بيانات جاهزة لكنه لا يفهم سبب تغيّر مؤشر | سبب انخفاض الكفاءة في خط إنتاج |
| الثالث — العرض | من يقدم نتيجة للإدارة بشكل متكرر | تقرير أسبوعي لمدير القسم |

**خارطة تعلم لمن يبدأ من الصفر:** ١ أداة صغيرة أولًا (نقل ملف أو تلخيص شيت) · ٢ فحص جودة حقيقي · ٣ الأسئلة قبل الرسم · ٤ صفحة واحدة تُشارك مع زميل واحد · ٥ المنصة فقط عند الحاجة (بعد أن يثبت أن الأداة يستخدمها أكثر من فريق).

**الخلاصة**: الأتمتة تبدأ من أصغر مهمة متكررة لا من مشروع كبير، والتحليل من فحص الجودة لا من الرسم الأول، والعرض ينجح فقط حين ينتهي بقرار. **لا تنتقل إلى مستوى جديد قبل أن يعمل الذي قبله بثبات وبلا أخطاء صامتة.**`,
      `**The reference project — linking the three levels** {p22}: one project combining automation, analysis and presentation into an integrated system that runs by itself, with no manual step after the initial setup.

**The full pipeline: ten steps:** 1 watch the folder → 2 automatic reading → 3 clean and merge → 4 quality check → 5 analysis engine → 6 detect problems → 7 compute KPIs → 8 build charts → 9 interactive page → 10 a single file sent out.

**Acceptance criteria: how do you know it’s really ready?** one integrated run with no manual step in the middle · original data completely intact after each run · a clear run log (what was read, what was excluded and why) · it ends in a decision, not a summary, understood without verbal explanation.

**Pre-delivery checklist:** a full test on a real month’s data, compared number by number with the approved manual output · defined, known behaviour for a missing file, a missing column or a damaged row · a clear, tested path to restore the previous report version · one documentation page enough to hand the tool to a colleague · a check that every displayed number has a traceable source · a known run time, acceptable within the run window.

**A simple glossary for beginners** {p22-23}: no need to memorise names; just know when to mention them to AI, which handles the technical details (Python, xlwings, Playwright, pywinauto, watchdog, DuckDB, Polars, ydata-profiling, Plotly, Streamlit, Dash, Jinja/GSAP/Reveal.js — see the glossary).

**The reference table: which level fits you?** {p23}
| Level | Who starts here | Example |
|---|---|---|
| 1 — running | anyone doing a repetitive manual task daily or weekly | copying data from a system into Excel every morning |
| 2 — analysis | anyone with data who doesn’t understand why a metric changed | why efficiency dropped on a production line |
| 3 — presentation | anyone presenting results to management regularly | a weekly report for the department head |

**A learning roadmap from zero:** 1 a small tool first (move a file or summarise a sheet) · 2 a real quality check · 3 questions before charts · 4 one page shared with one colleague · 5 a platform only when needed (once the tool is used by more than one team).

**Conclusion**: automation starts from the smallest repetitive task, not a big project; analysis from a quality check, not the first chart; and presentation succeeds only when it ends in a decision. **Don’t move to a new level before the previous one works steadily without silent errors.**`),
    levels: {
      simple: L(`المشروع المرجعي يشبه **خط إنتاج في مصنع**: المادة الخام (ملفاتك) تدخل من ناحية، وتمر بمحطات (تنظيف، فحص جودة، تحليل، رسوم)، وتخرج من الناحية الأخرى منتجًا نهائيًا (تقرير يُفتح بنقرة)، بدون أن يحملها عامل من محطة لمحطة.

وكما أن المصنع لا يشحن منتجًا قبل **فحص الجودة النهائي**، فالمشروع لا يُسلَّم قبل «قائمة التحقق»: هل جرّبناه على شهر حقيقي؟ هل نعرف ماذا يفعل لو جاء ملف ناقص؟

**ومن أين تبدأ أنت؟** من الجدول: هل مشكلتك تكرار يدوي (المستوى ١)، أم رقم لا تفهمه (٢)، أم تقرير للإدارة (٣)؟`,
        `The reference project is like **a factory production line**: raw material (your files) enters at one end, passes through stations (cleaning, quality check, analysis, charts) and leaves as a finished product (a one-click report), without a worker carrying it between stations.

And just as a factory won’t ship before **final quality inspection**, the project isn’t delivered before the “checklist”: did we test it on a real month? do we know what it does if a file is missing?

**Where do you start?** From the table: is your problem manual repetition (level 1), a number you don’t understand (2), or a report for management (3)?`),
      mech: L(`## كيف تتصل الخطوات العشر بالمستويات الثلاثة؟
- **١–٣** (مراقبة، قراءة، تنظيف ودمج) = **المستوى الأول**: التشغيل.
- **٤–٧** (جودة، تحليل، مشاكل، مؤشرات) = **المستوى الثاني**: التحليل.
- **٨–١٠** (رسوم، صفحة، ملف يُرسل) = **المستوى الثالث**: العرض.

لاحظ أن **فحص الجودة (٤) يأتي قبل التحليل (٥)** — تطبيق مباشر لـ«الجودة أولًا». و**اكتشاف المشاكل (٦) قبل المؤشرات (٧)** — حتى لا تُحسب مؤشرات على بيانات فيها مشكلة لم تُعالج.

## لماذا «مسار استرجاع النسخة السابقة»؟
لأن الأداة التي تعمل وحدها كل أسبوع ستخطئ يومًا ما. السؤال ليس «هل ستخطئ؟» بل «كم دقيقة نحتاج لنعود للنسخة الصحيحة؟». هذه نفس فكرة [[l:u5-git|Git]] للأكواد {p32}.`,
        `## How do the ten steps map to the three levels?
- **1–3** (watch, read, clean & merge) = **level 1**: running.
- **4–7** (quality, analysis, problems, KPIs) = **level 2**: analysis.
- **8–10** (charts, page, file sent) = **level 3**: presentation.

Notice **the quality check (4) comes before analysis (5)** — a direct application of “quality first”. And **problem detection (6) precedes KPIs (7)** — so metrics aren’t computed on data with an unresolved problem.

## Why “a path to restore the previous version”?
Because a tool running alone every week will err someday. The question isn’t “will it err?” but “how many minutes to return to the correct version?”. Same idea as [[l:u5-git|Git]] for code {p32}.`),
      practice: L(`## خارطة البداية مطبّقة على موظفة تخطيط إنتاج
1. **أداة صغيرة أولًا:** تجميع ملفات الورديات الثلاث في ملف واحد (أسبوع).
2. **فحص جودة حقيقي:** تكتشف أن الوردية الليلية تكتب التاريخ بصيغة مختلفة.
3. **الأسئلة قبل الرسم:** تطبق الأسئلة السبعة على انخفاض الإنتاج.
4. **صفحة واحدة تُشارك:** مع مدير الإنتاج فقط، وتجمع ملاحظاته.
5. **المنصة؟** ليس بعد: يستخدمها فريق واحد فقط.

## قائمة التحقق كاختبارات
حوّل كل بند في قائمة التحقق إلى حالة اختبار حقيقية قبل التسليم: «احذف عمودًا من نسخة الملف وشغّل»، «شغّل على ملف فارغ»، «قارن إجمالي سبتمبر بالتقرير اليدوي».`,
        `## The starting roadmap applied to a production planner
1. **A small tool first:** combining the three shift files into one (one week).
2. **A real quality check:** she discovers the night shift writes dates differently.
3. **Questions before charts:** she applies the seven questions to a production drop.
4. **One shared page:** with the production manager only, collecting his notes.
5. **A platform?** Not yet: only one team uses it.

## The checklist as tests
Turn each checklist item into a real test case before delivery: “delete a column from a copy and run”, “run on an empty file”, “compare September’s total with the manual report”.`),
      adv: L(`## «بلا أخطاء صامتة» هو شرط الصعود
الكتاب يختم بقاعدة دقيقة: لا تنتقل لمستوى جديد قبل أن يعمل الذي قبله **بثبات وبلا أخطاء صامتة** {p23}. الكلمة المهمة «صامتة»: الأخطاء الظاهرة تُصلح؛ الصامتة تتراكم في كل مستوى فوقها، فيصبح العرض الجميل مبنيًا على تحليل سليم الشكل فوق تشغيل يخطئ بصمت.

## المسرد: لماذا «لا حاجة لحفظ الأسماء»؟
لأن المهارة هي **معرفة متى تذكر الأداة**: «أريد أن يبدأ التنفيذ عند وصول ملف» يكفي ليقترح الذكاء الاصطناعي watchdog. الأسماء تتغير، والوظائف تبقى. راجعها في [[l:u2-level1|خريطة الأدوات]] و[[t:duckdb|القاموس]].

## الجسر للدليل الرابع
المشروع المرجعي يُخرج **ملفًا يُرسل**. عندما تحتاج برنامجًا يقرأ ملفات الجهاز بنفسه ويعرض لوحة تفاعلية محلية بخادم، تنتقل إلى [[l:u4-localapp|التطبيق المتكامل على جهازك]].`,
        `## “No silent errors” is the condition to climb
The book closes with a precise rule: don’t move to a new level before the previous one works **steadily without silent errors** {p23}. The key word is “silent”: visible errors get fixed; silent ones pile up under every level above, until a beautiful presentation rests on sound-looking analysis over a run that errs quietly.

## The glossary: why “no need to memorise names”?
Because the skill is **knowing when to mention the tool**: “I want it to start when a file arrives” is enough for AI to suggest watchdog. Names change; functions stay. Review them in [[l:u2-level1|the tool map]] and [[t:duckdb|the glossary]].

## The bridge to Guide 4
The reference project outputs **a file that gets sent**. When you need a program that reads the machine’s files itself and shows a local interactive dashboard with a server, move on to [[l:u4-localapp|the complete app on your machine]].`),
    },
    card: {
      what: L("خط أنابيب من عشر خطوات يربط التشغيل والتحليل والعرض، بمعايير قبول وقائمة تحقق {p22}.", "A ten-step pipeline linking running, analysis and presentation, with acceptance criteria and a checklist {p22}."),
      why: L("لتسليم أداة يُعتمد عليها لا كود يبدو صحيحًا.", "To deliver a dependable tool, not code that looks right."),
      how: L("مراقبة ← قراءة ← تنظيف ← جودة ← تحليل ← مشاكل ← مؤشرات ← رسوم ← صفحة ← ملف.", "Watch → read → clean → quality → analyse → problems → KPIs → charts → page → file."),
      inside: L("الجودة قبل التحليل، والمشاكل قبل المؤشرات، والسجل والاسترجاع للأخطاء القادمة.", "Quality before analysis, problems before KPIs, and logging and restore for future errors."),
      relation: L("يجمع المستويات الثلاثة، ويطابق معايير المشروع الختامي في الدليل الأول.", "Combines the three levels and matches Guide 1’s capstone criteria."),
      example: L("موظفة تخطيط تبدأ بتجميع ملفات الورديات وتكتشف تاريخًا بصيغة مختلفة.", "A planner starts by combining shift files and finds a different date format."),
      apply: L("حدد مستواك من الجدول المرجعي وابدأ بالخطوة ١ من خارطة التعلم.", "Find your level in the reference table and start step 1 of the roadmap."),
      mistakes: L("البدء بمشروع كبير، والتسليم دون اختبار شهر حقيقي، وبلا مسار استرجاع.", "Starting big, delivering without a real-month test, no restore path."),
      check: L("هل تذكر معايير القبول الأربعة وثلاثة بنود من قائمة التحقق؟", "Can you name the four acceptance criteria and three checklist items?"),
      next: L("الدليل الثالث: من جدول البيانات إلى لوحة معلومات.", "Guide 3: from spreadsheet to dashboard."),
    },
    keys: L(["عشر خطوات من مراقبة المجلد إلى ملف يُرسل، بلا تدخل يدوي {p22}.", "القبول: تشغيل واحد، بيانات أصلية سليمة، سجل واضح، قرار لا ملخص.", "قبل التسليم: اختبار شهر حقيقي رقمًا برقم، وسلوك معروف للناقص، ومسار استرجاع.", "ابدأ من مستواك: تشغيل أو تحليل أو عرض {p23}.", "لا تنتقل لمستوى قبل أن يعمل الذي قبله بلا أخطاء صامتة."],
      ["Ten steps from watching the folder to a file sent, with no manual step {p22}.", "Acceptance: one run, intact originals, a clear log, a decision not a summary.", "Before delivery: a real month tested number by number, known behaviour for missing data, a restore path.", "Start at your level: running, analysis or presentation {p23}.", "Don’t climb before the previous level works without silent errors."]),
    scene: "pipeline10", lab: "pipeline",
    quick: [
      { q: L("في خط الأنابيب، ماذا يأتي مباشرة قبل «محرك التحليل»؟", "In the pipeline, what comes right before the “analysis engine”?"), opts: L(["بناء الرسوم", "فحص الجودة", "إرسال الملف", "حساب المؤشرات"], ["Building charts", "Quality check", "Sending the file", "Computing KPIs"]), a: 1, why: L("الترتيب: … تنظيف ودمج ← فحص الجودة ← محرك التحليل… {p22}.", "The order: … clean & merge → quality check → analysis engine… {p22}.") },
      { q: L("مدير يتسلم تقريرًا كل أسبوع ويقدم نتائجه للإدارة. من أي مستوى يبدأ؟", "A manager receives a weekly report and presents results to leadership. Which level do they start at?"), opts: L(["الأول — التشغيل", "الثاني — التحليل", "الثالث — العرض", "المنصة المؤسسية"], ["1 — running", "2 — analysis", "3 — presentation", "The enterprise platform"]), a: 2, why: L("الجدول المرجعي: من يحتاج تقديم نتيجة للإدارة بشكل متكرر يبدأ من المستوى الثالث {p23}.", "The reference table: those regularly presenting results to management start at level 3 {p23}.") },
    ],
    related: ["u2-principles", "u2-level3", "u4-localapp", "u1-present"], req: ["u2-level3"], terms: ["pipeline", "acceptance-criterion", "run-log"],
  });
})();
