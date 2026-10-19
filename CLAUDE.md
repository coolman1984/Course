# CLAUDE.md — working on this repository

> ملخّص بالعربي: ده دليل فني لأي حد بيطوّر الموقع: بيتبني إزاي، وقواعد الكتابة والرسومات، والاختبارات المطلوبة قبل أي دمج.
> التفاصيل في `docs/`: المعمارية، ودليل الكتابة، والتاريخ، والدروس المستفادة.

## What this is

A bilingual (Arabic/English) course site, **«أساسيات الذكاء الاصطناعي في بيئة العمل الحديثة»**, for learners with no
programming background. The deliverable is **`AI_Academy.html`**: the whole course as one offline HTML file, built from
`academy/src`, next to the reference book PDF.

## Repository layout

```
AI_Academy.html            generated — never hand-edit; rebuild instead
academy/build.mjs          bundles everything into AI_Academy.html (DATA and ENGINE lists name every source file)
academy/src/ai-guide.txt   short guide for an AI reading the HTML; injected at the very top of <head>
academy/src/data/*.js      all content (course-order plan, lessons, decks, prompts, quiz, glossary, plain-language layer, stories, ui,
                           xl-sample.js: the unit-2 projects, one per lesson)
academy/src/engine/*.js    behaviour (core router/search, render, decks in history.js, labs, motion, quiz, tools,
                           xlkit.js: writes each project as real .xlsx files in one .zip per lesson, offline)
academy/src/*.css          styles (styles.css, motion.css, history.css for decks)
academy/src/fonts/         inlined fonts (SIL OFL): Inter («UI Latin»), IBM Plex Sans Arabic («UI Sans»),
                           an Inter symbol subset («UI Symbols»), JetBrains Mono («UI Mono»),
                           reading fonts Cairo, Tajawal, Almarai, Noto Naskh Arabic («R …»)
academy/test/data.test.mjs node --test: data integrity
academy/test/e2e.mjs       Playwright journey over every route, both languages, phone and desktop, offline
academy/test/art-check.mjs every drawing label inside its frame, clear of others, in an inlined font, both languages
.github/workflows/         academy-pr.yml (checks on PRs), pages.yml (publishes on merge to main)
docs/                      ARCHITECTURE, AUTHORING, HISTORY, LESSONS-LEARNED
```

## Build and test (run all before every push)

```bash
node academy/build.mjs                    # writes AI_Academy.html
node --test academy/test/data.test.mjs    # data integrity
node academy/test/e2e.mjs                 # full browser journey (Playwright; Chromium preinstalled in cloud sessions)
node academy/test/art-check.mjs           # drawing labels, every deck, Arabic + English  (--shots dir to save PNGs)
```
Commit the rebuilt `AI_Academy.html` together with source changes. CI runs the same checks.

## Data model (window.ACADEMY, written `A`)

- Every user-facing string is bilingual: `u(ar, en)` / `{ ar, en }`. **Arabic and English must say the same thing,
  with the same figures and the same lesson links** (a data test enforces equal `[[lesson]]` links per explanation).
- A lesson (`A.lessons`): `id, unit, pages, diff, min, scene?, lab?, related, pre, title, sum, book[], levels{simple,
  mech, practice, adv}`. **`data/course-order.js` places every lesson**: its unit and its number (units are shown
  as 1–8, ids `u0`–`u7`; the book is a reference, not the order). Ids never change (links and saved progress depend on
  them); a lesson's `unit` field must match the plan (a data test checks it). Every lesson also needs: an entry in `plain-talk-a/b.js` (9 strings; it replaces the displayed Arabic
  title and summary), a 7-string intro in `stories.js`, at least one prompt and one quiz question, and its book pages in
  `meta.js` coverage. Rich text: `**bold**`, `[[lessonId]]`, `((glossaryId|label))`.
- Unit 0 order today: `f1 f2 f4 f6 f7 f3 f5 f8` (history → inside the model → Prompt & Context → Context limits →
  chat/memory/agents → AI at work → limits → first automation). A data test pins this order; update it deliberately.
- Unit 1 (shown as 2) is f8 in detail, a ladder of projects: `x1 x2 x3 x4 x5 x7 x8 x6` (describe a file → first tool,
  ChatGPT/Gemini delivery → stack → lookups → report → purchase orders vs receipts → materials order from the plan →
  when a tool stops). Also pinned by a data test. Big data (`b1` …) opens unit 2 (shown as 3).
- Unit 2's examples are a TV factory's production lines (purchasing and materials as the second example). Never name
  the factory or a company, and don't discuss personal accounts or what may be uploaded: talk about the automation itself,
  with ChatGPT and Gemini Enterprise side by side.
- Each unit-2 lesson has its own project (`A.xlProjects`, one zip `Lesson_N_<Name>.zip`): Excel files in English only
  (the factory's real files are English), README/Prompt/answer key in the reader's language. Each project adds one idea
  and its own planted problems. Data come from seeded generators; each project's `expected()` holds every figure the
  lessons quote, and a data test recomputes them from the files like a correct tool would. Change a generator only
  together with `expected` and the texts and drawings that quote it.

## Story decks

Each unit-0 and unit-1 lesson, and the first lesson of each later unit (unit 3: `b1`), opens with a 12-slide deck: `academy/src/data/<name>-story.js` registers `A.<name>Story` in `A.decks`
with `lesson: "<id>"`; the player is `A.mountDeck` in `engine/history.js` (one player for all decks).

Writing rules:
- **One hero and one question** carried through every slide; the last slide turns it to the reader (`finalQuestion`).
- Each slide: `year` (short label), `era`, `title`, `story` (2 paragraphs), `answer` (the rule + «لأن…» reason),
  `idea` (one line). Twelve slides, about 7–8 minutes.
- Build on earlier decks explicitly («فاكر …؟») so the unit forms one chain.

Drawing rules (`ART.<prefix>_<slide>` in `engine/history.js`, viewBox 480 × 320):
- `an(kind, delay, extraClasses)` writes **both** `class` and `style`; never add a second `class=` or `style=` to the
  same element — browsers drop the duplicate silently (a data test rejects it). Bars that grow use `grow(x, …)`.
- Mirror for Arabic with `mx(x)` / `dirx()`; `txt()` sets RTL for Arabic; `grow()` mirrors itself (pass LTR x).
- Helpers: `box, chip, txt, person, rowX, chain4, grid, page, check, sheet, xl, digits`. Reuse before adding.
- Avoid emoji and font-dependent glyphs inside SVG; draw icons with shapes.
- After any drawing change run `art-check.mjs` and look at screenshots in both languages.

## Language and style

- Polished, respectful **Egyptian Arabic**: clear, warm, professional. No street slang, no cheap or odd images.
- Never use: «كوم» / «كومة», «ترابيزة» (the context window is **«مساحة العمل»**), «بيلف / لفّات» (use «بيكرر الخطوات»),
  «إنت إيده» (use «التنفيذ لسه عليك»), «ببلاش», «بايظ / يبوّظ», «حشو», «تايه», «قعدة», «العين التعبانة», «من دماغه»,
  «متألّف», «Context نضيف». When unsure, choose the plainer, more formal Egyptian word.
- Keep **Prompt** and **Context** as English terms (course-wide decision). Explain any other term in one line.
- Examples come from the learners' world: factory lines, sales branches, finance, HR, quality. Figures are illustrative
  and say so (`note` on each deck).

## Performance rules

- Slide transitions animate transform and opacity only; the outgoing slide is short (0.3 s).
- Deck drawings are built on demand (current slide now, neighbours and the rest at idle) and never after the reader
  leaves (`alive` flag). Off-screen decks pause looping animations (`.aih.is-away`).
- Measure before claiming: Playwright + CDP CPU throttling (4×) and rAF frame sampling; compare A/B builds with
  repeated runs — a machine without a GPU makes desktop compositing numbers pessimistic.

## Presenter and reading settings

- The presenter (`engine/tools.js`) plays a unit as chapters: card → deck → scene stages → optional question. Its frame is
  laid out at 1600 × 900 and scaled; deck slides show their **whole** text, so keep new story text within the measured
  limit (see docs/ARCHITECTURE.md). Remote keys, blank screens, resume by (lesson, part, sub-step) are covered by e2e.
- Reading settings set `data-width`, `data-fsize`, `data-font` on `<html>`. Drawings always use `--font-art`.

## Pull requests

- Work on a branch; open a PR to `main`.
- CI (`Check academy changes`) and a Codex review run on every PR. Treat Codex findings as claims: reproduce, fix with a
  test, reply on the thread with the commit, resolve. Merge when CI is green and threads are resolved.
- After a merge, restart the branch from `origin/main` for the next piece of work.

## Known pitfalls

- A second `class` or `style` attribute on an SVG element is silently ignored (see the drawing rules).
- Mirroring: if a fill uses `grow()` (which mirrors), its background bar must be mirrored too.
- Fonts: faces that share a family name must not mix weight descriptors (a 100–900 range next to fixed weights), or
  Chromium ignores some of them and falls back to system fonts. Keep Latin, Arabic and symbols in separate families.
- Bidirectional text: a word joiner after a hyphen (`GPT-⁠4`) keeps model names whole in Arabic paragraphs.
- Objects created inside a `vm` context belong to another realm; compare joined strings, not `deepEqual` on arrays.
- Idle work scheduled by a deck must stop when the reader leaves (`alive` flag), or it lands on the next page.
- A test that never fails proves nothing: reproduce the bug first, then show the test passing with the fix.
