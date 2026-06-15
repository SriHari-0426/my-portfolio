$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://+:8000/')
$listener.Start()
Write-Host "Serving at http://0.0.0.0:8000/ from $PWD"
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $urlpath = $context.Request.Url.AbsolutePath.TrimStart('/')
        if ($urlpath -eq '') { $urlpath = 'index.html' }
        $file = Join-Path (Get-Location) $urlpath
        if (-not (Test-Path $file -PathType Leaf)) {
            $context.Response.StatusCode = 404
            $buffer = [Text.Encoding]::UTF8.GetBytes('404 Not Found')
            $context.Response.OutputStream.Write($buffer,0,$buffer.Length)
            $context.Response.Close()
            continue
        }
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        $contentType = switch ($ext) {
            '.html' { 'text/html' }
            '.css' { 'text/css' }
            '.js' { 'application/javascript' }
            '.png' { 'image/png' }
            '.jpg' { 'image/jpeg' }
            '.jpeg' { 'image/jpeg' }
            '.svg' { 'image/svg+xml' }
            '.json' { 'application/json' }
            '.txt' { 'text/plain' }
            Default { 'application/octet-stream' }
        }
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $context.Response.ContentType = $contentType
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
        $context.Response.Close()
    } catch {
        Write-Host "Server error: $_"
    }
}
