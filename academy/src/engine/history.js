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
  const txt = (x, y, s, cls, size = 14, more = "") =>
    `<text x="${x}" y="${y}" class="${cls}" font-size="${size}" text-anchor="middle" ${more}>${esc(s)}</text>`;
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
      <g ${an("pop", 1.9)}><rect x="${xOf(focus) - 70}" y="236" width="140" height="34" rx="17" class="f-mint"/>${txt(xOf(focus), 258, ar() ? "ضفة = شط مش بنك" : "bank = riverside", "t-white", 13, 'font-weight="700"')}</g>
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

  const defs = `<svg class="aih-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><marker id="aih-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" class="f-ink2"/></marker></defs></svg>`;
  const drawing = (key, label) => `<svg class="aih-svg" viewBox="0 0 480 320" role="img" aria-label="${esc(label)}">${ART[key] ? ART[key]() : ""}</svg>`;

  /* ---------- the deck ---------- */
  A.mountHistory = function (host) {
    const H = A.aiHistory;
    if (!H || !host) return;
    const S = H.slides, n = S.length, ui = H.ui;
    const fmt = (s, o) => L(s).replace(/\{(\w+)\}/g, (_, k) => o[k]);
    const num = (v) => (ar() ? Number(v).toLocaleString("ar-EG") : String(v));
    const readSecs = (s) => Math.min(18, Math.max(9, (L(s.title) + s.story.map(L).join(" ") + L(s.idea)).length / 17));

    host.className = "sec aih";
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
      <div class="aih-stage" tabindex="0" aria-describedby="aih-keys">
        <div class="aih-q" aria-hidden="true"><span class="aih-q-mark">؟</span><span class="aih-q-t" data-aih-q>${esc(L(H.question))}</span></div>
        <div class="aih-slides">
          ${S.map((s, i) => `
          <div class="aih-slide" role="group" aria-roledescription="${esc(L(ui.slide))}" aria-label="${esc(fmt(ui.slideOf, { n: num(i + 1), t: num(n) }) + " — " + L(s.year))}" data-i="${i}" aria-hidden="true" inert>
            <div class="aih-year" aria-hidden="true">${esc(L(s.year))}</div>
            <div class="aih-txt">
              <div class="aih-era"><span>${esc(L(s.year))}</span>${esc(L(s.era))}</div>
              <h3>${esc(L(s.title))}</h3>
              ${s.story.map((p) => `<p>${esc(L(p))}</p>`).join("")}
              <div class="aih-answer"><small>${esc(L(H.answerLabel))}</small><b>${esc(L(s.answer))}</b></div>
              <div class="aih-idea"><small>${esc(L(H.ideaLabel))}</small>${esc(L(s.idea))}</div>
              ${i === n - 1 ? `<button type="button" class="btn ok aih-start" data-aih-start>${esc(L(ui.start))} ↓</button>` : ""}
            </div>
            <div class="aih-art">${drawing(s.art, L(s.title))}</div>
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
        <p class="sr-only" id="aih-keys">${esc(L(ui.keys))}</p>
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

    function go(i, why) {
      i = Math.max(0, Math.min(n - 1, i));
      if (i === cur) return;
      const fwd = i > cur, prevSlide = slides[cur];
      if (prevSlide) {
        prevSlide.classList.remove("is-on", "enter-f", "enter-b");
        prevSlide.setAttribute("aria-hidden", "true"); prevSlide.inert = true;
        startSmil(prevSlide, false);
        if (!quiet()) { prevSlide.classList.add(fwd ? "leave-f" : "leave-b"); setTimeout(() => prevSlide.classList.remove("leave-f", "leave-b"), 520); }
      }
      const s = slides[i];
      s.classList.remove("leave-f", "leave-b");
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
      if (next) { next.scrollIntoView({ behavior: quiet() ? "auto" : "smooth", block: "start" }); const f = next.querySelector("h2,summary,button,a"); f && f.focus({ preventScroll: true }); }
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
      io = new IntersectionObserver((es) => es.forEach((en) => (visible = en.intersectionRatio > 0.35)), { threshold: [0, 0.35, 0.6] });
      io.observe(stage);
    }
    A.onLeave(() => { io && io.disconnect(); playing = false; cancelAnimationFrame(raf); cancelAnimationFrame(countRaf); });

    go(0, "init");
  };
})(window.ACADEMY = window.ACADEMY || {});
