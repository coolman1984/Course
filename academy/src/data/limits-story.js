/* The limits of AI and wise use — the story deck that opens lesson f5 (the last lesson of unit 0).
   One hero runs through every slide: a supplier-change memo prepared with AI, due to the general manager in an hour, and the
   question «المذكرة دي جاهزة تتبعت؟». Each slide checks the memo against one of the book's eight limits (page 41), then the
   wise-use chain, the checks that catch mistakes, and the book's closing equation. Each slide gives one rule with its reason
   («القاعدة، وليه؟»). Names, numbers and the invented decree are illustrative. Same slide schema as data/model-story.js;
   drawings are the l_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.limitsStory = {
    id: "limits", lesson: "f5",
    kicker: u("حدود الذكاء الاصطناعي · الحكاية كاملة في ٧ دقايق", "The limits of AI · the whole story in 7 minutes"),
    title: u("قبل ما تبعت: تمان حدود لازم تعرفها", "Before you send: eight limits you need to know"),
    lead: u("في الوحدة دي شفنا الذكاء الاصطناعي بيقدر يعمل إيه. في الحكاية الأخيرة هنشوف حدوده: مذكرة مهمة اتجهّزت بمساعدته، وقبل ما تتبعت هنراجعها على الحدود التمانية اللي في الكتاب، واحد ورا التاني، ونشوف إزاي تكتشف الغلط قبل ما يوصل لصاحب القرار.",
      "In this unit we saw what AI can do. In this final story we look at its limits: an important memo prepared with its help, which we check against the book's eight limits, one after another, before it is sent — and how to catch mistakes before they reach the decision-maker."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("المذكرة دي جاهزة تتبعت؟", "Is this memo ready to send?"),
    finalQuestion: u("هتراجع إيه قبل ما تبعت المرة الجاية؟", "What will you check before you send next time?"),
    note: u("الأسماء والأرقام والقرار الوزاري في الأمثلة توضيحية ومش حقيقية.", "Names, figures and the ministerial decree in the examples are illustrative, not real."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("حدود الذكاء الاصطناعي والاستخدام الواعي، في شرائح", "The limits of AI and wise use, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "memo", art: "l_memo", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("ساعة قبل الإرسال", "An hour to send"),
        title: u("مذكرة مرتبة، وواثقة، ولازم تتبعت الساعة خمسة", "A tidy, confident memo, due at five"),
        story: [u("مديرة الجودة جهّزت بمساعدة الذكاء الاصطناعي مذكرة للمدير العام: تغيير مورد خامات التغليف. تلات صفحات مرتبة، فيها أرقام العيوب، ومقارنة بين المورّدين، ونص قانوني بيدعم القرار، وتوصية واضحة.",
          "With AI's help, the quality manager prepared a memo for the general manager: changing the packaging supplier. Three tidy pages with defect figures, a supplier comparison, a legal reference supporting the decision, and a clear recommendation."),
        u("المذكرة شكلها احترافي جدًا، ومكتوبة بثقة، والمدير مستنيها الساعة خمسة. والسؤال اللي هنمشي بيه في الحكاية كلها: هي جاهزة تتبعت فعلًا؟ هنراجعها على الحدود التمانية اللي في الكتاب، حد ورا التاني.",
          "It looks very professional, it is written with confidence, and the manager expects it at five. The question we'll carry through the whole story: is it really ready to send? We'll check it against the book's eight limits, one at a time.")],
        answer: u("ما تحكمش على المخرج من شكله. لأن الذكاء الاصطناعي بيكتب الصح والغلط بنفس الترتيب ونفس الثقة.", "Don't judge the output by its look — AI writes right and wrong with the same polish and the same confidence."),
        idea: u("الشكل الاحترافي مش دليل على الصحة.", "A professional look is not proof of accuracy.")
      },
      {
        id: "confident", art: "l_confident", year: u("الحد ١", "Limit 1"), mark: u("٠٢", "02"), era: u("غلط بثقة", "Wrong, confidently"),
        title: u("ممكن يديك معلومة غلط وهو واثق جدًا", "It can give you wrong information with full confidence"),
        story: [u("المذكرة بتقول: «حسب القرار الوزاري رقم ١٢٧ لسنة ٢٠٢٤، لازم يتغيّر المورّد لو نسبة العيوب عدّت ٢٪». جملة دقيقة، فيها رقم وسنة ونسبة. لما دوّرتوا على القرار ده… ما لقيتوهوش. هو مش موجود أصلًا.",
          "The memo says: “Under ministerial decree no. 127 of 2024, the supplier must be changed if defects exceed 2%.” A precise sentence, with a number, a year and a percentage. When you search for that decree… you can't find it. It doesn't exist."),
        u("ده مش كذب مقصود. فاكر «جوّا الموديل»؟ الموديل بيختار الكلمة الأرجح بعد اللي قبلها، مش بيراجع الحقيقة. ونص قانوني بالشكل ده «أرجح» في مذكرة رسمية، فاتكتب. والثقة في الصياغة جاية من طريقة الكتابة، مش من التأكد.",
          "It isn't a deliberate lie. Remember “Inside the model”? The model picks the likeliest next word; it doesn't check the facts. A legal reference of that shape is “likely” in an official memo, so it was written. The confident wording comes from how it writes, not from any verification.")],
        answer: u("أي رقم أو اسم أو مرجع القرار معتمد عليه، اتأكد منه من مصدره الأصلي. لأن الموديل ممكن يألّف مرجع شكله رسمي تمامًا.", "Verify every figure, name or reference the decision rests on against its original source — the model can produce a reference that looks entirely official."),
        idea: u("ثقة الكلام مش مقياس لصحته.", "Confident wording is no measure of truth.")
      },
      {
        id: "misread", art: "l_misread", year: u("الحد ٢", "Limit 2"), mark: u("٠٣", "03"), era: u("فهم غلط", "Misunderstood"),
        title: u("لو الـ Context ناقص، ممكن يفهم السؤال غلط", "With missing Context, it can misread the question"),
        story: [u("الطلب كان: «قارن المورّد الحالي بالمورّد التاني». لكن عندكم مورّدين بدال، مش واحد. المقصود كان المورّد اللي جودته أعلى، والموديل اختار اللي سعره أقل، لأن ده كان مذكور أكتر في الملفات.",
          "The request was: “Compare the current supplier with the other supplier.” But you have two alternatives, not one. You meant the one with higher quality; the model picked the cheaper one, because it appeared more in the files."),
        u("المقارنة كلها اتبنت على اختيار غلط، ومكتوبة بشكل مقنع. وده نفس اللي شفناه في درس الـ Prompt والـ Context: أي معلومة ناقصة بيملاها بالاحتمال الأرجح عنده، مش بالحقيقة اللي في دماغك.",
          "The whole comparison was built on the wrong choice, and it reads convincingly. It's what we saw in the Prompt & Context lesson: any missing fact is filled with its likeliest guess, not with what you had in mind.")],
        answer: u("قبل الشغل الكبير، اطلب منه يكتب فهمه للمطلوب في سطرين. لأن الفهم الغلط بيبان في سطرين قبل ما يبان في تلات صفحات.", "Before big work, ask it to state its understanding of the task in two lines — a misunderstanding shows in two lines before it shows in three pages."),
        idea: u("اسأله فهم إيه، قبل ما تسأله عمل إيه.", "Ask what it understood before asking what it did.")
      },
      {
        id: "data", art: "l_data", year: u("الحد ٣", "Limit 3"), mark: u("٠٤", "04"), era: u("على قد البيانات", "Only as good as the data"),
        title: u("النتيجة على قد جودة البيانات والتعليمات", "The result is only as good as the data and instructions"),
        story: [u("المذكرة بتقول إن نسبة عيوب المورّد الجديد ٠٫٥٪ بس. الرقم صحيح حسابيًا. لكن الملف اللي اتحسب منه فيه شهرين بس من سنة كاملة، لأن باقي الشهور كانت في ملف تاني ما اترفعش.",
          "The memo says the new supplier's defect rate is only 0.5%. The number is arithmetically correct. But the file it came from holds just two months out of a full year — the other months were in a file that was never uploaded."),
        u("الموديل حسب صح على بيانات ناقصة، وما قالش إنها ناقصة لأن محدش سأله. ودي من أخطر الحالات: الحساب سليم والنتيجة مضلّلة. وشهرين ممكن يكونوا أحسن شهرين عند المورّد ده.",
          "The model calculated correctly on incomplete data, and didn't say it was incomplete because nobody asked. That is one of the most dangerous cases: sound arithmetic, misleading result. And two months may be that supplier's two best months.")],
        answer: u("اسأله دايمًا: «النتيجة دي مبنية على أنهي فترة وكام سجل؟». لأن الرقم الصح على بيانات ناقصة بيضلّل أكتر من الرقم الغلط.", "Always ask: “Which period and how many records is this based on?” — a correct number on incomplete data misleads more than a wrong one."),
        idea: u("حساب سليم على بيانات ناقصة = نتيجة مضلّلة.", "Sound arithmetic on partial data = a misleading result.")
      },
      {
        id: "company", art: "l_company", year: u("الحد ٤", "Limit 4"), mark: u("٠٥", "05"), era: u("مش عارف شركتك", "Doesn't know your company"),
        title: u("مش هيعرف بيانات شركتك إلا لو إديتهاله", "It won't know your company's data unless you give it"),
        story: [u("المذكرة بتقول: «نقدر ننهي العقد الحالي بإخطار قبلها بـ٣٠ يوم». ده المعتاد في عقود كتير، فالموديل كتبه. لكن عقدكم مع المورّد الحالي فيه ٩٠ يوم، وشرط جزائي لو الإنهاء حصل قبل نهاية السنة.",
          "The memo says: “We can end the current contract with 30 days' notice.” That's common in many contracts, so the model wrote it. But your contract with the current supplier says 90 days, with a penalty clause for termination before year end."),
        u("الموديل ما شافش العقد، فكتب «المعتاد». وده حد أساسي: معرفته عامة، وبيانات شركتك وعقودها وسياساتها مش جوّاه. لازم تتحط قدامه، أو يتربط بمصادرها بطريقة الشركة موافقة عليها.",
          "The model never saw the contract, so it wrote what is “usual”. That's a basic limit: its knowledge is general, and your company's data, contracts and policies aren't in it. They must be placed in front of it, or connected through a channel the company approves.")],
        answer: u("أي معلومة عن شركتك، خدها من ملفات شركتك، واطلب النص اللي اتاخدت منه. لأن «المعتاد» مش هو عقدك.", "Take any fact about your company from your company's files, with the text it came from — what is “usual” is not your contract."),
        idea: u("المعرفة العامة مش هي عقدك.", "General knowledge is not your contract.")
      },
      {
        id: "dated", art: "l_dated", year: u("الحد ٥", "Limit 5"), mark: u("٠٦", "06"), era: u("معلومات قديمة", "Out-of-date information"),
        title: u("معلوماته ممكن تكون قديمة أو ناقصة", "Its information may be old or incomplete"),
        story: [u("المذكرة بتقارن بأسعار الكرتون «الحالية» في السوق. بس الموديل اتدرّب على بيانات ليها تاريخ توقف، واللي حصل بعده مش في معرفته. والأسعار دي اتغيّرت مرتين من ساعتها.",
          "The memo compares with “current” market prices for cardboard. But the model was trained on data with a cutoff date, and what happened after it isn't in its knowledge. Those prices have changed twice since then."),
        u("بعض الأدوات بتدوّر على الإنترنت قبل ما تجاوب، وده بيقلّل المشكلة بس ما بيلغيهاش، لأن المصدر نفسه ممكن يكون قديم أو مش دقيق. والقاعدة واحدة: أي معلومة الزمن بيغيّرها، زي الأسعار والقوانين، محتاجة تاريخ ومصدر.",
          "Some tools search the web before answering, which reduces the problem without removing it, since the source itself may be old or inaccurate. The rule is the same: any information that changes over time, like prices and regulations, needs a date and a source.")],
        answer: u("في الأسعار والقوانين وأي معلومة بتتغيّر، اطلب التاريخ والمصدر، واتأكد بنفسك من الأحدث. لأن الموديل ما يعرفش إيه اللي حصل بعد تدريبه.", "For prices, regulations and anything that changes, ask for the date and the source, and confirm the latest yourself — the model doesn't know what happened after its training."),
        idea: u("كل معلومة بتتغيّر محتاجة تاريخ.", "Anything that changes needs a date.")
      },
      {
        id: "sensitive", art: "l_sensitive", year: u("الحد ٦", "Limit 6"), mark: u("٠٧", "07"), era: u("بيانات حساسة", "Sensitive data"),
        title: u("ما تدخلش بيانات حساسة من غير ضوابط واضحة", "Don't enter sensitive data without clear controls"),
        story: [u("علشان تكتب المقارنة، اترفعت أسعار العقد السرية وأسماء موظفين من فريق الاستلام، على حساب شخصي في أداة مجانية. الأداة اشتغلت كويس، لكن البيانات دي خرجت برّه أنظمة الشركة لجهة مفيش بينكم وبينها اتفاق.",
          "To write the comparison, the confidential contract prices and names of staff from the receiving team were uploaded to a personal account on a free tool. The tool worked well — but that data left the company's systems for a party you have no agreement with."),
        u("بعض الأدوات المجانية ممكن تستخدم المحادثات في تحسين الموديلات، حسب إعداداتها وشروطها. والصح إنك تستخدم الأدوات اللي شركتك موافقة عليها، وتشيل الأسماء والأرقام اللي مش لازمة، أو تكتب «المورّد أ» و«المورّد ب» بدل الأسماء الحقيقية.",
          "Some free tools may use conversations to improve models, depending on their settings and terms. The right way is to use the tools your company approves, remove names and figures you don't need, or write “supplier A” and “supplier B” instead of real names.")],
        answer: u("قبل ما ترفع أي ملف، اسأل: «لو الملف ده اتنشر، هيضر حد؟». لو الإجابة أيوه، استخدم أداة الشركة أو شيل البيانات الحساسة الأول.", "Before uploading any file, ask: “If this were published, would it harm anyone?” If yes, use the company's tool or remove the sensitive data first."),
        idea: u("البيانات اللي خرجت ما بترجعش.", "Data that has left doesn't come back.")
      },
      {
        id: "review", art: "l_review", year: u("الحد ٧", "Limit 7"), mark: u("٠٨", "08"), era: u("مراجعة بشرية", "Human review"),
        title: u("القرارات الحساسة محتاجة مراجعة بشرية", "Sensitive decisions need human review"),
        story: [u("تغيير المورّد مش قرار جودة بس. بيأثّر على خطوط الإنتاج لو الخامة الجديدة محتاجة ضبط للماكينات، وعلى المشتريات والمخزون، وعلى الشؤون القانونية بسبب العقد، وعلى المالية بسبب الشرط الجزائي.",
          "Changing the supplier isn't only a quality decision. It affects production lines if the new material needs machine adjustments, purchasing and stock, the legal team because of the contract, and finance because of the penalty clause."),
        u("الذكاء الاصطناعي ما يعرفش إن ماكينة التغليف رقم ٣ حساسة لسُمك الكرتون، لكن مشرف الخط عارف. علشان كده القرار اللي ليه أثر مالي أو قانوني أو على ناس، لازم يعدّي على الناس اللي هيتأثروا بيه قبل ما يتاخد.",
          "AI doesn't know that packaging machine 3 is sensitive to cardboard thickness — but the line supervisor does. So a decision with financial, legal or human impact must pass by the people it affects before it is taken.")],
        answer: u("حدّد مين هيتأثر بالقرار، وخلّي كل واحد يراجع الجزء اللي يخصه. لأن خبرة الناس في الموقع مش موجودة في أي ملف.", "Identify who the decision affects and have each review their part — the on-site experience of people isn't in any file."),
        idea: u("اللي هيتأثر بالقرار لازم يشوفه قبله.", "Those affected by a decision should see it first.")
      },
      {
        id: "owner", art: "l_owner", year: u("الحد ٨", "Limit 8"), mark: u("٠٩", "09"), era: u("المسؤولية", "Responsibility"),
        title: u("بيدعم القرار، لكن مش بيتحمّل مسؤوليته", "It supports the decision but doesn't own it"),
        story: [u("لو المذكرة اتبعتت زي ما هي، والمورّد اتغيّر، والإنتاج وقف أسبوع، محدش هيسأل الأداة. هيسألوا اللي كتب المذكرة وبعتها. وجملة «الذكاء الاصطناعي هو اللي قال كده» مش مبرر مقبول في أي شركة.",
          "If the memo went out as it is, the supplier changed and production stopped for a week, nobody would question the tool. They'd question whoever wrote and sent the memo. “The AI said so” is not an acceptable excuse in any company."),
        u("ده مش سبب إنك تبعد عن الأداة؛ ده سبب إنك تعرف دورك ودورها. هي بتجهّز وتحلل وتقترح بسرعة، وإنت بتراجع وتقرر وتمضي. وعلى قد ما المسؤولية عليك، على قد ما المراجعة لازم تكون منك.",
          "That isn't a reason to avoid the tool; it's a reason to know your role and its role. It prepares, analyses and suggests quickly; you review, decide and sign. As much as the responsibility is yours, so must the review be.")],
        answer: u("ما تبعتش حاجة باسمك إلا لو تقدر تشرح كل رقم فيها. لأن التوقيع بيقول إنك راجعت، مش إن الأداة كتبت.", "Never send anything under your name unless you can explain every figure in it — a signature says you reviewed it, not that a tool wrote it."),
        idea: u("الأداة بتجهّز… والتوقيع بتاعك.", "The tool prepares… the signature is yours.")
      },
      {
        id: "chain", art: "l_chain", year: u("الاستخدام الواعي", "Wise use"), mark: u("١٠", "10"), era: u("خمس خطوات", "Five steps"),
        title: u("الاستخدام الواعي: خمس خطوات بالترتيب", "Wise use: five steps, in order"),
        story: [u("الكتاب بيختم بسلسلة بسيطة: حدّد الهدف، وادّيه الـ Context، وراجع النتيجة، واتأكد من المصادر، وخد القرار. ولو طبّقناها على المذكرة: الهدف «قرار عن مورّد التغليف»، والـ Context فيه العقد والسنة كاملة وأي مورّد بالظبط.",
          "The book ends with a simple chain: define the goal, give the Context, review the result, verify the sources, make the decision. Applied to the memo: the goal is “a decision on the packaging supplier”, and the Context includes the contract, the full year and exactly which supplier."),
        u("وبعدين المراجعة: الأرقام على بيانات السنة، والفهم على الطلب. والتأكد من المصادر: القرار الوزاري، وأسعار السوق، وبند الإنهاء. وفي الآخر القرار، اللي بيتاخد بعد ما الناس المعنية تشوفه. كل خطوة بتقفل حد من الحدود التمانية.",
          "Then the review: figures against the full year's data, understanding against the request. Then the sources: the decree, the market prices, the termination clause. Finally the decision, taken after the people concerned have seen it. Each step closes off one of the eight limits.")],
        answer: u("ما تقفزش من «الهدف» لـ«القرار». لأن الخطوات اللي في النص هي اللي بتمسك الغلط.", "Don't jump from “goal” to “decision” — the steps in between are what catch the mistakes."),
        idea: u("كل خطوة في السلسلة بتقفل باب غلط.", "Each step in the chain closes a door to error.")
      },
      {
        id: "checks", art: "l_checks", year: u("التحقق", "Checking"), mark: u("١١", "11"), era: u("طرق عملية", "Practical checks"),
        title: u("خمس طرق سريعة تكشف بيها الغلط", "Five quick ways to catch mistakes"),
        story: [u("المراجعة مش معناها تعيد الشغل كله. فيه طرق سريعة: اطلب منه يفصل بين المعلومة المؤكدة واللي استنتجها أو رجّحها. واطلب يذكر الافتراضات اللي بنى عليها. واختار أهم تلات معلومات القرار معتمد عليها واتأكد منهم بنفسك.",
          "Reviewing doesn't mean redoing everything. There are quick methods: ask it to separate confirmed facts from what it inferred or guessed. Ask it to list the assumptions it relied on. Pick the three facts the decision rests on most and verify them yourself."),
        u("واسأله سؤال عكسي: «إيه اللي لو طلع صحيح، التوصية دي تبقى غلط؟». ولو القرار كبير، خلّي زميل يقرا المذكرة بعين جديدة. الطرق دي خدت ساعة في مذكرتنا، وكشفت المرجع الوهمي، والشهرين الناقصين، وبند الـ٩٠ يوم.",
          "And ask a reverse question: “What, if true, would make this recommendation wrong?” For a big decision, have a colleague read the memo with fresh eyes. In our memo these checks took an hour and caught the invented decree, the missing months and the 90-day clause.")],
        answer: u("قبل أي إرسال مهم، اطلب: «افصل المؤكد عن المستنتج، واذكر افتراضاتك». لأن ده بيوريك فين تراجع بالظبط.", "Before any important send, ask: “Separate confirmed facts from inferences and list your assumptions” — it shows you exactly where to check."),
        idea: u("التحقق مش بطء… ده تأمين.", "Checking isn't slowness… it's insurance.")
      },
      {
        id: "recap", art: "l_recap", year: u("الخلاصة", "Summary"), mark: u("١٢", "12"), era: u("معادلة الكتاب", "The book's equation"),
        title: u("أحسن نتيجة = إنسان بيفكّر + بيانات كويسة + ذكاء اصطناعي", "Best result = a thinking human + good data + AI"),
        story: [u("المذكرة اتبعتت يوم الأحد بدل الخميس، بعد ساعة مراجعة وتلات تصحيحات. والتوصية نفسها اتغيّرت: تغيير المورّد مع بداية السنة الجاية بدل دلوقتي، علشان الشرط الجزائي، وبعد تجربة على خط واحد.",
          "The memo went out on Sunday instead of Thursday, after an hour of review and three corrections. The recommendation itself changed: switch suppliers at the start of next year rather than now, because of the penalty clause, and after a trial on one line."),
        u("الذكاء الاصطناعي وفّر أيام من الشغل، والمراجعة منعت قرار كان ممكن يكلّف كتير. ودي معادلة الكتاب: إنسان بيفكّر، وبيانات كويسة، وذكاء اصطناعي. لو واحد منهم غاب، النتيجة بتضعف. وبكده نكون خلّصنا أساسيات الوحدة الأولى.",
          "AI saved days of work, and the review prevented a decision that could have cost a lot. That's the book's equation: a thinking human, good data and AI. Remove any one of them and the result weakens. And with that, we've completed the foundations of unit one.")],
        answer: u("استخدم الذكاء الاصطناعي في السرعة، واحتفظ لنفسك بالمراجعة والقرار. لأن ده بيجمع أحسن ما عند الاتنين.", "Use AI for speed and keep the review and the decision for yourself — that combines the best of both."),
        idea: u("هو بيسرّع… وإنت بتضمن.", "It speeds things up… you make sure.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.limitsStory]);
})(window.ACADEMY = window.ACADEMY || {});
