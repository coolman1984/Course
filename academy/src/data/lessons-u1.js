/* Unit 1 — Guide 1: From the prompt to a complete work system (book pages 7–16). */
"use strict";
(function (A) {
  const bp = (p, ar, en) => ({ p, ar, en });
  const L = (k, ar, en) => ({ k, ar, en });
  A.lessons = (A.lessons || []).concat([
    {
      id: "p1", unit: "u6", pages: [7], diff: 1, min: 9, scene: "equation", lab: "prompt", related: ["f4", "p2", "p3", "d1"], pre: ["f4"],
      title: { ar: "إزاي تطلب منه حاجة ويطلع المطلوب من أول مرة؟", en: "The governing equation and the five elements" },
      sum: { ar: "الطلب العام زي «حلل الملف» بيرجّع نتيجة عامة. الطلب اللي فيه الهدف والظروف والمهمة بالظبط وشكل النتيجة بيطلّع المطلوب من أول مرة.", en: "Clear goal + enough context + specific request + output format = an actionable result; and the five elements of any good request." },
      book: [
        bp(7, "معظم الناس اللي بتستخدم الذكاء الاصطناعي النهارده بيستخدموه كمحرك بحث سريع: سؤال، جواب، وبعدين نسيان. **وده أضعف استخدام ممكن.**", "Most people use AI like a quick search engine: question, answer, forget. **That’s the weakest possible use.**"),
        bp(7, "الاستخدام الحقيقي بيبدأ لما تتوقف عن طلب «إجابة» وتبدأ تطلب **نتيجة تقدر تنفّذها**: خطة، قرار، أو أداة تشتغل بدّالك.", "Real use begins when you stop asking for “an answer” and start asking for **an actionable result**: a plan, a decision, or a tool working for you."),
        bp(7, "المعادلة الحاكمة لكل Prompt ناجح: **هدف واضح + Context كافي + طلب محدد + شكل النتيجة = نتيجة تقدر تنفّذها**.", "The governing equation of every good prompt: **clear goal + enough context + specific request + output format = an actionable result**."),
        bp(7, "الفرق بين نتيجة عامة مش بتفيد ونتيجة بتغيّر قرارك مش في الأداة، لكن في **خمس عناصر** تحطهم في الطلب قبل ما تبعت: الهدف، الـ Context، الجمهور، شكل النتيجة، القيود والأمثلة.", "The difference between a useless generic result and one that changes your decision isn’t the tool but **five elements** you put in the request: goal, context, audience, output format, constraints and examples."),
        bp(7, "**الهدف**: مش «ساعدني في التقرير» لكن «عايز أعرف ليه المبيعات نزلت». **الجمهور**: شرح لمبتدئ مختلف جذريًا عن ملخص لمدير مشغول.", "**Goal**: not “help me with the report” but “I want to know why sales fell”. **Audience**: an explainer for a beginner is radically different from a summary for a busy executive."),
        bp(7, "**الـ Context**: الأداة مش عارفة عن شغلك حاجة إلا اللي إنت بتقوله. **شكل النتيجة**: لو حدّدته بيوفّر عليك جولة تعديل كاملة. **القيود**: الميزانية والوقت والأسلوب وأي مثال — القيد الواضح بيمنع اقتراحات مش قابلة للتنفيذ في ظروفك.", "**Context**: the tool knows nothing about your work except what you tell it. **Format**: setting it saves a whole revision round. **Constraints**: budget, time, style and examples — a clear constraint prevents suggestions that can’t work in your situation."),
        bp(7, "إزاي تستخدم الدليل: انسخ الـ Prompt زي ما هو، وبعدين غيّر اللي بين الأقواس [ ] ببياناتك الحقيقية. **ماتحفظش الـ Prompt؛ افهم هدفه الأول**، عشان تقدر تعدّله لأي موقف شبهه.", "How to use the guide: copy the prompt as is, then replace what’s in [ ] with your real data. **Don’t memorise prompts; understand their purpose first**, so you can adapt them to any similar situation."),
      ],
      levels: {
        simple: [
          L("what", "**((prompt|الـ Prompt))** هو الطلب المكتوب اللي بتبعته للأداة. والمعادلة بتقول إن الطلب الجيد ليه أربع أجزاء: **إيه اللي عايزه** (هدف)، **وضعي إيه** (Context)، **المهمة بالضبط إيه** (طلب محدد)، **عايز النتيجة إزاي** (شكل). الخمس عناصر بتضيف **الجمهور** و**القيود**.\n\nمثال: أمر شغل مكتوب فيه «صيانة» بس طلب ضعيف. الطلب القوي: «ماكينة رقم ٣، صوت غير طبيعي في الموتور، وقفت ١٠ دقايق امبارح، والمطلوب فحص قبل الوردية التانية».", "The **((prompt|prompt))** is the written request you send the tool. The equation says a good request has four parts: **what I want** (goal), **my situation** (context), **the exact task** (specific request), **how I want the result** (format). The five elements add **audience** and **constraints**.\n\nExample: a work order that just says “maintenance” is a weak request. A strong one: “Machine 3, abnormal motor noise, stopped for 10 minutes yesterday; inspect it before the second shift.”"),
          L("why", "لأن الأداة مش بتقرأ أفكارك. كل عنصر ناقص بتملاه بالتخمين — والتخمين بيديك نتيجة صحيحة بشكل عام، لكنها ما بتغيّرش حاجة في شغلك.", "Because the tool can’t read your mind. Every missing element is filled by guessing — and guessing gives you something generally true that changes nothing at work."),
        ],
        mech: [
          L("how", "كل عنصر بيقفل باب للتخمين:\n- **الهدف** بيحدد إيه اللي يُعدّ نجاح.\n- **الـ Context** بيمنع حلول لشركة تانية.\n- **الجمهور** بيضبط المستوى واللغة والطول.\n- **الشكل** بيحدد بنية المخرج من أول مرة.\n- **القيود والأمثلة** بتستبعد اللي مش ممكن تنفيذه.", "Each element closes a door to guessing:\n- **Goal** defines what success means.\n- **Context** prevents solutions for another company.\n- **Audience** sets level, language and length.\n- **Format** fixes the output’s structure first time.\n- **Constraints and examples** rule out the unworkable."),
          L("inside", "جوّا النموذج، كل كلمة بتكتبها جزء من ((context|الـ Context)) اللي بيأثر على كل قطعة بيولّدها ([[f1]]). عشان كده جملة زي «لمدير مشغول، في صفحة واحدة» بتغيّر الإجابة كلها: الطول والكلمات وترتيب الأفكار.", "Inside the model, every word you write is part of the ((context|context)) that shapes every piece it generates ([[f1]]). So one line like “for a busy manager, one page” changes the whole answer: length, vocabulary and order of ideas."),
          L("link", "المعادلة دي أساس كل اللي بعدها في الكتاب: الـ Prompt الذهبي للكود ([[p10]]) معادلة مفصّلة لبنية ملف، ومواصفة المهمة بالبايثون ([[y1]]) نسخة هندسية منها.", "This equation underpins everything after it: the golden code prompt ([[p10]]) is just a detailed equation for a file’s structure, and the Python task spec ([[y1]]) is an engineering version of it."),
        ],
        practice: [
          L("example", "**ضعيف**: «اكتب لي إعلان وظيفة».\n\n**قوي**: «عايز إعلان وظيفة لمشرف إنتاج (هدف). إحنا مصنع أجهزة منزلية في العاشر من رمضان، ومحتاجين خبرة 3 سنوات في الورديات (Context). الجمهور: مهندسين حديثي خبرة (جمهور). اكتبه في 5 نقاط وجملة افتتاحية (شكل). من غير مبالغة، وأقل من 120 كلمة (قيود)».", "**Weak**: “Write me a job ad.”\n\n**Strong**: “I want a job ad for a production supervisor (goal). We’re a home-appliance factory and need 3 years of shift experience (context). Audience: early-career engineers (audience). Write it as an opening line and 5 bullets (format). No hype, under 120 words (constraints).”"),
          L("apply", "خد آخر طلب كتبته لأداة ذكاء اصطناعي، واكتبه تاني بالخمس عناصر في [[prompt|مختبر بناء الـ Prompt]] تحت. لاحظ إزاي الدرجة بتترفع وشكل الرد بيتغيّر.", "Take the last request you wrote to an AI tool and rewrite it with the five elements in the [[prompt|prompt builder lab]] below. Watch the score rise and the reply change shape."),
        ],
        adv: [
          L("mistakes", "- **الطول مش معناه جودة**: الـ Prompt الطويل من غير هدف واضح بيفضل ضعيف.\n- **وصف مبهم للبيانات**: «عندي جدول» بدل أسماء الأعمدة وأنواعها ([[p3]]).\n- **حفظ الـ Prompt بدل فهم هدفه**: فيفشل أول ما الموقف يتغيّر شوية.", "- **Length isn’t quality**: a long prompt with no clear goal is still weak.\n- **Vague data description**: “I have a table” instead of column names and types ([[p3]]).\n- **Memorising prompts instead of their purpose**: so they fail when the situation shifts."),
          L("whennot", "للأسئلة البسيطة جدًا («عاصمة كذا إيه؟» أو «ترجم الجملة دي») مش محتاج الخمس عناصر كاملة. استخدمهم كامل لما النتيجة هتدخل في قرار أو تقرير أو شغل متكرر.", "For very simple questions (“what’s the capital of…?” or “translate this sentence”) you don’t need all five. Use them fully when the result feeds a decision, a report or recurring work."),
        ],
      },
      case: { field: { ar: "الموارد البشرية", en: "Human resources" }, title: { ar: "من «اكتب إعلان» لإعلان يجيب المرشح المناسب", en: "From “write an ad” to an ad that attracts the right candidate" },
        steps: {
          problem: { ar: "إعلانات الوظايف بتجيب مئات متقدمين مش مناسبين، ووقت الفرز بيضيع.", en: "Job ads attract hundreds of unsuitable applicants, wasting screening time." },
          old: { ar: "نسخ إعلان قديم وتغيير المسمى بس.", en: "Copy an old ad and change only the title." },
          idea: { ar: "Prompt بالخمس عناصر يحدد المرشح المطلوب بدقة والشروط اللي بتستبعد غير المناسبين.", en: "A five-element prompt that defines the target candidate precisely and the conditions that filter out the wrong ones." },
          steps: { ar: "1. الهدف: جذب مرشحين بخبرة ورديات.\n2. الـ Context: طبيعة المصنع والوردية والموقع.\n3. الجمهور: مهندسين حديثي خبرة.\n4. الشكل: افتتاحية + 5 نقاط + طريقة التقديم.\n5. القيود: أقل من 120 كلمة، من غير مبالغة.", en: "1. Goal: attract candidates with shift experience.\n2. Context: the plant, the shift, the location.\n3. Audience: early-career engineers.\n4. Format: opener + 5 bullets + how to apply.\n5. Constraints: under 120 words, no hype." },
          result: { ar: "إعلان أوضح بيقلّل المتقدمين غير المناسبين (أثر متوقع، يتقاس بعدد السير اللي بتعدّي الفرز الأول).", en: "A clearer ad that reduces unsuitable applicants (expected effect, measured by CVs passing first screening)." },
          risks: { ar: "راجع الإعلان بنفسك وتأكد إنه ما فيهوش شروط تمييزية أو غير قانونية، وإن المزايا المذكورة حقيقية.", en: "Review the ad yourself to make sure it has no discriminatory or unlawful conditions and that the stated benefits are real." },
        } },
    },
    {
      id: "p2", unit: "u6", pages: [7], diff: 1, min: 5, scene: "technique", related: ["p1", "p3", "w2"], pre: ["p1"],
      title: { ar: "الجملة اللي تمنع التخمين قبل ما يبدأ", en: "The guide’s strongest technique" },
      sum: { ar: "لو الطلب ناقصه معلومة مؤثرة، زي الشهر أو سعر الخامة، المساعد غالبًا هيفترض قيمة ويكمّل. جملة واحدة في أول الطلب بتخليه يسألك بدل ما يخمّن.", en: "One sentence at the start of every important request fixes three problems: silent assumptions, complexity and untested errors." },
      book: [
        bp(7, "خلّيها بداية كل طلب مهم: «**قبل ما تديني الإجابة، اسألني عن أي معلومة ناقصة محتاجها. وبعد ما أجاوبك، ادّيني أبسط حل ممكن، واشرحهولي ببساطة، واختبر الحالات الاستثنائية.**»", "Make it the start of every important request: “**Before you give me the answer, ask me about any missing information you need. After I reply, give me the simplest possible solution, explain it simply, and test the edge cases.**”"),
        bp(7, "ليه الجملة دي بالذات؟ لأنها بتحل تلات مشاكل مرة واحدة: «اسألني عن الناقص» بيجبر الأداة **تكشف افتراضاتها** بدل ما تخمّن في صمت.", "Why this sentence? It fixes three problems at once: “ask me what’s missing” forces the tool to **reveal its assumptions** instead of silently guessing."),
        bp(7, "و«أبسط حل ممكن» بيمنع **التعقيد** اللي مش هتقدر تصونه أو تفهمه بعدين.", "“The simplest possible solution” prevents **complexity** you won’t be able to maintain or understand later."),
        bp(7, "و«اختبر الحالات الاستثنائية» بيكشف **الأخطاء** قبل ما توصل لتقرير الإدارة، مش بعده.", "“Test the edge cases” catches **errors** before they reach the management report, not after."),
      ],
      levels: {
        simple: [
          L("what", "جملة جاهزة تحطها في أول طلب مهم. بتقول للأداة: ماتخمّنش — اسألني. وبعدين ادّيني أبسط حل، واشرحه، واختبره على الحالات الصعبة.\n\nتشبيه: زي الطبيب الكفء اللي بيسأل ويشخّص قبل ما يكتب العلاج، بدل ما يكتب أشهر دوا لأي صداع.", "A ready sentence you put at the start of an important request. It tells the tool: don’t guess — ask me. Then give the simplest solution, explain it and test it on hard cases.\n\nLike a good doctor who asks questions before prescribing, instead of writing the most popular pill for any headache."),
          L("why", "لأن الأداة بطبعها بتجيب على طول، حتى لو المعلومات ناقصة. الجملة دي بتحوّل الحوار من «إجابة سريعة» لـ«فهم وبعدين حل».", "Because by nature the tool answers immediately even when information is missing. This sentence turns the chat from “quick answer” into “understand, then solve”."),
        ],
        mech: [
          L("how", "الجملة بتقسّم المحادثة لجولتين:\n1. **جولة أسئلة**: الأداة بتكشف إيه اللي محتاجاه (وده لوحده بيكشف افتراضات ما انتبهتلهاش).\n2. **جولة حل**: بعد ما تجاوب، حل بسيط + شرح + اختبار حالات حدّية (فراغ، صفر، تكرار، بيانات مش متوقعة).", "The sentence splits the chat into two rounds:\n1. **A question round**: the tool reveals what it needs (which alone exposes assumptions you missed).\n2. **A solution round**: after you reply, a simple fix + explanation + edge-case tests (blanks, zeros, duplicates, unexpected data)."),
          L("link", "نفس الفكرة بتتكرر في الكتاب: «الحالة الاستثنائية» أهم حاجة بتتنسى في الطلبات (المسرد صفحة 15)، و«خمس حالات اختبار» جزء من الـ Prompt الذهبي للكود ([[p10]])، و«اسألني عن أي معلومة ناقصة» أول سطر في Prompt تأسيس تطبيق الويب ([[w6]]).", "The same idea recurs throughout: the “edge case” is what requests forget most (glossary, page 15), “five test cases” is part of the golden code prompt ([[p10]]), and “ask me about missing information” opens the web-app setup prompt ([[w6]])."),
        ],
        practice: [
          L("example", "طلبت من الأداة معادلة تحسب نسبة الإنجاز. من غير الجملة: بتديك معادلة على طول. معاها: بتسألك «في مشاريع من غير هدف (صفر)؟ النسبة ممكن تعدّي 100%؟ الخلايا الفاضية تعني صفر؟» — تلات حالات كانت هتكسر تقريرك.", "You ask for a completion-rate formula. Without the sentence: you get a formula at once. With it: “Are there projects with no target (zero)? Can it exceed 100%? Do blank cells mean zero?” — three cases that would have broken your report."),
          L("apply", "احفظ الجملة في مكان سريع (ملاحظة على موبايلك أو في «دفتري») وابدأ بيها كل طلب مهم الأسبوع ده — دي مهمة الأسبوع الأول في [[p12|خطة الثلاثين يومًا]].", "Save the sentence somewhere handy (a phone note or “My notebook”) and start every important request with it this week — that’s week one of [[p12|the 30-day plan]]."),
        ],
        adv: [
          L("mistakes", "- **تجاهل أسئلة الأداة** والرد بـ«كمّل بأي افتراض»: بترجع للتخمين.\n- **قبول «أبسط حل» من غير اختبار**: البساطة من غير اختبار مش ضمان للأمان.", "- **Ignoring the tool’s questions** and replying “just assume something”: back to guessing.\n- **Accepting the “simplest solution” untested**: simplicity without testing isn’t safety."),
          L("whennot", "للمهام السريعة اللي مش مهمة (صياغة رسالة قصيرة) الجولة الزيادة ممكن تبطّئك. استخدمها لما الغلطة تكون مكلفة: أرقام، كود، قرار، تقرير.", "For quick, low-stakes tasks (a short message) the extra round may slow you down. Use it when mistakes are costly: numbers, code, decisions, reports."),
        ],
      },
    },
    {
      id: "p3", unit: "u6", pages: [8], diff: 1, min: 6, related: ["p1", "p4", "p9"], pre: ["p1"],
      title: { ar: "أربع غلطات بتضيّع فايدة أي طلب", en: "Four mistakes that ruin results, three prompts that fix them" },
      sum: { ar: "أغلب إعادة الشغل جاية من أربع غلطات: وصف مبهم للبيانات، وقبول أول إجابة، وتجاهل الخلايا الفاضية والحالات الناقصة، والتجربة على الملف الأصلي على طول.", en: "Vague descriptions, accepting the first answer, ignoring missing cases, applying straight to the real file — and how to fix them." },
      book: [
        bp(8, "**وصف مبهم للمعطيات** — الغلطة: «عندي جدول مبيعات». الصح: سمّي الأعمدة بأسمائها الحقيقية، وقول نوع كل عمود، وعدد الصفوف تقريبًا.", "**Vague data description** — wrong: “I have a sales table”. Right: name the real columns, state each column’s type and the approximate row count."),
        bp(8, "**قبول أول إجابة** — الغلطة: تاخد أول نتيجة وتكمل بيها. الصح: اطلب نسخة أبسط، وبعدين قارن بين النسختين قبل ما تعتمد.", "**Accepting the first answer** — wrong: taking the first result and running. Right: ask for a simpler version, then compare both before adopting."),
        bp(8, "**تجاهل الحالات الناقصة** — الغلطة: تفترض إن البيانات كاملة دايمًا. الصح: حدّد من بدري إيه اللي يحصل لو الخلية فاضية أو قسمة على صفر.", "**Ignoring missing cases** — wrong: assuming data is always complete. Right: decide upfront what happens with a blank cell or division by zero."),
        bp(8, "**التطبيق على طول على الملف الحقيقي** — الغلطة: تجرب النتيجة على بياناتك الأصلية. الصح: جرّب على نسخة وبيانات صغيرة الأول، وبعدين عمّم.", "**Applying straight to the real file** — wrong: trying the result on your original data. Right: test on a copy with small data first, then roll out."),
        bp(8, "تلات Prompts بتحسّن أي طلب كتبته: **لتحسين Prompt ضعيف**، و**لما النتيجة عامة ومش بتفيد**، و**للتحقق قبل الاعتماد النهائي**.", "Three prompts that improve any request: **to improve a weak prompt**, **when the result is generic and useless**, and **to verify before final adoption**."),
      ],
      levels: {
        simple: [
          L("what", "أربع غلطات شائعة جدًا بتضعف النتيجة حتى لو الأداة قوية. والجانب الإيجابي إن لكل غلطة تصحيح بسيط، ولكل نتيجة ضعيفة Prompt جاهز يعالجها.", "Four very common mistakes that spoil results even with a powerful tool. The good news: each has a simple fix, and each bad result has a ready prompt to repair it."),
          L("why", "لأن الغلطات دي صامتة: النتيجة شكلها كويس، وبعدين تكتشف المشكلة في التقرير أو قدام المدير.", "Because these mistakes are silent: the result looks fine, then the problem shows up in the report or in front of the manager."),
        ],
        mech: [
          L("how", "كل غلطة ليها مبدأ:\n- الوصف المبهم ← **الدقة** (أسماء وأنواع وأعداد).\n- أول إجابة ← **المقارنة** (نسخة أبسط وبعدين مقارنة).\n- الحالات الناقصة ← **التحديد من بدري** (إيه اللي يحصل مع الفراغ والصفر).\n- الملف الحقيقي ← **الأمان** (نسخة وبيانات صغيرة الأول).", "Each mistake has a principle:\n- Vague description → **precision** (names, types, counts).\n- First answer → **comparison** (a simpler version, then compare).\n- Missing cases → **decide upfront** (what happens with blanks and zeros).\n- Real file → **safety** (a copy and small data first)."),
          L("link", "غلطة «الملف الحقيقي» بتتحوّل بعدين لقاعدة ثابتة: اشتغل دايمًا على نسخة ([[p10]])، وبعدين قاعدة «ما تمسّش البيانات الأصلية» في أدوات البايثون ([[y2]]).", "The “real file” mistake later becomes an unbreakable rule: always work on a copy ([[p10]]), then “never touch the original data” in Python tools ([[y2]])."),
        ],
        practice: [
          L("example", "**قبل**: «عندي جدول مبيعات، اعمل لي تحليل».\n**بعد**: «جدول 3 أعمدة: التاريخ (تاريخ)، الفرع (نص)، القيمة (رقم)، حوالي 2000 صف. بعض القيم فاضية — اعتبرها مش متاحة مش صفر. اعمل التحليل على أول 50 صف الأول».", "**Before**: “I have a sales table, analyse it.”\n**After**: “A 3-column table: date (date), branch (text), value (number), about 2,000 rows. Some values are blank — treat them as unavailable, not zero. Run the analysis on the first 50 rows first.”"),
          L("apply", "اختار واحد من الـ Prompts التلاتة تحت الدرس وطبّقه على نتيجة وصلتلها الأسبوع ده وما عجبتكش.", "Pick one of the three prompts below and apply it to a result you got this week and didn’t like."),
        ],
        adv: [
          L("mistakes", "- إصلاح الغلطة الرابعة بالتعميم بدري: جرّبت على 50 صف ونجحت، فعمّمت على 50 ألف فيها حالات ما ظهرتش في العينة. اختار عينة فيها الحالات الصعبة عمدًا.", "- Fixing mistake four by generalising too early: it worked on 50 rows, so you rolled out to 50,000 with cases the sample didn’t show. Pick a sample that deliberately includes hard cases."),
          L("whennot", "Prompt التحقق مش بيغني عن تحققك إنت: الأداة ممكن تراجع نفسها وتأكد غلطها. استخدمه عشان تكشف الافتراضات، وبعدين راجع الأرقام المهمة بنفسك ([[f5]]).", "The verification prompt doesn’t replace your own check: the tool can review itself and confirm its own error. Use it to surface assumptions, then check important numbers yourself ([[f5]])."),
        ],
      },
    },
    {
      id: "p4", unit: "u6", pages: [8], diff: 1, min: 5, scene: "convo", related: ["p3", "p1", "t1"], pre: ["p1"],
      title: { ar: "الرد مش عاجبك؟ إزاي تصلحه من غير ما تبدأ من الصفر", en: "Managing the conversation: what to do when you dislike the result" },
      sum: { ar: "لما الرد ما يعجبكش، ما تبدأش من الأول. حدّد العيب بالظبط، زي «الأرقام ناقصة» أو «الملخص طويل»، والمساعد هيصلّح الجزء ده بس.", en: "The biggest gap between beginner and skilled isn’t the first request but what follows: the five-step loop and three common situations." },
      book: [
        bp(8, "أكبر فرق بين مستخدم مبتدئ ومتمكن مش في الطلب الأول، لكن في اللي بيعمله بعده. **المبتدئ بيفتح محادثة جديدة، والمتمكن بيصحّح المسار في نفس المحادثة.**", "The biggest difference between a beginner and a skilled user isn’t the first request but what they do next. **The beginner starts a new chat; the skilled user corrects course in the same chat.**"),
        bp(8, "الدورة: اطلب ← اقرأ بعين ناقدة ← حدّد الخلل بدقة ← صحّح في نفس المحادثة ← اعتمد أو كرّر.", "The loop: ask → read critically → pinpoint the flaw → correct in the same chat → adopt or repeat."),
        bp(8, "النتيجة طويلة ومشتتة؟ قول: «اختصرها لنص الطول مع الحفاظ على كل نقطة تقدر تنفّذها، وامسح كل تمهيد أو تكرار».", "Long and scattered? Say: “Cut it to half the length while keeping every actionable point, and delete all preamble and repetition.”"),
        bp(8, "النتيجة صح بس مش مناسبة ليك؟ قول: «ده صح بشكل عام، بس وضعي مختلف في [حدّد الفرق]. أعد الحل بناءً على القيد ده بالذات».", "Correct but not right for you? Say: “This is generally right, but my situation differs in [state the difference]. Redo the solution based on that constraint.”"),
        bp(8, "النتيجة فيها أرقام مش واضح مصدرها؟ قول: «اذكر لكل رقم أو ادعاء مصدره، وفرّق بوضوح بين اللي إنت واثق منه واللي ترجيح منك».", "Looks made up? Say: “Give the source for every number or claim, and clearly separate what you’re sure of from what you’re guessing.”"),
      ],
      levels: {
        simple: [
          L("what", "لما الإجابة مش عاجباك، ما تقفلش المحادثة. اقرأها، حدّد إيه الغلط بالضبط، واطلب التعديل في نفس المحادثة.\n\nزي مراجعة مسودة عقد: ما بتطلبش عقد جديد، بتعلّم على البند اللي محتاج تعديل وبتقول التعديل المطلوب.", "When you don’t like the answer, don’t close the chat. Read it, pinpoint exactly what’s wrong, and ask for the fix in the same chat.\n\nLike reviewing a draft contract: you don’t ask for a new contract; you mark the clause that needs changing and state the change."),
          L("why", "لأن المحادثة الحالية فيها كل الـ Context اللي بنيته. المحادثة الجديدة بتبدأ من صفر فبتعيد نفس الغلطات.", "Because the current chat holds all the context you built. A new chat starts from zero and repeats the same mistakes."),
        ],
        mech: [
          L("how", "السر في الخطوة التالتة: **حدّد الخلل بدقة**. عبارة «مش عاجبني» ما بتفيدش الأداة بحاجة. «طويلة»، «مش مناسبة لميزانيتي كذا»، «الرقم التالت من غير مصدر» — دي تعليمات تقدر تنفّذها.", "The secret is step three: **pinpoint the flaw**. “I don’t like it” helps nothing. “Too long”, “doesn’t fit my budget of X”, “the third number has no source” — those are actionable instructions."),
          L("inside", "كل رد منك بيتضاف لنافذة الـ Context، فالأداة بتعدّل اتجاهها بناءً على ملاحظتك الدقيقة مع الاحتفاظ باللي فات ([[f1]]).", "Every reply you send is added to the context window, so the tool adjusts course based on your precise note while keeping everything before it ([[f1]])."),
        ],
        practice: [
          L("example", "طلبت خطة تسويق وجت بإعلانات تلفزيون. بدل محادثة جديدة: «ده صح بشكل عام، بس ميزانيتي 20 ألف جنيه بس ومش بستخدم التلفزيون. أعد الخطة بناءً على القيد ده».", "You asked for a marketing plan and got TV ads. Instead of a new chat: “This is generally right, but my budget is only EGP 20,000 and I don’t use TV. Redo the plan based on this constraint.”"),
          L("apply", "في [[prompt|مختبر الـ Prompt]] افتح تبويب «صحّح النتيجة» وانسخ الجملة المناسبة لآخر نتيجة ما عجبتكش.", "In the [[prompt|prompt lab]] open the “Fix the result” tab and copy the right sentence for the last result you didn’t like."),
        ],
        adv: [
          L("mistakes", "- **تكرار نفس الطلب بصياغة تانية** بدل ما تحدد الخلل.\n- **محادثة طويلة جدًا** التعليمات القديمة بتتشتت فيها — ساعتها لخّص اللي اتفقتوا عليه وابدأ بالملخص.", "- **Repeating the same request in other words** instead of naming the flaw.\n- **A very long chat** where old instructions get diluted — then summarise what you agreed and start from that summary."),
          L("whennot", "ابدأ محادثة جديدة لما الموضوع يتغيّر خالص، أو لما معلومات غلط تراكمت في المحادثة الحالية وصعب تلغيها.", "Start a new chat when the topic changes completely, or when wrong information has piled up in the current one and is hard to undo."),
        ],
      },
    },
    {
      id: "p5", unit: "u6", pages: [8, 9, 10], diff: 1, min: 9, scene: "daily", related: ["p4", "p6", "p12"], pre: ["p1"],
      title: { ar: "إزاي الذكاء الاصطناعي يرتّب يومك بدل ما يزوّده ضغط؟", en: "Productivity prompts and running your day" },
      sum: { ar: "الزحمة مش في عدد المهام، الزحمة في إنها مش مترتبة. المساعد يقدر يحوّل رسايلك ومحاضر اجتماعاتك لقائمة واضحة: مين يعمل إيه، وإمتى، وتبدأ بإيه.", en: "Organising the day, meetings, tasks, professional writing, research, follow-up, process improvement, delegation, triage and the all-in-one prompt." },
      book: [
        bp(8, "Prompts عملية بتساعدك تنظّم وتابع وتنجز وتدير الاجتماعات بوضوح وسرعة — **ماتطلبش إجابة بس، اطلب نتيجة تقدر تنفّذها**.", "Practical prompts for organising, following up, getting things done and running meetings clearly and quickly — **don’t ask for an answer only, ask for an actionable result**."),
        bp(8, "**تنظيم اليوم**: رتّب المهام حسب الأولوية والوقت والطاقة الذهنية مع أول تلات مهام وليه اخترت كل واحدة، وقسّم اليوم لفترات تركيز عميق وراحة ومتابعة.", "**Organising the day**: ranking tasks by priority, time and mental energy with the first three tasks and why, and splitting the day into deep focus, rest and follow-up blocks."),
        bp(8, "**الاجتماعات**: قبل الاجتماع أجندة فيها الهدف والقرارات المطلوبة ومين لازم يحضر فعلًا، وبعده (صفحة 9) محضر مرتب بملخص تنفيذي وقرارات ونقاط متابعة بمسؤول وموعد.", "**Meetings**: before, an agenda with goal, required decisions and who must attend; after (page 9), tidy minutes with an executive summary, decisions and follow-ups with owner and date."),
        bp(9, "**المهام والمشروعات**: من هدف لمهام بمسؤول وموعد ومعيار إنجاز. **الكتابة المهنية**: رسالة واضحة تنتهي بطلب، ورسالة إقناع تبدأ بما يهم اللي هيقرأ.", "**Tasks and projects**: from goal to tasks with owner, date and done-criterion. **Professional writing**: a clear message ending in a request, and a persuasive one starting with what matters to the reader."),
        bp(9, "**البحث**: استخراج منظم يفرّق بين الحقيقة والرأي والافتراض. **المتابعة**: تقرير يقارن الخطة بالإنجاز. **تحسين العمليات**: نقاط الضعف والهدر وإيه اللي ممكن يتأتمت. **التفويض**: نص تكليف بالنتيجة والصلاحيات ومعيار القبول، ومتابعة من غير إزعاج.", "**Research**: structured extraction separating fact, opinion and assumption. **Follow-up**: plan vs. achieved. **Process improvement**: weak points, waste and what can be automated. **Delegation**: a brief with result, authority and acceptance criteria, and gentle follow-up."),
        bp(10, "**الفرز السريع**: أربع فئات — رد اليوم، تفويض، تأجيل آمن، تجاهل — مع رد جاهز لكل بند عاجل. و**الـ Prompt الشامل للإنتاجية** لما مش عارف تبدأ منين.", "**Quick triage**: four groups — reply today, delegate, safely postpone, ignore — with a ready reply for each urgent item. And the **all-in-one productivity prompt** when you don’t know where to start."),
        bp(10, "دورة الشغل اليومية: افهم (الهدف والـ Context) ← نظّم (رتّب المعلومات) ← قرّر (قارن واختار) ← نفّذ (حوّلها لخطوات) ← راجع (حلّل وكرّر).", "The daily cycle: understand (goal and context) → organise (arrange information) → decide (compare and choose) → execute (turn into steps) → review (analyse and repeat)."),
      ],
      levels: {
        simple: [
          L("what", "مجموعة Prompts جاهزة لأكتر المهام اللي بتستهلك يومك: ترتيب المهام، والاجتماعات، والرسائل، والمتابعة، والتفويض، وفرز البريد. كل Prompt بيطلب **نتيجة تقدر تنفّذها فورًا**: جدول، محضر، رسالة جاهزة، خطة.", "Ready prompts for what eats your day most: task ranking, meetings, messages, follow-up, delegation and inbox triage. Each asks for **something you can act on immediately**: a schedule, minutes, a ready message, a plan."),
          L("why", "لأن المهام دي صغيرة بس بتتكرر كل يوم، ولو وفّرت 10 دقائق في كل واحدة، المجموع يوصل لساعات في الأسبوع — هدف الأسبوع التاني في خطة الكتاب: **توفير ساعة واحدة على الأقل أسبوعيًا**.", "Because these tasks are small but daily, and saving 10 minutes on each adds up to hours a week — the book’s week-two goal: **save at least one hour a week**."),
        ],
        mech: [
          L("how", "لاحظ بنية أي Prompt في القسم ده: بياناتك بين أقواس + **معايير واضحة** (الأولوية، الوقت، الطاقة) + **شكل المخرج** (جدول زمني، محضر بأقسام محددة) + **سؤال يكشف المخاطر** (إيه اللي ممكن يتأجل بأمان، إيه اللي لسه ما اتحسمش).", "Look at the structure of any prompt here: your data in brackets + **clear criteria** (priority, time, energy) + **output shape** (a timetable, minutes with set sections) + **a risk-revealing question** (what can safely wait, what’s still undecided)."),
          L("link", "كلها تطبيقات للمعادلة الحاكمة ([[p1]])، ودورة الشغل اليومية نسخة يومية من الترتيب الاستراتيجي ([[p7]]): افهم قبل ما تقرر.", "They’re all applications of the governing equation ([[p1]]), and the daily cycle is a daily version of the strategic order ([[p7]]): understand before deciding."),
        ],
        practice: [
          L("example", "**مدير إداري** بعد اجتماع ساعتين ومعاه ملاحظات مبعثرة: يلصقها في Prompt «بعد الاجتماع»، فياخد ملخص تلات أسطر، والقرارات، وجدول متابعة بالمسؤول والموعد، والمسائل المعلقة — يبعته للحضور في 5 دقائق بدل ساعة.", "**An admin manager** leaves a two-hour meeting with scattered notes, pastes them into the “after the meeting” prompt and gets a three-line summary, decisions, a follow-up table with owners and dates, and open issues — sent to attendees in 5 minutes instead of an hour."),
          L("apply", "اختار اتنين Prompts بس من القائمة تحت الدرس (زي ترتيب المهام وما بعد الاجتماع) وطبّقهم يوميًا لمدة أسبوع. قِس الوقت اللي وفّرته.", "Pick just two prompts below (e.g. task ranking and after-the-meeting) and use them daily for a week. Measure the time saved."),
        ],
        adv: [
          L("mistakes", "- **لصق ملاحظات فيها أسماء وبيانات حساسة** من غير مراجعة سياسة الشركة.\n- **إرسال المحضر من غير مراجعة**: الأداة ممكن تنسب قرار لغير صاحبه.\n- **استخدام كل الـ Prompts مرة واحدة**: تشتت. ابدأ باتنين.", "- **Pasting notes with names and sensitive data** without checking company policy.\n- **Sending minutes unreviewed**: the tool may attribute a decision to the wrong person.\n- **Using every prompt at once**: scatter. Start with two."),
          L("whennot", "قرارات الأولوية اللي بتمسّ ناس (تقييم، تكليف حساس) تفضل قرارك؛ استخدم الـ Prompt عشان ترتّب أفكارك مش عشان تحكم.", "Priority decisions that affect people (evaluation, sensitive assignments) stay yours; use the prompt to organise your thinking, not to pass judgement."),
        ],
      },
      case: { field: { ar: "الإدارة", en: "Administration" }, title: { ar: "صباح مدير بخمسين رسالة وتلات اجتماعات", en: "A manager’s morning: fifty messages and three meetings" },
        steps: {
          problem: { ar: "خمسين رسالة وطلب بيوصلوا الصبح، وتلات اجتماعات، ومش عارف يبدأ منين.", en: "Fifty messages and requests arrive each morning, plus three meetings, and no idea where to start." },
          old: { ar: "بيقرأ الرسائل بالترتيب، بيرد على السهل ويأجّل المهم لآخر اليوم.", en: "Reads messages in order, answers the easy ones and pushes the important ones to the end of the day." },
          idea: { ar: "الفرز السريع بأربع فئات، وبعدين ترتيب المهام بالطاقة الذهنية، وبعدين أجندة مختصرة لكل اجتماع.", en: "Quick triage into four groups, then ranking tasks by mental energy, then a short agenda per meeting." },
          steps: { ar: "1. يلصق الرسائل في Prompt الفرز.\n2. ياخد الفئة الأولى مع ردودها الجاهزة ويراجعها.\n3. يرتّب مهام اليوم مع ارتباطاته الثابتة.\n4. يحوّل موضوع كل اجتماع لأجندة.", en: "1. Paste messages into the triage prompt.\n2. Take group one with its ready replies and review them.\n3. Rank today’s tasks around fixed commitments.\n4. Turn each meeting topic into an agenda." },
          result: { ar: "بيبدأ يومه بأهم تلات مهام وردود عاجلة جاهزة للمراجعة (الوقت الموفر بيختلف من واحد للتاني؛ قِسه بنفسك).", en: "Starts the day with the top three tasks and urgent replies ready to review (time saved varies; measure your own)." },
          risks: { ar: "ما تبعتش أي رد جاهز قبل ما تقراه، وما تلصقش الرسائل السرية في أداة ما اعتمدتهاش شركتك.", en: "Never send a ready reply before reading it; confidential messages don’t go into a tool your company hasn’t approved." },
        } },
    },
    {
      id: "p6", unit: "u6", pages: [10, 11], diff: 2, min: 8, related: ["p5", "p7", "y4"], pre: ["p1"],
      title: { ar: "قبل ما تدور على حل، افهم المشكلة الأول", en: "Strategic prompts: understanding, diagnosis and priorities" },
      sum: { ar: "«الإنتاج نزل» عَرَض، مش سبب. قبل ما تقترح حل، قسّم الرقم حسب الخط والوردية واليوم، واختبر كل تفسير بدليل.", en: "The previous section helps you get work done; this one helps you know which work is worth doing at all." },
      book: [
        bp(10, "القسم اللي فات بيساعدك تنجز الشغل. والقسم ده بيساعدك **تعرف أي شغل يستاهل الإنجاز أصلًا** — وده فرق جوهري.", "The previous section helps you get work done. This one helps you **know which work is worth doing at all** — a fundamental difference."),
        bp(10, "**الفهم والتعلم**: تعلّم موضوع من الصفر بالصورة الكبيرة الأول، وبعدين العناصر، وبعدين مثال واختبار، وثبّت اللي اتعلمته بأسئلة بتختبر الفهم والتطبيق مش الحفظ.", "**Understanding and learning**: learn a topic from zero — big picture first, then elements, then an example and a quiz — and consolidate with questions that test understanding and application, not memory."),
        bp(10, "**التحليل والتشخيص**: فكّك المشكلة لعناصرها والأسباب الجذرية المحتملة مرتبة بالاحتمال والتأثير، واكشف الأنماط الخفية مع شرح ليه كل نمط يستاهل الانتباه.", "**Analysis and diagnosis**: break the problem into its elements and likely root causes ranked by probability and impact, and reveal hidden patterns with why each deserves attention."),
        bp(10, "**مقارنة خيارين** من ناحية التكلفة والوقت والمخاطر والعائد وسهولة التنفيذ و**قابلية التراجع عن القرار بعدين**، في جدول مع توصية وسببها.", "**Comparing two options** by cost, time, risk, return, ease and **how reversible the decision is**, in a table with a recommendation and its reason."),
        bp(10, "**ترتيب الأولويات** بمعايير قوة التأثير والاستعجال والجهد ومخاطر التأجيل: إيه اللي تبدأ بيه وليه، وإيه اللي يتأجل بأمان، وإيه اللي يتلغى من غير خسارة.", "**Prioritising** by impact, urgency, effort and the risk of delay: what to start with and why, what can safely wait, what can be dropped."),
        bp(11, "**القرار المدروس**: افهم هدفي وقيودي الأول، وبعدين البدائل ومزايا ومخاطر كل بديل، وبعدين أوصِ بأحسن قرار مع إيه اللي ممكن يخلّيني أغيّره بعدين.", "**A considered decision**: understand my goal and constraints first, then the options with pros and risks, then recommend the best with what might make me change it later."),
      ],
      levels: {
        simple: [
          L("what", "Prompts بتخلي الأداة **شريك تفكير** مش آلة كتابة: تشرحلك موضوع جديد، وتفكّك مشكلة، وتقارن خيارين، وترتّب أولوياتك، وتساعدك في قرار.", "Prompts that make the tool a **thinking partner** rather than a typewriter: explaining a new topic, breaking down a problem, comparing two options, ranking priorities and helping with a decision."),
          L("why", "لأن إنجاز المهمة الغلط بسرعة أسوأ من إنجاز المهمة الصح ببطء. الـ Prompts دي بتحمي وقتك من شغل ما يستاهلش.", "Because doing the wrong task fast is worse than doing the right one slowly. These prompts protect your time from work that isn’t worth it."),
        ],
        mech: [
          L("how", "كل Prompt بيفرض **معايير صريحة**: الاحتمال والتأثير في التشخيص، والتكلفة والعائد وقابلية التراجع في المقارنة، والاستعجال والجهد في الأولويات. المعايير الصريحة بتمنع الأداة تحكم بالانطباع.", "Each prompt imposes **explicit criteria**: probability and impact in diagnosis; cost, return and reversibility in comparison; urgency and effort in priorities. Explicit criteria stop the tool from judging by impression."),
          L("inside", "خد بالك من معيار «**قابلية التراجع**»: قرار تقدر ترجع عنه بسهولة تقدر تاخده أسرع، وقرار مفيش رجعة فيه يستاهل تحليل أعمق. وده معيار ناس كتير بتنساه.", "Notice “**reversibility**”: a decision you can easily undo can be made faster; an irreversible one deserves deeper analysis. Many people forget this criterion."),
          L("link", "Prompt «تفكيك مشكلة» هو البذرة اللي بتكبر بعدين لـ«الأسئلة السبعة» في التحليل بالبايثون ([[y4]]).", "The “break down a problem” prompt is the seed of the “seven questions” in Python analysis ([[y4]])."),
        ],
        practice: [
          L("example", "مسؤول مشتريات بيختار بين موردين: بيطلب مقارنة في جدول بالتكلفة ووقت التوريد والمخاطر والجودة وقابلية التراجع (عقد سنة ولا شهر؟). التوصية بتيجي بسبب واضح، ويقدر يعرضها على مديره.", "A purchasing officer choosing between two suppliers asks for a table by cost, lead time, risk, quality and reversibility (one-year vs monthly contract). The recommendation comes with a clear reason they can show their manager."),
          L("apply", "خد قائمة مهامك المؤجلة وطبّق عليها Prompt «ترتيب الأولويات». إيه اللي ممكن يتلغى خالص من غير خسارة؟", "Run your backlog through the prioritising prompt. What can be dropped entirely with no loss?"),
        ],
        adv: [
          L("mistakes", "- طلب «أفضل قرار» من غير ما تذكر الهدف والقيود: أحسن قرار لمين؟\n- قبول ترتيب الأسباب كحقيقة: هي **فرضيات** محتاجة تأكيد — عشان كده الـ Prompt بيطلب «إيه اللي محتاجين نعرفه عشان نتأكد من كل سبب».", "- Asking for “the best decision” without goal and constraints: best for whom?\n- Taking the ranked causes as fact: they’re **hypotheses** to confirm — hence the prompt asks “what we need to know to confirm each cause”."),
          L("whennot", "لما البيانات شبه معدومة، ماتطلبش قرار — ابدأ بـ Prompt «المعلومات الناقصة» ([[p7]]).", "When data is almost absent, don’t ask for a decision; start with the “missing information” prompt ([[p7]])."),
        ],
      },
    },
    {
      id: "p7", unit: "u6", pages: [11], diff: 2, min: 8, scene: "strategic", related: ["p6", "s2", "y4"], pre: ["p6"],
      title: { ar: "إزاي تختار بين كذا قرار من غير ما تتحيز لرأيك؟", en: "Scenarios, challenging ideas and the all-in-one strategic prompt" },
      sum: { ar: "أول حل بييجي في بالك بيكسب انحيازك من غير ما تاخد بالك. اطلب من المساعد يبني بدائل ويعارض فكرتك بالأرقام قبل ما تصرف فلوس.", en: "Three scenarios, a pre-mortem, “don’t just agree with me”, missing information, and the prompt that enforces an order you can’t skip." },
      book: [
        bp(11, "**تلات سيناريوهات**: متفائل وواقعي ومتحفظ، ولكل سيناريو العلامات المبكرة اللي بتشير له وإيه اللي تعمله أول ما تظهر.", "**Three scenarios**: optimistic, realistic and cautious, each with the early signs pointing to it and what to do when they appear."),
        bp(11, "**اكتشاف نقاط الفشل مسبقًا**: راجع الخطة كأنك مسؤول عن كشف نقاط فشلها قبل التنفيذ — المخاطر والثغرات والافتراضات الخطرة مرتبة بالخطورة مع وقاية أو خطة بديلة.", "**Pre-mortem**: review the plan as if responsible for exposing its failure points before execution — risks, gaps and dangerous assumptions ranked by severity with prevention or a fallback."),
        bp(11, "**اختبار فكرة**: «**لا توافقني تلقائيًا**. اختبر فكرتي…» — نقاط الضعف والافتراضات اللي ما اتقالتش، وبعدين — بعد النقد بس — إزاي تتحسّن. و**توليد بدائل أبسط** مع إيه اللي هنتنازل عنه مقابل البساطة.", "**Testing an idea**: “**Don’t automatically agree with me.** Test my idea…” — weaknesses and unstated assumptions, then — only after critique — how to improve it. And **simpler alternatives** with what we give up for simplicity."),
        bp(11, "**التخطيط والمراجعة**: من هدف لخطة بمراحل وأول خطوة صغيرة تنفّذها في ساعة، والتعلم من التجربة بتحويل الدروس لتحسينات عملية مش ملاحظات عامة.", "**Planning and review**: from goal to a phased plan with a first step small enough to do within an hour, and learning from experience by turning lessons into concrete improvements, not general notes."),
        bp(11, "**المعلومات الناقصة**: إيه اللي تقدر تستنتجه بثقة، وإيه اللي مش هتقدر تجزم بيه، وترتيب الناقص حسب أثره على القرار، وبعدين أرخص وأسرع طريقة تجيب بيها المعلومة الأولى بس.", "**Missing information**: what can be concluded with confidence, what can’t, the gaps ranked by impact on the decision, then the cheapest, fastest way to get just the first one."),
        bp(11, "**الـ Prompt الاستراتيجي الشامل** بيشتغل لأنه بيفرض ترتيب ما ينفعش تقفز فوقه: الفهم ← التحليل ← التشخيص ← المخاطر ← البدائل ← القرار ← الخطوات. **أغلب القرارات الخاطئة بتيجي من البدء بالحل قبل ما تفهم المشكلة.**", "**The all-in-one strategic prompt** works because it enforces an order you can’t skip: understand → analyse → diagnose → risks → options → decision → steps. **Most bad decisions come from starting with the solution before understanding the problem.**"),
      ],
      levels: {
        simple: [
          L("what", "أدوات تفكير متقدمة: تخيّل تلات مستقبلات محتملة، واكشف فين خطتك هتفشل قبل ما تبدأ، واطلب من الأداة **تنتقدك مش تجاملك**، واعرف إيه اللي ناقصك قبل ما تقرر.", "Advanced thinking tools: imagine three possible futures, find where your plan will fail before you start, ask the tool to **critique rather than flatter you**, and know what you’re missing before deciding."),
          L("why", "لأن الأدوات بتميل توافق على اللي إنت بتقوله. جملة «لا توافقني تلقائيًا» بتكسر الميل ده، والـ Prompt الشامل بيمنعك إنت من القفز على الحل.", "Because tools tend to agree with you. “Don’t automatically agree with me” breaks that tendency, and the all-in-one prompt stops you jumping to the solution."),
        ],
        mech: [
          L("how", "الـ Prompt الشامل بيقسّم التفكير لسبع محطات بترتيب إلزامي، وبيطلب في الآخر **فصل الحقائق عن الافتراضات** وذكر الناقص قبل البدء. بكده محدش — لا إنت ولا الأداة — يقدر يقفز للحل.", "The all-in-one prompt splits thinking into seven mandatory stations and finally asks to **separate facts from assumptions** and state gaps before starting. So nobody — you or the tool — can jump to the solution."),
          L("inside", "في «المعلومات الناقصة» فكرة ذكية: **مش كل معلومة ناقصة مهمة**. بعضها بيغيّر القرار جذريًا، وبعضها معرفته مفيدة لكن مش ضرورية. والحل: ابدأ بأرخص طريقة تجيب بيها الأهم بس.", "“Missing information” has a smart idea: **not every gap matters**. Some change the decision radically; some are “nice to know”. The fix: get only the most important one, the cheapest way."),
          L("link", "نفس الترتيب الإلزامي بيظهر في التحليل بالبايثون (الجودة وبعدين الأسئلة وبعدين الرسم — [[y4]]) وفي بناء النظام (ارسم الحالة وبعدين وحّد التعريفات وبعدين ابنِ — [[s2]]).", "The same mandatory order appears in Python analysis (quality, then questions, then charts — [[y4]]) and in building systems (map the current state, unify definitions, then build — [[s2]])."),
        ],
        practice: [
          L("example", "مدير مصنع بيفكر يضيف وردية تالتة. الـ Prompt الشامل بيجبره الأول يفهم الطلب الحقيقي، وبعدين يشخّص ليه الإنتاج ناقص (ممكن يكون السبب توقفات، مش نقص ساعات)، وبعدين المخاطر والبدائل، فيكتشف إن تقليل التوقفات أرخص من وردية جديدة.", "A plant manager considers a third shift. The all-in-one prompt forces him to understand real demand first, diagnose why output is short (it may be stoppages, not hours!), then risks and options — revealing that cutting stoppages is cheaper than a new shift."),
          L("apply", "طبّق «اكتشاف نقاط الفشل مسبقًا» على خطة إنت شغال عليها دلوقتي. اختار أخطر تلات نقاط واكتب لكل واحدة وقاية بسيطة.", "Apply the pre-mortem to a plan you’re working on. Take the three most dangerous points and write a simple prevention for each."),
        ],
        adv: [
          L("mistakes", "- **طلب النقد وبعدين الدفاع عن الفكرة**: الهدف تسمع مش تنتصر.\n- **سيناريوهات من غير علامات مبكرة**: السيناريو اللي ما تقدرش تعرف إمتى بدأ يتحقق ما بيساعدكش تتصرف في الوقت المناسب.", "- **Asking for critique then defending the idea**: the aim is to listen, not to win.\n- **Scenarios without early signs**: a scenario you can’t detect starting doesn’t help you act."),
          L("whennot", "للقرارات الصغيرة اللي تقدر ترجع عنها، الـ Prompt الشامل مبالغة؛ يكفي Prompt مقارنة سريع. احفظه للقرارات الكبيرة الغامضة.", "For small, reversible decisions the all-in-one prompt is overkill; a quick comparison is enough. Keep it for big, ambiguous decisions."),
        ],
      },
    },
    {
      id: "p8", unit: "u6", pages: [12, 13], diff: 2, min: 10, scene: "brain", lab: "brain", related: ["f1", "p11", "s1"], pre: ["p1"],
      title: { ar: "إزاي تخلي ملفات القسم تبقى عقل تقدر تسأله؟", en: "The second brain: from scattered files to a knowledge system" },
      sum: { ar: "لما سياسات القسم تبقى متفرقة، كل حد بيجاوب من ذاكرته. لو جمعت المستندات المعتمدة في مكان واحد، تقدر تسألها وتاخد الإجابة ومعاها مرجعها.", en: "NotebookLM: you set the knowledge AI may think with, and every answer comes with a citation back to the source." },
      book: [
        bp(12, "**جيميني نوتبوك (NotebookLM)**: أداة بتخليك تحدد بالضبط المعرفة اللي مسموح للذكاء الاصطناعي يفكر عليها — وهنا بتبدأ قيمتها الحقيقية.", "**NotebookLM**: a tool that lets you define exactly the knowledge AI may think with — and that’s where its real value begins."),
        bp(12, "**المبدأ**: بتنشئ «دفتر» لموضوع أو مشروع وتحط فيه المصادر اللي إنت واثق فيها، فكل الإجابات بتيجي منها بس. **الفرق**: المساعد العادي ممكن يخلط مصادرك بالبحث الخارجي. **الضمانة**: كل إجابة معاها استشهادات بترجعك للمكان الأصلي عشان تتحقق بنفسك.", "**Principle**: you create a “notebook” for a topic or project with sources you trust, and every answer comes only from them. **Difference**: an ordinary assistant may mix your sources with outside search. **Guarantee**: every answer carries citations back to the original place so you can verify."),
        bp(12, "بيقبل ملفات نصية ومستندات وعروض وجداول وصور وكتب إلكترونية وصفحات ويب وفيديوهات وتسجيلات صوت ومستندات سحابة — وملفات السحابة المستوردة **بتتزامن تلقائيًا** لما الأصل يتغيّر.", "It accepts text files, documents, slides, spreadsheets, images, e-books, web pages, videos, audio and cloud documents — and imported cloud files **sync automatically** when the original changes."),
        bp(12, "بيطلّع: تقارير، وجداول بيانات، وخرائط ذهنية، وعروض وشرائح، وبطاقات واختبارات، وملخصات صوتية (أكتر من 80 لغة منها العربية)، وملخصات فيديو، وصور ورسوم.", "It produces reports, data tables, mind maps, slides, flashcards and quizzes, audio overviews (80+ languages including Arabic), video overviews, and images and graphics."),
        bp(12, "عشر قواعد: دفتر واحد = هدف واحد · ابدأ بالمصادر الأصلية · البحث للاكتشاف مش للتصديق · اختار المصادر قبل كل سؤال · اسأل أسئلة أقوى من «لخّص» · خلّي السؤال الأخير ثابت · الخريطة الذهنية الأول · لكل مخرج وظيفته · ماتحوّلش استنتاج لمصدر قبل ما تراجعه · حدّث المصادر باستمرار.", "Ten rules: one notebook = one goal · start with primary sources · search to discover, not to believe · choose sources before each question · ask better questions than “summarise” · keep the last question fixed · mind map first · each output has its job · never turn a conclusion into a source before reviewing it · keep sources updated."),
        bp(12, "دورة العقل التاني: جمع المصادر ← تصفيتها ← خريطة الفكرة ← اكتشاف التناقضات ← أسئلة عميقة ← استنتاجات موثقة ← ملاحظات معتمدة ← مخرج نهائي ← تحديث مستمر.", "The second-brain cycle: collect sources → filter → map the idea → find contradictions → deep questions → documented conclusions → approved notes → final output → continuous update."),
        bp(13, "خد بالك من حاجتين: **الخصوصية** — بيانات شركتك تحت سياسة شركتك الأول، فراجعها قبل ما ترفع أي مستند حساس. و**حدود الاستخدام** — الحصة بتعتمد جزئيًا على تكلفة المهمة، فوزّع المهام الثقيلة على فترات.", "Two cautions: **privacy** — your company’s data is governed by company policy first, so check it before uploading anything sensitive. **Usage limits** — quota depends partly on the task’s cost, so spread heavy tasks over time."),
      ],
      levels: {
        simple: [
          L("what", "**العقل التاني** مكتبة صغيرة إنت بتختار كتبها، وأمين مكتبة ذكي ما بيجاوبش إلا من الكتب دي، وبيقولك في كل إجابة: «ده من الكتاب الفلاني، الصفحة كذا».", "A **second brain** is a small library whose books you choose, with a smart librarian who answers only from those books and tells you each time: “this is from that book, that page”."),
          L("why", "لأن المساعد العادي بيجاوب من ذاكرته العامة وممكن يخلطها بالبحث الخارجي. هنا الإجابة من **مصادرك إنت** — سياسات الشركة، أدلة التشغيل، تقارير القسم — ومعاها الدليل.", "Because an ordinary assistant answers from general memory and may mix in outside search. Here the answer comes from **your sources** — company policies, manuals, department reports — with the evidence attached."),
        ],
        mech: [
          L("how", "تحط المصادر في دفتر ← تختار منها اللي يخص السؤال ← الأداة بتبحث جوّاهم بس ← بتكتب الإجابة وتحط لكل جملة ((citation|استشهادًا)) يشير لمكانها في المصدر.", "You add sources to a notebook → pick the ones relevant to the question → the tool searches only inside them → it writes the answer with a ((citation|citation)) for each sentence pointing to its place in the source."),
          L("inside", "ليه القاعدة الرابعة «اختار المصادر قبل كل سؤال»؟ لو عندك 40 مصدر والسؤال يخص 6 بس، فعّل الستة: **التشويش بيقل والإجابة بتدقّ**. وليه القاعدة التاسعة؟ لو حوّلت استنتاج من غير مراجعة لمصدر، **الغلطة بتتكاثر جوّا عقلك التاني وبتستشهد بنفسها**.", "Why rule four, “choose sources before each question”? With 40 sources and a question about 6, activate the six: **less noise, sharper answer**. Why rule nine? Turn an unreviewed conclusion into a source and **the error multiplies inside your second brain and starts citing itself**."),
          L("link", "ده تطبيق مباشر لفكرة [[f1]]: النموذج مش بيتذكر المصادر بدقة، فادّيهاله. والدفتر بعدين هو «عقل المحتوى» في العرض الإداري ([[p11]]).", "This applies [[f1]] directly: the model can’t recall sources precisely, so give them. Later the notebook becomes the “content brain” of the management pitch ([[p11]])."),
        ],
        practice: [
          L("example", "قسم الموارد البشرية بيحط في دفتر واحد: لائحة الإجازات، ودليل الموظف الجديد، وسياسة السفر، وإجراءات المشتريات. الموظف بيسأل «هل أستحق بدل سفر لرحلة يوم واحد؟» فالإجابة بتيجي من السياسة مع رقم الفقرة.", "HR puts the leave rules, new-employee guide, travel policy and purchasing procedures into one notebook. An employee asks “am I entitled to a travel allowance for a one-day trip?” and the answer comes from the policy with the clause number."),
          L("apply", "في [[brain|مختبر العقل التاني]] تحت: فعّل واطفئ المصادر، واسأل نفس السؤال. لاحظ إزاي الإجابة بتتغيّر، وإزاي المختبر بيكشف تناقض المصدر القديم مع الجديد.", "In the [[brain|second-brain lab]] below: switch sources on and off and ask the same question. See how the answer changes and how the lab flags the old source contradicting the new one."),
        ],
        adv: [
          L("mistakes", "- **دفتر اسمه «الذكاء الاصطناعي»**: موضوع واسع جدًا. اسم الدفتر لازم يكون هدف: «كورس الذكاء الاصطناعي» أو «مشروع تطوير خدمة العملاء».\n- **أسئلة «لخّص» بس**: اسأل فين المصادر بتختلف وإيه الادعاءات ضعيفة الدليل.\n- **دفتر ما بيتحدّثش** فبعد شهرين بيبقى متحف رقمي.", "- **A notebook called “AI”**: far too broad. Name it after a goal: “AI course” or “Customer-service improvement project”.\n- **Only “summarise” questions**: ask where sources disagree and which claims have weak evidence.\n- **A notebook never updated**, which becomes a digital museum in two months."),
          L("whennot", "ماترفعش مستندات حساسة قبل ما تراجع سياسة شركتك. والدفتر مش بيحسب أرقام معقدة ومش بيربط أنظمة — ده شغل الأدوات والأنظمة ([[y1]]، [[s1]]).", "Don’t upload sensitive documents before checking company policy. And a notebook doesn’t do complex calculations or connect systems — that’s for tools and systems ([[y1]], [[s1]])."),
        ],
      },
      case: { field: { ar: "الموارد البشرية", en: "Human resources" }, title: { ar: "مكتب أسئلة الموظفين بيرد في دقيقة", en: "An employee help desk that answers in a minute" },
        steps: {
          problem: { ar: "قسم الموارد البشرية بيستلم عشرات الأسئلة المتكررة كل أسبوع عن الإجازات والسفر والمشتريات.", en: "HR receives dozens of repeated questions weekly about leave, travel and purchasing." },
          old: { ar: "الموظف المختص بيدوّر في ملفات متفرقة وبيرد يدويًا، وأحيانًا من نسخة قديمة من السياسة.", en: "The officer searches scattered files and replies by hand — sometimes from an outdated policy." },
          idea: { ar: "دفتر واحد بالسياسات المعتمدة بس، بيجاوب باستشهاد يحدد الفقرة.", en: "One notebook with only the approved policies, answering with a citation to the clause." },
          steps: { ar: "1. اجمع النسخ المعتمدة الحالية بس (مش القديمة).\n2. اعمل دفتر باسم «سياسات الموظفين 2026».\n3. اختبر بعشرة أسئلة إنت عارف إجاباتها.\n4. حدّث الدفتر مع أي تعديل في السياسات.", en: "1. Gather only the current approved versions (not old ones).\n2. Create a notebook called “Employee policies 2026”.\n3. Test with ten questions whose answers you know.\n4. Update the notebook whenever a policy changes." },
          result: { ar: "ردود أسرع ومتسقة مع الفقرة الأصلية؛ والأسئلة اللي المصادر مش بتجاوب عنها بتظهر بوضوح كفجوة في السياسات.", en: "Faster replies consistent with the original clause; questions the sources can’t answer show up clearly as policy gaps." },
          risks: { ar: "سياسات فيها بيانات شخصية ما تترفعش إلا حسب سياسة الشركة؛ وأي إجابة عن حالة استثنائية لازم يراجعها الموظف المختص.", en: "Policies with personal data are uploaded only per company policy; any answer about an exceptional case is reviewed by the officer." },
        } },
    },
    {
      id: "p9", unit: "u1", pages: [13], diff: 2, min: 8, scene: "leap", lab: "formula", related: ["p3", "p10", "d1", "p1"], pre: ["f4", "f8"],
      title: { ar: "إزاي تخلي إكسل يعمل حساباتك من غير ما تحفظ معادلات؟", en: "The leap: Excel with AI" },
      sum: { ar: "مش لازم تحفظ معادلات إكسل. اشرح الحساب اللي محتاجه بالكلام، وخلّي المساعد يكتب المعادلة، واختبرها على كام صف قبل ما تعمّمها.", en: "Don’t start with code, start with a problem: the right formula request, its three elements, and the nine-stage ladder." },
      book: [
        bp(13, "نقطة البداية الحقيقية لأي متدرب: «**أنا عارف النتيجة اللي عايزها، بس مش عارف أكتب المعادلة إزاي**». وده بالضبط الفجوة اللي الذكاء الاصطناعي بيملاها النهارده.", "Every trainee’s real starting point: “**I know the result I want, but I don’t know how to write the formula.**” That’s exactly the gap AI fills today."),
        bp(13, "**لا تبدأ بالكود، ابدأ بمشكلة.** الأداة النهارده بتبني المعادلات وبتشرحها وبتصلّح اللي موجود، وبتنفّذ البحث بين الجداول، وتحلّل الاتجاهات والقيم الشاذة، وبتقترح أعمدة حسابية جديدة.", "**Don’t start with code, start with a problem.** Today the tool builds formulas, explains and fixes them, looks up across tables, analyses trends and outliers, and suggests new calculated columns."),
        bp(13, "الخطوات: اشرح المشكلة ← سيبه يبني المعادلة ← افهمها ← اختبرها ← طبّقها.", "The steps: explain the problem → let it build the formula → understand it → test it → apply it."),
        bp(13, "نموذج الطلب: «عندي جدول مبيعات. العمود «أ» فيه اسم المنتج، و«ب» الكمية، و«ج» سعر البيع، و«د» التكلفة. عايز معادلة تحسب هامش الربح كنسبة مئوية، بس لو البيانات ناقصة الخلية تفضل فاضية بدل رسالة خطأ. اكتب المعادلة، واشرحها ببساطة، واختبرها على تلات حالات مختلفة.»", "The request: “I have a sales table. Column A is the product name, B the quantity, C the selling price, D the cost. I want a formula for the profit margin as a percentage, but if data is missing the cell stays blank instead of an error. Write the formula, explain it simply, and test it on three different cases.”"),
        bp(13, "خد بالك من التلات عناصر: **وصف دقيق لبنية البيانات، وتعريف واضح للناتج المطلوب، وقاعدة صريحة للحالة الاستثنائية**. غياب أي واحد منهم سبب معظم المعادلات الغلط اللي بتوصل للتقارير.", "Note the three elements: **a precise description of the data structure, a clear definition of the required output, and an explicit rule for the edge case**. Missing any of them causes most wrong formulas that reach reports."),
        bp(13, "سلّم التدرج: تسع مراحل في إكسل — **الأساس** (حسابات بسيطة، شروط متعددة، البحث والربط بين جداول) ← **المعالجة** (التواريخ، تنظيف النصوص، التصنيفات والفئات) ← **الاحتراف** (مؤشرات الأداء، المعادلات المالية، معادلات مركبة).", "The ladder: nine Excel stages — **basics** (simple calculations, multiple conditions, lookups across tables) → **processing** (dates, cleaning text, categories) → **mastery** (KPIs, financial formulas, compound formulas)."),
      ],
      levels: {
        simple: [
          L("what", "بدل ما تحفظ المعادلات، **اوصف النتيجة اللي عايزها** والأداة بتكتب المعادلة وبتشرحها. المهارة الجديدة: توصف جدولك ومطلوبك والحالة الصعبة بوضوح.", "Instead of memorising formulas, you **describe the result you want** and the tool writes and explains the formula. The new skill: describe your table, the goal and the tricky case clearly."),
          L("why", "لأن أغلب الموظفين عارفين عايزين إيه من الجدول بس بيتعطّلوا عند صياغة المعادلة. والأخطر: معادلة صح في الحالة العادية بتنهار لو خلية فاضية فتظهر رسالة خطأ في تقرير الإدارة.", "Because most staff know what they want from a table but get stuck writing the formula. Worse: a formula right in the normal case breaks on a blank cell and an error shows up in the management report."),
        ],
        mech: [
          L("how", "المعادلة في مثال الكتاب بتبقى تقريبًا:\n`=IF(OR(C2=\"\";D2=\"\";C2=0);\"\";(C2-D2)/C2)`\nيعني: لو السعر أو التكلفة فاضية أو السعر صفر سيب الخلية فاضية، وإلا احسب (السعر − التكلفة) ÷ السعر. (الفاصل «;» أو «,» حسب إعدادات إكسل عندك.)", "In the book’s example the formula becomes roughly:\n`=IF(OR(C2=\"\",D2=\"\",C2=0),\"\",(C2-D2)/C2)`\ni.e. if price or cost is blank, or price is zero, leave it blank; otherwise (price − cost) ÷ price. (The separator is “,” or “;” depending on your Excel settings.)"),
          L("inside", "التلات عناصر بيعالجوا تلات أسباب للغلط: **الوصف الدقيق** بيمنع الأداة تفترض أعمدة مش موجودة، و**تعريف الناتج** بيمنع حساب حاجة تانية (هامش على التكلفة بدل السعر مثلاً)، و**قاعدة الاستثناء** بتمنع رسائل الخطأ.", "The three elements fix three causes of error: **precise description** stops the tool assuming non-existent columns, **output definition** prevents computing something else (margin on cost instead of price, say), and **the edge-case rule** prevents error messages."),
          L("link", "دي غلطة «تجاهل الحالات الناقصة» من [[p3]] في صورتها العملية، ودي أول درجة في القفزة اللي بتكمل في [[p10]] بالماكرو والكود.", "This is [[p3]]’s “ignoring missing cases” mistake in practice, and the first rung of the leap that continues in [[p10]] with macros and code."),
        ],
        practice: [
          L("example", "**مصنع**: «العمود A رقم الماكينة، B دقائق التشغيل، C دقائق التوقف. عايز نسبة الإتاحة، ولو الدقائق صفر أو فاضية تظهر «لا يوجد تشغيل». اختبرها على ماكينة عادية، وماكينة من غير تشغيل، وماكينة بقيمة سالبة غلط».", "**Factory**: “Column A is the machine number, B running minutes, C stoppage minutes. I want availability %, and if minutes are zero or blank show “no run”. Test on a normal machine, one with no run, and one with a wrong negative value.”"),
          L("apply", "في [[formula|مختبر المعادلة]] تحت: توقّع النتيجة الأول، وبعدين شغّل واطفئ قاعدة الحالة الاستثنائية، وعدّل الخلايا بنفسك.", "In the [[formula|formula lab]] below: predict first, then switch the edge-case rule on and off and edit cells yourself."),
        ],
        adv: [
          L("mistakes", "- **نسخ المعادلة من غير ما تفهمها**: خطوة «افهمها» في الكتاب مش ترف؛ لو مش فاهمها مش هتكتشف غلطها.\n- **اختبارها على الحالة العادية بس**.\n- **القفز للمرحلة التاسعة** (معادلات مركبة) قبل ما تتقن الأساس.", "- **Copying the formula without understanding it**: the book’s “understand it” step isn’t a luxury; if you don’t understand it you won’t catch its error.\n- **Testing only the normal case**.\n- **Jumping to stage nine** (compound formulas) before mastering the basics."),
          L("whennot", "لما المعادلة تبقى طويلة جدًا وصعب تفهمها، أو لما نفس الخطوات بتتكرر كل أسبوع على ملفات جديدة — هنا تنتقل للماكرو والكود ([[p10]]) أو لأداة بايثون ([[y1]]).", "When the formula gets too long to understand, or the same steps repeat weekly on new files — that’s when you move to macros and code ([[p10]]) or a Python tool ([[y1]])."),
        ],
      },
    },
    {
      id: "p10", unit: "u2", pages: [13, 14], diff: 2, min: 9, scene: "macro", related: ["p9", "y1", "w2"], pre: ["p9"],
      title: { ar: "إزاي تخلي الخطوات اللي بتكررها تحصل بضغطة؟", en: "First real automation: macros and AI-written code" },
      sum: { ar: "أي خطوات بتكررها كل يوم بنفس الترتيب، زي فتح ملف وتنسيقه ونسخ جدول منه، ممكن تتسجل مرة وتتنفذ بضغطة، بشرط تجربها على نسخة الأول.", en: "The macro recorder, then let AI write the code, two unbreakable rules, and the golden code prompt." },
      book: [
        bp(13, "الرسالة المحورية: ما تقولش «هنتعلم برمجة». قول: «الذكاء الاصطناعي محتاج يفهم منطق الشغل وخطواته عشان يكتب كود صح». **المهارة الجديدة إنك توصف العملية بدقة، مش إنك تكتب الكود.**", "The core message: don’t say “we’ll learn programming”. Say: “AI needs to understand the business logic and steps to write correct code.” **The new skill is describing the process precisely, not writing code.**"),
        bp(13, "**مسجّل الماكرو**: أداة جوّا إكسل بتسجّل خطواتك وإنت بتنفّذها بإيدك وبعدين بتحوّلها تلقائيًا لكود جاهز. فايدة مزدوجة: أتمتة فورية من أول مرة، وكود قدامك بتقراه فبتفهم إزاي خطواتك بتترجم لأوامر.", "**The macro recorder**: an Excel tool that records your steps as you do them and turns them into ready code. Double benefit: instant automation first time, and code in front of you that shows how your steps become commands."),
        bp(13, "المشكلة مش إنك مش مبرمج؛ المشكلة إنك قبل الذكاء الاصطناعي كنت مضطر تكتب الكود بنفسك. النهارده المطلوب **وصف العملية بدقة: الملف، والأوراق، والأعمدة، والخطوات اليدوية، والناتج المطلوب**.", "The problem isn’t that you’re not a programmer; before AI you had to write the code yourself. Today what’s needed is **a precise description: the file, sheets, columns, manual steps and required output**."),
        bp(14, "خطوات وضع الكود: تبويب المطوّر ← محرر الكود ← إدراج وحدة ← لصق الكود ← حفظ بصيغة ماكرو ← تشغيل.", "Placing the code: Developer tab → code editor → insert module → paste code → save as macro-enabled → run."),
        bp(14, "**قاعدتان لا تُكسران**: اشتغل دايمًا على نسخة — إجراءات الماكرو مفيش تراجع عادي عنها، وخطوة غلط ممكن تمسح ساعات شغل من غير رجعة. و**وحدات صغيرة مش كتلة واحدة ضخمة** — كذا وحدة لكل واحدة وظيفة محددة بدل ماكرو يعمل كل حاجة ويستحيل تصلّحه.", "**Two unbreakable rules**: always work on a copy — macro actions can’t be undone the usual way, and one wrong step can wipe hours of work. And **small modules, not a monster** — several modules each with one job, instead of one macro doing everything and impossible to fix."),
        bp(14, "**الـ Prompt الذهبي للكود** — أهم Prompt في القسم: بنية الملف بأسمائها الحقيقية، والمهمة اليدوية بالترتيب، والنتيجة المطلوبة، و«لا تفترض أسماء غير موجودة، تعامل مع الفراغات والأخطاء، لا تحذف البيانات الأصلية، اشرح أين أضع الكود، وأعطني خمس حالات أختبر بها».", "**The golden code prompt** — the section’s most important: the file structure with real names, the manual task in order, the required result, and “don’t assume names that don’t exist, handle blanks and errors, don’t delete the original data, explain where to put the code, and give me five test cases”."),
        bp(14, "ليه القالب ده أهم من تعلّم عشرات الأوامر؟ لأن كل سطر فيه بيمنع نوع معروف من الفشل: «لا تفترض أسماء» بيمنع افتراضات غلط، و«تعامل مع الناقص» بيمنع الانهيار عند أول بيان ناقص أو معيب، و«لا تحذف الأصلية» بيمنع فقدان البيانات، و«خمس حالات اختبار» بيمنع التسليم من غير تحقق.", "Why is this template worth more than learning dozens of commands? Each line prevents a known failure: “don’t assume names” prevents wrong assumptions, “handle the missing” prevents crashing on the first bad record, “don’t delete originals” prevents data loss, and “five test cases” prevents shipping unverified."),
      ],
      levels: {
        simple: [
          L("what", "((macro|الماكرو)) زر واحد بينفّذ خطوات كنت بتكررها بإيدك. تقدر تسجّله بنفسك (المسجّل بيراقبك وبيكتب الكود)، أو توصف الخطوات للذكاء الاصطناعي فيكتب كود أكبر وأذكى.\n\nتشبيه: بدل ما تشرح لزميل كل يوم إزاي ينسّق التقرير، بتكتب له ورقة تعليمات مرة واحدة — والماكرو هو الورقة دي، بس الكمبيوتر بينفّذها في ثانية.", "A ((macro|macro)) is one button that runs steps you used to repeat by hand. You can record it yourself (the recorder watches and writes the code) or describe the steps to AI so it writes bigger, smarter code.\n\nInstead of showing a colleague daily how to format the report, you write an instruction sheet once — the macro is that sheet, run by the computer in a second."),
          L("why", "لأن دي أول أتمتة حقيقية: مهمة كانت بتاخد ساعة كل أسبوع بقت ضغطة زر — وإنت ما كتبتش سطر كود واحد بنفسك.", "Because this is the first real automation: a task that took an hour a week becomes one click — and you didn’t write a line of code yourself."),
        ],
        mech: [
          L("how", "**المسار الأول**: سجّل الماكرو ← أوقف ← شغّل بزر. **المسار التاني**: الـ Prompt الذهبي ← الكود ← المطوّر ← وحدة ← لصق ← حفظ كملف ماكرو ← تشغيل على **نسخة** ← اختبار الحالات الخمس ← اعتماد.", "**Path one**: record → stop → run with a button. **Path two**: golden prompt → code → Developer → module → paste → save as macro file → run on a **copy** → test the five cases → adopt."),
          L("inside", "ليه «وحدات صغيرة»؟ لأن ((module|الوحدة)) الصغيرة اللي ليها وظيفة واحدة سهل تختبرها وتصلّحها لوحدها. الماكرو الضخم لما يغلط مش هتعرف الغلط فين — فيبقى إصلاحه شبه مستحيل.", "Why “small modules”? A small ((module|module)) with one job is easy to test and fix on its own. When a giant macro fails you can’t tell where — so it’s impossible to fix."),
          L("link", "الـ Prompt الذهبي هو المعادلة الحاكمة ([[p1]]) مطبّقة على ملف، ومعاه أهم تقنية ([[p2]]) في صورة «خمس حالات اختبار». ونفس الفكرة بتكبر في أدوات البايثون ([[y1]]) وبعدين Claude Code اللي بيكتب ويشغّل ويختبر بنفسه ([[w2]]).", "The golden prompt is the governing equation ([[p1]]) applied to a file, with the strongest technique ([[p2]]) as “five test cases”. The same idea grows into Python tools ([[y1]]) and then Claude Code, which writes, runs and tests on its own ([[w2]])."),
        ],
        practice: [
          L("example", "مثال الكتاب: ملف فيه ورقة «البيانات الخام». المطلوب كود يحذف الصفوف الفاضية، ويوحّد تنسيق التاريخ، ويحذف التكرار بناءً على رقم الموظف، وبعدين ينشئ ورقة «التقرير» بملخص لكل إدارة — مع شرح فين يتحط الكود وإزاي يتشغّل خطوة بخطوة.", "The book’s example: a file with a “Raw data” sheet. The code should delete blank rows, unify the date format, remove duplicates by employee ID, then create a “Report” sheet with a summary per department — with an explanation of where to put the code and how to run it step by step."),
          L("apply", "اختار أصغر مهمة تنسيق متكررة عندك وسجّل لها ماكرو النهارده (مهمة الأسبوع الرابع في الخطة). وبعدين اكتب نفس المهمة بالـ Prompt الذهبي وقارن الكودين.", "Pick your smallest recurring formatting task and record a macro for it today (week four of the plan). Then write the same task with the golden prompt and compare the two codes."),
        ],
        adv: [
          L("mistakes", "- **التشغيل على الملف الأصلي**: مفيش «تراجع» عادي بعد الماكرو.\n- **وصف أعمدة بأسماء تقريبية**: «عمود التاريخ» بدل اسمه الحقيقي — فالكود بيفترض اسم مش موجود.\n- **ماكرو واحد ضخم** يعمل كل حاجة.", "- **Running on the original file**: there’s no normal undo after a macro.\n- **Approximate column names**: “the date column” instead of its real name — so the code assumes a name that doesn’t exist.\n- **One giant macro** doing everything."),
          L("whennot", "لما العملية برّه إكسل (متصفح، نظام، كذا ملف في مجلد) أو محتاجة جدولة تلقائية، أداة بايثون أحسن ([[y3]]).", "When the process goes beyond Excel (browser, system, many files in a folder) or needs automatic scheduling, a Python tool fits better ([[y3]])."),
        ],
      },
      case: { field: { ar: "المالية", en: "Finance" }, title: { ar: "تقرير المصروفات الأسبوعي بزر واحد", en: "The weekly expense report in one click" },
        steps: {
          problem: { ar: "محاسبة بتنضّف ملف المصروفات الخام كل أسبوع: صفوف فاضية، تواريخ بصيغ مختلفة، تكرار — وبعدين تلخّص حسب الإدارة.", en: "An accountant cleans the raw expense file weekly: blank rows, mixed date formats, duplicates — then summarises by department." },
          old: { ar: "حوالي ساعتين من الشغل اليدوي (رقم افتراضي)، وأخطاء نسخ ولصق بتتكتشف أحيانًا بعد إرسال التقرير.", en: "About two hours by hand (hypothetical), with copy-paste errors sometimes found after the report is sent." },
          idea: { ar: "الـ Prompt الذهبي بوصف الملف والخطوات والناتج، وبعدين ماكرو من وحدات صغيرة.", en: "The golden prompt describing the file, steps and output, then a macro of small modules." },
          steps: { ar: "1. توصف الأوراق والأعمدة بأسمائها الحقيقية.\n2. تكتب الخطوات اليدوية بالترتيب.\n3. تطلب خمس حالات اختبار.\n4. تشغّل على نسخة وتقارن بالتقرير اليدوي المعتمد.\n5. تعتمد الماكرو بعد ما الأرقام تتطابق.", en: "1. Describe sheets and columns by their real names.\n2. Write the manual steps in order.\n3. Ask for five test cases.\n4. Run on a copy and compare with the approved manual report.\n5. Adopt the macro once numbers match." },
          result: { ar: "التقرير بضغطة زر في دقائق، والملف الأصلي سليم دايمًا.", en: "The report in one click within minutes, and the original file always intact." },
          risks: { ar: "لو شكل الملف الخام اتغيّر (عمود جديد أو اسم مختلف) الماكرو ممكن يغلط؛ ولازم يتوقف برسالة واضحة بدل ما يكمّل في صمت.", en: "If the raw file’s shape changes (a new column or name) the macro may break; it should stop with a clear message rather than continue silently." },
        } },
    },
    {
      id: "p11", unit: "u6", pages: [14, 15], diff: 2, min: 8, scene: "capstone", related: ["p8", "y6", "d2"], pre: ["p8"],
      title: { ar: "إزاي تحول التحليل لكلام الإدارة تفهمه وتقرر عليه؟", en: "From the report to a pitch that convinces management" },
      sum: { ar: "الإدارة مش محتاجة كل الأرقام اللي عندك. محتاجة تعرف إيه اللي اتغير، وليه، والقرار المطلوب منها، بالترتيب ده.", en: "Three tools, three roles; mixing them is the fatal mistake; story and review prompts; the capstone and its criteria." },
      book: [
        bp(14, "لو التقرير خلص… ليه تعمل العرض بنفسك؟ تلات أدوات بيكمّلوا بعض، ومشروع واحد بيجمع الدليل كله.", "If the report is done… why build the deck yourself? Three tools complement each other, and one project pulls the guide together."),
        bp(14, "**عقل المحتوى — الدفتر**: مسؤول عن الصدق والمصادر. **مدير القصة — المساعد المحادثي**: مسؤول عن الرسالة والترتيب. **الاستوديو البصري — مولّد الصور**: مسؤول عن الفهم البصري.", "**Content brain — the notebook**: owns truth and sources. **Story director — the chat assistant**: owns message and order. **Visual studio — the image generator**: owns visual understanding."),
        bp(14, "**خلط الأدوار هو الغلطة القاتلة**: بيطلع عرض شكله جميل من غير مضمون، أو صحيح من غير تأثير. والترتيب مهم: ما تبدأش بالتصميم أبدًا — **المصدر الأول، وبعدين القصة، وبعدين الصورة**.", "**Mixing roles is the fatal mistake**: you get a pretty deck without meaning, or a correct one without impact. Order matters too: never start with design — **source first, then story, then image**."),
        bp(14, "Prompt بناء قصة العرض: الجمهور والقرار المطلوب وخمس دقائق — رسالة واحدة، وأهم تلات أفكار، وترتيب الشرائح، والرسم المناسب لكل رقم، وإيه اللي لازم يتحذف. و Prompt المراجعة: بعين مدير ما شاف الملف ومعاه خمس دقائق.", "The story prompt: audience, required decision and five minutes — one message, top three ideas, slide order, the right chart per number, what to cut. The review prompt: through the eyes of a manager who never saw the file and has five minutes."),
        bp(14, "المشروع الختامي — سلسلة واحدة: ملف بيانات خام ← معادلات بالذكاء الاصطناعي ← كود ينضّف ويحلّل ← تقرير نهائي ← دفتر يفهم المصادر ← بناء القصة ← البصريات ← عرض إداري جاهز.", "The capstone — one chain: raw data file → AI formulas → code that cleans and analyses → final report → a notebook that understands the sources → story → visuals → a ready management deck."),
        bp(15, "معايير التقييم: النظام كله بيشتغل بزر واحد؟ البيانات الأصلية سليمة بعده؟ مدير ما شاف الملف بيفهم العرض؟ **العرض بينتهي بقرار مش بملخص** — قرارات محددة بمسؤول وموعد؟", "Criteria: Does the whole system run with one button? Is the original data intact afterwards? Does a manager who never saw the file understand the deck? **Does it end with a decision, not a summary** — specific decisions with an owner and a date?"),
      ],
      levels: {
        simple: [
          L("what", "لما التحليل يخلص، محتاج **تقنع** الإدارة. الكتاب بيقسّم الشغل على تلات أدوات زي فريق: باحث يضمن الصدق (الدفتر)، وكاتب يصنع القصة (المساعد)، ومصمم يصنع الصور (المولّد).", "Once the analysis is done you need to **convince** management. The book splits the work across three tools like a team: a researcher who guarantees truth (notebook), a writer who builds the story (assistant), and a designer who makes the visuals (generator)."),
          L("why", "لأن أجمل عرض ما بيفيدش لو ما انتهاش بقرار، وأدق تحليل ما بيأثرش لو ما اتعرضش في صورة قصة.", "Because the prettiest deck is useless if it doesn’t end in a decision, and the most correct analysis has no effect if it isn’t told as a story."),
        ],
        mech: [
          L("how", "الترتيب الإلزامي: **المصدر** (أرقام وحقائق موثقة من الدفتر) ← **القصة** (رسالة واحدة وتلات أفكار وترتيب) ← **الصورة** (رسم لكل رقم مهم). لو بدأت بالتصميم هتعمل بصريات لأفكار هتحذفها بعد شوية.", "The mandatory order: **source** (documented facts from the notebook) → **story** (one message, three ideas, an order) → **image** (a chart per key number). Start with design and you’ll make visuals for ideas you’ll soon delete."),
          L("link", "دي نفس «المحطات السبع» في الصفحة التنفيذية بالبايثون ([[y6]])، ونفس قاعدة «ينتهي بقرار مش بملخص» اللي بتتكرر في المشروع المرجعي ([[y7]]) وتطبيق الويب ([[w6]]).", "This is the same as the “seven stations” of the Python executive page ([[y6]]), and the same “end with a decision, not a summary” rule repeated in the reference project ([[y7]]) and the web app ([[w6]])."),
        ],
        practice: [
          L("example", "مشرف جودة معاه تقرير عن ارتفاع المرتجعات. الدفتر بيستخرج الأرقام مع مصادرها، والمساعد بيبني القصة: «المرتجعات زادت 9% بسبب مورد واحد؛ القرار المطلوب: تغيير المورد خلال شهر»، والمولّد بيرسم شريحة مقارنة بين الموردين.", "A quality supervisor has a report on rising returns. The notebook extracts the figures with sources, the assistant builds the story: “returns rose 9% because of one supplier; decision needed: switch supplier within a month”, and the generator draws a supplier comparison slide."),
          L("apply", "خد آخر عرض قدّمته وطبّق عليه Prompt المراجعة: الرسالة واضحة في أول 30 ثانية؟ إيه الشرائح اللي تتحذف؟ بينتهي بقرار؟", "Take your last presentation and run the review prompt: is the message clear in the first 30 seconds? Which slides go? Does it end with a decision?"),
        ],
        adv: [
          L("mistakes", "- **عرض بينتهي بـ«شكرًا» وملخص أرقام**: من غير قرار ولا مسؤول ولا موعد.\n- **مولّد الصور بيخترع أرقام في الرسوم**: الأرقام من الدفتر بس.\n- **20 شريحة لخمس دقائق**.", "- **A deck ending in “thank you” and a number summary**: no decision, owner or date.\n- **The image generator inventing numbers in charts**: numbers come only from the notebook.\n- **20 slides for five minutes**."),
          L("whennot", "لو القرار تشغيلي صغير، يكفي إيميل خمس أسطر بدل عرض كامل.", "When the decision is small and operational, a five-line email beats a full deck."),
        ],
      },
      case: { field: { ar: "الجودة", en: "Quality" }, title: { ar: "من تقرير مرتجعات لقرار تغيير مورد", en: "From a returns report to a supplier decision" },
        steps: {
          problem: { ar: "تقرير مرتجعات 30 صفحة محدش بيقراه في اجتماع الإدارة.", en: "A 30-page returns report nobody reads in the management meeting." },
          old: { ar: "عرض 25 شريحة بكل الجداول، بينتهي بـ«شكرًا».", en: "A 25-slide deck with every table, ending in “thank you”." },
          idea: { ar: "التلات أدوار بالترتيب: الدفتر للأرقام، المساعد للقصة، المولّد للصور.", en: "The three roles in order: notebook for numbers, assistant for story, generator for visuals." },
          steps: { ar: "1. حط التقرير في دفتر واسأل: إيه الأسباب وإيه الدليل؟\n2. Prompt القصة: رسالة واحدة، تلات أفكار، القرار.\n3. شريحة رسم لكل رقم مهم.\n4. Prompt المراجعة بعين مدير.", en: "1. Put the report in a notebook and ask: what causes, what evidence?\n2. Story prompt: one message, three ideas, the decision.\n3. One chart slide per key number.\n4. Review prompt through a manager’s eyes." },
          result: { ar: "خمس شرائح بتنتهي بقرار ليه مسؤول وموعد.", en: "Five slides ending with a decision that has an owner and a date." },
          risks: { ar: "تأكد إن كل رقم في الشرائح مأخوذ من المصدر مش من مولّد الصور، والقرار المقترح ضمن صلاحيات الحضور.", en: "Make sure every number on the slides comes from the source, not the image generator, and that the proposed decision is within the attendees’ authority." },
        } },
    },
    {
      id: "p12", unit: "u6", pages: [15, 16], diff: 1, min: 7, scene: "plan30", related: ["f2", "p2", "f5"], pre: ["p1"],
      title: { ar: "إزاي تخلي اللي اتعلمته عادة شغل مش حماس يومين؟", en: "From a guide to a habit: the index, the plan and the checklist" },
      sum: { ar: "قيمة أي كورس بتتقاس بالعادة اللي بتفضل بعده. اختار مهمة واحدة متكررة، طبّق عليها كل أسبوع، وقيس الوقت والجودة قبل وبعد.", en: "Which prompt when, where to actually start, the 30-day plan, the checklist, and three mistakes that block the change." },
      book: [
        bp(15, "الفهرس السريع: مش عارف تبدأ منين ← الشامل للإنتاجية · قرار كبير غامض ← الشامل الاستراتيجي · يوم مليان ← ترتيب المهام وتقسيم اليوم · ملاحظات اجتماع ← ما بعد الاجتماع · فكرة فيها خلل ← «لا توافقني تلقائيًا» · خطة خايف تفشل ← نقاط الفشل · معلومات ناقصة ← المعلومات الناقصة · مصادر متضاربة ← كشف التناقضات · مهمة إكسل أسبوعية ← الـ Prompt الذهبي · تقرير محتاج عرض ← القصة والمراجعة.", "Quick index: don’t know where to start → all-in-one productivity · big ambiguous decision → all-in-one strategic · full day → task ranking and day blocks · meeting notes → after-the-meeting · flawed idea → “don’t agree automatically” · plan you fear → pre-mortem · missing info → missing information · conflicting sources → contradictions · weekly Excel task → golden code prompt · report needing a deck → story and review."),
        bp(15, "خارطة التطبيق: مبتدئ تمامًا ← اكتب أحدث طلب تاني بالخمس عناصر · غارق في المهام ← Prompt تنظيم اليوم على مهام بكرة · قدام قرار صعب ← الـ Prompt الاستراتيجي · ملفات مبعثرة ← دفتر واحد لمشروع واحد · مهمة متكررة ← سجّل ماكرو لأصغرها.", "Application map: complete beginner → rewrite your latest request with the five elements · drowning in tasks → day-planning prompt on tomorrow’s tasks · hard decision → strategic prompt · scattered files → one notebook for one project · recurring task → record a macro for the smallest."),
        bp(16, "خطة الثلاثين يومًا: الصياغة ← الإنتاجية (توفير ساعة أسبوعيًا على الأقل) ← القرار والمعرفة ← الأتمتة (أداة تشتغل فعلًا بضغطة زر). **القاعدة: ما تنتقل لأسبوع جديد قبل ما اللي قبله يبقى عادة ما بتفكّر فيها. أسبوع واحد متقن أحسن من أربع أسابيع مقروءة على عجل.**", "The 30-day plan: wording → productivity (save at least an hour a week) → decisions and knowledge → automation (a tool that really works in one click). **Rule: don’t start a new week until the last one is a habit you don’t think about. One mastered week beats four rushed ones.**"),
        bp(16, "قائمة تحقق قبل ما تعتمد أي مخرج: فصلت النتيجة بين الحقائق والافتراضات؟ راجعت بنفسك كل رقم هيدخل تقرير رسمي؟ جرّبت على نسخة؟ طلبت نسخة أبسط وقارنت؟ عارف إيه اللي يحصل مع بيانات ناقصة؟ تقدر تشرح النتيجة لزميل من غير ما ترجع للأداة؟", "Checklist before trusting any output: does it separate facts from assumptions? Did you check every number entering an official report? Did you try it on a copy? Did you ask for a simpler version and compare? Do you know what happens with missing data? Can you explain it to a colleague without the tool?"),
        bp(16, "تلات أخطاء بتمنع التحول: **جمع أدوات بدل إتقان واحدة**، و**الاكتفاء بالإعجاب بالنتيجة** (المعيار الوحيد: حاجة اتغيّرت في شغلك الأسبوع ده؟)، و**البدء بأكبر مشكلة** (ابدأ بأصغر مهمة متكررة).", "Three mistakes that block change: **collecting tools instead of mastering one**, **just admiring the result** (the only test: did something change at work this week?), and **starting with your biggest problem** (start with the smallest recurring task)."),
        bp(16, "التحول المطلوب: المتدرب بيدخل بيسأل «إزاي أكتب معادلة؟» وبيطلع بيقول: «**بنيت نظام يبدأ بالبيانات وينتهي بعرض للإدارة**». الهدف مش تتعلم أدوات، لكن تتعلم تصميم أنظمة شغل جديدة.", "The desired change: a trainee arrives asking “how do I write a formula?” and leaves saying “**I built a system that starts with data and ends with a management pitch**.” The aim isn’t learning tools but learning to design new work systems."),
      ],
      levels: {
        simple: [
          L("what", "الصفحتين الأخيرتين في الدليل الأول بيحوّلوا القراءة لـ**عادة**: فهرس بيقولك أي Prompt لأي موقف، وخطة أربع أسابيع، وقائمة من ست أسئلة قبل ما تعتمد أي نتيجة.", "The first guide’s closing pages turn reading into a **habit**: an index telling you which prompt for which situation, a four-week plan, and six questions to ask before trusting any result."),
          L("why", "لأن قراءة الدليل مرة واحدة ما بتحققش التحول. التحول بيحصل لما الممارسة تتكرر لحد ما تبقى تلقائية.", "Because reading the guide once doesn’t change anything. Change happens when practice repeats until it’s automatic."),
        ],
        mech: [
          L("how", "الخطة متدرجة عمدًا: كل أسبوع بيبني على اللي قبله. الصياغة الأول لأنها أساس كل حاجة، والأتمتة في الآخر لأنها محتاجة كل اللي فات (وصف دقيق، فهم، تحقق).", "The plan is deliberately graded: each week builds on the last. Wording first because it underpins everything; automation last because it needs all of it (precise description, understanding, checking)."),
          L("link", "قائمة التحقق هنا النسخة الكاملة من سلسلة الاستخدام الواعي ([[f5]])، وقاعدة «ابدأ بأصغر مهمة متكررة» هتتكرر في كل دليل بعده ([[y2]]، [[s2]]).", "This checklist is the full version of the wise-use chain ([[f5]]), and “start with the smallest recurring task” recurs in every guide after it ([[y2]], [[s2]])."),
        ],
        practice: [
          L("example", "موظف مبيعات بيطبّق الخطة: الأسبوع الأول بيعيد صياغة كل طلب مهم، التاني بيستخدم Prompt الفرز الصبح، التالت بيحط ملفات العملاء الكبار في دفتر، الرابع بيسجّل ماكرو لتقرير الزيارات الأسبوعي.", "A sales rep follows the plan: week one rewrites every important request, week two uses the triage prompt each morning, week three puts key-account files in a notebook, week four records a macro for the weekly visits report."),
          L("apply", "ابدأ «الأسبوع الأول» النهارده، وعلّم الدرس ده «فهمته» بس لما الجملة الذهبية تبقى عادة ليك.", "Start “week one” today, and mark this lesson as understood only when the golden sentence has become a habit."),
        ],
        adv: [
          L("mistakes", "- **قراءة الخطة من غير تطبيق**: «الاكتفاء بالإعجاب».\n- **ضغط الأربع أسابيع في أسبوع**: مفيش حاجة بتتحول لعادة.", "- **Reading the plan without doing it**: “just admiring”.\n- **Squeezing four weeks into one**: nothing becomes a habit."),
          L("whennot", "لو شركتك ما بتسمحش بأدوات معينة، طبّق الخطة على الأدوات المعتمدة بس؛ المبادئ واحدة.", "If your company doesn’t allow certain tools, apply the plan only to approved tools; the principles are the same."),
        ],
      },
    },
  ]);
})(window.ACADEMY = window.ACADEMY || {});
