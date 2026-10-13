/* Boot: build the shell, apply preferences, render the first route, and surface fatal errors without losing data. */
"use strict";
(function () {
  const App = ACAD.App; const { h, t } = App;
  function boot() {
    App.applyLang();
    if (App.state.navCollapsed && window.innerWidth >= 1024) document.body.classList.add("nav-collapsed");
    document.getElementById("scrim").addEventListener("click", App.closeNav);
    App.renderBar(); App.render();
    if (!App.storageOk) App.toast(t("storageFail"));
    document.documentElement.classList.add("ready");
  }
  window.addEventListener("error", (e) => { console.error(e.error || e.message); });
  window.addEventListener("unhandledrejection", (e) => { console.error(e.reason); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
