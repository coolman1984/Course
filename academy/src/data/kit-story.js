/* Describing the file — the story deck that opens unit 2 (lesson x1).
   One hero, a production planning engineer at a television factory (no factory is named), carries every slide with
   one question: «النموذج ما شافش ملفي… أوصفه له إزاي؟». The deck lays out the unit's ladder of eight projects (one zip
   per lesson, English Excel files), then builds the first one: a data dictionary for one weekly production report,
   tested in a fresh chat. It ends on the question the next lesson answers: how does code in a chat reach the laptop?
   Each slide gives one rule with its reason. Figures are project 1's own. Drawings are the xk_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.kitStory = {
    id: "kit", lesson: "x1",
    kicker: u("قبل أي أداة · الحكاية كاملة في ٨ دقايق", "Before any tool · the whole story in 8 minutes"),
    title: u("صِف الملف زي ما هو… قبل ما تطلب أي أداة", "Describe the file as it is… before asking for any tool"),
    lead: u("فاكر التلات أدوات اللي اتكلّمنا عنهم في آخر الوحدة الأولى؟ الوحدة دي بتبنيهم بجد، واحدة واحدة، ومعاهم أداتين للمشتريات والخامات، في مصنع تلفزيونات. كل درس معاه مشروع في ملف مضغوط لوحده. بس قبل أول أداة، فيه سؤال لازم يتجاوب: النموذج عمره ما شاف ملفاتك، فهيعرفها إزاي؟",
      "Remember the three tools we discussed at the end of unit 1? This unit builds them for real, one at a time, plus two tools for purchasing and materials, in a television factory. Each lesson comes with a project in a zip of its own. But before the first tool, one question needs an answer: the model has never seen your files, so how will it know them?"),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("النموذج ما شافش ملفي… أوصفه له إزاي؟", "The model hasn't seen my file… how do I describe it?"),
    finalQuestion: u("طب الكود اللي هيكتبه النموذج… هيوصل لجهازي إزاي؟", "So the code the model writes… how does it reach my laptop?"),
    note: u("الأرقام والأسماء توضيحية، وهي أرقام مشروع الدرس نفسه. ما فيش اسم مصنع ولا شركة.", "Figures and names are illustrative, and they are the lesson project's own. No factory or company is named."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("وصف الملف قبل أي أداة، في شرائح", "Describing the file before any tool, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "scene", art: "xk_scene", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("الملف عندك بس", "The file is only with you"),
        title: u("ستة خطوط، وملف ما حدش غيرك شافه", "Six lines, and a file nobody else has seen"),
        story: [u("مهندس التخطيط في مصنع تلفزيونات بيستلم كل أسبوع تقرير إنتاج من ستة خطوط تجميع، وعنده نفس التلات مهام اللي قابلناها في درس أول أتمتة. قرّر يبني الأدوات، وفتح الشات علشان يكتب أول طلب.",
          "The planning engineer at a television factory receives a production report from six assembly lines every week, and he has the same three jobs we met in the first-automation lesson. He decided to build the tools, and opened the chat to write the first request."),
        u("وقبل ما يكتب، وقف عند حاجة بسيطة: الملف قدامه على الشاشة، بس النموذج عمره ما شافه. ما يعرفش اسم الشيت، ولا العناوين، ولا يعني إيه كمية سالبة. كل اللي هيعرفه هو اللي هيتكتب في الطلب.",
          "And before writing, he paused at something simple: the file is in front of him on screen, but the model has never seen it. It doesn't know the sheet's name, the headers, or what a negative quantity means. All it will know is what goes into the request.")],
        answer: u("افترض إن النموذج ما يعرفش عن ملفك غير اللي إنت كاتبه. لأن أي حاجة ما اتقالتش، النموذج هيخمّنها، والتخمين بيطلع أداة غلط.", "Assume the model knows nothing of your file beyond what you write — whatever isn't said, the model guesses, and guessing makes a wrong tool."),
        idea: u("الملف عندك… والنموذج بيعرفه من كلامك بس.", "The file is with you… the model knows it only from your words.")
      },
      {
        id: "ladder", art: "xk_ladder", year: u("السلّم", "The ladder"), mark: u("٠٢", "02"), era: u("٨ مشاريع", "8 projects"),
        title: u("٨ مشاريع… كل واحد أصعب من اللي قبله بخطوة", "8 projects… each one step harder than the last"),
        story: [u("الوحدة دي سلّم من ٨ مشاريع. الأول وصف ملف من غير كود، والتاني أول أداة صغيرة بتقرا بس. وبعدهم التلات أدوات من درس أول أتمتة: تحت بعض، وبحث وربط، وتقرير قصاد الخطة.",
          "This unit is a ladder of 8 projects. The first describes a file with no code, and the second is a small first tool that only reads. Then come the three tools from the first-automation lesson: stacking, lookups, and a report against plan."),
        u("وبعدها أداتين للمثال التاني في المصنع، المشتريات والخامات: مطابقة أوامر الشراء بالاستلام، وطلب الخامات من خطة الإنتاج. وفي الآخر: لما الأداة توقف، تعمل إيه. كل مشروع بيزوّد فكرة واحدة على اللي قبله، مش أكتر.",
          "After that, two tools for the factory's second example, purchasing and materials: matching purchase orders with receipts, and a materials order from the production plan. And finally: what to do when a tool stops. Each project adds one idea to the one before, no more.")],
        answer: u("ابدأ بأسهل أداة واطلع درجة درجة. لأن كل فكرة جديدة لوحدها سهلة تتفهم، وخمس أفكار مرة واحدة بتلخبط.", "Start with the easiest tool and climb one step at a time — each new idea alone is easy to grasp, and five at once confuse."),
        idea: u("فكرة جديدة واحدة في كل درجة.", "One new idea on each step.")
      },
      {
        id: "zip", art: "xk_zip", year: u("المشروع", "The project"), mark: u("٠٣", "03"), era: u("ملف مضغوط لكل درس", "A zip per lesson"),
        title: u("كل درس معاه ملف مضغوط لوحده", "Each lesson comes with a zip of its own"),
        story: [u("كل مشروع بينزل لوحده في ملف مضغوط، زي Lesson_1_Describe_The_Data.zip. جوّاه فولدر Data فيه ملفات الإكسل، وREADME.txt فيه المهمة ودليل البيانات، وPrompt.txt جاهز تنسخه، وAnswer_Key.txt فيه النتيجة الصح.",
          "Each project downloads on its own as a zip, like Lesson_1_Describe_The_Data.zip. Inside is a Data folder holding the Excel files, README.txt with the task and the data dictionary, Prompt.txt ready to copy, and Answer_Key.txt with the right result."),
        u("ومفتاح الإجابة ليه قاعدة: بتفتحه بعد التشغيل، مش قبله، وما تديهوش للنموذج. لو الأداة شافت الإجابة، هتطلّعها حتى لو منطقها غلط. المفتاح ليك إنت، علشان تقارن رقم برقم.",
          "And the answer key has a rule: you open it after the run, not before, and never give it to the model. A tool that saw the answer will produce it even if its logic is wrong. The key is for you, to compare figure by figure.")],
        answer: u("جرّب كل أداة على بيانات نتيجتها معروفة قبل ما تلمس ملف حقيقي. لأن «شكلها صح» مش دليل، والمطابقة مع إجابة معروفة دليل.", "Try every tool on data whose result is known before touching a real file — “looks right” is no proof; matching a known answer is."),
        idea: u("بيانات، ومهمة، وPrompt، وإجابة… في ملف واحد.", "Data, a task, a Prompt and an answer… in one zip.")
      },
      {
        id: "english", art: "xk_english", year: u("اللغة", "The language"), mark: u("٠٤", "04"), era: u("الملفات بالإنجليزي", "Files in English"),
        title: u("ملفات الإكسل بالإنجليزي… زي ملفات الشغل", "The Excel files are in English… like the files at work"),
        story: [u("ملفات المشاريع كلها بالإنجليزي: اسم الشيت Production، والعناوين Date وWorkOrder وLineCode وQty، والقيم أكواد زي L03 وM108. بالظبط زي الملفات اللي بتطلع من أنظمة المصنع.",
          "Every project file is in English: the sheet is named Production, the headers are Date, WorkOrder, LineCode and Qty, and the values are codes like L03 and M108. Exactly like the files that come out of the factory's systems."),
        u("وإنت بتكلّم النموذج بالعربي عادي، بس كل اسم من الملف يتكتب زي ما هو بالحرف. لو كتبت «عمود الكمية» والعنوان الحقيقي Qty، الأداة هتدوّر على عمود مش موجود. الكلام بلغتك، والأسماء بلغة الملف.",
          "You talk to the model in Arabic as usual, but every name from the file is written exactly as it is. Write “the quantity column” when the real header is Qty, and the tool will look for a column that doesn't exist. Your words in your language, the names in the file's.")],
        answer: u("انسخ أسماء الشيتات والعناوين من الملف نفسه، ما تكتبهاش من الذاكرة. لأن الأداة بتدوّر على الاسم بالظبط، وحرف واحد مختلف بيوقّفها.", "Copy sheet names and headers from the file itself, never from memory — the tool looks for the exact name, and one different letter stops it."),
        idea: u("الكلام بلغتك… والأسماء بالحرف.", "Your words in your language… the names letter for letter.")
      },
      {
        id: "columns", art: "xk_columns", year: u("الشيت", "The sheet"), mark: u("٠٥", "05"), era: u("ستة أعمدة", "Six columns"),
        title: u("سطر واحد في تقرير الإنتاج بيحكي إيه؟", "What does one line of the production report say?"),
        story: [u("ملف المشروع الأول تقرير أسبوع واحد فيه ١٠٦ دفعة إنتاج. كل سطر بيقول: يوم كذا، أمر تشغيل رقم كذا، الخط ده جمّع الموديل ده، بالكمية دي من الأجهزة السليمة، وقيمتها كذا.",
          "The first project's file is one week's report holding 106 production batches. Each line says: on this day, work order number this, this line assembled this model, in this quantity of good units, worth this much."),
        u("لاحظ إن الشيت فيه أكواد بس، زي L04 وM105، مش أسماء: الأسماء في ملفات تانية هتقابلها في الدرس الرابع. ولاحظ إن Value مش رقم عشوائي: هو Qty × التكلفة المعيارية للموديل. الملاحظات الصغيرة دي هي اللي النموذج محتاج يعرفها.",
          "Notice the sheet holds only codes, like L04 and M105, not names: the names live in other files you'll meet in lesson four. And notice Value isn't a random figure: it is Qty × the model's standard cost. These small notes are exactly what the model needs to know.")],
        answer: u("اوصف كل عمود: اسمه، ونوعه، وشكله، ومثال منه. لأن العمود اللي ما اتوصفش، النموذج هيعامله بأول نوع يخطر له.", "Describe each column: its name, type, shape and an example — a column left undescribed gets treated as whatever type the model first thinks of."),
        idea: u("كل عمود ليه حكاية… والنموذج محتاج يسمعها.", "Every column has a story… and the model needs to hear it.")
      },
      {
        id: "odd", art: "xk_odd", year: u("الغريب", "The odd values"), mark: u("٠٦", "06"), era: u("كمية سالبة", "A negative quantity"),
        title: u("صفين كميتهم سالبة… ومعناهم مش غلط", "Two rows with a negative quantity… and they aren't mistakes"),
        story: [u("في الملف صفين الكمية فيهم بالسالب: ٨ وحدات رجعت من الجودة بعد ما اتحسبت إنتاج. ده مش غلط في الإدخال؛ ده تصحيح حقيقي بيقلّل صافي الإنتاج. وقيمتهم بالسالب كمان.",
          "Two rows in the file have a negative quantity: 8 units sent back by quality after being counted as output. That isn't a typing mistake; it's a real correction that lowers net output. Their value is negative too."),
        u("لو ما قلتش ده للنموذج، فيه احتمالين وحشين: يحذفهم علشان «شكلهم غلط»، فالإنتاج يزيد عن الحقيقة، أو يوقف عندهم كل مرة. سطر واحد في الوصف بيحل الموضوع: «السالب = وحدات رجعت من الجودة، تتخصم وما تتحذفش».",
          "Without telling the model, two bad outcomes are possible: it deletes them because they “look wrong”, so output exceeds the truth, or it stops at them every time. One line in the description settles it: “negative = units sent back by quality; deduct, never delete.”")],
        answer: u("قول معنى كل قيمة غريبة: السالب، والفاضي، والرموز. لأن النموذج ما يعرفش معناها في مصنعك إلا لو إنت قلت.", "Say what every odd value means: negatives, blanks, symbols — the model can't know what they mean in your factory unless you say."),
        idea: u("قيمة غريبة من غير شرح = قرار في إيد النموذج.", "An odd value with no explanation = a decision left to the model.")
      },
      {
        id: "rows", art: "xk_rows", year: u("المثال", "The example"), mark: u("٠٧", "07"), era: u("خمس صفوف", "Five rows"),
        title: u("خمس صفوف مثال… من حالات مختلفة", "Five example rows… from different cases"),
        story: [u("الوصف لوحده ساعات مش كفاية: النموذج يفهم أحسن لما يشوف شكل السطر. فمهندس التخطيط بيضيف خمس صفوف مثال، بس بيختارهم بذكاء، مش أول خمس صفوف في الشيت.",
          "A description alone is sometimes not enough: the model understands better when it sees what a line looks like. So the planning engineer adds five example rows, chosen with care rather than the sheet's first five."),
        u("أول صف، وصف كميته سالبة، وصف من خط تاني، وصف لموديل كبير قيمته عالية، وآخر صف. خمس صفوف من حالات مختلفة بتعلّم النموذج أكتر من صفحة وصف كاملة.",
          "The first row, a row with a negative quantity, a row from another line, a row for a large model with a high value, and the last row. Five rows from different cases teach the model more than a whole page of description.")],
        answer: u("اختار الصفوف المثال من الحالات المختلفة، مش من أول الشيت. لأن أول خمس صفوف غالبًا شبه بعض، والأداة محتاجة تشوف الغريب.", "Pick the example rows from different cases, not from the top of the sheet — the first five rows usually look alike, and the tool needs to see the odd ones."),
        idea: u("صف غريب واحد في المثال بيوفّر غلطة في الأداة.", "One odd row in the example saves one mistake in the tool.")
      },
      {
        id: "ask", art: "xk_ask", year: u("الأسئلة", "The questions"), mark: u("٠٨", "08"), era: u("ما تخمّنش", "Don't guess"),
        title: u("«اسألني قبل ما تكتب»", "“Ask me before you write”"),
        story: [u("آخر جملة في الـ Prompt هي أهم جملة: «أي حاجة مش واضحة، اسألني في قايمة مترقّمة، واستنى إجاباتي». ومن غيرها، النموذج هيملا الفراغات بنفسه ويكمّل.",
          "The Prompt's last sentence matters most: “anything not clear, ask me in a numbered list, and wait for my answers.” Without it, the model fills the gaps itself and carries on."),
        u("النموذج سأل مهندس التخطيط ٣ أسئلة: «التاريخ تاريخ ولا نص؟»، «الكمية السالبة معناها إيه؟»، «القيمة بتتحسب إزاي؟». تلات إجابات قصيرة، وكل واحدة منهم كانت هتبقى تخمين في الأداة.",
          "The model asked the planning engineer 3 questions: “Is the date a date or text?”, “What does a negative quantity mean?”, “How is the value worked out?” Three short answers, and each would otherwise have been a guess inside the tool.")],
        answer: u("اطلب من النموذج يسأل قبل ما يكتب، وجاوب بدقة. لأن السؤال اللي اتسأل دلوقتي هو غلطة ما حصلتش بعدين.", "Ask the model to ask before it writes, and answer precisely — a question asked now is a mistake that never happens later."),
        idea: u("كل سؤال بيتسأل… تخمين أقل.", "Every question asked… one guess fewer.")
      },
      {
        id: "dict", art: "xk_dict", year: u("الدليل", "The dictionary"), mark: u("٠٩", "09"), era: u("دليل البيانات", "The data dictionary"),
        title: u("دليل البيانات: الـ Context اللي كل أداة محتاجاه", "The data dictionary: the Context every tool needs"),
        story: [u("فاكر ورقة الـ Context من درس الـ Prompt والـ Context؟ هنا ليها اسم: دليل البيانات. لكل عمود سطر: الاسم بالحرف، والنوع، والشكل، ومثال، والقيم المسموحة، ومعنى أي قيمة غريبة.",
          "Remember the context sheet from the lesson on the Prompt and the Context? Here it has a name: the data dictionary. One line per column: the name letter for letter, the type, the shape, an example, the allowed values, and the meaning of any odd value."),
        u("مهندس التخطيط حفظه في Data_Dictionary.txt جنب الملف. ومن الدرس الجاي، أي Prompt أداة هيتكتب على الدليل ده. والأهم: نفس الشكل ينفع لأي ملف في المصنع، تقرير إنتاج أو كشف استلام خامات.",
          "The planning engineer saved it as Data_Dictionary.txt next to the file. From the next lesson on, every tool Prompt is written on this dictionary. More importantly, the same shape works for any file in the factory, a production report or a materials receipt list.")],
        answer: u("اكتب الدليل مرة، واحفظه جنب الملف، واستخدمه في كل طلب. لأن النموذج بيبني الأداة على اللي إنت وصفته، مش على اللي إنت فاكره.", "Write the dictionary once, keep it next to the file, and use it in every request — the model builds the tool on what you described, not on what you had in mind."),
        idea: u("دليل البيانات = Context الأداة.", "The data dictionary = the tool's Context.")
      },
      {
        id: "test", art: "xk_test", year: u("الاختبار", "The test"), mark: u("١٠", "10"), era: u("محادثة جديدة", "A new chat"),
        title: u("اختبار الدليل: محادثة جديدة، والدليل لوحده", "Testing the dictionary: a new chat, the dictionary alone"),
        story: [u("إزاي تعرف إن الدليل كفاية؟ مهندس التخطيط فتح محادثة جديدة خالص، ولصق الدليل لوحده من غير الملف، وسأل تلات أسئلة: «كم عمود؟»، «الكمية السالبة معناها إيه؟»، «التاريخ نوعه إيه؟».",
          "How do you know the dictionary is enough? The planning engineer opened a brand-new chat, pasted the dictionary alone without the file, and asked three questions: “How many columns?”, “What does a negative quantity mean?”, “What type is the date?”"),
        u("الإجابات طلعت: ٦ أعمدة، ووحدات رجعت من الجودة بتتخصم، وتاريخ حقيقي. لو أي إجابة كانت غلط، يبقى فيه سطر ناقص في الدليل، ويتزوّد قبل أي أداة. وبعدها قارن دليله بمفتاح الإجابة في المشروع.",
          "The answers came back: 6 columns, units sent back by quality that are deducted, and a real date. Had any answer been wrong, a line would be missing from the dictionary, to be added before any tool. Then he compared his dictionary with the project's answer key.")],
        answer: u("اختبر الدليل في محادثة جديدة قبل ما تبني عليه. لأن المحادثة القديمة فاكرة كلامك، والجديدة بتشوف الدليل زي ما الأداة هتشوفه.", "Test the dictionary in a new chat before building on it — the old chat remembers your words, while a new one sees the dictionary as the tool will."),
        idea: u("لو فهمه نموذج من غير ما يشوف الملف… الدليل جاهز.", "If a model understands it without seeing the file… the dictionary is ready.")
      },
      {
        id: "rules", art: "xk_rules", year: u("التحذير", "The warning"), mark: u("١١", "11"), era: u("ما تلقّنش المشاكل", "Don't feed it the problems"),
        title: u("الدليل بيوصف الملف… مش مشاكله", "The dictionary describes the file… not its problems"),
        story: [u("في المشاريع الجاية، الملفات فيها مشاكل متعمّدة، زي صف «Total» في آخر شيت، أو عمود اسمه اتغيّر. وهتبقى عارفها لو قريت مفتاح الإجابة، وهتفكّر تكتبها في الطلب: «في Week_02 صف إجمالي، شيله».",
          "In the coming projects the files hold planted problems, such as a “Total” row at the bottom of a sheet or a renamed column. You'll know them if you read the answer key, and you'll be tempted to write them into the request: “Week_02 has a totals row; remove it.”"),
        u("ما تعملهاش. ملفات الشهر الجاي هيكون فيها مشكلة جديدة ما حدش يعرفها. اكتب قواعد عامة بدالها: «أي صف من غير WorkOrder يتساب ويتسجّل»، «أي عمود ناقص، وقّف وسمّي الملف». القواعد دي بتمسك المشاكل المعروفة… واللي بعدها.",
          "Don't. Next month's files will hold a new problem nobody knows of. Write general rules instead: “any row without a WorkOrder is skipped and logged”, “any missing column: stop and name the file”. These rules catch the known problems… and the ones after them.")],
        answer: u("اطلب قاعدة لكل نوع مشكلة، مش علاج لكل مشكلة. لأن القاعدة بتشتغل على ملفات ما شفتهاش لسه.", "Ask for a rule per kind of problem, not a fix per problem — a rule works on files you haven't seen yet."),
        idea: u("العلاج بيصلّح ملف… والقاعدة بتحمي كل الملفات.", "A fix repairs one file… a rule protects them all.")
      },
      {
        id: "cliff", art: "xk_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("الكود في الشات", "Code in the chat"),
        title: u("الدليل جاهز… والزميلة عندها سؤال", "The dictionary is ready… and a colleague has a question"),
        story: [u("مهندس التخطيط حفظ الدليل، وكان هيبدأ أول أداة، لما زميلته في المشتريات عدّت عليه: «أنا شغالة على Gemini Enterprise. طلبت منه أداة لكشوف استلام الخامات، كتبلي الكود في الرد، بس مفيش ملف أنزّله».",
          "The planning engineer saved the dictionary and was about to start the first tool when his colleague from purchasing stopped by: “I work on Gemini Enterprise. I asked it for a tool for the materials receipt lists; it wrote the code in the reply, but there's no file to download.”"),
        u("وهو كان متعوّد إن ChatGPT بيديه رابط ينزّل منه. يعني الطريقين مختلفين، والاتنين لازم يوصلوا لنفس النتيجة: ملف على اللابتوب يشتغل بدبل كليك. والسؤال اللي الدرس الجاي بيجاوبه: الكود اللي في الشات… يوصل لجهازك إزاي؟",
          "And he was used to ChatGPT giving him a link to download from. So the two paths differ, and both must reach the same result: a file on the laptop that runs with a double click. And the question the next lesson answers: the code in the chat… how does it reach your laptop?")],
        answer: u("واجب الدرس: نزّل مشروع الدرس، واكتب الدليل، واختبره في محادثة جديدة، وبعدين قارنه بمفتاح الإجابة. لأن الدليل اللي اتختبر هو اللي تبني عليه.", "This lesson's task: download the lesson's project, write the dictionary, test it in a new chat, then compare it with the answer key — a tested dictionary is one you can build on."),
        idea: u("الوصف جاهز… فاضل الطريق للجهاز.", "The description is ready… the road to the laptop remains.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.kitStory]);
})(window.ACADEMY = window.ACADEMY || {});
