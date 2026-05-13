param(
  [int]$Port = 8765,
  [string]$Root = $PSScriptRoot
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root on http://localhost:$Port/"

$mime = @{
  '.html' = 'text/html'
  '.htm'  = 'text/html'
  '.css'  = 'text/css'
  '.js'   = 'application/javascript'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.gif'  = 'image/gif'
  '.svg'  = 'image/svg+xml'
  '.webp' = 'image/webp'
  '.ico'  = 'image/x-icon'
  '.json' = 'application/json'
  '.woff' = 'font/woff'
  '.woff2'= 'font/woff2'
  '.ttf'  = 'font/ttf'
  '.txt'  = 'text/plain'
}

while ($listener.IsListening) {
  try {
    $context = $listener.GetContext()
    $req = $context.Request
    $res = $context.Response
    $isHead = ($req.HttpMethod -eq 'HEAD')
    $path = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath).TrimStart('/')
    if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }
    $full = Join-Path $Root $path
    if ((Test-Path $full -PathType Container)) {
      $full = Join-Path $full 'index.html'
    }
    if (Test-Path $full -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($full)
      $ext = [System.IO.Path]::GetExtension($full).ToLower()
      $ct = $mime[$ext]
      if (-not $ct) { $ct = 'application/octet-stream' }
      $res.ContentType = $ct
      $res.ContentLength64 = $bytes.Length
      if (-not $isHead) { $res.OutputStream.Write($bytes, 0, $bytes.Length) }
      Write-Host "200  $path  ($($bytes.Length) bytes)"
    } else {
      $res.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $res.ContentType = 'text/plain'
      $res.ContentLength64 = $msg.Length
      if (-not $isHead) { $res.OutputStream.Write($msg, 0, $msg.Length) }
      Write-Host "404  $path"
    }
    $res.OutputStream.Close()
  } catch {
    Write-Host "ERR  $_"
    try { $res.OutputStream.Close() } catch {}
  }
}
