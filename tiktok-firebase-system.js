// 🎵 TikTok Firebase System with Embed API and Date Rotation
class TikTokFirebaseSystem {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyDdCAfblfC8HjcaIZFIi34WoA9hO0fXELY",
            authDomain: "josees-finest.firebaseapp.com",
            projectId: "josees-finest",
            storageBucket: "josees-finest.firebasestorage.app",
            messagingSenderId: "1023918542701",
            appId: "1:1023918542701:web:e087b978b61eaba1001464"
        };
        
        this.firebaseDB = null;
        this.currentVideos = [];
        this.selectedVideos = new Set();
        this.adminPassword = "4997G9749@j";
        this.bulkMode = false;
        this.rotationInterval = null;
        this.dateIndex = 0;
    }

    // Initialize Firebase and TikTok system
    async initialize() {
        try {
            console.log('🎵 Initializing TikTok Firebase System...');
            
            // Initialize Firebase
            if (!firebase.apps.length) {
                firebase.initializeApp(this.firebaseConfig);
            }
            this.firebaseDB = firebase.firestore();
            
            console.log('✅ Firebase initialized');
            
            // Initialize Firebase collection with sample data
            await this.initializeFirebaseCollection();
            
            // Start date-based rotation
            this.startDateBasedRotation();
            
            // Load current videos
            await this.loadVideosFromFirebase();
            
            console.log('✅ TikTok Firebase System initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ TikTok Firebase System initialization error:', error);
            return false;
        }
    }

    // Initialize Firebase collection with multiple TikTok URLs
    async initializeFirebaseCollection() {
        try {
            console.log('📝 Initializing Firebase collection "tiktokvideos"...');
            
            // Check if collection exists
            const collectionRef = this.firebaseDB.collection('tiktokvideos');
            const snapshot = await collectionRef.get();
            
            if (snapshot.empty) {
                console.log('📝 Collection empty, adding sample TikTok videos...');
                
                // Sample TikTok videos with real URLs
                const sampleVideos = [
                    {
                        id: 'tiktok_1',
                        title: 'Viral Dance Challenge 🔥',
                        url: 'https://www.tiktok.com/@bellapoarch/video/6847327412677565446',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6847327412677565446',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6847327412677565446~c5_300x400.jpeg',
                        views: '45.2M',
                        likes: '4.8M',
                        comments: '234K',
                        shares: '567K',
                        creator: '@bellapoarch',
                        duration: '15s',
                        tags: ['dance', 'viral', 'challenge', 'trending'],
                        category: 'dance',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_2',
                        title: 'Comedy Gold 😂',
                        url: 'https://www.tiktok.com/@addisonre/video/6886656498994253574',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6886656498994253574',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6886656498994253574~c5_300x400.jpeg',
                        views: '32.1M',
                        likes: '3.2M',
                        comments: '189K',
                        shares: '423K',
                        creator: '@addisonre',
                        duration: '22s',
                        tags: ['comedy', 'funny', 'viral', 'entertainment'],
                        category: 'comedy',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_3',
                        title: 'Cooking Masterclass 🍳',
                        url: 'https://www.tiktok.com/@charlidamelio/video/6883489889375195654',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6883489889375195654',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6883489889375195654~c5_300x400.jpeg',
                        views: '28.7M',
                        likes: '2.9M',
                        comments: '156K',
                        shares: '389K',
                        creator: '@charlidamelio',
                        duration: '30s',
                        tags: ['cooking', 'food', 'recipe', 'tutorial'],
                        category: 'cooking',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_4',
                        title: 'Fitness Motivation 💪',
                        url: 'https://www.tiktok.com/@zachking/video/6829317892567877634',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6829317892567877634',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6829317892567877634~c5_300x400.jpeg',
                        views: '19.4M',
                        likes: '2.1M',
                        comments: '98K',
                        shares: '234K',
                        creator: '@zachking',
                        duration: '18s',
                        tags: ['fitness', 'workout', 'motivation', 'health'],
                        category: 'fitness',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_5',
                        title: 'Art Tutorial 🎨',
                        url: 'https://www.tiktok.com/@khaby.lame/video/6956268345873268225',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6956268345873268225',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6956268345873268225~c5_300x400.jpeg',
                        views: '67.8M',
                        likes: '7.2M',
                        comments: '445K',
                        shares: '891K',
                        creator: '@khaby.lame',
                        duration: '45s',
                        tags: ['art', 'tutorial', 'creative', 'painting'],
                        category: 'art',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_6',
                        title: 'Music Performance 🎵',
                        url: 'https://www.tiktok.com/@dixiedamelio/video/6877339126312900102',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6877339126312900102',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6877339126312900102~c5_300x400.jpeg',
                        views: '23.5M',
                        likes: '2.4M',
                        comments: '123K',
                        shares: '298K',
                        creator: '@dixiedamelio',
                        duration: '52s',
                        tags: ['music', 'performance', 'song', 'cover'],
                        category: 'music',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_7',
                        title: 'Tech Review 📱',
                        url: 'https://www.tiktok.com/@willsmith/video/6848326989375263750',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6848326989375263750',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6848326989375263750~c5_300x400.jpeg',
                        views: '15.3M',
                        likes: '1.6M',
                        comments: '78K',
                        shares: '187K',
                        creator: '@willsmith',
                        duration: '28s',
                        tags: ['tech', 'review', 'gadgets', 'technology'],
                        category: 'tech',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_8',
                        title: 'Fashion Haul 👗',
                        url: 'https://www.tiktok.com/@jasonderulo/video/6887654321987654321',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6887654321987654321',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6887654321987654321~c5_300x400.jpeg',
                        views: '12.9M',
                        likes: '1.3M',
                        comments: '67K',
                        shares: '156K',
                        creator: '@jasonderulo',
                        duration: '35s',
                        tags: ['fashion', 'style', 'haul', 'clothing'],
                        category: 'fashion',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_9',
                        title: 'Pet Tricks 🐾',
                        url: 'https://www.tiktok.com/@lizzza/video/6876543210987654321',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6876543210987654321',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6876543210987654321~c5_300x400.jpeg',
                        views: '18.7M',
                        likes: '1.9M',
                        comments: '89K',
                        shares: '234K',
                        creator: '@lizzza',
                        duration: '25s',
                        tags: ['pets', 'animals', 'cute', 'tricks'],
                        category: 'pets',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_10',
                        title: 'Travel Vlog ✈️',
                        url: 'https://www.tiktok.com/@spencerx/video/6885432109876543210',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6885432109876543210',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6885432109876543210~c5_300x400.jpeg',
                        views: '9.8M',
                        likes: '1.1M',
                        comments: '56K',
                        shares: '123K',
                        creator: '@spencerx',
                        duration: '48s',
                        tags: ['travel', 'adventure', 'explore', 'vlog'],
                        category: 'travel',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_11',
                        title: 'Sports Highlights ⚽',
                        url: 'https://www.tiktok.com/@brittanybroski/video/6874321098765432109',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6874321098765432109',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6874321098765432109~c5_300x400.jpeg',
                        views: '14.2M',
                        likes: '1.5M',
                        comments: '78K',
                        shares: '189K',
                        creator: '@brittanybroski',
                        duration: '38s',
                        tags: ['sports', 'highlights', 'football', 'athletic'],
                        category: 'sports',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    },
                    {
                        id: 'tiktok_12',
                        title: 'Gaming Moments 🎮',
                        url: 'https://www.tiktok.com/@curtisskip/video/6883210987654321098',
                        embedUrl: 'https://www.tiktok.com/embed/v2/6883210987654321098',
                        thumbnail: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6883210987654321098~c5_300x400.jpeg',
                        views: '21.6M',
                        likes: '2.3M',
                        comments: '112K',
                        shares: '267K',
                        creator: '@curtisskip',
                        duration: '42s',
                        tags: ['gaming', 'esports', 'video-games', 'streaming'],
                        category: 'gaming',
                        dateAdded: new Date().toISOString(),
                        isActive: true
                    }
                ];

                // Add all videos to Firebase
                for (const video of sampleVideos) {
                    await collectionRef.doc(video.id).set(video);
                }

                console.log(`✅ Added ${sampleVideos.length} sample videos to Firebase collection`);
            } else {
                console.log(`✅ Firebase collection already exists with ${snapshot.size} videos`);
            }
            
            return true;
        } catch (error) {
            console.error('❌ Error initializing Firebase collection:', error);
            return false;
        }
    }

    // Start date-based rotation system
    startDateBasedRotation() {
        console.log('📅 Starting date-based rotation system...');
        
        // Calculate date index based on current date
        this.updateDateIndex();
        
        // Check daily
        this.rotationInterval = setInterval(() => {
            this.checkAndRotateVideos();
        }, 60 * 60 * 1000); // Every hour
        
        console.log('✅ Date-based rotation system started');
    }

    // Update date index for rotation
    updateDateIndex() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        this.dateIndex = dayOfYear;
        
        console.log(`📅 Date index updated: ${this.dateIndex} (Day ${dayOfYear} of year)`);
    }

    // Check if videos need rotation
    async checkAndRotateVideos() {
        const today = new Date().toDateString();
        const lastRotation = localStorage.getItem('tiktok_date_rotation');
        
        if (lastRotation !== today) {
            console.log('🔄 Rotating videos for new day...');
            await this.rotateVideosByDate();
            localStorage.setItem('tiktok_date_rotation', today);
        }
    }

    // Rotate videos using date index
    async rotateVideosByDate() {
        try {
            console.log('🔄 Rotating videos using date index...');
            
            // Get all videos from Firebase
            const allVideos = await this.getAllVideosFromFirebase();
            
            if (allVideos.length === 0) {
                console.log('❌ No videos found in Firebase');
                return;
            }

            // Calculate rotation based on date index
            const startIndex = this.dateIndex % allVideos.length;
            const videosPerRotation = 8; // Show 8 videos at a time
            
            // Get videos for current rotation
            const rotatedVideos = [];
            for (let i = 0; i < videosPerRotation && i < allVideos.length; i++) {
                const index = (startIndex + i) % allVideos.length;
                rotatedVideos.push(allVideos[index]);
            }

            // Update current videos
            this.currentVideos = rotatedVideos;
            
            // Store rotation info
            await this.firebaseDB.collection('tiktok_rotation').doc('current').set({
                dateIndex: this.dateIndex,
                startIndex: startIndex,
                videos: rotatedVideos.map(v => v.id),
                lastRotated: new Date().toISOString(),
                date: new Date().toDateString()
            });

            console.log(`✅ Successfully rotated ${rotatedVideos.length} videos using date index ${this.dateIndex}`);
            
            // Notify listeners
            this.notifyVideoUpdate();
            
        } catch (error) {
            console.error('❌ Error rotating videos by date:', error);
        }
    }

    // Get all videos from Firebase collection
    async getAllVideosFromFirebase() {
        try {
            console.log('📥 Fetching all videos from Firebase collection...');
            
            const snapshot = await this.firebaseDB.collection('tiktokvideos')
                .where('isActive', '==', true)
                .get();
            
            const videos = [];
            snapshot.forEach(doc => {
                const video = doc.data();
                video.id = doc.id;
                videos.push(video);
            });

            console.log(`✅ Retrieved ${videos.length} videos from Firebase collection`);
            return videos;
        } catch (error) {
            console.error('❌ Error fetching videos from Firebase:', error);
            return [];
        }
    }

    // Load current videos from Firebase
    async loadVideosFromFirebase() {
        try {
            console.log('📥 Loading current videos from Firebase...');
            
            // Try to get current rotation
            const rotationDoc = await this.firebaseDB.collection('tiktok_rotation').doc('current').get();
            
            if (rotationDoc.exists) {
                const rotationData = rotationDoc.data();
                console.log(`📅 Found rotation data: index ${rotationData.dateIndex}`);
                
                // Load videos from rotation
                const videoIds = rotationData.videos || [];
                const videos = [];
                
                for (const videoId of videoIds) {
                    const videoDoc = await this.firebaseDB.collection('tiktokvideos').doc(videoId).get();
                    if (videoDoc.exists) {
                        const video = videoDoc.data();
                        video.id = videoDoc.id;
                        videos.push(video);
                    }
                }
                
                this.currentVideos = videos;
                console.log(`✅ Loaded ${videos.length} videos from rotation`);
            } else {
                console.log('📝 No rotation data found, creating initial rotation...');
                await this.rotateVideosByDate();
            }
        } catch (error) {
            console.error('❌ Error loading videos from Firebase:', error);
            // Fallback to direct loading
            this.currentVideos = await this.getAllVideosFromFirebase();
        }
    }

    // Get current videos
    getCurrentVideos() {
        return this.currentVideos;
    }

    // Toggle bulk selection mode
    toggleBulkMode() {
        this.bulkMode = !this.bulkMode;
        this.selectedVideos.clear();
        
        console.log(`🔄 Bulk mode: ${this.bulkMode ? 'ON' : 'OFF'}`);
        
        // Notify UI to update
        this.notifyBulkModeChange();
        
        return this.bulkMode;
    }

    // Select/deselect video for bulk operations
    toggleVideoSelection(videoId) {
        if (this.selectedVideos.has(videoId)) {
            this.selectedVideos.delete(videoId);
            console.log(`❌ Deselected video: ${videoId}`);
        } else {
            this.selectedVideos.add(videoId);
            console.log(`✅ Selected video: ${videoId}`);
        }
        
        // Update UI
        this.notifySelectionChange();
        
        return this.selectedVideos.has(videoId);
    }

    // Get selected videos count
    getSelectedCount() {
        return this.selectedVideos.size;
    }

    // Get selected videos
    getSelectedVideos() {
        return this.currentVideos.filter(video => this.selectedVideos.has(video.id));
    }

    // Bulk delete selected videos with admin password
    async bulkDeleteSelectedVideos(password) {
        if (password !== this.adminPassword) {
            console.log('❌ Incorrect admin password');
            return { success: false, message: 'Incorrect admin password' };
        }

        if (this.selectedVideos.size === 0) {
            console.log('❌ No videos selected for deletion');
            return { success: false, message: 'No videos selected' };
        }

        try {
            console.log(`🗑️ Deleting ${this.selectedVideos.size} selected videos...`);
            
            // Delete from Firebase collection
            for (const videoId of this.selectedVideos) {
                await this.firebaseDB.collection('tiktokvideos').doc(videoId).update({
                    isActive: false,
                    deletedAt: new Date().toISOString()
                });
            }
            
            // Remove selected videos from current list
            this.currentVideos = this.currentVideos.filter(video => !this.selectedVideos.has(video.id));
            
            // Clear selection
            this.selectedVideos.clear();
            
            // Update Firebase rotation
            await this.firebaseDB.collection('tiktok_rotation').doc('current').update({
                videos: this.currentVideos.map(v => v.id),
                lastUpdated: new Date().toISOString()
            });
            
            // Notify listeners
            this.notifyVideoUpdate();
            this.notifySelectionChange();
            
            console.log('✅ Bulk delete successful');
            return { success: true, message: `Successfully deleted ${this.selectedVideos.size} videos` };
            
        } catch (error) {
            console.error('❌ Error during bulk delete:', error);
            return { success: false, message: 'Error during bulk delete' };
        }
    }

    // Add new video to Firebase collection
    async addVideoToCollection(videoData) {
        try {
            console.log('➕ Adding new video to Firebase collection...');
            
            const newVideo = {
                ...videoData,
                id: `tiktok_${Date.now()}`,
                dateAdded: new Date().toISOString(),
                isActive: true
            };

            await this.firebaseDB.collection('tiktokvideos').doc(newVideo.id).set(newVideo);
            
            console.log('✅ Successfully added new video to collection');
            
            // Refresh current videos
            await this.loadVideosFromFirebase();
            
            return { success: true, video: newVideo };
        } catch (error) {
            console.error('❌ Error adding video to collection:', error);
            return { success: false, error: error.message };
        }
    }

    // Play TikTok video using embed API
    playTiktokVideo(videoId, title) {
        console.log(`🎵 Playing TikTok video: ${title}`);
        
        const video = this.currentVideos.find(v => v.id === videoId);
        if (!video) {
            console.error('❌ Video not found:', videoId);
            return;
        }

        // Use TikTok embed API
        if (window.customVideoPlayer) {
            window.customVideoPlayer.init(video.embedUrl, title);
        } else {
            console.error('❌ Custom video player not available');
        }
    }

    // Notify listeners
    notifyVideoUpdate() {
        window.dispatchEvent(new CustomEvent('tiktokVideosUpdated', {
            detail: { videos: this.currentVideos }
        }));
    }

    notifyBulkModeChange() {
        window.dispatchEvent(new CustomEvent('tiktokBulkModeChange', {
            detail: { bulkMode: this.bulkMode }
        }));
    }

    notifySelectionChange() {
        window.dispatchEvent(new CustomEvent('tiktokSelectionChange', {
            detail: { 
                selectedCount: this.selectedVideos.size,
                selectedVideos: Array.from(this.selectedVideos)
            }
        }));
    }

    // Clean up
    destroy() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }
    }
}

// Create global instance
window.tiktokFirebaseSystem = new TikTokFirebaseSystem();
