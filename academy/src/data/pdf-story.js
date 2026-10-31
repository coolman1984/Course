/* One PDF into a database — the story deck of lesson k7 (unit 4), on step 1 of Unit4_Example_2_PDF_to_HTML.
   The planning engineer at the second plant carries every slide with one question: «إزاي أرقام الـ PDF توصل لقاعدة
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
    lead: u("فاكر تقرير التصدير اللي زميلك بيكتبه بإيده كل شهر؟ في الحكاية دي مهندسة التخطيط بتطلّع أرقامه بسكريبت Python نقي، وبتراجعها على سطر الإجمالي اللي النظام نفسه طابعه.",
      "Remember the export report your colleague retypes every month? In this story the planning engineer extracts its figures with a pure-Python script, and checks them against the Total line the system itself printed."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("إزاي أرقام الـ PDF توصل لقاعدة البيانات من غير ما تتنقل بإيد؟", "How do a PDF's figures reach the database without being copied by hand?"),
    finalQuestion: u("طب الإدارة هتشوف الأرقام دي إزاي؟", "And how will management see these figures?"),
    note: u("الطريقة دي للـ PDF المكتوب اللي النظام بيطلّعه، مش للمستندات الممسوحة. الأرقام من المثال التاني، وكلها توضيحية.", "This method suits text PDFs printed by a system, not scanned documents. The figures come from the second example; all are illustrative."),
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
        story: [u("زميلها في المبيعات بيفتح Export_Sales كل شهر، ويكتب الـ ١٢ صف في إكسل بإيده: البلد، والموديل، والكمية، والمبلغ. الشهر اللي فات كتب ١٬١٦٣٬٠٠٠ بدل ١٬١٣٦٬٠٠٠، ونسي صف كامل. محدش اكتشف غير المدير.",
          "Her colleague in sales opens Export_Sales every month and types the 12 rows into Excel by hand: country, model, quantity, amount. Last month he typed 1,136,000 as 1,163,000, and skipped a whole row. Nobody noticed except the manager."),
        u("«مش ذنبه. ١٢ صف بأرقام طويلة، والتركيز بيقل مع الوقت». مهندسة التخطيط فكّرت: الأرقام موجودة جوّه الملف، النظام كتبها. والسؤال اللي ماشي معانا: إزاي أرقام الـ PDF توصل لقاعدة البيانات من غير ما تتنقل بإيد؟",
          "“It's not his fault. Twelve rows of long figures, and eyes get tired.” The planning engineer thought: the figures are inside the file; the system wrote them. The question we carry: how do a PDF's figures reach the database without being copied by hand?")],
        answer: u("أي أرقام بتتنقل بالإيد من ملف لملف كل شهر، دوّر لها على طريقة تتنقل لوحدها. لأن النقل بالإيد بيغلط غلط صغير ساكت، والغلط الصغير بيكبر في التقارير.", "Any figures copied by hand from file to file every month need a way to move by themselves — hand copying makes small silent mistakes, and small mistakes grow in reports."),
        idea: u("الأرقام موجودة… النظام كتبها.", "The figures are there… the system wrote them.")
      },
      {
        id: "extract", art: "pd_extract", year: u("الاستخراج", "Extraction"), mark: u("٠٢", "02"), era: u("من القراية للحساب", "From reading to calculating"),
        title: u("استخراج البيانات: من ملف للقراية لجدول للحساب", "Data extraction: from a file for reading to a table for calculating"),
        story: [u("الزميل سمّاها: «استخراج البيانات. الـ PDF معمول علشان يتقري ويتطبع: شكله ثابت على أي جهاز. بس مش معمول علشان يتحسب: ما تقدريش تجمعي عمود فيه. الاستخراج بينقل الأرقام لجدول معمول للحساب».",
          "The colleague named it: “Data extraction. A PDF is made to be read and printed: it looks the same on any machine. But it isn't made to be calculated: you can't sum a column in it. Extraction moves the figures into a table made for calculating.”"),
        u("«والجدول ده هيروح فين؟» «لقاعدة البيانات اللي اتعلمتيها في الدرس اللي فات: Exports.db، جدول Exports جنب جدول Countries. ومن هناك أي سؤال SQL، وأي تقرير».",
          "“And where will that table go?” “Into the database you learned last lesson: Exports.db, an Exports table next to a Countries table. From there, any SQL question, any report.”")],
        answer: u("الـ PDF للقراية، والجدول للحساب: انقل الأرقام مرة بالكود، واحسب من الجدول. لأن الحساب من ملف معمول للقراية بيرجّعك للنقل بالإيد.", "The PDF is for reading and the table for calculating: move the figures once by code, and calculate from the table — calculating from a file made for reading drags you back to copying by hand."),
        idea: u("الـ PDF يتقري… الجدول يتحسب.", "A PDF is read… a table is calculated.")
      },
      {
        id: "text", art: "pd_text", year: u("مكتوب ولا صورة؟", "Text or image?"), mark: u("٠٣", "03"), era: u("اختبار في ثانية", "A one-second test"),
        title: u("ظلّل كلمة… تتنسخ؟", "Select a word… does it copy?"),
        story: [u("قبل أي حاجة، ظلّلت كلمة Kuwait في الـ PDF ونسختها في المفكرة: اتنسخت. «يبقى PDF مكتوب: جوّاه النص نفسه، والكود يقدر يقراه». ولو كان ورقة اتمسحت بالسكانر، كان هيبقى صورة، والكلمة ما كانتش هتتظلّل أصلًا.",
          "Before anything, she selected the word Kuwait in the PDF and copied it into Notepad: it copied. “So it's a text PDF: it holds the text itself, and code can read it.” Had it been a scanned paper, it would be an image, and the word couldn't even be selected."),
        u("«والممسوح؟» «محتاج قراءة صور، ودي ما بتتعملش بشكل معقول بـ Python النقي. ساعتها اسألي الـ IT، أو اطلبي من النظام نسخة تانية. والتقارير اللي النظام بيطلّعها لوحده، زي ده، غالبًا مكتوبة».",
          "“And a scanned one?” “It needs image reading, which can't reasonably be done in pure Python. Then ask IT, or ask the system for another copy. Reports the system prints by itself, like this one, are usually text.”")],
        answer: u("اختبر الـ PDF الأول: لو الكلمة بتتظلّل وتتنسخ يبقى ينفع يتقري بالكود. لأن الـ PDF الممسوح صورة، ومحتاج أداة تانية خالص.", "Test the PDF first: if a word selects and copies, code can read it — a scanned PDF is an image, and needs a different tool altogether."),
        idea: u("اتنسخت؟ يبقى نص.", "It copied? Then it's text.")
      },
      {
        id: "look", art: "pd_look", year: u("بص الأول", "Look first"), mark: u("٠٤", "04"), era: u("٢٠ سطر", "20 lines"),
        title: u("أول خطوة: اطبعلي أول ٢٠ سطر", "First step: print me the first 20 lines"),
        story: [u("لصقت Prompt_1، وأوله: «قبل أي استخراج، اكتب سكريبت صغير يطبع أول ٢٠ سطر نص من الـ PDF، واستنى أشوفهم معاك». السكريبت طبع: العنوان، وسطر الفترة، وسطر العناوين، والصفوف، وسطر Total، وسطر رقم الصفحة.",
          "She pasted Prompt_1, which starts: “Before any extraction, write a small script that prints the PDF's first 20 lines of text, and wait for us to look at them together.” The script printed: the title, the period line, the header row, the rows, the Total line, and the page-number line."),
        u("الأداة شافت الشكل الحقيقي قبل ما تخمّن: الأرقام فيها فاصلة الآلاف، والإجمالي في سطر لوحده أوله Total، وفيه سطور تحت الجدول مالهاش علاقة بالبيانات. كل ده بقى قواعد في السكريبت.",
          "The tool saw the real shape before guessing: the figures carry thousands separators, the total sits on its own line starting with Total, and there are lines under the table unrelated to the data. All of that became rules in the script.")],
        answer: u("خلّي الأداة تطبع شكل الـ PDF الحقيقي قبل ما تكتب الاستخراج. لأن كل PDF له شكله، والاستخراج المبني على تخمين بيقرا سطر غلط أو يفوّت سطر.", "Have the tool print the PDF's real shape before writing the extraction — each PDF has its own shape, and an extraction built on a guess reads the wrong line or skips one."),
        idea: u("شوف الشكل… قبل ما تقرا.", "See the shape… before you read.")
      },
      {
        id: "inside", art: "pd_inside", year: u("جوّه الـ PDF", "Inside a PDF"), mark: u("٠٥", "05"), era: u("x وy", "x and y"),
        title: u("الصفحة جوّه الـ PDF: «اكتب ده هنا»", "A PDF page inside: “write this here”"),
        story: [u("الزميل فتح الـ PDF كنص خام: سطور زي ‎1 0 0 1 40 643 Tm (KW) Tj. «الصفحة مش جدول: هي أوامر بتقول اكتب النص ده عند النقطة x وy. KW عند x = 40 وy = 643، والمبلغ بتاعه على نفس الـ y بس على اليمين».",
          "The colleague opened the PDF as raw text: lines like 1 0 0 1 40 643 Tm (KW) Tj. “The page isn't a table: it's instructions saying write this text at point x, y. KW at x = 40 and y = 643, and its amount on the same y, but to the right.”"),
        u("«فالسكريبت بيلم كل نص بمكانه، ويجمّع اللي على نفس الـ y في سطر واحد، ويرتّبه من الشمال لليمين. وأحيانًا الأوامر دي مضغوطة، فبيفتحها بـ zlib، ودي برضه من المكتبة القياسية». فاكرة خريطة البدائل؟ re وzlib بدل pdfplumber.",
          "“So the script collects each text with its position, groups what sits on the same y into one line, and orders it left to right. Sometimes these instructions are compressed, so it opens them with zlib, also from the standard library.” Remember the replacements map? re and zlib instead of pdfplumber.")],
        answer: u("الـ PDF من جوّه نصوص في أماكن: الصف هو كل اللي على نفس السطر. لأن فهم الشكل ده بيخلّيك تقرا أي تقرير نظام بالمكتبة القياسية من غير باكدج.", "Inside, a PDF is texts at positions: a row is everything on the same line — understanding that lets you read any system report with the standard library, no package."),
        idea: u("الصف… هو كل اللي على نفس السطر.", "A row… is all that sits on one line.")
      },
      {
        id: "rows", art: "pd_rows", year: u("الصفوف", "The rows"), mark: u("٠٦", "06"), era: u("من العناوين لـ Total", "Headers to Total"),
        title: u("الصفوف: بعد العناوين… وقبل Total", "The rows: after the headers… before Total"),
        story: [u("القاعدة اللي اتكتبت: دوّر على سطر العناوين بالظبط (CountryCode، ModelCode، Qty، NetSales). اللي بعده صفوف، لحد سطر أوله Total. أي سطر قبل العناوين أو بعد Total، زي العنوان ورقم الصفحة، مش بيانات.",
          "The rule written: find the header line exactly (CountryCode, ModelCode, Qty, NetSales). What follows are rows, down to a line starting with Total. Any line before the headers or after Total, like the title or the page number, isn't data."),
        u("والصف لازم يبقى ٤ قيم، وأوله كود بلد من حرفين. السكريبت طلّع ١٢ صف: ٤ بلاد × ٣ موديلات. «ولو النظام زوّد بلد الشهر الجاي؟ القاعدة هتلاقيه لوحدها، لأنها بتقرا لحد Total، مش عدد ثابت».",
          "And a row must hold 4 values, starting with a two-letter country code. The script extracted 12 rows: 4 countries × 3 models. “And if the system adds a country next month? The rule finds it by itself, because it reads down to Total, not a fixed count.”")],
        answer: u("حدّد الصفوف بعلامات في التقرير نفسه (العناوين وTotal)، مش بعدد ثابت ولا بمكان الحروف. لأن عدد الصفوف بيتغيّر كل شهر، والعلامات بتفضل.", "Mark out the rows with signs in the report itself (the headers and Total), never a fixed count or character positions — the row count changes every month; the signs stay."),
        idea: u("العلامات بتفضل… العدد بيتغيّر.", "The signs stay… the count changes.")
      },
      {
        id: "numbers", art: "pd_numbers", year: u("الأرقام", "Figures"), mark: u("٠٧", "07"), era: u("فاصلة الآلاف", "Thousands separators"),
        title: u("«1,183,000» نص… مش رقم", "“1,183,000” is text… not a number"),
        story: [u("الأرقام في الـ PDF مكتوبة زي ما الإنسان بيقراها: 1,183,000. بالنسبة للكود ده نص، فيه فاصلتين. لو حاول يجمعه هيقف، أو أسوأ: يقرا 1 بس ويكمّل. السكريبت بيشيل الفاصلة الأول، وبعدين يحوّله رقم صحيح: 1183000.",
          "Figures in the PDF are written the way a person reads them: 1,183,000. To the code that's text with two commas. Trying to sum it, it stops, or worse: reads just 1 and carries on. The script removes the commas first, then turns it into a whole number: 1183000."),
        u("«وفي بلاد تانية الفاصلة بتبقى نقطة، والنقطة فاصلة. علشان كده القاعدة مكتوبة صريحة في الطلب: الأرقام فيها فاصلة الآلاف». سطر واحد في الـ Prompt بيمنع غلطة كانت ممكن تعدّي من غير ما حد ياخد باله.",
          "“In other countries the comma is a dot and the dot a comma. That's why the rule is written plainly in the request: the figures carry thousands separators.” One line in the Prompt prevents a mistake that could have slipped by unnoticed.")],
        answer: u("قول شكل الأرقام صراحة في الطلب، واتأكد إن السكريبت بيحوّلها أرقام قبل الجمع. لأن رقم اتقرا نص بيطلّع مجموع غلط أو ناقص من غير رسالة.", "State the figures' format plainly in the request, and make sure the script turns them into numbers before summing — a figure read as text gives a wrong or partial sum without a message."),
        idea: u("الفاصلة للعين… مش للحساب.", "The comma is for the eye… not for maths.")
      },
      {
        id: "total", art: "pd_total", year: u("سطر الإجمالي", "The Total line"), mark: u("٠٨", "08"), era: u("المراجعة الجاهزة", "A ready check"),
        title: u("النظام نفسه ادّانا المراجعة", "The system itself gave us the check"),
        story: [u("آخر الجدول سطر Total: ٤٧٠ جهاز و٤٬١٦٨٬٠٠٠ جنيه. السكريبت جمع الـ ١٢ صف بنفسه، وقارن: ٤٧٠ = ٤٧٠، و٤٬١٦٨٬٠٠٠ = ٤٬١٦٨٬٠٠٠. وكتب في السجل: «١٢ صف، ٤٧٠ جهاز، ٤٬١٦٨٬٠٠٠ جنيه: نفس سطر Total».",
          "At the table's end, the Total line: 470 sets and EGP 4,168,000. The script summed the 12 rows itself and compared: 470 = 470, and 4,168,000 = 4,168,000. It logged: “12 rows, 470 sets, EGP 4,168,000: the same as the Total line”."),
        u("«لو صف ما اتقراش، أو رقم اتقرا غلط، المجموع مش هيساوي، والسكريبت هيقف قبل ما يكتب حاجة في القاعدة. ده أحسن من أي مراجعة إحنا نعملها، لأنه جاي من المصدر نفسه».",
          "“If a row wasn't read, or a figure was read wrong, the sum won't match, and the script stops before writing anything to the database. That beats any check we could make, because it comes from the source itself.”")],
        answer: u("لو التقرير فيه إجمالي، خلّي الأداة تقارن مجموعها بيه وتوقف لو اختلفوا. لأن الإجمالي اللي النظام طابعه مراجعة جاهزة من المصدر، ومجانية.", "If the report holds a total, have the tool compare its own sum with it and stop if they differ — a total printed by the system is a ready check from the source, and free."),
        idea: u("الإجمالي المطبوع… مراجعة جاهزة.", "A printed total… a ready check.")
      },
      {
        id: "db", art: "pd_db", year: u("القاعدة", "The database"), mark: u("٠٩", "09"), era: u("Exports وCountries", "Exports and Countries"),
        title: u("الصفوف في القاعدة… والأسماء بـ JOIN", "The rows in the database… names by JOIN"),
        story: [u("بعد ما المراجعة عدّت، السكريبت كتب Exports.db: جدول Exports فيه الـ ١٢ صف، ومعاهم Month من اسم الملف (2026-07) وSourceFile. وجدول Countries من Countries.csv. وبعد الكتابة سأل القاعدة تاني: COUNT وSUM. نفس الأرقام.",
          "Once the check passed, the script wrote Exports.db: an Exports table holding the 12 rows, with Month from the file name (2026-07) and SourceFile. And a Countries table from Countries.csv. After writing it asked the database again: COUNT and SUM. The same figures."),
        u("وبعدين سؤال واحد بـ JOIN: مبيعات كل بلد بالاسم. الإجابة: الكويت ١٬١٨٣٬٠٠٠، والسعودية ١٬١٣٦٬٠٠٠، والأردن ١٬٠٩١٬٠٠٠، والإمارات ٧٥٨٬٠٠٠. الأرقام اللي كانت بتتكتب بالإيد، بقت جاهزة في ثواني.",
          "Then one question with JOIN: each country's sales by name. The answer: Kuwait 1,183,000, Saudi Arabia 1,136,000, Jordan 1,091,000 and the UAE 758,000. Figures that used to be retyped were ready in seconds.")],
        answer: u("سجّل مع كل صف هو جه منين (الشهر والملف)، وراجع القاعدة بعد الكتابة. لأن الصف اللي مصدره معروف بيتراجع ويتصلّح، واللي مصدره مجهول بيفضل علامة استفهام.", "Record with each row where it came from (the month and the file), and check the database after writing — a row with a known source can be checked and fixed; one without stays a question mark."),
        idea: u("كل صف… عارف جه منين.", "Every row… knows where it came from.")
      },
      {
        id: "stop", art: "pd_stop", year: u("الوقفة", "The stop"), mark: u("١٠", "10"), era: u("تجربة متعمّدة", "A deliberate test"),
        title: u("مسحت الكويت… والأداة وقفت", "She deleted Kuwait… and the tool stopped"),
        story: [u("زي الدرس اللي فات، جرّبت غلطة متعمّدة: في نسخة من الفولدر، مسحت سطر KW من Countries.csv، وشغّلت. الأداة قرت الـ PDF، وراجعت الإجمالي، وبعدين وقفت: «أكواد بلاد مش موجودة في Countries.csv: KW». وما كتبتش ولا صف في القاعدة.",
          "As in the last lesson, she tried a deliberate fault: in a copy of the folder she deleted the KW line from Countries.csv and ran it. The tool read the PDF, checked the total, then stopped: “country codes missing from Countries.csv: KW”. And wrote not a single row to the database."),
        u("«لو كانت كمّلت، كانت الكويت هتطلع في التقرير من غير اسم، أو تختفي من JOIN خالص، ومبيعاتها ١٬١٨٣٬٠٠٠ هتضيع من الصورة». الوقفة الواضحة أحسن ألف مرة من تقرير ناقص شكله سليم.",
          "“Had it carried on, Kuwait would have shown in the report with no name, or vanished from the JOIN entirely, and its 1,183,000 lost from the picture.” A clear stop is a thousand times better than an incomplete report that looks sound.")],
        answer: u("جرّب الأداة على نسخة فيها كود ناقص من الماستر، ولازم توقف قبل ما تكتب. لأن الـ JOIN بيشيل الصفوف اللي ملهاش اسم من غير ما يقول.", "Test the tool on a copy with a code missing from the master, and it must stop before writing — a JOIN drops rows with no match without saying so."),
        idea: u("الـ JOIN بيسكت… الأداة لازم تتكلم.", "A JOIN stays silent… the tool must speak.")
      },
      {
        id: "better", art: "pd_better", year: u("الأحسن", "Better"), mark: u("١١", "11"), era: u("الـ PDF آخر حل", "PDF is the last resort"),
        title: u("لو النظام يطلّع CSV… خُده", "If the system can export CSV… take it"),
        story: [u("الزميل قالها بصراحة: «اللي عملناه شغال، بس لو النظام يقدر يطلّع نفس الأرقام Excel أو CSV، اطلبيها كده. الملف أثبت من أي قراءة PDF: لو النظام غيّر شكل التقرير، الاستخراج ممكن يحتاج تعديل، والـ CSV لأ».",
          "The colleague told her frankly: “What we built works, but if the system can export the same figures as Excel or CSV, ask for that. A file is more stable than any PDF reading: if the system changes the report's layout, the extraction may need changes; a CSV won't.”"),
        u("«وفاكرة الوحدة التالتة؟ هناك وورد هو اللي فتح الـ PDF بطريقة COM. طريقة تانية من غير Python، أبطأ، بس مفيدة لو الجهاز ما عليهوش Python». ترتيب الكتاب: الملف أو الـ API الأول، والباقي بعده.",
          "“And remember unit 3? There Word opened the PDF through COM. Another way, with no Python: slower, but useful when the machine has no Python.” The book's order: a file or an API first, the rest after.")],
        answer: u("اسأل الأول: النظام يقدر يطلّع الأرقام ملف بيانات؟ ولو لأ، استخرج من الـ PDF وراجع على الإجمالي. لأن أثبت مصدر هو اللي ما بيحتاجش قراءة أصلًا.", "Ask first: can the system export the figures as a data file? If not, extract from the PDF and check against the total — the most stable source is the one that needs no reading at all."),
        idea: u("الـ PDF آخر حل… مش أول حل.", "The PDF is the last resort… not the first.")
      },
      {
        id: "cliff", art: "pd_cliff", year: u("الخطوة الجاية", "Next step"), mark: u("١٢", "12"), era: u("اجتماع بكرة", "Tomorrow's meeting"),
        title: u("الأرقام جاهزة… والاجتماع بكرة", "The figures are ready… and the meeting is tomorrow"),
        story: [u("مدير المبيعات اتصل: «عندي اجتماع بكرة مع الإدارة، عايز أعرض أرقام التصدير. هفتحها على الموبايل، وأعرضها على شاشة القاعة. ومن غير ما حد يسطّب حاجة، والنت في القاعة ضعيف».",
          "The sales manager called: “I have a meeting with management tomorrow, and I want to present the export figures. I'll open them on my phone, and show them on the room's screen. With nobody installing anything, and the internet in the room is weak.”"),
        u("مهندسة التخطيط بصّت للقاعدة: Exports.db فيها كل حاجة، بس ملف ‎.db ما بيتفتحش على موبايل، والإدارة مش هتقرا جدول. والسؤال اللي الدرس الجاي بيبدأ بيه: طب الإدارة هتشوف الأرقام دي إزاي؟",
          "The planning engineer looked at the database: Exports.db holds everything, but a .db file doesn't open on a phone, and management won't read a table. And the question the next lesson opens with: how will management see these figures?")],
        answer: u("واجب الدرس: نزّل المثال التاني، وشغّل Prompt_1، وجرّب الوقفة بمسح الكويت من ملف البلاد في نسخة، وقارن صف واحد بعينك مع الـ PDF. لأن القاعدة دي هي اللي الصفحة الجاية هتتبني منها.", "This lesson's task: download the second example, run Prompt_1, test the stop by deleting Kuwait from the countries file in a copy, and compare one row by eye with the PDF — this database is what the next page is built from."),
        idea: u("القاعدة للحساب… والإدارة محتاجة صورة.", "The database is for calculating… management needs a picture.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.pdfStory]);
})(window.ACADEMY = window.ACADEMY || {});
