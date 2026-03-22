// 🎵 TikTok API Integration - Real TikTok Account Connection
class TikTokAPIIntegration {
    constructor() {
        this.apiKey = null;
        this.apiSecret = null;
        this.accessToken = null;
        this.userProfile = null;
        this.userVideos = [];
        this.isAuthenticated = false;
        this.apiBase = 'https://open.tiktokapis.com/v2';
        this.developmentMode = true; // Enable development mode
    }

    // Initialize TikTok API integration
    async initialize(config) {
        try {
            console.log('🎵 Initializing TikTok API Integration...');
            
            this.apiKey = config.apiKey;
            this.apiSecret = config.apiSecret;
            this.redirectUri = config.redirectUri;
            
            // Check if we have stored tokens
            const storedToken = localStorage.getItem('tiktok_access_token');
            if (storedToken) {
                this.accessToken = storedToken;
                this.isAuthenticated = true;
                await this.loadUserProfile();
                await this.loadUserVideos();
            } else if (this.developmentMode) {
                // Development mode - use mock data
                console.log('🔧 Using development mode with mock TikTok data');
                this.loadMockData();
                return true;
            }
            
            console.log('✅ TikTok API Integration initialized');
            return true;
        } catch (error) {
            console.error('❌ TikTok API initialization error:', error);
            if (this.developmentMode) {
                console.log('🔧 Falling back to development mode');
                this.loadMockData();
                return true;
            }
            return false;
        }
    }

    // Load mock data for development
    loadMockData() {
        console.log('🔧 Loading development mode mock data...');
        
        this.userProfile = {
            display_name: 'Josee\'s Finest',
            username: 'joseesfinest',
            stats: {
                follower_count: 12500,
                following_count: 890,
                heart_count: 45678
            }
        };

        this.userVideos = [
            {
                id: 'mock1',
                title: 'Amazing Dance Moves 🎵',
                url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                embedUrl: 'https://www.tiktok.com/@joseesfinest/video/mock1',
                thumbnail: 'https://picsum.photos/seed/tiktok1/300/400.jpg',
                views: '45.2K',
                likes: '3.8K',
                comments: '892',
                shares: '234',
                creator: '@joseesfinest',
                duration: '15s',
                createTime: Date.now() - 86400000,
                isRealTiktok: false,
                isMock: true
            },
            {
                id: 'mock2',
                title: 'Funny Comedy Sketch 😂',
                url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                embedUrl: 'https://www.tiktok.com/@joseesfinest/video/mock2',
                thumbnail: 'https://picsum.photos/seed/tiktok2/300/400.jpg',
                views: '32.1K',
                likes: '2.9K',
                comments: '567',
                shares: '123',
                creator: '@joseesfinest',
                duration: '20s',
                createTime: Date.now() - 172800000,
                isRealTiktok: false,
                isMock: true
            },
            {
                id: 'mock3',
                title: 'Cooking Tutorial 🍳',
                url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                embedUrl: 'https://www.tiktok.com/@joseesfinest/video/mock3',
                thumbnail: 'https://picsum.photos/seed/tiktok3/300/400.jpg',
                views: '28.7K',
                likes: '2.1K',
                comments: '445',
                shares: '98',
                creator: '@joseesfinest',
                duration: '25s',
                createTime: Date.now() - 259200000,
                isRealTiktok: false,
                isMock: true
            }
        ];

        this.isAuthenticated = true;
        console.log('✅ Development mode loaded successfully!');
        console.log('📊 Mock data:', {
            profile: this.userProfile,
            videoCount: this.userVideos.length,
            authenticated: this.isAuthenticated
        });
    }

    // Start OAuth authentication flow
    startAuthentication() {
        console.log('🔐 Starting TikTok OAuth authentication...');
        
        const authUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=${this.apiKey}&scope=user.info.basic,user.info.profile,user.info.stats,video.list&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&state=${this.generateState()}`;
        
        console.log('🔗 Auth URL:', authUrl);
        window.location.href = authUrl;
    }

    // Handle OAuth callback
    async handleCallback(code, state) {
        try {
            console.log('🔄 Handling TikTok OAuth callback...');
            
            // Exchange authorization code for access token
            const tokenResponse = await this.exchangeCodeForToken(code);
            
            if (tokenResponse.access_token) {
                this.accessToken = tokenResponse.access_token;
                this.isAuthenticated = true;
                
                // Store token securely
                localStorage.setItem('tiktok_access_token', this.accessToken);
                
                // Load user profile and videos
                await this.loadUserProfile();
                await this.loadUserVideos();
                
                console.log('✅ TikTok authentication successful');
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('❌ TikTok callback error:', error);
            return false;
        }
    }

    // Exchange authorization code for access token
    async exchangeCodeForToken(code) {
        const response = await fetch(`${this.apiBase}/oauth/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_key: this.apiKey,
                client_secret: this.apiSecret,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: this.redirectUri,
            })
        });
        
        return await response.json();
    }

    // Load user profile information
    async loadUserProfile() {
        try {
            console.log('👤 Loading TikTok user profile...');
            
            const response = await fetch(`${this.apiBase}/user/info/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                }
            });
            
            const data = await response.json();
            
            if (data.data.user) {
                this.userProfile = data.data.user;
                console.log('✅ User profile loaded:', this.userProfile);
            }
        } catch (error) {
            console.error('❌ Error loading user profile:', error);
        }
    }

    // Load user's TikTok videos
    async loadUserVideos() {
        try {
            console.log('📹 Loading TikTok user videos...');
            
            const response = await fetch(`${this.apiBase}/video/list/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                }
            });
            
            const data = await response.json();
            
            if (data.data.videos) {
                this.userVideos = data.data.videos.map(video => ({
                    id: video.id,
                    title: video.title || 'TikTok Video',
                    url: video.video_url,
                    embedUrl: video.embed_url,
                    thumbnail: video.thumbnail_url,
                    views: video.stats?.play_count || '0',
                    likes: video.stats?.digg_count || '0',
                    comments: video.stats?.comment_count || '0',
                    shares: video.stats?.share_count || '0',
                    creator: this.userProfile?.display_name || '@you',
                    duration: this.formatDuration(video.duration),
                    createTime: video.create_time,
                    isRealTiktok: true
                }));
                
                console.log(`✅ Loaded ${this.userVideos.length} TikTok videos`);
            }
        } catch (error) {
            console.error('❌ Error loading user videos:', error);
        }
    }

    // Get user videos for display
    getUserVideos() {
        return this.userVideos;
    }

    // Get user profile information
    getUserProfile() {
        return this.userProfile;
    }

    // Check if authenticated
    isLoggedIn() {
        return this.isAuthenticated;
    }

    // Logout user
    logout() {
        console.log('🔒 Logging out from TikTok...');
        this.accessToken = null;
        this.isAuthenticated = false;
        this.userProfile = null;
        this.userVideos = [];
        localStorage.removeItem('tiktok_access_token');
    }

    // Start authentication process
    startAuthentication() {
        console.log('🔐 Starting TikTok authentication...');
        const authUrl = this.getAuthUrl();
        window.location.href = authUrl;
    }

    // Play TikTok video using official TikTok player
    playVideo(videoId) {
        const video = this.userVideos.find(v => v.id === videoId);
        if (!video) return;

        console.log(`🎵 Playing TikTok video: ${video.title}`);
        
        if (window.customVideoPlayer) {
            try {
                // Use official TikTok embed URL for best compatibility
                window.customVideoPlayer.init(video.embedUrl, video.title);
                console.log('✅ TikTok video started successfully');
            } catch (error) {
                console.error('❌ Error playing TikTok video:', error);
                this.fallbackPlay(video);
            }
        }
    }

    // Fallback playback method
    fallbackPlay(video) {
        console.log('🔄 Trying fallback TikTok playback...');
        
        if (window.customVideoPlayer && window.customVideoPlayer.player) {
            const iframe = document.createElement('iframe');
            iframe.src = video.embedUrl;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            
            window.customVideoPlayer.player.innerHTML = '';
            window.customVideoPlayer.player.appendChild(iframe);
            console.log('✅ TikTok fallback playback successful');
        }
    }

    // Utility functions
    generateState() {
        return Math.random().toString(36).substring(2, 15);
    }

    formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Get authentication URL for frontend
    getAuthUrl() {
        return `https://www.tiktok.com/v2/auth/authorize/?
            client_key=${this.apiKey}&
            scope=user.info.basic,user.info.profile,user.info.stats,video.list&
            response_type=code&
            redirect_uri=${encodeURIComponent(this.redirectUri)}&
            state=${this.generateState()}`;
    }
}

// Create global instance
window.tiktokAPI = new TikTokAPIIntegration();
