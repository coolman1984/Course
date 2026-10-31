"""Example 1, step 5: load the two weeks' table (Output/Two_Weeks.csv, written by step 3) into a SQLite database,
then answer three questions with SQL.

Pure Python: the standard library only (csv, sqlite3, pathlib). sqlite3 comes inside Python: nothing to install.
"""
import csv
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
