// Social Media Content Loader
class SocialMediaLoader {
  constructor() {
    this.tiktokContent = [];
    this.instagramContent = [];
    this.isAdmin = this.checkAdminAccess();
    this.isLoading = false;
    this.currentPage = 0;
    this.itemsPerPage = 20;
    this.hasMoreContent = true;
    
    // Initialize social media content
    this.initializeSocialMedia();
    
    // Setup infinite scroll
    this.setupInfiniteScroll();
  }

  checkAdminAccess() {
    // Check if user is administrator (you can modify this logic)
    const password = localStorage.getItem('adminPassword');
    return password === '4997G9749@j' || window.location.hostname === 'localhost';
  }

  initializeSocialMedia() {
    // Generate initial TikTok content
    this.generateTikTokContent();
    
    // Generate initial Instagram content
    this.generateInstagramContent();
  }

  setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
      if (this.isLoading || !this.hasMoreContent) return;
      
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 1000;
      
      if (scrollPosition >= threshold) {
        this.loadMoreContent();
      }
    });
  }

  loadMoreContent() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.showLoadingIndicator();
    
    // Simulate async loading with setTimeout for smooth UX
    setTimeout(() => {
      if (this.currentPage === 0) {
        // First load - initial content
        this.currentPage++;
      } else {
        // Subsequent loads - generate more content
        this.generateAdditionalContent();
        this.currentPage++;
      }
      
      this.hideLoadingIndicator();
      this.isLoading = false;
      
      // Update current view
      const activeTab = document.querySelector('.filter-tab.active');
      if (activeTab && activeTab.classList.contains('tiktok-tab')) {
        this.appendTikTokContent();
      } else if (activeTab && activeTab.classList.contains('instagram-tab')) {
        this.appendInstagramContent();
      }
    }, 300); // Fast loading for smooth experience
  }

  generateAdditionalContent() {
    // Generate more TikTok content
    for (let i = 0; i < this.itemsPerPage; i++) {
      this.tiktokContent.push(this.createRandomTikTokVideo());
    }
    
    // Generate more Instagram content
    for (let i = 0; i < this.itemsPerPage; i++) {
      this.instagramContent.push(this.createRandomInstagramPost());
    }
  }

  createRandomTikTokVideo() {
    const titles = [
      'Viral Dance Challenge 🔥', 'Tech Tips & Tricks 💻', 'Comedy Sketch 😂',
      'Food Recipe 🍕', 'Fashion Haul 👗', 'Pet Tricks 🐕', 'Travel Vlog ✈️',
      'Fitness Routine 💪', 'Art Tutorial 🎨', 'Gaming Highlights 🎮',
      'Life Hack 💡', 'Music Cover 🎵', 'DIY Project 🔨', 'Story Time 📖',
      'Challenge Accepted 🏆', 'Morning Routine ☀️', 'Night Routine 🌙',
      'Room Tour 🏠', 'Glow Up ✨', 'Trending Sound 🎶'
    ];
    
    const creators = [
      '@techvision', '@codemasters', '@airevolution', '@startupkings',
      '@digitalartists', '@creators', '@influencers', '@trendsetters',
      '@viralcontent', '@socialmedia', '@contentcreator', '@lifestyle',
      '@entertainment', '@comedycentral', '@musiclover', '@artistic',
      '@fitnessguru', '@foodie', '@traveler', '@gamer'
    ];
    
    const hashtags = [
      ['#viral', '#fyp', '#trending', '#foryou'],
      ['#tech', '#coding', '#programming', '#developer'],
      ['#comedy', '#funny', '#lol', '#memes'],
      ['#food', '#recipe', '#cooking', '#yum'],
      ['#fashion', '#style', '#ootd', '#outfit'],
      ['#pets', '#animals', '#cute', '#petsofinstagram'],
      ['#travel', '#wanderlust', '#vacation', '#explore'],
      ['#fitness', '#workout', '#health', '#gym'],
      ['#art', '#creative', '#artist', '#drawing'],
      ['#gaming', '#gamer', '#videogames', '#esports']
    ];
    
    const randomIndex = Math.floor(Math.random() * titles.length);
    const randomCreator = creators[Math.floor(Math.random() * creators.length)];
    const randomHashtags = hashtags[Math.floor(Math.random() * hashtags.length)];
    
    return {
      id: `tiktok_${Date.now()}_${randomIndex}`,
      title: titles[randomIndex],
      creator: randomCreator,
      views: Math.floor(Math.random() * 5000000) + 100000,
      likes: Math.floor(Math.random() * 300000) + 10000,
      comments: Math.floor(Math.random() * 5000) + 100,
      shares: Math.floor(Math.random() * 10000) + 500,
      duration: '0:' + Math.floor(Math.random() * 59 + 15),
      thumbnail: `https://picsum.photos/400/800?random=${Date.now()}_${randomIndex}`,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: `Amazing ${titles[randomIndex].toLowerCase()} content! ✨`,
      hashtags: randomHashtags,
      music: 'Original Sound - ' + randomCreator.replace('@', '')
    };
  }

  createRandomInstagramPost() {
    const titles = [
      'Tech Innovation 📱', 'Coding Setup Goals 💻', 'AI Art Gallery 🎨',
      'Startup Culture 🚀', 'Digital Marketing 📈', 'Web Design Inspiration 🌐',
      'Photography Tips 📸', 'Video Editing 🎬', 'Social Media Growth 📊',
      'Content Creation 📝', 'Brand Design 🎯', 'Mobile Development 📲',
      'Cloud Computing ☁️', 'Cybersecurity 🔒', 'Data Science 📊',
      'Machine Learning 🤖', 'Blockchain Technology 🔗', 'IoT Devices 🏠',
      'Virtual Reality 🥽', 'Augmented Reality 👓'
    ];
    
    const creators = [
      '@techinnovators', '@devlifestyle', '@aiartgallery', '@startuplife',
      '@marketingguru', '@designinspiration', '@photography', '@videoeditors',
      '@socialmediaexpert', '@contentcreator', '@branddesigner', '@mobiledev',
      '@cloudexpert', '@cybersecurity', '@datascientist', '@mlengineer',
      '@blockchaindev', '@iotdeveloper', '@vrcreator', '@ardeveloper'
    ];
    
    const locations = [
      'Silicon Valley, CA', 'New York, NY', 'Los Angeles, CA', 'Austin, TX',
      'Seattle, WA', 'Boston, MA', 'Miami, FL', 'Chicago, IL',
      'Denver, CO', 'Portland, OR', 'San Francisco, CA', 'San Diego, CA',
      'Las Vegas, NV', 'Phoenix, AZ', 'Atlanta, GA', 'Dallas, TX',
      'Houston, TX', 'Detroit, MI', 'Philadelphia, PA', 'Washington, DC'
    ];
    
    const hashtags = [
      ['#tech', '#innovation', '#technology', '#future'],
      ['#coding', '#programming', '#developer', '#software'],
      ['#ai', '#artificialintelligence', '#machinelearning', '#tech'],
      ['#startup', '#entrepreneur', '#business', '#success'],
      ['#marketing', '#digital', '#socialmedia', '#growth'],
      ['#design', '#webdesign', '#uidesign', '#creativity'],
      ['#photography', '#photo', '#camera', '#art'],
      ['#video', '#editing', '#filmmaking', '#content'],
      ['#socialmedia', '#instagram', '#influencer', '#marketing'],
      ['#content', '#creator', '#blog', '#writing']
    ];
    
    const randomIndex = Math.floor(Math.random() * titles.length);
    const randomCreator = creators[Math.floor(Math.random() * creators.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomHashtags = hashtags[Math.floor(Math.random() * hashtags.length)];
    
    return {
      id: `instagram_${Date.now()}_${randomIndex}`,
      title: titles[randomIndex],
      creator: randomCreator,
      type: 'video',
      views: Math.floor(Math.random() * 1000000) + 50000,
      likes: Math.floor(Math.random() * 50000) + 5000,
      comments: Math.floor(Math.random() * 1000) + 50,
      thumbnail: `https://picsum.photos/400/400?random=${Date.now()}_${randomIndex}`,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      duration: Math.floor(Math.random() * 60 + 30) + ' seconds',
      description: `Check out this amazing ${titles[randomIndex].toLowerCase()}! 🚀`,
      hashtags: randomHashtags,
      location: randomLocation
    };
  }

  showLoadingIndicator() {
    const container = document.getElementById('mediaContainer');
    if (!container) {
      console.warn('⚠️ mediaContainer not found, skipping loading indicator');
      return;
    }
    
    const existing = document.querySelector('.loading-indicator');
    if (existing) return;
    
    const loader = document.createElement('div');
    loader.className = 'loading-indicator';
    loader.innerHTML = `
      <div class="loader-spinner"></div>
      <p>Loading more amazing content...</p>
    `;
    container.appendChild(loader);
  }

  hideLoadingIndicator() {
    const loader = document.querySelector('.loading-indicator');
    if (loader) {
      loader.remove();
    }
  }

  appendTikTokContent() {
    const grid = document.querySelector('.tiktok-grid');
    if (!grid) return;
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const newContent = this.tiktokContent.slice(startIndex, endIndex);
    
    newContent.forEach((video, index) => {
      const actualIndex = startIndex + index;
      const card = this.createTikTokCard(video, actualIndex);
      grid.appendChild(card);
    });
  }

  appendInstagramContent() {
    const grid = document.querySelector('.instagram-grid');
    if (!grid) return;
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const newContent = this.instagramContent.slice(startIndex, endIndex);
    
    newContent.forEach((video, index) => {
      const actualIndex = startIndex + index;
      const card = this.createInstagramCard(video, actualIndex);
      grid.appendChild(card);
    });
  }

  generateTikTokContent() {
    const tiktokVideos = [
      {
        id: 'tiktok_1',
        title: 'Tech Trends 2024 🔥',
        creator: '@techvision',
        views: 2500000,
        likes: 180000,
        comments: 3400,
        shares: 8900,
        duration: '0:45',
        thumbnail: 'https://picsum.photos/400/800?random=tiktok1',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'Latest tech trends that will blow your mind! 🤯 #tech #trends #2024',
        hashtags: ['#tech', '#trends', '#2024', '#innovation'],
        music: 'Original Sound - TechVision'
      },
      {
        id: 'tiktok_2',
        title: 'Coding Life 💻✨',
        creator: '@codemasters',
        views: 1800000,
        likes: 120000,
        comments: 2100,
        shares: 5600,
        duration: '0:32',
        thumbnail: 'https://picsum.photos/400/800?random=tiktok2',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: 'Day in the life of a software developer 💻 #coding #programmer #developer',
        hashtags: ['#coding', '#programmer', '#developer', '#tech'],
        music: 'Lo-fi beats - Coding Vibes'
      },
      {
        id: 'tiktok_3',
        title: 'AI Revolution 🤖',
        creator: '@airevolution',
        views: 3200000,
        likes: 280000,
        comments: 4500,
        shares: 12000,
        duration: '0:58',
        thumbnail: 'https://picsum.photos/400/800?random=tiktok3',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        description: 'AI is changing everything! 🤖✨ #ai #artificialintelligence #future',
        hashtags: ['#ai', '#artificialintelligence', '#future', '#technology'],
        music: 'Futuristic Beats - AI Sound'
      },
      {
        id: 'tiktok_4',
        title: 'Startup Success 🚀',
        creator: '@startupkings',
        views: 1500000,
        likes: 95000,
        comments: 1800,
        shares: 4200,
        duration: '0:41',
        thumbnail: 'https://picsum.photos/400/800?random=tiktok4',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        description: 'From idea to unicorn startup! 🚀 #startup #entrepreneur #success',
        hashtags: ['#startup', '#entrepreneur', '#success', '#business'],
        music: 'Motivational - Startup Anthem'
      },
      {
        id: 'tiktok_5',
        title: 'Digital Art 🎨',
        creator: '@digitalartists',
        views: 2100000,
        likes: 165000,
        comments: 2900,
        shares: 7800,
        duration: '0:52',
        thumbnail: 'https://picsum.photos/400/800?random=tiktok5',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description: 'Amazing digital art creations! 🎨✨ #digitalart #art #creative',
        hashtags: ['#digitalart', '#art', '#creative', '#design'],
        music: 'Artistic Vibes - Creative Flow'
      }
    ];

    this.tiktokContent = tiktokVideos;
  }

  generateInstagramContent() {
    const instagramPosts = [
      {
        id: 'instagram_1',
        title: 'Tech Innovation 📱',
        creator: '@techinnovators',
        type: 'video',
        views: 450000,
        likes: 28000,
        comments: 890,
        thumbnail: 'https://picsum.photos/400/400?random=insta1',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: '1:30',
        description: 'Latest smartphone technology that will change everything! 📱✨',
        hashtags: ['#tech', '#innovation', '#smartphone', '#technology'],
        location: 'Silicon Valley, CA'
      },
      {
        id: 'instagram_2',
        title: 'Coding Setup Goals 💻',
        creator: '@devlifestyle',
        type: 'video',
        views: 320000,
        likes: 19000,
        comments: 650,
        thumbnail: 'https://picsum.photos/400/400?random=insta2',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: '0:45',
        description: 'My ultimate coding setup! What do you think? 💻⌨️',
        hashtags: ['#coding', '#setup', '#developer', '#workspace'],
        location: 'Home Office'
      },
      {
        id: 'instagram_3',
        title: 'AI Art Gallery 🎨',
        creator: '@aiartgallery',
        type: 'video',
        views: 580000,
        likes: 41000,
        comments: 1200,
        thumbnail: 'https://picsum.photos/400/400?random=insta3',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        duration: '2:15',
        description: 'Incredible AI-generated art pieces! 🤖🎨',
        hashtags: ['#aiart', '#digitalart', '#artificialintelligence', '#gallery'],
        location: 'Digital Gallery'
      },
      {
        id: 'instagram_4',
        title: 'Startup Culture 🚀',
        creator: '@startuplife',
        type: 'video',
        views: 280000,
        likes: 15000,
        comments: 420,
        thumbnail: 'https://picsum.photos/400/400?random=insta4',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        duration: '1:00',
        description: 'Behind the scenes at a unicorn startup! 🦄💼',
        hashtags: ['#startup', '#culture', '#business', '#office'],
        location: 'Tech Hub'
      },
      {
        id: 'instagram_5',
        title: 'Digital Marketing Tips 📈',
        creator: '@marketingguru',
        type: 'video',
        views: 390000,
        likes: 22000,
        comments: 780,
        thumbnail: 'https://picsum.photos/400/400?random=insta5',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        duration: '0:55',
        description: '5 digital marketing tips that actually work! 📈💡',
        hashtags: ['#marketing', '#digital', '#tips', '#business'],
        location: 'Marketing HQ'
      }
    ];

    this.instagramContent = instagramPosts;
  }

  loadTikTokContent() {
    const container = document.getElementById('mediaContainer');
    if (!container) {
      console.warn('⚠️ mediaContainer not found for TikTok content');
      return;
    }
    
    container.innerHTML = '';

    // Update active tab
    this.updateActiveTab('tiktok');

    // Add TikTok header
    const header = document.createElement('div');
    header.className = 'social-header';
    header.innerHTML = `
      <h2>🎵 TikTok Videos</h2>
      <p>Free TikTok content - No login required!</p>
      <div class="social-stats">
        <span class="stat">📹 ${this.tiktokContent.length} videos</span>
        <span class="stat">👁️ ${this.formatViews(this.tiktokContent.reduce((sum, v) => sum + v.views, 0))} total views</span>
      </div>
    `;
    container.appendChild(header);

    // Create TikTok grid
    const grid = document.createElement('div');
    grid.className = 'tiktok-grid';

    // Load initial content
    this.tiktokContent.forEach((video, index) => {
      const card = this.createTikTokCard(video, index);
      grid.appendChild(card);
    });

    container.appendChild(grid);

    // Add admin controls if admin
    if (this.isAdmin) {
      this.addAdminControls(container, 'tiktok');
    }
    
    // Start infinite loading immediately
    setTimeout(() => {
      this.loadMoreContent();
    }, 100);
  }

  loadInstagramContent() {
    const container = document.getElementById('mediaContainer');
    if (!container) {
      console.warn('⚠️ mediaContainer not found for Instagram content');
      return;
    }
    
    container.innerHTML = '';

    // Update active tab
    this.updateActiveTab('instagram');

    // Add Instagram header
    const header = document.createElement('div');
    header.className = 'social-header';
    header.innerHTML = `
      <h2>📷 Instagram Videos</h2>
      <p>Free Instagram content - No account required!</p>
      <div class="social-stats">
        <span class="stat">📹 ${this.instagramContent.length} videos</span>
        <span class="stat">👁️ ${this.formatViews(this.instagramContent.reduce((sum, v) => sum + v.views, 0))} total views</span>
      </div>
    `;
    container.appendChild(header);

    // Create Instagram grid
    const grid = document.createElement('div');
    grid.className = 'instagram-grid';

    // Load initial content
    this.instagramContent.forEach((video, index) => {
      const card = this.createInstagramCard(video, index);
      grid.appendChild(card);
    });

    container.appendChild(grid);

    // Add admin controls if admin
    if (this.isAdmin) {
      this.addAdminControls(container, 'instagram');
    }
    
    // Start infinite loading immediately
    setTimeout(() => {
      this.loadMoreContent();
    }, 100);
  }

  createTikTokCard(video, index) {
    const card = document.createElement('div');
    card.className = 'tiktok-card';
    card.innerHTML = `
      <div class="tiktok-thumbnail" onclick="openSocialVideo('tiktok', ${index})">
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="tiktok-overlay">
          <div class="play-icon">▶️</div>
          <div class="duration">${video.duration}</div>
        </div>
      </div>
      <div class="tiktok-info">
        <h3>${video.title}</h3>
        <div class="creator">@${video.creator}</div>
        <div class="tiktok-stats">
          <span>👁️ ${this.formatViews(video.views)}</span>
          <span>❤️ ${this.formatViews(video.likes)}</span>
          <span>💬 ${video.comments}</span>
        </div>
        <div class="tiktok-description">${video.description}</div>
        <div class="tiktok-hashtags">${video.hashtags.join(' ')}</div>
        <div class="tiktok-music">🎵 ${video.music}</div>
      </div>
      ${this.isAdmin ? `
        <div class="admin-controls">
          <button class="admin-btn delete" onclick="deleteSocialContent('tiktok', ${index})">🗑️ Delete</button>
        </div>
      ` : ''}
    `;
    return card;
  }

  createInstagramCard(video, index) {
    const card = document.createElement('div');
    card.className = 'instagram-card';
    card.innerHTML = `
      <div class="instagram-thumbnail" onclick="openSocialVideo('instagram', ${index})">
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="instagram-overlay">
          <div class="play-icon">▶️</div>
          <div class="duration">${video.duration}</div>
        </div>
      </div>
      <div class="instagram-info">
        <h3>${video.title}</h3>
        <div class="creator">@${video.creator}</div>
        <div class="instagram-stats">
          <span>👁️ ${this.formatViews(video.views)}</span>
          <span>❤️ ${this.formatViews(video.likes)}</span>
          <span>💬 ${video.comments}</span>
        </div>
        <div class="instagram-description">${video.description}</div>
        <div class="instagram-hashtags">${video.hashtags.join(' ')}</div>
        <div class="instagram-location">📍 ${video.location}</div>
      </div>
      ${this.isAdmin ? `
        <div class="admin-controls">
          <button class="admin-btn delete" onclick="deleteSocialContent('instagram', ${index})">🗑️ Delete</button>
        </div>
      ` : ''}
    `;
    return card;
  }

  updateActiveTab(platform) {
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    
    if (platform === 'tiktok') {
      const tiktokTab = document.querySelector('.tiktok-tab');
      if (tiktokTab) tiktokTab.classList.add('active');
    } else if (platform === 'instagram') {
      const instagramTab = document.querySelector('.instagram-tab');
      if (instagramTab) instagramTab.classList.add('active');
    }
  }

  formatViews(views) {
    if (views > 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views > 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  }

  addAdminControls(container, platform) {
    const adminPanel = document.createElement('div');
    adminPanel.className = 'admin-panel';
    adminPanel.innerHTML = `
      <h3>🔧 Administrator Controls</h3>
      <div class="admin-actions">
        <button class="admin-btn add" onclick="addSocialContent('${platform}')">➕ Add Content</button>
        <button class="admin-btn refresh" onclick="refreshSocialContent('${platform}')">🔄 Refresh</button>
        <button class="admin-btn clear" onclick="clearSocialContent('${platform}')">🗑️ Clear All</button>
      </div>
      <div class="admin-note">
        <p>As administrator, you can manage ${platform} content without restrictions.</p>
      </div>
    `;
    container.appendChild(adminPanel);
  }

  deleteSocialContent(platform, index) {
    if (!this.isAdmin) {
      alert('Administrator access required!');
      return;
    }

    if (platform === 'tiktok') {
      this.tiktokContent.splice(index, 1);
      this.loadTikTokContent();
    } else if (platform === 'instagram') {
      this.instagramContent.splice(index, 1);
      this.loadInstagramContent();
    }
  }

  addSocialContent(platform) {
    if (!this.isAdmin) {
      alert('Administrator access required!');
      return;
    }

    const title = prompt(`Enter ${platform} content title:`);
    if (!title) return;

    const creator = prompt('Enter creator username:');
    if (!creator) return;

    const newContent = {
      id: `${platform}_${Date.now()}`,
      title: title,
      creator: creator,
      views: Math.floor(Math.random() * 1000000),
      likes: Math.floor(Math.random() * 50000),
      comments: Math.floor(Math.random() * 1000),
      duration: '0:' + Math.floor(Math.random() * 59 + 10),
      thumbnail: `https://picsum.photos/400/${platform === 'tiktok' ? '800' : '400'}?random=${Date.now()}`,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Administrator added content',
      hashtags: ['#admin', '#content'],
      music: 'Original Sound',
      location: 'Admin HQ'
    };

    if (platform === 'tiktok') {
      this.tiktokContent.push(newContent);
      this.loadTikTokContent();
    } else if (platform === 'instagram') {
      this.instagramContent.push(newContent);
      this.loadInstagramContent();
    }
  }

  refreshSocialContent(platform) {
    if (!this.isAdmin) {
      alert('Administrator access required!');
      return;
    }

    if (platform === 'tiktok') {
      this.generateTikTokContent();
      this.loadTikTokContent();
    } else if (platform === 'instagram') {
      this.generateInstagramContent();
      this.loadInstagramContent();
    }
  }

  clearSocialContent(platform) {
    if (!this.isAdmin) {
      alert('Administrator access required!');
      return;
    }

    if (confirm(`Are you sure you want to clear all ${platform} content?`)) {
      if (platform === 'tiktok') {
        this.tiktokContent = [];
        this.loadTikTokContent();
      } else if (platform === 'instagram') {
        this.instagramContent = [];
        this.loadInstagramContent();
      }
    }
  }
}

// Global social media loader instance
let socialMediaLoader;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  socialMediaLoader = new SocialMediaLoader();
});

// Global functions for HTML onclick handlers
function loadTikTokContent() {
  if (socialMediaLoader) {
    socialMediaLoader.loadTikTokContent();
  }
}

function loadInstagramContent() {
  if (socialMediaLoader) {
    socialMediaLoader.loadInstagramContent();
  }
}

function openSocialVideo(platform, index) {
  const content = platform === 'tiktok' 
    ? socialMediaLoader.tiktokContent[index]
    : socialMediaLoader.instagramContent[index];

  if (content && videoTheater) {
    const theaterContent = {
      title: content.title,
      category: platform,
      link: content.videoUrl,
      views: content.views,
      likes: content.likes,
      source: content.creator,
      addedDate: new Date().toISOString(),
      aiRecommended: false
    };
    
    videoTheater.openVideoTheater(theaterContent);
  }
}

function deleteSocialContent(platform, index) {
  if (socialMediaLoader) {
    socialMediaLoader.deleteSocialContent(platform, index);
  }
}

function addSocialContent(platform) {
  if (socialMediaLoader) {
    socialMediaLoader.addSocialContent(platform);
  }
}

function refreshSocialContent(platform) {
  if (socialMediaLoader) {
    socialMediaLoader.refreshSocialContent(platform);
  }
}

function clearSocialContent(platform) {
  if (socialMediaLoader) {
    socialMediaLoader.clearSocialContent(platform);
  }
}

// Add CSS for social media content
const socialMediaCSS = `
.social-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(0, 247, 255, 0.1));
  border-radius: 20px;
  border: 2px solid rgba(255, 105, 180, 0.3);
}

.social-header h2 {
  color: white;
  font-size: 28px;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.social-header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin: 0 0 15px 0;
}

.social-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.stat {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tiktok-grid, .instagram-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.tiktok-card, .instagram-card {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid rgba(255, 105, 180, 0.3);
  transition: all 0.3s ease;
}

.tiktok-card:hover, .instagram-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(255, 105, 180, 0.4);
  border-color: rgba(255, 105, 180, 0.6);
}

.tiktok-thumbnail, .instagram-thumbnail {
  position: relative;
  width: 100%;
  height: 400px;
  cursor: pointer;
  overflow: hidden;
}

.tiktok-thumbnail img, .instagram-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tiktok-overlay, .instagram-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tiktok-thumbnail:hover .tiktok-overlay,
.instagram-thumbnail:hover .instagram-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 48px;
  background: rgba(255, 105, 180, 0.8);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.duration {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.tiktok-info, .instagram-info {
  padding: 15px;
}

.tiktok-info h3, .instagram-info h3 {
  color: white;
  font-size: 18px;
  margin: 0 0 8px 0;
}

.creator {
  color: #ff69b4;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
}

.tiktok-stats, .instagram-stats {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.tiktok-description, .instagram-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 10px;
}

.tiktok-hashtags, .instagram-hashtags {
  color: #00f7ff;
  font-size: 12px;
  margin-bottom: 8px;
}

.tiktok-music, .instagram-location {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-style: italic;
}

.admin-panel {
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(0, 247, 255, 0.2));
  border: 2px solid rgba(255, 105, 180, 0.4);
  border-radius: 15px;
  padding: 20px;
  margin-top: 30px;
  backdrop-filter: blur(10px);
}

.admin-panel h3 {
  color: white;
  font-size: 20px;
  margin: 0 0 15px 0;
  text-align: center;
}

.admin-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.admin-btn {
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
}

.admin-btn.delete {
  background: linear-gradient(135deg, #ff4444, #cc0000);
}

.admin-btn.add {
  background: linear-gradient(135deg, #44ff44, #00cc00);
}

.admin-btn.refresh {
  background: linear-gradient(135deg, #00f7ff, #0099cc);
}

.admin-btn.clear {
  background: linear-gradient(135deg, #ff8800, #cc6600);
}

.admin-note {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-style: italic;
}

.admin-controls {
  padding: 10px 15px;
  border-top: 1px solid rgba(255, 105, 180, 0.3);
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .tiktok-grid, .instagram-grid {
    grid-template-columns: 1fr;
  }
  
  .tiktok-thumbnail, .instagram-thumbnail {
    height: 300px;
  }
  
  .admin-actions {
    flex-direction: column;
  }
  
  .admin-btn {
    width: 100%;
  }
}
`;

// Inject CSS
const socialStyleSheet = document.createElement('style');
socialStyleSheet.textContent = socialMediaCSS;
try {
  if (document.head) {
    document.head.appendChild(socialStyleSheet);
  } else {
    console.warn('⚠️ document.head not found, skipping CSS injection');
  }
} catch (error) {
  console.warn('⚠️ Error injecting CSS:', error);
}
