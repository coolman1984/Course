/* Inside the model — the story deck that opens the second lesson (f2).
   One hero runs through every slide: the game «إيه الكلمة الجاية؟». Every design decision is told as a consequence of it,
   each with its reason («القرار، وليه؟»): why learn from examples, why next-word prediction, why tokens, why a meaning map,
   why positions, why attention, why layers, how training nudges the weights, why scale, why a tuning stage, how a reply is
   generated, and what that means for the reader. Analogies and numbers are simplified; the steps are what really happens.
   Same slide schema as data/history.js; `year` is the short timeline label, `mark` the big watermark. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.modelStory = {
    id: "model", lesson: "f2",
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
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("يلا نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("إزاي الموديل بيشتغل من جوه، في شرائح", "How a model works inside, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب بصباعك", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "idea", art: "m_idea", year: u("الفكرة", "Idea"), mark: u("٠١", "01"), era: u("قبل أي حاجة", "First things first"),
        title: u("يعني إيه «موديل» أصلًا؟", "What is a “model”, really?"),
        story: [u("البرنامج العادي زي وصفة مكتوبة: مبرمج بيكتب كل قاعدة بإيده، «لو حصل كذا، اعمل كذا». بس جرّب تكتب قواعد لكل جمل اللغة العربية… مستحيل.",
          "Ordinary software is like a written recipe: a programmer writes every rule by hand — “if this happens, do that”. Now try writing rules for every sentence in a language… impossible."),
        u("فالعلما قلبوا الفكرة: بدل ما نكتب القواعد، نبني آلة فيها مليارات «المفاتيح» الصغيرة اللي بتتظبط، ونوريها أمثلة كتير لحد ما المفاتيح تقف في الوضع الصح. الآلة دي بعد ما تتظبط هي اللي بنسميها «موديل».",
          "So scientists flipped the idea: instead of writing the rules, build a machine with billions of small adjustable “knobs” and show it lots of examples until the knobs settle in the right place. Once tuned, that machine is what we call a “model”.")],
        answer: u("ما نكتبش القواعد؛ نسيب الآلة تتعلّمها من الأمثلة. لأن اللغة أكبر وألخبط من إن حد يكتب قواعدها.", "Don't write the rules; let the machine learn them from examples — language is far too big and messy for anyone to write its rules."),
        idea: u("الموديل = ملف ضخم من الأرقام (المفاتيح) + طريقة حساب بتحوّل كلامك لرد.", "A model = a huge file of numbers (the knobs) + a recipe of calculations that turns your words into a reply.")
      },
      {
        id: "game", art: "m_game", year: u("اللعبة", "Game"), mark: u("٠٢", "02"), era: u("طريقة التعليم", "How it learns"),
        title: u("اتعلّم بلعبة واحدة: خمّن الكلمة الجاية", "It learns with one game: guess the next word"),
        story: [u("عشان نظبط المفاتيح دي محتاجين أسئلة وإجاباتها. لو هنستنى ناس تكتب ملايين الأسئلة بإيدها، هناخد قرون.",
          "To tune those knobs we need questions with answers. If we waited for people to write millions of questions by hand, it would take centuries."),
        u("الحل كان عبقري وبسيط: أي جملة مكتوبة في الدنيا هي نفسها سؤال وإجابة. خبّي آخر كلمة في «فنجان قهوة من غير …» وخلّي الموديل يخمّن. الإجابة الصح مكتوبة أصلًا في النص.",
          "The fix was brilliant and simple: any sentence ever written is already a question and its answer. Hide the last word of “a cup of coffee without …” and let the model guess. The right answer is already in the text.")],
        answer: u("نعلّمه بلعبة «الكلمة الجاية». لأنها بتحوّل كل كتاب وموقع ومقال لتمرين ببلاش، فنقدر ندرّبه على كمية كلام مهولة.", "Teach it with the next-word game — it turns every book, site and article into a free exercise, so it can train on an enormous amount of text."),
        idea: u("عشان يكسب اللعبة دي كويس، لازم يفهم اللغة والمعنى وحاجات كتير عن الدنيا. الفهم بييجي كنتيجة جانبية للتخمين الشاطر.", "To win this game well, it has to pick up grammar, meaning and a lot about the world. Understanding arrives as a side effect of guessing well.")
      },
      {
        id: "tokens", art: "m_tokens", year: u("التوكنز", "Tokens"), mark: u("٠٣", "03"), era: u("تقطيع الكلام", "Cutting up text"),
        title: u("ليه بيقطّع الكلام لـ«توكنز»؟", "Why does it cut text into “tokens”?"),
        story: [u("الكمبيوتر ما بيفهمش غير أرقام، فلازم نقطّع الكلام لقطع ونديلها أرقام. طب نقطّع إزاي؟",
          "Computers only understand numbers, so text has to be cut into pieces that get numbers. But cut how?"),
        u("لو حرف حرف: الجملة هتبقى طويلة جدًا، والحرف لوحده ملوش معنى. لو كلمة كلمة: القاموس هيبقى بالملايين، وأي كلمة جديدة أو غلطة إملائية أو «هيكتبولهم» هتبقى لغز.",
          "Letter by letter: sentences become very long, and a single letter means nothing. Word by word: the dictionary runs into millions, and any new word, typo or long compound word becomes a mystery."),
        u("فاختاروا الحل اللي في النص: «توكنز»، قطع متوسطة. الكلمات المشهورة تبقى قطعة واحدة، والنادرة تتكسر لقطع معروفة، زي مكعبات الليجو.",
          "So they chose the middle: “tokens”, medium-sized pieces. Common words stay whole; rare ones break into familiar pieces, like Lego bricks.")],
        answer: u("نقطّع لقطع متوسطة. لأنها بتوازن بين قاموس حجمه معقول وجمل مش طويلة زيادة، ومفيش كلمة تبقى غريبة عليه تمامًا.", "Cut into medium pieces — a balance between a manageable dictionary and sentences that aren't too long, and no word is ever completely unknown."),
        idea: u("عشان كده الأسعار وحدود الطول بتتحسب بالتوكن مش بالكلمة. والكلمة العربية غالبًا بتاخد توكنز أكتر من الإنجليزي.", "That's why prices and length limits are counted in tokens, not words. An Arabic word often takes more tokens than an English one.")
      },
      {
        id: "map", art: "m_map", year: u("الخريطة", "Map"), mark: u("٠٤", "04"), era: u("المعنى بالأرقام", "Meaning as numbers"),
        title: u("كل توكن بقى نقطة على خريطة معاني", "Every token becomes a point on a map of meaning"),
        story: [u("لو أدينا كل توكن رقم مسلسل (قهوة = ٥٠٣، شاي = ٩٨١٢)، الرقم مش هيقول أي حاجة عن المعنى.",
          "If each token just got a serial number (coffee = 503, tea = 9812), the number would say nothing about meaning."),
        u("فبدل رقم واحد، كل توكن بياخد قائمة أرقام كأنها إحداثيات على خريطة كبيرة جدًا. والمفاجأة إن التدريب نفسه بيحرّك الكلمات اللي معناها قريب لحد ما تقرّب من بعض: «قهوة» جنب «شاي»، و«القاهرة» جنب «باريس».",
          "So instead of one number, each token gets a list of numbers — coordinates on a huge map. The surprise: training itself pulls words with similar meanings close together: “coffee” near “tea”, “Cairo” near “Paris”.")],
        answer: u("نحوّل كل كلمة لمكان على خريطة. لأن اللي يتعلمه عن «قهوة» يفيده في «شاي» على طول، من غير ما يحتاج أمثلة لكل كلمة لوحدها.", "Turn every word into a place on a map — what it learns about “coffee” immediately helps with “tea”, without needing examples for every word separately."),
        idea: u("قريب في المعنى = قريب في المكان. ودي أول خطوة عشان الموديل يفهم، مش يحفظ.", "Close in meaning = close on the map. It's the first step from memorising to understanding.")
      },
      {
        id: "order", art: "m_order", year: u("الترتيب", "Order"), mark: u("٠٥", "05"), era: u("مين قبل مين", "Who comes first"),
        title: u("نفس الكلمات… معنى تاني خالص", "Same words… a completely different meaning"),
        story: [u("«الكلب عض الراجل» خبر عادي. «الراجل عض الكلب» خبر في الجرنال! نفس الكلمات بالظبط، بس الترتيب قلب المعنى.",
          "“Dog bites man” is ordinary. “Man bites dog” makes the papers! Exactly the same words — the order flipped the meaning."),
        u("والموديل بيبص على الكلمات كلها مرة واحدة (هنعرف ليه في الشريحة الجاية)، فممكن ينسى مين جه قبل مين. عشان كده بيضيفوا لكل توكن «ختم» صغير بمكانه في الجملة.",
          "And the model looks at all the words at once (the next slide shows why), so it could lose track of who came first. That's why each token gets a small “stamp” with its position in the sentence.")],
        answer: u("نضيف معلومة المكان لكل كلمة. لأن من غيرها الجملة بتبقى شنطة كلمات ملخبطة.", "Add position information to every word — without it, a sentence is just a jumbled bag of words."),
        idea: u("المعنى = الكلمات + ترتيبها. والموديل محتاج الاتنين.", "Meaning = the words + their order. The model needs both.")
      },
      {
        id: "attention", art: "m_attention", year: u("الانتباه", "Attention"), mark: u("٠٦", "06"), era: u("قلب التصميم", "The heart of the design"),
        title: u("الانتباه: كل كلمة بتسأل الباقيين", "Attention: every word asks all the others"),
        story: [u("«سلّمت الملف للمدير عشان هو مستعجل». مين المستعجل؟ إنت عرفت على طول إنه المدير. الموديل بيعمل كده بـ«الانتباه»: كل كلمة بتبص على كل الكلمات التانية وتقرر مين يهمها أكتر، و«هو» بتشد أوي على «المدير».",
          "“The file reached the manager, so he signed.” Who signed? You knew instantly: the manager. The model does this with “attention”: every word looks at every other word and decides which matter most — and “he” pulls hard on “manager”."),
        u("النماذج القديمة كانت بتقرا كلمة ورا كلمة، فتنسى أول الجملة الطويلة وكانت بطيئة. الانتباه بيشوف الكل مرة واحدة، وده كمان بيخلّي كروت الشاشة تحسب آلاف الحاجات في نفس الوقت.",
          "Older models read one word after another, forgot the start of long sentences and were slow. Attention sees everything at once — which also lets graphics chips compute thousands of things in parallel.")],
        answer: u("كل كلمة تبص على كل الكلمات مرة واحدة. لأنه أدق في فهم السياق، وأسرع بكتير في التدريب على أجهزة كتير بالتوازي.", "Let every word look at all the words at once — it follows context better and trains far faster on many chips in parallel."),
        idea: u("ده قلب تصميم «المحوّل» (Transformer) اللي شفناه في حكاية التاريخ سنة ٢٠١٧.", "This is the heart of the Transformer design we met in the history story, in 2017.")
      },
      {
        id: "layers", art: "m_layers", year: u("الطبقات", "Layers"), mark: u("٠٧", "07"), era: u("الفهم بيتعمّق", "Understanding deepens"),
        title: u("طبقة فوق طبقة: من كلام لمقصود", "Layer upon layer: from words to intent"),
        story: [u("خطوة انتباه واحدة مش كفاية. فبيكرروا نفس الوحدة (انتباه + شوية حساب) عشرات المرات، طبقة فوق طبقة.",
          "One round of attention isn't enough. So the same unit (attention + a bit of calculation) is repeated dozens of times, layer upon layer."),
        u("تخيلها زي خط إنتاج في مصنع: كل محطة بتضيف حاجة. الطبقات الأولى بتمسك حاجات بسيطة زي شكل الكلام وقواعده، واللي فوقها بتمسك المعنى، والأعلى بتفهم المقصود من الكلام كله. (ده تبسيط، بس هو الاتجاه العام.)",
          "Picture a factory line: each station adds something. Early layers catch simple things like word forms and grammar, higher ones catch meaning, and the top ones grasp the intent of the whole text. (A simplification, but the general direction.)")],
        answer: u("نكرر وحدة بسيطة كتير بدل ما نصمم حاجة معقدة. لأن الوحدة البسيطة سهل تكبيرها، وكل طبقة بتبني على فهم اللي تحتها.", "Repeat one simple unit many times instead of designing something complicated — a simple unit is easy to scale, and each layer builds on the one below."),
        idea: u("العمق هو اللي بيحوّل «كلمات جنب بعض» لـ«فهم» للجملة كلها.", "Depth is what turns “words side by side” into an understanding of the whole sentence.")
      },
      {
        id: "training", art: "m_training", year: u("التدريب", "Training"), mark: u("٠٨", "08"), era: u("إزاي اتظبط", "How it gets tuned"),
        title: u("التدريب: مليارات الغلطات الصغيرة… وتصحيحها", "Training: billions of small mistakes… each one corrected"),
        story: [u("في الأول المفاتيح كلها عشوائية، فالتخمين بيطلع هبل. الموديل يخمّن الكلمة الجاية، نقارن بالكلمة الصح، ونقيس هو غلط قد إيه.",
          "At first all the knobs are random, so the guesses are nonsense. The model guesses the next word, we compare it with the right word, and measure how wrong it was."),
        u("بعدها بنحرّك كل المفاتيح حركة صغيرة جدًا في الاتجاه اللي يقلل الغلط ده، زي رامي سهام كل مرة يعدّل إيده شعرة. ونكرر ده على تريليونات التوكنز، شهور على آلاف كروت الشاشة.",
          "Then every knob is nudged a tiny bit in the direction that reduces that error — like an archer adjusting their aim a hair each shot. Repeat over trillions of tokens, for months, on thousands of graphics chips.")],
        answer: u("نصلّح غلطة صغيرة كل مرة، مليارات المرات. لأن مفيش حد يقدر يظبط مليارات المفاتيح بإيده، بس الحساب يقدر يعرف كل مفتاح يتحرك فين.", "Fix one small mistake at a time, billions of times — no one could tune billions of knobs by hand, but the math can tell each knob which way to move."),
        idea: u("المعرفة مش متخزّنة كجمل محفوظة؛ هي متوزعة في قيم المفاتيح (الأوزان) اللي اتظبطت بالشكل ده.", "Knowledge isn't stored as memorised sentences; it's spread across the knob values (the weights) tuned this way.")
      },
      {
        id: "scale", art: "m_scale", year: u("الحجم", "Scale"), mark: u("٠٩", "09"), era: u("ليه كبير كده", "Why so big"),
        title: u("ليه بيكبّروه كده؟", "Why make it so big?"),
        story: [u("حوالي سنة ٢٠٢٠، الباحثين لاحظوا قاعدة غريبة: كل ما تكبّر التلاتة سوا، عدد المفاتيح، وكمية الكلام، وقوة الحساب، الموديل يتحسن بشكل ثابت وتقدر تتوقعه.",
          "Around 2020, researchers noticed a striking pattern: grow three things together — the number of knobs, the amount of text and the computing power — and the model improves steadily and predictably."),
        u("ومع الحجم ظهرت قدرات محدش علّمها له مباشرة: يترجم، يلخّص، يكتب كود، يحل مسائل… كلها طالعة من لعبة «الكلمة الجاية».",
          "And with size came abilities nobody taught directly: translating, summarising, writing code, solving problems… all growing out of the next-word game.")],
        answer: u("نكبّر التلاتة مع بعض. لأن التجربة أثبتت إن الحجم الأكبر بيدّي تخمين أدق وقدرات أوسع.", "Grow all three together — experience showed that bigger means more accurate guesses and broader abilities."),
        idea: u("عشان كده بنسمع «٧٠ مليار» و«تريليون» معامل: ده حجم مخزن المعرفة جوه الموديل.", "That's why we hear “70 billion” or “a trillion” parameters: it's the size of the model's knowledge store.")
      },
      {
        id: "tuning", art: "m_tuning", year: u("التهذيب", "Tuning"), mark: u("١٠", "10"), era: u("من حافظ لمساعد", "From parrot to assistant"),
        title: u("من آلة بتكمّل كلام… لمساعد بيفهم طلبك", "From a text-continuing machine… to an assistant that gets your request"),
        story: [u("بعد التدريب الأول، الموديل بيكمّل أي نص وخلاص. تسأله «إزاي أعمل كيكة؟» ممكن يكمّل بـ«إزاي أعمل بسكوت؟ إزاي أعمل…» كأنه صفحة أسئلة على النت.",
          "After the first training, the model simply continues any text. Ask “How do I bake a cake?” and it may carry on with “How do I bake cookies? How do I…” like a page of questions online."),
        u("فبيعملوا مرحلة تانية: يدرّبوه على أمثلة محادثات مكتوبة كويس، وبعدين ناس بتقارن بين ردوده وتختار الأحسن والأأمن، والموديل يتعلّم يميل للنوع ده.",
          "So there's a second stage: train it on well-written example conversations, then people compare its replies and pick the more helpful and safer ones, and the model learns to lean that way.")],
        answer: u("مرحلة تهذيب بعد التدريب الكبير. لأن «يعرف كتير» حاجة، و«يساعدك صح وبأمان» حاجة تانية محتاجة تعليم مخصوص.", "Add a tuning stage after the big training — “knowing a lot” and “helping you well and safely” are different skills that need their own teaching."),
        idea: u("التدريب الكبير بيدّيه المعرفة؛ التهذيب بيدّيه الأسلوب والأدب والحدود.", "The big training gives it knowledge; tuning gives it manners, style and limits.")
      },
      {
        id: "reply", art: "m_reply", year: u("الرد", "Reply"), mark: u("١١", "11"), era: u("لما بتكلّمه", "When you talk to it"),
        title: u("إزاي بيكتب ردّه عليك؟", "How does it write its reply?"),
        story: [u("كلامك بيتقطّع توكنز، ويعدّي على كل الطبقات، وفي الآخر الموديل يطلّع قائمة احتمالات للتوكن الجاي: «صباح» ٤٥٪، «أهلًا» ٣٠٪، …",
          "Your words are cut into tokens and pass through every layer, and at the end the model produces a list of chances for the next token: “Good” 45%, “Hello” 30%, …"),
        u("يختار واحد، يضيفه للكلام، ويعيد اللفة كلها عشان التوكن اللي بعده، توكن ورا توكن لحد ما الرد يخلص. وفيه إعداد اسمه «درجة الحرارة»: لو قليلة يختار الأرجح، ولو عالية يجرّب اختيارات أجرأ.",
          "It picks one, adds it to the text and runs the whole loop again for the next token — token after token until the reply is done. A setting called “temperature” decides how bold it is: low picks the most likely, high tries more daring choices.")],
        answer: u("يولّد توكن ورا توكن، وكل توكن مبني على اللي قبله. لأن دي نفس اللعبة اللي اتدرّب عليها بالظبط.", "Generate one token after another, each built on the ones before — it's exactly the game it was trained on."),
        idea: u("عشان كده ممكن يكتب حاجة شكلها مقنع وهي غلط: هو بيختار الأرجح، مش بيراجع الحقيقة. ودي نفس فكرة الدرس اللي فات.", "That's why it can write something convincing that is wrong: it picks the most likely, it doesn't check the facts — the point of the previous lesson.")
      },
      {
        id: "recap", art: "m_recap", year: u("الخلاصة", "Recap"), mark: u("١٢", "12"), era: u("يبقى بيفكّر؟", "So does it think?"),
        title: u("يبقى الموديل بيفكّر؟", "So does the model think?"),
        story: [u("اللي جوه الموديل: كلام اتقطّع توكنز، واتحط على خريطة معاني، وعدّى على طبقات انتباه كتير، وطلّع أرجح كلمة جاية. ومن اللعبة البسيطة دي طلعت قدرات مبهرة.",
          "Inside the model: text cut into tokens, placed on a map of meaning, passed through many layers of attention, producing the most likely next word. Out of that simple game came remarkable abilities."),
        u("بس خد بالك: هو ما بيشوفش ملفاتك غير لو إديتهاله، وما يعرفش اللي حصل بعد آخر تدريب ليه، وبيبني ردّه على الكلام اللي قدامه. عشان كده جودة كلامك إنت هي نص النتيجة.",
          "But note: it can't see your files unless you give them, doesn't know what happened after its last training, and builds its reply on the text in front of it. That's why the quality of your input is half the result.")],
        answer: u("اديله سياق واضح وراجع اللي بيطلّعه. لأن تخمينه بيبقى أدق كل ما الكلام اللي قدامه أوضح.", "Give it clear context and check what it produces — its guesses get better the clearer the text in front of it."),
        idea: u("الموديل مش سحر ولا إنسان؛ هو آلة توقّع جبّارة. وده بالظبط اللي هتتعلم تشغّله صح في الكورس.", "A model is neither magic nor a person; it's a powerful prediction machine — and this course teaches you to drive it well.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.modelStory]);
})(window.ACADEMY = window.ACADEMY || {});
