$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$rootDir = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $rootDir "electron\assets\icon-source.png"
$runtimeIconPath = Join-Path $rootDir "electron\assets\icon.png"
$buildDir = Join-Path $rootDir "build"
$buildIconPath = Join-Path $buildDir "icon.png"
$buildIcoPath = Join-Path $buildDir "icon.ico"

if (-not (Test-Path -LiteralPath $sourcePath)) {
    throw "Icon source not found at $sourcePath"
}

New-Item -ItemType Directory -Force -Path $buildDir | Out-Null

$sourceImage = [System.Drawing.Image]::FromFile($sourcePath)

try {
    $sourceCropSize = [Math]::Min($sourceImage.Width, [Math]::Floor($sourceImage.Height * 0.62))
    $sourceCropX = [Math]::Floor(($sourceImage.Width - $sourceCropSize) / 2)
    $sourceCropY = [Math]::Floor([Math]::Max(0, $sourceImage.Height * 0.02))
    $sourceRect = [System.Drawing.Rectangle]::new($sourceCropX, $sourceCropY, $sourceCropSize, $sourceCropSize)

    $targetSize = 256
    $padding = 30
    $drawSize = $targetSize - ($padding * 2)
    $targetRect = [System.Drawing.Rectangle]::new($padding, $padding, $drawSize, $drawSize)

    $bitmap = [System.Drawing.Bitmap]::new($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

    try {
        $graphics.Clear([System.Drawing.Color]::FromArgb(255, 248, 250, 252))
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $shadowBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(34, 15, 23, 42))
        $panelBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 255, 255, 255))

        try {
            $graphics.FillEllipse($shadowBrush, 30, 168, 196, 42)
            $graphics.FillRectangle($panelBrush, 24, 24, 208, 208)
            $graphics.DrawImage($sourceImage, $targetRect, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
        } finally {
            $shadowBrush.Dispose()
            $panelBrush.Dispose()
        }

        $pngCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq "image/png"
        $bitmap.Save($runtimeIconPath, $pngCodec, $null)
        $bitmap.Save($buildIconPath, $pngCodec, $null)
    } finally {
        $graphics.Dispose()
        $bitmap.Dispose()
    }
} finally {
    $sourceImage.Dispose()
}

$pngBytes = [System.IO.File]::ReadAllBytes($buildIconPath)
$stream = [System.IO.File]::Create($buildIcoPath)
$writer = [System.IO.BinaryWriter]::new($stream)

try {
    $writer.Write([UInt16]0)
    $writer.Write([UInt16]1)
    $writer.Write([UInt16]1)
    $writer.Write([Byte]0)
    $writer.Write([Byte]0)
    $writer.Write([Byte]0)
    $writer.Write([Byte]0)
    $writer.Write([UInt16]1)
    $writer.Write([UInt16]32)
    $writer.Write([UInt32]$pngBytes.Length)
    $writer.Write([UInt32]22)
    $writer.Write($pngBytes)
} finally {
    $writer.Dispose()
    $stream.Dispose()
}
