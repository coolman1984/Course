/* PowerShell first, and COM — the story deck of lesson k3 (unit 4).
   The planning engineer of unit 3 carries every slide with one question: «إزاي سكريبت يشغّل إكسل كإنه إيدي؟».
   The deck goes from a PC with no Python to a PowerShell script driving Excel through COM: what PowerShell is, what COM
   stands for, the object tree, read-only, one read and one write, alerts off, cleaning up in finally, why not Python's
   COM, the one-click launcher, and Arabic in scripts; it ends on a 300-line tool built at once, which opens k4.
   Drawings are the co_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.comStory = {
    id: "com", lesson: "k3",
    kicker: u("PowerShell وCOM · الحكاية في ٨ دقايق", "PowerShell and COM · the story in 8 minutes"),
    title: u("سكريبت بيشغّل إكسل كأنه إيدك", "A script that drives Excel like your own hands"),
    lead: u("فاكر جهاز مشرف الخط اللي ما عليهوش Python؟ في الحكاية دي مهندس التخطيط بيكتشف إن كل ويندوز جاي ومعاه أداة تقدر تشغّل إكسل نفسه، من غير أي تثبيت.",
      "Remember the line supervisor's machine with no Python? In this story the planning engineer discovers that every Windows comes with a tool that can drive Excel itself, with nothing to install."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي سكريبت يشغّل إكسل كأنه إيدي؟", "How does a script drive Excel as if it were my hands?"),
    finalQuestion: u("طب الأداة كلها نبنيها مرة واحدة، ولا جزء جزء؟", "So do we build the whole tool at once, or part by part?"),
    note: u("الأوامر مكتوبة لـ Windows PowerShell 5.1 اللي موجود على كل أجهزة ويندوز ١٠ و١١. الأرقام توضيحية.", "The commands are written for Windows PowerShell 5.1, which is on every Windows 10 and 11 machine. The figures are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("PowerShell وCOM، في شرائح", "PowerShell and COM, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "found", art: "co_found", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("من غير Python", "No Python"),
        title: u("مفيش Python… لكن فيه حاجة تانية", "No Python… but there is something else"),
        story: [u("على جهاز مشرف الخط، أمر python فتح Microsoft Store. فمهندس التخطيط كتب في نفس النافذة: ‎$PSVersionTable.PSVersion، وظهر الرقم 5.1. ده PowerShell، وهو جاي مع الويندوز نفسه، ويقدر يفتح إكسل ويقرا ويكتب من غير ما نثبّت أي حاجة.",
          "On the line supervisor's machine, the python command opened the Microsoft Store. So the planning engineer typed in the same window: $PSVersionTable.PSVersion, and the number 5.1 appeared. That is PowerShell; it comes with Windows itself, and it can open Excel, read and write, with nothing installed."),
        u("كان فاكر إن النافذة دي للـ IT بس، لكنها لغة سكريبتات كاملة، والـ IT بيدير بيها كل الأجهزة. والسؤال اللي معانا في الحكاية دي: إزاي سكريبت يشغّل إكسل كأنه إيدي؟",
          "He had thought that window was for IT only, but it is a complete scripting language, and IT manages every machine with it. The question we carry in this story: how does a script drive Excel as if it were my hands?")],
        answer: u("قبل ما تطلب تثبيت أي حاجة، شوف الجهاز عليه إيه أصلًا. لأن الأداة اللي مبنية من الموجود بتشتغل النهارده، واللي مستنية تثبيت ممكن تستنى أسابيع.", "Before asking for any install, see what the machine already has — a tool built from what's there runs today; one waiting for an install waits for weeks."),
        idea: u("الأداة كانت موجودة… بس محدش لاحظها.", "The tool was there… nobody had noticed it.")
      },
      {
        id: "ps", art: "co_ps", year: u("PowerShell", "PowerShell"), mark: u("٠٢", "02"), era: u("جاي مع الويندوز", "Ships with Windows"),
        title: u("PowerShell: الطرفية اللي على كل جهاز", "PowerShell: the terminal on every machine"),
        story: [u("PowerShell من مايكروسوفت، وجاي جوّه ويندوز ١٠ و١١ بنسخة 5.1. مش برنامج إضافي ولا باكدج، ده جزء من الويندوز نفسه، والـ IT بيستخدمه كل يوم، وموقّع من مايكروسوفت. علشان كده قسم الأمن عارفه ومطمّن له.",
          "PowerShell comes from Microsoft, inside Windows 10 and 11 as version 5.1. It isn't an extra program or a package; it is part of Windows itself, IT uses it every day, and it is signed by Microsoft. That's why the security team knows it and trusts it."),
        u("وده معناه إن الأداة اللي هتتبني بيه هتشتغل على أي جهاز ويندوز في الشركة، من غير ما حد يثبّت حاجة. علشان كده PowerShell في الوحدة دي هو الاختيار الأول، وPython النقي للشغل اللي كله بيانات.",
          "That means a tool built with it will run on any Windows machine in the company, with nobody installing anything. That's why PowerShell is the first choice in this unit, and pure Python is for work that is all data.")],
        answer: u("خلّي PowerShell أول اختيار لأي أداة هتشتغل على أجهزة ناس تانية. لأنه الأداة الوحيدة اللي إنت متأكد إنها موجودة على كل جهاز ويندوز في الشركة.", "Make PowerShell the first choice for any tool that will run on other people's machines — it is the one tool you're sure is on every Windows machine in the company."),
        idea: u("الموجود في كل مكان… هو أول اختيار.", "What's everywhere… comes first.")
      },
      {
        id: "com", art: "co_com", year: u("COM", "COM"), mark: u("٠٣", "03"), era: u("برنامج بيشغّل برنامج", "One program drives another"),
        title: u("COM: لغة مشتركة بين برامج الويندوز", "COM: a shared language between Windows programs"),
        story: [u("طب PowerShell بيكلّم إكسل إزاي؟ عن طريق COM، اختصار Component Object Model، يعني «نموذج المكوّنات». دي طريقة من مايكروسوفت من التسعينات، بتخلّي أي برنامج يقدّم نفسه كـ«كائن» تقدر تتحكم فيه من برّه.",
          "So how does PowerShell talk to Excel? Through COM, short for Component Object Model. It is a Microsoft method from the 1990s that lets any program present itself as an “object” you can control from outside."),
        u("مهندس التخطيط كتب سطر واحد: ‎$xl = New-Object -ComObject Excel.Application. ومن غير ما يظهر حاجة على الشاشة، إكسل اشتغل في الخلفية ومستني أوامر: افتح، اقرا، اكتب، احفظ. دلوقتي ‎$xl هو إكسل نفسه، بس بتكلّمه بالكتابة.",
          "The planning engineer typed one line: $xl = New-Object -ComObject Excel.Application. Without anything showing on screen, Excel started in the background, waiting for orders: open, read, write, save. Now $xl is Excel itself, only you talk to it by typing.")],
        answer: u("استخدم COM علشان تشغّل برامج الأوفيس الحقيقية، مش نسخة شبهها. لأن إكسل نفسه هو اللي بيحسب المعادلات ويعمل الجداول، فالنتيجة بتطلع زي ما إنت بتعملها بإيدك بالظبط.", "Use COM to drive the real Office programs, not an imitation — Excel itself calculates the formulas and builds the tables, so the result is exactly what you'd make by hand."),
        idea: u("سطر واحد… وإكسل مستني أوامرك.", "One line… and Excel awaits your orders.")
      },
      {
        id: "tree", art: "co_tree", year: u("الشجرة", "The tree"), mark: u("٠٤", "04"), era: u("من البرنامج للخلية", "From the program to the cell"),
        title: u("من إكسل للخلية: شجرة من ٦ مستويات", "From Excel to the cell: a six-level tree"),
        story: [u("إكسل من جوّه زي الشجرة: Application هو البرنامج، وتحته Workbooks يعني كل الملفات المفتوحة، وتحتها Workbook يعني ملف واحد، وتحته Worksheets، وتحتها Worksheet يعني شيت واحد، وتحته Range يعني خلية أو مجموعة خلايا.",
          "Inside, Excel is like a tree: Application is the program; under it Workbooks, all the open files; under that a Workbook, one file; under it Worksheets; under that a Worksheet, one sheet; and under it a Range, one cell or a group of cells."),
        u("وكل سطر في السكريبت بينزل في الشجرة دي. مثلًا ‎$wb.Worksheets.Item(\"Production\").Range(\"A1\") معناه: الملف، ثم شيت Production، ثم الخلية A1. مهندس التخطيط رسم الشجرة على ورقة، وبقى يقرا أي سكريبت إكسل ويعرف هو واقف فين.",
          "Every line of a script walks down this tree. For example $wb.Worksheets.Item(\"Production\").Range(\"A1\") means: the file, then the Production sheet, then cell A1. The planning engineer drew the tree on paper, and could then read any Excel script and know where it stands.")],
        answer: u("اعرف شجرة إكسل علشان تقرا أي سكريبت COM. لأن كل سطر فيه عنوان: برنامج، وملف، وشيت، وخلية، ولو العنوان غلط بتعرف الغلط فين.", "Know Excel's tree so you can read any COM script — every line holds an address: program, file, sheet, cell, and when the address is wrong you know where."),
        idea: u("كل سطر… عنوان في الشجرة.", "Every line… an address in the tree.")
      },
      {
        id: "readonly", art: "co_readonly", year: u("للقراءة بس", "Read-only"), mark: u("٠٥", "05"), era: u("ملفات المصدر", "Source files"),
        title: u("افتح ملف المصدر… للقراءة بس", "Open the source file… read-only"),
        story: [u("أول سكريبت بيفتح Week_01.xlsx ويعدّ صفوفه. والسطر المهم هو سطر الفتح: ‎$xl.Workbooks.Open(المسار, 0, $true). آخر ‎$true معناها read-only، يعني للقراءة بس. فلو السكريبت غلط وكتب حاجة، الملف الأصلي مش هيتأثر.",
          "The first script opens Week_01.xlsx and counts its rows. The important line is the opening one: $xl.Workbooks.Open(path, 0, $true). The final $true means read-only. So if the script goes wrong and writes something, the original file is not touched."),
        u("وكمان لو حد فاتح الملف على جهازه، فتحه للقراءة بس مش هيعمل أي تعارض. السكريبت طبع: ١٨ صف تحت العناوين. ودي نفس قاعدة الكتاب: ما تغيّرش في البيانات الأصلية، واكتب أي ناتج في فولدر Output.",
          "And if someone has the file open on their machine, opening it read-only causes no conflict. The script printed: 18 rows under the headers. That's the book's own rule: don't change the original data, and write any output to an Output folder.")],
        answer: u("افتح ملفات المصدر للقراءة بس، واكتب الناتج في فولدر تاني. لأن الملف الأصلي هو مرجعك الوحيد لو حاجة غلطت.", "Open source files read-only, and write output to another folder — the original file is your only reference if anything goes wrong."),
        idea: u("الملف الأصلي… ما يتغيّرش.", "The original file… never changes.")
      },
      {
        id: "array", art: "co_array", year: u("مرة واحدة", "Once"), mark: u("٠٦", "06"), era: u("قراية وكتابة", "Read and write"),
        title: u("اقرا الشيت مرة واحدة… مش خلية خلية", "Read the sheet once… not cell by cell"),
        story: [u("السكريبت الأول كان بيقرا خلية خلية: ٩٠ خلية لكل أسبوع، وكل خلية رحلة بين PowerShell وإكسل، فخد ٤٠ ثانية. ولما اتغيّر سطر واحد بس: ‎$data = $ws.UsedRange.Value2، الشيت كله جه في مصفوفة واحدة، في رحلة واحدة.",
          "The first script read cell by cell: 90 cells per week, each cell a trip between PowerShell and Excel, and it took 40 seconds. When just one line changed — $data = $ws.UsedRange.Value2 — the whole sheet came as one array, in one trip."),
        u("ونفس الكلام في الكتابة: المصفوفة بتتملا في الذاكرة، وبعدين تتكتب في الشيت مرة واحدة. الأداة بقت تخلص في ٤ ثواني. ومع أسبوعين الفرق ثواني، لكن مع ١٣ أسبوع الفرق ممكن يوصل لربع ساعة.",
          "The same goes for writing: the array is filled in memory, then written to the sheet at once. The tool now finished in 4 seconds. With two weeks the difference is seconds, but with 13 weeks it can reach a quarter of an hour.")],
        answer: u("اقرا الشيت كله مرة واحدة، واكتبه مرة واحدة. لأن كل رحلة بين السكريبت وإكسل بتاخد وقت، والرحلة الواحدة أسرع بكتير من آلاف الرحلات.", "Read the whole sheet once and write once — every trip between the script and Excel takes time, and one trip beats thousands."),
        idea: u("رحلة واحدة… بدل ألف رحلة.", "One trip… instead of a thousand.")
      },
      {
        id: "alerts", art: "co_alerts", year: u("الرسايل", "Alerts"), mark: u("٠٧", "07"), era: u("إكسل مخفي", "Hidden Excel"),
        title: u("رسالة محدش شافها… وقّفت الأداة", "A message nobody saw… stopped the tool"),
        story: [u("مرة السكريبت فضل شغال عشر دقايق من غير ما يخلص. السبب إن إكسل كان مخفي، وظهرت رسالة «تحب تحفظ التغييرات؟» ومستنية حد يضغط، ومحدش شايفها أصلًا.",
          "Once the script kept running for ten minutes without finishing. The reason: Excel was hidden, and a message appeared, “Do you want to save the changes?”, waiting for someone to click, and nobody could even see it."),
        u("الحل سطرين في أول السكريبت: ‎$xl.Visible = $false، و‎$xl.DisplayAlerts = $false. وأي حفظ أو قفل بيتكتب صراحة في الكود: احفظ هنا، واقفل من غير حفظ هناك. كده إكسل عمره ما هيسأل.",
          "The fix is two lines at the top of the script: $xl.Visible = $false and $xl.DisplayAlerts = $false. And every save or close is written explicitly in the code: save here, close without saving there. That way Excel never asks.")],
        answer: u("اقفل رسايل إكسل، واكتب في الكود صراحة إمتى يحفظ وإمتى لأ. لأن إكسل المخفي لو سأل سؤال، محدش هيجاوبه، والأداة هتفضل مستنية.", "Turn off Excel's alerts, and say in the code exactly when to save and when not — a hidden Excel that asks a question gets no answer, and the tool waits forever."),
        idea: u("إكسل المخفي… ما ينفعش يسأل.", "A hidden Excel… mustn't ask.")
      },
      {
        id: "finally", art: "co_finally", year: u("التنضيف", "Clean-up"), mark: u("٠٨", "08"), era: u("finally", "finally"),
        title: u("٥ نسخ إكسل شغالة في الخلفية", "5 copies of Excel running in the background"),
        story: [u("بعد يومين تجارب، جهازه بقى بطيء جدًا. فتح Task Manager ولقى ٥ نسخ EXCEL.EXE شغالة من غير ما يكون ليها شبابيك. كل تشغيل وقف بخطأ في النص ساب إكسل مفتوح وراه، وكمان حاجز الملفات.",
          "After two days of trials, his machine became very slow. He opened Task Manager and found 5 copies of EXCEL.EXE running with no windows. Every run that stopped on an error halfway had left Excel open behind it, holding the files too."),
        u("الحل جزء اسمه finally في آخر السكريبت، وده بيتنفّذ دايمًا، حتى لو حصل خطأ. جواه: اقفل الملف، ونفّذ ‎$xl.Quit()‎، وReleaseComObject علشان الويندوز يحرّر إكسل من الذاكرة. ومن ساعتها Task Manager بيبقى فاضي بعد كل تشغيل.",
          "The fix is a part called finally at the end of the script, which always runs, even after an error. Inside it: close the file, run $xl.Quit(), and ReleaseComObject so Windows frees Excel from memory. Since then Task Manager has been empty after every run.")],
        answer: u("أي سكريبت بيفتح إكسل لازم يقفله ويحرّره في finally. لأن الخطأ بيوقف السكريبت بس، وإكسل بيفضل شغال لحد ما حد يقفله.", "Any script that opens Excel must quit and release it in finally — an error stops only the script; Excel keeps running until someone closes it."),
        idea: u("اللي فتحته… اقفله، حتى لو حصل خطأ.", "What you open… close, even after an error.")
      },
      {
        id: "python", art: "co_python", year: u("وPython؟", "And Python?"), mark: u("٠٩", "09"), era: u("مين يعمل إيه", "Who does what"),
        title: u("Python يقدر يكلّم COM… بس بباكدج", "Python can talk to COM… but with a package"),
        story: [u("طب ليه ما نستخدمش Python مع COM؟ Python يقدر، بس محتاج باكدج اسمها pywin32، والباكدج ممنوعة. فطلعت قاعدة بسيطة: أي شغل جوّه ملف أوفيس يبقى بـ PowerShell، والبيانات تبقى بـ Python النقي.",
          "So why not use Python with COM? Python can, but it needs a package named pywin32, and packages are blocked. So a simple rule came out: any work inside an Office file is done with PowerShell, and the data with pure Python."),
        u("والاتنين بيتكلموا مع بعض عن طريق ملف CSV: PowerShell بيحفظ الشيت CSV، وPython بيقراه بـ csv من المكتبة القياسية. ودي الطريقة اللي الوحدة كلها ماشية بيها: الأوفيس لـ PowerShell، وقاعدة البيانات والـ PDF والصفحة لـ Python.",
          "And the two talk to each other through a CSV file: PowerShell saves the sheet as CSV, and Python reads it with csv from the standard library. That's how the whole unit works: Office for PowerShell; the database, the PDF and the page for Python.")],
        answer: u("الأوفيس لـ PowerShell، والبيانات لـ Python النقي، والجسر بينهم ملف CSV. لأن كده كل أداة بتستخدم اللي موجود ومسموح، ومن غير ولا باكدج.", "Office to PowerShell, data to pure Python, and a CSV file as the bridge — that way each tool uses what is there and allowed, with no package at all."),
        idea: u("كل أداة في مكانها… والـ CSV بينهم.", "Each tool in its place… CSV between them.")
      },
      {
        id: "bat", art: "co_bat", year: u("ضغطة واحدة", "One click"), mark: u("١٠", "10"), era: u("ملف التشغيل", "The launcher"),
        title: u("مشرف الخط مش هيكتب أوامر", "The line supervisor won't type commands"),
        story: [u("مشرف الخط مش هيفتح PowerShell ويكتب أوامر. فمهندس التخطيط عمل ملف Run_Count.bat فيه سطرين: powershell -NoProfile -ExecutionPolicy Bypass -File \"%~dp0count_rows.ps1\"، وبعده pause. دبل كليك على الملف، والسكريبت يشتغل، والنافذة تفضل مفتوحة لحد ما يقرا النتيجة.",
          "The line supervisor won't open PowerShell and type commands. So the planning engineer made a file Run_Count.bat holding two lines: powershell -NoProfile -ExecutionPolicy Bypass -File \"%~dp0count_rows.ps1\", then pause. Double-click the file, the script runs, and the window stays open until he reads the result."),
        u("و‎%~dp0 معناها «الفولدر اللي الملف ده موجود فيه»، فالملف بيشتغل من أي مكان. وBypass بتسمح للسكريبت ده بس إنه يشتغل من الملف ده، ومش بتغيّر إعدادات الجهاز. علشان كده ما تتحطش غير لسكريبت إنت راجعته.",
          "%~dp0 means “the folder this file is in”, so the file works from anywhere. Bypass lets this one script run from this file only, and changes no machine settings. That's why it goes only on a script you have reviewed.")],
        answer: u("أي أداة هيستخدمها حد تاني، اعمل لها ملف تشغيل بدبل كليك وبمسار ‎%~dp0. لأن اللي هيستخدمها مش هيكتب أوامر، والمسار الثابت على جهازك مش هيشتغل عنده.", "For any tool meant for someone else, make a double-click launcher with a %~dp0 path — its user won't type commands, and a path fixed to your machine won't work on theirs."),
        idea: u("دبل كليك… ومش محتاج يعرف أي حاجة.", "A double-click… and they need to know nothing.")
      },
      {
        id: "bom", art: "co_bom", year: u("العربي", "Arabic"), mark: u("١١", "11"), era: u("ترميز الملف", "File encoding"),
        title: u("الرسالة العربي ظهرت حروف غريبة", "The Arabic message came out as strange characters"),
        story: [u("مهندس التخطيط طلب إن رسايل السكريبت تبقى بالعربي، علشان مشرف الخط يفهمها. وفي أول تشغيل، الرسالة ظهرت حروف غريبة. السبب إن Windows PowerShell 5.1 بيقرا السكريبت غلط لو اتحفظ UTF-8 من غير BOM.",
          "The planning engineer asked for the script's messages to be in Arabic, so the line supervisor would understand them. On the first run, the message came out as strange characters. The reason: Windows PowerShell 5.1 misreads a script saved as UTF-8 without a BOM."),
        u("الحل إن السكريبت يتحفظ بترميز «UTF-8 with BOM». في المفكرة بتختار الترميز ده من «حفظ باسم»، والأداة في الطرفية تقدر تحفظه كده لو طلبت منها. وبعدها الرسالة ظهرت صح: «تم: ١٨ صف في Week_01».",
          "The fix is to save the script as “UTF-8 with BOM”. In Notepad you choose that encoding from “Save as”, and the tool in the terminal can save it that way if you ask. After that the message showed correctly: “Done: 18 rows in Week_01”.")],
        answer: u("أي سكريبت PowerShell فيه عربي لازم يتحفظ UTF-8 with BOM. لأن النسخة اللي على كل الأجهزة (5.1) بتقرا العربي غلط من غير العلامة دي.", "Any PowerShell script holding Arabic is saved as UTF-8 with BOM — the version on every machine (5.1) misreads Arabic without that mark."),
        idea: u("علامة صغيرة… والعربي يتقري صح.", "A small mark… and the Arabic reads right.")
      },
      {
        id: "cliff", art: "co_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("٣٠٠ سطر", "300 lines"),
        title: u("الأداة كلها في طلب واحد… طلعت ٣٠٠ سطر", "The whole tool in one request… came out as 300 lines"),
        story: [u("بعد ما فهم PowerShell وCOM، كتب طلب واحد كبير: «اعمل الأداة كلها: اجمع الأسبوعين، وهات اسم البلد، واعمل التقرير». الأداة كتبت سكريبت من ٣٠٠ سطر، اشتغل ووقف عند سطر ٢١٤ برسالة مش مفهومة.",
          "Once he understood PowerShell and COM, he wrote one big request: “Build the whole tool: combine the two weeks, bring the country name, and make the report.” The tool wrote a 300-line script, which ran and stopped at line 214 with a message nobody could understand."),
        u("ومهندس التخطيط ما عرفش الغلطة في التجميع ولا في الأسماء ولا في التقرير، ولا عرف إذا كان الجزء اللي اشتغل قبل الوقفة صح أصلًا. ومن هنا بيبدأ الدرس الجاي: طب الأداة كلها نبنيها مرة واحدة، ولا جزء جزء؟",
          "The planning engineer couldn't tell whether the fault was in the stacking, the names or the report, nor whether the part that ran before the stop was even right. And here the next lesson begins: do we build the whole tool at once, or part by part?")],
        answer: u("واجب الدرس: شغّل ‎$PSVersionTable.PSVersion، واطلب سكريبت صغير يفتح ملف عندك للقراءة بس ويعدّ صفوفه، وشغّله من ملف ‎.bat، وبعدها بص على Task Manager. لأن الأربع حاجات دول هم أساس كل أداة أوفيس جاية.", "This lesson's task: run $PSVersionTable.PSVersion, ask for a small script that opens one of your files read-only and counts its rows, run it from a .bat file, and check Task Manager afterwards — those four things are the base of every Office tool to come."),
        idea: u("الأداة الكبيرة لما توقف… ما بتقولش وقفت فين.", "A big tool that stops… doesn't say where it stopped.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.comStory]);
})(window.ACADEMY = window.ACADEMY || {});
