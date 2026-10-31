/* The ready tools: one folder, Ready_Tool/, inside each example zip of units 3 and 4, so a lecture can run the
   finished automation at once instead of waiting for it to be built. One click (Run_Tool.bat) runs every step in
   order and stops at the first check that fails:
   - Office files (Excel, Word, PowerPoint) are read and written by PowerShell through COM, because on laptops with a
     DRM such as NASCA only Office itself may open them;
   - everything else (stacking, checks, figures, SQLite, PDF text, HTML) is pure Python: the standard library only.
   Each tool carries its documentation: docs/SKILL.md (English, for Claude Code or Codex), docs/HISTORY.md and
   docs/LESSONS.md (the reader's language), and START_HERE.txt.
   The files themselves live in academy/src/tools/ (real scripts, so they can be read, run and tested as they are);
   the build embeds them as #tool-files. `#@include helpers.py` in a Python script is replaced by
   tools/common/helpers.py, so every script ships as one self-contained file; LESSONS.md takes the shared lessons the
   same way. data.test.mjs runs the Python steps on
   the generated example files and checks the PowerShell scripts' structure. */
"use strict";
(function (A) {
  const files = () => {
    if (!A.toolFiles) { const el = typeof document !== "undefined" && document.getElementById && document.getElementById("tool-files"); A.toolFiles = el ? JSON.parse(el.textContent) : {}; }
    return A.toolFiles;
  };
  const crlf = (s) => s.replace(/\r?\n/g, "\r\n");
  // the shared files each tool takes from tools/common/ (into Ready_Tool/scripts/)
  const COMMON = {
    "u3-ex1": ["common.ps1", "1_Export_With_Office.ps1"],
    "u3-ex2": ["common.ps1", "1_Export_With_Office.ps1"],
    "u4-ex1": ["common.ps1"],
    "u4-ex2": ["common.ps1"],
  };
  // `#@include helpers.py` (Python) and `<!-- @include lessons-common.ar.md -->` (Markdown) take a file of tools/common/
  const include = (text) => text.replace(/^(?:#@include (\S+)|<!-- @include (\S+) -->)\r?\n?/gm, (m, a, b) => {
    const f = a || b;
    const t = files()["common/" + f];
    if (t == null) throw new Error("ready tool: missing common/" + f);
    return t.endsWith("\n") ? t : t + "\n";
  });
  function bundle(name, lang) {
    const F = files(), out = [];
    if (!COMMON[name] || !Object.keys(F).length) return out;
    const add = (path, text) => out.push({ path: "Ready_Tool/" + path, text: /\.(bat|ps1)$/.test(path) ? crlf(text) : /\.txt$/.test(path) ? "﻿" + crlf(text) : text });
    add("Run_Tool.bat", F["common/Run_Tool.bat"]);
    for (const c of COMMON[name]) add("scripts/" + c, F["common/" + c]);
    for (const k of Object.keys(F).sort()) {
      if (!k.startsWith(name + "/")) continue;
      let p = k.slice(name.length + 1);
      const m = p.match(/^(.*)\.(ar|en)(\.\w+)$/);   // HISTORY.ar.md → HISTORY.md, in the reader's language
      if (m) { if (m[2] !== lang) continue; p = m[1] + m[3]; }
      add(p, include(F[k]));
    }
    return out;
  }
  A.readyTools = { bundle, files, include, names: Object.keys(COMMON) };
})(window.ACADEMY = window.ACADEMY || {});
