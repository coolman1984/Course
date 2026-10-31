/* One PDF into a database — the story deck of lesson k7 (unit 4), on step 1 of Unit4_Example_2_PDF_to_HTML.
   The planning engineer of unit 3 carries every slide with one question: «إزاي أرقام الـ PDF توصل لقاعدة
   البيانات من غير ما تتنقل بإيد؟». The deck goes from retyping to extraction: what data extraction is, text PDF or
   scan, looking first, what is inside a PDF page, the rows between the header and the Total line, thousands separators,
   the Total line as the check, the database with JOIN, the deliberate stop, and the better source; it ends on the
   meeting tomorrow, which opens k8. Figures come from data/easy-projects.js. Drawings are the pd_* entries. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.pdfStory = {
    id: "pdf", lesson: "k7",
    kicker: u("من PDF لقاعدة بيانات · الحكاية في ٨ دقايق", "From a PDF to a database · the story in 8 minutes"),
    title: u("الأرقام تطلع من الـ PDF… من غير ما حد يكتبها", "The figures leave the PDF… with nobody retyping them"),
    lead: u("فاكر تقرير التصدير اللي زميل بيكتب أرقامه بإيده كل شهر؟ في الحكاية دي مهندس التخطيط بيطلّع الأرقام بسكريبت Python نقي، وبيراجعها على سطر الإجمالي اللي النظام نفسه طابعه.",
      "Remember the export report whose figures a colleague types by hand every month? In this story the planning engineer extracts the figures with a pure-Python script, and checks them against the total line the system itself prints."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي أرقام الـ PDF توصل لقاعدة البيانات من غير ما حد ينقلها بإيده؟", "How do a PDF's figures reach the database without anyone moving them by hand?"),
    finalQuestion: u("طب الإدارة هتشوف الأرقام دي إزاي؟", "And how will management see these figures?"),
    note: u("الطريقة دي للـ PDF المكتوب اللي النظام بيطلّعه، مش للمستندات الممسوحة ضوئيًا. الأرقام من المثال التاني، وكلها توضيحية.", "This method suits text PDFs printed by a system, not scanned documents. The figures come from the second example; all are illustrative."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("من PDF لقاعدة بيانات، في شرائح", "From a PDF to a database, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "retype", art: "pd_retype", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("كتابة بالإيد", "Retyping"),
        title: u("١٢ صف… بيتكتبوا بالإيد كل شهر", "12 rows… retyped every month"),
        story: [u("زميل في المبيعات بيفتح Export_Sales كل شهر، ويكتب الـ ١٢ صف في إكسل بإيده: البلد، والموديل، والكمية، والمبلغ. الشهر اللي فات كتب ١٬١٦٣٬٠٠٠ بدل ١٬١٣٦٬٠٠٠، ونسي صف كامل، ومحدش اكتشف ده غير المدير.",
          "A colleague in sales opens Export_Sales every month and types its 12 rows into Excel by hand: the country, the model, the quantity, the amount. Last month he typed 1,163,000 instead of 1,136,000 and skipped a whole row, and only the manager noticed."),
        u("والغلط مش ذنبه: ١٢ صف بأرقام طويلة، والتركيز بيقل مع الوقت. ومهندس التخطيط فكّر إن الأرقام موجودة جوّه الملف أصلًا، والنظام هو اللي كتبها. والسؤال اللي معانا في الحكاية دي: إزاي أرقام الـ PDF توصل لقاعدة البيانات من غير ما حد ينقلها بإيده؟",
          "And the mistake isn't his fault: 12 rows of long figures, and attention fades over time. The planning engineer thought: the figures are already inside the file; the system wrote them. The question we carry in this story: how do a PDF's figures reach the database without anyone moving them by hand?")],
        answer: u("أي أرقام بتتنقل بالإيد من ملف لملف كل شهر، دوّر لها على طريقة تتنقل بيها لوحدها. لأن النقل بالإيد بيعمل غلط صغير ساكت، والغلط الصغير بيكبر في التقارير.", "Any figures copied by hand from file to file every month need a way to move by themselves — hand copying makes small silent mistakes, and small mistakes grow in reports."),
        idea: u("الأرقام موجودة… والنظام هو اللي كتبها.", "The figures are there… the system wrote them.")
      },
      {
        id: "extract", art: "pd_extract", year: u("الاستخراج", "Extraction"), mark: u("٠٢", "02"), era: u("من القراءة للحساب", "From reading to calculating"),
        title: u("استخراج البيانات: من ملف للقراءة لجدول للحساب", "Data extraction: from a file for reading to a table for calculating"),
        story: [u("ده اسمه «استخراج البيانات». الـ PDF معمول علشان يتقري ويتطبع، وشكله ثابت على أي جهاز. لكنه مش معمول للحساب: ما تقدرش تجمع عمود فيه. والاستخراج بينقل الأرقام لجدول معمول للحساب.",
          "This is called “data extraction”. A PDF is made to be read and printed, with the same look on any machine. But it isn't made for calculating: you can't sum a column in it. Extraction moves the figures into a table made for calculating."),
        u("والجدول ده رايح لقاعدة البيانات اللي اتعلمناها في الدرس اللي فات: Exports.db، فيها جدول Exports جنب جدول Countries. ومن هناك تقدر تسأل أي سؤال SQL، وتعمل أي تقرير.",
          "And that table goes into the database we learned in the last lesson: Exports.db, holding an Exports table next to a Countries table. From there you can ask any SQL question and make any report.")],
        answer: u("الـ PDF للقراءة، والجدول للحساب: انقل الأرقام مرة واحدة بالكود، واحسب من الجدول. لأن الحساب من ملف معمول للقراءة بيرجّعك للنقل بالإيد.", "The PDF is for reading and the table for calculating: move the figures once by code, and calculate from the table — calculating from a file made for reading drags you back to copying by hand."),
        idea: u("الـ PDF يتقري… والجدول يتحسب.", "A PDF is read… a table is calculated.")
      },
      {
        id: "text", art: "pd_text", year: u("مكتوب ولا صورة؟", "Text or image?"), mark: u("٠٣", "03"), era: u("اختبار في ثانية", "A one-second test"),
        title: u("ظلّل كلمة… بتتنسخ؟", "Select a word… does it copy?"),
        story: [u("قبل أي حاجة، ظلّل كلمة Kuwait في الـ PDF ونسخها في المفكرة، فاتنسخت. يبقى ده PDF مكتوب: جواه النص نفسه، والكود يقدر يقراه. ولو كان ورقة اتمسحت بالسكانر، كان هيبقى صورة، والكلمة ما كانتش هتتظلّل أصلًا.",
          "Before anything else, he highlighted the word Kuwait in the PDF and copied it into Notepad, and it copied. So this is a text PDF: it holds the text itself, and code can read it. Had it been paper put through a scanner, it would be an image, and the word wouldn't highlight at all."),
        u("والـ PDF الممسوح محتاج قراءة صور، ودي ما بتتعملش بشكل معقول بـ Python النقي. ساعتها الحل إنك تسأل الـ IT، أو تطلب من النظام نسخة تانية. لكن التقارير اللي النظام بيطلّعها لوحده، زي التقرير ده، غالبًا مكتوبة.",
          "A scanned PDF needs image reading, which pure Python can't do reasonably. Then the answer is to ask IT, or to ask the system for another copy. But reports the system produces by itself, like this one, are usually text.")],
        answer: u("اختبر الـ PDF الأول: لو الكلمة بتتظلّل وتتنسخ، يبقى ينفع يتقري بالكود. لأن الـ PDF الممسوح صورة، ومحتاج أداة تانية خالص.", "Test the PDF first: if a word selects and copies, code can read it — a scanned PDF is an image, and needs a different tool altogether."),
        idea: u("اتنسخت؟ يبقى نص.", "It copied? Then it's text.")
      },
      {
        id: "look", art: "pd_look", year: u("بص الأول", "Look first"), mark: u("٠٤", "04"), era: u("٢٠ سطر", "20 lines"),
        title: u("أول خطوة: اطبعلي أول ٢٠ سطر", "First step: print me the first 20 lines"),
        story: [u("لصق Prompt_1، وأوله: «قبل أي استخراج، اكتب سكريبت صغير يطبع أول ٢٠ سطر نص من الـ PDF، واستنى نشوفهم مع بعض». السكريبت طبع: العنوان، وسطر الفترة، وسطر العناوين، والصفوف، وسطر Total، وسطر رقم الصفحة.",
          "He pasted Prompt_1, which begins: “Before any extraction, write a small script that prints the PDF's first 20 lines of text, and wait so we look at them together.” The script printed the title, the period line, the header line, the rows, the Total line and the page-number line."),
        u("كده الأداة شافت الشكل الحقيقي قبل ما تخمّن: الأرقام فيها فاصلة الآلاف، والإجمالي في سطر لوحده أوله Total، وفيه سطور تحت الجدول مالهاش علاقة بالبيانات. وكل ده بقى قواعد في السكريبت.",
          "So the tool saw the real shape before guessing: the figures carry thousands separators, the total sits on a line of its own starting with Total, and there are lines under the table that have nothing to do with the data. All of that became rules in the script.")],
        answer: u("خلّي الأداة تطبع شكل الـ PDF الحقيقي قبل ما تكتب الاستخراج. لأن كل PDF ليه شكله، والاستخراج المبني على تخمين بيقرا سطر غلط أو بيفوّت سطر.", "Have the tool print the PDF's real shape before writing the extraction — each PDF has its own shape, and an extraction built on a guess reads the wrong line or skips one."),
        idea: u("شوف الشكل… قبل ما تقرا.", "See the shape… before you read.")
      },
      {
        id: "inside", art: "pd_inside", year: u("جوّه الـ PDF", "Inside a PDF"), mark: u("٠٥", "05"), era: u("x وy", "x and y"),
        title: u("الصفحة جوّه الـ PDF: «اكتب النص ده هنا»", "The page inside the PDF: “write this text here”"),
        story: [u("لما فتح الـ PDF كنص خام، لقى سطور زي ‎1 0 0 1 40 643 Tm (KW) Tj. يعني الصفحة مش جدول، الصفحة أوامر بتقول: اكتب النص ده عند النقطة x وy. كلمة KW عند x = 40 وy = 643، والمبلغ بتاعها على نفس الـ y، لكن على اليمين.",
          "When he opened the PDF as raw text, he found lines like 1 0 0 1 40 643 Tm (KW) Tj. The page isn't a table; it is commands saying: write this text at the point x, y. The word KW sits at x = 40, y = 643, and its amount on the same y, but to the right."),
        u("فالسكريبت بيجمع كل نص بمكانه، ويحط اللي على نفس الـ y في سطر واحد، ويرتّبه من الشمال لليمين. وأحيانًا الأوامر دي بتبقى مضغوطة، فبيفتحها بـ zlib، ودي برضه من المكتبة القياسية. فاكر خريطة البدائل؟ re وzlib بدل pdfplumber.",
          "So the script collects every text with its place, puts what shares a y on one line, and sorts it from left to right. Sometimes these commands are compressed, so it opens them with zlib, also from the standard library. Remember the map of alternatives? re and zlib instead of pdfplumber.")],
        answer: u("الـ PDF من جوّه نصوص في أماكن، والصف هو كل اللي على نفس السطر. لأن فهم الشكل ده بيخلّيك تقرا أي تقرير من النظام بالمكتبة القياسية، من غير باكدج.", "Inside, a PDF is texts at positions: a row is everything on the same line — understanding that lets you read any system report with the standard library, no package."),
        idea: u("الصف… هو كل اللي على نفس السطر.", "A row… is all that sits on one line.")
      },
      {
        id: "rows", art: "pd_rows", year: u("الصفوف", "The rows"), mark: u("٠٦", "06"), era: u("من العناوين لـ Total", "Headers to Total"),
        title: u("الصفوف: بعد العناوين… وقبل Total", "The rows: after the headers… before Total"),
        story: [u("القاعدة اللي اتكتبت: دوّر على سطر العناوين بالظبط (CountryCode، ModelCode، Qty، NetSales). اللي بعده صفوف، لحد سطر أوله Total. وأي سطر قبل العناوين أو بعد Total، زي العنوان ورقم الصفحة، مش بيانات.",
          "The rule written down: look for the exact header line (CountryCode, ModelCode, Qty, NetSales). What follows are rows, down to a line starting with Total. Any line before the headers or after Total, like the title or the page number, isn't data."),
        u("والصف لازم يكون ٤ قيم، وأوله كود بلد من حرفين. السكريبت طلّع ١٢ صف: ٤ بلاد × ٣ موديلات. ولو النظام زوّد بلد الشهر الجاي؟ القاعدة هتلاقيه لوحدها، لأنها بتقرا لحد Total، مش عدد ثابت.",
          "And a row must be 4 values, beginning with a two-letter country code. The script found 12 rows: 4 countries × 3 models. And if the system adds a country next month? The rule finds it by itself, because it reads down to Total, not a fixed count.")],
        answer: u("حدّد الصفوف بعلامات من التقرير نفسه (العناوين وTotal)، مش بعدد ثابت ولا بمكان الحروف. لأن عدد الصفوف بيتغيّر كل شهر، والعلامات بتفضل زي ما هي.", "Mark out the rows with signs in the report itself (the headers and Total), never a fixed count or character positions — the row count changes every month; the signs stay."),
        idea: u("العلامات بتفضل… والعدد بيتغيّر.", "The signs stay… the count changes.")
      },
      {
        id: "numbers", art: "pd_numbers", year: u("الأرقام", "Figures"), mark: u("٠٧", "07"), era: u("فاصلة الآلاف", "Thousands separators"),
        title: u("«1,183,000» نص… مش رقم", "“1,183,000” is text… not a number"),
        story: [u("الأرقام في الـ PDF مكتوبة زي ما الإنسان بيقراها: 1,183,000. والكود بيشوفها نص فيه فاصلتين؛ لو حاول يجمعها هيوقف، أو أسوأ: يقرا 1 بس ويكمّل. علشان كده السكريبت بيشيل الفاصلة الأول، وبعدين يحوّلها رقم صحيح: 1183000.",
          "The figures in the PDF are written the way people read them: 1,183,000. The code sees text with two commas; if it tried to add it up it would stop, or worse, read only 1 and carry on. That's why the script removes the commas first, then turns it into a whole number: 1183000."),
        u("وفي بلاد تانية الفاصلة بتبقى نقطة، والنقطة فاصلة. علشان كده القاعدة مكتوبة صراحة في الطلب: الأرقام فيها فاصلة الآلاف. سطر واحد في الـ Prompt بيمنع غلطة كانت ممكن تعدّي من غير ما حد ياخد باله.",
          "In other countries the comma is a point and the point a comma. That's why the rule is stated plainly in the request: the figures carry thousands separators. One line in the Prompt prevents a mistake that could have slipped by unnoticed.")],
        answer: u("اكتب شكل الأرقام صراحة في الطلب، واتأكد إن السكريبت بيحوّلها أرقام قبل الجمع. لأن الرقم اللي اتقرا نص بيطلّع مجموع غلط أو ناقص من غير رسالة.", "State the figures' format plainly in the request, and make sure the script turns them into numbers before summing — a figure read as text gives a wrong or partial sum without a message."),
        idea: u("الفاصلة للعين… مش للحساب.", "The comma is for the eye… not for maths.")
      },
      {
        id: "total", art: "pd_total", year: u("سطر الإجمالي", "The Total line"), mark: u("٠٨", "08"), era: u("المراجعة الجاهزة", "A ready check"),
        title: u("النظام نفسه إدّانا المراجعة", "The system itself gave us the check"),
        story: [u("آخر الجدول سطر Total: ٤٧٠ جهاز و٤٬١٦٨٬٠٠٠ جنيه. السكريبت جمع الـ ١٢ صف بنفسه وقارن: ٤٧٠ = ٤٧٠، و٤٬١٦٨٬٠٠٠ = ٤٬١٦٨٬٠٠٠، وكتب في السجل: «١٢ صف، ٤٧٠ جهاز، ٤٬١٦٨٬٠٠٠ جنيه: نفس سطر Total».",
          "At the end of the table is the Total line: 470 sets and EGP 4,168,000. The script added up the 12 rows itself and compared: 470 = 470, and 4,168,000 = 4,168,000, then wrote in the log: “12 rows, 470 sets, 4,168,000 EGP: the same as the Total line”."),
        u("ولو صف ما اتقراش، أو رقم اتقرا غلط، المجموع مش هيساوي، والسكريبت هيوقف قبل ما يكتب أي حاجة في القاعدة. ودي أحسن من أي مراجعة بنعملها إحنا، لأنها جاية من المصدر نفسه.",
          "If a row wasn't read, or a figure was read wrong, the sum won't match, and the script stops before writing anything to the database. That is better than any check we make ourselves, because it comes from the source itself.")],
        answer: u("لو التقرير فيه إجمالي، خلّي الأداة تقارن مجموعها بيه، وتوقف لو اختلفوا. لأن الإجمالي اللي النظام طابعه مراجعة جاهزة من المصدر، ومن غير أي مجهود.", "If the report holds a total, let the tool compare its sum with it, and stop if they differ — the total printed by the system is a ready check from the source, at no effort."),
        idea: u("الإجمالي المطبوع… مراجعة جاهزة.", "A printed total… a ready check.")
      },
      {
        id: "db", art: "pd_db", year: u("القاعدة", "The database"), mark: u("٠٩", "09"), era: u("Exports وCountries", "Exports and Countries"),
        title: u("الصفوف في القاعدة… والأسماء بـ JOIN", "The rows in the database… names by JOIN"),
        story: [u("بعد ما المراجعة عدّت، السكريبت كتب Exports.db: جدول Exports فيه الـ ١٢ صف، ومعاهم Month من اسم الملف (2026-07) وSourceFile، وجدول Countries من Countries.csv. وبعد الكتابة سأل القاعدة تاني عن COUNT وSUM، وطلعت نفس الأرقام.",
          "Once the check passed, the script wrote Exports.db: an Exports table with the 12 rows, each with Month from the file name (2026-07) and SourceFile, and a Countries table from Countries.csv. After writing, it asked the database again for COUNT and SUM, and the same figures came back."),
        u("وبعدين سؤال واحد بـ JOIN: مبيعات كل بلد بالاسم. والإجابة: الكويت ١٬١٨٣٬٠٠٠، والسعودية ١٬١٣٦٬٠٠٠، والأردن ١٬٠٩١٬٠٠٠، والإمارات ٧٥٨٬٠٠٠. الأرقام اللي كانت بتتكتب بالإيد بقت جاهزة في ثواني.",
          "Then one question with JOIN: each country's sales by name. The answer: Kuwait 1,183,000, Saudi Arabia 1,136,000, Jordan 1,091,000 and the Emirates 758,000. The figures that used to be typed by hand are ready in seconds.")],
        answer: u("سجّل مع كل صف هو جاي منين (الشهر والملف)، وراجع القاعدة بعد الكتابة. لأن الصف اللي مصدره معروف بيتراجع ويتصلّح، واللي مصدره مش معروف بيفضل علامة استفهام.", "Record with each row where it came from (the month and the file), and check the database after writing — a row with a known source can be checked and fixed; one without stays a question mark."),
        idea: u("كل صف… عارف هو جاي منين.", "Every row… knows where it came from.")
      },
      {
        id: "stop", art: "pd_stop", year: u("الوقفة", "The stop"), mark: u("١٠", "10"), era: u("تجربة مقصودة", "A deliberate test"),
        title: u("شال الكويت… والأداة وقفت", "He removed Kuwait… and the tool stopped"),
        story: [u("زي الدرس اللي فات، جرّب غلطة مقصودة: في نسخة من الفولدر، شال سطر KW من Countries.csv وشغّل. الأداة قرت الـ PDF وراجعت الإجمالي، وبعدين وقفت برسالة: «أكواد بلاد مش موجودة في Countries.csv: KW»، ومن غير ما تكتب ولا صف في القاعدة.",
          "As in the last lesson, he tried a deliberate mistake: in a copy of the folder, he removed the KW line from Countries.csv and ran it. The tool read the PDF, checked the total, then stopped with a message: “country codes missing from Countries.csv: KW”, without writing a single row to the database."),
        u("لو كانت كمّلت، كانت الكويت هتظهر في التقرير من غير اسم، أو تختفي من الـ JOIN خالص، ومبيعاتها (١٬١٨٣٬٠٠٠) كانت هتضيع من الصورة. والوقفة الواضحة أحسن بكتير من تقرير ناقص شكله سليم.",
          "Had it carried on, Kuwait would have shown in the report with no name, or vanished from the JOIN altogether, and its sales (1,183,000) would have dropped out of the picture. A clear stop is far better than an incomplete report that looks sound.")],
        answer: u("جرّب الأداة على نسخة فيها كود ناقص من الماستر، ولازم توقف قبل ما تكتب. لأن الـ JOIN بيشيل الصفوف اللي مالهاش اسم من غير ما يقول.", "Test the tool on a copy with a code missing from the master, and it must stop before writing — a JOIN drops rows with no match without saying so."),
        idea: u("الـ JOIN ساكت… والأداة لازم تنبّه.", "The JOIN stays silent… the tool must warn.")
      },
      {
        id: "better", art: "pd_better", year: u("الأحسن", "Better"), mark: u("١١", "11"), era: u("الـ PDF آخر حل", "PDF is the last resort"),
        title: u("لو النظام بيطلّع CSV… خُده", "If the system can produce a CSV… take it"),
        story: [u("وبصراحة: اللي عملناه شغال، لكن لو النظام يقدر يطلّع نفس الأرقام Excel أو CSV، اطلبها كده. الملف أثبت من أي قراءة PDF: لو النظام غيّر شكل التقرير، الاستخراج ممكن يحتاج تعديل، والـ CSV لأ.",
          "And frankly: what we built works, but if the system can produce the same figures as Excel or CSV, ask for them that way. A file is steadier than any PDF reading: if the system changes the report's layout, the extraction may need changing, and a CSV doesn't."),
        u("وفاكر الوحدة التالتة؟ هناك وورد هو اللي فتح الـ PDF بطريقة COM. دي طريقة تانية من غير Python، أبطأ، لكنها مفيدة لو الجهاز ما عليهوش Python. وترتيب الكتاب واضح: الملف أو الـ API الأول، والباقي بعده.",
          "And remember unit 3? There, Word opened the PDF through COM. That is another way without Python, slower, but useful if the machine has no Python. The book's order is clear: the file or the API first, and the rest after.")],
        answer: u("اسأل الأول: النظام يقدر يطلّع الأرقام ملف بيانات؟ ولو لأ، استخرج من الـ PDF وراجع على الإجمالي. لأن أثبت مصدر هو اللي مش محتاج قراءة أصلًا.", "Ask first: can the system export the figures as a data file? If not, extract from the PDF and check against the total — the most stable source is the one that needs no reading at all."),
        idea: u("الـ PDF آخر حل… مش أول حل.", "The PDF is the last resort… not the first.")
      },
      {
        id: "cliff", art: "pd_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("اجتماع بكرة", "Tomorrow's meeting"),
        title: u("الأرقام جاهزة… والاجتماع بكرة", "The figures are ready… and the meeting is tomorrow"),
        story: [u("مدير المبيعات اتصل: «عندي اجتماع بكرة مع الإدارة، وعايز أعرض أرقام التصدير. هفتحها على الموبايل، وأعرضها على شاشة القاعة، ومن غير ما حد يثبّت حاجة، والنت في القاعة ضعيف».",
          "The sales manager called: “I have a meeting with management tomorrow, and I want to show the export figures. I'll open them on my phone and show them on the room's screen, with nobody installing anything, and the internet in the room is weak.”"),
        u("مهندس التخطيط بص للقاعدة: Exports.db فيها كل حاجة، لكن ملف ‎.db ما بيتفتحش على موبايل، والإدارة مش هتقرا جدول. ومن هنا بيبدأ الدرس الجاي: طب الإدارة هتشوف الأرقام دي إزاي؟",
          "The planning engineer looked at the database: Exports.db holds everything, but a .db file won't open on a phone, and management won't read a table. And here the next lesson begins: so how will management see these figures?")],
        answer: u("واجب الدرس: نزّل المثال التاني، وشغّل Prompt_1، وجرّب الوقفة بإنك تشيل الكويت من ملف البلاد في نسخة، وقارن صف واحد بعينك مع الـ PDF. لأن القاعدة دي هي اللي الصفحة الجاية هتتبني منها.", "The lesson's homework: download the second example, run Prompt_1, test the stop by removing Kuwait from the countries file in a copy, and compare one row by eye with the PDF — this database is what the next page will be built from."),
        idea: u("القاعدة للحساب… والإدارة محتاجة صورة.", "The database is for calculating… management needs a picture.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.pdfStory]);
})(window.ACADEMY = window.ACADEMY || {});
