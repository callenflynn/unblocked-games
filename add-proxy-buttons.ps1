# Script to add "Doesn't work? Click me!" button to all proxy pages

$proxyFolders = Get-ChildItem -Path "proxies" -Directory

foreach ($folder in $proxyFolders) {
    $proxyFiles = Get-ChildItem -Path $folder.FullName -Filter "proxy*.html"
    
    foreach ($file in $proxyFiles) {
        Write-Host "Processing $($file.FullName)"
        
        $content = Get-Content $file.FullName -Raw
        
        # Extract the iframe src URL using regex
        if ($content -match 'iframe[^>]*src="([^"]+)"') {
            $iframeSrc = $matches[1]
            
            # Extract the actual target URL from API calls or use direct URL
            if ($iframeSrc -match '\?url=([^"&]+)') {
                $targetUrl = [uri]::UnescapeDataString($matches[1])
            } else {
                $targetUrl = $iframeSrc
            }
            
            # Check if button already exists
            if ($content -notmatch "Doesn't work\? Click me!") {
                # Add the button after the Stealth and Fullscreen buttons
                $oldPattern = '(<button class="fullscreen-btn" onclick="toggleFullscreen\(\)">⛶ Fullscreen</button>\s*</div>\s*</div>)'
                $newContent = "<button class=""fullscreen-btn"" onclick=""toggleFullscreen()"">⛶ Fullscreen</button>`n                    <button class=""fullscreen-btn"" onclick=""window.open('$targetUrl', '_blank')"" style=""background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.3);"">⚠️ Doesn't work? Click me!</button>`n                </div>`n            </div>"
                
                $content = $content -replace $oldPattern, $newContent
                
                # Save the file
                Set-Content -Path $file.FullName -Value $content -NoNewline
                Write-Host "  ✓ Added button for $targetUrl"
            } else {
                Write-Host "  - Button already exists"
            }
        }
    }
}

Write-Host "`nAll proxy pages updated!"
