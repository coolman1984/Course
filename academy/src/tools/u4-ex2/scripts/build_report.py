"""Example 2, step 2: from the database to one HTML page for management: figures, a chart, a table, and slides.

Pure Python: the standard library only (sqlite3, html, pathlib). The page has no internet links:
it opens in any browser, on any laptop, offline, and it can be e-mailed as one file.
"""
import html
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
for _folder in [HERE] + list(HERE.parents)[:3]:   # the example folder: the first one above that holds Data
    if (_folder / "Data").is_dir():
        HERE = _folder
        break
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
