/* Example 1, part 1 — the story deck of lesson a1 (unit 3), on Unit3_Example_1_Production_Dashboard.
   The planning engineer carries every slide with one question: «إزاي ١٣ تقرير أسبوعي يبقوا شيت واحد بالأسماء؟».
   The data are clean on purpose, so the deck is the method itself: the request, the 13 files with the same columns,
   the two masters, one Prompt, stacking, the VLOOKUP for the model name, the same for the country name, why no #N/A
   shows, the Excel Table, the helper columns, the check against the answer key and the finished result, and the next
   step. Figures are the project's own.
   Drawings are the pt_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.tableStory = {
    id: "ptable", lesson: "a1",
    kicker: u("المثال الأول · الجزء الأول · الحكاية في ٨ دقايق", "Example 1 · part one · the story in 8 minutes"),
    title: u("١٣ تقرير أسبوعي في شيت واحد، ومعاه الأسماء", "13 weekly reports in one sheet, with the names"),
    lead: u("الأدوات الخمسة بتاعة الوحدة التانية شغالة. دلوقتي مدير المصنع عايز داشبورد للربع التالت كله جوّه إكسل. وأول خطوة شيت واحد كبير: مهندس التخطيط بيحط ١٣ تقرير أسبوعي تحت بعض، ويضيف عمودين بـ VLOOKUP: اسم الموديل واسم البلد.",
      "Unit 2's five tools are working. Now the factory manager wants a dashboard for the whole third quarter inside Excel. The first step is one big sheet: the planning engineer stacks 13 weekly reports and adds two columns with VLOOKUP: the model name and the country name."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي ١٣ تقرير أسبوعي يبقوا شيت واحد بالأسماء؟", "How do 13 weekly reports become one sheet with names?"),
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
        u("مهندس التخطيط عارف إن الداشبورد مش أول خطوة. أول خطوة شيت واحد كبير فيه كل الصفوف، لأن كل رسم وكل سلايسر هيقرا منه. والسؤال اللي ماشي معانا: إزاي ١٣ تقرير أسبوعي يبقوا شيت واحد بالأسماء؟",
          "The planning engineer knows the dashboard isn't the first step. The first step is one big sheet holding every row, because every chart and every slicer will read from it. The question we carry: how do 13 weekly reports become one sheet with names?")],
        answer: u("ابدأ أي داشبورد من الجدول اللي تحته، مش من الرسوم. لأن كل رقم في الداشبورد بيتحسب من الجدول ده.", "Start any dashboard from the table beneath it, not from the charts — every figure on the dashboard is calculated from that table."),
        idea: u("الداشبورد بيبدأ من الجدول.", "A dashboard starts from its table.")
      },
      {
        id: "files", art: "pt_files", year: u("الملفات", "The files"), mark: u("٠٢", "02"), era: u("١٣ ملف بنفس الشكل", "13 files, one shape"),
        title: u("١٣ ملف… كلهم بنفس السبع أعمدة", "13 files… all with the same seven columns"),
        story: [u("في فولدر Weekly_Reports ١٣ ملف: Week_01.xlsx لحد Week_13.xlsx، ملف لكل أسبوع في الربع. كل ملف فيه شيت واحد اسمه Production، والعناوين في الصف الأول: Date وWorkOrder وLineCode وModelCode وCountryCode وQty وValue.",
          "The Weekly_Reports folder holds 13 files: Week_01.xlsx to Week_13.xlsx, one per week of the quarter. Each file has one sheet named Production, with the headers on row 1: Date, WorkOrder, LineCode, ModelCode, CountryCode, Qty and Value."),
        u("مهندس التخطيط فتح ملفين وقارنهم: نفس الأعمدة بنفس الترتيب، ومفيش خانة فاضية، وكل أمر تشغيل WorkOrder رقم لوحده. البيانات نضيفة، فالشغل كله في الطريقة: تحت بعض، وبعدين الأسماء. وده اللي بيخلّي المثال ده أحسن بداية.",
          "The planning engineer opened two files and compared them: the same columns in the same order, no blank cell, and every WorkOrder a number of its own. The data are clean, so all the work is in the method: stack, then add the names. That's what makes this example the best place to start.")],
        answer: u("قبل أي أداة، افتح ملفين وقارن العناوين والترتيب. لأن الأداة اللي بتحط الملفات تحت بعض بتفترض إنهم بنفس الشكل.", "Before any tool, open two files and compare the headers and their order — a tool that stacks files assumes they share one shape."),
        idea: u("نفس الأعمدة… في كل ملف.", "The same columns… in every file.")
      },
      {
        id: "masters", art: "pt_masters", year: u("القاعدتين", "Two databases"), mark: u("٠٣", "03"), era: u("عمودين بس", "Two columns each"),
        title: u("Masters.xlsx: قاعدتين صغيرين، كل واحدة عمودين", "Masters.xlsx: two small databases, two columns each"),
        story: [u("التقارير فيها أكواد بس: ModelCode = M103، وCountryCode = SA. والمدير بيقرا «32-inch Smart TV» و«Saudi Arabia». الأسماء في Masters.xlsx: شيت Models فيه ModelCode وModelName (١٢ موديل)، وشيت Countries فيه CountryCode وCountryName (١٠ بلاد).",
          "The reports hold codes only: ModelCode = M103, CountryCode = SA. The manager reads “32-inch Smart TV” and “Saudi Arabia”. The names are in Masters.xlsx: a Models sheet with ModelCode and ModelName (12 models), and a Countries sheet with CountryCode and CountryName (10 countries)."),
        u("فاكر الأداة التانية في الوحدة اللي فاتت؟ نفس الفكرة: كل كود يلاقي اسمه في قاموس صغير. والفرق إن هنا الاسم بيتجاب بمعادلة VLOOKUP جوّه الشيت، فبيطلع عمودين جداد: ModelName وCountryName، جنب الأكواد مش بدالها.",
          "Remember the second tool in the last unit? The same idea: each code finds its name in a small dictionary. The difference is that here the name is fetched by a VLOOKUP formula inside the sheet, so two new columns appear: ModelName and CountryName, beside the codes, not instead of them.")],
        answer: u("سيب الكود في الجدول وضيف الاسم جنبه. لأن الكود هو اللي بيتربط بيه وبيتراجع، والاسم هو اللي بيتقري.", "Keep the code in the table and add the name beside it — the code is what you join and check by; the name is what people read."),
        idea: u("الكود للأداة… والاسم للمدير.", "The code is for the tool… the name for the manager.")
      },
      {
        id: "prompt", art: "pt_prompt", year: u("الطلب", "The Prompt"), mark: u("٠٤", "04"), era: u("خطوتين في أداة", "Two steps, one tool"),
        title: u("Prompt واحد: تحت بعض، وبعدين VLOOKUP", "One Prompt: stack, then VLOOKUP"),
        story: [u("Prompt_1.txt فيه كل الأسماء بالحرف: الفولدر، والملفات، والشيت Production، والعناوين السبعة، والشيتين في Masters، واسم الجدول tblProduction والأعمدة بالترتيب. وفي آخره نفس قواعد الأمان: اقرا بس، واكتب في Output، وسجّل، ووقّف لو ملف مختلف.",
          "Prompt_1.txt holds every name letter for letter: the folder, the files, the Production sheet, the seven headers, the two sheets in Masters, the table name tblProduction and its columns in order. At the end, the same safety rules: read only, write to Output, log, and stop if a file is different."),
        u("النموذج سأل سؤالين قبل الكود: «الأسماء أكتبها كقيم ولا كمعادلات VLOOKUP؟» و«الشهر يبقى تاريخ ولا نص زي 2026-07؟». مهندس التخطيط جاوب: «معادلات، علشان أي حد يدوس على الخانة ويشوف جت منين» و«نص، علشان الشهور تترتّب صح».",
          "The model asked two questions before the code: “Should I write the names as values or as VLOOKUP formulas?” and “Should the month be a date or text such as 2026-07?” The planning engineer answered: “Formulas, so anyone can click the cell and see where it came from” and “Text, so the months sort correctly.”")],
        answer: u("حط الخطوتين في Prompt واحد لو بيشتغلوا على نفس الملفات، بس اكتب كل خطوة لوحدها. لأن الأداة الواحدة أسهل في التشغيل، والخطوات المفصولة أسهل في المراجعة.", "Put both steps in one Prompt when they work on the same files, but write each step separately — one tool is easier to run, and separated steps are easier to check."),
        idea: u("أداة واحدة… وخطوات مفصولة.", "One tool… separate steps.")
      },
      {
        id: "stack", art: "pt_stack", year: u("تحت بعض", "Stacking"), mark: u("٠٥", "05"), era: u("شيت واحد كبير", "One big sheet"),
        title: u("١٣ ملف تحت بعض: ١٬٢٦٧ صف", "13 files stacked: 1,267 rows"),
        story: [u("الخطوة الأولى زي الأداة التالتة في الوحدة التانية بالظبط: الأداة بتفتح Week_01، وتنسخ صفوفه تحت العناوين في شيت Data، وبعدين Week_02 تحته، لحد Week_13. العناوين بتتكتب مرة واحدة فوق، مش ١٣ مرة. والنتيجة شيت واحد فيه ١٬٢٦٧ صف.",
          "The first step is exactly like the third tool in unit 2: the tool opens Week_01, copies its rows under the headers on the Data sheet, then Week_02 beneath it, up to Week_13. The headers are written once at the top, not 13 times. The result is one sheet of 1,267 rows."),
        u("ومع كل صف الأداة بتكتب SourceFile: اسم الملف اللي جه منه. ده عمود صغير بس مهم: لو حد سأل «الصف ده جه منين؟» الإجابة في نفس الصف. وفي السجل سطر لكل ملف بعدد صفوفه، علشان المجموع يتراجع في الآخر.",
          "With every row the tool writes SourceFile: the name of the file it came from. A small column, but an important one: if someone asks “where did this row come from?”, the answer is in the same row. The log holds a line per file with its row count, so the total can be checked at the end.")],
        answer: u("العناوين مرة واحدة فوق، وكل صف معاه اسم ملفه. لأن الجدول الكبير لازم يفضل جدول واحد بصف عناوين واحد، وكل رقم فيه يترجع لمصدره.", "Headers once at the top, and every row with its file name — the big table must stay one table with one header row, and every figure in it must trace back to its source."),
        idea: u("تحت بعض… وكل صف عارف جه منين.", "Stacked… and every row knows where it came from.")
      },
      {
        id: "vlookup", art: "pt_vlookup", year: u("VLOOKUP", "VLOOKUP"), mark: u("٠٦", "06"), era: u("اسم الموديل", "The model name"),
        title: u("VLOOKUP: الكود يدوّر على اسمه", "VLOOKUP: the code looks up its name"),
        story: [u("جنب عمود ModelCode الأداة بتضيف عمود ModelName، وفي كل خانة معادلة: ‎=VLOOKUP(D2, Models!A:B, 2, FALSE). يعني: خُد الكود اللي في D2، ودوّر عليه في أول عمود في شيت Models، ولما تلاقيه هات اللي في العمود التاني من نفس الصف.",
          "Beside the ModelCode column the tool adds a ModelName column, and every cell holds a formula: =VLOOKUP(D2, Models!A:B, 2, FALSE). That means: take the code in D2, look for it in the first column of the Models sheet, and when you find it, bring back what's in the second column of the same row."),
        u("وFALSE في الآخر معناها «المطابقة بالظبط»: M103 يلاقي M103 بس. والأداة بتنسخ شيت Models جوّه نفس الملف، علشان المعادلة تفضل شغالة لو الملف اتبعت لوحده. ولو اسم موديل اتعدّل في Models، يتعدّل في الـ ١٬٢٦٧ صف مرة واحدة.",
          "And FALSE at the end means “exact match”: M103 finds M103 only. The tool copies the Models sheet into the same workbook, so the formula keeps working when the file is sent on its own. And if a model name is changed in Models, it changes in all 1,267 rows at once.")],
        answer: u("استخدم VLOOKUP بالمطابقة بالظبط، والقاعدة جوّه نفس الملف. لأن المطابقة التقريبية بتجيب اسم غلط من غير ما تقولك، والرابط لملف برّه بيتكسر.", "Use VLOOKUP with an exact match, and keep the database inside the same workbook — an approximate match brings a wrong name without telling you, and a link to another file breaks."),
        idea: u("الكود يدوّر… والاسم ييجي لوحده.", "The code looks up… and the name arrives by itself.")
      },
      {
        id: "country", art: "pt_country", year: u("العمود التاني", "The second column"), mark: u("٠٧", "07"), era: u("اسم البلد", "The country name"),
        title: u("نفس المعادلة لاسم البلد", "The same formula for the country name"),
        story: [u("العمود التاني نفس الفكرة بالظبط: جنب CountryCode عمود CountryName، والمعادلة ‎=VLOOKUP(F2, Countries!A:B, 2, FALSE). SA تبقى «Saudi Arabia»، وEG تبقى «Egypt»، وKE تبقى «Kenya». معادلة واحدة اتعلمتها، واستخدمتها مرتين.",
          "The second column is exactly the same idea: beside CountryCode a CountryName column, with the formula =VLOOKUP(F2, Countries!A:B, 2, FALSE). SA becomes “Saudi Arabia”, EG becomes “Egypt”, and KE becomes “Kenya”. One formula learnt, used twice."),
        u("ودلوقتي الشيت فيه ١١ عمود: السبعة الأصليين، والاسمين، وSourceFile، وMonth. الجداول المحورية في الدرس الجاي هتجمّع بالاسم: «Kenya ١٬٥٠٩ جهاز» بدل «KE ١٬٥٠٩». الكود لسه موجود، بس اللي هيظهر للمدير هو الاسم.",
          "Now the sheet has 11 columns: the original seven, the two names, SourceFile and Month. Next lesson's pivot tables will group by name: “Kenya 1,509 sets” instead of “KE 1,509”. The code is still there, but what the manager sees is the name.")],
        answer: u("لما تتعلم معادلة، دوّر على كل مكان بتتكرر فيه نفس الفكرة. لأن نفس الطريقة في كل عمود بتخلّي الملف أسهل في القراية وفي المراجعة.", "Once you learn a formula, look for every place the same idea repeats — the same method in every column makes the workbook easier to read and to check."),
        idea: u("معادلة واحدة… عمودين.", "One formula… two columns.")
      },
      {
        id: "clean", art: "pt_clean", year: u("ولا #N/A", "No #N/A"), mark: u("٠٨", "08"), era: u("كل كود ليه اسم", "Every code has a name"),
        title: u("٢٬٥٣٤ معادلة… ولا واحدة #N/A", "2,534 formulas… not one #N/A"),
        story: [u("الـ VLOOKUP لو ما لقاش الكود بيكتب #N/A. مهندس التخطيط عمل فلتر على عمودين الأسماء ودوّر عليها: ولا خانة. ١٬٢٦٧ صف في عمودين يعني ٢٬٥٣٤ معادلة، وكلها لقت اسمها، لأن كل كود في التقارير موجود في Masters.",
          "When VLOOKUP doesn't find the code it writes #N/A. The planning engineer filtered the two name columns and looked for it: not one cell. 1,267 rows in two columns means 2,534 formulas, and every one found its name, because every code in the reports is in Masters."),
        u("والمراجعة دي جزء من الأداة نفسها: في آخر التشغيل بتعدّ خانات #N/A وتكتب العدد في السجل، ولازم يبقى صفر. ولو يوم من الأيام ظهر رقم، يبقى في كود جديد لسه ما اتضافش لـ Masters، فيتضاف هناك والمعادلة تلاقيه لوحدها.",
          "This check is part of the tool itself: at the end of the run it counts the #N/A cells and writes the count in the log, and it must be zero. And if one day a number shows, there's a new code not yet added to Masters, so it's added there and the formula finds it by itself.")],
        answer: u("عدّ خانات #N/A بعد كل VLOOKUP، والمطلوب صفر. لأن خانة #N/A واحدة معناها صف ناقص من أي جدول محوري بيجمّع بالاسم.", "Count the #N/A cells after every VLOOKUP, and the target is zero — a single #N/A means a row missing from any pivot table that groups by name."),
        idea: u("صفر #N/A… يعني كل صف ليه اسم.", "Zero #N/A… means every row has a name.")
      },
      {
        id: "table", art: "pt_table", year: u("الجدول", "The Table"), mark: u("٠٩", "09"), era: u("جدول باسم", "A named table"),
        title: u("جدول إكسل باسم، مش نطاق ملوّن", "An Excel Table with a name, not a coloured range"),
        story: [u("الأداة حوّلت شيت Data لجدول إكسل (Table) اسمه tblProduction. شكله زي أي جدول ملوّن، بس الفرق كبير: الجدول ليه اسم، وكل عمود ليه اسم، ولما صفوف تتضاف بيكبر لوحده، والمعادلات بتتنسخ للصفوف الجديدة لوحدها.",
          "The tool turned the Data sheet into an Excel Table named tblProduction. It looks like any coloured table, but the difference is big: the table has a name, every column has a name, and when rows are added it grows by itself, and the formulas copy down to the new rows on their own."),
        u("ليه ده مهم؟ لأن الجداول المحورية في الدرس الجاي هتقرا من «tblProduction»، مش من «A1 لحد K1268». الربع الجاي الأداة هتملا نفس الجدول بعدد صفوف مختلف، والداشبورد هيقرا كله من غير ما حد يغيّر نطاق.",
          "Why does it matter? Because next lesson's pivot tables will read from “tblProduction”, not from “A1 to K1268”. Next quarter the tool will fill the same table with a different number of rows, and the dashboard will read all of it without anyone changing a range.")],
        answer: u("اطلب الناتج كجدول إكسل باسم ثابت. لأن كل حاجة هتتبني عليه بتقراه بالاسم، فبيكبر ويصغر من غير ما حاجة تتكسر.", "Ask for the output as an Excel Table with a fixed name — everything built on it reads it by name, so it can grow and shrink without anything breaking."),
        idea: u("الاسم بيفضل… والصفوف بتتغيّر.", "The name stays… the rows change.")
      },
      {
        id: "helpers", art: "pt_helpers", year: u("الأعمدة", "Columns"), mark: u("١٠", "10"), era: u("عمودين مساعدين", "Two helper columns"),
        title: u("Month وSourceFile: عمودين علشان اللي جاي", "Month and SourceFile: two columns for what comes next"),
        story: [u("الأداة زوّدت عمودين ما كانوش في التقارير. Month نص بالشكل 2026-07: علشان الجدول المحوري يجمّع بالشهر من غير ما حد يكتب معادلة، والشهور تترتّب صح. وSourceFile: اسم الملف اللي جه منه كل صف، زي ما شفنا في الشريحة الخامسة.",
          "The tool added two columns that weren't in the reports. Month, text shaped 2026-07: so the pivot table groups by month without anyone writing a formula, and the months sort correctly. And SourceFile: the name of the file each row came from, as we saw on the fifth slide."),
        u("مهندس التخطيط فكّر فيهم من دلوقتي لأنه عارف المدير هيسأل إيه: «يوليو كام؟» عمود Month بيجاوب. «الأسبوع ٩ عمل كام؟» SourceFile بيوديك للملف في ثانية. الأعمدة المساعدة بتتطلب في الأداة الأولى، مش بعد ما الداشبورد يتعمل.",
          "The planning engineer thought of them now because he knows what the manager will ask: “How much in July?” The Month column answers. “What did week 9 make?” SourceFile takes you to the file in a second. Helper columns are asked for in the first tool, not after the dashboard is built.")],
        answer: u("فكّر في أسئلة الداشبورد وإنت بتبني الجدول، وضيف الأعمدة اللي هتجاوبها. لأن تعديل الجدول بعد ما الداشبورد اتبنى عليه بيكسر حاجات.", "Think of the dashboard's questions while building the table, and add the columns that will answer them — changing the table after the dashboard is built on it breaks things."),
        idea: u("الجدول بيتبني على أسئلة الداشبورد.", "The table is built for the dashboard's questions.")
      },
      {
        id: "check", art: "pt_check", year: u("المراجعة", "The check"), mark: u("١١", "11"), era: u("شيت Check", "The Check sheet"),
        title: u("شيت Check قصاد مفتاح الإجابة والنتيجة النهائية", "The Check sheet against the answer key and the finished result"),
        story: [u("آخر شيت عملته الأداة اسمه Check: سطر لكل ملف فيه عدد صفوفه وإجمالي Qty. وتحت الإجماليات: ١٣ ملف، و١٬٢٦٧ صف في tblProduction، و٢٩٬٣٨٤ جهاز، وصفر #N/A. ودلوقتي بس فتح Answer_Key.txt: نفس الأرقام.",
          "The last sheet the tool made is called Check: one line per file with its row count and its total Qty. Below, the totals: 13 files, 1,267 rows in tblProduction, 29,384 sets, and zero #N/A. Only now did he open Answer_Key.txt: the same figures."),
        u("وبعدين اختبار بإيده: فلتر tblProduction على يوليو، وجمع Qty: ٩٬٧٣٧، زي المفتاح بالظبط. وفتح Final_Result/Production_Q3_Final.xlsx جنب ملفه: شيت Data هناك بنفس الأعمدة ونفس المعادلات. الجدول جاهز يتبني عليه.",
          "Then a test by hand: he filtered tblProduction on July and summed Qty: 9,737, exactly as in the key. And he opened Final_Result/Production_Q3_Final.xlsx beside his own file: its Data sheet has the same columns and the same formulas. The table is ready to be built on.")],
        answer: u("قارن بمفتاح الإجابة، وبفلتر بإيدك، وبالنتيجة النهائية. لأن الجدول ده هيبقى أساس كل رقم في الداشبورد.", "Compare with the answer key, with a filter of your own, and with the finished result — this table will be the base of every figure on the dashboard."),
        idea: u("الأساس بيتراجع قبل ما يتبني عليه.", "A foundation is checked before it's built on.")
      },
      {
        id: "cliff", art: "pt_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("من جدول لداشبورد", "From table to dashboard"),
        title: u("الجدول جاهز… والمدير لسه عايز يدوس", "The table is ready… and the manager still wants to click"),
        story: [u("مهندس التخطيط بعت Production_Q3.xlsx للمدير. رد بعد ساعة: «جميل إن الأرقام كلها في مكان واحد وبالأسماء. بس أنا مش هقرا ١٬٢٦٧ صف. عايز أعرف في ثانية: أنهي شهر أعلى؟ أنهي خط؟ وبنصدّر قد إيه؟ وعايز أدوس على خط وأشوفه لوحده».",
          "The planning engineer sent Production_Q3.xlsx to the manager. He replied an hour later: “Good that all the figures are in one place, with names. But I won't read 1,267 rows. I want to know in a second: which month is highest? Which line? How much do we export? And I want to click a line and see it alone.”"),
        u("ودي بالظبط الخطوة اللي الجدول اتعمل علشانها: جداول محورية، وتقرير، ورسوم، وسلايسر، كلها بتقرا من tblProduction. والسؤال اللي الدرس الجاي بيجاوبه: الجدول جاهز… إزاي يبقى داشبورد بيتحدّث لوحده؟",
          "That's exactly the step the table was made for: pivot tables, a report, charts and slicers, all reading from tblProduction. And the question the next lesson answers: the table is ready… how does it become a dashboard that updates itself?")],
        answer: u("واجب الدرس: نزّل المثال الأول، وشغّل Prompt_1، وقارن الصفوف والأجهزة بالمفتاح، وفلتر شهر بإيدك. لأن الدرس الجاي كله مبني على الجدول ده.", "This lesson's task: download example 1, run Prompt_1, compare the rows and the sets with the key, and filter one month by hand — the whole next lesson is built on this table."),
        idea: u("الجدول قال الأرقام… والداشبورد هيخلّيها تتشاف.", "The table holds the figures… the dashboard will make them seen.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.tableStory]);
})(window.ACADEMY = window.ACADEMY || {});
