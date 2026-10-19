/* Tool four — the story deck of lesson x7 (unit 2), on the lesson's project (Lesson_6_Match_Orders_And_Receipts).
   The factory's second example, purchasing. The planning engineer, helping his colleague in purchasing, carries every
   slide with one question: «كل أمر شراء وصل منه قد إيه، لو السطر بيوصل على كذا دفعة؟». The deck builds the match: two
   files, a key of two columns, many receipts to one line, the tolerance from purchasing's policy, four statuses,
   normalised order numbers, receipts with no order, over-receipts, the check that closes the books, and the open value
   per supplier. Each slide gives one rule with its reason. Figures are the project's own. Drawings are the xm_* entries
   in engine/history.js. */
"use strict";
(function (A) {
  const u = (ar, en) => ({ ar, en });
  A.matchStory = {
    id: "match", lesson: "x7",
    kicker: u("الأداة الرابعة · الحكاية كاملة في ٨ دقايق", "Tool four · the whole story in 8 minutes"),
    title: u("أوامر الشراء قصاد الاستلام… سطر سطر", "Purchase orders against goods received… line by line"),
    lead: u("فاكر سؤال زميلته في المشتريات في آخر الحكاية اللي فاتت؟ الأمر الواحد بيوصل على كذا دفعة، ونفس الخامة على أكتر من أمر. في الحكاية دي مهندس التخطيط بيبني معاها الأداة الرابعة على مشروع الدرس: ١٤ أمر شراء في فبراير، و٥٦ استلام من المخازن.",
      "Remember his colleague's question from purchasing at the end of the last story? One order arrives in several deliveries, and the same material sits on more than one order. In this story the planning engineer builds tool four with her on the lesson's project: 14 purchase orders in February, and 56 receipts from the stores."),
    answerLabel: u("القاعدة، وليه؟", "The rule, and why"),
    ideaLabel: u("الفكرة في جملة", "The idea in one line"),
    question: u("كل أمر شراء وصل منه قد إيه، لو السطر بيوصل على كذا دفعة؟", "How much of each purchase order has arrived, when a line comes in several deliveries?"),
    finalQuestion: u("طب لو خطة الإنتاج الجاية وصلت… نعرف منين نطلب إيه وقد إيه؟", "So when the next production plan arrives… how do we know what to order, and how much?"),
    note: u("الأرقام والأسماء توضيحية، وهي أرقام مشروع الدرس نفسه. ما فيش اسم مورّد ولا شركة.", "Figures and names are illustrative, and they are the lesson project's own. No supplier or company is named."),
    ui: {
      prev: u("اللي فات", "Previous"), next: u("اللي بعده", "Next"),
      play: u("شغّل الحكاية", "Play the story"), pause: u("وقّف", "Pause"), replay: u("من الأول", "From the start"),
      skip: u("تخطّى للدرس", "Skip to the lesson"), start: u("نكمّل الدرس", "Continue the lesson"),
      slideOf: u("{n} من {t}", "{n} of {t}"), timeline: u("خطوات الحكاية", "Story steps"),
      deck: u("أوامر الشراء قصاد الاستلام، في شرائح", "Purchase orders against receipts, in slides"), slide: u("شريحة", "slide"),
      keys: u("استخدم الأسهم أو اسحب على الشاشة", "Use the arrow keys or swipe")
    },
    slides: [
      {
        id: "scene", art: "xm_scene", year: u("الموقف", "Scene"), mark: u("٠١", "01"), era: u("يوم كامل كل شهر", "A full day every month"),
        title: u("٣٢ سطر و٥٦ استلام… والمطابقة بالإيد", "32 lines and 56 receipts… matched by hand"),
        story: [u("آخر كل شهر، زميلته في المشتريات بتفتح ملف أوامر الشراء في شاشة وكشف الاستلام من المخازن في شاشة، وتدوّر لكل سطر على الاستلامات بتاعته، وتجمعهم بالآلة الحاسبة، وتكتب جنبه «وصل» أو «ناقص». يوم كامل من التركيز لآخر سطر.",
          "At the end of each month, his colleague in purchasing opens the purchase orders on one screen and the stores' receipts list on another, looks up each line's receipts, adds them on a calculator, and writes “arrived” or “short” beside it. A full day of focus down to the last line."),
        u("والشهر اللي فات، سطر بوردات باور ناقص ما ظهرش في الكشف، والخط كان هيقف يستناه. فقالت لمهندس التخطيط: «إنت عملت أدوات للإنتاج… نعمل واحدة للمشتريات؟». والسؤال اللي ماشي معانا: كل أمر شراء وصل منه قد إيه، لو السطر بيوصل على كذا دفعة؟",
          "And last month a short line of power boards didn't show on the list, and a line nearly stopped waiting for it. So she told the planning engineer: “You built tools for production… shall we build one for purchasing?” And the question we carry: how much of each order has arrived, when a line comes in several deliveries?")],
        answer: u("الشغل اللي بيتكرر كل شهر بنفس الخطوات مرشّح للأتمتة، حتى لو برّه قسمك. لأن الأداة بتتبني مرة، والمطابقة بالإيد بتتعاد كل شهر.", "Work that repeats every month in the same steps is a candidate for automation, even outside your department — the tool is built once; matching by hand is repeated every month."),
        idea: u("نفس الفكرة… في قسم تاني.", "The same idea… in another department.")
      },
      {
        id: "files", art: "xm_files", year: u("الملفات", "The files"), mark: u("٠٢", "02"), era: u("ملفين", "Two files"),
        title: u("ملف بيقول طلبنا إيه… وملف بيقول وصل إيه", "One file says what we ordered… the other what arrived"),
        story: [u("مشروع الدرس ملفين بالإنجليزي. Purchase_Orders_Feb.xlsx فيه شيت PO_Lines: سطر لكل خامة في كل أمر، بالكمية المطلوبة وسعر الوحدة وتاريخ الاستحقاق. وGoods_Receipts_Feb.xlsx فيه شيت Receipts: صف لكل استلام من المخازن، برقم الأمر وكود الخامة والكمية اللي وصلت.",
          "The lesson's project is two files in English. Purchase_Orders_Feb.xlsx holds a PO_Lines sheet: one row per material on each order, with the ordered quantity, unit price and due date. Goods_Receipts_Feb.xlsx holds a Receipts sheet: one row per receipt from the stores, with the order number, the material code and the quantity that arrived."),
        u("الملفين بيتكلّموا عن نفس الحاجة من ناحيتين: المشتريات بتكتب الطلب، والمخازن بتكتب اللي وصل فعلًا. والمطابقة هي إنك تحط الاتنين قصاد بعض سطر سطر. وده بالظبط نوع الشغل اللي الأداة بتعمله أحسن من العين: نفس الخطوة ٣٢ مرة، من غير زهق.",
          "Both files speak of the same thing from two sides: purchasing writes the order, and the stores write what actually arrived. Matching means setting the two against each other line by line. And that is exactly the kind of work a tool does better than the eye: the same step 32 times, without tiring.")],
        answer: u("قبل المطابقة، اوصف الملفين: مين بيكتب كل واحد، وكل صف فيه يعني إيه. لأن «صف» في ملف الطلب مش زي «صف» في ملف الاستلام.", "Before matching, describe both files: who writes each, and what one row means in each — a “row” on the order file isn't the same as a “row” on the receipts file."),
        idea: u("الطلب من ناحية… والاستلام من ناحية.", "The order on one side… the receipt on the other.")
      },
      {
        id: "key", art: "xm_key", year: u("المفتاح", "The key"), mark: u("٠٣", "03"), era: u("عمودين مع بعض", "Two columns together"),
        title: u("المفتاح: رقم الأمر + كود الخامة", "The key: order number + material code"),
        story: [u("فاكر المفتاح في الدرس الرابع؟ هناك كان عمود واحد: كود الموديل. هنا لو ربطنا على رقم الأمر بس، كل الخامات اللي على نفس الأمر هتتجمع على بعض. ولو ربطنا على كود الخامة بس، هنلاقي مشكلة: الخامة PNL-55Q متطلوبة على أمرين، PO-26-0201 وPO-26-0210.",
          "Remember the key in lesson four? There it was one column: the model code. Here, join on the order number alone and every material on the same order gets summed together. Join on the material code alone and there's a problem: material PNL-55Q is ordered on two orders, PO-26-0201 and PO-26-0210."),
        u("فالمفتاح لازم يبقى الاتنين مع بعض: PONumber + MaterialCode. كده كل سطر في أوامر الشراء ليه مفتاح لوحده، وكل استلام بيروح لسطره بالظبط. مهندس التخطيط كتب ده في الـ Prompt بالحرف، لأنه أهم قرار في الأداة كلها.",
          "So the key must be both together: PONumber + MaterialCode. Then every order line has a key of its own, and every receipt goes to exactly its line. The planning engineer wrote this into the Prompt word for word, because it is the most important decision in the whole tool.")],
        answer: u("اختار المفتاح اللي بيميّز كل سطر لوحده، حتى لو عمودين. لأن المفتاح الناقص بيجمع حاجات مختلفة على بعض من غير رسالة.", "Choose the key that singles out each line, even if it takes two columns — an incomplete key sums different things together without a message."),
        idea: u("المفتاح بيكبر… على قد ما الشغل بيكبر.", "The key grows… as the work grows.")
      },
      {
        id: "many", art: "xm_many", year: u("الجمع", "Summing"), mark: u("٠٤", "04"), era: u("كذا استلام لسطر واحد", "Several receipts, one line"),
        title: u("PSU-L: ٣ استلامات… والمقارنة بمجموعهم", "PSU-L: 3 receipts… compared by their total"),
        story: [u("السطر PO-26-0202 طلب ١٥٠ بوردة باور كبيرة PSU-L. ووصل منهم على تلات استلامات: ٢٧، وبعدها ٢٧، وبعدها ٢٨. لو الأداة قارنت كل استلام لوحده بالمطلوب، هتكتب «ناقص» تلات مرات، والتقرير هيبان كأن فيه تلات مشاكل.",
          "Line PO-26-0202 ordered 150 large power boards, PSU-L. They arrived in three receipts: 27, then 27, then 28. If the tool compared each receipt alone with the order, it would write “short” three times, and the report would look like three problems."),
        u("الصح إن الأداة تجمع كل الاستلامات اللي على نفس المفتاح الأول: ٢٧ + ٢٧ + ٢٨ = ٨٢. وبعدين تقارن المجموع بالمطلوب: ٨٢ من ١٥٠، والفرق ٦٨. سطر واحد، وحالة واحدة، ورقم واحد يتابَع.",
          "The right way is for the tool to sum all receipts on the same key first: 27 + 27 + 28 = 82. Then it compares the total with the order: 82 of 150, a difference of 68. One line, one status, one figure to follow up.")],
        answer: u("اجمع قبل ما تقارن. لأن الحالة بتاعة السطر، مش بتاعة الاستلام.", "Sum before comparing — the status belongs to the line, not to the receipt."),
        idea: u("كذا استلام… وسطر واحد.", "Several receipts… one line.")
      },
      {
        id: "tolerance", art: "xm_tol", year: u("السماح", "The tolerance"), mark: u("٠٥", "05"), era: u("سياسة المشتريات", "Purchasing's policy"),
        title: u("٣٤٧ من ٣٥٠: كامل ولا ناقص؟", "347 of 350: complete or short?"),
        story: [u("لما مهندس التخطيط بعت الـ Prompt، النموذج سأل: «لو الفرق صغير، زي ٣٤٧ من ٣٥٠، أعتبره كامل ولا ناقص؟». ده مش سؤال للنموذج يجاوبه، ولا لمهندس التخطيط: ده سياسة المشتريات. زميلته جاوبت: «لحد ٢٪ من المطلوب نعتبره كامل».",
          "When the planning engineer sent the Prompt, the model asked: “If the difference is small, like 347 of 350, do I treat it as complete or short?” That isn't the model's question to answer, nor the planning engineer's: it's purchasing's policy. His colleague answered: “Within 2% of the order, we treat it as complete.”"),
        u("فالـ Prompt اتملا بالرقم: Complete لو الفرق لحد ٢٪، وPartial لو أقل، وOver لو أكتر. ولو السياسة اتغيّرت بكرة لـ ١٪، الرقم بيتغيّر في الـ Prompt بس، والقاعدة واضحة لأي حد بيقرا السجل.",
          "So the Prompt was filled with the figure: Complete when the difference is within 2%, Partial when less, Over when more. And if the policy changes to 1% tomorrow, only the figure in the Prompt changes, and the rule is clear to anyone reading the log.")],
        answer: u("الحدود والسماحات بييجوا من صاحب السياسة، ويتكتبوا رقم في الـ Prompt. لأن النموذج لو خمّن حد، بيبقى قرار من غير صاحب.", "Limits and tolerances come from the policy's owner and go into the Prompt as a figure — a limit the model guesses is a decision with no owner."),
        idea: u("السماح رقم… وليه صاحب.", "A tolerance is a figure… with an owner.")
      },
      {
        id: "status", art: "xm_status", year: u("الحالة", "The status"), mark: u("٠٦", "06"), era: u("أربع حالات", "Four statuses"),
        title: u("كل سطر بياخد حالة من أربعة", "Every line takes one of four statuses"),
        story: [u("بعد الجمع والمقارنة، كل سطر من الـ ٣٢ بياخد حالة واحدة: Complete لو وصل كامل في حدود السماح، وPartial لو ناقص، وOver لو زيادة، وNot received لو ما وصلش منه ولا حاجة. وجنب كل سطر: المطلوب، واللي وصل، والفرق.",
          "After summing and comparing, each of the 32 lines takes one status: Complete when it arrived in full within the tolerance, Partial when short, Over when in excess, and Not received when nothing arrived at all. And beside each line: ordered, received, and the difference."),
        u("النتيجة في مشروع الدرس: ٢٢ Complete، و٤ Partial، و٢ Over، و٤ Not received. أربع أرقام بتلخّص الشهر كله، وزميلته عرفت تبدأ منين: الأربعة اللي ما وصلوش، وبعدهم الناقص.",
          "The result in the lesson's project: 22 Complete, 4 Partial, 2 Over and 4 Not received. Four figures summing up the whole month, and his colleague knew where to start: the four that never arrived, then the short ones.")],
        answer: u("حدد الحالات مقدمًا بأسماء ثابتة وقاعدة لكل واحدة. لأن الحالة الواضحة بتتعدّ وتتفلتر، والكلام الحر ما بيتعدّش.", "Define the statuses upfront with fixed names and a rule for each — a clear status can be counted and filtered; free text can't."),
        idea: u("أربع كلمات… بتلخّص شهر.", "Four words… sum up a month.")
      },
      {
        id: "norm", art: "xm_norm", year: u("الفخ ١", "Trap 1"), mark: u("٠٧", "07"), era: u("رقم أمر بشكل غريب", "An odd order number"),
        title: u("«po-26-0207 »: نفس الأمر… بشكل تاني", "“po-26-0207 ”: the same order… written differently"),
        story: [u("أول تشغيل طلّع ٦ استلامات من غير سطر. مهندس التخطيط فتحهم مع زميلته: ٤ منهم رقم الأمر مكتوب بحروف صغيرة ومسافة في الآخر، زي «po-26-0207 ». حد في المخازن كتبه بإيده بدل ما ينسخه. نفس فخ «L04 » اللي قابلناه في الدرس الرابع.",
          "The first run produced 6 receipts with no line. The planning engineer opened them with his colleague: 4 had the order number typed in lower case with a trailing space, like “po-26-0207 ”. Someone in the stores typed it by hand instead of copying it. The same trap as “L04 ” in lesson four."),
        u("فرجعوا للنموذج بقاعدة: «قبل المطابقة، شيل المسافات وحوّل لحروف كبيرة، وسجّل كام رقم اتظبط». التشغيل التاني: الأربعة لقوا سطورهم، والسجل كتب «4 order numbers normalised». ولو الرقم ده كبر الشهر الجاي، المخازن محتاجة قايمة تختار منها.",
          "So they went back to the model with a rule: “before matching, trim spaces and convert to upper case, and log how many numbers changed.” The second run: the four found their lines, and the log wrote “4 order numbers normalised”. If that figure grows next month, the stores need a list to pick from.")],
        answer: u("ظبّط المفاتيح قبل أي مطابقة، وسجّل عدد التظبيط. لأن المفتاح المكتوب بالإيد بيختلف في التفاصيل اللي العين ما بتشوفهاش.", "Normalise keys before any match, and log how many changed — a key typed by hand differs in details the eye doesn't see."),
        idea: u("نفس الفخ… في ملف تاني.", "The same trap… in another file.")
      },
      {
        id: "unmatched", art: "xm_unmatched", year: u("الفخ ٢", "Trap 2"), mark: u("٠٨", "08"), era: u("استلام من غير أمر", "A receipt with no order"),
        title: u("استلامين مالهمش سطر… وما يتجمعوش على حاجة", "Two receipts with no line… added to nothing"),
        story: [u("بعد التظبيط فضل استلامين في Unmatched_Receipts. الأول GRN-26-9001: ٤٠٠ كابل باور على أمر رقمه PO-26-0299، والرقم ده مش موجود في أوامر الشراء خالص. والتاني GRN-26-9002: ٣٠٠ ريموت RC-02 على PO-26-0201، والأمر موجود بس الخامة دي مش عليه.",
          "After normalising, two receipts stayed on Unmatched_Receipts. The first, GRN-26-9001: 400 power cables on order PO-26-0299, a number that doesn't exist in the purchase orders at all. The second, GRN-26-9002: 300 RC-02 remotes on PO-26-0201 — the order exists, but this material isn't on it."),
        u("نسخة تجريبية كانت بتضيف الاستلام التاني كسطر جديد، فيبان كأن الريموتات اتطلبت. والقاعدة الصح: اللي مالوش سطر يفضل في شيته لوحده، والمخازن تراجع رقم الأمر. زميلته اتصلت بالمخازن، ولقوا إن الريموتات كانت على أمر تاني اتكتب رقمه غلط.",
          "A trial version added the second receipt as a new line, so the remotes looked as if they'd been ordered. The right rule: whatever has no line stays on its own sheet, and the stores check the order number. His colleague called the stores, and they found the remotes belonged to another order whose number was mistyped.")],
        answer: u("الاستلام اللي مالوش سطر يتعرض لوحده، وما يتضافش على أي حاجة. لأن إضافته بتخترع طلب ما حصلش.", "A receipt with no line is shown on its own and added to nothing — adding it invents an order that never happened."),
        idea: u("اللي مالوش سطر… ليه سؤال.", "What has no line… has a question.")
      },
      {
        id: "over", art: "xm_over", year: u("الزيادة", "The excess"), mark: u("٠٩", "09"), era: u("Over مش خبر حلو", "Over isn't good news"),
        title: u("وصل أكتر من المطلوب… ودي مشكلة برضه", "More arrived than ordered… and that's a problem too"),
        story: [u("سطرين حالتهم Over: LED-32 طلبنا منه ١٠٠ ووصل ١١٠، وRC-01 طلبنا ٧٠٠ ووصل ٧٧٠. أول إحساس: «أحسن، جالنا زيادة». بس الزيادة معناها فاتورة أكبر من الأمر، ومخزون زيادة، ومكان في المخزن.",
          "Two lines are Over: LED-32, ordered 100 and received 110, and RC-01, ordered 700 and received 770. The first feeling: “All the better, we got extra.” But the excess means an invoice bigger than the order, surplus stock, and space taken in the stores."),
        u("فالأداة بتطلّعهم حالة لوحدهم، والقرار عند المشتريات: يترجعوا ولا يتقبلوا ويتعدّل الأمر. الأداة ما بتقررش؛ الأداة بتخلّي القرار ما يتنسيش. وفي ملخص الشهر، الـ Over بيتعدّ زي الناقص بالظبط.",
          "So the tool gives them a status of their own, and the decision rests with purchasing: return them, or accept them and amend the order. The tool doesn't decide; it makes sure the decision isn't forgotten. And in the month's summary, Over is counted just like short.")],
        answer: u("أي فرق عن المطلوب، زيادة أو نقص، ليه حالة ويتراجع. لأن الزيادة اللي محدش شافها بتبقى فلوس اتدفعت من غير أمر.", "Any difference from the order, over or short, gets a status and a review — an excess nobody saw is money paid without an order."),
        idea: u("الزيادة… فرق برضه.", "An excess… is a difference too.")
      },
      {
        id: "check", art: "xm_check", year: u("المراجعة", "The check"), mark: u("١٠", "10"), era: u("الحساب بيقفل", "The books close"),
        title: u("كل وحدة وصلت… لازم تبقى في مكان واحد بس", "Every unit received… must sit in exactly one place"),
        story: [u("قبل ما الأداة تحفظ، بتعمل مراجعة بسيطة: مجموع كل الاستلامات في الملف = مجموع اللي اتحط على السطور + مجموع اللي في Unmatched_Receipts. في مشروع الدرس: ٢٣٬٩٤٢ = ٢٣٬٢٤٢ + ٧٠٠. الحساب قفل.",
          "Before saving, the tool runs a simple check: the total of all receipts in the file = the total placed on lines + the total on Unmatched_Receipts. In the lesson's project: 23,942 = 23,242 + 700. The books close."),
        u("لو الرقمين ما اتساووش، يبقى فيه استلام اتحسب مرتين، أو ضاع في السكة. والأداة توقف وتكتب الفرق بدل ما تطلّع ملخص شكله سليم. نفس فكرة «إجمالي التقرير = إجمالي المصدر» من الدرس الخامس، بس على كمية بتتوزّع على مكانين.",
          "If the two don't match, a receipt was counted twice or lost on the way. And the tool stops and writes the gap instead of producing a summary that looks sound. The same idea as “report total = source total” from lesson five, applied to a quantity split between two places.")],
        answer: u("اطلب مراجعة بتتأكد إن كل وحدة اتحطت في مكان واحد بس. لأن المطابقة اللي بتعدّ استلام مرتين بتبيّن الناقص كامل.", "Ask for a check that every unit landed in exactly one place — a match that counts a receipt twice makes a short line look complete."),
        idea: u("الكل = المتطابق + اللي مالوش.", "The whole = the matched + the unmatched.")
      },
      {
        id: "open", art: "xm_open", year: u("الملخص", "The summary"), mark: u("١١", "11"), era: u("قيمة المتبقي", "The open value"),
        title: u("٥٩٨٬٩٥٧ جنيه لسه ما وصلتش… أغلبها من مورّد واحد", "EGP 598,957 still to arrive… mostly from one supplier"),
        story: [u("آخر شيت Summary: عدد كل حالة، وقيمة المتبقي لكل مورّد، يعني الكمية الناقصة × سعر الوحدة للسطور Partial وNot received. الإجمالي ٥٩٨٬٩٥٧ جنيه، منهم ٥٣٨٬١٨٠ عند مورّد البوردات لوحده.",
          "The last sheet, Summary: the count of each status, and the open value per supplier — the missing quantity × unit price for Partial and Not received lines. The total is EGP 598,957, of which 538,180 sits with the boards supplier alone."),
        u("والسطر الأكبر: MB-SM، ٤٠٠ بوردة سمارت ما وصلش منها ولا واحدة، قيمتها ٣١٢٬٠٠٠ جنيه. زميلته اتصلت بالمورّد الصبح بدري قبل ما الخط يحس. القايمة اللي كانت بتاخد يوم، بقت بتقولها تبدأ بمين.",
          "And the biggest line: MB-SM, 400 smart main boards with not one received, worth EGP 312,000. His colleague called the supplier early in the morning, before the line felt it. The list that used to take a day now tells her whom to call first.")],
        answer: u("خلّي الملخص يرتّب المتابعة بالقيمة والأثر. لأن مش كل سطر ناقص زي التاني، والملخص الكويس بيقولك تبدأ منين.", "Have the summary rank follow-up by value and impact — not every short line weighs the same, and a good summary tells you where to start."),
        idea: u("الملخص الكويس بيقولك تتصل بمين الأول.", "A good summary tells you whom to call first.")
      },
      {
        id: "cliff", art: "xm_cliff", year: u("الدرس الجاي", "Next lesson"), mark: u("١٢", "12"), era: u("خطة أبريل", "April's plan"),
        title: u("فبراير اتقفل… وخطة أبريل وصلت", "February is closed… and April's plan has arrived"),
        story: [u("المطابقة بقت بتاخد دقايق، وزميلته بقت تبعت الملخص أول يوم في الشهر. وبعد أسبوع، وصلت خطة إنتاج أبريل: ١١٬١٥٠ جهاز في ١٣ موديل، ومنهم موديل جديد. ومدير المصنع سأل: «إحنا محتاجين نطلب إيه من الخامات علشان الخطة دي تمشي؟».",
          "Matching now takes minutes, and his colleague sends the summary on the first day of the month. A week later, April's production plan arrived: 11,150 TVs across 13 models, one of them new. And the factory manager asked: “What materials do we need to order for this plan to run?”"),
        u("كل جهاز محتاج شاشة، وبوردة، وريموت، وكرتونة، ومسامير بالعشرات. والمخزن فيه جزء، وفيه جزء في الطريق، والمورّد بيبيع بالعبوة. حساب طويل، لو اتغلط فيه رقم، يا الخط يقف يا الفلوس تتجمّد في مخزون زيادة. والسؤال اللي الدرس الجاي بيجاوبه: نعرف منين نطلب إيه وقد إيه؟",
          "Every TV needs a panel, a board, a remote, a carton and dozens of screws. The stores hold part, part is on its way, and suppliers sell by the pack. A long calculation: get one figure wrong and either the line stops or money freezes in surplus stock. And the question the next lesson answers: how do we know what to order, and how much?")],
        answer: u("واجب الدرس: شغّل الأداة الرابعة على مشروع الدرس، وقارن Summary بمفتاح الإجابة، وبعدين غيّر السماح لصفر في نسخة وشوف كام سطر حالته اتغيّرت. لأن القاعدة اللي بتشوف أثرها بتفهمها.", "This lesson's task: run tool four on the lesson's project, compare Summary with the answer key, then set the tolerance to zero in a copy and see how many lines change status — a rule whose effect you've seen is a rule you understand."),
        idea: u("اللي وصل اتحسب… فاضل اللي لازم يتطلب.", "What arrived is counted… what must be ordered remains.")
      }
    ]
  };
  A.decks = (A.decks || []).concat([A.matchStory]);
})(window.ACADEMY = window.ACADEMY || {});
