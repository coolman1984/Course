# Lessons learned

> ملخّص بالعربي: أهم الحاجات اللي اتعلمناها أثناء بناء الأكاديمية — في المحتوى، واللغة، والرسومات، والأداء، والاختبار،
> وطريقة الشغل — علشان أي حد يكمّل بعدنا ما يقعش في نفس الأخطاء.

## Content and teaching
- **Order by how the idea builds, not by the book.** The book put chat/assistant/agent before the context window's
  limits; trainees can't understand memory or why agents compact until they know the Context is limited. Moving
  lessons (by array order, keeping ids) fixed the logic without breaking links or saved progress.
- **One hero, one question, a rule with its reason.** Decks that follow a single concrete case (a report in pounds, a
  supplier memo, three branch files) teach better than a list of facts. Reusing the same hero across lessons (the sales
  supervisor in f3 and f8) makes the lecture feel like one story.
- **Close each lecture practically and leave a question open.** Unit 0 ends with tools the trainees build on their own
  files and a problem Excel can't solve — the opening of the next lecture.
- **Prompts for free chat models must ask questions first** and carry the safety rules inside them (work on copies,
  read-only, a log, a clear stop, always close Excel), because the trainee may not know to ask for them.
- When a section moves between lessons, move its book point, scene, quiz question and comparison items with it, and
  re-point links (`[[id]]`) in both languages.

## Language
- The owner reads every word. Cheap or odd images («كوم ملفات», «الترابيزة», «إنت إيده») are rejected even when the idea
  is right. Prefer plain, formal Egyptian; keep a banned-word list (see CLAUDE.md) and grep for it before every PR.
- **English must match the Arabic exactly** — meaning, figures and links. Drift happened when Arabic was reworded and
  English wasn't. A test now checks lesson links per explanation; a script compared the figures in every deck.
- Bidirectional text: hyphenated model names broke across lines in Arabic paragraphs («GPT-» / «4»). A word joiner after
  the hyphen (`GPT-⁠4`) keeps them whole.
- Abbreviated Arabic month names were unclear in a drawing; numbers read better.

## Drawings (inline SVG)
- **A second `class` (or `style`) attribute on an SVG element is silently ignored.** Beams rendered grey and lamps black
  because `an()` already wrote `class`. Pass extra classes as `an()`'s third argument; a data test now forbids the pattern.
- Mirroring for Arabic is easy to get half right: a background bar drawn at a fixed x while its fill used `grow()` (which
  mirrors) ended up misaligned in RTL. Either mirror both or neither; check screenshots in both languages.
- Automatic checks catch what eyes miss: `art-check.mjs` measures every label's box (inside 480×320, no overlaps) in
  both languages. Things it caught: labels past the edge, overlapping captions, an emoji whose glyph box spilled out.
- Text-only checks don't catch text overflowing its own box; look at a screenshot grid of all slides as well.

## Performance
- In the cloud container (no GPU) the slide transition was the bottleneck, not the drawings: two full-slide layers
  composited at once. Dropping the scale from the keyframes and shortening the outgoing slide helped measurably; adding
  `will-change` made software compositing *worse*, so it was removed.
- Building all twelve drawings when a lesson opens cost ~25% of opening time. Building on demand (current slide now,
  the rest at idle) fixed it — but **idle work must stop when the reader leaves**, or it lands on the next page (Codex
  caught this; an `alive` flag and an e2e check fixed it).
- Measure A/B with repeated runs; single runs in the container vary by ±3 fps.

## Testing
- Objects created inside a `vm` context are from another realm: `assert.deepEqual` on their arrays fails against local
  arrays. Compare joined strings instead.
- A test that never fails proves nothing: reproduce the bug first (e.g. 12 drawings built after leaving), then show the
  test passing with the fix.
- Keep the build list and the test's file list in sync — a test now fails if a data file is missing from either.

## Working with the owner
- Discuss the idea before building when the owner asks («ندردش الأول»); then build in small, complete steps.
- Report in short Egyptian Arabic for a non-technical reader: what changed, what was checked, what is needed from them.
- «اعمل طلب دمج وادمجه» means: PR, wait for CI and the Codex review, fix real findings with tests, then merge.
