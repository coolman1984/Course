/* Example 2, part 1 — the story deck of lesson a3 (unit 3), on Unit3_Example_2_Commercial_Review.
   The planning engineer carries every slide with one question: «إزاي أرقام في ٣ أشكال يبقوا ملف واحد أثق فيه؟».
   The files are clean on purpose, so the deck is the method: the inventory of 11 files and Masters, the workbook's design
   (one big Sales sheet and three small tables), the branch files stacked, PDFs opened in Word, export joining Sales,
   shipments in their own sheet, the same two VLOOKUP columns as example 1, the returns memo unpivoted, the targets memo,
   and the Sources sheet with shipped against sold. Figures are the project's own.
   Drawings are the pg_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.gatherStory = {
    id: "gather", lesson: "a3",
    kicker: u("المثال التاني · الجزء الأول · الحكاية في ٨ دقايق", "Example 2 · part one · the story in 8 minutes"),
    title: u("إكسل وPDF ووورد في ملف واحد", "Excel, PDF and Word into one workbook"),
    lead: u("المدير التجاري عايز مراجعة الربع، والأرقام متفرقة في ١١ ملف بـ ٣ أشكال. في الحكاية دي مهندس التخطيط بيبني أداة بتفتح كل ملف بالبرنامج بتاعه، وتحط كل جدول في مكانه، وتضيف نفس عمودين الـ VLOOKUP، وتراجع كل حاجة.",
      "The commercial director wants the quarter's review, and the figures are scattered across 11 files in 3 formats. In this story the planning engineer builds a tool that opens each file with its own program, puts every table in its place, adds the same two VLOOKUP columns, and checks everything."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي أرقام في ٣ أشكال يبقوا ملف واحد أثق فيه؟", "How do figures in 3 formats become one workbook I can trust?"),
    finalQuestion: u("الجدول جاهز… العرض يتعمل لوحده إزاي؟", "The table is ready… how does the deck build itself?"),
    note: u("الأرقام هي اللي بتطلع من ملفات المثال نفسه. طريقة وورد في تحويل الـ PDF ممكن تختلف شوية من نسخة أوفيس للتانية.", "The figures are the ones the example's own files produce. The way Word converts a PDF may differ a little between Office versions."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("التجميع، في شرائح", "Gathering, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "pile", art: "pg_pile", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("١١ ملف", "11 files"),
        title: u("١١ ملف، و٣ برامج، ويوم كامل نسخ ولصق", "11 files, 3 programs, and a whole day of copy and paste"),
        story: [u("كل ربع، حد في القسم التجاري بيصرف يوم كامل: يفتح ملفات الفروع ويجمع، ويفتح تقارير الـ PDF وينقل الأرقام بإيده، ويقرا مذكرة الجودة ويكتب المرتجعات. وفي الآخر ٨ شرائح للإدارة، ومحدش متأكد إن كل رقم فيها اتنقل صح.",
          "Every quarter someone in the commercial department spends a whole day: opening the branch files and adding up, opening the PDF reports and copying the figures by hand, reading the quality memo and typing the returns. At the end, 8 slides for management, and nobody sure every figure was carried over correctly."),
        u("المرة دي المدير التجاري طلب من مهندس التخطيط يعملها بنفس طريقة داشبورد الإنتاج. بس الفرق إن أغلب الأرقام مش في إكسل. والسؤال اللي ماشي معانا: إزاي أرقام في ٣ أشكال يبقوا ملف واحد أثق فيه؟",
          "This time the commercial director asked the planning engineer to do it the same way as the production dashboard. The difference is that most figures aren't in Excel. The question we carry: how do figures in 3 formats become one workbook I can trust?")],
        answer: u("أي شغل بيتنقل فيه رقم من ملف لملف بالإيد كل فترة مرشّح للأتمتة. لأن النقل اليدوي بيغلط في المكان اللي محدش بيراجعه.", "Any work that carries figures from file to file by hand every period is a candidate for automation — hand copying goes wrong where nobody checks."),
        idea: u("النقل بالإيد… أول حاجة تتأتمت.", "Copying by hand… the first thing to automate.")
      },
      {
        id: "inventory", art: "pg_inventory", year: u("الجرد", "Inventory"), mark: u("٠٢", "02"), era: u("إيه اللي قدامنا", "What's in front of us"),
        title: u("قبل أي كود: قائمة بكل ملف وشكله", "Before any code: a list of every file and its shape"),
        story: [u("مهندس التخطيط فتح كل ملف ودوّن: ٣ إكسل للفروع بنفس الأعمدة (Date وInvoiceNo وModelCode وQty وNetSales)، وملف Masters زي المثال الأول، و٣ PDF لمبيعات التصدير، و٣ PDF للشحنات، ومذكرة مرتجعات، ومذكرة مستهدف. ١١ ملف بيانات، وجنبهم Masters.",
          "The planning engineer opened every file and noted: 3 branch Excel files with the same columns (Date, InvoiceNo, ModelCode, Qty and NetSales), a Masters file as in example 1, 3 PDFs of export sales, 3 PDFs of shipments, a returns memo and a targets memo. 11 data files, and Masters beside them."),
        u("القائمة دي بقت أول جزء في README، والجزء اللي بيروح للنموذج. فاكر أول درس في الوحدة التانية؟ النموذج ما شافش ملفاتك، وكل اللي يعرفه هو اللي إنت بتوصفه. وكل ملف هنا فيه جدول واحد بعناوين واضحة، فالوصف قصير ودقيق.",
          "That list became the first part of the README, the part that goes to the model. Remember unit 2's first lesson? The model hasn't seen your files, and all it knows is what you describe. Every file here holds one table with clear headers, so the description is short and precise.")],
        answer: u("اعمل قائمة بكل ملف وأعمدته قبل ما تطلب أي أداة. لأن الأداة بتتبني على الوصف، مش على الملفات اللي ما شافتهاش.", "List every file and its columns before asking for any tool — the tool is built on the description, not on files it has never seen."),
        idea: u("الوصف الأول… والكود بعدين.", "The description first… the code later.")
      },
      {
        id: "design", art: "pg_design", year: u("التصميم", "The design"), mark: u("٠٣", "03"), era: u("ملف واحد، ٤ جداول", "One workbook, 4 tables"),
        title: u("Sales الكبير، وجنبه ٣ جداول صغيرة", "The big Sales sheet, and 3 small tables beside it"),
        story: [u("قبل الكود رسم شكل الملف اللي عايزه، Q3_Commercial_DB.xlsx: شيت Sales فيه كل فاتورة وكل سطر تصدير، صف لكل واحد: Month وChannel وCountryCode وCountryName وModelCode وModelName وQty وNetSales وSourceFile. ده الشيت الكبير، زي tblProduction في المثال الأول.",
          "Before the code he sketched the workbook he wanted, Q3_Commercial_DB.xlsx: a Sales sheet holding every invoice and every export line, one row each: Month, Channel, CountryCode, CountryName, ModelCode, ModelName, Qty, NetSales and SourceFile. That's the big sheet, like tblProduction in example 1."),
        u("وجنبه ٣ شيتات صغيرة، كل واحد بأعمدته: Shipments (الشحنات والنولون لكل قناة وشهر)، وReturns (المرتجعات لكل موديل وشهر)، وTargets (المستهدف لكل قناة). كل مصدر بيروح مكانه، والجداول المحورية في الدرس الجاي بتربطهم بالقناة والموديل.",
          "And beside it 3 small sheets, each with its own columns: Shipments (shipments and freight per channel and month), Returns (returns per model and month), and Targets (the target per channel). Every source goes to its place, and next lesson's pivot tables link them by channel and model.")],
        answer: u("ارسم شكل الملف النهائي قبل ما تطلب الأداة: اسم كل شيت وأعمدته بالترتيب. لأن النموذج بيبني اللي إنت وصفته بالظبط، والشكل الواضح بيسهّل كل خطوة بعده.", "Sketch the final workbook before asking for the tool: every sheet's name and its columns in order — the model builds exactly what you described, and a clear shape makes every later step easier."),
        idea: u("شيت كبير… وجداول صغيرة جنبه.", "One big sheet… small tables beside it.")
      },
      {
        id: "branches", art: "pg_branches", year: u("إكسل", "Excel"), mark: u("٠٤", "04"), era: u("الفروع التلاتة", "The three branches"),
        title: u("٣ ملفات فروع تحت بعض: ١٩٥ فاتورة", "3 branch files stacked: 195 invoices"),
        story: [u("دي نفس خطوة المثال الأول: ملفات بنفس الأعمدة تحت بعض. القاهرة ٧١ صف، والإسكندرية ٦١، والدلتا ٦٣: ١٩٥ صف في شيت Sales. والأداة بتضيف لكل صف ٣ حاجات مش في الملف: Channel من اسم الملف (Sales_Cairo يبقى Cairo)، وCountryCode = EG، والشهر من التاريخ.",
          "This is example 1's step again: files with the same columns, stacked. Cairo 71 rows, Alexandria 61, Delta 63: 195 rows in the Sales sheet. And the tool adds 3 things to each row that aren't in the file: Channel from the file name (Sales_Cairo becomes Cairo), CountryCode = EG, and the month from the date."),
        u("ليه CountryCode = EG؟ لأن الفروع التلاتة بتبيع جوّه مصر، والتصدير هيبقى في نفس الشيت ببلاده. لما كل الصفوف ليها نفس الأعمدة، جدول محوري واحد يقدر يقارن القاهرة بالتصدير، أو مصر بالسعودية، من غير ما حد يجمّع بإيده.",
          "Why CountryCode = EG? Because the three branches sell inside Egypt, and export will sit in the same sheet with its countries. When every row has the same columns, one pivot table can compare Cairo with export, or Egypt with Saudi Arabia, without anyone adding up by hand.")],
        answer: u("كل معلومة مش مكتوبة في الملف بس معروفة (الفرع، والبلد) اكتبها كقاعدة واطلب عمود ليها. لأن اسم الملف بيضيع لما الصفوف تتجمع، والعمود بيفضل.", "Any fact not written in the file but known (the branch, the country), write it as a rule and ask for a column for it — the file name is lost once rows are stacked; the column stays."),
        idea: u("اسم الملف… يبقى عمود.", "The file name… becomes a column.")
      },
      {
        id: "word", art: "pg_word", year: u("الـ PDF", "The PDF"), mark: u("٠٥", "05"), era: u("وورد بيفتحه", "Word opens it"),
        title: u("الـ PDF بيتفتح في وورد… من غير أي برنامج جديد", "The PDF opens in Word… with no new program"),
        story: [u("لابتوب الشغل عليه أوفيس، وممنوع تنزيل برامج. طب الـ PDF يتقري إزاي؟ وورد نفسه بيفتح ملفات الـ PDF: بيحوّل الصفحات لنص وجداول تقدر تعدّل فيها. والأداة بتعمل نفس الحاجة من غير ما الشاشة تظهر: تفتح الـ PDF في وورد، وتقرا الجدول.",
          "The work laptop has Office, and installing programs isn't allowed. So how is a PDF read? Word itself opens PDF files: it turns the pages into editable text and tables. The tool does the same without showing a window: it opens the PDF in Word and reads the table."),
        u("الـ PDF ده اتطبع من النظام، فهو نص حقيقي مش صورة، ووورد بيقراه كويس. وكل ملف صفحة واحدة فيها جدول واحد بعناوينه. أما الـ PDF الممسوح ضوئيًا، اللي هو صورة، فده محتاج طريقة تانية خالص.",
          "These PDFs were printed by the system, so they're real text, not images, and Word reads them well. Each file is one page holding one table with its headers. A scanned PDF, which is an image, needs a different method altogether.")],
        answer: u("قبل ما تطلب برنامج جديد، شوف البرنامج اللي عندك بيقدر يعمل إيه. لأن الأداة اللي بتشتغل بالأوفيس بس بتشتغل على أي جهاز في الشركة.", "Before asking for a new program, see what the one you have can do — a tool that runs on Office alone runs on any machine in the company."),
        idea: u("وورد بيقرا الـ PDF… والأداة بتقرا وورد.", "Word reads the PDF… the tool reads Word.")
      },
      {
        id: "export", art: "pg_export", year: u("التصدير", "Export"), mark: u("٠٦", "06"), era: u("٣ PDF", "3 PDFs"),
        title: u("التصدير بيدخل نفس شيت Sales: ٣٠٩ صف", "Export joins the same Sales sheet: 309 rows"),
        story: [u("كل PDF تصدير فيه جدول: CountryCode وModelCode وQty وNetSales. يوليو ٢٩ سطر، وأغسطس ٤١، وسبتمبر ٤٤: ١١٤ سطر. الأداة بتحطهم تحت صفوف الفروع في شيت Sales، وChannel = Export، والشهر من اسم الملف: Export_Sales_2026-08 يبقى 2026-08.",
          "Each export PDF holds a table: CountryCode, ModelCode, Qty and NetSales. July 29 lines, August 41, September 44: 114 lines. The tool puts them under the branch rows in the Sales sheet, with Channel = Export and the month from the file name: Export_Sales_2026-08 becomes 2026-08."),
        u("ودلوقتي شيت Sales فيه ٣٠٩ صف: ١٩٥ من الفروع و١١٤ من التصدير، و٢٥٬٢٧٦ جهاز. والأرقام في الـ PDF مكتوبة بفاصل آلاف زي 1,285,200، فالأداة بتشيل الفاصل وتكتبها أرقام، علشان الجمع يشتغل.",
          "Now the Sales sheet holds 309 rows: 195 from the branches and 114 from export, and 25,276 sets. The PDF prints numbers with thousands separators such as 1,285,200, so the tool removes the separator and writes them as numbers, so that adding up works.")],
        answer: u("حط كل المبيعات في شيت واحد، مهما كان مصدرها، بنفس الأعمدة. لأن المقارنة بين الفروع والتصدير بتبقى جدول محوري واحد بدل حسابات متفرقة.", "Put all sales in one sheet, whatever their source, with the same columns — comparing branches and export then takes one pivot table instead of scattered sums."),
        idea: u("مصادر مختلفة… شيت واحد.", "Different sources… one sheet.")
      },
      {
        id: "shipments", art: "pg_ship", year: u("الشحنات", "Shipments"), mark: u("٠٧", "07"), era: u("شيت لوحده", "A sheet of its own"),
        title: u("الشحنات: ١٣٥ شحنة في شيت Shipments", "Shipments: 135 shipments in the Shipments sheet"),
        story: [u("PDF الشحنات شكله مختلف: سطر لكل قناة في الشهر: Channel وShipments وUnits وFreightEGP. ٤ سطور في كل ملف، يعني ١٢ سطر في الربع. ومكانهم مش Sales، لأنهم مش فواتير: بيروحوا شيت Shipments، والشهر من اسم الملف.",
          "The shipments PDF looks different: one line per channel per month: Channel, Shipments, Units and FreightEGP. 4 lines in each file, so 12 lines in the quarter. They don't belong in Sales, because they aren't invoices: they go to the Shipments sheet, with the month from the file name."),
        u("المجموع: ١٣٥ شحنة، و٢٥٬٢٧٦ جهاز اتشحن، ونولون حوالي ١٫٥ مليون جنيه. ولاحظ إن ٢٥٬٢٧٦ هو نفس عدد الأجهزة اللي اتباعت. ده مش صدفة: كل جهاز اتباع اتشحن. وده هيبقى مراجعة قوية في آخر الدرس.",
          "The total: 135 shipments, 25,276 sets shipped, and about EGP 1.5 million of freight. Notice that 25,276 is the same number of sets as were sold. That's no coincidence: every set sold was shipped. And it will become a strong check at the end of the lesson.")],
        answer: u("كل نوع بيانات ليه شيت بأعمدته، وما تخلطش الفواتير بالشحنات. لأن الجدول اللي فيه نوعين صفوف بيتجمع غلط.", "Each kind of data gets its own sheet with its own columns; don't mix invoices with shipments — a table holding two kinds of row adds up wrong."),
        idea: u("كل نوع… في شيته.", "Each kind… in its own sheet.")
      },
      {
        id: "lookup", art: "pg_lookup", year: u("VLOOKUP", "VLOOKUP"), mark: u("٠٨", "08"), era: u("نفس العمودين", "The same two columns"),
        title: u("نفس عمودين الـ VLOOKUP بتوع المثال الأول", "The same two VLOOKUP columns as example 1"),
        story: [u("في شيت Sales، جنب CountryCode عمود CountryName، وجنب ModelCode عمود ModelName، بنفس المعادلة اللي اتعلمناها: ‎=VLOOKUP(C2, Countries!A:B, 2, FALSE). صف القاهرة يبقى «Egypt»، وصف التصدير KE يبقى «Kenya»، وM110 يبقى «65-inch 4K TV».",
          "In the Sales sheet, beside CountryCode a CountryName column, and beside ModelCode a ModelName column, with the formula we learnt: =VLOOKUP(C2, Countries!A:B, 2, FALSE). A Cairo row becomes “Egypt”, an export row KE becomes “Kenya”, and M110 becomes “65-inch 4K TV”."),
        u("٣٠٩ صف في عمودين: ٦١٨ معادلة، وصفر #N/A، لأن كل كود في الفروع والتصدير موجود في Masters. والأداة بتنسخ Models وCountries جوّه نفس الملف، زي المثال الأول. ونفس الحكاية في شيت Returns: ModelName بـ VLOOKUP.",
          "309 rows in two columns: 618 formulas, and zero #N/A, because every code in the branches and in export is in Masters. The tool copies Models and Countries into the same workbook, as in example 1. And the same in the Returns sheet: ModelName by VLOOKUP.")],
        answer: u("استخدم نفس الطريقة في كل مثال: نفس الأعمدة، ونفس المعادلة، ونفس المراجعة. لأن الطريقة اللي بتتكرر بتتحفظ، وأي زميل يفهمها من أول نظرة.", "Use the same method in every example: the same columns, the same formula, the same check — a method that repeats is remembered, and any colleague understands it at a glance."),
        idea: u("نفس المعادلة… في مثال تاني.", "The same formula… in another example.")
      },
      {
        id: "memos", art: "pg_memos", year: u("الوورد", "Word"), mark: u("٠٩", "09"), era: u("المرتجعات", "Returns"),
        title: u("مذكرة المرتجعات: الشهور أعمدة… تبقى صفوف", "The returns memo: months as columns… become rows"),
        story: [u("مذكرة الجودة فيها فقرة، وبعدين جدول: ModelCode وJul وAug وSep. سطر لكل موديل، والشهور جنب بعض. وده شكل مريح للعين، بس الجدول المحوري عايز صف لكل شهر: M110 في 2026-07 مثلًا. فالأداة بتفك الأعمدة لصفوف.",
          "The quality memo holds a paragraph, then a table: ModelCode, Jul, Aug and Sep. One line per model, with the months side by side. That shape is easy on the eye, but the pivot table wants one row per month: M110 in 2026-07, for example. So the tool turns the columns into rows."),
        u("١٢ موديل × ٣ شهور = ٣٦ صف في شيت Returns، والمجموع ٢٨١ جهاز. والأرقام في جدول وورد نص حتى لو شكلها أرقام، فالأداة بتحوّلها لأرقام. واسم الموديل بييجي بـ VLOOKUP من نفس شيت Models.",
          "12 models × 3 months = 36 rows in the Returns sheet, adding up to 281 sets. The numbers in a Word table are text even when they look like numbers, so the tool turns them into numbers. And the model name comes by VLOOKUP from the same Models sheet.")],
        answer: u("لو الشهور جاية أعمدة، اطلب إنها تتفك لصف لكل شهر. لأن الجدول المحوري بيجمّع الصفوف بسهولة، وبيتعب مع الأعمدة.", "If the months arrive as columns, ask for them to become one row per month — a pivot table adds up rows easily and struggles with columns."),
        idea: u("أعمدة للعين… وصفوف للجدول المحوري.", "Columns for the eye… rows for the pivot table.")
      },
      {
        id: "targets", art: "pg_targets", year: u("المستهدف", "Targets"), mark: u("١٠", "10"), era: u("بيتنقل زي ما هو", "Copied as it is"),
        title: u("مذكرة المستهدف: ٤ سطور، بالجنيه", "The targets memo: 4 lines, in EGP"),
        story: [u("مذكرة المستهدف أبسط ملف: جدول فيه Channel وTargetUnits وTargetSales، سطر لكل قناة: القاهرة ٧٥ مليون، والإسكندرية ٤٧، والدلتا ٦٣، والتصدير ١٤٤. المجموع ٣٢٩ مليون جنيه. والأداة بتنقله زي ما هو لشيت Targets.",
          "The targets memo is the simplest file: a table of Channel, TargetUnits and TargetSales, one line per channel: Cairo 75 million, Alexandria 47, Delta 63 and Export 144. A total of EGP 329 million. The tool copies it as it is into the Targets sheet."),
        u("الجدول ده صغير بس هو اللي هيدّي المراجعة معناها: من غير المستهدف، ٣٢٩٫٦ مليون جنيه مبيعات مجرد رقم. معاه، الرقم بقى «حققنا ١٠٠٫٢٪». واسم القناة في Targets هو هو اسمها في Sales، فالربط في الدرس الجاي مباشر.",
          "This table is small, but it gives the review its meaning: without the target, EGP 329.6 million of sales is just a number. With it, the number becomes “we reached 100.2%”. And the channel name in Targets is exactly its name in Sales, so next lesson's link is direct.")],
        answer: u("خلّي اسم القناة واحد في كل الجداول بالحرف. لأن الربط بين الجداول بيمشي على الاسم، وحرف مختلف بيفصل الجدولين.", "Keep the channel name identical in every table, letter for letter — tables link by that name, and one different letter separates them."),
        idea: u("نفس الاسم… في كل جدول.", "The same name… in every table.")
      },
      {
        id: "sources", art: "pg_sources", year: u("المراجعة", "The check"), mark: u("١١", "11"), era: u("شيت Sources", "The Sources sheet"),
        title: u("شيت Sources، ومراجعة الشحن قصاد البيع", "The Sources sheet, and shipped against sold"),
        story: [u("آخر خطوة: شيت Sources. سطر لكل ملف من الـ ١١: الصفوف اللي اتقرت وإجماليها. وتحتهم مراجعة: لكل شهر وقناة، الأجهزة اللي اتشحنت = الأجهزة اللي اتباعت. ١٢ مقارنة، والـ ١٢ OK. والإجماليات: ٣٠٩ صف مبيعات، و٢٥٬٢٧٦ جهاز، و١٣٥ شحنة، و٢٨١ مرتجع.",
          "The last step: the Sources sheet. One line for each of the 11 files: rows read and their total. Below them, a check: for each month and channel, sets shipped = sets sold. 12 comparisons, all 12 OK. And the totals: 309 sales rows, 25,276 sets, 135 shipments and 281 returns."),
        u("قارن بمفتاح الإجابة: نفس الأرقام. وبعدين اختبار: في نسخة من المشروع غيّر رقم واحد في PDF تصدير أغسطس، وشغّل. الأداة وقفت عند مراجعة الشحن وسمّت الشهر والقناة والفرق. الملف ده بقى الأساس اللي المراجعة كلها هتتبني عليه.",
          "He compared with the answer key: the same figures. Then a test: in a copy of the project he changed one figure in August's export PDF and ran it. The tool stopped at the shipping check and named the month, the channel and the difference. This workbook became the base the whole review will be built on.")],
        answer: u("دوّر على رقمين لازم يتساووا من مصدرين مختلفين، وخلّي الأداة تقارنهم. لأن مصدرين متفقين أقوى مراجعة ممكنة.", "Look for two figures that must be equal from two different sources, and have the tool compare them — two sources agreeing is the strongest check there is."),
        idea: u("مصدرين… ونفس الرقم.", "Two sources… one figure.")
      },
      {
        id: "cliff", art: "pg_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("الاجتماع", "The meeting"),
        title: u("الملف جاهز… والاجتماع يوم الأحد", "The workbook is ready… and the meeting is on Sunday"),
        story: [u("مهندس التخطيط بعت للمدير التجاري: «كل الأرقام في ملف واحد، ومراجعة على كل ملف». رد: «ممتاز. الاجتماع يوم الأحد، ومحتاج العرض: ٨ شرائح زي كل ربع، المبيعات قصاد المستهدف، والتصدير، والشحن، والمرتجعات».",
          "The planning engineer wrote to the commercial director: “All the figures in one workbook, checked against every file.” He replied: “Excellent. The meeting is on Sunday, and I need the deck: 8 slides as every quarter, sales against target, export, shipping and returns.”"),
        u("ودي كانت الخطوة اللي بتاخد يوم كل ربع: جداول، ورسوم، ونسخ في باوربوينت، ورقم ورقم. بس دلوقتي في ملف واحد مراجَع، ومنه كل حاجة ممكن تتبني. والسؤال اللي الدرس الجاي بيجاوبه: الجدول جاهز… العرض يتعمل لوحده إزاي؟",
          "That was the step that took a day every quarter: tables, charts, copying into PowerPoint, figure by figure. But now there's one checked workbook, and everything can be built from it. And the question the next lesson answers: the table is ready… how does the deck build itself?")],
        answer: u("واجب الدرس: شغّل Prompt_1 على المثال التاني، واقرا شيت Sources سطر سطر، وجرّب تغيّر رقم في نسخة PDF وشوف الأداة توقف. لأن الدرس الجاي كله بيقرا من الملف ده.", "This lesson's task: run Prompt_1 on example 2, read the Sources sheet line by line, and change a figure in a copy of a PDF to see the tool stop — the whole next lesson reads from this workbook."),
        idea: u("ملف مراجَع… والعرض بيتبني عليه.", "A checked workbook… the deck is built on it.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.gatherStory]);
})(window.ACADEMY = window.ACADEMY || {});
