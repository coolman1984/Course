/* Motion details for the single-file Academy (the home-page theatre was removed 2026-10-17).
   Selected patterns adapted from Jakub Antalik's transitions.dev:
   16 sliding tabs, 18 text reveal, 10 success-check.
   Permission: https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE
   Adaptations teach actual course scenarios rather than loading or generating fake content.
   No runtime dependency, no network, no automatic playback. */
"use strict";
(function (A) {
  const doc = document;
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
    const side = doc.getElementById("motion-btn");   // keep the sidebar switch in step
    if (side) { side.setAttribute("aria-pressed", String(motionOff)); side.querySelector("span").textContent = A.t(motionOff ? "motionOn" : "motionOff"); }
  }
  setMotion(motionOff);
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
  // The home page's «مختبر الفكرة المتحركة» theatre was removed (owner request, 2026-10-17): the home page goes
  // straight from the hero to the showcase. Lessons keep the sliding level tabs and the completion check.
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
  // Lessons keep only the sliding level tabs. The five-station lesson theatre was removed (owner review, 2026-10-15):
  // it repeated the lesson's situation, hid one sentence per click in a large dark box and pushed the real scene down.
  // The picture-first section in render.js now shows the whole path at once.
  function addLesson() {
    if (!doc.querySelector("#main #lv")) return;
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
    if (route.name === "lesson" && A.lang() === "ar") addLesson();
    if (route.name === "lesson" && pendingSuccess === route.arg) {
      pendingSuccess = null;
      showSuccess();
    }
  });
  A.motion = { quiet: isQuiet, setQuiet: setMotion, slidePill: slidePill };
})(window.ACADEMY = window.ACADEMY || {});
