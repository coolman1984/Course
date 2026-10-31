# The tool's history: from a PDF report to a page for management (unit 4, example 2)

This is unit 3's PDF in its simplest form: one report instead of six, and an HTML page instead of a PowerPoint deck.
The planning engineer built it with pure Python only, and kept this log after each step.

| Step | Script | What was done | The check that passed |
|---|---|---|---|
| 0 | (a small script) | the first 20 lines of the PDF's text printed, to see the table before any extraction | the headers and the Total line visible |
| 1 | extract_pdf.py | the rows from after the headers down to the Total line, into Exports.db | 12 rows, 470 sets, EGP 4,168,000: the same as the Total line |
| 2 | build_report.py | one page from the database: figures, SVG charts, a table and a Present button | countries' sum = models' sum = the total, and no link outside the page |
| 3 | Run_Tool.bat | both steps in one click | ALL STEPS PASSED |

## Why an HTML page?
Because it is one file that opens on any laptop in any browser, with no internet and no extra program, and it can be
e-mailed like any file. The charts are SVG written inside the page itself, so there is no outside library.

## If you carry on
A new month? Put the new PDF in Data, change the file name at the top of extract_pdf.py, run it, and add a row here.
