// 🎬 CLEAN FUN PAGE - REAL MOVIES ONLY
// Removes trending staff and shows only real uploaded movies

class CleanFunPage {
    constructor() {
        this.movieSection = document.getElementById('movieSection');
        this.allSection = document.getElementById('allSection');
        this.trendingContainer = document.getElementById('trendingContainer');
        this.searchContainer = document.getElementById('searchContainer');
        
        console.log('🎬 Clean Fun Page Initialized');
        this.setupEventListeners();
        this.loadRealMovies();
        this.removeTrendingStaff();
    }
    
    setupEventListeners() {
        // Listen for localStorage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'funMedia') {
                console.log('🔄 Movies updated, refreshing...');
                this.loadRealMovies();
                this.removeTrendingStaff();
            }
        });
    }
    
    // Load only real uploaded movies
    loadRealMovies() {
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        const realMovies = allMedia.filter(item => 
            item.category === 'movie' && 
            !item.title.includes('Trending') &&
            !item.title.includes('Staff') &&
            !item.title.includes('AI') &&
            !item.title.includes('Sample')
        );
        
        console.log(`📺 Loading ${realMovies.length} real movies`);
        
        // Update movie section
        this.updateMovieSection(realMovies);
        
        // Update all section
        this.updateAllSection(realMovies);
        
        // Remove trending section completely
        this.removeTrendingSection();
    }
    
    // Update movie section with real movies only
    updateMovieSection(movies) {
        const movieSection = document.getElementById('movieSection');
        if (!movieSection) return;
        
        // Clear existing content
        movieSection.innerHTML = '';
        
        if (movies.length === 0) {
            movieSection.innerHTML = `
                <div class="empty-state">
                    <h3>No movies uploaded yet</h3>
                    <p>Upload your first movie to see it here!</p>
                    <button onclick="window.location.href='admin-panel.html'" class="add-movie-btn">
                        + Add Movie
                    </button>
                </div>
            `;
            return;
        }
        
        // Display real movies
        movies.forEach((movie, index) => {
            const movieCard = this.createMovieCard(movie, index);
            movieSection.appendChild(movieCard);
        });
    }
    
    // Update all section with real content
    updateAllSection(movies) {
        const allSection = document.getElementById('allSection');
        if (!allSection) return;
        
        // Clear existing content
        allSection.innerHTML = '';
        
        if (movies.length === 0) {
            allSection.innerHTML = `
                <div class="empty-state">
                    <h3>No content uploaded yet</h3>
                    <p>Upload some movies or content to see them here!</p>
                </div>
            `;
            return;
        }
        
        // Display all content
        movies.forEach((item, index) => {
            const contentCard = this.createContentCard(item, index);
            allSection.appendChild(contentCard);
        });
    }
    
    // Remove trending staff completely
    removeTrendingStaff() {
        const trendingContainer = document.getElementById('trendingContainer');
        if (trendingContainer) {
            trendingContainer.innerHTML = `
                <div class="no-trending">
                    <h3>🎬 Real Movies Only</h3>
                    <p>Trending has been removed to show only your uploaded movies.</p>
                </div>
            `;
        }
        
        // Also remove from any other trending sections
        document.querySelectorAll('.trending-section, .trending-container').forEach(section => {
            if (section && section.id !== 'trendingContainer') {
                section.innerHTML = `
                    <div class="no-trending">
                        <h3>🎬 Real Movies</h3>
                        <p>Showing only your uploaded content.</p>
                    </div>
                `;
            }
        });
    }
    
    // Remove trending section entirely
    removeTrendingSection() {
        const trendingElements = document.querySelectorAll('[class*="trending"], [id*="trending"]');
        trendingElements.forEach(element => {
            if (element && element.parentElement) {
                element.parentElement.removeChild(element);
            }
        });
    }
    
    // Create movie card
    createMovieCard(movie, index) {
        const card = document.createElement('div');
        card.className = 'media-card movie-card';
        card.dataset.movieId = movie.id;
        
        card.innerHTML = `
            <div class="movie-poster">
                <img src="${this.getMoviePoster(movie)}" alt="${movie.title}" 
                     onerror="this.src='https://picsum.photos/seed/${movie.id}/300/450.jpg'">
                <div class="play-overlay">
                    <button class="play-btn" onclick="cleanFun.playMovie('${movie.id}')">
                        ▶️ PLAY
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
                    <span class="likes">❤️ ${this.formatNumber(movie.likes || 0)}</span>
                </div>
                <div class="movie-actions">
                    <button class="action-btn like-btn" onclick="cleanFun.likeMovie('${movie.id}')">
                        ❤️ LIKE
                    </button>
                    <button class="action-btn watch-btn" onclick="cleanFun.playMovie('${movie.id}')">
                        🎬 WATCH
                    </button>
                    ${movie.approved ? `
                        <button class="action-btn admin-btn" onclick="cleanFun.deleteMovie('${movie.id}')">
                            🗑️ DELETE
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Create content card
    createContentCard(item, index) {
        const card = document.createElement('div');
        card.className = 'media-card content-card';
        card.dataset.itemId = item.id;
        
        card.innerHTML = `
            <div class="content-poster">
                <img src="${this.getContentPoster(item)}" alt="${item.title}" 
                     onerror="this.src='https://picsum.photos/seed/${item.id}/300/450.jpg'">
                <div class="play-overlay">
                    <button class="play-btn" onclick="cleanFun.playContent('${item.id}')">
                        ▶️ PLAY
                    </button>
                </div>
            </div>
            <div class="content-info">
                <h3 class="content-title">${item.title}</h3>
                <div class="content-meta">
                    <span class="content-category">${item.category}</span>
                    <span class="content-rating">⭐ ${item.rating || 'N/A'}</span>
                    <span class="content-duration">⏱️ ${item.duration || 'Unknown'}</span>
                </div>
                <div class="content-stats">
                    <span class="views">👁️ ${this.formatNumber(item.views || 0)}</span>
                    <span class="likes">❤️ ${this.formatNumber(item.likes || 0)}</span>
                </div>
                <div class="content-actions">
                    <button class="action-btn like-btn" onclick="cleanFun.likeContent('${item.id}')">
                        ❤️ LIKE
                    </button>
                    <button class="action-btn watch-btn" onclick="cleanFun.playContent('${item.id}')">
                        🎬 WATCH
                    </button>
                    ${item.approved ? `
                        <button class="action-btn admin-btn" onclick="cleanFun.deleteContent('${item.id}')">
                            🗑️ DELETE
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Get movie poster
    getMoviePoster(movie) {
        if (movie.poster) return movie.poster;
        if (movie.thumbnail) return movie.thumbnail;
        
        const seed = movie.title.replace(/\s+/g, '').toLowerCase();
        return `https://picsum.photos/seed/${seed}/300/450.jpg`;
    }
    
    // Get content poster
    getContentPoster(item) {
        if (item.poster) return item.poster;
        if (item.thumbnail) return item.thumbnail;
        
        const seed = item.title.replace(/\s+/g, '').toLowerCase();
        return `https://picsum.photos/seed/${seed}/300/450.jpg`;
    }
    
    // Format numbers
    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }
    
    // Play movie
    playMovie(movieId) {
        console.log('🎬 Playing movie:', movieId);
        
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        const movie = allMedia.find(m => m.id === movieId);
        
        if (!movie) {
            this.showMessage('Movie not found. Please try again.', 'error');
            return;
        }
        
        // Create theater-compatible media object
        const theaterMedia = {
            title: movie.title,
            url: movie.url || movie.link,
            source: movie.source,
            category: movie.category,
            views: movie.views || 0,
            likes: movie.likes || 0,
            duration: movie.duration,
            quality: movie.quality,
            rating: movie.rating,
            description: movie.description
        };
        
        // Try to open video theater
        if (typeof openVideoTheater === 'function') {
            openVideoTheater(theaterMedia);
        } else if (typeof openVideoTheatre === 'function') {
            openVideoTheatre(theaterMedia);
        } else {
            window.open(movie.url || movie.link, '_blank');
        }
    }
    
    // Play content
    playContent(contentId) {
        console.log('🎬 Playing content:', contentId);
        
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        const content = allMedia.find(m => m.id === contentId);
        
        if (!content) {
            this.showMessage('Content not found. Please try again.', 'error');
            return;
        }
        
        // Create theater-compatible media object
        const theaterMedia = {
            title: content.title,
            url: content.url || content.link,
            source: content.source,
            category: content.category,
            views: content.views || 0,
            likes: content.likes || 0,
            duration: content.duration,
            quality: content.quality,
            rating: content.rating,
            description: content.description
        };
        
        // Try to open video theater
        if (typeof openVideoTheater === 'function') {
            openVideoTheater(theaterMedia);
        } else if (typeof openVideoTheatre === 'function') {
            openVideoTheatre(theaterMedia);
        } else {
            window.open(content.url || content.link, '_blank');
        }
    }
    
    // Like movie
    likeMovie(movieId) {
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        const movieIndex = allMedia.findIndex(m => m.id === movieId);
        
        if (movieIndex !== -1) {
            allMedia[movieIndex].likes = (allMedia[movieIndex].likes || 0) + 1;
            localStorage.setItem('funMedia', JSON.stringify(allMedia));
            
            this.loadRealMovies();
            this.showMessage('Movie liked successfully!', 'success');
        }
    }
    
    // Like content
    likeContent(contentId) {
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        const contentIndex = allMedia.findIndex(m => m.id === contentId);
        
        if (contentIndex !== -1) {
            allMedia[contentIndex].likes = (allMedia[contentIndex].likes || 0) + 1;
            localStorage.setItem('funMedia', JSON.stringify(allMedia));
            
            this.loadRealMovies();
            this.showMessage('Content liked successfully!', 'success');
        }
    }
    
    // Delete movie
    deleteMovie(movieId) {
        const password = prompt('Enter admin password to delete this movie:');
        if (password !== '4997G9749@j') {
            this.showMessage('Incorrect password!', 'error');
            return;
        }
        
        if (confirm('Are you sure you want to delete this movie?')) {
            const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
            const filteredMedia = allMedia.filter(m => m.id !== movieId);
            localStorage.setItem('funMedia', JSON.stringify(filteredMedia));
            
            this.loadRealMovies();
            this.showMessage('Movie deleted successfully!', 'success');
        }
    }
    
    // Delete content
    deleteContent(contentId) {
        const password = prompt('Enter admin password to delete this content:');
        if (password !== '4997G9749@j') {
            this.showMessage('Incorrect password!', 'error');
            return;
        }
        
        if (confirm('Are you sure you want to delete this content?')) {
            const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
            const filteredMedia = allMedia.filter(m => m.id !== contentId);
            localStorage.setItem('funMedia', JSON.stringify(filteredMedia));
            
            this.loadRealMovies();
            this.showMessage('Content deleted successfully!', 'success');
        }
    }
    
    // Show message
    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.upload-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `upload-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${type === 'success' ? '✅' : '❌'} ${message}
                <button class="close-message" onclick="this.parentElement.remove()">×</button>
            </div>
        `;
        
        // Add message to top of page
        const container = document.querySelector('.container') || document.body;
        container.insertBefore(messageDiv, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 5000);
    }
    
    // Add new movie with success message
    addNewMovie(movieData) {
        const allMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        
        const movie = {
            id: movieData.id || 'movie_' + Date.now(),
            title: movieData.title || 'Untitled Movie',
            category: 'movie',
            source: movieData.source || 'YouTube',
            url: movieData.url || movieData.link,
            views: movieData.views || 0,
            likes: movieData.likes || 0,
            duration: movieData.duration || 'Unknown',
            quality: movieData.quality || 'HD',
            rating: movieData.rating || 'N/A',
            description: movieData.description || 'No description',
            year: movieData.year || new Date().getFullYear(),
            genre: movieData.genre || 'action',
            approved: true,
            timestamp: Date.now(),
            ...movieData
        };
        
        allMedia.push(movie);
        localStorage.setItem('funMedia', JSON.stringify(allMedia));
        
        this.loadRealMovies();
        this.showMessage(`"${movie.title}" uploaded successfully!`, 'success');
        
        return movie;
    }
}

// Initialize clean fun page
let cleanFun;

document.addEventListener('DOMContentLoaded', () => {
    cleanFun = new CleanFunPage();
    console.log('🎬 Clean Fun Page Ready - No more trending staff!');
});

// Global functions for compatibility
function addRealMovie(movieData) {
    if (cleanFun) {
        return cleanFun.addNewMovie(movieData);
    }
}

function refreshRealMovies() {
    if (cleanFun) {
        cleanFun.loadRealMovies();
    }
}
