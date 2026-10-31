/* Reviewing code properly — the story deck of lesson k5 (unit 4).
   The planning engineer of unit 3 carries every slide with one question: «إزاي أعرف إن الكود صح، مش بس إنه
   اشتغل؟». The deck walks the seven-point review on example 1's scripts: the plan, the imports, the log, a figure by
   hand (Kuwait 8 against 385: COUNTIF instead of SUMIF), the wrong file, the explanation, a second model; then code
   that is easy to review, and fixing the rule rather than the output; it ends on many new questions, which opens k6.
   Figures come from data/easy-projects.js. Drawings are the rv_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.reviewStory = {
    id: "review", lesson: "k5",
    kicker: u("مراجعة الكود · الحكاية في ٨ دقايق", "Reviewing code · the story in 8 minutes"),
    title: u("اشتغل… لكن هل هو صح؟", "It ran… but is it right?"),
    lead: u("فاكر «الكويت ٨» اللي المدير سأل عنها؟ في الحكاية دي مهندس التخطيط بيتعلّم يراجع الكود من غير ما يكون مبرمج: سبع أسئلة بسيطة، وكل سؤال بيكشف نوع من الغلط.",
      "Remember the “Kuwait 8” the manager asked about? In this story the planning engineer learns to review code without being a programmer: seven simple questions, each catching one kind of mistake."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي أعرف إن الكود صح، مش بس إنه اشتغل؟", "How do I know the code is right, not just that it ran?"),
    finalQuestion: u("طب لو الأسئلة على الجدول كترت؟", "And what if the questions about the table multiply?"),
    note: u("القايمة دي نفسها موجودة في Prompt_4 وفي طقم البداية. الأرقام من المثال الأول، وكلها توضيحية.", "This very checklist is in Prompt_4 and in the starter kit. The figures come from the first example; all are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("مراجعة الكود، في شرائح", "Reviewing code, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "eight", art: "rv_eight", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("رقم المدير", "The manager's figure"),
        title: u("«الكويت ٨ بس؟»", "“Kuwait only 8?”"),
        story: [u("المدير كان متأكد إن الكويت أكتر من ٨ بكتير. مهندس التخطيط رجع للأداة وكتب: «الرقم ده صح؟»، فردت: «أيوه، الكود بيحسب البلاد صح». يعني نفس النموذج اللي كتب الكود بيأكد على شغله.",
          "The manager was sure Kuwait was far more than 8. The planning engineer went back to the tool and wrote: “Is this figure right?”, and it replied: “Yes, the code calculates the countries correctly.” The same model that wrote the code was vouching for its own work."),
        u("والسؤال ده في الحقيقة ما بيراجعش حاجة. المراجعة أسئلة محددة بتجاوبها إنت بنفسك، وبتاخد دقايق، ومش محتاجة تكون مبرمج. والسؤال اللي معانا في الحكاية دي: إزاي أعرف إن الكود صح، مش بس إنه اشتغل؟",
          "And that question actually reviews nothing. A review is a set of specific questions you answer yourself; it takes minutes and needs no programmer. The question we carry in this story: how do I know the code is right, not only that it ran?")],
        answer: u("ما تسألش النموذج «الكود ده صح؟» وتستنى كلمة تطمّنك. لأن النموذج بيميل يوافق على شغله، والمراجعة لازم تيجي من برّه.", "Don't ask the model “is this code right?” and wait for reassurance — a model tends to agree with its own work; the review must come from outside."),
        idea: u("«صح؟» مش مراجعة.", "“Is it right?” isn't a review.")
      },
      {
        id: "ran", art: "rv_ran", year: u("اشتغل ≠ صح", "Ran ≠ right"), mark: u("٠٢", "02"), era: u("نوعين من الغلط", "Two kinds of mistake"),
        title: u("الغلطة اللي بتبان… والغلطة الساكتة", "The mistake that shows… and the silent mistake"),
        story: [u("فيه نوعين من الغلط. نوع بيبان: السكريبت يوقف برسالة حمرا، وده سهل لأن الأداة نفسها بتصلّحه. ونوع ساكت: السكريبت يخلص ويقول «تم»، والرقم غلط. والنوع ده هو اللي بيوصل للمدير.",
          "There are two kinds of mistake. One shows: the script stops with a red message; that's easy, because the tool fixes it itself. The other is silent: the script finishes and says “done”, and the figure is wrong. That kind is the one that reaches the manager."),
        u("و«الكويت ٨» غلطة ساكتة: مفيش رسالة ولا خطأ، والإجمالي كمان صح. علشان كده المراجعة مش سؤال «اشتغل؟»، المراجعة سؤال «الأرقام اللي طلعت صح؟»، والسؤال ده ليه أسئلة محددة.",
          "“Kuwait 8” is a silent mistake: no message, no error, and the total is right too. That's why a review isn't the question “did it run?”; a review is the question “are the figures that came out right?”, and that question has specific questions of its own.")],
        answer: u("دوّر على الغلط الساكت، مش بس الغلط اللي بيوقف الأداة. لأن الأداة اللي بتوقف بتنبّهك، والأداة اللي بتكمّل غلط بتخلّيك تبعت رقم غلط وإنت واثق فيه.", "Hunt for silent mistakes, not only those that stop the tool — a tool that stops warns you; one that carries on wrongly lets you send a wrong figure with confidence."),
        idea: u("الغلطة الساكتة… هي الخطيرة.", "The silent mistake… is the dangerous one.")
      },
      {
        id: "plan", art: "rv_plan", year: u("١ الخطة", "1 The plan"), mark: u("٠٣", "03"), era: u("بيعمل إيه؟", "What does it do?"),
        title: u("السؤال الأول: الخطوة بتعمل اللي طلبته بس؟", "Question 1: does the step do only what I asked?"),
        story: [u("فتح step3_report.ps1 وقرا التعليقات اللي فوق كل جزء: «اقرا Data»، و«اعمل جدول البلاد»، و«اعمل جدول الخطوط»، و«احفظ CSV». أربع أجزاء، كلها من الطلب، ومفيش جزء زيادة زي «امسح الملفات القديمة» أو «ابعت إيميل».",
          "He opened step3_report.ps1 and read the comments above each part: “read Data”, “make the country table”, “make the line table”, “save CSV”. Four parts, all from the request, and no extra part such as “delete old files” or “send an e-mail”."),
        u("ده أسهل سؤال، لكنه بيكشف أخطر حاجة: كود بيعمل حاجة إنت ما طلبتهاش. ولو فيه جزء مش فاهمه، اسأل عليه قبل أي حاجة تانية.",
          "It's the easiest question, yet it catches the most dangerous thing: code doing something you didn't ask for. And if there is a part you don't understand, ask about it before anything else.")],
        answer: u("اقرا عناوين أجزاء السكريبت وقارنها بطلبك. لأن أي جزء زيادة ممكن يعمل حاجة ما ترجعش، من غير ما تاخد بالك.", "Read the headings of the script's parts and compare them with your request — any extra part might do something irreversible without your noticing."),
        idea: u("الكود يعمل اللي طلبته… وبس.", "The code does what you asked… only.")
      },
      {
        id: "imports", art: "rv_imports", year: u("٢ من برّه؟", "2 Outside?"), mark: u("٠٤", "04"), era: u("أول السكريبت", "The script's top"),
        title: u("السؤال التاني: بيستخدم حاجة من برّه؟", "Question 2: does it use anything from outside?"),
        story: [u("دوّر في السكريبتات التلاتة على كلمات معيّنة: import، وpip، وInvoke-WebRequest، وhttp. في سكريبتات PowerShell ما لقاش غير New-Object -ComObject Excel.Application، وفي سكريبت Python بتاع الخطوة ٥ لقى import csv وimport sqlite3 بس.",
          "He searched the three scripts for particular words: import, pip, Invoke-WebRequest and http. In the PowerShell scripts he found only New-Object -ComObject Excel.Application, and in step 5's Python script only import csv and import sqlite3."),
        u("ده سؤال قسم الأمن الأول بالحرف. ولو جاوب عليه بنفسه قبل ما يبعت الأداة، هيجاوبهم في دقيقة لما يسألوا. وكتب في ملاحظاته: المكتبة القياسية بس، ومفيش نت.",
          "That is the security team's first question, word for word. If he answers it himself before sending the tool, he will answer them in a minute when they ask. He noted: the standard library only, and no internet.")],
        answer: u("دوّر في كل سكريبت على الكلمات اللي بتجيب حاجة من برّه، قبل ما تبعته لحد. لأن سؤال قسم الأمن جاي جاي، والأحسن تكون إنت اللي سألته الأول.", "Search every script for the words that fetch something from outside, before sending it anywhere — the security team's question will come, and it's better that you asked it first."),
        idea: u("سؤال الأمن… اسأله إنت الأول.", "The security question… ask it first.")
      },
      {
        id: "log", art: "rv_log", year: u("٣ السجل", "3 The log"), mark: u("٠٥", "05"), era: u("الأرقام في السجل", "Figures in the log"),
        title: u("السؤال التالت: السجل بيقول إيه؟", "Question 3: what does the log say?"),
        story: [u("فتح Run_Log.txt: الخطوة ١ كتبت عدد صفوف كل ملف وإجماليه، والخطوة ٢ كتبت عدد خانات #N/A. لكن الخطوة ٣ كتبت سطر واحد: «Report: done»، من غير ولا رقم من جدول البلاد.",
          "He opened Run_Log.txt: step 1 wrote each file's row count and total, and step 2 wrote the number of #N/A cells. But step 3 wrote a single line, “Report: done”, without one figure from the country table."),
        u("والسجل اللي بيقول done بس مش سجل. السجل لازم يكتب أرقام تقدر تقارنها: إجمالي التقرير، ومجموع جدول البلاد، ومجموع جدول الخطوط. ولو كان كتب مجموع جدول البلاد، كان هيطلع ٣٦ مش ١٬٧٦٥، والغلطة كانت هتبان فورًا.",
          "A log that only says done isn't a log. A log must write figures you can compare: the report's total, the country table's sum, the line table's sum. Had it written the country table's sum, it would have shown 36, not 1,765, and the mistake would have shown at once.")],
        answer: u("كل خطوة لازم تكتب في السجل أرقام تتقارن، مش كلمة «تم». لأن الرقم في السجل بيكشف الغلط الساكت قبل ما حد يفتح التقرير.", "Every step must log figures that can be compared, not “done” — a figure in the log exposes a silent mistake before anyone opens the report."),
        idea: u("«done» مش سجل.", "“done” isn't a log.")
      },
      {
        id: "hand", art: "rv_hand", year: u("٤ بإيدك", "4 By hand"), mark: u("٠٦", "06"), era: u("رقم واحد", "One figure"),
        title: u("السؤال الرابع: رقم واحد تحسبه بإيدك", "Question four: one figure you compute by hand"),
        story: [u("فتح الملفين في إكسل، وعمل فلتر على CountryCode بـ KW، وجمع Qty، فطلع ٣٨٥، والتقرير بيقول ٨. وبعدين عدّ الصفوف بعد الفلتر: ٨ صفوف. يعني الأداة كانت بتعدّ الصفوف بدل ما تجمع الكمية: COUNTIF بدل SUMIF.",
          "He opened the two files in Excel, filtered CountryCode on KW and summed Qty: 385, while the report says 8. Then he counted the filtered rows: 8 rows. The tool was counting rows instead of adding up the quantity: COUNTIF instead of SUMIF."),
        u("كلمة واحدة في معادلة. والإجمالي اللي فوق كان صح، لأنه SUM على العمود كله، فمحدش شك. ورقم واحد من المصدر، بتحسبه بإيدك، بيكشف اللي ما كشفوش السجل ولا النموذج.",
          "One word in a formula. And the total above was right, because it is a SUM over the whole column, so nobody doubted it. One figure from the source, computed by hand, catches what neither the log nor the model caught.")],
        answer: u("احسب رقم واحد على الأقل من المصدر بإيدك، وقارنه بالأداة. لأن الحساب بالإيد هو المراجعة الوحيدة اللي ما بتعتمدش على الكود اللي بتراجعه.", "Work out at least one figure from the source by hand, and compare it with the tool — a hand calculation is the only check that doesn't rely on the code under review."),
        idea: u("فلتر وجمع… بيكشفوا كلمة غلط.", "A filter and a sum… expose one wrong word.")
      },
      {
        id: "wrong", art: "rv_wrong", year: u("٥ ملف غلط", "5 Wrong file"), mark: u("٠٧", "07"), era: u("تجربة قاسية", "A harsh test"),
        title: u("السؤال الخامس: لو الملف جه غلط؟", "Question 5: what if a file arrives wrong?"),
        story: [u("عمل نسخة من الفولدر، وغيّر في Week_02 اسم العمود Qty لـ Quantity، ودوس Run_All. الخطوة ١ ما وقفتش: كمّلت وكتبت صفوف Week_02 بكمية فاضية، والإجمالي طلع ٨٤٥ بدل ١٬٧٦٥، من غير ولا رسالة.",
          "He made a copy of the folder, renamed the Qty column of Week_02 to Quantity, and clicked Run_All. Step 1 didn't stop: it carried on, wrote Week_02's rows with an empty quantity, and the total came out 845 instead of 1,765, without a single message."),
        u("وده بالظبط اللي ممكن يحصل الشهر الجاي لو النظام غيّر اسم عمود. فطلب تصليح: «لو أي عمود من الخمسة مش موجود بالاسم، وقّف برسالة فيها اسم الملف والعمود». وجرّب تاني، فظهرت الرسالة: «Week_02.xlsx: مفيش عمود Qty»، والأداة وقفت.",
          "That is exactly what may happen next month if the system renames a column. So he asked for a fix: “If any of the five columns is missing by name, stop with a message naming the file and the column.” He tried again, the message appeared — “Week_02.xlsx: no Qty column” — and the tool stopped.")],
        answer: u("جرّب الأداة على نسخة فيها غلطة مقصودة، ولازم توقف برسالة واضحة. لأن الأداة اللي بتكمّل على ملف غلط هتعمل كده يوم ما الملف الحقيقي يتغيّر.", "Try the tool on a copy with a deliberate fault, and it must stop with a clear message — a tool that carries on through a wrong file will do the same the day the real file changes."),
        idea: u("غلّط الملف بإيدك… قبل ما يتغلّط لوحده.", "Break the file yourself… before it breaks on its own.")
      },
      {
        id: "explain", art: "rv_explain", year: u("٦ الشرح", "6 Explanation"), mark: u("٠٨", "08"), era: u("سطرين لكل جزء", "Two lines a part"),
        title: u("السؤال السادس: اشرحلي كل جزء في سطرين", "Question 6: explain each part in two lines"),
        story: [u("طلب من الأداة: «اشرحلي كل جزء في step3_report.ps1 في سطرين، بكلام بسيط». الشرح قال عن جدول البلاد: «بيجمع الكمية لكل بلد»، لكن الكود تحته فيه COUNTIF. يعني الشرح بيوصف المفروض، والكود بيعمل حاجة تانية.",
          "He asked the tool: “Explain each part of step3_report.ps1 in two lines, in plain words.” The explanation said of the country table: “adds up the quantity per country”, but the code under it holds COUNTIF. The explanation describes what should be, and the code does something else."),
        u("والمقارنة بين الشرح والكود من أحسن المراجعات. مش لازم تفهم كل كلمة: لو الشرح قال «بيجمع»، دوّر على SUM في الجزء ده، ولو مش لاقيها، يبقى فيه مشكلة.",
          "Comparing the explanation with the code is one of the best reviews. You needn't understand every word: if the explanation says “adds up”, look for SUM in that part, and if it isn't there, something is wrong.")],
        answer: u("اطلب شرح كل جزء بكلام بسيط، وقارن الشرح بالكلمات اللي في الكود. لأن الفرق بين اللي النموذج فاكره واللي كتبه فعلًا هو مكان الغلطة بالظبط.", "Ask for each part explained in plain words, and compare it with the words in the code — the gap between what the model thinks it wrote and what it wrote is exactly where the mistake is."),
        idea: u("الشرح بيقول يجمع… والكود بيعدّ.", "The explanation says sum… the code counts.")
      },
      {
        id: "second", art: "rv_second", year: u("٧ رأي تاني", "7 Second opinion"), mark: u("٠٩", "09"), era: u("عينين جداد", "Fresh eyes"),
        title: u("السؤال السابع: نموذج تاني بنفس القايمة", "Question 7: another model, the same list"),
        story: [u("الكود اتكتب في Claude Code. ففتح Codex في نفس الفولدر، ولصق Prompt_4: قايمة المراجعة السبعة، ومعاها «ما تعدّلش حاجة». Codex رجع بتلات ملاحظات: COUNTIF بدل SUMIF، وMasters.xlsx بيتفتح من غير read-only، وسجل الخطوة ٣ مفيهوش أرقام.",
          "The code was written in Claude Code. So he opened Codex in the same folder and pasted Prompt_4: the seven-point review list, with “change nothing”. Codex came back with three notes: COUNTIF instead of SUMIF, Masters.xlsx opened without read-only, and step 3's log holding no figures."),
        u("والملاحظة التانية ما كانش واخد باله منها خالص. النموذج التاني ما كتبش الكود، فمش بيدافع عنه. والعكس صحيح: اللي يكتبه Codex، يراجعه Claude. ولو عندك أداة واحدة بس، جلسة جديدة بتدّي جزء كبير من نفس الفايدة.",
          "He had not noticed the second note at all. The second model didn't write the code, so it doesn't defend it. And the reverse holds: what Codex writes, Claude reviews. With one tool only, a new session gives much of the same benefit.")],
        answer: u("ادّي الكود لنموذج تاني أو لجلسة جديدة بنفس القايمة، ومن غير ما يعدّل. لأن اللي ما كتبش الكود بيشوف اللي كاتبه اتعوّد عليه.", "Give the code to another model or a new session with the same list, and without editing — whoever didn't write the code sees what its writer got used to."),
        idea: u("اللي ما كتبش الكود… بيشوفه أوضح.", "The one who didn't write the code… sees it more clearly.")
      },
      {
        id: "good", art: "rv_good", year: u("كود يتراجع", "Reviewable code"), mark: u("١٠", "10"), era: u("من أول الطلب", "From the request"),
        title: u("أسهل كود في المراجعة… كود اتطلب صح من الأول", "The easiest code to review… was requested right from the start"),
        story: [u("وفهم إن المراجعة بتبدأ قبل الكود: في الطلب نفسه بيقول إن كل جزء ليه وظيفة واحدة واسم بيوصف شغله، وفوقه تعليق بكلام بسيط، والمسارات وأسماء الأعمدة في أول السكريبت، ووقفة برسالة واضحة، وسطر في السجل لكل مراجعة.",
          "And he understood that a review starts before the code: the request itself says each part has one job and a name describing it, a plain-words comment above it, the paths and column names at the top of the script, a stop with a clear message, and a log line for every check."),
        u("طلب الخطوة ٣ تاني بالشروط دي. السكريبت الجديد كان أطول بـ ١٥ سطر، لكن كل جزء ليه عنوان، وأسماء الأعمدة الخمسة مكتوبة في أول سطرين، والسجل بيكتب مجموع كل جدول. والكود الكويس هو الكود اللي تقدر تراجعه.",
          "He asked for step 3 again with these conditions. The new script was 15 lines longer, but every part had a heading, the five column names were written in the first two lines, and the log wrote each table's sum. Good code is code you can review.")],
        answer: u("اطلب في الـ Prompt كود سهل في المراجعة: وظيفة لكل جزء، وتعليقات، والثوابت فوق، وسجل بالأرقام. لأن الكود اللي تقدر تراجعه هو الكود اللي تقدر تثق فيه.", "Ask in the Prompt for code that's easy to review: one job per part, comments, constants on top, a log of figures — code you can review is code you can trust."),
        idea: u("الكود الكويس… هو اللي تقدر تراجعه.", "Good code… is code you can review.")
      },
      {
        id: "fix", art: "rv_fix", year: u("التصليح", "The fix"), mark: u("١١", "11"), era: u("في القاعدة", "In the rule"),
        title: u("صلّح القاعدة… مش الرقم", "Fix the rule… not the figure"),
        story: [u("كان أسهل حاجة إنه يكتب ٣٨٥ بإيده مكان ٨ في التقرير ويبعته. لكن الأسبوع الجاي الأداة هتطلّع نفس الغلطة تاني. فطلب التصليح في الكود نفسه: SUMIF بدل COUNTIF، وMasters للقراءة بس، والسجل بالأرقام.",
          "The easiest thing would have been to type 385 by hand over the 8 in the report and send it. But next week the tool would produce the same mistake again. So he asked for the fix in the code itself: SUMIF instead of COUNTIF, Masters read-only, and a log with figures."),
        u("مسح Output، ودوس Run_All، وراجع تاني: الكويت ٣٨٥، ومصر ٨٨٠، والتصدير ٥٠٪، ومجموع جدول البلاد ١٬٧٦٥ زي الإجمالي. وبعت للمدير: «اتصلّح، والسبب كان في قاعدة الحساب، ودي الأرقام الصح».",
          "He deleted Output, clicked Run_All, and checked again: Kuwait 385, Egypt 880, export 50%, and the country table's sum 1,765, the same as the total. He wrote to the manager: “Fixed; the cause was in the calculation rule, and these are the right figures.”")],
        answer: u("صلّح الغلط في قاعدة الكود وشغّل من الأول، وما تصلّحش الناتج بإيدك. لأن التصليح بالإيد بيختفي مع أول تشغيل جاي، والغلطة بترجع.", "Fix the mistake in the code's rule and run from scratch; never patch the output by hand — a hand fix vanishes on the next run, and the mistake returns."),
        idea: u("التصليح بالإيد… بيرجع الأسبوع الجاي.", "A hand fix… comes back next week.")
      },
      {
        id: "cliff", art: "rv_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("أسئلة كتير", "Many questions"),
        title: u("المدير اطمّن… وبعت ٦ أسئلة جديدة", "The manager was reassured… and sent 6 new questions"),
        story: [u("المدير رد: «تمام. طب عايز أعرف: أنهي خط عمل M108 أكتر؟ والكويت جالها منين؟ وأسبوع ١ ولا ٢ كان أحسن لكل بلد؟»، وكمّل لحد ٦ أسئلة. وكل سؤال معناه فلتر جديد، أو تعديل في الأداة.",
          "The manager replied: “Fine. Now I want to know: which line made the most M108? Where did Kuwait's sets come from? Was week 1 or week 2 better for each country?”, up to 6 questions. Each question means a new filter, or a change to the tool."),
        u("مهندس التخطيط بص للجدول: ٣٦ صف بس، والأسئلة مش هتخلص، وكل تعديل في الأداة معناه مراجعة من الأول. ومن هنا بيبدأ الدرس الجاي: طب لو الأسئلة على الجدول كترت؟",
          "The planning engineer looked at the table: only 36 rows, the questions won't end, and every change to the tool means a review from the start. And here the next lesson begins: what if the questions on the table keep growing?")],
        answer: u("واجب الدرس: استخدم Prompt_4 في جلسة جديدة على سكريبتات الخطوات التلاتة، واحسب رقم بإيدك بالفلتر، وجرّب نسخة فيها عمود اسمه متغيّر، واكتب أخطر غلطة لقيتها. لأن القايمة دي هتتحفظ في طقم البداية في آخر الوحدة.", "This lesson's task: use Prompt_4 in a new session on the three steps' scripts, do one figure by hand with a filter and one copy with a renamed column, and write down the worst mistake you found — this checklist is saved in the starter kit at the end of the unit."),
        idea: u("الأداة اللي اتراجعت… بتجيب أسئلة أكتر.", "A reviewed tool… brings more questions.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.reviewStory]);
})(window.ACADEMY = window.ACADEMY || {});
