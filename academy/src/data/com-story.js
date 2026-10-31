/* PowerShell first, and COM — the story deck of lesson k3 (unit 4).
   The planning engineer at the second plant carries every slide with one question: «إزاي سكريبت يشغّل إكسل كإنه إيدي؟».
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
    title: u("سكريبت بيشغّل إكسل كإنه إيدك", "A script that drives Excel like your own hands"),
    lead: u("فاكر جهاز مشرف الخط اللي ما عليهوش Python؟ في الحكاية دي مهندسة التخطيط بتلاقي إن كل ويندوز جاي ومعاه أداة تقدر تشغّل إكسل نفسه، من غير أي تثبيت.",
      "Remember the line supervisor's PC with no Python? In this story the planning engineer finds that every Windows machine comes with a tool that can drive Excel itself, with no install at all."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي سكريبت يشغّل إكسل كإنه إيدي؟", "How does a script drive Excel as if it were my hands?"),
    finalQuestion: u("طب الأداة كلها نبنيها مرة واحدة، ولا حتة حتة؟", "So do we build the whole tool at once, or piece by piece?"),
    note: u("الأوامر مكتوبة لـ Windows PowerShell 5.1 اللي على كل أجهزة ويندوز ١٠ و١١. الأرقام توضيحية.", "The commands are written for Windows PowerShell 5.1, which is on every Windows 10 and 11 machine. The figures are illustrative."),
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
        title: u("مفيش Python… بس فيه حاجة تانية", "No Python… but something else is there"),
        story: [u("على جهاز مشرف الخط، python فتح Microsoft Store. الزميل كتب في نفس النافذة: ‎$PSVersionTable.PSVersion. ظهر: 5.1. «شايفة؟ ده PowerShell، جاي مع الويندوز نفسه. وهو يقدر يفتح إكسل ويقرا ويكتب، من غير ما نسطّب ولا حاجة».",
          "On the line supervisor's PC, python opened the Microsoft Store. The colleague typed in the same window: $PSVersionTable.PSVersion. It showed: 5.1. “See? That's PowerShell, which ships with Windows itself. It can open Excel, read and write, without installing anything.”"),
        u("مهندسة التخطيط كانت فاكرة إن النافذة دي للـ IT بس. «لأ، دي لغة سكريبتات كاملة، والـ IT بيدير بيها الأجهزة كلها». والسؤال اللي ماشي معانا: إزاي سكريبت يشغّل إكسل كإنه إيدي؟",
          "The planning engineer had thought that window was for IT only. “No, it's a full scripting language, and IT manages every machine with it.” The question we carry: how does a script drive Excel as if it were my hands?")],
        answer: u("قبل ما تطلب تثبيت أي حاجة، شوف الجهاز عليه إيه أصلًا. لأن الأداة اللي مبنية من الموجود بتشتغل النهارده، واللي مستنية تثبيت بتستنى أسابيع.", "Before asking for any install, see what the machine already has — a tool built from what's there runs today; one waiting for an install waits for weeks."),
        idea: u("الأداة كانت موجودة… محدش بص.", "The tool was there… nobody looked.")
      },
      {
        id: "ps", art: "co_ps", year: u("PowerShell", "PowerShell"), mark: u("٠٢", "02"), era: u("جاي مع الويندوز", "Ships with Windows"),
        title: u("PowerShell: الطرفية اللي على كل جهاز", "PowerShell: the terminal on every machine"),
        story: [u("PowerShell من مايكروسوفت، وجاي جوّه ويندوز ١٠ و١١ بنسخة 5.1. مش برنامج إضافي ولا باكدج: جزء من الويندوز، والـ IT بيستخدمه كل يوم، وموقّع من مايكروسوفت. علشان كده قسم الأمن عارفه ومطمّن له.",
          "PowerShell comes from Microsoft, built into Windows 10 and 11 as version 5.1. It's no extra program or package: it's part of Windows, IT uses it every day, and it is signed by Microsoft. That's why the security team knows it and trusts it."),
        u("«يعني الأداة اللي هعملها بيه هتشتغل على أي جهاز في الشركة؟» «أي جهاز ويندوز، من غير ما حد يسطّب حاجة. علشان كده في الوحدة دي PowerShell هو الأولوية الأولى، وPython النقي لما الشغل يبقى بيانات».",
          "“So a tool I make with it will run on any machine in the company?” “Any Windows machine, with nobody installing anything. That's why, in this unit, PowerShell comes first, and pure Python when the work is data.”")],
        answer: u("خلّي PowerShell أول اختيار لأي أداة هتشتغل على أجهزة ناس تانية. لأنه الأداة الوحيدة اللي متأكد إنها موجودة على كل جهاز ويندوز في الشركة.", "Make PowerShell the first choice for any tool that will run on other people's machines — it is the one tool you're sure is on every Windows machine in the company."),
        idea: u("الموجود في كل مكان… أول اختيار.", "What's everywhere… comes first.")
      },
      {
        id: "com", art: "co_com", year: u("COM", "COM"), mark: u("٠٣", "03"), era: u("برنامج بيشغّل برنامج", "One program drives another"),
        title: u("COM: لغة مشتركة بين برامج الويندوز", "COM: a shared language between Windows programs"),
        story: [u("«طب PowerShell بيكلّم إكسل إزاي؟» «بـ COM: اختصار Component Object Model، يعني نموذج المكوّنات. طريقة من مايكروسوفت من التسعينات، بتخلّي أي برنامج يقدّم نفسه كـ«كائن» تقدر تتحكم فيه من برّه».",
          "“So how does PowerShell talk to Excel?” “Through COM: short for Component Object Model. A Microsoft method from the nineties that lets any program offer itself as an “object” you can control from outside.”"),
        u("الزميل كتب سطر واحد: ‎$xl = New-Object -ComObject Excel.Application. ومن غير ما حاجة تظهر على الشاشة، إكسل اشتغل في الخلفية، ومستني أوامر: افتح، اقرا، اكتب، احفظ. «دلوقتي ‎$xl ده إكسل نفسه، بس بتكلّميه بالكتابة».",
          "The colleague typed one line: $xl = New-Object -ComObject Excel.Application. Without anything appearing on screen, Excel started in the background, waiting for orders: open, read, write, save. “Now $xl is Excel itself, only you talk to it by typing.”")],
        answer: u("استخدم COM علشان تشغّل برامج الأوفيس الحقيقية، مش نسخة شبهها. لأن إكسل نفسه هو اللي بيحسب المعادلات ويعمل الجداول، فالنتيجة زي ما إنت بتعملها بإيدك بالظبط.", "Use COM to drive the real Office programs, not an imitation — Excel itself calculates the formulas and builds the tables, so the result is exactly what you'd make by hand."),
        idea: u("سطر واحد… وإكسل بيستنى أوامرك.", "One line… and Excel awaits your orders.")
      },
      {
        id: "tree", art: "co_tree", year: u("الشجرة", "The tree"), mark: u("٠٤", "04"), era: u("من البرنامج للخلية", "From the program to the cell"),
        title: u("من إكسل للخلية: شجرة من ٦ مستويات", "From Excel to the cell: a six-level tree"),
        story: [u("«إكسل جوّاه شجرة: Application هو البرنامج، وتحته Workbooks يعني كل الملفات المفتوحة، وتحتها Workbook ملف واحد، وتحته Worksheets، وتحتها Worksheet شيت واحد، وتحته Range يعني خلية أو مجموعة خلايا».",
          "“Excel holds a tree: Application is the program, under it Workbooks, all the open files; under that Workbook, one file; under it Worksheets; under that Worksheet, one sheet; and under it Range, a cell or a group of cells.”"),
        u("«كل سطر في السكريبت بينزل في الشجرة دي. ‎$wb.Worksheets.Item(\"Production\").Range(\"A1\") معناه: الملف، الشيت Production، الخلية A1». مهندسة التخطيط رسمت الشجرة على ورقة، وبقت تقرا أي سكريبت إكسل وتعرف هو واقف فين.",
          "“Every line of the script walks down this tree. $wb.Worksheets.Item(\"Production\").Range(\"A1\") means: the file, the Production sheet, cell A1.” The planning engineer drew the tree on paper, and could now read any Excel script and know where it stood.")],
        answer: u("اعرف شجرة إكسل علشان تقرا أي سكريبت COM. لأن كل سطر فيه عنوان: برنامج، ملف، شيت، خلية، ولو العنوان غلط بتعرف فين.", "Know Excel's tree so you can read any COM script — every line holds an address: program, file, sheet, cell, and when the address is wrong you know where."),
        idea: u("كل سطر… عنوان في الشجرة.", "Every line… an address in the tree.")
      },
      {
        id: "readonly", art: "co_readonly", year: u("للقراءة بس", "Read-only"), mark: u("٠٥", "05"), era: u("ملفات المصدر", "Source files"),
        title: u("افتح ملف المصدر… للقراءة بس", "Open the source file… read-only"),
        story: [u("أول سكريبت: يفتح Week_01.xlsx ويعدّ الصفوف. الزميل وقفها عند سطر الفتح: ‎$xl.Workbooks.Open(المسار, 0, $true). «آخر ‎$true دي معناها read-only. لو السكريبت غلط وكتب حاجة، الملف الأصلي ما يتأثرش».",
          "The first script: open Week_01.xlsx and count the rows. The colleague stopped her at the open line: $xl.Workbooks.Open(path, 0, $true). “That last $true means read-only. If the script goes wrong and writes something, the original file isn't affected.”"),
        u("«وكمان لو حد فاتح الملف على جهازه، القراءة بس مش هتتخانق معاه». السكريبت طبع: ١٨ صف تحت العناوين. وده نفس مبدأ الكتاب: ما تلمسش البيانات الأصلية، واكتب أي ناتج في فولدر Output.",
          "“And if someone has the file open on their machine, reading only won't clash with them.” The script printed: 18 rows under the headers. It's the book's principle: don't touch the original data, and write any output to the Output folder.")],
        answer: u("افتح ملفات المصدر للقراءة بس، واكتب الناتج في فولدر تاني. لأن الملف الأصلي هو مرجعك الوحيد لو حاجة غلطت.", "Open source files read-only, and write output to another folder — the original file is your only reference if anything goes wrong."),
        idea: u("الأصل… ما يتلمسش.", "The original… stays untouched.")
      },
      {
        id: "array", art: "co_array", year: u("مرة واحدة", "Once"), mark: u("٠٦", "06"), era: u("قراية وكتابة", "Read and write"),
        title: u("اقرا الشيت مرة واحدة… مش خلية خلية", "Read the sheet once… not cell by cell"),
        story: [u("السكريبت الأول كان بيقرا خلية خلية: ٩٠ خلية لكل أسبوع، وكل خلية رحلة بين PowerShell وإكسل. خد ٤٠ ثانية. الزميل غيّر سطر واحد: ‎$data = $ws.UsedRange.Value2. الشيت كله جه في مصفوفة واحدة، في رحلة واحدة.",
          "The first script read cell by cell: 90 cells per week, each cell a round trip between PowerShell and Excel. It took 40 seconds. The colleague changed one line: $data = $ws.UsedRange.Value2. The whole sheet came into one array, in one trip."),
        u("نفس الكلام في الكتابة: املا المصفوفة في الذاكرة، واكتبها في الشيت مرة واحدة. الأداة بقت تخلص في ٤ ثواني. «مع أسبوعين الفرق ثواني، بس مع ١٣ أسبوع الفرق ربع ساعة».",
          "The same goes for writing: fill the array in memory, then write it to the sheet at once. The tool now finished in 4 seconds. “With two weeks the difference is seconds; with 13 weeks it's a quarter of an hour.”")],
        answer: u("اقرا الشيت كله مرة واحدة واكتب مرة واحدة. لأن كل رحلة بين السكريبت وإكسل بتاخد وقت، والرحلة الواحدة أسرع من آلاف الرحلات.", "Read the whole sheet once and write once — every trip between the script and Excel takes time, and one trip beats thousands."),
        idea: u("رحلة واحدة… بدل ألف.", "One trip… instead of a thousand.")
      },
      {
        id: "alerts", art: "co_alerts", year: u("الرسايل", "Alerts"), mark: u("٠٧", "07"), era: u("إكسل مخفي", "Hidden Excel"),
        title: u("رسالة محدش شافها… وقفت الأداة", "A message nobody saw… stalled the tool"),
        story: [u("مرة السكريبت فضل شغال عشر دقايق من غير ما يخلص. السبب: إكسل كان مخفي، وطلّع رسالة «تحب تحفظ التغييرات؟» ومستني حد يضغط. ومحدش شايف الرسالة أصلًا.",
          "Once the script kept running for ten minutes without finishing. The reason: Excel was hidden, and had raised a “Save changes?” message, waiting for someone to click. Nobody could even see the message."),
        u("الحل سطرين في أول السكريبت: ‎$xl.Visible = $false، و‎$xl.DisplayAlerts = $false. وأي حفظ أو قفل بيتقال صراحة في الكود: احفظ هنا، واقفل من غير حفظ هناك. كده إكسل عمره ما يسأل.",
          "The fix is two lines at the top of the script: $xl.Visible = $false and $xl.DisplayAlerts = $false. And every save or close is stated in the code: save here, close without saving there. That way Excel never asks.")],
        answer: u("اقفل رسايل إكسل، وقول في الكود صراحة إمتى يحفظ وإمتى لأ. لأن إكسل المخفي لو سأل سؤال، محدش هيجاوبه، والأداة هتفضل مستنية.", "Turn off Excel's alerts, and say in the code exactly when to save and when not — a hidden Excel that asks a question gets no answer, and the tool waits forever."),
        idea: u("إكسل المخفي… ما ينفعش يسأل.", "A hidden Excel… mustn't ask.")
      },
      {
        id: "finally", art: "co_finally", year: u("التنضيف", "Clean-up"), mark: u("٠٨", "08"), era: u("finally", "finally"),
        title: u("٥ نسخ إكسل مستخبية في Task Manager", "Five hidden copies of Excel in Task Manager"),
        story: [u("بعد يومين تجارب، جهازها بقى بطيء جدًا. فتحت Task Manager: ٥ نسخ EXCEL.EXE شغالة من غير شبابيك. كل تشغيل وقف بخطأ في النص، ساب إكسل وراه مفتوح، وحاجز الملفات كمان.",
          "After two days of trials, her machine became very slow. She opened Task Manager: 5 copies of EXCEL.EXE running with no windows. Every run that stopped on an error midway had left Excel open behind it, locking the files too."),
        u("الحل جزء اسمه finally في آخر السكريبت: بيتنفّذ دايمًا، حتى لو حصل خطأ. جواه: اقفل الملف، و‎$xl.Quit()‎، وReleaseComObject علشان الويندوز يحرّر إكسل من الذاكرة. ومن ساعتها Task Manager نضيف بعد كل تشغيل.",
          "The fix is a part called finally at the end of the script: it always runs, even after an error. Inside it: close the file, $xl.Quit(), and ReleaseComObject so Windows frees Excel from memory. Since then Task Manager is clear after every run.")],
        answer: u("أي سكريبت بيفتح إكسل لازم يقفله ويحرّره في finally. لأن الخطأ بيوقف السكريبت بس، وإكسل بيفضل شغال لحد ما حد يقفله.", "Any script that opens Excel must quit and release it in finally — an error stops only the script; Excel keeps running until someone closes it."),
        idea: u("اللي فتحته… اقفله، حتى لو غلطت.", "What you open… close, even after a mistake.")
      },
      {
        id: "python", art: "co_python", year: u("وPython؟", "And Python?"), mark: u("٠٩", "09"), era: u("مين يعمل إيه", "Who does what"),
        title: u("Python يقدر يكلّم COM… بباكدج", "Python can talk to COM… with a package"),
        story: [u("«طب ليه ما نستخدمش Python مع COM على جهازي أنا؟» «Python يقدر، بس محتاج باكدج اسمه pywin32. يعني باكدج، يعني ممنوع». فطلعت القاعدة البسيطة: أي شغل جوّه ملف أوفيس يبقى PowerShell، والبيانات تبقى Python النقي.",
          "“Then why not use Python with COM on my own machine?” “Python can, but it needs a package called pywin32. A package, so blocked.” Hence the simple rule: any work inside an Office file is PowerShell, and data is pure Python."),
        u("«والاتنين يتكلّموا إزاي؟» «بملف CSV: PowerShell يحفظ الشيت CSV، وPython يقراه بـ csv من المكتبة القياسية». ودي الطريقة اللي الوحدة كلها ماشية بيها: الأوفيس لـ PowerShell، وقاعدة البيانات والـ PDF والصفحة لـ Python.",
          "“And how do the two talk?” “Through a CSV file: PowerShell saves the sheet as CSV, and Python reads it with csv from the standard library.” That's how the whole unit works: Office to PowerShell; the database, the PDF and the page to Python.")],
        answer: u("الأوفيس لـ PowerShell، والبيانات لـ Python النقي، والجسر بينهم ملف CSV. لأن كده كل أداة بتستخدم اللي موجود ومسموح، ومفيش ولا باكدج.", "Office to PowerShell, data to pure Python, and a CSV file as the bridge — that way each tool uses what is there and allowed, with no package at all."),
        idea: u("كل أداة في مكانها… والـ CSV بينهم.", "Each tool in its place… CSV between them.")
      },
      {
        id: "bat", art: "co_bat", year: u("ضغطة واحدة", "One click"), mark: u("١٠", "10"), era: u("ملف التشغيل", "The launcher"),
        title: u("مشرف الخط مش هيكتب أوامر", "The line supervisor won't type commands"),
        story: [u("مشرف الخط مش هيفتح PowerShell ويكتب. فالزميل عمل ملف Run_Count.bat فيه سطرين: powershell -NoProfile -ExecutionPolicy Bypass -File \"%~dp0count_rows.ps1\"، وبعده pause. دبل كليك على الملف، والسكريبت يشتغل، والنافذة تفضل مفتوحة لحد ما يقرا النتيجة.",
          "The line supervisor won't open PowerShell and type. So the colleague made a Run_Count.bat file with two lines: powershell -NoProfile -ExecutionPolicy Bypass -File \"%~dp0count_rows.ps1\", then pause. A double-click on the file, the script runs, and the window stays open until he reads the result."),
        u("وشرحلها: ‎%~dp0 يعني «الفولدر اللي الملف ده فيه»، فيشتغل في أي مكان. وBypass بيسمح للسكريبت ده بس يشتغل من الملف ده، ومش بيغيّر إعدادات الجهاز. «علشان كده ما تحطيهوش غير لسكريبت إنتي راجعتيه».",
          "And he explained: %~dp0 means “the folder this file is in”, so it works anywhere. Bypass lets only this script run from this file, without changing the machine's settings. “That's why you only put it on a script you have reviewed.”")],
        answer: u("أي أداة لحد تاني، اعملها ملف تشغيل بدبل كليك ومسار ‎%~dp0. لأن اللي هيستخدمها مش هيكتب أوامر، والمسار الثابت لجهازك مش هيشتغل عنده.", "For any tool meant for someone else, make a double-click launcher with a %~dp0 path — its user won't type commands, and a path fixed to your machine won't work on theirs."),
        idea: u("دبل كليك… ومش محتاج يعرف حاجة.", "A double-click… and they need to know nothing.")
      },
      {
        id: "bom", art: "co_bom", year: u("العربي", "Arabic"), mark: u("١١", "11"), era: u("ترميز الملف", "File encoding"),
        title: u("الرسالة العربي طلعت حروف غريبة", "The Arabic message came out as odd characters"),
        story: [u("مهندسة التخطيط طلبت إن رسايل السكريبت تبقى بالعربي، علشان مشرف الخط يفهمها. أول تشغيل، الرسالة طلعت حروف غريبة. السبب: Windows PowerShell 5.1 بيقرا السكريبت غلط لو اتحفظ UTF-8 من غير BOM.",
          "The planning engineer asked for the script's messages in Arabic, so the line supervisor could understand them. On the first run, the message came out as odd characters. The reason: Windows PowerShell 5.1 misreads a script saved as UTF-8 without a BOM."),
        u("الحل: الحفظ بترميز «UTF-8 with BOM». في المفكرة من «حفظ باسم» بتختار الترميز ده، والأداة في الطرفية بتقدر تحفظه كده لو قلتلها. وبعدها الرسالة طلعت: «تم: ١٨ صف في Week_01».",
          "The fix: save with the “UTF-8 with BOM” encoding. In Notepad, under “Save as”, you choose that encoding, and the terminal tool can save it that way if you tell it. After that the message read: “Done: 18 rows in Week_01”.")],
        answer: u("أي سكريبت PowerShell فيه عربي يتحفظ UTF-8 with BOM. لأن النسخة اللي على كل الأجهزة (5.1) من غير العلامة دي بتقرا العربي غلط.", "Any PowerShell script holding Arabic is saved as UTF-8 with BOM — the version on every machine (5.1) misreads Arabic without that mark."),
        idea: u("علامة صغيرة… والعربي يتقري صح.", "A small mark… and the Arabic reads right.")
      },
      {
        id: "cliff", art: "co_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("٣٠٠ سطر", "300 lines"),
        title: u("طلبت الأداة كلها مرة واحدة… وطلعت ٣٠٠ سطر", "She asked for the whole tool at once… 300 lines came out"),
        story: [u("بعد ما فهمت PowerShell وCOM، كتبت طلب واحد كبير: «اعملي الأداة كلها: جمّع الأسبوعين، وهات اسم البلد، واعمل التقرير». الأداة كتبت سكريبت ٣٠٠ سطر. اشتغل، ووقف عند سطر ٢١٤ برسالة مش مفهومة.",
          "Having understood PowerShell and COM, she wrote one big request: “Make me the whole tool: combine the two weeks, bring the country name, and make the report.” The tool wrote a 300-line script. It ran, and stopped at line 214 with an unclear message."),
        u("مهندسة التخطيط ما عرفتش الغلطة في التجميع ولا في الأسماء ولا في التقرير. ولا عرفت الجزء اللي اشتغل قبل الوقفة كان صح أصلًا. والسؤال اللي الدرس الجاي بيبدأ بيه: طب الأداة كلها نبنيها مرة واحدة، ولا حتة حتة؟",
          "The planning engineer couldn't tell whether the mistake was in the combining, the names or the report. Nor whether the part that ran before the stop was even right. The question the next lesson opens with: do we build the whole tool at once, or piece by piece?")],
        answer: u("واجب الدرس: شغّل ‎$PSVersionTable.PSVersion، واطلب سكريبت صغير يفتح ملف عندك للقراءة بس ويعدّ صفوفه، وشغّله من ملف ‎.bat، وبص على Task Manager بعده. لأن الأربع حاجات دول هم أساس كل أداة أوفيس جاية.", "This lesson's task: run $PSVersionTable.PSVersion, ask for a small script that opens one of your files read-only and counts its rows, run it from a .bat file, and check Task Manager afterwards — those four things are the base of every Office tool to come."),
        idea: u("الأداة الكبيرة لما تقف… ما بتقولش فين.", "A big tool that stops… doesn't say where.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.comStory]);
})(window.ACADEMY = window.ACADEMY || {});
