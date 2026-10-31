# Ready tool, unit 3, example 2 - step 3 of 4: Excel builds the review workbook through COM.
#
# Reads what step 2 wrote (Output\Work\*.csv and summary.json) and builds Output\Q3_Commercial_Review.xlsx:
#   Sales      Month, Channel, CountryCode, CountryName, ModelCode, ModelName, Qty, NetSales, SourceFile:
#              CountryName and ModelName are VLOOKUP formulas; the Excel Table tblSales
#   Shipments, Returns, Targets, Sources, Models, Countries   one table each
#   Pivots     PT_ChannelMonth (net sales, channel x month) and PT_Model (sets per model)
#   Report     every figure of the deck as a formula on the tables
#   Charts     four charts, also saved as pictures for the deck (Output\Work\charts\)
# Then it checks the workbook's own figures against summary.json and writes the figures the deck shows
# (Output\Work\deck_figures.json), read back from the workbook itself.

$StepName = "3_workbook"
. (Join-Path $PSScriptRoot "common.ps1")

function Add-Table($Book, [string]$Name, $Rows, [string[]]$Columns, [hashtable]$Types, [string]$TableName) {
    $sheet = Add-Sheet $Book $Name
    for ($c = 0; $c -lt $Columns.Count; $c++) {
        if (-not $Types.ContainsKey($Columns[$c])) { $sheet.Columns.Item($c + 1).NumberFormat = "@" }
    }
    $grid = ConvertTo-Grid $Rows $Columns $Types
    Write-Grid $sheet $grid
    $lastCell = $sheet.Cells.Item($grid.GetLength(0), $Columns.Count)
    $table = $sheet.ListObjects.Add(1, $sheet.Range($sheet.Cells.Item(1, 1), $lastCell), [Type]::Missing, 1)
    $table.Name = $TableName
    $table.TableStyle = "TableStyleMedium2"
    [void]$sheet.UsedRange.EntireColumn.AutoFit()
    Close-Com $table; Close-Com $lastCell
    return $sheet
}

function Add-Chart($Sheet, [int]$Type, [string]$Source, [string]$Title, [int]$Left, [int]$Top, [string]$Picture) {
    $shape = $Sheet.Shapes.AddChart2(-1, $Type, $Left, $Top, 520, 300)
    $chart = $shape.Chart
    $chart.SetSourceData($Sheet.Parent.Worksheets.Item("Report").Range($Source))
    $chart.HasTitle = $true
    $chart.ChartTitle.Text = $Title
    if ($Type -eq 57) { $chart.Axes(1).ReversePlotOrder = $true; $chart.HasLegend = $false }
    [void]$chart.Export($Picture)
    if (-not (Test-Path -LiteralPath $Picture)) { Stop-Tool "the chart '$Title' could not be saved as a picture" }
    Close-Com $chart; Close-Com $shape
}

$code = 0
$excel = $null
$book = $null
try {
    Write-Log "start"
    $summary = Read-Summary
    $sales = Read-Table "Sales.csv"
    if ($sales.Count -ne [int]$summary.salesRows) { Stop-Tool ("Sales.csv holds {0} rows, summary.json says {1}" -f $sales.Count, $summary.salesRows) }
    $charts = Join-Path $WorkDir "charts"
    if (Test-Path -LiteralPath $charts) { Remove-Item -LiteralPath $charts -Recurse -Force }
    New-Item -ItemType Directory -Force -Path $charts | Out-Null

    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    $excel.ScreenUpdating = $false
    $book = $excel.Workbooks.Add()
    while ($book.Worksheets.Count -gt 1) { $book.Worksheets.Item($book.Worksheets.Count).Delete() }
    $book.Worksheets.Item(1).Name = "Start"

    # --- the tables ---
    $num = @{ Qty = "number"; NetSales = "number" }
    $salesSheet = Add-Table $book "Sales" $sales @("Month", "Channel", "CountryCode", "CountryName", "ModelCode", "ModelName", "Qty", "NetSales", "SourceFile") $num "tblSales"
    $last = $sales.Count + 1
    $salesSheet.Range("D2:D$last").NumberFormat = "General"
    $salesSheet.Range("F2:F$last").NumberFormat = "General"
    $salesSheet.Range("D2:D$last").Formula = '=VLOOKUP(C2,Countries!$A:$B,2,FALSE)'
    $salesSheet.Range("F2:F$last").Formula = '=VLOOKUP(E2,Models!$A:$B,2,FALSE)'
    $salesSheet.Range("G2:H$last").NumberFormat = "#,##0"
    [void](Add-Table $book "Shipments" (Read-Table "Shipments.csv") @("Month", "Channel", "Shipments", "Units", "FreightEGP", "SourceFile") @{ Shipments = "number"; Units = "number"; FreightEGP = "number" } "tblShipments")
    [void](Add-Table $book "Returns" (Read-Table "Returns.csv") @("ModelCode", "Month", "Returned") @{ Returned = "number" } "tblReturns")
    [void](Add-Table $book "Targets" (Read-Table "Targets.csv") @("Channel", "TargetUnits", "TargetSales") @{ TargetUnits = "number"; TargetSales = "number" } "tblTargets")
    [void](Add-Table $book "Sources" (Read-Table "Sources.csv") @("Kind", "File", "Rows", "Total") @{ Rows = "number"; Total = "number" } "tblSources")
    [void](Add-Table $book "Models" (Read-Table "Models.csv") @("ModelCode", "ModelName") @{} "tblModels")
    [void](Add-Table $book "Countries" (Read-Table "Countries.csv") @("CountryCode", "CountryName") @{} "tblCountries")
    $excel.Calculate()
    $missing = $excel.WorksheetFunction.CountIf($salesSheet.Range("D2:F$last"), "#N/A")
    if ($missing -gt 0) { Stop-Tool "$missing names show #N/A: a code is missing from Masters" }
    Write-Log ("tables: tblSales ({0} rows, VLOOKUP for CountryName and ModelName), tblShipments, tblReturns, tblTargets, tblSources" -f $sales.Count)
    Write-Log "check passed: no #N/A in CountryName or ModelName"

    # --- pivots ---
    $pivots = Add-Sheet $book "Pivots"
    $cache = $book.PivotCaches().Create(1, "tblSales", 6)
    $ptMonth = $cache.CreatePivotTable($pivots.Range("A3"), "PT_ChannelMonth", $true, 6)
    $ptMonth.PivotFields("Channel").Orientation = 1
    $ptMonth.PivotFields("Month").Orientation = 2
    [void]$ptMonth.AddDataField($ptMonth.PivotFields("NetSales"), "Net sales (EGP)", -4157)
    $ptModel = $cache.CreatePivotTable($pivots.Range("H3"), "PT_Model", $true, 6)
    $ptModel.PivotFields("ModelName").Orientation = 1
    [void]$ptModel.AddDataField($ptModel.PivotFields("Qty"), "Sets", -4157)
    $ptModel.PivotFields("ModelName").AutoSort(2, "Sets")
    foreach ($pt in @($ptMonth, $ptModel)) { $pt.TableRange1.NumberFormat = "#,##0" }
    $pivots.Range("A1").Value2 = "Pivot tables on tblSales - Data > Refresh All updates them"

    # --- Report: every figure a formula ---
    $rep = Add-Sheet $book "Report"
    $rep.Range("A:A").NumberFormat = "@"
    $rep.Range("A1").Value2 = "Commercial review - third quarter 2026"
    $rep.Range("A2").Value2 = "Every figure is a formula on the tables: Sales, Shipments, Returns, Targets"
    $rep.Range("A4").Value2 = "Net sales (EGP)";       $rep.Range("B4").Formula = "=SUM(tblSales[NetSales])"
    $rep.Range("A5").Value2 = "Sets sold";             $rep.Range("B5").Formula = "=SUM(tblSales[Qty])"
    $rep.Range("A6").Value2 = "Achievement";           $rep.Range("B6").Formula = "=B4/SUM(tblTargets[TargetSales])"
    $rep.Range("A7").Value2 = "Freight per set (EGP)"; $rep.Range("B7").Formula = "=SUM(tblShipments[FreightEGP])/SUM(tblShipments[Units])"
    $rep.Range("A8").Value2 = "Sets returned";         $rep.Range("B8").Formula = "=SUM(tblReturns[Returned])"
    $head = @("Channel", "Net sales", "Target", "Achievement", "Sets", "Shipments", "Freight (EGP)", "Freight per set")
    for ($c = 0; $c -lt $head.Count; $c++) { $rep.Cells.Item(10, $c + 1).Value2 = $head[$c] }
    $channels = @("Cairo", "Alexandria", "Delta", "Export")
    for ($i = 0; $i -lt 4; $i++) {
        $r = 11 + $i
        $rep.Cells.Item($r, 1).Value2 = $channels[$i]
        $rep.Cells.Item($r, 2).Formula = "=SUMIFS(tblSales[NetSales],tblSales[Channel],A$r)"
        $rep.Cells.Item($r, 3).Formula = "=SUMIFS(tblTargets[TargetSales],tblTargets[Channel],A$r)"
        $rep.Cells.Item($r, 4).Formula = "=B$r/C$r"
        $rep.Cells.Item($r, 5).Formula = "=SUMIFS(tblSales[Qty],tblSales[Channel],A$r)"
        $rep.Cells.Item($r, 6).Formula = "=SUMIFS(tblShipments[Shipments],tblShipments[Channel],A$r)"
        $rep.Cells.Item($r, 7).Formula = "=SUMIFS(tblShipments[FreightEGP],tblShipments[Channel],A$r)"
        $rep.Cells.Item($r, 8).Formula = "=G$r/SUMIFS(tblShipments[Units],tblShipments[Channel],A$r)"
    }
    $rep.Range("A17").Value2 = "Month"; $rep.Range("B17").Value2 = "Net sales"
    $months = @("2026-07", "2026-08", "2026-09")
    for ($i = 0; $i -lt 3; $i++) {
        $r = 18 + $i
        $rep.Cells.Item($r, 1).Value2 = $months[$i]
        $rep.Cells.Item($r, 2).Formula = "=SUMIFS(tblSales[NetSales],tblSales[Month],A$r)"
    }
    $rep.Range("A23").Value2 = "Export country"; $rep.Range("B23").Value2 = "Net sales"
    $r = 24
    foreach ($country in $summary.countries.PSObject.Properties.Name) {   # largest first, as step 2 sorted them
        $rep.Cells.Item($r, 1).Value2 = $country
        $rep.Cells.Item($r, 2).Formula = "=SUMIFS(tblSales[NetSales],tblSales[CountryName],A$r,tblSales[Channel],""Export"")"
        $r++
    }
    $lastCountry = $r - 1
    $returnsTop = $r + 1
    $rep.Cells.Item($returnsTop, 1).Value2 = "Model"; $rep.Cells.Item($returnsTop, 2).Value2 = "Name"
    $rep.Cells.Item($returnsTop, 3).Value2 = "Returned"; $rep.Cells.Item($returnsTop, 4).Value2 = "Sold"; $rep.Cells.Item($returnsTop, 5).Value2 = "Return rate"
    $r = $returnsTop + 1
    foreach ($m in $summary.returnRates) {   # highest rate first, as step 2 sorted them
        $rep.Cells.Item($r, 1).Value2 = [string]$m.mc
        $rep.Cells.Item($r, 2).Formula = ('=VLOOKUP(A{0},Models!$A:$B,2,FALSE)' -f $r)
        $rep.Cells.Item($r, 3).Formula = "=SUMIFS(tblReturns[Returned],tblReturns[ModelCode],A$r)"
        $rep.Cells.Item($r, 4).Formula = "=SUMIFS(tblSales[Qty],tblSales[ModelCode],A$r)"
        $rep.Cells.Item($r, 5).Formula = "=C$r/D$r"
        $r++
    }
    $rep.Range("B4:B5").NumberFormat = "#,##0"; $rep.Range("B6").NumberFormat = "0.0%"; $rep.Range("B7").NumberFormat = "#,##0.0"; $rep.Range("B8").NumberFormat = "#,##0"
    $rep.Range("B11:C14").NumberFormat = "#,##0"; $rep.Range("D11:D14").NumberFormat = "0.0%"; $rep.Range("E11:G14").NumberFormat = "#,##0"; $rep.Range("H11:H14").NumberFormat = "#,##0.0"
    $rep.Range("B18:B$lastCountry").NumberFormat = "#,##0"
    $rep.Range("C$($returnsTop + 1):D$r").NumberFormat = "#,##0"; $rep.Range("E$($returnsTop + 1):E$r").NumberFormat = "0.0%"
    foreach ($cell in @("A1", "A4:A8", "A10:H10", "A17:B17", "A23:B23", "A$($returnsTop):E$($returnsTop)")) { $rep.Range($cell).Font.Bold = $true }
    $rep.Range("A1").Font.Size = 16
    [void]$rep.UsedRange.EntireColumn.AutoFit()
    Write-Log "Report sheet: key figures, channels, months, export countries and return rates, all formulas"

    # --- the checks: the workbook's own figures against the source files ---
    $excel.CalculateFull()
    Assert-Same "net sales (Report)" $rep.Range("B4").Value2 $summary.salesValue
    Assert-Same "sets sold (Report)" $rep.Range("B5").Value2 $summary.salesQty
    Assert-Same "achievement % (Report)" ($rep.Range("B6").Value2 * 100) $summary.achievementAll 0.05
    Assert-Same "freight per set (Report)" $rep.Range("B7").Value2 $summary.freightPerSet 0.05
    Assert-Same "sets returned (Report)" $rep.Range("B8").Value2 $summary.returns
    Assert-Same "grand total of PT_ChannelMonth" $ptMonth.GetPivotData("Net sales (EGP)").Value2 $summary.salesValue
    for ($i = 0; $i -lt 4; $i++) {
        $ch = $channels[$i]
        Assert-Same "$ch net sales" $rep.Cells.Item(11 + $i, 2).Value2 $summary.channels.$ch.v
        Assert-Same "$ch achievement %" ($rep.Cells.Item(11 + $i, 4).Value2 * 100) $summary.achievement.$ch 0.05
    }

    # --- the charts, kept in the workbook and saved as pictures for the deck ---
    $chartSheet = Add-Sheet $book "Charts"
    Add-Chart $chartSheet 51 "A10:C14" "Net sales against target by channel (EGP)" 20 20 (Join-Path $charts "1_channels.png")
    Add-Chart $chartSheet 4 "A17:B20" "Net sales by month (EGP)" 560 20 (Join-Path $charts "2_months.png")
    Add-Chart $chartSheet 57 "A23:B$lastCountry" "Export sales by country (EGP)" 20 340 (Join-Path $charts "3_countries.png")
    Add-Chart $chartSheet 51 "A10:A14,H10:H14" "Freight per set by channel (EGP)" 560 340 (Join-Path $charts "4_freight.png")
    Write-Log "Charts sheet: four charts, saved as pictures in Output\Work\charts"

    # --- the figures the deck shows, read back from the workbook ---
    $deck = [ordered]@{
        netSales = $rep.Range("B4").Value2; sets = $rep.Range("B5").Value2; achievement = $rep.Range("B6").Value2
        freightPerSet = $rep.Range("B7").Value2; returned = $rep.Range("B8").Value2
        shipments = $excel.WorksheetFunction.Sum($rep.Range("F11:F14")); channels = @(); returns = @()
    }
    for ($i = 0; $i -lt 4; $i++) {
        $r = 11 + $i
        $deck.channels += [ordered]@{ channel = $channels[$i]; sales = $rep.Cells.Item($r, 2).Value2; target = $rep.Cells.Item($r, 3).Value2; achievement = $rep.Cells.Item($r, 4).Value2; freightPerSet = $rep.Cells.Item($r, 8).Value2 }
    }
    for ($r = $returnsTop + 1; $r -le $returnsTop + 3; $r++) {
        $deck.returns += [ordered]@{ model = $rep.Cells.Item($r, 1).Value2; name = $rep.Cells.Item($r, 2).Value2; returned = $rep.Cells.Item($r, 3).Value2; sold = $rep.Cells.Item($r, 4).Value2; rate = $rep.Cells.Item($r, 5).Value2 }
    }
    [IO.File]::WriteAllText((Join-Path $WorkDir "deck_figures.json"), ($deck | ConvertTo-Json -Depth 4), (New-Object Text.UTF8Encoding $false))

    # --- save: Report first ---
    $book.Worksheets.Item("Start").Delete()
    $rep.Move($book.Worksheets.Item(1))
    $chartSheet.Move([Type]::Missing, $rep)
    $rep.Activate()
    $excel.ScreenUpdating = $true
    $target = Join-Path $OutDir "Q3_Commercial_Review.xlsx"
    Save-Previous $target
    $book.SaveAs($target, 51)
    Write-Log "wrote Output\Q3_Commercial_Review.xlsx and Output\Work\deck_figures.json"
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
