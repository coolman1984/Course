# Ready tool, unit 3, example 2 - step 4 of 4: PowerPoint builds the 8-slide review deck through COM.
#
# Every number on the slides comes from Output\Work\deck_figures.json, which step 3 read back from the workbook,
# and every chart is the picture step 3 saved from it. Writes Output\Q3_Commercial_Review.pptx and its PDF.
# The last slide is left empty for the director's own conclusions: the tool never writes them.

$StepName = "4_deck"
. (Join-Path $PSScriptRoot "common.ps1")

$Ink = Get-Rgb 31 41 55
$Accent = Get-Rgb 47 95 230
$Soft = Get-Rgb 232 238 253
$Grey = Get-Rgb 100 110 125

function Add-Text($Slide, [string]$Text, [single]$Left, [single]$Top, [single]$Width, [single]$Height, [single]$Size, [int]$Color, [bool]$Bold = $false) {
    $box = $Slide.Shapes.AddTextbox(1, $Left, $Top, $Width, $Height)   # msoTextOrientationHorizontal
    $range = $box.TextFrame.TextRange
    $range.Text = $Text
    $range.Font.Name = "Segoe UI"
    $range.Font.Size = $Size
    $range.Font.Color.RGB = $Color
    $range.Font.Bold = $(if ($Bold) { -1 } else { 0 })
    $box.TextFrame.WordWrap = -1
    Close-Com $range; Close-Com $box
}

function New-Slide($Deck, [string]$Title, [string]$Subtitle = "") {
    $slide = $Deck.Slides.Add($Deck.Slides.Count + 1, 12)   # ppLayoutBlank
    $bar = $slide.Shapes.AddShape(1, 0, 0, 12, 540)            # a thin accent bar on the left
    $bar.Fill.ForeColor.RGB = $Accent; $bar.Line.Visible = 0
    Close-Com $bar
    Add-Text $slide $Title 40 28 860 50 28 $Ink $true
    if ($Subtitle) { Add-Text $slide $Subtitle 40 78 860 30 14 $Grey }
    return $slide
}

function Add-Figure($Slide, [string]$Value, [string]$Label, [single]$Left, [single]$Top) {
    $card = $Slide.Shapes.AddShape(5, $Left, $Top, 200, 120)   # msoShapeRoundedRectangle
    $card.Fill.ForeColor.RGB = $Soft; $card.Line.Visible = 0
    Close-Com $card
    Add-Text $Slide $Value ($Left + 12) ($Top + 18) 176 50 26 $Accent $true
    Add-Text $Slide $Label ($Left + 12) ($Top + 70) 176 40 13 $Grey
}

function Add-Picture($Slide, [string]$Path, [single]$Left, [single]$Top, [single]$Width, [single]$Height) {
    if (-not (Test-Path -LiteralPath $Path)) { Stop-Tool "missing chart picture $Path : run step 3 first" }
    $pic = $Slide.Shapes.AddPicture($Path, 0, -1, $Left, $Top, $Width, $Height)   # LinkToFile = false, SaveWithDocument = true
    Close-Com $pic
}

$n0 = { param($x) ([double]$x).ToString("#,##0", $Invariant) }
$n1 = { param($x) ([double]$x).ToString("#,##0.0", $Invariant) }
$p1 = { param($x) ([double]$x * 100).ToString("0.0", $Invariant) + "%" }

$code = 0
$app = $null
$deck = $null
try {
    Write-Log "start"
    $figuresPath = Join-Path $WorkDir "deck_figures.json"
    if (-not (Test-Path -LiteralPath $figuresPath)) { Stop-Tool "missing Output\Work\deck_figures.json : run step 3 first" }
    $f = Get-Content -LiteralPath $figuresPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $summary = Read-Summary
    Assert-Same "net sales (workbook against source files)" $f.netSales $summary.salesValue
    $charts = Join-Path $WorkDir "charts"

    $app = New-Object -ComObject PowerPoint.Application
    $deck = $app.Presentations.Add(0)   # msoFalse: no window
    $deck.PageSetup.SlideWidth = 960
    $deck.PageSetup.SlideHeight = 540

    # 1. title
    $s = New-Slide $deck "Q3 2026 commercial review" "Period: 1 July to 30 September 2026 - figures in EGP"
    Add-Text $s "Sales, targets, logistics and returns, from the branch workbooks, the system PDF reports and the Word memos." 40 200 820 80 20 $Ink
    Close-Com $s
    # 2. key figures
    $s = New-Slide $deck "Key figures" "The quarter in four numbers"
    Add-Figure $s ((& $n0 ($f.netSales / 1000000)) + " M") "net sales (EGP)" 40 150
    Add-Figure $s (& $n0 $f.sets) "sets sold" 260 150
    Add-Figure $s (& $p1 $f.achievement) "achievement against target" 480 150
    Add-Figure $s (& $n1 $f.freightPerSet) "freight per set (EGP)" 700 150
    Close-Com $s
    # 3. sales against target
    $s = New-Slide $deck "Sales against target by channel"
    Add-Picture $s (Join-Path $charts "1_channels.png") 30 110 560 323
    $lines = @($f.channels | ForEach-Object { "{0}: {1} of target" -f $_.channel, (& $p1 $_.achievement) })
    Add-Text $s ($lines -join [string][char]13) 620 150 300 220 18 $Ink
    Close-Com $s
    # 4. monthly trend
    $s = New-Slide $deck "Monthly trend" "Net sales per month, all channels"
    Add-Picture $s (Join-Path $charts "2_months.png") 150 110 660 380
    Close-Com $s
    # 5. export by country
    $s = New-Slide $deck "Export sales by country"
    Add-Picture $s (Join-Path $charts "3_countries.png") 150 100 660 400
    Close-Com $s
    # 6. logistics
    $s = New-Slide $deck "Logistics" ("{0} shipments carried {1} sets; freight per set {2} EGP" -f (& $n0 $f.shipments), (& $n0 $f.sets), (& $n1 $f.freightPerSet))
    Add-Picture $s (Join-Path $charts "4_freight.png") 30 120 560 323
    $lines = @($f.channels | ForEach-Object { "{0}: {1} EGP per set" -f $_.channel, (& $n1 $_.freightPerSet) })
    Add-Text $s ($lines -join [string][char]13) 620 160 300 220 18 $Ink
    Close-Com $s
    # 7. returns
    $s = New-Slide $deck "Returns" ("{0} sets returned in the quarter; the three highest return rates:" -f (& $n0 $f.returned))
    $shape = $s.Shapes.AddTable(4, 4, 60, 140, 840, 220)
    $table = $shape.Table
    $head = @("Model", "Name", "Returned / sold", "Return rate")
    for ($c = 1; $c -le 4; $c++) { $table.Cell(1, $c).Shape.TextFrame.TextRange.Text = $head[$c - 1] }
    $r = 2
    foreach ($m in $f.returns) {
        $table.Cell($r, 1).Shape.TextFrame.TextRange.Text = [string]$m.model
        $table.Cell($r, 2).Shape.TextFrame.TextRange.Text = [string]$m.name
        $table.Cell($r, 3).Shape.TextFrame.TextRange.Text = "{0} / {1}" -f (& $n0 $m.returned), (& $n0 $m.sold)
        $table.Cell($r, 4).Shape.TextFrame.TextRange.Text = & $p1 $m.rate
        $r++
    }
    Close-Com $table; Close-Com $shape; Close-Com $s
    # 8. for discussion: left for the director
    $s = New-Slide $deck "For discussion" "The director's conclusions and decisions"
    Close-Com $s

    if ($deck.Slides.Count -ne 8) { Stop-Tool ("the deck has {0} slides, not 8" -f $deck.Slides.Count) }
    Write-Log "check passed: 8 slides, every number read from the workbook"
    $pptx = Join-Path $OutDir "Q3_Commercial_Review.pptx"
    $pdf = Join-Path $OutDir "Q3_Commercial_Review.pdf"
    Save-Previous $pptx; Save-Previous $pdf
    $deck.SaveAs($pptx, 24)   # ppSaveAsOpenXMLPresentation
    $deck.SaveAs($pdf, 32)    # ppSaveAsPDF
    Write-Log "wrote Output\Q3_Commercial_Review.pptx and Output\Q3_Commercial_Review.pdf"
    Write-Log "done"
} catch {
    Write-Log ("STOPPED: " + $_.Exception.Message)
    $code = 1
} finally {
    if ($null -ne $deck) { $deck.Close(); Close-Com $deck }
    if ($null -ne $app) { $app.Quit(); Close-Com $app }
    Clear-Com
}
exit $code
