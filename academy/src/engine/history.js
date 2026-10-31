/* The story of AI — a slide deck at the top of the first lesson.
   One hero carries the whole deck: the question pill above the stage stays put while the slides change under it,
   each slide answers it for its era, and the last slide turns it into «إنت هتشتغل معاها إزاي؟».
   Every drawing is inline SVG built here (offline, themeable, crisp at any size); its entrance animations are CSS
   and only run on the active slide. Nothing plays by itself: the reader drives it (buttons, timeline, arrow keys,
   swipe) or presses Play. Reduced motion and the academy's own "quiet" switch show every drawing in its final state. */
"use strict";
(function (A) {
  const doc = document;
  const esc = A.esc;
  const L = (o) => A.L(o);
  const ar = () => A.lang() === "ar";
  const quiet = () => (A.motion && A.motion.quiet ? A.motion.quiet() : A.reduceMotion());

  /* ---------- drawing helpers (viewBox 480 × 320) ---------- */
  const an = (kind, d, extra = "") => `class="an ${kind}${extra ? " " + extra : ""}" style="--d:${d}s"`;  // pass the element's own classes as `extra`: one class attribute per element
  const txt = (x, y, s, cls, size = 14, more = "") =>   // Arabic labels get an explicit rtl base direction so mixed Arabic/English words keep their order
    `<text x="${x}" y="${y}" class="${cls}" font-size="${size}" text-anchor="middle"${ar() && !/direction=/.test(more) ? ' direction="rtl"' : ""} ${more}>${esc(s)}</text>`;
  const person = (x, y, s = 1, cls = "f-ink2") =>
    `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-34" r="11" class="${cls}"/><path d="M-17 0q0-20 17-20t17 20z" class="${cls}"/></g>`;

  const ART = {
    turing: () => `
      <rect x="40" y="40" width="400" height="236" rx="18" class="f-s2 s-line"/>
      <path ${an("draw", 0.1, "s-line2 dash-curtain")} pathLength="1" d="M240 52 C232 92 248 132 240 172 C232 212 248 248 240 266" fill="none" stroke-width="3"/>
      <g ${an("rise", 0.25)}>${person(140, 170, 1.25)}${txt(140, 196, ar() ? "إنسان؟" : "Human?", "t-ink2", 14)}</g>
      <g ${an("rise", 0.4)}><rect x="300" y="104" width="78" height="56" rx="8" class="f-s1 s-ink2" stroke-width="2.5"/><rect x="310" y="114" width="58" height="34" rx="3" class="f-acc-soft"/><rect x="326" y="160" width="26" height="10" class="f-ink2"/><rect x="314" y="170" width="50" height="5" rx="2.5" class="f-ink2"/>${txt(339, 196, ar() ? "آلة؟" : "Machine?", "t-ink2", 14)}</g>
      <g ${an("pop", 0.7)}><rect x="176" y="214" width="128" height="40" rx="20" class="f-acc"/>${txt(240, 240, "?", "t-white", 22, 'font-weight="700"')}</g>
      <g ${an("pop", 0.95, "blink")}><rect x="78" y="70" width="84" height="26" rx="13" class="f-s1 s-line2"/><circle cx="104" cy="83" r="3" class="f-ink3"/><circle cx="120" cy="83" r="3" class="f-ink3"/><circle cx="136" cy="83" r="3" class="f-ink3"/></g>
      <g ${an("pop", 1.15, "blink b2")}><rect x="318" y="70" width="84" height="26" rx="13" class="f-s1 s-line2"/><circle cx="344" cy="83" r="3" class="f-ink3"/><circle cx="360" cy="83" r="3" class="f-ink3"/><circle cx="376" cy="83" r="3" class="f-ink3"/></g>`,
    dartmouth: () => `
      <g ${an("rise", 0.05)}><circle cx="404" cy="70" r="26" class="f-amber"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<line x1="404" y1="70" x2="${404 + 40 * Math.cos(a * Math.PI / 180)}" y2="${70 + 40 * Math.sin(a * Math.PI / 180)}" class="s-amber" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 30" stroke-dashoffset="-30"/>`).join("")}</g>
      <g ${an("rise", 0.15)}><rect x="70" y="52" width="290" height="150" rx="10" class="f-board"/><rect x="70" y="52" width="290" height="150" rx="10" class="s-ink2" fill="none" stroke-width="5"/></g>
      <text x="215" y="118" class="t-chalk an type" style="--d:.55s" font-size="25" text-anchor="middle" font-weight="600" direction="ltr">Artificial</text>
      <text x="215" y="150" class="t-chalk an type" style="--d:.95s" font-size="25" text-anchor="middle" font-weight="600" direction="ltr">Intelligence</text>
      <path ${an("draw", 1.35, "s-chalk")} pathLength="1" d="M128 166 Q215 178 302 164" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="96" y="238" width="290" height="14" rx="7" class="f-ink3"/>
      ${[130, 196, 262, 328].map((x, i) => `<g ${an("rise", 0.35 + i * 0.12)}>${person(x, 236, 0.9, i === 1 ? "f-acc" : "f-ink2")}</g>`).join("")}
      ${txt(404, 128, ar() ? "صيف ١٩٥٦" : "Summer 1956", "t-ink2", 14, 'font-weight="600"')}`,
    perceptron: () => {
      const ins = [80, 132, 184, 236], cx = 300, cy = 158;
      return `
      ${ins.map((y, i) => `<path ${an("draw", 0.15 + i * 0.1, `s-acc w${i}`)} pathLength="1" d="M92 ${y} L${cx - 46} ${cy}" fill="none" stroke-linecap="round"/>`).join("")}
      ${ins.map((y, i) => `<circle ${an("pop", 0.05 + i * 0.08, "f-s1 s-ink2")} cx="78" cy="${y}" r="14" stroke-width="2.5"/>`).join("")}
      ${ins.map((y, i) => `<circle ${an("travel", 0.9 + i * 0.18, "f-acc")} r="5"><animateMotion dur="2.4s" begin="indefinite" repeatCount="indefinite" path="M92 ${y} L${cx - 46} ${cy}"/></circle>`).join("")}
      <circle ${an("pop", 0.55, "f-acc-soft s-acc")} cx="${cx}" cy="${cy}" r="46" stroke-width="3"/>
      <text x="${cx}" y="${cy + 9}" class="t-acc an pop" style="--d:.7s" font-size="28" text-anchor="middle" font-weight="700">Σ</text>
      <path ${an("draw", 0.85, "s-ink2")} pathLength="1" d="M${cx + 46} ${cy} L410 ${cy}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.25)}><circle cx="432" cy="${cy}" r="18" class="f-mint"/><path d="M424 ${cy} l6 6 l11 -12" class="s-white" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
      ${txt(78, 280, ar() ? "أمثلة" : "examples", "t-ink3", 13)}${txt(300, 236, ar() ? "أوزان بتتعدّل" : "weights adjust", "t-ink3", 13)}`;
    },
    eliza: () => `
      <g ${an("rise", 0.05)}><rect x="92" y="34" width="296" height="214" rx="26" class="f-ink2"/><rect x="112" y="54" width="256" height="166" rx="14" class="f-crt"/><rect x="200" y="248" width="80" height="22" class="f-ink2"/><rect x="160" y="270" width="160" height="12" rx="6" class="f-ink3"/></g>
      <text x="128" y="92" class="t-crt an type" style="--d:.45s" font-size="15" direction="ltr" font-family="var(--font-mono)">&gt; I feel tired today.</text>
      <text x="128" y="124" class="t-crt2 an type" style="--d:1.25s" font-size="15" direction="ltr" font-family="var(--font-mono)">ELIZA: Why do you</text>
      <text x="128" y="146" class="t-crt2 an type" style="--d:1.75s" font-size="15" direction="ltr" font-family="var(--font-mono)">feel tired today?</text>
      <text x="128" y="182" class="t-crt an type" style="--d:2.45s" font-size="15" direction="ltr" font-family="var(--font-mono)">&gt; You understand me!</text>
      <rect ${an("fade", 2.9, "blink f-crt-ink")} x="128" y="194" width="10" height="16"/>`,
    winter: () => `
      ${[0, 1, 2].map((i) => `<g transform="rotate(${-6 + i * 6} 240 160)"><g ${an("rise", 0.1 + i * 0.15)}><rect x="${150 + i * 6}" y="${70 + i * 26}" width="180" height="96" rx="10" class="f-s1 s-line2" stroke-width="2"/>
        <text x="${168 + i * 6}" y="${104 + i * 26}" class="t-acc" font-size="15" font-weight="700" direction="ltr" font-family="var(--font-mono)">IF</text><rect x="${196 + i * 6}" y="${94 + i * 26}" width="${110 - i * 14}" height="10" rx="5" class="f-s3"/>
        <text x="${168 + i * 6}" y="${136 + i * 26}" class="t-mint" font-size="15" font-weight="700" direction="ltr" font-family="var(--font-mono)">THEN</text><rect x="${222 + i * 6}" y="${126 + i * 26}" width="${80 - i * 10}" height="10" rx="5" class="f-s3"/></g></g>`).join("")}
      <path ${an("draw", 0.9, "s-rose")} pathLength="1" d="M300 190 l-14 22 l12 6 l-16 26" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      ${[[70, 0], [120, 0.7], [380, 0.3], [420, 1.1], [56, 1.5], [440, 1.9], [100, 2.3], [360, 2.6]].map(([x, d]) => `<g class="an snow" style="--d:${d}s"><path d="M${x} 20 v18 M${x - 8} 24 l16 10 M${x + 8} 24 l-16 10" class="s-sky" stroke-width="2.5" stroke-linecap="round"/></g>`).join("")}
      <g ${an("rise", 0.6)}><rect x="404" y="176" width="20" height="86" rx="10" class="f-s1 s-ink2" stroke-width="2.5"/><circle cx="414" cy="272" r="16" class="f-sky s-ink2" stroke-width="2.5"/><rect x="410" y="232" width="8" height="34" class="f-sky an drop" style="--d:.9s"/></g>
      ${txt(240, 296, ar() ? "التمويل بيبرد" : "funding freezes", "t-ink3", 13)}`,
    deepblue: () => {
      let sq = "";
      for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) sq += `<rect x="${108 + c * 34}" y="${58 + r * 34}" width="34" height="34" class="${(r + c) % 2 ? "f-board2" : "f-s1"}"/>`;
      return `
      <g ${an("rise", 0.05)}>${sq}<rect x="108" y="58" width="204" height="204" class="s-ink2" fill="none" stroke-width="3"/></g>
      <g class="an tip" style="--d:1.1s;transform-origin:212px 236px"><path d="M198 236 h28 l-4 -10 h-20z M203 226 q-4-22 9-34 q13 12 9 34z" class="f-ink"/><path d="M212 182 v-14 M205 175 h14" class="s-ink" stroke-width="4" stroke-linecap="round"/></g>
      <g ${an("pop", 0.6)}><path d="M266 168 h22 l-3 -8 h-16z M270 160 q-3-16 7-24 q10 8 7 24z" class="f-s1 s-ink" stroke-width="2"/></g>
      <g ${an("rise", 0.3)}><rect x="344" y="66" width="86" height="190" rx="10" class="f-acc-deep"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="356" y="${82 + i * 26}" width="62" height="14" rx="4" class="f-acc-soft2"/><circle class="an blink" style="--d:${0.2 * i}s" cx="410" cy="${89 + i * 26}" r="3" fill="#5be39a"/>`).join("")}</g>
      ${txt(387, 282, "Deep Blue", "t-ink2", 14, 'font-weight="600" direction="ltr"')}
      ${txt(210, 290, ar() ? "ملايين النقلات في الثانية" : "millions of moves a second", "t-ink3", 13)}`;
    },
    deeplearning: () => {
      const cols = [[175, [80, 130, 180, 230]], [255, [100, 150, 200]], [335, [80, 130, 180, 230]]];
      let links = "";
      for (let k = 0; k < cols.length - 1; k++) for (const a of cols[k][1]) for (const b of cols[k + 1][1]) links += `<line x1="${cols[k][0]}" y1="${a}" x2="${cols[k + 1][0]}" y2="${b}" class="s-line2 an lit lit${k}" style="--d:${0.9 + k * 0.45}s" stroke-width="1.5"/>`;
      let tiles = "";
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) tiles += `<rect ${an("pop", 0.08 * (r * 3 + c), `${(r * 3 + c) % 4 === 0 ? "f-acc" : (r * 3 + c) % 3 === 0 ? "f-amber" : "f-s3"}`)} x="${40 + c * 32}" y="${110 + r * 32}" width="28" height="28" rx="6"/>`;
      return `${tiles}<path ${an("draw", 0.75, "s-ink2")} pathLength="1" d="M142 158 h22" stroke-width="3" marker-end="url(#aih-arrow)" fill="none"/>
      ${links}
      ${cols.map(([x, ys], k) => ys.map((y) => `<circle ${an("pop", 0.6 + k * 0.45, `f-s1 s-acc node${k}`)} cx="${x}" cy="${y}" r="11" stroke-width="2.5"/>`).join("")).join("")}
      <g ${an("pop", 2.0)}><rect x="384" y="132" width="76" height="52" rx="14" class="f-mint"/>${txt(422, 165, ar() ? "قطة" : "cat", "t-white", 16, 'font-weight="700"')}</g>
      <g ${an("rise", 0.4)}><rect x="200" y="262" width="110" height="38" rx="6" class="f-ink2"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${208 + i * 14}" y="254" width="6" height="8" class="f-ink3"/>`).join("")}${txt(255, 287, "GPU", "t-white", 14, 'font-weight="700" direction="ltr"')}</g>`;
    },
    alphago: () => {
      let grid = "";
      for (let i = 0; i < 9; i++) grid += `<line x1="${130 + i * 27.5}" y1="50" x2="${130 + i * 27.5}" y2="270" class="s-ink3" stroke-width="1.5"/><line x1="130" y1="${50 + i * 27.5}" x2="350" y2="${50 + i * 27.5}" class="s-ink3" stroke-width="1.5"/>`;
      const stones = [[2, 2, 1], [6, 2, 0], [2, 6, 0], [6, 6, 1], [3, 3, 1], [5, 4, 0], [4, 5, 1], [3, 5, 0], [5, 2, 1], [4, 3, 0]];
      const at = (c) => 130 + c * 27.5;
      return `<g ${an("rise", 0.05)}><rect x="110" y="30" width="260" height="260" rx="12" class="f-wood"/>${grid}</g>
      ${stones.map(([c, r, w], i) => `<circle ${an("pop", 0.3 + i * 0.12, `${w ? "f-ink" : "f-s1 s-ink2"}`)} cx="${at(c)}" cy="${at(r) - 80}" r="11" stroke-width="2"/>`).join("")}
      <circle ${an("pop", 1.75, "f-ink")} cx="${at(7)}" cy="${at(4) - 80}" r="11"/>
      <circle ${an("ring", 2.0, "s-amber")} cx="${at(7)}" cy="${at(4) - 80}" r="20" fill="none" stroke-width="3"/>
      <g ${an("pop", 2.2)}><rect x="378" y="${at(4) - 98}" width="70" height="36" rx="18" class="f-amber"/>${txt(413, at(4) - 74, ar() ? "النقلة ٣٧" : "Move 37", "t-white", 13, 'font-weight="700"')}</g>
      ${txt(240, 312, ar() ? "ألفاجو ٤ – ١ لي سيدول" : "AlphaGo 4 – 1 Lee Sedol", "t-ink3", 13)}`;
    },
    transformer: () => {
      const words = ar() ? ["قعدت", "على", "ضفة", "النهر"] : ["I", "sat", "on", "the", "river", "bank"];
      const focus = ar() ? 2 : 5, link = ar() ? 3 : 4;
      const w = ar() ? 86 : 62, gap = 12, total = words.length * w + (words.length - 1) * gap, x0 = 240 - total / 2;
      const order = ar() ? words.map((_, i) => words.length - 1 - i) : words.map((_, i) => i);
      const xOf = (i) => x0 + order[i] * (w + gap) + w / 2;
      const arcs = words.map((_, i) => i === focus ? "" : `<path ${an("draw", 0.9 + i * 0.12, `${i === link ? "s-acc" : "s-line2"}`)} pathLength="1" d="M${xOf(focus)} 168 Q${(xOf(focus) + xOf(i)) / 2} ${i === link ? 46 : 96} ${xOf(i)} 168" stroke-width="${i === link ? 5 : 2}" fill="none" stroke-linecap="round"/>`).join("");
      return `${arcs}
      ${words.map((s, i) => `<g ${an("rise", 0.1 + i * 0.1)}><rect x="${xOf(i) - w / 2}" y="170" width="${w}" height="44" rx="12" class="${i === focus ? "f-acc" : i === link ? "f-acc-soft s-acc" : "f-s1 s-line2"}" stroke-width="2"/>${txt(xOf(i), 198, s, i === focus ? "t-white" : "t-ink", 15, 'font-weight="600"')}</g>`).join("")}
      <g ${an("pop", 1.9)}><rect x="${Math.min(380, Math.max(100, xOf(focus))) - 70}" y="236" width="140" height="34" rx="17" class="f-mint"/>${txt(Math.min(380, Math.max(100, xOf(focus))), 258, ar() ? "ضفة = شط مش بنك" : "bank = riverside", "t-white", 13, 'font-weight="700"')}</g>
      ${txt(240, 300, ar() ? "كل كلمة بتنتبه للكلمات اللي بتشرح معناها" : "each word attends to the words that explain it", "t-ink3", 13)}`;
    },
    chatgpt: () => `
      <g ${an("rise", 0.05)}><rect x="70" y="30" width="340" height="250" rx="18" class="f-s1 s-line2" stroke-width="2"/><rect x="70" y="30" width="340" height="38" rx="18" class="f-s2"/><rect x="70" y="52" width="340" height="16" class="f-s2"/><circle cx="94" cy="49" r="5" class="f-rose"/><circle cx="112" cy="49" r="5" class="f-amber"/><circle cx="130" cy="49" r="5" class="f-mint"/></g>
      <g ${an("rise", 0.45)}><rect x="${ar() ? 96 : 214}" y="86" width="170" height="40" rx="14" class="f-acc"/>${txt(ar() ? 181 : 299, 111, ar() ? "اكتبلي إيميل اعتذار" : "Write an apology email", "t-white", 13)}</g>
      <g ${an("fade", 1.0, "dots")}><rect x="${ar() ? 300 : 96}" y="140" width="84" height="34" rx="14" class="f-s2"/><circle cx="${ar() ? 324 : 120}" cy="157" r="4" class="f-ink3 an blink" style="--d:0s"/><circle cx="${ar() ? 342 : 138}" cy="157" r="4" class="f-ink3 an blink" style="--d:.2s"/><circle cx="${ar() ? 360 : 156}" cy="157" r="4" class="f-ink3 an blink" style="--d:.4s"/></g>
      <g ${an("rise", 1.9)}><rect x="${ar() ? 158 : 96}" y="140" width="226" height="84" rx="14" class="f-s2"/>${[0, 1, 2].map((i) => `<rect class="an grow" style="--d:${2.1 + i * 0.25}s;transform-origin:${ar() ? "right" : "left"} center" x="${ar() ? 372 - (190 - i * 34) : 110}" y="${158 + i * 20}" width="${190 - i * 34}" height="10" rx="5" fill="currentColor" opacity=".35"/>`).join("")}</g>
      <g ${an("pop", 0.7)}><rect x="300" y="236" width="150" height="56" rx="16" class="f-ink"/><text x="375" y="262" class="t-bg" font-size="18" font-weight="700" text-anchor="middle" data-count="1000000">${ar() ? "١٬٠٠٠٬٠٠٠" : "1,000,000"}</text>${txt(375, 282, ar() ? "مستخدم في ٥ أيام" : "users in 5 days", "t-bg2", 11)}</g>`,
    today: () => {
      const tools = [
        { x: 96, y: 80, k: "doc" }, { x: 384, y: 80, k: "sheet" }, { x: 70, y: 214, k: "mail" }, { x: 410, y: 214, k: "code" }, { x: 240, y: 46, k: "cal" }
      ];
      const icon = (t) => ({
        doc: `<rect x="-14" y="-18" width="28" height="36" rx="4" class="f-s1 s-ink2" stroke-width="2"/><path d="M-7 -6h14M-7 2h14M-7 10h9" class="s-ink3" stroke-width="2.5" stroke-linecap="round"/>`,
        sheet: `<rect x="-17" y="-15" width="34" height="30" rx="4" class="f-mint-soft s-mint" stroke-width="2"/><path d="M-17 -5h34M-17 5h34M-5 -15v30M6 -15v30" class="s-mint" stroke-width="1.6"/>`,
        mail: `<rect x="-18" y="-13" width="36" height="26" rx="4" class="f-s1 s-ink2" stroke-width="2"/><path d="M-18 -11 l18 13 l18 -13" class="s-ink2" stroke-width="2" fill="none"/>`,
        code: `<rect x="-18" y="-15" width="36" height="30" rx="5" class="f-ink2"/><path d="M-7 -6 l-6 6 l6 6 M7 -6 l6 6 l-6 6" class="s-white" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
        cal: `<rect x="-16" y="-14" width="32" height="30" rx="4" class="f-s1 s-rose" stroke-width="2"/><rect x="-16" y="-14" width="32" height="9" rx="3" class="f-rose"/><circle cx="0" cy="6" r="4" class="f-rose"/>`
      })[t.k];
      return `${tools.map((t, i) => `<path ${an("draw", 0.5 + i * 0.12, "s-acc")} pathLength="1" d="M240 164 L${t.x} ${t.y}" stroke-width="2.5" stroke-dasharray="1" fill="none"/>`).join("")}
      ${tools.map((t, i) => `<path class="an march" style="--d:${1.3 + i * 0.15}s" d="M240 164 L${t.x} ${t.y}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join("")}
      ${tools.map((t, i) => `<g transform="translate(${t.x} ${t.y})"><g ${an("pop", 0.25 + i * 0.1)}><circle r="30" class="f-s1 s-line2" stroke-width="2"/>${icon(t)}</g></g>`).join("")}
      <g ${an("pop", 0.1)}><circle cx="240" cy="164" r="44" class="f-acc"/><path d="M226 150 v28 M226 158 h20 M226 170 h20 M246 150 v28" class="s-white" stroke-width="4" stroke-linecap="round"/><path d="M256 140 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z" class="f-white"/></g>
      <g ${an("rise", 1.5)}>${person(240, 296, 1, "f-ink2")}<g transform="translate(266 254)"><circle r="13" class="f-mint"/><path d="M-6 0 l4 4 l8 -9" class="s-white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>
      ${txt(ar() ? 330 : 150, 292, ar() ? "إنت بتراجع وتوافق" : "you review & approve", "t-ink3", 13)}`;
    }
  };

  /* ---------- drawings for "inside the model" (data/model-story.js) ---------- */
  const chip = (x, y, w, s, cls = "f-s1 s-line2", tcls = "t-ink", size = 15, extra = "") =>
    `<rect x="${x - w / 2}" y="${y - 20}" width="${w}" height="40" rx="11" class="${cls}" stroke-width="2"/>${txt(x, y + 6, s, tcls, size, 'font-weight="600"' + extra)}`;
  const rowX = (n, w, gap, cx = 240) => { const total = n * w + (n - 1) * gap, x0 = cx - total / 2; return (i) => x0 + (ar() ? n - 1 - i : i) * (w + gap) + w / 2; };
  Object.assign(ART, {
    m_idea: () => `
      <g ${an("rise", 0.05)}><rect x="34" y="62" width="168" height="196" rx="12" class="f-s1 s-line2" stroke-width="2"/>
        ${[0, 1, 2, 3, 4].map((i) => txt(118, 100 + i * 32, ar() ? "لو … يبقى …" : "IF … THEN …", "t-ink3", 13)).join("")}
        ${txt(118, 286, ar() ? "قواعد مكتوبة بالإيد" : "hand-written rules", "t-ink3", 13)}</g>
      <path ${an("draw", 0.7, `s-rose`)} pathLength="1" d="M50 80 L186 240 M186 80 L50 240" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g ${an("rise", 0.4)}><rect x="262" y="70" width="184" height="180" rx="18" class="f-acc-soft s-acc" stroke-width="2.5"/>
        ${[0, 1, 2].map((r) => [0, 1, 2].map((c) => { const x = 308 + c * 46, y = 116 + r * 46; return `<g transform="translate(${x} ${y})"><circle r="15" class="f-s1 s-acc" stroke-width="2.5"/><g class="an turn" style="--d:${1 + (r * 3 + c) * 0.11}s"><line x1="0" y1="0" x2="0" y2="-11" class="s-acc" stroke-width="3" stroke-linecap="round"/></g></g>`; }).join("")).join("")}
        ${txt(354, 286, ar() ? "آلة بتتظبط من الأمثلة" : "a machine tuned by examples", "t-acc", 13, 'font-weight="700"')}</g>
      <g ${an("rise", 1.1)}>${[0, 1, 2].map((i) => `<rect x="${(ar() ? 380 : 350) + i * 6}" y="${16 + i * 5}" width="24" height="30" rx="4" class="f-s1 s-ink3" stroke-width="2"/>`).join("")}${txt(ar() ? 322 : 418, 38, ar() ? "أمثلة" : "examples", "t-ink3", 12)}</g>
      <path ${an("draw", 1.3, `s-ink2`)} pathLength="1" d="M${ar() ? 394 : 364} 52 v14" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`,
    m_game: () => {
      const words = ar() ? ["فنجان", "قهوة", "من", "غير"] : ["a cup", "of coffee", "without"];
      const X = rowX(words.length + 1, ar() ? 76 : 96, 10);
      const cands = ar() ? [["سكر", 0.62], ["لبن", 0.21], ["رغوة", 0.09]] : [["sugar", 0.62], ["milk", 0.21], ["foam", 0.09]];
      return `${words.map((w, i) => `<g ${an("rise", 0.1 + i * 0.1)}>${chip(X(i), 86, ar() ? 76 : 96, w)}</g>`).join("")}
      <g ${an("pop", 0.6)}><rect x="${X(words.length) - (ar() ? 38 : 48)}" y="66" width="${ar() ? 76 : 96}" height="40" rx="11" class="f-acc-soft s-acc" stroke-width="2.5" stroke-dasharray="6 5"/>${txt(X(words.length), 92, "?", "t-acc", 20, 'font-weight="800"')}</g>
      ${cands.map(([w, p], i) => { const y = 160 + i * 42; const x0 = ar() ? 344 : 136; const len = 220 * p / 0.62;
        return `<g ${an("fade", 0.9 + i * 0.15)}>${txt(ar() ? 410 : 70, y + 6, w, i ? "t-ink2" : "t-ink", 15, 'font-weight="700"')}</g>
        <rect class="an grow ${i ? "f-s3" : "f-acc"}" style="--d:${1 + i * 0.15}s;transform-origin:${ar() ? "right" : "left"} center" x="${ar() ? x0 - len : x0}" y="${y - 12}" width="${len}" height="22" rx="6"/>
        <g ${an("fade", 1.5 + i * 0.15)}>${txt(ar() ? x0 - len - 26 : x0 + len + 26, y + 5, Math.round(p * 100) + "%", "t-ink3", 13, 'font-weight="700" direction="ltr"')}</g>`; }).join("")}
      ${txt(240, 300, ar() ? "النص نفسه فيه الإجابة الصح" : "the text itself holds the right answer", "t-ink3", 13)}`;
    },
    m_tokens: () => {
      const rows = ar()
        ? [["حروف", "ه ي ك ت ب و ل ه م".split(" "), "طويلة، والحرف ملوش معنى"], ["كلمات", ["هيكتبولهم"], "مش في القاموس!"], ["توكنز", ["هي", "كتب", "و", "لهم"], "قطع معروفة ✓"]]
        : [["letters", "u n b e l i e v a b l y".split(" "), "too long, no meaning"], ["words", ["unbelievably"], "not in the dictionary!"], ["tokens", ["un", "believ", "ably"], "familiar pieces ✓"]];
      return rows.map(([name, parts, note], r) => {
        const y = 70 + r * 88, w = r === 0 ? 24 : r === 1 ? 150 : 58, gap = r === 0 ? 4 : 8, X = rowX(parts.length, w, gap, 270);
        const cls = r === 2 ? "f-acc" : r === 1 ? "f-rose-soft s-rose" : "f-s1 s-line2", t = r === 2 ? "t-white" : "t-ink";
        return `<g ${an("rise", 0.2 + r * 0.45)}>${txt(ar() ? 450 : 30, y + 5, name, "t-ink3", 13, `font-weight="700" text-anchor="${ar() ? "end" : "start"}"`)}
          ${parts.map((p, i) => `<rect x="${X(i) - w / 2}" y="${y - 17}" width="${w}" height="34" rx="8" class="${cls}" stroke-width="2"/>${txt(X(i), y + 6, p, t, r === 0 ? 13 : 15, 'font-weight="600"')}`).join("")}
          ${txt(270, y + 38, note, r === 2 ? "t-mint" : r === 1 ? "t-rose" : "t-ink3", 12.5, 'font-weight="600"')}</g>`;
      }).join("");
    },
    m_map: () => {
      const C = [
        { c: "f-acc", t: "t-acc", pts: ar() ? [[120, 90, "قهوة"], [168, 74, "شاي"], [150, 128, "عصير"]] : [[120, 90, "coffee"], [168, 74, "tea"], [150, 128, "juice"]] },
        { c: "f-mint", t: "t-mint", pts: ar() ? [[330, 214, "قطة"], [376, 236, "كلب"], [350, 266, "حصان"]] : [[330, 214, "cat"], [376, 236, "dog"], [350, 266, "horse"]] },
        { c: "f-amber", t: "t-amber", pts: ar() ? [[338, 72, "القاهرة"], [394, 104, "باريس"], [330, 124, "روما"]] : [[338, 72, "Cairo"], [394, 104, "Paris"], [330, 124, "Rome"]] }
      ];
      return `<g ${an("fade", 0)}>${[0, 1, 2, 3, 4].map((i) => `<line x1="${60 + i * 90}" y1="40" x2="${60 + i * 90}" y2="290" class="s-line" stroke-width="1"/><line x1="40" y1="${50 + i * 60}" x2="440" y2="${50 + i * 60}" class="s-line" stroke-width="1"/>`).join("")}</g>
      ${C.map((g, k) => `<ellipse ${an("pop", 0.3 + k * 0.4, g.c + " cluster")} cx="${g.pts.reduce((a, p) => a + p[0], 0) / 3}" cy="${g.pts.reduce((a, p) => a + p[1], 0) / 3}" rx="72" ry="52"/>`
        + g.pts.map((p, i) => `<g ${an("pop", 0.45 + k * 0.4 + i * 0.08)}><circle cx="${p[0]}" cy="${p[1]}" r="7" class="${g.c}"/>${txt(p[0], p[1] - 13, p[2], g.t, 13, 'font-weight="700"')}</g>`).join("")).join("")}
      <path ${an("draw", 1.8, `s-ink3`)} pathLength="1" d="M150 128 Q 210 210 318 214" stroke-width="2" stroke-dasharray="1" fill="none"/>
      <g ${an("fade", 2.2)}>${txt(170, 214, ar() ? "بعيد في المعنى = بعيد" : "far in meaning = far apart", "t-ink3", 12.5)}</g>
      <path ${an("draw", 2.6, "s-acc")} pathLength="1" d="M92 262 C 80 200, 96 150, 116 118" stroke-width="2" stroke-dasharray="1" fill="none"/>
      <g ${an("pop", 2.4)}><circle cx="92" cy="262" r="6" class="s-acc" fill="none" stroke-width="2"/></g>
      <g ${an("fade", 2.9)}>${txt(126, 276, ar() ? "التدريب بيقرّبها" : "training moves it closer", "t-acc", 12, 'font-weight="800"')}</g>
      ${txt(240, 312, ar() ? "قريب في المعنى = قريب في المكان" : "close in meaning = close on the map", "t-ink2", 13, 'font-weight="700"')}`;
    },
    m_order: () => {
      const A1 = ar() ? ["الكلب", "عض", "الراجل"] : ["dog", "bites", "man"];
      const A2 = ar() ? ["الراجل", "عض", "الكلب"] : ["man", "bites", "dog"];
      const X = rowX(3, 96, 12, ar() ? 280 : 200);
      const row = (ws, y, d, tag, tcls) => `${ws.map((w, i) => `<g ${an("rise", d + i * 0.1)}>${chip(X(i), y, 96, w, i === 1 ? "f-s2 s-line2" : "f-s1 s-acc")}<circle cx="${X(i) + (ar() ? -40 : 40)}" cy="${y - 20}" r="11" class="f-acc"/>${txt(X(i) + (ar() ? -40 : 40), y - 15.5, ar() ? "١٢٣"[i] : String(i + 1), "t-white", 12, 'font-weight="800"')}</g>`).join("")}
        <g ${an("pop", d + 0.5)}><rect x="${ar() ? 22 : 378}" y="${y - 18}" width="82" height="36" rx="18" class="${tcls}"/>${txt(ar() ? 63 : 419, y + 6, tag, "t-white", 13, 'font-weight="700"')}</g>`;
      return `${row(A1, 104, 0.1, ar() ? "عادي" : "normal", "f-ink3")}${row(A2, 214, 0.8, ar() ? "خبر!" : "news!", "f-rose")}
      <path ${an("draw", 0.6, `s-ink3`)} pathLength="1" d="M${X(0)} 130 C ${X(0)} 160, ${X(2)} 160, ${X(2)} 190 M${X(2)} 130 C ${X(2)} 160, ${X(0)} 160, ${X(0)} 190" stroke-width="2" stroke-dasharray="1" fill="none"/>
      ${txt(240, 296, ar() ? "كل كلمة معاها ختم بمكانها" : "each word carries a position stamp", "t-ink3", 13)}`;
    },
    m_attention: () => {
      const words = ar() ? ["سلّمت", "الملف", "للمدير", "عشان", "هو", "مستعجل"] : ["The", "file", "reached", "the", "manager", "so", "he", "signed"];
      const focus = ar() ? 4 : 6, link = ar() ? 2 : 4, w = ar() ? 66 : 50;
      const score = ar() ? [6, 14, 68, 12] : [3, 9, 6, 4, 70, 8];
      const X = rowX(words.length, w, 8);
      const arcs = words.map((_, i) => i >= focus ? "" : `<path ${an("draw", 0.9 + i * 0.15, i === link ? "s-acc" : "s-line2")} pathLength="1" d="M${X(focus)} 196 Q${(X(focus) + X(i)) / 2} ${i === link ? 92 : 140} ${X(i)} 196" stroke-width="${i === link ? 5 : 1.8}" fill="none" stroke-linecap="round"/>`).join("");
      const bars = words.map((_, i) => i >= focus ? "" : `<rect class="an vbar ${i === link ? "f-acc" : "f-s3"}" style="--d:${1.7 + i * 0.12}s" x="${X(i) - 9}" y="${84 - score[i] * 0.6}" width="18" height="${score[i] * 0.6 + 2}" rx="4"/><g ${an("fade", 2.0 + i * 0.12)}>${txt(X(i), 100, digits(score[i]) + (ar() ? "٪" : "%"), i === link ? "t-acc" : "t-ink3", 10.5, 'font-weight="800"')}</g>`).join("");
      return `<g ${an("fade", 0.3)}>${txt(X(focus), 38, ar() ? "«هو» بتسأل: مين أقصد؟" : "“he” asks: who do I mean?", "t-ink2", 12.5, 'font-weight="800"')}</g>
      ${bars}${arcs}${words.map((s, i) => `<g ${an("rise", 0.1 + i * 0.07)}>${chip(X(i), 218, w, s, i === focus ? "f-acc" : i === link ? "f-acc-soft s-acc" : "f-s1 s-line2", i === focus ? "t-white" : "t-ink", 13.5)}</g>`).join("")}
      <g ${an("pop", 2.7)}><rect x="${X(focus) - 72}" y="254" width="144" height="32" rx="16" class="f-mint"/>${txt(X(focus), 275, ar() ? "«هو» = المدير" : "“he” = the manager", "t-white", 13, 'font-weight="700"')}</g>
      ${txt(240, 308, ar() ? "درجات بتتحسب، مش فهم زي الإنسان" : "scores are calculated, not understood as a person would", "t-ink3", 12.5)}`;
    },
    m_layers: () => {
      const labels = ar() ? ["شكل الكلام", "القواعد", "المعنى", "الـ Context", "المقصود"] : ["word forms", "grammar", "meaning", "context", "intent"];
      return `${labels.map((s, i) => { const y = 252 - i * 46; return `<g ${an("rise", 0.1 + i * 0.12)}><rect x="${ar() ? 150 : 90}" y="${y - 17}" width="240" height="34" rx="10" class="layer l${i}"/>${txt(ar() ? 270 : 210, y + 5, s, i > 2 ? "t-white" : "t-ink", 14, 'font-weight="700"')}</g>`; }).join("")}
      <circle ${an("travel", 0.9, `f-amber`)} r="9"><animateMotion dur="2.8s" begin="indefinite" repeatCount="indefinite" path="M${ar() ? 120 : 360} 270 L${ar() ? 120 : 360} 50"/></circle>
      <path ${an("draw", 0.8, `s-amber`)} pathLength="1" d="M${ar() ? 120 : 360} 272 V 46" stroke-width="2.5" stroke-dasharray="1" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.2)}>${txt(ar() ? 64 : 420, 150, ar() ? "عشرات" : "dozens", "t-ink3", 13, 'font-weight="700"')}${txt(ar() ? 64 : 420, 168, ar() ? "الطبقات" : "of layers", "t-ink3", 13)}</g>
      ${txt(240, 300, ar() ? "كل طبقة بتبني على اللي تحتها" : "each layer builds on the one below", "t-ink3", 13)}`;
    },
    m_training: () => {
      const c = mx(132), d = dirx();
      const N = ar() ? [["خمّن", "f-acc", "t-white"], ["قارن", "f-amber", "t-white"], ["عدّل", "f-mint", "t-white"]] : [["guess", "f-acc", "t-white"], ["compare", "f-amber", "t-white"], ["adjust", "f-mint", "t-white"]];
      const P = [[c, 70], [c + d * 78, 196], [c - d * 78, 196]];
      const ring = `<circle cx="${c}" cy="152" r="86" class="s-line2" stroke-width="2" fill="none"/><circle ${an("draw", 0.9, "s-acc march")} pathLength="19" cx="${c}" cy="152" r="86" stroke-width="3" stroke-dasharray="4 15" fill="none"/>`;
      return `<g ${an("fade", 0.05)}>${ring}</g>
      ${N.map(([t, f, tc], i) => `<g ${an("pop", 0.3 + i * 0.45)}><circle cx="${P[i][0]}" cy="${P[i][1]}" r="30" class="${f}"/>${txt(P[i][0], P[i][1] + 5, t, tc, 13, 'font-weight="800"')}</g>`).join("")}
      <g ${an("fade", 1.6)}>${txt(c, 158, ar() ? "مليارات" : "billions", "t-ink2", 12.5, 'font-weight="800"')}${txt(c, 176, ar() ? "المرات" : "of times", "t-ink3", 11.5, bold)}</g>
      <g ${an("fade", 0.4)}><path d="M${mx(270)} 62 V 222 H ${mx(452)}" class="s-ink3" stroke-width="2" fill="none"/>${txt(mx(270) + d * 2, 50, ar() ? "الخطأ" : "error", "t-ink3", 12, bold)}${txt(mx(372), 244, ar() ? "مع التدريب" : "as training goes on", "t-ink3", 12, bold)}</g>
      <path ${an("draw", 1.2, "s-rose")} pathLength="1" d="M${mx(278)} 74 C ${mx(310)} 160, ${mx(350)} 196, ${mx(446)} 208" stroke-width="4" fill="none" stroke-linecap="round"/>
      <g ${an("pop", 2.2)}><circle cx="${mx(446)}" cy="208" r="7" class="f-mint"/></g>
      <g ${an("rise", 2.6)}>${box(240, 286, 380, 38, "f-acc-soft s-acc")}${txt(240, 291, ar() ? "اللي اتعلمه متوزّع على كل المفاتيح، مش جدول معلومات" : "what it learns is spread over all the knobs, not a table of facts", "t-acc", 11.5, 'font-weight="800"')}</g>`;
    },
    m_scale: () => {
      const bars = ar() ? [["البيانات", "f-acc"], ["المفاتيح", "f-amber"], ["الحساب", "f-mint"]] : [["data", "f-acc"], ["knobs", "f-amber"], ["compute", "f-mint"]];
      const X = rowX(3, 62, 26, ar() ? 330 : 150);
      return `${bars.map(([s, c], i) => `<rect class="an vbar ${c}" style="--d:${0.2 + i * 0.15}s" x="${X(i) - 31}" y="${96 + i * 8}" width="62" height="${170 - i * 8}" rx="8"/>${txt(X(i), 290, s, "t-ink2", 13, 'font-weight="700"')}`).join("")}
      <g ${an("fade", 0.9)}><path d="M${ar() ? 40 : 268} 80 V 266 H ${ar() ? 212 : 440}" class="s-ink3" stroke-width="2" fill="none"/>${txt(ar() ? 126 : 354, 290, ar() ? "الجودة بتطلع" : "quality rises", "t-ink2", 13, 'font-weight="700"')}</g>
      <path ${an("draw", 1.1, `s-acc`)} pathLength="1" d="${ar() ? "M48 250 C 90 214, 130 150, 204 96" : "M276 250 C 318 214, 358 150, 432 96"}" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${[   // abilities that appear with scale — writing, languages, code — drawn, not emoji (glyphs differ between machines)
        (x, y) => `<path d="M${x - 8} ${y + 9} L${x + 6} ${y - 5} L${x + 9} ${y - 2} L${x - 5} ${y + 12} Z M${x - 8} ${y + 9} L${x - 10} ${y + 14} L${x - 5} ${y + 12}" class="s-ink2" stroke-width="2" fill="none" stroke-linejoin="round"/>`,
        (x, y) => `<circle cx="${x}" cy="${y}" r="10" class="s-ink2" stroke-width="2" fill="none"/><ellipse cx="${x}" cy="${y}" rx="4.5" ry="10" class="s-ink2" stroke-width="1.6" fill="none"/><path d="M${x - 10} ${y} H${x + 10}" class="s-ink2" stroke-width="1.6"/>`,
        (x, y) => `<rect x="${x - 10}" y="${y - 9}" width="20" height="13" rx="2" class="s-ink2" stroke-width="2" fill="none"/><path d="M${x - 13} ${y + 8} H${x + 13}" class="s-ink2" stroke-width="2.4" stroke-linecap="round"/>`,
      ].map((ic, i) => `<g ${an("pop", 1.6 + i * 0.2)}>${ic((ar() ? 90 : 318) + i * 48, 173 - i * 34)}</g>`).join("")}
      ${txt(240, 50, ar() ? "قدرات جديدة بتظهر مع الحجم" : "new abilities appear with scale", "t-ink3", 13)}`;
    },
    m_tuning: () => {
      const L1 = ar() ? 340 : 140, L2 = ar() ? 140 : 340;
      return `<g ${an("rise", 0.05)}><rect x="${L1 - 104}" y="44" width="208" height="210" rx="16" class="f-s1 s-line2" stroke-width="2"/>${txt(L1, 70, ar() ? "بعد التدريب الكبير" : "after big training", "t-ink3", 12.5, 'font-weight="700"')}
        <rect x="${L1 - 90}" y="84" width="180" height="32" rx="12" class="f-acc"/>${txt(L1, 105, ar() ? "إزاي أعمل كيكة؟" : "How do I bake a cake?", "t-white", 13)}
        ${[0, 1, 2].map((i) => `<rect x="${L1 - 90}" y="${128 + i * 38}" width="180" height="30" rx="10" class="f-s2"/>${txt(L1, 148 + i * 38, ar() ? ["إزاي أعمل بسكوت؟", "إزاي أعمل تورتة؟", "إزاي أعمل…"][i] : ["How do I bake cookies?", "How do I bake a pie?", "How do I…"][i], "t-ink3", 12.5)}`).join("")}</g>
      <path ${an("draw", 0.7, `s-ink2`)} pathLength="1" d="M${(L1 + L2) / 2 + (ar() ? 26 : -26)} 150 H ${(L1 + L2) / 2 + (ar() ? -26 : 26)}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 1.0)}><rect x="${L2 - 104}" y="44" width="208" height="210" rx="16" class="f-mint-soft s-mint" stroke-width="2"/>${txt(L2, 70, ar() ? "بعد التهذيب" : "after tuning", "t-mint", 12.5, 'font-weight="700"')}
        <rect x="${L2 - 90}" y="84" width="180" height="32" rx="12" class="f-acc"/>${txt(L2, 105, ar() ? "إزاي أعمل كيكة؟" : "How do I bake a cake?", "t-white", 13)}
        <rect x="${L2 - 90}" y="128" width="180" height="100" rx="12" class="f-s1"/>${(ar() ? ["محتاج ٣ بيض، كوباية دقيق،", "وكوباية سكر. ١. سخّن الفرن…"] : ["You'll need 3 eggs, a cup", "of flour… 1. Preheat the oven…"]).map((l, i) => txt(L2, 156 + i * 22, l, "t-ink", 12.5)).join("")}</g>
      <g ${an("pop", 1.6)}>${person(L2 + (ar() ? -80 : 80), 300, 0.8, "f-ink2")}<g transform="translate(${L2 + (ar() ? -56 : 56)} 266)"><circle r="12" class="f-mint"/><path d="M-5 0 l3.5 3.5 l6.5 -7" class="s-white" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>
      ${txt((L1 + L2) / 2, 300, ar() ? "أمثلة محادثات + تقييم ناس" : "example chats + human ratings", "t-ink3", 12.5)}`;
    },
    m_reply: () => {
      const toks = ar() ? ["صباح", "الخير", "يا", "فريق"] : ["Good", "morning", ",", "team"];
      const X = rowX(4, 78, 10);
      const probs = ar() ? [["صباح", 45], ["أهلًا", 30], ["سلام", 15]] : [["Good", 45], ["Hello", 30], ["Hi", 15]];
      return `<g ${an("rise", 0.05)}><rect x="${ar() ? 214 : 46}" y="34" width="220" height="38" rx="14" class="f-acc"/>${txt(ar() ? 324 : 156, 59, ar() ? "اكتب تحية للفريق" : "Write a greeting for the team", "t-white", 13)}</g>
      ${probs.map(([w, p], i) => { const x0 = ar() ? 300 : 180, len = p * 2.6; return `<g ${an("fade", 0.4 + i * 0.12)}>${txt(ar() ? 360 : 120, 112 + i * 26, w, i ? "t-ink3" : "t-ink", 13, 'font-weight="700"')}</g><rect class="an grow ${i ? "f-s3" : "f-acc"}" style="--d:${0.5 + i * 0.12}s;transform-origin:${ar() ? "right" : "left"} center" x="${ar() ? x0 - len : x0}" y="${100 + i * 26}" width="${len}" height="16" rx="5"/>${txt(ar() ? x0 - len - 18 : x0 + len + 18, 113 + i * 26, p + "%", "t-ink3", 11.5, 'direction="ltr"')}`; }).join("")}
      ${toks.map((w, i) => `<g ${an("pop", 1.3 + i * 0.45)}>${chip(X(i), 222, 78, w, i === 0 ? "f-acc" : "f-s1 s-acc", i === 0 ? "t-white" : "t-ink")}</g>`).join("")}
      <rect ${an("fade", 3.1, `blink f-acc`)} x="${ar() ? X(3) - 52 : X(3) + 46}" y="206" width="4" height="32"/>
      <g ${an("fade", 1.0)}>${txt(240, 286, ar() ? "درجة الحرارة: قليلة = الأرجح، عالية = أجرأ" : "temperature: low = most likely, high = bolder", "t-ink3", 12.5)}</g>
      <g ${an("pop", 0.3)}>${box(mx(400), 54, 112, 50, "f-s2 s-line2")}<rect x="${mx(400) - 44}" y="50" width="16" height="14" rx="3" class="f-ink2"/><path d="M${mx(400) - 41} 50 v-5 a5 5 0 0 1 10 0 v5" class="s-ink2" stroke-width="2" fill="none"/>${txt(mx(400) + 10, 50, ar() ? "المفاتيح" : "knobs", "t-ink", 11, 'font-weight="800"')}${txt(mx(400) + 10, 66, ar() ? "ثابتة" : "fixed", "t-ink3", 10.5, bold)}</g>`;
    },
    m_recap: () => {
      const T = ar() ? ["أمثلة كتير", "خمّن وقارن", "عدّل المفاتيح"] : ["many examples", "guess & compare", "adjust the knobs"];
      const R = ar() ? ["كلامك", "توكنز + خريطة", "انتباه × طبقات", "الكلمة الجاية"] : ["your words", "tokens + map", "attention × layers", "next word"];
      const XT = rowX(3, 120, 30, 240), XR = rowX(4, 104, 12, 240);
      const row = (items, X, y, w, d0, last) => items.map((t, i) => `<g ${an("pop", d0 + i * 0.3)}>${box(X(i), y, w, 40, i === items.length - 1 ? last : "f-s1 s-acc")}${txt(X(i), y + 5, t, i === items.length - 1 ? "t-white" : "t-ink", 11.5, 'font-weight="800"')}</g>`).join("")
        + items.slice(1).map((_, i) => `<path ${an("draw", d0 + 0.15 + i * 0.3, "s-acc")} pathLength="1" d="M${X(i) + dirx() * (w / 2 + 2)} ${y} L${X(i + 1) - dirx() * (w / 2 + 4)} ${y}" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>`).join("");
      return `<g ${an("fade", 0.05)}>${txt(240, 50, ar() ? "التدريب: قبل كده، ومرة واحدة" : "training: before, and once", "t-ink2", 12.5, 'font-weight="800"')}</g>
      ${row(T, XT, 86, 120, 0.2, "f-mint")}
      <path ${an("draw", 1.3, "s-mint")} pathLength="1" d="M${XT(2)} 108 C ${XT(2)} 140, ${XR(2)} 150, ${XR(2)} 194" stroke-width="2.5" stroke-dasharray="1" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.5)}>${txt(mx(150), 180, ar() ? "الرد: دلوقتي، وفي كل مرة" : "a reply: now, and every time", "t-ink2", 12.5, 'font-weight="800"')}</g>
      ${row(R, XR, 218, 104, 1.6, "f-acc")}
      <g ${an("rise", 3.0)}>${person(mx(70), 300, 0.7, "f-ink2")}${txt(260, 292, ar() ? "إنت: Context واضح + مراجعة" : "you: clear context + review", "t-mint", 13, 'font-weight="700"')}</g>`;
    }
  });

  /* ---------- drawings for "the Prompt and the Context" (data/context-story.js) ---------- */
  const mx = (x) => (ar() ? 480 - x : x);   // mirror a horizontal position for right-to-left
  const box = (cx, cy, w, h, cls, sw = 2, more = "") => `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="12" class="${cls}" stroke-width="${sw}" ${more}/>`;
  const bold = 'font-weight="700"';
  Object.assign(ART, {
    c_sees: () => {
      const out = ar() ? [["ملفاتك", 70, 92], ["مصنعك", 70, 206], ["خبرتك", 410, 92], ["اجتماع امبارح", 410, 206]]
        : [["your files", 70, 92], ["your factory", 70, 206], ["your experience", 410, 92], ["last meeting", 410, 206]];
      return `<g ${an("rise", 0.05)}><rect x="150" y="46" width="180" height="214" rx="16" class="f-acc-soft s-acc" stroke-width="2.5"/>${txt(240, 76, "Context", "t-acc", 16, 'font-weight="800"')}
        ${[144, 118, 132].map((w, i) => `<rect x="${ar() ? 312 - w : 168}" y="${94 + i * 28}" width="${w}" height="15" rx="6" class="f-s1"/>`).join("")}</g>
      <g ${an("pop", 0.6)}>${box(240, 218, 160, 48, "f-acc", 0)}${txt(240, 214, ar() ? "اكتبلي تقرير" : "Write me a report", "t-white", 13, bold)}${txt(240, 232, ar() ? "عن التوقفات" : "on the stoppages", "t-white", 13, bold)}</g>
      ${out.map(([s, x, y], i) => `<g ${an("fade", 0.9 + i * 0.15)}>${box(x, y, 116, 44, "f-s2 s-line2", 2, 'stroke-dasharray="5 5"')}${txt(x, y + 5, s, "t-ink3", 12.5, 'font-weight="600"')}</g>`).join("")}
      <g ${an("fade", 1.6)}>${txt(70, 150, ar() ? "مش شايفها" : "invisible", "t-rose", 12, bold)}${txt(410, 150, ar() ? "مش شايفها" : "invisible", "t-rose", 12, bold)}</g>
      ${txt(240, 298, ar() ? "اللي جوه الإطار بس هو اللي الموديل شايفه" : "only what's inside the frame exists for the model", "t-ink2", 13, bold)}`;
    },
    c_defs: () => {
      const rows = ar() ? ["تعليمات التطبيق الثابتة", "ملفات رفعتها", "الرسايل اللي فاتت", "الـ Prompt: طلبك إنت"]
        : ["fixed app instructions", "files you uploaded", "earlier messages", "the Prompt: your request"];
      const cx = mx(270);
      return `<g ${an("rise", 0.05)}>${box(cx, 156, 320, 236, "f-s2 s-acc", 2.5)}${txt(cx, 66, "Context", "t-acc", 16, 'font-weight="800"')}</g>
      ${rows.map((s, i) => `<g ${an(i === 3 ? "pop" : "rise", 0.35 + i * 0.22)}>${box(cx, 102 + i * 46, 272, 36, i === 3 ? "f-acc" : "f-s1 s-line2")}${txt(cx, 107 + i * 46, s, i === 3 ? "t-white" : "t-ink2", 13.5, bold)}</g>`).join("")}
      <g ${an("rise", 1.4)}>${person(mx(56), 270, 0.9, "f-ink2")}</g>
      <path ${an("draw", 1.6, "s-ink2")} pathLength="1" d="M${mx(56)} 222 C ${mx(56)} 210, ${mx(100)} 240, ${mx(128)} 240" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      ${txt(240, 306, ar() ? "الـ Prompt جزء من الـ Context" : "the Prompt is part of the Context", "t-ink2", 13, bold)}`;
    },
    c_map: () => {
      const C = [
        { c: "f-acc", t: "t-acc", pts: ar() ? [[96, 92, "هالك"], [150, 70, "عيوب"], [140, 124, "خط تعبئة"]] : [[96, 92, "scrap"], [150, 70, "defects"], [140, 124, "filling line"]] },
        { c: "f-mint", t: "t-mint", pts: ar() ? [[338, 70, "عملاء"], [396, 96, "شكاوى"], [340, 120, "رضا"]] : [[338, 70, "customers"], [396, 96, "complaints"], [340, 120, "satisfaction"]] },
        { c: "f-amber", t: "t-amber", pts: ar() ? [[338, 214, "صحة"], [392, 238, "راحة"], [350, 262, "رفاهية"]] : [[338, 214, "health"], [392, 238, "comfort"], [350, 262, "wellbeing"]] }
      ];
      const ctr = C.map((g) => [g.pts.reduce((a, p) => a + p[0], 0) / 3, g.pts.reduce((a, p) => a + p[1], 0) / 3]);
      return `<g ${an("fade", 0)}>${[0, 1, 2, 3, 4].map((i) => `<line x1="${60 + i * 90}" y1="40" x2="${60 + i * 90}" y2="290" class="s-line" stroke-width="1"/><line x1="40" y1="${50 + i * 60}" x2="440" y2="${50 + i * 60}" class="s-line" stroke-width="1"/>`).join("")}</g>
      ${C.map((g, k) => `<ellipse ${an("pop", 0.2 + k * 0.25, g.c + " cluster")} cx="${ctr[k][0]}" cy="${ctr[k][1]}" rx="70" ry="48"/>`
        + g.pts.map((p, i) => `<g ${an("pop", 0.3 + k * 0.25 + i * 0.07)}><circle cx="${p[0]}" cy="${p[1]}" r="6" class="${g.c}"/>${txt(p[0], p[1] - 11, p[2], g.t, 12.5, bold)}</g>`).join("")).join("")}
      ${ctr.map(([x, y], k) => `<path ${an("draw", 1.2 + k * 0.1, "s-ink3")} pathLength="1" d="M236 180 L${x} ${y}" stroke-width="1.6" stroke-dasharray="1" fill="none"/>`).join("")}
      <g ${an("pop", 1.0)}>${box(236, 180, 96, 34, "f-s2 s-line2")}${txt(236, 185, ar() ? "«الجودة»" : "“quality”", "t-ink2", 13, bold)}</g>
      <path ${an("draw", 1.9, "s-acc")} pathLength="1" d="M120 238 C 116 214, 120 186, ${ctr[0][0] - 4} ${ctr[0][1] + 52}" stroke-width="4.5" fill="none" stroke-linecap="round" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.7)}>${box(126, 258, 214, 36, "f-acc", 0)}${txt(126, 263, ar() ? "«نسبة الهالك في خط التعبئة»" : "“scrap rate on the filling line”", "t-white", 12.5, bold)}</g>
      <ellipse class="an ring s-acc" style="--d:2.5s" cx="${ctr[0][0]}" cy="${ctr[0][1]}" rx="76" ry="54" fill="none" stroke-width="3"/>
      <g ${an("fade", 2.2)}>${txt(236, 220, ar() ? "عامة = منطقة واسعة" : "general = wide region", "t-ink3", 12)}</g>
      ${txt(240, 312, ar() ? "دقيقة = المنطقة الصح بالظبط" : "precise = exactly the right region", "t-ink2", 13, bold)}`;
    },
    c_terms: () => {
      const pc = mx(112), oc = mx(352);
      const X = rowX(5, 24, 8, oc), H = [84, 54, 30, 16, 8], cum = [44, 72, 87, 95, 100];
      return `<g ${an("rise", 0.05)}>${box(pc, 92, 190, 40, "f-s1 s-line2")}${txt(pc, 97, ar() ? "«شوف ليه الخط بيقف»" : "“why does it stop?”", "t-ink2", 12.5, bold)}</g>
      <path ${an("draw", 0.4, "s-ink3")} pathLength="1" d="M${mx(214)} 92 H ${mx(262)}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 0.6)}>${[150, 120, 136].map((w, i) => `<rect x="${oc - w / 2}" y="${66 + i * 20}" width="${w}" height="11" rx="5" class="f-s3"/>`).join("")}${txt(oc, 140, ar() ? "إجابة عامة" : "a generic answer", "t-ink3", 12.5, bold)}</g>
      <g ${an("rise", 1.0)}>${box(pc, 222, 190, 40, "f-acc", 0)}${txt(pc, 227, ar() ? "«تحليل باريتو للتوقفات»" : "“Pareto analysis”", "t-white", 12.5, bold)}</g>
      <path ${an("draw", 1.3, "s-acc")} pathLength="1" d="M${mx(214)} 222 H ${mx(262)}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      ${H.map((h, i) => `<rect class="an vbar ${i < 2 ? "f-acc" : "f-s3"}" style="--d:${1.5 + i * 0.1}s" x="${X(i) - 12}" y="${270 - h}" width="24" height="${h}" rx="4"/>`).join("")}
      <path ${an("draw", 2.2, "s-amber")} pathLength="1" d="M${H.map((_, i) => `${X(i)} ${270 - cum[i] * 1.0}`).join(" L")}" stroke-width="3" fill="none"/>
      ${H.map((_, i) => `<circle ${an("pop", 2.4 + i * 0.06, "f-amber")} cx="${X(i)}" cy="${270 - cum[i]}" r="4"/>`).join("")}
      <g ${an("fade", 2.6)}>${txt(oc, 296, ar() ? "طريقة تحليل كاملة" : "a complete method", "t-mint", 12.5, bold)}</g>
      ${txt(pc, 286, ar() ? "مصطلح واحد غيّر النتيجة" : "one term changed the result", "t-ink3", 12.5)}`;
    },
    c_links: () => {
      const ctx = ar() ? ["خط التعبئة", "سبتمبر", "٣ ورديات", "الوردية التالتة"] : ["filling line", "September", "3 shifts", "third shift"];
      const rep = ar() ? ["أغلب", "التوقف", "في", "الوردية", "التالتة"] : ["Most", "stops", "on", "the third", "shift"];
      const CX = rowX(4, 100, 10), RX = rowX(5, 80, 8), focus = 3, link = 3;
      return `<g ${an("fade", 0)}>${txt(mx(30), 44, "Context", "t-acc", 13, 'font-weight="800"')}</g>
      ${ctx.map((s, i) => `<g ${an("rise", 0.1 + i * 0.1)}>${chip(CX(i), 82, 100, s, i === link ? "f-acc-soft s-acc" : "f-s1 s-line2", "t-ink", 13)}</g>`).join("")}
      ${ctx.map((_, i) => `<path ${an("draw", 1.2 + i * 0.12, i === link ? "s-acc" : "s-line2")} pathLength="1" d="M${RX(focus)} 196 C ${RX(focus)} 150, ${CX(i)} 150, ${CX(i)} 104" stroke-width="${i === link ? 5 : 1.6}" fill="none" stroke-linecap="round"/>`).join("")}
      ${rep.map((s, i) => `<g ${an("pop", 0.6 + i * 0.12)}>${chip(RX(i), 218, 80, s, i === focus ? "f-acc" : "f-s1 s-acc", i === focus ? "t-white" : "t-ink", 13)}</g>`).join("")}
      <g ${an("fade", 0.5)}>${txt(mx(30), 262, ar() ? "الرد" : "reply", "t-ink3", 12.5, bold)}</g>
      ${txt(240, 300, ar() ? "كل كلمة في الرد بتدوّر في الـ Context على اللي يخصها" : "each word of the reply searches the Context for what concerns it", "t-ink3", 12.5)}`;
    },
    c_gaps: () => {
      const a = mx(130), b = mx(352);
      const f = ar() ? ["الخطوط: ؟", "الورديات: ؟", "الطلبيات: ؟"] : ["lines: ?", "shifts: ?", "orders: ?"];
      return `<g ${an("rise", 0.05)}>${box(a, 158, 200, 200, "f-s1 s-line2")}${box(a, 82, 176, 32, "f-acc", 0)}${txt(a, 87, ar() ? "خطة إنتاج للأسبوع الجاي" : "next week's production plan", "t-white", 12, bold)}
        ${f.map((s, i) => `${txt(a + (ar() ? 34 : -34), 135 + i * 40, s, "t-ink2", 13, bold)}`).join("")}</g>
      ${f.map((_, i) => `<g ${an("pop", 0.7 + i * 0.25)}>${box(a + (ar() ? -54 : 54), 130 + i * 40, 66, 26, "f-rose-soft s-rose")}${txt(a + (ar() ? -54 : 54), 135 + i * 40, ar() ? "تخمين" : "guess", "t-rose", 12, bold)}</g>`).join("")}
      <path ${an("draw", 1.5, "s-ink2")} pathLength="1" d="M${mx(236)} 158 H ${mx(246)}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 1.7)}>${box(b, 158, 200, 200, "f-s2 s-line2")}${txt(b, 84, ar() ? "الرد" : "the reply", "t-ink3", 12.5, bold)}
        ${[150, 128, 160, 118].map((w, i) => `<rect x="${b - w / 2}" y="${104 + i * 24}" width="${w}" height="11" rx="5" class="f-s3"/>`).join("")}</g>
      <g ${an("pop", 2.2)}>${box(b, 226, 150, 30, "f-rose")}${txt(b, 231, ar() ? "خطة لمصنع مش مصنعك" : "not your plant", "t-white", 11.5, bold)}</g>
      ${txt(240, 296, ar() ? "كل معلومة ناقصة = فراغ بيتملي بتخمين" : "every missing fact = a gap filled by a guess", "t-ink2", 13, bold)}`;
    },
    c_anatomy: () => {
      const L = ar() ? [["الهدف", "ليه؟"], ["الظروف", "فين وإزاي؟"], ["المهمة", "اعمل إيه؟"], ["الشكل", "تطلع إزاي؟"], ["الجمهور", "لمين؟"], ["القيود", "إيه الممنوع؟"]]
        : [["goal", "why?"], ["circumstances", "where and how?"], ["task", "do what?"], ["shape", "look like?"], ["audience", "for whom?"], ["limits", "what's off-limits?"]];
      const cx = mx(200), hx = mx(392);
      return `${L.map(([s, h], i) => { const y = 270 - i * 40; return `<g ${an("rise", 0.15 + i * 0.18)}><rect x="${cx - 115}" y="${y - 16}" width="230" height="32" rx="10" class="layer l${Math.min(i, 4)}"/>${txt(cx, y + 5, s, i > 2 ? "t-white" : "t-ink", 14, bold)}</g>
        <g ${an("fade", 0.35 + i * 0.18)}>${txt(hx, y + 5, h, "t-ink3", 12.5, 'font-weight="600"')}</g>`; }).join("")}
      <path ${an("draw", 1.5, "s-acc")} pathLength="1" d="M${mx(72)} 286 V 54" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g ${an("pop", 1.7)}>${box(mx(72), 36, 86, 30, "f-acc", 0)}${txt(mx(72), 41, "Prompt", "t-white", 13, 'font-weight="800"')}</g>
      ${txt(cx, 306, ar() ? "كل مكوّن بيقفل باب تخمين" : "each part closes a door to guessing", "t-ink2", 13, bold)}`;
    },
    c_examples: () => {
      const a = mx(126), b = mx(354);
      const ex = ar() ? "ماكينة ٣ | ٤٥ دقيقة | سير مقطوع" : "Machine 3 | 45 min | broken belt";
      const rows = ar() ? ["ماكينة ٥ | ٢٠ دقيقة | حساس", "ماكينة ١ | ٦٠ دقيقة | موتور", "ماكينة ٢ | ١٥ دقيقة | ضغط هوا"] : ["Machine 5 | 20 min | sensor", "Machine 1 | 60 min | motor", "Machine 2 | 15 min | air pressure"];
      return `<g ${an("rise", 0.05)}>${box(a, 150, 212, 150, "f-s1 s-line2")}${txt(a, 98, ar() ? "مثال واحد منك" : "one example from you", "t-ink3", 12.5, bold)}
        ${box(a, 150, 196, 40, "f-acc-soft s-acc")}${txt(a, 155, ex, "t-ink", 11.5, bold)}</g>
      <path ${an("draw", 0.7, "s-ink2")} pathLength="1" d="M${mx(236)} 150 H ${mx(244)}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 0.9)}>${box(b, 150, 212, 190, "f-s2 s-line2")}${txt(b, 76, ar() ? "الموديل بيكمّل" : "the model continues", "t-ink3", 12.5, bold)}</g>
      ${rows.map((s, i) => `<g ${an("pop", 1.3 + i * 0.35)}>${box(b, 110 + i * 48, 196, 38, "f-s1 s-acc")}${txt(b, 115 + i * 48, s, "t-ink", 11.5, bold)}</g>`).join("")}
      ${txt(240, 290, ar() ? "نفس النمط بالظبط، من غير شرح" : "exactly the same pattern, no explanation needed", "t-ink2", 13, bold)}`;
    },
    c_window: () => {
      const n = 24, tx = (i) => (ar() ? 446 - i * 17 - 14 : 34 + i * 17), first = 5;
      const x0 = Math.min(tx(first), tx(n - 1)), x1 = Math.max(tx(first), tx(n - 1)) + 14;
      const xs = tx(first) + 7, xe = tx(n - 1) + 7, xm = (xs + xe) / 2;
      return `${Array.from({ length: n }, (_, i) => `<rect ${an("pop", 0.05 + i * 0.03, i < first ? "f-s3" : "f-acc-soft s-acc")} x="${tx(i)}" y="196" width="14" height="22" rx="3" stroke-width="1.5"${i < first ? ' opacity=".45"' : ""}/>`).join("")}
      <g ${an("rise", 0.9)}><rect x="${x0 - 6}" y="188" width="${x1 - x0 + 12}" height="38" rx="9" class="s-acc" fill="none" stroke-width="2.5"/>${txt((x0 + x1) / 2, 246, ar() ? "حد الـ Context (بالتوكنز)" : "the Context limit (in tokens)", "t-acc", 12.5, bold)}</g>
      <g ${an("fade", 1.1)}>${txt((tx(0) + tx(first - 1)) / 2 + 7, 178, ar() ? "اتلخّصت" : "summarised", "t-ink3", 11.5, bold)}</g>
      <path ${an("draw", 1.4, "s-acc")} pathLength="1" d="M${xs} 92 Q ${xm} 236 ${xe} 92" stroke-width="4" fill="none" stroke-linecap="round"/>
      <g ${an("fade", 1.9)}>${txt(xs, 80, ar() ? "أول الكلام" : "start", "t-ink2", 12, bold)}${txt(xe, 80, ar() ? "آخره" : "end", "t-ink2", 12, bold)}${txt(xm, 176, ar() ? "اهتمام أقل في النص" : "less attention in the middle", "t-rose", 12.5, bold)}</g>
      ${txt(240, 40, ar() ? "قوة الانتباه على أجزاء الـ Context" : "attention across the Context", "t-ink3", 12.5)}
      ${txt(240, 290, ar() ? "السعة محدودة، والانتباه مش متساوي" : "capacity is limited, and attention is uneven", "t-ink2", 13, bold)}`;
    },
    c_noise: () => {
      const panel = (cx, clean, d) => `
        <g ${an("rise", d)}>${box(cx, 160, 210, 250, clean ? "f-mint-soft s-mint" : "f-s1 s-line2")}${txt(cx, 54, clean ? (ar() ? "Context واضح" : "clean Context") : (ar() ? "Context مشوّش" : "noisy Context"), clean ? "t-mint" : "t-ink3", 13, 'font-weight="800"')}</g>
        ${(clean ? [[cx, false]] : [[cx + (ar() ? 46 : -46), true], [cx + (ar() ? -46 : 46), false]]).map(([x, old], i) => `<g ${an("pop", d + 0.3 + i * 0.2)}>${box(x, 96, 82, 38, old ? "f-rose-soft s-rose" : "f-s1 s-mint")}${txt(x, 101, ar() ? (old ? "سياسة ٢٠٢٣" : "سياسة ٢٠٢٦") : (old ? "2023 policy" : "2026 policy"), old ? "t-rose" : "t-mint", 12, bold)}</g>
          <path ${an("draw", d + 0.6, old ? "s-rose" : "s-mint")} pathLength="1" d="M${x} 116 L${cx} 152" stroke-width="2.5" fill="none" ${old ? 'stroke-dasharray="1"' : ""}/>`).join("")}
        <g ${an("pop", d + 0.8)}><circle cx="${cx}" cy="172" r="22" class="f-acc"/>${txt(cx, 177, ar() ? "موديل" : "model", "t-white", 11.5, bold)}</g>
        <g ${an("pop", d + 1.1)}>${box(cx, 238, 160, 36, clean ? "f-mint" : "f-rose")}${txt(cx, 243, clean ? (ar() ? "٢١ يوم، حسب سياسة ٢٠٢٦" : "21 days, per 2026 policy") : (ar() ? "١٥ يوم؟ ولا ٢١؟" : "15 days? or 21?"), "t-white", 12, bold)}</g>`;
      return `${panel(mx(124), false, 0.05)}${panel(mx(356), true, 0.9)}`;
    },
    c_steer: () => {
      const steps = ar() ? ["طلبك", "اسأل لو ناقصك حاجة", "فكّر خطوة بخطوة", "افصل المؤكد عن التخمين", "اذكر المصدر", "إجابة تقدر تراجعها"]
        : ["your request", "ask if missing", "step by step", "fact vs guess", "cite sources", "a checkable answer"];
      const pos = [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1], [0, 1]];
      const at = ([c, r]) => [ar() ? 390 - c * 150 : 90 + c * 150, 100 + r * 118];
      return `${pos.slice(1).map((p, i) => { const [x1, y1] = at(pos[i]), [x2, y2] = at(p); const h = y1 === y2; return `<path ${an("draw", 0.3 + i * 0.3, "s-acc")} pathLength="1" d="M${x1 + (h ? (x2 > x1 ? 64 : -64) : 0)} ${y1 + (h ? 0 : 28)} L${x2 + (h ? (x2 > x1 ? -64 : 64) : 0)} ${y2 - (h ? 0 : 28)}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`; }).join("")}
      ${pos.map((p, i) => { const [x, y] = at(p); return `<g ${an("pop", 0.15 + i * 0.3)}>${box(x, y, 128, 52, i === 5 ? "f-mint" : i === 0 ? "f-s2 s-line2" : "f-s1 s-acc")}${txt(x, y + 5, steps[i], i === 5 ? "t-white" : "t-ink", 11.5, bold)}</g>`; }).join("")}
      ${txt(240, 300, ar() ? "كل خطوة بيكتبها بتنضم للـ Context اللي بيبني عليه" : "every step it writes joins the Context it builds on", "t-ink3", 12.5)}`;
    },
    c_recap: () => {
      const s = ar() ? [["كلماتك الدقيقة", "Prompt"], ["المنطقة الصح", "خريطة المعاني"], ["ربط بمعلوماتك", "الانتباه + Context"], ["رد يناسب شغلك", "النتيجة"]]
        : [["precise words", "Prompt"], ["right region", "meaning map"], ["links to facts", "attention + Context"], ["fits your work", "the result"]];
      const X = rowX(4, 104, 14);
      return `${s.slice(1).map((_, i) => `<path ${an("draw", 0.4 + i * 0.35, "s-acc")} pathLength="1" d="M${X(i) + (ar() ? -54 : 54)} 120 L${X(i + 1) + (ar() ? 56 : -56)} 120" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      ${s.map(([a, b], i) => `<g ${an("pop", 0.15 + i * 0.35)}>${box(X(i), 120, 104, 58, i === 3 ? "f-acc" : "f-s1 s-acc")}${txt(X(i), 125, a, i === 3 ? "t-white" : "t-ink", 12, bold)}</g>
        <g ${an("fade", 0.4 + i * 0.35)}>${txt(X(i), 172, b, "t-ink3", 12, 'font-weight="600"')}</g>`).join("")}
      <g ${an("rise", 1.8)}>${person(240, 262, 0.85, "f-ink2")}</g>
      <g ${an("pop", 2.1)}>${box(240, 292, 300, 32, "f-mint-soft s-mint")}${txt(240, 297, ar() ? "إنت اللي بتوجّه: Prompt دقيق + Context واضح" : "you steer: a precise Prompt + a clean Context", "t-mint", 12.5, bold)}</g>`;
    }
  });

  /* ---------- drawings for "why the Context is limited" (data/window-story.js) ---------- */
  const digits = (s) => (ar() ? String(s).replace(/\d/g, (c) => "٠١٢٣٤٥٦٧٨٩"[c]) : String(s));
  const grow = (x, y, w, h, cls, d) =>   // a bar that grows from the reading start
    `<rect class="an grow ${cls}" style="--d:${d}s;transform-origin:${ar() ? "right" : "left"} center" x="${ar() ? 480 - x - w : x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(6, h / 2)}"/>`;
  const chain4 = (s, mid, pill) => {   // four boxes in a U (top row, then down, then back), a picture in the empty middle, a closing pill
    const pos = [[0, 0], [1, 0], [1, 1], [0, 1]];
    const at = ([c, r]) => [ar() ? 360 - c * 240 : 120 + c * 240, 82 + r * 128];
    const arrow = (p, q, d) => { const [x1, y1] = at(p), [x2, y2] = at(q);
      return y1 === y2 ? `<path ${an("draw", d, "s-acc")} pathLength="1" d="M${x1 + (x2 > x1 ? 107 : -107)} ${y1} L${x2 + (x2 > x1 ? -109 : 109)} ${y2}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`
        : `<path ${an("draw", d, "s-acc")} pathLength="1" d="M${x1} ${y1 + 32} L${x2} ${y2 - 34}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`; };
    return `${pos.slice(1).map((q, i) => arrow(pos[i], q, 0.4 + i * 0.4)).join("")}
      ${pos.map((p, i) => { const [x, y] = at(p); return `<g ${an("pop", 0.15 + i * 0.4)}>${box(x, y, 210, 58, i === 3 ? "f-mint" : i === 0 ? "f-acc-soft s-acc" : "f-s1 s-acc")}${txt(x, y + 5, s[i], i === 3 ? "t-white" : "t-ink", 12, bold)}</g>`; }).join("")}
      <g ${an("rise", 1.0)}>${mid(at([0, 0])[0])}</g>
      <g ${an("pop", 2.0)}>${box(240, 296, 330, 32, "f-mint-soft s-mint")}${txt(240, 301, pill, "t-mint", 12.5, bold)}</g>`;
  };
  Object.assign(ART, {
    w_forgot: () => {
      const me = mx(258), it = mx(146), clk = mx(424);
      const clock = (y, a, label, d) => `<g ${an("pop", d)}><circle cx="${clk}" cy="${y}" r="24" class="f-s1 s-ink2" stroke-width="2.5"/>
        <line x1="${clk}" y1="${y}" x2="${clk}" y2="${y - 16}" class="s-ink2" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="${clk}" y1="${y}" x2="${(clk + 11 * Math.cos(a)).toFixed(1)}" y2="${(y + 11 * Math.sin(a)).toFixed(1)}" class="s-acc" stroke-width="3.5" stroke-linecap="round"/>
        ${txt(clk, y + 44, label, "t-ink2", 13, bold)}</g>`;
      const bars = (y, ws, d) => `<g ${an("fade", d)}>${ws.map((w, i) => `<rect x="${it - 70}" y="${y + i * 16}" width="${w}" height="9" rx="4.5" class="f-s3"${ar() ? ` transform="translate(${140 - w} 0)"` : ""}/>`).join("")}</g>`;
      return `<g ${an("rise", 0.05)}>${box(mx(206), 166, 292, 278, "f-s1 s-line2")}</g>
      <g ${an("pop", 0.3)}>${box(me, 58, 176, 34, "f-acc", 0)}${txt(me, 63, ar() ? "«كل الأرقام بالجنيه»" : "“every figure in EGP”", "t-white", 12.5, bold)}</g>
      ${bars(94, [140, 104], 0.55)}
      <g ${an("rise", 0.75)}>${box(me, 142, 150, 30, "f-acc-soft s-acc")}${txt(me, 147, ar() ? "ملفات المبيعات" : "sales files", "t-ink", 12, bold)}</g>
      ${bars(172, [128, 140, 90], 0.95)}
      <g ${an("rise", 1.15)}>${box(me, 230, 150, 30, "f-acc-soft s-acc")}${txt(me, 235, ar() ? "الملخص النهائي؟" : "final summary?", "t-ink", 12, bold)}</g>
      <g ${an("pop", 1.5)}>${box(it, 274, 160, 36, "f-s2 s-ink2")}${txt(it, 279, ar() ? "الإجمالي: ١٢٬٤٠٠ $" : "Total: $12,400", "t-ink", 13, bold)}</g>
      <path ${an("draw", 1.9, "s-rose")} pathLength="1" d="M${mx(76)} 262 C ${mx(30)} 190, ${mx(70)} 90, ${mx(168)} 64" stroke-width="2.5" stroke-dasharray="1" fill="none"/>
      <g ${an("pop", 2.3)}><circle cx="${mx(50)}" cy="170" r="15" class="f-rose"/>${txt(mx(50), 176, ar() ? "؟" : "?", "t-white", 16, bold)}</g>
      ${clock(70, Math.PI, ar() ? "٩:٠٠" : "9:00", 0.2)}
      <path ${an("draw", 0.9, "s-line2")} pathLength="1" d="M${clk} 136 V 190" stroke-width="2.5" stroke-dasharray="1" fill="none"/>
      ${clock(232, -2 * Math.PI / 3, ar() ? "١١:٠٠" : "11:00", 1.3)}`;
    },
    w_table: () => {
      const X = rowX(4, 78, 10);
      const items = ar() ? ["التعليمات", "ملفاتك", "رسايلك", "ردوده"] : ["rules", "files", "messages", "replies"];
      const fx = mx(440);
      return `<g ${an("fade", 0)}>${txt(240, 72, ar() ? "الـ Context = مساحة العمل" : "the Context = the workspace", "t-acc", 15, 'font-weight="800"')}</g>
      <g ${an("rise", 0.05)}>${box(240, 176, 372, 150, "f-s2 s-acc", 2.5)}</g>
      ${items.map((s, i) => `<g ${an("pop", 0.35 + i * 0.15)}>${chip(X(i), 146, 78, s, i === 0 ? "f-s1 s-ink3" : i === 3 ? "f-mint-soft s-mint" : "f-acc-soft s-acc", "t-ink", 12.5)}</g>`).join("")}
      <g ${an("fade", 1.0)}>${[[150, 118], [240, 150], [330, 96]].map(([x, w]) => `<rect x="${x - w / 2}" y="${200}" width="${w}" height="12" rx="6" class="f-s3"/>`).join("")}${[[196, 132], [300, 110]].map(([x, w]) => `<rect x="${x - w / 2}" y="${222}" width="${w}" height="12" rx="6" class="f-s3"/>`).join("")}</g>
      <path ${an("draw", 1.35, "s-rose")} pathLength="1" d="M${mx(414)} 236 Q ${mx(436)} 246 ${fx} 270" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g transform="rotate(${ar() ? -16 : 16} ${fx} 292)"><g ${an("rise", 1.55)}>${box(fx, 292, 76, 28, "f-rose-soft s-rose", 2, 'stroke-dasharray="4 4"')}${txt(fx, 297, ar() ? "أقدم رسالة" : "oldest msg", "t-rose", 11.5, bold)}</g></g>
      ${txt(220, 310, ar() ? "بيشوف اللي جوّه المساحة بس" : "it sees only what is inside", "t-ink2", 13, bold)}`;
    },
    w_tokens: () => {
      const seg = ar() ? [["تعليمات", 56, "f-ink3"], ["ملف PDF طويل", 150, "f-acc"], ["المحادثة", 92, "f-acc-soft"], ["ردوده", 72, "f-mint"]]
        : [["rules", 56, "f-ink3"], ["a long PDF", 150, "f-acc"], ["the chat", 92, "f-acc-soft"], ["its replies", 72, "f-mint"]];
      let x = 40;
      const parts = seg.map(([s, w, c], i) => { const at = x; x += w; const cx = ar() ? 480 - at - w / 2 : at + w / 2;
        return `${grow(at, 74, w, 34, c, 0.2 + i * 0.25)}<g ${an("fade", 0.4 + i * 0.25)}>${txt(cx, 132, s, "t-ink2", 11.5, bold)}</g>`; }).join("");
      const ex = ar() ? 480 - x - 30 / 2 : x + 15;
      const row = (y, n, cls, label, d) => `<g ${an("fade", d)}>${txt(mx(96), y + 17, label, "t-ink2", 13, bold)}</g>
        ${Array.from({ length: n }, (_, k) => `<rect ${an("pop", d + 0.1 + k * 0.08, cls)} x="${ar() ? 480 - 150 - 24 - k * 30 : 150 + k * 30}" y="${y}" width="24" height="24" rx="5" stroke-width="2"/>`).join("")}
        <g ${an("fade", d + 0.2 + n * 0.08)}>${txt(ar() ? 480 - 150 - n * 30 - 18 : 150 + n * 30 + 18, y + 18, digits(n), "t-ink", 15, 'font-weight="800"')}</g>`;
      return `${txt(240, 56, ar() ? "مساحة العمل (بالتوكنز)" : "workspace (in tokens)", "t-ink3", 12.5, bold)}
      ${parts}${grow(x, 74, 30, 34, "f-s3", 1.2)}<g ${an("fade", 1.3)}>${txt(ex, 132, ar() ? "فاضي" : "free", "t-ink3", 11.5, bold)}</g>
      <rect x="40" y="74" width="400" height="34" rx="6" class="s-ink3" fill="none" stroke-width="1.5"/>
      ${row(176, 4, "f-acc-soft s-acc", ar() ? "إنجليزي" : "English", 1.4)}
      ${row(222, 8, "f-mint-soft s-mint", ar() ? "عربي" : "Arabic", 1.8)}
      ${txt(240, 290, ar() ? "نفس الجملة… توكنز أكتر بالعربي (ساعات الضعف)" : "same sentence… more tokens in Arabic (sometimes double)", "t-ink2", 12.5, bold)}`;
    },
    w_grew: () => {
      const D = [["2019", "GPT-2", 1024], ["2020", "GPT-3", 2048], ["2022", "ChatGPT", 4096], ["2023", "GPT-4", 32768], ["2023", "Claude", 100000], ["2024", "Gemini 1.5", 1000000]];
      const pg = ar() ? ["صفحة ونص", "٣ صفحات", "٦ صفحات", "٥٠ صفحة", "١٥٠ صفحة", "١٥٠٠ صفحة"] : ["1.5 pages", "3 pages", "6 pages", "50 pages", "150 pages", "1,500 pages"];
      const X = rowX(6, 50, 22), base = 240, hOf = (t) => (Math.log10(t) - 2.5) * 56;
      return `<line x1="26" y1="${base}" x2="454" y2="${base}" class="s-line2" stroke-width="2"/>
      ${D.map(([y, m, t], i) => { const h = hOf(t); return `<rect class="an vbar ${i < 3 ? "f-acc-soft s-acc" : "f-acc"}" style="--d:${0.15 + i * 0.22}s" x="${X(i) - 25}" y="${(base - h).toFixed(1)}" width="50" height="${h.toFixed(1)}" rx="6" stroke-width="2"/>
        <g ${an("fade", 0.45 + i * 0.22)}>${txt(X(i), base - h - 9, pg[i], i < 3 ? "t-ink2" : "t-acc", 11.5, bold)}</g>
        <g ${an("fade", 0.3 + i * 0.22)}>${txt(X(i), base + 20, digits(y), "t-ink", 12.5, bold)}${txt(X(i), base + 36, m, "t-ink3", 10.5, 'font-weight="600" direction="ltr"')}</g>`; }).join("")}
      ${txt(240, 306, ar() ? "الارتفاع مضغوط علشان الفرق ضخم: حوالي ألف مرة" : "heights are compressed: the gap is about a thousandfold", "t-ink3", 12.5, bold)}`;
    },
    w_grewwhy: () => {
      const R = ar() ? ["شرايح بذاكرة أكبر", "حساب أذكى", "تدريب على نصوص أطول"] : ["chips with more memory", "smarter computation", "training on longer texts"];
      const cx = mx(124), tx = mx(360), dir = ar() ? -1 : 1, ix = cx - dir * 74;
      const icon = [
        (y) => `<rect x="${ix - 9}" y="${y - 9}" width="18" height="18" rx="3" class="f-white"/>${[-5, 0, 5].map((o) => `<path d="M${ix + o} ${y - 13} v4 M${ix + o} ${y + 9} v4 M${ix - 13} ${y + o} h4 M${ix + 9} ${y + o} h4" class="s-white" stroke-width="2"/>`).join("")}`,
        (y) => `<path d="M${ix + 3} ${y - 11} l-9 13 h7 l-4 10 l11 -14 h-7z" class="f-white"/>`,
        (y) => `<rect x="${ix - 6}" y="${y - 11}" width="13" height="17" rx="2" class="f-white" opacity=".6"/><rect x="${ix - 9}" y="${y - 7}" width="13" height="17" rx="2" class="f-white"/>`
      ];
      const ys = [90, 160, 230];
      return `${ys.map((y, i) => `<g ${an("rise", 0.1 + i * 0.25)}>${box(cx, y, 204, 52, "f-s1 s-line2")}<circle cx="${ix}" cy="${y}" r="17" class="f-acc"/>${icon[i](y)}${txt(cx + dir * 20, y + 5, R[i], "t-ink", 12.5, bold)}</g>
        <path ${an("draw", 0.6 + i * 0.25, "s-acc")} pathLength="1" d="M${cx + dir * 104} ${y} C ${cx + dir * 140} ${y}, ${tx - dir * 110} 160, ${tx - dir * 70} 160" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      ${[[120, 1.7, "f-acc-soft s-acc", "٢٠٢٤", "2024"], [80, 1.4, "f-s1 s-acc", "٢٠٢٣", "2023"], [40, 1.1, "f-acc", "", ""]].map(([s, d, c, a, e]) => `<g ${an("pop", d)}><rect x="${tx - s / 2}" y="${160 - s / 2}" width="${s}" height="${s}" rx="${s / 8}" class="${c}" stroke-width="2.5"/>${a ? txt(tx, 160 - s / 2 + 15, ar() ? a : e, "t-acc", 11.5, bold) : ""}</g>`).join("")}
      <g ${an("pop", 1.2)}>${txt(tx, 165, digits(2020), "t-white", 11, bold)}</g>
      ${txt(240, 300, ar() ? "كبرت… بس كل زيادة ليها تمن" : "it grew… but every step has a price", "t-ink2", 13, bold)}`;
    },
    w_square: () => {
      const cs = 13;
      const tri = (n, cx, oy, d) => { const ox = cx - (n * cs) / 2; let s = "";
        for (let r = 0; r < n; r++) { let row = ""; for (let c = 0; c <= r; c++) row += `<rect x="${ar() ? ox + (n - 1 - c) * cs : ox + c * cs}" y="${oy + r * cs}" width="${cs - 2}" height="${cs - 2}" rx="2" class="${c === r ? "f-acc" : "f-acc-soft"}"/>`;
          s += `<g ${an("fade", d + r * 0.07)}>${row}</g>`; }
        return s; };
      const a = mx(96), b = mx(268), c = mx(414);
      return `${tri(4, a, 100, 0.1)}${tri(8, b, 74, 0.6)}
      <g ${an("fade", 0.4)}>${txt(a, 194, ar() ? "٤ كلمات" : "4 words", "t-ink2", 12.5, bold)}${txt(a, 214, ar() ? "١٠ نظرات" : "10 looks", "t-acc", 14, 'font-weight="800"')}</g>
      <path ${an("draw", 0.5, "s-ink3")} pathLength="1" d="M${mx(136)} 126 L ${mx(196)} 126" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.3)}>${txt(b, 202, ar() ? "٨ كلمات" : "8 words", "t-ink2", 12.5, bold)}${txt(b, 222, ar() ? "٣٦ نظرة" : "36 looks", "t-acc", 14, 'font-weight="800"')}</g>
      <g ${an("rise", 1.7)}>${txt(c, 104, ar() ? "مليون توكن" : "a million tokens", "t-ink2", 12.5, bold)}</g>
      <path ${an("draw", 1.9, "s-rose")} pathLength="1" d="M${c} 116 V 140" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 2.1)}>${txt(c, 166, ar() ? "≈ ٥٠٠ مليار" : "≈ 500 billion", "t-rose", 16, 'font-weight="800"')}${txt(c, 186, ar() ? "نظرة، في كل طبقة" : "looks, in every layer", "t-ink3", 11.5, bold)}</g>
      <g ${an("pop", 2.4)}>${box(mx(182), 266, 236, 34, "f-acc-soft s-acc")}${txt(mx(182), 271, ar() ? "ضعف الكلام ≈ ٤ أضعاف الشغل" : "double the text ≈ 4× the work", "t-acc", 13, bold)}</g>`;
    },
    w_cost: () => {
      const R = ar() ? ["ذاكرة الشريحة", "وقت الرد", "التكلفة"] : ["chip memory", "reply time", "cost"];
      const long = [234, 196, 252], short = [52, 60, 44];
      return `<g ${an("fade", 0.05)}><circle cx="${mx(176)}" cy="46" r="7" class="f-mint"/>${txt(mx(232), 51, ar() ? "محادثة قصيرة" : "short chat", "t-ink2", 12.5, bold)}
        <circle cx="${mx(308)}" cy="46" r="7" class="f-rose"/>${txt(mx(364), 51, ar() ? "محادثة طويلة" : "long chat", "t-ink2", 12.5, bold)}</g>
      ${R.map((s, i) => { const y = 102 + i * 64; return `<g ${an("fade", 0.15 + i * 0.2)}>${txt(mx(82), y + 5, s, "t-ink", 12.5, bold)}</g>
        ${grow(150, y - 17, short[i], 14, "f-mint", 0.3 + i * 0.2)}${grow(150, y + 5, long[i], 14, "f-rose", 0.6 + i * 0.2)}`; }).join("")}
      <line x1="${mx(146)}" y1="74" x2="${mx(146)}" y2="250" class="s-line2" stroke-width="2"/>
      <g ${an("rise", 1.5)}>${box(240, 290, 330, 34, "f-s2 s-line2")}${txt(240, 295, ar() ? "كل رسالة بتتقري معاها المساحة كلها" : "every message is read with the whole workspace", "t-ink2", 12.5, bold)}</g>`;
    },
    w_middle: () => {
      const X = rowX(15, 22, 6), lit = (i) => i < 3 || i > 11, key = 7;
      const beam = (i, d) => `<path ${an("fade", d, "f-acc")} d="M${X(i)} 50 L${Math.min(X(i - 1), X(i + 1)) - 14} 132 L${Math.max(X(i - 1), X(i + 1)) + 14} 132 Z" fill-opacity=".16"/><circle ${an("pop", d, "f-amber")} cx="${X(i)}" cy="48" r="8"/>`;
      return `${beam(1, 0.9)}${beam(13, 1.0)}
      ${Array.from({ length: 15 }, (_, i) => `<g ${an("rise", 0.05 + i * 0.04)}><rect x="${X(i) - 11}" y="${136}" width="22" height="30" rx="3" class="${i === key ? "f-rose-soft s-rose" : lit(i) ? "f-acc-soft s-acc" : "f-s1 s-line2"}" stroke-width="1.6"${!lit(i) && i !== key ? ' opacity=".6"' : ""}/><rect x="${X(i) - 6}" y="146" width="12" height="3" rx="1.5" class="f-s3"/><rect x="${X(i) - 6}" y="153" width="9" height="3" rx="1.5" class="f-s3"/></g>`).join("")}
      <g ${an("pop", 1.4)}>${box(X(key), 96, 120, 30, "f-rose", 0)}${txt(X(key), 101, ar() ? "الشرط المهم" : "the key clause", "t-white", 12, bold)}</g>
      <path ${an("draw", 1.6, "s-rose")} pathLength="1" d="M${X(key)} 112 V 132" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.2)}>${txt(X(1), 190, ar() ? "أول الكلام" : "start", "t-acc", 12, bold)}${txt(X(13), 190, ar() ? "آخره" : "end", "t-acc", 12, bold)}${txt(X(key), 190, ar() ? "انتباه أقل" : "less attention", "t-rose", 12, bold)}</g>
      ${txt(240, 252, ar() ? "عقد ٣٠٠ صفحة دخل كله… والشرط في صفحة ١٥٠ عدّى" : "a 300-page contract fits… and the clause on p. 150 slips by", "t-ink2", 12.5, bold)}
      ${txt(240, 284, ar() ? "موجود في المساحة ≠ واخد انتباه" : "in the workspace ≠ paid attention to", "t-ink3", 12.5, bold)}`;
    },
    w_falloff: () => {
      const rows = ar() ? [["ملف المبيعات", 1], ["رده: جدول", 0], ["طلب تعديل", 1], ["رده: التعديل", 0]] : [["sales file", 1], ["reply: table", 0], ["edit request", 1], ["reply: edit", 0]];
      const side = mx(424);
      return `<g ${an("rise", 0.05)}>${box(240, 170, 232, 196, "f-s2 s-acc", 2.5)}</g>
      ${rows.map(([s, me], i) => `<g ${an("fade", 0.2 + i * 0.12)}>${box(240 + (me ? 1 : -1) * (ar() ? -16 : 16), 98 + i * 38, 176, 28, me ? "f-acc-soft s-acc" : "f-s1 s-line2")}${txt(240 + (me ? 1 : -1) * (ar() ? -16 : 16), 103 + i * 38, s, "t-ink", 12, bold)}</g>`).join("")}
      <g ${an("pop", 0.9)}>${box(240, 250, 176, 28, "f-mint", 0)}${txt(240, 255, ar() ? "اكتب الملخص" : "write the summary", "t-white", 12, bold)}</g>
      <g ${an("rise", 1.3)}>${box(240, 34, 200, 30, "f-rose-soft s-rose", 2, 'stroke-dasharray="5 4"')}${txt(240, 39, ar() ? "«كل الأرقام بالجنيه»" : "“every figure in EGP”", "t-rose", 12, bold)}</g>
      <path ${an("draw", 1.1, "s-rose")} pathLength="1" d="M240 70 V 54" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.4)}>${txt(side, 39, ar() ? "بيقع" : "falls off", "t-rose", 12.5, bold)}${txt(side, 255, ar() ? "بيدخل" : "comes in", "t-mint", 12.5, bold)}</g>
      ${txt(240, 300, ar() ? "أقدم رسالة = أول رسالة تقع" : "the oldest message falls first", "t-ink2", 13, bold)}`;
    },
    w_compact: () => {
      const a = mx(110), b = mx(380);
      const keep = ar() ? ["بالجنيه", "ما عدا طنطا", "٣٫٧٪"] : ["in EGP", "except Tanta", "3.7%"];
      const lines = [0, 1, 0, 2, 0, 3];
      return `<g ${an("rise", 0.05)}>${box(a, 162, 176, 216, "f-s1 s-line2")}${txt(a, 76, ar() ? "المحادثة القديمة" : "the old chat", "t-ink3", 12, bold)}</g>
      ${lines.map((k, i) => { const y = 102 + i * 28; return `<g ${an("fade", 0.2 + i * 0.08)}>${k ? `${box(a, y, 116, 22, "f-acc-soft s-acc", 1.6)}${txt(a, y + 4, keep[k - 1], "t-ink", 11.5, bold)}` : `<rect x="${a - 62}" y="${y - 5}" width="124" height="10" rx="5" class="f-s3"/>`}</g>`; }).join("")}
      <path ${an("pop", 0.9, "f-acc-soft s-acc")} d="M${mx(206)} 104 L${mx(262)} 144 L${mx(262)} 176 L${mx(206)} 216 Z" stroke-width="2"/>
      <path ${an("draw", 1.2, "s-ink2")} pathLength="1" d="M${mx(266)} 160 H ${mx(292)}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.4)}>${box(b, 126, 164, 78, "f-mint-soft s-mint")}${txt(b, 110, ar() ? "الملخص" : "the summary", "t-mint", 12.5, 'font-weight="800"')}${txt(b, 134, ar() ? "تقرير مبيعات الربع" : "quarterly sales report", "t-ink2", 11.5, bold)}${txt(b, 152, ar() ? "للمدير" : "for the manager", "t-ink2", 11.5, bold)}</g>
      <g ${an("fade", 1.8)}>${txt(b, 190, ar() ? "ضاع في التلخيص" : "lost in the summary", "t-rose", 12, bold)}</g>
      ${keep.map((s, i) => { const y = 214 + i * 28; return `<g ${an("rise", 1.9 + i * 0.15)}>${box(b, y, 110, 22, "f-rose-soft s-rose", 1.6, 'stroke-dasharray="4 3"')}${txt(b, y + 4, s, "t-rose", 11.5, bold)}</g>
        <path ${an("draw", 2.2 + i * 0.15, "s-rose")} pathLength="1" d="M${b - 46} ${y} H ${b + 46}" stroke-width="2" fill="none"/>`; }).join("")}
      ${txt(240, 306, ar() ? "الملخص بيحفظ الفكرة… ويضيّع التفاصيل" : "a summary keeps the gist… and drops the details", "t-ink2", 13, bold)}`;
    },
    w_habits: () => {
      const H = ar() ? ["الشروط المهمة في الأول، وكرّرها في الطلب المهم", "مهمة جديدة = محادثة جديدة + ملخص منك", "ادّيله الجزء اللي يخصه من الملف", "قبل الخطوة الكبيرة: «إيه الشروط اللي معاك؟»", "ورقة Context محفوظة برّه المحادثة"]
        : ["state key rules first, repeat them later", "new task = new chat + your summary", "give only the part of the file it needs", "before a big step: “which rules do you hold?”", "a Context sheet saved outside the chat"];
      const bx = mx(262), nx = mx(68), ck = mx(414);
      return `${H.map((s, i) => { const y = 58 + i * 50; return `<g ${an("rise", 0.1 + i * 0.2)}>${box(bx, y, 336, 38, i === 4 ? "f-acc-soft s-acc" : "f-s1 s-line2")}<circle cx="${nx}" cy="${y}" r="17" class="f-acc"/>${txt(nx, y + 6, digits(i + 1), "t-white", 15, 'font-weight="800"')}${txt(bx - (ar() ? -10 : 10), y + 5, s, "t-ink", 12.5, bold)}</g>
        <g ${an("pop", 0.5 + i * 0.2)}><circle cx="${ck}" cy="${y}" r="10" class="f-mint"/><path d="M${ck - 5} ${y} l3.5 3.5 l6.5 -7" class="s-white" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }).join("")}
      <g ${an("pop", 1.4)}>${box(240, 304, 200, 28, "f-acc", 0)}${txt(240, 309, ar() ? "إنت اللي بتحدد اللي يدخل" : "you decide what goes in", "t-white", 13, bold)}</g>`;
    },
    w_recap: () => chain4(ar() ? ["مساحة محدودة", "اللي يخرج منها بيتنسى", "الامتلاء: أبطأ وأغلى وأقل تركيز", "إنت بتختار اللي جوّاها"]
      : ["a limited workspace", "what drops out is forgotten", "full = slower, dearer, blurrier", "you choose what's inside"],
      (x) => `<rect x="${x - 34}" y="138" width="68" height="42" rx="8" class="f-s2 s-acc" stroke-width="2.5"/><rect x="${x - 24}" y="148" width="48" height="7" rx="3.5" class="f-s3"/><rect x="${x - 24}" y="162" width="34" height="7" rx="3.5" class="f-acc-soft"/>`,
      ar() ? "اللي جوّه المساحة بس هو اللي موجود" : "only what is inside exists")
  });

  /* ---------- drawings for "chat, memory and agents" (data/agents-story.js) ---------- */
  const dirx = () => (ar() ? -1 : 1);   // +1 points toward the reading end
  Object.assign(ART, {
    a_task: () => {
      const steps = ar() ? ["اسحب الملف", "قارن باللي فات", "اكتب الملخص", "ابعته للمدير"] : ["pull the file", "compare weeks", "write summary", "email manager"];
      const ways = ar() ? ["شات", "مساعد", "وكيل"] : ["chat", "assistant", "agent"];
      const X = rowX(4, 104, 12), Y = rowX(3, 112, 34);
      return `<g ${an("pop", 0.05)}>${box(240, 50, 318, 40, "f-acc", 0)}${txt(240, 56, ar() ? "تقرير التوقفات الأسبوعي · كل أحد" : "weekly stoppage report · every Sunday", "t-white", 13.5, bold)}</g>
      ${steps.map((s, i) => `<g ${an("rise", 0.3 + i * 0.15)}>${box(X(i), 134, 104, 48, "f-s1 s-line2")}<circle cx="${X(i)}" cy="110" r="11" class="f-acc"/>${txt(X(i), 114, digits(i + 1), "t-white", 11.5, bold)}${txt(X(i), 143, s, "t-ink", 11.5, bold)}</g>`).join("")}
      ${ways.map((_, i) => `<path ${an("draw", 1.0 + i * 0.12, "s-line2")} pathLength="1" d="M240 162 C 240 200, ${Y(i)} 196, ${Y(i)} 226" stroke-width="2" stroke-dasharray="1" fill="none"/>`).join("")}
      ${ways.map((s, i) => `<g ${an("pop", 1.3 + i * 0.15)}>${box(Y(i), 248, 112, 40, ["f-s1 s-line2", "f-acc-soft s-acc", "f-acc"][i])}${txt(Y(i), 254, s, i === 2 ? "t-white" : "t-ink", 13.5, 'font-weight="800"')}</g>`).join("")}
      ${txt(240, 302, ar() ? "نفس المهمة… تلات طرق" : "one task… three ways", "t-ink2", 13, bold)}`;
    },
    a_chat: () => {
      const a = mx(124), b = mx(356), side = (cx, me) => cx + (me ? 1 : -1) * dirx() * 30;
      const win = (cx, label, d) => `<g ${an("rise", d)}>${txt(cx, 44, label, "t-ink3", 12.5, bold)}${box(cx, 168, 200, 220, "f-s1 s-line2")}</g>`;
      const bars = (cx, y, ws, d) => `<g ${an("fade", d)}>${ws.map((w, i) => `<rect x="${side(cx, false) - w / 2}" y="${y + i * 14}" width="${w}" height="8" rx="4" class="f-s3"/>`).join("")}</g>`;
      return `${win(a, ar() ? "الأحد اللي فات" : "last Sunday", 0.05)}
      <g ${an("pop", 0.3)}>${box(side(a, true), 88, 120, 26, "f-acc-soft s-acc")}${txt(side(a, true), 93, ar() ? "الملف + الطلب" : "file + request", "t-ink", 11.5, bold)}</g>
      ${bars(a, 114, [120, 96], 0.45)}
      <g ${an("pop", 0.6)}>${box(side(a, true), 168, 120, 26, "f-acc-soft s-acc")}${txt(side(a, true), 173, ar() ? "الشكل كده" : "format: like this", "t-ink", 11.5, bold)}</g>
      ${bars(a, 194, [110, 84], 0.75)}
      <g ${an("pop", 0.9)}>${box(side(a, false), 250, 120, 28, "f-mint", 0)}${txt(side(a, false), 255, ar() ? "التقرير ✓" : "report ✓", "t-white", 12, bold)}</g>
      <path ${an("draw", 1.1, "s-ink3")} pathLength="1" d="M${mx(228)} 168 H ${mx(250)}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      ${win(b, ar() ? "الأحد ده" : "this Sunday", 1.2)}
      <g ${an("pop", 1.5)}>${box(side(b, true), 92, 124, 26, "f-acc-soft s-acc")}${txt(side(b, true), 97, ar() ? "تقرير الأسبوع" : "this week's report", "t-ink", 11.5, bold)}</g>
      <g ${an("pop", 1.8)}>${box(side(b, false), 140, 140, 44, "f-s2 s-line2")}${txt(side(b, false), 136, ar() ? "تقرير إيه؟ ابعتلي" : "which report? send", "t-ink2", 11, bold)}${txt(side(b, false), 152, ar() ? "الملف والشكل" : "the file and format", "t-ink2", 11, bold)}</g>
      <g ${an("fade", 2.1)}>${box(b, 222, 160, 60, "f-s1 s-line2", 1.6, 'stroke-dasharray="5 5"')}${txt(b, 227, ar() ? "مساحة فاضية" : "an empty workspace", "t-ink3", 12, bold)}</g>
      ${txt(240, 306, ar() ? "كل محادثة جديدة بتبدأ من الصفر" : "every new chat starts from zero", "t-ink2", 13, bold)}`;
    },
    a_where: () => {
      const nb = mx(82), tb = mx(252), md = mx(410);
      return `<g ${an("rise", 0.05)}>${box(nb, 150, 116, 150, "f-s1 s-amber", 2.5)}${[0, 1, 2, 3, 4].map((i) => `<circle cx="${nb - dirx() * 58}" cy="${94 + i * 28}" r="4" class="f-amber"/>`).join("")}
        ${txt(nb, 104, ar() ? "مديري: منى" : "manager: Mona", "t-ink2", 11, bold)}${txt(nb, 130, ar() ? "قسم الجودة" : "quality dept.", "t-ink2", 11, bold)}${txt(nb, 156, ar() ? "التقرير جدول" : "report as table", "t-ink2", 11, bold)}${[180, 202].map((y) => `<rect x="${nb - 36}" y="${y}" width="72" height="8" rx="4" class="f-s3"/>`).join("")}
        ${txt(nb, 248, ar() ? "دفتر الذاكرة (برّه)" : "notebook (outside)", "t-amber", 12, bold)}</g>
      <g ${an("rise", 0.4)}>${box(tb, 200, 170, 104, "f-s2 s-acc", 2.5)}${txt(tb, 168, ar() ? "مساحة العمل" : "the workspace", "t-acc", 12.5, 'font-weight="800"')}
        <rect x="${tb - 64}" y="180" width="128" height="12" rx="6" class="f-s3"/><rect x="${tb - 64}" y="222" width="100" height="12" rx="6" class="f-acc-soft"/></g>
      ${grow(252 - 64, 200, 112, 12, "f-amber", 1.2)}
      <path ${an("draw", 0.9, "s-amber")} pathLength="1" d="M${nb + dirx() * 60} 168 C ${nb + dirx() * 84} 168, ${tb - dirx() * 110} 206, ${tb - dirx() * 88} 206" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 0.2)}><circle cx="${md}" cy="96" r="38" class="f-acc"/>${txt(md, 101, ar() ? "الموديل" : "model", "t-white", 13, bold)}</g>
      <g ${an("fade", 0.5)}>${txt(md, 152, ar() ? "أوزانه ما بتتغيّرش" : "weights don't change", "t-ink3", 11.5, bold)}</g>
      <path ${an("draw", 1.5, "s-acc")} pathLength="1" d="M${tb + dirx() * 88} 182 L ${md - dirx() * 30} 124" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <path ${an("draw", 1.8, "s-rose")} pathLength="1" d="M${nb} 72 C ${nb} 30, ${md - dirx() * 60} 30, ${md - dirx() * 40} 66" stroke-width="2" stroke-dasharray="1" fill="none"/>
      <g ${an("pop", 2.1)}><circle cx="${mx(236)}" cy="40" r="11" class="f-rose"/><path d="M${mx(236) - 4} 36 l8 8 M${mx(236) + 4} 36 l-8 8" class="s-white" stroke-width="2.4" stroke-linecap="round"/>${txt(mx(236), 70, ar() ? "مش بيدخل جوّه الموديل" : "never goes inside the model", "t-rose", 11.5, bold)}</g>
      ${txt(240, 300, ar() ? "الذاكرة ملاحظات برّه… بتدخل مساحة العمل" : "memory is notes outside… placed in the workspace", "t-ink2", 13, bold)}`;
    },
    a_kinds: () => {
      const K = ar() ? [["تعليمات ثابتة إنت كاتبها", "f-acc"], ["ذاكرة تلقائية من محادثاتك", "f-amber"], ["ملفات المشروع (بيدوّر فيها)", "f-mint"]]
        : [["fixed instructions you wrote", "f-acc"], ["automatic memory from chats", "f-amber"], ["project files (searched)", "f-mint"]];
      const cx = mx(128), tb = mx(386), ys = [76, 156, 236], bw = [104, 80, 56];
      return `<g ${an("rise", 0.05)}>${box(tb, 160, 150, 214, "f-s2 s-acc", 2.5)}${txt(tb, 74, ar() ? "مساحة العمل" : "the workspace", "t-acc", 12.5, 'font-weight="800"')}
        <rect x="${tb - 56}" y="214" width="112" height="12" rx="6" class="f-s3"/><rect x="${tb - 56}" y="234" width="84" height="12" rx="6" class="f-s3"/>${txt(tb, 264, ar() ? "رسالتك" : "your message", "t-ink3", 11, bold)}</g>
      ${K.map(([s, c], i) => `<g ${an("rise", 0.2 + i * 0.25)}>${box(cx, ys[i], 214, 52, "f-s1 s-line2")}<circle cx="${cx - dirx() * 84}" cy="${ys[i]}" r="13" class="${c}"/>${txt(cx + dirx() * 16, ys[i] + 5, s, "t-ink", 11.5, bold)}</g>
        <path ${an("draw", 0.7 + i * 0.25, "s-ink3")} pathLength="1" d="M${cx + dirx() * 108} ${ys[i]} C ${cx + dirx() * 140} ${ys[i]}, ${tb - dirx() * 110} ${110 + i * 26}, ${tb - dirx() * 80} ${110 + i * 26}" stroke-width="2" fill="none" marker-end="url(#aih-arrow)"/>
        ${grow(386 - 56, 104 + i * 26, bw[i], 13, c, 1.0 + i * 0.25)}`).join("")}
      <g ${an("fade", 1.8)}>${txt(tb, 196, ar() ? "من الملفات: اللي يلزم بس" : "from files: only what's needed", "t-mint", 10.5, bold)}</g>
      ${txt(240, 304, ar() ? "التلاتة في الآخر سطور في نفس المساحة" : "all three end up as lines in the same workspace", "t-ink2", 13, bold)}`;
    },
    a_stale: () => {
      const seg = ar() ? [["الذاكرة", 120, "f-amber"], ["ملفك", 150, "f-acc"], ["سؤالك", 60, "f-acc-soft"]] : [["memory", 120, "f-amber"], ["your file", 150, "f-acc"], ["question", 60, "f-acc-soft"]];
      let x = 40;
      const bar = seg.map(([s, w, c], i) => { const at = x; x += w; const cx = ar() ? 480 - at - w / 2 : at + w / 2;
        return `${grow(at, 56, w, 30, c, 0.1 + i * 0.2)}<g ${an("fade", 0.3 + i * 0.2)}>${txt(cx, 104, s, "t-ink2", 11.5, bold)}</g>`; }).join("");
      const card = mx(110), mdl = mx(262), rp = mx(394);
      return `${bar}<rect x="40" y="56" width="400" height="30" rx="6" class="s-ink3" fill="none" stroke-width="1.5"/>
      <g ${an("rise", 0.8)}>${box(card, 162, 196, 36, "f-rose-soft s-rose")}${txt(card, 167, ar() ? "المدير: أحمد (من ٦ شهور)" : "manager: Ahmed (6 months ago)", "t-rose", 11.5, bold)}</g>
      <g ${an("rise", 1.0)}>${box(card, 226, 196, 36, "f-mint-soft s-mint")}${txt(card, 231, ar() ? "المديرة: منى (دلوقتي)" : "manager: Mona (now)", "t-mint", 11.5, bold)}</g>
      <path ${an("draw", 1.2, "s-rose")} pathLength="1" d="M${card + dirx() * 100} 162 L ${mdl - dirx() * 26} 188" stroke-width="2.5" fill="none"/>
      <path ${an("draw", 1.3, "s-mint")} pathLength="1" d="M${card + dirx() * 100} 226 L ${mdl - dirx() * 26} 202" stroke-width="2.5" fill="none"/>
      <g ${an("pop", 1.4)}><circle cx="${mdl}" cy="195" r="24" class="f-acc"/>${txt(mdl, 200, ar() ? "موديل" : "model", "t-white", 11.5, bold)}</g>
      <path ${an("draw", 1.6, "s-ink2")} pathLength="1" d="M${mdl + dirx() * 28} 195 H ${rp - dirx() * 64}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.8)}>${box(rp, 195, 120, 40, "f-rose", 0)}${txt(rp, 201, ar() ? "إلى: أحمد؟" : "To: Ahmed?", "t-white", 13, bold)}</g>
      ${txt(240, 296, ar() ? "معلومة قديمة في الذاكرة بتشدّ للغلط" : "a stale memory pulls toward the wrong answer", "t-ink2", 13, bold)}`;
    },
    a_assistant: () => {
      const sat = ar() ? ["شكل التقرير", "تقارير قديمة", "أسماء الخطوط"] : ["report format", "past reports", "line names"];
      const X = rowX(3, 136, 12), c = [240, 146], inp = mx(84), out = mx(396);
      return `${sat.map((s, i) => `<path ${an("draw", 0.5 + i * 0.1, "s-amber")} pathLength="1" d="M${X(i)} 72 L ${c[0] + (X(i) - 240) * 0.3} ${c[1] - 38}" stroke-width="2" fill="none"/>
        <g ${an("pop", 0.15 + i * 0.15)}>${box(X(i), 52, 136, 38, "f-s1 s-amber")}${txt(X(i), 57, s, "t-ink", 12, bold)}</g>`).join("")}
      <g ${an("pop", 0.7)}><circle cx="${c[0]}" cy="${c[1]}" r="44" class="f-acc"/>${txt(c[0], c[1] + 5, ar() ? "المساعد" : "assistant", "t-white", 13.5, 'font-weight="800"')}</g>
      <g ${an("rise", 1.0)}>${box(inp, 222, 150, 44, "f-acc-soft s-acc")}${txt(inp, 218, ar() ? "«تقرير الأسبوع»" : "“this week's report”", "t-ink", 11.5, bold)}${txt(inp, 234, ar() ? "+ الملف" : "+ the file", "t-ink2", 11, bold)}</g>
      <path ${an("draw", 1.2, "s-ink2")} pathLength="1" d="M${inp + dirx() * 40} 198 L ${c[0] - dirx() * 34} ${c[1] + 26}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <path ${an("draw", 1.4, "s-ink2")} pathLength="1" d="M${c[0] + dirx() * 34} ${c[1] + 26} L ${out - dirx() * 40} 198" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.6)}>${box(out, 222, 150, 44, "f-mint", 0)}${txt(out, 218, ar() ? "تقرير بالشكل" : "report in the", "t-white", 11.5, bold)}${txt(out, 234, ar() ? "المعتاد ✓" : "usual format ✓", "t-white", 11.5, bold)}</g>
      ${[[mx(130), ar() ? "إنت بتسحب الملف" : "you pull the file"], [mx(350), ar() ? "إنت بتبعت الإيميل" : "you send the email"]].map(([x, s], i) => `<g ${an("rise", 1.9 + i * 0.15)}>${box(x, 290, 176, 32, "f-s2 s-line2")}${txt(x, 295, s, "t-ink2", 12, bold)}</g>`).join("")}`;
    },
    a_loop: () => {
      const cx = mx(196), cy = 162, r = 100, d = dirx();
      const N = ar() ? ["يخطط", "ينفّذ بأداة", "يشوف النتيجة", "يصحّح"] : ["plan", "act with a tool", "check the result", "correct"];
      const ang = [-90, 0, 90, 180], pt = (a) => [cx + d * r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
      const sweep = ar() ? 0 : 1;
      const arcs = ang.map((a, i) => { const [x1, y1] = pt(a + 30), [x2, y2] = pt(a + 62);
        return `<path ${an("draw", 0.6 + i * 0.3, "s-acc")} pathLength="1" d="M${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`; }).join("");
      const ring = `M${cx} ${cy - r} A ${r} ${r} 0 1 ${sweep} ${cx} ${cy + r} A ${r} ${r} 0 1 ${sweep} ${cx} ${cy - r}`;
      const side = mx(410);
      return `<circle cx="${cx}" cy="${cy}" r="${r}" class="s-line2" fill="none" stroke-width="2" stroke-dasharray="4 6"/>${arcs}
      <circle class="an travel f-acc" r="6"><animateMotion dur="4s" begin="indefinite" repeatCount="indefinite" path="${ring}"/></circle>
      ${ang.map((a, i) => { const [x, y] = pt(a); return `<g ${an("pop", 0.3 + i * 0.3)}>${box(x, y, 100, 34, i === 1 ? "f-acc" : "f-s1 s-acc")}${txt(x, y + 5, N[i], i === 1 ? "t-white" : "t-ink", 12, bold)}</g>`; }).join("")}
      <g ${an("fade", 0.15)}>${txt(cx, cy - 6, ar() ? "الهدف" : "the goal", "t-ink3", 11.5, bold)}${txt(cx, cy + 14, ar() ? "تقرير الأسبوع" : "weekly report", "t-acc", 13, 'font-weight="800"')}</g>
      <g ${an("rise", 1.7)}>${box(side, 96, 112, 50, "f-rose-soft s-rose")}${txt(side, 92, ar() ? "بيقف عند" : "stops at", "t-rose", 11.5, bold)}${txt(side, 109, ar() ? "الهدف أو الحد" : "goal or limit", "t-rose", 11.5, bold)}</g>
      <g ${an("rise", 1.9)}>${box(side, 232, 112, 50, "f-mint-soft s-mint")}${txt(side, 228, ar() ? "موافقتك" : "your approval", "t-mint", 11.5, bold)}${txt(side, 245, ar() ? "قبل الإرسال" : "before sending", "t-mint", 11.5, bold)}</g>
      ${txt(cx, 306, ar() ? "بيكرر الدورة لحد ما يخلص" : "it repeats the loop until done", "t-ink2", 13, bold)}`;
    },
    a_tools: () => {
      const m = mx(48), rq = mx(156), gt = mx(278), tl = mx(418), d = dirx();
      const T = [[62, "f-mint-soft s-mint", ar() ? "ملفات" : "files", `<rect x="-8" y="-11" width="16" height="21" rx="2" class="f-s1 s-mint" stroke-width="2"/><path d="M-4 -3h8M-4 3h8" class="s-mint" stroke-width="2"/>`],
        [132, "f-mint-soft s-mint", ar() ? "حساب" : "calculate", `<rect x="-9" y="-11" width="18" height="22" rx="3" class="f-s1 s-mint" stroke-width="2"/><path d="M-5 -5h10M-4 3h2M2 3h2M-4 8h2M2 8h2" class="s-mint" stroke-width="2"/>`],
        [202, "f-rose-soft s-rose", ar() ? "إرسال: بإذنك" : "send: ask you", `<rect x="-11" y="-8" width="22" height="16" rx="3" class="f-s1 s-rose" stroke-width="2"/><path d="M-11 -6 l11 8 l11 -8" class="s-rose" stroke-width="2" fill="none"/>`]];
      return `<g ${an("pop", 0.05)}><circle cx="${m}" cy="124" r="30" class="f-acc"/>${txt(m, 129, ar() ? "موديل" : "model", "t-white", 11.5, bold)}</g>
      <path ${an("draw", 0.3, "s-ink2")} pathLength="1" d="M${m + d * 32} 124 H ${rq - d * 70}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 0.45)}>${box(rq, 124, 132, 58, "f-s1 s-acc")}${txt(rq, 118, ar() ? "«اقرا ملف" : "“read file", "t-ink", 11.5, bold)}${txt(rq, 136, ar() ? "توقفات.xlsx»" : "stoppages.xlsx”", "t-ink", 11.5, ar() ? bold : 'font-weight="700" direction="ltr"')}</g>
      <path ${an("draw", 0.7, "s-ink2")} pathLength="1" d="M${rq + d * 68} 124 H ${gt - d * 50}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 0.85)}>${box(gt, 124, 96, 78, "f-s2 s-ink3")}${txt(gt, 116, ar() ? "البرنامج" : "the program", "t-ink", 12, bold)}<g transform="translate(${gt} 140)"><rect x="-8" y="-3" width="16" height="12" rx="2" class="f-amber"/><path d="M-5 -3 v-4 a5 5 0 0 1 10 0 v4" class="s-amber" stroke-width="2.2" fill="none"/></g>${txt(gt, 176, ar() ? "الصلاحيات" : "permissions", "t-amber", 11, bold)}</g>
      ${T.map(([y, c, s, ic], i) => `<path ${an("draw", 1.1 + i * 0.12, i === 2 ? "s-rose" : "s-mint")} pathLength="1" d="M${gt + d * 50} 124 L ${tl - d * 26} ${y}" stroke-width="2" fill="none"${i === 2 ? ' stroke-dasharray="1"' : ""}/>
        <g ${an("pop", 1.3 + i * 0.15)}><circle cx="${tl}" cy="${y}" r="22" class="${c}" stroke-width="2"/><g transform="translate(${tl} ${y})">${ic}</g>${txt(tl, y + 38, s, i === 2 ? "t-rose" : "t-ink2", 10.5, bold)}</g>`).join("")}
      <path ${an("draw", 1.9, "s-mint")} pathLength="1" d="M${tl} 252 C ${tl} 282, ${mx(300)} 282, ${mx(330)} 282" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 2.1)}>${box(mx(206), 282, 236, 30, "f-mint-soft s-mint")}${txt(mx(206), 287, ar() ? "النتيجة بتدخل مساحة العمل" : "the result goes into the workspace", "t-mint", 12, bold)}</g>
      <path ${an("draw", 2.3, "s-mint")} pathLength="1" d="M${mx(86)} 282 C ${m} 282, ${m} 200, ${m} 158" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`;
    },
    a_fills: () => {
      const A1 = ar() ? [["ملف إكسل", 120, "f-acc"], ["بحث", 60, "f-amber"], ["خطأ", 40, "f-rose"], ["إعادة", 40, "f-rose-soft s-rose"], ["خطوات", 70, "f-acc-soft"]]
        : [["Excel file", 120, "f-acc"], ["search", 60, "f-amber"], ["error", 40, "f-rose"], ["retry", 40, "f-rose-soft s-rose"], ["steps", 70, "f-acc-soft"]];
      const C1 = ar() ? [["رسايلك", 56, "f-acc-soft"], ["ردوده", 50, "f-mint"]] : [["messages", 56, "f-acc-soft"], ["replies", 50, "f-mint"]];
      const row = (segs, y, d0) => { let x = 110; return segs.map(([s, w, c], i) => { const at = x; x += w; const cx = ar() ? 480 - at - w / 2 : at + w / 2;
        return `${grow(at, y, w, 30, c, d0 + i * 0.22)}<g ${an("fade", d0 + 0.1 + i * 0.22)}>${txt(cx, y + 50, s, "t-ink2", 10.5, bold)}</g>`; }).join(""); };
      const lim = mx(440);
      return `<g ${an("fade", 0.05)}>${txt(mx(58), 98, ar() ? "وكيل" : "agent", "t-ink", 13, 'font-weight="800"')}${txt(mx(58), 116, ar() ? "نص ساعة" : "half an hour", "t-ink3", 11, bold)}
        ${txt(mx(58), 208, ar() ? "شات" : "chat", "t-ink", 13, 'font-weight="800"')}${txt(mx(58), 226, ar() ? "يوم كامل" : "a whole day", "t-ink3", 11, bold)}</g>
      <rect x="${ar() ? 40 : 110}" y="88" width="330" height="30" rx="6" class="s-ink3" fill="none" stroke-width="1.5"/><rect x="${ar() ? 40 : 110}" y="198" width="330" height="30" rx="6" class="s-ink3" fill="none" stroke-width="1.5"/>
      ${row(A1, 88, 0.2)}${row(C1, 198, 1.5)}
      <path ${an("draw", 1.4, "s-rose")} pathLength="1" d="M${lim} 70 V 250" stroke-width="2.5" stroke-dasharray="1" fill="none"/>
      <g ${an("pop", 1.5)}>${txt(lim, 62, ar() ? "الحد" : "limit", "t-rose", 12.5, 'font-weight="800"')}</g>
      ${txt(240, 296, ar() ? "كل نتيجة أداة بتدخل المساحة" : "every tool result goes into the workspace", "t-ink2", 13, bold)}`;
    },
    a_compact: () => {
      const tb = mx(104), sm = mx(244), nt = mx(392), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(tb, 146, 156, 170, "f-s2 s-acc", 2.5)}${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${tb - 58}" y="${80 + i * 22}" width="${[116, 96, 108, 80, 112, 90][i]}" height="12" rx="6" class="${i % 3 === 0 ? "f-acc-soft" : "f-s3"}"${ar() ? ` transform="translate(${116 - [116, 96, 108, 80, 112, 90][i]} 0)"` : ""}/>`).join("")}
        ${txt(tb, 220, ar() ? "مساحة مليانة" : "a full workspace", "t-ink3", 11.5, bold)}</g>
      <path ${an("draw", 0.6, "s-ink2")} pathLength="1" d="M${tb + d * 80} 146 H ${sm - d * 48}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 0.8)}>${box(sm, 146, 92, 56, "f-mint-soft s-mint")}${txt(sm, 151, ar() ? "ملخص" : "summary", "t-mint", 12.5, 'font-weight="800"')}</g>
      <g ${an("rise", 1.0)}>${box(tb, 260, 176, 30, "f-rose-soft s-rose")}${txt(tb, 265, ar() ? "ممكن يضيع: «من غير طنطا»" : "may drop: “excl. Tanta”", "t-rose", 11.5, bold)}</g>
      <g ${an("rise", 1.3)}>${box(nt, 82, 150, 92, "f-s1 s-mint", 2.5)}${txt(nt, 56, ar() ? "ملف ملاحظات (برّه)" : "notes file (outside)", "t-mint", 11.5, 'font-weight="800"')}
        ${(ar() ? ["✓ من غير طنطا", "✓ بالجنيه", "□ مسودة الإيميل"] : ["✓ excl. Tanta", "✓ in EGP", "□ email draft"]).map((s, i) => txt(nt, 80 + i * 20, s, "t-ink2", 11.5, bold)).join("")}</g>
      <path ${an("draw", 1.6, "s-mint")} pathLength="1" d="M${sm + d * 30} 116 C ${sm + d * 40} 86, ${nt - d * 100} 70, ${nt - d * 78} 76" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.8)}>${txt(nt, 146, ar() ? "بيرجع يقراه بعد كل ضغط" : "re-read after compacting", "t-mint", 11, bold)}</g>
      ${[mx(340), mx(436)].map((x, i) => `<g ${an("pop", 2.0 + i * 0.15)}>${box(x, 248, 84, 40, "f-s1 s-acc")}${txt(x, 246, ar() ? "مساعد " + digits(i + 1) : "helper " + (i + 1), "t-ink", 11.5, bold)}${txt(x, 261, ar() ? "مساحة جديدة" : "fresh workspace", "t-ink3", 9.5, bold)}</g>
        <path ${an("draw", 2.3 + i * 0.15, "s-acc")} pathLength="1" d="M${x} 226 Q ${x} 190, ${sm + d * 30} 176" stroke-width="2" stroke-dasharray="1" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      ${txt(240, 306, ar() ? "بيلخّص ويكمّل… ويرجع لملاحظاته برّه" : "it summarises, goes on… and returns to its notes", "t-ink2", 12.5, bold)}`;
    },
    a_choose: () => {
      const C = ar() ? [["شات", ["سؤال سريع", "بيخلص في محادثة", "ذاكرة: المحادثة بس"]], ["مساعد", ["شغل متكرر", "نفس الموضوع", "ذاكرة + ملفاتك"]], ["وكيل", ["خطوات وأدوات", "بيكرر لحد ما يخلص", "صلاحيات + حدود"]]]
        : [["chat", ["a quick question", "done in one chat", "memory: this chat"]], ["assistant", ["recurring work", "same topic", "memory + your files"]], ["agent", ["steps and tools", "repeats until done", "permissions + limits"]]];
      const X = rowX(3, 140, 14);
      return `${C.map(([t, ls], i) => `<g ${an("rise", 0.1 + i * 0.25)}>${box(X(i), 148, 140, 196, "f-s1 s-line2")}${box(X(i), 72, 116, 32, ["f-s2 s-line2", "f-acc-soft s-acc", "f-acc"][i])}${txt(X(i), 78, t, i === 2 ? "t-white" : "t-ink", 13.5, 'font-weight="800"')}
        ${ls.map((s, k) => txt(X(i), 118 + k * 24, s, "t-ink2", 11.5, bold)).join("")}
        ${[0, 1, 2].map((k) => `<rect x="${X(i) - 33 + k * 24}" y="200" width="18" height="10" rx="3" class="${k <= i ? "f-amber" : "f-s3"}"/>`).join("")}${txt(X(i), 230, ar() ? "الرقابة" : "oversight", "t-ink3", 11, bold)}</g>`).join("")}
      <path ${an("draw", 1.1, "s-acc")} pathLength="1" d="M${X(0)} 266 H ${X(2)}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      ${txt(240, 296, ar() ? "كل ما القوة تزيد… الرقابة تزيد" : "more power… more oversight", "t-ink2", 13, bold)}`;
    },
    a_recap: () => chain4(ar() ? ["الموديل ثابت ما بيتغيّرش", "الذاكرة = ملاحظات في المساحة", "الوكيل = أدوات + خطوات متكررة", "إنت بتختار وبتراقب"]
      : ["the model stays fixed", "memory = notes in the workspace", "agent = tools + repeated steps", "you choose and oversee"],
      (x) => person(x, 182, 0.9, "f-ink2"),
      ar() ? "الموديل واحد… والفرق في مساحة العمل والأدوات" : "one model… the difference is the workspace and tools")
  });

  /* ---------- drawings for "AI at work" (data/work-story.js) ---------- */
  const sheet = (cx, cy, w, h, cls, head, d) =>   // a little spreadsheet: header bar, grid lines
    `<g ${an("rise", d)}>${box(cx, cy, w, h, cls)}<rect x="${cx - w / 2 + 6}" y="${cy - h / 2 + 6}" width="${w - 12}" height="14" rx="4" class="f-acc-soft"/>${head ? txt(cx, cy - h / 2 + 17, head, "t-acc", 10.5, bold) : ""}
      ${[0, 1, 2].map((k) => `<line x1="${cx - w / 2 + 8}" y1="${cy - h / 2 + 32 + k * 14}" x2="${cx + w / 2 - 8}" y2="${cy - h / 2 + 32 + k * 14}" class="s-line2" stroke-width="1.5"/>`).join("")}
      <line x1="${cx}" y1="${cy - h / 2 + 24}" x2="${cx}" y2="${cy + h / 2 - 6}" class="s-line2" stroke-width="1.5"/></g>`;
  Object.assign(ART, {
    k_pile: () => {
      const X = rowX(3, 112, 26), heads = ar() ? ["Date", "تاريخ البيع", "يوم/شهر"] : ["Date", "Sale date", "dd/mm"], br = ar() ? ["فرع ١", "فرع ٢", "فرع ٣"] : ["Branch 1", "Branch 2", "Branch 3"];
      const clk = mx(410);
      return `${[0, 1, 2].map((i) => `${sheet(X(i), 96, 112, 82, "f-s1 s-line2", heads[i], 0.1 + i * 0.15)}<g ${an("fade", 0.3 + i * 0.15)}>${txt(X(i), 154, br[i], "t-ink2", 12, bold)}</g>
        <path ${an("draw", 0.7 + i * 0.1, "s-ink3")} pathLength="1" d="M${X(i)} 164 C ${X(i)} 196, ${mx(200)} 192, ${mx(200)} 214" stroke-width="2" fill="none"/>`).join("")}
      <g ${an("pop", 1.1)}>${[[-8, -10], [6, 4], [-2, 14]].map(([r, dy], k) => `<rect x="${mx(200) - 46}" y="${222 + dy}" width="92" height="34" rx="4" class="f-s1 s-ink3" stroke-width="2" transform="rotate(${r} ${mx(200)} ${238 + dy})"/>`).join("")}</g>
      <g ${an("pop", 1.4)}><circle cx="${clk}" cy="232" r="26" class="f-s1 s-rose" stroke-width="3"/><line x1="${clk}" y1="232" x2="${clk}" y2="214" class="s-rose" stroke-width="3" stroke-linecap="round"/><line x1="${clk}" y1="232" x2="${clk + 12}" y2="238" class="s-rose" stroke-width="3" stroke-linecap="round"/>${txt(clk, 282, ar() ? "يوم كامل" : "a full day", "t-rose", 12.5, bold)}</g>
      <g ${an("fade", 1.7)}>${box(mx(200), 296, 230, 30, "f-s2 s-line2")}${txt(mx(200), 301, ar() ? "«المبيعات كويسة الشهر ده»" : "“sales were good this month”", "t-ink3", 12, bold)}</g>`;
    },
    k_six: () => {
      const L6 = ar() ? ["يحلل", "يلخّص ويستخرج", "يدوّر في المعرفة", "يكتب", "يقارن ويراجع", "يقترح"] : ["analyse", "summarise", "search knowledge", "write", "compare & review", "suggest"];
      const C = ["f-acc", "f-mint", "f-amber", "f-acc", "f-mint", "f-amber"], cx = 240, cy = 162, rx = 168, ry = 104;
      const pt = (i) => { const a = (-90 + i * 60) * Math.PI / 180; return [cx + dirx() * rx * Math.cos(a), cy + ry * Math.sin(a)]; };
      return `${L6.map((_, i) => { const [x, y] = pt(i); return `<line ${an("draw", 0.5 + i * 0.08, "s-line2")} pathLength="1" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke-width="2"/>`; }).join("")}
      <g ${an("pop", 0.1)}><circle cx="${cx}" cy="${cy}" r="40" class="f-ink2"/>${txt(cx, cy + 5, ar() ? "شغلك" : "your work", "t-bg", 13.5, 'font-weight="800"')}</g>
      ${L6.map((s, i) => { const [x, y] = pt(i); return `<g ${an("pop", 0.3 + i * 0.12)}>${box(x, y, 142, 38, "f-s1 s-line2")}<circle cx="${x - dirx() * 58}" cy="${y}" r="7" class="${C[i]}"/>${txt(x + dirx() * 8, y + 5, s, "t-ink", 11.5, bold)}</g>`; }).join("")}`;
    },
    k_collect: () => {
      const a = mx(98), t = mx(368), heads = ar() ? ["Date", "تاريخ البيع", "يوم/شهر"] : ["Date", "Sale date", "dd/mm"];
      return `${[0, 1, 2].map((i) => sheet(a, 66 + i * 76, 120, 62, "f-s1 s-line2", heads[i], 0.1 + i * 0.15)).join("")}
      <path ${an("pop", 0.6, "f-acc-soft s-acc")} d="M${mx(170)} 78 L${mx(224)} 132 L${mx(224)} 170 L${mx(170)} 224 Z" stroke-width="2"/>
      <g ${an("fade", 0.7)}>${txt(mx(197), 156, ar() ? "وصف" : "describe", "t-acc", 10.5, bold)}</g>
      <path ${an("draw", 0.9, "s-ink2")} pathLength="1" d="M${mx(228)} 151 H ${mx(262)}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 1.1)}>${box(t, 150, 196, 132, "f-s1 s-acc", 2.5)}<rect x="${t - 90}" y="94" width="180" height="20" rx="5" class="f-acc"/>${txt(t, 108, ar() ? "التاريخ | الفرع | المبيعات" : "date | branch | sales", "t-white", 11.5, bold)}
        ${[0, 1, 2, 3].map((k) => `<rect x="${t - 86}" y="${124 + k * 24}" width="172" height="12" rx="6" class="f-s3"/>`).join("")}</g>
      <g ${an("rise", 1.5)}>${box(t, 260, 200, 32, "f-rose-soft s-rose", 2, 'stroke-dasharray="5 4"')}${txt(t, 265, ar() ? "فرع ٤؟ مش مرفوع… مش موجود" : "branch 4? not uploaded… not there", "t-rose", 11, bold)}</g>
      ${txt(240, 306, ar() ? "اسأله الأول: إنت شايف إيه؟" : "ask first: what do you see?", "t-ink2", 13, bold)}`;
    },
    k_analyse: () => {
      const days = ar() ? ["سبت", "حد", "اتنين", "تلات", "أربع", "خميس"] : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
      const H = [40, 46, 38, 44, 50, 138], X = rowX(6, 42, 18, 226), base = 236;
      return `<line x1="40" y1="${base}" x2="412" y2="${base}" class="s-line2" stroke-width="2"/>
      ${H.map((h, i) => `<rect class="an vbar ${i === 5 ? "f-rose" : "f-acc-soft s-acc"}" style="--d:${0.15 + i * 0.12}s" x="${X(i) - 21}" y="${base - h}" width="42" height="${h}" rx="6" stroke-width="2"/>
        <g ${an("fade", 0.3 + i * 0.12)}>${txt(X(i), base + 20, days[i], i === 5 ? "t-rose" : "t-ink2", 11.5, bold)}</g>`).join("")}
      <g ${an("pop", 1.2)}><circle cx="${X(5)}" cy="${base - 150}" r="24" class="s-ink2" fill="none" stroke-width="3"/><line x1="${X(5) + dirx() * 17}" y1="${base - 133}" x2="${X(5) + dirx() * 32}" y2="${base - 118}" class="s-ink2" stroke-width="5" stroke-linecap="round"/></g>
      <g ${an("rise", 1.4)}>${box(mx(110), 76, 196, 48, "f-rose-soft s-rose")}${txt(mx(110), 72, ar() ? "مرتجعات فرع ٣" : "branch 3 returns", "t-rose", 11.5, bold)}${txt(mx(110), 89, ar() ? "الخميس × ٣" : "Thursday × 3", "t-rose", 13, 'font-weight="800"')}</g>
      <g ${an("rise", 1.7)}>${box(mx(110), 140, 196, 32, "f-mint-soft s-mint")}${txt(mx(110), 145, ar() ? "الحساب بأداة، والطريقة مكتوبة" : "computed by a tool, method shown", "t-mint", 10.5, bold)}</g>
      ${txt(226, 290, ar() ? "مش «كويس» و«وحش»… «فين» و«إمتى»" : "not “good” or “bad”… “where” and “when”", "t-ink2", 13, bold)}`;
    },
    k_summarise: () => {
      const d0 = mx(96), c = mx(340), d = dirx();
      const rows = ar() ? [["قرار", "توسيع فرع ٣", "ص ١٢"], ["رقم", "نمو ٣٫٧٪", "ص ٤"], ["مسؤول", "منى: التدريب", "ص ٢٧"]] : [["decision", "expand branch 3", "p. 12"], ["figure", "growth 3.7%", "p. 4"], ["owner", "Mona: training", "p. 27"]];
      return `<g ${an("rise", 0.05)}>${[5, 4, 3, 2, 1, 0].map((k) => `<rect x="${d0 - 50 + k * 4 * d}" y="${70 - k * 4}" width="100" height="150" rx="6" class="f-s1 s-line2" stroke-width="2"/>`).join("")}
        ${[0, 1, 2, 3, 4, 5].map((k) => `<rect x="${d0 - 36}" y="${90 + k * 18}" width="${[72, 60, 70, 52, 66, 58][k]}" height="7" rx="3.5" class="f-s3"/>`).join("")}${txt(d0, 248, ar() ? "٤٠ صفحة" : "40 pages", "t-ink2", 13, 'font-weight="800"')}</g>
      <path ${an("draw", 0.6, "s-ink2")} pathLength="1" d="M${d0 + d * 66} 150 H ${c - d * 124}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 0.8)}>${box(c, 150, 236, 140, "f-s1 s-acc", 2.5)}${txt(c, 100, ar() ? "صفحة واحدة" : "one page", "t-acc", 12.5, 'font-weight="800"')}</g>
      ${rows.map(([k, v, p], i) => { const y = 128 + i * 34; return `<g ${an("fade", 1.0 + i * 0.2)}>${txt(c + d * 82, y + 4, k, "t-ink3", 11, bold)}${txt(c + d * 2, y + 4, v, "t-ink", 11.5, bold)}</g>
        <g ${an("pop", 1.2 + i * 0.2)}>${box(c - d * 86, y, 50, 22, "f-amber", 0)}${txt(c - d * 86, y + 4, p, "t-white", 10.5, bold)}</g>`; }).join("")}
      ${txt(240, 296, ar() ? "مع كل معلومة: مكانها في الأصل" : "every fact comes with its place in the source", "t-ink2", 13, bold)}`;
    },
    k_search: () => {
      const q = mx(118), f = mx(360), d = dirx();
      return `<g ${an("pop", 0.05)}>${box(q, 66, 196, 46, "f-acc-soft s-acc")}${txt(q, 62, ar() ? "«فرع ٣ يقدر يخصم ١٥٪؟»" : "“can branch 3 give 15%?”", "t-ink", 11.5, bold)}${txt(q, 79, ar() ? "سؤال المدير" : "the manager's question", "t-ink3", 10.5, bold)}</g>
      <g ${an("rise", 0.3)}><path d="M${f - 84} 78 h56 l10 12 h102 v128 h-168z" class="f-amber" opacity=".25"/><path d="M${f - 84} 78 h56 l10 12 h102 v128 h-168z" class="s-amber" fill="none" stroke-width="2.5"/>${txt(f, 70, ar() ? "ملفات الشركة" : "company files", "t-amber", 12, 'font-weight="800"')}
        ${[0, 1, 2].map((k) => `<rect x="${f - 66}" y="${104 + k * 34}" width="132" height="26" rx="5" class="${k === 1 ? "f-s1 s-mint" : "f-s1 s-line2"}" stroke-width="${k === 1 ? 2.5 : 1.5}"/>`).join("")}
        ${txt(f, 121, ar() ? "سياسة الإجازات" : "leave policy", "t-ink3", 10.5, bold)}${txt(f, 155, ar() ? "سياسة الخصومات" : "discount policy", "t-mint", 11, 'font-weight="800"')}${txt(f, 189, ar() ? "دليل الشحن" : "shipping guide", "t-ink3", 10.5, bold)}</g>
      <path ${an("draw", 0.7, "s-ink3")} pathLength="1" d="M${q + d * 100} 70 C ${q + d * 140} 70, ${f - d * 120} 150, ${f - d * 70} 150" stroke-width="2" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.1)}>${box(mx(170), 160, 200, 40, "f-mint-soft s-mint")}${txt(mx(170), 156, ar() ? "البند ٤٫٢: حتى ١٠٪" : "clause 4.2: up to 10%", "t-mint", 12, 'font-weight="800"')}${txt(mx(170), 172, ar() ? "أكتر = موافقة الإقليمي" : "more = regional approval", "t-mint", 10.5, bold)}</g>
      <path ${an("draw", 1.3, "s-mint")} pathLength="1" d="M${f - d * 70} 158 H ${mx(272)}" stroke-width="2" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 1.5)}>${box(mx(170), 236, 236, 46, "f-s1 s-acc")}${txt(mx(170), 232, ar() ? "«لأ، الحد ١٠٪. للـ١٥٪ محتاج الإقليمي»" : "“No — the limit is 10%; 15% needs regional”", "t-ink", 11, bold)}${txt(mx(170), 249, ar() ? "المصدر: سياسة الخصومات ٤٫٢" : "source: discount policy 4.2", "t-acc", 10.5, bold)}</g>
      ${txt(240, 300, ar() ? "سؤال عن شركتك = إجابة من ملفاتها" : "a question about your company = an answer from its files", "t-ink2", 12.5, bold)}`;
    },
    k_write: () => {
      const src = mx(92), X = [70, 160, 250], o = mx(352), d = dirx();
      const out = ar() ? [["للمدير", "٣ سطور + القرار المطلوب", "f-acc"], ["لمدير الفرع", "خطوات عملية", "f-mint"], ["للفريق", "رسالة واضحة من غير لوم", "f-amber"]]
        : [["manager", "3 lines + decision needed", "f-acc"], ["branch manager", "practical steps", "f-mint"], ["team", "clear, no blame", "f-amber"]];
      return `<g ${an("rise", 0.05)}>${box(src, 160, 140, 150, "f-s2 s-ink3")}${txt(src, 102, ar() ? "النتيجة" : "the result", "t-ink", 12.5, 'font-weight="800"')}
        ${(ar() ? ["فرع ٣", "مرتجعات الخميس", "صنف واحد", "حد الخصم ١٠٪"] : ["branch 3", "Thursday returns", "one product", "10% limit"]).map((s, k) => txt(src, 130 + k * 22, s, "t-ink2", 11, bold)).join("")}</g>
      ${out.map(([t, s, c], i) => `<path ${an("draw", 0.5 + i * 0.15, "s-ink3")} pathLength="1" d="M${src + d * 72} 160 C ${src + d * 110} 160, ${o - d * 140} ${X[i]}, ${o - d * 116} ${X[i]}" stroke-width="2" fill="none" marker-end="url(#aih-arrow)"/>
        <g ${an("pop", 0.8 + i * 0.2)}>${box(o, X[i], 224, 58, "f-s1 s-line2")}<rect x="${o - 112}" y="${X[i] - 29}" width="6" height="58" rx="3" class="${c}"${ar() ? ` transform="translate(218 0)"` : ""}/>${txt(o, X[i] - 5, t, "t-ink", 12.5, 'font-weight="800"')}${txt(o, X[i] + 14, s, "t-ink2", 11, bold)}</g>`).join("")}
      <g ${an("fade", 1.6)}>${box(src, 270, 160, 30, "f-rose-soft s-rose")}${txt(src, 275, ar() ? "«ما تغيّرش أي رقم»" : "“don't change any figure”", "t-rose", 11.5, bold)}</g>
      ${txt(mx(352), 306, ar() ? "المحتوى واحد، والشكل على قد اللي هيقرا" : "one content, shaped for each reader", "t-ink2", 12.5, bold)}`;
    },
    k_compare: () => {
      const a = mx(112), b = mx(276), lg = mx(420);
      const R = [["s", ""], ["c", ""], ["s", ""], ["r", ""], ["n", ""], ["s", ""]];
      const cls = { s: "f-s3", c: "f-amber", r: "f-rose", n: "f-mint" };
      const doc = (x, label, v2, d) => `<g ${an("rise", d)}>${box(x, 156, 130, 210, "f-s1 s-line2")}${txt(x, 70, label, "t-ink", 12.5, 'font-weight="800"')}
        ${R.map(([k], i) => { const y = 92 + i * 30; const kk = v2 ? k : k === "n" ? "gap" : k === "r" ? "s" : k; return kk === "gap" ? `<rect x="${x - 50}" y="${y}" width="100" height="14" rx="7" class="s-line2" fill="none" stroke-dasharray="4 4" stroke-width="1.5"/>` : v2 && k === "r" ? `<rect x="${x - 50}" y="${y}" width="100" height="14" rx="7" class="f-rose" opacity=".3"/><line x1="${x - 50}" y1="${y + 7}" x2="${x + 50}" y2="${y + 7}" class="s-rose" stroke-width="2"/>` : `<rect x="${x - 50}" y="${y}" width="100" height="14" rx="7" class="${v2 ? cls[k] : "f-s3"}"/>`; }).join("")}</g>`;
      const leg = ar() ? [["f-amber", "اتغيّر"], ["f-rose", "اتشال"], ["f-mint", "جديد"]] : [["f-amber", "changed"], ["f-rose", "removed"], ["f-mint", "new"]];
      return `${doc(a, ar() ? "النسخة ١" : "version 1", false, 0.05)}${doc(b, ar() ? "النسخة ٢" : "version 2", true, 0.4)}
      ${leg.map(([c, s], i) => `<g ${an("pop", 1.0 + i * 0.15)}><rect x="${lg - 44}" y="${96 + i * 34}" width="16" height="16" rx="4" class="${c}"/>${txt(lg + 8, 109 + i * 34, s, "t-ink2", 12, bold)}</g>`).join("")}
      <g ${an("pop", 1.6)}>${box(lg, 222, 104, 46, "f-rose-soft s-rose")}${txt(lg, 218, ar() ? "رقمين" : "2 figures", "t-rose", 12, 'font-weight="800"')}${txt(lg, 234, ar() ? "مش متطابقين" : "don't match", "t-rose", 11, bold)}</g>
      ${txt(240, 300, ar() ? "بيمسك التفاصيل اللي العين بتفوّتها" : "it catches what the eye misses", "t-ink2", 13, bold)}`;
    },
    k_suggest: () => {
      const X = rowX(3, 136, 12), S3 = ar() ? [["فحص شحنة الأربع", 1, "تكلفة قليلة"], ["تدريب البيّاعين", 2, "أسبوعين"], ["خصم ١٠٪", 2, "في حدود السياسة"]] : [["inspect Wed delivery", 1, "low cost"], ["train staff", 2, "two weeks"], ["10% discount", 2, "within policy"]];
      return `${S3.map(([t, r, c], i) => `<g ${an("rise", 0.15 + i * 0.2)}>${box(X(i), 120, 136, 140, "f-s1 s-acc")}<circle cx="${X(i)}" cy="68" r="14" class="f-acc"/>${txt(X(i), 73, ["A", "B", "C"][i], "t-white", 13, 'font-weight="800" direction="ltr"')}
        ${txt(X(i), 104, t, "t-ink", 12, 'font-weight="800"')}${txt(X(i), 126, c, "t-ink3", 11, bold)}
        ${[0, 1, 2].map((k) => `<rect x="${X(i) - 30 + k * 22}" y="146" width="16" height="10" rx="3" class="${k < r ? "f-rose" : "f-s3"}"/>`).join("")}${txt(X(i), 176, ar() ? "المخاطرة" : "risk", "t-ink3", 10.5, bold)}</g>`).join("")}
      ${[0, 1, 2].map((i) => `<path ${an("draw", 0.9 + i * 0.1, "s-line2")} pathLength="1" d="M${X(i)} 192 C ${X(i)} 220, 240 216, 240 236" stroke-width="2" fill="none"/>`).join("")}
      <g ${an("rise", 1.3)}>${person(240, 286, 1, "f-ink2")}</g>
      <g ${an("pop", 1.6)}>${box(mx(372), 268, 150, 34, "f-mint", 0)}${txt(mx(372), 273, ar() ? "القرار ليك" : "the decision is yours", "t-white", 12.5, bold)}</g>`;
    },
    k_chain: () => {
      const st = ar() ? ["يجمع", "يحلل", "يلخّص", "يقارن", "يقترح"] : ["collect", "analyse", "summarise", "compare", "suggest"];
      const X = rowX(5, 78, 14);
      return `${st.map((s, i) => `<g ${an("pop", 0.15 + i * 0.2)}>${box(X(i), 112, 78, 44, i === 4 ? "f-mint" : "f-s1 s-acc")}${txt(X(i), 117, s, i === 4 ? "t-white" : "t-ink", 12.5, 'font-weight="800"')}</g>`).join("")}
      ${st.slice(1).map((_, i) => `<path ${an("draw", 0.3 + i * 0.2, "s-acc")} pathLength="1" d="M${X(i) + dirx() * 40} 112 L${X(i + 1) - dirx() * 41} 112" stroke-width="2.5" fill="none"/>`).join("")}
      <g ${an("rise", 1.3)}>${st.map((_, i) => `<rect x="${X(i) - 39}" y="${190}" width="78" height="44" rx="12" class="f-rose-soft s-rose" stroke-width="2" opacity="${0.35 + i * 0.16}"/>`).join("")}</g>
      <g ${an("pop", 1.5)}>${box(X(0), 212, 78, 44, "f-rose", 0)}${txt(X(0), 217, ar() ? "ملف ناقص" : "missing file", "t-white", 11.5, bold)}</g>
      <path ${an("draw", 1.7, "s-rose")} pathLength="1" d="M${X(0) + dirx() * 40} 212 H ${X(4) - dirx() * 40}" stroke-width="2.5" stroke-dasharray="1" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.9)}>${txt(X(4) - dirx() * 18, 254, ar() ? "اقتراح غلط بثقة" : "wrong, confidently", "t-rose", 11.5, bold)}</g>
      ${txt(240, 300, ar() ? "كل حلقة بتاخد جودتها من اللي قبلها" : "each link takes its quality from the one before", "t-ink2", 13, bold)}`;
    },
    k_garbage: () => {
      const t = mx(120), c = mx(352), d = dirx();
      const rows = ar() ? [["١٢٬٥٠٠", 0], ["٩٬٨٠٠", 1], ["٩٬٨٠٠", 1], ["١٠٠٬٠٠٠", 2], ["١١٬٢٠٠", 0]] : [["12,500", 0], ["9,800", 1], ["9,800", 1], ["100,000", 2], ["11,200", 0]];
      return `<g ${an("rise", 0.05)}>${box(t, 150, 172, 196, "f-s1 s-line2")}${txt(t, 70, ar() ? "ملف فرع ٢" : "branch 2 file", "t-ink", 12.5, 'font-weight="800"')}</g>
      ${rows.map(([v, k], i) => { const y = 98 + i * 32; return `<g ${an("fade", 0.2 + i * 0.1)}>${box(t, y, 150, 26, k === 0 ? "f-s2 s-line2" : k === 1 ? "f-amber-soft s-amber" : "f-rose-soft s-rose", 1.6)}${txt(t, y + 5, v, k === 2 ? "t-rose" : "t-ink", 12, 'font-weight="700" direction="ltr"')}</g>`; }).join("")}
      <g ${an("fade", 0.9)}>${txt(t, 268, ar() ? "صف متكرر + صفر زيادة" : "a duplicate + an extra zero", "t-rose", 11.5, bold)}</g>
      <path ${an("draw", 1.0, "s-ink2")} pathLength="1" d="M${t + d * 90} 150 H ${c - d * 100}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 1.2)}>${box(c, 150, 190, 170, "f-s1 s-acc", 2.5)}${[[40, 0], [118, 1], [46, 2]].map(([h, i]) => `<rect class="an vbar ${i === 1 ? "f-acc" : "f-acc-soft"}" style="--d:${1.4 + i * 0.12}s" x="${c - 66 + i * 48}" y="${206 - h}" width="36" height="${h}" rx="5"/>`).join("")}
        <line x1="${c - 76}" y1="206" x2="${c + 76}" y2="206" class="s-line2" stroke-width="2"/>${txt(c, 226, ar() ? "«فرع ٢ الأول بفرق ضخم»" : "“branch 2 leads by far”", "t-ink2", 11, bold)}</g>
      <g transform="rotate(-10 ${c} 118)"><g ${an("pop", 1.9)}>${box(c, 118, 150, 34, "f-rose-soft s-rose", 3)}${txt(c, 124, ar() ? "شكله مظبوط… وغلط" : "looks right… is wrong", "t-rose", 12.5, 'font-weight="800"')}</g></g>
      ${txt(240, 300, ar() ? "افحص البيانات الأول، وراجع ٣ أرقام بإيدك" : "check the data first; verify 3 figures by hand", "t-ink2", 12.5, bold)}`;
    },
    k_recap: () => chain4(ar() ? ["ملفات الفروع", "يجمع ويحلل", "يلخّص ويقارن ويقترح", "إنت بتراجع وتقرر"]
      : ["the branch files", "collect and analyse", "summarise, compare, suggest", "you check and decide"],
      (x) => `<circle cx="${x}" cy="160" r="22" class="f-s1 s-mint" stroke-width="3"/><line x1="${x}" y1="160" x2="${x}" y2="146" class="s-mint" stroke-width="3" stroke-linecap="round"/><line x1="${x}" y1="160" x2="${x + 10}" y2="164" class="s-mint" stroke-width="3" stroke-linecap="round"/>`,
      ar() ? "من يوم شغل كامل… لساعة واحدة" : "from a full day of work… to one hour")
  });

  /* ---------- drawings for "the limits of AI" (data/limits-story.js) ---------- */
  const page = (cx, cy, w, h, title, lines, d, cls = "f-s1 s-line2") =>   // a page: title bar and text lines
    `<g ${an("rise", d)}>${box(cx, cy, w, h, cls)}${title ? txt(cx, cy - h / 2 + 22, title, "t-ink", 12, 'font-weight="800"') : ""}
      ${lines.map((lw, k) => `<rect x="${ar() ? cx + w / 2 - 14 - lw : cx - w / 2 + 14}" y="${cy - h / 2 + 38 + k * 16}" width="${lw}" height="8" rx="4" class="f-s3"/>`).join("")}</g>`;
  const check = (x, y, d, ok = true) => `<g ${an("pop", d)}><circle cx="${x}" cy="${y}" r="11" class="${ok ? "f-mint" : "f-rose"}"/>${ok
    ? `<path d="M${x - 5} ${y} l3.5 3.5 l6.5 -7" class="s-white" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<path d="M${x - 4} ${y - 4} l8 8 M${x + 4} ${y - 4} l-8 8" class="s-white" stroke-width="2.4" stroke-linecap="round"/>`}</g>`;
  Object.assign(ART, {
    l_memo: () => {
      const m = mx(176), c = mx(396), d = dirx();
      return `${page(m, 160, 200, 250, ar() ? "مذكرة: تغيير مورّد التغليف" : "Memo: change packaging supplier", [150, 132, 160, 120, 146, 100, 154, 130, 110, 140], 0.05)}
      <g ${an("pop", 0.7)}>${box(m, 250, 150, 30, "f-acc-soft s-acc")}${txt(m, 255, ar() ? "التوصية: نغيّر المورّد" : "Recommendation: change supplier", "t-acc", 11.5, bold)}</g>
      <g ${an("pop", 1.0)}><circle cx="${c}" cy="96" r="28" class="f-s1 s-ink2" stroke-width="3"/><line x1="${c}" y1="96" x2="${c}" y2="76" class="s-ink2" stroke-width="3" stroke-linecap="round"/><line x1="${c}" y1="96" x2="${c - d * 14}" y2="96" class="s-acc" stroke-width="3.5" stroke-linecap="round"/>${txt(c, 146, ar() ? "الإرسال الساعة ٥" : "due at 5:00", "t-ink2", 12, bold)}</g>
      <path ${an("draw", 1.3, "s-ink3")} pathLength="1" d="M${m + d * 104} 200 C ${m + d * 140} 200, ${c - d * 40} 210, ${c - d * 30} 214" stroke-width="2" stroke-dasharray="1" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 1.5)}><rect x="${c - 34}" y="200" width="68" height="46" rx="5" class="f-s1 s-ink2" stroke-width="2.5"/><path d="M${c - 34} 202 l34 24 l34 -24" class="s-ink2" stroke-width="2.5" fill="none"/>${txt(c, 268, ar() ? "للمدير العام" : "to the GM", "t-ink2", 12, bold)}</g>
      <g ${an("pop", 1.8)}><circle cx="${c}" cy="300" r="13" class="f-amber"/>${txt(c, 305, ar() ? "؟" : "?", "t-white", 15, 'font-weight="800"')}</g>`;
    },
    l_confident: () => {
      const b = mx(196), r = mx(410), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(b, 104, 300, 92, "f-s1 s-acc", 2.5)}${txt(b, 88, ar() ? "«حسب القرار الوزاري رقم ١٢٧" : "“Under ministerial decree", "t-ink", 12.5, bold)}${txt(b, 108, ar() ? "لسنة ٢٠٢٤، لازم يتغيّر المورّد" : "no. 127 of 2024, the supplier", "t-ink", 12.5, bold)}${txt(b, 128, ar() ? "لو العيوب عدّت ٢٪»" : "must change above 2% defects”", "t-ink", 12.5, bold)}</g>
      ${[[ar() ? "ثقة الكلام" : "confidence of wording", 1, "f-acc", 186], [ar() ? "صحة المعلومة" : "accuracy of the fact", 0.08, "f-rose", 236]].map(([s, v, c, y], i) => `<g ${an("fade", 0.4 + i * 0.3)}>${txt(mx(84), y + 5, s, "t-ink2", 11.5, bold)}</g>
        <rect x="${ar() ? 130 : 160}" y="${y - 9}" width="190" height="18" rx="9" class="f-s3"/>${grow(160, y - 9, Math.max(14, 190 * v), 18, c, 0.6 + i * 0.3)}`).join("")}
      <g ${an("pop", 1.2)}><circle cx="${r}" cy="190" r="34" class="s-ink2" fill="none" stroke-width="4"/><line x1="${r + d * 24}" y1="214" x2="${r + d * 46}" y2="238" class="s-ink2" stroke-width="7" stroke-linecap="round"/>${txt(r, 186, ar() ? "القرار" : "decree", "t-ink3", 11, bold)}${txt(r, 202, ar() ? "مش موجود" : "not found", "t-rose", 12, 'font-weight="800"')}</g>
      ${txt(240, 296, ar() ? "الثقة في الصياغة مش دليل على الصحة" : "confident wording is no proof of accuracy", "t-ink2", 13, bold)}`;
    },
    l_misread: () => {
      const q = mx(110), d = dirx(), B = mx(360), Y = [92, 200];
      return `<g ${an("pop", 0.05)}>${box(q, 146, 176, 60, "f-acc-soft s-acc")}${txt(q, 140, ar() ? "«قارن بالمورّد" : "“Compare with the", "t-ink", 12, bold)}${txt(q, 158, ar() ? "التاني»" : "other supplier”", "t-ink", 12, bold)}</g>
      ${Y.map((y, i) => `<path ${an("draw", 0.5 + i * 0.2, i ? "s-rose" : "s-mint")} pathLength="1" d="M${q + d * 90} 146 C ${q + d * 140} 146, ${B - d * 130} ${y}, ${B - d * 92} ${y}" stroke-width="2.5" fill="none"${i ? "" : ' stroke-dasharray="1"'} marker-end="url(#aih-arrow)"/>`).join("")}
      <g ${an("rise", 0.8)}>${box(B, Y[0], 176, 56, "f-mint-soft s-mint")}${txt(B, Y[0] - 4, ar() ? "المورّد ب: جودة أعلى" : "Supplier B: higher quality", "t-mint", 12, 'font-weight="800"')}${txt(B, Y[0] + 14, ar() ? "اللي كان مقصود" : "what was meant", "t-mint", 10.5, bold)}</g>
      <g ${an("rise", 1.0)}>${box(B, Y[1], 176, 56, "f-rose-soft s-rose")}${txt(B, Y[1] - 4, ar() ? "المورّد ج: سعر أقل" : "Supplier C: lower price", "t-rose", 12, 'font-weight="800"')}${txt(B, Y[1] + 14, ar() ? "اللي الموديل اختاره" : "what the model chose", "t-rose", 10.5, bold)}</g>
      ${check(B + d * 100, Y[1] - 26, 1.3, false)}
      <g ${an("fade", 1.5)}>${box(q, 250, 196, 34, "f-s2 s-line2")}${txt(q, 255, ar() ? "«اكتب فهمك للمطلوب في سطرين»" : "“Restate the task in two lines”", "t-ink2", 11.5, bold)}</g>
      ${txt(240, 302, ar() ? "المعلومة الناقصة بتتملي بالأرجح" : "a missing fact is filled with the likeliest guess", "t-ink2", 13, bold)}`;
    },
    l_data: () => {
      const M = Array.from({ length: 12 }, (_, i) => digits(i + 1));
      const X = rowX(12, 26, 6);
      return `<g ${an("fade", 0.05)}>${txt(240, 50, ar() ? "بيانات المورّد الجديد، شهر بشهر" : "new supplier data, month by month", "t-ink3", 12, bold)}</g>
      ${M.map((m, i) => `<g ${an("pop", 0.1 + i * 0.05)}><rect x="${X(i) - 13}" y="64" width="26" height="76" rx="5" class="${i < 2 ? "f-acc" : "f-s1 s-line2"}" stroke-width="1.6"${i < 2 ? "" : ' stroke-dasharray="4 3"'}/>${txt(X(i), 158, m, i < 2 ? "t-acc" : "t-ink3", 10, bold)}</g>`).join("")}
      <g ${an("fade", 0.9)}>${txt((X(2) + X(11)) / 2, 106, ar() ? "مش مرفوعة" : "not uploaded", "t-ink3", 12, bold)}</g>
      <path ${an("draw", 1.0, "s-ink2")} pathLength="1" d="M${X(0)} 170 C ${X(0)} 196, 240 186, 240 204" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.2)}>${box(240, 228, 220, 40, "f-mint-soft s-mint")}${txt(240, 234, ar() ? "نسبة العيوب: ٠٫٥٪ ✓" : "defect rate: 0.5% ✓", "t-mint", 14, 'font-weight="800"')}</g>
      <g transform="rotate(${ar() ? 8 : -8} 240 268)"><g ${an("pop", 1.6)}>${box(240, 272, 210, 30, "f-rose-soft s-rose", 2.5)}${txt(240, 277, ar() ? "من شهرين بس من ١٢" : "from 2 months out of 12", "t-rose", 12, 'font-weight="800"')}</g></g>
      ${txt(240, 312, ar() ? "حساب سليم على بيانات ناقصة" : "sound arithmetic on partial data", "t-ink2", 12.5, bold)}`;
    },
    l_company: () => {
      const a = mx(118), b = mx(362), m = 240, d = dirx();
      return `${page(a, 120, 178, 120, ar() ? "المعتاد في العقود" : "usual in contracts", [120, 96], 0.05)}
      <g ${an("pop", 0.4)}>${box(a, 150, 120, 30, "f-s2 s-ink3")}${txt(a, 155, ar() ? "إخطار ٣٠ يوم" : "30 days' notice", "t-ink2", 12, bold)}</g>
      ${page(b, 120, 178, 120, ar() ? "عقدكم مع المورّد" : "your supplier contract", [120, 96], 0.3, "f-s1 s-amber")}
      <g ${an("pop", 0.6)}>${box(b, 150, 140, 30, "f-amber-soft s-amber")}${txt(b, 155, ar() ? "٩٠ يوم + شرط جزائي" : "90 days + penalty", "t-amber", 12, 'font-weight="800"')}</g>
      <g ${an("pop", 0.9)}><circle cx="${m}" cy="236" r="26" class="f-acc"/>${txt(m, 241, ar() ? "موديل" : "model", "t-white", 11.5, bold)}</g>
      <path ${an("draw", 1.1, "s-ink3")} pathLength="1" d="M${a} 168 C ${a} 220, ${m - d * 60} 236, ${m - d * 30} 236" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <path ${an("draw", 1.2, "s-rose")} pathLength="1" d="M${b} 168 C ${b} 220, ${m + d * 60} 236, ${m + d * 30} 236" stroke-width="2" stroke-dasharray="1" fill="none"/>
      <g ${an("fade", 1.4)}>${txt(b, 222, ar() ? "ما شافوش" : "never saw it", "t-rose", 11.5, 'font-weight="800"')}</g>
      <g ${an("pop", 1.7)}>${box(m, 292, 220, 32, "f-rose", 0)}${txt(m, 297, ar() ? "كتب: «إخطار ٣٠ يوم»" : "wrote: “30 days' notice”", "t-white", 12, bold)}</g>`;
    },
    l_dated: () => {
      const L = 50, R = 430, cut = mx(270), d = dirx();
      const xs = (f) => (ar() ? R - (R - L) * f : L + (R - L) * f);
      return `<line x1="${L}" y1="160" x2="${R}" y2="160" class="s-line2" stroke-width="3"/>
      <path ${an("draw", 0.2, "s-acc")} pathLength="1" d="M${xs(0)} 160 H ${cut}" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${[[0.12, ar() ? "أسعار ٢٠٢٣" : "2023 prices"], [0.32, ar() ? "قوانين قديمة" : "older rules"]].map(([f, s], i) => `<g ${an("pop", 0.4 + i * 0.15)}><circle cx="${xs(f)}" cy="160" r="8" class="f-acc"/>${txt(xs(f), 140, s, "t-acc", 11.5, bold)}</g>`).join("")}
      <g ${an("pop", 0.8)}><line x1="${cut}" y1="96" x2="${cut}" y2="222" class="s-rose" stroke-width="3" stroke-dasharray="6 5"/>${box(cut, 82, 150, 30, "f-rose", 0)}${txt(cut, 87, ar() ? "تاريخ توقف التدريب" : "training cutoff", "t-white", 11.5, bold)}</g>
      ${[[0.7, ar() ? "سعر جديد" : "new price"], [0.86, ar() ? "سعر أحدث" : "newer price"]].map(([f, s], i) => `<g ${an("pop", 1.0 + i * 0.15)}><circle cx="${xs(f)}" cy="160" r="8" class="f-s3"/>${txt(xs(f), i ? 140 : 190, s, "t-ink3", 11.5, bold)}</g>`).join("")}
      <g ${an("fade", 1.2)}>${txt((xs(0) + cut) / 2, 214, ar() ? "اللي يعرفه" : "what it knows", "t-acc", 12.5, 'font-weight="800"')}${txt((cut + xs(1)) / 2, 236, ar() ? "مش في معرفته" : "outside its knowledge", "t-ink3", 12.5, 'font-weight="800"')}</g>
      <g ${an("rise", 1.5)}>${box(240, 286, 300, 32, "f-mint-soft s-mint")}${txt(240, 291, ar() ? "كل معلومة بتتغيّر محتاجة تاريخ ومصدر" : "anything that changes needs a date and source", "t-mint", 12, bold)}</g>`;
    },
    l_sensitive: () => {
      const s0 = mx(100), p = mx(370), d = dirx();
      const items = ar() ? ["أسعار العقد السرية", "أسماء الموظفين"] : ["confidential prices", "staff names"];
      const lock = (x, y, open, cls) => `<g transform="translate(${x} ${y})"><rect x="-10" y="-2" width="20" height="15" rx="3" class="${cls}"/><path d="M-6 -2 v-5 a6 6 0 0 1 12 0 ${open ? "v-2" : "v5"}" class="${cls.replace("f-", "s-")}" stroke-width="2.5" fill="none"/></g>`;
      return `${items.map((s, i) => `<g ${an("rise", 0.1 + i * 0.15)}>${box(s0, 120 + i * 50, 168, 36, "f-amber-soft s-amber")}${txt(s0, 125 + i * 50, s, "t-amber", 12, 'font-weight="800"')}</g>`).join("")}
      <path ${an("draw", 0.6, "s-rose")} pathLength="1" d="M${s0 + d * 86} 130 C ${s0 + d * 140} 130, ${p - d * 120} 90, ${p - d * 96} 90" stroke-width="2.5" stroke-dasharray="1" fill="none" marker-end="url(#aih-arrow)"/>
      <path ${an("draw", 0.8, "s-mint")} pathLength="1" d="M${s0 + d * 86} 160 C ${s0 + d * 140} 160, ${p - d * 120} 220, ${p - d * 96} 220" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.0)}>${box(p, 90, 184, 50, "f-rose-soft s-rose")}${lock(p - d * 70, 86, true, "f-rose")}${txt(p + d * 12, 86, ar() ? "حساب شخصي مجاني" : "personal free account", "t-rose", 11.5, 'font-weight="800"')}${txt(p + d * 12, 104, ar() ? "برّه أنظمة الشركة" : "outside company systems", "t-rose", 10.5, bold)}</g>
      <g ${an("pop", 1.2)}>${box(p, 220, 184, 50, "f-mint-soft s-mint")}${lock(p - d * 70, 216, false, "f-mint")}${txt(p + d * 12, 216, ar() ? "أداة الشركة المعتمدة" : "company-approved tool", "t-mint", 11.5, 'font-weight="800"')}${txt(p + d * 12, 234, ar() ? "أو «المورّد أ» بدل الاسم" : "or “supplier A” for names", "t-mint", 10.5, bold)}</g>
      ${check(p + d * 104, 66, 1.4, false)}${check(p + d * 104, 196, 1.5, true)}
      ${txt(240, 296, ar() ? "البيانات اللي خرجت ما بترجعش" : "data that has left doesn't come back", "t-ink2", 13, bold)}`;
    },
    l_review: () => {
      const cx = 240, cy = 150, R = ar() ? ["خطوط الإنتاج", "المشتريات", "الشؤون القانونية", "المالية"] : ["production", "purchasing", "legal", "finance"];
      const P = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => [cx + dirx() * a * 150, cy + b * 74]);
      return `${P.map(([x, y], i) => `<line ${an("draw", 0.4 + i * 0.1, "s-line2")} pathLength="1" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke-width="2"/>`).join("")}
      <g ${an("pop", 0.1)}>${box(cx, cy, 150, 50, "f-acc", 0)}${txt(cx, cy - 2, ar() ? "قرار تغيير" : "decision to", "t-white", 12.5, 'font-weight="800"')}${txt(cx, cy + 15, ar() ? "المورّد" : "switch supplier", "t-white", 12.5, 'font-weight="800"')}</g>
      ${P.map(([x, y], i) => `<g ${an("rise", 0.6 + i * 0.15)}>${box(x, y, 136, 40, "f-s1 s-acc")}${person(x - dirx() * 50, y + 14, 0.5, "f-ink2")}${txt(x + dirx() * 10, y + 5, R[i], "t-ink", 12, bold)}</g>${check(x + dirx() * 66, y - 20, 1.2 + i * 0.12)}`).join("")}
      <g ${an("rise", 1.8)}>${box(240, 286, 330, 32, "f-amber-soft s-amber")}${txt(240, 291, ar() ? "«ماكينة ٣ حساسة لسُمك الكرتون» — مشرف الخط" : "“machine 3 is sensitive to thickness” — line supervisor", "t-amber", 11.5, bold)}</g>`;
    },
    l_owner: () => {
      const m = mx(190), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(m, 160, 250, 236, "f-s1 s-line2")}${txt(m, 66, ar() ? "المذكرة" : "the memo", "t-ink", 13, 'font-weight="800"')}
        ${[160, 140, 170, 120].map((w, k) => `<rect x="${ar() ? m + 110 - w : m - 110}" y="${84 + k * 16}" width="${w}" height="8" rx="4" class="f-s3"/>`).join("")}</g>
      <g ${an("fade", 0.5)}>${box(m, 176, 216, 34, "f-s2 s-line2")}${txt(m, 181, ar() ? "التحضير: مساعد ذكي" : "prepared with: an AI assistant", "t-ink3", 11.5, bold)}</g>
      <g ${an("pop", 0.9)}>${box(m, 226, 216, 44, "f-acc-soft s-acc", 2.5)}${txt(m, 222, ar() ? "المسؤول عن القرار: إنت" : "accountable for the decision: you", "t-acc", 12.5, 'font-weight="800"')}</g>
      <path ${an("draw", 1.2, "s-ink")} pathLength="1" d="M${m - 46} 264 c 14 -10, 22 8, 34 -2 s 20 -8, 30 4 s 18 -6, 28 0" stroke-width="2.5" fill="none"/>
      <g ${an("rise", 1.4)}>${box(mx(404), 118, 132, 70, "f-rose-soft s-rose")}${txt(mx(404), 112, ar() ? "«الأداة قالت كده»" : "“the tool said so”", "t-rose", 11.5, 'font-weight="800"')}${txt(mx(404), 132, ar() ? "مش مبرر" : "is no excuse", "t-rose", 11.5, bold)}</g>
      ${check(mx(404) + d * 60, 88, 1.6, false)}
      ${txt(240, 304, ar() ? "التوقيع بيقول إنك راجعت" : "a signature says you reviewed it", "t-ink2", 13, bold)}`;
    },
    l_chain: () => {
      const st = ar() ? ["حدّد الهدف", "ادّيه الـ Context", "راجع النتيجة", "اتأكد من المصادر", "خد القرار"] : ["set the goal", "give Context", "review result", "verify sources", "decide"];
      const X = rowX(5, 84, 8), fix = ar() ? ["الفهم الغلط", "الشركة والبيانات", "الثقة الزايفة", "القديم والوهمي", "المسؤولية"] : ["misreading", "company & data", "false confidence", "stale & invented", "responsibility"];
      return `${st.map((s, i) => `<g ${an("pop", 0.15 + i * 0.2)}><circle cx="${X(i)}" cy="92" r="16" class="${i === 4 ? "f-mint" : "f-acc"}"/>${txt(X(i), 97, digits(i + 1), "t-white", 13, 'font-weight="800"')}${box(X(i), 146, 84, 54, i === 4 ? "f-mint-soft s-mint" : "f-s1 s-acc")}${txt(X(i), 151, s, "t-ink", 11, bold)}</g>`).join("")}
      ${st.slice(1).map((_, i) => `<path ${an("draw", 0.3 + i * 0.2, "s-acc")} pathLength="1" d="M${X(i) + dirx() * 18} 92 H ${X(i + 1) - dirx() * 20}" stroke-width="2.5" fill="none"/>`).join("")}
      ${fix.map((s, i) => `<g ${an("fade", 1.2 + i * 0.12)}><path d="M${X(i)} 176 V 204" class="s-line2" stroke-width="2"/>${box(X(i), 222, 84, 34, "f-s2 s-line2")}${txt(X(i), 227, s, "t-ink3", 10, bold)}</g>`).join("")}
      ${txt(240, 280, ar() ? "كل خطوة بتقفل حد من الحدود" : "each step closes off a limit", "t-ink2", 13, bold)}`;
    },
    l_checks: () => {
      const C = ar() ? ["افصل المؤكد عن المستنتج", "اذكر افتراضاتك", "اتأكد من أهم ٣ معلومات بنفسك", "«إيه اللي يخلّي التوصية غلط؟»", "زميل يقرا بعين جديدة"]
        : ["separate facts from inferences", "list your assumptions", "verify the top 3 facts yourself", "“what would make this wrong?”", "a colleague reads it fresh"];
      const bx = mx(250), nx = mx(70), d = dirx();
      return `${C.map((s, i) => { const y = 58 + i * 46; return `<g ${an("rise", 0.1 + i * 0.18)}>${box(bx, y, 320, 36, "f-s1 s-line2")}<circle cx="${nx}" cy="${y}" r="15" class="f-acc"/>${txt(nx, y + 5, digits(i + 1), "t-white", 13, 'font-weight="800"')}${txt(bx, y + 5, s, "t-ink", 12, bold)}</g>`; }).join("")}
      <g ${an("pop", 1.2)}>${box(mx(250), 290, 320, 32, "f-mint-soft s-mint")}${txt(mx(250), 295, ar() ? "ساعة مراجعة كشفت ٣ أخطاء" : "one hour of checks caught 3 mistakes", "t-mint", 12.5, 'font-weight="800"')}</g>`;
    },
    l_recap: () => {
      const X = rowX(3, 112, 34), T = ar() ? ["إنسان بيفكّر", "بيانات كويسة", "ذكاء اصطناعي"] : ["a thinking human", "good data", "AI"], C = ["f-acc", "f-amber", "f-mint"];
      const icon = [(x) => person(x, 116, 0.8, "f-white"), (x) => `<rect x="${x - 15}" y="86" width="30" height="26" rx="3" class="f-white"/><path d="M${x - 15} 95 h30 M${x - 5} 86 v26" class="s-amber" stroke-width="2"/>`,
        (x) => `<circle cx="${x}" cy="98" r="12" class="f-white"/><path d="M${x - 5} 98 h10 M${x} 93 v10" class="s-mint" stroke-width="2.5"/>`];
      return `${T.map((s, i) => `<g ${an("pop", 0.15 + i * 0.3)}><circle cx="${X(i)}" cy="100" r="38" class="${C[i]}"/>${icon[i](X(i))}${txt(X(i), 164, s, "t-ink", 12.5, 'font-weight="800"')}</g>`).join("")}
      ${[0, 1].map((i) => `<g ${an("fade", 0.4 + i * 0.3)}>${txt((X(i) + X(i + 1)) / 2, 108, "+", "t-ink2", 26, 'font-weight="800"')}</g>`).join("")}
      <path ${an("draw", 1.1, "s-ink2")} pathLength="1" d="M240 184 V 212" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.3)}>${box(240, 240, 220, 42, "f-ink2", 0)}${txt(240, 246, ar() ? "أحسن نتيجة" : "the best result", "t-bg", 15, 'font-weight="800"')}</g>
      ${txt(240, 296, ar() ? "هو بيسرّع… وإنت بتضمن" : "it speeds things up… you make sure", "t-ink2", 13, bold)}`;
    }
  });

  /* ---------- drawings for "your first automation" (data/auto-story.js) ---------- */
  const grid = (cx, cy, cols, rows, cw, rh, cls, hl, d) => {   // a table: header row, body cells; hl = column index to highlight
    const w = cols * cw, x0 = cx - w / 2, y0 = cy - (rows * rh) / 2; let s = "";
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const col = ar() ? cols - 1 - c : c;
      s += `<rect x="${x0 + col * cw + 1}" y="${y0 + r * rh + 1}" width="${cw - 2}" height="${rh - 2}" rx="2" class="${r === 0 ? "f-acc-soft" : [].concat(hl).includes(c) ? "f-mint-soft" : cls}"/>`; }
    return `<g ${an("rise", d)}>${s}</g>`; };
  const xl = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-16" y="-16" width="32" height="32" rx="6" class="f-mint"/><path d="M-7 -8 l14 16 M7 -8 l-14 16" class="s-white" stroke-width="3.2" stroke-linecap="round"/></g>`;
  Object.assign(ART, {
    x_monday: () => {
      const T = ar() ? [["ملفات تحت بعض + جدول محوري", "٢٫٥ ساعة"], ["بحث وربط بين الجداول", "٢ ساعة"], ["تقرير من ملفين", "١٫٥ ساعة"]] : [["stack files + pivot table", "2.5 h"], ["lookups across tables", "2 h"], ["report from two files", "1.5 h"]];
      const cx = mx(176), ck = mx(400), d = dirx();
      return `${T.map(([t, h], i) => `<g ${an("rise", 0.1 + i * 0.2)}>${box(cx, 80 + i * 72, 264, 56, "f-s1 s-line2")}<circle cx="${cx - d * 110}" cy="${80 + i * 72}" r="15" class="f-acc"/>${txt(cx - d * 110, 85 + i * 72, digits(i + 1), "t-white", 13, 'font-weight="800"')}
        ${txt(cx + d * 12, 76 + i * 72, t, "t-ink", 12, 'font-weight="800"')}${txt(cx + d * 12, 94 + i * 72, h, "t-rose", 11.5, bold)}</g>`).join("")}
      <g ${an("pop", 0.9)}><circle cx="${ck}" cy="134" r="40" class="f-s1 s-rose" stroke-width="4"/><line x1="${ck}" y1="134" x2="${ck}" y2="106" class="s-rose" stroke-width="4" stroke-linecap="round"/><line x1="${ck}" y1="134" x2="${ck + 18}" y2="146" class="s-rose" stroke-width="4" stroke-linecap="round"/>${txt(ck, 200, ar() ? "٦ ساعات" : "6 hours", "t-rose", 15, 'font-weight="800"')}${txt(ck, 220, ar() ? "كل شهر" : "every month", "t-ink3", 12, bold)}</g>
      ${txt(240, 300, ar() ? "نفس الخطوات… كل مرة من الأول" : "the same steps… from scratch every time", "t-ink2", 13, bold)}`;
    },
    x_describe: () => {
      const p = mx(118), m = mx(330), d = dirx();
      const steps = ar() ? ["افتح ملفات الأسابيع", "حطها تحت بعض", "اربط بكود الصنف", "احسب الإجماليات", "احفظ التقرير"] : ["open the weekly files", "stack them", "join on product code", "compute totals", "save the report"];
      return `<g ${an("rise", 0.05)}>${box(p, 160, 196, 236, "f-s1 s-line2")}${txt(p, 62, ar() ? "ورقة الخطوات" : "the steps, on a page", "t-ink", 13, 'font-weight="800"')}</g>
      ${steps.map((s, i) => `<g ${an("fade", 0.3 + i * 0.15)}><circle cx="${p - d * 78}" cy="${96 + i * 38}" r="11" class="f-acc-soft"/>${txt(p - d * 78, 100 + i * 38, digits(i + 1), "t-acc", 11.5, 'font-weight="800"')}${txt(p + d * 14, 100 + i * 38, s, "t-ink2", 11.5, bold)}</g>`).join("")}
      <path ${an("draw", 1.1, "s-ink2")} pathLength="1" d="M${p + d * 102} 160 H ${m - d * 56}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.3)}><circle cx="${m}" cy="160" r="48" class="f-acc"/><g class="an turn" style="--d:1.6s;transform-box:fill-box;transform-origin:center">${[0, 45, 90, 135].map((a) => `<rect x="${m - 4}" y="${160 - 30}" width="8" height="60" rx="3" class="f-white" transform="rotate(${a} ${m} 160)"/>`).join("")}</g><circle cx="${m}" cy="160" r="16" class="f-acc"/></g>
      <path ${an("draw", 1.6, "s-acc")} pathLength="1" d="M${m + 40} 112 A 62 62 0 1 1 ${m - 40} 112" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.8)}>${txt(m, 248, ar() ? "بيعيدها كل مرة" : "repeats them every time", "t-acc", 12.5, 'font-weight="800"')}${txt(m, 266, ar() ? "بنفس الدقة" : "with the same precision", "t-ink3", 11.5, bold)}</g>
      ${txt(240, 306, ar() ? "لو تقدر تشرحها في ورقة… تقدر تأتمتها" : "explain it on a page… and you can automate it", "t-ink2", 12.5, bold)}`;
    },
    x_ladder: () => {
      const R = ar() ? ["بالإيد", "معادلات وجدول محوري", "Power Query", "ماكرو", "برنامج من برّه (COM)"] : ["by hand", "formulas & pivots", "Power Query", "macros", "outside program (COM)"];
      const C = ["f-s2 s-line2", "f-acc-soft s-acc", "f-acc-soft s-acc", "f-acc", "f-mint"];
      const w = 176;
      return `${R.map((s, i) => { const x = mx(30 + i * 60 + w / 2), y = 268 - i * 50;
        return `<g ${an("rise", 0.1 + i * 0.2)}>${box(x, y, w, 38, C[i])}${txt(x, y + 5, s, i >= 3 ? "t-white" : "t-ink", 12, 'font-weight="800"')}</g>`; }).join("")}
      <path ${an("draw", 1.2, "s-acc")} pathLength="1" d="M${mx(60)} 230 V 70" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.5)}>${txt(mx(118), 52, ar() ? "توفير أكتر · وصف أدق" : "more savings · sharper description", "t-acc", 12, 'font-weight="800"')}</g>`;
    },
    x_formulas: () => {
      const t = mx(150), sm = mx(390), d = dirx();
      return `${grid(t, 132, 5, 8, 42, 20, "f-s1", 4, 0.05)}
      <g ${an("fade", 0.3)}>${txt(t, 40, ar() ? "الجدول الكبير" : "the big table", "t-ink3", 12, bold)}</g>
      ${grid(sm, 100, 2, 5, 52, 20, "f-s1", -1, 0.3)}<g ${an("fade", 0.5)}>${txt(sm, 40, ar() ? "شيت الأصناف" : "products sheet", "t-ink3", 12, bold)}</g>
      <path ${an("draw", 0.8, "s-mint")} pathLength="1" d="M${sm - d * 56} 120 C ${sm - d * 90} 120, ${t + d * 130} 150, ${t + d * 108} 150" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.0)}>${box(mx(310), 176, 120, 28, "f-mint", 0)}${txt(mx(310), 181, ar() ? "معادلة بحث" : "lookup formula", "t-white", 11.5, bold)}</g>
      <g ${an("rise", 1.4)}>${box(240, 262, 330, 50, "f-rose-soft s-rose")}${txt(240, 256, ar() ? "كل شهر من الأول: انسخ، واسحب المعادلة، وحدّث النطاق" : "every month again: copy, drag the formula, update the range", "t-rose", 11.5, 'font-weight="800"')}${txt(240, 274, ar() ? "والصف اللي برّه النطاق بيضيع" : "and a row outside the range is lost", "t-rose", 11, bold)}</g>`;
    },
    x_query: () => {
      const w = mx(220), d = dirx();
      const steps = ar() ? ["المصدر: فولدر الأسابيع", "حطّهم تحت بعض", "اربط بجدول الأصناف", "ظبّط أنواع الأعمدة"] : ["source: weekly folder", "stack them", "join the products table", "fix column types"];
      return `<g ${an("rise", 0.05)}>${box(w, 150, 300, 220, "f-s1 s-line2")}<rect x="${w - 150}" y="40" width="300" height="30" rx="12" class="f-s2"/>${txt(w, 60, ar() ? "إكسل · تبويب البيانات" : "Excel · Data tab", "t-ink2", 12, 'font-weight="800"')}</g>
      ${steps.map((s, i) => `<g ${an("pop", 0.4 + i * 0.2)}>${box(w, 98 + i * 40, 240, 30, "f-acc-soft s-acc")}${txt(w + d * 10, 103 + i * 40, s, "t-ink", 11.5, bold)}<circle cx="${w - d * 104}" cy="${98 + i * 40}" r="9" class="f-acc"/>${txt(w - d * 104, 102 + i * 40, digits(i + 1), "t-white", 10.5, 'font-weight="800"')}</g>`).join("")}
      <g ${an("pop", 1.4)}><circle cx="${mx(430)}" cy="150" r="34" class="f-mint"/><path d="M${mx(430) - 14} 142 a16 16 0 1 1 2 18" class="s-white" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M${mx(430) - 20} 136 l6 8 l8 -4" class="s-white" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${txt(mx(430), 206, ar() ? "تحديث" : "Refresh", "t-mint", 13, 'font-weight="800"')}</g>
      ${txt(240, 300, ar() ? "الخطوات اتسجّلت مرة… والتحديث بزرار" : "steps recorded once… refreshed with one button", "t-ink2", 13, bold)}`;
    },
    x_macro: () => {
      const r = mx(70), c = mx(240), b = mx(410), d = dirx();
      const code = ["Sub WeeklyReport()", "  Workbooks.Open …", "  Range(\"A2\").Copy …", "  ActiveWorkbook.Save", "End Sub"];
      return `<g ${an("pop", 0.1)}><circle cx="${r}" cy="140" r="30" class="f-s1 s-rose" stroke-width="3"/><circle cx="${r}" cy="140" r="14" class="f-rose"/>${txt(r, 194, ar() ? "تسجيل" : "Record", "t-rose", 12.5, 'font-weight="800"')}</g>
      <path ${an("draw", 0.4, "s-ink3")} pathLength="1" d="M${r + d * 34} 140 H ${c - d * 98}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 0.6)}><rect x="${c - 92}" y="70" width="184" height="140" rx="10" class="f-ink2"/>${code.map((s, i) => `<text x="${c - 80}" y="${98 + i * 24}" class="t-bg" font-size="11.5" font-family="var(--font-mono)" direction="ltr">${esc(s)}</text>`).join("")}</g>
      <path ${an("draw", 1.0, "s-ink3")} pathLength="1" d="M${c + d * 96} 140 H ${b - d * 44}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.2)}>${box(b, 140, 84, 40, "f-acc", 0)}${txt(b, 145, ar() ? "شغّل" : "Run", "t-white", 13, 'font-weight="800"')}</g>
      <g ${an("rise", 1.5)}>${box(240, 262, 300, 46, "f-amber-soft s-amber")}${txt(240, 256, ar() ? "اللي بيعمله ما بيتلغيش بـ «تراجع»" : "what it does can't be undone", "t-amber", 12, 'font-weight="800"')}${txt(240, 274, ar() ? "علشان كده: على نسخة دايمًا" : "so: always on a copy", "t-amber", 11.5, bold)}</g>`;
    },
    x_com: () => {
      const t = mx(118), e = mx(300), d = dirx();
      const L = ["> $xl = New-Object -Com Excel", "> open files (read-only)", "> stack · join · total", "> save result + log", "> $xl.Quit()"];
      return `<g ${an("rise", 0.05)}><rect x="${t - 104}" y="56" width="208" height="150" rx="10" class="f-ink2"/>${txt(t, 46, "PowerShell", "t-ink2", 12.5, 'font-weight="800" direction="ltr"')}
        ${L.map((s, i) => `<text x="${t - 94}" y="${82 + i * 26}" class="t-crt an type" style="--d:${0.3 + i * 0.25}s" font-size="10.5" font-family="var(--font-mono)" direction="ltr">${esc(s)}</text>`).join("")}</g>
      <path ${an("draw", 1.4, "s-acc")} pathLength="1" d="M${t + d * 108} 130 H ${e - d * 40}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("fade", 1.4)}>${txt(e - d * 50, 112, "COM", "t-acc", 12, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("pop", 1.6)}>${xl(e, 130, 1.4)}${txt(e, 178, ar() ? "إكسل في الخلفية" : "Excel, in the background", "t-ink2", 11.5, bold)}</g>
      ${[0, 1, 2].map((i) => `<g ${an("rise", 1.8 + i * 0.12)}><rect x="${mx(420) - 18}" y="${70 + i * 40}" width="36" height="30" rx="4" class="f-s1 s-mint" stroke-width="2"/><path d="M${mx(420) - 10} ${80 + i * 40} h20 M${mx(420) - 10} ${88 + i * 40} h14" class="s-mint" stroke-width="2"/></g>`).join("")}
      <path ${an("draw", 1.9, "s-ink3")} pathLength="1" d="M${e + d * 26} 130 H ${mx(420) - d * 24}" stroke-width="2" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 2.2)}>${box(240, 262, 360, 46, "f-mint-soft s-mint")}${txt(240, 256, ar() ? "من غير ما تنزّل حاجة: إكسل وPowerShell موجودين" : "nothing to install: Excel and PowerShell are already there", "t-mint", 11.5, 'font-weight="800"')}${txt(240, 274, ar() ? "فولدر كامل · الأصل ما يتلمسش · سجل بكل خطوة" : "a whole folder · originals untouched · a log of every step", "t-mint", 11, bold)}</g>`;
    },
    x_recipe: () => {
      const I = ar() ? ["المشكلة ووقتها", "المدخلات الحقيقية", "القواعد واستثناءاتها", "شكل النتيجة", "الاختبارات"] : ["problem & time", "real inputs", "rules & cases", "result shape", "tests"];
      const G = ar() ? ["على نسخة", "سجل تشغيل", "توقف واضح", "قفل إكسل"] : ["on a copy", "run log", "clear stop", "close Excel"];
      const X = rowX(5, 86, 6), Y = rowX(4, 104, 10);
      return `<g ${an("fade", 0.05)}>${txt(240, 46, ar() ? "خمس حاجات في الوصف" : "five parts of the description", "t-ink3", 12, bold)}</g>
      ${I.map((s, i) => `<g ${an("pop", 0.15 + i * 0.12)}>${box(X(i), 80, 86, 44, "f-acc-soft s-acc")}${txt(X(i), 85, s, "t-ink", 10.5, 'font-weight="800"')}</g>`).join("")}
      <g ${an("fade", 0.8)}>${txt(240, 136, ar() ? "وأربع قواعد أمان" : "and four safety rules", "t-ink3", 12, bold)}</g>
      ${G.map((s, i) => `<g ${an("pop", 0.9 + i * 0.12)}><path d="M${Y(i)} 150 l34 10 v18 c0 16 -16 26 -34 32 c-18 -6 -34 -16 -34 -32 v-18z" class="f-mint-soft s-mint" stroke-width="2"/>${txt(Y(i), 186, s, "t-mint", 11, 'font-weight="800"')}</g>`).join("")}
      <g ${an("pop", 1.6)}>${box(240, 262, 330, 42, "f-acc", 0)}${txt(240, 268, ar() ? "«اسألني عن كل اللي ناقصك قبل أي كود»" : "“Ask me what you're missing before any code”", "t-white", 12.5, 'font-weight="800"')}</g>`;
    },
    x_stack: () => {
      const X = rowX(4, 34, 8, mx(96)), t = mx(300), lg = mx(300), d = dirx();
      let files = ""; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) files += `<g ${an("pop", 0.05 + (r * 4 + c) * 0.05)}><rect x="${X(c) - 15}" y="${66 + r * 46}" width="30" height="36" rx="4" class="f-s1 s-acc" stroke-width="1.8"/><rect x="${X(c) - 9}" y="${74 + r * 46}" width="18" height="4" rx="2" class="f-acc-soft"/><rect x="${X(c) - 9}" y="${82 + r * 46}" width="14" height="4" rx="2" class="f-s3"/></g>`;
      return `${files}<g ${an("fade", 0.7)}>${txt(mx(96), 222, ar() ? "٥٢ ملف أسبوعي" : "52 weekly files", "t-ink2", 12, 'font-weight="800"')}</g>
      <path ${an("draw", 0.9, "s-acc")} pathLength="1" d="M${mx(186)} 130 H ${t - d * 66}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      ${grid(t, 118, 4, 9, 30, 15, "f-s1", 3, 1.1)}
      <g ${an("fade", 1.3)}>${txt(t, 40, ar() ? "جدول واحد + عمود «من أنهي ملف»" : "one table + a “source file” column", "t-ink2", 11.5, 'font-weight="800"')}</g>
      <g ${an("rise", 1.6)}>${box(lg, 236, 200, 60, "f-s2 s-line2")}${txt(lg, 224, ar() ? "السجل: ٥٢ ملف · ١٢٤٬٠٠٠ صف" : "log: 52 files · 124,000 rows", "t-ink", 11.5, 'font-weight="800"')}${txt(lg, 244, ar() ? "ملف ٣٧ اتوقف: عمود «الكمية» ناقص" : "file 37 stopped: “Qty” column missing", "t-rose", 11, bold)}</g>
      ${txt(240, 300, ar() ? "أقل من دقيقة… والسجل بيقول اللي ما اتعملش" : "under a minute… and the log says what wasn't done", "t-ink2", 12.5, bold)}`;
    },
    x_lookup: () => {
      const big = mx(170), p = mx(400), d = dirx();
      return `${grid(big, 130, 5, 9, 38, 17, "f-s1", [3, 4], 0.05)}
      <g ${an("fade", 0.3)}>${txt(big, 40, ar() ? "الجدول الكبير + أعمدة جديدة" : "the big table + new columns", "t-ink2", 11.5, 'font-weight="800"')}</g>
      ${[[ar() ? "الأصناف" : "products", 84], [ar() ? "الفروع" : "branches", 176]].map(([s, y], i) => `${grid(p, y, 2, 4, 40, 15, "f-s1", -1, 0.5 + i * 0.2)}<g ${an("fade", 0.6 + i * 0.2)}>${txt(p, y - 38, s, "t-ink3", 11.5, bold)}</g>
        <path ${an("draw", 0.9 + i * 0.2, "s-mint")} pathLength="1" d="M${p - d * 44} ${y} C ${p - d * 80} ${y}, ${big + d * 130} ${110 + i * 30}, ${big + d * 100} ${110 + i * 30}" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      <g ${an("rise", 1.5)}>${box(mx(170), 262, 230, 44, "f-rose-soft s-rose")}${txt(mx(170), 257, ar() ? "شيت «ما اتربطش»: ٣ أكواد" : "“unmatched” sheet: 3 codes", "t-rose", 12, 'font-weight="800"')}${txt(mx(170), 274, ar() ? "صنف جديد · مسافة زيادة في الكود" : "a new product · a stray space", "t-rose", 10.5, bold)}</g>
      ${check(mx(170) + d * 116, 242, 1.7, false)}`;
    },
    x_report: () => {
      const a = mx(78), r = mx(312), d = dirx();
      const rows = ar() ? [["فرع ١", 0.92], ["فرع ٢", 1.08], ["فرع ٣", 0.76]] : [["Branch 1", 0.92], ["Branch 2", 1.08], ["Branch 3", 0.76]];
      return `${[[ar() ? "المبيعات" : "sales", 90], [ar() ? "الأهداف" : "targets", 190]].map(([s, y], i) => `<g ${an("rise", 0.05 + i * 0.15)}>${xl(a, y - 6, 0.9)}${txt(a, y + 32, s, "t-ink2", 12, 'font-weight="800"')}</g>
        <path ${an("draw", 0.5 + i * 0.1, "s-ink3")} pathLength="1" d="M${a + d * 22} ${y - 6} C ${a + d * 70} ${y - 6}, ${r - d * 150} 140, ${r - d * 122} 140" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      <g ${an("rise", 0.8)}>${box(r, 140, 236, 180, "f-s1 s-acc", 2.5)}${txt(r, 70, ar() ? "تقرير الشهر" : "monthly report", "t-acc", 12.5, 'font-weight="800"')}</g>
      ${rows.map(([s, v], i) => { const y = 104 + i * 40; return `<g ${an("fade", 1.0 + i * 0.15)}>${txt(r - d * 80, y + 5, s, "t-ink", 11.5, bold)}</g>${grow(312 - 40, y - 7, Math.round(90 * Math.min(v, 1.1)), 14, v >= 1 ? "f-mint" : v >= 0.9 ? "f-amber" : "f-rose", 1.1 + i * 0.15)}
        <g ${an("fade", 1.3 + i * 0.15)}>${txt(r + d * 86, y + 5, digits(Math.round(v * 100)) + (ar() ? "٪" : "%"), "t-ink2", 11, 'font-weight="800"')}</g>`; }).join("")}
      <g ${an("pop", 1.8)}>${box(r, 206, 200, 30, "f-mint-soft s-mint")}${txt(r, 211, ar() ? "الإجمالي = المصدر ✓" : "total = source ✓", "t-mint", 12, 'font-weight="800"')}</g>
      ${txt(240, 296, ar() ? "أول تشغيل يتقارن بتقرير معمول بالإيد" : "the first run is compared with a hand-made report", "t-ink2", 12.5, bold)}`;
    },
    x_cliff: () => {
      const X = rowX(3, 132, 12, 240), a = mx(124), g = mx(356), d = dirx();
      const J = ar() ? ["ملفات تحت بعض", "بحث وربط", "تقرير من ملفين"] : ["stack files", "lookups", "two-file report"];
      return `${J.map((s, i) => `<g ${an("pop", 0.1 + i * 0.2)}>${box(X(i), 58, 132, 44, "f-s1 s-acc", 2, 'stroke-dasharray="6 4"')}${txt(X(i), 63, s, "t-acc", 12, 'font-weight="800"')}</g>`).join("")}
      <g ${an("rise", 0.7)}>${box(a, 158, 196, 92, "f-s1 s-mint")}${txt(a, 132, "ChatGPT", "t-mint", 12.5, 'font-weight="800" direction="ltr"')}${box(a, 168, 150, 30, "f-mint-soft s-mint", 1.5)}<path d="M${a - d * 52} 160 v12 M${a - d * 52 - 5} 168 l5 5 l5 -5" class="s-mint" stroke-width="2.4" fill="none" stroke-linecap="round"/>${txt(a + d * 12, 172, ar() ? "ملف تنزّله" : "a file to download", "t-ink", 11, bold)}</g>
      <g ${an("rise", 0.95)}>${box(g, 158, 196, 92, "f-s1 s-acc")}${txt(g, 132, "Gemini Enterprise", "t-acc", 12, 'font-weight="800" direction="ltr"')}<rect x="${g - 74}" y="148" width="148" height="38" rx="6" class="f-ink2"/>${[0, 1, 2].map((k) => `<rect x="${g - 64}" y="${155 + k * 9}" width="${[104, 80, 116][k]}" height="4" rx="2" class="f-crt"/>`).join("")}</g>
      <g ${an("fade", 1.2)}>${txt(240, 162, "?", "t-ink2", 22, 'font-weight="800"')}</g>
      <g ${an("pop", 1.5)}>${box(240, 262, 330, 46, "f-acc", 0)}${txt(240, 258, ar() ? "الوحدة الجاية: نبنيهم خطوة بخطوة" : "next unit: we build them step by step", "t-white", 12.5, 'font-weight="800"')}${txt(240, 276, ar() ? "على خطوط إنتاج مصنع تلفزيونات" : "on a TV factory's production lines", "t-white", 11, bold)}</g>`;
    }
  });

  /* ---------- unit 4 deck: from many files to one table (b_*) ---------- */
  const fileIcon = (x, y, cls = "s-acc", d = 0) =>   // a small file: folded corner, two lines
    `<g ${an("pop", d)}><path d="M${x - 14} ${y - 18} h20 l8 8 v28 h-28z" class="f-s1 ${cls}" stroke-width="1.8"/><rect x="${x - 8}" y="${y - 6}" width="16" height="3.5" rx="1.5" class="f-acc-soft"/><rect x="${x - 8}" y="${y + 2}" width="12" height="3.5" rx="1.5" class="f-s3"/></g>`;
  const folder = (x, y, w, h, cls = "f-amber-soft s-amber") =>
    `<path d="M${x - w / 2} ${y - h / 2 + 8} q0 -8 8 -8 h${w * 0.28} l8 8 h${w * 0.72 - 24} q8 0 8 8 v${h - 16} q0 8 -8 8 h-${w - 16} q-8 0 -8 -8z" class="${cls}" stroke-width="2"/>`;
  Object.assign(ART, {
    b_files: () => {
      const X = rowX(6, 30, 10, mx(150)), d = dirx();
      let files = ""; for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) files += fileIcon(X(c), 74 + r * 34, ["s-acc", "s-mint", "s-amber"][Math.floor(r / 2)], 0.05 + (r * 6 + c) * 0.02);
      const q = mx(380);
      return `${files}
      <g ${an("fade", 0.9)}>${txt(mx(150), 290, ar() ? "٣ فروع × ١٢ شهر" : "3 branches × 12 months", "t-ink2", 12.5, 'font-weight="800"')}</g>
      <g ${an("rise", 1.1)}><rect x="${q - 50}" y="74" width="100" height="128" rx="8" class="f-s1 s-rose" stroke-width="2.5"/>${[0, 1, 2, 3, 4].map((k) => `<rect x="${q - 36}" y="${94 + k * 18}" width="${[72, 60, 66, 50, 70][k]}" height="6" rx="3" class="f-s3"/>`).join("")}
        ${txt(q, 228, ar() ? "ملف الربع" : "quarter file", "t-rose", 12.5, 'font-weight="800"')}${txt(q, 246, ar() ? "٣٠٠ ألف صف" : "300,000 rows", "t-ink3", 11.5, bold)}</g>
      <g ${an("pop", 1.5)}>${box(q, 40, 150, 34, "f-acc", 0)}${txt(q, 45, ar() ? "= ٣٧ ملف" : "= 37 files", "t-white", 13, 'font-weight="800"')}</g>`;
    },
    b_shapes: () => {
      const H = ar() ? [["الفرع", "التاريخ", "الكمية"], ["اسم الفرع", "شهر/يوم", "الكمية"], ["الفرع", "ملاحظات", "التاريخ"]] : [["Branch", "Date", "Qty"], ["Branch name", "mm/dd", "Qty"], ["Branch", "Notes", "Date"]];
      const Y = [62, 132, 202], W = 84, cx = mx(206), d = dirx();
      const bad = [[], [0, 1], [1, 2]];
      return `${H.map((row, r) => `<g ${an("rise", 0.1 + r * 0.25)}>${row.map((h, c) => { const x = cx + d * (c - 1) * (W + 4); return `${box(x, Y[r], W, 32, bad[r].includes(c) ? "f-rose-soft s-rose" : "f-s1 s-line2")}${txt(x, Y[r] + 5, h, bad[r].includes(c) ? "t-rose" : "t-ink", 11, bold)}`; }).join("")}</g>`).join("")}
      <g ${an("fade", 0.9)}>${[0, 1, 2].map((r) => txt(cx - d * 164, Y[r] + 5, ar() ? ["القاهرة", "طنطا", "يونيو"][r] : ["Cairo", "Tanta", "June"][r], "t-ink3", 11, bold)).join("")}</g>
      <path ${an("draw", 1.1, "s-acc")} pathLength="1" d="M${cx + d * 134} 132 H ${mx(416) - d * 52}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.3)}>${box(mx(416), 132, 96, 132, "f-mint-soft s-mint")}${txt(mx(416), 92, ar() ? "القالب" : "template", "t-mint", 12.5, 'font-weight="800"')}${(ar() ? ["الفرع", "التاريخ", "الكمية"] : ["Branch", "Date", "Qty"]).map((s, i) => `${box(mx(416), 116 + i * 28, 78, 22, "f-s1 s-mint", 1.5)}${txt(mx(416), 120 + i * 28, s, "t-ink", 10.5, bold)}`).join("")}</g>
      ${txt(240, 296, ar() ? "نفس الأعمدة · بنفس الأسماء · بنفس الترتيب" : "same columns · same names · same order", "t-ink2", 12.5, bold)}`;
    },
    b_stack: () => {
      const X = rowX(3, 34, 8, mx(90)), t = mx(320), d = dirx();
      let files = ""; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) files += fileIcon(X(c), 82 + r * 50, ["s-acc", "s-mint", "s-amber"][r], 0.05 + (r * 3 + c) * 0.05);
      const rows = ar() ? ["قاهرة-يناير", "قاهرة-فبراير", "طنطا-مارس", "طنطا-مارس", "إسكندرية-أبريل"] : ["Cairo-Jan", "Cairo-Feb", "Tanta-Mar", "Tanta-Mar", "Alex-Apr"];
      const src = t - d * 70;
      return `${files}
      <path ${an("draw", 0.6, "s-acc")} pathLength="1" d="M${mx(160)} 132 H ${t - d * 128}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      ${grid(t + d * 30, 132, 3, 6, 54, 22, "f-s1", -1, 0.8)}
      <g ${an("rise", 1.0)}><rect x="${src - 52}" y="66" width="104" height="132" rx="6" class="f-mint-soft s-mint" stroke-width="2"/>${txt(src, 82, ar() ? "المصدر" : "Source", "t-mint", 11.5, 'font-weight="800"')}
        ${rows.map((s, i) => txt(src, 105 + i * 22, s, i === 2 ? "t-acc" : "t-ink2", 9.5, i === 2 ? 'font-weight="800"' : bold)).join("")}</g>
      <g ${an("pop", 1.5)}><circle cx="${src}" cy="149" r="15" class="s-acc" fill="none" stroke-width="2.5"/></g>
      <g ${an("rise", 1.7)}>${box(240, 262, 330, 44, "f-acc-soft s-acc")}${txt(240, 258, ar() ? "«ليه طنطا في مارس عالية؟»" : "“Why is Tanta high in March?”", "t-acc", 12, 'font-weight="800"')}${txt(240, 276, ar() ? "فلتر على المصدر… والصف في دقيقة" : "filter by Source… the row in a minute", "t-ink2", 11, bold)}</g>`;
    },
    b_check: () => {
      const L = ar() ? [["من غير كود صنف", "١٬٢٠٠"], ["متكرر بالظبط", "٣٤٠"], ["كمية بالسالب", "٢٨"], ["سعر ×١٠", "١"], ["تاريخ برّه الفترة", "٦٤"]] : [["no product code", "1,200"], ["exact duplicates", "340"], ["negative quantity", "28"], ["price ×10", "1"], ["date out of range", "64"]];
      const p = mx(200), m = mx(410), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(p, 152, 270, 236, "f-s1 s-line2")}<rect x="${p - 135}" y="34" width="270" height="34" rx="12" class="f-acc-soft"/>${txt(p, 56, ar() ? "تقرير الجودة · ٤١٢ ألف صف" : "quality report · 412,000 rows", "t-acc", 12, 'font-weight="800"')}</g>
      ${L.map(([s, n], i) => { const y = 92 + i * 38; return `<g ${an("fade", 0.3 + i * 0.15)}>${check(p - d * 112, y, 0.35 + i * 0.15, false)}${txt(p - d * 10, y + 4, s, "t-ink", 11.5, bold)}${txt(p + d * 104, y + 4, n, "t-rose", 12, 'font-weight="800"')}</g>`; }).join("")}
      <g ${an("pop", 1.3)}><circle cx="${m}" cy="132" r="36" class="f-s1 s-amber" stroke-width="3.5"/><circle cx="${m - 6}" cy="126" r="14" class="s-amber" fill="none" stroke-width="3.5"/><line x1="${m + 4}" y1="136" x2="${m + 18}" y2="150" class="s-amber" stroke-width="4" stroke-linecap="round"/></g>
      <g ${an("fade", 1.5)}>${txt(m, 190, ar() ? "قبل الجدول" : "before the", "t-amber", 12, 'font-weight="800"')}${txt(m, 208, ar() ? "المحوري" : "pivot table", "t-amber", 12, 'font-weight="800"')}</g>`;
    },
    b_clean: () => {
      const r = mx(130), c = mx(350), d = dirx();
      const rules = ar() ? ["«فرع طنطا» ← «طنطا»", "تاريخ كنص ← تاريخ", "المتكرر: نسخة واحدة", "الكمية السالبة: للمراجعة"] : ["“Tanta branch” → “Tanta”", "text date → date", "duplicates: keep one", "negative qty: review"];
      return `<g ${an("rise", 0.05)}>${box(r, 140, 220, 196, "f-s1 s-line2")}${txt(r, 64, ar() ? "ملف القواعد" : "rules file", "t-ink", 12.5, 'font-weight="800"')}</g>
      ${rules.map((s, i) => `<g ${an("fade", 0.3 + i * 0.15)}>${box(r, 96 + i * 38, 196, 30, i === 3 ? "f-amber-soft s-amber" : "f-acc-soft s-acc", 1.5)}${txt(r, 100 + i * 38, s, "t-ink", 10.5, bold)}</g>`).join("")}
      <path ${an("draw", 1.0, "s-acc")} pathLength="1" d="M${r + d * 114} 140 H ${c - d * 76}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 1.1)}>${fileIcon(c - d * 38, 102, "s-ink3", 1.1)}${txt(c - d * 38, 136, ar() ? "الأصل" : "original", "t-ink3", 11, bold)}${fileIcon(c + d * 38, 102, "s-mint", 1.3)}${txt(c + d * 38, 136, ar() ? "النسخة" : "the copy", "t-mint", 11, 'font-weight="800"')}</g>
      <g ${an("pop", 1.4)}>${box(c - d * 38, 160, 86, 22, "f-s2 s-line2", 1.5)}${txt(c - d * 38, 164, ar() ? "ما اتلمسش" : "untouched", "t-ink2", 10, bold)}</g>
      <g ${an("rise", 1.6)}>${box(c, 222, 180, 58, "f-s2 s-line2")}${txt(c, 214, ar() ? "السجل" : "log", "t-ink", 11.5, 'font-weight="800"')}${txt(c, 234, ar() ? "قاعدة ٣ · ٣٤٠ صف" : "rule 3 · 340 rows", "t-acc", 11, bold)}</g>`;
    },
    b_link: () => {
      const big = mx(170), p = mx(400), d = dirx();
      return `${grid(big, 124, 4, 9, 44, 17, "f-s1", [2, 3], 0.05)}
      <g ${an("fade", 0.3)}>${txt(big, 34, ar() ? "الجدول الكبير + اسم ومجموعة" : "big table + name and group", "t-ink2", 11.5, 'font-weight="800"')}</g>
      ${grid(p, 96, 3, 5, 30, 16, "f-s1", -1, 0.4)}<g ${an("fade", 0.5)}>${txt(p, 46, ar() ? "الأصناف" : "Products", "t-ink3", 11.5, bold)}</g>
      <path ${an("draw", 0.8, "s-mint")} pathLength="1" d="M${p - d * 50} 100 C ${p - d * 90} 100, ${big + d * 140} 112, ${big + d * 92} 112" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.1)}>${box(p, 168, 104, 28, "f-mint", 0)}${txt(p, 173, ar() ? "٩٨٪ اتربطت" : "98% linked", "t-white", 12, 'font-weight="800"')}</g>
      <g ${an("rise", 1.4)}>${box(big, 262, 236, 46, "f-rose-soft s-rose")}${txt(big, 257, ar() ? "شيت «ما اتربطش»: ٢٪" : "“Unmatched” sheet: 2%", "t-rose", 12, 'font-weight="800"')}${txt(big, 274, ar() ? "صنف جديد · مسافة زيادة" : "a new product · a stray space", "t-rose", 10.5, bold)}</g>
      <path ${an("draw", 1.6, "s-rose")} pathLength="1" d="M${big + d * 124} 262 C ${big + d * 170} 262, ${p - d * 20} 240, ${p} 196" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
      <g ${an("fade", 1.8)}>${txt(p, 226, ar() ? "حدّث القايمة" : "update the list", "t-rose", 11, 'font-weight="800"')}</g>`;
    },
    b_big: () => {
      const e = mx(90), pr = mx(250), s = mx(410), d = dirx();
      return `<g ${an("rise", 0.05)}>${[0, 1, 2, 3].map((k) => `<rect x="${e - 46 + k * 4 * d}" y="${70 - k * 6}" width="92" height="140" rx="6" class="f-s1 s-line2" stroke-width="2"/>`).join("")}${txt(e, 140, ar() ? "٤١٢ ألف صف" : "412,000 rows", "t-ink", 12, 'font-weight="800"')}${txt(e, 236, ar() ? "٣٧ ملف" : "37 files", "t-ink3", 11.5, bold)}</g>
      <path ${an("draw", 0.5, "s-acc")} pathLength="1" d="M${e + d * 56} 140 H ${pr - d * 62}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 0.7)}><rect x="${pr - 58}" y="96" width="116" height="88" rx="12" class="f-ink2"/><g class="an turn" style="--d:1.2s;transform-box:fill-box;transform-origin:center">${[0, 60, 120].map((a) => `<rect x="${pr - 4}" y="${140 - 26}" width="8" height="52" rx="3" class="f-white" transform="rotate(${a} ${pr} 140)"/>`).join("")}</g><circle cx="${pr}" cy="140" r="12" class="f-ink2"/>
        ${txt(pr, 206, ar() ? "برنامج صغير" : "small program", "t-ink", 12, 'font-weight="800"')}${txt(pr, 224, ar() ? "برّه إكسل" : "outside Excel", "t-ink3", 11, bold)}</g>
      <path ${an("draw", 1.1, "s-mint")} pathLength="1" d="M${pr + d * 62} 140 H ${s - d * 42}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.3)}>${xl(s, 124, 1.2)}${txt(s, 168, ar() ? "ملخّص" : "summary", "t-mint", 12, 'font-weight="800"')}${txt(s, 186, ar() ? "٢٬٤٠٠ صف" : "2,400 rows", "t-ink3", 11, bold)}</g>
      <g ${an("rise", 1.6)}>${box(240, 276, 360, 36, "f-amber-soft s-amber")}${txt(240, 281, ar() ? "حدّ إكسل: حوالي مليون صف في الشيت" : "Excel's limit: about a million rows per sheet", "t-amber", 11.5, 'font-weight="800"')}</g>`;
    },
    b_folder: () => {
      const F = ar() ? [["الداخل", "نسخ الأصل"], ["الخارج", "النتايج"], ["السجل", "كل تشغيل"], ["القواعد", "التنضيف"]] : [["Input", "copies"], ["Output", "results"], ["Log", "each run"], ["Rules", "cleaning"]];
      const X = rowX(4, 96, 14);
      return `<g ${an("rise", 0.05)}>${folder(240, 66, 200, 64, "f-amber s-amber")}${txt(240, 76, ar() ? "مشروع المبيعات" : "sales project", "t-white", 13, 'font-weight="800"')}</g>
      ${F.map(([n, s], i) => `<path ${an("draw", 0.4 + i * 0.1, "s-ink3")} pathLength="1" d="M240 100 V 122 H ${X(i)} V 146" stroke-width="2" fill="none"/>
        <g ${an("pop", 0.6 + i * 0.15)}>${folder(X(i), 176, 92, 54)}${txt(X(i), 182, n, "t-ink", 12, 'font-weight="800"')}${txt(X(i), 222, s, "t-ink3", 11, bold)}</g>`).join("")}
      <g ${an("rise", 1.4)}>${box(240, 274, 340, 40, "f-mint-soft s-mint")}${txt(240, 279, ar() ? "الشهر الجاي: ملفات جديدة في «الداخل» وتشغيل" : "next month: new files in “Input”, then run", "t-mint", 11.5, 'font-weight="800"')}</g>`;
    },
    b_editor: () => {
      const L = mx(96), M = mx(296), d = dirx();
      const files = ar() ? ["الداخل", "الخارج", "السجل", "القواعد"] : ["Input", "Output", "Log", "Rules"];
      return `<g ${an("rise", 0.05)}><rect x="34" y="40" width="412" height="230" rx="12" class="f-s1 s-line2" stroke-width="2"/><rect x="34" y="40" width="412" height="26" rx="12" class="f-s2"/>${[0, 1, 2].map((k) => `<circle cx="${mx(52 + k * 14)}" cy="53" r="4.5" class="${["f-rose", "f-amber", "f-mint"][k]}"/>`).join("")}${txt(240, 58, "VS Code", "t-ink2", 11, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("fade", 0.3)}><rect x="${ar() ? 446 - 120 : 34}" y="66" width="120" height="204" class="f-s2"/>${files.map((s, i) => `<g>${folder(L - d * 30, 92 + i * 34, 22, 16)}${txt(L + d * 12, 96 + i * 34, s, "t-ink2", 11, bold)}</g>`).join("")}</g>
      <g ${an("fade", 0.6)}>${[0, 1, 2, 3, 4].map((k) => `<rect x="${ar() ? M + 110 - [180, 140, 160, 120, 150][k] : M - 110}" y="${84 + k * 18}" width="${[180, 140, 160, 120, 150][k]}" height="7" rx="3" class="f-s3"/>`).join("")}</g>
      <g ${an("rise", 0.9)}><rect x="${M - 124}" y="192" width="248" height="66" rx="6" class="f-ink2"/>${["> run", "37 files · 412,000 rows", "log saved"].map((s, i) => `<text x="${M - 112}" y="${212 + i * 18}" class="t-crt" font-size="10.5" font-family="var(--font-mono)" direction="ltr">${esc(s)}</text>`).join("")}</g>
      <g ${an("pop", 1.3)}>${box(M + d * 74, 112, 112, 52, "f-acc", 0)}${txt(M + d * 74, 108, ar() ? "المساعد" : "assistant", "t-white", 11.5, 'font-weight="800"')}${txt(M + d * 74, 126, ar() ? "شايف الفولدر" : "sees the folder", "t-white", 10.5, bold)}</g>
      ${txt(240, 300, ar() ? "الملفات · الملف اللي بتراجعه · مكان التشغيل" : "files · the file you review · where you run", "t-ink2", 12, bold)}`;
    },
    b_levels: () => {
      const a = mx(130), b = mx(350), d = dirx();
      const fast = ar() ? ["توحيد الأسماء", "رسايل السجل", "أسئلة صغيرة"] : ["unify names", "log messages", "small questions"];
      const deep = ar() ? ["تصميم قواعد الفحص", "قواعد التنضيف", "نتيجة غريبة؟"] : ["design the checks", "cleaning rules", "an odd result?"];
      const col = (x, title, sub, items, cls, tcls, d0) => `<g ${an("rise", d0)}>${box(x, 150, 200, 220, cls)}${txt(x, 66, title, tcls, 14, 'font-weight="800"')}${txt(x, 86, sub, "t-ink3", 11, bold)}</g>
        ${items.map((s, i) => `<g ${an("pop", d0 + 0.3 + i * 0.15)}>${box(x, 124 + i * 44, 168, 34, "f-s1 s-line2", 1.5)}${txt(x, 129 + i * 44, s, "t-ink", 11.5, bold)}</g>`).join("")}`;
      return `${col(a, ar() ? "سريع" : "Fast", ar() ? "ثانية · تكلفة أقل" : "a second · lower cost", fast, "f-mint-soft s-mint", "t-mint", 0.05)}
      ${col(b, ar() ? "عميق" : "Deep", ar() ? "وقت أكتر · تكلفة أكتر" : "more time · more cost", deep, "f-acc-soft s-acc", "t-acc", 0.4)}
      <g ${an("pop", 1.5)}><circle cx="240" cy="150" r="22" class="f-s1 s-ink3" stroke-width="2"/>${txt(240, 155, ar() ? "أو" : "or", "t-ink2", 13, 'font-weight="800"')}</g>
      ${txt(240, 300, ar() ? "المستوى على قد المهمة" : "the level fits the task", "t-ink2", 13, bold)}`;
    },
    b_result: () => {
      const t = mx(140), r = mx(360), d = dirx();
      return `${grid(t, 120, 4, 8, 44, 18, "f-s1", -1, 0.05)}
      <g ${an("fade", 0.3)}>${txt(t, 34, ar() ? "جدول واحد نضيف" : "one clean table", "t-ink2", 12, 'font-weight="800"')}</g>
      ${(ar() ? ["تقرير الجودة", "السجل", "«ما اتربطش»"] : ["quality report", "log", "“Unmatched”"]).map((s, i) => { const x = t + d * (i - 1) * 74; return `<g ${an("pop", 0.5 + i * 0.15)}>${box(x, 226, 68, 30, "f-s2 s-line2", 1.5)}${txt(x, 230, s, "t-ink2", 9.5, bold)}</g>`; }).join("")}
      <g ${an("rise", 0.9)}>${box(r, 70, 196, 40, "f-s1 s-line2")}${txt(r, 75, ar() ? "صفوف الملفات: ٤١٢٬٣٤٠" : "rows in files: 412,340", "t-ink", 11.5, bold)}</g>
      <g ${an("rise", 1.1)}>${box(r, 122, 196, 40, "f-s1 s-line2")}${txt(r, 127, ar() ? "صفوف الجدول: ٤١٢٬٠٠٠" : "rows in table: 412,000", "t-ink", 11.5, bold)}</g>
      <g ${an("pop", 1.4)}>${box(r, 182, 196, 48, "f-mint-soft s-mint")}${txt(r, 177, ar() ? "٣٤٠ صف متكرر" : "340 duplicate rows", "t-mint", 12, 'font-weight="800"')}${txt(r, 195, ar() ? "قيمتهم ١٨٬٦٠٠ ج = فرق المبيعات" : "worth 18,600 = the sales gap", "t-ink3", 10.5, bold)}</g>
      ${check(r + d * 112, 182, 1.6, true)}
      ${txt(240, 296, ar() ? "كل جنيه معروف راح فين" : "every pound accounted for", "t-ink2", 13, bold)}`;
    },
    b_cliff: () => {
      const t = mx(110), q = mx(372), d = dirx();
      const br = ar() ? ["القاهرة", "طنطا", "إسكندرية"] : ["Cairo", "Tanta", "Alexandria"];
      return `${grid(t, 120, 3, 7, 40, 18, "f-s1", -1, 0.05)}<g ${an("fade", 0.3)}>${txt(t, 40, ar() ? "الأرقام جاهزة" : "numbers ready", "t-mint", 12, 'font-weight="800"')}</g>
      ${br.map((s, i) => { const y = 74 + i * 66; return `<path ${an("draw", 0.6 + i * 0.15, "s-ink3")} pathLength="1" d="M${t + d * 66} 120 C ${t + d * 120} 120, ${q - d * 110} ${y}, ${q - d * 64} ${y}" stroke-width="2" stroke-dasharray="1" fill="none" marker-end="url(#aih-arrow)"/>
        <g ${an("pop", 0.9 + i * 0.2)}>${page(q - d * 30, y, 52, 56, "", [28, 22, 26], 0.9 + i * 0.2)}<rect x="${q - d * 30 - 26}" y="${y - 28}" width="52" height="12" rx="4" class="f-acc"/>${txt(q + d * 40, y + 5, s, "t-ink", 11.5, bold)}</g>`; }).join("")}
      <g ${an("pop", 1.7)}><circle cx="${q - d * 30}" cy="270" r="20" class="f-acc"/>${txt(q - d * 30, 278, ar() ? "؟" : "?", "t-white", 22, 'font-weight="800"')}</g>
      <g ${an("fade", 1.9)}>${txt(t, 262, ar() ? "الخطوة الجاية" : "next step", "t-acc", 13, 'font-weight="800"')}${txt(t, 282, ar() ? "تقارير بتطلع لوحدها" : "reports that build themselves", "t-ink2", 11.5, bold)}</g>`;
    }
  });

  /* ---------- unit 2 decks: Excel automation, one project per lesson (xk_ describe, xd_ delivery, xs_ stack, xj_ join, xr_ report, xm_ purchasing match, xn_ materials need, xt_ when it stops) ---------- */
  const tr = (a, e) => (ar() ? a : e);
  const b8 = 'font-weight="800"';
  const cap = (s, d = 1.8, y = 302) => `<g ${an("fade", d)}>${txt(240, y, s, "t-ink2", 12.5, bold)}</g>`;
  const pill = (cx, cy, w, h, s, cls, tcls, size = 12, d = 0, kind = "pop") => `<g ${an(kind, d)}>${box(cx, cy, w, h, cls)}${txt(cx, cy + size * 0.36, s, tcls, size, b8)}</g>`;
  const mono = (x, y, s, cls = "t-crt", size = 10.5, extra = "") => `<text x="${x}" y="${y}" class="${cls}" font-size="${size}" font-family="var(--font-mono)" direction="ltr" ${extra}>${esc(s)}</text>`;
  const term = (cx, cy, w, h, lines, d, size = 10.5, cls = (i) => "t-crt") =>   // a dark console: left-aligned code lines, typed in one after another
    `<g ${an("rise", d)}><rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="10" class="f-ink2"/></g>
      ${lines.map((s, i) => `<text x="${cx - w / 2 + 12}" y="${cy - h / 2 + 24 + i * (size + 9)}" class="${cls(i)} an type" style="--d:${d + 0.25 + i * 0.2}s" font-size="${size}" font-family="var(--font-mono)" direction="ltr">${esc(s)}</text>`).join("")}`;
  const bubble = (cx, cy, w, h, cls, left = true) => { const tx = left ? cx - w / 2 + 18 : cx + w / 2 - 18;
    return `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="14" class="${cls}" stroke-width="2"/><path d="M${tx - 7} ${cy + h / 2 - 1} l7 11 l7 -11z" class="${cls}" stroke-width="2"/>`; };
  const copyIco = (x, y) => `<rect x="${x - 7}" y="${y - 9}" width="11" height="13" rx="2" class="f-s1 s-ink2" stroke-width="1.8"/><rect x="${x - 3}" y="${y - 5}" width="11" height="13" rx="2" class="f-s1 s-ink2" stroke-width="1.8"/>`;
  const dl = (x, y, cls = "s-mint") => `<path d="M${x} ${y - 9} v13 M${x - 6} ${y - 1} l6 6 l6 -6 M${x - 9} ${y + 9} h18" class="${cls}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const laptop = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-34" y="-24" width="68" height="44" rx="5" class="f-s1 s-ink2" stroke-width="2.5"/><rect x="-27" y="-17" width="54" height="30" rx="2" class="f-acc-soft"/><path d="M-44 24 h88 l-6 8 h-76z" class="f-ink2"/></g>`;
  const stopSign = (x, y, r = 24) => { const p = [...Array(8)].map((_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`; }).join(" ");
    return `<polygon points="${p}" class="f-rose"/><rect x="${x - r * 0.55}" y="${y - 3.5}" width="${r * 1.1}" height="7" rx="2" class="f-white"/>`; };
  const cells = (cx, cy, vals, w, h, cls, tcls, size = 10.5, d = 0) => { const X = rowX(vals.length, w, 3, cx);   // one row of labelled cells, mirrored for Arabic
    return `<g ${an("rise", d)}>${vals.map((v, i) => `<rect x="${X(i) - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="4" class="${[].concat(cls)[i] || [].concat(cls)[0]}"/>${v === "" ? "" : txt(X(i), cy + size * 0.36, v, [].concat(tcls)[i] || [].concat(tcls)[0], size, bold)}`).join("")}</g>`; };
  const n_ = (s) => digits(s).replace(/,/g, ar() ? "٬" : ",").replace(/\./g, ar() ? "٫" : ".");
  const rowL = (cx, cy, vals, w, h, cls, tcls, size = 10, d = 0, gap = 4) => {   // one row of an English sheet: left to right in both languages
    const X = (i) => cx + (i - (vals.length - 1) / 2) * (w + gap);
    return `<g ${an("rise", d)}>${vals.map((v, i) => `<rect x="${X(i) - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="4" class="${[].concat(cls)[i] || [].concat(cls)[0]}"/>${v === "" ? "" : txt(X(i), cy + size * 0.36, v, [].concat(tcls)[i] || [].concat(tcls)[0], size, 'font-weight="700" direction="ltr"')}`).join("")}</g>`; };

  Object.assign(ART, {
    /* ----- describing the file, and the unit's ladder (data/kit-story.js) ----- */
    xk_scene: () => {
      const a = mx(128), b = mx(354);
      return `${sheet(a, 118, 200, 134, "f-s1 s-ink2", "Production_Week_03.xlsx", 0.05)}
      <g ${an("fade", 0.3)}>${txt(a, 214, tr("الملف قدامك", "the file in front of you"), "t-ink2", 12, b8)}</g>
      <line ${an("fade", 0.5, "s-line2")} x1="240" y1="40" x2="240" y2="236" stroke-width="2" stroke-dasharray="6 6"/>
      <g ${an("pop", 0.7)}>${bubble(b, 112, 176, 108, "f-acc-soft s-acc", ar())}${txt(b, 128, tr("؟", "?"), "t-acc", 44, b8)}</g>
      <g ${an("fade", 1.0)}>${txt(b, 214, tr("النموذج ما شافهوش", "the model has never seen it"), "t-acc", 12, b8)}</g>
      ${cap(tr("كل اللي هيعرفه… هو اللي هتكتبه", "all it will know… is what you write"), 1.4)}`;
    },
    xk_ladder: () => {
      const X = rowX(8, 50, 6), top = (i) => 232 - i * 21;
      const G = [[[0, 1], tr("تمهيد", "warm-up"), "t-ink2"], [[2, 3, 4], tr("التلات أدوات", "the three tools"), "t-acc"], [[5, 6], tr("مشتريات وخامات", "purchasing"), "t-mint"], [[7], tr("لما توقف", "fixing"), "t-rose"]];
      const fill = (i) => (i < 2 ? "f-s2 s-line2" : i < 5 ? "f-acc-soft s-acc" : i < 7 ? "f-mint-soft s-mint" : "f-rose-soft s-rose");
      return `${[...Array(8)].map((_, i) => `<g ${an("rise", 0.1 + i * 0.1)}><rect x="${X(i) - 25}" y="${top(i)}" width="50" height="${270 - top(i)}" rx="6" class="${fill(i)}" stroke-width="1.5"/><circle cx="${X(i)}" cy="${top(i) + 16}" r="11" class="f-white"/>${txt(X(i), top(i) + 20.5, digits(i + 1), "t-ink", 12, b8)}</g>`).join("")}
      ${G.map(([is, s, tc], k) => { const cx = is.reduce((a, i) => a + X(i), 0) / is.length, y = Math.min(...is.map(top)) - 14; return `<g ${an("fade", 1.0 + k * 0.15)}>${txt(cx, y, s, tc, 11.5, b8)}</g>`; }).join("")}
      ${cap(tr("فكرة جديدة واحدة في كل درجة", "one new idea on each step"), 1.7, 298)}`;
    },
    xk_zip: () => {
      const r = mx(58), c = mx(78), z = mx(404), d = dirx();
      const rows = [["Data/", tr("ملفات الإكسل بالإنجليزي", "the Excel files, in English"), "f-mint-soft s-mint"], ["README.txt", tr("المهمة ودليل البيانات", "the task and the dictionary"), "f-acc-soft s-acc"], ["Prompt.txt", tr("جاهز تنسخه", "ready to copy"), "f-acc-soft s-acc"], ["Answer_Key.txt", tr("بعد التشغيل بس", "after the run only"), "f-amber-soft s-amber"]];
      return `<g ${an("rise", 0.05)}>${folder(r + d * 40, 50, 104, 34)}${txt(r + d * 176, 56, "Lesson_1_Describe_The_Data/", "t-ink", 11, 'font-weight="800" direction="ltr"')}</g>
      <path ${an("draw", 0.3, "s-line2")} pathLength="1" d="M${c} 70 V ${100 + 3 * 46}" stroke-width="2" fill="none"/>
      ${rows.map(([f, s, cls], i) => { const y = 100 + i * 46;
        return `<g ${an("fade", 0.4 + i * 0.15)}><path d="M${c} ${y} h${d * 18}" class="s-line2" stroke-width="2"/>${box(c + d * 120, y, 200, 36, cls, 1.5)}${txt(c + d * 120, y - 2, f, "t-ink", 10.5, 'font-weight="800" direction="ltr"')}${txt(c + d * 120, y + 12, s, "t-ink3", 9.5, bold)}</g>`; }).join("")}
      <g ${an("pop", 1.1)}>${folder(z, 140, 92, 70, "f-acc-soft s-acc")}<rect x="${z - 5}" y="${110}" width="10" height="56" rx="2" class="f-acc"/>${[0, 1, 2, 3].map((k) => `<rect x="${z - 8}" y="${114 + k * 12}" width="16" height="4" rx="1" class="f-white"/>`).join("")}</g>
      <g ${an("fade", 1.3)}>${txt(z, 198, ".zip", "t-acc", 13, 'font-weight="800" direction="ltr"')}${txt(z, 218, tr("لكل درس", "per lesson"), "t-ink2", 11, b8)}</g>
      ${cap(tr("بيانات، ومهمة، وPrompt، وإجابة… في ملف واحد", "data, a task, a Prompt and an answer… in one zip"), 1.6)}`;
    },
    xk_english: () => {
      const H = ["Date", "WorkOrder", "LineCode", "ModelCode", "Qty", "Value"], X = (i) => 240 + (i - 2.5) * 74;
      const a = mx(140), b = mx(340);
      return `<g ${an("rise", 0.05)}>${H.map((h, i) => `<rect x="${X(i) - 35}" y="48" width="70" height="30" rx="4" class="${i === 4 ? "f-mint-soft" : "f-acc-soft"}"/>${txt(X(i), 67, h, i === 4 ? "t-mint" : "t-acc", 10.5, 'font-weight="800" direction="ltr"')}`).join("")}</g>
      <g ${an("fade", 0.3)}>${txt(240, 34, "Production", "t-ink3", 11, 'font-weight="700" direction="ltr"')}</g>
      <path ${an("draw", 0.7, "s-mint")} pathLength="1" d="M${X(4)} 82 C ${X(4)} 120, ${b} 120, ${b} 150" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 0.9)}>${box(a, 176, 170, 44, "f-rose-soft s-rose", 1.5)}${txt(a, 181, tr("«عمود الكمية»", "“the quantity column”"), "t-rose", 12, b8)}<line x1="${a - 70}" y1="176" x2="${a + 70}" y2="176" class="s-rose" stroke-width="2"/></g>
      <g ${an("pop", 1.1)}>${box(b, 176, 170, 44, "f-mint-soft s-mint", 1.5)}${txt(b, 181, "Qty", "t-mint", 14, 'font-weight="800" direction="ltr"')}</g>${check(b + 70, 156, 1.3)}
      <g ${an("fade", 1.3)}>${txt(a, 222, tr("عمود مش موجود", "a column that isn't there"), "t-ink3", 11, bold)}${txt(b, 222, tr("الاسم بالحرف", "the name, letter for letter"), "t-ink3", 11, bold)}</g>
      ${cap(tr("الكلام بلغتك… والأسماء بالحرف", "your words in your language… the names letter for letter"), 1.6)}`;
    },
    xk_columns: () => {
      const H = ["Date", "WorkOrder", "LineCode", "ModelCode", "Qty", "Value"], X = (i) => 240 + (i - 2.5) * 74;
      const V = ["2026-01-15", "WO-00205", "L01", "M103", "42", "193,200"], R = ["2026-01-15", "WO-00208", "L02", "M111", "18", "441,000"];
      const row = (y, vals, cls, tcls, d) => `<g ${an("rise", d)}>${vals.map((v, i) => `<rect x="${X(i) - 35}" y="${y - 15}" width="70" height="30" rx="4" class="${cls}"/>${txt(X(i), y + 4, v, tcls, 10, 'font-weight="700" direction="ltr"')}`).join("")}</g>`;
      return `${row(64, H, "f-acc-soft", "t-acc", 0.05)}${row(100, V, "f-s1", "t-ink", 0.3)}${row(136, R, "f-s1", "t-ink", 0.45)}
      ${[[[0], tr("تاريخ حقيقي", "a real date"), "t-acc", 0.9], [[2, 3], tr("أكواد بس… الأسماء في ملفات تانية", "codes only… names live in other files"), "t-acc", 1.1], [[4, 5], tr("Value = Qty × التكلفة المعيارية", "Value = Qty × standard cost"), "t-mint", 1.3]].map(([cs, s, tc, dd], k) => {
        const cx = cs.reduce((a, i) => a + X(i), 0) / cs.length, y = 186 + k * 34;
        return `<g ${an("fade", dd)}><path d="M${cx} 154 V ${y - 12}" class="s-line2" stroke-width="1.8" stroke-dasharray="3 3"/>${txt(Math.max(120, Math.min(360, cx)), y, s, tc, 11.5, b8)}</g>`; }).join("")}
      ${cap(tr("كل عمود ليه حكاية… والنموذج محتاج يسمعها", "every column has a story… the model needs to hear it"), 1.6, 300)}`;
    },
    xk_odd: () => {
      const X = (i) => 240 + (i - 2.5) * 74, a = mx(128), b = mx(352);
      const R = [["2026-01-20", "WO-00287", "L05", "M112", "11", "343,200", 0], ["2026-01-20", "WO-00288", "L05", "M101", "-2", "-5,800", 1], ["2026-01-21", "WO-00297", "L03", "M111", "-6", "-147,000", 1]];
      return `${R.map((r, k) => `<g ${an("rise", 0.05 + k * 0.15)}>${r.slice(0, 6).map((v, i) => `<rect x="${X(i) - 35}" y="${52 + k * 36 - 15}" width="70" height="30" rx="4" class="${r[6] && i >= 4 ? "f-rose-soft" : "f-s1"}"/>${txt(X(i), 52 + k * 36 + 4, v, r[6] && i >= 4 ? "t-rose" : "t-ink", 10, 'font-weight="700" direction="ltr"')}`).join("")}</g>`).join("")}
      <g ${an("fade", 0.6)}>${txt(240, 150, tr("٨ وحدات رجعت من الجودة", "8 units sent back by quality"), "t-rose", 12.5, b8)}</g>
      ${[tr("يتحذفوا ← الإنتاج يزيد", "deleted → output too high"), tr("يوقف عندهم كل مرة", "stops at them every time")].map((s, i) => `<g ${an("pop", 0.9 + i * 0.15)}>${box(a, 196 + i * 44, 196, 36, "f-s2 s-line2", 1.5)}${txt(a + dirx() * 10, 200 + i * 44, s, "t-ink3", 11, b8)}</g>${check(a - dirx() * 84, 196 + i * 44, 1.0 + i * 0.15, false)}`).join("")}
      <g ${an("pop", 1.3)}>${box(b, 218, 196, 60, "f-mint-soft s-mint", 1.5)}${txt(b, 213, tr("تتخصم… وما تتحذفش", "deduct… never delete"), "t-mint", 12.5, b8)}${txt(b, 233, tr("سطر واحد في الوصف", "one line in the description"), "t-ink3", 10.5, bold)}</g>
      ${cap(tr("قيمة غريبة من غير شرح = قرار في إيد النموذج", "an odd value unexplained = a decision left to the model"), 1.6, 300)}`;
    },
    xk_rows: () => {
      const T = tr(["أول صف", "سالب", "خط تاني", "موديل كبير", "آخر صف"], ["first row", "negative", "another line", "large model", "last row"]);
      const R = [["2026-01-15", "L01", "M103", "42", "193,200"], ["2026-01-21", "L03", "M111", "-6", "-147,000"], ["2026-01-15", "L02", "M109", "20", "312,000"], ["2026-01-15", "L06", "M112", "8", "249,600"], ["2026-01-21", "L06", "M101", "46", "133,400"]];
      const hot = [-1, 3, 1, 2, -1], t = mx(206), tg = mx(424), X = (i) => t + (i - 2) * 68;
      const row = (y, vals, cls, tcls, d) => `<g ${an("rise", d)}>${vals.map((v, i) => `<rect x="${X(i) - 32}" y="${y - 14}" width="64" height="28" rx="4" class="${[].concat(cls)[i] || cls}"/>${txt(X(i), y + 4, v, [].concat(tcls)[i] || tcls, 9.5, 'font-weight="700" direction="ltr"')}`).join("")}</g>`;
      return `${row(52, ["Date", "LineCode", "ModelCode", "Qty", "Value"], "f-acc-soft", "t-acc", 0.05)}
      ${R.map((r, i) => row(88 + i * 36, r, r.map((_, k) => (k === hot[i] ? "f-rose-soft" : "f-s1")), r.map((_, k) => (k === hot[i] ? "t-rose" : "t-ink")), 0.25 + i * 0.15)).join("")}
      ${T.map((s, i) => pill(tg, 88 + i * 36, 92, 28, s, hot[i] >= 0 ? "f-rose-soft s-rose" : "f-s2 s-line2", hot[i] >= 0 ? "t-rose" : "t-ink3", 11, 0.5 + i * 0.15)).join("")}
      ${cap(tr("خمس صفوف من حالات مختلفة", "five rows from different cases"), 1.6, 290)}`;
    },
    xk_ask: () => {
      const a = mx(150), b = mx(296), d = dirx();
      const Q = tr(["التاريخ تاريخ ولا نص؟", "الكمية السالبة معناها إيه؟", "القيمة بتتحسب إزاي؟"], ["Is the date a date or text?", "What does a negative Qty mean?", "How is Value worked out?"]);
      return `<g ${an("rise", 0.05)}>${bubble(a, 58, 244, 44, "f-s1 s-ink3", !ar())}${txt(a, 63, tr("«اسألني قبل ما تكتب»", "“ask me before you write”"), "t-ink", 12.5, b8)}</g>
      <g ${an("rise", 0.5)}>${bubble(b, 168, 300, 128, "f-acc-soft s-acc", ar())}</g>
      ${Q.map((q, i) => { const y = 132 + i * 34, nx = b - d * 124; return `<g ${an("fade", 0.8 + i * 0.2)}><circle cx="${nx}" cy="${y}" r="11" class="f-acc"/>${txt(nx, y + 4, digits(i + 1), "t-white", 11, b8)}${txt(b + d * 14, y + 4, q, "t-ink", 11.5, b8)}</g>`; }).join("")}
      ${cap(tr("كل سؤال بيتسأل… تخمين أقل", "every question asked… one guess fewer"), 1.6)}`;
    },
    xk_dict: () => {
      const p = mx(182), nx = mx(98), tx = mx(252), z = mx(414);
      const R = [["Date", tr("تاريخ حقيقي", "a real date")], ["WorkOrder", tr("نص WO-00000", "text WO-00000")], ["LineCode", "L01 … L06"], ["ModelCode", "M101 … M112"], ["Qty", tr("سالب = رجع من الجودة", "negative = back from quality")], ["Value", tr("Qty × التكلفة", "Qty × cost")]];
      return `<g ${an("rise", 0.05)}>${box(p, 150, 312, 236, "f-s1 s-line2")}${txt(p, 52, "Data_Dictionary.txt", "t-ink", 12, 'font-weight="800" direction="ltr"')}</g>
      ${R.map(([n, s], i) => { const y = 84 + i * 32; return `<g ${an("fade", 0.3 + i * 0.12)}><rect x="${nx - 52}" y="${y - 12}" width="104" height="24" rx="5" class="f-acc-soft"/>${txt(nx, y + 4, n, "t-acc", 10.5, 'font-weight="800" direction="ltr"')}${txt(tx, y + 4, s, "t-ink", 10.5, b8)}</g>`; }).join("")}
      <g ${an("pop", 1.1)}>${xl(z, 112, 1.3)}</g>
      ${pill(z, 176, 104, 34, tr("مع كل Prompt", "with every Prompt"), "f-mint-soft s-mint", "t-mint", 10.5, 1.3)}
      ${cap(tr("دليل البيانات = Context الأداة", "the data dictionary = the tool's Context"), 1.6)}`;
    },
    xk_test: () => {
      const q = mx(132), a = mx(306), c = mx(420);
      const R = tr([["كم عمود؟", "٦"], ["السالب معناه إيه؟", "رجع من الجودة"], ["التاريخ نوعه إيه؟", "تاريخ حقيقي"]], [["How many columns?", "6"], ["A negative Qty?", "back from quality"], ["The date's type?", "a real date"]]);
      return `<g ${an("rise", 0.05)}>${box(240, 140, 420, 212, "f-s1 s-line2")}${txt(240, 56, tr("محادثة جديدة", "a new chat"), "t-ink2", 12, b8)}</g>
      ${pill(240, 84, 190, 28, "Data_Dictionary.txt", "f-acc-soft s-acc", "t-acc", 10.5, 0.3)}
      ${R.map(([x, y], i) => { const yy = 128 + i * 40; return `<g ${an("fade", 0.6 + i * 0.25)}>${txt(q, yy + 4, x, "t-ink", 11.5, b8)}${txt(a, yy + 4, y, "t-mint", 11.5, b8)}</g>${check(c, yy, 0.8 + i * 0.25)}`; }).join("")}
      ${pill(240, 270, 230, 34, tr("فهمه من غير الملف… جاهز", "understood without the file… ready"), "f-mint", "t-white", 11.5, 1.6)}`;
    },
    xk_rules: () => {
      const a = mx(118), b = mx(338);
      const fx = ar() ? ["شيل صف Week_02", "صلّح عمود Week_11", "ضيف M113 للقايمة"] : ["drop Week_02's row", "fix Week_11's column", "add M113 to the list"];
      const ru = ar() ? ["صف من غير WorkOrder ← يتساب ويتسجّل", "عمود ناقص ← وقّف وسمّي الملف", "كود مش في القايمة ← شيت لوحده"] : ["no WorkOrder → skip and log", "missing column → stop, name it", "unknown code → its own sheet"];
      return `<g ${an("fade", 0.05)}>${txt(a, 46, tr("علاج لكل مشكلة", "a fix per problem"), "t-rose", 12.5, b8)}${txt(b, 46, tr("قاعدة لكل نوع", "a rule per kind"), "t-mint", 12.5, b8)}</g>
      ${fx.map((s, i) => `<g ${an("rise", 0.2 + i * 0.15)}>${box(a, 86 + i * 52, 180, 38, "f-rose-soft s-rose", 1.5)}${txt(a, 90 + i * 52, s, "t-rose", 11, b8)}<line x1="${a - 80}" y1="${86 + i * 52}" x2="${a + 80}" y2="${86 + i * 52}" class="s-rose" stroke-width="2"/></g>`).join("")}
      ${ru.map((s, i) => `<g ${an("rise", 0.8 + i * 0.15)}>${box(b, 86 + i * 52, 236, 38, "f-mint-soft s-mint", 1.5)}${txt(b, 90 + i * 52, s, "t-mint", 10.5, b8)}</g>`).join("")}
      ${pill(b, 246, 236, 34, tr("بتمسك المعروف… واللي بعده", "catches the known… and the next"), "f-mint", "t-white", 11.5, 1.4)}
      ${cap(tr("العلاج بيصلّح ملف… والقاعدة بتحمي كل الملفات", "a fix repairs a file… a rule protects them all"), 1.7)}`;
    },
    xk_cliff: () => {
      const a = mx(120), b = mx(360), d = dirx();
      return `<g ${an("rise", 0.05)}>${bubble(a, 84, 190, 84, "f-s1 s-mint", !ar())}${txt(a, 66, "ChatGPT", "t-mint", 12.5, 'font-weight="800" direction="ltr"')}${box(a, 96, 150, 28, "f-mint-soft s-mint", 1.5)}${dl(a - d * 56, 96)}${txt(a + d * 12, 100, "file_list.ps1", "t-ink", 10, 'font-weight="700" direction="ltr"')}</g>
      <g ${an("rise", 0.4)}>${bubble(b, 84, 190, 84, "f-s1 s-acc", ar())}${txt(b, 62, "Gemini Enterprise", "t-acc", 12, 'font-weight="800" direction="ltr"')}<rect x="${b - 76}" y="74" width="152" height="40" rx="6" class="f-ink2"/>${[0, 1, 2].map((k) => `<rect x="${b - 66}" y="${82 + k * 10}" width="${[110, 84, 120][k]}" height="4" rx="2" class="f-crt"/>`).join("")}</g>
      <path ${an("draw", 0.8, "s-ink3")} pathLength="1" d="M${a} 144 C ${a} 190, 240 170, 240 196" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <path ${an("draw", 0.9, "s-ink3")} pathLength="1" d="M${b} 144 C ${b} 190, 240 170, 240 196" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.2)}>${laptop(240, 232, 1)}${txt(240, 238, "?", "t-acc", 20, b8)}</g>
      ${cap(tr("الدرس الجاي: من الشات لجهازك", "next lesson: from the chat to your laptop"), 1.5)}`;
    },

    /* ----- from the chat to the laptop (data/deliver-story.js) ----- */
    xd_reply: () => {
      const w = mx(196), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(w, 150, 300, 236, "f-s1 s-line2")}<rect x="${w - 150}" y="32" width="300" height="30" rx="12" class="f-s2"/>${txt(w, 52, "Gemini Enterprise", "t-ink2", 12, 'font-weight="800" direction="ltr"')}</g>
      ${["file_list.ps1", "run_file_list.bat", tr("خطوات التشغيل", "run steps")].map((s, i) => `<g ${an("rise", 0.3 + i * 0.2)}><rect x="${w - 130}" y="${74 + i * 66}" width="260" height="54" rx="8" class="f-ink2"/>${txt(w, 92 + i * 66, s, "t-bg", 10.5, i < 2 ? 'font-weight="700" direction="ltr"' : bold)}${[0, 1].map((k) => `<rect x="${w - 116}" y="${102 + i * 66 + k * 9}" width="${[200, 150][k] - i * 30}" height="4" rx="2" class="f-crt"/>`).join("")}</g>`).join("")}
      <g ${an("pop", 1.1)}><circle cx="${mx(420)}" cy="140" r="34" class="f-s1 s-rose" stroke-width="3"/>${dl(mx(420), 138, "s-rose")}<path d="M${mx(420) - 24} 116 l48 48" class="s-rose" stroke-width="3.5" stroke-linecap="round"/></g>
      <g ${an("fade", 1.3)}>${txt(mx(420), 196, tr("مفيش رابط", "no link"), "t-rose", 12, b8)}</g>
      ${cap(tr("الكود سليم… والخطوة الأخيرة عليك", "the code is sound… the last step is yours"), 1.6, 304)}`;
    },
    xd_two: () => {
      const a = mx(110), b = mx(270), e = mx(410), d = dirx();
      return `<g ${an("pop", 0.1)}>${fileIcon(a, 128, "s-amber")}${txt(a, 170, "run_file_list.bat", "t-ink", 11, 'font-weight="800" direction="ltr"')}${txt(a, 188, tr("سطرين بس", "two lines"), "t-ink3", 11, bold)}</g>
      <path ${an("draw", 0.4, "s-ink3")} pathLength="1" d="M${a + d * 34} 122 H ${b - d * 48}" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 0.6)}><path d="M${b - 34} 78 h50 l18 18 v74 h-68z" class="f-s1 s-acc" stroke-width="2.4"/>${[0, 1, 2, 3, 4].map((k) => `<rect x="${b - 24}" y="${100 + k * 12}" width="${[46, 38, 50, 30, 42][k]}" height="5" rx="2" class="f-acc-soft"/>`).join("")}
        ${txt(b, 194, "file_list.ps1", "t-ink", 11, 'font-weight="800" direction="ltr"')}${txt(b, 212, tr("كل الشغل", "all the work"), "t-ink3", 11, bold)}</g>
      <path ${an("draw", 1.0, "s-acc")} pathLength="1" d="M${b + d * 44} 122 H ${e - d * 30}" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.2)}>${xl(e, 122, 1.2)}${txt(e, 166, tr("إكسل في الخلفية", "hidden Excel"), "t-mint", 11, b8)}</g>
      ${pill(240, 252, 330, 36, tr("ملفين نص في نفس الفولدر · ولا تنزيل برامج", "two text files, one folder · nothing to install"), "f-mint-soft s-mint", "t-mint", 11.5, 1.4)}`;
    },
    xd_shape: () => {
      const c = mx(196), s = mx(410), d = dirx();
      return `<g ${an("rise", 0.05)}><rect x="${c - 120}" y="36" width="130" height="24" rx="6" class="f-acc"/>${mono(c - 110, 53, "file_list.ps1", "t-white", 11, b8)}<rect x="${c - 120}" y="58" width="240" height="186" rx="8" class="f-ink2"/></g>
      ${["# list every file and sheet", "$ErrorActionPreference = 'Stop'", "$xl = New-Object -Com Excel...", "...", "finally { $xl.Quit() }"].map((t, i) => mono(c - 108, 84 + i * 24, t, "t-crt an type", 10, `style="--d:${0.3 + i * 0.15}s"`)).join("")}
      <g ${an("pop", 1.1)}><rect x="${c - 112}" y="206" width="224" height="26" rx="5" class="f-mint"/>${mono(c - 104, 223, "# END OF FILE file_list.ps1", "t-white", 10.5, b8)}</g>
      <g ${an("rise", 1.3)}>${box(s, 140, 112, 108, "f-s1 s-line2")}${txt(s, 106, tr("القايمة", "the list"), "t-ink", 12, b8)}${txt(s, 132, tr("ps1: ١٨٤ سطر", "ps1: 184 lines"), "t-ink2", 10.5, bold)}${txt(s, 154, tr("bat: سطرين", "bat: 2 lines"), "t-ink2", 10.5, bold)}${check(s, 178, 1.6)}</g>
      ${cap(tr("صندوق لكل ملف · اسمه فوقه · وعلامة النهاية", "a box per file · its name above · an end marker"), 1.7)}`;
    },
    xd_chatgpt: () => {
      const a = mx(130), f = mx(372), d = dirx();
      return `<g ${an("rise", 0.05)}>${bubble(a, 108, 210, 128, "f-s1 s-mint", !ar())}${txt(a, 66, "ChatGPT", "t-mint", 12.5, 'font-weight="800" direction="ltr"')}</g>
      ${["file_list.ps1", "run_file_list.bat"].map((s, i) => `<g ${an("pop", 0.3 + i * 0.2)}>${box(a, 98 + i * 38, 176, 30, "f-mint-soft s-mint", 1.5)}${dl(a - d * 70, 98 + i * 38)}${txt(a + d * 12, 102 + i * 38, s, "t-ink", 10.5, 'font-weight="700" direction="ltr"')}</g>`).join("")}
      <path ${an("draw", 0.8, "s-mint")} pathLength="1" d="M${a + d * 110} 116 H ${f - d * 62}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.0)}>${folder(f, 116, 110, 76, "f-mint-soft s-mint")}${txt(f, 124, tr("فولدر الأداة", "tool folder"), "t-mint", 11.5, b8)}</g>
      <g ${an("pop", 1.3)}><circle cx="${a}" cy="234" r="22" class="f-s1 s-amber" stroke-width="3"/><path d="M${a} 234 v-12 M${a} 234 l9 6" class="s-amber" stroke-width="3" stroke-linecap="round"/>${txt(a + d * 96, 238, tr("الرابط بينتهي بعد وقت", "the link expires"), "t-amber", 12, b8)}</g>
      ${pill(f, 234, 150, 34, tr("راجع الاسم بعد التنزيل", "check the name"), "f-acc-soft s-acc", "t-acc", 11, 1.5)}
      ${cap(tr("نزّل على طول… واحفظ الـ Prompt جنبها", "download at once… and keep the Prompt beside them"), 1.7)}`;
    },
    xd_copy: () => {
      const a = mx(132), b = mx(352), d = dirx();
      const box3 = (x, cls) => `<rect x="${x - 92}" y="70" width="184" height="134" rx="8" class="f-ink2"/>${[0, 1, 2, 3, 4].map((k) => `<rect x="${x - 78}" y="${86 + k * 22}" width="${[140, 110, 150, 90, 124][k]}" height="6" rx="3" class="${cls(k)}"/>`).join("")}`;
      return `<g ${an("rise", 0.05)}>${box3(a, (k) => (k === 0 ? "f-rose" : "f-crt"))}<rect x="${a - 86}" y="98" width="172" height="100" rx="4" class="f-acc-soft" opacity="0.35"/>${txt(a, 52, tr("تظليل بالماوس", "mouse selection"), "t-rose", 12, b8)}</g>
      ${check(a, 226, 0.5, false)}<g ${an("fade", 0.6)}>${txt(a, 256, tr("أول سطر ضاع", "the first line got lost"), "t-rose", 11.5, b8)}</g>
      <g ${an("rise", 0.7)}>${box3(b, () => "f-crt")}<rect x="${b + 54}" y="76" width="32" height="26" rx="6" class="f-white"/><g transform="translate(${b + 70} 90)">${copyIco(0, 0)}</g>${txt(b, 52, tr("زرار النسخ", "the copy button"), "t-mint", 12, b8)}</g>
      ${check(b, 226, 1.1)}<g ${an("fade", 1.2)}>${txt(b, 256, tr("الصندوق كله بالظبط", "the whole box, exactly"), "t-mint", 11.5, b8)}</g>
      ${cap(tr("صندوق واحد… ملف واحد… زرار واحد", "one box… one file… one button"), 1.5, 296)}`;
    },
    xd_notepad: () => {
      const w = 240, d = dirx();
      const F = ar() ? [["الفولدر", "Lesson_2"], ["اسم الملف", "file_list.ps1"], ["النوع", "All files (*.*)"], ["الترميز", "UTF-8 with BOM"]] : [["Folder", "Lesson_2"], ["File name", "file_list.ps1"], ["Save as type", "All files (*.*)"], ["Encoding", "UTF-8 with BOM"]];
      return `<g ${an("rise", 0.05)}>${box(w, 150, 380, 236, "f-s1 s-line2")}<rect x="${w - 190}" y="32" width="380" height="30" rx="12" class="f-s2"/>${txt(w, 52, tr("حفظ باسم", "Save As"), "t-ink", 12.5, b8)}</g>
      ${F.map(([k, v], i) => { const y = 92 + i * 46;
        return `<g ${an("fade", 0.3 + i * 0.25)}>${txt(mx(118), y + 5, k, "t-ink2", 11.5, b8)}${box(mx(286), y, 200, 32, i >= 2 ? "f-acc-soft s-acc" : "f-s2 s-line2", 1.5)}${txt(mx(286), y + 4, v, "t-ink", 11, 'font-weight="700" direction="ltr"')}</g>${check(mx(408), y, 0.5 + i * 0.25)}`; }).join("")}
      ${cap(tr("الفولدر، والنوع، والاسم، والترميز", "the folder, type, name and encoding"), 1.6)}`;
    },
    xd_bom: () => {
      const a = mx(106), r = mx(350), d = dirx();
      const row = (y, enc, out, ok, dd) => `<g ${an("rise", dd)}>${box(a, y, 170, 44, ok ? "f-mint-soft s-mint" : "f-s2 s-line2")}${txt(a, y + 4, enc, ok ? "t-mint" : "t-ink2", 12, 'font-weight="800" direction="ltr"')}</g>
        <path ${an("draw", dd + 0.3, ok ? "s-mint" : "s-rose")} pathLength="1" d="M${a + d * 90} ${y} H ${r - d * 96}" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
        <g ${an("pop", dd + 0.5)}>${box(r, y, 180, 44, ok ? "f-mint" : "f-rose-soft s-rose")}${ok ? txt(r, y + 6, "اتقرا", "t-white", 15, b8) : mono(r - 56, y + 5, "Ø§Ù©Ù§Ø©", "t-rose", 13, b8)}</g>${check(r + d * 102, y, dd + 0.7, ok)}`;
      return `<g ${an("fade", 0.05)}>${txt(a, 52, tr("الحفظ", "saved as"), "t-ink3", 12, b8)}${txt(r, 52, tr("PowerShell 5.1 بيقرا", "PowerShell 5.1 reads"), "t-ink3", 12, b8)}</g>
      ${row(104, "UTF-8", "", false, 0.2)}${row(186, "UTF-8 with BOM", "", true, 0.9)}
      ${cap(tr("رسايل أو مسار بالعربي ← UTF-8 with BOM", "Arabic messages or paths → UTF-8 with BOM"), 1.7, 270)}`;
    },
    xd_ext: () => {
      const r = mx(184), t = mx(404), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(r, 140, 300, 200, "f-s1 s-line2")}<rect x="${r - 150}" y="40" width="300" height="28" rx="12" class="f-s2"/>${txt(r, 59, tr("مستكشف الملفات", "File Explorer"), "t-ink2", 11.5, b8)}</g>
      <g ${an("fade", 0.3)}>${fileIcon(r - d * 110, 104, "s-acc")}${txt(r + d * 10, 108, "file_list.ps1", "t-ink", 12, 'font-weight="700" direction="ltr"')}${txt(r + d * 10, 126, tr("قبل: الاسم شكله سليم", "before: the name looks fine"), "t-ink3", 10.5, bold)}</g>
      <g ${an("fade", 1.0)}>${fileIcon(r - d * 110, 180, "s-rose")}<text x="${r + d * 10}" y="184" class="t-ink" font-size="12" font-family="var(--font-mono)" direction="ltr" text-anchor="middle" font-weight="800">file_list.ps1<tspan class="t-rose">.txt</tspan></text>${txt(r + d * 10, 204, tr("بعد: الاسم الحقيقي", "after: the real name"), "t-rose", 10.5, b8)}</g>
      <g ${an("pop", 0.6)}><rect x="${t - 26}" y="128" width="52" height="28" rx="14" class="f-mint"/><circle cx="${t + 12}" cy="142" r="10" class="f-white"/>${txt(t, 184, tr("امتدادات", "file name"), "t-mint", 11.5, b8)}${txt(t, 202, tr("أسماء الملفات", "extensions"), "t-mint", 11.5, b8)}</g>
      ${cap(tr("فعّلها مرة… وشوف الاسم الحقيقي على طول", "turn it on once… and always see the real name"), 1.5, 290)}`;
    },
    xd_cut: () => {
      const c = mx(140), p = mx(370), d = dirx();
      return `<g ${an("rise", 0.05)}><rect x="${c - 100}" y="44" width="200" height="164" rx="8" class="f-ink2"/>${["...", "line 208", "line 209", "line 210"].map((t, i) => mono(c - 88, 72 + i * 24, t, "t-crt", 10.5)).join("")}
        <path d="M${c - 100} 208 l20 -12 l20 12 l20 -12 l20 12 l20 -12 l20 12 l20 -12 l20 12 l20 -12 l20 12" class="f-s1 s-rose" stroke-width="2.4"/></g>
      <g ${an("pop", 0.6)}>${txt(c, 240, tr("مفيش علامة النهاية", "no # END OF FILE"), "t-rose", 12, b8)}${check(c, 264, 0.7, false)}</g>
      ${[tr("جزء ١ من ٢", "part 1 of 2"), tr("جزء ٢ من ٢", "part 2 of 2")].map((s, i) => pill(p, 74 + i * 52, 170, 38, s, "f-acc-soft s-acc", "t-acc", 12, 1.0 + i * 0.25)).join("")}
      <g ${an("pop", 1.6)}><rect x="${p - 90}" y="166" width="180" height="30" rx="6" class="f-mint"/>${mono(p - 80, 186, "# END OF FILE", "t-white", 11, b8)}</g>${check(p, 224, 1.8)}
      <path ${an("draw", 0.9, "s-ink3")} pathLength="1" d="M${c + d * 104} 120 H ${p - d * 92}" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>
      ${cap(tr("من غير علامة النهاية… الملف لسه ما خلصش", "no end marker… the file isn't finished"), 1.9)}`;
    },
    xd_bat: () => {
      const c = 240;
      return `<g ${an("rise", 0.05)}><rect x="${c - 210}" y="40" width="420" height="96" rx="10" class="f-ink2"/>${mono(c - 196, 34, "run_file_list.bat", "t-ink2", 11, b8)}
        ${mono(c - 196, 78, 'powershell -NoProfile -ExecutionPolicy Bypass', "t-crt", 10.5)}${mono(c - 196, 96, '  -File "%~dp0file_list.ps1"', "t-crt", 10.5)}${mono(c - 196, 120, "pause", "t-crt", 10.5)}</g>
      <g ${an("pop", 0.7)}><path d="M${mx(150)} 168 l0 34 l9 -8 l7 15 l6 -3 l-7 -15 l12 0z" class="f-s1 s-ink2" stroke-width="2"/>${txt(mx(150), 236, tr("دبل كليك", "double-click"), "t-mint", 12, b8)}</g>
      <g ${an("pop", 1.1)}><rect x="${mx(330) - 16}" y="182" width="32" height="26" rx="4" class="f-rose"/><path d="M${mx(330) - 10} 182 v-9 a10 10 0 0 1 20 0 v9" class="s-rose" stroke-width="3.5" fill="none"/>${txt(mx(330), 236, tr("مقفول من IT؟", "locked by IT?"), "t-rose", 12, b8)}</g>
      ${pill(mx(330), 266, 200, 30, tr("ما تتحايلش · اسأل أو البديل", "don't bypass · ask, or switch"), "f-rose-soft s-rose", "t-rose", 11, 1.3)}
      ${cap(tr("دبل كليك لو مسموح… وبديل لو مقفول", "a double click if allowed… an alternative if locked"), 1.6, 304)}`;
    },
    xd_alt: () => {
      const X = rowX(3, 130, 14), d = dirx();
      const F = [["PowerShell", tr("سكريبت ‎.ps1", "a .ps1 script"), "f-acc-soft s-acc", "t-acc"], ["VBA", tr("ماكرو في محرر الكود", "a macro in the editor"), "f-amber-soft s-amber", "t-amber"], ["Power Query", tr("المحرر المتقدم", "Advanced Editor"), "f-mint-soft s-mint", "t-mint"]];
      return `${F.map(([h, s, cls, tc], i) => `<g ${an("pop", 0.1 + i * 0.25)}>${box(X(i), 90, 130, 84, cls)}${txt(X(i), 84, h, tc, 13, 'font-weight="800" direction="ltr"')}${txt(X(i), 106, s, "t-ink2", 10.5, bold)}</g>
        <path ${an("draw", 0.8 + i * 0.15, "s-ink3")} pathLength="1" d="M${X(i)} 134 L 240 ${196}" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      <g ${an("rise", 1.3)}>${box(240, 228, 340, 54, "f-s1 s-ink2", 2.5)}${txt(240, 222, tr("نفس القواعد في الأشكال التلاتة", "the same rules in all three forms"), "t-ink", 12.5, b8)}${txt(240, 242, tr("نسخة · سجل · توقف واضح · قفل إكسل", "a copy · a log · a clear stop · close Excel"), "t-ink3", 11, bold)}</g>
      ${cap(tr("القفل بيغيّر الشكل… مش القواعد", "the lock changes the form… not the rules"), 1.7, 300)}`;
    },
    xd_cliff: () => {
      const t = mx(150), f = mx(390), d = dirx();
      return `${term(t, 112, 220, 120, ["> run_stack_test.bat", "6 files read, 1 skipped", "Press any key . . ."], 0.05, 11, (i) => (i === 1 ? "t-crt2" : "t-crt"))}
      ${check(t, 196, 1.0)}<g ${an("fade", 1.0)}>${txt(t, 226, tr("السكة شغالة", "the road works"), "t-mint", 12, b8)}</g>
      <path ${an("draw", 1.2, "s-acc")} pathLength="1" d="M${t + d * 116} 112 H ${f - d * 70}" stroke-width="2.6" stroke-dasharray="1" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 1.4)}>${[0, 1, 2, 3].map((k) => fileIcon(rowX(4, 30, 4, f)(k), 96, "s-acc", 1.4 + k * 0.05)).join("")}${txt(f, 140, tr("١٣ ملف أسبوعي", "13 weekly files"), "t-ink", 12, b8)}${txt(f, 184, "?", "t-acc", 26, b8)}</g>
      ${cap(tr("الدرس الجاي: الأداة الأولى، تحت بعض", "next lesson: tool one, stacking"), 1.8, 292)}`;
    },

    /* ----- tool one: stacking (data/stack-story.js) ----- */
    xs_scene: () => {
      const X = rowX(7, 30, 6, mx(132)), t = mx(374), d = dirx();
      let f = ""; for (let i = 0; i < 13; i++) f += fileIcon(X(i % 7), 84 + Math.floor(i / 7) * 52, "s-acc", 0.05 + i * 0.05);
      return `${f}<g ${an("fade", 0.8)}>${txt(mx(132), 168, "Week_01 … Week_13", "t-ink2", 11.5, 'font-weight="800" direction="ltr"')}</g>
      <path ${an("draw", 0.9, "s-acc")} pathLength="1" d="M${mx(250)} 110 H ${t - d * 70}" stroke-width="3" fill="none" marker-end="url(#aih-arrow)"/>
      ${grid(t, 110, 4, 9, 30, 15, "f-s1", -1, 1.1)}<g ${an("fade", 1.2)}>${txt(t, 194, tr("جدول واحد", "one table"), "t-ink", 12, b8)}</g>
      <g ${an("pop", 1.4)}><circle cx="${mx(132)}" cy="232" r="26" class="f-s1 s-rose" stroke-width="3.5"/><path d="M${mx(132)} 232 v-15 M${mx(132)} 232 l10 7" class="s-rose" stroke-width="3.5" stroke-linecap="round"/>${txt(mx(132) + d * 82, 236, tr("٢٫٥ ساعة بالإيد", "2.5 h by hand"), "t-rose", 12.5, b8)}</g>
      ${cap(tr("من غير ولا صف ضايع… ولا صف زيادة", "without losing a row… or gaining one"), 1.7)}`;
    },
    xs_prompt: () => {
      const c = 240;
      const chips = [[tr("فولدر Data", "the Data folder"), 70], ["Week_01 … Week_13", 116], ["Production", 162], [tr("٦ عناوين بالحرف", "6 headers, exactly"), 208]];
      return `<g ${an("rise", 0.05)}>${box(c, 150, 400, 236, "f-s1 s-acc", 2.5)}${txt(c, 52, tr("Prompt الأداة الأولى", "Tool one — the Prompt"), "t-acc", 12.5, b8)}</g>
      ${chips.map(([s, y], i) => `<g ${an("fade", 0.3 + i * 0.25)}>${[0, 1].map((k) => `<rect x="${ar() ? 240 + 180 - 120 - k * 196 : 60 + k * 196}" y="${y + 6}" width="${k ? 120 : 120}" height="6" rx="3" class="f-s3"/>`).join("")}</g>${pill(c, y + 9, 168, 30, s, "f-mint-soft s-mint", "t-mint", 11, 0.4 + i * 0.25)}`).join("")}
      ${cap(tr("الوصفة جاهزة… والأسماء بتاعتك", "the recipe is ready… the names are yours"), 1.6)}`;
    },
    xs_questions: () => {
      const m = mx(150), p = mx(340), d = dirx();
      const Q = ar() ? [["Qty باسم تاني؟", "أوقف وقولّي"], ["صف من غير WorkOrder؟", "يتساب ويتسجّل"], ["المتكرر بالظبط؟", "شيت To_Review"]] : [["Qty under another name?", "stop and tell me"], ["row with no WorkOrder?", "skip and log it"], ["exact duplicates?", "a To_Review sheet"]];
      return `${Q.map(([q, a], i) => `<g ${an("rise", 0.1 + i * 0.4)}>${bubble(m, 64 + i * 80, 210, 40, "f-acc-soft s-acc", !ar())}${txt(m, 68 + i * 80, q, "t-acc", 11.5, b8)}</g>
        <g ${an("rise", 0.3 + i * 0.4)}>${bubble(p, 96 + i * 80, 170, 36, "f-mint-soft s-mint", ar())}${txt(p, 100 + i * 80, a, "t-mint", 11.5, b8)}</g>`).join("")}
      <g ${an("fade", 0.05)}>${txt(m, 26, tr("النموذج", "the model"), "t-ink3", 11.5, b8)}${txt(p, 26, tr("مهندس التخطيط", "the planner"), "t-ink3", 11.5, b8)}</g>
      ${cap(tr("تلات أسئلة قبل ولا سطر كود", "three questions before a line of code"), 1.5, 306)}`;
    },
    xs_byname: () => {
      const H = ["Date", "WorkOrder", "LineCode", "Qty", "Notes", "ModelCode", "Value"], X = (i) => 240 + (i - 3) * 64;
      return `<g ${an("fade", 0.05)}>${txt(240, 40, "Week_07.xlsx · Production", "t-ink2", 12, 'font-weight="800" direction="ltr"')}</g>
      ${rowL(240, 72, H, 60, 32, H.map((_, i) => (i === 4 ? "f-amber-soft" : i === 3 || i === 5 ? "f-mint-soft" : "f-acc-soft")), H.map((_, i) => (i === 4 ? "t-amber" : i === 3 || i === 5 ? "t-mint" : "t-acc")), 9.5, 0.2)}
      <path ${an("draw", 0.7, "s-rose")} pathLength="1" d="M${X(3)} 92 C ${X(3)} 140, 140 140, 140 172" stroke-width="2.4" stroke-dasharray="5 4" fill="none" marker-end="url(#aih-arrow)"/>
      <path ${an("draw", 1.1, "s-mint")} pathLength="1" d="M${X(5)} 92 C ${X(5)} 150, 350 150, 350 212" stroke-width="2.6" fill="none" marker-end="url(#aih-arrow)"/>
      ${pill(140, 194, 220, 36, tr("بالترتيب: Qty اتقري كموديل", "by position: Qty read as the model"), "f-rose-soft s-rose", "t-rose", 10.5, 0.9)}
      ${pill(350, 236, 220, 36, tr("بالاسم: ModelCode أينما كان", "by name: ModelCode wherever it is"), "f-mint-soft s-mint", "t-mint", 10.5, 1.3)}
      ${cap(tr("الترتيب بيتغيّر… والاسم بيفضل", "order changes… names stay"), 1.6, 296)}`;
    },
    xs_total: () => {
      const t = mx(170), l = mx(380), d = dirx();
      const rows = [["WO-00202", "L05", "32"], ["WO-00203", "L06", "40"], ["WO-00204", "L06", "8"], ["", "Total", "2,259"]];
      return `<g ${an("fade", 0.05)}>${txt(t, 40, "Week_02.xlsx", "t-ink2", 12, 'font-weight="800" direction="ltr"')}</g>
      ${rowL(t, 70, ["WorkOrder", "LineCode", "Qty"], 86, 28, "f-acc-soft", "t-acc", 10, 0.1)}
      ${rows.map((r, i) => rowL(t, 104 + i * 34, r, 86, 28, i === 3 ? "f-rose-soft" : "f-s1", i === 3 ? "t-rose" : "t-ink", 10, 0.3 + i * 0.15)).join("")}
      <g ${an("pop", 1.0)}><line x1="${t - 140}" y1="206" x2="${t + 140}" y2="206" class="s-rose" stroke-width="3"/></g>
      <g ${an("rise", 1.2)}>${box(l, 120, 164, 104, "f-s2 s-line2")}${txt(l, 94, tr("السجل", "log"), "t-ink", 12, b8)}${txt(l, 118, tr("صف ١٠٢: من غير WorkOrder", "row 102: no WorkOrder"), "t-rose", 10.5, b8)}${txt(l, 138, tr("← اتساب", "→ skipped"), "t-rose", 10.5, b8)}${txt(l, 158, tr("١٠٠ صف دخلوا", "100 rows stacked"), "t-mint", 10.5, b8)}</g>
      ${cap(tr("مش كل سطر في الشيت… سطر بيانات", "not every line in a sheet… is a data line"), 1.5, 270)}`;
    },
    xs_source: () => {
      const a = mx(110), t = mx(318);
      const R = [["L04", "12", "Week_06.xlsx", 0], ["L04", "9", "Week_07.xlsx", 1], ["L02", "30", "Week_07.xlsx", 1], ["L01", "41", "Week_08.xlsx", 0]];
      return `<g ${an("rise", 0.05)}>${bubble(a, 64, 196, 50, "f-s1 s-ink3", !ar())}${txt(a, 69, tr("«ليه خط ٤ في أسبوع ٧ قليل؟»", "“why is line 4 low in week 7?”"), "t-ink", 11, b8)}</g>
      <g ${an("pop", 0.5)}><path d="M${a - 30} 128 h60 l-22 26 v22 l-16 -8 v-14z" class="f-acc-soft s-acc" stroke-width="2.4" stroke-linejoin="round"/></g>
      ${pill(a, 212, 196, 32, "SourceFile = Week_07.xlsx", "f-mint-soft s-mint", "t-mint", 10, 0.8)}
      ${rowL(t, 64, ["LineCode", "Qty", "SourceFile"], [66, 50, 110][0], 30, "f-acc-soft", "t-acc", 10, 0.2)}
      ${R.map(([l, q, f, on], i) => rowL(t, 100 + i * 34, [l, q, f], 66, 28, on ? "f-mint-soft" : "f-s1", on ? "t-mint" : "t-ink3", 9.5, 0.4 + i * 0.15)).join("")}
      ${cap(tr("كل صف بيشاور على ملفه", "every row points to its file"), 1.6)}`;
    },
    xs_stop: () => {
      const t = mx(178), s = mx(418), d = dirx();
      return `${term(t, 126, 300, 176, ["Week_01.xlsx  read  104 rows", "Week_02.xlsx  read  100 rows", "...", "Week_10.xlsx  read  114 rows", "STOP  Week_11.xlsx:", "  column Qty not found"], 0.05, 10.5, (i) => (i >= 4 ? "t-rose" : "t-crt"))}
      <g ${an("pop", 1.6)}>${stopSign(s, 108, 28)}</g>
      <g ${an("fade", 1.8)}>${txt(s, 164, tr("ولا نتيجة", "no result"), "t-rose", 12, b8)}${txt(s, 182, tr("اتكتبت", "written"), "t-rose", 12, b8)}</g>
      ${pill(240, 252, 330, 34, tr("٩٤ صف ما دخلوش التقرير ناقصين", "94 rows didn't reach the report incomplete"), "f-mint-soft s-mint", "t-mint", 11.5, 2.0)}
      ${cap(tr("الأداة اللي بتوقف… بتشتغل", "a tool that stops… is working"), 2.1, 300)}`;
    },
    xs_alias: () => {
      const a = mx(120), b = mx(352), d = dirx();
      return `<g ${an("rise", 0.05)}>${fileIcon(a, 82, "s-rose")}${txt(a, 122, tr("تعديل Week_11 بالإيد", "edit Week_11 by hand"), "t-rose", 11.5, b8)}${txt(a, 140, tr("يرجع كل شهر", "returns every month"), "t-ink3", 11, bold)}</g>${check(a + d * 30, 70, 0.4, false)}
      <g ${an("rise", 0.6)}>${box(b, 98, 220, 86, "f-mint-soft s-mint")}${txt(b, 82, tr("قاعدة للأداة", "a rule for the tool"), "t-mint", 12.5, b8)}${txt(b, 104, "Quantity = Qty", "t-ink", 12, 'font-weight="800" direction="ltr"')}${txt(b, 124, tr("وسجّلها كل مرة", "logged each time"), "t-ink3", 11, bold)}</g>
      <path ${an("draw", 1.0, "s-mint")} pathLength="1" d="M${b} 144 V 180" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.2)}>${fileIcon(b, 210, "s-mint")}${txt(b, 248, "stack_tool_v2.ps1", "t-mint", 11, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("fade", 1.3)}>${fileIcon(a, 210, "s-ink3")}${txt(a, 248, tr("الملف الأصلي زي ما هو", "the original, untouched"), "t-ink3", 11, b8)}</g>
      ${cap(tr("التصليح بالإيد شغل متكرر… والقاعدة أتمتة", "a hand fix is repeated work… a rule is automation"), 1.6, 296)}`;
    },
    xs_dups: () => {
      const t = mx(154), r = mx(388), d = dirx();
      const row = ["2026-01-22", "WO-00320", "L02", "M108"];
      return `<g ${an("fade", 0.05)}>${txt(t, 40, "Week_04.xlsx", "t-ink2", 12, 'font-weight="800" direction="ltr"')}</g>
      ${rowL(t, 74, row, 68, 28, "f-amber-soft", "t-amber", 9.5, 0.2)}${rowL(t, 106, row, 68, 28, "f-amber-soft", "t-amber", 9.5, 0.35)}
      <g ${an("pop", 0.6)}>${txt(t, 146, "=", "t-amber", 22, b8)}</g>
      <path ${an("draw", 0.8, "s-amber")} pathLength="1" d="M${t + d * 146} 90 H ${r - d * 66}" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 1.0)}>${box(r, 96, 120, 70, "f-amber-soft s-amber")}${txt(r, 92, "To_Review", "t-amber", 12, 'font-weight="800" direction="ltr"')}${txt(r, 112, tr("صفين", "2 rows"), "t-ink2", 11, bold)}</g>
      <g ${an("rise", 1.3)}>${person(r, 226, 1.1, "f-acc")}</g>${check(r + d * 30, 182, 1.6)}
      <g ${an("fade", 1.5)}>${txt(t, 212, tr("مشرف الخط: «اتدخّل مرتين بالغلط»", "line supervisor: “entered twice”"), "t-ink", 11.5, b8)}${txt(t, 234, tr("← مهندس التخطيط وافق على الحذف", "→ the planner approved deleting"), "t-mint", 11.5, b8)}</g>
      ${cap(tr("الأداة بتلاقي… والإنسان بيقرر", "the tool finds… the human decides"), 1.7, 296)}`;
    },
    xs_array: () => {
      const a = mx(124), b = mx(356), d = dirx();
      let many = ""; for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) many += `<path d="M${a - 66 + c * 26 - (d < 0 ? -14 : 0)} ${62 + r * 18} h${14 * d}" class="s-rose" stroke-width="2" marker-end="url(#aih-arrow)"/>`;
      return `<g ${an("fade", 0.1)}>${many}</g><g ${an("fade", 0.4)}>${txt(a, 194, tr("خلية خلية", "cell by cell"), "t-rose", 12.5, b8)}${txt(a, 214, tr("≈ ٩٬٠٠٠ مرة · ٣ دقايق", "≈ 9,000 trips · 3 min"), "t-ink2", 11.5, bold)}</g>
      <g ${an("rise", 0.7)}>${[0, 1, 2].map((k) => `<path d="M${b - d * 60} ${78 + k * 34} h${96 * d}" class="s-mint" stroke-width="10" stroke-linecap="round"/><path d="M${b + d * 44} ${70 + k * 34} l${14 * d} 8 l${-14 * d} 8z" class="f-mint"/>`).join("")}</g>
      <g ${an("fade", 1.0)}>${txt(b, 194, tr("شيت شيت", "sheet by sheet"), "t-mint", 12.5, b8)}${txt(b, 214, tr("١٣ مرة · ثواني", "13 trips · seconds"), "t-ink2", 11.5, bold)}</g>
      ${pill(240, 258, 330, 34, tr("«اقرا الشيت مرة واحدة في مصفوفة»", "“read each sheet at once into an array”"), "f-acc-soft s-acc", "t-acc", 11.5, 1.3)}`;
    },
    xs_log: () => {
      const a = mx(130), b = mx(366), d = dirx();
      const L = ar() ? ["١٣ ملف اتقروا", "١٬٢٨٩ صف بيانات", "صف Total اتساب", "صفين في To_Review", "٢٩٬٣١٨ جهاز"] : ["13 files read", "1,289 data rows", "a Total row skipped", "2 rows in To_Review", "29,318 units"];
      return `<g ${an("rise", 0.05)}>${box(a, 140, 200, 220, "f-s2 s-line2")}${txt(a, 48, tr("السجل", "the log"), "t-ink", 12.5, b8)}</g>
      <g ${an("rise", 0.3)}>${box(b, 140, 170, 220, "f-s1 s-amber")}${txt(b, 48, "Answer_Key.txt", "t-amber", 11.5, 'font-weight="800" direction="ltr"')}</g>
      ${L.map((s, i) => `<g ${an("fade", 0.5 + i * 0.2)}>${txt(a, 86 + i * 38, s, "t-ink", 11.5, b8)}${txt(b, 86 + i * 38, s, "t-ink2", 11.5, bold)}</g>${check(240 + d * 4, 82 + i * 38, 0.7 + i * 0.2)}`).join("")}
      ${pill(240, 280, 330, 32, tr("واختبار أخير: نسخة ناقصة عمود ← وقفت", "and a last test: a copy missing a column → stopped"), "f-mint", "t-white", 11, 1.7)}`;
    },
    xs_cliff: () => {
      const t = mx(150), m = mx(388), d = dirx();
      return `${rowL(t, 70, ["LineCode", "ModelCode", "Qty"], 80, 28, "f-acc-soft", "t-acc", 10, 0.05)}
      ${[["L04", "M105", "16"], ["L01", "M102", "48"], ["L03", "M111", "25"]].map((r, i) => rowL(t, 104 + i * 32, r, 80, 26, "f-s1", "t-ink", 10, 0.2 + i * 0.1)).join("")}
      <g ${an("rise", 0.7)}>${person(m, 120, 1.2, "f-ink2")}${bubble(m, 52, 170, 40, "f-acc-soft s-acc", ar())}${txt(m, 57, tr("حسب الفئة والعنبر؟", "by category and hall?"), "t-acc", 11.5, b8)}</g>
      <g ${an("pop", 1.1)}>${xl(t, 230, 1.1)}${txt(t + d * 70, 235, "Masters.xlsx", "t-mint", 12, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("pop", 1.3)}>${txt(m, 214, "?", "t-acc", 34, b8)}</g>
      ${cap(tr("الدرس الجاي: كل كود يلاقي اسمه", "next lesson: every code finds its name"), 1.5, 296)}`;
    },

    /* ----- tool two: lookups (data/lookup-story.js) ----- */
    xj_codes: () => {
      const N = ["LineName", "Hall", "ModelName", "Category", "StdCost"];
      const X = (i) => 240 + (i - 3) * 62;
      return `${rowL(240, 70, ["Line", "Model", ...N], 58, 30, ["f-acc-soft", "f-acc-soft", "f-s2", "f-s2", "f-s2", "f-s2", "f-s2"], ["t-acc", "t-acc", "t-ink3", "t-ink3", "t-ink3", "t-ink3", "t-ink3"], 8.5, 0.05)}
      ${[0, 1, 2, 3].map((r) => `<g ${an("fade", 0.3 + r * 0.1)}>${[0, 1, 2, 3, 4, 5, 6].map((c) => `<rect x="${X(c) - 29}" y="${94 + r * 28}" width="58" height="24" rx="3" class="${c < 2 ? "f-s1" : "f-s1 s-line2"}" ${c >= 2 ? 'stroke-dasharray="3 3" stroke-width="1.2"' : ""}/>`).join("")}${txt(X(0), 110 + r * 28, ["L04", "L01", "L03", "L05"][r], "t-ink", 9.5, 'font-weight="700" direction="ltr"')}${txt(X(1), 110 + r * 28, ["M105", "M102", "M113", "M108"][r], "t-ink", 9.5, 'font-weight="700" direction="ltr"')}</g>`).join("")}
      <g ${an("pop", 1.0)}><rect x="${X(4) - 29}" y="${94 + 2 * 28}" width="58" height="24" rx="3" class="f-rose-soft"/>${txt(X(4), 166, "#N/A", "t-rose", 10, 'font-weight="800" direction="ltr"')}</g>
      ${pill(240, 236, 320, 36, tr("بالإيد: ٥ معادلات × ١٬٢٨٧ صف · ساعتين", "by hand: 5 formulas × 1,287 rows · 2 h"), "f-rose-soft s-rose", "t-rose", 11.5, 1.2)}
      ${cap(tr("الكود لوحده رقم… والاسم هو اللي بيتقري", "a code alone is a number… the name is what's read"), 1.5, 296)}`;
    },
    xj_dict: () => {
      const s = mx(106), k = mx(262), t = mx(410), d = dirx();
      return `${grid(s, 116, 2, 6, 52, 20, "f-s1", -1, 0.05)}<g ${an("fade", 0.2)}>${txt(s, 46, "Models", "t-ink3", 12, 'font-weight="800" direction="ltr"')}</g>
      <path ${an("draw", 0.5, "s-acc")} pathLength="1" d="M${s + d * 60} 116 H ${k - d * 72}" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 0.7)}>${box(k, 116, 136, 132, "f-acc-soft s-acc", 2.5)}${txt(k, 66, tr("القاموس", "dictionary"), "t-acc", 12.5, b8)}
        ${[["M102", "32-inch HD"], ["M105", "43-inch FHD"], ["M108", "55-inch 4K"]].map(([c, n], i) => `${txt(k - d * 40, 98 + i * 30, c, "t-ink", 10, 'font-weight="800" direction="ltr"')}${txt(k + d * 22, 98 + i * 30, n, "t-ink2", 10, 'font-weight="700" direction="ltr"')}`).join("")}</g>
      ${[0, 1, 2, 3, 4].map((i) => `<path ${an("draw", 1.1 + i * 0.08, "s-mint")} pathLength="1" d="M${k + d * 70} 116 L ${t - d * 40} ${64 + i * 26}" stroke-width="1.6" fill="none"/>`).join("")}
      ${grid(t, 116, 2, 6, 34, 20, "f-s1", [1], 1.0)}<g ${an("fade", 1.2)}>${txt(t, 46, tr("١٬٢٨٧ صف", "1,287 rows"), "t-ink3", 12, b8)}</g>
      ${pill(240, 246, 330, 34, tr("يتبني مرة… والبحث فيه لحظة لكل صف", "built once… an instant per row"), "f-mint-soft s-mint", "t-mint", 11.5, 1.5)}
      ${cap(tr("نفس منطق البحث في إكسل… من غير ولا معادلة", "Excel's lookup logic… without a single formula"), 1.7, 300)}`;
    },
    xj_twice: () => {
      const t = mx(156), s = mx(396), d = dirx();
      const R = [["M107", "10400"], ["M108", "12300"], ["M108", "12900"], ["M109", "15600"]];
      return `<g ${an("fade", 0.05)}>${txt(t, 40, "Masters.xlsx · Models", "t-ink2", 12, 'font-weight="800" direction="ltr"')}</g>
      ${rowL(t, 72, ["ModelCode", "StdCost"], 120, 28, "f-acc-soft", "t-acc", 10.5, 0.1)}
      ${R.map((r, i) => rowL(t, 106 + i * 34, r, 120, 28, i === 1 || i === 2 ? "f-rose-soft" : "f-s1", i === 1 || i === 2 ? "t-rose" : "t-ink", 11, 0.3 + i * 0.12)).join("")}
      <g ${an("pop", 1.0)}>${stopSign(s, 120, 32)}</g>
      <g ${an("fade", 1.2)}>${txt(s, 180, tr("وقّف واكتب القيمتين", "stop, write both values"), "t-rose", 11.5, b8)}</g>
      ${pill(240, 262, 340, 34, tr("معادلة البحث: تاخد أول واحد وتسكت", "a lookup formula: takes the first, stays silent"), "f-s2 s-line2", "t-ink2", 11.5, 1.4)}`;
    },
    xj_ask: () => {
      const p = mx(96), m = mx(300), d = dirx();
      return `<g ${an("rise", 0.05)}>${person(p, 120, 1.3, "f-acc")}${txt(p, 150, tr("مهندس التخطيط", "the planner"), "t-ink2", 11.5, b8)}</g>
      <g ${an("rise", 0.4)}>${bubble(m, 74, 250, 58, "f-mint-soft s-mint", ar())}${txt(m, 68, tr("التكاليف: «12300 من أول يناير،", "Costing: “12300 since January;"), "t-mint", 11, b8)}${txt(m, 88, tr("والسطر التاني قديم»", "the other line is old”"), "t-mint", 11, b8)}</g>
      <g ${an("rise", 0.9)}>${box(m - d * 64, 186, 116, 70, "f-s1 s-mint")}${txt(m - d * 64, 166, tr("نسختك", "your copy"), "t-mint", 11.5, b8)}${txt(m - d * 64, 188, "M108 12300", "t-ink", 10.5, 'font-weight="700" direction="ltr"')}${txt(m - d * 64, 208, "M108 12900", "t-ink3", 10.5, 'font-weight="700" direction="ltr"')}<line x1="${m - d * 64 - 38}" y1="204" x2="${m - d * 64 + 38}" y2="204" class="s-rose" stroke-width="2"/></g>
      <g ${an("rise", 1.1)}>${box(m + d * 70, 186, 116, 70, "f-s2 s-line2")}${txt(m + d * 70, 166, tr("الأصل", "original"), "t-ink3", 11.5, b8)}${txt(m + d * 70, 194, tr("ما اتلمسش", "untouched"), "t-ink2", 11, bold)}</g>
      ${cap(tr("الأداة بتسأل… وصاحب البيانات بيجاوب", "the tool asks… the data's owner answers"), 1.5, 290)}`;
    },
    xj_space: () => {
      const a = mx(130), p = mx(360), d = dirx();
      const B = ["L01", "L02", "L03", "L04", "L05", "L06", "“L04 ” ?"];
      return `<g ${an("rise", 0.05)}>${box(a, 92, 116, 48, "f-rose-soft s-rose")}${mono(a - 26, 98, "L04", "t-rose", 16, b8)}<rect x="${a + 12}" y="80" width="14" height="24" rx="3" class="f-rose"/></g>
      <g ${an("rise", 0.3)}>${box(a, 170, 116, 48, "f-s1 s-ink2")}${mono(a - 16, 176, "L04", "t-ink", 16, b8)}</g>
      <g ${an("pop", 0.6)}>${txt(a, 138, "≠", "t-rose", 22, b8)}</g>
      <g ${an("fade", 0.8)}>${txt(a, 222, tr("مسافة مش باينة", "an invisible space"), "t-rose", 11.5, b8)}${txt(a, 240, tr("١٨ صف من الأسبوع ٥", "18 rows from week 5"), "t-ink3", 11, bold)}</g>
      <g ${an("rise", 0.9)}>${box(p, 150, 170, 236, "f-s1 s-line2")}${txt(p, 50, tr("الجدول المحوري", "the pivot"), "t-ink", 12, b8)}</g>
      ${B.map((s, i) => `<g ${an("fade", 1.0 + i * 0.1)}>${txt(p, 78 + i * 28, s, i === 6 ? "t-rose" : "t-ink2", 11.5, i === 6 ? 'font-weight="800" direction="ltr"' : 'font-weight="700" direction="ltr"')}</g>`).join("")}
      ${cap(tr("مسافة واحدة… خط زيادة", "one space… one extra line"), 1.8, 300)}`;
    },
    xj_case: () => {
      return `<g ${an("rise", 0.05)}>${box(mx(130), 110, 140, 64, "f-rose-soft s-rose")}${mono(mx(130) - 20, 120, "l03", "t-rose", 22, b8)}</g>
      <g ${an("pop", 0.4)}>${txt(240, 120, "≠ ?", "t-ink2", 24, b8)}</g>
      <g ${an("rise", 0.2)}>${box(mx(350), 110, 140, 64, "f-s1 s-ink2")}${mono(mx(350) - 20, 120, "L03", "t-ink", 22, b8)}</g>
      <g ${an("fade", 0.7)}>${txt(mx(130), 168, tr("١٩ صف · الأسبوع ٦", "19 rows · week 6"), "t-ink3", 11.5, bold)}${txt(mx(350), 168, tr("في القاموس", "in the dictionary"), "t-ink3", 11.5, bold)}</g>
      ${pill(240, 222, 340, 40, tr("«حوّل كل الأكواد لحروف كبيرة قبل الربط»", "“upper-case every code before joining”"), "f-mint", "t-white", 12, 1.0)}
      ${cap(tr("اللي مش مكتوب في الـ Prompt… صدفة", "what isn't in the Prompt… is chance"), 1.4, 290)}`;
    },
    xj_norm: () => {
      const a = mx(96), g = 240, b = mx(384), d = dirx();
      const I = ["L04 ", "l03", "L01"], O = ["L04", "L03", "L01"];
      return `${I.map((s, i) => `<g ${an("rise", 0.05 + i * 0.12)}>${box(a, 74 + i * 52, 104, 38, i < 2 ? "f-rose-soft s-rose" : "f-s1 s-line2", 1.5)}${mono(a - 28, 80 + i * 52, s === "L04 " ? "L04_" : s, i < 2 ? "t-rose" : "t-ink", 13, b8)}</g>`).join("")}
      <g ${an("pop", 0.6)}><circle cx="${g}" cy="126" r="40" class="f-acc"/><g class="an turn" style="--d:0.9s;transform-box:fill-box;transform-origin:center">${[0, 45, 90, 135].map((r) => `<rect x="${g - 4}" y="${126 - 26}" width="8" height="52" rx="3" class="f-white" transform="rotate(${r} ${g} 126)"/>`).join("")}</g><circle cx="${g}" cy="126" r="14" class="f-acc"/></g>
      <g ${an("fade", 0.7)}>${txt(g, 190, tr("شيل المسافات · حروف كبيرة", "trim · upper case"), "t-acc", 11.5, b8)}</g>
      ${[0, 1, 2].map((i) => `<path ${an("draw", 0.5 + i * 0.1, "s-ink3")} pathLength="1" d="M${a + d * 56} ${74 + i * 52} L ${g - d * 44} 126" stroke-width="1.8" fill="none"/><path ${an("draw", 1.0 + i * 0.1, "s-mint")} pathLength="1" d="M${g + d * 44} 126 L ${b - d * 56} ${74 + i * 52}" stroke-width="1.8" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      ${O.map((s, i) => `<g ${an("pop", 1.2 + i * 0.12)}>${box(b, 74 + i * 52, 104, 38, "f-mint-soft s-mint", 1.5)}${mono(b - 22, 80 + i * 52, s, "t-mint", 13, b8)}</g>`).join("")}
      ${pill(240, 250, 330, 34, tr("السجل: اتظبط ٣٧ كود · ١٨ مسافة · ١٩ حروف", "log: 37 codes fixed · 18 spaces · 19 case"), "f-s2 s-line2", "t-ink", 11, 1.6)}`;
    },
    xj_keep: () => {
      const a = mx(126), b = mx(354), d = dirx();
      const tbl = (x, keep, dd) => `<g ${an("rise", dd)}>${[0, 1, 2, 3, 4, 5].map((r) => `<rect x="${x - 70}" y="${64 + r * 24}" width="140" height="20" rx="3" class="${r === 3 ? (keep ? "f-amber-soft s-amber" : "f-rose-soft s-rose") : "f-s1 s-line2"}" stroke-width="1.2" ${r === 3 && !keep ? 'stroke-dasharray="4 3"' : ""}/>`).join("")}</g>`;
      return `<g ${an("fade", 0.05)}>${txt(a, 44, tr("بيسيب اللي اتربط بس", "keeps matches only"), "t-rose", 12, b8)}${txt(b, 44, tr("بيسيب كل الصفوف", "keeps every row"), "t-mint", 12, b8)}</g>
      ${tbl(a, false, 0.2)}${tbl(b, true, 0.5)}
      <g ${an("pop", 0.8)}>${txt(a, 140, tr("اختفى", "gone"), "t-rose", 10.5, b8)}${txt(b, 140, tr("خانات فاضية", "blank cells"), "t-amber", 10.5, b8)}</g>
      ${pill(a, 236, 190, 36, tr("١٬٢٨٧ ← ١٬٢٧٣", "1,287 → 1,273"), "f-rose-soft s-rose", "t-rose", 13, 1.0)}${pill(b, 236, 190, 36, tr("١٬٢٨٧ = ١٬٢٨٧", "1,287 = 1,287"), "f-mint", "t-white", 13, 1.2)}
      ${cap(tr("قبل الربط = بعد الربط… وإلا فيه حاجة ضاعت", "before = after… or something got lost"), 1.5, 296)}`;
    },
    xj_unmatched: () => {
      const s = mx(140), n = mx(372), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(s, 130, 220, 160, "f-rose-soft s-rose", 2.5)}${txt(s, 72, tr("شيت Unmatched", "the Unmatched sheet"), "t-rose", 13, b8)}
        ${mono(s - 70, 116, "M113", "t-ink", 22, b8)}${txt(s, 150, tr("١٤ صف", "14 rows"), "t-ink2", 12.5, b8)}${txt(s, 176, tr("٢٢٩ جهاز", "229 units"), "t-rose", 14, b8)}</g>
      <g ${an("rise", 0.6)}>${box(n, 130, 160, 160, "f-s2 s-line2")}${txt(n, 72, tr("المعادلة كانت", "a formula gives"), "t-ink3", 11.5, b8)}${[0, 1, 2, 3].map((k) => txt(n + (k % 2 ? 26 : -26) * d, 104 + k * 22, "#N/A", "t-ink3", 11, 'font-weight="700" direction="ltr"')).join("")}${txt(n, 196, tr("وسط ١٬٢٨٧ صف", "among 1,287 rows"), "t-ink3", 10.5, bold)}</g>
      ${pill(s, 248, 220, 32, tr("موديل جديد: شاشة ٥٨ بوصة", "a new model: 58-inch TV"), "f-s1 s-rose", "t-rose", 11.5, 1.0)}
      ${cap(tr("اللي ما اتربطش أهم من اللي اتربط", "what didn't match matters more than what did"), 1.3, 298)}`;
    },
    xj_values: () => {
      const a = mx(126), b = mx(354);
      return `<g ${an("rise", 0.05)}>${box(a, 104, 196, 56, "f-rose-soft s-rose")}${mono(a - 86, 109, "=VLOOKUP(D2,Models!A:C,2)", "t-rose", 9.5, b8)}</g>
      <g ${an("fade", 0.4)}>${txt(a, 160, tr("بيتغيّر لو الشيت اتغيّر", "changes when the sheet does"), "t-rose", 11.5, b8)}${txt(a, 180, tr("وبيتقّل الملف", "and slows the workbook"), "t-ink3", 11, bold)}</g>
      <g ${an("rise", 0.6)}>${box(b, 104, 196, 56, "f-mint-soft s-mint")}${txt(b, 109, "43-inch Full HD TV", "t-mint", 12.5, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("fade", 0.9)}>${txt(b, 160, tr("قيمة ثابتة", "a fixed value"), "t-mint", 11.5, b8)}${txt(b, 180, tr("نفس الرقم بعد شهر", "the same figure a month on"), "t-ink3", 11, bold)}</g>
      <g ${an("pop", 1.2)}>${xl(240, 234, 1.1)}${txt(240, 274, "Production_Enriched_Q1.xlsx", "t-ink", 11.5, 'font-weight="800" direction="ltr"')}</g>
      ${cap(tr("القيمة ثابتة… والمعادلة بتتحرك", "a value stays put… a formula moves"), 1.4, 304)}`;
    },
    xj_category: () => {
      const C = [["Small", 11270], ["Medium", 7936], ["Large", 6036], ["Extra Large", 3847], [tr("من غير فئة", "no category"), 229]];
      const d = dirx(), lx = mx(98);
      return `${C.map(([s, v], i) => { const y = 54 + i * 34;
        return `<g ${an("fade", 0.05 + i * 0.12)}>${txt(lx, y + 5, s, i === 4 ? "t-rose" : "t-ink", 11.5, i === 4 ? b8 : 'font-weight="800" direction="ltr"')}</g>${grow(176, y - 9, Math.max(4, Math.round((v / 11270) * 190)), 18, i === 4 ? "f-rose" : "f-acc", 0.2 + i * 0.12)}<g ${an("fade", 0.4 + i * 0.12)}>${txt(mx(176 + Math.max(4, Math.round((v / 11270) * 190)) + 46), y + 5, n_(v.toLocaleString("en-US")), "t-ink2", 10.5, b8)}</g>`; }).join("")}
      ${pill(240, 262, 280, 36, tr("المجموع = ٢٩٬٣١٨ جهاز ✓", "total = 29,318 units ✓"), "f-mint", "t-white", 13, 1.3)}
      ${cap(tr("الأجزاء بتجمع للكل… والفرق باين", "the parts add up to the whole… the gap shows"), 1.6, 304)}`;
    },
    xj_cliff: () => {
      const t = mx(150), m = mx(380), d = dirx();
      return `${rowL(t, 80, ["LineCode", "Hall", "Category"], 82, 28, "f-acc-soft", "t-acc", 10, 0.05)}
      ${[["L04", "Hall B", "Medium"], ["L01", "Hall A", "Small"], ["L06", "Hall C", "Large"]].map((r, i) => rowL(t, 114 + i * 32, r, 82, 26, "f-mint-soft", "t-ink", 10, 0.2 + i * 0.1)).join("")}
      <g ${an("rise", 0.7)}>${person(m, 128, 1.2, "f-ink2")}${bubble(m, 56, 176, 44, "f-acc-soft s-acc", ar())}${txt(m, 61, tr("كل خط حقق كام من خطته؟", "how much of its plan?"), "t-acc", 11, b8)}</g>
      <g ${an("pop", 1.1)}>${xl(t, 240, 1.1)}${txt(t + d * 86, 245, "Plan_Q1.xlsx", "t-amber", 11, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("pop", 1.3)}>${txt(m, 222, "?", "t-acc", 34, b8)}</g>
      ${cap(tr("الدرس الجاي: الإنتاج قصاد الخطة", "next lesson: output against plan"), 1.5, 300)}`;
    },

    /* ----- tool three: the report (data/report-story.js) ----- */
    xr_scene: () => {
      const a = mx(96), b = mx(232), c = mx(388), d = dirx();
      return `${sheet(a, 110, 150, 110, "f-s1 s-line2", tr("الإنتاج", "output"), 0.05)}${sheet(b, 110, 120, 110, "f-s1 s-line2", tr("الخطة", "plan"), 0.25)}
      <g ${an("pop", 0.6)}><rect x="${c - 34}" y="62" width="68" height="96" rx="8" class="f-ink2"/><rect x="${c - 26}" y="70" width="52" height="20" rx="3" class="f-crt"/>${[0, 1, 2].map((r) => [0, 1, 2].map((k) => `<rect x="${c - 26 + k * 18}" y="${98 + r * 18}" width="14" height="13" rx="2" class="f-s3"/>`).join("")).join("")}</g>
      <g ${an("pop", 0.9)}><circle cx="${c}" cy="208" r="24" class="f-s1 s-rose" stroke-width="3.5"/><path d="M${c} 208 v-14 M${c} 208 l9 6" class="s-rose" stroke-width="3.5" stroke-linecap="round"/>${txt(c, 254, tr("١٫٥ ساعة", "1.5 h"), "t-rose", 12.5, b8)}</g>
      ${pill(mx(164), 214, 250, 36, tr("الشهر اللي فات: خطة اتكتبت غلط", "last month: a wrong plan slipped"), "f-rose-soft s-rose", "t-rose", 11, 1.2)}
      ${cap(tr("التقرير اللي بيتراجع بالإيد… بيتغلط بالإيد", "a report checked by hand… goes wrong by hand"), 1.5)}`;
    },
    xr_key: () => {
      const a = mx(120), b = mx(360), d = dirx();
      return `${rowL(a, 70, ["LineCode", "Date", "Qty"], 64, 28, "f-acc-soft", "t-acc", 9.5, 0.05)}${rowL(a, 102, ["L04", "2026-02-10", "22"], 64, 26, ["f-mint-soft", "f-mint-soft", "f-s1"], "t-ink", 9, 0.15)}
      ${rowL(b, 70, ["LineCode", "Month", "PlanQty"], 64, 28, "f-acc-soft", "t-acc", 9.5, 0.3)}${rowL(b, 102, ["L04", "2026-02", "1,600"], 64, 26, ["f-mint-soft", "f-mint-soft", "f-s1"], "t-ink", 9, 0.4)}
      <g ${an("fade", 0.6)}>${txt(a, 140, tr("التاريخ ← الشهر", "date → month"), "t-ink3", 11, b8)}</g>
      <g ${an("pop", 0.8)}>${box(240, 196, 240, 50, "f-mint", 0)}${txt(240, 202, "L04 + 2026-02", "t-white", 15, 'font-weight="800" direction="ltr"')}</g>
      <path ${an("draw", 1.0, "s-mint")} pathLength="1" d="M${a} 118 C ${a} 170, ${240 - d * 140} 196, ${240 - d * 122} 196" stroke-width="2.2" fill="none"/>
      <path ${an("draw", 1.0, "s-mint")} pathLength="1" d="M${b} 118 C ${b} 170, ${240 + d * 140} 196, ${240 + d * 122} 196" stroke-width="2.2" fill="none"/>
      ${cap(tr("المفتاح الكامل: الخط + الشهر", "the full key: line + month"), 1.3, 262)}`;
    },
    xr_sum: () => {
      const g = mx(300), d = dirx(), V = [[2018, 1673, 2104], [1777, 1525, 2084], [1842, 1892, 1808], [1618, 1472, 1624], [1631, 1412, 1266], [1261, 1050, 1261]];
      const fm = (v) => n_(v.toLocaleString("en-US"));
      return `<g ${an("rise", 0.05)}>${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<rect x="${mx(70) - 40}" y="${50 + k * 26}" width="80" height="20" rx="3" class="f-s1 s-line2" stroke-width="1"/>`).join("")}${txt(mx(70), 270, tr("١٬٢٨٧ دفعة", "1,287 batches"), "t-ink3", 11.5, b8)}</g>
      <path ${an("draw", 0.4, "s-acc")} pathLength="1" d="M${mx(122)} 150 H ${g - d * 128}" stroke-width="2.6" fill="none" marker-end="url(#aih-arrow)"/>
      ${cells(g, 44, ["", tr("يناير", "Jan"), tr("فبراير", "Feb"), tr("مارس", "Mar")], 58, 22, "f-acc-soft", "t-acc", 10, 0.5)}
      ${V.map((r, i) => cells(g, 72 + i * 28, ["L0" + (i + 1), ...r.map(fm)], 58, 24, ["f-s2", "f-mint-soft"], ["t-ink2", "t-ink"], 9.5, 0.6 + i * 0.1)).join("")}
      ${cap(tr("١٨ خانة… ومجموعها = مجموع الجدول", "18 cells… their sum = the table's sum"), 1.5, 270)}`;
    },
    xr_target: () => {
      const g = mx(196), s = mx(410), X = rowX(4, 60, 3, g);
      const cell = (r, c) => (r === 6 ? (c === 3 ? ["f-amber-soft", "No output", "t-amber"] : ["f-s2", "", "t-ink3"]) : r === 5 && c === 3 ? ["f-rose-soft", "No plan", "t-rose"] : ["f-mint", "", "t-ink"]);
      return `${cells(g, 30, ["", tr("يناير", "Jan"), tr("فبراير", "Feb"), tr("مارس", "Mar")], 60, 22, "f-acc-soft", "t-acc", 10, 0.05)}
      ${[0, 1, 2, 3, 4, 5, 6].map((r) => `<g ${an("rise", 0.1 + r * 0.1)}>${[0, 1, 2, 3].map((c) => { const [cls, t, tc] = c ? cell(r, c) : ["f-s2", "L0" + (r + 1), "t-ink2"];
        return `<rect x="${X(c) - 30}" y="${54 + r * 30 - 12}" width="60" height="24" rx="4" class="${cls}"/>${t ? txt(X(c), 54 + r * 30 + 3.5, t, tc, c ? 8.5 : 10, 'font-weight="800" direction="ltr"') : ""}`; }).join("")}</g>`).join("")}
      <g ${an("rise", 1.0)}>${box(s, 130, 112, 120, "f-s1 s-acc")}${txt(s, 106, "17", "t-mint", 16, b8)}${txt(s, 128, "+ 1 No plan", "t-rose", 10.5, 'font-weight="800" direction="ltr"')}${txt(s, 148, "+ 1 No output", "t-amber", 10.5, 'font-weight="800" direction="ltr"')}${txt(s, 176, tr("= ١٩ صف", "= 19 rows"), "t-acc", 13, b8)}</g>
      ${pill(240, 286, 360, 32, tr("التقرير من القايمتين… مش من الإنتاج بس", "the report from both lists… not output alone"), "f-acc-soft s-acc", "t-acc", 11.5, 1.4)}`;
    },
    xr_none: () => {
      const c = 240, d = dirx();
      const row = (y, vals, cls, tc, dd) => rowL(c, y, vals, 96, 34, cls, tc, 11, dd);
      return `${row(64, ["LineCode", "Month", "Output", "Rate"], "f-acc-soft", "t-acc", 0.05)}
      ${row(106, ["L06", "2026-03", "1,261", "0% · last"], ["f-s1", "f-s1", "f-s1", "f-rose-soft"], ["t-ink", "t-ink", "t-ink", "t-rose"], 0.3)}
      <g ${an("pop", 0.7)}><line x1="${c - 200}" y1="106" x2="${c + 200}" y2="106" class="s-rose" stroke-width="3"/></g>
      ${row(160, ["L06", "2026-03", "1,261", "No plan"], ["f-s1", "f-s1", "f-s1", "f-mint-soft"], ["t-ink", "t-ink", "t-ink", "t-mint"], 1.0)}${check(mx(450), 160, 1.2)}
      <g ${an("fade", 1.3)}>${txt(c, 214, tr("برّه ترتيب مارس · النسبة فاضية", "out of March's ranking · rate blank"), "t-ink2", 11.5, b8)}</g>
      ${cap(tr("No plan حقيقة… و«٠٪» اتهام", "“No plan” is a fact… “0%” an accusation"), 1.5, 262)}`;
    },
    xr_returns: () => {
      const t = mx(180), s = mx(408), d = dirx();
      const R = [["M105", "16", "110,400"], ["M111", "-6", "-147,000"], ["M102", "48", "187,200"], ["M101", "-2", "-5,800"]];
      return `${rowL(t, 62, ["ModelCode", "Qty", "Value"], 92, 28, "f-acc-soft", "t-acc", 10, 0.05)}
      ${R.map((r, i) => rowL(t, 96 + i * 32, r, 92, 26, r[1].startsWith("-") ? "f-rose-soft" : "f-s1", r[1].startsWith("-") ? "t-rose" : "t-ink", 10, 0.2 + i * 0.12)).join("")}
      <g ${an("rise", 0.8)}>${box(s, 130, 112, 96, "f-s1 s-rose")}${txt(s, 118, tr("١٥ تصحيح", "15 fixes"), "t-rose", 14, b8)}${txt(s, 144, tr("من الجودة", "from quality"), "t-ink3", 11, bold)}</g>
      ${pill(240, 252, 330, 36, tr("بتتخصم من الصافي… ما بتتحذفش", "deducted from the net… never deleted"), "f-mint", "t-white", 12, 1.2)}
      ${cap(tr("السالب مش غلط… السالب تصحيح من الجودة", "a negative isn't an error… it's a quality fix"), 1.5, 300)}`;
    },
    xr_rank: () => {
      const B = ["L01", "L02", "L03", "L04", "L05", "L06"];
      const V = [96.1, 111.1, 102.3, 89.9, 108.7, 97.0], d = dirx(), x0 = 150, sc = 2.3, base = 60;
      const w = (v) => Math.round((v - base) * sc);
      return `<g ${an("fade", 0.05)}>${txt(240, 30, tr("يناير: نسبة التحقيق", "January: achievement"), "t-ink2", 12, b8)}</g>
      ${V.map((v, i) => { const y = 50 + i * 36;
        return `<g ${an("fade", 0.1 + i * 0.1)}>${txt(mx(84), y + 14, B[i], i === 3 ? "t-rose" : "t-ink", 11.5, 'font-weight="800" direction="ltr"')}</g>${grow(x0, y + 1, w(v), 20, v >= 100 ? "f-mint" : v >= 90 ? "f-amber" : "f-rose", 0.3 + i * 0.1)}<g ${an("fade", 0.6 + i * 0.1)}>${txt(mx(x0 + w(v) + 30), y + 15, n_(v.toFixed(1)) + tr("٪", "%"), "t-ink2", 10.5, b8)}</g>`; }).join("")}
      <g ${an("fade", 1.1)}><line x1="${mx(x0 + w(100))}" y1="44" x2="${mx(x0 + w(100))}" y2="262" class="s-ink3" stroke-width="1.8" stroke-dasharray="4 4"/>${txt(mx(x0 + w(100)), 278, "100%", "t-ink3", 10.5, 'font-weight="700" direction="ltr"')}</g>
      ${cap(tr("أعلى نسبة في الربع: L02 يناير ١١١٫١٪", "the quarter's best: L02 January 111.1%"), 1.3, 304)}`;
    },
    xr_check: () => {
      const a = mx(120), b = mx(360);
      return `<g ${an("rise", 0.05)}>${box(a, 110, 180, 96, "f-s1 s-acc")}${txt(a, 92, tr("Σ التقرير", "Σ report"), "t-acc", 13, b8)}${txt(a, 122, n_("29,318"), "t-ink", 16, b8)}</g>
      <g ${an("rise", 0.3)}>${box(b, 110, 180, 96, "f-s1 s-acc")}${txt(b, 92, tr("Σ المصدر", "Σ source"), "t-acc", 13, b8)}${txt(b, 122, n_("29,318"), "t-ink", 16, b8)}</g>
      <g ${an("pop", 0.7)}><circle cx="240" cy="110" r="22" class="f-mint"/>${txt(240, 118, "=", "t-white", 22, b8)}</g>
      ${pill(240, 206, 300, 40, tr("متساويين ← تحفظ · مش متساويين ← توقف", "equal → save · not equal → stop"), "f-mint-soft s-mint", "t-mint", 12, 1.0)}
      ${cap(tr("الأداة ما تقولش «خلصت» قبل ما تثبت", "the tool doesn't say “done” before it proves it"), 1.4, 270)}`;
    },
    xr_gap: () => {
      const d = dirx();
      return `<g ${an("rise", 0.05)}>${box(240, 62, 380, 48, "f-rose-soft s-rose")}${mono(130, 68, "29,377  !=  29,318", "t-rose", 15, b8)}</g>
      <path ${an("draw", 0.4, "s-rose")} pathLength="1" d="M240 88 V 116" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      ${pill(240, 142, 320, 40, tr("الفرق ٥٩ = اللي رجع من الجودة", "gap 59 = units back from quality"), "f-s1 s-rose", "t-rose", 13, 0.6)}
      <path ${an("draw", 0.9, "s-acc")} pathLength="1" d="M${240 - d * 160} 142 C ${240 - d * 200} 142, ${mx(110)} 170, ${mx(110)} 196" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.1)}>${box(mx(110), 226, 180, 50, "f-acc-soft s-acc")}${txt(mx(110), 222, tr("نسخة الزميل", "the colleague's copy"), "t-acc", 12, b8)}${txt(mx(110), 240, tr("كانت بتشيل السالب", "was dropping negatives"), "t-ink2", 10.5, bold)}</g>
      <g ${an("pop", 1.4)}>${box(mx(350), 226, 190, 50, "f-mint-soft s-mint")}${txt(mx(350), 222, tr("التصليح في القاعدة", "the fix: in the rule"), "t-mint", 12, b8)}${txt(mx(350), 240, tr("مش في التقرير", "not in the report"), "t-ink2", 10.5, bold)}</g>
      ${cap(tr("الفرق مش مشكلة التقرير… الفرق دليل", "the gap isn't the report's problem… it's evidence"), 1.7, 300)}`;
    },
    xr_format: () => {
      const a = mx(122), b = mx(358);
      const raw = [["L02", "1777", "1.1106"], ["L04", "1618", "0.8989"], ["L05", "1631", "1.0873"]], fin = [["L02", "1,777", "111.1%"], ["L04", "1,618", "89.9%"], ["L05", "1,631", "108.7%"]];
      return `<g ${an("fade", 0.05)}>${txt(a, 44, tr("قبل", "before"), "t-ink3", 12, b8)}${txt(b, 44, tr("بعد المراجعة", "after the check"), "t-mint", 12, b8)}</g>
      ${raw.map((r, i) => rowL(a, 78 + i * 32, r, 66, 26, "f-s1", "t-ink2", 9.5, 0.2 + i * 0.1)).join("")}
      ${fin.map((r, i) => rowL(b, 78 + i * 32, r, 66, 26, i === 1 ? "f-rose-soft" : "f-s1", i === 1 ? "t-rose" : "t-ink", 9.5, 0.8 + i * 0.1)).join("")}
      ${[[tr("فاصل آلاف", "thousands"), 0], [tr("علامة ٪", "percent sign"), 1], [tr("أحمر فاتح تحت ٩٠٪", "light red < 90%"), 2]].map(([s, i]) => pill(b, 186 + i * 30, 170, 24, s, "f-mint-soft s-mint", "t-mint", 10.5, 1.2 + i * 0.15)).join("")}
      ${cap(tr("اللون بيشاور… والرقم هو اللي بيتكلم", "colour points… the figure speaks"), 1.7, 300)}`;
    },
    xr_compare: () => {
      const a = mx(180), s = mx(408), d = dirx();
      const R = ar() ? [["L02 · يناير", "١١١٫١٪"], ["L04 · مارس", "٨٥٫٥٪"], ["L06 · مارس", "No plan"], ["L07 · مارس", "No output"], ["الإجمالي", "٢٩٬٣١٨"]] : [["L02 · Jan", "111.1%"], ["L04 · Mar", "85.5%"], ["L06 · Mar", "No plan"], ["L07 · Mar", "No output"], ["Total", "29,318"]];
      return `${R.map(([k, v], i) => `<g ${an("fade", 0.1 + i * 0.2)}>${box(a, 54 + i * 44, 270, 36, "f-s1 s-line2", 1.5)}${txt(a - d * 60, 59 + i * 44, k, "t-ink", 11.5, b8)}${txt(a + d * 76, 59 + i * 44, v, "t-acc", 12, b8)}</g>${check(a + d * 156, 54 + i * 44, 0.3 + i * 0.2)}`).join("")}
      <g ${an("pop", 1.3)}>${box(s, 140, 100, 90, "f-amber-soft s-amber")}${txt(s, 134, tr("مفتاح", "answer"), "t-amber", 12, b8)}${txt(s, 152, tr("الإجابة", "key"), "t-amber", 12, b8)}</g>
      ${cap(tr("ومع ملفاتك: قصاد تقرير الشهر اللي فات المعتمد", "with your files: against last month's approved report"), 1.5, 290)}`;
    },
    xr_cliff: () => {
      const X = rowX(3, 96, 26, 240), d = dirx(), p = mx(120), r = mx(350);
      return `${[tr("تحت بعض", "stacking"), tr("بحث وربط", "lookups"), tr("قصاد الخطة", "vs plan")].map((s, i) => `${pill(X(i), 52, 96, 36, s, "f-mint-soft s-mint", "t-mint", 11.5, 0.1 + i * 0.2)}${i < 2 ? `<path ${an("draw", 0.3 + i * 0.2, "s-mint")} pathLength="1" d="M${X(i) + d * 50} 52 H ${X(i + 1) - d * 52}" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>` : ""}`).join("")}${check(X(2) + d * 54, 36, 0.8)}
      <g ${an("rise", 1.0)}>${box(p, 170, 176, 70, "f-acc-soft s-acc")}${txt(p, 150, "PO-26-0202", "t-acc", 12, 'font-weight="800" direction="ltr"')}${txt(p, 172, "PSU-L · 150", "t-ink", 11.5, 'font-weight="800" direction="ltr"')}${txt(p, 192, tr("سطر أمر شراء واحد", "one order line"), "t-ink3", 10.5, bold)}</g>
      ${[27, 27, 28].map((q, i) => { const y = 120 + i * 50; return `<path ${an("draw", 1.3 + i * 0.15, "s-ink3")} pathLength="1" d="M${p + d * 90} 170 C ${p + d * 140} 170, ${r - d * 120} ${y}, ${r - d * 76} ${y}" stroke-width="2" fill="none" marker-end="url(#aih-arrow)"/>${pill(r, y, 144, 34, tr("استلام · " + digits(q), "receipt · " + q), "f-s1 s-line2", "t-ink", 11, 1.5 + i * 0.15)}`; }).join("")}
      <g ${an("pop", 2.0)}>${txt(r + d * 100, 172, "?", "t-acc", 30, b8)}</g>
      ${cap(tr("الدرس الجاي: أوامر الشراء قصاد الاستلام", "next lesson: purchase orders against receipts"), 2.1, 300)}`;
    },

    /* ----- tool four: purchase orders against receipts (data/match-story.js) ----- */
    xm_scene: () => {
      const a = mx(96), b = mx(232), c = mx(388);
      return `${sheet(a, 110, 150, 110, "f-s1 s-line2", "PO_Lines", 0.05)}${sheet(b, 110, 120, 110, "f-s1 s-line2", "Receipts", 0.25)}
      <g ${an("pop", 0.6)}><rect x="${c - 34}" y="62" width="68" height="96" rx="8" class="f-ink2"/><rect x="${c - 26}" y="70" width="52" height="20" rx="3" class="f-crt"/>${[0, 1, 2].map((r) => [0, 1, 2].map((k) => `<rect x="${c - 26 + k * 18}" y="${98 + r * 18}" width="14" height="13" rx="2" class="f-s3"/>`).join("")).join("")}</g>
      <g ${an("pop", 0.9)}><circle cx="${c}" cy="208" r="24" class="f-s1 s-rose" stroke-width="3.5"/><path d="M${c} 208 v-14 M${c} 208 l9 6" class="s-rose" stroke-width="3.5" stroke-linecap="round"/>${txt(c, 254, tr("يوم كامل", "a full day"), "t-rose", 12.5, b8)}</g>
      ${pill(mx(164), 214, 250, 36, tr("٣٢ سطر قصاد ٥٦ استلام", "32 lines against 56 receipts"), "f-acc-soft s-acc", "t-acc", 11.5, 1.2)}
      ${cap(tr("نفس الخطوة ٣٢ مرة… بالإيد", "the same step 32 times… by hand"), 1.5)}`;
    },
    xm_files: () => {
      return `<g ${an("fade", 0.05)}>${txt(240, 34, "Purchase_Orders_Feb.xlsx · PO_Lines", "t-ink2", 11.5, 'font-weight="800" direction="ltr"')}</g>
      ${rowL(240, 60, ["PONumber", "MaterialCode", "OrderedQty", "UnitPrice"], 98, 26, "f-acc-soft", "t-acc", 9.5, 0.1)}
      ${rowL(240, 90, ["PO-26-0202", "PSU-L", "150", "410"], 98, 24, "f-s1", "t-ink", 9.5, 0.25)}
      <g ${an("fade", 0.6)}>${txt(240, 146, "Goods_Receipts_Feb.xlsx · Receipts", "t-ink2", 11.5, 'font-weight="800" direction="ltr"')}</g>
      ${rowL(240, 172, ["ReceiptNo", "PONumber", "MaterialCode", "ReceivedQty"], 98, 26, "f-mint-soft", "t-mint", 9.5, 0.7)}
      ${[["GRN-26-0010", "27"], ["GRN-26-0024", "27"], ["GRN-26-0038", "28"]].map(([g, q], i) => rowL(240, 202 + i * 28, [g, "PO-26-0202", "PSU-L", q], 98, 24, "f-s1", "t-ink", 9.5, 0.85 + i * 0.12)).join("")}
      ${cap(tr("الطلب من ناحية… والاستلام من ناحية", "the order on one side… the receipt on the other"), 1.4, 304)}`;
    },
    xm_key: () => {
      const a = mx(130), b = mx(354);
      return `${rowL(240, 50, ["PONumber", "MaterialCode", "OrderedQty"], 110, 26, "f-acc-soft", "t-acc", 10, 0.05)}
      ${[["PO-26-0201", "PNL-55Q", "80"], ["PO-26-0210", "PNL-55Q", "60"]].map((r, i) => rowL(240, 80 + i * 28, r, 110, 24, ["f-s1", "f-amber-soft", "f-s1"], ["t-ink", "t-amber", "t-ink"], 10, 0.2 + i * 0.12)).join("")}
      <g ${an("pop", 0.6)}>${box(a, 162, 196, 40, "f-rose-soft s-rose", 1.5)}${txt(a, 159, tr("PONumber بس", "PONumber only"), "t-rose", 11, b8)}${txt(a, 175, tr("خامات الأمر تتجمع على بعض", "an order's materials summed together"), "t-ink3", 9.5, bold)}</g>${check(a, 138, 0.7, false)}
      <g ${an("pop", 0.8)}>${box(b, 162, 196, 40, "f-rose-soft s-rose", 1.5)}${txt(b, 159, tr("MaterialCode بس", "MaterialCode only"), "t-rose", 11, b8)}${txt(b, 175, tr("PNL-55Q من أمرين يتلخبطوا", "PNL-55Q from two orders mixed"), "t-ink3", 9.5, bold)}</g>${check(b, 138, 0.9, false)}
      ${pill(240, 236, 300, 42, "PONumber + MaterialCode", "f-mint", "t-white", 14, 1.2)}
      ${cap(tr("المفتاح بيميّز كل سطر لوحده", "the key singles out each line"), 1.5, 290)}`;
    },
    xm_many: () => {
      const p = mx(108), r = mx(316), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(p, 116, 168, 84, "f-acc-soft s-acc")}${txt(p, 100, "PO-26-0202", "t-acc", 12, 'font-weight="800" direction="ltr"')}${txt(p, 120, "PSU-L", "t-ink", 12, 'font-weight="800" direction="ltr"')}${txt(p, 140, tr("المطلوب ١٥٠", "ordered 150"), "t-ink2", 11, b8)}</g>
      ${[27, 27, 28].map((q, i) => `${pill(r, 62 + i * 46, 150, 34, tr("استلام · " + digits(q), "receipt · " + q), "f-s1 s-line2", "t-ink", 11, 0.4 + i * 0.15)}<path ${an("draw", 0.9 + i * 0.1, "s-mint")} pathLength="1" d="M${r + d * 78} ${62 + i * 46} C ${r + d * 120} ${62 + i * 46}, ${r + d * 120} 232, ${r + d * 40} 232" stroke-width="1.8" fill="none"/>`).join("")}
      <g ${an("pop", 1.3)}>${box(mx(276), 232, 210, 52, "f-mint-soft s-mint")}${txt(mx(276), 228, "27 + 27 + 28 = 82", "t-mint", 13, 'font-weight="800" direction="ltr"')}${txt(mx(276), 246, tr("٨٢ من ١٥٠ ← Partial", "82 of 150 → Partial"), "t-ink2", 11, b8)}</g>
      <path ${an("draw", 1.5, "s-acc")} pathLength="1" d="M${p} 160 C ${p} 210, ${mx(276) - d * 140} 232, ${mx(276) - d * 108} 232" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
      ${cap(tr("اجمع الأول… وبعدين قارن", "sum first… then compare"), 1.7, 296)}`;
    },
    xm_tol: () => {
      const X = (p) => 60 + ((p - 90) / 20) * 360;
      return `<g ${an("fade", 0.05)}>${txt(240, 44, "347 / 350 = 99.1%", "t-ink", 15, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("rise", 0.2)}><rect x="${X(90)}" y="128" width="${X(98) - X(90)}" height="24" rx="6" class="f-amber-soft"/><rect x="${X(98)}" y="128" width="${X(102) - X(98)}" height="24" class="f-mint"/><rect x="${X(102)}" y="128" width="${X(110) - X(102)}" height="24" rx="6" class="f-acc-soft"/></g>
      <g ${an("fade", 0.5)}>${txt((X(90) + X(98)) / 2, 116, "Partial", "t-amber", 12, 'font-weight="800" direction="ltr"')}${txt(240, 116, "Complete", "t-mint", 12, 'font-weight="800" direction="ltr"')}${txt((X(102) + X(110)) / 2, 116, "Over", "t-acc", 12, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("fade", 0.6)}>${[90, 98, 102, 110].map((p) => txt(X(p), 172, p + "%", "t-ink3", 10.5, 'font-weight="700" direction="ltr"')).join("")}</g>
      <g ${an("pop", 0.9)}><path d="M${X(99.1)} 80 v44" class="s-ink2" stroke-width="2.5"/><circle cx="${X(99.1)}" cy="76" r="6" class="f-ink2"/></g>
      ${pill(240, 222, 280, 40, tr("سياسة المشتريات: ٢٪", "purchasing's policy: 2%"), "f-s1 s-ink2", "t-ink", 13, 1.1)}
      ${cap(tr("السماح رقم… وليه صاحب", "a tolerance is a figure… with an owner"), 1.4, 280)}`;
    },
    xm_status: () => {
      const X = rowX(4, 104, 10, 240);
      const S = [["Complete", 22, "f-mint-soft s-mint", "t-mint", "f-mint"], ["Partial", 4, "f-amber-soft s-amber", "t-amber", "f-amber"], ["Over", 2, "f-acc-soft s-acc", "t-acc", "f-acc"], ["Not received", 4, "f-rose-soft s-rose", "t-rose", "f-rose"]];
      let x0 = 50;
      const bar = S.map(([, n, , , f], i) => { const w = (n / 32) * 380, r = `<rect x="${ar() ? 430 - (x0 - 50) - w : x0}" y="196" width="${w}" height="24" class="${f}"/>`; x0 += w; return r; }).join("");
      return `${S.map(([s, n, cls, tc], i) => `<g ${an("pop", 0.1 + i * 0.2)}>${box(X(i), 104, 104, 96, cls)}${txt(X(i), 106, digits(n), tc, 26, b8)}${txt(X(i), 134, s, tc, 10.5, 'font-weight="800" direction="ltr"')}</g>`).join("")}
      <g ${an("rise", 1.0)}>${bar}</g>
      <g ${an("fade", 1.2)}>${txt(240, 244, tr("٣٢ سطر · حالة واحدة لكل سطر", "32 lines · one status each"), "t-ink2", 11.5, b8)}</g>
      ${cap(tr("أربع كلمات… بتلخّص شهر", "four words… sum up a month"), 1.4, 290)}`;
    },
    xm_norm: () => {
      const a = mx(100), g = 240, b = mx(380), d = dirx();
      const I = ["po-26-0207_", "po-26-0206_", "PO-26-0204"], O = ["PO-26-0207", "PO-26-0206", "PO-26-0204"];
      return `${I.map((s, i) => `<g ${an("rise", 0.05 + i * 0.12)}>${box(a, 74 + i * 52, 128, 38, i < 2 ? "f-rose-soft s-rose" : "f-s1 s-line2", 1.5)}${txt(a, 79 + i * 52, s, i < 2 ? "t-rose" : "t-ink", 11.5, 'font-weight="800" direction="ltr"')}</g>`).join("")}
      <g ${an("pop", 0.6)}><circle cx="${g}" cy="126" r="36" class="f-acc"/><g class="an turn" style="--d:0.9s;transform-box:fill-box;transform-origin:center">${[0, 45, 90, 135].map((r) => `<rect x="${g - 4}" y="${126 - 24}" width="8" height="48" rx="3" class="f-white" transform="rotate(${r} ${g} 126)"/>`).join("")}</g><circle cx="${g}" cy="126" r="13" class="f-acc"/></g>
      <g ${an("fade", 0.7)}>${txt(g, 186, tr("شيل المسافات · حروف كبيرة", "trim · upper case"), "t-acc", 11.5, b8)}</g>
      ${[0, 1, 2].map((i) => `<path ${an("draw", 0.5 + i * 0.1, "s-ink3")} pathLength="1" d="M${a + d * 66} ${74 + i * 52} L ${g - d * 40} 126" stroke-width="1.8" fill="none"/><path ${an("draw", 1.0 + i * 0.1, "s-mint")} pathLength="1" d="M${g + d * 40} 126 L ${b - d * 66} ${74 + i * 52}" stroke-width="1.8" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      ${O.map((s, i) => `<g ${an("pop", 1.2 + i * 0.12)}>${box(b, 74 + i * 52, 128, 38, "f-mint-soft s-mint", 1.5)}${txt(b, 79 + i * 52, s, "t-mint", 11.5, 'font-weight="800" direction="ltr"')}</g>`).join("")}
      ${pill(240, 250, 300, 34, tr("السجل: اتظبط ٤ أرقام", "log: 4 numbers normalised"), "f-s2 s-line2", "t-ink", 11.5, 1.6)}
      ${cap(tr("نفس فخ «L04 »… في ملف تاني", "the same trap as “L04 ”… in another file"), 1.8, 300)}`;
    },
    xm_unmatched: () => {
      const a = mx(130), b = mx(354);
      return `<g ${an("rise", 0.05)}>${box(240, 98, 420, 118, "f-rose-soft s-rose", 2.5)}${txt(240, 56, "Unmatched_Receipts", "t-rose", 12.5, 'font-weight="800" direction="ltr"')}</g>
      ${rowL(240, 84, ["GRN-26-9001", "PO-26-0299", "CBL-PWR", "400"], 96, 24, "f-s1", "t-ink", 9.5, 0.3)}${rowL(240, 116, ["GRN-26-9002", "PO-26-0201", "RC-02", "300"], 96, 24, "f-s1", "t-ink", 9.5, 0.45)}
      <g ${an("fade", 0.7)}>${txt(240, 146, tr("أمر مش موجود · خامة مش على أمرها", "no such order · material not on its order"), "t-rose", 11, b8)}</g>
      <g ${an("pop", 1.0)}>${box(a, 214, 190, 46, "f-s2 s-line2", 1.5)}${txt(a + dirx() * 10, 219, tr("نضيفه سطر جديد؟", "add it as a new line?"), "t-ink3", 11.5, b8)}</g>${check(a - dirx() * 80, 214, 1.1, false)}
      <g ${an("pop", 1.3)}>${box(b, 214, 190, 46, "f-mint-soft s-mint", 1.5)}${txt(b, 219, tr("المخازن تراجع رقم الأمر", "the stores check the number"), "t-mint", 11, b8)}</g>${check(b + dirx() * 80, 214, 1.4)}
      ${cap(tr("اللي مالوش سطر… ليه سؤال", "what has no line… has a question"), 1.6, 290)}`;
    },
    xm_over: () => {
      const R = [["LED-32", 100, 110], ["RC-01", 700, 770]], d = dirx();
      return `${R.map(([m, o, g], i) => { const y = 70 + i * 92, w0 = 220, w1 = Math.round((g / o) * w0);
        return `<g ${an("fade", 0.05 + i * 0.3)}>${txt(mx(70), y + 18, m, "t-ink", 12, 'font-weight="800" direction="ltr"')}</g>
        ${grow(130, y, w0, 16, "f-acc-soft", 0.2 + i * 0.3)}${grow(130, y + 22, w1, 16, "f-mint", 0.35 + i * 0.3)}<rect ${an("pop", 0.7 + i * 0.3, "f-rose")} x="${mx(130 + w0) - (ar() ? w1 - w0 : 0)}" y="${y + 22}" width="${w1 - w0}" height="16"/>
        <g ${an("fade", 0.6 + i * 0.3)}>${txt(mx(130 + w1 + 54), y + 13, tr("طلبنا ", "ordered ") + digits(o), "t-ink3", 10.5, b8)}${txt(mx(130 + w1 + 54), y + 35, tr("وصل ", "received ") + digits(g), "t-ink", 10.5, b8)}${txt(mx(130 + w0 + 12), y + 62, "+" + (g - o), "t-rose", 12, 'font-weight="800" direction="ltr"')}</g>`; }).join("")}
      ${pill(240, 262, 340, 36, tr("القرار للمشتريات: يترجع ولا يتعدّل الأمر", "purchasing decides: return, or amend the order"), "f-s1 s-ink2", "t-ink", 11.5, 1.2)}
      ${cap(tr("الزيادة… فرق برضه", "an excess… is a difference too"), 1.4, 304)}`;
    },
    xm_check: () => {
      const X = rowX(3, 130, 30, 240);
      const B = [[n_("23,942"), tr("كل الاستلامات", "all receipts"), "f-s1 s-acc", "t-acc"], [n_("23,242"), tr("على السطور", "on the lines"), "f-mint-soft s-mint", "t-mint"], [n_("700"), "Unmatched", "f-rose-soft s-rose", "t-rose"]];
      return `${B.map(([v, s, cls, tc], i) => `<g ${an("pop", 0.1 + i * 0.25)}>${box(X(i), 110, 130, 90, cls)}${txt(X(i), 108, v, "t-ink", 17, b8)}${txt(X(i), 134, s, tc, 11, i === 2 ? 'font-weight="800" direction="ltr"' : b8)}</g>`).join("")}
      <g ${an("fade", 0.4)}>${txt((X(0) + X(1)) / 2, 117, "=", "t-ink2", 22, b8)}</g><g ${an("fade", 0.65)}>${txt((X(1) + X(2)) / 2, 117, "+", "t-ink2", 22, b8)}</g>
      ${check(240, 190, 1.0)}
      ${pill(240, 236, 320, 36, tr("مش متساويين ← توقف وتكتب الفرق", "not equal → stop and write the gap"), "f-s2 s-line2", "t-ink", 11.5, 1.2)}
      ${cap(tr("الكل = المتطابق + اللي مالوش", "the whole = the matched + the unmatched"), 1.5, 290)}`;
    },
    xm_open: () => {
      const S = [["Boards", 538180], ["Packaging", 37755], ["Plastics", 18000], ["Printing", 5022]];
      return `<g ${an("fade", 0.05)}>${txt(240, 34, tr("قيمة المتبقي لكل مورّد", "open value per supplier"), "t-ink2", 12, b8)}</g>
      ${S.map(([s, v], i) => { const y = 56 + i * 40, w = Math.max(4, Math.round((v / 538180) * 220));
        return `<g ${an("fade", 0.1 + i * 0.12)}>${txt(mx(76), y + 13, s, i ? "t-ink" : "t-rose", 11.5, 'font-weight="800" direction="ltr"')}</g>${grow(140, y, w, 18, i ? "f-acc" : "f-rose", 0.2 + i * 0.12)}<g ${an("fade", 0.5 + i * 0.12)}>${txt(mx(140 + w + 44), y + 13, n_(v.toLocaleString("en-US")), "t-ink2", 10.5, b8)}</g>`; }).join("")}
      ${pill(240, 232, 330, 38, "MB-SM · 400 · 312,000", "f-rose-soft s-rose", "t-rose", 13, 1.1)}
      <g ${an("fade", 1.3)}>${txt(240, 268, tr("ما وصلش منه ولا واحدة ← أول مكالمة", "not one arrived → the first call"), "t-ink2", 11.5, b8)}</g>
      ${cap(tr("الملخص بيقولك تتصل بمين الأول", "the summary says whom to call first"), 1.5, 300)}`;
    },
    xm_cliff: () => {
      const p = mx(92), tv = mx(232), d = dirx(), q = mx(390);
      const M = ["PNL", "MB", "RC-02", "CTN", "SCR"];
      return `${page(p, 132, 120, 150, "Plan_Apr", [80, 60, 86, 70, 54], 0.05)}<g ${an("fade", 0.3)}>${txt(p, 230, "11,150", "t-acc", 14, 'font-weight="800" direction="ltr"')}</g>
      <path ${an("draw", 0.5, "s-acc")} pathLength="1" d="M${p + d * 66} 132 H ${tv - d * 58}" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 0.7)}><rect x="${tv - 50}" y="96" width="100" height="64" rx="6" class="f-ink2"/><rect x="${tv - 43}" y="103" width="86" height="50" rx="3" class="f-acc-soft"/><path d="M${tv - 18} 176 l18 -16 l18 16z" class="f-ink3"/></g>
      ${M.map((s, i) => `<path ${an("draw", 1.0 + i * 0.08, "s-ink3")} pathLength="1" d="M${tv + d * 54} 128 L ${q - d * 52} ${56 + i * 42}" stroke-width="1.6" fill="none"/>${pill(q, 56 + i * 42, 96, 30, s + " ?", "f-s1 s-line2", "t-ink", 11, 1.1 + i * 0.1)}`).join("")}
      ${cap(tr("الدرس الجاي: من الخطة لطلب الخامات", "next lesson: from the plan to the materials order"), 1.7, 290)}`;
    },

    /* ----- tool five: from the plan to the materials order (data/needs-story.js) ----- */
    xn_scene: () => {
      const p = mx(96), tv = mx(250), c = mx(400), d = dirx();
      const M = ["PNL", "MB", "PSU", "LED", "RC", "CTN", "STD", "SCR-M3", "SCR-M4", "CBL", "MAN"];
      return `${page(p, 118, 128, 150, "Plan_Apr", [84, 62, 90, 70, 56], 0.05)}<g ${an("fade", 0.3)}>${txt(p, 214, "11,150", "t-acc", 15, 'font-weight="800" direction="ltr"')}${txt(p, 234, tr("جهاز · ١٣ موديل", "TVs · 13 models"), "t-ink3", 11, bold)}</g>
      <g ${an("pop", 0.5)}><rect x="${tv - 50}" y="62" width="100" height="64" rx="6" class="f-ink2"/><rect x="${tv - 43}" y="69" width="86" height="50" rx="3" class="f-acc-soft"/><path d="M${tv - 18} 142 l18 -16 l18 16z" class="f-ink3"/></g>
      ${M.map((s, i) => { const x = tv + (i % 4 - 1.5) * 52 * d, y = 176 + Math.floor(i / 4) * 30; return pill(x, y, 48, 24, s, "f-s1 s-line2", "t-ink2", 8.5, 0.7 + i * 0.05); }).join("")}
      <g ${an("pop", 1.3)}><circle cx="${c}" cy="110" r="26" class="f-s1 s-rose" stroke-width="3.5"/><path d="M${c} 110 v-15 M${c} 110 l10 7" class="s-rose" stroke-width="3.5" stroke-linecap="round"/>${txt(c, 162, tr("يومين", "2 days"), "t-rose", 12.5, b8)}</g>
      ${cap(tr("كل جهاز محتاج ١١ خامة… نطلب قد إيه؟", "each TV needs 11 materials… how much to order?"), 1.6, 290)}`;
    },
    xn_files: () => {
      const X = rowX(4, 104, 10, 240);
      const F = [["Plan", tr("هنعمل كام؟", "how many TVs?"), "f-acc-soft s-acc", "t-acc"], ["BOM", tr("الجهاز محتاج إيه؟", "what is in a TV?"), "f-mint-soft s-mint", "t-mint"], ["Materials", tr("من مين وبالعبوة كام؟", "who, what pack?"), "f-amber-soft s-amber", "t-amber"], ["Stock", tr("عندنا كام؟", "in stock?"), "f-s2 s-line2", "t-ink2"]];
      return `${F.map(([f, q, cls, tc], i) => `<g ${an("rise", 0.1 + i * 0.2)}>${box(X(i), 112, 104, 120, cls)}${xl(X(i), 84, 0.8)}${txt(X(i), 128, f, tc, 12.5, 'font-weight="800" direction="ltr"')}${txt(X(i), 152, q, "t-ink2", 9.5, b8)}</g>`).join("")}
      <g ${an("fade", 1.0)}>${[0, 1, 2].map((i) => `<path d="M${(X(i) + X(i + 1)) / 2} 182 V 206" class="s-ink3" stroke-width="2"/>`).join("")}<path d="M${X(0)} 206 H ${X(3)}" class="s-ink3" stroke-width="2"/></g>
      ${pill(240, 236, 220, 38, "Material_Needs_Apr.xlsx", "f-mint", "t-white", 11.5, 1.2)}
      ${cap(tr("أربع أسئلة… وأربع ملفات", "four questions… four files"), 1.5, 290)}`;
    },
    xn_steps: () => {
      const X = rowX(5, 80, 10, 240), d = dirx();
      const S = ["Explosion", "Gross", "Net", "OrderQty", "Check"];
      return `${S.map((s, i) => `<g ${an("pop", 0.1 + i * 0.2)}>${box(X(i), 110, 80, 76, i === 4 ? "f-mint-soft s-mint" : "f-acc-soft s-acc")}<circle cx="${X(i)}" cy="88" r="12" class="${i === 4 ? "f-mint" : "f-acc"}"/>${txt(X(i), 92.5, digits(i + 1), "t-white", 11, b8)}${txt(X(i), 126, s, i === 4 ? "t-mint" : "t-acc", 10.5, 'font-weight="800" direction="ltr"')}</g>${i < 4 ? `<path ${an("draw", 0.3 + i * 0.2, "s-ink3")} pathLength="1" d="M${X(i) + d * 42} 110 H ${X(i + 1) - d * 44}" stroke-width="2" fill="none" marker-end="url(#aih-arrow)"/>` : ""}`).join("")}
      ${S.map((_, i) => `<g ${an("fade", 1.2 + i * 0.08)}><rect x="${X(i) - 26}" y="168" width="52" height="34" rx="4" class="f-s1 s-line2" stroke-width="1.5"/><rect x="${X(i) - 20}" y="176" width="40" height="5" rx="2" class="f-s3"/><rect x="${X(i) - 20}" y="186" width="28" height="5" rx="2" class="f-s3"/></g>`).join("")}
      <g ${an("fade", 1.6)}>${txt(240, 228, tr("كل خطوة شيت لوحده", "each step a sheet of its own"), "t-ink2", 12, b8)}</g>
      ${cap(tr("خمس خطوات… خمس فرص تمسك الغلط", "five steps… five chances to catch a mistake"), 1.8, 290)}`;
    },
    xn_explode: () => {
      const t = mx(200), r = mx(408);
      const R = [["M108", "PNL-55", "1100 × 1", "1,100"], ["M108", "MB-4K", "1100 × 1", "1,100"], ["M108", "SCR-M3", "1100 × 18", "19,800"], ["M108", "SCR-M4", "1100 × 8", "8,800"]];
      return `${rowL(t, 56, ["ModelCode", "MaterialCode", "Plan × Qty", "Need"], 84, 26, "f-acc-soft", "t-acc", 9.5, 0.05)}
      ${R.map((x, i) => rowL(t, 88 + i * 30, x, 84, 24, i === 2 ? ["f-s1", "f-amber-soft", "f-s1", "f-amber-soft"] : "f-s1", i === 2 ? ["t-ink", "t-amber", "t-ink", "t-amber"] : "t-ink", 9.5, 0.25 + i * 0.12)).join("")}
      <g ${an("fade", 0.8)}>${txt(t, 222, tr("… و٧ خامات تانية لـ M108", "… and 7 more materials for M108"), "t-ink3", 11, b8)}</g>
      <g ${an("pop", 1.0)}>${box(r, 128, 112, 110, "f-mint-soft s-mint")}${txt(r, 104, "12 × 11", "t-ink", 14, 'font-weight="800" direction="ltr"')}${txt(r, 132, "=", "t-ink2", 16, b8)}${txt(r, 158, tr("١٣٢ سطر", "132 rows"), "t-mint", 13, b8)}</g>
      ${cap(tr("عدد السطور… أول اختبار", "the row count… the first test"), 1.4, 290)}`;
    },
    xn_nobom: () => {
      const a = mx(130), b = mx(358), d = dirx();
      return `${rowL(a, 60, ["ModelCode", "PlannedQty"], 96, 26, "f-acc-soft", "t-acc", 10, 0.05)}
      ${[["M112", "150", 0], ["M113", "600", 1]].map(([m, q, on], i) => rowL(a, 92 + i * 30, [m, q], 96, 24, on ? "f-rose-soft" : "f-s1", on ? "t-rose" : "t-ink", 10, 0.2 + i * 0.12)).join("")}
      <g ${an("rise", 0.5)}>${box(b, 90, 170, 76, "f-s2 s-line2")}${txt(b, 70, "BOM.xlsx", "t-ink2", 12, 'font-weight="800" direction="ltr"')}${txt(b, 96, "M101 … M112", "t-ink", 12, 'font-weight="700" direction="ltr"')}${txt(b, 116, tr("مفيش M113", "no M113"), "t-rose", 11.5, b8)}</g>
      <g ${an("pop", 0.9)}>${stopSign(a, 176, 24)}</g><g ${an("fade", 1.0)}>${txt(a, 222, "M113: 600 planned, no BOM", "t-rose", 10.5, 'font-weight="800" direction="ltr" font-family="var(--font-mono)"')}</g>
      ${pill(b, 186, 170, 40, "Not_Planned", "f-amber-soft s-amber", "t-amber", 12.5, 1.3)}
      ${pill(240, 262, 330, 34, tr("الهندسة تبعت الـ BOM… وباقي الطلب يكمّل", "engineering sends the BOM… the rest goes ahead"), "f-mint-soft s-mint", "t-mint", 11, 1.5)}
      ${cap(tr("اللي مالوش BOM… مالوش طلب", "no BOM… no order"), 1.7, 300)}`;
    },
    xn_gross: () => {
      const a = mx(120), b = mx(352), d = dirx();
      const M = ["M101", "M104", "M108", "M110", "M112"];
      return `<g ${an("rise", 0.05)}>${box(a, 90, 170, 70, "f-acc-soft s-acc")}${txt(a, 82, "PNL-55", "t-acc", 13, 'font-weight="800" direction="ltr"')}${txt(a, 104, tr("من M108 بس", "from M108 only"), "t-ink2", 11, b8)}</g>
      ${pill(a, 160, 120, 36, "1,100", "f-s1 s-acc", "t-acc", 14, 0.4)}
      ${M.map((m, i) => `${pill(b - d * 86, 62 + i * 34, 64, 26, m, "f-s1 s-line2", "t-ink2", 9.5, 0.5 + i * 0.08)}<path ${an("draw", 0.9 + i * 0.06, "s-amber")} pathLength="1" d="M${b - d * 52} ${62 + i * 34} L ${b + d * 30} 130" stroke-width="1.6" fill="none"/>`).join("")}
      <g ${an("fade", 1.0)}>${txt(b - d * 86, 238, tr("+ ٧ موديلات", "+ 7 more"), "t-ink3", 10.5, b8)}</g>
      <g ${an("pop", 1.3)}>${box(b + d * 66, 130, 92, 64, "f-amber-soft s-amber")}${txt(b + d * 66, 124, "SCR-M3", "t-amber", 11, 'font-weight="800" direction="ltr"')}${txt(b + d * 66, 144, "160,700", "t-ink", 11.5, 'font-weight="800" direction="ltr"')}</g>
      ${cap(tr("خامة بسيطة… وخامة مشتركة بين ١٢ موديل", "a simple material… and one shared by 12 models"), 1.6, 290)}`;
    },
    xn_units: () => {
      const a = mx(130), b = mx(352), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(a, 84, 180, 72, "f-s1 s-line2")}${txt(a, 66, "Stock.xlsx", "t-ink2", 11.5, 'font-weight="800" direction="ltr"')}${txt(a, 90, "SCR-M3 · 88", "t-ink", 13, 'font-weight="800" direction="ltr"')}${txt(a, 110, "box of 1000", "t-rose", 11, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("rise", 0.3)}>${box(b, 84, 180, 72, "f-s1 s-line2")}${txt(b, 66, "BOM · Materials", "t-ink2", 11.5, 'font-weight="800" direction="ltr"')}${txt(b, 90, "160,700", "t-ink", 13, 'font-weight="800" direction="ltr"')}${txt(b, 110, "pcs", "t-mint", 11, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("pop", 0.6)}>${txt(240, 92, "≠", "t-rose", 26, b8)}</g>
      <g ${an("pop", 0.9)}>${box(a, 186, 180, 50, "f-rose-soft s-rose", 1.5)}${txt(a, 182, tr("من غير تحويل", "without converting"), "t-rose", 11, b8)}${txt(a, 200, tr("طلب ١٦١٬٠٠٠", "order 161,000"), "t-rose", 12, b8)}</g>${check(a - d * 98, 186, 1.0, false)}
      <g ${an("pop", 1.2)}>${box(b, 186, 180, 50, "f-mint-soft s-mint", 1.5)}${txt(b, 182, tr("٨٨ علبة = ٨٨٬٠٠٠", "88 boxes = 88,000"), "t-mint", 11, b8)}${txt(b, 200, tr("طلب ٧٣٬٠٠٠", "order 73,000"), "t-mint", 12, b8)}</g>${check(b + d * 98, 186, 1.3)}
      ${pill(240, 252, 330, 34, tr("قبل أي طرح: الوحدات تتطابق", "before any subtraction: units must match"), "f-s2 s-line2", "t-ink", 11.5, 1.5)}
      ${cap(tr("٨٨… علبة ولا قطعة؟", "88… boxes or pieces?"), 1.7, 300)}`;
    },
    xn_net: () => {
      const R = [["PNL-55", "1,100", "380", "0", "720", 0], ["PSU-S", "7,300", "5,340", "2,650", "0", 1]];
      return `${rowL(240, 58, ["Material", "Gross", "OnHand", "OnOrder", "Net"], 84, 28, "f-acc-soft", "t-acc", 10, 0.05)}
      ${R.map(([m, g, o, w, nn, z], i) => rowL(240, 94 + i * 34, [m, g, "− " + o, "− " + w, nn], 84, 28, ["f-s1", "f-s1", "f-s1", "f-s1", z ? "f-s2" : "f-mint-soft"], ["t-ink", "t-ink", "t-ink2", "t-ink2", z ? "t-ink3" : "t-mint"], 10, 0.3 + i * 0.2)).join("")}
      <g ${an("fade", 0.9)}>${txt(240, 166, tr("PSU-S: ٧٬٣٠٠ − ٥٬٣٤٠ − ٢٬٦٥٠ سالب ← صفر، مفيش طلب", "PSU-S: 7,300 − 5,340 − 2,650 is negative → zero, no order"), "t-ink2", 11, b8)}</g>
      ${pill(240, 214, 300, 38, "Net = Gross − OnHand − OnOrder", "f-mint", "t-white", 12, 1.2)}
      <g ${an("fade", 1.4)}>${txt(240, 254, tr("٣ خامات عندنا منها كفاية", "3 materials already covered"), "t-ink3", 11.5, b8)}</g>
      ${cap(tr("اللي عندنا + اللي جاي… قبل ما نطلب", "what we have + what's coming… before we order"), 1.6, 296)}`;
    },
    xn_pack: () => {
      const R = [["SCR-M3", "72,700", "1,000", "73,000"], ["MB-SM", "1,010", "50", "1,050"], ["PNL-55", "720", "10", "720"]];
      return `${rowL(240, 58, ["Material", "Net", "PackSize", "OrderQty"], 96, 28, "f-acc-soft", "t-acc", 10, 0.05)}
      ${R.map((r, i) => rowL(240, 94 + i * 32, r, 96, 26, ["f-s1", "f-s1", "f-s1", "f-mint-soft"], ["t-ink", "t-ink", "t-ink2", "t-mint"], 10, 0.3 + i * 0.15)).join("")}
      <g ${an("pop", 1.0)}>${box(mx(140), 222, 200, 50, "f-rose-soft s-rose", 1.5)}${txt(mx(140), 218, tr("للأقرب: ١٬٠١٠ ← ١٬٠٠٠", "nearest: 1,010 → 1,000"), "t-rose", 11, b8)}${txt(mx(140), 236, tr("١٠ أجهزة واقفة", "10 TVs held up"), "t-ink2", 10.5, bold)}</g>
      <g ${an("pop", 1.2)}>${box(mx(352), 222, 190, 50, "f-mint-soft s-mint", 1.5)}${txt(mx(352), 218, tr("لفوق: ١٬٠١٠ ← ١٬٠٥٠", "up: 1,010 → 1,050"), "t-mint", 11, b8)}${txt(mx(352), 236, tr("الخط شغال", "the line runs"), "t-ink2", 10.5, bold)}</g>
      ${cap(tr("«لفوق»… كلمة بتحمي الخط", "“up”… one word that protects the line"), 1.5, 290)}`;
    },
    xn_check: () => {
      const a = mx(118), b = mx(352), d = dirx();
      const L = ["1,100 − 380 − 0", "= 720", "pack 10 → 720"];
      return `<g ${an("rise", 0.05)}>${page(a, 128, 170, 176, tr("بإيدك · PNL-55", "by hand · PNL-55"), [], 0.05)}</g>
      ${L.map((s, i) => `<g ${an("fade", 0.3 + i * 0.2)}>${txt(a, 110 + i * 30, s, i === 1 ? "t-mint" : "t-ink", 12.5, 'font-weight="800" direction="ltr"')}</g>`).join("")}
      <g ${an("rise", 0.7)}>${box(b, 128, 196, 176, "f-s1 s-acc")}${txt(b, 54, "Check", "t-acc", 12.5, 'font-weight="800" direction="ltr"')}</g>
      ${[["Plan", "11,150"], ["Explosion", "132"], [tr("للطلب", "to order"), "29"], ["Value", "26,825,700"]].map(([k, v], i) => `<g ${an("fade", 0.9 + i * 0.15)}>${txt(b - d * 44, 88 + i * 34, k, "t-ink2", 10.5, b8)}${txt(b + d * 40, 88 + i * 34, v, "t-ink", 11, 'font-weight="800" direction="ltr"')}</g>`).join("")}
      ${check(240, 128, 1.6)}
      ${cap(tr("رقم بإيدك… قبل رقم الأداة", "your figure… before the tool's"), 1.7, 290)}`;
    },
    xn_review: () => {
      const S = [["PNL", 18753000, "30–45"], [tr("الباقي", "the rest"), 8072700, "7–21"]], d = dirx();
      return `<g ${an("fade", 0.05)}>${txt(240, 34, tr("٢٩ خامة للطلب · ٢٦٬٨٢٥٬٧٠٠ جنيه", "29 materials to order · EGP 26,825,700"), "t-ink", 12.5, b8)}</g>
      ${S.map(([s, v, lt], i) => { const y = 62 + i * 46, w = Math.round((v / 18753000) * 230);
        return `<g ${an("fade", 0.2 + i * 0.15)}>${txt(mx(78), y + 14, s, i ? "t-ink2" : "t-acc", 12, i ? b8 : 'font-weight="800" direction="ltr"')}</g>${grow(130, y, w, 22, i ? "f-s3" : "f-acc", 0.3 + i * 0.15)}<g ${an("fade", 0.6 + i * 0.15)}>${txt(mx(130 + w + 60), y + 15, n_(v.toLocaleString("en-US")), "t-ink2", 10.5, b8)}</g>`; }).join("")}
      <g ${an("fade", 0.9)}>${txt(240, 168, tr("الشاشات ≈ ٧٠٪ · توريد من ٣٠ لـ ٤٥ يوم ← تتطلب الأول", "panels ≈ 70% · 30–45 days → ordered first"), "t-acc", 11, b8)}</g>
      <g ${an("rise", 1.1)}>${person(mx(120), 252, 1.0, "f-acc")}</g>
      ${pill(mx(300), 222, 270, 36, tr("المشتريات بتراجع… وبعدين أوامر شراء", "purchasing reviews… then purchase orders"), "f-mint-soft s-mint", "t-mint", 11, 1.2)}
      ${pill(mx(300), 264, 270, 32, "Not_Planned: M113", "f-amber-soft s-amber", "t-amber", 11, 1.4)}
      ${cap(tr("الأداة بتحسب… والمشتريات بتقرر", "the tool calculates… purchasing decides"), 1.6, 304)}`;
    },
    xn_cliff: () => {
      const X = rowX(5, 80, 8, 240), t = mx(186), s = mx(418);
      const T = [tr("تحت بعض", "stack"), tr("ربط", "lookup"), tr("تقرير", "report"), tr("مطابقة", "match"), tr("خامات", "materials")];
      return `${T.map((x, i) => pill(X(i), 50, 80, 34, x, "f-mint-soft s-mint", "t-mint", 11, 0.1 + i * 0.12)).join("")}
      ${term(t, 168, 300, 132, ["Week_14.xlsx  read  99 rows", "Week_15.xlsx  read  104 rows", "STOP  Week_16.xlsx:", "  sheet Production not found"], 0.9, 10.5, (i) => (i >= 2 ? "t-rose" : "t-crt"))}
      <g ${an("pop", 1.8)}>${stopSign(s, 150, 26)}</g><g ${an("fade", 2.0)}>${txt(s, 204, tr("أبريل", "April"), "t-rose", 12, b8)}</g>
      ${cap(tr("الدرس الجاي: لما الأداة توقف", "next lesson: when the tool stops"), 2.1, 296)}`;
    },

    /* ----- when the tool stops (data/run-story.js) ----- */
    xt_stop: () => {
      const t = mx(186), a = mx(410), d = dirx();
      return `${term(t, 108, 330, 132, ["Week_14.xlsx  read  99 rows", "Week_15.xlsx  read  104 rows", "STOP  Week_16.xlsx:", "  sheet Production not found"], 0.05, 11, (i) => (i >= 2 ? "t-rose" : "t-crt"))}
      ${pill(mx(126), 222, 200, 40, tr("وقفت برسالة = معلومة", "a clear stop = information"), "f-mint-soft s-mint", "t-mint", 11, 1.0)}${check(mx(126), 196, 1.2)}
      ${pill(mx(354), 222, 200, 40, tr("كمّلت بصمت = خطر", "a silent carry-on = danger"), "f-rose-soft s-rose", "t-rose", 11, 1.3)}${check(mx(354), 196, 1.5, false)}
      ${cap(tr("الأداة ما اتكسرتش… الأداة وقفت", "the tool isn't broken… it stopped"), 1.7, 290)}`;
    },
    xt_kinds: () => {
      const X = rowX(3, 136, 12, 240), d = dirx();
      const K = [[tr("الملف", "the file"), tr("اسم شيت أو عمود", "a sheet or column"), "f-acc-soft s-acc", "t-acc"], [tr("الجهاز", "the laptop"), tr("disabled · حروف غريبة", "disabled · odd letters"), "f-amber-soft s-amber", "t-amber"], [tr("الكود", "the code"), tr("آخر احتمال", "the last suspect"), "f-s2 s-line2", "t-ink2"]];
      return `${K.map(([h, s, cls, tc], i) => `<g ${an("pop", 0.1 + i * 0.3)}>${box(X(i), 120, 136, 120, cls)}<circle cx="${X(i)}" cy="80" r="15" class="${i === 2 ? "f-ink3" : "f-acc"}"/>${txt(X(i), 85, digits(i + 1), "t-white", 13, b8)}${txt(X(i), 124, h, tc, 14, b8)}${txt(X(i), 150, s, "t-ink3", 10.5, bold)}</g>`).join("")}
      ${[0, 1].map((i) => `<path ${an("draw", 0.5 + i * 0.3, "s-ink3")} pathLength="1" d="M${X(i) + d * 70} 120 H ${X(i + 1) - d * 72}" stroke-width="2" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      ${pill(240, 236, 330, 36, tr("أغلب الوقفات: من الملف أو الجهاز", "most stops: the file or the laptop"), "f-s1 s-ink2", "t-ink", 12, 1.2)}
      ${cap(tr("قبل ما تصلّح… اعرف بتصلّح إيه", "before fixing… know what you're fixing"), 1.4, 294)}`;
    },
    xt_policy: () => {
      const d = dirx();
      return `${term(240, 62, 420, 52, ["running scripts is disabled on this system"], 0.05, 12, () => "t-rose")}
      ${pill(mx(110), 146, 170, 44, tr("١. شغّل من ‎.bat", "1. run from the .bat"), "f-acc-soft s-acc", "t-acc", 12, 0.5)}
      <path ${an("draw", 0.7, "s-ink3")} pathLength="1" d="M${mx(110) + d * 90} 146 H ${mx(250) - d * 50}" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 0.9)}><rect x="${mx(250) - 16}" y="132" width="32" height="26" rx="4" class="f-amber"/><path d="M${mx(250) - 10} 132 v-9 a10 10 0 0 1 20 0 v9" class="s-amber" stroke-width="3.5" fill="none"/>${txt(mx(250), 186, tr("لسه مقفول؟", "still locked?"), "t-amber", 11.5, b8)}</g>
      <path ${an("draw", 1.1, "s-ink3")} pathLength="1" d="M${mx(250) + d * 30} 146 H ${mx(386) - d * 66}" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>
      ${pill(mx(386), 146, 124, 44, tr("٢. IT أو ماكرو", "2. IT or a macro"), "f-mint-soft s-mint", "t-mint", 12, 1.3)}
      ${pill(240, 236, 300, 36, tr("ما تتحايلش على إعدادات الشركة", "never bypass company settings"), "f-rose-soft s-rose", "t-rose", 12, 1.5)}
      ${cap(tr("«disabled» = إعداد… مش غلطة في الكود", "“disabled” = a setting… not a code error"), 1.7, 294)}`;
    },
    xt_encoding: () => {
      const d = dirx();
      return `${term(240, 62, 420, 52, ["Ø§Ù©Ù§Ø© Ø§Ù©Ù§"], 0.05, 12.5, () => "t-rose")}
      <path ${an("draw", 0.5, "s-ink3")} pathLength="1" d="M240 92 V 118" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("rise", 0.7)}>${box(240, 152, 300, 56, "f-s1 s-acc")}${txt(240, 146, tr("المفكرة ← حفظ باسم ← الترميز", "Notepad → Save As → Encoding"), "t-ink", 11.5, b8)}${txt(240, 166, "UTF-8 with BOM", "t-acc", 12.5, 'font-weight="800" direction="ltr"')}</g>
      <path ${an("draw", 1.0, "s-mint")} pathLength="1" d="M240 182 V 206" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.2)}>${box(240, 236, 220, 44, "f-mint")}${txt(240, 243, "الملف اتقرا", "t-white", 16, b8)}</g>${check(240 + d * 130, 236, 1.4)}
      ${cap(tr("دقيقة واحدة… ولا سطر كود اتغيّر", "one minute… not a line of code changed"), 1.5, 290)}`;
    },
    xt_locked: () => {
      const t = mx(178), f = mx(410), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(t, 140, 300, 196, "f-s1 s-line2")}<rect x="${t - 150}" y="42" width="300" height="28" rx="12" class="f-s2"/>${txt(t, 61, tr("إدارة المهام", "Task Manager"), "t-ink2", 11.5, b8)}</g>
      ${[0, 1, 2].map((i) => `<g ${an("fade", 0.3 + i * 0.15)}>${xl(t - d * 110, 98 + i * 40, 0.6)}${mono(ar() ? t - 30 : t - 82, 103 + i * 40, "EXCEL.EXE", "t-ink", 12, b8)}${txt(t + d * 84, 103 + i * 40, tr("من غير شباك", "no window"), "t-ink3", 10.5, bold)}</g>`).join("")}
      ${pill(t, 220, 140, 32, tr("إنهاء المهمة", "End task"), "f-acc", "t-white", 12, 0.9)}
      <g ${an("rise", 1.1)}>${fileIcon(f, 104, "s-amber")}${txt(f, 140, "Week_14.xlsx", "t-ink", 10.5, 'font-weight="700" direction="ltr"')}${txt(f, 158, tr("مفتوح قدامك", "open for you"), "t-amber", 11, b8)}${txt(f, 176, tr("= مقفول عليها", "= locked for it"), "t-amber", 11, b8)}</g>
      ${cap(tr("اقفل الملفات… واتأكد إن مفيش إكسل مستخبي", "close the files… and check no Excel is hiding"), 1.4, 290)}`;
    },
    xt_sheet: () => {
      const a = mx(126), b = mx(354), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(a, 96, 190, 84, "f-acc-soft s-acc")}${txt(a, 80, tr("الأداة بتدوّر على", "the tool looks for"), "t-acc", 11.5, b8)}${txt(a, 116, "Production", "t-ink", 17, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("rise", 0.3)}>${box(b, 96, 190, 84, "f-rose-soft s-rose")}${txt(b, 80, tr("الشيت في Week_16", "the sheet in Week_16"), "t-rose", 11.5, b8)}${txt(b, 116, "Sheet1", "t-ink", 17, 'font-weight="800" direction="ltr"')}</g>
      <g ${an("pop", 0.6)}>${txt(240, 106, "≠", "t-rose", 26, b8)}</g>
      <g ${an("rise", 0.9)}>${box(240, 196, 330, 52, "f-mint-soft s-mint")}${txt(240, 190, tr("شيت واحد بس؟ اقراه مهما كان اسمه", "only one sheet? read it whatever its name"), "t-mint", 12, b8)}${txt(240, 210, tr("ويتسجّل في السجل", "and log it"), "t-ink2", 11, bold)}</g>${check(240 + d * 180, 196, 1.2)}
      ${cap(tr("نفس البيانات… باسم تاني", "the same data… under another name"), 1.4, 270)}`;
    },
    xt_report: () => {
      const c = mx(340), X = mx(112), d = dirx();
      const I = ar() ? ["الرسالة بالحرف", "آخر ١٠ سطور من السجل", "اسم الملف اللي وقف عنده", "نسخة PowerShell"] : ["the message, word for word", "last 10 log lines", "the file it stopped at", "PowerShell version"];
      return `${I.map((s, i) => `${pill(X, 64 + i * 50, 196, 38, s, "f-acc-soft s-acc", "t-acc", 11, 0.1 + i * 0.2)}<path ${an("draw", 0.3 + i * 0.2, "s-acc")} pathLength="1" d="M${X + d * 100} ${64 + i * 50} L ${c - d * 100} 140" stroke-width="1.8" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      <g ${an("pop", 1.2)}>${bubble(c, 140, 196, 110, "f-s1 s-ink2", ar())}${txt(c, 122, tr("نفس المحادثة", "the same chat"), "t-ink", 12.5, b8)}${txt(c, 144, tr("«قولّي في ٣ سطور", "“tell me in 3 lines"), "t-ink2", 11, bold)}${txt(c, 162, tr("المشكلة فين الأول»", "where the problem is”"), "t-ink2", 11, bold)}</g>
      ${cap(tr("النموذج بيصلّح اللي بيشوفه… فورّيه كويس", "the model fixes what it sees… so show it well"), 1.5, 292)}`;
    },
    xt_versions: () => {
      const X = rowX(3, 110, 40, 240), d = dirx();
      const V = [["stack_tool.ps1", "v1", "s-ink3"], ["stack_tool_v2.ps1", "v2", "s-mint"], ["stack_tool_v3.ps1", "v3", "s-acc"]];
      return `${V.map(([f, v, cls], i) => `<g ${an("pop", 0.1 + i * 0.3)}>${fileIcon(X(i), 96, cls)}${txt(X(i), 140, f, "t-ink", 9.5, 'font-weight="700" direction="ltr"')}${txt(X(i), 60, v, i === 2 ? "t-acc" : i === 1 ? "t-mint" : "t-ink3", 14, 'font-weight="800" direction="ltr"')}</g>${i < 2 ? `<path ${an("draw", 0.3 + i * 0.3, "s-ink3")} pathLength="1" d="M${X(i) + d * 30} 96 H ${X(i + 1) - d * 30}" stroke-width="2.2" fill="none" marker-end="url(#aih-arrow)"/>` : ""}`).join("")}
      <g ${an("fade", 1.2)}>${txt(X(1), 166, tr("+ قاعدة الشيت", "+ the sheet rule"), "t-mint", 11, b8)}${txt(X(2), 166, tr("+ قاعدة التاريخ", "+ the date rule"), "t-acc", 11, b8)}${txt(X(0), 166, tr("الدرس ٣", "lesson 3"), "t-ink3", 11, b8)}</g>
      <g ${an("fade", 1.3)}>${txt(240, 210, tr("كل نسخة قديمة بتفضل جنب الجديدة", "each old version stays beside the new one"), "t-ink2", 11.5, b8)}</g>
      ${pill(240, 258, 330, 34, tr("تعديل واحد في كل نسخة · وسطر في البطاقة", "one change per version · a line on the card"), "f-s1 s-ink2", "t-ink", 11.5, 1.5)}`;
    },
    xt_dates: () => {
      const t = mx(150), r = mx(372), d = dirx();
      const R = [["2026-04-02", "L01", "31"], ["09/04/2026", "L03", "18"], ["2026-04-16", "L02", "26"]];
      return `<g ${an("fade", 0.05)}>${txt(t, 40, tr("الجدول بعد التشغيل", "the table after the run"), "t-ink2", 11.5, b8)}</g>
      ${rowL(t, 68, ["Date", "LineCode", "Qty"], 76, 28, "f-acc-soft", "t-acc", 10, 0.1)}
      ${R.map((x, i) => rowL(t, 102 + i * 32, x, 76, 26, i === 1 ? ["f-rose-soft", "f-s1", "f-s1"] : "f-s1", i === 1 ? ["t-rose", "t-ink", "t-ink"] : "t-ink", 9.5, 0.3 + i * 0.12)).join("")}
      <g ${an("rise", 0.8)}>${box(r, 104, 170, 96, "f-s2 s-line2")}${txt(r, 82, tr("محوري بالشهر", "a pivot by month"), "t-ink", 11.5, b8)}${txt(r, 104, "2026-04 · 186", "t-ink2", 11, 'font-weight="700" direction="ltr"')}${txt(r, 126, tr("(فاضي) · ١٠٤", "(blank) · 104"), "t-rose", 11, b8)}</g>
      ${pill(t, 224, 220, 40, tr("«09/04»: ٩ أبريل ولا ٤ سبتمبر؟", "“09/04”: 9 April or 4 September?"), "f-amber-soft s-amber", "t-amber", 11, 1.1)}
      ${pill(r, 224, 196, 40, tr("v3: اليوم الأول", "v3: day first"), "f-mint", "t-white", 12, 1.4)}
      ${cap(tr("اللي ما وقّفش الأداة… لازم المراجعة توقّفه", "what didn't stop the tool… the check must stop"), 1.6, 290)}`;
    },
    xt_tests: () => {
      const X = rowX(3, 132, 14, 240);
      const T = ar() ? [["العدد", "٢٩٠ صف = المفتاح"], ["الإجمالي", "٦٬٨١٠ جهاز = المصدر"], ["المشاكل", "اتعاملت صح ووقفت"]] : [["Count", "290 rows = the key"], ["Total", "6,810 units = source"], ["Problems", "handled, and it stops"]];
      return `${T.map(([h, s], i) => `<g ${an("rise", 0.1 + i * 0.3)}>${box(X(i), 120, 132, 150, "f-s1 s-mint", 2.5)}<circle cx="${X(i)}" cy="72" r="16" class="f-mint"/>${txt(X(i), 78, digits(i + 1), "t-white", 14, b8)}${txt(X(i), 116, h, "t-ink", 14, b8)}${txt(X(i), 140, s, "t-ink3", 10.5, bold)}</g>${check(X(i), 174, 0.6 + i * 0.3)}`).join("")}
      ${pill(240, 236, 330, 34, tr("التلاتة عدّوا ← تعتمد · واحد فشل ← بالإيد الشهر ده", "all three pass → sign off · one fails → by hand"), "f-acc-soft s-acc", "t-acc", 11, 1.4)}
      ${cap(tr("العدد + الإجمالي + المشاكل = ثقة", "the count + the total + the problems = trust"), 1.6, 290)}`;
    },
    xt_card: () => {
      const p = mx(104), c = mx(270), t = mx(412), d = dirx();
      return `${page(p, 140, 150, 200, "Tool_Card.txt", [100, 80, 110, 70, 96, 88, 60, 104], 0.05)}
      <path ${an("draw", 0.5, "s-acc")} pathLength="1" d="M${p + d * 80} 140 H ${c - d * 76}" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 0.7)}>${bubble(c, 128, 140, 84, "f-s1 s-mint", !ar())}${txt(c, 112, tr("محادثة جديدة", "a new chat"), "t-ink", 11.5, b8)}${txt(c, 132, "ChatGPT", "t-mint", 12, 'font-weight="800" direction="ltr"')}</g>
      <path ${an("draw", 1.0, "s-mint")} pathLength="1" d="M${c + d * 74} 128 H ${t - d * 40}" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.2)}>${fileIcon(t, 120, "s-mint")}${txt(t, 160, tr("نفس الأداة", "the same tool"), "t-mint", 11.5, b8)}${txt(t, 178, tr("ربع ساعة", "15 minutes"), "t-ink3", 11, bold)}</g>
      ${pill(mx(330), 236, 250, 34, tr("التلات اختبارات عدّوا", "the three tests passed"), "f-mint", "t-white", 12, 1.5)}
      ${cap(tr("السكريبت بيتكتب تاني… والبطاقة هي الأداة", "the script can be rewritten… the card is the tool"), 1.7, 290)}`;
    },
    xt_cliff: () => {
      const t = mx(116), q = mx(372), d = dirx();
      const T = ar() ? ["تحت بعض", "بحث وربط", "قصاد الخطة", "المشتريات", "الخامات"] : ["stacking", "lookups", "vs plan", "purchasing", "materials"];
      return `${T.map((s, i) => `<g ${an("rise", 0.05 + i * 0.12)}>${box(t, 52 + i * 40, 150, 30, "f-mint-soft s-mint")}${txt(t, 57 + i * 40, s, "t-mint", 11, b8)}</g><path ${an("draw", 0.7 + i * 0.08, "s-acc")} pathLength="1" d="M${t + d * 78} ${52 + i * 40} C ${t + d * 130} ${52 + i * 40}, ${q - d * 120} 120, ${q - d * 92} 120" stroke-width="2" fill="none"/>`).join("")}
      <g ${an("rise", 1.2)}>${box(q, 120, 170, 120, "f-s1 s-acc", 2.5)}${[0, 1, 2].map((k) => `<rect x="${q - 70 + k * 48}" y="72" width="42" height="12" rx="6" class="${k === 1 ? "f-acc" : "f-acc-soft"}"/>`).join("")}${[0, 1, 2, 3].map((k) => `<rect x="${q - 66 + k * 16}" y="${164 - [22, 36, 16, 30][k]}" width="10" height="${[22, 36, 16, 30][k]}" rx="2" class="f-acc"/>`).join("")}<circle cx="${q + 40}" cy="140" r="18" class="s-mint" stroke-width="8" fill="none"/></g>
      <g ${an("pop", 1.6)}><circle cx="${q}" cy="120" r="20" class="f-acc"/>${txt(q, 128, ar() ? "؟" : "?", "t-white", 22, b8)}</g>
      <g ${an("fade", 1.8)}>${txt(q, 204, tr("الوحدة الجاية", "next unit"), "t-acc", 13, b8)}${txt(q, 222, tr("داشبورد جوّه إكسل", "a dashboard inside Excel"), "t-ink2", 11.5, bold)}</g>
      ${cap(tr("الأدوات الصغيرة… بتتجمع في حاجة أكبر", "small tools… come together into something bigger"), 2.0, 292)}`;
    },
  });

  /* ---------- unit 3 decks: two big Office examples, Claude Code and skills (pt_ table, pd_ dashboard, pg_ gathering, pp_ PowerPoint, cc_ Claude Code, sk_ skills) ---------- */
  const ofc = (x, y, kind, s = 1) => {   // a file badge: xl (green X), pdf (rose), doc (sky W), ppt (amber P)
    if (kind === "xl") return xl(x, y, s);
    const cls = kind === "pdf" ? "f-rose" : kind === "doc" ? "f-sky" : "f-amber", t = kind === "pdf" ? "PDF" : kind === "doc" ? "W" : "P";
    return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-16" y="-16" width="32" height="32" rx="6" class="${cls}"/><text x="0" y="${kind === "pdf" ? 4 : 6}" class="t-white" font-size="${kind === "pdf" ? 10 : 17}" font-weight="800" text-anchor="middle" direction="ltr">${t}</text></g>`;
  };
  const card = (cx, cy, w, h, big, small, d, cls = "f-s1 s-line2", bcls = "t-acc", bsize = 15) =>
    `<g ${an("pop", d)}>${box(cx, cy, w, h, cls)}${txt(cx, cy - 2, big, bcls, bsize, b8)}${txt(cx, cy + 17, small, "t-ink3", 10, bold)}</g>`;
  const cols = (x0, base, vals, bw, gap, max, hpx, d, cls = "f-acc") =>   // a small column chart, left to right in both languages (like Excel)
    `<g ${an("rise", d)}><line x1="${x0 - 4}" y1="${base}" x2="${x0 + vals.length * (bw + gap)}" y2="${base}" class="s-line2" stroke-width="1.5"/>${vals.map((v, i) => `<rect x="${x0 + i * (bw + gap)}" y="${base - (v / max) * hpx}" width="${bw}" height="${(v / max) * hpx}" rx="2" class="${[].concat(cls)[i % [].concat(cls).length]}"/>`).join("")}</g>`;
  const donut = (cx, cy, r, parts, d) => {   // parts: [[share, cls]]
    let a = -Math.PI / 2, s = "";
    for (const [p, cls] of parts) { const b = a + p * 2 * Math.PI, big = p > 0.5 ? 1 : 0, P = (t) => `${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`;
      s += `<path d="M${P(a)} A${r} ${r} 0 ${big} 1 ${P(b)}" class="${cls.replace("f-", "s-")}" stroke-width="${r * 0.55}" fill="none"/>`; a = b; }
    return `<g ${an("pop", d)}>${s}</g>`; };
  const tag = (cx, cy, s, cls = "f-acc", tcls = "t-white", size = 10.5, d = 0) => { const w = Math.max(40, String(s).length * size * 0.62 + 18);
    return `<g ${an("pop", d)}><rect x="${cx - w / 2}" y="${cy - 11}" width="${w}" height="22" rx="11" class="${cls}"/>${txt(cx, cy + size * 0.36, s, tcls, size, b8 + ' direction="ltr"')}</g>`; };
  const arrow = (x1, y1, x2, y2, d, cls = "s-acc", dash = "") => `<path ${an("draw", d, cls)} pathLength="1" d="M${x1} ${y1} L${x2} ${y2}" stroke-width="2.5" fill="none"${dash ? ` stroke-dasharray="${dash}"` : ""} marker-end="url(#aih-arrow)"/>`;
  const dash = (cx, cy, w, h, d) => {   // a tiny dashboard: three slicer chips, two charts, a card row
    const x0 = cx - w / 2, y0 = cy - h / 2;
    return `<g ${an("rise", d)}>${box(cx, cy, w, h, "f-s1 s-acc", 2.5)}
      ${[0, 1, 2].map((k) => `<rect x="${x0 + 12 + k * ((w - 24) / 3)}" y="${y0 + 10}" width="${(w - 24) / 3 - 6}" height="12" rx="6" class="${k === 1 ? "f-acc" : "f-acc-soft"}"/>`).join("")}
      ${[0, 1, 2, 3].map((k) => `<rect x="${x0 + 14 + k * 14}" y="${y0 + h - 14 - [22, 34, 16, 28][k]}" width="9" height="${[22, 34, 16, 28][k]}" rx="2" class="f-acc"/>`).join("")}
      <circle cx="${x0 + w - 34}" cy="${y0 + h - 34}" r="16" class="s-mint" stroke-width="8" fill="none"/></g>`; };

  Object.assign(ART, {
    /* ----- example 1, part 1: one table with names (data/table-story.js) ----- */
    pt_ask: () => {
      const m = mx(108), b = mx(330), d = dirx();
      return `<g ${an("rise", 0.05)}>${person(m, 196, 1.3, "f-ink2")}</g>
      <g ${an("pop", 0.3)}>${bubble(m, 92, 188, 52, "f-acc-soft s-acc", !ar())}${txt(m, 88, tr("«أدوس على خط", "“I click a line"), "t-acc", 11.5, b8)}${txt(m, 104, tr("وأشوفه لوحده»", "and see it alone”"), "t-acc", 11.5, b8)}</g>
      ${dash(b, 92, 190, 116, 0.6)}<g ${an("fade", 0.8)}>${txt(b, 168, tr("الداشبورد", "the dashboard"), "t-ink2", 11.5, b8)}</g>
      ${arrow(b, 212, b, 182, 1.2, "s-mint")}
      <g ${an("rise", 1.0)}>${grid(b, 240, 5, 3, 32, 13, "f-s1", -1, 1.0)}</g><g ${an("fade", 1.3)}>${txt(b + d * 0, 278, tr("الجدول تحته الأول", "first, the table beneath it"), "t-mint", 11.5, b8)}</g>
      ${cap(tr("الداشبورد بيبدأ من الجدول", "a dashboard starts from its table"), 1.6)}`;
    },
    pt_files: () => {
      const f = mx(96), t = mx(310);
      return `${[0, 1, 2].map((k) => `<g ${an("rise", 0.05 + k * 0.12)}>${xl(f + dirx() * k * 10, 66 + k * 12, 0.9)}</g>`).join("")}
      <g ${an("fade", 0.45)}>${txt(f, 130, "Week_01 … Week_13", "t-ink", 11, b8 + ' direction="ltr"')}${txt(f, 148, tr("١٣ ملف · شيت Production", "13 files · sheet Production"), "t-ink3", 10, bold)}</g>
      <g ${an("fade", 0.5)}>${txt(t, 46, tr("الصف الأول: العناوين", "row 1: the headers"), "t-mint", 11, b8)}</g>
      ${rowL(t, 72, ["Date", "WorkOrder", "LineCode", "ModelCode"], 64, 24, "f-mint", "t-white", 8, 0.6)}
      ${rowL(t, 100, ["CountryCode", "Qty", "Value"], 64, 24, "f-mint", "t-white", 8, 0.7)}
      ${[0, 1].map((k) => rowL(t, 136 + k * 26, [["2026-07-01", "2026-07-01"][k], "WO-410200" + (1 + k), "L01", ["M103", "M108"][k]], 64, 22, "f-s1", "t-ink", 8, 0.85 + k * 0.1)).join("")}
      ${[0, 1].map((k) => rowL(t, 190 + k * 26, [["SA", "EG"][k], ["48", "33"][k], ["276,960", "233,640"][k]], 64, 22, "f-s1", "t-ink", 8, 1.05 + k * 0.1)).join("")}
      ${pill(240, 262, 360, 32, tr("نفس الأعمدة بنفس الترتيب · ولا خانة فاضية", "the same columns, same order · no blank cell"), "f-mint-soft s-mint", "t-mint", 11, 1.3)}
      ${cap(tr("نفس الأعمدة… في كل ملف", "the same columns… in every file"), 1.6)}`;
    },
    pt_masters: () => {
      const a = mx(118), c = mx(358);
      return `<g ${an("fade", 0.05)}>${txt(a, 36, "Masters.xlsx", "t-ink2", 12, b8 + ' direction="ltr"')}</g>
      ${rowL(a, 62, ["ModelCode", "ModelName"], 84, 24, "f-acc-soft", "t-acc", 9, 0.1)}${[["M103", "32-inch Smart TV"], ["M108", "55-inch 4K TV"]].map((r, i) => rowL(a, 90 + i * 26, r, 84, 22, "f-s1", "t-ink", 8.5, 0.25 + i * 0.1)).join("")}
      ${rowL(a, 168, ["CountryCode", "CountryName"], 84, 24, "f-amber-soft", "t-amber", 9, 0.5)}${[["SA", "Saudi Arabia"], ["EG", "Egypt"]].map((r, i) => rowL(a, 196 + i * 26, r, 84, 22, "f-s1", "t-ink", 8.5, 0.6 + i * 0.1)).join("")}
      ${arrow(a + dirx() * 96, 102, c - dirx() * 86, 112, 1.0)}${arrow(a + dirx() * 96, 208, c - dirx() * 86, 140, 1.1, "s-amber")}
      <g ${an("fade", 1.2)}>${txt(c, 92, "tblProduction", "t-ink2", 11.5, b8 + ' direction="ltr"')}</g>
      ${rowL(c, 120, ["M103", "Model", "SA", "Country"], 50, 24, ["f-s2", "f-acc-soft", "f-s2", "f-amber-soft"], ["t-ink3", "t-acc", "t-ink3", "t-amber"], 7.5, 1.3)}
      ${rowL(c, 148, ["M103", "32\" Smart", "SA", "Saudi"], 50, 22, ["f-s1", "f-acc-soft", "f-s1", "f-amber-soft"], ["t-ink", "t-acc", "t-ink", "t-amber"], 7.5, 1.4)}
      <g ${an("fade", 1.5)}>${txt(c, 190, tr("١٢ موديل · ١٠ بلاد", "12 models · 10 countries"), "t-ink2", 11, b8)}</g>
      ${cap(tr("الكود للأداة… والاسم للمدير", "the code for the tool… the name for the manager"), 1.7, 292)}`;
    },
    pt_prompt: () => {
      const p = mx(158), q = mx(370);
      return `${page(p, 140, 220, 220, "Prompt_1.txt", [], 0.05, "f-s1 s-acc")}
      <g ${an("rise", 0.3)}>${box(p, 96, 190, 50, "f-acc-soft s-acc")}${txt(p, 92, tr("١ تحت بعض", "1 stack"), "t-acc", 12, b8)}${txt(p, 110, "Week_01 … Week_13", "t-ink2", 9.5, bold + ' direction="ltr"')}</g>
      <g ${an("rise", 0.5)}>${box(p, 156, 190, 50, "f-amber-soft s-amber")}${txt(p, 152, tr("٢ عمودين VLOOKUP", "2 two VLOOKUP columns"), "t-amber", 12, b8)}${txt(p, 170, "Models · Countries", "t-ink2", 9.5, bold + ' direction="ltr"')}</g>
      <g ${an("rise", 0.7)}>${box(p, 214, 190, 40, "f-mint-soft s-mint")}${txt(p, 219, tr("القواعد: اقرا بس · سجّل · وقّف", "rules: read only · log · stop"), "t-mint", 10, b8)}</g>
      <g ${an("rise", 1.0)}>${bubble(q, 80, 176, 48, "f-s1 s-ink3", ar())}${txt(q, 76, tr("قيم ولا معادلات؟", "values or formulas?"), "t-ink", 10.5, b8)}${txt(q, 92, tr("← معادلات", "→ formulas"), "t-mint", 10, bold)}</g>
      <g ${an("rise", 1.3)}>${bubble(q, 164, 176, 48, "f-s1 s-ink3", ar())}${txt(q, 160, tr("الشهر تاريخ ولا نص؟", "month: date or text?"), "t-ink", 10.5, b8)}${txt(q, 176, tr("← نص 2026-07", "→ text 2026-07"), "t-mint", 10, bold)}</g>
      <g ${an("fade", 1.5)}>${txt(q, 228, tr("سؤالين… وقرارين", "two questions…"), "t-ink2", 11.5, b8)}${txt(q, 246, tr("بتوعك إنت", "two decisions, yours"), "t-ink2", 11.5, b8)}</g>
      ${cap(tr("أداة واحدة… وخطوات مفصولة", "one tool… separate steps"), 1.7)}`;
    },
    pt_stack: () => {
      const f = mx(104), t = mx(340), d = dirx();
      const W = [["Week_01", "97"], ["Week_02", "98"], ["…", ""], ["Week_13", "99"]];
      return `${W.map(([w, r], i) => `<g ${an("rise", 0.05 + i * 0.12)}>${box(f, 64 + i * 42, 128, 32, i === 2 ? "f-s2 s-line2" : "f-s1 s-mint")}${txt(f, 68 + i * 42, w, "t-ink", 10.5, b8 + ' direction="ltr"')}</g>`).join("")}
      ${arrow(f + d * 72, 128, t - d * 92, 128, 0.7, "s-mint")}
      <g ${an("rise", 0.9)}>${grid(t, 128, 5, 9, 32, 16, "f-s1", 4, 0.9)}</g>
      <g ${an("fade", 1.1)}>${txt(t, 52, tr("شيت Data", "the Data sheet"), "t-ink2", 11.5, b8)}${txt(t, 214, tr("١٬٢٦٧ صف", "1,267 rows"), "t-mint", 13, b8)}</g>
      ${tag(t, 240, "SourceFile", "f-mint", "t-white", 10.5, 1.3)}
      ${cap(tr("تحت بعض… وكل صف عارف جه منين", "stacked… and every row knows where it came from"), 1.6, 292)}`;
    },
    pt_vlookup: () => {
      const t = mx(140), m = mx(368);
      return `<g ${an("fade", 0.05)}><rect x="40" y="30" width="400" height="30" rx="6" class="f-s2"/><text x="52" y="50" class="t-ink" font-size="11.5" font-weight="700" direction="ltr">=VLOOKUP(D2, Models!A:B, 2, FALSE)</text></g>
      ${rowL(t, 96, ["ModelCode", "ModelName"], 88, 24, ["f-acc-soft", "f-mint"], ["t-acc", "t-white"], 9, 0.2)}
      ${rowL(t, 124, ["M103", "32-inch Smart TV"], 88, 22, ["f-acc-soft", "f-mint-soft"], ["t-acc", "t-mint"], 8, 0.4)}
      ${rowL(m, 96, ["A", "B"], 88, 24, "f-s2", "t-ink3", 9, 0.5)}
      ${[["M102", "32-inch HD TV", 0], ["M103", "32-inch Smart TV", 1], ["M104", "43-inch Full HD TV", 0]].map(([c, n, h], i) => rowL(m, 124 + i * 26, [c, n], 88, 22, h ? ["f-acc-soft", "f-mint-soft"] : "f-s1", h ? ["t-acc", "t-mint"] : "t-ink", 8, 0.6 + i * 0.1)).join("")}
      <g ${an("fade", 0.55)}>${txt(m, 220, tr("شيت Models", "the Models sheet"), "t-ink2", 11, b8)}</g>
      ${arrow(t + dirx() * 20, 138, m - dirx() * 98, 150, 1.0, "s-acc")}
      ${pill(240, 258, 360, 32, tr("١ دوّر على الكود · ٢ هات العمود التاني · بالظبط", "1 find the code · 2 bring column 2 · exact"), "f-mint-soft s-mint", "t-mint", 10.5, 1.3)}
      ${cap(tr("الكود يدوّر… والاسم ييجي لوحده", "the code looks up… the name arrives by itself"), 1.6)}`;
    },
    pt_country: () => {
      const t = mx(150), c = mx(370);
      return `<g ${an("fade", 0.05)}><rect x="40" y="30" width="400" height="30" rx="6" class="f-s2"/><text x="52" y="50" class="t-ink" font-size="11.5" font-weight="700" direction="ltr">=VLOOKUP(F2, Countries!A:B, 2, FALSE)</text></g>
      ${rowL(t, 96, ["CountryCode", "CountryName"], 92, 24, ["f-amber-soft", "f-mint"], ["t-amber", "t-white"], 9, 0.2)}
      ${[["SA", "Saudi Arabia"], ["EG", "Egypt"], ["KE", "Kenya"]].map((r, i) => rowL(t, 124 + i * 26, r, 92, 22, ["f-s1", "f-mint-soft"], ["t-ink", "t-mint"], 8.5, 0.35 + i * 0.12)).join("")}
      <g ${an("rise", 0.9)}>${box(c, 140, 150, 110, "f-s1 s-acc")}${txt(c, 112, tr("الشيت دلوقتي", "the sheet now"), "t-ink", 11.5, b8)}${txt(c, 140, tr("١١ عمود", "11 columns"), "t-acc", 18, b8)}${txt(c, 166, tr("٧ + اسمين + ٢ مساعدين", "7 + 2 names + 2 helpers"), "t-ink3", 10, bold)}</g>
      ${pill(240, 248, 300, 32, "Kenya · 1,509", "f-acc-soft s-acc", "t-acc", 11.5, 1.2)}
      ${cap(tr("معادلة واحدة… عمودين", "one formula… two columns"), 1.6)}`;
    },
    pt_clean: () => {
      const a = mx(130), b = mx(360);
      return `${rowL(a, 62, ["ModelName", "CountryName"], 96, 26, "f-mint", "t-white", 9.5, 0.05)}
      ${[["32-inch Smart TV", "Saudi Arabia"], ["55-inch 4K TV", "Egypt"], ["43-inch Full HD TV", "Kenya"], ["65-inch QLED TV", "Iraq"]].map((r, i) => rowL(a, 94 + i * 28, r, 96, 22, "f-s1", "t-ink", 8, 0.2 + i * 0.1)).join("")}
      <g ${an("rise", 0.7)}>${box(b, 118, 160, 120, "f-s1 s-mint", 2.5)}${txt(b, 82, "#N/A", "t-ink3", 13, b8 + ' direction="ltr"')}${txt(b, 132, "0", "t-mint", 40, b8 + ' direction="ltr"')}${txt(b, 162, tr("من ٢٬٥٣٤ معادلة", "out of 2,534 formulas"), "t-ink2", 10.5, bold)}</g>
      ${check(b, 206, 1.0)}
      ${pill(240, 258, 360, 32, tr("كل كود في التقارير موجود في Masters", "every code in the reports is in Masters"), "f-mint-soft s-mint", "t-mint", 11, 1.2)}
      ${cap(tr("صفر #N/A… يعني كل صف ليه اسم", "zero #N/A… means every row has a name"), 1.5)}`;
    },
    pt_table: () => {
      const c = 240;
      return `<g ${an("pop", 0.05)}>${tag(c, 44, "tblProduction", "f-acc", "t-white", 12, 0.05)}</g>
      <g ${an("rise", 0.2)}>${grid(c, 132, 6, 7, 46, 18, "f-s1", -1, 0.2)}</g>
      <g ${an("rise", 0.6)}><rect x="${c - 138}" y="196" width="276" height="34" rx="3" class="f-mint-soft s-mint" stroke-dasharray="5 4" stroke-width="1.6"/>${txt(c, 218, tr("صفوف الربع الجاي… الجدول بيكبر لوحده", "next quarter's rows… the table grows by itself"), "t-mint", 10.5, b8)}</g>
      <g ${an("fade", 0.9)}>${txt(c, 256, tr("الجداول المحورية بتقرا «tblProduction»", "pivot tables read “tblProduction”"), "t-ink2", 11, b8)}${txt(c, 274, tr("مش «A1:K1268»", "not “A1:K1268”"), "t-rose", 11, b8)}</g>
      ${cap(tr("الاسم بيفضل… والصفوف بتتغيّر", "the name stays… the rows change"), 1.3)}`;
    },
    pt_helpers: () => {
      const a = mx(130), b = mx(352);
      return `${rowL(a, 70, ["Month"], 110, 28, "f-mint", "t-white", 11, 0.05)}${["2026-07", "2026-08", "2026-09"].map((s, i) => rowL(a, 102 + i * 28, [s], 110, 24, "f-s1", "t-ink", 10, 0.15 + i * 0.1)).join("")}
      ${rowL(b, 70, ["SourceFile"], 150, 28, "f-mint", "t-white", 11, 0.3)}${["Week_08.xlsx", "Week_09.xlsx", "Week_10.xlsx"].map((s, i) => rowL(b, 102 + i * 28, [s], 150, 24, i === 1 ? "f-amber-soft" : "f-s1", i === 1 ? "t-amber" : "t-ink", 9, 0.4 + i * 0.1)).join("")}
      <g ${an("rise", 0.9)}>${bubble(a, 226, 170, 44, "f-acc-soft s-acc", !ar())}${txt(a, 231, tr("«يوليو كام؟»", "“how much in July?”"), "t-acc", 11, b8)}</g>
      <g ${an("rise", 1.1)}>${bubble(b, 226, 190, 44, "f-amber-soft s-amber", ar())}${txt(b, 231, tr("«الأسبوع ٩ عمل كام؟»", "“what did week 9 make?”"), "t-amber", 11, b8)}</g>
      ${cap(tr("الجدول بيتبني على أسئلة الداشبورد", "the table is built for the dashboard's questions"), 1.4)}`;
    },
    pt_check: () => {
      const a = mx(140), k = mx(370), d = dirx();
      const L = ar() ? ["١٣ ملف", "١٬٢٦٧ صف", "٢٩٬٣٨٤ جهاز", "صفر #N/A"] : ["13 files", "1,267 rows", "29,384 sets", "zero #N/A"];
      return `<g ${an("rise", 0.05)}>${box(a, 142, 200, 224, "f-s2 s-line2")}${txt(a, 46, "Check", "t-ink", 12.5, b8 + ' direction="ltr"')}</g>
      <g ${an("rise", 0.25)}>${box(k, 142, 160, 224, "f-s1 s-amber")}${txt(k, 46, "Answer_Key.txt", "t-amber", 11, b8 + ' direction="ltr"')}</g>
      ${L.map((s, i) => `<g ${an("fade", 0.4 + i * 0.18)}>${txt(a, 82 + i * 38, s, "t-ink", 11, b8)}${txt(k, 82 + i * 38, s, "t-ink2", 11, bold)}</g>${check(mx(255), 78 + i * 38, 0.6 + i * 0.18)}`).join("")}
      ${pill(240, 280, 320, 30, tr("وفلتر يوليو بإيده: ٩٬٧٣٧ · وزي Final_Result", "July by hand: 9,737 · and as in Final_Result"), "f-mint", "t-white", 11, 1.6)}`;
    },
    pt_cliff: () => {
      const a = mx(110), b = mx(350), d = dirx();
      return `<g ${an("rise", 0.05)}>${grid(a, 112, 4, 8, 30, 14, "f-s1", -1, 0.05)}</g><g ${an("fade", 0.3)}>${txt(a, 190, tr("١٬٢٦٧ صف", "1,267 rows"), "t-ink", 12, b8)}</g>
      ${arrow(a + d * 76, 112, b - d * 100, 112, 0.6, "s-acc", "6 5")}
      ${dash(b, 112, 180, 112, 0.9)}<g ${an("pop", 1.2)}><circle cx="${b}" cy="112" r="20" class="f-acc"/>${txt(b, 120, ar() ? "؟" : "?", "t-white", 22, b8)}</g>
      <g ${an("rise", 1.0)}>${person(a, 268, 0.9, "f-ink2")}${bubble(a + d * 120, 232, 200, 40, "f-s1 s-ink3", !ar())}${txt(a + d * 120, 237, tr("«مش هقرا ١٬٢٦٧ صف»", "“I won't read 1,267 rows”"), "t-ink", 10.5, b8)}</g>
      ${cap(tr("الدرس الجاي: الداشبورد", "next lesson: the dashboard"), 1.5, 302)}`;
    },

    /* ----- example 1, part 2: the dashboard (data/dash-story.js) ----- */
    pd_three: () => {
      const Q = ar() ? ["أنهي شهر وأنهي خط أعلى؟", "الإنتاج رايح لأنهي بلد؟", "أنهي موديلات بتشيل المصنع؟"] : ["Which month and line are highest?", "Which country does output go to?", "Which models carry the factory?"];
      return `${page(240, 132, 330, 196, tr("أسئلة المدير", "The manager's questions"), [], 0.05)}
      ${Q.map((q, i) => `<g ${an("rise", 0.3 + i * 0.3)}><circle cx="${mx(108)}" cy="${86 + i * 52}" r="14" class="f-acc"/>${txt(mx(108), 91 + i * 52, digits(i + 1), "t-white", 12, b8)}${txt(mx(108) + dirx() * 142, 91 + i * 52, q, "t-ink", 12, b8)}</g>`).join("")}
      ${pill(240, 262, 300, 32, tr("٣ أسئلة ← ٣ جداول محورية ← ٣ رسوم", "3 questions → 3 pivots → 3 charts"), "f-mint-soft s-mint", "t-mint", 11, 1.3)}
      ${cap(tr("تلات أسئلة… تلات أجزاء", "three questions… three parts"), 1.6, 302)}`;
    },
    pd_pivots: () => {
      const s = mx(84), P = [["PT_MonthLine", 64], ["PT_Country", 146], ["PT_Model", 228]], x = mx(324);
      return `<g ${an("rise", 0.05)}>${grid(s, 146, 3, 12, 34, 14, "f-s1", -1, 0.05)}</g><g ${an("fade", 0.2)}>${txt(s, 244, "tblProduction", "t-ink2", 11, b8 + ' direction="ltr"')}</g>
      ${P.map(([n, y], i) => `${arrow(s + dirx() * 60, 146, x - dirx() * 112, y, 0.4 + i * 0.25)}<g ${an("rise", 0.5 + i * 0.25)}>${box(x, y, 210, 58, "f-acc-soft s-acc")}${txt(x, y - 8, n, "t-acc", 11.5, b8 + ' direction="ltr"')}${txt(x, y + 12, [tr("الشهر × الخط", "month × line"), tr("البلد: كمية وقيمة", "country: qty and value"), tr("كل الموديلات، الأكبر الأول", "every model, largest first")][i], "t-ink2", 10, bold)}</g>`).join("")}
      ${cap(tr("الجدول المحوري بيحفظ الطريقة… مش الأرقام", "a pivot table keeps the method… not the figures"), 1.4, 296)}`;
    },
    pd_prompt: () => {
      const T = ["Pivots", "Report", "Charts", "Dashboard"], X = rowX(4, 92, 8);
      return `<g ${an("fade", 0.05)}>${txt(240, 40, "Production_Q3_Dashboard.xlsx", "t-ink2", 12, b8 + ' direction="ltr"')}</g>
      ${T.map((s, i) => `<g ${an("pop", 0.2 + i * 0.15)}><path d="M${X(i) - 44} 86 v-22 q0 -6 6 -6 h76 q6 0 6 6 v22z" class="${i === 0 ? "f-acc" : "f-acc-soft s-acc"}" stroke-width="1.5"/>${txt(X(i), 77, s, i === 0 ? "t-white" : "t-acc", 11, b8 + ' direction="ltr"')}${txt(X(i), 108, digits(i + 1), "t-ink3", 11, b8)}</g>`).join("")}
      <g ${an("rise", 0.9)}>${box(240, 168, 380, 70, "f-mint-soft s-mint", 2.5)}${txt(240, 160, tr("قبل التنسيق:", "before formatting:"), "t-mint", 12, b8)}${txt(240, 182, tr("الجدول = الإجمالي في كل جدول محوري", "table = every pivot's grand total"), "t-ink", 12, b8)}</g>
      <g ${an("fade", 1.2)}>${txt(240, 240, tr("التنسيق بياخد أغلب الوقت…", "formatting takes most of the time…"), "t-ink2", 11, bold)}${txt(240, 258, tr("فالأرقام تتراجع قبله", "so the figures are checked first"), "t-ink2", 11, bold)}</g>
      ${cap(tr("الأرقام الأول… والألوان بعدين", "figures first… colours later"), 1.5)}`;
    },
    pd_pass: () => {
      const s_ = mx(410);
      return `${term(mx(196), 102, 330, 108, ["Check passed:", "  tblProduction  29,384", "  PT_MonthLine   29,384", "  PT_Country     29,384", "  PT_Model       29,384"], 0.05, 10.5, (i) => (i === 0 ? "t-mint" : "t-crt"))}
      <g ${an("pop", 1.2)}><circle cx="${s_}" cy="90" r="26" class="f-mint"/><path d="M${s_ - 11} 90 l8 8 l15 -16" class="s-white" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
      ${pill(240, 218, 360, 36, tr("كل صف اتحسب في كل جدول محوري", "every row counted in every pivot table"), "f-mint-soft s-mint", "t-mint", 11.5, 1.5)}
      ${pill(240, 262, 360, 32, tr("والمراجعة بتفضل في الأداة كل ربع", "and the check stays in the tool every quarter"), "f-acc-soft s-acc", "t-acc", 10.5, 1.8)}
      ${cap(tr("بتعدّي النهارده… وبتحرس بكرة", "it passes today… and guards tomorrow"), 2.0)}`;
    },
    pd_report: () => {
      const X = rowX(4, 104, 8), K = [[n_("29,384"), tr("جهاز", "sets")], [tr("٢٧٩٫٢ م", "279.2 M"), tr("جنيه", "EGP")], [n_("47") + "%", tr("تصدير", "export")], ['32" Smart', tr("أعلى موديل", "top model")]];
      return `<g ${an("fade", 0.05)}>${txt(240, 36, tr("Report · الربع التالت", "Report · third quarter"), "t-ink2", 12, b8)}</g>
      ${K.map(([a, b], i) => card(X(i), 78, 100, 52, a, b, 0.2 + i * 0.15, "f-s1 s-acc", "t-acc", 13.5)).join("")}
      ${cols(150, 238, [9737, 9643, 10004], 40, 24, 10004, 96, 0.9, ["f-acc-soft2", "f-acc-soft2", "f-acc"])}
      <g ${an("fade", 1.1)}>${["Jul", "Aug", "Sep"].map((m, i) => `<text x="${170 + i * 64}" y="254" class="t-ink3" font-size="10" font-weight="700" text-anchor="middle" direction="ltr">${m}</text>`).join("")}<text x="298" y="136" class="t-acc" font-size="10.5" font-weight="800" text-anchor="middle" direction="ltr">10,004</text></g>
      ${cap(tr("٤ أرقام فوق… والتفاصيل تحت", "4 figures on top… details below"), 1.3, 296)}`;
    },
    pd_charts: () => {
      const X = rowX(3, 140, 14);
      return `<g ${an("rise", 0.05)}>${box(X(0), 130, 140, 150, "f-s1 s-line2")}</g>${cols(X(0) - 52, 186, [5886, 5077, 5567, 4619, 4567, 3668], 12, 6, 5886, 90, 0.2, ["f-acc", "f-acc-soft"])}
      <g ${an("rise", 0.3)}>${box(X(1), 130, 140, 150, "f-s1 s-line2")}</g><g ${an("rise", 0.5)}>${[1, 0.114, 0.113, 0.112, 0.097].map((v, i) => `<rect x="${X(1) - 54}" y="${80 + i * 20}" width="${108 * v}" height="12" rx="3" class="${i ? "f-amber-soft" : "f-amber"}"/>`).join("")}</g>
      <g ${an("rise", 0.6)}>${box(X(2), 130, 140, 150, "f-s1 s-line2")}</g><g ${an("rise", 0.8)}>${[1, 0.93, 0.88, 0.84, 0.8].map((v, i) => `<rect x="${X(2) - 54}" y="${80 + i * 20}" width="${108 * v}" height="12" rx="3" class="${i ? "f-mint-soft" : "f-mint"}"/>`).join("")}</g>
      <g ${an("fade", 1.0)}>${txt(X(0), 226, tr("الشهور والخطوط", "months and lines"), "t-ink2", 10.5, b8)}${txt(X(1), 226, tr("البلاد", "countries"), "t-ink2", 10.5, b8)}${txt(X(2), 226, tr("الموديلات", "models"), "t-ink2", 10.5, b8)}</g>
      ${pill(240, 262, 300, 30, tr("مش ١٠ رسوم «علشان يبان غني»", "not 10 charts “to look rich”"), "f-rose-soft s-rose", "t-rose", 11, 1.2)}
      ${cap(tr("رسوم أقل… فهم أسرع", "fewer charts… faster understanding"), 1.5)}`;
    },
    pd_slicers: () => {
      const S = [["Month", ["Jul", "Aug", "Sep"]], ["Line", ["L01", "L02", "L03"]], ["Country", ["EG", "SA", "KW"]]], Y = [60, 100, 140], P = rowX(3, 120, 18);
      return `${S.map(([n, v], i) => `<g ${an("rise", 0.1 + i * 0.15)}><text x="${ar() ? 440 : 40}" y="${Y[i] + 4}" class="t-ink2" font-size="10.5" font-weight="800" text-anchor="${ar() ? "end" : "start"}" direction="ltr">${n}</text>${v.map((s, k) => `<rect x="${120 + k * 84}" y="${Y[i] - 12}" width="76" height="24" rx="12" class="${(i === 0 && k === 2) ? "f-acc" : "f-acc-soft"}"/><text x="${158 + k * 84}" y="${Y[i] + 4}" class="${(i === 0 && k === 2) ? "t-white" : "t-acc"}" font-size="10" font-weight="800" text-anchor="middle" direction="ltr">${s}</text>`).join("")}</g>`).join("")}
      ${[0, 1, 2].map((k) => `<path ${an("draw", 0.7 + k * 0.15, "s-mint")} pathLength="1" d="M${240} 160 L${P(k)} 210" stroke-width="2.4" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      ${["PT_MonthLine", "PT_Country", "PT_Model"].map((s, k) => `<g ${an("pop", 0.9 + k * 0.15)}>${box(P(k), 232, 118, 38, "f-mint-soft s-mint")}${txt(P(k), 236, s, "t-mint", 10, b8 + ' direction="ltr"')}</g>`).join("")}
      ${cap(tr("دوسة واحدة… كل حاجة تتغيّر مع بعض", "one click… everything changes together"), 1.5, 290)}`;
    },
    pd_cards: () => {
      const a = mx(126), b = mx(354);
      return `<g ${an("rise", 0.05)}>${box(a, 104, 170, 96, "f-s1 s-rose")}${txt(a, 106, n_("29,384"), "t-ink", 22, b8)}${txt(a, 132, tr("مكتوب بالإيد", "typed by hand"), "t-rose", 11, b8)}</g>${check(a + dirx() * 74, 62, 0.4, false)}
      <g ${an("rise", 0.5)}>${box(b, 104, 190, 96, "f-s1 s-mint")}${txt(b, 106, n_("29,384"), "t-ink", 22, b8)}${txt(b, 132, tr("بيقرا من الجدول المحوري", "read from the pivot table"), "t-mint", 10.5, b8)}</g>${check(b + dirx() * 84, 62, 0.8)}
      <g ${an("fade", 0.9)}>${mono(40, 196, '=GETPIVOTDATA("Qty", PT_Country)', "t-acc", 12)}</g>
      <g ${an("fade", 1.1)}>${txt(a, 236, tr("L01 ← لسه ٢٩٬٣٨٤", "L01 → still 29,384"), "t-rose", 11.5, b8)}${txt(b, 236, tr("L01 ← ٥٬٨٨٦", "L01 → 5,886"), "t-mint", 11.5, b8)}</g>
      ${cap(tr("الرقم المكتوب بالإيد… صح النهارده بس", "a typed figure… is right only today"), 1.4, 290)}`;
    },
    pd_test: () => {
      const a = mx(130), b = mx(350);
      return `<g ${an("rise", 0.05)}>${tag(a, 60, "Line: L01", "f-acc", "t-white", 11, 0.05)}</g>${card(a, 124, 150, 64, n_("5,886"), tr("الكارت", "the card"), 0.3, "f-s1 s-acc", "t-acc", 20)}
      <g ${an("rise", 0.5)}>${tag(b, 60, "Filter: LineCode = L01", "f-ink2", "t-white", 10.5, 0.5)}</g>${card(b, 124, 150, 64, n_("5,886"), tr("الفلتر بإيدك", "your filter"), 0.8, "f-s1 s-ink3", "t-ink", 20)}
      <g ${an("pop", 1.1)}>${txt(240, 132, "=", "t-mint", 30, b8)}</g>
      <g ${an("fade", 1.3)}>${txt(a, 196, "Kenya: " + n_("1,509"), "t-ink2", 11, b8 + ' direction="ltr"')}${txt(b, 196, "Kenya: " + n_("1,509"), "t-ink2", 11, b8 + ' direction="ltr"')}</g>${check(240, 192, 1.5)}
      ${pill(240, 246, 300, 32, tr("طريقين مختلفين… ونفس الرقم", "two routes… the same figure"), "f-mint", "t-white", 11.5, 1.6)}
      ${cap(tr("ودلوقتي بس يتبعت", "only now is it sent"), 1.8, 296)}`;
    },
    pd_refresh: () => {
      const X = rowX(3, 120, 30);
      return `<g ${an("rise", 0.05)}>${[0, 1, 2].map((k) => fileIcon(X(0) - 20 + k * 20, 100, "s-acc", 0.05 + k * 0.1)).join("")}${txt(X(0), 146, tr("تقارير جديدة", "new reports"), "t-ink", 11, b8)}</g>
      ${arrow(X(0) + dirx() * 50, 100, X(1) - dirx() * 50, 100, 0.5)}
      <g ${an("pop", 0.7)}>${box(X(1), 100, 100, 54, "f-acc-soft s-acc")}${txt(X(1), 98, tr("الأداة ١", "tool 1"), "t-acc", 12, b8)}${txt(X(1), 114, "tblProduction", "t-ink2", 9, bold + ' direction="ltr"')}</g>
      ${arrow(X(1) + dirx() * 54, 100, X(2) - dirx() * 56, 100, 0.9)}
      ${dash(X(2), 100, 110, 80, 1.1)}
      <g ${an("pop", 1.3)}><path d="M210 210 a30 30 0 1 1 8 22" class="s-mint" stroke-width="4" fill="none"/><path d="M205 226 l14 8 l2 -15" class="s-mint" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${txt(318, 216, "Refresh All", "t-mint", 13, b8 + ' direction="ltr"')}</g>
      ${cap(tr("الطريقة محفوظة… والأرقام بتتجدد", "the method is kept… the figures renew"), 1.6, 290)}`;
    },
    pd_final: () => {
      const a = mx(140), b = mx(362), T = ["Dashboard", "Report", "Pivots", "Data", "Models", "Countries"];
      return `<g ${an("rise", 0.05)}>${xl(a, 52, 1)}${txt(a, 92, "Final_Result", "t-ink2", 11, b8 + ' direction="ltr"')}</g>
      ${T.map((t, i) => `<g ${an("rise", 0.2 + i * 0.1)}>${box(a, 118 + i * 26, 150, 22, i < 2 ? "f-acc-soft s-acc" : "f-s1 s-line2")}${txt(a, 122 + i * 26, t, i < 2 ? "t-acc" : "t-ink2", 10, b8 + ' direction="ltr"')}</g>`).join("")}
      ${[[tr("٢٧٩٫٢ م جنيه", "EGP 279.2 M"), 0], [tr("٤٧٪ تصدير", "47% export"), 1], [tr("سبتمبر ١٠٬٠٠٤", "Sep 10,004"), 2], ["L06 " + n_("3,668"), 3]].map(([t, i]) => `<g ${an("fade", 0.9 + i * 0.15)}>${box(b, 76 + i * 40, 170, 30, "f-s1 s-mint")}${txt(b, 81 + i * 40, t, "t-ink", 11, b8)}</g>${check(b + dirx() * 100, 76 + i * 40, 1.0 + i * 0.15)}`).join("")}
      ${pill(b, 250, 200, 30, tr("نفس الأرقام بالظبط", "exactly the same figures"), "f-mint", "t-white", 11, 1.6)}
      ${cap(tr("الشكل يختلف… والأرقام لأ", "the look may differ… the figures may not"), 1.8, 296)}`;
    },
    pd_cliff: () => {
      const a = mx(120), b = mx(360), d = dirx();
      return `<g ${an("rise", 0.05)}>${person(a, 210, 1.2, "f-ink2")}${bubble(a, 92, 200, 66, "f-acc-soft s-acc", !ar())}${txt(a, 82, tr("«عايز زيه للمبيعات…", "“I want one for sales…"), "t-acc", 11, b8)}${txt(a, 100, tr("وعرض للإدارة»", "and a deck”"), "t-acc", 11, b8)}</g>
      <g ${an("pop", 0.6)}>${ofc(b - 46, 90, "pdf", 1.2)}${ofc(b, 90, "doc", 1.2)}${ofc(b + 46, 90, "xl", 1.2)}</g>
      <g ${an("fade", 0.9)}>${txt(b, 140, tr("٦ PDF · ٢ وورد · ٣ إكسل", "6 PDF · 2 Word · 3 Excel"), "t-ink", 11.5, b8)}</g>
      <g ${an("pop", 1.2)}><circle cx="${b}" cy="194" r="22" class="f-acc"/>${txt(b, 202, ar() ? "؟" : "?", "t-white", 24, b8)}</g>
      ${cap(tr("الدرس الجاي: أرقام مش في إكسل", "next lesson: figures that aren't in Excel"), 1.5, 290)}`;
    },

    /* ----- example 2, part 1: gathering (data/gather-story.js) ----- */
    pg_pile: () => {
      const K = [["xl", 3], ["pdf", 6], ["doc", 2]], X = rowX(3, 140, 14);
      return `${K.map(([k, n], i) => `<g ${an("rise", 0.1 + i * 0.3)}>${[...Array(n)].map((_, j) => ofc(X(i) - ((Math.min(n, 3) - 1) * 18) + (j % 3) * 36, 80 + Math.floor(j / 3) * 42, k, 0.9)).join("")}${txt(X(i), 172, [tr("٣ إكسل", "3 Excel"), tr("٦ PDF", "6 PDF"), tr("٢ وورد", "2 Word")][i], "t-ink", 12, b8)}</g>`).join("")}
      <g ${an("pop", 1.1)}><circle cx="${mx(110)}" cy="228" r="24" class="f-s1 s-rose" stroke-width="3.5"/><path d="M${mx(110)} 228 v-14 M${mx(110)} 228 l10 7" class="s-rose" stroke-width="3.5" stroke-linecap="round"/>${txt(mx(110) + dirx() * 120, 233, tr("يوم كامل نسخ ولصق", "a whole day of copy and paste"), "t-rose", 12, b8)}</g>
      ${cap(tr("كل نقل بالإيد… فرصة لغلطة", "every hand copy… a chance for a mistake"), 1.4, 290)}`;
    },
    pg_inventory: () => {
      const R = [["Sales_Cairo_Q3.xlsx", tr("نفس الأعمدة", "the same columns"), "xl"], ["Sales_Alexandria_Q3.xlsx", tr("نفس الأعمدة", "the same columns"), "xl"], ["Sales_Delta_Q3.xlsx", tr("نفس الأعمدة", "the same columns"), "xl"], ["Export_Sales_*.pdf ×3", tr("جدول واحد", "one table"), "pdf"], ["Shipments_*.pdf ×3", tr("جدول واحد", "one table"), "pdf"], ["Returns · Targets .docx", tr("جدول جوّه نص", "table inside text"), "doc"]];
      return `${R.map(([f, s, k], i) => `<g ${an("rise", 0.1 + i * 0.15)}>${ofc(mx(50), 50 + i * 38, k, 0.7)}<text x="${ar() ? 410 : 70}" y="${54 + i * 38}" class="t-ink" font-size="10.5" font-weight="800" text-anchor="${ar() ? "end" : "start"}" direction="ltr">${esc(f)}</text>${txt(mx(372), 54 + i * 38, s, "t-ink2", 10.5, bold)}</g>`).join("")}
      ${pill(240, 276, 300, 30, tr("الجرد ده أول جزء في README", "this inventory opens the README"), "f-acc-soft s-acc", "t-acc", 11, 1.2)}`;
    },
    pg_design: () => {
      const a = mx(150), b = mx(374);
      return `<g ${an("fade", 0.05)}>${txt(240, 34, "Q3_Commercial_DB.xlsx", "t-ink2", 12, b8 + ' direction="ltr"')}</g>
      <g ${an("rise", 0.15)}>${box(a, 150, 220, 196, "f-s1 s-acc", 2.5)}${txt(a, 72, "Sales", "t-acc", 13, b8 + ' direction="ltr"')}</g>
      ${["Month", "Channel", "CountryCode", "CountryName", "ModelCode", "ModelName", "Qty", "NetSales", "SourceFile"].map((c, i) => `<g ${an("fade", 0.3 + i * 0.06)}><rect x="${a - 92}" y="${84 + i * 18}" width="184" height="15" rx="3" class="${c.endsWith("Name") ? "f-mint-soft" : "f-s2"}"/>${txt(a, 95 + i * 18, c, c.endsWith("Name") ? "t-mint" : "t-ink2", 8.5, b8 + ' direction="ltr"')}</g>`).join("")}
      ${["Shipments", "Returns", "Targets"].map((t, i) => `<g ${an("rise", 0.9 + i * 0.15)}>${box(b, 84 + i * 56, 140, 44, "f-amber-soft s-amber")}${txt(b, 89 + i * 56, t, "t-amber", 11.5, b8 + ' direction="ltr"')}</g>`).join("")}
      <g ${an("fade", 1.4)}>${txt(b, 258, tr("٣ جداول صغيرة", "3 small tables"), "t-ink2", 11, b8)}</g>
      ${cap(tr("شيت كبير… وجداول صغيرة جنبه", "one big sheet… small tables beside it"), 1.6, 290)}`;
    },
    pg_branches: () => {
      const f = mx(110), t = mx(340), d = dirx();
      const B = [["Sales_Cairo_Q3", "71"], ["Sales_Alexandria_Q3", "61"], ["Sales_Delta_Q3", "63"]];
      return `${B.map(([n, r], i) => `<g ${an("rise", 0.05 + i * 0.15)}>${xl(f + d * -70, 74 + i * 50, 0.8)}${txt(f + d * 14, 72 + i * 50, n, "t-ink", 9.5, b8 + ' direction="ltr"')}${txt(f + d * 14, 88 + i * 50, tr(digits(r) + " صف", r + " rows"), "t-ink3", 9.5, bold)}</g>`).join("")}
      ${arrow(f + d * 86, 124, t - d * 96, 124, 0.6, "s-mint")}
      ${rowL(t, 70, ["Month", "Channel", "CountryCode"], 62, 22, "f-mint", "t-white", 8, 0.8)}
      ${[["2026-07", "Cairo", "EG"], ["2026-08", "Alexandria", "EG"], ["2026-09", "Delta", "EG"]].map((r, i) => rowL(t, 96 + i * 24, r, 62, 20, "f-s1", "t-ink", 8, 0.95 + i * 0.1)).join("")}
      <g ${an("fade", 1.3)}>${txt(t, 186, tr("١٩٥ صف في Sales", "195 rows in Sales"), "t-mint", 12, b8)}</g>
      ${pill(240, 238, 360, 32, tr("القناة من اسم الملف · البلد EG · الشهر من التاريخ", "channel from the file name · country EG · month from the date"), "f-acc-soft s-acc", "t-acc", 10, 1.4)}
      ${cap(tr("اسم الملف… يبقى عمود", "the file name… becomes a column"), 1.6, 290)}`;
    },
    pg_word: () => {
      const a = mx(90), b = mx(240), c = mx(390), d = dirx();
      return `<g ${an("rise", 0.05)}>${ofc(a, 96, "pdf", 1.6)}${txt(a, 148, "Export_Sales.pdf", "t-ink2", 10, b8 + ' direction="ltr"')}</g>
      ${arrow(a + d * 34, 96, b - d * 40, 96, 0.4)}
      <g ${an("pop", 0.6)}>${ofc(b, 96, "doc", 1.6)}${txt(b, 148, "Documents.Open", "t-acc", 10, b8 + ' direction="ltr"')}</g>
      ${arrow(b + d * 34, 96, c - d * 50, 96, 0.9)}
      <g ${an("rise", 1.1)}>${grid(c, 96, 3, 4, 30, 15, "f-s1", -1, 1.1)}${txt(c, 148, "Tables", "t-mint", 10.5, b8 + ' direction="ltr"')}</g>
      ${pill(240, 206, 330, 34, tr("الأوفيس بس… من غير ولا برنامج جديد", "Office only… no new program"), "f-mint-soft s-mint", "t-mint", 11.5, 1.4)}
      <g ${an("fade", 1.6)}>${txt(240, 252, tr("PDF ممسوح ضوئيًا (صورة)؟ ده محتاج طريقة تانية", "a scanned PDF (an image)? that needs another way"), "t-ink3", 10.5, bold)}</g>
      ${cap(tr("وورد بيقرا الـ PDF… والأداة بتقرا وورد", "Word reads the PDF… the tool reads Word"), 1.8, 296)}`;
    },
    pg_export: () => {
      const a = mx(130), b = mx(352), d = dirx();
      return `<g ${an("rise", 0.05)}><rect x="${a - 82}" y="40" width="164" height="176" rx="6" class="f-s1 s-line2" stroke-width="2"/>${txt(a, 60, "Export Sales - Aug", "t-ink", 10, b8 + ' direction="ltr"')}<rect x="${a - 70}" y="70" width="140" height="16" rx="3" class="f-rose-soft"/>${txt(a, 82, "Country · Model · Qty · Net", "t-rose", 8, b8 + ' direction="ltr"')}${[0, 1, 2, 3, 4, 5].map((k) => `<rect x="${a - 70}" y="${96 + k * 18}" width="${[140, 120, 132, 110, 128, 136][k]}" height="7" rx="3" class="f-s3"/>`).join("")}</g>
      <g ${an("fade", 0.3)}>${txt(a, 236, tr("٢٩ + ٤١ + ٤٤ = ١١٤ سطر", "29 + 41 + 44 = 114 lines"), "t-ink2", 11, b8)}</g>
      ${arrow(a + d * 88, 128, b - d * 98, 128, 0.6)}
      <g ${an("rise", 0.8)}>${box(b, 128, 184, 150, "f-s1 s-acc", 2.5)}${txt(b, 70, "Sales", "t-acc", 13, b8 + ' direction="ltr"')}<rect x="${b - 78}" y="84" width="156" height="58" rx="4" class="f-acc-soft"/>${txt(b, 118, tr("الفروع ١٩٥", "branches 195"), "t-acc", 11, b8)}<rect x="${b - 78}" y="148" width="156" height="44" rx="4" class="f-rose-soft"/>${txt(b, 175, tr("التصدير ١١٤", "export 114"), "t-rose", 11, b8)}</g>
      ${pill(b, 236, 200, 30, tr("٣٠٩ صف · ٢٥٬٢٧٦ جهاز", "309 rows · 25,276 sets"), "f-mint", "t-white", 11, 1.2)}
      ${cap(tr("مصادر مختلفة… شيت واحد", "different sources… one sheet"), 1.5, 292)}`;
    },
    pg_ship: () => {
      const t = mx(170), k = mx(392);
      return `${rowL(t, 52, ["Channel", "Shipments", "Units", "FreightEGP"], 70, 24, "f-rose-soft", "t-rose", 8.5, 0.05)}
      ${[["Cairo", "12", "1,745", "33,600"], ["Alexandria", "10", "1,451", "42,000"], ["Delta", "13", "1,900", "45,500"], ["Export", "6", "2,242", "288,000"]].map((r, i) => rowL(t, 80 + i * 26, r, 70, 22, "f-s1", "t-ink", 8, 0.2 + i * 0.1)).join("")}
      <g ${an("fade", 0.7)}>${txt(t, 202, tr("يوليو: سطر لكل قناة", "July: one line per channel"), "t-ink2", 10.5, b8)}</g>
      <g ${an("rise", 0.9)}>${box(k, 120, 128, 120, "f-s1 s-amber")}${txt(k, 82, "Shipments", "t-amber", 11.5, b8 + ' direction="ltr"')}${txt(k, 116, tr("١٣٥ شحنة", "135 shipments"), "t-ink", 12, b8)}${txt(k, 140, n_("25,276"), "t-ink", 13, b8)}${txt(k, 158, tr("جهاز اتشحن", "sets shipped"), "t-ink3", 10, bold)}</g>
      ${pill(240, 248, 340, 32, tr("اتشحن ٢٥٬٢٧٦ = اتباع ٢٥٬٢٧٦", "shipped 25,276 = sold 25,276"), "f-mint-soft s-mint", "t-mint", 11, 1.3)}
      ${cap(tr("كل نوع… في شيته", "each kind… in its own sheet"), 1.6, 292)}`;
    },
    pg_lookup: () => {
      return `<g ${an("fade", 0.05)}><rect x="40" y="30" width="400" height="30" rx="6" class="f-s2"/><text x="52" y="50" class="t-ink" font-size="11.5" font-weight="700" direction="ltr">=VLOOKUP(C2, Countries!A:B, 2, FALSE)</text></g>
      ${rowL(240, 94, ["Channel", "CountryCode", "CountryName", "ModelCode", "ModelName"], 76, 24, ["f-s2", "f-s2", "f-mint", "f-s2", "f-mint"], ["t-ink2", "t-ink2", "t-white", "t-ink2", "t-white"], 7.5, 0.2)}
      ${[["Cairo", "EG", "Egypt", "M103", "32\" Smart"], ["Export", "KE", "Kenya", "M110", "65\" 4K"], ["Export", "SA", "Saudi Arabia", "M108", "55\" 4K"]].map((r, i) => rowL(240, 122 + i * 26, r, 76, 22, ["f-s1", "f-s1", "f-mint-soft", "f-s1", "f-mint-soft"], ["t-ink", "t-ink", "t-mint", "t-ink", "t-mint"], 7.5, 0.4 + i * 0.12)).join("")}
      ${pill(mx(140), 228, 190, 34, tr("٦١٨ معادلة", "618 formulas"), "f-acc-soft s-acc", "t-acc", 11.5, 1.0)}
      ${pill(mx(350), 228, 170, 34, tr("صفر #N/A", "zero #N/A"), "f-mint", "t-white", 11.5, 1.2)}
      ${cap(tr("نفس المعادلة… في مثال تاني", "the same formula… in another example"), 1.5, 290)}`;
    },
    pg_memos: () => {
      const a = mx(136), b = mx(370);
      return `${page(a, 140, 220, 220, "Returns_Q3.docx", [150, 170, 120], 0.05)}
      ${rowL(a, 150, ["ModelCode", "Jul", "Aug", "Sep"], 46, 20, "f-acc-soft", "t-acc", 7.5, 0.3)}${rowL(a, 174, ["M110", "14", "14", "6"], 46, 20, "f-s1", "t-ink", 7.5, 0.4)}
      <g ${an("fade", 0.6)}>${txt(a, 222, tr("الشهور أعمدة", "months as columns"), "t-amber", 10.5, b8)}</g>
      ${arrow(a + dirx() * 116, 174, b - dirx() * 90, 120, 0.8, "s-amber")}
      ${rowL(b, 72, ["Month", "ModelCode", "Units"], 54, 22, "f-mint", "t-white", 8, 0.9)}${[["2026-07", "14"], ["2026-08", "14"], ["2026-09", "6"]].map(([m, q], i) => rowL(b, 98 + i * 24, [m, "M110", q], 54, 20, "f-s1", "t-ink", 7.5, 1.0 + i * 0.1)).join("")}
      <g ${an("fade", 1.3)}>${txt(b, 190, tr("١٢ × ٣ = ٣٦ صف", "12 × 3 = 36 rows"), "t-ink", 11.5, b8)}${txt(b, 210, tr("المجموع ٢٨١ جهاز", "281 sets in all"), "t-mint", 10.5, b8)}</g>
      ${cap(tr("أعمدة للعين… وصفوف للجدول المحوري", "columns for the eye… rows for the pivot table"), 1.5, 290)}`;
    },
    pg_targets: () => {
      const T = [["Cairo", "75"], ["Alexandria", "47"], ["Delta", "63"], ["Export", "144"]];
      return `${rowL(240, 56, ["Channel", "TargetUnits", "TargetSales"], 120, 26, "f-acc-soft", "t-acc", 9, 0.05)}
      ${T.map(([c, v], i) => rowL(240, 86 + i * 26, [c, "…", v + ",000,000"], 120, 22, "f-s1", "t-ink", 9, 0.2 + i * 0.1)).join("")}
      <g ${an("rise", 0.8)}>${box(240, 214, 300, 40, "f-mint-soft s-mint")}${txt(240, 219, tr("المجموع ٣٢٩ مليون · التحقيق ١٠٠٫٢٪", "total 329 million · achievement 100.2%"), "t-mint", 11.5, b8)}</g>
      ${pill(240, 262, 330, 30, tr("نفس اسم القناة في Sales وTargets", "the same channel name in Sales and Targets"), "f-acc-soft s-acc", "t-acc", 10.5, 1.2)}
      ${cap(tr("نفس الاسم… في كل جدول", "the same name… in every table"), 1.5, 300)}`;
    },
    pg_sources: () => {
      const R = [["Sales_Cairo_Q3.xlsx", "71", "OK"], ["Export_Sales_2026-08.pdf", "41", "OK"], ["Shipments_2026-08.pdf", "4", "OK"], ["Targets_Q3.docx", "4", "OK"]];
      return `<g ${an("fade", 0.05)}>${txt(240, 34, tr("شيت Sources · ١١ ملف", "Sources sheet · 11 files"), "t-ink2", 12, b8)}</g>
      ${rowL(240, 60, ["File", "Rows", "Status"], 150, 24, "f-acc-soft", "t-acc", 9, 0.1)}
      ${R.map((r, i) => `${rowL(240, 88 + i * 26, r, 150, 22, ["f-s1", "f-s1", "f-mint-soft"], ["t-ink", "t-ink", "t-mint"], 8.5, 0.25 + i * 0.12)}`).join("")}
      <g ${an("fade", 0.9)}>${txt(240, 210, tr("اتشحن = اتباع · ١٢ من ١٢ OK", "shipped = sold · 12 of 12 OK"), "t-ink", 12, b8)}</g>
      ${pill(240, 252, 350, 32, tr("واختبار: غيّر رقم في PDF نسخة ← وقفت", "and a test: change a PDF copy → it stopped"), "f-mint", "t-white", 10.5, 1.2)}
      ${cap(tr("مصدرين… ونفس الرقم", "two sources… one figure"), 1.5, 296)}`;
    },
    pg_cliff: () => {
      const a = mx(120), b = mx(360), d = dirx();
      return `<g ${an("rise", 0.05)}>${grid(a, 100, 4, 8, 30, 14, "f-s1", -1, 0.05)}${txt(a, 176, "Q3_Commercial_DB", "t-ink", 11, b8 + ' direction="ltr"')}</g>
      ${arrow(a + d * 76, 100, b - d * 70, 100, 0.5, "s-acc", "6 5")}
      <g ${an("pop", 0.8)}>${ofc(b, 100, "ppt", 2)}</g><g ${an("fade", 1.0)}>${txt(b, 158, tr("٨ شرائح · الأحد", "8 slides · Sunday"), "t-amber", 12, b8)}</g>
      <g ${an("pop", 1.2)}><circle cx="${b + d * 44}" cy="64" r="16" class="f-acc"/>${txt(b + d * 44, 70, ar() ? "؟" : "?", "t-white", 18, b8)}</g>
      ${pill(240, 236, 330, 34, tr("الجدول جاهز… العرض يتعمل لوحده إزاي؟", "the table is ready… how does the deck build itself?"), "f-acc-soft s-acc", "t-acc", 11, 1.4)}
      ${cap(tr("جدول واحد… وكل حاجة تتبني عليه", "one table… and everything builds on it"), 1.6, 290)}`;
    },

    /* ----- example 2, part 2: the PowerPoint deck (data/slides-story.js) ----- */
    pp_sunday: () => {
      const a = mx(120), b = mx(352);
      return `<g ${an("rise", 0.05)}>${ofc(a - 30, 80, "xl", 1.1)}${ofc(a + 30, 80, "ppt", 1.1)}${arrow(a - 10, 80, a + 10, 80, 0.3)}${txt(a, 126, tr("نسخ ولصق · يوم كامل", "copy and paste · a whole day"), "t-ink2", 11, b8)}</g>
      <g ${an("rise", 0.5)}>${box(b - 50, 92, 90, 64, "f-s1 s-line2")}${txt(b - 50, 76, tr("شريحة ٣", "slide 3"), "t-ink3", 9.5, bold)}${txt(b - 50, 104, n_("134.1"), "t-ink", 14, b8)}</g>
      <g ${an("rise", 0.7)}>${box(b + 50, 92, 90, 64, "f-s1 s-rose")}${txt(b + 50, 76, tr("شريحة ٥", "slide 5"), "t-ink3", 9.5, bold)}${txt(b + 50, 104, n_("128.7"), "t-rose", 14, b8)}</g>
      <g ${an("pop", 1.0)}>${txt(b, 102, "≠", "t-rose", 22, b8)}</g>
      ${pill(240, 196, 340, 36, tr("رقمين لنفس الحاجة ← الثقة ضاعت", "two numbers for one thing → trust lost"), "f-rose-soft s-rose", "t-rose", 11.5, 1.2)}
      ${pill(240, 246, 340, 34, tr("المرة دي: ملف واحد مراجَع", "this time: one checked workbook"), "f-mint", "t-white", 11.5, 1.5)}
      ${cap(tr("مصدر واحد… ولا رقمين مختلفين", "one source… never two different numbers"), 1.8, 296)}`;
    },
    pp_rates: () => {
      const R = [[tr("التحقيق", "achievement"), "Sales ÷ Target"], [tr("النولون للجهاز", "freight per set"), "FreightEGP ÷ Units"], [tr("المرتجعات", "return rate"), "Returns ÷ Qty"]];
      const A_ = [["Alexandria", 108.6], ["Export", 103.0], ["Cairo", 96.6], ["Delta", 91.8]];
      return `${R.map(([n, f], i) => `<g ${an("rise", 0.1 + i * 0.2)}>${box(mx(124), 60 + i * 50, 196, 40, "f-acc-soft s-acc")}${txt(mx(124), 56 + i * 50, n, "t-acc", 11, b8)}${txt(mx(124), 72 + i * 50, f, "t-ink2", 9.5, bold + ' direction="ltr"')}</g>`).join("")}
      ${A_.map(([c, v], i) => `<g ${an("rise", 0.8 + i * 0.12)}><text x="${ar() ? 220 : 260}" y="${60 + i * 34}" class="t-ink2" font-size="10" font-weight="800" text-anchor="start" direction="ltr">${c}</text></g>${grow(260, 66 + i * 34, (v / 110) * 160, 10, v >= 100 ? "f-mint" : "f-amber", 0.9 + i * 0.12)}<g ${an("fade", 1.2 + i * 0.1)}>${txt(ar() ? 480 - 260 - (v / 110) * 160 - 22 : 260 + (v / 110) * 160 + 22, 76 + i * 34, n_(String(v)) + "%", v >= 100 ? "t-mint" : "t-amber", 10, b8 + ' direction="ltr"')}</g>`).join("")}
      ${pill(240, 246, 330, 32, tr("كل نسبة بتتحسب في مكان واحد بس", "every rate is worked out in one place"), "f-mint-soft s-mint", "t-mint", 11, 1.6)}
      ${cap(tr("كل نسبة ليها بيت واحد", "every rate has one home"), 1.8, 292)}`;
    },
    pp_check: () => {
      const a = mx(130), b = mx(350);
      return `${card(a, 92, 170, 70, tr("٣٢٩٫٦ م", "329.6 M"), tr("الجدول المحوري", "the pivot table"), 0.1, "f-s1 s-acc", "t-acc", 18)}
      ${card(b, 92, 170, 70, tr("٣٢٩٫٦ م", "329.6 M"), tr("شيت Sales", "the Sales sheet"), 0.4, "f-s1 s-ink3", "t-ink", 18)}
      <g ${an("pop", 0.8)}>${txt(240, 100, "=", "t-mint", 30, b8)}</g>
      ${arrow(240, 140, 240, 176, 1.0, "s-mint")}
      <g ${an("pop", 1.2)}>${ofc(240, 206, "ppt", 1.3)}${txt(240 + dirx() * 96, 211, tr("وبعدين بس العرض", "only then the deck"), "t-mint", 11.5, b8)}</g>
      ${pill(240, 262, 300, 30, tr("مختلفين؟ توقف… ومفيش عرض", "different? it stops… no deck"), "f-rose-soft s-rose", "t-rose", 11, 1.5)}
      ${cap(tr("مفيش عرض… من غير مراجعة", "no deck… without the check"), 1.8, 300)}`;
    },
    pp_outline: () => {
      const S = ar() ? ["العنوان", "أهم ٤ أرقام", "قصاد المستهدف", "الاتجاه", "التصدير", "اللوجستيات", "المرتجعات", "للنقاش"] : ["Title", "4 key figures", "vs target", "trend", "export", "logistics", "returns", "discussion"];
      const X = rowX(4, 100, 10);
      return `${S.map((s, i) => `<g ${an("pop", 0.1 + i * 0.1)}>${box(X(i % 4), 72 + Math.floor(i / 4) * 78, 96, 60, i === 7 ? "f-s2 s-ink3" : "f-s1 s-amber")}${txt(X(i % 4), 64 + Math.floor(i / 4) * 78, digits(i + 1), "t-amber", 12, b8)}${txt(X(i % 4), 86 + Math.floor(i / 4) * 78, s, "t-ink", 10, b8)}</g>`).join("")}
      <g ${an("rise", 1.0)}>${bubble(mx(150), 240, 220, 44, "f-acc-soft s-acc", !ar())}${txt(mx(150), 245, tr("«زوّد النولون في ٢»", "“add freight to slide 2”"), "t-acc", 11, b8)}</g>
      <g ${an("fade", 1.3)}>${txt(mx(372), 236, tr("تعديل سطر: دقيقة", "a line's change: a minute"), "t-mint", 11, b8)}${txt(mx(372), 254, tr("تعديل عرض: ساعة", "a deck's change: an hour"), "t-rose", 11, b8)}</g>
      ${cap(tr("الهيكل نص الأول… والشرايح بعده", "the outline as text first… slides after"), 1.5, 300)}`;
    },
    pp_com: () => {
      const X = rowX(3, 110, 30);
      return `${["xl", "doc", "ppt"].map((k, i) => `<g ${an("pop", 0.1 + i * 0.3)}>${ofc(X(i), 84, k, 1.6)}${txt(X(i), 134, [tr("الوحدة ٢", "unit 2"), tr("الدرس اللي فات", "last lesson"), tr("دلوقتي", "now")][i], "t-ink2", 11, b8)}</g>`).join("")}
      <g ${an("rise", 1.0)}>${box(240, 210, 380, 70, "f-s2 s-line2")}${txt(240, 198, tr("نفس القواعد للتلاتة:", "the same rules for all three:"), "t-ink", 12, b8)}${txt(240, 220, tr("افتح · اشتغل · اقفل · حرّر الذاكرة", "open · work · close · release"), "t-acc", 12, b8)}</g>
      ${cap(tr("٣ برامج… نفس القواعد", "3 programs… the same rules"), 1.4, 290)}`;
    },
    pp_picture: () => {
      const a = mx(130), b = mx(350);
      return `<g ${an("rise", 0.05)}>${box(a, 104, 170, 120, "f-s1 s-rose")}${txt(a, 64, tr("رابط بالإكسل", "a link to Excel"), "t-rose", 11.5, b8)}<rect x="${a - 56}" y="78" width="112" height="70" rx="4" class="f-s2" stroke-dasharray="5 4"/>${txt(a, 118, tr("الملف مش موجود", "file not found"), "t-rose", 10.5, b8)}</g>${check(a + dirx() * 76, 50, 0.4, false)}
      <g ${an("rise", 0.5)}>${box(b, 104, 170, 120, "f-s1 s-mint")}${txt(b, 64, tr("صورة ثابتة", "a fixed picture"), "t-mint", 11.5, b8)}</g>${cols(b - 50, 148, [3, 5, 4, 6], 16, 10, 6, 60, 0.7, "f-mint")}${check(b + dirx() * 76, 50, 0.9)}
      <g ${an("fade", 1.1)}>${txt(240, 206, tr("كل ربع العرض بيتعمل من الأول…", "every quarter the deck is rebuilt…"), "t-ink2", 11, bold)}${txt(240, 224, tr("فالصور دايمًا جديدة", "so the pictures are always fresh"), "t-ink2", 11, bold)}</g>
      ${cap(tr("العرض بيتبعت لوحده… فلازم يكفي نفسه", "a deck travels alone… so it must stand alone"), 1.4, 280)}`;
    },
    pp_numbers: () => {
      const s = mx(150), p = mx(364);
      return `<g ${an("rise", 0.05)}>${box(s, 130, 230, 170, "f-s1 s-amber", 2.5)}${txt(s, 62, tr("شريحة ٣", "slide 3"), "t-amber", 11.5, b8)}</g>
      ${cols(s - 80, 160, [108.6, 103.0, 96.6, 91.8], 26, 16, 108.6, 74, 0.3, ["f-mint", "f-mint", "f-amber", "f-amber"])}
      <g ${an("fade", 0.6)}>${["108.6", "103.0", "96.6", "91.8"].map((v, i) => `<text x="${s - 67 + i * 42}" y="${190}" class="t-ink" font-size="9" font-weight="800" text-anchor="middle" direction="ltr">${v}%</text>`).join("")}</g>
      <g ${an("rise", 0.8)}>${box(p, 120, 130, 60, "f-acc-soft s-acc")}${txt(p, 116, tr("الجدول المحوري", "pivot table"), "t-acc", 11, b8)}${txt(p, 134, tr("وقت التشغيل", "at run time"), "t-ink2", 10, bold)}</g>
      <path ${an("draw", 1.0, "s-acc")} pathLength="1" d="M${p - dirx() * 66} 130 L${s + dirx() * 118} 150" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      ${pill(240, 252, 330, 32, tr("مش من الـ Prompt ولا من ذاكرة النموذج", "not from the Prompt or the model's memory"), "f-mint-soft s-mint", "t-mint", 10.5, 1.3)}
      ${cap(tr("الشريحة بتقرا… ما بتحفظش", "the slide reads… it doesn't memorise"), 1.5, 296)}`;
    },
    pp_empty: () => {
      const a = mx(130), b = mx(350);
      return `<g ${an("rise", 0.05)}>${box(a, 110, 180, 130, "f-s1 s-rose")}${txt(a, 66, tr("اقتراح النموذج", "the model's offer"), "t-rose", 11, b8)}${txt(a, 98, tr("«زوّدوا الحوافز…»", "“raise incentives…”"), "t-ink3", 10.5, bold)}${txt(a, 118, tr("«قلّلوا الشحن…»", "“cut freight…”"), "t-ink3", 10.5, bold)}</g>${check(a + dirx() * 82, 50, 0.4, false)}
      <g ${an("rise", 0.6)}>${box(b, 110, 180, 130, "f-s1 s-mint")}${txt(b, 66, tr("الشريحة ٨: للنقاش", "slide 8: for discussion"), "t-mint", 11, b8)}<rect x="${b - 70}" y="84" width="140" height="70" rx="4" class="f-s2" stroke-dasharray="5 4"/></g>
      <g ${an("rise", 1.0)}>${person(b, 236, 0.9, "f-acc")}${txt(b + dirx() * 0, 268, tr("المدير بيكتبها", "the director writes it"), "t-acc", 11, b8)}</g>
      <g ${an("fade", 1.2)}>${txt(a, 210, tr("الأداة للأرقام", "the tool: the figures"), "t-ink", 11.5, b8)}${txt(a, 230, tr("المدير للقرار", "the director: the decision"), "t-ink", 11.5, b8)}</g>
      ${cap(tr("الأداة للأرقام… والقرار للمدير", "the tool for the figures… the decision for the director"), 1.5, 300)}`;
    },
    pp_decimal: () => {
      return `<g ${an("rise", 0.05)}>${box(240, 76, 300, 64, "f-s1 s-rose")}${txt(240, 70, tr("الشريحة ٧ · M110", "slide 7 · M110"), "t-ink3", 10.5, bold)}${txt(240, 92, "2.374301%", "t-rose", 18, b8 + ' direction="ltr"')}</g>
      ${arrow(240, 114, 240, 146, 0.5, "s-mint")}
      <g ${an("pop", 0.7)}>${box(240, 174, 300, 50, "f-s1 s-mint")}${txt(240, 181, n_("2.4") + "%", "t-mint", 18, b8 + ' direction="ltr"')}</g>
      <g ${an("fade", 1.0)}>${txt(240, 228, tr("نسب: خانة عشرية واحدة · مبالغ: فاصل آلاف", "rates: one decimal · amounts: separators"), "t-ink", 11, b8)}${txt(240, 248, tr("الشريحة ٢: بالمليون", "slide 2: in millions"), "t-ink2", 11, bold)}</g>
      ${cap(tr("الرقم الصح… محتاج شكل صح", "a right figure… needs a right format"), 1.3, 290)}`;
    },
    pp_test: () => {
      const a = mx(120), b = mx(360), d = dirx();
      return `<g ${an("rise", 0.05)}>${rowL(a, 80, ["Delta", "Sep", "+1,000,000"], 58, 26, ["f-s1", "f-s1", "f-amber-soft"], ["t-ink", "t-ink", "t-amber"], 8.5, 0.05)}${txt(a, 122, tr("نسخة من شيت Sales", "a copy of Sales"), "t-ink2", 11, b8)}</g>
      ${arrow(a + d * 100, 80, b - d * 76, 80, 0.5)}
      <g ${an("pop", 0.8)}>${box(b, 84, 140, 72, "f-s1 s-mint")}${txt(b, 76, "Delta", "t-ink2", 11, b8 + ' direction="ltr"')}${txt(b, 100, tr("من ٩١٫٨٪ لـ ٩٣٫٤٪", "91.8% → 93.4%"), "t-mint", 12, b8)}</g>
      <g ${an("fade", 1.1)}>${txt(240, 172, tr("والإجمالي في الشريحة ٢ زاد مليون", "and slide 2's total rose by a million"), "t-ink", 11.5, b8)}</g>
      ${pill(240, 222, 330, 34, tr("رجّع الرقم ← رجع العرض", "put it back → the deck goes back"), "f-acc-soft s-acc", "t-acc", 11.5, 1.3)}
      ${cap(tr("لو اتغيّر معاه… يبقى مربوط", "if it moves with it… it's connected"), 1.6, 280)}`;
    },
    pp_pdf: () => {
      const a = mx(150), b = mx(330);
      return `<g ${an("pop", 0.05)}>${ofc(a, 90, "ppt", 2)}${txt(a, 148, "Review.pptx", "t-amber", 11, b8 + ' direction="ltr"')}${txt(a, 166, tr("للاجتماع والتعديل", "for the meeting, editing"), "t-ink2", 10.5, bold)}</g>
      <g ${an("pop", 0.4)}>${ofc(b, 90, "pdf", 2)}${txt(b, 148, "Review.pdf", "t-rose", 11, b8 + ' direction="ltr"')}${txt(b, 166, tr("للموبايل", "for the phone"), "t-ink2", 10.5, bold)}</g>
      ${term(240, 226, 360, 56, ["8 slides · 6 charts", "24 numbers read from pivot tables"], 0.8, 10.5)}
      ${cap(tr("ملف للتعديل… وPDF للقراية", "a file to edit… a PDF to read"), 1.4, 290)}`;
    },
    pp_cliff: () => {
      const c = mx(120), f = mx(360), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(c, 92, 120, 80, "f-acc-soft s-acc")}${txt(c, 90, tr("الشات", "the chat"), "t-acc", 12.5, b8)}</g>
      <g ${an("rise", 0.2)}>${folder(f, 92, 120, 80)}${txt(f, 100, "Data", "t-amber", 12, b8 + ' direction="ltr"')}</g>
      ${[0, 1, 2].map((k) => `<path ${an("draw", 0.4 + k * 0.2, k % 2 ? "s-amber" : "s-acc")} pathLength="1" d="M${c + d * 64} ${78 + k * 14} L${f - d * 64} ${78 + k * 14}" stroke-width="2" fill="none" marker-end="url(#aih-arrow)"/>`).join("")}
      <g ${an("rise", 0.9)}>${person(240, 214, 1.1, "f-ink2")}</g>
      <g ${an("fade", 1.1)}>${txt(240, 252, tr("٣٤ رسالة رايحة جاية", "34 messages back and forth"), "t-rose", 12, b8)}</g>
      ${pill(240, 284, 330, 30, tr("طب لو المساعد يشتغل جوّه الفولدر؟", "what if the assistant worked in the folder?"), "f-acc-soft s-acc", "t-acc", 11, 1.4)}`;
    },

    /* ----- Claude Code (data/code-story.js) ----- */
    cc_middle: () => {
      const c = mx(90), f = mx(390);
      return `<g ${an("rise", 0.05)}>${box(c, 120, 110, 120, "f-acc-soft s-acc")}${txt(c, 92, tr("الشات", "the chat"), "t-acc", 12, b8)}${txt(c, 128, tr("بيكتب", "writes"), "t-ink2", 11, bold)}</g>
      <g ${an("rise", 0.15)}>${folder(f, 120, 110, 100)}${txt(f, 128, "Data", "t-amber", 12, b8 + ' direction="ltr"')}</g>
      <g ${an("rise", 0.3)}>${person(240, 146, 1.2, "f-ink2")}</g>
      ${[tr("نسخ", "copy"), tr("حفظ", "save"), tr("تشغيل", "run"), tr("الرسالة", "message")].map((s, i) => `<g ${an("fade", 0.5 + i * 0.2)}>${txt(i % 2 ? mx(160) : mx(320), 70 + Math.floor(i / 2) * 120, s, "t-ink2", 11, b8)}</g>`).join("")}
      <g ${an("pop", 1.3)}>${txt(240, 236, n_("34"), "t-rose", 26, b8)}${txt(240, 258, tr("رسالة", "messages"), "t-rose", 11.5, b8)}</g>
      ${cap(tr("نفس النموذج… بس جوّه الفولدر", "the same model… inside the folder"), 1.6, 296)}`;
    },
    cc_loop: () => {
      const S = ar() ? ["يقرا الملفات", "يكتب الأداة", "يشغّل", "يصلّح"] : ["reads the files", "writes the tool", "runs it", "fixes it"], P = [[240, 60], [370, 140], [240, 220], [110, 140]];
      return `<g ${an("fade", 0.05)}><circle cx="240" cy="140" r="80" class="s-acc" stroke-width="2.5" stroke-dasharray="6 6" fill="none"/></g>
      ${S.map((s, i) => `<g ${an("pop", 0.2 + i * 0.25)}>${box(ar() ? 480 - P[i][0] : P[i][0], P[i][1], 116, 36, i === 3 ? "f-amber-soft s-amber" : "f-acc-soft s-acc")}${txt(ar() ? 480 - P[i][0] : P[i][0], P[i][1] + 5, s, i === 3 ? "t-amber" : "t-acc", 11, b8)}</g>`).join("")}
      <g ${an("pop", 1.3)}>${person(240, 160, 0.9, "f-mint")}${txt(240, 178, tr("إنت بتوافق", "you approve"), "t-mint", 10.5, b8)}</g>
      ${cap(tr("الشات بيقترح… وClaude Code بينفّذ ويستأذن", "chat suggests… Claude Code does, and asks"), 1.5, 290)}`;
    },
    cc_places: () => {
      const X = rowX(4, 100, 12), N = [tr("الويب", "the web"), tr("سطح المكتب", "desktop app"), tr("الطرفية", "terminal"), tr("المحرر", "the editor")], S = ["claude.ai/code", "Code tab", "claude", "VS Code · JetBrains"];
      const ic = (i, x) => i === 0 ? `<circle cx="${x}" cy="84" r="20" class="s-sky" stroke-width="2.5" fill="none"/><path d="M${x - 20} 84 h40 M${x} 64 q-12 20 0 40 q12 -20 0 -40" class="s-sky" stroke-width="2" fill="none"/>`
        : i === 1 ? laptop(x, 86, 0.7) : i === 2 ? `<rect x="${x - 24}" y="64" width="48" height="40" rx="5" class="f-ink2"/>${mono(x - 16, 88, ">_", "t-crt", 12)}` : `<rect x="${x - 24}" y="64" width="48" height="40" rx="5" class="f-s1 s-acc" stroke-width="2"/>${[0, 1, 2].map((k) => `<rect x="${x - 16}" y="${72 + k * 10}" width="${[30, 22, 26][k]}" height="4" rx="2" class="f-acc-soft"/>`).join("")}`;
      return `${N.map((n, i) => `<g ${an("rise", 0.1 + i * 0.2)}>${ic(i, X(i))}${txt(X(i), 134, n, "t-ink", 11.5, b8)}${txt(X(i), 152, S[i], "t-ink3", 8.5, bold + ' direction="ltr"')}</g>`).join("")}
      <g ${an("rise", 1.1)}>${box(240, 214, 400, 46, "f-mint-soft s-mint")}${txt(240, 219, tr("نفس المحرك: الموديلات وCLAUDE.md والمهارات", "one engine: models, CLAUDE.md, skills"), "t-mint", 11.5, b8)}</g>
      ${cap(tr("محرك واحد… ٤ أبواب", "one engine… 4 doors"), 1.4, 280)}`;
    },
    cc_webpc: () => {
      const a = mx(124), b = mx(356);
      return `<g ${an("rise", 0.05)}><path d="M${a - 60} 104 q0 -30 30 -30 q10 -24 40 -18 q30 -10 42 18 q30 4 26 30z" class="s-sky" stroke-width="2.4" fill="none"/>${txt(a, 96, "GitHub", "t-acc", 12, b8 + ' direction="ltr"')}</g>
      <g ${an("fade", 0.3)}>${[tr("بيكمّل وإنت قافل", "carries on while closed"), tr("كذا مهمة مع بعض", "several tasks at once"), tr("تتابع من الموبايل", "follow from your phone")].map((s, i) => txt(a, 140 + i * 20, s, "t-ink2", 10.5, bold)).join("")}</g>
      <g ${an("rise", 0.5)}>${laptop(b, 92, 1.1)}${txt(b, 140, tr("ملفات جهازك", "your laptop's files"), "t-amber", 11.5, b8)}${txt(b, 160, tr("أرقام الشركة ما بتخرجش", "company figures stay"), "t-ink2", 10.5, bold)}</g>
      ${pill(240, 236, 300, 36, tr("الملفات فين؟… هناك يشتغل", "where are the files?… it works there"), "f-mint", "t-white", 12, 1.0)}
      ${cap(tr("الويب للمستودعات · الجهاز لملفاتك", "the web for repositories · the PC for your files"), 1.3, 292)}`;
    },
    cc_first: () => {
      const a = mx(130), b = mx(352);
      return `<g ${an("rise", 0.05)}>${folder(a - 26, 84, 90, 64)}${folder(a + 26, 100, 90, 64, "f-mint-soft s-mint")}${txt(a, 160, tr("نسخة من الفولدر", "a copy of the folder"), "t-mint", 11.5, b8)}</g>
      ${term(b, 70, 190, 40, ["> /init"], 0.4, 12)}
      <g ${an("rise", 0.8)}>${page(b, 168, 190, 140, "CLAUDE.md", [], 0.8, "f-s1 s-acc")}${txt(b, 158, tr("Data للقراية بس", "Data is read-only"), "t-ink", 10.5, b8)}${txt(b, 178, tr("الناتج في Output", "output goes to Output"), "t-ink", 10.5, b8)}${txt(b, 198, tr("ممنوع الإرسال برّه الجهاز", "nothing leaves the laptop"), "t-acc", 10.5, b8)}</g>
      <g ${an("fade", 1.1)}>${txt(a, 210, tr("بيتقري في أول", "read at the start"), "t-ink2", 11, bold)}${txt(a, 228, tr("كل جلسة", "of every session"), "t-ink2", 11, bold)}</g>
      ${cap(tr("نسخة… وقواعد مكتوبة", "a copy… and written rules"), 1.4, 292)}`;
    },
    cc_modes: () => {
      const M = ar() ? [["وضع الخطة", "يقرا ويخطط بس"], ["الافتراضي", "يستأذن قبل أي تعديل"], ["قبول التعديلات", "يعدّل، ويستأذن في الأوامر"], ["التلقائي", "يكمّل في الآمن لوحده"]] : [["Plan mode", "reads and plans only"], ["Default", "asks before any edit"], ["Accept edits", "edits; asks about commands"], ["Auto", "carries on in safe matters"]];
      return `${M.map(([n, s], i) => `<g ${an("rise", 0.1 + i * 0.2)}>${grow(70, 40 + i * 54, 90 + i * 70, 30, i === 0 ? "f-mint" : "f-acc-soft", 0.1 + i * 0.2)}<g ${an("fade", 0.2 + i * 0.2)}>${txt(mx(70 + (90 + i * 70) / 2), 60 + i * 54, n, i === 0 ? "t-white" : "t-acc", 11, b8)}${txt(mx(70 + (90 + i * 70) / 2), 84 + i * 54, s, "t-ink2", 10, bold)}</g></g>`).join("")}
      <g ${an("fade", 1.1)}>${txt(mx(110), 268, tr("أضيق صلاحية", "narrowest"), "t-mint", 11, b8)}${txt(mx(370), 268, tr("أوسع صلاحية", "widest"), "t-amber", 11, b8)}</g>
      ${cap(tr("الصلاحية بتكبر مع الثقة", "access grows with trust"), 1.3, 300)}`;
    },
    cc_plan: () => {
      const a = mx(140), b = mx(356);
      return `<g ${an("rise", 0.05)}>${page(a, 140, 220, 220, tr("الخطة · ٦ خطوات", "The plan · 6 steps"), [], 0.05, "f-s1 s-mint")}</g>
      ${[tr("قريت الـ ١١ ملف:", "read the 11 files:"), tr("Sales بعمودين VLOOKUP", "Sales with 2 VLOOKUPs"), "Shipments · Returns", "Targets · Sources"].map((s, i) => `<g ${an("fade", 0.3 + i * 0.2)}>${txt(a, 84 + i * 26, s, i ? "t-mint" : "t-ink", 11, b8)}</g>`).join("")}
      <g ${an("fade", 1.1)}>${txt(a, 196, tr("١ اقرا · ٢ اجمع · …", "1 read · 2 gather · …"), "t-ink3", 10.5, bold)}</g>
      <g ${an("rise", 1.3)}>${bubble(b, 110, 190, 56, "f-acc-soft s-acc", ar())}${txt(b, 104, tr("«زوّد: اللي اتشحن", "“add: shipped"), "t-acc", 11, b8)}${txt(b, 122, tr("= اللي اتباع»", "= sold”"), "t-acc", 11, b8)}</g>
      <g ${an("pop", 1.6)}>${person(b, 216, 1, "f-ink2")}</g>${check(b + dirx() * 40, 176, 1.8)}
      ${cap(tr("شاف الملفات… قبل ولا سطر كود", "it saw the files… before a line of code"), 1.9, 296)}`;
    },
    cc_models: () => {
      const M = [["Fable 5.1", tr("الأقوى · مهام طويلة وغامضة", "most capable · long, ambiguous"), "f-acc-deep"], ["Opus 5.5", tr("الافتراضي · تفكير معقّد", "the default · complex reasoning"), "f-acc"], ["Sonnet 5.5", tr("الشغل اليومي", "everyday work"), "f-acc-soft2"], ["Haiku 5.5", tr("الأسرع · حاجات بسيطة", "fastest · simple things"), "f-mint"]];
      return `<g ${an("fade", 0.05)}>${term(mx(104), 40, 120, 32, ["> /model"], 0.05, 11)}</g>
      ${M.map(([n, s, c], i) => `<g ${an("rise", 0.2 + i * 0.18)}><rect x="${ar() ? 480 - 70 - 120 : 70}" y="${72 + i * 46}" width="120" height="34" rx="10" class="${c}"/>${txt(mx(130), 94 + i * 46, n, "t-white", 12, b8 + ' direction="ltr"')}${txt(mx(320), 94 + i * 46, s, "t-ink", 11, b8)}</g>`).join("")}
      ${pill(240, 272, 300, 30, tr("الأكبر مش دايمًا الأحسن", "bigger isn't always better"), "f-mint-soft s-mint", "t-mint", 11.5, 1.2)}
      ${cap(tr("الموديل على قد الشغلة", "the model fits the job"), 1.4, 306)}`;
    },
    cc_effort: () => {
      const E = ["low", "medium", "high", "xhigh", "max"], X = rowX(5, 80, 8);
      const S = ar() ? ["تعديل صغير", "أغلب الشغل", "فخاخ ومراجعة", "أعمق وأغلى", "الأصعب جدًا"] : ["small edit", "most work", "traps, checks", "deeper, dearer", "hardest only"];
      return `<g ${an("fade", 0.05)}>${term(mx(104), 40, 130, 32, ["> /effort"], 0.05, 11)}</g>
      ${E.map((e, i) => `<g ${an("rise", 0.2 + i * 0.15)}><rect x="${X(i) - 36}" y="${190 - 24 - i * 22}" width="72" height="${24 + i * 22}" rx="6" class="${i === 1 ? "f-acc" : i === 2 ? "f-mint" : "f-acc-soft"}"/>${txt(X(i), 210, e, "t-ink", 11, b8 + ' direction="ltr"')}${txt(X(i), 228, S[i], "t-ink2", 9, bold)}</g>`).join("")}
      <g ${an("fade", 1.1)}>${txt(X(1), 156, tr("الافتراضي", "default"), "t-white", 9, b8)}</g>
      ${pill(240, 266, 340, 30, tr("الأداة على high والألوان على low", "the tool on high · colours on low · /fast for speed"), "f-s2 s-line2", "t-ink", 10, 1.3)}
      ${cap(tr("فكّر على قد الغلطة", "think as much as the mistake costs"), 1.5, 304)}`;
    },
    cc_around: () => {
      const T = [["CLAUDE.md", tr("قواعد كل جلسة", "rules, every session")], [tr("المهارات", "Skills"), tr("طرق شغل محفوظة", "saved methods")], [tr("المساعدين", "Helpers"), tr("مهمة متقسّمة", "a split task")], ["MCP", tr("وصلات بأدوات تانية", "links to other tools")], [tr("المواعيد", "Schedules"), tr("بيتكرر لوحده", "repeats by itself")]];
      const P = [[240, 52], [390, 116], [340, 232], [140, 232], [90, 116]];
      return `<g ${an("pop", 0.05)}><circle cx="240" cy="148" r="34" class="f-acc"/>${txt(240, 146, "Claude", "t-white", 11, b8 + ' direction="ltr"')}${txt(240, 161, "Code", "t-white", 11, b8 + ' direction="ltr"')}</g>
      ${T.map(([n, s], i) => { const x = ar() ? 480 - P[i][0] : P[i][0], y = P[i][1];
        return `<path ${an("draw", 0.3 + i * 0.15, "s-line2")} pathLength="1" d="M240 148 L${x} ${y}" stroke-width="1.8" fill="none"/><g ${an("pop", 0.4 + i * 0.15)}>${box(x, y, 124, 46, "f-s1 s-acc")}${txt(x, y - 3, n, "t-acc", 11, b8)}${txt(x, y + 14, s, "t-ink2", 9, bold)}</g>`; }).join("")}
      ${cap(tr("كل أداة حواليه… شغل بيتكرر من غيرك", "every tool around it… work repeating without you"), 1.4, 296)}`;
    },
    cc_safe: () => {
      const R = ar() ? ["اشتغل على نسخة", "اقرا الخطة قبل الموافقة", "مفيش ملفات سرية على الويب", "راجع النتيجة بنفسك"] : ["work on a copy", "read the plan before approving", "no confidential files on the web", "check the result yourself"];
      return `<g ${an("pop", 0.05)}>${card(240, 56, 200, 52, tr("٢٥ دقيقة", "25 minutes"), tr("١٣٥ شحنة · ٢٥٬٢٧٦ جهاز", "135 shipments · 25,276 sets"), 0.05, "f-mint-soft s-mint", "t-mint", 16)}</g>
      ${R.map((s, i) => `<g ${an("rise", 0.4 + i * 0.2)}>${box(240, 116 + i * 40, 320, 32, "f-s1 s-line2")}<circle cx="${mx(102)}" cy="${116 + i * 40}" r="11" class="f-acc"/>${txt(mx(102), 120 + i * 40, digits(i + 1), "t-white", 11, b8)}${txt(250, 120 + i * 40, s, "t-ink", 11, b8)}</g>`).join("")}
      ${cap(tr("أسرع… والمراجعة لسه عليك", "faster… and the check is still yours"), 1.4, 300)}`;
    },
    cc_cliff: () => {
      const a = mx(130), b = mx(352), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(a, 100, 180, 130, "f-s1 s-line2")}${txt(a, 52, tr("اللي اتعلمه", "what it learned"), "t-ink", 11.5, b8)}${[tr("Sales بعمودين VLOOKUP", "Sales + 2 VLOOKUPs"), tr("الشحنات لوحدها", "shipments apart"), tr("المرتجعات صفوف", "returns as rows"), tr("اتشحن = اتباع", "shipped = sold")].map((s, i) => txt(a, 80 + i * 22, s, "t-ink2", 10.5, bold)).join("")}</g>
      <g ${an("fade", 0.8)}><rect x="${a - 90}" y="35" width="180" height="130" rx="12" class="f-s2" opacity="0.7"/></g>
      ${arrow(a + d * 96, 100, b - d * 80, 100, 1.0, "s-rose", "6 5")}
      <g ${an("pop", 1.2)}>${box(b, 100, 150, 70, "f-s1 s-acc")}${txt(b, 96, tr("جلسة جديدة", "a new session"), "t-acc", 12, b8)}${txt(b, 116, tr("ما بتفتكرش", "remembers nothing"), "t-rose", 10.5, b8)}</g>
      <g ${an("rise", 1.4)}>${person(b, 236, 0.9, "f-ink2")}${txt(b + d * 0, 268, tr("الزميل في الإجازة", "the colleague covering"), "t-ink2", 10.5, b8)}</g>
      ${cap(tr("الجلسة بتخلص… والطريقة لازم تفضل", "the session ends… the method must stay"), 1.6, 300)}`;
    },

    /* ----- skills (data/skill-story.js) ----- */
    sk_lost: () => {
      const a = mx(126), b = mx(352), d = dirx();
      return `<g ${an("rise", 0.05)}>${[0, 1, 2, 3].map((k) => fileIcon(a - 36 + k * 24, 80, "s-acc", 0.05 + k * 0.08)).join("")}${txt(a, 120, tr("تقارير أكتوبر", "October's reports"), "t-ink", 11.5, b8)}</g>
      <g ${an("rise", 0.4)}>${bubble(b, 76, 200, 60, "f-s1 s-ink3", ar())}${txt(b, 68, tr("«أنهي داشبورد؟", "“which dashboard?"), "t-ink", 11, b8)}${txt(b, 86, tr("القواعد إيه؟»", "what are the rules?”"), "t-ink", 11, b8)}</g>
      <g ${an("rise", 0.8)}>${box(a, 200, 170, 70, "f-s2 s-line2")}${txt(a, 192, tr("المحادثة القديمة", "the old chat"), "t-ink3", 11, b8)}${txt(a, 212, tr("قفلت", "closed"), "t-rose", 11, b8)}</g>
      <g ${an("rise", 1.0)}>${person(b, 230, 1, "f-ink2")}${txt(b, 268, tr("نص ساعة على التليفون", "half an hour on the phone"), "t-rose", 11, b8)}</g>
      ${cap(tr("اللي في المحادثة… بيضيع معاها", "what's in the chat… is lost with it"), 1.4, 300)}`;
    },
    sk_what: () => {
      const f = mx(140), s = mx(352);
      return `<g ${an("rise", 0.05)}>${folder(f, 120, 170, 130)}${txt(f, 96, "production-", "t-amber", 11, b8 + ' direction="ltr"')}${txt(f, 112, "dashboard", "t-amber", 11, b8 + ' direction="ltr"')}${fileIcon(f, 150, "s-acc", 0.3)}</g>
      <g ${an("fade", 0.3)}>${txt(f, 206, "project\\.claude\\skills", "t-ink3", 10, bold + ' direction="ltr"')}</g>
      ${arrow(f + dirx() * 90, 120, s - dirx() * 100, 120, 0.6)}
      <g ${an("rise", 0.8)}>${box(s, 130, 190, 170, "f-s1 s-acc")}${txt(s, 62, "SKILL.md", "t-acc", 12, b8 + ' direction="ltr"')}${mono(s - 80, 90, "---", "t-ink3", 10.5)}${mono(s - 80, 108, "name:", "t-acc", 10.5)}${mono(s - 80, 126, "description:", "t-acc", 10.5)}${mono(s - 80, 144, "---", "t-ink3", 10.5)}${txt(s, 172, tr("الخطوات · القواعد", "steps · rules"), "t-ink2", 10.5, bold)}${txt(s, 192, tr("المراجعات", "checks"), "t-ink2", 10.5, bold)}</g>
      ${cap(tr("المهارة… تعليمات زميل جديد", "a skill… a new colleague's instructions"), 1.3, 290)}`;
    },
    sk_desc: () => {
      return `<g ${an("rise", 0.05)}>${box(240, 64, 380, 46, "f-rose-soft s-rose")}${mono(76, 69, 'description: "an Excel skill"', "t-rose", 11.5)}</g>${check(mx(420), 64, 0.4, false)}
      <g ${an("fade", 0.5)}>${txt(240, 112, tr("بتعمل إيه؟ إمتى؟ ← Claude ما لقاهاش", "does what? when? → Claude didn't find it"), "t-ink2", 11, bold)}</g>
      <g ${an("rise", 0.8)}>${box(240, 182, 400, 84, "f-mint-soft s-mint")}${mono(52, 160, "description: Builds the quarterly", "t-mint", 10.5)}${mono(52, 178, "production workbook and dashboard from", "t-mint", 10.5)}${mono(52, 196, "Week_nn.xlsx. Use when asked", "t-mint", 10.5)}${mono(52, 214, "to refresh the production dashboard...", "t-mint", 10.5)}</g>${check(mx(452), 150, 1.2)}
      ${cap(tr("وصف واضح… المهارة تتلاقي", "a clear description… the skill gets found"), 1.4, 268)}`;
    },
    sk_body: () => {
      const P = ar() ? [["المدخلات", "الملفات وأعمدتها"], ["الخطوة ١", "الشيت الكبير + VLOOKUP"], ["الخطوة ٢", "الداشبورد"], ["قبل «خلصت»", "كل المراجعات في السجل"]] : [["Inputs", "files and their columns"], ["Step 1", "big sheet + VLOOKUP"], ["Step 2", "the dashboard"], ["Before “done”", "every check in the log"]];
      return `<g ${an("fade", 0.05)}>${txt(240, 36, "SKILL.md", "t-acc", 12, b8 + ' direction="ltr"')}</g>
      ${P.map(([h, s], i) => `<g ${an("rise", 0.15 + i * 0.2)}>${box(240, 72 + i * 50, 340, 40, i === 3 ? "f-mint-soft s-mint" : "f-s1 s-acc")}${txt(mx(150), 77 + i * 50, h, i === 3 ? "t-mint" : "t-acc", 11.5, b8)}${txt(mx(310), 77 + i * 50, s, "t-ink", 11, bold)}</g>`).join("")}
      <g ${an("fade", 1.1)}>${txt(240, 284, tr("كل قاعدة جت من شغل اتراجع: صفر #N/A · المراجعة قبل التنسيق", "each rule came from checked work: zero #N/A · check before formatting"), "t-ink2", 10.5, bold)}</g>
      ${cap(tr("كل قاعدة… جت من تجربة", "every rule… came from experience"), 1.3, 306)}`;
    },
    sk_refs: () => {
      const s = mx(110), X = [mx(300), mx(300), mx(300)];
      const R = ["data-dictionary.md", "dashboard-spec.md", "checks.md"];
      return `<g ${an("rise", 0.05)}>${box(s, 120, 150, 90, "f-acc-soft s-acc")}${txt(s, 112, "SKILL.md", "t-acc", 12, b8 + ' direction="ltr"')}${txt(s, 132, tr("قصير", "short"), "t-ink2", 10.5, bold)}</g>
      ${R.map((r, i) => `${arrow(s + dirx() * 78, 120, X[i] - dirx() * 92, 70 + i * 50, 0.4 + i * 0.15, "s-line2", "4 4")}<g ${an("rise", 0.5 + i * 0.15)}>${box(X[i], 70 + i * 50, 180, 36, "f-s1 s-line2")}${txt(X[i], 75 + i * 50, r, "t-ink", 10.5, b8 + ' direction="ltr"')}</g>`).join("")}
      <g ${an("fade", 1.1)}>${txt(240, 232, tr("دايمًا: الوصف · لما تتستخدم: المهارة · وقت الحاجة: المراجع", "always: the description · in use: the skill · when needed: references"), "t-ink", 10, b8)}</g>
      ${cap(tr("الوصف دايمًا… والتفاصيل وقت الحاجة", "the description always… details when needed"), 1.3, 280)}`;
    },
    sk_scripts: () => {
      const f = mx(150), t = mx(352);
      return `<g ${an("rise", 0.05)}>${folder(f, 124, 200, 150)}${txt(f, 84, "production-dashboard", "t-amber", 10.5, b8 + ' direction="ltr"')}</g>
      <g ${an("fade", 0.3)}>${["SKILL.md", "reference/", "scripts/"].map((s, i) => txt(f, 116 + i * 22, s, i === 2 ? "t-mint" : "t-ink2", 11, b8 + ' direction="ltr"')).join("")}</g>
      ${term(t, 120, 210, 80, ["build_table.ps1", "build_dashboard.ps1"], 0.6, 11)}
      ${arrow(f + dirx() * 66, 160, t - dirx() * 108, 130, 0.9, "s-mint")}
      <g ${an("fade", 1.2)}>${txt(240, 236, tr("الطريقة والأداة اللي اتجربت… مع بعض", "the method and the tried tool… together"), "t-ink", 11.5, b8)}</g>
      ${cap(tr("الطريقة والأداة… في فولدر واحد", "the method and the tool… in one folder"), 1.4, 290)}`;
    },
    sk_where: () => {
      const X = rowX(3, 140, 12), N = [tr("المشروع", "the project"), tr("جهازك", "your machine"), tr("حسابك", "your account")], P = ["project\\.claude\\skills", "C:\\Users\\you\\.claude", "Claude app"], W = [tr("للمشروع ده وفريقه", "this project, its team"), tr("لكل مشاريعك", "all your projects"), tr("الويب والسحابة", "web and cloud")];
      return `${N.map((n, i) => `<g ${an("rise", 0.1 + i * 0.25)}>${i === 0 ? folder(X(i), 92, 90, 66) : i === 1 ? laptop(X(i), 94, 0.95) : `<path d="M${X(i) - 44} 110 q0 -28 28 -28 q10 -22 36 -16 q28 -8 38 18 q24 4 22 26z" class="s-sky" stroke-width="2.2" fill="none"/>`}${txt(X(i), 150, n, "t-ink", 12, b8)}${txt(X(i), 170, P[i], "t-ink3", 8.5, bold + ' direction="ltr"')}${txt(X(i), 190, W[i], "t-ink2", 10, bold)}</g>`).join("")}
      ${pill(240, 246, 360, 34, tr("مهارات المثالين ← المشروع · قواعد الأمان ← جهازك", "examples' skills → project · safety rules → machine"), "f-acc-soft s-acc", "t-acc", 10.5, 1.0)}
      ${cap(tr("المكان بيحدد مين يستخدمها", "its place decides who uses it"), 1.3, 296)}`;
    },
    sk_kit: () => {
      const top = 240, X = rowX(2, 180, 30);
      return `<g ${an("pop", 0.05)}>${box(top, 66, 240, 50, "f-mint s-mint")}${txt(top, 72, "safe-office-automation", "t-white", 12, b8 + ' direction="ltr"')}</g>
      ${["production-dashboard", "commercial-review-pack"].map((s, i) => `${arrow(X(i), 172, X(i) + (top - X(i)) * 0.3, 98, 0.5 + i * 0.2, "s-mint")}<g ${an("rise", 0.4 + i * 0.2)}>${box(X(i), 196, 180, 50, "f-s1 s-acc")}${txt(X(i), 192, s, "t-acc", 10.5, b8 + ' direction="ltr"')}${txt(X(i), 210, [tr("المثال الأول", "example 1"), tr("المثال التاني", "example 2")][i], "t-ink2", 10, bold)}</g>`).join("")}
      <g ${an("fade", 1.0)}>${txt(240, 136, tr("«اتبع قواعد الأمان الأول»", "“follow the safety rules first”"), "t-mint", 11, b8)}</g>
      ${cap(tr("قواعد الأمان مرة… وكل المهارات تستخدمها", "safety rules once… every skill uses them"), 1.3, 268)}`;
    },
    sk_which: () => {
      const X = rowX(3, 140, 12), N = ["CLAUDE.md", "Skill", "Prompt"], W = [tr("دايمًا", "always"), tr("لما المهمة تيجي", "when the task comes"), tr("مرة واحدة", "once")], E = [tr("«ما تعدّلش Data»", "“never edit Data”"), tr("«حدّث الداشبورد»", "“refresh the dashboard”"), tr("«غيّر لون الرسم»", "“change the colour”")];
      return `${N.map((n, i) => `<g ${an("rise", 0.1 + i * 0.25)}>${box(X(i), 110, 130, 130, i === 0 ? "f-acc-soft s-acc" : i === 1 ? "f-mint-soft s-mint" : "f-amber-soft s-amber")}${txt(X(i), 70, n, i === 0 ? "t-acc" : i === 1 ? "t-mint" : "t-amber", 12.5, b8 + ' direction="ltr"')}${txt(X(i), 108, W[i], "t-ink", 11, b8)}${txt(X(i), 140, E[i], "t-ink2", 9.5, bold)}</g>`).join("")}
      ${pill(240, 222, 360, 32, tr("كل واحد بيتقري في وقت مختلف", "each is read at a different time"), "f-s2 s-line2", "t-ink", 11.5, 1.0)}
      ${cap(tr("دايمًا، ولما المهمة تيجي، ومرة واحدة", "always, when the task comes, and once"), 1.3, 280)}`;
    },
    sk_test: () => {
      const a = mx(130), b = mx(352);
      return `<g ${an("rise", 0.05)}>${bubble(a, 74, 210, 60, "f-acc-soft s-acc", !ar())}${txt(a, 66, tr("«حدّث داشبورد الإنتاج", "“refresh the production"), "t-acc", 10.5, b8)}${txt(a, 84, tr("من ملفات الأسبوع الجديدة»", "dashboard from the new files”"), "t-acc", 10.5, b8)}</g>
      <g ${an("fade", 0.3)}>${txt(a, 134, tr("جلسة جديدة · من غير شرح", "a new session · no explanation"), "t-ink3", 10.5, bold)}</g>
      ${term(b, 112, 200, 120, ["skill: production-dashboard", "safe-office-automation", "build_table.ps1  OK", "build_dashboard.ps1  OK", "checks 4/4"], 0.6, 9.5)}
      <g ${an("rise", 1.4)}>${box(a, 206, 190, 40, "f-s1 s-line2")}${mono(a - 82, 211, "/production-dashboard", "t-acc", 11)}</g>${check(a + dirx() * 106, 206, 1.6)}
      ${cap(tr("لو اشتغلت من غير شرح… جاهزة", "if it works unexplained… it's ready"), 1.8, 290)}`;
    },
    sk_command: () => {
      const a = mx(130), b = mx(352);
      return `<g ${an("rise", 0.05)}>${box(240, 62, 360, 44, "f-amber-soft s-amber")}${mono(78, 67, "disable-model-invocation: true", "t-amber", 12)}</g>
      <g ${an("rise", 0.5)}>${box(a, 150, 170, 80, "f-s1 s-rose")}${txt(a, 132, tr("بتبني جدول", "builds a table"), "t-ink", 11, b8)}${txt(a, 152, tr("ممكن لوحدها", "may run alone"), "t-mint", 10.5, b8)}${txt(a, 172, tr("وتتراجع", "and be checked"), "t-ink2", 10, bold)}</g>
      <g ${an("rise", 0.8)}>${box(b, 150, 170, 80, "f-s1 s-amber")}${txt(b, 132, tr("بتبعت · بتمسح", "sends · deletes"), "t-ink", 11, b8)}${txt(b, 152, tr("بأمرك بس", "on your command"), "t-amber", 10.5, b8)}${txt(b, 172, tr("ما بترجعش", "can't be undone"), "t-ink2", 10, bold)}</g>
      ${pill(240, 236, 300, 32, tr("أقل صلاحية ممكنة", "least possible access"), "f-acc-soft s-acc", "t-acc", 12, 1.2)}
      ${cap(tr("اللي ما بيرجعش… بأمرك إنت", "what can't be undone… on your command"), 1.4, 286)}`;
    },
    sk_cliff: () => {
      const f = mx(104), q = mx(372), d = dirx();
      return `<g ${an("rise", 0.05)}>${["build_table.ps1", "build_dashboard.ps1", "review_pack.ps1"].map((n, i) => `${box(f, 78 + i * 46, 160, 36, "f-s1 s-line2")}${mono(f - 70, 83 + i * 46, n, "t-ink2", 10)}`).join("")}${txt(f, 222, tr("سكريبتات المهارات", "the skills' scripts"), "t-ink3", 10.5, bold)}</g>
      ${arrow(f + d * 88, 124, 240 - d * 40, 124, 0.5)}
      <g ${an("pop", 0.7)}><path d="M240 84 l34 12 v26 q0 30 -34 46 q-34 -16 -34 -46 v-26z" class="f-acc-soft s-acc" stroke-width="2.5"/>${txt(240, 136, ar() ? "؟" : "?", "t-acc", 26, b8)}</g>
      <g ${an("rise", 1.0)}>${box(q, 84, 168, 40, "f-amber-soft s-amber")}${txt(q, 89, tr("«نازل من النت؟»", "“from the internet?”"), "t-amber", 11, b8)}</g>
      <g ${an("rise", 1.25)}>${box(q, 136, 168, 40, "f-amber-soft s-amber")}${txt(q, 141, tr("«مين راجعه، وإزاي؟»", "“who reviewed it, how?”"), "t-amber", 11, b8)}</g>
      <g ${an("rise", 1.5)}>${laptop(q, 204, 0.8)}${txt(q, 246, tr("مصنع تاني: مفيش Python", "another plant: no Python"), "t-rose", 10.5, b8)}</g>
      <g ${an("fade", 1.9)}>${txt(240, 210, tr("الوحدة الجاية", "next unit"), "t-acc", 13, b8)}</g>
      ${cap(tr("أداة هتتنقل لناس تانية… لازم تبقى آمنة ومتراجعة", "a tool moving to others… must be safe and checked"), 2.1, 296)}`;
    },
  });

  /* ---------- unit 4: tools the company trusts (data/cli-story.js … rules-story.js) ---------- */
  const flowRow = (labels, y, w, gap, d0, cls = "f-s1 s-acc", tcls = "t-ink", size = 11, h = 40) => { const X = rowX(labels.length, w, gap);   // boxes in reading order, joined by arrows
    return labels.map((s, i) => `${i ? arrow(X(i - 1) + dirx() * (w / 2 + 1), y, X(i) - dirx() * (w / 2 + 3), y, d0 + i * 0.25 - 0.12) : ""}<g ${an("rise", d0 + i * 0.25)}>${box(X(i), y, w, h, [].concat(cls)[i] || [].concat(cls)[0])}${txt(X(i), y + size * 0.36, s, [].concat(tcls)[i] || [].concat(tcls)[0], size, b8)}</g>`).join(""); };
  const shield = (x, y, s = 1, cls = "f-acc-soft s-acc") =>   // spans y − 30s … y + 42s
    `<path d="M${x} ${y - 30 * s} l${28 * s} ${10 * s} v${22 * s} q0 ${26 * s} ${-28 * s} ${40 * s} q${-28 * s} ${-14 * s} ${-28 * s} ${-40 * s} v${-22 * s}z" class="${cls}" stroke-width="2.4"/>`;
  const winBox = (cx, cy, w, h, title, cls = "f-s1 s-line2", d = 0) =>   // a window: a title bar, an empty body
    `<g ${an("rise", d)}>${box(cx, cy, w, h, cls)}<rect x="${cx - w / 2 + 2}" y="${cy - h / 2 + 2}" width="${w - 4}" height="20" rx="10" class="f-s2"/>${txt(cx, cy - h / 2 + 16, title, "t-ink2", 10.5, b8)}</g>`;
  const cloud = (x, y, cls = "f-acc-soft s-acc") => `<ellipse cx="${x}" cy="${y}" rx="78" ry="38" class="${cls}" stroke-width="2.4"/>`;
  const ltr = ' direction="ltr"';
  const nb = (s) => s.replace(/^ +/, (m) => "\u00a0".repeat(m.length));   // keep a code line's indent: SVG text collapses leading spaces
  Object.assign(ART, {
    /* ----- the two CLIs (data/cli-story.js) ----- */
    cl_copy: () => {
      const a = mx(116), b = mx(364), d = dirx();
      return `${winBox(a, 106, 170, 108, tr("الشات", "the chat"), "f-s1 s-line2", 0.05)}
      <g ${an("fade", 0.2)}>${mono(a - 66, 132, "import ...", "t-ink3", 10.5)}${mono(a - 66, 152, "df['Quantity']", "t-rose", 10.5)}</g>
      ${winBox(b, 106, 170, 108, tr("المفكرة", "Notepad"), "f-s1 s-line2", 0.3)}
      <g ${an("fade", 0.45)}>${mono(b - 66, 132, "tool.py", "t-ink3", 10.5)}${mono(b - 66, 152, "KeyError", "t-rose", 10.5)}</g>
      <path ${an("draw", 0.6, "s-acc")} pathLength="1" d="M${a + d * 50} 50 C ${a + d * 110} 24, ${b - d * 110} 24, ${b - d * 50} 50" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <path ${an("draw", 0.8, "s-rose")} pathLength="1" d="M${b - d * 50} 162 C ${b - d * 110} 192, ${a + d * 110} 192, ${a + d * 50} 162" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      ${pill(240, 106, 76, 32, tr("٥ مرات", "5 times"), "f-rose-soft s-rose", "t-rose", 12, 1.0)}
      <g ${an("rise", 1.2)}>${box(240, 236, 330, 40, "f-amber-soft s-amber")}${txt(240, 241, tr("الكود: Quantity · الملف: Qty", "the code: Quantity · the file: Qty"), "t-amber", 11.5, b8)}</g>
      ${cap(tr("النموذج اللي ما شافش ملفك… بيخمّن", "a model that hasn't seen your file… guesses"), 1.5, 296)}`;
    },
    cl_cli: () => {
      const X = rowX(3, 120, 18), W = [["C", "Command", tr("أمر", "command")], ["L", "Line", tr("سطر", "line")], ["I", "Interface", tr("واجهة", "interface")]];
      return `${W.map(([c, w, a], i) => `<g ${an("pop", 0.05 + i * 0.2)}>${box(X(i), 80, 120, 88, "f-acc-soft s-acc")}${txt(X(i), 74, c, "t-acc", 26, b8 + ltr)}${txt(X(i), 96, w, "t-ink2", 11, b8 + ltr)}${txt(X(i), 112, a, "t-ink3", 10, bold)}</g>`).join("")}
      ${term(240, 194, 380, 68, ["PS C:\\Automation\\Example_1> claude", "What should we work on?"], 0.8, 11)}
      ${cap(tr("برنامج من غير زراير… بتكلّمه بالكتابة", "a program with no buttons… you talk to it by typing"), 1.6, 290)}`;
    },
    cl_two: () => {
      const a = mx(126), b = mx(354);
      const tool = (x, name, co, d) => `<g ${an("rise", d)}>${box(x, 106, 176, 124, "f-s1 s-acc")}<rect x="${x - 62}" y="60" width="124" height="52" rx="6" class="f-ink2"/>${mono(x - 52, 82, "> _", "t-crt", 12)}${txt(x, 140, name, "t-acc", 13, b8 + ltr)}${txt(x, 158, co, "t-ink3", 10.5, bold + ltr)}</g>`;
      return `${tool(a, "Claude Code", "Anthropic", 0.05)}${tool(b, "Codex", "OpenAI", 0.3)}
      ${pill(240, 106, 30, 32, "=", "f-mint-soft s-mint", "t-mint", 16, 0.6)}
      ${flowRow([tr("فولدر", "folder"), tr("طلب", "request"), tr("موافقة", "approval"), tr("تشغيل", "run")], 222, 86, 22, 0.8, "f-acc-soft s-acc", "t-acc", 11, 34)}
      ${cap(tr("أداتين… وطريقة واحدة", "two tools… one method"), 1.9, 290)}`;
    },
    cl_folder: () => {
      const f = mx(168), x = mx(396);
      return `<g ${an("rise", 0.05)}>${folder(f, 140, 252, 196, "f-mint-soft s-mint")}${txt(f, 68, tr("فولدر المثال الأول", "the first example's folder"), "t-mint", 11.5, b8)}</g>
      <g ${an("fade", 0.3)}>${txt(f, 100, "Data\\   README.txt", "t-ink", 11.5, b8 + ltr)}</g>
      <g ${an("rise", 0.5)}><rect x="${f - 92}" y="120" width="184" height="58" rx="8" class="f-ink2"/>${mono(f - 80, 144, "> claude", "t-crt", 12)}${mono(f - 80, 164, "reads Data\\ only", "t-crt", 10.5)}</g>
      <g ${an("fade", 0.7)}>${txt(f, 212, tr("حدود الأداة", "the tool's boundary"), "t-mint", 12, b8)}</g>
      <g ${an("rise", 0.9)}>${folder(x, 122, 124, 100, "f-s2 s-line2")}${txt(x, 196, tr("سطح المكتب", "the Desktop"), "t-ink2", 11, b8)}${txt(x, 214, tr("كل ملفاتك", "all your files"), "t-ink3", 10, bold)}</g>
      <path ${an("draw", 1.1, "s-rose")} pathLength="1" d="M${x - 48} 82 L${x + 48} 162 M${x + 48} 82 L${x - 48} 162" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${cap(tr("الفولدر الصغير… حدود آمنة", "a small folder… safe boundaries"), 1.4, 290)}`;
    },
    cl_read: () => {
      return `<g ${an("rise", 0.05)}>${bubble(240, 62, 390, 58, "f-acc-soft s-acc", !ar())}${txt(240, 58, tr("«اقرا README وفولدر Data، وقولّي فهمت إيه،", "“Read README and the Data folder, and tell me"), "t-acc", 11, b8)}${txt(240, 76, tr("من غير ما تعدّل أي حاجة»", "what you understood, changing nothing”"), "t-acc", 11, b8)}</g>
      ${term(240, 170, 360, 102, ["2 weekly files, the same 5 columns", "Masters.xlsx: sheet Countries", "5 steps required", "Question: is Qty in sets?"], 0.5, 10.5)}
      ${check(mx(442), 170, 1.6)}
      ${cap(tr("الفهم الأول… وبعدين الكود", "understanding first… then the code"), 1.8, 290)}`;
    },
    cl_approve: () => {
      const B = rowX(3, 112, 12);
      return `${term(240, 72, 380, 62, ["Run step1_stack.ps1 ?", "powershell -File step1_stack.ps1"], 0.05, 11)}
      <g ${an("rise", 0.6)}>${[tr("أيوه المرة دي", "yes, this time"), tr("أيوه دايمًا", "yes, always"), tr("لأ", "no")].map((s, i) => `${box(B(i), 148, 112, 40, i === 0 ? "f-mint s-mint" : i === 1 ? "f-amber-soft s-amber" : "f-s1 s-line2")}${txt(B(i), 152, s, i === 0 ? "t-white" : i === 1 ? "t-amber" : "t-ink2", 11, b8)}`).join("")}</g>
      <g ${an("fade", 1.0)}>${txt(B(0), 188, tr("في الأول", "at first"), "t-mint", 10.5, b8)}${txt(B(1), 188, tr("لأوامر بتقرا بس", "read-only commands"), "t-amber", 10, b8)}</g>
      ${pill(240, 234, 340, 32, tr("بيمسح أو بيبعت؟ وافق بنفسك كل مرة", "deletes or sends? approve it yourself every time"), "f-rose-soft s-rose", "t-rose", 11, 1.3)}
      ${cap(tr("الموافقة مش زرار… دي مراجعة", "approval isn't a button… it's a review"), 1.6, 290)}`;
    },
    cl_plan: () => {
      const P = ar() ? ["١. أفتح الملفين للقراءة بس", "٢. أحطهم تحت بعض + SourceFile", "٣. العدد والإجمالي في السجل", "٤. أحفظ في Output"] : ["1. open both files read-only", "2. stack them + SourceFile", "3. count and total in the log", "4. save to Output"];
      return `<g ${an("fade", 0.05)}>${txt(mx(200), 42, tr("الخطة، قبل أي كود", "the plan, before any code"), "t-acc", 12.5, b8)}</g>
      ${P.map((s, i) => `<g ${an("rise", 0.2 + i * 0.2)}>${box(mx(200), 76 + i * 44, 300, 36, i === 3 ? "f-amber-soft s-amber" : "f-s1 s-acc")}${txt(mx(200), 81 + i * 44, s, i === 3 ? "t-amber" : "t-ink", 11, b8)}</g>`).join("")}
      <g ${an("pop", 1.1)}>${txt(mx(408), 212, tr("«هتحفظ فين؟»", "“saved where?”"), "t-amber", 11, b8)}</g>
      ${check(mx(408), 120, 1.4)}<g ${an("fade", 1.4)}>${txt(mx(408), 152, tr("موافقة", "approved"), "t-mint", 11, b8)}</g>
      ${cap(tr("سطر في الخطة… يوفّر عشرة في الكود", "one line of plan… saves ten of code"), 1.7, 290)}`;
    },
    cl_run: () => {
      const c = mx(168), r = mx(398), N = ar() ? ["تكتب", "تشغّل", "تشوف الخطأ", "تصلّح"] : ["write", "run", "see the error", "fix"];
      const P = [[c, 62], [c + 100, 140], [c, 218], [c - 100, 140]];
      return `<g ${an("fade", 0.05)}><circle cx="${c}" cy="140" r="78" class="s-acc" fill="none" stroke-width="2.5" stroke-dasharray="6 6"/></g>
      ${P.map(([x, y], i) => `<g ${an("pop", 0.2 + i * 0.25)}>${box(x, y, 98, 34, i === 2 ? "f-rose-soft s-rose" : "f-s1 s-acc")}${txt(x, y + 4, N[i], i === 2 ? "t-rose" : "t-ink", 11, b8)}</g>`).join("")}
      <g ${an("fade", 1.2)}>${txt(c, 145, tr("دقيقة", "a minute"), "t-acc", 13, b8)}</g>
      <g ${an("rise", 1.3)}>${person(r, 132, 1, "f-ink2")}${txt(r, 160, tr("بتقرا وتوافق", "reads and approves"), "t-ink2", 11, b8)}</g>
      ${term(r, 222, 150, 56, ["36 rows", "1,765 sets"], 1.5, 10.5)}
      ${cap(tr("هي بتكرر الخطوات… وإنت بتحكم", "it repeats the steps… you judge"), 1.9, 298)}`;
    },
    cl_rules: () => {
      const a = mx(128), b = mx(352);
      return `${term(240, 50, 180, 40, ["> /init"], 0.05, 12)}
      ${arrow(240 - dirx() * 40, 72, a, 102, 0.4)}${arrow(240 + dirx() * 40, 72, b, 102, 0.4)}
      <g ${an("rise", 0.6)}>${box(a, 138, 176, 62, "f-acc-soft s-acc")}${txt(a, 134, "CLAUDE.md", "t-acc", 13, b8 + ltr)}${txt(a, 154, "Claude Code", "t-ink3", 10.5, bold + ltr)}</g>
      <g ${an("rise", 0.8)}>${box(b, 138, 176, 62, "f-mint-soft s-mint")}${txt(b, 134, "AGENTS.md", "t-mint", 13, b8 + ltr)}${txt(b, 154, "Codex", "t-ink3", 10.5, bold + ltr)}</g>
      <g ${an("rise", 1.1)}>${box(240, 222, 400, 58, "f-s1 s-line2")}${txt(240, 216, tr("«اقرا من Data واكتب في Output بس»", "“read from Data, write to Output only”"), "t-ink", 11, b8)}${txt(240, 236, tr("«اعرض الخطة واستنى موافقتي»", "“show the plan and wait for my approval”"), "t-ink", 11, b8)}</g>
      ${cap(tr("اللي بيتكرر… يتكتب مرة", "what repeats… is written once"), 1.5, 292)}`;
    },
    cl_install: () => {
      const l = mx(112), c = mx(366), d = dirx();
      return `<g ${an("rise", 0.05)}>${laptop(l, 112, 1.3)}${txt(l, 168, tr("البرنامج", "the program"), "t-ink", 11.5, b8)}${txt(l, 186, tr("على جهازك", "on your machine"), "t-ink3", 10.5, bold)}</g>
      <g ${an("rise", 0.3)}>${cloud(c, 112)}${txt(c, 117, tr("النموذج", "the model"), "t-acc", 12.5, b8)}${txt(c, 168, tr("على السحابة", "in the cloud"), "t-ink", 11.5, b8)}</g>
      ${arrow(l + d * 64, 100, c - d * 82, 100, 0.6)}${arrow(c - d * 82, 126, l + d * 64, 126, 0.8, "s-mint")}
      <g ${an("fade", 0.9)}>${txt(239, 92, tr("اللي اتقرا", "what was read"), "t-ink3", 10, bold)}${txt(239, 144, tr("الرد", "the reply"), "t-mint", 10, bold)}</g>
      ${pill(240, 232, 380, 36, tr("التثبيت: مرة واحدة، من الـ IT، بحساب الشركة", "install: once, by IT, on the company account"), "f-amber-soft s-amber", "t-amber", 11, 1.1)}
      ${cap(tr("الأداة المعتمدة… من المصدر المعتمد", "an approved tool… from the approved source"), 1.4, 290)}`;
    },
    cl_compare: () => {
      const a = mx(124), b = mx(356), L = ["2 files, 5 columns", "sheet Countries", "5 steps", "Qty in sets?"];
      return `<g ${an("fade", 0.05)}>${txt(a, 48, "Claude Code", "t-acc", 12.5, b8 + ltr)}${txt(b, 48, "Codex", "t-acc", 12.5, b8 + ltr)}</g>
      ${term(a, 122, 196, 104, L, 0.2, 10.5)}${term(b, 122, 196, 104, L, 0.5, 10.5)}
      ${pill(240, 122, 28, 32, "=", "f-mint-soft s-mint", "t-mint", 16, 1.4)}
      <g ${an("rise", 1.6)}>${box(240, 222, 380, 40, "f-acc-soft s-acc")}${txt(240, 227, tr("المشكلة كانت في اللي النموذج شافه", "the problem was what the model saw"), "t-acc", 11.5, b8)}</g>
      ${cap(tr("نفس الطلب… نفس الفهم", "the same request… the same understanding"), 1.8, 290)}`;
    },
    cl_cliff: () => {
      const t = mx(178), q = mx(398);
      return `${term(t, 96, 316, 108, ["import pandas as pd", "ModuleNotFoundError: pandas", "> pip install pandas", "BLOCKED by company policy"], 0.05, 10.5, (i) => (i === 1 || i === 3 ? "t-white" : "t-crt"))}
      <g ${an("pop", 1.2)}>${shield(q, 92, 1.1)}${txt(q, 108, ar() ? "؟" : "?", "t-acc", 22, b8)}</g>
      <g ${an("fade", 1.5)}>${txt(q, 160, tr("الدرس الجاي", "next lesson"), "t-acc", 12.5, b8)}</g>
      <g ${an("rise", 1.7)}>${box(240, 228, 400, 52, "f-amber-soft s-amber")}${txt(240, 224, tr("«الكود ده بيستخدم أي حاجة", "“does this code use anything"), "t-amber", 11.5, b8)}${txt(240, 242, tr("نازلة من النت؟»", "downloaded from the internet?”"), "t-amber", 11.5, b8)}</g>`;
    },
    /* ----- pure Python (data/pure-story.js) ----- */
    pu_blocked: () => {
      const t = mx(150), p = mx(380);
      return `${term(t, 92, 260, 76, ["> pip install pandas", "BLOCKED by company policy"], 0.05, 11, (i) => (i ? "t-white" : "t-crt"))}
      <g ${an("pop", 0.6)}>${shield(t, 196, 1)}${txt(t, 206, ar() ? "؟" : "?", "t-acc", 20, b8)}</g>
      <g ${an("rise", 0.8)}>${person(p, 150, 1, "f-ink2")}${bubble(p, 70, 170, 50, "f-amber-soft s-amber", !ar())}${txt(p, 75, tr("«ليه ممنوع؟»", "“why is it blocked?”"), "t-amber", 11.5, b8)}</g>
      <g ${an("rise", 1.2)}>${box(p, 212, 180, 54, "f-acc-soft s-acc")}${txt(p, 207, tr("الممنوع: كود من برّه", "blocked: outside code"), "t-acc", 11, b8)}${txt(p, 225, tr("من غير مراجعة", "with no review"), "t-acc", 11, b8)}</g>
      ${cap(tr("الممنوع مش الأداة… الممنوع الكود الغريب", "what's blocked isn't the tool… it's unknown code"), 1.5, 292)}`;
    },
    pu_stdlib: () => {
      const M = ["csv", "sqlite3", "zipfile", "re", "html", "json", "pathlib", "datetime"], X = rowX(4, 92, 10);
      return `<g ${an("rise", 0.05)}><path d="M210 52 v-12 h60 v12" class="s-acc" stroke-width="3" fill="none"/>${box(240, 128, 420, 150, "f-acc-soft s-acc")}${txt(240, 76, tr("المكتبة القياسية: جاية مع Python", "the standard library: ships with Python"), "t-acc", 12.5, b8)}</g>
      ${M.map((m, i) => `<g ${an("pop", 0.3 + i * 0.1)}>${box(X(i % 4), 110 + Math.floor(i / 4) * 50, 92, 36, "f-s1 s-line2")}${txt(X(i % 4), 115 + Math.floor(i / 4) * 50, m, "t-ink", 12, b8 + ltr)}</g>`).join("")}
      <g ${an("rise", 1.3)}>${box(240, 238, 240, 36, "f-s1 s-mint")}${mono(178, 243, "import csv, sqlite3", "t-mint", 12)}</g>
      ${cap(tr("الشنطة جاية مع اللغة… افتحها الأول", "the toolbox comes with the language… open it first"), 1.6, 290)}`;
    },
    pu_package: () => {
      const c = mx(126), l = mx(370), d = dirx();
      return `<g ${an("rise", 0.05)}>${cloud(c, 104)}${txt(c, 92, "PyPI", "t-acc", 14, b8 + ltr)}${[0, 1, 2, 3, 4].map((k) => `<rect x="${c - 50 + k * 20}" y="104" width="14" height="14" rx="3" class="f-s1 s-acc" stroke-width="1.5"/>`).join("")}</g>
      <g ${an("fade", 0.3)}>${txt(c, 166, tr("مئات الآلاف · أي حد يرفع", "hundreds of thousands · anyone uploads"), "t-ink3", 10.5, bold)}</g>
      ${arrow(c + d * 82, 104, l - d * 62, 104, 0.6)}<g ${an("fade", 0.7)}>${mono(205, 92, "pip install", "t-ink2", 11)}</g>
      <g ${an("rise", 0.9)}>${laptop(l, 104, 1.3)}${txt(l, 160, tr("جهاز الشركة", "a company machine"), "t-ink", 11.5, b8)}</g>
      <g ${an("rise", 1.2)}>${box(240, 228, 380, 44, "f-amber-soft s-amber")}${txt(240, 233, tr("كل باكدج = قرار بإدخال كود غريب", "every package = a decision to bring in unknown code"), "t-amber", 11.5, b8)}</g>
      ${cap(tr("كل pip install… قرار", "every pip install… is a decision"), 1.5, 290)}`;
    },
    pu_risk: () => {
      const X = rowX(3, 140, 14);
      return `<g ${an("rise", 0.05)}>${box(X(0), 118, 140, 140, "f-s1 s-rose")}${txt(X(0), 72, tr("اسم شبه اسم", "a look-alike name"), "t-rose", 11, b8)}${txt(X(0), 112, "pandsa", "t-rose", 15, b8 + ltr)}${txt(X(0), 132, "≠", "t-ink3", 14, b8)}${txt(X(0), 154, "pandas", "t-mint", 15, b8 + ltr)}</g>
      <g ${an("rise", 0.3)}>${box(X(1), 118, 140, 140, "f-s1 s-rose")}${txt(X(1), 72, tr("نسخة اتغيّرت", "a changed version"), "t-rose", 11, b8)}${txt(X(1), 112, "v2.1", "t-mint", 15, b8 + ltr)}${txt(X(1), 154, "v2.2", "t-rose", 15, b8 + ltr)}${arrow(X(1), 118, X(1), 138, 0.5, "s-rose")}</g>
      <g ${an("rise", 0.6)}>${box(X(2), 118, 140, 140, "f-s1 s-rose")}${txt(X(2), 72, tr("واحد بيسحب عشرات", "one pulls dozens"), "t-rose", 11, b8)}<circle cx="${X(2)}" cy="104" r="9" class="f-rose"/>${[-40, -20, 0, 20, 40].map((dx) => `<line x1="${X(2)}" y1="112" x2="${X(2) + dx}" y2="146" class="s-line2" stroke-width="1.5"/><circle cx="${X(2) + dx}" cy="152" r="6" class="f-rose-soft s-rose" stroke-width="1.5"/>`).join("")}</g>
      ${pill(240, 232, 360, 34, tr("وكلهم بيشتغلوا بصلاحياتك", "and all of them run with your permissions"), "f-amber-soft s-amber", "t-amber", 11.5, 1.0)}
      ${cap(tr("باكدج واحد… ومعاه عشرات", "one package… and dozens with it"), 1.3, 290)}`;
    },
    pu_policy: () => {
      const g = mx(130), q = mx(356);
      return `<g ${an("rise", 0.05)}>${[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${g - 82 + c * 42}" y="${52 + r * 34}" width="34" height="26" rx="5" class="f-s1 ${(r + c) % 3 ? "s-line2" : "s-rose"}" stroke-width="1.6"/>${txt(g - 65 + c * 42, 70 + r * 34, "?", (r + c) % 3 ? "t-ink3" : "t-rose", 12, b8)}`).join("")).join("")}${txt(g, 208, tr("٤٠ مهندس · مئات النسخ", "40 engineers · hundreds of versions"), "t-ink3", 10.5, bold)}</g>
      ${arrow(g + dirx() * 96, 120, q - dirx() * 92, 120, 0.5)}
      <g ${an("rise", 0.7)}>${box(q, 120, 170, 140, "f-mint-soft s-mint")}${txt(q, 70, tr("قايمة معتمدة", "an approved list"), "t-mint", 12, b8)}${[0, 1, 2].map((k) => `${check(q - 54, 100 + k * 30, 0.9 + k * 0.15)}<rect x="${q - 34}" y="${94 + k * 30}" width="84" height="10" rx="5" class="f-s3"/>`).join("")}</g>
      <g ${an("fade", 1.3)}>${txt(q, 208, tr("أو منع كامل", "or a full block"), "t-ink2", 11, b8)}</g>
      ${cap(tr("القاعدة مش ضدك… هي اللي بتخلّي أداتك تتنقل", "the rule isn't against you… it lets your tool travel"), 1.5, 290)}`;
    },
    pu_check: () => {
      const a = mx(130), b = mx(362);
      return `${term(a, 96, 220, 76, ["> python --version", "Python 3.12.4"], 0.05, 12)}${check(a - dirx() * 96, 140, 0.8)}
      <g ${an("fade", 0.9)}>${txt(a, 160, tr("موجودة", "it's there"), "t-mint", 12, b8)}</g>
      <g ${an("rise", 1.0)}>${winBox(b, 96, 176, 96, "Microsoft Store", "f-s1 s-rose", 1.0)}${txt(b, 112, tr("«Get Python»", "“Get Python”"), "t-ink2", 12, b8)}</g>
      <g ${an("fade", 1.3)}>${txt(b, 160, tr("مش موجودة: ما تنزّلهاش", "not there: don't download it"), "t-rose", 11, b8)}</g>
      ${pill(240, 222, 300, 36, tr("الـ IT بالنسخة المعتمدة", "IT, with the approved version"), "f-acc-soft s-acc", "t-acc", 11.5, 1.5)}
      ${cap(tr("سطر واحد… قبل أي أداة", "one line… before any tool"), 1.7, 290)}`;
    },
    pu_rule: () => {
      const a = mx(124), t = mx(366), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(a, 132, 200, 170, "f-s1 s-line2")}${txt(a, 62, "Prompt", "t-ink3", 11, b8 + ltr)}<rect x="${a - 90}" y="74" width="180" height="54" rx="8" class="f-amber-soft s-amber" stroke-width="2"/>${txt(a, 96, tr("المكتبة القياسية بس", "standard library only"), "t-amber", 11.5, b8)}${txt(a, 114, tr("ممنوع pip install", "no pip install"), "t-amber", 11, b8)}${[0, 1, 2].map((k) => `<rect x="${a - 80}" y="${146 + k * 20}" width="${150 - k * 30}" height="9" rx="4.5" class="f-s3"${ar() ? ` transform="translate(${20 + k * 30} 0)"` : ""}/>`).join("")}</g>
      ${arrow(a + d * 103, 132, t - d * 98, 132, 0.6)}
      ${term(t, 132, 190, 108, ["import csv", "import sqlite3", "# 40 lines", "36 rows", "1,765 sets"], 0.8, 11)}
      ${cap(tr("النموذج كان يقدر… بس محدش قاله", "the model could… nobody had told it"), 1.8, 290)}`;
    },
    pu_write: () => {
      const L = ["def total_by_country(rows):", "    # replaces pandas groupby().sum()", "    totals = {}", "    for row in rows:", "        c = row['CountryCode']", "        totals[c] = totals.get(c, 0) + int(row['Qty'])", "    return totals"].map(nb);
      return `${term(240, 108, 440, 168, L, 0.05, 10.5, (i) => (i === 1 ? "t-white" : "t-crt"))}
      ${flowRow(["EG 880", "KW 385", "AE 245"], 230, 104, 18, 1.6, "f-mint-soft s-mint", "t-mint", 12, 36)}
      ${cap(tr("أطول شوية… بس مفهوم", "a little longer… but understood"), 2.3, 290)}`;
    },
    pu_map: () => {
      const R = [["pandas", "csv + sqlite3"], ["openpyxl", tr("PowerShell ← CSV", "PowerShell → CSV")], ["pdfplumber", "re + zlib"], ["plotly", tr("SVG مكتوب نص", "SVG as text")], ["requests", tr("مفيش نت", "no internet")]];
      const a = mx(140), b = mx(330), d = dirx();
      return `<g ${an("fade", 0.05)}>${txt(a, 40, tr("الباكدج", "the package"), "t-rose", 12, b8)}${txt(b, 40, tr("البديل من جوّه", "the replacement inside"), "t-mint", 12, b8)}</g>
      ${R.map(([p, r], i) => `<g ${an("rise", 0.2 + i * 0.18)}>${box(a, 70 + i * 44, 140, 34, "f-rose-soft s-rose")}${txt(a, 75 + i * 44, p, "t-rose", 12, b8 + ltr)}${box(b, 70 + i * 44, 190, 34, "f-mint-soft s-mint")}${txt(b, 75 + i * 44, r, "t-mint", 11.5, b8)}</g>${arrow(a + d * 72, 70 + i * 44, b - d * 97, 70 + i * 44, 0.3 + i * 0.18, "s-line2")}`).join("")}
      ${cap(tr("لكل باكدج… بديل من جوّه", "for every package… a replacement from inside"), 1.4, 296)}`;
    },
    pu_imports: () => {
      const L = ["import csv", "from pathlib import Path", "...", "def save(rows):", "    import openpyxl", "    ..."].map(nb);
      return `${term(mx(170), 108, 300, 150, L, 0.05, 11, (i) => (i === 4 ? "t-white" : "t-crt"))}
      <g ${an("pop", 1.2)}><rect x="${mx(170) - 146}" y="${108 - 75 + 24 + 4 * 20 - 15}" width="292" height="21" rx="4" class="s-rose" fill="none" stroke-width="2.5"/></g>
      <g ${an("rise", 1.4)}>${box(mx(398), 108, 150, 96, "f-rose-soft s-rose")}${txt(mx(398), 92, tr("في نص الملف", "mid-file"), "t-rose", 11.5, b8)}${txt(mx(398), 112, tr("عندك اشتغل", "worked for you"), "t-ink2", 10.5, bold)}${txt(mx(398), 130, tr("عند زميلك وقف", "stopped for a colleague"), "t-ink2", 10.5, bold)}</g>
      <g ${an("rise", 1.7)}>${box(240, 224, 440, 40, "f-s1 s-line2")}${mono(30, 229, "stdlib_module_names: 'openpyxl' -> False", "t-acc", 11)}</g>
      ${cap(tr("اشتغلت عندك… مش معناها اشتغلت", "it worked for you… doesn't mean it works"), 1.9, 290)}`;
    },
    pu_limits: () => {
      const a = mx(130), b = mx(352);
      return `<g ${an("rise", 0.05)}>${box(a, 100, 170, 110, "f-s1 s-line2")}<rect x="${a - 50}" y="62" width="100" height="62" rx="4" class="f-s3"/><circle cx="${a - 24}" cy="82" r="8" class="f-s1"/><path d="M${a - 46} 120 l26 -22 l18 14 l20 -20 l28 28z" class="f-s1"/>${txt(a, 144, tr("PDF ممسوح كصورة", "a PDF scanned as an image"), "t-ink", 11, b8)}</g>
      <g ${an("fade", 0.4)}>${txt(a, 178, tr("محتاج قراءة صور", "needs image reading"), "t-rose", 11, b8)}</g>
      <g ${an("rise", 0.6)}>${folder(b, 100, 150, 100, "f-s2 s-line2")}${txt(b, 178, tr("كود باكدج منسوخ", "copied package code"), "t-ink2", 11, b8)}</g>
      <path ${an("draw", 0.9, "s-rose")} pathLength="1" d="M${b - 60} 56 L${b + 60} 146 M${b + 60} 56 L${b - 60} 146" stroke-width="4" fill="none" stroke-linecap="round"/>
      <g ${an("fade", 1.0)}>${txt(b, 196, tr("لسه كود من برّه", "still outside code"), "t-rose", 11, b8)}</g>
      ${pill(240, 234, 300, 36, tr("اطلب رسمي… ما تتحايلش", "ask officially… don't dodge"), "f-acc-soft s-acc", "t-acc", 12, 1.3)}
      ${cap(tr("اطلب… ما تتحايلش", "ask… don't dodge"), 1.5, 292)}`;
    },
    pu_cliff: () => {
      const l = mx(150), q = mx(390);
      return `<g ${an("rise", 0.05)}>${laptop(l, 94, 1.8)}<rect x="${l - 44}" y="70" width="88" height="40" rx="3" class="f-s1 s-rose" stroke-width="1.5"/>${txt(l, 94, "Microsoft Store", "t-rose", 9, b8 + ltr)}</g>
      <g ${an("fade", 0.4)}>${txt(l, 168, tr("جهاز مشرف الخط", "the line supervisor's PC"), "t-ink", 11.5, b8)}${mono(l - 60, 190, "> python --version", "t-ink3", 10.5)}</g>
      <g ${an("pop", 0.8)}>${box(q, 64, 120, 44, "f-amber-soft s-amber")}${txt(q, 69, tr("الـ IT: أسبوعين", "IT: two weeks"), "t-amber", 11.5, b8)}</g>
      <g ${an("pop", 1.2)}>${shield(q, 150, 1)}${txt(q, 160, ar() ? "؟" : "?", "t-acc", 20, b8)}</g>
      <g ${an("fade", 1.5)}>${txt(q, 212, tr("الدرس الجاي", "next lesson"), "t-acc", 12.5, b8)}</g>
      <g ${an("rise", 1.7)}>${box(240, 254, 360, 40, "f-s1 s-acc")}${txt(240, 259, tr("طب ولو الجهاز ما عليهوش Python؟", "and if the machine has no Python?"), "t-acc", 12, b8)}</g>`;
    },
    /* ----- PowerShell and COM (data/com-story.js) ----- */
    co_found: () => {
      const a = mx(126), b = mx(356);
      return `<g ${an("rise", 0.05)}>${winBox(a, 100, 180, 100, "Microsoft Store", "f-s1 s-rose", 0.05)}${txt(a, 118, tr("«Get Python»", "“Get Python”"), "t-ink2", 12, b8)}</g>
      <g ${an("fade", 0.3)}>${txt(a, 172, tr("python: مش موجودة", "python: not there"), "t-rose", 11.5, b8)}</g>
      ${term(b, 100, 200, 76, ["> $PSVersionTable.PSVersion", "5.1"], 0.6, 11)}${check(b, 160, 1.2)}
      <g ${an("fade", 1.3)}>${txt(b, 192, tr("PowerShell: موجود", "PowerShell: there"), "t-mint", 11.5, b8)}</g>
      ${pill(240, 238, 340, 36, tr("جاي مع الويندوز نفسه", "ships with Windows itself"), "f-acc-soft s-acc", "t-acc", 12, 1.5)}
      ${cap(tr("الأداة كانت موجودة… محدش بص", "the tool was there… nobody looked"), 1.8, 292)}`;
    },
    co_ps: () => {
      const X = rowX(4, 100, 10), P = [tr("ويندوز ١٠ و١١", "Windows 10, 11"), tr("نسخة 5.1", "version 5.1"), tr("من مايكروسوفت", "by Microsoft"), tr("الـ IT بيستخدمه", "IT uses it")];
      return `${term(240, 80, 300, 64, ["PS C:\\>", "Windows PowerShell 5.1"], 0.05, 12)}
      ${P.map((s, i) => `<g ${an("pop", 0.5 + i * 0.15)}>${box(X(i), 158, 100, 52, "f-mint-soft s-mint")}${check(X(i), 138, 0.6 + i * 0.15)}${txt(X(i), 172, s, "t-mint", 10.5, b8)}</g>`).join("")}
      ${flowRow(["PowerShell", "Python"], 236, 150, 60, 1.3, ["f-acc s-acc", "f-s1 s-acc"], ["t-white", "t-acc"], 12, 36)}
      <g ${an("fade", 1.6)}>${txt(240, 270, tr("الأول · وبعدين للبيانات", "first · then for data"), "t-ink3", 10.5, bold)}</g>
      ${cap(tr("الموجود في كل مكان… أول اختيار", "what's everywhere… comes first"), 1.8, 298)}`;
    },
    co_com: () => {
      const a = mx(120), b = mx(364), d = dirx();
      return `<g ${an("fade", 0.05)}>${txt(240, 40, "Component Object Model", "t-acc", 13, b8 + ltr)}</g>
      ${term(a, 112, 200, 70, ["$xl = New-Object", "  -ComObject Excel.Application"].map(nb), 0.2, 10.5)}
      ${arrow(a + d * 104, 112, b - d * 54, 112, 0.7)}
      <g ${an("pop", 0.9)}>${xl(b, 112, 1.6)}<path d="M${b - 34} 84 a40 40 0 0 1 0 56" class="s-mint" stroke-width="2" fill="none" stroke-dasharray="3 4"/></g>
      <g ${an("fade", 1.1)}>${txt(b, 162, tr("إكسل في الخلفية", "Excel in the background"), "t-ink", 11.5, b8)}</g>
      ${flowRow([tr("افتح", "open"), tr("اقرا", "read"), tr("اكتب", "write"), tr("احفظ", "save")], 226, 82, 22, 1.3, "f-acc-soft s-acc", "t-acc", 11, 34)}
      ${cap(tr("سطر واحد… وإكسل بيستنى أوامرك", "one line… and Excel awaits your orders"), 2.3, 290)}`;
    },
    co_tree: () => {
      const N = ["Application", "Workbooks", "Workbook", "Worksheets", "Worksheet", "Range"], S = ar() ? ["البرنامج", "كل الملفات", "ملف واحد", "كل الشيتات", "شيت واحد", "خلية"] : ["the program", "all files", "one file", "all sheets", "one sheet", "a cell"];
      return `${N.map((n, i) => `<g ${an("rise", 0.05 + i * 0.18)}>${box(mx(110 + i * 30), 40 + i * 42, 150, 32, i === 5 ? "f-acc s-acc" : "f-s1 s-acc")}${txt(mx(110 + i * 30), 45 + i * 42, i === 5 ? "Range(\"A1\")" : n, i === 5 ? "t-white" : "t-acc", 11.5, b8 + ltr)}${txt(mx(110 + i * 30) + dirx() * 128, 45 + i * 42, S[i], "t-ink2", 10.5, bold)}</g>`).join("")}
      ${cap(tr("كل سطر… عنوان في الشجرة", "every line… an address in the tree"), 1.5, 306)}`;
    },
    co_readonly: () => {
      const f = mx(130), o = mx(370), d = dirx();
      return `${term(240, 52, 420, 44, ["$xl.Workbooks.Open($path, 0, $true)"], 0.05, 11.5)}
      <g ${an("pop", 0.5)}><rect x="${240 + 120}" y="40" width="50" height="22" rx="5" class="s-amber" fill="none" stroke-width="2.5"/></g>
      <g ${an("fade", 0.7)}>${txt(365 + 20, 92, "read-only", "t-amber", 11, b8 + ltr)}</g>
      <g ${an("rise", 0.9)}>${folder(f, 170, 150, 110, "f-mint-soft s-mint")}${txt(f, 160, "Data\\", "t-mint", 13, b8 + ltr)}${txt(f, 182, "Week_01.xlsx", "t-ink2", 10.5, bold + ltr)}</g>
      <g ${an("fade", 1.1)}>${txt(f, 248, tr("ما يتلمسش", "never touched"), "t-mint", 11.5, b8)}</g>
      ${arrow(f + d * 80, 170, o - d * 80, 170, 1.2)}
      <g ${an("rise", 1.3)}>${folder(o, 170, 150, 110, "f-amber-soft s-amber")}${txt(o, 160, "Output\\", "t-amber", 13, b8 + ltr)}${txt(o, 182, "Run_Log.txt", "t-ink2", 10.5, bold + ltr)}</g>
      <g ${an("fade", 1.4)}>${txt(o, 248, tr("هنا بس بنكتب", "the only place we write"), "t-amber", 11.5, b8)}</g>
      ${cap(tr("الأصل… ما يتلمسش", "the original… stays untouched"), 1.6, 290)}`;
    },
    co_array: () => {
      const a = mx(126), b = mx(356), d = dirx();
      return `<g ${an("fade", 0.05)}>${txt(a, 42, tr("خلية خلية", "cell by cell"), "t-rose", 12.5, b8)}${txt(b, 42, tr("مرة واحدة", "all at once"), "t-mint", 12.5, b8)}</g>
      <g ${an("rise", 0.2)}>${[0, 1, 2, 3, 4, 5].map((r) => [0, 1, 2, 3, 4].map((c) => `<rect x="${a - 70 + c * 28}" y="${60 + r * 20}" width="24" height="16" rx="3" class="f-rose-soft"/>`).join("")).join("")}</g>
      ${[0, 1, 2, 3, 4].map((k) => `<path ${an("draw", 0.4 + k * 0.12, "s-rose")} pathLength="1" d="M${a - 58 + k * 28} 62 q${d * 10} -14 ${d * 20} 0" stroke-width="1.5" fill="none"/>`).join("")}
      <g ${an("fade", 1.0)}>${txt(a, 200, tr("٩٠ رحلة · ٤٠ ثانية", "90 trips · 40 seconds"), "t-rose", 12, b8)}</g>
      <g ${an("rise", 0.6)}><rect x="${b - 72}" y="60" width="144" height="116" rx="6" class="f-mint-soft s-mint" stroke-width="2"/>${[0, 1, 2, 3, 4].map((r) => `<line x1="${b - 72}" y1="${80 + r * 20}" x2="${b + 72}" y2="${80 + r * 20}" class="s-mint" stroke-width="1"/>`).join("")}</g>
      <g ${an("fade", 1.2)}>${txt(b, 200, tr("رحلة واحدة · ٤ ثواني", "1 trip · 4 seconds"), "t-mint", 12, b8)}</g>
      ${term(240, 246, 300, 40, ["$data = $ws.UsedRange.Value2"], 1.3, 11.5)}
      ${cap(tr("رحلة واحدة… بدل ألف", "one trip… instead of a thousand"), 1.7, 296)}`;
    },
    co_alerts: () => {
      const a = mx(140), b = mx(366);
      return `<g ${an("rise", 0.05)}>${box(a, 104, 210, 120, "f-s2 s-line2", 2, 'stroke-dasharray="6 5"')}${txt(a, 62, tr("إكسل مخفي", "hidden Excel"), "t-ink3", 11, b8)}</g>
      <g ${an("pop", 0.4)}>${box(a, 112, 170, 66, "f-s1 s-amber")}${txt(a, 106, tr("تحب تحفظ التغييرات؟", "Save changes?"), "t-amber", 11.5, b8)}${txt(a, 128, tr("نعم · لا", "Yes · No"), "t-ink3", 10.5, bold)}</g>
      <g ${an("fade", 0.8)}>${txt(a, 190, tr("مستني… ١٠ دقايق", "waiting… 10 minutes"), "t-rose", 11.5, b8)}</g>
      ${term(b, 104, 210, 66, ["$xl.Visible = $false", "$xl.DisplayAlerts = $false"], 1.0, 10.5)}
      <g ${an("fade", 1.5)}>${txt(b, 160, tr("والحفظ مكتوب صراحة", "saving stated in code"), "t-mint", 11, b8)}</g>
      ${pill(240, 236, 320, 34, tr("إكسل عمره ما يسأل", "Excel never asks"), "f-mint-soft s-mint", "t-mint", 12, 1.6)}
      ${cap(tr("إكسل المخفي… ما ينفعش يسأل", "a hidden Excel… mustn't ask"), 1.8, 290)}`;
    },
    co_finally: () => {
      const a = mx(130), b = mx(356);
      return `<g ${an("rise", 0.05)}>${winBox(a, 118, 200, 160, "Task Manager", "f-s1 s-line2", 0.05)}${[0, 1, 2, 3, 4].map((k) => `${xl(a - 66, 70 + k * 30, 0.55)}${txt(a + 10, 75 + k * 30, "EXCEL.EXE", "t-rose", 10.5, b8 + ltr)}`).join("")}</g>
      ${term(b, 112, 220, 132, ["try {", "    ... work ...", "}", "finally {", "    $wb.Close($false)", "    $xl.Quit()"].map(nb), 0.6, 10.5, (i) => (i >= 3 ? "t-white" : "t-crt"))}
      <g ${an("fade", 1.5)}>${txt(b, 198, tr("بيتنفّذ دايمًا، حتى بعد الخطأ", "always runs, even after an error"), "t-mint", 10.5, b8)}</g>
      ${pill(240, 244, 330, 34, tr("Task Manager نضيف بعد كل تشغيل", "Task Manager clear after every run"), "f-mint-soft s-mint", "t-mint", 11, 1.7)}
      ${cap(tr("اللي فتحته… اقفله، حتى لو غلطت", "what you open… close, even after a mistake"), 1.9, 292)}`;
    },
    co_python: () => {
      const a = mx(110), m = 240, b = mx(370), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(a, 92, 160, 74, "f-acc-soft s-acc")}${txt(a, 86, "PowerShell", "t-acc", 13, b8 + ltr)}${txt(a, 106, tr("إكسل · وورد · باوربوينت", "Excel · Word · PowerPoint"), "t-ink2", 10, bold)}</g>
      <g ${an("rise", 0.3)}>${fileIcon(m, 92, "s-amber", 0.3)}${txt(m, 132, "CSV", "t-amber", 12, b8 + ltr)}</g>
      ${arrow(a + d * 82, 92, m - d * 22, 92, 0.5)}${arrow(m + d * 22, 92, b - d * 82, 92, 0.7)}
      <g ${an("rise", 0.6)}>${box(b, 92, 160, 74, "f-mint-soft s-mint")}${txt(b, 86, "Python", "t-mint", 13, b8 + ltr)}${txt(b, 106, tr("بيانات · قاعدة · صفحة", "data · database · page"), "t-ink2", 10, bold)}</g>
      <g ${an("rise", 1.0)}>${box(240, 196, 300, 50, "f-rose-soft s-rose")}${mono(240 - 116, 192, "import win32com  # pywin32", "t-rose", 11)}${txt(240, 213, tr("باكدج: ممنوع", "a package: blocked"), "t-rose", 10.5, b8)}</g>
      <path ${an("draw", 1.3, "s-rose")} pathLength="1" d="M${240 - 150} 196 L${240 + 150} 196" stroke-width="2.5" fill="none"/>
      ${cap(tr("كل أداة في مكانها… والـ CSV بينهم", "each tool in its place… CSV between them"), 1.6, 270)}`;
    },
    co_bat: () => {
      return `<g ${an("rise", 0.05)}>${fileIcon(mx(70), 72, "s-acc", 0.05)}${txt(mx(70), 108, "Run_Count.bat", "t-acc", 10.5, b8 + ltr)}</g>
      ${term(mx(280), 72, 340, 64, ["powershell -NoProfile -ExecutionPolicy Bypass", "  -File \"%~dp0count_rows.ps1\"   &   pause"].map(nb), 0.3, 10)}
      <g ${an("rise", 0.9)}>${box(mx(150), 178, 200, 56, "f-acc-soft s-acc")}${txt(mx(150), 172, "%~dp0", "t-acc", 13, b8 + ltr)}${txt(mx(150), 194, tr("الفولدر اللي الملف ده فيه", "the folder this file is in"), "t-ink2", 10.5, bold)}</g>
      <g ${an("rise", 1.1)}>${box(mx(362), 178, 190, 56, "f-amber-soft s-amber")}${txt(mx(362), 172, "Bypass", "t-amber", 13, b8 + ltr)}${txt(mx(362), 194, tr("للسكريبت ده بس، اللي اتراجع", "this reviewed script only"), "t-ink2", 10.5, bold)}</g>
      ${pill(240, 252, 260, 34, tr("دبل كليك… وخلاص", "a double-click… that's it"), "f-mint s-mint", "t-white", 12, 1.4)}
      ${cap(tr("دبل كليك… ومش محتاج يعرف حاجة", "a double-click… and they need to know nothing"), 1.7, 298)}`;
    },
    co_bom: () => {
      const a = mx(130), b = mx(356);
      return `<g ${an("rise", 0.05)}>${box(a, 92, 190, 70, "f-rose-soft s-rose")}${txt(a, 86, "Ã˜ÂªÃ™â€¦", "t-rose", 14, b8 + ltr)}${txt(a, 108, "UTF-8", "t-ink3", 10.5, bold + ltr)}</g>
      ${arrow(a + dirx() * 100, 92, b - dirx() * 100, 92, 0.5)}
      <g ${an("rise", 0.7)}>${box(b, 92, 190, 70, "f-mint-soft s-mint")}${txt(b, 86, tr("تم: ١٨ صف في Week_01", "Done: 18 rows in Week_01"), "t-mint", 11.5, b8)}${txt(b, 108, "UTF-8 with BOM", "t-ink3", 10.5, bold + ltr)}</g>
      <g ${an("rise", 1.0)}>${winBox(240, 196, 300, 74, tr("حفظ باسم", "Save as"), "f-s1 s-line2", 1.0)}${txt(240, 222, tr("الترميز: UTF-8 with BOM", "Encoding: UTF-8 with BOM"), "t-acc", 11.5, b8)}</g>
      ${cap(tr("علامة صغيرة… والعربي يتقري صح", "a small mark… and the Arabic reads right"), 1.4, 278)}`;
    },
    co_cliff: () => {
      const q = mx(396);
      return `<g ${an("rise", 0.05)}>${[0, 1, 2, 3].map((k) => `<rect x="${mx(160) - 110 + k * 4}" y="${44 + k * 4}" width="220" height="170" rx="8" class="f-ink2"/>`).join("")}</g>
      ${term(mx(160) + 12, 136, 220, 170, ["# step1 + step2 + step3", "...", "line 200", "line 214  ERROR", "Exception calling", "\"Item\" with \"1\" argument", "...", "line 300"], 0.3, 10.5, (i) => (i === 3 ? "t-white" : "t-crt"))}
      <g ${an("pop", 1.3)}>${shield(q, 112, 1.1)}${txt(q, 128, ar() ? "؟" : "?", "t-acc", 22, b8)}</g>
      <g ${an("fade", 1.6)}>${txt(q, 180, tr("الدرس الجاي", "next lesson"), "t-acc", 12.5, b8)}</g>
      <g ${an("rise", 1.8)}>${box(240, 260, 380, 40, "f-amber-soft s-amber")}${txt(240, 265, tr("الغلطة في أنهي جزء؟", "which part holds the mistake?"), "t-amber", 12, b8)}</g>`;
    },
    /* ----- step by step (data/steps-story.js) ----- */
    st_monster: () => {
      const a = mx(140), q = mx(376);
      return `<g ${an("rise", 0.05)}>${[0, 1, 2].map((k) => `<rect x="${a - 90 + k * 6}" y="${46 + k * 6}" width="180" height="200" rx="8" class="f-ink2"/>`).join("")}</g>
      ${term(a + 12, 158, 180, 200, ["# 300 lines", "...", "fix 1: 40 lines", "...", "fix 2: 30 lines", "...", "line 214 ?"], 0.3, 10.5, (i) => (i === 6 ? "t-white" : "t-crt"))}
      <g ${an("rise", 1.0)}>${box(q, 96, 170, 70, "f-rose-soft s-rose")}${txt(q, 90, tr("الإجمالي غريب", "an odd total"), "t-rose", 12, b8)}${txt(q, 110, tr("بعد كل تصليح", "after every fix"), "t-ink2", 10.5, bold)}</g>
      <g ${an("rise", 1.3)}>${box(q, 190, 170, 70, "f-s1 s-line2")}${txt(q, 184, tr("أنهي جزء صح؟", "which part is right?"), "t-ink", 12, b8)}${txt(q, 204, tr("مش معروف", "unknown"), "t-ink3", 10.5, bold)}</g>
      ${cap(tr("الأداة الكبيرة… بتخبّي غلطتها", "a big tool… hides its mistake"), 1.6, 292)}`;
    },
    st_small: () => {
      const a = mx(130), b = mx(352), d = dirx();
      return `<g ${an("rise", 0.05)}>${[0, 1, 2, 3, 4, 5].map((k) => `<rect x="${a - 70 + k * 10}" y="${50 + k * 8}" width="90" height="70" rx="5" class="f-s2 s-line2" stroke-width="1.5"/>`).join("")}${txt(a, 170, tr("١٣ أسبوع · عمودين VLOOKUP", "13 weeks · 2 VLOOKUP columns"), "t-ink3", 10.5, bold)}</g>
      ${arrow(a + d * 92, 96, b - d * 92, 96, 0.5)}
      <g ${an("rise", 0.7)}>${sheet(b - 46, 96, 82, 64, "f-s1 s-acc", "Week_01", 0.7)}${sheet(b + 46, 96, 82, 64, "f-s1 s-acc", "Week_02", 0.8)}${txt(b, 152, tr("١٨ + ١٨ = ٣٦ صف", "18 + 18 = 36 rows"), "t-acc", 12, b8)}${txt(b, 172, tr("بحث واحد: اسم البلد", "one lookup: the country"), "t-ink2", 10.5, bold)}</g>
      ${pill(240, 236, 330, 36, tr("على ٣٦ صف… تعدّي بإيدك", "with 36 rows… you can count by hand"), "f-mint-soft s-mint", "t-mint", 12, 1.2)}
      ${cap(tr("مثال صغير… طريقة كاملة", "a small example… a complete method"), 1.5, 290)}`;
    },
    st_split: () => {
      const X = rowX(3, 130, 24), S = [tr("تحت بعض", "stack"), tr("اسم البلد", "country name"), tr("تقرير + CSV", "report + CSV")];
      return `${S.map((s, i) => `<g ${an("rise", 0.1 + i * 0.3)}>${box(X(i), 112, 130, 140, "f-s1 s-acc")}${txt(X(i), 66, tr("الخطوة ", "Step ") + digits(i + 1), "t-acc", 12.5, b8)}${txt(X(i), 92, s, "t-ink", 11.5, b8)}${[`Prompt_${i + 1}.txt`, `step${i + 1}.ps1`, `Run_Step${i + 1}.bat`].map((f, k) => txt(X(i), 122 + k * 20, f, "t-ink3", 10, bold + ltr)).join("")}</g>${i ? arrow(X(i - 1) + dirx() * 66, 112, X(i) - dirx() * 68, 112, 0.25 + i * 0.3) : ""}`).join("")}
      ${pill(240, 230, 360, 34, tr("وظيفة واحدة · سكريبت واحد · سطور في السجل", "one job · one script · lines in the log"), "f-acc-soft s-acc", "t-acc", 11, 1.1)}
      ${cap(tr("خطوة واحدة… مكان واحد للغلطة", "one step… one place for the mistake"), 1.4, 290)}`;
    },
    st_step1: () => {
      const a = mx(110), b = mx(330), d = dirx();
      return `<g ${an("rise", 0.05)}>${sheet(a, 76, 100, 60, "f-s1 s-acc", "Week_01", 0.05)}${sheet(a, 152, 100, 60, "f-s1 s-acc", "Week_02", 0.2)}</g>
      ${arrow(a + d * 54, 76, b - d * 104, 108, 0.5)}${arrow(a + d * 54, 152, b - d * 104, 120, 0.6)}
      ${term(b, 114, 200, 116, ["Week_01.xlsx  18 rows  845", "Week_02.xlsx  18 rows  920", "Data          36 rows  1,765", "", "step1_stack.ps1: 60 lines"].filter(Boolean), 0.8, 10.5, (i) => (i === 2 ? "t-white" : "t-crt"))}
      <g ${an("fade", 1.8)}>${txt(240, 228, tr("فتح للقراءة · قراية مرة · SourceFile · كتابة مرة · finally", "read-only · read once · SourceFile · write once · finally"), "t-ink2", 10.5, b8)}</g>
      ${cap(tr("٦٠ سطر مفهومين… أحسن من ٣٠٠", "60 understood lines… beat 300"), 2.0, 286)}`;
    },
    st_gate: () => {
      const g = mx(240);
      return `${flowRow([tr("الخطوة ١", "Step 1"), tr("البوابة", "the gate"), tr("الخطوة ٢", "Step 2")], 70, 120, 34, 0.05, ["f-s1 s-acc", "f-amber s-amber", "f-s2 s-line2"], ["t-acc", "t-white", "t-ink3"], 12)}
      <g ${an("rise", 0.9)}>${box(240, 160, 300, 86, "f-amber-soft s-amber")}${txt(240, 140, "18 + 18 = 36", "t-ink", 13, b8 + ltr)}${txt(240, 162, "845 + 920 = 1,765", "t-ink", 13, b8 + ltr)}${txt(240, 186, tr("Week_01 في إكسل: ٨٤٥", "Week_01 in Excel: 845"), "t-amber", 11.5, b8)}</g>${check(240 + dirx() * 168, 160, 1.4)}
      ${pill(240, 238, 340, 34, tr("رقم بتتأكد منه بنفسك… وبعدين تكمّل", "a figure you confirm yourself… then go on"), "f-mint-soft s-mint", "t-mint", 11, 1.6)}
      ${cap(tr("كل خطوة… ليها بوابة", "every step… has a gate"), 1.8, 290)}`;
    },
    st_step2: () => {
      const H = ["CountryCode", "Qty", "CountryName"], R = [["EG", "45", "Egypt"], ["KW", "40", "Kuwait"], ["KW", "55", "Kuwait"]], X = rowX(3, 120, 6);
      return `<g ${an("rise", 0.05)}>${H.map((h, i) => `${box(X(i), 52, 120, 30, i === 2 ? "f-mint s-mint" : "f-acc-soft s-acc")}${txt(X(i), 56, h, i === 2 ? "t-white" : "t-acc", 11, b8 + ltr)}`).join("")}</g>
      ${R.map((r, k) => `<g ${an("rise", 0.3 + k * 0.15)}>${r.map((v, i) => `${box(X(i), 88 + k * 32, 120, 28, i === 2 ? "f-mint-soft s-mint" : "f-s1 s-line2")}${txt(X(i), 92 + k * 32, v, i === 2 ? "t-mint" : "t-ink", 11, b8 + ltr)}`).join("")}</g>`).join("")}
      <g ${an("rise", 1.0)}>${box(240, 210, 420, 34, "f-s1 s-mint")}${mono(48, 215, "=VLOOKUP(D2, Countries!A:B, 2, FALSE)", "t-mint", 12)}</g>
      <g ${an("fade", 1.3)}>${txt(240, 250, tr("٣٦ معادلة · #N/A صفر · الصفوف لسه ٣٦", "36 formulas · zero #N/A · still 36 rows"), "t-ink2", 11, b8)}</g>
      ${cap(tr("عمود جديد… والصفوف زي ما هي", "a new column… the rows unchanged"), 1.5, 290)}`;
    },
    st_step3: () => {
      const a = mx(120), m = 240, b = mx(370), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(a, 100, 170, 120, "f-acc-soft s-acc")}${txt(a, 58, "PowerShell", "t-acc", 12, b8 + ltr)}${txt(a, 86, "Report", "t-ink", 12, b8 + ltr)}${txt(a, 108, tr("الإجمالي ١٬٧٦٥", "total 1,765"), "t-ink2", 11, bold)}${txt(a, 128, tr("كل بلد · كل خط", "each country · line"), "t-ink3", 10, bold)}</g>
      ${arrow(a + d * 88, 100, m - d * 26, 100, 0.5)}
      <g ${an("rise", 0.7)}>${fileIcon(m, 100, "s-amber", 0.7)}${txt(m, 140, "Two_Weeks.csv", "t-amber", 10.5, b8 + ltr)}${txt(m, 156, tr("٣٦ صف", "36 rows"), "t-ink3", 10, bold)}</g>
      ${arrow(m + d * 26, 100, b - d * 72, 100, 1.0, "s-line2", "5 5")}
      <g ${an("fade", 1.1)}>${box(b, 100, 140, 70, "f-s2 s-mint", 2, 'stroke-dasharray="5 5"')}${txt(b, 96, "Python", "t-mint", 12, b8 + ltr)}${txt(b, 114, tr("الخطوة الجاية", "the next step"), "t-ink3", 10, bold)}</g>
      ${pill(240, 222, 320, 36, tr("الـ CSV… الجسر بين الأداتين", "the CSV… the bridge between the tools"), "f-amber-soft s-amber", "t-amber", 12, 1.4)}
      ${cap(tr("PowerShell خلّص الإكسل… وPython يكمّل", "PowerShell finished Excel… Python carries on"), 1.7, 286)}`;
    },
    st_dp0: () => {
      const a = mx(130), b = mx(356);
      return `<g ${an("rise", 0.05)}>${box(a, 96, 200, 92, "f-rose-soft s-rose")}${mono(a - 90, 82, "C:\\Users\\...\\Desktop", "t-rose", 10.5)}${mono(a - 90, 100, "\\tool\\step1.ps1", "t-rose", 10.5)}${txt(a, 124, tr("مسار جهازها هي", "her machine's path"), "t-ink2", 10.5, b8)}</g>
      <g ${an("fade", 0.4)}>${txt(a, 162, tr("عند مشرف الخط: الملف مش موجود", "on the supervisor's PC: not found"), "t-rose", 10.5, b8)}</g>
      <g ${an("rise", 0.7)}>${box(b, 96, 200, 92, "f-mint-soft s-mint")}${mono(b - 90, 90, "%~dp0step1.ps1", "t-mint", 12)}${txt(b, 118, tr("فولدر ملف التشغيل نفسه", "the launcher's own folder"), "t-ink2", 10.5, b8)}</g>
      <g ${an("fade", 1.0)}>${txt(b, 162, tr("أي جهاز · أي فولدر", "any machine · any folder"), "t-mint", 11, b8)}</g>
      <g ${an("rise", 1.2)}>${folder(240, 228, 120, 70, "f-amber-soft s-amber")}${laptop(240 - dirx() * 120, 232, 0.8)}${laptop(240 + dirx() * 120, 232, 0.8)}</g>
      ${cap(tr("الفولدر يتنقل… والأداة تشتغل", "the folder moves… the tool runs"), 1.5, 296)}`;
    },
    st_exit: () => {
      return `${flowRow([tr("الخطوة ١", "Step 1"), tr("الخطوة ٢", "Step 2"), tr("التقرير", "the report")], 62, 120, 34, 0.05, ["f-rose-soft s-rose", "f-s1 s-line2", "f-s1 s-line2"], ["t-rose", "t-ink2", "t-ink2"], 12)}
      <g ${an("fade", 0.7)}>${txt(rowX(3, 120, 34)(0), 102, tr("«Week_02 مش موجود»", "“Week_02 not found”"), "t-rose", 10.5, b8)}${txt(rowX(3, 120, 34)(2), 102, tr("بأسبوع واحد!", "one week only!"), "t-rose", 10.5, b8)}</g>
      ${term(240, 180, 400, 92, ["step1_stack.ps1   -> exit 1", "if errorlevel 1 goto :stop", "Run_All: STOPPED at step 1"], 1.0, 11, (i) => (i === 2 ? "t-white" : "t-crt"))}
      ${cap(tr("الوقفة لازم تتسمع… مش تتكتب بس", "a stop must be heard… not just written"), 1.7, 270)}`;
    },
    st_runall: () => {
      const a = mx(56), d = dirx();
      return `<g ${an("pop", 0.05)}>${fileIcon(a, 74, "s-mint", 0.05)}${txt(a, 112, "Run_All.bat", "t-mint", 11, b8 + ltr)}</g>
      ${flowRow(["1", "2", "3"], 74, 64, 26, 0.4, "f-mint-soft s-mint", "t-mint", 13, 40).replace(/x="(\d+(\.\d+)?)"/g, (m) => m)}
      <g ${an("fade", 1.2)}>${txt(mx(400), 80, tr("٢٠ ثانية", "20 seconds"), "t-ink2", 12, b8)}</g>
      <g ${an("rise", 1.3)}>${box(240, 168, 380, 80, "f-s1 s-line2")}${txt(240, 146, "Output\\", "t-amber", 12, b8 + ltr)}${txt(240, 168, "Two_Weeks.xlsx  ·  Two_Weeks.csv", "t-ink", 11, b8 + ltr)}${txt(240, 188, "Run_Log.txt", "t-ink", 11, b8 + ltr)}</g>
      <g ${an("rise", 1.6)}>${person(mx(110), 262, 0.8, "f-ink2")}${txt(mx(110) + d * 96, 248, tr("مشرف الخط: «تم»", "the supervisor: “Done”"), "t-ink", 11.5, b8)}</g>
      ${cap(tr("ليك: تلات خطوات… ليه: ضغطة واحدة", "for you: three steps… for them: one click"), 1.9, 300)}`;
    },
    st_scale: () => {
      const a = mx(130), b = mx(350), d = dirx();
      return `<g ${an("rise", 0.05)}>${sheet(a - 30, 92, 70, 54, "f-s1 s-acc", "W01", 0.05)}${sheet(a + 30, 92, 70, 54, "f-s1 s-acc", "W02", 0.1)}${txt(a, 148, tr("أسبوعين", "two weeks"), "t-acc", 12, b8)}</g>
      ${arrow(a + d * 76, 92, b - d * 96, 92, 0.4)}
      <g ${an("rise", 0.6)}>${[0, 1, 2, 3, 4, 5, 6].map((k) => `<rect x="${b - 80 + k * 18}" y="${66 + (k % 2) * 6}" width="44" height="40" rx="4" class="f-s1 s-acc" stroke-width="1.5"/>`).join("")}${txt(b, 148, tr("١٣ أسبوع", "13 weeks"), "t-acc", 12, b8)}</g>
      ${term(240, 210, 380, 60, ["Run_All.bat   log: 13 lines", "code changed: 0 lines"], 1.0, 11, (i) => (i ? "t-white" : "t-crt"))}
      ${cap(tr("صغير في التجربة… كبير في الاستخدام", "small to test… large to use"), 1.5, 280)}`;
    },
    st_cliff: () => {
      const a = mx(150), q = mx(398);
      const rows = [["Egypt", "18"], ["Kuwait", "8"], ["UAE", "5"]];
      return `<g ${an("rise", 0.05)}>${box(a, 112, 220, 150, "f-s1 s-line2")}${txt(a, 56, "Report", "t-ink", 12, b8 + ltr)}${txt(a, 80, tr("الإجمالي ١٬٧٦٥", "total 1,765"), "t-mint", 12, b8)}${check(a + dirx() * 86, 76, 0.4)}${rows.map(([c, v], k) => `${txt(a - 40, 112 + k * 22, c, k === 1 ? "t-rose" : "t-ink2", 11, b8 + ltr)}${txt(a + 60, 112 + k * 22, v, k === 1 ? "t-rose" : "t-ink2", 11, b8 + ltr)}`).join("")}</g>
      <g ${an("pop", 0.6)}><rect x="${a - 96}" y="${112 + 22 - 15}" width="192" height="21" rx="4" class="s-rose" fill="none" stroke-width="2.5"/></g>
      <g ${an("rise", 0.9)}>${bubble(q, 72, 170, 58, "f-amber-soft s-amber", ar())}${txt(q, 66, tr("«الكويت ٨ بس؟", "“Kuwait only 8?"), "t-amber", 11.5, b8)}${txt(q, 84, tr("شاحنين أكتر بكتير»", "we shipped far more”"), "t-amber", 11, b8)}</g>
      <g ${an("pop", 1.3)}>${shield(q, 172, 1)}${txt(q, 182, ar() ? "؟" : "?", "t-acc", 20, b8)}</g>
      <g ${an("fade", 1.6)}>${txt(q, 232, tr("الدرس الجاي", "next lesson"), "t-acc", 12.5, b8)}</g>
      <g ${an("rise", 1.8)}>${box(a, 236, 220, 40, "f-s1 s-rose")}${txt(a, 241, tr("اشتغل من غير ولا خطأ", "ran without a single error"), "t-rose", 11.5, b8)}</g>`;
    },
    /* ----- reviewing code (data/review-story.js) ----- */
    rv_eight: () => {
      const a = mx(130), b = mx(360);
      return `<g ${an("rise", 0.05)}>${bubble(a, 74, 200, 54, "f-acc-soft s-acc", !ar())}${txt(a, 79, tr("«الرقم ده صح؟»", "“Is this figure right?”"), "t-acc", 12, b8)}</g>
      <g ${an("rise", 0.5)}>${bubble(b, 150, 210, 70, "f-s1 s-line2", ar())}${txt(b, 144, tr("«أيوه، الكود بيحسب", "“Yes, the code calculates"), "t-ink2", 11, b8)}${txt(b, 162, tr("البلاد صح»", "the countries correctly”"), "t-ink2", 11, b8)}</g>
      <g ${an("fade", 0.9)}>${txt(b, 208, tr("نفس النموذج اللي كتب الكود", "the same model that wrote it"), "t-rose", 10.5, b8)}</g>
      ${pill(240, 250, 300, 34, tr("«صح؟» مش مراجعة", "“right?” isn't a review"), "f-amber-soft s-amber", "t-amber", 12, 1.2)}
      ${cap(tr("المراجعة لازم تيجي من برّه", "the review must come from outside"), 1.5, 296)}`;
    },
    rv_ran: () => {
      const a = mx(126), b = mx(354);
      return `<g ${an("rise", 0.05)}>${term(a, 100, 200, 84, ["line 41  ERROR", "Cannot find Qty"], 0.05, 11, () => "t-white")}${txt(a, 170, tr("بتصرخ: سهلة", "shouts: easy"), "t-mint", 12, b8)}</g>
      <g ${an("rise", 0.4)}>${term(b, 100, 200, 84, ["Report: done", "Kuwait  8"], 0.4, 11)}${txt(b, 170, tr("ساكتة: خطيرة", "silent: dangerous"), "t-rose", 12, b8)}</g>
      ${pill(240, 230, 360, 36, tr("المراجعة: «الأرقام صح؟» مش «اشتغل؟»", "review: “are the figures right?”, not “did it run?”"), "f-acc-soft s-acc", "t-acc", 11, 1.0)}
      ${cap(tr("الغلطة الساكتة… هي الخطيرة", "the silent mistake… is the dangerous one"), 1.3, 290)}`;
    },
    rv_plan: () => {
      const P = ar() ? ["# اقرا Data", "# اعمل جدول البلاد", "# اعمل جدول الخطوط", "# احفظ CSV"] : ["# read Data", "# build the countries table", "# build the lines table", "# save CSV"];
      return `${P.map((s, i) => `<g ${an("rise", 0.1 + i * 0.2)}>${box(mx(170), 62 + i * 44, 260, 36, "f-s1 s-acc")}${txt(mx(170), 67 + i * 44, s, "t-ink", 11.5, b8)}</g>${check(mx(318), 62 + i * 44, 0.3 + i * 0.2)}`).join("")}
      <g ${an("rise", 1.0)}>${box(mx(400), 106, 120, 80, "f-s2 s-line2", 2, 'stroke-dasharray="5 5"')}${txt(mx(400), 98, tr("جزء زيادة؟", "an extra part?"), "t-ink3", 11, b8)}${txt(mx(400), 118, tr("مفيش", "none"), "t-mint", 12, b8)}</g>
      ${cap(tr("الكود يعمل اللي طلبته… بس", "the code does what you asked… only"), 1.3, 268)}`;
    },
    rv_imports: () => {
      const W = ["import", "pip", "Invoke-WebRequest", "http"], X = rowX(4, 114, 6);
      return `${W.map((w, i) => `<g ${an("pop", 0.05 + i * 0.15)}>${box(X(i), 56, 114, 34, "f-amber-soft s-amber")}${txt(X(i), 60, w, "t-amber", 9.5, b8 + ltr)}</g>`).join("")}
      ${term(mx(150), 150, 260, 92, ["step1..3.ps1:", "  New-Object -ComObject Excel...", "load_sqlite.py:", "  import csv, sqlite3"].map(nb), 0.6, 10.5)}
      <g ${an("rise", 1.2)}>${shield(mx(390), 140, 1)}${check(mx(390), 140, 1.4)}</g>
      <g ${an("fade", 1.5)}>${txt(mx(390), 206, tr("المكتبة القياسية بس", "standard library only"), "t-mint", 11, b8)}</g>
      ${cap(tr("سؤال الأمن… اسأله إنت الأول", "the security question… ask it first"), 1.7, 270)}`;
    },
    rv_log: () => {
      return `${term(240, 104, 420, 120, ["step1  Week_01 18 rows 845 · Week_02 18 rows 920", "step1  Data 36 rows 1,765", "step2  #N/A: 0", "step3  Report: done"], 0.05, 11, (i) => (i === 3 ? "t-white" : "t-crt"))}
      <g ${an("pop", 1.1)}><rect x="${240 - 206}" y="${104 - 60 + 24 + 3 * 20 - 15}" width="412" height="21" rx="4" class="s-rose" fill="none" stroke-width="2.5"/></g>
      <g ${an("rise", 1.3)}>${box(240, 214, 420, 40, "f-mint-soft s-mint")}${mono(52, 219, "step3  Report 1,765 · countries 36 (!) · lines 1,765", "t-mint", 10.5)}</g>
      ${cap(tr("«done» مش سجل… الرقم هو اللي بيكشف", "“done” isn't a log… the figure exposes"), 1.6, 274)}`;
    },
    rv_hand: () => {
      const a = mx(140), b = mx(360);
      return `<g ${an("rise", 0.05)}>${box(a, 102, 210, 130, "f-s1 s-acc")}${txt(a, 56, tr("إكسل: فلتر KW", "Excel: filter KW"), "t-acc", 11.5, b8)}${[0, 1, 2, 3].map((k) => `<rect x="${a - 90}" y="${70 + k * 20}" width="180" height="15" rx="3" class="f-acc-soft"/>`).join("")}${txt(a, 160, "SUM(Qty) = 385", "t-mint", 13, b8 + ltr)}</g>
      <g ${an("rise", 0.5)}>${box(b, 102, 170, 130, "f-rose-soft s-rose")}${txt(b, 56, tr("التقرير", "the report"), "t-rose", 11.5, b8)}${txt(b, 106, "Kuwait  8", "t-rose", 16, b8 + ltr)}${txt(b, 142, tr("= عدد الصفوف", "= the row count"), "t-ink2", 11, b8)}</g>
      <g ${an("rise", 1.0)}>${box(240, 214, 360, 40, "f-amber-soft s-amber")}${mono(240 - 130, 219, "COUNTIF  ->  SUMIF", "t-amber", 13)}</g>
      ${cap(tr("فلتر وجمع… يكشفوا كلمة غلط", "a filter and a sum… expose one wrong word"), 1.3, 274)}`;
    },
    rv_wrong: () => {
      const a = mx(126), b = mx(356);
      return `<g ${an("rise", 0.05)}>${sheet(a, 70, 150, 64, "f-s1 s-amber", "Week_02 (copy)", 0.05)}${txt(a, 124, "Qty → Quantity", "t-amber", 12, b8 + ltr)}</g>
      <g ${an("rise", 0.5)}>${box(b, 82, 190, 72, "f-rose-soft s-rose")}${txt(b, 76, tr("قبل: كمّلت", "before: carried on"), "t-rose", 11.5, b8)}${txt(b, 96, tr("الإجمالي ٨٤٥ · ولا رسالة", "total 845 · no message"), "t-ink2", 10.5, bold)}</g>
      ${term(240, 186, 420, 56, ["Week_02.xlsx: no Qty column  ->  STOPPED"], 1.0, 11.5, () => "t-white")}
      <g ${an("fade", 1.3)}>${txt(240, 236, tr("بعد التصليح: وقفت برسالة فيها الملف والعمود", "after the fix: stopped, naming the file and the column"), "t-mint", 11, b8)}</g>
      ${cap(tr("غلّط الملف بإيدك… قبل ما يتغلّط لوحده", "break the file yourself… before it breaks on its own"), 1.5, 282)}`;
    },
    rv_explain: () => {
      const a = mx(130), b = mx(354);
      return `<g ${an("rise", 0.05)}>${box(a, 100, 200, 100, "f-mint-soft s-mint")}${txt(a, 66, tr("الشرح", "the explanation"), "t-mint", 12, b8)}${txt(a, 100, tr("«بيجمع الكمية", "“sums the quantity"), "t-ink", 11.5, b8)}${txt(a, 120, tr("لكل بلد»", "per country”"), "t-ink", 11.5, b8)}</g>
      ${term(b, 100, 210, 100, ["# countries table", "=COUNTIF(D:D, \"KW\")"], 0.4, 11)}
      <g ${an("pop", 0.9)}>${txt(240, 104, "≠", "t-rose", 26, b8)}</g>
      ${pill(240, 206, 340, 36, tr("قال يجمع؟ دوّر على SUM في الجزء ده", "it says sum? look for SUM in that part"), "f-amber-soft s-amber", "t-amber", 11, 1.1)}
      ${cap(tr("الشرح بيقول يجمع… الكود بيعدّ", "the explanation says sum… the code counts"), 1.4, 262)}`;
    },
    rv_second: () => {
      const a = mx(110), b = mx(300), d = dirx();
      return `<g ${an("rise", 0.05)}>${box(a, 76, 150, 50, "f-acc-soft s-acc")}${txt(a, 72, "Claude Code", "t-acc", 12, b8 + ltr)}${txt(a, 90, tr("كتب الكود", "wrote the code"), "t-ink3", 10, bold)}</g>
      <g ${an("rise", 0.3)}>${box(a, 160, 150, 50, "f-mint-soft s-mint")}${txt(a, 156, "Codex", "t-mint", 12, b8 + ltr)}${txt(a, 174, tr("بيراجع · Prompt_4", "reviews · Prompt_4"), "t-ink3", 10, bold)}</g>
      ${term(b + d * 30, 140, 270, 108, ["1. COUNTIF instead of SUMIF", "2. Masters.xlsx not read-only", "3. step 3 log: no figures"], 0.8, 10.5)}
      ${pill(240, 236, 360, 34, tr("أداة واحدة؟ جلسة جديدة بنفس القايمة", "one tool? a new session, same list"), "f-s1 s-line2", "t-ink2", 11, 1.5)}
      ${cap(tr("اللي ما كتبش… بيشوف أحسن", "whoever didn't write it… sees better"), 1.8, 288)}`;
    },
    rv_good: () => {
      const L = ["# ---- settings -------------------", "$Columns = 'Date','LineCode','ModelCode',", "           'CountryCode','Qty'", "# ---- countries table: SUMIF -----", "# ---- log: each table's sum ------"];
      return `${term(240, 98, 440, 128, L.map(nb), 0.05, 10.5, (i) => (i === 0 || i === 3 || i === 4 ? "t-white" : "t-crt"))}
      ${flowRow([tr("وظيفة لكل جزء", "a job per part"), tr("تعليقات", "comments"), tr("ثوابت فوق", "constants first"), tr("سجل بالأرقام", "a log of figures")], 206, 104, 10, 0.8, "f-mint-soft s-mint", "t-mint", 10.5, 36)}
      ${cap(tr("الكود الكويس… هو اللي تقدر تراجعه", "good code… is code you can review"), 1.9, 270)}`;
    },
    rv_fix: () => {
      const a = mx(130), b = mx(352);
      return `<g ${an("rise", 0.05)}>${box(a, 92, 190, 90, "f-rose-soft s-rose")}${txt(a, 76, tr("تكتب ٣٨٥ بإيدها؟", "type 385 by hand?"), "t-ink2", 11.5, b8)}${txt(a, 98, tr("الأسبوع الجاي: ٨ تاني", "next week: 8 again"), "t-rose", 11, b8)}</g>
      <g ${an("rise", 0.6)}>${box(b, 92, 190, 90, "f-mint-soft s-mint")}${txt(b, 72, tr("التصليح في الكود", "the fix in the code"), "t-mint", 11.5, b8)}${mono(b - 76, 98, "SUMIF · read-only", "t-mint", 11)}${mono(b - 76, 116, "log: figures", "t-mint", 11)}</g>
      ${flowRow(["Kuwait 385", "Egypt 880", tr("التصدير ٥٠٪", "export 50%"), "1,765"], 206, 100, 12, 1.0, "f-s1 s-mint", "t-ink", 11, 36)}
      ${cap(tr("التصليح بالإيد… بيرجع الأسبوع الجاي", "a hand fix… comes back next week"), 1.9, 266)}`;
    },
    rv_cliff: () => {
      const q = mx(396), Q = ar() ? ["أنهي خط عمل أكتر M108؟", "الكويت جالها منين؟", "أسبوع ١ ولا ٢؟", "…"] : ["which line made most M108?", "where did Kuwait's come from?", "week 1 or week 2?", "…"];
      return `${Q.map((s, i) => `<g ${an("rise", 0.1 + i * 0.25)}>${bubble(mx(170), 56 + i * 52, 260, 40, "f-amber-soft s-amber", !ar())}${txt(mx(170), 61 + i * 52, s, "t-amber", 11, b8)}</g>`).join("")}
      <g ${an("pop", 1.2)}>${shield(q, 112, 1.1)}${txt(q, 128, ar() ? "؟" : "?", "t-acc", 22, b8)}</g>
      <g ${an("fade", 1.5)}>${txt(q, 180, tr("الدرس الجاي", "next lesson"), "t-acc", 12.5, b8)}</g>
      <g ${an("fade", 1.7)}>${txt(240, 280, tr("٣٦ صف… والأسئلة مش هتخلص", "36 rows… and the questions never end"), "t-ink2", 12, b8)}</g>`;
    },
    /* ----- SQL and SQLite (data/sql-story.js) ----- */
    sq_questions: () => {
      const X = rowX(3, 120, 14);
      return `${[0, 1, 2, 3, 4, 5].map((k) => `<g ${an("rise", 0.05 + k * 0.12)}>${sheet(X(k % 3), 74 + Math.floor(k / 3) * 84, 120, 64, "f-s1 s-line2", tr("شيت ", "Sheet ") + digits(k + 1), 0.05 + k * 0.12)}</g>`).join("")}
      <g ${an("fade", 0.9)}>${txt(240, 210, tr("فلتر M108 · فلتر KW · أسبوع ١ قصاد ٢ · …", "filter M108 · filter KW · week 1 vs 2 · …"), "t-ink3", 11, bold)}</g>
      ${pill(240, 246, 340, 36, tr("الفلتر ده اتشال ولا لأ؟", "was that filter cleared or not?"), "f-rose-soft s-rose", "t-rose", 12, 1.1)}
      ${cap(tr("السؤال المكتوب… بيتقري ويتكرر", "a written question… is read and repeated"), 1.4, 292)}`;
    },
    sq_sql: () => {
      const W = [["SELECT", tr("هات", "bring")], ["CountryName, SUM(Qty)", tr("البلد ومجموع الكمية", "country, total qty")], ["FROM Production", tr("من جدول الإنتاج", "from production")], ["GROUP BY CountryName", tr("مجمّعة بالبلد", "grouped by country")]];
      return `<g ${an("fade", 0.05)}>${txt(240, 38, "Structured Query Language", "t-acc", 13, b8 + ltr)}</g>
      ${W.map(([s, m], i) => `<g ${an("rise", 0.2 + i * 0.2)}>${box(mx(150), 72 + i * 46, 220, 36, "f-ink2", 0)}${mono(mx(150) - 98, 77 + i * 46, s, "t-crt", 11)}${txt(mx(370), 77 + i * 46, m, "t-ink", 11.5, b8)}</g>${arrow(mx(150) + dirx() * 114, 72 + i * 46, mx(370) - dirx() * 72, 72 + i * 46, 0.3 + i * 0.2, "s-line2")}`).join("")}
      <g ${an("fade", 1.2)}>${txt(240, 268, tr("IBM · السبعينات · لسه في كل قاعدة بيانات", "IBM · the seventies · still in every database"), "t-ink3", 11, bold)}</g>
      ${cap(tr("جملة قريبة من الكلام… عاشت خمسين سنة", "a sentence close to speech… has lived fifty years"), 1.4, 298)}`;
    },
    sq_sqlite: () => {
      const a = mx(130), b = mx(356);
      const cyl = (x, y, cls) => `<ellipse cx="${x}" cy="${y - 34}" rx="44" ry="12" class="${cls}" stroke-width="2.5"/><path d="M${x - 44} ${y - 34} v62 a44 12 0 0 0 88 0 v-62" class="${cls}" stroke-width="2.5"/><path d="M${x - 44} ${y - 12} a44 12 0 0 0 88 0" class="${cls.replace(/f-\S+ ?/, "")}" fill="none" stroke-width="1.8"/>`;
      return `<g ${an("rise", 0.05)}><rect x="${a - 70}" y="56" width="140" height="110" rx="10" class="f-s2 s-line2" stroke-width="2"/>${cyl(a, 116, "f-s1 s-line2")}${txt(a, 190, tr("خادم · صلاحيات · IT", "a server · access · IT"), "t-ink3", 10.5, bold)}</g>
      <g ${an("rise", 0.5)}>${fileIcon(b, 110, "s-mint", 0.5)}${txt(b, 152, "Factory.db", "t-mint", 13, b8 + ltr)}${txt(b, 174, tr("ملف واحد · على جهازك", "one file · on your machine"), "t-ink2", 11, b8)}</g>
      ${flowRow([tr("كل موبايل", "every phone"), tr("كل متصفح", "every browser"), tr("أكتر قاعدة مستخدمة", "the most used")], 232, 130, 14, 0.9, "f-acc-soft s-acc", "t-acc", 10.5, 34)}
      ${cap(tr("قاعدة بيانات… بتتنسخ زي أي ملف", "a database… copied like any file"), 1.6, 288)}`;
    },
    sq_inside: () => {
      return `<g ${an("rise", 0.05)}>${box(240, 92, 400, 96, "f-acc-soft s-acc")}${txt(240, 64, tr("Python · المكتبة القياسية", "Python · the standard library"), "t-acc", 12, b8)}${["csv", "sqlite3", "zipfile", "re", "html"].map((m, i) => `${box(rowX(5, 70, 8)(i), 104, 70, 32, i === 1 ? "f-mint s-mint" : "f-s1 s-line2")}${txt(rowX(5, 70, 8)(i), 108, m, i === 1 ? "t-white" : "t-ink2", 11, b8 + ltr)}`).join("")}</g>
      ${term(240, 196, 420, 56, ["> python -c \"import sqlite3; print(sqlite3.sqlite_version)\"", "3.45.3"], 0.6, 10.5)}
      ${pill(240, 254, 300, 32, tr("مفيش تثبيت · مفيش موافقة جديدة", "no install · no new approval"), "f-mint-soft s-mint", "t-mint", 11.5, 1.3)}
      ${cap(tr("import sqlite3… وخلاص", "import sqlite3… that's it"), 1.5, 296)}`;
    },
    sq_create: () => {
      const C = [["Date", "TEXT"], ["LineCode", "TEXT"], ["ModelCode", "TEXT"], ["CountryCode", "TEXT"], ["Qty", "INTEGER"], ["SourceFile", "TEXT"], ["CountryName", "TEXT"]];
      return `<g ${an("fade", 0.05)}>${mono(mx(180) - 110, 42, "CREATE TABLE Production (", "t-acc", 12)}</g>
      ${C.map(([c, t], i) => `<g ${an("rise", 0.15 + i * 0.1)}>${box(mx(130), 66 + i * 30, 140, 26, "f-s1 s-line2")}${txt(mx(130), 70 + i * 30, c, "t-ink", 11, b8 + ltr)}${box(mx(250), 66 + i * 30, 90, 26, i === 4 ? "f-amber s-amber" : "f-s2 s-line2")}${txt(mx(250), 70 + i * 30, t, i === 4 ? "t-white" : "t-ink3", 10.5, b8 + ltr)}</g>`).join("")}
      <g ${an("rise", 1.0)}>${box(mx(394), 156, 140, 92, "f-amber-soft s-amber")}${txt(mx(394), 136, tr("رقم كنص؟", "a number as text?"), "t-amber", 11.5, b8)}${txt(mx(394), 160, tr("٩ قبل ١٠٠", "9 before 100"), "t-rose", 12, b8)}${txt(mx(394), 182, tr("ترتيب غلط", "wrong order"), "t-ink2", 10.5, bold)}</g>
      ${cap(tr("CREATE TABLE… دليل البيانات للقاعدة", "CREATE TABLE… the data dictionary for the database"), 1.3, 290)}`;
    },
    sq_insert: () => {
      const a = mx(130), b = mx(356);
      return `${term(240, 54, 440, 40, ["INSERT INTO Production VALUES (?, ?, ?, ?, ?, ?, ?)"], 0.05, 11)}
      <g ${an("rise", 0.6)}>${box(a, 150, 190, 104, "f-mint-soft s-mint")}${txt(a, 116, "?", "t-mint", 22, b8 + ltr)}${txt(a, 146, tr("القيمة تفضل قيمة", "a value stays a value"), "t-mint", 11.5, b8)}${txt(a, 168, "O'Brien  ✓", "t-ink2", 11, b8 + ltr)}</g>
      <g ${an("rise", 0.9)}>${box(b, 150, 190, 104, "f-rose-soft s-rose")}${txt(b, 116, tr("لزق القيم", "gluing values"), "t-rose", 12, b8)}${mono(b - 84, 148, "... VALUES ('O'Brien')", "t-rose", 10.5)}${txt(b, 172, tr("الجملة اتكسرت", "the sentence broke"), "t-ink2", 11, b8)}</g>
      ${cap(tr("القيمة تفضل قيمة… مش أمر", "a value stays a value… never a command"), 1.3, 268)}`;
    },
    sq_check: () => {
      const a = mx(130), b = mx(356);
      return `<g ${an("rise", 0.05)}>${fileIcon(a, 72, "s-amber", 0.05)}${txt(a, 110, "Two_Weeks.csv", "t-amber", 11, b8 + ltr)}${txt(a, 132, tr("٣٦ صف · ١٬٧٦٥", "36 rows · 1,765"), "t-ink", 12, b8)}</g>
      <g ${an("rise", 0.3)}>${fileIcon(b, 72, "s-mint", 0.3)}${txt(b, 110, "Factory.db", "t-mint", 11, b8 + ltr)}${txt(b, 132, tr("٣٦ صف · ١٬٧٦٥", "36 rows · 1,765"), "t-ink", 12, b8)}</g>
      <g ${an("pop", 0.7)}>${txt(240, 104, "=", "t-mint", 26, b8)}</g>
      ${term(240, 196, 420, 60, ["SELECT COUNT(*), SUM(Qty) FROM Production", "36 | 1765"], 0.9, 11)}
      ${cap(tr("اسأل القاعدة… مش الكود", "ask the database… not the code"), 1.5, 268)}`;
    },
    sq_select: () => {
      const R = [["Egypt", 880], ["Kuwait", 385], ["United Arab Emirates", 245], ["Jordan", 135], ["Saudi Arabia", 120]];
      return `${term(240, 52, 440, 40, ["SELECT CountryName, SUM(Qty) ... GROUP BY CountryName"], 0.05, 10.5)}
      ${R.map(([c, v], i) => `<g ${an("fade", 0.4 + i * 0.12)}>${txt(mx(118), 104 + i * 32, c, "t-ink", 11, b8 + ltr)}</g>${grow(196, 92 + i * 32, v * 0.24, 18, i ? "f-acc-soft" : "f-acc", 0.4 + i * 0.12)}<g ${an("fade", 0.6 + i * 0.12)}>${txt(mx(196 + v * 0.24 + 22), 106 + i * 32, digits(v), "t-ink2", 11, b8)}</g>`).join("")}
      ${cap(tr("GROUP BY… الجدول المحوري بالكلام", "GROUP BY… the pivot table in words"), 1.3, 280)}`;
    },
    sq_where: () => {
      const R = [["L03", 345], ["L01", 210], ["L02", 45]];
      return `${term(240, 62, 440, 56, ["SELECT LineCode, SUM(Qty) FROM Production", "WHERE ModelCode = 'M108' GROUP BY LineCode"], 0.05, 10.5, (i) => (i ? "t-white" : "t-crt"))}
      ${R.map(([c, v], i) => `<g ${an("fade", 0.6 + i * 0.15)}>${txt(mx(110), 140 + i * 40, c, "t-ink", 12, b8 + ltr)}</g>${grow(150, 126 + i * 40, v * 0.62, 22, i ? "f-mint-soft" : "f-mint", 0.6 + i * 0.15)}<g ${an("fade", 0.8 + i * 0.15)}>${txt(mx(150 + v * 0.62 + 22), 142 + i * 40, digits(v), "t-ink2", 11.5, b8)}</g>`).join("")}
      ${cap(tr("الفلتر جوّه السؤال… بيخلص بخلاصه", "a filter inside the question… ends with it"), 1.4, 280)}`;
    },
    sq_join: () => {
      const a = mx(120), b = mx(360), d = dirx();
      const tbl = (x, title, H, R, cls, d0) => `<g ${an("rise", d0)}>${box(x, 112, 170, 130, cls)}${txt(x, 62, title, "t-ink", 12, b8 + ltr)}${H.map((h, i) => txt(x - 40 + i * 80, 86, h, "t-acc", 10, b8 + ltr)).join("")}${R.map((r, k) => r.map((v, i) => txt(x - 40 + i * 80, 108 + k * 20, v, "t-ink2", 10.5, bold + ltr)).join("")).join("")}</g>`;
      return `${tbl(a, "Production", ["Country…", "Qty"], [["EG", "45"], ["KW", "40"], ["KW", "55"]], "f-s1 s-acc", 0.05)}
      ${tbl(b, "Countries", ["Code", "Name"], [["EG", "Egypt"], ["KW", "Kuwait"], ["AE", "UAE"]], "f-mint-soft s-mint", 0.3)}
      <path ${an("draw", 0.7, "s-amber")} pathLength="1" d="M${a} 180 C ${a} 214, ${b} 214, ${b} 182" stroke-width="2.5" fill="none" stroke-dasharray="1" marker-end="url(#aih-arrow)"/>
      ${pill(240, 238, 300, 34, tr("JOIN … ON CountryCode = Code", "JOIN … ON CountryCode = Code"), "f-amber-soft s-amber", "t-amber", 11, 1.0)}
      ${cap(tr("JOIN… هو VLOOKUP بالكلام", "JOIN… is VLOOKUP in words"), 1.3, 288)}`;
    },
    sq_limits: () => {
      const a = mx(130), b = mx(356);
      return `<g ${an("rise", 0.05)}>${box(a, 104, 190, 120, "f-mint-soft s-mint")}${txt(a, 62, tr("مناسبة لـ", "suits"), "t-mint", 12, b8)}${[tr("جهاز واحد", "one machine"), tr("جداول بتتسأل كتير", "much-asked tables"), tr("أسئلة بتتكرر", "repeating questions")].map((s, k) => `${check(a - 70, 92 + k * 26, 0.2 + k * 0.1)}${txt(a + 14, 97 + k * 26, s, "t-ink", 11, b8)}`).join("")}</g>
      <g ${an("rise", 0.5)}>${box(b, 104, 190, 120, "f-rose-soft s-rose")}${txt(b, 62, tr("مش مناسبة لـ", "doesn't suit"), "t-rose", 12, b8)}${[tr("٢٠ حد بيكتبوا معًا", "20 writers at once"), tr("فتح ‎.db في إكسل", "opening .db in Excel"), tr("جدول وسؤال واحد", "one table, one question")].map((s, k) => `${check(b - 70, 92 + k * 26, 0.6 + k * 0.1, false)}${txt(b + 14, 97 + k * 26, s, "t-ink", 11, b8)}`).join("")}</g>
      ${pill(240, 222, 340, 34, tr("قاعدة على خادم ← مع الـ IT", "a server database → with IT"), "f-s1 s-line2", "t-ink2", 11.5, 1.0)}
      ${cap(tr("لكل أداة… حجم بتلمع فيه", "every tool… has its size"), 1.3, 270)}`;
    },
    sq_cliff: () => {
      const a = mx(150), q = mx(398);
      return `<g ${an("rise", 0.05)}>${box(a, 124, 200, 190, "f-s1 s-line2")}<rect x="${a - 100}" y="29" width="200" height="22" rx="10" class="f-rose-soft"/>${txt(a, 45, "Export_Sales_2026-07.pdf", "t-rose", 10, b8 + ltr)}${[0, 1, 2, 3, 4, 5, 6].map((k) => `<rect x="${a - 80}" y="${64 + k * 18}" width="160" height="9" rx="4" class="f-s3"/>`).join("")}<rect x="${a - 80}" y="196" width="160" height="10" rx="4" class="f-ink3"/>${txt(a, 192, "Total", "t-ink", 10, b8 + ltr)}</g>
      <g ${an("rise", 0.6)}>${person(q, 76, 0.9, "f-ink2")}${txt(q, 102, tr("زميل بيكتب بإيده", "a colleague retyping"), "t-ink2", 10.5, b8)}${txt(q, 120, tr("غلطتين الشهر اللي فات", "2 errors last month"), "t-rose", 10.5, b8)}</g>
      <g ${an("pop", 1.1)}>${shield(q, 186, 1)}${txt(q, 196, ar() ? "؟" : "?", "t-acc", 20, b8)}</g>
      <g ${an("fade", 1.4)}>${txt(q, 246, tr("الدرس الجاي", "next lesson"), "t-acc", 12.5, b8)}</g>
      <g ${an("fade", 1.6)}>${txt(a, 244, tr("١٢ صف… محبوسين في ملف للقراية", "12 rows… locked in a file for reading"), "t-ink2", 11, b8)}</g>`;
    },
    /* ----- one PDF into a database (data/pdf-story.js) ----- */
    pd_retype: () => {
      const a = mx(126), b = mx(360), d = dirx();
      return `<g ${an("rise", 0.05)}>${page(a, 120, 170, 170, "PDF", [130, 110, 130, 100, 130, 120, 110], 0.05, "f-s1 s-rose")}</g>
      ${arrow(a + d * 90, 120, b - d * 90, 120, 0.4, "s-line2", "5 5")}<g ${an("fade", 0.5)}>${txt(240, 106, tr("بالإيد", "by hand"), "t-ink3", 11, b8)}</g>
      <g ${an("rise", 0.6)}>${sheet(b, 120, 160, 120, "f-s1 s-line2", "Excel", 0.6)}</g>
      <g ${an("rise", 1.0)}>${box(b, 222, 190, 46, "f-rose-soft s-rose")}${txt(b, 218, "1,136,000 → 1,163,000", "t-rose", 11, b8 + ltr)}${txt(b, 236, tr("وصف ناقص", "and a missing row"), "t-rose", 10.5, b8)}</g>
      ${cap(tr("الأرقام موجودة… النظام كتبها", "the figures are there… the system wrote them"), 1.3, 290)}`;
    },
    pd_extract: () => {
      const a = mx(110), m = 240, b = mx(370), d = dirx();
      return `<g ${an("rise", 0.05)}>${page(a, 108, 130, 140, "PDF", [90, 70, 90, 80, 90], 0.05, "f-s1 s-rose")}${txt(a, 196, tr("للقراية", "for reading"), "t-rose", 11.5, b8)}</g>
      ${arrow(a + d * 70, 108, m - d * 46, 108, 0.4)}
      <g ${an("pop", 0.6)}>${box(m, 108, 84, 40, "f-acc s-acc")}${txt(m, 113, "Python", "t-white", 12, b8 + ltr)}</g>
      ${arrow(m + d * 46, 108, b - d * 72, 108, 0.8)}
      <g ${an("rise", 0.9)}>${grid(b, 108, 4, 5, 32, 22, "f-s1", 3, 0.9)}${txt(b, 196, tr("للحساب", "for calculating"), "t-mint", 11.5, b8)}</g>
      ${pill(240, 244, 300, 34, "Exports.db: Exports + Countries", "f-mint-soft s-mint", "t-mint", 11.5, 1.2)}
      ${cap(tr("الـ PDF يتقري… الجدول يتحسب", "a PDF is read… a table is calculated"), 1.5, 292)}`;
    },
    pd_text: () => {
      const a = mx(130), b = mx(356);
      return `<g ${an("rise", 0.05)}>${box(a, 104, 190, 120, "f-mint-soft s-mint")}${txt(a, 62, tr("PDF مكتوب", "a text PDF"), "t-mint", 12, b8)}<rect x="${a - 40}" y="84" width="80" height="22" rx="3" class="f-acc-soft"/>${txt(a, 100, "Kuwait", "t-acc", 13, b8 + ltr)}${txt(a, 136, tr("ظلّل ← انسخ ← اتنسخت", "select → copy → copied"), "t-ink2", 10.5, b8)}</g>${check(a, 188, 0.5)}
      <g ${an("rise", 0.6)}>${box(b, 104, 190, 120, "f-s2 s-line2")}${txt(b, 62, tr("PDF ممسوح", "a scanned PDF"), "t-ink3", 12, b8)}<rect x="${b - 50}" y="78" width="100" height="56" rx="4" class="f-s3"/><path d="M${b - 46} 130 l26 -24 l18 14 l22 -22 l26 32z" class="f-s1"/></g>${check(b, 188, 0.9, false)}
      <g ${an("fade", 1.1)}>${txt(b, 222, tr("صورة: محتاج أداة تانية", "an image: another tool"), "t-rose", 10.5, b8)}${txt(a, 222, tr("الكود يقدر يقراه", "code can read it"), "t-mint", 10.5, b8)}</g>
      ${cap(tr("اتنسخت؟ يبقى نص", "it copied? then it's text"), 1.3, 280)}`;
    },
    pd_look: () => {
      const L = ["Export Sales - July 2026", "Period: 2026-07-01 to 2026-07-31", "CountryCode  ModelCode  Qty  NetSales", "SA  M103  20  110,000", "...", "Total  470  4,168,000", "Page 1 of 1"];
      return `${term(mx(200), 128, 340, 196, L, 0.05, 10.5, (i) => (i === 2 || i === 5 ? "t-white" : "t-crt"))}
      ${[[2, tr("العناوين", "headers")], [5, tr("الإجمالي", "the total")], [6, tr("مش بيانات", "not data")]].map(([i, s], k) => `<g ${an("fade", 1.4 + k * 0.2)}>${txt(mx(426), 30 + 24 + i * 19.5 + 4, s, k === 2 ? "t-ink3" : "t-amber", 11, b8)}</g>`).join("")}
      ${cap(tr("شوف الشكل… قبل ما تقرا", "see the shape… before you read"), 1.9, 256)}`;
    },
    pd_inside: () => {
      return `${term(240, 66, 440, 64, ["1 0 0 1 40 643 Tm (KW) Tj", "1 0 0 1 524.28 643 Tm (385,000) Tj"], 0.05, 11)}
      <g ${an("rise", 0.6)}><rect x="40" y="128" width="400" height="80" rx="6" class="f-s1 s-line2" stroke-width="2"/><line x1="40" y1="168" x2="440" y2="168" class="s-amber" stroke-width="1.5" stroke-dasharray="4 4"/>${txt(76, 172, "KW", "t-ink", 12, b8 + ltr)}${txt(184, 172, "M103", "t-ink", 12, b8 + ltr)}${txt(300, 172, "70", "t-ink", 12, b8 + ltr)}${txt(392, 172, "385,000", "t-ink", 12, b8 + ltr)}</g>
      <g ${an("fade", 1.0)}>${txt(240, 226, tr("نفس y = نفس الصف · رتّب بـ x من الشمال لليمين", "same y = same row · order by x, left to right"), "t-amber", 11, b8)}</g>
      ${pill(240, 258, 260, 30, "re + zlib", "f-mint-soft s-mint", "t-mint", 12, 1.3)}
      ${cap(tr("الصف… هو كل اللي على نفس السطر", "a row… is all that sits on one line"), 1.5, 298)}`;
    },
    pd_rows: () => {
      const R = [["Export Sales - July 2026", 0, 50, 34], ["CountryCode ModelCode Qty NetSales", 1, 92, 34], ["SA · AE · KW · JO  ×  M103 · M105 · M108", 2, 154, 76], ["Total  470  4,168,000", 1, 216, 34], ["Page 1 of 1", 0, 258, 34]];
      return `${R.map(([s, k, y, h], i) => `<g ${an("rise", 0.05 + i * 0.18)}>${box(mx(200), y, 340, h, k === 2 ? "f-mint-soft s-mint" : k === 1 ? "f-amber-soft s-amber" : "f-s2 s-line2")}${txt(mx(200), k === 2 ? y - 6 : y + 4, s, k === 2 ? "t-mint" : k === 1 ? "t-amber" : "t-ink3", 10.5, b8 + ltr)}</g>`).join("")}
      <g ${an("fade", 1.1)}>${txt(mx(200), 172, tr("١٢ صف = ٤ بلاد × ٣ موديلات", "12 rows = 4 countries × 3 models"), "t-mint", 11, b8)}</g>
      <g ${an("fade", 1.3)}>${txt(mx(420), 96, tr("بداية", "start"), "t-amber", 11, b8)}${txt(mx(420), 220, tr("نهاية", "end"), "t-amber", 11, b8)}</g>
      ${cap(tr("العلامات بتفضل… العدد بيتغيّر", "the signs stay… the count changes"), 1.5, 302)}`;
    },
    pd_numbers: () => {
      const a = mx(130), b = mx(356);
      return `<g ${an("rise", 0.05)}>${box(a, 90, 180, 70, "f-amber-soft s-amber")}${txt(a, 86, "\"1,183,000\"", "t-amber", 15, b8 + ltr)}${txt(a, 108, tr("نص للعين", "text for the eye"), "t-ink2", 10.5, bold)}</g>
      ${arrow(a + dirx() * 94, 90, b - dirx() * 94, 90, 0.5)}<g ${an("fade", 0.6)}>${txt(240, 140, "replace(',', '')", "t-ink3", 10, bold + ltr)}</g>
      <g ${an("rise", 0.7)}>${box(b, 90, 180, 70, "f-mint-soft s-mint")}${txt(b, 86, "1183000", "t-mint", 15, b8 + ltr)}${txt(b, 108, tr("رقم للحساب", "a number for maths"), "t-ink2", 10.5, bold)}</g>
      <g ${an("rise", 1.0)}>${box(240, 196, 360, 56, "f-rose-soft s-rose")}${txt(240, 190, tr("من غير تحويل: يقرا 1 بس ويكمّل", "unconverted: reads just 1 and carries on"), "t-rose", 11, b8)}${txt(240, 210, tr("والجمع يطلع غلط من غير رسالة", "and the sum is wrong with no message"), "t-rose", 11, b8)}</g>
      ${cap(tr("الفاصلة للعين… مش للحساب", "the comma is for the eye… not for maths"), 1.3, 268)}`;
    },
    pd_total: () => {
      const a = mx(140), b = mx(356);
      return `<g ${an("rise", 0.05)}>${box(a, 100, 200, 120, "f-s1 s-acc")}${txt(a, 60, tr("مجموع الـ ١٢ صف", "the 12 rows' sum"), "t-acc", 11.5, b8)}${txt(a, 98, "470", "t-ink", 16, b8 + ltr)}${txt(a, 126, "4,168,000", "t-ink", 16, b8 + ltr)}</g>
      <g ${an("pop", 0.6)}>${txt(240 + dirx() * 8, 112, "=", "t-mint", 26, b8)}</g>
      <g ${an("rise", 0.4)}>${box(b, 100, 170, 120, "f-amber-soft s-amber")}${txt(b, 60, tr("سطر Total في الـ PDF", "the PDF's Total line"), "t-amber", 11, b8)}${txt(b, 98, "470", "t-ink", 16, b8 + ltr)}${txt(b, 126, "4,168,000", "t-ink", 16, b8 + ltr)}</g>
      ${check(240 + dirx() * 8, 150, 0.9)}
      ${term(240, 214, 420, 40, ["12 rows, 470 sets, 4,168,000 EGP: the same as the Total line"], 1.1, 10)}
      ${cap(tr("الإجمالي المطبوع… مراجعة جاهزة", "a printed total… a ready check"), 1.4, 266)}`;
    },
    pd_db: () => {
      const R = [["Kuwait", 1183], ["Saudi Arabia", 1136], ["Jordan", 1091], ["UAE", 758]];
      return `<g ${an("rise", 0.05)}>${box(mx(120), 72, 160, 54, "f-s1 s-acc")}${txt(mx(120), 68, "Exports", "t-acc", 12, b8 + ltr)}${txt(mx(120), 86, "12 · 2026-07 · SourceFile", "t-ink3", 9.5, bold + ltr)}${box(mx(360), 72, 160, 54, "f-mint-soft s-mint")}${txt(mx(360), 68, "Countries", "t-mint", 12, b8 + ltr)}${txt(mx(360), 86, tr("٥ بلاد", "5 countries"), "t-ink3", 10, bold)}</g>
      <g ${an("pop", 0.5)}>${pill(240, 72, 56, 28, "JOIN", "f-amber s-amber", "t-white", 11, 0.5)}</g>
      ${R.map(([c, v], i) => `<g ${an("fade", 0.7 + i * 0.12)}>${txt(mx(110), 146 + i * 30, c, "t-ink", 11, b8 + ltr)}</g>${grow(180, 134 + i * 30, v * 0.17, 18, i ? "f-acc-soft" : "f-acc", 0.7 + i * 0.12)}<g ${an("fade", 0.9 + i * 0.12)}>${txt(mx(180 + v * 0.17 + 36), 148 + i * 30, digits((v * 1000).toLocaleString("en-US")), "t-ink2", 10.5, b8)}</g>`).join("")}
      ${cap(tr("كل صف… عارف جه منين", "every row… knows where it came from"), 1.4, 280)}`;
    },
    pd_stop: () => {
      const a = mx(124), b = mx(356);
      return `<g ${an("rise", 0.05)}>${box(a, 96, 170, 120, "f-s1 s-line2")}${txt(a, 52, "Countries.csv (copy)", "t-ink2", 10.5, b8 + ltr)}${["EG Egypt", "SA Saudi Arabia", "KW Kuwait", "AE UAE", "JO Jordan"].map((s, i) => txt(a, 76 + i * 18, s, i === 2 ? "t-rose" : "t-ink", 10.5, b8 + ltr)).join("")}</g>
      <path ${an("draw", 0.5, "s-rose")} pathLength="1" d="M${a - 66} 108 L${a + 66} 108" stroke-width="3" fill="none"/>
      ${term(b, 96, 220, 92, ["read PDF: 12 rows", "Total line: OK", "STOPPED: codes missing", "from Countries.csv: KW"], 0.7, 10.5, (i) => (i >= 2 ? "t-white" : "t-crt"))}
      <g ${an("fade", 1.4)}>${txt(b, 162, tr("ولا صف اتكتب في القاعدة", "not one row written"), "t-mint", 11, b8)}</g>
      ${pill(240, 222, 360, 34, tr("الـ JOIN بيسكت… الأداة لازم تتكلم", "a JOIN stays silent… the tool must speak"), "f-amber-soft s-amber", "t-amber", 11.5, 1.6)}
      ${cap(tr("كود ناقص من الماستر؟ وقفة قبل الكتابة", "a code missing from the master? stop before writing"), 1.8, 272)}`;
    },
    pd_better: () => {
      const X = rowX(3, 136, 14), S = [[tr("ملف / API", "file / API"), "CSV · Excel", "f-mint s-mint", "t-white"], [tr("وورد بـ COM", "Word via COM"), tr("من غير Python", "no Python"), "f-acc-soft s-acc", "t-acc"], [tr("قراية PDF", "reading PDF"), "re + zlib", "f-amber-soft s-amber", "t-amber"]];
      return `<g ${an("fade", 0.05)}>${txt(240, 44, tr("ترتيب الكتاب: الأثبت الأول", "the book's order: most stable first"), "t-ink2", 12, b8)}</g>
      ${S.map(([h, s, cls, tc], i) => `<g ${an("rise", 0.2 + i * 0.25)}>${box(X(i), 118 + i * 14, 136, 80, cls)}${txt(X(i), 112 + i * 14, h, tc, 12, b8)}${txt(X(i), 134 + i * 14, s, tc === "t-white" ? "t-white" : "t-ink2", 10.5, b8)}${txt(X(i), 68 + i * 14, digits(i + 1), "t-ink3", 14, b8)}</g>`).join("")}
      ${pill(240, 236, 340, 34, tr("اسأل الأول: النظام يطلّع CSV؟", "ask first: can the system export CSV?"), "f-s1 s-line2", "t-ink", 11.5, 1.1)}
      ${cap(tr("الـ PDF آخر حل… مش أول حل", "the PDF is the last resort… not the first"), 1.4, 286)}`;
    },
    pd_cliff: () => {
      const a = mx(140), q = mx(396);
      return `<g ${an("rise", 0.05)}>${fileIcon(a - dirx() * 50, 90, "s-mint", 0.05)}${txt(a - dirx() * 50, 128, "Exports.db", "t-mint", 11, b8 + ltr)}</g>
      <g ${an("rise", 0.3)}><rect x="${a + dirx() * 40 - 24}" y="56" width="48" height="84" rx="8" class="f-s1 s-ink2" stroke-width="2.5"/><rect x="${a + dirx() * 40 - 18}" y="66" width="36" height="58" rx="2" class="f-s2"/>${txt(a + dirx() * 40, 100, "?", "t-rose", 18, b8)}</g>
      <g ${an("fade", 0.6)}>${txt(a, 168, tr("‎.db ما بيتفتحش على موبايل", ".db won't open on a phone"), "t-rose", 11, b8)}</g>
      <g ${an("rise", 0.8)}>${box(a, 220, 220, 44, "f-amber-soft s-amber")}${txt(a, 216, tr("اجتماع بكرة · نت ضعيف", "meeting tomorrow · weak internet"), "t-amber", 11, b8)}${txt(a, 232, tr("ومن غير تثبيت", "and no installs"), "t-amber", 10.5, b8)}</g>
      <g ${an("pop", 1.2)}>${shield(q, 104, 1.1)}${txt(q, 120, ar() ? "؟" : "?", "t-acc", 22, b8)}</g>
      <g ${an("fade", 1.5)}>${txt(q, 172, tr("الدرس الجاي", "next lesson"), "t-acc", 12.5, b8)}</g>`;
    },
    /* ----- an HTML page for management (data/page-story.js) ----- */
    pg_meeting: () => {
      const X = rowX(3, 130, 16), S = [["PowerPoint", tr("محتاج برنامج", "needs a program")], ["Excel", tr("صعب على موبايل", "hard on a phone")], [tr("لوحة على النت", "online dashboard"), tr("نت وصلاحيات", "internet, access")]];
      return `${S.map(([h, s], i) => `<g ${an("rise", 0.05 + i * 0.2)}>${box(X(i), 80, 130, 70, "f-s1 s-rose")}${txt(X(i), 76, h, "t-ink", 12, b8)}${txt(X(i), 96, s, "t-rose", 10.5, b8)}</g>`).join("")}
      <g ${an("rise", 0.8)}><rect x="${240 - 26}" y="140" width="52" height="92" rx="9" class="f-s1 s-ink2" stroke-width="2.5"/><rect x="${240 - 20}" y="150" width="40" height="66" rx="2" class="f-acc-soft"/>${txt(240, 188, "HTML", "t-acc", 10, b8 + ltr)}</g>
      <g ${an("fade", 1.1)}>${txt(mx(110), 190, tr("من غير نت", "offline"), "t-mint", 11.5, b8)}${txt(mx(370), 190, tr("أي جهاز", "any device"), "t-mint", 11.5, b8)}</g>
      ${pill(240, 262, 340, 34, tr("الكورس ده نفسه ملف HTML واحد", "this course is itself one HTML file"), "f-mint-soft s-mint", "t-mint", 11.5, 1.3)}
      ${cap(tr("التقرير اللي ما بيتفتحش… مش موجود", "a report that won't open… doesn't exist"), 1.6, 304)}`;
    },
    pg_html: () => {
      const X = rowX(3, 132, 14), S = [["HTML", tr("الهيكل", "structure"), tr("الخرسانة", "concrete")], ["CSS", tr("الشكل", "look"), tr("التشطيب", "finishing")], ["JavaScript", tr("الحركة", "movement"), tr("الكهربا", "wiring")]];
      return `<g ${an("rise", 0.05)}>${box(240, 110, 440, 140, "f-acc-soft s-acc")}${txt(240, 58, "Export_Report.html", "t-acc", 12.5, b8 + ltr)}</g>
      ${S.map(([h, s, m], i) => `<g ${an("pop", 0.3 + i * 0.2)}>${box(X(i), 120, 132, 84, "f-s1 s-line2")}${txt(X(i), 108, h, "t-ink", 12.5, b8 + ltr)}${txt(X(i), 128, s, "t-acc", 11, b8)}${txt(X(i), 146, m, "t-ink3", 10, bold)}</g>`).join("")}
      ${flowRow(["Python", "HTML", tr("إيميل", "e-mail"), tr("أي متصفح", "any browser")], 228, 96, 18, 1.0, "f-mint-soft s-mint", "t-mint", 11, 34)}
      ${cap(tr("ملف واحد… صفحة وعرض", "one file… a page and a presentation"), 2.0, 290)}`;
    },
    pg_data: () => {
      const a = mx(90), b = mx(392), d = dirx();
      return `<g ${an("rise", 0.05)}>${fileIcon(a, 70, "s-mint", 0.05)}${txt(a, 108, "Exports.db", "t-mint", 11.5, b8 + ltr)}</g>
      ${term(240, 70, 150, 64, ["SELECT ...", "JOIN Countries"], 0.3, 10.5)}
      ${arrow(a + d * 22, 70, 240 - d * 79, 70, 0.4)}${arrow(240 + d * 79, 70, b - d * 64, 70, 0.6)}
      <g ${an("rise", 0.7)}>${box(b, 70, 120, 64, "f-s1 s-acc")}${txt(b, 66, "4,168,000", "t-acc", 13, b8 + ltr)}${txt(b, 86, tr("من القاعدة", "from the database"), "t-ink3", 10, bold)}</g>
      <g ${an("rise", 1.0)}>${box(240, 176, 380, 70, "f-rose-soft s-rose")}${txt(240, 166, tr("رقم مكتوب بإيد في الصفحة؟", "a figure typed into the page?"), "t-rose", 11.5, b8)}${txt(240, 188, tr("الشهر الجاي يفضل رقم يوليو", "next month it stays July's"), "t-ink2", 11, b8)}</g>
      ${cap(tr("الصفحة بتقرا… مش بتحفظ", "the page reads… it doesn't remember"), 1.3, 254)}`;
    },
    pg_check: () => {
      const R = [[tr("مجموع البلاد", "the countries' sum"), "4,168,000"], [tr("مجموع الموديلات", "the models' sum"), "4,168,000"], [tr("الإجمالي", "the total"), "4,168,000"]];
      return `${R.map(([s, v], i) => `<g ${an("rise", 0.05 + i * 0.25)}>${box(mx(170), 62 + i * 52, 280, 40, i === 2 ? "f-acc-soft s-acc" : "f-s1 s-line2")}${txt(mx(110), 67 + i * 52, s, "t-ink2", 11, b8)}${txt(mx(240), 67 + i * 52, v, "t-ink", 12.5, b8 + ltr)}</g>`).join("")}
      ${check(mx(340), 114, 0.9)}
      ${flowRow([tr("البيانات", "data"), tr("صحة الأرقام", "accuracy"), tr("العرض", "presentation"), tr("التجميل", "polish")], 236, 100, 14, 1.1, ["f-acc s-acc", "f-acc s-acc", "f-s1 s-acc", "f-s2 s-line2"], ["t-white", "t-white", "t-acc", "t-ink3"], 11, 34)}
      ${cap(tr("الشكل الحلو… بيقنع حتى لو غلط", "a beautiful look… convinces even when wrong"), 2.1, 290)}`;
    },
    pg_kpis: () => {
      const X = rowX(3, 140, 12), K = [["4,168,000", tr("جنيه صافي مبيعات", "EGP net sales")], ["470", tr("جهاز اتصدّر", "sets exported")], ["Kuwait", tr("أعلى بلد: ٢٨٪", "top country: 28%")]];
      return `<g ${an("fade", 0.05)}>${box(240, 104, 460, 124, "f-s1 s-line2")}${txt(240, 62, "The month in three figures", "t-ink", 12, b8 + ltr)}</g>
      ${K.map(([v, s], i) => `<g ${an("pop", 0.3 + i * 0.25)}>${box(X(i), 112, 140, 70, "f-s2", 0)}${txt(X(i), 110, v, "t-acc", 17, b8 + ltr)}${txt(X(i), 132, s, "t-ink3", 10, bold)}</g>`).join("")}
      <g ${an("fade", 1.2)}>${txt(240, 206, tr("التفاصيل تحت… للي عايز يتعمق", "details below… for whoever wants depth"), "t-ink2", 11, b8)}</g>
      ${pill(240, 242, 260, 32, tr("٣ أرقام… في ٣ ثواني", "3 figures… in 3 seconds"), "f-acc-soft s-acc", "t-acc", 12, 1.4)}
      ${cap(tr("الرسالة الأساسية في أول ٣٠ ثانية", "the main message in the first 30 seconds"), 1.6, 290)}`;
    },
    pg_svg: () => {
      const R = [["Kuwait", 1183], ["Saudi Arabia", 1136], ["Jordan", 1091], ["UAE", 758]];
      return `${R.map(([c, v], i) => `<g ${an("fade", 0.1 + i * 0.12)}>${txt(mx(70), 58 + i * 36, c, "t-ink", 11, b8 + ltr)}</g>${grow(130, 44 + i * 36, v * 0.2, 22, "f-acc", 0.1 + i * 0.12)}<g ${an("fade", 0.3 + i * 0.12)}>${txt(mx(130 + v * 0.2 + 36), 60 + i * 36, digits((v * 1000).toLocaleString("en-US")), "t-ink2", 10.5, b8)}</g>`).join("")}
      ${term(240, 236, 440, 52, ["<rect x=\"190\" y=\"10\" width=\"560\" height=\"30\" class=\"bar\"/>", "# one line per country · about 15 lines of Python"], 0.9, 10, (i) => (i ? "t-white" : "t-crt"))}
      ${cap(tr("رسم الأعمدة… مستطيلات بأطوال", "a bar chart… is rectangles of lengths"), 1.4, 290)}`;
    },
    pg_offline: () => {
      const a = mx(130), b = mx(356);
      return `<g ${an("rise", 0.05)}>${box(a, 104, 200, 130, "f-rose-soft s-rose")}${txt(a, 56, tr("مكتبة من النت", "a library from the net"), "t-rose", 11.5, b8)}${mono(a - 90, 80, "<script src=\"https://cdn…", "t-rose", 9.5)}${txt(a, 116, "4,168,000", "t-ink", 12, b8 + ltr)}<rect x="${a - 70}" y="128" width="140" height="30" rx="4" class="f-s1 s-line2" stroke-dasharray="4 4"/>${txt(a, 148, tr("الرسم اختفى", "the chart vanished"), "t-rose", 10.5, b8)}</g>
      <g ${an("rise", 0.5)}>${box(b, 104, 200, 130, "f-mint-soft s-mint")}${txt(b, 56, tr("كل حاجة جوّه الصفحة", "everything inside"), "t-mint", 11.5, b8)}${txt(b, 116, "4,168,000", "t-ink", 12, b8 + ltr)}${grow(312, 130, 70, 14, "f-acc", 0.8)}${grow(312, 148, 50, 10, "f-acc-soft", 0.9)}</g>
      <g ${an("pop", 1.1)}><path d="M${240 - 28} 210 q28 -24 56 0 M${240 - 18} 222 q18 -14 36 0" class="s-ink3" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="240" cy="232" r="4" class="f-ink3"/><path d="M${240 - 32} 238 L${240 + 32} 200" class="s-rose" stroke-width="3.5" stroke-linecap="round"/></g>
      ${cap(tr("افصل النت… وافتح", "disconnect… and open"), 1.4, 280)}`;
    },
    pg_escape: () => {
      const a = mx(130), b = mx(356);
      return `${term(240, 52, 300, 40, ["html.escape(name)"], 0.05, 12)}
      <g ${an("rise", 0.4)}>${box(a, 140, 190, 100, "f-amber-soft s-amber")}${txt(a, 112, tr("قيمة فيها علامات", "a value with marks"), "t-amber", 11, b8)}${txt(a, 144, "A&B <Ltd>", "t-ink", 14, b8 + ltr)}</g>
      ${arrow(a + dirx() * 100, 140, b - dirx() * 100, 140, 0.7)}
      <g ${an("rise", 0.9)}>${box(b, 140, 190, 100, "f-mint-soft s-mint")}${txt(b, 112, tr("بتتعرض كلام بس", "shown as text only"), "t-mint", 11, b8)}${txt(b, 144, "A&amp;B &lt;Ltd&gt;", "t-ink2", 11.5, b8 + ltr)}</g>
      ${pill(240, 230, 360, 34, tr("زي علامات ? في SQL: القيمة تفضل قيمة", "like SQL's ? marks: a value stays a value"), "f-acc-soft s-acc", "t-acc", 11, 1.2)}
      ${cap(tr("القيمة تفضل قيمة… في الصفحة كمان", "a value stays a value… in the page too"), 1.5, 280)}`;
    },
    pg_present: () => {
      const X = rowX(4, 96, 14), S = [tr("٣ أرقام", "3 figures"), tr("البلاد", "countries"), tr("الموديلات", "models"), tr("الجدول", "the table")];
      return `<g ${an("rise", 0.05)}>${box(240, 76, 300, 60, "f-s1 s-line2")}<rect x="${240 + 150 - 74}" y="54" width="62" height="24" rx="6" class="f-acc"/>${txt(240 + 150 - 43, 70, "Present", "t-white", 10.5, b8 + ltr)}${txt(240 - 30, 88, "Export_Report.html", "t-ink3", 10.5, bold + ltr)}</g>
      ${S.map((s, i) => `<g ${an("pop", 0.5 + i * 0.2)}>${box(X(i), 170, 96, 64, i === 1 ? "f-acc s-acc" : "f-s2 s-line2")}${txt(X(i), 175, s, i === 1 ? "t-white" : "t-ink2", 11, b8)}</g>`).join("")}
      <g ${an("fade", 1.4)}>${txt(240, 228, tr("← → بين الأقسام · Page يرجّع الصفحة", "← → between sections · Page returns to the page"), "t-ink2", 11, b8)}</g>
      ${cap(tr("نفس الملف… للقراية وللعرض", "the same file… for reading and presenting"), 1.6, 274)}`;
    },
    pg_source: () => {
      return `<g ${an("rise", 0.05)}>${box(240, 92, 420, 100, "f-s1 s-line2")}${[0, 1, 2].map((k) => `<rect x="60" y="${54 + k * 18}" width="360" height="10" rx="4" class="f-s3"/>`).join("")}<rect x="60" y="112" width="360" height="12" rx="4" class="f-ink3"/></g>
      <g ${an("rise", 0.5)}>${box(240, 168, 440, 44, "f-amber-soft s-amber")}${txt(240, 164, "Source: Export_Sales_2026-07.pdf, 12 rows,", "t-amber", 10.5, b8 + ltr)}${txt(240, 180, "checked against the report's Total line. Built 2026-08-02.", "t-amber", 10.5, b8 + ltr)}</g>
      <g ${an("rise", 0.9)}>${bubble(mx(150), 236, 220, 40, "f-s1 s-line2", !ar())}${txt(mx(150), 241, tr("«الرقم ده مراجَع؟»", "“is this figure checked?”"), "t-ink", 11.5, b8)}</g>
      <g ${an("pop", 1.2)}>${check(mx(300), 236, 1.2)}${txt(mx(390), 241, tr("الإجابة مكتوبة", "the answer is written"), "t-mint", 11.5, b8)}</g>
      ${cap(tr("الرقم اللي معاه مصدره… بيتصدّق", "a figure carrying its source… is believed"), 1.5, 292)}`;
    },
    pg_app: () => {
      const X = rowX(3, 136, 14), S = [[tr("صفحة", "a page"), tr("أرقام ورسوم", "figures, charts"), "f-mint-soft s-mint", "t-mint"], [tr("صفحة بفلاتر", "a page with filters"), tr("لسه ملف واحد", "still one file"), "f-acc-soft s-acc", "t-acc"], [tr("تطبيق على خادم", "a server app"), tr("مع الـ IT", "with IT"), "f-amber-soft s-amber", "t-amber"]];
      return `${S.map(([h, s, cls, tc], i) => `<g ${an("rise", 0.1 + i * 0.25)}>${box(X(i), 150 - i * 30, 136, 70 + i * 30, cls)}${txt(X(i), 140 - i * 30, h, tc, 12, b8)}${txt(X(i), 160 - i * 30, s, "t-ink2", 10.5, bold)}</g>`).join("")}
      <g ${an("fade", 1.0)}>${txt(240, 230, tr("كل خطوة لفوق = صيانة وصلاحيات أكتر", "each step up = more upkeep and access"), "t-ink2", 11, b8)}</g>
      ${cap(tr("ابدأ بملف… وكبّر لما تحتاج", "start with a file… grow when needed"), 1.3, 270)}`;
    },
    pg_cliff: () => {
      const q = mx(398), R = ar() ? ["PowerShell الأول", "Python النقي", "خطوة خطوة", "البوابات", "المراجعة السبعة", "ملف التشغيل"] : ["PowerShell first", "pure Python", "step by step", "the gates", "the 7-point review", "the launcher"];
      return `${R.map((s, i) => `<g ${an("rise", 0.05 + i * 0.12)}>${box(mx(80 + (i % 2) * 150), 64 + Math.floor(i / 2) * 50, 140, 36, "f-s1 s-line2", 2, 'stroke-dasharray="5 4"')}${txt(mx(80 + (i % 2) * 150), 69 + Math.floor(i / 2) * 50, s, "t-ink2", 11, b8)}</g>`).join("")}
      <g ${an("fade", 0.9)}>${txt(mx(155), 222, tr("متفرقة في ١٢ Prompt… وفي دماغها", "scattered over 12 Prompts… and her head"), "t-rose", 11, b8)}</g>
      <g ${an("pop", 1.2)}>${shield(q, 100, 1.1)}${txt(q, 116, ar() ? "؟" : "?", "t-acc", 22, b8)}</g>
      <g ${an("fade", 1.5)}>${txt(q, 168, tr("الدرس الجاي", "next lesson"), "t-acc", 12.5, b8)}</g>
      <g ${an("rise", 1.7)}>${person(q, 252, 0.8, "f-ink2")}${txt(q, 278, tr("مهندس مصنع تالت", "a third plant's engineer"), "t-ink2", 10.5, b8)}</g>`;
    },
    /* ----- skills and the rules files (data/rules-story.js) ----- */
    ru_scattered: () => {
      return `${[0, 1, 2, 3, 4, 5].map((k) => `<g ${an("rise", 0.05 + k * 0.1)}>${box(mx(70 + (k % 3) * 82), 70 + Math.floor(k / 3) * 70, 70, 54, "f-s1 s-line2")}${txt(mx(70 + (k % 3) * 82), 66 + Math.floor(k / 3) * 70, "Prompt", "t-ink3", 10, b8 + ltr)}${txt(mx(70 + (k % 3) * 82), 84 + Math.floor(k / 3) * 70, digits(k + 1), "t-ink2", 12, b8)}</g>`).join("")}
      <g ${an("fade", 0.8)}>${txt(mx(152), 196, tr("… لحد ١٢", "… up to 12"), "t-ink3", 11, b8)}</g>
      <g ${an("rise", 1.0)}>${box(mx(378), 82, 170, 52, "f-rose-soft s-rose")}${txt(mx(378), 78, tr("نسي «المكتبة القياسية»", "forgot “standard library”"), "t-rose", 10.5, b8)}${txt(mx(378), 96, tr("← رجع pandas", "→ pandas came back"), "t-ink2", 10.5, bold)}</g>
      <g ${an("rise", 1.3)}>${box(mx(378), 152, 170, 52, "f-rose-soft s-rose")}${txt(mx(378), 148, tr("نسي «الخطة الأول»", "forgot “plan first”"), "t-rose", 10.5, b8)}${txt(mx(378), 166, tr("← ٢٠٠ سطر مرة واحدة", "→ 200 lines at once"), "t-ink2", 10.5, bold)}</g>
      ${cap(tr("القاعدة جوّه Prompt… بتتنسي", "a rule inside a Prompt… gets forgotten"), 1.6, 270)}`;
    },
    ru_list: () => {
      const C = [[tr("إيه اللي يشتغل", "what may run"), "1–4", "f-acc-soft s-acc", "t-acc"], [tr("إزاي نبني", "how to build"), "5–10", "f-mint-soft s-mint", "t-mint"], [tr("قبل «خلصت»", "before “done”"), "11–13", "f-amber-soft s-amber", "t-amber"]], X = rowX(3, 140, 14);
      const S = [[tr("PowerShell الأول", "PowerShell first"), tr("Python النقي", "pure Python"), tr("مفيش نت", "no internet")], [tr("خطوة واحدة", "one step"), tr("Data للقراءة", "Data read-only"), tr("سجل · وقفة", "log · stop")], [tr("المراجعات", "the checks"), tr("شرح في سطرين", "2-line explanation"), tr("رقم بإيدك", "a figure by hand")]];
      return `${C.map(([h, n, cls, tc], i) => `<g ${an("rise", 0.1 + i * 0.25)}>${box(X(i), 130, 140, 170, cls)}${txt(X(i), 66, h, tc, 12, b8)}${txt(X(i), 88, n, "t-ink3", 11, b8 + ltr)}${S[i].map((s, k) => txt(X(i), 124 + k * 30, s, "t-ink", 10.5, b8)).join("")}</g>`).join("")}
      ${cap(tr("١٣ قاعدة… كل واحدة وراها حكاية", "13 rules… each with a story behind it"), 1.1, 250)}`;
    },
    ru_files: () => {
      const a = mx(128), b = mx(352);
      return `<g ${an("rise", 0.05)}>${box(a, 112, 180, 150, "f-acc-soft s-acc")}${txt(a, 56, "CLAUDE.md", "t-acc", 13, b8 + ltr)}<rect x="${a - 76}" y="68" width="152" height="16" rx="4" class="f-acc"/>${txt(a, 80, "Claude Code", "t-white", 9.5, b8 + ltr)}${[0, 1, 2, 3, 4].map((k) => `<rect x="${a - 70}" y="${96 + k * 16}" width="140" height="8" rx="4" class="f-s1"/>`).join("")}</g>
      <g ${an("rise", 0.3)}>${box(b, 112, 180, 150, "f-mint-soft s-mint")}${txt(b, 56, "AGENTS.md", "t-mint", 13, b8 + ltr)}<rect x="${b - 76}" y="68" width="152" height="16" rx="4" class="f-mint"/>${txt(b, 80, "Codex", "t-white", 9.5, b8 + ltr)}${[0, 1, 2, 3, 4].map((k) => `<rect x="${b - 70}" y="${96 + k * 16}" width="140" height="8" rx="4" class="f-s1"/>`).join("")}</g>
      <g ${an("pop", 0.7)}>${txt(240, 140, "=", "t-ink2", 24, b8)}</g>
      <g ${an("fade", 0.9)}>${txt(240, 210, tr("أول سطر بس مختلف · الـ ١٣ قاعدة هي هي", "only the first line differs · the same 13 rules"), "t-ink2", 11, b8)}</g>
      ${cap(tr("أداتين… وقواعد واحدة", "two tools… one set of rules"), 1.2, 262)}`;
    },
    ru_skill: () => {
      const f = mx(110);
      return `<g ${an("rise", 0.05)}>${folder(f, 120, 170, 140)}${txt(f, 76, "trusted-tool", "t-amber", 12, b8 + ltr)}${["SKILL.md", "reference/"].map((s, i) => txt(f, 116 + i * 24, s, "t-ink2", 11, b8 + ltr)).join("")}</g>
      ${[tr("اقرا README وData", "read README and Data"), tr("قسّم خطوات واستنى", "split into steps, wait"), tr("ابني خطوة وشغّلها", "build a step, run it"), tr("راجعها بالقايمة", "review it with the list"), tr("وبعدين اللي بعدها", "then the next")].map((s, i) => `<g ${an("rise", 0.3 + i * 0.15)}>${box(mx(330), 52 + i * 40, 230, 32, i === 3 ? "f-mint-soft s-mint" : "f-s1 s-acc")}${txt(mx(330), 56 + i * 40, digits(i + 1) + ". " + s, i === 3 ? "t-mint" : "t-ink", 11, b8)}</g>`).join("")}
      ${cap(tr("القاعدة دايمًا… والطريقة وقت المهمة", "rules always… the method when the task comes"), 1.3, 262)}`;
    },
    ru_desc: () => {
      return `<g ${an("rise", 0.05)}>${box(240, 60, 380, 40, "f-rose-soft s-rose")}${mono(80, 65, "description: an automation skill", "t-rose", 11.5)}</g>${check(mx(452), 60, 0.4, false)}
      <g ${an("rise", 0.7)}>${box(240, 160, 430, 120, "f-mint-soft s-mint")}${["description: Builds a small automation tool that", "the security team accepts - PowerShell for Office,", "pure Python for data, PDF, SQLite and HTML -", "step by step. Use when asked to automate a report,", "combine Excel files, read a PDF into a table..."].map((s, i) => mono(36, 120 + i * 18, s, "t-mint", 10.5)).join("")}</g>${check(mx(462), 110, 1.3)}
      ${cap(tr("الوصف العام… مهارة ما بتتلاقيش", "a vague description… a skill never found"), 1.5, 260)}`;
    },
    ru_refs: () => {
      const s = mx(90), X = mx(346), R = ["powershell-com.md", "pure-python.md", "review-checklist.md"], W = [tr("شكل أي سكريبت أوفيس", "any Office script's shape"), tr("خريطة البدائل", "the replacements map"), tr("المراجعة التسعة", "the nine checks")];
      return `<g ${an("rise", 0.05)}>${box(s, 120, 150, 90, "f-acc-soft s-acc")}${txt(s, 112, "SKILL.md", "t-acc", 12, b8 + ltr)}${txt(s, 132, tr("قصير", "short"), "t-ink2", 10.5, bold)}</g>
      ${R.map((r, i) => `${arrow(s + dirx() * 78, 120, X - dirx() * 96, 62 + i * 58, 0.4 + i * 0.15, "s-line2", "4 4")}<g ${an("rise", 0.5 + i * 0.15)}>${box(X, 62 + i * 58, 184, 46, "f-s1 s-line2")}${txt(X, 58 + i * 58, r, "t-ink", 10.5, b8 + ltr)}${txt(X, 76 + i * 58, W[i], "t-ink3", 10, bold)}</g>`).join("")}
      <g ${an("fade", 1.1)}>${txt(240, 252, tr("الوصف دايمًا · المهارة لما المهمة تيجي · المرجع لما خطوة تحتاجه", "description always · skill when the task comes · reference when needed"), "t-ink", 10, b8)}</g>
      ${cap(tr("مساحة العمل فاضية… للشغل نفسه", "the workspace stays free… for the work"), 1.3, 290)}`;
    },
    ru_setup: () => {
      return `<g ${an("pop", 0.05)}>${fileIcon(mx(60), 66, "s-acc", 0.05)}${txt(mx(60), 104, "Check_Setup.bat", "t-acc", 10, b8 + ltr)}</g>
      ${term(mx(286), 96, 340, 128, ["=== PowerShell ===", "5.1.19041", "=== Python ===", "Python 3.12.4", "OK - SQLite 3.45.3"], 0.3, 10.5, (i) => (i === 4 ? "t-white" : "t-crt"))}${check(mx(286) + dirx() * 150, 150, 1.4)}
      <g ${an("rise", 1.5)}>${box(240, 214, 420, 40, "f-amber-soft s-amber")}${txt(240, 219, tr("ناقصة؟ اطلب Python المعتمدة من الـ IT، ما تنزّلهاش بنفسك", "missing? ask IT for the approved Python; don't download it"), "t-amber", 10.5, b8)}</g>
      ${cap(tr("جهازهم مش جهازك… افحص", "their machine isn't yours… check"), 1.7, 270)}`;
    },
    ru_test: () => {
      const a = mx(126), b = mx(352);
      return `<g ${an("rise", 0.05)}>${bubble(a, 70, 200, 50, "f-acc-soft s-acc", !ar())}${txt(a, 75, tr("«ابنيلي أداة للمثال ده»", "“build me a tool for this example”"), "t-acc", 10.5, b8)}</g>
      <g ${an("fade", 0.3)}>${txt(a, 122, tr("جلسة جديدة · ولا قاعدة في الطلب", "new session · no rule in the request"), "t-ink3", 10.5, bold)}</g>
      ${term(b, 128, 230, 168, ["read AGENTS.md", "5 steps:", " 1 stack (PowerShell)", " 2 country name", " 3 report", " 4 review", " 5 SQLite (stdlib)", "plan for step 1... go on?"].map(nb), 0.6, 9.5)}
      ${check(a, 176, 1.8)}<g ${an("fade", 1.9)}>${txt(a, 206, tr("واستنى الموافقة", "and waited for approval"), "t-mint", 11, b8)}</g>
      ${cap(tr("لو اشتغلت من غير شرح… الطقم جاهز", "if it works unexplained… the kit is ready"), 2.1, 284)}`;
    },
    ru_update: () => {
      const L = ar() ? ["١. الخطة", "٢. من برّه؟", "٣. Data للقراءة", "٤. السجل + مجموع كل جدول", "٥. رقم بإيدك", "٦. ملف غلط", "٧. Task Manager نضيف", "٨. الشرح", "٩. رأي تاني"] : ["1. the plan", "2. outside?", "3. Data read-only", "4. log + each table's sum", "5. a figure by hand", "6. a wrong file", "7. Task Manager clear", "8. the explanation", "9. a second opinion"];
      return `${L.map((s, i) => `<g ${an("rise", 0.05 + i * 0.08)}>${box(mx(150), 36 + i * 27, 240, 23, i === 3 || i === 6 ? "f-amber-soft s-amber" : "f-s1 s-line2")}${txt(mx(150), 41 + i * 27, s, i === 3 || i === 6 ? "t-amber" : "t-ink", 10.5, b8)}</g>`).join("")}
      <g ${an("rise", 0.9)}>${box(mx(390), 116, 140, 56, "f-rose-soft s-rose")}${txt(mx(390), 112, tr("«الكويت ٨»", "“Kuwait 8”"), "t-rose", 11.5, b8)}${txt(mx(390), 130, tr("← سطر ٤", "→ line 4"), "t-ink2", 10.5, bold)}</g>
      <g ${an("rise", 1.1)}>${box(mx(390), 196, 140, 56, "f-rose-soft s-rose")}${txt(mx(390), 192, tr("إكسل مستخبي", "hidden Excel"), "t-rose", 11.5, b8)}${txt(mx(390), 210, tr("← سطر ٧", "→ line 7"), "t-ink2", 10.5, bold)}</g>
      ${cap(tr("الغلطة اللي اتكتبت… ما بتتكررش", "a mistake written down… doesn't repeat"), 1.4, 290)}`;
    },
    ru_same: () => {
      const a = mx(128), b = mx(352);
      return `<g ${an("rise", 0.05)}>${box(a, 92, 180, 100, "f-acc-soft s-acc")}${txt(a, 62, "CLAUDE.md", "t-acc", 12.5, b8 + ltr)}${txt(a, 96, tr("+ «التاريخ yyyy-mm-dd»", "+ “dates yyyy-mm-dd”"), "t-mint", 10.5, b8)}</g>
      <g ${an("rise", 0.3)}>${box(b, 92, 180, 100, "f-mint-soft s-mint")}${txt(b, 62, "AGENTS.md", "t-mint", 12.5, b8 + ltr)}${txt(b, 96, tr("القاعدة ناقصة", "the rule is missing"), "t-rose", 10.5, b8)}</g>
      <g ${an("pop", 0.6)}>${txt(240, 100, "≠", "t-rose", 24, b8)}</g>
      <g ${an("fade", 0.8)}>${txt(240, 168, tr("مصنعين · تاريخين بشكلين · تقارير مش متطابقة", "two plants · two date formats · reports don't match"), "t-rose", 10.5, b8)}</g>
      ${pill(240, 214, 380, 34, tr("التعديل في الملفين مع بعض · وعلى GitHub", "change both files together · keep them on GitHub"), "f-acc-soft s-acc", "t-acc", 11, 1.0)}
      ${cap(tr("ملفين… نسخة واحدة", "two files… one copy"), 1.3, 262)}`;
    },
    ru_verdict: () => {
      const a = mx(120), b = mx(352);
      return `<g ${an("rise", 0.05)}>${folder(a, 104, 170, 130)}${txt(a, 62, tr("طقم البداية", "the starter kit"), "t-amber", 11.5, b8)}${["AGENTS.md", "review-checklist.md", "Run_Log.txt"].map((s, i) => txt(a, 98 + i * 22, s, "t-ink2", 10.5, b8 + ltr)).join("")}</g>
      ${arrow(a + dirx() * 92, 104, b - dirx() * 66, 104, 0.4)}
      <g ${an("pop", 0.6)}>${shield(b, 100, 1.2)}${check(b, 112, 0.9)}</g>
      <g ${an("rise", 1.0)}>${box(mx(120), 214, 200, 48, "f-s1 s-acc")}${txt(mx(120), 208, tr("«نازل من النت؟»", "“from the internet?”"), "t-acc", 10.5, b8)}${txt(mx(120), 226, "AGENTS.md", "t-ink3", 10, bold + ltr)}</g>
      <g ${an("rise", 1.2)}>${box(mx(352), 214, 200, 48, "f-s1 s-acc")}${txt(mx(352), 208, tr("«مين راجعه، وإزاي؟»", "“who reviewed it, how?”"), "t-acc", 10.5, b8)}${txt(mx(352), 226, "review-checklist.md", "t-ink3", 10, bold + ltr)}</g>
      ${cap(tr("الإجابة في ملف… مش في كلام", "the answer in a file… not in words"), 1.5, 280)}`;
    },
    ru_cliff: () => {
      const f = mx(110), q = mx(392), d = dirx();
      return `<g ${an("rise", 0.05)}>${[0, 1, 2, 3, 4].map((k) => `<rect x="${f - 60 + k * 4 * d}" y="${60 - k * 6}" width="120" height="170" rx="6" class="f-s1 s-line2" stroke-width="2"/>`).join("")}${txt(f, 140, tr("٣٠٠ ألف صف", "300,000 rows"), "t-ink", 14, b8)}${txt(f, 162, tr("خلايا مدموجة", "merged cells"), "t-ink3", 11, bold)}${txt(f, 180, tr("تواريخ كنص", "dates as text"), "t-ink3", 11, bold)}</g>
      <g ${an("rise", 0.6)}>${box(240, 262, 300, 50, "f-s2 s-line2")}<rect x="${ar() ? 240 + 130 - 182 : 240 - 130}" y="252" width="182" height="12" rx="6" class="f-rose"/><rect x="${240 - 130}" y="252" width="260" height="12" rx="6" class="s-ink3" fill="none" stroke-width="1.5"/>${txt(240, 280, tr("٧٠٪ · لا يستجيب", "70% · Not responding"), "t-rose", 11.5, b8)}</g>
      <g ${an("pop", 1.1)}>${xl(240, 120, 1.3)}<path d="M${240 - 18} 102 l36 36 M${240 + 18} 102 l-36 36" class="s-rose" stroke-width="4" stroke-linecap="round"/></g>
      <path ${an("draw", 1.6, "s-acc")} pathLength="1" d="M${240 + d * 34} 120 C ${240 + d * 80} 120, ${q - d * 70} 110, ${q - d * 46} 110" stroke-width="3" stroke-dasharray="1" fill="none" marker-end="url(#aih-arrow)"/>
      <g ${an("pop", 1.9)}><ellipse cx="${q}" cy="78" rx="40" ry="12" class="f-acc-soft s-acc" stroke-width="2.5"/><path d="M${q - 40} 78 v64 a40 12 0 0 0 80 0 v-64" class="f-acc-soft s-acc" stroke-width="2.5"/><path d="M${q - 40} 100 a40 12 0 0 0 80 0 M${q - 40} 121 a40 12 0 0 0 80 0" class="s-acc" fill="none" stroke-width="2"/>${txt(q, 120, ar() ? "؟" : "?", "t-acc", 26, b8)}</g>
      <g ${an("fade", 2.2)}>${txt(q, 178, tr("الوحدة الجاية", "next unit"), "t-acc", 13, b8)}${txt(q, 196, tr("أكبر من إكسل", "bigger than Excel"), "t-ink2", 11.5, bold)}</g>`;
    },
  });
  /* ---------- end of unit 4 ---------- */

  const defs = `<svg class="aih-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><marker id="aih-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" class="f-ink2"/></marker></defs></svg>`;
  const drawing = (key, label) => `<svg class="aih-svg" viewBox="0 0 480 320" role="img" aria-label="${esc(label)}">${ART[key] ? ART[key]() : ""}</svg>`;

  /* ---------- the deck ---------- */
  // One player for every story deck (A.decks): the AI history in f1, how a model works in f2, …
  A.mountDeck = function (host, H, opts = {}) {   // opts.present: the presenter's full-screen player drives it (no own chrome)
    if (!H || !host) return;
    const present = !!opts.present;
    const S = H.slides, n = S.length, ui = H.ui;
    const fmt = (s, o) => L(s).replace(/\{(\w+)\}/g, (_, k) => o[k]);
    const num = (v) => (ar() ? Number(v).toLocaleString("ar-EG") : String(v));
    const readSecs = (s) => Math.min(18, Math.max(9, (L(s.title) + s.story.map(L).join(" ") + L(s.idea)).length / 17));

    host.className = (present ? "aih aih-present" : "sec aih") + (H.pace === "slow" ? " slow" : "");   // a slow deck stretches every entrance (history.css)
    host.setAttribute("aria-roledescription", ar() ? "عرض شرائح" : "carousel");
    host.setAttribute("aria-label", L(ui.deck));
    host.innerHTML = `
      ${defs}
      <div class="aih-head">
        <div class="aih-kicker">${esc(L(H.kicker))}</div>
        <h2>${esc(L(H.title))}</h2>
        <p class="aih-lead">${esc(L(H.lead))}</p>
        <div class="aih-tools">
          <button type="button" class="btn aih-play" data-aih-play aria-pressed="false"><span class="aih-pi" aria-hidden="true"></span><span data-aih-play-t>${esc(L(ui.play))}</span></button>
          <a href="#" class="aih-skip" data-aih-skip>${esc(L(ui.skip))} ↓</a>
        </div>
      </div>
      <div class="aih-stage" tabindex="0" aria-describedby="${H.id}-keys">
        <div class="aih-q" aria-hidden="true"><span class="aih-q-mark">؟</span><span class="aih-q-t" data-aih-q>${esc(L(H.question))}</span></div>
        <div class="aih-slides">
          ${S.map((s, i) => `
          <div class="aih-slide" role="group" aria-roledescription="${esc(L(ui.slide))}" aria-label="${esc(fmt(ui.slideOf, { n: num(i + 1), t: num(n) }) + " — " + L(s.year))}" data-i="${i}" aria-hidden="true" inert>
            <div class="aih-year" aria-hidden="true">${esc(L(s.mark || s.year))}</div>
            <div class="aih-txt">
              <div class="aih-era"><span>${esc(L(s.year))}</span>${esc(L(s.era))}</div>
              <h3>${esc(L(s.title))}</h3>
              ${s.story.map((p) => `<p>${esc(L(p))}</p>`).join("")}
              <div class="aih-answer"><small>${esc(L(H.answerLabel))}</small><b>${esc(L(s.answer))}</b></div>
              <div class="aih-idea"><small>${esc(L(H.ideaLabel))}</small>${esc(L(s.idea))}</div>
              ${i === n - 1 ? `<button type="button" class="btn ok aih-start" data-aih-start>${esc(L(ui.start))} ↓</button>` : ""}
            </div>
            <div class="aih-art" data-aih-art="${i}"></div>
          </div>`).join("")}
        </div>
        <button type="button" class="aih-nav aih-prev" data-aih-prev aria-label="${esc(L(ui.prev))}">${A.ico(ar() ? "next" : "prev")}</button>
        <button type="button" class="aih-nav aih-next" data-aih-next aria-label="${esc(L(ui.next))}">${A.ico(ar() ? "prev" : "next")}</button>
        <div class="aih-timer" aria-hidden="true"><i></i></div>
      </div>
      <div class="aih-foot">
        <div class="aih-rail" role="group" aria-label="${esc(L(ui.timeline))}">
          <div class="aih-rail-line" aria-hidden="true"><i></i></div>
          ${S.map((s, i) => `<button type="button" class="aih-dot" data-aih-go="${i}" aria-label="${esc(L(s.year) + " — " + L(s.title))}"><span>${esc(L(s.year).split(" ")[0])}</span></button>`).join("")}
        </div>
        <div class="aih-meta"><span class="aih-count num" data-aih-count></span><span class="aih-note">${esc(L(H.note))}</span></div>
        <p class="sr-only" id="${H.id}-keys">${esc(L(ui.keys))}</p>
        <div class="sr-only" aria-live="polite" data-aih-live></div>
      </div>`;

    const $ = (s) => host.querySelector(s), $$ = (s) => Array.from(host.querySelectorAll(s));
    const slides = $$(".aih-slide"), dots = $$(".aih-dot"), stage = $(".aih-stage");
    const playBtn = $("[data-aih-play]"), playT = $("[data-aih-play-t]"), live = $("[data-aih-live]"), qT = $("[data-aih-q]");
    const timerBar = $(".aih-timer i"), railFill = $(".aih-rail-line i"), count = $("[data-aih-count]");
    let cur = -1, playing = false, elapsed = 0, last = 0, raf = 0, visible = true, countRaf = 0;

    function animateCount(slide) {
      const el = slide.querySelector("[data-count]");
      cancelAnimationFrame(countRaf);
      if (!el) return;
      const to = Number(el.dataset.count), t0 = performance.now(), dur = 1600;
      const draw = (v) => (el.textContent = ar() ? Math.round(v).toLocaleString("ar-EG") : Math.round(v).toLocaleString("en-US"));
      if (quiet()) return draw(to);
      draw(0);
      const step = (now) => { const p = Math.min(1, (now - t0 - 700) / dur); if (p >= 0) draw(to * (1 - Math.pow(1 - p, 3))); if (p < 1) countRaf = requestAnimationFrame(step); };
      countRaf = requestAnimationFrame(step);
    }
    function startSmil(slide, on) {   // the perceptron's travelling dots use SVG motion, started and stopped with the slide
      slide.querySelectorAll("animateMotion").forEach((m) => { try { on && !quiet() ? m.beginElement() : m.endElement(); } catch (e) { /* SMIL unsupported: dots stay hidden */ } });
    }

    // Drawings are built on demand: the slide on screen and its neighbours first, the rest one by one while the browser is idle.
    // Opening a lesson then costs one or two drawings instead of twelve.
    const arts = $$("[data-aih-art]");
    let alive = true;   // false once the reader leaves the page: queued idle work must not build drawings in a detached deck
    const drawAt = (k) => { const el = arts[k]; if (alive && el && !el.firstChild) el.innerHTML = drawing(S[k].art, L(S[k].title)); };
    const drawAround = (k) => { drawAt(k); ric(() => { drawAt(k + 1); drawAt(k - 1); }); };   // neighbours wait for idle time, never the transition
    const ric = window.requestIdleCallback || ((f) => setTimeout(() => f({ timeRemaining: () => 8 }), 60));
    const cic = window.cancelIdleCallback || clearTimeout;
    let idleId = 0;
    const cancelIdle = () => cic(idleId);
    const idleDraw = () => { if (!alive) return; idleId = ric((dl) => { let k = arts.findIndex((el) => !el.firstChild); while (alive && k >= 0 && dl.timeRemaining() > 4) { drawAt(k); k = arts.findIndex((el) => !el.firstChild); } if (k >= 0) idleDraw(); }); };

    function go(i, why) {
      i = Math.max(0, Math.min(n - 1, i));
      if (i === cur) return;
      const fwd = i > cur, prevSlide = slides[cur];
      if (prevSlide) {
        prevSlide.classList.remove("is-on", "enter-f", "enter-b");
        prevSlide.setAttribute("aria-hidden", "true"); prevSlide.inert = true;
        startSmil(prevSlide, false);
        clearTimeout(prevSlide.leaveT);   // a slide can leave again before its last exit timer fires (fast clicking)
        if (!quiet()) { prevSlide.classList.add(fwd ? "leave-f" : "leave-b"); prevSlide.leaveT = setTimeout(() => prevSlide.classList.remove("leave-f", "leave-b"), 380); }
      }
      const s = slides[i];
      clearTimeout(s.leaveT); s.classList.remove("leave-f", "leave-b");
      void s.offsetWidth;                 // restart the entrance animations
      s.classList.add("is-on", cur < 0 ? "enter-0" : fwd ? "enter-f" : "enter-b");
      s.removeAttribute("aria-hidden"); s.inert = false;
      cur = i;
      dots.forEach((d, k) => { d.classList.toggle("on", k === i); d.classList.toggle("past", k < i); d.setAttribute("aria-current", k === i ? "step" : "false"); });
      railFill.style.setProperty("--p", n > 1 ? i / (n - 1) : 1);
      count.textContent = fmt(ui.slideOf, { n: num(i + 1), t: num(n) });
      $("[data-aih-prev]").disabled = i === 0;
      $("[data-aih-next]").disabled = i === n - 1;
      const final = i === n - 1;
      if (qT.dataset.final !== String(final)) {
        qT.dataset.final = String(final);
        stage.classList.toggle("q-final", final);
        if (!quiet()) { qT.classList.remove("swap"); void qT.offsetWidth; qT.classList.add("swap"); }
        setTimeout(() => (qT.textContent = L(final ? H.finalQuestion : H.question)), quiet() ? 0 : 180);
      }
      drawAround(i);   // the drawing must exist before its entrance animations start
      animateCount(s); startSmil(s, true);
      elapsed = 0; timerBar.style.setProperty("--p", 0);
      if (why !== "auto" && !playing) live.textContent = `${fmt(ui.slideOf, { n: num(i + 1), t: num(n) })}: ${L(S[i].year)} — ${L(S[i].title)}`;
      if (final && playing && why === "auto") setPlaying(false, true);
    }

    function tick(now) {
      if (!playing) return;
      if (visible && !doc.hidden) elapsed += Math.min(100, now - last);
      last = now;
      const dur = readSecs(S[cur]) * 1000;
      timerBar.style.setProperty("--p", Math.min(1, elapsed / dur));
      if (elapsed >= dur) { if (cur < n - 1) go(cur + 1, "auto"); else return setPlaying(false, true); }
      raf = requestAnimationFrame(tick);
    }
    function setPlaying(on, ended) {
      playing = on;
      cancelAnimationFrame(raf);
      host.classList.toggle("is-playing", on);
      playBtn.setAttribute("aria-pressed", String(on));
      playT.textContent = L(on ? ui.pause : ended || cur === n - 1 ? ui.replay : ui.play);
      live.setAttribute("aria-live", on ? "off" : "polite");
      if (!on) { timerBar.style.setProperty("--p", 0); return; }
      if (cur === n - 1) go(0, "user");
      last = performance.now(); elapsed = 0;
      raf = requestAnimationFrame(tick);
    }

    const step = (d, why = "user") => { go(cur + d, why); if (playing) { elapsed = 0; } };
    $("[data-aih-prev]").onclick = () => step(-1);
    $("[data-aih-next]").onclick = () => step(1);
    dots.forEach((d) => (d.onclick = () => { go(Number(d.dataset.aihGo), "user"); if (playing) elapsed = 0; }));
    playBtn.onclick = () => setPlaying(!playing);
    const toLesson = (e) => {
      e && e.preventDefault();
      setPlaying(false);
      let next = host.nextElementSibling;
      while (next && !next.offsetHeight) next = next.nextElementSibling;
      if (next) {
        next.scrollIntoView({ behavior: quiet() ? "auto" : "smooth", block: "start" });
        const f = next.querySelector("h2") || next;   // a heading is not focusable by itself: make it a focus target so Tab continues in the lesson
        if (!f.hasAttribute("tabindex")) f.setAttribute("tabindex", "-1");
        f.focus({ preventScroll: true });
      }
    };
    $("[data-aih-skip]").onclick = toLesson;
    const startBtn = $("[data-aih-start]"); if (startBtn) startBtn.onclick = toLesson;

    // keyboard: arrows follow the reading direction (in Arabic, ← is "next")
    stage.addEventListener("keydown", (e) => {
      const fwdKey = ar() ? "ArrowLeft" : "ArrowRight", backKey = ar() ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwdKey) step(1); else if (e.key === backKey) step(-1);
      else if (e.key === "Home") go(0, "user"); else if (e.key === "End") go(n - 1, "user");
      else if ((e.key === " " || e.key === "k") && e.target === stage) setPlaying(!playing);
      else return;
      e.preventDefault();
    });
    // swipe: drag the slide toward where the next one waits
    let sx = 0, sy = 0, down = false;
    stage.addEventListener("pointerdown", (e) => { if (e.pointerType === "mouse" && e.button !== 0) return; down = true; sx = e.clientX; sy = e.clientY; });
    stage.addEventListener("pointerup", (e) => {
      if (!down) return; down = false;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
      step((ar() ? dx > 0 : dx < 0) ? 1 : -1);
    });
    stage.addEventListener("pointercancel", () => (down = false));

    // pause the clock while the deck is off screen or the tab is hidden; it resumes where it was
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => es.forEach((en) => { visible = en.intersectionRatio > 0.35; host.classList.toggle("is-away", !en.isIntersecting); }), { threshold: [0, 0.35, 0.6] });
      io.observe(stage);
    }
    const stop = () => { io && io.disconnect(); playing = false; cancelAnimationFrame(raf); cancelAnimationFrame(countRaf); alive = false; cancelIdle(); };
    A.onLeave(stop);

    go(Math.max(0, Math.min(n - 1, opts.start || 0)), "init");
    idleDraw();
    return { n, get cur() { return cur; }, go: (i) => go(i, "user"), destroy: stop };
  };
  A.mountHistory = (host) => A.mountDeck(host, A.aiHistory);
})(window.ACADEMY = window.ACADEMY || {});
