// 🎬 Custom Video Player - Enhanced Viewing Experience
class CustomVideoPlayer {
    constructor() {
        this.player = null;
        this.overlay = null;
        this.backButton = null;
        this.originalUrl = null;
        this.isYouTube = false;
        this.isVimeo = false;
        this.isCustom = false;
    }

    // Initialize the custom player
    init(videoUrl, title = '') {
        this.originalUrl = videoUrl;
        this.detectPlatform(videoUrl);
        this.createPlayerOverlay(title);
        this.loadVideo(videoUrl);
    }

    // Detect video platform
    detectPlatform(url) {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            this.isYouTube = true;
        } else if (url.includes('vimeo.com')) {
            this.isVimeo = true;
        } else {
            this.isCustom = true;
        }
    }

    // Update video title dynamically
    updateVideoTitle(title) {
        const titleElement = document.getElementById('videoTitle');
        if (titleElement) {
            titleElement.textContent = title || 'Video Player';
            console.log(`Video title updated: ${title}`);
        }
    }

    // Create player overlay
    createPlayerOverlay(title) {
        // Remove existing overlay
        if (this.overlay) {
            this.overlay.remove();
        }

        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            animation: fadeIn 0.3s ease;
        `;

        // Create header with controls
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid #e50914;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;

        // Website branding section
        const branding = document.createElement('div');
        branding.style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
            flex: 1;
        `;

        // Website name
        const websiteName = document.createElement('div');
        websiteName.innerHTML = '🎬 <strong style="color: #e50914; font-size: 1.4em;">@JOSEE\'S FINEST</strong>';
        websiteName.style.cssText = `
            color: #00f7ff;
            font-size: 1.3em;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
            letter-spacing: 1px;
        `;

        // Movie title
        const titleElement = document.createElement('div');
        titleElement.style.cssText = `
            color: #e50914;
            font-size: 1.2em;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(229, 9, 20, 0.3);
            flex: 2;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        `;
        titleElement.textContent = title || 'Video Player';
        titleElement.id = 'videoTitle';

        branding.appendChild(websiteName);
        branding.appendChild(titleElement);
        const controls = document.createElement('div');
        controls.style.cssText = `
            display: flex;
            gap: 10px;
            align-items: center;
        `;

        // Navigation tabs
        const navTabs = document.createElement('div');
        navTabs.style.cssText = `
            display: flex;
            gap: 5px;
            background: rgba(255,255,255,0.1);
            padding: 5px;
            border-radius: 8px;
            margin-right: 20px;
        `;

        // Home tab
        const homeTab = document.createElement('button');
        homeTab.innerHTML = '🏠 Home';
        homeTab.style.cssText = `
            background: linear-gradient(145deg, #4caf50, #388e3c);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.85em;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 1px 3px rgba(76, 175, 80, 0.3);
        `;
        homeTab.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Fun Page tab
        const funTab = document.createElement('button');
        funTab.innerHTML = '🎉 Fun Page';
        funTab.style.cssText = `
            background: linear-gradient(145deg, #e50914, #cc0812);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.85em;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 1px 3px rgba(229, 9, 20, 0.3);
        `;
        funTab.addEventListener('click', () => {
            window.location.href = 'fun.html';
        });

        navTabs.appendChild(homeTab);
        navTabs.appendChild(funTab);

        // Open in new tab button
        const newTabButton = document.createElement('button');
        newTabButton.innerHTML = '🔗 Open Original';
        newTabButton.style.cssText = `
            background: linear-gradient(145deg, #ff9800, #f57c00);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 0.9em;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(255, 152, 0, 0.3);
        `;
        newTabButton.addEventListener('click', () => window.open(this.originalUrl, '_blank'));

        // Close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕';
        closeButton.style.cssText = `
            background: linear-gradient(145deg, #f44336, #d32f2f);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 1.2em;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(244, 67, 54, 0.3);
        `;
        closeButton.addEventListener('click', () => this.closePlayer());
    }

    // Update video title dynamically
    updateVideoTitle(title) {
        const titleElement = document.getElementById('videoTitle');
        if (titleElement) {
            titleElement.textContent = title || 'Video Player';
            console.log(`Video title updated: ${title}`);
        }
    }

    // Add hover effects
        [homeTab, funTab, newTabButton, closeButton].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = btn.style.boxShadow.replace('0 1px 3px', '0 3px 8px').replace('0 2px 6px', '0 4px 12px');
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = btn.style.boxShadow.replace('0 3px 8px', '0 1px 3px').replace('0 4px 12px', '0 2px 6px');
            });
        });

        controls.appendChild(navTabs);
        controls.appendChild(newTabButton);
        controls.appendChild(closeButton);

        header.appendChild(branding);
        header.appendChild(controls);

        // Create video container
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            position: relative;
        `;

        // Add loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.innerHTML = `
            <div style="
                text-align: center;
                color: #e50914;
                font-size: 1.2em;
                font-weight: bold;
            ">
                🔄 Loading Video...
            </div>
        `;
        loadingIndicator.id = 'loadingIndicator';
        videoContainer.appendChild(loadingIndicator);

        // Create video player container
        this.player = document.createElement('div');
        this.player.id = 'customVideoPlayer';
        this.player.style.cssText = `
            width: 100%;
            max-width: 1200px;
            height: 70vh;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            background: #000;
        `;

        videoContainer.appendChild(this.player);

        // Add keyboard shortcuts
        this.addKeyboardShortcuts();

        // Assemble overlay
        this.overlay.appendChild(header);
        this.overlay.appendChild(videoContainer);
        document.body.appendChild(this.overlay);

        // Add fade-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Load video based on platform
    loadVideo(url) {
        if (this.isYouTube) {
            this.loadYouTubeVideo(url);
        } else if (this.isVimeo) {
            this.loadVimeoVideo(url);
        } else {
            this.loadCustomVideo(url);
        }
    }

    // Load YouTube video
    loadYouTubeVideo(url) {
        const videoId = this.extractYouTubeId(url);
        if (!videoId) {
            this.showError('Invalid YouTube URL');
            return;
        }

        // Hide loading indicator
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) loadingIndicator.style.display = 'none';

        // Create embedded YouTube player within your site with enhanced parameters
        this.player.innerHTML = `
            <div id="youtube-player" style="width: 100%; height: 100%; border-radius: 10px; overflow: hidden; background: #000;">
                <iframe 
                    id="youtube-iframe"
                    src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&origin=${window.location.origin}"
                    style="width: 100%; height: 100%; border: none; border-radius: 10px;"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    frameborder="0">
                </iframe>
            </div>
        `;
        
        // Add event listener to prevent YouTube redirects
        setTimeout(() => {
            const iframe = document.getElementById('youtube-iframe');
            if (iframe) {
                try {
                    // Prevent navigation away from your site
                    iframe.addEventListener('load', () => {
                        try {
                            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                            if (iframeDoc) {
                                // Prevent YouTube navigation
                                const links = iframeDoc.querySelectorAll('a');
                                links.forEach(link => {
                                    if (link.href && link.href.includes('youtube.com')) {
                                        link.addEventListener('click', (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            console.log('YouTube navigation prevented, staying on your site');
                                        });
                                    }
                                });
                            }
                        } catch (e) {
                            console.log('Cannot access iframe content due to cross-origin restrictions');
                        }
                    });
                } catch (e) {
                    console.log('Error setting up iframe protection:', e);
                }
            }
        }, 1000);
        
        // Update video title
        this.updateVideoTitle(title);
    }

    // Load Vimeo video
    loadVimeoVideo(url) {
        const videoId = this.extractVimeoId(url);
        if (!videoId) {
            this.showError('Invalid Vimeo URL');
            return;
        }

        // Hide loading indicator
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) loadingIndicator.style.display = 'none';

        // Create embedded Vimeo player within your site
        this.player.innerHTML = `
            <div id="vimeo-player" style="width: 100%; height: 100%; border-radius: 10px; overflow: hidden;">
                <iframe 
                    id="vimeo-iframe"
                    src="https://player.vimeo.com/video/${videoId}?autoplay=1&byline=0&portrait=0&title=0&origin=${window.location.origin}"
                    style="width: 100%; height: 100%; border: none; border-radius: 10px;"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
        `;
        
        // Update video title
        this.updateVideoTitle(title);
    }

    // Load custom video
    loadCustomVideo(url) {
        // Hide loading indicator
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) loadingIndicator.style.display = 'none';

        // Create embedded video player within your site
        this.player.innerHTML = `
            <div id="custom-player" style="width: 100%; height: 100%; border-radius: 10px; overflow: hidden; background: #000;">
                <video 
                    id="custom-video"
                    controls 
                    autoplay 
                    style="width: 100%; height: 100%; border-radius: 10px;"
                    onerror="window.customVideoPlayer.showError('Failed to load video')"
                    onloadeddata="console.log('Custom video loaded successfully')">
                    <source src="${url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
        
        // Update video title
        this.updateVideoTitle(title);
    }

    // Extract YouTube video ID
    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Extract Vimeo video ID
    extractVimeoId(url) {
        const regExp = /(?:vimeo\.com\/)(\d+)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    }

    // Show error message
    showError(message) {
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.innerHTML = `
                <div style="
                    text-align: center;
                    color: #f44336;
                    font-size: 1.2em;
                    font-weight: bold;
                    padding: 20px;
                ">
                    ❌ ${message}
                </div>
            `;
        }
    }

    // Add keyboard shortcuts
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (this.overlay && this.overlay.style.display !== 'none') {
                // ESC key to close
                if (e.key === 'Escape') {
                    this.closePlayer();
                }
                // H key for Home
                if (e.key === 'h' || e.key === 'H') {
                    window.location.href = 'index.html';
                }
                // F key for Fun Page
                if (e.key === 'f' || e.key === 'F') {
                    window.location.href = 'fun.html';
                }
                // B key to close (backwards compatibility)
                if (e.key === 'b' || e.key === 'B') {
                    this.closePlayer();
                }
            }
        });
    }

    // Close player and return to website
    closePlayer() {
        if (this.overlay) {
            this.overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                this.overlay.remove();
                this.overlay = null;
                this.player = null;
            }, 300);
        }
    }
}

// Create global instance
window.customVideoPlayer = new CustomVideoPlayer();

// Add fade-out animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);
