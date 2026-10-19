/* The sample data kit — the story deck that opens unit 2 (lesson x1).
   The same sales supervisor as in lesson f8, about to try his first tool, carries every slide with one question:
   «أجرّب الأداة فين قبل ما ألمس ملفات الشركة؟». The deck builds the invented company of data/xl-sample.js: six branches,
   a quarter of weekly files, master sheets and targets, ten planted problems, the data dictionary that replaces sending
   data, the answer key, and ends on the question the next lesson answers: how does code in a chat reach the laptop?
   Each slide gives one rule with its reason. Figures are the kit's own. Drawings are the xk_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.kitStory = {
    id: "kit", lesson: "x1",
    kicker: u("حقيبة البيانات التجريبية · الحكاية كاملة في ٨ دقايق", "The sample data kit · the whole story in 8 minutes"),
    title: u("شركة تجريبية بنفس شكل شغلك", "A practice company shaped like your work"),
    lead: u("فاكر التلات أدوات اللي اتكلّمنا عنهم في آخر الوحدة الأولى؟ الوحدة دي بتبنيهم بجد، خطوة بخطوة. بس قبل أول Prompt، فيه سؤال لازم يتجاوب: هنجرّب فين؟ في الحكاية دي هنبني شركة تجريبية كاملة، بملفاتها ومشاكلها، علشان كل الأدوات تتجرّب عليها.",
      "Remember the three tools we discussed at the end of unit 1? This unit builds them for real, step by step. But before the first Prompt, one question needs an answer: where do we practise? In this story we build a complete practice company, with its files and its problems, so every tool can be tried on it."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("أجرّب الأداة فين قبل ما ألمس ملفات الشركة؟", "Where do I try the tool before touching company files?"),
    finalQuestion: u("طب الكود اللي هيكتبه النموذج… هيوصل لجهازي إزاي؟", "So the code the model writes… how does it reach my laptop?"),
    note: u("الشركة والأسماء والأرقام متخيّلة، والأرقام اللي في الشرائح هي أرقام الحقيبة نفسها. البيانات الحقيقية تفضل تحت سياسة شركتك.", "The company, names and figures are invented; the figures on the slides are the kit's own. Real data stays under your company's policy."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("حقيبة البيانات التجريبية، في شرائح", "The sample data kit, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "upload", art: "xk_upload", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("قبل أول Prompt", "Before the first Prompt"),
        title: u("الملف جاهز للرفع… والإيد وقفت", "The file was ready to upload… and the hand stopped"),
        story: [u("المشرف قرر يبدأ بالأداة الأولى. فتح النموذج اللي بيستخدمه على موبايله، وسحب ملف مبيعات الأسبوع علشان يرفعه ويقول «اعملّي أداة للملف ده». وقبل ما يدوس «إرسال»، بص في الملف تاني.",
          "The supervisor decided to start with tool one. He opened the model he uses on his phone and dragged the week's sales file in to upload it and say “build me a tool for this file”. Before pressing “Send”, he looked at the file again."),
        u("أسماء عملاء، وأرقام تليفوناتهم، وأسعار خاصة لتجّار الجملة. ده مش ملفه هو، ده ملف الشركة. وافتكر قاعدة من درس الحدود: البيانات بتاعة الشركة تحت سياسة الشركة الأول. فقفل التطبيق وسأل نفسه سؤال الحكاية: أجرّب فين؟",
          "Customer names, their phone numbers, special prices for wholesalers. This isn't his file; it's the company's. He remembered a rule from the lesson on limits: company data falls under company policy first. He closed the app and asked himself this story's question: where do I practise?")],
        answer: u("قبل ما ترفع أي ملف، اسأل: ده ملفي ولا ملف الشركة؟ لأن الملف اللي اترفع لخدمة على النت ما بيرجعش.", "Before uploading any file, ask: is it mine or the company's? A file uploaded to an online service doesn't come back."),
        idea: u("الحماس للأداة ما يسبقش السؤال عن البيانات.", "Enthusiasm for the tool doesn't come before the question about the data.")
      },
      {
        id: "policy", art: "xk_policy", year: u("القاعدة", "The rule"), mark: u("٠٢", "02"), era: u("شخصي ولا مؤسسي", "Personal or enterprise"),
        title: u("النموذج الشخصي غير النسخة المؤسسية", "A personal model is not the enterprise service"),
        story: [u("في الشركة ناس شغالة على ChatGPT بحساباتهم الشخصية، وناس على Gemini Enterprise اللي الشركة مشتركة فيه. الفرق مش في الذكاء؛ الفرق في العقد. النسخة المؤسسية جوّه اتفاق الشركة، وقسم IT عارف البيانات بتروح فين.",
          "In the company some people use ChatGPT on personal accounts, and some use Gemini Enterprise, which the company subscribes to. The difference isn't intelligence; it's the contract. The enterprise service sits inside the company's agreement, and IT knows where the data goes."),
        u("بس حتى النسخة المؤسسية ليها حدود: فيه ملفات مسموحة وفيه ملفات لأ، زي المرتبات وبيانات العملاء. والحساب الشخصي ما يدخلوش ملف شركة أصلًا. فالمشرف احتاج حاجة تالتة: بيانات يقدر يجرّب عليها في أي مكان.",
          "Yet even the enterprise service has limits: some files are allowed and some aren't, such as payroll and customer data. And a personal account gets no company file at all. So the supervisor needed a third thing: data he could practise on anywhere.")],
        answer: u("اعرف سياسة شركتك: أنهي نموذج مسموح، وأنهي ملفات. لأن القاعدة دي بتحدد إنت هتشتغل إزاي في كل اللي جاي.", "Know your company's policy: which model is allowed, and which files. That rule shapes how you work in everything that follows."),
        idea: u("النموذج المسموح + الملف المسموح = تقدر تبدأ.", "An allowed model + an allowed file = you can start.")
      },
      {
        id: "twin", art: "xk_twin", year: u("الفكرة", "The idea"), mark: u("٠٣", "03"), era: u("توأم من غير أسرار", "A twin without secrets"),
        title: u("نسخة بنفس الشكل… من غير ولا رقم حقيقي", "The same shape… without a single real figure"),
        story: [u("الفكرة بسيطة: نعمل شركة متخيّلة ملفاتها شبه ملفاتنا بالظبط. نفس الشيتات، ونفس الأعمدة، ونفس طريقة كتابة الأكواد، ونفس المشاكل اللي بتظهر كل شهر. بس الأسماء والأرقام كلها متخيّلة.",
          "The idea is simple: build an invented company whose files look exactly like ours. The same sheets, the same columns, the same way of writing codes, the same problems that appear every month. But every name and figure is invented."),
        u("الأداة ما بتفرّقش: هي بتشوف شيت اسمه Sales وأعمدة بأسماء معيّنة. لو نجحت على التوأم، هتنجح على الأصل. والميزة الأكبر إن التوأم ليه إجابة معروفة، فتقدر تعرف الأداة صح ولا غلط من غير تخمين.",
          "The tool can't tell the difference: it sees a sheet named Sales and columns with certain names. If it succeeds on the twin, it will succeed on the original. The bigger advantage: the twin has a known answer, so you can tell whether the tool is right without guessing.")],
        answer: u("جرّب على بيانات بنفس الشكل والمشاكل، مش على بيانات «نضيفة». لأن الأداة اللي اتجرّبت على ملف مثالي بتقع عند أول ملف حقيقي.", "Practise on data with the same shape and problems, not on “clean” data — a tool tried on a perfect file falls at the first real one."),
        idea: u("التوأم بيشيل الشكل… ويسيب الأسرار.", "The twin keeps the shape… and leaves the secrets.")
      },
      {
        id: "company", art: "xk_company", year: u("الشركة", "The company"), mark: u("٠٤", "04"), era: u("ستة فروع وربع سنة", "Six branches, one quarter"),
        title: u("شركة توزيع أجهزة منزلية بستة فروع", "A home-appliance distributor with six branches"),
        story: [u("الشركة التجريبية بتبيع أجهزة منزلية في ستة فروع: مدينة نصر، والدقي، وسموحة، وطنطا، والمنصورة، وأسيوط. وعندها ١٢ صنف في خمس فئات، من التكييفات والتلاجات لحد الخلاطات والمكاوي.",
          "The practice company sells home appliances in six branches: Nasr City, Dokki, Smouha, Tanta, Mansoura and Assiut. It has 12 products in five categories, from air conditioners and refrigerators to blenders and irons."),
        u("والفترة: الربع الأول من ٢٠٢٦، من أول يناير لآخر مارس، من غير أيام الجمعة. الحصيلة: ١٬٣٠٢ سطر مبيعات حقيقي، بإجمالي ٢٨٬٤٢٨٬١٥٠ جنيه. أرقام متخيّلة، بس حجمها وشكلها زي شغل فرع حقيقي.",
          "The period: the first quarter of 2026, from early January to the end of March, without Fridays. The result: 1,302 true sales lines totalling EGP 28,428,150. Invented figures, but with the size and shape of a real branch's work.")],
        answer: u("خلّي البيانات التجريبية قريبة من حجم شغلك وتنوّعه. لأن أداة اتجرّبت على عشر صفوف ما بتقولكش هتعمل إيه في ألف.", "Keep sample data close to your work's size and variety — a tool tried on ten rows can't tell you what it will do with a thousand."),
        idea: u("أسماء متخيّلة… وحجم حقيقي.", "Invented names… real size.")
      },
      {
        id: "folder", art: "xk_folder", year: u("الملفات", "The files"), mark: u("٠٥", "05"), era: u("فولدر واحد", "One folder"),
        title: u("فولدر واحد فيه كل اللي التلات أدوات محتاجينه", "One folder holding everything the three tools need"),
        story: [u("الحقيبة فولدر اسمه Excel_Automation_Kit. جوّاه فولدر Sales_2026_Q1 فيه ١٣ ملف أسبوعي من Week_01 لحد Week_13. وجنبه Masters.xlsx فيه شيت للفروع وشيت للأصناف بأسعارها، وTargets_2026_Q1.xlsx فيه هدف كل فرع في كل شهر.",
          "The kit is a folder named Excel_Automation_Kit. Inside is a folder Sales_2026_Q1 with 13 weekly files, Week_01 to Week_13. Beside it, Masters.xlsx holds a branches sheet and a products sheet with prices, and Targets_2026_Q1.xlsx holds each branch's target for each month."),
        u("كل ملف ليه دور: الأسابيع للأداة الأولى اللي بتحطهم تحت بعض، والـ Masters للأداة التانية اللي بتجيب الأسماء، والأهداف للأداة التالتة اللي بتعمل التقرير. ومعاهم ملفين نصّيين: دليل البيانات ومفتاح الإجابة.",
          "Each file has a role: the weeks for tool one, which stacks them; Masters for tool two, which brings the names; the targets for tool three, which builds the report. With them come two text files: the data dictionary and the answer key.")],
        answer: u("أسماء الملفات والشيتات تتكتب في الـ Prompt بالحرف، زي ما هي على الجهاز. لأن الأداة بتدوّر على الاسم بالظبط، وحرف زيادة بيوقّفها.", "File and sheet names go into the Prompt letter for letter, as they are on disk — the tool looks for the exact name, and one extra letter stops it."),
        idea: u("لكل أداة ملفاتها… وكلهم في فولدر واحد.", "Each tool has its files… all in one folder.")
      },
      {
        id: "columns", art: "xk_columns", year: u("الشيت", "The sheet"), mark: u("٠٦", "06"), era: u("ستة أعمدة", "Six columns"),
        title: u("سطر واحد في شيت المبيعات بيحكي إيه؟", "What does one line of the sales sheet say?"),
        story: [u("كل ملف أسبوع فيه شيت اسمه Sales، وأول صف فيه العناوين: التاريخ، ورقم الفاتورة، وكود الفرع، وكود الصنف، والكمية، والقيمة. يعني كل سطر بيقول: يوم كذا، فاتورة رقم كذا، الفرع ده باع الصنف ده، بالكمية دي، بالمبلغ ده.",
          "Each weekly file has a sheet named Sales whose first row holds the headers: Date, InvoiceNo, BranchCode, ProductCode, Qty and Value. So each line says: on this day, invoice number this, this branch sold this product, in this quantity, for this amount."),
        u("لاحظ إن الشيت فيه أكواد بس، زي BR04 وP103، مش أسماء. الأسماء موجودة في الـ Masters. ولاحظ إن القيمة = الكمية × سعر الوحدة، والكمية ممكن تبقى سالبة لما يكون فيه مرتجع. الملاحظات الصغيرة دي هي اللي النموذج محتاج يعرفها.",
          "Notice the sheet holds only codes, like BR04 and P103, not names; the names live in Masters. And notice Value = Qty × unit price, and Qty can be negative when there's a return. These small notes are exactly what the model needs to know.")],
        answer: u("اوصف كل عمود: اسمه، ونوعه، وشكله، والقيم الغريبة اللي ممكن تيجي فيه. لأن النموذج ما بيعرفش إن السالب مرتجع إلا لو قلتله.", "Describe each column: its name, type, shape and the odd values it may hold — the model doesn't know a negative is a return unless you say so."),
        idea: u("كل عمود ليه حكاية… والنموذج محتاج يسمعها.", "Every column has a story… and the model needs to hear it.")
      },
      {
        id: "traps", art: "xk_traps", year: u("الفخاخ", "The traps"), mark: u("٠٧", "07"), era: u("عشر مشاكل متعمّدة", "Ten planted problems"),
        title: u("عشر مشاكل مستخبية… زي اللي بتقابلها كل شهر", "Ten hidden problems… like the ones you meet every month"),
        story: [u("الحقيبة مش نضيفة، ودي أهم ميزة فيها. في آخر Week_02 صف «الإجمالي». وفي Week_04 صفين متكررين. وفي Week_05 كود فرع بمسافة زيادة، وفي Week_06 كود بحروف صغيرة. وفي Week_07 عمود «ملاحظات» زيادة، وفي Week_09 التواريخ مكتوبة كنص.",
          "The kit isn't clean, and that's its most important feature. At the end of Week_02 sits a “Total” row. Week_04 has two duplicated rows. Week_05 has a branch code with a stray space, Week_06 one in lower case. Week_07 has an extra “Notes” column, and Week_09 has dates typed as text."),
        u("وفي Week_11 عمود الكمية اسمه مكتوب بشكل مختلف. وفيه صنف جديد مش في قايمة الأصناف، وصنف متسجّل مرتين بسعرين، وفرع مالوش هدف لشهر مارس. كل واحدة منهم لو عدّت من غير ما حد ياخد باله، بتغيّر رقم في التقرير.",
          "In Week_11 the quantity column is titled differently. There's a new product missing from the products list, a product listed twice with two prices, and a branch with no target for March. Any one of them, passing unnoticed, changes a figure in the report.")],
        answer: u("الأداة لازم تتجرّب على المشاكل، مش بعيد عنها. لأن الأداة بتتعرف وقت المشكلة: بتوقف وتقول، ولا بتكمّل وتغلط؟", "A tool must be tried on the problems, not away from them — a tool shows itself when trouble comes: does it stop and say so, or carry on and get it wrong?"),
        idea: u("الحقيبة النضيفة بتخبّي ضعف الأداة.", "A clean kit hides a tool's weakness.")
      },
      {
        id: "readme", art: "xk_readme", year: u("الوصف", "The description"), mark: u("٠٨", "08"), era: u("دليل البيانات", "The data dictionary"),
        title: u("دليل البيانات: الـ Context اللي الأداة محتاجاه", "The data dictionary: the Context a tool needs"),
        story: [u("فاكر ورقة الـ Context من درس الـ Prompt والـ Context؟ هنا ليها اسم: دليل البيانات. ملف README.txt في الحقيبة بيقول: أسماء الملفات، واسم كل شيت، والعناوين بالحرف، ونوع كل عمود، والقيم الغريبة اللي ممكن تيجي.",
          "Remember the context sheet from the lesson on the Prompt and the Context? Here it has a name: the data dictionary. README.txt in the kit says: the file names, each sheet's name, the headers letter for letter, each column's type, and the odd values that may appear."),
        u("الدليل ده هو اللي هيتلصق في الـ Prompt. والأهم: نفس الشكل ينفع لملفات شغلك الحقيقية. تكتب دليل لملفك، من غير ولا رقم، والنموذج يبني الأداة منه. كده بيانات الشركة فضلت على جهازك، والنموذج عرف كل اللي محتاجه.",
          "This dictionary is what gets pasted into the Prompt. More importantly, the same shape works for your real work files: you write a dictionary for your file, without a single figure, and the model builds the tool from it. Company data stays on your laptop, and the model knows everything it needs.")],
        answer: u("ابعت الوصف مش البيانات. لأن الأداة محتاجة تعرف شكل الملف، مش أرقامه.", "Send the description, not the data — a tool needs to know the file's shape, not its figures."),
        idea: u("الشكل للنموذج… والأرقام تفضل عندك.", "The shape goes to the model… the figures stay with you.")
      },
      {
        id: "rows", art: "xk_rows", year: u("المثال", "The example"), mark: u("٠٩", "09"), era: u("خمس صفوف متغيّرة", "Five changed rows"),
        title: u("خمس صفوف مثال… بأرقام متغيّرة", "Five example rows… with changed figures"),
        story: [u("الوصف لوحده ساعات مش كفاية: النموذج يفهم أحسن لما يشوف شكل السطر. فالمشرف بيضيف خمس صفوف مثال، بس بيغيّر الأرقام والأسماء: العميل «أحمد» يبقى «عميل ١»، والمبلغ يتغيّر، والكود يفضل بنفس الشكل.",
          "A description alone is sometimes not enough: the model understands better when it sees what a line looks like. So the supervisor adds five example rows, but changes the figures and names: customer “Ahmed” becomes “Customer 1”, the amount changes, and the code keeps its shape."),
        u("والذكاء هنا في اختيار الصفوف: سطر عادي، وسطر مرتجع بكمية سالبة، وسطر تاريخه مكتوب كنص لو ده بيحصل، وسطر كوده بشكل غريب. خمس صفوف بتعلّم النموذج أكتر من عشر صفحات وصف.",
          "The skill lies in choosing the rows: an ordinary line, a return with a negative quantity, a line whose date is typed as text if that happens, a line with an oddly shaped code. Five rows teach the model more than ten pages of description.")],
        answer: u("اختار الصفوف المثال من الحالات المختلفة، مش من أول الشيت. لأن أول خمس صفوف غالبًا عادية، والأداة محتاجة تشوف الغريب.", "Pick the example rows from different cases, not from the top of the sheet — the first five rows are usually ordinary, and the tool needs to see the odd ones."),
        idea: u("صف غريب واحد في المثال بيوفّر غلطة في الأداة.", "One odd row in the example saves one mistake in the tool.")
      },
      {
        id: "silent", art: "xk_rules", year: u("التحذير", "The warning"), mark: u("١٠", "10"), era: u("ما تلقّنش المشاكل", "Don't feed it the problems"),
        title: u("ما تقولش للنموذج المشاكل… اطلب قواعد عامة", "Don't tell the model the problems… ask for general rules"),
        story: [u("المشرف كان عارف المشاكل العشرة، وفكّر يكتبها في الـ Prompt: «في Week_02 صف إجمالي، شيله». بس افتكر إن الملف الحقيقي الشهر الجاي هيكون فيه مشكلة جديدة ما حدش يعرفها، والأداة اللي اتعلّمت عشر حالات بعينها هتعدّيها من غير ما تقول.",
          "The supervisor knew the ten problems and thought of writing them into the Prompt: “Week_02 has a totals row; remove it.” Then he remembered that next month's real file will hold a new problem nobody knows of, and a tool taught ten specific cases will let it pass silently."),
        u("فكتب قواعد عامة بدالها: «أي صف مفيهوش رقم فاتورة يتساب ويتسجّل»، «أي عمود ناقص أو اسمه مختلف، وقّف وسمّي الملف»، «أي كود مش في القايمة، طلّعه في شيت لوحده». القواعد دي بتمسك المشاكل العشرة… واللي بعدهم.",
          "So he wrote general rules instead: “any row without an invoice number is skipped and logged”, “any missing or renamed column: stop and name the file”, “any code missing from the list goes on a sheet of its own”. These rules catch the ten problems… and the ones after them.")],
        answer: u("اطلب قاعدة لكل نوع مشكلة، مش علاج لكل مشكلة. لأن القاعدة بتشتغل على ملفات ما شفتهاش لسه.", "Ask for a rule per kind of problem, not a fix per problem — a rule works on files you haven't seen yet."),
        idea: u("العلاج بيصلّح ملف… والقاعدة بتحمي كل الملفات.", "A fix repairs one file… a rule protects them all.")
      },
      {
        id: "key", art: "xk_key", year: u("المفتاح", "The key"), mark: u("١١", "11"), era: u("الإجابة المعروفة", "The known answer"),
        title: u("مفتاح الإجابة: بتفتحه بعد التشغيل، مش قبله", "The answer key: opened after the run, not before"),
        story: [u("في الحقيبة ملف اسمه Answer_key.txt فيه كل اللي الأداة الصح لازم تلاقيه: ١٬٣٠٤ صف اتقروا، وصف إجمالي اتساب، وصفين متكررين، و١٬٣٠٢ صف حقيقي، وإجمالي ٢٨٬٤٢٨٬١٥٠ جنيه، والصنف اللي ما اتربطش، ونسبة تحقيق كل فرع في كل شهر.",
          "The kit has a file named Answer_key.txt holding everything a correct tool must find: 1,304 rows read, a totals row skipped, two duplicates, 1,302 true rows, a total of EGP 28,428,150, the product that didn't match, and each branch's achievement each month."),
        u("القاعدة: ما تفتحوش قبل التشغيل، وما تديهوش للنموذج. لو الأداة شافت الإجابة، هتطلّعها حتى لو منطقها غلط. المفتاح ليك إنت، علشان تقارن بعد ما الأداة تخلص، رقم برقم.",
          "The rule: don't open it before the run, and don't give it to the model. A tool that saw the answer will produce it even if its logic is wrong. The key is for you, to compare after the tool finishes, figure by figure.")],
        answer: u("قارن نتيجة الأداة بإجابة معروفة اتحسبت بطريقة مستقلة. لأن الأداة اللي بتراجع نفسها بس ممكن تغلط مرتين بنفس الطريقة.", "Compare the tool's result with a known answer computed independently — a tool that only checks itself can make the same mistake twice."),
        idea: u("الإجابة المعروفة بتحوّل «شكلها صح» لـ «صح».", "A known answer turns “looks right” into “is right”.")
      },
      {
        id: "cliff", art: "xk_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("الكود في الشات", "Code in the chat"),
        title: u("الحقيبة جاهزة… والزميلة عندها سؤال", "The kit is ready… and a colleague has a question"),
        story: [u("المشرف نزّل الحقيبة، وفكّها في فولدر لوحده، وفتح Week_02 ولقى صف الإجمالي بعينه. وكان هيبدأ أول Prompt، لما زميلته في الحسابات عدّت عليه: «إحنا شغالين على Gemini Enterprise. طلبت منه أداة، كتبلي الكود في الرد، بس مفيش ملف أنزّله».",
          "The supervisor downloaded the kit, unzipped it into a folder of its own, opened Week_02 and found the totals row himself. He was about to write the first Prompt when his colleague from accounts stopped by: “We work on Gemini Enterprise. I asked it for a tool and it wrote the code in the reply, but there's no file to download.”"),
        u("وهو كمان كان متعوّد إن ChatGPT بيديه رابط ينزّل منه. يعني الطريقين مختلفين، والاتنين لازم يوصلوا لنفس النتيجة: ملف على اللابتوب يشتغل بدبل كليك. والسؤال اللي الدرس الجاي بيجاوبه: الكود اللي في الشات… يوصل لجهازك إزاي؟",
          "And he was used to ChatGPT giving him a link to download from. So the two paths differ, and both must reach the same result: a file on the laptop that runs with a double click. And the question the next lesson answers: the code in the chat… how does it reach your laptop?")],
        answer: u("واجب الدرس: نزّل الحقيبة، ودوّر على ٣ مشاكل بعينك قبل ما تقرا القايمة، واكتب دليل بيانات لملف من شغلك. لأن عينك هي أول اختبار لأي أداة.", "This lesson's task: download the kit, find 3 problems yourself before reading the list, and write a data dictionary for a file from your work — your own eye is the first test of any tool."),
        idea: u("البيانات جاهزة… فاضل الطريق للجهاز.", "The data is ready… the road to the laptop remains.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.kitStory]);
})(window.ACADEMY = window.ACADEMY || {});
