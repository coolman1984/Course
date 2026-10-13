/* Unit 3 — Guide 3, pages 24–25: from a spreadsheet to a professional dashboard. */
(function () {
  const L = (ar, en) => ({ ar, en });

  ACAD.L({
    id: "u3-prepare", unit: "u3", pages: [24], icon: "🧽", diff: 1, mins: 8, tags: ["dashboard", "excel"],
    title: L("خمس دقائق تهيئة توفر ساعات مراجعة", "Five minutes of preparation save hours of review"),
    hook: L("الفارق في جودة اللوحة لا يعود إلى الأداة، بل إلى أسلوب إدارة الحوار — ويبدأ بملف نظيف.", "Dashboard quality depends not on the tool but on how you run the conversation — starting with a clean file."),
    book: L(`**الملخص التنفيذي** {p24}: أصبح بالإمكان تحويل ملف Excel اعتيادي إلى لوحة معلومات تفاعلية متكاملة — بطاقات مؤشرات، ورسوم بيانية، وعوامل تصفية — خلال دقائق، دون كتابة أي شيفرة برمجية ودون أدوات تحليل متخصصة. (المستوى: مبتدئ ومتوسط · زمن التنفيذ ١٥–٣٠ دقيقة · المخرج: لوحة تفاعلية بملف واحد.)

**الفارق الجوهري في جودة الناتج لا يعود إلى الأداة المستخدمة، بل إلى أسلوب إدارة الحوار مع النموذج.** فالطلب العام المفتوح ينتج لوحة عامة لا تخدم قرارًا محددًا، بينما المسار المتدرج المنظم ينتج أداة قرار حقيقية.

**أولًا: تهيئة البيانات قبل البدء — خمس دقائق توفر ساعات من المراجعة:**
1. أن يكون **الصف الأول مخصصًا حصريًا لأسماء الأعمدة**، دون صفوف عناوين متراكبة فوقه.
2. أن يحمل كل عمود **اسمًا دلاليًا واضحًا**؛ فـ«تاريخ البيع» أدق بكثير من «Column1».
3. **حذف الصفوف والأعمدة الفارغة** المتخللة لنطاق البيانات.
4. **فك الخلايا المدمجة** (Merged Cells) بالكامل، لأنها تُربك قراءة البنية الجدولية.
5. **توحيد صيغة التواريخ والأرقام**، وتجنب خلط النصوص بالأرقام في العمود ذاته.
6. عند تعدد أوراق العمل، **البدء بورقة واحدة محورية** ثم التوسع تدريجيًا.`,
      `**Executive summary** {p24}: you can now turn an ordinary Excel file into a complete interactive dashboard — KPI cards, charts and filters — within minutes, without writing code or using specialised analysis tools. (Level: beginner to intermediate · time: 15–30 minutes · output: a one-file interactive dashboard.)

**The real difference in output quality comes not from the tool but from how you manage the conversation with the model.** A vague, open request yields a generic dashboard serving no specific decision; a structured, step-by-step path yields a real decision tool.

**First: prepare the data before you start — five minutes that save hours of review:**
1. **The first row is reserved for column names only**, with no stacked title rows above it.
2. Each column has **a clear, meaningful name**; “sale date” is far more precise than “Column1”.
3. **Delete empty rows and columns** scattered through the data range.
4. **Unmerge all merged cells**, because they confuse reading the table structure.
5. **Unify date and number formats**, and avoid mixing text and numbers in the same column.
6. With several sheets, **start with one core sheet**, then expand gradually.`),
    levels: {
      simple: L(`قبل أن تطلب من شخص قراءة جدول، تأكد أن الجدول «مقروء»: عنوان واحد واضح لكل عمود، بلا خانات مدموجة، بلا صفوف فاضية في النص، والتاريخ مكتوب بنفس الطريقة في كل مكان.

الذكاء الاصطناعي يقرأ الجدول كما يقرأ آلة: لو الصف الأول فيه عنوان التقرير بدل أسماء الأعمدة، سيظن أن «تقرير مبيعات سبتمبر» اسم عمود! **خمس دقائق ترتيب** تمنع ساعات من «ليه الأرقام دي غريبة؟».`,
        `Before asking someone to read a table, make sure it’s “readable”: one clear title per column, no merged cells, no empty rows in the middle, and dates written the same way everywhere.

AI reads the table like a machine: if the first row holds the report title instead of column names, it will think “September sales report” is a column name! **Five minutes of tidying** prevent hours of “why are these numbers weird?”.`),
      mech: L(`## لماذا تُربك هذه الأشياء القراءة؟
| المشكلة | ما يفهمه النموذج |
|---|---|
| صف عناوين فوق أسماء الأعمدة | أسماء أعمدة خاطئة، وصف بيانات «غريب» |
| «Column1» | لا يعرف معنى العمود، فيخمّن |
| صفوف فارغة في النص | يظن أن الجدول انتهى، أو يحسب أصفارًا |
| خلايا مدمجة | قيمة واحدة لصفوف متعددة ← فراغات في الباقي |
| نص وأرقام في عمود واحد | العمود يُقرأ نصًا ← لا جمع ولا متوسط |
| أوراق كثيرة مرة واحدة | تشتت وربط خاطئ بين الأوراق |

هذه نفس مشكلات [[l:u2-analysis|فحص الجودة]] لكن بالمنع المسبق: بدل اكتشافها بعد التحليل، تزيلها قبل البدء. جرّب أثرها على الأرقام في [[lab:quality|مختبر الجودة]].`,
        `## Why do these things confuse reading?
| Problem | What the model understands |
|---|---|
| a title row above the column names | wrong column names and a “strange” data row |
| “Column1” | it doesn’t know the column’s meaning, so it guesses |
| empty rows in the middle | it thinks the table ended, or counts zeros |
| merged cells | one value for several rows → blanks elsewhere |
| text and numbers in one column | the column is read as text → no sum or average |
| many sheets at once | scattering and wrong links between sheets |

These are the same problems as [[l:u2-analysis|the quality check]] but prevented upfront: instead of discovering them after analysis, you remove them before starting. Try their effect on numbers in [[lab:quality|the quality lab]].`),
      practice: L(`## قبل وبعد التهيئة (مثال)
**قبل:** الصف ١ «تقرير مبيعات الربع الثالث»، الصف ٢ خلايا مدمجة «يوليو | أغسطس | سبتمبر»، الأعمدة «Column1, Column2…»، صف إجمالي في منتصف الجدول، وبعض الكميات مكتوبة «١٢ قطعة».
**بعد:** الصف ١ = التاريخ، الفرع، المنتج، الكمية، السعر · لا دمج · لا صف إجمالي داخل البيانات (الإجماليات تحسبها اللوحة) · الكمية أرقام فقط.

## نصيحة
احتفظ بالنسخة الأصلية كما هي، واعمل التهيئة على **نسخة** — نفس قاعدة «لا تُمس البيانات الأصلية» {p17}.`,
        `## Before and after preparation (example)
**Before:** row 1 “Q3 sales report”, row 2 merged cells “July | August | September”, columns “Column1, Column2…”, a totals row mid-table, and some quantities written “12 pcs”.
**After:** row 1 = date, branch, product, quantity, price · no merges · no totals row inside the data (the dashboard computes totals) · quantity numbers only.

## Tip
Keep the original untouched and prepare a **copy** — the same “never touch the original data” rule {p17}.`),
      adv: L(`## حدود التهيئة اليدوية
- **عندما تتكرر التهيئة كل أسبوع** على نفس الملف، فهي مرشحة للأتمتة: ماكرو أو أداة بايثون تنظف قبل اللوحة ([[l:u1-macro|الماكرو]]، [[l:u2-level1|المستوى الأول]]).
- **صف الإجمالي داخل البيانات** خطأ خفي: اللوحة ستحسب الإجمالي مرتين.
- **الحجم**: أكثر من عشرة آلاف صف دون تجميع مسبق يثقل الأداء؛ لخّص البيانات قبل العرض {p25}.

## لماذا «ورقة واحدة أولًا»؟
لأن الربط بين الأوراق يضيف طبقة افتراضات (أي عمود يربط بأي عمود؟). ابنِ لوحة صحيحة من ورقة واحدة، ثم أضف الثانية — نفس فلسفة «الشريحة الضيقة» {p38}.`,
        `## Limits of manual preparation
- **When preparation repeats weekly** on the same file, it’s an automation candidate: a macro or Python tool that cleans before the dashboard ([[l:u1-macro|macros]], [[l:u2-level1|level 1]]).
- **A totals row inside the data** is a hidden error: the dashboard will count the total twice.
- **Size**: over ten thousand rows without pre-aggregation weighs on performance; summarise before displaying {p25}.

## Why “one sheet first”?
Because linking sheets adds a layer of assumptions (which column joins which?). Build a correct dashboard from one sheet, then add the second — the “narrow slice” philosophy {p38}.`),
    },
    card: {
      what: L("ست قواعد لتهيئة ملف إكسل قبل تحويله إلى لوحة {p24}.", "Six rules to prepare an Excel file before turning it into a dashboard {p24}."),
      why: L("لأن الفارق في الجودة يبدأ من بيانات يقرؤها النموذج بشكل صحيح.", "Because quality starts with data the model can read correctly."),
      how: L("صف أول للأسماء، أسماء دلالية، لا فراغات، لا دمج، صيغ موحدة، ورقة واحدة أولًا.", "First row for names, meaningful names, no blanks, no merges, unified formats, one sheet first."),
      inside: L("كل خلل في البنية يتحول إلى افتراض خاطئ عن معنى البيانات.", "Every structural flaw becomes a wrong assumption about the data’s meaning."),
      relation: L("منع مسبق لمشكلات فحص الجودة في الدليل الثاني.", "Prevents upfront the quality problems of Guide 2."),
      example: L("صف «تقرير الربع الثالث» فوق الأعمدة يجعل النموذج يقرأ أسماء خاطئة.", "A “Q3 report” row above the columns makes the model read wrong names."),
      apply: L("هيّئ نسخة من ملف حقيقي بالقواعد الست قبل أي لوحة.", "Prepare a copy of a real file with the six rules before any dashboard."),
      mistakes: L("صف إجمالي داخل البيانات، وكميات «١٢ قطعة» كنص.", "A totals row inside the data; quantities like “12 pcs” as text."),
      check: L("هل تذكر القواعد الست دون الرجوع للدرس؟", "Can you list the six rules without checking?"),
      next: L("المراحل الثماني لبناء اللوحة بالحوار.", "The eight stages of building the dashboard through dialogue."),
    },
    keys: L(["الفارق في أسلوب إدارة الحوار، لا في الأداة {p24}.", "الصف الأول لأسماء الأعمدة فقط، وأسماء دلالية واضحة.", "لا صفوف فارغة، ولا خلايا مدمجة.", "صيغ موحدة للتاريخ والأرقام، ولا نص مع أرقام في عمود واحد.", "ابدأ بورقة واحدة ثم توسع."],
      ["The difference is in managing the dialogue, not the tool {p24}.", "Row one holds column names only, with clear meaningful names.", "No empty rows, no merged cells.", "Unified date and number formats; no text mixed with numbers.", "Start with one sheet, then expand."]),
    lab: "quality", prompts: ["u3-p-prep-check"],
    quick: [
      { q: L("لماذا تُفك الخلايا المدمجة قبل بناء اللوحة؟", "Why unmerge cells before building the dashboard?"), opts: L(["لتحسين الشكل", "لأنها تُربك قراءة البنية الجدولية", "لأن إكسل يمنعها", "لتقليل حجم الملف"], ["To look nicer", "Because they confuse reading the table structure", "Excel forbids them", "To shrink the file"]), a: 1, why: L("«فك الخلايا المدمجة بالكامل، لأنها تُربك قراءة البنية الجدولية» {p24}.", "“Unmerge all merged cells, because they confuse reading the table structure” {p24}.") },
      { q: L("ما الذي يحدد جودة اللوحة الناتجة أكثر من غيره حسب الكتاب؟", "What most determines dashboard quality according to the book?"), opts: L(["الأداة المستخدمة", "أسلوب إدارة الحوار مع النموذج", "عدد الرسوم", "سرعة الجهاز"], ["The tool used", "How the conversation with the model is managed", "Number of charts", "Machine speed"]), a: 1, why: L("«الفارق الجوهري… لا يعود إلى الأداة المستخدمة، بل إلى أسلوب إدارة الحوار مع النموذج» {p24}.", "“The real difference… is not the tool used but how the conversation with the model is managed” {p24}.") },
    ],
    related: ["u3-stages", "u2-analysis"], req: ["u1-excel"], terms: ["merged-cells", "data-quality", "dashboard"],
  });

  ACAD.L({
    id: "u3-stages", unit: "u3", pages: [24, 25], icon: "📊", diff: 2, mins: 14, tags: ["dashboard"],
    title: L("ثماني مراحل: من الغرض إلى لوحة يُعتمد عليها", "Eight stages: from purpose to a dashboard you can rely on"),
    hook: L("ابدأ من القرار لا من البيانات، واعتمد التصميم نصًا قبل التنفيذ، ولا تشارك رقمًا قبل التحقق.", "Start from the decision, not the data; approve the layout as text before building; share no number before checking."),
    book: L(`**ثانيًا: مراحل التنفيذ وصياغة الطلب لكل مرحلة** {p24-25}

| # | المرحلة | جوهر الطلب | معيار الانتقال لما بعدها |
|---|---|---|---|
| ١ | **الغرض والجمهور** | توجيه النموذج لطرح ٣–٥ أسئلة جوهرية قبل التنفيذ | وضوح القرار الذي تخدمه اللوحة |
| ٢ | **التحليل واشتقاق المؤشرات** | اشتقاق ٤–٦ مؤشرات من بنية البيانات مع تبرير كل مؤشر | قائمة مؤشرات مبرَّرة معتمدة |
| ٣ | **اعتماد التصميم قبل التنفيذ** | عرض المخطط نصًا قبل البناء | موافقة على التقسيم وأنواع الرسوم |
| ٤ | **بناء اللوحة** | تنفيذ اللوحة وفق التصور المعتمد | مخرَج مطابق للمواصفات |
| ٥ | **التفاعلية** | فلاتر (الفترة، المنتج، المنطقة) متزامنة عبر كل العناصر | تحديث كل المكونات دون اختلال |
| ٦ | **الهوية البصرية** | تعديلات قصيرة متتابعة: لون مؤسسي، خط أرقام أكبر، وضع داكن، تنسيق طباعة | اتساق بصري وقابلية للعرض والطباعة |
| ٧ | **التحقق من الأرقام** | مطابقة كل الأرقام بالملف الأصلي والإبلاغ عن أي قيمة شاذة | تطابق تام موثق بمراجعة بشرية |
| ٨ | **الحفظ والمشاركة** | ملف واحد مستقل، أو ربط بمصدر حي | وصول الجمهور المستهدف فعليًا |

**ملاحظات الكتاب على المراحل:** اللوحة الجيدة تبدأ من **القرار الذي ستخدمه، لا من البيانات المتاحة** (١). بدلًا من افتراض المؤشرات مسبقًا، يُستحسن **اشتقاقها من بنية البيانات** (٢). مراجعة المخطط نصًا **أسرع وأقل كلفة** من مراجعة مخرَج منفذ بالكامل (٣). يأتي التنفيذ بعد الاتفاق على البنية فيصبح الناتج مطابقًا من المحاولة الأولى (٤). تتحول اللوحة من تقرير ثابت إلى **أداة استكشاف** حين يقطّع المستخدم البيانات بنفسه (٥). مرحلة الهوية لا تستلزم صياغة مطولة؛ **التعديلات القصيرة المتتابعة أدق** (٦). التحقق **المرحلة الأكثر حساسية على الإطلاق**: مخرجات النماذج قابلة للخطأ، والمراجعة البشرية شرط لازم قبل أي مشاركة (٧). التحديث الآلي من نظام حي **مرحلة لاحقة تستلزم ربط مصدر بيانات — لا مجرد صياغة طلب** (٨).`,
      `**Second: the execution stages and the request for each** {p24-25}

| # | Stage | Core of the request | Criterion to move on |
|---|---|---|---|
| 1 | **Purpose & audience** | make the model ask 3–5 essential questions before executing | the decision the dashboard serves is clear |
| 2 | **Analysis & KPIs** | derive 4–6 KPIs from the data structure, justifying each | an approved, justified KPI list |
| 3 | **Approve the design before building** | show the layout as text before building | agreement on layout and chart types |
| 4 | **Build** | build the dashboard per the approved concept | output matching the agreed specification |
| 5 | **Interactivity** | filters (period, product, region) synced across all elements | all components update without glitches |
| 6 | **Visual identity** | short successive tweaks: corporate colour, bigger number font, dark mode, print layout | visual consistency, presentable and printable |
| 7 | **Verify the numbers** | match every number with the original file and flag any odd value | full match documented by human review |
| 8 | **Save & share** | one standalone file, or connect a live source | the target audience actually gets it |

**The book’s notes on the stages:** a good dashboard starts from **the decision it will serve, not the available data** (1). Rather than assuming KPIs, it’s better to **derive them from the data structure** (2). Reviewing the layout as text is **faster and cheaper** than reviewing a fully built output (3). Building comes after agreeing the structure, so the result matches on the first attempt (4). The dashboard becomes **an exploration tool** when users slice data themselves (5). The identity stage needs no long request; **short successive tweaks are more precise** (6). Verification is **the most sensitive stage of all**: model outputs can be wrong, and human review is mandatory before any sharing (7). Automatic refresh from a live system is **a later stage requiring a connected data source — not just a request** (8).`),
    levels: {
      simple: L(`بناء لوحة معلومات بالحوار يشبه **تفصيل بدلة عند خياط**:
١ الخياط يسأل: المناسبة إيه؟ (الغرض) · ٢ يأخذ المقاسات (المؤشرات من بياناتك) · ٣ يريك رسمًا للتصميم قبل أن يقص القماش (اعتماد التصميم نصًا) · ٤ يخيّط · ٥ «بروفة»: تتحرك وتجرب (الفلاتر) · ٦ اللمسات الأخيرة: الأزرار واللون (الهوية) · ٧ **يراجع كل خياطة** (التحقق من الأرقام) · ٨ التسليم.

لو قص القماش قبل أن يريك التصميم، أي تعديل يصبح مكلفًا. ولو سلّم بدون مراجعة، قد تنفك خياطة أمام الناس.`,
        `Building a dashboard through dialogue is like **having a suit tailored**:
1 the tailor asks: what’s the occasion? (purpose) · 2 takes measurements (KPIs from your data) · 3 shows a sketch before cutting the cloth (approve the layout as text) · 4 sews · 5 a fitting: you move and try it (filters) · 6 final touches: buttons and colour (identity) · 7 **checks every seam** (verify the numbers) · 8 delivery.

If they cut before showing the sketch, every change is costly. If they deliver without checking, a seam may split in public.`),
      mech: L(`## لماذا التدرج بدل طلب واحد كبير؟
الكتاب يعد «دمج كل المتطلبات في طلب واحد» من الأخطاء الشائعة: **يصعب التعديل الجزئي، والتدرج يمنح دقة أعلى ومرونة أكبر** {p25}. كل مرحلة لها «معيار انتقال»؛ لا تنتقل حتى يتحقق.

## الحلقة الحرجة: ٢ ← ٣ ← ٧
- **المؤشرات المشتقة** (٢) تمنع لوحة تعرض ما يسهل حسابه بدل ما يهم.
- **التصميم النصي** (٣) يكشف المشكلات حين يكون تغييرها بسطر، لا بساعة.
- **التحقق** (٧) يمسك ما فات: «المخرَج الأنيق لا يعني بالضرورة أنه صحيح» {p25}.

## الفلاتر المتزامنة (٥)
الشرط ليس وجود فلتر، بل أن **«تتحدث جميع البطاقات والرسوم والجدول تلقائيًا وبصورة متزامنة»**. فلتر يغيّر الرسم ولا يغيّر البطاقة ينتج رقمين متناقضين على نفس الشاشة. جرّب التزامن في [[lab:dashboard|مختبر اللوحة]].`,
        `## Why step by step instead of one big request?
The book lists “merging all requirements into one request” as a common mistake: **partial edits get hard, while step-by-step gives more precision and flexibility** {p25}. Each stage has a “criterion to move on”; don’t move until it’s met.

## The critical loop: 2 → 3 → 7
- **Derived KPIs** (2) prevent a dashboard showing what’s easy to compute instead of what matters.
- **Text layout** (3) reveals problems when fixing them takes a line, not an hour.
- **Verification** (7) catches what slipped: “a polished output doesn’t necessarily mean a correct one” {p25}.

## Synced filters (5)
The requirement isn’t having a filter but that **“all cards, charts and the table update automatically and in sync”**. A filter that changes the chart but not the card produces two contradictory numbers on one screen. Try syncing in [[lab:dashboard|the dashboard lab]].`),
      practice: L(`## مسار كامل لمديرة فرع (مثال)
- **١:** «ستعرض على مدير الإدارة أسبوعيًا لقرار سريع عن الأداء». النموذج يسأل: ما الذي يقلقه أكثر؟ المبيعات أم الهامش؟ مقارنة بالأسبوع السابق أم بالهدف؟
- **٢:** يقترح ٥ مؤشرات: المبيعات، الهامش، نسبة تحقيق الهدف، أعلى منتج، المرتجعات — مع سبب كل منها.
- **٣:** «٤ بطاقات أعلى، خط زمني للمبيعات، أعمدة للفروع، جدول تفاصيل» — توافق بعد تعديل واحد.
- **٤–٥:** البناء ثم الفلاتر الثلاثة.
- **٦:** «اللون الأساسي أزرق متوافق مع الهوية، كبّر خط الأرقام، أضف وضعًا داكنًا وتنسيقًا للطباعة».
- **٧:** النموذج يبلّغ أن إجمالي فرع الجيزة لا يطابق الملف بفارق ٢٪ ← صف مكرر اكتُشف.
- **٨:** ملف واحد يُفتح على أي جهاز.`,
        `## A full path for a branch manager (example)
- **1:** “It will be shown to the department head weekly for a quick performance decision.” The model asks: what worries them most — sales or margin? compared with last week or with target?
- **2:** it proposes 5 KPIs: sales, margin, target achievement, top product, returns — each with a reason.
- **3:** “4 cards on top, a sales timeline, bars per branch, a details table” — agreed after one tweak.
- **4–5:** build, then the three filters.
- **6:** “corporate blue as primary, bigger number font, add dark mode and a print layout.”
- **7:** the model reports Giza’s total doesn’t match the file by 2% → a duplicate row found.
- **8:** one file that opens on any device.`),
      adv: L(`## المرحلة ٧ ليست اختيارية
«مخرجات النماذج قابلة للخطأ، والمراجعة البشرية شرط لازم قبل أي مشاركة» {p25}. ولاحظ أن الطلب نفسه يطلب من النموذج مراجعة أرقامه، لكن **«تطابق تام موثق بمراجعة بشرية»** هو معيار الانتقال — أي أنك أنت من يوقّع.

## اللوحة الثابتة مقابل الحية
الملف المستقل لقطة من البيانات. إن أردت تحديثًا لحظيًا من نظام تشغيلي، فالمراحل الثماني تظل سارية، **وتضاف مرحلة تمهيدية لربط مصدر البيانات وتأمين تدفقه** {p25}. وهذا ينقلك عمليًا إلى [[l:u4-localapp|التطبيق بخادم]] أو [[l:u2-platform|المنصة المؤسسية]].

## الجمهور يغيّر كل شيء
«اللوحة الموجهة للإدارة التنفيذية تختلف جوهريًا عن اللوحة التشغيلية اليومية» {p25}: الأولى قرار في ٣٠ ثانية، والثانية تفاصيل للمتابعة اليومية.`,
        `## Stage 7 isn’t optional
“Model outputs can be wrong, and human review is a mandatory condition before any sharing” {p25}. Note the request itself asks the model to review its numbers, but the criterion to move on is **“a full match documented by human review”** — you sign off.

## Static versus live dashboards
A standalone file is a snapshot. If you want live updates from an operational system, the eight stages still apply, **plus a preliminary stage to connect the data source and secure its flow** {p25}. In practice that takes you to [[l:u4-localapp|an app with a server]] or [[l:u2-platform|an enterprise platform]].

## The audience changes everything
“A dashboard for executive management differs fundamentally from a daily operational one” {p25}: the first is a decision in 30 seconds; the second, details for daily follow-up.`),
    },
    card: {
      what: L("ثماني مراحل بطلب جاهز ومعيار انتقال لكل منها {p24-25}.", "Eight stages, each with a ready request and a criterion to move on {p24-25}."),
      why: L("لأن الطلب العام ينتج لوحة عامة، والمسار المتدرج ينتج أداة قرار.", "Because a vague request yields a generic dashboard; a staged path yields a decision tool."),
      how: L("غرض ← مؤشرات ← تصميم نصي ← بناء ← فلاتر ← هوية ← تحقق ← مشاركة.", "Purpose → KPIs → text layout → build → filters → identity → verify → share."),
      inside: L("كل مرحلة تُعتمد قبل التالية، فيصبح التعديل رخيصًا والناتج مطابقًا.", "Each stage is approved before the next, making edits cheap and output accurate."),
      relation: L("تطبيق عملي للصفحة التنفيذية والأسئلة السبعة بدون كود.", "A no-code application of the executive page and seven questions."),
      example: L("التحقق يكشف فرق ٢٪ في فرع بسبب صف مكرر.", "Verification reveals a 2% gap in a branch due to a duplicate row."),
      apply: L("طبّق المسار على ملف فعلي ومحدود الحجم لإنتاج نموذج حي {p25}.", "Apply the path to a real, small file to produce a live prototype {p25}."),
      mistakes: L("كل المتطلبات في طلب واحد، وقبول الأرقام دون تحقق.", "All requirements in one request; accepting numbers without checking."),
      check: L("هل تذكر معيار الانتقال للمراحل ٣ و٥ و٧؟", "Can you state the move-on criterion for stages 3, 5 and 7?"),
      next: L("مواطن الخطأ الشائعة وكيف تتفاداها.", "Common pitfalls and how to avoid them."),
    },
    keys: L(["ابدأ من القرار الذي تخدمه اللوحة، لا من البيانات {p24}.", "اشتق المؤشرات من بنية البيانات مع تبرير كل منها.", "اعتمد التصميم نصًا قبل التنفيذ: أسرع وأرخص.", "الفلاتر تحدّث كل العناصر معًا.", "التحقق من الأرقام أكثر المراحل حساسية: مراجعة بشرية قبل أي مشاركة {p25}."],
      ["Start from the decision the dashboard serves, not the data {p24}.", "Derive KPIs from the data structure, justifying each.", "Approve the layout as text before building: faster and cheaper.", "Filters update every element together.", "Verifying numbers is the most sensitive stage: human review before any sharing {p25}."]),
    scene: "dashboard-stages", lab: "dashboard", prompts: ["u3-p-s1", "u3-p-s2", "u3-p-s3", "u3-p-s4", "u3-p-s5", "u3-p-s6", "u3-p-s7"],
    quick: [
      { type: "order", q: L("رتّب هذه المراحل:", "Order these stages:"), items: L(["تحديد الغرض والجمهور", "اشتقاق المؤشرات", "اعتماد التصميم قبل التنفيذ", "بناء اللوحة", "التحقق من الأرقام"], ["Purpose & audience", "Derive KPIs", "Approve the layout before building", "Build the dashboard", "Verify the numbers"]), why: L("ترتيب الكتاب {p24-25}؛ والتحقق يأتي بعد البناء والتفاعلية والهوية.", "The book’s order {p24-25}; verification comes after building, interactivity and identity.") },
      { q: L("لماذا يُعرض التصميم نصًا قبل البناء؟", "Why show the layout as text before building?"), opts: L(["لأن النموذج لا يرسم", "لأن مراجعة المخطط نصًا أسرع وأقل كلفة من مراجعة مخرَج منفذ بالكامل", "لتوفير الألوان", "لا داعي لذلك"], ["Because the model can’t draw", "Because reviewing a text layout is faster and cheaper than reviewing a fully built output", "To save colours", "No need"]), a: 1, why: L("نص الكتاب في المرحلة الثالثة {p24}.", "The book’s words for stage 3 {p24}.") },
    ],
    related: ["u3-prepare", "u3-mistakes", "u2-level3", "u4-frontend"], req: ["u3-prepare"], terms: ["kpi", "dashboard", "filter"],
  });

  ACAD.L({
    id: "u3-mistakes", unit: "u3", pages: [25], icon: "🚧", diff: 2, mins: 8, tags: ["dashboard", "safety"],
    title: L("ستة مواطن خطأ في لوحات المعلومات وكيف تتفاداها", "Six dashboard pitfalls and how to avoid them"),
    hook: L("المخرَج الأنيق لا يعني بالضرورة أنه صحيح.", "A polished output doesn’t necessarily mean a correct one."),
    book: L(`**مواطن الخطأ الشائعة وكيفية تفاديها** {p25}:
| الخطأ | لماذا يضر؟ وكيف تعالجه؟ |
|---|---|
| **بيانات غير مهيأة** | الصفوف الفارغة والعناوين المتراكبة تُربك قراءة البنية وتنتج مؤشرات مضللة. التهيئة المسبقة تعالج ذلك جذريًا. |
| **طلب مفرط في العمومية** | «أنشئ لوحة معلومات» دون تحديد غرض ينتج مخرجًا عامًا لا يخدم قرارًا بعينه. |
| **قبول الأرقام دون تحقق** | المرحلة السابعة ليست اختيارية؛ فالمخرَج الأنيق لا يعني بالضرورة أنه صحيح. |
| **دمج كل المتطلبات في طلب واحد** | الطلب المطول يصعّب التعديل الجزئي، والتدرج يمنح دقة أعلى ومرونة أكبر. |
| **حجم بيانات مفرط** | تجاوز عشرة آلاف صف دون تجميع مسبق يثقل الأداء؛ الحل تلخيص البيانات قبل العرض. |
| **إهمال جمهور العرض** | اللوحة الموجهة للإدارة التنفيذية تختلف جوهريًا عن اللوحة التشغيلية اليومية. |

**الخلاصة والخطوة التالية**: هذا المسار يلائم بدرجة عالية التقارير الدورية — الأسبوعية والشهرية — التي تُرفع للإدارة أو تُتداول بين الفرق، إذ **يختصر زمن الإعداد من ساعات إلى دقائق** مع ارتفاع ملموس في جودة العرض. أما إذا كان المطلوب لوحة تتحدث لحظيًا من نظام تشغيلي حي، فالمراحل الثماني تظل سارية، وتضاف إليها مرحلة تمهيدية لربط مصدر البيانات وتأمين تدفقه. **الخطوة التالية المقترحة**: تطبيق المسار على ملف بيانات فعلي ومحدود الحجم، لإنتاج نموذج حي يصلح للعرض التوضيحي أمام الجمهور المستهدف.`,
      `**Common pitfalls and how to avoid them** {p25}:
| Pitfall | Why it hurts and how to fix it |
|---|---|
| **Unprepared data** | empty rows and stacked titles confuse reading the structure and produce misleading KPIs. Preparing upfront fixes this at the root. |
| **An overly generic request** | “Create a dashboard” with no purpose yields a generic output serving no specific decision. |
| **Accepting numbers without verification** | stage seven isn’t optional; a polished output doesn’t necessarily mean a correct one. |
| **Merging all requirements into one request** | a long request makes partial edits hard; step-by-step gives more precision and flexibility. |
| **Excessive data volume** | more than ten thousand rows without pre-aggregation weighs on performance; summarise before displaying. |
| **Ignoring the audience** | a dashboard for executive management differs fundamentally from a daily operational one. |

**Conclusion and next step**: this path fits periodic reports — weekly and monthly — sent to management or shared between teams, **cutting preparation time from hours to minutes** with a tangible gain in presentation quality. If you need a dashboard updated live from an operational system, the eight stages still apply, plus a preliminary stage to connect the data source and secure its flow. **Suggested next step**: apply the path to a real, limited data file to produce a live prototype suitable for demonstrating to the target audience.`),
    levels: {
      simple: L(`الأخطاء الستة تشبه أخطاء بناء بيت: أساس غير مستوٍ (بيانات غير مهيأة)، وبلا رسم هندسي واضح (طلب عام)، وبلا تفتيش قبل السكن (أرقام بلا تحقق)، وكل شيء يُبنى مرة واحدة (طلب واحد كبير)، وأحمال أكبر من طاقة الأساس (بيانات ضخمة)، وتصميم لا يناسب ساكنيه (إهمال الجمهور).

**الحل في كل مرة موجود في المراحل الثماني** — الأخطاء هي ببساطة القفز فوق مرحلة.`,
        `The six mistakes resemble house-building mistakes: an uneven foundation (unprepared data), no clear plan (generic request), no inspection before moving in (unverified numbers), building everything at once (one big request), loads beyond the foundation (huge data), and a design unfit for its residents (ignoring the audience).

**The fix each time is in the eight stages** — the mistakes are simply skipping a stage.`),
      mech: L(`## كل خطأ = مرحلة تم تخطيها
| الخطأ | المرحلة المتخطاة |
|---|---|
| بيانات غير مهيأة | «أولًا: التهيئة» |
| طلب عام | المرحلة ١: الغرض والجمهور |
| أرقام بلا تحقق | المرحلة ٧: التحقق |
| طلب واحد مطول | التدرج نفسه (المراحل ١–٨) |
| حجم مفرط | التلخيص قبل العرض (التهيئة/المرحلة ٢) |
| إهمال الجمهور | المرحلة ١ مرة أخرى |

## لماذا عشرة آلاف صف؟
اللوحة في ملف واحد تحمل كل الصفوف داخل الصفحة، والمتصفح يرسم ويحسب مع كل فلتر. التجميع المسبق (مثلًا مبيعات يومية لكل فرع بدل كل فاتورة) يحفظ المعنى ويخفف الحمل — وهذا ما تفعله أدوات مثل DuckDB قبل العرض في [[l:u2-analysis|الدليل الثاني]].`,
        `## Each mistake = a skipped stage
| Mistake | Skipped stage |
|---|---|
| unprepared data | “first: preparation” |
| generic request | stage 1: purpose & audience |
| unverified numbers | stage 7: verification |
| one long request | the step-by-step itself (stages 1–8) |
| excessive volume | summarising before display (prep / stage 2) |
| ignoring the audience | stage 1 again |

## Why ten thousand rows?
A one-file dashboard carries every row inside the page, and the browser draws and computes with every filter. Pre-aggregation (e.g. daily sales per branch instead of every invoice) keeps the meaning and lightens the load — what tools like DuckDB do before display in [[l:u2-analysis|Guide 2]].`),
      practice: L(`## اختبر لوحتك بالأخطاء الستة (قائمة قبل الإرسال)
- [ ] هل الملف مهيأ بالقواعد الست؟
- [ ] هل أستطيع كتابة القرار الذي تخدمه اللوحة في سطر؟
- [ ] هل طابقت ٣ أرقام على الأقل يدويًا بالملف الأصلي؟
- [ ] هل بنيتها على مراحل؟
- [ ] هل البيانات ملخصة إن تجاوزت ١٠ آلاف صف؟
- [ ] هل هي مصممة لجمهورها (تنفيذي أم تشغيلي)؟

## مثال على «إهمال الجمهور»
لوحة واحدة لمدير عام ومشرف وردية: المدير يرى ٢٠ رسمًا ولا يجد القرار، والمشرف لا يجد تفاصيل ورديته. **الحل: لوحتان** بنفس البيانات ولجمهورين مختلفين.`,
        `## Test your dashboard against the six (pre-send checklist)
- [ ] Is the file prepared with the six rules?
- [ ] Can I write the decision it serves in one line?
- [ ] Did I check at least 3 numbers by hand against the original file?
- [ ] Was it built in stages?
- [ ] Is the data summarised if it exceeds 10,000 rows?
- [ ] Is it designed for its audience (executive or operational)?

## An “ignored audience” example
One dashboard for a general manager and a shift supervisor: the manager sees 20 charts and can’t find the decision; the supervisor can’t find their shift’s details. **The fix: two dashboards** from the same data for two audiences.`),
      adv: L(`## «من ساعات إلى دقائق» — بشرط
اختصار الوقت حقيقي للتقارير الدورية، **لكن** التحقق البشري (٧) لا يُختصر. إن كان التقرير مصيريًا، فالدقائق الموفرة في البناء تُستثمر في التحقق.

## متى تتجاوز هذا الدليل؟
عندما تحتاج: بيانات حية من نظام، أو صلاحيات مختلفة، أو منطق حساب معقد يُكتب مرة في خادم. هنا تنتقل إلى [[l:u4-backend|الواجهة الخلفية]] و[[l:u4-localapp|التطبيق المحلي]] حيث «الواجهة تعرض فقط ولا تحسب شيئًا بنفسها» {p30}.`,
        `## “From hours to minutes” — with a condition
The time saving is real for periodic reports, **but** human verification (7) isn’t shortened. If the report is critical, invest the minutes saved in building into verifying.

## When do you outgrow this guide?
When you need live data from a system, different permissions, or complex calculation logic written once in a server. Then you move to [[l:u4-backend|the back end]] and [[l:u4-localapp|the local app]], where “the interface only displays and calculates nothing itself” {p30}.`),
    },
    card: {
      what: L("ستة أخطاء: بيانات غير مهيأة، طلب عام، أرقام بلا تحقق، طلب واحد مطول، حجم مفرط، إهمال الجمهور {p25}.", "Six mistakes: unprepared data, generic request, unverified numbers, one long request, excessive volume, ignored audience {p25}."),
      why: L("لأن كل خطأ منها يُنتج لوحة أنيقة غير صحيحة أو غير مفيدة.", "Because each produces a polished dashboard that is wrong or useless."),
      how: L("كل خطأ يقابل مرحلة تم تخطيها؛ العلاج هو عدم التخطي.", "Each maps to a skipped stage; the cure is not skipping."),
      inside: L("التجميع المسبق يحفظ المعنى ويخفف حمل المتصفح.", "Pre-aggregation keeps meaning and lightens the browser’s load."),
      relation: L("قائمة مراجعة عكسية للمراحل الثماني.", "A reverse checklist for the eight stages."),
      example: L("لوحة واحدة لمدير عام ومشرف وردية لا تخدم أيًا منهما.", "One dashboard for a GM and a shift supervisor serves neither."),
      apply: L("مرّر لوحتك الأخيرة على القائمة الست قبل إرسالها.", "Run your latest dashboard through the six-point list before sending."),
      mistakes: L("اعتبار التحقق خطوة اختيارية لأن الشكل جميل.", "Treating verification as optional because it looks good."),
      check: L("هل تربط كل خطأ بالمرحلة التي تمنعه؟", "Can you link each mistake to the stage that prevents it?"),
      next: L("الدليل الرابع: من المحرر إلى تطبيق ويب على جهازك.", "Guide 4: from the editor to a web app on your machine."),
    },
    keys: L(["بيانات غير مهيأة ← مؤشرات مضللة؛ التهيئة تعالجها جذريًا {p25}.", "«أنشئ لوحة» بلا غرض ← مخرج عام.", "المخرج الأنيق ليس بالضرورة صحيحًا: التحقق إلزامي.", "التدرج أدق من طلب واحد مطول؛ ولخّص ما فوق ١٠ آلاف صف.", "لوحة الإدارة التنفيذية تختلف عن اللوحة التشغيلية."],
      ["Unprepared data → misleading KPIs; preparation fixes it at the root {p25}.", "“Make a dashboard” without a purpose → a generic output.", "Polished isn’t necessarily correct: verification is mandatory.", "Step-by-step beats one long request; summarise above 10k rows.", "An executive dashboard differs from an operational one."]),
    prompts: ["u3-p-audit"],
    quick: [
      { q: L("لديك ٨٠ ألف صف فواتير وتريد لوحة سريعة. ما الحل حسب الكتاب؟", "You have 80,000 invoice rows and want a fast dashboard. What’s the book’s fix?"), opts: L(["احذف نصف البيانات", "لخّص البيانات قبل العرض", "استخدم ألوانًا أقل", "لا حل"], ["Delete half the data", "Summarise the data before display", "Use fewer colours", "No fix"]), a: 1, why: L("«تجاوز عشرة آلاف صف دون تجميع مسبق يثقل الأداء؛ الحل تلخيص البيانات قبل العرض» {p25}.", "“More than ten thousand rows without pre-aggregation weighs on performance; the fix is summarising before display” {p25}.") },
      { q: L("أي خطأ يحدث عندما تطلب «أنشئ لوحة معلومات» فقط؟", "Which mistake happens when you just ask “create a dashboard”?"), opts: L(["حجم بيانات مفرط", "طلب مفرط في العمومية", "إهمال التهيئة", "دمج المتطلبات"], ["Excessive data", "An overly generic request", "Skipping preparation", "Merging requirements"]), a: 1, why: L("ينتج مخرجًا عامًا لا يخدم قرارًا بعينه {p25}.", "It yields a generic output serving no specific decision {p25}.") },
    ],
    related: ["u3-stages", "u2-level3", "u4-localapp"], req: ["u3-stages"], terms: ["dashboard", "kpi"],
  });
})();
