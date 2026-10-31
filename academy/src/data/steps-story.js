/* Step by step — the story deck of lesson k4 (unit 4), on Unit4_Example_1_Two_Weeks.
   The planning engineer of unit 3 carries every slide with one question: «إزاي أبني الأداة خطوة خطوة،
   وتشتغل بضغطة؟». The deck rebuilds the 300-line tool as three small steps: why the example is small, splitting the
   work, step 1 and its log, checking before moving on, step 2 (VLOOKUP), step 3 (the report and the CSV), the %~dp0
   path, the error code, Run_All, and the same method at 13 weeks; it ends on a figure the manager doubts, which opens
   k5. Figures come from data/easy-projects.js. Drawings are the st_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.stepsStory = {
    id: "steps", lesson: "k4",
    kicker: u("خطوة خطوة · الحكاية في ٨ دقايق", "Step by step · the story in 8 minutes"),
    title: u("تلات خطوات صغيرة… وضغطة واحدة", "Three small steps… and one click"),
    lead: u("فاكر الـ ٣٠٠ سطر اللي وقفوا عند سطر ٢١٤ من غير ما نعرف الغلطة فين؟ في الحكاية دي مهندس التخطيط بيبني نفس الأداة تاني، لكن خطوة بخطوة، وعلى أبسط مثال ممكن.",
      "Remember the 300 lines that stopped at line 214 without telling us where the fault was? In this story the planning engineer builds the same tool again, but step by step, on the simplest possible example."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي أبني الأداة خطوة بخطوة، وتشتغل بضغطة واحدة؟", "How do I build the tool step by step, running in one click?"),
    finalQuestion: u("طب الكود اشتغل… أعرف منين إنه صح؟", "The code ran… but how do I know it's right?"),
    note: u("الأرقام من ملفات المثال الأول اللي بتنزل مع الدرس، وكلها توضيحية.", "The figures come from the first example's files, downloaded with the lesson; all are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("خطوة خطوة، في شرائح", "Step by step, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "monster", art: "st_monster", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("أداة واحدة كبيرة", "One big tool"),
        title: u("٣٠٠ سطر… ومحدش عارف الغلطة فين", "300 lines… and nobody knows where the mistake is"),
        story: [u("الأداة الكبيرة وقفت عند سطر ٢١٤. مهندس التخطيط طلب من الأداة تصلّحها، فغيّرت ٤٠ سطر واشتغلت، لكن طلّعت إجمالي غريب. طلب تصليح تاني، فاتغيّر ٣٠ سطر كمان. وبعد ساعة كان الكود اتغيّر تمامًا، وهو مش عارف أنهي جزء فيه صح.",
          "The big tool stopped at line 214. The planning engineer asked the tool to fix it; it changed 40 lines and ran, but produced an odd total. He asked for another fix, and 30 more lines changed. After an hour the code had changed completely, and he didn't know which part of it was right."),
        u("وفهم السبب: لما الطلب بيبقى كل حاجة مرة واحدة، الغلطة ممكن تبقى في أي مكان. فقرر يبنيها من الأول، جزء بجزء. والسؤال اللي معانا في الحكاية دي: إزاي أبني الأداة خطوة بخطوة، وتشتغل بضغطة واحدة؟",
          "And he understood why: when the request is everything at once, the fault can be anywhere. So he decided to build it again from the start, part by part. The question we carry in this story: how do I build the tool step by step, and have it run in one click?")],
        answer: u("ما تطلبش الأداة كلها في طلب واحد. لأن الأداة الكبيرة لما تغلط، الغلطة بتبقى في أي مكان، والتصليح بيغيّر حاجات كانت سليمة.", "Don't ask for the whole tool in one request — when a big tool goes wrong the mistake could be anywhere, and each fix changes things that were sound."),
        idea: u("الأداة الكبيرة… بتخبّي غلطتها.", "A big tool… hides its mistake.")
      },
      {
        id: "small", art: "st_small", year: u("المثال", "The example"), mark: u("٠٢", "02"), era: u("أصغر حاجة ممكنة", "As small as possible"),
        title: u("أسبوعين بدل ١٣، وعمود واحد بدل اتنين", "Two weeks instead of 13, one column instead of two"),
        story: [u("صغّر المثال بقصد: أسبوعين بس، Week_01 وWeek_02، كل واحد ١٨ صف (٦ أيام × ٣ خطوط) وخمس أعمدة. وملف Masters فيه شيت واحد للبلاد، وبحث واحد بس: اسم البلد. على ٣٦ صف يقدر يعدّ بإيده، ويعرف الأداة صح ولا لأ.",
          "He shrank the example on purpose: two weeks only, Week_01 and Week_02, each 18 rows (6 days × 3 lines) and five columns; a Masters file with one sheet of countries; and only one lookup: the country name. On 36 rows he can count by hand, and know whether the tool is right."),
        u("والمثال الصغير بيعلّم الطريقة نفسها: لو اشتغلت على أسبوعين بالخطوات دي، هتشتغل على ١٣ أسبوع من غير تغيير، لأن اللي بيتغيّر هو عدد الملفات بس.",
          "And the small example teaches the method itself: if it works on two weeks with these steps, it works on 13 weeks unchanged, because all that changes is the number of files.")],
        answer: u("ابدأ أي أداة على أصغر مثال تقدر تراجعه بإيدك. لأن النموذج بيحل المثال الصغير من أول مرة، وإنت تقدر تتأكد منه بنفسك.", "Start any tool on the smallest example you can check by hand — the model solves a small example first time, and you can verify it yourself."),
        idea: u("مثال صغير… وطريقة كاملة.", "A small example… a complete method.")
      },
      {
        id: "split", art: "st_split", year: u("التقسيم", "Splitting"), mark: u("٠٣", "03"), era: u("٣ خطوات", "3 steps"),
        title: u("كل خطوة: وظيفة واحدة، وPrompt واحد", "Each step: one job, one Prompt"),
        story: [u("قسّم الشغل على ورقة: الخطوة ١ الأسبوعين تحت بعض بس، والخطوة ٢ اسم البلد بس، والخطوة ٣ التقرير وملف CSV بس. كل خطوة ليها Prompt لوحدها، وسكريبت لوحده، وملف تشغيل لوحده، وسطور في السجل بتقول اشتغلت إزاي.",
          "He split the work on paper: step 1 stacks the two weeks only, step 2 adds the country name only, step 3 makes the report and a CSV file only. Each step has its own Prompt, its own script, its own launcher, and lines in the log saying how it ran."),
        u("ليه تلات خطوات مش اتنين؟ لأن كل خطوة لازم تكون صغيرة لدرجة إنه يراجعها في دقيقة. ولو خطوة غلطت، الغلطة بتبقى في السكريبت ده بس، والتصليح ما يقرّبش من الخطوات اللي اتراجعت.",
          "Why three steps and not two? Because each step must be small enough to review in a minute. And if a step goes wrong, the fault stays in that script only, and the fix doesn't touch the steps already checked.")],
        answer: u("قسّم الأداة لخطوات، كل واحدة ليها وظيفة واحدة وسكريبت واحد. لأن الغلطة بتفضل جوّه خطوتها، والتصليح ما يأثرش على اللي اتراجع.", "Split the tool into steps, each with one job and one script — a mistake stays locked in its own step, and the fix can't damage what was already checked."),
        idea: u("خطوة واحدة… يعني مكان واحد للغلطة.", "One step… means one place for the fault.")
      },
      {
        id: "step1", art: "st_step1", year: u("الخطوة ١", "Step 1"), mark: u("٠٤", "04"), era: u("تحت بعض", "Stacking"),
        title: u("الخطوة ١: الأسبوعين تحت بعض", "Step 1: the two weeks stacked"),
        story: [u("لصق Prompt_1 بس: «الخطوة ١ بس…». الأداة عرضت الخطة في ٤ سطور، فوافق، وكتبت step1_stack.ps1 وملف تشغيله. دبل كليك، والسجل قال: Week_01 فيه ١٨ صف و٨٤٥ جهاز، وWeek_02 فيه ١٨ صف و٩٢٠ جهاز، وشيت Data فيه ٣٦ صف و١٬٧٦٥ جهاز.",
          "He pasted Prompt_1 only: “Step 1 only…”. The tool showed the plan in 4 lines; he approved, and it wrote step1_stack.ps1 and its launcher. A double-click, and the log said: Week_01 holds 18 rows and 845 sets, Week_02 holds 18 rows and 920 sets, and the Data sheet holds 36 rows and 1,765 sets."),
        u("السكريبت ٦٠ سطر بس. قراه كله وفهم كل جزء: فتح للقراءة، وقراءة مرة واحدة، وعمود SourceFile، وكتابة مرة واحدة، وfinally في الآخر. ولأول مرة حس إنه فاهم الكود اللي هيشغّله.",
          "The script is only 60 lines. He read all of it and understood every part: open read-only, read once, the SourceFile column, write once, and finally at the end. For the first time he felt he understood the code he was about to run.")],
        answer: u("كل خطوة لازم تكتب في السجل العدد والإجمالي لكل ملف وللناتج. لأن الأرقام دي هي اللي بتقولك إن الخطوة اشتغلت صح، مش جملة «خلصت من غير أخطاء».", "Every step must log the count and total for each file and for the output — those figures tell you the step worked right, not “finished without errors”."),
        idea: u("٦٠ سطر مفهومين… أحسن من ٣٠٠ مش مفهومين.", "60 understood lines… beat 300 that aren't.")
      },
      {
        id: "gate", art: "st_gate", year: u("البوابة", "The gate"), mark: u("٠٥", "05"), era: u("قبل اللي بعده", "Before the next"),
        title: u("ما تفتحش Prompt_2… غير لما الأرقام تطلع صح", "Don't open Prompt_2… until the figures come out right"),
        story: [u("قبل ما يكمّل، قارن: ١٨ + ١٨ = ٣٦، و٨٤٥ + ٩٢٠ = ١٬٧٦٥. وفتح Week_01 في إكسل وجمع عمود Qty، فطلع ٨٤٥. يبقى الخطوة ١ صح، وساعتها بس فتح Prompt_2.",
          "Before going on, he compared: 18 + 18 = 36, and 845 + 920 = 1,765. He opened Week_01 in Excel and summed the Qty column: 845. So step 1 is right, and only then did he open Prompt_2."),
        u("وسمّى ده «البوابة»: كل خطوة ليها بوابة، والبوابة رقم بتتأكد منه بنفسك. ولو عدّيت البوابة من غير ما تبص، وغلطة الخطوة ١ وصلت للخطوة ٣، هترجع تدوّر في التلاتة.",
          "He called it “the gate”: every step has a gate, and the gate is a figure you check yourself. If you pass the gate without looking, and step 1's fault reaches step 3, you'll be searching all three.")],
        answer: u("ما تروحش للخطوة اللي بعدها غير لما رقم من الخطوة دي يطلع زي حسابك بإيدك. لأن الغلطة اللي بتعدّي البوابة بتستخبى جوّه الخطوات اللي بعدها.", "Don't move to the next step until a figure from this one matches your own count by hand — a mistake that passes the gate hides inside the steps after it."),
        idea: u("كل خطوة… ليها بوابة.", "Every step… has a gate.")
      },
      {
        id: "step2", art: "st_step2", year: u("الخطوة ٢", "Step 2"), mark: u("٠٦", "06"), era: u("اسم البلد", "The country name"),
        title: u("الخطوة ٢: VLOOKUP واحد بس", "Step 2: just one VLOOKUP"),
        story: [u("Prompt_2 طلب حاجة واحدة: انسخ شيت Countries جوّه Two_Weeks.xlsx، وضيف عمود CountryName بمعادلة ‎=VLOOKUP(كود البلد, Countries!A:B, 2, FALSE)، معادلة مش قيم. والسجل قال: ٣٦ معادلة، و#N/A صفر، والصفوف لسه ٣٦.",
          "Prompt_2 asked for one thing: copy the Countries sheet into Two_Weeks.xlsx and add a CountryName column as =VLOOKUP(country code, Countries!A:B, 2, FALSE), a formula, not values. The log said: 36 formulas, zero #N/A, and still 36 rows."),
        u("فتح الملف ودوس على خانة جنب KW، فلقى المعادلة ونتيجتها Kuwait. فاكر الوحدة التالتة؟ كان فيها عمودين VLOOKUP. هنا عمود واحد علشان نفهمه كويس، والتاني في شغلك هيبقى نفس السطر بالظبط.",
          "He opened the workbook and clicked a cell next to KW, and found the formula, with Kuwait as its result. Remember unit 3? It had two VLOOKUP columns. Here there is one, so we understand it well; the second in your own work will be exactly the same line.")],
        answer: u("ضيف الحاجة الجديدة لوحدها في خطوتها، وراجع إن الخطوة ما غيّرتش عدد الصفوف. لأن أي خطوة بتزوّد أو بتشيل صفوف من غير قصد بتغيّر كل الأرقام اللي بعدها.", "Add the new thing alone in its own step, and check the step didn't change the row count — any step that adds or drops rows by accident changes every figure after it."),
        idea: u("عمود جديد… والصفوف زي ما هي.", "A new column… the rows unchanged.")
      },
      {
        id: "step3", art: "st_step3", year: u("الخطوة ٣", "Step 3"), mark: u("٠٧", "07"), era: u("تقرير وCSV", "Report and CSV"),
        title: u("الخطوة ٣: التقرير… وملف للخطوة الجاية", "Step 3: the report… and a file for the next step"),
        story: [u("Prompt_3 طلب شيت Report فيه الإجمالي، وجدول لكل بلد، وجدول لكل خط، وكلهم معادلات. وطلب كمان يحفظ شيت Data كملف Two_Weeks.csv، علشان Python يقراه في الخطوة الجاية. والسجل قال: إجمالي Report ‏١٬٧٦٥، نفس Data، والـ CSV فيه ٣٦ صف.",
          "Prompt_3 asked for a Report sheet holding the total, a table per country and a table per line, all formulas. It also asked to save the Data sheet as Two_Weeks.csv, so Python can read it in the next step. The log said: the Report total is 1,765, the same as Data, and the CSV holds 36 rows."),
        u("والخطوة دي هي نقطة التقاء الأداتين: PowerShell خلّص شغل الإكسل وساب ملف CSV بسيط، ومن هنا Python النقي يكمّل من غير ما يفتح إكسل خالص. مهندس التخطيط بص على الإجمالي، ولقاه مظبوط.",
          "And this step is where the two tools meet: PowerShell finished the Excel work and left a simple CSV file, and from here pure Python carries on without opening Excel at all. The planning engineer looked at the total and found it right.")],
        answer: u("خلّي آخر خطوة PowerShell تسيب ملف CSV للخطوة اللي بعدها. لأن الـ CSV بيتقري بالمكتبة القياسية، فـ Python يكمّل من غير إكسل ومن غير باكدج.", "Have the last PowerShell step leave a CSV file for the next step — CSV reads with the standard library, so Python carries on with no Excel and no package."),
        idea: u("الـ CSV… هو الجسر بين الأداتين.", "The CSV… is the bridge between the two tools.")
      },
      {
        id: "dp0", art: "st_dp0", year: u("المسار", "The path"), mark: u("٠٨", "08"), era: u("على أي جهاز", "On any machine"),
        title: u("اشتغلت عنده… ووقفت عند مشرف الخط", "It worked on his machine… and stopped on the line supervisor's"),
        story: [u("نسخ الفولدر لجهاز مشرف الخط ودوس على ملف تشغيل الخطوة ١، فظهرت رسالة: «الملف مش موجود». فتح الملف ولقى المسار C:\\Users\\…\\Desktop\\tool، يعني مسار جهازه هو. الأداة كتبته كده لأنها كانت شغالة هناك.",
          "He copied the folder to the line supervisor's machine and clicked step 1's launcher, and a message appeared: “The file doesn't exist.” He opened the file and found the path C:\\Users\\…\\Desktop\\tool, his own machine's path. The tool wrote it that way because it was running there."),
        u("والتصليح: ‎%~dp0 في ملف التشغيل، ومعناها «الفولدر اللي ملف ‎.bat ده فيه»، وجوّه السكريبت المسارات بتبدأ من فولدر السكريبت نفسه. ومن ساعتها الفولدر بيتنقل لأي جهاز وأي مكان، ويشتغل.",
          "The fix: %~dp0 in the launcher, meaning “the folder this .bat file is in”, and inside the script every path starts from the script's own folder. Since then the folder moves to any machine and any place, and works.")],
        answer: u("خلّي كل المسارات تبدأ من فولدر الأداة نفسها، وعمرها ما تبقى مسار جهازك. لأن الأداة اللي هتتنقل لزميل لازم تلاقي ملفاتها في أي مكان تتحط فيه.", "Every path starts from the tool's own folder, never your machine's — a tool that moves to a colleague must find its files wherever it is placed."),
        idea: u("الفولدر يتنقل… والأداة تشتغل.", "The folder moves… the tool runs.")
      },
      {
        id: "exit", art: "st_exit", year: u("رقم الخطأ", "Exit code"), mark: u("٠٩", "09"), era: u("الوقفة اللي بتتسمع", "A stop that's heard"),
        title: u("لما خطوة توقف… اللي بعدها لازم تعرف", "When a step stops… the next one must know"),
        story: [u("جرّب حاجة: غيّر اسم Week_02 في نسخة، وشغّل الخطوات ورا بعض. الخطوة ١ وقفت برسالة واضحة: «Week_02.xlsx مش موجود». لكن الخطوة ٢ اشتغلت بعدها على ملف ناقص، وطلّعت تقرير بأسبوع واحد.",
          "He tried something: renamed Week_02 in a copy, and ran the steps one after another. Step 1 stopped with a clear message: “Week_02.xlsx doesn't exist.” But step 2 ran after it on an incomplete file, and produced a report with one week."),
        u("والحل إن كل سكريبت لما يوقف يرجّع رقم خطأ: exit 1. وملف التشغيل اللي بيجمعهم بيسأل بعد كل خطوة: «رجعت خطأ؟ يبقى أوقف». كده الوقفة بتوصل للخطوة اللي بعدها، مش بتتكتب في السجل وخلاص.",
          "The fix is for every script to return an error code when it stops: exit 1. And the launcher that chains them asks after each step: “Did it return an error? Then I stop.” That way the stop reaches the next step, instead of only being written in the log.")],
        answer: u("خلّي أي خطوة لما توقف ترجّع رقم خطأ، والخطوة اللي بعدها ما تشتغلش. لأن خطوة شغالة على ناتج ناقص بتطلّع رقم غلط، وشكله سليم.", "Have any step that stops return an error number, so the next step doesn't run — a step working on an incomplete output produces a wrong figure that looks sound."),
        idea: u("الوقفة لازم توصل… مش تتكتب بس.", "A stop must reach the next step… not only be written down.")
      },
      {
        id: "runall", art: "st_runall", year: u("ضغطة واحدة", "One click"), mark: u("١٠", "10"), era: u("Run_All", "Run_All"),
        title: u("التلات خطوات… في دبل كليك واحد", "All three steps… in one double-click"),
        story: [u("آخر حاجة: ملف Run_All.bat بيشغّل الخطوة ١ وبعدها ٢ وبعدها ٣، ويوقف لو أي واحدة رجّعت خطأ. مسح فولدر Output كله، ودوس على Run_All. وبعد ٢٠ ثانية ظهر Two_Weeks.xlsx بالتقرير، وTwo_Weeks.csv، وRun_Log.txt فيه سطور التلات خطوات.",
          "One last thing: a Run_All.bat file runs step 1, then 2, then 3, and stops if any of them returns an error. He deleted the whole Output folder and clicked Run_All. Twenty seconds later there was Two_Weeks.xlsx with the report, Two_Weeks.csv, and a Run_Log.txt holding the three steps' lines."),
        u("ومشرف الخط جرّبها بنفسه: دبل كليك، واستنى، وقرا آخر سطر في النافذة: «تم». ما فتحش إكسل، ولا كتب أمر، ولا عرف إن فيه تلات سكريبتات أصلًا.",
          "And the line supervisor tried it himself: a double-click, a short wait, and he read the window's last line: “Done.” He didn't open Excel, didn't type a command, and didn't even know there were three scripts.")],
        answer: u("بعد ما كل خطوة تتراجع لوحدها، اربطهم في ملف تشغيل واحد بيوقف عند أول خطأ. لأن اللي هيستخدم الأداة محتاج ضغطة واحدة، وإنت محتاج كل خطوة لوحدها وقت التصليح.", "Once each step is checked alone, chain them in one launcher that stops at the first error — the user needs one click, while you need each step alone when fixing."),
        idea: u("ليك تلات خطوات… وليه ضغطة واحدة.", "Three steps for you… one click for him.")
      },
      {
        id: "scale", art: "st_scale", year: u("١٣ أسبوع", "13 weeks"), mark: u("١١", "11"), era: u("نفس الطريقة", "Same method"),
        title: u("ولما الأسابيع تبقى ١٣؟", "And when the weeks become 13?"),
        story: [u("الشغل الحقيقي ١٣ أسبوع، فحط ١١ ملف زيادة بنفس الأعمدة في فولدر Data، ودوس Run_All. السجل طلع أطول: ١٣ سطر بدل ٢، وكل الأرقام اتحسبت، ولا سطر كود اتغيّر.",
          "The real work is 13 weeks, so he put 11 more files with the same columns in the Data folder and clicked Run_All. The log came out longer: 13 lines instead of 2, every figure calculated, and not one line of code changed."),
        u("لأن الخطوات ما بتتأثرش بعدد الملفات: الخطوة ١ بتقرا اللي موجود في الفولدر، مهما كان عدده. علشان كده بنبدأ صغير: مش لأن الشغل صغير، لكن علشان الطريقة تتراجع وهي صغيرة.",
          "Because the steps don't depend on the number of files: step 1 reads whatever is in the folder, however many there are. That's why we start small: not because the work is small, but so the method is checked while it is small.")],
        answer: u("ابني الطريقة على مثال صغير، وكبّر البيانات بعدين. لأن الطريقة اللي اتراجعت على ٣٦ صف بتشتغل على آلاف الصفوف، والعكس صعب جدًا.", "Build the method on a small example, and grow the data later — a method checked on 36 rows works on thousands; the reverse is very hard."),
        idea: u("صغير في التجربة… كبير في الاستخدام.", "Small to test… large to use.")
      },
      {
        id: "cliff", art: "st_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("رقم غريب", "An odd figure"),
        title: u("التقرير وصل… والمدير سأل عن رقم", "The report arrived… and the manager asked about a figure"),
        story: [u("بعت التقرير لمدير المصنع، والرد جه بعد دقيقتين: «الكويت ٨ أجهزة بس في أسبوعين؟ إحنا شاحنين لهم أكتر من كده بكتير». فتح شيت Report: الإجمالي ١٬٧٦٥ صح، لكن جدول البلاد فعلًا بيقول: الكويت ٨.",
          "He sent the report to the factory manager, and the reply came two minutes later: “Kuwait only 8 sets in two weeks? We ship them far more than that.” He opened the Report sheet: the total, 1,765, is right, but the country table does indeed say: Kuwait 8."),
        u("الأداة اشتغلت من غير ولا خطأ، والبوابة الوحيدة اللي راجعها كانت الإجمالي. ومن هنا بيبدأ الدرس الجاي: طب الكود اشتغل… أعرف منين إنه صح؟",
          "The tool ran without a single error, and the only gate he had checked was the total. And here the next lesson begins: the code ran… how do I know it is right?")],
        answer: u("واجب الدرس: نزّل المثال الأول، وابنيه بالتلات Prompts ورا بعض، ومع كل خطوة راجع رقم بإيدك قبل اللي بعدها، وفي الآخر شغّل Run_All بعد ما تمسح Output. ولو وقتك ضيق، الأداة الجاهزة في فولدر Ready_Tool بتعمل كل ده بضغطة.", "The lesson's homework: download the first example, build it with the three Prompts in order, check a figure by hand after each step before the next, and finally run Run_All after deleting Output. If time is short, the ready tool in the Ready_Tool folder does all of this in one click."),
        idea: u("الإجمالي صح… مش معناه إن كل رقم صح.", "A right total… doesn't mean every figure is right.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.stepsStory]);
})(window.ACADEMY = window.ACADEMY || {});
