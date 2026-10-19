/* From the chat to the laptop — the story deck of lesson x2 (unit 2).
   The same planning engineer of the TV factory, who meets Gemini Enterprise's code boxes after ChatGPT's download links,
   carries every slide with one question: «الكود في الشات… يبقى أداة على جهازي إزاي؟». The deck walks both paths to the
   same end: the tool as two files, asking for the right shape, ChatGPT's expiring links, Gemini's code boxes, Notepad,
   the encoding, hidden extensions, replies cut short, the launcher and the execution policy, and the in-Excel fallback.
   Each slide gives one rule with its reason. Drawings are the xd_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.deliverStory = {
    id: "deliver", lesson: "x2",
    kicker: u("من الشات لجهازك · الحكاية كاملة في ٨ دقايق", "From the chat to your laptop · the whole story in 8 minutes"),
    title: u("من الشات لجهازك: ChatGPT وGemini Enterprise", "From the chat to your laptop: ChatGPT and Gemini Enterprise"),
    lead: u("فاكر سؤال الزميلة في آخر الحكاية اللي فاتت؟ النموذج كتب الكود، بس مفيش ملف. الحكاية دي بتمشي في الطريقين: ChatGPT اللي بيديك ملفات تنزّلها، وGemini Enterprise اللي بيكتبلك الكود في الرد، لحد ما الاتنين يوصلوا لنفس النتيجة: أداة على جهازك بتشتغل بدبل كليك.",
      "Remember the colleague's question at the end of the last story? The model wrote the code, but there was no file. This story walks both paths: ChatGPT, which gives you files to download, and Gemini Enterprise, which writes the code in its reply, until both reach the same result: a tool on your laptop that runs with a double click."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("الكود في الشات… يبقى أداة على جهازي إزاي؟", "The code is in the chat… how does it become a tool on my laptop?"),
    finalQuestion: u("السكة جاهزة… طب الأداة الأولى هتعمل إيه في ١٣ ملف؟", "The road is ready… so what will tool one do with 13 files?"),
    note: u("خطوات المفكرة وويندوز هي الشائعة في نسخ ويندوز ١٠ و١١. خصائص كل نموذج بتختلف حسب النسخة والإعدادات؛ اسأل قسم IT لو حاجة مقفولة.", "The Notepad and Windows steps are the common ones in Windows 10 and 11. Each model's features vary with the version and the settings; ask IT if something is locked."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("من الشات لجهازك، في شرائح", "From the chat to your laptop, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "reply", art: "xd_reply", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("مفيش زرار تنزيل", "No download button"),
        title: u("الكود كله في الرد… ومفيش ولا ملف", "All the code in the reply… and not one file"),
        story: [u("في المصنع فيه ناس بتشتغل على ChatGPT وناس على Gemini Enterprise. مهندس التخطيط كان متعوّد على ChatGPT: يطلب أداة، ييجي رابط، ينزّل الملف، يشغّل. أول مرة طلب نفس الأداة من Gemini Enterprise، الرد جه صناديق كود طويلة، ومفيش ولا رابط.",
          "At the factory some people work on ChatGPT and some on Gemini Enterprise. The planning engineer was used to ChatGPT: ask for a tool, get a link, download the file, run it. The first time he asked Gemini Enterprise for the same tool, the reply came as long code boxes, without a single link."),
        u("ده مش عيب في النموذج؛ ده اختيار في الإعدادات، وكتير بيبقى مقفول أو مش متفعّل. والكود سليم. الفرق إن الخطوة الأخيرة بقت عليك: إنت اللي هتحوّل الكلام ده لملف. والسؤال اللي ماشي معانا: إزاي من غير ما حاجة تضيع في السكة؟",
          "That's not a flaw in the model; it's a setting, often locked or not enabled. The code is sound. The difference is that the last step is now yours: you turn this text into a file. And the question we carry: how, without anything getting lost on the way?")],
        answer: u("اعرف نموذجك بيسلّم إزاي قبل ما تطلب أداة كبيرة. لأن طريقة التسليم بتحدد إنت هتطلب الكود بأنهي شكل.", "Know how your model delivers before asking for a big tool — the way it delivers decides the shape you ask the code in."),
        idea: u("الكود واحد… والسكة للجهاز بتختلف.", "The code is the same… the road to the laptop differs.")
      },
      {
        id: "two", art: "xd_two", year: u("الأداة", "The tool"), mark: u("٠٢", "02"), era: u("ملفين نصّيين", "Two text files"),
        title: u("الأداة كلها ملفين نصّيين", "The whole tool is two text files"),
        story: [u("أول حاجة تريّح: الأداة مش برنامج معقّد. هي ملفين نصّيين. الأول سكريبت PowerShell بامتداد ‎.ps1، وده فيه كل الشغل: يفتح إكسل في الخلفية، ويقرا، ويحسب، ويكتب. والتاني ملف تشغيل صغير بامتداد ‎.bat، سطرين بس، وظيفته إنه يشغّل الأول بدبل كليك.",
          "First, a relief: the tool isn't a complex program. It's two text files. The first is a PowerShell script ending in .ps1, holding all the work: it opens Excel in the background, reads, calculates and writes. The second is a small launcher ending in .bat, just two lines, whose job is to start the first with a double click."),
        u("يعني اللي محتاجه علشان الأداة توصل جهازك: تعمل ملفين نصّيين بالاسم الصح، في نفس الفولدر. أي برنامج بيكتب نص ينفع، والمفكرة اللي على كل ويندوز كفاية. ولا تنزيل برامج، ولا صلاحيات خاصة.",
          "So all you need for the tool to reach your laptop is to make two text files with the right names, in the same folder. Any program that writes text will do, and the Notepad on every Windows is enough. No software to install, no special rights.")],
        answer: u("اطلب الأداة في أقل عدد ملفات ممكن: سكريبت واحد وملف تشغيل. لأن كل ملف زيادة هو فرصة زيادة لغلطة نسخ.", "Ask for the tool in as few files as possible: one script and one launcher — every extra file is one more chance of a copying mistake."),
        idea: u("ملفين نص… مش برنامج.", "Two text files… not a program.")
      },
      {
        id: "shape", art: "xd_shape", year: u("الطلب", "The request"), mark: u("٠٣", "03"), era: u("اطلب شكل التسليم", "Ask for the delivery shape"),
        title: u("اطلب الشكل اللي يخلّي النسخ سهل ومضمون", "Ask for the shape that makes copying easy and certain"),
        story: [u("مهندس التخطيط زوّد فقرة في آخر الـ Prompt اسمها «طريقة التسليم»: كل ملف في صندوق كود لوحده، واسم الملف مكتوب فوق الصندوق، وآخر سطر في كل ملف «‎# END OF FILE» واسمه. وفي الآخر قايمة: اسم كل ملف وعدد سطوره.",
          "The planning engineer added a paragraph at the end of the Prompt called “Delivery”: each file in a code box of its own, the file name above the box, and a last line in each file reading “# END OF FILE” with its name. At the end, a list: each file's name and line count."),
        u("الفقرة دي بتحل تلات مشاكل مرة واحدة: إنت عارف كل صندوق يتحفظ باسم إيه، وتقدر تتأكد إن الصندوق اتنسخ لآخره، وتقدر تعدّ السطور لو شكّيت. والفقرة نفسها جاهزة في مكتبة البرومبتات، تحطها في آخر أي طلب أداة.",
          "This paragraph solves three problems at once: you know what name each box is saved under, you can confirm a box was copied to its end, and you can count lines if in doubt. The paragraph itself is ready in the prompt library, to add to the end of any tool request.")],
        answer: u("اطلب علامة نهاية في آخر كل ملف. لأنها أسهل طريقة تتأكد بيها إن مفيش سطر ضاع من آخره.", "Ask for an end marker in each file — it's the easiest way to be sure no line went missing from its end."),
        idea: u("التسليم جزء من الطلب… مش حاجة بعده.", "Delivery is part of the request… not something after it.")
      },
      {
        id: "chatgpt", art: "xd_chatgpt", year: u("الطريق ١", "Path 1"), mark: u("٠٤", "04"), era: u("ChatGPT", "ChatGPT"),
        title: u("ChatGPT: رابط لكل ملف… نزّله على طول", "ChatGPT: a link per file… download it at once"),
        story: [u("في ChatGPT، النموذج يقدر يعمل الملفات بنفسه ويديك رابط تنزيل لكل واحد. مهندس التخطيط كتب: «اعمل الملفين وادّيني رابط لكل ملف». دوس على الرابط، ونزلوا في فولدر التنزيلات. خطوة واحدة ناقصة: ينقلهم لفولدر الأداة جنب بعض.",
          "In ChatGPT, the model can create the files itself and give you a download link for each. The planning engineer wrote: “Make both files and give me a link for each.” He clicked the links and they landed in Downloads. One step left: move them into the tool's folder, side by side."),
        u("بس فيه حاجتين لازم تاخد بالك منهم. الروابط دي بتنتهي بعد وقت، فلو سبتها لبكرة ممكن تلاقي «الملف مش متاح». والملفات بتنزل في فولدر التنزيلات بأسماء ممكن تتغيّر لو نزّلت نفس الملف مرتين، فراجع الاسم قبل ما تنقله.",
          "But mind two things. These links expire after a while, so leave them till tomorrow and you may find “file not available”. And files land in Downloads under names that can change if you download the same file twice, so check the name before moving it.")],
        answer: u("نزّل الملفات أول ما تيجي، واحفظ الـ Prompt جنبها. لأن الرابط بيروح، والـ Prompt هو اللي بيرجّعلك الأداة.", "Download the files as soon as they arrive, and keep the Prompt next to them — the link goes away, and the Prompt is what brings the tool back."),
        idea: u("الرابط مؤقت… والـ Prompt دايم.", "The link is temporary… the Prompt is permanent.")
      },
      {
        id: "copy", art: "xd_copy", year: u("الطريق ٢", "Path 2"), mark: u("٠٥", "05"), era: u("Gemini Enterprise", "Gemini Enterprise"),
        title: u("Gemini Enterprise: زرار النسخ، مش الماوس", "Gemini Enterprise: the copy button, not the mouse"),
        story: [u("في Gemini Enterprise الرد جه تلات صناديق: ‎stack_tool.ps1، و‎run_stack.bat، وخطوات التشغيل. فوق كل صندوق زرار صغير للنسخ. مهندس التخطيط في الأول ظلّل الكود بالماوس، وضاع منه أول سطر من غير ما ياخد باله.",
          "In Gemini Enterprise the reply came as three boxes: stack_tool.ps1, run_stack.bat, and the run steps. Above each box is a small copy button. At first the planning engineer selected the code with the mouse, and lost the first line without noticing."),
        u("زرار النسخ بياخد الصندوق كله بالظبط، من أول حرف لآخر حرف، من غير مسافات زيادة ولا كلام من برّه الصندوق. صندوق واحد في المرة: انسخ، والصق في ملف، واحفظ، وبعدين الصندوق اللي بعده.",
          "The copy button takes the whole box exactly, from the first character to the last, with no extra spaces and no text from outside the box. One box at a time: copy, paste into a file, save, then the next box.")],
        answer: u("انسخ كل صندوق بزرار النسخ اللي فوقه. لأن التظليل بالماوس بيضيّع أول سطر أو آخر سطر من غير ما تحس.", "Copy each box with the button above it — selecting with the mouse drops a first or last line without your noticing."),
        idea: u("صندوق واحد… ملف واحد… زرار واحد.", "One box… one file… one button.")
      },
      {
        id: "notepad", art: "xd_notepad", year: u("الحفظ", "Saving"), mark: u("٠٦", "06"), era: u("المفكرة", "Notepad"),
        title: u("المفكرة: «حفظ باسم» بأربع اختيارات", "Notepad: “Save As” with four choices"),
        story: [u("مهندس التخطيط فتح المفكرة، ولصق الصندوق الأول، ودوس «حفظ باسم». وهنا أربع حاجات لازم تتظبط: الفولدر يبقى فولدر الأداة، والنوع «كل الملفات» مش «مستند نصي»، والاسم بالظبط ‎stack_tool.ps1، والترميز «UTF-8 with BOM».",
          "The planning engineer opened Notepad, pasted the first box and pressed “Save As”. Four things must be set here: the folder is the tool's folder, the type is “All files”, not “Text document”, the name is exactly stack_tool.ps1, and the encoding is “UTF-8 with BOM”."),
        u("وبعدين نفس الخطوات لملف التشغيل باسم ‎run_stack.bat. الاتنين في نفس الفولدر، جنب بعض. أربع اختيارات بتاخد عشر ثواني، وكل واحد فيهم لو اتنسي، الأداة مش هتشتغل، والرسالة مش هتقولك ليه.",
          "Then the same steps for the launcher, named run_stack.bat. Both in the same folder, side by side. Four choices that take ten seconds, and if any one is forgotten, the tool won't run and the message won't tell you why.")],
        answer: u("في «حفظ باسم» راجع الأربعة: الفولدر، والنوع، والاسم، والترميز. لأن أغلب الأدوات اللي «مش شغالة» وقعت هنا.", "In “Save As” check the four: folder, type, name and encoding — most tools that “don't work” fell right here."),
        idea: u("عشر ثواني في الحفظ بتوفّر ساعة تصليح.", "Ten seconds at saving spare an hour of fixing.")
      },
      {
        id: "bom", art: "xd_bom", year: u("الترميز", "Encoding"), mark: u("٠٧", "07"), era: u("العربي جوّه الكود", "Arabic inside the code"),
        title: u("ليه «UTF-8 with BOM» بالذات؟", "Why “UTF-8 with BOM” in particular?"),
        story: [u("السكريبت فيه أسماء الأعمدة بالعربي: «الكمية» و«القيمة». وPowerShell اللي على أغلب الأجهزة (النسخة 5.1) لو لقى الملف UTF-8 من غير العلامة الصغيرة اللي اسمها BOM، بيقرا العربي حروف غريبة زي «Ø§Ù„ÙƒÙ…ÙŠØ©».",
          "The script holds column names in Arabic: «الكمية» and «القيمة». The PowerShell on most laptops (version 5.1), if it finds a UTF-8 file without the small mark called a BOM, reads the Arabic as odd characters like “Ø§Ù„ÙƒÙ…ÙŠØ©”."),
        u("والنتيجة: الأداة تفتح الملف وتقول «العمود الكمية مش موجود»، مع إن العمود قدامك. الكود سليم، والملف سليم، والمشكلة في طريقة الحفظ بس. الحل: «UTF-8 with BOM» في المفكرة، أو تطلب من النموذج يكتب الكلام العربي في مكان واحد بس فوق السكريبت.",
          "The result: the tool opens the file and says “column Qty not found”, though the column is right in front of you. The code is sound, the file is sound; only the way it was saved is wrong. The fix: “UTF-8 with BOM” in Notepad, or ask the model to keep the Arabic text in one place at the top of the script.")],
        answer: u("أي سكريبت فيه حرف عربي يتحفظ «UTF-8 with BOM». لأن PowerShell 5.1 من غيرها بيقرا العربي غلط من غير ما يقولك.", "Any script holding an Arabic letter is saved as “UTF-8 with BOM” — without it PowerShell 5.1 misreads the Arabic without telling you."),
        idea: u("العلامة الصغيرة بتفرق بين «الكمية» و«Ø§Ù„».", "The small mark is the difference between «الكمية» and “Ø§Ù„”.")
      },
      {
        id: "ext", art: "xd_ext", year: u("الامتداد", "Extension"), mark: u("٠٨", "08"), era: u("الاسم المستخبي", "The hidden name"),
        title: u("‎stack_tool.ps1… ولا ‎stack_tool.ps1.txt؟", "stack_tool.ps1… or stack_tool.ps1.txt?"),
        story: [u("الزميلة حفظت السكريبت ودوست دبل كليك على ملف التشغيل، فطلعت رسالة «الملف مش موجود». الملف قدامها في الفولدر، اسمه ‎stack_tool.ps1. بس ويندوز بيخبّي الامتداد، والمفكرة كانت زوّدت ‎.txt من غير ما حد يشوف.",
          "The colleague saved the script and double-clicked the launcher, and got “file not found”. The file was right there in the folder, named stack_tool.ps1. But Windows hides extensions, and Notepad had added .txt without anyone seeing."),
        u("الحل خطوة واحدة مرة واحدة في العمر: في مستكشف الملفات، من «عرض»، فعّل «امتدادات أسماء الملفات». ساعتها الاسم الحقيقي يبان: ‎stack_tool.ps1.txt. تمسح ‎.txt، وتوافق على التغيير، والأداة تشتغل.",
          "The fix is one step, once in a lifetime: in File Explorer, under “View”, turn on “File name extensions”. Then the real name shows: stack_tool.ps1.txt. Delete .txt, accept the change, and the tool runs.")],
        answer: u("فعّل عرض امتدادات الملفات على جهازك من النهارده. لأنك مش هتعرف تصلّح اسم إنت مش شايفه.", "Turn on file name extensions on your laptop from today — you can't fix a name you can't see."),
        idea: u("اللي ويندوز بيخبّيه… لازم إنت تشوفه.", "What Windows hides… you need to see.")
      },
      {
        id: "cut", art: "xd_cut", year: u("الطول", "Length"), mark: u("٠٩", "09"), era: u("الرد اتقطع", "The reply was cut"),
        title: u("لما الرد يتقطع في النص", "When the reply is cut off midway"),
        story: [u("في الأداة التالتة، السكريبت كان طويل، والرد وقف عند سطر ٢١٠ من غير «‎# END OF FILE». لو مهندس التخطيط كان نسخ وحفظ وشغّل، كان هيطلع خطأ غريب في آخر سطر، ويضيّع وقته يدوّر في كود سليم.",
          "For tool three the script was long, and the reply stopped at line 210 without “# END OF FILE”. Had the planning engineer copied, saved and run it, he'd have hit an odd error on the last line and spent time searching sound code."),
        u("علامة النهاية كشفت المشكلة في ثانية. فكتب: «قسّم الملف لأجزاء مترقّمة، كل جزء أقل من ٢٠٠ سطر، واستنى أقولك كمّل». الأجزاء اتلصقت ورا بعض في نفس الملف، بالترتيب، والعلامة ظهرت في آخر جزء.",
          "The end marker exposed the problem in a second. So he wrote: “Split the file into numbered parts, each under 200 lines, and wait for me to say continue.” The parts were pasted one after another into the same file, in order, and the marker appeared at the end of the last part.")],
        answer: u("لو علامة النهاية مش موجودة، ما تشغّلش: اطلب الباقي أجزاء. لأن الكود الناقص بيطلّع أخطاء ملهاش علاقة بالمشكلة الحقيقية.", "If the end marker is missing, don't run it: ask for the rest in parts — incomplete code throws errors unrelated to the real problem."),
        idea: u("من غير علامة النهاية… الملف لسه ما خلصش.", "No end marker… the file isn't finished yet.")
      },
      {
        id: "bat", art: "xd_bat", year: u("التشغيل", "Running"), mark: u("١٠", "10"), era: u("ملف التشغيل", "The launcher"),
        title: u("سطرين بيشغّلوا الأداة بدبل كليك", "Two lines that run the tool with a double click"),
        story: [u("ملف ‎run_stack.bat فيه سطرين: الأول بيقول لـ PowerShell يشغّل السكريبت اللي جنبه، ويسمح بتشغيله المرة دي بس، والتاني «pause» علشان الشاشة السودا تفضل مفتوحة لحد ما تقرا اللي حصل. دبل كليك، والأداة تشتغل.",
          "run_stack.bat holds two lines: the first tells PowerShell to run the script beside it, allowing it for this run only; the second is “pause”, so the black window stays open until you've read what happened. Double-click, and the tool runs."),
        u("بس على بعض الأجهزة، قسم IT قافل تشغيل السكريبتات خالص، وتطلع رسالة «running scripts is disabled». القاعدة هنا واضحة: ما تدوّرش على طريقة تتحايل بيها. ده قرار أمان، وفيه بدائل مسموحة.",
          "But on some laptops IT has locked script running altogether, and you get “running scripts is disabled”. The rule here is clear: don't look for a way around it. It's a security decision, and there are allowed alternatives.")],
        answer: u("لو السكريبتات مقفولة، احترم القفل واسأل IT أو استخدم البديل. لأن التحايل على إعدادات الأمان بيحوّل أداة مفيدة لمشكلة.", "If scripts are locked, respect the lock and ask IT or use the alternative — getting around security settings turns a useful tool into a problem."),
        idea: u("دبل كليك لو مسموح… وبديل لو مقفول.", "A double click if allowed… an alternative if locked.")
      },
      {
        id: "alt", art: "xd_alt", year: u("البديل", "The alternative"), mark: u("١١", "11"), era: u("جوّه إكسل نفسه", "Inside Excel itself"),
        title: u("لو السكريبتات مقفولة: الأداة تتلصق جوّه إكسل", "If scripts are locked: the tool is pasted inside Excel"),
        story: [u("الزميلة جهازها كان مقفول. فطلبت من Gemini Enterprise نفس الأداة كماكرو: نفس القواعد، ونفس السجل، بس بلغة VBA. فتحت ملف إكسل فاضي، ومن تبويب المطوّر فتحت محرر الكود، وأدرجت وحدة، ولصقت، وحفظت الملف بصيغة بتسمح بالماكرو.",
          "The colleague's laptop was locked. So she asked Gemini Enterprise for the same tool as a macro: the same rules and log, only in VBA. She opened a blank workbook, opened the code editor from the Developer tab, inserted a module, pasted, and saved the workbook in a macro-enabled format."),
        u("وفاكر Power Query من درس أول أتمتة؟ ده بديل تاني، والخطوات بتتلصق في «المحرر المتقدم» جوّه إكسل. في الحالتين مفيش ولا ملف تنزّله ولا سكريبت يتقفل. والقاعدة ما اتغيّرتش: على نسخة، وبسجل، وبتوقف واضح.",
          "And remember Power Query from the first-automation lesson? It's another alternative, its steps pasted into the “Advanced Editor” inside Excel. Either way there's no file to download and no script to be locked. The rule didn't change: on a copy, with a log, with a clear stop.")],
        answer: u("الأداة ليها أكتر من شكل: سكريبت، أو ماكرو، أو Power Query. لأن المهم القواعد اللي جوّاها، مش اللغة اللي اتكتبت بيها.", "A tool has more than one form: script, macro or Power Query — what matters is the rules inside it, not the language it's written in."),
        idea: u("القفل بيغيّر الشكل… مش القواعد.", "The lock changes the form… not the rules.")
      },
      {
        id: "cliff", art: "xd_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("أول تجربة", "First try"),
        title: u("أول سكريبت اشتغل… والأداة الكبيرة جاية", "The first script ran… the big tool is next"),
        story: [u("قبل الأداة الكبيرة، مهندس التخطيط جرّب السكة بطلب صغير: سكريبت بيكتب أسماء ملفات الحقيبة في ملف نصّي. نسخ، وحفظ بالأربع اختيارات، ودبل كليك. الشاشة السودا كتبت «15 Excel files found» وفضلت مستنية. والزميلة عملت نفس الحاجة على جهازها، بالماكرو.",
          "Before the big tool, the planning engineer tried the road with a small request: a script that writes the kit's file names to a text file. He copied, saved with the four choices, and double-clicked. The black window wrote “15 Excel files found” and waited. His colleague did the same on her laptop, with the macro."),
        u("الطريقين وصلوا لنفس المكان: ملف على اللابتوب بيشتغل. ودلوقتي ييجي الشغل الحقيقي: ١٣ ملف أسبوعي، كل واحد شكله مختلف شوية، وفيهم مشاكل متعمّدة. والسؤال اللي الدرس الجاي بيجاوبه: الأداة الأولى هتعمل إيه فيهم؟",
          "Both roads reached the same place: a file on the laptop that runs. Now comes the real work: 13 weekly files, each a little different, with planted problems. And the question the next lesson answers: what will tool one do with them?")],
        answer: u("واجب الدرس: جرّب السكة بسكريبت صغير قبل أي أداة كبيرة. لأن لو المشكلة في السكة، أحسن تعرفها على سطرين مش على ٢٠٠ سطر.", "This lesson's task: try the road with a small script before any big tool — if the problem is in the road, better to find it on two lines than on 200."),
        idea: u("جرّب السكة فاضية… قبل ما تحمّلها.", "Test the road empty… before loading it.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.deliverStory]);
})(window.ACADEMY = window.ACADEMY || {});
