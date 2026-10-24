/* Example 2, part 1 — the story deck of lesson a3 (unit 3), on Unit3_Example_2_Commercial_Review.
   The planning engineer carries every slide with one question: «إزاي أرقام في ٣ أشكال يبقوا جدول بيانات واحد أثق فيه؟».
   The deck gathers the quarter's commercial figures: the inventory of 11 files and Masters, the long table, three Excel shapes, a
   June invoice and credit notes, PDFs opened in Word, tables running onto page 2, the bracket that stopped the tool, the
   Word memos (models by name, targets in thousands), and the Sources sheet. Figures are the project's own.
   Drawings are the pg_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.gatherStory = {
    id: "gather", lesson: "a3",
    kicker: u("المثال التاني · الجزء الأول · الحكاية في ٨ دقايق", "Example 2 · part one · the story in 8 minutes"),
    title: u("إكسل وPDF ووورد في جدول بيانات واحد", "Excel, PDF and Word into one data table"),
    lead: u("المدير التجاري عايز مراجعة الربع، والأرقام متفرقة في ١١ ملف بـ ٣ أشكال. في الحكاية دي مهندس التخطيط بيبني أداة بتفتح كل ملف بالبرنامج بتاعه، وتحط كل رقم في صف، وتراجع كل ملف على إجماليه.",
      "The commercial director wants the quarter's review, and the figures are scattered across 11 files in 3 formats. In this story the planning engineer builds a tool that opens each file with its own program, puts every figure in a row, and checks each file against its total."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي أرقام في ٣ أشكال يبقوا جدول بيانات واحد أثق فيه؟", "How do figures in 3 formats become one data table I can trust?"),
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
        u("المرة دي المدير التجاري طلب من مهندس التخطيط يعملها بنفس طريقة داشبورد الإنتاج. بس الفرق إن أغلب الأرقام مش في إكسل. والسؤال اللي ماشي معانا: إزاي أرقام في ٣ أشكال يبقوا جدول بيانات واحد أثق فيه؟",
          "This time the commercial director asked the planning engineer to do it the same way as the production dashboard. The difference is that most figures aren't in Excel. The question we carry: how do figures in 3 formats become one data table I can trust?")],
        answer: u("أي شغل بيتنقل فيه رقم من ملف لملف بالإيد كل فترة مرشّح للأتمتة. لأن النقل اليدوي بيغلط في المكان اللي محدش بيراجعه.", "Any work that carries figures from file to file by hand every period is a candidate for automation — hand copying goes wrong where nobody checks."),
        idea: u("كل نقل بالإيد… فرصة لغلطة.", "Every hand copy… a chance for a mistake.")
      },
      {
        id: "inventory", art: "pg_inventory", year: u("الجرد", "Inventory"), mark: u("٠٢", "02"), era: u("إيه اللي قدامنا", "What's in front of us"),
        title: u("قبل أي كود: جدول بكل ملف وشكله", "Before any code: a list of every file and its shape"),
        story: [u("مهندس التخطيط فتح كل ملف ودوّن: ٣ إكسل (القاهرة سطر لكل فاتورة، والإسكندرية الشهور أعمدة، والدلتا شيت لكل شهر)، وملف Masters، و٣ PDF لمبيعات التصدير، و٣ PDF للشحنات، ومذكرة مرتجعات، ومذكرة مستهدف. ١٢ ملف بالـ Masters، كل واحد بشكل.",
          "The planning engineer opened every file and noted: 3 Excel files (Cairo one row per invoice, Alexandria with months as columns, Delta one sheet per month), the Masters file, 3 PDFs of export sales, 3 PDFs of shipments, a returns memo and a targets memo. 12 files with Masters, each its own shape."),
        u("الجدول ده بقى أول جزء في README، والجزء اللي بيروح للنموذج. فاكر أول درس في الوحدة التانية؟ النموذج ما شافش ملفاتك، وكل اللي يعرفه هو اللي إنت بتوصفه. ولما الملفات ٣ أشكال، الوصف بيبقى نص الشغل.",
          "That list became the first part of the README, the part that goes to the model. Remember unit 2's first lesson? The model hasn't seen your files, and all it knows is what you describe. When the files come in 3 formats, the description is half the work.")],
        answer: u("اعمل جرد بكل ملف وشكله قبل ما تطلب أي أداة. لأن الشكل اللي ما اتوصفش هو المكان اللي الأداة هتغلط فيه.", "Make an inventory of every file and its shape before asking for any tool — the shape you didn't describe is where the tool will go wrong."),
        idea: u("اعرف كل ملف… قبل ما تجمّعهم.", "Know every file… before gathering them.")
      },
      {
        id: "long", art: "pg_long", year: u("الشكل", "The shape"), mark: u("٠٣", "03"), era: u("الجدول الطويل", "The long table"),
        title: u("صف لكل رقم: Measure وValue", "One row per figure: Measure and Value"),
        story: [u("لو عمل عمود لكل حاجة (مبيعات، وكمية، وشحن، ونولون، ومرتجعات، ومستهدف) لكل شهر، الجدول هيبقى ٢٠ عمود، ومصدر جديد يعني أعمدة جديدة. فاختار شكل تاني: «الجدول الطويل». صف لكل رقم: الشهر، والقناة، والبلد، والموديل، ونوع الرقم (Measure)، وقيمته (Value)، وجه منين.",
          "A column for everything (sales, quantity, shipping, freight, returns, target) for every month would make 20 columns, and a new source would mean new columns. So he chose another shape: the “long table”. One row per figure: the month, the channel, the country, the model, the kind of figure (Measure), its value (Value), and where it came from."),
        u("٧ أنواع أرقام من ٨ مصادر عايشين في ٨ أعمدة بس. المرتجعات من الوورد بتبقى صفوف Measure = ReturnUnits، والنولون من الـ PDF صفوف FreightEGP. والجدول المحوري في الدرس الجاي بيحط Measure في الأعمدة، فيرجع الشكل العريض للي عايز يقرا.",
          "7 kinds of figure from 8 sources live in just 8 columns. The returns from Word become rows with Measure = ReturnUnits, the freight from the PDFs rows with FreightEGP. And next lesson's pivot table puts Measure in the columns, bringing back the wide shape for whoever wants to read it.")],
        answer: u("لما بتجمّع من مصادر كتير، اطلب جدول طويل: صف لكل رقم ومعاه وصفه. لأن أي مصدر جديد بيضيف صفوف، والشكل ما بيتغيّرش.", "When gathering from many sources, ask for a long table: one row per figure with its description — any new source adds rows, and the shape never changes."),
        idea: u("مصدر جديد = صفوف جديدة… مش أعمدة.", "A new source = new rows… not columns.")
      },
      {
        id: "shapes", art: "pg_shapes", year: u("إكسل", "Excel"), mark: u("٠٤", "04"), era: u("٣ أشكال", "3 shapes"),
        title: u("٣ ملفات إكسل… ٣ طرق قراية", "3 Excel files… 3 ways of reading"),
        story: [u("القاهرة سهلة: سطر لكل بند فاتورة، والأداة تقراه زي ما هو. الإسكندرية عاملة صف لكل موديل والشهور أعمدة: Jul Qty وJul Sales وAug Qty…، وفي الآخر عمودين Q3 وصف Total. الأداة لازم تفك الأعمدة لصفوف، وتسيب الإجماليات علشان ما تتحسبش مرتين.",
          "Cairo is easy: one row per invoice line, read as it is. Alexandria has one row per model with the months as columns: Jul Qty, Jul Sales, Aug Qty… and at the end two Q3 columns and a Total row. The tool must turn the columns into rows and skip the totals so they aren't counted twice."),
        u("والدلتا عاملة شيت لكل شهر: Jul وAug و… September، مش Sep. اللي عمل الملف كتب الاسم كامل في الشهر التالت. القاعدة: الشهر من أول ٣ حروف في اسم الشيت. وفي آخر كل شيت صف Total، وبيتساب زي إسكندرية.",
          "And Delta has one sheet per month: Jul, Aug and… September, not Sep. Whoever made the file wrote the third month in full. The rule: the month comes from the sheet name's first 3 letters. And each sheet ends with a Total row, skipped as in Alexandria.")],
        answer: u("اكتب لكل ملف طريقة قرايته لوحده في الـ Prompt. لأن «اقرا ملفات الفروع» جملة واحدة لـ ٣ أشكال مختلفة، والنموذج هيفترض شكل واحد.", "Write each file's way of reading separately in the Prompt — “read the branch files” is one sentence for 3 different shapes, and the model will assume one."),
        idea: u("كل ملف بشكله… وكل شكل بقاعدته.", "Each file its shape… each shape its rule.")
      },
      {
        id: "cairo", art: "pg_cairo", year: u("الفخ ١", "Trap 1"), mark: u("٠٥", "05"), era: u("يونيو وCN", "June and CN"),
        title: u("فاتورة بتاريخ ٣٠ يونيو، وإشعارين دائن", "An invoice dated 30 June, and two credit notes"),
        story: [u("أول صف في ملف القاهرة فاتورة INV-C-49871 بتاريخ ٣٠ يونيو: اللي صدّر الملف اختار الفترة من يوم بدري. ٣٦ جهاز مش من الربع ده. والقاعدة اللي في README: الربع من ١ يوليو لـ ٣٠ سبتمبر، وأي حاجة برّه تتساب وتتسجّل.",
          "The first row of the Cairo file is invoice INV-C-49871 dated 30 June: whoever exported the file picked the period a day early. 36 sets that aren't from this quarter. And the README's rule: the quarter runs from 1 July to 30 September, and anything outside is left out and logged."),
        u("وفي الملف صفين Type = CN: إشعار دائن، تاجر رجّع أجهزة واتخصم من حسابه. كميتهم سالبة. أول فكرة: «سالب؟ أكيد غلط». بس ده خصم حقيقي من المبيعات. القاعدة: إشعار الدائن سالب، وبيتخصم، وما يتمسحش.",
          "And the file holds two rows with Type = CN: a credit note, a dealer returned sets and was credited. Their quantity is negative. First thought: “negative? must be wrong.” But it's a real deduction from sales. The rule: a credit note is negative, it is deducted, and it's never dropped.")],
        answer: u("اكتب حدود الفترة كقاعدة، واكتب معنى الرقم السالب. لأن الملفات اللي بتتصدّر بالإيد بتعدّي الحدود، والسالب في المبيعات غالبًا معناه حاجة حقيقية.", "Write the period's limits as a rule, and write what a negative number means — hand-exported files overstep their limits, and a negative in sales usually means something real."),
        idea: u("الفترة ليها حدود… والسالب ليه معنى.", "The period has limits… a negative has a meaning.")
      },
      {
        id: "word", art: "pg_word", year: u("الـ PDF", "The PDF"), mark: u("٠٦", "06"), era: u("وورد بيفتحه", "Word opens it"),
        title: u("الـ PDF بيتفتح في وورد… من غير أي برنامج جديد", "The PDF opens in Word… with no new program"),
        story: [u("لابتوب الشغل عليه أوفيس، وممنوع تنزيل برامج. طب الـ PDF يتقري إزاي؟ وورد نفسه بيفتح ملفات الـ PDF: بيحوّل الصفحات لنص وجداول تقدر تعدّل فيها. والأداة بتعمل نفس الحاجة من غير ما الشاشة تظهر: تفتح الـ PDF في وورد، وتقرا الجداول.",
          "The work laptop has Office, and installing programs isn't allowed. So how is a PDF read? Word itself opens PDF files: it turns the pages into editable text and tables. The tool does the same without showing a window: it opens the PDF in Word and reads the tables."),
        u("الـ PDF ده اتطبع من النظام، فهو نص حقيقي مش صورة، ووورد بيقراه كويس. ولو جدول طلع سطور نص مش جدول، الأداة بتقرا السطور وتفصلها. أما الـ PDF الممسوح ضوئيًا، اللي هو صورة، فده محتاج طريقة تانية خالص.",
          "These PDFs were printed by the system, so they're real text, not images, and Word reads them well. If a table comes out as lines of text instead, the tool reads the lines and splits them. A scanned PDF, which is an image, needs a different method altogether.")],
        answer: u("قبل ما تطلب برنامج جديد، شوف البرنامج اللي عندك بيقدر يعمل إيه. لأن الأداة اللي بتشتغل بالأوفيس بس بتشتغل على أي جهاز في الشركة.", "Before asking for a new program, see what the one you have can do — a tool that runs on Office alone runs on any machine in the company."),
        idea: u("وورد بيقرا الـ PDF… والأداة بتقرا وورد.", "Word reads the PDF… the tool reads Word.")
      },
      {
        id: "pages", art: "pg_pages", year: u("الصفحات", "Pages"), mark: u("٠٧", "07"), era: u("صفحة تانية", "A second page"),
        title: u("الجدول بيكمّل في صفحة تانية… والعناوين بتتكرر", "The table runs onto a second page… and the headers repeat"),
        story: [u("كل تقرير PDF صفحتين. في أول الصفحة التانية مكتوب «(continued)» وصف العناوين تاني: Country وModel وDescription وQty وNet Sales EGP. ولو الأداة اعتبرته صف بيانات، هتحاول تحوّل «Qty» لرقم وتقع، أو تسجّل صف غريب.",
          "Each PDF report is two pages. At the top of page 2 it reads “(continued)” and the header row appears again: Country, Model, Description, Qty and Net Sales EGP. If the tool took it for a data row, it would try to turn “Qty” into a number and crash, or record a strange row."),
        u("وفي الآخر سطر TOTAL بالإجماليات، وده مش صف بيانات برضه، بس هو أهم سطر في الملف: الرقم اللي النظام نفسه حسبه. والأرقام مكتوبة بفاصل آلاف: 1,285,200. القواعد: العناوين المكررة تتساب، والفاصل يتشال، وTOTAL يتحفظ للمراجعة.",
          "At the end comes a TOTAL line with the totals. That's not a data row either, but it's the most important line in the file: the figure the system itself worked out. And the numbers have thousands separators: 1,285,200. The rules: repeated headers are skipped, separators removed, and TOTAL kept for the check.")],
        answer: u("قول للأداة إن الجدول ممكن يكمّل في صفحات، وإن سطر الإجمالي للمراجعة مش للجمع. لأن التقارير المطبوعة معمولة للعين، مش للأداة.", "Tell the tool the table may run over pages, and that the total line is for checking, not adding — printed reports are made for eyes, not tools."),
        idea: u("سطر TOTAL مش بيانات… ده المراجع.", "The TOTAL line isn't data… it's the checker.")
      },
      {
        id: "bracket", art: "pg_bracket", year: u("الوقفة", "The stop"), mark: u("٠٨", "08"), era: u("(12)", "(12)"),
        title: u("PDF سبتمبر: ٣٬١٠٧ قصاد ٣٬٠٨٣", "September's PDF: 3,107 against 3,083"),
        story: [u("أول تشغيل وقف: «Export_Sales_2026-09.pdf: rows sum 3,107, printed TOTAL 3,083, difference 24». مهندس التخطيط فتح الـ PDF ودوّر على نص الفرق، ١٢: لقى في آخره سطر Kuwait مكتوب فيه «credit note» والكمية (12) والقيمة (40,560) بين قوسين.",
          "The first run stopped: “Export_Sales_2026-09.pdf: rows sum 3,107, printed TOTAL 3,083, difference 24”. The planning engineer opened the PDF and looked for half the difference, 12: at the end he found a Kuwait line reading “credit note” with the quantity (12) and the value (40,560) in brackets."),
        u("في المحاسبة القوسين معناهم سالب. الأداة شالت القوسين وقرت ١٢ موجب، فزوّدت ١٢ بدل ما تنقّص ١٢، والفرق بقى ٢٤. رجع للنموذج: «القوسين = سالب». التشغيل التاني عدّى، والمراجعة هي اللي مسكت الغلطة، مش العين.",
          "In accounting, brackets mean negative. The tool removed the brackets and read 12 as positive, adding 12 instead of taking 12 away, so the difference became 24. He went back to the model: “Brackets = negative.” The second run passed, and it was the check that caught the mistake, not the eye.")],
        answer: u("قارن كل ملف بالإجمالي المطبوع فيه، ووقّف لو مختلف. لأن غلطة القراية الصغيرة بتستخبى في آلاف الأرقام، والإجمالي بيكشفها في سطر.", "Compare every file with the total printed in it, and stop if they differ — a small reading mistake hides among thousands of figures, and the total exposes it in one line."),
        idea: u("الإجمالي المطبوع بيمسك غلطة القراية.", "The printed total catches a reading mistake.")
      },
      {
        id: "memos", art: "pg_memos", year: u("الوورد", "Word"), mark: u("٠٩", "09"), era: u("الموديل بالاسم", "Models by name"),
        title: u("مذكرة الجودة: الموديلات بالاسم، والأرقام نص", "The quality memo: models by name, numbers as text"),
        story: [u("مذكرة المرتجعات فيها فقرة، وبعدين جدول: Model وJuly وAugust وSeptember وQ3. بس الموديل مكتوب «65-inch 4K TV» مش M110: الجودة بتكتب الأسماء. والأرقام في جدول وورد كلها نص، حتى لو شكلها أرقام.",
          "The returns memo holds a paragraph, then a table: Model, July, August, September and Q3. But the model reads “65-inch 4K TV”, not M110: quality writes names. And the numbers in a Word table are all text, even when they look like numbers."),
        u("فاكر المثال الأول؟ هنا الربط بالعكس: من الاسم للكود، من نفس شيت Models. والأداة بتحوّل النص لرقم، وتسيب عمود Q3 لأنه إجمالي. والفقرة نفسها بتقول «٢٨٧ جهاز»: الأداة بتقارن مجموع الجدول بالرقم ده، زي سطر TOTAL في الـ PDF.",
          "Remember example 1? Here the join runs the other way: from the name to the code, from the same Models sheet. The tool turns the text into numbers and skips the Q3 column because it's a total. And the paragraph itself says “287 sets”: the tool compares the table's sum with that figure, like the TOTAL line in the PDF.")],
        answer: u("اربط بالاسم لو المصدر بيكتب أسماء، بس رجّع للكود في الجدول. لأن كل المصادر لازم تتقابل على نفس المفتاح.", "Join by name when a source writes names, but return to the code in the table — every source must meet on the same key."),
        idea: u("كل المصادر بتتقابل على الكود.", "Every source meets on the code.")
      },
      {
        id: "thousands", art: "pg_thousands", year: u("الفخ ٢", "Trap 2"), mark: u("١٠", "10"), era: u("بالألف", "In thousands"),
        title: u("المستهدف مكتوب «EGP 000»", "The target reads “EGP 000”"),
        story: [u("مذكرة المستهدف فيها جدول: Channel وTarget Units وTarget Net Sales (EGP 000). مستهدف الإسكندرية ٣٥٬٠٠٠، يعني ٣٥ مليون جنيه، مش ٣٥ ألف. ولو الأداة قرته زي ما هو، نسبة التحقيق هتطلع ١٠٦٬٢٤٣٪، والمدير هيضحك قبل ما يقفل العرض.",
          "The targets memo holds a table: Channel, Target Units and Target Net Sales (EGP 000). Alexandria's target is 35,000, meaning 35 million pounds, not 35 thousand. Read as it is, the achievement rate would come out at 106,243%, and the director would laugh before closing the deck."),
        u("القاعدة اللي في الـ Prompt: لو عنوان العمود فيه «000»، اضرب في ١٬٠٠٠. وعلشان يتأكد، الفقرة اللي فوق الجدول بتقول «EGP 130 million» للتصدير، والجدول بيقول ١٣٠٬٠٠٠: نفس الرقم بعد الضرب. مصدرين في نفس الملف بيأكدوا بعض.",
          "The rule in the Prompt: if the column header holds “000”, multiply by 1,000. And to be sure, the paragraph above the table says “EGP 130 million” for export, and the table says 130,000: the same figure after multiplying. Two sources in the same file confirming each other.")],
        answer: u("اقرا عنوان كل عمود فيه أرقام، ودوّر على الوحدة. لأن الرقم من غير وحدته ممكن يبقى ألف مرة أكبر أو أصغر.", "Read the header of every column of numbers, and look for the unit — a number without its unit can be a thousand times too big or too small."),
        idea: u("الوحدة جزء من الرقم.", "The unit is part of the number.")
      },
      {
        id: "sources", art: "pg_sources", year: u("المراجعة", "The check"), mark: u("١١", "11"), era: u("شيت Sources", "The Sources sheet"),
        title: u("شيت Sources: كل ملف، وإجماليه، وحالته", "The Sources sheet: every file, its total, its status"),
        story: [u("آخر خطوة: شيت Sources. سطر لكل ملف من الـ ١٢: الصفوف اللي اتقرت، والإجمالي اللي الأداة حسبته، والإجمالي المطبوع في الملف لو موجود، والحالة. كل السطور OK. ١٤٠ شحنة، و٢٤٬٥١٤ جهاز اتشحن، و٢٤٬٥٠٢ جهاز اتباع، وفاتورة يونيو مكتوبة «outside the quarter».",
          "The last step: the Sources sheet. One line for each of the 12 files: rows read, the total the tool computed, the total printed in the file if any, and a status. Every line OK. 140 shipments, 24,514 sets shipped, 24,502 sets sold, and the June invoice marked “outside the quarter”."),
        u("قارن بمفتاح الإجابة: نفس الأرقام. وبعدين اختبار: في نسخة من المشروع غيّر رقم واحد في PDF أغسطس، وشغّل. الأداة وقفت وسمّت الملف والفرق. الجدول ده بقى الأساس اللي المراجعة كلها هتتبني عليه.",
          "He compared with the answer key: the same figures. Then a test: in a copy of the project he changed one figure in August's PDF and ran it. The tool stopped and named the file and the difference. This table became the base the whole review will be built on.")],
        answer: u("اطلب شيت بيقول كل ملف اتقرا قد إيه، وإجماليه، ومطابق ولا لأ. لأن الثقة في جدول متجمّع من ١٢ ملف بتيجي من ١٢ مراجعة، مش من نظرة.", "Ask for a sheet saying how much was read from each file, its total, and whether it matches — trust in a table gathered from 12 files comes from 12 checks, not a glance."),
        idea: u("١٢ ملف… ١٢ مراجعة.", "12 files… 12 checks.")
      },
      {
        id: "cliff", art: "pg_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("الاجتماع", "The meeting"),
        title: u("الجدول جاهز… والاجتماع يوم الأحد", "The table is ready… and the meeting is on Sunday"),
        story: [u("مهندس التخطيط بعت للمدير التجاري: «كل الأرقام في جدول واحد، ومراجعة على كل ملف». رد: «ممتاز. الاجتماع يوم الأحد، ومحتاج العرض: ٨ شرائح زي كل ربع، المبيعات قصاد المستهدف، والتصدير، والشحن، والمرتجعات».",
          "The planning engineer wrote to the commercial director: “All the figures in one table, checked against every file.” He replied: “Excellent. The meeting is on Sunday, and I need the deck: 8 slides as every quarter, sales against target, export, shipping and returns.”"),
        u("ودي كانت الخطوة اللي بتاخد يوم كل ربع: جداول، ورسوم، ونسخ في باوربوينت، ورقم ورقم. بس دلوقتي في جدول واحد مراجَع، ومن جدول واحد كل حاجة ممكن تتبني. والسؤال اللي الدرس الجاي بيجاوبه: الجدول جاهز… العرض يتعمل لوحده إزاي؟",
          "That was the step that took a day every quarter: tables, charts, copying into PowerPoint, figure by figure. But now there's one checked table, and from one table everything can be built. And the question the next lesson answers: the table is ready… how does the deck build itself?")],
        answer: u("واجب الدرس: شغّل Prompt_1 على المثال التاني، واقرا شيت Sources سطر سطر، وجرّب تغيّر رقم في نسخة PDF وشوف الأداة توقف. لأن الدرس الجاي كله بيقرا من الجدول ده.", "This lesson's task: run Prompt_1 on example 2, read the Sources sheet line by line, and change a figure in a copy of a PDF to see the tool stop — the whole next lesson reads from this table."),
        idea: u("جدول واحد… وكل حاجة تتبني عليه.", "One table… and everything builds on it.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.gatherStory]);
})(window.ACADEMY = window.ACADEMY || {});
