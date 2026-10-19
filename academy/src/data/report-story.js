/* Tool three on the kit — the story deck of lesson x5 (unit 2).
   The planning engineer of the TV factory carries every slide with one question:
   «إزاي التقرير يطلع مظبوط ومراجَع من غير ما ألمسه؟». The deck runs the third tool of lesson f8 on the kit: the shared
   key, summing, fetching the plan, a line with no plan, corrections from quality, rate and rank, the self-check, a gap
   that exposed an earlier mistake, formatting last, the first report compared with a known one — and ends on the
   question of what to do when a tool stops. Each slide gives one rule with its reason. Figures are the kit's own.
   Drawings are the xr_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.reportStory = {
    id: "report", lesson: "x5",
    kicker: u("الأداة التالتة · الحكاية كاملة في ٨ دقايق", "Tool three · the whole story in 8 minutes"),
    title: u("تقرير الإنتاج قصاد الخطة… بيراجع نفسه", "The output-against-plan report… that checks itself"),
    lead: u("الجدول فيه كل الدفعات وكل الأسماء. فاضل التقرير اللي مدير المصنع بيستناه كل شهر: كل خط حقق كام من خطته، ومين الأول ومين الأخير. في الحكاية دي مهندس التخطيط بيبني الأداة التالتة، وبيخلّيها تثبت إن أرقامها صح قبل ما تقول «خلصت».",
      "The table holds every batch and every name. What remains is the report the factory manager awaits every month: what share of its plan each line reached, who's first and who's last. In this story the planning engineer builds tool three, and makes it prove its figures right before it says “done”."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي التقرير يطلع مظبوط ومراجَع من غير ما ألمسه؟", "How does the report come out right and checked without my touching it?"),
    finalQuestion: u("التقرير طالع كل شهر… طب لو الأداة وقفت بكرة، هتعرف تصلّحها؟", "The report comes out every month… so if the tool stops tomorrow, will you know how to fix it?"),
    note: u("الأرقام والنسب هي أرقام الحقيبة نفسها. التقرير الرسمي ما يتبعتش من غير مراجعة إنسان.", "The figures and rates are the kit's own. An official report is never sent without a person's review."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("الأداة التالتة، في شرائح", "Tool three, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "scene", art: "xr_scene", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("ساعة ونص كل شهر", "Ninety minutes a month"),
        title: u("التقرير الشهري: ملفين، وآلة حاسبة، وقلق", "The monthly report: two files, a calculator, and worry"),
        story: [u("فاكر المهمة التالتة في درس أول أتمتة؟ تقرير من ملفين. كل أول شهر مهندس التخطيط بيفتح الإنتاج في شاشة والخطة في شاشة، ويجمع إنتاج كل خط، ويقسم على الخطة، ويرتّب، ويلوّن. ساعة ونص، وفي الآخر بيراجع الإجمالي بالآلة الحاسبة مرتين.",
          "Remember the third job in the first-automation lesson? A report from two files. At the start of each month the planning engineer opens output on one screen and the plan on another, sums each line, divides by the plan, ranks, colours. Ninety minutes, and at the end he checks the total twice on a calculator."),
        u("والمرة اللي فاتت، خطة خط اتكتبت غلط، والتقرير راح لمدير المصنع كده، واتاخد عليه قرار نقل عمالة. ومن ساعتها الثقة في التقرير قلّت. والسؤال اللي ماشي معانا: إزاي التقرير يطلع مظبوط ومراجَع، من غير ما مهندس التخطيط يلمسه بإيده؟",
          "Last time one line's plan was entered wrong, the report reached the factory manager that way, and a decision to move staff was taken on it. Since then, trust in the report has dropped. And the question we carry: how does the report come out right and checked, without the planning engineer's hand touching it?")],
        answer: u("حدد أول التقرير بيتبني من أنهي ملفات، وبيطلّع إيه بالظبط. لأن التقرير اللي شكله مش محدد بيتغيّر كل شهر، والأداة ما تقدرش تبنيه.", "Fix first which files the report is built from and exactly what it shows — a report with no fixed shape changes every month, and no tool can build it."),
        idea: u("التقرير اللي بيتراجع بالإيد… بيتغلط بالإيد.", "A report checked by hand… goes wrong by hand.")
      },
      {
        id: "key", art: "xr_key", year: u("المفتاح", "The key"), mark: u("٠٢", "02"), era: u("الخط + الشهر", "Line + month"),
        title: u("المفتاح المشترك: كود الخط + الشهر", "The shared key: line code + month"),
        story: [u("علشان الأداة تقابل الإنتاج بالخطة، لازم تعرف إيه اللي بيربطهم. في Plan_2026_Q1.xlsx كل سطر فيه كود الخط، والشهر مكتوب كنص زي «2026-01»، والخطة بعدد الأجهزة. وفي جدول الإنتاج فيه كود الخط والتاريخ.",
          "For the tool to set output against the plan, it must know what links them. In Plan_2026_Q1.xlsx each line holds the line code, the month written as text like “2026-01”, and the plan in units. In the output table there's the line code and the date."),
        u("فالمفتاح هو الاتنين مع بعض: كود الخط والشهر. التاريخ في الإنتاج بيتحوّل لنفس شكل الشهر في الخطة، وبعدين الربط. ومهندس التخطيط كتب ده في الـ Prompt صراحة، لأن «اربط على الخط» لوحدها كانت هتجمع الربع كله قصاد خطة شهر واحد.",
          "So the key is both together: line code and month. The date in the output is turned into the same month shape used in the plan, then they're joined. The planning engineer wrote this into the Prompt explicitly, because “join on line” alone would have summed the whole quarter against one month's plan.")],
        answer: u("قول للنموذج المفتاح كامل، بكل أجزاؤه وشكل كل جزء. لأن المفتاح الناقص بيربط حاجات مش المفروض تتربط.", "Tell the model the full key, every part and each part's shape — an incomplete key links things that shouldn't be linked."),
        idea: u("المفتاح الكامل… ربط صح.", "A full key… a right join.")
      },
      {
        id: "sum", art: "xr_sum", year: u("الجمع", "Summing"), mark: u("٠٣", "03"), era: u("١٨ خانة", "18 cells"),
        title: u("١٬٢٨٨ دفعة بيبقوا ١٨ رقم", "1,288 batches become 18 figures"),
        story: [u("ستة خطوط في تلات شهور يعني ١٨ خانة. الأداة بتمشي على الـ ١٬٢٨٨ دفعة، وكل دفعة بتضيف كميتها لخانة خطها في شهرها. خط ١ في يناير: ٢٬٠١٨ جهاز. خط ٦ في فبراير: ١٬٠٥٠. وهكذا لحد ما الـ ١٨ يتملوا.",
          "Six lines over three months make 18 cells. The tool goes through the 1,288 batches, each adding its quantity to its line's cell for its month. Line 1 in January: 2,018 units. Line 6 in February: 1,050. And so on until all 18 are filled."),
        u("والجميل إن الحسبة دي بتتعمل في الذاكرة، مش في الشيت، فبتخلص في أقل من ثانية. ومجموع الـ ١٨ خانة لازم يساوي مجموع الجدول كله. دي أول مراجعة، وهترجعلها في الآخر.",
          "The nice part is that this happens in memory, not on the sheet, so it finishes in under a second. And the sum of the 18 cells must equal the whole table's sum. That's the first check, and we'll come back to it at the end.")],
        answer: u("اطلب الحساب جوّه الأداة والنتيجة بس تتكتب في الشيت. لأن الحساب في الذاكرة أسرع، وأسهل يتراجع من معادلات متفرقة.", "Ask for the calculation inside the tool, with only the result written to the sheet — in-memory sums are faster and easier to check than scattered formulas."),
        idea: u("آلاف الأجهزة… وكام رقم بيحكوا الحكاية.", "Thousands of units… a few figures tell the story.")
      },
      {
        id: "target", art: "xr_target", year: u("الخطة", "The plan"), mark: u("٠٤", "04"), era: u("١٧ من ١٨", "17 of 18"),
        title: u("كل خانة بتدوّر على خطتها… و١٧ بس لقوا", "Each cell looks for its plan… and only 17 found one"),
        story: [u("بعد الجمع، الأداة بتدوّر لكل خانة من الـ ١٨ على خطتها في ملف الخطة. ١٧ خانة لقت خطتها. وخانة واحدة رجعت فاضية: خط ٦، مارس. السجل كتب: «اتستخدم ١٧ خطة من ١٨ خانة؛ L06 في 2026-03 من غير خطة».",
          "After summing, the tool looks up each of the 18 cells' plans in the plan file. 17 found theirs. One came back empty: line 6, March. The log wrote: “17 plans used for 18 cells; L06 in 2026-03 has no plan.”"),
        u("السطر ده في السجل مش تفصيلة. لو الشهر الجاي بقى «١٢ من ١٨»، يبقى ملف الخطة وصل ناقص، والتقرير مش هيتبعت قبل ما حد يسأل. العدد ده بيحوّل غياب الخطة من مفاجأة في الاجتماع لملاحظة قبله.",
          "That log line isn't a detail. If next month it reads “12 of 18”, the plan file arrived incomplete, and the report won't go out before someone asks. This count turns a missing plan from a surprise in the meeting into a note before it.")],
        answer: u("الأداة تكتب كام خطة لقت من كام. لأن الخطة الناقصة اللي ما اتعدّتش بتتحوّل في التقرير لرقم مضلّل.", "The tool writes how many plans it found out of how many — an uncounted missing plan becomes a misleading figure in the report."),
        idea: u("اعدّ اللي لقيته… واللي ما لقيتوش.", "Count what you found… and what you didn't.")
      },
      {
        id: "none", art: "xr_none", year: u("الفخ ٩", "Trap 9"), mark: u("٠٥", "05"), era: u("مفيش خطة", "No plan"),
        title: u("خط ٦ في مارس: «مفيش خطة»، مش ٠٪", "Line 6 in March: “no plan”, not 0%"),
        story: [u("أول نسخة من الأداة كتبت لخط ٦ في مارس «٠٪» وحطته آخر الترتيب. والحقيقة إن خط ٦ أنتج في مارس ١٬٤٠٧ جهاز. الصفر ده كان هيخلّي مدير المصنع يتصل بمشرف الخط يسأله «إيه اللي حصل؟»، والإجابة: ولا حاجة، الخطة بس ما اتكتبتش.",
          "The first version of the tool wrote “0%” for line 6 in March and ranked it last. In truth, line 6 produced 1,407 units in March. That zero would have had the factory manager calling the line supervisor to ask “what happened?” — and the answer: nothing; the plan simply wasn't entered."),
        u("فمهندس التخطيط زوّد قاعدة: «الخط اللي مالوش خطة يتكتب مفيش خطة، والنسبة فاضية، ويطلع برّه ترتيب الشهر ده». ونسخة تانية كانت هتعمل أسوأ: رسالة خطأ «قسمة على صفر» في نص التقرير. الحالة الاستثنائية دي محتاجة قاعدة مكتوبة.",
          "So the planning engineer added a rule: “a line with no plan reads no plan, the rate stays blank, and it's left out of that month's ranking.” Another version would have done worse: a “division by zero” error in the middle of the report. This edge case needs a written rule.")],
        answer: u("كل حالة ممكن تقسم على صفر أو تطلع رقم مضلّل، ليها قاعدة مكتوبة في الـ Prompt. لأن الصفر الغلط بيتقري حكم على ناس.", "Every case that could divide by zero or yield a misleading figure gets a written rule in the Prompt — a wrong zero is read as a verdict on people."),
        idea: u("«مفيش خطة» حقيقة… و«٠٪» اتهام.", "“No plan” is a fact… “0%” is an accusation.")
      },
      {
        id: "returns", art: "xr_returns", year: u("الفخ ١٠", "Trap 10"), mark: u("٠٦", "06"), era: u("تصحيحات الجودة", "Quality corrections"),
        title: u("١٤ تصحيح بكمية سالبة: يفضلوا", "14 corrections with a negative quantity: they stay"),
        story: [u("زميل اقترح: «الصفوف اللي فيها كمية سالبة شكلها غلط، امسحها». مهندس التخطيط بص: ١٤ صف، كلهم تصحيحات حقيقية. وحدات اتسجّلت سليمة، وبعدين قسم الجودة رجّعها لعيب في الشاشة أو في اللوحة.",
          "A colleague suggested: “rows with a negative quantity look wrong; delete them.” The planning engineer looked: 14 rows, all real corrections. Units first recorded as good, then sent back by quality for a defect in the panel or the board."),
        u("لو اتمسحوا، كل خط هيظهر إنه أنتج أكتر من الحقيقة، ونسبة التحقيق هتعلى من غير سبب. فالقاعدة في الـ Prompt: «الكمية السالبة وحدات رجعت من الجودة، بتتخصم من الصافي، وما تتحذفش». والسجل بيكتب عددهم، علشان لو زادوا فجأة، الجودة تسأل.",
          "Delete them and every line would appear to have produced more than it did, with achievement rising for no reason. So the rule in the Prompt: “a negative quantity is units sent back by quality; it's deducted from the net and never deleted.” And the log counts them, so if they suddenly rise, quality asks why.")],
        answer: u("قبل ما تمسح أي صف «شكله غلط»، اعرف معناه في الشغل. لأن اللي شكله غلط ممكن يكون أهم حقيقة في الجدول.", "Before deleting any row that “looks wrong”, learn what it means at work — what looks wrong may be the table's most important fact."),
        idea: u("السالب مش غلط… السالب تصحيح من الجودة.", "A negative isn't an error… it's a correction from quality.")
      },
      {
        id: "rank", art: "xr_rank", year: u("النتيجة", "The result"), mark: u("٠٧", "07"), era: u("النسبة والترتيب", "Rate and rank"),
        title: u("خط ٢ الأول في يناير، وخط ٤ الأخير في مارس", "Line 2 first in January, line 4 last in March"),
        story: [u("الأداة قسمت كل خانة على خطتها، وكتبت النسبة بخانة عشرية واحدة، ورتّبت الخطوط جوّه كل شهر. أعلى نسبة في الربع: خط ٢ في يناير، ١١١٫١٪. وأقل نسبة: خط ٤ في مارس، ٨٥٫١٪. وخط ٤ تحت ٩٠٪ في يناير ومارس.",
          "The tool divided each cell by its plan, wrote the rate to one decimal place, and ranked the lines within each month. The quarter's highest rate: line 2 in January, 111.1%. The lowest: line 4 in March, 85.1%. And line 4 is under 90% in both January and March."),
        u("مهندس التخطيط لاحظ حاجة كمان: خط ٢ وخط ٥ فوق ١٠٠٪ في التلات شهور. دي معلومة ما كانتش هتبان بسرعة في التقرير القديم. بس قبل ما يكتب أي استنتاج عن خط ٤، فاضل خطوة: يتأكد إن الأرقام نفسها صح.",
          "The planning engineer noticed something more: lines 2 and 5 are above 100% in all three months. That wouldn't have shown quickly in the old report. But before writing any conclusion about line 4, one step remains: make sure the figures themselves are right.")],
        answer: u("حدد للنموذج الترتيب على أساس إيه، وإيه اللي يحصل في التعادل. لأن «رتّب الخطوط» لوحدها ليها أكتر من معنى.", "Tell the model what the ranking is based on and what happens in a tie — “rank the lines” alone has more than one meaning."),
        idea: u("الترتيب بيلفت النظر… بس الرقم لازم يتراجع الأول.", "A ranking catches the eye… but the figure must be checked first.")
      },
      {
        id: "check", art: "xr_check", year: u("المراجعة", "The check"), mark: u("٠٨", "08"), era: u("الأداة بتراجع نفسها", "The tool checks itself"),
        title: u("قبل «خلصت»: إجمالي التقرير = إجمالي المصدر", "Before “done”: the report's total = the source total"),
        story: [u("آخر خطوة قبل ما الأداة تحفظ: تجمع عمود الإنتاج في التقرير كله، وتقارنه بإجمالي الجدول المربوط. لو متساويين، تكتب في السجل «إجمالي التقرير 29,304 = إجمالي المصدر» وتحفظ. لو مش متساويين، توقف.",
          "The last step before the tool saves: sum the output column of the whole report and compare it with the joined table's total. If equal, it writes “Report total 29,304 = source total” to the log and saves. If not, it stops."),
        u("ده نفس اللي مهندس التخطيط كان بيعمله بالآلة الحاسبة مرتين، بس الأداة بتعمله كل مرة، من غير ما تزهق، وقبل ما التقرير يطلع من الجهاز. والفرق إن الآلة الحاسبة كانت بتلاقي الغلط بعد ما يحصل؛ الأداة بتمنعه يطلع.",
          "It's what the planning engineer used to do twice on a calculator, but the tool does it every time, without tiring, and before the report leaves the laptop. The difference: the calculator found mistakes after the fact; the tool keeps them from going out.")],
        answer: u("اطلب من أي أداة تقارير تراجع إجماليها قبل الحفظ، وتوقف لو فيه فرق. لأن المراجعة اللي بتحصل قبل الإرسال بتمنع الغلط، مش بتكتشفه.", "Have any reporting tool check its totals before saving and stop on any gap — a check before sending prevents the mistake rather than discovering it."),
        idea: u("الأداة ما تقولش «خلصت» قبل ما تثبت.", "The tool doesn't say “done” before it proves it.")
      },
      {
        id: "gap", art: "xr_gap", year: u("الفرق", "The gap"), mark: u("٠٩", "09"), era: u("فرق كشف غلطة قديمة", "A gap that exposed an old mistake"),
        title: u("فرق ٤٠٧ جهاز… كشف غلطة في أداة تانية", "A gap of 407 units… exposed a mistake in another tool"),
        story: [u("في تجربة على نسخة قديمة من الأداة التانية، الأداة التالتة وقفت: «إجمالي التقرير 28,897 ≠ إجمالي المصدر 29,304؛ الفرق 407». مهندس التخطيط عرف الرقم ده على طول: إنتاج الموديل الجديد M113.",
          "In a trial with an old version of tool two, tool three stopped: “Report total 28,897 ≠ source total 29,304; gap 407.” The planning engineer recognised the figure at once: the output of the new model, M113."),
        u("النسخة القديمة من الأداة التانية كانت بتمسح الصفوف اللي ما اتربطتش. فالتصليح مكانه هناك، في الربط، مش في التقرير. لو الأداة التالتة ما كانتش بتراجع نفسها، التقرير كان هيطلع ناقص ٤٠٧ جهاز، والغلطة اللي في الأداة التانية كانت هتفضل مستخبية.",
          "The old version of tool two dropped unmatched rows. So the fix belongs there, in the join, not in the report. Had tool three not checked itself, the report would have gone out short by 407 units, and the mistake in tool two would have stayed hidden.")],
        answer: u("لما المراجعة تكشف فرق، دوّر على أصله في الخطوات اللي قبل. لأن الأداة الأخيرة في السلسلة هي أول واحدة بتشوف غلطات اللي قبلها.", "When a check reveals a gap, trace its origin in the earlier steps — the last tool in a chain is the first to see the mistakes before it."),
        idea: u("الفرق مش مشكلة التقرير… الفرق دليل.", "The gap isn't the report's problem… it's evidence.")
      },
      {
        id: "format", art: "xr_format", year: u("الشكل", "The look"), mark: u("١٠", "10"), era: u("التنسيق في الآخر", "Formatting last"),
        title: u("الألوان في الآخر… بعد ما الأرقام تتراجع", "Colours last… after the figures are checked"),
        story: [u("مهندس التخطيط كان عايز التقرير شكله حلو من أول تشغيل: ألوان، وخطوط، وعرض أعمدة. بس افتكر إن التنسيق بالـ COM أكتر جزء بيكبّر الكود، وأكتر جزء ممكن يتعطل بين نسخ إكسل. فطلبه كخطوة أخيرة، بعد المراجعة.",
          "The planning engineer wanted the report to look good from the first run: colours, fonts, column widths. Then he remembered that formatting through COM is what grows the code most, and what breaks most often between Excel versions. So he asked for it as the last step, after the check."),
        u("التنسيق اللي اختاره بسيط: فاصل للآلاف، وعلامة ٪ للنسبة، ولون أحمر فاتح لأي نسبة تحت ٩٠٪، وصف العناوين ثابت. خط ٤ في يناير ومارس ظهر باللون الأحمر الفاتح، ومحدش محتاج يدوّر عليه.",
          "The formatting he chose is simple: a thousands separator, a percent sign for the rate, light red for any rate under 90%, and a frozen header row. Line 4 in January and March showed in light red, and nobody had to search for it.")],
        answer: u("اطلب التنسيق بعد ما الأرقام تتراجع، وخليه قليل ومعناه واضح. لأن التنسيق الكتير بيكبّر الكود، واللون اللي مالوش معنى بيشتّت.", "Ask for formatting after the figures are checked, and keep it little and meaningful — heavy formatting grows the code, and colour without meaning distracts."),
        idea: u("اللون بيشاور… بس الرقم هو اللي بيتكلم.", "Colour points… the figure speaks.")
      },
      {
        id: "compare", art: "xr_compare", year: u("الاعتماد", "Sign-off"), mark: u("١١", "11"), era: u("قصاد المعتمد", "Against the approved one"),
        title: u("أول تقرير قصاد مفتاح الإجابة: خمس أرقام", "The first report against the answer key: five figures"),
        story: [u("قبل ما يبعت، مهندس التخطيط فتح مفتاح الإجابة وقارن خمس أرقام: خط ٢ يناير ١١١٫١٪، وخط ٤ مارس ٨٥٫١٪، وخط ٦ مارس «مفيش خطة»، والإجمالي ٢٩٬٣٠٤ جهاز، و١٧ خطة مستخدمة. الخمسة مطابقين.",
          "Before sending, the planning engineer opened the answer key and compared five figures: line 2 January 111.1%, line 4 March 85.1%, line 6 March “no plan”, the total 29,304 units, and 17 plans used. All five match."),
        u("ومع ملفات الشغل الحقيقية، مفيش مفتاح إجابة؛ فيه حاجة أحسن: تقرير الشهر اللي فات المعمول بالإيد والمعتمد. أول تشغيل على بيانات الشهر ده بيتقارن بيه رقم برقم. ولو اتطابقوا، الأداة كسبت ثقتها.",
          "With real work files there's no answer key; there's something better: last month's approved hand-made report. The first run on that month's data is compared with it figure by figure. If they match, the tool has earned its trust.")],
        answer: u("أول تشغيل لأي أداة تقارير يتقارن بتقرير معتمد معروف. لأن ده الاختبار الوحيد اللي بيثبت إن الأداة فهمت شغلك، مش بس إنها اشتغلت.", "The first run of any reporting tool is compared with a known approved report — it's the only test that proves the tool understood your work, not just that it ran."),
        idea: u("الأداة بتكسب الثقة… مش بتاخدها.", "A tool earns trust… it isn't given it.")
      },
      {
        id: "cliff", art: "xr_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("صباح الأحد", "Sunday morning"),
        title: u("ست ساعات بقوا عشر دقايق… لحد رسالة صباح الأحد", "Six hours became ten minutes… until Sunday morning's message"),
        story: [u("التلات أدوات بقوا شغالين ورا بعض: ١٣ تقرير، وبعدين الأسماء، وبعدين التقرير. ست ساعات كل شهر بقوا عشر دقايق، ومعاهم تلات سجلات بتقول كل اللي حصل. ومهندس التخطيط سلّم الأدوات لزميله في الوردية التانية علشان يستخدمها.",
          "The three tools now run one after another: 13 reports, then the names, then the report. Six hours a month became ten minutes, with three logs telling everything that happened. And the planning engineer handed the tools to his colleague on the second shift."),
        u("صباح الأحد، الزميل بعت صورة شاشة: الشاشة السودا، وسطر أحمر بالإنجليزي فيه «0x800A03EC»، ومن غير أي تقرير. ولا هو فاهم الرسالة، ولا مهندس التخطيط قدامه. والسؤال اللي الدرس الجاي بيجاوبه: لما الأداة توقف أو تغلط، تعمل إيه؟",
          "On Sunday morning the colleague sent a screenshot: the black window, a red English line containing “0x800A03EC”, and no report. He didn't understand the message, and the planning engineer wasn't there. And the question the next lesson answers: when a tool stops or goes wrong, what do you do?")],
        answer: u("واجب الدرس: شغّل الأداة التالتة، وقارن الخمس أرقام بالمفتاح، وغيّر خطة خط في نسختك وشوف النسبة والترتيب اتغيّروا. لأن الأداة اللي بتفهمها بتعرف تتوقع نتيجتها.", "This lesson's task: run tool three, compare the five figures with the key, and change one line's plan in your copy to watch the rate and rank change — a tool you understand is one whose result you can predict."),
        idea: u("الأداة شغالة… لحد ما توقف عند حد تاني.", "The tool works… until it stops for someone else.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.reportStory]);
})(window.ACADEMY = window.ACADEMY || {});
