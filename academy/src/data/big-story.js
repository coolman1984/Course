/* Big data — the story deck that opens unit 3 (lesson b1).
   The sales supervisor of unit 1, facing the same kind of file that froze Excel at the end of unit 2, carries every slide with one
   question: «إزاي ٣٧ ملف يبقوا جدول واحد أقدر أثق فيه؟». The deck goes from many differently shaped files to one clean,
   checked table: agree on one shape, stack with a source column, check before analysing, clean by written rules, link to
   master sheets with an "unmatched" sheet, take the heavy work outside Excel, organise a project folder, work from the
   editor, choose the model's level for the task, reconcile the totals — and ends on the question that the unit's Office lessons answer.
   Each slide gives one rule with its reason. Figures are illustrative. Drawings are the b_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.bigStory = {
    id: "big", lesson: "b1",
    kicker: u("البيانات الكبيرة · الحكاية كاملة في ٨ دقايق", "Big data · the whole story in 8 minutes"),
    title: u("من ملفات كتير لجدول واحد تثق فيه", "From many files to one table you can trust"),
    lead: u("فاكر ملف الربع اللي وقّف إكسل في آخر الوحدة التانية؟ المشكلة دي مش في المصنع بس. في الحكاية دي هنرجع لمشرف المبيعات اللي قابلناه في الوحدة الأولى، وهو بيحوّل ملفات كتير، كل واحد شكله مختلف، لجدول واحد نضيف ومراجَع، ونتعرّف في السكة على فولدر المشروع والمحرر ومستويات ذكاء النماذج.",
      "Remember the quarter's file that froze Excel at the end of unit 2? That problem isn't the factory's alone. In this story we return to the sales supervisor we met in unit 1, as he turns many files, each shaped differently, into one clean, checked table, and along the way we meet the project folder, the editor and the levels of model intelligence."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي ٣٧ ملف يبقوا جدول واحد أقدر أثق فيه؟", "How do 37 files become one table I can trust?"),
    finalQuestion: u("الأرقام جاهزة… طب التقرير يتكتب ويتبعت لكل فرع لوحده إزاي؟", "The numbers are ready… so how does each branch get its own written report?"),
    note: u("الأرقام والأسماء توضيحية. جرّب أي أداة على نسخة من ملفاتك الأول، وراجع سياسة شركتك قبل ما ترفع أي بيانات لأداة على النت.", "Figures and names are illustrative. Try any tool on a copy of your files first, and check your company's policy before uploading any data to an online tool."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("من ملفات كتير لجدول واحد، في شرائح", "From many files to one table, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "files", art: "b_files", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("٣٧ ملف على المكتب", "37 files on the desk"),
        title: u("٣٧ ملف، وسؤال واحد من المدير", "37 files, and one question from the manager"),
        story: [u("مشرف المبيعات كمان وصله ملف ربع وقّف إكسل. والمدير رجع بسؤال أكبر: «عايز أعرف مبيعات كل صنف في التلات فروع على مدار السنة». يعني ٣٦ ملف شهري، ١٢ لكل فرع، وفوقهم ملف الربع الكبير اللي فيه مبيعات الجملة من الإدارة، ودي مش موجودة في ملفات الفروع.",
          "The sales supervisor, too, received a quarter's file that froze Excel. And the manager came back with a bigger question: “I want each product's sales across the three branches over the whole year.” That means 36 monthly files, 12 per branch, plus the big quarter file holding wholesale sales from head office, which aren't in the branch files."),
        u("المشرف فتح أول ملفين جنب بعض، واكتشف إن المشكلة مش في العدد بس. كل فرع بيسجّل بطريقته، وكل شهر فيه حاجة اتغيّرت. والسؤال اللي ماشي معانا في الحكاية: إزاي الملفات دي كلها تبقى جدول واحد أقدر أثق في أرقامه؟",
          "The supervisor opened the first two files side by side and found the problem isn't only the number. Each branch records in its own way, and something changed every month. The question we carry through the story: how do all these files become one table whose numbers I can trust?")],
        answer: u("قبل ما تجمّع أي حاجة، اعرف إيه اللي قدامك: كام ملف، وجايين منين، وشكلهم إيه. لأن المفاجآت اللي ما شفتهاش في الأول بتظهر في الآخر أرقام غلط.", "Before combining anything, know what's in front of you: how many files, where from, what shape — surprises you don't see at the start show up at the end as wrong numbers."),
        idea: u("الجدول اللي تثق فيه بيبدأ إنك تعرف ملفاتك كويس.", "A table you can trust starts with knowing your files.")
      },
      {
        id: "shapes", art: "b_shapes", year: u("الشكل", "Shape"), mark: u("٠٢", "02"), era: u("كل ملف بشكل", "Every file, its own shape"),
        title: u("نفس البيانات… بتلات أشكال", "The same data… in three shapes"),
        story: [u("فرع القاهرة كاتب العمود «الفرع»، وفرع طنطا كاتبه «اسم الفرع». واحد كاتب التاريخ يوم/شهر، والتاني شهر/يوم، والتالت كاتبه نص زي «٣ مارس». وفي شهر يونيو حد زوّد عمود «ملاحظات» في النص.",
          "The Cairo branch titles the column “Branch”, Tanta titles it “Branch name”. One writes dates day/month, another month/day, and the third as text like “3 March”. And in June someone inserted a “Notes” column in the middle."),
        u("لو حطّينا الملفات دي تحت بعض زي ما هي، إكسل مش هيعترض. هيحط «الفرع» في عمود و«اسم الفرع» في عمود تاني، والتواريخ هتتلخبط من غير أي رسالة. فالمشرف كتب الأول «القالب»: الأعمدة المطلوبة بأسمائها وأنواعها وترتيبها.",
          "If we stack these files as they are, Excel won't complain. It will put “Branch” in one column and “Branch name” in another, and the dates will scramble without a single warning. So the supervisor first wrote “the template”: the required columns, with their names, types and order.")],
        answer: u("اتفق على شكل واحد للأعمدة قبل التجميع، واكتب أسماءها وأنواعها. لأن الملفات المختلفة لما تتجمع زي ما هي بتعمل لخبطة صامتة ما حدش بيلاحظها.", "Agree on one column shape before combining, and write down names and types — differently shaped files stacked as they are make a silent mess nobody notices."),
        idea: u("الأول نتفق على الشكل… وبعدين نجمّع.", "First agree on the shape… then combine.")
      },
      {
        id: "stack", art: "b_stack", year: u("التجميع", "Stack"), mark: u("٠٣", "03"), era: u("تحت بعض", "One under another"),
        title: u("تحت بعض… وكل صف عارف جه منين", "Stacked… and every row knows where it came from"),
        story: [u("دلوقتي كل ملف بيتقري، وأعمدته بتتطابق مع القالب، وبعدين بيتحط تحت اللي قبله. ودي نفس فكرة الأداة اللي بنيناها في الدرس التامن، بس على ملفات أشكالها مختلفة. والإضافة المهمة: عمود جديد اسمه «المصدر» فيه اسم الملف اللي جه منه كل صف.",
          "Now each file is read, its columns are matched to the template, and it goes under the one before. It's the same idea as the tool we built in lesson eight, but on files of different shapes. The important addition: a new “Source” column holding the name of the file each row came from."),
        u("بعد أسبوع، المدير سأل: «ليه مبيعات طنطا في مارس عالية كده؟». المشرف عمل فلتر على عمود المصدر، وفي دقيقة لقى الملف والصف. لولا العمود ده، كان هيدوّر في ٣٧ ملف.",
          "A week later the manager asked: “Why are Tanta's March sales so high?” The supervisor filtered the Source column and found the file and the row in a minute. Without that column, he would have searched through 37 files.")],
        answer: u("كل صف في الجدول المجمّع لازم يعرف جه من أنهي ملف. لأن أول ما رقم يبان غريب، هتحتاج ترجع لأصله في دقيقة مش في ساعة.", "Every row in the combined table must know which file it came from — the moment a number looks odd, you need to trace it in a minute, not an hour."),
        idea: u("عمود «المصدر» هو خريطة الرجوع للأصل.", "The “Source” column is the map back to the original.")
      },
      {
        id: "check", art: "b_check", year: u("الفحص", "Check"), mark: u("٠٤", "04"), era: u("قبل أي تحليل", "Before any analysis"),
        title: u("قبل ما تحلل… افحص", "Before you analyse… check"),
        story: [u("الجدول بقى ٤١٢ ألف صف. المشرف كان عايز يعمل الجدول المحوري على طول، بس افتكر قاعدة من الوحدة الأولى: البيانات الغلط بتطلّع نتيجة شكلها مقنع. فطلب تقرير جودة الأول.",
          "The table is now 412,000 rows. The supervisor wanted the pivot table straight away, but remembered a rule from unit 1: wrong data gives a convincing-looking result. So he asked for a quality report first."),
        u("التقرير لقى ١٬٢٠٠ صف من غير كود صنف، و٣٤٠ صف متكرر بالظبط، وكميات بالسالب، وسعر واحد مكتوب أكبر من الطبيعي ١٠ مرات، وتواريخ في سنة ٢٠٢٥ جوّه ملفات ٢٠٢٦. ولا حاجة من دول كانت هتبان في الجدول المحوري.",
          "The report found 1,200 rows without a product code, 340 exact duplicates, negative quantities, one price ten times too high, and 2025 dates inside 2026 files. None of this would have shown in the pivot table.")],
        answer: u("افحص البيانات قبل التحليل: الناقص، والمتكرر، والأرقام الشاذة، والتواريخ اللي برّه الفترة. لأن التحليل على بيانات فيها أخطاء بيطلّع أرقام شكلها صح وهي غلط.", "Check data before analysing: missing, duplicated, outliers and out-of-range dates — analysis on flawed data produces numbers that look right and are wrong."),
        idea: u("تقرير الجودة بيقولك تقدر تثق في الأرقام ولا لأ.", "The quality report tells you whether you can trust the numbers.")
      },
      {
        id: "clean", art: "b_clean", year: u("التنضيف", "Clean"), mark: u("٠٥", "05"), era: u("بقواعد مكتوبة", "By written rules"),
        title: u("التنضيف بقواعد مكتوبة… والأصل ما يتلمسش", "Cleaning by written rules… the original stays untouched"),
        story: [u("بدل ما يصلّح الأخطاء بإيده واحد واحد، المشرف كتب قواعد: «طنطا» و«فرع طنطا» و«Tanta» يبقوا «طنطا». والتواريخ المكتوبة نص تتحوّل لتاريخ. والمتكرر بالظبط يتشال وتفضل نسخة واحدة. والكمية السالبة ما تتصلّحش، تتعلّم وتتراجع.",
          "Instead of fixing errors by hand one by one, the supervisor wrote rules: “طنطا”, “Tanta branch” and “Tanta” all become “Tanta”. Dates written as text become dates. Exact duplicates are removed, keeping one copy. Negative quantities aren't fixed; they're flagged for review."),
        u("القواعد دي اتكتبت في ملف لوحده، والأداة بتطبّقها على نسخة. الملفات الأصلية ما اتلمستش، وكل تعديل اتسجّل: أنهي قاعدة، وكام صف اتأثر. ولما فرع رابع ينضم الشهر الجاي، نفس القواعد هتشتغل عليه.",
          "These rules live in their own file, and the tool applies them to a copy. The original files were never touched, and every change was logged: which rule, and how many rows it affected. When a fourth branch joins next month, the same rules will run on it.")],
        answer: u("كل تعديل يبقى بقاعدة مكتوبة، ويتطبّق على نسخة، ويتسجّل. لأن التصليح بالإيد ما بيتكررش بنفس الطريقة، والقاعدة المكتوبة بتتراجع وبتتعاد.", "Every change follows a written rule, runs on a copy and is logged — manual fixes are never repeated the same way, while a written rule can be reviewed and rerun."),
        idea: u("القاعدة المكتوبة بتتراجع… والتصليح بالإيد بيتنسي.", "A written rule can be reviewed… a hand fix gets forgotten.")
      },
      {
        id: "link", art: "b_link", year: u("الربط", "Link"), mark: u("٠٦", "06"), era: u("مع الشيتات الصغيرة", "With the small sheets"),
        title: u("الربط بالشيتات الصغيرة… واللي ما اتربطش ليه شيت", "Linking to the small sheets… and a sheet for what didn't link"),
        story: [u("الجدول الكبير فيه كود الصنف بس. أما اسمه ومجموعته وسعره الرسمي فموجودين في شيت صغير اسمه «الأصناف». فالأداة بتربط بكود الصنف وتضيف الأعمدة دي، زي البحث والربط اللي عملناه في الدرس التامن.",
          "The big table holds only the product code. The product's name, group and list price live in a small sheet called “Products”. So the tool links on the product code and adds those columns, like the lookups we did in lesson eight."),
        u("٩٨٪ من الصفوف اتربطت. والـ ٢٪ الباقيين ما اتحذفوش، اتحطّوا في شيت لوحده اسمه «ما اتربطش»: أكواد صنف جديد لسه مش في القايمة، وأكواد فيها مسافة زيادة. الشيت ده هو اللي فهّم المشرف إن قايمة الأصناف نفسها محتاجة تتحدّث.",
          "98% of the rows linked. The other 2% weren't deleted; they went to their own sheet called “Unmatched”: codes for a new product not yet on the list, and codes with a stray space. That sheet is what showed the supervisor that the product list itself needed updating.")],
        answer: u("الصف اللي ما اتربطش ما يتشالش في صمت، يتحط في شيت لوحده ويتراجع. لأن اللي بيختفي من غير ما تاخد بالك بيخلّي الإجمالي أقل وانت مش عارف ليه.", "A row that didn't link is never dropped silently; it goes to its own sheet for review — what disappears unnoticed makes the total smaller without you knowing why."),
        idea: u("اللي ما اتربطش بيقولك حاجة… اسمعه.", "What didn't link is telling you something… listen.")
      },
      {
        id: "big", art: "b_big", year: u("الحجم", "Size"), mark: u("٠٧", "07"), era: u("لما الملف يكبر على إكسل", "When a file outgrows Excel"),
        title: u("لما الملف يكبر على إكسل… الشغل التقيل يطلع برّه", "When a file outgrows Excel… the heavy work moves outside"),
        story: [u("إكسل ليه حد: حوالي مليون صف في الشيت الواحد، وقبلها بكتير بيبقى تقيل. وملف الربع لوحده ٣٠٠ ألف صف، وكل شهر بيزيد. الحل مش جهاز أقوى. الحل إن الشغل التقيل ما يحصلش جوّه إكسل خالص.",
          "Excel has a limit: about a million rows in one sheet, and it gets heavy long before that. The quarter file alone is 300,000 rows, and it grows every month. The answer isn't a stronger computer. The answer is that the heavy work doesn't happen inside Excel at all."),
        u("الذكاء الاصطناعي كتب للمشرف برنامج صغير بيقرا الملفات من برّه إكسل، صف ورا صف، ويعمل التجميع والفحص والربط، ويطلّع النتيجة الصغيرة بس: جدول ملخّص فيه ٢٬٤٠٠ صف. النتيجة دي هي اللي بتفتح في إكسل، ويتعمل عليها الجدول المحوري بسرعة.",
          "AI wrote the supervisor a small program that reads the files from outside Excel, row by row, does the stacking, checking and linking, and outputs only the small result: a summary table of 2,400 rows. That result is what opens in Excel, where the pivot table runs quickly.")],
        answer: u("البيانات الكبيرة تتعالج برّه إكسل، والنتيجة الصغيرة ترجع له. لأن إكسل اتعمل علشان تشوف الأرقام وتعرضها، مش علشان يشيل مئات الآلاف من الصفوف.", "Big data is processed outside Excel, and the small result comes back to it — Excel was built for looking at and presenting numbers, not for carrying hundreds of thousands of rows."),
        idea: u("التقيل برّه… والخلاصة جوّه إكسل.", "The heavy part outside… the summary inside Excel.")
      },
      {
        id: "folder", art: "b_folder", year: u("الفولدر", "Folder"), mark: u("٠٨", "08"), era: u("مكان واحد منظّم", "One organised place"),
        title: u("فولدر المشروع: كل حاجة في مكانها", "The project folder: everything in its place"),
        story: [u("الملفات كانت متفرقة بين سطح المكتب والإيميل وفلاشة. فالمشرف عمل فولدر واحد للمشروع، وجوّاه أربع فولدرات: «الداخل» فيه نسخ الملفات الأصلية، و«الخارج» فيه النتايج، و«السجل» فيه تقرير كل تشغيل، وملف «القواعد» اللي كتبه للتنضيف.",
          "The files were scattered across the desktop, e-mail and a USB stick. So the supervisor made one project folder with four parts inside: “Input” holds copies of the original files, “Output” holds the results, “Log” holds each run's report, and there is the “Rules” file he wrote for cleaning."),
        u("الفرق ظهر على طول: الشهر الجاي بيحط الملفات الجديدة في «الداخل» ويشغّل الأداة، والنتيجة بتظهر في «الخارج». ولما طلب مساعدة من الذكاء الاصطناعي، بقى يقدر يوريه الفولدر كله بدل ما ينسخ ويلصق ملف ملف.",
          "The difference showed at once: next month he drops the new files into “Input”, runs the tool, and the result appears in “Output”. And when he asked AI for help, he could show it the whole folder instead of copying and pasting file by file.")],
        answer: u("حط شغل كل مشروع في فولدر واحد منظّم: داخل، وخارج، وسجل، وقواعد. لأن التنظيم ده بيخلّي التشغيل الجاي بضغطة، وبيخلّي المساعد يشوف الصورة كاملة.", "Keep each project in one organised folder: input, output, log, rules — it makes the next run one click and lets the assistant see the whole picture."),
        idea: u("فولدر منظّم = شغل بيتعاد من غير مجهود.", "An organised folder = work that reruns effortlessly.")
      },
      {
        id: "editor", art: "b_editor", year: u("المحرر", "Editor"), mark: u("٠٩", "09"), era: u("مكان الشغل لما الملفات تكتر", "Where work happens when files multiply"),
        title: u("المحرر: تشوف الفولدر كله من شاشة واحدة", "The editor: the whole folder on one screen"),
        story: [u("في الشات، كل ملف لازم يتنسخ ويتلصق، والموديل مش شايف غير اللي بعته. أما «المحرر» زي في إس كود، فبرنامج بيفتح الفولدر كله: على جنب الملفات، وفي النص الملف اللي بتراجعه، وتحت مكان بتشغّل منه الأداة وتشوف رسايلها.",
          "In a chat, every file must be copied and pasted, and the model sees only what you sent. An “editor” such as VS Code is a program that opens the whole folder: the files on one side, the file you're reviewing in the middle, and below it a place to run the tool and read its messages."),
        u("والأهم: المساعد الذكي جوّه المحرر بيشوف ملفات الفولدر كلها، فيقدر يقرا القالب والقواعد والسجل مع بعض، ويقترح التعديل في مكانه، وإنت بتوافق أو ترفض. وده اللي هنتعرّف عليه أكتر في الوحدات الجاية.",
          "Most importantly, the smart assistant inside the editor can see every file in the folder, so it can read the template, the rules and the log together and propose a change in place, which you approve or reject. We'll get to know this better in the coming units.")],
        answer: u("لما الملفات تكتر، اشتغل من المحرر مش من الشات. لأن المحرر بيوري المساعد الفولدر كله، فبيفهم المشروع بدل ما يخمّن من ملف واحد.", "When files multiply, work from the editor, not the chat — the editor shows the assistant the whole folder, so it understands the project instead of guessing from one file."),
        idea: u("الشات لسؤال… والمحرر لمشروع.", "The chat for a question… the editor for a project.")
      },
      {
        id: "levels", art: "b_levels", year: u("الذكاء", "Intelligence"), mark: u("١٠", "10"), era: u("مستوى لكل مهمة", "A level for each task"),
        title: u("مش كل مهمة محتاجة أذكى نموذج", "Not every task needs the smartest model"),
        story: [u("النماذج ليها مستويات: نموذج سريع ورخيص بيرد في ثانية، ونموذج «بيفكر» أعمق بياخد وقت أكتر وتكلفة أكتر. المشرف كان بيستخدم الأعمق في كل حاجة، حتى في إنه يغيّر أسماء أعمدة، فكان بيستنى كتير على حاجات بسيطة.",
          "Models come in levels: a fast, cheap model that answers in a second, and a deeper “thinking” model that takes more time and costs more. The supervisor used the deeper one for everything, even renaming columns, so he waited a long time on simple things."),
        u("بعدين قسّم: السريع لتوحيد الأسماء وكتابة رسايل السجل والأسئلة الصغيرة. والعميق لتصميم قواعد الفحص والتنضيف، ولما نتيجة تطلع غريبة ومحتاج يفهم السبب. الشغل بقى أسرع، والنتايج المهمة بقت أدق.",
          "Then he split the work: the fast one for unifying names, writing log messages and small questions; the deep one for designing the checking and cleaning rules, and for when a result looks odd and he needs to understand why. Work got faster, and the important results got more accurate.")],
        answer: u("اختار مستوى النموذج على قد المهمة: السريع للبسيط، والعميق للتخطيط والتحليل. لأن العميق في كل حاجة بطيء ومكلّف، والسريع في التخطيط بيفوّت تفاصيل مهمة.", "Match the model's level to the task: fast for simple work, deep for planning and analysis — deep for everything is slow and costly, and fast for planning misses important details."),
        idea: u("النموذج المناسب للمهمة… مش الأقوى دايمًا.", "The right model for the task… not always the strongest.")
      },
      {
        id: "result", art: "b_result", year: u("النتيجة", "Result"), mark: u("١١", "11"), era: u("جدول واحد مراجَع", "One checked table"),
        title: u("جدول واحد… والإجمالي مطابق للمصدر", "One table… and the total matches the source"),
        story: [u("النتيجة: جدول واحد نضيف من ٣٧ ملف، ومعاه تقرير جودة، وسجل بكل خطوة، وشيت «ما اتربطش». وقبل ما يبعته للمدير، عمل آخر اختبار: عدد الصفوف وإجمالي المبيعات في الجدول الجديد لازم يطابقوا مجموعهم في الملفات الأصلية.",
          "The result: one clean table from 37 files, with a quality report, a log of every step, and an “Unmatched” sheet. Before sending it to the manager, he ran one last test: the row count and total sales in the new table must match their sums across the original files."),
        u("الصفوف نقصت ٣٤٠ صف بالظبط، وهي الصفوف المتكررة اللي اتشالت. والمبيعات نقصت ١٨٬٦٠٠ جنيه، وده بالظبط مجموع قيمة الصفوف دي، ومكتوب في السجل. فبقى عارف كل جنيه راح فين. ولما المدير سأل «الرقم ده مضبوط؟»، المشرف ما قالش «أظن». فتح السجل ووراه.",
          "The rows fell by exactly 340, the duplicates that were removed. Sales fell by 18,600 pounds, exactly the summed value of those rows, as recorded in the log. So he knew where every pound went. When the manager asked “Is this number right?”, the supervisor didn't say “I think so”. He opened the log and showed him.")],
        answer: u("طابق عدد الصفوف وإجمالي القيمة في الجدول النهائي بمجموعهم في المصادر، واشرح أي فرق من السجل. لأن المطابقة دي هي الدليل إن الأرقام ما ضاعتش ولا اتكررت في السكة.", "Reconcile the final table's row count and total value with their sums across the sources, and explain any gap from the log — that reconciliation is the proof that no numbers were lost or doubled on the way."),
        idea: u("الرقم اللي تقدر تثبته… هو الرقم اللي تقدر تثق فيه.", "A number you can prove… is a number you can trust.")
      },
      {
        id: "cliff", art: "b_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("الأرقام جاهزة", "The numbers are ready"),
        title: u("الأرقام جاهزة… والمدير طلب تقرير لكل فرع", "The numbers are ready… and the manager wants a report for each branch"),
        story: [u("الجدول بقى بيتحدّث كل شهر في دقايق، والمدير مبسوط. بس طلب حاجة جديدة: «عايز لكل فرع تقرير في وورد، فيه أرقامه وتعليق عليها، ويتبعت لمديره في إيميل». يعني ٣ تقارير كل شهر، ولو الفروع زادت هيبقوا أكتر.",
          "The table now refreshes every month in minutes, and the manager is pleased. But he asked for something new: “I want a Word report for each branch, with its figures and a comment on them, e-mailed to its manager.” That's three reports a month, and more if branches are added."),
        u("المشرف بص للجدول وفكّر: الأرقام كلها هنا، مراجَعة ومظبوطة. هيرجع ينسخ ويلصق في وورد تاني؟ والسؤال اللي هنكمّل بيه الوحدة دي: الأرقام جاهزة… طب التقرير يتكتب ويتبعت لكل فرع لوحده إزاي؟",
          "The supervisor looked at the table and thought: all the numbers are here, checked and correct. Will he go back to copying and pasting into Word? And the question the rest of this unit answers: the numbers are ready… so how does each branch get its own written report?")],
        answer: u("واجب الأسبوع: هات تلات ملفات حقيقية من شغلك، وجمّعهم في جدول واحد فيه عمود «المصدر»، واطلب تقرير جودة قبل أي تحليل. لأن الملفات دي هتبقى البيانات اللي هنطلّع منها التقارير في دروس الوحدة دي الجاية.", "This week's assignment: take three real files from your work, combine them into one table with a “Source” column, and ask for a quality report before any analysis — those files will be the data we build reports from later in this unit."),
        idea: u("البيانات النضيفة هي أول خطوة لأي تقرير بيطلع لوحده.", "Clean data is the first step of any report that builds itself.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.bigStory]);
})(window.ACADEMY = window.ACADEMY || {});
