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

// About:blank stealth mode function
function openInBlank(url) {
    const win = window.open('about:blank', '_blank');
    if (win) {
        // Check if URL is external (starts with http)
        const fullUrl = url.startsWith('http') ? url : window.location.origin + '/' + url;
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Loading...</title>
                <style>
                    body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                    iframe { width: 100%; height: 100%; border: none; }
                </style>
            </head>
            <body>
                <iframe src="${fullUrl}"></iframe>
            </body>
            </html>
        `);
        win.document.close();
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