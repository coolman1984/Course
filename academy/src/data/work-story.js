/* What AI does at work — the story deck that opens lesson f3 (sixth in unit 0, right after "chat, memory and agents").
   One hero runs through every slide: a sales supervisor who spends a full day each month turning three branch files into a
   report (the lesson's own case), and the question «الكوم ده يبقى قرار إمتى؟». Each slide shows one of the book's six
   capabilities on that same pile, with the way to ask for it, and the chain collect → analyse → summarise → compare → suggest.
   Each slide gives one rule with its reason («القاعدة، وليه؟»). Figures are illustrative. Same slide schema as
   data/model-story.js; drawings are the k_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.workStory = {
    id: "work", lesson: "f3",
    kicker: u("الذكاء الاصطناعي في شغلك · الحكاية كاملة في ٧ دقايق", "AI at work · the whole story in 7 minutes"),
    title: u("من كوم ملفات لقرار: ست قدرات وسلسلة واحدة", "From a pile of files to a decision: six capabilities, one chain"),
    lead: u("عرفنا الموديل بيفكّر إزاي، ونكلّمه إزاي، وحدوده فين، ونختار له أنهي أداة. فاضل السؤال العملي: يعملّي إيه في شغلي؟ في الحكاية دي هنمشي مع مشرف مبيعات من كوم ملفات لقرار، ونشوف الست قدرات اللي في الكتاب واحدة واحدة، وإزاي تطلب كل واحدة صح.",
      "We know how the model thinks, how to talk to it, where its limits are and which tool to pick. One practical question is left: what can it do in my work? In this story we follow a sales supervisor from a pile of files to a decision, take the book's six capabilities one by one, and see how to ask for each one properly."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("الكوم ده يبقى قرار إمتى؟", "When does this pile become a decision?"),
    finalQuestion: u("أنهي مهمة في أسبوعك هتبدأ بيها؟", "Which task in your week will you start with?"),
    note: u("الأرقام والأمثلة توضيحية، والنتايج لازم تتراجع على البيانات الحقيقية قبل ما تتبعت.", "Figures and examples are illustrative; results must be checked against the real data before they are sent."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("الذكاء الاصطناعي في شغلك، في شرائح", "AI at work, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "pile", art: "k_pile", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("يوم كامل كل شهر", "A full day a month"),
        title: u("تلات ملفات، ويوم كامل، وفقرة عامة في الآخر", "Three files, a full day, and a vague paragraph at the end"),
        story: [u("أول كل شهر، مشرف المبيعات بيستلم تلات ملفات من تلات فروع. كل فرع مسمّي الأعمدة بطريقته، وفيه فرع بيكتب التاريخ بالشهر الأول وفرع باليوم الأول. بيقضي يوم كامل ينسخ ويلصق ويوحّد ويقرا الأرقام بعينه.",
          "At the start of every month the sales supervisor receives three files from three branches. Each branch names its columns its own way; one writes dates month-first, another day-first. He spends a full day copying, pasting, unifying and reading numbers by eye."),
        u("وفي الآخر بيكتب للمدير فقرة زي «المبيعات كويسة الشهر ده». المدير ما بياخدش منها قرار، لأنها ما بتقولش إيه اللي اتغيّر، ولا فين المشكلة، ولا يعمل إيه. طب الذكاء الاصطناعي ممكن يساعد في أنهي خطوة بالظبط؟",
          "And at the end he writes the manager a paragraph like “sales were good this month”. The manager can't decide anything from it: it doesn't say what changed, where the problem is, or what to do. So which step exactly can AI help with?")],
        answer: u("ابدأ من المهمة المتكررة اللي بتاكل وقتك، مش من الأداة. لأن المهمة هي اللي بتحدد القدرة اللي محتاجها.", "Start from the recurring task that eats your time, not from the tool — the task decides which capability you need."),
        idea: u("التقرير اللي ما بيطلّعش قرار… شغل ضايع.", "A report that leads to no decision is wasted work.")
      },
      {
        id: "six", art: "k_six", year: u("القدرات", "Capabilities"), mark: u("٠٢", "02"), era: u("ست مهارات", "Six skills"),
        title: u("ست قدرات تقدر تطلبها في شغلك", "Six capabilities you can ask for at work"),
        story: [u("الكتاب بيجمع اللي الذكاء الاصطناعي بيعمله في الشغل في ست قدرات: يحلل البيانات والملفات، ويلخّص ويستخرج القرارات والأرقام، ويدوّر جوّه معرفة الشركة، ويكتب ويعيد الصياغة، ويقارن ويراجع ويكشف التناقضات، ويدعم القرار بسيناريوهات وبدائل ومخاطر.",
          "The book groups what AI does at work into six capabilities: analyse data and files; summarise and extract decisions and figures; search the company's knowledge; write and rewrite; compare, review and spot contradictions; and support decisions with scenarios, options and risks."),
        u("القدرات دي مش أدوات منفصلة، دي طرق مختلفة تكلّم بيها نفس الموديل. والفرق بينها في الطلب نفسه: «حلّل» غير «لخّص» غير «قارن». وكل شريحة جاية هتوريك قدرة منهم على نفس كوم الملفات.",
          "These aren't separate tools; they are different ways of asking the same model. The difference is in the request itself: “analyse” is not “summarise” is not “compare”. Each coming slide shows one of them on the same pile of files.")],
        answer: u("سمّي القدرة اللي عايزها في أول الطلب: حلّل، لخّص، قارن. لأن الفعل الدقيق بيحدد نوع الشغل اللي الموديل هيعمله.", "Name the capability you want at the start of the request — analyse, summarise, compare — the precise verb sets the kind of work the model does."),
        idea: u("نفس الموديل، ست طرق تطلب بيها.", "One model, six ways to ask.")
      },
      {
        id: "collect", art: "k_collect", year: u("يجمع", "Collect"), mark: u("٠٣", "03"), era: u("أول حلقة", "The first link"),
        title: u("يجمع: اللي مش قدامه مش هيتحلل", "Collect: what isn't in front of it won't be analysed"),
        story: [u("أول خطوة إن الملفات التلاتة تبقى قدام الموديل في مكان واحد. والأهم إنك توصف الأعمدة: «عمود Date في فرع ١ هو نفسه تاريخ البيع في فرع ٢، والتاريخ في فرع ٣ يوم/شهر». من غير الوصف ده هيخمّن، وممكن يخمّن غلط.",
          "The first step is getting all three files in front of the model in one place. More importantly, describe the columns: “Date in branch 1 is the same as sale date in branch 2; branch 3 writes day/month.” Without that description it guesses, and it may guess wrong."),
        u("وافتكر الترابيزة: فرع رابع ما رفعتلوش ملف مش موجود بالنسبة له خالص. هيكتب تقرير «كل الفروع» وهو شايف تلاتة بس. علشان كده اطلب منه في الأول يقولك إيه اللي شايفه: كام ملف، وكام صف، وأنهي أعمدة.",
          "And remember the table: a fourth branch whose file you didn't upload doesn't exist for it at all. It will write an “all branches” report while seeing only three. So ask it first to tell you what it sees: how many files, how many rows, which columns.")],
        answer: u("قبل التحليل اسأله: «إنت شايف إيه؟». لأن أي ملف ناقص أو عمود مفهوم غلط هيبوّظ كل اللي بعده.", "Before analysing, ask “what do you see?” — a missing file or a misread column spoils everything after it."),
        idea: u("التحليل على قد اللي اتجمع.", "Analysis is only as good as what was collected.")
      },
      {
        id: "analyse", art: "k_analyse", year: u("يحلل", "Analyse"), mark: u("٠٤", "04"), era: u("نمط مستخبي", "A hidden pattern"),
        title: u("يحلل: يلاقي النمط اللي العين ما بتشوفهوش", "Analyse: find the pattern the eye misses"),
        story: [u("بعد ما الملفات اتجمعت، بتطلب: «حلّل الفروق بين الفروع والأيام، وطلّع أكبر تلات ملاحظات». فيلاقي حاجة ما كانتش باينة: المرتجعات في فرع ٣ بتتضاعف تلات مرات يوم الخميس، وأغلبها من صنف واحد.",
          "Once the files are together you ask: “Analyse the differences between branches and days and give me the three biggest findings.” It finds something that wasn't visible: returns at branch 3 triple on Thursdays, mostly for one product."),
        u("بس خلّي بالك: الموديل آلة توقّع كلام، مش آلة حاسبة. لو الأرقام كتير، اطلب منه يحسب بأداة الحساب أو بكود يشغّله، ويوريك الطريقة، بدل ما «يقدّر» الإجمالي من دماغه. وراجع رقم أو اتنين بنفسك.",
          "But careful: the model predicts words; it isn't a calculator. With many figures, ask it to compute with a calculation tool or code it runs, and to show the method — instead of “estimating” totals. And check one or two numbers yourself.")],
        answer: u("اطلب الحساب يتعمل بأداة أو كود، والطريقة تتكتب. لأن الرقم اللي اتحسب تقدر تراجعه، والرقم اللي اتخمّن لأ.", "Ask for calculations to be done with a tool or code, with the method shown — a computed number can be checked; a guessed one can't."),
        idea: u("التحليل الكويس بيلاقي «فين» و«إمتى»، مش «كويس» و«وحش».", "Good analysis finds “where” and “when”, not “good” and “bad”.")
      },
      {
        id: "summarise", art: "k_summarise", year: u("يلخّص", "Summarise"), mark: u("٠٥", "05"), era: u("من ٤٠ صفحة لصفحة", "40 pages to one"),
        title: u("يلخّص ويستخرج: القرارات والأرقام والمسؤولين", "Summarise and extract: decisions, figures, owners"),
        story: [u("مع الملفات فيه تقرير الإدارة الشهري، ٤٠ صفحة. بدل ما تقراه كله، بتطلب: «استخرج القرارات اللي اتاخدت، والأرقام المهمة، ومين مسؤول عن إيه، في جدول، ومع كل بند رقم الصفحة».",
          "Alongside the files there's the monthly management report, 40 pages. Instead of reading it all you ask: “Extract the decisions taken, the key figures and who owns what, as a table, with the page number for each item.”"),
        u("رقم الصفحة ده مش رفاهية: هو اللي بيخلّيك تتأكد في ثانية إن البند موجود فعلًا ومش متألّف. والتلخيص الكويس بيبقى ليه شكل ثابت إنت محدده: جدول، أو خمس سطور، أو «قرار - رقم - مسؤول».",
          "That page number isn't a luxury: it lets you confirm in a second that the item really exists and wasn't made up. A good summary has a fixed shape you define: a table, five lines, or “decision – figure – owner”.")],
        answer: u("اطلب مع كل معلومة مستخرجة مكانها في الأصل. لأن ده بيحوّل الثقة لحاجة تقدر تتحقق منها.", "Ask for the source location of every extracted fact — it turns trust into something you can verify."),
        idea: u("ملخص من غير مصدر… رأي.", "A summary without sources is an opinion.")
      },
      {
        id: "search", art: "k_search", year: u("يدوّر", "Search"), mark: u("٠٦", "06"), era: u("جوّه معرفة الشركة", "Inside company knowledge"),
        title: u("يدوّر في معرفة الشركة ويجاوب من المصدر", "Search company knowledge and answer from the source"),
        story: [u("المدير سأل: «فرع ٣ يقدر يعمل خصم ١٥٪ على الصنف ده علشان يقلّل المرتجعات؟». الإجابة مش في الملفات، ومش في معرفة الموديل العامة. هي في سياسة الخصومات بتاعة شركتك.",
          "The manager asks: “Can branch 3 give 15% off this product to cut returns?” The answer isn't in the files, nor in the model's general knowledge. It's in your company's discount policy."),
        u("لو السياسة مرفوعة في ملفات المشروع (فاكر الذاكرة؟)، الموديل بيدوّر فيها، ويطلّع البند ٤٫٢: «مدير الفرع يقدر يخصم لحد ١٠٪، وأكتر من كده محتاج موافقة المدير الإقليمي»، ويجاوب منه. ولو مش مرفوعة، هيجاوب من «المعتاد في الشركات»، وده ممكن يبقى غلط عندك.",
          "If the policy is in the project files (remember memory?), the model searches it, finds clause 4.2 — “a branch manager may discount up to 10%; beyond that needs the regional manager's approval” — and answers from it. If it isn't there, it answers from “what companies usually do”, which may be wrong for you.")],
        answer: u("في أسئلة السياسات والإجراءات، اطلب الإجابة من ملفاتك بس، ومعاها نص البند. لأن المعرفة العامة مش هي قواعد شركتك.", "For policy and procedure questions, ask for answers from your files only, quoting the clause — general knowledge isn't your company's rules."),
        idea: u("سؤال عن شركتك = إجابة من ملفات شركتك.", "A question about your company = an answer from its files.")
      },
      {
        id: "write", art: "k_write", year: u("يكتب", "Write"), mark: u("٠٧", "07"), era: u("نفس الكلام لتلات جماهير", "Same content, three audiences"),
        title: u("يكتب ويعيد الصياغة: نفس النتيجة بتلات أشكال", "Write and rewrite: the same result in three shapes"),
        story: [u("دلوقتي عندك النتيجة: فرع ٣، مرتجعات الخميس، صنف واحد، وحد الخصم ١٠٪. لكن نفس المحتوى محتاج يوصل لتلات ناس: المدير عايز ٣ سطور وقرار مطلوب منه، ومدير الفرع عايز خطوات عملية، والفريق عايز رسالة واضحة من غير لوم.",
          "Now you have the result: branch 3, Thursday returns, one product, a 10% discount limit. But the same content must reach three people: the manager wants 3 lines and the decision needed from him; the branch manager wants practical steps; the team wants a clear message without blame."),
        u("بدل ما تكتب تلات مرات، بتدّيه المحتوى مرة واحدة وتطلب التلات صيغ، وتحدد لكل واحدة الجمهور والطول والنبرة. وهو بيعيد الصياغة من غير ما يغيّر الأرقام، لو قلتله صراحة «ما تغيّرش أي رقم».",
          "Instead of writing three times, you give it the content once and ask for three versions, setting the audience, length and tone for each. It rewrites without changing the figures — if you say plainly “don't change any number”.")],
        answer: u("حدد لكل نسخة الجمهور والطول والنبرة، وقوله ما يغيّرش الأرقام. لأن إعادة الصياغة ممكن تغيّر المعنى لو ما حطّيتش حدود.", "Set the audience, length and tone for each version and tell it not to change the figures — rewording can shift meaning without limits."),
        idea: u("المحتوى واحد، والشكل على قد اللي هيقرا.", "One content; the shape fits the reader.")
      },
      {
        id: "compare", art: "k_compare", year: u("يقارن", "Compare"), mark: u("٠٨", "08"), era: u("يمسك اللي اتغيّر", "Catch what changed"),
        title: u("يقارن ويراجع: يمسك اللي اتغيّر واللي ناقص", "Compare and review: catch what changed and what's missing"),
        story: [u("الإدارة بعتت نسخة معدّلة من خطة الربع. بدل ما تقرا النسختين جنب بعض، بتطلب: «قارن النسختين: إيه اللي اتغيّر، وإيه اللي اتشال، وإيه الجديد، وفين التناقض». فيطلع إن هدف فرع ٣ اتغيّر، وبند التدريب اتشال، وفيه رقمين مش متطابقين بين الجدول والملخص.",
          "Management sent a revised quarterly plan. Instead of reading both side by side you ask: “Compare the two versions: what changed, what was removed, what's new, and where the contradictions are.” It turns out branch 3's target changed, the training item was dropped, and two figures don't match between the table and the summary."),
        u("المراجعة دي من أقوى استخدامات الذكاء الاصطناعي، لأنها بتمسك الحاجات اللي العين بتعدّي عليها لما تبقى تعبان. بس اطلب منه يوريك المكان في كل نسخة، علشان تتأكد إن الفرق حقيقي.",
          "This kind of review is one of AI's strongest uses, because it catches what a tired eye passes over. But ask it to show the location in each version so you can confirm the difference is real.")],
        answer: u("اطلب الفروق في جدول: البند، والنسخة الأولى، والتانية، ونوع التغيير. لأن الجدول بيخلّي كل فرق قدامك تقدر تراجعه.", "Ask for differences as a table — item, version one, version two, kind of change — so every difference is in front of you to check."),
        idea: u("المقارنة بتمسك اللي العين التعبانة بتفوّته.", "Comparison catches what a tired eye misses.")
      },
      {
        id: "suggest", art: "k_suggest", year: u("يقترح", "Suggest"), mark: u("٠٩", "09"), era: u("سيناريوهات وبدائل", "Scenarios and options"),
        title: u("يدعم القرار: تلات بدائل، وكل واحد بمخاطره", "Support the decision: three options, each with its risks"),
        story: [u("دلوقتي بس تقدر تطلب: «اقترح تلات حلول لمرتجعات فرع ٣، ومع كل حل التكلفة والمخاطرة وإزاي نقيس نجاحه». فيقترح مثلًا: فحص الشحنة اللي بتوصل الأربع، أو تدريب البيّاعين على الصنف، أو خصم ١٠٪ في حدود السياسة.",
          "Only now can you ask: “Suggest three solutions for branch 3's returns, each with its cost, its risk and how we measure success.” It may suggest: inspecting the Wednesday delivery, training staff on the product, or a 10% discount within policy."),
        u("لاحظ إن الاقتراح جه في الآخر، بعد ما جمع وحلل ولخّص وقارن. لو كنت سألت «أعمل إيه في المبيعات؟» من الأول، كان هيديك نصايح عامة تنفع أي شركة. وفي كل الأحوال القرار بتاعك إنت، لأنك اللي هتتحاسب عليه.",
          "Notice the suggestion came last, after collecting, analysing, summarising and comparing. Had you asked “what should I do about sales?” at the start, you'd have got generic advice that fits any company. And either way, the decision is yours — you are the one accountable for it.")],
        answer: u("اطلب بدائل مش إجابة واحدة، ومع كل بديل مخاطرته وطريقة قياسه. لأن البدائل بتخلّيك إنت اللي بتقرر، مش هو.", "Ask for options, not one answer, each with its risk and how to measure it — options keep the decision with you."),
        idea: u("هو بيقترح… وإنت اللي بتقرر.", "It suggests… you decide.")
      },
      {
        id: "chain", art: "k_chain", year: u("السلسلة", "The chain"), mark: u("١٠", "10"), era: u("الترتيب مهم", "Order matters"),
        title: u("يجمع ← يحلل ← يلخّص ← يقارن ← يقترح", "Collect → analyse → summarise → compare → suggest"),
        story: [u("لو بصّيت على الحكاية من فوق، هتلاقي سلسلة الكتاب: يجمع، وبعدين يحلل، وبعدين يلخّص، وبعدين يقارن، وبعدين يقترح. ما ينفعش يقترح قبل ما يقارن، ولا يقارن قبل ما يحلل، ولا يحلل حاجة ما اتجمعتش.",
          "Look at the story from above and you'll see the book's chain: collect, then analyse, then summarise, then compare, then suggest. It can't suggest before comparing, compare before analysing, or analyse what wasn't collected."),
        u("وكل حلقة بتاخد جودتها من اللي قبلها. ملف ناقص في الأول بيطلّع تحليل ناقص، وتحليل غلط بيطلّع اقتراح غلط مكتوب بثقة. علشان كده بنمشي خطوة خطوة، ونراجع بعد كل خطوة، بدل طلب واحد كبير «اعمل كل حاجة».",
          "And each link takes its quality from the one before. A missing file at the start yields a partial analysis; a wrong analysis yields a wrong suggestion written with confidence. That's why we go step by step and check after each step, instead of one big “do everything” request.")],
        answer: u("قسّم الشغل على خطوات السلسلة وراجع بعد كل خطوة. لأن الغلط اللي يتمسك بدري أرخص بكتير من اللي يتمسك في التقرير.", "Split the work along the chain and check after each step — a mistake caught early is far cheaper than one caught in the report."),
        idea: u("السلسلة على قد أضعف حلقة فيها.", "A chain is only as strong as its weakest link.")
      },
      {
        id: "garbage", art: "k_garbage", year: u("التحذير", "Warning"), mark: u("١١", "11"), era: u("شكله مظبوط", "Looks right"),
        title: u("بيانات بايظة = نتيجة شكلها مظبوط ومضمونها غلط", "Broken data = a result that looks right and is wrong"),
        story: [u("في ملف فرع ٢ صف متكرر مرتين، وفاتورة مكتوبة ١٠٠٠٠٠ بدل ١٠٠٠٠. الموديل مش هيقولك «البيانات دي شكلها غريب» إلا لو طلبت منه. هيحلل اللي قدامه بأمانة، ويطلّع رسم بياني نضيف وتقرير مرتب… وفرع ٢ طالع الأول بفرق ضخم.",
          "Branch 2's file has a row duplicated twice and an invoice written as 100000 instead of 10000. The model won't say “this data looks odd” unless you ask. It analyses what's in front of it faithfully and produces a clean chart and a tidy report… with branch 2 first by a huge margin."),
        u("ودي أخطر نتيجة: لأنها شكلها احترافي جدًا، محدش بيشك فيها. الحل بسيط: اطلب منه يفحص البيانات قبل التحليل (المتكرر، والقيم الشاذة، والخانات الفاضية)، وراجع بنفسك تلات أرقام من الملف الأصلي قبل ما التقرير يخرج.",
          "That's the most dangerous result: because it looks so professional, nobody doubts it. The fix is simple: ask it to check the data before analysing (duplicates, outliers, empty cells), and check three figures yourself against the original file before the report goes out.")],
        answer: u("اطلب فحص جودة البيانات قبل أي تحليل، وراجع تلات أرقام بإيدك. لأن الشكل الاحترافي مش دليل إن الرقم صح.", "Ask for a data-quality check before any analysis and verify three figures by hand — a professional look is no proof a number is right."),
        idea: u("الرسم النضيف مش معناه رقم صح.", "A clean chart doesn't mean a correct number.")
      },
      {
        id: "recap", art: "k_recap", year: u("الخلاصة", "Summary"), mark: u("١٢", "12"), era: u("الحكاية في سطر", "The story in one line"),
        title: u("الخلاصة: من يوم ملفات لساعة قرار", "In short: from a day of files to an hour of decision"),
        story: [u("نرجع لمشرف المبيعات. بدل يوم كامل وفقرة عامة، بقى عنده في حوالي ساعة مسودة فيها: إيه اللي اتغيّر، وفين المشكلة بالظبط، والسياسة بتقول إيه، وتلات بدائل بمخاطرها. وهو بيراجع الأرقام وبيقرر.",
          "Back to the sales supervisor. Instead of a full day and a vague paragraph, in about an hour he has a draft with what changed, exactly where the problem is, what the policy says, and three options with their risks. He checks the figures and decides."),
        u("والقدرات الست مش سحر: كل واحدة طلب واضح بتكتبه إنت، على بيانات إنت جامعها، في ترابيزة إنت بتنظّمها. ده كل اللي اتعلمناه في الوحدة دي مع بعض. وفي الدرس الجاي هنشوف حدود الذكاء الاصطناعي، وإمتى ما نعتمدش عليه.",
          "And the six capabilities aren't magic: each is a clear request you write, on data you collected, on a table you organise. That's everything this unit taught, put together. In the next lesson we'll look at AI's limits, and when not to rely on it.")],
        answer: u("ابدأ بمهمة واحدة صغيرة ومتكررة، وطبّق عليها السلسلة، وقيس الوقت قبل وبعد. لأن نجاح صغير ومقاس بيقنع أكتر من فكرة كبيرة.", "Start with one small recurring task, apply the chain, and measure the time before and after — a small measured win convinces more than a big idea."),
        idea: u("الذكاء الاصطناعي بيجهّز… وإنت اللي بتقرر.", "AI prepares… you decide.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.workStory]);
})(window.ACADEMY = window.ACADEMY || {});
