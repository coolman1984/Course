/* Pure Python — the story deck of lesson k2 (unit 4).
   The planning engineer of unit 3 carries every slide with one question: «إزاي أبني أداة من غير ولا باكدج من
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
    lead: u("فاكر السطر اللي الشبكة رفضته في آخر الدرس اللي فات؟ في الحكاية دي مهندس التخطيط بيفهم ليه الشركة بتمنع الباكدجات، وبيكتشف إن Python جاية ومعاها تقريبًا كل اللي محتاجه.",
      "Remember the line the network refused at the end of the last lesson? In this story the planning engineer understands why the company blocks packages, and discovers that Python comes with almost everything he needs."),
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
        story: [u("فاكر آخر الدرس اللي فات؟ أمر pip install pandas اترفض. مهندس التخطيط كلّم قسم أمن المعلومات وسأل: «أنا محتاج أداة صغيرة بس، ليه ممنوع؟». والرد كان واضح: «الأداة مش ممنوعة. الممنوع إن كود من برّه الشركة يدخل الجهاز من غير ما حد يراجعه».",
          "Remember the end of the last lesson? pip install pandas was refused. The planning engineer called the information-security team and asked: “I only need a small tool; why is it blocked?” The answer was clear: “The tool isn't blocked. What is blocked is code from outside the company entering the machine with no one reviewing it.”"),
        u("سأل: «طب أعمل إيه؟»، فقالوله: «Python نفسها جاية ومعاها حاجات كتير، استخدم اللي جواها بس». والسؤال اللي معانا في الحكاية دي: إزاي أبني أداة من غير ولا باكدج من برّه؟",
          "He asked: “So what do I do?”, and they told him: “Python itself comes with a great deal; use only what is inside it.” The question we carry in this story: how do I build a tool without a single outside package?")],
        answer: u("قبل ما تطلب أداة، اعرف قواعد جهاز الشركة: إيه المسموح يشتغل وإيه الممنوع. لأن الأداة اللي مش ماشية على القواعد هتقف عند أول سطر، مهما كانت مظبوطة.", "Before asking for a tool, know the company machine's rules: what may run and what may not — a tool that ignores the rules stops at its first line, however correct it is."),
        idea: u("الممنوع مش الأداة… الممنوع هو الكود الغريب.", "What's blocked isn't the tool… it's unknown code.")
      },
      {
        id: "stdlib", art: "pu_stdlib", year: u("المكتبة القياسية", "Standard library"), mark: u("٠٢", "02"), era: u("جاية مع Python", "Ships with Python"),
        title: u("Python جاية ومعاها شنطة أدوات كاملة", "Python comes with a whole bag of tools"),
        story: [u("فتح قايمة المكتبة القياسية: csv لملفات CSV، وsqlite3 لقاعدة بيانات كاملة، وzipfile للملفات المضغوطة، وre للبحث في النص، وhtml لصفحات الويب، وjson، وpathlib للمسارات، وdatetime للتواريخ. كل دول بيتثبّتوا مع Python نفسها، من نفس المصدر الرسمي.",
          "He opened the list of the standard library: csv for CSV files, sqlite3 for a full database, zipfile for compressed files, re for searching text, html for web pages, json, pathlib for paths and datetime for dates. All of them are installed with Python itself, from the same official source."),
        u("يعني مفيش حاجة محتاجة تتنزّل: أي سطر بيبدأ بـ import csv أو import sqlite3 بيشتغل على أي جهاز عليه Python. ولما نقول «Python النقي»، نقصد إن الأداة مستخدمة المكتبة القياسية دي بس.",
          "So nothing needs downloading: any line starting with import csv or import sqlite3 works on any machine that has Python. And when we say “pure Python”, we mean the tool uses this standard library only.")],
        answer: u("ابدأ دايمًا باللي جاي مع Python. لأن المكتبة القياسية موجودة على كل جهاز عليه Python، ومتراجعة مع اللغة نفسها.", "Always start from what ships with Python — the standard library is on every machine with Python, and is reviewed with the language itself."),
        idea: u("الشنطة جاية مع اللغة… افتحها الأول.", "The toolbox comes with the language… open it first.")
      },
      {
        id: "package", art: "pu_package", year: u("الباكدج", "Package"), mark: u("٠٣", "03"), era: u("كود من برّه", "Outside code"),
        title: u("الباكدج: كود كتبه حد تاني", "A package: code someone else wrote"),
        story: [u("طب pandas تبقى إيه؟ دي باكدج: كود كتبه حد تاني ورفعه على موقع اسمه PyPI. وأمر pip install بيروح للموقع ده، وينزّل الكود، ويحطه جوّه Python على جهازك. وعلى PyPI مئات الآلاف من الباكدجات، وأي حد يقدر يرفع واحدة.",
          "So what is pandas? A package: code someone else wrote and uploaded to a site called PyPI. The pip install command goes to that site, downloads the code and puts it inside Python on your machine. PyPI holds hundreds of thousands of packages, and anyone can upload one."),
        u("فيه باكدجات ممتازة ومشهورة، وشركات كبيرة بتستخدمها. المشكلة مش في فكرة الباكدج نفسها، المشكلة إن كل باكدج قرار بإدخال كود غريب للجهاز، والقرار ده بتاع قسم الأمن، مش بتاعنا.",
          "There are excellent, famous packages that large companies use. The problem isn't the idea of a package itself; the problem is that each package is a decision to let foreign code onto the machine, and that decision belongs to the security team, not to us.")],
        answer: u("اعتبر أي pip install قرار بإدخال كود من برّه، مش خطوة تقنية عادية. لأن القرار ده بتاع قسم الأمن، مش بتاع النموذج ولا بتاعك.", "Treat any pip install as a decision to bring in outside code, not an ordinary technical step — that decision belongs to the security team, not to the model or to you."),
        idea: u("كل pip install… قرار.", "Every pip install… is a decision.")
      },
      {
        id: "risk", art: "pu_risk", year: u("الخطر", "The risk"), mark: u("٠٤", "04"), era: u("ليه بيمنعوه", "Why they block it"),
        title: u("تلات طرق ممكن يدخل منها الخطر", "Three ways the danger can come in"),
        story: [u("قسم الأمن شرحله تلات حاجات. الأولى: اسم قريب من اسم مشهور، زي pandsa بدل pandas، حد بيرفعه مخصوص علشان حد يغلط ويثبّته. التانية: نسخة جديدة من باكدج مشهور، حد وصل لحساب صاحبها وغيّر فيها. والتالتة: الباكدج الواحد بيسحب معاه عشرات تانيين محدش راجعهم.",
          "The security team explained three things to him. First: a name close to a famous one, like pandsa instead of pandas, uploaded on purpose so someone installs it by mistake. Second: a new version of a famous package, changed by someone who reached its owner's account. Third: one package pulls in dozens of others that nobody reviewed."),
        u("وكل ده بيشتغل بصلاحياتك إنت: يقرا ملفاتك، ويوصل للشبكة، والتثبيت نفسه ممكن يشغّل كود. علشان كده القسم بيقفل pip، أو بيسمح بقايمة صغيرة اتراجعت.",
          "And all of it runs with your own permissions: it reads your files and reaches the network, and the installation itself may run code. That's why the team blocks pip, or allows a small reviewed list.")],
        answer: u("الكود اللي بيتثبّت بيشتغل بصلاحياتك على جهاز الشركة. لأن أي غلطة في اختيار باكدج بتبقى ثغرة في الشركة كلها، مش في جهازك بس.", "Installed code runs with your permissions on a company machine — so any mistake in choosing a package becomes a hole in the whole company, not just your machine."),
        idea: u("باكدج واحدة… ومعاها عشرات.", "One package… and dozens with it.")
      },
      {
        id: "policy", art: "pu_policy", year: u("السياسة", "Policy"), mark: u("٠٥", "05"), era: u("ليه منطقية", "Why it's reasonable"),
        title: u("مين هيراجع ١٠٠ باكدج لكل مهندس؟", "Who will review 100 packages for each engineer?"),
        story: [u("في المصنع ٤٠ مهندس. لو كل واحد ثبّت اللي النموذج اقترحه، هيبقى فيه مئات الباكدجات بنسخ مختلفة على أجهزة الشركة، ومحدش هيعرف أنهي واحدة اتراجعت. وقسم الأمن قدامه خيارين: يمنع كله، أو يسمح بقايمة معتمدة بس ويراجع أي إضافة عليها.",
          "The plant has 40 engineers. If each installed what the model suggested, there would be hundreds of packages in different versions on company machines, and nobody would know which had been reviewed. The security team has two choices: block everything, or allow an approved list only and review every addition to it."),
        u("المصنع اختار المنع الكامل، لأنه أبسط وأوضح. ومهندس التخطيط فهم إن القاعدة مش ضده: القاعدة دي هي اللي بتخلّي الأداة اللي هيعملها تتنقل لأي جهاز في الشركة من غير ما حد يقلق.",
          "The plant chose a full block, because it is simpler and clearer. And the planning engineer understood that the rule isn't against him: it is what lets the tool he builds move to any machine in the company without anyone worrying.")],
        answer: u("احترم سياسة الأمن وابني جواها. لأن الأداة اللي ماشية على السياسة بتتنقل وتتعمّم، والأداة اللي بتتحايل عليها بتتقفل.", "Respect the security policy and build within it — a tool that follows the policy travels and spreads, and a tool that works around it gets shut down."),
        idea: u("القاعدة مش ضدك… هي اللي بتخلّي أداتك تتنقل.", "The rule isn't against you… it lets your tool travel.")
      },
      {
        id: "check", art: "pu_check", year: u("الفحص", "Check"), mark: u("٠٦", "06"), era: u("Python موجودة؟", "Is Python there?"),
        title: u("أول أمر: python --version", "The first command: python --version"),
        story: [u("قبل أي حاجة، فتح PowerShell وكتب python --version، وظهر: Python 3.12.4، يعني موجودة. لكن لو الأمر فتح Microsoft Store، يبقى Python مش متثبتة، والويندوز بيعرض عليك تنزّلها من المتجر. وده بالذات اللي ما ينفعش يحصل.",
          "Before anything else, he opened PowerShell and typed python --version, and it showed Python 3.12.4: it's there. But if the command opens the Microsoft Store, Python isn't installed, and Windows offers to download it from the store. That is exactly what must not happen."),
        u("لأن أي برنامج على جهاز الشركة لازم ييجي من الـ IT بالنسخة المعتمدة. وفيه كمان أمر py --version، بيشتغل على أجهزة كتير لو python ما اشتغلش. ومن يومها بقى ده أول سطر في أي شغل جديد.",
          "Because any program on a company machine must come from IT, in the approved version. There is also the command py --version, which works on many machines when python doesn't. Since that day it has been the first line of any new work.")],
        answer: u("اتأكد إن Python موجودة قبل ما تطلب أداة Python، ولو مش موجودة اطلبها من الـ IT. لأن نسخة من المتجر أو من أي موقع برّه سياسة الشركة زيها زي الباكدج.", "Check Python is there before asking for a Python tool, and if it isn't, ask IT for it — a copy from the store or any website is outside company policy, just like a package."),
        idea: u("سطر واحد… قبل أي أداة.", "One line… before any tool.")
      },
      {
        id: "rule", art: "pu_rule", year: u("القاعدة", "The rule"), mark: u("٠٧", "07"), era: u("أول سطر في الطلب", "The request's first line"),
        title: u("سطر واحد في أول الـ Prompt غيّر كل حاجة", "One line at the top of the Prompt changed everything"),
        story: [u("رجع للأداة وكتب في أول الطلب: «Python بالمكتبة القياسية بس. ممنوع pip install، وممنوع أي import من برّه المكتبة القياسية. لو محتاج دالة من باكدج، اكتبها بنفسك جوّه السكريبت، وقولّي في تعليق هي بدل إيه».",
          "He went back to the tool and wrote at the top of the request: “Python with the standard library only. No pip install, and no import from outside the standard library. If you need a function from a package, write it yourself inside the script, and tell me in a comment what it replaces.”"),
        u("الأداة رجعت بسكريبت ٤٠ سطر، فيه import csv وimport sqlite3 بس. اشتغل من أول مرة، وطلّع ٣٦ صف و١٬٧٦٥ جهاز، نفس اللي كانت pandas هتطلّعه. النموذج كان يقدر يكتبه كده من الأول، بس محدش طلب منه.",
          "The tool came back with a 40-line script holding only import csv and import sqlite3. It worked first time and produced 36 rows and 1,765 sets, the same as pandas would have. The model could have written it this way from the start; nobody had asked it to.")],
        answer: u("قول قاعدة المكتبة القياسية في أول سطر من أي طلب أداة. لأن النموذج بيختار الأشهر لو ما قلتلوش، والأشهر غالبًا باكدج.", "State the standard-library rule in the first line of any tool request — left alone, the model picks the most popular option, and that is usually a package."),
        idea: u("النموذج كان يقدر… بس محدش طلب منه.", "The model could have… nobody had asked it to.")
      },
      {
        id: "write", art: "pu_write", year: u("بنفسه", "Itself"), mark: u("٠٨", "08"), era: u("الدالة الناقصة", "The missing function"),
        title: u("اللي pandas كانت بتعمله… في ٦ سطور", "What pandas used to do… in 6 lines"),
        story: [u("الطلب التاني كان «اجمع الكمية لكل بلد». مع pandas ده سطر واحد. ومن غيرها، النموذج كتب دالة من ٦ سطور: قاموس فاضي، ولكل صف في الملف بيزوّد الكمية على البلد بتاعه، وفي الآخر بيرتّب. وفوق الدالة تعليق: «بدل pandas groupby().sum()».",
          "The second request was “sum the quantity per country”. With pandas that's one line. Without it, the model wrote a 6-line function: an empty dictionary; for each row in the file it adds the quantity to its country; at the end it sorts. Above the function a comment: “instead of pandas groupby().sum()”."),
        u("مهندس التخطيط قرا الست سطور وفهمهم، وده ما كانش هيحصل مع سطر pandas واحد. والنتيجة: مصر ٨٨٠، والكويت ٣٨٥، نفس مفتاح الإجابة. الكود أطول شوية، لكنه فاهم كل سطر فيه.",
          "The planning engineer read the six lines and understood them, which wouldn't have happened with one pandas line. The result: Egypt 880 and Kuwait 385, the same as the answer key. The code is a little longer, but he understands every line of it.")],
        answer: u("سيب النموذج يكتب الدالة الناقصة بنفسه، واطلب تعليق بيقول هي بدل إيه. لأن الكود اللي فاهم كل سطر فيه أسهل في المراجعة من سطر واحد وراه آلاف السطور اللي ما بتشوفهاش.", "Let the model write the missing function itself, and ask for a comment saying what it replaces — code whose every line you understand is easier to review than one line hiding thousands you never see."),
        idea: u("أطول شوية… لكن مفهوم.", "A little longer… but understood.")
      },
      {
        id: "map", art: "pu_map", year: u("البدائل", "Replacements"), mark: u("٠٩", "09"), era: u("بدل كل باكدج", "Instead of each package"),
        title: u("خريطة: بدل الباكدج المشهورة، نستخدم إيه؟", "A map: instead of the famous package, what do we use?"),
        story: [u("كتب خريطة صغيرة على ورقة: pandas للقراءة والتجميع ← csv وقاموس، أو sqlite3. openpyxl لقراءة إكسل ← PowerShell يحفظ الشيت CSV. pdfplumber لقراءة PDF ← re وzlib. plotly للرسوم ← رسم SVG مكتوب نص جوّه الصفحة. requests للنت ← مفيش، لأن مفيش نت.",
          "He wrote a small map on paper: pandas for reading and grouping → csv and a dictionary, or sqlite3. openpyxl for reading Excel → PowerShell saves the sheet as CSV. pdfplumber for reading PDF → re and zlib. plotly for charts → an SVG chart written as text inside the page. requests for the internet → none, because there is no internet."),
        u("الخريطة دي هتكمّل معانا الوحدة كلها، وكل درس جاي بيستخدم سطر منها. وحطها في ملف جنب الفولدر، علشان يديها للنموذج مع أي طلب جديد.",
          "This map stays with us through the whole unit, and every coming lesson uses a line of it. He put it in a file next to the folder, so he can give it to the model with any new request.")],
        answer: u("خلّي عندك خريطة بدائل جاهزة، وادّيها للنموذج مع الطلب. لأن النموذج بيكتب أسرع وأصح لما يعرف البديل المسموح من الأول.", "Keep a ready map of replacements and give it to the model with the request — the model writes faster and better when it knows the allowed replacement from the start."),
        idea: u("لكل باكدج… بديل من جوّه Python.", "For every package… an alternative inside Python.")
      },
      {
        id: "imports", art: "pu_imports", year: u("المراجعة", "The check"), mark: u("١٠", "10"), era: u("أول السكريبت", "The script's top"),
        title: u("اقرا سطور import… قبل ما تشغّل", "Read the import lines… before you run"),
        story: [u("بعد أسبوع، سكريبت جديد اشتغل على جهازه وفشل على جهاز زميل. لقى في نص الملف، مش في أوله، سطر import openpyxl جوّه دالة. النموذج حطه علشان «يسهّل» حفظ الإكسل، وعلى جهازه كان متثبت من زمان من غير ما يعرف.",
          "A week later, a new script worked on his machine and failed on a colleague's. In the middle of the file, not at its top, he found a line import openpyxl inside a function. The model had put it there to “simplify” saving Excel, and on his machine it had been installed long ago without his knowing."),
        u("ومن يومها بيعمل حاجتين: بيدوّر على كلمة import في الملف كله، وبيتأكد بأمر واحد إن الوحدة من المكتبة القياسية: python -c \"import sys; print('openpyxl' in sys.stdlib_module_names)\"، فيطبع False.",
          "Since that day he does two things: he searches the whole file for the word import, and he checks with one command that a module belongs to the standard library: python -c \"import sys; print('openpyxl' in sys.stdlib_module_names)\", which prints False.")],
        answer: u("دوّر على كل import في الملف كله، مش في أوله بس، واتأكد إنه من المكتبة القياسية. لأن سطر واحد في نص الملف ممكن يخلّي الأداة تشتغل عندك وتقف عند غيرك.", "Search for every import in the whole file, not only its top, and check it belongs to the standard library — one line in the middle of a file can make a tool work for you and stop for others."),
        idea: u("اشتغلت عندك… مش معناها إنها هتشتغل عند غيرك.", "It worked for you… doesn't mean it will work for others.")
      },
      {
        id: "limits", art: "pu_limits", year: u("الحدود", "Limits"), mark: u("١١", "11"), era: u("بصراحة", "Honestly"),
        title: u("فيه شغل ما ينفعش بـ Python النقي", "Some work doesn't fit pure Python"),
        story: [u("مش كل حاجة تنفع من غير باكدج. PDF ممسوح كصورة محتاج قراءة صور، ودي ما بتتعملش بشكل معقول بالمكتبة القياسية. وكمان نسخ كود باكدج جوّه فولدرك علشان تعدّي المنع ما يحلّش حاجة: ده لسه كود من برّه، بس من غير ما حد يعرف.",
          "Not everything is possible without a package. A PDF scanned as an image needs image reading, which the standard library can't do reasonably. And copying a package's code into your folder to get past the block solves nothing: it is still outside code, only now nobody knows."),
        u("والقاعدة اللي قسم الأمن قالها: «لو محتاج حاجة مش موجودة، اطلبها رسمي. أحيانًا بنضيفها للقايمة المعتمدة، وأحيانًا بنديك أداة تانية معتمدة. بس ما تتحايلش على المنع».",
          "And the rule the security team gave: “If you need something that isn't there, ask for it officially. Sometimes we add it to the approved list, and sometimes we give you another approved tool. But don't work around the block.”")],
        answer: u("لو الشغل محتاج باكدج فعلًا، اطلبها رسمي من قسم الأمن. لأن الطلب الرسمي ممكن يتوافق عليه، والتحايل بيخسّرك ثقة القسم في كل أدواتك.", "If the work really needs a package, request it officially from the security team — an official request can be approved, and a workaround costs you the team's trust in all your tools."),
        idea: u("اطلب رسمي… وما تتحايلش.", "Ask officially… don't work around it.")
      },
      {
        id: "cliff", art: "pu_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("جهاز مشرف الخط", "The line supervisor's PC"),
        title: u("الأداة جاهزة… والجهاز اللي هيشغّلها مالوش Python", "The tool is ready… and the PC that will run it has no Python"),
        story: [u("الأداة اشتغلت عنده بـ Python النقي. لكن اللي هيشغّلها كل أسبوع هو مشرف الخط، على جهازه هو. كتب على جهازه python --version، فاتفتح Microsoft Store. والـ IT قال إن تثبيت Python على الجهاز ده محتاج موافقة، وهياخد أسبوعين.",
          "The tool worked on his machine in pure Python. But the one who runs it every week is the line supervisor, on his own machine. He typed python --version there, and the Microsoft Store opened. IT said installing Python on that machine needs an approval and will take two weeks."),
        u("الأداة جاهزة، والملفات جاهزة، والجهاز مش جاهز. افتكر سؤال قسم الأمن التاني، وزميله في المصنع التاني اللي جهازه مالوش Python. ومن هنا بيبدأ الدرس الجاي: طب ولو الجهاز ما عليهوش Python أصلًا؟",
          "The tool is ready, the files are ready, and the machine isn't. He remembered the security team's second question, and his colleague at the other plant whose laptop has no Python. And here the next lesson begins: what if the machine has no Python at all?")],
        answer: u("واجب الدرس: شغّل python --version، وبعدين اطلب تحويل أي كود عندك فيه pandas لـ Python النقي، واقرا سطور import في الناتج. لأن السطور دي أول حاجة قسم الأمن هيقراها.", "The lesson's homework: run python --version, then ask for any code of yours that uses pandas to be turned into pure Python, and read the import lines of the result — those lines are the first thing the security team will read."),
        idea: u("الأداة لازم تشتغل على جهاز اللي هيستخدمها… مش على جهازك بس.", "A tool must work on the machine of the person who uses it… not only on yours.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.pureStory]);
})(window.ACADEMY = window.ACADEMY || {});
