/* The reference solutions of the unit-4 examples (data/easy-projects.js): the pure-Python steps, written the way the
   lessons ask the model to write them (the standard library only, Data/ read, Output/ written, a run log, a clear stop).
   They ship in each example zip under Solution/, and data.test.mjs runs them with python3 on the generated files. */
"use strict";
(function (A) {
  A.easySolutions = {
    "load_sqlite.py": String.raw`"""Example 1, step 5: load the two weeks' table (Output/Two_Weeks.csv, written by step 3) into a SQLite database,
then answer three questions with SQL.

Pure Python: the standard library only (csv, sqlite3, pathlib). sqlite3 comes inside Python: nothing to install.
"""
import csv
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
if not (HERE / "Data").is_dir() and (HERE.parent / "Data").is_dir():
    HERE = HERE.parent   # the script sits in Solution\: the project folder is the one above it
OUT = HERE / "Output"
CSV = OUT / "Two_Weeks.csv"
DB = OUT / "Factory.db"
ANSWERS = OUT / "Query_Results.txt"
LOG = OUT / "Run_Log.txt"
COLUMNS = ["Date", "LineCode", "ModelCode", "CountryCode", "Qty", "SourceFile", "CountryName"]
QUESTIONS = [
    ("Sets by country", "SELECT CountryName, SUM(Qty) FROM Production GROUP BY CountryName ORDER BY SUM(Qty) DESC"),
    ("Sets by line", "SELECT LineCode, SUM(Qty) FROM Production GROUP BY LineCode ORDER BY LineCode"),
    ("Sets by week", "SELECT SourceFile, COUNT(*), SUM(Qty) FROM Production GROUP BY SourceFile ORDER BY SourceFile"),
]


def log(msg):
    line = f"{datetime.now():%Y-%m-%d %H:%M:%S}  load_sqlite  {msg}"
    print(line)
    with LOG.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def stop(msg):
    log("STOPPED: " + msg)
    sys.exit(1)


def main():
    OUT.mkdir(exist_ok=True)
    log("start")
    if not CSV.exists():
        stop("Output/Two_Weeks.csv is missing: run step 3 first")
    with CSV.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        missing = [c for c in COLUMNS if c not in (reader.fieldnames or [])]
        if missing:
            stop("Two_Weeks.csv has no column " + ", ".join(missing))
        rows = [tuple(r[c] for c in COLUMNS) for r in reader]
    qty = sum(int(r[4]) for r in rows)
    log(f"read Two_Weeks.csv: {len(rows)} rows, {qty:,} sets")

    if DB.exists():
        DB.unlink()
    con = sqlite3.connect(DB)
    with con:
        con.execute("CREATE TABLE Production (Date TEXT, LineCode TEXT, ModelCode TEXT, CountryCode TEXT, "
                    "Qty INTEGER, SourceFile TEXT, CountryName TEXT)")
        con.executemany("INSERT INTO Production VALUES (?, ?, ?, ?, ?, ?, ?)", rows)
    back = con.execute("SELECT COUNT(*), SUM(Qty) FROM Production").fetchone()
    if back != (len(rows), qty):
        stop(f"the database holds {back}, not {(len(rows), qty)}")
    log(f"wrote Output/{DB.name}: table Production ({back[0]} rows, {back[1]:,} sets)")

    out = []
    for title, sql in QUESTIONS:
        out += [title, sql] + ["  " + " | ".join(f"{v:,}" if isinstance(v, int) else str(v) for v in r) for r in con.execute(sql)] + [""]
    con.close()
    ANSWERS.write_text("\n".join(out), encoding="utf-8")
    log(f"wrote Output/{ANSWERS.name}: {len(QUESTIONS)} questions answered with SQL")
    log("done")


if __name__ == "__main__":
    main()
`,
    "extract_pdf.py": String.raw`"""Example 2, step 1: read the export-sales PDF and load its table into a SQLite database.

Pure Python: the standard library only (re, zlib, csv, sqlite3, pathlib). Nothing to install.
Reads Data/ only, writes Output/ only, and stops with a clear message when anything is unexpected.
"""
import csv
import re
import sqlite3
import sys
import zlib
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
if not (HERE / "Data").is_dir() and (HERE.parent / "Data").is_dir():
    HERE = HERE.parent   # the script sits in Solution\: the project folder is the one above it
DATA = HERE / "Data"
OUT = HERE / "Output"
PDF = DATA / "Export_Sales_2026-07.pdf"
COUNTRIES = DATA / "Countries.csv"
DB = OUT / "Exports.db"
LOG = OUT / "Run_Log.txt"
HEAD = ["CountryCode", "ModelCode", "Qty", "NetSales"]


def log(msg):
    line = f"{datetime.now():%Y-%m-%d %H:%M:%S}  extract_pdf  {msg}"
    print(line)
    with LOG.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def stop(msg):
    log("STOPPED: " + msg)
    sys.exit(1)


def num(text):
    """'1,234' -> 1234 (the report prints thousands separators)."""
    return int(text.replace(",", ""))


def pdf_streams(data):
    """Every content stream in the PDF, decompressed when it is Flate-encoded (zlib is in the standard library)."""
    for m in re.finditer(rb"<<(.*?)>>\s*stream\r?\n", data, re.S):
        start = m.end()
        end = data.find(b"endstream", start)
        raw = data[start:end].rstrip(b"\r\n")
        if b"/FlateDecode" in m.group(1):
            try:
                raw = zlib.decompress(raw)
            except zlib.error:
                continue
        yield raw.decode("latin-1")


def pdf_lines(data):
    """The page's text as lines: every text item at its (x, y), grouped by y from the top, then sorted by x."""
    rows = {}
    for s in pdf_streams(data):
        for m in re.finditer(r"1 0 0 1 (-?[\d.]+) (-?[\d.]+) Tm \(((?:\\.|[^\\)])*)\) Tj", s):
            x, y = float(m.group(1)), float(m.group(2))
            text = re.sub(r"\\(.)", r"\1", m.group(3))
            rows.setdefault(y, []).append((x, text))
    return [[t for _, t in sorted(items)] for _, items in sorted(rows.items(), reverse=True)]


def main():
    OUT.mkdir(exist_ok=True)
    log("start")
    for f in (PDF, COUNTRIES):
        if not f.exists():
            stop(f"missing file Data/{f.name}")
    month = re.search(r"(\d{4}-\d{2})", PDF.name).group(1)

    # 1. read the PDF's text, line by line
    lines = pdf_lines(PDF.read_bytes())
    log(f"read {PDF.name}: {len(lines)} text lines")
    try:
        h = lines.index(HEAD)
    except ValueError:
        stop("the header row CountryCode | ModelCode | Qty | NetSales was not found")

    # 2. the table rows, down to the Total line
    rows, total = [], None
    for line in lines[h + 1:]:
        if line and line[0] == "Total":
            total = (num(line[-2]), num(line[-1]))
            break
        if len(line) == 4 and re.fullmatch(r"[A-Z]{2}", line[0]):
            rows.append((line[0], line[1], num(line[2]), num(line[3])))
    if total is None:
        stop("the Total line was not found under the table")

    # 3. check: the rows must add up to the Total line printed by the system
    qty, sales = sum(r[2] for r in rows), sum(r[3] for r in rows)
    if (qty, sales) != total:
        stop(f"the rows add up to {qty:,} sets and {sales:,} EGP, but the Total line says {total[0]:,} and {total[1]:,}")
    log(f"{len(rows)} rows, {qty:,} sets, {sales:,} EGP: the same as the Total line")

    # 4. the country names (a small two-column master, like the Masters sheet)
    with COUNTRIES.open(encoding="utf-8-sig", newline="") as f:
        countries = {r["CountryCode"]: r["CountryName"] for r in csv.DictReader(f)}
    unknown = sorted({r[0] for r in rows} - set(countries))
    if unknown:
        stop("country codes missing from Countries.csv: " + ", ".join(unknown))

    # 5. the database: one file, two tables
    if DB.exists():
        DB.unlink()
    con = sqlite3.connect(DB)
    with con:
        con.execute("CREATE TABLE Countries (CountryCode TEXT PRIMARY KEY, CountryName TEXT NOT NULL)")
        con.executemany("INSERT INTO Countries VALUES (?, ?)", countries.items())
        con.execute("CREATE TABLE Exports (Month TEXT, CountryCode TEXT REFERENCES Countries(CountryCode), "
                    "ModelCode TEXT, Qty INTEGER, NetSales INTEGER, SourceFile TEXT)")
        con.executemany("INSERT INTO Exports VALUES (?, ?, ?, ?, ?, ?)", [(month,) + r + (PDF.name,) for r in rows])
    back = con.execute("SELECT COUNT(*), SUM(Qty), SUM(NetSales) FROM Exports").fetchone()
    con.close()
    if back != (len(rows), qty, sales):
        stop(f"the database holds {back}, not {(len(rows), qty, sales)}")
    log(f"wrote Output/{DB.name}: table Exports ({back[0]} rows), table Countries ({len(countries)} rows)")
    log("done")


if __name__ == "__main__":
    main()
`,
    "build_report.py": String.raw`"""Example 2, step 2: from the database to one HTML page for management: figures, a chart, a table, and slides.

Pure Python: the standard library only (sqlite3, html, pathlib). The page has no internet links:
it opens in any browser, on any laptop, offline, and it can be e-mailed as one file.
"""
import html
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
if not (HERE / "Data").is_dir() and (HERE.parent / "Data").is_dir():
    HERE = HERE.parent   # the script sits in Solution\: the project folder is the one above it
OUT = HERE / "Output"
DB = OUT / "Exports.db"
PAGE = OUT / "Export_Report.html"
LOG = OUT / "Run_Log.txt"


def log(msg):
    line = f"{datetime.now():%Y-%m-%d %H:%M:%S}  build_report  {msg}"
    print(line)
    with LOG.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def stop(msg):
    log("STOPPED: " + msg)
    sys.exit(1)


def bars(items, unit=""):
    """A horizontal bar chart as inline SVG: one bar per (label, value), largest first."""
    top = max(v for _, v in items)
    rows = []
    for i, (label, v) in enumerate(items):
        y, w = 10 + i * 46, round(560 * v / top)
        rows.append(f'<text x="0" y="{y + 22}" class="lb">{html.escape(label)}</text>'
                    f'<rect x="190" y="{y}" width="{w}" height="30" rx="5" class="bar"/>'
                    f'<text x="{196 + w}" y="{y + 21}" class="vl">{v:,}{unit}</text>')
    return f'<svg viewBox="0 0 900 {20 + 46 * len(items)}" role="img">{"".join(rows)}</svg>'


def main():
    OUT.mkdir(exist_ok=True)
    log("start")
    if not DB.exists():
        stop("Output/Exports.db is missing: run step 1 (extract_pdf.py) first")
    con = sqlite3.connect(DB)
    month, n, qty, sales = con.execute("SELECT MAX(Month), COUNT(*), SUM(Qty), SUM(NetSales) FROM Exports").fetchone()
    by_country = con.execute("""
        SELECT c.CountryName, SUM(e.Qty), SUM(e.NetSales)
        FROM Exports e JOIN Countries c ON c.CountryCode = e.CountryCode
        GROUP BY c.CountryName ORDER BY SUM(e.NetSales) DESC""").fetchall()
    by_model = con.execute("SELECT ModelCode, SUM(Qty), SUM(NetSales) FROM Exports GROUP BY ModelCode ORDER BY SUM(NetSales) DESC").fetchall()
    con.close()

    # the check before any design: the parts must add up to the whole
    if sum(r[2] for r in by_country) != sales or sum(r[2] for r in by_model) != sales:
        stop("the country or model totals do not add up to the grand total")
    top_name, top_qty, top_sales = by_country[0]
    share = round(100 * top_sales / sales)
    log(f"{n} rows, {qty:,} sets, {sales:,} EGP; top country {top_name} ({share}%)")

    e = html.escape
    table = "".join(f"<tr><td>{e(c)}</td><td>{q:,}</td><td>{v:,}</td><td>{round(100 * v / sales)}%</td></tr>" for c, q, v in by_country)
    page = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Export sales {e(month)}</title>
<style>
  :root {{ --ink: #1d2433; --soft: #5b6475; --acc: #d0582a; --bg: #f6f4ef; --card: #fff; }}
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; font-family: "Segoe UI", Arial, sans-serif; color: var(--ink); background: var(--bg); }}
  header {{ display: flex; justify-content: space-between; align-items: center; padding: 18px 28px; background: var(--ink); color: #fff; }}
  header button {{ font: inherit; padding: 8px 16px; border: 0; border-radius: 8px; background: var(--acc); color: #fff; cursor: pointer; }}
  section {{ max-width: 1000px; margin: 24px auto; padding: 28px; background: var(--card); border-radius: 14px; }}
  h1 {{ margin: 0; font-size: 22px; }} h2 {{ margin: 0 0 18px; font-size: 24px; }}
  .kpis {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }}
  .kpi {{ padding: 18px; border-radius: 12px; background: var(--bg); }}
  .kpi b {{ display: block; font-size: 34px; color: var(--acc); }} .kpi span {{ color: var(--soft); }}
  svg {{ width: 100%; height: auto; }} .lb {{ font-size: 18px; fill: var(--ink); }} .vl {{ font-size: 16px; fill: var(--soft); }} .bar {{ fill: var(--acc); }}
  table {{ width: 100%; border-collapse: collapse; font-size: 17px; }}
  th, td {{ padding: 10px; border-bottom: 1px solid #e3e0d8; text-align: right; }} th:first-child, td:first-child {{ text-align: left; }}
  .note {{ color: var(--soft); font-size: 14px; }}
  body.slides section {{ display: none; max-width: none; min-height: calc(100vh - 70px); margin: 0; border-radius: 0; padding: 6vh 8vw; }}
  body.slides section.on {{ display: block; }} body.slides h2 {{ font-size: 40px; }}
</style></head>
<body>
<header><h1>Export sales · {e(month)}</h1><button id="mode">Present</button></header>
<section class="on"><h2>The month in three figures</h2>
  <div class="kpis"><div class="kpi"><b>{sales:,}</b><span>EGP net sales</span></div>
  <div class="kpi"><b>{qty:,}</b><span>sets exported</span></div>
  <div class="kpi"><b>{e(top_name)}</b><span>top country: {share}% of sales</span></div></div></section>
<section><h2>Sales by country (EGP)</h2>{bars([(c, v) for c, _, v in by_country])}</section>
<section><h2>Sales by model (EGP)</h2>{bars([(m, v) for m, _, v in by_model])}</section>
<section><h2>The figures</h2><table><tr><th>Country</th><th>Sets</th><th>EGP</th><th>Share</th></tr>{table}
  <tr><th>Total</th><th>{qty:,}</th><th>{sales:,}</th><th>100%</th></tr></table>
  <p class="note">Source: Export_Sales_{e(month)}.pdf, {n} rows, checked against the report's Total line. Built {datetime.now():%Y-%m-%d %H:%M}.</p></section>
<script>
  const S = [...document.querySelectorAll("section")]; let i = 0;
  const show = (k) => {{ i = Math.max(0, Math.min(S.length - 1, k)); S.forEach((s, j) => s.classList.toggle("on", j === i)); }};
  document.getElementById("mode").onclick = (ev) => {{ const on = document.body.classList.toggle("slides"); ev.target.textContent = on ? "Page" : "Present"; show(0); }};
  document.addEventListener("keydown", (ev) => {{ if (!document.body.classList.contains("slides")) return;
    if (["ArrowRight", "PageDown", " "].includes(ev.key)) show(i + 1); if (["ArrowLeft", "PageUp"].includes(ev.key)) show(i - 1); }});
</script>
</body></html>
"""
    PAGE.write_text(page, encoding="utf-8")
    log(f"wrote Output/{PAGE.name}")
    log("done")


if __name__ == "__main__":
    main()
`,
  };
})(window.ACADEMY = window.ACADEMY || {});
