// 🎬 BRANDED MOVIE PLAYER SYSTEM
// Custom branded player with Netflix recommendations, ad-free, interactive features

class BrandedPlayer {
    constructor() {
        this.currentMovie = null;
        this.playerWindow = null;
        this.visitorTracking = new VisitorTracking();
        this.netflixAI = new NetflixAI();
        this.interactionSystem = new InteractionSystem();
        
        console.log('🎬 Branded Player System Initialized');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // More aggressive event listener setup
        document.addEventListener('click', (e) => {
            this.handleMovieClick(e);
        }, true); // Use capture phase
        
        // Also listen for mousedown for better detection
        document.addEventListener('mousedown', (e) => {
            this.handleMovieClick(e);
        }, true);
        
        console.log('🎬 Branded Player Event Listeners Setup Complete');
    }
    
    handleMovieClick(e) {
        console.log('🎬 Click detected:', e.target.tagName, e.target.className);
        
        // Check if it's a movie card
        const movieCard = e.target.closest('.media-card, .movie-card, .content-card');
        if (!movieCard) {
            console.log('❌ Not a movie card click');
            return;
        }
        
        console.log('✅ Movie card found:', movieCard);
        
        // Get movie ID
        const movieId = movieCard.dataset.movieId || movieCard.dataset.itemId;
        if (!movieId) {
            console.log('❌ No movie ID found');
            return;
        }
        
        console.log('🎯 Movie ID:', movieId);
        
        // Get movie data
        const movie = this.getMovieFromStorage(movieId);
        if (!movie) {
            console.log('❌ Movie not found in storage');
            return;
        }
        
        console.log('🎬 Movie found:', movie.title);
        
        // Check if it's a play button click or any click on the card
        const isPlayButton = e.target.closest('.play-btn, .watch-btn, .action-btn');
        const isAnyClick = true; // Allow any click on the card to launch
        
        if (isPlayButton || isAnyClick) {
            console.log('🚀 Launching branded player...');
            e.preventDefault();
            e.stopPropagation();
            this.launchBrandedPlayer(movie);
        }
    }
    
    getMovieFromStorage(movieId) {
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        return allMedia.find(item => item.id === movieId);
    }
    
    launchBrandedPlayer(movie) {
        this.currentMovie = movie;
        
        // Track visitor
        this.visitorTracking.trackMovieView(movie);
        
        // Create branded player window
        this.createBrandedPlayerWindow(movie);
        
        // Show launch message
        this.showMessage(`🎬 Launching "${movie.title}" in branded player...`, 'success');
    }
    
    createBrandedPlayerWindow(movie) {
        const playerUrl = this.generatePlayerUrl(movie);
        
        // Calculate optimal window size
        const width = Math.min(window.screen.width * 0.9, 1400);
        const height = Math.min(window.screen.height * 0.9, 900);
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        
        const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=yes,location=no,menubar=no,status=no`;
        
        this.playerWindow = window.open(playerUrl, '_blank', features);
        
        if (!this.playerWindow) {
            // Fallback for popup blockers
            window.open(playerUrl, '_blank');
        }
    }
    
    generatePlayerUrl(movie) {
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
        const playerPage = 'branded-player.html';
        const params = new URLSearchParams({
            movieId: movie.id,
            title: movie.title,
            url: movie.url || movie.link,
            source: movie.source,
            genre: movie.genre,
            rating: movie.rating,
            description: movie.description,
            year: movie.year,
            views: movie.views,
            likes: movie.likes
        });
        
        return `${baseUrl}${playerPage}?${params.toString()}`;
    }
    
    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.branded-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `branded-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${type === 'success' ? '🎬' : '❌'} ${message}
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
    }
}

// 🎬 NETFLIX AI RECOMMENDATIONS
class NetflixAI {
    constructor() {
        this.netflixMovies = this.generateNetflixMovies();
        console.log('🎬 Netflix AI Recommendations Ready');
    }
    
    generateNetflixMovies() {
        return [
            {
                id: 'netflix_1',
                title: 'Stranger Things',
                url: 'https://www.youtube.com/watch?v=6I1Z1a4n5w0',
                link: 'https://www.youtube.com/watch?v=6I1Z1a4n5w0',
                category: 'movie',
                genre: 'sci-fi',
                source: 'Netflix',
                views: 85000000,
                likes: 4200000,
                duration: '50min',
                quality: '4K',
                rating: '8.7',
                description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.',
                year: '2016',
                approved: true,
                timestamp: Date.now(),
                netflixOriginal: true
            },
            {
                id: 'netflix_2',
                title: 'The Crown',
                url: 'https://www.youtube.com/watch?v=JWqJtaH0Qw0',
                link: 'https://www.youtube.com/watch?v=JWqJtaH0Qw0',
                category: 'movie',
                genre: 'drama',
                source: 'Netflix',
                views: 65000000,
                likes: 3100000,
                duration: '60min',
                quality: '4K',
                rating: '8.6',
                description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign.',
                year: '2016',
                approved: true,
                timestamp: Date.now(),
                netflixOriginal: true
            },
            {
                id: 'netflix_3',
                title: 'The Witcher',
                url: 'https://www.youtube.com/watch?v=ndl1Wz9P_6E',
                link: 'https://www.youtube.com/watch?v=ndl1Wz9P_6E',
                category: 'movie',
                genre: 'fantasy',
                source: 'Netflix',
                views: 92000000,
                likes: 4800000,
                duration: '60min',
                quality: '4K',
                rating: '8.2',
                description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world.',
                year: '2019',
                approved: true,
                timestamp: Date.now(),
                netflixOriginal: true
            },
            {
                id: 'netflix_4',
                title: 'Bridgerton',
                url: 'https://www.youtube.com/watch?v=K-RcJXaT0A8',
                link: 'https://www.youtube.com/watch?v=K-RcJXaT0A8',
                category: 'movie',
                genre: 'romance',
                source: 'Netflix',
                views: 78000000,
                likes: 3900000,
                duration: '60min',
                quality: '4K',
                rating: '7.4',
                description: 'Wealthy aristocrats and their secrets in Regency-era London.',
                year: '2020',
                approved: true,
                timestamp: Date.now(),
                netflixOriginal: true
            },
            {
                id: 'netflix_5',
                title: 'Money Heist',
                url: 'https://www.youtube.com/watch?v=_InqQjr2_O0',
                link: 'https://www.youtube.com/watch?v=_InqQjr2_O0',
                category: 'movie',
                genre: 'thriller',
                source: 'Netflix',
                views: 120000000,
                likes: 6200000,
                duration: '70min',
                quality: '4K',
                rating: '8.2',
                description: 'A criminal mastermind assembles a team to pull off the perfect heist.',
                year: '2017',
                approved: true,
                timestamp: Date.now(),
                netflixOriginal: true
            }
        ];
    }
    
    getNetflixRecommendations(genre = null) {
        if (genre) {
            return this.netflixMovies.filter(movie => movie.genre === genre);
        }
        return this.netflixMovies;
    }
    
    addNetflixMoviesToStorage() {
        const existingMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        const netflixInStorage = existingMedia.filter(item => item.netflixOriginal);
        
        // Only add Netflix movies that aren't already in storage
        const newNetflixMovies = this.netflixMovies.filter(netflixMovie => 
            !netflixInStorage.some(existing => existing.id === netflixMovie.id)
        );
        
        if (newNetflixMovies.length > 0) {
            const updatedMedia = [...existingMedia, ...newNetflixMovies];
            localStorage.setItem('funMedia', JSON.stringify(updatedMedia));
            console.log(`🎬 Added ${newNetflixMovies.length} Netflix movies to storage`);
        }
        
        return newNetflixMovies.length;
    }
}

// 👁️ VISITOR TRACKING SYSTEM
class VisitorTracking {
    constructor() {
        this.visitors = JSON.parse(localStorage.getItem('websiteVisitors')) || [];
        this.currentVisitor = this.getCurrentVisitor();
        console.log('👁️ Visitor Tracking System Ready');
    }
    
    getCurrentVisitor() {
        const visitorId = this.getOrCreateVisitorId();
        const visitor = {
            id: visitorId,
            ip: 'Unknown', // Would need backend for real IP
            location: 'Unknown', // Would need geolocation API
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
            visits: 0,
            lastVisit: Date.now()
        };
        
        // Update existing visitor or add new
        const existingIndex = this.visitors.findIndex(v => v.id === visitorId);
        if (existingIndex >= 0) {
            this.visitors[existingIndex].visits++;
            this.visitors[existingIndex].lastVisit = Date.now();
            return this.visitors[existingIndex];
        } else {
            this.visitors.push(visitor);
            visitor.visits = 1;
            return visitor;
        }
    }
    
    getOrCreateVisitorId() {
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
            visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('visitorId', visitorId);
        }
        return visitorId;
    }
    
    trackMovieView(movie) {
        const viewData = {
            visitorId: this.currentVisitor.id,
            movieId: movie.id,
            movieTitle: movie.title,
            timestamp: Date.now(),
            action: 'view'
        };
        
        // Store view data
        const views = JSON.parse(localStorage.getItem('movieViews')) || [];
        views.push(viewData);
        localStorage.setItem('movieViews', JSON.stringify(views));
        
        // Update visitor data
        this.currentVisitor.lastVisit = Date.now();
        localStorage.setItem('websiteVisitors', JSON.stringify(this.visitors));
        
        console.log(`👁️ Tracked view: ${movie.title} by visitor ${this.currentVisitor.id}`);
    }
    
    getVisitorStats() {
        return {
            totalVisitors: this.visitors.length,
            currentVisitor: this.currentVisitor,
            recentVisitors: this.visitors.slice(-10).reverse()
        };
    }
}

// 💬 INTERACTION SYSTEM
class InteractionSystem {
    constructor() {
        this.likes = JSON.parse(localStorage.getItem('contentLikes')) || {};
        this.comments = JSON.parse(localStorage.getItem('contentComments')) || {};
        this.inbox = JSON.parse(localStorage.getItem('adminInbox')) || [];
        console.log('💬 Interaction System Ready');
    }
    
    likeContent(movieId, movieTitle) {
        if (!this.likes[movieId]) {
            this.likes[movieId] = 0;
        }
        this.likes[movieId]++;
        
        localStorage.setItem('contentLikes', JSON.stringify(this.likes));
        
        // Add to inbox
        this.addToInbox('like', movieId, movieTitle, 'Someone liked your content');
        
        return this.likes[movieId];
    }
    
    commentOnContent(movieId, movieTitle, comment, visitorId) {
        if (!this.comments[movieId]) {
            this.comments[movieId] = [];
        }
        
        const commentData = {
            id: 'comment_' + Date.now(),
            movieId: movieId,
            movieTitle: movieTitle,
            comment: comment,
            visitorId: visitorId,
            timestamp: Date.now(),
            approved: true
        };
        
        this.comments[movieId].push(commentData);
        localStorage.setItem('contentComments', JSON.stringify(this.comments));
        
        // Add to inbox
        this.addToInbox('comment', movieId, movieTitle, `New comment: "${comment}"`);
        
        return commentData;
    }
    
    addToInbox(type, movieId, movieTitle, message) {
        const inboxItem = {
            id: 'inbox_' + Date.now(),
            type: type,
            movieId: movieId,
            movieTitle: movieTitle,
            message: message,
            timestamp: Date.now(),
            read: false
        };
        
        this.inbox.unshift(inboxItem);
        localStorage.setItem('adminInbox', JSON.stringify(this.inbox));
        
        console.log(`📬 Added to inbox: ${message}`);
    }
    
    getLikes(movieId) {
        return this.likes[movieId] || 0;
    }
    
    getComments(movieId) {
        return this.comments[movieId] || [];
    }
    
    getInbox() {
        return this.inbox;
    }
    
    markInboxAsRead(inboxId) {
        const item = this.inbox.find(i => i.id === inboxId);
        if (item) {
            item.read = true;
            localStorage.setItem('adminInbox', JSON.stringify(this.inbox));
        }
    }
}

// Initialize branded player system
let brandedPlayer;

document.addEventListener('DOMContentLoaded', () => {
    brandedPlayer = new BrandedPlayer();
    
    // Add Netflix movies on load
    setTimeout(() => {
        const netflixAdded = brandedPlayer.netflixAI.addNetflixMoviesToStorage();
        if (netflixAdded > 0) {
            brandedPlayer.showMessage(`🎬 Added ${netflixAdded} Netflix movies!`, 'success');
        }
    }, 2000);
    
    console.log('🎬 Branded Player System Ready!');
});

// Global functions for compatibility
function launchBrandedPlayer(movieId) {
    if (brandedPlayer) {
        const movie = brandedPlayer.getMovieFromStorage(movieId);
        if (movie) {
            brandedPlayer.launchBrandedPlayer(movie);
        }
    }
}
