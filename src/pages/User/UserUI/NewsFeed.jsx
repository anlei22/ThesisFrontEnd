
import React, { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  ChatBubbleOvalLeftIcon, 
  BookmarkIcon,
  EllipsisHorizontalIcon,
  PhotoIcon,
  ShareIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../../../context/AuthContext';
import LoginModal from '../../../components/LoginModal';
import ShareModal from '../../../components/ShareModal';
import useApiConnection from '../../../context/ApiConnection';

// Comment Input Component
const PostCommentInput = ({ postId, darkMode, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onAddComment(postId, text);
    setText('');
  };

  return (
    <div className={`flex space-x-2 p-2 rounded-lg ${
      darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        darkMode ? 'bg-green-600' : 'bg-green-500'
      }`}>
        <span className="text-white font-semibold text-xs">U</span>
      </div>
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          rows="2"
          className={`w-full px-3 py-2 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
            darkMode
              ? 'bg-gray-600 text-white placeholder-gray-400'
              : 'bg-gray-50 text-gray-900 placeholder-gray-500'
          }`}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              text.trim()
                ? darkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
                : darkMode
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

// Comment Item Component
const PostCommentItem = ({ comment, postId, darkMode, onLike, onReplyLike, onAddReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = () => {
    onAddReply(postId, comment.id, replyText);
    setReplyText('');
    setShowReplyInput(false);
  };

  return (
    <div>
      {/* Main Comment */}
      <div className={`flex space-x-2 p-2 rounded-lg ${
        darkMode ? 'bg-gray-700' : 'bg-white'
      }`}>
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h4 className={`font-semibold text-xs ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {comment.user.name}
              </h4>
              <p className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {comment.timestamp}
              </p>
            </div>
          </div>
          <p className={`text-xs mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {comment.text}
          </p>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onLike(postId, comment.id)}
              className={`flex items-center space-x-1 text-xs transition-colors ${
                darkMode
                  ? 'text-gray-400 hover:text-green-400'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <HeartIcon className="w-3 h-3" />
              <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
            </button>
            <button 
              onClick={() => setShowReplyInput(!showReplyInput)}
              className={`text-xs transition-colors ${
                darkMode
                  ? 'text-gray-400 hover:text-green-400'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Reply
            </button>
            {comment.replies && comment.replies.length > 0 && (
              <span className={`text-xs ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reply Input */}
      {showReplyInput && (
        <div className={`ml-10 mt-2 p-2 rounded-lg ${
          darkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="flex space-x-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              darkMode ? 'bg-green-600' : 'bg-green-500'
            }`}>
              <span className="text-white font-semibold text-xs">U</span>
            </div>
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.user.name}...`}
                rows="2"
                autoFocus
                className={`w-full px-2 py-1.5 rounded-lg resize-none text-xs focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  darkMode
                    ? 'bg-gray-600 text-white placeholder-gray-400'
                    : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200'
                }`}
              />
              <div className="flex justify-end space-x-2 mt-1">
                <button
                  onClick={() => setShowReplyInput(false)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    darkMode
                      ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim()}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    replyText.trim()
                      ? darkMode
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                      : darkMode
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Replies List */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <div key={reply.id} className={`flex space-x-2 p-2 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <img
                src={reply.user.avatar}
                alt={reply.user.name}
                className="w-6 h-6 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h4 className={`font-semibold text-xs ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {reply.user.name}
                    </h4>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {reply.timestamp}
                    </p>
                  </div>
                </div>
                <p className={`text-xs mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {reply.text}
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onReplyLike(postId, comment.id, reply.id)}
                    className={`flex items-center space-x-1 text-xs transition-colors ${
                      darkMode
                        ? 'text-gray-400 hover:text-green-400'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    <HeartIcon className="w-3 h-3" />
                    <span>{reply.likes > 0 ? reply.likes : 'Like'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NewsFeed = ({ darkMode, onCreatePost, postCategory = 'all', postLocation = 'all', searchQuery = '' }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isAuthenticated } = useAuth();
  const [showBanner, setShowBanner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showCommentsForPost, setShowCommentsForPost] = useState(null);
  const [postComments, setPostComments] = useState({});

  // Sample comments data
  const sampleComments = [
    {
      id: 1,
      user: {
        name: 'Maria Santos',
        avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=10b981&color=fff'
      },
      text: 'What a beautiful animal! Is it still available?',
      timestamp: '2h ago',
      likes: 5,
      replies: [
        {
          id: 101,
          user: {
            name: 'Pedro Garcia',
            avatar: 'https://ui-avatars.com/api/?name=Pedro+Garcia&background=f59e0b&color=fff'
          },
          text: 'I was wondering the same thing!',
          timestamp: '1h ago',
          likes: 2
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Juan Dela Cruz',
        avatar: 'https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=3b82f6&color=fff'
      },
      text: 'Very healthy looking! How old is it?',
      timestamp: '5h ago',
      likes: 3,
      replies: []
    },
    {
      id: 3,
      user: {
        name: 'Anna Reyes',
        avatar: 'https://ui-avatars.com/api/?name=Anna+Reyes&background=ec4899&color=fff'
      },
      text: 'Interested! Can you provide more details about the vaccination records?',
      timestamp: '1d ago',
      likes: 8,
      replies: []
    }
  ];

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

 
  useEffect(() => {
    if (postCategory !== "all" || postLocation !== "all" || searchQuery) {
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowBanner(false);
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

  const openPostModal = (post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
    setComments(sampleComments);
    setCommentText('');
    setReplyingTo(null);
    setReplyText('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setCurrentImageIndex(0);
    setComments([]);
    setCommentText('');
    setReplyingTo(null);
    setReplyText('');
  };

  const handleAddComment = () => {
    if (commentText.trim() === '') return;
    
    const newComment = {
      id: comments.length + 1,
      user: {
        name: 'You',
        avatar: 'https://ui-avatars.com/api/?name=You&background=10b981&color=fff'
      },
      text: commentText,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleReplyLike = (commentId, replyId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply =>
            reply.id === replyId
              ? { ...reply, likes: reply.likes + 1 }
              : reply
          )
        };
      }
      return comment;
    }));
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim() === '') return;
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newReply = {
          id: Date.now(),
          user: {
            name: 'You',
            avatar: 'https://ui-avatars.com/api/?name=You&background=10b981&color=fff'
          },
          text: replyText,
          timestamp: 'Just now',
          likes: 0
        };
        
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    }));
    
    setReplyText('');
    setReplyingTo(null);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText('');
  };

  const toggleCommentsSection = (postId) => {
    if (showCommentsForPost === postId) {
      setShowCommentsForPost(null);
    } else {
      setShowCommentsForPost(postId);
      // Initialize comments for this post if not exists
      if (!postComments[postId]) {
        setPostComments(prev => ({
          ...prev,
          [postId]: sampleComments
        }));
      }
    }
  };

  const handleAddPostComment = (postId, text) => {
    if (!text.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: {
        name: 'You',
        avatar: 'https://ui-avatars.com/api/?name=You&background=10b981&color=fff'
      },
      text: text,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };
    
    setPostComments(prev => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])]
    }));
  };

  const handlePostCommentLike = (postId, commentId) => {
    setPostComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    }));
  };

  const handlePostReplyLike = (postId, commentId, replyId) => {
    setPostComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          };
        }
        return comment;
      })
    }));
  };

  const handleAddPostReply = (postId, commentId, text) => {
    if (!text.trim()) return;
    
    setPostComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment => {
        if (comment.id === commentId) {
          const newReply = {
            id: Date.now(),
            user: {
              name: 'You',
              avatar: 'https://ui-avatars.com/api/?name=You&background=10b981&color=fff'
            },
            text: text,
            timestamp: 'Just now',
            likes: 0
          };
          
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      })
    }));
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
                      <div 
                        onClick={() => openPostModal(post)}
                        className={`grid gap-2 rounded-lg overflow-hidden cursor-pointer hover:opacity-95 transition-opacity ${
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
                              className="w-full h-full object-cover"
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
                    {isAuthenticated ? (
                      <>
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

                        <button 
                          onClick={() => toggleCommentsSection(post.id)}
                          className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                            showCommentsForPost === post.id
                              ? darkMode
                                ? 'text-blue-400 bg-gray-700'
                                : 'text-blue-600 bg-blue-50'
                              : darkMode
                                ? 'text-gray-400 hover:bg-gray-700 hover:text-blue-400'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                          }`}
                        >
                          <ChatBubbleOvalLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="font-medium text-xs sm:text-sm hidden xs:inline">
                            {showCommentsForPost === post.id ? 'Hide' : 'Comment'}
                          </span>
                        </button>

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
                      </>
                    ) : (
                      <div className={`text-center py-2 w-full ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <span className="text-sm">Login to interact with posts</span>
                      </div>
                    )}
                  </div>

                  {/* Comments Section for Post */}
                  {showCommentsForPost === post.id && isAuthenticated && (
                    <div className={`px-6 py-4 border-t ${
                      darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-100 bg-gray-50'
                    }`}>
                      <h4 className={`text-sm font-semibold mb-3 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Comments ({postComments[post.id]?.length || 0})
                      </h4>

                      {/* Add Comment Input */}
                      <div className="mb-4">
                        <PostCommentInput 
                          postId={post.id}
                          darkMode={darkMode}
                          onAddComment={handleAddPostComment}
                        />
                      </div>

                      {/* Comments List */}
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {postComments[post.id] && postComments[post.id].length > 0 ? (
                          postComments[post.id].map((comment) => (
                            <PostCommentItem
                              key={comment.id}
                              comment={comment}
                              postId={post.id}
                              darkMode={darkMode}
                              onLike={handlePostCommentLike}
                              onReplyLike={handlePostReplyLike}
                              onAddReply={handleAddPostReply}
                            />
                          ))
                        ) : (
                          <div className={`text-center py-6 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            <ChatBubbleOvalLeftIcon className={`w-10 h-10 mx-auto mb-2 ${
                              darkMode ? 'text-gray-600' : 'text-gray-300'
                            }`} />
                            <p className="text-sm">No comments yet. Be the first to comment!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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

      {/* Post Detail Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" 
              onClick={closeModal} 
            />
            
            <div className={`relative rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-6 border-b ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedPost.user.avatar}
                    alt={selectedPost.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className={`text-xl font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedPost.animalInfo.title}
                    </h2>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        by {selectedPost.user.name}
                      </p>
                      <span className={darkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {selectedPost.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={closeModal}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="p-6">
                  {/* Image Gallery */}
                  {selectedPost.images && selectedPost.images.length > 0 && (
                    <div className="relative mb-6">
                      <img
                        src={selectedPost.images[currentImageIndex]}
                        alt={selectedPost.animalInfo.title}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                      
                      {selectedPost.images.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === 0 ? selectedPost.images.length - 1 : prev - 1
                            )}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all ${
                              darkMode 
                                ? 'bg-gray-700 bg-opacity-80 hover:bg-opacity-100 text-white' 
                                : 'bg-white bg-opacity-80 hover:bg-opacity-100'
                            }`}
                          >
                            <ChevronLeftIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === selectedPost.images.length - 1 ? 0 : prev + 1
                            )}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all ${
                              darkMode 
                                ? 'bg-gray-700 bg-opacity-80 hover:bg-opacity-100 text-white' 
                                : 'bg-white bg-opacity-80 hover:bg-opacity-100'
                            }`}
                          >
                            <ChevronRightIcon className="w-5 h-5" />
                          </button>
                          
                          {/* Image indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {selectedPost.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  index === currentImageIndex 
                                    ? 'bg-white' 
                                    : 'bg-white bg-opacity-50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Thumbnails */}
                  {selectedPost.images && selectedPost.images.length > 1 && (
                    <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
                      {selectedPost.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex 
                              ? darkMode
                                ? 'border-green-500 ring-2 ring-green-400' 
                                : 'border-green-500 ring-2 ring-green-200'
                              : darkMode
                                ? 'border-gray-600 hover:border-gray-500'
                                : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src={image} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-medium mb-3 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Description
                    </h3>
                    <p className={`leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {selectedPost.animalInfo.description}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    {/* Left Column */}
                    <div className="space-y-5">
                      {/* Animal Type */}
                      <div>
                        <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Animal Type
                        </h4>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                            darkMode
                              ? 'bg-green-900 text-green-200'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {selectedPost.animalInfo.type}
                        </span>
                      </div>

                      {/* Age & Sex */}
                      <div>
                        <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Age & Sex
                        </h4>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                          {selectedPost.animalInfo.age} • {selectedPost.animalInfo.sex}
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Status
                        </h4>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                            selectedPost.animalInfo.availability === 'available'
                              ? darkMode
                                ? 'bg-green-900 text-green-200'
                                : 'bg-green-100 text-green-800'
                              : darkMode
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {selectedPost.animalInfo.availability}
                        </span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                      {/* Breed */}
                      <div>
                        <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Breed
                        </h4>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                          {selectedPost.animalInfo.breed}
                        </p>
                      </div>

                      {/* Location */}
                      <div>
                        <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Location
                        </h4>
                        <div className="flex items-start space-x-2">
                          <MapPinIcon
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          />
                          <span
                            className={`text-sm leading-relaxed ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {selectedPost.user.location || 'Location not specified'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Price
                        </h4>
                        <p className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                          {selectedPost.animalInfo.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Interaction Stats */}
                  <div className={`flex items-center justify-between p-4 rounded-lg mb-6 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {selectedPost.likes}
                        </p>
                        <p className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Likes
                        </p>
                      </div>
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {selectedPost.bookmarks}
                        </p>
                        <p className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Bookmarks
                        </p>
                      </div>
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {comments.length}
                        </p>
                        <p className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Comments
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex items-center justify-around p-3 rounded-lg mb-6 border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <button
                      onClick={() => handleLike(selectedPost.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        selectedPost.isLiked
                          ? darkMode
                            ? 'text-green-400 bg-gray-600'
                            : 'text-green-600 bg-green-100'
                          : darkMode
                            ? 'text-gray-300 hover:bg-gray-600 hover:text-green-400'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                      }`}
                    >
                      {selectedPost.isLiked ? (
                        <HeartIconSolid className="w-5 h-5" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span className="font-medium">Like</span>
                    </button>

                    <button
                      onClick={() => handleBookmark(selectedPost.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        selectedPost.isBookmarked
                          ? darkMode
                            ? 'text-yellow-400 bg-gray-600'
                            : 'text-yellow-600 bg-yellow-100'
                          : darkMode
                            ? 'text-gray-300 hover:bg-gray-600 hover:text-yellow-400'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-yellow-600'
                      }`}
                    >
                      {selectedPost.isBookmarked ? (
                        <BookmarkIconSolid className="w-5 h-5" />
                      ) : (
                        <BookmarkIcon className="w-5 h-5" />
                      )}
                      <span className="font-medium">Save</span>
                    </button>

                    <button
                      onClick={() => {
                        closeModal();
                        handleShare(selectedPost);
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        darkMode
                          ? 'text-gray-300 hover:bg-gray-600 hover:text-green-400'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                      }`}
                    >
                      <ShareIcon className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className={`border-t pt-4 ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Comments ({comments.length})
                    </h3>

                    {/* Add Comment */}
                    {isAuthenticated && (
                      <div className="mb-6">
                        <div className={`flex space-x-3 p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            darkMode ? 'bg-green-600' : 'bg-green-500'
                          }`}>
                            <span className="text-white font-semibold">U</span>
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Write a comment..."
                              rows="3"
                              className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                darkMode
                                  ? 'bg-gray-600 text-white placeholder-gray-400'
                                  : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200'
                              }`}
                            />
                            <div className="flex justify-end mt-2">
                              <button
                                onClick={handleAddComment}
                                disabled={!commentText.trim()}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                  commentText.trim()
                                    ? darkMode
                                      ? 'bg-green-600 hover:bg-green-700 text-white'
                                      : 'bg-green-500 hover:bg-green-600 text-white'
                                    : darkMode
                                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                Post Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <div key={comment.id}>
                            {/* Main Comment */}
                            <div className={`flex space-x-3 p-3 rounded-lg ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-50'
                            }`}>
                              <img
                                src={comment.user.avatar}
                                alt={comment.user.name}
                                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <div>
                                    <h4 className={`font-semibold text-sm ${
                                      darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                      {comment.user.name}
                                    </h4>
                                    <p className={`text-xs ${
                                      darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                      {comment.timestamp}
                                    </p>
                                  </div>
                                </div>
                                <p className={`text-sm mb-2 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                  {comment.text}
                                </p>
                                <div className="flex items-center space-x-4">
                                  <button
                                    onClick={() => handleCommentLike(comment.id)}
                                    className={`flex items-center space-x-1 text-xs transition-colors ${
                                      darkMode
                                        ? 'text-gray-400 hover:text-green-400'
                                        : 'text-gray-600 hover:text-green-600'
                                    }`}
                                  >
                                    <HeartIcon className="w-4 h-4" />
                                    <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
                                  </button>
                                  <button 
                                    onClick={() => setReplyingTo(comment.id)}
                                    className={`text-xs transition-colors ${
                                      darkMode
                                        ? 'text-gray-400 hover:text-green-400'
                                        : 'text-gray-600 hover:text-green-600'
                                    }`}
                                  >
                                    Reply
                                  </button>
                                  {comment.replies && comment.replies.length > 0 && (
                                    <span className={`text-xs ${
                                      darkMode ? 'text-gray-500' : 'text-gray-400'
                                    }`}>
                                      {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Reply Input */}
                            {replyingTo === comment.id && isAuthenticated && (
                              <div className={`ml-12 mt-2 p-3 rounded-lg ${
                                darkMode ? 'bg-gray-700' : 'bg-gray-50'
                              }`}>
                                <div className="flex space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    darkMode ? 'bg-green-600' : 'bg-green-500'
                                  }`}>
                                    <span className="text-white font-semibold text-xs">U</span>
                                  </div>
                                  <div className="flex-1">
                                    <textarea
                                      value={replyText}
                                      onChange={(e) => setReplyText(e.target.value)}
                                      placeholder={`Reply to ${comment.user.name}...`}
                                      rows="2"
                                      autoFocus
                                      className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                        darkMode
                                          ? 'bg-gray-600 text-white placeholder-gray-400'
                                          : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200'
                                      }`}
                                    />
                                    <div className="flex justify-end space-x-2 mt-2">
                                      <button
                                        onClick={handleCancelReply}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                          darkMode
                                            ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                        }`}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={() => handleAddReply(comment.id)}
                                        disabled={!replyText.trim()}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                          replyText.trim()
                                            ? darkMode
                                              ? 'bg-green-600 hover:bg-green-700 text-white'
                                              : 'bg-green-500 hover:bg-green-600 text-white'
                                            : darkMode
                                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                      >
                                        Reply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Replies List */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-12 mt-2 space-y-2">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className={`flex space-x-3 p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                  }`}>
                                    <img
                                      src={reply.user.avatar}
                                      alt={reply.user.name}
                                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <div>
                                          <h4 className={`font-semibold text-sm ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                          }`}>
                                            {reply.user.name}
                                          </h4>
                                          <p className={`text-xs ${
                                            darkMode ? 'text-gray-400' : 'text-gray-500'
                                          }`}>
                                            {reply.timestamp}
                                          </p>
                                        </div>
                                      </div>
                                      <p className={`text-sm mb-2 ${
                                        darkMode ? 'text-gray-300' : 'text-gray-700'
                                      }`}>
                                        {reply.text}
                                      </p>
                                      <div className="flex items-center space-x-4">
                                        <button
                                          onClick={() => handleReplyLike(comment.id, reply.id)}
                                          className={`flex items-center space-x-1 text-xs transition-colors ${
                                            darkMode
                                              ? 'text-gray-400 hover:text-green-400'
                                              : 'text-gray-600 hover:text-green-600'
                                          }`}
                                        >
                                          <HeartIcon className="w-3 h-3" />
                                          <span>{reply.likes > 0 ? reply.likes : 'Like'}</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className={`text-center py-8 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <ChatBubbleOvalLeftIcon className={`w-12 h-12 mx-auto mb-2 ${
                            darkMode ? 'text-gray-600' : 'text-gray-300'
                          }`} />
                          <p>No comments yet. Be the first to comment!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;