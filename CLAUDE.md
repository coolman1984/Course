# CLAUDE.md — working on this repository

> ملخّص بالعربي: ده دليل أي مساعد ذكي (أو مطوّر) بيشتغل على المشروع. فيه المشروع بيتبني إزاي، وقواعد الأسلوب واللغة،
> وإزاي تضيف درس أو حكاية، والاختبارات المطلوبة قبل أي دمج. التاريخ في `docs/HISTORY.md` والدروس المستفادة في
> `docs/LESSONS-LEARNED.md`.

## What this is

An internal company course, **«أساسيات الذكاء الاصطناعي في بيئة العمل الحديثة»** (AI essentials for the modern workplace),
by Mohamed Fawzy, for office and factory staff with no programming background. It is taught live as **8 lectures**. The
main deliverable is **`AI_Academy.html`**: the whole course as one offline HTML file (also published to GitHub Pages:
https://coolman1984.github.io/Course/). Other folders hold the original book PDF, trainer scripts, exams and training files.

The owner's direction (October 2026):
- The site is organised as **8 units = 8 lectures**. Unit 0 is lecture one and is complete (8 lessons).
- **Teaching logic beats book order.** The book is a reference, not the structure. Lessons are ordered by how the idea
  builds in a trainee's head on stage, and new lessons are added freely.
- **Every lecture ends strongly**, like a series episode: a practical close and a cliffhanger into the next lecture.
  Unit 0 ends with lesson f8 (first Excel automation) and the question «طب لو البيانات طلعت من إكسل خالص؟»; unit 1
  (lecture two) is planned around data extraction from Excel, SQLite and Python's standard library, and first tools.
- Trainees mostly use **free chat models** on **locked company laptops**: allowed are Excel macros (VBA), PowerShell
  (including driving Excel through COM) and the official Python **without extra libraries**. Nothing can be installed.

## Repository layout

```
AI_Academy.html            generated — never hand-edit; rebuild instead
academy/build.mjs          bundles everything into AI_Academy.html (DATA and ENGINE lists name every source file)
academy/src/ai-guide.txt   short guide for an AI reading the HTML; injected at the very top of <head>
academy/src/data/*.js      all content (lessons, decks, prompts, quiz, glossary, plain-language layer, stories, ui)
academy/src/engine/*.js    behaviour (core router/search, render, decks in history.js, labs, motion, quiz, tools)
academy/src/*.css          styles (styles.css, motion.css, history.css for decks)
academy/test/data.test.mjs node --test: data integrity
academy/test/e2e.mjs       Playwright journey over every route, both languages, phone and desktop, offline
academy/test/art-check.mjs every drawing label inside its frame and clear of others, both languages
.github/workflows/         academy-pr.yml (checks on PRs), pages.yml (publishes on merge to main)
docs/HISTORY.md, docs/LESSONS-LEARNED.md
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
  mech, practice, adv}`. Its **order in the array is its number** in the unit; ids never change (links and saved progress
  depend on them). Every lesson also needs: an entry in `plain-talk-a/b.js` (9 strings; it replaces the displayed Arabic
  title and summary), a 7-string intro in `stories.js`, at least one prompt and one quiz question, and its book pages in
  `meta.js` coverage. Rich text: `**bold**`, `[[lessonId]]`, `((glossaryId|label))`.
- Unit 0 order today: `f1 f2 f4 f6 f7 f3 f5 f8` (history → inside the model → Prompt & Context → Context limits →
  chat/memory/agents → AI at work → limits → first automation). A data test pins this order; update it deliberately.

## Story decks (the signature of unit 0)

Each unit-0 lesson opens with a 12-slide deck: `academy/src/data/<name>-story.js` registers `A.<name>Story` in `A.decks`
with `lesson: "<id>"`; the player is `A.mountDeck` in `engine/history.js` (one player for all decks).

Writing rules:
- **One hero and one question** carried through every slide; the last slide turns it to the reader (`finalQuestion`).
- Each slide: `year` (short label), `era`, `title`, `story` (2 paragraphs), `answer` (the rule + «لأن…» reason),
  `idea` (one line). Twelve slides, about 7–8 minutes.
- Build on earlier decks explicitly («فاكر …؟») so the lecture forms one chain.

Drawing rules (`ART.<prefix>_<slide>` in `engine/history.js`, viewBox 480 × 320):
- `an(kind, delay, extraClasses)` writes **both** `class` and `style`; never add a second `class=` or `style=` to the
  same element — browsers drop the duplicate silently (a data test rejects it). Bars that grow use `grow(x, …)`.
- Mirror for Arabic with `mx(x)` / `dirx()`; `txt()` sets RTL for Arabic; `grow()` mirrors itself (pass LTR x).
- Helpers: `box, chip, txt, person, rowX, chain4, grid, page, check, sheet, xl, digits`. Reuse before adding.
- Avoid emoji and font-dependent glyphs inside SVG; draw icons with shapes.
- After any drawing change run `art-check.mjs` and look at screenshots in both languages.

## Language and style (non-negotiable — the owner reviews wording closely)

- Polished, respectful **Egyptian Arabic**: clear, warm, professional. No street slang, no cheap or odd images.
- Never use: «كوم» / «كومة», «ترابيزة» (the context window is **«مساحة العمل»**), «بيلف / لفّات» (use «بيكرر الخطوات»),
  «إنت إيده» (use «التنفيذ لسه عليك»), «ببلاش», «بايظ / يبوّظ», «حشو», «تايه», «قعدة», «العين التعبانة», «من دماغه»,
  «متألّف», «Context نضيف». When unsure, choose the plainer, more formal Egyptian word.
- Keep **Prompt** and **Context** as English terms (course-wide decision). Explain any other term in one line.
- Examples come from the trainees' world: factory lines, sales branches, finance, HR, quality. Figures are illustrative
  and say so (`note` on each deck).
- Replies to the owner in chat: short, Egyptian Arabic, non-technical, with emoji, no English words mixed in.

## Performance rules

- Slide transitions animate transform and opacity only; the outgoing slide is short (0.3 s).
- Deck drawings are built on demand (current slide now, neighbours and the rest at idle) and never after the reader
  leaves (`alive` flag). Off-screen decks pause looping animations (`.aih.is-away`).
- Measure before claiming: Playwright + CDP CPU throttling (4×) and rAF frame sampling; compare A/B builds with
  repeated runs — the cloud container has no GPU, so desktop compositing numbers are pessimistic.

## Pull requests

- Work on the session branch; open a PR to `main` only when asked; the owner usually says «اعمل طلب دمج وادمجه».
- CI (`Check academy changes`) and a Codex review run on every PR. Treat Codex findings as claims: reproduce, fix with a
  test, reply on the thread with the commit, resolve. Merge when CI is green and threads are resolved.
- After a merge, restart the branch from `origin/main` for the next piece of work.
