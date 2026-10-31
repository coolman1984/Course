# Ready tool - step 1: Excel and Word read the source files through COM and write each sheet and each table as CSV.
#
# Why COM: on a laptop with a DRM (for example NASCA), Office files are encrypted on disk and only Office itself may
# open them. Python cannot read them, but Excel and Word can, and through COM a script drives them like your hands.
# PowerShell then writes the values as plain CSV text in Output\Work\Export\, which step 2 (pure Python) reads.
# Every file in Data\ is opened READ-ONLY and nothing is saved there.
# If Excel or Word is not installed, the step says so and step 2 reads the files directly (unprotected files only).

$StepName = "1_export"
. (Join-Path $PSScriptRoot "common.ps1")

function ConvertTo-CsvField($Value) {
    if ($null -eq $Value) { return "" }
    if ($Value -is [double]) { $s = $Value.ToString("R", $Invariant) } else { $s = [string]$Value }
    if ($s.IndexOfAny([char[]]@('"', ',', [char]13, [char]10)) -ge 0) { return '"' + $s.Replace('"', '""') + '"' }
    return $s
}

function Get-ExportPath($File, [string]$Part) {
    $relative = $File.FullName.Substring($DataDir.Length).TrimStart([char[]]@('\', '/'))
    return Join-Path $ExportDir (($relative -replace '[\\/]', '__') + "__" + $Part + ".csv")
}

function Save-Lines([string]$Path, $Lines) {
    [IO.File]::WriteAllLines($Path, [string[]]$Lines.ToArray(), (New-Object Text.UTF8Encoding $true))
}

$code = 0
$excel = $null
$word = $null
try {
    Write-Log "start"
    if (Test-Path -LiteralPath $ExportDir) { Remove-Item -LiteralPath $ExportDir -Recurse -Force }
    New-Item -ItemType Directory -Force -Path $ExportDir | Out-Null
    $all = @(Get-ChildItem -LiteralPath $DataDir -Recurse -File | Where-Object { -not $_.Name.StartsWith("~$") })
    $books = @($all | Where-Object { $_.Extension -eq ".xlsx" })
    $docs = @($all | Where-Object { $_.Extension -eq ".docx" })
    Write-Log ("found {0} Excel files and {1} Word files in Data" -f $books.Count, $docs.Count)

    if ($books.Count -gt 0) {
        try { $excel = New-Object -ComObject Excel.Application } catch { $excel = $null }
        if ($null -eq $excel) {
            Write-Log "Excel is not available through COM: step 2 will read the .xlsx files directly (works only if they are not protected)"
        } else {
            $excel.Visible = $false
            $excel.DisplayAlerts = $false
            $excel.AskToUpdateLinks = $false
            foreach ($file in $books) {
                $book = $null
                try {
                    $book = $excel.Workbooks.Open($file.FullName, 0, $true)   # UpdateLinks = 0, ReadOnly = true
                    foreach ($sheet in $book.Worksheets) {
                        $used = $sheet.UsedRange
                        $lastRow = $used.Row + $used.Rows.Count - 1
                        $lastCol = $used.Column + $used.Columns.Count - 1
                        $block = $sheet.Range($sheet.Cells.Item(1, 1), $sheet.Cells.Item($lastRow, $lastCol))
                        $values = $block.Value2   # the whole sheet in one read
                        $lines = New-Object 'System.Collections.Generic.List[string]'
                        if ($values -is [array]) {
                            for ($r = 1; $r -le $lastRow; $r++) {
                                $fields = New-Object 'System.Collections.Generic.List[string]'
                                for ($c = 1; $c -le $lastCol; $c++) { $fields.Add((ConvertTo-CsvField $values[$r, $c])) }
                                $lines.Add([string]::Join(",", $fields.ToArray()))
                            }
                        } else {
                            $lines.Add((ConvertTo-CsvField $values))
                        }
                        Save-Lines (Get-ExportPath $file $sheet.Name) $lines
                        Write-Log ("exported {0}, sheet {1}: {2} rows" -f $file.Name, $sheet.Name, ($lines.Count - 1))
                        Close-Com $block; Close-Com $used; Close-Com $sheet
                    }
                } finally {
                    if ($null -ne $book) { $book.Close($false); Close-Com $book }
                }
            }
        }
    }

    if ($docs.Count -gt 0) {
        try { $word = New-Object -ComObject Word.Application } catch { $word = $null }
        if ($null -eq $word) {
            Write-Log "Word is not available through COM: step 2 will read the .docx files directly (works only if they are not protected)"
        } else {
            $word.Visible = $false
            $word.DisplayAlerts = 0   # wdAlertsNone
            foreach ($file in $docs) {
                $doc = $null
                try {
                    $doc = $word.Documents.Open($file.FullName, $false, $true)   # ConfirmConversions = false, ReadOnly = true
                    for ($t = 1; $t -le $doc.Tables.Count; $t++) {
                        $table = $doc.Tables.Item($t)
                        $lines = New-Object 'System.Collections.Generic.List[string]'
                        for ($r = 1; $r -le $table.Rows.Count; $r++) {
                            $fields = New-Object 'System.Collections.Generic.List[string]'
                            for ($c = 1; $c -le $table.Columns.Count; $c++) {
                                $text = $table.Cell($r, $c).Range.Text.TrimEnd([char[]]@([char]13, [char]7)).Trim()
                                $fields.Add((ConvertTo-CsvField $text))
                            }
                            $lines.Add([string]::Join(",", $fields.ToArray()))
                        }
                        Save-Lines (Get-ExportPath $file ("Table" + $t)) $lines
                        Write-Log ("exported {0}, table {1}: {2} rows" -f $file.Name, $t, ($lines.Count - 1))
                        Close-Com $table
                    }
                } finally {
                    if ($null -ne $doc) { $doc.Close(0); Close-Com $doc }   # wdDoNotSaveChanges
                }
            }
        }
    }
    Write-Log "done"
} catch {
    Write-Log ("STOPPED: " + $_.Exception.Message)
    $code = 1
} finally {
    if ($null -ne $excel) { $excel.Quit(); Close-Com $excel }
    if ($null -ne $word) { $word.Quit(); Close-Com $word }
    Clear-Com
}
exit $code
