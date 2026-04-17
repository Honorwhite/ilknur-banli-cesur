$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    if ($file.Name -eq "index.html") { continue }
    $content = Get-Content $file.FullName -Raw
    
    # Change d-none d-sm-inline-block to inline-block
    $content = $content -replace '<li class="d-none d-sm-inline-block">(\s*<div class="lang-switch")', '<li class="inline-block">$1'
    
    # Add onclick to the EN link
    $content = $content -replace '(href="en/.*?")', '$1 onclick="localStorage.setItem(''lang-selected'', ''en'')"'
    
    Set-Content $file.FullName $content
}
Write-Host "Updated switcher for Turkish pages."
