# Architecture

> ملخّص بالعربي: الموقع كله ملف HTML واحد بيشتغل من غير إنترنت. المحتوى في ملفات بيانات، والتشغيل في ملفات محرّك،
> وسكريبت بناء واحد بيجمعهم. الملف ده بيشرح كل جزء بيعمل إيه، وإزاي البيانات بتمشي من المصدر لحد الشاشة.

## The one-file principle

`AI_Academy.html` is the whole product: styles, fonts (base64), the 41 book-page images (WebP, base64), all content and
the engine in a single file of about 5.7 MB. It opens from a USB stick or an e-mail attachment with no server and makes
**zero network requests** (an e2e check fails on any request that is not `file:`, `data:` or `blob:`). The same file is
published to GitHub Pages on every merge to `main`.

## Build

`academy/build.mjs` reads two ordered lists and writes the HTML:

| List | What it holds | Order matters because |
|---|---|---|
| `DATA` | `data/*.js` — each file adds to `window.ACADEMY` (`A`) | later files read earlier ones (`course-order.js` sorts `A.lessons` after every lesson file has loaded) |
| `ENGINE` | `engine/*.js` | `core.js` defines helpers (`h`, `ico`, `L`, `t`, `S`, the router) the others use |

During the build it inlines `__FONT:name__` placeholders as `data:font/woff2;base64,…`, inlines the page images, and
injects `src/ai-guide.txt` as `<script type="text/plain" id="ai-guide">` right after `<title>`. That keeps the guide
within the first ~250 characters of the file, so a chat model that reads only the start of a large upload still finds it.
CI fails if the guide moves past character 2000.

## Data model (`window.ACADEMY`)

| Key | File | Notes |
|---|---|---|
| `A.ui` | `data/ui.js` | every interface string, `u(ar, en)` |
| `A.units`, `A.coverage`, `A.labs`, `A.meta.showcase` | `data/meta.js` | eight units; book-page coverage 1–41; the home "before/after" showcase per unit |
| `A.lessons` | `data/lessons-*.js` | one object per lesson (see CLAUDE.md for the fields) |
| `A.courseOrder` | `data/course-order.js` | **the plan**: which lessons each unit holds, in teaching order; sets `unit`, sorts `A.lessons`, computes `unit.bookPages` |
| `A.decks` | `data/*-story.js`, `data/history.js` | 12-slide story decks, each tied to a lesson by `lesson` |
| `A.scenes` | `data/scenes.js` | staged animated diagrams (stages with title, caption, duration; elements with keyframes) |
| `A.prompts`, `A.quiz`, `A.glossary`, `A.compare` | their own files | prompt library, questions, glossary, comparison families |
| `A.plainTalk`, `A.lessonStories` | `plain-talk-a/b.js`, `stories.js` | the plain-language Arabic layer and the short lesson intros |

Lesson ids never change: links (`[[f4]]`), saved progress and the presenter's resume point all key on them. A lesson's
number is its position in `A.courseOrder`, so reordering a unit is a one-line change in the plan.

## Engine

| File | Responsibility |
|---|---|
| `core.js` | state and storage, i18n (`L`, `t`), icons, the app bar, the router (`A.view(name, fn)` + `location.hash`), search palette, reading settings, tour video, boot |
| `render.js` | home, unit, lesson, book map, coverage, learning path, review, glossary, prompts, compare, notebook, labs, project |
| `history.js` | the deck player (`A.mountDeck`) and every deck drawing (`ART.*`) |
| `scene.js` | the scene player (`A.mountScene`): timeline, stages, viewBox zoom, flow dots |
| `labs.js` | the 14 labs (8 real calculations, 6 teaching simulations, each labelled); `xlkit` previews the unit-2 sample kit |
| `xlkit.js` | writes the sample kit (`data/xl-sample.js`) as real `.xlsx` workbooks inside one stored `.zip`, in the page, offline |
| `quiz.js` | unit quizzes, the comprehensive test, mistakes review |
| `tools.js` | knowledge graph and the presenter |
| `motion.js` | page transitions and the home "motion stage" (adapted from transitions.dev under its licence) |

Routes: `home`, `unit-<id>`, `lesson-<id>`, `map`, `coverage`, `path`, `review`, `glossary`, `prompts`, `compare`,
`notebook`, `labs`, `lab-<id>`, `project`, `knowledge`, `quiz[-<unit>|-all|-mistakes]`, `present[-<unit>]`.
Every view registers cleanup with `A.onLeave(fn)`; leaving a page runs it (stops timers, observers and idle work).

## State and storage

Almost all learner state lives in one `localStorage` key, `aiAcademy.v1`: language, theme, level, done/visited lessons, quiz
answers and scores, notes, bookmarks, saved prompts, project answers, reading settings (`view`), presenter settings and
resume points, and `plan` (the course-plan version).

- Writes are debounced (250 ms). A pending write is flushed on `pagehide`, **unless another tab saved in the meantime**
  (the stored text no longer matches what this tab last read or wrote).
- `plan: 2` marks the eight-unit plan. A save from the earlier plan has its per-unit best scores for `u1`–`u5` cleared
  once, because those unit ids now hold different questions.
- `plan: 3` made unit 2 (`u1`) the Excel automation unit and moved its lessons into unit 3 (`u2`): a save from plan 2
  has the `u1` and `u2` best scores cleared once.
- Import/export writes and reads the same object as a JSON file.
- **One setting lives elsewhere:** the site's reduce-motion switch (`engine/motion.js`) is stored under its own key,
  `academy.motion` (`"off"` or `"on"`). It is not part of import/export or `S.reset()`. The operating-system
  reduced-motion preference is honoured either way.

## Story decks

`A.mountDeck(host, deck, opts)` renders a deck: header, a question pill carried through every slide, slides (text +
drawing), a timeline rail, keyboard and swipe navigation, an optional auto-play clock.

- Drawings are built on demand: the slide on screen first, its neighbours at idle, the rest one by one at idle. An
  `alive` flag stops queued idle work once the reader leaves.
- Off-screen decks get `.is-away`, which pauses looping animations.
- With `opts.present` the deck has no chrome of its own and returns `{ n, cur, go(i), destroy() }`, so the presenter
  can drive it.
- Drawings are inline SVG in a 480 × 320 viewBox, mirrored for Arabic with `mx()`/`dirx()`; labels use `--font-art`.

## Scenes

`A.mountScene(host, id, opts)` plays a staged diagram on a timeline. Stepping shows a stage's finished state; play
animates. `playStage(i)` animates one stage and stops at its end (the presenter uses it). The API also exposes
`goto`, `next`, `prev`, `stage`, `count` and `destroy`.

## Presenter

`A.openPresenter(unitId, lessonId?)` opens a full-screen player for one unit. The plan is a list of blocks — unit card,
then per lesson: title card, deck slides, scene stages, an optional question (two steps: ask, reveal) — then the unit
review. Navigation inside a block reuses the mounted deck or scene; crossing a block mounts the next one.

- The frame is laid out at **1600 × 900** and scaled with CSS `zoom`, so a slide looks the same on a laptop and a
  projector. Deck slides show their whole text; the layout was measured so the tallest slide fits (739 of 748 px).
- Keys follow presenter-remote conventions: PageUp/PageDown, arrows, Space/Enter, `B`/`.` black, `W`/`,` white, a number
  + Enter to jump, Home/End, `F`/`F5` full screen, `C` lessons, `L` spotlight, `P` auto-play, `?` shortcuts. On a blank
  screen any key only restores the picture. `Esc` closes a menu first and exits only outside full screen.
- Controls and the cursor fade after 2.6 s idle; a Wake Lock keeps the screen on.
- The resume point is stored as `{ lesson, part, sub-step }`, not an index, so it survives plan changes (questions on
  or off).

## Reading settings

A panel in the app bar sets three attributes on `<html>`: `data-width` (narrow / medium / full), `data-fsize` (four
steps, applied as `zoom` on `#main`) and `data-font`. Fonts:

| Family | Faces | Use |
|---|---|---|
| `UI Latin` | Inter, variable 100–900 | Latin text |
| `UI Sans` | IBM Plex Sans Arabic 400/500/600/700 | Arabic text |
| `UI Symbols` | a 2 KB Inter subset (✓ □ Σ arrows ≈ ≠ …) | symbols missing from the two above |
| `UI Mono` | JetBrains Mono | prompts and code |
| `R Cairo`, `R Tajawal`, `R Almarai`, `R Naskh` | Arabic + Latin, 400/700 | optional reading fonts |

Drawings always use `--font-art` (the default stack), because their labels were measured in it.

## Tests and CI

| Check | What it proves |
|---|---|
| `data.test.mjs` (node --test, 22 tests) | every page mapped, links resolve, prompt variables appear, UI keys exist, Arabic and English carry the same lesson links, the course plan places every lesson once and in order, prerequisites come earlier, decks are wired, no doubled SVG attributes, the AI guide names every unit-1 lesson and deck, the sample kit's quoted figures are recomputed from its files, and unit-2 lessons quote the same figures in both languages |
| `e2e.mjs` (Playwright) | every route in both languages on desktop and phone, no console errors, zero network requests, labs, scenes, quizzes, search, glossary, decks, the upgrade path, reading settings, the presenter |
| `art-check.mjs` | every drawing label inside 480 × 320 and clear of others, in both languages, measured in root SVG coordinates, and drawn in an inlined font (via `CSS.getPlatformFontsForNode`) |

`.github/workflows/academy-pr.yml` runs syntax checks, the build, the AI-guide position check and all three test
suites on every PR. `pages.yml` publishes the HTML, the book and the tour video on merge to `main`.
