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

const NewsFeed = ({ darkMode, onCreatePost, postCategory = 'all', postLocation = 'all', searchQuery = '' }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isAuthenticated } = useAuth();
  const [showBanner, setShowBanner] = useState(false);
  // Build API URL with query parameters
  const buildApiUrl = () => {
    let url = 'news-feed/list';
    const params = [];

    if (postCategory && postCategory !== 'all') {
      params.push(`category=${postCategory}`);
    }
    
    if (postLocation && postLocation !== 'all') {
      params.push(`location=${postLocation}`);
    }
    
    if (searchQuery && searchQuery.trim() !== '') {
      params.push(`search=${encodeURIComponent(searchQuery.trim())}`);
    }
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    return url;
  };

  // Use API connection hook with dynamic URL
  const { data: apiResponse, error, loading, refetch } = useApiConnection(buildApiUrl());

  // Refetch when filters change
   useEffect(() => {
    if (postCategory !== "all" || postLocation !== "all" || searchQuery) {
      setShowBanner(true);

      // Hide after 5 seconds
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 5000);

      // Cleanup when dependencies change
      return () => clearTimeout(timer);
    }
  }, [postCategory, postLocation, searchQuery]);

  // Format timestamp helper function
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Client-side filtering function (backup if API doesn't support filtering)
  const applyClientSideFilters = (postsArray) => {
    let filtered = [...postsArray];

    // Filter by category
    if (postCategory && postCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.animalInfo?.type?.toLowerCase() === postCategory.toLowerCase()
      );
    }

    // Filter by location
    if (postLocation && postLocation !== 'all') {
      filtered = filtered.filter(post => 
        post.user?.location?.toLowerCase().includes(postLocation.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(post => 
        post.animalInfo?.title?.toLowerCase().includes(query) ||
        post.animalInfo?.description?.toLowerCase().includes(query) ||
        post.animalInfo?.breed?.toLowerCase().includes(query) ||
        post.user?.name?.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Handle API response
// Handle API response
  useEffect(() => {
    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }
    
    if (apiResponse) {
      console.log('📥 API Response:', apiResponse);
      
      let postsData = [];
      
      // Handle the nested structure from getNewsFeedList API
      if (apiResponse.status === 'success' && apiResponse.NewFeed) {
        // Flatten the nested animal_feeds from each animal type
        postsData = apiResponse.NewFeed.flatMap(animalType => 
          (animalType.animal_feeds || []).map(feed => ({
            ...feed,
            animal_type: { name: animalType.name, id: animalType.id }
          }))
        );
      } else if (apiResponse.status === 'success' && apiResponse.data) {
        postsData = apiResponse.data;
      } else if (Array.isArray(apiResponse)) {
        postsData = apiResponse;
      } else if (apiResponse.data && Array.isArray(apiResponse.data)) {
        postsData = apiResponse.data;
      }
      
      if (Array.isArray(postsData) && postsData.length > 0) {
        const transformedPosts = postsData.map(post => ({
          id: post.id,
          user: {
            name: `${post.creator?.FirstName || 'Unknown'} ${post.creator?.LastName || 'User'}`,
            avatar: post.creator?.profile_picture || `https://ui-avatars.com/api/?name=${post.creator?.FirstName || 'U'}+${post.creator?.LastName || 'U'}&background=10b981&color=fff`,
            isVerified: false,
            username: post.creator?.username || 'unknown',
            location: post.location || post.creator?.location || ''
          },
          timestamp: formatTimestamp(post.created_at),
          content: post.description || '',
          animalInfo: {
            type: post.animal_type?.name || 'Unknown',
            title: post.title || 'Untitled',
            description: post.description || '',
            breed: post.breed || 'N/A',
            age: post.age ? `${post.age} years old` : 'Age not specified',
            sex: post.sex || 'N/A',
            price: post.price === "0" ? "Free" : `₱${parseFloat(post.price || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            availability: post.status || 'available'
          },
          images: Array.isArray(post.images) ? post.images.map(img => img.image_path || img) : [],
          likes: post.likes || 0,
          comments: 0,
          bookmarks: post.bookmarks || 0,
          isLiked: false, 
          isBookmarked: false,
          slug: post.slug || ''
        }));
        
        setPosts(transformedPosts);
        
        // Apply client-side filters as backup
        const filtered = applyClientSideFilters(transformedPosts);
        setFilteredPosts(filtered);
      } else {
        setPosts([]);
        setFilteredPosts([]);
      }
    }
  }, [apiResponse, error, loading]);

  // Re-apply filters when filter values change
  useEffect(() => {
    if (posts.length > 0) {
      const filtered = applyClientSideFilters(posts);
      setFilteredPosts(filtered);
    }
  }, [postCategory, postLocation, searchQuery, posts]);

  const handleLike = (postId) => {
    const updatePosts = (postsArray) => 
      postsArray.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      );
    
    setPosts(updatePosts);
    setFilteredPosts(updatePosts);
  };

  const handleBookmark = (postId) => {
    const updatePosts = (postsArray) =>
      postsArray.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isBookmarked: !post.isBookmarked,
              bookmarks: post.isBookmarked ? post.bookmarks - 1 : post.bookmarks + 1
            }
          : post
      );
    
    setPosts(updatePosts);
    setFilteredPosts(updatePosts);
  };

  const handleShare = (post = null) => {
    if (post) {
      setSelectedPost(post);
      setShowShareModal(true);
    } else {
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

  // Use filteredPosts instead of posts for rendering
  const displayPosts = filteredPosts;

  return (
    <div className="w-full h-[680px] py-4 sm:py-6 flex justify-center">
      <div className="w-full max-w-2xl px-2 sm:px-0 flex flex-col h-full">
        
        {/* Filter Info Banner */}
         {showBanner && (
        <div
          className={`rounded-lg p-3 mb-4 border transition-opacity duration-500 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-gray-300"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm">
              Showing filtered results
              {postCategory !== "all" && ` • ${postCategory}`}
              {postLocation !== "all" && ` • ${postLocation}`}
              {searchQuery && ` • "${searchQuery}"`}
            </span>
            <span className="text-sm font-semibold">
              {displayPosts.length} {displayPosts.length === 1 ? "post" : "posts"}
            </span>
          </div>
        </div>
      )}

        {/* Create Post Card - Fixed */}
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

        {/* Scrollable Posts Container */}
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden space-y-4 sm:space-y-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayPosts.length > 0 ? (
            <>
              {displayPosts.map((post) => (
                <div key={post.id} className={`rounded-lg border transition-colors duration-300 relative overflow-hidden ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-green-100'
                }`}>
                  {/* Diagonal Ribbon */}
                  {post.animalInfo && (
                    <div className="absolute top-0 right-0 w-32 h-35 overflow-hidden z-10">
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
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-1">
                              <h3 className={`font-semibold ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {post.user.name}
                              </h3>
                              {post.user.isVerified && (
                                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                            </div>
                            <p className={`text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {post.timestamp}
                            </p>
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
                          <span className={`text-lg font-bold ${
                            darkMode ? 'text-green-400' : 'text-green-600'
                          }`}>{post.animalInfo.price}</span>
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

                    <button 
                      onClick={() => handleShare(post)}
                      className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                        darkMode
                          ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
                      }`}
                    >
                      <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-medium text-xs sm:text-sm hidden xs:inline">Share</span>
                    </button>

                    {!isAuthenticated && (
                      <div className={`text-center py-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <span className="text-sm">Login to interact with posts</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Load More - Inside scroll */}
              <div className="text-center py-8">
                <button className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  darkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}>
                  Load More Posts
                </button>
              </div>
            </>
          ) : (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="mb-4">
                <PhotoIcon className={`w-16 h-16 mx-auto ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                No Posts Found
              </h3>
              <p className="text-sm mb-4">
                {(postCategory !== 'all' || postLocation !== 'all' || searchQuery) 
                  ? 'No posts match your filter criteria. Try adjusting your filters.'
                  : 'No animal posts have been shared yet. Be the first to share!'}
              </p>
              {(postCategory === 'all' && postLocation === 'all' && !searchQuery) && (
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
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        darkMode={darkMode}
      />
      
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