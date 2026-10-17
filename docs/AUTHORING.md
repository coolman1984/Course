# Authoring guide

> ملخّص بالعربي: إزاي تضيف درس، أو حكاية، أو رسمة، أو وحدة، من غير ما حاجة تتكسر. خطوات عملية بالترتيب، وقائمة مراجعة
> قبل أي طلب دمج.

## Add a lesson
1. Pick a new id (letter + number, never reused) and add the lesson object to a `data/lessons-*.js` file. Fill in:
   `id, unit, pages, diff, min, related, pre, title, sum, book[], levels{simple, mech, practice, adv}`.
   Add `scene`/`lab` if it has one. Lesson files define only two helpers, so write texts in these forms:
   - `title` and `sum`: plain `{ ar: "…", en: "…" }` objects
   - book points: `bp(page, ar, en)`
   - level entries: `L(kind, ar, en)`, where `kind` is one of `what, why, how, inside, example, apply, mistakes,
     whennot, link`

   `u(ar, en)` exists only in the files that define it (`ui.js`, `meta.js`, prompts and others). Arabic and English
   must say the same thing.
2. Place it in `data/course-order.js` (unit and position). Its `unit` field must match.
3. Add its plain-language entry (9 strings) in `plain-talk-a.js` or `plain-talk-b.js`, and its 7-string intro in
   `stories.js`.
4. Add at least one prompt (`prompts.js`) and one question (`quiz.js`).
5. Map its book pages in `meta.js` coverage.
6. `pre` may only name lessons that come earlier in the course. Put later ones in `related`.

## Add a story deck
1. Create `data/<name>-story.js` that sets `A.<name>Story` with `id`, `lesson`, `kicker`, `title`, `lead`, `question`,
   `finalQuestion`, `answerLabel`, `ideaLabel`, `note` (figures are illustrative), `ui` strings and twelve `slides`.
   Then append it to `A.decks`.
2. Add the file to `DATA` in `build.mjs`, to the data test's list, and to the `node --check` lines in `academy-pr.yml`.
3. Name the deck global in `src/ai-guide.txt` (a test checks it).
4. Each slide has:
   - `year` (a short label), `era` and `title`
   - `story`: two paragraphs
   - `answer`: the rule plus «لأن…»
   - `idea`: one line
   - `art`: a drawing key

## Write a deck
- One hero and one question through every slide. The last slide turns the question to the reader.
- Each slide gives a rule and its reason. Build on earlier decks explicitly («فاكر …؟»).
- Examples come from factory lines, sales branches, finance, HR and quality.
- The whole text appears on the presenter screen, so keep paragraphs as tight as the lesson allows. The presenter frame
  holds about 748 px of text column. `docs/ARCHITECTURE.md` explains how to measure it.

A deck may set `pace: "slow"`. Every entrance then lasts longer and starts 1.7× later (`.aih.slow` in history.css),
so each step of a drawing reads on its own. "Inside the model" uses it.

## Draw a slide
- `ART.<prefix>_<slide>` in `engine/history.js`, viewBox 480 × 320.
- Use `an(kind, delay, extraClasses)` for animated elements. Never add a second `class=` or `style=`.
- Mirror for Arabic with `mx(x)`/`dirx()`. `grow()` mirrors itself, so pass it the LTR x. `txt()` handles RTL.
- Reuse helpers first: `box, chip, txt, person, rowX, chain4, grid, page, check, sheet, xl, digits`.
- No emoji. Use symbols only from the inlined fonts (✓ □ Σ arrows ≈ ≠ and Latin/Arabic text). Draw icons with shapes.
- Run `node academy/test/art-check.mjs --shots <dir>` and look at every slide in both languages.

## Add a unit's opening story
- Attach the deck to the unit's first lesson (or a new first lesson). The presenter picks it up automatically: card,
  deck, scene, question.
- End on a question that the next unit answers.

## Language checklist
- Polished Egyptian Arabic. Grep for the banned list in CLAUDE.md.
- «Prompt» and «Context» stay English. Explain any other term in one line.
- English matches Arabic: same meaning, same figures, same `[[links]]`.

## Before every PR
```bash
node academy/build.mjs
node --test academy/test/data.test.mjs
node academy/test/e2e.mjs
node academy/test/art-check.mjs
```
Commit the rebuilt `AI_Academy.html` with the sources.
