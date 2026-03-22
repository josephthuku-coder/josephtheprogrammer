/* ==========================
FIREBASE CONFIG
========================== */

const firebaseConfig = {
  apiKey: "AIzaSyDdCAfblfC8HjcaIZFIi34WoA9hO0fXELY",
  authDomain: "josees-finest.firebaseapp.com",
  projectId: "josees-finest",
  storageBucket: "josees-finest.firebasestorage.app",
  messagingSenderId: "1023918542701",
  appId: "1:1023918542701:web:e087b978b61eaba1001464",
  measurementId: "G-Z8XPQ46GYG"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ==========================
TYPEWRITER EFFECT
========================== */

const messages = [
  "Hello! Welcome to Josee's first project.",
  "Learning. Building. Innovating.",
  "Exploring the beauty of programming.",
  "Enjoy the warmth of connecting with one of the world's best programmers."
];

let messageIndex = 0;
let charIndex = 0;

const typingElement = document.querySelector(".typewriter");

function typeEffect() {
  if (!typingElement) return;

  if (charIndex < messages[messageIndex].length) {
    typingElement.textContent += messages[messageIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 60);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent =
      messages[messageIndex].substring(0, charIndex - 1);

    charIndex--;
    setTimeout(eraseEffect, 40);
  } else {
    messageIndex = (messageIndex + 1) % messages.length;
    setTimeout(typeEffect, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

/* ==========================
INDEX TAB SWITCH (NO-SCROLL)
========================== */

// Tab switching with code rain control and lazy loading (optimized)
function goTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  
  // Use requestAnimationFrame for smoother switching
  requestAnimationFrame(() => {
    // Hide all tabs
    document.querySelectorAll(".tab-content").forEach(s => s.classList.remove("active"));
    
    // Show selected tab
    target.classList.add("active");
    window.location.hash = "#" + id;
    
    // Control code rain based on active tab
    const canvas = document.getElementById("codeRainCanvas");
    if (canvas) {
      if (id === "discover") {
        // Stop code rain when discover is active
        canvas.style.display = "none";
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        // Lazy load discover content only when tab is opened
        if (!window.discoverContentLoaded) {
          window.discoverContentLoaded = true;
          // Use setTimeout to prevent blocking
          setTimeout(() => loadDiscoverContent(), 50);
        }
      } else {
        // Resume code rain when other tabs are active
        canvas.style.display = "block";
      }
    }
  });
}

// Fallback function for home navigation
function showTabById(id) {
  goTo(id);
}

// Separate function to load discover content
function loadDiscoverContent() {
  // Load innovators (immediate, small content)
  loadInnovators();
  
  // Load news with small delay to prevent blocking
  setTimeout(() => {
    fetchTechNews(newsPage);
  }, 100);
}

// Load innovators immediately
function loadInnovators() {
  const innovatorsContainer = document.getElementById("innovators-container");
  if (!innovatorsContainer) return;

  innovators.forEach((person, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    
    // Removed animations to prevent shaking
    card.style.opacity = '1';

    card.innerHTML = `
      <img src="${person.image || 'https://via.placeholder.com/120x120'}" alt="${person.name}" 
           onerror="this.src='https://via.placeholder.com/120x120?text=${encodeURIComponent(person.name)}'">
      <h4>${person.name}</h4>
      <p>${person.bio}</p>
      ${person.link ? `<a href="${person.link}" target="_blank">🚀 Learn More</a>` : ""}
    `;

    innovatorsContainer.appendChild(card);
  });
}

/* ==========================
SMOOTH SCROLL
========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.getAttribute("href");
    const id = href ? href.replace(/^#/, "") : "";
    if (id) {
      showTabById(id);
      window.location.hash = "#" + id;
    }
  });
});

/* ==========================
AUTO YEAR
========================== */

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ==========================
HERO BUTTON
========================== */

const heroBtn = document.querySelector(".hero-btn");
if (heroBtn) {
  heroBtn.addEventListener("click", () => {
    const target = document.querySelector("#projects");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
}

/* ==========================
PAGE LOAD EFFECT
========================== */

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

/* ==========================
PROJECT CARD HOVER
========================== */

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
    card.style.transition = "0.3s";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

/* ==========================
MATRIX EFFECT
========================== */

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const letters = "01HTMLCSSJAVASCRIPTPYTHON<>/";
  const matrix = letters.split("");

  const fontSize = 14;
  const columns = canvas.width / fontSize;

  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff9f";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = matrix[Math.floor(Math.random() * matrix.length)];

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(drawMatrix, 35);
});

/* ==========================
PROJECTS FROM LOCAL STORAGE
========================== */

const container = document.getElementById("projectsContainer");

if (container) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    card.innerHTML = `
      <h3>${project.title}</h3>
      <img src="${project.image}" width="300">
      <p>${project.description}</p>
    `;

    container.appendChild(card);
  });
}

/* ==========================
EMBED DETECTION
========================== */

function detectEmbed(link) {
  link = link.trim();

  if (link.includes("youtube.com") || link.includes("youtu.be")) {
    let id = link.split("v=")[1];

    if (!id && link.includes("youtu.be")) {
      id = link.split("/").pop();
    }

    if (id && id.includes("&")) {
      id = id.split("&")[0];
    }

    return "https://www.youtube.com/embed/" + id;
  }

  if (link.includes("spotify.com")) {
    return link.replace("open.spotify.com", "open.spotify.com/embed");
  }

  if (link.includes("vimeo.com")) {
    let id = link.split("/").pop();
    return "https://player.vimeo.com/video/" + id;
  }

  return link;
}

/* ==========================
ADD MEDIA
========================== */

async function addMedia() {
  let title = document.getElementById("mediaTitle").value.trim();
  let link = document.getElementById("mediaLink").value.trim();
  let category = document.getElementById("mediaCategory").value;

  if (!title || !link) {
    alert("Please fill all fields");
    return;
  }

  let embed = detectEmbed(link);

  await db.collection("media").add({
    title,
    link: embed,
    category,
    likes: 0,
    views: 0,
    createdAt: Date.now()
  });

  let media = JSON.parse(localStorage.getItem("funMedia")) || [];

  media.push({
    title,
    link: embed,
    category,
    likes: 0,
    views: 0
  });

  localStorage.setItem("funMedia", JSON.stringify(media));

  alert("Media Uploaded Successfully");
}

/* ==========================
INNOVATORS
========================== */

const innovators = [
  {
    name: "Elon Musk",
    bio: "CEO of SpaceX and Tesla, pushing electric and space innovation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
    link: "https://en.wikipedia.org/wiki/Elon_Musk"
  },
  {
    name: "Mark Zuckerberg",
    bio: "Co-founder of Meta Platforms, leader in social media innovation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Zuckerberg_F8_2019_Keynote_%2833267194938%29_%28cropped%29.jpg",
    link: "https://en.wikipedia.org/wiki/Mark_Zuckerberg"
  },
  {
    name: "Tim Berners-Lee",
    bio: "Inventor of the World Wide Web.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sir_Tim_Berners-Lee.jpg",
    link: "https://en.wikipedia.org/wiki/Tim_Berners-Lee"
  },
  {
    name: "Satya Nadella",
    bio: "CEO of Microsoft, leading cloud computing and AI transformation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/74/Satya_Nadella_%28cropped%29.jpg",
    link: "https://en.wikipedia.org/wiki/Satya_Nadella"
  },
  {
    name: "Jensen Huang",
    bio: "CEO of NVIDIA, pioneer in GPU computing and AI hardware.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Jensen_Huang_%28cropped%29.jpg",
    link: "https://en.wikipedia.org/wiki/Jensen_Huang"
  }
];

/* ==========================
TECH NEWS
========================== */

const API_KEY = "YOUR_NEWSAPI_KEY"; // You'll need to replace this with your actual API key
const PAGE_SIZE = 5;

let newsPage = 1;
let isLoadingNews = false;

const newsContainer = document.getElementById("news-container");
const loadMoreBtn = document.getElementById("load-more-news");

// Fallback news data when API is unavailable
const fallbackNews = [
  {
    title: "AI Revolution: How Machine Learning is Transforming Industries",
    description: "Artificial intelligence continues to reshape how businesses operate and serve customers.",
    urlToImage: "https://via.placeholder.com/300x180?text=AI+Revolution",
    url: "https://example.com/ai-revolution"
  },
  {
    title: "Quantum Computing Breakthrough: New Milestone Achieved",
    description: "Scientists achieve new quantum computing milestone that could revolutionize computing.",
    urlToImage: "https://via.placeholder.com/300x180?text=Quantum+Computing",
    url: "https://example.com/quantum-breakthrough"
  },
  {
    title: "Space Exploration: Private Companies Lead New Era",
    description: "Commercial space companies are pioneering new frontiers in space exploration.",
    urlToImage: "https://via.placeholder.com/300x180?text=Space+Exploration",
    url: "https://example.com/space-exploration"
  },
  {
    title: "Cybersecurity: New Threats and Solutions",
    description: "As digital transformation accelerates, cybersecurity becomes more critical than ever.",
    urlToImage: "https://via.placeholder.com/300x180?text=Cybersecurity",
    url: "https://example.com/cybersecurity"
  },
  {
    title: "Green Technology: Sustainable Innovation in Tech",
    description: "Technology companies are leading the charge in sustainable and green innovations.",
    urlToImage: "https://via.placeholder.com/300x180?text=Green+Tech",
    url: "https://example.com/green-technology"
  }
];

async function fetchTechNews(page = 1) {
  if (!newsContainer || isLoadingNews) return;

  isLoadingNews = true;
  
  // Show loading state
  if (loadMoreBtn) {
    loadMoreBtn.textContent = '⏳ Loading...';
    loadMoreBtn.disabled = true;
  }

  try {
    // Check if API key is configured
    if (API_KEY === "YOUR_NEWSAPI_KEY") {
      console.log("NewsAPI key not configured, using fallback news");
      throw new Error("API key not configured");
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      displayNewsArticles(data.articles, page === 1);
    } else {
      throw new Error("No articles found");
    }

  } catch (err) {
    console.error("Error fetching news:", err);
    
    // Use fallback news
    if (page === 1) {
      newsContainer.innerHTML = '';
    }
    
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const pageNews = fallbackNews.slice(startIndex, endIndex);
    
    if (pageNews.length > 0) {
      displayNewsArticles(pageNews, page === 1);
    } else {
      // Show end of news message
      if (loadMoreBtn) {
        loadMoreBtn.textContent = '📰 No more news available';
        loadMoreBtn.disabled = true;
      }
    }
  } finally {
    isLoadingNews = false;
    
    if (loadMoreBtn) {
      loadMoreBtn.textContent = '⚡ Load More News';
      loadMoreBtn.disabled = false;
    }
  }
}

function displayNewsArticles(articles, isFirstLoad = false) {
  if (!newsContainer) return;

  if (isFirstLoad) {
    newsContainer.innerHTML = '';
  }

  articles.forEach((article, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    
    // Removed animations to prevent shaking
    card.style.opacity = '1';

    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x180?text=Tech+News'}" 
           alt="${article.title}" 
           onerror="this.src='https://via.placeholder.com/300x180?text=Tech+News'">
      <h4>${article.title}</h4>
      <p>${article.description || 'Click to read more about this tech development...'}</p>
      <a href="${article.url}" target="_blank">📖 Read More</a>
    `;

    newsContainer.appendChild(card);
  });
}

// Load more functionality
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    newsPage++;
    fetchTechNews(newsPage);
  });
}

/* ==========================
TABS
========================== */

// Tab switching is handled by the hash-link handler above.

/* ==========================
COMMENTS FUNCTIONALITY
========================== */

const commentsList = document.getElementById("commentsList");
const commentForm = document.getElementById("commentForm");

// Load comments on page load (lightweight)
window.addEventListener('DOMContentLoaded', () => {
  loadComments();
  
  // Add floating navigation tab for external links (lightweight)
  addFloatingNavigationTab();
  
  // Initialize universal return button system
  createUniversalReturnButton();
  
  // Delay heavy operations to improve tab switching performance
  setTimeout(() => {
    // Start visitor tracking after page is fully loaded
    if (!window.visitorTrackingStarted) {
      window.visitorTrackingStarted = true;
      startActivityMonitoring(); // Start monitoring user activity
      resetActivityTimer(); // Start the tracking timer
    }
  }, 2000); // 2 second delay
});

// Handle comment form submission
if (commentForm) {
  commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitComment();
  });
}

// Enhanced Wikipedia navigation system
function addFloatingNavigationTab() {
  // Find all external links in discover section
  const discoverLinks = document.querySelectorAll('#innovators-container a, #news-container a');
  
  discoverLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.includes('wikipedia.org') || href.includes('example.com'))) {
      // Add click event to external links
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Store return URL in sessionStorage for cross-tab access
        sessionStorage.setItem('jgReturnUrl', window.location.href);
        
        // Open external site in new tab with enhanced navigation
        const newWindow = window.open(href, '_blank');
        
        // Add enhanced navigation to the new window
        setTimeout(() => {
          try {
            newWindow.postMessage({
              type: 'addEnhancedNavigation',
              homeUrl: window.location.href,
              siteType: 'wikipedia'
            }, '*');
          } catch (error) {
            console.log('Could not add navigation to external site');
          }
        }, 1000);
      });
      
      // Add visual indicator for external links
      link.style.position = 'relative';
      link.innerHTML += ' <span style="font-size: 12px; opacity: 0.7;">↗️</span>';
    }
  });
}

// Enhanced cross-window return system with dual buttons
function createUniversalReturnButton() {
  // Listen for messages from any window
  window.addEventListener('message', function(event) {
    if (event.data.type === 'addEnhancedNavigation') {
      addEnhancedNavigationToCurrentPage(event.data.homeUrl, event.data.siteType);
    }
  });
  
  // Check if we need to show return button (for external sites)
  if (window.location.hostname && 
      (window.location.hostname.includes('wikipedia.org') || 
       window.location.hostname.includes('example.com'))) {
    
    // Try to get return URL from sessionStorage
    const returnUrl = sessionStorage.getItem('jgReturnUrl') || 'https://josee.example.com';
    addEnhancedNavigationToCurrentPage(returnUrl, 'wikipedia');
  }
}

function addEnhancedNavigationToCurrentPage(homeUrl, siteType) {
  // Remove existing navigation if any
  const existingNav = document.querySelector('.enhanced-nav-container');
  if (existingNav) {
    existingNav.remove();
  }
  
  // Create enhanced dual-button navigation
  const navContainer = document.createElement('div');
  navContainer.className = 'enhanced-nav-container';
  navContainer.innerHTML = `
    <div class="enhanced-nav-panel">
      <div class="nav-header">
        <div class="jg-logo-container">
          <svg class="jg-logo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="enhancedLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff69b4" />
                <stop offset="50%" style="stop-color:#ff1493" />
                <stop offset="100%" style="stop-color:#c71585" />
              </linearGradient>
              <filter id="enhancedGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="enhancedShadow">
                <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
              </filter>
            </defs>
            <rect x="5" y="5" width="110" height="110" rx="25" ry="25" fill="url(#enhancedLogoGrad)" filter="url(#enhancedGlow)" stroke="#ffffff" stroke-width="3"/>
            <rect x="15" y="15" width="90" height="90" rx="20" ry="20" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
            <text x="60" y="70" text-anchor="middle" fill="#ffffff" font-size="48" font-weight="900" font-family="Arial Black,sans-serif" filter="url(#enhancedShadow)" stroke="#000000" stroke-width="1">J.G</text>
            <path d="M25 35 L35 45 L25 55 M45 35 L55 45 L45 55 M65 35 L75 45 L65 55 M85 35 L95 45 L85 55" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.9" filter="url(#enhancedShadow)"/>
            <circle cx="60" cy="60" r="45" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
          </svg>
        </div>
        <div class="nav-title">J.G Portfolio Navigation</div>
      </div>
      
      <div class="nav-buttons">
        <a href="${homeUrl}" class="nav-btn primary-btn" target="_self">
          <span class="btn-icon">🏠</span>
          <span class="btn-text">Return to J.G</span>
        </a>
        <button class="nav-btn secondary-btn" onclick="toggleCurrentWindow()">
          <span class="btn-icon">🔄</span>
          <span class="btn-text">Switch Back</span>
        </button>
      </div>
      
      <div class="nav-info">
        <p>Learning about innovators? Easily switch between Wikipedia and J.G Portfolio!</p>
      </div>
    </div>
  `;
  
  // Add toggle function
  navContainer.querySelector('.secondary-btn').addEventListener('click', function() {
    // Store current position
    sessionStorage.setItem('wikiScrollPos', window.scrollY);
    sessionStorage.setItem('wikiCurrentUrl', window.location.href);
    
    // Open portfolio in new window
    const portfolioWindow = window.open(homeUrl, '_blank');
    
    // Add navigation to portfolio window
    setTimeout(() => {
      try {
        portfolioWindow.postMessage({
          type: 'addWikipediaReturn',
          wikiUrl: window.location.href,
          scrollPos: window.scrollY
        }, '*');
      } catch (error) {
        console.log('Could not add return navigation to portfolio');
      }
    }, 1000);
  });
  
  // Add to page
  document.body.appendChild(navContainer);
  
  // Add class to body for styling
  document.body.classList.add('enhanced-external-site');
  
  // Show success message
  showNotification('Enhanced navigation added! Use the buttons to switch between sites.', 'success');
}

// Handle return navigation from portfolio
window.addEventListener('message', function(event) {
  if (event.data.type === 'addWikipediaReturn') {
    addWikipediaReturnToPortfolio(event.data.wikiUrl, event.data.scrollPos);
  }
});

function addWikipediaReturnToPortfolio(wikiUrl, scrollPos) {
  // Add Wikipedia return button to portfolio
  const existingReturn = document.querySelector('.wiki-return-btn');
  if (existingReturn) {
    existingReturn.remove();
  }
  
  const returnBtn = document.createElement('div');
  returnBtn.className = 'wiki-return-btn';
  returnBtn.innerHTML = `
    <a href="${wikiUrl}" class="floating-nav-tab" target="_self">
      <div class="jg-logo-container">
        <svg class="jg-logo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wikiLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ff69b4" />
              <stop offset="50%" style="stop-color:#ff1493" />
              <stop offset="100%" style="stop-color:#c71585" />
            </linearGradient>
            <filter id="wikiGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="wikiShadow">
              <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
            </filter>
          </defs>
          <rect x="5" y="5" width="110" height="110" rx="25" ry="25" fill="url(#wikiLogoGrad)" filter="url(#wikiGlow)" stroke="#ffffff" stroke-width="3"/>
          <rect x="15" y="15" width="90" height="90" rx="20" ry="20" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
          <text x="60" y="70" text-anchor="middle" fill="#ffffff" font-size="48" font-weight="900" font-family="Arial Black,sans-serif" filter="url(#wikiShadow)" stroke="#000000" stroke-width="1">J.G</text>
          <path d="M25 35 L35 45 L25 55 M45 35 L55 45 L45 55 M65 35 L75 45 L65 55 M85 35 L95 45 L85 55" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.9" filter="url(#wikiShadow)"/>
          <circle cx="60" cy="60" r="45" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
        </svg>
      </div>
      <span class="nav-text">📚 Return to Wikipedia</span>
    </a>
  `;
  
  document.body.appendChild(returnBtn);
  
  // Store scroll position for when user returns
  sessionStorage.setItem('wikiScrollPos', scrollPos);
  
  showNotification('Wikipedia return button added! Continue your research easily.', 'info');
}

function addNavigationToCurrentPage(homeUrl) {
  // Remove existing navigation if any
  const existingNav = document.querySelector('.floating-nav-tab');
  if (existingNav) {
    existingNav.remove();
  }
  
  // Add floating navigation tab with enhanced J.G branding
  const navTab = document.createElement('div');
  navTab.innerHTML = `
    <a href="${homeUrl}" class="floating-nav-tab" target="_self">
      <div class="jg-logo-container">
        <svg class="jg-logo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="floatingLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ff69b4" />
              <stop offset="50%" style="stop-color:#ff1493" />
              <stop offset="100%" style="stop-color:#c71585" />
            </linearGradient>
            <filter id="floatingGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="floatingShadow">
              <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
            </filter>
          </defs>
          <rect x="5" y="5" width="110" height="110" rx="25" ry="25" fill="url(#floatingLogoGrad)" filter="url(#floatingGlow)" stroke="#ffffff" stroke-width="3"/>
          <rect x="15" y="15" width="90" height="90" rx="20" ry="20" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
          <text x="60" y="70" text-anchor="middle" fill="#ffffff" font-size="48" font-weight="900" font-family="Arial Black,sans-serif" filter="url(#floatingShadow)" stroke="#000000" stroke-width="1">J.G</text>
          <path d="M25 35 L35 45 L25 55 M45 35 L55 45 L45 55 M65 35 L75 45 L65 55 M85 35 L95 45 L85 55" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.9" filter="url(#floatingShadow)"/>
          <circle cx="60" cy="60" r="45" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
        </svg>
      </div>
      <span class="nav-text">🏠 Return to J.G</span>
    </a>
  `;
  
  // Add to page
  document.body.appendChild(navTab);
  
  // Add class to body for styling
  document.body.classList.add('external-site');
  
  // Show success message
  showNotification('Navigation tab added! Look for the "Return to J.G" button in the top-right corner.', 'success');
}

// Create a simple navigation injector for external sites
function injectNavigationScript() {
  const script = document.createElement('script');
  script.textContent = `
    // Check if we're on an external site
    if (window.location.hostname !== 'localhost' && 
        !window.location.hostname.includes('josee')) {
      
      // Create navigation tab
      const navTab = document.createElement('a');
      navTab.href = 'index.html';
      navTab.className = 'floating-nav-tab';
      navTab.textContent = '🏠 Back to Portfolio';
      navTab.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ff8e53, #ff1493);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 18px;
        font-weight: bold;
        text-decoration: none;
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
        z-index: 10000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        animation: pulse 2s ease-in-out infinite;
        backdrop-filter: blur(10px);
      \`;
      
      // Add hover effect
      navTab.addEventListener('mouseenter', () => {
        navTab.style.transform = 'translateY(-5px) scale(1.05)';
        navTab.style.boxShadow = '0 15px 40px rgba(255, 107, 107, 0.6)';
      });
      
      navTab.addEventListener('mouseleave', () => {
        navTab.style.transform = 'translateY(0) scale(1)';
        navTab.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.4)';
      });
      
      // Add to page
      document.body.appendChild(navTab);
      
      // Add CSS animations
      const style = document.createElement('style');
      style.textContent = \`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      \`;
      document.head.appendChild(style);
    }
  `;
  
  return script;
}

function submitComment() {
  const name = document.getElementById('commentName').value.trim();
  const email = document.getElementById('commentEmail').value.trim();
  const content = document.getElementById('commentContent').value.trim();
  
  if (!name || !content) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  // Create comment object
  const comment = {
    id: Date.now(),
    name: name,
    email: email,
    content: content,
    date: new Date().toISOString(),
    likes: 0,
    approved: true // Auto-approve for now
  };
  
  // Get existing comments
  let comments = JSON.parse(localStorage.getItem('portfolioComments') || '[]');
  
  // Add new comment at the beginning
  comments.unshift(comment);
  
  // Save to localStorage
  localStorage.setItem('portfolioComments', JSON.stringify(comments));
  
  // Also send to admin inbox
  sendToInbox(comment);
  
  // Clear form
  commentForm.reset();
  
  // Reload comments
  loadComments();
  
  // Show success message
  showNotification('Comment posted successfully! Thank you for your feedback!', 'success');
}

function loadComments() {
  if (!commentsList) return;
  
  const comments = JSON.parse(localStorage.getItem('portfolioComments') || '[]');
  
  if (comments.length === 0) {
    commentsList.innerHTML = `
      <div class="empty-comments">
        <h3>💭 No Comments Yet</h3>
        <p>Be the first to share your thoughts about this amazing portfolio!</p>
      </div>
    `;
    return;
  }
  
  commentsList.innerHTML = '';
  
  comments.forEach(comment => {
    const commentElement = createCommentElement(comment);
    commentsList.appendChild(commentElement);
  });
}

function createCommentElement(comment) {
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment-item';
  
  const date = new Date(comment.date);
  const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  commentDiv.innerHTML = `
    <div class="comment-header">
      <span class="comment-author">${comment.name}</span>
      <span class="comment-date">${formattedDate}</span>
    </div>
    <div class="comment-content">${comment.content}</div>
    <div class="comment-actions">
      <button class="comment-action-btn btn-like" onclick="likeComment(${comment.id})">
        ❤️ ${comment.likes || 0}
      </button>
      <button class="comment-action-btn btn-report" onclick="reportComment(${comment.id})">
        🚩 Report
      </button>
    </div>
  `;
  
  return commentDiv;
}

function likeComment(commentId) {
  let comments = JSON.parse(localStorage.getItem('portfolioComments') || '[]');
  const comment = comments.find(c => c.id === commentId);
  
  if (comment) {
    comment.likes = (comment.likes || 0) + 1;
    localStorage.setItem('portfolioComments', JSON.stringify(comments));
    loadComments();
    showNotification('Comment liked! ❤️', 'success');
  }
}

function reportComment(commentId) {
  if (confirm('Are you sure you want to report this comment?')) {
    // In a real application, this would send a report to the admin
    showNotification('Comment reported. Thank you for helping keep the community positive!', 'info');
  }
}

function addSuggestion(text) {
  const commentContent = document.getElementById('commentContent');
  if (commentContent) {
    commentContent.value = text;
    commentContent.focus();
  }
}

function sendToInbox(comment) {
  // Send comment to admin inbox
  let inboxMessages = JSON.parse(localStorage.getItem('inboxMessages') || '[]');
  
  const message = {
    id: Date.now(),
    from: comment.name,
    email: comment.email || 'No email provided',
    subject: 'New Portfolio Comment',
    content: comment.content,
    date: new Date().toISOString(),
    read: false,
    type: 'comment'
  };
  
  inboxMessages.unshift(message);
  localStorage.setItem('inboxMessages', JSON.stringify(inboxMessages));
}

// Enhanced notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  const colors = {
    success: 'linear-gradient(135deg, #00f7ff, #00ff9f)',
    error: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
    info: 'linear-gradient(135deg, #ff69b4, #ff1493)'
  };
  
  notification.style.background = colors[type] || colors.info;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

/* ==========================
VISITOR TRACKING SYSTEM
========================== */

// Track visitor and send to inbox
function trackVisitor() {
  // Get visitor information
  const visitorInfo = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    referrer: document.referrer || 'Direct Visit',
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    sessionId: generateSessionId()
  };

  // Get location using IP geolocation API
  fetchLocationAndSendToInbox(visitorInfo);
}

function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

async function fetchLocationAndSendToInbox(visitorInfo) {
  try {
    // Use a free IP geolocation service
    const response = await fetch('https://ipapi.co/json/');
    const locationData = await response.json();
    
    // Create visitor message
    const visitorMessage = {
      id: Date.now(),
      from: 'Website Visitor',
      email: 'visitor@website.com',
      subject: '🌍 New Website Visitor Detected',
      content: createVisitorMessage(visitorInfo, locationData),
      date: new Date().toISOString(),
      read: false,
      type: 'visitor_tracking',
      location: locationData,
      visitorInfo: visitorInfo
    };
    
    // Send to admin inbox
    let inboxMessages = JSON.parse(localStorage.getItem('inboxMessages') || '[]');
    
    // Check if this session was already tracked (avoid duplicates)
    const existingSession = inboxMessages.find(msg => 
      msg.type === 'visitor_tracking' && 
      msg.visitorInfo && 
      msg.visitorInfo.sessionId === visitorInfo.sessionId
    );
    
    if (!existingSession) {
      inboxMessages.unshift(visitorMessage);
      localStorage.setItem('inboxMessages', JSON.stringify(inboxMessages));
      
      console.log('Visitor tracked and sent to inbox:', locationData);
    }
    
  } catch (error) {
    console.error('Error fetching location:', error);
    
    // Fallback: send message without location data
    const visitorMessage = {
      id: Date.now(),
      from: 'Website Visitor',
      email: 'visitor@website.com',
      subject: '🌍 New Website Visitor Detected',
      content: createVisitorMessage(visitorInfo, null),
      date: new Date().toISOString(),
      read: false,
      type: 'visitor_tracking',
      visitorInfo: visitorInfo
    };
    
    let inboxMessages = JSON.parse(localStorage.getItem('inboxMessages') || '[]');
    const existingSession = inboxMessages.find(msg => 
      msg.type === 'visitor_tracking' && 
      msg.visitorInfo && 
      msg.visitorInfo.sessionId === visitorInfo.sessionId
    );
    
    if (!existingSession) {
      inboxMessages.unshift(visitorMessage);
      localStorage.setItem('inboxMessages', JSON.stringify(inboxMessages));
    }
  }
}

function createVisitorMessage(visitorInfo, locationData) {
  let message = `🌍 **New Website Visitor Detected**\n\n`;
  
  if (locationData) {
    message += `📍 **Location Information:**\n`;
    message += `• City: ${locationData.city || 'Unknown'}\n`;
    message += `• Region: ${locationData.region || 'Unknown'}\n`;
    message += `• Country: ${locationData.country_name || 'Unknown'}\n`;
    message += `• IP Address: ${locationData.ip || 'Unknown'}\n`;
    message += `• Organization: ${locationData.org || 'Unknown'}\n\n`;
  }
  
  message += `💻 **Technical Information:**\n`;
  message += `• Device: ${getDeviceType(visitorInfo.userAgent)}\n`;
  message += `• Browser: ${getBrowserInfo(visitorInfo.userAgent)}\n`;
  message += `• Platform: ${visitorInfo.platform}\n`;
  message += `• Language: ${visitorInfo.language}\n`;
  message += `• Screen Resolution: ${visitorInfo.screenResolution}\n`;
  message += `• Color Depth: ${visitorInfo.colorDepth} bits\n`;
  message += `• Timezone: ${visitorInfo.timezone}\n\n`;
  
  message += `🔗 **Visit Details:**\n`;
  message += `• Referrer: ${visitorInfo.referrer}\n`;
  message += `• Visit Time: ${new Date(visitorInfo.timestamp).toLocaleString()}\n`;
  message += `• Session ID: ${visitorInfo.sessionId}\n`;
  
  return message;
}

function getDeviceType(userAgent) {
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Palm|Mini/i.test(userAgent)) {
    return '📱 Mobile Device';
  } else if (/Tablet|iPad/i.test(userAgent)) {
    return '📱 Tablet Device';
  } else {
    return '💻 Desktop Computer';
  }
}

function getBrowserInfo(userAgent) {
  let browserName = 'Unknown Browser';
  let browserVersion = '';
  
  if (userAgent.indexOf('Chrome') > -1) {
    browserName = '🌐 Google Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    browserName = '🧭 Safari';
  } else if (userAgent.indexOf('Firefox') > -1) {
    browserName = '🦊 Firefox';
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
    browserName = '🌍 Internet Explorer';
  } else if (userAgent.indexOf('Edge') > -1) {
    browserName = '📘 Microsoft Edge';
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browserName = '🎭 Opera';
  }
  
  return browserName;
}

// Track visitor when page loads
window.addEventListener('load', () => {
  // Wait a moment to ensure page is fully loaded
  setTimeout(trackVisitor, 1000);
});

// Also track when user becomes active (after being idle)
let isTrackingActive = false;
let activityTimer;

function resetActivityTimer() {
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    if (!isTrackingActive) {
      isTrackingActive = true;
      trackVisitor();
    }
  }, 30000); // Track after 30 seconds of inactivity
}

// Monitor user activity (only after visitor tracking is started)
function startActivityMonitoring() {
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(eventType => {
    document.addEventListener(eventType, resetActivityTimer);
  });
}

/* ==========================
DEFAULT TAB
========================== */

window.addEventListener('DOMContentLoaded', () => {
  const id = (window.location.hash || "#home").replace(/^#/, "");
  showTabById(id);
});

// Tab switching is handled by the hash-link handler above.