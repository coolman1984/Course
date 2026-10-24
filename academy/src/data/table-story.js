/* Example 1, part 1 — the story deck of lesson a1 (unit 3), on Unit3_Example_1_Production_Dashboard.
   The planning engineer carries every slide with one question: «إزاي ١٣ تصدير من النظام يبقوا جدول واحد بالأسماء؟».
   The deck stacks the weekly exports and looks up two small masters: the title lines above the header, the masters,
   one Prompt for both tools, the unique order number, the export downloaded twice, the blank market, the codes with no
   name, the Excel Table, the helper columns, and the check against the answer key. Figures are the project's own.
   Drawings are the pt_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.tableStory = {
    id: "ptable", lesson: "a1",
    kicker: u("المثال الأول · الجزء الأول · الحكاية في ٨ دقايق", "Example 1 · part one · the story in 8 minutes"),
    title: u("١٣ تصدير من النظام في جدول واحد، ومعاه الأسماء", "13 exports from the system in one table, with the names"),
    lead: u("الأدوات الخمسة بتاعة الوحدة التانية شغالة. دلوقتي مدير المصنع عايز داشبورد للربع التالت كله جوّه إكسل. وأول خطوة جدول واحد نضيف: مهندس التخطيط بيجمّع ١٣ تصدير أسبوعي، ويضيف لهم الأسماء من قاعدتين صغيرين.",
      "Unit 2's five tools are working. Now the factory manager wants a dashboard for the whole third quarter inside Excel. The first step is one clean table: the planning engineer stacks 13 weekly exports and adds the names from two small databases."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي ١٣ تصدير من النظام يبقوا جدول واحد بالأسماء؟", "How do 13 system exports become one table with names?"),
    finalQuestion: u("الجدول جاهز… إزاي يبقى داشبورد بيتحدّث لوحده؟", "The table is ready… how does it become a dashboard that updates itself?"),
    note: u("الأرقام هي اللي بتطلع من ملفات المثال نفسه. نص الرسايل ممكن يختلف حسب الكود اللي النموذج يكتبه.", "The figures are the ones the example's own files produce. The wording of messages may differ with the code the model writes."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("المثال الأول، في شرائح", "Example 1, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "ask", art: "pt_ask", year: u("الطلب", "The request"), mark: u("٠١", "01"), era: u("داشبورد للربع", "A dashboard for the quarter"),
        title: u("مدير المصنع عايز يدوس على خط ويشوفه", "The factory manager wants to click a line and see it"),
        story: [u("فاكر آخر الوحدة التانية؟ خمس أدوات شغالة كل شهر. في أول أكتوبر مدير المصنع قال: «عايز الربع التالت كله قدامي في ملف إكسل واحد: أدوس على شهر أو خط أو بلد، والأرقام تتغيّر». يعني داشبورد بسلايسر جوّه إكسل نفسه.",
          "Remember the end of unit 2? Five tools running every month. Early in October the factory manager said: “I want the whole third quarter in front of me in one Excel file: I click a month, a line or a country, and the figures change.” That means a dashboard with slicers inside Excel itself."),
        u("مهندس التخطيط عارف إن الداشبورد مش أول خطوة. أول خطوة جدول واحد نضيف، لأن كل رسم وكل سلايسر هيقرا منه. والسؤال اللي ماشي معانا: إزاي ١٣ تصدير من النظام يبقوا جدول واحد بالأسماء؟",
          "The planning engineer knows the dashboard isn't the first step. The first step is one clean table, because every chart and every slicer will read from it. The question we carry: how do 13 system exports become one table with names?")],
        answer: u("ابدأ أي داشبورد من الجدول اللي تحته، مش من الرسوم. لأن الرسم الجميل على جدول غلط بيقنع الناس برقم غلط.", "Start any dashboard from the table beneath it, not from the charts — a beautiful chart on a wrong table convinces people of a wrong figure."),
        idea: u("الداشبورد بيبدأ من الجدول.", "A dashboard starts from its table.")
      },
      {
        id: "exports", art: "pt_exports", year: u("الملفات", "The files"), mark: u("٠٢", "02"), era: u("تصدير النظام", "System exports"),
        title: u("كل ملف فوقه سطرين عنوان… والعناوين في الصف الرابع", "Every file has two title lines… and the headers on row 4"),
        story: [u("مهندس التخطيط فتح Confirmations_W01.xlsx. أول سطر «Production Confirmations»، والتاني الفترة ووقت التصدير، والتالت فاضي، والعناوين في الصف الرابع: Posting Date وProd Order وLine وMaterial وMarket وConfirmed Qty وStd Value EGP.",
          "The planning engineer opened Confirmations_W01.xlsx. The first line reads “Production Confirmations”, the second the period and the export time, the third is blank, and the headers sit on row 4: Posting Date, Prod Order, Line, Material, Market, Confirmed Qty and Std Value EGP."),
        u("النظام بيطبع كده كل أسبوع، وممكن بكرة يزوّد سطر. لو الأداة افترضت إن العناوين في الصف الأول، هتقرا «Production Confirmations» كاسم عمود، وكل حاجة بعدها هتتلخبط. فالقاعدة: دوّر على الخلية «Prod Order» في أول ١٠ صفوف.",
          "The system prints it that way every week, and tomorrow it may add a line. If the tool assumes the headers are on row 1, it reads “Production Confirmations” as a column name, and everything after it goes wrong. So the rule: look for the cell “Prod Order” in the first 10 rows.")],
        answer: u("خلّي الأداة تلاقي صف العناوين باسم عمود معروف، مش برقم صف. لأن ملفات النظام بتزوّد وتشيل سطور فوق الجدول من غير ما حد يقولك.", "Have the tool find the header row by a known column name, not by a row number — system files add and drop lines above the table without telling anyone."),
        idea: u("العناوين بتتلاقي بالاسم… مش بالمكان.", "Headers are found by name… not by place.")
      },
      {
        id: "masters", art: "pt_masters", year: u("القاعدتين", "Two databases"), mark: u("٠٣", "03"), era: u("عمودين بس", "Two columns each"),
        title: u("Masters.xlsx: قاعدتين صغيرين، كل واحدة عمودين", "Masters.xlsx: two small databases, two columns each"),
        story: [u("التصدير فيه أكواد بس: Material = M103، وMarket = SA. والمدير بيقرا «32-inch Smart TV» و«Saudi Arabia». الأسماء موجودة في Masters.xlsx: شيت Models فيه ModelCode وModelName، وشيت Markets فيه MarketCode وCountry. ١٢ موديل و١٠ أسواق.",
          "The export holds codes only: Material = M103, Market = SA. The manager reads “32-inch Smart TV” and “Saudi Arabia”. The names live in Masters.xlsx: a Models sheet with ModelCode and ModelName, and a Markets sheet with MarketCode and Country. 12 models and 10 markets."),
        u("فاكر الأداة التانية في الوحدة اللي فاتت؟ نفس الفكرة: كل كود يلاقي اسمه من قاموس صغير. والفرق إن هنا الربط جوّه نفس الأداة اللي بتجمّع، فبيطلع عمودين جداد في الجدول الكبير: ModelName وCountry، جنب الأكواد مش بدالها.",
          "Remember the second tool in the last unit? The same idea: each code finds its name in a small dictionary. The difference is that here the join sits inside the same tool that stacks, so two new columns appear in the big table: ModelName and Country, beside the codes, not instead of them.")],
        answer: u("سيب الكود في الجدول وضيف الاسم جنبه. لأن الكود هو اللي بيتربط بيه وبيتراجع، والاسم هو اللي بيتقري.", "Keep the code in the table and add the name beside it — the code is what you join and check by; the name is what people read."),
        idea: u("الكود للأداة… والاسم للمدير.", "The code is for the tool… the name for the manager.")
      },
      {
        id: "prompt", art: "pt_prompt", year: u("الطلب", "The Prompt"), mark: u("٠٤", "04"), era: u("أداتين في واحدة", "Two tools in one"),
        title: u("Prompt واحد: تحت بعض، وبعدين بحث وربط", "One Prompt: stacking, then lookups"),
        story: [u("Prompt_1.txt فيه كل الأسماء بالحرف: الفولدر، والملفات، والشيت Export، والعناوين السبعة، والشيتين في Masters، واسم الجدول tblProduction والأعمدة الإحدى عشر بالترتيب. وفي آخره نفس قواعد الأمان: اقرا بس، واكتب في Output، وسجّل، ووقّف.",
          "Prompt_1.txt holds every name letter for letter: the folder, the files, the Export sheet, the seven headers, the two sheets in Masters, the table name tblProduction and its eleven columns in order. At the end, the same safety rules: read only, write to Output, log, and stop."),
        u("النموذج سأل سؤالين قبل الكود: «كود السوق لو بحروف صغيرة، هو نفسه؟» و«الملف المتنزّل مرتين، أسيبه كله ولا أقارن صف صف؟». مهندس التخطيط جاوب: «أيوه، نفسه بعد التنضيف» و«سيبه كله لو كل أوامره اتقرت». سؤالين، وقرارين بتوعه هو.",
          "The model asked two questions before the code: “If a market code is in lower case, is it the same?” and “The file downloaded twice: skip all of it, or compare row by row?” The planning engineer answered: “Yes, the same once tidied” and “Skip all of it if every order was already read.” Two questions, and two decisions that are his.")],
        answer: u("حط الخطوتين في Prompt واحد لو بيشتغلوا على نفس الملفات، بس اكتب كل خطوة وقواعدها لوحدها. لأن الأداة الواحدة أسهل في التشغيل، والقواعد المفصولة أسهل في التصليح.", "Put both steps in one Prompt when they work on the same files, but write each step and its rules separately — one tool is easier to run, and separated rules are easier to fix."),
        idea: u("أداة واحدة… وقواعد مفصولة.", "One tool… separated rules.")
      },
      {
        id: "key", art: "pt_key", year: u("المفتاح", "The key"), mark: u("٠٥", "05"), era: u("رقم فريد", "A unique number"),
        title: u("Prod Order: رقم ما يتكررش في الربع كله", "Prod Order: a number that never repeats in the quarter"),
        story: [u("كل دفعة إنتاج ليها أمر تشغيل برقم: 4102001، 4102002… والرقم ده ما بيتكررش في الربع كله. ده «المفتاح»: الحاجة اللي بتقول الصفين دول نفس الدفعة ولا دفعتين. في الوحدة التانية كنا بنقارن الصف كله؛ هنا عندنا رقم واحد يكفي.",
          "Every production batch has a work order with a number: 4102001, 4102002… and that number never repeats within the quarter. That's the “key”: what tells whether two rows are the same batch or two. In unit 2 we compared the whole row; here one number is enough."),
        u("القاعدة اللي في الـ Prompt: أي أمر اتقرا قبل كده ما يتضافش تاني، ويتكتب في السجل. ولو كل أوامر ملف اتقرت قبل كده، يبقى الملف كله اتنزّل مرتين، فيتساب كله برسالة واحدة. القاعدة دي هتمسك حاجة فعلًا في الشريحة الجاية.",
          "The rule in the Prompt: any order already read is not added again, and is logged. And if every order in a file was already read, the whole file was downloaded twice, so it's skipped with a single message. This rule will catch something real on the next slide.")],
        answer: u("دوّر في كل ملف على الرقم اللي ما يتكررش، واطلب إن الأداة تستخدمه. لأن المفتاح الواحد بيمسك المتكرر أسرع وأدق من مقارنة الصف كله.", "Look in every file for the number that never repeats, and ask the tool to use it — one key catches duplicates faster and more precisely than comparing whole rows."),
        idea: u("رقم واحد بيقول: ده اتحسب قبل كده.", "One number says: this was counted already.")
      },
      {
        id: "dup", art: "pt_dup", year: u("الفخ ١", "Trap 1"), mark: u("٠٦", "06"), era: u("ملف اتنزّل مرتين", "A file downloaded twice"),
        title: u("Confirmations_W06 (1).xlsx: نفس الأسبوع مرتين", "Confirmations_W06 (1).xlsx: the same week twice"),
        story: [u("في فولدر Weekly_Exports ١٤ ملف مش ١٣. زميل نزّل تصدير الأسبوع ٦ مرتين، والويندوز سمّى التاني «(1)». الاتنين متطابقين: ٩٦ صف، نفس الأوامر بالظبط. اللي بيجمّع بالإيد غالبًا مش هياخد باله، وإنتاج الأسبوع ٦ هيتحسب مرتين.",
          "The Weekly_Exports folder holds 14 files, not 13. A colleague downloaded week 6's export twice, and Windows named the second one “(1)”. Both are identical: 96 rows, exactly the same orders. Someone stacking by hand most likely won't notice, and week 6's output will count twice."),
        u("الأداة قرت W06 الأول، وبعدين لما فتحت النسخة التانية لقت كل الـ ٩٦ أمر اتقروا قبل كده. فكتبت في السجل: «Confirmations_W06 (1).xlsx: all 96 orders already read, file skipped»، وكمّلت. ولا رقم اتضاعف، والملف ما اتمسحش من الفولدر.",
          "The tool read W06 first; when it opened the second copy it found all 96 orders already read. So it logged: “Confirmations_W06 (1).xlsx: all 96 orders already read, file skipped”, and carried on. No figure doubled, and the file wasn't deleted from the folder.")],
        answer: u("الأداة تتخطّى الملف المتكرر وتسجّله، ما تمسحهوش. لأن مسح الملفات قرار ليك إنت، والأداة دورها القراية والتسجيل.", "The tool skips and logs a repeated file; it doesn't delete it — deleting files is your decision, and the tool's job is to read and log."),
        idea: u("اتقرا مرة… يبقى ما يتحسبش تاني.", "Read once… never counted again.")
      },
      {
        id: "blank", art: "pt_blank", year: u("الفخ ٢", "Trap 2"), mark: u("٠٧", "07"), era: u("سوق فاضي", "A blank market"),
        title: u("٢٣ صف من غير سوق… مش غلطة", "23 rows with no market… not a mistake"),
        story: [u("في ٢٣ صف خانة Market فاضية. أول إحساس: «البيانات ناقصة، امسحها». بس مهندس التخطيط سأل التخطيط الرئيسي، والإجابة: دي دفعات اتعملت للمخزن، ولسه ما اتحددش هتتباع فين. ٥١٨ جهاز حقيقي، اتعملوا وموجودين في المخزن.",
          "23 rows have a blank Market. The first instinct: “the data is incomplete, delete it.” But the planning engineer asked central planning, and the answer: these batches were built for stock, and where they'll be sold hasn't been decided. 518 real sets, built and sitting in the warehouse."),
        u("فاتكتبت قاعدة في README: Market فاضي يعني Country = «Unallocated (stock)». الأداة طبقتها، والصفوف دي بقت بلد لوحدها في الجدول. ولما المدير يشوف الداشبورد، هيلاقي ٥١٨ جهاز في المخزن، ودي معلومة بيدوّر عليها أصلًا.",
          "So a rule went into the README: a blank Market means Country = “Unallocated (stock)”. The tool applied it, and those rows became a country of their own in the table. When the manager sees the dashboard, he'll find 518 sets in stock, which is information he looks for anyway.")],
        answer: u("قبل ما تعتبر خانة فاضية غلطة، اسأل معناها إيه في الشغل، واكتب المعنى قاعدة. لأن الفراغ في بيانات النظام ساعات بيبقى معلومة.", "Before treating a blank cell as a mistake, ask what it means at work, and write the meaning as a rule — a blank in system data is sometimes information."),
        idea: u("الفاضي ممكن يبقى معلومة.", "A blank can be information.")
      },
      {
        id: "unmatched", art: "pt_unmatched", year: u("الفخ ٣", "Trap 3"), mark: u("٠٨", "08"), era: u("أكواد من غير اسم", "Codes with no name"),
        title: u("M114 وOM: كودين جداد مش في Masters", "M114 and OM: two new codes not in Masters"),
        story: [u("المصنع بدأ في أغسطس موديل جديد M114، وفي سبتمبر أول طلبيات لعُمان، كود السوق OM. والاتنين مش في Masters لسه. الأداة ما مسحتش صفوفهم وما خمّنتش أسماء: كتبت «(not in master)» في الخانة، والكمية والقيمة فضلوا زي ما هم.",
          "In August the factory started a new model, M114, and in September the first orders for Oman, market code OM. Neither is in Masters yet. The tool didn't drop their rows or guess names: it wrote “(not in master)” in the cell, and the quantity and value stayed as they were."),
        u("وفي شيت Unmatched سطرين: M114، ٤٦ صف، ٨٧٤ جهاز؛ وOM، ٢٧ صف، ٥٥٦ جهاز. مهندس التخطيط بعت الشيت للتخطيط الرئيسي علشان يحدّثوا Masters. والمرة الجاية الأسماء هتظهر لوحدها، من غير ما حد يلمس الأداة.",
          "And the Unmatched sheet holds two lines: M114, 46 rows, 874 sets; and OM, 27 rows, 556 sets. The planning engineer sent the sheet to central planning to update Masters. Next time the names will appear by themselves, without anyone touching the tool.")],
        answer: u("الكود اللي ما لقاش اسم يفضل في الجدول ويبان في شيت لوحده. لأن المسح بيخبّي الإنتاج، والتخمين بيكتب اسم غلط، والقائمة بتخلّي الإنسان يصلّح المصدر.", "A code with no name stays in the table and shows on a sheet of its own — deleting hides output, guessing writes a wrong name, and the list lets a person fix the source."),
        idea: u("اللي ما لقاش اسمه… يبان.", "Whatever finds no name… shows.")
      },
      {
        id: "table", art: "pt_table", year: u("الجدول", "The Table"), mark: u("٠٩", "09"), era: u("tblProduction", "tblProduction"),
        title: u("جدول إكسل باسم، مش نطاق ملوّن", "An Excel Table with a name, not a coloured range"),
        story: [u("الأداة كتبت الصفوف في شيت Data وحوّلتها لجدول إكسل (Table) اسمه tblProduction. شكله زي أي جدول ملوّن، بس الفرق كبير: الجدول ليه اسم، وكل عمود ليه اسم، ولما صفوف تتضاف بيكبر لوحده.",
          "The tool wrote the rows on the Data sheet and turned them into an Excel Table named tblProduction. It looks like any coloured table, but the difference is big: the table has a name, every column has a name, and when rows are added it grows by itself."),
        u("ليه ده مهم؟ لأن الجداول المحورية في الدرس الجاي هتقرا من «tblProduction»، مش من «A1 لحد K1303». الربع الجاي الأداة هتملا نفس الجدول بعدد صفوف مختلف، والداشبورد هيقرا كله من غير ما حد يغيّر نطاق.",
          "Why does it matter? Because next lesson's pivot tables will read from “tblProduction”, not from “A1 to K1303”. Next quarter the tool will fill the same table with a different number of rows, and the dashboard will read all of it without anyone changing a range.")],
        answer: u("اطلب الناتج كجدول إكسل باسم ثابت. لأن كل حاجة هتتبني عليه بتقراه بالاسم، فبيكبر ويصغر من غير ما حاجة تتكسر.", "Ask for the output as an Excel Table with a fixed name — everything built on it reads it by name, so it can grow and shrink without anything breaking."),
        idea: u("الاسم بيفضل… والصفوف بتتغيّر.", "The name stays… the rows change.")
      },
      {
        id: "helpers", art: "pt_helpers", year: u("الأعمدة", "Columns"), mark: u("١٠", "10"), era: u("عمودين مساعدين", "Two helper columns"),
        title: u("Month وSourceFile: عمودين علشان اللي جاي", "Month and SourceFile: two columns for what comes next"),
        story: [u("الأداة زوّدت عمودين ما كانوش في التصدير. Month نص بالشكل 2026-07: علشان الجدول المحوري يجمّع بالشهر من غير ما حد يكتب معادلة، والشهور تترتّب صح. وSourceFile: اسم الملف اللي جه منه كل صف، زي اللي عملناه في الوحدة التانية.",
          "The tool added two columns that weren't in the export. Month, text shaped 2026-07: so the pivot table groups by month without anyone writing a formula, and the months sort correctly. And SourceFile: the name of the file each row came from, as we did in unit 2."),
        u("مهندس التخطيط فكّر فيهم من دلوقتي لأنه عارف المدير هيسأل إيه: «يوليو كام؟» عمود Month بيجاوب. «ليه الأسبوع ٩ قليل؟» SourceFile بيوديك للملف في ثانية. الأعمدة المساعدة بتتطلب في الأداة الأولى، مش بعد ما الداشبورد يتعمل.",
          "The planning engineer thought of them now because he knows what the manager will ask: “How much in July?” The Month column answers. “Why is week 9 low?” SourceFile takes you to the file in a second. Helper columns are asked for in the first tool, not after the dashboard is built.")],
        answer: u("فكّر في أسئلة الداشبورد وإنت بتبني الجدول، وضيف الأعمدة اللي هتجاوبها. لأن تعديل الجدول بعد ما الداشبورد اتبنى عليه بيكسر حاجات.", "Think of the dashboard's questions while building the table, and add the columns that will answer them — changing the table after the dashboard is built on it breaks things."),
        idea: u("الجدول بيتبني على أسئلة الداشبورد.", "The table is built for the dashboard's questions.")
      },
      {
        id: "check", art: "pt_check", year: u("المراجعة", "The check"), mark: u("١١", "11"), era: u("شيت Check", "The Check sheet"),
        title: u("شيت Check قصاد مفتاح الإجابة", "The Check sheet against the answer key"),
        story: [u("آخر شيت عملته الأداة اسمه Check: سطر لكل ملف فيه الصفوف اللي اتقرت، واللي اتضافت، واللي اتسابت وليه. والإجماليات: ١٤ ملف، و١٬٣٩٨ صف اتقروا، و٩٦ اتسابوا من الملف المتكرر، و١٬٣٠٢ صف في tblProduction، و٣٠٬٠٤٤ جهاز.",
          "The last sheet the tool made is called Check: one line per file with the rows read, added, and skipped and why. And the totals: 14 files, 1,398 rows read, 96 skipped from the repeated file, 1,302 rows in tblProduction, and 30,044 sets."),
        u("ودلوقتي بس فتح Answer_Key.txt: نفس الأرقام. وبعدين اختبار بإيده: فلتر tblProduction على يوليو، وجمع Qty: ٩٬٧٣٧، زي المفتاح بالظبط. الجدول جاهز يتبني عليه، وهو عارف كل صف فيه جه منين.",
          "Only now did he open Answer_Key.txt: the same figures. Then a test by hand: he filtered tblProduction on July and summed Qty: 9,737, exactly as in the key. The table is ready to be built on, and he knows where every row in it came from.")],
        answer: u("اطلب من الأداة شيت مراجعة لكل ملف، وقارن بمفتاح الإجابة وبفلتر بإيدك. لأن الجدول ده هيبقى أساس كل رقم في الداشبورد.", "Ask the tool for a check sheet per file, and compare with the answer key and with a filter of your own — this table will be the base of every figure on the dashboard."),
        idea: u("الأساس بيتراجع قبل ما يتبني عليه.", "A foundation is checked before it's built on.")
      },
      {
        id: "cliff", art: "pt_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("من جدول لداشبورد", "From table to dashboard"),
        title: u("الجدول جاهز… والمدير لسه عايز يدوس", "The table is ready… and the manager still wants to click"),
        story: [u("مهندس التخطيط بعت Production_Q3.xlsx للمدير. رد بعد ساعة: «جميل إن الأرقام كلها في مكان واحد. بس أنا مش هقرا ١٬٣٠٢ صف. عايز أعرف في ثانية: أنهي شهر أعلى؟ أنهي خط؟ وبنصدّر قد إيه؟ وعايز أدوس على خط وأشوفه لوحده».",
          "The planning engineer sent Production_Q3.xlsx to the manager. He replied an hour later: “Good that all the figures are in one place. But I won't read 1,302 rows. I want to know in a second: which month is highest? Which line? How much do we export? And I want to click a line and see it alone.”"),
        u("ودي بالظبط الخطوة اللي الجدول اتعمل علشانها: جداول محورية، وتقرير، ورسوم، وسلايسر، كلها بتقرا من tblProduction. والسؤال اللي الدرس الجاي بيجاوبه: الجدول جاهز… إزاي يبقى داشبورد بيتحدّث لوحده؟",
          "That's exactly the step the table was made for: pivot tables, a report, charts and slicers, all reading from tblProduction. And the question the next lesson answers: the table is ready… how does it become a dashboard that updates itself?")],
        answer: u("واجب الدرس: نزّل المثال الأول، وشغّل Prompt_1، وقارن الخمس أرقام بالمفتاح، وفلتر شهر بإيدك. لأن الدرس الجاي كله مبني على الجدول ده.", "This lesson's task: download example 1, run Prompt_1, compare the five figures with the key, and filter one month by hand — the whole next lesson is built on this table."),
        idea: u("الجدول قال الأرقام… والداشبورد هيخلّيها تتشاف.", "The table holds the figures… the dashboard will make them seen.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.tableStory]);
})(window.ACADEMY = window.ACADEMY || {});
