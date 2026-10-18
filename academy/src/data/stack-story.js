/* Tool one on the kit — the story deck of lesson x3 (unit 2).
   The same sales supervisor carries every slide with one question: «إزاي ١٣ ملف يبقوا جدول واحد من غير ولا صف ضايع؟».
   The deck runs the first tool of lesson f8 on the sample kit: the Prompt with real names, the model's questions,
   matching by name, the totals row, text dates, the first stop at a renamed column, a rule instead of a hand fix,
   duplicates sent for review, reading in one block, and the log checked against the answer key.
   Each slide gives one rule with its reason. Figures are the kit's own. Drawings are the xs_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.stackStory = {
    id: "stack", lesson: "x3",
    kicker: u("الأداة الأولى · الحكاية كاملة في ٨ دقايق", "Tool one · the whole story in 8 minutes"),
    title: u("١٣ ملف أسبوعي في جدول واحد، من غير ولا صف ضايع", "13 weekly files into one table, without losing a row"),
    lead: u("السكة للجهاز بقت جاهزة، والحقيبة قدامنا. في الحكاية دي المشرف بيبني أول أداة من التلاتة على ملفات الحقيبة: يملا الـ Prompt، ويجاوب أسئلة النموذج، ويشغّل، ويقابل خمس مشاكل من العشرة، واحدة ورا التانية.",
      "The road to the laptop is ready, and the kit is in front of us. In this story the supervisor builds the first of the three tools on the kit's files: he fills in the Prompt, answers the model's questions, runs it, and meets five of the ten problems, one after another."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي ١٣ ملف يبقوا جدول واحد من غير ولا صف ضايع؟", "How do 13 files become one table without losing a row?"),
    finalQuestion: u("الجدول كامل… بس فيه أكواد بس. الأسماء تيجي منين؟", "The table is complete… but it holds only codes. Where do the names come from?"),
    note: u("الأرقام والرسايل هي اللي بتطلع من الحقيبة نفسها. نص الرسايل ممكن يختلف حسب الكود اللي النموذج يكتبه.", "The figures and messages are the ones the kit itself produces. The wording of messages may differ with the code the model writes."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("الأداة الأولى، في شرائح", "Tool one, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "scene", art: "xs_scene", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("ربع سنة في جدول", "A quarter in one table"),
        title: u("المدير عايز الربع كله في جدول واحد", "The manager wants the whole quarter in one table"),
        story: [u("فاكر أول مهمة من التلاتة في درس أول أتمتة؟ ملفات تحت بعض. المدير طلب الربع الأول كله في جدول واحد، علشان يعمل عليه جدول محوري. يعني ١٣ ملف أسبوعي، كل واحد بيتفتح، ويتنسخ، ويتلصق تحت اللي قبله، ساعتين ونص بالإيد.",
          "Remember the first of the three jobs in the first-automation lesson? Files stacked. The manager asked for the whole first quarter in one table, to build a pivot on. That means 13 weekly files, each opened, copied and pasted under the one before: two and a half hours by hand."),
        u("والمشرف عارف إن الساعتين ونص مش هم المشكلة الوحيدة. المشكلة إن في أسبوع منهم ممكن يكون فيه عمود زيادة، أو صف إجمالي في الآخر، وهو بينسخ مش هياخد باله. والسؤال اللي ماشي معانا: إزاي الـ ١٣ ملف يبقوا جدول واحد من غير ولا صف ضايع، ولا صف زيادة؟",
          "And the supervisor knows the two and a half hours aren't the only problem. One week may hold an extra column, or a totals row at the bottom, and while copying he won't notice. The question we carry: how do the 13 files become one table without losing a row, or gaining one?")],
        answer: u("قبل الأداة، اكتب النتيجة الصح بتبقى شكلها إيه: كام ملف، وكام عمود، وفين بيروح كل حاجة. لأن من غير صورة للنتيجة، مش هتعرف الأداة صح ولا لأ.", "Before the tool, write what the right result looks like: how many files, which columns, where everything goes — without a picture of the result you can't tell if the tool is right."),
        idea: u("مش بس أسرع… من غير ولا صف ضايع.", "Not only faster… without losing a row.")
      },
      {
        id: "prompt", art: "xs_prompt", year: u("الطلب", "The request"), mark: u("٠٢", "02"), era: u("الأسماء بالحرف", "Names letter for letter"),
        title: u("نفس وصفة الـ Prompt… بأسماء الحقيبة بالحرف", "The same Prompt recipe… with the kit's names letter for letter"),
        story: [u("المشرف فتح مكتبة البرومبتات، وخد Prompt «الأداة الأولى على الحقيبة». هو نفس Prompt درس أول أتمتة، بس كل الفراغات متملية: الفولدر Sales_2026_Q1، والملفات Week_01 لحد Week_13، والشيت Sales، والعناوين الستة بالحرف.",
          "The supervisor opened the prompt library and took “Tool one on the kit”. It's the same Prompt as in the first-automation lesson, but every blank is filled: the folder Sales_2026_Q1, the files Week_01 to Week_13, the sheet Sales, and the six headers letter for letter."),
        u("وزوّد عليه القواعد العامة اللي اتعلمها في الحكاية الأولى: طابق الأعمدة بالاسم، والصف اللي مفيهوش رقم فاتورة يتساب ويتسجّل، وأي عمود ناقص وقّف. وفي آخره فقرة «طريقة التسليم». ودوس «إرسال» في Gemini Enterprise.",
          "And he added the general rules he learned in the first story: match columns by name, skip and log a row with no invoice number, stop on any missing column. At the end, the “Delivery” paragraph. And he pressed “Send” in Gemini Enterprise.")],
        answer: u("املا كل فراغ في الـ Prompt باسم حقيقي من الملف، مش بوصف. لأن «شيت المبيعات» غير «Sales»، والأداة بتدوّر على الاسم.", "Fill every blank in the Prompt with a real name from the file, not a description — “the sales sheet” isn't “Sales”, and the tool looks for the name."),
        idea: u("الـ Prompt الجاهز نصه وصفة… ونصه أسماءك.", "A ready Prompt is half recipe… half your names.")
      },
      {
        id: "questions", art: "xs_questions", year: u("الأسئلة", "Questions"), mark: u("٠٣", "03"), era: u("قبل أي كود", "Before any code"),
        title: u("النموذج سأل تلات أسئلة… قبل ولا سطر كود", "The model asked three questions… before a line of code"),
        story: [u("زي ما الـ Prompt طلب، النموذج ما كتبش كود. سأل: «التاريخ المكتوب كنص، يوم/شهر/سنة ولا شهر/يوم/سنة؟»، و«الصف اللي من غير رقم فاتورة، أسيبه وأسجّله ولا أوقف؟»، و«الصفوف المتكررة بالظبط، أحذفها ولا أوريهالك؟».",
          "As the Prompt asked, the model wrote no code. It asked: “Is a date typed as text day/month/year or month/day/year?”, “A row with no invoice number: skip and log it, or stop?”, and “Exact duplicate rows: delete them, or show them to you?”"),
        u("المشرف جاوب: «يوم/شهر/سنة، زي ما بنكتب في مصر»، و«سيبه وسجّله»، و«ما تحذفش؛ حطهم في شيت للمراجعة». تلات إجابات في دقيقة، وكل واحدة منهم كانت هتبقى غلطة صامتة في الأداة لو النموذج خمّنها.",
          "The supervisor answered: “day/month/year, as we write it in Egypt”, “skip and log it”, and “don't delete; put them on a sheet for review”. Three answers in a minute, and each would have been a silent mistake in the tool had the model guessed.")],
        answer: u("جاوب أسئلة النموذج بقرار واضح، مش «اللي تشوفه». لأن السؤال ده بالظبط هو المكان اللي القرار فيه بتاعك إنت.", "Answer the model's questions with a clear decision, not “whatever you think” — that question is exactly where the decision is yours."),
        idea: u("كل سؤال قبل الكود… غلطة ما حصلتش.", "Every question before the code… is a mistake that didn't happen.")
      },
      {
        id: "byname", art: "xs_byname", year: u("الفخ ٢", "Trap 2"), mark: u("٠٤", "04"), era: u("بالاسم مش بالترتيب", "By name, not position"),
        title: u("Week_07: عمود زيادة في النص", "Week_07: an extra column in the middle"),
        story: [u("في Week_07، حد زوّد عمود «ملاحظات» بين «الكمية» و«القيمة». لو الأداة بتنسخ العمود السادس على إنه القيمة، هتنسخ الملاحظات مكان الفلوس، وقيمة الأسبوع كله هتختفي من الإجمالي، ومفيش ولا رسالة.",
          "In Week_07, someone added a “Notes” column between “Qty” and “Value”. If the tool copies the sixth column as the value, it copies the notes in place of the money, and the whole week's value vanishes from the total, without a single message."),
        u("بس الأداة دي بتدوّر على كل عمود باسمه: «القيمة» في أي مكان كانت. فلقت القيمة في العمود السابع، وكمّلت صح، وكتبت في السجل: «Week_07.xlsx: عمود زيادة اسمه ملاحظات، اتساب». ده الفرق بين قاعدة «بالاسم» وقاعدة «بالترتيب».",
          "But this tool looks for each column by name: “Value” wherever it is. So it found the value in the seventh column, carried on correctly, and logged: “Week_07.xlsx: extra column Notes, left out”. That's the difference between “by name” and “by position”.")],
        answer: u("اطلب دايمًا مطابقة الأعمدة بالاسم. لأن ترتيب الأعمدة بيتغيّر من غير ما حد يقولك، والاسم نادرًا.", "Always ask for columns matched by name — column order changes without anyone telling you; names rarely do."),
        idea: u("الترتيب بيتغيّر… والاسم بيفضل.", "Order changes… names stay.")
      },
      {
        id: "total", art: "xs_total", year: u("الفخ ١", "Trap 1"), mark: u("٠٥", "05"), era: u("صف الإجمالي", "The totals row"),
        title: u("Week_02: صف «الإجمالي» كان هيتحسب مرتين", "Week_02: the “Total” row would have counted twice"),
        story: [u("الفرع اللي بعت Week_02 كان متعوّد يحط في آخر الشيت سطر «الإجمالي» فيه مجموع الكمية والقيمة. شكله لطيف للي بيقرا الملف، بس للأداة هو سطر مبيعات زي أي سطر. لو اتجمع، مبيعات الأسبوع كله هتتحسب مرتين.",
          "The branch that sent Week_02 used to put a “Total” line at the bottom of the sheet with the sums of quantity and value. It looks nice to a reader, but to a tool it's a sales line like any other. Stacked in, the whole week's sales would count twice."),
        u("القاعدة العامة مسكته: السطر ده مفيهوش رقم فاتورة. فالأداة سابته وكتبت في السجل: «Week_02.xlsx: صف ٩٥ من غير رقم فاتورة، اتساب». ٩٣ صف مبيعات دخلوا، والصف الـ ٩٤ اللي تحتهم ما دخلش.",
          "The general rule caught it: that line has no invoice number. So the tool left it out and logged: “Week_02.xlsx: row 95 has no invoice number, skipped”. 93 sales rows went in, and the 94th line beneath them didn't.")],
        answer: u("اطلب قاعدة تحدد إيه اللي يعتبر «سطر بيانات»، زي وجود رقم فاتورة. لأن صفوف الإجمالي والعناوين المكررة شكلها بيانات وهي مش بيانات.", "Ask for a rule that defines a “data row”, such as having an invoice number — totals rows and repeated headers look like data but aren't."),
        idea: u("مش كل سطر في الشيت… سطر بيانات.", "Not every line in a sheet… is a data line.")
      },
      {
        id: "dates", art: "xs_dates", year: u("الفخ ٤", "Trap 4"), mark: u("٠٦", "06"), era: u("تواريخ كنص", "Dates as text"),
        title: u("Week_09: ٩٩ تاريخ مكتوبين كلام", "Week_09: 99 dates typed as words"),
        story: [u("في Week_09 التواريخ اتكتبت بالإيد كنص، زي «26/02/2026». إكسل بيعرضها زي التاريخ، بس جوّاها كلام. ولما الأداة بتقرا الشيت، التاريخ الحقيقي بيوصلها رقم يوم، والتاريخ النص بيوصل حروف. ولو اتحطوا جنب بعض، الفرز بالتاريخ والتجميع بالشهر هيتلخبطوا.",
          "In Week_09 the dates were typed by hand as text, like “26/02/2026”. Excel shows them like dates, but inside they're words. When the tool reads the sheet, a real date arrives as a day number and a text date as characters. Put side by side, sorting by date and grouping by month go wrong."),
        u("وهنا السؤال اللي النموذج سأله في الأول بيرجع: يوم/شهر ولا شهر/يوم؟ لأن «03/02» ممكن تبقى ٣ فبراير أو ٢ مارس. الإجابة اتكتبت مرة، والأداة حوّلت الـ ٩٩ تاريخ وسجّلت عددهم.",
          "Here the model's first question returns: day/month or month/day? Because “03/02” could be 3 February or 2 March. The answer was given once, and the tool converted the 99 dates and logged how many.")],
        answer: u("أي تحويل للتواريخ لازم يبقى بقاعدة إنت قلتها. لأن نفس الكتابة ليها معنيين، والتخمين بيحط مبيعات في الشهر الغلط.", "Any date conversion must follow a rule you stated — the same writing has two meanings, and guessing puts sales in the wrong month."),
        idea: u("«03/02»… فبراير ولا مارس؟ إنت اللي تقول.", "“03/02”… February or March? You decide.")
      },
      {
        id: "stop", art: "xs_stop", year: u("أول تشغيل", "First run"), mark: u("٠٧", "07"), era: u("الأداة وقفت", "The tool stopped"),
        title: u("أول تشغيل وقف عند Week_11… وده نجاح", "The first run stopped at Week_11… and that's success"),
        story: [u("المشرف دوس دبل كليك. الشاشة السودا بدأت تكتب: Week_01 اتقرا، Week_02 اتقرا… لحد Week_11 ووقفت: «Week_11.xlsx: العمود الكمية مش موجود؛ لقيت الكميه». العشر ملفات اللي قبله اتقروا، بس الأداة ما كتبتش أي نتيجة.",
          "The supervisor double-clicked. The black window began writing: Week_01 read, Week_02 read… until Week_11, where it stopped: “Week_11.xlsx: column Qty not found; found Quantity”. The ten files before it were read, but the tool wrote no result."),
        u("أول إحساس كان إحباط، وبعدين افتكر قاعدة درس أول أتمتة: الأداة الكويسة بتقولك إيه اللي ما قدرتش تعمله. لو كانت كمّلت، كانت هتحط الأسبوع ده من غير كميات، و١١٦ صف كانوا هيدخلوا التقرير ناقصين.",
          "The first feeling was frustration, then he remembered the first-automation rule: a good tool tells you what it couldn't do. Had it carried on, it would have entered this week with no quantities, and 116 rows would have reached the report incomplete.")],
        answer: u("لما الأداة توقف برسالة فيها اسم الملف والعمود، اقرا الرسالة قبل أي حاجة. لأن الوقفة دي هي الأداة بتحميك من رقم غلط.", "When the tool stops with a message naming the file and column, read the message before anything — that stop is the tool protecting you from a wrong figure."),
        idea: u("الأداة اللي بتوقف… بتشتغل.", "A tool that stops… is working.")
      },
      {
        id: "alias", art: "xs_alias", year: u("التصليح", "The fix"), mark: u("٠٨", "08"), era: u("قاعدة مش تعديل", "A rule, not an edit"),
        title: u("صلّح القاعدة… مش الملف", "Fix the rule… not the file"),
        story: [u("أسهل حل كان قدامه: يفتح Week_11 ويصلّح «الكميه» لـ «الكمية» بإيده، ويشغّل تاني. بس الشهر الجاي نفس الفرع هيبعت نفس الكتابة، ويرجع يصلّح بإيده تاني. وده بالظبط الشغل اليدوي اللي الأداة جت علشان تشيله.",
          "The easiest fix was right there: open Week_11, correct the header by hand and run again. But next month the same branch will send the same spelling, and he'll be fixing it by hand again — exactly the manual work the tool came to remove."),
        u("فرجع في نفس المحادثة وكتب: «اعتبر الكميه نفس الكمية، وسجّل في السجل كل مرة القاعدة دي اتطبقت». النموذج عدّل سطرين، وادّاله نسخة جديدة باسم ‎stack_tool_v2.ps1. والملف الأصلي فضل زي ما هو.",
          "So he went back in the same chat and wrote: “Treat Quantity as Qty, and log every time this rule is applied.” The model changed two lines and gave him a new version named stack_tool_v2.ps1. The original file stayed as it was.")],
        answer: u("لما الأداة توقف عند حاجة هتتكرر، ضيف قاعدة للأداة بدل ما تصلّح الملف بإيدك. لأن التصليح بالإيد بيرجع كل شهر، والقاعدة بتتكتب مرة.", "When the tool stops at something that will recur, add a rule to the tool instead of fixing the file by hand — a hand fix returns every month; a rule is written once."),
        idea: u("التصليح بالإيد شغل متكرر… والقاعدة أتمتة.", "A hand fix is repeated work… a rule is automation.")
      },
      {
        id: "dups", art: "xs_dups", year: u("الفخ ٥", "Trap 5"), mark: u("٠٩", "09"), era: u("المتكرر", "Duplicates"),
        title: u("صفين متكررين… والقرار للإنسان", "Two duplicated rows… and the decision is human"),
        story: [u("التشغيل التاني خلص. وفي شيت «للمراجعة» صفين من Week_04: نفس التاريخ، ونفس رقم الفاتورة، ونفس كل حاجة. غالبًا حد دخّلهم مرتين. الأداة ما حذفتهمش، ودي كانت إجابة المشرف على سؤال النموذج في الأول.",
          "The second run finished. On the “To review” sheet sat two rows from Week_04: the same date, the same invoice number, the same everything. Most likely someone entered them twice. The tool didn't delete them, as the supervisor had answered the model at the start."),
        u("ليه ما تحذفش على طول؟ لأن مرة من كل كام مرة، الصف المتكرر بيبقى حقيقي: عميل اشترى نفس الصنف مرتين في نفس الفاتورة. المشرف كلّم الفرع، واتأكد إنها غلطة إدخال، ووافق على الحذف. القرار اتاخد في دقيقتين، بس اتاخد بعلم.",
          "Why not delete them straight away? Because now and then a duplicate is real: a customer bought the same item twice on one invoice. The supervisor called the branch, confirmed it was an entry mistake, and approved removing them. The decision took two minutes, but it was taken knowingly.")],
        answer: u("الأداة تبلّغ عن المتكرر، وإنت توافق على الحذف. لأن الحذف قرار، والأداة ما تعرفش اللي الفرع يعرفه.", "The tool reports duplicates and you approve deleting them — deleting is a decision, and the tool doesn't know what the branch knows."),
        idea: u("الأداة بتلاقي… والإنسان بيقرر.", "The tool finds… the human decides.")
      },
      {
        id: "array", art: "xs_array", year: u("السرعة", "Speed"), mark: u("١٠", "10"), era: u("مرة واحدة", "All at once"),
        title: u("ليه الأداة خلصت في ثواني مش دقايق؟", "Why the tool finished in seconds, not minutes"),
        story: [u("زميل في فرع تاني جرّب Prompt تاني، والأداة بتاعته فضلت شغالة تلات دقايق على نفس الملفات. الفرق كان سطر واحد في الـ Prompt: «اقرا كل شيت مرة واحدة في مصفوفة، واكتب الناتج مرة واحدة، مش خلية خلية».",
          "A colleague at another branch tried a different Prompt, and his tool kept running for three minutes on the same files. The difference was one line in the Prompt: “Read each sheet at once into an array, and write the result at once, not cell by cell.”"),
        u("كل مرة السكريبت بيكلّم إكسل، فيه وقت ضايع في السكة. ١٬٣٠٠ صف في ٦ أعمدة يعني حوالي ٨٬٠٠٠ مرة لو خلية خلية، و١٣ مرة بس لو شيت شيت. مع الحقيبة الفرق دقايق، ومع ملفات الشغل الحقيقية الفرق ممكن يبقى ساعة.",
          "Every time the script speaks to Excel, time is lost on the way. 1,300 rows in 6 columns is about 8,000 trips cell by cell, and just 13 sheet by sheet. With the kit the difference is minutes; with real work files it can be an hour.")],
        answer: u("اطلب القراءة والكتابة في كتلة واحدة لكل شيت. لأن عدد مرات الكلام مع إكسل هو اللي بيحدد سرعة الأداة.", "Ask for reading and writing in one block per sheet — the number of trips to Excel decides the tool's speed."),
        idea: u("رحلة واحدة لكل شيت… مش لكل خلية.", "One trip per sheet… not per cell.")
      },
      {
        id: "log", art: "xs_log", year: u("المقارنة", "The check"), mark: u("١١", "11"), era: u("السجل قصاد المفتاح", "Log against key"),
        title: u("السجل قصاد مفتاح الإجابة: رقم برقم", "The log against the answer key: figure by figure"),
        story: [u("آخر سطور السجل: ١٣ ملف اتقروا، و١٬٣٠٤ صف بيانات، وصف واحد اتساب من غير رقم فاتورة، وصفين في «للمراجعة»، وعمود زيادة في Week_07، و٩٩ تاريخ اتحوّلوا، وقاعدة «الكميه» اتطبقت مرة. والإجمالي بعد حذف المتكرر: ٢٨٬٤٢٨٬١٥٠ جنيه.",
          "The log's last lines: 13 files read, 1,304 data rows, one row skipped with no invoice number, two rows in “To review”, an extra column in Week_07, 99 dates converted, the Quantity rule applied once. And the total after removing duplicates: EGP 28,428,150."),
        u("ودلوقتي بس، فتح Answer_key.txt. نفس الأرقام بالظبط. ومع كده عمل اختبار أخير: نسخة من Week_03 مسح منها عمود القيمة، وشغّل. الأداة وقفت وسمّت الملف والعمود. دلوقتي يقدر يقول إنه بيثق فيها.",
          "Only now did he open Answer_key.txt. The same figures exactly. Still, he ran one last test: a copy of Week_03 with the Value column deleted. The tool stopped and named the file and the column. Now he can say he trusts it.")],
        answer: u("اعتمد الأداة بعد ما تطابق مفتاح الإجابة، وبعد ما تشوفها بتوقف عمدًا. لأن النجاح لوحده ما بيثبتش إنها هتوقف لما تغلط.", "Rely on the tool once it matches the answer key and you've seen it stop on purpose — success alone doesn't prove it will stop when it goes wrong."),
        idea: u("طابقت المفتاح… ووقفت لما كسرناها.", "It matched the key… and stopped when we broke it.")
      },
      {
        id: "cliff", art: "xs_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("أكواد بس", "Codes only"),
        title: u("الجدول كامل… والمدير سأل عن الفئات", "The table is complete… and the manager asked about categories"),
        story: [u("المشرف بعت الجدول، و١٬٣٠٢ صف مراجَعين. بعد ساعة المدير رد: «عايز المبيعات حسب الفئة وحسب المنطقة». المشرف بص في الجدول: كود الفرع BR04، وكود الصنف P103. مفيش كلمة «طنطا» ولا كلمة «تلاجات».",
          "The supervisor sent the table: 1,302 checked rows. An hour later the manager replied: “I want sales by category and by region.” The supervisor looked at the table: branch code BR04, product code P103. Not the word “Tanta”, not the word “refrigerators”."),
        u("الأسماء والفئات والمناطق في ملف تاني خالص: Masters.xlsx. وفاكر الفخاخ العشرة؟ لسه فيه أكواد بمسافات، وأكواد بحروف صغيرة، وصنف مش في القايمة، وصنف متسجّل مرتين. والسؤال اللي الدرس الجاي بيجاوبه: إزاي كل كود يلاقي اسمه؟",
          "The names, categories and regions live in another file altogether: Masters.xlsx. And remember the ten traps? There are still codes with spaces, codes in lower case, a product missing from the list, and a product listed twice. And the question the next lesson answers: how does every code find its name?")],
        answer: u("واجب الدرس: شغّل الأداة الأولى على الحقيبة، وقارن ٤ أرقام بالمفتاح، وجرّب تكسرها بنسخة ناقصة عمود. لأن الأداة اللي ما شفتهاش بتوقف لسه ما اتجرّبتش.", "This lesson's task: run tool one on the kit, compare 4 figures with the key, and try to break it with a copy missing a column — a tool you haven't seen stop hasn't been tested yet."),
        idea: u("الجدول كامل… بس لسه ساكت عن الأسماء.", "The table is complete… but still silent about names.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.stackStory]);
})(window.ACADEMY = window.ACADEMY || {});
