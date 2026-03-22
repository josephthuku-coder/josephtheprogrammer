// 🎬 MOVIE UPLOAD SYSTEM
// Handles movie uploads with success messages

class MovieUploadSystem {
    constructor() {
        this.movieForm = document.getElementById('movieForm');
        this.musicForm = document.getElementById('musicForm');
        
        console.log('🎬 Movie Upload System Initialized');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        if (this.movieForm) {
            this.movieForm.addEventListener('submit', (e) => this.handleMovieUpload(e));
        }
        
        if (this.musicForm) {
            this.musicForm.addEventListener('submit', (e) => this.handleMusicUpload(e));
        }
    }
    
    handleMovieUpload(e) {
        e.preventDefault();
        
        const title = document.getElementById('movieTitle').value;
        const link = document.getElementById('movieLink').value;
        const genre = document.getElementById('movieGenre').value;
        const description = document.getElementById('movieDescription').value;
        
        // Validation
        if (!title || !link) {
            this.showMessage('Please fill in all required fields!', 'error');
            return;
        }
        
        // Create movie object
        const movie = {
            id: 'movie_' + Date.now(),
            title: title,
            url: link,
            link: link,
            category: 'movie',
            genre: genre || 'action',
            source: this.detectSource(link),
            views: Math.floor(Math.random() * 10000),
            likes: Math.floor(Math.random() * 1000),
            duration: '2h',
            quality: 'HD',
            rating: (Math.random() * 2 + 8).toFixed(1),
            description: description || 'No description available',
            year: new Date().getFullYear(),
            approved: true,
            timestamp: Date.now()
        };
        
        // Save to localStorage
        this.saveMovie(movie);
        
        // Show success message
        this.showMessage(`🎬 "${title}" uploaded successfully!`, 'success');
        
        // Clear form
        this.movieForm.reset();
        
        // Update fun page if open
        this.updateFunPage();
    }
    
    handleMusicUpload(e) {
        e.preventDefault();
        
        const title = document.getElementById('musicTitle').value;
        const link = document.getElementById('musicLink').value;
        const artist = document.getElementById('musicArtist').value;
        const genre = document.getElementById('musicGenre').value;
        const description = document.getElementById('musicDescription').value;
        
        // Validation
        if (!title || !link || !artist) {
            this.showMessage('Please fill in all required fields!', 'error');
            return;
        }
        
        // Create music object
        const music = {
            id: 'music_' + Date.now(),
            title: title,
            url: link,
            link: link,
            category: 'music',
            genre: genre || 'pop',
            source: this.detectSource(link),
            artist: artist,
            views: Math.floor(Math.random() * 10000),
            likes: Math.floor(Math.random() * 1000),
            duration: '3:30',
            quality: 'HD',
            rating: (Math.random() * 2 + 8).toFixed(1),
            description: description || 'No description available',
            year: new Date().getFullYear(),
            approved: true,
            timestamp: Date.now()
        };
        
        // Save to localStorage
        this.saveContent(music);
        
        // Show success message
        this.showMessage(`🎵 "${title}" uploaded successfully!`, 'success');
        
        // Clear form
        this.musicForm.reset();
        
        // Update fun page if open
        this.updateFunPage();
    }
    
    detectSource(link) {
        if (link.includes('youtube.com') || link.includes('youtu.be')) {
            return 'YouTube';
        } else if (link.includes('vimeo.com')) {
            return 'Vimeo';
        } else if (link.includes('dailymotion.com')) {
            return 'Dailymotion';
        } else if (link.includes('spotify.com')) {
            return 'Spotify';
        } else if (link.includes('.mp4') || link.includes('.webm') || link.includes('.ogg')) {
            return 'Direct File';
        } else {
            return 'Unknown';
        }
    }
    
    saveMovie(movie) {
        // Get existing funMedia
        let funMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        
        // Add new movie
        funMedia.push(movie);
        
        // Save to localStorage
        localStorage.setItem('funMedia', JSON.stringify(funMedia));
        
        console.log('✅ Movie saved:', movie);
    }
    
    saveContent(content) {
        // Get existing funMedia
        let funMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        
        // Add new content
        funMedia.push(content);
        
        // Save to localStorage
        localStorage.setItem('funMedia', JSON.stringify(funMedia));
        
        console.log('✅ Content saved:', content);
    }
    
    updateFunPage() {
        // Trigger update on fun page if it's open
        if (typeof refreshMovieSections === 'function') {
            refreshMovieSections();
        }
        
        // Trigger storage event for other tabs
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'funMedia',
            newValue: localStorage.getItem('funMedia')
        }));
    }
    
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
        const container = document.querySelector('.container, .dashboard-container, body');
        if (container) {
            container.insertBefore(messageDiv, container.firstChild);
        }
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 5000);
        
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
    
    // Load and display existing movies
    loadExistingMovies() {
        const funMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
        const movies = funMedia.filter(item => item.category === 'movie');
        
        console.log(`📺 Found ${movies.length} existing movies`);
        
        // Update dashboard display if needed
        const movieList = document.getElementById('movieList');
        if (movieList) {
            movieList.innerHTML = '';
            movies.forEach((movie, index) => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-item';
                movieCard.innerHTML = `
                    <div class="movie-info">
                        <h4>${movie.title}</h4>
                        <p><strong>Genre:</strong> ${movie.genre}</p>
                        <p><strong>Source:</strong> ${movie.source}</p>
                        <p><strong>Views:</strong> ${movie.views}</p>
                        <p><strong>Likes:</strong> ${movie.likes}</p>
                    </div>
                    <div class="movie-actions">
                        <button onclick="window.open('${movie.url}', '_blank')">▶️ Play</button>
                        <button onclick="movieUpload.deleteMovie(${index})">🗑️ Delete</button>
                    </div>
                `;
                movieList.appendChild(movieCard);
            });
        }
    }
    
    // Delete movie
    deleteMovie(index) {
        if (confirm('Are you sure you want to delete this movie?')) {
            let funMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
            funMedia.splice(index, 1);
            localStorage.setItem('funMedia', JSON.stringify(funMedia));
            
            this.showMessage('Movie deleted successfully!', 'success');
            this.loadExistingMovies();
            this.updateFunPage();
        }
    }
}

// Initialize movie upload system
let movieUpload;

document.addEventListener('DOMContentLoaded', () => {
    movieUpload = new MovieUploadSystem();
    
    // Load existing movies after 1 second
    setTimeout(() => {
        movieUpload.loadExistingMovies();
    }, 1000);
    
    console.log('🎬 Movie Upload System Ready!');
});

// Global function for compatibility
function deleteMovie(index) {
    if (movieUpload) {
        movieUpload.deleteMovie(index);
    }
}
