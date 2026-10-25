/* Writes each unit-2 and unit-3 project (data/xl-sample.js, data/office-projects.js) as real files, offline: each
   workbook is a minimal .xlsx (inline strings, a date style, a bold header row), each system report a text PDF (the
   standard Helvetica faces, uncompressed, so any reader or Word can take the text back out), each memo a minimal .docx
   (paragraphs and bordered tables), and each project is one .zip (stored, no compression; UTF-8 names).
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
  function sheetXml(rows, rtl, hr = 0) {   // hr: the header row (a system export may print title lines above it)
    const width = Math.max(...rows.map((r) => r.length));
    const body = rows.map((r, ri) => `<row r="${ri + 1}">${r.map((v, ci) => {
      if (v === null || v === undefined || v === "") return "";
      const ref = col(ci) + (ri + 1);
      if (v && typeof v === "object") return `<c r="${ref}" s="1"><v>${v.d}</v></c>`;   // a real date (day number)
      if (typeof v === "number") return `<c r="${ref}"${Number.isInteger(v) && Math.abs(v) >= 1000 ? ' s="3"' : ""}><v>${v}</v></c>`;
      return `<c r="${ref}" t="inlineStr"${ri <= hr ? ' s="2"' : ""}><is><t xml:space="preserve">${xml(v)}</t></is></c>`;
    }).join("")}</row>`).join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet ${NS}><sheetViews><sheetView workbookViewId="0"${rtl ? ' rightToLeft="1"' : ""}><pane ySplit="${hr + 1}" topLeftCell="A${hr + 2}" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="${width}" width="16" customWidth="1"/></cols><sheetData>${body}</sheetData></worksheet>`;
  }
  function workbook(sheets, rtl) {
    const n = sheets.length, ids = sheets.map((_, i) => i + 1);
    return zip([
      { name: "[Content_Types].xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${ids.map((i) => `<Override PartName="/xl/worksheets/sheet${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>` },
      { name: "_rels/.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${R}/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
      { name: "xl/workbook.xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook ${NS} xmlns:r="${R}"><sheets>${sheets.map((s, i) => `<sheet name="${xml(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets></workbook>` },
      { name: "xl/_rels/workbook.xml.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${ids.map((i) => `<Relationship Id="rId${i}" Type="${R}/worksheet" Target="worksheets/sheet${i}.xml"/>`).join("")}<Relationship Id="rId${n + 1}" Type="${R}/styles" Target="styles.xml"/></Relationships>` },
      { name: "xl/styles.xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet ${NS}><numFmts count="1"><numFmt numFmtId="164" formatCode="yyyy-mm-dd"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>` },
      ...sheets.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheetXml(s.rows, rtl, s.head || 0) })),
    ]);
  }

  /* a system report as a text PDF. doc: { title, pages: [{ items: [{ x, y, t, size, bold, right }], rules: [[x1, y1, x2, y2]],
     bands: [[x, y, w, h]] }] } in points on an A4 page (595 × 842, y up). English text only: the standard faces are WinAnsi. */
  const HW = { " ": 278, ",": 278, ".": 278, "-": 333, "(": 333, ")": 333, "%": 889, "/": 278, ":": 278 };
  const width = (s, size, bold) => [...s].reduce((w, c) => w + (/[0-9]/.test(c) ? 556 : HW[c] || (bold ? 611 : 556)), 0) * size / 1000;
  function pdf(doc) {
    const pe = (s) => String(s).replace(/[\\()]/g, (c) => "\\" + c);
    const objs = [], add = (s) => objs.push(s) && objs.length;
    const cat = add(""), pages = add(""), f1 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"), f2 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    const kids = [];
    for (const pg of doc.pages) {
      const ops = [];
      for (const [x, y, w, h] of pg.bands || []) ops.push(`0.9 g ${x} ${y} ${w} ${h} re f 0 g`);
      for (const [x1, y1, x2, y2] of pg.rules || []) ops.push(`0.6 w ${x1} ${y1} m ${x2} ${y2} l S`);
      for (const it of pg.items) { const size = it.size || 9, x = it.right ? +(it.x - width(String(it.t), size, it.bold)).toFixed(2) : it.x; ops.push(`BT /${it.bold ? "F2" : "F1"} ${size} Tf 1 0 0 1 ${x} ${it.y} Tm (${pe(it.t)}) Tj ET`); }
      const body = ops.join("\n");
      const content = add(`<< /Length ${enc.encode(body).length} >>\nstream\n${body}\nendstream`);
      kids.push(add(`<< /Type /Page /Parent ${pages} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> /Contents ${content} 0 R >>`));
    }
    objs[cat - 1] = `<< /Type /Catalog /Pages ${pages} 0 R >>`;
    objs[pages - 1] = `<< /Type /Pages /Kids [${kids.map((k) => k + " 0 R").join(" ")}] /Count ${kids.length} >>`;
    const info = add(`<< /Title (${pe(doc.title)}) /Producer (Plant reporting system) >>`);
    let out = "%PDF-1.4\n%\xe2\xe3\xcf\xd3\n";
    const off = [];
    objs.forEach((o, i) => { off.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
    const xref = out.length;
    out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${off.map((o) => String(o).padStart(10, "0") + " 00000 n \n").join("")}trailer\n<< /Size ${objs.length + 1} /Root ${cat} 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    return Uint8Array.from(out, (c) => c.charCodeAt(0) & 255);   // ASCII throughout, so string offsets are byte offsets
  }

  /* a memo as a minimal .docx. doc: { blocks: [{ p, bold, size }, { table: [[cell, …], …] }] } — the first table row is the header */
  function docx(doc) {
    const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
    const run = (t, b, sz) => `<w:r>${b || sz ? `<w:rPr>${b ? "<w:b/>" : ""}${sz ? `<w:sz w:val="${sz}"/>` : ""}</w:rPr>` : ""}<w:t xml:space="preserve">${xml(t)}</w:t></w:r>`;
    const border = ["top", "left", "bottom", "right", "insideH", "insideV"].map((k) => `<w:${k} w:val="single" w:sz="4" w:space="0" w:color="808080"/>`).join("");
    const body = doc.blocks.map((b) => b.table
      ? `<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders>${border}</w:tblBorders></w:tblPr><w:tblGrid>${b.table[0].map(() => '<w:gridCol w:w="1800"/>').join("")}</w:tblGrid>${b.table.map((r, ri) => `<w:tr>${r.map((c) => `<w:tc><w:tcPr><w:tcW w:w="1800" w:type="dxa"/></w:tcPr><w:p>${run(String(c), ri === 0)}</w:p></w:tc>`).join("")}</w:tr>`).join("")}</w:tbl><w:p/>`
      : `<w:p>${run(b.p, b.bold, b.size)}</w:p>`).join("");
    return zip([
      { name: "[Content_Types].xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>` },
      { name: "_rels/.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${R}/officeDocument" Target="word/document.xml"/></Relationships>` },
      { name: "word/_rels/document.xml.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${R}/styles" Target="styles.xml"/></Relationships>` },
      { name: "word/styles.xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${W}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="22"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120"/></w:pPr></w:pPrDefault></w:docDefaults></w:styles>` },
      { name: "word/document.xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${W}><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>` },
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
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));   // a finished result embedded by the build
  const fileData = (f) => (f.lock ? lockFile() : f.sheets ? workbook(f.sheets, false) : f.pdf ? pdf(f.pdf) : f.docx ? docx(f.docx) : f.b64 ? b64(f.b64) : f.text);
  function project(p, lang) {
    if (p.bundle) return zip(p.bundle(lang).map((f) => ({ name: p.folder + "/" + f.path, data: fileData(f) })));   // a unit-3 project lists every file itself
    const S = A.xlProjects, root = p.folder + "/";
    return zip([
      { name: root + "README.txt", data: "\ufeff" + S.readme(p, lang) },
      { name: root + "Prompt.txt", data: "\ufeff" + promptText(p, lang) },
      ...p.files().map((f) => ({ name: root + f.path, data: f.lock ? lockFile() : workbook(f.sheets, false) })),
      { name: root + "Answer_Key.txt", data: "\ufeff" + S.answerKey(p, lang) },
    ]);
  }
  A.xlKit = { zip, workbook, pdf, docx, fileData, project, promptText, crc32 };
})(window.ACADEMY);
