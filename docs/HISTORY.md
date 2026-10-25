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
| Lessons | 59, each at four levels |
| Story decks | 23 (12 slides each): all of units 1, 2 and 3, and unit 4's opening story |
| Animated scenes | 35 |
| Labs | 14 (8 real calculations, 6 simulations) |
| Prompts | 122 |
| Questions | 118 |
| Glossary terms | 83 |
| File size | about 7 MB, zero network requests |

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

## Unit 2: Excel automation, one project per lesson
Unit 2 unfolds lesson f8 into a ladder of eight projects in one TV factory (no factory is named). Each lesson has its own
12-slide story and its own zip, `Lesson_N_<Name>.zip`: a Data folder of Excel files, always in English like the factory's
own files, and README, Prompt and answer key in the reader's language (`data/xl-sample.js`). Each project adds one idea:
the three tools of f8 come one at a time, and purchasing and materials, the second example, get two tools of their own.

| # | Lesson | Project | Deck question |
|---|---|---|---|
| 1 | x1 Before any tool: describe the file | a data dictionary for one weekly report | «النموذج ما شافش ملفي… أوصفه له إزاي؟» |
| 2 | x2 A first tool: from the chat to your laptop | a read-only file list (a lock file, a second sheet) | «الكود في الشات… يبقى أداة على جهازي إزاي؟» |
| 3 | x3 Tool one: 13 weekly reports into one table | stacking: a Total row, duplicates, another column order, a renamed column | «إزاي ١٣ تقرير إنتاج يبقوا جدول واحد من غير ولا صف ضايع؟» |
| 4 | x4 Tool two: every code finds its name and cost | lookups: spaced and lower-case codes, a new model, a code listed twice | «إزاي كل كود يلاقي اسمه، واللي ما لقاش يبان؟» |
| 5 | x5 Tool three: output against plan | a line with no plan, a plan with no output, negative corrections | «إزاي التقرير يطلع مظبوط ومراجَع من غير ما ألمسه؟» |
| 6 | x7 Tool four: purchase orders against receipts | a key of two columns, many receipts per line, a 2% tolerance | «كل أمر شراء وصل منه قد إيه، لو السطر بيوصل على كذا دفعة؟» |
| 7 | x8 Tool five: from the plan to the materials order | plan × BOM − stock, rounded up to the pack; a model with no BOM, screws in boxes | «من خطة الإنتاج… نطلب إيه وقد إيه؟» |
| 8 | x6 When the tool stops: next month's files | April's files through lesson 3's tool: a new column, text dates, Sheet1, an empty week | «لما الأداة توقف أو تغلط… أعمل إيه؟» |

The former unit 2 (b1, y4, p9, w1, m1) opens unit 3, ahead of the Office lessons. f8's closing slide now leads into unit 2,
and x6's into b1 («فاكر ملف الربع…»). Course plan 3 clears the old unit 2 and 3 quiz scores once; plan 4 clears unit 2's once more for its new questions.

## Unit 3: Office automation at scale (October)
Unit 3 now holds six lessons built like unit 2, in the same factory, each with its own 12-slide story. Two big examples
download complete (`data/office-projects.js`), and the last two lessons make the work repeat:

| # | Lesson | Download | Deck question |
|---|---|---|---|
| 1 | a1 Example 1: 13 weekly exports into one table with names | `Unit3_Example_1_Production_Dashboard.zip` | «إزاي ١٣ تصدير من النظام يبقوا جدول واحد بالأسماء؟» |
| 2 | a2 Example 1: pivot tables, a report and a dashboard with slicers | (the same zip, Prompt_2) | «إزاي الجدول يبقى داشبورد يتفهم في دقيقة ويتحدّث لوحده؟» |
| 3 | a3 Example 2: Excel, PDF and Word into one data table | `Unit3_Example_2_Commercial_Review.zip` | «إزاي أرقام في ٣ أشكال يبقوا جدول بيانات واحد أثق فيه؟» |
| 4 | a4 Example 2: from the database to a report, charts and a PowerPoint deck | (the same zip, Prompt_2) | «إزاي جدول البيانات يبقى عرض باوربوينت جاهز، وكل رقم فيه مظبوط؟» |
| 5 | a5 Claude Code in detail: web and PC, abilities, models and levels of thinking | — | «إمتى أستخدم Claude Code، وفين، وبأنهي موديل ومستوى تفكير؟» |
| 6 | a6 Skills: work that succeeded repeats with one command | `Unit3_Skills_Kit.zip` | «إزاي الشغل اللي نجح مرة يتكرر بنفس الجودة كل مرة؟» |

The kit writes real PDFs and Word files in the page, and a data test reads them back. Unit 2 now ends on the
dashboard question; unit 3 ends on the file bigger than Excel, and the former unit 3 (b1 …) opens unit 4. Course plan 5
clears the old unit 3 and 4 quiz scores once.

## Unit 3, simplified (October)
The old Claude Code basics lesson (w2) left unit 4: its book points now sit in a5 and a6, and its two quiz questions and
prompts moved to a5. Both unit-3 examples were rebuilt clean, on request, so the lessons teach the method itself: 13
weekly reports with the same columns are stacked into one big sheet, two columns are added with VLOOKUP (the model name
and the country name, from a two-column Masters file), and the sheet becomes pivot tables, a report, charts and a
dashboard. Example 2 gathers three branch workbooks, six one-table PDFs and two Word memos into Sales (with the same two
VLOOKUPs), Shipments, Returns and Targets, checks shipped against sold, and ends in an 8-slide deck. Each download now
holds its finished result in `Final_Result/` so learners can see the end before and after they build; the files are built
by `academy/tools/make-finals.py`. Decks a1–a4, their drawings, questions and summaries were rewritten for the new figures.

