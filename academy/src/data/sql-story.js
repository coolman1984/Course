/* SQL and SQLite — the story deck of lesson k6 (unit 4), on step 5 of Unit4_Example_1_Two_Weeks.
   The planning engineer at the second plant carries every slide with one question: «إزاي أسأل الجداول أسئلة كتير
   بسرعة، ومن غير تثبيت؟». The deck goes from six questions to a one-file database: what SQL is, what SQLite is, why it
   ships inside Python, CREATE TABLE, INSERT with ? marks, the check after writing, SELECT … GROUP BY, WHERE, JOIN as
   VLOOKUP, and the honest limits; it ends on export figures arriving as a PDF, which opens k7.
   Figures come from data/easy-projects.js. Drawings are the sq_* entries in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.sqlStory = {
    id: "sql", lesson: "k6",
    kicker: u("SQL وSQLite · الحكاية في ٨ دقايق", "SQL and SQLite · the story in 8 minutes"),
    title: u("قاعدة بيانات في ملف واحد… جاية جوّه Python", "A database in one file… inside Python"),
    lead: u("فاكر الستة أسئلة اللي المدير بعتها؟ في الحكاية دي مهندسة التخطيط بتحط جدول الأسبوعين في قاعدة بيانات، وبتسأله بلغة عمرها أكتر من خمسين سنة، ولسه أهم لغة للبيانات.",
      "Remember the six questions the manager sent? In this story the planning engineer puts the two weeks' table into a database and asks it in a language more than fifty years old, still the most important language for data."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي أسأل الجداول أسئلة كتير بسرعة، ومن غير تثبيت؟", "How do I ask tables many questions quickly, with no install?"),
    finalQuestion: u("طب لو الأرقام جاية في تقرير PDF؟", "And what if the figures arrive in a PDF report?"),
    note: u("الأوامر مكتوبة بـ SQL اللي SQLite بتفهمها، وهي نفسها تقريبًا في أي قاعدة بيانات. الأرقام من المثال الأول، وكلها توضيحية.", "The commands are SQL as SQLite understands it, almost the same in any database. The figures come from the first example; all are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("SQL وSQLite، في شرائح", "SQL and SQLite, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "questions", art: "sq_questions", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("٦ أسئلة", "6 questions"),
        title: u("كل سؤال… فلتر جديد", "Each question… a new filter"),
        story: [u("مهندسة التخطيط بدأت تجاوب أسئلة المدير في إكسل: فلتر على M108، وجدول محوري بالخطوط. بعدين فلتر على KW، وجدول محوري تاني. بعدين أسبوع ١ قصاد ٢. بعد ساعة كانت عاملة ٦ شيتات، ومش متأكدة إن كل فلتر اتشال قبل اللي بعده.",
          "The planning engineer started answering the manager's questions in Excel: a filter on M108 and a pivot by line. Then a filter on KW and another pivot. Then week 1 against week 2. An hour later she had made 6 sheets, and wasn't sure every filter had been cleared before the next."),
        u("الزميل قالها: «الأسئلة دي ليها لغة مخصوص، بتكتبي فيها السؤال جملة، والجدول يرد. والملف اللي بيرد موجود جوّه Python اللي عندك». والسؤال اللي ماشي معانا: إزاي أسأل الجداول أسئلة كتير بسرعة، ومن غير تثبيت؟",
          "The colleague told her: “These questions have a language of their own: you write the question as a sentence, and the table answers. And what answers is already inside your Python.” The question we carry: how do I ask tables many questions quickly, with no install?")],
        answer: u("لما الأسئلة على نفس الجدول تكتر، اكتبها كجمل بدل ما تعمل فلاتر بإيدك. لأن الجملة المكتوبة بتتقري وتتكرر، والفلتر اللي اتعمل بالإيد بيتنسي.", "When questions about the same table multiply, write them as sentences instead of filtering by hand — a written sentence can be read and repeated; a hand filter gets forgotten."),
        idea: u("السؤال المكتوب… بيتقري ويتكرر.", "A written question… is read and repeated.")
      },
      {
        id: "sql", art: "sq_sql", year: u("SQL", "SQL"), mark: u("٠٢", "02"), era: u("من السبعينات", "Since the seventies"),
        title: u("SQL: لغة الأسئلة على الجداول", "SQL: the language for asking tables"),
        story: [u("«SQL اختصار Structured Query Language، يعني لغة الاستعلام المنظّمة. اتعملت في IBM في السبعينات، ولسه لحد النهارده هي اللغة اللي كل قواعد البيانات بتفهمها، من البنوك لأنظمة المصانع».",
          "“SQL stands for Structured Query Language. It was made at IBM in the seventies, and to this day it is the language every database understands, from banks to factory systems.”"),
        u("كتبلها على ورقة: SELECT CountryName, SUM(Qty) FROM Production GROUP BY CountryName. «اقريها إنجليزي: هات اسم البلد ومجموع الكمية، من جدول الإنتاج، مجمّعة بالبلد». الجملة قريبة من الكلام، وده اللي خلّاها تعيش خمسين سنة.",
          "He wrote on paper: SELECT CountryName, SUM(Qty) FROM Production GROUP BY CountryName. “Read it as English: bring the country name and the sum of the quantity, from the production table, grouped by country.” The sentence is close to speech, which is why it has lived fifty years.")],
        answer: u("اتعلّم تقرا جملة SQL حتى لو النموذج هو اللي بيكتبها. لأن قراية السؤال قبل تشغيله بتطمنك إن ده فعلًا السؤال اللي إنت قصدته.", "Learn to read a SQL sentence even if the model writes it — reading the question before running it reassures you it's really the question you meant."),
        idea: u("جملة قريبة من الكلام… عاشت خمسين سنة.", "A sentence close to speech… has lived fifty years.")
      },
      {
        id: "sqlite", art: "sq_sqlite", year: u("SQLite", "SQLite"), mark: u("٠٣", "03"), era: u("ملف واحد", "One file"),
        title: u("SQLite: قاعدة بيانات كاملة في ملف واحد", "SQLite: a full database in one file"),
        story: [u("«قواعد البيانات الكبيرة محتاجة خادم شغال طول الوقت، وصلاحيات، وناس من الـ IT. SQLite حاجة تانية: القاعدة كلها ملف واحد، Factory.db، على جهازك. تنسخيه، تبعتيه، تحطيه جنب الأداة».",
          "“Big databases need a server running all the time, permissions, and people from IT. SQLite is different: the whole database is one file, Factory.db, on your machine. You copy it, send it, put it next to the tool.”"),
        u("«ومش لعبة: SQLite جوّه كل موبايل وكل متصفح في العالم، وأكتر قاعدة بيانات مستخدمة على الإطلاق. خفيفة لأنها مكتبة صغيرة بتقرا وتكتب ملف، مش برنامج قاعد مستني حد يتصل بيه».",
          "“And it's no toy: SQLite is inside every phone and every browser in the world, the most used database there is. It's light because it's a small library reading and writing a file, not a program sitting and waiting for someone to connect.”")],
        answer: u("لجداول شغلك على جهازك، SQLite كفاية: ملف واحد من غير خادم. لأن القاعدة اللي ليها خادم محتاجة صيانة وصلاحيات مالهاش لازمة لشغل شخص واحد.", "For your work's tables on your machine, SQLite is enough: one file, no server — a server database needs maintenance and permissions that one person's work doesn't need."),
        idea: u("قاعدة بيانات… بتتنسخ زي أي ملف.", "A database… copied like any file.")
      },
      {
        id: "inside", art: "sq_inside", year: u("جوّه Python", "Inside Python"), mark: u("٠٤", "04"), era: u("من غير تثبيت", "No install"),
        title: u("مش محتاجة تثبيت: جاية جوّه Python", "No install needed: it comes inside Python"),
        story: [u("«طب هسطّبها إزاي؟ هتحتاج موافقة؟» «ولا حاجة. Python جاية ومعاها وحدة اسمها sqlite3، من المكتبة القياسية. اكتبي import sqlite3 وخلاص». وعلشان تتأكد، كتبت: python -c \"import sqlite3; print(sqlite3.sqlite_version)\"، فطلع رقم النسخة.",
          "“How do I install it? Will I need approval?” “Nothing. Python ships with a module called sqlite3, from the standard library. Write import sqlite3 and that's it.” To make sure, she typed: python -c \"import sqlite3; print(sqlite3.sqlite_version)\", and the version number came out."),
        u("«فاكرة خريطة البدائل؟ بدل pandas: csv أو sqlite3. دي التانية. وقسم الأمن مش هيسأل عليها، لأنها جزء من Python نفسها اللي هو وافق عليها».",
          "“Remember the replacements map? Instead of pandas: csv or sqlite3. This is the second one. And the security team won't ask about it, because it is part of Python itself, which they approved.”")],
        answer: u("قبل ما تدوّر على أداة قاعدة بيانات، استخدم sqlite3 اللي جوّه Python. لأنها موجودة على أي جهاز عليه Python، ومش محتاجة أي موافقة جديدة.", "Before looking for a database tool, use the sqlite3 inside Python — it's on any machine with Python, and needs no new approval."),
        idea: u("import sqlite3… وخلاص.", "import sqlite3… that's it.")
      },
      {
        id: "create", art: "sq_create", year: u("CREATE", "CREATE"), mark: u("٠٥", "05"), era: u("شكل الجدول", "The table's shape"),
        title: u("CREATE TABLE: قول للقاعدة شكل الجدول", "CREATE TABLE: tell the database the table's shape"),
        story: [u("لصقت Prompt_5. السكريبت load_sqlite.py بدأ بجملة: CREATE TABLE Production (Date TEXT, LineCode TEXT, ModelCode TEXT, CountryCode TEXT, Qty INTEGER, SourceFile TEXT, CountryName TEXT). سبع أعمدة، كل واحد بنوعه.",
          "She pasted Prompt_5. The script load_sqlite.py began with a sentence: CREATE TABLE Production (Date TEXT, LineCode TEXT, ModelCode TEXT, CountryCode TEXT, Qty INTEGER, SourceFile TEXT, CountryName TEXT). Seven columns, each with its type."),
        u("«ليه Qty مكتوب INTEGER؟» «علشان القاعدة تعرف إنه رقم. لو اتخزّن نص، الترتيب يطلع غلط، ٩ قبل ١٠٠، والجمع ممكن يتلخبط». فهمت إن السطر ده هو نفسه دليل البيانات اللي اتعلمته في الوحدة التانية، بس مكتوب للقاعدة.",
          "“Why is Qty written INTEGER?” “So the database knows it's a number. Stored as text, sorting comes out wrong, 9 before 100, and sums can get muddled.” She understood that this line is the very data dictionary she learned in unit 2, written for the database.")],
        answer: u("عرّف كل عمود بنوعه في CREATE TABLE، والأرقام أرقام. لأن العمود اللي نوعه غلط بيطلّع ترتيب وجمع غلط من غير أي رسالة.", "Define every column with its type in CREATE TABLE, and numbers as numbers — a column of the wrong type gives wrong sorting and sums without any message."),
        idea: u("CREATE TABLE… دليل البيانات للقاعدة.", "CREATE TABLE… the data dictionary for the database.")
      },
      {
        id: "insert", art: "sq_insert", year: u("INSERT", "INSERT"), mark: u("٠٦", "06"), era: u("علامات ?", "? marks"),
        title: u("INSERT: الصفوف تدخل… من الباب الآمن", "INSERT: the rows go in… by the safe door"),
        story: [u("السكريبت قرا Two_Weeks.csv بـ csv، وكتب الصفوف بجملة: INSERT INTO Production VALUES (?, ?, ?, ?, ?, ?, ?). الزميل وقفها عند علامات الاستفهام: «دي أماكن فاضية، وsqlite3 بتحط القيم فيها بنفسها».",
          "The script read Two_Weeks.csv with csv and wrote the rows with a sentence: INSERT INTO Production VALUES (?, ?, ?, ?, ?, ?, ?). The colleague stopped her at the question marks: “These are empty slots, and sqlite3 fills in the values itself.”"),
        u("«ليه مش نلزق القيم في الجملة على طول؟» «لأن قيمة فيها علامة غريبة، زي اسم فيه ' ممكن تكسر الجملة، أو تغيّر معناها. علامات ? بتخلّي القيمة قيمة، عمرها ما تبقى جزء من الأمر». قاعدة صغيرة بتقفل باب كبير.",
          "“Why not glue the values straight into the sentence?” “Because a value holding an odd mark, like a name with a ' in it, can break the sentence or change its meaning. The ? marks keep a value a value, never part of the command.” A small rule that shuts a big door.")],
        answer: u("اكتب الصفوف بعلامات ? مش بلزق القيم في جملة SQL. لأن القيمة الملزوقة ممكن تكسر الجملة أو تغيّر معناها، وعلامة ? بتمنع ده.", "Write rows with ? marks, never by gluing values into the SQL sentence — a glued value can break the sentence or change its meaning, and ? prevents that."),
        idea: u("القيمة تفضل قيمة… مش أمر.", "A value stays a value… never a command.")
      },
      {
        id: "check", art: "sq_check", year: u("المراجعة", "The check"), mark: u("٠٧", "07"), era: u("بعد الكتابة", "After writing"),
        title: u("اسأل القاعدة: إنتي شايلة كام؟", "Ask the database: how much do you hold?"),
        story: [u("بعد الكتابة، السكريبت سأل القاعدة نفسها: SELECT COUNT(*), SUM(Qty) FROM Production. الرد: ٣٦ صف و١٬٧٦٥ جهاز، نفس اللي قراه من الـ CSV. والسجل كتب: «Factory.db: ٣٦ صف، ١٬٧٦٥ جهاز».",
          "After writing, the script asked the database itself: SELECT COUNT(*), SUM(Qty) FROM Production. The reply: 36 rows and 1,765 sets, the same as it read from the CSV. And the log recorded: “Factory.db: 36 rows, 1,765 sets”."),
        u("«ليه نسألها؟ ما إحنا لسه كاتبين». «علشان الكتابة ممكن تفوّت صفوف لو حاجة غلطت في النص. والمقارنة اللي بتتعمل من القاعدة نفسها هي اللي بتثبت إن اللي جوّاها مظبوط». نفس البوابة من الدرس اللي فات.",
          "“Why ask? We just wrote it.” “Because writing can skip rows if something goes wrong midway. A comparison made from the database itself is what proves its contents are right.” The same gate as in the previous lesson.")],
        answer: u("بعد ما تكتب في القاعدة، اسألها العدد والإجمالي وقارنهم بالمصدر. لأن الكتابة ممكن تفوّت صفوف وهي ساكتة، والقاعدة بس هي اللي بتقول الحقيقة عن نفسها.", "After writing to the database, ask it for the count and the total and compare them with the source — writing can skip rows in silence, and only the database tells the truth about itself."),
        idea: u("اسأل القاعدة… مش الكود.", "Ask the database… not the code.")
      },
      {
        id: "select", art: "sq_select", year: u("SELECT", "SELECT"), mark: u("٠٨", "08"), era: u("GROUP BY", "GROUP BY"),
        title: u("سؤال واحد… جملة واحدة… إجابة في ثانية", "One question… one sentence… an answer in a second"),
        story: [u("أول سؤال: الكمية لكل بلد. الجملة: SELECT CountryName, SUM(Qty) FROM Production GROUP BY CountryName ORDER BY SUM(Qty) DESC. الإجابة: مصر ٨٨٠، والكويت ٣٨٥، والإمارات ٢٤٥، والأردن ١٣٥، والسعودية ١٢٠. نفس تقرير الخطوة ٣ بعد التصليح.",
          "The first question: quantity per country. The sentence: SELECT CountryName, SUM(Qty) FROM Production GROUP BY CountryName ORDER BY SUM(Qty) DESC. The answer: Egypt 880, Kuwait 385, the UAE 245, Jordan 135 and Saudi Arabia 120. The same as step 3's report after the fix."),
        u("GROUP BY هو الجدول المحوري بتاع SQL: بيجمّع الصفوف اللي ليها نفس القيمة، وSUM بيجمع الكمية لكل مجموعة. والسكريبت كتب السؤال وجملته وإجابته في Query_Results.txt، فأي حد يقدر يقرا ويتأكد.",
          "GROUP BY is SQL's pivot table: it gathers rows sharing a value, and SUM adds the quantity for each group. The script wrote the question, its sentence and its answer into Query_Results.txt, so anyone can read and verify.")],
        answer: u("احفظ كل سؤال بجملة الـ SQL بتاعته وإجابته في ملف. لأن الإجابة اللي جنبها السؤال بالظبط بتتراجع وتتكرر الشهر الجاي بنفس الجملة.", "Save each question with its SQL sentence and its answer in a file — an answer beside its exact question can be checked, and repeated next month with the same sentence."),
        idea: u("GROUP BY… الجدول المحوري بالكلام.", "GROUP BY… the pivot table in words.")
      },
      {
        id: "where", art: "sq_where", year: u("WHERE", "WHERE"), mark: u("٠٩", "09"), era: u("فلتر في الجملة", "A filter in the sentence"),
        title: u("WHERE: الفلتر جوّه السؤال", "WHERE: the filter inside the question"),
        story: [u("سؤال المدير: «أنهي خط عمل أكتر M108؟». كتبته بالكلام للأداة، فرجعت بجملة: SELECT LineCode, SUM(Qty) FROM Production WHERE ModelCode = 'M108' GROUP BY LineCode. قرتها قبل التشغيل: WHERE هو الفلتر، وفاهمة الباقي.",
          "The manager's question: “Which line made the most M108?” She wrote it in words to the tool, which came back with: SELECT LineCode, SUM(Qty) FROM Production WHERE ModelCode = 'M108' GROUP BY LineCode. She read it before running: WHERE is the filter, and she understood the rest."),
        u("الإجابة: L03 ‏٣٤٥، وL01 ‏٢١٠، وL02 ‏٤٥. والمرة دي ما فيش فلتر اتنسي مفتوح في شيت، لأن الفلتر مكتوب جوّه السؤال نفسه، وبيخلص بخلاصه.",
          "The answer: L03 345, L01 210, L02 45. This time no filter was left forgotten on a sheet, because the filter is written inside the question itself, and ends with it.")],
        answer: u("اسأل بالكلام وخلّي النموذج يكتب الـ SQL، بس اقراها قبل التشغيل. لأن WHERE غلط بيجاوب سؤال تاني غير اللي إنت سألته.", "Ask in words and let the model write the SQL, but read it before running — a wrong WHERE answers a different question from the one you asked."),
        idea: u("الفلتر جوّه السؤال… بيخلص بخلاصه.", "A filter inside the question… ends with it.")
      },
      {
        id: "join", art: "sq_join", year: u("JOIN", "JOIN"), mark: u("١٠", "10"), era: u("VLOOKUP بتاع القواعد", "The database's VLOOKUP"),
        title: u("JOIN: لما الاسم في جدول تاني", "JOIN: when the name lives in another table"),
        story: [u("الزميل سألها: «لو جدول الإنتاج فيه الكود بس، والأسماء في جدول Countries لوحده؟» وكتب: SELECT c.CountryName, SUM(p.Qty) FROM Production p JOIN Countries c ON c.CountryCode = p.CountryCode GROUP BY c.CountryName.",
          "The colleague asked her: “What if the production table held only the code, and the names were in a separate Countries table?” He wrote: SELECT c.CountryName, SUM(p.Qty) FROM Production p JOIN Countries c ON c.CountryCode = p.CountryCode GROUP BY c.CountryName."),
        u("«JOIN ده VLOOKUP بتاع قواعد البيانات: بيربط الجدولين بعمود مشترك، وكل صف بياخد اسمه من الجدول التاني». فاكرة عمود VLOOKUP في الخطوة ٢؟ نفس الفكرة بالظبط، والدرس الجاي هيستخدمها مع جدول جاي من PDF.",
          "“JOIN is the database's VLOOKUP: it links the two tables on a shared column, and each row takes its name from the other table.” Remember the VLOOKUP column in step 2? Exactly the same idea, and the next lesson uses it with a table that comes from a PDF.")],
        answer: u("خلّي الأسماء في جدول لوحده واربطها بـ JOIN، زي ما بتعمل VLOOKUP من Masters. لأن الاسم اللي بيتغيّر في مكان واحد بيتغيّر في كل الإجابات.", "Keep names in a table of their own and link them with JOIN, as you do VLOOKUP from Masters — a name changed in one place changes in every answer."),
        idea: u("JOIN… هو VLOOKUP بالكلام.", "JOIN… is VLOOKUP in words.")
      },
      {
        id: "limits", art: "sq_limits", year: u("الحدود", "Limits"), mark: u("١١", "11"), era: u("إمتى لأ", "When not"),
        title: u("SQLite ليها حدود… ومعروفة", "SQLite has limits… known ones"),
        story: [u("«SQLite بتكتب من مكان واحد في نفس اللحظة. لو عشرين حد هيكتبوا في نفس القاعدة من على الشبكة طول اليوم، ده شغل قاعدة بيانات على خادم، مع الـ IT. وما تفتحيش ملف ‎.db في إكسل ولا في المفكرة: ده مش نص».",
          "“SQLite writes from one place at a time. If twenty people will write to the same database over the network all day, that's a server database's job, with IT. And never open a .db file in Excel or Notepad: it isn't text.”"),
        u("«ولو كل اللي عندك جدول واحد صغير وسؤال واحد، جدول محوري في إكسل أسرع. القاعدة تستاهل لما الجداول تبقى أكتر من واحد، أو الأسئلة بتتكرر كل شهر، أو الصفوف أكبر من إكسل».",
          "“And if all you have is one small table and one question, a pivot table in Excel is faster. A database earns its place when there's more than one table, the questions repeat every month, or the rows outgrow Excel.”")],
        answer: u("استخدم SQLite لجداول بتتسأل كتير على جهاز واحد، ومش لقاعدة بيكتب فيها ناس كتير مع بعض. لأن كل أداة ليها حجم بتلمع فيه، وبرّاه بتتعب.", "Use SQLite for much-questioned tables on one machine, not for a database many people write to at once — every tool has a size where it shines, and beyond it, struggles."),
        idea: u("لكل أداة… حجم بتلمع فيه.", "Every tool… has its size.")
      },
      {
        id: "cliff", art: "sq_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("تقرير PDF", "A PDF report"),
        title: u("المدير مبسوط… وفيه تقرير بيتكتب بالإيد كل شهر", "The manager is pleased… and a report is retyped every month"),
        story: [u("الستة أسئلة اتجاوبوا في عشر دقايق، وكل إجابة جنبها جملتها. المدير قال: «حلو. طب مبيعات التصدير بتجيلنا من النظام PDF كل شهر، وزميلك بيكتب أرقامها بإيده في إكسل. الشهر اللي فات غلط في رقمين».",
          "The six questions were answered in ten minutes, each answer beside its sentence. The manager said: “Good. Now, export sales come to us from the system as a PDF every month, and your colleague types its figures by hand into Excel. Last month he got two figures wrong.”"),
        u("مهندسة التخطيط فتحت الـ PDF: جدول واحد، ١٢ صف، وتحته سطر الإجمالي. الأرقام قدامها، بس محبوسة في ملف معمول للقراية مش للحساب. والسؤال اللي الدرس الجاي بيبدأ بيه: طب لو الأرقام جاية في تقرير PDF؟",
          "The planning engineer opened the PDF: one table, 12 rows, and the Total line beneath. The figures are right there, but locked in a file made for reading, not for calculating. And the question the next lesson opens with: what if the figures arrive in a PDF report?")],
        answer: u("واجب الدرس: شغّل Prompt_5 (أو Solution/Run_load_sqlite.bat وقارن)، وبعدين اسأل سؤال بالكلام، وخلّي النموذج يكتب الـ SQL، واقراها قبل التشغيل. لأن القاعدة دي هتستقبل جدول تاني في الدرس الجاي.", "This lesson's task: run Prompt_5 (or Solution/Run_load_sqlite.bat and compare), then ask a question in words, let the model write the SQL, and read it before running — this database receives another table next lesson."),
        idea: u("الأرقام قدامك… بس محبوسة في PDF.", "The figures are in front of you… locked in a PDF.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.sqlStory]);
})(window.ACADEMY = window.ACADEMY || {});
