import React, { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  ChatBubbleOvalLeftIcon, 
  BookmarkIcon,
  EllipsisHorizontalIcon,
  PhotoIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../../../context/AuthContext';
import LoginModal from '../../../components/LoginModal';
import ShareModal from '../../../components/ShareModal';
import useApiConnection from '../../../context/ApiConnection';
const NewsFeed = ({ darkMode, onCreatePost }) => {
const [posts, setPosts] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isAuthenticated } = useAuth();

  // Use API connection hook to fetch posts
  const { data: apiResponse, error, loading } = useApiConnection('news-feed/list');
// Add this method to NewsFeed

  useEffect(() => {
  try {
    if (error) {
      console.error('Error fetching posts:', error);
      loadSampleData();
      return;
    }

    if (apiResponse && apiResponse.status === 'success' && Array.isArray(apiResponse.data)) {
      // Transform API data to match your post structure
      const transformedPosts = apiResponse.data.map(apiPost => ({
        id: apiPost.id,
        user: {
          name: apiPost.user_name || "Unknown User",
          avatar: apiPost.user_avatar || "https://via.placeholder.com/40",
          isVerified: apiPost.user_verified || false
        },
        timestamp: formatTimestamp(apiPost.created_at),
        content: apiPost.description || "",
        animalInfo: apiPost.animal_info ? {
          type: apiPost.animal_info.type,
          title: apiPost.animal_info.title,
          description: apiPost.animal_info.description,
          breed: apiPost.animal_info.breed,
          age: apiPost.animal_info.age,
          sex: apiPost.animal_info.sex,
          price: apiPost.animal_info.price,
          availability: apiPost.animal_info.availability || 'available'
        } : null,
        images: apiPost.images || [],
        likes: apiPost.likes_count || 0,
        comments: apiPost.comments_count || 0,
        bookmarks: apiPost.bookmarks_count || 0,
        isLiked: apiPost.is_liked || false,
        isBookmarked: apiPost.is_bookmarked || false
      }));
      
      setPosts(transformedPosts);
    } else {
      loadSampleData();
    }
  } catch (err) {
    console.error('Unexpected error in NewsFeed useEffect:', err);
    loadSampleData();
  }
}, [apiResponse, error, loading]);

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  // Fallback sample data function
  const loadSampleData = () => {
    const samplePosts = [
      {
        id: 1,
        user: {
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
          isVerified: true
        },
        timestamp: "2 hours ago",
        content: "Just rescued this beautiful golden retriever! He's looking for a forever home. Such a gentle soul with the most loving eyes. #AdoptDontShop #GoldenRetriever #RescueDog",
        animalInfo: {
          type: "Dog",
          title: "Beautiful Golden Retriever looking for a home",
          description: "This sweet boy is 3 years old, fully vaccinated, and great with kids and other pets.",
          breed: "Golden Retriever",
          age: "3 years old",
          sex: "Male",
          price: "Free",
          availability: "available"
        },
        images: [
          "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=400&fit=crop",
          "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=400&fit=crop"
        ],
        likes: 247,
        comments: 32,
        bookmarks: 15,
        isLiked: false,
        isBookmarked: false
      }
    ];

    setPosts(samplePosts);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isBookmarked: !post.isBookmarked,
            bookmarks: post.isBookmarked ? post.bookmarks - 1 : post.bookmarks + 1
          }
        : post
    ));
  };

  const handleShare = (post = null) => {
    if (post) {
      // Sharing a specific post
      setSelectedPost(post);
      setShowShareModal(true);
    } else {
      // Creating a new post
      if (isAuthenticated) {
        onCreatePost();
      } else {
        setShowLoginModal(true);
      }
    }
  };

  const PostSkeleton = () => (
    <div className={`rounded-lg p-3 sm:p-6 mb-4 sm:mb-6 animate-pulse ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
          darkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`}></div>
        <div className="flex-1">
          <div className={`h-3 sm:h-4 rounded w-24 sm:w-32 mb-1 sm:mb-2 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          <div className={`h-2 sm:h-3 rounded w-16 sm:w-20 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
        </div>
      </div>
      <div className={`h-3 sm:h-4 rounded w-full mb-1 sm:mb-2 ${
        darkMode ? 'bg-gray-700' : 'bg-gray-300'
      }`}></div>
      <div className={`h-3 sm:h-4 rounded w-3/4 mb-3 sm:mb-4 ${
        darkMode ? 'bg-gray-700' : 'bg-gray-300'
      }`}></div>
      <div className={`h-48 sm:h-64 rounded-lg ${
        darkMode ? 'bg-gray-700' : 'bg-gray-300'
      }`}></div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full py-4 sm:py-6 flex justify-center">
        <div className="w-full max-w-2xl px-2 sm:px-0">
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>

    </div>
  );
}

  return (
    <div className="w-full py-4 sm:py-6 flex justify-center">
      <div className="w-full max-w-2xl px-2 sm:px-0">
      {/* Create Post Card */}
      <div className={`rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-green-100'
      }`}>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-green-600' : 'bg-green-500'
          }`}>
            <span className="text-white font-semibold text-sm sm:text-base">U</span>
          </div>
          <div className="flex-1">
            <button 
              onClick={() => handleShare()}
              className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 placeholder-gray-400' 
                  : 'bg-green-50 hover:bg-green-100 text-gray-600 placeholder-gray-500'
              }`}
            >
              Share an animal for sale or adoption...
            </button>
          </div>
          <button 
            onClick={() => handleShare()}
            className={`p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                : 'text-gray-500 hover:bg-green-100 hover:text-green-600'
            }`}
          >
            <PhotoIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4 sm:space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className={`rounded-lg border transition-colors duration-300 relative overflow-hidden ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-green-100'
            }`}>
            {/* Diagonal Ribbon for Animal Posts */}
            {post.animalInfo && (
              <div className={`absolute top-0 right-0 w-32 h-35 overflow-hidden z-10`}>
                <div className={`absolute top-4 right-[-32px] w-40 h-8 transform rotate-45 text-center text-white text-xs font-bold leading-8 shadow-lg ${
                  post.animalInfo.availability === 'available' 
                    ? 'bg-green-500' 
                    : post.animalInfo.availability === 'sold'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
                }`}>
                  {post.animalInfo.availability === 'available' 
                    ? 'AVAILABLE' 
                    : post.animalInfo.availability === 'sold'
                    ? 'SOLD OUT'
                    : post.animalInfo.availability.toUpperCase()}
                </div>
              </div>
            )}
            
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                   <div className="flex items-start space-x-2">
                      {/* Left side: name + timestamp */}
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-1">
                          <h3
                            className={`font-semibold ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {post.user.name}
                          </h3>
                          {post.user.isVerified && (
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        {/* timestamp under the name */}
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {post.timestamp}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
                <button className={`p-2 rounded-full transition-colors duration-300 ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}>
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-4">
              
              
              {/* Animal Information Card */}
              {post.animalInfo && (
                <div className="mt-4">
                  <h3 className={`text-lg font-semibold mb-1 text-center ${
                    darkMode ? 'text-green-200' : 'text-green-800'
                  }`}>
                    {post.animalInfo.title}
                  </h3>
                  
                  {post.animalInfo.description && (
                    <div className="mb-2 text-center">
                      <p className={`text-sm leading-relaxed ${
                        darkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>{post.animalInfo.description}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-center items-center">
                    <div>
                      <span className={`text-lg font-bold ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>{post.animalInfo.price}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Post Images */}
            {post.images && post.images.length > 0 && (
              <div className="px-6 pb-4">
                <div className={`grid gap-2 rounded-lg overflow-hidden ${
                  post.images.length === 1 ? 'grid-cols-1' :
                  post.images.length === 2 ? 'grid-cols-2' :
                  post.images.length === 3 ? 'grid-cols-2' :
                  'grid-cols-2'
                }`}>
                  {post.images.slice(0, 4).map((image, index) => (
                    <div key={index} className={`relative ${
                      post.images.length === 3 && index === 0 ? 'row-span-2' : ''
                    }`}>
                      <img
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity duration-200"
                        style={{ minHeight: '200px', maxHeight: '400px' }}
                      />
                      {index === 3 && post.images.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white text-xl font-semibold">
                            +{post.images.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Post Stats */}
            <div className={`px-3 sm:px-6 py-2 sm:py-3 border-t flex items-center justify-between ${
              darkMode ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {post.likes} likes
                </span>
             
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {post.bookmarks} bookmarks
                </span>
              </div>
            </div>

            {/* Post Actions */}
            <div className={`px-2 sm:px-6 py-2 sm:py-3 border-t flex items-center justify-around ${
              darkMode ? 'border-gray-700' : 'border-gray-100'
            }`}>
              {/* Like Button - Hidden when not authenticated */}
              {isAuthenticated && (
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                    post.isLiked
                      ? darkMode
                        ? 'text-green-400 bg-gray-700'
                        : 'text-green-600 bg-green-50'
                      : darkMode
                        ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
                  }`}
                >
                  {post.isLiked ? (
                    <HeartIconSolid className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span className="font-medium text-xs sm:text-sm hidden xs:inline">Like</span>
                </button>
              )}

              {/* Chat Button - Hidden when not authenticated */}
              {isAuthenticated && (
                <button className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}>
                  <ChatBubbleOvalLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-xs sm:text-sm hidden xs:inline">Chat</span>
                </button>
              )}

              {/* Bookmark Button - Hidden when not authenticated */}
              {isAuthenticated && (
                <button 
                  onClick={() => handleBookmark(post.id)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                    post.isBookmarked
                      ? darkMode
                        ? 'text-yellow-400 bg-gray-700'
                        : 'text-yellow-600 bg-yellow-50'
                      : darkMode
                        ? 'text-gray-400 hover:bg-gray-700 hover:text-yellow-400'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-yellow-600'
                  }`}
                >
                  {post.isBookmarked ? (
                    <BookmarkIconSolid className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <BookmarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span className="font-medium text-xs sm:text-sm hidden xs:inline">Save</span>
                </button>
              )}

              {/* Share Button - Always visible */}
              <button 
                onClick={() => handleShare(post)}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
                }`}
              >
                <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-xs sm:text-sm hidden xs:inline">
                  Share
                </span>
              </button>

              {/* Login prompt when not authenticated */}
              {!isAuthenticated && (
                <div className={`text-center py-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span className="text-sm">Login to interact with posts</span>
                </div>
              )}
            </div>
          </div>
        ))
        ) : (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="mb-4">
              <PhotoIcon className={`w-16 h-16 mx-auto ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              No Items Uploaded
            </h3>
            <p className="text-sm mb-4">
              No animal posts have been shared yet. Be the first to share an animal for sale or adoption!
            </p>
            <button 
              onClick={onCreatePost}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-300 ${
                darkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              Share Your First Animal
            </button>
          </div>
        )}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <button className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
          darkMode
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}>
          Load More Posts
        </button>
      </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        darkMode={darkMode}
      />
      
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        darkMode={darkMode}
        slug={selectedPost?.slug}
        title={selectedPost?.animalInfo?.title}
      />
    </div>
  );
};

export default NewsFeed;
