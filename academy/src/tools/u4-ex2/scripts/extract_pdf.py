"""Example 2, step 1: read the export-sales PDF and load its table into a SQLite database.

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
for _folder in [HERE] + list(HERE.parents)[:3]:   # the example folder: the first one above that holds Data
    if (_folder / "Data").is_dir():
        HERE = _folder
        break
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
