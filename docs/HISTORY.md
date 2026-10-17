# History

> ملخّص بالعربي: المشروع بدأ ككتيّب للمتدربين، واتحوّل لأكاديمية تفاعلية في ملف واحد، وبعدين اتظبطت لغته، واتبنت
> الوحدة الأولى من جديد بحكايات متحركة، واتنظّم الكورس في تمان وحدات، واتضاف وضع محاضر للقاعة وإعدادات للقراءة.

Dates are 2026. Pull-request numbers are in brackets.

## 1. The reference book (September)
- [#1–#2] The original course material: the 41-page trainee book (an introduction and five guides) and its supporting
  documents. Only the book is kept in this repository today.

## 2. One file, the whole book (13–14 October)
- [#3] The whole book became one offline HTML academy:
  - 41 lessons, each with four explanation levels (simple, how it works, in practice, advanced)
  - animated scenes, labs, a prompt library, a quiz, a glossary, comparisons and case studies
  - integrity tests and phone layout fixes
- [#4] Automatic publishing to GitHub Pages on every merge to `main`.
- [#5] A redesign in a calm product style, with inlined Inter, IBM Plex Sans Arabic and JetBrains Mono (SIL OFL).
- Picture-first Arabic intros for every lesson, and page transitions adapted from transitions.dev under its licence.

## 3. The Arabic voice (15 October)
- [#9] Egyptian colloquial copy across the site.
- [#10–#12] A «شاهد» button that plays a 15-second tour video, plus some branch housekeeping.
- [#13–#15] The first story decks: the history of AI (lesson f1) and «جوّا الموديل» (lesson f2). Also:
  - a reduce-motion switch on every page
  - attention shown as causal (each word looks back, never ahead)
- [#16–#17] Lesson leads rewritten and street-style analogies removed.
- [#18] The register raised across the course to polished, respectful Egyptian Arabic.
- [#19] The Prompt & Context deck. «Prompt» and «Context» stay English terms everywhere.

## 4. Unit 1 rebuilt as a story (16 October)
- [#21] Unit 1 reordered by how the ideas build, not by book order. Two new lessons with decks:
  - «ليه الـ Context محدود؟» (f6)
  - «الشات والذاكرة والوكيل» (f7)

  Slide transitions became lighter. The first Codex finding (an English link pointing at a moved lesson) led to a link
  parity test.
- [#22] The f3 deck «من الملفات للقرار», plus a full wording pass. The context window became «مساحة العمل».
- [#23] The f5 deck «قبل ما تبعت». English was made to match Arabic everywhere, and drawings are now built on demand
  (about 25% faster lesson opening). Idle drawing work now stops when the reader leaves.
- [#24] Lesson f8 «أول أتمتة في حياتك» closes unit 1 with three copy-ready Excel automation prompts and an open question.
  This PR also added:
  - the drawing checker (`art-check.mjs`)
  - the embedded AI guide
  - inlined fonts that render the same on every machine, plus a symbol subset and an Inter family fix
- [#25–#26] The repository was trimmed to the academy, its sources and the reference book. Documentation became technical.

## 5. Eight units and the lecture hall (16 October)
- [#27] The course was reorganised into **eight units**:
  1. Foundations
  2. Big data
  3. Office
  4. PDF files
  5. Dashboards
  6. Small tools
  7. The assistant at work
  8. The big picture

  A plan file (`course-order.js`) now places every lesson. Units list the book pages they draw on. Returning learners
  keep their progress, and only stale per-unit scores are cleared. This PR also added reading settings: content width,
  text size, and four more Arabic reading fonts.
- [#28] The presenter became a full-screen player built for a lecture hall:
  - every lesson's story and scene play in sequence, with the whole story text on screen
  - a USB presenter remote works out of the box (black and white screens, jump to slide)
  - controls hide when idle, the screen stays awake, and the show resumes where it stopped

## The site today
| | |
|---|---|
| Units | 8 |
| Lessons | 44, each at four levels |
| Story decks | 8 (12 slides each, unit 1) |
| Animated scenes | 35 |
| Labs | 13 (7 real calculations, 6 simulations) |
| Prompts | 104 |
| Questions | 88 |
| Glossary terms | 73 |
| File size | about 5.7 MB, zero network requests |

Unit 1 in teaching order:

| # | Lesson | Deck question |
|---|---|---|
| 1 | f1 The story of AI | «هي الآلة تقدر تفكر؟» |
| 2 | f2 Inside the model | «إيه الكلمة الجاية؟» |
| 3 | f4 The Prompt and the Context | «الموديل شايف إيه وإنت بتكلّمه؟» |
| 4 | f6 Why the Context is limited | «ليه نسي اللي قلتهوله في الأول؟» |
| 5 | f7 Chat, memory and agents | «مين يشيل المهمة دي: شات ولا مساعد ولا وكيل؟» |
| 6 | f3 From files to a decision | «إزاي الملفات دي تتحول لقرار؟» |
| 7 | f5 Limits and wise use | «المذكرة دي جاهزة تتبعت؟» |
| 8 | f8 Your first automation | «إمتى الشغل ده يشتغل لوحده؟» |

Units 2–8 hold the earlier lessons in their new places. Each gets its own opening story and new lessons next.
