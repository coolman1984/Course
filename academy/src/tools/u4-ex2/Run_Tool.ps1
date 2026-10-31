# Ready tool, unit 4, example 2: from one PDF report to one HTML page, in one click (Run_Tool.bat runs this file).
$StepName = "run_tool"
. (Join-Path $PSScriptRoot "scripts\common.ps1")
$steps = @(
    @{ Title = "step 1: pure Python reads the PDF's table, checks it against the Total line and loads Output\Exports.db"; Kind = "py"; File = "extract_pdf.py" },
    @{ Title = "step 2: pure Python builds Output\Export_Report.html from the database (no internet)"; Kind = "py"; File = "build_report.py" }
)
exit (Invoke-Tool "Unit 4, example 2 - one PDF into a database, and an HTML page for management" $steps @("Export_Report.html"))
