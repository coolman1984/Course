/* Unit 5 (part A) — Guide 5, pages 32–36: GitHub, models, the market, running models locally. */
(function () {
  const L = (ar, en) => ({ ar, en });

  ACAD.L({
    id: "u5-git", unit: "u5", pages: [32], icon: "🌿", diff: 1, mins: 10, tags: ["git", "productivity"],
    title: L("GitHub: ذاكرة مشروعك وسجل تاريخه", "GitHub: your project’s memory and history"),
    hook: L("وداعًا لـ«التقرير_نهائي_٢_المعتمد_آخر_تعديل»: نسخة واحدة على جهازك، وتاريخ كامل محفوظ خلفها.", "Goodbye “report_final_2_approved_last_edit”: one copy on your machine, with full history saved behind it."),
    book: L(`**أولًا — GitHub: ذاكرة مشروعك وسجل تاريخه** {p32}. ليس مجرد مكان لتخزين الأكواد، بل نظام يحفظ **كل تغيير** حدث في مشروعك، ومن أحدثه ومتى ولماذا — ويتيح لك العودة إلى أي لحظة سابقة في ثوانٍ.

**المشكلة التي يعرفها الجميع:** ملف «التقرير_نهائي»، وبجانبه «التقرير_نهائي_٢»، ثم «التقرير_نهائي_المعتمد_آخر_تعديل». لا أحد يعرف أيها الأحدث، ولا الفرق بينها، ولا كيف يعود لنسخة الأسبوع الماضي بعد اكتشاف خطأ. **Git يحل هذا جذريًا.**

**Git — الأداة:** برنامج يعمل على جهازك، يسجّل كل تغيير كنقطة محفوظة يمكن العودة إليها، ويعمل بلا إنترنت تمامًا. **GitHub — الخدمة:** موقع يستضيف مشاريع Git على الإنترنت، فتصبح نسختك محفوظة خارج جهازك ويعمل فريقك معك.

**لماذا يهمك ولو لم تكن مبرمجًا؟** نسخة احتياطية ذكية لتاريخ الملفات كله · مرجع للمساعد البرمجي (يرى تاريخ المشروع فيفهم لماذا كُتب الكود هكذا) · تجربة بلا خوف في مسار منفصل · توثيق تلقائي للقرارات · عمل جماعي منظم · نشر تلقائي واختبار عند كل تعديل.

**المفاهيم السبعة:** Repository (ملف القضية بكل أوراقه) · Commit (محضر اجتماع موقّع ومؤرخ) · Branch (مسودة جانبية) · Merge (اعتماد المسودة ودمجها) · Remote/Origin (الأرشيف المركزي مقابل نسختك المكتبية) · Clone (استلام نسخة كاملة من الأرشيف) · Pull Request (رفع مذكرة للاعتماد قبل التنفيذ).

**ثلاثة استخدامات خارج البرمجة:** أدلة وإجراءات العمل · مكتبة البرومبتات · ملفات الإعداد والقوالب (ومنها CLAUDE.md).`,
      `**First — GitHub: your project’s memory and history** {p32}. Not just a place to store code, but a system that keeps **every change** made to your project — who made it, when and why — and lets you return to any earlier moment in seconds.

**The problem everyone knows:** a file “Report_final”, next to “Report_final_2”, then “Report_final_approved_last_edit”. Nobody knows which is newest, what differs, or how to go back to last week’s version after finding an error. **Git solves this at the root.**

**Git — the tool:** a program on your machine that records every change as a saved point you can return to; it works fully offline. **GitHub — the service:** a website hosting Git projects online, so your copy is kept off your machine and your team can work with you.

**Why it matters even if you don’t code:** a smart backup of the files’ whole history · a reference for the coding assistant (it sees the history and understands why code was written that way) · fearless experiments on a separate track · automatic documentation of decisions · organised teamwork · automatic deployment and tests on every change.

**The seven concepts:** Repository (a case file with all its papers) · Commit (signed, dated meeting minutes) · Branch (a side draft) · Merge (approving the draft and merging it) · Remote/Origin (the central archive vs your desk copy) · Clone (receiving a full copy of the archive) · Pull Request (submitting a memo for approval before execution).

**Three uses beyond coding:** work guides and procedures · a prompt library · configuration files and templates (including CLAUDE.md).`),
    levels: {
      simple: L(`تخيّل **ملف قضية** في أرشيف محكمة. كل ورقة تُضاف عليها **ختم وتاريخ واسم من أضافها وسبب إضافتها**. لا أحد يمزق ورقة قديمة؛ كل شيء محفوظ بالترتيب.

هذا هو Git: بدل عشر نسخ من «التقرير_نهائي»، عندك **نسخة واحدة** وخلفها **سجل** بكل التعديلات. أخطأت الأسبوع الماضي؟ ترجع لنقطة الأسبوع الماضي في ثوانٍ.

وGitHub هو **الأرشيف المركزي**: نسخة محفوظة خارج جهازك، يدخل عليها زملاؤك ويعملون معك دون أن يمسح أحد عمل الآخر.`,
        `Imagine a **case file** in a court archive. Every page added gets **a stamp, a date, the name of who added it and why**. Nobody tears out an old page; everything is kept in order.

That’s Git: instead of ten copies of “Report_final”, you have **one copy** with a **record** of every change behind it. Made a mistake last week? Go back to last week’s point in seconds.

And GitHub is **the central archive**: a copy kept off your machine that colleagues can reach and work on with you without anyone erasing anyone else’s work.`),
      mech: L(`## كيف يحفظ Git التاريخ؟
كل **Commit** صورة كاملة لحالة الملفات في لحظة، ومعها رسالة تشرح السبب، واسم صاحبها وتوقيتها. النقاط مرتبطة ببعضها في سلسلة، فتعرف ماذا تغيّر بين أي نقطتين.

## الفرع: مسودة بجوار الأصل
**Branch** مسار جانبي يبدأ من نقطة معينة. تعدّل فيه كما تشاء والمسار الرئيسي لا يتأثر. نجحت التجربة؟ **Merge**. فشلت؟ احذف الفرع «ولا أثر لها على الأصل» {p32}.

## المحلي والبعيد
نسختك على جهازك (local) والنسخة على GitHub (remote/origin). تعمل محليًا حتى بلا إنترنت، ثم ترفع (push) وتنزّل (pull). و**Pull Request** طلب مراجعة قبل الدمج — كمذكرة تُرفع للاعتماد.

جرّب كل هذا بأمان في [[lab:git|مختبر Git]].`,
        `## How does Git keep history?
Each **commit** is a full snapshot of the files at a moment, with a message explaining why, its author and time. The points are chained, so you know what changed between any two.

## A branch: a draft next to the original
A **branch** is a side track starting from a given point. Edit freely; the main track is unaffected. Experiment worked? **Merge**. Failed? Delete the branch “with no trace on the original” {p32}.

## Local and remote
Your copy is on your machine (local) and the copy on GitHub is remote/origin. You work locally even offline, then push and pull. A **pull request** asks for review before merging — like a memo submitted for approval.

Try it all safely in [[lab:git|the Git lab]].`),
      practice: L(`## ثلاثة استخدامات تبدأ بها غدًا — بلا برمجة
| الاستخدام | ماذا تحفظ | ماذا تكسب |
|---|---|---|
| أدلة العمل | إجراءات التشغيل ونماذج التقارير | تعرف من غيّر أي بند ومتى ولماذا {p32} |
| مكتبة البرومبتات | برومبتات الفريق في مستودع واحد | تتطور بالمراجعة بدل أن تضيع في المحادثات |
| الإعدادات والقوالب | قوالب التقارير وملفات CLAUDE.md | نسخة واحدة محدّثة للجميع |

**مثال رسالة Commit جيدة لدليل إجراءات:** «إضافة خطوة التحقق من توقيع المدير في إجراء الصرف — بعد ملاحظة المراجعة الداخلية».

**مثال سيئ:** «تحديث».`,
        `## Three uses you can start tomorrow — no coding
| Use | What you keep | What you gain |
|---|---|---|
| Work guides | operating procedures and report templates | you know who changed which item, when and why {p32} |
| Prompt library | the team’s prompts in one repository | they improve through review instead of getting lost in chats |
| Settings & templates | report templates and CLAUDE.md files | one up-to-date copy for everyone |

**A good commit message for a procedures guide:** “Add the manager-signature check to the payment procedure — after the internal audit note.”

**A bad one:** “update”.`),
      adv: L(`## لماذا يهم التاريخ للمساعد البرمجي؟
Claude Code «يرى تاريخ مشروعك، فيفهم لماذا كُتب الكود هكذا ويقترح تعديلات متسقة معه» {p32}. رسائل الـCommit الواضحة إذن ليست رفاهية: هي **سياق** للنموذج (راجع [[l:u1-equation|المعادلة]]: السياق يرفع جودة النتيجة).

## التاريخ كوثيقة قرارات
كل رسالة تشرح سببها، «فيصبح السجل وثيقة حية لقرارات المشروع» {p32}. بعد سنة، حين يسأل أحد «لماذا نحسب الهامش هكذا؟» الإجابة في السجل لا في ذاكرة شخص غادر.

## النشر التلقائي
يمكن ربط المستودع بحيث يُنشر التطبيق أو يُشغَّل الاختبار تلقائيًا عند كل تعديل {p32} — امتداد طبيعي لمبدأ «الاختبارات قبل الاعتماد» من [[l:u2-principles|الدليل الثاني]].`,
        `## Why does history matter to the coding assistant?
Claude Code “sees your project’s history, so it understands why the code was written that way and suggests consistent changes” {p32}. Clear commit messages aren’t a luxury: they’re **context** for the model (see [[l:u1-equation|the equation]]: context raises output quality).

## History as a decision record
Each message explains its reason, “so the log becomes a living record of the project’s decisions” {p32}. A year later, when someone asks “why do we compute margin this way?”, the answer is in the log, not in the memory of someone who left.

## Automatic deployment
The repository can be wired so the app deploys or tests run automatically on every change {p32} — a natural extension of “tests before approval” from [[l:u2-principles|Guide 2]].`),
    },
    card: {
      what: L("Git أداة تحفظ كل تغيير كنقطة يمكن العودة إليها؛ GitHub خدمة تستضيف المشروع وتاريخه أونلاين {p32}.", "Git records every change as a point you can return to; GitHub hosts the project and its history online {p32}."),
      why: L("لتنتهي فوضى النسخ المتعددة، وتجرّب بلا خوف، وتوثّق قراراتك تلقائيًا.", "To end the multiple-copies mess, experiment fearlessly and document decisions automatically."),
      how: L("مستودع، ونقاط حفظ برسائل واضحة، وفروع للتجارب، ودمج بعد النجاح.", "A repository, commits with clear messages, branches for experiments, merge after success."),
      inside: L("سلسلة لقطات مرتبطة، كل لقطة بصاحبها وتوقيتها وسببها.", "A chain of linked snapshots, each with author, time and reason."),
      relation: L("يحفظ ما تبنيه في الدليل الرابع، ويعطي المساعد البرمجي سياقًا.", "Keeps what you build in Guide 4 and gives the coding assistant context."),
      example: L("مكتبة برومبتات الفريق في مستودع واحد تتطور بالمراجعة.", "The team’s prompt library in one repository, improving through review."),
      apply: L("ابدأ بمستودع لأدلة عملك أو برومبتاتك قبل أي كود.", "Start a repository for your work guides or prompts before any code."),
      mistakes: L("نسخ يدوية متعددة، ورسائل بلا معنى، والعمل على المسار الرئيسي مباشرة.", "Multiple manual copies, meaningless messages, working directly on main."),
      check: L("هل تشرح الفرق بين Git وGitHub في جملتين؟", "Can you explain Git vs GitHub in two sentences?"),
      next: L("الأوامر الاثنا عشر ودورة العمل اليومية.", "The twelve commands and the daily cycle."),
    },
    keys: L(["Git يحفظ كل تغيير: من، ومتى، ولماذا — ويعيدك لأي لحظة {p32}.", "Git أداة على جهازك تعمل بلا إنترنت؛ GitHub خدمة استضافة وتعاون.", "سبعة مفاهيم: Repo وCommit وBranch وMerge وRemote وClone وPull Request.", "الفرع يتيح تجربة بلا خوف: نجحت؟ ادمج. فشلت؟ احذف.", "مفيد خارج البرمجة: الأدلة، والبرومبتات، والقوالب."],
      ["Git keeps every change: who, when, why — and returns you to any moment {p32}.", "Git is a tool on your machine that works offline; GitHub is hosting and collaboration.", "Seven concepts: repo, commit, branch, merge, remote, clone, pull request.", "A branch allows fearless experiments: worked? merge. failed? delete.", "Useful beyond code: guides, prompts, templates."]),
    scene: "git-flow", lab: "git", prompts: ["u5-p-git"],
    quick: [
      { q: L("ما الفرق الصحيح بين Git وGitHub؟", "What’s the correct difference between Git and GitHub?"), opts: L(["هما الشيء نفسه", "Git أداة على جهازك تحفظ التاريخ وتعمل بلا إنترنت، وGitHub موقع يستضيف المشروع ويتيح التعاون", "GitHub أداة وGit موقع", "Git للمبرمجين فقط"], ["They’re the same", "Git is a tool on your machine that keeps history offline; GitHub is a website hosting the project for collaboration", "GitHub is the tool and Git the website", "Git is only for programmers"]), a: 1, why: L("التمييز في الكتاب {p32}: الأداة مقابل الخدمة.", "The distinction in the book {p32}: tool vs service.") },
      { q: L("أي تشبيه يناسب الـ Pull Request؟", "Which analogy fits a pull request?"), opts: L(["ملف القضية", "محضر اجتماع", "رفع مذكرة للاعتماد قبل التنفيذ", "الأرشيف المركزي"], ["The case file", "Meeting minutes", "Submitting a memo for approval before execution", "The central archive"]), a: 2, why: L("Pull Request طلب مراجعة تعديلاتك قبل دمجها في المسار الرئيسي {p32}.", "A pull request asks for review of your changes before merging into main {p32}.") },
      { q: L("صح أم خطأ: Git يحتاج اتصالًا دائمًا بالإنترنت.", "True or false: Git needs a constant internet connection."), opts: L(["صح", "خطأ"], ["True", "False"]), a: 1, why: L("Git يعمل بلا إنترنت تمامًا؛ الإنترنت يلزم فقط للرفع والتنزيل مع GitHub {p32}.", "Git works fully offline; the internet is only needed to push/pull with GitHub {p32}.") },
    ],
    related: ["u5-git-cmds", "u4-claudecode", "u2-principles"], req: [], terms: ["git", "github", "repo", "commit", "branch", "merge", "remote", "clone", "pull-request"],
  });

  ACAD.L({
    id: "u5-git-cmds", unit: "u5", pages: [33], icon: "⌨️", diff: 2, mins: 12, tags: ["git"],
    title: L("Git عمليًا: الأوامر ودورة العمل", "Git in practice: commands and the work cycle"),
    hook: L("اثنا عشر أمرًا تغطي ٩٩٪ من الاستخدام اليومي — ويمكن أن ينفذها المساعد البرمجي نيابة عنك.", "Twelve commands cover 99% of daily use — and the coding assistant can run them for you."),
    book: L(`**GitHub عمليًا — الأوامر ودورة العمل** {p33}. اثنا عشر أمرًا تغطي تسعة وتسعين بالمئة من الاستخدام اليومي، تُكتب في الطرفية داخل مجلد المشروع، ويمكنك أن تطلب من المساعد البرمجي تنفيذها نيابة عنك.

**الإعداد لمرة واحدة:** \`git config --global user.name\` و\`git config --global user.email\` لتسجيل اسمك وبريدك، ثم \`git init\` لتحويل مجلد عادي إلى مستودع، أو \`git clone <url>\` لتنزيل مشروع قائم بتاريخه.

**دورة العمل اليومية — خمسة أوامر:** \`git status\` (ما تغيّر — نفّذه قبل وبعد كل خطوة) · \`git add .\` (اختيار كل التعديلات) · \`git commit -m "..."\` (نقطة حفظ مسماة برسالة «ماذا فعلت ولماذا») · \`git push\` (الرفع إلى GitHub) · \`git pull\` (تنزيل تعديلات الزملاء — في بداية كل يوم).

**الفروع والتراجع:** \`git branch <name>\` (مسار جانبي قبل أي تعديل كبير) · \`git checkout <name>\` (التنقل بين المسارات) · \`git merge <name>\` (الدمج بعد النجاح) · \`git log --oneline\` (التاريخ سطرًا لكل نقطة) · \`git restore <file>\` (إلغاء تعديلات غير محفوظة).

**الدورة الكاملة:** pull ← branch ← اعمل وعدّل ← status ← add ← commit ← push ← Pull Request.

**أخطاء شائعة:** رفع أسرار أو ملفات ضخمة (الحل: ملف \`.gitignore\` للإعدادات والمفاتيح وكلمات المرور والبيانات الكبيرة) · رسائل بلا معنى والعمل على الرئيسي (اكتب «إصلاح حساب الهامش عند الكمية صفر» وأنشئ فرعًا لكل مهمة مهما صغرت).

**وبرومبت واحد يغنيك عن حفظ الأوامر** بالأسفل.`,
      `**GitHub in practice — commands and the work cycle** {p33}. Twelve commands cover ninety-nine percent of daily use; they’re typed in the terminal inside the project folder, and you can ask the coding assistant to run them for you.

**One-time setup:** \`git config --global user.name\` and \`git config --global user.email\` to register your name and email, then \`git init\` to turn an ordinary folder into a repository, or \`git clone <url>\` to download an existing project with its history.

**The daily cycle — five commands:** \`git status\` (what changed — run it before and after every step) · \`git add .\` (select all changes) · \`git commit -m "..."\` (a named save point with a “what I did and why” message) · \`git push\` (upload to GitHub) · \`git pull\` (download colleagues’ changes — at the start of each day).

**Branches and undo:** \`git branch <name>\` (a side track before any big change) · \`git checkout <name>\` (move between tracks) · \`git merge <name>\` (merge after success) · \`git log --oneline\` (history, one line per point) · \`git restore <file>\` (discard unsaved changes).

**The full cycle:** pull → branch → work and edit → status → add → commit → push → pull request.

**Common mistakes:** uploading secrets or huge files (fix: a \`.gitignore\` for settings, keys, passwords and big data) · meaningless messages and working on main (write “Fix margin calculation when quantity is zero” and create a branch for every task however small).

**And one prompt that saves you memorising commands** is below.`),
    levels: {
      simple: L(`فكّر في الأوامر كخطوات **أرشفة مستند في مكتب**:

١ **pull**: تأخذ آخر نسخة من الأرشيف قبل أن تبدأ.
٢ **branch**: تعمل على **مسودة** لا على الأصل.
٣ تكتب وتعدّل.
٤ **status**: تنظر «ماذا غيّرت؟».
٥ **add**: تختار الأوراق التي ستُختم.
٦ **commit**: تختمها بتاريخ وسبب.
٧ **push**: ترسلها للأرشيف المركزي.
٨ **Pull Request**: تطلب اعتماد المسودة لتُدمج في الأصل.

ولا تحتاج حفظ أي شيء: اطلب من المساعد البرمجي أن ينفذها ويشرح لك كل خطوة.`,
        `Think of the commands as the steps for **filing a document in an office**:

1. **pull**: get the latest copy from the archive before starting.
2. **branch**: work on a **draft**, not the original.
3. Write and edit.
4. **status**: look at “what did I change?”.
5. **add**: pick the pages to be stamped.
6. **commit**: stamp them with a date and reason.
7. **push**: send them to the central archive.
8. **Pull request**: ask for the draft to be approved and merged into the original.

And you needn’t memorise anything: ask the coding assistant to run them and explain each step.`),
      mech: L(`## ثلاث مناطق يتحرك بينها الملف
**مجلد العمل** (ما تعدّله الآن) ← \`add\` ← **منطقة التجهيز** (ما اخترته للحفظ) ← \`commit\` ← **التاريخ** (نقاط محفوظة). ثم \`push\` ينقل التاريخ إلى GitHub.

لذلك \`commit\` بدون \`add\` لا يحفظ شيئًا — جرّب ذلك بنفسك في [[lab:git|المختبر]] وسترى الرسالة.

## لماذا \`git status\` أكثر أمر ستستخدمه؟
لأنه يجيب في كل لحظة: ماذا تغيّر؟ ماذا جاهز للحفظ؟ ما الملفات غير المتتبعة؟ ونقّذه «قبل وبعد كل خطوة» {p33}.

## \`restore\` مقابل الفرع
\`git restore\` يلغي تعديلات **لم تُحفظ بعد** في ملف. أما التجربة الكبيرة فمكانها **فرع**: إن فشلت تحذفه كله.`,
        `## Three areas a file moves through
**Working folder** (what you’re editing) → \`add\` → **staging area** (what you chose to save) → \`commit\` → **history** (saved points). Then \`push\` moves history to GitHub.

So \`commit\` without \`add\` saves nothing — try it in [[lab:git|the lab]] and you’ll see the message.

## Why is \`git status\` your most-used command?
Because at any moment it answers: what changed? what’s ready to save? which files are untracked? Run it “before and after every step” {p33}.

## \`restore\` vs a branch
\`git restore\` discards **not-yet-saved** changes in a file. A big experiment belongs on a **branch**: if it fails, you delete it whole.`),
      practice: L(`## يوم عمل كامل في سبعة أسطر
\`\`\`
git pull
git branch fix-margin
git checkout fix-margin
(تعدّل الملفات)
git status
git add .
git commit -m "إصلاح حساب الهامش عند الكمية صفر"
git push
\`\`\`
ثم تفتح **Pull Request** على GitHub ليراجعه زميل قبل الدمج.

## ملف ‎.gitignore‎ نموذجي لمشروع تحليل
\`\`\`
.env
config/secrets.*
data/raw/
*.xlsx
output/
\`\`\`
كلمات المرور والمفاتيح والبيانات الخام الضخمة **لا تُرفع أبدًا** {p33}.`,
        `## A whole work day in seven lines
\`\`\`
git pull
git branch fix-margin
git checkout fix-margin
(edit the files)
git status
git add .
git commit -m "Fix margin calculation when quantity is zero"
git push
\`\`\`
Then open a **pull request** on GitHub so a colleague reviews before merging.

## A typical .gitignore for an analysis project
\`\`\`
.env
config/secrets.*
data/raw/
*.xlsx
output/
\`\`\`
Passwords, keys and huge raw data are **never uploaded** {p33}.`),
      adv: L(`## اترك الأوامر للمساعد، واحتفظ بالقرار
البرومبت في الكتاب يطلب من المساعد أن «يتعامل مع Git نيابة عني ويشرح بالعربية ما يفعله في كل خطوة» {p33}، مع نقطتين ذكيتين:
- **بعد كل جلسة:** يلخّص ما تغيّر ويقترح **تقسيمه إلى نقاط حفظ منطقية** — لأن نقطة واحدة ضخمة لكل يوم تجعل التراجع الجزئي مستحيلًا.
- **عند الخطأ:** يشرح الحالة الراهنة أولًا، ثم يعرض خيارات التراجع **من الأقل خطورة إلى الأكثر**، ولا ينفذ قبل أن تختار.

هذا تطبيق مباشر لـ«المراجعة البشرية» و«قابلية التراجع» من [[l:u1-think|التفكير الاستراتيجي]]: القرارات التي يصعب التراجع عنها تحتاج تأنيًا أكثر.

## رسالة الحفظ كوثيقة
قارن «تعديل» بـ«إصلاح حساب الهامش عند الكمية صفر» {p33}: الأولى لا تفيد بعد شهر، والثانية تجيب «ماذا ولماذا» دون فتح الكود.`,
        `## Leave the commands to the assistant; keep the decision
The book’s prompt asks the assistant to “handle Git for me and explain what it does at each step” {p33}, with two smart points:
- **After each session:** it summarises what changed and suggests **splitting it into logical commits** — one huge daily commit makes partial undo impossible.
- **On a mistake:** it explains the current state first, then offers undo options **from least to most risky**, and does nothing until you choose.

This applies “human review” and “reversibility” from [[l:u1-think|strategic thinking]] directly: hard-to-reverse decisions deserve more care.

## The commit message as a document
Compare “update” with “Fix margin calculation when quantity is zero” {p33}: the first is useless a month later; the second answers “what and why” without opening the code.`),
    },
    card: {
      what: L("اثنا عشر أمرًا: إعداد، ودورة يومية من خمسة، وفروع وتراجع {p33}.", "Twelve commands: setup, a five-step daily cycle, branches and undo {p33}."),
      why: L("لتحفظ عملك بأمان وتتعاون دون أن يمسح أحد عمل الآخر.", "To save work safely and collaborate without overwriting each other."),
      how: L("pull ← branch ← عدّل ← status ← add ← commit ← push ← PR.", "pull → branch → edit → status → add → commit → push → PR."),
      inside: L("مجلد العمل ← منطقة التجهيز ← التاريخ ← البعيد.", "Working folder → staging → history → remote."),
      relation: L("التطبيق العملي لمفاهيم الصفحة السابقة.", "The hands-on side of the previous page’s concepts."),
      example: L("فرع fix-margin برسالة «إصلاح حساب الهامش عند الكمية صفر».", "A fix-margin branch with “Fix margin when quantity is zero”."),
      apply: L("استخدم برومبت Git الواحد مع المساعد البرمجي في كل جلسة.", "Use the single Git prompt with the coding assistant every session."),
      mistakes: L("رفع الأسرار والملفات الضخمة، ورسائل «تحديث»، والعمل على الرئيسي.", "Uploading secrets and huge files, “update” messages, working on main."),
      check: L("لماذا لا يحفظ commit شيئًا إن لم تسبقه add؟", "Why does commit save nothing without a prior add?"),
      next: L("النماذج: ما الذي يجعل نموذجًا أقوى من آخر؟", "Models: what makes one stronger than another?"),
    },
    keys: L(["الإعداد مرة واحدة: config ثم init أو clone {p33}.", "الدورة اليومية: status وadd وcommit وpush وpull.", "الفروع: branch وcheckout وmerge؛ والتاريخ: log؛ والتراجع: restore.", ".gitignore يمنع رفع الأسرار والبيانات الكبيرة.", "رسالة الحفظ: «ماذا فعلت ولماذا»، وفرع لكل مهمة."],
      ["One-time setup: config, then init or clone {p33}.", "Daily cycle: status, add, commit, push, pull.", "Branches: branch, checkout, merge; history: log; undo: restore.", ".gitignore stops secrets and big data from being uploaded.", "Commit message: “what I did and why”; a branch per task."]),
    scene: "git-flow", lab: "git", prompts: ["u5-p-git"],
    quick: [
      { type: "order", q: L("رتّب دورة العمل الكاملة:", "Order the full work cycle:"), items: L(["git pull", "git branch", "اعمل وعدّل", "git add", "git commit", "git push", "Pull Request"], ["git pull", "git branch", "Work and edit", "git add", "git commit", "git push", "Pull request"]), why: L("الدورة كما في الكتاب {p33} (مع status قبل add).", "The cycle as in the book {p33} (with status before add).") },
      { q: L("أي رسالة حفظ أفضل؟", "Which commit message is better?"), opts: L(["تحديث", "تعديل نهائي", "إصلاح حساب الهامش عند الكمية صفر", "v2"], ["update", "final edit", "Fix margin calculation when quantity is zero", "v2"]), a: 2, why: L("تصف ماذا ولماذا، فتفيد بعد شهر {p33}.", "It says what and why, so it helps a month later {p33}.") },
      { q: L("ماذا تضع في ‎.gitignore‎؟", "What goes in .gitignore?"), opts: L(["كود التطبيق", "ملف README", "الإعدادات والمفاتيح وكلمات المرور وملفات البيانات الكبيرة", "رسائل الحفظ"], ["The app code", "The README", "Settings, keys, passwords and big data files", "Commit messages"]), a: 2, why: L("ما يجب ألّا يُرفع {p33}.", "What must never be uploaded {p33}.") },
    ],
    related: ["u5-git", "u4-claudecode"], req: ["u5-git"], terms: ["git", "commit", "branch", "merge", "gitignore", "terminal"],
  });

  ACAD.L({
    id: "u5-models", unit: "u5", pages: [34], icon: "🧠", diff: 2, mins: 12, tags: ["models", "strategy"],
    title: L("النماذج: الأوزان والأحجام ومعنى «الذكاء»", "Models: weights, sizes and what “intelligence” means"),
    hook: L("الأكبر ليس دائمًا الأفضل لحالتك. أربعة مفاهيم تفك كل الفروق، وقاعدة واحدة توفّر أضعاف التكلفة.", "Bigger isn’t always best for you. Four concepts explain every difference, and one rule saves multiples of the cost."),
    book: L(`**ثانيًا — النماذج: الأوزان والأحجام ومعنى «الذكاء»** {p34}. قبل مقارنة الأسماء والأسعار، لا بد من فهم ما الذي يجعل نموذجًا أقوى من آخر، ولماذا لا يعني «الأكبر» دائمًا «الأفضل لحالتك».

**أربعة مفاهيم:**
- **Parameters — المعاملات (الأوزان):** أرقام داخلية يتعلمها النموذج أثناء التدريب، وهي مخزن معرفته. تُقاس بالمليار (B) أو التريليون (T)؛ زيادتها ترفع القدرة وترفع معها تكلفة التشغيل.
- **Context Window — نافذة السياق:** كم نصًا يستطيع النموذج قراءته وتذكره في الطلب الواحد، بالتوكنات. مليون توكن ≈ كتاب ضخم.
- **MoE — الخبراء المتفرقون:** نموذج ضخم إجمالًا لكنه يفعّل جزءًا صغيرًا منه لكل سؤال («٧٧٠ مليارًا إجمالي، ٤٠ مليارًا نشط»): ذكاء الكبير بتكلفة أقرب للصغير.
- **Tokens — الوحدة المحاسبية:** قطعة نص صغيرة. التسعير بالمليون توكن ودائمًا برقمين: الإدخال أرخص، والإخراج أغلى ٣–٦ مرات.

**ملاحظة للعربية:** النص العربي يستهلك توكنات أكثر من الإنجليزي لنفس المعنى — أحيانًا الضعف.

**لماذا لا يعني الأكبر الأفضل؟** التكلفة (الفارق يتجاوز مئة ضعف) · السرعة (الكبيرة أبطأ) · تخصص المهمة (متوسط مضبوط قد يتفوق على عملاق عام).

**طبقات النماذج:** الحدود القصوى (تحليل معقد) · الوسط العملي (الاستخدام اليومي) · السريع الرخيص (تصنيف وتلخيص بحجم كبير) · المفتوح الأوزان (بيانات حساسة داخل المؤسسة) · المحلي الصغير (خصوصية كاملة وعمل بلا اتصال).

**قاعدة الاختيار: ابدأ من الأسفل لا من الأعلى.** جرّب على نموذج متوسط أو رخيص أولًا، ولا تصعد إلا حين يفشل الأدنى في **مهمتك أنت** — لا لأن لوحة التصنيف تقول إنه الأفضل.`,
      `**Second — models: weights, sizes and what “intelligence” means** {p34}. Before comparing names and prices, understand what makes one model stronger than another, and why “bigger” doesn’t always mean “best for your case”.

**Four concepts:**
- **Parameters (weights):** internal numbers the model learns in training — its store of knowledge. Measured in billions (B) or trillions (T); more raises capability and running cost.
- **Context window:** how much text the model can read and keep in one request, in tokens. One million tokens ≈ a huge book.
- **MoE — mixture of experts:** a huge model overall that activates a small part per question (“770B total, 40B active”): big-model intelligence at near-small cost.
- **Tokens — the billing unit:** a small piece of text. Priced per million tokens, always as two numbers: input is cheaper; output costs 3–6× more.

**A note for Arabic:** Arabic text uses more tokens than English for the same meaning — sometimes double.

**Why bigger isn’t best:** cost (the gap exceeds 100×) · speed (big ones are slower) · task fit (a tuned mid model can beat a general giant).

**Model tiers:** frontier (complex analysis) · practical mid (daily use) · fast & cheap (classification, summarising at volume) · open weights (sensitive data inside the organisation) · small local (full privacy, offline work).

**The selection rule: start at the bottom, not the top.** Try a mid or cheap model first; only climb when the lower one actually fails at **your** task — not because a leaderboard says so.`),
    levels: {
      simple: L(`اختيار النموذج يشبه اختيار **وسيلة توصيل**:
- **شاحنة ضخمة** (نموذج القمة): تحمل أي شيء، لكنها غالية وبطيئة في الزحام.
- **سيارة عائلية** (الوسط العملي): تكفي لمعظم المشاوير.
- **دراجة نارية** (السريع الرخيص): ممتازة لمئات الطلبات الصغيرة.
- **سيارتك الخاصة في الجراج** (المحلي): لا أحد يرى ما تنقله.

لن تستأجر شاحنة لتوصيل ظرف! **ابدأ بالأصغر الذي ينجز مهمتك**، واصعد فقط إن فشل.

و«التوكن» هو **عدّاد الكيلومترات**: تدفع على ما تُدخله وأكثر على ما يُخرجه، والعربي يقطع «مسافة» أطول لنفس المعنى.`,
        `Picking a model is like picking **a delivery vehicle**:
- **A huge truck** (frontier): carries anything, but costly and slow in traffic.
- **A family car** (practical mid): enough for most trips.
- **A motorbike** (fast & cheap): great for hundreds of small orders.
- **Your own car in the garage** (local): nobody sees what you carry.

You wouldn’t rent a truck to deliver an envelope! **Start with the smallest that gets your job done**, and climb only if it fails.

And the “token” is the **odometer**: you pay for what goes in and more for what comes out — and Arabic covers a longer “distance” for the same meaning.`),
      mech: L(`## المعاملات: مخزن المعرفة
نموذج 7B فيه ٧ مليارات رقم تعلّمها من التدريب (راجع [[l:u0-model|ما هو النموذج]]). كل رقم يُخزَّن ويُحسب عند كل كلمة يولّدها — لذلك الحجم يرفع القدرة **والتكلفة والبطء معًا**.

## MoE: لماذا «إجمالي» و«نشط»؟
النموذج مقسم إلى «خبراء»، وموجّه داخلي يختار القليل منهم لكل توكن. فتحصل على معرفة ٧٧٠ مليارًا مخزنة، لكن تدفع حسابيًا ثمن ٤٠ مليارًا فقط لكل خطوة {p34}.

## التوكنات: لماذا رقمان؟
الإدخال يُقرأ دفعة واحدة؛ أما الإخراج فيُولَّد **توكنًا بعد توكن**، وكل توكن يمر بالنموذج كله. لهذا الإخراج أغلى ٣–٦ مرات {p34}. جرّبه في [[lab:tokens|مختبر التوكنات]] و[[lab:cost|مختبر التكلفة]].`,
        `## Parameters: the knowledge store
A 7B model holds 7 billion numbers learned in training (see [[l:u0-model|what a model is]]). Each number is stored and computed for every word generated — so size raises capability **and cost and slowness together**.

## MoE: why “total” and “active”?
The model is split into “experts”, and an internal router picks a few per token. You get the knowledge stored in 770B, but pay compute for only 40B per step {p34}.

## Tokens: why two numbers?
Input is read in one pass; output is generated **token by token**, each passing through the whole model. That’s why output costs 3–6× more {p34}. Try it in [[lab:tokens|the token lab]] and [[lab:cost|the cost lab]].`),
      practice: L(`## اختر الطبقة لمهامك الحقيقية
| المهمة | الطبقة المقترحة | لماذا |
|---|---|---|
| تصنيف ٥٠٠٠ شكوى يوميًا | السريع الرخيص | حجم كبير ومهمة بسيطة {p34} |
| تلخيص تقرير أسبوعي | الوسط العملي | جودة قريبة من القمة بجزء من السعر |
| تحليل عقد معقد متعدد الأطراف | الحدود القصوى | تحليل معقد وبحث عميق |
| ملفات رواتب لا يجوز رفعها | المفتوح الأوزان أو المحلي | البيانات لا تغادر المؤسسة |

## اختبار «ابدأ من الأسفل» في ثلاث خطوات
١ خذ ٢٠ حالة حقيقية من عملك. ٢ شغّلها على نموذج رخيص ونموذج متوسط. ٣ احكم بمعيار محدد مسبقًا (مثلًا: دقة التصنيف ≥ ٩٥٪). إن نجح الرخيص، فقد وفّرت أضعافًا.`,
        `## Pick the tier for your real tasks
| Task | Suggested tier | Why |
|---|---|---|
| Classify 5,000 complaints daily | fast & cheap | high volume, simple task {p34} |
| Summarise a weekly report | practical mid | near-top quality at a fraction of the price |
| Analyse a complex multi-party contract | frontier | complex analysis, deep research |
| Payroll files that can’t be uploaded | open weights or local | data never leaves the organisation |

## The “start at the bottom” test in three steps
1 Take 20 real cases from your work. 2 Run them on a cheap and a mid model. 3 Judge by a criterion set in advance (e.g. classification accuracy ≥ 95%). If the cheap one passes, you’ve saved multiples.`),
      adv: L(`## لماذا لا تثق بلوحات التصنيف وحدها؟
«اللوحات تقيس متوسط مهام عامة، وأنت تهمك مهمة واحدة بعينها» {p34}. نموذج يتصدر متوسط مئة اختبار قد يكون الثالث في مهمتك تحديدًا. لذلك برومبت اختيار النموذج يطلب **طريقة اختبار على عينة من عملك الحقيقي** و**معيارًا للحكم**.

## نافذة السياق ليست ذاكرة مجانية
سياق مليون توكن يسمح بقراءة مشروع كامل — لكن كل توكن في السياق **يُدفع ثمنه** في كل طلب. ضع ما يلزم فقط (فكرة [[l:u1-brain|الدماغ الثاني]]: المصادر المختارة أفضل من «كل شيء»).

## العربية والتكلفة
إن كان النص العربي يستهلك قرابة ضعف التوكنات، فتقدير تكلفة معالجة مستندات عربية طويلة بأرقام الإنجليزية يخطئ بالنصف. احسب ذلك في [[lab:cost|مختبر التكلفة]] قبل أي ميزانية.`,
        `## Why not trust leaderboards alone?
“Leaderboards measure the average of general tasks, and you care about one specific task” {p34}. A model topping the average of a hundred tests may be third at your task. So the model-selection prompt asks for **a test on a sample of your real work** and **a criterion to judge by**.

## The context window isn’t free memory
A million-token context can read a whole project — but every token in context **is paid for** on every request. Include only what’s needed (the [[l:u1-brain|second brain]] idea: chosen sources beat “everything”).

## Arabic and cost
If Arabic text uses roughly twice the tokens, estimating cost for long Arabic documents with English figures is off by half. Compute it in [[lab:cost|the cost lab]] before any budget.`),
    },
    card: {
      what: L("أربعة مفاهيم: المعاملات، ونافذة السياق، وMoE، والتوكنات {p34}.", "Four concepts: parameters, context window, MoE and tokens {p34}."),
      why: L("لتفهم ما تشتريه، ولا تدفع أضعافًا بلا داعٍ.", "To understand what you buy and not pay multiples for nothing."),
      how: L("حدد الطبقة المناسبة، وابدأ من الأسفل، واختبر على عملك.", "Pick the right tier, start at the bottom, test on your work."),
      inside: L("حجم أكبر = قدرة أعلى + تكلفة أعلى + بطء؛ وMoE يكسر هذه المعادلة جزئيًا.", "Bigger = more capability + more cost + slower; MoE partly breaks that equation."),
      relation: L("أساس قراءة خريطة السوق والتشغيل المحلي.", "The basis for reading the market map and running locally."),
      example: L("تصنيف آلاف الشكاوى بنموذج رخيص بجودة كافية.", "Classifying thousands of complaints with a cheap model at enough quality."),
      apply: L("اختبر مهمتك على نموذجين بعينة من ٢٠ حالة ومعيار محدد.", "Test your task on two models with 20 cases and a set criterion."),
      mistakes: L("اختيار الأكبر تلقائيًا، والثقة بلوحة التصنيف، ونسيان تكلفة الإخراج والعربية.", "Picking the biggest by default, trusting leaderboards, forgetting output and Arabic cost."),
      check: L("لماذا الإخراج أغلى من الإدخال؟", "Why is output pricier than input?"),
      next: L("خريطة الشركات والنماذج وفخاخ التسعير.", "The map of companies, models and pricing traps."),
    },
    keys: L(["المعاملات مخزن المعرفة؛ زيادتها ترفع القدرة والتكلفة {p34}.", "نافذة السياق: كم يقرأ النموذج في الطلب الواحد.", "MoE: ضخم إجمالًا، صغير نشطًا — ذكاء الكبير بتكلفة أقرب للصغير.", "التسعير برقمين؛ الإخراج أغلى ٣–٦ مرات، والعربية قد تستهلك الضعف.", "ابدأ من الأسفل، واصعد فقط حين يفشل الأدنى في مهمتك أنت."],
      ["Parameters store knowledge; more raises capability and cost {p34}.", "Context window: how much the model reads per request.", "MoE: huge in total, small when active — big-model smarts at near-small cost.", "Two prices; output costs 3–6× more, and Arabic may use double.", "Start at the bottom; climb only when the lower tier fails at your task."]),
    scene: "model-tiers", lab: "tokens", prompts: ["u5-p-model"],
    quick: [
      { q: L("نموذج «٧٧٠ مليارًا إجمالي، ٤٠ مليارًا نشط» يعني:", "A “770B total, 40B active” model means:"), opts: L(["يعمل بنصف قوته", "بنية MoE: يفعّل جزءًا صغيرًا لكل سؤال، فتحصل على ذكاء الكبير بتكلفة أقرب للصغير", "به خطأ في المواصفات", "يحتاج ٧٧٠ جهازًا"], ["It runs at half power", "MoE: it activates a small part per question — big-model smarts at near-small cost", "A spec error", "It needs 770 machines"]), a: 1, why: L("تعريف MoE في الكتاب {p34}.", "The book’s MoE definition {p34}.") },
      { q: L("ما قاعدة الاختيار العملية في الكتاب؟", "What’s the book’s practical selection rule?"), opts: L(["ابدأ بأقوى نموذج", "اختر متصدر لوحة التصنيف", "ابدأ من الأسفل واصعد فقط حين يفشل الأدنى في مهمتك", "اختر الأرخص دائمًا"], ["Start with the strongest", "Pick the leaderboard leader", "Start at the bottom; climb only when the lower one fails at your task", "Always pick the cheapest"]), a: 2, why: L("«ابدأ من الأسفل لا من الأعلى» {p34}.", "“Start at the bottom, not the top” {p34}.") },
      { q: L("لماذا قد تتضاعف تكلفة مستند عربي طويل؟", "Why might a long Arabic document cost double?"), opts: L(["لأن العربية ممنوعة", "لأن النص العربي يستهلك توكنات أكثر لنفس المعنى", "لأن الخوادم في الخارج", "لا تتضاعف أبدًا"], ["Arabic is banned", "Arabic text uses more tokens for the same meaning", "Servers are abroad", "It never doubles"]), a: 1, why: L("ملاحظة الكتاب المهمة للعربية {p34}.", "The book’s important note on Arabic {p34}.") },
    ],
    related: ["u0-model", "u5-market", "u5-local"], req: ["u0-model"], terms: ["parameters", "context-window", "moe", "token", "open-weights"],
  });

  ACAD.L({
    id: "u5-market", unit: "u5", pages: [35], icon: "🗺️", diff: 2, mins: 11, tags: ["models", "strategy"],
    title: L("خريطة الشركات والنماذج وفخاخ التسعير", "The map of companies, models and pricing traps"),
    hook: L("المشهد يتغير كل أسابيع؛ الأهم أن تفهم البنية والطبقات لا أن تحفظ الأسماء.", "The landscape changes every few weeks; understand the structure and tiers, don’t memorise names."),
    book: L(`**خريطة الشركات والنماذج — سبتمبر ٢٠٢٦** {p35}. صورة السوق في لحظتها الراهنة. المشهد يتغير كل أسابيع، فالأهم أن تفهم البنية والطبقات لا أن تحفظ الأسماء.

**الشركات الكبرى وعائلاتها (كما في الكتاب):**
| الشركة | العائلة والنماذج البارزة | ما تشتهر به |
|---|---|---|
| Anthropic | Claude — Fable 5.1 وMythos 5.1 (سبتمبر ٢٠٢٦)، وOpus 5، وSonnet 5، وHaiku 4.5 | البرمجة والوكلاء والمهام الطويلة |
| OpenAI | GPT — Astra (سبتمبر ٢٠٢٦)، وSol، وTerra، وLuna | الاستخدام العام والوسائط المتعددة |
| Google | Gemini — 3.1 Pro، وFlash 3.8 (سبتمبر ٢٠٢٦) | التكامل مع منظومة جوجل والسياق الطويل |
| xAI | Grok — 4.6 | السرعة والتكامل مع منصة X |
| Meta | تحولت عن Llama المفتوح إلى خط Muse المغلق | تحول لافت بعد سنوات من قيادة المفتوح |
| Mistral | Large وMedium وSmall | أوزان مفتوحة وسيادة بيانات أوروبية |

**ترتيب الأسعار لكل مليون توكن (إدخال/إخراج):** القمة ٥–١٠ / ٢٥–٥٠ دولار (Fable 5.1 وGPT-6 Astra عند ١٠/٥٠) · الوسط القوي ٢–٥ / ١٢–٢٥ (Opus 5 عند ٥/٢٥، Gemini 3.1 Pro عند ٢/١٢) · العملي اليومي ١–٣ / ٤–١٢ (Sonnet 5، وGLM-5.3 عند ١٫٤٠/٤٫٤٠) · الاقتصادي أقل من دولار / ١–٢ (MiniMax M3 وDeepSeek V4 Flash).

**ثلاثة فخاخ تسعيرية:** الإخراج أغلى ٣–٦ أضعاف · بعض النماذج تضاعف السعر بعد حد معين من السياق الطويل · أسعار تمهيدية لها تاريخ انتهاء. اقرأ الحواشي قبل بناء ميزانية سنوية.

**النماذج الصينية:** استراتيجية «المفتوح سلاحًا» — نشر الأوزان للتنزيل المجاني، فضاقت الفجوة مع أفضل المغلق إلى نحو ست نقاط على أحد المؤشرات المرجعية بعد أن كانت أكثر من ضعف ذلك قبل عام. البارزة: DeepSeek V4 (رخصة MIT)، وQwen 3.8 (Alibaba)، وKimi K3 (Moonshot، نحو ٢٫٨ تريليون معامل، سياق مليون توكن)، وGLM-5.3 (Z.ai)، وMiniMax M3، وHunyuan (Tencent).

**ماذا يعني «مفتوح الأوزان» عمليًا؟** تستطيع تنزيله وتشغيله داخل شبكة مؤسستك فلا تغادر بياناتك أبدًا — لكنه لا يعني بالضرورة رخصة حرة بالكامل، ولا أن جهازك يكفي: نموذج بتريليونات المعاملات يحتاج بنية تحتية بحجم رف خوادم. اقرأ الرخصة وتحقق من العتاد.`,
      `**The map of companies and models — September 2026** {p35}. A snapshot of the market. The landscape changes every few weeks, so understanding the structure and tiers matters more than memorising names.

**Major companies and families (as in the book):**
| Company | Family & notable models | Known for |
|---|---|---|
| Anthropic | Claude — Fable 5.1 and Mythos 5.1 (Sept 2026), Opus 5, Sonnet 5, Haiku 4.5 | coding, agents, long tasks |
| OpenAI | GPT — Astra (Sept 2026), Sol, Terra, Luna | general use and multimodal |
| Google | Gemini — 3.1 Pro, Flash 3.8 (Sept 2026) | Google-ecosystem integration and long context |
| xAI | Grok — 4.6 | speed and X-platform integration |
| Meta | moved from open Llama to the closed Muse line | a notable shift after years leading open models |
| Mistral | Large, Medium, Small | open weights and European data sovereignty |

**Price ranks per million tokens (input/output):** frontier $5–10 / $25–50 (Fable 5.1 and GPT-6 Astra at 10/50) · strong mid 2–5 / 12–25 (Opus 5 at 5/25, Gemini 3.1 Pro at 2/12) · everyday 1–3 / 4–12 (Sonnet 5; GLM-5.3 at 1.40/4.40) · economy under $1 / 1–2 (MiniMax M3, DeepSeek V4 Flash).

**Three pricing traps:** output costs 3–6× more · some models double the price beyond a certain long-context threshold · introductory prices with an announced end date. Read the footnotes before an annual budget.

**Chinese models:** an “open as a weapon” strategy — releasing weights for free download; the gap with the best closed models narrowed to about six points on one benchmark, from more than double that a year earlier. Notable: DeepSeek V4 (MIT licence), Qwen 3.8 (Alibaba), Kimi K3 (Moonshot, ~2.8T parameters, 1M-token context), GLM-5.3 (Z.ai), MiniMax M3, Hunyuan (Tencent).

**What “open weights” means in practice:** you can download and run it inside your organisation’s network so data never leaves — but it doesn’t necessarily mean a fully free licence, nor that your machine is enough: a trillion-parameter model needs a server-rack-sized infrastructure. Read the licence and check the hardware.`),
    levels: {
      simple: L(`هذه الصفحة مثل **قائمة أسعار في سوق خضار**: تتغير كل أسبوع. لا تحفظ الأسعار؛ **افهم الأقسام**:
- قسم **الفاخر** (القمة): الأغلى بكثير.
- قسم **الجيد اليومي** (الوسط والعملي): يكفي البيت.
- قسم **الاقتصادي**: للكميات الكبيرة.

وانتبه لثلاث «حيل» لا تظهر في السعر المكتوب: **ما تأخذه أغلى مما تعطيه** (الإخراج)، و**السعر يتضاعف إن اشتريت كمية كبيرة جدًا دفعة واحدة** (السياق الطويل)، و**العرض الترويجي ينتهي** (السعر التمهيدي).

و«مفتوح الأوزان» يعني أنك تستطيع أخذ «البذور» وزراعتها في أرضك — لكن تأكد أن أرضك تتسع لها!`,
        `This page is like **a price list at a vegetable market**: it changes weekly. Don’t memorise prices; **understand the sections**:
- The **premium** section (frontier): far pricier.
- The **good everyday** section (mid and practical): enough for home.
- The **economy** section: for big quantities.

And watch three “tricks” not shown on the price tag: **what you take costs more than what you give** (output), **the price doubles if you buy a huge amount at once** (long context), and **the promotion ends** (introductory price).

“Open weights” means you can take the “seeds” and plant them in your own land — but make sure your land is big enough!`),
      mech: L(`## لماذا الفجوة بين الأرخص والأغلى تتجاوز مئة ضعف؟
قارن إخراج القمة (حتى ٥٠ دولارًا لكل مليون) بإخراج الاقتصادي (١–٢ دولار): الفرق ٢٥–٥٠ ضعفًا في الإخراج وحده، وأكبر في الإدخال (حتى ١٠ مقابل أقل من دولار). لهذا اختيار الطبقة **قرار مالي** لا تقني فقط.

## حساب تكلفة مهمة
التكلفة الشهرية = عدد الطلبات × (توكنات الإدخال × سعر الإدخال + توكنات الإخراج × سعر الإخراج) ÷ مليون. جرّبها بأرقامك في [[lab:cost|مختبر التكلفة]] — المختبر يستخدم نطاقات الكتاب نفسها.

## الاستراتيجيتان
الشركات الأمريكية **أغلقت** أوزان نماذجها، والمختبرات الصينية **نشرتها** مجانًا؛ فانتشرت بسرعة وبُنيت حولها منظومة أدوات، وضاقت الفجوة إلى نحو ست نقاط على أحد المؤشرات {p35}.`,
        `## Why does the cheapest–priciest gap exceed 100×?
Compare frontier output (up to $50 per million) with economy output ($1–2): 25–50× on output alone, and more on input (up to 10 vs under $1). That’s why choosing a tier is **a financial decision**, not just a technical one.

## Costing a task
Monthly cost = requests × (input tokens × input price + output tokens × output price) ÷ one million. Try your numbers in [[lab:cost|the cost lab]] — it uses the book’s own price bands.

## The two strategies
US companies **closed** their model weights; Chinese labs **released** theirs for free; they spread fast, tooling grew around them, and the gap narrowed to about six points on one benchmark {p35}.`),
      practice: L(`## مثال محسوب (أرقام افتراضية للتوضيح)
مهمة: تلخيص ٢٠٠ مستند يوميًا × ٢٢ يوم عمل؛ كل مستند ٣٠٠٠ توكن إدخال و٥٠٠ توكن إخراج.
- عدد الطلبات = ٤٤٠٠ شهريًا.
- **القمة (١٠/٥٠):** ٤٤٠٠ × (٣٠٠٠×١٠ + ٥٠٠×٥٠) ÷ مليون = **٢٤٢ دولارًا**.
- **العملي اليومي (١٫٤٠/٤٫٤٠):** ٤٤٠٠ × (٣٠٠٠×١٫٤ + ٥٠٠×٤٫٤) ÷ مليون ≈ **٢٨ دولارًا**.

الفرق قرابة **٩ أضعاف** لنفس المهمة. إن كانت جودة الطبقة الأرخص كافية بمعيارك، فهذا توفير مباشر.

## قبل أي ميزانية سنوية — اسأل ثلاثة أسئلة
١ ما نسبة الإخراج في مهمتي؟ ٢ هل يتجاوز سياقي حدّ مضاعفة السعر؟ ٣ هل السعر تمهيدي وله تاريخ انتهاء؟ {p35}`,
        `## A worked example (hypothetical numbers for illustration)
Task: summarise 200 documents daily × 22 working days; each 3,000 input tokens and 500 output tokens.
- Requests = 4,400 per month.
- **Frontier (10/50):** 4,400 × (3,000×10 + 500×50) ÷ 1M = **$242**.
- **Everyday (1.40/4.40):** 4,400 × (3,000×1.4 + 500×4.4) ÷ 1M ≈ **$28**.

About **9×** difference for the same task. If the cheaper tier meets your criterion, that’s a direct saving.

## Before any annual budget — ask three questions
1 What share of my task is output? 2 Does my context exceed a price-doubling threshold? 3 Is the price introductory with an end date? {p35}`),
      adv: L(`## «مفتوح» لا يعني «حر» ولا «خفيف»
ثلاث طبقات منفصلة يجب فحصها {p35}:
- **الأوزان:** هل يمكن تنزيلها؟ (مفتوح الأوزان)
- **الرخصة:** هل تسمح بالاستخدام التجاري؟ (MIT متساهلة جدًا؛ غيرها قد يقيّد)
- **العتاد:** نموذج بـ٢٫٨ تريليون معامل يحتاج «رف خوادم»، لا حاسوبًا مكتبيًا.

## لماذا تتغير الخريطة بسرعة؟
لأن الإصدارات تتوالى كل أسابيع. هذه الصفحة **صورة لحظية بتاريخ سبتمبر ٢٠٢٦** كما في الكتاب. المهارة الدائمة هي: افهم الطبقات، واحسب التكلفة، واختبر على مهمتك — وهذا لا يتقادم.

## تحرك Meta
انتقال من قاد المفتوح لسنوات (Llama) إلى خط مغلق (Muse) يذكّرك أن الاعتماد على مزود واحد مخاطرة؛ صمّم تطبيقك ليكون مصدر النموذج **قابلًا للتبديل** من ملف إعدادات (فكرة [[l:u5-local|التشغيل المحلي]]).`,
        `## “Open” doesn’t mean “free” or “light”
Three separate layers to check {p35}:
- **Weights:** can they be downloaded? (open weights)
- **Licence:** does it allow commercial use? (MIT is very permissive; others may restrict)
- **Hardware:** a 2.8-trillion-parameter model needs “a server rack”, not a desktop.

## Why does the map change so fast?
Releases come every few weeks. This page is **a snapshot dated September 2026**, as in the book. The lasting skill: understand tiers, compute cost, test on your task — that never goes stale.

## Meta’s move
The open-model leader for years (Llama) moving to a closed line (Muse) reminds you that depending on one provider is a risk; design your app so the model source is **swappable** from a config file (the [[l:u5-local|local running]] idea).`),
    },
    card: {
      what: L("صورة السوق في سبتمبر ٢٠٢٦: الشركات، والعائلات، ونطاقات الأسعار، والنماذج الصينية {p35}.", "The market in Sept 2026: companies, families, price bands and Chinese models {p35}."),
      why: L("لتقرأ أي عرض سعر بوعي وتتجنب الفخاخ الخفية.", "To read any price offer wisely and avoid hidden traps."),
      how: L("صنّف النموذج في طبقته، واحسب التكلفة بأرقامك، واقرأ الحواشي.", "Place the model in its tier, cost it with your numbers, read the footnotes."),
      inside: L("أربع فئات أسعار، وثلاثة فخاخ، واستراتيجيتان (مغلق/مفتوح).", "Four price bands, three traps, two strategies (closed/open)."),
      relation: L("تطبيق مفاهيم النماذج على السوق الفعلي.", "Applying the model concepts to the real market."),
      example: L("نفس التلخيص: ٢٤٢ دولارًا بالقمة مقابل ٢٨ باليومي (أرقام افتراضية).", "Same summarising: $242 at frontier vs $28 everyday (hypothetical)."),
      apply: L("احسب مهمتك في مختبر التكلفة قبل أي التزام.", "Cost your task in the cost lab before committing."),
      mistakes: L("حفظ الأسماء بدل الطبقات، ونسيان الإخراج والسياق الطويل والسعر التمهيدي.", "Memorising names not tiers; forgetting output, long context and intro prices."),
      check: L("ما الفخاخ التسعيرية الثلاثة؟", "What are the three pricing traps?"),
      next: L("تشغيل النماذج على جهازك.", "Running models on your machine."),
    },
    keys: L(["الخريطة تتغير كل أسابيع؛ افهم الطبقات لا الأسماء {p35}.", "القمة حتى ١٠/٥٠ دولارًا، والاقتصادي أقل من دولار للإدخال.", "ثلاثة فخاخ: الإخراج، ومضاعفة السياق الطويل، والسعر التمهيدي.", "المختبرات الصينية نشرت الأوزان فضاقت الفجوة إلى نحو ست نقاط.", "مفتوح الأوزان ≠ رخصة حرة ≠ يعمل على جهازك."],
      ["The map changes every few weeks; learn tiers, not names {p35}.", "Frontier up to $10/$50; economy under $1 input.", "Three traps: output, long-context doubling, introductory prices.", "Chinese labs released weights; the gap narrowed to about six points.", "Open weights ≠ free licence ≠ runs on your machine."]),
    scene: "model-tiers", lab: "cost", prompts: ["u5-p-model"],
    quick: [
      { q: L("أي مما يلي **ليس** من فخاخ التسعير الثلاثة في الكتاب؟", "Which is **not** one of the book’s three pricing traps?"), opts: L(["الإخراج أغلى ٣–٦ أضعاف", "مضاعفة السعر بعد حد من السياق الطويل", "الأسعار التمهيدية لها تاريخ انتهاء", "النماذج الصينية تتطلب اشتراكًا سنويًا"], ["Output costs 3–6× more", "Price doubling beyond a long-context threshold", "Introductory prices expire", "Chinese models need an annual subscription"]), a: 3, why: L("الفخاخ الثلاثة هي الأولى {p35}.", "The three traps are the first three {p35}.") },
      { q: L("«مفتوح الأوزان» يعني بالضرورة:", "“Open weights” necessarily means:"), opts: L(["رخصة حرة بالكامل", "يعمل على أي حاسوب", "يمكنك تنزيله وتشغيله داخل مؤسستك — مع فحص الرخصة والعتاد", "مجاني الاستخدام سحابيًا"], ["A fully free licence", "It runs on any computer", "You can download and run it in-house — after checking licence and hardware", "Free cloud use"]), a: 2, why: L("لا يعني رخصة حرة ولا أن جهازك يكفي {p35}.", "It means neither a free licence nor that your machine suffices {p35}.") },
    ],
    related: ["u5-models", "u5-local"], req: ["u5-models"], terms: ["token", "open-weights", "context-window"],
  });

  ACAD.L({
    id: "u5-local", unit: "u5", pages: [36], icon: "💻", diff: 2, mins: 11, tags: ["models", "safety"],
    title: L("تشغيل النماذج على جهازك الشخصي", "Running models on your own computer"),
    hook: L("نموذج داخل حاسوبك: بلا إنترنت، وبلا اشتراك، وبلا أن تغادر بياناتك الجهاز إطلاقًا.", "A model inside your computer: no internet, no subscription, and your data never leaves the machine."),
    book: L(`**ثالثًا — تشغيل النماذج على جهازك الشخصي: Ollama · LM Studio** {p36}. نموذج يعمل داخل حاسوبك، بلا إنترنت وبلا اشتراك وبلا أن تغادر بياناتك الجهاز إطلاقًا. صار هذا عمليًا فعلًا في ٢٠٢٦، لا مجرد تجربة هواة.

**لماذا صار ممكنًا الآن؟** لأمرين معًا: نشر المختبرات لأوزان نماذج قادرة مجانًا، وتقنية **Quantization** — ضغط أرقام النموذج من دقة عالية إلى أقل، فينكمش حجمه إلى الربع تقريبًا مع فقد بسيط جدًا في الجودة. نموذج كان يحتاج ١٦ جيجابايت من ذاكرة كرت الشاشة صار يعمل في ٤–٥.

**الأداتان:** **LM Studio** (واجهة رسومية: تبحث عن النموذج وتنزّله بضغطة ويخبرك هل يناسب ذاكرتك — الأنسب لمن يبدأ) · **Ollama** (سطر أوامر خفيف يُدمج في المشاريع: \`ollama pull\` للتنزيل، \`ollama run\` للمحادثة، \`ollama list\` لعرض المنزّل، \`ollama rm\` للحذف).

**النقطة المفيدة فعلًا:** كلتاهما توفران **خادمًا محليًا متوافقًا مع واجهة OpenAI** — أي تطبيق مكتوب لخدمة سحابية يعمل مع نموذجك المحلي **بتغيير العنوان فقط**.

**ما الذي يناسب جهازك؟** ٨ جيجا ← ٣–٤ مليارات معامل (تلخيص وتصنيف وأسئلة بسيطة) · ١٦ ← ٧–٩ مليارات (استخدام يومي وأكواد قصيرة) · ٢٤–٣٢ ← ١٤–٣٢ مليارًا (تحليل أعمق ومهام متعددة الخطوات) · ٦٤ فأكثر ← ٧٠ مليارًا فأعلى (أقرب لجودة السحابة).

**ثلاث ملاحظات تحسم الأداء:** الذاكرة قبل المعالج (السرعة تحكمها سعة الذاكرة وعرض نطاقها) · Q4_K_M مستوى الضغط المبدئي وأفضل توازن · أجهزة آبل الحديثة بذاكرتها الموحدة قوية جدًا مقارنة بسعرها.

**متى تستخدمه؟** بيانات حساسة لا يجوز رفعها، أو عمل بلا إنترنت، أو حجم هائل يجعل السحابة مكلفة، أو تعلّم بلا فاتورة. **ومتى لا؟** حين تحتاج أعلى جودة في تحليل معقد، أو مهمة نادرة لا تبرر إعداد بيئة — فالمحلي يبقى طبقة أو طبقتين خلف القمة.`,
      `**Third — running models on your own computer: Ollama · LM Studio** {p36}. A model inside your computer, with no internet, no subscription, and data that never leaves the machine. In 2026 this became genuinely practical, not a hobbyist experiment.

**Why is it possible now?** Two things together: labs releasing capable model weights for free, and **quantization** — compressing the model’s numbers from high to lower precision, shrinking it to about a quarter with very little quality loss. A model that needed 16 GB of GPU memory now runs in 4–5.

**The two tools:** **LM Studio** (graphical: search a model, download it in a click, it tells you whether it fits your memory — best for beginners) · **Ollama** (a light command-line tool easy to embed in projects: \`ollama pull\` to download, \`ollama run\` to chat, \`ollama list\` to see what’s installed, \`ollama rm\` to delete).

**The really useful point:** both provide **a local server compatible with the OpenAI interface** — any app written for a cloud service works with your local model **by changing only the address**.

**What suits your machine?** 8 GB → 3–4B parameters (summaries, classification, simple Q&A) · 16 → 7–9B (daily use, short code) · 24–32 → 14–32B (deeper analysis, multi-step tasks) · 64+ → 70B+ (closest to cloud quality).

**Three notes that decide performance:** memory before processor (speed is governed by memory capacity and bandwidth) · Q4_K_M is the default compression and best balance · recent Apple machines with unified memory are very strong for their price.

**When to use it?** Sensitive data that can’t be uploaded, offline work, huge volume that makes the cloud expensive, or learning without a bill. **When not?** When you need top quality for complex analysis, or a rare task that doesn’t justify setting up an environment — local models stay a tier or two behind the cloud frontier.`),
    levels: {
      simple: L(`استخدام نموذج سحابي يشبه **إرسال أوراقك لمكتب ترجمة خارجي**: سريع وممتاز، لكن أوراقك تخرج من مبناك.

النموذج المحلي هو **مترجم تعيّنه داخل مكتبك**: أوراقك لا تخرج أبدًا، ولا فاتورة شهرية. لكنه قد لا يكون بمستوى أفضل مكتب في المدينة، ويحتاج **مكتبًا يتسع له** (ذاكرة جهازك).

و«الضغط» (Quantization) مثل **تصغير قاموس ضخم إلى نسخة جيب**: يفقد قليلًا جدًا، لكنه يدخل حقيبتك.`,
        `Using a cloud model is like **sending your papers to an outside translation office**: fast and excellent, but your papers leave your building.

A local model is **a translator you hire inside your office**: papers never leave, no monthly bill. But they may not match the city’s best office, and they need **a desk big enough** (your machine’s memory).

And “compression” (quantization) is like **shrinking a giant dictionary into a pocket edition**: it loses very little, but fits in your bag.`),
      mech: L(`## كيف يصغّر الضغط النموذج؟
كل معامل يُخزّن رقمًا. بلا ضغط يأخذ ١٦ بت (٢ بايت)؛ نموذج 8B ≈ ١٦ جيجا تقريبًا (مع زيادة للتشغيل). ضغطه إلى نحو ٤٫٥ بت (Q4_K_M) يقسم الحجم على قرابة ٣٫٥ — فيصبح ~٥ جيجا. احسب جهازك في [[lab:local|مختبر التشغيل المحلي]].

## لماذا الذاكرة قبل المعالج؟
لتوليد **كل توكن** يجب قراءة الأوزان كلها من الذاكرة. فالسرعة تحكمها **سعة الذاكرة وعرض نطاقها** أكثر من قوة المعالج {p36}. لهذا أجهزة الذاكرة الموحدة قوية في هذا المجال.

## الخادم المتوافق
Ollama وLM Studio يفتحان عنوانًا محليًا يتكلم «لغة» واجهة OpenAI. التطبيق الذي بنيته في [[l:u4-build|الدليل الرابع]] يتحول من السحابة للمحلي بتغيير سطر العنوان.`,
        `## How does compression shrink a model?
Each parameter stores a number. Uncompressed it takes 16 bits (2 bytes); an 8B model ≈ 16 GB (plus running overhead). Compressing to ~4.5 bits (Q4_K_M) divides the size by about 3.5 — around 5 GB. Check your machine in [[lab:local|the local-run lab]].

## Why memory before processor?
To generate **each token**, all weights must be read from memory. So speed is governed by **memory capacity and bandwidth** more than processor power {p36}. That’s why unified-memory machines shine here.

## The compatible server
Ollama and LM Studio open a local address that speaks the OpenAI interface “language”. The app you built in [[l:u4-build|Guide 4]] switches from cloud to local by changing the address line.`),
      practice: L(`## أول نموذج محلي في عشر دقائق (للمبتدئ)
١ ثبّت **LM Studio**. ٢ ابحث عن نموذج 7B–8B بمستوى ضغط Q4_K_M. ٣ لاحظ إشارة «يناسب جهازك». ٤ نزّله وجرّب سؤالًا من عملك. ٥ قِس: كم ثانية حتى تبدأ الإجابة؟ هل السرعة مقبولة؟

## وبسطر الأوامر (Ollama)
\`\`\`
ollama pull <اسم-النموذج>
ollama run <اسم-النموذج>
ollama list
ollama rm <اسم-النموذج>
\`\`\`

## ملف إعدادات يجعل المصدر قابلًا للتبديل
\`\`\`
MODEL_SOURCE=local      # أو cloud
LOCAL_URL=http://localhost:11434/v1
\`\`\`
بهذا تقارن المحلي بالسحابي على نفس المهمة دون تغيير الكود — كما يطلب البرومبت {p36}.`,
        `## Your first local model in ten minutes (beginner)
1 Install **LM Studio**. 2 Search for a 7B–8B model at Q4_K_M. 3 Look for the “fits your machine” sign. 4 Download it and try a question from your work. 5 Measure: how many seconds until the answer starts? Is the speed acceptable?

## And from the command line (Ollama)
\`\`\`
ollama pull <model-name>
ollama run <model-name>
ollama list
ollama rm <model-name>
\`\`\`

## A config file that makes the source swappable
\`\`\`
MODEL_SOURCE=local      # or cloud
LOCAL_URL=http://localhost:11434/v1
\`\`\`
So you compare local vs cloud on the same task without changing code — as the prompt asks {p36}.`),
      adv: L(`## القاعدة الفاصلة: متى المحلي؟
| استخدم المحلي حين… | ولا تستخدمه حين… |
|---|---|
| البيانات حساسة ولا يجوز رفعها | تحتاج أعلى جودة في تحليل معقد |
| تعمل بلا إنترنت | المهمة نادرة لا تبرر إعداد بيئة |
| الحجم هائل والسحابة مكلفة | الوقت أهم من الخصوصية |
| تتعلم وتجرّب بلا فاتورة | |

## لا ترفع مستوى الضغط بلا سبب
Q4_K_M هو التوازن المبدئي؛ «لا ترفعه إلا إن لاحظت ضعفًا في مهمتك» {p36}. رفعه (Q8) يضاعف الذاكرة تقريبًا مقابل تحسن قد لا تلاحظه.

## الخصوصية بالتصميم
المحلي يكمل فكرة [[l:u4-localapp|التطبيق المحلي]]: تطبيق محلي + نموذج محلي = **لا شيء يغادر الجهاز إطلاقًا**. لكن تذكّر: يبقى «طبقة أو طبقتين خلف القمة السحابية» {p36} — فاختر المهمة المناسبة له.`,
        `## The deciding rule: when local?
| Use local when… | Don’t when… |
|---|---|
| data is sensitive and can’t be uploaded | you need top quality for complex analysis |
| you work offline | the task is rare and doesn’t justify setup |
| volume is huge and the cloud costly | time matters more than privacy |
| you learn and experiment without a bill | |

## Don’t raise compression precision without reason
Q4_K_M is the default balance; “don’t raise it unless you notice weakness in your task” {p36}. Raising it (Q8) roughly doubles memory for a gain you may not notice.

## Privacy by design
Local completes the [[l:u4-localapp|local app]] idea: local app + local model = **nothing leaves the machine at all**. But remember: it stays “a tier or two behind the cloud frontier” {p36} — pick tasks that suit it.`),
    },
    card: {
      what: L("تشغيل نموذج داخل حاسوبك بأداتي Ollama أو LM Studio {p36}.", "Running a model on your computer with Ollama or LM Studio {p36}."),
      why: L("خصوصية كاملة، وعمل بلا اتصال، وتكلفة صفرية للحجم الكبير.", "Full privacy, offline work, zero marginal cost at volume."),
      how: L("اختر حجمًا يناسب ذاكرتك، بضغط Q4_K_M، واربطه عبر الخادم المتوافق.", "Pick a size fitting your memory, Q4_K_M, connect via the compatible server."),
      inside: L("الضغط يصغّر الحجم للربع؛ والسرعة تحكمها الذاكرة.", "Compression shrinks size to a quarter; memory governs speed."),
      relation: L("يكمل التطبيق المحلي ويطبّق «المفتوح الأوزان».", "Completes the local app and applies “open weights”."),
      example: L("نموذج 8B مضغوط (~٥ جيجا) على جهاز ١٦ جيجا للتلخيص اليومي.", "A compressed 8B model (~5 GB) on a 16 GB machine for daily summaries."),
      apply: L("جرّب LM Studio بنموذج 7B ومهمة حقيقية، وقِس السرعة.", "Try LM Studio with a 7B model on a real task; measure speed."),
      mistakes: L("نموذج أكبر من الذاكرة، وتوقع جودة القمة، ورفع الضغط بلا سبب.", "A model larger than memory, expecting frontier quality, raising precision needlessly."),
      check: L("لماذا تحكم الذاكرة السرعة أكثر من المعالج؟", "Why does memory govern speed more than the processor?"),
      next: L("من الأدوات المتفرقة إلى النظام المتكامل.", "From scattered tools to an integrated system."),
    },
    keys: L(["الضغط (Quantization) يصغّر النموذج للربع تقريبًا بفقد بسيط {p36}.", "LM Studio للمبتدئ بواجهة رسومية؛ Ollama بأوامر قصيرة للمشاريع.", "خادم محلي متوافق مع OpenAI: غيّر العنوان فقط.", "٨ جيجا ← 3–4B، ١٦ ← 7–9B، ٣٢ ← حتى 32B، ٦٤+ ← 70B+.", "الذاكرة قبل المعالج، وQ4_K_M التوازن المبدئي."],
      ["Quantization shrinks a model to about a quarter with little loss {p36}.", "LM Studio for beginners (GUI); Ollama with short commands for projects.", "A local OpenAI-compatible server: change only the address.", "8 GB → 3–4B, 16 → 7–9B, 32 → up to 32B, 64+ → 70B+.", "Memory before processor; Q4_K_M is the default balance."]),
    scene: "quantize", lab: "local", prompts: ["u5-p-local"],
    quick: [
      { q: L("جهازك فيه ١٦ جيجابايت. أي حجم نموذج يناسبه حسب الكتاب؟", "Your machine has 16 GB. Which model size fits per the book?"), opts: L(["70 مليارًا", "من ٧ إلى ٩ مليارات", "تريليون", "أقل من مليار فقط"], ["70B", "7–9B", "One trillion", "Under 1B only"]), a: 1, why: L("الجدول التقريبي في الكتاب {p36}.", "The book’s rough guide {p36}.") },
      { q: L("ما فائدة «الخادم المحلي المتوافق مع واجهة OpenAI»؟", "What’s the benefit of the “local OpenAI-compatible server”?"), opts: L(["يجعل النموذج أسرع", "التطبيق المكتوب لخدمة سحابية يعمل مع النموذج المحلي بتغيير العنوان فقط", "يرفع بياناتك للسحابة", "يلغي الحاجة للذاكرة"], ["Makes the model faster", "An app written for a cloud service works with the local model by changing just the address", "Uploads your data", "Removes the need for memory"]), a: 1, why: L("«بتغيير العنوان فقط» {p36}.", "“By changing only the address” {p36}.") },
      { q: L("متى **لا** تستخدم النموذج المحلي؟", "When should you **not** use a local model?"), opts: L(["بيانات حساسة", "عمل بلا إنترنت", "تحتاج أعلى جودة ممكنة في تحليل معقد", "تتعلم بلا فاتورة"], ["Sensitive data", "Offline work", "You need top quality for complex analysis", "Learning without a bill"]), a: 2, why: L("المحلي يبقى طبقة أو طبقتين خلف القمة السحابية {p36}.", "Local stays a tier or two behind the cloud frontier {p36}.") },
    ],
    related: ["u5-models", "u4-localapp", "u5-market"], req: ["u5-models"], terms: ["quantization", "ollama", "lm-studio", "open-weights", "parameters", "localhost"],
  });
})();
