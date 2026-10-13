/* Scene definitions. Coordinates are authored left-to-right on a 960×500 canvas and mirrored automatically for Arabic.
   Steps accumulate visible nodes (show/add); hl = highlight, dim, flow = animated links, view = zoom box [x,y,w,h]. */
(function () {
  const L = (ar, en) => ({ ar, en });
  const S = ACAD.scenes;
  const N = (id, x, y, w, h, ico, ar, en, more) => Object.assign({ id, x, y, w, h, ico, label: L(ar, en) }, more || {});
  const I = (ar, en) => L(ar, en);

  /* ---------- U0 ---------- */
  S["model-flow"] = {
    icon: "🔮", kind: "flow", lesson: "u0-model", pages: [2, 34, 6], src: "add",
    title: L("رحلة طلبك داخل النموذج", "Your request’s journey through the model"),
    lead: L("من الكلمات إلى الأرقام إلى الاحتمالات، ثم الإجابة كلمة بعد كلمة.", "From words to numbers to probabilities, then the answer word by word."),
    nodes: [
      N("you", 20, 205, 150, 86, "🙋", "طلبك + السياق", "Your request + context", { info: I("كل ما تكتبه وكل ما ترفقه من ملفات ورسائل سابقة. هذا هو «السياق» الذي يوجّه الإجابة {p6}.", "Everything you type plus attached files and earlier messages. This is the “context” that steers the answer {p6}.") }),
      N("tokens", 200, 205, 150, 86, "✂️", "توكنات", "Tokens", { sub: I("قطع نص ← أرقام", "text pieces → numbers"), info: I("النص يُقطّع إلى قطع صغيرة (كلمة أو جزء منها) وكل قطعة تتحول إلى رقم {p34}. العربية تُقطّع غالبًا إلى قطع أكثر.", "Text is cut into small pieces (a word or part of one), each turned into a number {p34}. Arabic usually splits into more pieces.") }),
      N("data", 380, 20, 200, 64, "📚", "بيانات التدريب", "Training data", { info: I("نصوص ضخمة تعلّم منها النموذج قبل أن تستخدمه. التدريب انتهى؛ النموذج لا يتعلم من محادثتك الحالية.", "Huge text the model learned from before you use it. Training is over; the model doesn’t learn from your current chat.") }),
      N("model", 380, 150, 200, 200, "🧠", "النموذج", "The model", { sub: I("مليارات المعاملات", "billions of parameters"), info: I("ملف ضخم من الأرقام (المعاملات/الأوزان). هذه الأرقام هي «مخزن المعرفة» {p34}.", "A huge file of numbers (parameters/weights). These numbers are the “store of knowledge” {p34}.") }),
      N("w1", 398, 268, 46, 46, "", "0.82", "0.82", { shape: "circle", size: 12 }),
      N("w2", 457, 268, 46, 46, "", "-1.3", "-1.3", { shape: "circle", size: 12 }),
      N("w3", 516, 268, 46, 46, "", "0.07", "0.07", { shape: "circle", size: 12 }),
      N("probs", 620, 110, 160, 90, "📊", "احتمالات التوكن التالي", "Next-token probabilities", { info: I("لكل توكن ممكن احتمال. مثلًا بعد «تقرير»: «المبيعات» ٤٠٪، «شهري» ٢٥٪، «جديد» ١٠٪…", "Every possible token gets a probability. After “sales”: “report” 40%, “team” 25%, “fell” 10%…") }),
      N("pick", 620, 300, 160, 90, "🎯", "اختيار توكن", "Pick a token", { sub: I("حسب «درجة الحرارة»", "depends on “temperature”"), info: I("يُختار توكن واحد. حرارة منخفضة = الأعلى احتمالًا غالبًا، وحرارة عالية = تنوع أكثر.", "One token is chosen. Low temperature = usually the most likely; high temperature = more variety.") }),
      N("answer", 810, 205, 140, 86, "💬", "الإجابة", "The answer", { sub: I("كلمة بعد كلمة", "word by word") }),
    ],
    links: [{ from: "you", to: "tokens" }, { from: "tokens", to: "model" }, { from: "data", to: "model", label: I("التدريب (قبل)", "training (before)") }, { from: "model", to: "probs" }, { from: "probs", to: "pick" }, { from: "pick", to: "tokens", curve: 0.32, label: I("يُضاف ويتكرر", "appended & repeated") }, { from: "pick", to: "answer" }],
    steps: [
      { t: I("طلبك يدخل", "Your request goes in"), c: I("كل شيء يبدأ بما تعطيه: البرومبت والسياق معًا {p6}. اضغط على أي مربع لشرحه.", "It all starts with what you give: prompt and context together {p6}. Click any box for an explanation."), show: ["you"], hl: ["you"] },
      { t: I("تقطيع إلى توكنات", "Cut into tokens"), c: I("النص يتحول إلى قطع صغيرة، وكل قطعة إلى رقم. الحاسوب لا يقرأ الكلمات، بل الأرقام.", "Text becomes small pieces, each piece a number. The computer reads numbers, not words."), add: ["tokens"], hl: ["tokens"], flow: ["you>tokens"] },
      { t: I("قبل ذلك بكثير: التدريب", "Long before: training"), c: I("النموذج تعلّم من نصوص ضخمة بتوقّع الكلمة التالية وتصحيح نفسه مليارات المرات. هكذا تكوّنت معاملاته.", "The model learned from huge text by predicting the next word and correcting itself billions of times. That’s how its parameters formed."), add: ["data", "model"], hl: ["data"], flow: ["data>model"], hideLinks: ["tokens>model"] },
      { t: I("تكبير: داخل النموذج", "Zoom in: inside the model"), c: I("المعرفة ليست جملًا محفوظة، بل **أرقام** (أوزان) موزعة. لا يوجد «درج» فيه الإجابة {p34}.", "Knowledge isn’t stored sentences but **numbers** (weights) spread throughout. There’s no “drawer” holding the answer {p34}."), add: ["w1", "w2", "w3"], hl: ["w1", "w2", "w3"], view: [350, 120, 260, 260], dur: 4600 },
      { t: I("حساب الاحتمالات", "Computing probabilities"), c: I("توكنات طلبك تمر عبر الأوزان، والناتج احتمال لكل توكن ممكن أن يأتي بعده.", "Your tokens pass through the weights; the result is a probability for every token that could come next."), add: ["probs"], hl: ["probs"], flow: ["tokens>model", "model>probs"] },
      { t: I("اختيار… ثم تكرار", "Pick… then repeat"), c: I("يُختار توكن، ويُضاف إلى النص، ثم يُعاد الحساب كله للتوكن الذي بعده. هذه الحلقة تتكرر مئات المرات في إجابة واحدة.", "A token is chosen, appended to the text, then everything is recomputed for the next token. This loop runs hundreds of times per answer."), add: ["pick"], hl: ["pick"], flow: ["probs>pick", "pick>tokens"], dur: 4600 },
      { t: I("الإجابة تكتمل", "The answer completes"), c: I("الإجابة النهائية سلسلة اختيارات «محتملة». لذلك قد تكون طليقة وخاطئة في الوقت نفسه، وتحتاج مراجعتك {p41}.", "The final answer is a chain of “likely” choices. So it can be fluent and wrong at once, and needs your review {p41}."), add: ["answer"], hl: ["answer"], flow: ["pick>answer"] },
    ],
    predict: { at: 6, q: I("بعد اختيار أول كلمة، ماذا يحدث؟", "After the first word is chosen, what happens?"), opts: [I("تنتهي الإجابة", "The answer ends"), I("تُضاف الكلمة ويُعاد الحساب للكلمة التالية", "The word is appended and the next word is computed"), I("يبحث النموذج في الإنترنت", "The model searches the internet")], a: 1, why: I("التوليد حلقة: كل توكن جديد يصبح جزءًا من المدخل لحساب التالي.", "Generation is a loop: each new token joins the input for computing the next.") },
  };

  S.journey = {
    icon: "🪜", kind: "build", lesson: "u0-journey", pages: [4], src: "book",
    title: L("سلم المستويات الثمانية", "The eight-level ladder"), lead: L("كل درجة تبني على التي قبلها.", "Each step builds on the one before."),
    nodes: [
      N("l1", 20, 410, 106, 72, "🙋", "مساعد شخصي", "Assistant", { info: I("أسأل، أكتب، ألخص، وأبحث أسرع {p4}.", "Ask, write, summarise, research faster {p4}.") }),
      N("l2", 136, 360, 106, 72, "🧠", "عقل ثانٍ", "Second brain", { info: I("أحفظ المعرفة والسياق وأتوقف عن البدء من الصفر {p4}.", "Keep knowledge and context; stop starting from zero {p4}.") }),
      N("l3", 252, 310, 106, 72, "🧾", "موظف رقمي", "Digital employee", { info: I("أكلّفه بمهام كاملة مثل التحليل والمراجعة وإعداد النتائج {p4}.", "Give it whole tasks like analysis, review and preparing results {p4}.") }),
      N("l4", 368, 260, 106, 72, "⚙️", "أتمتة", "Automation", { info: I("أحوّل الخطوات المتكررة إلى عمليات تعمل تلقائيًا {p4}.", "Turn repeated steps into automatic processes {p4}.") }),
      N("l5", 484, 210, 106, 72, "🔧", "أداة", "Tool", { info: I("أبني حلًا بسيطًا يمكن استخدامه بسهولة {p4}.", "Build a simple, easy-to-use solution {p4}.") }),
      N("l6", 600, 160, 106, 72, "🧩", "تطبيق", "Application", { info: I("أحوّل الأداة إلى تطبيق عملي يخدم العمل الحقيقي {p4}.", "Turn the tool into a practical application for real work {p4}.") }),
      N("l7", 716, 110, 106, 72, "🗄️", "نظام", "System", { info: I("أربط العمليات والبيانات في منظومة متكاملة {p4}.", "Link processes and data into one system {p4}.") }),
      N("l8", 832, 60, 112, 72, "👥", "فريق رقمي", "Digital team", { info: I("أنسق بين عدة حلول ووكلاء لتحقيق نتائج أكبر {p4}.", "Coordinate several solutions and agents for bigger results {p4}.") }),
      N("start", 20, 40, 300, 70, "💬", "«أنا أعرف أستخدم الذكاء الاصطناعي»", "“I can use AI”", { fill: "var(--surface-3)" }),
      N("end", 500, 420, 440, 64, "🏁", "«عندي مشكلة، وأعرف كيف أحولها إلى نظام ذكي»", "“I have a problem and I know how to turn it into a smart system”", { fill: "var(--ok-soft)" }),
    ],
    links: [{ from: "l1", to: "l2" }, { from: "l2", to: "l3" }, { from: "l3", to: "l4" }, { from: "l4", to: "l5" }, { from: "l5", to: "l6" }, { from: "l6", to: "l7" }, { from: "l7", to: "l8" }],
    steps: [
      { t: I("نقطة البداية", "The starting point"), c: I("معظمنا يبدأ هنا: نستخدم الذكاء الاصطناعي كمساعد يجيب الأسئلة.", "Most of us start here: using AI as an assistant that answers questions."), show: ["start", "l1"], hl: ["l1"] },
      { t: I("عقل ثانٍ", "Second brain"), c: I("بدل أن تشرح كل شيء من جديد، تجمع معرفتك في مكان واحد يمكن سؤاله.", "Instead of re-explaining everything, you gather your knowledge in one queryable place."), add: ["l2"], hl: ["l2"] },
      { t: I("موظف رقمي", "Digital employee"), c: I("لا تطلب جملة، بل مهمة كاملة بنتيجة قابلة للتنفيذ.", "You no longer ask for a sentence but for a whole task with an actionable result."), add: ["l3"], hl: ["l3"] },
      { t: I("أتمتة ثم أداة", "Automation, then a tool"), c: I("الخطوات المتكررة تعمل وحدها، ثم تُغلَّف في أداة يستخدمها غيرك.", "Repeated steps run by themselves, then get packaged into a tool others can use."), add: ["l4", "l5"], hl: ["l4", "l5"] },
      { t: I("تطبيق", "Application"), c: I("الأداة تصبح برنامجًا يُفتح بنقرة ويخدم العمل الحقيقي.", "The tool becomes a one-click program serving real work."), add: ["l6"], hl: ["l6"] },
      { t: I("نظام", "System"), c: I("الأدوات تُربط ببعضها فتنتقل البيانات بينها بلا وسيط بشري.", "Tools are linked so data flows between them with no human courier."), add: ["l7"], hl: ["l7"] },
      { t: I("فريق رقمي", "Digital team"), c: I("وكلاء متخصصون يعملون معًا، وأنت تراجع وتقرر.", "Specialised agents work together while you review and decide."), add: ["l8"], hl: ["l8"] },
      { t: I("نقطة الوصول", "The destination"), c: I("الهدف ليس استخدام الأدوات، بل أن تصبح قادرًا على بناء أثر حقيقي في عملك وإدارتك {p4}.", "The aim isn’t using tools but becoming able to build real impact in your work and department {p4}."), add: ["end"], hl: ["end", "l8"], dim: ["start"] },
    ],
  };

  S["data-decision"] = {
    icon: "🔁", kind: "cause", lesson: "u0-capabilities", pages: [5], src: "book",
    title: L("من البيانات إلى القرار", "From data to decision"), lead: L("غيّر جودة البيانات والسياق وشاهد قيمة التوصية تتغير.", "Change data and context quality and watch the recommendation’s value change."),
    nodes: [
      N("in", 20, 205, 120, 86, "🗂️", "بياناتك", "Your data", { info: I("ملفات وتقارير وجداول. جودتها تحدد ما يأتي بعدها كله.", "Files, reports and tables. Their quality shapes everything after.") }),
      N("c1", 170, 205, 115, 86, "👥", "يجمع", "Collect"), N("c2", 305, 205, 115, 86, "⚙️", "يحلل", "Analyse"), N("c3", 440, 205, 115, 86, "🗜️", "يختصر", "Condense"), N("c4", 575, 205, 115, 86, "📊", "يقارن", "Compare"),
      N("c5", 710, 205, 115, 86, "📝", "يقترح", "Suggest", { info: I("الاقتراح يُبنى على كل ما قبله. خطأ في البيانات يظهر هنا كتوصية مقنعة وخاطئة.", "The suggestion rests on everything before it. A data error shows up here as a convincing but wrong recommendation.") }),
      N("human", 845, 205, 100, 86, "🧑‍⚖️", "قرارك", "Your call", { info: I("الذكاء الاصطناعي يدعم القرار ولا يتحمل مسؤوليته {p41}.", "AI supports the decision but doesn’t carry its responsibility {p41}.") }),
      N("ctx", 305, 60, 250, 64, "🧭", "السياق: الهدف والجمهور والقيود", "Context: goal, audience, limits"),
    ],
    links: [{ from: "in", to: "c1" }, { from: "c1", to: "c2" }, { from: "c2", to: "c3" }, { from: "c3", to: "c4" }, { from: "c4", to: "c5" }, { from: "c5", to: "human" }, { from: "ctx", to: "c2" }, { from: "ctx", to: "c4" }],
    steps: [
      { t: I("البيانات تدخل", "Data comes in"), c: I("كل شيء يبدأ من بياناتك. الذكاء الاصطناعي لا يرى إلا ما وصله.", "Everything starts from your data. AI sees only what reaches it."), show: ["in", "c1"], hl: ["in"], flow: ["in>c1"] },
      { t: I("يحلل ويختصر", "Analyse and condense"), c: I("يبحث عن الأنماط والأرقام غير الطبيعية، ثم يحوّل الكثير إلى القليل المهم.", "It looks for patterns and abnormal numbers, then turns a lot into the little that matters."), add: ["c2", "c3"], hl: ["c2", "c3"], flow: ["c1>c2", "c2>c3"] },
      { t: I("يقارن ويقترح", "Compare and suggest"), c: I("يضع الخيارات جنبًا إلى جنب ويقدم توصية.", "It puts options side by side and offers a recommendation."), add: ["c4", "c5"], hl: ["c4", "c5"], flow: ["c3>c4", "c4>c5"] },
      { t: I("السياق يوجّه", "Context steers"), c: I("السياق (الهدف والجمهور والقيود) يحدد ماذا يعني «مهم» في التحليل والمقارنة.", "Context (goal, audience, limits) defines what “important” means in analysis and comparison."), add: ["ctx"], hl: ["ctx"], flow: ["ctx>c2", "ctx>c4"] },
      { t: I("القرار لك", "The decision is yours"), c: I("جرّب الأدوات أسفل المشهد: كلما زادت جودة البيانات والسياق زادت قيمة النتيجة {p5}.", "Try the controls below: better data and context mean a more valuable result {p5}."), add: ["human"], hl: ["human"], flow: ["c5>human"] },
    ],
    interact(api) {
      const App = ACAD.App, h = App.h, T = (a, e) => (App.isAr() ? a : e);
      let q = 80, ctx = true;
      const out = h("b", { "aria-live": "polite" });
      const upd = () => {
        const score = q * (ctx ? 1 : 0.6);
        const cls = score >= 70 ? "good" : score >= 40 ? "warn" : "bad";
        api.setClass("c5", cls); api.setClass("in", q >= 70 ? "good" : q >= 40 ? "warn" : "bad");
        api.setSub("c5", score >= 70 ? T("موثوقة", "reliable") : score >= 40 ? T("مشكوك فيها", "doubtful") : T("مضللة", "misleading"));
        out.textContent = T("قيمة التوصية: ", "Recommendation value: ") + Math.round(score) + "%";
      };
      const panel = h("div", { class: "row", style: { width: "100%" } },
        h("label", { class: "field", style: { flex: 1, minWidth: "200px", margin: 0 } }, h("span", { class: "lbl", style: { fontWeight: 800, fontSize: "13px" } }, T("جودة البيانات", "Data quality")), h("input", { type: "range", min: 0, max: 100, value: q, oninput: (e) => { q = +e.target.value; upd(); } })),
        h("label", { class: "check" }, h("input", { type: "checkbox", checked: ctx, onchange: (e) => { ctx = e.target.checked; upd(); } }), T("سياق واضح", "Clear context")), out);
      setTimeout(upd, 0);
      return panel;
    },
  };

  S["chat-agent"] = {
    icon: "🤖", kind: "compare", lesson: "u0-assistant", pages: [6, 39], src: "book",
    title: L("من شات إلى مساعد إلى وكيل", "From chat to assistant to agent"), lead: L("ثلاثة مستويات جنبًا إلى جنب: ماذا يضيف كل مستوى؟", "Three levels side by side: what does each add?"),
    zones: [{ id: "z1", x: 10, y: 10, w: 300, h: 480, label: I("الشات التقليدي", "Traditional chat") }, { id: "z2", x: 330, y: 10, w: 300, h: 480, label: I("المساعد الشخصي", "Personal assistant") }, { id: "z3", x: 650, y: 10, w: 300, h: 480, label: I("الوكيل الذكي", "AI agent") }],
    nodes: [
      N("q", 60, 90, 200, 64, "❓", "سؤال", "A question"), N("a", 60, 260, 200, 64, "💬", "إجابة… ثم نسيان", "An answer… then forgotten", { info: I("أضعف استخدام: سؤال، فإجابة، ثم نسيان {p7}.", "The weakest use: question, answer, forget {p7}.") }),
      N("ctx2", 380, 70, 200, 64, "🧭", "يفهم سياقك", "Understands your context"), N("mem", 380, 190, 200, 64, "🗂️", "يتذكر ما سبق", "Remembers what came before"), N("help", 380, 310, 200, 64, "🤝", "يساعدك باستمرار", "Keeps helping", { info: I("يفهمك ويتذكر السياق ويساعدك باستمرار {p6}.", "It understands you, remembers context and helps continuously {p6}.") }),
      N("goal", 700, 60, 200, 56, "🎯", "هدف", "Goal"), N("plan", 700, 140, 200, 56, "🗺️", "يخطط", "Plans"), N("tools", 700, 220, 200, 56, "🧰", "يستخدم أدوات", "Uses tools", { info: I("قراءة ملف، أو استعلام قاعدة بيانات، أو إرسال رسالة {p39}.", "Read a file, query a database, send a message {p39}.") }), N("obs", 700, 300, 200, 56, "👀", "يرى النتيجة ويصحح", "Observes & corrects"), N("done", 700, 390, 200, 64, "✅", "يحقق الهدف أو يتوقف عند حد", "Meets the goal or stops at a limit", { info: I("يتوقف عند حد محدد سلفًا: مبلغ، أو بيانات ناقصة، أو عدد محاولات {p39-40}.", "Stops at a preset limit: an amount, missing data, or a number of attempts {p39-40}.") }),
    ],
    links: [{ from: "q", to: "a" }, { from: "ctx2", to: "mem" }, { from: "mem", to: "help" }, { from: "help", to: "ctx2", curve: -0.5 }, { from: "goal", to: "plan" }, { from: "plan", to: "tools" }, { from: "tools", to: "obs" }, { from: "obs", to: "plan", curve: -0.55, label: I("تكرار", "iterate") }, { from: "obs", to: "done" }],
    steps: [
      { t: I("الشات التقليدي", "Traditional chat"), c: I("تسأل سؤالًا وتحصل على إجابة. لا ذاكرة ولا متابعة.", "You ask and get an answer. No memory, no follow-up."), show: ["q", "a"], zones: ["z1"], flow: ["q>a"] },
      { t: I("المساعد الشخصي", "Personal assistant"), c: I("يفهم سياقك ويتذكره، فلا تبدأ من الصفر في كل رسالة.", "Understands and remembers your context, so you don’t start from zero each message."), add: ["ctx2", "mem", "help"], zones: ["z1", "z2"], dim: ["q", "a"], flow: ["ctx2>mem", "mem>help", "help>ctx2"] },
      { t: I("الوكيل: هدف وخطة", "Agent: goal and plan"), c: I("الوكيل يُعطى هدفًا لا سؤالًا، فيبدأ بالتخطيط.", "An agent is given a goal, not a question, and starts by planning."), add: ["goal", "plan"], zones: ["z1", "z2", "z3"], hl: ["goal"], dim: ["q", "a", "ctx2", "mem", "help"], flow: ["goal>plan"] },
      { t: I("أدوات وتكرار", "Tools and iteration"), c: I("ينفذ بأدوات، ويرى النتيجة، ويصحح، ويكرر — هذا ما يميزه: **هدف، أدوات، تكرار** {p39}.", "It acts with tools, sees the result, corrects and repeats — its signature: **goal, tools, iteration** {p39}."), add: ["tools", "obs"], zones: ["z1", "z2", "z3"], hl: ["tools", "obs"], dim: ["q", "a", "ctx2", "mem", "help"], flow: ["plan>tools", "tools>obs", "obs>plan"] },
      { t: I("حتى يحقق الهدف… أو يتوقف", "Until done… or stopped"), c: I("الوكيل الجيد يعرف متى يتوقف ويسأل الإنسان. كلما زادت قدرته زادت أهمية الحدود.", "A good agent knows when to stop and ask a human. The more capable it is, the more limits matter."), add: ["done"], zones: ["z1", "z2", "z3"], hl: ["done"], flow: ["obs>done"] },
    ],
  };

  S["verify-gate"] = {
    icon: "🛡️", kind: "build", lesson: "u0-limits", pages: [41], src: "book",
    title: L("بوابات الاستخدام الواعي", "The gates of conscious use"), lead: L("مخرج الذكاء الاصطناعي يمر بخمس بوابات قبل أن يصبح قرارًا.", "AI output passes five gates before becoming a decision."),
    nodes: [
      N("g1", 30, 200, 150, 90, "🎯", "حدد الهدف", "Set the goal", { info: I("بدون هدف واضح لا تستطيع الحكم إن كانت النتيجة جيدة.", "Without a clear goal you can’t judge whether the result is good.") }),
      N("g2", 210, 200, 150, 90, "🧭", "أعطه السياق", "Give context", { info: I("يعالج الحد ٢: سوء الفهم عند نقص السياق، والحد ٥: لا يعرف بيانات شركتك.", "Addresses limit 2 (misunderstanding with missing context) and limit 5 (doesn’t know your data).") }),
      N("g3", 390, 200, 150, 90, "🔍", "راجع النتيجة", "Review", { info: I("يعالج الحد ١: قد يعطي معلومة خاطئة بثقة.", "Addresses limit 1: may give wrong information confidently.") }),
      N("g4", 570, 200, 150, 90, "🗄️", "تأكد من المصادر", "Check sources", { info: I("يعالج الحد ٦: بعض المعلومات قديمة أو ناقصة.", "Addresses limit 6: some information is outdated or incomplete.") }),
      N("g5", 750, 200, 180, 90, "✔️", "اتخذ القرار", "Decide", { info: I("يعالج الحدين ٤ و٨: القرار الحساس يحتاج مراجعة بشرية، والمسؤولية لك.", "Addresses limits 4 and 8: sensitive decisions need human review; responsibility is yours.") }),
      N("r1", 300, 40, 180, 64, "⚠️", "خطأ بثقة", "Confidently wrong", { fill: "var(--bad-soft)" }),
      N("r2", 520, 40, 180, 64, "🔒", "بيانات حساسة", "Sensitive data", { fill: "var(--warn-soft)", info: I("لا تُدخل بيانات حساسة بدون ضوابط واضحة {p41}.", "Don’t enter sensitive data without clear controls {p41}.") }),
      N("eq", 200, 390, 560, 70, "🧮", "إنسان يفكر + بيانات جيدة + ذكاء اصطناعي", "Thinking human + good data + AI", { fill: "var(--ok-soft)" }),
    ],
    links: [{ from: "g1", to: "g2" }, { from: "g2", to: "g3" }, { from: "g3", to: "g4" }, { from: "g4", to: "g5" }, { from: "r1", to: "g3", label: I("تُمسك هنا", "caught here") }, { from: "r2", to: "g2" }],
    steps: [
      { t: I("الهدف أولًا", "Goal first"), c: I("كل مراجعة لاحقة تُقاس بالهدف.", "Every later review is measured against the goal."), show: ["g1"], hl: ["g1"] },
      { t: I("السياق", "Context"), c: I("سياق واضح يقلل التخمين. وانتبه لما تضعه فيه من بيانات حساسة.", "Clear context reduces guessing. Mind any sensitive data you put in it."), add: ["g2", "r2"], hl: ["g2"], flow: ["g1>g2"] },
      { t: I("المراجعة", "Review"), c: I("هنا تُمسك المعلومات الخاطئة الواثقة قبل أن تصل لأحد.", "This is where confident errors are caught before reaching anyone."), add: ["g3", "r1"], hl: ["g3"], flow: ["g2>g3", "r1>g3"] },
      { t: I("المصادر", "Sources"), c: I("كل رقم وادعاء مهم يرجع لمصدر تستطيع فتحه.", "Every important number and claim traces to a source you can open."), add: ["g4"], hl: ["g4"], flow: ["g3>g4"] },
      { t: I("القرار", "Decision"), c: I("أنت تقرر وتتحمل المسؤولية. وهذه هي المعادلة الكاملة {p41}.", "You decide and own the responsibility. That’s the full equation {p41}."), add: ["g5", "eq"], hl: ["g5", "eq"], flow: ["g4>g5"] },
    ],
  };
})();
