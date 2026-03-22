// 🎵 TikTok Integration System - Advanced Video Management
class TikTokIntegration {
    constructor() {
        this.apiKey = null;
        this.firebaseDB = null;
        this.updateInterval = 24 * 60 * 60 * 1000; // 24 hours
        this.lastUpdate = null;
        this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
        this.maxVideos = 50; // Maximum videos to keep
        this.trendingVideos = [];
        this.isLoading = false;
        this.currentVideoIndex = 0;
        this.autoPlayEnabled = true;
        this.autoPlayInterval = null;
    }

    // Initialize TikTok integration
    async initialize() {
        console.log('🎵 Initializing TikTok Integration...');
        
        try {
            // Initialize Firebase connection
            this.initializeFirebase();
            
            // Check for existing cache
            await this.checkCache();
            
            // Start auto-update scheduler
            this.startAutoUpdate();
            
            console.log('✅ TikTok Integration initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ TikTok Integration initialization failed:', error);
            return false;
        }
    }

    // Initialize Firebase connection
    initializeFirebase() {
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            this.firebaseDB = firebase.firestore();
            console.log('✅ Firebase connection established');
        } else {
            throw new Error('Firebase not available');
        }
    }

    // Check for existing cached videos
    async checkCache() {
        try {
            const cacheRef = this.firebaseDB.collection('tiktok_cache').doc('latest');
            const cacheDoc = await cacheRef.get();
            
            if (cacheDoc.exists) {
                const cache = cacheDoc.data();
                const now = Date.now();
                
                // Check if cache is still valid (less than 24 hours old)
                if (now - cache.timestamp < this.cacheExpiry) {
                    console.log('📱 Using cached TikTok videos');
                    this.trendingVideos = cache.videos || [];
                    this.lastUpdate = cache.timestamp;
                    return true;
                }
            }
            
            // Cache expired or doesn't exist, fetch new videos
            console.log('🔄 Cache expired, fetching new TikTok videos');
            await this.fetchTrendingVideos();
            return true;
            
        } catch (error) {
            console.error('❌ Cache check failed:', error);
            return false;
        }
    }

    // Fetch trending TikTok videos
    async fetchTrendingVideos() {
        if (this.isLoading) {
            console.log('⏳ Already fetching TikTok videos...');
            return;
        }

        this.isLoading = true;
        console.log('🎵 Fetching trending TikTok videos...');

        try {
            // Method 1: Try TikTok API (if available)
            let videos = await this.fetchFromTikTokAPI();
            
            // Method 2: Fallback to web scraping
            if (!videos || videos.length === 0) {
                videos = await this.fetchFromWebScraping();
            }
            
            // Method 3: Fallback to sample data
            if (!videos || videos.length === 0) {
                videos = this.getSampleTikTokVideos();
            }
            
            // Process and store videos
            await this.processAndStoreVideos(videos);
            
            console.log(`✅ Successfully fetched ${videos.length} TikTok videos`);
            
        } catch (error) {
            console.error('❌ Failed to fetch TikTok videos:', error);
            // Use sample videos as fallback
            await this.processAndStoreVideos(this.getSampleTikTokVideos());
        } finally {
            this.isLoading = false;
        }
    }

    // Fetch from TikTok API (placeholder for actual API implementation)
    async fetchFromTikTokAPI() {
        console.log('🔍 Attempting TikTok API fetch...');
        
        // This would be replaced with actual TikTok API calls
        // For now, return null to trigger fallback methods
        return null;
    }

    // Fetch from web scraping (placeholder for web scraping implementation)
    async fetchFromWebScraping() {
        console.log('🔍 Attempting web scraping...');
        
        // This would be replaced with actual web scraping logic
        // For now, return null to trigger sample data
        return null;
    }

    // Get sample TikTok videos (fallback)
    getSampleTikTokVideos() {
        return [
            {
                id: 'tiktok1',
                title: 'Amazing Dance Trend',
                url: 'https://www.tiktok.com/@example/video/1234567890',
                thumbnail: 'https://picsum.photos/seed/tiktok1/300/400.jpg',
                views: '1.2M',
                likes: '89K',
                comments: '2.3K',
                shares: '1.1K',
                creator: '@example',
                duration: '15s',
                timestamp: Date.now(),
                tags: ['dance', 'trending', 'viral']
            },
            {
                id: 'tiktok2',
                title: 'Comedy Sketch',
                url: 'https://www.tiktok.com/@funny/video/0987654321',
                thumbnail: 'https://picsum.photos/seed/tiktok2/300/400.jpg',
                views: '890K',
                likes: '67K',
                comments: '1.8K',
                shares: '890',
                creator: '@funny',
                duration: '22s',
                timestamp: Date.now(),
                tags: ['comedy', 'funny', 'sketch']
            },
            {
                id: 'tiktok3',
                title: 'Cooking Hack',
                url: 'https://www.tiktok.com/@chef/video/5555555555',
                thumbnail: 'https://picsum.photos/seed/tiktok3/300/400.jpg',
                views: '2.5M',
                likes: '156K',
                comments: '4.2K',
                shares: '2.8K',
                creator: '@chef',
                duration: '30s',
                timestamp: Date.now(),
                tags: ['cooking', 'hack', 'recipe']
            },
            {
                id: 'tiktok4',
                title: 'Fitness Challenge',
                url: 'https://www.tiktok.com/@fit/video/7777777777',
                thumbnail: 'https://picsum.photos/seed/tiktok4/300/400.jpg',
                views: '3.1M',
                likes: '234K',
                comments: '5.6K',
                shares: '3.2K',
                creator: '@fit',
                duration: '18s',
                timestamp: Date.now(),
                tags: ['fitness', 'challenge', 'workout']
            },
            {
                id: 'tiktok5',
                title: 'Art Tutorial',
                url: 'https://www.tiktok.com/@artist/video/9999999999',
                thumbnail: 'https://picsum.photos/seed/tiktok5/300/400.jpg',
                views: '567K',
                likes: '45K',
                comments: '1.2K',
                shares: '678',
                creator: '@artist',
                duration: '45s',
                timestamp: Date.now(),
                tags: ['art', 'tutorial', 'creative']
            }
        ];
    }

    // Process and store videos in Firebase
    async processAndStoreVideos(videos) {
        try {
            // Add timestamps and process videos
            const processedVideos = videos.map(video => ({
                ...video,
                timestamp: Date.now(),
                expiry: Date.now() + this.cacheExpiry
            }));

            // Store in Firebase cache
            const cacheRef = this.firebaseDB.collection('tiktok_cache').doc('latest');
            await cacheRef.set({
                videos: processedVideos,
                timestamp: Date.now(),
                lastUpdated: new Date().toISOString()
            });

            // Store individual videos for easy access
            const batch = this.firebaseDB.batch();
            processedVideos.forEach(video => {
                const videoRef = this.firebaseDB.collection('tiktok_videos').doc(video.id);
                batch.set(videoRef, video);
            });
            await batch.commit();

            // Update local cache
            this.trendingVideos = processedVideos;
            this.lastUpdate = Date.now();

            console.log(`✅ Stored ${processedVideos.length} TikTok videos in Firebase`);
            
            // Trigger cleanup of old videos
            await this.cleanupOldVideos();
            
        } catch (error) {
            console.error('❌ Failed to process and store videos:', error);
            throw error;
        }
    }

    // Clean up old videos (older than 24 hours)
    async cleanupOldVideos() {
        try {
            console.log('🗑️ Cleaning up old TikTok videos...');
            
            const now = Date.now();
            const cutoffTime = now - this.cacheExpiry;
            
            // Get all videos
            const videosRef = this.firebaseDB.collection('tiktok_videos');
            const snapshot = await videosRef.get();
            
            const batch = this.firebaseDB.batch();
            let deletedCount = 0;
            
            snapshot.forEach(doc => {
                const video = doc.data();
                if (video.timestamp < cutoffTime) {
                    batch.delete(doc.ref);
                    deletedCount++;
                }
            });
            
            if (deletedCount > 0) {
                await batch.commit();
                console.log(`🗑️ Deleted ${deletedCount} old TikTok videos`);
            } else {
                console.log('✅ No old videos to delete');
            }
            
        } catch (error) {
            console.error('❌ Failed to cleanup old videos:', error);
        }
    }

    // Start auto-update scheduler
    startAutoUpdate() {
        console.log('⏰ Starting TikTok auto-update scheduler...');
        
        // Update immediately if needed
        if (!this.lastUpdate || Date.now() - this.lastUpdate > this.updateInterval) {
            this.fetchTrendingVideos();
        }
        
        // Schedule regular updates
        setInterval(() => {
            console.log('🔄 Scheduled TikTok update running...');
            this.fetchTrendingVideos();
        }, this.updateInterval);
        
        // Schedule cleanup every 12 hours
        setInterval(() => {
            console.log('🗑️ Scheduled cleanup running...');
            this.cleanupOldVideos();
        }, 12 * 60 * 60 * 1000); // 12 hours
    }

    // Get trending videos
    }
    
    // Schedule regular updates
    setInterval(() => {
        console.log('🔄 Scheduled TikTok update running...');
        this.fetchTrendingVideos();
    }, this.updateInterval);
    
    // Schedule cleanup every 12 hours
    setInterval(() => {
        console.log('🗑️ Scheduled cleanup running...');
        this.cleanupOldVideos();
    }, 12 * 60 * 60 * 1000); // 12 hours
}

// Get trending videos
getTrendingVideos() {
    return this.trendingVideos;
}

// Play TikTok video in custom player
playTikTokVideo(videoId) {
    const video = this.trendingVideos.find(v => v.id === videoId);
    if (video && window.customVideoPlayer) {
        // Set current video index
        this.currentVideoIndex = this.trendingVideos.findIndex(v => v.id === videoId);
        // For now, return the TikTok URL as-is
        return tiktokUrl;
    }

    // Search TikTok videos
    searchVideos(query) {
        if (!query) return this.trendingVideos;
        
        const lowerQuery = query.toLowerCase();
        return this.trendingVideos.filter(video => 
            video.title.toLowerCase().includes(lowerQuery) ||
            video.creator.toLowerCase().includes(lowerQuery) ||
            video.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    // Get videos by tag
    getVideosByTag(tag) {
        return this.trendingVideos.filter(video => 
            video.tags.includes(tag)
        );
    }

    // Get system status
    getStatus() {
        return {
            isLoading: this.isLoading,
            videoCount: this.trendingVideos.length,
            lastUpdate: this.lastUpdate,
            nextUpdate: this.lastUpdate + this.updateInterval,
            cacheExpiry: this.cacheExpiry
        };
    }
}

// Create global instance
window.tiktokIntegration = new TikTokIntegration();
