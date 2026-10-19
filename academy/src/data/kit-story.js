/* The training data kit — the story deck that opens unit 2 (lesson x1).
   One hero, a production planning engineer at a television factory (no factory is named), carries every slide with
   one question: «أجرّب الأدوات دي على إيه، وأعرف منين إنها صح؟». The deck builds the kit of data/xl-sample.js: six lines,
   a quarter of weekly production files, master sheets and the plan, ten planted problems, the data dictionary, the
   answer key, and ends on the question the next lesson answers: how does code in a chat reach the laptop?
   Each slide gives one rule with its reason. Figures are the kit's own. Drawings are the xk_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.kitStory = {
    id: "kit", lesson: "x1",
    kicker: u("حقيبة البيانات التدريبية · الحكاية كاملة في ٨ دقايق", "The training data kit · the whole story in 8 minutes"),
    title: u("ملفات تدريب بنفس شكل ملفات المصنع", "Training files shaped like the factory's files"),
    lead: u("فاكر التلات أدوات اللي اتكلّمنا عنهم في آخر الوحدة الأولى؟ الوحدة دي بتبنيهم بجد، خطوة بخطوة، في مصنع تلفزيونات. بس قبل أول Prompt، فيه سؤال لازم يتجاوب: هنجرّب على إيه، وهنعرف منين إن النتيجة صح؟ في الحكاية دي هنبني حقيبة بيانات كاملة لخطوط الإنتاج، بملفاتها ومشاكلها ومفتاح إجابتها.",
      "Remember the three tools we discussed at the end of unit 1? This unit builds them for real, step by step, in a television factory. But before the first Prompt, one question needs an answer: what do we practise on, and how will we know the result is right? In this story we build a complete data kit for the production lines, with its files, its problems and its answer key."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("أجرّب الأدوات دي على إيه، وأعرف منين إنها صح؟", "What do I try these tools on, and how do I know they're right?"),
    finalQuestion: u("طب الكود اللي هيكتبه النموذج… هيوصل لجهازي إزاي؟", "So the code the model writes… how does it reach my laptop?"),
    note: u("الأرقام والأسماء توضيحية، وهي أرقام الحقيبة نفسها. ما فيش اسم مصنع ولا شركة.", "Figures and names are illustrative, and they are the kit's own. No factory or company is named."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("حقيبة البيانات التدريبية، في شرائح", "The training data kit, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "scene", art: "xk_scene", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("تلات مهام كل أسبوع", "Three jobs every week"),
        title: u("ستة خطوط، وتلات مهام بتتكرر", "Six lines, and three jobs that repeat"),
        story: [u("مهندس التخطيط في مصنع تلفزيونات بيستلم كل أسبوع تقرير إنتاج من ستة خطوط تجميع. وعنده نفس التلات مهام اللي قابلناها في درس أول أتمتة: يحط تقارير الأسابيع تحت بعض، ويضيف أسماء الخطوط والموديلات من شيتات صغيرة، ويطلّع تقرير الإنتاج قصاد الخطة لمدير المصنع.",
          "The planning engineer at a television factory receives a production report from six assembly lines every week. He has the same three jobs we met in the first-automation lesson: stack the weeks' reports, add line and model names from small sheets, and produce the output-against-plan report for the factory manager."),
        u("المهام دي بتاخد منه حوالي ست ساعات كل شهر. وقرّر يبني التلات أدوات. بس قبل ما يكتب أول Prompt، سأل نفسه سؤال الحكاية: هجرّب الأدوات دي على إيه، وهعرف منين إن الرقم اللي طالع صح؟",
          "These jobs take him about six hours a month. He decided to build the three tools. But before writing the first Prompt, he asked himself this story's question: what do I try these tools on, and how will I know the figure they produce is right?")],
        answer: u("قبل ما تبني أداة، حدّد هتختبرها على إيه وهتقارن نتيجتها بإيه. لأن الأداة اللي ما لهاش نتيجة معروفة تتقارن بيها، ما تقدرش تحكم عليها.", "Before building a tool, decide what you'll test it on and what you'll compare its result with — a tool with no known result to compare against can't be judged."),
        idea: u("الأداة بتتبني مرة… وبتتجرّب على نتيجة معروفة.", "A tool is built once… and tried against a known result.")
      },
      {
        id: "idea", art: "xk_idea", year: u("الفكرة", "The idea"), mark: u("٠٢", "02"), era: u("حقيبة ومفتاح", "A kit and a key"),
        title: u("حقيبة بيانات… ومعاها الإجابة", "A data kit… with the answer"),
        story: [u("الفكرة إنه يعمل حقيبة بيانات تدريبية: نفس ملفات المصنع بالظبط في الشكل، بأرقام توضيحية اتحسبت نتيجتها من الأول. يعني قبل ما أي أداة تشتغل، هو عارف كام دفعة لازم تطلع، وكام جهاز، وأنهي خط أعلى من خطته وأنهي خط أقل.",
          "The idea is to build a training data kit: exactly the factory's files in shape, with illustrative figures whose result was worked out in advance. So before any tool runs, he knows how many batches must come out, how many units, which line is above its plan and which is below."),
        u("وكده أي أداة يبنيها، بـ ChatGPT أو بـ Gemini Enterprise، بيحكم عليها بسؤال واحد بسيط: طلّعت نفس الأرقام ولا لأ؟ ولو كل اللي في التدريب اشتغلوا على نفس الحقيبة، كلهم بيقارنوا بنفس المفتاح.",
          "So any tool he builds, with ChatGPT or with Gemini Enterprise, is judged by one simple question: did it produce the same figures or not? And if everyone in the training works on the same kit, they all compare against the same key.")],
        answer: u("جرّب الأداة على بيانات نتيجتها معروفة قبل أي حاجة. لأن «شكلها صح» مش دليل، والمطابقة مع إجابة معروفة دليل.", "Try the tool on data whose result is known before anything else — “looks right” is no proof; matching a known answer is."),
        idea: u("نفس الملفات… ونفس المفتاح للكل.", "The same files… and the same key for everyone.")
      },
      {
        id: "twin", art: "xk_twin", year: u("الشكل", "The shape"), mark: u("٠٣", "03"), era: u("نفس الشكل بالظبط", "Exactly the same shape"),
        title: u("نسخة بنفس الشيتات والأعمدة والمشاكل", "A copy with the same sheets, columns and problems"),
        story: [u("الحقيبة لازم تشبه ملفات المصنع في كل حاجة: نفس اسم الشيت، ونفس العناوين، ونفس طريقة كتابة الأكواد، ونفس المشاكل اللي بتظهر كل أسبوع من الخطوط. الأرقام بس هي اللي توضيحية.",
          "The kit must resemble the factory's files in everything: the same sheet name, the same headers, the same way of writing codes, the same problems that come from the lines every week. Only the figures are illustrative."),
        u("الأداة ما بتفرّقش: هي بتشوف شيت اسمه Production وأعمدة بأسماء معيّنة. لو نجحت على الحقيبة، هتنجح على ملفات الخطوط الحقيقية. ولو الحقيبة كانت نضيفة ومثالية، الأداة هتنجح عليها وتقع عند أول ملف حقيقي.",
          "The tool can't tell the difference: it sees a sheet named Production and columns with certain names. If it succeeds on the kit, it will succeed on the lines' real files. And if the kit were clean and perfect, the tool would pass on it and fall at the first real file.")],
        answer: u("جرّب على بيانات بنفس الشكل والمشاكل، مش على بيانات «نضيفة». لأن الأداة اللي اتجرّبت على ملف مثالي بتقع عند أول ملف حقيقي.", "Practise on data with the same shape and problems, not on “clean” data — a tool tried on a perfect file falls at the first real one."),
        idea: u("نفس الشكل… ونتيجة معروفة.", "The same shape… and a known result.")
      },
      {
        id: "factory", art: "xk_factory", year: u("المصنع", "The factory"), mark: u("٠٤", "04"), era: u("ستة خطوط وربع سنة", "Six lines, one quarter"),
        title: u("ستة خطوط تجميع في تلات عنابر", "Six assembly lines in three halls"),
        story: [u("المصنع في الحقيبة فيه ستة خطوط تجميع: خطين في عنبر أ، وخطين في عنبر ب، وخطين في عنبر ج. وبيعمل ١٢ موديل تلفزيون في أربع فئات، من شاشة ٢٤ بوصة للمكاتب لحد شاشة ٧٥ بوصة 4K.",
          "The factory in the kit has six assembly lines: two in hall A, two in hall B and two in hall C. It builds 12 TV models in four categories, from a 24-inch office screen to a 75-inch 4K screen."),
        u("والفترة: الربع الأول من ٢٠٢٦، من أول يناير لآخر مارس، من غير أيام الجمعة. الحصيلة: ١٬٢٨٨ دفعة إنتاج، فيها ٢٩٬٣٠٤ جهاز سليم، وقيمتها بالتكلفة المعيارية ٢٧٥٬٢٣٤٬٩٠٠ جنيه. أرقام توضيحية، بس حجمها وشكلها زي شغل مصنع حقيقي.",
          "The period: the first quarter of 2026, from early January to the end of March, without Fridays. The result: 1,288 production batches holding 29,304 good units, worth EGP 275,234,900 at standard cost. Illustrative figures, but with the size and shape of a real factory's work.")],
        answer: u("خلّي البيانات التدريبية قريبة من حجم شغلك وتنوّعه. لأن أداة اتجرّبت على عشر صفوف ما بتقولكش هتعمل إيه في ألف.", "Keep training data close to your work's size and variety — a tool tried on ten rows can't tell you what it will do with a thousand."),
        idea: u("أرقام توضيحية… وحجم حقيقي.", "Illustrative figures… real size.")
      },
      {
        id: "folder", art: "xk_folder", year: u("الملفات", "The files"), mark: u("٠٥", "05"), era: u("فولدر واحد", "One folder"),
        title: u("فولدر واحد فيه كل اللي التلات أدوات محتاجينه", "One folder holding everything the three tools need"),
        story: [u("الحقيبة فولدر اسمه Excel_Automation_Kit. جوّاه فولدر Production_2026_Q1 فيه ١٣ ملف أسبوعي من Week_01 لحد Week_13. وجنبه Masters.xlsx فيه شيت للخطوط وشيت للموديلات بتكلفتها المعيارية، وPlan_2026_Q1.xlsx فيه خطة كل خط في كل شهر.",
          "The kit is a folder named Excel_Automation_Kit. Inside is a folder Production_2026_Q1 with 13 weekly files, Week_01 to Week_13. Beside it, Masters.xlsx holds a lines sheet and a models sheet with standard costs, and Plan_2026_Q1.xlsx holds each line's plan for each month."),
        u("كل ملف ليه دور: الأسابيع للأداة الأولى اللي بتحطهم تحت بعض، والـ Masters للأداة التانية اللي بتجيب الأسماء، والخطة للأداة التالتة اللي بتعمل التقرير. ومعاهم ملفين نصّيين: دليل البيانات ومفتاح الإجابة.",
          "Each file has a role: the weeks for tool one, which stacks them; Masters for tool two, which brings the names; the plan for tool three, which builds the report. With them come two text files: the data dictionary and the answer key.")],
        answer: u("أسماء الملفات والشيتات تتكتب في الـ Prompt بالحرف، زي ما هي على الجهاز. لأن الأداة بتدوّر على الاسم بالظبط، وحرف زيادة بيوقّفها.", "File and sheet names go into the Prompt letter for letter, as they are on disk — the tool looks for the exact name, and one extra letter stops it."),
        idea: u("لكل أداة ملفاتها… وكلهم في فولدر واحد.", "Each tool has its files… all in one folder.")
      },
      {
        id: "columns", art: "xk_columns", year: u("الشيت", "The sheet"), mark: u("٠٦", "06"), era: u("ستة أعمدة", "Six columns"),
        title: u("سطر واحد في تقرير الإنتاج بيحكي إيه؟", "What does one line of the production report say?"),
        story: [u("كل ملف أسبوع فيه شيت اسمه Production، وأول صف فيه العناوين: التاريخ، ورقم أمر التشغيل، وكود الخط، وكود الموديل، والكمية، والقيمة. يعني كل سطر بيقول: يوم كذا، أمر تشغيل رقم كذا، الخط ده جمّع الموديل ده، بالكمية دي من الأجهزة السليمة.",
          "Each weekly file has a sheet named Production whose first row holds the headers: Date, WorkOrder, LineCode, ModelCode, Qty and Value. So each line says: on this day, work order number this, this line assembled this model, in this quantity of good units."),
        u("لاحظ إن الشيت فيه أكواد بس، زي L04 وM105، مش أسماء. الأسماء موجودة في الـ Masters. ولاحظ إن القيمة = الكمية × التكلفة المعيارية للموديل، والكمية ممكن تبقى سالبة لما وحدات ترجع من الجودة. الملاحظات الصغيرة دي هي اللي النموذج محتاج يعرفها.",
          "Notice the sheet holds only codes, like L04 and M105, not names; the names live in Masters. And notice Value = Qty × the model's standard cost, and Qty can be negative when units come back from quality. These small notes are exactly what the model needs to know.")],
        answer: u("اوصف كل عمود: اسمه، ونوعه، وشكله، والقيم الغريبة اللي ممكن تيجي فيه. لأن النموذج ما بيعرفش إن السالب وحدات رجعت من الجودة إلا لو قلتله.", "Describe each column: its name, type, shape and the odd values it may hold — the model doesn't know a negative means units back from quality unless you say so."),
        idea: u("كل عمود ليه حكاية… والنموذج محتاج يسمعها.", "Every column has a story… and the model needs to hear it.")
      },
      {
        id: "traps", art: "xk_traps", year: u("الفخاخ", "The traps"), mark: u("٠٧", "07"), era: u("عشر مشاكل متعمّدة", "Ten planted problems"),
        title: u("عشر مشاكل مستخبية… زي اللي بتيجي من الخطوط كل أسبوع", "Ten hidden problems… like the ones the lines send every week"),
        story: [u("الحقيبة مش نضيفة، ودي أهم ميزة فيها. في آخر Week_02 صف «الإجمالي». وفي Week_04 دفعتين متسجّلين مرتين. وفي Week_05 كود خط بمسافة زيادة، وفي Week_06 كود بحروف صغيرة. وفي Week_07 عمود «ملاحظات» زيادة، وفي Week_09 التواريخ مكتوبة كنص.",
          "The kit isn't clean, and that's its most important feature. At the end of Week_02 sits a “Total” row. Week_04 has two batches entered twice. Week_05 has a line code with a stray space, Week_06 one in lower case. Week_07 has an extra “Notes” column, and Week_09 has dates typed as text."),
        u("وفي Week_11 عمود الكمية اسمه مكتوب بشكل مختلف. وفيه موديل جديد مش في قايمة الموديلات، وموديل متسجّل مرتين بتكلفتين، وخط مالوش خطة لشهر مارس. كل واحدة منهم لو عدّت من غير ما حد ياخد باله، بتغيّر رقم في تقرير مدير المصنع.",
          "In Week_11 the quantity column is titled differently. There's a new model missing from the models list, a model listed twice with two costs, and a line with no plan for March. Any one of them, passing unnoticed, changes a figure in the factory manager's report.")],
        answer: u("الأداة لازم تتجرّب على المشاكل، مش بعيد عنها. لأن الأداة بتتعرف وقت المشكلة: بتوقف وتقول، ولا بتكمّل وتغلط؟", "A tool must be tried on the problems, not away from them — a tool shows itself when trouble comes: does it stop and say so, or carry on and get it wrong?"),
        idea: u("الحقيبة النضيفة بتخبّي ضعف الأداة.", "A clean kit hides a tool's weakness.")
      },
      {
        id: "readme", art: "xk_readme", year: u("الوصف", "The description"), mark: u("٠٨", "08"), era: u("دليل البيانات", "The data dictionary"),
        title: u("دليل البيانات: الـ Context اللي الأداة محتاجاه", "The data dictionary: the Context a tool needs"),
        story: [u("فاكر ورقة الـ Context من درس الـ Prompt والـ Context؟ هنا ليها اسم: دليل البيانات. ملف README.txt في الحقيبة بيقول: أسماء الملفات، واسم كل شيت، والعناوين بالحرف، ونوع كل عمود، والقيم الغريبة اللي ممكن تيجي.",
          "Remember the context sheet from the lesson on the Prompt and the Context? Here it has a name: the data dictionary. README.txt in the kit says: the file names, each sheet's name, the headers letter for letter, each column's type, and the odd values that may appear."),
        u("الدليل ده هو اللي بيتلصق مع الـ Prompt، سواء على ChatGPT أو على Gemini Enterprise. والأهم: نفس الشكل ينفع لأي ملف في المصنع، تقرير إنتاج أو كشف استلام خامات. تكتب الدليل مرة، والنموذج يبني الأداة منه.",
          "This dictionary is what gets pasted with the Prompt, whether on ChatGPT or on Gemini Enterprise. More importantly, the same shape works for any file in the factory, a production report or a materials receipt list. You write the dictionary once, and the model builds the tool from it.")],
        answer: u("قبل أي طلب أداة، اكتب دليل بيانات للملف. لأن النموذج بيبني الأداة على اللي إنت وصفته، مش على اللي إنت فاكره.", "Before any tool request, write a data dictionary for the file — the model builds the tool on what you described, not on what you had in mind."),
        idea: u("دليل البيانات = Context الأداة.", "The data dictionary = the tool's Context.")
      },
      {
        id: "rows", art: "xk_rows", year: u("المثال", "The example"), mark: u("٠٩", "09"), era: u("خمس صفوف", "Five rows"),
        title: u("خمس صفوف مثال… من حالات مختلفة", "Five example rows… from different cases"),
        story: [u("الوصف لوحده ساعات مش كفاية: النموذج يفهم أحسن لما يشوف شكل السطر. فمهندس التخطيط بيضيف خمس صفوف مثال مع الدليل، بس بيختارهم بذكاء.",
          "A description alone is sometimes not enough: the model understands better when it sees what a line looks like. So the planning engineer adds five example rows to the dictionary, chosen with care."),
        u("سطر عادي، وسطر كميته سالبة لأن وحدات رجعت من الجودة، وسطر تاريخه مكتوب كنص، وسطر كوده بشكل غريب، وسطر عادي تاني. خمس صفوف من حالات مختلفة بتعلّم النموذج أكتر من عشر صفحات وصف.",
          "An ordinary line, a line with a negative quantity because units came back from quality, a line with a text date, a line with an oddly shaped code, and another ordinary line. Five rows from different cases teach the model more than ten pages of description.")],
        answer: u("اختار الصفوف المثال من الحالات المختلفة، مش من أول الشيت. لأن أول خمس صفوف غالبًا عادية، والأداة محتاجة تشوف الغريب.", "Pick the example rows from different cases, not from the top of the sheet — the first five rows are usually ordinary, and the tool needs to see the odd ones."),
        idea: u("صف غريب واحد في المثال بيوفّر غلطة في الأداة.", "One odd row in the example saves one mistake in the tool.")
      },
      {
        id: "silent", art: "xk_rules", year: u("التحذير", "The warning"), mark: u("١٠", "10"), era: u("ما تلقّنش المشاكل", "Don't feed it the problems"),
        title: u("ما تقولش للنموذج المشاكل… اطلب قواعد عامة", "Don't tell the model the problems… ask for general rules"),
        story: [u("مهندس التخطيط كان عارف المشاكل العشرة، وفكّر يكتبها في الـ Prompt: «في Week_02 صف إجمالي، شيله». بس افتكر إن تقرير الخطوط الشهر الجاي هيكون فيه مشكلة جديدة ما حدش يعرفها، والأداة اللي اتعلّمت عشر حالات بعينها هتعدّيها من غير ما تقول.",
          "The planning engineer knew the ten problems and thought of writing them into the Prompt: “Week_02 has a totals row; remove it.” Then he remembered that next month's line reports will hold a new problem nobody knows of, and a tool taught ten specific cases will let it pass silently."),
        u("فكتب قواعد عامة بدالها: «أي صف مفيهوش رقم أمر تشغيل يتساب ويتسجّل»، «أي عمود ناقص أو اسمه مختلف، وقّف وسمّي الملف»، «أي كود مش في القايمة، طلّعه في شيت لوحده». القواعد دي بتمسك المشاكل العشرة… واللي بعدهم.",
          "So he wrote general rules instead: “any row without a work order is skipped and logged”, “any missing or renamed column: stop and name the file”, “any code missing from the list goes on a sheet of its own”. These rules catch the ten problems… and the ones after them.")],
        answer: u("اطلب قاعدة لكل نوع مشكلة، مش علاج لكل مشكلة. لأن القاعدة بتشتغل على ملفات ما شفتهاش لسه.", "Ask for a rule per kind of problem, not a fix per problem — a rule works on files you haven't seen yet."),
        idea: u("العلاج بيصلّح ملف… والقاعدة بتحمي كل الملفات.", "A fix repairs one file… a rule protects them all.")
      },
      {
        id: "key", art: "xk_key", year: u("المفتاح", "The key"), mark: u("١١", "11"), era: u("الإجابة المعروفة", "The known answer"),
        title: u("مفتاح الإجابة: بتفتحه بعد التشغيل، مش قبله", "The answer key: opened after the run, not before"),
        story: [u("في الحقيبة ملف اسمه Answer_key.txt فيه كل اللي الأداة الصح لازم تلاقيه: ١٬٢٩٠ صف اتقروا، وصف إجمالي اتساب، وصفين متكررين، و١٬٢٨٨ دفعة حقيقية، و٢٩٬٣٠٤ جهاز، والموديل اللي ما اتربطش، ونسبة تحقيق كل خط في كل شهر.",
          "The kit has a file named Answer_key.txt holding everything a correct tool must find: 1,290 rows read, a totals row skipped, two duplicates, 1,288 true batches, 29,304 units, the model that didn't match, and each line's achievement each month."),
        u("القاعدة: ما تفتحوش قبل التشغيل، وما تديهوش للنموذج. لو الأداة شافت الإجابة، هتطلّعها حتى لو منطقها غلط. المفتاح ليك إنت، علشان تقارن بعد ما الأداة تخلص، رقم برقم.",
          "The rule: don't open it before the run, and don't give it to the model. A tool that saw the answer will produce it even if its logic is wrong. The key is for you, to compare after the tool finishes, figure by figure.")],
        answer: u("قارن نتيجة الأداة بإجابة معروفة اتحسبت بطريقة مستقلة. لأن الأداة اللي بتراجع نفسها بس ممكن تغلط مرتين بنفس الطريقة.", "Compare the tool's result with a known answer computed independently — a tool that only checks itself can make the same mistake twice."),
        idea: u("الإجابة المعروفة بتحوّل «شكلها صح» لـ «صح».", "A known answer turns “looks right” into “is right”.")
      },
      {
        id: "cliff", art: "xk_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("الكود في الشات", "Code in the chat"),
        title: u("الحقيبة جاهزة… والزميلة عندها سؤال", "The kit is ready… and a colleague has a question"),
        story: [u("مهندس التخطيط نزّل الحقيبة، وفكّها في فولدر لوحده، وفتح Week_02 ولقى صف الإجمالي بعينه. وكان هيبدأ أول Prompt، لما زميلته في المشتريات عدّت عليه: «أنا شغالة على Gemini Enterprise. طلبت منه أداة لكشوف استلام الخامات، كتبلي الكود في الرد، بس مفيش ملف أنزّله».",
          "The planning engineer downloaded the kit, unzipped it into a folder of its own, opened Week_02 and found the totals row himself. He was about to write the first Prompt when his colleague from purchasing stopped by: “I work on Gemini Enterprise. I asked it for a tool for the materials receipt lists; it wrote the code in the reply, but there's no file to download.”"),
        u("وهو كان متعوّد إن ChatGPT بيديه رابط ينزّل منه. يعني الطريقين مختلفين، والاتنين لازم يوصلوا لنفس النتيجة: ملف على اللابتوب يشتغل بدبل كليك. والسؤال اللي الدرس الجاي بيجاوبه: الكود اللي في الشات… يوصل لجهازك إزاي؟",
          "And he was used to ChatGPT giving him a link to download from. So the two paths differ, and both must reach the same result: a file on the laptop that runs with a double click. And the question the next lesson answers: the code in the chat… how does it reach your laptop?")],
        answer: u("واجب الدرس: نزّل الحقيبة، ودوّر على ٣ مشاكل بعينك قبل ما تقرا القايمة، واكتب دليل بيانات لملف من شغلك. لأن عينك هي أول اختبار لأي أداة.", "This lesson's task: download the kit, find 3 problems yourself before reading the list, and write a data dictionary for a file from your work — your own eye is the first test of any tool."),
        idea: u("البيانات جاهزة… فاضل الطريق للجهاز.", "The data is ready… the road to the laptop remains.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.kitStory]);
})(window.ACADEMY = window.ACADEMY || {});
