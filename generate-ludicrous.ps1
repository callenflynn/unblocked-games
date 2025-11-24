# PowerShell script to generate Ludicrous proxy pages

$ludicrousUrls = @(
    "https://limitalgebra.net",
    "https://erraticphysics.com",
    "https://x-rayphysics.net",
    "https://storefacts.org",
    "https://neathome.org",
    "https://ludicrous-1.reesespieces55.repl.co"
)

function Create-ProxyIndexPage {
    param(
        [string]$ProxyType,
        [string]$Icon,
        [int]$TotalCount
    )
    
    $proxyButtons = ""
    for ($i = 1; $i -le $TotalCount; $i++) {
        $proxyButtons += "                <button class=`"proxy-btn`" onclick=`"window.location.href='proxy$i.html'`">$ProxyType $i</button>`n"
    }
    
    $content = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$ProxyType Proxies - C Unblocked Games</title>
    <link rel="stylesheet" href="../../style.css">
</head>
<body>
    <header>
        <h1>$Icon $ProxyType Proxies</h1>
        <button id="settingsBtn" class="settings-btn">⚙️ Settings</button>
    </header>

    <div style="text-align: center; padding: 20px;">
        <button class="home-btn" onclick="window.location.href='../index.html'" style="display: inline-block; margin-bottom: 10px;">⬅️ Back to Proxies</button>
        <button class="home-btn" onclick="window.location.href='../../index.html'" style="display: inline-block; margin-bottom: 10px; margin-left: 10px;">🏠 Home</button>
    </div>

    <section class="proxies-section">
        <h2>Select a $ProxyType Proxy</h2>
        <p class="proxy-note">⚠️ If one link doesn't work, try another</p>
        <div class="proxy-category">
            <div class="proxy-buttons">
$proxyButtons            </div>
        </div>
    </section>

    <div id="settingsModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Settings</h2>
            <div class="setting-group">
                <label for="tabName">Custom Tab Name:</label>
                <input type="text" id="tabName" placeholder="Enter custom tab name">
                <button onclick="applyTabName()">Apply</button>
            </div>
            <div class="setting-group">
                <label>Tab Icon:</label>
                <div class="icon-options">
                    <button class="icon-btn" onclick="setTabIcon('google-classroom')">
                        <img src="https://ssl.gstatic.com/classroom/favicon.png" alt="Google Classroom">
                        <span>Google Classroom</span>
                    </button>
                    <button class="icon-btn" onclick="setTabIcon('google-docs')">
                        <img src="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" alt="Google Docs">
                        <span>Google Docs</span>
                    </button>
                    <button class="icon-btn" onclick="setTabIcon('google-drive')">
                        <img src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" alt="Google Drive">
                        <span>Google Drive</span>
                    </button>
                    <button class="icon-btn" onclick="setTabIcon('default')">
                        <span>🎮</span>
                        <span>Default</span>
                    </button>
                </div>
            </div>
            <div class="setting-group">
                <label for="customIcon">Custom Icon URL:</label>
                <input type="text" id="customIcon" placeholder="Enter custom icon URL">
                <button onclick="applyCustomIcon()">Apply</button>
            </div>
            <button class="reset-btn" onclick="resetSettings()">Reset to Default</button>
        </div>
    </div>

    <script src="../../script.js"></script>
</body>
</html>
"@
    
    return $content
}

function Create-ProxyPage {
    param(
        [string]$ProxyType,
        [int]$Index,
        [string]$Url,
        [int]$TotalCount
    )
    
    $proxyList = ""
    for ($i = 1; $i -le $TotalCount; $i++) {
        $activeClass = if ($i -eq $Index) { ' class="active"' } else { '' }
        $proxyList += "                <li><a href=`"proxy$i.html`"$activeClass>$ProxyType $i</a></li>`n"
    }
    
    $content = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$ProxyType $Index - C Unblocked Games</title>
    <link rel="stylesheet" href="../../style.css">
</head>
<body>
    <header>
        <h1>C Unblocked Games</h1>
        <button id="settingsBtn" class="settings-btn">⚙️ Settings</button>
    </header>
    <div class="game-page">
        <aside class="sidebar">
            <button class="home-btn" onclick="window.location.href='index.html'">⬅️ Back</button>
            <button class="home-btn" onclick="window.location.href='../../index.html'" style="margin-top: 10px;">🏠 Home</button>
            <h3 style="margin: 15px 0;">$ProxyType Proxies</h3>
            <ul class="game-list">
$proxyList            </ul>
        </aside>
        <div class="game-container">
            <div class="game-header">
                <h2>$ProxyType $Index</h2>
                <div style="display: flex; gap: 10px;">
                    <button class="fullscreen-btn" onclick="openInBlank('$Url')">🔒 Stealth</button>
                    <button class="fullscreen-btn" onclick="toggleFullscreen()">⛶ Fullscreen</button>
                </div>
            </div>
            <div class="game-frame">
                <iframe style="width:100%; height:600px; border:none;" src="$Url" title="$ProxyType Proxy"></iframe>
            </div>
        </div>
    </div>
    <div id="settingsModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Settings</h2>
            <div class="setting-group">
                <label for="tabName">Custom Tab Name:</label>
                <input type="text" id="tabName" placeholder="Enter custom tab name">
                <button onclick="applyTabName()">Apply</button>
            </div>
            <div class="setting-group">
                <label>Tab Icon:</label>
                <div class="icon-options">
                    <button class="icon-btn" onclick="setTabIcon('google-classroom')">
                        <img src="https://ssl.gstatic.com/classroom/favicon.png" alt="Google Classroom">
                        <span>Google Classroom</span>
                    </button>
                    <button class="icon-btn" onclick="setTabIcon('google-docs')">
                        <img src="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" alt="Google Docs">
                        <span>Google Docs</span>
                    </button>
                    <button class="icon-btn" onclick="setTabIcon('google-drive')">
                        <img src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" alt="Google Drive">
                        <span>Google Drive</span>
                    </button>
                    <button class="icon-btn" onclick="setTabIcon('default')">
                        <span>🎮</span>
                        <span>Default</span>
                    </button>
                </div>
            </div>
            <div class="setting-group">
                <label for="customIcon">Custom Icon URL:</label>
                <input type="text" id="customIcon" placeholder="Enter custom icon URL">
                <button onclick="applyCustomIcon()">Apply</button>
            </div>
            <button class="reset-btn" onclick="resetSettings()">Reset to Default</button>
        </div>
    </div>
    <script src="../../script.js"></script>
</body>
</html>
"@
    
    return $content
}

# Generate Ludicrous
New-Item -ItemType Directory -Force -Path "proxies\ludicrous" | Out-Null
$content = Create-ProxyIndexPage -ProxyType "Ludicrous" -Icon "⚡" -TotalCount $ludicrousUrls.Count
$content | Out-File -FilePath "proxies\ludicrous\index.html" -Encoding UTF8
for ($i = 0; $i -lt $ludicrousUrls.Count; $i++) {
    $content = Create-ProxyPage -ProxyType "Ludicrous" -Index ($i + 1) -Url $ludicrousUrls[$i] -TotalCount $ludicrousUrls.Count
    $content | Out-File -FilePath "proxies\ludicrous\proxy$($i + 1).html" -Encoding UTF8
}

Write-Host "Ludicrous proxy pages generated successfully!"
Write-Host "Ludicrous: $($ludicrousUrls.Count) proxies"
