# Ready tool, unit 4, example 1 - step 2: the country name by VLOOKUP (PowerShell drives Excel through COM).
# Opens Output\Two_Weeks.xlsx from step 1, copies the Countries sheet of Data\Masters.xlsx (opened read-only) into it,
# and adds a CountryName column to the Data sheet as a VLOOKUP formula, not values.
# The check in the log: the number of cells showing #N/A (must be zero), and the row count unchanged.

$StepName = "step2_lookup"
. (Join-Path $PSScriptRoot "common.ps1")

$code = 0
$excel = $null
$book = $null
$masters = $null
try {
    Write-Log "start"
    $path = Join-Path $OutDir "Two_Weeks.xlsx"
    if (-not (Test-Path -LiteralPath $path)) { Stop-Tool "missing Output\Two_Weeks.xlsx : run step 1 first" }
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    $book = $excel.Workbooks.Open($path)
    $data = $book.Worksheets.Item("Data")
    if ([string]$data.Range("F1").Value2 -ne "SourceFile") { Stop-Tool "Output\Two_Weeks.xlsx is not step 1's result (no SourceFile column)" }
    $last = $data.Cells.Item($data.Rows.Count, 1).End(-4162).Row   # xlUp: the last row with a date
    foreach ($s in @($book.Worksheets)) { if ($s.Name -eq "Countries") { $s.Delete() } }   # a second run replaces the copy

    $masters = $excel.Workbooks.Open((Join-Path $DataDir "Masters.xlsx"), 0, $true)   # read-only
    $masters.Worksheets.Item("Countries").Copy([Type]::Missing, $book.Worksheets.Item($book.Worksheets.Count))
    $masters.Close($false); Close-Com $masters; $masters = $null
    $countries = $book.Worksheets.Item("Countries")
    $codes = $excel.WorksheetFunction.CountA($countries.Range("A:A")) - 1
    Write-Log ("copied the Countries sheet from Data\Masters.xlsx: {0} countries" -f $codes)

    $data.Range("G1").Value2 = "CountryName"
    $data.Range("G1").Font.Bold = $true
    $data.Range("G2:G$last").NumberFormat = "General"
    $data.Range("G2:G$last").Formula = '=VLOOKUP(D2,Countries!$A:$B,2,FALSE)'
    [void]$data.Range("G:G").EntireColumn.AutoFit()
    $excel.Calculate()
    $na = $excel.WorksheetFunction.CountIf($data.Range("G2:G$last"), "#N/A")
    $formulas = $excel.WorksheetFunction.CountA($data.Range("G2:G$last"))
    Write-Log ("CountryName: {0} formulas, {1} cells showing #N/A, {2} rows" -f $formulas, $na, ($last - 1))
    if ($na -gt 0) { Stop-Tool "$na cells show #N/A: a country code is missing from Masters" }
    Write-Log "check passed: no #N/A, the row count is unchanged"
    $book.Save()
    Write-Log "saved Output\Two_Weeks.xlsx (Data with CountryName, and Countries)"
    Write-Log "done"
} catch {
    Write-Log ("STOPPED: " + $_.Exception.Message)
    $code = 1
} finally {
    if ($null -ne $masters) { $masters.Close($false); Close-Com $masters }
    if ($null -ne $book) { $book.Close($false); Close-Com $book }
    if ($null -ne $excel) { $excel.Quit(); Close-Com $excel }
    Clear-Com
}
exit $code
