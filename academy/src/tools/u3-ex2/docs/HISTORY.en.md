# The tool's history: the commercial review (unit 3, example 2)

The planning engineer kept this log while building the tool with the model. The sources are 11 files in 3 formats, so
each version added one format and was checked on its own.

| Version | What was added | The check that passed |
|---|---|---|
| 1 | The three branch files (Excel) in one Sales table, the channel from the file name | 195 rows, each branch's sum = its file |
| 2 | The three export reports (PDF) in the same table, the month from the file name | 309 rows and EGP 329,645,970 |
| 3 | Shipments (PDF), and returns and targets (Word), each in its own table | sets shipped = sets sold = 25,276 |
| 4 | Two VLOOKUP columns for the country name and the model name, pivot tables, a Report sheet of formulas, 4 charts | no #N/A, achievement 100.2% |
| 5 | An 8-slide PowerPoint deck, every number read from the workbook, the last slide left for the director's conclusions | 8 slides, figures = Answer_Key.txt |
| 6 | The tool became 4 steps in one click: Excel and Word export through COM, pure Python reads the PDFs and computes, Excel builds the workbook, PowerPoint builds the deck | Check_Report.txt = Answer_Key.txt |

## Why each of the three formats has its own road
- **Excel and Word:** encrypted by the DRM, so Office itself opens them through COM and PowerShell writes the values as CSV.
- **PDF:** a system report holding real text, so pure Python reads the text with re and zlib, with no pdfplumber.
- **The deck:** PowerPoint builds it through COM, and the charts are pictures Excel saved from the same workbook, so
  the number on a slide is the very number on the sheet.

## If you carry on
Add a row to this table for each change: what changed, and how it was checked.
