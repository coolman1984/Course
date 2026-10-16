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
      const X = rowX(words.length, w, 8);
      const arcs = words.map((_, i) => i >= focus ? "" : `<path ${an("draw", 0.8 + i * 0.1, i === link ? "s-acc" : "s-line2")} pathLength="1" d="M${X(focus)} 176 Q${(X(focus) + X(i)) / 2} ${i === link ? 40 : 110} ${X(i)} 176" stroke-width="${i === link ? 5.5 : 1.8}" fill="none" stroke-linecap="round"/>`).join("");
      return `${arcs}${words.map((s, i) => `<g ${an("rise", 0.1 + i * 0.07)}>${chip(X(i), 198, w, s, i === focus ? "f-acc" : i === link ? "f-acc-soft s-acc" : "f-s1 s-line2", i === focus ? "t-white" : "t-ink", 13.5)}</g>`).join("")}
      <g ${an("pop", 2.0)}><rect x="${X(focus) - 72}" y="240" width="144" height="34" rx="17" class="f-mint"/>${txt(X(focus), 262, ar() ? "«هو» = المدير" : "“he” = the manager", "t-white", 13, 'font-weight="700"')}</g>
      ${txt(240, 302, ar() ? "كل كلمة بتبص على اللي قبلها بس، مش على الإجابة" : "each word looks only at the words before it, never ahead", "t-ink3", 13)}`;
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
      const tx = ar() ? 352 : 128;
      const hits = [[-52, -38], [34, -40], [-20, 22], [6, -6]];
      return `<g ${an("rise", 0.05)}>${[58, 42, 26, 10].map((r, i) => `<circle cx="${tx}" cy="140" r="${r}" class="${i % 2 ? "f-s1" : "f-rose-soft"} s-rose" stroke-width="2"/>`).join("")}</g>
      ${hits.map(([dx, dy], i) => `<g ${an("pop", 0.5 + i * 0.35)}><line x1="${tx + dx}" y1="${140 + dy}" x2="${tx + dx + (ar() ? 22 : -22)}" y2="${140 + dy - 16}" class="s-ink2" stroke-width="3" stroke-linecap="round"/><circle cx="${tx + dx}" cy="${140 + dy}" r="5" class="${i === 3 ? "f-mint" : "f-ink2"}"/></g>`).join("")}
      ${txt(tx, 230, ar() ? "كل محاولة أقرب شوية" : "each try a little closer", "t-ink3", 13)}
      <g ${an("fade", 0.3)}><path d="M${ar() ? 60 : 250} 70 V 210 H ${ar() ? 240 : 430}" class="s-ink3" stroke-width="2" fill="none"/>
      ${txt(ar() ? 150 : 340, 230, ar() ? "المحاولات ←" : "attempts →", "t-ink3", 12)}${txt(ar() ? 30 : 236, 64, ar() ? "الغلط" : "error", "t-ink3", 12, `text-anchor="${ar() ? "start" : "end"}"`)}</g>
      <path ${an("draw", 0.8, `s-acc`)} pathLength="1" d="${ar() ? "M64 78 C 90 160, 140 186, 236 198" : "M254 78 C 280 160, 330 186, 426 198"}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <g ${an("pop", 2.0)}><rect x="110" y="258" width="260" height="38" rx="19" class="f-ink"/>${txt(240, 282, ar() ? "خمّن ← قارن ← صحّح شعرة ← كرّر" : "guess → compare → nudge → repeat", "t-bg", 13, 'font-weight="700"')}</g>`;
    },
    m_scale: () => {
      const bars = ar() ? [["البيانات", "f-acc"], ["المفاتيح", "f-amber"], ["الحساب", "f-mint"]] : [["data", "f-acc"], ["knobs", "f-amber"], ["compute", "f-mint"]];
      const X = rowX(3, 62, 26, ar() ? 330 : 150);
      return `${bars.map(([s, c], i) => `<rect class="an vbar ${c}" style="--d:${0.2 + i * 0.15}s" x="${X(i) - 31}" y="${96 + i * 8}" width="62" height="${170 - i * 8}" rx="8"/>${txt(X(i), 290, s, "t-ink2", 13, 'font-weight="700"')}`).join("")}
      <g ${an("fade", 0.9)}><path d="M${ar() ? 40 : 268} 80 V 266 H ${ar() ? 212 : 440}" class="s-ink3" stroke-width="2" fill="none"/>${txt(ar() ? 126 : 354, 290, ar() ? "الجودة بتطلع" : "quality rises", "t-ink2", 13, 'font-weight="700"')}</g>
      <path ${an("draw", 1.1, `s-acc`)} pathLength="1" d="${ar() ? "M48 250 C 90 214, 130 150, 204 96" : "M276 250 C 318 214, 358 150, 432 96"}" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${["✍️", "🌍", "💻"].map((e, i) => `<g ${an("pop", 1.6 + i * 0.2)}><text x="${(ar() ? 90 : 318) + i * 48}" y="${(ar() ? 180 : 180) - i * 34}" font-size="20" text-anchor="middle">${e}</text></g>`).join("")}
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
      <g ${an("pop", 1.6)}>${person(L2 + (ar() ? -80 : 80), 300, 0.8, "f-ink2")}<g transform="translate(${L2 + (ar() ? -56 : 104)} 266)"><circle r="12" class="f-mint"/><text y="5" font-size="13" text-anchor="middle">👍</text></g></g>
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
      <g ${an("fade", 1.0)}>${txt(240, 286, ar() ? "درجة الحرارة: قليلة = الأرجح، عالية = أجرأ" : "temperature: low = most likely, high = bolder", "t-ink3", 12.5)}</g>`;
    },
    m_recap: () => {
      const steps = ar() ? ["كلامك", "توكنز", "خريطة", "انتباه × طبقات", "احتمالات", "الكلمة الجاية"] : ["your words", "tokens", "meaning map", "attention × layers", "chances", "next word"];
      const pos = [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1], [0, 1]];
      const at = ([c, r]) => [ar() ? 380 - c * 140 : 100 + c * 140, 92 + r * 104];
      return `${pos.slice(1).map((p, i) => { const [x1, y1] = at(pos[i]), [x2, y2] = at(p); return `<path ${an("draw", 0.3 + i * 0.3, `s-acc`)} pathLength="1" d="M${x1 + (y1 === y2 ? (x2 > x1 ? 58 : -58) : 0)} ${y1 + (y1 === y2 ? 0 : 26)} L${x2 + (y1 === y2 ? (x2 > x1 ? -58 : 58) : 0)} ${y2 - (y1 === y2 ? 0 : 26)}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`; }).join("")}
      ${pos.map((p, i) => { const [x, y] = at(p); return `<g ${an("pop", 0.15 + i * 0.3)}><rect x="${x - 58}" y="${y - 24}" width="116" height="48" rx="13" class="${i === 5 ? "f-acc" : i === 0 ? "f-s2" : "f-s1 s-acc"}" stroke-width="2"/>${txt(x, y + 5, steps[i], i === 5 ? "t-white" : "t-ink", 13, 'font-weight="700"')}</g>`; }).join("")}
      <g ${an("rise", 2.0)}>${person(ar() ? 380 : 100, 300, 0.75, "f-ink2")}${txt(ar() ? 260 : 220, 292, ar() ? "إنت: Context واضح + مراجعة" : "you: clear context + review", "t-mint", 13, 'font-weight="700"')}</g>`;
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
        <g ${an("rise", d)}>${box(cx, 160, 210, 250, clean ? "f-mint-soft s-mint" : "f-s1 s-line2")}${txt(cx, 54, clean ? (ar() ? "Context نضيف" : "clean Context") : (ar() ? "Context مشوّش" : "noisy Context"), clean ? "t-mint" : "t-ink3", 13, 'font-weight="800"')}</g>
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
      <g ${an("pop", 2.1)}>${box(240, 292, 300, 32, "f-mint-soft s-mint")}${txt(240, 297, ar() ? "إنت اللي بتوجّه: Prompt دقيق + Context نضيف" : "you steer: a precise Prompt + a clean Context", "t-mint", 12.5, bold)}</g>`;
    }
  });

  /* ---------- drawings for "why the Context is limited" (data/window-story.js) ---------- */
  const digits = (s) => (ar() ? String(s).replace(/\d/g, (c) => "٠١٢٣٤٥٦٧٨٩"[c]) : String(s));
  const grow = (x, y, w, h, cls, d) =>   // a bar that grows from the reading start
    `<rect class="an grow ${cls}" style="--d:${d}s;transform-origin:${ar() ? "right" : "left"} center" x="${ar() ? 480 - x - w : x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(6, h / 2)}"/>`;
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
      return `<g ${an("fade", 0)}>${txt(240, 72, ar() ? "الـ Context = ترابيزة الشغل" : "the Context = the work table", "t-acc", 15, 'font-weight="800"')}</g>
      <g ${an("rise", 0.05)}><rect x="96" y="250" width="14" height="40" rx="4" class="f-ink3"/><rect x="370" y="250" width="14" height="40" rx="4" class="f-ink3"/>${box(240, 176, 372, 150, "f-s2 s-line2", 2.5)}</g>
      ${items.map((s, i) => `<g ${an("pop", 0.35 + i * 0.15)}>${chip(X(i), 146, 78, s, i === 0 ? "f-s1 s-ink3" : i === 3 ? "f-mint-soft s-mint" : "f-acc-soft s-acc", "t-ink", 12.5)}</g>`).join("")}
      <g ${an("fade", 1.0)}>${[[150, 118], [240, 150], [330, 96]].map(([x, w]) => `<rect x="${x - w / 2}" y="${200}" width="${w}" height="12" rx="6" class="f-s3"/>`).join("")}${[[196, 132], [300, 110]].map(([x, w]) => `<rect x="${x - w / 2}" y="${222}" width="${w}" height="12" rx="6" class="f-s3"/>`).join("")}</g>
      <path ${an("draw", 1.35, "s-rose")} pathLength="1" d="M${mx(414)} 236 Q ${mx(436)} 246 ${fx} 270" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>
      <g transform="rotate(${ar() ? -16 : 16} ${fx} 292)"><g ${an("rise", 1.55)}>${box(fx, 292, 76, 28, "f-rose-soft s-rose", 2, 'stroke-dasharray="4 4"')}${txt(fx, 297, ar() ? "أقدم رسالة" : "oldest msg", "t-rose", 11.5, bold)}</g></g>
      ${txt(220, 310, ar() ? "اللي على الترابيزة بس هو اللي بيشوفه" : "it sees only what is on the table", "t-ink2", 13, bold)}`;
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
      return `${txt(240, 56, ar() ? "مساحة الترابيزة (بالتوكنز)" : "table space (in tokens)", "t-ink3", 12.5, bold)}
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
      <g ${an("rise", 1.5)}>${box(240, 290, 330, 34, "f-s2 s-line2")}${txt(240, 295, ar() ? "كل رسالة بتتقري معاها الترابيزة كلها" : "every message is read with the whole table", "t-ink2", 12.5, bold)}</g>`;
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
      ${txt(240, 284, ar() ? "دخول الترابيزة ≠ الانتباه" : "on the table ≠ paid attention to", "t-ink3", 12.5, bold)}`;
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
      <g ${an("pop", 1.4)}>${box(240, 304, 200, 28, "f-acc", 0)}${txt(240, 309, ar() ? "إنت مدير الترابيزة" : "you manage the table", "t-white", 13, bold)}</g>`;
    },
    w_recap: () => {
      const s = ar() ? ["ترابيزة محدودة", "اللي يقع بيتنسى", "الزحمة: أبطأ وأغلى وأقل تركيز", "إنت بتختار اللي عليها"]
        : ["a limited table", "what falls off is forgotten", "crowded = slower, dearer, blurrier", "you choose what's on it"];
      const pos = [[0, 0], [1, 0], [1, 1], [0, 1]];
      const at = ([c, r]) => [ar() ? 360 - c * 240 : 120 + c * 240, 82 + r * 128];
      const arrow = (p, q, d) => { const [x1, y1] = at(p), [x2, y2] = at(q);
        return y1 === y2 ? `<path ${an("draw", d, "s-acc")} pathLength="1" d="M${x1 + (x2 > x1 ? 107 : -107)} ${y1} L${x2 + (x2 > x1 ? -109 : 109)} ${y2}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`
          : `<path ${an("draw", d, "s-acc")} pathLength="1" d="M${x1} ${y1 + 32} L${x2} ${y2 - 34}" stroke-width="2.5" fill="none" marker-end="url(#aih-arrow)"/>`; };
      return `${pos.slice(1).map((q, i) => arrow(pos[i], q, 0.4 + i * 0.4)).join("")}
      ${pos.map((p, i) => { const [x, y] = at(p); return `<g ${an("pop", 0.15 + i * 0.4)}>${box(x, y, 210, 58, i === 3 ? "f-mint" : i === 0 ? "f-acc-soft s-acc" : "f-s1 s-acc")}${txt(x, y + 5, s[i], i === 3 ? "t-white" : "t-ink", 12, bold)}</g>`; }).join("")}
      <g ${an("rise", 1.0)}><rect x="${at([0, 0])[0] - 30}" y="146" width="60" height="9" rx="3" class="f-ink3"/><rect x="${at([0, 0])[0] - 24}" y="155" width="6" height="16" class="f-ink3"/><rect x="${at([0, 0])[0] + 18}" y="155" width="6" height="16" class="f-ink3"/></g>
      <g ${an("pop", 2.0)}>${box(240, 296, 330, 32, "f-mint-soft s-mint")}${txt(240, 301, ar() ? "اللي على الترابيزة بس هو اللي موجود" : "only what is on the table exists", "t-mint", 12.5, bold)}</g>`;
    }
  });

  const defs = `<svg class="aih-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><marker id="aih-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" class="f-ink2"/></marker></defs></svg>`;
  const drawing = (key, label) => `<svg class="aih-svg" viewBox="0 0 480 320" role="img" aria-label="${esc(label)}">${ART[key] ? ART[key]() : ""}</svg>`;

  /* ---------- the deck ---------- */
  // One player for every story deck (A.decks): the AI history in f1, how a model works in f2, …
  A.mountDeck = function (host, H) {
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
    A.onLeave(() => { io && io.disconnect(); playing = false; cancelAnimationFrame(raf); cancelAnimationFrame(countRaf); });

    go(0, "init");
  };
  A.mountHistory = (host) => A.mountDeck(host, A.aiHistory);
})(window.ACADEMY = window.ACADEMY || {});
