// 🎬 PERFECT MOVIE INTEGRATION SYSTEM
// Ensures uploaded movies appear perfectly in all sections

class MovieIntegrationSystem {
    constructor() {
        this.movieSection = document.getElementById('movieSection');
        this.allSection = document.getElementById('allSection');
        this.trendingContainer = document.getElementById('trendingContainer');
        this.searchContainer = document.getElementById('searchContainer');
        
        console.log('🎬 Movie Integration System Initialized');
        this.setupEventListeners();
        this.refreshAllSections();
    }
    
    setupEventListeners() {
        // Listen for localStorage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'funMedia') {
                console.log('🔄 Movies updated, refreshing sections...');
                this.refreshAllSections();
            }
        });
        
        // Listen for page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('📱 Page visible, refreshing movies...');
                this.refreshAllSections();
            }
        });
    }
    
    // Get all movies from localStorage
    getAllMovies() {
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        return allMedia.filter(item => 
            item.category === 'movie' || 
            item.originalGenre === 'movie' ||
            this.isMovieGenre(item.originalGenre) ||
            this.isMovieGenre(item.genre)
        );
    }
    
    // Check if genre is movie-related
    isMovieGenre(genre) {
        if (!genre) return false;
        const movieGenres = [
            'action', 'comedy', 'drama', 'scifi', 'romance', 'thriller',
            'horror', 'fantasy', 'animation', 'documentary', 'mystery',
            'adventure', 'crime', 'war', 'western', 'musical'
        ];
        return movieGenres.includes(genre.toLowerCase());
    }
    
    // Refresh all movie sections
    refreshAllSections() {
        console.log('🔄 Refreshing all movie sections...');
        
        this.refreshMovieSection();
        this.refreshAllSection();
        this.refreshTrending();
        this.refreshSearch();
        
        console.log('✅ All sections refreshed');
    }
    
    // Refresh movie section
    refreshMovieSection() {
        const movies = this.getAllMovies();
        const movieSection = document.getElementById('movieSection');
        
        if (!movieSection) {
            console.log('⚠️ Movie section not found');
            return;
        }
        
        this.displayMoviesInSection(movieSection, movies, 'movie');
        console.log(`📺 Movie section updated: ${movies.length} movies`);
    }
    
    // Refresh "All" section
    refreshAllSection() {
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        const allSection = document.getElementById('allSection');
        
        if (!allSection) {
            console.log('⚠️ All section not found');
            return;
        }
        
        this.displayMoviesInSection(allSection, allMedia, 'all');
        console.log(`📺 All section updated: ${allMedia.length} items`);
    }
    
    // Refresh trending
    refreshTrending() {
        const movies = this.getAllMovies();
        const trendingContainer = document.getElementById('trendingContainer');
        
        if (!trendingContainer) {
            console.log('⚠️ Trending container not found');
            return;
        }
        
        this.displayTrendingMovies(trendingContainer, movies);
        console.log(`📺 Trending updated: ${Math.min(3, movies.length)} movies`);
    }
    
    // Refresh search
    refreshSearch() {
        // Search is dynamic, just log availability
        console.log('📺 Search section ready for movie queries');
    }
    
    // Display movies in a section
    displayMoviesInSection(container, movies, sectionType) {
        // Clear existing content (except headers)
        const existingMovies = container.querySelectorAll('.media-card');
        existingMovies.forEach(card => card.remove());
        
        if (movies.length === 0) {
            this.showEmptyState(container, sectionType);
            return;
        }
        
        movies.forEach((movie, index) => {
            const movieCard = this.createMovieCard(movie, index, sectionType);
            container.appendChild(movieCard);
        });
    }
    
    // Create movie card
    createMovieCard(movie, index, sectionType) {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.dataset.movieId = movie.id;
        
        // Enhanced movie card with perfect styling
        card.innerHTML = `
            <div class="movie-poster">
                <img src="${this.getMoviePoster(movie)}" alt="${movie.title}" 
                     onerror="this.src='https://picsum.photos/seed/${movie.id}/300/450.jpg'">
                <div class="play-overlay">
                    <button class="play-btn" onclick="launchBrandedPlayer('${movie.id}')">
                        🎬 PLAY
                    </button>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${movie.year || new Date().getFullYear()}</span>
                    <span class="movie-rating">⭐ ${movie.rating || 'N/A'}</span>
                    <span class="movie-duration">⏱️ ${movie.duration || 'Unknown'}</span>
                </div>
                <div class="movie-stats">
                    <span class="views">👁️ ${this.formatNumber(movie.views || 0)}</span>
                    <span class="likes" id="likes-${movie.id}">❤️ ${this.formatNumber(movie.likes || 0)}</span>
                </div>
                <div class="movie-actions">
                    <button class="action-btn like-btn" onclick="likeMovie('${movie.id}')">
                        ❤️ LIKE
                    </button>
                    <button class="action-btn watch-btn" onclick="launchBrandedPlayer('${movie.id}')">
                        🎬 WATCH
                    </button>
                    ${movie.approved ? `
                        <button class="action-btn admin-btn" onclick="authenticateAdmin('${movie.id}')">
                            🗑️ DELETE
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        
        // Add direct click handler for branded player
        card.addEventListener('click', (e) => {
            console.log('🎬 Movie card clicked:', movie.title);
            e.preventDefault();
            e.stopPropagation();
            launchBrandedPlayer(movie.id);
        });
        
        return card;
    }
    
    // Display trending movies
    displayTrendingMovies(container, movies) {
        // Clear existing content
        container.innerHTML = '';
        
        if (movies.length === 0) {
            container.innerHTML = '<div class="no-trending">No trending movies</div>';
            return;
        }
        
        // Sort by views and get top 3
        const trendingMovies = movies
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 3);
        
        trendingMovies.forEach((movie, index) => {
            const trendingCard = this.createTrendingCard(movie, index);
            container.appendChild(trendingCard);
        });
    }
    
    // Create trending card
    createTrendingCard(movie, index) {
        const card = document.createElement('div');
        card.className = 'media-card trending-card';
        
        card.innerHTML = `
            <div class="trending-number">${index + 1}</div>
            <h3>🔥 ${movie.title}</h3>
            <div class="movie-meta">
                <span class="movie-rating">⭐ ${movie.rating || 'N/A'}</span>
                <span class="views">👁️ ${this.formatNumber(movie.views || 0)}</span>
            </div>
            <button class="watch-btn" onclick="movieIntegration.playMovie('${movie.id}')">
                🎬 WATCH NOW
            </button>
        `;
        
        return card;
    }
    
    // Show empty state
    showEmptyState(container, sectionType) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <h3>No ${sectionType === 'movie' ? 'movies' : 'content'} found</h3>
            <p>Upload some ${sectionType === 'movie' ? 'movies' : 'content'} to see them here!</p>
            <button class="add-content-btn" onclick="window.location.href='admin-panel.html'">
                + Add ${sectionType === 'movie' ? 'Movies' : 'Content'}
            </button>
        `;
        container.appendChild(emptyState);
    }
    
    // Get movie poster
    getMoviePoster(movie) {
        if (movie.poster) return movie.poster;
        if (movie.thumbnail) return movie.thumbnail;
        
        // Generate poster based on title
        const seed = movie.title.replace(/\s+/g, '').toLowerCase();
        return `https://picsum.photos/seed/${seed}/300/450.jpg`;
    }
    
    // Format numbers
    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }
    
    // Play movie - SIMPLE WORKING VERSION
    playMovie(movieId) {
        console.log('🎬 Playing movie:', movieId);
        
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        const movie = allMedia.find(m => m.id === movieId);
        
        if (!movie) {
            console.error('❌ Movie not found:', movieId);
            return;
        }
        
        console.log('✅ Found movie:', movie.title);
        console.log('🚀 Opening URL:', movie.url || movie.link);
        
        // SIMPLE DIRECT NAVIGATION - Most reliable method
        const videoUrl = movie.url || movie.link;
        window.open(videoUrl, '_blank');
        
        console.log('✅ Movie opened in new tab!');
    }
}

// Display trending movies
function displayTrendingMovies(container, movies) {
    // Clear existing content
    container.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        container.appendChild(movieCard);
    });
}

// Like movie - WORKING VERSION
function likeMovie(movieId) {
    console.log('❤️ Liking movie:', movieId);
    
    const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
    const movieIndex = allMedia.findIndex(m => m.id === movieId);
    
    if (movieIndex !== -1) {
        // Increment likes
        allMedia[movieIndex].likes = (allMedia[movieIndex].likes || 0) + 1;
        
        // Save to localStorage
        localStorage.setItem('funMedia', JSON.stringify(allMedia));
        
        // Update the likes display
        const likesElement = document.getElementById(`likes-${movieId}`);
        if (likesElement) {
            likesElement.textContent = `❤️ ${allMedia[movieIndex].likes}`;
        }
        
        // Refresh display
        if (movieIntegration) {
            movieIntegration.refreshAllSections();
        }
        
        console.log('✅ Movie liked:', allMedia[movieIndex].title, 'Total likes:', allMedia[movieIndex].likes);
        
        // Show success message
        showLikeMessage(allMedia[movieIndex].title);
    } else {
        console.log('❌ Movie not found:', movieId);
    }
}

// Show like message
function showLikeMessage(movieTitle) {
    // Create or update like notification
    let notification = document.getElementById('likeNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'likeNotification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(145deg, #ff1493, #c71585);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(255, 20, 147, 0.4);
            z-index: 10000;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = `❤️ You liked "${movieTitle}"!`;
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// Search movies
function searchMovies(query) {
    const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
    
    const searchResults = allMedia.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        (movie.description && movie.description.toLowerCase().includes(query.toLowerCase())) ||
        (movie.genre && movie.genre.toLowerCase().includes(query.toLowerCase()))
    );
    
    return searchResults;
}

// Initialize the system
let movieIntegration;

document.addEventListener('DOMContentLoaded', () => {
    movieIntegration = new MovieIntegrationSystem();
    console.log('🎬 Movie Integration System Ready!');
});

// Global functions for compatibility
function refreshMovieSections() {
    if (movieIntegration) {
        movieIntegration.refreshAllSections();
    }
}

function addNewMovie(movieData) {
    if (movieIntegration) {
        return movieIntegration.addMovie(movieData);
    }
}

function searchMovieSection(query) {
    if (movieIntegration) {
        return movieIntegration.searchMovies(query);
    }
}

// Export for use in other scripts

// Authenticate admin before delete
function authenticateAdmin(movieId) {
    const password = prompt('🔐 Enter admin password to delete this movie:');
    
    if (password === '4997G9749@j') {
        deleteMovie(movieId);
    } else if (password !== null) {
        alert('❌ Incorrect password! Access denied.');
        console.log('❌ Admin authentication failed for movie:', movieId);
    }
}

// Delete movie - WORKING VERSION
function deleteMovie(movieId) {
    console.log('🗑️ Deleting movie:', movieId);
    
    const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
    const movieIndex = allMedia.findIndex(m => m.id === movieId);
    
    if (movieIndex !== -1) {
        const movieTitle = allMedia[movieIndex].title;
        allMedia.splice(movieIndex, 1);
        localStorage.setItem('funMedia', JSON.stringify(allMedia));
        
        // Refresh display
        if (movieIntegration) {
            movieIntegration.refreshAllSections();
        }
        
        console.log('✅ Movie deleted:', movieTitle);
        
        // Show success message
        showDeleteMessage(movieTitle);
    } else {
        console.log('❌ Movie not found:', movieId);
    }
}

// Show delete message
function showDeleteMessage(movieTitle) {
    // Create or update delete notification
    let notification = document.getElementById('deleteNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'deleteNotification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(145deg, #dc3545, #c82333);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(220, 53, 69, 0.4);
            z-index: 10000;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = `🗑️ Movie "${movieTitle}" deleted successfully!`;
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MovieIntegrationSystem;
}
