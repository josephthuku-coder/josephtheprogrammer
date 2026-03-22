const container = document.getElementById("mediaContainer");
const trendingContainer = document.getElementById("trendingMedia");

// Tab switching function
function switchTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  const selectedTab = document.getElementById(tabName + '-tab');
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to clicked button
  event.target.classList.add('active');
  
  // Load content for the selected tab
  loadTabContent(tabName);
}

function loadTabContent(tabName) {
  const media = JSON.parse(localStorage.getItem("funMedia")) || [];
  let contentContainer = document.getElementById(tabName + '-content');
  
  if (!contentContainer) return;
  
  let filteredMedia = [];
  
  switch(tabName) {
    case "all":
      filteredMedia = media;
      break;
    case "movie":
      filteredMedia = media.filter(item => 
        item.category === "movie" || 
        (item.originalGenre && ['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller'].includes(item.originalGenre))
      );
      break;
    case "music":
      filteredMedia = media.filter(item => 
        item.category === "music" || 
        (item.originalGenre && item.originalGenre === 'music')
      );
      break;
    case "video":
      filteredMedia = media.filter(item => 
        item.category === "video" || 
        (item.originalGenre && ['gaming', 'education', 'entertainment', 'news', 'sports', 'lifestyle', 'technology'].includes(item.originalGenre))
      );
      break;
    case "documentary":
      filteredMedia = media.filter(item => 
        item.category === "documentary" || 
        (item.originalGenre && item.originalGenre === 'documentary')
      );
      break;
    case "tiktok":
      loadTikTokContent();
      return;
    case "instagram":
      loadInstagramContent();
      return;
  }
  
  contentContainer.innerHTML = '';
  
  if (filteredMedia.length === 0) {
    contentContainer.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <h3>No ${tabName} content found</h3>
        <p>Try adding some ${tabName} content to your collection!</p>
        <button onclick="window.location.href='admin-panel.html'" class="add-content-btn">+ Add Media</button>
      </div>
    `;
    return;
  }
  
  filteredMedia.forEach((item, index) => {
    const originalIndex = media.findIndex(m => m.id === item.id);
    
    const card = document.createElement("div");
    card.classList.add("media-card");
    
    card.innerHTML = `
      <h3>${item.title}</h3>
      <div class="media-category">${item.category}</div>
      <div class="media-source">📺 ${item.source}</div>
      ${item.rating ? `<div class="media-rating">⭐ ${item.rating}</div>` : ''}
      ${item.duration ? `<div class="media-duration">⏱️ ${item.duration}</div>` : ''}
      <div class="video-preview">
        <div class="play-button" onclick="openVideoTheatreImmediately('${item.id}')">▶️</div>
        <div class="video-info">
          <span class="info-views">👁️ ${item.views || 0}</span>
          <span class="info-likes">❤️ ${item.likes || 0}</span>
        </div>
      </div>
      <div class="media-actions">
        <button class="like-button" onclick="likeMedia(${originalIndex})">
          ❤️ ${item.likes || 0}
        </button>
        <button class="watch-button" onclick="openVideoTheatreImmediately('${item.id}')">
          🎬 Watch in Theatre
        </button>
        ${item.approved ? `<button class="admin-delete-button" onclick="requestAdminDelete(${originalIndex})" title="Administrator Delete">🗑️ Admin Delete</button>` : ''}
      </div>
    `;
    
    contentContainer.appendChild(card);
  });
}

function loadMedia(){
  // Load content for the active tab
  const activeTab = document.querySelector('.tab-content.active');
  if (activeTab) {
    const tabName = activeTab.id.replace('-tab', '');
    loadTabContent(tabName);
  }
}

function likeMedia(index){
  let media = JSON.parse(localStorage.getItem("funMedia"));
  
  if (media[index]) {
    media[index].likes = (media[index].likes || 0) + 1;
    localStorage.setItem("funMedia",JSON.stringify(media));
    loadMedia();
    loadTrending();
  }
}

function watchInTheatre(mediaId) {
  // Get media from localStorage
  const funMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
  const media = funMedia.find(m => m.id === mediaId);
  
  if (media) {
    // Open video theatre with this media
    openVideoPlayer(media);
  } else {
    // Fallback: open in new window
    window.open(media.url || media.link, '_blank');
  }
}

function openVideoPlayer(media) {
  console.log('🎬 Opening video player with media:', media);
  
  // Build video player URL with parameters
  const videoUrl = media.url || media.link;
  const title = media.title;
  const type = media.category || 'video';
  
  console.log('📋 Video URL:', videoUrl);
  console.log('📋 Title:', title);
  console.log('📋 Type:', type);
  
  if (!videoUrl) {
    console.error('❌ No video URL found in media object');
    alert('Video URL not found. Please check the media data.');
    return;
  }
  
  const playerUrl = `video-player.html?video=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&type=${encodeURIComponent(type)}`;
  
  console.log('🔗 Player URL:', playerUrl);
  
  // Test: Open in same tab first for debugging
  window.open(playerUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
}

function requestAdminDelete(index) {
  // Create password prompt modal
  const modal = document.createElement('div');
  modal.className = 'admin-delete-modal';
  modal.innerHTML = `
    <div class="admin-delete-content">
      <h3> Administrator Delete</h3>
      <p>This action requires administrator privileges.</p>
      <input type="password" id="adminDeletePassword" placeholder="Enter admin password" />
      <div class="admin-delete-actions">
        <button class="cancel-btn" onclick="closeAdminDeleteModal()">Cancel</button>
        <button class="delete-btn" onclick="confirmAdminDelete(${index})">Delete</button>
      </div>
      <p class="admin-hint">Hint: Use your dashboard password</p>
    </div>
  `;
  
  // Add modal to page
  document.body.appendChild(modal);
  
  // Focus on password input
  setTimeout(() => {
    document.getElementById('adminDeletePassword').focus();
  }, 100);
  
  // Add enter key support
  document.getElementById('adminDeletePassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      confirmAdminDelete(index);
    }
  });
}

function closeAdminDeleteModal() {
  const modal = document.querySelector('.admin-delete-modal');
  if (modal) {
    modal.remove();
  }
}

function confirmAdminDelete(index) {
  const password = document.getElementById('adminDeletePassword').value;
  const adminPassword = '4997G9749@j'; // Same as dashboard password
  
  if (password === adminPassword) {
    // Password correct, proceed with deletion
    performAdminDelete(index);
    closeAdminDeleteModal();
  } else {
    // Password incorrect
    const passwordInput = document.getElementById('adminDeletePassword');
    passwordInput.style.borderColor = '#ff4444';
    passwordInput.placeholder = 'Incorrect password!';
    passwordInput.value = '';
    
    // Shake animation
    const modal = document.querySelector('.admin-delete-content');
    modal.style.animation = 'shake 0.5s';
    setTimeout(() => {
      modal.style.animation = '';
    }, 500);
  }
}

function performAdminDelete(index) {
  let media = JSON.parse(localStorage.getItem('funMedia')) || [];
  
  if (media[index]) {
    const deletedTitle = media[index].title;
    const deletedSource = media[index].source;
    
    // Remove the media item
    media.splice(index, 1);
    
    // Save updated media array
    localStorage.setItem('funMedia', JSON.stringify(media));
    
    // Show success notification
    showAdminNotification(` Successfully deleted "${deletedTitle}" from ${deletedSource}`, 'success');
    
    // Reload the media display
    loadMedia();
    loadTrending();
    
    // Log the deletion
    console.log(` Administrator deleted: ${deletedTitle} (Source: ${deletedSource})`);
  }
}

function showAdminNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `admin-notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${type === 'success' ? '' : ''}</span>
      <span class="notification-text">${message}</span>
    </div>
  `;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #00ff9f, #00f7ff)' : 'linear-gradient(135deg, #ff69b4, #ff1493)'};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    max-width: 400px;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

function filterMedia(category){
  // Update active tab
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
  
  let media = JSON.parse(localStorage.getItem("funMedia")) || [];
  
  container.innerHTML = "";
  
  // Add section header
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'section-header';
  
  let sectionTitle = '';
  let sectionEmoji = '';
  let sectionDescription = '';
  
  switch(category) {
    case "movie":
      sectionTitle = "Movie Section";
      sectionEmoji = "🎬";
      sectionDescription = "Action, Comedy, Drama, Sci-Fi, Romance & Thriller";
      break;
    case "music":
      sectionTitle = "Music Section";
      sectionEmoji = "🎵";
      sectionDescription = "Your favorite songs and artists";
      break;
    case "video":
      sectionTitle = "Video Section";
      sectionEmoji = "📺";
      sectionDescription = "Gaming, Education, Entertainment, News & Sports";
      break;
    case "documentary":
      sectionTitle = "Documentary Section";
      sectionEmoji = "📖";
      sectionDescription = "Educational and informative content";
      break;
    case "all":
      sectionTitle = "All Content";
      sectionEmoji = "🌟";
      sectionDescription = "Complete collection of all content types";
      break;
    default:
      sectionTitle = category.charAt(0).toUpperCase() + category.slice(1) + " Section";
      sectionEmoji = "📁";
      sectionDescription = "Content collection";
  }
  
  sectionHeader.innerHTML = `
    <div class="section-title">
      <span class="section-emoji">${sectionEmoji}</span>
      <h2>${sectionTitle}</h2>
    </div>
    <p class="section-description">${sectionDescription}</p>
  `;
  container.appendChild(sectionHeader);
  
  let filteredMedia = [];
  
  if (category === "all") {
    // Show all content (movies, music, videos, documentaries)
    filteredMedia = media;
  } else if (category === "movie") {
    // Show only movies (including AI-approved movies)
    filteredMedia = media.filter(item => 
      item.category === "movie" || 
      (item.originalGenre && ['action', 'comedy', 'drama', 'scifi', 'romance', 'thriller'].includes(item.originalGenre))
    );
  } else if (category === "music") {
    // Show only music content (including AI-approved music)
    filteredMedia = media.filter(item => 
      item.category === "music" || 
      (item.originalGenre && item.originalGenre === 'music')
    );
  } else if (category === "video") {
    // Show only general video content
    filteredMedia = media.filter(item => 
      item.category === "video" || 
      (item.originalGenre && ['gaming', 'education', 'entertainment', 'news', 'sports', 'lifestyle', 'technology'].includes(item.originalGenre))
    );
  } else if (category === "documentary") {
    // Show documentaries (including AI-approved documentaries)
    filteredMedia = media.filter(item => 
      item.category === "documentary" || 
      (item.originalGenre && item.originalGenre === 'documentary')
    );
  } else {
    // Regular category filter
    filteredMedia = media.filter(item => item.category === category);
  }
  
  if (filteredMedia.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.style.cssText = 'grid-column: 1 / -1; text-align: center;';
    emptyState.innerHTML = `
      <h3>No ${category} content found</h3>
      <p>Try adding some ${category} content to your collection!</p>
      <button onclick="window.location.href='admin-panel.html'" class="add-content-btn">+ Add Media</button>
    `;
    container.appendChild(emptyState);
    return;
  }
  
  filteredMedia.forEach((item,index)=>{
    const originalIndex = media.findIndex(m => m.id === item.id);
    
    const card=document.createElement("div");
    card.classList.add("media-card");
    
    card.innerHTML = `
      <h3>${item.title}</h3>
      <div class="media-category">${item.category}</div>
      <div class="media-source">📺 ${item.source}</div>
      ${item.rating ? `<div class="media-rating">⭐ ${item.rating}</div>` : ''}
      ${item.duration ? `<div class="media-duration">⏱️ ${item.duration}</div>` : ''}
      <div class="video-preview">
        <div class="play-button" onclick="openVideoTheatreImmediately('${item.id}')">▶️</div>
        <div class="video-info">
          <span class="info-views">👁️ ${item.views || 0}</span>
          <span class="info-likes">❤️ ${item.likes || 0}</span>
        </div>
      </div>
      <div class="media-actions">
        <button class="like-button" onclick="likeMedia(${originalIndex})">
          ❤️ ${item.likes || 0}
        </button>
        <button class="watch-button" onclick="openVideoTheatreImmediately('${item.id}')">
          🎬 Watch in Theatre
        </button>
        ${item.approved ? `<button class="admin-delete-button" onclick="requestAdminDelete(${originalIndex})" title="Administrator Delete">🗑️ Admin Delete</button>` : ''}
      </div>
    `;
    
    container.appendChild(card);
  });
}

function searchMedia(){
  const search=document.getElementById("searchMedia").value.toLowerCase();
  
  let media=JSON.parse(localStorage.getItem("funMedia")) || [];
  
  container.innerHTML = "";
  
  const searchResults = media.filter(item => 
    item.title.toLowerCase().includes(search)
  );
  
  if (searchResults.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3>No results found</h3>
        <p>No media matches "${search}"</p>
        <button onclick="clearSearch()">Clear Search</button>
      </div>
    `;
    return;
  }
  
  searchResults.forEach((item,index)=>{
    const originalIndex = media.findIndex(m => m.title === item.title && m.link === item.link);
    
    const card=document.createElement("div");
    card.classList.add("media-card");
    
    card.innerHTML = `
      <h3>${item.title}</h3>
      <div class="media-category">${item.category}</div>
      <iframe src="${item.link}" frameborder="0" allowfullscreen></iframe>
      <button class="like-button" onclick="likeMedia(${originalIndex})">
        ❤️ ${item.likes || 0}
      </button>
    `;
    
    container.appendChild(card);
  });
}

function clearSearch() {
  document.getElementById("searchMedia").value = "";
  loadMedia();
}

function loadTrending(){
  let media = JSON.parse(localStorage.getItem("funMedia")) || [];
  
  if (media.length === 0) {
    trendingContainer.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3>No trending content</h3>
        <p>Add some media to see trending content here!</p>
      </div>
    `;
    return;
  }
  
  let trending = media.sort((a,b)=>(b.views || 0) - (a.views || 0)).slice(0, 3);
  
  trendingContainer.innerHTML = "";
  
  trending.forEach(item=>{
    const originalIndex = media.findIndex(m => m.id === item.id);
    
    let card=document.createElement("div");
    card.classList.add("media-card");
    
    card.innerHTML=`
      <h3>🔥 ${item.title}</h3>
      <div class="media-category">${item.category}</div>
      <div class="media-source">📺 ${item.source}</div>
      ${item.rating ? `<div class="media-rating">⭐ ${item.rating}</div>` : ''}
      ${item.duration ? `<div class="media-duration">⏱️ ${item.duration}</div>` : ''}
      <div class="video-preview">
        <div class="play-button" onclick="openVideoTheatreImmediately('${item.id}')">▶️</div>
        <div class="video-info">
          <span class="info-views">👁️ ${item.views || 0}</span>
          <span class="info-likes">❤️ ${item.likes || 0}</span>
        </div>
      </div>
      <div class="media-actions">
        <button class="like-button" onclick="likeMedia(${originalIndex})">
          ❤️ ${item.likes || 0}
        </button>
        <button class="watch-button" onclick="openVideoTheatreImmediately('${item.id}')">
          🎬 Watch in Theatre
        </button>
        ${item.approved ? `<button class="admin-delete-button" onclick="requestAdminDelete(${originalIndex})" title="Administrator Delete">🗑️ Admin Delete</button>` : ''}
      </div>
    `;
    
    trendingContainer.appendChild(card);
  });
}

function openVideoTheatreImmediately(mediaId) {
  console.log('🎬 Opening video player for media ID:', mediaId);
  
  // Get media from Firebase allContent array (not localStorage)
  const media = allContent.find(m => m.id === mediaId);
  console.log('📋 All Firebase content:', allContent);
  console.log('📋 Looking for media ID:', mediaId);
  console.log('📋 Found media:', media);
  
  if (media) {
    // Use the new video player
    console.log('✅ Media found in Firebase, calling openVideoPlayer...');
    openVideoPlayer(media);
  } else {
    console.error('❌ Media not found for ID:', mediaId);
    console.error('❌ Available IDs:', allContent.map(m => m.id));
    alert('Video not found. Please try again.\n\nDebug: Check console for available media IDs.');
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Load initial content for the "All" tab
  loadTabContent('all');
  loadTrending();
  
  // Refresh AI recommendations with working content
  refreshAIContent();
});

function refreshAIContent() {
  console.log('🔄 Refreshing AI content with working videos...');
  
  // Get current media from localStorage
  let funMedia = JSON.parse(localStorage.getItem('funMedia')) || [];
  
  // Add guaranteed working content if none exists
  if (funMedia.length === 0) {
    console.log('📺 Adding guaranteed working content...');
    
    // Public domain videos that always work
    const workingVideos = [
      {
        id: 'bigbuckbunny_' + Date.now(),
        title: 'Big Buck Bunny',
        source: 'Blender Foundation',
        category: 'movie',
        genre: 'animation',
        rating: '8.2',
        duration: '10 min',
        description: 'A large and gentle rabbit deals with three rodents.',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        views: 1500000,
        likes: 75000,
        approved: true
      },
      {
        id: 'elephantsdream_' + Date.now(),
        title: 'Elephants Dream',
        source: 'Blender Foundation',
        category: 'movie',
        genre: 'scifi',
        rating: '7.5',
        duration: '11 min',
        description: 'Two characters explore a surreal machine world.',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        views: 1200000,
        likes: 60000,
        approved: true
      },
      {
        id: 'sintel_' + Date.now(),
        title: 'Sintel',
        source: 'Blender Foundation',
        category: 'movie',
        genre: 'fantasy',
        rating: '8.0',
        duration: '15 min',
        description: 'A young girl searches for her dragon companion.',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        views: 1800000,
        likes: 90000,
        approved: true
      },
      {
        id: 'tearsofsteel_' + Date.now(),
        title: 'Tears of Steel',
        source: 'Blender Foundation',
        category: 'movie',
        genre: 'scifi',
        rating: '7.8',
        duration: '12 min',
        description: 'A science fiction action film with emotional depth.',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        views: 2000000,
        likes: 100000,
        approved: true
      }
    ];
    
    // Add working videos to localStorage
    funMedia = [...workingVideos];
    localStorage.setItem('funMedia', JSON.stringify(funMedia));
    
    console.log('✅ Added', workingVideos.length, 'working videos to content');
  } else {
    console.log('📺 Found existing content:', funMedia.length, 'items');
  }
  
  // Reload content to show working videos
  loadTabContent('all');
  loadTrending();
}

// Initialize on page load as well
loadTabContent('all');
loadTrending();

// Debug function to test video player directly
function testVideoPlayer() {
console.log('🧪 Testing video player directly...');

const testMedia = {
id: 'test_' + Date.now(),
title: 'Test Video - Big Buck Bunny',
url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
category: 'movie'
};

console.log('📋 Test media:', testMedia);
openVideoPlayer(testMedia);
}

// Debug function to check Firebase content
function debugFirebaseContent() {
  console.log('🔍 Debugging Firebase content...');
  console.log('📋 Total Firebase content items:', allContent.length);
  console.log('📋 All Firebase content:', allContent);
  
  if (allContent.length > 0) {
    console.log('📋 First content item:', allContent[0]);
    console.log('📋 First content ID:', allContent[0].id);
    console.log('📋 First content URL:', allContent[0].url || allContent[0].link);
    console.log('📋 First content title:', allContent[0].title);
  } else {
    console.log('⚠️ No Firebase content loaded yet. Waiting for Firebase connection...');
  }
}