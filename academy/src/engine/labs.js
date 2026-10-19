/* Labs: inputs → simulation → changing results → why → lesson learned.
   Every lab states whether it is an educational simulation or a real calculation. No lab calls an AI model. */
"use strict";
(function (A) {
  const { h, ico, L, t, esc } = A;
  const tx = (ar, en) => (A.lang() === "ar" ? ar : en);
  const fmt = (n, d = 0) => Number(n).toLocaleString(A.lang() === "ar" ? "en-US" : "en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

  function frame(host, lab) {
    const box = h("section", { class: "lab", "aria-label": L(lab.title) });
    box.innerHTML = `<div class="lab-head"><h3>${ico(lab.icon || "flask")}${esc(L(lab.title))}</h3><span class="chip ${lab.real ? "ok" : "vi"}" title="${esc(lab.real ? t("realCalcHint") : t("eduSimHint"))}">${ico(lab.real ? "check" : "flask")}${esc(lab.real ? t("realCalc") : t("eduSim"))}</span></div>
      <div class="lab-body"><div class="lab-in"></div><div class="lab-out" aria-live="polite"></div></div>
      <div class="lab-learn">${ico("star")}<div><b>${esc(t("lessonLearned"))}:</b> <span class="ll"></span></div></div>`;
    host.append(box);
    const learn = box.querySelector(".ll");
    learn.innerHTML = A.inline(L(lab.learn));
    return { box, inp: box.querySelector(".lab-in"), out: box.querySelector(".lab-out"), learn };
  }
  const step = (n, label) => `<div class="lab-step">${ico("spark")}${esc(t("labStepN", { n }))} · ${esc(label)}</div>`;
  const ck = (ok, text, warn) => `<div class="ck ${warn ? "warn" : ok ? "ok" : "bad"}"><span class="m">${warn ? "!" : ok ? "✓" : "✗"}</span><span>${text}</span></div>`;
  function predictBox(q, opts, ans, explain, onDone) {
    const box = h("div", { class: "predict" });
    box.innerHTML = `<b>${ico("spark")} ${esc(t("predictFirst"))}</b><div>${esc(q)}</div><div class="row">${opts.map((o, i) => `<button type="button" class="chip" data-i="${i}">${esc(o)}</button>`).join("")}</div><div class="pr-fb small"></div>`;
    box.querySelectorAll("[data-i]").forEach((b) => (b.onclick = () => {
      const i = Number(b.dataset.i);
      box.querySelectorAll("[data-i]").forEach((x) => { x.disabled = true; if (Number(x.dataset.i) === ans) x.classList.add("ok"); else if (x === b) x.classList.add("bad"); });
      box.querySelector(".pr-fb").innerHTML = (i === ans ? "✓ " + esc(t("predictRight")) : "✗ " + esc(t("predictWrong"))) + " " + esc(explain);
      onDone && onDone(i === ans);
    }));
    return box;
  }

  const LABS = {};

  /* ===== 1. Prompt builder ===== */
  LABS.prompt = (host, lab) => {
    const f = frame(host, lab);
    const st = { base: tx("ساعدني في التقرير", "Help me with the report"), goal: "", ctx: "", aud: "", fmt: "", cons: "", tech: false, tab: "build", issue: "long" };
    const strong = {
      base: tx("عاوز تقرير عن مبيعات الربع التالت", "I want a report on Q3 sales"),
      goal: tx("عاوز أعرف ليه المبيعات نزلت في الربع التالت بنسبة 12% مقارنة بالربع التاني", "I want to know why Q3 sales fell 12% compared to Q2"),
      ctx: tx("عندي ملف إكسل فيه أعمدة: التاريخ، الفرع، المنتج، الكمية، السعر. فيه حوالي 4000 صف لفروع القاهرة والإسكندرية والجيزة", "I have an Excel file with columns: date, branch, product, quantity, price — about 4,000 rows for the Cairo, Alexandria and Giza branches"),
      aud: tx("مدير المبيعات، مشغول ومحتاج قرار سريع", "The sales manager — busy, needs a quick decision"),
      fmt: "table",
      cons: tx("في صفحة واحدة، من غير مصطلحات تقنية، واقترح 3 إجراءات نقدر ننفّذها خلال شهر بميزانية محدودة", "One page, no jargon, and suggest 3 actions doable within a month on a limited budget"),
      tech: true,
    };
    const fmts = [["", tx("— لسه ماتحدّدش —", "— not set —")], ["points", tx("نقاط", "Bullet points")], ["table", tx("جدول", "Table")], ["plan", tx("خطة عمل", "Action plan")], ["msg", tx("رسالة", "Message")]];
    const techLine = tx("قبل ما تديني الإجابة، اسألني عن أي معلومة ناقصة محتاجها. وبعد ما أرد عليك، اديني أبسط حل ممكن، واشرحهولي ببساطة، واختبر الحالات الاستثنائية.", "Before you answer, ask me about any missing information you need. After I reply, give me the simplest possible solution, explain it simply, and test the edge cases.");
    const words = (s) => (s || "").trim().split(/\s+/).filter(Boolean).length;
    const hasNum = (s) => /[0-9٠-٩]/.test(s || "");
    function assemble() {
      const parts = [st.base.trim()];
      if (st.goal.trim()) parts.push(tx("الهدف: ", "Goal: ") + st.goal.trim());
      if (st.ctx.trim()) parts.push(tx("الـ Context: ", "Context: ") + st.ctx.trim());
      if (st.aud.trim()) parts.push(tx("الجمهور: ", "Audience: ") + st.aud.trim());
      if (st.fmt) parts.push(tx("شكل النتيجة: ", "Output format: ") + fmts.find((x) => x[0] === st.fmt)[1]);
      if (st.cons.trim()) parts.push(tx("القيود: ", "Constraints: ") + st.cons.trim());
      if (st.tech) parts.unshift(techLine);
      return parts.filter(Boolean).join("\n");
    }
    function grade() {
      const c = [];
      let s = 0;
      const g = words(st.goal) >= 4; s += g ? 20 : 0; c.push(ck(g, tx("هدف واضح ومحدد (مش «ساعدني في…»)", "A clear, specific goal (not “help me with…”)")));
      const cx = words(st.ctx) >= 8; s += cx ? (hasNum(st.ctx) ? 20 : 15) : 0; c.push(ck(cx, tx("Context كافي: الأداة مش عارفة عن شغلك غير اللي إنت بتحكيلها عليه", "Enough context: the tool knows only what you tell it")));
      const au = words(st.aud) >= 1; s += au ? 15 : 0; c.push(ck(au, tx("جمهور محدد: شرح لحد لسه بيبدأ ≠ ملخص لمدير", "A named audience: a beginner’s explainer ≠ a manager’s summary")));
      const fo = !!st.fmt; s += fo ? 15 : 0; c.push(ck(fo, tx("شكل نتيجة محدد بيوفّر جولة تعديل كاملة", "A set output format saves a whole revision round")));
      const co = words(st.cons) >= 3; s += co ? 15 : 0; c.push(ck(co, tx("قيود وأمثلة بتمنع اقتراحات مانقدرش ننفّذها", "Constraints/examples prevent unusable suggestions")));
      s += st.tech ? 15 : 0; c.push(ck(st.tech, tx("جملة «اسألني عن الناقص… أبسط حل… الحالات الاستثنائية»", "The “ask me what’s missing… simplest solution… edge cases” sentence")));
      const all = assemble();
      if (/\[[^\]]+\]/.test(all)) c.push(ck(false, tx("لسه فيه أقواس [ ] مابدّلتهاش ببياناتك", "There are still [ ] brackets not replaced with your data"), true));
      if (/(جدول|بيانات|ملف|table|data|file)/i.test(st.ctx) && !/(عمود|أعمدة|column)/i.test(st.ctx)) c.push(ck(false, tx("غلطة شائعة: «عندي جدول» — قول أسماء الأعمدة وأنواعها وعدد الصفوف", "Common mistake: “I have a table” — name the columns, types and row count"), true));
      return { s: Math.min(100, s), c };
    }
    function simulate(sc) {
      const goal = st.goal.trim() || st.base.trim();
      if (st.tech && sc >= 50) return tx(`قبل ما أبدأ، عندي 3 أسئلة عشان الإجابة تبقى دقيقة:\n1) البيانات فيها المرتجعات ولا صافي المبيعات بس؟\n2) الأسعار أو العروض اتغيّرت خلال الربع؟\n3) «ميزانية محدودة» يعني كام بالأرقام؟\nبعد ما ترد، هديك أبسط تحليل ممكن، وهختبر حالات زي فرع من غير بيانات لشهر كامل.`, `Before I start, I have 3 questions so the answer is accurate:\n1) Does the data include returns or net sales only?\n2) Were there price or promotion changes during the quarter?\n3) What counts as a “limited budget” in numbers?\nAfter you reply I’ll give the simplest analysis and test cases such as a branch with no data for a whole month.`);
      if (sc < 30) return tx(`أكيد! دي شوية نصايح عامة عشان تكتب تقرير كويس:\n• حدّد هدف التقرير\n• اجمع البيانات اللي محتاجها\n• استخدم الرسوم البيانية\n• اكتب خلاصة واضحة\n(إجابة عامة عشان الطلب ماوضّحش إنت عاوز إيه وليه ولمين)`, `Sure! Here are some general tips for a good report:\n• Define the report’s goal\n• Gather the needed data\n• Use charts\n• Write a clear conclusion\n(Generic, because the request didn’t say what, why or for whom)`);
      const head = st.aud.trim() ? tx(`إلى: ${st.aud.trim()}\n`, `To: ${st.aud.trim()}\n`) : "";
      if (st.fmt === "table") return head + tx(`| السؤال | بندوّر على إيه في بياناتك |\n|---|---|\n| المبيعات نزلت فين؟ | قارن الفروع والمنتجات شهر بشهر |\n| بدأت تنزل إمتى؟ | حدّد أول شهر الرقم نزل فيه |\n| ليه؟ | السعر × الكمية: أنهي واحد اتغيّر؟ |\nالخطوة الجاية: ${goal.slice(0, 70)}…`, `| Question | What to look for in your data |\n|---|---|\n| Where did it drop? | Compare branches and products month by month |\n| When did it start? | Find the first month the number fell |\n| Why? | Price × quantity: which one changed? |\nNext step: ${goal.slice(0, 70)}…`);
      if (st.fmt === "plan") return head + tx(`خطة من 3 خطوات:\n1) راجع جودة البيانات (فراغات وتكرار).\n2) قسّم الرقم حسب الفرع والمنتج والشهر.\n3) اقترح إجراء لكل سبب، وحدّد مين مسؤول عنه وميعاده.`, `A 3-step plan:\n1) Check data quality (blanks, duplicates).\n2) Break the number down by branch, product and month.\n3) Propose one action per cause with an owner and a date.`);
      if (st.fmt === "msg") return head + tx(`رسالة قصيرة: لاحظنا إن المبيعات نزلت. بقترح اجتماع 15 دقيقة نعرض فيه 3 أسباب محتملة والقرار المطلوب.`, `Short message: we noticed a sales drop. I propose a 15-minute meeting to review 3 likely causes and the decision needed.`);
      return head + tx(`• هدفك: ${goal.slice(0, 80)}\n• أول حاجة هعملها: هقسّم الرقم حسب اللي قلته في الـ Context\n• اللي ناقصني عشان أبقى أدق: ${st.ctx.trim() ? "شكل النتيجة والقيود" : "وصف البيانات والـ Context"}`, `• Your goal: ${goal.slice(0, 80)}\n• What I’ll do first: break the number down using your context\n• What I still need: ${st.ctx.trim() ? "output format and constraints" : "a data description and context"}`);
    }
    function drawIn() {
      f.inp.innerHTML = `<div class="tabs" role="tablist"><button role="tab" type="button" aria-selected="${st.tab === "build"}" data-tab="build">${ico("wrench")}${esc(tx("كوّن طلبك", "Build your prompt"))}</button><button role="tab" type="button" aria-selected="${st.tab === "fix"}" data-tab="fix">${ico("restart")}${esc(tx("صحّح النتيجة", "Fix the result"))}</button></div>`;
      f.inp.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { st.tab = b.dataset.tab; drawIn(); drawOut(); }));
      if (st.tab === "fix") {
        const issues = [["long", tx("النتيجة طويلة ومش مترتبة", "The result is long and scattered")], ["unfit", tx("صح بس مش مناسبة ليا", "Correct but doesn’t fit me")], ["made", tx("شكلها متألّفة", "It looks made up")]];
        f.inp.insertAdjacentHTML("beforeend", step(1, tx("اختار المشكلة", "Pick the problem")) + `<div class="stack" style="gap:6px">${issues.map(([k, l]) => `<label class="check"><input type="radio" name="iss" value="${k}" ${st.issue === k ? "checked" : ""}><span>${esc(l)}</span></label>`).join("")}</div><p class="hint">${esc(tx("القاعدة: صحّح في نفس المحادثة بدل ما تبدأ محادثة جديدة.", "Rule: fix it in the same conversation instead of starting over."))}</p>`);
        f.inp.querySelectorAll("[name=iss]").forEach((r) => (r.onchange = () => { st.issue = r.value; drawOut(); }));
        return;
      }
      f.inp.insertAdjacentHTML("beforeend", `${step(1, tx("اكتب طلبك وبعدين ضيف العناصر الخمسة", "Write your request, then add the five elements"))}
        <div class="field"><label for="pb-base">${esc(tx("طلبك زي ما بتكتبه عادة", "Your request as you’d normally write it"))}</label><input id="pb-base" class="input" value="${esc(st.base)}"></div>
        <div class="field"><label for="pb-goal">1 · ${esc(tx("الهدف — إنت عاوز إيه بالظبط؟", "Goal — what exactly do you want?"))}</label><input id="pb-goal" class="input" value="${esc(st.goal)}" placeholder="${esc(tx("عاوز أعرف ليه المبيعات نزلت…", "I want to know why sales fell…"))}"></div>
        <div class="field"><label for="pb-ctx">2 · ${esc(tx("الـ Context — الخلفية والوضع الحالي", "Context — background and current situation"))}</label><textarea id="pb-ctx" class="input" rows="3" placeholder="${esc(tx("قول أسماء الأعمدة وأنواعها وعدد الصفوف…", "Name the columns, types, row count…"))}">${esc(st.ctx)}</textarea></div>
        <div class="field"><label for="pb-aud">3 · ${esc(tx("الجمهور — النتيجة دي لمين؟", "Audience — who is it for?"))}</label><input id="pb-aud" class="input" value="${esc(st.aud)}"></div>
        <div class="field"><label for="pb-fmt">4 · ${esc(tx("شكل النتيجة", "Output format"))}</label><select id="pb-fmt" class="input">${fmts.map(([v, l]) => `<option value="${v}" ${st.fmt === v ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></div>
        <div class="field"><label for="pb-cons">5 · ${esc(tx("القيود والأمثلة", "Constraints and examples"))}</label><input id="pb-cons" class="input" value="${esc(st.cons)}" placeholder="${esc(tx("الميزانية، الوقت، الأسلوب…", "Budget, time, style…"))}"></div>
        <label class="check"><input type="checkbox" id="pb-tech" ${st.tech ? "checked" : ""}><span><b>${esc(tx("أقوى تقنية في الدليل", "The guide’s strongest technique"))}</b><br><span class="small muted">${esc(tx("«اسألني عن أي معلومة ناقصة…»", "“Ask me about any missing information…”"))}</span></span></label>
        <div class="row"><button type="button" class="btn sm" id="pb-ex">${ico("star")}${esc(tx("املا مثال قوي", "Fill a strong example"))}</button><button type="button" class="btn sm ghost" id="pb-clr">${ico("restart")}${esc(tx("ابدأ من جديد", "Start over"))}</button></div>`);
      const bind = (id, key, ev = "input") => { const el = f.inp.querySelector("#" + id); el.addEventListener(ev, () => { st[key] = el.type === "checkbox" ? el.checked : el.value; drawOut(); }); };
      bind("pb-base", "base"); bind("pb-goal", "goal"); bind("pb-ctx", "ctx"); bind("pb-aud", "aud"); bind("pb-fmt", "fmt", "change"); bind("pb-cons", "cons"); bind("pb-tech", "tech", "change");
      f.inp.querySelector("#pb-ex").onclick = () => { Object.assign(st, strong); drawIn(); drawOut(); };
      f.inp.querySelector("#pb-clr").onclick = () => { Object.assign(st, { base: tx("ساعدني في التقرير", "Help me with the report"), goal: "", ctx: "", aud: "", fmt: "", cons: "", tech: false }); drawIn(); drawOut(); };
    }
    function drawOut() {
      if (st.tab === "fix") {
        const fix = { long: tx("«اختصرها لنص الطول، وخلّي كل نقطة نقدر ننفّذها، وشيل أي تمهيد أو تكرار».", "“Cut it to half the length, keep every actionable point, and delete all preamble and repetition.”"), unfit: tx("«ده صح بشكل عام، بس وضعي مختلف في [حدّد الفرق]. اعمل الحل تاني على أساس القيد ده بالذات».", "“This is generally right, but my situation differs in [state the difference]. Redo the solution based on that constraint.”"), made: tx("«قول مصدر كل رقم أو ادعاء، ووضّح إنت متأكد من إيه وإيه اللي بترجّحه».", "“For every number or claim give its source, and clearly separate what you’re sure of from what you’re guessing.”") }[st.issue];
        const loop = [tx("اطلب", "Ask"), tx("اقرا بعين ناقدة", "Read critically"), tx("حدّد الغلطة بالظبط", "Pinpoint the flaw"), tx("صحّح في نفس المحادثة", "Fix in the same chat"), tx("اعتمد النتيجة أو كرّر", "Adopt or repeat")];
        f.out.innerHTML = step(2, tx("خمس خطوات لإدارة المحادثة", "The 5-step conversation loop")) + `<div class="pipe">${loop.map((x, i) => `${i ? `<span class="ar">${A.lang() === "ar" ? "←" : "→"}</span>` : ""}<span class="st ${i === 3 ? "run" : i < 3 ? "ok" : ""}">${i + 1}. ${esc(x)}</span>`).join("")}</div>` + step(3, tx("الجملة اللي هتكتبها دلوقتي (من الكتاب)", "What to type now (from the book)")) + `<div class="out-box">${esc(fix)}</div><div class="row"><button type="button" class="btn sm pri" id="cp-fix">${ico("copy")}${esc(t("copy"))}</button>${A.pageChips([8])}</div><p class="small muted">${esc(tx("الفرق بين المبتدئ والمتمكن: المبتدئ بيبدأ محادثة جديدة، والمتمكن بيصحّح المسار في نفس المحادثة.", "Beginner vs skilled: the beginner opens a new chat; the skilled user corrects course in the same one."))}</p>`;
        f.out.querySelector("#cp-fix").onclick = () => A.copyText(fix);
        return;
      }
      const g = grade();
      const color = g.s >= 80 ? "var(--mint)" : g.s >= 50 ? "var(--spark)" : "var(--rose)";
      f.out.innerHTML = `${step(2, tx("طلبك بعد التجميع", "Your assembled prompt"))}<div class="ptext">${esc(assemble())}</div>
        <div class="row"><button type="button" class="btn sm pri" id="cp-pb">${ico("copy")}${esc(t("copy"))}</button></div>
        ${step(3, tx("قوة الطلب حسب قواعد الكتاب", "Prompt strength by the book’s rules"))}
        <div class="row" style="justify-content:space-between"><b>${esc(tx("الدرجة", "Score"))}</b><b class="num" style="color:${color}">${g.s}/100</b></div><div class="bar-meter"><i style="width:${g.s}%;background:${color}"></i></div>
        <div class="checks">${g.c.join("")}</div>
        ${step(4, tx("شكل الرد اللي تتوقّعه (توضيحي)", "Expected reply shape (illustrative)"))}<div class="out-box ai">${esc(simulate(g.s))}</div>
        <p class="hint">${esc(tx("الرد متجمّع بقواعد ثابتة عشان يوضّح الفرق. ليس من نموذج حقيقي.", "The reply is built from fixed rules to show the difference — not from a real model."))}</p>`;
      f.out.querySelector("#cp-pb").onclick = () => A.copyText(assemble());
    }
    drawIn(); drawOut();
  };

  /* ===== 2. Second brain (notebook retrieval) ===== */
  LABS.brain = (host, lab) => {
    const f = frame(host, lab);
    const SRC = [
      { id: 1, name: tx("سياسة الإجازات 2026 (محدّثة)", "Leave policy 2026 (updated)"), kind: tx("أصلي", "primary"), on: true, s: [tx("الموظف من حقه 21 يوم إجازة سنوية بعد ما يكمّل سنة خدمة.", "An employee is entitled to 21 days of annual leave after one year of service."), tx("لازم تطلب الإجازة السنوية قبلها بأسبوعين على الأقل من خلال النظام.", "Annual leave must be requested at least two weeks ahead through the system."), tx("الإجازة المرضية محتاجة تقرير طبي لو زادت عن يومين.", "Sick leave needs a medical report if it exceeds two days.")] },
      { id: 2, name: tx("سياسة الإجازات 2023 (قديمة)", "Leave policy 2023 (old)"), kind: tx("قديم", "outdated"), on: true, s: [tx("الموظف من حقه 15 يوم إجازة سنوية.", "An employee is entitled to 15 days of annual leave."), tx("بتطلب الإجازة السنوية قبلها بأسبوع بورقة موقّع عليها المدير.", "Annual leave is requested one week ahead on a form signed by the manager.")] },
      { id: 3, name: tx("دليل المشتريات", "Purchasing guide"), kind: tx("أصلي", "primary"), on: true, s: [tx("أي شراء أقل من 5000 جنيه مدير القسم بيوافق عليه على طول.", "Any purchase under EGP 5,000 is approved directly by the department head."), tx("الشراء من 5000 جنيه وطالع محتاج تلات عروض أسعار وموافقة المدير المالي.", "Purchases of EGP 5,000 or more need three quotes and the finance manager’s approval.")] },
      { id: 4, name: tx("محضر اجتماع المبيعات", "Sales meeting minutes"), kind: tx("أصلي", "primary"), on: true, s: [tx("اتقرر إن عرض الصيف يبدأ في فرع الإسكندرية أول يوليو.", "It was decided to launch the summer offer in the Alexandria branch on 1 July."), tx("مدير الفرع هو المسؤول عن متابعة العرض، والمراجعة بعد أسبوعين.", "The branch manager owns the offer follow-up; review in two weeks."), tx("لسه موضوع خصم العملاء الكبار ماتحسمش.", "The key-account discount is still undecided.")] },
      { id: 5, name: tx("مقال من الإنترنت", "Article from the web"), kind: tx("ثانوي", "secondary"), on: false, s: [tx("أغلب الشركات بتدي 30 يوم إجازة سنوية.", "Most companies give 30 days of annual leave."), tx("الإجازات الطويلة بتزوّد الإنتاجية.", "Long holidays increase productivity.")] },
    ];
    const QS = [tx("الموظف من حقه كام يوم إجازة سنوية؟", "How many annual leave days does an employee get?"), tx("إيه حد الشراء اللي مدير القسم بيوافق عليه؟", "What purchase limit can a department head approve?"), tx("إيه القرارات اللي اتاخدت في اجتماع المبيعات؟", "What decisions were made in the sales meeting?"), tx("سعر سهم الشركة كام النهارده؟", "What is the company’s share price today?")];
    let q = QS[0];
    const STOP = new Set(A.norm(tx("ما من في على عن الى إلى هل كم كيف التي الذي التى ماذا هو هي اليوم يستحق تم ان أن او أو مع", "the a an of in on to is are what how many much which who for do does did get can by with from")).split(" "));
    const toks = (s) => A.norm(s).split(" ").filter((w) => w.length > 1 && !STOP.has(w));
    const stem = (w) => w.replace(/^(ال|وال|بال|لل)/, "").slice(0, 5);
    function ask() {
      const qt = toks(q).map(stem);
      const hits = [];
      for (const src of SRC) {
        if (!src.on) continue;
        src.s.forEach((sen, i) => {
          const st = toks(sen).map(stem);
          const sc = qt.reduce((a, w) => a + (st.some((x) => x === w || (w.length >= 4 && x.startsWith(w.slice(0, 4)))) ? 1 : 0), 0);
          if (sc >= Math.max(1, Math.ceil(qt.length * 0.34))) hits.push({ src, i, sen, sc });
        });
      }
      hits.sort((a, b) => b.sc - a.sc);
      return hits.slice(0, 3);
    }
    function drawIn() {
      f.inp.innerHTML = step(1, tx("اختار المصادر المسموح بيها قبل ما تسأل", "Pick the allowed sources before asking")) + `<div class="stack" style="gap:6px">${SRC.map((s) => `<label class="check"><input type="checkbox" data-s="${s.id}" ${s.on ? "checked" : ""}><span><b>[${s.id}] ${esc(s.name)}</b> <span class="chip" style="height:22px">${esc(s.kind)}</span></span></label>`).join("")}</div>` +
        step(2, tx("اسأل دفترك", "Ask your notebook")) + `<div class="field"><label for="br-q">${esc(tx("السؤال", "Question"))}</label><select id="br-q" class="input">${QS.map((x) => `<option ${x === q ? "selected" : ""}>${esc(x)}</option>`).join("")}<option value="__own">${esc(tx("سؤالي أنا…", "My own question…"))}</option></select></div><div class="field" id="br-own-w" hidden><label for="br-own">${esc(tx("اكتب سؤالك", "Type your question"))}</label><input id="br-own" class="input"></div>
        <p class="hint">${esc(tx("المصادر هنا نصوص قصيرة خيالية عشان تتدرّب.", "The sources are short fictional texts for practice."))}</p>`;
      f.inp.querySelectorAll("[data-s]").forEach((c) => (c.onchange = () => { SRC.find((s) => s.id === Number(c.dataset.s)).on = c.checked; drawOut(); }));
      const sel = f.inp.querySelector("#br-q"), own = f.inp.querySelector("#br-own"), ow = f.inp.querySelector("#br-own-w");
      sel.onchange = () => { if (sel.value === "__own") { ow.hidden = false; q = own.value; own.focus(); } else { ow.hidden = true; q = sel.value; } drawOut(); };
      own.addEventListener("input", A.debounce(() => { q = own.value; drawOut(); }, 200));
    }
    function drawOut() {
      const hits = ask();
      const qt = toks(q).map(stem);
      const nums = hits.map((x) => (x.sen.match(/\d+/) || [null])[0]).filter(Boolean);
      const conflict = hits.length > 1 && new Set(nums).size > 1 && hits.some((x) => x.src.id === 2);
      let ans;
      if (!q.trim()) ans = tx("اكتب سؤال الأول.", "Type a question first.");
      else if (!hits.length) ans = tx("المصادر اللي شغّالة مش بتجاوب على السؤال ده. الدفتر مش بيضيف معلومات من برّه مصادرك — وده الضمان.", "The active sources don’t answer this. The notebook doesn’t add outside information — that’s the guarantee.");
      else ans = tx("من المصادر اللي شغّالة بس:\n", "Based only on the active sources:\n") + hits.map((x) => `• ${x.sen} [${x.src.id}]`).join("\n");
      const hl = (sen) => { let s = esc(sen); for (const w of A.norm(sen).split(" ")) if (w.length > 1 && qt.some((x) => stem(w) === x || (x.length >= 4 && stem(w).startsWith(x.slice(0, 4))))) s = s.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), `<mark>${w}</mark>`); return s; };
      f.out.innerHTML = step(3, tx("الإجابة مع الاستشهادات", "Answer with citations")) + `<div class="out-box ai">${esc(ans).replace(/\[(\d)\]/g, '<span class="cite">$1</span>')}</div>` +
        (conflict ? `<div class="note sp">${ico("info")}<div><b>${esc(tx("تناقض بين المصادر!", "Sources disagree!"))}</b> ${esc(tx("المصدر [2] قديم ومختلف عن [1]. القاعدة 10: حدّث المصادر على طول، وإلا الدفتر هيتحوّل لمتحف رقمي.", "Source [2] is outdated and contradicts [1]. Rule 10: keep sources updated, or the notebook becomes a digital museum."))}</div></div>` : "") +
        step(4, tx("اتأكد بنفسك كل استشهاد جاي منين", "Check where each citation comes from")) + `<div class="stack" style="gap:8px">${SRC.map((s) => `<div class="src-doc ${s.on ? "" : "off"} ${hits.some((x) => x.src === s) ? "hit" : ""}"><b>[${s.id}] ${esc(s.name)}</b>${s.on ? "" : ` — ${esc(tx("مش شغّال", "inactive"))}`}<div class="small" style="margin-top:4px">${s.s.map(hl).join(" ")}</div></div>`).join("")}</div>
        <p class="hint">${esc(tx("البحث هنا بكلمات مفتاحية بسيطة عشان يوضّح الفكرة؛ الأداة الحقيقية بتفهم المعنى.", "Search here uses simple keywords to show the idea; the real tool understands meaning."))}</p>`;
    }
    drawIn(); drawOut();
  };

  /* ===== 3. Excel formula ===== */
  LABS.formula = (host, lab) => {
    const f = frame(host, lab);
    const rows = [[tx("شاشة 55", "TV 55"), 4, 12000, 9000], [tx("ثلاجة", "Fridge"), 2, "", 7000], [tx("غسالة", "Washer"), 3, 0, 6500], [tx("تكييف", "AC"), 5, 15000, 11200]];
    let handle = false, predicted = false;
    const formula = () => handle ? '=IF(OR(C2="",D2="",C2=0),"",(C2-D2)/C2)' : "=(C2-D2)/C2";
    function calc(r) {
      const c = r[2], d = r[3];
      const blank = (v) => v === "" || v == null;
      if (handle && (blank(c) || blank(d) || Number(c) === 0)) return { v: "", k: "ok" };
      if (blank(c) || blank(d)) return Number(c) === 0 || blank(c) ? { v: "#DIV/0!", k: "err" } : { v: "#VALUE!", k: "err" };
      if (Number(c) === 0) return { v: "#DIV/0!", k: "err" };
      return { v: ((Number(c) - Number(d)) / Number(c) * 100).toFixed(1) + "%", k: "num" };
    }
    function drawIn() {
      f.inp.innerHTML = step(1, tx("اوصف المشكلة زي ما في الكتاب", "Describe the problem as the book does")) + `<div class="ptext small">${esc(tx("عندي جدول مبيعات. العمود «أ» فيه اسم المنتج، و«ب» الكمية، و«ج» سعر البيع، و«د» التكلفة. عاوز معادلة تحسب هامش الربح كنسبة مئوية. بس لو البيانات ناقصة، الخلية تبقى فاضية بدل رسالة خطأ. اكتب المعادلة، واشرحهالي ببساطة، واختبرها على تلات حالات مختلفة.", "I have a sales table. Column A is the product name, B the quantity, C the selling price, D the cost. I want a formula that calculates the profit margin as a percentage, but if data is missing the cell stays blank instead of an error. Write the formula, explain it simply, and test it on three different cases."))}</div>${A.pageChips([13])}` +
        step(2, tx("شغّل أو اطفي قاعدة الحالة الاستثنائية", "Turn the edge-case rule on or off")) + `<label class="check"><input type="checkbox" id="fx-h" ${handle ? "checked" : ""}><span><b>${esc(tx("معالجة البيانات الناقصة", "Handle missing data"))}</b><br><span class="small muted">${esc(tx("خلية فاضية بدل رسالة خطأ", "Blank cell instead of an error"))}</span></span></label><p class="hint">${esc(tx("عدّل أي خلية في الجدول وشوف النتيجة بتتغيّر.", "Edit any cell and watch the result change."))}</p>`;
      if (!predicted) f.inp.append(predictBox(tx("من غير المعالجة: إيه اللي بيظهر في صف «ثلاجة» اللي سعره فاضي؟", "Without handling: what shows in the “Fridge” row with a blank price?"), [tx("صفر", "Zero"), tx("رسالة خطأ", "An error message"), tx("خلية فاضية", "A blank cell")], 1, tx("القسمة على خلية فاضية بتطلع خطأ بيوصل للتقرير.", "Dividing by a blank cell gives an error that reaches the report."), () => (predicted = true)));
      f.inp.querySelector("#fx-h").onchange = (e) => { handle = e.target.checked; drawOut(); };
    }
    function drawOut() {
      const res = rows.map(calc);
      const tests = [
        [tx("حالة عادية (شاشة): هامش صح", "Normal case (TV): correct margin"), res[0].v === "25.0%"],
        [tx("سعر ناقص (ثلاجة): خلية فاضية من غير خطأ", "Missing price (fridge): blank, not an error"), res[1].v === ""],
        [tx("سعر صفر (غسالة): خلية فاضية من غير قسمة على صفر", "Zero price (washer): blank, no divide-by-zero"), res[2].v === ""],
      ];
      f.out.innerHTML = step(3, tx("المعادلة الناتجة", "The resulting formula")) + `<div class="ptext ltr" style="font-family:var(--font-mono);font-size:14px">E2 ${esc(formula())}</div>
        <p class="small muted">${esc(handle ? tx("الشرح: لو السعر أو التكلفة فاضيين أو السعر صفر، سيب الخلية فاضية. غير كده احسب (السعر − التكلفة) ÷ السعر.", "Explanation: if price or cost is blank or price is zero, leave it blank; otherwise compute (price − cost) ÷ price.") : tx("الشرح: (السعر − التكلفة) ÷ السعر — من غير أي حماية من الحالات الناقصة.", "Explanation: (price − cost) ÷ price — with no protection for missing cases."))}</p>
        <div class="table-wrap"><table class="minitable"><thead><tr><th>#</th><th>A ${esc(tx("المنتج", "Product"))}</th><th>B ${esc(tx("الكمية", "Qty"))}</th><th>C ${esc(tx("السعر", "Price"))}</th><th>D ${esc(tx("التكلفة", "Cost"))}</th><th>E ${esc(tx("الهامش", "Margin"))}</th></tr></thead><tbody>
        ${rows.map((r, i) => `<tr><th class="num">${i + 2}</th>${r.map((v, j) => `<td><input aria-label="${"ABCD"[j]}${i + 2}" data-r="${i}" data-c="${j}" value="${esc(v)}" ${j === 0 ? "" : 'inputmode="decimal"'}></td>`).join("")}<td class="num ${res[i].k === "err" ? "err" : res[i].v === "" ? "okc" : ""}">${esc(res[i].v || "—")}</td></tr>`).join("")}</tbody></table></div>
        ${step(4, tx("تلات حالات اختبار (زي ما الكتاب بيطلب)", "Three test cases (as the book asks)"))}<div class="checks">${tests.map(([l, ok]) => ck(ok, esc(l))).join("")}</div>`;
      f.out.querySelectorAll("input[data-r]").forEach((inp) => inp.addEventListener("change", () => {
        const r = Number(inp.dataset.r), c = Number(inp.dataset.c);
        rows[r][c] = c === 0 ? inp.value : inp.value.trim() === "" ? "" : Number(inp.value);
        drawOut();
      }));
    }
    drawIn(); drawOut();
  };

  /* ===== 4. Automation decision compass ===== */
  LABS.worth = (host, lab) => {
    const f = frame(host, lab);
    const st = { name: tx("تجميع تقرير المبيعات الأسبوعي", "Compiling the weekly sales report"), per: 4, min: 90, stable: "yes", err: "high", verify: true, build: 12 };
    function drawIn() {
      f.inp.innerHTML = step(1, tx("اوصف مهمتك الحقيقية", "Describe your real task")) + `
        <div class="field"><label for="w-n">${esc(tx("اسم المهمة", "Task name"))}</label><input id="w-n" class="input" value="${esc(st.name)}"></div>
        <div class="field"><label for="w-p">${esc(tx("كام مرة في الشهر؟", "How many times a month?"))} <b class="num" id="w-pv">${st.per}</b></label><input type="range" id="w-p" min="1" max="30" value="${st.per}"></div>
        <div class="field"><label for="w-m">${esc(tx("بتاخد كام دقيقة كل مرة؟", "Minutes per run?"))} <b class="num" id="w-mv">${st.min}</b></label><input type="range" id="w-m" min="5" max="480" step="5" value="${st.min}"></div>
        <div class="field"><label for="w-s">${esc(tx("قواعدها ثابتة؟", "Are its rules stable?"))}</label><select id="w-s" class="input"><option value="yes">${esc(tx("أيوه، الاستثناءات محدودة", "Yes, few exceptions"))}</option><option value="some">${esc(tx("غالبًا، بس فيه استثناءات بتتكرر", "Mostly, frequent exceptions"))}</option><option value="no">${esc(tx("لأ، بتتغيّر كل مرة", "No, they change each time"))}</option></select></div>
        <div class="field"><label for="w-e">${esc(tx("تكلفة الغلط اليدوي", "Cost of a manual error"))}</label><select id="w-e" class="input"><option value="low">${esc(tx("قليلة", "Low"))}</option><option value="mid">${esc(tx("متوسطة", "Medium"))}</option><option value="high">${esc(tx("عالية — أخطاء نسخ ولصق من غير ما تحس", "High — silent copy-paste errors"))}</option></select></div>
        <label class="check"><input type="checkbox" id="w-v" ${st.verify ? "checked" : ""}><span>${esc(tx("تقدر تقارن النتيجة بنتيجة يدوية معروفة، حتى لو مرة واحدة", "The output can be compared with a known manual result, even once"))}</span></label>
        <div class="field"><label for="w-b">${esc(tx("الساعات المتوقعة للبناء والاختبار", "Expected hours to build and test"))} <b class="num" id="w-bv">${st.build}</b></label><input type="range" id="w-b" min="1" max="80" value="${st.build}"></div>`;
      f.inp.querySelector("#w-s").value = st.stable; f.inp.querySelector("#w-e").value = st.err;
      const b = (id, k, num) => { const el = f.inp.querySelector("#" + id); el.addEventListener("input", () => { st[k] = el.type === "checkbox" ? el.checked : num ? Number(el.value) : el.value; const v = f.inp.querySelector("#" + id + "v"); if (v) v.textContent = el.value; drawOut(); }); };
      b("w-n", "name"); b("w-p", "per", 1); b("w-m", "min", 1); b("w-s", "stable"); b("w-e", "err"); b("w-v", "verify"); b("w-b", "build", 1);
    }
    function drawOut() {
      const freq = st.per >= 4 || (st.per >= 1 && st.min >= 120);
      const stable = st.stable === "yes";
      const errc = st.err !== "low";
      const ver = st.verify;
      const monthlyH = (st.per * st.min) / 60;
      const yearH = monthlyH * 12;
      const payback = monthlyH > 0 ? st.build / monthlyH : Infinity;
      const yes = freq && stable && ver;
      const verdict = yes ? tx("تستاهل أداة ✓", "Worth a tool ✓") : !stable ? tx("أسرع بإيدك دلوقتي — ثبّت القواعد الأول", "Faster by hand for now — stabilise the rules first") : !ver ? tx("ماتبنيش قبل ما تلاقي طريقة تتأكد بيها من النتيجة", "Don’t build until you can verify the output") : tx("لسه أسرع بإيدك", "Still faster by hand");
      f.out.innerHTML = step(2, tx("بوصلة القرار — الأسئلة الأربعة", "Decision compass — the four questions")) + `<div class="checks">
        ${ck(freq, esc(tx("التكرار: كل أسبوع أو أكتر، أو كل شهر بس بتاخد ساعات", "Frequency: weekly or more, or monthly but takes hours")))}
        ${ck(stable, esc(tx("الثبات: قواعدها مش بتتغيّر وتقدر تحصر الاستثناءات", "Stability: rules don’t change, exceptions can be listed")), st.stable === "some")}
        ${ck(errc, esc(tx("تكلفة الغلط اليدوي: النسخ واللصق بيطلّع أخطاء من غير ما تحس", "Manual error cost: copy-paste causes silent errors")), !errc)}
        ${ck(ver, esc(tx("تقدر تتأكد: تقارن بنتيجة يدوية معروفة", "Verifiability: compare with a known manual result")))}</div>
        <div class="note ${yes ? "ok" : "sp"}">${ico(yes ? "check" : "info")}<div><b>${esc(st.name)}:</b> ${esc(verdict)}</div></div>
        ${step(3, tx("الأثر بالأرقام (من أرقامك إنت)", "Impact in numbers (from your numbers)"))}
        <div class="statgrid"><div class="stat"><small>${esc(tx("ساعات يدوية/شهر", "Manual hours / month"))}</small><b class="num">${fmt(monthlyH, 1)}</b></div><div class="stat ok"><small>${esc(tx("ساعات بتوفّرها/سنة", "Hours saved / year"))}</small><b class="num">${fmt(yearH, 0)}</b></div><div class="stat ${payback <= 3 ? "ok" : "sp"}"><small>${esc(tx("بتعوّض وقت البناء خلال", "Build time paid back in"))}</small><b class="num">${isFinite(payback) ? fmt(payback, 1) : "—"} ${esc(tx("شهر", "mo"))}</b></div></div>
        ${step(4, tx("لو قررت تبني: أربع قواعد هندسية", "If you build: four engineering rules"))}<div class="checks">${[tx("ماتلمسش البيانات الأصلية — اكتب في نسخة", "Never touch the original data — write to a copy"), tx("سجل تشغيل: إيه اللي اتقرا وكام اتشال وليه", "A run log: what was read, what was excluded and why"), tx("وحدات صغيرة: قراءة ← تنظيف ← تحليل ← إخراج", "Small modules: read → clean → analyse → output"), tx("الفشل الواضح أحسن من نجاح ظاهري يخبي الغلط", "Explicit failure beats silent success")].map((x) => ck(true, esc(x))).join("")}</div>`;
    }
    drawIn(); drawOut();
  };

  /* ===== 5. Automation pipeline ===== */
  LABS.pipeline = (host, lab) => {
    const f = frame(host, lab);
    const st = { file: "ok", fail: true, copy: true, log: true, running: false, res: null };
    const FILES = { ok: tx("ملف سليم (120 صف)", "Clean file (120 rows)"), col: tx("ملف ناقصه عمود «الكمية»", "File missing the “quantity” column"), dup: tx("ملف فيه 9 صفوف مكررة و4 فاضيين", "File with 9 duplicate and 4 empty rows"), fmt: tx("ملف بتاريخ بصيغة مختلفة", "File with a different date format") };
    const STG = [tx("وصول ملف للمجلد", "File arrives"), tx("فحص البنية والأعمدة", "Check structure"), tx("تنظيف وتوحيد ودمج", "Clean & merge"), tx("حساب المؤشرات والشذوذ", "KPIs & anomalies"), tx("بناء التقرير وحفظه", "Build & save report"), tx("تنبيه الناس المعنية", "Notify people")];
    function run() {
      const r = { stages: [], log: [], report: null, msg: "", tone: "ok", orig: st.copy ? "safe" : "changed" };
      const L1 = (s, cls = "") => r.log.push(cls ? `<span class="${cls}">${s}</span>` : s);
      const now = "09:00:0";
      r.stages.push("ok"); L1(`[${now}1] watchdog: new file sales_week.xlsx`, "c");
      let rows = st.file === "dup" ? 133 : 120;
      if (st.file === "col") {
        if (st.fail) { r.stages.push("bad"); L1(`[${now}2] ERROR: column "quantity" not found — run stopped, nothing written`, "r"); r.msg = tx("الأداة وقفت برسالة واضحة: «العمود (الكمية) مش موجود». ولا تقرير غلط اتكتب.", "The tool stopped with a clear message: “column (quantity) not found”. No wrong report was written."); r.tone = "ok"; return r; }
        r.stages.push("ok", "ok", "ok", "ok", "ok"); L1(`[${now}2] column "quantity" missing → filled with 0`, "y");
        r.report = { total: 0, note: tx("إجمالي المبيعات = 0 جنيه (!)", "Total sales = EGP 0 (!)") };
        r.msg = tx("نجاح ظاهري بيخبي الغلط: التقرير طلع شكله «سليم» بس الإجمالي صفر، ووصل للإدارة. ده أخطر من إنه يقف.", "Silent success: the report looks fine but the total is zero, and it reached management. That’s worse than stopping."); r.tone = "bad";
        L1(`[${now}5] report saved, email sent to 3 people`, "g"); return r;
      }
      r.stages.push("ok"); L1(`[${now}2] structure OK: date, branch, product, quantity, price`);
      if (st.file === "dup") { L1(`[${now}3] removed 9 duplicates (same invoice id), 4 empty rows`, "y"); rows = 120; }
      if (st.file === "fmt") { L1(`[${now}3] unified date format dd/mm/yyyy → yyyy-mm-dd (120 rows)`, "y"); }
      r.stages.push("ok"); L1(`[${now}3] clean rows: ${rows}`);
      r.stages.push("ok"); L1(`[${now}4] KPI: total = 1,284,500 · anomaly: Giza −18% vs last week`, "c");
      r.stages.push("ok"); L1(`[${now}5] report → ${st.copy ? "output/report_week.html (original untouched)" : "sales_week.xlsx (ORIGINAL OVERWRITTEN)"}`, st.copy ? "g" : "r");
      r.stages.push("ok"); L1(`[${now}6] notified: sales manager, finance (link)`, "g");
      r.report = { total: 1284500, note: tx("إجمالي المبيعات = 1,284,500 جنيه · تنبيه: الجيزة −18%", "Total sales = EGP 1,284,500 · alert: Giza −18%") };
      r.msg = st.file === "dup" ? tx("التكرارات اتشالت قبل الحساب، والسجل بيوضّح إيه اللي اتشال وليه.", "Duplicates were cleaned before the calculation, and the log explains what was excluded and why.") : tx("سلسلة كاملة من غير تدخل يدوي.", "A complete chain with no manual step.");
      return r;
    }
    function drawIn() {
      f.inp.innerHTML = step(1, tx("اختار الملف اللي بيوصل النهارده", "Pick today’s incoming file")) + `<div class="stack" style="gap:4px">${Object.entries(FILES).map(([k, l]) => `<label class="check"><input type="radio" name="pf" value="${k}" ${st.file === k ? "checked" : ""}><span>${esc(l)}</span></label>`).join("")}</div>` +
        step(2, tx("قواعد الحماية", "Safety rules")) + `<label class="check"><input type="checkbox" id="p-f" ${st.fail ? "checked" : ""}><span>${esc(tx("توقف واضح لو بنية الملف مش متوقعة", "Stop explicitly on an unexpected structure"))}</span></label><label class="check"><input type="checkbox" id="p-c" ${st.copy ? "checked" : ""}><span>${esc(tx("اكتب النتيجة في مجلد منفصل (ماتلمسش الأصل)", "Write output to a separate folder (don’t touch the original)"))}</span></label><label class="check"><input type="checkbox" id="p-l" ${st.log ? "checked" : ""}><span>${esc(tx("سجل تشغيل مكتوب", "Written run log"))}</span></label>
        <button type="button" class="btn pri" id="p-run">${ico("play")}${esc(tx("شغّل السلسلة", "Run the chain"))}</button>`;
      f.inp.querySelectorAll("[name=pf]").forEach((r) => (r.onchange = () => { st.file = r.value; st.res = null; drawOut(); }));
      f.inp.querySelector("#p-f").onchange = (e) => { st.fail = e.target.checked; st.res = null; drawOut(); };
      f.inp.querySelector("#p-c").onchange = (e) => { st.copy = e.target.checked; st.res = null; drawOut(); };
      f.inp.querySelector("#p-l").onchange = (e) => { st.log = e.target.checked; st.res = null; drawOut(); };
      f.inp.querySelector("#p-run").onclick = animate;
    }
    let timer = 0;
    function animate() {
      clearTimeout(timer);
      st.res = run();
      const n = st.res.stages.length;
      let k = 0;
      const tick = () => { drawOut(k); k++; if (k <= n) timer = setTimeout(tick, A.reduceMotion() ? 0 : 420); };
      tick();
    }
    A.onLeave(() => clearTimeout(timer));
    function drawOut(upto) {
      const r = st.res;
      const shown = r ? (upto == null ? r.stages.length : upto) : 0;
      const pipe = STG.map((s, i) => { let c = ""; if (r) { if (i < shown) c = r.stages[i] || "skip"; else if (i === shown && i < r.stages.length) c = "run"; else if (i >= r.stages.length && shown >= r.stages.length) c = "skip"; } return `${i ? `<span class="ar">${A.lang() === "ar" ? "←" : "→"}</span>` : ""}<span class="st ${c}">${i + 1}. ${esc(s)}</span>`; }).join("");
      const finished = r && shown >= r.stages.length;
      f.out.innerHTML = step(3, tx("السلسلة شغّالة", "The chain runs")) + `<div class="pipe">${pipe}</div>` +
        (finished ? `<div class="note ${r.tone === "bad" ? "bad" : "ok"}">${ico(r.tone === "bad" ? "info" : "check")}<div>${esc(r.msg)}</div></div>` +
          (r.report ? `<div class="statgrid"><div class="stat ${r.report.total ? "" : "bad"}"><small>${esc(tx("التقرير", "Report"))}</small><b style="font-size:1rem">${esc(r.report.note)}</b></div><div class="stat ${r.orig === "safe" ? "ok" : "bad"}"><small>${esc(tx("الملف الأصلي", "Original file"))}</small><b style="font-size:1rem">${esc(r.orig === "safe" ? tx("سليم", "Intact") : tx("اتعدّل — مفيش رجوع", "Overwritten — no undo"))}</b></div></div>` : "") +
          step(4, tx("سجل التشغيل", "Run log")) + (st.log ? `<div class="term-log">${r.log.join("\n")}</div>` : `<div class="note sp">${ico("info")}<div>${esc(tx("مفيش سجل: لو حصل خطأ مش هتعرف إيه اللي اتقرا أو اتشال.", "No log: if something goes wrong you won’t know what was read or excluded."))}</div></div>`)
          : `<p class="muted small">${esc(r ? tx("بيشتغل…", "Running…") : tx("اختار الملف والقواعد وبعدين اضغط «شغّل السلسلة».", "Pick the file and rules, then press “Run the chain”."))}</p>`);
    }
    drawIn(); drawOut();
  };

  /* ===== 6. Data quality first ===== */
  LABS.quality = (host, lab) => {
    const f = frame(host, lab);
    const data = [["2026-09-01", "A", 980, 35], ["2026-09-02", "A", 1010, 20], ["2026-09-03", "A", "", 40], ["2026-09-04", "A", 995, 25], ["2026-09-04", "A", 995, 25], ["2026-09-05", "B", 870, 95], ["2026-09-06", "B", 9800, 30], ["2026-09-08", "B", 860, 110], ["2026-09-09", "A", 1005, 22], ["2026-09-10", "B", 845, 120], ["2026-09-11", "A", 990, 30], ["2026-09-12", "B", 830, 125]];
    let checked = false, exclude = false;
    function analyse() {
      const n = data.length;
      const missing = data.map((r, i) => (r[2] === "" || r[2] == null ? i : -1)).filter((i) => i >= 0);
      const seen = new Map(); const dups = [];
      data.forEach((r, i) => { const k = r.join("|"); if (seen.has(k)) dups.push(i); else seen.set(k, i); });
      const vals = data.map((r) => Number(r[2])).filter((v, i) => data[i][2] !== "" && !isNaN(v)).sort((a, b) => a - b);
      const med = vals[Math.floor(vals.length / 2)] || 0;
      const outl = data.map((r, i) => (r[2] !== "" && Math.abs(Number(r[2]) - med) > med * 0.6 ? i : -1)).filter((i) => i >= 0);
      const dates = [...new Set(data.map((r) => r[0]))].sort();
      const gaps = [];
      for (let i = 1; i < dates.length; i++) { const d = (new Date(dates[i]) - new Date(dates[i - 1])) / 864e5; if (d > 1) { const g = new Date(new Date(dates[i - 1]).getTime() + 864e5); gaps.push(g.toISOString().slice(0, 10)); } }
      const bad = new Set([...missing, ...dups, ...outl]);
      const use = data.filter((r, i) => !(exclude && bad.has(i)) && r[2] !== "");
      const avg = use.reduce((a, r) => a + Number(r[2]), 0) / (use.length || 1);
      const byLine = (L1) => { const rr = use.filter((r) => r[1] === L1); return { u: rr.reduce((a, r) => a + Number(r[2]), 0) / (rr.length || 1), d: rr.reduce((a, r) => a + Number(r[3]), 0) / (rr.length || 1) }; };
      return { n, missing, dups, outl, gaps, bad, avg, A: byLine("A"), B: byLine("B") };
    }
    function drawIn() {
      f.inp.innerHTML = step(1, tx("بيانات إنتاج يومية (خيالية) — عدّل لو عاوز", "Daily production data (fictional) — edit if you like")) + `<div class="table-wrap" style="max-height:330px;overflow:auto"><table class="minitable"><thead><tr><th>${esc(tx("التاريخ", "Date"))}</th><th>${esc(tx("الخط", "Line"))}</th><th>${esc(tx("الوحدات", "Units"))}</th><th>${esc(tx("توقف (دقيقة)", "Downtime (min)"))}</th></tr></thead><tbody id="qd"></tbody></table></div>
        <div class="row"><button type="button" class="btn pri" id="q-run">${ico("search")}${esc(tx("راجع الجودة الأول", "Check quality first"))}</button></div>
        <label class="check"><input type="checkbox" id="q-ex" ${exclude ? "checked" : ""}><span>${esc(tx("شيل الصفوف اللي فيها مشاكل من الحساب", "Exclude flawed rows from the calculation"))}</span></label>`;
      drawTable();
      f.inp.querySelector("#q-run").onclick = () => { checked = true; drawTable(); drawOut(); };
      f.inp.querySelector("#q-ex").onchange = (e) => { exclude = e.target.checked; drawOut(); };
    }
    function drawTable() {
      const an = analyse();
      const tb = f.inp.querySelector("#qd");
      tb.innerHTML = data.map((r, i) => `<tr>${r.map((v, j) => `<td class="${checked && j === 2 && (an.missing.includes(i) || an.outl.includes(i)) ? "flag" : ""} ${checked && an.dups.includes(i) ? "flag" : ""}"><input aria-label="${i + 1}-${j + 1}" data-r="${i}" data-c="${j}" value="${esc(v)}"></td>`).join("")}</tr>`).join("");
      tb.querySelectorAll("input").forEach((inp) => inp.addEventListener("change", () => { const r = Number(inp.dataset.r), c = Number(inp.dataset.c); data[r][c] = c >= 2 ? (inp.value.trim() === "" ? "" : Number(inp.value)) : inp.value; drawTable(); drawOut(); }));
    }
    function drawOut() {
      const an = analyse();
      if (!checked) { f.out.innerHTML = `<div class="note">${ico("info")}<div>${esc(tx("ماتبدأش برسم أي حاجة. ابدأ بمراجعة جودة البيانات نفسها.", "Don’t draw anything yet. Start by checking the data quality itself."))}</div></div>` + `<div class="statgrid"><div class="stat"><small>${esc(tx("متوسط الوحدات (من غير فحص)", "Average units (unchecked)"))}</small><b class="num">${fmt(an.avg, 0)}</b></div></div><p class="small muted">${esc(tx("الرقم ده شكله منطقي… هو فعلًا كده؟", "That number looks reasonable… is it?"))}</p>`; return; }
      f.out.innerHTML = step(2, tx("تقرير الجودة بكلام بسيط", "Quality report in plain words")) + `<div class="statgrid"><div class="stat"><small>${esc(tx("عدد الصفوف", "Rows"))}</small><b class="num">${an.n}</b></div><div class="stat ${an.missing.length ? "bad" : "ok"}"><small>${esc(tx("قيم ناقصة", "Missing values"))}</small><b class="num">${an.missing.length}</b></div><div class="stat ${an.dups.length ? "bad" : "ok"}"><small>${esc(tx("صفوف مكررة", "Duplicates"))}</small><b class="num">${an.dups.length}</b></div><div class="stat ${an.outl.length ? "bad" : "ok"}"><small>${esc(tx("أرقام شاذة", "Outliers"))}</small><b class="num">${an.outl.length}</b></div><div class="stat ${an.gaps.length ? "sp" : "ok"}"><small>${esc(tx("أيام ناقصة", "Missing days"))}</small><b class="num">${an.gaps.length}</b></div></div>
        <div class="checks">${an.missing.map((i) => ck(false, esc(tx(`الصف ${i + 1}: عدد الوحدات فاضي`, `Row ${i + 1}: units is blank`)))).join("")}${an.dups.map((i) => ck(false, esc(tx(`الصف ${i + 1}: نسخة مطابقة لصف قبله`, `Row ${i + 1}: exact duplicate of an earlier row`)))).join("")}${an.outl.map((i) => ck(false, esc(tx(`الصف ${i + 1}: ${data[i][2]} وحدة — برّه النطاق المنطقي (غالبًا صفر زيادة)`, `Row ${i + 1}: ${data[i][2]} units — outside the logical range (likely an extra zero)`)))).join("")}${an.gaps.map((g) => ck(false, esc(tx(`فجوة: مفيش بيانات يوم ${g}`, `Gap: no data for ${g}`)), true)).join("")}${!an.bad.size && !an.gaps.length ? ck(true, esc(tx("مفيش مشاكل باينة", "No visible issues"))) : ""}</div>
        ${step(3, tx("السبب ← النتيجة: أثر الجودة على الرقم", "Cause → effect: how quality changes the number"))}
        <div class="statgrid"><div class="stat ${exclude ? "ok" : "bad"}"><small>${esc(exclude ? tx("المتوسط بعد الاستبعاد", "Average after excluding") : tx("المتوسط مع الأخطاء", "Average with errors"))}</small><b class="num">${fmt(an.avg, 0)}</b></div><div class="stat"><small>${esc(tx("خط A: وحدات / توقف", "Line A: units / downtime"))}</small><b class="num" style="font-size:1.05rem">${fmt(an.A.u, 0)} / ${fmt(an.A.d, 0)}′</b></div><div class="stat"><small>${esc(tx("خط B: وحدات / توقف", "Line B: units / downtime"))}</small><b class="num" style="font-size:1.05rem">${fmt(an.B.u, 0)} / ${fmt(an.B.d, 0)}′</b></div></div>
        ${step(4, tx("بعد مراجعة الجودة بس: أسئلة التحليل", "Only after quality: the analysis questions"))}<div class="checks">${[tx("إيه اللي حصل؟ خط B إنتاجه أقل", "What happened? Line B produces less"), tx("فين؟ خط B بالذات", "Where? Line B specifically"), tx("ليه؟ التوقفات في B أطول بكتير وبتزيد", "Why? Line B’s stoppages are much longer and rising"), tx("إيه القرار؟ نراجع أسباب توقف خط B الأسبوع ده", "Decision? Review line B’s stoppage causes this week")].map((x) => ck(exclude, esc(x), !exclude)).join("")}</div>${exclude ? "" : `<p class="small muted">${esc(tx("فعّل الاستبعاد عشان تشوف الاستنتاجات على بيانات نظيفة.", "Turn on exclusion to see conclusions on clean data."))}</p>`}`;
    }
    drawIn(); drawOut();
  };

  /* ===== 7. Dashboard with synced filters ===== */
  LABS.dashboard = (host, lab) => {
    const f = frame(host, lab);
    const months = [tx("يناير", "Jan"), tx("فبراير", "Feb"), tx("مارس", "Mar"), tx("أبريل", "Apr"), tx("مايو", "May"), tx("يونيو", "Jun")];
    const prods = [tx("شاشات", "TVs"), tx("ثلاجات", "Fridges"), tx("غسالات", "Washers")];
    const regs = [tx("القاهرة", "Cairo"), tx("الإسكندرية", "Alexandria"), tx("الدلتا", "Delta")];
    const raw = [];
    for (let m = 0; m < 6; m++) for (let p = 0; p < 3; p++) for (let r = 0; r < 3; r++) raw.push({ m, p, r, v: Math.round((120 + p * 35 + r * 22) * (1 + 0.06 * m - (p === 2 && m > 3 ? 0.25 : 0)) * (r === 1 && m === 4 ? 0.7 : 1)) });
    const st = { from: 0, to: 5, p: "all", r: "all", by: "p", err: false, sort: "v", verified: null };
    const filt = () => raw.filter((x) => x.m >= st.from && x.m <= st.to && (st.p === "all" || x.p === Number(st.p)) && (st.r === "all" || x.r === Number(st.r)));
    function drawIn() {
      f.inp.innerHTML = step(1, tx("الفلاتر (بتحدّث كل حاجة مع بعض)", "Filters (update everything together)")) + `
        <div class="grid g2" style="gap:10px"><div class="field"><label for="d-f">${esc(tx("من شهر", "From"))}</label><select id="d-f" class="input">${months.map((x, i) => `<option value="${i}" ${i === st.from ? "selected" : ""}>${esc(x)}</option>`).join("")}</select></div><div class="field"><label for="d-t">${esc(tx("إلى شهر", "To"))}</label><select id="d-t" class="input">${months.map((x, i) => `<option value="${i}" ${i === st.to ? "selected" : ""}>${esc(x)}</option>`).join("")}</select></div></div>
        <div class="field"><label for="d-p">${esc(tx("المنتج", "Product"))}</label><select id="d-p" class="input"><option value="all">${esc(tx("الكل", "All"))}</option>${prods.map((x, i) => `<option value="${i}">${esc(x)}</option>`).join("")}</select></div>
        <div class="field"><label for="d-r">${esc(tx("المنطقة", "Region"))}</label><select id="d-r" class="input"><option value="all">${esc(tx("الكل", "All"))}</option>${regs.map((x, i) => `<option value="${i}">${esc(x)}</option>`).join("")}</select></div>
        <div class="field"><label for="d-b">${esc(tx("الرسم حسب", "Chart by"))}</label><select id="d-b" class="input"><option value="p">${esc(tx("المنتج", "Product"))}</option><option value="m">${esc(tx("الشهر", "Month"))}</option><option value="r">${esc(tx("المنطقة", "Region"))}</option></select></div>
        ${step(2, tx("المرحلة السابعة: اتأكد من الأرقام", "Stage 7: verify the numbers"))}
        <label class="check"><input type="checkbox" id="d-e"><span>${esc(tx("حاكي غلطة من النموذج (نسي شهر من الإجمالي)", "Simulate a model mistake (drop a month from the total)"))}</span></label>
        <button type="button" class="btn" id="d-v">${ico("check")}${esc(tx("طابق الأرقام مع المصدر", "Match numbers to the source"))}</button>
        <p class="hint">${esc(tx("البيانات خيالية عشان تتدرّب.", "The data is fictional for practice."))}</p>`;
      const b = (id, k) => { const el = f.inp.querySelector("#" + id); el.value = String(st[k]); el.onchange = () => { st[k] = el.type === "checkbox" ? el.checked : el.value; if (k === "from" || k === "to") { st.from = Math.min(Number(st.from), Number(st.to)); st.to = Math.max(Number(st.from), Number(st.to)); } st.verified = null; drawOut(); }; };
      b("d-f", "from"); b("d-t", "to"); b("d-p", "p"); b("d-r", "r"); b("d-b", "by");
      const e = f.inp.querySelector("#d-e"); e.checked = st.err; e.onchange = () => { st.err = e.checked; st.verified = null; drawOut(); };
      f.inp.querySelector("#d-v").onclick = () => { const truth = filt().reduce((a, x) => a + x.v, 0); st.verified = { truth, shown: shownTotal() }; drawOut(); };
    }
    st.from = 0; st.to = 5;
    function shownTotal() { const rows = filt(); return rows.reduce((a, x) => a + x.v, 0) - (st.err ? rows.filter((x) => x.m === Number(st.to)).reduce((a, x) => a + x.v, 0) : 0); }
    function drawOut() {
      st.from = Number(st.from); st.to = Number(st.to);
      const rows = filt();
      const total = shownTotal();
      const mN = st.to - st.from + 1;
      const groups = {};
      const keyName = (x) => (st.by === "p" ? prods[x.p] : st.by === "m" ? months[x.m] : regs[x.r]);
      for (const x of rows) groups[keyName(x)] = (groups[keyName(x)] || 0) + x.v;
      const entries = Object.entries(groups);
      const max = Math.max(1, ...entries.map((e) => e[1]));
      const best = entries.slice().sort((a, b) => b[1] - a[1])[0];
      const firstM = rows.filter((x) => x.m === st.from).reduce((a, x) => a + x.v, 0), lastM = rows.filter((x) => x.m === st.to).reduce((a, x) => a + x.v, 0);
      const trend = firstM ? ((lastM - firstM) / firstM) * 100 : 0;
      const tbl = {};
      for (const x of rows) { const k = prods[x.p] + " · " + regs[x.r]; tbl[k] = (tbl[k] || 0) + x.v; }
      const trows = Object.entries(tbl).sort((a, b) => (st.sort === "v" ? b[1] - a[1] : a[0].localeCompare(b[0])));
      const v = st.verified;
      f.out.innerHTML = `<div class="statgrid"><div class="stat"><small>${esc(tx("إجمالي المبيعات (ألف)", "Total sales (k)"))}</small><b class="num">${fmt(total)}</b></div><div class="stat"><small>${esc(tx("متوسط شهري", "Monthly average"))}</small><b class="num">${fmt(total / mN)}</b></div><div class="stat ${trend >= 0 ? "ok" : "bad"}"><small>${esc(tx("أول ← آخر شهر", "First → last month"))}</small><b class="num">${trend >= 0 ? "+" : ""}${fmt(trend, 1)}%</b></div><div class="stat"><small>${esc(tx("الأعلى", "Top"))}</small><b style="font-size:1rem">${esc(best ? best[0] : "—")}</b></div></div>
        ${v ? `<div class="note ${v.truth === v.shown ? "ok" : "bad"}">${ico(v.truth === v.shown ? "check" : "info")}<div>${esc(v.truth === v.shown ? tx(`تطابق كامل: ${fmt(v.shown)} = مجموع الصفوف الأصلية.`, `Exact match: ${fmt(v.shown)} = sum of source rows.`) : tx(`مش متطابق! اللوحة بتعرض ${fmt(v.shown)} والمصدر ${fmt(v.truth)}. شكل النتيجة الحلو مش معناه إنها صح.`, `Mismatch! The dashboard shows ${fmt(v.shown)} but the source says ${fmt(v.truth)}. A polished output isn’t necessarily correct.`))}</div></div>` : ""}
        <div class="bars" role="img" aria-label="${esc(tx("رسم بياني أفقي", "Horizontal bar chart"))}">${entries.map(([k, val]) => `<div class="hbar"><span>${esc(k)}</span><span class="track"><i style="width:${(val / max) * 100}%"></i></span><span class="v num">${fmt(val)}</span></div>`).join("") || `<p class="muted">${esc(tx("مفيش بيانات للفترة دي.", "No data for this period."))}</p>`}</div>
        <div class="table-wrap"><table class="t"><thead><tr><th><button type="button" class="btn sm ghost" id="s-n">${esc(tx("المنتج · المنطقة", "Product · region"))} ${st.sort === "n" ? "▾" : ""}</button></th><th><button type="button" class="btn sm ghost" id="s-v">${esc(tx("المبيعات", "Sales"))} ${st.sort === "v" ? "▾" : ""}</button></th></tr></thead><tbody>${trows.map(([k, val]) => `<tr><td>${esc(k)}</td><td class="n">${fmt(val)}</td></tr>`).join("")}</tbody></table></div>`;
      f.out.querySelector("#s-n").onclick = () => { st.sort = "n"; drawOut(); };
      f.out.querySelector("#s-v").onclick = () => { st.sort = "v"; drawOut(); };
    }
    drawIn(); drawOut();
  };

  /* ===== 8. Front-end ↔ back-end request ===== */
  LABS.request = (host, lab) => {
    const f = frame(host, lab);
    const regs = ["Cairo", "Alex", "Delta"];
    const regAr = { Cairo: "القاهرة", Alex: "الإسكندرية", Delta: "الدلتا" };
    const DATA = [["2026-07", "Cairo", "TV", 420], ["2026-07", "Alex", "TV", 260], ["2026-07", "Delta", "Fridge", 190], ["2026-08", "Cairo", "Fridge", 380], ["2026-08", "Alex", "TV", 240], ["2026-08", "Delta", "TV", 205], ["2026-09", "Cairo", "TV", 455], ["2026-09", "Alex", "Fridge", 210], ["2026-09", "Delta", "Fridge", 230]];
    const st = { region: "Cairo", down: false, step: -1 };
    function server(region) {
      if (st.down) return { ok: false, status: 503 };
      const rows = DATA.filter((r) => region === "all" || r[1] === region);
      return { ok: true, status: 200, read: DATA.length, json: { region, months: [...new Set(rows.map((r) => r[0]))].length, total: rows.reduce((a, r) => a + r[3], 0), top_product: Object.entries(rows.reduce((o, r) => ((o[r[2]] = (o[r[2]] || 0) + r[3]), o), {})).sort((a, b) => b[1] - a[1])[0]?.[0] || null } };
    }
    const STEPS = [tx("المستخدم بيغيّر فلتر", "User changes a filter"), tx("الواجهة بتبعت طلب", "Front-end sends a request"), tx("الخادم بيستقبله", "Server receives it"), tx("بيقرا البيانات وبيحسب", "Reads data and computes"), tx("بيرجّع النتيجة بشكل منظّم (JSON)", "Returns organised result (JSON)"), tx("الواجهة بترسم النتيجة", "Front-end draws the result")];
    let timer = 0, res = null;
    function send() {
      clearTimeout(timer); res = server(st.region); st.step = 0;
      const tick = () => { drawOut(); st.step++; const stop = !res.ok && st.step > 2; if (st.step <= 6 && !stop) timer = setTimeout(tick, A.reduceMotion() ? 0 : 450); else { st.step = res.ok ? 6 : 3; drawOut(); } };
      tick();
    }
    A.onLeave(() => clearTimeout(timer));
    function drawIn() {
      f.inp.innerHTML = step(1, tx("إنت المستخدم: غيّر الفلتر", "You are the user: change the filter")) + `<div class="field"><label for="rq-r">${esc(tx("المنطقة", "Region"))}</label><select id="rq-r" class="input"><option value="all">${esc(tx("الكل", "All"))}</option>${regs.map((r) => `<option value="${r}" ${st.region === r ? "selected" : ""}>${esc(A.lang() === "ar" ? regAr[r] : r)}</option>`).join("")}</select></div>
        <label class="check"><input type="checkbox" id="rq-d" ${st.down ? "checked" : ""}><span>${esc(tx("الخادم واقف (اختبر حالة الفشل)", "Server is down (test the failure case)"))}</span></label>
        <button type="button" class="btn pri" id="rq-s">${ico("play")}${esc(tx("ابعت الطلب", "Send the request"))}</button>
        <div class="note small">${ico("info")}<div>${esc(tx("API باب في الخادم، وEndpoint عنوان الباب، وJSON صيغة النص المنظّم اللي بين الطرفين.", "API is a door in the server, an endpoint is the door’s address, JSON is the organised text both sides use."))}</div></div>`;
      f.inp.querySelector("#rq-r").onchange = (e) => { st.region = e.target.value; send(); };
      f.inp.querySelector("#rq-d").onchange = (e) => { st.down = e.target.checked; send(); };
      f.inp.querySelector("#rq-s").onclick = send;
    }
    function drawOut() {
      const url = `GET /api/summary?region=${st.region}`;
      f.out.innerHTML = step(2, tx("رحلة طلب واحد", "The journey of one request")) + `<div class="pipe">${STEPS.map((s, i) => `${i ? `<span class="ar">${A.lang() === "ar" ? "←" : "→"}</span>` : ""}<span class="st ${st.step < 0 ? "" : i < st.step ? (res && !res.ok && i >= 2 ? "bad" : "ok") : i === st.step ? "run" : ""}">${i + 1}. ${esc(s)}</span>`).join("")}</div>` +
        (st.step >= 1 ? `<div class="term-log"><span class="c">→ ${esc(url)}</span>${st.step >= 3 && res ? (res.ok ? `\n<span class="g">← ${res.status} OK</span>  (rows read: ${res.read})` : `\n<span class="r">← ${res.status} Service Unavailable</span>`) : ""}${st.step >= 4 && res && res.ok ? "\n" + esc(JSON.stringify(res.json, null, 2)) : ""}</div>` : "") +
        (st.step >= 6 && res && res.ok ? `<div class="statgrid"><div class="stat"><small>${esc(tx("الإجمالي", "Total"))}</small><b class="num">${fmt(res.json.total)}</b></div><div class="stat"><small>${esc(tx("عدد الشهور", "Months"))}</small><b class="num">${res.json.months}</b></div><div class="stat"><small>${esc(tx("المنتج الأعلى", "Top product"))}</small><b>${esc(res.json.top_product || "—")}</b></div></div><p class="small muted">${esc(tx("الواجهة ماحسبتش حاجة — عرضت بس اللي الخادم رجّعه.", "The front-end calculated nothing — it only displayed what the server returned."))}</p>` : "") +
        (res && !res.ok && st.step >= 3 ? `<div class="note bad">${ico("info")}<div>${esc(tx("رسالة واضحة للمستخدم: «مش قادرين نوصل للخادم. اتأكد إنه شغّال وبعدين جرّب تاني.» — بدل أرقام فاضية أو غلط.", "A clear message: “Couldn’t reach the server. Make sure it’s running and try again.” — instead of empty or wrong numbers."))}</div></div>` : "") +
        (st.step < 0 ? `<p class="muted small">${esc(tx("غيّر المنطقة أو اضغط «ابعت الطلب».", "Change the region or press “Send the request”."))}</p>` : "");
    }
    drawIn(); drawOut();
  };

  /* ===== 9. Git simulator ===== */
  LABS.git = (host, lab) => {
    const f = frame(host, lab);
    let g;
    const reset = () => (g = { branch: "main", branches: { main: "c1" }, commits: { c1: { id: "c1", msg: tx("بداية المشروع", "Start the project"), parents: [], lane: "main", n: 1 } }, order: ["c1"], work: 0, staged: 0, remote: { main: "c1" }, teammate: false, log: [], nextN: 2, lanes: ["main"] });
    reset();
    const out = (s, cls) => g.log.push(cls ? `<span class="${cls}">${esc(s)}</span>` : esc(s));
    const head = () => g.branches[g.branch];
    function commit(msg) {
      const id = "c" + g.nextN++;
      g.commits[id] = { id, msg, parents: [head()], lane: g.branch, n: g.nextN - 1 };
      g.order.push(id); g.branches[g.branch] = id; return id;
    }
    const isAnc = (a, b) => { const st = [b]; const seen = new Set(); while (st.length) { const x = st.pop(); if (x === a) return true; if (seen.has(x)) continue; seen.add(x); st.push(...g.commits[x].parents); } return false; };
    const CMDS = {
      edit: () => { g.work++; out(tx("# عدّلت الملف report.py", "# edited report.py"), "y"); },
      status: () => { out("$ git status", "c"); out(`On branch ${g.branch}`); if (g.staged) out(`Changes to be committed: ${g.staged} file(s)`, "g"); if (g.work) out(`Changes not staged: ${g.work} file(s)`, "r"); if (!g.staged && !g.work) out("nothing to commit, working tree clean"); },
      add: () => { out("$ git add .", "c"); if (!g.work) out(tx("مفيش تعديلات تضيفها", "no changes to add")); g.staged += g.work; g.work = 0; },
      commit: (msg) => { msg = (msg || "").trim() || tx("تعديل", "update"); out(`$ git commit -m "${msg}"`, "c"); if (!g.staged) { out(tx("مفيش حاجة مختارة للحفظ — نفّذ git add الأول", "nothing staged — run git add first"), "r"); return; } const id = commit(msg); g.staged = 0; out(`[${g.branch} ${id}] ${msg}`, "g"); if (/^(تعديل|تحديث|update|fix)$/i.test(msg)) out(tx("تنبيه: الرسالة مالهاش معنى؛ اكتب «عملت إيه وليه».", "Hint: meaningless message; write “what you did and why”."), "y"); },
      branch: (name) => { name = (name || "").trim().replace(/\s+/g, "-") || "feature"; out(`$ git branch ${name}`, "c"); if (g.branches[name]) { out(`fatal: branch '${name}' already exists`, "r"); return; } g.branches[name] = head(); if (!g.lanes.includes(name)) g.lanes.push(name); },
      checkout: (name) => { name = (name || "").trim(); out(`$ git checkout ${name}`, "c"); if (!g.branches[name]) { out(`error: branch '${name}' not found`, "r"); return; } if (g.work || g.staged) out(tx("تنبيه: عندك تعديلات ماتحفظتش هتتنقل معاك", "warning: uncommitted changes will carry over"), "y"); g.branch = name; out(`Switched to branch '${name}'`, "g"); },
      merge: (name) => { name = (name || "").trim(); out(`$ git merge ${name}`, "c"); if (!g.branches[name] || name === g.branch) { out("error: choose another existing branch", "r"); return; } const src = g.branches[name]; if (isAnc(src, head())) { out("Already up to date."); return; } if (isAnc(head(), src)) { g.branches[g.branch] = src; out(`Fast-forward → ${src}`, "g"); return; } const id = "c" + g.nextN++; g.commits[id] = { id, msg: `Merge ${name}`, parents: [head(), src], lane: g.branch, n: g.nextN - 1 }; g.order.push(id); g.branches[g.branch] = id; out(`Merge made: ${id}`, "g"); },
      log: () => { out("$ git log --oneline", "c"); let x = head(); const seen = new Set(); const list = []; const st = [x]; while (st.length) { const c = st.shift(); if (seen.has(c)) continue; seen.add(c); list.push(g.commits[c]); st.push(...g.commits[c].parents); } list.sort((a, b) => b.n - a.n).forEach((c) => out(`${c.id} ${c.msg}`)); },
      restore: () => { out("$ git restore report.py", "c"); if (!g.work) out(tx("مفيش تعديلات ماتحفظتش", "no unsaved changes")); else { g.work = 0; out(tx("التعديلات اللي ماتحفظتش اتلغت والملف رجع لآخر حالة", "unsaved edits discarded; file back to last commit"), "g"); } },
      push: () => { out("$ git push", "c"); if (g.remote[g.branch] && !isAnc(g.remote[g.branch], head())) { out(tx("مرفوض: فيه تعديلات على GitHub مش عندك — نفّذ git pull الأول", "rejected: GitHub has commits you don’t — run git pull first"), "r"); return; } g.remote[g.branch] = head(); out(`To github.com/team/project  → ${g.branch} ${head()}`, "g"); },
      pull: () => { out("$ git pull", "c"); const r = g.remote[g.branch]; if (!r) { out(tx("الفرع ده لسه مش موجود على GitHub", "this branch isn’t on GitHub yet")); return; } if (isAnc(r, head())) { out("Already up to date."); return; } if (isAnc(head(), r)) { g.branches[g.branch] = r; out(`Fast-forward → ${r}`, "g"); return; } const id = "c" + g.nextN++; g.commits[id] = { id, msg: "Merge origin/" + g.branch, parents: [head(), r], lane: g.branch, n: g.nextN - 1 }; g.order.push(id); g.branches[g.branch] = id; out(`Merge made: ${id}`, "g"); },
      teammate: () => { const base = g.remote.main || "c1"; const id = "c" + g.nextN++; g.commits[id] = { id, msg: tx("زميل: إصلاح حساب الهامش", "Teammate: fix margin calc"), parents: [base], lane: "origin", n: g.nextN - 1 }; g.order.push(id); g.remote.main = id; if (!g.lanes.includes("origin")) g.lanes.push("origin"); out(tx(`# زميلك رفع ${id} على GitHub`, `# your teammate pushed ${id} to GitHub`), "y"); },
    };
    function drawIn() {
      const brs = Object.keys(g.branches);
      f.inp.innerHTML = step(1, tx("دورة العمل اليومية", "The daily cycle")) + `<div class="row">
        <button type="button" class="btn sm" data-c="edit">${ico("pen")}${esc(tx("عدّل ملف", "Edit a file"))}</button>
        <button type="button" class="btn sm" data-c="status">status</button><button type="button" class="btn sm" data-c="add">add .</button></div>
        <div class="field"><label for="g-m">${esc(tx("رسالة الحفظ", "Commit message"))}</label><div class="row"><input id="g-m" class="input" style="flex:1" placeholder="${esc(tx("إصلاح حساب الهامش لما الكمية تبقى صفر", "Fix margin when quantity is zero"))}"><button type="button" class="btn sm pri" data-c="commit">commit</button></div></div>
        <div class="row"><button type="button" class="btn sm" data-c="push">push</button><button type="button" class="btn sm" data-c="pull">pull</button><button type="button" class="btn sm" data-c="log">log --oneline</button><button type="button" class="btn sm" data-c="restore">restore</button></div>
        ${step(2, tx("الفروع والدمج", "Branches and merging"))}
        <div class="field"><label for="g-b">${esc(tx("اسم الفرع", "Branch name"))}</label><div class="row"><input id="g-b" class="input" style="flex:1" value="feature-chart"><button type="button" class="btn sm" data-c="branch">branch</button></div></div>
        <div class="field"><label for="g-t">${esc(tx("الفرع المستهدف", "Target branch"))}</label><div class="row"><select id="g-t" class="input" style="flex:1">${brs.map((b) => `<option ${b === g.branch ? "selected" : ""}>${b}</option>`).join("")}</select><button type="button" class="btn sm" data-c="checkout">checkout</button><button type="button" class="btn sm" data-c="merge">merge</button></div></div>
        <div class="row"><button type="button" class="btn sm ghost" data-c="teammate">${ico("users")}${esc(tx("زميل بيرفع تعديل", "A teammate pushes"))}</button><button type="button" class="btn sm ghost" id="g-r">${ico("restart")}${esc(tx("ابدأ من جديد", "Reset"))}</button></div>`;
      f.inp.querySelectorAll("[data-c]").forEach((b) => (b.onclick = () => {
        const c = b.dataset.c;
        const arg = c === "commit" ? f.inp.querySelector("#g-m").value : c === "branch" ? f.inp.querySelector("#g-b").value : c === "checkout" || c === "merge" ? f.inp.querySelector("#g-t").value : "";
        CMDS[c](arg);
        if (c === "commit") f.inp.querySelector("#g-m").value = "";
        drawIn(); drawOut();
      }));
      f.inp.querySelector("#g-r").onclick = () => { reset(); drawIn(); drawOut(); };
    }
    function drawOut() {
      const lanes = g.lanes;
      const xs = {}; g.order.forEach((id, i) => (xs[id] = 40 + i * 58));
      const W = Math.max(360, 80 + g.order.length * 58), H = 40 + lanes.length * 46;
      const y = (lane) => 30 + lanes.indexOf(lane) * 46;
      const rtl = A.lang() === "ar";
      const X = (x) => (rtl ? W - x : x);
      let svg = `<svg class="git-graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(tx("رسم تاريخ نقاط الحفظ", "Commit history graph"))}">`;
      lanes.forEach((l) => (svg += `<text x="${X(8)}" y="${y(l) - 12}" font-size="11" fill="var(--ink-3)" text-anchor="${rtl ? "end" : "start"}">${esc(l)}</text>`));
      for (const id of g.order) { const c = g.commits[id]; for (const p of c.parents) svg += `<path d="M${X(xs[p])} ${y(g.commits[p].lane)} C${X((xs[p] + xs[id]) / 2)} ${y(g.commits[p].lane)} ${X((xs[p] + xs[id]) / 2)} ${y(c.lane)} ${X(xs[id])} ${y(c.lane)}" stroke="var(--line-2)" stroke-width="2.5" fill="none"/>`; }
      for (const id of g.order) { const c = g.commits[id]; const isHead = head() === id; svg += `<g><circle cx="${X(xs[id])}" cy="${y(c.lane)}" r="${isHead ? 11 : 9}" fill="${c.parents.length > 1 ? "var(--violet)" : c.lane === "origin" ? "var(--spark)" : "var(--accent)"}" stroke="${isHead ? "var(--ink)" : "var(--surface)"}" stroke-width="3"/><text x="${X(xs[id])}" y="${y(c.lane) + 26}" font-size="10" fill="var(--ink-2)" text-anchor="middle">${id}</text></g>`; }
      svg += "</svg>";
      f.out.innerHTML = `<div class="statgrid"><div class="stat"><small>${esc(tx("الفرع الحالي", "Current branch"))}</small><b class="ltr">${esc(g.branch)}</b></div><div class="stat ${g.work ? "bad" : ""}"><small>${esc(tx("تعديلات لسه ماتضافتش", "Unstaged edits"))}</small><b class="num">${g.work}</b></div><div class="stat ${g.staged ? "sp" : ""}"><small>${esc(tx("جاهزة للحفظ", "Staged"))}</small><b class="num">${g.staged}</b></div><div class="stat ${g.remote[g.branch] === head() ? "ok" : "sp"}"><small>GitHub</small><b style="font-size:.95rem">${esc(g.remote[g.branch] === head() ? tx("متزامن", "In sync") : g.remote[g.branch] ? tx("غير متزامن", "Out of sync") : tx("لسه ماترفعش", "Not pushed"))}</b></div></div>
        ${svg}<div class="term-log" id="g-log">${g.log.slice(-40).join("\n") || esc(tx("# اضغط «عدّل ملف» وبعدين status وبعدين add وبعدين commit وبعدين push", "# press “Edit a file”, then status, add, commit, push"))}</div>
        <p class="hint">${esc(tx("محاكاة بسيطة لسلوك Git من غير ملفات حقيقية.", "A simplified simulation of Git’s behaviour with no real files."))}</p>`;
      const lg = f.out.querySelector("#g-log"); lg.scrollTop = lg.scrollHeight;
    }
    drawIn(); drawOut();
  };

  /* ===== 10. Tokens, cost and tiers ===== */
  LABS.tokens = (host, lab) => {
    const f = frame(host, lab);
    const TIERS = [
      { id: "top", name: tx("القمة", "Top"), inp: 7.5, out: 37.5, ex: "Fable 5.1 · GPT-6 Astra" },
      { id: "strong", name: tx("الوسط القوي", "Strong middle"), inp: 3.5, out: 18.5, ex: "Opus 5 · Gemini 3.1 Pro" },
      { id: "daily", name: tx("العملي اليومي", "Daily practical"), inp: 2, out: 8, ex: "Sonnet 5 · GLM-5.3" },
      { id: "eco", name: tx("الاقتصادي", "Economy"), inp: 0.6, out: 1.5, ex: "MiniMax M3 · DeepSeek V4 Flash" },
    ];
    const st = { text: tx("لخّص التقرير الشهري ده في خمس نقاط لمدير المصنع، وقول أهم تلات مخاطر.", "Summarise this monthly report in five points for the plant manager and list the top three risks."), doc: 3000, outTok: 600, perDay: 200, days: 22, complex: "mid", sensitive: false, speed: false };
    function tokens(s) {
      const ar = (s.match(/[؀-ۿ]+/g) || []).length, la = (s.match(/[A-Za-z]+/g) || []).length, dg = (s.match(/\d/g) || []).length;
      return Math.round(ar * 2.6 + la * 1.3 + dg / 2.5 + (s.match(/[^\s\w؀-ۿ]/g) || []).length * 0.5);
    }
    function drawIn() {
      f.inp.innerHTML = step(1, tx("اكتب نص وشوف التوكنات", "Type text and watch the tokens")) + `<div class="field"><label for="tk-t">${esc(tx("نص الطلب", "Prompt text"))}</label><textarea id="tk-t" class="input" rows="3">${esc(st.text)}</textarea></div>
        <div class="field"><label for="tk-d">${esc(tx("مستند مرفق (توكن)", "Attached document (tokens)"))} <b class="num" id="tk-dv">${fmt(st.doc)}</b></label><input type="range" id="tk-d" min="0" max="200000" step="1000" value="${st.doc}"></div>
        <div class="field"><label for="tk-o">${esc(tx("طول الإجابة (توكن)", "Answer length (tokens)"))} <b class="num" id="tk-ov">${fmt(st.outTok)}</b></label><input type="range" id="tk-o" min="50" max="8000" step="50" value="${st.outTok}"></div>
        <div class="field"><label for="tk-p">${esc(tx("طلبات في اليوم", "Requests per day"))} <b class="num" id="tk-pv">${fmt(st.perDay)}</b></label><input type="range" id="tk-p" min="1" max="5000" step="1" value="${st.perDay}"></div>
        ${step(2, tx("اوصف مهمتك عشان تختار الطبقة", "Describe the task to pick a tier"))}
        <div class="field"><label for="tk-c">${esc(tx("تعقيد المهمة", "Task complexity"))}</label><select id="tk-c" class="input"><option value="low">${esc(tx("بسيطة: تصنيف، تلخيص، فرز", "Simple: classify, summarise, sort"))}</option><option value="mid">${esc(tx("يومية: أغلب شغل المؤسسة", "Everyday: most company work"))}</option><option value="high">${esc(tx("معقدة: تحليل صعب أو برمجة صعبة", "Complex: hard analysis or coding"))}</option></select></div>
        <label class="check"><input type="checkbox" id="tk-s" ${st.sensitive ? "checked" : ""}><span>${esc(tx("بيانات حساسة ماتطلعش برّه المؤسسة", "Sensitive data that must not leave the company"))}</span></label>`;
      f.inp.querySelector("#tk-c").value = st.complex;
      const b = (id, k, num) => { const el = f.inp.querySelector("#" + id); el.addEventListener("input", () => { st[k] = el.type === "checkbox" ? el.checked : num ? Number(el.value) : el.value; const v = f.inp.querySelector("#" + id + "v"); if (v) v.textContent = fmt(el.value); drawOut(); }); };
      b("tk-t", "text"); b("tk-d", "doc", 1); b("tk-o", "outTok", 1); b("tk-p", "perDay", 1); b("tk-c", "complex"); b("tk-s", "sensitive");
    }
    function drawOut() {
      const pt = tokens(st.text);
      const inTok = pt + st.doc;
      const reqMonth = st.perDay * st.days;
      const rows = TIERS.map((ti) => { const ci = (inTok * reqMonth / 1e6) * ti.inp, co = (st.outTok * reqMonth / 1e6) * ti.out; return { ...ti, ci, co, tot: ci + co }; });
      const max = Math.max(...rows.map((r) => r.tot), 0.01);
      const rec = st.sensitive ? "open" : st.complex === "low" ? "eco" : st.complex === "mid" ? "daily" : "strong";
      const recName = { open: tx("مفتوح الأوزان أو محلي (جوّه المؤسسة)", "Open-weights or local (inside the company)"), eco: tx("الاقتصادي", "Economy"), daily: tx("العملي اليومي", "Daily practical"), strong: tx("الوسط القوي — وبعدين القمة بس لو فشل", "Strong middle — top tier only if it fails") }[rec];
      const ctxPct = Math.min(100, (inTok / 1e6) * 100);
      const outShare = rows[2].tot ? (rows[2].co / rows[2].tot) * 100 : 0;
      f.out.innerHTML = `<div class="statgrid"><div class="stat"><small>${esc(tx("توكنات نص الطلب (تقديري)", "Prompt tokens (estimate)"))}</small><b class="num">${fmt(pt)}</b></div><div class="stat"><small>${esc(tx("إدخال لكل طلب", "Input per request"))}</small><b class="num">${fmt(inTok)}</b></div><div class="stat"><small>${esc(tx("طلبات/شهر", "Requests / month"))}</small><b class="num">${fmt(reqMonth)}</b></div></div>
        <div><div class="row" style="justify-content:space-between"><b class="small">${esc(tx("امتلاء نافذة Context بمليون توكن", "Fill of a 1M-token context window"))}</b><span class="num small">${fmt(ctxPct, 1)}%</span></div><div class="bar-meter"><i style="width:${ctxPct}%;background:var(--violet)"></i></div></div>
        ${step(3, tx("التكلفة الشهرية بأسعار الكتاب (سبتمبر 2026، نص كل نطاق)", "Monthly cost at the book’s prices (Sept 2026, mid-range)"))}
        <div class="bars">${rows.map((r) => `<div class="hbar"><span>${esc(r.name)}</span><span class="track"><i style="width:${(r.tot / max) * 100}%;background:${r.id === rec ? "var(--mint)" : "var(--accent)"}"></i></span><span class="v num">$${fmt(r.tot, r.tot < 10 ? 2 : 0)}</span></div>`).join("")}</div>
        <p class="small muted">${esc(tx(`الإخراج بيمثّل ${fmt(outShare, 0)}% من تكلفة الطبقة اليومية — عشان أغلى من الإدخال 3–6 مرات (الفخ الأول).`, `Output is ${fmt(outShare, 0)}% of the daily tier’s cost — it’s 3–6× pricier than input (pricing trap #1).`))}</p>
        <div class="note ok">${ico("target")}<div><b>${esc(tx("الطبقة المقترحة:", "Suggested tier:"))}</b> ${esc(recName)}<div class="small">${esc(tx("القاعدة: ابدأ من تحت، وماتطلعش لفوق غير لما الطبقة الأقل تفشل فعلًا في مهمتك.", "Rule: start from the bottom; move up only when the lower tier actually fails at your task."))}</div></div></div>
        <p class="hint">${esc(tx("عدّ التوكنات تقريبي: العربي بيستهلك أكتر من الإنجليزي لنفس المعنى، وأحيانًا الضعف. الأسعار من صفحة 35 وبتتغيّر كل كام أسبوع.", "Token counts are approximate: Arabic uses more than English for the same meaning, sometimes double. Prices are from page 35 and change every few weeks."))}</p>`;
    }
    drawIn(); drawOut();
  };

  /* ===== 11. Local models fit ===== */
  LABS.local = (host, lab) => {
    const f = frame(host, lab);
    const st = { ram: 16, size: 8, q: true, sens: true, offline: false, best: false };
    const table = [[8, tx("من 3 لـ4 مليارات معامل", "3–4B parameters"), tx("تلخيص، وتصنيف، وأسئلة بسيطة", "Summaries, classification, simple Q&A")], [16, tx("من 7 لـ9 مليارات", "7–9B"), tx("الاستخدام اليومي وكتابة أكواد قصيرة", "Daily use and short code")], [32, tx("من 14 لـ32 مليار", "14–32B"), tx("تحليل أعمق ومهام على أكتر من خطوة", "Deeper analysis, multi-step tasks")], [64, tx("70 مليار وطالع", "70B+"), tx("أقرب حاجة لجودة الخدمات السحابية", "Closest to cloud quality")]];
    function drawIn() {
      f.inp.innerHTML = step(1, tx("جهازك والنموذج", "Your machine and the model")) + `
        <div class="field"><label for="lm-r">${esc(tx("ذاكرة الجهاز أو كرت الشاشة (GB)", "Machine or GPU memory (GB)"))} <b class="num" id="lm-rv">${st.ram}</b></label><input type="range" id="lm-r" min="8" max="128" step="8" value="${st.ram}"></div>
        <div class="field"><label for="lm-s">${esc(tx("حجم النموذج (مليار معامل)", "Model size (billion parameters)"))} <b class="num" id="lm-sv">${st.size}</b></label><input type="range" id="lm-s" min="3" max="72" step="1" value="${st.size}"></div>
        <label class="check"><input type="checkbox" id="lm-q" ${st.q ? "checked" : ""}><span><b>Quantization · Q4_K_M</b><br><span class="small muted">${esc(tx("ضغط أرقام النموذج لدقة أقل", "Compress the model’s numbers to lower precision"))}</span></span></label>
        ${step(2, tx("المحلي مناسب؟", "Is local right?"))}
        <label class="check"><input type="checkbox" id="lm-se" ${st.sens ? "checked" : ""}><span>${esc(tx("البيانات حساسة ومينفعش أرفعها", "Data is sensitive and can’t be uploaded"))}</span></label>
        <label class="check"><input type="checkbox" id="lm-of" ${st.offline ? "checked" : ""}><span>${esc(tx("محتاج أشتغل من غير إنترنت", "I need to work offline"))}</span></label>
        <label class="check"><input type="checkbox" id="lm-b" ${st.best ? "checked" : ""}><span>${esc(tx("محتاج أعلى جودة ممكنة في تحليل معقد", "I need the highest quality for complex analysis"))}</span></label>`;
      const b = (id, k, num) => { const el = f.inp.querySelector("#" + id); el.addEventListener("input", () => { st[k] = el.type === "checkbox" ? el.checked : num ? Number(el.value) : el.value; const v = f.inp.querySelector("#" + id + "v"); if (v) v.textContent = el.value; drawOut(); }); };
      b("lm-r", "ram", 1); b("lm-s", "size", 1); b("lm-q", "q"); b("lm-se", "sens"); b("lm-of", "offline"); b("lm-b", "best");
    }
    function drawOut() {
      const fp16 = st.size * 2 + 1.5, q4 = st.size * 0.57 + 1;
      const need = st.q ? q4 : fp16;
      const fits = need <= st.ram * 0.85;
      const row = table.filter((r) => r[0] <= st.ram).pop() || table[0];
      const local = (st.sens || st.offline) && !st.best;
      f.out.innerHTML = step(3, tx("الذاكرة المطلوبة", "Memory needed")) + `<div class="bars"><div class="hbar"><span>16-bit</span><span class="track"><i style="width:${Math.min(100, (fp16 / 160) * 100)}%;background:var(--rose)"></i></span><span class="v num">${fmt(fp16, 1)} GB</span></div><div class="hbar"><span>Q4_K_M</span><span class="track"><i style="width:${Math.min(100, (q4 / 160) * 100)}%;background:var(--mint)"></i></span><span class="v num">${fmt(q4, 1)} GB</span></div><div class="hbar"><span>${esc(tx("جهازك", "Yours"))}</span><span class="track"><i style="width:${Math.min(100, (st.ram / 160) * 100)}%;background:var(--accent)"></i></span><span class="v num">${st.ram} GB</span></div></div>
        <div class="note ${fits ? "ok" : "bad"}">${ico(fits ? "check" : "info")}<div>${esc(fits ? tx(`نموذج ${st.size}B بيشتغل على جهازك ${st.q ? "مع الضغط" : "بدون ضغط"}.`, `A ${st.size}B model runs on your machine ${st.q ? "with" : "without"} compression.`) : tx(`مش كفاية: محتاج حوالي ${fmt(need, 1)} GB. ${st.q ? "اختر نموذجًا أصغر." : "جرّب الضغط Q4_K_M أولًا."}`, `Not enough: needs about ${fmt(need, 1)} GB. ${st.q ? "Pick a smaller model." : "Try Q4_K_M compression first."}`))}</div></div>
        ${step(4, tx("دليل الكتاب التقريبي لجهازك", "The book’s rough guide for your machine"))}<div class="table-wrap"><table class="t"><thead><tr><th>GB</th><th>${esc(tx("حجم مناسب", "Fitting size"))}</th><th>${esc(tx("ينفع لـ", "Good for"))}</th></tr></thead><tbody>${table.map((r) => `<tr style="${r === row ? "background:var(--accent-soft)" : ""}"><td class="n">${r[0]}${r[0] === 32 ? "" : ""}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div>
        <div class="note ${local ? "ok" : "sp"}">${ico("target")}<div><b>${esc(local ? tx("المحلي مناسب لحالتك.", "Local fits your case.") : st.best ? tx("استخدم السحابة: المحلي بيفضل طبقة أو طبقتين ورا القمة.", "Use the cloud: local stays a tier or two behind the top.") : tx("السحابة أسهل هنا، والمحلي اختياري لو عاوز تجرّبه.", "Cloud is easier here; local is optional for experiments."))}</b><div class="small">${esc(tx("LM Studio واجهة رسومية للمبتدئ، وOllama أوامر قصيرة بتندمج في المشاريع. والاتنين بيوفّروا خادم محلي متوافق مع واجهة OpenAI.", "LM Studio is a GUI for beginners; Ollama is short commands for projects. Both provide a local OpenAI-compatible server."))}</div></div></div>
        <p class="hint">${esc(tx("الحساب تقريبي: الذاكرة ≈ المعاملات × البايتات لكل معامل + هامش تشغيل.", "Approximate: memory ≈ parameters × bytes per parameter + runtime overhead."))}</p>`;
    }
    drawIn(); drawOut();
  };

  /* ===== 12. Manual process → system ===== */
  LABS.system = (host, lab) => {
    const f = frame(host, lab);
    const T = [
      { id: 1, t: tx("الموظف بيملا نموذج إكسل وبيبعته بالبريد للمدير", "Employee fills an Excel form and emails the manager"), min: 10, risk: 1, layer: tx("المصادر", "Sources") },
      { id: 2, t: tx("المدير بيقرر يوافق أو يرفض", "Manager decides approve / reject"), min: 15, risk: 0, decision: true, layer: tx("قرار بشري", "Human decision") },
      { id: 3, t: tx("المشتريات بتنسخ الطلب بإيدها للنظام", "Purchasing re-types the request into the system"), min: 12, risk: 2, layer: tx("التجميع والتوحيد", "Collect & unify") },
      { id: 4, t: tx("المشتريات بتراجع حد الموافقة وعروض الأسعار", "Purchasing checks approval limit and quotes"), min: 20, risk: 2, layer: tx("المنطق والقواعد", "Logic & rules") },
      { id: 5, t: tx("المخزن بيحدّث شيت الاستلام بإيده", "Warehouse updates the receiving sheet by hand"), min: 8, risk: 2, layer: tx("التجميع والتوحيد", "Collect & unify") },
      { id: 6, t: tx("المالية بتدخل الفاتورة تاني وبتطابقها", "Finance re-enters and matches the invoice"), min: 15, risk: 3, layer: tx("المنطق والقواعد", "Logic & rules") },
      { id: 7, t: tx("تقرير شهري بيتجمّع يدويًا للإدارة", "A monthly report compiled by hand"), min: 240, risk: 2, monthly: true, layer: tx("العرض والإجراء", "Display & action") },
    ];
    const auto = new Set();
    let perMonth = 60, warn = false;
    function drawIn() {
      f.inp.innerHTML = step(1, tx("عملية «طلب شراء» (خيالية)", "A “purchase request” process (fictional)")) + `<div class="field"><label for="sy-n">${esc(tx("طلبات في الشهر", "Requests per month"))} <b class="num" id="sy-nv">${perMonth}</b></label><input type="range" id="sy-n" min="5" max="400" step="5" value="${perMonth}"></div>
        ${step(2, tx("اختار النقلات اليدوية اللي هتخلّيها آلية", "Choose which manual hand-offs to automate"))}<div class="stack" style="gap:4px">${T.map((x) => `<label class="check"><input type="checkbox" data-t="${x.id}" ${auto.has(x.id) ? "checked" : ""}><span>${esc(x.t)}<br><span class="small muted">${esc(x.layer)} · ${x.monthly ? esc(tx(`${x.min} دقيقة في الشهر`, `${x.min} min monthly`)) : esc(tx(`${x.min} دقيقة لكل طلب`, `${x.min} min per request`))}</span></span></label>`).join("")}</div>
        <button type="button" class="btn sm" id="sy-slice">${ico("layers")}${esc(tx("اقترح أول شريحة عمودية", "Suggest a first vertical slice"))}</button>`;
      f.inp.querySelector("#sy-n").addEventListener("input", (e) => { perMonth = Number(e.target.value); f.inp.querySelector("#sy-nv").textContent = perMonth; drawOut(); });
      f.inp.querySelectorAll("[data-t]").forEach((c) => (c.onchange = () => {
        const id = Number(c.dataset.t); const it = T.find((x) => x.id === id);
        if (it.decision && c.checked) { warn = true; c.checked = false; drawOut(); return; }
        warn = false; c.checked ? auto.add(id) : auto.delete(id); drawOut();
      }));
      f.inp.querySelector("#sy-slice").onclick = () => { auto.clear(); [1, 3, 4].forEach((x) => auto.add(x)); warn = false; drawIn(); drawOut(); };
    }
    function drawOut() {
      const manual = T.filter((x) => !x.decision && !auto.has(x.id));
      const minsBefore = T.filter((x) => !x.decision).reduce((a, x) => a + (x.monthly ? x.min : x.min * perMonth), 0);
      const minsAfter = manual.reduce((a, x) => a + (x.monthly ? x.min : x.min * perMonth), 0);
      const riskBefore = T.reduce((a, x) => a + x.risk, 0), riskAfter = manual.reduce((a, x) => a + x.risk, 0);
      f.out.innerHTML = (warn ? `<div class="note bad">${ico("shield")}<div>${esc(tx("خطوة الموافقة قرار له أثر مالي: لازم تفضل بموافقة بشرية واضحة. الأتمتة بتتولى النقل والحساب والتنبيه بس.", "Approval is a decision with financial impact: it stays with an explicit human approval. Automation handles moving, calculating and alerting only."))}</div></div>` : "") +
        step(3, tx("الأثر", "Impact")) + `<div class="statgrid"><div class="stat ${manual.length ? "sp" : "ok"}"><small>${esc(tx("نقلات يدوية لسه فاضلة", "Manual hand-offs left"))}</small><b class="num">${manual.length}/6</b></div><div class="stat ok"><small>${esc(tx("ساعات بتوفّرها شهريًا", "Hours saved / month"))}</small><b class="num">${fmt((minsBefore - minsAfter) / 60, 1)}</b></div><div class="stat ${riskAfter < riskBefore / 2 ? "ok" : "bad"}"><small>${esc(tx("نقط ممكن يحصل فيها غلط من غير ما تحس", "Possible silent-error points"))}</small><b class="num">${riskAfter}/${riskBefore}</b></div></div>
        ${step(4, tx("خريطة العملية", "Process map"))}<div class="pipe">${T.map((x, i) => `${i ? `<span class="ar">${A.lang() === "ar" ? "←" : "→"}</span>` : ""}<span class="st ${x.decision ? "run" : auto.has(x.id) ? "ok" : "bad"}" title="${esc(x.t)}">${x.id}. ${esc(x.decision ? tx("قرار بشري", "Human decision") : auto.has(x.id) ? tx("آلي", "Automated") : tx("يدوي", "Manual"))}</span>`).join("")}</div>
        <p class="small muted">${esc(tx("كل نقلة يدوية = نقطة تأخير ومصدر غلط واعتماد على شخص بعينه. عدّها: دي بالظبط قايمة اللي هتبنيه.", "Every manual hand-off = a delay, an error source and dependence on one person. Count them: that’s exactly your build list."))}</p>
        ${auto.size ? `<div class="note">${ico("layers")}<div>${esc(tx("ابدأ بجزء صغير واشتغل عليه بعمق: كمّل الطبقات الخمسة لشريحة واحدة لحد الإشعار والقرار، وبعدين وسّع.", "Start narrow and deep: finish all five layers for one slice up to notification and decision, then widen."))}</div></div>` : ""}`;
    }
    drawIn(); drawOut();
  };

  /* ===== 13. Agents and digital team ===== */
  LABS.agents = (host, lab) => {
    const f = frame(host, lab);
    const st = { tab: "loop", max: 4, cap: true, approve: true, scenario: "fixable", pattern: "critic", err: true, log: [], waiting: false, cost: 0 };
    const who = (k) => ({ plan: tx("خطة", "Plan"), act: tx("تنفيذ", "Act"), see: tx("ملاحظة", "Observe"), stop: tx("توقف", "Stop"), ok: tx("نجاح", "Done"), human: tx("إنسان", "Human") }[k] || k);
    function runLoop() {
      const L1 = []; let cost = 0; const push = (k, m, cls) => { L1.push({ k, m, cls }); cost += 0.02; };
      push("plan", tx("الهدف: ملخص مبيعات الأسبوع. الأدوات: قراءة ملف، إرسال رسالة.", "Goal: weekly sales summary. Tools: read file, send message."));
      const limit = st.cap ? st.max : 12;
      let done = false;
      for (let a = 1; a <= limit; a++) {
        if (st.scenario === "fixable") {
          if (a === 1) { push("act", tx("محاولة 1: قراءة sales.xlsx", "Attempt 1: read sales.xlsx")); push("see", tx("خطأ: عمود «الكمية» اسمه مختلف «Qty»", "Error: “quantity” column is named “Qty”"), "crit"); continue; }
          if (a === 2) { push("act", tx("محاولة 2: ربط «Qty» بالكمية وقراية الملف تاني", "Attempt 2: map “Qty” to quantity and re-read")); push("see", tx("القراءة نجحت: 412 صف، و3 صفوف فاضيين اتشالوا", "Read OK: 412 rows, 3 empty rows excluded")); continue; }
          if (a === 3) { push("act", tx("محاولة 3: حساب الإجماليات وكتابة الملخص", "Attempt 3: compute totals and write the summary")); push("ok", tx("الهدف اتحقق: الملخص جاهز", "Goal met: summary ready"), "ok"); done = true; break; }
        } else { push("act", tx(`محاولة ${a}: البحث عن sales_old.xlsx`, `Attempt ${a}: look for sales_old.xlsx`)); push("see", tx("الملف مش موجود", "File not found"), "crit"); }
      }
      if (!done) { if (st.cap) push("stop", tx(`وصل للحد (${st.max} محاولات). وقف وسأل الإنسان بدل ما يكمّل.`, `Hit the limit (${st.max} attempts). Stopped and asked a human instead of continuing.`), "stop"); else push("stop", tx("من غير سقف: الحلقة فضلت تستهلك الميزانية من غير ما تحس (وقفنا العرض عند 12).", "No cap: the loop kept spending silently (demo stopped at 12)."), "stop"); }
      st.waiting = done && st.approve;
      if (done && !st.approve) push("act", tx("بعت الملخص للمدير على طول — من غير موافقة بشرية!", "Sent the summary to the manager directly — no human approval!"), "stop");
      st.log = L1; st.cost = cost;
    }
    function runTeam() {
      const L1 = []; const push = (k, m, cls) => L1.push({ k, m, cls });
      const R = { co: tx("المنسق", "Coordinator"), ga: tx("الجامع", "Collector"), an: tx("المحلل", "Analyst"), cr: tx("المراجع", "Critic"), ed: tx("المحرر", "Editor") };
      const bad = st.err;
      if (st.pattern === "chain") {
        push(R.ga, tx("قرا ملفات الفروع التلاتة (قراءة بس).", "Read the three branch files (read-only)."));
        push(R.an, bad ? tx("الإجمالي = 1,940 (نسي فرع الدلتا بالغلط)", "Total = 1,940 (dropped Delta by mistake)") : tx("الإجمالي = 2,615", "Total = 2,615"), bad ? "crit" : "");
        push(R.ed, bad ? tx("كتب للمدير: «الإجمالي 1,940» — الغلطة وصلت للنتيجة النهائية.", "Wrote to the manager: “total 1,940” — the error reached the final output.") : tx("كتب الملخص للمدير بلغته.", "Wrote the summary in the manager’s language."), bad ? "stop" : "ok");
      } else if (st.pattern === "fan") {
        push(R.co, tx("وزّع: كل وكيل يحلّل فرع.", "Split: each agent analyses one branch."));
        push(R.an + " 1", tx("القاهرة = 1,120", "Cairo = 1,120")); push(R.an + " 2", tx("الإسكندرية = 820", "Alexandria = 820")); push(R.an + " 3", bad ? tx("الدلتا = 0 (ماعرفش يقرا)", "Delta = 0 (read failed)") : tx("الدلتا = 675", "Delta = 675"), bad ? "crit" : "");
        push(R.co, bad ? tx("جمع النتائج: 1,940 — محدش راجع، فالغلطة عدّت.", "Merged: 1,940 — nobody reviewed, so the error passed.") : tx("جمع النتائج: 2,615.", "Merged: 2,615."), bad ? "stop" : "ok");
      } else {
        push(R.ga, tx("قرا الملفات (قراءة بس).", "Read the files (read-only)."));
        push(R.an, bad ? tx("الإجمالي = 1,940", "Total = 1,940") : tx("الإجمالي = 2,615", "Total = 2,615"), bad ? "crit" : "");
        if (bad) { push(R.cr, tx("مرفوض: مجموع الفروع مش مطابق؛ فرع الدلتا ناقص. اعمله تاني بمصدر لكل رقم.", "Rejected: branch totals don’t match; Delta is missing. Redo with a source for every number."), "crit"); push(R.an, tx("الدورة 2: الإجمالي = 2,615 بمصدر لكل فرع.", "Round 2: total = 2,615 with a source per branch.")); push(R.cr, tx("مقبول بعد دورتين (أقصى حد دورتين وبعدين الإنسان).", "Accepted after two rounds (max two, then a human)."), "ok"); }
        else push(R.cr, tx("مقبول: كل رقم ليه مصدر.", "Accepted: every number is backed by a source."), "ok");
        push(R.ed, tx("كتب الملخص للمدير.", "Wrote the summary for the manager."), "ok");
      }
      st.log = L1;
    }
    function drawIn() {
      f.inp.innerHTML = `<div class="tabs" role="tablist"><button role="tab" type="button" aria-selected="${st.tab === "loop"}" data-tab="loop">${ico("restart")}${esc(tx("حلقة الوكيل", "Agent loop"))}</button><button role="tab" type="button" aria-selected="${st.tab === "team"}" data-tab="team">${ico("users")}${esc(tx("الفريق الرقمي", "Digital team"))}</button></div>`;
      f.inp.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { st.tab = b.dataset.tab; st.log = []; st.waiting = false; drawIn(); drawOut(); }));
      if (st.tab === "loop") {
        f.inp.insertAdjacentHTML("beforeend", step(1, tx("الهدف والحدود", "Goal and limits")) + `
          <div class="field"><label for="ag-s">${esc(tx("السيناريو", "Scenario"))}</label><select id="ag-s" class="input"><option value="fixable">${esc(tx("مشكلة تقدر تصلّحها (اسم عمود مختلف)", "A fixable problem (different column name)"))}</option><option value="impossible">${esc(tx("هدف مستحيل (ملف مش موجود)", "An impossible goal (missing file)"))}</option></select></div>
          <label class="check"><input type="checkbox" id="ag-c" ${st.cap ? "checked" : ""}><span>${esc(tx("سقف للمحاولات والتكلفة", "A cap on attempts and cost"))}</span></label>
          <div class="field"><label for="ag-m">${esc(tx("أقصى عدد محاولات", "Max attempts"))} <b class="num" id="ag-mv">${st.max}</b></label><input type="range" id="ag-m" min="1" max="6" value="${st.max}" ${st.cap ? "" : "disabled"}></div>
          <label class="check"><input type="checkbox" id="ag-a" ${st.approve ? "checked" : ""}><span>${esc(tx("الإرسال محتاج موافقة بشرية", "Sending needs human approval"))}</span></label>
          <button type="button" class="btn pri" id="ag-run">${ico("play")}${esc(tx("شغّل الوكيل", "Run the agent"))}</button>`);
        f.inp.querySelector("#ag-s").value = st.scenario;
        f.inp.querySelector("#ag-s").onchange = (e) => (st.scenario = e.target.value);
        f.inp.querySelector("#ag-c").onchange = (e) => { st.cap = e.target.checked; f.inp.querySelector("#ag-m").disabled = !st.cap; };
        f.inp.querySelector("#ag-m").oninput = (e) => { st.max = Number(e.target.value); f.inp.querySelector("#ag-mv").textContent = st.max; };
        f.inp.querySelector("#ag-a").onchange = (e) => (st.approve = e.target.checked);
        f.inp.querySelector("#ag-run").onclick = () => { runLoop(); drawOut(); };
      } else {
        f.inp.insertAdjacentHTML("beforeend", step(1, tx("نمط التنسيق", "Coordination pattern")) + `<div class="stack" style="gap:4px">${[["chain", tx("السلسلة: وكيل بعد وكيل", "Chain: agent after agent")], ["fan", tx("التوزيع والتجميع", "Fan-out / fan-in")], ["critic", tx("المنفذ والناقد", "Executor and critic")]].map(([k, l]) => `<label class="check"><input type="radio" name="pat" value="${k}" ${st.pattern === k ? "checked" : ""}><span>${esc(l)}</span></label>`).join("")}</div>
          <label class="check"><input type="checkbox" id="ag-e" ${st.err ? "checked" : ""}><span>${esc(tx("حط غلطة في شغل واحد من الوكلاء", "Inject an error into one agent’s work"))}</span></label>
          <button type="button" class="btn pri" id="ag-t">${ico("play")}${esc(tx("شغّل الفريق", "Run the team"))}</button>`);
        f.inp.querySelectorAll("[name=pat]").forEach((r) => (r.onchange = () => (st.pattern = r.value)));
        f.inp.querySelector("#ag-e").onchange = (e) => (st.err = e.target.checked);
        f.inp.querySelector("#ag-t").onclick = () => { runTeam(); drawOut(); };
      }
    }
    function drawOut() {
      if (!st.log.length) { f.out.innerHTML = `<p class="muted small">${esc(tx("اضبط الإعدادات وبعدين شغّل.", "Set the options, then run."))}</p><div class="note">${ico("info")}<div>${esc(tx("الوكيل = هدف + أدوات + تكرار: بينفّذ، وبيشوف النتيجة، وبيصحّح لحد ما الهدف يتحقق أو يقف عند حد متحدد من الأول.", "Agent = goal + tools + repetition: it acts, sees the result and corrects until the goal is met or it hits a preset limit."))}</div></div>`; return; }
      const isLoop = st.tab === "loop";
      f.out.innerHTML = step(2, tx("السجل خطوة بخطوة", "Step-by-step log")) + `<div class="agent-log">${st.log.map((x) => `<div class="alog ${x.cls || ""}"><span class="who">${esc(isLoop ? who(x.k) : x.k)}</span><span>${esc(x.m)}</span></div>`).join("")}</div>` +
        (isLoop ? `<div class="statgrid"><div class="stat ${st.cost > 0.3 ? "bad" : ""}"><small>${esc(tx("تكلفة تقديرية", "Estimated cost"))}</small><b class="num">$${fmt(st.cost, 2)}</b></div><div class="stat"><small>${esc(tx("خطوات", "Steps"))}</small><b class="num">${st.log.length}</b></div></div>` : "") +
        (st.waiting ? `<div class="note sp">${ico("shield")}<div><b>${esc(tx("مستني موافقة بشرية قبل الإرسال", "Waiting for human approval before sending"))}</b><div class="row" style="margin-top:8px"><button type="button" class="btn sm ok" id="ag-ok">${ico("check")}${esc(tx("موافقة", "Approve"))}</button><button type="button" class="btn sm" id="ag-no">${ico("x")}${esc(tx("رفض", "Reject"))}</button></div></div></div>` : "");
      const ok = f.out.querySelector("#ag-ok"), no = f.out.querySelector("#ag-no");
      if (ok) ok.onclick = () => { st.waiting = false; st.log.push({ k: "human", m: tx("الإنسان وافق؛ الملخص اتبعت واتكتب في السجل.", "Human approved; summary sent and logged."), cls: "ok" }); drawOut(); };
      if (no) no.onclick = () => { st.waiting = false; st.log.push({ k: "human", m: tx("الإنسان رفض؛ مفيش حاجة اتبعتت.", "Human rejected; nothing was sent."), cls: "stop" }); drawOut(); };
    }
    drawIn(); drawOut();
  };

  /* ===== 14. The unit-2 projects: one zip per lesson, a ladder from describing a file to a materials order ===== */
  /* The project panel: where this project sits on the ladder, what is in its zip (a peek inside every workbook), the
     download, and the guide files. The planted problems stay hidden until the reader asks for the answer key. */
  function mountXlProject(host, lessonId, pick) {
    const X = A.xlProjects, lang = A.lang();
    let p = X.byLesson[lessonId] || X.list[0], cur = 0, sheet = 0;
    const box = h("div", { class: "xp" });
    host.append(box);
    const day = (d) => new Date(Date.UTC(1899, 11, 30) + d * 864e5).toISOString().slice(0, 10);
    const cell = (v) => (v && typeof v === "object" ? day(v.d) : v === null || v === undefined ? "" : typeof v === "number" ? fmt(v, Number.isInteger(v) ? 0 : 2) : String(v));
    const short = (path) => path.replace(/^Data\//, "");
    function draw() {
      const g = X.guide(p, lang), files = p.files(), f = files[cur], lv = p.level;
      const ladder = `<ol class="xp-ladder" aria-label="${esc(tx("مشاريع الوحدة", "The unit's projects"))}">${X.list.map((q) => {
        const inner = `<span class="n num">${q.n}</span><span>${esc(L(q.short))}</span>`;
        return `<li class="${q === p ? "on" : ""}">${pick ? `<button type="button" data-p="${q.n}" aria-pressed="${q === p}"${q === p ? " disabled" : ""}>${inner}</button>` : q === p ? `<span aria-current="step">${inner}</span>` : `<a href="#lesson-${q.lesson}">${inner}</a>`}</li>`;
      }).join("")}</ol>`;
      const dots = `<span class="xp-lv" title="${esc(tx("الصعوبة", "Difficulty"))}">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= lv ? "on" : ""}"></i>`).join("")}</span>`;
      let peek = "";
      if (f.lock) peek = `<div class="note">${ico("info")}<div>${esc(tx("ده مش تقرير: ملف صغير بيعمله إكسل لما حد يكون فاتح الملف. الأداة لازم تتخطاه.", "This isn't a report: a small file Excel makes while someone has the workbook open. The tool must skip it."))}</div></div>`;
      else {
        const sh = f.sheets[Math.min(sheet, f.sheets.length - 1)], rows = sh.rows, head = rows[0], nr = rows.length - 1;
        const at = nr <= 8 ? rows.slice(1).map((_, i) => i + 1) : [1, 2, 3, 4, 5, nr - 1, nr];
        let last = 0;
        const tr = (r, ri) => `<tr><th class="num">${ri + 1}</th>${head.map((_, ci) => `<td>${esc(cell(r[ci]))}</td>`).join("")}</tr>`;
        const body = at.map((ri) => { const gap = ri > last + 1 ? `<tr><td colspan="${head.length + 1}" class="muted small">…</td></tr>` : ""; last = ri; return gap + tr(rows[ri], ri); }).join("");
        peek = (f.sheets.length > 1 ? `<div class="row" style="gap:6px">${f.sheets.map((s, i) => `<button type="button" class="chip${s === sh ? " on" : ""}" data-s="${i}" aria-pressed="${s === sh}">${esc(s.name)}</button>`).join("")}</div>` : "") +
          `<p class="small muted">${esc(tx(`شيت ${sh.name}: ${fmt(nr)} صف تحت العناوين.`, `Sheet ${sh.name}: ${fmt(nr)} rows under the headers.`))}</p>` +
          `<div class="table-wrap ltr" dir="ltr"><table class="minitable"><thead><tr><th>#</th>${head.map((x) => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>`;
      }
      box.innerHTML = ladder + `<div class="xp-card">
        <div class="xp-top"><b>${esc(tx(`المشروع ${p.n} من ${X.list.length}`, `Project ${p.n} of ${X.list.length}`))} · ${esc(L(p.title))}</b>${lv ? dots : `<span class="chip">${esc(tx("تمهيد", "Warm-up"))}</span>`}</div>
        <p>${esc(g.about)}</p>
        <div class="xp-dl"><button type="button" class="btn pri" data-dl>${ico("download")}<span class="ltr">${esc(p.zip)}</span></button>
        <span class="small muted">${esc(tx("كل ملفات إكسل بالإنجليزي، ومعاها README وPrompt ومفتاح إجابة. فكّه في فولدر لوحده.", "Every Excel file is in English, with a README, a Prompt and an answer key. Unzip it into a folder of its own."))}</span></div>
        <div class="lab-step">${ico("db")}${esc(tx("بص جوّه الملفات", "Look inside the files"))}</div>
        <div class="row" style="flex-wrap:wrap;gap:6px">${files.map((x, i) => `<button type="button" class="chip${i === cur ? " on" : ""}" data-f="${i}" aria-pressed="${i === cur}"><span class="ltr">${esc(short(x.path))}</span></button>`).join("")}</div>
        <div class="xp-peek">${peek}</div>
        <details><summary>${esc(tx("README.txt — المهمة ودليل البيانات", "README.txt — the task and the data dictionary"))}</summary><pre class="ptext small" style="white-space:pre-wrap" dir="auto">${esc(X.readme(p, lang))}</pre></details>
        <details><summary>${esc(tx("Prompt.txt — جاهز تنسخه", "Prompt.txt — ready to copy"))}</summary><pre class="ptext small" style="white-space:pre-wrap" dir="auto">${esc(A.xlKit.promptText(p, lang))}</pre></details>
        <details><summary>${esc(tx("Answer_Key.txt — افتحه بعد التشغيل بس", "Answer_Key.txt — open it only after the run"))}</summary><pre class="ptext small" style="white-space:pre-wrap" dir="auto">${esc(X.answerKey(p, lang))}</pre></details>
      </div>`;
      box.querySelectorAll("[data-p]").forEach((b) => (b.onclick = () => { p = X.list[Number(b.dataset.p) - 1]; cur = 0; sheet = 0; draw(); }));
      box.querySelectorAll("[data-f]").forEach((b) => (b.onclick = () => { cur = Number(b.dataset.f); sheet = 0; draw(); }));
      box.querySelectorAll("[data-s]").forEach((b) => (b.onclick = () => { sheet = Number(b.dataset.s); draw(); }));
      box.querySelector("[data-dl]").onclick = () => {
        const url = URL.createObjectURL(new Blob([A.xlKit.project(p, lang)], { type: "application/zip" }));
        const a = h("a", { href: url, download: p.zip }); document.body.append(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      };
    }
    draw();
  }
  A.mountXlProject = mountXlProject;
  LABS.xlkit = (host, lab) => {
    const f = frame(host, lab);   // one wide column: the panel is both the input (the ladder) and the output
    f.out.remove(); f.box.querySelector(".lab-body").classList.add("one"); f.inp.classList.add("lab-xp");
    mountXlProject(f.inp, "x1", true);
  };

  A.mountLab = function (host, id) {
    const lab = A.labsById[id];
    if (!lab || !LABS[id]) return;
    try { LABS[id](host, lab); }
    catch (e) { console.error(e); host.append(h("div", { class: "note bad", html: ico("info") + "<div>" + esc(t("labError")) + "</div>" })); }
  };
  A._labImpl = LABS;
})(window.ACADEMY);
