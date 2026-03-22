// AI Content Recommendation System
class AIContentAssistant {
  constructor() {
    this.isMonitoring = false;
    this.monitoringInterval = null;
    this.contentQueue = [];
    this.preferences = new Set(['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller', 'documentary', 'music']);
    this.notificationEmail = '';
    this.notificationFrequency = 'instant';
    this.monitoredPlatforms = {
      netflix: true,
      youtube: true,
      amazon: true,
      disney: true,
      hbo: true,
      hulu: true
    };
    this.currentContent = null;
    
    // Auto-start monitoring immediately
    this.startImmediateMonitoring();
  }

  startImmediateMonitoring() {
    console.log('🚀 Starting AI Content Assistant - 24/7 Monitoring Active');
    
    // Start monitoring immediately
    this.startMonitoring();
    
    // Set up continuous monitoring (every 30 seconds for demo, in production would be every few hours)
    this.monitoringInterval = setInterval(() => {
      this.discoverAndNotify();
    }, 30000); // 30 seconds for demo, change to 3600000 (1 hour) for production
    
    // Initial discovery
    setTimeout(() => {
      this.discoverAndNotify();
    }, 2000);
  }

  initializeAI() {
    // Load saved preferences
    this.loadPreferences();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Start monitoring if enabled
    if (localStorage.getItem('aiMonitoringEnabled') === 'true') {
      this.startAIMonitoring();
    }
  }

  setupEventListeners() {
    // Preference tags
    document.querySelectorAll('.tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        this.togglePreference(e.target);
      });
    });

    // Monitoring toggles
    document.querySelectorAll('.ai-toggle input').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        this.updateMonitoringSettings(e.target);
      });
    });

    // Notification settings
    const emailInput = document.getElementById('notificationEmail');
    const freqSelect = document.getElementById('notificationFreq');
    
    if (emailInput) {
      emailInput.addEventListener('change', (e) => {
        this.notificationEmail = e.target.value;
        this.savePreferences();
      });
    }
    
    if (freqSelect) {
      freqSelect.addEventListener('change', (e) => {
        this.notificationFrequency = e.target.value;
        this.savePreferences();
      });
    }
  }

  togglePreference(tag) {
    const genre = tag.dataset.genre;
    if (tag.classList.contains('active')) {
      this.preferences.delete(genre);
      tag.classList.remove('active');
    } else {
      this.preferences.add(genre);
      tag.classList.add('active');
    }
    this.savePreferences();
  }

  updateMonitoringSettings(toggle) {
    const source = toggle.id.replace('Monitor', '');
    this.monitoredPlatforms[source] = toggle.checked;
    this.savePreferences();
  }

  startAIMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.updateAIStatus('online');
    
    // Simulate AI monitoring with periodic checks
    this.monitoringInterval = setInterval(() => {
      this.performContentCheck();
    }, 30000); // Check every 30 seconds
    
    // Initial content check
    this.performContentCheck();
    
    // Save monitoring state
    localStorage.setItem('aiMonitoringEnabled', 'true');
    
    this.showNotification('AI monitoring started! I\'ll notify you about new content.', 'success');
  }

  stopAIMonitoring() {
    this.isMonitoring = false;
    this.updateAIStatus('offline');
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    
    localStorage.setItem('aiMonitoringEnabled', 'false');
    this.showNotification('AI monitoring stopped.', 'info');
  }

  performContentCheck() {
    console.log('🔍 AI performing aggressive content discovery from all platforms...');
    
    // Simulate content discovery from various sources
    const newContent = this.simulateContentDiscovery();
    
    if (newContent.length > 0) {
      console.log(`📬 AI discovered ${newContent.length} new content items!`);
      
      newContent.forEach(content => {
        this.processNewContent(content);
      });
      
      // Update dashboard if available
      if (typeof loadAIRecommendations === 'function') {
        loadAIRecommendations();
      }
      
      // Log platform discoveries
      this.logPlatformDiscoveries(newContent);
      
      // Show notification about new content
      this.showNotification(`🎬 Found ${newContent.length} new content items from multiple platforms!`, 'success');
    } else {
      console.log('📭 No new content found in this cycle, continuing monitoring...');
    }
    
    // Continue monitoring - never stop
    if (this.isMonitoring) {
      console.log('🔄 AI continuing 24/7 monitoring...');
    }
  }

  logPlatformDiscoveries(content) {
    const platformCounts = {};
    content.forEach(item => {
      const platform = item.source || 'Unknown';
      platformCounts[platform] = (platformCounts[platform] || 0) + 1;
    });
    
    console.log('📊 Platform Discovery Summary:');
    Object.entries(platformCounts).forEach(([platform, count]) => {
      console.log(`  ${platform}: ${count} items`);
    });
  }

  simulateContentDiscovery() {
    const simulatedContent = [];
    
    // Netflix Movies & Comedies - More aggressive discovery
    if (this.monitoredPlatforms.netflix && Math.random() > 0.3) { // 70% chance (was 30%)
      simulatedContent.push({
        id: Date.now() + '_netflix_movie_' + Math.random(),
        title: this.generateNetflixMovieTitle(),
        source: 'Netflix',
        genre: ['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller'][Math.floor(Math.random() * 6)],
        type: 'movie',
        rating: (Math.random() * 2 + 7).toFixed(1),
        duration: Math.floor(Math.random() * 40 + 80) + ' min',
        description: 'Netflix exclusive content discovered by AI',
        quality: 'HD 1080p',
        director: this.generateDirectorName(),
        cast: this.generateCastList()
      });
    }
    
    // YouTube Movies & Videos - More aggressive
    if (this.monitoredPlatforms.youtube && Math.random() > 0.3) { // 70% chance
      simulatedContent.push({
        id: Date.now() + '_youtube_movie_' + Math.random(),
        title: this.generateYouTubeMovieTitle(),
        source: 'YouTube',
        genre: ['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller', 'music'][Math.floor(Math.random() * 7)],
        type: 'movie',
        rating: (Math.random() * 2 + 7).toFixed(1),
        duration: Math.floor(Math.random() * 40 + 80) + ' min',
        description: 'YouTube premium content discovered by AI',
        quality: 'HD 1080p',
        director: this.generateDirectorName(),
        cast: this.generateCastList()
      });
    }
    
    // Amazon Prime Movies - More aggressive
    if (this.monitoredPlatforms.amazon && Math.random() > 0.3) { // 70% chance
      simulatedContent.push({
        id: Date.now() + '_amazon_movie_' + Math.random(),
        title: this.generateAmazonMovieTitle(),
        source: 'Amazon Prime',
        genre: ['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller'][Math.floor(Math.random() * 6)],
        type: 'movie',
        rating: (Math.random() * 2 + 7).toFixed(1),
        duration: Math.floor(Math.random() * 40 + 80) + ' min',
        description: 'Amazon Prime exclusive discovered by AI',
        quality: '4K Ultra HD',
        director: this.generateDirectorName(),
        cast: this.generateCastList()
      });
    }
    
    // Disney+ Movies - More aggressive
    if (this.monitoredPlatforms.disney && Math.random() > 0.3) { // 70% chance
      simulatedContent.push({
        id: Date.now() + '_disney_movie_' + Math.random(),
        title: this.generateDisneyMovieTitle(),
        source: 'Disney+',
        genre: ['action', 'comedy', 'drama', 'scifi', 'romance'][Math.floor(Math.random() * 5)],
        type: 'movie',
        rating: (Math.random() * 2 + 7).toFixed(1),
        duration: Math.floor(Math.random() * 40 + 80) + ' min',
        description: 'Disney+ family content discovered by AI',
        quality: '4K Ultra HD',
        director: this.generateDirectorName(),
        cast: this.generateCastList()
      });
    }
    
    // HBO Max Content - More aggressive
    if (this.monitoredPlatforms.hbo && Math.random() > 0.3) { // 70% chance
      simulatedContent.push({
        id: Date.now() + '_hbo_movie_' + Math.random(),
        title: this.generateHBOMovieTitle(),
        source: 'HBO Max',
        genre: ['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller'][Math.floor(Math.random() * 6)],
        type: 'movie',
        rating: (Math.random() * 2 + 7).toFixed(1),
        duration: Math.floor(Math.random() * 40 + 80) + ' min',
        description: 'HBO Max premium content discovered by AI',
        quality: '4K Ultra HD',
        director: this.generateDirectorName(),
        cast: this.generateCastList()
      });
    }
    
    // Hulu Content - More aggressive
    if (this.monitoredPlatforms.hulu && Math.random() > 0.3) { // 70% chance
      simulatedContent.push({
        id: Date.now() + '_hulu_movie_' + Math.random(),
        title: this.generateHuluMovieTitle(),
        source: 'Hulu',
        genre: ['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller'][Math.floor(Math.random() * 6)],
        type: 'movie',
        rating: (Math.random() * 2 + 7).toFixed(1),
        duration: Math.floor(Math.random() * 40 + 80) + ' min',
        description: 'Hulu exclusive content discovered by AI',
        quality: 'HD 1080p',
        director: this.generateDirectorName(),
        cast: this.generateCastList()
      });
    }
    
    // Music Content Discovery - More aggressive
    if (this.preferences.has('music') && Math.random() > 0.4) { // 60% chance
      simulatedContent.push({
        id: Date.now() + '_music_' + Math.random(),
        title: this.generateMusicTitle(),
        source: ['Spotify', 'Apple Music', 'YouTube Music', 'SoundCloud'][Math.floor(Math.random() * 4)],
        genre: 'music',
        type: 'music',
        rating: (Math.random() * 2 + 7).toFixed(1),
        duration: Math.floor(Math.random() * 3 + 2) + ' min',
        description: 'Trending music discovered by AI',
        quality: 'High Quality Audio',
        artist: this.generateArtistName()
      });
    }
    
    return simulatedContent.filter(content => 
      this.preferences.has(content.genre) || this.preferences.size === 0
    );
  }

  generateMusicTitle() {
    const titles = [
      'Neural Symphony', 'Digital Dreams', 'Code Beats', 'Tech Harmony',
      'AI Melody', 'Binary Rhythm', 'Silicon Sound', 'Pixel Music',
      'Cyber Song', 'Algorithm Anthem', 'Virtual Vibes', 'Electronic Echo'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateArtistName() {
    const artists = [
      'Digital Maestro', 'Code Composer', 'Tech Virtuoso', 'AI Artist',
      'Binary Beatmaker', 'Silicon Singer', 'Pixel Performer', 'Cyber Creator'
    ];
    return artists[Math.floor(Math.random() * artists.length)];
  }

  generateYouTubeMovieTitle() {
    const titles = [
      'Digital Destiny', 'Code Warriors', 'Tech Revolution', 'Silicon Dreams',
      'AI Uprising', 'Cyber Revolution', 'Binary Battles', 'Pixel Paradise',
      'Neural Network', 'Algorithm Adventure', 'Virtual Victory', 'Digital Dynasty'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateAmazonMovieTitle() {
    const titles = [
      'Prime Action', 'Amazon Adventure', 'Tech Thriller', 'Digital Drama',
      'Code Comedy', 'Silicon Suspense', 'Binary Romance', 'Pixel Fantasy',
      'Neural Mystery', 'Algorithm Horror', 'Virtual Western', 'Digital Sci-Fi'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateNetflixMovieTitle() {
    const titles = [
      'Netflix Original', 'Stream Thriller', 'Digital Series', 'Code Drama',
      'Tech Documentary', 'Silicon Comedy', 'Binary Action', 'Pixel Romance',
      'Neural Mystery', 'Algorithm Adventure', 'Virtual Fantasy', 'Digital Horror'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateYouTubeChannel() {
    const channels = [
      'Tech Cinema', 'Digital Movies', 'Code Films', 'Silicon Studios',
      'AI Productions', 'Binary Pictures', 'Pixel Films', 'Cyber Movies',
      'Neural Entertainment', 'Algorithm Studios', 'Virtual Productions', 'Digital Cinema'
    ];
    return channels[Math.floor(Math.random() * channels.length)];
  }

  getRandomGenre() {
    const genres = ['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller'];
    return genres[Math.floor(Math.random() * genres.length)];
  }

  generateDirectorName() {
    const directors = [
      'Digital Director', 'Code Creator', 'Tech Visionary', 'AI Filmmaker',
      'Binary Director', 'Silicon Storyteller', 'Pixel Producer', 'Cyber Creator'
    ];
    return directors[Math.floor(Math.random() * directors.length)];
  }

  generateCastList() {
    const castMembers = [
      'Tech Actor', 'Digital Star', 'Code Performer', 'AI Artist',
      'Binary Actor', 'Silicon Star', 'Pixel Performer', 'Cyber Celebrity'
    ];
    const castSize = Math.floor(Math.random() * 3) + 2; // 2-4 cast members
    const cast = [];
    for (let i = 0; i < castSize; i++) {
      cast.push(castMembers[Math.floor(Math.random() * castMembers.length)]);
    }
    return cast.join(', ');
  }
}
    
    // Disney+ Movies & Comedies
    if (Math.random() > 0.85) {
      simulatedContent.push({
        id: Date.now() + '_disney_movie',
        source: 'Disney+',
        type: 'movie',
        title: this.generateDisneyMovieTitle(),
        genre: this.getRandomGenre(),
        description: 'New Disney+ release matching your preferences',
        rating: (Math.random() * 1.5 + 8).toFixed(1),
        releaseDate: new Date().toISOString(),
        duration: Math.floor(Math.random() * 50 + 90) + ' minutes',
        poster: 'https://picsum.photos/300/450?random=' + Date.now(),
        quality: '4K Ultra HD',
        director: this.generateDirectorName(),
        cast: this.generateCastList()
      });
    }
    
    // HBO Max Movies & Comedies
    if (Math.random() > 0.9) {
      simulatedContent.push({
        id: Date.now() + '_hbo_movie',
        source: 'HBO Max',
        type: 'movie',
        title: this.generateHBOMovieTitle(),
        genre: this.getRandomGenre(),
        description: 'New HBO Max release matching your preferences',
        rating: (Math.random() * 2 + 8.5).toFixed(1),
        releaseDate: new Date().toISOString(),
        duration: Math.floor(Math.random() * 60 + 110) + ' minutes',
        poster: 'https://picsum.photos/300/450?random=' + Date.now(),
        quality: '4K Ultra HD',
        director: this.generateDirectorName(),
        cast: this.generateCastList()
      });
    }
    
    // Hulu Movies & Comedies
    if (Math.random() > 0.85) {
      simulatedContent.push({
        id: Date.now() + '_hulu_movie',
        source: 'Hulu',
        type: 'movie',
        title: this.generateHuluMovieTitle(),
        genre: this.getRandomGenre(),
        description: 'New Hulu release matching your preferences',
        rating: (Math.random() * 2 + 7).toFixed(1),
        releaseDate: new Date().toISOString(),
        duration: Math.floor(Math.random() * 40 + 80) + ' minutes',
        poster: 'https://picsum.photos/300/450?random=' + Date.now(),
        quality: 'HD 1080p',
        director: this.generateDirectorName()
      });
    }
    
    return simulatedContent.filter(content => 
      this.preferences.has(content.genre) || this.preferences.size === 0
    );
  }

  generateNetflixMovieTitle() {
    const titles = [
      'The Digital Shadow', 'Code Warriors', 'Silicon Dreams', 'The Algorithm',
      'Neural Networks', 'Quantum Love', 'The Developer', 'Startup Nation',
      'Tech Titans', 'Binary Hearts', 'The Innovation', 'Cyber Romance',
      'The Matrix Reimagined', 'Digital Revolution', 'Tech Apocalypse'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateYouTubeMovieTitle() {
    const titles = [
      'AI: The Final Frontier', 'Coding Masters', 'Tech Innovation 2024',
      'The YouTube Phenomenon', 'Digital Creators', 'Viral Sensation',
      'Content Kings', 'The Stream Dream', 'Video Visionaries',
      'The Creator Economy', 'Digital Stars', 'Screen Revolution'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateAmazonMovieTitle() {
    const titles = [
      'Prime Thriller', 'Amazon Adventure', 'The Prime Mystery',
      'Digital Jungle', 'Tech Warriors', 'The Prime Code',
      'Amazon Primeval', 'The Digital Hunt', 'Prime Detectives',
      'The Amazon Effect', 'Prime Conspiracy', 'Digital Amazon'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateDisneyMovieTitle() {
    const titles = [
      'Digital Magic Kingdom', 'Tech Princess', 'The Algorithm Castle',
      'Silicon Fairy Tale', 'Digital Wonder', 'The Tech Kingdom',
      'Code Magic', 'The Digital Wand', 'Tech Fantasy',
      'The Binary Crown', 'Digital Dreams', 'The Code Prince'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateHBOMovieTitle() {
    const titles = [
      'The Tech Mafia', 'Digital Crime', 'Silicon Gangsters',
      'The Code Cartel', 'Tech Underworld', 'Digital Outlaws',
      'The Binary Mob', 'Tech Kings', 'Digital Empire',
      'The Silicon Syndicate', 'Code Wars', 'Digital Dynasty'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateHuluMovieTitle() {
    const titles = [
      'Hulu Horror', 'Tech Terror', 'The Digital Haunting',
      'Silicon Screams', 'Code Nightmares', 'Digital Fear',
      'The Tech Curse', 'Binary Evil', 'Digital Darkness',
      'The Code Phantom', 'Tech Shadows', 'Digital Demons'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateDirectorName() {
    const directors = [
      'Christopher Nolan', 'Steven Spielberg', 'Martin Scorsese',
      'Quentin Tarantino', 'David Fincher', 'Denis Villeneuve',
      'Jordan Peele', 'Greta Gerwig', 'Taika Waititi',
      'Rian Johnson', 'Edgar Wright', 'Wes Anderson'
    ];
    return directors[Math.floor(Math.random() * directors.length)];
  }

  generateCastList() {
    const actors = [
      'Tom Hardy', 'Margot Robbie', 'Ryan Gosling', 'Emma Stone',
      'Oscar Isaac', 'Zendaya', 'Timothée Chalamet', 'Florence Pugh',
      'Adam Driver', 'Saoirse Ronan', 'Michael B. Jordan', 'Lupita Nyong\'o'
    ];
    
    const castSize = Math.floor(Math.random() * 3) + 2;
    const selectedActors = [];
    
    for (let i = 0; i < castSize; i++) {
      const actor = actors[Math.floor(Math.random() * actors.length)];
      if (!selectedActors.includes(actor)) {
        selectedActors.push(actor);
      }
    }
    
    return selectedActors.join(', ');
  }

  generateYouTubeChannel() {
    const channels = [
      'TechVision', 'CodeMasters', 'DigitalDreams', 'InnovationHub',
      'TechTrends', 'CreatorCentral', 'VideoVanguard', 'DigitalPioneers',
      'StreamTeam', 'ContentKings', 'TechTalks', 'DigitalGenius'
    ];
    return channels[Math.floor(Math.random() * channels.length)];
  }

  generateVideoTitle() {
    const titles = [
      'AI Explained: The Future',
      'Coding Masterclass 2024',
      'Tech Innovation Showcase',
      'Digital Transformation',
      'The AI Revolution',
      'Programming Excellence',
      'Tech Trends Analysis',
      'Software Engineering Guide'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateComedyTitle() {
    const titles = [
      'Tech Life Comedy Special',
      'Developer Jokes',
      'Silicon Valley Laughs',
      'Programming Humor',
      'Tech Support Fails',
      'Coding Comedy Hour',
      'IT Problems',
      'Software Satire'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  getRandomGenre() {
    const genres = ['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller', 'documentary'];
    const userGenres = Array.from(this.preferences);
    return userGenres.length > 0 
      ? userGenres[Math.floor(Math.random() * userGenres.length)]
      : genres[Math.floor(Math.random() * genres.length)];
  }

  processNewContent(content) {
    // Check if content already processed
    if (this.pendingContent.find(c => c.id === content.id) || 
        this.approvedContent.find(c => c.id === content.id)) {
      return;
    }
    
    // Add to pending content
    this.pendingContent.push(content);
    
    // Send notification
    this.sendContentNotification(content);
  }

  sendContentNotification(content) {
    // Store current content for approval
    this.currentRecommendedContent = content;
    
    const notificationContent = this.createNotificationHTML(content);
    document.getElementById('notificationContent').innerHTML = notificationContent;
    document.getElementById('aiNotificationModal').style.display = 'flex';
    
    // Also send email if configured
    if (this.notificationEmail) {
      this.sendEmailNotification(content);
    }
  }

  createNotificationHTML(content) {
    return `
      <div class="content-preview">
        <h4>${content.title}</h4>
        <div class="content-meta">
          <span class="source">${content.source}</span>
          <span class="genre">${content.genre}</span>
          <span class="rating">${content.rating || 'N/A'}</span>
        </div>
        <p class="description">${content.description}</p>
        <div class="content-details">
          ${content.releaseDate ? `<span>📅 ${new Date(content.releaseDate).toLocaleDateString()}</span>` : ''}
          ${content.duration ? `<span>⏱️ ${content.duration}</span>` : ''}
          ${content.views ? `<span>👁️ ${this.formatViews(content.views)} views</span>` : ''}
        </div>
        ${content.poster || content.thumbnail ? `
          <div class="content-visual">
            <img src="${content.poster || content.thumbnail}" alt="${content.title}" style="max-width: 200px; border-radius: 10px;">
          </div>
        ` : ''}
      </div>
    `;
  }

  formatViews(views) {
    if (views > 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views > 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  }

  sendEmailNotification(content) {
    // Simulate email sending (in real implementation, use backend service)
    console.log('Email notification sent to:', this.notificationEmail);
    console.log('Content:', content);
    
    // Store notification for sending
    const notifications = JSON.parse(localStorage.getItem('pendingNotifications') || '[]');
    notifications.push({
      email: this.notificationEmail,
      content: content,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('pendingNotifications', JSON.stringify(notifications));
  }

  updateAIStatus(status) {
    const statusElement = document.querySelector('.status-indicator');
    if (statusElement) {
      statusElement.className = `status-indicator ${status}`;
      const statusText = statusElement.querySelector('.status-text');
      statusText.textContent = status === 'online' 
        ? 'AI Assistant Online - Monitoring Content' 
        : 'AI Assistant Offline';
    }
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `ai-notification ${type}`;
    notification.innerHTML = `
      <span class="notification-icon">${type === 'success' ? '✅' : 'ℹ️'}</span>
      <span class="notification-text">${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  savePreferences() {
    const preferences = {
      genres: Array.from(this.preferences),
      monitoredSources: this.monitoredSources,
      notificationEmail: this.notificationEmail,
      notificationFrequency: this.notificationFrequency
    };
    localStorage.setItem('aiPreferences', JSON.stringify(preferences));
  }

  loadPreferences() {
    const saved = localStorage.getItem('aiPreferences');
    if (saved) {
      const preferences = JSON.parse(saved);
      
      // Load genres
      if (preferences.genres) {
        this.preferences = new Set(preferences.genres);
        document.querySelectorAll('.tag').forEach(tag => {
          if (this.preferences.has(tag.dataset.genre)) {
            tag.classList.add('active');
          }
        });
      }
      
      // Load monitoring settings
      if (preferences.monitoredSources) {
        this.monitoredSources = preferences.monitoredSources;
        Object.keys(this.monitoredSources).forEach(source => {
          const checkbox = document.getElementById(source + 'Monitor');
          if (checkbox) {
            checkbox.checked = this.monitoredSources[source];
          }
        });
      }
      
      // Load notification settings
      this.notificationEmail = preferences.notificationEmail || '';
      this.notificationFrequency = preferences.notificationFrequency || 'instant';
      
      const emailInput = document.getElementById('notificationEmail');
      const freqSelect = document.getElementById('notificationFreq');
      
      if (emailInput) emailInput.value = this.notificationEmail;
      if (freqSelect) freqSelect.value = this.notificationFrequency;
    }
  }

  generateRecommendations() {
    // Generate AI recommendations based on preferences
    const recommendations = [];
    const genres = Array.from(this.preferences);
    
    if (genres.length === 0) {
      genres.push('action'); // Default genre
    }
    
    // Generate 5 recommendations
    for (let i = 0; i < 5; i++) {
      recommendations.push({
        id: 'rec_' + Date.now() + '_' + i,
        title: this.generateMovieTitle(),
        genre: genres[Math.floor(Math.random() * genres.length)],
        source: ['Netflix', 'YouTube', 'HBO Max', 'Disney+', 'Amazon Prime'][Math.floor(Math.random() * 5)],
        confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
        reason: this.generateRecommendationReason(genres[Math.floor(Math.random() * genres.length)])
      });
    }
    
    return recommendations;
  }

  generateRecommendationReason(genre) {
    const reasons = {
      action: "Because you enjoy high-energy action content",
      comedy: "Based on your interest in comedy entertainment",
      drama: "Recommended for your preference in dramatic storytelling",
      scifi: "Perfect for your sci-fi and technology interests",
      romance: "Chosen for your appreciation of romantic narratives",
      thriller: "Selected for your taste in suspenseful content",
      documentary: "Ideal for your interest in educational content"
    };
    return reasons[genre] || "Recommended based on your viewing preferences";
  }
}

// Global AI Assistant instance
let aiAssistant;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  aiAssistant = new AIContentAssistant();
});

// Global functions for HTML onclick handlers
function toggleAIPanel() {
  const panel = document.getElementById('aiPanel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function startAIMonitoring() {
  if (aiAssistant) {
    aiAssistant.startAIMonitoring();
  }
}

function testAINotification() {
  if (aiAssistant) {
    const testContent = {
      id: 'test_' + Date.now(),
      source: 'Test Source',
      type: 'movie',
      title: 'Test Movie Recommendation',
      genre: 'action',
      description: 'This is a test notification to verify the AI recommendation system is working properly.',
      rating: '8.5',
      releaseDate: new Date().toISOString(),
      poster: 'https://picsum.photos/300/450?random=test'
    };
    aiAssistant.sendContentNotification(testContent);
  }
}

function viewAIRecommendations() {
  if (aiAssistant) {
    const recommendations = aiAssistant.generateRecommendations();
    
    const recommendationsHTML = `
      <h4>💡 AI Recommendations For You</h4>
      <div class="recommendations-list">
        ${recommendations.map(rec => `
          <div class="recommendation-item">
            <h5>${rec.title}</h5>
            <div class="rec-meta">
              <span class="source">${rec.source}</span>
              <span class="genre">${rec.genre}</span>
              <span class="confidence">${rec.confidence}% match</span>
            </div>
            <p class="reason">${rec.reason}</p>
          </div>
        `).join('')}
      </div>
    `;
    
    document.getElementById('notificationContent').innerHTML = recommendationsHTML;
    document.getElementById('aiNotificationModal').style.display = 'flex';
  }
}

function closeNotificationModal() {
  document.getElementById('aiNotificationModal').style.display = 'none';
}

function approveContent() {
  // Get the current recommended content from AI assistant
  let content = null;
  if (aiAssistant && aiAssistant.currentRecommendedContent) {
    content = aiAssistant.currentRecommendedContent;
  } else {
    // Fallback: extract from modal
    const modalContent = document.getElementById('notificationContent').innerHTML;
    content = {
      title: extractTitleFromModal(modalContent),
      genre: extractGenreFromModal(modalContent),
      source: extractSourceFromModal(modalContent),
      description: extractDescriptionFromModal(modalContent)
    };
  }
  
  // Create approved item in fun.js format
  const approvedItem = {
    title: content.title || 'AI Recommended Content',
    category: mapGenreToCategory(content.genre),
    originalGenre: content.genre, // Save original genre for filtering
    link: generateContentLink(content),
    likes: 0,
    views: Math.floor(Math.random() * 10000) + 1000,
    source: content.source || 'AI Recommendation',
    addedDate: new Date().toISOString(),
    aiRecommended: true
  };
  
  // Save to localStorage in the format fun.js expects
  let existingMedia = JSON.parse(localStorage.getItem("funMedia")) || [];
  existingMedia.push(approvedItem);
  localStorage.setItem("funMedia", JSON.stringify(existingMedia));
  
  // Move from pending to approved
  if (aiAssistant) {
    aiAssistant.showNotification('Content approved and added to your collection!', 'success');
    
    // Remove from pending and add to approved
    if (aiAssistant.currentRecommendedContent) {
      const pendingIndex = aiAssistant.pendingContent.findIndex(c => c.id === aiAssistant.currentRecommendedContent.id);
      if (pendingIndex > -1) {
        aiAssistant.pendingContent.splice(pendingIndex, 1);
      }
      aiAssistant.approvedContent.push(aiAssistant.currentRecommendedContent);
      aiAssistant.currentRecommendedContent = null;
    }
    
    // Refresh the media display
    if (typeof loadMedia === 'function') {
      loadMedia();
    }
    if (typeof loadTrending === 'function') {
      loadTrending();
    }
  }
  
  closeNotificationModal();
}

function extractTitleFromModal(content) {
  const titleMatch = content.match(/<h4>(.*?)<\/h4>/);
  return titleMatch ? titleMatch[1] : 'AI Recommended Content';
}

function extractGenreFromModal(content) {
  const genreMatch = content.match(/<span[^>]*class="genre"[^>]*>(.*?)<\/span>/);
  return genreMatch ? genreMatch[1] : 'action';
}

function extractSourceFromModal(content) {
  const sourceMatch = content.match(/<span[^>]*class="source"[^>]*>(.*?)<\/span>/);
  return sourceMatch ? sourceMatch[1] : 'AI Assistant';
}

function extractDescriptionFromModal(content) {
  const descMatch = content.match(/<p[^>]*class="description"[^>]*>(.*?)<\/p>/);
  return descMatch ? descMatch[1] : 'AI recommended content based on your preferences';
}

function mapGenreToCategory(genre) {
  const categoryMap = {
    'action': 'movie',
    'comedy': 'movie',
    'drama': 'movie',
    'scifi': 'movie',
    'romance': 'movie',
    'thriller': 'movie',
    'documentary': 'video',
    'music': 'music',
    'musical': 'music'
  };
  return categoryMap[genre.toLowerCase()] || 'video';
}

function generateContentLink(content) {
  // Generate appropriate embed link based on content type
  const sources = [
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://player.vimeo.com/video/76979871',
    'https://www.youtube.com/embed/9bZkp7q19f0',
    'https://www.youtube.com/embed/3JZ_D3ELwOQ'
  ];
  return sources[Math.floor(Math.random() * sources.length)];
}

function rejectContent() {
  // Remove content from pending
  if (aiAssistant) {
    aiAssistant.showNotification('Content recommendation rejected.', 'info');
  }
  
  closeNotificationModal();
}

function reviewLater() {
  // Keep content in pending for later review
  if (aiAssistant) {
    aiAssistant.showNotification('Content saved for later review.', 'info');
  }
  
  closeNotificationModal();
}

// Add CSS for notifications
const aiNotificationCSS = `
.ai-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.95), rgba(255, 20, 147, 0.95));
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.4);
  z-index: 10001;
  animation: slideInRight 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 300px;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 400px;
  overflow-y: auto;
}

.recommendation-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.recommendation-item h5 {
  margin: 0 0 10px 0;
  color: white;
  font-size: 16px;
}

.rec-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}

.rec-meta span {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.confidence {
  background: rgba(76, 255, 76, 0.3) !important;
}

.reason {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  font-style: italic;
}

.content-preview {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.content-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.content-meta span {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 13px;
  font-weight: 600;
}

.content-details {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  font-size: 14px;
}

.content-visual {
  text-align: center;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .ai-panel {
    padding: 20px;
    margin: 20px 0;
  }
  
  .ai-actions {
    flex-direction: column;
  }
  
  .ai-btn {
    width: 100%;
  }
  
  .modal-content {
    width: 95%;
    padding: 20px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .modal-btn {
    width: 100%;
  }
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = aiNotificationCSS;
document.head.appendChild(styleSheet);
