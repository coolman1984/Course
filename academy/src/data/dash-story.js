/* Example 1, part 2 — the story deck of lesson a2 (unit 3), on Unit3_Example_1_Production_Dashboard.
   The planning engineer carries every slide with one question: «إزاي الجدول يبقى داشبورد يتفهم في دقيقة ويتحدّث لوحده؟».
   The deck builds the dashboard from tblProduction: three questions become three pivot tables, the check that stopped
   before formatting, the report's four indicators, three charts, slicers connected to every table, cards read with
   GETPIVOTDATA, a slicer tested by hand, and Refresh All next quarter. Figures are the project's own.
   Drawings are the pd_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.dashStory = {
    id: "pdash", lesson: "a2",
    kicker: u("المثال الأول · الجزء التاني · الحكاية في ٨ دقايق", "Example 1 · part two · the story in 8 minutes"),
    title: u("من جدول لداشبورد بسلايسر جوّه إكسل", "From a table to a dashboard with slicers inside Excel"),
    lead: u("tblProduction جاهز ومراجَع. في الحكاية دي مهندس التخطيط بيحوّله لملف فيه جداول محورية، وتقرير، ورسوم، وداشبورد بسلايسر، وكل رقم فيه بيتراجع قبل ما يتلوّن.",
      "tblProduction is ready and checked. In this story the planning engineer turns it into a workbook of pivot tables, a report, charts and a dashboard with slicers, and every figure on it is checked before it's coloured."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي الجدول يبقى داشبورد يتفهم في دقيقة ويتحدّث لوحده؟", "How does the table become a dashboard understood in a minute that updates itself?"),
    finalQuestion: u("طب لو الأرقام مش في إكسل أصلًا… في PDF ووورد؟", "And what if the figures aren't in Excel at all… but in PDF and Word?"),
    note: u("الأرقام هي اللي بتطلع من ملفات المثال نفسه. شكل الرسوم والألوان ممكن يختلف حسب الكود اللي النموذج يكتبه.", "The figures are the ones the example's own files produce. The look of the charts and colours may differ with the code the model writes."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("الداشبورد، في شرائح", "The dashboard, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "three", art: "pd_three", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("تلات أسئلة", "Three questions"),
        title: u("المدير عنده تلات أسئلة… مش ١٬٣٠٢ صف", "The manager has three questions… not 1,302 rows"),
        story: [u("مهندس التخطيط كتب أسئلة المدير على ورقة قبل ما يفتح إكسل: «أنهي شهر وأنهي خط أعلى؟»، و«الإنتاج رايح لأنهي بلد؟»، و«أنهي موديلات بتشيل المصنع؟». تلات أسئلة، وكل سؤال هيبقى جدول محوري ورسم.",
          "The planning engineer wrote the manager's questions on paper before opening Excel: “Which month and which line are highest?”, “Which country does the output go to?”, and “Which models carry the factory?” Three questions, and each will become a pivot table and a chart."),
        u("فاكر درس لوحة المعلومات في الكتاب؟ اللوحة بتبدأ من القرار، مش من الأعمدة. والمدير مش محتاج كل حاجة؛ محتاج يجاوب التلات أسئلة دول في دقيقة. والسؤال اللي ماشي معانا: إزاي الجدول يبقى داشبورد يتفهم في دقيقة ويتحدّث لوحده؟",
          "Remember the book's dashboard lesson? A dashboard starts from the decision, not the columns. The manager doesn't need everything; he needs to answer those three questions in a minute. The question we carry: how does the table become a dashboard understood in a minute that updates itself?")],
        answer: u("اكتب أسئلة اللي هيقرا الداشبورد قبل أي رسم، وكل سؤال يبقى جزء واحد. لأن الداشبورد اللي بيجاوب كل حاجة ما بيجاوبش حاجة.", "Write the reader's questions before any chart, one part per question — a dashboard that answers everything answers nothing."),
        idea: u("تلات أسئلة… تلات أجزاء.", "Three questions… three parts.")
      },
      {
        id: "pivots", art: "pd_pivots", year: u("المحوري", "Pivots"), mark: u("٠٢", "02"), era: u("سحب وإفلات", "Drag and drop"),
        title: u("تلات جداول محورية من نفس الجدول", "Three pivot tables from the same table"),
        story: [u("الجدول المحوري بيلخّص جدول كبير من غير ولا معادلة: تحط Month في الصفوف، وLine في الأعمدة، ومجموع Qty في النص، فيطلع جدول ٣ شهور × ٦ خطوط في ثانية. ده PT_MonthLine. وPT_Country: البلد بالكمية والقيمة. وPT_Model: أعلى ١٠ موديلات.",
          "A pivot table summarises a big table with no formula: put Month in the rows, Line in the columns and the sum of Qty in the middle, and a 3-month × 6-line table appears in a second. That's PT_MonthLine. Then PT_Country: country by quantity and value. And PT_Model: the top 10 models."),
        u("التلاتة بيقروا من tblProduction بالاسم. وده اللي هيخلّي الداشبورد يتحدّث: الجدول المحوري ما بيحفظش الأرقام، بيحفظ الطريقة. ولما الجدول يتملي ببيانات ربع جديد، Refresh بيعيد الحساب بنفس الطريقة.",
          "All three read from tblProduction by name. That's what will make the dashboard update: a pivot table doesn't keep the figures, it keeps the method. When the table fills with a new quarter's data, Refresh recalculates the same way.")],
        answer: u("اطلب جدول محوري لكل سؤال، من نفس الجدول الأصلي. لأن الجداول اللي بتقرا من مصدر واحد عمرها ما تختلف مع بعض.", "Ask for one pivot table per question, from the same source table — tables reading from one source never disagree."),
        idea: u("الجدول المحوري بيحفظ الطريقة… مش الأرقام.", "A pivot table keeps the method… not the figures.")
      },
      {
        id: "prompt", art: "pd_prompt", year: u("الطلب", "The Prompt"), mark: u("٠٣", "03"), era: u("المراجعة الأول", "The check first"),
        title: u("Prompt_2 في نفس المحادثة: المراجعة قبل التنسيق", "Prompt_2 in the same chat: the check before formatting"),
        story: [u("مهندس التخطيط كمّل في نفس المحادثة علشان النموذج فاكر الجدول والأعمدة. Prompt_2.txt بيطلب ٤ شيتات بالترتيب: Pivots، وReport، وCharts، وDashboard. وفيه سطر هو أهم سطر: «قبل التنسيق: مجموع Qty في الجدول = الإجمالي في كل جدول محوري = الكارت».",
          "The planning engineer carried on in the same chat so the model remembers the table and its columns. Prompt_2.txt asks for 4 sheets in order: Pivots, Report, Charts and Dashboard. And it holds the most important line: “Before formatting: the sum of Qty in the table = the total in every pivot table = the card.”"),
        u("ليه المراجعة قبل التنسيق؟ لأن التنسيق بياخد أغلب الوقت: ألوان، وخطوط، وعرض أعمدة، ومكان كل رسم. ولو اكتشفت الغلط بعده، هتعيد كل ده. والأخطر إن الرقم الغلط وهو متنسّق شكله مقنع جدًا.",
          "Why the check before formatting? Because formatting takes most of the time: colours, fonts, column widths, where each chart goes. Discover the mistake after it and you redo all of that. Worse, a wrong figure that's nicely formatted looks very convincing.")],
        answer: u("اطلب المراجعة كخطوة في الأداة قبل التنسيق، مش كحاجة تعملها إنت بعدين. لأن الأداة بتراجع كل مرة، وإنت ممكن تنسى.", "Ask for the check as a step in the tool before formatting, not as something you do later — the tool checks every time; you may forget."),
        idea: u("الأرقام الأول… والألوان بعدين.", "Figures first… colours later.")
      },
      {
        id: "stop", art: "pd_stop", year: u("الوقفة", "The stop"), mark: u("٠٤", "04"), era: u("الكارت والجدول", "The card and the table"),
        title: u("الكارت قال ٢٩٬٤٨٨ والجدول ٣٠٬٠٤٤", "The card read 29,488 and the table 30,044"),
        story: [u("أول تشغيل وقف عند المراجعة: «Check failed: card 29,488, tblProduction 30,044, difference 556». مهندس التخطيط ما فتحش أي شيت يدوّر بإيده: الفرق رقم معروف. ٥٥٦ جهاز هو بالظبط سوق عُمان، OM، اللي لسه مش في Masters.",
          "The first run stopped at the check: “Check failed: card 29,488, tblProduction 30,044, difference 556”. The planning engineer didn't open any sheet to search by hand: the difference is a known number. 556 sets is exactly the Oman market, OM, still missing from Masters."),
        u("الكارت كان بيجمع البلاد اللي ليها اسم بس، فساب «(not in master)». رجع للنموذج: «الكارت يقرا الإجمالي الكلي من PT_Country، مش مجموع البلاد». سطر واحد اتغيّر، والتشغيل التاني عدّى. لو المراجعة ما كانتش موجودة، المدير كان هيشوف إنتاج ناقص ٥٥٦ جهاز.",
          "The card was adding up the named countries only, leaving out “(not in master)”. He went back to the model: “The card reads the grand total from PT_Country, not the sum of the countries.” One line changed, and the second run passed. Without the check, the manager would have seen output short by 556 sets.")],
        answer: u("لما المراجعة توقف، اقرا الفرق كرقم ودوّر على حاجة في البيانات مساوية له. لأن الفرق غالبًا بيساوي مجموعة صفوف معيّنة اتساب أو اتحسبت مرتين.", "When the check stops, read the difference as a number and look for something in the data equal to it — the difference usually equals a set of rows left out or counted twice."),
        idea: u("الفرق رقم… والرقم ليه صاحب.", "The difference is a number… and the number has an owner.")
      },
      {
        id: "report", art: "pd_report", year: u("التقرير", "The report"), mark: u("٠٥", "05"), era: u("٤ مؤشرات", "4 indicators"),
        title: u("شيت Report: أربع أرقام وجدول شهري", "The Report sheet: four figures and a monthly table"),
        story: [u("شيت Report معمول للطباعة وللإيميل: صفحة واحدة بالعرض. فوق: ٤ مؤشرات كبيرة: ٣٠٬٠٤٤ جهاز، و٢٨٤٫٦ مليون جنيه، ونسبة تصدير ٤٥٫٤٪، وأعلى موديل 32-inch Smart TV بـ ٤٬٠٢٦ جهاز. وتحت: جدول شهر بشهر: يوليو ٩٬٧٣٧، وأغسطس ٩٬٨٤٤، وسبتمبر ١٠٬٤٦٣.",
          "The Report sheet is made for printing and e-mail: one landscape page. On top, 4 big indicators: 30,044 sets, EGP 284.6 million, a 45.4% export share, and the top model, the 32-inch Smart TV with 4,026 sets. Below: a month-by-month table: July 9,737, August 9,844, September 10,463."),
        u("التنسيق اتعمل في الآخر، بعد المراجعة: فاصل آلاف، وخط واحد واضح، ولون واحد هادي للعناوين، وعرض أعمدة على قد الأرقام. مفيش ألوان كتير ولا ظلال. التقرير الكويس بيتقري في ١٠ ثواني، مش بيتأمّل.",
          "Formatting came last, after the check: thousands separators, one clear font, one calm colour for the headings, column widths that fit the figures. No riot of colours, no shadows. A good report is read in 10 seconds, not admired.")],
        answer: u("حط فوق التقرير أهم ٤ أرقام بس، وتحتهم التفاصيل. لأن اللي بيقرا بيقرر من أول سطرين، والباقي للي عايز يتأكد.", "Put only the 4 most important figures on top of the report, with the details beneath — readers decide from the first two lines; the rest is for whoever wants to verify."),
        idea: u("٤ أرقام فوق… والتفاصيل تحت.", "4 figures on top… details below.")
      },
      {
        id: "charts", art: "pd_charts", year: u("الرسوم", "Charts"), mark: u("٠٦", "06"), era: u("رسم لكل سؤال", "A chart per question"),
        title: u("تلات رسوم بتجاوب تلات أسئلة", "Three charts answer three questions"),
        story: [u("شيت Charts فيه تلات رسوم بس. أعمدة للشهور والخطوط: بتوري إن خط L01 أعلى خط في الربع بـ ٦٬٣١١ جهاز. وأشرطة للبلاد من الأكبر للأصغر: مصر فوق بـ ١٥٬٨٧٦. ودائرة مفرّغة: مصر، والتصدير، والمخزن.",
          "The Charts sheet holds just three charts. Columns for months and lines: they show L01 as the quarter's top line with 6,311 sets. Bars for countries, largest first: Egypt on top with 15,876. And a doughnut: Egypt, export, and stock."),
        u("زميل اقترح ١٠ رسوم «علشان الداشبورد يبان غني». مهندس التخطيط رجع للورقة: تلات أسئلة. كل رسم زيادة بيسحب العين من الرسم المهم. ونوع الرسم على قد السؤال: مقارنة بين حاجات كتير يبقى أشرطة، وأجزاء من كل يبقى دائرة.",
          "A colleague suggested 10 charts “so the dashboard looks rich”. The planning engineer went back to the paper: three questions. Every extra chart pulls the eye from the one that matters. And the chart type fits the question: comparing many things means bars; parts of a whole means a doughnut.")],
        answer: u("رسم واحد لكل سؤال، ونوعه على قد السؤال. لأن الرسم الزيادة مش معلومة زيادة، ده زحمة.", "One chart per question, its type fitting the question — an extra chart isn't extra information, it's clutter."),
        idea: u("رسوم أقل… فهم أسرع.", "Fewer charts… faster understanding.")
      },
      {
        id: "slicers", art: "pd_slicers", year: u("السلايسر", "Slicers"), mark: u("٠٧", "07"), era: u("متوصلين بالكل", "Connected to all"),
        title: u("تلات سلايسر… متوصلين بالتلات جداول كلهم", "Three slicers… connected to all three tables"),
        story: [u("في شيت Dashboard، فوق الرسوم، تلات صفوف زراير: الشهر، والخط، والبلد. ده السلايسر. تدوس على «سبتمبر»، فالجدول المحوري يتفلتر، والرسم اللي عليه يتغيّر. بس الحركة دي محتاجة حاجة الناس بتنساها كتير.",
          "On the Dashboard sheet, above the charts, sit three rows of buttons: month, line and country. That's the slicer. Click “September”, and the pivot table filters, and the chart on it changes. But this move needs something people often forget."),
        u("السلايسر بيتعمل على جدول محوري واحد. لو ما اتوصلش بالتانيين (Report Connections)، تدوس على سبتمبر فرسم الشهور يتغيّر ورسم البلاد يفضل للربع كله، والمدير يشوف رقمين متناقضين. علشان كده الـ Prompt قال: «متوصلين بالتلات جداول المحورية كلهم».",
          "A slicer is created on one pivot table. If it isn't connected to the others (Report Connections), clicking September changes the months chart while the countries chart stays on the whole quarter, and the manager sees two contradicting figures. That's why the Prompt said: “connected to all three pivot tables”.")],
        answer: u("كل سلايسر يتوصل بكل جدول محوري في الداشبورد. لأن الداشبورد اللي أجزاؤه بتتفلتر بشكل مختلف بيعرض أرقام متناقضة.", "Connect every slicer to every pivot table on the dashboard — a dashboard whose parts filter differently shows contradicting figures."),
        idea: u("دوسة واحدة… كل حاجة تتغيّر مع بعض.", "One click… everything changes together.")
      },
      {
        id: "cards", art: "pd_cards", year: u("الكروت", "Cards"), mark: u("٠٨", "08"), era: u("معادلات مش أرقام", "Formulas, not figures"),
        title: u("الكروت بتقرا من الجدول المحوري… مش مكتوبة بالإيد", "The cards read from the pivot table… they aren't typed"),
        story: [u("فوق الداشبورد ٤ كروت كبيرة: الأجهزة، والقيمة، ونسبة التصدير، وأعلى موديل. الأسهل إنك تكتب ٣٠٬٠٤٤ في الخانة وتلوّنها. بس الربع الجاي الرقم هيفضل ٣٠٬٠٤٤، والسلايسر مش هيأثر فيه.",
          "Across the top of the dashboard sit 4 big cards: sets, value, export share and the top model. The easy way is to type 30,044 into the cell and colour it. But next quarter the number would still say 30,044, and the slicers wouldn't touch it."),
        u("فالأداة كتبت في كل كارت معادلة GETPIVOTDATA: «هات الإجمالي من PT_Country». الكارت بقى جزء من الجدول المحوري: تدوس على L01، فالكارت يبقى ٦٬٣١١. والقاعدة اللي في الـ Prompt: ولا رقم يتكتب بالإيد.",
          "So the tool wrote a GETPIVOTDATA formula in every card: “take the total from PT_Country”. The card became part of the pivot table: click L01, and the card reads 6,311. And the rule in the Prompt: no figure is typed by hand.")],
        answer: u("كل رقم في الداشبورد يتقري من مصدره بمعادلة، ما يتكتبش. لأن الرقم المكتوب بالإيد صح النهارده بس.", "Every figure on the dashboard is read from its source by a formula, never typed — a typed figure is right only today."),
        idea: u("الرقم المكتوب بالإيد… صح النهارده بس.", "A typed figure… is right only today.")
      },
      {
        id: "test", art: "pd_test", year: u("التجربة", "The test"), mark: u("٠٩", "09"), era: u("سلايسر قصاد فلتر", "Slicer against filter"),
        title: u("دوس على L01… وقارن بفلتر بإيدك", "Click L01… and compare with a filter of your own"),
        story: [u("قبل ما يبعت، مهندس التخطيط عمل اختبار بسيط. داس على L01 في سلايسر الخط: الكارت ٦٬٣١١. وبعدين فتح tblProduction، وفلتر Line = L01 بإيده، وجمع Qty: ٦٬٣١١. نفس الرقم بطريقتين مختلفتين.",
          "Before sending, the planning engineer ran a simple test. He clicked L01 on the line slicer: the card read 6,311. Then he opened tblProduction, filtered Line = L01 by hand and summed Qty: 6,311. The same figure by two different routes."),
        u("وعمل نفس الحاجة مع بلد: Kenya في السلايسر = ١٬٩٠٧، وفي الفلتر ١٬٩٠٧. اختبارين في دقيقتين، بيثبتوا إن السلايسر متوصل صح، والكارت بيقرا صح، والجدول المحوري ما سابش صفوف. ودلوقتي بس الداشبورد جاهز يتبعت.",
          "He did the same with a country: Kenya on the slicer = 1,907, and in the filter 1,907. Two tests in two minutes, proving the slicer is connected correctly, the card reads correctly, and the pivot table left no rows out. Only now is the dashboard ready to send.")],
        answer: u("اختبر الداشبورد بطريقتين: السلايسر، وفلتر بإيدك على الجدول. لأن الرقمين لما يتفقوا من طريقين، الغلطة اللي فاتت المراجعة بتبقى بعيدة جدًا.", "Test the dashboard two ways: the slicer, and a filter of your own on the table — when two routes agree, a mistake that slipped past the check becomes very unlikely."),
        idea: u("طريقين… ونفس الرقم.", "Two routes… the same figure.")
      },
      {
        id: "refresh", art: "pd_refresh", year: u("التحديث", "Refresh"), mark: u("١٠", "10"), era: u("الربع الجاي", "Next quarter"),
        title: u("الربع الجاي: الأداة الأولى، وبعدين Refresh All", "Next quarter: the first tool, then Refresh All"),
        story: [u("مهندس التخطيط كتب في README: «الربع الجاي: حط التصديرات الجديدة في Weekly_Exports، وشغّل الأداة الأولى، وافتح الداشبورد، ودوس Data ثم Refresh All». خطوتين. الجداول المحورية والرسوم والسلايسر والكروت كلها بتتحدّث من tblProduction الجديد.",
          "The planning engineer wrote in the README: “Next quarter: put the new exports in Weekly_Exports, run the first tool, open the dashboard, and press Data, then Refresh All.” Two steps. The pivot tables, charts, slicers and cards all update from the new tblProduction."),
        u("ده الفرق بين داشبورد بيتبني مرة وداشبورد بيتعمل كل ربع من الأول. الطريقة محفوظة في الملف، والأرقام بس اللي بتتغيّر. وأي زميل يقدر يحدّثه وهو مش فاهم إزاي اتبنى.",
          "That's the difference between a dashboard built once and one rebuilt from scratch every quarter. The method is kept in the file; only the figures change. And any colleague can refresh it without understanding how it was built.")],
        answer: u("ابني الداشبورد بحيث تحديثه خطوتين يقدر يعملهم أي حد. لأن الداشبورد اللي محتاج صاحبه علشان يتحدّث بيقف أول ما صاحبه يغيب.", "Build the dashboard so updating it takes two steps anyone can do — a dashboard that needs its builder to update stops the day the builder is away."),
        idea: u("الطريقة محفوظة… والأرقام بتتجدد.", "The method is kept… the figures renew.")
      },
      {
        id: "send", art: "pd_send", year: u("التسليم", "Delivery"), mark: u("١١", "11"), era: u("للمدير", "To the manager"),
        title: u("المدير فتحه على الاجتماع… ودوس", "The manager opened it in the meeting… and clicked"),
        story: [u("في اجتماع الإنتاج، المدير فتح الملف على الشاشة. داس على سبتمبر: أعلى شهر، ١٠٬٤٦٣. داس على L06: أقل خط، ٣٬٣٨١ جهاز، فسأل مشرفه. وبص على الدائرة: ٤٥٫٤٪ تصدير. تلات أسئلة اتجاوبت في دقيقة، والنقاش راح للقرار.",
          "In the production meeting, the manager opened the file on screen. He clicked September: the highest month, 10,463. He clicked L06: the lowest line, 3,381 sets, and asked its supervisor. He looked at the doughnut: 45.4% export. Three questions answered in a minute, and the talk moved to the decision."),
        u("مفيش حد في الاجتماع سأل «الرقم ده جه منين؟»، لأن تحت الداشبورد جدول اتراجع، وتحت الجدول شيت Check، وتحته الملفات الأصلية زي ما هي. ولو حد سأل، SourceFile بيوصّله للملف في ثانية.",
          "No one in the meeting asked “where did this figure come from?”, because beneath the dashboard sits a checked table, beneath the table a Check sheet, and beneath that the original files untouched. And if anyone asks, SourceFile takes them to the file in a second.")],
        answer: u("قيس الداشبورد بسؤال واحد: النقاش راح للقرار ولا للأرقام؟ لأن الداشبورد الكويس بيخلّي الناس تثق في الرقم وتتكلم في الخطوة الجاية.", "Judge a dashboard by one question: did the talk move to the decision or stay on the figures? — a good dashboard makes people trust the figure and discuss the next step."),
        idea: u("الداشبورد الكويس بيخلّي الكلام عن القرار.", "A good dashboard turns the talk to the decision.")
      },
      {
        id: "cliff", art: "pd_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("المراجعة التجارية", "The commercial review"),
        title: u("المدير التجاري: «عايز زيه… بس أرقامي في PDF ووورد»", "The commercial director: “I want one like it… but my figures are in PDF and Word”"),
        story: [u("المدير التجاري كان في الاجتماع. بعده كلّم مهندس التخطيط: «عايز مراجعة الربع التجارية بنفس الطريقة، وفي الآخر عرض باوربوينت للإدارة». وبعتله الملفات: ٣ ملفات إكسل لمبيعات الفروع كل واحد بشكل، و٦ تقارير PDF من النظام، ومذكرتين وورد.",
          "The commercial director was in the meeting. Afterwards he called the planning engineer: “I want the quarter's commercial review the same way, and at the end a PowerPoint deck for management.” And he sent the files: 3 Excel files of branch sales each shaped differently, 6 PDF reports from the system, and two Word memos."),
        u("مهندس التخطيط فتح أول PDF: جدول مطبوع، بيكمّل في صفحة تانية. وفتح مذكرة: جدول جوّه نص. الأرقام موجودة، بس مش في إكسل. والسؤال اللي الدرس الجاي بيجاوبه: طب لو الأرقام مش في إكسل أصلًا… في PDF ووورد؟",
          "The planning engineer opened the first PDF: a printed table running onto a second page. He opened a memo: a table inside text. The figures are there, but not in Excel. And the question the next lesson answers: what if the figures aren't in Excel at all… but in PDF and Word?")],
        answer: u("واجب الدرس: شغّل Prompt_2 على الجدول بتاعك، وجرّب سلايسر قصاد فلتر، وغيّر رقم في نسخة وشوف الداشبورد يتحدّث. لأن الداشبورد اللي ما جربتهوش بيتحدّث، لسه ما اتسلّمش.", "This lesson's task: run Prompt_2 on your table, test a slicer against a filter, and change a figure in a copy to see the dashboard update — a dashboard you haven't seen update isn't delivered yet."),
        idea: u("نفس الطريقة… من ملفات مش إكسل.", "The same method… from files that aren't Excel.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.dashStory]);
})(window.ACADEMY = window.ACADEMY || {});
