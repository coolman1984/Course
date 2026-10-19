/* Your first automation — the story deck that opens lesson f8, the closing lesson of unit 0 (the end of lecture one).
   One hero runs through every slide: the sales supervisor from lesson 6, with the three Excel jobs trainees really repeat
   (stacking weekly files, enriching a raw sheet with lookups, a report built from two workbooks), and the question
   «إمتى الشغل ده يشتغل لوحده؟». The deck climbs the ladder of Excel automation — by hand, formulas and pivots, Power Query,
   macros, a script that drives Excel from outside (COM) — then the recipe for a prompt that builds a safe tool, the three
   jobs automated, and a cliffhanger into unit 2: the same three jobs in a TV factory, and getting the code onto the laptop from ChatGPT or Gemini Enterprise.
   Each slide gives one rule with its reason («القاعدة، وليه؟»). Figures are illustrative. Same slide schema as
   data/model-story.js; drawings are the x_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.autoStory = {
    id: "auto", lesson: "f8",
    kicker: u("أول أتمتة في حياتك · الحكاية كاملة في ٨ دقايق", "Your first automation · the whole story in 8 minutes"),
    title: u("أول أتمتة في حياتك: الشغل اللي بيتكرر يشتغل لوحده", "Your first automation: repeated work that runs by itself"),
    lead: u("في المحاضرة دي فهمنا الذكاء الاصطناعي، وعرفنا نكلّمه، وعرفنا حدوده. فاضل أهم خطوة: إنه يشتغل معانا على ملفاتنا الحقيقية. في الحكاية دي هنمشي مع مشرف المبيعات تاني، وهنشوف طرق أتمتة إكسل من الأبسط للأقوى، وإزاي تبني أول أداة ليك بـ Prompt واحد.",
      "In this lecture we understood AI, learned to talk to it and learned its limits. One step is left, the most important: getting it to work with us on our real files. In this story we follow the sales supervisor again, climb the ways of automating Excel from simplest to strongest, and see how to build your first tool with a single Prompt."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إمتى الشغل ده يشتغل لوحده؟", "When will this work run by itself?"),
    finalQuestion: u("طب نبني أدوات إكسل التلاتة خطوة بخطوة إزاي، أيًّا كان النموذج اللي في إيدك؟", "So how do we build the three Excel tools step by step, whatever model you have?"),
    note: u("الأرقام والأوقات توضيحية. جرّب أي أداة على نسخة من ملفاتك الأول، وراجع سياسة شركتك قبل ما ترفع أي بيانات.", "Figures and timings are illustrative. Try any tool on a copy of your files first, and check your company's policy before uploading any data."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("أول أتمتة في حياتك، في شرائح", "Your first automation, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "monday", art: "x_monday", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("تلات مهام بتتكرر", "Three repeated jobs"),
        title: u("تلات مهام بتتكرر، وست ساعات كل شهر", "Three repeated jobs, six hours every month"),
        story: [u("مشرف المبيعات اللي قابلناه في الدرس السادس عنده تلات مهام ثابتة. الأولى: يحط ملفات الأسابيع تحت بعض في جدول واحد كبير، ويعمل عليه جدول محوري. التانية: يضيف للجدول الكبير أعمدة من شيتات صغيرة فيها بيانات الأصناف والفروع، بالبحث والربط بين الجداول.",
          "The sales supervisor we met in lesson six has three fixed jobs. First: stack the weekly files under each other into one big table and build a pivot table on it. Second: add columns to that big table from small sheets holding product and branch data, by looking values up across tables."),
        u("والتالتة: يعمل تقرير من ملفين مختلفين، بيجمع فيه أرقام من هنا وهنا بمعادلات. المهام التلاتة بتاخد حوالي ست ساعات كل شهر، بنفس الخطوات بالظبط، وكل مرة فيه احتمال غلطة نسخ صغيرة ما حدش يلاحظها.",
          "And third: build a report from two different workbooks, pulling figures from each with formulas. The three jobs take about six hours a month, with exactly the same steps, and every time there's a chance of a small copying mistake nobody notices.")],
        answer: u("ابدأ بالمهمة اللي بتتكرر بنفس الخطوات وبتاخد وقت. لأنها أسهل مهمة تتأتمت، وأول واحدة هتحس بفرقها.", "Start with the job that repeats with the same steps and takes time — it is the easiest to automate and the first whose difference you'll feel."),
        idea: u("الشغل اللي بيتكرر بنفس الخطوات… مش لازم يفضل بإيدك.", "Work that repeats the same steps doesn't need to stay in your hands.")
      },
      {
        id: "describe", art: "x_describe", year: u("الفكرة", "The idea"), mark: u("٠٢", "02"), era: u("وصف مش برمجة", "Describing, not coding"),
        title: u("الأتمتة: توصف الخطوات مرة، والجهاز يعيدها كل مرة", "Automation: describe the steps once, the machine repeats them every time"),
        story: [u("الأتمتة مش سحر ومش برمجة معقدة. هي إنك تكتب خطواتك مرة واحدة بدقة، والجهاز يعيدها بالظبط كل مرة، من غير تعب ولا سهو. والكتاب بيقولها صراحة: المهارة الجديدة مش إنك تكتب الكود، المهارة إنك توصف العملية بدقة.",
          "Automation isn't magic or complex programming. It is writing your steps down precisely once, so the machine repeats them exactly every time, without fatigue or slips. The book says it plainly: the new skill isn't writing code, it's describing the process precisely."),
        u("يعني: أنهي ملفات، وأنهي شيتات، وأنهي أعمدة، وإيه الخطوات اللي بتعملها بإيدك، وإيه الشكل اللي عايز النتيجة تطلع بيه. لو تقدر تشرح المهمة لموظف جديد في ورقة، يبقى تقدر تأتمتها. والذكاء الاصطناعي هو اللي هيحوّل الورقة دي لكود.",
          "That means: which files, which sheets, which columns, what steps you do by hand, and what shape the result should take. If you can explain the job to a new colleague on one page, you can automate it — and AI turns that page into code.")],
        answer: u("قبل أي أداة، اكتب الخطوات زي ما بتشرحها لموظف جديد. لأن الوصف الدقيق هو نص الشغل كله.", "Before any tool, write the steps as you'd explain them to a new colleague — a precise description is half the work."),
        idea: u("لو تقدر تشرحها في ورقة… تقدر تأتمتها.", "If you can explain it on a page, you can automate it.")
      },
      {
        id: "ladder", art: "x_ladder", year: u("الطرق", "The ways"), mark: u("٠٣", "03"), era: u("من الأبسط للأقوى", "Simplest to strongest"),
        title: u("خمس طرق لأتمتة إكسل، من الأبسط للأقوى", "Five ways to automate Excel, from simplest to strongest"),
        story: [u("فيه سلّم من خمس درجات. الأولى: الشغل بالإيد، ودي نقطة البداية. التانية: المعادلات والجداول المحورية. التالتة: أداة جلب البيانات وتحويلها اللي جوّه إكسل نفسه (Power Query). الرابعة: الماكرو، كود صغير جوّه الملف بيعيد خطواتك.",
          "There is a ladder of five rungs. First: doing it by hand — the starting point. Second: formulas and pivot tables. Third: the data import and transform tool built into Excel itself (Power Query). Fourth: macros, small code inside the workbook that repeats your steps."),
        u("والخامسة: برنامج صغير من برّه إكسل، بيفتح الملفات ويشتغل عليها وكإنه إيدك بالظبط، بس أسرع ومن غير غلط. كل درجة بتوفّر أكتر من اللي قبلها، ومحتاجة وصف أدق. وكلهم مسموحين على أجهزة الشركة.",
          "And fifth: a small program outside Excel that opens the files and works on them exactly as your hands would, only faster and without slips. Each rung saves more than the one below and needs a more precise description. All of them are allowed on company laptops.")],
        answer: u("اختار أبسط درجة تحل مشكلتك، واطلع لما تحتاج. لأن الدرجة الأعلى أقوى، بس محتاجة وصف أدق وصيانة أكتر.", "Pick the lowest rung that solves your problem and climb when you need to — higher rungs are stronger but need a sharper description and more upkeep."),
        idea: u("مش لازم تبدأ من فوق… لازم تبدأ.", "You don't have to start at the top — you have to start.")
      },
      {
        id: "formulas", art: "x_formulas", year: u("الدرجة ٢", "Rung 2"), mark: u("٠٤", "04"), era: u("المعادلات والجدول المحوري", "Formulas and pivots"),
        title: u("المعادلات والجدول المحوري: قوية، بس بتتعمل من الأول كل شهر", "Formulas and pivots: powerful, but rebuilt every month"),
        story: [u("المعادلات زي البحث والربط بين الجداول بتجيب اسم الصنف وسعره من الشيت الصغير للجدول الكبير، والجدول المحوري بيلخّص كل ده في دقيقة. والذكاء الاصطناعي ممتاز هنا: توصف الأعمدة والنتيجة، يكتبلك المعادلة ويشرحها.",
          "Lookup formulas bring each product's name and price from the small sheet into the big table, and a pivot table summarises it all in a minute. AI is excellent here: describe the columns and the result, and it writes the formula and explains it."),
        u("بس المشكلة إن الخطوات دي بتتعمل بإيدك من الأول كل شهر: تنسخ، وتسحب المعادلة لآخر صف، وتحدّث نطاق الجدول المحوري. ومع عشرات الآلاف من الصفوف، الملف بيتقل، وأي صف جديد ما دخلش في النطاق بيضيع من غير ما تاخد بالك.",
          "The catch: these steps are redone by hand every month — copy, drag the formula to the last row, update the pivot's range. With tens of thousands of rows the workbook slows down, and a new row left outside the range is lost without you noticing.")],
        answer: u("استخدم المعادلات للتحليل مرة واحدة، مش للشغل اللي بيتكرر بنفس الخطوات. لأن التكرار بالإيد هو اللي بيجيب الغلط.", "Use formulas for one-off analysis, not for work that repeats the same steps — repetition by hand is what breeds mistakes."),
        idea: u("المعادلة بتحسب لوحدها… بس إنت لسه اللي بتجهّزها كل مرة.", "A formula computes by itself… but you still set it up every time.")
      },
      {
        id: "query", art: "x_query", year: u("الدرجة ٣", "Rung 3"), mark: u("٠٥", "05"), era: u("جوّه إكسل نفسه", "Inside Excel itself"),
        title: u("أداة جلب البيانات وتحويلها: تسجّل الخطوات وتحدّث بزرار", "Power Query: record the steps, refresh with one button"),
        story: [u("جوّه إكسل أداة اسمها Power Query، موجودة في تبويب «البيانات». بتقولها: «هات كل الملفات اللي في الفولدر ده وحطها تحت بعض»، أو «اربط الجدول ده بالجدول ده على كود الصنف». وهي بتحفظ الخطوات دي.",
          "Inside Excel there is a tool called Power Query, on the Data tab. You tell it: “take every file in this folder and stack them”, or “join this table to that one on the product code”. And it saves those steps."),
        u("الشهر الجاي، تحط الملفات الجديدة في الفولدر وتدوس «تحديث»، فالخطوات كلها تتعاد لوحدها. دي أسهل أتمتة لأول مهمتين عند المشرف، ومن غير ولا سطر كود. بس مع الملفات الضخمة جدًا بتبقى بطيئة، ومنطقها مستخبي جوّه الملف.",
          "Next month you drop the new files in the folder and press “Refresh”, and every step reruns by itself. It is the easiest automation for the supervisor's first two jobs, without a line of code. But with very large files it gets slow, and its logic is hidden inside the workbook.")],
        answer: u("لو المهمة «جمّع ملفات» أو «اربط جداول» جوّه إكسل، جرّب Power Query الأول. لأنها مدمجة ومفيهاش كود تصونه.", "If the job is “combine files” or “join tables” inside Excel, try Power Query first — it's built in and has no code to maintain."),
        idea: u("الخطوات اتسجّلت مرة… والتحديث بزرار.", "Steps recorded once… refreshed with one button.")
      },
      {
        id: "macro", art: "x_macro", year: u("الدرجة ٤", "Rung 4"), mark: u("٠٦", "06"), era: u("الماكرو", "Macros"),
        title: u("الماكرو: كود صغير جوّه الملف بيعيد خطواتك", "Macros: small code inside the workbook that repeats your steps"),
        story: [u("الماكرو هو كود مكتوب بلغة VBA جوّه ملف إكسل. ممكن تسجّله: تدوس «تسجيل»، وتعمل خطواتك بإيدك، وإكسل يحوّلها لكود. أو توصف المهمة للذكاء الاصطناعي ويكتبهولك كامل، ومعاه زرار تدوس عليه.",
          "A macro is code written in VBA inside an Excel workbook. You can record it: press “Record”, do your steps by hand, and Excel turns them into code. Or you describe the job to AI and it writes the whole thing for you, with a button to press."),
        u("الماكرو بيقدر يعمل أي حاجة إنت بتعملها في إكسل، وأسرع بكتير. بس خلّي بالك من حاجتين: الملف لازم يتحفظ بصيغة بتسمح بالماكرو، واللي الماكرو بيعمله ما بيتلغيش بـ «تراجع». علشان كده لازم يشتغل على نسخة، مش على الملف الأصلي.",
          "A macro can do anything you do in Excel, much faster. But mind two things: the workbook must be saved in a macro-enabled format, and what a macro does can't be undone with “Undo”. So it must work on a copy, never on the original.")],
        answer: u("أي ماكرو يشتغل على نسخة، ويكتب في آخره هو عمل إيه. لأن اللي بيعمله ما بيترجعش بـ «تراجع».", "Any macro works on a copy and reports at the end what it did — what it does can't be undone."),
        idea: u("أسرع من إيدك… وما بيتراجعش.", "Faster than your hands… and it can't be undone.")
      },
      {
        id: "com", art: "x_com", year: u("الدرجة ٥", "Rung 5"), mark: u("٠٧", "07"), era: u("من برّه إكسل", "From outside Excel"),
        title: u("برنامج من برّه إكسل بيشغّله وكإنه إيدك", "A program outside Excel that drives it as your hands would"),
        story: [u("إكسل نفسه بيقبل أوامر من برامج تانية على نفس الجهاز، والطريقة دي اسمها COM. يعني ممكن برنامج صغير بأوامر ويندوز (PowerShell) يفتح إكسل في الخلفية، ويفتح الملفات، وينسخ ويربط ويحسب، ويحفظ النتيجة، ويقفل إكسل. كل ده من غير ما تلمس الماوس.",
          "Excel itself accepts commands from other programs on the same computer; this mechanism is called COM. So a small Windows command script (PowerShell) can open Excel in the background, open the files, copy, join and calculate, save the result and close Excel — all without touching the mouse."),
        u("وده بيشتغل على لابتوب الشركة من غير ما تنزّل أي حاجة، لأن PowerShell وإكسل موجودين أصلًا. والميزة الكبيرة: البرنامج برّه الملفات، فيقدر يلف على فولدر كامل، وما يلمسش الأصل، ويكتب سجل بكل اللي عمله، ويوقف برسالة واضحة لو حاجة مش زي المتوقع.",
          "It works on a company laptop without installing anything, because PowerShell and Excel are already there. The big advantage: the program lives outside the files, so it can go through a whole folder, leave the originals untouched, write a log of everything it did, and stop with a clear message if something isn't as expected.")],
        answer: u("للمهام اللي فيها ملفات كتير أو خطوات كتير، اطلب أداة من برّه إكسل بدل ماكرو جوّه ملف. لأنها بتشتغل على أي عدد ملفات وتحمي الأصل.", "For jobs with many files or many steps, ask for a tool outside Excel rather than a macro inside a workbook — it handles any number of files and protects the originals."),
        idea: u("البرنامج بيشغّل إكسل… وإنت متفرّغ للشغل الأهم.", "The program runs Excel… while you focus on what matters.")
      },
      {
        id: "recipe", art: "x_recipe", year: u("الوصفة", "The recipe"), mark: u("٠٨", "08"), era: u("Prompt يبني أداة", "A Prompt that builds a tool"),
        title: u("وصفة الـ Prompt اللي بيبني أداة آمنة", "The recipe for a Prompt that builds a safe tool"),
        story: [u("الـ Prompt الكويس لبناء أداة فيه خمس حاجات من الكتاب: المشكلة ووقتها، والمدخلات بشكلها الحقيقي (أسماء الملفات والشيتات والأعمدة)، والقواعد بكل استثناءاتها، وشكل النتيجة بالظبط، واختبارات تعرف منها إن النتيجة صح.",
          "A good Prompt for building a tool has the book's five parts: the problem and its time cost, the inputs as they really are (file, sheet and column names), the rules with every exception, the exact shape of the result, and tests that tell you the result is right."),
        u("ومعاهم أربع قواعد أمان: ما تلمسش الملف الأصلي، واكتب سجل تشغيل، ووقّف برسالة واضحة لو الأعمدة مش زي المتوقع، واقفل إكسل كويس حتى لو حصل خطأ. وأهم سطر في الـ Prompt: «اسألني عن كل اللي ناقصك قبل ما تكتب أي كود».",
          "Plus four safety rules: never touch the original file, write a run log, stop with a clear message if the columns aren't as expected, and close Excel properly even when an error occurs. And the most important line in the Prompt: “Ask me about anything you're missing before writing any code.”")],
        answer: u("خلّي النموذج يسألك الأول. لأن كل سؤال بيسأله دلوقتي هو غلطة مش هتلاقيها في الأداة بعدين.", "Let the model ask you first — every question it asks now is a mistake you won't find in the tool later."),
        idea: u("أداة آمنة = وصف دقيق + أربع قواعد + أسئلة قبل الكود.", "A safe tool = a precise description + four rules + questions before code.")
      },
      {
        id: "stack", art: "x_stack", year: u("المهمة ١", "Job 1"), mark: u("٠٩", "09"), era: u("ملفات تحت بعض", "Files stacked"),
        title: u("المهمة الأولى: ٥٢ ملف أسبوعي في جدول واحد، في أقل من دقيقة", "Job one: 52 weekly files into one table, in under a minute"),
        story: [u("المشرف حط ملفات السنة في فولدر، ونسخ الـ Prompt الأول من مكتبة البرومبتات، وجاوب على أسئلة النموذج: اسم الشيت، والأعمدة، وإن فيه أسابيع فيها عمود زيادة. النموذج كتب الأداة، والمشرف شغّلها.",
          "The supervisor put the year's files in a folder, copied the first Prompt from the prompt library and answered the model's questions: the sheet name, the columns, and that some weeks have an extra column. The model wrote the tool, and the supervisor ran it."),
        u("في أقل من دقيقة: جدول واحد فيه كل الصفوف، وعمود بيقول كل صف جاي من أنهي ملف، وجدول محوري جاهز. والسجل بيقول: ٥٢ ملف اتقروا، وكام صف من كل ملف، وملف واحد اتوقف لأن عموده ناقص، باسمه. ده الفرق بين أداة كويسة وأداة بتخبّي الغلط.",
          "In under a minute: one table with every row, a column telling which file each row came from, and a ready pivot table. The log reads: 52 files read, how many rows from each, and one file stopped — by name — because a column was missing. That's the difference between a good tool and one that hides mistakes.")],
        answer: u("بعد أول تشغيل، قارن عدد الصفوف في السجل بعدد الصفوف الحقيقي. لأن العدد الصح هو أبسط اختبار إن مفيش حاجة ضاعت.", "After the first run, compare the row counts in the log with the real ones — a correct count is the simplest proof nothing was lost."),
        idea: u("الأداة الكويسة بتقولك إيه اللي ما قدرتش تعمله.", "A good tool tells you what it couldn't do.")
      },
      {
        id: "lookup", art: "x_lookup", year: u("المهمة ٢", "Job 2"), mark: u("١٠", "10"), era: u("بحث وربط بين الجداول", "Lookups across tables"),
        title: u("المهمة التانية: الجدول الكبير يكبر بأعمدة مفيدة", "Job two: the big table grows useful columns"),
        story: [u("الجدول الكبير فيه كود الصنف وكود الفرع بس. والشيتات الصغيرة فيها اسم الصنف وفئته، واسم الفرع ومنطقته. الأداة التانية بتضيف الأعمدة دي للجدول الكبير بالربط على الأكواد، زي البحث والربط بين الجداول بالظبط، بس على كل الصفوف مرة واحدة.",
          "The big table holds only the product code and branch code. The small sheets hold the product name and category, the branch name and region. The second tool adds these columns to the big table by joining on the codes — exactly like a lookup, but on every row at once."),
        u("والأهم: الأداة بتطلّع شيت لوحده فيه الأكواد اللي ما لقتلهاش مقابل، زي صنف جديد لسه ما اتضافش للقايمة، أو كود مكتوب بمسافة زيادة. المعادلة كانت هتحط «#N/A» وتكمّل، والأداة بتقولك بالظبط فين المشكلة.",
          "Most importantly, the tool produces a separate sheet listing codes it found no match for — a new product not yet in the list, or a code with a stray space. A formula would have put “#N/A” and moved on; the tool tells you exactly where the problem is.")],
        answer: u("أي ربط بين جداول، اطلب معاه قايمة باللي ما اتربطش. لأن الصفوف اللي ما اتربطتش بتغيّر نتيجة الجدول المحوري من غير ما تاخد بالك.", "With any join, ask for a list of what didn't match — unmatched rows are what silently skew the pivot table."),
        idea: u("اللي ما اتربطش أهم من اللي اتربط.", "What didn't match matters more than what did.")
      },
      {
        id: "report", art: "x_report", year: u("المهمة ٣", "Job 3"), mark: u("١١", "11"), era: u("تقرير من ملفين", "A report from two files"),
        title: u("المهمة التالتة: تقرير من ملفين، ومراجعة إن الأرقام مظبوطة", "Job three: a report from two files, with a check that the figures add up"),
        story: [u("التقرير الشهري بياخد المبيعات من ملف والأهداف من ملف تاني، ويطلّع لكل فرع: المبيعات، والهدف، ونسبة التحقيق، وترتيبه. الأداة التالتة بتعمل ده وتحفظ التقرير في ملف جديد منسّق، جاهز يتبعت.",
          "The monthly report takes sales from one workbook and targets from another, and shows for each branch: sales, target, achievement rate and rank. The third tool does this and saves the report in a new, formatted workbook, ready to send."),
        u("بس قبل ما تعتمد عليه، أول تشغيل بيتقارن بالتقرير اللي إنت عملته بإيدك الشهر اللي فات. والأداة نفسها بتراجع: إجمالي المبيعات في التقرير لازم يساوي إجمالي الملف الأصلي. لو مش متساويين، بتوقف وتقولك الفرق.",
          "Before you rely on it, the first run is compared with the report you made by hand last month. And the tool checks itself: total sales in the report must equal the total in the source file. If they differ, it stops and shows you the gap.")],
        answer: u("أول تشغيل لأي أداة تقارير، قارنه بتقرير معمول بالإيد ومعتمد. لأن ده الاختبار الوحيد اللي بيثبت إن الأداة فهمت شغلك صح.", "Compare the first run of any reporting tool with an approved hand-made report — it's the only test that proves the tool understood your work."),
        idea: u("الأداة لازم تثبت إنها صح قبل ما تثق فيها.", "A tool must prove it's right before you trust it.")
      },
      {
        id: "cliff", art: "x_cliff", year: u("الوحدة الجاية", "Next unit"), mark: u("١٢", "12"), era: u("من الورق للجهاز", "From paper to laptop"),
        title: u("التلات أدوات جاهزين على الورق… والسؤال: نبنيهم إزاي بجد؟", "The three tools are ready on paper… so how do we really build them?"),
        story: [u("المهام التلاتة دي مش عند المشرف بس. مهندس تخطيط في مصنع تلفزيونات بيعملها كل أسبوع: تقارير ستة خطوط تحت بعض، وأسماء الموديلات من شيت صغير، والإنتاج قصاد الخطة. وزميلته في المشتريات قالتله: «Gemini Enterprise بيكتبلي الكود في الرد، ومفيش ملف أنزّله».",
          "These three jobs aren't the supervisor's alone. A planning engineer at a TV factory does them every week: six lines' reports stacked, model names from a small sheet, output against plan. And his colleague from purchasing told him: “Gemini Enterprise writes me the code in the reply, and there's no file to download.”"),
        u("فاضل تلات أسئلة: نجرّب الأدوات على إيه ونعرف منين إنها صح؟ والكود يوصل للجهاز إزاي، من ChatGPT أو Gemini Enterprise؟ ولما الأداة توقف، نصلّحها إزاي؟ والوحدة الجاية بتبني التلات أدوات خطوة بخطوة على ملفات مصنع التلفزيونات ده.",
          "Three questions remain: what do we try the tools on, and how do we know they're right? How does the code reach the laptop, from ChatGPT or Gemini Enterprise? And when a tool stops, how do we fix it? The next unit builds the three tools step by step on this TV factory's files.")],
        answer: u("واجب الأسبوع: اكتب خطوات مهمة من التلاتة زي ما بتشرحها لموظف جديد. لأن الوصف الدقيق هو أول حاجة الوحدة الجاية بتبدأ بيها.", "This week's assignment: write the steps of one of the three jobs as you'd explain them to a new colleague — a precise description is the first thing the next unit starts from."),
        idea: u("الأداة بتتبني على وصف… وبتتجرّب على بيانات آمنة.", "A tool is built on a description… and tried on safe data.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.autoStory]);
})(window.ACADEMY = window.ACADEMY || {});
