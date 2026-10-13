/* Tests: hub, unit quizzes, final exam (sampled across units), diagnostic results with review suggestions,
   and the guided final project (saved locally, exportable). */
"use strict";
(function () {
  const App = ACAD.App; const { h, t, tr } = App;

  App.route(/^#\/quiz$/, () => {
    const card = (qz) => { const s = App.state.quizzes[qz.id] || {};
      return h("a", { class: "card hover", href: "#/quiz/" + qz.id, style: qz.unit ? { borderTop: "4px solid " + App.unitColor(qz.unit) } : null },
        h("div", { class: "row", style: { justifyContent: "space-between" } }, h("span", { style: { fontSize: "26px" } }, qz.icon || "🏆"), s.best != null ? h("span", { class: "badge " + (s.best >= 70 ? "ok" : "sim") }, t("best") + " " + App.pct(s.best)) : h("span", { class: "chip" }, t("notTaken"))),
        h("h3", { style: { marginTop: "8px" } }, tr(qz.title)), h("p", { class: "muted", style: { fontSize: "14px" } }, tr(qz.lead)), h("span", { class: "chip" }, App.num(qz.size || qz.questions.length) + " " + t("questionsWord"))); };
    return h("div", { class: "wrap" }, h("div", { class: "eyebrow" }, t("tests")), h("h1", null, t("quizHubTitle")), h("p", { class: "lead" }, t("quizHubLead")),
      h("div", { class: "grid g3" }, ACAD.quizzes.map(card)),
      h("section", { class: "section" }, h("a", { class: "card hover", href: "#/project", style: { display: "flex", gap: "16px", alignItems: "center", background: "linear-gradient(135deg,var(--navy),var(--navy-2))", color: "#fff" } },
        h("span", { style: { fontSize: "40px" } }, "🚀"), h("span", null, h("h3", { style: { color: "#fff", margin: 0 } }, t("projectTitle")), h("span", { style: { color: "#c8d6f5" } }, t("projectLead"))))));
  });

  function sample(arr, n, seed) { const a = arr.slice(); let s = seed; for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); }

  App.route(/^#\/quiz\/([\w-]+)$/, (id) => {
    const qz = ACAD.quizzes.find((q) => q.id === id); if (!qz) return null;
    let questions = qz.questions;
    if (qz.final) { // final exam: sample from every unit quiz + lesson quick checks
      const pool = ACAD.quizzes.filter((q) => !q.final).flatMap((q) => q.questions);
      questions = sample(pool, qz.size || 20, Date.now() % 100000);
    }
    let right = 0, answered = 0; const wrong = [];
    const result = h("div", { "aria-live": "polite" });
    const finish = () => {
      const score = Math.round((right / questions.length) * 100);
      const st = App.state.quizzes[id] || (App.state.quizzes[id] = { attempts: [] });
      st.attempts = (st.attempts || []).concat({ ts: Date.now(), score, right, total: questions.length }).slice(-10);
      st.best = Math.max(st.best || 0, score); st.last = score; st.weak = [...new Set(wrong.map((q) => q.lesson).filter(Boolean))];
      App.save();
      const r = 52, c = 2 * Math.PI * r;
      result.replaceChildren(h("div", { class: "card", style: { textAlign: "center", marginTop: "20px" } },
        h("div", { class: "score-ring", html: `<svg width="150" height="150" viewBox="0 0 120 120" aria-hidden="true" style="transform:rotate(-90deg)"><circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--surface-3)" stroke-width="10"/><circle cx="60" cy="60" r="${r}" fill="none" stroke="${score >= 70 ? "var(--ok)" : "var(--amber)"}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c - (c * score) / 100}"/></svg><b>${App.num(score)}${App.isAr() ? "٪" : "%"}</b>` }),
        h("h2", null, score >= 90 ? t("scoreExcellent") : score >= 70 ? t("scorePass") : t("scoreRetry")),
        h("p", { class: "muted" }, App.num(right) + " / " + App.num(questions.length) + " · " + t("passMark")),
        wrong.length ? h("div", { style: { textAlign: "start", marginTop: "14px" } }, h("h3", null, "🔁 " + t("reviewPlan")),
          h("div", { class: "grid", style: { gap: "8px" } }, [...new Set(wrong.map((q) => q.lesson).filter(Boolean))].map(App.lesson).filter(Boolean).map((l) => { const qs = wrong.filter((q) => q.lesson === l.id);
            return h("a", { class: "card hover", href: "#/lesson/" + l.id, style: { padding: "10px 14px" } }, h("b", null, l.icon + " " + tr(l.title)), h("div", { class: "muted", style: { fontSize: "13.5px" } }, qs.map((q) => "• " + tr(q.q)).join("  "))); }))) : h("p", null, "🌟 " + t("noMistakes")),
        h("div", { class: "row", style: { justifyContent: "center", marginTop: "16px" } }, h("button", { class: "btn primary", onclick: () => App.render() }, App.icon("replay", 18), t("retake")), h("a", { class: "btn", href: "#/path" }, App.icon("path", 18), t("learningPath")))));
      result.scrollIntoView({ behavior: App.reduced() ? "auto" : "smooth", block: "start" });
    };
    const progress = h("div", { class: "bar", style: { position: "sticky", top: "calc(var(--appbar) + 6px)", zIndex: 2, marginBottom: "14px" } }, h("i", { style: { width: "0%" } }));
    const qs = questions.map((q, i) => App.question(q, (ok) => { answered++; if (ok) right++; else wrong.push(q); progress.firstChild.style.width = (answered / questions.length) * 100 + "%"; if (answered === questions.length) finish(); }, { num: i + 1 }));
    return h("div", { class: "narrow" }, h("div", { class: "crumbs" }, h("a", { href: "#/" }, t("home")), "›", h("a", { href: "#/quiz" }, t("tests")), "›", h("span", null, tr(qz.title))),
      h("h1", null, (qz.icon || "🏆") + " " + tr(qz.title)), h("p", { class: "lead" }, tr(qz.lead)),
      h("div", { class: "callout" }, "ℹ️ ", t("quizHowTo")), progress, ...qs, result);
  });

  /* ---------- FINAL PROJECT: a guided builder that turns one real repetitive task into a plan + prompt chain ---------- */
  App.route(/^#\/project$/, () => {
    const P = App.state.project || (App.state.project = {});
    const save = App.debounce(() => { App.save(); stateEl.textContent = "✓ " + t("savedLocally"); }, 300);
    const stateEl = h("span", { class: "save-state", "aria-live": "polite" });
    const fld = (key, label, hint, rows) => h("div", { class: "field" }, h("label", { for: "pj-" + key }, label), h(rows ? "textarea" : "input", { id: "pj-" + key, type: "text", value: rows ? null : P[key] || "", placeholder: hint, oninput: (e) => { P[key] = e.target.value; save(); draw(); } }, rows ? P[key] || "" : null), h("small", null, hint));
    const out = h("div");
    const checks = ACAD.projectChecks || [];
    const draw = () => {
      const filled = ["task", "inputs", "rules", "output", "tests"].filter((k) => P[k] && P[k].trim()).length;
      const freq = +P.freq || 0, mins = +P.mins || 0;
      const yearlyH = Math.round((freq * mins * 52) / 60);
      let level = P.level || "auto";
      if (level === "auto") level = !P.data ? "prompt" : P.many ? "system" : "tool";
      const chain = (ACAD.projectChains[level] || []).map(App.prompt).filter(Boolean);
      out.replaceChildren(
        h("div", { class: "kpis" },
          h("div", { class: "kpi" + (filled === 5 ? " ok" : "") }, h("small", null, t("specComplete")), h("b", null, App.num(filled) + "/٥".replace("٥", App.isAr() ? "٥" : "5"))),
          h("div", { class: "kpi" }, h("small", null, t("hoursPerYear")), h("b", null, App.num(yearlyH))),
          h("div", { class: "kpi" + (P.done && Object.values(P.done).filter(Boolean).length === checks.length ? " ok" : "") }, h("small", null, t("checklistDone")), h("b", null, App.num(Object.values(P.done || {}).filter(Boolean).length) + "/" + App.num(checks.length)))),
        filled < 5 ? h("div", { class: "callout warn" }, "🧩 ", t("specMissing")) : h("div", { class: "callout tip" }, "✅ ", t("specReady")),
        h("h3", null, "🔗 " + t("yourChain") + " — " + t("plevel_" + level)),
        h("p", { class: "muted" }, t("chainLead")),
        h("div", { class: "grid", style: { gap: "8px" } }, chain.map((p, i) => h("div", { class: "card soft", style: { padding: "12px 14px" } }, h("b", null, App.num(i + 1) + ". " + tr(p.title)), h("div", { class: "row", style: { marginTop: "6px" } }, h("a", { class: "btn sm", href: "#/prompts/" + p.id }, t("open")), h("button", { class: "btn sm primary", onclick: () => App.copy(App.fillPrompt(tr(p.text), { "صف الخطوات بالتفصيل": P.rules || "", "صف المهمة": P.task || "", "describe the steps in detail": P.rules || "", "describe the task": P.task || "" })) }, App.icon("copy", 14), t("copy")))))),
        h("h3", { style: { marginTop: "18px" } }, "☑️ " + t("acceptance")),
        h("div", null, checks.map((c, i) => h("label", { class: "check" }, h("input", { type: "checkbox", checked: !!(P.done || {})[i], onchange: (e) => { (P.done = P.done || {})[i] = e.target.checked; save(); draw(); } }), h("span", null, tr(c.t), " ", App.pageLinks(c.pages))))),
        h("div", { class: "row", style: { marginTop: "14px" } }, h("button", { class: "btn", onclick: () => { const md = "# " + t("projectTitle") + "\n\n" + ["task", "inputs", "rules", "output", "tests"].map((k) => "## " + t("pj_" + k) + "\n" + (P[k] || "—")).join("\n\n") + "\n\n" + t("hoursPerYear") + ": " + yearlyH; const a = h("a", { href: URL.createObjectURL(new Blob([md], { type: "text/markdown" })), download: "final-project.md" }); document.body.append(a); a.click(); a.remove(); } }, App.icon("download", 18), t("exportProject"))));
    };
    draw();
    return h("div", { class: "wrap" }, h("div", { class: "crumbs" }, h("a", { href: "#/" }, t("home")), "›", h("a", { href: "#/quiz" }, t("tests")), "›", h("span", null, t("projectTitle"))),
      h("h1", null, "🚀 " + t("projectTitle")), h("p", { class: "lead" }, t("projectIntro")), h("div", { class: "row" }, App.srcBadge("book", [14, 15, 17, 22, 23, 31, 40]), stateEl),
      h("div", { class: "lab", style: { marginTop: "16px" } }, h("div", { class: "lab-body" },
        h("div", { class: "lab-in" },
          h("h3", null, "1️⃣ " + t("pjSpec")),
          fld("task", t("pj_task"), t("pjh_task"), true), fld("inputs", t("pj_inputs"), t("pjh_inputs"), true), fld("rules", t("pj_rules"), t("pjh_rules"), true), fld("output", t("pj_output"), t("pjh_output"), true), fld("tests", t("pj_tests"), t("pjh_tests"), true),
          h("h3", null, "2️⃣ " + t("pjSize")),
          h("div", { class: "grid g2" }, fld("freq", t("pj_freq"), t("pjh_freq")), fld("mins", t("pj_mins"), t("pjh_mins"))),
          h("label", { class: "check" }, h("input", { type: "checkbox", checked: !!P.data, onchange: (e) => { P.data = e.target.checked; save(); draw(); } }), t("pj_data")),
          h("label", { class: "check" }, h("input", { type: "checkbox", checked: !!P.many, onchange: (e) => { P.many = e.target.checked; save(); draw(); } }), t("pj_many")),
          h("div", { class: "field" }, h("label", { for: "pj-level" }, t("pj_level")), h("select", { id: "pj-level", onchange: (e) => { P.level = e.target.value; save(); draw(); } }, ["auto", "prompt", "tool", "app", "system"].map((v) => h("option", { value: v, selected: (P.level || "auto") === v }, t("plevel_" + v)))))),
        h("div", { class: "lab-out" }, out))));
  });
})();
