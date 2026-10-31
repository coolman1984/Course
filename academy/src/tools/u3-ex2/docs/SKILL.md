---
name: commercial-review-tool
description: Runs, checks and adapts the ready tool that gathers the quarter's commercial figures from the branch Excel files, the system PDF reports (export sales, shipments) and the Word memos (returns, targets) into one review workbook and an 8-slide PowerPoint deck. Use when asked to refresh the commercial review, to run it for a new quarter, or to find why the tool stopped.
---

# Commercial review tool

The tool is already built and tested. Do not rewrite it: run it, read its log, and change only what the request needs.

## How it runs
Run_Tool.bat (double-click) runs Run_Tool.ps1, which runs four steps in order and stops at the first failure:
1. scripts/1_Export_With_Office.ps1 - Excel and Word open every .xlsx and .docx in Data read-only through COM and
   write each sheet and each table as CSV in Output/Work/Export (the DRM lets only Office open Office files).
2. scripts/2_Build_Tables.py - pure Python: reads the six PDF reports as text (re + zlib), joins all eleven sources
   into Sales, Shipments, Returns and Targets, checks them, and writes Output/Work/*.csv and summary.json.
3. scripts/3_Build_Workbook.ps1 - Excel through COM builds Output/Q3_Commercial_Review.xlsx (tables, VLOOKUP names,
   pivots, Report formulas, charts), checks it against summary.json and saves the deck's figures and chart pictures.
4. scripts/4_Build_Deck.ps1 - PowerPoint through COM builds Output/Q3_Commercial_Review.pptx (8 slides) and its PDF.

## Rules
- Data is read-only. Everything is written to Output. A previous result is moved to Output/Previous.
- PowerShell 5.1 for Office (COM), Python's standard library for the rest. No pip install, no internet.
- Every number on a slide is read back from the workbook; the last slide is left for the director's conclusions.
- Every step appends to Output/Run_Log.txt and stops with a clear message when anything is unexpected.

## Sources (the names the tool expects)
- Data/Excel/Sales_<Cairo|Alexandria|Delta>_Q3.xlsx (sheet Sales: Date, InvoiceNo, ModelCode, Qty, NetSales), Masters.xlsx
- Data/PDF/Export_Sales_yyyy-mm.pdf (CountryCode, ModelCode, Qty, NetSales), Shipments_yyyy-mm.pdf (Channel, Shipments, Units, FreightEGP)
- Data/Word/Returns_Q3.docx (ModelCode, Jul, Aug, Sep), Targets_Q3.docx (Channel, TargetUnits, TargetSales)
A new quarter: change the file names and the three months at the top of scripts/2_Build_Tables.py (BRANCHES,
MONTHS), then run and read the log.

## Before you say "done"
- The log ends with "ALL STEPS PASSED".
- Output/Check_Report.txt matches Answer_Key.txt; the deck has 8 slides.
- Task Manager shows no EXCEL.EXE, WINWORD.EXE or POWERPNT.EXE left behind.
