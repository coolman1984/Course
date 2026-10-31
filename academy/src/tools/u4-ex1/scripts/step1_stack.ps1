# Ready tool, unit 4, example 1 - step 1: the two weeks stacked (PowerShell drives Excel through COM).
# Reads Data\Week_01.xlsx and Data\Week_02.xlsx (sheet Production) read-only, and writes Output\Two_Weeks.xlsx:
# one Data sheet with the headers once, the rows of both files, and a SourceFile column.
# The check in the log: rows and total Qty per file, then the total in Data against the two files' sum.

$StepName = "step1_stack"
. (Join-Path $PSScriptRoot "common.ps1")
$Head = @("Date", "LineCode", "ModelCode", "CountryCode", "Qty")

$code = 0
$excel = $null
$book = $null
try {
    Write-Log "start"
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    $rows = New-Object 'System.Collections.Generic.List[object[]]'
    $sum = 0
    foreach ($name in @("Week_01.xlsx", "Week_02.xlsx")) {
        $path = Join-Path $DataDir $name
        if (-not (Test-Path -LiteralPath $path)) { Stop-Tool "missing file Data\$name" }
        $week = $null
        try {
            $week = $excel.Workbooks.Open($path, 0, $true)   # read-only
            $sheet = $week.Worksheets.Item("Production")
            $values = $sheet.UsedRange.Value2                # the whole sheet in one read
            $lastRow = $values.GetLength(0)
            for ($c = 1; $c -le 5; $c++) {
                if ([string]$values[1, $c] -ne $Head[$c - 1]) { Stop-Tool ("Data\{0}: column {1} is '{2}', expected '{3}'" -f $name, $c, $values[1, $c], $Head[$c - 1]) }
            }
            $qty = 0
            for ($r = 2; $r -le $lastRow; $r++) {
                for ($c = 1; $c -le 5; $c++) {
                    if ($null -eq $values[$r, $c] -or [string]$values[$r, $c] -eq "") { Stop-Tool ("Data\{0}: row {1} has an empty cell" -f $name, $r) }
                }
                $rows.Add(@($values[$r, 1], $values[$r, 2], $values[$r, 3], $values[$r, 4], [double]$values[$r, 5], $name))
                $qty += [double]$values[$r, 5]
            }
            Write-Log ("read Data\{0}: {1} rows, {2} sets" -f $name, ($lastRow - 1), $qty)
            $sum += $qty
            Close-Com $sheet
        } finally {
            if ($null -ne $week) { $week.Close($false); Close-Com $week }
        }
    }

    $grid = New-Object 'object[,]' ($rows.Count + 1), 6
    $titles = $Head + @("SourceFile")
    for ($c = 0; $c -lt 6; $c++) { $grid[0, $c] = $titles[$c] }
    for ($r = 0; $r -lt $rows.Count; $r++) { for ($c = 0; $c -lt 6; $c++) { $grid[($r + 1), $c] = $rows[$r][$c] } }
    $book = $excel.Workbooks.Add()
    while ($book.Worksheets.Count -gt 1) { $book.Worksheets.Item($book.Worksheets.Count).Delete() }
    $data = $book.Worksheets.Item(1)
    $data.Name = "Data"
    $data.Range("B:D").NumberFormat = "@"
    $data.Range("F:F").NumberFormat = "@"
    Write-Grid $data $grid
    $last = $rows.Count + 1
    $data.Range("A2:A$last").NumberFormat = "yyyy-mm-dd"
    $data.Range("A1:F1").Font.Bold = $true
    [void]$data.Range("A:F").EntireColumn.AutoFit()

    $total = $excel.WorksheetFunction.Sum($data.Range("E2:E$last"))
    if ($total -ne $sum) { Stop-Tool "the Data sheet holds $total sets, but the two files hold $sum" }
    Write-Log ("check passed: Data holds {0} rows and {1} sets = the two files' sum" -f $rows.Count, $total)
    $target = Join-Path $OutDir "Two_Weeks.xlsx"
    Save-Previous $target
    $book.SaveAs($target, 51)
    Write-Log "wrote Output\Two_Weeks.xlsx"
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
