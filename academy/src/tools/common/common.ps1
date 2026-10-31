# Shared by every script of the ready tool: the folders, the run log, a clean stop, and COM clean-up.
# Windows PowerShell 5.1 (on every company laptop). No modules to install. Dot-source it:  . "$PSScriptRoot\common.ps1"

$ErrorActionPreference = "Stop"
$Invariant = [Globalization.CultureInfo]::InvariantCulture

# The example folder: the first folder above the script that holds Data (Ready_Tool sits inside it).
$Root = $null
$probe = $PSScriptRoot
for ($i = 0; $i -lt 4 -and $probe; $i++) {
    if (Test-Path -LiteralPath (Join-Path $probe "Data") -PathType Container) { $Root = $probe; break }
    $probe = Split-Path -Parent $probe
}
if (-not $Root) {
    Write-Host "STOPPED: no Data folder above $PSScriptRoot. Keep the Ready_Tool folder inside the example folder." -ForegroundColor Red
    exit 1
}
$ScriptsDir = $PSScriptRoot   # the scripts folder (this file sits in it)
$DataDir = (Resolve-Path -LiteralPath (Join-Path $Root "Data")).Path
$OutDir = Join-Path $Root "Output"
$WorkDir = Join-Path $OutDir "Work"
$ExportDir = Join-Path $WorkDir "Export"
$LogFile = Join-Path $OutDir "Run_Log.txt"
New-Item -ItemType Directory -Force -Path $OutDir, $WorkDir | Out-Null
if (-not $StepName) { $StepName = "tool" }

function Write-Log([string]$Message) {
    $line = "{0}  {1}  {2}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $StepName, $Message
    Write-Host $line
    [IO.File]::AppendAllText($LogFile, $line + [Environment]::NewLine, (New-Object Text.UTF8Encoding $false))
}

# Stop with a clear message: the script's catch block writes it to the log, and its finally block closes Office.
function Stop-Tool([string]$Message) { throw $Message }

function Close-Com($Object) {
    if ($null -ne $Object) { try { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($Object) } catch { } }
}

function Clear-Com {
    [GC]::Collect(); [GC]::WaitForPendingFinalizers(); [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}

# A file the previous run wrote is moved to Output\Previous\ with the time, never overwritten.
function Save-Previous([string]$Path) {
    if (Test-Path -LiteralPath $Path) {
        $old = Join-Path $OutDir "Previous"
        New-Item -ItemType Directory -Force -Path $old | Out-Null
        $name = [IO.Path]::GetFileNameWithoutExtension($Path) + "_" + (Get-Date -Format "yyyyMMdd_HHmmss") + [IO.Path]::GetExtension($Path)
        Move-Item -LiteralPath $Path -Destination (Join-Path $old $name)
    }
}

function Read-Table([string]$Name) {
    $path = Join-Path $WorkDir $Name
    if (-not (Test-Path -LiteralPath $path)) { Stop-Tool "missing Output\Work\$Name : run the step before this one first" }
    return @(Import-Csv -LiteralPath $path -Encoding UTF8)
}

function Read-Summary {
    $path = Join-Path $WorkDir "summary.json"
    if (-not (Test-Path -LiteralPath $path)) { Stop-Tool "missing Output\Work\summary.json : run step 2 first" }
    return (Get-Content -LiteralPath $path -Raw -Encoding UTF8 | ConvertFrom-Json)
}

# Rows of a CSV as one 2-D block for Excel: one write through COM instead of one per cell (much faster).
# Types: "date" (yyyy-mm-dd -> an Excel date), "number", or text (the default).
function ConvertTo-Grid($Rows, [string[]]$Columns, [hashtable]$Types) {
    $Rows = @($Rows)
    $grid = New-Object 'object[,]' ($Rows.Count + 1), $Columns.Count
    for ($c = 0; $c -lt $Columns.Count; $c++) { $grid[0, $c] = $Columns[$c] }
    for ($r = 0; $r -lt $Rows.Count; $r++) {
        for ($c = 0; $c -lt $Columns.Count; $c++) {
            $name = $Columns[$c]
            $value = [string]$Rows[$r].$name
            if ($Types.ContainsKey($name) -and $Types[$name] -eq "date") {
                $grid[($r + 1), $c] = [DateTime]::ParseExact($value, "yyyy-MM-dd", $Invariant).ToOADate()
            } elseif ($Types.ContainsKey($name) -and $Types[$name] -eq "number") {
                $grid[($r + 1), $c] = [double]::Parse($value, $Invariant)
            } else {
                $grid[($r + 1), $c] = $value
            }
        }
    }
    return , $grid
}

function Write-Grid($Sheet, $Grid, [int]$Row = 1, [int]$Column = 1) {
    $rows = $Grid.GetLength(0); $cols = $Grid.GetLength(1)
    $range = $Sheet.Range($Sheet.Cells.Item($Row, $Column), $Sheet.Cells.Item($Row + $rows - 1, $Column + $cols - 1))
    $range.Value2 = $Grid
    Close-Com $range
}

function Get-ColumnLetter([int]$Number) {
    $s = ""
    while ($Number -gt 0) { $m = ($Number - 1) % 26; $s = [char](65 + $m) + $s; $Number = [int][math]::Floor(($Number - 1) / 26) }
    return $s
}

function Add-Sheet($Workbook, [string]$Name) {
    $last = $Workbook.Worksheets.Item($Workbook.Worksheets.Count)
    $sheet = $Workbook.Worksheets.Add([Type]::Missing, $last)
    $sheet.Name = $Name
    return $sheet
}

# Office colours are blue-green-red: RGB(r, g, b) = r + 256*g + 65536*b
function Get-Rgb([int]$R, [int]$G, [int]$B) { return $R + 256 * $G + 65536 * $B }

# Two numbers are the same figure when they differ by less than half a unit of the last digit shown.
function Test-Same([double]$A, [double]$B, [double]$Tolerance = 0.5) { return [math]::Abs($A - $B) -lt $Tolerance }

function Assert-Same([string]$What, [double]$Got, [double]$Expected, [double]$Tolerance = 0.5) {
    if (-not (Test-Same $Got $Expected $Tolerance)) { Stop-Tool "check failed: $What is $Got in the workbook, but $Expected in the source files" }
    Write-Log ("check passed: {0} = {1}" -f $What, $Got.ToString("#,##0.###", $Invariant))
}

# Python 3 on this laptop: "python", or the "py" launcher. The Microsoft Store shortcut does not count.
function Find-Python {
    $ErrorActionPreference = "Continue"
    foreach ($candidate in @(@("python"), @("py", "-3"))) {
        if (-not (Get-Command $candidate[0] -ErrorAction SilentlyContinue)) { continue }
        $pre = @($candidate | Select-Object -Skip 1)
        try { $answer = & $candidate[0] @pre -c "import sys; print(sys.version_info[0])" 2>$null } catch { continue }
        if ($LASTEXITCODE -eq 0 -and ("$answer").Trim() -eq "3") { return , $candidate }
    }
    return $null
}

# Runs the tool's steps in order, each in its own process, and stops at the first step that fails.
# A step is @{ Title = "..."; Kind = "ps" or "py"; File = "<script in scripts\>" }.
function Invoke-Tool([string]$Title, $Steps, [string[]]$Open) {
    $tool = Split-Path -Parent $ScriptsDir
    Get-ChildItem -LiteralPath $tool -Recurse -File | Unblock-File -ErrorAction SilentlyContinue   # files from a zip
    $env:PYTHONIOENCODING = "utf-8"
    Write-Log ("=== {0} ===" -f $Title)
    Write-Log ("example folder: " + $Root)
    $python = $null
    if (@($Steps | Where-Object { $_.Kind -eq "py" }).Count -gt 0) {
        $python = Find-Python
        if ($null -eq $python) {
            Write-Log "STOPPED: Python 3 was not found (neither python nor py). Ask IT for the approved Python; do not download it yourself."
            return 1
        }
        Write-Log ("Python found: " + ($python -join " "))
    }
    $shell = Join-Path $PSHOME "powershell.exe"
    $n = 0
    foreach ($step in $Steps) {
        $n++
        Write-Log ("--- step {0} of {1}: {2}" -f $n, @($Steps).Count, $step.Title)
        $file = Join-Path $ScriptsDir $step.File
        if ($step.Kind -eq "py") {
            $pre = @($python | Select-Object -Skip 1)
            & $python[0] @pre $file | Out-Host
        } else {
            & $shell -NoProfile -ExecutionPolicy Bypass -File $file | Out-Host
        }
        if ($LASTEXITCODE -ne 0) {
            Write-Log ("STOPPED at step {0} of {1}. The reason is in the lines just above (and in Output\Run_Log.txt)." -f $n, @($Steps).Count)
            return 1
        }
    }
    Write-Log "ALL STEPS PASSED: every check matched the source files. The results are in the Output folder."
    foreach ($name in $Open) {
        $path = Join-Path $OutDir $name
        if (Test-Path -LiteralPath $path) { Invoke-Item -LiteralPath $path }
    }
    return 0
}
