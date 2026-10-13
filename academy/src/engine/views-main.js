/* Main views: home, book map, unit, lesson, lesson catalog. Shared components: prompt card, quick check. */
"use strict";
(function () {
  const App = ACAD.App; const { h, t, tr } = App;

  /* ---------- shared: section wrapper ---------- */
  App.section = (id, ico, title, badge, ...body) => h("section", { class: "lesson-section", id },
    h("div", { class: "sec-title" }, h("span", { class: "sec-ico", "aria-hidden": "true" }, ico), h("h2", null, title), badge || null), ...body);

  /* ---------- shared: prompt card ---------- */
  App.varsOf = (text) => { const out = []; const re = /\[([^\]\[]{1,60})\]/g; let m; while ((m = re.exec(text))) if (!out.includes(m[1])) out.push(m[1]); return out; };
  App.fillPrompt = (text, vals) => text.replace(/\[([^\]\[]{1,60})\]/g, (m, k) => (vals[k] && vals[k].trim() ? vals[k].trim() : m));
  App.promptCard = (p, opts = {}) => {
    const text = tr(p.text); const vars = App.varsOf(text); const vals = {};
    const pre = h("div", { class: "prompt-text", dir: App.isAr() ? "rtl" : "ltr" });
    const draw = () => {
      const filled = App.fillPrompt(text, vals);
      pre.innerHTML = App.esc(filled).replace(/\[([^\]\[]{1,60})\]/g, '<span class="var">[$1]</span>');
      for (const k in vals) if (vals[k] && vals[k].trim()) { /* highlight filled values */ }
    };
    draw();
    const saveBtn = h("button", { class: "btn sm", onclick: () => { const on = App.toggleBookmark("prompt", p.id); saveBtn.lastChild.textContent = on ? t("saved") : t("save"); App.toast(on ? t("savedToNotebook") : t("removed")); } }, App.icon("bookmark", 16), h("span", null, App.isBookmarked("prompt", p.id) ? t("saved") : t("save")));
    const body = h("div", { class: "pbody prompt" },
      tr(p.goal) ? h("div", { class: "muted", style: { fontSize: "14.5px" } }, h("b", null, "🎯 " + t("goal") + ": "), tr(p.goal)) : null,
      vars.length ? h("div", null, h("div", { class: "muted", style: { fontSize: "13px", fontWeight: 800, marginBottom: "4px" } }, "✏️ " + t("fillVars")),
        h("div", { class: "vars" }, vars.map((v, i) => h("div", null, h("label", { for: p.id + "-v" + i }, v), h("input", { id: p.id + "-v" + i, type: "text", placeholder: v, oninput: (e) => { vals[v] = e.target.value; draw(); } }))))) : null,
      pre,
      h("div", { class: "row" },
        h("button", { class: "btn sm primary", onclick: () => { App.copy(App.fillPrompt(text, vals)); App.state.labs["copy:" + p.id] = Date.now(); App.save(); } }, App.icon("copy", 16), t("copy")),
        saveBtn,
        opts.noLesson || !p.lesson ? null : h("a", { class: "btn sm ghost", href: "#/lesson/" + p.lesson }, "📘 " + t("relatedLesson"))),
      h("div", { class: "prompt-meta" },
        p.example ? h("div", null, h("b", null, "👁️ " + t("exampleOutput") + " (" + t("illustrative") + ")"), h("span", { html: App.inline(tr(p.example)) })) : null,
        p.tip ? h("div", null, h("b", null, "💡 " + t("tip")), h("span", { html: App.inline(tr(p.tip)) })) : null));
    const card = h("details", { class: "prompt-card", id: "pr-" + p.id, open: opts.open || null },
      h("summary", null, h("span", { class: "sec-ico", "aria-hidden": "true", style: { width: "34px", height: "34px", fontSize: "16px" } }, p.icon || "⚡"),
        h("span", { class: "t" }, h("b", null, tr(p.title)), h("small", null, App.strip(p.goal).slice(0, 110))),
        h("span", { class: "row", style: { gap: "4px" } }, App.srcBadge(p.src || "book", p.pages), p.cat ? h("span", { class: "chip hide-sm" }, t("cat_" + p.cat)) : null)),
      body);
    return card;
  };

  /* ---------- shared: question (mcq / order) ---------- */
  App.question = (q, onAnswer, opts = {}) => {
    const box = h("div", { class: "quiz-q", id: opts.id || null });
    const head = h("h4", null, opts.num ? App.num(opts.num) + ". " : "", tr(q.q));
    box.append(head);
    if (q.type === "order") {
      const items = tr(q.items).map((x, i) => ({ x, i }));
      // deterministic shuffle so the starting order is never the answer
      let cur = items.slice().sort((a, b) => ((a.i * 7 + 3) % items.length) - ((b.i * 7 + 3) % items.length));
      if (cur.every((c, k) => c.i === k)) cur.reverse();
      const ol = h("ol", { class: "order-list" });
      const draw = (done) => {
        ol.replaceChildren(...cur.map((c, k) => h("li", { class: done ? (c.i === k ? "right" : "wrong") : "" }, h("b", null, App.num(k + 1) + "."), h("span", null, c.x),
          done ? null : h("span", { class: "mv" },
            h("button", { class: "btn sm ghost", "aria-label": t("moveUp"), disabled: k === 0, onclick: () => { [cur[k - 1], cur[k]] = [cur[k], cur[k - 1]]; draw(); ol.querySelectorAll("li")[k - 1].querySelector("button").focus(); } }, "▲"),
            h("button", { class: "btn sm ghost", "aria-label": t("moveDown"), disabled: k === cur.length - 1, onclick: () => { [cur[k + 1], cur[k]] = [cur[k], cur[k + 1]]; draw(); const b = ol.querySelectorAll("li")[k + 1].querySelectorAll("button"); b[b.length - 1].focus(); } }, "▼")))));
      };
      draw(false);
      const check = h("button", { class: "btn sm primary", style: { marginTop: "10px" }, onclick: () => {
        const ok = cur.every((c, k) => c.i === k); draw(true); check.remove();
        box.append(h("div", { class: "explain " + (ok ? "right" : "wrong") }, h("b", null, ok ? "✅ " + t("correct") : "❌ " + t("orderWrong")), " ", h("span", { html: App.inline(tr(q.why)) }),
          ok ? null : h("div", { style: { marginTop: "6px" } }, h("b", null, t("rightOrder") + ": "), tr(q.items).join(App.isAr() ? " ← " : " → "))));
        onAnswer && onAnswer(ok, q);
      } }, t("checkOrder"));
      box.append(ol, check);
      return box;
    }
    const opts2 = tr(q.opts);
    const buttons = opts2.map((o, k) => h("button", { class: "opt", onclick: () => choose(k) }, h("span", { class: "k" }, (App.isAr() ? "أبجد"[k] || k + 1 : "ABCD"[k] || k + 1)), h("span", null, o)));
    const choose = (k) => {
      buttons.forEach((b, i) => { b.disabled = true; if (i === q.a) b.classList.add("right"); else if (i === k) b.classList.add("wrong"); });
      const ok = k === q.a;
      const exWrong = q.ex && q.ex[k] ? tr(q.ex[k]) : "";
      box.append(h("div", { class: "explain " + (ok ? "right" : "wrong") }, h("b", null, ok ? "✅ " + t("correct") : "❌ " + t("wrongAns")), " ",
        !ok && exWrong ? h("span", { html: App.inline(exWrong) + " " }) : null, h("span", { html: App.inline(tr(q.why)) }),
        !ok && q.lesson && !opts.inLesson ? h("div", { style: { marginTop: "6px" } }, t("reviewThis") + " ", h("a", { href: "#/lesson/" + q.lesson }, "📘 " + tr((App.lesson(q.lesson) || {}).title))) : null));
      onAnswer && onAnswer(ok, q, k);
    };
    box.append(...buttons);
    return box;
  };

  /* ---------- HOME ---------- */
  function heroCanvas(canvas) {
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let w, hgt, pts = [], raf, running = true;
    const resize = () => { const r = canvas.getBoundingClientRect(); const d = Math.min(2, window.devicePixelRatio || 1); w = r.width; hgt = r.height; canvas.width = w * d; canvas.height = hgt * d; ctx.setTransform(d, 0, 0, d, 0, 0); pts = Array.from({ length: Math.round(Math.min(70, w / 16)) }, (_, i) => ({ x: Math.random() * w, y: Math.random() * hgt, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 1 + Math.random() * 1.8, ph: Math.random() * 6 })); };
    const draw = (time) => {
      ctx.clearRect(0, 0, w, hgt);
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > hgt) p.vy *= -1; }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const a = pts[i], b = pts[j]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 120) { ctx.strokeStyle = `rgba(143,177,255,${(1 - d / 120) * .28})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      for (const p of pts) { const g = .55 + .45 * Math.sin(time / 900 + p.ph); ctx.fillStyle = `rgba(160,200,255,${g})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
      if (running && !App.reduced()) raf = requestAnimationFrame(draw);
    };
    resize(); draw(0);
    const ro = new ResizeObserver(App.debounce(() => { resize(); draw(0); }, 120)); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; cancelAnimationFrame(raf); if (running && !App.reduced()) raf = requestAnimationFrame(draw); });
    io.observe(canvas);
    App.onLeave(() => { running = false; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); });
  }
  App.route(/^#?\/?$/, () => {
    const p = App.progress();
    const last = App.state.last && App.state.last !== "#/" ? App.state.last : null;
    const firstOpen = App.ordered().find((l) => !App.lessonState(l.id).done) || App.ordered()[0];
    const canvas = h("canvas", { "aria-hidden": "true" });
    const hero = h("section", { class: "hero" }, canvas,
      h("div", null,
        h("div", { class: "eyebrow", style: { color: "#8fb1ff" } }, t("heroEyebrow")),
        h("h1", { html: t("heroTitle") }),
        h("p", { class: "lead" }, t("heroLead")),
        h("div", { class: "row", style: { marginTop: "20px" } },
          h("a", { class: "btn primary", href: "#/lesson/" + (firstOpen ? firstOpen.id : "") }, p.done ? t("continueLearning") : t("startJourney"), " ", App.icon(App.isAr() ? "prev" : "next", 18)),
          last ? h("a", { class: "btn", href: last }, App.icon("replay", 18), t("resumeWhere")) : h("a", { class: "btn", href: "#/map" }, App.icon("map", 18), t("bookMap")),
          h("button", { class: "btn", onclick: () => App.openSearch() }, App.icon("search", 18), t("search"))),
        h("div", { class: "stats" },
          [[ACAD.lessons.length, t("statLessons")], [Object.keys(ACAD.scenes).length, t("statScenes")], [Object.keys(ACAD.labs).length, t("statLabs")], [ACAD.prompts.length, t("statPrompts")], [41, t("statPages")]].map(([n, l]) => h("div", { class: "stat" }, h("b", null, App.num(n)), h("span", null, l))))),
      h("div", { class: "hero-art", "aria-hidden": "true" },
        h("div", { class: "photo", style: { backgroundImage: `url(${ACAD.img["hero-robot"]})` } }),
        h("span", { class: "floaty", style: { top: "8%", insetInlineStart: "-6%" } }, "🧠 " + t("lv_simple")),
        h("span", { class: "floaty", style: { top: "42%", insetInlineEnd: "-8%", animationDelay: "1.5s" } }, "🔍 " + t("lv_mech")),
        h("span", { class: "floaty", style: { bottom: "10%", insetInlineStart: "-4%", animationDelay: "3s" } }, "🛠️ " + t("lv_practice"))));
    setTimeout(() => heroCanvas(canvas), 0);

    // learning loop
    const loop = h("section", { class: "section" },
      h("div", { class: "section-head" }, h("h2", null, t("howYouLearn"))),
      h("div", { class: "grid g4" }, ["watch", "understand", "try", "fail", "connect", "apply", "master", "teach"].map((k, i) =>
        h("div", { class: "card soft", style: { padding: "14px 16px" } }, h("div", { style: { fontSize: "24px" } }, ["👀", "💡", "🧪", "🔁", "🕸️", "🛠️", "🏅", "🎤"][i]), h("b", null, App.num(i + 1) + ". " + t("loop_" + k)), h("div", { class: "muted", style: { fontSize: "13.5px" } }, t("loopd_" + k))))));

    // 8-level journey (book p4)
    const jdesc = h("div", { class: "card soft", style: { marginTop: "14px" }, "aria-live": "polite" });
    const levels = ACAD.journey || [];
    const showJ = (i) => { const j = levels[i]; jdesc.replaceChildren(h("div", { class: "row" }, h("b", { style: { fontSize: "17px" } }, j.ico + " " + tr(j.name)), App.srcBadge("book", [4])), h("p", { style: { margin: "6px 0" } }, tr(j.desc)), h("p", { class: "muted", style: { margin: 0 } }, "➜ ", tr(j.where), " ", ...(j.lessons || []).map((id) => h("a", { class: "chip", href: "#/lesson/" + id, style: { marginInline: "3px" } }, tr((App.lesson(id) || {}).title))))); jbtns.forEach((b, k) => b.setAttribute("aria-pressed", String(k === i))); };
    const jbtns = levels.map((j, i) => h("button", { class: "jstep", onclick: () => showJ(i), "aria-pressed": "false" }, h("span", { class: "n" }, App.num(i + 1)), h("span", { style: { fontSize: "22px" } }, j.ico), h("b", null, tr(j.name))));
    const journey = h("section", { class: "section" },
      h("div", { class: "section-head" }, h("h2", null, t("journeyTitle")), App.srcBadge("book", [4])),
      h("p", { class: "muted" }, t("journeyLead")),
      h("div", { class: "journey" }, jbtns), jdesc);
    if (levels.length) showJ(0);

    // units
    const units = h("section", { class: "section" },
      h("div", { class: "section-head" }, h("h2", null, t("unitsTitle")), h("a", { class: "btn sm", href: "#/lessons" }, t("allLessons"))),
      h("div", { class: "grid g3" }, ACAD.units.map((u) => {
        const pr = App.progress(u.id);
        return h("a", { class: "card hover unit-card", href: "#/unit/" + u.id, style: { "--uc": App.unitColor(u.id) } },
          h("div", { class: "row", style: { justifyContent: "space-between" } }, h("span", { style: { fontSize: "28px" } }, u.icon), h("span", { class: "chip" }, t("pShort") + " " + u.pages)),
          h("h3", { style: { marginTop: "8px" } }, tr(u.title)), h("p", { class: "muted", style: { fontSize: "14.5px" } }, tr(u.lead)),
          h("div", { class: "bar", style: { "--uc": App.unitColor(u.id) } }, h("i", { style: { width: pr.pct + "%" } })),
          h("div", { class: "meta" }, h("span", { class: "chip" }, App.num(pr.total) + " " + t("lessonsWord")), h("span", { class: "chip" }, App.num(pr.done) + " " + t("doneWord"))));
      })));

    // feature tiles
    const tiles = [["#/scenes", "🎬", "interactiveLessons", "tileScenes"], ["#/labs", "🧪", "labs", "tileLabs"], ["#/prompts", "⚡", "promptLib", "tilePrompts"], ["#/graph", "🕸️", "knowledgeMap", "tileGraph"], ["#/compare", "⚖️", "comparisons", "tileCompare"], ["#/quiz", "🏆", "tests", "tileQuiz"], ["#/glossary", "🔤", "glossary", "tileGlossary"], ["#/present/" + (ACAD.lessons[0] || {}).id, "🎤", "presenterMode", "tilePresent"]];
    const feat = h("section", { class: "section" },
      h("div", { class: "section-head" }, h("h2", null, t("exploreTitle"))),
      h("div", { class: "grid g4" }, tiles.map(([href, ico, k, d]) => h("a", { class: "card hover", href }, h("div", { class: "card-ico", style: { fontSize: "22px" } }, ico), h("h3", null, t(k)), h("p", { class: "muted", style: { margin: 0, fontSize: "14px" } }, t(d))))));

    const legend = h("section", { class: "section" },
      h("div", { class: "card soft" }, h("h3", null, t("honestyTitle")),
        h("div", { class: "row", style: { margin: "8px 0" } }, App.srcBadge("book", []), h("span", { class: "muted" }, t("fromBookTip"))),
        h("div", { class: "row", style: { margin: "8px 0" } }, App.srcBadge("add"), h("span", { class: "muted" }, t("addTip"))),
        h("div", { class: "row", style: { margin: "8px 0" } }, App.srcBadge("sim"), h("span", { class: "muted" }, t("simTip")))));

    return h("div", { class: "wrap" }, hero, journey, loop, units, feat, legend);
  });

  /* ---------- BOOK MAP ---------- */
  App.route(/^#\/map$/, () => h("div", { class: "wrap" },
    h("div", { class: "eyebrow" }, t("bookMap")), h("h1", null, t("mapTitle")), h("p", { class: "lead" }, t("mapLead")),
    h("div", { class: "row", style: { margin: "14px 0 24px" } }, h("a", { class: "btn", href: "#/graph" }, App.icon("graph", 18), t("knowledgeMap")), h("a", { class: "btn", href: "#/path" }, App.icon("path", 18), t("learningPath")), h("a", { class: "btn", href: "#/coverage" }, App.icon("check", 18), t("coverage"))),
    ACAD.units.map((u) => h("section", { class: "section" },
      h("div", { class: "section-head" }, h("h2", null, u.icon + " " + tr(u.title)), h("span", { class: "chip" }, t("pages") + " " + u.pages)),
      h("p", { class: "muted" }, tr(u.lead)),
      h("div", { class: "grid g3" }, App.unitLessons(u.id).map((l, i) => {
        const s = App.lessonState(l.id);
        return h("a", { class: "card hover", href: "#/lesson/" + l.id, style: { borderTop: "4px solid " + App.unitColor(u.id) } },
          h("div", { class: "row", style: { justifyContent: "space-between" } }, h("span", { style: { fontSize: "22px" } }, l.icon), h("span", { class: "row", style: { gap: "4px" } }, ...App.pageLinks(l.pages).slice(0, 3))),
          h("h3", { style: { marginTop: "6px", fontSize: "16.5px" } }, App.num(i + 1) + ". " + tr(l.title)),
          h("p", { class: "muted", style: { fontSize: "14px", margin: "0 0 8px" } }, tr(l.hook)),
          h("div", { class: "row", style: { gap: "6px" } }, l.scene ? h("span", { class: "chip" }, "🎬") : null, l.lab ? h("span", { class: "chip" }, "🧪") : null, (l.prompts || []).length ? h("span", { class: "chip" }, "⚡ " + App.num(l.prompts.length)) : null, s.done ? h("span", { class: "badge ok" }, "✓ " + t("done")) : null));
      }))))));

  /* ---------- UNIT ---------- */
  App.route(/^#\/unit\/([\w-]+)$/, (id) => {
    const u = App.unit(id); if (!u) return null;
    const ls = App.unitLessons(id); const pr = App.progress(id);
    const quiz = ACAD.quizzes.find((q) => q.unit === id);
    return h("div", { class: "wrap", style: { "--uc": App.unitColor(id) } },
      h("div", { class: "crumbs" }, h("a", { href: "#/" }, t("home")), "›", h("a", { href: "#/map" }, t("bookMap")), "›", h("span", null, tr(u.short))),
      h("header", { class: "lesson-head" },
        h("div", { class: "row" }, h("span", { class: "chip" }, u.icon + " " + t("unit") + " " + App.num(ACAD.units.indexOf(u))), h("span", { class: "chip" }, t("pages") + " " + u.pages), App.srcBadge("book", [])),
        h("h1", { style: { marginTop: "10px" } }, tr(u.title)), h("p", { class: "lead" }, tr(u.lead)),
        h("div", { class: "row", style: { marginTop: "12px" } }, h("a", { class: "btn primary", href: "#/lesson/" + (ls.find((l) => !App.lessonState(l.id).done) || ls[0]).id }, pr.done ? t("continueUnit") : t("startUnit")), quiz ? h("a", { class: "btn", href: "#/quiz/" + quiz.id }, "🏆 " + t("unitQuiz")) : null, h("a", { class: "btn", href: "#/review?u=" + id }, "⚡ " + t("quickReview")))),
      u.summary ? h("section", { class: "section" }, h("div", { class: "card" }, h("div", { class: "row" }, h("h3", { style: { margin: 0 } }, t("unitBig")), App.srcBadge("book", [])), h("div", { class: "prose", html: App.mdLoc(u.summary) }))) : null,
      u.case ? h("section", { class: "section" }, App.caseCard(ACAD.cases.find((c) => c.id === u.case))) : null,
      h("section", { class: "section" },
        h("div", { class: "section-head" }, h("h2", null, t("lessonsInUnit")), h("span", { class: "chip" }, App.frac(pr.done, pr.total))),
        h("div", { class: "grid", style: { gap: "10px" } }, ls.map((l, i) => {
          const s = App.lessonState(l.id);
          return h("a", { class: "card hover", href: "#/lesson/" + l.id, style: { display: "grid", gridTemplateColumns: "48px minmax(0,1fr) auto", gap: "14px", alignItems: "center", padding: "14px 18px" } },
            h("span", { style: { fontSize: "26px", textAlign: "center" } }, l.icon),
            h("span", null, h("b", { style: { fontSize: "16px" } }, App.num(i + 1) + ". " + tr(l.title)), h("div", { class: "muted", style: { fontSize: "14px" } }, tr(l.hook))),
            h("span", { class: "row", style: { gap: "6px" } }, ...App.pageLinks(l.pages).slice(0, 2), s.done ? h("span", { class: "badge ok" }, "✓") : h("span", { class: "chip" }, App.num(l.mins || 8) + " " + t("min"))));
        }))));
  });

  /* ---------- case card ---------- */
  App.caseCard = (c) => {
    if (!c) return null;
    const rows = [["problem", "🧩"], ["traditional", "🐢"], ["ai", "💡"], ["steps", "🛠️"], ["result", "📈"], ["risks", "⚠️"]];
    return h("article", { class: "card", id: "c-" + c.id },
      h("div", { class: "row" }, h("span", { style: { fontSize: "26px" } }, c.icon || "💼"), h("h3", { style: { margin: 0 } }, tr(c.title)), h("span", { class: "spacer" }), App.srcBadge(c.src || "add", c.pages), c.sector ? h("span", { class: "chip" }, t("sector_" + c.sector)) : null),
      h("div", { class: "grid g2", style: { marginTop: "12px" } }, rows.map(([k, ico]) => c[k] ? h("div", { class: "card soft", style: { padding: "12px 14px" } }, h("b", null, ico + " " + t("case_" + k)), h("div", { class: "prose", style: { fontSize: "15px" }, html: App.mdLoc(c[k]) })) : null)),
      c.numbersNote !== false ? h("p", { class: "muted", style: { fontSize: "12.5px", marginTop: "10px" } }, "ℹ️ " + t("hypoNumbers")) : null,
      c.lesson ? h("a", { class: "btn sm", href: "#/lesson/" + c.lesson }, "📘 " + t("conceptExplained") + ": " + tr((App.lesson(c.lesson) || {}).title)) : null);
  };

  /* ---------- LESSON ---------- */
  const LEVELS = [["simple", "🌱"], ["mech", "🔍"], ["practice", "🛠️"], ["adv", "🧠"]];
  const CARD_KEYS = [["what", "❓"], ["why", "🎯"], ["how", "⚙️"], ["inside", "🔬"], ["relation", "🔗"], ["example", "🏭"], ["apply", "✋"], ["mistakes", "⚠️"], ["check", "✅"], ["next", "➡️"]];
  App.route(/^#\/lesson\/([\w-]+)(?:\?.*)?$/, (id) => {
    const l = App.lesson(id); if (!l) return null;
    const u = App.unit(l.unit); const order = App.ordered(); const idx = order.indexOf(l);
    const prev = order[idx - 1], next = order[idx + 1];
    App.markSeen(id);
    const st = App.lessonState(id);
    const doneBtn = h("button", { class: "btn sm", onclick: () => { const on = !App.lessonState(id).done; App.markDone(id, on); doneBtn.lastChild.textContent = on ? t("doneMarked") : t("markDone"); App.toast(on ? t("lessonDone") : t("lessonUndone")); } }, App.icon("check", 16), h("span", null, st.done ? t("doneMarked") : t("markDone")));
    const bmBtn = h("button", { class: "btn sm", "aria-pressed": String(App.isBookmarked("lesson", id)), onclick: () => { const on = App.toggleBookmark("lesson", id); bmBtn.setAttribute("aria-pressed", String(on)); App.toast(on ? t("bookmarked") : t("removed")); } }, App.icon("bookmark", 16), h("span", null, t("bookmark")));
    const head = h("header", { class: "lesson-head", style: { "--uc": App.unitColor(l.unit) } },
      h("div", { class: "row" }, h("a", { class: "chip", href: "#/unit/" + u.id, style: { textDecoration: "none" } }, u.icon + " " + tr(u.short)), h("span", { class: "chip" }, "⏱ " + App.num(l.mins || 8) + " " + t("min")), h("span", { class: "chip" }, "📶 " + t("diff_" + (l.diff || 1))), ...App.pageLinks(l.pages)),
      h("h1", { style: { marginTop: "12px" } }, l.icon + " " + tr(l.title)),
      h("p", { class: "lead" }, tr(l.hook)),
      h("div", { class: "row", style: { marginTop: "12px" } }, doneBtn, bmBtn, h("a", { class: "btn sm", href: "#/present/" + id }, App.icon("screen", 16), t("presenterMode")), h("a", { class: "btn sm", href: "#/page/" + (l.pages || [1])[0] }, App.icon("pages", 16), t("openSourcePage"))));

    const sections = [];
    // 1. book
    if (l.book) sections.push(["s-book", "📖", t("bookSays"), App.section("s-book", "📖", t("bookSays"), App.srcBadge("book", l.pages), h("div", { class: "card prose", html: App.mdLoc(l.book) }))]);
    // 2. levels
    if (l.levels) {
      let cur = App.state.level || "simple"; if (!l.levels[cur]) cur = "simple";
      const panel = h("div", { class: "card prose level-panel", role: "tabpanel", id: "lvl-panel-" + id });
      const tabs = h("div", { class: "levels", role: "tablist", "aria-label": t("explainLevel") });
      const drawLv = () => {
        tabs.replaceChildren(...LEVELS.filter(([k]) => l.levels[k]).map(([k, ico]) => h("button", { role: "tab", id: "tab-" + k, "aria-selected": String(k === cur), "aria-controls": panel.id, tabindex: k === cur ? "0" : "-1", onclick: () => { cur = k; drawLv(); },
          onkeydown: (e) => { const ks = LEVELS.map((x) => x[0]).filter((x) => l.levels[x]); const i = ks.indexOf(cur); const fwd = App.isAr() ? "ArrowLeft" : "ArrowRight", back = App.isAr() ? "ArrowRight" : "ArrowLeft"; if (e.key === fwd || e.key === back) { e.preventDefault(); cur = ks[(i + (e.key === fwd ? 1 : -1) + ks.length) % ks.length]; drawLv(); tabs.querySelector("[aria-selected=true]").focus(); } } }, ico, " ", t("lv_" + k))));
        panel.setAttribute("aria-labelledby", "tab-" + cur);
        panel.innerHTML = h("div", { class: "muted", style: { fontSize: "13.5px", marginBottom: "8px" } }, t("lvd_" + cur)).outerHTML + App.mdLoc(l.levels[cur]);
        panel.classList.remove("level-panel"); void panel.offsetWidth; panel.classList.add("level-panel");
      };
      drawLv();
      const onLevel = () => { cur = l.levels[App.state.level] ? App.state.level : cur; drawLv(); };
      App.onLeave(App.on("level", onLevel));
      sections.push(["s-levels", "🪜", t("explainLevels"), App.section("s-levels", "🪜", t("explainLevels"), App.srcBadge("add"), h("p", { class: "muted" }, t("levelsLead")), tabs, panel)]);
    }
    // 3. scene(s)
    const scenes = [].concat(l.scene || []);
    if (scenes.length) sections.push(["s-scene", "🎬", t("seeIt"), App.section("s-scene", "🎬", t("seeIt"), null, h("p", { class: "muted" }, t("sceneLead")), ...scenes.map((s) => h("div", { style: { marginBottom: "16px" } }, App.mountScene(s))))]);
    // 4. lab
    const labs = [].concat(l.lab || []);
    if (labs.length) sections.push(["s-lab", "🧪", t("tryIt"), App.section("s-lab", "🧪", t("tryIt"), App.srcBadge("sim"), ...labs.map((x) => h("div", { style: { marginBottom: "16px" } }, App.mountLab(x))))]);
    // 5. concept card
    if (l.card) sections.push(["s-card", "🧠", t("conceptCard"), App.section("s-card", "🧠", t("conceptCard"), App.srcBadge("add"), h("p", { class: "muted" }, t("cardLead")),
      h("div", { class: "qcard" }, CARD_KEYS.filter(([k]) => l.card[k]).map(([k, ico]) => h("div", { class: "q" }, h("b", null, ico + " " + t("cq_" + k)), h("p", { html: App.inline(tr(l.card[k])) })))))]);
    // 6. case
    const lc = ACAD.cases.find((c) => c.lesson === id);
    if (lc) sections.push(["s-case", "💼", t("realCase"), App.section("s-case", "💼", t("realCase"), null, App.caseCard(lc))]);
    // 7. prompts
    const ps = (l.prompts || []).map(App.prompt).filter(Boolean);
    if (ps.length) sections.push(["s-prompts", "⚡", t("promptsHere"), App.section("s-prompts", "⚡", t("promptsHere"), h("a", { class: "chip", href: "#/prompts?l=" + id }, App.num(ps.length) + " " + t("prompt")), h("div", { class: "grid", style: { gap: "10px" } }, ps.map((p, i) => App.promptCard(p, { open: i === 0, noLesson: true }))))]);
    // 8. quick check
    if (l.quick && l.quick.length) {
      let right = 0, answered = 0;
      const res = h("div", { "aria-live": "polite" });
      const qs = l.quick.map((q, i) => App.question(q, (ok) => {
        answered++; if (ok) right++;
        if (answered === l.quick.length) {
          (App.state.lessons[id] = App.state.lessons[id] || {}).quick = { right, total: answered, ts: Date.now() };
          if (right === answered) { App.markDone(id, true); doneBtn.lastChild.textContent = t("doneMarked"); }
          App.save();
          res.replaceChildren(h("div", { class: "verdict " + (right === answered ? "ok" : "warn") }, h("big", null, right === answered ? "🎉 " + t("understoodIt") : "🔁 " + t("almost")), right === answered ? t("lessonAutoDone") : t("reviewLevels"), " ", next ? h("a", { href: "#/lesson/" + next.id }, t("nextLesson") + ": " + tr(next.title)) : null));
        }
      }, { num: i + 1, inLesson: true }));
      sections.push(["s-check", "✅", t("checkUnderstanding"), App.section("s-check", "✅", t("checkUnderstanding"), null, ...qs, res)]);
    }
    // 9. key points + relations
    const rel = (l.related || []).map(App.lesson).filter(Boolean); const req = (l.req || []).map(App.lesson).filter(Boolean);
    sections.push(["s-keys", "✦", t("keyPoints"), App.section("s-keys", "✦", t("keyPoints"), null,
      l.keys ? h("ul", { class: "keypoints" }, tr(l.keys).map((k) => h("li", { html: App.inline(k) }))) : null,
      req.length ? h("div", { style: { marginTop: "16px" } }, h("h4", null, "⬅️ " + t("buildsOn")), h("div", { class: "related" }, req.map((r) => h("a", { class: "chip", href: "#/lesson/" + r.id }, r.icon + " " + tr(r.title))))) : null,
      rel.length ? h("div", { style: { marginTop: "12px" } }, h("h4", null, "🔗 " + t("relatedConcepts")), h("div", { class: "related" }, rel.map((r) => h("a", { class: "chip", href: "#/lesson/" + r.id }, r.icon + " " + tr(r.title))))) : null,
      (l.terms || []).length ? h("div", { style: { marginTop: "12px" } }, h("h4", null, "🔤 " + t("termsHere")), h("div", { class: "related" }, l.terms.map(App.term).filter(Boolean).map((g) => h("button", { class: "chip term", "data-term": g.id, style: { borderBottom: "1px solid var(--line)" } }, tr(g.term))))) : null)]);
    // 10. notes
    const ta = h("textarea", { id: "note-" + id, placeholder: t("notePh"), "aria-label": t("myNotes") });
    ta.value = App.state.notes[id] || "";
    const ss = h("span", { class: "save-state", "aria-live": "polite" });
    ta.addEventListener("input", App.debounce(() => { App.state.notes[id] = ta.value; App.save(); ss.textContent = "✓ " + t("savedLocally"); App.emit("bookmarks"); }, 400));
    sections.push(["s-notes", "📝", t("myNotes"), App.section("s-notes", "📝", t("myNotes"), ss, h("div", { class: "note-box" }, ta))]);

    const toc = h("nav", { class: "toc", "aria-label": t("inThisLesson") }, h("div", { class: "card" }, h("b", { style: { display: "block", marginBottom: "8px" } }, t("inThisLesson")), sections.map(([sid, ico, title]) => h("a", { href: "#/lesson/" + id + "?s=" + sid, "data-s": sid, onclick: (e) => { e.preventDefault(); document.getElementById(sid).scrollIntoView({ behavior: App.reduced() ? "auto" : "smooth" }); } }, ico + " " + title))));
    const content = h("div", null, sections.map((s) => s[3]),
      h("div", { class: "pager" },
        prev ? h("a", { href: "#/lesson/" + prev.id, class: "prev" }, h("small", null, (App.isAr() ? "→ " : "← ") + t("prevLesson")), h("b", null, tr(prev.title))) : h("span"),
        next ? h("a", { href: "#/lesson/" + next.id, class: "next" }, h("small", null, t("nextLesson") + (App.isAr() ? " ←" : " →")), h("b", null, tr(next.title))) : h("a", { href: "#/quiz", class: "next" }, h("small", null, t("finish")), h("b", null, t("finalExam")))));
    // scroll-spy for toc
    setTimeout(() => {
      if (!("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) toc.querySelectorAll("a").forEach((a) => a.classList.toggle("on", a.dataset.s === en.target.id)); }), { rootMargin: "-30% 0px -60% 0px" });
      sections.forEach(([sid]) => { const el = document.getElementById(sid); el && io.observe(el); }); App.onLeave(() => io.disconnect());
    }, 0);
    return h("div", { class: "wrap" },
      h("div", { class: "crumbs" }, h("a", { href: "#/" }, t("home")), "›", h("a", { href: "#/unit/" + u.id }, tr(u.short)), "›", h("span", null, tr(l.title))),
      head, h("div", { class: "layout-lesson" }, content, toc));
  });

  /* ---------- LESSON CATALOG with filters ---------- */
  App.route(/^#\/lessons(?:\?.*)?$/, () => {
    const f = { unit: "", tag: "", diff: "", type: "", status: "", q: "" };
    const list = h("div", { class: "grid g3" });
    const count = h("span", { class: "chip" });
    const tags = [...new Set(ACAD.lessons.flatMap((l) => l.tags || []))];
    const draw = () => {
      const qn = App.norm(f.q);
      const ls = App.ordered().filter((l) => (!f.unit || l.unit === f.unit) && (!f.tag || (l.tags || []).includes(f.tag)) && (!f.diff || String(l.diff || 1) === f.diff) &&
        (!f.type || (f.type === "scene" && l.scene) || (f.type === "lab" && l.lab) || (f.type === "prompts" && (l.prompts || []).length) || (f.type === "case" && ACAD.cases.some((c) => c.lesson === l.id))) &&
        (!f.status || (f.status === "done" ? App.lessonState(l.id).done : !App.lessonState(l.id).done)) &&
        (!qn || App.norm(App.strip(l.title) + " " + App.strip(l.hook)).includes(qn)));
      count.textContent = App.num(ls.length) + " " + t("lessonsWord");
      list.replaceChildren(...(ls.length ? ls.map((l) => h("a", { class: "card hover", href: "#/lesson/" + l.id, style: { borderTop: "4px solid " + App.unitColor(l.unit) } },
        h("div", { class: "row", style: { justifyContent: "space-between" } }, h("span", { style: { fontSize: "22px" } }, l.icon), h("span", { class: "chip" }, tr(App.unit(l.unit).short))),
        h("h3", { style: { fontSize: "16.5px", marginTop: "6px" } }, tr(l.title)), h("p", { class: "muted", style: { fontSize: "14px" } }, tr(l.hook)),
        h("div", { class: "row", style: { gap: "6px" } }, h("span", { class: "chip" }, t("diff_" + (l.diff || 1))), l.scene ? h("span", { class: "chip" }, "🎬") : null, l.lab ? h("span", { class: "chip" }, "🧪") : null, App.lessonState(l.id).done ? h("span", { class: "badge ok" }, "✓") : null)))
        : [h("div", { class: "empty", style: { gridColumn: "1/-1" } }, h("div", { class: "big" }, "🔎"), t("noMatch"), h("div", null, h("button", { class: "btn sm", onclick: () => { Object.keys(f).forEach((k) => (f[k] = "")); App.render(); } }, t("clearFilters"))))]));
    };
    const sel = (key, label, options) => h("select", { "aria-label": label, onchange: (e) => { f[key] = e.target.value; draw(); } }, h("option", { value: "" }, label + ": " + t("all")), options.map(([v, l]) => h("option", { value: v }, l)));
    const view = h("div", { class: "wrap" },
      h("div", { class: "eyebrow" }, t("allLessons")), h("h1", null, t("catalogTitle")), h("p", { class: "lead" }, t("catalogLead")),
      h("div", { class: "filters" },
        h("input", { type: "search", placeholder: t("filterPh"), "aria-label": t("filterPh"), oninput: App.debounce((e) => { f.q = e.target.value; draw(); }, 120) }),
        sel("unit", t("unit"), ACAD.units.map((u) => [u.id, tr(u.short)])),
        sel("tag", t("topic"), tags.map((x) => [x, t("tag_" + x)])),
        sel("diff", t("difficulty"), [["1", t("diff_1")], ["2", t("diff_2")], ["3", t("diff_3")]]),
        sel("type", t("contentType"), [["scene", "🎬 " + t("hasScene")], ["lab", "🧪 " + t("hasLab")], ["prompts", "⚡ " + t("hasPrompts")], ["case", "💼 " + t("hasCase")]]),
        sel("status", t("status"), [["done", t("done")], ["todo", t("notDone")]]), count),
      list);
    draw();
    return view;
  });
})();
