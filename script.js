const iconUrls = {
    'google-classroom': 'https://ssl.gstatic.com/classroom/favicon.png',
    'google-docs': 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
    'google-drive': 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
    'default': ''
};

function enableBlobCloak() {
    if (window.location.protocol === 'blob:') return; // Already cloaked
    
    fetch(window.location.href)
        .then(response => response.text())
        .then(html => {
            const blob = new Blob([html], { type: 'text/html' });
            const blobUrl = URL.createObjectURL(blob);
            
            window.location.replace(blobUrl);
        })
        .catch(error => {
            console.error('Blob cloaking failed:', error);
        });
}

function toggleBlobCloak() {
    const toggle = document.getElementById('blobCloakToggle');
    if (toggle.checked) {
        localStorage.setItem('blobCloakEnabled', 'true');
        enableBlobCloak();
    } else {
        localStorage.setItem('blobCloakEnabled', 'false');
        // Reload to normal URL
        if (window.location.protocol === 'blob:') {
            window.location.href = window.location.origin;
        }
    }
}

function toggleBlobInfo() {
    const modal = document.getElementById('blobInfoModal');
    if (modal.style.display === 'none' || !modal.style.display) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
    } else {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

function loadSettings() {
    const savedTitle = localStorage.getItem('customTabName');
    const savedIcon = localStorage.getItem('customTabIcon');
    const blobCloakEnabled = localStorage.getItem('blobCloakEnabled') === 'true';
    
    if (savedTitle) {
        document.title = savedTitle;
    }
    
    if (savedIcon) {
        setFavicon(savedIcon);
    }
    
    const toggle = document.getElementById('blobCloakToggle');
    if (toggle) {
        toggle.checked = blobCloakEnabled;
    }
    
    if (blobCloakEnabled && window.location.protocol !== 'blob:') {
        enableBlobCloak();
    }
}

// Set favicon
function setFavicon(url) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = url;
}

// Apply custom tab name
function applyTabName() {
    const tabName = document.getElementById('tabName').value;
    if (tabName) {
        document.title = tabName;
        localStorage.setItem('customTabName', tabName);
    }
}

// Set tab icon from preset
function setTabIcon(iconType) {
    const url = iconUrls[iconType];
    if (iconType === 'default') {
        localStorage.removeItem('customTabIcon');
        const link = document.querySelector("link[rel~='icon']");
        if (link) link.remove();
    } else {
        setFavicon(url);
        localStorage.setItem('customTabIcon', url);
    }
}

// Apply custom icon
function applyCustomIcon() {
    const iconUrl = document.getElementById('customIcon').value;
    if (iconUrl) {
        setFavicon(iconUrl);
        localStorage.setItem('customTabIcon', iconUrl);
    }
}

// Reset settings
function resetSettings() {
    localStorage.removeItem('customTabName');
    localStorage.removeItem('customTabIcon');
    localStorage.removeItem('blobCloakEnabled');
    document.title = 'C Unblocked Games';
    const link = document.querySelector("link[rel~='icon']");
    if (link) link.remove();
    document.getElementById('tabName').value = '';
    document.getElementById('customIcon').value = '';
    const toggle = document.getElementById('blobCloakToggle');
    if (toggle) toggle.checked = false;
    
    if (window.location.protocol === 'blob:') {
        window.location.href = window.location.origin;
    }
}

if (document.title.includes('C Unblocked Games')) {
    document.title = 'C Games';
}

// Add seasonal decorations
function addSeasonalDecorations() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();
    
    // October: Add pumpkins
    if (month === 10) {
        addPumpkinBackground();
    }
    
    // November 18-30 or December: Add snowflakes
    if ((month === 11 && day >= 18 && day <= 30) || month === 12) {
        addSnowflakes();
    }
}

function addPumpkinBackground() {
    const pumpkinStyle = document.createElement('style');
    pumpkinStyle.innerHTML = `
        @keyframes float-pumpkin {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-20px) rotate(5deg); opacity: 0.9; }
        }
        
        .pumpkin-decoration {
            position: fixed;
            pointer-events: none;
            z-index: 1;
            animation: float-pumpkin 4s ease-in-out infinite;
            opacity: 0.7;
        }
        
        body {
            background-attachment: fixed;
        }
    `;
    document.head.appendChild(pumpkinStyle);
    
    // Add multiple pumpkins around the page
    const pumpkinCount = 8;
    for (let i = 0; i < pumpkinCount; i++) {
        const pumpkin = document.createElement('img');
        pumpkin.src = 'https://www.pngfind.com/pngs/m/693-6932035_transparent-background-halloween-pumpkin-clipart-hd-png-download.png';
        pumpkin.className = 'pumpkin-decoration';
        pumpkin.style.left = (Math.random() * 90) + '%';
        pumpkin.style.bottom = (Math.random() * 80) + '%';
        pumpkin.style.width = (40 + Math.random() * 60) + 'px';
        pumpkin.style.height = 'auto';
        pumpkin.style.animationDelay = (i * 0.5) + 's';
        pumpkin.style.animationDuration = (3 + Math.random() * 2) + 's';
        document.body.appendChild(pumpkin);
    }
}

function addSnowflakes() {
    const snowflakeStyle = document.createElement('style');
    snowflakeStyle.innerHTML = `
        @keyframes snowfall {
            0% {
                transform: translateY(-10vh) translateX(0) rotate(0deg);
                opacity: 1;
            }
            25% {
                transform: translateY(25vh) translateX(50px) rotate(90deg);
            }
            50% {
                transform: translateY(50vh) translateX(-30px) rotate(180deg);
            }
            75% {
                transform: translateY(75vh) translateX(80px) rotate(270deg);
            }
            100% {
                transform: translateY(100vh) translateX(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes snowsway {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(30px); }
            50% { transform: translateX(-40px); }
            75% { transform: translateX(25px); }
        }
        
        .snowflake {
            position: fixed;
            pointer-events: none;
            z-index: 1;
            opacity: 0.8;
            animation: snowfall linear forwards, snowsway 4s ease-in-out infinite;
        }
    `;
    document.head.appendChild(snowflakeStyle);
    
    // Add snowflakes continuously
    const snowflakeCount = 30;
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('img');
        snowflake.src = 'https://png.pngtree.com/png-clipart/20201009/ourmid/pngtree-blue-symmetrical-graphic-snowflake-clipart-element-png-image_2353391.jpg';
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.width = (10 + Math.random() * 20) + 'px';
        snowflake.style.height = 'auto';
        snowflake.style.animationDuration = (8 + Math.random() * 6) + 's';
        snowflake.style.animationDelay = (Math.random() * 2) + 's';
        document.body.appendChild(snowflake);
        
        // Add new snowflakes periodically
        setTimeout(() => {
            if (document.body.contains(snowflake)) {
                const newSnowflake = snowflake.cloneNode(true);
                document.body.appendChild(newSnowflake);
            }
        }, (8 + Math.random() * 6) * 1000);
    }
}

// Call seasonal decorations on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSeasonalDecorations);
} else {
    addSeasonalDecorations();
}

const modal = document.getElementById('settingsModal');
const btn = document.getElementById('settingsBtn');
const span = document.getElementsByClassName('close')[0];

if (btn) {
    btn.onclick = function() {
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
    }
}

if (span) {
    span.onclick = function() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

function openProxiesWarning() {
    document.getElementById('proxiesWarningModal').style.display = 'block';
    document.body.classList.add('modal-open');
    let countdown = 3;
    const btn = document.getElementById('understandBtn');
    
    const interval = setInterval(() => {
        countdown--;
        document.getElementById('countdown').textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(interval);
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            document.getElementById('countdownText').innerHTML = '✅ You may now proceed';
        }
    }, 1000);
}

function closeProxiesWarning() {
    document.getElementById('proxiesWarningModal').style.display = 'none';
    document.body.classList.remove('modal-open');
}

function viewProxiesList() {
    window.open('proxies.txt', '_blank');
    closeProxiesWarning();
}

window.onclick = function(event) {
    const settingsModal = document.getElementById('settingsModal');
    const blobInfoModal = document.getElementById('blobInfoModal');
    const proxiesModal = document.getElementById('proxiesWarningModal');
    
    if (event.target == settingsModal) {
        settingsModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
    
    if (event.target == blobInfoModal) {
        blobInfoModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
    
    if (event.target == proxiesModal) {
        proxiesModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

// Load settings on page load
loadSettings();

// Load game preview images from actual game URLs
async function loadGamePreviews() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach((card) => {
        const thumbnail = card.querySelector('.game-thumbnail');
        const faviconUrl = thumbnail.getAttribute('data-favicon-url');
        
        if (!faviconUrl || !thumbnail) return;
        
        // Extract domain from URL
        try {
            const url = new URL(faviconUrl);
            const domain = url.origin;
            
            // Try multiple favicon locations
            const faviconPaths = [
                `${domain}/favicon.ico`,
                `${domain}/favicon.png`,
                `${domain}/apple-touch-icon.png`,
                `${domain}/android-chrome-192x192.png`,
                `${faviconUrl}` // Try loading the page itself as background
            ];
            
            // Set the game URL as background with overlay
            thumbnail.style.backgroundImage = `url('${faviconUrl}')`;
            thumbnail.style.backgroundSize = 'cover';
            thumbnail.style.backgroundPosition = 'center';
            
            // Try to get actual favicon and overlay it
            const favicon = new Image();
            favicon.crossOrigin = 'anonymous';
            
            let currentIndex = 0;
            const tryNextFavicon = () => {
                if (currentIndex < faviconPaths.length) {
                    favicon.src = faviconPaths[currentIndex];
                    currentIndex++;
                }
            };
            
            favicon.onload = function() {
                // Create a large centered favicon overlay
                const iconDiv = document.createElement('div');
                iconDiv.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    background-image: url('${favicon.src}');
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    z-index: 3;
                    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.8));
                `;
                thumbnail.appendChild(iconDiv);
            };
            
            favicon.onerror = tryNextFavicon;
            tryNextFavicon();
            
        } catch (error) {
            console.log('Error loading game preview:', error);
        }
    });
}

// Load game previews when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGamePreviews);
} else {
    loadGamePreviews();
}

// About:blank stealth mode function
function openInBlank(url) {
    const win = window.open('about:blank', '_blank');
    if (win) {
        // Determine the full URL
        let fullUrl;
        if (url.startsWith('http://') || url.startsWith('https://')) {
            // External URL - use as is
            fullUrl = url;
        } else {
            // Relative URL - build full path
            const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
            fullUrl = baseUrl + '/' + url;
        }
        
        // Write content to the new window
        win.document.open();
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Loading...</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body, html { height: 100%; overflow: hidden; background: #000; }
                    iframe { 
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%; 
                        height: 100%; 
                        border: none;
                        display: block;
                    }
                </style>
            </head>
            <body>
                <iframe src="${fullUrl}"></iframe>
            </body>
            </html>
        `);
        win.document.close();
    } else {
        alert('Please allow popups for stealth mode to work!');
    }
}

// Fullscreen functionality for game pages
function toggleFullscreen() {
    const gameFrame = document.querySelector('.game-frame');
    const btn = document.querySelector('.fullscreen-btn');
    
    if (gameFrame.classList.contains('fullscreen')) {
        gameFrame.classList.remove('fullscreen');
        btn.textContent = '⛶ Fullscreen';
    } else {
        gameFrame.classList.add('fullscreen');
        btn.textContent = '✕ Exit Fullscreen';
    }
}

// ESC key to exit fullscreen
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const gameFrame = document.querySelector('.game-frame');
        const btn = document.querySelector('.fullscreen-btn');
        if (gameFrame && gameFrame.classList.contains('fullscreen')) {
            gameFrame.classList.remove('fullscreen');
            if (btn) btn.textContent = '⛶ Fullscreen';
        }
    }
});

// Game list data
const allGames = [
    { name: 'Falling Cubes', icon: '🎮', path: 'cubes' },
    { name: 'Kour.io', icon: '🎯', path: 'kour-io' },
    { name: 'Sudoku', icon: '🔢', path: 'sudoku' },
    { name: 'Sandtris', icon: '🏖️', path: 'sandtris' },
    { name: '2048', icon: '🎯', path: '2048' },
    { name: 'T-Rex Runner', icon: '🦖', path: 'trex' },
    { name: 'Hextris', icon: '🔷', path: 'hextris' },
    { name: 'Cookie Clicker', icon: '🍪', path: 'cookie-clicker' },
    { name: 'Flappy Bird', icon: '🐦', path: 'flappy-bird' },
    { name: 'Breakout', icon: '🧱', path: 'breakout' },
    { name: 'Minesweeper', icon: '💣', path: 'minesweeper' },
    { name: 'Knife Madness', icon: '🔪', path: 'knife-madness' },
    { name: 'Moto Race City', icon: '🏍️', path: 'moto-race-city' },
    { name: 'Polytrack', icon: '🏎️', path: 'polytrack' }
];

// Load random games in sidebar
function loadRandomGames() {
    const gameList = document.getElementById('gameList');
    if (!gameList) return;
    
    // Get current game path from URL
    const currentPath = window.location.pathname;
    const currentGame = currentPath.split('/').filter(Boolean).pop();
    
    // Filter out current game and shuffle
    const otherGames = allGames.filter(game => !currentPath.includes(game.path));
    const shuffled = otherGames.sort(() => Math.random() - 0.5);
    const randomGames = shuffled.slice(0, 10);
    
    // Clear existing list
    gameList.innerHTML = '';
    
    // Add random games
    randomGames.forEach(game => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `../${game.path}/index.html`;
        a.textContent = `${game.icon} ${game.name}`;
        li.appendChild(a);
        gameList.appendChild(li);
    });
}

// Load games when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadRandomGames);
} else {
    loadRandomGames();
}