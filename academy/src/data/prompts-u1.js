/* Prompt library — Guide 1 (pages 7–16). Book prompts keep the book's wording; academy additions are marked src:"add". */
(function () {
  const L = (ar, en) => ({ ar, en });
  const P = (o) => ACAD.P(Object.assign({ src: "book" }, o));

  /* ----- Section 1: phrasing (p7–8) ----- */
  P({ id: "u1-p-golden-sentence", lesson: "u1-ask", pages: [7], cat: "work", icon: "⭐",
    title: L("الجملة الذهبية: ابدأ بها كل طلب مهم", "The golden sentence: open every important request with it"),
    goal: L("إجبار الأداة على كشف افتراضاتها، وتقديم أبسط حل، واختبار الحالات الاستثنائية.", "Force the tool to reveal assumptions, give the simplest solution, and test edge cases."),
    text: L("قبل أن تعطيني الإجابة، اسألني عن أي معلومة ناقصة تحتاجها. وبعد أن أجيبك، أعطني أبسط حل ممكن، واشرحه لي ببساطة، واختبر الحالات الاستثنائية.\n\n[اكتب طلبك هنا]", "Before you give me the answer, ask me about any missing information you need. After I answer, give me the simplest possible solution, explain it to me simply, and test the edge cases.\n\n[write your request here]"),
    example: L("«قبل أن أبدأ: هل الحافز على المبيعات أم على الربح؟ وكيف تُحسب المرتجعات؟ وهل يختلف الهدف بين الفروع؟»", "“Before I start: is the incentive on sales or profit? How are returns counted? Does the target differ by branch?”"),
    tip: L("أجب عن أسئلته في نفس المحادثة، ولا تطلب الحل معها في نفس الرسالة.", "Answer its questions in the same chat, and don’t ask for the solution in the same message.") });

  P({ id: "u1-p-improve", lesson: "u1-mistakes", pages: [8], cat: "work", icon: "🛠️",
    title: L("لتحسين برومبت ضعيف", "To improve a weak prompt"),
    goal: L("تحويل طلب كتبته بالفعل إلى طلب أوضح وأدق، ومعرفة ما كان ينقصه.", "Turn a request you’ve already written into a clearer, sharper one and learn what it lacked."),
    text: L("هذا هو الطلب الذي كتبته: [الصق طلبك]. أعد صياغته ليصبح أوضح وأدق، وأخبرني ما المعلومات التي كان ينقصها، ولماذا كانت ستؤثر في جودة النتيجة. ثم أعطني النسخة المحسنة جاهزة للاستخدام.", "Here is the request I wrote: [paste your request]. Rephrase it to make it clearer and more precise, tell me what information it was missing and why that would affect the result’s quality. Then give me the improved version ready to use."),
    example: L("«كان ينقصه: الجمهور (لمن التقرير؟) وشكل النتيجة… النسخة المحسنة: …»", "“It lacked: the audience (who is the report for?) and the output format… Improved version: …”"),
    tip: L("احتفظ بالنسخة المحسنة في دفترك كقالب لنفس النوع من المهام.", "Keep the improved version in your notebook as a template for the same kind of task.") });

  P({ id: "u1-p-generic", lesson: "u1-mistakes", pages: [8], cat: "work", icon: "🎯",
    title: L("حين تكون النتيجة عامة ولا تفيد", "When the result is generic and useless"),
    goal: L("تحويل إجابة عامة إلى خطوات محددة تنطبق على موقفك.", "Turn a generic answer into specific steps that fit your situation."),
    text: L("الإجابة التي أعطيتني إياها عامة ولا أستطيع تنفيذها. أعد المحاولة بشرط أن تكون كل نقطة محددة وقابلة للتطبيق في موقفي الفعلي، مع ذكر ما أفعله أنا بالضبط في كل خطوة. إن كنت تحتاج معلومات إضافية عن وضعي لتخصيص الإجابة، فاسألني عنها أولًا.", "The answer you gave me is generic and I can’t act on it. Try again on the condition that every point is specific and applicable to my actual situation, stating exactly what I do in each step. If you need more information about my situation to tailor the answer, ask me first."),
    tip: L("أضف بعدها قيدًا واحدًا واضحًا من واقعك (ميزانية، وقت، عدد أشخاص).", "Then add one clear constraint from your reality (budget, time, headcount).") });

  P({ id: "u1-p-verify", lesson: "u1-mistakes", pages: [8], cat: "analyze", icon: "🔍",
    title: L("للتحقق قبل الاعتماد النهائي", "To verify before final reliance"),
    goal: L("كشف الافتراضات غير المعلنة ونقاط الخطأ المحتملة، وما يجب أن تتحقق منه بنفسك.", "Expose unstated assumptions and possible errors, and what you must check yourself."),
    text: L("راجع إجابتك السابقة بعين ناقدة: ما الافتراضات التي بنيتها ولم أذكرها أنا؟ وما النقاط التي قد تكون خاطئة أو غير دقيقة في سياقي؟ وما الذي يجب أن أتحقق منه بنفسي قبل الاعتماد على هذه النتيجة؟", "Review your previous answer critically: what assumptions did you make that I never stated? Which points might be wrong or inaccurate in my context? And what must I verify myself before relying on this result?"),
    example: L("«افترضت أن الأسعار شاملة الضريبة، وأن كل الفروع تعمل ٦ أيام… تحقق من: رقم المرتجعات في أغسطس.»", "“I assumed prices include VAT and that all branches work 6 days… Verify: the August returns figure.”"),
    tip: L("النقد الذاتي ليس ضمانًا: نفّذ بنفسك ما يقول إنه يجب التحقق منه.", "Self-critique isn’t a guarantee: actually perform the checks it lists.") });

  P({ id: "u1-p-five-template", lesson: "u1-five", pages: [7], src: "add", cat: "work", icon: "🧩",
    title: L("قالب العناصر الخمسة", "The five-element template"),
    goal: L("هيكل جاهز تملؤه لأي طلب مهم.", "A ready skeleton to fill for any important request."),
    text: L("الهدف: [ماذا أريد بالضبط؟]\nالسياق: [الخلفية والوضع الحالي والبيانات المتاحة]\nالجمهور: [لمن هذه النتيجة؟ وما مستواه؟]\nشكل النتيجة: [نقاط / جدول / خطة / رسالة]\nالقيود والأمثلة: [الوقت، الميزانية، الأسلوب، ومثال لما أريد أو لا أريد]\nقبل أن تبدأ، اسألني عن أي معلومة ناقصة.", "Goal: [what exactly do I want?]\nContext: [background, current situation, available data]\nAudience: [who is the result for, and at what level?]\nOutput format: [bullets / table / plan / message]\nConstraints & examples: [time, budget, style, an example of what I want or don’t]\nBefore you start, ask me about any missing information."),
    tip: L("اكتب كل عنصر في سطر واحد قصير؛ الوضوح أهم من الطول.", "Write each element as one short line; clarity beats length.") });

  P({ id: "u1-p-audience", lesson: "u1-five", pages: [7], src: "add", cat: "work", icon: "👥",
    title: L("نسختان لجمهورين", "Two versions for two audiences"),
    goal: L("رؤية كيف يغيّر الجمهور شكل النتيجة نفسها.", "See how the audience changes the very same result."),
    text: L("هذا المحتوى: [الصق النص أو النتيجة]. أعد كتابته مرتين: مرة لمدير تنفيذي مشغول لديه دقيقة واحدة (القرار أولًا، ثلاث نقاط، بلا مصطلحات)، ومرة لموظف جديد في القسم (شرح متدرج مع مثال). ثم اذكر في سطرين ما الذي تغيّر بين النسختين ولماذا.", "This content: [paste the text or result]. Rewrite it twice: once for a busy executive with one minute (decision first, three points, no jargon) and once for a new employee in the department (step-by-step with an example). Then explain in two lines what changed between the versions and why."),
    tip: L("استخدمه مرة لتدريب عينك على أثر عنصر «الجمهور».", "Use it once to train your eye on the effect of the “audience” element.") });

  P({ id: "u1-p-questions-first", lesson: "u1-ask", pages: [7, 24], src: "add", cat: "work", icon: "❓",
    title: L("أهم الأسئلة فقط قبل التنفيذ", "Only the key questions before executing"),
    goal: L("تقييد الأسئلة بعدد صغير مفيد بدل سيل من الأسئلة العامة.", "Limit the questions to a small useful set instead of a flood."),
    text: L("أريد [المهمة]. قبل تنفيذ أي خطوة، اطرح عليّ من ثلاثة إلى خمسة أسئلة جوهرية فقط تمكنك من فهم الاحتياج بدقة، ورتبها من الأكثر تأثيرًا على النتيجة إلى الأقل. لا تبدأ التنفيذ حتى أجيب.", "I want [the task]. Before doing anything, ask me only three to five essential questions that let you understand the need precisely, ordered from most to least impact on the result. Don’t start until I answer."),
    tip: L("نفس صيغة الكتاب في مرحلة «تحديد الغرض» للوحة المعلومات {p24}.", "Same wording the book uses in the dashboard “purpose” stage {p24}.") });

  /* conversation management (p8) */
  P({ id: "u1-p-shorten", lesson: "u1-conversation", pages: [8], cat: "work", icon: "📏",
    title: L("حين تكون النتيجة طويلة ومشتتة", "When the result is long and scattered"),
    goal: L("اختصار بلا فقدان للنقاط القابلة للتنفيذ.", "Shorten without losing actionable points."),
    text: L("اختصرها إلى نصف الطول مع الحفاظ على كل نقطة قابلة للتنفيذ، واحذف كل ما هو تمهيد أو تكرار.", "Cut it to half the length while keeping every actionable point, and delete everything that is preamble or repetition."),
    tip: L("استخدمها في نفس المحادثة مباشرة بعد الرد الطويل.", "Use it in the same chat right after the long reply.") });
  P({ id: "u1-p-fit", lesson: "u1-conversation", pages: [8], cat: "work", icon: "🧩",
    title: L("حين تكون النتيجة صحيحة لكنها لا تناسبك", "When the result is right but doesn’t fit you"),
    goal: L("إعادة الحل على قيد واقعي لم يكن في الطلب الأول.", "Redo the solution on a real constraint missing from the first request."),
    text: L("هذا صحيح عمومًا، لكن وضعي يختلف في [حدّد الفرق]. أعد الحل بناءً على هذا القيد تحديدًا.", "This is generally right, but my situation differs in [state the difference]. Redo the solution based on this constraint specifically."),
    example: L("«…وضعي يختلف في أن الميزانية الشهرية لا تتجاوز ١٠ آلاف جنيه.»", "“…my situation differs in that the monthly budget doesn’t exceed 10,000 EGP.”"),
    tip: L("أضف حقيقة أو قيدًا، لا رأيًا تريد تأكيده.", "Add a fact or a constraint, not an opinion you want confirmed.") });
  P({ id: "u1-p-source", lesson: "u1-conversation", pages: [8], cat: "research", icon: "🧪",
    title: L("حين تبدو النتيجة مخترعة", "When the result seems invented"),
    goal: L("فصل ما هو مؤكد عما هو ترجيح، ومعرفة مصدر كل رقم.", "Separate what’s certain from what’s estimated and learn each number’s source."),
    text: L("اذكر لكل رقم أو ادعاء مصدره، وميّز بوضوح ما أنت واثق منه عما هو ترجيح منك.", "Give the source for every number or claim, and clearly separate what you’re confident about from what is your estimate."),
    tip: L("الرقم الذي «لا مصدر له» لا يدخل تقريرًا رسميًا قبل تحققك.", "A number with “no source” doesn’t enter an official report before you verify it.") });

  /* ----- Section 2: productivity (p8–10) ----- */
  P({ id: "u1-p-order", lesson: "u1-day", pages: [8], cat: "automate", icon: "📋",
    title: L("ترتيب المهام", "Ordering tasks"),
    goal: L("ترتيب مهام اليوم بمعايير واضحة ومعرفة ما يمكن تأجيله بأمان.", "Rank today’s tasks with clear criteria and know what can safely wait."),
    text: L("هذه مهامي اليوم: [اكتب المهام]. ووقتي المتاح هو [عدد الساعات]. رتّبها حسب الأولوية والوقت اللازم والطاقة الذهنية المطلوبة لكل مهمة. ثم اقترح أول ثلاث مهام أبدأ بها الآن مع سبب كل اختيار. وإن كان الوقت ضيقًا، فاذكر ما يمكن تأجيله بأمان دون أثر سلبي.", "These are my tasks today: [list the tasks]. My available time is [number of hours]. Rank them by priority, time needed and the mental energy each requires. Then suggest the first three tasks to start now, with the reason for each choice. If time is tight, state what can be safely postponed without a negative effect."),
    example: L("«ابدأ بتقرير الإنتاج (يحتاج تركيزًا وموعده اليوم)، ثم… يمكن تأجيل ترتيب الأرشيف للخميس دون أثر.»", "“Start with the production report (needs focus, due today), then… archiving can wait until Thursday with no impact.”"),
    tip: L("اكتب المهام كما هي ولو مبعثرة؛ الترتيب مهمته هو.", "List tasks as they are, even messy; ordering is its job.") });
  P({ id: "u1-p-blocks", lesson: "u1-day", pages: [8], cat: "automate", icon: "⏰",
    title: L("تقسيم اليوم إلى فترات", "Splitting the day into blocks"),
    goal: L("جدول زمني يحمي وقت التركيز ويراعي طاقتك وارتباطاتك.", "A timetable that protects focus time around your energy and commitments."),
    text: L("قسّم يومي إلى فترات تركيز عميق، وفترات راحة، وفترات متابعة ورد على الرسائل. راعِ أن طاقتي الذهنية أعلى في [الصباح / بعد الظهر]، وأن لديّ ارتباطات ثابتة في [اذكرها]. أعطني الجدول في شكل جدول زمني واضح.", "Split my day into deep-focus blocks, breaks, and follow-up/reply blocks. Take into account that my mental energy is highest in the [morning / afternoon] and that I have fixed commitments at [list them]. Give me the schedule as a clear timetable."),
    tip: L("جرّبه أسبوعًا واحدًا، ثم عدّل الأوقات حسب ما حدث فعلًا.", "Try it for a week, then adjust the times to what actually happened.") });
  P({ id: "u1-p-agenda", lesson: "u1-day", pages: [8], cat: "work", icon: "📅",
    title: L("قبل الاجتماع: أجندة مختصرة", "Before the meeting: a short agenda"),
    goal: L("اجتماع له هدف وقرارات مطلوبة وحضور ضروري فقط.", "A meeting with a goal, required decisions and only necessary attendees."),
    text: L("حوّل هذا الموضوع إلى أجندة اجتماع مختصرة: [الموضوع]. حدّد الهدف الواضح من الاجتماع، والقرارات المطلوب الخروج بها، ومن يجب أن يحضر فعلًا ومن يكفيه الملخص بعدها، والوقت المقترح لكل بند.", "Turn this topic into a short meeting agenda: [the topic]. Define the clear goal of the meeting, the decisions it must produce, who must actually attend and who only needs the summary afterwards, and the suggested time for each item."),
    tip: L("أرسل الأجندة قبل الاجتماع بيوم ومعها «القرارات المطلوبة».", "Send the agenda a day ahead, including the “decisions required”.") });
  P({ id: "u1-p-minutes", lesson: "u1-day", pages: [9], cat: "work", icon: "📝",
    title: L("بعد الاجتماع: محضر مرتب", "After the meeting: tidy minutes"),
    goal: L("تحويل الملاحظات المبعثرة إلى قرارات ومتابعات بمسؤول وموعد.", "Turn scattered notes into decisions and owner-dated follow-ups."),
    text: L("هذه ملاحظاتي المبعثرة من الاجتماع: [الصق الملاحظات]. حوّلها إلى محضر مرتب يتضمن: ملخصًا تنفيذيًا في ثلاثة أسطر، والقرارات المتخذة، ونقاط المتابعة مع المسؤول والموعد لكل بند، والمسائل التي لم تُحسم بعد.", "These are my scattered notes from the meeting: [paste the notes]. Turn them into tidy minutes including: a three-line executive summary, the decisions made, follow-up points with the owner and date for each, and the issues not yet settled."),
    example: L("«القرار ٢: تأجيل حملة أكتوبر أسبوعين — المسؤول: سارة — الموعد: الأحد.»", "“Decision 2: postpone the October campaign two weeks — owner: Sara — due: Sunday.”"),
    tip: L("راجع أسماء المسؤولين والمواعيد بنفسك؛ النموذج قد يخلط بينها.", "Check owners and dates yourself; the model may mix them up.") });
  P({ id: "u1-p-tasks", lesson: "u1-day", pages: [9], cat: "work", icon: "🪜",
    title: L("من هدف إلى مهام", "From goal to tasks"),
    goal: L("خطة تنفيذ صغيرة الخطوات لكل منها مسؤول وموعد ومعيار إنجاز.", "A small-step plan, each with owner, date and done-criterion."),
    text: L("هدفي هو [الهدف]. حوّله إلى مهام صغيرة مرتبة منطقيًا حسب التسلسل الصحيح للتنفيذ. حدّد لكل مهمة: المسؤول المناسب، والموعد المتوقع، ومعيار الإنجاز الذي يثبت أنها اكتملت فعلًا. ثم استخرج العوائق المحتملة واقترح طريقة التعامل مع كل عائق.", "My goal is [the goal]. Turn it into small tasks ordered logically in the correct execution sequence. For each task specify: the right owner, the expected date, and the done-criterion that proves it is really complete. Then extract the likely obstacles and suggest how to handle each one."),
    tip: L("إن لم تستطع كتابة معيار إنجاز لمهمة، فهي غير واضحة بعد.", "If you can’t write a done-criterion for a task, it isn’t clear yet.") });
  P({ id: "u1-p-message", lesson: "u1-write", pages: [9], cat: "work", icon: "✉️",
    title: L("رسالة مهنية", "A professional message"),
    goal: L("رسالة قصيرة واضحة تنتهي بطلب محدد.", "A short, clear message ending with a specific request."),
    text: L("اكتب رسالة مهنية واضحة ومختصرة حول: [الموضوع]. الجهة المستقبِلة هي [الجهة]، والنبرة المطلوبة [رسمية / ودية]، والنتيجة التي أريدها من الرسالة هي [ما تريد أن يفعله المستقبِل]. اجعلها قصيرة قدر الإمكان دون فقدان المعنى، وأنهِها بطلب واضح.", "Write a clear, concise professional message about: [the topic]. The recipient is [the party], the tone is [formal / friendly], and the outcome I want is [what you want the recipient to do]. Keep it as short as possible without losing meaning, and end it with a clear request."),
    tip: L("«النتيجة التي أريدها» أهم سطر: بدونه تأتي الرسالة مهذبة بلا هدف.", "“The outcome I want” is the key line: without it the message is polite but aimless.") });
  P({ id: "u1-p-persuade", lesson: "u1-write", pages: [9], cat: "work", icon: "🤝",
    title: L("حين يكون الهدف الإقناع", "When the goal is persuasion"),
    goal: L("إعادة صياغة رسالة لتبدأ بمصلحة الطرف الآخر وتنتهي بخطوة سهلة.", "Rewrite a message to start from the other party’s interest and end with an easy step."),
    text: L("هذه رسالتي: [الصق النص]. هدفي إقناع [الجهة] بـ[المطلوب]. أعد صياغتها لتكون أقوى إقناعًا: ابدأ بما يهمه هو لا بما يهمني أنا، وادعم الطلب بمنفعة واضحة له، وقلّل التبريرات، واختم بخطوة واحدة سهلة يستطيع اتخاذها فورًا.", "This is my message: [paste the text]. My goal is to persuade [the party] to [the request]. Rewrite it to be more persuasive: start with what matters to them, not to me, support the request with a clear benefit for them, cut the justifications, and end with one easy step they can take immediately."),
    tip: L("الإقناع ليس مبالغة: اطلب منه ألا يضيف منافع غير حقيقية.", "Persuasion isn’t exaggeration: ask it not to add benefits that aren’t real.") });
  P({ id: "u1-p-extract", lesson: "u1-write", pages: [9], cat: "research", icon: "🧲",
    title: L("استخراج منظم", "Structured extraction"),
    goal: L("جدول حقائق وأرقام وأسماء ومواعيد، مع فصل الحقيقة عن الرأي عن الافتراض.", "A table of facts, numbers, names and dates, separating fact, opinion and assumption."),
    text: L("استخرج من هذا النص أهم الحقائق والأرقام والأسماء والمواعيد: [النص]. رتّبها في جدول واضح. ثم — وهذا هو الأهم — فرّق بوضوح بين ما هو حقيقة مؤكدة، وما هو رأي، وما هو افتراض. واذكر أخيرًا ما المعلومات الناقصة التي أحتاجها قبل اتخاذ أي خطوة.", "Extract the key facts, numbers, names and dates from this text: [the text]. Arrange them in a clear table. Then — and this is the most important — clearly separate what is confirmed fact, what is opinion, and what is assumption. Finally, state the missing information I need before taking any step."),
    tip: L("عمود «حقيقة/رأي/افتراض» هو قيمة البرومبت كلها.", "The “fact/opinion/assumption” column is the whole value of the prompt.") });
  P({ id: "u1-p-followup-report", lesson: "u1-write", pages: [9], cat: "work", icon: "📈",
    title: L("تقرير متابعة", "A follow-up report"),
    goal: L("مقارنة الخطة بالإنجاز، وإجراءات تصحيحية، وتقرير جاهز للمدير.", "Compare plan with delivery, corrective actions, and a manager-ready report."),
    text: L("هذه هي الخطة الأصلية: [الخطة]. وهذا ما تم إنجازه فعليًا: [الإنجاز]. راجع الفرق بينهما، واذكر ما الذي تأخر ولماذا وما أثره الفعلي على الهدف النهائي. ثم اقترح إجراءات تصحيحية عملية وسريعة. وأخيرًا، أنشئ تقرير متابعة مختصرًا يصلح لإرساله إلى المدير مباشرة.", "This is the original plan: [the plan]. This is what was actually achieved: [the delivery]. Review the gap, state what slipped, why, and its real impact on the final goal. Then suggest practical, quick corrective actions. Finally, create a short follow-up report ready to send to the manager directly."),
    tip: L("انسخ أرقام الخطة والإنجاز من مصدرها، لا من الذاكرة.", "Copy plan and delivery numbers from their source, not memory.") });
  P({ id: "u1-p-process", lesson: "u1-write", pages: [9], cat: "automate", icon: "⚙️",
    title: L("تحليل عملية قائمة", "Analysing an existing process"),
    goal: L("كشف الهدر وتحديد ما يُؤتمت بالكامل وما يُبسّط فقط.", "Find waste and decide what to fully automate versus only simplify."),
    text: L("هذه عملية أنفذها بشكل متكرر: [صف الخطوات]. حللها وحدّد نقاط الضعف، ومواضع الهدر في الوقت أو الجهد، والخطوات المكررة بلا داعٍ. ثم اقترح خمسة تحسينات بسيطة ذات أثر قوي، ورتبها حسب سهولة التنفيذ وقوة الأثر. وحدّد تحديدًا ما الذي يمكن أتمتته بالكامل وما الذي يمكن تبسيطه فقط.", "This is a process I perform repeatedly: [describe the steps]. Analyse it and identify weak points, waste of time or effort, and needlessly repeated steps. Then suggest five simple, high-impact improvements, ranked by ease of implementation and strength of impact. And specify exactly what can be fully automated and what can only be simplified."),
    tip: L("ما يخرج «قابلًا للأتمتة بالكامل» مرشح ممتاز لبوصلة القرار في الدليل الثاني.", "Whatever comes out as “fully automatable” is a great candidate for Guide 2’s decision compass.") });
  P({ id: "u1-p-delegate", lesson: "u1-write", pages: [9], cat: "work", icon: "🧑‍🤝‍🧑",
    title: L("تجهيز مهمة للتفويض", "Preparing a task for delegation"),
    goal: L("نص تكليف كامل يجعل المفوَّض يعمل باستقلال.", "A full assignment that lets the delegate work independently."),
    text: L("أريد تفويض هذه المهمة إلى [الشخص ودوره]: [صف المهمة]. جهّز لي نص التكليف بحيث يتضمن: النتيجة المطلوبة بدقة، والصلاحيات الممنوحة وحدودها، والموعد، ومعيار القبول الذي سأحكم به، والنقاط التي يجب أن يرجع إليّ فيها قبل أن يقرر بنفسه. اجعله مختصرًا وقابلًا للإرسال كما هو.", "I want to delegate this task to [the person and their role]: [describe the task]. Prepare the assignment text including: the exact required result, the authority granted and its limits, the deadline, the acceptance criterion I’ll judge by, and the points where they must check back with me before deciding alone. Keep it short and ready to send as is."),
    tip: L("«نقاط الرجوع» تحمي المفوَّض قبل أن تحميك.", "“Check-back points” protect the delegate before they protect you.") });
  P({ id: "u1-p-nudge", lesson: "u1-write", pages: [9], cat: "work", icon: "🔔",
    title: L("متابعة دون إزعاج", "Following up without nagging"),
    goal: L("طلب تحديث مهذب يفتح الباب لذكر العوائق.", "A polite update request that invites mention of blockers."),
    text: L("فوّضت مهمة [المهمة] منذ [المدة] ولم يصلني تحديث. اكتب لي رسالة متابعة قصيرة ومهنية تطلب التحديث دون أن تبدو ضغطًا أو تشكيكًا في الشخص، وتتيح له أن يذكر أي عائق يواجهه بسهولة.", "I delegated [the task] [time ago] and haven’t received an update. Write me a short, professional follow-up message asking for an update without sounding like pressure or distrust, and that makes it easy for them to mention any obstacle."),
    tip: L("رسالة المتابعة الجيدة تسأل عن العائق قبل أن تسأل عن الموعد.", "A good follow-up asks about blockers before asking about deadlines.") });
  P({ id: "u1-p-triage", lesson: "u1-write", pages: [10], cat: "automate", icon: "📥",
    title: L("فرز سريع للرسائل", "Quick triage of incoming messages"),
    goal: L("تقسيم الوارد إلى أربع فئات وردود جاهزة للعاجل.", "Split the inbox into four groups with ready replies for the urgent."),
    text: L("هذه رسائل ومهام وردتني اليوم: [الصقها]. صنّفها إلى أربع فئات: ما يتطلب ردًا مني اليوم، وما يمكن تفويضه لغيري، وما يمكن تأجيله بأمان، وما يمكن تجاهله تمامًا. ولكل بند في الفئة الأولى، اقترح ردًا مختصرًا جاهزًا.", "These are messages and tasks I received today: [paste them]. Sort them into four groups: what needs a reply from me today, what can be delegated, what can be safely postponed, and what can be ignored entirely. For each item in the first group, suggest a short ready reply."),
    tip: L("أعطه قاعدتين من خبرتك لما «يُتجاهل» في وظيفتك.", "Give it two rules from your experience for what to “ignore” in your job.") });
  P({ id: "u1-p-master-prod", lesson: "u1-write", pages: [10], cat: "automate", icon: "⚡",
    title: L("البرومبت الشامل للإنتاجية", "The master productivity prompt"),
    goal: L("للخروج من التشتت حين لا تعرف من أين تبدأ.", "To escape confusion when you don’t know where to start."),
    text: L("أنت مساعدي العملي في [الموضوع]. هدفي هو [الهدف]. وهذا هو السياق الكامل: [السياق]. حلل الوضع أولًا، ثم نظّم المعلومات، ثم اقترح أفضل الخيارات المتاحة، ثم حوّل الخيار الأفضل إلى خطوات تنفيذية واضحة. إن كانت هناك معلومات ناقصة فاذكرها قبل أن تبدأ. قدّم النتيجة في شكل [نقاط / جدول / رسالة / خطة عمل] وبأسلوب واضح ومباشر.", "You are my practical assistant for [the topic]. My goal is [the goal]. Here is the full context: [the context]. First analyse the situation, then organise the information, then propose the best available options, then turn the best option into clear executable steps. If information is missing, state it before you start. Present the result as [bullets / table / message / action plan] in a clear, direct style."),
    tip: L("بعد أن يتضح نوع المهمة، انتقل للبرومبت المتخصص من الفهرس السريع.", "Once the task type is clear, switch to the specialised prompt from the quick index.") });

  /* ----- Section 3: strategy (p10–11) ----- */
  P({ id: "u1-p-learn", lesson: "u1-think", pages: [10], cat: "learn", icon: "🎓",
    title: L("فهم موضوع من الصفر", "Learning a topic from scratch"),
    goal: L("تعلم متدرج: الصورة الكبيرة، ثم العناصر، ثم مثال واختبار.", "Graded learning: big picture, then elements, then an example and a quiz."),
    text: L("علّمني [الموضوع] من الصفر على مراحل متدرجة. ابدأ بالصورة الكبيرة: لماذا يوجد هذا الموضوع أصلًا وما المشكلة التي يحلها؟ ثم اشرح العناصر المرتبطة به، وما الذي أحتاج إلى معرفته أولًا قبل غيره. اشرح ببساطة، ثم أعطني مثالًا عمليًا، ثم اختبارًا قصيرًا مع الإجابات.", "Teach me [the topic] from scratch in graded stages. Start with the big picture: why does this topic exist and what problem does it solve? Then explain its related elements and what I need to know first. Explain simply, then give me a practical example, then a short quiz with answers."),
    tip: L("اطلب الاختبار قبل أن ترى الإجابات؛ أجب أنت أولًا.", "Ask to take the quiz before seeing the answers; answer yourself first.") });
  P({ id: "u1-p-consolidate", lesson: "u1-think", pages: [10], cat: "learn", icon: "🧠",
    title: L("تثبيت ما تعلمته", "Consolidating what you learned"),
    goal: L("أسئلة وتمارين تختبر الفهم والتطبيق لا الحفظ.", "Questions and exercises that test understanding and application, not memory."),
    text: L("حوّل هذا الشرح إلى أسئلة مراجعة وتمارين قصيرة مع إجاباتها: [الشرح]. اجعل الأسئلة تختبر الفهم والتطبيق، لا الحفظ. وأضف في النهاية ثلاثة أخطاء شائعة يقع فيها المبتدئون في هذا الموضوع تحديدًا.", "Turn this explanation into review questions and short exercises with answers: [the explanation]. Make the questions test understanding and application, not memorisation. At the end, add three common mistakes beginners make in this specific topic."),
    tip: L("استخدمه بعد أي درس هنا: الصق «الخلاصة» واطلب التمارين.", "Use it after any lesson here: paste the “key points” and ask for exercises.") });
  P({ id: "u1-p-breakdown", lesson: "u1-think", pages: [10], cat: "analyze", icon: "🧩",
    title: L("تفكيك مشكلة", "Breaking down a problem"),
    goal: L("عناصر المشكلة وأسبابها الجذرية المرتبة، وكيف تتحقق من كل سبب.", "The problem’s elements and ranked root causes, and how to confirm each."),
    text: L("حلّل هذه المشكلة: [المشكلة]. قسّمها إلى عناصرها الرئيسية، واربط بينها، وحدّد أهم ما يستحق الانتباه أولًا. وإن لم تكن الأسباب واضحة، فاقترح الأسباب الجذرية المحتملة، ورتبها حسب احتمال حدوثها وقوة تأثيرها، ثم حدّد ما الذي نحتاج إلى معرفته للتأكد من كل سبب.", "Analyse this problem: [the problem]. Break it into its main elements, link them, and identify what deserves attention first. If the causes aren’t clear, suggest likely root causes, rank them by probability and impact, then state what we need to know to confirm each cause."),
    tip: L("أرفق الأرقام الفعلية؛ بدونها ستكون الأسباب «شائعة» لا «جذرية».", "Attach the real numbers; without them causes will be “common”, not “root”.") });
  P({ id: "u1-p-patterns", lesson: "u1-think", pages: [10], cat: "analyze", icon: "🔎",
    title: L("كشف الأنماط الخفية", "Spotting hidden patterns"),
    goal: L("أنماط وعلاقات وإشارات مهملة مع معناها العملي.", "Patterns, relationships and overlooked signals with their practical meaning."),
    text: L("راجع هذه البيانات أو الأحداث: [البيانات]. اكشف الأنماط المتكررة، والعلاقات بين العناصر، والتغيرات غير الطبيعية، والإشارات التي ربما تم إغفالها. ولا تكتفِ بوصف ما تراه — اشرح لماذا يستحق كل نمط الانتباه، وما الذي قد يعنيه عمليًا.", "Review this data or these events: [the data]. Uncover recurring patterns, relationships between elements, abnormal changes, and signals that may have been overlooked. Don’t just describe what you see — explain why each pattern deserves attention and what it might mean in practice."),
    tip: L("اطلب بعدها: «أي نمط لو تحقق يغيّر قرارًا؟»", "Follow up with: “which pattern, if real, would change a decision?”") });
  P({ id: "u1-p-compare2", lesson: "u1-think", pages: [10], cat: "decide", icon: "⚖️",
    title: L("مقارنة خيارين", "Comparing two options"),
    goal: L("جدول مقارنة بستة معايير وتوصية بسببها.", "A six-criterion comparison table and a reasoned recommendation."),
    text: L("قارن بين [الخيار الأول] و[الخيار الثاني] بالنسبة إلى هدفي وهو [الهدف]، من حيث: التكلفة، والوقت، والمخاطر، والعائد المتوقع، وسهولة التنفيذ، وقابلية التراجع عن القرار لاحقًا. ضع المقارنة في جدول، ثم أعطني توصيتك مع سببها.", "Compare [option one] and [option two] against my goal, which is [the goal], in terms of: cost, time, risks, expected return, ease of implementation, and how reversible the decision is later. Put the comparison in a table, then give me your recommendation with its reason."),
    tip: L("إن تساوى الخياران، فالأسهل في التراجع هو الأذكى كبداية.", "If the options tie, the more reversible one is the smarter start.") });
  P({ id: "u1-p-prioritize", lesson: "u1-think", pages: [10], cat: "decide", icon: "🥇",
    title: L("ترتيب الأولويات", "Prioritising"),
    goal: L("ما تبدأ به، وما يؤجَّل بأمان، وما يُلغى دون خسارة.", "What to start with, what to safely postpone, and what to drop."),
    text: L("رتّب هذه القائمة: [القائمة]. المعايير هي: قوة التأثير، ودرجة الاستعجال، والجهد المطلوب، والمخاطر المترتبة على التأجيل. أخبرني بما يجب أن أبدأ به ولماذا تحديدًا، وما يمكن تأجيله بأمان، وما يمكن إلغاؤه تمامًا دون خسارة تُذكر.", "Prioritise this list: [the list]. The criteria are: impact, urgency, effort required, and the risk of postponing. Tell me what to start with and exactly why, what can be safely postponed, and what can be dropped entirely without notable loss."),
    tip: L("قل له أي معيار أهم عندك؛ وإلا سيحدد الأوزان ضمنيًا.", "Tell it which criterion matters most to you; otherwise it weights them implicitly.") });
  P({ id: "u1-p-decision", lesson: "u1-think", pages: [11], cat: "decide", icon: "✅",
    title: L("قرار مدروس", "A considered decision"),
    goal: L("بدائل بمزاياها ومخاطرها، وتوصية، وشرط إعادة النظر.", "Options with pros and risks, a recommendation, and a reconsideration trigger."),
    text: L("افهم هدفي وقيودي أولًا: هدفي [الهدف]، وقيودي [القيود]. ثم اعرض البدائل المتاحة، ومزايا ومخاطر كل بديل، والنتائج المحتملة لكل اتجاه. وأوصِ بأفضل قرار مع توضيح الأسباب بوضوح، وحدّد ما الذي قد يجعلني أغيّر هذا القرار لاحقًا.", "Understand my goal and constraints first: my goal is [the goal], my constraints are [the constraints]. Then present the available options, the pros and risks of each, and the likely outcomes of each direction. Recommend the best decision with clear reasons, and state what might make me change this decision later."),
    tip: L("اكتب «شرط إعادة النظر» في التقويم كتذكير مراجعة.", "Put the “reconsideration trigger” in your calendar as a review reminder.") });
  P({ id: "u1-p-scenarios", lesson: "u1-scenarios", pages: [11], cat: "decide", icon: "🔮",
    title: L("ثلاثة سيناريوهات", "Three scenarios"),
    goal: L("متفائل وواقعي ومتحفظ، بعلامات مبكرة وإجراء لكل منها.", "Optimistic, realistic and cautious, each with early signs and an action."),
    text: L("بناءً على هذه المعلومات: [المعلومات]، اعرض ثلاثة سيناريوهات: متفائل، وواقعي، ومتحفظ. ولكل سيناريو، اذكر العلامات المبكرة التي تشير إلى أننا نتجه نحوه تحديدًا، وما الذي ينبغي أن أفعله فور ظهور تلك العلامات.", "Based on this information: [the information], present three scenarios: optimistic, realistic and cautious. For each, state the early signs that we’re heading specifically towards it, and what I should do as soon as those signs appear."),
    tip: L("العلامات المبكرة يجب أن تكون أرقامًا تقيسها فعلًا كل أسبوع.", "Early signs should be numbers you actually measure weekly.") });
  P({ id: "u1-p-premortem", lesson: "u1-scenarios", pages: [11], cat: "decide", icon: "🧯",
    title: L("اكتشاف نقاط الفشل مسبقًا", "Finding failure points in advance"),
    goal: L("المخاطر والثغرات والافتراضات الخطرة مرتبة، مع وقاية أو بديل.", "Ranked risks, gaps and dangerous assumptions, with prevention or a fallback."),
    text: L("راجع هذه الخطة: [الخطة]، كما لو كنت مسؤولًا عن كشف نقاط فشلها قبل التنفيذ. حدّد المخاطر، والثغرات، والافتراضات الخطرة التي ربما لم أنتبه إليها. ورتبها حسب خطورتها، واقترح لكل واحدة طريقة وقاية مسبقة أو خطة بديلة.", "Review this plan: [the plan], as if you were responsible for exposing its failure points before execution. Identify the risks, gaps and dangerous assumptions I may have missed. Rank them by severity, and suggest preventive measures or a fallback plan for each."),
    tip: L("قيّم خطورة كل نقطة، لا عددها.", "Weigh each point’s severity, not their count.") });
  P({ id: "u1-p-challenge", lesson: "u1-scenarios", pages: [11], cat: "decide", icon: "🥊",
    title: L("اختبار فكرة: «لا توافقني تلقائيًا»", "Test an idea: “don’t just agree with me”"),
    goal: L("نقد حقيقي قبل أي تحسين.", "Real critique before any improvement."),
    text: L("لا توافقني تلقائيًا. اختبر فكرتي هذه: [الفكرة]. ابحث عن نقاط ضعفها، والافتراضات غير المعلنة التي تقوم عليها، والحالات التي قد تفشل فيها. ثم — وبعد النقد فقط — اقترح كيف يمكن تحسينها لتصمد أمام هذه الاعتراضات.", "Don’t just agree with me. Test this idea of mine: [the idea]. Look for its weaknesses, the unstated assumptions it rests on, and the cases where it might fail. Then — and only after the critique — suggest how it could be improved to withstand these objections."),
    tip: L("استخدمه قبل عرض أي فكرة على الإدارة.", "Use it before presenting any idea to management.") });
  P({ id: "u1-p-simpler", lesson: "u1-scenarios", pages: [11], cat: "decide", icon: "🪶",
    title: L("توليد بدائل أبسط", "Generating simpler alternatives"),
    goal: L("بدائل أرخص بنفس الهدف مع ثمن البساطة.", "Cheaper alternatives for the same goal, with the price of simplicity."),
    text: L("أريد تحقيق [الهدف]، وخطتي الحالية هي [الخطة]. اقترح بدائل أبسط وأقل تكلفة يمكنها تحقيق الهدف نفسه. ولكل بديل، اذكر ما الذي نتنازل عنه مقابل هذه البساطة، ومتى يكون هذا التنازل مقبولًا ومتى لا يكون.", "I want to achieve [the goal], and my current plan is [the plan]. Suggest simpler, cheaper alternatives that can achieve the same goal. For each, state what we give up in exchange for the simplicity, and when that trade-off is acceptable and when it isn’t."),
    tip: L("البديل الأبسط غالبًا هو أول «شريحة» تبدأ بها.", "The simpler option is often the first “slice” to start with.") });
  P({ id: "u1-p-plan", lesson: "u1-scenarios", pages: [11], cat: "decide", icon: "🗺️",
    title: L("من هدف إلى خطة", "From goal to plan"),
    goal: L("مراحل بنتائج ومخاطر، وأول خطوة تُنفَّذ خلال ساعة.", "Phases with results and risks, and a first step doable within an hour."),
    text: L("هدفي هو [الهدف]، ووضعي الحالي هو [الوضع]. حوّل ذلك إلى خطة من مراحل واضحة، ولكل مرحلة نتيجة مطلوبة ومخاطر متوقعة. وحدّد أول خطوة أبدأ بها اليوم فعلًا، بحيث تكون صغيرة بما يكفي لأنفذها خلال ساعة واحدة.", "My goal is [the goal] and my current situation is [the situation]. Turn this into a plan of clear phases, each with a required result and expected risks. And identify the first step I’ll actually start today, small enough to complete within one hour."),
    tip: L("نفّذ خطوة الساعة الأولى اليوم فعلًا؛ هي اختبار واقعية الخطة.", "Actually do the one-hour step today; it tests the plan’s realism.") });
  P({ id: "u1-p-retro", lesson: "u1-scenarios", pages: [11], cat: "learn", icon: "🔁",
    title: L("التعلم من التجربة", "Learning from experience"),
    goal: L("تحويل دروس مشروع أو أسبوع إلى تحسينات عملية.", "Turn a project’s or week’s lessons into practical improvements."),
    text: L("راجع [المشروع / الأسبوع المنتهي]: ماذا نجح ولماذا؟ وماذا فشل ولماذا؟ وما الأنماط المتكررة التي تظهر في أكثر من موقف؟ ثم حوّل هذه الدروس إلى قائمة تحسينات عملية أطبّقها في المرة القادمة، لا إلى ملاحظات عامة.", "Review [the project / the week just ended]: what worked and why? What failed and why? What recurring patterns appear in more than one situation? Then turn these lessons into a list of practical improvements I’ll apply next time — not general notes."),
    tip: L("اجعلها عادة أسبوعية يوم الخميس لمدة ١٠ دقائق.", "Make it a 10-minute weekly habit every Thursday.") });
  P({ id: "u1-p-missing", lesson: "u1-scenarios", pages: [11], cat: "decide", icon: "🧩",
    title: L("حين لا تملك بيانات كافية للقرار", "When you lack enough data to decide"),
    goal: L("ما يمكن استنتاجه، وما يغيّر القرار، وأرخص طريقة للمعلومة الأولى.", "What can be inferred, what would change the decision, and the cheapest way to the first missing piece."),
    text: L("أحتاج أن أقرر بشأن [الموضوع]، لكن المعلومات المتاحة لديّ ناقصة: [اذكر ما تملكه فعلًا]. حدّد أولًا ما الذي يمكن استنتاجه بثقة من المتاح، وما الذي لا يمكن الجزم به إطلاقًا. ثم رتّب المعلومات الناقصة حسب أثرها على القرار: أيها يغيّر القرار جذريًا إن عرفته، وأيها لطيف معرفته لكنه لا يغيّر شيئًا. وأخيرًا، اقترح أرخص طريقة وأسرعها للحصول على المعلومة الأولى فقط.", "I need to decide about [the topic], but my information is incomplete: [state what you actually have]. First identify what can be inferred confidently from what’s available, and what cannot be determined at all. Then rank the missing information by its effect on the decision: which would change it radically if known, and which is nice to know but changes nothing. Finally, suggest the cheapest, fastest way to get the first piece only."),
    tip: L("«الأولى فقط» مقصودة: لا تنتظر كل شيء.", "“The first only” is deliberate: don’t wait for everything.") });
  P({ id: "u1-p-master-strat", lesson: "u1-scenarios", pages: [11], cat: "decide", icon: "🧭",
    title: L("البرومبت الشامل الاستراتيجي", "The master strategic prompt"),
    goal: L("ترتيب إلزامي من الفهم إلى الخطوات يمنع القفز إلى الحل.", "A forced order from understanding to steps that prevents jumping to the solution."),
    text: L("أنت مساعدي الاستراتيجي في [الموضوع]. هدفي هو [الهدف]. والسياق الذي تحتاج إلى معرفته هو [السياق]. والقيود هي [القيود]. لا تبدأ بالحل مباشرة: افهم الوضع أولًا، ثم حلّله، ثم شخّص الأسباب، ثم اكشف المخاطر والفرص، ثم اعرض البدائل، ثم أوصِ بأفضل قرار، ثم توقّع النتائج المحتملة، ثم حوّل القرار إلى خطوات تنفيذية. افصل بوضوح بين الحقائق والافتراضات، وإن كانت هناك معلومات ناقصة فاذكرها بوضوح قبل أن تبدأ.", "You are my strategic assistant for [the topic]. My goal is [the goal]. The context you need is [the context]. The constraints are [the constraints]. Don’t start with the solution directly: first understand the situation, then analyse it, then diagnose the causes, then uncover risks and opportunities, then present the options, then recommend the best decision, then predict the likely outcomes, then turn the decision into execution steps. Clearly separate facts from assumptions, and if information is missing, state it clearly before you start."),
    example: L("«الحقائق: … الافتراضات: … التشخيص: السبب الأرجح… البدائل الثلاثة… التوصية… الخطوات: ١…»", "“Facts: … Assumptions: … Diagnosis: the likeliest cause… Three options… Recommendation… Steps: 1…”"),
    tip: L("للقرارات الكبيرة والغامضة فقط؛ للمهام اليومية استخدم البرومبت الشامل للإنتاجية.", "For big, unclear decisions only; for daily tasks use the master productivity prompt.") });

  /* ----- Section 4: second brain (p12–13) ----- */
  P({ id: "u1-p-nb-conflicts", lesson: "u1-brain", pages: [12], cat: "research", icon: "⚔️",
    title: L("كشف التناقضات بين المصادر", "Finding contradictions between sources"),
    goal: L("أين تختلف المصادر، وما تتفق عليه، وما ضعيف الدليل، وما لا تجيب عنه.", "Where sources differ, agree, lack evidence, or fall silent."),
    text: L("بناءً على المصادر المفعّلة في هذا الدفتر فقط: أين تختلف المصادر فيما بينها؟ وما النقاط التي تتفق عليها جميعًا؟ وما الادعاءات التي ورد دليل ضعيف عليها أو لم يرد دليل أصلًا؟ وما الأسئلة المهمة التي لا تجيب عنها هذه المصادر بعد؟ اذكر المصدر لكل نقطة.", "Based only on the sources enabled in this notebook: where do the sources differ from each other? What points do they all agree on? Which claims have weak or no evidence? What important questions do these sources not yet answer? Cite the source for every point."),
    tip: L("شغّله كلما أضفت مصدرًا جديدًا مهمًا.", "Run it whenever you add an important new source.") });
  P({ id: "u1-p-nb-decide", lesson: "u1-brain", pages: [13], cat: "decide", icon: "➡️",
    title: L("من المعرفة إلى القرار", "From knowledge to decision"),
    goal: L("توصيات مرتبة حسب قوة الدليل، مع فصل المدعوم عن الترجيح.", "Recommendations ranked by evidence strength, separating supported from estimated."),
    text: L("بناءً على الأدلة الموجودة في هذا الدفتر فقط، ودون أي معلومات خارجية: ماذا ينبغي أن أفعل بعد ذلك بخصوص [الموضوع]؟ رتّب التوصيات حسب قوة الدليل الداعم لها، واذكر الدليل والمصدر وراء كل توصية، وميّز بوضوح ما هو مدعوم بدليل قوي عما هو مجرد ترجيح.", "Based only on the evidence in this notebook, without any outside information: what should I do next about [the topic]? Rank the recommendations by the strength of their supporting evidence, state the evidence and source behind each, and clearly separate what is strongly supported from what is merely an estimate."),
    tip: L("هذا هو «السؤال الأخير الثابت» في صورة كاملة.", "This is the “fixed final question” in full form.") });
  P({ id: "u1-p-nb-teach", lesson: "u1-brain", pages: [13], cat: "learn", icon: "🧑‍🏫",
    title: L("تجهيز مادة تعليمية من الدفتر", "Preparing teaching material from the notebook"),
    goal: L("خريطة ذهنية وشرح متدرج وأسئلة وأخطاء شائعة لجمهور محدد.", "A mind map, graded explanation, questions and common mistakes for a set audience."),
    text: L("حوّل محتوى هذا الدفتر إلى مادة تعليمية لجمهور [حدّد الجمهور ومستواه]: ابدأ بخريطة ذهنية للصورة الكبيرة، ثم شرحًا متدرجًا للأفكار الأساسية، ثم عشرة أسئلة مراجعة مع إجاباتها، ثم قائمة بأكثر خمسة أخطاء شائعة في هذا الموضوع.", "Turn this notebook’s content into teaching material for [specify the audience and level]: start with a mind map of the big picture, then a graded explanation of the core ideas, then ten review questions with answers, then a list of the five most common mistakes in this topic."),
    tip: L("مناسب لتدريب موظف جديد على سياسات القسم.", "Great for onboarding a new employee to department policies.") });
  P({ id: "u1-p-nb-final", lesson: "u1-brain", pages: [12], cat: "decide", icon: "📌",
    title: L("السؤال الأخير الثابت", "The fixed final question"),
    goal: L("إنهاء كل جلسة بحث بقرار موثّق لا بمعلومات متراكمة.", "End every research session with a documented decision, not piled-up info."),
    text: L("بناءً على الأدلة فقط، ماذا ينبغي أن أفعل بعد ذلك؟ وما الدليل وراء كل توصية؟", "Based only on the evidence, what should I do next? And what is the evidence behind each recommendation?"),
    tip: L("القاعدة ٦ في الكتاب: اجعله ثابتًا في نهاية كل جلسة.", "Rule 6 in the book: make it fixed at the end of every session.") });

  /* ----- Section 5: automation (p13–14) ----- */
  P({ id: "u1-p-formula", lesson: "u1-excel", pages: [13], cat: "automate", icon: "🧮",
    title: L("نموذج الطلب الصحيح لأي معادلة", "The right request template for any formula"),
    goal: L("معادلة صحيحة مع شرح واختبار، بثلاثة عناصر: البنية والناتج وقاعدة الاستثناء.", "A correct, explained, tested formula with three elements: structure, output, edge-case rule."),
    text: L("عندي جدول مبيعات. العمود «أ» فيه اسم المنتج، و«ب» الكمية، و«ج» سعر البيع، و«د» التكلفة. أريد معادلة تحسب هامش الربح كنسبة مئوية، لكن إذا كانت البيانات ناقصة تظهر الخلية فارغة بدل رسالة خطأ. اكتب المعادلة، واشرحها ببساطة، واختبرها على ثلاث حالات مختلفة.", "I have a sales table. Column A has the product name, B the quantity, C the sale price and D the cost. I want a formula that calculates profit margin as a percentage, but if the data is missing the cell shows empty instead of an error message. Write the formula, explain it simply, and test it on three different cases."),
    example: L("=IF(OR(C2=\"\",D2=\"\",C2=0),\"\",(C2-D2)/C2) — «تتحقق أولًا من وجود السعر والتكلفة…»", "=IF(OR(C2=\"\",D2=\"\",C2=0),\"\",(C2-D2)/C2) — “It first checks price and cost exist…”"),
    tip: L("استبدل الأعمدة بأعمدة ملفك الحقيقية وأنواعها.", "Replace the columns with your real file’s columns and types.") });
  P({ id: "u1-p-fix-formula", lesson: "u1-excel", pages: [13], src: "add", cat: "automate", icon: "🩹",
    title: L("أصلح معادلة لا تعمل", "Fix a formula that doesn’t work"),
    goal: L("تشخيص سبب الخطأ قبل إصلاحه.", "Diagnose the error’s cause before fixing it."),
    text: L("هذه المعادلة: [الصق المعادلة] تعطي [النتيجة الخاطئة أو رسالة الخطأ] في الخلية [رقم الخلية]. الأعمدة هي: [صف الأعمدة وأنواعها]. اشرح لي سبب الخطأ ببساطة، ثم أعطني المعادلة المصححة، وحالتين أختبر بهما أن المشكلة لن تتكرر.", "This formula: [paste the formula] returns [the wrong result or error] in cell [the cell]. The columns are: [describe columns and types]. Explain the cause simply, then give me the corrected formula and two cases to test that the problem won’t recur."),
    tip: L("الصق ٣–٥ صفوف عينة (بلا بيانات حساسة) مع المعادلة.", "Paste 3–5 sample rows (no sensitive data) with the formula.") });
  P({ id: "u1-p-explain-formula", lesson: "u1-excel", pages: [13], src: "add", cat: "learn", icon: "🔍",
    title: L("اشرح لي معادلة موروثة", "Explain an inherited formula"),
    goal: L("فهم معادلة طويلة كتبها غيرك قبل أن تعدلها.", "Understand a long formula someone else wrote before editing it."),
    text: L("اشرح لي هذه المعادلة جزءًا جزءًا بلغة بسيطة لشخص غير متخصص: [الصق المعادلة]. ما الذي يحسبه كل جزء؟ وما الحالات التي قد تعطي فيها نتيجة غير متوقعة؟ وهل يمكن تبسيطها دون تغيير النتيجة؟", "Explain this formula piece by piece in plain language for a non-specialist: [paste the formula]. What does each part compute? In what cases might it give an unexpected result? Can it be simplified without changing the result?"),
    tip: L("لا تعدّل معادلة لا تفهمها: هذا أول اختبار للفهم.", "Don’t edit a formula you don’t understand: this is the first test of understanding.") });
  P({ id: "u1-p-code-example", lesson: "u1-macro", pages: [14], cat: "automate", icon: "🧹",
    title: L("مثال تطبيقي كامل: تنظيف وتلخيص", "A complete worked example: clean and summarise"),
    goal: L("كود ماكرو ينظف البيانات الخام وينشئ ملخصًا لكل إدارة.", "A macro that cleans raw data and builds a per-department summary."),
    text: L("عندي ملف إكسل فيه ورقة اسمها «البيانات الخام». أريد كودًا يحذف الصفوف الفارغة، ويوحد تنسيق التاريخ، ويحذف التكرار بناءً على رقم الموظف، ثم ينشئ ورقة جديدة اسمها «التقرير» ويضع فيها ملخصًا لكل إدارة. اكتب الكود كاملًا، واشرح أين أضعه وكيف أشغله خطوة بخطوة.", "I have an Excel file with a sheet called “Raw Data”. I want code that deletes empty rows, unifies the date format, removes duplicates based on employee number, then creates a new sheet called “Report” with a summary per department. Write the complete code and explain where to put it and how to run it step by step."),
    tip: L("الخطوات: تبويب المطور ← محرر الكود ← إدراج وحدة ← لصق ← حفظ بصيغة ماكرو ← تشغيل. وعلى نسخة!", "Steps: Developer tab → code editor → insert module → paste → save as macro-enabled → run. On a copy!") });
  P({ id: "u1-p-golden-code", lesson: "u1-macro", pages: [14], cat: "automate", icon: "🏆",
    title: L("البرومبت الذهبي للكود", "The golden code prompt"),
    goal: L("كود يعمل على ملفك الحقيقي دون افتراضات، ودون إتلاف البيانات، ومع اختبارات.", "Code that runs on your real file without assumptions, without damaging data, with tests."),
    text: L("أنت خبير أتمتة إكسل. هذه هي بنية الملف: [صف الأوراق والأعمدة بأسمائها الحقيقية]. وهذه هي المهمة التي أنفذها يدويًا اليوم: [صف الخطوات بالترتيب]. وهذه هي النتيجة النهائية التي أريدها: [صف المخرج]. اكتب الكود الذي ينفذها بالكامل. لا تفترض أسماء أوراق أو أعمدة غير موجودة. تعامل مع الصفوف الفارغة والأخطاء والبيانات الناقصة. لا تحذف البيانات الأصلية. اشرح أين أضع الكود وكيف أشغله خطوة بخطوة لشخص لا يعرف البرمجة. ثم أعطني خمس حالات أختبر بها الكود قبل استخدامه على الملف الحقيقي.", "You are an Excel automation expert. This is the file’s structure: [describe the sheets and columns by their real names]. This is the task I perform manually today: [describe the steps in order]. This is the final result I want: [describe the output]. Write the code that performs it completely. Don’t assume sheet or column names that don’t exist. Handle empty rows, errors and missing data. Don’t delete the original data. Explain where to put the code and how to run it step by step for someone who can’t program. Then give me five cases to test the code before using it on the real file."),
    tip: L("كل سطر يمنع نوع فشل معروف؛ لا تحذف أي سطر لتختصر.", "Each line prevents a known failure type; don’t drop any line to shorten it.") });
  P({ id: "u1-p-explain-code", lesson: "u1-macro", pages: [14], src: "add", cat: "learn", icon: "📖",
    title: L("اشرح الكود قبل تشغيله", "Explain the code before running it"),
    goal: L("معرفة ما سيفعله الكود ببياناتك قبل الضغط على «تشغيل».", "Know what the code will do to your data before pressing “run”."),
    text: L("قبل أن أشغّل هذا الكود: [الصق الكود]، اشرحه لي سطرًا سطرًا بلغة بسيطة. وحدّد بوضوح: أي سطر يحذف أو يعدّل بيانات؟ وما الذي سيحدث لو كانت الورقة المطلوبة غير موجودة؟ وهل يلمس الكود أي ملف غير الملف المفتوح؟", "Before I run this code: [paste the code], explain it line by line in plain language. Clearly state: which line deletes or changes data? What happens if the required sheet doesn’t exist? Does the code touch any file other than the open one?"),
    tip: L("قاعدة أمان: لا تشغّل كودًا لا تعرف ما يحذفه.", "Safety rule: never run code when you don’t know what it deletes.") });
  P({ id: "u1-p-story", lesson: "u1-present", pages: [14], cat: "work", icon: "🎬",
    title: L("برومبت بناء قصة العرض", "The story-building prompt"),
    goal: L("رسالة واحدة وثلاث أفكار وترتيب شرائح وما يُحذف، لعرض مدته خمس دقائق.", "One message, three ideas, slide order and what to cut, for a five-minute deck."),
    text: L("هذا هو التقرير النهائي: [الصق التقرير]. الجمهور هو [حدد الجمهور]، والقرار المطلوب منه هو [حدد القرار]، والوقت المتاح خمس دقائق. ابنِ لي قصة العرض: الرسالة الواحدة الأساسية، وأهم ثلاث أفكار تدعمها، وترتيب الشرائح، والرسم المناسب لكل رقم، وما الذي يجب حذفه لأنه لا يخدم القرار. ثم اكتب عنوان كل شريحة وجملتها الأساسية.", "Here is the final report: [paste the report]. The audience is [define the audience], the decision required of them is [define the decision], and the time available is five minutes. Build me the presentation story: the single core message, the top three ideas that support it, the slide order, the right chart for each number, and what must be cut because it doesn’t serve the decision. Then write each slide’s title and key sentence."),
    tip: L("أهم ما في الرد قائمة «ما يجب حذفه».", "The most valuable part of the reply is the “what to cut” list.") });
  P({ id: "u1-p-review-deck", lesson: "u1-present", pages: [14], cat: "work", icon: "👔",
    title: L("مراجعة العرض قبل التقديم", "Reviewing the deck before presenting"),
    goal: L("اختبار العرض بعين مدير لم يرَ الملف ولديه خمس دقائق.", "Test the deck through the eyes of a manager with five minutes who hasn’t seen the file."),
    text: L("راجع هذا العرض بعين مدير لم يرَ الملف من قبل ولديه خمس دقائق فقط: هل الرسالة الأساسية واضحة في أول ثلاثين ثانية؟ وما الشرائح التي لا تضيف شيئًا ويمكن حذفها؟ وما الأسئلة التي سيطرحها المدير ولا يجيب عنها العرض حاليًا؟ وهل ينتهي العرض بقرار واضح أم بمجرد ملخص؟", "Review this presentation through the eyes of a manager who has never seen the file and has only five minutes: is the core message clear in the first thirty seconds? Which slides add nothing and can be removed? What questions will the manager ask that the deck doesn’t answer? Does it end with a clear decision or just a summary?"),
    tip: L("أضف إجابات «أسئلة المدير» في شريحة احتياطية بعد النهاية.", "Put answers to “the manager’s questions” in a backup slide after the end.") });
})();
