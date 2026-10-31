/* Pure Python — the story deck of lesson k2 (unit 4).
   The planning engineer at the second plant carries every slide with one question: «إزاي أبني أداة من غير ولا باكدج من
   برّه؟». The deck goes from the blocked pip install to a tool built on the standard library alone: what the standard
   library is, what a package is, why packages are a risk, the company's policy, checking Python is there, the rule in
   the Prompt, a function written by the model itself, the replacements map, checking imports, and the honest limits;
   it ends on a PC with no Python at all, which opens k3. Drawings are the pu_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.pureStory = {
    id: "pure", lesson: "k2",
    kicker: u("Python النقي · الحكاية في ٨ دقايق", "Pure Python · the story in 8 minutes"),
    title: u("أداة من غير ولا باكدج من برّه", "A tool without a single outside package"),
    lead: u("فاكر السطر اللي الشبكة رفضته في آخر الدرس اللي فات؟ في الحكاية دي مهندسة التخطيط بتفهم ليه الشركة بتمنع الباكدجات، وبتلاقي إن Python جاية ومعاها تقريبًا كل اللي محتاجاه.",
      "Remember the line the network refused at the end of the last lesson? In this story the planning engineer learns why the company blocks packages, and finds that Python comes with almost everything she needs."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي أبني أداة من غير ولا باكدج من برّه؟", "How do I build a tool without a single outside package?"),
    finalQuestion: u("طب ولو الجهاز ما عليهوش Python أصلًا؟", "And what if the machine has no Python at all?"),
    note: u("أسماء الباكدجات أمثلة مشهورة، مش حكم عليها؛ سياسة كل شركة بتحددها إدارة الأمن فيها. الأرقام توضيحية.", "The package names are famous examples, not a verdict on them; each company's security team sets its own policy. The figures are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("Python النقي، في شرائح", "Pure Python, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "blocked", art: "pu_blocked", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("الشبكة رفضت", "The network refused"),
        title: u("«الحزمة دي ممنوعة على أجهزة الشركة»", "“This package is blocked on company machines”"),
        story: [u("فاكر آخر الدرس اللي فات؟ pip install pandas اترفض. مهندسة التخطيط اتصلت بقسم أمن المعلومات تسأل: «أنا عايزة أداة صغيرة بس. ليه ممنوع؟». المسؤول قال: «مش ممنوع تعملي أداة. الممنوع إن كود من برّه الشركة يدخل الجهاز من غير ما حد يراجعه».",
          "Remember the end of the last lesson? pip install pandas was refused. The planning engineer called the information-security team to ask: “I only want a small tool. Why is it blocked?” The officer said: “Making a tool isn't blocked. What's blocked is code from outside the company entering the machine without anyone reviewing it.”"),
        u("«طب أعمل إيه؟» «Python نفسها جاية ومعاها حاجات كتير. استخدمي اللي جواها بس». والسؤال اللي ماشي معانا: إزاي أبني أداة من غير ولا باكدج من برّه؟",
          "“So what do I do?” “Python itself comes with a lot inside it. Use only what's inside.” The question we carry: how do I build a tool without a single outside package?")],
        answer: u("قبل ما تطلب أداة، اعرف قواعد جهاز الشركة: إيه المسموح يشتغل وإيه لأ. لأن الأداة اللي مش ماشية على القواعد هتقف عند أول سطر، مهما كانت مظبوطة.", "Before asking for a tool, know the company machine's rules: what may run and what may not — a tool that ignores the rules stops at its first line, however correct it is."),
        idea: u("الممنوع مش الأداة… الممنوع الكود الغريب.", "What's blocked isn't the tool… it's unknown code.")
      },
      {
        id: "stdlib", art: "pu_stdlib", year: u("المكتبة القياسية", "Standard library"), mark: u("٠٢", "02"), era: u("جاية مع Python", "Ships with Python"),
        title: u("Python جاية ومعاها شنطة أدوات", "Python comes with a toolbox"),
        story: [u("زميل الأتمتة فتحلها قايمة: csv لملفات CSV، وsqlite3 لقاعدة بيانات كاملة، وzipfile للملفات المضغوطة، وre للبحث في النص، وhtml لصفحات الويب، وjson، وpathlib للمسارات، وdatetime للتواريخ. «دي اسمها المكتبة القياسية. بتتسطب مع Python نفسها، من نفس المصدر الرسمي».",
          "The automation colleague opened a list for her: csv for CSV files, sqlite3 for a full database, zipfile for compressed files, re for searching text, html for web pages, json, pathlib for paths, datetime for dates. “This is called the standard library. It installs with Python itself, from the same official source.”"),
        u("«يعني مش محتاجة أنزّل حاجة؟» «ولا حاجة. أي حاجة تبدأ بـ import csv أو import sqlite3 شغالة على أي جهاز عليه Python. ولما نقول Python النقي، نقصد إن الأداة مستخدمة دول بس».",
          "“So I don't need to download anything?” “Nothing. Anything starting with import csv or import sqlite3 works on any machine with Python. When we say pure Python, we mean the tool uses only these.”")],
        answer: u("ابدأ دايمًا من اللي جاي مع Python. لأن المكتبة القياسية موجودة على كل جهاز عليه Python، ومتراجعة مع اللغة نفسها.", "Always start from what ships with Python — the standard library is on every machine with Python, and is reviewed with the language itself."),
        idea: u("الشنطة جاية مع اللغة… افتحها الأول.", "The toolbox comes with the language… open it first.")
      },
      {
        id: "package", art: "pu_package", year: u("الباكدج", "Package"), mark: u("٠٣", "03"), era: u("كود من برّه", "Outside code"),
        title: u("الباكدج: كود كتبه حد تاني", "A package: code someone else wrote"),
        story: [u("«طب pandas دي إيه؟» «باكدج: كود كتبه حد تاني، ومرفوع على موقع اسمه PyPI. وأمر pip install بيروح للموقع ده، وينزّل الكود، ويحطه جوّه Python على جهازك». وفي PyPI مئات الآلاف من الباكدجات، وأي حد يقدر يرفع واحد.",
          "“And what is pandas?” “A package: code someone else wrote, uploaded to a site called PyPI. The pip install command goes to that site, downloads the code, and puts it inside Python on your machine.” PyPI holds hundreds of thousands of packages, and anyone can upload one."),
        u("«فيه باكدجات ممتازة ومشهورة ومستخدمة في شركات كبيرة. المشكلة مش في الفكرة نفسها: المشكلة إن كل باكدج قرار بإدخال كود غريب، وقسم الأمن هو اللي بيقرر، مش إحنا».",
          "“Some packages are excellent, famous and used by big companies. The problem isn't the idea itself: every package is a decision to bring in unknown code, and the security team makes that decision, not us.”")],
        answer: u("اعتبر أي pip install قرار بإدخال كود من برّه، مش خطوة تقنية عادية. لأن القرار ده بتاع قسم الأمن، مش بتاع النموذج ولا بتاعك.", "Treat any pip install as a decision to bring in outside code, not an ordinary technical step — that decision belongs to the security team, not to the model or to you."),
        idea: u("كل pip install… قرار.", "Every pip install… is a decision.")
      },
      {
        id: "risk", art: "pu_risk", year: u("الخطر", "The risk"), mark: u("٠٤", "04"), era: u("ليه بيمنعوه", "Why they block it"),
        title: u("تلات طرق يدخل منها الخطر", "Three ways the risk gets in"),
        story: [u("المسؤول شرحلها تلات حاجات. الأولى: اسم شبه اسم مشهور، زي pandsa بدل pandas، حد بيرفعه مخصوص علشان حد يغلط ويسطّبه. التانية: نسخة جديدة من باكدج مشهور حد وصل لحسابه وغيّر فيها. والتالتة: الباكدج الواحد بيسحب معاه عشرات تانيين محدش شافهم.",
          "The officer explained three things. First: a name close to a famous one, like pandsa instead of pandas, uploaded on purpose so someone installs it by mistake. Second: a new version of a famous package after someone got into its account and changed it. Third: one package pulls in dozens of others nobody has seen."),
        u("«وكل ده بيشتغل بصلاحياتك إنتي: يقرا ملفاتك، ويوصل للشبكة. والتثبيت نفسه ممكن يشغّل كود. علشان كده بنقفل pip، أو بنسمح بقايمة صغيرة اتراجعت».",
          "“And all of it runs with your permissions: it reads your files and reaches the network. The installation itself can run code. That's why we block pip, or allow a small list that has been reviewed.”")],
        answer: u("الكود اللي بيتسطّب بيشتغل بصلاحياتك على جهاز الشركة. لأن كده أي غلطة في اختيار باكدج بتبقى ثغرة في الشركة كلها، مش في جهازك بس.", "Installed code runs with your permissions on a company machine — so any mistake in choosing a package becomes a hole in the whole company, not just your machine."),
        idea: u("باكدج واحد… ومعاه عشرات.", "One package… and dozens with it.")
      },
      {
        id: "policy", art: "pu_policy", year: u("السياسة", "Policy"), mark: u("٠٥", "05"), era: u("ليه منطقية", "Why it's reasonable"),
        title: u("مين يراجع ١٠٠ باكدج لكل مهندس؟", "Who reviews 100 packages per engineer?"),
        story: [u("في المصنع ٤٠ مهندس. لو كل واحد سطّب اللي النموذج اقترحه، هيبقى فيه مئات الباكدجات بنسخ مختلفة على أجهزة الشركة، ومحدش يعرف مين فيهم اتراجع. قسم الأمن عنده خيارين: يمنع كله، أو يسمح بقايمة معتمدة بس، ويراجع أي إضافة عليها.",
          "The plant has 40 engineers. If each installed whatever the model suggested, there would be hundreds of packages in different versions on company machines, and nobody would know which were reviewed. The security team has two options: block everything, or allow an approved list only, and review any addition to it."),
        u("المصنع التاني اختار المنع الكامل، علشان أبسط وأوضح. مهندسة التخطيط فهمت إن القاعدة مش ضدها: دي اللي بتخلّي الأداة اللي هتعملها تتنقل لأي جهاز في الشركة من غير ما حد يقلق.",
          "The second plant chose a full block, because it is simpler and clearer. The planning engineer understood that the rule isn't against her: it is what lets her tool move to any machine in the company without anyone worrying.")],
        answer: u("احترم سياسة الأمن وابني جواها، مش حواليها. لأن الأداة اللي ماشية على السياسة بتتنقل وتتعمّم، واللي بتتحايل عليها بتتقفل.", "Respect the security policy and build inside it, not around it — a tool that follows the policy can be moved and shared; one that dodges it gets shut down."),
        idea: u("القاعدة مش ضدك… هي اللي بتخلّي أداتك تتنقل.", "The rule isn't against you… it lets your tool travel.")
      },
      {
        id: "check", art: "pu_check", year: u("الفحص", "Check"), mark: u("٠٦", "06"), era: u("Python موجودة؟", "Is Python there?"),
        title: u("أول أمر: python --version", "The first command: python --version"),
        story: [u("قبل أي حاجة، فتحت PowerShell وكتبت python --version. ظهر: Python 3.12.4. «تمام، موجودة». الزميل نبّهها: «لو الأمر فتح Microsoft Store، يبقى Python مش متسطبة، والويندوز بيعرض عليكي تنزّليها من المتجر. ما تنزّليهاش».",
          "Before anything, she opened PowerShell and typed python --version. It showed: Python 3.12.4. “Good, it's there.” The colleague warned her: “If the command opens the Microsoft Store, Python isn't installed, and Windows is offering to download it from the store. Don't.”"),
        u("«ليه؟» «علشان أي برنامج على جهاز الشركة لازم ييجي من الـ IT، بالنسخة المعتمدة. وفيه كمان أمر py --version، بيشتغل على أجهزة كتير لو python ما اشتغلش». ومن ساعتها بقى أول سطر في أي شغل جديد.",
          "“Why?” “Because any program on a company machine must come from IT, in the approved version. There's also py --version, which works on many machines when python doesn't.” From then on it became the first line of any new work.")],
        answer: u("اتأكد إن Python موجودة قبل ما تطلب أداة Python، ولو مش موجودة اطلبها من الـ IT. لأن نسخة من المتجر أو من أي موقع برّه سياسة الشركة زيها زي الباكدج.", "Check Python is there before asking for a Python tool, and if it isn't, ask IT for it — a copy from the store or any website is outside company policy, just like a package."),
        idea: u("سطر واحد… قبل أي أداة.", "One line… before any tool.")
      },
      {
        id: "rule", art: "pu_rule", year: u("القاعدة", "The rule"), mark: u("٠٧", "07"), era: u("أول سطر في الطلب", "The request's first line"),
        title: u("سطر واحد في أول الـ Prompt غيّر كل حاجة", "One line at the top of the Prompt changed everything"),
        story: [u("رجعت للأداة وكتبت في أول الطلب: «Python بالمكتبة القياسية بس. ممنوع pip install، وممنوع أي import من برّه المكتبة القياسية. لو محتاج دالة من باكدج، اكتبها بنفسك جوّه السكريبت، وقولّي في تعليق هي بدل إيه».",
          "She went back to the tool and wrote at the top of the request: “Python with the standard library only. No pip install, and no import from outside the standard library. If you need a function from a package, write it yourself inside the script, and tell me in a comment what it replaces.”"),
        u("الأداة رجعت بسكريبت ٤٠ سطر: import csv وimport sqlite3 بس. اشتغل من أول مرة، وطلّع ٣٦ صف و١٬٧٦٥ جهاز، نفس الرقم اللي كانت pandas هتطلّعه. النموذج كان يقدر يعملها كده من الأول، بس محدش قاله.",
          "The tool came back with a 40-line script: import csv and import sqlite3 only. It worked first time, and gave 36 rows and 1,765 sets, the same figure pandas would have given. The model could have done it this way from the start; nobody had told it.")],
        answer: u("قول قاعدة المكتبة القياسية في أول سطر من أي طلب أداة. لأن النموذج بيختار الأشهر لو ما قلتلوش، والأشهر غالبًا باكدج.", "State the standard-library rule in the first line of any tool request — left alone, the model picks the most popular option, and that is usually a package."),
        idea: u("النموذج كان يقدر… بس محدش قاله.", "The model could… nobody had told it.")
      },
      {
        id: "write", art: "pu_write", year: u("بنفسه", "Itself"), mark: u("٠٨", "08"), era: u("الدالة الناقصة", "The missing function"),
        title: u("اللي كانت pandas بتعمله… في ٦ سطور", "What pandas did… in 6 lines"),
        story: [u("الطلب التاني كان «اجمع الكمية لكل بلد». مع pandas دي سطر واحد. من غيرها، النموذج كتب دالة ٦ سطور: قاموس فاضي، ولكل صف في الملف زوّد الكمية على البلد بتاعه، وفي الآخر رتّب. وفوقها تعليق: «بدل pandas groupby().sum()».",
          "The second request was “sum the quantity per country”. With pandas it's one line. Without it, the model wrote a 6-line function: an empty dictionary, and for each row in the file add the quantity to its country, then sort at the end. Above it, a comment: “replaces pandas groupby().sum()”."),
        u("مهندسة التخطيط قرت الـ ٦ سطور وفهمتهم، حاجة ما كانتش هتعرف تعملها مع سطر pandas. والنتيجة: مصر ٨٨٠، والكويت ٣٨٥، نفس اللي في مفتاح الإجابة. «الكود الأطول شوية، بس إنتي فاهمة كل سطر فيه».",
          "The planning engineer read the 6 lines and understood them, something she couldn't have done with the pandas line. The result: Egypt 880 and Kuwait 385, the same as the answer key. “The code is a little longer, but you understand every line of it.”")],
        answer: u("سيب النموذج يكتب الدالة الناقصة بنفسه، واطلب تعليق بيقول هي بدل إيه. لأن الكود اللي إنت فاهم كل سطر فيه أسهل في المراجعة من سطر سحري مستخبي وراه آلاف.", "Let the model write the missing function itself, with a comment saying what it replaces — code whose every line you understand is easier to review than one magic line with thousands hidden behind it."),
        idea: u("أطول شوية… بس مفهوم.", "A little longer… but understood.")
      },
      {
        id: "map", art: "pu_map", year: u("البدائل", "Replacements"), mark: u("٠٩", "09"), era: u("بدل كل باكدج", "Instead of each package"),
        title: u("خريطة: بدل الباكدج المشهور، استخدم إيه؟", "A map: instead of the famous package, use what?"),
        story: [u("الزميل كتبلها خريطة على ورقة: pandas للقراءة والتجميع ← csv وقاموس، أو sqlite3. openpyxl لقراءة إكسل ← PowerShell يحفظ الشيت CSV. pdfplumber لقراءة PDF ← re وzlib. plotly للرسوم ← رسم SVG مكتوب نص جوّه الصفحة. requests للنت ← ولا حاجة، مفيش نت.",
          "The colleague wrote her a map on paper: pandas for reading and grouping → csv and a dictionary, or sqlite3. openpyxl for reading Excel → PowerShell saves the sheet as CSV. pdfplumber for reading PDF → re and zlib. plotly for charts → an SVG chart written as text inside the page. requests for the internet → nothing; there's no internet."),
        u("«الخريطة دي هتمشي معانا الوحدة كلها: كل درس جاي بيستخدم سطر منها». وحطتها في ملف جنب الفولدر، علشان تديها للنموذج مع أي طلب جديد.",
          "“This map will run through the whole unit: every coming lesson uses one of its lines.” She saved it in a file beside the folder, to give it to the model with any new request.")],
        answer: u("خلّي عندك خريطة بدائل جاهزة، وادّيها للنموذج مع الطلب. لأن النموذج بيكتب أسرع وأصح لما يعرف البديل المسموح من الأول.", "Keep a ready map of replacements and give it to the model with the request — the model writes faster and better when it knows the allowed replacement from the start."),
        idea: u("لكل باكدج… بديل من جوّه.", "For every package… a replacement from inside.")
      },
      {
        id: "imports", art: "pu_imports", year: u("المراجعة", "The check"), mark: u("١٠", "10"), era: u("أول السكريبت", "The script's top"),
        title: u("اقرا سطور import… قبل ما تشغّل", "Read the import lines… before you run"),
        story: [u("بعد أسبوع، سكريبت جديد اشتغل على جهازها وفشل على جهاز زميل. لقت في نص الملف، مش في أوله، سطر import openpyxl مستخبي جوّه دالة. النموذج حطه علشان «يسهّل» حفظ الإكسل، وعلى جهازها كان متسطب من زمان من غير ما تعرف.",
          "A week later, a new script worked on her machine and failed on a colleague's. She found, in the middle of the file rather than at the top, an import openpyxl line hidden inside a function. The model had added it to “simplify” saving Excel, and on her machine it had been installed long ago without her knowing."),
        u("من ساعتها بتعمل حاجتين: بتدوّر على كلمة import في الملف كله، وبتتأكد بأمر واحد إن الوحدة من المكتبة القياسية: python -c \"import sys; print('openpyxl' in sys.stdlib_module_names)\" فيطبع False.",
          "Since then she does two things: she searches the whole file for the word import, and checks with one command that a module belongs to the standard library: python -c \"import sys; print('openpyxl' in sys.stdlib_module_names)\" which prints False.")],
        answer: u("دوّر على كل import في الملف كله، مش أوله بس، واتأكد إنه من المكتبة القياسية. لأن سطر واحد مستخبي بيخلّي الأداة تشتغل عندك وتقف عند غيرك.", "Search for every import in the whole file, not just its top, and check it belongs to the standard library — one hidden line makes a tool work for you and stop for everyone else."),
        idea: u("اشتغلت عندك… مش معناها اشتغلت.", "It worked for you… doesn't mean it works.")
      },
      {
        id: "limits", art: "pu_limits", year: u("الحدود", "Limits"), mark: u("١١", "11"), era: u("بصراحة", "Honestly"),
        title: u("فيه شغل ما ينفعش بـ Python النقي", "Some work doesn't fit pure Python"),
        story: [u("مش كل حاجة تنفع من غير باكدج. PDF ممسوح كصورة محتاج قراءة صور، ودي ما بتتعملش بشكل معقول بالمكتبة القياسية. ونسخ كود باكدج جوّه فولدرك علشان تهرب من المنع؟ ده لسه كود من برّه، بس دلوقتي من غير ما حد يعرف.",
          "Not everything can be done without a package. A PDF scanned as an image needs image reading, which can't reasonably be done with the standard library. And copying a package's code into your folder to dodge the block? It is still outside code, only now nobody knows."),
        u("القاعدة اللي المسؤول قالها: «لو محتاجة حاجة مش موجودة، اطلبيها رسمي. أحيانًا بنضيفها للقايمة المعتمدة، وأحيانًا بندّيكي أداة تانية معتمدة. بس ما تتحايليش على المنع».",
          "The rule the officer gave: “If you need something that isn't there, request it officially. Sometimes we add it to the approved list, sometimes we give you another approved tool. Just don't dodge the block.”")],
        answer: u("لو الشغل محتاج باكدج فعلًا، اطلبه رسمي من قسم الأمن. لأن الطلب الرسمي ممكن يتوافق عليه، والتحايل بيخسّرك ثقة القسم في كل أدواتك.", "If the work truly needs a package, request it officially from the security team — an official request may be approved; dodging the block costs you the team's trust in all your tools."),
        idea: u("اطلب… ما تتحايلش.", "Ask… don't dodge.")
      },
      {
        id: "cliff", art: "pu_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("جهاز مشرف الخط", "The line supervisor's PC"),
        title: u("الأداة جاهزة… والجهاز اللي هيشغّلها مالوش Python", "The tool is ready… and the PC that will run it has no Python"),
        story: [u("الأداة اشتغلت عندها بـ Python النقي. بس اللي هيشغّلها كل أسبوع مشرف الخط، على جهازه هو. كتبت عليه python --version، فاتفتح Microsoft Store. والـ IT قال إن طلب تسطيب Python للجهاز ده محتاج موافقة وهياخد أسبوعين.",
          "The tool worked on her machine in pure Python. But the person who will run it every week is the line supervisor, on his own PC. She typed python --version on it, and the Microsoft Store opened. IT said a request to install Python on that PC needs approval and will take two weeks."),
        u("الأداة جاهزة، والملفات جاهزة، والجهاز مش جاهز. افتكرت سؤال قسم الأمن التاني، ومعاه سؤال جديد. والسؤال اللي الدرس الجاي بيبدأ بيه: طب ولو الجهاز ما عليهوش Python أصلًا؟",
          "The tool is ready, the files are ready, and the machine isn't. She remembered the security team's second question, and a new one with it. And the question the next lesson opens with: what if the machine has no Python at all?")],
        answer: u("واجب الدرس: شغّل python --version، وبعدين اطلب تحويل أي كود عندك فيه pandas لـ Python النقي، واقرا سطور import في الناتج. لأن السطور دي هي أول حاجة قسم الأمن هيقراها.", "This lesson's task: run python --version, then ask for any code of yours using pandas to be rewritten in pure Python, and read the import lines in the result — those lines are the first thing the security team will read."),
        idea: u("الأداة لازم تشتغل على جهاز اللي هيستخدمها… مش جهازك.", "The tool must run on its user's machine… not yours.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.pureStory]);
})(window.ACADEMY = window.ACADEMY || {});
