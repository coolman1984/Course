# Ready tool, unit 3, example 2: the commercial review in one click (Run_Tool.bat runs this file).
$StepName = "run_tool"
. (Join-Path $PSScriptRoot "scripts\common.ps1")
$steps = @(
    @{ Title = "Excel and Word read the branch workbooks, Masters and the two memos through COM, and save them as CSV"; Kind = "ps"; File = "1_Export_With_Office.ps1" },
    @{ Title = "pure Python reads the six PDF reports, joins everything into four tables and computes every figure"; Kind = "py"; File = "2_Build_Tables.py" },
    @{ Title = "Excel builds the review workbook (VLOOKUP, pivots, report, charts) and checks it"; Kind = "ps"; File = "3_Build_Workbook.ps1" },
    @{ Title = "PowerPoint builds the 8-slide deck and its PDF from the workbook's figures"; Kind = "ps"; File = "4_Build_Deck.ps1" }
)
exit (Invoke-Tool "Unit 3, example 2 - the commercial review" $steps @("Q3_Commercial_Review.pptx"))
