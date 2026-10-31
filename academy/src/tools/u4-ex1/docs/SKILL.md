---
name: two-weeks-tool
description: Runs, checks and adapts the ready tool of unit 4's first example - two weekly production reports stacked into one table, the country name by VLOOKUP, a Report sheet and a CSV (PowerShell driving Excel through COM), then a SQLite database and three SQL questions (pure Python). Use when asked to run the two-weeks tool, to add a week, or to find why a step stopped.
---

# Two weeks tool

The tool is already built and tested, one small step per script. Run it, read its log, and change one step at a time.

## How it runs
Run_Tool.bat (double-click) runs every step in order and stops at the first failure. Each step also has its own
launcher in scripts\ (Run_step1_stack.bat and so on), to run it alone.
1. scripts/step1_stack.ps1 - Excel (COM) opens Data\Week_01.xlsx and Week_02.xlsx read-only and writes
   Output\Two_Weeks.xlsx: one Data sheet, both weeks stacked, with SourceFile.
2. scripts/step2_lookup.ps1 - copies Countries from Data\Masters.xlsx and adds CountryName as a VLOOKUP formula.
3. scripts/step3_report.ps1 - a Report sheet of SUMIF formulas (total, per country, per line), and
   Output\Two_Weeks.csv written by PowerShell itself (plain text even under the DRM).
4. The code review (lesson k5): no script. Use the checklist in docs/LESSONS.md before you trust a change.
5. scripts/load_sqlite.py - pure Python: Output\Factory.db (table Production) and Output\Query_Results.txt.

## Rules
- PowerShell first for Office, through COM. Python with the standard library only. No pip install, no internet.
- Read Data and earlier results in Output; write only to Output. Never change a file in Data.
- Every step logs its rows, its totals and every check to Output\Run_Log.txt, and stops with a clear message.

## Before you say "done"
- The log ends with "ALL STEPS PASSED": 36 rows, 1,765 sets, no #N/A, Egypt 880, Kuwait 385.
- Query_Results.txt matches Answer_Key.txt.
- Task Manager shows no EXCEL.EXE left behind.
