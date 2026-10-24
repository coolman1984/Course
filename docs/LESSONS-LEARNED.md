# Lessons learned

> ملخّص بالعربي: أهم الحاجات اللي اتعلمناها أثناء بناء الأكاديمية، في المحتوى واللغة والرسومات والخطوط والأداء
> والاختبار والمراجعة، علشان أي حد يكمّل ما يقعش في نفس الأخطاء. كل درس هنا جه من مشكلة حقيقية حصلت.

## Teaching and content
- **Order by how the idea builds, not by the book.** Chat, assistants and agents only make sense once the learner knows
  the Context is limited. Moving lessons in the plan, while keeping their ids, fixed the logic without breaking links
  or saved progress.
- **One hero, one question, one rule per slide with its reason.** A deck that follows a single concrete case (a report
  in pounds, a supplier memo, three branch files) teaches better than a list of facts. Reusing a hero across lessons
  makes a unit feel like one story.
- **Close each unit practically and leave a question open.** A practical close plus an open problem gives the next
  unit its opening.
- **Prompts for free chat models should ask questions first** and carry the safety rules inside them: work on copies,
  open files read-only, keep a log, stop with a clear message, always close Excel. The learner may not know to ask.
- **Move everything with a lesson.** When a section moves between lessons, move its book point, scene, quiz question
  and comparison items too, and re-point every `[[link]]` in both languages.
- **Prerequisites must come earlier in the course.** Reordering units silently made some lessons depend on later ones.
  A test now enforces the order.

## Language
- **Register is part of quality.** Cheap or odd images get rejected even when the idea is right. Keep a banned-word list
  (CLAUDE.md) and grep for it before every PR. A stray «البايظة» survived in the README until a later sweep.
- **English must match the Arabic exactly**: meaning, figures and links. Drift happens when one side is reworded and the
  other isn't. A test now compares lesson links per explanation, and a script compared the figures in every deck.
- **Bidirectional text:** a hyphenated model name broke across lines inside Arabic («GPT-» / «4»). A word joiner after
  the hyphen keeps it whole.
- Numbers read more clearly than abbreviated Arabic month names inside drawings.

## Drawings (inline SVG)
- **A second `class` or `style` attribute on an SVG element is silently ignored.** Beams drew grey and lamps black
  because `an()` had already written `class`. Extra classes go in `an()`'s third argument, and a test forbids the pattern.
- **Mirror both or neither.** A background bar drawn at a fixed x, with a fill made by `grow()` (which mirrors), was
  misaligned in Arabic.
- **Measure in the right coordinates.** `getBBox()` ignores ancestor transforms, so rotated stamps and translated groups
  slipped past the first checker. Labels are now mapped through `getScreenCTM()` into root coordinates, with motion
  reduced so they are measured at their final positions.
- **Avoid emoji and symbol glyphs in drawings.** Their width and look depend on the machine. Draw icons with shapes, or
  use a symbol from an inlined font.
- Automatic checks catch what eyes miss, and eyes catch what checks miss (text overflowing its own box). Use both:
  `art-check.mjs`, then a screenshot grid.

## Fonts
- **"It fits on my machine" was a font bug.** Labels fit locally and overflowed on CI. The embedded Inter shared a
  family name with the Arabic faces but declared a different weight range. Chromium groups a family's faces by weight
  descriptors, picked only the Arabic group, and fell back to whatever Latin font the machine had: Inter locally,
  DejaVu Sans on CI, Segoe UI on Windows.
  - Proof: forcing DejaVu locally reproduced CI's exact list of failures.
  - Fix: separate families per script, plus a check that fails on any system font.
- Waiting for `document.fonts.ready` does not help when the face is never used. Ask the browser which font actually
  drew the text (CDP `CSS.getPlatformFontsForNode`).
- Optional reading fonts must not reach drawings. Labels were measured in one font, so drawings use a fixed `--font-art`.
- **Media queries can't use `var()`.** A bulk replace of `1180px` with `var(--wide-w)` broke a breakpoint, and the app
  bar overflowed on phones. Replace inside rule bodies only.

## Performance
- With no GPU, the slide transition was the bottleneck, not the drawings: two full-slide layers composited at once.
  Removing the scale from the keyframes and shortening the outgoing slide helped. Adding `will-change` made software
  compositing *worse*, so it was removed.
- Building all twelve drawings when a lesson opened cost about 25% of opening time. Building on demand fixed it, but
  **idle work must stop when the reader leaves**, or it lands on the next page.
- Measure A/B with repeated runs, because single runs vary by about ±3 fps. CPU throttling (4×) with frame sampling is
  a fair stand-in for a weak laptop.

## Storage and state
- **Reusing ids with a new meaning needs a migration.** Unit ids `u1`–`u5` kept old best scores for unrelated questions.
  A plan version (`plan: 2`) clears them once.
- **A save-on-exit must not overwrite newer data.** Flushing on `pagehide` restored stale state over values another tab
  (or a test) had just written. Now it flushes only a pending change, and only if storage still holds what this tab
  last saw.
- **Save places, not indexes.** The presenter's resume point was an index into a plan whose length changes. It is now
  stored as lesson, part and sub-step.

## Presenter design
- Lay the frame out at a fixed size (1600 × 900) and scale it, rather than make every element responsive. A slide then
  looks the same on any screen.
- Treat remote-control conventions as requirements: PageUp/PageDown, `B`/`.` for black, F5/Esc, and "any key restores
  a blank screen".
- If the whole story must be on screen, measure it: find the tallest slide in each language and size the layout to it.

## Generated files (unit 3)
- **Read what you write.** The kit's PDFs and Word memos are tested by reading them back the way a tool would (the PDF
  bytes, the memo's tables), not only from the generator's own data. Opening them in pdftotext and python-docx once
  caught nothing, which is the point: the test keeps it that way.
- **Count the files, then quote the count.** The commercial example was first described as 13 files; it is 11 sources
  plus Masters. Every figure in a story should come from `expected()`, including how many files there are.
- **Paths in a drawing start with a letter.** A label such as `.claude\skills` or `%USERPROFILE%` starts with a neutral
  character, and in an Arabic drawing the browser moves it. `project\.claude\skills` reads correctly in both languages.
- **The active deck dot widens with its label.** On a 340px phone, a long first-slide label pushed the timeline past
  the screen; keep the first slide's `year` short («الموقف»/Scene), and avoid one long word as an `era`.

## Testing
- **A test that never fails proves nothing.** Reproduce the bug first, show the test failing, then passing with the fix.
  A resume test that passed against the buggy code had to be tightened to compare the exact slide.
- Objects from a `vm` context belong to another realm, so `assert.deepEqual` on their arrays fails. Compare joined
  strings instead.
- Keep the build list and the test's file list in sync. A test fails if a data file is missing from either.

## Reviews
- Treat automated review findings as claims: trace a real path to the failure, fix with a test, reply with the commit,
  resolve. Most were real (stale scores, prerequisites, unblank keys, resume indexes). Answer the rest on the thread
  with the reason.
- Read the CI log before guessing. Every red build in this project had a specific, reproducible cause.
