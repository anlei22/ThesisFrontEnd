// src/services/profileApi.js

const API_URL = import.meta.env.VITE_BACKEND_URI || 'http://127.0.0.1:8000/api/';
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Fetch user profile with posts
 * @param {number} userId - The user ID to fetch
 * @returns {Promise<Object>} User profile data with posts
 */
export const fetchUserProfile = async (userId) => {
  try {
    // Get auth token from localStorage
    const token = localStorage.getItem('token');
    
    // Build headers
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization - try token first, fallback to API key
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (API_KEY) {
      headers['x-api-key'] = API_KEY;
    }
    
    console.log('🔐 Fetching profile with auth:', {
      userId,
      hasToken: !!token,
      hasApiKey: !!API_KEY,
      url: `${API_URL}profile/get/${userId}/profile`
    });
    
    const response = await fetch(`${API_URL}profile/get/${userId}/profile`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'success') {
      return transformProfileData(data);
    } else {
      throw new Error(data.message || 'Failed to fetch profile');
    }
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Transform API response to match UserProfileView component format
 */
const transformProfileData = (apiData) => {
  const userData = apiData.data;
  
  // Extract name parts
  const nameParts = userData.name?.split(' ') || ['Unknown', 'User'];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || '';
  
  // Transform user basic info
  const user = {
    id: userData.id,
    name: userData.name || 'Unknown User',
    username: userData.username ? `@${userData.username}` : '@unknown',
    email: userData.email || '',
    avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=10b981&color=fff`,
    coverPhoto: userData.coverPhoto || '',
    bio: userData.bio || `Member since ${new Date(userData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
    location: userData.location || 'Philippines',
    joinDate: `Joined ${new Date(userData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
    rating: parseFloat(apiData.average_rating || 0),
    totalReviews: userData.animal_feeds?.reduce((sum, feed) => sum + (feed.ratings?.length || 0), 0) || 0,
    followers: userData.followers || 0,
    following: userData.following || 0,
    isVerified: userData.isVerified || true,
    specialties: [...new Set(userData.animal_feeds?.map(feed => feed.type).filter(Boolean))] || [],
    user_type: userData.user_type || 'buyer',
  };

  // Transform posts from animal_feeds
  const userPosts = (userData.animal_feeds || []).map(feed => {
    // Get relative timestamp
    const timestamp = getRelativeTime(feed.created_at);
    
    // Transform images - handle both URL formats
    const images = (feed.images || []).map(img => {
      // If image_path is already a full URL, use it
      if (img.image_path?.startsWith('http')) {
        return img.image_path;
      }
      // Otherwise construct the URL
      return `${API_URL.replace('/api/', '')}/uploads/news_feed/${img.image_path}`;
    });

    return {
      id: feed.id,
      content: feed.description || '',
      images: images,
      likes: feed.likes_count || 0,
      comments: 0, // Not in current API response
      bookmarks: feed.bookmarks_count || 0,
      timestamp: timestamp,
      isLiked: feed.is_liked || false,
      isBookmarked: feed.is_bookmarked || false,
      animalInfo: {
        title: feed.title || 'Untitled',
        type: feed.type || 'Unknown',
        breed: feed.breed || 'N/A',
        age: feed.age || 'N/A',
        sex: feed.sex || 'N/A',
        price: feed.price ? `₱${parseFloat(feed.price).toLocaleString()}` : 'Price on request',
        availability: feed.status === 'available' ? 'available' : 'sold',
        description: feed.description || 'No description available',
      }
    };
  });

  console.log('✅ Profile Data Transformed:', {
    userId: user.id,
    name: user.name,
    postsCount: userPosts.length,
    rating: user.rating,
  });

  return { user, userPosts };
};

/**
 * Helper function to get relative time
 */
const getRelativeTime = (dateString) => {
  if (!dateString) return 'Recently';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default fetchUserProfile;