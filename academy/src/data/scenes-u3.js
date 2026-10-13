/* Scenes for Guide 3 (pages 24–25). */
(function () {
  const L = (ar, en) => ({ ar, en }), I = L;
  const S = ACAD.scenes;
  const N = (id, x, y, w, h, ico, ar, en, more) => Object.assign({ id, x, y, w, h, ico, label: L(ar, en) }, more || {});

  S["dashboard-stages"] = {
    icon: "📊", kind: "build", lesson: "u3-stages", pages: [24, 25], src: "book",
    title: L("ثماني مراحل: من ملف إكسل إلى أداة قرار", "Eight stages: from an Excel file to a decision tool"),
    lead: L("كل مرحلة لها طلب قصير ومعيار انتقال واضح. لاحظ أين تقع بوابة التحقق.", "Each stage has a short request and a clear exit criterion. Notice where the verification gate sits."),
    nodes: [
      N("xl", 20, 200, 130, 100, "📗", "ملف إكسل مهيّأ", "A prepared Excel file", { info: I("ست قواعد تهيئة قبل البدء: صف عناوين واحد، أسماء دالة، لا صفوف فارغة، لا خلايا مدمجة، صيغ موحدة، ورقة محورية أولًا {p24}.", "Six prep rules first: one header row, meaningful names, no blank rows, no merged cells, consistent formats, one core sheet first {p24}.") }),
      N("s1", 190, 30, 170, 80, "🎯", "١ الغرض والجمهور", "1 Purpose & audience", { sub: I("أسئلة قبل التنفيذ", "questions before work") }),
      N("s2", 190, 130, 170, 80, "🔎", "٢ التحليل والمؤشرات", "2 Analysis & KPIs", { sub: I("من بنية البيانات", "from the data") }),
      N("s3", 190, 230, 170, 80, "📐", "٣ التصميم نصًا", "3 Layout as text", { sub: I("قبل أي بناء", "before building") }),
      N("s4", 400, 30, 170, 80, "🏗️", "٤ البناء", "4 Build", { sub: I("وفق التصور المعتمد", "per the approved plan") }),
      N("s5", 400, 130, 170, 80, "🎚️", "٥ الفلاتر", "5 Filters", { sub: I("تحديث متزامن", "synced updates") }),
      N("s6", 400, 230, 170, 80, "🎨", "٦ الهوية البصرية", "6 Visual identity", { sub: I("تعديلات قصيرة", "short tweaks") }),
      N("s7", 610, 110, 170, 100, "🔍", "٧ التحقق من الأرقام", "7 Verify the numbers", { sub: I("ليست اختيارية", "not optional"), info: I("المرحلة الأكثر حساسية: مخرجات النماذج قابلة للخطأ، والمراجعة البشرية شرط لازم قبل أي مشاركة {p25}.", "The most sensitive stage: model output can be wrong, and human review is required before any sharing {p25}.") }),
      N("s8", 610, 260, 170, 80, "📤", "٨ الحفظ والمشاركة", "8 Save & share", { sub: I("ملف واحد مستقل", "one standalone file") }),
      N("tool", 810, 180, 140, 110, "✅", "أداة قرار حقيقية", "A real decision tool"),
      N("bad", 610, 390, 340, 80, "🎀", "لوحة أنيقة… بأرقام غير موثقة", "A pretty board… with unverified numbers", { fill: "var(--bad-soft)" }),
    ],
    links: [{ from: "xl", to: "s1" }, { from: "s1", to: "s2" }, { from: "s2", to: "s3" }, { from: "s3", to: "s4", curve: 0.2 }, { from: "s4", to: "s5" }, { from: "s5", to: "s6" }, { from: "s6", to: "s7", curve: -0.15 }, { from: "s7", to: "s8" }, { from: "s8", to: "tool" }, { from: "s6", to: "bad", curve: 0.2, label: I("تخطٍّ", "skip") }],
    steps: [
      { t: I("قبل البدء: خمس دقائق تهيئة", "Before starting: five minutes of prep"), c: I("خمس دقائق تهيئة توفّر ساعات من المراجعة {p24}.", "Five minutes of preparation save hours of review {p24}."), show: ["xl"], hl: ["xl"] },
      { t: I("القرار قبل البيانات", "The decision before the data"), c: I("اللوحة الجيدة تبدأ من القرار الذي ستخدمه، لا من البيانات المتاحة. ثم تُشتق المؤشرات من بنية البيانات نفسها.", "A good dashboard starts from the decision it serves, not from the data available. Then KPIs are derived from the data’s own structure."), add: ["s1", "s2"], hl: ["s1", "s2"], flow: ["xl>s1", "s1>s2"] },
      { t: I("المخطط نصًا أرخص", "A text layout is cheaper"), c: I("مراجعة المخطط نصًا أسرع وأقل كلفة من مراجعة مخرَج منفّذ بالكامل {p24}.", "Reviewing a text layout is faster and cheaper than reviewing a fully built output {p24}."), add: ["s3"], hl: ["s3"], flow: ["s2>s3"] },
      { t: I("بناء ثم تفاعل ثم هوية", "Build, then interact, then identity"), c: I("البناء بعد الاتفاق، ثم فلاتر تحوّل التقرير الثابت إلى أداة استكشاف، ثم تعديلات قصيرة للألوان والخطوط.", "Build after agreement, then filters that turn a static report into an exploration tool, then short tweaks to colours and fonts."), add: ["s4", "s5", "s6"], hl: ["s4", "s5", "s6"], flow: ["s3>s4", "s4>s5", "s5>s6"] },
      { t: I("الطريق المختصر الخطِر", "The dangerous shortcut"), c: I("القفز من الشكل للمشاركة يُنتج لوحة أنيقة… لكن «الأنيق لا يعني بالضرورة أنه صحيح» {p25}.", "Jumping from looks to sharing gives a pretty board… but “elegant doesn’t necessarily mean correct” {p25}."), add: ["bad"], hl: ["bad"], flow: ["s6>bad"], cls: { bad: "bad" } },
      { t: I("بوابة التحقق ثم المشاركة", "The verification gate, then sharing"), c: I("طابق كل رقم بالملف الأصلي، ثم شارك ملفًا واحدًا مستقلًا. هكذا تصبح اللوحة أداة قرار {p25}.", "Match every number to the source file, then share one standalone file. That is how a board becomes a decision tool {p25}."), add: ["s7", "s8", "tool"], hl: ["s7", "tool"], dim: ["bad"], flow: ["s6>s7", "s7>s8", "s8>tool"], cls: { s7: "warn", tool: "good" } },
    ],
    predict: { at: 4, q: I("لو تخطّيت المرحلة السابعة، ما أخطر نتيجة؟", "If you skip stage 7, what is the worst outcome?"), opts: [I("لوحة أبطأ", "A slower board"), I("قرار يُبنى على رقم خاطئ يبدو مقنعًا", "A decision built on a wrong but convincing number"), I("ألوان غير متناسقة", "Inconsistent colours")], a: 1, why: I("الشكل المحترف يمنح الرقم الخاطئ مصداقية لا يستحقها؛ لذلك المرحلة السابعة ليست اختيارية {p25}.", "A professional look gives a wrong number credibility it doesn’t deserve; that’s why stage 7 isn’t optional {p25}.") },
  };
})();
