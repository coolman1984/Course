/* The story of AI, from Turing's question to today's agents — the opening deck of the first lesson (f1).
   One hero runs through every slide: the question «هي الآلة تقدر تفكر؟» and the answer each era gave it.
   Dates, names and events are real; the drawings are illustrations, not photographs.
   Each slide: year label, era, title, story (short paragraphs), answer (that era's reply to the question), idea (the takeaway), art (drawing key). */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.aiHistory = {
    id: "history", lesson: "f1",
    kicker: u("قبل ما نبدأ · الحكاية كلها في ٥ دقايق", "Before we start · the whole story in 5 minutes"),
    title: u("حكاية الذكاء الاصطناعي: من سؤال… لزميل شغل", "The story of AI: from a question… to a coworker"),
    lead: u("سؤال واحد عمره أكتر من ٧٥ سنة: «هي الآلة تقدر تفكر؟». تعالى نشوف كل جيل جاوب عليه إزاي، لحد ما وصل لإيدك النهاردة.",
      "One question, more than 75 years old: “Can machines think?” Let's see how each generation answered it, all the way to the tool in your hands today."),
    answerLabel: u("إجابة الجيل ده", "This era's answer"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("هي الآلة تقدر تفكر؟", "Can machines think?"),
    finalQuestion: u("إنت هتشتغل معاها إزاي؟", "How will you work with it?"),
    note: u("التواريخ والأسماء حقيقية. الرسومات توضيحية.", "Dates and names are real. Drawings are illustrations."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نبدأ الدرس", "Start the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خط الزمن", "Timeline"),
      deck: u("حكاية الذكاء الاصطناعي في شرائح", "The story of AI in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "turing", art: "turing", year: u("١٩٥٠", "1950"), era: u("البداية: سؤال", "It starts with a question"),
        title: u("آلان تورينج بيسأل: هي الآلة تقدر تفكر؟", "Alan Turing asks: can machines think?"),
        story: [u("سنة ١٩٥٠، العالِم الإنجليزي آلان تورينج كتب ورقة بحثية وسأل السؤال اللي هنمشي وراه طول الحكاية.",
          "In 1950, the English mathematician Alan Turing wrote a paper and asked the question this whole story follows."),
        u("واقترح لعبة: إنت بتكلّم حد من ورا ستارة، بالكتابة بس. لو مش قادر تفرّق هو إنسان ولا آلة، يبقى الآلة نجحت.",
          "He proposed a game: you chat with someone behind a curtain, in writing only. If you can't tell whether it's a person or a machine, the machine passes.")],
        answer: u("سؤال مفتوح… لسه ما حدش يعرف", "An open question… nobody knows yet"),
        idea: u("الذكاء اتقاس من الأول بالنتيجة اللي إنت شايفها، مش باللي جوّا الصندوق.", "From day one, intelligence was judged by the result you see, not by what is inside the box.")
      },
      {
        id: "dartmouth", art: "dartmouth", year: u("١٩٥٦", "1956"), era: u("الاسم بيتولد", "The name is born"),
        title: u("صيف دارتموث: الفكرة بقى ليها اسم", "The Dartmouth summer: the idea gets a name"),
        story: [u("سنة ١٩٥٦، مجموعة علماء اتجمعوا في ورشة صيفية في جامعة دارتموث بأمريكا.",
          "In 1956, a group of scientists gathered for a summer workshop at Dartmouth College in the US."),
        u("الاسم اللي اقترحه جون مكارثي للورشة، «الذكاء الاصطناعي»، فضل معانا لحد النهاردة. وكانوا متفائلين جدًا: فاكرين إن خطوة كبيرة هتتعمل في صيف واحد!",
          "The name John McCarthy proposed for it, “artificial intelligence”, is still with us today. They were very optimistic: they expected a big step forward in a single summer!")],
        answer: u("أكيد! وفي صيف واحد كمان", "Of course! In one summer, even"),
        idea: u("الحماس لوحده ما بيكفيش؛ أصعب حاجة كانت لسه جاية.", "Enthusiasm alone isn't enough; the hardest part was still ahead.")
      },
      {
        id: "perceptron", art: "perceptron", year: u("١٩٥٨", "1958"), era: u("الآلة بتتعلّم من الأمثلة", "Machines learn from examples"),
        title: u("البيرسبترون: أول آلة بتتعلّم من غلطها", "The perceptron: a machine that learns from its mistakes"),
        story: [u("سنة ١٩٥٨، فرانك روزنبلات عرض «البيرسبترون»: آلة مستوحاة من الخلية العصبية في المخ.",
          "In 1958, Frank Rosenblatt unveiled the “perceptron”, a machine inspired by the neuron in the brain."),
        u("بدل ما حد يكتبلها القواعد، بتوريها أمثلة. كل ما تغلط، تعدّل «أوزانها» شوية، لحد ما تصح.",
          "Instead of someone writing its rules, you show it examples. Each time it gets one wrong, it nudges its “weights” a little, until it gets it right.")],
        answer: u("تقدر تتعلّم… حاجات بسيطة", "It can learn… simple things"),
        idea: u("دي البذرة اللي طلع منها كل الذكاء الاصطناعي اللي بتستخدمه النهاردة: التعلّم من البيانات.", "This is the seed of every AI you use today: learning from data.")
      },
      {
        id: "eliza", art: "eliza", year: u("١٩٦٦", "1966"), era: u("أول دردشة", "The first chat"),
        title: u("إليزا: أول برنامج بيدردش", "ELIZA: the first program you could chat with"),
        story: [u("سنة ١٩٦٦، جوزيف وايزنباوم في جامعة MIT عمل «إليزا»: برنامج بيرد عليك كأنه معالج نفسي.",
          "In 1966, Joseph Weizenbaum at MIT built ELIZA, a program that replied like a therapist."),
        u("المدهش إنه كان بيعيد ترتيب الكلمات بقواعد بسيطة، ومع كده ناس كتير حسّت إنه فاهمهم فعلًا.",
          "The surprise: it only shuffled your words with simple rules, yet many people felt it truly understood them.")],
        answer: u("تقدر تقلّد الكلام", "It can imitate conversation"),
        idea: u("إن الكلام يبان ذكي حاجة، وإن البرنامج يفهم فعلًا حاجة تانية خالص.", "Sounding smart and actually understanding are two very different things.")
      },
      {
        id: "winter", art: "winter", year: u("١٩٧٤ – ١٩٩٣", "1974 – 1993"), era: u("الشتا", "The winters"),
        title: u("قواعد مكتوبة بالإيد… وشتا طويل", "Hand-written rules… and a long winter"),
        story: [u("الوعود كانت أكبر من الأجهزة، فالتمويل اتقلّص بشدة مرتين، وجه اللي اتسمّى «شتا الذكاء الاصطناعي».",
          "The promises outran the hardware, so funding dried up twice, in what became known as the “AI winters”."),
        u("وفي النص، في التمانينات، الشركات جرّبت «الأنظمة الخبيرة»: آلاف القواعد من نوع «لو حصل كذا، اعمل كذا» بيكتبها خبراء بإيدهم. نفعت شوية، بس كانت بتتكسر أول ما تقابل حالة جديدة.",
          "In between, in the 1980s, companies tried “expert systems”: thousands of “if this, then that” rules written by hand by experts. They helped a bit, but broke the moment they met a new case.")],
        answer: u("لسه بدري…", "Not yet…"),
        idea: u("القواعد المكتوبة بالإيد ما بتكبرش مع الدنيا؛ التعلّم من البيانات بيكبر.", "Hand-written rules don't scale with the world; learning from data does.")
      },
      {
        id: "deepblue", art: "deepblue", year: u("١٩٩٧", "1997"), era: u("الآلة بتكسب البطل", "The machine beats the champion"),
        title: u("ديب بلو بيكسب كاسباروف في الشطرنج", "Deep Blue beats Kasparov at chess"),
        story: [u("سنة ١٩٩٧، كمبيوتر من IBM اسمه «ديب بلو» كسب بطل العالم جاري كاسباروف في ماتش شطرنج كامل.",
          "In 1997, an IBM computer called Deep Blue beat world champion Garry Kasparov in a full chess match."),
        u("بس خد بالك: ديب بلو ما كانش بيتعلّم زينا؛ كان بيحسب ملايين النقلات في الثانية بقوة الحساب وبس.",
          "But notice: Deep Blue didn't learn the way we do; it raced through millions of moves per second by sheer calculation.")],
        answer: u("في الشطرنج… أيوه", "At chess… yes"),
        idea: u("الآلة ممكن تتفوّق في مهمة واحدة محددة جدًا، من غير ما تبقى «ذكية» في أي حاجة تانية.", "A machine can excel at one narrow task without being “smart” at anything else.")
      },
      {
        id: "deeplearning", art: "deeplearning", year: u("٢٠١٢", "2012"), era: u("التعلّم العميق بيصحى", "Deep learning wakes up"),
        title: u("صور كتير، وبيانات أكتر، وكروت شاشة سريعة", "Lots of images, more data, fast graphics chips"),
        story: [u("الإنترنت ملا الدنيا صور وبيانات، وكروت الشاشة (GPU) بقت تحسب بسرعة كبيرة جدًا.",
          "The internet filled the world with images and data, and graphics chips (GPUs) became incredibly fast at math."),
        u("سنة ٢٠١٢، شبكة عصبية عميقة اسمها AlexNet كسبت مسابقة التعرّف على الصور (ImageNet) بفرق كبير. فكرة البيرسبترون القديمة رجعت… بس بطبقات كتير وبيانات ضخمة.",
          "In 2012, a deep neural network called AlexNet won the ImageNet image-recognition contest by a wide margin. The old perceptron idea was back… with many layers and huge data.")],
        answer: u("تقدر تشوف وتميّز", "It can see and recognise"),
        idea: u("بيانات كتير + حساب سريع = الآلة بقت تتعلّم حاجات ما حدش يقدر يكتب قواعدها.", "Lots of data + fast computing = machines learning things no one could write rules for.")
      },
      {
        id: "alphago", art: "alphago", year: u("٢٠١٦", "2016"), era: u("الحدس", "Intuition"),
        title: u("ألفاجو والنقلة ٣٧", "AlphaGo and move 37"),
        story: [u("لعبة «جو» الصينية فيها احتمالات أكتر بكتير من إنك تحسبها بالقوة زي الشطرنج.",
          "The board game Go has far too many possibilities to brute-force the way chess was."),
        u("سنة ٢٠١٦، ألفاجو من DeepMind كسب البطل لي سيدول ٤–١، وعمل نقلة (النقلة ٣٧) الخبراء افتكروها غلطة… وطلعت عبقرية.",
          "In 2016, DeepMind's AlphaGo beat champion Lee Sedol 4–1, and played a move (move 37) that experts took for a mistake… and turned out to be brilliant.")],
        answer: u("تقدر تفاجئنا", "It can surprise us"),
        idea: u("لما الآلة تتعلّم من ملايين التجارب، ممكن تلاقي حلول إحنا ما فكرناش فيها.", "When a machine learns from millions of games, it can find answers we never thought of.")
      },
      {
        id: "transformer", art: "transformer", year: u("٢٠١٧", "2017"), era: u("الانتباه", "Attention"),
        title: u("المحوّل: «الانتباه هو كل اللي تحتاجه»", "The Transformer: “Attention is all you need”"),
        story: [u("سنة ٢٠١٧، باحثين في جوجل نشروا ورقة اسمها «Attention Is All You Need»، وقدّموا تصميم اسمه «المحوّل» (Transformer).",
          "In 2017, researchers at Google published “Attention Is All You Need” and introduced a design called the Transformer."),
        u("الفكرة: النموذج يبص على كل الكلمات مرة واحدة، ويقرر كل كلمة محتاجة «تنتبه» لأنهي كلمة تانية عشان تفهم معناها.",
          "The idea: the model looks at all the words at once and decides which other words each word should “pay attention” to, to work out its meaning.")],
        answer: u("تقدر تفهم الـ Context", "It can follow context"),
        idea: u("ده المحرّك اللي جوّا ChatGPT وClaude وGemini وكل المساعدين اللي هتقابلهم في الكورس.", "This is the engine inside ChatGPT, Claude, Gemini and every assistant you'll meet in this course.")
      },
      {
        id: "chatgpt", art: "chatgpt", year: u("٢٠٢٢", "2022"), era: u("الدنيا كلها بتجرّب", "Everyone tries it"),
        title: u("ChatGPT: الذكاء الاصطناعي بقى في إيد الكل", "ChatGPT: AI in everyone's hands"),
        story: [u("في ٣٠ نوفمبر ٢٠٢٢، شركة OpenAI نزّلت ChatGPT للناس. لأول مرة أي حد يقدر يكلّم نموذج لغة كبير، بالعربي أو بالإنجليزي، من غير ولا سطر كود.",
          "On 30 November 2022, OpenAI released ChatGPT to the public. For the first time, anyone could talk to a large language model, in Arabic or English, without a line of code."),
        u("وفي ٥ أيام بس، عدّى مليون مستخدم.", "In just 5 days, it passed one million users.")],
        answer: u("تقدر تكلّمك", "It can talk with you"),
        idea: u("النقلة الحقيقية ما كانتش في الفكرة بس؛ كانت إن أي حد بقى يقدر يستخدمها.", "The real leap wasn't only the idea; it was that anyone could now use it.")
      },
      {
        id: "today", art: "today", year: u("النهاردة", "Today"), era: u("من المساعد للوكيل", "From assistant to agent"),
        title: u("من نموذج بيرد… لزميل بيشتغل معاك", "From a model that replies… to a coworker"),
        story: [u("بعدها كل حاجة اتسارعت: نماذج زي Claude وGPT وGemini بقت تقرا ملفات طويلة، وتشوف الصور، وتكتب كود.",
          "Then everything sped up: models like Claude, GPT and Gemini learned to read long files, look at images and write code."),
        u("ودلوقتي «الوكلاء» بقوا ينفّذوا مهام كاملة بأدوات حقيقية: يقروا الإيميل، يحدّثوا الشيت، يجهّزوا التقرير… وإنت تراجع وتوافق.",
          "Now “agents” carry out whole tasks with real tools: read the email, update the sheet, draft the report… while you review and approve.")],
        answer: u("تقدر تشتغل معاك", "It can work with you"),
        idea: u("السؤال اتغيّر: مش «هي الآلة تقدر تفكر؟»… بقى «إنت هتشتغل معاها إزاي؟». وده بالظبط اللي الكورس ده معمول عشانه.",
          "The question has changed: not “can machines think?” but “how will you work with them?” That is exactly what this course is for.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.aiHistory]);
})(window.ACADEMY = window.ACADEMY || {});
