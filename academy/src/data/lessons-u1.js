/* Unit 1 — Guide 1: From the prompt to a complete work system (book pages 7–16). */
"use strict";
(function (A) {
  const bp = (p, ar, en) => ({ p, ar, en });
  const L = (k, ar, en) => ({ k, ar, en });
  A.lessons = (A.lessons || []).concat([
    {
      id: "p1", unit: "u1", pages: [7], diff: 1, min: 9, scene: "equation", lab: "prompt", related: ["f4", "p2", "p3", "d1"], pre: ["f4"],
      title: { ar: "المعادلة الحاكمة والعناصر الخمسة", en: "The governing equation and the five elements" },
      sum: { ar: "هدف واضح + سياق كافٍ + طلب محدد + شكل النتيجة = نتيجة قابلة للتنفيذ؛ والعناصر الخمسة لأي طلب ناجح.", en: "Clear goal + enough context + specific request + output format = an actionable result; and the five elements of any good request." },
      book: [
        bp(7, "معظم من يستخدمون الذكاء الاصطناعي اليوم يستخدمونه كمحرك بحث سريع: سؤال، فإجابة، ثم نسيان. **وهذا أضعف استخدام ممكن.**", "Most people use AI like a quick search engine: question, answer, forget. **That’s the weakest possible use.**"),
        bp(7, "الاستخدام الحقيقي يبدأ حين تتوقف عن طلب «إجابة» وتبدأ بطلب **نتيجة قابلة للتنفيذ**: خطة، أو قرار، أو أداة تعمل نيابة عنك.", "Real use begins when you stop asking for “an answer” and start asking for **an actionable result**: a plan, a decision, or a tool working for you."),
        bp(7, "المعادلة الحاكمة لكل برومبت ناجح: **هدف واضح + سياق كافٍ + طلب محدد + شكل النتيجة = نتيجة قابلة للتنفيذ**.", "The governing equation of every good prompt: **clear goal + enough context + specific request + output format = an actionable result**."),
        bp(7, "الفرق بين نتيجة عامة لا تفيد ونتيجة تغيّر قرارك ليس في الأداة، بل في **خمسة عناصر** تضعها في الطلب قبل أن ترسله: الهدف، السياق، الجمهور، شكل النتيجة، القيود والأمثلة.", "The difference between a useless generic result and one that changes your decision isn’t the tool but **five elements** you put in the request: goal, context, audience, output format, constraints and examples."),
        bp(7, "**الهدف**: لا «ساعدني في التقرير» بل «أريد معرفة سبب انخفاض المبيعات». **الجمهور**: شرح لمبتدئ يختلف جذريًا عن ملخص لمدير تنفيذي مشغول.", "**Goal**: not “help me with the report” but “I want to know why sales fell”. **Audience**: an explainer for a beginner is radically different from a summary for a busy executive."),
        bp(7, "**السياق**: الأداة لا تعرف عن عملك شيئًا إلا ما تخبرها به. **شكل النتيجة**: تحديده يوفّر جولة تعديل كاملة. **القيود**: الميزانية والوقت والأسلوب وأي مثال — القيد الواضح يمنع اقتراحات غير قابلة للتنفيذ في ظروفك.", "**Context**: the tool knows nothing about your work except what you tell it. **Format**: setting it saves a whole revision round. **Constraints**: budget, time, style and examples — a clear constraint prevents suggestions that can’t work in your situation."),
        bp(7, "كيف تستخدم الدليل: انسخ البرومبت كما هو، ثم غيّر ما بين الأقواس [ ] بمعطياتك الحقيقية. **لا تحفظ البرومبت؛ افهم هدفه أولًا**، فتستطيع تعديله لأي موقف مشابه.", "How to use the guide: copy the prompt as is, then replace what’s in [ ] with your real data. **Don’t memorise prompts; understand their purpose first**, so you can adapt them to any similar situation."),
      ],
      levels: {
        simple: [
          L("what", "**((prompt|البرومبت))** هو الطلب المكتوب الذي ترسله للأداة. والمعادلة تقول إن الطلب الجيد له أربعة أجزاء: **ماذا أريد** (هدف)، **ما وضعي** (سياق)، **ما المهمة بالضبط** (طلب محدد)، **كيف أريد النتيجة** (شكل). العناصر الخمسة تضيف إليها **الجمهور** و**القيود**.\n\nتشبيه: الطلب الضعيف مثل أن تقول لسائق تاكسي «وصّلني». والطلب القوي: «إلى مستشفى كذا، بأسرع طريق، لأن عندي موعدًا بعد 20 دقيقة».", "The **((prompt|prompt))** is the written request you send the tool. The equation says a good request has four parts: **what I want** (goal), **my situation** (context), **the exact task** (specific request), **how I want the result** (format). The five elements add **audience** and **constraints**.\n\nA weak prompt is like telling a taxi driver “take me somewhere”. A strong one: “to this hospital, fastest route, because my appointment is in 20 minutes.”"),
          L("why", "لأن الأداة لا تقرأ أفكارك. كل عنصر ناقص تملؤه بالتخمين — والتخمين يعطيك نتيجة صحيحة عمومًا لكنها لا تغيّر شيئًا في عملك.", "Because the tool can’t read your mind. Every missing element is filled by guessing — and guessing gives you something generally true that changes nothing at work."),
        ],
        mech: [
          L("how", "كل عنصر يغلق بابًا للتخمين:\n- **الهدف** يحدد ما الذي يُعدّ نجاحًا.\n- **السياق** يمنع حلولًا لشركة أخرى.\n- **الجمهور** يضبط المستوى واللغة والطول.\n- **الشكل** يحدد بنية المخرج من أول مرة.\n- **القيود والأمثلة** تستبعد ما لا يمكن تنفيذه.", "Each element closes a door to guessing:\n- **Goal** defines what success means.\n- **Context** prevents solutions for another company.\n- **Audience** sets level, language and length.\n- **Format** fixes the output’s structure first time.\n- **Constraints and examples** rule out the unworkable."),
          L("inside", "داخل النموذج، كل كلمة تكتبها جزء من ((context|السياق)) الذي يؤثر على كل قطعة يولّدها ([[f1]]). لذلك جملة واحدة مثل «لمدير مشغول، في صفحة واحدة» تغيّر الإجابة كلها: الطول والمفردات وترتيب الأفكار.", "Inside the model, every word you write is part of the ((context|context)) that shapes every piece it generates ([[f1]]). So one line like “for a busy manager, one page” changes the whole answer: length, vocabulary and order of ideas."),
          L("link", "هذه المعادلة هي أساس كل ما يليها في الكتاب: البرومبت الذهبي للكود ([[p10]]) ليس إلا معادلة مفصلة لبنية ملف، ومواصفة المهمة بالبايثون ([[y1]]) نسخة هندسية منها.", "This equation underpins everything after it: the golden code prompt ([[p10]]) is just a detailed equation for a file’s structure, and the Python task spec ([[y1]]) is an engineering version of it."),
        ],
        practice: [
          L("example", "**ضعيف**: «اكتب لي إعلان وظيفة».\n\n**قوي**: «أريد إعلان وظيفة لمشرف إنتاج (هدف). نحن مصنع أجهزة منزلية في العاشر من رمضان، ونحتاج خبرة 3 سنوات في الورديات (سياق). الجمهور: مهندسون حديثو الخبرة (جمهور). اكتبه في 5 نقاط وجملة افتتاحية (شكل). بلا مبالغات، وأقل من 120 كلمة (قيود)».", "**Weak**: “Write me a job ad.”\n\n**Strong**: “I want a job ad for a production supervisor (goal). We’re a home-appliance factory and need 3 years of shift experience (context). Audience: early-career engineers (audience). Write it as an opening line and 5 bullets (format). No hype, under 120 words (constraints).”"),
          L("apply", "خذ آخر طلب كتبته لأداة ذكاء اصطناعي، وأعد كتابته بالعناصر الخمسة في [[prompt|مختبر بناء البرومبت]] أدناه. لاحظ كيف ترتفع الدرجة وكيف يتغير شكل الرد.", "Take the last request you wrote to an AI tool and rewrite it with the five elements in the [[prompt|prompt builder lab]] below. Watch the score rise and the reply change shape."),
        ],
        adv: [
          L("mistakes", "- **الطول ليس جودة**: برومبت طويل بلا هدف واضح يظل ضعيفًا.\n- **وصف مبهم للبيانات**: «عندي جدول» بدل أسماء الأعمدة وأنواعها ([[p3]]).\n- **حفظ البرومبت بدل فهم هدفه**: فتفشل حين يتغير الموقف قليلًا.", "- **Length isn’t quality**: a long prompt with no clear goal is still weak.\n- **Vague data description**: “I have a table” instead of column names and types ([[p3]]).\n- **Memorising prompts instead of their purpose**: so they fail when the situation shifts."),
          L("whennot", "للأسئلة البسيطة جدًا («ما عاصمة كذا؟» أو «ترجم هذه الجملة») لا تحتاج العناصر الخمسة كاملة. استخدمها كاملة حين تكون النتيجة ستدخل في قرار أو تقرير أو عمل متكرر.", "For very simple questions (“what’s the capital of…?” or “translate this sentence”) you don’t need all five. Use them fully when the result feeds a decision, a report or recurring work."),
        ],
      },
      case: { field: { ar: "الموارد البشرية", en: "Human resources" }, title: { ar: "من «اكتب إعلانًا» إلى إعلان يجذب المرشح المناسب", en: "From “write an ad” to an ad that attracts the right candidate" },
        steps: {
          problem: { ar: "إعلانات الوظائف تجذب مئات المتقدمين غير المناسبين، فيضيع وقت الفرز.", en: "Job ads attract hundreds of unsuitable applicants, wasting screening time." },
          old: { ar: "نسخ إعلان قديم وتعديل المسمى فقط.", en: "Copy an old ad and change only the title." },
          idea: { ar: "برومبت بالعناصر الخمسة يحدد المرشح المطلوب بدقة والشروط التي تستبعد غير المناسبين.", en: "A five-element prompt that defines the target candidate precisely and the conditions that filter out the wrong ones." },
          steps: { ar: "1. الهدف: جذب مرشحين بخبرة ورديات.\n2. السياق: طبيعة المصنع والوردية والموقع.\n3. الجمهور: المهندسون حديثو الخبرة.\n4. الشكل: افتتاحية + 5 نقاط + طريقة التقديم.\n5. القيود: أقل من 120 كلمة، بلا مبالغة.", en: "1. Goal: attract candidates with shift experience.\n2. Context: the plant, the shift, the location.\n3. Audience: early-career engineers.\n4. Format: opener + 5 bullets + how to apply.\n5. Constraints: under 120 words, no hype." },
          result: { ar: "إعلان أوضح يقلل المتقدمين غير المناسبين (أثر متوقع، يُقاس بعدد السير المقبولة في الفرز الأول).", en: "A clearer ad that reduces unsuitable applicants (expected effect, measured by CVs passing first screening)." },
          risks: { ar: "راجع الإعلان بنفسك لتتأكد أنه لا يحتوي شروطًا تمييزية أو غير قانونية، وأن المزايا المذكورة حقيقية.", en: "Review the ad yourself to make sure it has no discriminatory or unlawful conditions and that the stated benefits are real." },
        } },
    },
    {
      id: "p2", unit: "u1", pages: [7], diff: 1, min: 5, scene: "technique", related: ["p1", "p3", "w2"], pre: ["p1"],
      title: { ar: "أقوى تقنية في الدليل", en: "The guide’s strongest technique" },
      sum: { ar: "جملة واحدة في بداية كل طلب مهم تعالج ثلاث مشكلات: الافتراضات الصامتة، والتعقيد، والأخطاء غير المختبرة.", en: "One sentence at the start of every important request fixes three problems: silent assumptions, complexity and untested errors." },
      book: [
        bp(7, "اجعلها بداية كل طلب مهم: «**قبل أن تعطيني الإجابة، اسألني عن أي معلومة ناقصة تحتاجها. وبعد أن أجيبك، أعطني أبسط حل ممكن، واشرحه لي ببساطة، واختبر الحالات الاستثنائية.**»", "Make it the start of every important request: “**Before you give me the answer, ask me about any missing information you need. After I reply, give me the simplest possible solution, explain it simply, and test the edge cases.**”"),
        bp(7, "لماذا هذه الجملة بالذات؟ لأنها تعالج ثلاث مشكلات دفعة واحدة: «اسألني عن الناقص» يجبر الأداة على **كشف افتراضاتها** بدل تخمينها بصمت.", "Why this sentence? It fixes three problems at once: “ask me what’s missing” forces the tool to **reveal its assumptions** instead of silently guessing."),
        bp(7, "و«أبسط حل ممكن» يمنع **التعقيد** الذي لن تستطيع صيانته أو فهمه لاحقًا.", "“The simplest possible solution” prevents **complexity** you won’t be able to maintain or understand later."),
        bp(7, "و«اختبر الحالات الاستثنائية» يكشف **الأخطاء** قبل أن تصل إلى تقرير الإدارة، لا بعده.", "“Test the edge cases” catches **errors** before they reach the management report, not after."),
      ],
      levels: {
        simple: [
          L("what", "جملة جاهزة تضعها في أول طلبك المهم. تقول للأداة: لا تخمّن — اسألني. ثم أعطني أبسط حل، واشرحه، واختبره على الحالات الصعبة.\n\nتشبيه: مثل طبيب جيد يسألك أسئلة قبل أن يكتب الدواء، بدل أن يكتب أشهر دواء لأي صداع.", "A ready sentence you put at the start of an important request. It tells the tool: don’t guess — ask me. Then give the simplest solution, explain it and test it on hard cases.\n\nLike a good doctor who asks questions before prescribing, instead of writing the most popular pill for any headache."),
          L("why", "لأن الأداة بطبعها تجيب فورًا، حتى لو كانت المعلومات ناقصة. هذه الجملة تحوّل الحوار من «إجابة سريعة» إلى «فهم ثم حل».", "Because by nature the tool answers immediately even when information is missing. This sentence turns the chat from “quick answer” into “understand, then solve”."),
        ],
        mech: [
          L("how", "الجملة تقسم المحادثة إلى جولتين:\n1. **جولة أسئلة**: الأداة تكشف ما تحتاجه (وهذا وحده يكشف افتراضات لم تنتبه لها).\n2. **جولة حل**: بعد إجابتك، حل بسيط + شرح + اختبار حالات حدّية (فراغ، صفر، تكرار، بيانات غير متوقعة).", "The sentence splits the chat into two rounds:\n1. **A question round**: the tool reveals what it needs (which alone exposes assumptions you missed).\n2. **A solution round**: after you reply, a simple fix + explanation + edge-case tests (blanks, zeros, duplicates, unexpected data)."),
          L("link", "الفكرة نفسها تتكرر في كل الكتاب: «الحالة الاستثنائية» أهم ما يُنسى في الطلبات (المسرد صفحة 15)، و«خمس حالات اختبار» جزء من البرومبت الذهبي للكود ([[p10]])، و«اسألني عن أي معلومة ناقصة» أول سطر في برومبت تأسيس تطبيق الويب ([[w6]]).", "The same idea recurs throughout: the “edge case” is what requests forget most (glossary, page 15), “five test cases” is part of the golden code prompt ([[p10]]), and “ask me about missing information” opens the web-app setup prompt ([[w6]])."),
        ],
        practice: [
          L("example", "طلبت من الأداة معادلة تحسب نسبة الإنجاز. بدون الجملة: تعطيك معادلة فورًا. معها: تسألك «هل يوجد مشاريع بلا هدف (صفر)؟ هل النسبة تتجاوز 100%؟ هل الخلايا الفارغة تعني صفرًا؟» — ثلاث حالات كانت ستكسر تقريرك.", "You ask for a completion-rate formula. Without the sentence: you get a formula at once. With it: “Are there projects with no target (zero)? Can it exceed 100%? Do blank cells mean zero?” — three cases that would have broken your report."),
          L("apply", "احفظ الجملة في مكان سريع الوصول (ملاحظة على هاتفك أو في «دفتري») وابدأ بها كل طلب مهم هذا الأسبوع — هذه هي مهمة الأسبوع الأول في [[p12|خطة الثلاثين يومًا]].", "Save the sentence somewhere handy (a phone note or “My notebook”) and start every important request with it this week — that’s week one of [[p12|the 30-day plan]]."),
        ],
        adv: [
          L("mistakes", "- **تجاهل أسئلة الأداة** والرد بـ«كمّل بأي افتراض»: تعود للتخمين.\n- **قبول «أبسط حل» دون اختبار**: البساطة بلا اختبار ليست أمانًا.", "- **Ignoring the tool’s questions** and replying “just assume something”: back to guessing.\n- **Accepting the “simplest solution” untested**: simplicity without testing isn’t safety."),
          L("whennot", "للمهام السريعة غير المهمة (صياغة رسالة قصيرة) قد تبطئك الجولة الإضافية. استخدمها حين يكون الخطأ مكلفًا: أرقام، كود، قرار، تقرير.", "For quick, low-stakes tasks (a short message) the extra round may slow you down. Use it when mistakes are costly: numbers, code, decisions, reports."),
        ],
      },
    },
    {
      id: "p3", unit: "u1", pages: [8], diff: 1, min: 6, related: ["p1", "p4", "p9"], pre: ["p1"],
      title: { ar: "أربعة أخطاء تُفسد النتيجة وثلاثة برومبتات تصلحها", en: "Four mistakes that ruin results, three prompts that fix them" },
      sum: { ar: "الوصف المبهم، وقبول أول إجابة، وتجاهل الحالات الناقصة، والتطبيق فورًا على الملف الحقيقي — وكيف تصلحها.", en: "Vague descriptions, accepting the first answer, ignoring missing cases, applying straight to the real file — and how to fix them." },
      book: [
        bp(8, "**وصف مبهم للمعطيات** — الخطأ: «عندي جدول مبيعات». الصواب: سمِّ الأعمدة بأسمائها الحقيقية، واذكر نوع كل عمود، وعدد الصفوف تقريبًا.", "**Vague data description** — wrong: “I have a sales table”. Right: name the real columns, state each column’s type and the approximate row count."),
        bp(8, "**قبول أول إجابة** — الخطأ: أخذ أول نتيجة والمضي بها. الصواب: اطلب نسخة أبسط، ثم قارن بين النسختين قبل الاعتماد.", "**Accepting the first answer** — wrong: taking the first result and running. Right: ask for a simpler version, then compare both before adopting."),
        bp(8, "**تجاهل الحالات الناقصة** — الخطأ: افتراض أن البيانات كاملة دائمًا. الصواب: حدّد سلفًا ماذا يحدث عند الخلية الفارغة أو القسمة على صفر.", "**Ignoring missing cases** — wrong: assuming data is always complete. Right: decide upfront what happens with a blank cell or division by zero."),
        bp(8, "**التطبيق فورًا على الملف الحقيقي** — الخطأ: تجربة النتيجة على بياناتك الأصلية. الصواب: جرّب على نسخة وبيانات صغيرة أولًا، ثم عمّم.", "**Applying straight to the real file** — wrong: trying the result on your original data. Right: test on a copy with small data first, then roll out."),
        bp(8, "ثلاثة برومبتات تحسّن أي طلب كتبته: **لتحسين برومبت ضعيف**، و**حين تكون النتيجة عامة ولا تفيد**، و**للتحقق قبل الاعتماد النهائي**.", "Three prompts that improve any request: **to improve a weak prompt**, **when the result is generic and useless**, and **to verify before final adoption**."),
      ],
      levels: {
        simple: [
          L("what", "أربعة أخطاء شائعة جدًا تجعل النتيجة سيئة حتى لو كانت الأداة قوية. والخبر الجيد: لكل خطأ تصحيح بسيط، ولكل نتيجة سيئة برومبت جاهز يصلحها.", "Four very common mistakes that spoil results even with a powerful tool. The good news: each has a simple fix, and each bad result has a ready prompt to repair it."),
          L("why", "لأن هذه الأخطاء صامتة: النتيجة تبدو جيدة، ثم تكتشف المشكلة في التقرير أو أمام المدير.", "Because these mistakes are silent: the result looks fine, then the problem shows up in the report or in front of the manager."),
        ],
        mech: [
          L("how", "كل خطأ يقابله مبدأ:\n- الوصف المبهم ← **الدقة** (أسماء وأنواع وأعداد).\n- أول إجابة ← **المقارنة** (نسخة أبسط ثم مقارنة).\n- الحالات الناقصة ← **التحديد المسبق** (ماذا يحدث عند الفراغ والصفر).\n- الملف الحقيقي ← **الأمان** (نسخة وبيانات صغيرة أولًا).", "Each mistake has a principle:\n- Vague description → **precision** (names, types, counts).\n- First answer → **comparison** (a simpler version, then compare).\n- Missing cases → **decide upfront** (what happens with blanks and zeros).\n- Real file → **safety** (a copy and small data first)."),
          L("link", "خطأ «الملف الحقيقي» يصبح لاحقًا قاعدة «لا تُكسر»: اعمل دائمًا على نسخة ([[p10]])، ثم قاعدة «لا تُمَسّ البيانات الأصلية» في أدوات البايثون ([[y2]]).", "The “real file” mistake later becomes an unbreakable rule: always work on a copy ([[p10]]), then “never touch the original data” in Python tools ([[y2]])."),
        ],
        practice: [
          L("example", "**قبل**: «عندي جدول مبيعات، اعمل لي تحليل».\n**بعد**: «جدول من 3 أعمدة: التاريخ (تاريخ)، الفرع (نص)، القيمة (رقم)، نحو 2000 صف. بعض القيم فارغة — اعتبرها غير متاحة لا صفرًا. اعمل التحليل على أول 50 صفًا أولًا».", "**Before**: “I have a sales table, analyse it.”\n**After**: “A 3-column table: date (date), branch (text), value (number), about 2,000 rows. Some values are blank — treat them as unavailable, not zero. Run the analysis on the first 50 rows first.”"),
          L("apply", "اختر أحد البرومبتات الثلاثة أسفل الدرس وطبّقه على نتيجة حصلت عليها هذا الأسبوع ولم تعجبك.", "Pick one of the three prompts below and apply it to a result you got this week and didn’t like."),
        ],
        adv: [
          L("mistakes", "- إصلاح الخطأ الرابع بالتعميم المبكر: جرّبت على 50 صفًا فنجحت، فعمّمت على 50 ألفًا فيها حالات لم تظهر في العينة. اختر عينة فيها الحالات الصعبة عمدًا.", "- Fixing mistake four by generalising too early: it worked on 50 rows, so you rolled out to 50,000 with cases the sample didn’t show. Pick a sample that deliberately includes hard cases."),
          L("whennot", "برومبت التحقق لا يغني عن تحققك أنت: الأداة قد تراجع نفسها وتؤكد خطأها. استخدمه لكشف الافتراضات، ثم تحقق من الأرقام المهمة بنفسك ([[f5]]).", "The verification prompt doesn’t replace your own check: the tool can review itself and confirm its own error. Use it to surface assumptions, then check important numbers yourself ([[f5]])."),
        ],
      },
    },
    {
      id: "p4", unit: "u1", pages: [8], diff: 1, min: 5, scene: "convo", related: ["p3", "p1", "t1"], pre: ["p1"],
      title: { ar: "إدارة المحادثة: ماذا تفعل حين لا تعجبك النتيجة؟", en: "Managing the conversation: what to do when you dislike the result" },
      sum: { ar: "أكبر فرق بين المبتدئ والمتمكن ليس في الطلب الأول بل فيما بعده: الدورة الخماسية وثلاث حالات شائعة.", en: "The biggest gap between beginner and skilled isn’t the first request but what follows: the five-step loop and three common situations." },
      book: [
        bp(8, "أكبر فرق بين مستخدم مبتدئ ومستخدم متمكن ليس في الطلب الأول، بل في ما يفعله بعده. **المبتدئ يبدأ محادثة جديدة، والمتمكن يصحح المسار في المحادثة نفسها.**", "The biggest difference between a beginner and a skilled user isn’t the first request but what they do next. **The beginner starts a new chat; the skilled user corrects course in the same chat.**"),
        bp(8, "الدورة: اطلب ← اقرأ بعين ناقدة ← حدّد الخلل بدقة ← صحّح في المحادثة نفسها ← اعتمد أو كرّر.", "The loop: ask → read critically → pinpoint the flaw → correct in the same chat → adopt or repeat."),
        bp(8, "النتيجة طويلة ومشتتة؟ قل: «اختصرها إلى نصف الطول مع الحفاظ على كل نقطة قابلة للتنفيذ، واحذف كل ما هو تمهيد أو تكرار».", "Long and scattered? Say: “Cut it to half the length while keeping every actionable point, and delete all preamble and repetition.”"),
        bp(8, "النتيجة صحيحة لكنها لا تناسبك؟ قل: «هذا صحيح عمومًا، لكن وضعي يختلف في [حدّد الفرق]. أعد الحل بناءً على هذا القيد تحديدًا».", "Correct but not right for you? Say: “This is generally right, but my situation differs in [state the difference]. Redo the solution based on that constraint.”"),
        bp(8, "النتيجة تبدو مخترَعة؟ قل: «اذكر لكل رقم أو ادعاء مصدره، وميّز بوضوح ما أنت واثق منه عمّا هو ترجيح منك».", "Looks made up? Say: “Give the source for every number or claim, and clearly separate what you’re sure of from what you’re guessing.”"),
      ],
      levels: {
        simple: [
          L("what", "حين لا تعجبك الإجابة، لا تغلق المحادثة. اقرأها، حدّد ما الخطأ بالضبط، واطلب التعديل في نفس المحادثة.\n\nتشبيه: مثل خيّاط يجرب عليك البدلة — لا ترميها وتذهب لخيّاط آخر، بل تقول له «الكم أطول بقليل».", "When you don’t like the answer, don’t close the chat. Read it, pinpoint exactly what’s wrong, and ask for the fix in the same chat.\n\nLike a tailor fitting a suit — you don’t throw it away for another tailor; you say “the sleeve is a bit long”."),
          L("why", "لأن المحادثة الحالية تحمل كل السياق الذي بنيته. المحادثة الجديدة تبدأ من الصفر فتعيد نفس الأخطاء.", "Because the current chat holds all the context you built. A new chat starts from zero and repeats the same mistakes."),
        ],
        mech: [
          L("how", "السر في الخطوة الثالثة: **حدّد الخلل بدقة**. «لم يعجبني» لا تفيد الأداة. «طويلة»، «لا تناسب ميزانيتي البالغة كذا»، «الرقم الثالث بلا مصدر» — هذه تعليمات قابلة للتنفيذ.", "The secret is step three: **pinpoint the flaw**. “I don’t like it” helps nothing. “Too long”, “doesn’t fit my budget of X”, “the third number has no source” — those are actionable instructions."),
          L("inside", "كل رد منك يُضاف إلى نافذة السياق، فيعدّل الأداة اتجاهها بناءً على ملاحظتك الدقيقة مع الاحتفاظ بما سبق ([[f1]]).", "Every reply you send is added to the context window, so the tool adjusts course based on your precise note while keeping everything before it ([[f1]])."),
        ],
        practice: [
          L("example", "طلبت خطة تسويق فجاءت بإعلانات تلفزيونية. بدل محادثة جديدة: «هذا صحيح عمومًا، لكن ميزانيتي 20 ألف جنيه فقط ولا أستخدم التلفزيون. أعد الخطة بناءً على هذا القيد».", "You asked for a marketing plan and got TV ads. Instead of a new chat: “This is generally right, but my budget is only EGP 20,000 and I don’t use TV. Redo the plan based on this constraint.”"),
          L("apply", "في [[prompt|مختبر البرومبت]] افتح تبويب «صحّح النتيجة» وانسخ الجملة المناسبة لآخر نتيجة لم تعجبك.", "In the [[prompt|prompt lab]] open the “Fix the result” tab and copy the right sentence for the last result you didn’t like."),
        ],
        adv: [
          L("mistakes", "- **تكرار نفس الطلب بصياغة أخرى** بدل تحديد الخلل.\n- **محادثة طويلة جدًا** تتشتت فيها التعليمات القديمة — عند ذلك لخّص ما اتفقتما عليه وابدأ بهذا الملخص.", "- **Repeating the same request in other words** instead of naming the flaw.\n- **A very long chat** where old instructions get diluted — then summarise what you agreed and start from that summary."),
          L("whennot", "ابدأ محادثة جديدة حين يتغير الموضوع كليًا، أو حين تراكمت معلومات خاطئة في المحادثة الحالية يصعب إلغاؤها.", "Start a new chat when the topic changes completely, or when wrong information has piled up in the current one and is hard to undo."),
        ],
      },
    },
    {
      id: "p5", unit: "u1", pages: [8, 9, 10], diff: 1, min: 9, scene: "daily", related: ["p4", "p6", "p12"], pre: ["p1"],
      title: { ar: "برومبتات الإنتاجية وإدارة العمل اليومي", en: "Productivity prompts and running your day" },
      sum: { ar: "تنظيم اليوم والاجتماعات والمهام والكتابة المهنية والبحث والمتابعة والتحسين والتفويض والفرز، والبرومبت الشامل.", en: "Organising the day, meetings, tasks, professional writing, research, follow-up, process improvement, delegation, triage and the all-in-one prompt." },
      book: [
        bp(8, "برومبتات عملية تساعدك على التنظيم والمتابعة والإنجاز وإدارة الاجتماعات بوضوح وسرعة — **لا تطلب إجابة فقط، بل اطلب نتيجة قابلة للتنفيذ**.", "Practical prompts for organising, following up, getting things done and running meetings clearly and quickly — **don’t ask for an answer only, ask for an actionable result**."),
        bp(8, "**تنظيم اليوم**: ترتيب المهام حسب الأولوية والوقت والطاقة الذهنية مع أول ثلاث مهام وسبب كل اختيار، وتقسيم اليوم إلى فترات تركيز عميق وراحة ومتابعة.", "**Organising the day**: ranking tasks by priority, time and mental energy with the first three tasks and why, and splitting the day into deep focus, rest and follow-up blocks."),
        bp(8, "**الاجتماعات**: قبل الاجتماع أجندة بهدف وقرارات مطلوبة ومن يحضر فعلًا، وبعده (صفحة 9) محضر مرتب بملخص تنفيذي وقرارات ونقاط متابعة بمسؤول وموعد.", "**Meetings**: before, an agenda with goal, required decisions and who must attend; after (page 9), tidy minutes with an executive summary, decisions and follow-ups with owner and date."),
        bp(9, "**المهام والمشروعات**: من هدف إلى مهام بمسؤول وموعد ومعيار إنجاز. **الكتابة المهنية**: رسالة واضحة تنتهي بطلب، ورسالة إقناع تبدأ بما يهم المستقبِل.", "**Tasks and projects**: from goal to tasks with owner, date and done-criterion. **Professional writing**: a clear message ending in a request, and a persuasive one starting with what matters to the reader."),
        bp(9, "**البحث**: استخراج منظم يفرّق بين الحقيقة والرأي والافتراض. **المتابعة**: تقرير يقارن الخطة بالإنجاز. **تحسين العمليات**: نقاط الضعف والهدر وما يمكن أتمتته. **التفويض**: نص تكليف بالنتيجة والصلاحيات ومعيار القبول، ومتابعة دون إزعاج.", "**Research**: structured extraction separating fact, opinion and assumption. **Follow-up**: plan vs. achieved. **Process improvement**: weak points, waste and what can be automated. **Delegation**: a brief with result, authority and acceptance criteria, and gentle follow-up."),
        bp(10, "**الفرز السريع**: أربع فئات — رد اليوم، تفويض، تأجيل آمن، تجاهل — مع رد جاهز لكل بند عاجل. و**البرومبت الشامل للإنتاجية** حين لا تعرف من أين تبدأ.", "**Quick triage**: four groups — reply today, delegate, safely postpone, ignore — with a ready reply for each urgent item. And the **all-in-one productivity prompt** when you don’t know where to start."),
        bp(10, "دورة العمل اليومية: افهم (الهدف والسياق) ← نظّم (رتّب المعلومات) ← قرّر (قارن واختر) ← نفّذ (حوّلها إلى خطوات) ← راجع (حلّل وكرّر).", "The daily cycle: understand (goal and context) → organise (arrange information) → decide (compare and choose) → execute (turn into steps) → review (analyse and repeat)."),
      ],
      levels: {
        simple: [
          L("what", "مجموعة برومبتات جاهزة لأكثر ما يأكل يومك: ترتيب المهام، والاجتماعات، والرسائل، والمتابعة، والتفويض، وفرز البريد. كل برومبت يطلب **شيئًا تستطيع تنفيذه فورًا**: جدول، محضر، رسالة جاهزة، خطة.", "Ready prompts for what eats your day most: task ranking, meetings, messages, follow-up, delegation and inbox triage. Each asks for **something you can act on immediately**: a schedule, minutes, a ready message, a plan."),
          L("why", "لأن هذه المهام صغيرة لكنها متكررة يوميًا، وتوفير 10 دقائق في كل واحدة يعني ساعات في الأسبوع — هدف الأسبوع الثاني في خطة الكتاب: **توفير ساعة واحدة على الأقل أسبوعيًا**.", "Because these tasks are small but daily, and saving 10 minutes on each adds up to hours a week — the book’s week-two goal: **save at least one hour a week**."),
        ],
        mech: [
          L("how", "انظر إلى بنية أي برومبت في هذا القسم: معطياتك بين أقواس + **معايير واضحة** (الأولوية، الوقت، الطاقة) + **شكل المخرج** (جدول زمني، محضر بأقسام محددة) + **سؤال يكشف المخاطر** (ما يمكن تأجيله بأمان، ما لم يُحسم بعد).", "Look at the structure of any prompt here: your data in brackets + **clear criteria** (priority, time, energy) + **output shape** (a timetable, minutes with set sections) + **a risk-revealing question** (what can safely wait, what’s still undecided)."),
          L("link", "كلها تطبيقات للمعادلة الحاكمة ([[p1]])، ودورة العمل اليومية هي نسخة يومية من الترتيب الاستراتيجي ([[p7]]): افهم قبل أن تقرر.", "They’re all applications of the governing equation ([[p1]]), and the daily cycle is a daily version of the strategic order ([[p7]]): understand before deciding."),
        ],
        practice: [
          L("example", "**مدير إداري** بعد اجتماع ساعتين معه ملاحظات مبعثرة: يلصقها في برومبت «بعد الاجتماع»، فيحصل على ملخص من ثلاثة أسطر، والقرارات، وجدول متابعة بالمسؤول والموعد، والمسائل المعلقة — يرسله للحضور في 5 دقائق بدل ساعة.", "**An admin manager** leaves a two-hour meeting with scattered notes, pastes them into the “after the meeting” prompt and gets a three-line summary, decisions, a follow-up table with owners and dates, and open issues — sent to attendees in 5 minutes instead of an hour."),
          L("apply", "اختر برومبتين فقط من القائمة أسفل الدرس (مثل ترتيب المهام وما بعد الاجتماع) وطبّقهما يوميًا لمدة أسبوع. قِس الوقت الذي وفّرته.", "Pick just two prompts below (e.g. task ranking and after-the-meeting) and use them daily for a week. Measure the time saved."),
        ],
        adv: [
          L("mistakes", "- **لصق ملاحظات بها أسماء وبيانات حساسة** دون مراجعة سياسة الشركة.\n- **إرسال المحضر دون مراجعة**: الأداة قد تنسب قرارًا لغير صاحبه.\n- **استخدام كل البرومبتات مرة واحدة**: تشتت. ابدأ باثنين.", "- **Pasting notes with names and sensitive data** without checking company policy.\n- **Sending minutes unreviewed**: the tool may attribute a decision to the wrong person.\n- **Using every prompt at once**: scatter. Start with two."),
          L("whennot", "قرارات الأولوية التي تمس أشخاصًا (تقييم، تكليف حساس) تبقى قرارك؛ استخدم البرومبت لترتيب أفكارك لا لإصدار الحكم.", "Priority decisions that affect people (evaluation, sensitive assignments) stay yours; use the prompt to organise your thinking, not to pass judgement."),
        ],
      },
      case: { field: { ar: "الإدارة", en: "Administration" }, title: { ar: "صباح مدير بخمسين رسالة وثلاثة اجتماعات", en: "A manager’s morning: fifty messages and three meetings" },
        steps: {
          problem: { ar: "خمسون رسالة وطلبًا يصلون صباحًا، وثلاثة اجتماعات، ولا يعرف من أين يبدأ.", en: "Fifty messages and requests arrive each morning, plus three meetings, and no idea where to start." },
          old: { ar: "يقرأ الرسائل بالترتيب، فيرد على السهل ويؤجل المهم حتى آخر اليوم.", en: "Reads messages in order, answers the easy ones and pushes the important ones to the end of the day." },
          idea: { ar: "الفرز السريع بأربع فئات، ثم ترتيب المهام بالطاقة الذهنية، ثم أجندة مختصرة لكل اجتماع.", en: "Quick triage into four groups, then ranking tasks by mental energy, then a short agenda per meeting." },
          steps: { ar: "1. يلصق الرسائل في برومبت الفرز.\n2. يأخذ الفئة الأولى مع ردودها الجاهزة ويراجعها.\n3. يرتب مهام اليوم مع ارتباطاته الثابتة.\n4. يحوّل موضوع كل اجتماع إلى أجندة.", en: "1. Paste messages into the triage prompt.\n2. Take group one with its ready replies and review them.\n3. Rank today’s tasks around fixed commitments.\n4. Turn each meeting topic into an agenda." },
          result: { ar: "يبدأ يومه بأهم ثلاث مهام وردود عاجلة جاهزة للمراجعة (الوقت الموفّر يختلف من شخص لآخر؛ قِسه بنفسك).", en: "Starts the day with the top three tasks and urgent replies ready to review (time saved varies; measure your own)." },
          risks: { ar: "لا ترسل أي رد جاهز قبل قراءته؛ والرسائل السرية لا تُلصق في أداة غير معتمدة من شركتك.", en: "Never send a ready reply before reading it; confidential messages don’t go into a tool your company hasn’t approved." },
        } },
    },
    {
      id: "p6", unit: "u1", pages: [10, 11], diff: 2, min: 8, related: ["p5", "p7", "y4"], pre: ["p1"],
      title: { ar: "البرومبتات الاستراتيجية: الفهم والتشخيص والأولويات", en: "Strategic prompts: understanding, diagnosis and priorities" },
      sum: { ar: "القسم السابق يساعدك على إنجاز العمل؛ هذا القسم يساعدك على معرفة أي عمل يستحق الإنجاز أصلًا.", en: "The previous section helps you get work done; this one helps you know which work is worth doing at all." },
      book: [
        bp(10, "القسم السابق يساعدك على إنجاز العمل. وهذا القسم يساعدك على **معرفة أي عمل يستحق الإنجاز أصلًا** — وهو فرق جوهري.", "The previous section helps you get work done. This one helps you **know which work is worth doing at all** — a fundamental difference."),
        bp(10, "**الفهم والتعلم**: تعلّم موضوع من الصفر بالصورة الكبيرة أولًا ثم العناصر ثم مثال واختبار، وتثبيت ما تعلمته بأسئلة تختبر الفهم والتطبيق لا الحفظ.", "**Understanding and learning**: learn a topic from zero — big picture first, then elements, then an example and a quiz — and consolidate with questions that test understanding and application, not memory."),
        bp(10, "**التحليل والتشخيص**: تفكيك المشكلة إلى عناصرها والأسباب الجذرية المحتملة مرتبة بالاحتمال والتأثير، وكشف الأنماط الخفية مع شرح لماذا يستحق كل نمط الانتباه.", "**Analysis and diagnosis**: break the problem into its elements and likely root causes ranked by probability and impact, and reveal hidden patterns with why each deserves attention."),
        bp(10, "**مقارنة خيارين** من حيث التكلفة والوقت والمخاطر والعائد وسهولة التنفيذ و**قابلية التراجع عن القرار لاحقًا**، في جدول مع توصية وسببها.", "**Comparing two options** by cost, time, risk, return, ease and **how reversible the decision is**, in a table with a recommendation and its reason."),
        bp(10, "**ترتيب الأولويات** بمعايير قوة التأثير والاستعجال والجهد والمخاطر المترتبة على التأجيل: ما أبدأ به ولماذا، وما يُؤجَّل بأمان، وما يُلغى دون خسارة.", "**Prioritising** by impact, urgency, effort and the risk of delay: what to start with and why, what can safely wait, what can be dropped."),
        bp(11, "**القرار المدروس**: افهم هدفي وقيودي أولًا، ثم البدائل ومزايا ومخاطر كل بديل، ثم أوصِ بأفضل قرار مع ما الذي قد يجعلني أغيّره لاحقًا.", "**A considered decision**: understand my goal and constraints first, then the options with pros and risks, then recommend the best with what might make me change it later."),
      ],
      levels: {
        simple: [
          L("what", "برومبتات تجعل الأداة **شريك تفكير** لا آلة كتابة: تشرح لك موضوعًا جديدًا، وتفكك مشكلة، وتقارن خيارين، وترتب أولوياتك، وتساعدك في قرار.", "Prompts that make the tool a **thinking partner** rather than a typewriter: explaining a new topic, breaking down a problem, comparing two options, ranking priorities and helping with a decision."),
          L("why", "لأن إنجاز المهمة الخطأ بسرعة أسوأ من إنجاز المهمة الصحيحة ببطء. هذه البرومبتات تحمي وقتك من العمل الذي لا يستحق.", "Because doing the wrong task fast is worse than doing the right one slowly. These prompts protect your time from work that isn’t worth it."),
        ],
        mech: [
          L("how", "كل برومبت يفرض **معايير صريحة**: الاحتمال والتأثير في التشخيص، والتكلفة والعائد وقابلية التراجع في المقارنة، والاستعجال والجهد في الأولويات. المعايير الصريحة تمنع الأداة من الحكم بالانطباع.", "Each prompt imposes **explicit criteria**: probability and impact in diagnosis; cost, return and reversibility in comparison; urgency and effort in priorities. Explicit criteria stop the tool from judging by impression."),
          L("inside", "لاحظ معيار «**قابلية التراجع**»: قرار يمكن التراجع عنه بسهولة تستطيع اتخاذه أسرع، وقرار لا رجعة فيه يستحق تحليلًا أعمق. هذا معيار يغفل عنه كثيرون.", "Notice “**reversibility**”: a decision you can easily undo can be made faster; an irreversible one deserves deeper analysis. Many people forget this criterion."),
          L("link", "برومبت «تفكيك مشكلة» هو البذرة التي تنمو لاحقًا إلى «الأسئلة السبعة» في التحليل بالبايثون ([[y4]]).", "The “break down a problem” prompt is the seed of the “seven questions” in Python analysis ([[y4]])."),
        ],
        practice: [
          L("example", "مسؤول مشتريات بين موردين: يطلب مقارنة في جدول بالتكلفة ووقت التوريد والمخاطر والجودة وقابلية التراجع (عقد سنة أم شهر؟). التوصية تأتي بسبب واضح، ويستطيع عرضها على مديره.", "A purchasing officer choosing between two suppliers asks for a table by cost, lead time, risk, quality and reversibility (one-year vs monthly contract). The recommendation comes with a clear reason they can show their manager."),
          L("apply", "خذ قائمة مهامك المؤجلة وطبّق عليها برومبت «ترتيب الأولويات». ما الذي يمكن إلغاؤه تمامًا دون خسارة؟", "Run your backlog through the prioritising prompt. What can be dropped entirely with no loss?"),
        ],
        adv: [
          L("mistakes", "- طلب «أفضل قرار» دون ذكر الهدف والقيود: أفضل قرار لمن؟\n- قبول ترتيب الأسباب كحقيقة: هي **فرضيات** تحتاج تأكيدًا — لذلك يطلب البرومبت «ما الذي نحتاج معرفته للتأكد من كل سبب».", "- Asking for “the best decision” without goal and constraints: best for whom?\n- Taking the ranked causes as fact: they’re **hypotheses** to confirm — hence the prompt asks “what we need to know to confirm each cause”."),
          L("whennot", "حين تكون البيانات شبه معدومة، لا تطلب قرارًا بل ابدأ ببرومبت «المعلومات الناقصة» ([[p7]]).", "When data is almost absent, don’t ask for a decision; start with the “missing information” prompt ([[p7]])."),
        ],
      },
    },
    {
      id: "p7", unit: "u1", pages: [11], diff: 2, min: 8, scene: "strategic", related: ["p6", "s2", "y4"], pre: ["p6"],
      title: { ar: "السيناريوهات وتحدي الأفكار والبرومبت الاستراتيجي الشامل", en: "Scenarios, challenging ideas and the all-in-one strategic prompt" },
      sum: { ar: "ثلاثة سيناريوهات، اكتشاف نقاط الفشل مسبقًا، «لا توافقني تلقائيًا»، المعلومات الناقصة، والبرومبت الذي يفرض ترتيبًا لا يمكن القفز فوقه.", "Three scenarios, a pre-mortem, “don’t just agree with me”, missing information, and the prompt that enforces an order you can’t skip." },
      book: [
        bp(11, "**ثلاثة سيناريوهات**: متفائل وواقعي ومتحفظ، ولكل سيناريو العلامات المبكرة التي تشير إليه وما أفعله فور ظهورها.", "**Three scenarios**: optimistic, realistic and cautious, each with the early signs pointing to it and what to do when they appear."),
        bp(11, "**اكتشاف نقاط الفشل مسبقًا**: راجع الخطة كما لو كنت مسؤولًا عن كشف نقاط فشلها قبل التنفيذ — المخاطر والثغرات والافتراضات الخطرة مرتبة بالخطورة مع وقاية أو خطة بديلة.", "**Pre-mortem**: review the plan as if responsible for exposing its failure points before execution — risks, gaps and dangerous assumptions ranked by severity with prevention or a fallback."),
        bp(11, "**اختبار فكرة**: «**لا توافقني تلقائيًا**. اختبر فكرتي…» — نقاط الضعف والافتراضات غير المعلنة، ثم — وبعد النقد فقط — كيف تُحسَّن. و**توليد بدائل أبسط** مع ما نتنازل عنه مقابل البساطة.", "**Testing an idea**: “**Don’t automatically agree with me.** Test my idea…” — weaknesses and unstated assumptions, then — only after critique — how to improve it. And **simpler alternatives** with what we give up for simplicity."),
        bp(11, "**التخطيط والمراجعة**: من هدف إلى خطة بمراحل وأول خطوة صغيرة تُنفذ خلال ساعة، والتعلم من التجربة بتحويل الدروس إلى تحسينات عملية لا ملاحظات عامة.", "**Planning and review**: from goal to a phased plan with a first step small enough to do within an hour, and learning from experience by turning lessons into concrete improvements, not general notes."),
        bp(11, "**المعلومات الناقصة**: ما يمكن استنتاجه بثقة، وما لا يمكن الجزم به، وترتيب الناقص حسب أثره على القرار، ثم أرخص وأسرع طريقة للحصول على المعلومة الأولى فقط.", "**Missing information**: what can be concluded with confidence, what can’t, the gaps ranked by impact on the decision, then the cheapest, fastest way to get just the first one."),
        bp(11, "**البرومبت الاستراتيجي الشامل** يعمل لأنه يفرض ترتيبًا لا يمكن القفز فوقه: الفهم ← التحليل ← التشخيص ← المخاطر ← البدائل ← القرار ← الخطوات. **أغلب القرارات السيئة تنشأ من البدء بالحل قبل فهم المشكلة.**", "**The all-in-one strategic prompt** works because it enforces an order you can’t skip: understand → analyse → diagnose → risks → options → decision → steps. **Most bad decisions come from starting with the solution before understanding the problem.**"),
      ],
      levels: {
        simple: [
          L("what", "أدوات تفكير متقدمة: تخيّل ثلاثة مستقبلات محتملة، واكشف أين ستفشل خطتك قبل أن تبدأ، واطلب من الأداة أن **تنتقدك لا أن تجاملك**، واعرف ما الذي ينقصك قبل أن تقرر.", "Advanced thinking tools: imagine three possible futures, find where your plan will fail before you start, ask the tool to **critique rather than flatter you**, and know what you’re missing before deciding."),
          L("why", "لأن الأدوات تميل للموافقة على ما تقوله. جملة «لا توافقني تلقائيًا» تكسر هذا الميل، والبرومبت الشامل يمنعك أنت من القفز إلى الحل.", "Because tools tend to agree with you. “Don’t automatically agree with me” breaks that tendency, and the all-in-one prompt stops you jumping to the solution."),
        ],
        mech: [
          L("how", "البرومبت الشامل يقسم التفكير إلى سبع محطات بترتيب إلزامي، ويطلب في النهاية **فصل الحقائق عن الافتراضات** وذكر الناقص قبل البدء. بهذا لا يستطيع أحد — لا أنت ولا الأداة — أن يقفز للحل.", "The all-in-one prompt splits thinking into seven mandatory stations and finally asks to **separate facts from assumptions** and state gaps before starting. So nobody — you or the tool — can jump to the solution."),
          L("inside", "في «المعلومات الناقصة» فكرة ذكية: **ليست كل معلومة ناقصة مهمة**. بعضها يغيّر القرار جذريًا، وبعضها «لطيف معرفته». والحل: ابدأ بأرخص طريقة للحصول على الأهم فقط.", "“Missing information” has a smart idea: **not every gap matters**. Some change the decision radically; some are “nice to know”. The fix: get only the most important one, the cheapest way."),
          L("link", "نفس الترتيب الإلزامي يظهر في التحليل بالبايثون (الجودة ثم الأسئلة ثم الرسم — [[y4]]) وفي بناء النظام (ارسم الحالة ثم وحّد التعريفات ثم ابنِ — [[s2]]).", "The same mandatory order appears in Python analysis (quality, then questions, then charts — [[y4]]) and in building systems (map the current state, unify definitions, then build — [[s2]])."),
        ],
        practice: [
          L("example", "مدير مصنع يفكر في إضافة وردية ثالثة. البرومبت الشامل يجبره أولًا على فهم الطلب الحقيقي، ثم تشخيص سبب نقص الإنتاج (قد يكون توقفات لا نقص ساعات!)، ثم المخاطر والبدائل، فيكتشف أن تقليل التوقفات أرخص من وردية جديدة.", "A plant manager considers a third shift. The all-in-one prompt forces him to understand real demand first, diagnose why output is short (it may be stoppages, not hours!), then risks and options — revealing that cutting stoppages is cheaper than a new shift."),
          L("apply", "طبّق «اكتشاف نقاط الفشل مسبقًا» على خطة تعمل عليها الآن. اختر أخطر ثلاث نقاط واكتب لكل واحدة وقاية بسيطة.", "Apply the pre-mortem to a plan you’re working on. Take the three most dangerous points and write a simple prevention for each."),
        ],
        adv: [
          L("mistakes", "- **طلب النقد ثم الدفاع عن الفكرة**: الهدف أن تسمع لا أن تنتصر.\n- **سيناريوهات بلا علامات مبكرة**: سيناريو لا تعرف متى يبدأ لا يفيدك في التصرف.", "- **Asking for critique then defending the idea**: the aim is to listen, not to win.\n- **Scenarios without early signs**: a scenario you can’t detect starting doesn’t help you act."),
          L("whennot", "للقرارات الصغيرة القابلة للتراجع، البرومبت الشامل مبالغة؛ يكفي برومبت مقارنة سريع. احفظه للقرارات الكبيرة الغامضة.", "For small, reversible decisions the all-in-one prompt is overkill; a quick comparison is enough. Keep it for big, ambiguous decisions."),
        ],
      },
    },
    {
      id: "p8", unit: "u1", pages: [12, 13], diff: 2, min: 10, scene: "brain", lab: "brain", related: ["f1", "p11", "s1"], pre: ["p1"],
      title: { ar: "العقل الثاني: من ملفات مبعثرة إلى نظام معرفة", en: "The second brain: from scattered files to a knowledge system" },
      sum: { ar: "NotebookLM: تحدد المعرفة المسموح للذكاء الاصطناعي أن يفكر عليها، وتأتي كل إجابة باستشهاد يرجعك للمصدر.", en: "NotebookLM: you set the knowledge AI may think with, and every answer comes with a citation back to the source." },
      book: [
        bp(12, "**جيميني نوتبوك (NotebookLM)**: أداة تتيح لك أن تحدد بالضبط المعرفة المسموح للذكاء الاصطناعي أن يفكر عليها — وهنا تبدأ قيمتها الحقيقية.", "**NotebookLM**: a tool that lets you define exactly the knowledge AI may think with — and that’s where its real value begins."),
        bp(12, "**المبدأ**: تنشئ «دفترًا» لموضوع أو مشروع وتضع فيه المصادر التي تثق بها، فتأتي كل الإجابات منها وحدها. **الفارق**: المساعد العادي قد يخلط مصادرك بالبحث الخارجي. **الضمانة**: كل إجابة مصحوبة باستشهادات ترجعك إلى المكان الأصلي فتتحقق بنفسك.", "**Principle**: you create a “notebook” for a topic or project with sources you trust, and every answer comes only from them. **Difference**: an ordinary assistant may mix your sources with outside search. **Guarantee**: every answer carries citations back to the original place so you can verify."),
        bp(12, "يقبل الملفات النصية والمستندات والعروض والجداول والصور والكتب الإلكترونية وصفحات الويب والفيديوهات والتسجيلات الصوتية ومستندات السحابة — وملفات السحابة المستوردة **تتزامن تلقائيًا** عند تغيّر الأصل.", "It accepts text files, documents, slides, spreadsheets, images, e-books, web pages, videos, audio and cloud documents — and imported cloud files **sync automatically** when the original changes."),
        bp(12, "ينتج: تقارير، وجداول بيانات، وخرائط ذهنية، وعروضًا وشرائح، وبطاقات واختبارات، وملخصات صوتية (أكثر من 80 لغة منها العربية)، وملخصات فيديو، وصورًا ورسومًا.", "It produces reports, data tables, mind maps, slides, flashcards and quizzes, audio overviews (80+ languages including Arabic), video overviews, and images and graphics."),
        bp(12, "عشر قواعد: دفتر واحد = هدف واحد · ابدأ بالمصادر الأصلية · البحث للاكتشاف لا للتصديق · اختر المصادر قبل كل سؤال · اسأل أسئلة أقوى من «لخّص» · اجعل السؤال الأخير ثابتًا · الخريطة الذهنية أولًا · لكل مخرج وظيفته · لا تحوّل استنتاجًا إلى مصدر قبل مراجعته · حدّث المصادر باستمرار.", "Ten rules: one notebook = one goal · start with primary sources · search to discover, not to believe · choose sources before each question · ask better questions than “summarise” · keep the last question fixed · mind map first · each output has its job · never turn a conclusion into a source before reviewing it · keep sources updated."),
        bp(12, "دورة العقل الثاني: جمع المصادر ← تصفيتها ← خريطة الفكرة ← اكتشاف التناقضات ← أسئلة عميقة ← استنتاجات موثقة ← ملاحظات معتمدة ← مخرج نهائي ← تحديث مستمر.", "The second-brain cycle: collect sources → filter → map the idea → find contradictions → deep questions → documented conclusions → approved notes → final output → continuous update."),
        bp(13, "انتبه لأمرين: **الخصوصية** — بيانات شركتك تخضع لسياسة شركتك أولًا، فراجعها قبل رفع أي مستند حساس. و**حدود الاستخدام** — الحصة تعتمد جزئيًا على تكلفة المهمة، فوزّع المهام الثقيلة على فترات.", "Two cautions: **privacy** — your company’s data is governed by company policy first, so check it before uploading anything sensitive. **Usage limits** — quota depends partly on the task’s cost, so spread heavy tasks over time."),
      ],
      levels: {
        simple: [
          L("what", "**العقل الثاني** مكتبة صغيرة تختار كتبها بنفسك، وأمين مكتبة ذكي لا يجيب إلا من هذه الكتب، ويقول لك في كل إجابة: «هذا من الكتاب الفلاني، الصفحة كذا».", "A **second brain** is a small library whose books you choose, with a smart librarian who answers only from those books and tells you each time: “this is from that book, that page”."),
          L("why", "لأن المساعد العادي يجيب من ذاكرته العامة وقد يخلطها بالبحث الخارجي. أما هنا فالإجابة من **مصادرك أنت** — سياسات الشركة، أدلة التشغيل، تقارير القسم — ومعها الدليل.", "Because an ordinary assistant answers from general memory and may mix in outside search. Here the answer comes from **your sources** — company policies, manuals, department reports — with the evidence attached."),
        ],
        mech: [
          L("how", "تضع المصادر في دفتر ← تختار منها ما يخص السؤال ← الأداة تبحث داخلها فقط ← تكتب الإجابة وتضع لكل جملة ((citation|استشهادًا)) يشير إلى مكانها في المصدر.", "You add sources to a notebook → pick the ones relevant to the question → the tool searches only inside them → it writes the answer with a ((citation|citation)) for each sentence pointing to its place in the source."),
          L("inside", "لماذا القاعدة الرابعة «اختر المصادر قبل كل سؤال»؟ لو عندك 40 مصدرًا والسؤال يخص 6 فقط، فعّل الستة: **يقل التشويش وتدق الإجابة**. ولماذا القاعدة التاسعة؟ لأنك لو حوّلت استنتاجًا غير مراجع إلى مصدر، **تكاثر الخطأ داخل عقلك الثاني وصار يستشهد بنفسه**.", "Why rule four, “choose sources before each question”? With 40 sources and a question about 6, activate the six: **less noise, sharper answer**. Why rule nine? Turn an unreviewed conclusion into a source and **the error multiplies inside your second brain and starts citing itself**."),
          L("link", "هذا تطبيق مباشر لفكرة [[f1]]: النموذج لا يتذكر المصادر بدقة، فأعطه إياها. والدفتر لاحقًا هو «عقل المحتوى» في العرض الإداري ([[p11]]).", "This applies [[f1]] directly: the model can’t recall sources precisely, so give them. Later the notebook becomes the “content brain” of the management pitch ([[p11]])."),
        ],
        practice: [
          L("example", "قسم الموارد البشرية يضع في دفتر واحد: لائحة الإجازات، ودليل الموظف الجديد، وسياسة السفر، وإجراءات المشتريات. الموظف يسأل «هل أستحق بدل سفر لرحلة يوم واحد؟» فتأتي الإجابة من السياسة مع رقم الفقرة.", "HR puts the leave rules, new-employee guide, travel policy and purchasing procedures into one notebook. An employee asks “am I entitled to a travel allowance for a one-day trip?” and the answer comes from the policy with the clause number."),
          L("apply", "في [[brain|مختبر العقل الثاني]] أدناه: فعّل وأطفئ المصادر، واسأل نفس السؤال. لاحظ كيف تتغير الإجابة، وكيف يكشف المختبر تناقض المصدر القديم مع الجديد.", "In the [[brain|second-brain lab]] below: switch sources on and off and ask the same question. See how the answer changes and how the lab flags the old source contradicting the new one."),
        ],
        adv: [
          L("mistakes", "- **دفتر اسمه «الذكاء الاصطناعي»**: موضوع واسع جدًا. اسم الدفتر يجب أن يكون هدفًا: «كورس الذكاء الاصطناعي» أو «مشروع تطوير خدمة العملاء».\n- **أسئلة «لخّص» فقط**: اسأل أين تختلف المصادر وما الادعاءات ضعيفة الدليل.\n- **دفتر لا يُحدَّث** فيتحول بعد شهرين إلى متحف رقمي.", "- **A notebook called “AI”**: far too broad. Name it after a goal: “AI course” or “Customer-service improvement project”.\n- **Only “summarise” questions**: ask where sources disagree and which claims have weak evidence.\n- **A notebook never updated**, which becomes a digital museum in two months."),
          L("whennot", "لا ترفع مستندات حساسة قبل مراجعة سياسة شركتك. والدفتر لا يحسب أرقامًا معقدة ولا يربط أنظمة — هذا عمل الأدوات والأنظمة ([[y1]]، [[s1]]).", "Don’t upload sensitive documents before checking company policy. And a notebook doesn’t do complex calculations or connect systems — that’s for tools and systems ([[y1]], [[s1]])."),
        ],
      },
      case: { field: { ar: "الموارد البشرية", en: "Human resources" }, title: { ar: "مكتب أسئلة الموظفين يرد في دقيقة", en: "An employee help desk that answers in a minute" },
        steps: {
          problem: { ar: "قسم الموارد البشرية يتلقى عشرات الأسئلة المتكررة أسبوعيًا عن الإجازات والسفر والمشتريات.", en: "HR receives dozens of repeated questions weekly about leave, travel and purchasing." },
          old: { ar: "يبحث الموظف المختص في ملفات متفرقة ويرد يدويًا، وأحيانًا من نسخة قديمة من السياسة.", en: "The officer searches scattered files and replies by hand — sometimes from an outdated policy." },
          idea: { ar: "دفتر واحد بالسياسات المعتمدة فقط، يجيب باستشهاد يحدد الفقرة.", en: "One notebook with only the approved policies, answering with a citation to the clause." },
          steps: { ar: "1. اجمع النسخ المعتمدة الحالية فقط (لا القديمة).\n2. أنشئ دفترًا باسم «سياسات الموظفين 2026».\n3. اختبر بعشرة أسئلة تعرف إجاباتها.\n4. حدّث الدفتر عند أي تعديل في السياسات.", en: "1. Gather only the current approved versions (not old ones).\n2. Create a notebook called “Employee policies 2026”.\n3. Test with ten questions whose answers you know.\n4. Update the notebook whenever a policy changes." },
          result: { ar: "ردود أسرع ومتسقة مع الفقرة الأصلية؛ والأسئلة التي لا تجيب عنها المصادر تظهر بوضوح كفجوة في السياسات.", en: "Faster replies consistent with the original clause; questions the sources can’t answer show up clearly as policy gaps." },
          risks: { ar: "سياسات فيها بيانات شخصية لا تُرفع إلا وفق سياسة الشركة؛ وأي إجابة تخص حالة استثنائية يراجعها المختص.", en: "Policies with personal data are uploaded only per company policy; any answer about an exceptional case is reviewed by the officer." },
        } },
    },
    {
      id: "p9", unit: "u1", pages: [13], diff: 2, min: 8, scene: "leap", lab: "formula", related: ["p3", "p10", "d1"], pre: ["p1", "p3"],
      title: { ar: "القفزة: إكسل مع الذكاء الاصطناعي", en: "The leap: Excel with AI" },
      sum: { ar: "لا تبدأ بالكود، ابدأ بمشكلة: نموذج الطلب الصحيح لأي معادلة، والعناصر الثلاثة، وسلّم التسع مراحل.", en: "Don’t start with code, start with a problem: the right formula request, its three elements, and the nine-stage ladder." },
      book: [
        bp(13, "نقطة البداية الحقيقية لأي متدرب: «**أنا أعرف النتيجة التي أريدها، لكني لا أعرف كيف أكتب المعادلة**». وهذه بالضبط الفجوة التي يملؤها الذكاء الاصطناعي اليوم.", "Every trainee’s real starting point: “**I know the result I want, but I don’t know how to write the formula.**” That’s exactly the gap AI fills today."),
        bp(13, "**لا تبدأ بالكود، ابدأ بمشكلة.** الأداة اليوم تبني المعادلات وتشرحها وتصلح الموجود منها، وتنفذ البحث بين الجداول، وتحلل الاتجاهات والقيم الشاذة، وتقترح أعمدة حسابية جديدة.", "**Don’t start with code, start with a problem.** Today the tool builds formulas, explains and fixes them, looks up across tables, analyses trends and outliers, and suggests new calculated columns."),
        bp(13, "الخطوات: اشرح المشكلة ← دعه يبني المعادلة ← افهمها ← اختبرها ← طبّقها.", "The steps: explain the problem → let it build the formula → understand it → test it → apply it."),
        bp(13, "نموذج الطلب: «عندي جدول مبيعات. العمود «أ» فيه اسم المنتج، و«ب» الكمية، و«ج» سعر البيع، و«د» التكلفة. أريد معادلة تحسب هامش الربح كنسبة مئوية، لكن إذا كانت البيانات ناقصة تظهر الخلية فارغة بدل رسالة خطأ. اكتب المعادلة، واشرحها ببساطة، واختبرها على ثلاث حالات مختلفة.»", "The request: “I have a sales table. Column A is the product name, B the quantity, C the selling price, D the cost. I want a formula for the profit margin as a percentage, but if data is missing the cell stays blank instead of an error. Write the formula, explain it simply, and test it on three different cases.”"),
        bp(13, "لاحظ العناصر الثلاثة: **وصف دقيق لبنية البيانات، وتعريف واضح للناتج المطلوب، وقاعدة صريحة للحالة الاستثنائية**. غياب أي منها هو سبب معظم المعادلات الخاطئة التي تصل إلى التقارير.", "Note the three elements: **a precise description of the data structure, a clear definition of the required output, and an explicit rule for the edge case**. Missing any of them causes most wrong formulas that reach reports."),
        bp(13, "سلّم التدرج: تسع مراحل في إكسل — **الأساس** (حسابات بسيطة، شروط متعددة، البحث والربط بين جداول) ← **المعالجة** (التواريخ، تنظيف النصوص، التصنيفات والفئات) ← **الاحتراف** (مؤشرات الأداء، المعادلات المالية، معادلات مركبة).", "The ladder: nine Excel stages — **basics** (simple calculations, multiple conditions, lookups across tables) → **processing** (dates, cleaning text, categories) → **mastery** (KPIs, financial formulas, compound formulas)."),
      ],
      levels: {
        simple: [
          L("what", "بدل أن تحفظ المعادلات، **تصف النتيجة التي تريدها** والأداة تكتب المعادلة وتشرحها. المهارة الجديدة: أن تصف جدولك ومطلوبك والحالة الصعبة بوضوح.", "Instead of memorising formulas, you **describe the result you want** and the tool writes and explains the formula. The new skill: describe your table, the goal and the tricky case clearly."),
          L("why", "لأن أغلب الموظفين يعرفون ماذا يريدون من الجدول لكن تقف أمامهم صياغة المعادلة. والأخطر: معادلة صحيحة في الحالة العادية تنهار عند خلية فارغة فتظهر رسالة خطأ في تقرير الإدارة.", "Because most staff know what they want from a table but get stuck writing the formula. Worse: a formula right in the normal case breaks on a blank cell and an error shows up in the management report."),
        ],
        mech: [
          L("how", "المعادلة في مثال الكتاب تصبح تقريبًا:\n`=IF(OR(C2=\"\";D2=\"\";C2=0);\"\";(C2-D2)/C2)`\nأي: إن كان السعر أو التكلفة فارغًا أو السعر صفرًا اترك الخلية فارغة، وإلا احسب (السعر − التكلفة) ÷ السعر. (الفاصل «;» أو «,» حسب إعدادات إكسل لديك.)", "In the book’s example the formula becomes roughly:\n`=IF(OR(C2=\"\",D2=\"\",C2=0),\"\",(C2-D2)/C2)`\ni.e. if price or cost is blank, or price is zero, leave it blank; otherwise (price − cost) ÷ price. (The separator is “,” or “;” depending on your Excel settings.)"),
          L("inside", "العناصر الثلاثة تعالج ثلاثة أسباب للخطأ: **الوصف الدقيق** يمنع الأداة من افتراض أعمدة غير موجودة، و**تعريف الناتج** يمنع حساب شيء آخر (هامش على التكلفة بدل السعر مثلًا)، و**قاعدة الاستثناء** تمنع رسائل الخطأ.", "The three elements fix three causes of error: **precise description** stops the tool assuming non-existent columns, **output definition** prevents computing something else (margin on cost instead of price, say), and **the edge-case rule** prevents error messages."),
          L("link", "هذا هو خطأ «تجاهل الحالات الناقصة» من [[p3]] في صورته العملية، وهو أول درجة في القفزة التي تكمل في [[p10]] بالماكرو والكود.", "This is [[p3]]’s “ignoring missing cases” mistake in practice, and the first rung of the leap that continues in [[p10]] with macros and code."),
        ],
        practice: [
          L("example", "**مصنع**: «العمود A رقم الماكينة، B دقائق التشغيل، C دقائق التوقف. أريد نسبة الإتاحة، وإذا كانت الدقائق صفرًا أو فارغة تظهر «لا يوجد تشغيل». اختبرها على ماكينة عادية، وماكينة بلا تشغيل، وماكينة بقيمة سالبة خطأ».", "**Factory**: “Column A is the machine number, B running minutes, C stoppage minutes. I want availability %, and if minutes are zero or blank show “no run”. Test on a normal machine, one with no run, and one with a wrong negative value.”"),
          L("apply", "في [[formula|مختبر المعادلة]] أدناه: توقّع النتيجة أولًا، ثم شغّل وأطفئ قاعدة الحالة الاستثنائية، وعدّل الخلايا بنفسك.", "In the [[formula|formula lab]] below: predict first, then switch the edge-case rule on and off and edit cells yourself."),
        ],
        adv: [
          L("mistakes", "- **نسخ المعادلة دون فهمها**: خطوة «افهمها» في الكتاب ليست ترفًا؛ إن لم تفهمها لن تكتشف خطأها.\n- **اختبارها على الحالة العادية فقط**.\n- **القفز للمرحلة التاسعة** (معادلات مركبة) قبل إتقان الأساس.", "- **Copying the formula without understanding it**: the book’s “understand it” step isn’t a luxury; if you don’t understand it you won’t catch its error.\n- **Testing only the normal case**.\n- **Jumping to stage nine** (compound formulas) before mastering the basics."),
          L("whennot", "حين تصبح المعادلة طويلة جدًا ويصعب فهمها، أو حين تتكرر نفس الخطوات أسبوعيًا على ملفات جديدة — هنا تنتقل للماكرو والكود ([[p10]]) أو لأداة بايثون ([[y1]]).", "When the formula gets too long to understand, or the same steps repeat weekly on new files — that’s when you move to macros and code ([[p10]]) or a Python tool ([[y1]])."),
        ],
      },
    },
    {
      id: "p10", unit: "u1", pages: [13, 14], diff: 2, min: 9, scene: "macro", related: ["p9", "y1", "w2"], pre: ["p9"],
      title: { ar: "أول أتمتة حقيقية: الماكرو والكود بالذكاء الاصطناعي", en: "First real automation: macros and AI-written code" },
      sum: { ar: "مسجّل الماكرو، ثم دع الذكاء الاصطناعي يكتب الكود، وقاعدتان لا تُكسران، والبرومبت الذهبي للكود.", en: "The macro recorder, then let AI write the code, two unbreakable rules, and the golden code prompt." },
      book: [
        bp(13, "الرسالة المحورية: لا تقل «سنتعلم البرمجة». قل: «الذكاء الاصطناعي يحتاج أن يفهم منطق العمل وخطواته ليكتب كودًا صحيحًا». **المهارة الجديدة هي وصف العملية بدقة، لا كتابة الكود.**", "The core message: don’t say “we’ll learn programming”. Say: “AI needs to understand the business logic and steps to write correct code.” **The new skill is describing the process precisely, not writing code.**"),
        bp(13, "**مسجّل الماكرو**: أداة داخل إكسل تسجل خطواتك وأنت تنفذها بيدك ثم تحولها تلقائيًا إلى كود جاهز. الفائدة المزدوجة: أتمتة فورية من أول مرة، وكود مكتوب أمامك تقرؤه فتفهم كيف تُترجَم خطواتك إلى أوامر.", "**The macro recorder**: an Excel tool that records your steps as you do them and turns them into ready code. Double benefit: instant automation first time, and code in front of you that shows how your steps become commands."),
        bp(13, "المشكلة ليست أنك لست مبرمجًا؛ المشكلة أنك قبل الذكاء الاصطناعي كنت مضطرًا أن تكتب الكود بنفسك. اليوم المطلوب **وصف العملية بدقة: الملف، والأوراق، والأعمدة، والخطوات اليدوية، والناتج المطلوب**.", "The problem isn’t that you’re not a programmer; before AI you had to write the code yourself. Today what’s needed is **a precise description: the file, sheets, columns, manual steps and required output**."),
        bp(14, "خطوات وضع الكود: تبويب المطوّر ← محرر الكود ← إدراج وحدة ← لصق الكود ← حفظ بصيغة ماكرو ← تشغيل.", "Placing the code: Developer tab → code editor → insert module → paste code → save as macro-enabled → run."),
        bp(14, "**قاعدتان لا تُكسران**: اعمل دائمًا على نسخة — إجراءات الماكرو لا يمكن التراجع عنها بالطريقة المعتادة، وخطوة خاطئة قد تمسح ساعات عمل بلا رجعة. و**وحدات صغيرة لا وحش ضخم** — عدة وحدات لكل واحدة وظيفة محددة بدل ماكرو يفعل كل شيء ويستحيل إصلاحه.", "**Two unbreakable rules**: always work on a copy — macro actions can’t be undone the usual way, and one wrong step can wipe hours of work. And **small modules, not a monster** — several modules each with one job, instead of one macro doing everything and impossible to fix."),
        bp(14, "**البرومبت الذهبي للكود** — أهم برومبت في القسم: بنية الملف بأسمائها الحقيقية، والمهمة اليدوية بالترتيب، والنتيجة المطلوبة، و«لا تفترض أسماء غير موجودة، تعامل مع الفراغات والأخطاء، لا تحذف البيانات الأصلية، اشرح أين أضع الكود، وأعطني خمس حالات أختبر بها».", "**The golden code prompt** — the section’s most important: the file structure with real names, the manual task in order, the required result, and “don’t assume names that don’t exist, handle blanks and errors, don’t delete the original data, explain where to put the code, and give me five test cases”."),
        bp(14, "لماذا هذا القالب أهم من تعلّم عشرات الأوامر؟ لأن كل سطر فيه يمنع نوعًا معروفًا من الفشل: «لا تفترض أسماء» يمنع الافتراضات الخاطئة، و«تعامل مع الناقص» يمنع الانهيار عند أول بيان سيئ، و«لا تحذف الأصلية» يمنع فقدان البيانات، و«خمس حالات اختبار» يمنع التسليم بلا تحقق.", "Why is this template worth more than learning dozens of commands? Each line prevents a known failure: “don’t assume names” prevents wrong assumptions, “handle the missing” prevents crashing on the first bad record, “don’t delete originals” prevents data loss, and “five test cases” prevents shipping unverified."),
      ],
      levels: {
        simple: [
          L("what", "((macro|الماكرو)) زر واحد ينفذ خطوات كنت تكررها بيدك. يمكنك تسجيله بنفسك (المسجّل يراقبك ويكتب الكود)، أو تصف الخطوات للذكاء الاصطناعي فيكتب كودًا أكبر وأذكى.\n\nتشبيه: بدل أن تشرح لزميل كل يوم كيف ينسّق التقرير، تكتب له ورقة تعليمات مرة واحدة — والماكرو هو هذه الورقة، لكن الحاسوب ينفذها في ثانية.", "A ((macro|macro)) is one button that runs steps you used to repeat by hand. You can record it yourself (the recorder watches and writes the code) or describe the steps to AI so it writes bigger, smarter code.\n\nInstead of showing a colleague daily how to format the report, you write an instruction sheet once — the macro is that sheet, run by the computer in a second."),
          L("why", "لأن هذه أول أتمتة حقيقية: مهمة كانت تأخذ ساعة كل أسبوع تصبح ضغطة زر — وأنت لم تكتب سطر كود واحدًا بنفسك.", "Because this is the first real automation: a task that took an hour a week becomes one click — and you didn’t write a line of code yourself."),
        ],
        mech: [
          L("how", "**المسار الأول**: سجّل الماكرو ← أوقف ← شغّل بزر. **المسار الثاني**: البرومبت الذهبي ← الكود ← المطوّر ← وحدة ← لصق ← حفظ كملف ماكرو ← تشغيل على **نسخة** ← اختبار الحالات الخمس ← اعتماد.", "**Path one**: record → stop → run with a button. **Path two**: golden prompt → code → Developer → module → paste → save as macro file → run on a **copy** → test the five cases → adopt."),
          L("inside", "لماذا «وحدات صغيرة»؟ لأن ((module|الوحدة)) الصغيرة ذات الوظيفة الواحدة يسهل اختبارها وإصلاحها وحدها. الماكرو الضخم حين يخطئ لا تعرف أين — فيستحيل إصلاحه.", "Why “small modules”? A small ((module|module)) with one job is easy to test and fix on its own. When a giant macro fails you can’t tell where — so it’s impossible to fix."),
          L("link", "البرومبت الذهبي هو المعادلة الحاكمة ([[p1]]) مطبقة على ملف، ومعه أقوى تقنية ([[p2]]) في صورة «خمس حالات اختبار». والفكرة نفسها تكبر في أدوات البايثون ([[y1]]) ثم في Claude Code الذي يكتب ويشغّل ويختبر بنفسه ([[w2]]).", "The golden prompt is the governing equation ([[p1]]) applied to a file, with the strongest technique ([[p2]]) as “five test cases”. The same idea grows into Python tools ([[y1]]) and then Claude Code, which writes, runs and tests on its own ([[w2]])."),
        ],
        practice: [
          L("example", "مثال الكتاب: ملف فيه ورقة «البيانات الخام». المطلوب كود يحذف الصفوف الفارغة، ويوحّد تنسيق التاريخ، ويحذف التكرار بناءً على رقم الموظف، ثم ينشئ ورقة «التقرير» بملخص لكل إدارة — مع شرح أين يوضع الكود وكيف يشغَّل خطوة بخطوة.", "The book’s example: a file with a “Raw data” sheet. The code should delete blank rows, unify the date format, remove duplicates by employee ID, then create a “Report” sheet with a summary per department — with an explanation of where to put the code and how to run it step by step."),
          L("apply", "اختر أصغر مهمة تنسيق متكررة عندك وسجّل لها ماكرو اليوم (مهمة الأسبوع الرابع في الخطة). ثم اكتب نفس المهمة بالبرومبت الذهبي وقارن الكودين.", "Pick your smallest recurring formatting task and record a macro for it today (week four of the plan). Then write the same task with the golden prompt and compare the two codes."),
        ],
        adv: [
          L("mistakes", "- **التشغيل على الملف الأصلي**: لا يوجد «تراجع» عادي بعد الماكرو.\n- **وصف أعمدة بأسماء تقريبية**: «عمود التاريخ» بدل اسمه الحقيقي — فيفترض الكود اسمًا غير موجود.\n- **ماكرو واحد ضخم** يفعل كل شيء.", "- **Running on the original file**: there’s no normal undo after a macro.\n- **Approximate column names**: “the date column” instead of its real name — so the code assumes a name that doesn’t exist.\n- **One giant macro** doing everything."),
          L("whennot", "حين تكون العملية خارج إكسل (متصفح، نظام، عدة ملفات في مجلد) أو تحتاج جدولة تلقائية، فأداة بايثون أنسب ([[y3]]).", "When the process goes beyond Excel (browser, system, many files in a folder) or needs automatic scheduling, a Python tool fits better ([[y3]])."),
        ],
      },
      case: { field: { ar: "المالية", en: "Finance" }, title: { ar: "تقرير المصروفات الأسبوعي بزر واحد", en: "The weekly expense report in one click" },
        steps: {
          problem: { ar: "محاسبة تنظف ملف المصروفات الخام كل أسبوع: صفوف فارغة، تواريخ بصيغ مختلفة، تكرار — ثم تلخص حسب الإدارة.", en: "An accountant cleans the raw expense file weekly: blank rows, mixed date formats, duplicates — then summarises by department." },
          old: { ar: "نحو ساعتين يدويًا (رقم افتراضي)، وأخطاء نسخ ولصق تُكتشف أحيانًا بعد إرسال التقرير.", en: "About two hours by hand (hypothetical), with copy-paste errors sometimes found after the report is sent." },
          idea: { ar: "البرومبت الذهبي بوصف الملف والخطوات والناتج، ثم ماكرو من وحدات صغيرة.", en: "The golden prompt describing the file, steps and output, then a macro of small modules." },
          steps: { ar: "1. تصف الأوراق والأعمدة بأسمائها الحقيقية.\n2. تكتب الخطوات اليدوية بالترتيب.\n3. تطلب خمس حالات اختبار.\n4. تشغّل على نسخة وتقارن بالتقرير اليدوي المعتمد.\n5. تعتمد الماكرو بعد تطابق الأرقام.", en: "1. Describe sheets and columns by their real names.\n2. Write the manual steps in order.\n3. Ask for five test cases.\n4. Run on a copy and compare with the approved manual report.\n5. Adopt the macro once numbers match." },
          result: { ar: "التقرير بضغطة زر خلال دقائق، والملف الأصلي سليم دائمًا.", en: "The report in one click within minutes, and the original file always intact." },
          risks: { ar: "إن تغيّر شكل الملف الخام (عمود جديد أو اسم مختلف) قد يخطئ الماكرو؛ لذلك يجب أن يتوقف برسالة واضحة لا أن يكمل بصمت.", en: "If the raw file’s shape changes (a new column or name) the macro may break; it should stop with a clear message rather than continue silently." },
        } },
    },
    {
      id: "p11", unit: "u1", pages: [14, 15], diff: 2, min: 8, scene: "capstone", related: ["p8", "y6", "d2"], pre: ["p8"],
      title: { ar: "من التقرير إلى عرض يُقنع الإدارة", en: "From the report to a pitch that convinces management" },
      sum: { ar: "ثلاث أدوات بثلاثة أدوار، وخلط الأدوار هو الخطأ القاتل، وبرومبتا القصة والمراجعة، والمشروع الختامي ومعاييره.", en: "Three tools, three roles; mixing them is the fatal mistake; story and review prompts; the capstone and its criteria." },
      book: [
        bp(14, "إذا انتهى التقرير… فلماذا تصنع العرض بنفسك؟ ثلاث أدوات يكمّل بعضها بعضًا، ومشروع واحد يجمع الدليل كله.", "If the report is done… why build the deck yourself? Three tools complement each other, and one project pulls the guide together."),
        bp(14, "**عقل المحتوى — الدفتر**: مسؤول عن الصدق والمصادر. **مدير القصة — المساعد المحادثي**: مسؤول عن الرسالة والترتيب. **الاستوديو البصري — مولّد الصور**: مسؤول عن الفهم البصري.", "**Content brain — the notebook**: owns truth and sources. **Story director — the chat assistant**: owns message and order. **Visual studio — the image generator**: owns visual understanding."),
        bp(14, "**خلط الأدوار هو الخطأ القاتل**: ينتج عرضًا جميلًا بلا معنى، أو صحيحًا بلا تأثير. والترتيب نفسه مهم: لا تبدأ بالتصميم أبدًا — **المصدر أولًا، ثم القصة، ثم الصورة**.", "**Mixing roles is the fatal mistake**: you get a pretty deck without meaning, or a correct one without impact. Order matters too: never start with design — **source first, then story, then image**."),
        bp(14, "برومبت بناء قصة العرض: الجمهور والقرار المطلوب وخمس دقائق — الرسالة الواحدة، وأهم ثلاث أفكار، وترتيب الشرائح، والرسم المناسب لكل رقم، وما يجب حذفه. وبرومبت المراجعة: بعين مدير لم يرَ الملف ولديه خمس دقائق.", "The story prompt: audience, required decision and five minutes — one message, top three ideas, slide order, the right chart per number, what to cut. The review prompt: through the eyes of a manager who never saw the file and has five minutes."),
        bp(14, "المشروع الختامي — سلسلة واحدة: ملف بيانات خام ← معادلات بالذكاء الاصطناعي ← كود ينظف ويحلل ← تقرير نهائي ← دفتر يفهم المصادر ← بناء القصة ← البصريات ← عرض إداري جاهز.", "The capstone — one chain: raw data file → AI formulas → code that cleans and analyses → final report → a notebook that understands the sources → story → visuals → a ready management deck."),
        bp(15, "معايير التقييم: هل يعمل النظام كاملًا بزر واحد؟ هل البيانات الأصلية سليمة بعده؟ هل يفهم العرض مدير لم يرَ الملف؟ **هل ينتهي العرض بقرار لا بملخص** — قرارات محددة بمسؤول وموعد؟", "Criteria: Does the whole system run with one button? Is the original data intact afterwards? Does a manager who never saw the file understand the deck? **Does it end with a decision, not a summary** — specific decisions with an owner and a date?"),
      ],
      levels: {
        simple: [
          L("what", "حين ينتهي التحليل، تحتاج أن **تقنع** الإدارة. الكتاب يقسم العمل على ثلاث أدوات مثل فريق: باحث يضمن الصدق (الدفتر)، وكاتب يصنع القصة (المساعد)، ومصمم يصنع الصور (المولّد).", "Once the analysis is done you need to **convince** management. The book splits the work across three tools like a team: a researcher who guarantees truth (notebook), a writer who builds the story (assistant), and a designer who makes the visuals (generator)."),
          L("why", "لأن أجمل عرض لا يفيد إن لم ينتهِ بقرار، وأصح تحليل لا يؤثر إن لم يُحكَ كقصة.", "Because the prettiest deck is useless if it doesn’t end in a decision, and the most correct analysis has no effect if it isn’t told as a story."),
        ],
        mech: [
          L("how", "الترتيب الإلزامي: **المصدر** (أرقام وحقائق موثقة من الدفتر) ← **القصة** (رسالة واحدة وثلاث أفكار وترتيب) ← **الصورة** (رسم لكل رقم مهم). إن بدأت بالتصميم صنعت بصريات لأفكار ستحذفها بعد قليل.", "The mandatory order: **source** (documented facts from the notebook) → **story** (one message, three ideas, an order) → **image** (a chart per key number). Start with design and you’ll make visuals for ideas you’ll soon delete."),
          L("link", "هذه هي نفس «المحطات السبع» في الصفحة التنفيذية بالبايثون ([[y6]])، ونفس قاعدة «ينتهي بقرار لا بملخص» التي تتكرر في المشروع المرجعي ([[y7]]) وتطبيق الويب ([[w6]]).", "This is the same as the “seven stations” of the Python executive page ([[y6]]), and the same “end with a decision, not a summary” rule repeated in the reference project ([[y7]]) and the web app ([[w6]])."),
        ],
        practice: [
          L("example", "مشرف جودة معه تقرير عن ارتفاع المرتجعات. الدفتر يستخرج الأرقام مع مصادرها، والمساعد يبني القصة: «المرتجعات زادت 9% بسبب مورد واحد؛ القرار المطلوب: تغيير المورد خلال شهر»، والمولّد يرسم شريحة مقارنة بين الموردين.", "A quality supervisor has a report on rising returns. The notebook extracts the figures with sources, the assistant builds the story: “returns rose 9% because of one supplier; decision needed: switch supplier within a month”, and the generator draws a supplier comparison slide."),
          L("apply", "خذ آخر عرض قدّمته وطبّق عليه برومبت المراجعة: هل الرسالة واضحة في أول 30 ثانية؟ ما الشرائح التي تُحذف؟ هل ينتهي بقرار؟", "Take your last presentation and run the review prompt: is the message clear in the first 30 seconds? Which slides go? Does it end with a decision?"),
        ],
        adv: [
          L("mistakes", "- **عرض ينتهي بـ«شكرًا» وملخص أرقام**: بلا قرار ولا مسؤول ولا موعد.\n- **مولّد الصور يخترع أرقامًا في الرسوم**: الأرقام تأتي من الدفتر فقط.\n- **20 شريحة لخمس دقائق**.", "- **A deck ending in “thank you” and a number summary**: no decision, owner or date.\n- **The image generator inventing numbers in charts**: numbers come only from the notebook.\n- **20 slides for five minutes**."),
          L("whennot", "حين يكون القرار تشغيليًا صغيرًا، يكفي بريد من خمسة أسطر بدل عرض كامل.", "When the decision is small and operational, a five-line email beats a full deck."),
        ],
      },
      case: { field: { ar: "الجودة", en: "Quality" }, title: { ar: "من تقرير مرتجعات إلى قرار تغيير مورد", en: "From a returns report to a supplier decision" },
        steps: {
          problem: { ar: "تقرير مرتجعات من 30 صفحة لا يقرؤه أحد في اجتماع الإدارة.", en: "A 30-page returns report nobody reads in the management meeting." },
          old: { ar: "عرض من 25 شريحة بكل الجداول، ينتهي بـ«شكرًا».", en: "A 25-slide deck with every table, ending in “thank you”." },
          idea: { ar: "الأدوار الثلاثة بالترتيب: الدفتر للأرقام، المساعد للقصة، المولّد للصور.", en: "The three roles in order: notebook for numbers, assistant for story, generator for visuals." },
          steps: { ar: "1. ضع التقرير في دفتر واسأل: ما الأسباب وما الدليل؟\n2. برومبت القصة: رسالة واحدة، ثلاث أفكار، القرار.\n3. شريحة رسم لكل رقم مهم.\n4. برومبت المراجعة بعين مدير.", en: "1. Put the report in a notebook and ask: what causes, what evidence?\n2. Story prompt: one message, three ideas, the decision.\n3. One chart slide per key number.\n4. Review prompt through a manager’s eyes." },
          result: { ar: "خمس شرائح تنتهي بقرار له مسؤول وموعد.", en: "Five slides ending with a decision that has an owner and a date." },
          risks: { ar: "تأكد أن كل رقم في الشرائح مأخوذ من المصدر وليس من مولّد الصور، وأن القرار المقترح ضمن صلاحيات الحضور.", en: "Make sure every number on the slides comes from the source, not the image generator, and that the proposed decision is within the attendees’ authority." },
        } },
    },
    {
      id: "p12", unit: "u1", pages: [15, 16], diff: 1, min: 7, scene: "plan30", related: ["f2", "p2", "f5"], pre: ["p1"],
      title: { ar: "من دليل إلى عادة عمل: الفهرس والخطة والتحقق", en: "From a guide to a habit: the index, the plan and the checklist" },
      sum: { ar: "أي برومبت تستخدم متى، ومن أين تبدأ فعليًا، وخطة الثلاثين يومًا، وقائمة التحقق، وثلاثة أخطاء تمنع التحول.", en: "Which prompt when, where to actually start, the 30-day plan, the checklist, and three mistakes that block the change." },
      book: [
        bp(15, "الفهرس السريع: لا تعرف من أين تبدأ ← الشامل للإنتاجية · قرار كبير غامض ← الشامل الاستراتيجي · يوم ممتلئ ← ترتيب المهام وتقسيم اليوم · ملاحظات اجتماع ← ما بعد الاجتماع · فكرة فيها خلل ← «لا توافقني تلقائيًا» · خطة تخشى فشلها ← نقاط الفشل · معلومات ناقصة ← المعلومات الناقصة · مصادر متضاربة ← كشف التناقضات · مهمة إكسل أسبوعية ← البرومبت الذهبي · تقرير يحتاج عرضًا ← القصة والمراجعة.", "Quick index: don’t know where to start → all-in-one productivity · big ambiguous decision → all-in-one strategic · full day → task ranking and day blocks · meeting notes → after-the-meeting · flawed idea → “don’t agree automatically” · plan you fear → pre-mortem · missing info → missing information · conflicting sources → contradictions · weekly Excel task → golden code prompt · report needing a deck → story and review."),
        bp(15, "خارطة التطبيق: مبتدئ تمامًا ← أعد كتابة أحدث طلب بالعناصر الخمسة · غارق في المهام ← برومبت تنظيم اليوم على مهام غد · أمام قرار صعب ← البرومبت الاستراتيجي · ملفات مبعثرة ← دفتر واحد لمشروع واحد · مهمة متكررة ← سجّل ماكرو لأصغرها.", "Application map: complete beginner → rewrite your latest request with the five elements · drowning in tasks → day-planning prompt on tomorrow’s tasks · hard decision → strategic prompt · scattered files → one notebook for one project · recurring task → record a macro for the smallest."),
        bp(16, "خطة الثلاثين يومًا: الصياغة ← الإنتاجية (توفير ساعة أسبوعيًا على الأقل) ← القرار والمعرفة ← الأتمتة (أداة تعمل فعلًا بضغطة زر). **القاعدة: لا تنتقل إلى أسبوع جديد قبل أن يصبح ما قبله عادة لا تفكر فيها. أسبوع واحد متقن أفضل من أربعة أسابيع مقروءة على عجل.**", "The 30-day plan: wording → productivity (save at least an hour a week) → decisions and knowledge → automation (a tool that really works in one click). **Rule: don’t start a new week until the last one is a habit you don’t think about. One mastered week beats four rushed ones.**"),
        bp(16, "قائمة تحقق قبل اعتماد أي مخرج: هل فصلت النتيجة بين الحقائق والافتراضات؟ هل تحققت بنفسك من كل رقم سيدخل تقريرًا رسميًا؟ هل جرّبت على نسخة؟ هل طلبت نسخة أبسط وقارنت؟ هل تعرف ماذا يحدث عند بيانات ناقصة؟ هل تستطيع شرح النتيجة لزميل دون العودة للأداة؟", "Checklist before trusting any output: does it separate facts from assumptions? Did you check every number entering an official report? Did you try it on a copy? Did you ask for a simpler version and compare? Do you know what happens with missing data? Can you explain it to a colleague without the tool?"),
        bp(16, "ثلاثة أخطاء تمنع التحول: **جمع الأدوات بدل إتقان واحدة**، و**الاكتفاء بالإعجاب بالنتيجة** (المعيار الوحيد: هل تغيّر شيء في عملك هذا الأسبوع؟)، و**البدء بأكبر مشكلة** (ابدأ بأصغر مهمة متكررة).", "Three mistakes that block change: **collecting tools instead of mastering one**, **just admiring the result** (the only test: did something change at work this week?), and **starting with your biggest problem** (start with the smallest recurring task)."),
        bp(16, "التحول المطلوب: المتدرب يدخل يسأل «كيف أكتب معادلة؟» ويخرج يقول: «**بنيتُ نظامًا يبدأ بالبيانات وينتهي بعرض للإدارة**». الهدف ألا تتعلم أدوات، بل أن تتعلم تصميم أنظمة عمل جديدة.", "The desired change: a trainee arrives asking “how do I write a formula?” and leaves saying “**I built a system that starts with data and ends with a management pitch**.” The aim isn’t learning tools but learning to design new work systems."),
      ],
      levels: {
        simple: [
          L("what", "صفحتا الختام في الدليل الأول تحولان القراءة إلى **عادة**: فهرس يقول لك أي برومبت لأي موقف، وخطة أربعة أسابيع، وقائمة من ستة أسئلة قبل أن تعتمد أي نتيجة.", "The first guide’s closing pages turn reading into a **habit**: an index telling you which prompt for which situation, a four-week plan, and six questions to ask before trusting any result."),
          L("why", "لأن قراءة الدليل مرة واحدة لا تُحدث التحول. التحول يحدث حين تتكرر الممارسة حتى تصبح تلقائية.", "Because reading the guide once doesn’t change anything. Change happens when practice repeats until it’s automatic."),
        ],
        mech: [
          L("how", "الخطة متدرجة عمدًا: كل أسبوع يبني على الذي قبله. الصياغة أولًا لأنها أساس كل شيء، والأتمتة أخيرًا لأنها تحتاج كل ما سبقها (وصف دقيق، فهم، تحقق).", "The plan is deliberately graded: each week builds on the last. Wording first because it underpins everything; automation last because it needs all of it (precise description, understanding, checking)."),
          L("link", "قائمة التحقق هنا هي النسخة الكاملة من سلسلة الاستخدام الواعي ([[f5]])، والقاعدة «ابدأ بأصغر مهمة متكررة» ستتكرر في كل دليل بعده ([[y2]]، [[s2]]).", "This checklist is the full version of the wise-use chain ([[f5]]), and “start with the smallest recurring task” recurs in every guide after it ([[y2]], [[s2]])."),
        ],
        practice: [
          L("example", "موظف مبيعات يطبق الخطة: الأسبوع الأول يعيد صياغة كل طلب مهم، الثاني يستخدم برومبت الفرز صباحًا، الثالث يضع ملفات العملاء الكبار في دفتر، الرابع يسجل ماكرو لتقرير الزيارات الأسبوعي.", "A sales rep follows the plan: week one rewrites every important request, week two uses the triage prompt each morning, week three puts key-account files in a notebook, week four records a macro for the weekly visits report."),
          L("apply", "ابدأ «الأسبوع الأول» اليوم، وعلّم هذا الدرس «فهمته» فقط حين تصبح الجملة الذهبية عادة لك.", "Start “week one” today, and mark this lesson as understood only when the golden sentence has become a habit."),
        ],
        adv: [
          L("mistakes", "- **قراءة الخطة دون تطبيقها**: «الاكتفاء بالإعجاب».\n- **ضغط الأسابيع الأربعة في أسبوع**: لا شيء يتحول إلى عادة.", "- **Reading the plan without doing it**: “just admiring”.\n- **Squeezing four weeks into one**: nothing becomes a habit."),
          L("whennot", "إن كانت شركتك لا تسمح بأدوات معينة، طبّق الخطة على الأدوات المعتمدة فقط؛ المبادئ واحدة.", "If your company doesn’t allow certain tools, apply the plan only to approved tools; the principles are the same."),
        ],
      },
    },
  ]);
})(window.ACADEMY = window.ACADEMY || {});
