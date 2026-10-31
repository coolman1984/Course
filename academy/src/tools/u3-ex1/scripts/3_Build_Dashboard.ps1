# Ready tool, unit 3, example 1 - step 3 of 3: Excel builds the dashboard workbook through COM.
#
# Reads what step 2 wrote (Output\Work\Production_Q3.csv, Models.csv, Countries.csv, summary.json) and builds
# Output\Production_Q3_Dashboard.xlsx:
#   Data       every row, with ModelName and CountryName as VLOOKUP formulas, as the Excel Table tblProduction
#   Models, Countries   the two masters the VLOOKUPs read
#   Pivots     PT_MonthLine (month x line), PT_Country (sets and value), PT_Model (sets), largest first
#   Report     the four figures and the month and line tables, all formulas on tblProduction
#   Dashboard  the four figures, three pivot charts, and slicers for Month, LineCode and CountryName
# Then it checks the workbook's own figures against summary.json and stops if any differs.

$StepName = "3_dashboard"
. (Join-Path $PSScriptRoot "common.ps1")

$code = 0
$excel = $null
$book = $null
try {
    Write-Log "start"
    $summary = Read-Summary
    $rows = Read-Table "Production_Q3.csv"
    $models = Read-Table "Models.csv"
    $countries = Read-Table "Countries.csv"
    if ($rows.Count -ne [int]$summary.rows) { Stop-Tool ("Production_Q3.csv holds {0} rows, summary.json says {1}" -f $rows.Count, $summary.rows) }
    Write-Log ("read Production_Q3.csv: {0} rows" -f $rows.Count)

    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    $excel.ScreenUpdating = $false
    $book = $excel.Workbooks.Add()
    while ($book.Worksheets.Count -gt 1) { $book.Worksheets.Item($book.Worksheets.Count).Delete() }

    # --- Data: every row, then two VLOOKUP columns, then the Excel Table ---
    $data = $book.Worksheets.Item(1)
    $data.Name = "Data"
    $columns = @("Date", "WorkOrder", "LineCode", "ModelCode", "CountryCode", "Qty", "Value", "SourceFile", "Month")
    $data.Range("B:E").NumberFormat = "@"
    $data.Range("H:I").NumberFormat = "@"   # Month stays the text 2026-07, never a date
    Write-Grid $data (ConvertTo-Grid $rows $columns @{ Date = "date"; Qty = "number"; Value = "number" })
    $last = $rows.Count + 1
    $data.Range("J1").Value2 = "ModelName"
    $data.Range("K1").Value2 = "CountryName"
    $data.Range("J2:J$last").Formula = '=VLOOKUP(D2,Models!$A:$B,2,FALSE)'
    $data.Range("K2:K$last").Formula = '=VLOOKUP(E2,Countries!$A:$B,2,FALSE)'
    $data.Range("A2:A$last").NumberFormat = "yyyy-mm-dd"
    $data.Range("F2:G$last").NumberFormat = "#,##0"
    $table = $data.ListObjects.Add(1, $data.Range("A1:K$last"), [Type]::Missing, 1)   # xlSrcRange, xlYes (headers)
    $table.Name = "tblProduction"
    $table.TableStyle = "TableStyleMedium2"
    Write-Log ("Data sheet: {0} rows, VLOOKUP columns ModelName and CountryName, table tblProduction" -f $rows.Count)

    foreach ($m in @(@{ Name = "Models"; Rows = $models; Cols = @("ModelCode", "ModelName") }, @{ Name = "Countries"; Rows = $countries; Cols = @("CountryCode", "CountryName") })) {
        $sheet = Add-Sheet $book $m.Name
        $sheet.Range("A:B").NumberFormat = "@"
        Write-Grid $sheet (ConvertTo-Grid $m.Rows $m.Cols @{})
        [void]$sheet.Range("A:B").EntireColumn.AutoFit()
    }
    $excel.Calculate()
    $missing = $excel.WorksheetFunction.CountIf($data.Range("J2:K$last"), "#N/A")
    if ($missing -gt 0) { Stop-Tool "$missing names show #N/A: a code is missing from Masters" }
    Write-Log "check passed: no #N/A in ModelName or CountryName"

    # --- Pivots: one pivot cache on tblProduction, three pivot tables ---
    $pivots = Add-Sheet $book "Pivots"
    $cache = $book.PivotCaches().Create(1, "tblProduction", 6)   # xlDatabase, Excel 2013 and later
    $ptMonth = $cache.CreatePivotTable($pivots.Range("A3"), "PT_MonthLine", $true, 6)
    $ptMonth.PivotFields("Month").Orientation = 1      # rows
    $ptMonth.PivotFields("LineCode").Orientation = 2   # columns
    [void]$ptMonth.AddDataField($ptMonth.PivotFields("Qty"), "Sets", -4157)   # xlSum
    $ptCountry = $cache.CreatePivotTable($pivots.Range("L3"), "PT_Country", $true, 6)
    $ptCountry.PivotFields("CountryName").Orientation = 1
    [void]$ptCountry.AddDataField($ptCountry.PivotFields("Qty"), "Sets", -4157)
    [void]$ptCountry.AddDataField($ptCountry.PivotFields("Value"), "Value (EGP)", -4157)
    $ptCountry.PivotFields("CountryName").AutoSort(2, "Sets")   # largest first
    $ptModel = $cache.CreatePivotTable($pivots.Range("Q3"), "PT_Model", $true, 6)
    $ptModel.PivotFields("ModelName").Orientation = 1
    [void]$ptModel.AddDataField($ptModel.PivotFields("Qty"), "Sets", -4157)
    $ptModel.PivotFields("ModelName").AutoSort(2, "Sets")
    $ptChart = $cache.CreatePivotTable($pivots.Range("U3"), "PT_CountryChart", $true, 6)   # sets only, for the bar chart
    $ptChart.PivotFields("CountryName").Orientation = 1
    [void]$ptChart.AddDataField($ptChart.PivotFields("Qty"), "Sets", -4157)
    $ptChart.PivotFields("CountryName").AutoSort(2, "Sets")
    foreach ($pt in @($ptMonth, $ptCountry, $ptModel, $ptChart)) { $pt.TableRange1.NumberFormat = "#,##0" }
    $pivots.Range("A1").Value2 = "Pivot tables on tblProduction - Data > Refresh All updates them"
    Write-Log "Pivots sheet: PT_MonthLine, PT_Country, PT_Model (and PT_CountryChart for the chart)"

    # --- Report: every figure a formula on tblProduction ---
    $report = Add-Sheet $book "Report"
    $report.Range("A1").Value2 = "Production report"
    $report.Range("A2").Value2 = ("Period: {0} to {1} - every figure is a formula on tblProduction" -f $summary.first, $summary.last)
    $labels = @("Total sets", "Total value (EGP million)", "Export share", "Top model")
    for ($i = 0; $i -lt 4; $i++) { $report.Cells.Item(4 + $i, 1).Value2 = $labels[$i] }
    $report.Range("B4").Formula = "=SUM(tblProduction[Qty])"
    $report.Range("B5").Formula = "=SUM(tblProduction[Value])/1000000"
    $report.Range("B6").Formula = '=1-SUMIFS(tblProduction[Qty],tblProduction[CountryCode],"EG")/B4'
    $topCell = $ptModel.DataBodyRange.Cells.Item(1, 1)
    $report.Range("B7").Formula = ("=Pivots!{0}{1}" -f (Get-ColumnLetter ($topCell.Column - 1)), $topCell.Row)
    $report.Range("B4").NumberFormat = "#,##0"
    $report.Range("B5").NumberFormat = "#,##0.0"
    $report.Range("B6").NumberFormat = "0.0%"
    $report.Range("A9").Value2 = "Month"; $report.Range("B9").Value2 = "Sets"; $report.Range("C9").Value2 = "Value (EGP)"
    $report.Range("A:A").NumberFormat = "@"
    $months = @($summary.monthList)
    $r = 10
    foreach ($month in $months) {
        $report.Cells.Item($r, 1).Value2 = $month
        $report.Cells.Item($r, 2).Formula = "=SUMIFS(tblProduction[Qty],tblProduction[Month],A$r)"
        $report.Cells.Item($r, 3).Formula = "=SUMIFS(tblProduction[Value],tblProduction[Month],A$r)"
        $r++
    }
    $report.Cells.Item($r, 1).Value2 = "Total"
    $report.Cells.Item($r, 2).Formula = "=SUM(B10:B$($r - 1))"
    $report.Cells.Item($r, 3).Formula = "=SUM(C10:C$($r - 1))"
    $monthTotal = $r
    $r += 2
    $lineHead = $r
    $report.Cells.Item($r, 1).Value2 = "Line"; $report.Cells.Item($r, 2).Value2 = "Sets"
    $r++
    foreach ($line in $summary.lines.PSObject.Properties.Name) {
        $report.Cells.Item($r, 1).Value2 = $line
        $report.Cells.Item($r, 2).Formula = "=SUMIFS(tblProduction[Qty],tblProduction[LineCode],A$r)"
        $r++
    }
    $report.Range("B10:C$r").NumberFormat = "#,##0"
    foreach ($cell in @("A1", "A4:A7", "A9:C9", "A$($monthTotal):C$($monthTotal)", "A$($lineHead):B$($lineHead)")) { $report.Range($cell).Font.Bold = $true }
    $report.Range("A1").Font.Size = 16
    [void]$report.Range("A:C").EntireColumn.AutoFit()
    $report.PageSetup.Orientation = 2   # landscape
    $report.PageSetup.Zoom = $false
    $report.PageSetup.FitToPagesWide = 1
    $report.PageSetup.FitToPagesTall = $false
    Write-Log "Report sheet: four figures, months and lines, all formulas"

    # --- Dashboard: the figures, three pivot charts, the slicers ---
    $dash = Add-Sheet $book "Dashboard"
    try { $excel.ActiveWindow.DisplayGridlines = $false } catch { }
    $dash.Range("B1").Value2 = ("Production dashboard - {0} to {1}" -f $summary.first, $summary.last)
    $dash.Range("B1").Font.Size = 18; $dash.Range("B1").Font.Bold = $true
    $kpi = @(@("B", "Total sets", "=Report!B4", "#,##0"), @("E", "Value (EGP million)", "=Report!B5", "#,##0.0"), @("H", "Export share", "=Report!B6", "0.0%"), @("K", "Top model", "=Report!B7", "General"))
    foreach ($k in $kpi) {
        $dash.Range($k[0] + "3").Value2 = $k[1]
        $dash.Range($k[0] + "4").Formula = $k[2]
        $dash.Range($k[0] + "4").NumberFormat = $k[3]
        $dash.Range($k[0] + "4").Font.Size = 20; $dash.Range($k[0] + "4").Font.Bold = $true
        $dash.Range($k[0] + "4").Font.Color = Get-Rgb 47 95 230
    }
    $charts = @(
        @{ Pivot = $ptMonth; Type = 51; Title = "Sets by month and line"; Left = 20; Top = 110 },
        @{ Pivot = $ptChart; Type = 57; Title = "Sets by country"; Left = 520; Top = 110 },
        @{ Pivot = $ptModel; Type = 57; Title = "Sets by model"; Left = 20; Top = 420 }
    )
    foreach ($c in $charts) {
        $shape = $dash.Shapes.AddChart2(-1, $c.Type, $c.Left, $c.Top, 480, 290)
        $shape.Chart.SetSourceData($c.Pivot.TableRange1)
        $shape.Chart.HasTitle = $true
        $shape.Chart.ChartTitle.Text = $c.Title
        if ($c.Type -eq 57) { $shape.Chart.Axes(1).ReversePlotOrder = $true; $shape.Chart.HasLegend = $false }   # largest at the top
        Close-Com $shape
    }
    Write-Log "Dashboard sheet: four figures and three pivot charts"
    try {
        $top = 110
        foreach ($field in @("Month", "LineCode", "CountryName")) {
            $slicerCache = $book.SlicerCaches.Add2($ptMonth, $field)
            foreach ($pt in @($ptCountry, $ptModel, $ptChart)) { $slicerCache.PivotTables.AddPivotTable($pt) }
            [void]$slicerCache.Slicers.Add($dash, [Type]::Missing, "Slicer_$field", $field, $top, 1020, 170, 190)
            $top += 200
        }
        Write-Log "slicers: Month, LineCode and CountryName, each connected to every pivot table"
    } catch {
        Write-Log ("NOTE: the slicers could not be added here ({0}). Add them by hand: click a pivot chart, PivotChart Analyze > Insert Slicer." -f $_.Exception.Message)
    }

    # --- the checks: the workbook's own figures against the source files ---
    $excel.CalculateFull()
    Assert-Same "rows in tblProduction" $table.ListRows.Count $summary.rows
    Assert-Same "total sets (Report)" $report.Range("B4").Value2 $summary.units
    Assert-Same "total value (Report)" ($report.Range("B5").Value2 * 1000000) $summary.value 1
    Assert-Same "export share % (Report)" ($report.Range("B6").Value2 * 100) $summary.exportShare 0.05
    Assert-Same "grand total of PT_MonthLine" $ptMonth.GetPivotData("Sets").Value2 $summary.units
    Assert-Same "grand total of PT_Model" $ptModel.GetPivotData("Sets").Value2 $summary.units
    for ($i = 0; $i -lt $months.Count; $i++) {
        $expected = $summary.months.([string][int]$months[$i].Substring(5))
        Assert-Same ("sets in " + $months[$i]) $report.Cells.Item(10 + $i, 2).Value2 $expected
    }
    if ([string]$report.Range("B7").Value2 -ne [string]$summary.topModel.name) { Stop-Tool ("the top model is {0}, the source files say {1}" -f $report.Range("B7").Value2, $summary.topModel.name) }
    Write-Log ("check passed: top model = " + $summary.topModel.name)

    # --- save: Dashboard first ---
    $dash.Move($book.Worksheets.Item(1))
    $report.Move([Type]::Missing, $dash)
    $dash.Activate()
    $excel.ScreenUpdating = $true
    $target = Join-Path $OutDir "Production_Q3_Dashboard.xlsx"
    Save-Previous $target
    $book.SaveAs($target, 51)   # xlOpenXMLWorkbook
    Write-Log "wrote Output\Production_Q3_Dashboard.xlsx"
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
