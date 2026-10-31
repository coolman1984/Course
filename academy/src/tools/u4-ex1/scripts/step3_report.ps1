# Ready tool, unit 4, example 1 - step 3: a Report sheet and a CSV file (PowerShell drives Excel through COM).
# Adds to Output\Two_Weeks.xlsx a Report sheet: the total Qty, a table per country and a table per line, all SUMIF
# formulas. Then PowerShell itself writes the Data sheet as Output\Two_Weeks.csv (UTF-8, dates yyyy-mm-dd): a plain
# text file even on a laptop whose DRM protects what Excel saves.
# The check in the log: the Report total = the Data total, and the CSV's row count = the Data rows.

$StepName = "step3_report"
. (Join-Path $PSScriptRoot "common.ps1")

function ConvertTo-Field($Value) {
    if ($Value -is [double]) { $s = $Value.ToString("R", $Invariant) } else { $s = [string]$Value }
    if ($s.IndexOfAny([char[]]@('"', ',', [char]13, [char]10)) -ge 0) { return '"' + $s.Replace('"', '""') + '"' }
    return $s
}

$code = 0
$excel = $null
$book = $null
try {
    Write-Log "start"
    $path = Join-Path $OutDir "Two_Weeks.xlsx"
    if (-not (Test-Path -LiteralPath $path)) { Stop-Tool "missing Output\Two_Weeks.xlsx : run steps 1 and 2 first" }
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    $book = $excel.Workbooks.Open($path)
    $data = $book.Worksheets.Item("Data")
    if ([string]$data.Range("G1").Value2 -ne "CountryName") { Stop-Tool "the Data sheet has no CountryName column: run step 2 first" }
    $countries = $book.Worksheets.Item("Countries")
    $last = $data.Cells.Item($data.Rows.Count, 1).End(-4162).Row
    foreach ($s in @($book.Worksheets)) { if ($s.Name -eq "Report") { $s.Delete() } }   # a second run rebuilds it

    $report = Add-Sheet $book "Report"
    $report.Range("A:A").NumberFormat = "@"
    $report.Range("A1").Value2 = "Two weeks of production - every figure is a formula on the Data sheet"
    $report.Range("A3").Value2 = "Total sets"
    $report.Range("B3").Formula = "=SUM(Data!E:E)"
    $report.Range("A5").Value2 = "Country"; $report.Range("B5").Value2 = "Sets"
    $nCountries = $excel.WorksheetFunction.CountA($countries.Range("A:A")) - 1
    $r = 6
    for ($i = 2; $i -le $nCountries + 1; $i++) {
        $report.Cells.Item($r, 1).Value2 = [string]$countries.Cells.Item($i, 2).Value2
        $report.Cells.Item($r, 2).Formula = "=SUMIF(Data!G:G,A$r,Data!E:E)"
        $r++
    }
    $r++
    $lineHead = $r
    $report.Cells.Item($r, 1).Value2 = "Line"; $report.Cells.Item($r, 2).Value2 = "Sets"
    $r++
    foreach ($line in @("L01", "L02", "L03")) {
        $report.Cells.Item($r, 1).Value2 = $line
        $report.Cells.Item($r, 2).Formula = "=SUMIF(Data!B:B,A$r,Data!E:E)"
        $r++
    }
    foreach ($cell in @("A1", "A3", "A5:B5", "A$($lineHead):B$($lineHead)")) { $report.Range($cell).Font.Bold = $true }
    $report.Range("B3:B$r").NumberFormat = "#,##0"
    [void]$report.Range("A:B").EntireColumn.AutoFit()
    $excel.Calculate()

    $dataTotal = $excel.WorksheetFunction.Sum($data.Range("E2:E$last"))
    $reportTotal = $report.Range("B3").Value2
    $countryTotal = $excel.WorksheetFunction.Sum($report.Range("B6:B$($nCountries + 5)"))
    $lineTotal = $excel.WorksheetFunction.Sum($report.Range("B$($lineHead + 1):B$($lineHead + 3)"))
    Write-Log ("Report: total {0}, countries {1}, lines {2}; Data {3}" -f $reportTotal, $countryTotal, $lineTotal, $dataTotal)
    if ($reportTotal -ne $dataTotal -or $countryTotal -ne $dataTotal -or $lineTotal -ne $dataTotal) { Stop-Tool "the Report does not add up to the Data sheet" }
    for ($i = 6; $i -le $nCountries + 5; $i++) { Write-Log ("  {0}: {1}" -f $report.Cells.Item($i, 1).Value2, $report.Cells.Item($i, 2).Value2) }
    Write-Log "check passed: Report total = countries = lines = Data total"
    $book.Save()

    # the CSV, written by PowerShell from the values Excel calculated (CountryName included)
    $values = $data.Range("A1:G$last").Value2
    $lines = New-Object 'System.Collections.Generic.List[string]'
    $lines.Add("Date,LineCode,ModelCode,CountryCode,Qty,SourceFile,CountryName")
    for ($i = 2; $i -le $last; $i++) {
        $day = [DateTime]::FromOADate([double]$values[$i, 1]).ToString("yyyy-MM-dd", $Invariant)
        $fields = @($day) + @(2..7 | ForEach-Object { ConvertTo-Field $values[$i, $_] })
        $lines.Add([string]::Join(",", [string[]]$fields))
    }
    $csv = Join-Path $OutDir "Two_Weeks.csv"
    [IO.File]::WriteAllLines($csv, $lines.ToArray(), (New-Object Text.UTF8Encoding $true))
    $back = @(Import-Csv -LiteralPath $csv -Encoding UTF8).Count
    if ($back -ne $last - 1) { Stop-Tool "Two_Weeks.csv holds $back rows, the Data sheet $($last - 1)" }
    Write-Log ("check passed: Output\Two_Weeks.csv holds {0} rows = the Data sheet" -f $back)
    Write-Log "done"
} catch {
    Write-Log ("STOPPED: " + $_.Exception.Message)
    $code = 1
} finally {
    if ($null -ne $book) { $book.Close($false); Close-Com $book }
    if ($null -ne $excel) { $excel.Quit(); Close-Com $excel }
    Clear-Com
}
exit $code
