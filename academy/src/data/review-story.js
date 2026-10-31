/* Reviewing code properly — the story deck of lesson k5 (unit 4).
   The planning engineer at the second plant carries every slide with one question: «إزاي أعرف إن الكود صح، مش بس إنه
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
    title: u("اشتغل… بس هل هو صح؟", "It ran… but is it right?"),
    lead: u("فاكر «الكويت ٨» اللي المدير سأل عنها؟ في الحكاية دي مهندسة التخطيط بتتعلّم تراجع الكود من غير ما تبقى مبرمجة: سبع أسئلة بسيطة، كل واحد بيمسك نوع غلط.",
      "Remember “Kuwait 8”, which the manager asked about? In this story the planning engineer learns to review code without being a programmer: seven simple questions, each catching one kind of mistake."),
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
        story: [u("المدير كان متأكد إن الكويت أكتر من ٨ بكتير. مهندسة التخطيط رجعت للأداة، وكتبت: «الرقم ده صح؟». الأداة ردت: «أيوه، الكود بيحسب البلاد صح». نفس النموذج اللي كتب الكود، بيأكد على كوده.",
          "The manager was sure Kuwait was far more than 8. The planning engineer went back to the tool and wrote: “Is this figure right?” The tool replied: “Yes, the code calculates the countries correctly.” The same model that wrote the code, vouching for its own code."),
        u("الزميل قالها: «السؤال ده ما بيراجعش حاجة. المراجعة أسئلة محددة إنتي تجاوبيها بنفسك، ومحتاجة دقايق. ومش لازم تبقي مبرمجة». والسؤال اللي ماشي معانا: إزاي أعرف إن الكود صح، مش بس إنه اشتغل؟",
          "The colleague told her: “That question reviews nothing. A review is specific questions you answer yourself, taking minutes. And you needn't be a programmer.” The question we carry: how do I know the code is right, not just that it ran?")],
        answer: u("ما تسألش النموذج «الكود ده صح؟» وتستنى تطمين. لأن النموذج بيميل يوافق على شغله، والمراجعة لازم تيجي من برّه.", "Don't ask the model “is this code right?” and wait for reassurance — a model tends to agree with its own work; the review must come from outside."),
        idea: u("«صح؟» مش مراجعة.", "“Is it right?” isn't a review.")
      },
      {
        id: "ran", art: "rv_ran", year: u("اشتغل ≠ صح", "Ran ≠ right"), mark: u("٠٢", "02"), era: u("نوعين من الغلط", "Two kinds of mistake"),
        title: u("الغلطة اللي بتصرخ… والغلطة الساكتة", "The mistake that shouts… and the silent one"),
        story: [u("«فيه نوعين غلط. نوع بيصرخ: السكريبت يقف برسالة حمرا. ده سهل، الأداة نفسها بتصلّحه. ونوع ساكت: السكريبت يخلص ويقول تم، والرقم غلط. ده اللي بيوصل للمدير».",
          "“There are two kinds of mistake. One shouts: the script stops with a red message. That's easy; the tool fixes it itself. The other is silent: the script finishes, says done, and the figure is wrong. That's the one that reaches the manager.”"),
        u("«الكويت ٨ غلطة ساكتة: ولا رسالة، ولا خطأ، والإجمالي كمان صح. علشان كده المراجعة مش «اشتغل؟»: المراجعة «الأرقام اللي طلعت صح؟»، ودي ليها أسئلة».",
          "“Kuwait 8 is a silent mistake: no message, no error, and the total is even right. That's why a review isn't “did it run?”: a review is “are the figures right?”, and that has its questions.”")],
        answer: u("دوّر على الغلط الساكت، مش بس الغلط اللي بيوقف الأداة. لأن الأداة اللي بتقف بتنبّهك، واللي بتكمّل غلط بتسيبك تبعت رقم غلط بثقة.", "Hunt for silent mistakes, not only those that stop the tool — a tool that stops warns you; one that carries on wrongly lets you send a wrong figure with confidence."),
        idea: u("الغلطة الساكتة… هي الخطيرة.", "The silent mistake… is the dangerous one.")
      },
      {
        id: "plan", art: "rv_plan", year: u("١ الخطة", "1 The plan"), mark: u("٠٣", "03"), era: u("بيعمل إيه؟", "What does it do?"),
        title: u("السؤال الأول: الخطوة بتعمل اللي طلبته بس؟", "Question 1: does the step do only what I asked?"),
        story: [u("فتحت step3_report.ps1 وقرت التعليقات اللي فوق كل جزء: «اقرا Data»، «اعمل جدول البلاد»، «اعمل جدول الخطوط»، «احفظ CSV». أربع أجزاء، كلهم من الطلب. مفيش جزء زيادة، زي «امسح الملفات القديمة» أو «ابعت إيميل».",
          "She opened step3_report.ps1 and read the comments above each part: “read Data”, “build the countries table”, “build the lines table”, “save CSV”. Four parts, all from the request. No extra part, such as “delete old files” or “send an e-mail”."),
        u("«ده أسهل سؤال، وبيمسك أخطر حاجة: كود بيعمل حاجة إنتي ما طلبتيهاش. ولو فيه جزء مش فاهماه، اسألي عليه قبل أي حاجة».",
          "“That's the easiest question, and it catches the most dangerous thing: code doing something you didn't ask for. And if there's a part you don't understand, ask about it before anything else.”")],
        answer: u("اقرا عناوين أجزاء السكريبت وقارنها بطلبك. لأن أي جزء زيادة ممكن يعمل حاجة ما بترجعش، وانت مش واخد بالك.", "Read the headings of the script's parts and compare them with your request — any extra part might do something irreversible without your noticing."),
        idea: u("الكود يعمل اللي طلبته… بس.", "The code does what you asked… only.")
      },
      {
        id: "imports", art: "rv_imports", year: u("٢ من برّه؟", "2 Outside?"), mark: u("٠٤", "04"), era: u("أول السكريبت", "The script's top"),
        title: u("السؤال التاني: بيستخدم حاجة من برّه؟", "Question 2: does it use anything from outside?"),
        story: [u("دوّرت في السكريبتات التلاتة على كلمات بعينها: import، وpip، وInvoke-WebRequest، وhttp. في سكريبتات PowerShell ما لقتش غير New-Object -ComObject Excel.Application. وفي سكريبت Python الخطوة ٥: import csv وimport sqlite3 بس.",
          "She searched the three scripts for specific words: import, pip, Invoke-WebRequest, and http. In the PowerShell scripts she found nothing but New-Object -ComObject Excel.Application. In step 5's Python script: import csv and import sqlite3 only."),
        u("«ده سؤال قسم الأمن الأول بالحرف. لو جاوبتيه إنتي قبل ما تبعتي الأداة، هتجاوبيهم في دقيقة لما يسألوا». وكتبت في السجل بتاعها: المكتبة القياسية بس، ومفيش نت.",
          "“That's the security team's first question, word for word. If you answer it before sending the tool, you'll answer them in a minute when they ask.” And she wrote in her own notes: standard library only, no internet.")],
        answer: u("دوّر في كل سكريبت على الكلمات اللي بتجيب حاجة من برّه، قبل ما تبعته لحد. لأن سؤال قسم الأمن هييجي، والأحسن تبقى إنت اللي سألته الأول.", "Search every script for the words that fetch something from outside, before sending it anywhere — the security team's question will come, and it's better that you asked it first."),
        idea: u("سؤال الأمن… اسأله إنت الأول.", "The security question… ask it first.")
      },
      {
        id: "log", art: "rv_log", year: u("٣ السجل", "3 The log"), mark: u("٠٥", "05"), era: u("الأرقام في السجل", "Figures in the log"),
        title: u("السؤال التالت: السجل بيقول إيه؟", "Question 3: what does the log say?"),
        story: [u("فتحت Run_Log.txt: الخطوة ١ كتبت عدد صفوف وإجمالي كل ملف. والخطوة ٢ كتبت عدد #N/A. بس الخطوة ٣ كتبت سطر واحد: «Report: done». ولا رقم من جدول البلاد.",
          "She opened Run_Log.txt: step 1 logged each file's row count and total. Step 2 logged the number of #N/A. But step 3 logged one line: “Report: done”. Not one figure from the countries table."),
        u("«السجل اللي بيقول done بس مش سجل. السجل لازم يكتب الأرقام اللي تقدري تقارنيها: إجمالي التقرير، ومجموع جدول البلاد، ومجموع جدول الخطوط». ولو كان كتب مجموع جدول البلاد، كان هيطلع ٣٦ مش ١٬٧٦٥، والغلطة كانت هتبان.",
          "“A log that only says done isn't a log. A log must record the figures you can compare: the report's total, the countries table's sum, the lines table's sum.” Had it logged the countries table's sum, it would have shown 36, not 1,765, and the mistake would have shown.")],
        answer: u("كل خطوة لازم تكتب في السجل أرقام تتقارن، مش «تم». لأن الرقم في السجل بيكشف الغلط الساكت قبل ما حد يفتح التقرير.", "Every step must log figures that can be compared, not “done” — a figure in the log exposes a silent mistake before anyone opens the report."),
        idea: u("«done» مش سجل.", "“done” isn't a log.")
      },
      {
        id: "hand", art: "rv_hand", year: u("٤ بإيدك", "4 By hand"), mark: u("٠٦", "06"), era: u("رقم واحد", "One figure"),
        title: u("السؤال الرابع: رقم واحد بإيدك", "Question 4: one figure by hand"),
        story: [u("فتحت الملفين في إكسل، وفلترت CountryCode على KW، وجمعت Qty: ٣٨٥. التقرير قال ٨. وبعدين عدّت الصفوف المفلترة: ٨ صفوف. الأداة كانت بتعدّ الصفوف بدل ما تجمع الكمية: COUNTIF بدل SUMIF.",
          "She opened both files in Excel, filtered CountryCode on KW, and summed Qty: 385. The report said 8. Then she counted the filtered rows: 8 rows. The tool was counting rows instead of summing the quantity: COUNTIF instead of SUMIF."),
        u("كلمة واحدة في معادلة. والإجمالي اللي فوق كان صح، لأنه SUM على العمود كله، فما حدش شك. «رقم واحد من المصدر، بتحسبيه بإيدك، بيمسك اللي ولا سجل ولا نموذج مسكه».",
          "One word in one formula. And the total above was right, because it was a SUM over the whole column, so nobody doubted it. “One figure from the source, worked out by hand, catches what no log and no model caught.”")],
        answer: u("احسب رقم واحد على الأقل من المصدر بإيدك، وقارنه بالأداة. لأن الحساب بالإيد هو المراجعة الوحيدة اللي ما بتعتمدش على الكود اللي بتراجعه.", "Work out at least one figure from the source by hand, and compare it with the tool — a hand calculation is the only check that doesn't rely on the code under review."),
        idea: u("فلتر وجمع… يكشفوا كلمة غلط.", "A filter and a sum… expose one wrong word.")
      },
      {
        id: "wrong", art: "rv_wrong", year: u("٥ ملف غلط", "5 Wrong file"), mark: u("٠٧", "07"), era: u("تجربة قاسية", "A harsh test"),
        title: u("السؤال الخامس: لو الملف جه غلط؟", "Question 5: what if a file arrives wrong?"),
        story: [u("عملت نسخة من الفولدر، وغيّرت في Week_02 اسم العمود Qty لـ Quantity، ودوست Run_All. الخطوة ١ ما وقفتش: كمّلت، وكتبت صفوف Week_02 بكمية فاضية، والإجمالي طلع ٨٤٥ بدل ١٬٧٦٥. من غير ولا رسالة.",
          "She made a copy of the folder, renamed the Qty column in Week_02 to Quantity, and ran Run_All. Step 1 didn't stop: it carried on, wrote Week_02's rows with an empty quantity, and the total came out 845 instead of 1,765. Without a single message."),
        u("ده بالظبط اللي ممكن يحصل الشهر الجاي لو النظام غيّر اسم عمود. طلبت تصليح: «لو أي عمود من الخمسة مش موجود بالاسم، وقّف برسالة فيها اسم الملف والعمود». جرّبت تاني: «Week_02.xlsx: مفيش عمود Qty». وقفت.",
          "That's exactly what could happen next month if the system renames a column. She asked for a fix: “If any of the five columns is missing by name, stop with a message naming the file and the column.” She tried again: “Week_02.xlsx: no Qty column”. It stopped.")],
        answer: u("جرّب الأداة على نسخة فيها غلطة متعمّدة، ولازم تقف برسالة واضحة. لأن الأداة اللي بتكمّل على ملف غلط هتكمّل كده يوم ما الملف الحقيقي يتغيّر.", "Try the tool on a copy with a deliberate fault, and it must stop with a clear message — a tool that carries on through a wrong file will do the same the day the real file changes."),
        idea: u("غلّط الملف بإيدك… قبل ما يتغلّط لوحده.", "Break the file yourself… before it breaks on its own.")
      },
      {
        id: "explain", art: "rv_explain", year: u("٦ الشرح", "6 Explanation"), mark: u("٠٨", "08"), era: u("سطرين لكل جزء", "Two lines a part"),
        title: u("السؤال السادس: اشرحلي كل جزء في سطرين", "Question 6: explain each part in two lines"),
        story: [u("طلبت من الأداة: «اشرحلي كل جزء في step3_report.ps1 في سطرين، بكلام بسيط». الشرح قال عن جدول البلاد: «بيجمع الكمية لكل بلد». بس الكود تحته كان فيه COUNTIF. الشرح بيوصف اللي المفروض، والكود بيعمل حاجة تانية.",
          "She asked the tool: “Explain each part of step3_report.ps1 in two plain lines.” The explanation said of the countries table: “sums the quantity per country”. But the code beneath it held COUNTIF. The explanation described what was intended; the code did something else."),
        u("«المقارنة بين الشرح والكود من أحسن المراجعات. مش لازم تفهمي كل كلمة: لو الشرح قال يجمع، دوّري على SUM في الجزء ده. ولو مش لاقياها، يبقى فيه حاجة».",
          "“Comparing the explanation with the code is one of the best checks. You needn't understand every word: if the explanation says it sums, look for SUM in that part. If it isn't there, something's off.”")],
        answer: u("اطلب شرح كل جزء بكلام بسيط، وقارن الشرح بالكلمات اللي في الكود. لأن الفرق بين اللي النموذج فاكره واللي كتبه هو مكان الغلطة بالظبط.", "Ask for each part explained in plain words, and compare it with the words in the code — the gap between what the model thinks it wrote and what it wrote is exactly where the mistake is."),
        idea: u("الشرح بيقول يجمع… الكود بيعدّ.", "The explanation says sum… the code counts.")
      },
      {
        id: "second", art: "rv_second", year: u("٧ رأي تاني", "7 Second opinion"), mark: u("٠٩", "09"), era: u("عينين جداد", "Fresh eyes"),
        title: u("السؤال السابع: نموذج تاني بنفس القايمة", "Question 7: another model, the same list"),
        story: [u("الكود اتكتب في Claude Code. فتحت Codex في نفس الفولدر، ولصقت Prompt_4: قايمة المراجعة السبعة، و«ما تعدّلش حاجة». Codex رجع بتلات ملاحظات: COUNTIF بدل SUMIF، وMasters.xlsx بيتفتح من غير read-only، وسجل الخطوة ٣ مفيهوش أرقام.",
          "The code was written in Claude Code. She opened Codex in the same folder and pasted Prompt_4: the seven-point checklist, and “change nothing”. Codex came back with three notes: COUNTIF instead of SUMIF, Masters.xlsx opened without read-only, and step 3's log holding no figures."),
        u("التانية ما كانتش واخدة بالها منها خالص. «النموذج التاني ما كتبش الكود، فمش بيدافع عنه. ونفس الكلام لو العكس: اللي يكتبه Codex، Claude يراجعه». ولو مفيش غير أداة واحدة، جلسة جديدة بتعمل نص الفايدة.",
          "She hadn't noticed the second one at all. “The other model didn't write the code, so it doesn't defend it. The same holds the other way round: what Codex writes, Claude reviews.” With only one tool, a new session gives half the benefit.")],
        answer: u("ادّي الكود لنموذج تاني أو جلسة جديدة بنفس القايمة، ومن غير ما يعدّل. لأن اللي ما كتبش الكود بيشوف اللي كاتبه اتعوّد عليه.", "Give the code to another model or a new session with the same list, and without editing — whoever didn't write the code sees what its writer got used to."),
        idea: u("اللي ما كتبش… بيشوف أحسن.", "Whoever didn't write it… sees better.")
      },
      {
        id: "good", art: "rv_good", year: u("كود يتراجع", "Reviewable code"), mark: u("١٠", "10"), era: u("من أول الطلب", "From the request"),
        title: u("أسهل كود يتراجع… اتطلب صح من الأول", "The easiest code to review… was asked for properly"),
        story: [u("الزميل قالها: «المراجعة بتبدأ قبل الكود. قولي في الطلب: كل جزء ليه وظيفة واحدة واسم بيقول بيعمل إيه، وتعليق فوقه بكلام بسيط، والمسارات وأسماء الأعمدة في أول السكريبت، ووقفة برسالة واضحة، وسطر في السجل لكل مراجعة».",
          "The colleague told her: “Review starts before the code. Say in the request: each part has one job and a name saying what it does, a plain comment above it, the paths and column names at the top of the script, a stop with a clear message, and one log line per check.”"),
        u("طلبت الخطوة ٣ تاني بالكلام ده. السكريبت الجديد كان أطول ١٥ سطر، بس كل جزء ليه عنوان، وأسماء الأعمدة الخمسة مكتوبة في أول سطرين، والسجل بيكتب مجموع كل جدول. «الكود الكويس هو الكود اللي إنتي تقدري تراجعيه».",
          "She asked for step 3 again with those words. The new script was 15 lines longer, but every part had a heading, the five column names were written in the first two lines, and the log recorded each table's sum. “Good code is code you can review.”")],
        answer: u("اطلب في الـ Prompt كود سهل يتراجع: وظيفة لكل جزء، وتعليقات، وثوابت فوق، وسجل بالأرقام. لأن الكود اللي تقدر تراجعه هو الكود اللي تقدر تثق فيه.", "Ask in the Prompt for code that's easy to review: one job per part, comments, constants on top, a log of figures — code you can review is code you can trust."),
        idea: u("الكود الكويس… هو اللي تقدر تراجعه.", "Good code… is code you can review.")
      },
      {
        id: "fix", art: "rv_fix", year: u("التصليح", "The fix"), mark: u("١١", "11"), era: u("في القاعدة", "In the rule"),
        title: u("صلّح القاعدة… مش الرقم", "Fix the rule… not the figure"),
        story: [u("كان أسهل حاجة إنها تكتب ٣٨٥ بإيدها مكان ٨ في التقرير وتبعته. بس الأسبوع الجاي الأداة هتطلّع نفس الغلطة تاني. فطلبت التصليح في الكود: SUMIF بدل COUNTIF، وMasters للقراءة بس، والسجل بالأرقام.",
          "The easiest thing would have been to type 385 by hand in place of 8 and send the report. But next week the tool would produce the same mistake again. So she asked for the fix in the code: SUMIF instead of COUNTIF, Masters read-only, and the log with figures."),
        u("مسحت Output، ودوست Run_All، وراجعت تاني: الكويت ٣٨٥، ومصر ٨٨٠، والتصدير ٥٠٪، ومجموع جدول البلاد ١٬٧٦٥ زي الإجمالي. وبعتت للمدير: «اتصلّح، والسبب كان في قاعدة الحساب، ودي الأرقام الصح».",
          "She deleted Output, double-clicked Run_All, and checked again: Kuwait 385, Egypt 880, export 50%, and the countries table's sum 1,765, the same as the total. She wrote to the manager: “Fixed; the cause was the calculation rule, and these are the right figures.”")],
        answer: u("صلّح الغلط في قاعدة الكود وشغّل من الأول، ما تصلّحش الناتج بإيدك. لأن التصليح بالإيد بيختفي مع أول تشغيل جاي، والغلطة بترجع.", "Fix the mistake in the code's rule and run from scratch; never patch the output by hand — a hand fix vanishes on the next run, and the mistake returns."),
        idea: u("التصليح بالإيد… بيرجع الأسبوع الجاي.", "A hand fix… comes back next week.")
      },
      {
        id: "cliff", art: "rv_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("أسئلة كتير", "Many questions"),
        title: u("المدير اطمّن… وبعت ٦ أسئلة جديدة", "The manager was reassured… and sent 6 new questions"),
        story: [u("المدير رد: «تمام. طب عايز أعرف: أنهي خط عمل أكتر M108؟ والكويت جالها منين؟ وأسبوع ١ ولا ٢ كان أحسن لكل بلد؟» وكمّل لحد ٦ أسئلة. كل سؤال معناه فلتر جديد، أو تعديل في الأداة.",
          "The manager replied: “Good. Now I want to know: which line made the most M108? Where did Kuwait's sets come from? Was week 1 or week 2 better for each country?” And on to 6 questions. Each question meant a new filter, or a change to the tool."),
        u("مهندسة التخطيط بصّت للجدول: ٣٦ صف بس، والأسئلة مش هتخلص. وكل تعديل في الأداة يعني مراجعة من الأول. والسؤال اللي الدرس الجاي بيبدأ بيه: طب لو الأسئلة على الجدول كترت؟",
          "The planning engineer looked at the table: just 36 rows, and the questions would never end. And every change to the tool means a review from scratch. And the question the next lesson opens with: what if the questions about the table multiply?")],
        answer: u("واجب الدرس: استخدم Prompt_4 في جلسة جديدة على سكريبتات الخطوات التلاتة، واعمل بإيدك رقم بالفلتر ونسخة فيها عمود اسمه اتغيّر، واكتب أخطر غلطة لقيتها. لأن القايمة دي هتتحفظ في طقم البداية في آخر الوحدة.", "This lesson's task: use Prompt_4 in a new session on the three steps' scripts, do one figure by hand with a filter and one copy with a renamed column, and write down the worst mistake you found — this checklist is saved in the starter kit at the end of the unit."),
        idea: u("الأداة المراجَعة… بتجيب أسئلة أكتر.", "A checked tool… brings more questions.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.reviewStory]);
})(window.ACADEMY = window.ACADEMY || {});
