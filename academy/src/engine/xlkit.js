/* Writes each unit-2 project (data/xl-sample.js) as real files, offline: each workbook is a minimal .xlsx (inline
   strings, a date style, a bold header row), and each project is one .zip (stored, no compression; UTF-8 names).
   Nothing leaves the page: the zip becomes a blob the reader saves. */
"use strict";
(function (A) {
  const enc = new TextEncoder();
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = (b) => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };

  function zip(entries) {   // entries: [{ name, data: Uint8Array | string }]
    const parts = [], central = [];
    let off = 0;
    const d = new Date(), time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    for (const e of entries) {
      const name = enc.encode(e.name), data = typeof e.data === "string" ? enc.encode(e.data) : e.data, crc = crc32(data);
      const head = new DataView(new ArrayBuffer(30));
      [[0, 0x04034b50, 4], [4, 20, 2], [6, 0x0800, 2], [8, 0, 2], [10, time, 2], [12, date, 2], [14, crc, 4], [18, data.length, 4], [22, data.length, 4], [26, name.length, 2], [28, 0, 2]]
        .forEach(([o, v, n]) => (n === 4 ? head.setUint32(o, v, true) : head.setUint16(o, v, true)));
      const cen = new DataView(new ArrayBuffer(46));
      [[0, 0x02014b50, 4], [4, 20, 2], [6, 20, 2], [8, 0x0800, 2], [10, 0, 2], [12, time, 2], [14, date, 2], [16, crc, 4], [20, data.length, 4], [24, data.length, 4], [28, name.length, 2], [42, off, 4]]
        .forEach(([o, v, n]) => (n === 4 ? cen.setUint32(o, v, true) : cen.setUint16(o, v, true)));
      parts.push(new Uint8Array(head.buffer), name, data); central.push(new Uint8Array(cen.buffer), name);
      off += 30 + name.length + data.length;
    }
    const size = central.reduce((s, b) => s + b.length, 0), end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, entries.length, true); end.setUint16(10, entries.length, true); end.setUint32(12, size, true); end.setUint32(16, off, true);
    const all = [...parts, ...central, new Uint8Array(end.buffer)], out = new Uint8Array(all.reduce((s, b) => s + b.length, 0));
    let p = 0; for (const b of all) { out.set(b, p); p += b.length; }
    return out;
  }

  const xml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const col = (i) => { let s = ""; for (i++; i > 0; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + ((i - 1) % 26)) + s; return s; };
  const NS = 'xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"', R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
  function sheetXml(rows, rtl) {
    const width = Math.max(...rows.map((r) => r.length));
    const body = rows.map((r, ri) => `<row r="${ri + 1}">${r.map((v, ci) => {
      if (v === null || v === undefined || v === "") return "";
      const ref = col(ci) + (ri + 1);
      if (v && typeof v === "object") return `<c r="${ref}" s="1"><v>${v.d}</v></c>`;   // a real date (day number)
      if (typeof v === "number") return `<c r="${ref}"${Number.isInteger(v) && Math.abs(v) >= 1000 ? ' s="3"' : ""}><v>${v}</v></c>`;
      return `<c r="${ref}" t="inlineStr"${ri === 0 ? ' s="2"' : ""}><is><t xml:space="preserve">${xml(v)}</t></is></c>`;
    }).join("")}</row>`).join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet ${NS}><sheetViews><sheetView workbookViewId="0"${rtl ? ' rightToLeft="1"' : ""}><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="${width}" width="16" customWidth="1"/></cols><sheetData>${body}</sheetData></worksheet>`;
  }
  function workbook(sheets, rtl) {
    const n = sheets.length, ids = sheets.map((_, i) => i + 1);
    return zip([
      { name: "[Content_Types].xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${ids.map((i) => `<Override PartName="/xl/worksheets/sheet${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>` },
      { name: "_rels/.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${R}/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
      { name: "xl/workbook.xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook ${NS} xmlns:r="${R}"><sheets>${sheets.map((s, i) => `<sheet name="${xml(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets></workbook>` },
      { name: "xl/_rels/workbook.xml.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${ids.map((i) => `<Relationship Id="rId${i}" Type="${R}/worksheet" Target="worksheets/sheet${i}.xml"/>`).join("")}<Relationship Id="rId${n + 1}" Type="${R}/styles" Target="styles.xml"/></Relationships>` },
      { name: "xl/styles.xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet ${NS}><numFmts count="1"><numFmt numFmtId="164" formatCode="yyyy-mm-dd"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>` },
      ...sheets.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheetXml(s.rows, rtl) })),
    ]);
  }

  /* one lesson's project as one zip: a folder holding Data/ (the English workbooks), README.txt, Prompt.txt and
     Answer_Key.txt in the reader's language (text files start with a byte-order mark so Notepad reads the Arabic) */
  function promptText(p, lang) {
    const X = (id) => (A.prompts || []).find((x) => x.id === id), main = X(p.prompt), add = X("x2a");
    let text = main ? main.text[lang] : "";
    if (p.tool && p.n !== 8 && add) text += "\r\n\r\n" + add.text[lang].replace(lang === "ar" ? "[أسماء الملفات]" : "[file names]", `${p.tool}.ps1, run_${p.tool.replace("_tool", "")}.bat`);
    return text.replace(/\n/g, "\r\n") + "\r\n";
  }
  function lockFile() {   // what Excel leaves beside a workbook while someone has it open: 165 bytes holding the user's name
    const b = new Uint8Array(165), name = "planning.engineer";
    b[0] = name.length; for (let i = 0; i < name.length; i++) b[1 + i] = name.charCodeAt(i);
    for (let i = 1 + name.length; i < 54; i++) b[i] = 32;
    return b;
  }
  function project(p, lang) {
    const S = A.xlProjects, root = p.folder + "/";
    return zip([
      { name: root + "README.txt", data: "\ufeff" + S.readme(p, lang) },
      { name: root + "Prompt.txt", data: "\ufeff" + promptText(p, lang) },
      ...p.files().map((f) => ({ name: root + f.path, data: f.lock ? lockFile() : workbook(f.sheets, false) })),
      { name: root + "Answer_Key.txt", data: "\ufeff" + S.answerKey(p, lang) },
    ]);
  }
  A.xlKit = { zip, workbook, project, promptText, crc32 };
})(window.ACADEMY);
