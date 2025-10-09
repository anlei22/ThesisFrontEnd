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
  MapPinIcon,
  EllipsisVerticalIcon, 
  FlagIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

// Mock components - replace with your actual imports
const useAuth = () => ({ isAuthenticated: true });
const LoginModal = ({ isOpen, onClose, darkMode }) => null;
const ShareModal = ({ isOpen, onClose, darkMode, slug, title }) => null;
const useApiConnection = (url) => ({ 
  data: { status: 'success', NewFeed: [] }, 
  error: null, 
  loading: false, 
  refetch: () => {} 
});

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

const NewsFeed = ({ darkMode = false, onCreatePost = () => {}, postCategory = 'all', postLocation = 'all', searchQuery = '' }) => {
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
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportComment, setReportComment] = useState('');

  // Sample data
  const samplePosts = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=10b981&color=fff',
        isVerified: true,
        username: 'johndoe',
        location: 'Manila, Philippines'
      },
      timestamp: '2h ago',
      content: 'Beautiful Golden Retriever looking for a loving home!',
      animalInfo: {
        type: 'Dog',
        title: 'Golden Retriever Puppy',
        description: 'Friendly and well-trained golden retriever puppy. Great with kids!',
        breed: 'Golden Retriever',
        age: '6 months old',
        sex: 'Male',
        price: '₱15,000.00',
        availability: 'available'
      },
      images: [
        'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800',
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'
      ],
      likes: 45,
      comments: 12,
      bookmarks: 8,
      isLiked: false,
      isBookmarked: false,
      slug: 'golden-retriever-puppy-1'
    }
  ];

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
      replies: []
    }
  ];

  const reportReasons = [
    'Spam or misleading',
    'Inappropriate content',
    'Animal abuse or neglect',
    'Fraudulent listing',
    'Harassment or hate speech',
    'False information',
    'Other'
  ];

  useEffect(() => {
    setPosts(samplePosts);
    setFilteredPosts(samplePosts);
  }, []);

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
      onCreatePost();
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
    setShowReportMenu(false);
  };

  const handleReportSubmit = () => {
    if (!reportReason) {
      alert('Please select a reason for reporting');
      return;
    }
    
    console.log('Report submitted:', {
      postId: selectedPost?.id,
      reason: reportReason,
      comment: reportComment
    });
    
    alert('Thank you for your report. We will review it shortly.');
    
    setShowReportModal(false);
    setShowReportMenu(false);
    setReportReason('');
    setReportComment('');
  };

  return (
    <div className="w-full min-h-screen py-6 flex justify-center">
      <div className="w-full max-w-2xl px-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className={`rounded-lg border mb-6 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={() => openPostModal(post)}
                />
                <div className="flex-1">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {post.user.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {post.timestamp}
                  </p>
                </div>
              </div>

              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {post.animalInfo.title}
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {post.animalInfo.description}
              </p>

              {post.images.length > 0 && (
                <div className="mb-4 cursor-pointer" onClick={() => openPostModal(post)}>
                  <img
                    src={post.images[0]}
                    alt={post.animalInfo.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 ${
                    post.isLiked ? 'text-green-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {post.isLiked ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                  <span>{post.likes}</span>
                </button>
                <button
                  onClick={() => handleBookmark(post.id)}
                  className={`flex items-center space-x-2 ${
                    post.isBookmarked ? 'text-yellow-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {post.isBookmarked ? <BookmarkIconSolid className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
                  <span>{post.bookmarks}</span>
                </button>
                <button
                  onClick={() => handleShare(post)}
                  className={darkMode ? 'text-gray-400' : 'text-gray-600'}
                >
                  <ShareIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
              onClick={closeModal} 
            />
            
            <div className={`relative rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Modal Header with Report Menu */}
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
                
                <div className="flex items-center space-x-2">
                  {/* Report Menu Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowReportMenu(!showReportMenu)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode 
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <EllipsisVerticalIcon className="w-6 h-6" />
                    </button>

                    {/* Dropdown Menu */}
                    {showReportMenu && (
                      <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                        darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
                      }`}>
                        <button
                          onClick={() => {
                            setShowReportModal(true);
                            setShowReportMenu(false);
                          }}
                          className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors ${
                            darkMode 
                              ? 'text-gray-300 hover:bg-gray-600' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <FlagIcon className="w-5 h-5 text-red-500" />
                          <span>Report Post</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Close Button */}
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
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
                <div className="space-y-4">
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedPost.animalInfo.description}
                  </p>
                  
                  {selectedPost.images.length > 0 && (
                    <img
                      src={selectedPost.images[currentImageIndex]}
                      alt={selectedPost.animalInfo.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  )}

                  <div className={`grid grid-cols-2 gap-4 p-4 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Breed</p>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedPost.animalInfo.breed}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Age</p>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedPost.animalInfo.age}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sex</p>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedPost.animalInfo.sex}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Price</p>
                      <p className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        {selectedPost.animalInfo.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Post Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" 
              onClick={() => {
                setShowReportModal(false);
                setReportReason('');
                setReportComment('');
              }} 
            />
            
            <div className={`relative rounded-2xl shadow-xl max-w-md w-full ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-6 border-b ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <FlagIcon className="w-6 h-6 text-red-500" />
                  <h3 className={`text-xl font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Report Post
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    setReportReason('');
                    setReportComment('');
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Help us understand what's wrong with this post. Your report will be reviewed by our team.
                </p>

                {/* Reason Selection */}
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Reason for reporting <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {reportReasons.map((reason) => (
                      <label
                        key={reason}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                          reportReason === reason
                            ? darkMode
                              ? 'bg-red-900 bg-opacity-30 border-2 border-red-500'
                              : 'bg-red-50 border-2 border-red-500'
                            : darkMode
                              ? 'bg-gray-700 hover:bg-gray-600 border-2 border-gray-600'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reportReason"
                          value={reason}
                          checked={reportReason === reason}
                          onChange={(e) => setReportReason(e.target.value)}
                          className="mr-3 text-red-500 focus:ring-red-500"
                        />
                        <span className={`text-sm ${
                          darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {reason}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Comments */}
                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Additional details (optional)
                  </label>
                  <textarea
                    value={reportComment}
                    onChange={(e) => setReportComment(e.target.value)}
                    placeholder="Provide any additional information that might help us understand the issue..."
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      darkMode
                        ? 'bg-gray-700 text-white placeholder-gray-400 border border-gray-600'
                        : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300'
                    }`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowReportModal(false);
                      setReportReason('');
                      setReportComment('');
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportSubmit}
                    disabled={!reportReason}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      reportReason
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : darkMode
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Report Post
                  </button>
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