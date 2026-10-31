---
name: production-dashboard-tool
description: Runs, checks and adapts the ready tool that turns the weekly production reports (Data/Weekly_Reports/Week_nn.xlsx) and Masters.xlsx into the quarter's Excel dashboard (VLOOKUP names, pivot tables, report, charts, slicers). Use when asked to refresh the production dashboard, to run it for a new quarter, or to find why the tool stopped.
---

# Production dashboard tool

The tool is already built and tested. Do not rewrite it: run it, read its log, and change only what the request needs.

## How it runs
Run_Tool.bat (double-click) runs Run_Tool.ps1, which runs three steps in order and stops at the first failure:
1. scripts/1_Export_With_Office.ps1 - Excel opens every .xlsx in Data read-only through COM and writes each sheet as
   CSV in Output/Work/Export. COM, because the laptop's DRM lets only Office open Office files.
2. scripts/2_Build_Tables.py - pure Python (standard library only): stacks the weeks, checks every row (headers,
   empty cells, codes missing from Masters, repeated work orders) and writes Output/Work/*.csv and summary.json.
3. scripts/3_Build_Dashboard.ps1 - Excel through COM builds Output/Production_Q3_Dashboard.xlsx and checks the
   workbook's own totals against summary.json.

## Rules
- Data is read-only. Everything is written to Output. A previous result is moved to Output/Previous, never overwritten.
- PowerShell 5.1 for Office (COM), Python's standard library for the rest. No pip install, no internet.
- Every step appends to Output/Run_Log.txt and stops with a clear message when anything is unexpected.
- Close and release every COM object in finally, even after an error.

## A new quarter
1. Put the new Week_nn.xlsx files in Data/Weekly_Reports (same columns: Date, WorkOrder, LineCode, ModelCode,
   CountryCode, Qty, Value) and the current Masters.xlsx in Data.
2. Nothing to change in the scripts: the months, the lines and the period are read from the data.
3. Run Run_Tool.bat and read the log. Every "check passed" line must be there.

## When it stops
Read the last lines of Output/Run_Log.txt: they name the file, the row and the reason. Fix the data or ask the
owner of the file; never silence a check. See docs/LESSONS.md for the problems already met and how they were solved.

## Before you say "done"
- The log ends with "ALL STEPS PASSED".
- Output/Check_Report.txt matches Answer_Key.txt (or the new quarter's figures checked by hand once).
- Task Manager shows no EXCEL.EXE left behind.
