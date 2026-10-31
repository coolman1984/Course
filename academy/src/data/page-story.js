/* An HTML page for management — the story deck of lesson k8 (unit 4), on step 2 of Unit4_Example_2_PDF_to_HTML.
   The planning engineer of unit 3 carries every slide with one question: «إزاي الأرقام تتعرض على الإدارة
   في صفحة تتفتح في أي مكان؟». The deck goes from the database to one offline HTML file: what HTML is, figures read with
   SQL, the check before design, three big figures, SVG charts with no library, no outside links, html.escape, the
   Present button, the source line, and how far one file can go; it ends on rules scattered across many Prompts, which
   opens k9. Figures come from data/easy-projects.js. Drawings are the pg_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.pageStory = {
    id: "page", lesson: "k8",
    kicker: u("صفحة للإدارة · الحكاية في ٨ دقايق", "A page for management · the story in 8 minutes"),
    title: u("صفحة واحدة… بتتفتح في أي مكان", "One page… that opens anywhere"),
    lead: u("فاكر اجتماع بكرة، والموبايل، والنت الضعيف؟ في الحكاية دي مهندس التخطيط بيحوّل قاعدة البيانات لملف HTML واحد: أرقام ورسوم وعرض، من غير نت ومن غير تثبيت، زي الكورس اللي إنت بتقراه دلوقتي بالظبط.",
      "Remember tomorrow's meeting, the phone and the weak internet? In this story the planning engineer turns the database into one HTML file: figures, charts and a presentation, with no internet and nothing to install, just like the course you are reading now."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي الأرقام تتعرض على الإدارة في صفحة تتفتح في أي مكان؟", "How are the figures shown to management in a page that opens anywhere?"),
    finalQuestion: u("طب القواعد دي كلها… هنفتكرها كل مرة؟", "And all these rules… will we remember them every time?"),
    note: u("الصفحة بالإنجليزي زي ملفات المصنع، ونفس الطريقة بتشتغل بالعربي. الأرقام من المثال التاني، وكلها توضيحية.", "The page is in English like the plant's files; the same method works in Arabic. The figures come from the second example; all are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("صفحة للإدارة، في شرائح", "A page for management, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "meeting", art: "pg_meeting", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("اجتماع بكرة", "Tomorrow's meeting"),
        title: u("موبايل، وشاشة قاعة، ونت ضعيف", "A phone, a room screen, and weak internet"),
        story: [u("المدير عايز يعرض أرقام التصدير بكرة: على الموبايل في الطريق، وعلى شاشة القاعة في الاجتماع. والباوربوينت محتاج برنامج، والإكسل صعب يتقري على الموبايل، واللوحة على النت محتاجة نت وصلاحيات وناس من الـ IT.",
          "The manager wants to show the export figures tomorrow: on his phone on the way, and on the room's screen in the meeting. PowerPoint needs a program, Excel is hard to read on a phone, and an online dashboard needs internet, permissions and IT staff."),
        u("والحل قدامنا فعلًا: الكورس ده نفسه ملف HTML واحد، بيتفتح من غير نت على أي جهاز. والسؤال اللي معانا في الحكاية دي: إزاي الأرقام تتعرض على الإدارة في صفحة تتفتح في أي مكان؟",
          "And the answer is right in front of us: this very course is one HTML file that opens offline on any machine. The question we carry in this story: how are the figures shown to management in a page that opens anywhere?")],
        answer: u("قبل ما تختار شكل التقرير، اسأل: هيتفتح فين، وعلى إيه، ومن غير إيه. لأن أحلى تقرير ما يفيدش لو ما اتفتحش عند اللي محتاجه.", "Before choosing a report's form, ask: where will it open, on what, and without what — the finest report is useless if it won't open for the person who needs it."),
        idea: u("التقرير اللي ما بيتفتحش… كأنه مش موجود.", "A report that won't open… doesn't exist.")
      },
      {
        id: "html", art: "pg_html", year: u("HTML", "HTML"), mark: u("٠٢", "02"), era: u("ملف واحد", "One file"),
        title: u("HTML: هيكل، وشكل، وحركة… في ملف واحد", "HTML: structure, look and movement… in one file"),
        story: [u("HTML هو الهيكل: عنوان، وأرقام، وجدول. وCSS هو الشكل: الألوان والمسافات. وJavaScript هو الحركة: زرار يغيّر حاجة. والكتاب بيشبّههم بالخرسانة والتشطيب والكهربا، والتلاتة ممكن يتحطوا جوّه ملف واحد.",
          "HTML is the structure: a title, figures, a table. CSS is the look: colours and spacing. JavaScript is the movement: a button that changes something. The book compares them to concrete, finishing and wiring, and all three can sit inside one file."),
        u("والملف ده بيتبعت في إيميل زي الـ PDF، وبيتفتح في أي متصفح: على الكمبيوتر، أو الموبايل، أو الشاشة. لكن على عكس الـ PDF، بيتحرك ويتعرض. والأحلى إن Python النقي يقدر يكتبه سطر سطر، من غير أي باكدج.",
          "And that file is e-mailed like a PDF, and opens in any browser: on a computer, a phone or a screen. But unlike a PDF, it moves and presents. Best of all, pure Python can write it line by line, with no package.")],
        answer: u("لتقرير هيتبعت ويتعرض، فكّر في ملف HTML واحد. لأنه بيتفتح في أي متصفح من غير برنامج، ويقدر يبقى صفحة وعرض في نفس الوقت.", "For a report to be sent and presented, think of one HTML file — it opens in any browser with no program, and can be both a page and a presentation."),
        idea: u("ملف واحد… صفحة وعرض.", "One file… a page and a presentation.")
      },
      {
        id: "data", art: "pg_data", year: u("الأرقام", "Figures"), mark: u("٠٣", "03"), era: u("من القاعدة", "From the database"),
        title: u("ولا رقم في الصفحة مكتوب بالإيد", "Not one figure on the page typed by hand"),
        story: [u("لصق Prompt_2. والسكريبت build_report.py بدأ يسأل القاعدة بـ SQL: الإجمالي، والبلاد بـ JOIN على Countries، والموديلات. وكل رقم هيظهر في الصفحة جاي من جملة SQL، مش من حد كتبه.",
          "He pasted Prompt_2. The script build_report.py began asking the database with SQL: the total, the countries with a JOIN on Countries, the models. Every figure that will show on the page comes from an SQL sentence, not from someone typing it."),
        u("وده مهم لأن الشهر الجاي، لما ملف أغسطس ييجي، هتتشغّل الخطوتين، والصفحة هتطلع بأرقام أغسطس لوحدها. ولو رقم واحد مكتوب بالإيد، هيفضل رقم يوليو من غير ما حد ياخد باله.",
          "That matters because next month, when August's file arrives, both steps will run and the page will come out with August's figures by itself. If one figure were typed by hand, it would stay July's figure without anyone noticing.")],
        answer: u("كل رقم في الصفحة لازم ييجي من القاعدة بـ SQL، مش مكتوب بالإيد. لأن الرقم المكتوب بالإيد بيفضل زي ما هو لما البيانات تتغيّر.", "Every figure on the page must come from the database by SQL, not typed — a hand-typed figure stays the same when the data changes."),
        idea: u("الصفحة بتقرا الأرقام… مش بتحفظها.", "The page reads… it doesn't remember.")
      },
      {
        id: "check", art: "pg_check", year: u("المراجعة", "The check"), mark: u("٠٤", "04"), era: u("قبل الشكل", "Before the look"),
        title: u("المراجعة قبل الألوان", "The check before the colours"),
        story: [u("قبل ما يتكتب سطر HTML واحد، السكريبت راجع: مجموع البلاد = الإجمالي؟ ٤٬١٦٨٬٠٠٠ = ٤٬١٦٨٬٠٠٠. ومجموع الموديلات = الإجمالي؟ نفس الرقم. ولو أي واحد اختلف، كان هيوقف ويكتب السبب في السجل.",
          "Before a single line of HTML is written, the script checked: the countries' sum = the total? 4,168,000 = 4,168,000. The models' sum = the total? The same figure. Had either differed, it would have stopped and written the reason in the log."),
        u("والكتاب بيقول: البيانات الأول، وبعدها صحة الأرقام، وبعدها العرض، وفي الآخر التجميل. صفحة حلوة برقم غلط أخطر من جدول عادي برقم صح، لأن الشكل الحلو بيقنع.",
          "And the book says: data first, then correct figures, then presentation, and finishing last. A pretty page with a wrong figure is more dangerous than a plain table with a right one, because a pretty look persuades.")],
        answer: u("خلّي الأداة تراجع إن الأجزاء بتساوي الإجمالي قبل ما ترسم أي حاجة. لأن الشكل الحلو بيخلّي الرقم الغلط يبان مقنع.", "Have the tool check the parts add up to the total before drawing anything — a beautiful look makes a wrong figure seem convincing."),
        idea: u("الشكل الحلو… بيقنع حتى لو الرقم غلط.", "A beautiful look… convinces even when wrong.")
      },
      {
        id: "kpis", art: "pg_kpis", year: u("٣ أرقام", "3 figures"), mark: u("٠٥", "05"), era: u("أول ٣٠ ثانية", "The first 30 seconds"),
        title: u("فوق: ٣ أرقام بس", "On top: just 3 figures"),
        story: [u("أول حاجة في الصفحة ٣ كروت: ٤٬١٦٨٬٠٠٠ جنيه صافي مبيعات، و٤٧٠ جهاز، والكويت أعلى بلد بنسبة ٢٨٪. المدير يفتح الصفحة، وفي تلات ثواني يعرف الشهر كان عامل إزاي.",
          "The first thing on the page is 3 cards: EGP 4,168,000 net sales, 470 sets, and Kuwait the top country with 28%. The manager opens the page, and in three seconds knows how the month went."),
        u("وليه مش عشرة؟ لأن الكتاب بيقول إن الرسالة الأساسية لازم تتفهم في أول ٣٠ ثانية، وعشرة أرقام جنب بعض محدش هيقراهم. والتفاصيل تحت، للي عايز يتعمق.",
          "And why not ten? Because the book says the core message must be understood in the first 30 seconds, and ten figures side by side are read by nobody. The details are below, for whoever wants to go deeper.")],
        answer: u("حط فوق الصفحة ٣ أرقام بس، والأهم الأول. لأن المدير بيقرر يكمّل قراءة ولا لأ من أول نظرة.", "Put just 3 figures at the top of the page, the most important first — the manager decides whether to read on at first glance."),
        idea: u("٣ أرقام… في ٣ ثواني.", "3 figures… in 3 seconds.")
      },
      {
        id: "svg", art: "pg_svg", year: u("الرسوم", "Charts"), mark: u("٠٦", "06"), era: u("SVG", "SVG"),
        title: u("رسم من غير مكتبة رسوم", "A chart with no chart library"),
        story: [u("المعتاد إن الرسوم تيجي من مكتبة زي Plotly أو Chart.js، لكن دي باكدج، أو ملف جاي من النت. فاكر خريطة البدائل؟ plotly ← رسم SVG مكتوب نص. والسكريبت كتب لكل بلد سطر: مستطيل عرضه على قد مبيعاتها، وجنبه الرقم.",
          "Charts usually come from a library such as Plotly or Chart.js, but that is a package, or a file from the internet. Remember the map of alternatives? plotly → an SVG chart written as text. The script wrote one line per country: a rectangle as wide as its sales, with the figure beside it."),
        u("الكويت أعرض مستطيل بـ ١٬١٨٣٬٠٠٠، والإمارات أقصر واحد بـ ٧٥٨٬٠٠٠. حوالي ١٥ سطر Python، والرسم جوّه الصفحة نفسها، وبيكبر ويصغر مع الشاشة من غير ما يتشوّش.",
          "Kuwait is the widest rectangle at 1,183,000, and the Emirates the shortest at 758,000. About 15 lines of Python, the chart inside the page itself, growing and shrinking with the screen without blurring.")],
        answer: u("ارسم الرسوم البسيطة SVG جوّه الصفحة، من غير مكتبة. لأن رسم الأعمدة مستطيلات بأطوال، والمكتبة الخارجية بتجيب معاها باكدج أو رابط للنت.", "Draw simple charts as SVG inside the page, with no library — a bar chart is rectangles of different lengths, and an outside library brings a package or an internet link."),
        idea: u("رسم الأعمدة… مستطيلات بأطوال.", "A bar chart… is rectangles of lengths.")
      },
      {
        id: "offline", art: "pg_offline", year: u("من غير نت", "Offline"), mark: u("٠٧", "07"), era: u("ولا رابط برّه", "No outside link"),
        title: u("ولا رابط لبرّه الصفحة", "Not a single link outside the page"),
        story: [u("نسخة قديمة من الصفحة كان فيها سطر بيحمّل مكتبة رسوم من النت. ولما فصل الواي فاي وفتحها، الأرقام ظهرت والرسوم اختفت. تخيّل ده في الاجتماع. وكمان كل مرة الصفحة تتفتح كانت بتبعت طلب لموقع برّه الشركة.",
          "An older version of the page had a line loading a chart library from the internet. When he disconnected the Wi-Fi and opened it, the figures showed and the charts vanished. Imagine that in the meeting. And each time the page opened, it sent a request to a site outside the company."),
        u("فالقاعدة بقت مكتوبة في الطلب: ممنوع أي رابط لملف أو مكتبة برّه الصفحة. والمراجعة سهلة: افصل النت وافتح الصفحة، ولو كل حاجة ظهرت، يبقى الصفحة مكتفية بنفسها.",
          "So the rule became part of the request: no link to any file or library outside the page. And the check is easy: disconnect the internet and open the page; if everything shows, the page is self-contained.")],
        answer: u("خلّي الصفحة مكتفية بنفسها: ولا رابط لملف أو مكتبة برّه. لأن الرابط الخارجي بيوقف الصفحة لو مفيش نت، وبيبعت طلب لبرّه الشركة.", "Make the page self-contained: no link to any outside file or library — an outside link breaks the page offline and sends a request outside the company."),
        idea: u("افصل النت… وافتح الصفحة.", "Disconnect… and open.")
      },
      {
        id: "escape", art: "pg_escape", year: u("الأمان", "Safety"), mark: u("٠٨", "08"), era: u("html.escape", "html.escape"),
        title: u("كل قيمة بتعدّي على html.escape", "Every value passes through html.escape"),
        story: [u("وفي الكود سطر مهم: html.escape(name). لو اسم فيه علامة < أو &، المتصفح ممكن يفهمها جزء من الصفحة نفسها مش كلام، فالصفحة تتلخبط. وفي أسوأ الأحوال، حد يحط في البيانات كود يشتغل أول ما الصفحة تتفتح.",
          "And the code holds one important line: html.escape(name). If a name holds < or &, the browser may take it as part of the page itself rather than words, and the page gets scrambled. At worst, someone could put code into the data that runs as soon as the page opens."),
        u("وhtml من المكتبة القياسية، وescape بتحوّل العلامات دي لشكل بيتعرض كلام بس. ودي نفس فكرة علامات ? في SQL: القيمة تفضل قيمة، وعمرها ما تبقى أمر.",
          "html is in the standard library, and escape turns those characters into a form that shows as words only. It's the same idea as the ? marks in SQL: a value stays a value, never a command.")],
        answer: u("عدّي كل قيمة جاية من البيانات على html.escape قبل ما تدخل الصفحة. لأن القيمة اللي فيها علامات HTML ممكن تكسر الصفحة أو تشغّل كود.", "Pass every value from the data through html.escape before it enters the page — a value holding HTML marks can break the page or run code."),
        idea: u("القيمة تفضل قيمة… في الصفحة كمان.", "A value stays a value… in the page too.")
      },
      {
        id: "present", art: "pg_present", year: u("العرض", "Presenting"), mark: u("٠٩", "09"), era: u("زرار Present", "The Present button"),
        title: u("زرار واحد… والصفحة بقت شرايح", "One button… and the page became slides"),
        story: [u("الصفحة فيها ٤ أقسام: الأرقام التلاتة، ورسم البلاد، ورسم الموديلات، والجدول. وفوق فيه زرار Present؛ لما يتضغط، كل قسم بياخد الشاشة كلها، والأسهم بتنقل من قسم للتاني، زي عرض الباوربوينت بالظبط.",
          "The page has 4 sections: the three figures, the country chart, the model chart, and the table. On top is a Present button; when pressed, each section takes the whole screen and the arrow keys move between them, just like a PowerPoint show."),
        u("وده كله CSS وسطرين JavaScript جوّه نفس الملف. المدير ضغط Present على شاشة القاعة، وعدّى على الشرايح بالأسهم، ولما حد سأل عن تفصيلة، ضغط Page ورجع للصفحة العادية.",
          "All of it is CSS and two lines of JavaScript inside the same file. The manager pressed Present on the room's screen, went through the slides with the arrows, and when someone asked about a detail, he pressed Page to return to the normal page.")],
        answer: u("خلّي نفس الصفحة تتقري لوحدها وتتعرض في اجتماع. لأن ملف واحد للاتنين معناه رقم واحد في المكانين، من غير نسختين ممكن يختلفوا.", "Let the same page be read alone and presented in a meeting — one file for both means one figure in both places, never two copies that drift apart."),
        idea: u("نفس الملف… للقراءة وللعرض.", "The same file… for reading and presenting.")
      },
      {
        id: "source", art: "pg_source", year: u("المصدر", "The source"), mark: u("١٠", "10"), era: u("سطر تحت الجدول", "A line under the table"),
        title: u("«الرقم ده متراجع؟»… الإجابة مكتوبة", "“Is this figure checked?”… the answer is written"),
        story: [u("في الاجتماع، عضو في مجلس الإدارة سأل: «الرقم ده جاي منين؟ ومتراجع؟». فالمدير شاور على سطر صغير تحت الجدول: «المصدر: Export_Sales_2026-07.pdf، ١٢ صف، اتراجع على سطر الإجمالي في التقرير. اتبنى ٢٠٢٦-٠٨-٠٢».",
          "In the meeting, a board member asked: “Where does this figure come from? Is it checked?” The manager pointed to a small line under the table: “Source: Export_Sales_2026-07.pdf, 12 rows, checked against the report's total line. Built 2026-08-02.”"),
        u("سطر واحد جاوب السؤال من غير ما حد يكلّم مهندس التخطيط. والأرقام اللي من غير مصدر بتتسأل عنها، واللي معاها مصدرها بتتصدّق.",
          "One line answered the question without anyone calling the planning engineer. Figures without a source get questioned; figures with their source get believed.")],
        answer: u("حط تحت أي تقرير سطر فيه المصدر، وعدد الصفوف، والمراجعة اللي اتعملت، ووقت البناء. لأن السؤال ده هييجي في أي اجتماع، والأحسن تكون الإجابة جوّه التقرير.", "Put a line under any report giving the source, the row count, the check made and the build time — that question comes in every meeting, and the answer is best inside the report."),
        idea: u("الرقم اللي معاه مصدره… بيتصدّق.", "A figure carrying its source… is believed.")
      },
      {
        id: "app", art: "pg_app", year: u("لحد فين؟", "How far?"), mark: u("١١", "11"), era: u("صفحة أو تطبيق", "Page or app"),
        title: u("ملف واحد ممكن يبقى «تطبيق» صغير", "One file can become a small “app”"),
        story: [u("وينفع الصفحة يبقى فيها فلتر بالبلد: البيانات بتتحط جوّه الصفحة نفسها، وJavaScript بيرسم على حسب الاختيار. فلاتر، وتبويبات، وجداول بتترتّب، ولسه ملف واحد. والكورس ده نفسه مثال على كده.",
          "And the page can have a country filter: the data are put inside the page itself, and JavaScript draws according to the choice. Filters, tabs, sortable tables, and still one file. This very course is an example."),
        u("وإمتى ما ينفعش؟ لما ناس كتير بيعدّلوا في البيانات كل يوم، أو لما البيانات بتتغيّر لحظة بلحظة. ساعتها ده تطبيق حقيقي على خادم مع الـ IT، والوحدة السابعة بتشرح النوع ده.",
          "And when won't it do? When many people edit the data every day, or when the data change moment by moment. Then it's a real application on a server, with IT, and unit 7 explains that kind.")],
        answer: u("ابدأ بملف HTML واحد، وكبّره بفلاتر لو احتجت، وانقل لتطبيق على خادم بس لما ناس كتير يعدّلوا أو البيانات تبقى لحظية. لأن كل خطوة لفوق معناها صيانة وصلاحيات أكتر.", "Start with one HTML file, grow it with filters if needed, and move to a server application only when many people edit or data becomes live — each step up means more maintenance and permissions."),
        idea: u("ابدأ بملف… وكبّر لما تحتاج.", "Start with a file… grow when needed.")
      },
      {
        id: "cliff", art: "pg_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("مصنع تالت", "A third plant"),
        title: u("مصنع تالت عايز نفس الأدوات… والقواعد متفرقة", "A third plant wants the same tools… and the rules are scattered"),
        story: [u("الاجتماع نجح، والمدير بعت الصفحة لمصنع تالت، ومهندس هناك اتصل: «عايز أعمل نفس الأدوات، أبدأ منين؟». ومهندس التخطيط بدأ يعدّ: PowerShell الأول، وPython النقي، وخطوة بخطوة، والبوابات، وأسئلة المراجعة السبعة، والسجل، وملف التشغيل…",
          "The meeting went well, and the manager sent the page to a third plant, where an engineer called: “I want to build the same tools; where do I start?” The planning engineer began counting: PowerShell first, pure Python, step by step, the gates, the seven review questions, the log, the launcher…"),
        u("القواعد كانت متفرقة في ١٢ Prompt، وجزء منها في ذاكرته هو بس. ولو نسي قاعدة واحدة في طلب، النموذج هيرجع لـ pandas أو للأداة الكبيرة. ومن هنا بيبدأ الدرس الجاي: طب القواعد دي كلها… هنفتكرها كل مرة؟",
          "The rules were scattered across 12 Prompts, and some lived only in his memory. If he forgot one rule in a request, the model would go back to pandas or to the big tool. And here the next lesson begins: all these rules… will we remember them every time?")],
        answer: u("واجب الدرس: شغّل Prompt_2 من المثال التاني، وافتح الصفحة، وقارن صف Total بالـ PDF، وافصل النت وافتحها تاني، وجرّب Present. لأن الصفحة دي هي آخر حلقة في السلسلة: من الـ PDF للإدارة.", "This lesson's task: run Prompt_2 of the second example, open the page, compare its Total row with the PDF, disconnect the internet and open it again, and try Present — this page is the last link in the chain: from the PDF to management."),
        idea: u("القواعد اللي في ذاكرتك بس… بتتنسي.", "Rules kept only in your memory… get forgotten.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.pageStory]);
})(window.ACADEMY = window.ACADEMY || {});
