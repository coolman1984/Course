/* Tool five — the story deck of lesson x8 (unit 2), on the lesson's project (Lesson_7_Material_Needs_From_Plan).
   The hardest project, joining production and purchasing. The planning engineer carries every slide with one question:
   «من خطة الإنتاج… نطلب إيه وقد إيه؟». The deck builds the calculation in steps, each on a sheet of its own: four files,
   the explosion of plan × bill of materials, a planned model with no BOM, the gross need, units that don't match
   (screws in boxes), the net need, rounding up to the pack, a hand check of one material, and the review of the order.
   Each slide gives one rule with its reason. Figures are the project's own. Drawings are the xn_* entries in
   engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.needsStory = {
    id: "needs", lesson: "x8",
    kicker: u("الأداة الخامسة · الحكاية كاملة في ٨ دقايق", "Tool five · the whole story in 8 minutes"),
    title: u("من خطة الإنتاج لطلب الخامات… خطوة خطوة", "From the production plan to the materials order… step by step"),
    lead: u("خطة أبريل وصلت، ومدير المصنع عايز يعرف هنطلب إيه. ده أصعب مشروع في الوحدة، لأنه بيجمع المثالين: الإنتاج والمشتريات. في الحكاية دي مهندس التخطيط بيبني الأداة الخامسة على أربع ملفات، وبيقسم الحساب الطويل خطوات صغيرة، كل خطوة ليها رقم يتراجع.",
      "April's plan has arrived, and the factory manager wants to know what we'll order. This is the hardest project in the unit, because it joins both examples: production and purchasing. In this story the planning engineer builds tool five on four files, and splits the long calculation into small steps, each with a figure to check."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("من خطة الإنتاج… نطلب إيه وقد إيه؟", "From the production plan… what do we order, and how much?"),
    finalQuestion: u("طب لو ملفات الشهر الجديد وصلت متغيّرة… والأداة وقفت؟", "So what if next month's files arrive changed… and the tool stops?"),
    note: u("الأرقام والأسماء توضيحية، وهي أرقام مشروع الدرس نفسه. الطلب النهائي ما يتبعتش لمورّد من غير مراجعة المشتريات.", "Figures and names are illustrative, and they are the lesson project's own. The final order never goes to a supplier without purchasing's review."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("من الخطة لطلب الخامات، في شرائح", "From the plan to the materials order, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "scene", art: "xn_scene", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("يومين كل شهر", "Two days every month"),
        title: u("١١٬١٥٠ جهاز في الخطة… وكل جهاز محتاج ١١ خامة", "11,150 TVs in the plan… and each TV needs 11 materials"),
        story: [u("كل شهر، مهندس التخطيط بياخد خطة الإنتاج، ويفتح شيت كبير فيه لكل موديل الخامات بتاعته، ويضرب، ويجمع، ويطرح المخزون، ويبعت للمشتريات. يومين من المعادلات، والشهر اللي فات المسامير خلصت في نص الشهر لأن رقم واحد اتحسب غلط.",
          "Every month the planning engineer takes the production plan, opens a big sheet listing each model's materials, multiplies, sums, subtracts the stock and sends the result to purchasing. Two days of formulas, and last month the screws ran out mid-month because one figure was worked out wrong."),
        u("خطة أبريل: ١١٬١٥٠ جهاز في ١٣ موديل. وزميلته في المشتريات مستنية الطلب علشان الشاشات بتاخد من ٣٠ لـ ٤٥ يوم توريد. والسؤال اللي ماشي معانا: من خطة الإنتاج، نطلب إيه وقد إيه، من غير ولا رقم غلط؟",
          "April's plan: 11,150 TVs across 13 models. And his colleague in purchasing is waiting for the order, because panels take 30 to 45 days to deliver. And the question we carry: from the production plan, what do we order and how much, without a single wrong figure?")],
        answer: u("قبل ما تطلب الأداة، اكتب الحساب كلام عادي: «الخطة × المكوّنات − المخزون، متقرّب للعبوة». لأن الحساب اللي ما تقدرش تقوله في جملة، ما تقدرش توصفه للنموذج.", "Before asking for the tool, write the calculation in plain words: “plan × components − stock, rounded to the pack” — a calculation you can't say in a sentence, you can't describe to the model."),
        idea: u("حساب طويل… بيتقال في جملة واحدة.", "A long calculation… said in one sentence.")
      },
      {
        id: "files", art: "xn_files", year: u("الملفات", "The files"), mark: u("٠٢", "02"), era: u("أربع ملفات", "Four files"),
        title: u("أربع ملفات… كل واحد بيجاوب سؤال", "Four files… each answers one question"),
        story: [u("مشروع الدرس أربع ملفات بالإنجليزي. Production_Plan_Apr.xlsx بيقول هنعمل كام جهاز من كل موديل. وBOM.xlsx، قايمة المكوّنات، بيقول كل جهاز محتاج إيه من كل خامة. وMaterials.xlsx بيقول كل خامة بتتطلب من مين، وبالعبوة كام، وبكام.",
          "The lesson's project is four files in English. Production_Plan_Apr.xlsx says how many TVs of each model we'll build. BOM.xlsx, the bill of materials, says what each TV needs of each material. Materials.xlsx says whom each material is ordered from, its pack size and its price."),
        u("وStock.xlsx بيقول عندنا كام في المخزن، وكام في الطريق من أوامر قديمة. أربع أسئلة، وأربع ملفات، وملفين منهم فاكرهم: الموديلات من الإنتاج، والخامات من المشتريات. الأداة دي بتربطهم كلهم.",
          "And Stock.xlsx says how much we have in the stores, and how much is on its way from earlier orders. Four questions, four files, and two of them you know: the models from production, the materials from purchasing. This tool ties them all together.")],
        answer: u("قول للنموذج كل ملف بيجاوب أنهي سؤال، مش أعمدته بس. لأن النموذج اللي فاهم دور كل ملف بيربطهم صح.", "Tell the model which question each file answers, not just its columns — a model that understands each file's role joins them correctly."),
        idea: u("أربع أسئلة… وأربع ملفات.", "Four questions… four files.")
      },
      {
        id: "steps", art: "xn_steps", year: u("الخطوات", "The steps"), mark: u("٠٣", "03"), era: u("كل خطوة شيت", "Each step a sheet"),
        title: u("الحساب الطويل يتقسم خطوات… وكل خطوة شيت", "A long calculation is split into steps… each one a sheet"),
        story: [u("مهندس التخطيط افتكر قاعدة «وحدات صغيرة مستقلة»: لو طلب الحساب كله مرة واحدة، والرقم النهائي طلع غلط، مش هيعرف الغلط فين. فقسمه خمس خطوات: Explosion، وبعدها Gross، وبعدها Net، وبعدها OrderQty، وفي الآخر Check.",
          "The planning engineer remembered the “small independent modules” rule: ask for the whole calculation at once, and if the final figure is wrong, he won't know where. So he split it into five steps: Explosion, then Gross, then Net, then OrderQty, and finally Check."),
        u("وطلب إن كل خطوة تتكتب في شيت لوحدها في نفس ملف الناتج. كده يقدر يراجع أي خطوة لوحدها، ويقارن رقم واحد بحسابه بإيده. وأي غلطة بتبان في أول خطوة اتغلطت فيها، مش في الآخر.",
          "And he asked for each step to be written on a sheet of its own in the same output workbook. Then he can check any step on its own, and compare one figure with his own hand calculation. Any mistake shows at the first step where it happened, not at the end.")],
        answer: u("قسّم أي حساب طويل خطوات، واطلب كل خطوة في شيت. لأن الحساب اللي بيتراجع خطوة خطوة بيتصلّح خطوة خطوة.", "Split any long calculation into steps, and ask for each step on a sheet — a calculation checked step by step is fixed step by step."),
        idea: u("خمس خطوات… خمس فرص تمسك الغلط.", "Five steps… five chances to catch a mistake.")
      },
      {
        id: "explode", art: "xn_explode", year: u("الخطوة ١", "Step 1"), mark: u("٠٤", "04"), era: u("تفكيك الخطة", "Exploding the plan"),
        title: u("Explosion: ١٢ موديل × ١١ خامة = ١٣٢ سطر", "Explosion: 12 models × 11 materials = 132 rows"),
        story: [u("أول خطوة: لكل موديل في الخطة، الأداة بتجيب الخامات بتاعته من الـ BOM، وتضرب كمية الخطة في كمية كل خامة في الجهاز الواحد. M108 مثلًا، شاشة ٥٥ بوصة 4K: الخطة ١٬١٠٠ جهاز، وكل جهاز محتاج لوحة PNL-55 واحدة، يعني ١٬١٠٠ لوحة.",
          "First step: for each model in the plan, the tool fetches its materials from the BOM and multiplies the plan quantity by each material's quantity per TV. Take M108, the 55-inch 4K TV: the plan is 1,100 TVs, each needs one PNL-55 panel, so 1,100 panels."),
        u("والمسامير: كل جهاز من M108 محتاج ١٨ مسمار SCR-M3، يعني ١٩٬٨٠٠ مسمار من الموديل ده لوحده. النتيجة شيت Explosion فيه سطر لكل موديل × خامة: ١٣٢ سطر. ولو العدد ده طلع غير كده، يبقى فيه موديل أو خامة ناقصة.",
          "And the screws: each M108 needs 18 SCR-M3 screws, so 19,800 screws for this model alone. The result is an Explosion sheet with one row per model × material: 132 rows. If that count comes out different, a model or a material is missing.")],
        answer: u("اعرف عدد السطور المتوقع في كل خطوة قبل التشغيل. لأن العدد الغلط أسرع إشارة إن حاجة ضاعت أو اتكررت.", "Know each step's expected row count before the run — a wrong count is the quickest sign that something was lost or repeated."),
        idea: u("عدد السطور… أول اختبار.", "The row count… the first test.")
      },
      {
        id: "nobom", art: "xn_nobom", year: u("الفخ ١", "Trap 1"), mark: u("٠٥", "05"), era: u("موديل من غير BOM", "A model with no BOM"),
        title: u("M113 في الخطة بـ ٦٠٠ جهاز… ومالوش قايمة مكوّنات", "M113 is in the plan at 600 TVs… with no bill of materials"),
        story: [u("أول تشغيل وقف: «M113: 600 planned, no BOM». فاكر M113؟ الموديل الجديد، شاشة ٥٨ بوصة، اللي ظهر في الدرس الرابع من غير ما يبقى في قايمة الموديلات. ودلوقتي في الخطة، والهندسة لسه ما بعتتش قايمة مكوّناته.",
          "The first run stopped: “M113: 600 planned, no BOM.” Remember M113? The new 58-inch model that turned up in lesson four without being on the models list. Now it's in the plan, and engineering hasn't sent its bill of materials yet."),
        u("لو الأداة سكتت وكمّلت، الطلب كان هيطلع من غير خامات الـ ٦٠٠ جهاز دول، وأول ما الخط يبدأ فيهم، مفيش شاشات. مهندس التخطيط سأل الهندسة: القايمة بتتراجع وهتيجي الأسبوع الجاي. فالقرار: M113 يتكتب في شيت Not_Planned، وباقي الطلب يكمّل.",
          "Had the tool carried on silently, the order would have gone out without materials for those 600 TVs, and the moment the line started on them, there'd be no panels. The planning engineer asked engineering: the list is under review and arrives next week. So the decision: M113 goes on a Not_Planned sheet, and the rest of the order goes ahead.")],
        answer: u("أي حاجة في الخطة مالهاش بيانات كاملة، الأداة توقف وتسمّيها. لأن الحاجة اللي بتختفي من الحساب بتظهر بعدين كخامة ناقصة على الخط.", "Anything in the plan without complete data stops the tool and is named — whatever vanishes from the calculation reappears later as a missing material on the line."),
        idea: u("اللي مالوش BOM… مالوش طلب.", "No BOM… no order.")
      },
      {
        id: "gross", art: "xn_gross", year: u("الخطوة ٢", "Step 2"), mark: u("٠٦", "06"), era: u("الاحتياج الإجمالي", "The gross need"),
        title: u("Gross: كل خامة مجموعة من كل الموديلات", "Gross: each material summed over every model"),
        story: [u("تاني خطوة: الأداة بتجمع سطور Explosion لكل خامة. اللوحة PNL-55 بتيجي من موديل واحد بس، فاحتياجها ١٬١٠٠. بس فيه خامات بتدخل في موديلات كتير: المسمار SCR-M3 موجود في الـ ١٢ موديل، فاحتياجه الإجمالي ١٦٠٬٧٠٠ مسمار.",
          "Second step: the tool sums the Explosion rows per material. Panel PNL-55 comes from one model only, so its need is 1,100. But some materials go into many models: the SCR-M3 screw is in all 12 models, so its gross need is 160,700 screws."),
        u("النتيجة شيت فيه سطر لكل خامة: ٣٢ خامة. ودي النقطة اللي كان الحساب بالإيد بيغلط فيها: خامة مشتركة بين موديلات كتير، وواحد من الموديلات اتنسي في الجمع. الأداة ما بتنساش، ومهندس التخطيط بيراجع خامة مشتركة واحدة بإيده.",
          "The result is a sheet with one row per material: 32 materials. And that is where the hand calculation used to go wrong: a material shared by many models, with one model forgotten in the sum. The tool doesn't forget, and the planning engineer checks one shared material by hand.")],
        answer: u("راجع بإيدك خامة واحدة بسيطة وخامة واحدة مشتركة. لأن الاتنين بيختبروا حاجتين مختلفين في الحساب.", "Check by hand one simple material and one shared material — the two test different parts of the calculation."),
        idea: u("خامة واحدة… من كتير موديلات.", "One material… from many models.")
      },
      {
        id: "units", art: "xn_units", year: u("الفخ ٢", "Trap 2"), mark: u("٠٧", "07"), era: u("علبة ولا قطعة؟", "Box or piece?"),
        title: u("المسامير: ٨٨ في المخزن… علبة، مش قطعة", "Screws: 88 in stock… boxes, not pieces"),
        story: [u("التشغيل التاني وقف تاني: «SCR-M3, SCR-M4: Stock unit box of 1000, Materials unit pcs». المخزن بيعد المسامير بالعلبة، والـ BOM بيعدها بالقطعة. المخزون من SCR-M3 مكتوب ٨٨، والمقصود ٨٨ علبة، يعني ٨٨٬٠٠٠ مسمار.",
          "The second run stopped again: “SCR-M3, SCR-M4: Stock unit box of 1000, Materials unit pcs.” The stores count screws in boxes, and the BOM counts them in pieces. SCR-M3's stock reads 88, meaning 88 boxes, that is 88,000 screws."),
        u("لو الأداة طرحت ٨٨ من ١٦٠٬٧٠٠ زي ما هم، الطلب كان هيطلع ١٦١٬٠٠٠ مسمار بدل ٧٣٬٠٠٠: أكتر من الضعف. والقاعدة اللي في الـ Prompt مسكتها: قبل أي طرح، الوحدات لازم تتطابق. مهندس التخطيط رد: «العلبة = ١٠٠٠ قطعة، حوّل قبل الطرح».",
          "Had the tool subtracted 88 from 160,700 as they stood, the order would have come out at 161,000 screws instead of 73,000: more than double. The rule in the Prompt caught it: before any subtraction, the units must match. The planning engineer replied: “A box = 1000 pieces; convert before subtracting.”")],
        answer: u("قبل أي طرح أو جمع بين ملفين، اتأكد إن الوحدات واحدة. لأن الرقم الصح بوحدة غلط بيطلّع نتيجة غلط بثقة كاملة.", "Before any subtraction or sum across two files, make sure the units are the same — a right figure in the wrong unit yields a wrong result with full confidence."),
        idea: u("٨٨… علبة ولا قطعة؟", "88… boxes or pieces?")
      },
      {
        id: "net", art: "xn_net", year: u("الخطوة ٣", "Step 3"), mark: u("٠٨", "08"), era: u("الصافي", "The net need"),
        title: u("Net: الإجمالي ناقص اللي عندنا واللي جاي", "Net: gross minus what we have and what's coming"),
        story: [u("تالت خطوة: لكل خامة، الصافي = الإجمالي − المخزون − اللي في الطريق. PNL-55: ١٬١٠٠ − ٣٨٠ − ٠ = ٧٢٠ لوحة لازم تتطلب. واللي في الطريق مهم: أوامر قديمة لسه ما وصلتش، ولو اتنست، هنطلب نفس الحاجة مرتين.",
          "Third step: for each material, net = gross − stock − on order. PNL-55: 1,100 − 380 − 0 = 720 panels to order. And what's on order matters: earlier orders not yet arrived; forget them and we order the same thing twice."),
        u("وأحيانًا الصافي بيطلع بالسالب. PSU-S، بوردة الباور الصغيرة: الاحتياج ٧٬٣٠٠، والمخزون ٥٬٣٤٠، وفي الطريق ٢٬٦٥٠، يعني عندنا أكتر من المطلوب. القاعدة: السالب يبقى صفر، ومفيش طلب. وفي المشروع ٣ خامات زي كده.",
          "And sometimes the net comes out negative. PSU-S, the small power board: a need of 7,300, stock of 5,340 and 2,650 on order, so we have more than enough. The rule: a negative becomes zero, and there's no order. The project has 3 materials like that.")],
        answer: u("حط في الصافي كل اللي جاي في الطريق، وخلّي السالب صفر. لأن نسيان اللي جاي بيكرر الطلب، والسالب مالوش معنى في أمر شراء.", "Include everything on order in the net, and make a negative zero — forgetting what's coming doubles the order, and a negative has no meaning on a purchase order."),
        idea: u("اللي عندنا + اللي جاي… قبل ما نطلب.", "What we have + what's coming… before we order.")
      },
      {
        id: "pack", art: "xn_pack", year: u("الخطوة ٤", "Step 4"), mark: u("٠٩", "09"), era: u("حجم العبوة", "The pack size"),
        title: u("OrderQty: تقريب لفوق… لمضاعف العبوة", "OrderQty: rounded up… to a multiple of the pack"),
        story: [u("المورّد ما بيبيعش مسمار واحد: SCR-M3 بيتباع بالعبوة، ١٬٠٠٠ مسمار. فالصافي ٧٢٬٧٠٠ لازم يبقى ٧٣٬٠٠٠. وبوردة السمارت MB-SM: الصافي ١٬٠١٠، والعبوة ٥٠، فالطلب ١٬٠٥٠. الأداة بتاخد حجم العبوة من Materials.xlsx لكل خامة.",
          "The supplier doesn't sell one screw: SCR-M3 is sold by the pack, 1,000 screws. So a net of 72,700 must become 73,000. And the smart main board MB-SM: a net of 1,010 with a pack of 50, so the order is 1,050. The tool takes each material's pack size from Materials.xlsx."),
        u("والكلمة المهمة في الـ Prompt: «لفوق». التقريب للأقرب كان هيخلّي ١٬٠١٠ تبقى ١٬٠٠٠، يعني ١٠ بوردات ناقصة، و١٠ أجهزة واقفة على الخط. كلمة واحدة في الطلب بتفرق بين خط شغال وخط مستني.",
          "And the key word in the Prompt: “up”. Rounding to the nearest would have turned 1,010 into 1,000: 10 boards short, and 10 TVs held up on the line. One word in the request is the difference between a running line and a waiting one.")],
        answer: u("قول للنموذج اتجاه التقريب صراحة: لفوق، لتحت، ولا للأقرب. لأن كل اتجاه ليه نتيجة مختلفة على الخط.", "Tell the model the rounding direction explicitly: up, down or nearest — each direction has a different result on the line."),
        idea: u("«لفوق»… كلمة بتحمي الخط.", "“Up”… one word that protects the line.")
      },
      {
        id: "check", art: "xn_check", year: u("المراجعة", "The check"), mark: u("١٠", "10"), era: u("رقم بإيدك", "A figure by hand"),
        title: u("قبل التشغيل: خامة واحدة بالآلة الحاسبة", "Before the run: one material on a calculator"),
        story: [u("قبل ما يشغّل، مهندس التخطيط حسب PNL-55 بإيده من الملفات: ١٬١٠٠ من الخطة، ناقص ٣٨٠ في المخزن، ومفيش حاجة في الطريق، يعني ٧٢٠، والعبوة ١٠، يعني الطلب ٧٢٠. وكتب الرقم في ورقة. الأداة طلّعت نفس الرقم.",
          "Before running, the planning engineer worked out PNL-55 by hand from the files: 1,100 from the plan, minus 380 in stock, with nothing on order, so 720; with a pack of 10, the order is 720. He wrote it on a sheet of paper. The tool produced the same figure."),
        u("وشيت Check في الناتج بيقول: الخطة ١١٬١٥٠ جهاز، وسطور Explosion ‏١٣٢، و٢٩ خامة محتاجة طلب، وقيمة الطلب ٢٦٬٨٢٥٬٧٠٠ جنيه. أربع أرقام، كلهم قصاد مفتاح الإجابة. الرقم اللي حسبته بإيدك قبل التشغيل هو أقوى اختبار، لأنه مستقل عن الأداة.",
          "And the Check sheet in the output says: a plan of 11,150 TVs, 132 Explosion rows, 29 materials to order, and an order value of EGP 26,825,700. Four figures, all against the answer key. A figure you worked out by hand before the run is the strongest test, because it is independent of the tool.")],
        answer: u("احسب رقم واحد بإيدك قبل التشغيل، وقارنه بعده. لأن الرقم اللي اتحسب بطريقتين واتطابق مش صدفة.", "Work out one figure by hand before the run, and compare it after — a figure computed two ways that agrees isn't chance."),
        idea: u("رقم بإيدك… قبل رقم الأداة.", "Your figure… before the tool's.")
      },
      {
        id: "review", art: "xn_review", year: u("المراجعة", "The review"), mark: u("١١", "11"), era: u("قبل ما يتبعت", "Before it's sent"),
        title: u("٢٩ خامة للطلب… والشاشات الأول", "29 materials to order… panels first"),
        story: [u("الناتج: ٢٩ خامة محتاجة طلب، و٣ مش محتاجة. والشاشات لوحدها ١٨٬٧٥٣٬٠٠٠ جنيه، حوالي ٧٠٪ من الطلب كله، ومدة توريدها من ٣٠ لـ ٤٥ يوم. فزميلته في المشتريات بدأت بيها، وبعدها البوردات، وفي الآخر الكراتين والمسامير اللي بتوصل في أسبوع.",
          "The output: 29 materials to order, and 3 with nothing to order. Panels alone come to EGP 18,753,000, about 70% of the whole order, with a lead time of 30 to 45 days. So his colleague in purchasing started with them, then the boards, and last the cartons and screws, which arrive within a week."),
        u("والأداة ما بعتتش حاجة لحد. الطلب ملف للمراجعة: المشتريات بتشوفه، وبتعدّل لو فيه خصم على كمية أكبر أو مورّد متأخر، وبعدين بس بيتحول لأوامر شراء. وشيت Not_Planned فيه سطر واحد بيفكّر الكل: M113 لسه مستني الهندسة.",
          "And the tool sent nothing to anyone. The order is a file for review: purchasing looks at it, adjusts for a bulk discount or a late supplier, and only then turns it into purchase orders. And the Not_Planned sheet holds one line reminding everyone: M113 is still waiting on engineering.")],
        answer: u("الأداة بتجهّز الطلب، والإنسان بيبعته. لأن الطلب فلوس والتزام مع مورّد، والقرار ده مش بتاع أداة.", "The tool prepares the order; a person sends it — an order is money and a commitment to a supplier, and that decision isn't a tool's."),
        idea: u("الأداة بتحسب… والمشتريات بتقرر.", "The tool calculates… purchasing decides.")
      },
      {
        id: "cliff", art: "xn_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("ملفات أبريل", "April's files"),
        title: u("خمس أدوات شغالة… وأول أسبوع في أبريل", "Five tools running… and the first week of April"),
        story: [u("مهندس التخطيط بص على اللي اتبنى: خمس أدوات، من ملفات تحت بعض لحد طلب الخامات من الخطة. كل واحدة اتجرّبت على مشروع نتيجته معروفة، وليها سجل بيقول كل اللي حصل. الشغل اللي كان بياخد أيام بقى بياخد دقايق.",
          "The planning engineer looked at what had been built: five tools, from stacking files to a materials order from the plan. Each was tried on a project with a known result, and keeps a log of everything that happened. Work that used to take days now takes minutes."),
        u("وأول أسبوع في أبريل، تقارير الخطوط وصلت، وشغّل أداة الدرس ٣ عليها زي كل أسبوع. الشاشة السودا وقفت بسطر أحمر عند ملف ما كانش فيه أي مشكلة الشهر اللي فات. والسؤال اللي الدرس الجاي بيجاوبه: لما الأداة توقف أو تغلط… تعمل إيه؟",
          "And in the first week of April, the lines' reports arrived, and he ran lesson 3's tool on them as every week. The black window stopped with a red line at a file that had no problem last month. And the question the next lesson answers: when a tool stops or goes wrong… what do you do?")],
        answer: u("واجب الدرس: احسب PNL-55 بإيدك، وشغّل الأداة الخامسة على مشروع الدرس، وراجع Explosion والـ Check قصاد مفتاح الإجابة. لأن الأداة اللي بتراجعها خطوة خطوة هي اللي تقدر تعتمد عليها.", "This lesson's task: work out PNL-55 by hand, run tool five on the lesson's project, and check Explosion and Check against the answer key — a tool you check step by step is one you can rely on."),
        idea: u("الأدوات جاهزة… والملفات بتتغيّر.", "The tools are ready… and the files keep changing.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.needsStory]);
})(window.ACADEMY = window.ACADEMY || {});
