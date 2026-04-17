$files = Get-ChildItem -Path "en" -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Change d-none d-sm-inline-block to inline-block
    $content = $content -replace '<li class="d-none d-sm-inline-block">(\s*<div class="lang-switch")', '<li class="inline-block">$1'
    
    # Add onclick to the TR link (pointing to ../)
    $content = $content -replace '(href="\.\./.*?")', '$1 onclick="localStorage.setItem(''lang-selected'', ''tr'')"'
    
    Set-Content $file.FullName $content
}
Write-Host "Updated switcher for English pages."
