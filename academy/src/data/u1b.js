/* Unit 1 (part B) — Guide 1, pages 10–16: strategic prompts, the second brain, Excel, macros and AI code,
   from report to presentation, and turning the guide into a habit. */
(function () {
  const L = (ar, en) => ({ ar, en });

  ACAD.L({
    id: "u1-think", unit: "u1", pages: [10, 11], icon: "🔬", diff: 2, mins: 11, tags: ["strategy", "analysis"],
    title: L("افهم، شخّص، رتّب الأولويات، وقرّر", "Understand, diagnose, prioritise, decide"),
    hook: L("القسم السابق يساعدك على إنجاز العمل. وهذا القسم يساعدك على معرفة أي عمل يستحق الإنجاز أصلًا.", "The previous section helps you get work done. This one helps you know which work is worth doing at all."),
    book: L(`**القسم الثالث — البرومبتات الاستراتيجية: الفهم · التحليل · القرار** {p10}. القسم السابق يساعدك على إنجاز العمل، وهذا القسم يساعدك على **معرفة أي عمل يستحق الإنجاز أصلًا** — وهو فرق جوهري.

**١ · للفهم والتعلم**
- **فهم موضوع من الصفر**: على مراحل متدرجة: الصورة الكبيرة (لماذا يوجد؟ وما المشكلة التي يحلها؟)، ثم العناصر المرتبطة، وما يجب معرفته أولًا، ثم شرح بسيط، ومثال عملي، واختبار قصير بالإجابات.
- **تثبيت ما تعلمته**: أسئلة مراجعة وتمارين تختبر **الفهم والتطبيق لا الحفظ**، وثلاثة أخطاء شائعة يقع فيها المبتدئون.

**٢ · للتحليل والتشخيص**
- **تفكيك مشكلة**: قسّمها إلى عناصرها، واربط بينها، وحدد الأهم. واقترح الأسباب الجذرية المحتملة مرتبة حسب الاحتمال والتأثير، وما نحتاج معرفته للتأكد من كل سبب.
- **كشف الأنماط الخفية**: الأنماط المتكررة، والعلاقات، والتغيرات غير الطبيعية، والإشارات المهملة — واشرح **لماذا يستحق كل نمط الانتباه** وما يعنيه عمليًا.
- **مقارنة خيارين**: من حيث التكلفة، والوقت، والمخاطر، والعائد، وسهولة التنفيذ، و**قابلية التراجع عن القرار لاحقًا**، في جدول مع توصية وسببها.

**٣ · للأولويات واتخاذ القرار**
- **ترتيب الأولويات** بمعايير: قوة التأثير، ودرجة الاستعجال، والجهد، والمخاطر المترتبة على التأجيل؛ وما أبدأ به، وما يؤجَّل بأمان، وما يُلغى دون خسارة.
- **قرار مدروس** {p11}: افهم الهدف والقيود أولًا، ثم البدائل ومزايا ومخاطر كل منها والنتائج المحتملة، ثم أوصِ بقرار مع الأسباب، و**ما الذي قد يجعلني أغيّر هذا القرار لاحقًا**.`,
      `**Section 3 — strategic prompts: understanding · analysis · decision** {p10}. The previous section helps you get work done; this one helps you **know which work is worth doing at all** — a fundamental difference.

**1 · Understanding and learning**
- **Learning a topic from scratch**: in graded stages: the big picture (why does it exist? what problem does it solve?), then related elements and what to learn first, then a simple explanation, a practical example and a short quiz with answers.
- **Consolidating what you learned**: review questions and exercises that test **understanding and application, not memorisation**, plus three common beginner mistakes.

**2 · Analysis and diagnosis**
- **Breaking down a problem**: split it into elements, link them, identify what matters most; propose likely root causes ranked by probability and impact, and what we need to know to confirm each.
- **Spotting hidden patterns**: recurring patterns, relationships, abnormal changes, overlooked signals — and explain **why each pattern deserves attention** and what it means in practice.
- **Comparing two options**: by cost, time, risk, expected return, ease of execution and **how reversible the decision is later**, in a table with a recommendation and its reason.

**3 · Priorities and decisions**
- **Prioritising** with criteria: impact, urgency, effort and the risk of postponing; what to start with, what to safely postpone, and what to cancel without real loss.
- **A considered decision** {p11}: understand the goal and constraints first, then options with pros, risks and likely outcomes, then recommend a decision with reasons, and **what might make me change this decision later**.`),
    levels: {
      simple: L(`الفرق بين القسمين يشبه الفرق بين **السرعة** و**الاتجاه**. برومبتات الإنتاجية تجعلك تجري أسرع، والبرومبتات الاستراتيجية تتأكد أنك تجري في الاتجاه الصحيح.

تخيّل طبيبًا جيدًا: لا يكتب الدواء فور سماع «عندي صداع». يسأل، ويفحص، ويستبعد أسبابًا، ثم يقرر. البرومبتات هنا تجعل الذكاء الاصطناعي يفكر كهذا الطبيب: **يفهم ثم يشخّص ثم يقرر**.`,
        `The difference between the two sections is like **speed** versus **direction**. Productivity prompts make you run faster; strategic prompts make sure you’re running the right way.

Think of a good doctor: they don’t prescribe the moment they hear “I have a headache”. They ask, examine, rule out causes, then decide. These prompts make AI think like that doctor: **understand, then diagnose, then decide**.`),
      mech: L(`## الأدوات الذهنية داخل البرومبتات
- **التدرج في التعلم**: «الصورة الكبيرة أولًا» ثم التفاصيل؛ لأن العقل يحتاج «رفًا» يضع عليه المعلومة الجديدة. وهي نفس فلسفة هذه الأكاديمية في [[l:u0-journey|المستويات الأربعة للشرح]].
- **الأسباب الجذرية لا الأعراض**: ترتيب الأسباب «حسب الاحتمال وقوة التأثير» + «ما نحتاج معرفته للتأكد» يحوّل التخمين إلى خطة تحقيق.
- **قابلية التراجع**: معيار نادر في المقارنات. القرار الذي يمكن التراجع عنه بسهولة يحتاج تحليلًا أقل من قرار لا رجعة فيه.
- **شرط إعادة النظر**: «ما الذي قد يجعلني أغيّر القرار لاحقًا؟» يجعل القرار **حيًّا**: تعرف مسبقًا العلامات التي تستدعي مراجعته.

## لماذا «لماذا يستحق الانتباه» في كشف الأنماط؟
لأن النموذج قادر على سرد عشرات الملاحظات. الطلب بشرح الأهمية العملية يجبره على **ترتيب** الملاحظات وربطها بالقرار، بدل قائمة طويلة لا تغيّر شيئًا.`,
        `## The thinking tools inside these prompts
- **Graded learning**: “big picture first”, then details, because the mind needs a “shelf” for new information. It’s this academy’s own philosophy in [[l:u0-journey|four explanation levels]].
- **Root causes, not symptoms**: ranking causes “by probability and impact” plus “what we need to know to confirm” turns guessing into an investigation plan.
- **Reversibility**: a rare criterion in comparisons. An easily reversible decision needs less analysis than an irreversible one.
- **A trigger for reconsideration**: “what might make me change the decision later?” keeps the decision **alive**: you know in advance which signs call for a review.

## Why “why it deserves attention” when spotting patterns?
Because the model can list dozens of observations. Asking for practical significance forces it to **rank** them and connect them to the decision, rather than a long list that changes nothing.`),
      practice: L(`## حالة: مقارنة خيارين في شركة صغيرة
**القرار:** شراء ماكينة تغليف جديدة (٤٠٠ ألف) أم التعاقد مع مصنع خارجي للتغليف؟
**المقارنة بالمعايير الستة تكشف ما لا يظهر في السعر:**
| المعيار | شراء الماكينة | التعاقد الخارجي |
|---|---|---|
| التكلفة | عالية مرة واحدة | مستمرة لكل وحدة |
| الوقت | ٣ أشهر للتوريد والتركيب | أسبوعان |
| المخاطر | أعطال وصيانة | الاعتماد على طرف خارجي |
| قابلية التراجع | **صعبة** (أصل ثابت) | **سهلة** (عقد سنوي) |

قابلية التراجع وحدها قد تجعل التعاقد هو البداية الأذكى، ثم الشراء لاحقًا إن ثبت الطلب.

*الأرقام افتراضية للتوضيح.*`,
        `## Case: comparing two options in a small business
**The decision:** buy a new packaging machine (400k) or contract an external packer?
**Comparing on the six criteria reveals what price hides:**
| Criterion | Buy the machine | Outsource |
|---|---|---|
| Cost | high, once | ongoing per unit |
| Time | 3 months to supply and install | two weeks |
| Risk | breakdowns and maintenance | dependence on a third party |
| Reversibility | **hard** (fixed asset) | **easy** (annual contract) |

Reversibility alone may make outsourcing the smarter start, then buying later if demand proves stable.

*Numbers are hypothetical, for illustration.*`),
      adv: L(`## فخاخ التفكير الاستراتيجي مع الذكاء الاصطناعي
- **الإجابة المتوازنة جدًا**: النماذج تميل إلى «يعتمد على الظروف». اطلب توصية واحدة صريحة مع سببها، كما تفعل برومبتات الكتاب.
- **الأسباب العامة**: بدون بياناتك، «الأسباب الجذرية» ستكون أسبابًا شائعة في أي شركة. أرفق الأرقام والملاحظات الفعلية.
- **الثقة الزائدة في الترتيب**: ترتيب الأولويات يعتمد على أوزان المعايير؛ إن لم تحددها، فالنموذج يحددها ضمنيًا. قل صراحة: «المخاطر أهم عندي من السرعة».

## الربط بالتحليل الكمي
تفكيك المشكلة هنا نصي ومفاهيمي. عندما تكون المشكلة رقمية (مثل انخفاض الكفاءة ٧٪)، ينتقل الكتاب إلى [[l:u2-analysis|منهجية الأسئلة السبعة]] وفحص الجودة أولًا {p19}.`,
        `## Traps of strategic thinking with AI
- **The overly balanced answer**: models tend towards “it depends”. Ask for one explicit recommendation with its reason, as the book’s prompts do.
- **Generic causes**: without your data, “root causes” will be causes common to any company. Attach real numbers and observations.
- **Over-trusting the ranking**: prioritisation depends on criterion weights; if you don’t set them, the model sets them implicitly. Say so: “risk matters more to me than speed.”

## Linking to quantitative analysis
Breaking down a problem here is textual and conceptual. When the problem is numeric (like a 7% efficiency drop), the book moves to [[l:u2-analysis|the seven-question method]] and quality checks first {p19}.`),
    },
    card: {
      what: L("برومبتات للفهم والتعلم، والتشخيص، وكشف الأنماط، والمقارنة، والأولويات، والقرار المدروس {p10-11}.", "Prompts for learning, diagnosis, pattern-finding, comparison, prioritising and considered decisions {p10-11}."),
      why: L("لتعرف أي عمل يستحق الإنجاز، لا لتنجز أسرع فقط.", "To know which work is worth doing, not only to work faster."),
      how: L("معايير صريحة، وأسباب مرتبة بالاحتمال والأثر، وشرط لإعادة النظر.", "Explicit criteria, causes ranked by probability and impact, and a reconsideration trigger."),
      inside: L("كل برومبت يفرض ترتيبًا: فهم ← تحليل ← بدائل ← قرار.", "Each prompt imposes an order: understand → analyse → options → decide."),
      relation: L("ينتقل بك من «كيف أنجز؟» إلى «ماذا أنجز؟».", "Moves you from “how do I get it done?” to “what should I do?”."),
      example: L("قابلية التراجع ترجّح التعاقد الخارجي على شراء ماكينة كبداية.", "Reversibility favours outsourcing over buying a machine as a start."),
      apply: L("طبّق «مقارنة خيارين» على قرار معلّق عندك هذا الأسبوع.", "Apply “compare two options” to a pending decision this week."),
      mistakes: L("قبول «يعتمد على الظروف» بدل توصية، وتحليل أسباب بلا بيانات.", "Accepting “it depends” instead of a recommendation; root causes without data."),
      check: L("هل تذكر المعايير الستة لمقارنة خيارين؟", "Can you name the six criteria for comparing two options?"),
      next: L("السيناريوهات، ونقاط الفشل، وتحدي الأفكار، والبرومبت الشامل الاستراتيجي.", "Scenarios, failure points, challenging ideas, and the master strategic prompt."),
    },
    keys: L(["القسم الثالث يجيب: أي عمل يستحق الإنجاز أصلًا؟ {p10}", "تعلّم بالتدرج: الصورة الكبيرة ← العناصر ← مثال ← اختبار.", "شخّص بالأسباب الجذرية المرتبة بالاحتمال والأثر.", "قارن بستة معايير منها «قابلية التراجع».", "القرار المدروس يحدد ما قد يجعلك تغيّره لاحقًا {p11}."],
      ["Section 3 answers: which work is worth doing at all? {p10}", "Learn in grades: big picture → elements → example → quiz.", "Diagnose root causes ranked by probability and impact.", "Compare on six criteria including “reversibility”.", "A considered decision states what would make you change it later {p11}."]),
    prompts: ["u1-p-learn", "u1-p-consolidate", "u1-p-breakdown", "u1-p-patterns", "u1-p-compare2", "u1-p-prioritize", "u1-p-decision"],
    quick: [
      { q: L("أي معيار في «مقارنة خيارين» يساعدك على معرفة كم التحليل الذي يحتاجه القرار؟", "Which “compare two options” criterion tells you how much analysis a decision needs?"), opts: L(["التكلفة", "قابلية التراجع عن القرار لاحقًا", "سهولة التنفيذ", "العائد المتوقع"], ["Cost", "Reversibility of the decision later", "Ease of execution", "Expected return"]), a: 1, why: L("القرار الذي يمكن التراجع عنه بسهولة يحتمل تجربة سريعة؛ أما القرار الذي لا رجعة فيه فيستحق تحليلًا أعمق. الكتاب يضع هذا المعيار صراحة {p10}.", "An easily reversible decision tolerates a quick trial; an irreversible one deserves deeper analysis. The book lists this criterion explicitly {p10}.") },
      { q: L("ما الذي يميز تمارين «تثبيت ما تعلمته» في الكتاب؟", "What distinguishes the “consolidate what you learned” exercises?"), opts: L(["أنها تختبر الحفظ", "أنها تختبر الفهم والتطبيق لا الحفظ، مع أخطاء المبتدئين الشائعة", "أنها طويلة", "أنها بلا إجابات"], ["They test memorisation", "They test understanding and application, not memory, plus common beginner mistakes", "They’re long", "They have no answers"]), a: 1, why: L("«اجعل الأسئلة تختبر الفهم والتطبيق، لا الحفظ» {p10}.", "“Make the questions test understanding and application, not memorisation” {p10}.") },
    ],
    related: ["u1-scenarios", "u2-analysis", "u1-write"], req: ["u1-write"], terms: ["root-cause", "reversibility"],
  });

  ACAD.L({
    id: "u1-scenarios", unit: "u1", pages: [11], icon: "🧭", diff: 2, mins: 11, tags: ["strategy"],
    title: L("السيناريوهات، ونقاط الفشل، وتحدي الأفكار، والبرومبت الشامل الاستراتيجي", "Scenarios, failure points, challenging ideas, and the master strategic prompt"),
    hook: L("لا تدع الذكاء الاصطناعي يوافقك تلقائيًا، ولا تقفز إلى الحل قبل فهم المشكلة.", "Don’t let AI agree with you automatically, and don’t jump to the solution before understanding the problem."),
    book: L(`**٤ · للتوقع والسيناريوهات** {p11}
- **ثلاثة سيناريوهات**: متفائل وواقعي ومتحفظ، ولكل سيناريو **العلامات المبكرة** التي تشير إلى أننا نتجه نحوه، وما ينبغي فعله فور ظهورها.
- **اكتشاف نقاط الفشل مسبقًا**: راجع الخطة كأنك مسؤول عن كشف نقاط فشلها قبل التنفيذ: المخاطر والثغرات والافتراضات الخطرة، مرتبة حسب خطورتها، مع وقاية مسبقة أو خطة بديلة لكل منها.

**٥ · لتحدي الأفكار وتوليدها**
- **اختبار فكرة**: «**لا توافقني تلقائيًا**». ابحث عن نقاط ضعفها والافتراضات غير المعلنة والحالات التي قد تفشل فيها، ثم — **وبعد النقد فقط** — اقترح كيف تُحسَّن.
- **توليد بدائل أبسط** وأقل تكلفة تحقق الهدف نفسه، ولكل بديل: ما الذي نتنازل عنه، ومتى يكون التنازل مقبولًا ومتى لا يكون.

**٦ · للتخطيط والمراجعة**: من هدف إلى خطة بمراحل لكل منها نتيجة ومخاطر، و**أول خطوة اليوم صغيرة بما يكفي لتُنفَّذ خلال ساعة**. والتعلم من التجربة: ما نجح ولماذا، وما فشل ولماذا، والأنماط المتكررة، ثم قائمة تحسينات عملية لا ملاحظات عامة.

**٧ · للتعامل مع المعلومات الناقصة**: ما يمكن استنتاجه بثقة، وما لا يمكن الجزم به، ثم رتّب الناقص حسب أثره: ما يغيّر القرار جذريًا، وما هو «لطيف معرفته» ولا يغيّر شيئًا، ثم **أرخص وأسرع طريقة للحصول على المعلومة الأولى فقط**.

**٨ · البرومبت الشامل الاستراتيجي** — أقوى برومبت في القسم: لا تبدأ بالحل مباشرة: افهم الوضع ← حلّله ← شخّص الأسباب ← اكشف المخاطر والفرص ← اعرض البدائل ← أوصِ بأفضل قرار ← توقّع النتائج ← حوّل القرار إلى خطوات؛ وافصل بين الحقائق والافتراضات.

**لماذا يعمل؟** لأنه يفرض ترتيبًا لا يمكن القفز فوقه. **أغلب القرارات السيئة تنشأ من البدء بالحل قبل فهم المشكلة**، وهذا البرومبت يمنع ذلك بنيويًا.`,
      `**4 · Forecasting and scenarios** {p11}
- **Three scenarios**: optimistic, realistic, cautious — each with the **early signs** that we’re heading towards it and what to do once they appear.
- **Finding failure points in advance**: review the plan as if you were responsible for exposing its failure points before execution: risks, gaps and dangerous assumptions, ranked by severity, each with prevention or a fallback.

**5 · Challenging and generating ideas**
- **Testing an idea**: “**Don’t just agree with me.**” Look for weaknesses, unstated assumptions and cases where it fails; then — **and only after the critique** — suggest how to improve it.
- **Simpler alternatives**: cheaper options achieving the same goal, each with what we give up, and when that trade-off is acceptable and when not.

**6 · Planning and review**: from goal to a plan in phases, each with a result and risks, and **a first step today small enough to finish within an hour**. And learning from experience: what worked and why, what failed and why, recurring patterns, then a list of practical improvements — not general notes.

**7 · Handling missing information**: what can be inferred confidently and what cannot, then rank the missing pieces by impact: what would change the decision radically and what is “nice to know” but changes nothing, then **the cheapest, fastest way to get the first piece only**.

**8 · The master strategic prompt** — the strongest in the section: don’t start with the solution: understand the situation → analyse → diagnose causes → uncover risks and opportunities → present options → recommend the best decision → predict outcomes → turn the decision into steps; and separate facts from assumptions.

**Why does it work?** Because it imposes an order that can’t be skipped. **Most bad decisions come from starting with the solution before understanding the problem**, and this prompt prevents that structurally.`),
    levels: {
      simple: L(`تخيّل أنك قررت فتح فرع جديد، وكل من حولك متحمس. أنت تحتاج شخصًا واحدًا يقول بهدوء: «طيب، وإيه اللي ممكن يبوّظ الخطة دي؟». هذا الشخص لا يكرهك؛ هو **يحميك**.

الذكاء الاصطناعي يميل بطبعه إلى الموافقة والمجاملة. عبارة **«لا توافقني تلقائيًا»** تجعله يلعب دور هذا الشخص المفيد.

والبرومبت الشامل الاستراتيجي يشبه **طبيبًا لا يكتب الدواء قبل التشخيص**: يمشي خطوة خطوة، ولا يسمح لك بالقفز إلى الحل.`,
        `Imagine you’ve decided to open a new branch and everyone around you is excited. You need one person who calmly says: “OK, what could break this plan?” They don’t dislike you; they **protect** you.

AI naturally tends to agree and flatter. The phrase **“don’t just agree with me”** makes it play that useful role.

And the master strategic prompt is like **a doctor who won’t prescribe before diagnosing**: step by step, not letting you jump to the solution.`),
      mech: L(`## أربع آليات للتفكير الواقي
1. **العلامات المبكرة**: السيناريو بلا علامات مجرد قصة. العلامات تحوّله إلى **نظام إنذار**: «إذا انخفضت الطلبات ١٠٪ لشهرين متتاليين، فنحن في السيناريو المتحفظ».
2. **التفكير كمسؤول عن الفشل** (Pre-mortem): أن تتخيل أن الخطة فشلت وتسأل «لماذا؟» يكشف مخاطر لا تظهر حين تسأل «هل ستنجح؟».
3. **النقد قبل التحسين**: «وبعد النقد فقط» تمنع النموذج من تخفيف النقد بسرعة والقفز إلى اقتراحات تجميلية.
4. **ترتيب المعلومات الناقصة حسب أثرها**: ليس كل ناقص يستحق الانتظار. المعلومة التي «لا تغيّر شيئًا» لا تؤخر القرار.

## البرومبت الشامل: ثماني محطات لا يمكن القفز فوقها
فهم ← تحليل ← تشخيص ← مخاطر وفرص ← بدائل ← قرار ← توقع ← خطوات. شاهدها في [[scene:strategic-order|مشهد الترتيب الإلزامي]] وجرّب ماذا يحدث حين تقفز إلى الحل.`,
        `## Four protective thinking mechanisms
1. **Early signs**: a scenario without signs is just a story. Signs turn it into an **alarm system**: “if orders fall 10% two months running, we’re in the cautious scenario.”
2. **Thinking as the one responsible for failure** (pre-mortem): imagining the plan has failed and asking “why?” reveals risks invisible when you ask “will it work?”.
3. **Critique before improvement**: “and only after the critique” stops the model softening the criticism and jumping to cosmetic tweaks.
4. **Ranking missing info by impact**: not every gap deserves waiting. Information that “changes nothing” shouldn’t delay the decision.

## The master prompt: eight unskippable stations
Understand → analyse → diagnose → risks & opportunities → options → decide → predict → steps. Watch them in [[scene:strategic-order|the forced-order scene]] and see what happens when you jump to the solution.`),
      practice: L(`## حالة: مدير مخزن يريد نظام جرد جديد
**فكرته:** نظام باركود كامل لكل الأصناف خلال شهر.
**برومبت «اختبار فكرة» يكشف:** افتراض أن كل الأصناف لها باركود من المورد (غير صحيح لـ٣٠٪ من قطع الغيار المحلية)، وأن العاملين سيتعلمون خلال أسبوع، وأن الشبكة تغطي المخزن الخارجي.
**بعد النقد فقط:** ابدأ بأعلى ٢٠٪ من الأصناف قيمةً، ثم وسّع.

## حالة: قرار عاجل بمعلومات ناقصة
مديرة مبيعات تحتاج قرار تخفيض سعر قبل نهاية الأسبوع، ولا تعرف رد فعل المنافس. برومبت المعلومات الناقصة يفصل: ما نعرفه بثقة (المخزون، الهامش)، وما يغيّر القرار جذريًا (هل سيخفّض المنافس أيضًا؟)، وأرخص طريقة لمعرفته (سؤال ٣ عملاء كبار).

*الحالات توضيحية بأرقام افتراضية.*`,
        `## Case: a warehouse manager wants a new counting system
**The idea:** full barcoding of every item within a month.
**The “test an idea” prompt reveals:** the assumption that every item has a supplier barcode (false for 30% of locally sourced spare parts), that staff will learn within a week, and that the network covers the outdoor store.
**Only after the critique:** start with the top 20% of items by value, then expand.

## Case: an urgent decision with missing information
A sales manager must decide on a price cut before the weekend and doesn’t know how the competitor will react. The missing-info prompt separates what we know confidently (stock, margin), what would change the decision radically (will the competitor cut too?), and the cheapest way to find out (ask 3 major customers).

*Illustrative cases with hypothetical numbers.*`),
      adv: L(`## حدود التحدي والسيناريوهات
- **النقد قد يصبح مبالغًا فيه**: عندما تطلب نقاط الضعف ستحصل دائمًا على بعضها، حتى في فكرة ممتازة. قيّم **خطورة** كل نقطة، لا عددها.
- **السيناريوهات ليست تنبؤات**: هي أدوات استعداد. لا تعرضها على الإدارة كأرقام مؤكدة.
- **«أرخص طريقة للحصول على المعلومة الأولى فقط»**: كلمة «فقط» مقصودة؛ جمع كل المعلومات قبل أي قرار هو شلل تحليلي.

## لماذا «بنيويًا»؟
الكتاب يقول إن البرومبت الشامل يمنع القفز إلى الحل «بنيويًا» {p11}، أي بترتيب الخطوات نفسه، لا بالنصيحة. هذا نفس منطق [[l:u2-level3|المحطات السبع للقصة الإدارية]] {p21} و[[l:u2-analysis|الأسئلة السبعة قبل أي رسم]] {p19}: **الترتيب يحمي من الانحياز**.`,
        `## Limits of challenge and scenarios
- **Critique can overshoot**: ask for weaknesses and you’ll always get some, even for an excellent idea. Weigh each point’s **severity**, not their count.
- **Scenarios aren’t forecasts**: they’re preparation tools. Don’t present them to management as firm numbers.
- **“The cheapest way to get the first piece only”**: “only” is deliberate; gathering everything before deciding is analysis paralysis.

## Why “structurally”?
The book says the master prompt prevents jumping to the solution “structurally” {p11} — through the order of steps itself, not advice. Same logic as [[l:u2-level3|the seven stations of the management story]] {p21} and [[l:u2-analysis|the seven questions before any chart]] {p19}: **order protects against bias**.`),
    },
    card: {
      what: L("سيناريوهات بعلامات مبكرة، وكشف نقاط الفشل، و«لا توافقني تلقائيًا»، وبدائل أبسط، وخطة وتعلم، ومعلومات ناقصة، والبرومبت الشامل {p11}.", "Scenarios with early signs, failure points, “don’t just agree”, simpler options, planning and review, missing info, and the master prompt {p11}."),
      why: L("لأن أغلب القرارات السيئة تبدأ بالحل قبل فهم المشكلة.", "Because most bad decisions start with the solution before understanding the problem."),
      how: L("ترتيب إلزامي: فهم ← تحليل ← تشخيص ← مخاطر ← بدائل ← قرار ← توقع ← خطوات.", "A forced order: understand → analyse → diagnose → risks → options → decide → predict → steps."),
      inside: L("النقد يسبق التحسين، والعلامات المبكرة تحوّل السيناريو إلى إنذار.", "Critique comes before improvement; early signs turn scenarios into alarms."),
      relation: L("يكمل الفهم والتشخيص بأدوات الوقاية والتخطيط.", "Completes understanding and diagnosis with prevention and planning tools."),
      example: L("اختبار فكرة الباركود يكشف أن ٣٠٪ من الأصناف بلا باركود.", "Testing the barcode idea reveals 30% of items lack barcodes."),
      apply: L("قبل أي خطة مهمة، شغّل «اكتشاف نقاط الفشل مسبقًا».", "Before any important plan, run “find failure points in advance”."),
      mistakes: L("قبول الموافقة التلقائية، أو انتظار كل المعلومات قبل القرار.", "Accepting automatic agreement, or waiting for all information before deciding."),
      check: L("هل تستطيع ذكر محطات البرومبت الشامل بالترتيب؟", "Can you recite the master prompt’s stations in order?"),
      next: L("القسم الرابع: العقل الثاني.", "Section 4: the second brain."),
    },
    keys: L(["لكل سيناريو علامات مبكرة وإجراء فوري {p11}.", "راجع الخطة كأنك مسؤول عن كشف فشلها قبل التنفيذ.", "«لا توافقني تلقائيًا»: النقد أولًا، ثم التحسين فقط.", "رتّب المعلومات الناقصة حسب أثرها، واطلب الأولى فقط بأرخص طريقة.", "البرومبت الشامل يمنع القفز إلى الحل بنيويًا."],
      ["Each scenario has early signs and an immediate action {p11}.", "Review the plan as if responsible for exposing its failure.", "“Don’t just agree”: critique first, then improve.", "Rank missing info by impact; get only the first piece, cheaply.", "The master prompt prevents jumping to the solution structurally."]),
    scene: "strategic-order", prompts: ["u1-p-scenarios", "u1-p-premortem", "u1-p-challenge", "u1-p-simpler", "u1-p-plan", "u1-p-retro", "u1-p-missing", "u1-p-master-strat"],
    quick: [
      { q: L("لماذا يعمل البرومبت الشامل الاستراتيجي حسب الكتاب؟", "Why does the master strategic prompt work, according to the book?"), opts: L(["لأنه طويل", "لأنه يفرض ترتيبًا لا يمكن القفز فوقه فيمنع البدء بالحل قبل فهم المشكلة", "لأنه يستخدم كلمات إنجليزية", "لأنه يطلب جدولًا"], ["Because it’s long", "Because it imposes an unskippable order, preventing solution-first thinking", "Because it uses English words", "Because it asks for a table"]), a: 1, why: L("«لأنه يفرض ترتيبًا لا يمكن القفز فوقه… هذا البرومبت يمنع ذلك بنيويًا» {p11}.", "“Because it imposes an order that can’t be skipped… this prompt prevents it structurally” {p11}.") },
      { q: L("في برومبت «اختبار فكرة»، متى يُطلب اقتراح التحسين؟", "In “test an idea”, when is improvement requested?"), opts: L(["في البداية", "بعد النقد فقط", "لا يُطلب أبدًا", "قبل ذكر نقاط الضعف"], ["At the start", "Only after the critique", "Never", "Before listing weaknesses"]), a: 1, why: L("«ثم — وبعد النقد فقط — اقترح كيف يمكن تحسينها» {p11}.", "“Then — and only after the critique — suggest how it can be improved” {p11}.") },
    ],
    related: ["u1-think", "u1-conversation", "u2-level3"], req: ["u1-think"], terms: ["pre-mortem", "assumption", "scenario"],
  });

  ACAD.L({
    id: "u1-brain", unit: "u1", pages: [12, 13], icon: "📚", diff: 2, mins: 13, tags: ["knowledge"],
    title: L("العقل الثاني: من ملفات مبعثرة إلى نظام معرفة", "The second brain: from scattered files to a knowledge system"),
    hook: L("أداة تحدد بالضبط المعرفة المسموح للذكاء الاصطناعي أن يفكر عليها — وهنا تبدأ قيمتها الحقيقية.", "A tool that sets exactly which knowledge AI may think on — and that is where its real value begins."),
    book: L(`**القسم الرابع — العقل الثاني** {p12}. أداة «دفتر» (يسميها الكتاب «جيميني نوتبوك») تتيح لك أن **تحدد بالضبط المعرفة المسموح للذكاء الاصطناعي أن يفكر عليها**.

**ما الذي يميزه عن المساعد العادي؟**
- **المبدأ**: تنشئ «دفترًا» لموضوع أو مشروع، وتضع فيه المصادر التي تثق بها، فتأتي كل الإجابات منها هي وحدها.
- **الفارق**: المساعد العادي قد يخلط مصادرك بالبحث الخارجي. أما داخل الدفتر، فتبقى الإجابة مرتبطة بمصادرك أنت.
- **الضمانة**: كل إجابة مصحوبة باستشهادات ترجعك إلى المكان الأصلي في المصدر، فتتحقق بنفسك بدل التصديق الأعمى.

**ما الذي يقبله؟** ملفات نصية ومستندات وعروضًا تقديمية وجداول وصورًا وكتبًا إلكترونية وصفحات ويب وفيديوهات وتسجيلات صوتية ومستندات السحابة — وملفات السحابة المستوردة تتزامن تلقائيًا عند تغيّر الأصل.

**ما الذي ينتجه؟** تقارير ومستندات، وجداول بيانات، وخرائط ذهنية، وعروضًا وشرائح، وبطاقات واختبارات، وملخصات صوتية (أكثر من ٨٠ لغة منها العربية)، وملخصات فيديو، وصورًا ورسومًا.

**عشر قواعد عملية:** ١ دفتر واحد = هدف واحد · ٢ ابدأ بالمصادر الأصلية · ٣ البحث للاكتشاف لا للتصديق · ٤ اختر المصادر قبل كل سؤال · ٥ اسأل أسئلة أقوى من «لخّص» · ٦ اجعل السؤال الأخير ثابتًا («بناءً على الأدلة فقط، ماذا ينبغي أن أفعل بعد ذلك؟») · ٧ الخريطة الذهنية أولًا · ٨ لكل مخرج وظيفته · ٩ لا تحوّل استنتاجًا إلى مصدر قبل مراجعته · ١٠ حدّث المصادر باستمرار.

**دورة العقل الثاني:** جمع المصادر ← تصفية المصادر ← خريطة الفكرة ← اكتشاف التناقضات ← أسئلة عميقة ← استنتاجات موثقة ← ملاحظات معتمدة ← مخرج نهائي ← تحديث مستمر.

**انتبه لأمرين قبل إدخال بيانات العمل** {p13}: **الخصوصية** — بيانات شركتك تخضع لسياستها الداخلية أولًا فراجعها قبل رفع أي مستند حساس. و**حدود الاستخدام** — الحصة تعتمد جزئيًا على تكلفة المهمة (طول المحادثة، وعدد المصادر، وتعقيد الطلب، ونوع المخرجات)، فوزّع المهام الثقيلة على فترات.`,
      `**Section 4 — the second brain** {p12}. A “notebook” tool (the book calls it “Gemini Notebook”) lets you **set exactly which knowledge AI may think on**.

**What sets it apart from an ordinary assistant?**
- **Principle**: you create a “notebook” for a topic or project and put in the sources you trust, so every answer comes from them alone.
- **Difference**: an ordinary assistant may mix your sources with outside search. Inside the notebook, answers stay tied to your sources.
- **Guarantee**: every answer comes with citations taking you to the original spot in the source, so you check for yourself instead of believing blindly.

**What it accepts:** text files, documents, presentations, spreadsheets, images, e-books, web pages, videos, audio recordings and cloud documents — and imported cloud files sync automatically when the original changes.

**What it produces:** reports and documents, data tables, mind maps, presentations and slides, flashcards and quizzes, audio overviews (80+ languages including Arabic), video overviews, and images and graphics.

**Ten practical rules:** 1 one notebook = one goal · 2 start with original sources · 3 search to discover, not to believe · 4 choose sources before every question · 5 ask stronger questions than “summarise” · 6 keep a fixed final question (“based only on the evidence, what should I do next?”) · 7 the mind map first · 8 every output has its job · 9 don’t turn a conclusion into a source before reviewing it · 10 keep sources updated.

**The second-brain cycle:** gather sources → filter → map the idea → find contradictions → deep questions → documented conclusions → approved notes → final output → continuous update.

**Two cautions before entering work data** {p13}: **privacy** — company data is subject to internal policy first, so check it before uploading anything sensitive. **Usage limits** — the quota depends partly on the task’s cost (chat length, number of sources, request complexity, output type), so spread heavy tasks over time.`),
    levels: {
      simple: L(`تخيّل **مكتبة خاصة** فيها فقط الكتب التي اخترتها أنت بعناية، وأمين مكتبة ذكي لا يجيبك إلا منها، ويشير لك في كل إجابة: «هذا من كتاب كذا، صفحة كذا».

هذا هو العقل الثاني. الفرق عن المساعد العادي: المساعد العادي قد يجيبك من «ذاكرته العامة» أو من الإنترنت، فتختلط معلوماتك بمعلومات لا تعرف مصدرها. أما الدفتر فيلتزم بمصادرك.

**لماذا «عقل ثانٍ»؟** لأنه يحفظ ما لا تستطيع حفظه: كل السياسات والتقارير والإجراءات، وتسأله في أي وقت بدل البحث في عشرات الملفات.`,
        `Imagine a **private library** holding only the books you carefully chose, and a smart librarian who answers only from them, pointing out each time: “this is from book X, page Y.”

That’s the second brain. Unlike an ordinary assistant — which may answer from “general memory” or the internet, mixing your information with sources you can’t trace — the notebook sticks to your sources.

**Why “second brain”?** Because it holds what you can’t: all the policies, reports and procedures, ready to ask at any time instead of searching dozens of files.`),
      mech: L(`## كيف يجيب الدفتر من مصادرك فقط؟ (تبسيط)
1. **التقسيم**: كل مستند يُقسَّم إلى مقاطع صغيرة.
2. **الاسترجاع**: عند سؤالك، يبحث عن المقاطع الأقرب لمعنى السؤال **داخل المصادر المفعّلة فقط**.
3. **الصياغة مع الاستشهاد**: النموذج يكتب الإجابة اعتمادًا على هذه المقاطع، ويضع إشارة لكل مقطع استخدمه.

جرّب نسخة مبسطة جدًا من هذه الآلية في [[lab:retrieval|مختبر العقل الثاني]].

## لماذا القواعد العشر منطقية؟
- **دفتر واحد = هدف واحد** و**اختر المصادر قبل السؤال**: كلما قلّ المحتوى غير المتعلق قلّ التشويش ودقّت الإجابة. «لو لديك ٤٠ مصدرًا والسؤال يخص ٦ فقط، فعّل الستة» {p12}.
- **لا تحوّل استنتاجًا إلى مصدر قبل مراجعته**: وإلا «تكاثر الخطأ داخل عقلك الثاني وصار يستشهد بنفسه» {p12}.
- **حدّث المصادر**: وإلا تحول الدفتر بعد شهرين إلى «متحف رقمي لا يعكس الواقع» {p12}.`,
        `## How does the notebook answer only from your sources? (simplified)
1. **Splitting**: each document is cut into small passages.
2. **Retrieval**: when you ask, it finds the passages closest in meaning **within the active sources only**.
3. **Writing with citations**: the model writes the answer from those passages and marks each one it used.

Try a very simplified version of this mechanism in [[lab:retrieval|the second-brain lab]].

## Why the ten rules make sense
- **One notebook = one goal** and **choose sources before asking**: less irrelevant content means less noise and sharper answers. “If you have 40 sources and the question concerns only 6, enable the six” {p12}.
- **Don’t turn a conclusion into a source before reviewing it**: otherwise “the error multiplies inside your second brain and starts citing itself” {p12}.
- **Keep sources updated**: otherwise after two months the notebook becomes “a digital museum that no longer reflects reality” {p12}.`),
      practice: L(`## مثال: دفتر «سياسات الموارد البشرية»
**المصادر:** سياسة الإجازات، سياسة السفر، دليل الموظف الجديد، لائحة الجزاءات.
**أسئلة أقوى من «لخّص»:**
- «أين تختلف سياسة السفر عن دليل الموظف في بدل الانتقال؟» (اكتشاف التناقض)
- «ما الأسئلة المتكررة من الموظفين الجدد التي لا تجيب عنها هذه المصادر؟» (اكتشاف الفجوات)
- **السؤال الثابت الأخير:** «بناءً على الأدلة فقط، ماذا ينبغي أن أفعل بعد ذلك؟ وما الدليل وراء كل توصية؟»

## لكل مخرج وظيفته (القاعدة ٨)
- **الصوت والفيديو** للمراجعة أثناء التنقل.
- **البطاقات والاختبارات** للتثبيت بعد الفهم.
- **العرض والإنفوجرافيك** لتعليم الآخرين.

**جرّب:** [[lab:retrieval|المختبر]] فيه سياستان للسفر متعارضتان؛ اكتشف كيف يُظهر الدفتر التعارض.`,
        `## Example: an “HR policies” notebook
**Sources:** leave policy, travel policy, new-employee guide, disciplinary rules.
**Questions stronger than “summarise”:**
- “Where does the travel policy differ from the employee guide on transport allowance?” (finding contradictions)
- “Which frequent questions from new hires do these sources not answer?” (finding gaps)
- **The fixed final question:** “Based only on the evidence, what should I do next? What evidence supports each recommendation?”

## Every output has its job (rule 8)
- **Audio and video** for review on the move.
- **Cards and quizzes** to consolidate after understanding.
- **Presentations and infographics** to teach others.

**Try:** [[lab:retrieval|the lab]] contains two conflicting travel policies; see how the notebook exposes the conflict.`),
      adv: L(`## حدود العقل الثاني
- **الدفتر لا يضمن صحة المصادر**: إن وضعت مستندًا قديمًا أو خاطئًا، فستأتي الإجابة «موثقة» بمصدر خاطئ. لذلك القاعدة ٢: ابدأ بالمصادر الأصلية (تقارير رسمية، وثائق الشركة، أبحاث، أدلة تشغيل) ثم الثانوية {p12}.
- **الاستشهاد ليس فهمًا**: الاستشهاد يدلك على المقطع، لكن قد يُفسَّر المقطع خارج سياقه. افتح المصدر وتأكد.
- **«البحث للاكتشاف لا للتصديق»**: البحث العميق يجد مصادر جديدة، لكن **أنت** من يقرر ما يدخل الدفتر بعد مراجعته {p12}.
- **الخصوصية والحصص**: راجع سياسة شركتك قبل رفع الحساس، ووزّع المهام الثقيلة على فترات {p13}.

## من المعرفة إلى القرار
الدفتر ليس مخزنًا فقط؛ برومبت «من المعرفة إلى القرار» يطلب توصيات **مرتبة حسب قوة الدليل**، ويفصل «المدعوم بدليل قوي» عن «مجرد ترجيح» {p13}. هذا هو الجسر نحو [[l:u1-present|العرض الإداري]] حيث يصبح الدفتر «عقل المحتوى» المسؤول عن الصدق والمصادر {p14}.`,
        `## Limits of the second brain
- **The notebook doesn’t guarantee sources are correct**: put in an outdated or wrong document and the answer comes “cited” to a wrong source. Hence rule 2: start with original sources (official reports, company documents, research, operating guides), then secondary ones {p12}.
- **A citation isn’t understanding**: it points to the passage, which may still be read out of context. Open the source and check.
- **“Search to discover, not to believe”**: deep research finds new sources, but **you** decide what enters the notebook after review {p12}.
- **Privacy and quotas**: check policy before uploading anything sensitive and spread heavy tasks over time {p13}.

## From knowledge to decision
The notebook isn’t just storage: the “knowledge to decision” prompt asks for recommendations **ranked by strength of evidence**, separating “strongly supported” from “just an estimate” {p13}. That’s the bridge to [[l:u1-present|the management presentation]], where the notebook becomes the “content brain” responsible for truth and sources {p14}.`),
    },
    card: {
      what: L("دفتر يحدد المعرفة المسموح للذكاء الاصطناعي أن يفكر عليها، وكل إجابة باستشهاد {p12}.", "A notebook that fixes which knowledge AI may think on, every answer cited {p12}."),
      why: L("لتجيب من مصادرك الموثوقة بدل خلطها بمعلومات لا تعرف مصدرها.", "To answer from your trusted sources instead of mixing in untraceable information."),
      how: L("تقسيم المصادر ← استرجاع المقاطع الأقرب من المفعّل فقط ← إجابة مع استشهاد.", "Split sources → retrieve the closest passages from active ones → cited answer."),
      inside: L("الاسترجاع محصور في المصادر التي اخترتها لهذا السؤال.", "Retrieval is confined to the sources you chose for this question."),
      relation: L("يطبّق «السياق» على نطاق كبير، ويغذّي العرض الإداري لاحقًا.", "Applies “context” at scale and later feeds the management presentation."),
      example: L("دفتر سياسات الموارد البشرية يكشف تعارض بدل السفر بين سياستين.", "An HR-policies notebook exposes a travel-allowance conflict between two policies."),
      apply: L("أنشئ دفترًا واحدًا لمشروع واحد فقط، بمصادر أصلية {p15}.", "Create one notebook for one project only, with original sources {p15}."),
      mistakes: L("دفتر عام لكل شيء، وإدخال استنتاجات غير مراجعة كمصادر.", "One catch-all notebook; feeding unreviewed conclusions back in as sources."),
      check: L("هل تستطيع شرح لماذا يقلل اختيار المصادر قبل كل سؤال التشويش؟", "Can you explain why choosing sources before each question reduces noise?"),
      next: L("القفزة: من الاستخدام إلى الأتمتة الفعلية — إكسل.", "The leap: from use to real automation — Excel."),
    },
    keys: L(["الدفتر يحدد المعرفة المسموح للذكاء الاصطناعي أن يفكر عليها {p12}.", "كل إجابة باستشهاد يرجعك للمصدر: تحقق بنفسك.", "دفتر واحد = هدف واحد، واختر المصادر قبل كل سؤال.", "لا تحوّل استنتاجًا إلى مصدر قبل مراجعته، وحدّث المصادر.", "راجع سياسة الخصوصية في شركتك قبل رفع أي مستند حساس {p13}."],
      ["The notebook sets which knowledge AI may think on {p12}.", "Every answer is cited back to the source: verify yourself.", "One notebook = one goal; choose sources before every question.", "Don’t turn a conclusion into a source before review; keep sources updated.", "Check company privacy policy before uploading anything sensitive {p13}."]),
    scene: "notebook", lab: "retrieval", prompts: ["u1-p-nb-conflicts", "u1-p-nb-decide", "u1-p-nb-teach", "u1-p-nb-final"],
    quick: [
      { q: L("لديك ٤٠ مصدرًا في الدفتر، وسؤالك يخص ٦ فقط. ماذا تفعل؟", "You have 40 sources and your question concerns only 6. What do you do?"), opts: L(["تسأل والكل مفعّل", "تفعّل الستة فقط فيقل التشويش وتدق الإجابة", "تحذف الدفتر", "تضيف مصادر أكثر"], ["Ask with all enabled", "Enable just the six so noise drops and the answer sharpens", "Delete the notebook", "Add more sources"]), a: 1, why: L("القاعدة ٤: «فعّل الستة — يقل التشويش وتدق الإجابة» {p12}.", "Rule 4: “enable the six — noise falls and the answer sharpens” {p12}.") },
      { q: L("ما خطر تحويل استنتاج إلى مصدر قبل مراجعته؟", "What is the danger of turning a conclusion into a source before reviewing it?"), opts: L(["يزيد حجم الدفتر", "يتكاثر الخطأ داخل العقل الثاني ويصير يستشهد بنفسه", "يبطئ الأداة", "لا خطر"], ["The notebook grows", "The error multiplies inside the second brain and starts citing itself", "The tool slows down", "No danger"]), a: 1, why: L("القاعدة ٩ في الكتاب {p12}.", "Rule 9 in the book {p12}.") },
    ],
    related: ["u0-capabilities", "u1-present", "u5-system"], req: ["u1-scenarios"], terms: ["notebook", "citation", "source", "rag"],
  });

  ACAD.L({
    id: "u1-excel", unit: "u1", pages: [13], icon: "📗", diff: 2, mins: 10, tags: ["excel", "automation"],
    title: L("القفزة: إكسل مع الذكاء الاصطناعي", "The leap: Excel with AI"),
    hook: L("«أنا أعرف النتيجة التي أريدها، لكني لا أعرف كيف أكتب المعادلة» — هذه بالضبط الفجوة التي يملؤها الذكاء الاصطناعي.", "“I know the result I want, but not how to write the formula” — exactly the gap AI fills."),
    book: L(`**القسم الخامس — القفزة: من الاستخدام إلى الأتمتة الفعلية (إكسل · ماكرو · كود)** {p13}. نقطة البداية الحقيقية لأي متدرب: «أنا أعرف النتيجة التي أريدها، لكني لا أعرف كيف أكتب المعادلة». وهذه بالضبط الفجوة التي يملؤها الذكاء الاصطناعي اليوم.

**المرحلة الأولى · إكسل مع الذكاء الاصطناعي**: لا تبدأ بالكود، ابدأ بمشكلة. الأداة اليوم تبني المعادلات وتشرحها وتصلح الموجود منها، وتنفذ البحث بين الجداول، وتحلل الاتجاهات والقيم الشاذة، وتقترح أعمدة حسابية جديدة.
**الخطوات:** ١ اشرح المشكلة ← ٢ دعه يبني المعادلة ← ٣ افهمها ← ٤ اختبرها ← ٥ طبّقها.

**نموذج الطلب الصحيح لأي معادلة:**
> عندي جدول مبيعات. العمود «أ» فيه اسم المنتج، و«ب» الكمية، و«ج» سعر البيع، و«د» التكلفة. أريد معادلة تحسب هامش الربح كنسبة مئوية، لكن إذا كانت البيانات ناقصة تظهر الخلية فارغة بدل رسالة خطأ. اكتب المعادلة، واشرحها ببساطة، واختبرها على ثلاث حالات مختلفة.

**لاحظ العناصر الثلاثة في الطلب السابق:** وصف دقيق لبنية البيانات، وتعريف واضح للناتج المطلوب، وقاعدة صريحة للحالة الاستثنائية. **غياب أي منها هو سبب معظم المعادلات الخاطئة التي تصل إلى التقارير.**

**سلّم التدرج: تسع مراحل في إكسل** — ١–٣ الأساس: حسابات بسيطة، ثم شروط متعددة، ثم البحث والربط بين جداول مختلفة · ٤–٦ المعالجة: التعامل مع التواريخ، ثم تنظيف النصوص، ثم التصنيفات والفئات · ٧–٩ الاحتراف: مؤشرات الأداء، ثم المعادلات المالية، ثم معادلات مركبة تجمع ما سبق في حل واحد.`,
      `**Section 5 — the leap: from use to real automation (Excel · macro · code)** {p13}. Every learner’s real starting point: “I know the result I want, but I don’t know how to write the formula.” That is exactly the gap AI fills today.

**Stage one · Excel with AI**: don’t start with code; start with a problem. Today the tool builds formulas, explains and fixes existing ones, performs lookups across tables, analyses trends and outliers, and suggests new calculated columns.
**Steps:** 1 explain the problem → 2 let it build the formula → 3 understand it → 4 test it → 5 apply it.

**The right request template for any formula:**
> I have a sales table. Column A has the product name, B the quantity, C the sale price, D the cost. I want a formula that calculates profit margin as a percentage, but if data is missing the cell shows empty instead of an error message. Write the formula, explain it simply, and test it on three different cases.

**Notice the three elements in that request:** an exact description of the data structure, a clear definition of the required output, and an explicit rule for the edge case. **Missing any of them causes most of the wrong formulas that reach reports.**

**The nine-step Excel ladder** — 1–3 foundations: simple calculations, then multiple conditions, then lookups linking different tables · 4–6 processing: dates, then cleaning text, then categories and groups · 7–9 mastery: KPIs, then financial formulas, then compound formulas combining all of the above.`),
    levels: {
      simple: L(`كثير منا يعرف بالضبط ماذا يريد من إكسل: «عايز أعرف الربح كنسبة»، لكنه لا يعرف «لغة» المعادلات. الذكاء الاصطناعي هنا **مترجم**: تقول له ما تريد بالعربي، فيكتبها بلغة إكسل، ثم يشرحها لك.

لكن المترجم يحتاج أن يعرف **أين** البيانات (أي عمود؟)، و**ماذا** تريد بالضبط (نسبة مئوية؟)، و**ماذا يحدث لو** فيه خانة فاضية. هذه هي العناصر الثلاثة التي يركز عليها الكتاب.`,
        `Many of us know exactly what we want from Excel — “I want profit as a percentage” — but not the “language” of formulas. Here AI is a **translator**: you say what you want in plain words; it writes it in Excel’s language, then explains it.

But the translator needs to know **where** the data is (which column?), **what** exactly you want (a percentage?), and **what happens if** a cell is blank. Those are the three elements the book stresses.`),
      mech: L(`## لماذا هذه العناصر الثلاثة تحديدًا؟
| العنصر | ماذا يحدث إن غاب؟ |
|---|---|
| وصف بنية البيانات | النموذج يفترض أعمدة: قد يكتب معادلة على العمود الخطأ تبدو صحيحة |
| تعريف الناتج | «الهامش» قد يُحسب على السعر أو على التكلفة: نتيجتان مختلفتان |
| قاعدة الحالة الاستثنائية | الخلية الفارغة أو الصفر تنتج أخطاء تفسد كل المجاميع بعدها |

## لماذا «افهمها» قبل «اختبرها»؟
المعادلة التي لا تفهمها لا تستطيع اختبارها ذكيًا: لن تعرف أي حالة قد تكسرها. لذلك الطلب يقول «اشرحها ببساطة».

## سلم المراحل التسع
المراحل تتدرج من **حساب** (جمع وطرح) إلى **منطق** (شروط) إلى **ربط** (بحث بين جداول) إلى **تنظيف** (تواريخ ونصوص) إلى **تلخيص** (فئات ومؤشرات) ثم **تركيب** كل ذلك. كل مرحلة تحتاج التي قبلها، تمامًا مثل [[l:u0-journey|سلم الكورس]] نفسه.`,
        `## Why these three elements specifically?
| Element | What happens if it’s missing? |
|---|---|
| Data structure | the model assumes columns: it may write a correct-looking formula on the wrong column |
| Output definition | “margin” can be on price or on cost: two different results |
| Edge-case rule | blanks or zeros produce errors that break every total after them |

## Why “understand” before “test”?
You can’t test a formula smartly if you don’t understand it: you won’t know which case could break it. Hence “explain it simply”.

## The nine-step ladder
Steps climb from **calculation** (adding, subtracting) to **logic** (conditions) to **linking** (lookups across tables) to **cleaning** (dates, text) to **summarising** (categories, KPIs), then **combining** it all. Each step needs the one before, just like [[l:u0-journey|the course ladder]] itself.`),
      practice: L(`## جرّب بنفسك
[[lab:formula|مختبر المعادلة]] يطبق مثال الكتاب حرفيًا: ثلاث صيغ للمعادلة، وثلاث حالات اختبار. لاحظ كيف تفشل الصيغة البسيطة، وكيف تنجح صيغة IFERROR **لكنها تخفي كل الأخطاء**، وكيف تنجح الصيغة ذات القاعدة الصريحة.

## أمثلة لكل مرحلة من السلم
- **شروط متعددة** (المرحلة ٢): «صنّف العميل ذهبيًا إذا زادت مشترياته عن ١٠٠ ألف وسدد في موعده».
- **البحث والربط** (٣): «اجلب سعر المنتج من ورقة الأسعار حسب الكود».
- **التواريخ** (٤): «احسب عدد أيام التأخير في التوريد مع استبعاد الجمعة».
- **تنظيف النصوص** (٥): «وحّد أسماء الفروع المكتوبة بأشكال مختلفة».
- **مؤشرات الأداء** (٧): «نسبة تحقيق الهدف الشهري لكل مندوب».`,
        `## Try it yourself
[[lab:formula|The formula lab]] applies the book’s example literally: three formula versions and three test cases. Notice how the naive one fails, how IFERROR passes **but hides every error**, and how the explicit-rule version succeeds.

## Examples for each ladder step
- **Multiple conditions** (step 2): “classify a customer as gold if purchases exceed 100k and they paid on time.”
- **Lookups** (3): “fetch the product price from the price sheet by code.”
- **Dates** (4): “count supply-delay days excluding Fridays.”
- **Cleaning text** (5): “unify branch names written in different ways.”
- **KPIs** (7): “each rep’s monthly target achievement rate.”`),
      adv: L(`## متى لا تكفي المعادلة؟
- عندما تتكرر **نفس الخطوات اليدوية** كل أسبوع (تنسيق، نسخ، ترتيب) ← هنا يأتي [[l:u1-macro|الماكرو]].
- عندما تتعدد الملفات أو يكبر حجمها حتى يبطئ إكسل ← هنا يأتي [[l:u2-level1|بايثون]] {p19}.
- عندما تحتاج المعادلة شرحًا طويلًا لكل مستخدم ← ربما تحتاج [[l:u3-prepare|لوحة معلومات]] بدل جدول معادلات.

## فخ «المعادلة الوحش»
المعادلة المركبة (المرحلة ٩) مغرية، لكنها صعبة الصيانة. القاعدة التي سيقولها الكتاب للماكرو تنطبق هنا أيضًا: **وحدات صغيرة لا وحش ضخم** {p14}. أحيانًا ثلاثة أعمدة مساعدة واضحة أفضل من معادلة واحدة من ثلاثة أسطر.`,
        `## When isn’t a formula enough?
- When **the same manual steps** repeat weekly (formatting, copying, sorting) → that’s where [[l:u1-macro|macros]] come in.
- When files multiply or grow until Excel slows down → that’s [[l:u2-level1|Python]] territory {p19}.
- When a formula needs a long explanation for every user → perhaps you need a [[l:u3-prepare|dashboard]] instead of a formula sheet.

## The “monster formula” trap
A compound formula (step 9) is tempting but hard to maintain. The rule the book gives for macros applies here too: **small units, not one huge monster** {p14}. Three clear helper columns can beat one three-line formula.`),
    },
    card: {
      what: L("استخدام الذكاء الاصطناعي لبناء معادلات إكسل وشرحها وإصلاحها، بسلم من تسع مراحل {p13}.", "Using AI to build, explain and fix Excel formulas, with a nine-step ladder {p13}."),
      why: L("لأن الفجوة غالبًا في «لغة» المعادلة لا في معرفة النتيجة المطلوبة.", "Because the gap is usually the formula’s “language”, not knowing the desired result."),
      how: L("اشرح ← دعه يبني ← افهم ← اختبر ← طبّق.", "Explain → let it build → understand → test → apply."),
      inside: L("وصف البنية + تعريف الناتج + قاعدة الاستثناء تغلق ثلاثة أبواب للخطأ.", "Structure + output definition + edge-case rule close three doors to error."),
      relation: L("أول خطوة في القفزة نحو الأتمتة، تطبيقًا للعناصر الخمسة على البيانات.", "The first step of the leap to automation, applying the five elements to data."),
      example: L("هامش الربح كنسبة، وخلية فارغة عند نقص البيانات، مختبرة على ٣ حالات.", "Margin as a percentage, blank on missing data, tested on 3 cases."),
      apply: L("اكتب طلب معادلة تحتاجها فعلًا بالعناصر الثلاثة.", "Write a request for a formula you actually need using the three elements."),
      mistakes: L("وصف «عندي جدول» بلا أعمدة، أو IFERROR يخفي كل شيء.", "“I have a table” with no columns, or IFERROR hiding everything."),
      check: L("هل تحدد العناصر الثلاثة في أي طلب معادلة؟", "Can you spot the three elements in any formula request?"),
      next: L("المرحلة الثانية: مسجّل الماكرو، ثم الكود.", "Stage two: the macro recorder, then code."),
    },
    keys: L(["ابدأ بمشكلة لا بكود {p13}.", "اشرح ← دعه يبني ← افهم ← اختبر ← طبّق.", "ثلاثة عناصر: بنية البيانات، الناتج، قاعدة الاستثناء.", "غياب أي عنصر سبب معظم المعادلات الخاطئة في التقارير.", "سلم ٩ مراحل: الأساس ← المعالجة ← الاحتراف."],
      ["Start with a problem, not code {p13}.", "Explain → let it build → understand → test → apply.", "Three elements: data structure, output, edge-case rule.", "Missing any one causes most wrong formulas in reports.", "A 9-step ladder: foundations → processing → mastery."]),
    lab: "formula", prompts: ["u1-p-formula", "u1-p-fix-formula", "u1-p-explain-formula"],
    quick: [
      { q: L("ما «قاعدة الحالة الاستثنائية» في مثال الكتاب؟", "What is the “edge-case rule” in the book’s example?"), opts: L(["أن تكون النسبة مئوية", "إذا كانت البيانات ناقصة تظهر الخلية فارغة بدل رسالة خطأ", "أن العمود «أ» فيه اسم المنتج", "أن تُختبر على ثلاث حالات"], ["That it’s a percentage", "If data is missing the cell shows empty instead of an error", "That column A holds the product name", "That it’s tested on three cases"]), a: 1, ex: [L("هذا تعريف الناتج.", "That’s the output definition."), null, L("هذا وصف بنية البيانات.", "That’s the data structure."), L("هذا جزء من التحقق، لا قاعدة الاستثناء.", "That’s verification, not the edge-case rule.")], why: L("الكتاب يحدد العناصر الثلاثة: البنية، والناتج، و«قاعدة صريحة للحالة الاستثنائية» {p13}.", "The book names three elements: structure, output, and “an explicit rule for the edge case” {p13}.") },
      { type: "order", q: L("رتّب خطوات المرحلة الأولى:", "Order the stage-one steps:"), items: L(["اشرح المشكلة", "دعه يبني المعادلة", "افهمها", "اختبرها", "طبّقها"], ["Explain the problem", "Let it build the formula", "Understand it", "Test it", "Apply it"]), why: L("الترتيب في الكتاب {p13}، والفهم يسبق الاختبار لأنك لا تختبر ذكيًا ما لا تفهمه.", "The book’s order {p13}; understanding precedes testing because you can’t test smartly what you don’t understand.") },
    ],
    related: ["u1-macro", "u1-mistakes", "u3-prepare"], req: ["u1-five"], terms: ["formula", "edge-case"],
  });

  ACAD.L({
    id: "u1-macro", unit: "u1", pages: [13, 14], icon: "⏺️", diff: 2, mins: 13, tags: ["excel", "automation"],
    title: L("الماكرو، ثم دع الذكاء الاصطناعي يكتب الكود", "The macro, then let AI write the code"),
    hook: L("لا تقل «سنتعلم البرمجة». المهارة الجديدة هي وصف العملية بدقة، لا كتابة الكود.", "Don’t say “we’ll learn programming”. The new skill is describing the process precisely, not writing code."),
    book: L(`**المرحلة الثانية · أول أتمتة حقيقية: تسجيل الماكرو** {p13}. الرسالة المحورية: لا تقل «سنتعلم البرمجة». قل: «الذكاء الاصطناعي يحتاج أن يفهم منطق العمل وخطواته ليكتب كودًا صحيحًا ينفذ النتيجة المطلوبة». **المهارة الجديدة هي وصف العملية بدقة، لا كتابة الكود.**

**ما هو مسجّل الماكرو؟** أداة داخل إكسل تسجّل خطواتك وأنت تنفذها بيدك، ثم تحولها تلقائيًا إلى كود جاهز — دون أن تكتب حرفًا واحدًا. الخطوات: ١ نسّق التقرير يدويًا مرة ← ٢ شغّل التسجيل ← ٣ نفّذ الخطوات ← ٤ أوقف التسجيل ← ٥ اضغط زرًا واحدًا فيتنسّق وحده. **الفائدة المزدوجة**: أتمتة فورية تعمل من أول مرة، وكود مكتوب أمامك تقرؤه فتفهم كيف تُترجم خطواتك إلى أوامر.

**المرحلة الثالثة · دع الذكاء الاصطناعي يكتب الكود**: المشكلة ليست أنك لست مبرمجًا؛ المشكلة أنك قبل الذكاء الاصطناعي كنت مضطرًا أن تكتب الكود بنفسك. اليوم المطلوب **وصف العملية بدقة**: الملف، والأوراق، والأعمدة، والخطوات اليدوية، والناتج المطلوب.

**مثال تطبيقي كامل** {p14}: ملف فيه ورقة «البيانات الخام»؛ أريد كودًا يحذف الصفوف الفارغة، ويوحد تنسيق التاريخ، ويحذف التكرار بناءً على رقم الموظف، ثم ينشئ ورقة «التقرير» بملخص لكل إدارة. **الخطوات:** تبويب المطور ← محرر الكود ← إدراج وحدة ← لصق الكود ← حفظ بصيغة ماكرو ← تشغيل.

**قاعدتان لا تُكسران:** (١) **اعمل على نسخة دائمًا**: إجراءات الماكرو لا يمكن التراجع عنها بالطريقة المعتادة، وخطوة خاطئة قد تمسح ساعات عمل بلا رجعة. (٢) **وحدات صغيرة لا وحش ضخم**: عدة وحدات صغيرة لكل منها وظيفة، بدل ماكرو ضخم يستحيل إصلاحه عند أول خطأ.

**البرومبت الذهبي للكود — أهم برومبت في القسم كله**: خبير أتمتة إكسل + بنية الملف بأسمائها الحقيقية + المهمة اليدوية بالترتيب + النتيجة النهائية + «لا تفترض أسماء غير موجودة» + «تعامل مع الصفوف الفارغة والأخطاء والناقص» + «لا تحذف البيانات الأصلية» + «اشرح أين أضع الكود وكيف أشغله لمن لا يعرف البرمجة» + «خمس حالات أختبر بها الكود».

**لماذا هذا القالب أهم من تعلم عشرات الأوامر؟** لأن كل سطر فيه يمنع نوعًا معروفًا من الفشل: «لا تفترض أسماء» يمنع الافتراضات الخاطئة، و«تعامل مع الناقص» يمنع الانهيار عند أول بيان سيئ، و«لا تحذف الأصلية» يمنع فقدان البيانات، و«خمس حالات اختبار» يمنع التسليم بلا تحقق.`,
      `**Stage two · the first real automation: recording a macro** {p13}. The key message: don’t say “we’ll learn programming”. Say: “AI needs to understand the business logic and its steps to write correct code that produces the result.” **The new skill is describing the process precisely, not writing code.**

**What is the macro recorder?** A tool inside Excel that records your steps as you do them by hand, then turns them automatically into ready code — without you typing a single character. Steps: 1 format the report by hand once → 2 start recording → 3 perform the steps → 4 stop recording → 5 press one button and it formats itself. **The double benefit**: instant automation from the first run, and code in front of you that shows how your steps become commands.

**Stage three · let AI write the code**: the problem isn’t that you’re not a programmer; it’s that before AI you had to write the code yourself. Today what’s needed is **describing the process precisely**: the file, sheets, columns, manual steps and required output.

**A complete worked example** {p14}: a file with a “raw data” sheet; I want code that deletes empty rows, unifies the date format, removes duplicates by employee number, then creates a “report” sheet with a summary per department. **Steps:** Developer tab → code editor → insert module → paste code → save as macro-enabled → run.

**Two unbreakable rules:** (1) **always work on a copy**: macro actions can’t be undone the usual way, and one wrong step can wipe hours of work irreversibly. (2) **Small units, not one monster**: several small modules, each with one job, instead of one huge macro that is impossible to fix at the first error.

**The golden code prompt — the most important prompt in the section**: Excel automation expert + the file’s structure with real names + the manual task in order + the final output + “don’t assume names that don’t exist” + “handle empty rows, errors and missing data” + “don’t delete the original data” + “explain where to put the code and how to run it for someone who can’t program” + “five cases to test the code”.

**Why is this template worth more than learning dozens of commands?** Because each line prevents a known type of failure: “don’t assume names” prevents wrong assumptions, “handle missing data” prevents crashing on the first bad value, “don’t delete the original” prevents data loss, and “five test cases” prevents delivery without verification.`),
    levels: {
      simple: L(`مسجّل الماكرو يشبه **مسجّل الصوت**: تضغط «تسجيل»، وتعمل الخطوات بيدك مرة واحدة، ثم تضغط «إيقاف». بعدها كل ما تحتاجه زر واحد ليعيد نفس الخطوات في ثانية، كل أسبوع.

والمرحلة التالية أذكى: بدل أن تسجّل، **تحكي** للذكاء الاصطناعي ماذا تفعل بالضبط (كأنك تشرح لموظف جديد)، فيكتب هو الكود.

**أهم نصيحتين:** جرّب دائمًا على **نسخة** من الملف، وقسّم الشغل إلى **قطع صغيرة**.`,
        `The macro recorder is like a **voice recorder**: press “record”, do the steps by hand once, press “stop”. After that, one button replays the same steps in a second, every week.

The next stage is smarter: instead of recording, you **tell** AI exactly what you do (as if explaining to a new employee), and it writes the code.

**The two key tips:** always test on a **copy** of the file, and split the work into **small pieces**.`),
      mech: L(`## من خطوات إلى أوامر
كل نقرة تسجّلها تصبح سطرًا: «اجعل الصف الأول عريضًا» ← \`Range("A1:B1").Font.Bold = True\`. شاهد ذلك يحدث في [[lab:macro|مختبر مسجّل الماكرو]].

## لماذا الماكرو المسجّل وحده لا يكفي؟
لأنه **يعيد نفس النقرات بالضبط**. إذا زاد عدد الصفوف، أو تحرك عمود، أو ظهرت خلية فارغة، قد يعمل «بنجاح» على المكان الخطأ. لذلك المرحلة الثالثة: وصف **المنطق** للذكاء الاصطناعي ليكتب كودًا يتعامل مع الاستثناءات.

## تشريح البرومبت الذهبي: كل سطر يمنع فشلًا
| السطر | الفشل الذي يمنعه |
|---|---|
| بنية الملف بأسمائها الحقيقية + لا تفترض أسماء | كود يعمل على أعمدة غير موجودة |
| تعامل مع الفارغ والأخطاء والناقص | انهيار عند أول بيان سيئ |
| لا تحذف البيانات الأصلية | فقدان البيانات |
| اشرح أين أضعه وكيف أشغله | كود صحيح لا يعرف أحد تشغيله |
| خمس حالات اختبار | تسليم بلا تحقق |`,
        `## From steps to commands
Every click you record becomes a line: “make the first row bold” → \`Range("A1:B1").Font.Bold = True\`. Watch it happen in [[lab:macro|the macro-recorder lab]].

## Why isn’t a recorded macro enough?
Because it **replays the exact same clicks**. If rows grow, a column moves, or a blank appears, it may run “successfully” on the wrong place. Hence stage three: describing the **logic** to AI so it writes code that handles exceptions.

## Anatomy of the golden prompt: each line prevents a failure
| Line | The failure it prevents |
|---|---|
| File structure with real names + don’t assume names | code running on columns that don’t exist |
| Handle blanks, errors and missing data | crashing at the first bad value |
| Don’t delete the original data | data loss |
| Explain where to put it and how to run it | correct code nobody can run |
| Five test cases | delivery without verification |`),
      practice: L(`## حالة: تقرير الحضور الأسبوعي في الموارد البشرية
**الوضع اليدوي:** كل أحد، تنزيل ملف البصمة، حذف الصفوف الفارغة، توحيد التواريخ، حذف التكرار، ملخص تأخير لكل إدارة: ٧٥ دقيقة.
**وصف العملية للبرومبت الذهبي:**
- **البنية:** ورقة «البيانات الخام»، الأعمدة: رقم الموظف، الاسم، الإدارة، التاريخ، وقت الحضور.
- **الخطوات:** احذف الفارغ ← وحّد التاريخ ← احذف التكرار حسب رقم الموظف والتاريخ ← ورقة «التقرير» بعدد مرات التأخير بعد ٩:١٥ لكل إدارة.
- **الناتج:** ورقة جديدة، والأصلية كما هي.
- **حالات الاختبار:** يوم بلا بيانات، موظف بصم مرتين، تاريخ بصيغة مختلفة، إدارة جديدة، وقت حضور فارغ.

**النتيجة المتوقعة:** زر واحد، ودقيقة واحدة بدل ٧٥. *(أرقام توضيحية.)*`,
        `## Case: the weekly attendance report in HR
**The manual way:** every Sunday, download the fingerprint file, delete empty rows, unify dates, remove duplicates, summarise lateness per department: 75 minutes.
**Describing the process for the golden prompt:**
- **Structure:** sheet “raw data”, columns: employee no., name, department, date, check-in time.
- **Steps:** delete blanks → unify dates → remove duplicates by employee no. and date → a “report” sheet counting check-ins after 9:15 per department.
- **Output:** a new sheet; the original untouched.
- **Test cases:** a day with no data, an employee who checked in twice, a date in a different format, a new department, a blank check-in time.

**Expected result:** one button, one minute instead of 75. *(Illustrative numbers.)*`),
      adv: L(`## المخاطر الحقيقية للأتمتة في إكسل
- **لا تراجع**: Ctrl+Z لا يلغي ما فعله الماكرو. النسخة الاحتياطية ليست نصيحة بل شرط {p14}.
- **الأمان**: ملفات الماكرو يمكن أن تحمل كودًا ضارًا؛ لا تشغّل ماكرو من مصدر لا تثق به، واعرف ماذا يفعل الكود قبل تشغيله (اطلب شرحه سطرًا سطرًا).
- **الصيانة**: ماكرو واحد ضخم «يستحيل إصلاحه عند أول خطأ» {p14}. الوحدات الصغيرة تشبه مبدأ «قراءة، ثم تنظيف، ثم تحليل، ثم إخراج» في [[l:u2-compass|القواعد الهندسية]] {p18}.

## متى تنتقل من الماكرو إلى بايثون؟
عندما تتعدد الملفات، أو تحتاج تشغيلًا تلقائيًا بدون فتح إكسل، أو تتعامل مع متصفح أو أنظمة أخرى. هذا بالضبط ما يبدأ به [[l:u2-principles|الدليل الثاني]].`,
        `## The real risks of Excel automation
- **No undo**: Ctrl+Z doesn’t reverse what a macro did. A backup isn’t advice; it’s a requirement {p14}.
- **Security**: macro files can carry harmful code; never run a macro from an untrusted source, and know what the code does before running it (ask for a line-by-line explanation).
- **Maintenance**: one huge macro “is impossible to fix at the first error” {p14}. Small units mirror the “read, then clean, then analyse, then output” principle of [[l:u2-compass|the engineering rules]] {p18}.

## When to move from macros to Python?
When files multiply, when you need runs without opening Excel, or when you must handle a browser or other systems. That’s exactly where [[l:u2-principles|Guide 2]] begins.`),
    },
    card: {
      what: L("مسجّل الماكرو يحوّل خطواتك إلى كود، ثم الذكاء الاصطناعي يكتب كودًا من وصفك الدقيق {p13-14}.", "The macro recorder turns your steps into code; then AI writes code from your precise description {p13-14}."),
      why: L("لأن المهام المتكررة تستهلك ساعات يمكن أن تصبح ضغطة زر.", "Because repetitive tasks eat hours that could become one click."),
      how: L("وصف البنية والخطوات والناتج + قيود تمنع الفشل + حالات اختبار.", "Describe structure, steps and output + failure-preventing constraints + test cases."),
      inside: L("كل خطوة تتحول إلى أمر؛ والكود المسجّل يعيد النقرات حرفيًا بلا منطق.", "Each step becomes a command; recorded code replays clicks literally, without logic."),
      relation: L("المرحلتان ٢ و٣ من القفزة، بعد معادلات إكسل.", "Stages 2 and 3 of the leap, after Excel formulas."),
      example: L("تقرير حضور أسبوعي من ٧٥ دقيقة إلى زر واحد.", "A weekly attendance report from 75 minutes to one button."),
      apply: L("اختر أصغر مهمة متكررة عندك وسجّل لها ماكرو هذا الأسبوع {p15}.", "Pick your smallest repetitive task and record a macro for it this week {p15}."),
      mistakes: L("التشغيل على الملف الأصلي، وماكرو ضخم واحد، وتشغيل كود لا تفهمه.", "Running on the original file, one giant macro, running code you don’t understand."),
      check: L("هل تستطيع شرح الفشل الذي يمنعه كل سطر في البرومبت الذهبي؟", "Can you explain which failure each line of the golden prompt prevents?"),
      next: L("الحلقة الأخيرة: من التقرير إلى عرض يقنع الإدارة.", "The last link: from report to a presentation that convinces management."),
    },
    keys: L(["المهارة الجديدة: وصف العملية بدقة، لا كتابة الكود {p13}.", "مسجّل الماكرو: أتمتة فورية + كود تقرؤه وتفهمه.", "اعمل على نسخة دائمًا: الماكرو لا يُلغى بالطريقة المعتادة {p14}.", "وحدات صغيرة لا وحش ضخم.", "البرومبت الذهبي: كل سطر يمنع نوعًا معروفًا من الفشل."],
      ["The new skill: describe the process precisely, not write code {p13}.", "The macro recorder: instant automation + code you can read.", "Always work on a copy: macros can’t be undone the usual way {p14}.", "Small units, not one monster.", "The golden prompt: each line prevents a known failure."]),
    scene: "golden-prompt", lab: "macro", prompts: ["u1-p-code-example", "u1-p-golden-code", "u1-p-explain-code"],
    quick: [
      { q: L("لماذا يجب العمل على نسخة عند تشغيل الماكرو؟", "Why must you work on a copy when running a macro?"), opts: L(["لأن الماكرو بطيء", "لأن إجراءاته لا يمكن التراجع عنها بالطريقة المعتادة", "لأن إكسل يطلب ذلك", "لتوفير المساحة"], ["Macros are slow", "Its actions can’t be undone the usual way", "Excel requires it", "To save space"]), a: 1, why: L("«إجراءات الماكرو لا يمكن التراجع عنها بالطريقة المعتادة. خطوة واحدة خاطئة قد تمسح ساعات عمل بلا رجعة» {p14}.", "“Macro actions can’t be undone the usual way. One wrong step can wipe hours of work irreversibly” {p14}.") },
      { q: L("في البرومبت الذهبي، سطر «لا تفترض أسماء أوراق أو أعمدة غير موجودة» يمنع:", "In the golden prompt, “don’t assume sheet or column names that don’t exist” prevents:"), opts: L(["فقدان البيانات", "الافتراضات الخاطئة", "التسليم بلا تحقق", "الانهيار عند بيان سيئ"], ["Data loss", "Wrong assumptions", "Delivery without verification", "Crashing on bad data"]), a: 1, why: L("«لا تفترض أسماء» يمنع الافتراضات الخاطئة {p14}. وبقية الأسطر تمنع الأخطاء الأخرى.", "“Don’t assume names” prevents wrong assumptions {p14}; the other lines prevent the other failures.") },
    ],
    related: ["u1-excel", "u2-principles", "u2-compass"], req: ["u1-excel"], terms: ["macro", "module", "automation", "vba"],
  });

  ACAD.L({
    id: "u1-present", unit: "u1", pages: [14, 15], icon: "🎤", diff: 2, mins: 11, tags: ["presentation"],
    title: L("من التقرير إلى عرض يقنع الإدارة", "From report to a presentation that convinces management"),
    hook: L("المصدر أولًا، ثم القصة، ثم الصورة — وخلط الأدوار هو الخطأ القاتل.", "Source first, then story, then visuals — mixing roles is the fatal mistake."),
    book: L(`**الحلقة الأخيرة — من التقرير إلى عرض يُقنع الإدارة** {p14}. إذا انتهى التقرير… فلماذا تصنع العرض بنفسك؟ ثلاث أدوات يكمل بعضها بعضًا:

| الدور | الأداة | المسؤولية |
|---|---|---|
| **عقل المحتوى** | الدفتر | الصدق والمصادر: يُنشئ شرائح قابلة للتعديل من التقارير، ويُرجع كل معلومة لمصدرها. |
| **مدير القصة** | المساعد المحادثي | الرسالة والترتيب: ما الرسالة؟ من الجمهور؟ أهم ثلاث أفكار؟ ترتيب القصة؟ وما الذي يُحذف؟ |
| **الاستوديو البصري** | مولد الصور | الفهم البصري: صور افتتاحية، ومخططات، وإنفوجرافيك، وخلفيات، ورسوم توضيحية لكل شريحة. |

**خلط الأدوار هو الخطأ القاتل**: ينتج عرضًا جميلًا بلا معنى، أو صحيحًا بلا تأثير. والترتيب نفسه مهم: **لا تبدأ بالتصميم أبدًا**. المصدر أولًا، ثم القصة، ثم الصورة — وإلا صنعت بصريات لأفكار ستحذفها بعد قليل.

**برومبت بناء قصة العرض**: التقرير + الجمهور + القرار المطلوب + خمس دقائق ← الرسالة الواحدة، وأهم ثلاث أفكار، وترتيب الشرائح، والرسم المناسب لكل رقم، وما يجب حذفه، وعنوان كل شريحة وجملتها.
**برومبت مراجعة العرض**: بعين مدير لم يرَ الملف ولديه خمس دقائق: هل الرسالة واضحة في **أول ثلاثين ثانية**؟ ما الشرائح التي لا تضيف شيئًا؟ ما الأسئلة التي لا يجيب عنها العرض؟ هل ينتهي **بقرار أم بمجرد ملخص**؟

**المشروع الختامي — سلسلة واحدة من البيانات إلى القرار:** ملف بيانات خام ← معادلات بالذكاء الاصطناعي ← كود ينظّف ويحلل ← تقرير نهائي ← دفتر يفهم المصادر ← بناء القصة ← البصريات ← عرض إداري جاهز.

**معايير تقييم المشروع** {p15}: هل يعمل النظام كاملًا بزر واحد (من الخام إلى التقرير بلا تدخل يدوي في المنتصف)؟ هل البيانات الأصلية سليمة بعده مهما تكرر التشغيل؟ هل يفهم العرض مدير لم يرَ الملف دون شرح شفهي؟ هل ينتهي العرض بقرار (قرارات محددة بمسؤول وموعد) لا بملخص؟`,
      `**The last link — from report to a presentation that convinces management** {p14}. If the report is done… why build the presentation yourself? Three tools complement each other:

| Role | Tool | Responsibility |
|---|---|---|
| **Content brain** | the notebook | truth and sources: builds editable slides from the reports, tracing every fact to its source. |
| **Story director** | the chat assistant | message and order: what’s the message? who’s the audience? the top three ideas? story order? what gets cut? |
| **Visual studio** | the image generator | visual understanding: opening images, charts, infographics, backgrounds and illustrations per slide. |

**Mixing roles is the fatal mistake**: it produces a beautiful deck with no meaning, or a correct one with no impact. Order matters too: **never start with design**. Source first, then story, then visuals — otherwise you create visuals for ideas you’ll delete shortly.

**The story-building prompt**: the report + audience + decision required + five minutes → one core message, the top three ideas, slide order, the right chart per number, what to cut, and each slide’s title and key sentence.
**The review prompt**: through the eyes of a manager who hasn’t seen the file and has five minutes: is the message clear in **the first thirty seconds**? which slides add nothing? which questions does the deck leave unanswered? does it end **with a decision or just a summary**?

**The capstone — one chain from data to decision:** raw data file → AI-assisted formulas → code that cleans and analyses → final report → a notebook that understands the sources → story building → visuals → management-ready presentation.

**Project evaluation criteria** {p15}: does the system run end to end with one button (raw to report, no manual step in between)? is the original data intact however often it runs? does a manager who hasn’t seen the file understand the deck without verbal explanation? does it end in a decision (specific decisions with owner and date), not a summary?`),
    levels: {
      simple: L(`صناعة عرض تقديمي تشبه **صناعة فيلم**:
- **الكاتب** يتأكد أن القصة حقيقية ومعتمدة على مصادر (الدفتر).
- **المخرج** يقرر ماذا نحكي، وبأي ترتيب، وما الذي نحذفه (المساعد).
- **المصوّر** يصنع الصور الجميلة (مولد الصور).

لو بدأ المصوّر قبل الكاتب، سيصوّر مشاهد ستُحذف من القصة. لذلك الترتيب: **المصدر ← القصة ← الصورة**.

**والأهم:** العرض الجيد لا ينتهي بـ«شكرًا»، بل بـ**قرار**: من سيفعل ماذا، ومتى.`,
        `Making a presentation is like **making a film**:
- The **writer** makes sure the story is true and sourced (the notebook).
- The **director** decides what to tell, in what order, and what to cut (the assistant).
- The **cinematographer** makes the beautiful shots (the image generator).

If the cinematographer starts before the writer, they’ll shoot scenes that get cut. So the order is: **source → story → visuals**.

**Most importantly:** a good deck doesn’t end with “thank you” but with a **decision**: who does what, and when.`),
      mech: L(`## لماذا تفصل الأدوار؟
كل أداة لها نقطة قوة ونقطة ضعف:
- الدفتر **صادق** لأنه مقيد بالمصادر، لكنه لا يعرف ما يهم مديرك.
- المساعد المحادثي **يرتب الرسالة** جيدًا، لكنه قد يملأ الفراغ بأرقام غير موثقة إن لم يُغذَّ بالمصادر.
- مولد الصور **يقنع العين**، لكنه لا يعرف الحقيقة إطلاقًا.

خلطها (مثل أن تطلب من مولد الصور رسمًا بيانيًا بأرقام) ينتج **صورة جميلة لأرقام خاطئة**.

## قاعدة الثلاثين ثانية
مدير مشغول يقرر في أول نصف دقيقة إن كان العرض يستحق انتباهه. لذلك الرسالة الأساسية أولًا، والتفاصيل لمن يريد. نفس القاعدة تتكرر في [[l:u2-level3|الصفحة التنفيذية]] {p21} و[[l:u4-build|التطبيق]] {p31}.`,
        `## Why separate the roles?
Each tool has a strength and a weakness:
- The notebook is **truthful** because it’s bound to sources, but doesn’t know what your manager cares about.
- The chat assistant **orders the message** well but may fill gaps with unsourced numbers if not fed the sources.
- The image generator **persuades the eye** but knows nothing about truth.

Mixing them (say, asking the image generator for a chart with numbers) yields **a beautiful picture of wrong numbers**.

## The thirty-second rule
A busy manager decides in the first half-minute whether the deck deserves attention. So the core message comes first; details for those who want them. The same rule recurs in [[l:u2-level3|the executive page]] {p21} and [[l:u4-build|the app]] {p31}.`),
      practice: L(`## تطبيق: عرض «انخفاض كفاءة خط ٣»
- **الدفتر:** تقرير الإنتاج الشهري + سجل التوقفات + محاضر الصيانة. نطلب منه شرائح بالحقائق والمصادر.
- **المساعد (برومبت القصة):** الجمهور: مدير المصنع. القرار: الموافقة على صيانة وقائية. خمس دقائق. ← الرسالة: «٦٠٪ من التوقفات من ماكينة التغليف، والصيانة الوقائية أرخص من التوقفات بثلاثة أضعاف».
- **مولد الصور:** صورة افتتاحية للخط، وأيقونات للمحطات. **لا أرقام في الصور المولدة.**
- **المراجعة:** برومبت مراجعة العرض يكشف أن الشريحة الأخيرة «ملخص» لا «قرار» ← تُستبدل بثلاثة قرارات بمسؤول وموعد.

*الأرقام افتراضية للتوضيح.*`,
        `## Applying it: the “Line 3 efficiency drop” deck
- **Notebook:** monthly production report + stoppage log + maintenance minutes. We ask it for slides with facts and sources.
- **Assistant (story prompt):** audience: plant manager. Decision: approve preventive maintenance. Five minutes. → message: “60% of stoppages come from the packing machine, and preventive maintenance is three times cheaper than the stoppages.”
- **Image generator:** an opening shot of the line, icons for stations. **No numbers in generated images.**
- **Review:** the review prompt reveals the last slide is a “summary”, not a “decision” → replaced with three decisions with owner and date.

*Hypothetical numbers for illustration.*`),
      adv: L(`## أخطاء متقدمة في العرض
- **الإقناع بالبصريات بدل الأدلة**: إذا كان العرض «جميلًا ولا يغيّر قرارًا» فهو فشل مهما كان أنيقًا {p14}.
- **حذف ما لا يخدم القرار صعب نفسيًا**: الرقم الذي تعبت في حسابه قد لا يخدم الرسالة. برومبت القصة يطلب صراحة «ما الذي يجب حذفه» — هذه أصعب وأهم مساهماته.
- **الصدق في الصور المولدة**: صورة مولدة لمصنع «يشبه» مصنعك قد تُفهم كصورة حقيقية. وضّح أنها توضيحية.

## المشروع الختامي كنظام صغير
لاحظ أن سلسلة المشروع الختامي هي في الحقيقة [[l:u5-system|نظام]] صغير: مصدر ← تجميع ← قواعد ← ذكاء ← عرض ← قرار. معايير التقييم الأربعة (زر واحد، بيانات سليمة، فهم بلا شرح، قرار لا ملخص) هي نفسها معايير القبول في [[l:u2-project|المشروع المرجعي]] {p22}. **الكتاب يكرر نفس المعايير لأنها الصحيحة في كل مستوى.**`,
        `## Advanced presentation mistakes
- **Persuading with visuals instead of evidence**: a deck that is “beautiful and changes no decision” is a failure however elegant {p14}.
- **Cutting what doesn’t serve the decision is emotionally hard**: the number you worked hard on may not serve the message. The story prompt explicitly asks “what must be cut” — its hardest and most valuable contribution.
- **Honesty in generated images**: a generated image of a factory “like” yours may be taken as real. Label it illustrative.

## The capstone as a small system
Notice the capstone chain is really a small [[l:u5-system|system]]: source → aggregation → rules → intelligence → presentation → decision. Its four criteria (one button, intact data, understood without explanation, a decision not a summary) are the same as the acceptance criteria of [[l:u2-project|the reference project]] {p22}. **The book repeats the same criteria because they hold at every level.**`),
    },
    card: {
      what: L("ثلاث أدوات بثلاثة أدوار: الدفتر للصدق، والمساعد للقصة، ومولد الصور للبصريات {p14}.", "Three tools, three roles: notebook for truth, assistant for story, image generator for visuals {p14}."),
      why: L("لأن التقرير الصحيح لا يكفي إن لم يتحول إلى قرار.", "Because a correct report isn’t enough unless it becomes a decision."),
      how: L("المصدر ← القصة ← الصورة، ثم مراجعة بعين مدير لديه خمس دقائق.", "Source → story → visuals, then review through the eyes of a manager with five minutes."),
      inside: L("لكل أداة قوة وضعف؛ الخلط يجمع ضعف الكل.", "Each tool has a strength and a weakness; mixing them combines all the weaknesses."),
      relation: L("ختام الدليل الأول: يربط العقل الثاني والأتمتة في سلسلة واحدة.", "Guide 1’s finale: links the second brain and automation into one chain."),
      example: L("عرض كفاءة خط ٣ ينتهي بثلاثة قرارات بمسؤول وموعد.", "The Line 3 deck ends with three owner-dated decisions."),
      apply: L("راجع آخر عرض قدمته ببرومبت المراجعة: هل ينتهي بقرار؟", "Review your last deck with the review prompt: does it end in a decision?"),
      mistakes: L("البدء بالتصميم، وأرقام داخل صور مولدة، وعرض ينتهي بملخص.", "Starting with design, numbers inside generated images, a deck ending with a summary."),
      check: L("هل تستطيع ذكر معايير تقييم المشروع الأربعة؟", "Can you list the four project evaluation criteria?"),
      next: L("كيف تحول الدليل إلى عادة عمل: الفهرس وخطة ٣٠ يومًا.", "Turning the guide into a habit: the index and the 30-day plan."),
    },
    keys: L(["الدفتر = الصدق والمصادر، المساعد = الرسالة والترتيب، مولد الصور = الفهم البصري {p14}.", "خلط الأدوار هو الخطأ القاتل.", "المصدر أولًا، ثم القصة، ثم الصورة — لا تبدأ بالتصميم.", "الرسالة واضحة في أول ٣٠ ثانية.", "العرض ينتهي بقرار بمسؤول وموعد، لا بملخص {p15}."],
      ["Notebook = truth & sources; assistant = message & order; image generator = visual understanding {p14}.", "Mixing roles is the fatal mistake.", "Source first, then story, then visuals — never start with design.", "The message is clear in the first 30 seconds.", "The deck ends with an owner-dated decision, not a summary {p15}."]),
    scene: "three-tools", prompts: ["u1-p-story", "u1-p-review-deck"],
    quick: [
      { q: L("ما الترتيب الصحيح لبناء العرض؟", "What is the right order for building the deck?"), opts: L(["التصميم ← القصة ← المصدر", "المصدر ← القصة ← الصورة", "القصة ← التصميم ← المصدر", "لا يهم الترتيب"], ["Design → story → source", "Source → story → visuals", "Story → design → source", "Order doesn’t matter"]), a: 1, why: L("«المصدر أولًا، ثم القصة، ثم الصورة — وإلا صنعت بصريات لأفكار ستحذفها بعد قليل» {p14}.", "“Source first, then story, then visuals — otherwise you create visuals for ideas you’ll soon delete” {p14}.") },
      { q: L("أي سؤال من برومبت مراجعة العرض يكشف أن العرض «ملخص» لا «أداة قرار»؟", "Which review-prompt question reveals a deck is a “summary”, not a “decision tool”?"), opts: L(["ما الشرائح التي لا تضيف شيئًا؟", "هل ينتهي العرض بقرار واضح أم بمجرد ملخص؟", "هل الألوان مناسبة؟", "كم عدد الشرائح؟"], ["Which slides add nothing?", "Does the deck end with a clear decision or just a summary?", "Are the colours right?", "How many slides?"]), a: 1, why: L("آخر سؤال في برومبت المراجعة {p14}، ويتكرر كمعيار تقييم للمشروع {p15}.", "The last question of the review prompt {p14}, repeated as a project criterion {p15}.") },
    ],
    related: ["u1-brain", "u2-level3", "u1-habit"], req: ["u1-macro", "u1-brain"], terms: ["thirty-seconds"],
  });

  ACAD.L({
    id: "u1-habit", unit: "u1", pages: [15, 16], icon: "🌱", diff: 1, mins: 10, tags: ["productivity", "prompting"],
    title: L("من دليل إلى عادة: الفهرس السريع وخطة ٣٠ يومًا", "From guide to habit: the quick index and a 30-day plan"),
    hook: L("قراءة الدليل مرة واحدة لا تُحدث التحول. التحول يحدث أسبوعًا بعد أسبوع.", "Reading the guide once doesn’t change anything. Change happens week by week."),
    book: L(`**الفهرس السريع: أي برومبت أستخدم متى؟** {p15}
| حين تكون حالتك… | استخدم |
|---|---|
| لا تعرف من أين تبدأ أصلًا | البرومبت الشامل للإنتاجية |
| أمام قرار كبير وغامض | البرومبت الشامل الاستراتيجي |
| يومك ممتلئ ولا تعرف الأولوية | ترتيب المهام + تقسيم اليوم إلى فترات |
| خارج من اجتماع بملاحظات مبعثرة | برومبت ما بعد الاجتماع |
| تشك أن فكرتك فيها خلل | اختبار فكرة — «لا توافقني تلقائيًا» |
| خطتك جاهزة وتخشى فشلها | اكتشاف نقاط الفشل مسبقًا |
| معلوماتك ناقصة والقرار عاجل | التعامل مع المعلومات الناقصة |
| تملك مصادر كثيرة متضاربة | كشف التناقضات بين المصادر |
| تكرر مهمة إكسل كل أسبوع | البرومبت الذهبي للكود |
| تقريرك جاهز وتحتاج عرضًا مقنعًا | بناء قصة العرض + المراجعة قبل التقديم |

**خارطة التطبيق: من أين تبدأ فعليًا؟** مبتدئ تمامًا ← أعد كتابة أحدث طلب بالعناصر الخمسة · غارق في المهام ← جرّب تنظيم اليوم على مهام الغد · أمام قرار صعب ← البرومبت الشامل الاستراتيجي · ملفات كثيرة مبعثرة ← دفتر واحد لمشروع واحد · تكرر نفس المهمة ← سجّل ماكرو لأصغر مهمة متكررة.

**خطة الثلاثين يومًا** {p15-16}: الأسبوع ١ **الصياغة** (كل طلب مهم بالعناصر الخمسة، ويبدأ بـ«اسألني عن أي معلومة ناقصة») · الأسبوع ٢ **الإنتاجية** (هدف: توفير ساعة واحدة على الأقل أسبوعيًا) · الأسبوع ٣ **القرار والمعرفة** (قرار حقيقي واحد + دفتر واحد) · الأسبوع ٤ **الأتمتة** (أداة واحدة تعمل بضغطة زر). **قاعدة الخطة**: لا تنتقل لأسبوع جديد قبل أن يصبح ما قبله عادة لا تفكر فيها. أسبوع واحد متقن أفضل من أربعة مقروءة على عجل.

**قائمة تحقق قبل اعتماد أي مخرج:** فصل الحقائق عن الافتراضات · التحقق بنفسك من كل رقم رسمي · التجربة على نسخة · طلب نسخة أبسط والمقارنة · معرفة السلوك عند الناقص · القدرة على شرح النتيجة لزميل دون الأداة.

**ثلاثة أخطاء تمنع التحول:** جمع الأدوات بدل إتقان واحدة · الاكتفاء بالإعجاب بالنتيجة («هل تغيّر شيء في عملك هذا الأسبوع؟») · البدء بأكبر مشكلة (ابدأ بأصغر مهمة متكررة).

**التحول المطلوب:** المتدرب يدخل وهو يسأل «كيف أكتب معادلة؟» ويخرج وهو يقول: «**بنيت نظامًا يبدأ بالبيانات وينتهي بعرض للإدارة**».`,
      `**The quick index: which prompt when?** {p15}
| When you… | Use |
|---|---|
| don’t know where to start at all | the master productivity prompt |
| face a big, unclear decision | the master strategic prompt |
| have a full day and no priorities | task ordering + day blocks |
| leave a meeting with scattered notes | the after-meeting prompt |
| suspect your idea is flawed | test an idea — “don’t just agree” |
| have a plan and fear it will fail | find failure points in advance |
| lack information and must decide fast | handling missing information |
| hold many conflicting sources | finding contradictions between sources |
| repeat an Excel task every week | the golden code prompt |
| have a finished report and need a convincing deck | story building + review before presenting |

**The application map: where to actually start?** Complete beginner → rewrite your latest request with the five elements · drowning in tasks → try day-planning on tomorrow’s tasks · facing a hard decision → the master strategic prompt · many scattered files → one notebook for one project · repeating the same task → record a macro for your smallest repetitive task.

**The thirty-day plan** {p15-16}: week 1 **phrasing** (every important request with the five elements, starting with “ask me about any missing information”) · week 2 **productivity** (goal: save at least one hour a week) · week 3 **decisions & knowledge** (one real decision + one notebook) · week 4 **automation** (one tool working at the push of a button). **The plan’s rule**: don’t move to a new week until the previous one is a habit you don’t think about. One mastered week beats four rushed ones.

**Checklist before relying on any output:** facts separated from assumptions · every official number checked yourself · tested on a copy · simpler version requested and compared · behaviour on missing data known · able to explain the result to a colleague without the tool.

**Three mistakes that block change:** collecting tools instead of mastering one · settling for admiring the result (“did anything change in your work this week?”) · starting with the biggest problem (start with the smallest repetitive task).

**The intended transformation:** the learner arrives asking “how do I write a formula?” and leaves saying: “**I built a system that starts with data and ends with a management presentation**”.`),
    levels: {
      simple: L(`الرياضة لا تنفع لو قرأت عنها فقط. نفس الشيء هنا: الدليل مليء بالأفكار، لكن الفائدة تأتي من **التكرار حتى تصبح عادة**.

الخطة بسيطة: **مهارة واحدة كل أسبوع**. لا تنتقل للتالية حتى تستخدم السابقة بدون تفكير. ولو احترت أي برومبت تستخدم، افتح **الفهرس السريع**: يقول لك حسب موقفك.

**سؤال الأسبوع:** هل تغيّر شيء فعلي في شغلك هذا الأسبوع بسبب ما تعلمته؟`,
        `Exercise doesn’t work if you only read about it. Same here: the guide is full of ideas, but the benefit comes from **repetition until it becomes habit**.

The plan is simple: **one skill per week**. Don’t move on until you use the previous one without thinking. And if you’re unsure which prompt to use, open the **quick index**: it tells you, based on your situation.

**This week’s question:** did anything actually change in your work this week because of what you learned?`),
      mech: L(`## لماذا أسبوع لكل مهارة؟
العادة تحتاج تكرارًا في مواقف حقيقية متنوعة. أسبوع كامل من «كل طلب مهم بالعناصر الخمسة» يعني عشرات الطلبات، وهذا ما يحوّل الخطوات من «قائمة تتذكرها» إلى «طريقة تفكير».

## لماذا هذا الترتيب تحديدًا؟
- **الصياغة أولًا** لأن كل ما بعدها طلبات.
- **الإنتاجية ثانيًا** لأنها تعطي أثرًا سريعًا ملموسًا (ساعة أسبوعيًا) يحفّز الاستمرار.
- **القرار والمعرفة ثالثًا** لأنها تحتاج صياغة متمكنة وصبرًا على العمق.
- **الأتمتة أخيرًا** لأنها تحتاج وصف عملية دقيقًا، وهو مهارة تراكمت خلال الأسابيع السابقة.

## قائمة التحقق: آخر بوابة
القائمة الست تختصر كل دروس الدليل: الحقائق والافتراضات ([[l:u1-write|الاستخراج المنظم]])، والتحقق من الأرقام ([[l:u0-limits|الحدود]])، والنسخة ([[l:u1-macro|الماكرو]])، والنسخة الأبسط ([[l:u1-mistakes|الأخطاء الأربعة]])، والحالات الناقصة ([[l:u1-excel|المعادلة]])، وشرح النتيجة لزميل (الفهم الحقيقي).`,
        `## Why a week per skill?
Habits need repetition across varied real situations. A whole week of “every important request with the five elements” means dozens of requests — that’s what turns steps from “a list you remember” into “a way of thinking”.

## Why this order specifically?
- **Phrasing first** because everything after is requests.
- **Productivity second** because it gives quick, tangible impact (an hour a week) that motivates you to continue.
- **Decisions & knowledge third** because they need confident phrasing and patience for depth.
- **Automation last** because it needs precise process description, a skill built up over the previous weeks.

## The checklist: the final gate
The six checks condense the whole guide: facts vs assumptions ([[l:u1-write|structured extraction]]), checking numbers ([[l:u0-limits|limits]]), the copy ([[l:u1-macro|macros]]), the simpler version ([[l:u1-mistakes|four mistakes]]), missing cases ([[l:u1-excel|the formula]]), and explaining to a colleague (real understanding).`),
      practice: L(`## خطتك الشخصية (املأها الآن في ملاحظاتك بالأسفل)
| الأسبوع | مهارة | تطبيق على شغلي | علامة النجاح |
|---|---|---|---|
| ١ | الصياغة | أعيد كتابة طلبات التقارير بالعناصر الخمسة | المدير يعدّل أقل |
| ٢ | الإنتاجية | محضر كل اجتماع بالبرومبت | ساعة موفّرة أسبوعيًا |
| ٣ | القرار والمعرفة | دفتر لسياسات قسمي | أجيب أسئلة الزملاء في دقيقة |
| ٤ | الأتمتة | ماكرو لتنسيق التقرير الأسبوعي | زر واحد |

## الخطوة التالية المقترحة في الكتاب {p16}
«اختر مهمة واحدة صغيرة تتكرر عندك كل أسبوع، وطبّق عليها القسم الخامس من أوله: صف خطواتها بدقة، ثم استخدم البرومبت الذهبي للكود كما هو، ثم اختبر النتيجة على نسخة من الملف قبل أي اعتماد.» — ويمكنك أن تبدأ ذلك الآن في [[q:project|المشروع النهائي]].`,
        `## Your personal plan (fill it now in your notes below)
| Week | Skill | Applied to my work | Sign of success |
|---|---|---|---|
| 1 | Phrasing | rewrite report requests with the five elements | my manager edits less |
| 2 | Productivity | minutes for every meeting via the prompt | one hour saved weekly |
| 3 | Decisions & knowledge | a notebook of my department’s policies | I answer colleagues in a minute |
| 4 | Automation | a macro to format the weekly report | one button |

## The book’s suggested next step {p16}
“Pick one small task that repeats every week and apply section five to it from the start: describe its steps precisely, use the golden code prompt as is, then test the result on a copy of the file before relying on it.” — You can start that now in [[q:project|the final project]].`),
      adv: L(`## الأخطاء الثلاثة بعمق
- **جمع الأدوات**: كل أداة جديدة تبقيك مبتدئًا. والمهارات في هذا الدليل (الصياغة، الوصف الدقيق، التحقق) تنتقل بين الأدوات؛ أتقن مسارًا واحدًا كاملًا ثم وسّع {p16}.
- **الإعجاب بالنتيجة**: نتيجة مبهرة لا تُستخدم «لا قيمة لها». المعيار الوحيد: هل تغيّر شيء في عملك هذا الأسبوع؟
- **البدء بالأكبر**: المشكلة الأكبر هي الأعقد والأكثر استثناءات، فتفشل التجربة الأولى وتنطفئ الحماسة. وهذا نفس منطق [[l:u5-build-system|الشريحة العمودية الضيقة]] في الدليل الخامس {p38}.

## من «كيف أكتب معادلة؟» إلى «بنيت نظامًا»
هذا التحول هو نفسه رحلة [[l:u0-journey|المستويات الثمانية]] مضغوطة في دليل واحد. والدلائل التالية تأخذ كل خطوة فيه إلى مستوى أعمق: الأدوات ببايثون، ولوحات المعلومات، والتطبيقات، والأنظمة والفرق الرقمية.`,
        `## The three mistakes in depth
- **Collecting tools**: every new tool keeps you a beginner. The skills in this guide (phrasing, precise description, verification) transfer between tools; master one full path, then expand {p16}.
- **Admiring the result**: an impressive result that isn’t used “has no value”. The only test: did anything change in your work this week?
- **Starting with the biggest**: the biggest problem is the most complex with the most exceptions, so the first attempt fails and enthusiasm dies. Same logic as [[l:u5-build-system|the narrow vertical slice]] in Guide 5 {p38}.

## From “how do I write a formula?” to “I built a system”
This transformation is the [[l:u0-journey|eight-level journey]] compressed into one guide. The following guides take each step deeper: Python tools, dashboards, applications, systems and digital teams.`),
    },
    card: {
      what: L("فهرس سريع لاختيار البرومبت، وخارطة بداية، وخطة ٣٠ يومًا، وقائمة تحقق، وثلاثة أخطاء {p15-16}.", "A quick index to pick prompts, a starting map, a 30-day plan, a checklist and three mistakes {p15-16}."),
      why: L("لأن قراءة الدليل مرة واحدة لا تُحدث التحول.", "Because reading the guide once creates no change."),
      how: L("مهارة واحدة كل أسبوع، ولا انتقال قبل أن تصبح عادة.", "One skill per week; no moving on until it’s a habit."),
      inside: L("التكرار في مواقف حقيقية يحوّل القائمة إلى طريقة تفكير.", "Repetition in real situations turns a checklist into a way of thinking."),
      relation: L("يلخص الدليل الأول ويمهد لبقية الأدلة.", "Summarises Guide 1 and prepares the rest."),
      example: L("أسبوع الإنتاجية: محضر لكل اجتماع وساعة موفّرة أسبوعيًا.", "Productivity week: minutes for every meeting and an hour saved weekly."),
      apply: L("اكتب خطتك للأسابيع الأربعة في ملاحظات هذا الدرس.", "Write your four-week plan in this lesson’s notes."),
      mistakes: L("جمع الأدوات، والإعجاب بلا استخدام، والبدء بالأكبر.", "Collecting tools, admiring without using, starting big."),
      check: L("هل تختار البرومبت المناسب لموقف عشوائي من الفهرس؟", "Can you pick the right prompt for a random situation from the index?"),
      next: L("الدليل الثاني: بناء أدوات وأنظمة عمل ببايثون.", "Guide 2: building work tools and systems with Python."),
    },
    keys: L(["الفهرس السريع يختار لك البرومبت حسب موقفك {p15}.", "خطة ٣٠ يومًا: صياغة ← إنتاجية ← قرار ومعرفة ← أتمتة.", "لا تنتقل لأسبوع قبل أن يصبح ما قبله عادة {p16}.", "قائمة التحقق الست قبل اعتماد أي مخرج.", "التحول: «بنيت نظامًا يبدأ بالبيانات وينتهي بعرض للإدارة»."],
      ["The quick index picks the prompt for your situation {p15}.", "30-day plan: phrasing → productivity → decisions & knowledge → automation.", "Don’t move on until the previous week is a habit {p16}.", "The six-point checklist before relying on any output.", "The transformation: “I built a system that starts with data and ends with a management presentation”."]),
    scene: "thirty-days",
    quick: [
      { q: L("«خطتك جاهزة وتخشى فشلها» — أي برومبت يقترحه الفهرس؟", "“Your plan is ready and you fear it will fail” — which prompt does the index suggest?"), opts: L(["البرومبت الشامل للإنتاجية", "اكتشاف نقاط الفشل مسبقًا", "كشف التناقضات بين المصادر", "ترتيب المهام"], ["The master productivity prompt", "Finding failure points in advance", "Finding contradictions between sources", "Task ordering"]), a: 1, why: L("الفهرس السريع يربط هذه الحالة ببرومبت اكتشاف نقاط الفشل مسبقًا {p15}.", "The quick index maps this situation to finding failure points in advance {p15}.") },
      { q: L("ما قاعدة خطة الثلاثين يومًا؟", "What is the rule of the 30-day plan?"), opts: L(["أنهِ الخطة في أسرع وقت", "لا تنتقل إلى أسبوع جديد قبل أن يصبح ما قبله عادة", "ابدأ بالأتمتة", "جرّب كل الأدوات"], ["Finish as fast as possible", "Don’t move to a new week before the previous one is a habit", "Start with automation", "Try every tool"]), a: 1, why: L("«لا تنتقل إلى أسبوع جديد قبل أن يصبح ما قبله عادة لا تفكر فيها» {p16}.", "“Don’t move to a new week until the previous one is a habit you don’t think about” {p16}.") },
    ],
    related: ["u1-equation", "u0-journey", "u2-principles"], req: ["u1-present"], terms: ["automation"],
  });
})();
