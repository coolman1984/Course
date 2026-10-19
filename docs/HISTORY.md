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

## 6. Unit 2's opening story (17 October)
- Lesson b1 and its 12-slide deck (`big-story.js`, drawings `b_*`) follow the unit-1 hero from the file that froze Excel
  to one checked table. The deck covers the template, stacking with a source column, quality checks, cleaning by written
  rules, linking with an "unmatched" sheet, moving heavy work outside Excel, the project folder, the editor, model
  levels and reconciliation. It ends on the question that opens unit 3. A ready prompt and two questions come with it.

## The site today
| | |
|---|---|
| Units | 8 |
| Lessons | 51, each at four levels |
| Story decks | 15 (12 slides each): all of units 1 and 2, and unit 3's opening story |
| Animated scenes | 35 |
| Labs | 14 (8 real calculations, 6 simulations) |
| Prompts | 113 |
| Questions | 102 |
| Glossary terms | 76 |
| File size | about 6.2 MB, zero network requests |

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

Unit 2 opens with lesson b1 «من ملفات كتير لجدول واحد تثق فيه» and its story, under the question «إزاي ٣٧ ملف يبقوا
جدول واحد أقدر أثق فيه؟». Units 3–8 hold the earlier lessons in their new places, and each gets its own opening story next.

## Unit 2: Excel automation in detail
Unit 2 now unfolds lesson f8 into six lessons, each with its own 12-slide story, all built on one sample data kit
(`data/xl-sample.js`): an invented distributor with six branches, 13 weekly sales files, master sheets, targets and ten
planted problems. The kit downloads from the lab as real Excel files.

| # | Lesson | Deck question |
|---|---|---|
| 1 | x1 The sample data kit | «أجرّب الأداة فين قبل ما ألمس ملفات الشركة؟» |
| 2 | x2 From the chat to your laptop (ChatGPT, Gemini Enterprise) | «الكود في الشات… يبقى أداة على جهازي إزاي؟» |
| 3 | x3 Tool one: 13 files into one table | «إزاي ١٣ ملف يبقوا جدول واحد من غير ولا صف ضايع؟» |
| 4 | x4 Tool two: every code finds its name | «إزاي كل كود يلاقي اسمه، واللي ما لقاش يبان؟» |
| 5 | x5 Tool three: sales against targets | «إزاي التقرير يطلع مظبوط ومراجَع من غير ما ألمسه؟» |
| 6 | x6 When the tool stops | «لما الأداة توقف أو تغلط… أعمل إيه؟» |

The former unit 2 (b1, y4, p9, w1, m1) opens unit 3, ahead of the Office lessons. f8's closing slide now leads into unit 2,
and x6's into b1 («فاكر ملف الربع…»). Course plan 3 clears the old unit 2 and 3 quiz scores once.
