/* When the tool stops — the story deck of lesson x6, the closing lesson of unit 2, on the lesson's project
   (Lesson_8_Next_Month_Changes: April's weekly files run through lesson 3's tool). The planning engineer carries every
   slide with one question: «لما الأداة توقف أو تغلط… أعمل إيه؟». The deck sorts messages into three families (the file,
   the laptop, the code), meets the common ones (execution policy, encoding, a locked file, a renamed sheet), shows how to
   go back to the model, one change per version, a problem that did not stop the tool (text dates), the three tests
   before sign-off, the tool card — and ends on the cliffhanger into unit 3: the tools coming together in a dashboard inside Excel.
   Each slide gives one rule with its reason. Drawings are the xt_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.runStory = {
    id: "run", lesson: "x6",
    kicker: u("لما الأداة توقف · الحكاية كاملة في ٨ دقايق", "When the tool stops · the whole story in 8 minutes"),
    title: u("لما الأداة توقف: ملفات الشهر الجديد", "When the tool stops: next month's files"),
    lead: u("الأداة الأولى اشتغلت على الربع الأول كله. ودلوقتي تقارير أبريل وصلت، وفيها تغييرات ما حدش قال عليها. هنمشي مع مهندس التخطيط وهو بيشغّل نفس الأداة عليها، ونتعلّم نقرا رسايل الأدوات، ونرجع للنموذج صح، ونختبر قبل ما نعتمد، ونكتب للأداة بطاقة تخلّيها تعيش.",
      "Tool one ran on the whole first quarter. Now April's reports have arrived, with changes nobody announced. We follow the planning engineer as he runs the same tool on them, and learn to read a tool's messages, go back to the model the right way, test before relying, and write the tool a card that keeps it alive."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("لما الأداة توقف أو تغلط… أعمل إيه؟", "When the tool stops or goes wrong… what do I do?"),
    finalQuestion: u("الأدوات شغالة… طب كل ده يبقى داشبورد جوّه إكسل يتحدّث لوحده إزاي؟", "The tools work… so how does all of it become a dashboard inside Excel that updates itself?"),
    note: u("الرسايل بالإنجليزي زي ما بتظهر في ويندوز. نصها الدقيق ممكن يختلف حسب نسخة ويندوز وإكسل. ما تتحايلش على أي إعداد أمان في الجهاز.", "Messages are in English as Windows shows them. Their exact wording may vary with the Windows and Excel version. Never get around a security setting on the laptop."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("لما الأداة توقف، في شرائح", "When the tool stops, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "calm", art: "xt_stop", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("سطر أحمر", "A red line"),
        title: u("ملفات أبريل… وسطر أحمر عند Week_16", "April's files… and a red line at Week_16"),
        story: [u("مهندس التخطيط حط تقارير أبريل الأربعة في فولدر Data، وشغّل نفس أداة الدرس ٣. الشاشة السودا كتبت: Week_14 اتقرا ٩٩ صف، وعمود زيادة اسمه Shift اتساب. Week_15 اتقرا. وعند Week_16 وقفت بسطر أحمر: «Week_16.xlsx: sheet Production not found».",
          "The planning engineer put April's four reports in the Data folder and ran the same tool from lesson 3. The black window wrote: Week_14 read, 99 rows, an extra column named Shift left out. Week_15 read. And at Week_16 it stopped with a red line: “Week_16.xlsx: sheet Production not found.”"),
        u("أول حاجة قالها لنفسه: «الأداة ما اتكسرتش؛ الأداة وقفت». ودول حاجتين مختلفين. الأداة اللي بتوقف برسالة بتقولك فين المشكلة، والأداة اللي بتكمّل بصمت هي اللي فعلًا بتخوّف. والسؤال اللي ماشي معانا: لما الأداة توقف أو تغلط، تعمل إيه؟",
          "The first thing he told himself: “The tool isn't broken; it stopped.” Those are two different things. A tool that stops with a message tells you where the problem is; the one that carries on silently is the one to fear. The question we carry: when a tool stops or goes wrong, what do you do?")],
        answer: u("أول ما الأداة توقف، اقرا الرسالة والسجل قبل ما تغيّر أي حاجة. لأن الرسالة غالبًا فيها مكان المشكلة، والتغيير العشوائي بيضيّعه.", "The moment the tool stops, read the message and the log before changing anything — the message usually holds the problem's location, and random changes lose it."),
        idea: u("الوقفة معلومة… مش كارثة.", "A stop is information… not a disaster.")
      },
      {
        id: "kinds", art: "xt_kinds", year: u("الفرز", "Sorting"), mark: u("٠٢", "02"), era: u("تلات عائلات", "Three families"),
        title: u("كل رسالة جاية من واحد من تلاتة: الملف، أو الجهاز، أو الكود", "Every message comes from one of three: the file, the laptop, or the code"),
        story: [u("مهندس التخطيط علّم زميله سؤال واحد يسأله قبل أي حاجة: الرسالة دي جاية منين؟ لو فيها اسم ملف أو عمود أو شيت، غالبًا المشكلة في الملف. لو فيها «disabled» أو «access» أو حروف غريبة، غالبًا في الجهاز وإعداداته.",
          "The planning engineer taught his colleague one question to ask before anything: where does this message come from? If it names a file, column or sheet, the problem is probably the file. If it says “disabled”, “access”, or shows odd characters, it's probably the laptop and its settings."),
        u("ولو الملف سليم والجهاز سليم والرسالة لسه موجودة، ساعتها بس المشكلة في الكود. والترتيب ده مهم: أغلب الوقفات بتطلع من الملف أو الجهاز، والكود هو آخر احتمال، مش أول احتمال.",
          "Only if the file is sound, the laptop is sound and the message persists is the problem in the code. And the order matters: most stops come from the file or the laptop; the code is the last suspect, not the first.")],
        answer: u("افرز الرسالة الأول: ملف، ولا جهاز، ولا كود. لأن كل نوع ليه حل مختلف، والكود آخر حاجة تشك فيها.", "Sort the message first: file, laptop or code — each kind has a different fix, and the code is the last thing to suspect."),
        idea: u("قبل ما تصلّح… اعرف بتصلّح إيه.", "Before fixing… know what you're fixing.")
      },
      {
        id: "policy", art: "xt_policy", year: u("الجهاز ١", "Laptop 1"), mark: u("٠٣", "03"), era: u("السكريبتات مقفولة", "Scripts locked"),
        title: u("«running scripts is disabled on this system»", "“running scripts is disabled on this system”"),
        story: [u("زميلة تانية جرّبت تشغّل السكريبت بكليك يمين و«Run with PowerShell»، فطلعت الرسالة دي. معناها إن ويندوز مانع تشغيل السكريبتات، ودي سياسة التشغيل. الحل الأول بسيط: تشغّل من ملف ‎.bat اللي جنبه، لأنه بيطلب إذن للتشغيل ده بس.",
          "Another colleague tried running the script with a right click and “Run with PowerShell”, and this message appeared. It means Windows blocks running scripts: the execution policy. The first fix is simple: run it from the .bat file beside it, which asks permission for that run only."),
        u("ولو الرسالة ظهرت تاني حتى من ملف ‎.bat، يبقى قسم IT قافلها من إعدادات الجهاز. هنا القاعدة اللي اتعلمناها: ما تتحايلش. تكلّم IT، أو تطلب نفس الأداة كماكرو تلصقه جوّه إكسل، بنفس القواعد ونفس السجل.",
          "If the message appears even from the .bat file, IT has locked it in the laptop's settings. Here's the rule we learned: don't get around it. Talk to IT, or ask for the same tool as a macro pasted inside Excel, with the same rules and the same log.")],
        answer: u("الرسالة دي عن إعداد في الجهاز، مش عن الكود: ملف ‎.bat الأول، وبعدين IT أو الماكرو. لأن تغيير الكود مش هيحل مشكلة مالهاش علاقة بيه.", "This message concerns a laptop setting, not the code: the .bat file first, then IT or the macro — changing the code won't fix a problem unrelated to it."),
        idea: u("«disabled» = إعداد… مش غلطة.", "“disabled” = a setting… not a mistake.")
      },
      {
        id: "encoding", art: "xt_encoding", year: u("الجهاز ٢", "Laptop 2"), mark: u("٠٤", "04"), era: u("حروف غريبة", "Odd characters"),
        title: u("«Ø§Ù„Ù…Ù„Ù»: العربي اتلخبط", "“Ø§Ù„Ù…Ù„Ù”: the Arabic got scrambled"),
        story: [u("زميل في الوردية التانية طلب نفس الأداة برسايل سجل بالعربي، وشغّلها، فالسجل طلع حروف غريبة زي «Ø§Ù„Ù…Ù„Ù Ø§ØªÙ‚Ø±Ø§» بدل «الملف اتقرا». فاكر شريحة الترميز في حكاية «من الشات لجهازك»؟ ده بالظبط اللي بيحصل لما السكريبت يتحفظ من غير BOM.",
          "A colleague on the second shift asked for the same tool with Arabic log messages, ran it, and the log came out as odd characters like “Ø§Ù„Ù…Ù„Ù Ø§ØªÙ‚Ø±Ø§” instead of «الملف اتقرا». Remember the encoding slide in the story “From the chat to your laptop”? That is exactly what happens when the script is saved without a BOM."),
        u("الحل مش في الكود ولا في الملفات: افتح السكريبت في المفكرة، و«حفظ باسم»، واختار الترميز «UTF-8 with BOM»، واحفظ فوقه. وشغّل تاني. دقيقة واحدة، والسجل بقى مقروء من غير ما سطر يتغيّر.",
          "The fix is neither in the code nor in the files: open the script in Notepad, “Save As”, choose the encoding “UTF-8 with BOM”, and save over it. Run again. One minute, and the log was readable without a line changing.")],
        answer: u("لو العربي ظهر حروف غريبة في الرسايل، المشكلة في ترميز السكريبت. لأن النموذج كتب الكلام صح، والحفظ هو اللي غيّره.", "If Arabic shows up as odd characters in the messages, the problem is the script's encoding — the model wrote the words right, and saving changed them."),
        idea: u("الحروف الغريبة = احفظ تاني بـ BOM.", "Odd characters = save again with a BOM.")
      },
      {
        id: "locked", art: "xt_locked", year: u("الملف", "The file"), mark: u("٠٥", "05"), era: u("الملف مفتوح", "The file is open"),
        title: u("الملف مفتوح في إكسل… وإكسل مستخبي في الخلفية", "The file is open in Excel… and Excel is hiding in the background"),
        story: [u("مرة الأداة وقفت برسالة إن الملف «in use» أو «read-only». السبب كان بسيط: Week_14 كان مفتوح في إكسل قدامه، علشان كان بيبص على عمود Shift. وفي الفولدر ملف صغير اسمه ‎~$Week_14.xlsx، نفس ملف القفل اللي قابلناه في الدرس التاني. قفل الملف، وشغّل تاني، والأداة كمّلت.",
          "Once the tool stopped with a message that the file was “in use” or “read-only”. The cause was simple: Week_14 was open in Excel in front of him, as he'd been looking at the Shift column. And the folder held a small file named ~$Week_14.xlsx — the same lock file we met in lesson two. He closed the file, ran again, and the tool carried on."),
        u("بس مرة تانية مكانش فيه ولا ملف مفتوح، والرسالة لسه موجودة. في «إدارة المهام» لقى تلات نسخ من EXCEL.EXE شغالة من غير شبابيك: بواقي تشغيلات وقفت في النص قبل ما الأداة تتعلّم تقفل إكسل في كل الحالات. قفلهم، واشتغلت.",
          "But another time no file was open and the message remained. In Task Manager he found three copies of EXCEL.EXE running with no windows: leftovers of runs that stopped midway, before the tool learned to close Excel in every case. He ended them, and it ran.")],
        answer: u("قبل أي تشغيل، اقفل ملفات الأداة، واتأكد إن مفيش EXCEL.EXE فاضل في إدارة المهام. لأن الملف المفتوح أو إكسل المستخبي بيقفل الملفات على الأداة.", "Before any run, close the tool's files and check no EXCEL.EXE is left in Task Manager — an open file or a hidden Excel locks the files against the tool."),
        idea: u("الملف المفتوح عندك… مقفول على الأداة.", "A file open for you… is locked for the tool.")
      },
      {
        id: "sheet", art: "xt_sheet", year: u("الملف ٢", "The file 2"), mark: u("٠٦", "06"), era: u("Sheet1", "Sheet1"),
        title: u("Week_16: الشيت اسمه Sheet1… مش Production", "Week_16: the sheet is named Sheet1… not Production"),
        story: [u("نرجع لرسالة Week_16. مهندس التخطيط فتح الملف وقرا اسم الشيت: Sheet1. الخط بعت التقرير الأسبوع ده من برنامج تاني، والبرنامج سمّى الشيت باسمه الافتراضي. العناوين نفسها، والبيانات نفسها، والاسم بس اللي اتغيّر.",
          "Back to Week_16's message. The planning engineer opened the file and read the sheet name: Sheet1. The line sent this week's report from another program, which gave the sheet its default name. The same headers, the same data; only the name changed."),
        u("الأداة عملت الصح لأنها بتدوّر على الشيت بالاسم وبتقول لو ما لقيتهوش. أداة تانية كانت هتطلّع رسالة مبهمة زي 0x800A03EC، أو أسوأ: تقرا أي شيت موجود. والحل مش إنه يغيّر اسم الشيت بإيده، لأن الأسبوع الجاي نفس البرنامج هيعمل نفس الحاجة.",
          "The tool did the right thing: it looks for the sheet by name and says when it isn't found. Another tool would have given a cryptic message such as 0x800A03EC, or worse, read whatever sheet was there. And the fix isn't renaming the sheet by hand, because next week the same program will do the same thing.")],
        answer: u("لما الملف يختلف عن الوصف، قارن الأسماء في الملف بالأسماء في الـ Prompt حرف بحرف. لأن أغلب الوقفات سببها اسم اتغيّر، مش كود غلط.", "When a file differs from the description, compare the names in the file with those in the Prompt letter by letter — most stops come from a renamed item, not wrong code."),
        idea: u("نفس البيانات… باسم تاني.", "The same data… under another name.")
      },
      {
        id: "report", art: "xt_report", year: u("الرجوع للنموذج", "Back to the model"), mark: u("٠٧", "07"), era: u("بالحرف", "Word for word"),
        title: u("لما المشكلة في الكود: ارجع للنموذج بأربع حاجات", "When the problem is the code: go back to the model with four things"),
        story: [u("الجهاز سليم، والملف مختلف عن الوصف. مهندس التخطيط رجع للنموذج بـ Prompt.txt بتاع مشروع الدرس، في نفس المحادثة اللي الأداة اتكتبت فيها في الدرس ٣، علشان يفتكر القواعد اللي اتفقوا عليها. وبعتله أربع حاجات: الرسالة بالحرف، وآخر ١٠ سطور من السجل، واسم الملف اللي وقف عنده، ونسخة PowerShell.",
          "The laptop is sound, and the file differs from the description. The planning engineer went back to the model with the project's Prompt.txt, in the same chat where the tool was written in lesson 3, so it would remember the agreed rules. He sent four things: the message word for word, the last 10 lines of the log, the file it stopped at, and the PowerShell version."),
        u("وطلب منه حاجة قبل الكود: «قولّي في ٣ سطور المشكلة غالبًا فين، واقترح قاعدة واحدة». النموذج رد: «الملف فيه شيت واحد اسمه Sheet1. أقترح: لو الملف فيه شيت واحد بس، يتقري مهما كان اسمه، ويتسجّل ده». مهندس التخطيط وافق.",
          "And he asked for something before code: “Tell me in 3 lines where the problem most likely is, and propose one rule.” The model replied: “The file has one sheet, named Sheet1. I suggest: if a file has only one sheet, read it whatever its name, and log that.” The planning engineer agreed.")],
        answer: u("ابعت للنموذج الرسالة والسجل والملف والنسخة، في نفس المحادثة. لأن «مش شغالة» من غير تفاصيل بتطلّع تعديلات عشوائية.", "Send the model the message, the log, the file and the version, in the same chat — “it doesn't work” without details yields random edits."),
        idea: u("النموذج بيصلّح اللي بيشوفه… فورّيه كويس.", "The model fixes what it sees… so show it well.")
      },
      {
        id: "versions", art: "xt_versions", year: u("التعديل", "The change"), mark: u("٠٨", "08"), era: u("واحد في المرة", "One at a time"),
        title: u("تعديل واحد… ونسخة باسم جديد", "One change… and a version with a new name"),
        story: [u("النموذج اقترح تلات تعديلات مرة واحدة. مهندس التخطيط قاله: «واحد بس، الأهم». لأن لو التلاتة اتعملوا والأداة اشتغلت، مش هيعرف أنهي واحد صلّح. ولو اتعملوا والأداة اتلخبطت أكتر، مش هيعرف أنهي واحد عمل المشكلة.",
          "The model suggested three changes at once. The planning engineer said: “Just one, the most important.” Because if all three were made and the tool ran, he wouldn't know which one fixed it. And if they were made and the tool got worse, he wouldn't know which one caused it."),
        u("والقاعدة الجديدة اتحفظت في ملف جديد: ‎stack_tool_v2.ps1. والتشغيل التاني خلص الأربع ملفات، وWeek_17 طلع صفر صفوف من غير وقفة: أسبوع صيانة، والأداة كتبت «0 rows» وكمّلت. والقديم بيفضل جنبه. لو v3 طلع أسوأ، يرجع لـ v2 في ثانية. وفي بطاقة الأداة سطر لكل نسخة: اتغيّر فيها إيه، وليه.",
          "The new rule was saved in a new file: stack_tool_v2.ps1. The second run finished all four files, and Week_17 came out at zero rows without a stop: a maintenance week, and the tool wrote “0 rows” and carried on. The old one stays beside it. If v3 turns out worse, he goes back to v2 in a second. And the tool card holds a line per version: what changed, and why.")],
        answer: u("غيّر حاجة واحدة في المرة، واحفظ كل نسخة باسم جديد. لأنك محتاج تعرف إيه اللي صلّح، وتقدر ترجع للي كان شغال.", "Change one thing at a time and save each version under a new name — you need to know what fixed it, and to be able to return to what worked."),
        idea: u("تعديل واحد = سبب واحد واضح.", "One change = one clear cause.")
      },
      {
        id: "dates", art: "xt_dates", year: u("الصامت", "The silent one"), mark: u("٠٩", "09"), era: u("ما وقفتش", "It didn't stop"),
        title: u("Week_15: ١٠٤ تاريخ نص… والأداة ما وقفتش", "Week_15: 104 text dates… and the tool didn't stop"),
        story: [u("التشغيل خلص، بس مهندس التخطيط عمل مراجعته المعتادة: جدول محوري بالشهر. لقى ١٠٤ صف من غير شهر. كلهم من Week_15: التواريخ مكتوبة نص زي «09/04/2026»، والأداة نسختها زي ما هي، لأن مفيش قاعدة في الـ Prompt بتقول التاريخ لازم يبقى تاريخ.",
          "The run finished, but the planning engineer did his usual check: a pivot by month. He found 104 rows with no month. All from Week_15: the dates were typed as text like “09/04/2026”, and the tool copied them as they were, because no rule in the Prompt said a date must be a date."),
        u("وهنا سؤال النموذج: «09/04» يبقى ٩ أبريل ولا ٤ سبتمبر؟ مهندس التخطيط جاوب: «اليوم الأول، زي ما بنكتب في مصر». ونسخة v3 فيها قاعدتين: التاريخ النص يتحوّل يوم/شهر/سنة، وأي قيمة في Date مش تاريخ بعد التحويل توقف الأداة. مش كل مشكلة بتوقف الأداة لوحدها.",
          "And here is the model's question: is “09/04” 9 April or 4 September? The planning engineer answered: “day first, as we write it in Egypt.” Version v3 holds two rules: a text date is converted as day/month/year, and any Date value still not a date after converting stops the tool. Not every problem stops a tool by itself.")],
        answer: u("بعد أي تشغيل، راجع الناتج بطريقة تانية، زي جدول محوري بالشهر. لأن المشكلة اللي ما ليهاش قاعدة بتعدّي من غير رسالة.", "After any run, check the output another way, such as a pivot by month — a problem with no rule passes without a message."),
        idea: u("اللي ما وقّفش الأداة… لازم المراجعة توقّفه.", "What didn't stop the tool… the check must stop.")
      },
      {
        id: "tests", art: "xt_tests", year: u("الاعتماد", "Sign-off"), mark: u("١٠", "10"), era: u("تلات اختبارات", "Three tests"),
        title: u("تلات اختبارات قبل ما تعتمد على أي أداة", "Three tests before relying on any tool"),
        story: [u("مهندس التخطيط لخّص الاعتماد في تلات اختبارات بيعملهم على كل أداة. الأول: العدد، عدد الصفوف في السجل يساوي العدد الحقيقي. التاني: الإجمالي، إجمالي الناتج يساوي إجمالي المصدر أو المفتاح. التالت: المشاكل، كل مشكلة معروفة اتعاملت صح، ونسخ مكسورة بالقصد: ملف ناقص عمود Value لازم يوقّفها، وملف عناوين بس زي Week_17 لازم يعدّي بصفر صفوف.",
          "The planning engineer reduced sign-off to three tests he runs on every tool. First: the count — the log's row count equals the real one. Second: the total — the output's total equals the source or the key. Third: the problems — every known problem was handled right, and deliberately broken copies behave: a file missing its Value column must stop it, and a headers-only file like Week_17 must pass with zero rows."),
        u("على ملفات أبريل: ٢٩٠ صف، و٦٬٨١٠ جهاز، زي مفتاح الإجابة. لو التلاتة عدّوا، الأداة تتعتمد. لو واحد فشل، الأداة ترجع للتصليح، والتقرير يتعمل بالإيد الشهر ده. والتلات اختبارات بيتكتبوا في بطاقة الأداة بنتيجتهم، علشان أي حد يقدر يعيدهم.",
          "On April's files: 290 rows and 6,810 units, as in the answer key. If all three pass, the tool is signed off. If one fails, the tool goes back for fixing and this month's report is made by hand. And the three tests are written on the tool card with their results, so anyone can repeat them.")],
        answer: u("ما تعتمدش على أداة إلا لما تعدّي العدد والإجمالي والمشاكل. لأن كل اختبار بيمسك نوع مختلف من الغلط.", "Rely on a tool only once it passes the count, the total and the problems — each test catches a different kind of mistake."),
        idea: u("العدد + الإجمالي + المشاكل = ثقة.", "The count + the total + the problems = trust.")
      },
      {
        id: "card", art: "xt_card", year: u("البطاقة", "The card"), mark: u("١١", "11"), era: u("الأداة تعيش", "The tool lives on"),
        title: u("بطاقة الأداة: صفحة واحدة بتخلّيها تعيش سنين", "The tool card: one page that keeps it alive for years"),
        story: [u("جنب كل أداة، مهندس التخطيط حط ملف اسمه Tool_Card.txt. فيه: الأداة بتعمل إيه في سطرين، والملفات والشيتات والأعمدة بالحرف، وكل القواعد بما فيها إجاباته على أسئلة النموذج، والتلات اختبارات ونتيجتهم، وسطر لكل نسخة: v2 الشيت، وv3 التواريخ.",
          "Beside each tool, the planning engineer put a file named Tool_Card.txt. It holds: what the tool does in two lines, the files, sheets and columns letter for letter, every rule including his answers to the model's questions, the three tests and their results, and a line per version: v2 the sheet, v3 the dates."),
        u("وجه يوم الاختبار الحقيقي: زميلة شغالة على ChatGPT طلبت نفس الأداة. مهندس التخطيط ادّاها البطاقة بس، مش السكريبت. لصقتها في محادثة جديدة، والنموذج بنى نفس الأداة في ربع ساعة، من غير ما يسألها حاجة اتسألت قبل كده. والاختبارات التلاتة عدّت.",
          "Then came the real test: a colleague working on ChatGPT asked for the same tool. The planning engineer gave her the card only, not the script. She pasted it into a new chat, and the model built the same tool in a quarter of an hour, without asking her anything already asked. And the three tests passed.")],
        answer: u("اكتب لكل أداة بطاقة فيها الوصف والقواعد والاختبارات. لأن البطاقة بتبني الأداة تاني على أي نموذج، والسكريبت لوحده بيموت مع أول تغيير.", "Write each tool a card with its description, rules and tests — the card rebuilds the tool on any model, while the script alone dies at the first change."),
        idea: u("السكريبت بيتكتب تاني… والبطاقة هي الأداة.", "The script can be rewritten… the card is the tool.")
      },
      {
        id: "cliff", art: "xt_cliff", year: u("الوحدة الجاية", "Next unit"), mark: u("١٢", "12"), era: u("طلب المدير", "The manager's request"),
        title: u("كل حاجة اشتغلت… والمدير عايز يدوس ويشوف", "Everything worked… and the manager wants to click and see"),
        story: [u("خمس أدوات، وخمس بطاقات، واختبارات بتعدّي كل شهر: تحت بعض، وبحث وربط، وتقرير قصاد الخطة، ومطابقة المشتريات، وطلب الخامات. ساعات الشغل بقت دقايق. وفي أول أكتوبر مدير المصنع قال: «الربع التالت خلص. عايزه كله قدامي في ملف إكسل واحد».",
          "Five tools, five cards, and tests passing every month: stacking, lookups, the report against plan, the purchasing match and the materials order. Hours of work became minutes. Early in October the factory manager said: “The third quarter is over. I want all of it in front of me in one Excel file.”"),
        u("«أدوس على شهر أو خط أو بلد، والأرقام تتغيّر. والمدير التجاري عايز نفس الحاجة للمبيعات، وفي الآخر عرض للإدارة». يعني الأدوات لازم تتجمع في حاجة أكبر: جدول واحد، وداشبورد، وعرض. والسؤال اللي هنبدأ بيه الوحدة الجاية: الأدوات شغالة… طب كل ده يبقى داشبورد جوّه إكسل يتحدّث لوحده إزاي؟",
          "“I click a month, a line or a country, and the figures change. And the commercial director wants the same for sales, with a deck for management at the end.” So the tools must come together into something bigger: one table, a dashboard and a deck. And the question we'll open the next unit with: the tools work… so how does all of it become a dashboard inside Excel that updates itself?")],
        answer: u("واجب الوحدة: شغّل أداة الدرس ٣ على ملفات أبريل، وأضف القواعد واحدة واحدة، واكتب بطاقتها، واعمل التلات اختبارات. لأن الأدوات اللي اتجربت كويس هي اللي هتتجمع في الوحدة الجاية.", "This unit's task: run lesson 3's tool on April's files, add the rules one at a time, write its card, and do the three tests — well-tried tools are the ones that come together in the next unit."),
        idea: u("الأدوات الصغيرة… بتتجمع في حاجة أكبر.", "Small tools… come together into something bigger.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.runStory]);
})(window.ACADEMY = window.ACADEMY || {});
