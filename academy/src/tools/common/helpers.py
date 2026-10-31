# ---- shared helpers: the same block in every ready tool (pure Python, the standard library only) ----
import csv
import json
import math
import re
import sys
import zipfile
import zlib
import xml.etree.ElementTree as ET
from datetime import date, datetime, timedelta
from pathlib import Path


def find_root():
    """The example folder: the first folder above this script that holds Data (Ready_Tool sits inside it)."""
    here = Path(__file__).resolve().parent
    for folder in [here] + list(here.parents)[:3]:
        if (folder / "Data").is_dir():
            return folder
    print("STOPPED: no Data folder above " + str(here) + ". Keep the Ready_Tool folder inside the example folder.")
    sys.exit(1)


ROOT = find_root()
DATA = ROOT / "Data"
OUT = ROOT / "Output"
WORK = OUT / "Work"
EXPORT = WORK / "Export"   # the CSV files that Excel and Word wrote through COM (step 1)
LOG = OUT / "Run_Log.txt"


def log(msg):
    line = f"{datetime.now():%Y-%m-%d %H:%M:%S}  {STEP}  {msg}"
    print(line)
    OUT.mkdir(exist_ok=True)
    with LOG.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def stop(msg):
    log("STOPPED: " + msg)
    sys.exit(1)


def rel(path):
    return Path(path).relative_to(ROOT).as_posix()


def js_round(x, digits=0):
    """Round half up, like Excel and JavaScript (Python's round() rounds half to even)."""
    k = 10 ** digits
    return math.floor(x * k + 0.5) / k if digits else int(math.floor(x + 0.5))


def iso_date(v):
    """An Excel day number (45000) or an ISO text (2026-07-01) -> '2026-07-01'."""
    s = str(v).strip()
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", s):
        return s
    try:
        return (date(1899, 12, 30) + timedelta(days=int(float(s)))).isoformat()
    except ValueError:
        stop(f"'{s}' is not a date")


def number(v, where):
    s = str(v).replace(",", "").strip()
    try:
        x = float(s)
    except ValueError:
        stop(f"{where}: '{v}' is not a number")
    return int(x) if x == int(x) else x


def export_name(path, part):
    """The name step 1 gives a sheet or a table it exported: Weekly_Reports/Week_01.xlsx + Production
    -> Weekly_Reports__Week_01.xlsx__Production.csv"""
    return Path(path).relative_to(DATA).as_posix().replace("/", "__") + "__" + part + ".csv"


def read_csv_rows(path):
    with Path(path).open(encoding="utf-8-sig", newline="") as f:
        return [row for row in csv.reader(f) if any(c.strip() for c in row)]


_M = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
_R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
_W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def _col(ref):
    n = 0
    for ch in re.match(r"[A-Z]+", ref).group(0):
        n = n * 26 + ord(ch) - 64
    return n - 1


def _open_zip(path, what):
    try:
        return zipfile.ZipFile(path)
    except (zipfile.BadZipFile, OSError):
        stop(f"{rel(path)} cannot be read as a plain {what} file (it may be protected by the DRM). "
             f"Run the whole tool with Run_Tool.bat: step 1 lets Excel and Word read the files through COM.")


def read_xlsx(path, sheet):
    """Every row of one sheet as a list of texts (zipfile + xml.etree: no openpyxl)."""
    with _open_zip(path, "Excel") as z:
        shared = []
        if "xl/sharedStrings.xml" in z.namelist():
            for si in ET.fromstring(z.read("xl/sharedStrings.xml")).iter(_M + "si"):
                shared.append("".join(t.text or "" for t in si.iter(_M + "t")))
        book = ET.fromstring(z.read("xl/workbook.xml"))
        rid = next((s.get(_R + "id") for s in book.iter(_M + "sheet") if s.get("name") == sheet), None)
        if rid is None:
            stop(f"{rel(path)} has no sheet named {sheet}")
        rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        target = next(r.get("Target") for r in rels if r.get("Id") == rid).lstrip("/")
        target = target if target.startswith("xl/") else "xl/" + target
        rows = []
        for row in ET.fromstring(z.read(target)).iter(_M + "row"):
            cells = {}
            for c in row.iter(_M + "c"):
                kind, v = c.get("t"), c.find(_M + "v")
                if kind == "inlineStr":
                    text = "".join(t.text or "" for t in c.iter(_M + "t"))
                elif kind == "s":
                    text = shared[int(v.text)]
                else:
                    text = "" if v is None else (v.text or "")
                cells[_col(c.get("r"))] = text
            if any(x.strip() for x in cells.values()):
                rows.append([cells.get(i, "") for i in range(max(cells) + 1)])
        return rows


def read_docx_tables(path):
    """Every table of a Word file, as rows of cell texts (zipfile + xml.etree: no python-docx)."""
    with _open_zip(path, "Word") as z:
        body = ET.fromstring(z.read("word/document.xml"))
    tables = []
    for tbl in body.iter(_W + "tbl"):
        tables.append([["".join(t.text or "" for t in tc.iter(_W + "t")).strip() for tc in tr.iter(_W + "tc")]
                       for tr in tbl.iter(_W + "tr")])
    return tables


def sheet_rows(path, sheet):
    """A sheet's rows: from the CSV Excel exported in step 1 when it is there, otherwise from the file itself."""
    exported = EXPORT / export_name(path, sheet)
    if exported.exists():
        return read_csv_rows(exported)
    if not Path(path).exists():
        stop(f"missing file {rel(path)}")
    return read_xlsx(path, sheet)


def word_table(path, index=1):
    """One table of a Word file: from the CSV Word exported in step 1 when it is there, otherwise from the file."""
    exported = EXPORT / export_name(path, f"Table{index}")
    if exported.exists():
        return read_csv_rows(exported)
    if not Path(path).exists():
        stop(f"missing file {rel(path)}")
    tables = read_docx_tables(path)
    if len(tables) < index:
        stop(f"{rel(path)} has no table {index}")
    return tables[index - 1]


def pdf_lines(path):
    """The text of a text PDF (not a scan) as lines: every text item at its (x, y), grouped by y from the top,
    then sorted by x. re + zlib only: no pdfplumber."""
    data = Path(path).read_bytes()
    if not data.startswith(b"%PDF"):
        stop(f"{rel(path)} is not a plain PDF (it may be protected by the DRM): ask for the report as CSV from the system")
    rows = {}
    for m in re.finditer(rb"<<(.*?)>>\s*stream\r?\n", data, re.S):
        start = m.end()
        raw = data[start:data.find(b"endstream", start)].rstrip(b"\r\n")
        if b"/FlateDecode" in m.group(1):
            try:
                raw = zlib.decompress(raw)
            except zlib.error:
                continue
        for t in re.finditer(r"1 0 0 1 (-?[\d.]+) (-?[\d.]+) Tm \(((?:\\.|[^\\)])*)\) Tj", raw.decode("latin-1")):
            rows.setdefault(float(t.group(2)), []).append((float(t.group(1)), re.sub(r"\\(.)", r"\1", t.group(3))))
    return [[text for _, text in sorted(items)] for _, items in sorted(rows.items(), reverse=True)]


def pdf_table(path, head):
    """The rows under the header row `head`, down to a Total line or the page footer."""
    lines = pdf_lines(path)
    try:
        h = lines.index(head)
    except ValueError:
        stop(f"{rel(path)}: the header row {' | '.join(head)} was not found")
    rows = []
    for line in lines[h + 1:]:
        if len(line) != len(head) or line[0] == "Total":
            break
        rows.append(line)
    return rows


def check_head(rows, head, where):
    if not rows:
        stop(f"{where} is empty")
    got = [c.strip() for c in rows[0][:len(head)]]
    if got != head:
        stop(f"{where}: the columns are {' | '.join(got)}, expected {' | '.join(head)}")
    return rows[1:]


def two_col(rows, head, where):
    body = check_head(rows, head, where)
    out = {}
    for r in body:
        if r[0].strip() in out:
            stop(f"{where}: the code {r[0]} is listed twice")
        out[r[0].strip()] = r[1].strip()
    return out


def write_csv(path, head, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(head)
        w.writerows(rows)


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=1, ensure_ascii=False), encoding="utf-8")
# ---- end of the shared helpers ----
