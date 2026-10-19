/* When the tool stops — the story deck of lesson x6, the closing lesson of unit 2.
   The same sales supervisor, helping a colleague whose run stopped, carries every slide with one question:
   «لما الأداة توقف أو تغلط… أعمل إيه؟». The deck sorts messages into three families (the file, the laptop, the code),
   meets the common ones (execution policy, encoding, a locked file, 0x800A03EC, a leftover EXCEL.EXE), shows how to go
   back to the model, one change per version, tests that break the tool on purpose, the three tests before sign-off,
   the tool card — and ends on the cliffhanger into unit 3: a file bigger than Excel itself.
   Each slide gives one rule with its reason. Drawings are the xt_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.runStory = {
    id: "run", lesson: "x6",
    kicker: u("لما الأداة توقف · الحكاية كاملة في ٨ دقايق", "When the tool stops · the whole story in 8 minutes"),
    title: u("لما الأداة توقف: تقرا، وتختبر، وتصلّح", "When the tool stops: read, test, fix"),
    lead: u("فاكر صورة الشاشة اللي وصلت صباح الأحد؟ الحكاية دي بتبدأ منها. هنمشي مع المشرف وهو بيساعد زميله، ونتعلّم نقرا رسايل الأدوات، ونرجع للنموذج صح، ونختبر قبل ما نعتمد، ونكتب للأداة بطاقة تخلّيها تعيش.",
      "Remember the screenshot that arrived on Sunday morning? This story starts there. We follow the supervisor as he helps his colleague, and learn to read a tool's messages, go back to the model the right way, test before relying, and write the tool a card that keeps it alive."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("لما الأداة توقف أو تغلط… أعمل إيه؟", "When the tool stops or goes wrong… what do I do?"),
    finalQuestion: u("طب لو جالك ملف أكبر من إكسل نفسه؟", "And what if a file arrives that is bigger than Excel itself?"),
    note: u("الرسايل بالإنجليزي زي ما بتظهر في ويندوز. نصها الدقيق ممكن يختلف حسب نسخة ويندوز وإكسل. ما تتحايلش على أي إعداد أمان في جهاز الشركة.", "Messages are in English as Windows shows them. Their exact wording may vary with the Windows and Excel version. Never get around a security setting on a company laptop."),
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
        title: u("سطر أحمر بالإنجليزي… والخطوة الأولى: الهدوء", "A red English line… and the first step: calm"),
        story: [u("الزميل في إسكندرية كتب: «الأداة مش شغالة خالص». المشرف رد: «ابعتلي الرسالة كاملة وآخر سطور السجل». الرسالة كانت فيها كلام كتير بالإنجليزي، وفي وسطها «0x800A03EC»، والسجل واقف عند «Week_01.xlsx: opening sheet».",
          "The colleague in Alexandria wrote: “The tool doesn't work at all.” The supervisor replied: “Send me the whole message and the last lines of the log.” The message held a lot of English, with “0x800A03EC” in the middle, and the log had stopped at “Week_01.xlsx: opening sheet”."),
        u("أول حاجة المشرف قالها: «الأداة ما اتكسرتش؛ الأداة وقفت». ودول حاجتين مختلفين. الأداة اللي بتوقف برسالة بتقولك فين المشكلة، والأداة اللي بتكمّل بصمت هي اللي فعلًا بتخوّف. والسؤال اللي ماشي معانا: لما الأداة توقف أو تغلط، تعمل إيه؟",
          "The first thing the supervisor said: “The tool isn't broken; it stopped.” Those are two different things. A tool that stops with a message tells you where the problem is; the one that carries on silently is the one to fear. The question we carry: when a tool stops or goes wrong, what do you do?")],
        answer: u("أول ما الأداة توقف، اقرا الرسالة والسجل قبل ما تغيّر أي حاجة. لأن الرسالة غالبًا فيها مكان المشكلة، والتغيير العشوائي بيضيّعه.", "The moment the tool stops, read the message and the log before changing anything — the message usually holds the problem's location, and random changes lose it."),
        idea: u("الوقفة معلومة… مش كارثة.", "A stop is information… not a disaster.")
      },
      {
        id: "kinds", art: "xt_kinds", year: u("الفرز", "Sorting"), mark: u("٠٢", "02"), era: u("تلات عائلات", "Three families"),
        title: u("كل رسالة جاية من واحد من تلاتة: الملف، أو الجهاز، أو الكود", "Every message comes from one of three: the file, the laptop, or the code"),
        story: [u("المشرف علّم زميله سؤال واحد يسأله قبل أي حاجة: الرسالة دي جاية منين؟ لو فيها اسم ملف أو عمود أو شيت، غالبًا المشكلة في الملف. لو فيها «disabled» أو «access» أو حروف غريبة، غالبًا في الجهاز وإعداداته.",
          "The supervisor taught his colleague one question to ask before anything: where does this message come from? If it names a file, column or sheet, the problem is probably the file. If it says “disabled”, “access”, or shows odd characters, it's probably the laptop and its settings."),
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
        u("ولو الرسالة ظهرت تاني حتى من ملف ‎.bat، يبقى قسم IT قافلها من إعدادات الشركة. هنا القاعدة اللي اتعلمناها: ما تتحايلش. تكلّم IT، أو تطلب نفس الأداة كماكرو تلصقه جوّه إكسل، بنفس القواعد ونفس السجل.",
          "If the message appears even from the .bat file, IT has locked it in company settings. Here's the rule we learned: don't get around it. Talk to IT, or ask for the same tool as a macro pasted inside Excel, with the same rules and the same log.")],
        answer: u("الرسالة دي عن إعداد في الجهاز، مش عن الكود: ملف ‎.bat الأول، وبعدين IT أو الماكرو. لأن تغيير الكود مش هيحل مشكلة مالهاش علاقة بيه.", "This message concerns a laptop setting, not the code: the .bat file first, then IT or the macro — changing the code won't fix a problem unrelated to it."),
        idea: u("«disabled» = إعداد… مش غلطة.", "“disabled” = a setting… not a mistake.")
      },
      {
        id: "encoding", art: "xt_encoding", year: u("الجهاز ٢", "Laptop 2"), mark: u("٠٤", "04"), era: u("حروف غريبة", "Odd characters"),
        title: u("«Ø§Ù„ÙƒÙ…ÙŠØ©»: العربي اتلخبط", "“Ø§Ù„ÙƒÙ…ÙŠØ©”: the Arabic got scrambled"),
        story: [u("زميل تالت شغّل الأداة، فوقفت عند أول ملف: «column Ø§Ù„ÙƒÙ…ÙŠØ© not found». الحروف الغريبة دي هي كلمة «الكمية»، بس اتقرت غلط. فاكر شريحة الترميز في حكاية «من الشات لجهازك»؟ ده بالظبط اللي بيحصل لما السكريبت يتحفظ من غير BOM.",
          "A third colleague ran the tool and it stopped at the first file: “column Ø§Ù„ÙƒÙ…ÙŠØ© not found”. Those odd characters are the word «الكمية», misread. Remember the encoding slide in the story “From the chat to your laptop”? That is exactly what happens when the script is saved without a BOM."),
        u("الحل مش في الكود ولا في الملف: افتح السكريبت في المفكرة، و«حفظ باسم»، واختار الترميز «UTF-8 with BOM»، واحفظ فوقه. وشغّل تاني. دقيقة واحدة، والأداة اشتغلت من غير ما سطر يتغيّر.",
          "The fix is neither in the code nor in the file: open the script in Notepad, “Save As”, choose the encoding “UTF-8 with BOM”, and save over it. Run again. One minute, and the tool ran without a line changing.")],
        answer: u("لو العربي ظهر حروف غريبة في الرسالة، المشكلة في ترميز السكريبت. لأن النموذج كتب الاسم صح، والحفظ هو اللي غيّره.", "If Arabic shows up as odd characters in the message, the problem is the script's encoding — the model wrote the name right, and saving changed it."),
        idea: u("الحروف الغريبة = احفظ تاني بـ BOM.", "Odd characters = save again with a BOM.")
      },
      {
        id: "locked", art: "xt_locked", year: u("الملف", "The file"), mark: u("٠٥", "05"), era: u("الملف مفتوح", "The file is open"),
        title: u("الملف مفتوح في إكسل… وإكسل مستخبي في الخلفية", "The file is open in Excel… and Excel is hiding in the background"),
        story: [u("مرة الأداة وقفت برسالة إن الملف «in use» أو «read-only». السبب كان بسيط: Week_03 كان مفتوح في إكسل قدام الزميل، علشان كان بيبص فيه. قفل الملف، وشغّل تاني، والأداة كمّلت.",
          "Once the tool stopped with a message that the file was “in use” or “read-only”. The cause was simple: Week_03 was open in Excel in front of the colleague, who'd been looking at it. He closed the file, ran again, and the tool carried on."),
        u("بس مرة تانية مكانش فيه ولا ملف مفتوح، والرسالة لسه موجودة. في «إدارة المهام» لقى تلات نسخ من EXCEL.EXE شغالة من غير شبابيك: بواقي تشغيلات وقفت في النص قبل ما الأداة تتعلّم تقفل إكسل في كل الحالات. قفلهم، واشتغلت.",
          "But another time no file was open and the message remained. In Task Manager he found three copies of EXCEL.EXE running with no windows: leftovers of runs that stopped midway, before the tool learned to close Excel in every case. He ended them, and it ran.")],
        answer: u("قبل أي تشغيل، اقفل ملفات الأداة، واتأكد إن مفيش EXCEL.EXE فاضل في إدارة المهام. لأن الملف المفتوح أو إكسل المستخبي بيقفل الملفات على الأداة.", "Before any run, close the tool's files and check no EXCEL.EXE is left in Task Manager — an open file or a hidden Excel locks the files against the tool."),
        idea: u("الملف المفتوح عندك… مقفول على الأداة.", "A file open for you… is locked for the tool.")
      },
      {
        id: "hresult", art: "xt_hresult", year: u("الملف ٢", "The file 2"), mark: u("٠٦", "06"), era: u("0x800A03EC", "0x800A03EC"),
        title: u("0x800A03EC: إكسل رفض أمر… والسبب كان اسم شيت", "0x800A03EC: Excel refused a command… and the cause was a sheet name"),
        story: [u("نرجع لرسالة إسكندرية. الرقم ده معناه إن إكسل رفض أمر من السكريبت، وغالبًا لأنه طلب حاجة مش موجودة: شيت، أو نطاق، أو خلية. والسجل كان واقف عند «opening sheet»، يعني المشكلة في الشيت.",
          "Back to the Alexandria message. That number means Excel refused a command from the script, usually because it asked for something that isn't there: a sheet, a range, a cell. The log had stopped at “opening sheet”, so the problem lay in the sheet."),
        u("المشرف طلب من زميله يفتح Week_01 ويقرا اسم الشيت. الاسم كان «المبيعات» مش «Sales»: الزميل كان غيّر اسم الشيتات في نسخته علشان تبقى بالعربي. رجّع الاسم، والأداة اشتغلت. ولا سطر كود اتغيّر.",
          "The supervisor asked his colleague to open Week_01 and read the sheet name. It said «المبيعات», not “Sales”: the colleague had renamed the sheets in his copy to Arabic. He restored the name and the tool ran. Not a line of code changed.")],
        answer: u("لما إكسل يرفض أمر، قارن الأسماء في الملف بالأسماء في الـ Prompt حرف بحرف. لأن أغلب الرفض سببه اسم اتغيّر، مش كود غلط.", "When Excel refuses a command, compare the names in the file with those in the Prompt letter by letter — most refusals come from a renamed item, not wrong code."),
        idea: u("رقم غريب… وسبب بسيط.", "A strange number… a simple cause.")
      },
      {
        id: "report", art: "xt_report", year: u("الرجوع للنموذج", "Back to the model"), mark: u("٠٧", "07"), era: u("بالحرف", "Word for word"),
        title: u("لما المشكلة في الكود: ارجع للنموذج بأربع حاجات", "When the problem is the code: go back to the model with four things"),
        story: [u("مرة الملف سليم، والجهاز سليم، والأداة لسه بتوقف. هنا بس المشرف رجع للنموذج، في نفس المحادثة اللي الأداة اتكتبت فيها، علشان يفتكر القواعد اللي اتفقوا عليها. وبعتله أربع حاجات: الرسالة بالحرف، وآخر ١٠ سطور من السجل، واسم الملف اللي وقف عنده، ونسخة PowerShell.",
          "Once, the file was sound, the laptop was sound, and the tool still stopped. Only then did the supervisor go back to the model, in the same chat where the tool was written, so it would remember the agreed rules. He sent four things: the message word for word, the last 10 lines of the log, the file it stopped at, and the PowerShell version."),
        u("وطلب منه حاجة قبل الكود: «قولّي في ٣ سطور المشكلة غالبًا فين، وإيه اللي محتاج أتأكد منه بنفسي». النموذج ما شافش الجهاز؛ كل اللي يعرفه هو اللي اتقاله. وكل ما الرسالة أدق، التصليح بييجي من أول مرة.",
          "And he asked for something before code: “Tell me in 3 lines where the problem most likely is, and what I need to check myself.” The model hasn't seen the laptop; all it knows is what it's told. The more precise the message, the more likely the fix lands the first time.")],
        answer: u("ابعت للنموذج الرسالة والسجل والملف والنسخة، في نفس المحادثة. لأن «مش شغالة» من غير تفاصيل بتطلّع تعديلات عشوائية.", "Send the model the message, the log, the file and the version, in the same chat — “it doesn't work” without details yields random edits."),
        idea: u("النموذج بيصلّح اللي بيشوفه… فورّيه كويس.", "The model fixes what it sees… so show it well.")
      },
      {
        id: "versions", art: "xt_versions", year: u("التعديل", "The change"), mark: u("٠٨", "08"), era: u("واحد في المرة", "One at a time"),
        title: u("تعديل واحد… ونسخة باسم جديد", "One change… and a version with a new name"),
        story: [u("النموذج اقترح تلات تعديلات مرة واحدة. المشرف قاله: «واحد بس، الأهم». لأن لو التلاتة اتعملوا والأداة اشتغلت، مش هيعرف أنهي واحد صلّح. ولو اتعملوا والأداة اتلخبطت أكتر، مش هيعرف أنهي واحد عمل المشكلة.",
          "The model suggested three changes at once. The supervisor said: “Just one, the most important.” Because if all three were made and the tool ran, he wouldn't know which one fixed it. And if they were made and the tool got worse, he wouldn't know which one caused it."),
        u("وكل تعديل بيتحفظ في ملف جديد: ‎stack_tool_v2.ps1، وبعده v3. والقديم بيفضل جنبه. لو v3 طلع أسوأ، يرجع لـ v2 في ثانية. وفي بطاقة الأداة سطر لكل نسخة: اتغيّر فيها إيه، وليه.",
          "And each change is saved in a new file: stack_tool_v2.ps1, then v3. The old one stays beside it. If v3 turns out worse, he goes back to v2 in a second. And the tool card holds a line per version: what changed, and why.")],
        answer: u("غيّر حاجة واحدة في المرة، واحفظ كل نسخة باسم جديد. لأنك محتاج تعرف إيه اللي صلّح، وتقدر ترجع للي كان شغال.", "Change one thing at a time and save each version under a new name — you need to know what fixed it, and to be able to return to what worked."),
        idea: u("تعديل واحد = سبب واحد واضح.", "One change = one clear cause.")
      },
      {
        id: "break", art: "xt_break", year: u("الاختبار", "Testing"), mark: u("٠٩", "09"), era: u("اكسرها بإيدك", "Break it yourself"),
        title: u("أحسن اختبار: إنك تكسر الأداة بإيدك", "The best test: breaking the tool yourself"),
        story: [u("بعد كل تصليح، المشرف بيعمل تلات نسخ فيها عيوب متعمّدة في فولدر اختبار: نسخة من ملف ناقصها عمود القيمة، ونسخة اسم شيتها متغيّر، ونسخة فاضية مفيهاش ولا صف. ويشغّل الأداة على كل واحدة.",
          "After every fix, the supervisor makes three deliberately faulty copies in a test folder: a file missing its Value column, one with a renamed sheet, and an empty one with not a single row. He runs the tool on each."),
        u("والمطلوب مش إن الأداة تنجح؛ المطلوب إنها توقف برسالة واضحة فيها اسم الملف والمشكلة. لو أي واحدة عدّت وطلّعت نتيجة، يبقى فيه قاعدة ناقصة. الاختبار ده بياخد خمس دقايق، وبيقولك الأداة هتعمل إيه في يوم وحش.",
          "What's wanted isn't for the tool to succeed; it's for it to stop with a clear message naming the file and the problem. If any copy slips through and yields a result, a rule is missing. This test takes five minutes and tells you what the tool will do on a bad day.")],
        answer: u("جرّب الأداة على ملفات فيها مشاكل عمدًا، واتأكد إنها بتوقف. لأن الأداة اللي ما شفتهاش بتوقف ممكن تكمّل بصمت لما المشكلة الحقيقية تيجي.", "Try the tool on deliberately faulty files and make sure it stops — a tool you've never seen stop may carry on silently when the real problem comes."),
        idea: u("لو ما عرفتش تكسرها… ما تعرفش تثق فيها.", "If you can't break it… you can't trust it.")
      },
      {
        id: "tests", art: "xt_tests", year: u("الاعتماد", "Sign-off"), mark: u("١٠", "10"), era: u("تلات اختبارات", "Three tests"),
        title: u("تلات اختبارات قبل ما تعتمد على أي أداة", "Three tests before relying on any tool"),
        story: [u("المشرف لخّص الاعتماد في تلات اختبارات بيعملهم على كل أداة. الأول: العدد، عدد الصفوف في السجل يساوي العدد الحقيقي. التاني: الإجمالي، إجمالي الناتج يساوي إجمالي المصدر أو المفتاح. التالت: المشاكل، كل مشكلة معروفة في البيانات اتعاملت صح، وكل نسخة مكسورة وقّفت الأداة.",
          "The supervisor reduced sign-off to three tests he runs on every tool. First: the count — the log's row count equals the real one. Second: the total — the output's total equals the source or the key. Third: the problems — every known problem in the data was handled right, and every broken copy stopped the tool."),
        u("لو التلاتة عدّوا، الأداة تتعتمد. لو واحد فشل، الأداة ترجع للتصليح، والتقرير يتعمل بالإيد الشهر ده. والتلات اختبارات بيتكتبوا في بطاقة الأداة بنتيجتهم، علشان أي حد يقدر يعيدهم.",
          "If all three pass, the tool is signed off. If one fails, the tool goes back for fixing and this month's report is made by hand. And the three tests are written on the tool card with their results, so anyone can repeat them.")],
        answer: u("ما تعتمدش على أداة إلا لما تعدّي العدد والإجمالي والمشاكل. لأن كل اختبار بيمسك نوع مختلف من الغلط.", "Rely on a tool only once it passes the count, the total and the problems — each test catches a different kind of mistake."),
        idea: u("العدد + الإجمالي + المشاكل = ثقة.", "The count + the total + the problems = trust.")
      },
      {
        id: "card", art: "xt_card", year: u("البطاقة", "The card"), mark: u("١١", "11"), era: u("الأداة تعيش", "The tool lives on"),
        title: u("بطاقة الأداة: صفحة واحدة بتخلّيها تعيش سنين", "The tool card: one page that keeps it alive for years"),
        story: [u("جنب كل أداة، المشرف حط ملف اسمه TOOL_CARD.txt. فيه: الأداة بتعمل إيه في سطرين، والملفات والشيتات والأعمدة بالحرف، وكل القواعد بما فيها إجاباته على أسئلة النموذج، والتلات اختبارات ونتيجتهم، وسطر لكل نسخة.",
          "Beside each tool, the supervisor put a file named TOOL_CARD.txt. It holds: what the tool does in two lines, the files, sheets and columns letter for letter, every rule including his answers to the model's questions, the three tests and their results, and a line per version."),
        u("وجه يوم الاختبار الحقيقي: زميلة شغالة على ChatGPT طلبت نفس الأداة. المشرف ادّاها البطاقة بس، مش السكريبت. لصقتها في محادثة جديدة، والنموذج بنى نفس الأداة في ربع ساعة، من غير ما يسألها حاجة اتسألت قبل كده. والاختبارات التلاتة عدّت.",
          "Then came the real test: a colleague working on ChatGPT asked for the same tool. The supervisor gave her the card only, not the script. She pasted it into a new chat, and the model built the same tool in a quarter of an hour, without asking her anything already asked. And the three tests passed.")],
        answer: u("اكتب لكل أداة بطاقة فيها الوصف والقواعد والاختبارات. لأن البطاقة بتبني الأداة تاني على أي نموذج، والسكريبت لوحده بيموت مع أول تغيير.", "Write each tool a card with its description, rules and tests — the card rebuilds the tool on any model, while the script alone dies at the first change."),
        idea: u("السكريبت بيتكتب تاني… والبطاقة هي الأداة.", "The script can be rewritten… the card is the tool.")
      },
      {
        id: "cliff", art: "xt_cliff", year: u("الوحدة الجاية", "Next unit"), mark: u("١٢", "12"), era: u("ملف الربع", "The quarter's file"),
        title: u("كل حاجة اشتغلت… لحد ما وصل ملف الربع من الإدارة", "Everything worked… until the quarter's file arrived from head office"),
        story: [u("تلات أدوات، وتلات بطاقات، وتلات اختبارات بتعدّي كل شهر. ست ساعات بقوا عشر دقايق، والمشرف بقى يبعت تقاريره الصبح بدري. لحد ما وصل ملف الربع من الإدارة: ٣٠٠ ألف صف، وخلايا مدموجة في العناوين، وتواريخ مكتوبة كنص زي «٣ مارس».",
          "Three tools, three cards, three tests passing every month. Six hours became ten minutes, and the supervisor sent his reports early in the morning. Until the quarter's file arrived from head office: 300,000 rows, merged cells in the headers, dates written as text like “3 March”."),
        u("الأداة عملت الصح ووقفت برسالة واضحة بدل ما تطلّع نتيجة غلط. بس المرة دي إكسل نفسه وقف عند ٧٠٪ ورسالة «لا يستجيب». إكسل اتعمل للجداول اللي بتشوفها بعينك، مش لمئات الآلاف من الصفوف. والسؤال اللي هنبدأ بيه الوحدة الجاية: طب لو جالك ملف أكبر من إكسل نفسه؟",
          "The tool did the right thing and stopped with a clear message instead of producing a wrong result. But this time Excel itself froze at 70% with “Not responding”. Excel was built for tables you look at, not for hundreds of thousands of rows. And the question we'll open the next unit with: what if a file arrives that is bigger than Excel itself?")],
        answer: u("واجب الوحدة: شغّل التلات أدوات على الحقيبة، واكتب بطاقة لواحدة منهم، واعمل التلات اختبارات. وتعالى ومعاك أول ملف حقيقي من شغلك قلقان منه. لأن الملفات دي هي بداية الوحدة الجاية.", "This unit's task: run the three tools on the kit, write a card for one of them, and do the three tests. Then bring the first real file from your work that worries you — such files open the next unit."),
        idea: u("إكسل اتعمل علشان تشوف البيانات… مش علشان يشيلها كلها.", "Excel was built for looking at data… not for holding all of it.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.runStory]);
})(window.ACADEMY = window.ACADEMY || {});
