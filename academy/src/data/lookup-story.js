/* Tool two on the kit — the story deck of lesson x4 (unit 2).
   The same sales supervisor carries every slide with one question: «إزاي كل كود يلاقي اسمه، واللي ما لقاش يبان؟».
   The deck runs the second tool of lesson f8 on the kit: master sheets as a dictionary, a code listed twice, the
   decision that belongs to purchasing, codes with a space or in lower case, normalising before joining, keeping every
   row, the "Unmatched" sheet, values rather than formulas, and the category total that still adds up.
   Each slide gives one rule with its reason. Figures are the kit's own. Drawings are the xj_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.lookupStory = {
    id: "lookup", lesson: "x4",
    kicker: u("الأداة التانية · الحكاية كاملة في ٨ دقايق", "Tool two · the whole story in 8 minutes"),
    title: u("كل كود يلاقي اسمه… واللي ما لقاش يبان", "Every code finds its name… and what doesn't, shows"),
    lead: u("الجدول المجمّع فيه ١٬٣٠٢ صف مراجَعين، بس فيه أكواد بس. في الحكاية دي المشرف بيبني الأداة التانية: تجيب اسم الفرع ومنطقته، واسم الصنف وفئته وسعره، من شيتات Masters.xlsx، وتقابل أربع مشاكل من العشرة.",
      "The stacked table holds 1,302 checked rows, but only codes. In this story the supervisor builds tool two: it brings the branch name and region and the product name, category and price from the Masters.xlsx sheets, and meets four of the ten problems."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي كل كود يلاقي اسمه، واللي ما لقاش يبان؟", "How does every code find its name, and what doesn't, show?"),
    finalQuestion: u("الجدول بقى كامل بالأسماء… طب المبيعات قصاد الأهداف؟", "The table now has every name… so what about sales against targets?"),
    note: u("الأرقام هي أرقام الحقيبة نفسها. نص الرسايل ممكن يختلف حسب الكود اللي النموذج يكتبه.", "The figures are the kit's own. The wording of messages may differ with the code the model writes."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("الأداة التانية، في شرائح", "Tool two, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "codes", art: "xj_codes", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("أكواد بس", "Codes only"),
        title: u("BR04 وP103… والمدير عايز «طنطا» و«تلاجات»", "BR04 and P103… and the manager wants “Tanta” and “refrigerators”"),
        story: [u("المدير طلب المبيعات حسب الفئة والمنطقة، والجدول فيه أكواد بس. بالإيد، المشرف كان بيعمل معادلة بحث في عمود جديد، ويسحبها لآخر صف، ويعمل ده خمس مرات: اسم الفرع، والمنطقة، واسم الصنف، والفئة، والسعر. ساعتين، والملف يتقل مع كل عمود.",
          "The manager asked for sales by category and region, and the table holds only codes. By hand, the supervisor would write a lookup formula in a new column, drag it to the last row, and do it five times: branch name, region, product name, category and price. Two hours, with the workbook slowing down at every column."),
        u("وأسوأ من الوقت: لما المعادلة ما تلاقيش كود، بتكتب «#N/A»، والجدول المحوري بيتجاهل الصف ده أو بيحطه في خانة فاضية، ومحدش بيلاحظ. والسؤال اللي ماشي معانا: إزاي كل كود يلاقي اسمه، واللي ما لقاش… يبان قدامنا؟",
          "Worse than the time: when the formula can't find a code it writes “#N/A”, and the pivot ignores that row or puts it in a blank slot, and nobody notices. The question we carry: how does every code find its name, and what doesn't… show in front of us?")],
        answer: u("حدد من الأول الأعمدة اللي محتاجها وجاية من أنهي شيت. لأن الربط من غير خريطة واضحة بيطلّع أعمدة زيادة أو ناقصة.", "Decide upfront which columns you need and which sheet each comes from — a join without a clear map yields extra or missing columns."),
        idea: u("الكود لوحده رقم… والاسم هو اللي بيتقري.", "A code alone is a number… the name is what gets read.")
      },
      {
        id: "dict", art: "xj_dict", year: u("الفكرة", "The idea"), mark: u("٠٢", "02"), era: u("القاموس", "The dictionary"),
        title: u("الشيت الصغير بيتحوّل لقاموس", "The small sheet becomes a dictionary"),
        story: [u("جوّه الأداة، شيت Products بيتحوّل لقاموس: كل كود قصاده اسمه وفئته وسعره. وشيت Branches كمان: كل كود فرع قصاده اسمه ومنطقته. ده بيحصل مرة واحدة في أول التشغيل، والقاموس بيفضل في الذاكرة.",
          "Inside the tool, the Products sheet becomes a dictionary: each code against its name, category and price. The Branches sheet too: each branch code against its name and region. This happens once at the start of the run, and the dictionary stays in memory."),
        u("وبعدين كل صف من الـ ١٬٣٠٢ بيدوّر على كوده في القاموس مرة واحدة، ويكتب القيم اللي لقاها. ده نفس منطق البحث والربط في إكسل بالظبط، بس من غير ولا معادلة، وعلى كل الصفوف في ثواني.",
          "Then each of the 1,302 rows looks its code up in the dictionary once and writes the values it found. It's exactly the logic of an Excel lookup, but without a single formula, and on every row in seconds.")],
        answer: u("اطلب الربط من قاموس يتبني مرة واحدة. لأنه أسرع بكتير، وبيكشف التكرار في الشيت الصغير وقت ما بيتبني.", "Ask for the join from a dictionary built once — it's far faster, and it exposes duplicates in the small sheet while being built."),
        idea: u("القاموس بيتبني مرة… والبحث فيه في لحظة.", "The dictionary is built once… a lookup takes an instant.")
      },
      {
        id: "twice", art: "xj_twice", year: u("الفخ ٨", "Trap 8"), mark: u("٠٣", "03"), era: u("كود مرتين", "A code twice"),
        title: u("P108 متسجّل مرتين… بسعرين", "P108 listed twice… with two prices"),
        story: [u("أول تشغيل وقف بعد ثانية واحدة: «Products: الكود P108 موجود مرتين بسعرين مختلفين، 11200 و11900». الأداة كانت بتبني القاموس، ولقت نفس الكود جاي تاني. والقاعدة اللي في الـ Prompt كانت واضحة: لو كود مكرر، وقّف واكتب القيمتين.",
          "The first run stopped after one second: “Products: code P108 appears twice with different prices, 11200 and 11900.” The tool was building the dictionary and found the same code coming again. The rule in the Prompt was clear: on a repeated code, stop and write both values."),
        u("معادلة البحث في إكسل كانت هتعمل إيه؟ هتاخد أول واحد وتسكت. ولو أول واحد غلط، كل مبيعات البوتاجاز هتتحسب بسعر غلط، والفرق هيبان في هامش الربح بعد شهور. الوقفة دي وفّرت مشكلة ما كانش حد هيعرف يلاقي أصلها.",
          "What would an Excel lookup have done? Taken the first and stayed silent. And if the first were wrong, every gas-cooker sale would be priced wrongly, with the gap surfacing in the margin months later. This stop saved a problem whose origin nobody would have found.")],
        answer: u("أي كود مكرر في الشيت الصغير يوقّف الأداة. لأن الاختيار بين قيمتين قرار، والأداة اللي بتختار لوحدها بتخبّي القرار ده.", "Any repeated code in the small sheet stops the tool — choosing between two values is a decision, and a tool that chooses alone hides it."),
        idea: u("قيمتين لكود واحد = سؤال، مش اختيار.", "Two values for one code = a question, not a choice.")
      },
      {
        id: "ask", art: "xj_ask", year: u("القرار", "The decision"), mark: u("٠٤", "04"), era: u("اسأل صاحب البيانات", "Ask the data's owner"),
        title: u("مين يعرف السعر الصح؟ مش الأداة، ومش النموذج", "Who knows the right price? Not the tool, not the model"),
        story: [u("المشرف ما سألش النموذج «أنهي سعر صح؟»، لأن النموذج ما يعرفش. كلّم قسم المشتريات، والرد جه في رسالة: «11200 هو سعر السنة دي من أول يناير. السطر التاني قديم ونسينا نمسحه».",
          "The supervisor didn't ask the model “which price is right?”, because the model doesn't know. He called purchasing, and the answer came in a message: “11200 is this year's price since January. The other line is old and we forgot to delete it.”"),
        u("فمسح السطر القديم من نسخته من Masters.xlsx، مش من الأصل، وكتب ملاحظة في بطاقة الأداة: «P108: السعر 11200 بتأكيد المشتريات». وبعت للمشتريات يصلّحوا الملف الأصلي عندهم. القرار اتاخد عند صاحبه، والأداة رجعت تشتغل.",
          "So he deleted the old line from his copy of Masters.xlsx, not the original, and noted on the tool card: “P108: price 11200, confirmed by purchasing.” He also asked purchasing to fix their original file. The decision was taken by its owner, and the tool ran again.")],
        answer: u("لما الأداة توقف عند قيمة مش واضحة، اسأل صاحب البيانات، مش النموذج. لأن النموذج بيخمّن، وصاحب البيانات بيعرف.", "When the tool stops at an unclear value, ask the data's owner, not the model — the model guesses; the owner knows."),
        idea: u("الأداة بتسأل… وصاحب البيانات بيجاوب.", "The tool asks… the data's owner answers.")
      },
      {
        id: "space", art: "xj_space", year: u("الفخ ٦", "Trap 6"), mark: u("٠٥", "05"), era: u("مسافة زيادة", "A stray space"),
        title: u("«BR04 »: طنطا بقت فرعين", "“BR04 ”: Tanta became two branches"),
        story: [u("في نسخة تجريبية من الأداة من غير تظبيط، الجدول المحوري طلّع سبع فروع مش ستة. السابع كان «BR04 »، بمسافة زيادة في الآخر، من ملف Week_05. المسافة مش باينة بالعين، بس عند الكمبيوتر «BR04 » و«BR04» كودين مختلفين.",
          "In a trial version of the tool without normalising, the pivot showed seven branches instead of six. The seventh was “BR04 ”, with a stray space at the end, from Week_05. The space is invisible to the eye, but to a computer “BR04 ” and “BR04” are two different codes."),
        u("والنتيجة: ٩ صفوف من مبيعات طنطا ما لقتش اسمها، وطنطا ظهرت أقل من حقيقتها. حد في الفرع كتب الكود بإيده بدل ما يختاره من قايمة. الغلطة صغيرة، وبتحصل كل شهر في شركات كتير.",
          "The result: 9 rows of Tanta's sales didn't find their name, and Tanta looked smaller than it was. Someone at the branch typed the code by hand instead of picking it from a list. A small slip, and it happens every month in many companies.")],
        answer: u("قبل أي ربط، شيل المسافات من أول وآخر كل كود. لأن المسافة مش باينة، والكمبيوتر بيشوفها حرف.", "Before any join, trim spaces from both ends of every code — the space is invisible, and the computer sees it as a character."),
        idea: u("مسافة واحدة… فرع زيادة.", "One space… one extra branch.")
      },
      {
        id: "case", art: "xj_case", year: u("الفخ ٦", "Trap 6"), mark: u("٠٦", "06"), era: u("حروف صغيرة", "Lower case"),
        title: u("«br03»: سموحة خسرت ١٧ صف", "“br03”: Smouha lost 17 rows"),
        story: [u("وفي Week_06، فرع سموحة اتكتب «br03» بحروف صغيرة في ١٧ صف. القاموس فيه «BR03». بعض البرامج بتعتبرهم واحد، وبعضها لأ، وحسب الطريقة اللي النموذج كتب بيها الكود، ممكن الـ ١٧ صف يدخلوا أو يختفوا.",
          "And in Week_06, the Smouha branch was written “br03” in lower case on 17 rows. The dictionary holds “BR03”. Some programs treat them as one and some don't, and depending on how the model wrote the code, those 17 rows may come in or vanish."),
        u("المشرف ما حبّش يسيبها للصدفة. القاعدة لازم تبقى مكتوبة في الـ Prompt: «حوّل كل الأكواد لحروف كبيرة قبل الربط». كده النتيجة واحدة في أي نسخة، وعلى أي نموذج، وأي شهر.",
          "The supervisor didn't want to leave it to chance. The rule has to be written in the Prompt: “convert every code to upper case before joining”. Then the result is the same in any version, on any model, in any month.")],
        answer: u("اكتب قاعدة توحيد الحروف صريحة في الـ Prompt. لأن اللي مش مكتوب بيتساب لاختيار النموذج، واختياره ممكن يتغيّر.", "Write the case rule explicitly in the Prompt — what isn't written is left to the model's choice, and that choice can change."),
        idea: u("اللي مش مكتوب… صدفة.", "What isn't written… is chance.")
      },
      {
        id: "norm", art: "xj_norm", year: u("التظبيط", "Normalising"), mark: u("٠٧", "07"), era: u("ظبّط قبل ما تربط", "Normalise before joining"),
        title: u("ظبّط الأكواد الأول… وسجّل كام واحد اتظبط", "Normalise the codes first… and log how many changed"),
        story: [u("الأداة دلوقتي بتعمل خطوة قبل الربط: كل كود فرع وكود صنف بيتشال منه المسافات ويتحوّل لحروف كبيرة. «BR04 » يبقى BR04، و«br03» يبقى BR03. والأصل في الجدول ما بيتغيّرش؛ التظبيط بيحصل في عمود الربط بس.",
          "The tool now takes a step before joining: every branch and product code is trimmed and converted to upper case. “BR04 ” becomes BR04, and “br03” becomes BR03. The original in the table doesn't change; the normalising happens in the join column only."),
        u("والأهم إن السجل بيقول: «اتظبط ٢٦ كود: ٩ مسافات، و١٧ حروف صغيرة». الرقم ده مهم: لو الشهر الجاي بقى ٥٠٠، يبقى فيه حاجة اتغيّرت في طريقة الإدخال في فرع، ومحتاج حد يسأل.",
          "Most importantly, the log says: “26 codes normalised: 9 spaces, 17 lower case.” That figure matters: if next month it's 500, something has changed in how a branch enters data, and someone needs to ask.")],
        answer: u("كل تظبيط الأداة بتعمله، تكتب عدده في السجل. لأن العدد اللي بيكبر فجأة هو أول إشارة إن فيه مشكلة في المصدر.", "Every correction the tool makes is counted in the log — a count that suddenly grows is the first sign of a problem at the source."),
        idea: u("التظبيط بيصلّح… والعدد بينبّه.", "Normalising corrects… the count alerts.")
      },
      {
        id: "keep", art: "xj_keep", year: u("القاعدة", "The rule"), mark: u("٠٨", "08"), era: u("ما تمسحش ولا صف", "Drop no row"),
        title: u("الصف اللي ما لقاش اسمه… يفضل في الجدول", "A row that didn't find its name… stays in the table"),
        story: [u("فيه طريقتين للربط. الأولى بتسيب في الجدول الصفوف اللي لقت مقابل بس، والباقي يختفي. والتانية بتسيب كل الصفوف، واللي ما لقاش مقابل يفضل بخانات فاضية. الطريقة الأولى أسهل في الكتابة، ونماذج كتير بتختارها لو ما قلتلهاش.",
          "There are two ways to join. The first keeps only rows that found a match, and the rest vanish. The second keeps every row, and those without a match stay with blank cells. The first is easier to write, and many models pick it unless told otherwise."),
        u("المشرف كتب في الـ Prompt: «ما تمسحش ولا صف». والدليل البسيط: عدد الصفوف قبل الربط ١٬٣٠٢، وبعده لازم يبقى ١٬٣٠٢، والإجمالي ٢٨٬٤٢٨٬١٥٠ قبل وبعد. لو أي رقم نقص، يبقى الربط مسح حاجة.",
          "The supervisor wrote in the Prompt: “drop no row”. The simple proof: the row count before the join is 1,302, and after it must still be 1,302, with a total of 28,428,150 before and after. If either shrinks, the join dropped something.")],
        answer: u("قارن عدد الصفوف والإجمالي قبل الربط وبعده. لأن الربط اللي بيمسح صفوف بيعمل كده من غير ولا رسالة.", "Compare the row count and total before and after the join — a join that drops rows does so without a message."),
        idea: u("قبل الربط = بعد الربط… وإلا فيه حاجة ضاعت.", "Before the join = after the join… or something got lost.")
      },
      {
        id: "unmatched", art: "xj_unmatched", year: u("الفخ ٧", "Trap 7"), mark: u("٠٩", "09"), era: u("ما اتربطش", "Unmatched"),
        title: u("شيت «ما اتربطش»: صنف جديد بـ ٢٩٢٬٤٠٠ جنيه", "The “Unmatched” sheet: a new product worth EGP 292,400"),
        story: [u("التشغيل التاني خلص، وفي شيت «ما اتربطش» سطر واحد: الكود P113، في ٢٠ صف، بقيمة ٢٩٢٬٤٠٠ جنيه. صنف جديد، سخان مياه، الفروع بدأت تبيعه من أول مارس، وقايمة الأصناف لسه ما اتحدّثتش.",
          "The second run finished, and the “Unmatched” sheet held one line: code P113, on 20 rows, worth EGP 292,400. A new product — a water heater the branches started selling in March — and the product list hadn't been updated yet."),
        u("لو الربط كان مسح الصفوف دي، المبيعات كانت هتنقص ٢٩٢ ألف جنيه، ومحدش هيعرف. ولو كانت معادلة، كانت هتكتب «#N/A» في ٢٠ صف وسط ١٬٣٠٢. الشيت ده حط المشكلة في سطر واحد، باسمها، وقيمتها، وعدد مرات ظهورها.",
          "Had the join dropped these rows, sales would have fallen by 292 thousand pounds, unknown to anyone. Had it been a formula, it would have written “#N/A” on 20 rows among 1,302. This sheet put the problem on one line, with its name, its value and how often it appears.")],
        answer: u("اطلب شيت لكل اللي ما اتربطش، بعدده وقيمته. لأن قيمة اللي ما اتربطش هي اللي بتقولك المشكلة كبيرة ولا صغيرة.", "Ask for a sheet of everything unmatched, with its count and value — the unmatched value tells you whether the problem is big or small."),
        idea: u("اللي ما اتربطش أهم من اللي اتربط.", "What didn't match matters more than what did.")
      },
      {
        id: "values", art: "xj_values", year: u("الناتج", "The output"), mark: u("١٠", "10"), era: u("قيم مش معادلات", "Values, not formulas"),
        title: u("الأداة بتكتب القيم… مش معادلات بحث", "The tool writes values… not lookup formulas"),
        story: [u("الجدول الجديد Enriched_Q1.xlsx فيه في كل صف اسم الفرع والمنطقة واسم الصنف والفئة والسعر، مكتوبين كقيم. مفيش ولا معادلة. الملف بيتفتح في ثانية، ويتبعت بالإيميل، ومش هيتغيّر لو حد عدّل شيت الأصناف بكرة.",
          "The new table, Enriched_Q1.xlsx, holds in every row the branch name and region and the product name, category and price, written as values. Not one formula. The workbook opens in a second, travels by email, and won't change if someone edits the products sheet tomorrow."),
        u("وده مهم للمراجعة: الرقم اللي في التقرير النهارده هو نفس الرقم اللي هتلاقيه لو فتحت الملف بعد شهر. ولو عايز الأسماء الجديدة، تشغّل الأداة تاني على القايمة الجديدة، والسجل يقول اتغيّر إيه.",
          "That matters for review: the figure in today's report is the same one you'll find if you open the workbook a month from now. If you want the new names, you run the tool again on the new list, and the log says what changed.")],
        answer: u("خلّي الأداة تكتب القيم في الناتج، مش معادلات. لأن الناتج اللي بيتغيّر لوحده لما ملف تاني يتغيّر ما ينفعش يتراجع.", "Have the tool write values into the output, not formulas — an output that changes by itself when another file changes can't be reviewed."),
        idea: u("القيمة ثابتة… والمعادلة بتتحرك.", "A value stays put… a formula moves.")
      },
      {
        id: "category", art: "xj_category", year: u("المقارنة", "The check"), mark: u("١١", "11"), era: u("حسب الفئة", "By category"),
        title: u("المبيعات حسب الفئة: الإجمالي لسه ٢٨٬٤٢٨٬١٥٠", "Sales by category: the total is still 28,428,150"),
        story: [u("آخر شيت في الناتج ByCategory: التلاجات أعلى فئة بـ ٩٬٣٦٤٬٥٠٠ جنيه، وبعدها التكييفات، والغسالات، وأجهزة المطبخ، والأجهزة الصغيرة. وفي سطر لوحده تحتهم: «من غير فئة» بـ ٢٩٢٬٤٠٠، وده الصنف الجديد.",
          "The last sheet of the output, ByCategory: refrigeration is the top category at EGP 9,364,500, then air conditioning, washers, kitchen and small appliances. On a line of its own beneath them: “no category” at 292,400 — the new product."),
        u("المشرف جمع السطور بالآلة الحاسبة: ٢٨٬٤٢٨٬١٥٠، نفس إجمالي الأداة الأولى بالظبط، ونفس مفتاح الإجابة. السطر الفاضي ما اتخبّاش ولا اتوزّع على الفئات. وبعت لقسم المشتريات يضيفوا P113 للقايمة، علشان الشهر الجاي يلاقي فئته.",
          "The supervisor added the lines on a calculator: 28,428,150, exactly tool one's total and the answer key. The blank line wasn't hidden or spread over the categories. And he asked purchasing to add P113 to the list, so next month it finds its category.")],
        answer: u("أي تقسيم للمبيعات لازم إجماليه يساوي الإجمالي الكلي، والفرق يبان في سطر لوحده. لأن الرقم اللي اتوزّع بالغلط أصعب يتلاقي من الرقم اللي ضاع.", "Any breakdown of sales must total the grand total, with any gap on a line of its own — a figure misallocated is harder to find than one lost."),
        idea: u("الأجزاء لازم تجمع للكل… والفرق يبان.", "The parts must add up to the whole… and the gap must show.")
      },
      {
        id: "cliff", art: "xj_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("قصاد الأهداف", "Against targets"),
        title: u("الجدول بقى غني… والمدير سأل عن الأهداف", "The table is rich now… and the manager asked about targets"),
        story: [u("المدير فتح الجدول وعمل فلتر على المنطقة، وابتسم: «كده أقدر أشوف الدلتا لوحدها». وبعدين سأل السؤال اللي بيسأله كل شهر: «طب كل فرع حقق كام في المية من هدفه؟ ومين الأول ومين الأخير؟».",
          "The manager opened the table, filtered by region, and smiled: “Now I can see the Delta on its own.” Then he asked the question he asks every month: “So what percentage of its target did each branch reach? Who's first and who's last?”"),
        u("الأهداف في ملف تالت: Targets_2026_Q1.xlsx، هدف لكل فرع في كل شهر. وفاكر الفخ التاسع؟ فيه فرع مالوش هدف لشهر مارس. والسؤال اللي الدرس الجاي بيجاوبه: إزاي التقرير يطلع مظبوط ومراجَع، من غير ما تلمسه بإيدك؟",
          "The targets live in a third workbook, Targets_2026_Q1.xlsx: a target per branch per month. And remember the ninth trap? One branch has no target for March. And the question the next lesson answers: how does the report come out right and checked, without your hand touching it?")],
        answer: u("واجب الدرس: شغّل الأداة التانية، وافتح «ما اتربطش» قبل أي حاجة، وجمّع ByCategory بالآلة الحاسبة. لأن الإجمالي اللي بيتطابق هو الدليل إن مفيش حاجة ضاعت في الربط.", "This lesson's task: run tool two, open “Unmatched” before anything, and add up ByCategory on a calculator — a matching total is the proof nothing was lost in the join."),
        idea: u("الأسماء وصلت… فاضل الأهداف.", "The names arrived… the targets remain.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.lookupStory]);
})(window.ACADEMY = window.ACADEMY || {});
