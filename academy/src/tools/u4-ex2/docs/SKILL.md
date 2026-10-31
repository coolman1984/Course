---
name: pdf-to-page-tool
description: Runs, checks and adapts the ready tool of unit 4's second example - one system PDF report (export sales) read as text into a SQLite database, checked against the report's own Total line, then one offline HTML page for management with figures, charts, a table and a Present button. Pure Python, the standard library only. Use when asked to run it for a new month or to find why it stopped.
---

# PDF to page tool

The tool is already built and tested. Run it, read its log, and change one step at a time.

## How it runs
Run_Tool.bat (double-click) runs both steps in order and stops at the first failure. Each step also has its own
launcher in scripts\.
1. scripts/extract_pdf.py - reads Data\Export_Sales_2026-07.pdf as text (re + zlib, no pdfplumber), takes the rows
   between the header and the Total line, stops unless they add up to the Total line, checks every country against
   Data\Countries.csv, and writes Output\Exports.db (tables Exports and Countries).
2. scripts/build_report.py - reads the database with SQL (a JOIN on Countries) and writes Output\Export_Report.html:
   three figures, two SVG charts, a table with a Total row, and a Present button. No link outside the page.

## A new month
Put the new PDF in Data and change the file name at the top of extract_pdf.py (PDF = ...). The month is read from
the file name.

## Rules
- Python with the standard library only. No pip install, no internet, no outside link in the page.
- Data is read-only; everything is written to Output; every step logs and stops with a clear message.

## Before you say "done"
- The log says "12 rows, 470 sets, 4,168,000 EGP: the same as the Total line" and ends with "ALL STEPS PASSED".
- The page opens with the internet disconnected and shows every figure of Answer_Key.txt.
