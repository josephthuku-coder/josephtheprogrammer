// 🚀 PLATFORM LAUNCHER SYSTEM
// Opens movies in their original platforms (YouTube, Vimeo, etc.)

class PlatformLauncher {
    constructor() {
        console.log('🚀 Platform Launcher Initialized');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Listen for clicks on movie cards
        document.addEventListener('click', (e) => {
            this.handleMovieClick(e);
        });
    }
    
    handleMovieClick(e) {
        // Find the closest movie card or play button
        const movieCard = e.target.closest('.media-card, .movie-card, .content-card');
        
        if (!movieCard) return;
        
        // Get movie data
        const movieId = movieCard.dataset.movieId || movieCard.dataset.itemId;
        if (!movieId) return;
        
        const movie = this.getMovieFromStorage(movieId);
        if (!movie) return;
        
        // Check if it's a play button click
        const isPlayButton = e.target.closest('.play-btn, .watch-btn, .action-btn');
        if (isPlayButton) {
            this.launchInOriginalPlatform(movie);
        }
    }
    
    getMovieFromStorage(movieId) {
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        return allMedia.find(item => item.id === movieId);
    }
    
    launchInOriginalPlatform(movie) {
        const url = movie.url || movie.link;
        if (!url) {
            this.showMessage('No URL found for this movie!', 'error');
            return;
        }
        
        console.log('🚀 Launching in original platform:', url);
        this.showMessage(`🚀 Opening "${movie.title}" in original platform...`, 'success');
        
        // Detect platform and launch accordingly
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            this.launchYouTube(url);
        } else if (url.includes('vimeo.com')) {
            this.launchVimeo(url);
        } else if (url.includes('dailymotion.com')) {
            this.launchDailymotion(url);
        } else if (url.includes('spotify.com')) {
            this.launchSpotify(url);
        } else if (url.includes('twitch.tv')) {
            this.launchTwitch(url);
        } else if (url.includes('tiktok.com')) {
            this.launchTikTok(url);
        } else if (url.includes('instagram.com')) {
            this.launchInstagram(url);
        } else if (url.includes('twitter.com')) {
            this.launchTwitter(url);
        } else if (url.includes('facebook.com')) {
            this.launchFacebook(url);
        } else if (url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg')) {
            this.launchDirectVideo(url);
        } else {
            // Fallback: open in new tab
            this.launchGeneric(url);
        }
    }
    
    launchYouTube(url) {
        // Convert to embed URL for better experience
        const videoId = this.extractYouTubeId(url);
        if (videoId) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            this.openInNewWindow(embedUrl, 'YouTube', '800x600');
        } else {
            this.openInNewWindow(url, 'YouTube', '1200x800');
        }
    }
    
    launchVimeo(url) {
        // Convert to embed URL
        const videoId = this.extractVimeoId(url);
        if (videoId) {
            const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
            this.openInNewWindow(embedUrl, 'Vimeo', '800x600');
        } else {
            this.openInNewWindow(url, 'Vimeo', '1200x800');
        }
    }
    
    launchDailymotion(url) {
        this.openInNewWindow(url, 'Dailymotion', '1200x800');
    }
    
    launchSpotify(url) {
        this.openInNewWindow(url, 'Spotify', '1200x800');
    }
    
    launchTwitch(url) {
        this.openInNewWindow(url, 'Twitch', '1200x800');
    }
    
    launchTikTok(url) {
        this.openInNewWindow(url, 'TikTok', '400x800');
    }
    
    launchInstagram(url) {
        this.openInNewWindow(url, 'Instagram', '600x800');
    }
    
    launchTwitter(url) {
        this.openInNewWindow(url, 'Twitter', '800x600');
    }
    
    launchFacebook(url) {
        this.openInNewWindow(url, 'Facebook', '1200x800');
    }
    
    launchDirectVideo(url) {
        // For direct video files, create a simple player
        const playerWindow = window.open('', '_blank', 'width=800,height=600');
        playerWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Video Player</title>
                <style>
                    body { margin: 0; padding: 0; background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; }
                    video { max-width: 100%; max-height: 100%; }
                </style>
            </head>
            <body>
                <video controls autoplay>
                    <source src="${url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </body>
            </html>
        `);
    }
    
    launchGeneric(url) {
        this.openInNewWindow(url, 'Content', '1200x800');
    }
    
    openInNewWindow(url, platform, dimensions) {
        const [width, height] = dimensions.split('x');
        const features = `width=${width},height=${height},scrollbars=yes,resizable=yes,location=yes,menubar=yes,status=yes`;
        
        const newWindow = window.open(url, '_blank', features);
        
        if (!newWindow) {
            // Fallback for popup blockers
            window.open(url, '_blank');
        }
        
        this.showMessage(`🚀 Launched ${platform} player!`, 'success');
    }
    
    extractYouTubeId(url) {
        const patterns = [
            /youtube\.com\/watch\?v=([^&]+)/,
            /youtu\.be\/([^?]+)/,
            /youtube\.com\/embed\/([^?]+)/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        
        return null;
    }
    
    extractVimeoId(url) {
        const match = url.match(/vimeo\.com\/(?:.*#)?(\d+)/);
        return match ? match[1] : null;
    }
    
    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.platform-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `platform-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${type === 'success' ? '🚀' : '❌'} ${message}
                <button class="close-message" onclick="this.parentElement.remove()">×</button>
            </div>
        `;
        
        // Add to page
        const container = document.querySelector('.container, .dashboard-container, body');
        if (container) {
            container.appendChild(messageDiv);
        }
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 4000);
        
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
    
    // Add platform info to movie cards
    enhanceMovieCards() {
        const movieCards = document.querySelectorAll('.media-card, .movie-card, .content-card');
        
        movieCards.forEach(card => {
            const movieId = card.dataset.movieId || card.dataset.itemId;
            const movie = this.getMovieFromStorage(movieId);
            
            if (movie) {
                // Add platform indicator
                const platform = this.detectPlatform(movie.url || movie.link);
                const platformBadge = document.createElement('div');
                platformBadge.className = 'platform-badge';
                platformBadge.innerHTML = `🚀 ${platform}`;
                platformBadge.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(0,255,0,0.8);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: bold;
                    z-index: 10;
                `;
                
                // Add click handler to play button
                const playBtn = card.querySelector('.play-btn, .watch-btn');
                if (playBtn) {
                    playBtn.innerHTML = '🚀 LAUNCH';
                    playBtn.title = `Launch ${platform} player`;
                }
                
                // Insert platform badge
                const poster = card.querySelector('.movie-poster, .content-poster');
                if (poster) {
                    poster.appendChild(platformBadge);
                }
            }
        });
    }
    
    detectPlatform(url) {
        if (!url) return 'Unknown';
        
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
        if (url.includes('vimeo.com')) return 'Vimeo';
        if (url.includes('dailymotion.com')) return 'Dailymotion';
        if (url.includes('spotify.com')) return 'Spotify';
        if (url.includes('twitch.tv')) return 'Twitch';
        if (url.includes('tiktok.com')) return 'TikTok';
        if (url.includes('instagram.com')) return 'Instagram';
        if (url.includes('twitter.com')) return 'Twitter';
        if (url.includes('facebook.com')) return 'Facebook';
        if (url.includes('.mp4') || url.includes('.webm')) return 'Direct Video';
        
        return 'Unknown';
    }
}

// Initialize platform launcher
let platformLauncher;

document.addEventListener('DOMContentLoaded', () => {
    platformLauncher = new PlatformLauncher();
    
    // Enhance existing movie cards
    setTimeout(() => {
        platformLauncher.enhanceMovieCards();
    }, 1000);
    
    console.log('🚀 Platform Launcher Ready!');
});

// Global function for compatibility
function launchMovieInPlatform(movieId) {
    if (platformLauncher) {
        const movie = platformLauncher.getMovieFromStorage(movieId);
        if (movie) {
            platformLauncher.launchInOriginalPlatform(movie);
        }
    }
}
