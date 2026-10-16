/* The Prompt and the Context — the story deck that opens lesson f4 (the book's Context & Prompt pages; shown third in unit 0, right after the "inside the model" deck).
   One hero runs through every slide: the request «اكتبلي تقرير عن التوقفات», and the question «الموديل شايف إيه وإنت بتكلّمه؟».
   Each slide gives one rule with its reason («القاعدة، وليه؟») and builds on the "inside the model" deck (f2): the meaning map,
   attention and next-word prediction explain why word choice and Context decide what the model understands.
   Prompt and Context stay English terms everywhere in the course. Same slide schema as data/model-story.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.contextStory = {
    id: "context", lesson: "f4",
    kicker: u("الـ Prompt والـ Context · الحكاية كاملة في ٧ دقايق", "The Prompt and the Context · the whole story in 7 minutes"),
    title: u("الـ Prompt والـ Context: إزاي كلامك بيوجّه عقل الموديل", "The Prompt and the Context: how your words steer the model's mind"),
    lead: u("الموديل ما بيشوفش غير الكلام اللي قدامه. في الحكاية دي هنعرف يعني إيه Prompt ويعني إيه Context، وإزاي اختيار كلمة واحدة بيوجّه الموديل للمعرفة الصح جوه عقله، وإيه اللي بيحدد إنه يفهمك صح ويفكّر في الاتجاه الصح.",
      "A model sees nothing but the text in front of it. In this story we'll see what a Prompt is and what a Context is, how a single word choice steers the model to the right knowledge inside it, and what decides whether it understands you and reasons in the right direction."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("الموديل شايف إيه وإنت بتكلّمه؟", "What does the model see when you talk to it?"),
    finalQuestion: u("الـ Prompt الجاي بتاعك هيوجّهه لفين؟", "Where will your next Prompt steer it?"),
    note: u("التشبيهات مبسّطة للتوضيح، وخريطة المعاني صورة تقريبية لعملية أعقد بكتير. الأمثلة والأرقام توضيحية.", "Analogies are simplified; the meaning map is an approximate picture of a far more complex process. Examples and numbers are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("إزاي الـ Prompt والـ Context بيوجّهوا الموديل، في شرائح", "How the Prompt and the Context steer a model, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "sees", art: "c_sees", year: u("النافذة", "Window"), mark: u("٠١", "01"), era: u("قبل أي حاجة", "First things first"),
        title: u("الموديل بيشوف إيه وإنت بتكلّمه؟", "What does the model see when you talk to it?"),
        story: [u("في «جوّا الموديل» شفنا إن الموديل آلة توقّع: بيقرا الكلام اللي قدامه، ويطلّع أرجح كلمة جاية، وبعدها اللي بعدها. طب «الكلام اللي قدامه» ده إيه بالظبط؟",
          "In “Inside the model” we saw that a model is a prediction machine: it reads the text in front of it and produces the most likely next word, then the next. So what exactly is “the text in front of it”?"),
        u("هو كل النص اللي بيوصله في المحادثة دي، وبس. مصنعك وملفاتك وخبرتك واجتماع امبارح… كل ده مش موجود بالنسبة له غير لو اتكتب قدامه. لو كتبت «اكتبلي تقرير عن التوقفات»، هو ما يعرفش أنهي مصنع، ولا أنهي خط، ولا أنهي شهر. النص اللي قدامه ده اسمه الـ Context.",
          "It is all the text that reaches it in this conversation — nothing more. Your factory, your files, your experience, yesterday's meeting: none of it exists for the model unless it is written in front of it. Type “write me a report on the stoppages” and it has no idea which factory, which line or which month. The text in front of it is called the Context.")],
        answer: u("اعتبر إن الموديل ما يعرفش عنك أي حاجة غير اللي مكتوب قدامه. لأن ده فعلًا كل اللي بيشتغل عليه.", "Assume the model knows nothing about you beyond what is written in front of it — because that really is all it works with."),
        idea: u("الـ Context هو العالم كله بالنسبة للموديل في اللحظة دي.", "In that moment, the Context is the model's entire world.")
      },
      {
        id: "defs", art: "c_defs", year: u("التعريف", "Terms"), mark: u("٠٢", "02"), era: u("مين جوه مين", "What sits inside what"),
        title: u("الـ Context والـ Prompt: مين جوه مين؟", "The Context and the Prompt: which contains which?"),
        story: [u("الـ Context هو كل اللي الموديل بيقراه قبل ما يرد: تعليمات التطبيق الثابتة، والملفات اللي رفعتها، والرسايل اللي فاتت في نفس المحادثة، وطلبك الأخير.",
          "The Context is everything the model reads before it replies: the app's fixed instructions, the files you uploaded, the earlier messages in the same conversation, and your latest request."),
        u("والـ Prompt هو الجزء اللي إنت بتكتبه عشان تحدد المطلوب: المهمة، والطريقة، وشكل النتيجة. يعني الـ Prompt جزء من الـ Context، مش العكس.",
          "The Prompt is the part you write to state what you want: the task, the approach and the shape of the result. So the Prompt sits inside the Context — not the other way round."),
        u("ومعلومة مهمة: الموديل نفسه ما بيفتكرش محادثاتك. اللي بيخليه يكمّل معاك إن التطبيق بيبعتله المحادثة اللي فاتت تاني، كجزء من الـ Context، مع كل رسالة جديدة.",
          "One important detail: the model itself doesn't remember your conversations. It can carry on with you because the app sends the earlier conversation again, as part of the Context, with every new message.")],
        answer: u("فكّر في الاتنين مع بعض: الـ Prompt بيقول «اعمل إيه»، والـ Context بيقول «في أنهي ظروف». لأن الموديل بيقرا الاتنين كنص واحد.", "Think of the two together: the Prompt says “what to do”, the Context says “under which circumstances” — the model reads both as one text."),
        idea: u("Context = كل اللي قدام الموديل. Prompt = طلبك إنت جوّاه.", "Context = everything in front of the model. Prompt = your request inside it.")
      },
      {
        id: "map", art: "c_map", year: u("الخريطة", "Map"), mark: u("٠٣", "03"), era: u("الكلمة بتشاور على مكان", "Words point to places"),
        title: u("كل كلمة في الـ Prompt بتشاور على مكان في خريطة المعاني", "Every word in the Prompt points to a place on the map of meaning"),
        story: [u("فاكر خريطة المعاني من «جوّا الموديل»؟ كل كلمة ليها مكان، والكلمات اللي معناها قريب بتبقى جنب بعض. وخلال التدريب، كل منطقة في الخريطة اترتبطت بمواضيع ومعارف معينة.",
          "Remember the map of meaning from “Inside the model”? Every word has a place, and words with similar meanings sit close together. During training, each region of the map became tied to particular topics and knowledge."),
        u("لما تكتب «اكتب عن الجودة»، الكلمة دي بتشاور على منطقة واسعة: جودة المنتج، وجودة الخدمة، وجودة الحياة… فالموديل بيروح للكلام العام اللي بيجمعهم. لكن «نسبة الهالك في خط التعبئة» بتشاور على منطقة محددة: التصنيع، والفاقد، وأسباب العيوب.",
          "Write “write about quality” and the word points to a wide region: product quality, service quality, quality of life… so the model drifts to the general talk they share. “Scrap rate on the filling line” points to one specific region: manufacturing, waste and the causes of defects."),
        u("ده تبسيط: المعنى بيتكوّن من كل الكلمات مع بعض عبر طبقات كتير. بس الاتجاه صحيح: كل ما كلماتك أدق، كل ما الموديل اشتغل في المنطقة الصح.",
          "This is a simplification — meaning is built from all the words together across many layers. But the direction holds: the more precise your words, the more the model works in the right region.")],
        answer: u("اختار الكلمة اللي بتشاور على المنطقة اللي محتاجها. لأن الكلمة العامة بتوديه لإجابة عامة، والكلمة الدقيقة بتوديه للمعرفة الصح.", "Choose the word that points to the region you need — a general word leads to a general answer, a precise word leads to the right knowledge."),
        idea: u("الـ Prompt مش أمر وبس؛ ده عنوان بيوجّه الموديل لمكان المعرفة جوه عقله.", "A Prompt is not just an order; it is an address that sends the model to the right place in its knowledge.")
      },
      {
        id: "terms", art: "c_terms", year: u("الدقة", "Precision"), mark: u("٠٤", "04"), era: u("لغة التخصص", "The language of the field"),
        title: u("المصطلح الدقيق بيستدعي معاه طريقة تفكير كاملة", "A precise term brings a whole way of thinking with it"),
        story: [u("قارن: «شوف ليه الخط بيقف كتير» و«اعمل تحليل باريتو لأسباب توقف خط التعبئة في سبتمبر». الجملة التانية فيها مصطلح واحد، «باريتو»، بيستدعي طريقة كاملة: ترتيب الأسباب من الأكبر للأصغر، والتركيز على الأسباب القليلة اللي عاملة أغلب المشكلة.",
          "Compare “see why the line stops so often” with “do a Pareto analysis of the filling line's stoppage causes in September”. The second contains one term — “Pareto” — that brings a whole method with it: rank the causes from largest to smallest and focus on the few that cause most of the problem."),
        u("ونفس الكلام عن الجمهور: «اشرحها لمدير عام» بتنقل الموديل للغة تنفيذية مختصرة، و«اشرحها لموظف جديد» بتنقله للشرح خطوة بخطوة. كلمة واحدة غيّرت المستوى والأسلوب.",
          "The same goes for the audience: “explain it to a general manager” moves the model to brief executive language; “explain it to a new employee” moves it to step-by-step explanation. One word changed the level and the style.")],
        answer: u("استخدم مصطلحات مجالك وسمّي الجمهور. لأن كل مصطلح بيجيب معاه المعرفة والأسلوب المرتبطين بيه من غير ما تشرحهم.", "Use your field's terms and name the audience — each term brings its related knowledge and style without you having to explain them."),
        idea: u("مصطلح متخصص واحد ممكن يغنيك عن فقرة شرح كاملة.", "One specialist term can replace a whole paragraph of explanation.")
      },
      {
        id: "links", art: "c_links", year: u("الربط", "Links"), mark: u("٠٥", "05"), era: u("الانتباه شغّال على كلامك", "Attention works on your words"),
        title: u("كل كلمة في الرد بتبص على الـ Context كله", "Every word of the reply looks back at the whole Context"),
        story: [u("في «جوّا الموديل» شفنا الانتباه: كل كلمة بتبص على الكلمات اللي قبلها وتختار اللي يهمها. ولما الموديل بيكتب ردّه، كل كلمة جديدة بتبص على الـ Context كله: طلبك، وملفاتك، والأرقام اللي ذكرتها.",
          "In “Inside the model” we met attention: every word looks back at the words before it and picks what matters. When the model writes its reply, every new word looks back at the whole Context — your request, your files, the numbers you mentioned."),
        u("فلو كتبت «عندنا ٣ ورديات، وأغلب التوقف في الوردية التالتة»، الانتباه هيمسك المعلومة دي ويبني عليها، وهتلاقيها في الرد. ولو ما كتبتهاش، مفيش حاجة يمسكها.",
          "So if you write “we run 3 shifts and most stoppages happen on the third”, attention latches onto that and builds on it — you'll see it in the reply. If you don't write it, there is nothing to latch onto.")],
        answer: u("اكتب المعلومات المهمة صراحةً في الـ Context. لأن الموديل ما يقدرش يربط بحاجة مش مكتوبة قدامه.", "State the important facts explicitly in the Context — the model can't connect to anything that isn't written in front of it."),
        idea: u("جودة الربط جوه عقل الموديل محدودة بجودة المعلومات اللي إديتهاله.", "How well the model connects ideas is capped by how good the information you gave it is.")
      },
      {
        id: "gaps", art: "c_gaps", year: u("الفراغات", "Gaps"), mark: u("٠٦", "06"), era: u("اللي ما اتقالش", "What wasn't said"),
        title: u("اللي ما قلتهوش… هيخمّنه", "What you didn't say… it will guess"),
        story: [u("لو طلبت «اعمل خطة إنتاج للأسبوع الجاي» من غير ما تذكر عدد الخطوط والورديات والطلبيات، الموديل مش هيقف. هيكمّل بأرجح قيم يعرفها: مصنع افتراضي متوسط، وخطة شكلها سليم بس مش مناسبة لمصنعك.",
          "Ask for “a production plan for next week” without the number of lines, shifts and orders, and the model won't stop. It carries on with the most likely values it knows: an average, imaginary factory, and a plan that looks sound but doesn't fit yours."),
        u("ودي نفس فكرة الإجابة الواثقة الغلط في أول درس: الموديل بيملا الفراغ بالأرجح، مش بالحقيقي. كل معلومة ناقصة في الـ Context هي فراغ هيتملي بتخمين.",
          "It's the same idea as the confident wrong answer in the first lesson: the model fills a gap with what is likely, not with what is true. Every missing fact in the Context is a gap that will be filled with a guess.")],
        answer: u("قلّل الفراغات، أو اطلب منه يسألك عنها قبل ما يبدأ. لأن كل فراغ هيتملي بافتراض، وغالبًا مش هيبقى افتراضك.", "Close the gaps, or ask it to question you about them before it starts — every gap gets filled with an assumption, usually not yours."),
        idea: u("الإجابة العامة غالبًا علامة على Context ناقص، مش على موديل ضعيف.", "A generic answer is usually a sign of a thin Context, not a weak model.")
      },
      {
        id: "anatomy", art: "c_anatomy", year: u("التشريح", "Anatomy"), mark: u("٠٧", "07"), era: u("مكوّنات الطلب القوي", "The parts of a strong request"),
        title: u("تشريح Prompt قوي", "Anatomy of a strong Prompt"),
        story: [u("الـ Prompt القوي بيجاوب على أسئلة الموديل قبل ما تتسأل: إيه الهدف؟ وإيه الظروف؟ وإيه المهمة بالظبط؟ وعايز النتيجة في أنهي شكل؟ ولمين؟ وإيه القيود؟",
          "A strong Prompt answers the model's questions before they arise: what is the goal? what are the circumstances? what exactly is the task? what shape should the result take? for whom? within which limits?"),
        u("مثال: «أنا مشرف تخطيط في مصنع تعبئة (ظروف). عايز أقنع المدير العام بخطة صيانة (هدف). حلّل ملف توقفات سبتمبر المرفق وطلّع أكبر ٣ أسباب (مهمة)، في جدول وبعده ٣ توصيات (شكل)، بلغة مختصرة تناسب مدير (جمهور)، وما تخمّنش أي رقم مش موجود في الملف (قيد)».",
          "For example: “I'm a planning supervisor in a bottling plant (circumstances). I want to convince the general manager to approve a maintenance plan (goal). Analyse the attached September stoppage file and pull out the 3 biggest causes (task), in a table followed by 3 recommendations (shape), in brief language for a manager (audience), and don't guess any number that isn't in the file (limit).”")],
        answer: u("ابني الطلب من المكوّنات دي. لأن كل مكوّن بيقفل باب من أبواب التخمين.", "Build the request from these parts — each one closes a door to guessing."),
        idea: u("هدف + ظروف + مهمة + شكل + جمهور + قيود = طلب ما يحتاجش الموديل يخمّن فيه.", "Goal + circumstances + task + shape + audience + limits = a request the model doesn't need to guess about.")
      },
      {
        id: "examples", art: "c_examples", year: u("المثال", "Example"), mark: u("٠٨", "08"), era: u("ورّيه بدل ما توصف", "Show rather than describe"),
        title: u("مثال واحد أقوى من فقرة وصف", "One example beats a paragraph of description"),
        story: [u("الموديل اتدرّب على لعبة «كمّل الكلام»، فهو بارع جدًا في إنه يلاحظ نمط ويكمّل عليه. لو ورّيته مثال واحد للشكل اللي عايزه، هيمشي على نفس النمط.",
          "The model was trained on a “continue the text” game, so it is excellent at spotting a pattern and continuing it. Show it one example of the format you want and it will follow the same pattern."),
        u("بدل ما تكتب «لخّص كل عطل بشكل مختصر ومنظم»، اكتب مثال: «ماكينة ٣ | ٤٥ دقيقة | سير مقطوع». وبعدين اطلب منه يكمّل بنفس الشكل لباقي الأعطال.",
          "Instead of “summarise each fault briefly and neatly”, give an example: “Machine 3 | 45 min | broken belt”. Then ask it to continue in the same format for the remaining faults.")],
        answer: u("لما الشكل يكون مهم، ادّيله مثال. لأن المثال بيحدد النمط بدقة أكبر من أي وصف.", "When the format matters, give an example — an example pins down the pattern more precisely than any description."),
        idea: u("الموديل بيكمّل الأنماط اللي في الـ Context، فخلّي النمط اللي قدامه هو اللي عايزه.", "The model continues the patterns in its Context, so make sure the pattern in front of it is the one you want.")
      },
      {
        id: "window", art: "c_window", year: u("السعة", "Capacity"), mark: u("٠٩", "09"), era: u("الـ Context ليه حدود", "The Context has limits"),
        title: u("الـ Context ليه سعة محدودة", "The Context has a limited capacity"),
        story: [u("الـ Context بيتقاس بالتوكنز، ولكل موديل حد أقصى بيختلف من موديل للتاني. ولما المحادثة تطول جدًا، ممكن الأجزاء القديمة تتشال أو تتلخّص عشان الكلام يفضل جوه الحد.",
          "The Context is measured in tokens, and every model has a maximum that differs from one model to another. When a conversation grows very long, older parts may be dropped or summarised to stay within the limit."),
        u("وحتى جوه الحد، أبحاث لاحظت إن الموديلات ممكن تدّي اهتمام أقل لتفاصيل مدفونة في نص Context طويل جدًا، مقارنةً باللي في أوله وآخره.",
          "Even within the limit, research has observed that models can pay less attention to details buried in the middle of a very long Context than to what sits at its start and end.")],
        answer: u("خلّي المهم واضح وفي مكان بارز، ولو المحادثة طوّلت ابدأ محادثة جديدة بملخص. لأن السعة محدودة، والانتباه مش متساوي على كل الأجزاء.", "Keep what matters clear and prominent, and when a conversation runs long, start a new one with a summary — capacity is limited and attention isn't spread evenly."),
        idea: u("كلام أكتر مش معناه فهم أكتر؛ المهم إن المعلومة الصح تبقى واضحة.", "More text doesn't mean more understanding; what matters is that the right information stands out.")
      },
      {
        id: "noise", art: "c_noise", year: u("التشويش", "Noise"), mark: u("١٠", "10"), era: u("Context أنضف = فهم أدق", "Cleaner Context, sharper understanding"),
        title: u("معلومة قديمة أو متناقضة في الـ Context بتشدّ التفكير للاتجاه الغلط", "Outdated or conflicting information in the Context pulls the reasoning the wrong way"),
        story: [u("الانتباه ما بيفرّقش لوحده بين المعلومة المهمة والمعلومة اللي ملهاش لازمة. لو حطيت سياسة الإجازات القديمة والجديدة مع بعض، الموديل ممكن يبني إجابته على القديمة.",
          "Attention can't tell on its own which information matters and which is irrelevant. Put the old and the new leave policy side by side and the model may build its answer on the old one."),
        u("ونفس الشيء لو المحادثة اتملت بمحاولات فاشلة وتصحيحات متناقضة: كلها لسه موجودة في الـ Context، وبتأثر على الرد الجاي.",
          "The same happens when a conversation fills up with failed attempts and contradictory corrections: all of it is still in the Context, shaping the next reply.")],
        answer: u("حط بس اللي ليه علاقة بالمهمة، وشيل المتناقض والقديم. لأن كل كلمة في الـ Context بتنافس على انتباه الموديل.", "Include only what is relevant to the task and remove anything outdated or contradictory — every word in the Context competes for the model's attention."),
        idea: u("الـ Context النضيف بيوجّه التفكير؛ والـ Context المشوّش بيشتّته.", "A clean Context focuses the reasoning; a noisy one scatters it.")
      },
      {
        id: "steer", art: "c_steer", year: u("التوجيه", "Steering"), mark: u("١١", "11"), era: u("وجّه طريقة تفكيره", "Guide how it reasons"),
        title: u("إزاي توجّه تفكيره، مش إجابته وبس", "How to guide its reasoning, not just its answer"),
        story: [u("الرد نفسه بيتكتب كلمة ورا كلمة، وكل كلمة بتنضم للـ Context. فلما تطلب منه «فكّر خطوة بخطوة قبل ما تجاوب»، الخطوات اللي بيكتبها بتبقى أساس بيبني عليه الاستنتاج، وده غالبًا بيحسّن الدقة في المسائل اللي فيها حساب أو منطق.",
          "The reply itself is written word by word, and every word joins the Context. So when you ask it to “think step by step before answering”, the steps it writes become a foundation for its conclusion — which often improves accuracy on problems involving calculation or logic."),
        u("وتقدر توجّهه كمان بجمل زي: «لو ناقصك معلومة اسألني الأول»، و«افصل بين اللي متأكد منه واللي بتخمّنه»، و«اذكر مصدر كل رقم من الملف». كل جملة من دول بتغيّر طريقة اشتغاله.",
          "You can steer it further with lines such as “if you're missing information, ask me first”, “separate what you're sure of from what you're guessing” and “cite the source of every number in the file”. Each line changes how it works.")],
        answer: u("اطلب الخطوات والافتراضات والمصادر صراحةً. لأن اللي بيكتبه في الطريق بيبقى جزء من الـ Context اللي بيبني عليه النتيجة.", "Ask explicitly for the steps, the assumptions and the sources — whatever it writes along the way becomes part of the Context its result is built on."),
        idea: u("إنت مش بتسأل وبس؛ إنت بتحدد طريقة التفكير اللي هيوصل بيها للإجابة.", "You are not just asking; you are setting the line of reasoning that leads to the answer.")
      },
      {
        id: "recap", art: "c_recap", year: u("الخلاصة", "Recap"), mark: u("١٢", "12"), era: u("إنت اللي بتوجّه", "You do the steering"),
        title: u("الخلاصة: الموديل بيفهم على قد الـ Context اللي إديتهوله", "In short: the model understands as much as the Context you give it"),
        story: [u("الموديل عنده معرفة واسعة جدًا، بس ما يعرفش أنهي جزء منها إنت محتاجه. الـ Prompt بكلماته الدقيقة بيوجّهه للمنطقة الصح، والـ Context بمعلوماته بيدّيه الظروف اللي يربط بيها، والمثال بيحدد الشكل، والتوجيه بيحدد طريقة التفكير.",
          "The model has vast knowledge, but it doesn't know which part of it you need. The Prompt, through precise words, steers it to the right region; the Context, through its facts, gives it the circumstances to connect; an example fixes the format; and guidance sets the line of reasoning."),
        u("وارجع لطلب «اكتبلي تقرير عن التوقفات» من أول الحكاية: نفس الموديل، بس بـ Prompt دقيق وContext كامل، هيطلّع تقرير عن مصنعك إنت، بأرقامك، للقرار اللي محتاجه.",
          "Go back to “write me a report on the stoppages” from the start of the story: the same model, given a precise Prompt and a complete Context, produces a report about your factory, with your numbers, for the decision you need.")],
        answer: u("قبل ما تبعت أي طلب، اسأل نفسك: لو حد شاطر جدًا بس ما يعرفش أي حاجة عن شغلي قرا الكلام ده، هيفهم المطلوب؟ لأن ده بالظبط وضع الموديل.", "Before sending any request, ask yourself: if a very capable person who knows nothing about my work read this, would they understand what I need? That is exactly the model's position."),
        idea: u("Prompt دقيق + Context كامل ونضيف = موديل بيفهم صح وبيفكّر في الاتجاه الصح.", "A precise Prompt + a complete, clean Context = a model that understands correctly and reasons in the right direction.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.contextStory]);
})(window.ACADEMY = window.ACADEMY || {});
