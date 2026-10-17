# أساسيات الذكاء الاصطناعي في بيئة العمل الحديثة

أكاديمية تفاعلية بالعربي والإنجليزي، في **ملف واحد** (`AI_Academy.html`) بيشتغل من غير إنترنت ومن غير سيرفر، لأي حد في المكتب أو المصنع من غير خلفية برمجية.

**أونلاين:** https://coolman1984.github.io/Course/

## الملفات

| الملف | المحتوى |
|---|---|
| `AI_Academy.html` | الأكاديمية كاملة (بتتبني من `academy/src`) |
| `AI_Essentials_Course_For_Modern_Workspace.pdf` | الكتاب المرجعي |
| `AI_Academy_tour.mp4` | فيديو جولة قصير بيشتغل من زرار «▶ شاهد» |

## التشغيل

افتح `AI_Academy.html` في أي متصفح حديث. لو حطيته جنب ملف الكتاب، زرار «افتح الصفحة في الـPDF» هيفتح الصفحة الأصلية.

## التطوير

المصدر في `academy/src` (المحتوى في `data/`، والتشغيل في `engine/`). القواعد الفنية في `CLAUDE.md`، والتوثيق الكامل في `docs/` (المعمارية، ودليل الكتابة، والتاريخ، والدروس المستفادة).
- البناء: `node academy/build.mjs`
- فحص البيانات: `node --test academy/test/data.test.mjs`
- اختبار المتصفح: `node academy/test/e2e.mjs`
- فحص الرسومات: `node academy/test/art-check.mjs`

الخطوط (Inter وIBM Plex Sans Arabic وJetBrains Mono) مرخصة بـSIL OFL، ونص الرخصة في `academy/src/fonts`. أجزاء من الحركة مكيّفة من [transitions.dev](https://github.com/Jakubantalik/transitions.dev) بترخيصها، مع نسب الفضل إلى Jakub Antalik.
