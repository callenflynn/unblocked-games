// Tab cloaking settings
const iconUrls = {
    'google-classroom': 'https://ssl.gstatic.com/classroom/favicon.png',
    'google-docs': 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
    'google-drive': 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
    'default': ''
};

// Load saved settings
function loadSettings() {
    const savedTitle = localStorage.getItem('customTabName');
    const savedIcon = localStorage.getItem('customTabIcon');
    
    if (savedTitle) {
        document.title = savedTitle;
    }
    
    if (savedIcon) {
        setFavicon(savedIcon);
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
    document.title = 'C Unblocked Games';
    const link = document.querySelector("link[rel~='icon']");
    if (link) link.remove();
    document.getElementById('tabName').value = '';
    document.getElementById('customIcon').value = '';
}

// Modal functionality
const modal = document.getElementById('settingsModal');
const btn = document.getElementById('settingsBtn');
const span = document.getElementsByClassName('close')[0];

if (btn) {
    btn.onclick = function() {
        modal.style.display = 'block';
    }
}

if (span) {
    span.onclick = function() {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
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