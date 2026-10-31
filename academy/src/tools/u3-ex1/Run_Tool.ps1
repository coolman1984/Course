# Ready tool, unit 3, example 1: the production dashboard in one click (Run_Tool.bat runs this file).
$StepName = "run_tool"
. (Join-Path $PSScriptRoot "scripts\common.ps1")
$steps = @(
    @{ Title = "Excel reads the 13 weekly reports and Masters through COM, and saves them as CSV"; Kind = "ps"; File = "1_Export_With_Office.ps1" },
    @{ Title = "pure Python stacks the reports, checks every row and computes every figure"; Kind = "py"; File = "2_Build_Tables.py" },
    @{ Title = "Excel builds the dashboard workbook (VLOOKUP, pivots, charts, slicers) and checks it"; Kind = "ps"; File = "3_Build_Dashboard.ps1" }
)
exit (Invoke-Tool "Unit 3, example 1 - the production dashboard" $steps @("Production_Q3_Dashboard.xlsx"))
