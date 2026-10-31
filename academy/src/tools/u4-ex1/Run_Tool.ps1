# Ready tool, unit 4, example 1: the two weeks, step by step, in one click (Run_Tool.bat runs this file).
# Step 4 of the lesson is the code review: it has no script (read docs\LESSONS.md and the review checklist).
$StepName = "run_tool"
. (Join-Path $PSScriptRoot "scripts\common.ps1")
$steps = @(
    @{ Title = "step 1: Excel stacks the two weeks into Output\Two_Weeks.xlsx (PowerShell + COM)"; Kind = "ps"; File = "step1_stack.ps1" },
    @{ Title = "step 2: the country name by VLOOKUP (PowerShell + COM)"; Kind = "ps"; File = "step2_lookup.ps1" },
    @{ Title = "step 3: the Report sheet and Output\Two_Weeks.csv (PowerShell + COM)"; Kind = "ps"; File = "step3_report.ps1" },
    @{ Title = "step 5: the SQLite database and three SQL questions (pure Python)"; Kind = "py"; File = "load_sqlite.py" }
)
exit (Invoke-Tool "Unit 4, example 1 - two weeks in one table, a report and a database" $steps @("Two_Weeks.xlsx", "Query_Results.txt"))
