/* Learning Motion Theatre for the single-file Academy.
   Selected patterns adapted from Jakub Antalik's transitions.dev:
   08 page-side-by-side, 16 sliding tabs, 18 text reveal, 10 success-check.
   Permission: https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE
   Adaptations teach actual course scenarios rather than loading or generating fake content.
   No runtime dependency, no network, no automatic playback. */
"use strict";
(function (A) {
  const doc = document;
  const esc = A.esc;
  const homeChoices = [
    { id: "p1", ar: "إزاي تطلب صح؟", en: "Ask with clarity", emoji: "💬" },
    { id: "y4", ar: "إزاي تفحص الأرقام؟", en: "Trust your numbers", emoji: "📊" },
    { id: "s1", ar: "إزاي تبني نظام؟", en: "Connect the system", emoji: "🧩" }
  ];
  const englishExamples = {
    p1: ["You ask an assistant to make a report, but receive pages of vague advice.",
      "A goal, a time period, the source data and the expected output.",
      "Specify the task, constraints, and what the finished report should contain.",
      "A focused request for the top three stoppage causes with supporting numbers.",
      "A confident-looking answer is not proof. Check the figures against the source."],
    y4: ["A dashboard shows high losses, but a duplicated row silently doubled one incident.",
      "Production logs, dates, identifiers and stoppage durations.",
      "Check duplicates, missing values, units and totals before calculating.",
      "A reliable comparison, with a clear list of issues to fix first.",
      "A beautiful chart cannot repair broken data."],
    s1: ["A purchase order is typed into purchasing, retyped in stores and retyped in finance.",
      "One approved order number and the state of each handoff.",
      "Pass verified data between the steps rather than copying it by hand.",
      "One traceable process with fewer manual transfers and errors.",
      "Several separate screens do not make a connected system."]
  };
  const captions = {
    ar: {
      label: "مختبر الفكرة المتحركة", title: "بدل ما تقرأ الفكرة… شوفها بتحصل.",
      lead: "اختار موقف من الشغل. حرّك الخطوات وشوف إزاي المشكلة بتتحوّل لنتيجة. مش فيديو، إنت اللي بتقود التجربة.",
      choose: "اختار قصة نبدأ بيها", steps: ["المشكلة", "معاك إيه؟", "إيه اللي بيحصل؟", "النتيجة", "خد بالك"],
      kicker: "تجربة تعليمية، مش بيانات حقيقية", next: "الخطوة الجاية", prev: "اللي فات",
      play: "شغّل القصة", pause: "وقّف", replay: "اعرض من الأول",
      open: "افتح الدرس كامل", quiet: "قلّل الحركة", motion: "فعّل الحركة",
      learn: "الدرس كامل فيه شرح أبسط، رسم متحرك، وتجربة بإيدك.",
      lessonHint: "اضغط على أي محطة علشان تشوف اللي بيحصل فيها.", progress: "المحطة",
      final: "وصلنا للنهاية. جرّب قصة تانية، أو افتح الدرس.",
      unit: "الخطوات قدامك"
    },
    en: {
      label: "Motion learning studio", title: "Don't just read the idea. Watch it unfold.",
      lead: "Choose a workplace challenge and explore the steps yourself. This is a guided, interactive explanation, not a video.",
      choose: "Pick a scenario", steps: ["The problem", "What you have", "How it works", "The outcome", "Watch out"],
      kicker: "Illustrative scenario, not real company data", next: "Next step", prev: "Previous",
      play: "Play the story", pause: "Pause", replay: "Start again",
      open: "Explore the full lesson", quiet: "Reduce motion", motion: "Enable motion",
      learn: "The full lesson includes examples, visual explanations and hands-on practice.",
      lessonHint: "Pick any stage to examine what happens there.", progress: "Stage",
      final: "That's the journey. Try another scenario or open the lesson.",
      unit: "Your story, step by step"
    }
  };
  const stageIcons = ["?", "↳", "↝", "✓", "!"];
  const safeStorage = {
    get() { try { return localStorage.getItem("academy.motion") === "off"; } catch (_) { return false; } },
    set(value) { try { localStorage.setItem("academy.motion", value ? "off" : "on"); } catch (_) {} }
  };
  let motionOff = safeStorage.get();
  function isQuiet() { return motionOff || A.reduceMotion(); }
  function setMotion(off) {
    motionOff = !!off;
    safeStorage.set(motionOff);
    doc.documentElement.dataset.motion = motionOff ? "off" : "on";
  }
  setMotion(motionOff);
  function dict() { return captions[A.lang()]; }
  function story(id) {
    if (A.lang() === "en") return englishExamples[id] || englishExamples.p1;
    const data = A.lessonStories && A.lessonStories[id];
    return data ? [data[0], data[1], data[2], data[3], data[4]] : null;
  }
  function slidePill(bar, instant) {
    if (!bar || !bar.isConnected) return;
    const active = bar.querySelector('button[aria-selected="true"]');
    const pill = bar.querySelector(".t-tabs-pill");
    if (!active || !pill) return;
    if (instant || isQuiet()) pill.style.transition = "none";
    pill.style.width = active.offsetWidth + "px";
    pill.style.height = active.offsetHeight + "px";
    pill.style.transform = "translate(" + active.offsetLeft + "px," + active.offsetTop + "px)";
    if (instant || isQuiet()) {
      void pill.offsetWidth;
      pill.style.transition = "";
    }
  }
  function createTheatre(id, opts) {
    const isHome = !!opts.home;
    const lang = A.lang();
    const i18n = dict();
    const host = doc.createElement("section");
    host.className = "motion-theatre" + (isHome ? " motion-home" : " motion-lesson");
    host.setAttribute("aria-label", i18n.label);
    host.dataset.motionLesson = id;
    const choose = isHome ? '<div class="motion-choose"><p class="motion-chooser-label">' + esc(i18n.choose) +
      '</p><div class="t-tabs motion-cases" role="tablist" aria-label="' + esc(i18n.choose) +
      '"><span class="t-tabs-pill" aria-hidden="true"></span>' +
      homeChoices.map(function (c) {
        const title = c[lang];
        return '<button type="button" class="t-tab" role="tab" data-motion-case="' + c.id +
          '" aria-selected="' + (c.id === id) + '"><span aria-hidden="true">' + c.emoji +
          '</span><span>' + esc(title) + '</span></button>';
      }).join("") + '</div><p class="motion-instruction">' + esc(i18n.learn) +
      '</p><a class="motion-open" href="#lesson-' + id + '">' + esc(i18n.open) + '<span aria-hidden="true"> ↗</span></a></div>' : "";
    const hdr = isHome ? '<div class="motion-show-head t-stagger is-shown"><div class="motion-eyebrow t-stagger-line t-stagger-line--1"><span class="motion-led"></span>' +
      esc(i18n.label) + ' <span>· transitions.dev</span></div><h2 class="t-stagger-line t-stagger-line--2">' +
      esc(i18n.title) + '</h2><p class="t-stagger-line t-stagger-line--3">' + esc(i18n.lead) + '</p></div>' : "";
    host.innerHTML = hdr + '<div class="motion-studio">' + choose +
      '<div class="motion-machine" data-stage="0">' +
        '<div class="motion-topbar"><span class="motion-topdots" aria-hidden="true"><i></i><i></i><i></i></span>' +
          '<span class="motion-top-name">' + esc(i18n.label) + '</span>' +
          '<button type="button" class="motion-quiet" data-motion-quiet aria-pressed="' + isQuiet() + '">' +
          esc(isQuiet() ? i18n.motion : i18n.quiet) + '</button></div>' +
        '<div class="motion-stages" role="group" aria-label="' + esc(i18n.unit) + '">' +
           i18n.steps.map(function (name, i) {
             return '<button type="button" class="motion-node" data-motion-stage="' + i +
               '" aria-pressed="' + (i === 0) + '" aria-label="' + esc(name) + '" title="' + esc(name) +
               '"><span class="motion-node-number">' + (i + 1) + '</span><span class="motion-node-label">' +
                esc(name) + '</span></button>';
           }).join("") +
        '</div>' +
        '<div class="motion-canvas" aria-label="' + esc(i18n.label) + '">' +
          '<div class="motion-grid" aria-hidden="true"></div>' +
          '<span class="motion-orbit orbit-a" aria-hidden="true"></span><span class="motion-orbit orbit-b" aria-hidden="true"></span>' +
          '<div class="motion-canvas-meta"><span class="motion-step-index">' + esc(i18n.progress) +
            ' <b class="motion-current">01</b> / 05</span>' +
            '<span class="motion-specimen">' + esc(i18n.kicker) + '</span></div>' +
          '<div class="t-page-slide motion-pages" data-page="1" aria-live="polite" aria-atomic="true">' +
            '<div class="t-page" data-page-id="1" aria-hidden="false"><div class="motion-page-body">' +
              '<div class="motion-symbol" aria-hidden="true">?</div><div class="motion-page-copy"><strong></strong><p></p></div></div></div>' +
            '<div class="t-page" data-page-id="2" aria-hidden="true"><div class="motion-page-body">' +
              '<div class="motion-symbol" aria-hidden="true">?</div><div class="motion-page-copy"><strong></strong><p></p></div></div></div>' +
          '</div>' +
          '<div class="motion-canvas-foot"><span class="motion-live-dot" aria-hidden="true"></span>' +
            '<span class="motion-help">' + esc(i18n.lessonHint) + '</span></div>' +
        '</div>' +
        '<div class="motion-controls"><div class="motion-progress" aria-hidden="true"><span></span></div>' +
          '<div class="motion-actions"><button class="motion-action" type="button" data-motion-prev>' +
             '<span aria-hidden="true">←</span> ' + esc(i18n.prev) + '</button>' +
            '<button class="motion-action motion-main-action" type="button" data-motion-play aria-pressed="false">' +
             '<span aria-hidden="true">▶</span> ' + esc(i18n.play) + '</button>' +
            '<button class="motion-action" type="button" data-motion-next>' +
             esc(i18n.next) + ' <span aria-hidden="true">→</span></button>' +
            '<button class="motion-restart" type="button" data-motion-replay title="' +
              esc(i18n.replay) + '" aria-label="' + esc(i18n.replay) + '">↻</button>' +
          '</div>' +
        '</div>' +
      '</div></div>';
    // Animate the headline only when the home screen actually appears.
    // Mounting with .is-shown already set would skip the transition.
    const heading = host.querySelector(".motion-show-head");
    if (heading && !isQuiet()) {
      heading.classList.remove("is-shown");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (heading.isConnected) heading.classList.add("is-shown");
        });
      });
    }
    let activeLesson = id;
    let stage = 0;
    let page = 1;
    let timer = null;
    const machine = host.querySelector(".motion-machine");
    const pages = host.querySelector(".motion-pages");
    const stageButtons = Array.from(host.querySelectorAll("[data-motion-stage]"));
    const playButton = host.querySelector("[data-motion-play]");
    const quietButton = host.querySelector("[data-motion-quiet]");
    const next = host.querySelector("[data-motion-next]");
    const prev = host.querySelector("[data-motion-prev]");
    const number = host.querySelector(".motion-current");
    const trail = host.querySelector(".motion-progress span");
    const lessonLink = host.querySelector(".motion-open");
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      playButton.setAttribute("aria-pressed", "false");
      playButton.innerHTML = '<span aria-hidden="true">▶</span> ' + esc(i18n.play);
    }
    function paintPane(target, index) {
      const arr = story(activeLesson);
      const text = (arr && arr[index]) || "";
      target.querySelector(".motion-symbol").textContent = stageIcons[index];
      target.querySelector("strong").textContent = i18n.steps[index];
      target.querySelector("p").textContent = text;
    }
    function show(index, immediate) {
      index = Math.max(0, Math.min(4, index));
      const changed = stage !== index;
      stage = index;
      machine.dataset.stage = String(stage);
      stageButtons.forEach(function (btn, i) { btn.setAttribute("aria-pressed", String(stage === i)); });
      trail.style.width = ((stage + 1) * 20) + "%";
      prev.disabled = stage === 0;
      next.disabled = stage === 4;
      number.textContent = String(stage + 1).padStart(2, "0");
      if (changed && !isQuiet()) {
        number.classList.remove("motion-count-pop");
        void number.offsetWidth;
        number.classList.add("motion-count-pop");
      }
      if (immediate || !changed || isQuiet()) {
        const target = pages.querySelector('.t-page[data-page-id="' + page + '"]');
        paintPane(target, stage);
        pages.dataset.page = String(page);
      } else {
        page = page === 1 ? 2 : 1;
        const target = pages.querySelector('.t-page[data-page-id="' + page + '"]');
        const previous = pages.querySelector('.t-page[data-page-id="' + (page === 1 ? 2 : 1) + '"]');
        paintPane(target, stage);
        previous.setAttribute("aria-hidden", "true");
        target.setAttribute("aria-hidden", "false");
        pages.dataset.page = String(page);
      }
      // The section stays readable without animation, including OS reduced-motion.
      pages.querySelectorAll(".t-page").forEach(function (panel) {
        panel.setAttribute("aria-hidden", String(panel.dataset.pageId !== pages.dataset.page));
      });
      host.querySelector(".motion-help").textContent = stage === 4 ? i18n.final : i18n.lessonHint;
    }
    function play() {
      if (isQuiet()) { show(stage < 4 ? stage + 1 : 0, true); return; }
      if (timer) { stop(); return; }
      if (stage === 4) show(0, false);
      playButton.setAttribute("aria-pressed", "true");
      playButton.innerHTML = '<span aria-hidden="true">Ⅱ</span> ' + esc(i18n.pause);
      timer = setInterval(function () {
        if (!host.isConnected) { stop(); return; }
        if (stage >= 4) { stop(); return; }
        show(stage + 1, false);
        if (stage >= 4) stop();
      }, 2100);
    }
    function move(index) { stop(); show(index, false); }
    next.addEventListener("click", function () { move(stage + 1); });
    prev.addEventListener("click", function () { move(stage - 1); });
    playButton.addEventListener("click", play);
    host.querySelector("[data-motion-replay]").addEventListener("click", function () { move(0); });
    stageButtons.forEach(function (btn, i) {
      btn.addEventListener("click", function () { move(i); });
      btn.addEventListener("keydown", function (e) {
        const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!delta) return;
        e.preventDefault();
        const at = (i + (A.lang() === "ar" ? -delta : delta) + 5) % 5;
        stageButtons[at].focus();
        move(at);
      });
    });
    quietButton.addEventListener("click", function () {
      stop();
      setMotion(!motionOff);
      quietButton.setAttribute("aria-pressed", String(isQuiet()));
      quietButton.textContent = isQuiet() ? i18n.motion : i18n.quiet;
      show(stage, true);
    });
    if (isHome) {
      const tabs = host.querySelector(".motion-cases");
      Array.from(tabs.querySelectorAll("[data-motion-case]")).forEach(function (btn) {
        btn.addEventListener("click", function () {
          stop();
          activeLesson = btn.dataset.motionCase;
          host.dataset.motionLesson = activeLesson;
          Array.from(tabs.querySelectorAll("[data-motion-case]")).forEach(function (tab) {
            tab.setAttribute("aria-selected", String(tab === btn));
          });
          lessonLink.href = "#lesson-" + activeLesson;
          stage = -1;
          show(0, false);
          slidePill(tabs, false);
        });
      });
      requestAnimationFrame(function () { slidePill(tabs, true); });
      const onResize = function () { slidePill(tabs, true); };
      addEventListener("resize", onResize, { passive: true });
      A.onLeave(function () { removeEventListener("resize", onResize); stop(); });
    } else {
      A.onLeave(stop);
    }
    // Keep content and controls available to screen readers; motion is optional.
    paintPane(pages.querySelector('.t-page[data-page-id="1"]'), 0);
    show(0, true);
    return host;
  }

  function addHome() {
    const home = doc.querySelector("#main .home");
    if (!home) return;
    const anchor = home.querySelector(".showcase");
    const theatre = createTheatre("p1", { home: true });
    if (anchor) home.insertBefore(theatre, anchor);
    else home.append(theatre);
  }
  function decorateLessonTabs(instant) {
    const tabs = doc.querySelector("#lv .tabs");
    if (!tabs) return;
    tabs.classList.add("t-tabs", "motion-level-tabs");
    if (!tabs.querySelector(".t-tabs-pill")) {
      const pill = doc.createElement("span");
      pill.className = "t-tabs-pill";
      pill.setAttribute("aria-hidden", "true");
      tabs.insertBefore(pill, tabs.firstChild);
    }
    slidePill(tabs, !!instant);
  }
  function addLesson(id) {
    const mental = doc.querySelector("#main #sec-mental");
    if (!mental || !story(id)) return;
    const flow = mental.querySelector(".mental-flow");
    if (!flow) return;
    const theatre = createTheatre(id, { home: false });
    mental.insertBefore(theatre, flow);
    flow.hidden = true;
    const hint = mental.querySelector(".mental-hint");
    if (hint) hint.hidden = true;
    decorateLessonTabs(true);
    const onLevelClick = function (event) {
      if (event.target.closest('[role="tab"]')) {
        requestAnimationFrame(function () { decorateLessonTabs(false); });
      }
    };
    const root = doc.querySelector("#lv");
    root.addEventListener("click", onLevelClick);
    const onResize = function () { decorateLessonTabs(true); };
    addEventListener("resize", onResize, { passive: true });
    const onLevel = function () { requestAnimationFrame(decorateLessonTabs); };
    const unsub = A.on("level", onLevel);
    A.onLeave(function () {
      root.removeEventListener("click", onLevelClick);
      removeEventListener("resize", onResize);
      unsub();
    });
  }
  // Completion re-renders the route immediately. Capture the intention before
  // the original click handler replaces the DOM, then celebrate on the new DOM.
  let pendingSuccess = null;
  doc.addEventListener("click", function (event) {
    if (!event.target.closest || !event.target.closest("#donebtn, #donetop")) return;
    if (A.current && A.current.name === "lesson" && !A.S.get("done")[A.current.arg]) {
      pendingSuccess = A.current.arg;
    }
  }, true);
  function showSuccess() {
    const done = doc.querySelector(".donebox #donebtn");
    if (!done) return;
    const marker = doc.createElement("span");
    marker.className = "t-success-check";
    marker.setAttribute("data-state", "in");
    marker.setAttribute("aria-hidden", "true");
    marker.innerHTML = '<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>';
    done.parentElement.append(marker);
    const timer = setTimeout(function () { marker.remove(); }, 1600);
    A.onLeave(function () { clearTimeout(timer); });
  }
  // Register before boot; the main router calls this after each view mounts.
  A.on("route", function (route) {
    const main = doc.querySelector("#main");
    if (main && main.firstElementChild && !isQuiet()) {
      main.firstElementChild.classList.add("motion-route-enter");
    }
    if (route.name === "home") addHome();
    if (route.name === "lesson" && A.lang() === "ar") addLesson(route.arg);
    if (route.name === "lesson" && pendingSuccess === route.arg) {
      pendingSuccess = null;
      showSuccess();
    }
  });
  A.motion = { quiet: isQuiet, setQuiet: setMotion, slidePill: slidePill };
})(window.ACADEMY = window.ACADEMY || {});
