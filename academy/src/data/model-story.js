/* Inside the model — the story deck that opens the second lesson (f2).
   One hero runs through every slide: the game «إيه الكلمة الجاية؟». Every design decision is told as a consequence of it,
   each with its reason («القرار، وليه؟»): why learn from examples, why next-word prediction, how a guess becomes learning (error and
   small adjustments), why tokens, how the meaning map is learned, why positions, how attention scores the context, why layers, why scale, why a tuning stage, how a reply is
   generated, and what that means for the reader. Analogies and numbers are simplified; the steps are what really happens.
   Same slide schema as data/history.js; `year` is the short timeline label, `mark` the big watermark. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.modelStory = {
    id: "model", lesson: "f2", pace: "slow",
    kicker: u("جوّا الموديل · الحكاية كاملة في ٧ دقايق", "Inside the model · the whole story in 7 minutes"),
    title: u("جوّا الموديل: لعبة واحدة… بقت عقل بيكتب", "Inside the model: one simple game… that became a mind that writes"),
    lead: u("مش محتاج تبقى مبرمج. هنمشي ورا سؤال واحد بس: «إيه الكلمة الجاية؟»، ونشوف إزاي كل قرار في تصميم الموديل طلع منطقي من اللعبة دي، من التوكنز لحد ما يرد عليك.",
      "You don't need to be a programmer. We'll follow one question — “what's the next word?” — and see how every design decision inside a model follows from that one game, from tokens all the way to its reply."),
    answerLabel: u("القرار، وليه؟", "The decision, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("اللعبة كلها: إيه الكلمة الجاية؟", "The whole game: what's the next word?"),
    finalQuestion: u("وإنت هتديله إيه عشان يتوقّع صح؟", "So what will you give it to guess right?"),
    note: u("التشبيهات والأرقام مبسّطة للتوضيح؛ الخطوات نفسها هي اللي بتحصل فعلًا. تقسيم الكلمات توضيحي.", "Analogies and numbers are simplified; the steps are what really happens. Word splits are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("إزاي الموديل بيشتغل من جوه، في شرائح", "How a model works inside, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "idea", art: "m_idea", year: u("الفكرة", "Idea"), mark: u("٠١", "01"), era: u("قبل أي حاجة", "First things first"),
        title: u("يعني إيه «موديل» أصلًا؟", "What is a “model”, anyway?"),
        story: [u("البرنامج العادي بيمشي على قواعد كتبها مبرمج بإيده: «لو حصل كذا، اعمل كذا». الطريقة دي بتنجح في الحسابات، لكنها بتفشل مع اللغة، لأن مفيش حد يقدر يكتب قواعد لكل جملة ممكن تتقال.",
          "An ordinary program follows rules a programmer wrote by hand: “if this happens, do that.” This works well for calculations but fails with language, because nobody can write rules for every sentence that could ever be said."),
        u("فالعلماء عكسوا الفكرة: بدل ما نكتب القواعد، نبني آلة فيها مليارات الأرقام القابلة للضبط، هنسميها «المفاتيح»، ونوريها أمثلة كتير لحد ما المفاتيح دي تتظبط. الآلة بعد ما تتظبط هي اللي بنسميها «موديل».",
          "So scientists turned the idea around: instead of writing the rules, we build a machine with billions of adjustable numbers — we'll call them “knobs” — and show it many examples until those knobs are set. Once set, that machine is what we call a “model”.")],
        answer: u("ما نكتبش القواعد؛ نخلّي الآلة تتعلّمها من الأمثلة. لأن اللغة أوسع وأعقد من إن حد يحصر قواعدها.", "We don't write the rules; we let the machine learn them from examples — because language is too vast and complex for anyone to list its rules."),
        idea: u("الموديل آلة مفاتيحها اتظبطت من أمثلة كتير.", "A model is a machine whose knobs were set by many examples.")
      },
      {
        id: "game", art: "m_game", year: u("اللعبة", "Game"), mark: u("٠٢", "02"), era: u("طريقة التعليم", "How it learns"),
        title: u("التمرين الوحيد: خمّن الكلمة الجاية", "One exercise: guess the next word"),
        story: [u("علشان المفاتيح تتظبط، محتاجين أسئلة وإجاباتها الصحيحة، وبكميات ضخمة. ولو استنينا ناس تكتبها بإيدها، هناخد قرون.",
          "For the knobs to be set, we need questions with their correct answers, in enormous numbers. If we waited for people to write them by hand, it would take centuries."),
        u("والحل كان بسيط وعبقري: أي جملة مكتوبة هي نفسها سؤال وإجابة. نخبّي آخر كلمة في «فنجان قهوة من غير …»، ونطلب من الموديل يخمّنها، والإجابة الصحيحة موجودة أصلًا في النص.",
          "The solution was simple and brilliant: any written sentence is itself a question and an answer. Hide the last word of “a cup of coffee without …”, ask the model to guess it, and the correct answer is already in the text.")],
        answer: u("نعلّمه بلعبة «الكلمة الجاية». لأنها بتحوّل أي نص مكتوب لتمرين جاهز بإجابته، فنقدر ندرّبه على كمية كلام ضخمة.", "We teach it with the “next word” game — it turns any written text into a ready exercise with its answer, so we can train it on a vast amount of text."),
        idea: u("كل جملة مكتوبة في الدنيا بقت تمرين جاهز.", "Every sentence ever written became a ready-made exercise.")
      },
      {
        id: "training", art: "m_training", year: u("التدريب", "Training"), mark: u("٠٣", "03"), era: u("إزاي بيتعلّم", "How it learns"),
        title: u("التخمين بيتحوّل لتعلّم: خمّن، وقارن، وعدّل", "Guessing becomes learning: guess, compare, adjust"),
        story: [u("في الأول المفاتيح عشوائية، فالتخمين بيطلع عشوائي. الموديل يخمّن الكلمة الجاية، ونقارن تخمينه بالكلمة الصحيحة اللي في النص، ونحسب هو بعيد عنها قد إيه. الرقم ده اسمه «الخطأ».",
          "At first the knobs are random, so the guesses are random. The model guesses the next word, we compare its guess with the correct word in the text, and we measure how far off it was. That number is called the “error”."),
        u("بعدها الحساب بيحدد كل مفتاح ساهم في الخطأ قد إيه، ويحرّكه حركة صغيرة جدًا في الاتجاه اللي يقلّله، ونكرر ده مليارات المرات. واللي اتعلمه الموديل في الآخر بيبقى متوزّع على المفاتيح كلها، مش محفوظ كمعلومات في جدول.",
          "Then the calculation works out how much each knob contributed to the error and moves it a tiny step in the direction that reduces it — repeated billions of times. What the model learns ends up spread across all its knobs, not stored as facts in a table.")],
        answer: u("نقيس الخطأ في كل تخمين، ونعدّل المفاتيح خطوة صغيرة تقلّله. لأن مفيش حد يقدر يظبط مليارات المفاتيح بإيده، لكن الحساب يقدر يعرف كل مفتاح يتحرك فين.", "We measure the error of every guess and adjust the knobs a small step to reduce it — nobody could set billions of knobs by hand, but the calculation can tell where each one should move."),
        idea: u("كل تخمين غلط بيعلّم الموديل حاجة صغيرة، ومليارات منها بتبني قدرة حقيقية.", "Every wrong guess teaches the model something small; billions of them build real ability.")
      },
      {
        id: "tokens", art: "m_tokens", year: u("التوكنز", "Tokens"), mark: u("٠٤", "04"), era: u("تقطيع الكلام", "Cutting up text"),
        title: u("ليه بيقطّع الكلام لـ«توكنز»؟", "Why cut text into “tokens”?"),
        story: [u("الآلة ما بتتعامل إلا مع أرقام، فلازم الكلام يتقطّع لقطع، وكل قطعة تاخد رقم. لو قطّعنا حرف حرف، الجملة هتبقى طويلة جدًا والحرف لوحده ملوش معنى. ولو قطّعنا كلمة كلمة، القاموس هيبقى بالملايين، وأي كلمة جديدة هتبقى غريبة عليه.",
          "The machine only works with numbers, so text must be cut into pieces, each with a number. Cut letter by letter and a sentence becomes very long, and a letter alone has no meaning. Cut word by word and the dictionary runs into millions, and any new word is unknown to it."),
        u("فالحل في النص: قطع متوسطة اسمها «توكنز». الكلمات المشهورة بتبقى قطعة واحدة، والنادرة بتتكسر لقطع معروفة، زي مكعبات بتتركب في بعض. وكل موديل ليه طريقته في التقطيع، علشان كده نفس الجملة ممكن يبقى عدد توكنزها مختلف من موديل للتاني.",
          "So the answer lies in between: medium-sized pieces called “tokens”. Common words stay one piece, and rare ones split into familiar pieces, like building blocks that fit together. Each model has its own way of cutting, which is why the same sentence can have a different token count from one model to another.")],
        answer: u("نقطّع لقطع متوسطة. لأنها بتوازن بين قاموس حجمه معقول وجمل مش طويلة زيادة، ومفيش كلمة تبقى غريبة عليه تمامًا.", "We cut into medium-sized pieces — they balance a dictionary of reasonable size against sentences that aren't too long, and no word is ever completely unknown."),
        idea: u("التوكن قطعة كلام، مش لازم تكون كلمة كاملة.", "A token is a piece of text, not necessarily a whole word.")
      },
      {
        id: "map", art: "m_map", year: u("الخريطة", "Map"), mark: u("٠٥", "05"), era: u("المعنى بالأرقام", "Meaning as numbers"),
        title: u("كل توكن بقى نقطة على خريطة معاني", "Every token becomes a point on a map of meaning"),
        story: [u("لو أدينا كل توكن رقم مسلسل، زي قهوة = ٥٠٣ وشاي = ٩٨١٢، الرقم مش هيقول أي حاجة عن المعنى. فبدل رقم واحد، كل توكن بياخد مجموعة أرقام، كأنها إحداثيات مكانه على خريطة كبيرة جدًا.",
          "If we gave each token a serial number, like coffee = 503 and tea = 9812, the number would say nothing about meaning. So instead of one number, each token gets a set of numbers, like the coordinates of its place on a very large map."),
        u("والأماكن دي مش حد بيحددها بإيده. نفس دورة «خمّن، وقارن، وعدّل» اللي في الشريحة التالتة بتحرّكها شوية شوية، لحد ما الكلمات اللي بتيجي في مواقف شبه بعض تقرّب من بعض: «قهوة» جنب «شاي»، و«القاهرة» جنب «باريس».",
          "Nobody places them by hand. The same “guess, compare, adjust” cycle from slide three moves them little by little, until words used in similar situations end up close together: “coffee” next to “tea”, “Cairo” next to “Paris”.")],
        answer: u("نحوّل كل توكن لمكان على خريطة، والتدريب هو اللي بيرتّب الأماكن. لأن اللي يتعلمه عن «قهوة» يفيده في «شاي» على طول، من غير أمثلة لكل كلمة لوحدها.", "We turn each token into a place on a map, and training arranges the places — what it learns about “coffee” helps with “tea” at once, without examples for every word."),
        idea: u("قريب في المعنى = قريب على الخريطة، والتدريب هو اللي قرّبهم.", "Close in meaning = close on the map, and training brought them together.")
      },
      {
        id: "order", art: "m_order", year: u("الترتيب", "Order"), mark: u("٠٦", "06"), era: u("مين قبل مين", "Who comes first"),
        title: u("نفس الكلمات… معنى تاني خالص", "Same words… a completely different meaning"),
        story: [u("«الكلب عض الراجل» خبر عادي، و«الراجل عض الكلب» خبر غريب يستاهل النشر. نفس الكلمات بالظبط، والترتيب هو اللي غيّر المعنى.",
          "“Dog bites man” is ordinary news; “man bites dog” is strange enough to publish. Exactly the same words — the order alone changed the meaning."),
        u("والخطوة اللي جاية، «الانتباه»، بتوصّل الكلمات ببعض كلها مرة واحدة، فمن غير مساعدة مش هتعرف مين جه قبل مين. علشان كده كل توكن بياخد علامة صغيرة بموقعه في الجملة، زي رقم الكرسي في القاعة.",
          "The next step, “attention”, connects all the words at once, so without help it wouldn't know which came first. That's why every token gets a small mark of its position in the sentence, like a seat number in a hall.")],
        answer: u("نضيف لكل توكن معلومة بمكانه. لأن من غيرها الجملة بتبقى مجموعة كلمات من غير ترتيب، والمعنى بيضيع.", "We add each token's position to it — without that, a sentence becomes an unordered set of words, and the meaning is lost."),
        idea: u("المعنى = الكلمات + ترتيبها.", "Meaning = the words + their order.")
      },
      {
        id: "attention", art: "m_attention", year: u("الانتباه", "Attention"), mark: u("٠٧", "07"), era: u("قلب التصميم", "The heart of the design"),
        title: u("الانتباه: كل كلمة بتدوّر على اللي يهمها", "Attention: every word looks for what matters to it"),
        story: [u("«سلّمت الملف للمدير عشان هو مستعجل». مين المستعجل؟ إنت عرفت على طول إنه المدير. الموديل بيوصل لده بحساب اسمه «الانتباه»: كلمة «هو» بتطرح سؤال، وكل كلمة قبلها عندها وصف، والحساب بيدّي كل كلمة درجة على قد ما وصفها بيجاوب السؤال.",
          "“I handed the file to the manager because he was in a hurry.” Who was in a hurry? You knew at once: the manager. The model gets there with a calculation called “attention”: the word “he” poses a question, every word before it carries a description, and each earlier word gets a score for how well its description answers the question."),
        u("«المدير» بتاخد أعلى درجة، فمعناها بيدخل في فهم «هو» أكتر من غيرها. وده حساب درجات، مش فهم زي فهم الإنسان. والكلمة بتبص على اللي قبلها بس، لأنه بيتدرّب يخمّن اللي بعدها، فلو شافها يبقى شاف الإجابة.",
          "“The manager” gets the highest score, so its meaning shapes “he” more than any other word. It's a calculation of scores, not understanding as a person understands. And each word looks only at the words before it, because the model trains to guess what comes next; seeing it would mean seeing the answer.")],
        answer: u("كل كلمة بتدّي درجة لكل الكلمات اللي قبلها، وبتاخد من معناها على قد درجتها. لأنه كده بيربط أجزاء الكلام البعيدة ببعض، من غير ما يشوف الإجابة قبل ما يخمّنها.", "Each word scores every word before it and takes in their meaning according to those scores — that's how distant parts of a text get linked, without seeing the answer before guessing it."),
        idea: u("ده قلب تصميم «المحوّل» (Transformer) اللي شفناه في حكاية التاريخ سنة ٢٠١٧.", "This is the heart of the Transformer design we met in the history story, in 2017.")
      },
      {
        id: "layers", art: "m_layers", year: u("الطبقات", "Layers"), mark: u("٠٨", "08"), era: u("الصورة بتوضح", "The picture sharpens"),
        title: u("طبقة فوق طبقة: من كلمات لمقصود", "Layer upon layer: from words to intent"),
        story: [u("خطوة انتباه واحدة مش كفاية. فالموديل بيكرر نفس الوحدة، انتباه وبعده خطوة حساب، عشرات المرات، طبقة فوق طبقة. ومع كل طبقة، الأرقام اللي بتمثّل كل كلمة بتتحدّث بمعلومات جديدة من باقي الجملة.",
          "One step of attention isn't enough. So the model repeats the same unit — attention followed by a calculation step — dozens of times, layer upon layer. With each layer, the numbers that represent each word are updated with new information from the rest of the sentence."),
        u("زي خط إنتاج في مصنع: كل محطة بتضيف حاجة للمنتج. الطبقات الأولى بتلقط حاجات بسيطة زي شكل الكلام وقواعده، واللي بعدها المعنى، والأعلى المقصود من الكلام كله. ده تبسيط، لكنه الاتجاه العام.",
          "Like a production line in a factory, where every station adds something to the product. The early layers pick up simple things like word forms and grammar, the next ones meaning, and the top ones the intent of the whole text. It's a simplification, but it's the general direction.")],
        answer: u("نكرر وحدة بسيطة طبقات كتير بدل ما نصمم حاجة معقدة. لأن الوحدة البسيطة سهل نكبّرها، وكل طبقة بتبني على اللي قبلها.", "We repeat one simple unit across many layers instead of designing something complex — a simple unit is easy to scale, and each layer builds on the one before."),
        idea: u("كل طبقة بتوضّح الصورة أكتر للطبقة اللي بعدها.", "Each layer sharpens the picture for the next.")
      },
      {
        id: "scale", art: "m_scale", year: u("الحجم", "Scale"), mark: u("٠٩", "09"), era: u("ليه كبير كده", "Why so big"),
        title: u("ليه بيكبّروه كده؟", "Why make it so big?"),
        story: [u("الحجم هنا ليه تلات معاني مختلفة: عدد المفاتيح جوّه الموديل، وكمية النصوص اللي اتدرّب عليها، وقوة الحساب اللي اتصرفت في التدريب. وحوالي سنة ٢٠٢٠ لاحظ الباحثين قاعدة ثابتة: لما التلاتة يكبروا مع بعض، التخمين بيتحسّن بشكل تقدر تتوقعه.",
          "Size here has three different meanings: the number of knobs inside the model, the amount of text it was trained on, and the computing power spent on training. Around 2020, researchers noticed a steady rule: when all three grow together, the guesses improve in a predictable way."),
        u("ومع الحجم ظهرت قدرات محدش علّمهاله بشكل مباشر: يترجم، ويلخّص، ويكتب كود، ويحل مسائل. كلها طالعة من نفس اللعبة: «إيه الكلمة الجاية؟».",
          "And with size came abilities nobody taught it directly: translating, summarising, writing code, solving problems — all emerging from the same game: “what's the next word?”")],
        answer: u("نكبّر التلاتة مع بعض. لأن التجربة أثبتت إن الحجم الأكبر بيدّي تخمين أدق وقدرات أوسع.", "We grow all three together — experience showed that greater size brings more accurate guesses and wider abilities."),
        idea: u("مفاتيح أكتر + نصوص أكتر + حساب أكتر = موديل أقدر.", "More knobs + more text + more computing = a more capable model.")
      },
      {
        id: "tuning", art: "m_tuning", year: u("التهذيب", "Tuning"), mark: u("١٠", "10"), era: u("من مكمّل لمساعد", "From completer to assistant"),
        title: u("من آلة بتكمّل الكلام… لمساعد بيتبع طلبك", "From a machine that completes text… to an assistant that follows your request"),
        story: [u("بعد التدريب الكبير، الموديل بيعرف يكمّل أي نص وبس. تسأله «إزاي أعمل كيكة؟» ممكن يكمّل بأسئلة شبهها، كأنه بيكمّل صفحة أسئلة.",
          "After the big training, the model can only continue text. Ask it “How do I bake a cake?” and it may continue with similar questions, as if completing a page of questions."),
        u("فبيدخل مرحلة تانية: يتدرّب على أمثلة محادثات مكتوبة كويس، وبعدين ناس بتقارن بين ردوده وتختار الأنفع والأأمن، والموديل يتعلّم يميل للنوع ده. والمرحلة دي بتحسّن طريقة ردّه، لكنها مش ضمان إن كل إجابة صحيحة.",
          "So it goes through a second stage: it trains on well-written example conversations, then people compare its replies and choose the most helpful and safest, and the model learns to lean toward that kind. This stage improves how it replies, but it doesn't guarantee every answer is correct.")],
        answer: u("نضيف مرحلة تهذيب بعد التدريب الكبير. لأن معرفته الواسعة حاجة، ومساعدته ليك بشكل صحيح وآمن حاجة تانية محتاجة تعليم مخصوص.", "We add a tuning stage after the big training — broad knowledge is one thing; helping you correctly and safely is another, and it needs its own teaching."),
        idea: u("التدريب الكبير بيدّيه المعرفة، والتهذيب بيعلّمه يستخدمها في خدمتك.", "The big training gives it knowledge; tuning teaches it to use that knowledge for you.")
      },
      {
        id: "reply", art: "m_reply", year: u("الرد", "Reply"), mark: u("١١", "11"), era: u("لما بتكلّمه", "When you talk to it"),
        title: u("إزاي بيكتب ردّه عليك؟", "How does it write its reply to you?"),
        story: [u("لما تكتبله، المفاتيح بتبقى ثابتة: التعلّم خلص في التدريب، والموديل وهو بيرد عليك ما بيتعلّمش من كلامك. كلامك بيتقطّع توكنز، ويعدّي على كل الطبقات، وفي الآخر بيطلع قائمة احتمالات للتوكن الجاي: «صباح» ٤٥٪، و«أهلًا» ٣٠٪.",
          "When you write to it, the knobs stay fixed: learning ended in training, and the model doesn't learn from your words while it replies. Your text is cut into tokens, passes through every layer, and comes out as a list of chances for the next token: “Good” 45%, “Hello” 30%."),
        u("يختار واحد منهم، ويضيفه للكلام، ويعيد نفس الخطوات علشان التوكن اللي بعده، توكن ورا توكن لحد ما الرد يخلص. وفيه إعداد اسمه «درجة الحرارة»: لو قليلة بيختار الأرجح، ولو عالية بيجرّب اختيارات أجرأ.",
          "It picks one, adds it to the text, and repeats the same steps for the next token — token after token until the reply is done. A setting called “temperature” decides how: low picks the most likely, high tries bolder choices.")],
        answer: u("بيكتب الرد توكن ورا توكن بمفاتيح ثابتة، وكل توكن مبني على اللي قبله. لأن دي نفس اللعبة اللي اتدرّب عليها، بس من غير تصحيح.", "It writes the reply token by token with fixed knobs, each token built on the ones before — the same game it trained on, only without correction."),
        idea: u("التدريب حصل مرة قبل كده، والرد بيستخدم اللي اتعلّمه بس.", "Training happened once, before; a reply only uses what was learned.")
      },
      {
        id: "recap", art: "m_recap", year: u("الخلاصة", "Recap"), mark: u("١٢", "12"), era: u("يبقى بيفكّر؟", "So does it think?"),
        title: u("يبقى الموديل بيفكّر؟", "So does the model think?"),
        story: [u("القصة كلها مرحلتين. التدريب حصل قبل كده ومرة واحدة: تخمين، وقياس الخطأ، وتعديل المفاتيح، مليارات المرات. والرد بيحصل دلوقتي في كل مرة: كلامك يتقطّع توكنز، ويتحط على خريطة المعاني، ويعدّي على طبقات الانتباه، ويطلع أرجح توكن جاي.",
          "The whole story has two stages. Training happened before, once: guessing, measuring the error and adjusting the knobs, billions of times. A reply happens now, every time: your words are cut into tokens, placed on the map of meaning, passed through the attention layers, and the most likely next token comes out."),
        u("ومن اللعبة البسيطة دي طلعت قدرات مبهرة. بس خد بالك: الموديل ما بيشوفش ملفاتك غير لو إديتهاله، وما يعرفش اللي حصل بعد آخر تدريب ليه، وبيبني ردّه على الكلام اللي قدامه. علشان كده جودة كلامك إنت هي نص النتيجة.",
          "Impressive abilities grew out of this simple game. But note: the model can't see your files unless you give them, doesn't know what happened after its last training, and builds its reply on the text in front of it. That's why the quality of your input is half the result.")],
        answer: u("اديله Context واضح، وراجع اللي بيطلّعه. لأن توقّعه بيبقى أدق كل ما الكلام اللي قدامه أوضح.", "Give it clear context and check what it produces — its predictions get better the clearer the text in front of it."),
        idea: u("الموديل مش سحر ولا إنسان؛ هو آلة توقّع قوية، وده بالظبط اللي هتتعلم تشغّله صح في الكورس.", "A model is neither magic nor a person; it's a powerful prediction machine — and this course teaches you to drive it well.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.modelStory]);
})(window.ACADEMY = window.ACADEMY || {});
