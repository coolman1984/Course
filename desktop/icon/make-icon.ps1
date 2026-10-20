# Draws the course brand mark (A.logo in academy/src/data/ui.js on the .brand-mark tile) as a
# multi-size Windows icon: desktop\AI_Academy.ico (+ PNG previews in desktop\icon\png).
# Small sizes get a thicker stroke and a larger glyph so they stay readable in the title bar.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$here = $PSScriptRoot
$pngDir = Join-Path $here 'png'
New-Item -ItemType Directory -Force $pngDir | Out-Null

$hi = [Drawing.ColorTranslator]::FromHtml('#4a77f2')
$lo = [Drawing.ColorTranslator]::FromHtml('#2f5fe6')
$edge = [Drawing.ColorTranslator]::FromHtml('#1d45c4')

function RoundRect([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = [Drawing.Drawing2D.GraphicsPath]::new(); $d = 2 * $r
  $p.AddArc($x, $y, $d, $d, 180, 90); $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90); $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure(); $p
}

function Draw([int]$size) {
  $bmp = [Drawing.Bitmap]::new($size, $size, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.PixelOffsetMode = 'HighQuality'; $g.Clear([Drawing.Color]::Transparent)

  $m = if ($size -le 24) { 0 } elseif ($size -le 48) { 1 } else { [math]::Round($size * 0.06) }
  $t = $size - 2 * $m
  $tile = RoundRect $m $m $t $t ($t * 0.225)
  $fill = [Drawing.Drawing2D.LinearGradientBrush]::new([Drawing.PointF]::new(0, $m), [Drawing.PointF]::new(0, $m + $t), $hi, $lo)
  $g.FillPath($fill, $tile)
  if ($size -ge 32) {
    # soft top highlight and a thin darker rim, as on the web tile
    $shine = [Drawing.Drawing2D.LinearGradientBrush]::new([Drawing.PointF]::new(0, $m - 1), [Drawing.PointF]::new(0, $m + $t + 1),
      [Drawing.Color]::White, [Drawing.Color]::White)
    $blend = [Drawing.Drawing2D.ColorBlend]::new(3)
    $blend.Colors = [Drawing.Color]::FromArgb(40, 255, 255, 255), [Drawing.Color]::FromArgb(0, 255, 255, 255), [Drawing.Color]::FromArgb(0, 255, 255, 255)
    $blend.Positions = [float[]](0, 0.55, 1)
    $shine.InterpolationColors = $blend
    $g.FillPath($shine, $tile)
    $g.DrawPath([Drawing.Pen]::new([Drawing.Color]::FromArgb(90, $edge), [math]::Max(1, $size / 128)), $tile)
  }

  # glyph: 24-unit viewBox, 63% of the tile like the 19px glyph on the 30px web tile
  $ratio = if ($size -le 20) { 0.86 } elseif ($size -le 32) { 0.76 } else { 0.66 }
  $s = $t * $ratio / 24
  $ox = $m + ($t - 24 * $s) / 2; $oy = $m + ($t - 24 * $s) / 2
  # up to 24px: whole-pixel strokes on the pixel grid so the rungs stay sharp
  $snap = $size -le 24
  $sw = if ($size -le 20) { 1 } elseif ($snap) { 2 } else { 1.9 * $s }
  $pen = [Drawing.Pen]::new([Drawing.Color]::White, $sw)
  $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
  $P = { param($x, $y)
    $px = $ox + $x * $s; $py = $oy + $y * $s
    if ($snap) { if ($sw % 2) { $px = [math]::Floor($px) + 0.5; $py = [math]::Floor($py) + 0.5 } else { $px = [math]::Round($px); $py = [math]::Round($py) } }
    [Drawing.PointF]::new($px, $py) }
  foreach ($l in @(@(6, 21, 6, 4), @(14, 21, 14, 8), @(6, 17, 14, 17), @(6, 13, 14, 13), @(6, 9, 9.5, 9))) {
    $g.DrawLine($pen, (& $P $l[0] $l[1]), (& $P $l[2] $l[3]))
  }
  $star = @(@(18.5, 2.6), @(19.4, 4.8), @(21.5, 5.6), @(19.4, 6.4), @(18.5, 8.6), @(17.6, 6.4), @(15.5, 5.6), @(17.6, 4.8)) |
    ForEach-Object { [Drawing.PointF]::new($ox + $_[0] * $s, $oy + $_[1] * $s) }
  if ($size -le 20) {
    # at 16-20px the sparkle is a bit larger so it does not vanish
    $c = [Drawing.PointF]::new($ox + 18.5 * $s, $oy + 5.6 * $s); $k = 1.25
    $star = $star | ForEach-Object { [Drawing.PointF]::new($c.X + ($_.X - $c.X) * $k, $c.Y + ($_.Y - $c.Y) * $k) }
  }
  $g.FillPolygon([Drawing.Brushes]::White, [Drawing.PointF[]]$star)
  $g.Dispose()
  $bmp
}

# ICO: 32-bit DIB frames below 256px (read by every Windows API), PNG frame at 256px
$sizes = 16, 20, 24, 32, 40, 48, 64, 96, 128, 256
$frames = foreach ($n in $sizes) {
  $bmp = Draw $n
  $bmp.Save((Join-Path $pngDir "icon-$n.png"), [Drawing.Imaging.ImageFormat]::Png)
  if ($n -ge 256) {
    $ms = [IO.MemoryStream]::new(); $bmp.Save($ms, [Drawing.Imaging.ImageFormat]::Png); , $ms.ToArray()
  } else {
    $ms = [IO.MemoryStream]::new(); $w = [IO.BinaryWriter]::new($ms)
    $w.Write([int]40); $w.Write([int]$n); $w.Write([int]($n * 2)); $w.Write([int16]1); $w.Write([int16]32)
    $w.Write([int]0); $w.Write([int]0); $w.Write([int]0); $w.Write([int]0); $w.Write([int]0); $w.Write([int]0)
    for ($y = $n - 1; $y -ge 0; $y--) { for ($x = 0; $x -lt $n; $x++) {
      $c = $bmp.GetPixel($x, $y); $w.Write([byte]$c.B); $w.Write([byte]$c.G); $w.Write([byte]$c.R); $w.Write([byte]$c.A) } }
    $stride = [math]::Ceiling($n / 32) * 4
    for ($y = $n - 1; $y -ge 0; $y--) { for ($i = 0; $i -lt $stride; $i++) {
      $b = 0; for ($j = 0; $j -lt 8; $j++) { $x = $i * 8 + $j; if ($x -lt $n -and $bmp.GetPixel($x, $y).A -eq 0) { $b = $b -bor (0x80 -shr $j) } }
      $w.Write([byte]$b) } }
    $w.Flush(); , $ms.ToArray()
  }
  $bmp.Dispose()
}

$out = [IO.MemoryStream]::new(); $w = [IO.BinaryWriter]::new($out)
$w.Write([int16]0); $w.Write([int16]1); $w.Write([int16]$sizes.Count)
$offset = 6 + 16 * $sizes.Count
for ($i = 0; $i -lt $sizes.Count; $i++) {
  $n = $sizes[$i]; $d = $frames[$i]
  $w.Write([byte]($n % 256)); $w.Write([byte]($n % 256)); $w.Write([byte]0); $w.Write([byte]0)
  $w.Write([int16]1); $w.Write([int16]32); $w.Write([int]$d.Length); $w.Write([int]$offset)
  $offset += $d.Length
}
foreach ($d in $frames) { $w.Write([byte[]]$d) }
$w.Flush()
$ico = Join-Path (Split-Path $here -Parent) 'AI_Academy.ico'
[IO.File]::WriteAllBytes($ico, $out.ToArray())
'Wrote {0} ({1:N0} bytes, sizes {2})' -f $ico, $out.Length, ($sizes -join ', ')
