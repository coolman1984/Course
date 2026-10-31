/* Step by step — the story deck of lesson k4 (unit 4), on Unit4_Example_1_Two_Weeks.
   The planning engineer at the second plant carries every slide with one question: «إزاي أبني الأداة خطوة خطوة،
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
    lead: u("فاكر الـ ٣٠٠ سطر اللي وقفوا عند سطر ٢١٤ من غير ما تعرف الغلطة فين؟ في الحكاية دي مهندسة التخطيط بتبني نفس الأداة تاني، بس خطوة خطوة، على أبسط مثال ممكن.",
      "Remember the 300 lines that stopped at line 214 with no clue where the mistake was? In this story the planning engineer builds the same tool again, but step by step, on the simplest possible example."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي أبني الأداة خطوة خطوة، وتشتغل بضغطة؟", "How do I build the tool step by step, running in one click?"),
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
        story: [u("الأداة الكبيرة وقفت عند سطر ٢١٤. مهندسة التخطيط طلبت من الأداة تصلّحها، فغيّرت ٤٠ سطر، واشتغلت، بس طلّعت إجمالي غريب. طلبت تصليح تاني، فاتغيّر ٣٠ سطر كمان. بعد ساعة، الكود بقى مختلف تمامًا، وهي مش عارفة أي جزء فيه صح.",
          "The big tool stopped at line 214. The planning engineer asked the tool to fix it; it changed 40 lines and ran, but gave an odd total. She asked for another fix, and 30 more lines changed. An hour later the code was completely different, and she couldn't tell which part of it was right."),
        u("الزميل قالها: «إنتي طلبتي كل حاجة مرة واحدة، فلما غلطت، الغلطة ممكن تبقى في أي حتة. تعالي نبنيها تاني، حتة حتة». والسؤال اللي ماشي معانا: إزاي أبني الأداة خطوة خطوة، وتشتغل بضغطة؟",
          "The colleague told her: “You asked for everything at once, so when it went wrong, the mistake could be anywhere. Let's build it again, piece by piece.” The question we carry: how do I build the tool step by step, running in one click?")],
        answer: u("ما تطلبش الأداة كلها في طلب واحد. لأن الأداة الكبيرة لما تغلط بتخلّي الغلطة في أي مكان، والتصليح بيغيّر حاجات كانت سليمة.", "Don't ask for the whole tool in one request — when a big tool goes wrong the mistake could be anywhere, and each fix changes things that were sound."),
        idea: u("الأداة الكبيرة… بتخبّي غلطتها.", "A big tool… hides its mistake.")
      },
      {
        id: "small", art: "st_small", year: u("المثال", "The example"), mark: u("٠٢", "02"), era: u("أصغر حاجة ممكنة", "As small as possible"),
        title: u("أسبوعين بدل ١٣، وعمود واحد بدل اتنين", "Two weeks instead of 13, one column instead of two"),
        story: [u("الزميل صغّر المثال بقصد: أسبوعين بس، Week_01 وWeek_02، كل واحد ١٨ صف (٦ أيام × ٣ خطوط)، بخمس أعمدة. وملف Masters فيه شيت واحد: البلاد. وبحث واحد بس: اسم البلد. «على ٣٦ صف تقدري تعدّي بإيدك، وتعرفي الأداة صح ولا لأ».",
          "The colleague shrank the example on purpose: two weeks only, Week_01 and Week_02, 18 rows each (6 days × 3 lines), with five columns. And a Masters file with one sheet: the countries. And only one lookup: the country name. “With 36 rows you can count by hand, and know whether the tool is right.”"),
        u("«والمثال الصغير ده هيعلّمني إيه في الشغل الحقيقي؟» «الطريقة نفسها. لو اشتغلت على أسبوعين بالخطوات دي، هتشتغل على ١٣ أسبوع من غير تغيير، لأن اللي بيتغيّر عدد الملفات بس».",
          "“And what will this small example teach me for real work?” “The method itself. If it works on two weeks with these steps, it works on 13 weeks unchanged, because only the number of files changes.”")],
        answer: u("ابدأ أي أداة على أصغر مثال تقدر تراجعه بإيدك. لأن النموذج بيحل المثال الصغير من أول مرة، وإنت تقدر تتأكد منه بنفسك.", "Start any tool on the smallest example you can check by hand — the model solves a small example first time, and you can verify it yourself."),
        idea: u("مثال صغير… طريقة كاملة.", "A small example… a complete method.")
      },
      {
        id: "split", art: "st_split", year: u("التقسيم", "Splitting"), mark: u("٠٣", "03"), era: u("٣ خطوات", "3 steps"),
        title: u("كل خطوة: وظيفة واحدة، وPrompt واحد", "Each step: one job, one Prompt"),
        story: [u("قسموا الشغل على ورقة: الخطوة ١ تحت بعض بس. الخطوة ٢ اسم البلد بس. الخطوة ٣ التقرير وملف CSV بس. كل خطوة ليها Prompt لوحدها، وسكريبت لوحده، وملف تشغيل لوحده، وسطور في السجل بتقول اشتغلت إزاي.",
          "They split the work on paper: step 1, stacking only. Step 2, the country name only. Step 3, the report and a CSV file only. Each step has its own Prompt, its own script, its own launcher, and lines in the log saying how it ran."),
        u("«ليه مش خطوتين؟» «لأن كل خطوة لازم تبقى صغيرة لدرجة إنك تراجعيها في دقيقة. ولو خطوة غلطت، الغلطة في السكريبت ده بس، والتصليح ما يلمسش الخطوات اللي اتراجعت».",
          "“Why not two steps?” “Because each step must be small enough to check in a minute. And if a step goes wrong, the mistake is in that script alone, and the fix doesn't touch the steps already checked.”")],
        answer: u("قسّم الأداة لخطوات كل واحدة ليها وظيفة واحدة وسكريبت واحد. لأن الغلطة بتفضل محبوسة في خطوتها، والتصليح ما يأثرش على اللي اتراجع.", "Split the tool into steps, each with one job and one script — a mistake stays locked in its own step, and the fix can't damage what was already checked."),
        idea: u("خطوة واحدة… مكان واحد للغلطة.", "One step… one place for the mistake.")
      },
      {
        id: "step1", art: "st_step1", year: u("الخطوة ١", "Step 1"), mark: u("٠٤", "04"), era: u("تحت بعض", "Stacking"),
        title: u("الخطوة ١: الأسبوعين تحت بعض", "Step 1: the two weeks stacked"),
        story: [u("لصقت Prompt_1 بس: «الخطوة ١ بس…». الأداة عرضت الخطة في ٤ سطور، وافقت، فكتبت step1_stack.ps1 وRun_Step1.bat. دبل كليك، والسجل قال: Week_01 ‏١٨ صف و٨٤٥ جهاز، Week_02 ‏١٨ صف و٩٢٠ جهاز، وشيت Data فيه ٣٦ صف و١٬٧٦٥ جهاز.",
          "She pasted Prompt_1 alone: “Step 1 only…”. The tool showed the plan in 4 lines; she approved, and it wrote step1_stack.ps1 and Run_Step1.bat. A double-click, and the log said: Week_01 18 rows and 845 sets, Week_02 18 rows and 920 sets, and the Data sheet holds 36 rows and 1,765 sets."),
        u("السكريبت ٦٠ سطر بس. قرته كله، وفهمت كل جزء: فتح للقراءة، وقراية مرة واحدة، وعمود SourceFile، وكتابة مرة واحدة، وfinally في الآخر. لأول مرة حسّت إنها فاهمة الكود اللي هتشغّله.",
          "The script is just 60 lines. She read all of it and understood every part: open read-only, read once, the SourceFile column, write once, and finally at the end. For the first time she felt she understood the code she would run.")],
        answer: u("كل خطوة لازم تكتب في السجل العدد والإجمالي لكل ملف وللناتج. لأن الأرقام دي هي اللي بتقولك الخطوة اشتغلت صح، مش «خلصت من غير أخطاء».", "Every step must log the count and total for each file and for the output — those figures tell you the step worked right, not “finished without errors”."),
        idea: u("٦٠ سطر مفهومين… أحسن من ٣٠٠ مش مفهومين.", "60 understood lines… beat 300 that aren't.")
      },
      {
        id: "gate", art: "st_gate", year: u("البوابة", "The gate"), mark: u("٠٥", "05"), era: u("قبل اللي بعده", "Before the next"),
        title: u("ما تفتحش Prompt_2… غير لما الأرقام تطلع", "Don't open Prompt_2… until the figures check out"),
        story: [u("قبل ما تكمّل، قارنت: ١٨ + ١٨ = ٣٦. و٨٤٥ + ٩٢٠ = ١٬٧٦٥. وفتحت Week_01 في إكسل وعملت جمع لعمود Qty: ٨٤٥. الخطوة ١ صح. ساعتها بس فتحت Prompt_2.",
          "Before going on, she compared: 18 + 18 = 36. And 845 + 920 = 1,765. She opened Week_01 in Excel and summed the Qty column: 845. Step 1 is right. Only then did she open Prompt_2."),
        u("الزميل سمّاها «البوابة»: كل خطوة ليها بوابة، والبوابة رقم بتتأكد منه بنفسك. «لو عدّيتي البوابة من غير ما تبصي، وغلطة الخطوة ١ وصلت للخطوة ٣، هترجعي تدوّري في التلاتة».",
          "The colleague called it “the gate”: every step has a gate, and the gate is a figure you confirm yourself. “If you pass the gate without looking, and step 1's mistake reaches step 3, you'll be back searching all three.”")],
        answer: u("ما تروحش للخطوة اللي بعدها غير لما رقم من الخطوة دي يطلع زي حسابك بإيدك. لأن الغلطة اللي بتعدّي البوابة بتتخبّى جوّه الخطوات اللي بعدها.", "Don't move to the next step until a figure from this one matches your own count by hand — a mistake that passes the gate hides inside the steps after it."),
        idea: u("كل خطوة… ليها بوابة.", "Every step… has a gate.")
      },
      {
        id: "step2", art: "st_step2", year: u("الخطوة ٢", "Step 2"), mark: u("٠٦", "06"), era: u("اسم البلد", "The country name"),
        title: u("الخطوة ٢: VLOOKUP واحد بس", "Step 2: just one VLOOKUP"),
        story: [u("Prompt_2 طلب حاجة واحدة: انسخ شيت Countries جوّه Two_Weeks.xlsx، وضيف عمود CountryName بمعادلة ‎=VLOOKUP(كود البلد, Countries!A:B, 2, FALSE)، معادلة مش قيم. السجل قال: ٣٦ معادلة، و#N/A صفر، والصفوف لسه ٣٦.",
          "Prompt_2 asked for one thing: copy the Countries sheet into Two_Weeks.xlsx and add a CountryName column as =VLOOKUP(country code, Countries!A:B, 2, FALSE), a formula, not values. The log said: 36 formulas, zero #N/A, and still 36 rows."),
        u("فتحت الملف ودوست على خانة جنب KW: لقت المعادلة، ونتيجتها Kuwait. «فاكرة الوحدة التالتة؟ كان فيها عمودين VLOOKUP. هنا واحد، علشان نفهمه كويس. والتاني في شغلك هيبقى نفس السطر بالظبط».",
          "She opened the workbook and clicked a cell beside KW: she found the formula, and its result, Kuwait. “Remember unit 3? It had two VLOOKUP columns. Here there's one, so we understand it well. The second, in your own work, will be exactly the same line.”")],
        answer: u("ضيف الحاجة الجديدة وحدها في خطوتها، وراجع إن الخطوة ما غيّرتش عدد الصفوف. لأن أي خطوة بتزوّد أو بتشيل صفوف من غير ما تقصد بتغيّر كل الأرقام اللي بعدها.", "Add the new thing alone in its own step, and check the step didn't change the row count — any step that adds or drops rows by accident changes every figure after it."),
        idea: u("عمود جديد… والصفوف زي ما هي.", "A new column… the rows unchanged.")
      },
      {
        id: "step3", art: "st_step3", year: u("الخطوة ٣", "Step 3"), mark: u("٠٧", "07"), era: u("تقرير وCSV", "Report and CSV"),
        title: u("الخطوة ٣: التقرير… وملف للخطوة الجاية", "Step 3: the report… and a file for the next step"),
        story: [u("Prompt_3 طلب شيت Report: الإجمالي، وجدول لكل بلد، وجدول لكل خط، كلهم معادلات. وطلب كمان يحفظ شيت Data كملف Two_Weeks.csv، علشان Python يقراه في الخطوة الجاية. السجل قال: إجمالي Report ‏١٬٧٦٥، نفس Data، والـ CSV فيه ٣٦ صف.",
          "Prompt_3 asked for a Report sheet: the total, a table per country and a table per line, all formulas. It also asked to save the Data sheet as Two_Weeks.csv, so Python can read it in the next step. The log said: the Report total is 1,765, the same as Data, and the CSV holds 36 rows."),
        u("الخطوة دي فيها نقطة التقاء الأداتين: PowerShell خلّص شغل الإكسل، وساب ملف CSV بسيط. «من هنا Python النقي يكمّل، من غير ما يفتح إكسل خالص». مهندسة التخطيط بصّت على الإجمالي، وقالت: تمام.",
          "This step is where the two tools meet: PowerShell finished the Excel work and left a simple CSV file. “From here pure Python carries on, without ever opening Excel.” The planning engineer looked at the total and said: fine.")],
        answer: u("خلّي آخر خطوة PowerShell تسيب ملف CSV للخطوة اللي بعدها. لأن الـ CSV بيتقري بالمكتبة القياسية، فـ Python يكمّل من غير إكسل ومن غير باكدج.", "Have the last PowerShell step leave a CSV file for the next step — CSV reads with the standard library, so Python carries on with no Excel and no package."),
        idea: u("الـ CSV… الجسر بين الأداتين.", "The CSV… the bridge between the tools.")
      },
      {
        id: "dp0", art: "st_dp0", year: u("المسار", "The path"), mark: u("٠٨", "08"), era: u("على أي جهاز", "On any machine"),
        title: u("اشتغلت عندها… ووقفت عند مشرف الخط", "It ran for her… and stopped for the line supervisor"),
        story: [u("نسخت الفولدر لجهاز مشرف الخط ودوست Run_Step1.bat: «الملف مش موجود». فتحت الملف لقت المسار C:\\Users\\…\\Desktop\\tool، مسار جهازها هي. الأداة كتبته كده علشان كانت شغالة هناك.",
          "She copied the folder to the line supervisor's PC and double-clicked Run_Step1.bat: “file not found”. She opened the file and found the path C:\\Users\\…\\Desktop\\tool, her own machine's path. The tool wrote it that way because that's where it had been running."),
        u("التصليح: ‎%~dp0 في ملف التشغيل، يعني «الفولدر اللي ملف ‎.bat ده فيه»، وجوّه السكريبت المسارات بتبدأ من فولدر السكريبت نفسه. ومن ساعتها الفولدر بيتنقل لأي جهاز وأي مكان ويشتغل.",
          "The fix: %~dp0 in the launcher, meaning “the folder this .bat file is in”, and inside the script every path starts from the script's own folder. Since then the folder moves to any machine and any place, and runs.")],
        answer: u("المسارات كلها تبدأ من فولدر الأداة نفسها، عمرها ما تبقى مسار جهازك. لأن الأداة اللي هتتنقل لزميل لازم تلاقي ملفاتها في أي مكان اتحطت فيه.", "Every path starts from the tool's own folder, never your machine's — a tool that moves to a colleague must find its files wherever it is placed."),
        idea: u("الفولدر يتنقل… والأداة تشتغل.", "The folder moves… the tool runs.")
      },
      {
        id: "exit", art: "st_exit", year: u("رقم الخطأ", "Exit code"), mark: u("٠٩", "09"), era: u("الوقفة اللي بتتسمع", "A stop that's heard"),
        title: u("لما خطوة تقف… اللي بعدها لازم تعرف", "When a step stops… the next must know"),
        story: [u("جرّبت حاجة: غيّرت اسم Week_02 في نسخة، ودوست الخطوات ورا بعض. الخطوة ١ وقفت برسالة واضحة: «Week_02.xlsx مش موجود». بس الخطوة ٢ اشتغلت بعدها على ملف ناقص، وطلّعت تقرير بأسبوع واحد.",
          "She tried something: renamed Week_02 in a copy, and ran the steps one after another. Step 1 stopped with a clear message: “Week_02.xlsx not found”. But step 2 then ran on an incomplete file and produced a report with one week."),
        u("الحل: كل سكريبت لما يقف بيرجّع رقم خطأ: exit 1. وملف التشغيل اللي بيجمعهم بيسأل بعد كل خطوة: «رجعت خطأ؟ يبقى أقف». كده الوقفة بتتسمع، مش بتتكتب في السجل وخلاص.",
          "The fix: every script returns an error number when it stops: exit 1. And the launcher that chains them asks after each step: “did it return an error? Then I stop.” That way the stop is heard, not just written in the log.")],
        answer: u("خلّي أي خطوة لما تقف ترجّع رقم خطأ، والخطوة اللي بعدها ما تشتغلش. لأن خطوة شغالة على ناتج ناقص بتطلّع رقم غلط شكله سليم.", "Have any step that stops return an error number, so the next step doesn't run — a step working on an incomplete output produces a wrong figure that looks sound."),
        idea: u("الوقفة لازم تتسمع… مش تتكتب بس.", "A stop must be heard… not just written.")
      },
      {
        id: "runall", art: "st_runall", year: u("ضغطة واحدة", "One click"), mark: u("١٠", "10"), era: u("Run_All", "Run_All"),
        title: u("التلات خطوات… في دبل كليك واحد", "All three steps… in one double-click"),
        story: [u("آخر حاجة: ملف Run_All.bat بيشغّل الخطوة ١ وبعدها ٢ وبعدها ٣، ويقف لو أي واحدة رجّعت خطأ. مسحت فولدر Output كله، ودوست Run_All. بعد ٢٠ ثانية: Two_Weeks.xlsx بالتقرير، وTwo_Weeks.csv، وRun_Log.txt فيه سطور التلات خطوات.",
          "One last thing: a Run_All.bat file runs step 1, then 2, then 3, and stops if any returns an error. She deleted the whole Output folder and double-clicked Run_All. Twenty seconds later: Two_Weeks.xlsx with its report, Two_Weeks.csv, and Run_Log.txt holding the lines of all three steps."),
        u("مشرف الخط جرّبها بنفسه: دبل كليك، واستنى، وقرا آخر سطر في النافذة: «تم». ما فتحش إكسل، ولا كتب أمر، ولا عرف إن فيه تلات سكريبتات أصلًا.",
          "The line supervisor tried it himself: a double-click, a wait, and he read the last line in the window: “Done”. He never opened Excel, never typed a command, and didn't even know there were three scripts.")],
        answer: u("بعد ما كل خطوة تتراجع لوحدها، اربطهم في ملف تشغيل واحد بيقف عند أول خطأ. لأن اللي هيستخدم الأداة محتاج ضغطة واحدة، وإنت محتاج كل خطوة لوحدها وقت التصليح.", "Once each step is checked alone, chain them in one launcher that stops at the first error — the user needs one click, while you need each step alone when fixing."),
        idea: u("ليك: تلات خطوات… ليه: ضغطة واحدة.", "For you: three steps… for them: one click.")
      },
      {
        id: "scale", art: "st_scale", year: u("١٣ أسبوع", "13 weeks"), mark: u("١١", "11"), era: u("نفس الطريقة", "Same method"),
        title: u("ولما الأسابيع تبقى ١٣؟", "And when the weeks become 13?"),
        story: [u("سألت: «طب الشغل الحقيقي ١٣ أسبوع». الزميل حط ١١ ملف زيادة في فولدر Data بنفس الأعمدة، ودوس Run_All. السجل طلع أطول: ١٣ سطر بدل ٢، وكل الأرقام اتحسبت. ولا سطر كود اتغيّر.",
          "She asked: “But real work is 13 weeks.” The colleague put 11 more files with the same columns into the Data folder and double-clicked Run_All. The log came out longer: 13 lines instead of 2, and every figure was computed. Not a single line of code changed."),
        u("«الخطوات ما بتتأثرش بعدد الملفات: الخطوة ١ بتقرا اللي في الفولدر، أيًا كان عدده. علشان كده بنبدأ صغير: مش علشان الشغل صغير، علشان الطريقة تتراجع وهي صغيرة».",
          "“The steps don't care how many files there are: step 1 reads whatever is in the folder. That's why we start small: not because the work is small, but so the method is checked while it's small.”")],
        answer: u("ابني الطريقة على مثال صغير، وكبّر البيانات بعدين. لأن الطريقة اللي اتراجعت على ٣٦ صف بتشتغل على آلاف، والعكس صعب جدًا.", "Build the method on a small example, and grow the data later — a method checked on 36 rows works on thousands; the reverse is very hard."),
        idea: u("صغير في التجربة… كبير في الاستخدام.", "Small to test… large to use.")
      },
      {
        id: "cliff", art: "st_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("رقم غريب", "An odd figure"),
        title: u("التقرير طلع… والمدير سأل عن رقم", "The report came out… and the manager asked about a figure"),
        story: [u("بعتت التقرير لمدير المصنع. رد بعد دقيقتين: «الكويت ٨ أجهزة بس في أسبوعين؟ إحنا شاحنين لهم أكتر من كده بكتير». فتحت شيت Report: الإجمالي ١٬٧٦٥ صح، بس جدول البلاد قال فعلًا: الكويت ٨.",
          "She sent the report to the plant manager. He replied two minutes later: “Kuwait only 8 sets in two weeks? We've shipped them far more than that.” She opened the Report sheet: the total, 1,765, is right, but the countries table did say: Kuwait 8."),
        u("الأداة اشتغلت من غير ولا خطأ، والبوابة الوحيدة اللي راجعتها كانت الإجمالي. والسؤال اللي الدرس الجاي بيبدأ بيه: طب الكود اشتغل… أعرف منين إنه صح؟",
          "The tool ran without a single error, and the only gate she checked was the total. And the question the next lesson opens with: the code ran… but how do I know it's right?")],
        answer: u("واجب الدرس: نزّل المثال الأول، وابنيه بالتلات Prompts ورا بعض، ومع كل خطوة راجع رقم بإيدك قبل اللي بعدها، وفي الآخر شغّل Run_All بعد ما تمسح Output. لأن الخطوات الصغيرة هي اللي هنراجعها بالتفصيل في الدرس الجاي.", "This lesson's task: download the first example, build it with the three Prompts in order, check one figure by hand at each step before the next, and finally run Run_All after deleting Output — these small steps are what we review in detail next lesson."),
        idea: u("الإجمالي صح… مش معناه إن كل رقم صح.", "A right total… doesn't mean every figure is right.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.stepsStory]);
})(window.ACADEMY = window.ACADEMY || {});
