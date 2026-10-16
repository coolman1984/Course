# History of the AI Academy

> ملخّص بالعربي: المشروع بدأ ككتيّب وسيناريوهات محاضرات، وبعدين اتحوّل لأكاديمية تفاعلية في ملف واحد، وبعدها لغة الموقع
> اتظبطت، والوحدة الأولى اتبنت من جديد على ترتيب منطقي بحكايات، وانتهت بدرس أتمتة عملي ونهاية مفتوحة للمحاضرة التانية.

## Phase 1 — course materials (September 2026)
- PR #1–#2: training form, trainee handbook (the 41-page PDF), trainer Q&A (130 questions), 8 detailed session scripts
  with minute-by-minute plans, training files for a fictional company («شركة الريادة للتوزيع»), written exam and key.

## Phase 2 — the interactive academy (13–14 October)
- PR #3: the whole book as one offline HTML academy: 41 lessons with four explanation levels, animated scenes, labs,
  prompt library, quiz, glossary, comparisons, case studies, integrity tests and mobile fixes.
- PR #4: published to GitHub Pages on every merge to `main`.
- PR #5: redesign in a clean product style; fonts Inter, IBM Plex Sans Arabic, JetBrains Mono (SIL OFL).
- Picture-first Arabic intros for all 41 lessons; motion from transitions.dev (licensed adaptation, credited).

## Phase 3 — the Arabic voice (15 October)
- PR #9: Egyptian colloquial copy across the site.
- PR #10–#12: a «شاهد» button for a 15-second tour video; one-off branch cleanup.
- PR #13–#15: story decks begin — the history of AI (lesson f1) and «جوّا الموديل» (lesson f2); reduce-motion switch on
  every page; attention shown as causal.
- PR #16–#17: the per-lesson «تخيّل الموقف ده» section removed; all lesson leads rewritten; street-style analogies removed.
- PR #18: the register raised across the whole course — polished Egyptian, not street Arabic.
- PR #19 (16 October): the Prompt & Context deck; Prompt and Context kept as English terms course-wide.

## Phase 4 — unit 0 rebuilt as lecture one (16 October)
- PR #20 (a separate «start with AI» page) was closed unmerged at the owner's request.
- PR #21: unit 0 reordered by teaching logic, not book order (Prompt & Context moved to third); two new lessons with
  decks — f6 «ليه الـ Context محدود؟» and f7 «الشات والذاكرة والوكيل» (the chat → agent material moved out of f4);
  smoother transitions; first Codex finding fixed (an English link pointing at the moved lesson).
- PR #22: lesson f3's deck «من الملفات للقرار» (six capabilities on one sales case); a full wording pass after the owner
  objected to «كوم ملفات» — the context window became «مساحة العمل» instead of «الترابيزة», and loose phrases were removed.
- PR #23: lesson f5's deck «قبل ما تبعت: تمان حدود لازم تعرفها»; English made to match Arabic everywhere; drawings built
  on demand (≈25% faster lesson opening); Codex finding fixed (no drawing after leaving a deck).
- This round: lesson f8 «أول أتمتة في حياتك» closes unit 0 with three copy-ready automation prompts built on the
  trainees' real Excel jobs, and a cliffhanger into lecture two; CLAUDE.md, this history, lessons learned, a drawing
  checker, and an AI guide embedded at the top of the HTML.

## Unit 0 today (lecture one)
| # | id | Lesson | Deck question |
|---|----|--------|---------------|
| 1 | f1 | The story of AI | «هي الآلة تقدر تفكر؟» |
| 2 | f2 | Inside the model | «إيه الكلمة الجاية؟» |
| 3 | f4 | The Prompt and the Context | «الموديل شايف إيه وإنت بتكلّمه؟» |
| 4 | f6 | Why the Context is limited | «ليه نسي اللي قلتهوله في الأول؟» |
| 5 | f7 | Chat, memory and agents | «مين يشيل المهمة دي: شات ولا مساعد ولا وكيل؟» |
| 6 | f3 | From files to a decision | «إزاي الملفات دي تتحول لقرار؟» |
| 7 | f5 | Limits and wise use | «المذكرة دي جاهزة تتبعت؟» |
| 8 | f8 | Your first automation | «إمتى الشغل ده يشتغل لوحده؟» → «طب لو البيانات طلعت من إكسل خالص؟» |

## Next
- Lecture two (unit 1): data out of Excel — extraction, SQLite, Python's standard library, the first real tools —
  opening with the problems trainees bring back from the lesson-8 assignment.
- Lectures three to eight: to be redesigned in the same way (logic first, story decks, practical close, cliffhanger).
