/* Unit 5 (part B) — Guide 5, pages 37–40: the integrated system and the digital team. */
(function () {
  const L = (ar, en) => ({ ar, en });

  ACAD.L({
    id: "u5-system", unit: "u5", pages: [37], icon: "🔗", diff: 3, mins: 13, tags: ["system", "automation"],
    title: L("النظام: اربط العمليات والبيانات في منظومة واحدة", "The system: link processes and data into one whole"),
    hook: L("الأدوات المتفرقة تحل مشكلات متفرقة. النظام يحل المشكلة الأكبر: إنسان ينقل الأشياء يدويًا بين الأدوات.", "Scattered tools solve scattered problems. A system solves the bigger one: a person carrying things by hand between tools."),
    book: L(`**رابعًا — النظام: اربط العمليات والبيانات في منظومة متكاملة** {p37}. الأدوات المتفرقة تحل مشكلات متفرقة. النظام يحل المشكلة الأكبر: أن تتحدث العمليات والبيانات بعضها مع بعض **دون وسيط بشري ينقل بينها**.

**الفرق بين أداة ونظام:** الأداة تحل خطوة واحدة (تنظف ملفًا، أو تبني تقريرًا، أو ترسل إشعارًا)، وحين تنتهي ينتظر إنسان ليأخذ مخرجها ويدخله في الأداة التالية — هذا الإنسان هو **عنق الزجاجة** ومصدر التأخير والخطأ. أما النظام فيربط الخطوات في سلسلة تبدأ **بحدث** وتنتهي **بقرار**؛ مخرج كل خطوة مدخل التالية تلقائيًا، والإنسان يتدخل عند **الاستثناء والقرار فقط**.

**الاختبار الحاسم:** كم مرة يُنقل فيها شيء يدويًا من مكان إلى مكان في عمليتك؟ كل نقلة يدوية فجوة: نقطة تأخير، ومصدر خطأ محتمل، واعتماد على شخص بعينه. **عدّ هذه النقلات — هي بالضبط قائمة ما ستبنيه.**

**الطبقات الخمس:** ١ المصادر (أنظمة المؤسسة، وإكسل، والبريد، والنماذج الميدانية، والأجهزة) · ٢ التجميع والتوحيد (قراءة وتنظيف وتوحيد المسميات والتواريخ) · ٣ المنطق والقواعد (تُكتب مرة واحدة فلا تتضارب) · ٤ الذكاء (ما يحتاج حكمًا لا حسابًا: تفسير الانحراف، وتصنيف نص حر، واقتراح سبب، وصياغة توصية) · ٥ العرض والإجراء (إشعار، ومهمة تُفتح، وتقرير يُرسل — **النظام الذي ينتهي عند العرض نصف نظام**).

**المبادئ الأربعة:** مصدر حقيقة واحد (لكل رقم تعريف واحد ومكان واحد) · البناء على الأحداث لا المواعيد («عند وصول ملف جديد» أفضل من «كل يوم التاسعة») · قابلية التتبع الكاملة (كل رقم يُتتبع حتى صفه في المصدر) · الإنسان في نقاط القرار (القرار ذو الأثر المالي أو التنظيمي بموافقة بشرية صريحة).

**رحلة حدث واحد:** حدث: بيانات جديدة ← تجميع وتوحيد ← فحص جودة ← تطبيق القواعد ← كشف الانحراف ← تفسير بالذكاء ← إشعار المسؤول ← قرار موثّق.`,
      `**Fourth — the system: link processes and data into an integrated whole** {p37}. Scattered tools solve scattered problems. A system solves the bigger one: making processes and data talk to each other **without a human go-between carrying things across**.

**Tool vs system:** a tool solves one step (cleans a file, builds a report, sends a notification); when it finishes, a person waits to take its output into the next tool — that person is **the bottleneck** and the source of delay and error. A system chains the steps, starting from **an event** and ending in **a decision**; each step’s output feeds the next automatically, and the human steps in **only for exceptions and decisions**.

**The decisive test:** how many times is something moved by hand from place to place in your process? Each manual handoff is a gap: a delay point, a possible error source, and dependence on one person. **Count these handoffs — they are exactly your build list.**

**The five layers:** 1 sources (enterprise systems, Excel, email, field forms, devices) · 2 gathering & unifying (read, clean, unify names and date formats) · 3 logic & rules (written once so they never conflict) · 4 intelligence (what needs judgement, not arithmetic: explaining a deviation, classifying free text, suggesting a cause, drafting a recommendation) · 5 display & action (a notification, an opened task, a report sent — **a system that ends at display is half a system**).

**The four principles:** one source of truth (one definition and one place per number) · build on events, not schedules (“when a new file arrives” beats “every day at 9”) · full traceability (every number traces back to its row in the source) · humans at decision points (decisions with financial or organisational impact need explicit human approval).

**One event’s journey:** event: new data → gather & unify → quality check → apply rules → detect deviation → explain with AI → notify the owner → documented decision.`),
    levels: {
      simple: L(`تخيّل مكتبًا فيه **ساعٍ** يحمل الأوراق بين خمس غرف: يأخذ الكشف من المخزن للمحاسبة، ثم من المحاسبة للمدير، ثم من المدير للأرشيف. لو غاب الساعي يومًا، **توقف كل شيء**. ولو أسقط ورقة، **لا أحد يعرف**.

الأدوات المتفرقة = غرف ممتازة… والساعي ما زال يجري بينها.
**النظام** = أنابيب تنقل الأوراق تلقائيًا من غرفة لغرفة، والإنسان يُستدعى فقط حين تحتاج ورقة **توقيعًا أو قرارًا**.

ابدأ بسؤال بسيط: **كم مرة يحمل الساعي شيئًا في عمليتك؟** هذا العدد هو خريطة عملك.`,
        `Imagine an office with a **runner** carrying papers between five rooms: from the store to accounting, then to the manager, then to the archive. If the runner is off one day, **everything stops**. If a page drops, **nobody knows**.

Scattered tools = excellent rooms… with the runner still running between them.
**A system** = pipes that move papers automatically room to room; a person is called only when a page needs **a signature or a decision**.

Start with a simple question: **how many times does the runner carry something in your process?** That number is your work map.`),
      mech: L(`## الطبقات الخمس كمصنع
**المصادر** هي المواد الخام، و**التجميع والتوحيد** خط الفرز، و**القواعد** آلة المعالجة المضبوطة، و**الذكاء** مراقب الجودة الذي يفسّر الغريب، و**العرض والإجراء** بوابة الشحن. شاهدها تتراكب في [[scene:system-layers|مشهد الطبقات]].

## لماذا «الذكاء» طبقة منفصلة عن «القواعد»؟
لأن الحساب يجب أن يكون **ثابتًا** (نفس المدخل = نفس الرقم دائمًا)، أما التفسير والتصنيف والتوصية فتحتاج **حكمًا**. خلط الاثنين — ترك النموذج يحسب أرقامًا مالية — «يُنتج نتائج غير ثابتة بين تشغيل وآخر» {p38}.

## الأحداث لا المواعيد
نظام «كل يوم ٩ صباحًا» يعمل أحيانًا قبل وصول الملف (فيعطي تقريرًا ناقصًا) وأحيانًا بعده بساعات (فيتأخر القرار). نظام «عند وصول ملف جديد» يبدأ **حين تتوفر البيانات فعلًا** {p37}.

جرّب عدّ النقلات وإغلاقها في [[lab:system|مختبر النظام]].`,
        `## The five layers as a factory
**Sources** are raw materials, **gathering & unifying** the sorting line, **rules** the calibrated processing machine, **intelligence** the quality inspector explaining the odd, and **display & action** the shipping gate. Watch them stack in [[scene:system-layers|the layers scene]].

## Why is “intelligence” separate from “rules”?
Because calculation must be **deterministic** (same input = same number, always), while explaining, classifying and recommending need **judgement**. Mixing them — letting the model compute financial figures — “produces results that vary between runs” {p38}.

## Events, not schedules
A “daily at 9 am” system sometimes runs before the file arrives (an incomplete report) and sometimes hours after (a late decision). An “on new file” system starts **when the data is actually there** {p37}.

Try counting and closing handoffs in [[lab:system|the system lab]].`),
      practice: L(`## مثال: تقرير الكفاءة الأسبوعي في مصنع (أرقام افتراضية)
| النقلة اليدوية الحالية | الوقت | الخطر |
|---|---|---|
| مشرف ينسخ أرقام الإنتاج من النظام إلى إكسل | ٤٥ دقيقة | خطأ نسخ صامت |
| محاسب يدمج ملف التوقفات بالبريد | ٣٠ دقيقة | ملف قديم |
| مهندس يحسب الكفاءة بتعريفه الخاص | ٢٠ دقيقة | تعريف مختلف عن المالية |
| المدير يطلب التقرير ويتابع بالهاتف | ٢٠ دقيقة | تأخير القرار |

**أربع نقلات = أربع فجوات.** النظام يغلق النقل والحساب والتنبيه، ويُبقي للمدير **قرار** تعديل الوردية فقط.

## المبادئ الأربعة في سؤال واحد لكل منها
- مصدر واحد: «أين يُحسب هذا الرقم؟ في مكان واحد؟»
- أحداث: «ما الحدث الذي يبدأ التشغيل؟»
- تتبع: «لو سأل المدير عن رقم، هل أصل لصفه في المصدر؟»
- الإنسان: «أي خطوة تحتاج توقيعًا بشريًا صريحًا؟»`,
        `## Example: a factory’s weekly efficiency report (hypothetical numbers)
| Current manual handoff | Time | Risk |
|---|---|---|
| A supervisor copies output figures from the system into Excel | 45 min | silent copy error |
| An accountant merges the downtime file from email | 30 min | an old file |
| An engineer computes efficiency with their own definition | 20 min | a different definition from finance |
| The manager asks for the report and chases by phone | 20 min | delayed decision |

**Four handoffs = four gaps.** The system closes moving, computing and alerting, leaving the manager only **the decision** to adjust the shift.

## The four principles as one question each
- One source: “where is this number computed? in one place?”
- Events: “what event starts the run?”
- Traceability: “if the manager asks about a number, can I reach its source row?”
- Human: “which step needs an explicit human signature?”`),
      adv: L(`## «النظام الذي ينتهي عند العرض نصف نظام»
لوحة جميلة لا يترتب عليها شيء تعيد الإنسان ساعيًا: يقرأ اللوحة ثم يرسل بريدًا ثم يفتح مهمة. الطبقة الخامسة تغلق الحلقة: **إشعار للمسؤول، ومهمة تُفتح تلقائيًا، وتقرير يُرسل في موعده** {p37}.

## قابلية التتبع شرط الثقة
«بلا ذلك لن يثق أحد بالنظام عند أول رقم غريب» {p37}. التتبع يعني أن كل رقم يحمل «عنوانه»: الملف، والصف، وتاريخ القراءة، والقاعدة التي طُبقت. هذا امتداد لسجل التشغيل في [[l:u2-principles|الدليل الثاني]].

## الإنسان في نقاط القرار — لا في النقل
المعادلة معكوسة عن الوضع الحالي: اليوم الإنسان يقضي وقته في **النقل والتجميع** ويتخذ القرار على عجل. في النظام، الأتمتة تتولى النقل والحساب والتنبيه، والإنسان يتفرغ **للقرار** {p37} — وهي فكرة [[l:u0-journey|الرحلة]]: من أداة إلى نظام إلى فريق.`,
        `## “A system that ends at display is half a system”
A pretty board that triggers nothing turns the person back into a runner: read the board, send an email, open a task. Layer five closes the loop: **a notification to the owner, a task opened automatically, a report sent on time** {p37}.

## Traceability is the condition for trust
“Without it nobody will trust the system at the first odd number” {p37}. Traceability means each number carries its “address”: the file, the row, the read time, the rule applied. It extends the run log from [[l:u2-principles|Guide 2]].

## Humans at decisions — not at transport
The equation flips today’s reality: now the person spends time **moving and gathering** and decides in a rush. In a system, automation moves, computes and alerts, and the person is freed **for the decision** {p37} — the [[l:u0-journey|journey]] idea: from tool to system to team.`),
    },
    card: {
      what: L("سلسلة تبدأ بحدث وتنتهي بقرار، بلا ساعٍ بشري بين الخطوات {p37}.", "A chain from event to decision with no human runner between steps {p37}."),
      why: L("لأن كل نقلة يدوية تأخير وخطأ محتمل واعتماد على شخص.", "Because each manual handoff is delay, possible error and dependence on one person."),
      how: L("خمس طبقات: مصادر، تجميع، قواعد، ذكاء، عرض وإجراء.", "Five layers: sources, gathering, rules, intelligence, display & action."),
      inside: L("أربعة مبادئ: مصدر واحد، أحداث، تتبع، إنسان في القرار.", "Four principles: one source, events, traceability, humans at decisions."),
      relation: L("المستوى الثالث بعد الأداة؛ وقبل الفريق الرقمي.", "The third level after the tool; before the digital team."),
      example: L("تقرير كفاءة أسبوعي بأربع نقلات يدوية تُغلق كلها إلا القرار.", "A weekly efficiency report with four handoffs, all closed except the decision."),
      apply: L("عدّ النقلات اليدوية في عملية واحدة عندك ورتّبها.", "Count and rank the manual handoffs in one of your processes."),
      mistakes: L("نظام ينتهي عند اللوحة، وتعريفات متعددة للرقم، والذكاء في موضع الحساب.", "A system ending at the dashboard, multiple definitions, AI where arithmetic belongs."),
      check: L("ما الفرق بين الأداة والنظام في جملة؟", "What’s the tool–system difference in one sentence?"),
      next: L("كيف تبنيه دون أن ينهار: الشريحة العمودية.", "How to build it without collapse: the vertical slice."),
    },
    keys: L(["النظام يلغي الوسيط البشري الذي ينقل بين الأدوات {p37}.", "عدّ النقلات اليدوية: هي قائمة ما ستبنيه.", "خمس طبقات: مصادر، تجميع وتوحيد، منطق وقواعد، ذكاء، عرض وإجراء.", "مصدر حقيقة واحد، وأحداث لا مواعيد، وتتبع كامل، وإنسان في القرار.", "النظام الذي ينتهي عند العرض نصف نظام."],
      ["A system removes the human runner between tools {p37}.", "Count manual handoffs: they are your build list.", "Five layers: sources, gathering, rules, intelligence, display & action.", "One source of truth, events not schedules, full traceability, humans at decisions.", "A system that ends at display is half a system."]),
    scene: "system-layers", lab: "system", prompts: ["u5-p-diagnose"],
    quick: [
      { type: "order", q: L("رتّب رحلة حدث واحد داخل النظام:", "Order one event’s journey through the system:"), items: L(["حدث: بيانات جديدة", "تجميع وتوحيد", "فحص جودة", "تطبيق القواعد", "كشف الانحراف", "تفسير بالذكاء", "إشعار المسؤول", "قرار موثّق"], ["Event: new data", "Gather & unify", "Quality check", "Apply rules", "Detect deviation", "Explain with AI", "Notify the owner", "Documented decision"]), why: L("الرحلة كما في الكتاب {p37}.", "The journey as in the book {p37}.") },
      { q: L("أي مما يلي من مهام «طبقة الذكاء»؟", "Which belongs to the “intelligence layer”?"), opts: L(["حساب إجمالي المبيعات", "تفسير سبب انحراف وصياغة توصية", "قراءة ملف إكسل", "توحيد صيغ التواريخ"], ["Summing total sales", "Explaining a deviation and drafting a recommendation", "Reading an Excel file", "Unifying date formats"]), a: 1, why: L("الذكاء لما يحتاج حكمًا لا حسابًا {p37}.", "Intelligence is for judgement, not arithmetic {p37}.") },
      { q: L("لماذا «عند وصول ملف جديد» أفضل من «كل يوم التاسعة صباحًا»؟", "Why is “when a new file arrives” better than “every day at 9 am”?"), opts: L(["لأنه أرخص", "لأن العمل يبدأ حين تتوفر البيانات فعلًا لا حين تدق الساعة", "لأنه أسرع في البرمجة", "لا فرق"], ["It’s cheaper", "Work starts when data is actually available, not when the clock strikes", "It’s faster to code", "No difference"]), a: 1, why: L("مبدأ البناء على الأحداث {p37}.", "The build-on-events principle {p37}.") },
    ],
    related: ["u5-build-system", "u2-principles", "u0-journey"], req: ["u2-principles"], terms: ["system", "single-source-of-truth", "event-driven", "traceability", "human-review", "automation"],
  });

  ACAD.L({
    id: "u5-build-system", unit: "u5", pages: [38], icon: "🧱", diff: 3, mins: 13, tags: ["system", "automation"],
    title: L("بناء النظام دون أن ينهار: الشريحة العمودية", "Building the system without collapse: the vertical slice"),
    hook: L("أكثر مشاريع «المنظومة المتكاملة» تفشل لسبب واحد: تبدأ كبيرة.", "Most “integrated system” projects fail for one reason: they start big."),
    book: L(`**النظام عمليًا — كيف تبنيه دون أن ينهار؟** {p38}. أكثر مشاريع «المنظومة المتكاملة» تفشل لسبب واحد: **تبدأ كبيرة**. الطريق الناجح يبدأ من سلسلة واحدة ضيقة تعمل من طرفها إلى طرفها.

**الاستراتيجية: شريحة عمودية واحدة — ابنِ عمقًا لا عرضًا.** لا تبنِ طبقة التجميع لكل بيانات المؤسسة ثم تنتقل للتالية — ستقضي شهورًا بلا مخرج يراه أحد. اختر عملية واحدة صغيرة وابنِ لها **الطبقات الخمس كاملة حتى الإشعار والقرار**؛ فيصبح لديك نظام حقيقي يعمل ونموذج مثبت تتوسع منه أفقيًا بثقة.

**المراحل السبع:** ١ ارسم الحالة الراهنة (كما تُنفَّذ فعلًا، بكل نقلة وانتظار) · ٢ عدّ النقلات اليدوية ورتّبها (حسب التكرار والوقت الضائع وكلفة الخطأ) · ٣ وحّد التعريفات أولًا (ما «الوحدة المنتجة»؟ وما «التوقف»؟ — الاتفاق هنا يوفّر شهورًا) · ٤ ابنِ التجميع والفحص (لا تتقدم قبل أن تثق في نظافة المدخلات) · ٥ اكتب القواعد في مكان واحد (ملف قواعد يقرأه الجميع) · ٦ أضف طبقة الذكاء أخيرًا (للتفسير والتصنيف والتوصية فقط، لا للحساب) · ٧ أغلق الحلقة بإجراء ثم قِس: كم نقلة اختفت؟ وكم وقتًا وُفّر؟ — هذا الرقم ما ستعرضه على الإدارة للتوسع.

**أخطاء تُسقط المشروع:** البدء بأصعب عملية (الأكثر استثناءات، فتفشل التجربة الأولى وتُغلق الميزانية) · الذكاء في موضع الحساب (نتائج غير ثابتة بين تشغيل وآخر) · نظام بلا مالك (يتوقف عند أول تغيير في مصدر بيانات).

**ثلاثة برومبتات:** تشخيص العملية ورسم الفجوات · توحيد التعريفات قبل البناء · بناء الشريحة العمودية الأولى (بالأسفل).`,
      `**The system in practice — how to build it without collapse** {p38}. Most “integrated system” projects fail for one reason: **they start big**. The successful path starts from one narrow chain that works end to end.

**The strategy: one vertical slice — build deep, not wide.** Don’t build the gathering layer for all company data and then move on — you’ll spend months with no output anyone sees. Pick one small process and build **all five layers, through notification and decision**; you then have a real working system and a proven model to expand from with confidence.

**The seven stages:** 1 map the current state (as actually done, with every handoff and wait) · 2 count and rank manual handoffs (by frequency, wasted time and cost of error) · 3 unify definitions first (what’s a “produced unit”? what’s a “stoppage”? — agreeing here saves months) · 4 build gathering and checking (don’t advance until you trust clean inputs) · 5 write rules in one place (a rules file everyone reads) · 6 add the intelligence layer last (explaining, classifying, recommending only — not computing) · 7 close the loop with an action, then measure: how many handoffs vanished? how much time saved? — that number is what you show management to expand.

**Mistakes that sink the project:** starting with the hardest process (most exceptions; the first trial fails and the budget closes) · AI where arithmetic belongs (results vary between runs) · a system without an owner (it stops at the first change in a data source).

**Three prompts:** diagnose the process and map the gaps · unify definitions before building · build the first vertical slice (below).`),
    levels: {
      simple: L(`تريد أن تُدخل الكهرباء لقرية كاملة. أمامك طريقان:
- **عرضًا:** تمد الأسلاك في كل الشوارع أولًا، ثم المحولات، ثم العدادات… بعد سنة **لا بيت واحد فيه نور**، والناس فقدت الثقة.
- **عمقًا (شريحة عمودية):** تختار **بيتًا واحدًا** وتوصّل له كل شيء: سلك، ومحوّل، وعداد، ولمبة **تضيء**. في أسبوع يرى الجميع النور، وتعرف بالضبط ما يلزم لباقي البيوت.

هذا كل السر: **بيت واحد مضاء أثمن من خطة لقرية كاملة لم تُنفذ.**`,
        `You want to bring electricity to a whole village. Two ways:
- **Wide:** lay cables in every street first, then transformers, then meters… after a year **not one house has light**, and people lose faith.
- **Deep (vertical slice):** pick **one house** and connect everything: cable, transformer, meter, and a bulb that **lights up**. In a week everyone sees the light, and you know exactly what the other houses need.

That’s the whole secret: **one lit house is worth more than a plan for a whole village never executed.**`),
      mech: L(`## لماذا يفشل البناء «عرضًا»؟
ثلاثة أسباب تتراكم: (١) لا مخرج مرئي لشهور فتضعف الرعاية والميزانية، (٢) الأخطاء في الطبقات العليا لا تُكتشف إلا متأخرًا، (٣) تصميم الطبقة الأولى «لكل الحالات» يضخّمها دون معرفة ما تحتاجه الطبقات التالية فعلًا.

## لماذا «وحّد التعريفات» المرحلة الثالثة لا السادسة؟
لأن كل ما بعدها يحسب **بالتعريف**. لو بنيت التجميع والقواعد ثم اكتشفت أن الإنتاج يعدّ «التوقف» من ١٠ دقائق والمالية من ٥، تعيد كل شيء. شاهد ترتيب المراحل في [[scene:vertical-slice|مشهد الشريحة]].

## لماذا الذكاء أخيرًا؟
لأنه يحتاج مدخلات **نظيفة ومحسوبة** ليفسّرها. ذكاء فوق بيانات متسخة يقدّم تفسيرات مقنعة لأرقام خاطئة — أخطر من عدم وجوده.`,
        `## Why does building “wide” fail?
Three compounding reasons: (1) no visible output for months, so sponsorship and budget fade, (2) errors in upper layers surface late, (3) designing the first layer “for every case” bloats it without knowing what later layers truly need.

## Why is “unify definitions” stage three, not six?
Because everything after it computes **by definition**. If you build gathering and rules, then find production counts a “stoppage” from 10 minutes and finance from 5, you redo everything. Watch the stage order in [[scene:vertical-slice|the slice scene]].

## Why intelligence last?
Because it needs **clean, computed** inputs to explain. AI over dirty data gives convincing explanations of wrong numbers — worse than having none.`),
      practice: L(`## اختيار أول شريحة: ثلاثة معايير
| المعيار | اختر | تجنّب |
|---|---|---|
| الاستثناءات | عملية قليلة الاستثناءات | «أصعب عملية لنثبت قوتنا» {p38} |
| التكرار | أسبوعية أو يومية | سنوية |
| القياس | وقت ونقلات تُعدّ بوضوح | أثر لا يُقاس |

## قاموس التعريفات — سطر نموذجي
| المؤشر | التعريف | المصدر | المعادلة | الوحدة | الاستثناءات | المالك |
|---|---|---|---|---|---|---|
| التوقف | توقف خط ≥ ١٠ دقائق | سجل الصيانة | مجموع الدقائق | دقيقة | الصيانة المخططة | مدير الإنتاج |

البرومبت الثاني يبني هذا القاموس ويشير إلى **المؤشرات المتشابهة التي تُحسب بطريقتين** — «أخطر نقطة في أي منظومة» {p38}.`,
        `## Choosing your first slice: three criteria
| Criterion | Choose | Avoid |
|---|---|---|
| Exceptions | a low-exception process | “the hardest process to prove ourselves” {p38} |
| Frequency | weekly or daily | yearly |
| Measurement | clearly countable time and handoffs | impact you can’t measure |

## A definitions dictionary — a sample row
| Indicator | Definition | Source | Formula | Unit | Exceptions | Owner |
|---|---|---|---|---|---|---|
| Stoppage | a line stop ≥ 10 min | maintenance log | sum of minutes | minute | planned maintenance | production manager |

The second prompt builds this dictionary and flags **similar-looking indicators computed two ways** — “the most dangerous point in any system” {p38}.`),
      adv: L(`## المرحلة السابعة هي حجتك للتوسع
«كم نقلة يدوية اختفت؟ وكم وقتًا وُفّر فعلًا؟ هذا الرقم هو ما ستعرضه على الإدارة لتوسيع المشروع» {p38}. لذلك **قِس الحالة الراهنة قبل البناء** (المرحلة ١–٢)، وإلا لن تملك رقم «قبل» تقارن به.

## النظام بلا مالك
أنظمة البيانات تتغير مصادرها باستمرار: عمود يُعاد تسميته، أو نظام يُحدَّث. «منظومة لا يملكها شخص محدد تتوقف عند أول تغيير» {p38}. المالك ليس مبرمجًا بالضرورة؛ هو من يُبلَّغ حين يفشل الفحص ويقرر ماذا يحدث.

## البرومبت الثالث كمواصفة هندسية
لاحظ عناصره: خمس وحدات منفصلة، وملف قواعد واحد، ولا تعديل للأصل، وسجل تشغيل، وتوقف صريح، وتتبع كل رقم لصفه {p38}. إنها نفس [[l:u2-principles|القواعد الهندسية]] للدليل الثاني، مطبقة على مستوى النظام.`,
        `## Stage seven is your case for expansion
“How many manual handoffs vanished? How much time was actually saved? That number is what you present to management to expand the project” {p38}. So **measure the current state before building** (stages 1–2), or you’ll have no “before” figure to compare.

## A system without an owner
Data systems’ sources change constantly: a column renamed, a system upgraded. “A system no specific person owns stops at the first change” {p38}. The owner needn’t be a programmer; they’re the one notified when a check fails and who decides what happens.

## The third prompt as an engineering spec
Note its elements: five separate units, one rules file, no modifying originals, a run log, explicit stops, and every number traceable to its row {p38}. It’s the same [[l:u2-principles|engineering rules]] from Guide 2, applied at system scale.`),
    },
    card: {
      what: L("شريحة عمودية: عملية واحدة صغيرة بكل طبقاتها الخمس حتى القرار {p38}.", "A vertical slice: one small process through all five layers to the decision {p38}."),
      why: L("لأن البدء الكبير يعني شهورًا بلا مخرج ثم إغلاق الميزانية.", "Because starting big means months without output, then a closed budget."),
      how: L("سبع مراحل: ارسم، عدّ، وحّد، ابنِ التجميع، اكتب القواعد، أضف الذكاء، أغلق وقِس.", "Seven stages: map, count, unify, build gathering, write rules, add AI, close and measure."),
      inside: L("التعريفات قبل الكود، والذكاء أخيرًا، والقياس حجة التوسع.", "Definitions before code, AI last, measurement as the case to expand."),
      relation: L("التطبيق العملي لطبقات النظام ومبادئه.", "The practical side of the system’s layers and principles."),
      example: L("تقرير الكفاءة الأسبوعي كأول شريحة قبل كل تقارير المصنع.", "The weekly efficiency report as the first slice before all factory reports."),
      apply: L("اختر عملية قليلة الاستثناءات ونفّذ عليها برومبت التشخيص.", "Pick a low-exception process and run the diagnosis prompt on it."),
      mistakes: L("البدء بالأصعب، والذكاء يحسب، ونظام بلا مالك.", "Starting with the hardest, AI computing, an ownerless system."),
      check: L("لماذا تأتي طبقة الذكاء في المرحلة السادسة؟", "Why does the intelligence layer come at stage six?"),
      next: L("الفريق الرقمي: ما الوكيل أصلًا؟", "The digital team: what is an agent?"),
    },
    keys: L(["ابنِ عمقًا لا عرضًا: شريحة عمودية واحدة تعمل من طرفها لطرفها {p38}.", "وحّد التعريفات قبل أي كود؛ الاتفاق هنا يوفّر شهورًا.", "الذكاء أخيرًا وللتفسير فقط، لا للحساب.", "أغلق الحلقة بإجراء ثم قِس النقلات والوقت الموفّر.", "ثلاثة أخطاء قاتلة: البدء بالأصعب، والذكاء يحسب، ونظام بلا مالك."],
      ["Build deep, not wide: one vertical slice working end to end {p38}.", "Unify definitions before any code; agreement here saves months.", "AI last, and for explaining only, not computing.", "Close the loop with an action, then measure handoffs and time saved.", "Three fatal mistakes: hardest first, AI computing, no owner."]),
    scene: "vertical-slice", lab: "system", prompts: ["u5-p-diagnose", "u5-p-define", "u5-p-slice"],
    quick: [
      { type: "order", q: L("رتّب المراحل السبع لبناء النظام:", "Order the seven stages of building the system:"), items: L(["ارسم الحالة الراهنة", "عدّ النقلات اليدوية", "وحّد التعريفات", "ابنِ التجميع والفحص", "اكتب القواعد في مكان واحد", "أضف طبقة الذكاء", "أغلق الحلقة بإجراء وقِس"], ["Map the current state", "Count manual handoffs", "Unify definitions", "Build gathering & checks", "Write rules in one place", "Add the intelligence layer", "Close the loop and measure"]), why: L("الترتيب في الكتاب {p38}.", "The order in the book {p38}.") },
      { q: L("بأي عملية تبدأ أول شريحة؟", "Which process should the first slice use?"), opts: L(["الأصعب لنثبت القوة", "الأكثر استثناءات", "عملية صغيرة قليلة الاستثناءات تُقاس بوضوح", "كل العمليات معًا"], ["The hardest, to prove strength", "The one with most exceptions", "A small, low-exception, clearly measurable process", "All processes at once"]), a: 2, why: L("البدء بالأصعب يُفشل التجربة الأولى ويغلق الميزانية {p38}.", "Starting with the hardest fails the first trial and closes the budget {p38}.") },
      { q: L("لماذا لا نترك النموذج يحسب الأرقام المالية؟", "Why not let the model compute financial figures?"), opts: L(["لأنه بطيء", "لأنه يُنتج نتائج غير ثابتة بين تشغيل وآخر؛ الحساب للقواعد", "لأنه مكلف فقط", "لا مانع"], ["It’s slow", "It gives results that vary between runs; arithmetic belongs to rules", "Only because it’s costly", "No problem"]), a: 1, why: L("«الذكاء في موضع الحساب» من الأخطاء القاتلة {p38}.", "“AI where arithmetic belongs” is a fatal mistake {p38}.") },
    ],
    related: ["u5-system", "u5-agents", "u2-project"], req: ["u5-system"], terms: ["vertical-slice", "single-source-of-truth", "traceability", "run-log", "explicit-failure"],
  });

  ACAD.L({
    id: "u5-agents", unit: "u5", pages: [39], icon: "🤖", diff: 3, mins: 13, tags: ["agents"],
    title: L("الوكيل والفريق الرقمي: لماذا فريق لا وكيل واحد؟", "Agents and the digital team: why a team, not one agent?"),
    hook: L("هدف، وأدوات، وتكرار — ثلاث كلمات تفرّق الوكيل عن المساعد. وسبعة أدوار… تبدأ منها بثلاثة فقط.", "Goal, tools, iteration — three words separate an agent from an assistant. And seven roles… of which you start with three."),
    book: L(`**خامسًا — الفريق الرقمي الذكي** {p39}. «أنسّق بين عدة حلول ووكلاء لتحقيق نتائج أكبر»: بدل مساعد واحد عام يفعل كل شيء بمستوى متوسط، فريق من الوكلاء لكل منهم دور محدد ومسؤولية واضحة.

**ما الوكيل (Agent) أصلًا؟ الفرق في ثلاث كلمات: هدف، وأدوات، وتكرار.** المساعد العادي يجيب ثم يتوقف. أما الوكيل فيُعطى **هدفًا**، ويملك **أدوات** (قراءة ملف، أو استعلام قاعدة بيانات، أو إرسال رسالة)، و**يكرر** المحاولة: ينفذ، ويرى النتيجة، ويصحح، حتى يتحقق الهدف أو يتوقف عند حدّ محدد سلفًا.

**لماذا فريق؟** التخصص يرفع الجودة (تعليمات مركزة على مهمة واحدة أدق بكثير) · فصل الصلاحيات (وكيل القراءة لا يملك الكتابة، ووكيل الإرسال لا يملك التعديل — الخطأ يبقى محصورًا) · المراجعة المتبادلة (وكيل يراجع آخر يكشف ما لا يراه المنفذ في عمل نفسه).

**الأدوار السبعة:** المنسّق (يفهم الطلب ويقسمه ويوزعه ويجمع النتائج — لا يلمس البيانات) · جامع البيانات (قراءة فقط) · فاحص الجودة (قراءة، وصلاحية إيقاف السلسلة) · المحلل (حساب، بلا إرسال ولا نشر) · المراجع الناقد (قراءة النتائج فقط) · المحرر (كتابة المخرجات فقط) · المنفّذ (يرسل ويفتح مهمة ويحدّث سجلًا — **لا يتحرك إلا بموافقة بشرية**).

**لا تبدأ بسبعة:** ابدأ بثلاثة فقط — جامع، ومحلل، ومراجع. هذه النواة تعطي معظم الفائدة بأقل تعقيد. أضف دورًا فقط حين تكتشف بالتجربة أن الفريق يفشل في شيء بعينه.

**ثلاثة أنماط تنسيق:** **السلسلة** (وكيل بعد وكيل — الأبسط تتبعًا، للعمليات ذات الترتيب الثابت) · **التوزيع والتجميع** (عدة وكلاء معًا على أجزاء مختلفة ثم يدمج المنسق — لتحليل عدة مصادر) · **المنفذ والناقد** (وكيل ينتج ووكيل يراجع ويعيده للتصحيح في دورتين أو ثلاث — حين تكون الجودة أهم من السرعة).`,
      `**Fifth — the smart digital team** {p39}. “I coordinate several solutions and agents for bigger results”: instead of one general assistant doing everything at an average level, a team of agents, each with a defined role and clear responsibility.

**What is an agent? The difference in three words: goal, tools, iteration.** An ordinary assistant answers and stops. An agent is given **a goal**, has **tools** (read a file, query a database, send a message), and **iterates**: acts, sees the result, corrects — until the goal is met or it stops at a limit set in advance.

**Why a team?** Specialisation raises quality (instructions focused on one task are far more precise) · separation of permissions (the reading agent can’t write; the sending agent can’t edit — errors stay contained) · mutual review (an agent reviewing another catches what the doer misses in its own work).

**The seven roles:** coordinator (understands, splits, assigns, gathers — never touches data) · data gatherer (read only) · quality checker (read, plus authority to stop the chain) · analyst (compute; no sending or publishing) · critical reviewer (reads results only) · editor (writes outputs only) · executor (sends, opens tasks, updates records — **acts only with human approval**).

**Don’t start with seven:** start with three — gatherer, analyst, reviewer. This core delivers most of the value with least complexity. Add a role only when experience shows the team fails at something specific.

**Three coordination patterns:** **chain** (agent after agent — easiest to trace, for fixed-order processes) · **fan-out & gather** (several agents on different parts at once, then the coordinator merges — for analysing several sources) · **doer & critic** (one produces, one reviews and returns it for correction in two or three rounds — when quality matters more than speed).`),
    levels: {
      simple: L(`المساعد العادي مثل **موظف استعلامات**: تسأله فيجيب، ثم ينتهي دوره.

الوكيل مثل **موظف تكلّفه بمهمة**: «جهّز لي تقرير المبيعات». معه مفاتيح الأرشيف (أدوات)، يجرب، ويراجع ما فعله، ويعيد حتى ينجز — أو يرجع لك إن احتاج إذنًا.

والفريق الرقمي مثل **مكتب صغير**: واحد يجمع الأوراق (ولا يملك قلمًا للتعديل!)، وواحد يحلل، وواحد **يراجع وينتقد**. لا تعيّن سبعة موظفين من أول يوم؛ ابدأ بثلاثة، وأضف موظفًا حين ترى فعلًا أن شيئًا ينقص.`,
        `An ordinary assistant is like **an information-desk clerk**: you ask, they answer, done.

An agent is like **an employee you give a task**: “prepare the sales report”. They hold the archive keys (tools), try, check what they did, and redo until done — or come back to you when they need permission.

The digital team is like **a small office**: one gathers the papers (and has no pen to edit!), one analyses, one **reviews and critiques**. Don’t hire seven people on day one; start with three and add one when you really see something missing.`),
      mech: L(`## حلقة الوكيل
هدف ← خطة ← **استخدام أداة** ← ملاحظة النتيجة ← هل تحقق الهدف؟ لا ← تصحيح وإعادة … حتى النجاح **أو حدّ التوقف** (عدد محاولات، أو مبلغ، أو بيانات ناقصة). شاهدها في [[scene:agent-loop|مشهد حلقة الوكيل]] وجرّبها في [[lab:agent|مختبر الوكيل]].

## لماذا يرفع التخصص الجودة؟
التعليمات الطويلة التي تغطي عشر مهام متباينة تتنافس على انتباه النموذج؛ التعليمات المركزة على مهمة واحدة «أدق بكثير» {p39} — نفس فكرة [[l:u1-five|العناصر الخمسة]]: الوضوح يرفع النتيجة.

## فصل الصلاحيات كحاجز حريق
إن أخطأ جامع البيانات، فأقصى ضرره **قراءة خاطئة**، لا حذف ولا إرسال. «الخطأ يبقى محصورًا في نطاقه» {p39}. والمنفّذ — الوحيد الذي يغيّر العالم الخارجي — مقيّد بالموافقة البشرية.`,
        `## The agent loop
Goal → plan → **use a tool** → observe the result → goal met? no → correct and retry … until success **or a stop limit** (number of attempts, an amount, missing data). Watch it in [[scene:agent-loop|the agent-loop scene]] and try it in [[lab:agent|the agent lab]].

## Why does specialisation raise quality?
Long instructions covering ten different tasks compete for the model’s attention; instructions focused on one task are “far more precise” {p39} — the [[l:u1-five|five elements]] idea: clarity raises the result.

## Permission separation as a firewall
If the gatherer errs, the worst damage is **a wrong read**, not a deletion or a send. “The error stays contained in its scope” {p39}. And the executor — the only one that changes the outside world — is gated by human approval.`),
      practice: L(`## اختر نمط التنسيق
| الموقف | النمط | لماذا |
|---|---|---|
| تقرير شهري بخطوات ثابتة | السلسلة | الأبسط تتبعًا {p39} |
| تحليل مبيعات ٥ فروع معًا | التوزيع والتجميع | أجزاء مستقلة تُدمج |
| مذكرة للإدارة العليا | المنفذ والناقد | الجودة أهم من السرعة |

## النواة الثلاثية لتقرير المبيعات الأسبوعي
- **الجامع:** يقرأ ملفات الفروع ويستخرج الأعمدة اللازمة فقط (قراءة فقط).
- **المحلل:** يطبق القواعد ويستخرج الانحرافات (حساب، بلا إرسال).
- **المراجع:** يسأل: هل كل رقم مدعوم بمصدر؟ ما الافتراضات غير المعلنة؟ (قراءة فقط).

والإرسال؟ يبقى **بيدك** حتى تثق بالفريق — ثم تضيف «المنفّذ» بموافقة صريحة.`,
        `## Pick a coordination pattern
| Situation | Pattern | Why |
|---|---|---|
| A monthly report with fixed steps | chain | easiest to trace {p39} |
| Analysing 5 branches’ sales at once | fan-out & gather | independent parts merged |
| A memo for senior management | doer & critic | quality over speed |

## The three-agent core for a weekly sales report
- **Gatherer:** reads branch files and extracts only the needed columns (read only).
- **Analyst:** applies the rules and extracts deviations (compute, no sending).
- **Reviewer:** asks: is every number backed by a source? what assumptions are unstated? (read only).

And sending? It stays **in your hands** until you trust the team — then you add the “executor” with explicit approval.`),
      adv: L(`## الوكيل يحتاج «حدّ توقف» أكثر مما يحتاج ذكاءً
وكيل بلا حدّ قد يكرر المحاولة بلا نهاية ويستهلك الميزانية بصمت. لذلك التعريف نفسه يتضمن «أو يتوقف عند حدّ محدد سلفًا» {p39}، وضوابط الحوكمة في الصفحة التالية تضع **سقفًا للتكلفة والمحاولات** {p40}.

## لماذا المراجع الناقد مهم؟
المنفذ لا يرى أخطاء عمله — مثل الكاتب الذي يقرأ ما يقصده لا ما كتبه. وكيل مستقل بتعليمات «ابحث عن الثغرات» يكسر هذا العمى، وهو تطبيق لفكرة [[l:u1-scenarios|«لا توافقني تلقائيًا»]] على مستوى الفريق.

## من المساعد إلى الفريق: الخيط الجامع
[[l:u0-assistant|المساعد]] يفهمك ويتذكر، و**الوكيل** ينفذ بأدوات ويكرر، و**الفريق** يوزع الأدوار ويراجع بعضه. كل مستوى يضيف قوة **ومخاطرة**، ولذلك تزيد الضوابط مع كل مستوى.`,
        `## An agent needs a “stop limit” more than intelligence
An agent without a limit may retry endlessly and silently burn the budget. So the very definition includes “or stops at a limit set in advance” {p39}, and the governance rules on the next page set **a cap on cost and attempts** {p40}.

## Why does the critical reviewer matter?
The doer doesn’t see its own mistakes — like a writer who reads what they meant, not what they wrote. An independent agent told to “find the gaps” breaks that blindness; it’s [[l:u1-scenarios|“don’t agree with me automatically”]] at team level.

## From assistant to team: the common thread
[[l:u0-assistant|The assistant]] understands and remembers; **the agent** acts with tools and iterates; **the team** splits roles and reviews itself. Each level adds power **and risk**, so controls grow with each level.`),
    },
    card: {
      what: L("الوكيل: هدف وأدوات وتكرار؛ والفريق: وكلاء بأدوار وصلاحيات محددة {p39}.", "An agent: goal, tools, iteration; a team: agents with defined roles and permissions {p39}."),
      why: L("التخصص يرفع الجودة، وفصل الصلاحيات يحصر الخطأ، والمراجعة تكشفه.", "Specialisation raises quality, separation contains errors, review catches them."),
      how: L("ابدأ بجامع ومحلل ومراجع، واختر نمط تنسيق مناسب.", "Start with gatherer, analyst, reviewer; pick a fitting pattern."),
      inside: L("حلقة: نفّذ ← لاحظ ← صحّح، حتى الهدف أو حدّ التوقف.", "A loop: act → observe → correct, until the goal or the stop limit."),
      relation: L("المستوى الرابع: من الأداة إلى النظام إلى الفريق.", "The fourth level: from tool to system to team."),
      example: L("تقرير أسبوعي بثلاثة وكلاء، والإرسال بيد الإنسان.", "A weekly report with three agents; sending stays with a human."),
      apply: L("ارسم الأدوار الثلاثة لعملية متكررة عندك وصلاحيات كل دور.", "Sketch the three roles for one recurring process and each one’s permissions."),
      mistakes: L("البدء بسبعة، ووكيل بلا حدّ توقف، ومنفّذ بلا موافقة بشرية.", "Starting with seven, no stop limit, an executor without human approval."),
      check: L("ما الكلمات الثلاث التي تفرّق الوكيل عن المساعد؟", "Which three words separate an agent from an assistant?"),
      next: L("تصميم الفريق: بطاقة الوكيل والحوكمة.", "Designing the team: the agent card and governance."),
    },
    keys: L(["الوكيل = هدف + أدوات + تكرار حتى الهدف أو حدّ التوقف {p39}.", "الفريق: تخصص يرفع الجودة، وفصل صلاحيات، ومراجعة متبادلة.", "سبعة أدوار، والمنفّذ لا يتحرك إلا بموافقة بشرية.", "ابدأ بثلاثة: جامع، ومحلل، ومراجع.", "ثلاثة أنماط: السلسلة، والتوزيع والتجميع، والمنفذ والناقد."],
      ["Agent = goal + tools + iteration until the goal or a stop limit {p39}.", "A team: specialisation, separated permissions, mutual review.", "Seven roles; the executor acts only with human approval.", "Start with three: gatherer, analyst, reviewer.", "Three patterns: chain, fan-out & gather, doer & critic."]),
    scene: "agent-loop", lab: ["agent", "team"], prompts: ["u5-p-team-design", "u5-p-agent"],
    quick: [
      { q: L("ما الذي يميز الوكيل عن المساعد العادي؟", "What distinguishes an agent from an ordinary assistant?"), opts: L(["أنه أذكى دائمًا", "هدف، وأدوات يستخدمها، وتكرار المحاولة حتى الهدف أو حدّ التوقف", "أنه يعمل بلا إنترنت", "أنه أرخص"], ["It’s always smarter", "A goal, tools it uses, and iteration until the goal or a stop limit", "It works offline", "It’s cheaper"]), a: 1, why: L("«هدف، وأدوات، وتكرار» {p39}.", "“Goal, tools, iteration” {p39}.") },
      { q: L("بكم دورًا تبدأ فريقك الرقمي؟", "How many roles do you start your digital team with?"), opts: L(["سبعة كاملة", "ثلاثة: جامع ومحلل ومراجع", "واحد فقط", "عشرة"], ["All seven", "Three: gatherer, analyst, reviewer", "Only one", "Ten"]), a: 1, why: L("«لا تبدأ بسبعة… ابدأ بثلاثة فقط» {p39}.", "“Don’t start with seven… start with three” {p39}.") },
      { q: L("أي نمط يناسب مذكرة حساسة للإدارة العليا؟", "Which pattern suits a sensitive memo for senior management?"), opts: L(["السلسلة", "التوزيع والتجميع", "المنفذ والناقد", "بلا نمط"], ["Chain", "Fan-out & gather", "Doer & critic", "No pattern"]), a: 2, why: L("المنفذ والناقد حين تكون الجودة أهم من السرعة {p39}.", "Doer & critic when quality matters more than speed {p39}.") },
    ],
    related: ["u0-assistant", "u5-team", "u5-system"], req: ["u0-assistant"], terms: ["agent", "orchestrator", "least-privilege", "human-review"],
  });

  ACAD.L({
    id: "u5-team", unit: "u5", pages: [40], icon: "👥", diff: 3, mins: 13, tags: ["agents", "safety"],
    title: L("تصميم الفريق الرقمي: بطاقة الوكيل والحوكمة", "Designing the digital team: the agent card and governance"),
    hook: L("كل وكيل بخمسة عناصر في ملف نصي واحد، وأربعة ضوابط قبل أي تشغيل حقيقي.", "Each agent defined by five elements in one text file, and four controls before any real run."),
    book: L(`**الفريق الرقمي عمليًا — التصميم والبرومبتات** {p40}. كل وكيل يُعرَّف بخمسة عناصر ثابتة، تكتبها في ملف نصي واحد لكل وكيل، فيصبح الفريق قابلًا للمراجعة والتطوير كأي وثيقة عمل.

**بطاقة تعريف الوكيل — خمسة عناصر:** ١ **الهدف** (جملة واحدة تصف ما ينجزه، ولا شيء غيره) · ٢ **المدخل والمخرج** (ما يستقبله بالضبط وما يسلّمه وبأي صيغة) · ٣ **الأدوات** (ما يُسمح له باستخدامه — وما يُمنع صراحة) · ٤ **حدود التوقف** (متى يتوقف ويسأل الإنسان: تجاوز مبلغ، أو بيانات ناقصة، أو بعد عدد محاولات) · ٥ **معيار النجاح** (شرط قابل للفحص لا وصف عام للجودة).

**ضوابط الحوكمة — قبل أي تشغيل حقيقي:** **أقل صلاحية ممكنة** (لا صلاحية أوسع مما تتطلبه المهمة بالضبط؛ الإرسال والحذف مشروطان دائمًا بموافقة بشرية) · **سجل كامل لكل خطوة** (من فعل ماذا ومتى وبأي مدخل وأي نتيجة — بدونه يستحيل التشخيص) · **سقف للتكلفة والمحاولات** (وإلا دخل الفريق حلقة لا تنتهي تستهلك الميزانية بصمت) · **نموذج مناسب لكل دور** (الجامع والمحرر يكفيهما نموذج متوسط؛ وفّر القوي للمحلل والمراجع).

**أربعة برومبتات:** تصميم الفريق من عملية قائمة · كتابة تعليمات وكيل واحد · إضافة المراجع الناقد (بحد أقصى دورتين ثم يرفع ما بقي للإنسان) · قياس أداء الفريق.

**الخلاصة:** الخيط الجامع للوحدة: التدرج من الأداة إلى النظام إلى الفريق. GitHub يحفظ تاريخ ما تبنيه، وفهم النماذج يجعلك تختار بوعي، والتشغيل المحلي يفتح باب البيانات الحساسة، والنظام يربط الخطوات، والفريق الرقمي يديرها نيابة عنك. **والقاعدة التي تحكم الجميع: ابدأ ضيقًا وعميقًا** — شريحة واحدة تعمل أثمن من خطة شاملة لم تُنفذ، وثلاثة أدوار تعمل بثقة أفضل من سبعة لا يعرف أحد أيها أخطأ.

**الخطوة التالية:** اختر عملية واحدة في إدارتك، ونفّذ عليها برومبت تشخيص العملية، ثم ابنِ لها الشريحة العمودية الأولى بثلاثة وكلاء فقط — وقِس كم نقلة يدوية اختفت.`,
      `**The digital team in practice — design and prompts** {p40}. Each agent is defined by five fixed elements, written in one text file per agent, so the team can be reviewed and improved like any work document.

**The agent card — five elements:** 1 **goal** (one sentence describing what it achieves, and nothing else) · 2 **input & output** (exactly what it receives and what it delivers, in which format) · 3 **tools** (what it may use — and what is explicitly forbidden) · 4 **stop limits** (when it stops and asks the human: over an amount, missing data, or after N attempts) · 5 **success criterion** (a checkable condition, not a general description of quality).

**Governance controls — before any real run:** **least privilege** (no permission wider than the task needs; sending and deleting always require human approval) · **a full log of every step** (who did what, when, with which input and result — without it diagnosis is impossible) · **a cap on cost and attempts** (otherwise the team enters an endless loop that silently burns the budget) · **a suitable model per role** (gatherer and editor do fine on a mid model; save the strong one for analyst and reviewer).

**Four prompts:** design the team from an existing process · write one agent’s instructions · add the critical reviewer (max two rounds, then escalate what’s left to a human) · measure team performance.

**Conclusion:** the unit’s common thread: progressing from tool to system to team. GitHub keeps the history of what you build, understanding models lets you choose wisely, local running opens the door to sensitive data, the system links the steps, and the digital team runs them for you. **The rule governing all: start narrow and deep** — one working slice is worth more than an unexecuted grand plan, and three roles working with confidence beat seven where nobody knows which one erred.

**Next step:** pick one process in your department, run the process-diagnosis prompt on it, then build its first vertical slice with just three agents — and measure how many manual handoffs disappeared.`),
    levels: {
      simple: L(`بطاقة الوكيل مثل **الوصف الوظيفي لموظف جديد**:
- **الهدف:** «تجهيز كشف المبيعات الأسبوعي» — لا أكثر.
- **المدخل والمخرج:** يستلم ملفات الفروع، ويسلّم جدولًا واحدًا بصيغة محددة.
- **الأدوات:** يفتح الأرشيف للقراءة… **ولا يملك ختم الصرف**.
- **حدود التوقف:** «إن وجدت ملفًا ناقصًا، توقف واسألني».
- **معيار النجاح:** «مجموع الجدول يساوي مجموع الفروع».

والحوكمة مثل **لوائح الشركة**: صلاحيات بقدر الحاجة، وسجل حضور وانصراف لكل عمل، وسقف للمصروفات، ولا تضع خبيرًا غاليًا في مهمة يتقنها موظف مبتدئ.`,
        `The agent card is like **a new employee’s job description**:
- **Goal:** “prepare the weekly sales sheet” — nothing more.
- **Input & output:** receives the branch files, delivers one table in a set format.
- **Tools:** opens the archive to read… **but holds no payment stamp**.
- **Stop limits:** “if you find a missing file, stop and ask me”.
- **Success criterion:** “the table’s total equals the branches’ total”.

And governance is like **company regulations**: permissions as needed, an attendance log for every action, a spending cap, and don’t put a costly expert on a task a junior handles well.`),
      mech: L(`## لماذا ملف نصي لكل وكيل؟
لأن الفريق يصبح «قابلًا للمراجعة والتطوير كأي وثيقة عمل» {p40}: تحفظه في [[l:u5-git|Git]]، وتعرف من غيّر تعليمات المحلل ومتى ولماذا، وترجع لنسخة سابقة إن ساءت النتائج.

## معيار النجاح «قابل للفحص»
«تحليل جيد» وصف لا يُفحص. «كل رقم في المخرج له مصدر يُتتبع، ومجموع الفئات = الإجمالي» شرط يفحصه برنامج أو وكيل آخر. هذا ما يجعل المراجعة المتبادلة ممكنة.

## الحوكمة كنظام فرامل
- **أقل صلاحية:** تحدد **أقصى ضرر ممكن** لكل وكيل.
- **السجل:** يحدد **من أخطأ** في السلسلة.
- **السقف:** يمنع **الحلقة اللانهائية** المكلفة.
- **نموذج لكل دور:** يطبق [[l:u5-models|ابدأ من الأسفل]] داخل الفريق.

جرّب تصميم فريق وأثر الضوابط في [[lab:team|مختبر الفريق]].`,
        `## Why one text file per agent?
Because the team becomes “reviewable and improvable like any work document” {p40}: you keep it in [[l:u5-git|Git]], know who changed the analyst’s instructions, when and why, and roll back if results worsen.

## A “checkable” success criterion
“A good analysis” is an uncheckable description. “Every output number has a traceable source, and categories sum to the total” is a condition a program or another agent can check. That’s what makes mutual review possible.

## Governance as a braking system
- **Least privilege:** sets each agent’s **maximum possible damage**.
- **The log:** identifies **who erred** in the chain.
- **The cap:** prevents the costly **infinite loop**.
- **A model per role:** applies [[l:u5-models|start at the bottom]] inside the team.

Try designing a team and the effect of controls in [[lab:team|the team lab]].`),
      practice: L(`## بطاقة كاملة: «فاحص الجودة» لتقرير المبيعات
| العنصر | المحتوى |
|---|---|
| الهدف | يكشف النقص والتكرار والقيم الشاذة في ملفات الفروع قبل أي تحليل |
| المدخل والمخرج | يستلم ملفات الفروع كما هي؛ يسلّم تقرير جودة (عدد الصفوف، الناقص، المكرر، الشاذ) بصيغة JSON محددة |
| الأدوات | قراءة الملفات فقط؛ **ممنوع** التعديل أو الحذف أو الإرسال |
| حدود التوقف | يوقف السلسلة إن نقص عمود أساسي أو تجاوزت القيم الناقصة ٥٪ ويسأل الإنسان |
| معيار النجاح | كل مشكلة في التقرير تشير لملف وصف محددين يمكن فتحهما |

## قياس الفريق — ثلاثة مؤشرات تبدأ بها
١ نسبة المخرجات التي احتاجت تدخلًا بشريًا ولماذا. ٢ الوكيل مصدر الأخطاء المتكررة. ٣ الوقت والتكلفة لكل تشغيل. اعرضها على الإدارة **بلغة النتائج لا بلغة التقنية** {p40}.`,
        `## A full card: the “quality checker” for the sales report
| Element | Content |
|---|---|
| Goal | detects missing, duplicate and outlier values in branch files before any analysis |
| Input & output | receives branch files as-is; delivers a quality report (rows, missing, duplicates, outliers) in a set JSON format |
| Tools | read files only; editing, deleting or sending **forbidden** |
| Stop limits | stops the chain if a key column is missing or missing values exceed 5%, and asks the human |
| Success criterion | every issue in the report points to a specific file and row that can be opened |

## Measuring the team — three indicators to start
1 Share of outputs needing human intervention, and why. 2 The agent behind recurring errors. 3 Time and cost per run. Present them to management **in the language of results, not technology** {p40}.`),
      adv: L(`## المراجع الناقد بحد أقصى دورتين
البرومبت الثالث يحدد: المراجع يعيد العمل للمحلل بملاحظات محددة، **بحد أقصى دورتان، ثم يرفع ما بقي دون حسم إلى الإنسان** {p40}. لماذا؟ لأن دورات بلا حد بين وكيلين قد تدور حول خلاف لا تحسمه البيانات — وهذا بالضبط ما يحتاج حكمًا بشريًا.

## أسئلة المراجع الأربعة
هل كل رقم مدعوم بمصدر يُتتبع؟ ما الافتراضات غير المعلنة؟ ما التفسيرات البديلة التي لم تُذكر؟ هل هناك استنتاج لا تكفيه البيانات؟ {p40} — قارنها بأسئلة [[l:u1-mistakes|كشف أخطاء الذكاء الاصطناعي]]: نفس العقلية، لكن آليًا داخل الفريق.

## القاعدة التي تحكم الوحدة كلها
«ابدأ ضيقًا وعميقًا» {p40}: شريحة واحدة في النظام، وثلاثة أدوار في الفريق، ونموذج رخيص قبل الغالي، وفرع Git قبل التعديل الكبير. كلها نفس الفكرة: **تقدّم بخطوات تستطيع التحقق منها والتراجع عنها**.`,
        `## The critical reviewer, two rounds max
The third prompt sets it: the reviewer returns work to the analyst with specific notes, **for at most two rounds, then escalates what’s unresolved to the human** {p40}. Why? Because endless rounds between two agents may circle a disagreement the data can’t settle — exactly what needs human judgement.

## The reviewer’s four questions
Is every number backed by a traceable source? What assumptions are unstated? What alternative explanations weren’t mentioned? Is any conclusion unsupported by the data? {p40} — compare with [[l:u1-mistakes|spotting AI mistakes]]: the same mindset, automated inside the team.

## The rule governing the whole unit
“Start narrow and deep” {p40}: one slice in the system, three roles in the team, a cheap model before a pricey one, a Git branch before a big change. All the same idea: **advance in steps you can verify and undo**.`),
    },
    card: {
      what: L("بطاقة وكيل بخمسة عناصر، وأربعة ضوابط حوكمة، وأربعة برومبتات {p40}.", "A five-element agent card, four governance controls and four prompts {p40}."),
      why: L("ليبقى الفريق قابلًا للمراجعة، وضرره محصورًا، وتكلفته مضبوطة.", "So the team stays reviewable, its damage contained, its cost controlled."),
      how: L("اكتب البطاقة، وطبّق أقل صلاحية والسجل والسقف، واختر نموذجًا لكل دور.", "Write the card; apply least privilege, the log and the cap; pick a model per role."),
      inside: L("معيار نجاح قابل للفحص يجعل المراجعة المتبادلة ممكنة.", "A checkable success criterion makes mutual review possible."),
      relation: L("ذروة الوحدة: الفريق يدير النظام نيابة عنك.", "The unit’s peak: the team runs the system for you."),
      example: L("فاحص جودة يقرأ فقط ويوقف السلسلة عند نقص يتجاوز ٥٪.", "A quality checker that only reads and stops the chain above 5% missing."),
      apply: L("اكتب بطاقة لوكيل واحد ونفّذ عليها ثلاث حالات اختبار.", "Write one agent’s card and run three test cases on it."),
      mistakes: L("صلاحيات واسعة، وبلا سجل، وبلا سقف، وأقوى نموذج لكل الأدوار.", "Broad permissions, no log, no cap, the strongest model everywhere."),
      check: L("ما العناصر الخمسة لبطاقة الوكيل؟", "What are the five elements of the agent card?"),
      next: L("الخلاصة الكبرى والمراجعة النهائية.", "The grand conclusion and final review."),
    },
    keys: L(["بطاقة الوكيل: الهدف، والمدخل والمخرج، والأدوات، وحدود التوقف، ومعيار النجاح {p40}.", "أقل صلاحية؛ الإرسال والحذف بموافقة بشرية دائمًا.", "سجل كامل لكل خطوة، وسقف للتكلفة والمحاولات.", "نموذج مناسب لكل دور: المتوسط للجامع والمحرر، والقوي للمحلل والمراجع.", "ابدأ ضيقًا وعميقًا: ثلاثة أدوار تعمل بثقة أفضل من سبعة."],
      ["Agent card: goal, input & output, tools, stop limits, success criterion {p40}.", "Least privilege; sending and deleting always need human approval.", "A full log of every step and a cap on cost and attempts.", "A model per role: mid for gatherer and editor, strong for analyst and reviewer.", "Start narrow and deep: three roles with confidence beat seven."]),
    scene: "team-patterns", lab: "team", prompts: ["u5-p-team-design", "u5-p-agent", "u5-p-critic", "u5-p-measure"],
    quick: [
      { q: L("أي مما يلي معيار نجاح «قابل للفحص»؟", "Which is a “checkable” success criterion?"), opts: L(["تحليل احترافي", "تقرير واضح وجميل", "مجموع الفئات يساوي الإجمالي وكل رقم له مصدر يُتتبع", "عمل ممتاز"], ["A professional analysis", "A clear, nice report", "Categories sum to the total and every number has a traceable source", "Excellent work"]), a: 2, why: L("«شرط قابل للفحص لا وصف عام للجودة» {p40}.", "“A checkable condition, not a general description of quality” {p40}.") },
      { q: L("لماذا نضع سقفًا للتكلفة والمحاولات؟", "Why cap cost and attempts?"), opts: L(["لإبطاء الفريق", "حتى لا يدخل الفريق حلقة لا تنتهي تستهلك الميزانية بصمت", "لأن النماذج مجانية", "لا داعي له"], ["To slow the team", "So the team doesn’t enter an endless loop silently burning the budget", "Because models are free", "No need"]), a: 1, why: L("ضابط الحوكمة الثالث {p40}.", "The third governance control {p40}.") },
      { q: L("كم دورة يعيد فيها المراجع الناقد العمل قبل الرفع للإنسان؟", "How many rounds does the critic return work before escalating?"), opts: L(["بلا حد", "دورتان كحد أقصى", "عشر دورات", "ولا دورة"], ["Unlimited", "Two at most", "Ten", "None"]), a: 1, why: L("«بحد أقصى دورتان، ثم يرفع ما بقي دون حسم إلى الإنسان» {p40}.", "“Two rounds at most, then escalate what’s unresolved to the human” {p40}.") },
    ],
    related: ["u5-agents", "u5-build-system", "u5-git"], req: ["u5-agents"], terms: ["agent", "least-privilege", "governance", "run-log", "human-review", "orchestrator"],
  });
})();
