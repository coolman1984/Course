/* Example 2, part 2 — the story deck of lesson a4 (unit 3), on Unit3_Example_2_Commercial_Review.
   The planning engineer carries every slide with one question: «إزاي جدول البيانات يبقى عرض باوربوينت جاهز، وكل رقم فيه مظبوط؟».
   The deck builds the review from the Fact table: the rates computed in pivot tables, the check before the deck, the
   outline approved first, PowerPoint driven like Excel and Word, charts pasted as pictures, numbers read from the tables,
   the empty slide for the director, one decimal place, the test that changes a figure, and the PDF copy. Figures are
   the project's own. Drawings are the pp_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.slidesStory = {
    id: "pdeck", lesson: "a4",
    kicker: u("المثال التاني · الجزء التاني · الحكاية في ٨ دقايق", "Example 2 · part two · the story in 8 minutes"),
    title: u("من جدول البيانات لعرض باوربوينت بيتعمل لوحده", "From the data table to a PowerPoint deck that builds itself"),
    lead: u("جدول Fact جاهز ومراجَع على ١٢ ملف، والاجتماع يوم الأحد. في الحكاية دي مهندس التخطيط بيخلّي الأداة تعمل الجداول والرسوم والعرض، وكل رقم في الشرايح يبقى نفس رقم الإكسل.",
      "The Fact table is ready and checked against 12 files, and the meeting is on Sunday. In this story the planning engineer has the tool make the tables, the charts and the deck, with every number on the slides the same as in Excel."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي جدول البيانات يبقى عرض باوربوينت جاهز، وكل رقم فيه مظبوط؟", "How does the data table become a ready PowerPoint deck with every number right?"),
    finalQuestion: u("طب لو المساعد نفسه يشتغل جوّه الفولدر؟", "And what if the assistant itself worked inside the folder?"),
    note: u("الأرقام هي اللي بتطلع من ملفات المثال نفسه. شكل الشرايح ممكن يختلف حسب الكود اللي النموذج يكتبه وقالب الشركة.", "The figures are the ones the example's own files produce. The look of the slides may differ with the code the model writes and the company template."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("العرض، في شرائح", "The deck, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "sunday", art: "pp_sunday", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("يوم كامل", "A whole day"),
        title: u("العرض اليدوي: يوم كامل، ونسخة قديمة في النص", "The hand-made deck: a whole day, and an old version in the middle"),
        story: [u("الربع اللي فات، العرض اتعمل بالإيد: جدول في إكسل، ورسم، ونسخ، ولصق في باوربوينت، وكتابة الأرقام في الشرايح. يوم كامل. وفي الاجتماع حد لاحظ إن رقم التصدير في الشريحة ٣ مختلف عن الشريحة ٥: واحد اتنسخ من نسخة قديمة.",
          "Last quarter the deck was made by hand: a table in Excel, a chart, copy, paste into PowerPoint, typing the numbers on the slides. A whole day. In the meeting someone noticed the export figure on slide 3 differed from slide 5: one was copied from an old version."),
        u("المرة دي عند مهندس التخطيط جدول Fact مراجَع. الفكرة إن كل حاجة في العرض تتبني منه بأداة: الأرقام والرسوم والشرايح. والسؤال اللي ماشي معانا: إزاي جدول البيانات يبقى عرض باوربوينت جاهز، وكل رقم فيه مظبوط؟",
          "This time the planning engineer has a checked Fact table. The idea is that everything in the deck is built from it by a tool: the numbers, the charts and the slides. The question we carry: how does the data table become a ready PowerPoint deck with every number right?")],
        answer: u("ابني العرض من مصدر واحد مراجَع، مش من نسخ متفرقة. لأن رقمين مختلفين لنفس الحاجة في عرض واحد بيضيّعوا الثقة في كل الأرقام.", "Build the deck from one checked source, not from scattered copies — two different numbers for the same thing in one deck destroy trust in every number."),
        idea: u("مصدر واحد… ولا رقمين مختلفين.", "One source… never two different numbers.")
      },
      {
        id: "rates", art: "pp_rates", year: u("الحساب", "Calculation"), mark: u("٠٢", "02"), era: u("في الجدول المحوري", "In the pivot table"),
        title: u("النسب بتتحسب في الجدول المحوري، مش في الشريحة", "The rates are worked out in the pivot table, not on the slide"),
        story: [u("المدير عايز ٣ نسب: التحقيق = المبيعات ÷ المستهدف، والنولون للجهاز = FreightEGP ÷ ShippedUnits، ونسبة المرتجعات = ReturnUnits ÷ SalesQty. الأداة بتحسبهم جوّه الجداول المحورية من Fact، مش في الشريحة ولا في الآلة الحاسبة.",
          "The director wants 3 rates: achievement = sales ÷ target, freight per set = FreightEGP ÷ ShippedUnits, and the return rate = ReturnUnits ÷ SalesQty. The tool works them out inside the pivot tables from Fact, not on the slide and not on a calculator."),
        u("والنتيجة: الإسكندرية ١٠٦٫٢٪، والتصدير ١٠٣٫٢٪، والقاهرة ٩٦٫٦٪، والدلتا ٩١٫١٪. والنولون للجهاز: ١٩ جنيه في القاهرة، و١٧٩ في التصدير. كل نسبة ليها مكان واحد بتتحسب فيه، فلو البيانات اتغيّرت، النسبة تتغيّر في كل مكان مع بعض.",
          "The result: Alexandria 106.2%, export 103.2%, Cairo 96.6%, Delta 91.1%. And freight per set: EGP 19 in Cairo, 179 for export. Every rate has one place where it's worked out, so if the data changes, the rate changes everywhere together.")],
        answer: u("أي حساب يتعمل مرة واحدة في مكان واحد، وكل حاجة تقرا منه. لأن الحساب اللي بيتكرر في أكتر من مكان بيختلف أول ما مكان يتعدّل.", "Do any calculation once, in one place, and have everything read from it — a calculation repeated in several places diverges the moment one place is edited."),
        idea: u("كل نسبة ليها بيت واحد.", "Every rate has one home.")
      },
      {
        id: "check", art: "pp_check", year: u("المراجعة", "The check"), mark: u("٠٣", "03"), era: u("قبل العرض", "Before the deck"),
        title: u("المراجعة قبل الشرايح: الجدول المحوري = Fact", "The check before the slides: the pivot table = Fact"),
        story: [u("زي الداشبورد بالظبط: قبل ما الأداة تفتح باوربوينت، بتقارن مجموع NetSalesEGP في الجدول المحوري بمجموعه في Fact: ٢٩٨٬١٠٣٬٩٥٠ جنيه في الاتنين. ولو مختلفين، توقف وتكتب الفرق، والعرض ما يتعملش أصلًا.",
          "Exactly as with the dashboard: before the tool opens PowerPoint, it compares the sum of NetSalesEGP in the pivot table with its sum in Fact: EGP 298,103,950 in both. If they differ, it stops and writes the difference, and the deck isn't made at all."),
        u("ليه توقف بدل ما تعمل العرض وتنبّه؟ لأن العرض بيتبعت. لو اتعمل بالرقم الغلط ووصل لإيميل الإدارة، التصحيح بعد كده بيبقى إيميل اعتذار. أما الأداة اللي ما بتطلّعش عرض غير لما الأرقام تتطابق، فبتحمي العرض نفسه.",
          "Why stop rather than make the deck and warn? Because decks get sent. Made with the wrong figure and landed in management's inbox, the correction afterwards becomes an apology e-mail. A tool that produces no deck until the figures match protects the deck itself.")],
        answer: u("خلّي الأداة ما تطلّعش الناتج اللي هيتبعت غير بعد ما المراجعة تعدّي. لأن الغلطة اللي اتبعتت أغلى بكتير من الغلطة اللي اتمسكت.", "Have the tool produce nothing that will be sent until the check passes — a mistake that was sent costs far more than one that was caught."),
        idea: u("مفيش عرض… من غير مراجعة.", "No deck… without the check.")
      },
      {
        id: "outline", art: "pp_outline", year: u("الهيكل", "The outline"), mark: u("٠٤", "04"), era: u("٨ شرائح", "8 slides"),
        title: u("٨ شرائح متفق عليها قبل أي تصميم", "8 slides agreed before any design"),
        story: [u("قبل ما يكتب Prompt_2، مهندس التخطيط بعت للمدير التجاري الهيكل كنص: ١ العنوان، ٢ أهم ٤ أرقام، ٣ المبيعات قصاد المستهدف، ٤ الاتجاه الشهري، ٥ التصدير حسب البلد، ٦ اللوجستيات، ٧ المرتجعات، ٨ للنقاش. المدير رد: «تمام، بس زوّد النولون للجهاز في الشريحة ٢».",
          "Before writing Prompt_2, the planning engineer sent the commercial director the outline as text: 1 the title, 2 the 4 key figures, 3 sales against target, 4 the monthly trend, 5 export by country, 6 logistics, 7 returns, 8 for discussion. The director replied: “Fine, but add freight per set on slide 2.”"),
        u("تعديل في سطر نص خد دقيقة. لو كان العرض اتعمل الأول واتغيّر، كان هيبقى ساعة. فاكر مراحل لوحة المعلومات في الكتاب؟ «الموافقة على التصميم قبل التنفيذ». نفس القاعدة للعرض: الهيكل يتوافق عليه كنص، وبعدين الأداة تبني.",
          "A change to one line of text took a minute. Had the deck been made first and then changed, it would have taken an hour. Remember the book's dashboard stages? “Approve the design before building.” The same rule for a deck: agree the outline as text, then the tool builds.")],
        answer: u("اتفق على هيكل الشرايح كنص قبل ما الأداة تبني. لأن تعديل سطر أسرع بكتير من تعديل عرض.", "Agree the slide outline as text before the tool builds — changing a line is far faster than changing a deck."),
        idea: u("الهيكل نص الأول… والشرايح بعده.", "The outline as text first… slides after.")
      },
      {
        id: "com", art: "pp_com", year: u("باوربوينت", "PowerPoint"), mark: u("٠٥", "05"), era: u("نفس الطريقة", "The same way"),
        title: u("باوربوينت بيتشغّل زي إكسل ووورد بالظبط", "PowerPoint is driven exactly like Excel and Word"),
        story: [u("في الوحدة التانية الأداة كانت بتفتح إكسل من غير ما يظهر. في الدرس اللي فات فتحت وورد علشان تقرا الـ PDF. ودلوقتي بتفتح باوربوينت بنفس الطريقة: تعمل عرض جديد، وتضيف شريحة بتخطيط معيّن، وتكتب العنوان، وتحط الرسم، وتحفظ.",
          "In unit 2 the tool opened Excel without showing it. Last lesson it opened Word to read the PDFs. Now it opens PowerPoint the same way: it makes a new deck, adds a slide with a given layout, writes the title, places the chart, and saves."),
        u("ده معناه إن الأوفيس كله، إكسل ووورد وباوربوينت، بيتأتمت بنفس قواعد الأمان: افتح، واشتغل، واقفل، وحرّر الذاكرة حتى لو حصل خطأ. ومن غير ما تنزّل ولا برنامج. وقواعد الـ Prompt هي نفسها، بس بقت ٣ برامج بدل واحد.",
          "That means all of Office, Excel, Word and PowerPoint, is automated under the same safety rules: open, work, close, and release the memory even after an error. And without installing a single program. The Prompt's rules are the same, only now for 3 programs instead of one.")],
        answer: u("اطلب نفس قواعد الأمان لكل برنامج الأداة بتفتحه: اقفله وحرّره في الآخر مهما حصل. لأن برنامج أوفيس فاضل مفتوح في الخلفية بيقفل الملفات ويبطّأ الجهاز.", "Ask for the same safety rules for every program the tool opens: close and release it at the end, whatever happens — an Office program left open in the background locks files and slows the machine."),
        idea: u("٣ برامج… نفس القواعد.", "3 programs… the same rules.")
      },
      {
        id: "picture", art: "pp_picture", year: u("الرسوم", "Charts"), mark: u("٠٦", "06"), era: u("صورة مش رابط", "A picture, not a link"),
        title: u("الرسم بيتنسخ كصورة… مش كرابط بالإكسل", "The chart is copied as a picture… not as a link to Excel"),
        story: [u("فيه طريقتين تحط بيهم رسم إكسل في باوربوينت: رابط بيفضل متوصل بالملف، أو صورة ثابتة. الرابط شكله أذكى، بس العرض لما يتبعت لوحده بالإيميل، الرابط بيدوّر على ملف مش موجود عند اللي فاتحه، وممكن يظهر رسالة أو رسم فاضي.",
          "There are two ways to put an Excel chart in PowerPoint: a link that stays connected to the file, or a fixed picture. The link looks smarter, but when the deck is e-mailed on its own, the link looks for a file the reader doesn't have, and may show a message or an empty chart."),
        u("فالـ Prompt قال: «الرسوم تتنسخ كصورة». والتحديث مش بيضيع: كل ربع الأداة بتعمل العرض من الأول من الجداول الجديدة، فالصور دايمًا جديدة. والعرض بيتفتح عند أي حد، على أي جهاز، وحتى على الموبايل كـ PDF.",
          "So the Prompt said: “the charts are copied as pictures.” Updating isn't lost: every quarter the tool builds the deck from scratch from the new tables, so the pictures are always fresh. And the deck opens for anyone, on any machine, even on a phone as a PDF.")],
        answer: u("العرض اللي هيتبعت لازم يشتغل لوحده من غير أي ملف تاني. لأن اللي بيقراه مش عنده ملفاتك.", "A deck that will be sent must work on its own without any other file — its reader doesn't have your files."),
        idea: u("العرض بيتبعت لوحده… فلازم يكفي نفسه.", "A deck travels alone… so it must stand alone.")
      },
      {
        id: "numbers", art: "pp_numbers", year: u("الأرقام", "Numbers"), mark: u("٠٧", "07"), era: u("من الجدول", "From the table"),
        title: u("كل رقم في الشرايح بيتقري من الجدول المحوري", "Every number on the slides is read from the pivot table"),
        story: [u("الشريحة ٣ فيها رسم المبيعات قصاد المستهدف، وتحته ٤ أرقام: الإسكندرية ١٠٦٫٢٪، والتصدير ١٠٣٫٢٪، والقاهرة ٩٦٫٦٪، والدلتا ٩١٫١٪. الأداة ما كتبتش الأرقام دي من الـ Prompt ولا من ذاكرتها: قرتها من الجدول المحوري لحظة ما عملت الشريحة.",
          "Slide 3 holds the sales-against-target chart, and under it 4 numbers: Alexandria 106.2%, export 103.2%, Cairo 96.6%, Delta 91.1%. The tool didn't write these numbers from the Prompt or from memory: it read them from the pivot table the moment it made the slide."),
        u("ده الفرق بين أداة بتطلّع عرض وعرض اتكتب مرة. لو البيانات اتغيّرت (إشعار دائن اتأخر، أو مستهدف اتعدّل)، الأداة تتشغّل تاني والأرقام كلها تتغيّر صح. ومفيش رقم في العرض يقدر يختلف عن الإكسل.",
          "That's the difference between a tool that produces a deck and a deck written once. If the data changes (a late credit note, a revised target), the tool runs again and every number changes correctly. And no number in the deck can ever differ from Excel.")],
        answer: u("الأداة تكتب الأرقام في الشرايح من الجدول وقت التشغيل، مش من نص ثابت. لأن الرقم الثابت في الكود بيفضل زي ما هو والبيانات بتتغيّر.", "The tool writes the numbers on the slides from the table at run time, not from fixed text — a number fixed in the code stays put while the data changes."),
        idea: u("الشريحة بتقرا… ما بتحفظش.", "The slide reads… it doesn't memorise.")
      },
      {
        id: "empty", art: "pp_empty", year: u("الشريحة ٨", "Slide 8"), mark: u("٠٨", "08"), era: u("للنقاش", "For discussion"),
        title: u("الشريحة الأخيرة فاضية… عن قصد", "The last slide is empty… on purpose"),
        story: [u("النموذج اقترح يكتب في الشريحة ٨: «التوصيات: زيادة الحوافز في الدلتا، وتقليل الشحن البحري». مهندس التخطيط رفض. الأرقام بتقول إن الدلتا ٩١٫١٪؛ ليه، وهنعمل إيه، ده رأي، والرأي بتاع المدير التجاري واللي بيعرفوا السوق.",
          "The model offered to write on slide 8: “Recommendations: raise incentives in Delta, cut sea freight.” The planning engineer refused. The numbers say Delta is at 91.1%; why, and what to do, is opinion, and the opinion belongs to the commercial director and those who know the market."),
        u("فاكر درس العرض الإداري في الكتاب؟ «خلط الأدوار هو الغلطة القاتلة». الأداة مسؤولة عن صحة الأرقام، والمدير مسؤول عن القرار. فالشريحة ٨ عنوانها «للنقاش» وفاضية، والمدير بيكتب فيها بإيده قبل الاجتماع.",
          "Remember the book's management-pitch lesson? “Mixing roles is the fatal mistake.” The tool is responsible for the numbers being right, and the director for the decision. So slide 8 is titled “For discussion” and left empty, and the director writes on it himself before the meeting.")],
        answer: u("خلّي الأداة تعرض أرقام مراجَعة بس، وسيب الاستنتاج والقرار لصاحبه. لأن رأي مكتوب بثقة جوّه عرض رسمي بيبان كأنه قرار حد اتخذه.", "Have the tool show checked figures only, and leave the conclusion and decision to their owner — an opinion written confidently in an official deck looks like someone's decision."),
        idea: u("الأداة للأرقام… والقرار للمدير.", "The tool for the figures… the decision for the director.")
      },
      {
        id: "decimal", art: "pp_decimal", year: u("التفاصيل", "Details"), mark: u("٠٩", "09"), era: u("خانة واحدة", "One decimal"),
        title: u("٢٫٥٥٨١٤٠٪ في الشريحة ٧", "2.558140% on slide 7"),
        story: [u("أول عرض طلع في دقيقتين. مهندس التخطيط قرا كل شريحة قصاد مفتاح الإجابة، ولقى في الشريحة ٧ نسبة مرتجعات M110 مكتوبة ٢٫٥٥٨١٤٠٪. الرقم صح، بس شكله بيقول «محدش راجع». والمفتاح بيقول ٢٫٦٪.",
          "The first deck came out in two minutes. The planning engineer read every slide against the answer key, and on slide 7 found M110's return rate written as 2.558140%. The figure is right, but it looks as if nobody checked. And the key says 2.6%."),
        u("رجع لنفس المحادثة: «كل النسب بخانة عشرية واحدة، والمبالغ بفاصل آلاف، وبالمليون في الشريحة ٢». التشغيل التاني طلع مظبوط. ومعاه حاجة صغيرة كمان: نفس الخط ونفس الألوان في كل الشرايح، زي ما الـ Prompt طلب.",
          "He went back to the same chat: “Every rate to one decimal place, amounts with thousands separators, and in millions on slide 2.” The second run came out right. With it came a small extra: the same font and colours on every slide, as the Prompt asked.")],
        answer: u("حدد شكل الأرقام في الـ Prompt: كام خانة عشرية، وفاصل الآلاف، والوحدة. لأن الرقم الصح بشكل غريب بيخلّي الناس تشك في كل العرض.", "Set the numbers' format in the Prompt: how many decimals, the thousands separator, and the unit — a right figure in an odd format makes people doubt the whole deck."),
        idea: u("الرقم الصح… محتاج شكل صح.", "A right figure… needs a right format.")
      },
      {
        id: "test", art: "pp_test", year: u("التجربة", "The test"), mark: u("١٠", "10"), era: u("غيّر رقم", "Change a figure"),
        title: u("غيّر رقم في نسخة… وشوف الشريحة تتغيّر", "Change a figure in a copy… and watch the slide change"),
        story: [u("آخر اختبار قبل ما يبعت: في نسخة من الفولدر، فتح Fact وغيّر مبيعات الدلتا لشهر سبتمبر بزيادة مليون جنيه، وشغّل الأداة. العرض الجديد قال إن الدلتا بقت ٩٢٫٦٪ بدل ٩١٫١٪، والإجمالي في الشريحة ٢ زاد مليون. كل حاجة اتحركت مع بعض.",
          "The last test before sending: in a copy of the folder he opened Fact, raised Delta's September sales by one million pounds, and ran the tool. The new deck said Delta was now at 92.6% instead of 91.1%, and the total on slide 2 rose by a million. Everything moved together."),
        u("الاختبار ده بيثبت حاجة المراجعة ما تثبتهاش: إن الأرقام في الشرايح مربوطة فعلًا بالبيانات، مش مكتوبة. ولما رجع الرقم لأصله، رجع العرض لأصله. دلوقتي يقدر يقول إن العرض ده هيتعمل صح الربع الجاي كمان.",
          "This test proves something the check doesn't: that the numbers on the slides are really tied to the data, not typed. When he put the figure back, the deck went back too. Now he can say this deck will be built correctly next quarter as well.")],
        answer: u("اختبر الأداة بتغيير رقم واحد في نسخة، وشوف هل الناتج اتغيّر بالظبط بقد التغيير. لأن ده الدليل إن الناتج مبني على البيانات مش منسوخ منها.", "Test the tool by changing one figure in a copy, and see whether the output changes by exactly that much — that's the proof the output is built on the data, not copied from it."),
        idea: u("لو اتغيّر معاه… يبقى مربوط.", "If it moves with it… it's connected.")
      },
      {
        id: "pdf", art: "pp_pdf", year: u("التسليم", "Delivery"), mark: u("١١", "11"), era: u("pptx وPDF", "pptx and PDF"),
        title: u("ملفين جنب بعض: العرض، ونسخة PDF", "Two files side by side: the deck, and a PDF copy"),
        story: [u("الأداة حفظت Q3_Commercial_Review.pptx وجنبه Q3_Commercial_Review.pdf. العرض للاجتماع وللي عايز يعدّل، والـ PDF للي هيقراه على الموبايل وهو رايح الاجتماع. ونفس السجل كتب: ٨ شرائح، و٦ رسوم، و٢٤ رقم اتقروا من الجداول المحورية.",
          "The tool saved Q3_Commercial_Review.pptx and beside it Q3_Commercial_Review.pdf. The deck for the meeting and for whoever wants to edit, the PDF for whoever reads it on a phone on the way to the meeting. The same log recorded: 8 slides, 6 charts, 24 numbers read from the pivot tables."),
        u("المدير التجاري كتب في الشريحة ٨ تلات أسئلة للنقاش، والاجتماع خلص في نص ساعة بدل ساعتين. مفيش حد سأل «الرقم ده صح؟». والقسم التجاري كسب يوم كامل كل ربع، والأهم إنه كسب ثقة في الأرقام.",
          "The commercial director wrote three questions for discussion on slide 8, and the meeting finished in half an hour instead of two. No one asked “is this number right?” The commercial department gained a whole day every quarter, and, more importantly, trust in the numbers.")],
        answer: u("سلّم العرض بالشكل اللي كل قارئ محتاجه: ملف للتعديل وPDF للقراية. لأن العرض اللي ما بيتفتحش على الموبايل ما بيتقريش قبل الاجتماع.", "Deliver the deck in the form each reader needs: a file to edit and a PDF to read — a deck that won't open on a phone isn't read before the meeting."),
        idea: u("ملف للتعديل… وPDF للقراية.", "A file to edit… a PDF to read.")
      },
      {
        id: "cliff", art: "pp_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("الوسيط", "The go-between"),
        title: u("كل حاجة اشتغلت… بس هو كان الوسيط", "Everything worked… but he was the go-between"),
        story: [u("بعد الاجتماع، مهندس التخطيط عدّ اللي عمله في المثال التاني: ٣٤ رسالة رايحة جاية مع النموذج. كل مرة ينسخ كود، ويحفظه، ويشغّل، ويرجع بالرسالة، ويلصقها. النموذج كتب الأداة، بس هو اللي كان بيوصّل بين الشات والفولدر.",
          "After the meeting the planning engineer counted what he did in example 2: 34 messages back and forth with the model. Each time: copy code, save it, run, come back with the message, paste it. The model wrote the tool, but he was the one carrying things between the chat and the folder."),
        u("وكل مرة كان بيوصف الملفات بالكلام، والنموذج عمره ما شاف الـ PDF بنفسه. فكّر: لو المساعد يقدر يبص على الفولدر بنفسه، ويشغّل، ويقرا الرسالة، ويصلّح، وأنا أوافق بس؟ والسؤال اللي الدرس الجاي بيجاوبه: طب لو المساعد نفسه يشتغل جوّه الفولدر؟",
          "And every time he described the files in words; the model never saw a PDF itself. He thought: what if the assistant could look at the folder itself, run, read the message and fix, with me only approving? And the question the next lesson answers: what if the assistant itself worked inside the folder?")],
        answer: u("واجب الدرس: شغّل Prompt_2، واقرا كل رقم في العرض قصاد المفتاح، وغيّر رقم في نسخة وشوفه يتحرّك. لأن العرض اللي ما اختبرتهوش بيتغيّر، ممكن يكون منسوخ.", "This lesson's task: run Prompt_2, read every number in the deck against the key, and change a figure in a copy to see it move — a deck you haven't seen change may well be copied."),
        idea: u("النموذج كتب… وهو كان بيوصّل.", "The model wrote… he did the carrying.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.slidesStory]);
})(window.ACADEMY = window.ACADEMY || {});
