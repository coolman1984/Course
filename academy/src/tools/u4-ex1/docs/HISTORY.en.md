# The tool's history: two weeks in one table (unit 4, example 1)

This is unit 3's dashboard in its simplest form: two weeks instead of 13, and one lookup instead of the model and the
country. The planning engineer built it step by step under the security team's rules, and kept this log after each step.

| Step | Script | What was done | The check that passed |
|---|---|---|---|
| 1 | step1_stack.ps1 | Excel (COM) opened both weeks read-only and stacked them in Two_Weeks.xlsx | 18 + 18 = 36 rows, 845 + 920 = 1,765 sets |
| 2 | step2_lookup.ps1 | the Countries sheet copied, the CountryName column added as a VLOOKUP formula | no #N/A, still 36 rows |
| 3 | step3_report.ps1 | a Report sheet of SUMIF formulas, and Two_Weeks.csv written by PowerShell | report = data = 1,765, the CSV holds 36 rows |
| 4 | (review) | the code reviewed with the checklist in a new session | COUNTIF in place of SUMIF caught and fixed: Kuwait 385, not 8 |
| 5 | load_sqlite.py | pure Python loaded the table into Factory.db and answered 3 SQL questions | COUNT = 36 and SUM = 1,765 from the database itself |
| 6 | Run_Tool.bat | every step in one click, stopping at the first that fails | ALL STEPS PASSED |

## Why PowerShell for Office and Python for the rest?
The security team said two things: packages are blocked, and Office files carry a DRM. So everything that opens
Excel became PowerShell through COM, because Excel itself opens the encrypted file. The arithmetic and the database
became Python with its standard library only; sqlite3 ships inside Python, with nothing to install.

## If you carry on
One step at a time: a new script with a launcher of its own, and a new row in this table.
