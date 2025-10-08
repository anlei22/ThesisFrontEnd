  import React, { useState, useRef } from 'react';
  import { 
    Heart, 
    MessageCircle, 
    Share, 
    Bookmark, 
    Edit, 
    QrCode, 
    Star, 
    MapPin, 
    Calendar, 
    Phone, 
    ShieldCheck,
    MoreHorizontal,
    Send,
    X,
    Minimize2,
    Maximize2,
    Camera,
    Grid,
    List,
    ArrowLeft
  } from 'lucide-react';

  const SocialProfileDesign = ({ 
    user, 
    userPosts = [], 
    reviews = [], 
    darkMode = false, 
    onEditPost,
    onDeletePost,
    onToggleLike,
    onShowQRCode,
    onEditProfile,
    onShowPhoneVerification,
    onBack // Add back navigation prop
  }) => {
    const [activeTab, setActiveTab] = useState('posts');
    const [likedPosts, setLikedPosts] = useState(new Set([1, 3]));
    const [showQRCode, setShowQRCode] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showPhoneVerification, setShowPhoneVerification] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [chatMinimized, setChatMinimized] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
      {
        id: 1,
        sender: 'user',
        message: 'Hello! I\'m interested in your livestock.',
        timestamp: '10:30 AM'
      },
      {
        id: 2,
        sender: user?.name || 'Seller',
        message: 'Hi! Thank you for your interest. What specific animals are you looking for?',
        timestamp: '10:32 AM'
      }
    ]);
    const [viewMode, setViewMode] = useState('list');
    const chatEndRef = useRef(null);

    if (!user) return null;

    // Use userPosts from props or fallback to user.userPosts
    const posts = userPosts.length > 0 ? userPosts : (user.userPosts || []);
    const userReviews = reviews.length > 0 ? reviews : (user.reviews || []);

    // Generate QR Code data URL
    const generateQRCode = () => {
      const profileUrl = `https://livestock-app.com/profile/${user.username}`;
      return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profileUrl)}`;
    };

    const toggleLike = (postId) => {
      const newLikedPosts = new Set(likedPosts);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      setLikedPosts(newLikedPosts);
      
      if (onToggleLike) {
        onToggleLike(postId, !likedPosts.has(postId));
      }
    };

    const sendMessage = () => {
      if (chatMessage.trim()) {
        const newMessage = {
          id: chatMessages.length + 1,
          sender: 'user',
          message: chatMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages([...chatMessages, newMessage]);
        setChatMessage('');
        
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    const handleChatOpen = () => {
      setShowChat(true);
      setChatMinimized(false);
    };

    const renderStars = (rating) => {
      return [...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating || 0)
              ? "text-yellow-400 fill-current"
              : darkMode
              ? "text-gray-600"
              : "text-gray-300"
          }`}
        />
      ));
    };

    const renderUserTypeBadge = (type) => {
      return (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            type === "seller"
              ? darkMode
                ? "bg-blue-600 text-blue-100"
                : "bg-blue-100 text-blue-600"
              : darkMode
              ? "bg-purple-600 text-purple-100"
              : "bg-purple-100 text-purple-600"
          }`}
        >
          {type === "seller" ? "Seller" : "Buyer"}
        </span>
      );
    };

    const handleEditPost = (postId) => {
      if (onEditPost) onEditPost(postId);
    };

    const handleDeletePost = (postId) => {
      if (onDeletePost) onDeletePost(postId);
    };

    const PostOptionsDropdown = ({ postId, onEdit, onDelete, darkMode }) => {
      const [showDropdown, setShowDropdown] = useState(false);
      
      return (
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'text-gray-500'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          
          {showDropdown && (
            <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 ${
              darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
            }`}>
              <div className="py-1">
                <button
                  onClick={() => { onEdit(postId); setShowDropdown(false); }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700'
                  }`}
                >
                  Edit Post
                </button>
                <button
                  onClick={() => { onDelete(postId); setShowDropdown(false); }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    darkMode ? 'text-red-400 hover:bg-gray-600' : 'text-red-600'
                  }`}
                >
                  Delete Post
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-green-50'
      }`}>
       <div className="max-w-3xl mx-auto px-4 lg:px-0">
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className={`mb-4 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          {/* Cover Photo */}
          <div className="relative h-48 sm:h-64 md:h-80 rounded-t-xl overflow-hidden shadow-lg">
            <img
              src={user.coverPhoto || "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=300&fit=crop"}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <button className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Profile Header */}
          <div
            className={`relative px-4 sm:px-6 pb-6 rounded-b-xl transition-colors duration-300 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            {/* Avatar */}
            <div className="flex justify-center sm:justify-start">
              <div className="relative -mt-16 md:-mt-20">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1">
                    <h1
                      className={`text-2xl sm:text-3xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {user.name}
                    </h1>
                    {user.isVerified && (
                      <ShieldCheck
                        className="w-6 h-6 text-blue-500 fill-current"
                        title="Verified Account"
                      />
                    )}
                  </div>
                  <p
                    className={`text-lg ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {user.username}
                  </p>

                  <div className="flex justify-center sm:justify-start mt-2">
                    {renderUserTypeBadge(user.userType || user.type)}
                  </div>

                  {/* Specialties */}
                  {user.specialties && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                      {user.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => {
                      setShowQRCode(true);
                      if (onShowQRCode) onShowQRCode();
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                        : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                    }`}
                  >
                    <QrCode className="w-4 h-4 inline mr-2" />
                    QR Code
                  </button>
                  <button
                    onClick={handleChatOpen}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Message
                  </button>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-4">
                <p
                  className={`text-base leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {user.bio}
                </p>
              </div>

          

              {/* Additional Info */}
              <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm">
                <div
                  className={`flex items-center space-x-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div
                  className={`flex items-center space-x-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{user.joinDate}</span>
                </div>
              
              </div>
              
              {/* Rating Section */}
              <div className="mt-6 sm:grid-cols-2 gap-4 text-center max-w-md mx-auto">
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {renderStars(user.rating)}
                  </div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {(user.rating || 0).toFixed(1)} ({user.totalReviews || 0} reviews)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            className={`mt-6 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg`}
          >
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center px-6">
                <nav className="flex space-x-8">
                  {["posts", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab
                          ? "border-green-500 text-green-600"
                          : `border-transparent ${
                              darkMode
                                ? "text-gray-400 hover:text-gray-300"
                                : "text-gray-500 hover:text-gray-700"
                            } hover:border-gray-300`
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
                
                {activeTab === 'posts' && posts.length > 0 && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${
                        viewMode === 'grid'
                          ? 'bg-green-600 text-white'
                          : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${
                        viewMode === 'list'
                          ? 'bg-green-600 text-white'
                          : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              {activeTab === "posts" && (
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-6'}`}>
                  {posts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className={`text-gray-400 mb-4`}>
                        <Edit className="w-12 h-12 mx-auto" />
                      </div>
                      <h3
                        className={`text-lg font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        No posts yet
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Start sharing your animal experiences!
                      </p>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        className={`rounded-lg border transition-all duration-300 hover:shadow-lg ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700' 
                            : 'bg-white border-green-100'
                        } ${viewMode === 'grid' ? 'overflow-hidden' : ''}`}
                      >
                        {viewMode === 'grid' ? (
                          // Grid View
                          <div>
                            {post.images && post.images[0] && (
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={post.images[0]}
                                  alt="Post"
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            <div className="p-4">
                              <p className={`text-sm mb-2 line-clamp-2 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {post.content}
                              </p>
                              <div className="flex items-center justify-between text-xs">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                  {post.likes} likes
                                </span>
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                  {post.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // List View (Full Post)
                          <div>
                            {/* Post Header */}
                            <div className="p-6 pb-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <div>
                                    <div className="flex items-center space-x-1">
                                      <h3
                                        className={`font-semibold ${
                                          darkMode ? "text-white" : "text-gray-900"
                                        }`}
                                      >
                                        {user.name}
                                      </h3>
                                      {user.isVerified && (
                                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                          <span className="text-white text-xs">✓</span>
                                        </div>
                                      )}
                                    </div>
                                    <p
                                      className={`text-sm ${
                                        darkMode ? "text-gray-400" : "text-gray-500"
                                      }`}
                                    >
                                      {post.timestamp}
                                    </p>
                                  </div>
                                </div>
                                <PostOptionsDropdown
                                  postId={post.id}
                                  onEdit={handleEditPost}
                                  onDelete={handleDeletePost}
                                  darkMode={darkMode}
                                />
                              </div>
                            </div>

                            {/* Post Content */}
                            <div className="px-6 pb-4">
                              <p
                                className={`mb-4 text-base leading-relaxed ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {post.content}
                              </p>
                              
                              {/* Animal Information Card */}
                              {post.animalInfo && (
                                <div className={`mt-4 p-4 rounded-lg border ${
                                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                                }`}>
                                  <h4 className={`font-medium mb-2 ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    Animal Details
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                      <span className="font-medium">Type:</span> {post.animalInfo.type}
                                    </div>
                                    <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                      <span className="font-medium">Breed:</span> {post.animalInfo.breed}
                                    </div>
                                    <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                      <span className="font-medium">Age:</span> {post.animalInfo.age}
                                    </div>
                                    <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                      <span className="font-medium text-green-600">Price:</span> {post.animalInfo.price}
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
                                  'grid-cols-2'
                                }`}>
                                  {post.images.map((image, index) => (
                                    <div key={index} className="relative">
                                      <img
                                        src={image}
                                        alt={`Post image ${index + 1}`}
                                        className="w-full h-48 object-cover cursor-pointer hover:opacity-95 transition-opacity duration-200"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Post Stats */}
                            <div className={`px-6 py-3 border-t flex items-center justify-between ${
                              darkMode ? 'border-gray-700' : 'border-gray-100'
                            }`}>
                              <div className="flex items-center space-x-4 text-sm">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                  {post.likes} likes
                                </span>
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                  {post.comments} comments
                                </span>
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                  {post.bookmarks} bookmarks
                                </span>
                              </div>
                            </div>

                            {/* Post Actions */}
                            <div className={`px-6 py-3 border-t flex items-center justify-around ${
                              darkMode ? 'border-gray-700' : 'border-gray-100'
                            }`}>
                              <button
                                onClick={() => toggleLike(post.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                  likedPosts.has(post.id)
                                    ? darkMode
                                      ? 'text-red-400 bg-gray-700'
                                      : 'text-red-600 bg-red-50'
                                    : darkMode
                                      ? 'text-gray-400 hover:bg-gray-700 hover:text-red-400'
                                      : 'text-gray-600 hover:bg-gray-100 hover:text-red-600'
                                }`}
                              >
                                <Heart
                                  className={`w-5 h-5 ${
                                    likedPosts.has(post.id) ? "fill-current" : ""
                                  }`}
                                />
                                <span className="font-medium text-sm">Like</span>
                              </button>

                              <button 
                                onClick={handleChatOpen}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                  darkMode
                                    ? 'text-gray-400 hover:bg-gray-700 hover:text-blue-400'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                }`}
                              >
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-medium text-sm">Chat</span>
                              </button>

                              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                darkMode
                                  ? 'text-gray-400 hover:bg-gray-700 hover:text-yellow-400'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-yellow-600'
                              }`}>
                                <Bookmark className="w-5 h-5" />
                                <span className="font-medium text-sm">Save</span>
                              </button>

                              <button 
                                onClick={() => setShowShareModal(true)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                  darkMode
                                    ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
                                }`}
                              >
                                <Share className="w-5 h-5" />
                                <span className="font-medium text-sm">Share</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {userReviews.length === 0 ? (
                    <div className="text-center py-12">
                      <div className={`text-gray-400 mb-4`}>
                        <Star className="w-12 h-12 mx-auto" />
                      </div>
                      <h3
                        className={`text-lg font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        No reviews yet
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Reviews from other users will appear here.
                      </p>
                    </div>
                  ) : (
                    userReviews.map((review) => (
                      <div
                        key={review.id}
                        className={`border rounded-lg p-6 transition-all duration-300 hover:shadow-md ${
                          darkMode
                            ? "border-gray-700 bg-gray-700/50"
                            : "border-gray-200 bg-gray-50/50"
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={review.reviewerAvatar}
                            alt={review.reviewer}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4
                                className={`font-medium ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {review.reviewer}
                              </h4>
                              <span
                                className={`text-sm ${
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {review.timestamp}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 mb-3">
                              {renderStars(review.rating)}
                              <span
                                className={`ml-2 text-sm font-medium ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {review.rating.toFixed(1)}
                              </span>
                            </div>
                            <p
                              className={`text-base leading-relaxed ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* QR Code Modal */}
          {showQRCode && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className={`max-w-sm w-full p-6 rounded-2xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="text-center">
                  <h3 className={`text-xl font-bold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Share Profile
                  </h3>
                  <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center p-2">
                    <img
                      src={generateQRCode()}
                      alt="Profile QR Code"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center" style={{display: 'none'}}>
                      <QrCode className="w-24 h-24 text-gray-400" />
                    </div>
                  </div>
                  <p className={`text-sm mb-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Scan this QR code to view {user.name}'s profile
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowQRCode(false)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                      }`}
                    >
                      Close
                    </button>
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = generateQRCode();
                        link.download = `${user.name}-profile-qr.png`;
                        link.click();
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Share Modal */}
          {showShareModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className={`max-w-sm w-full p-6 rounded-2xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="text-center">
                  <h3 className={`text-xl font-bold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Share Post
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {['Facebook', 'Twitter', 'WhatsApp'].map((platform) => (
                      <button
                        key={platform}
                        className={`p-4 rounded-lg transition-all hover:scale-105 ${
                          darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        <div className="text-2xl mb-2">
                          {platform === 'Facebook' ? '📘' : 
                          platform === 'Twitter' ? '🐦' : '💬'}
                        </div>
                        <div className="text-xs">{platform}</div>
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowShareModal(false)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                      }`}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`Check out this post from ${user.name}!`);
                        setShowShareModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Facebook-style Chat Window */}
          {showChat && (
            <div className={`fixed bottom-0 right-4 w-80 shadow-2xl border-t border-l border-r rounded-t-lg z-50 ${
              darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
            } ${chatMinimized ? 'h-12' : 'h-96'} transition-all duration-300`}>
              {/* Chat Header */}
              <div className={`flex items-center justify-between p-3 border-b ${
                darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
              } rounded-t-lg`}>
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className={`font-medium text-sm ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Online
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setChatMinimized(!chatMinimized)}
                    className={`p-1 rounded hover:bg-gray-200 ${
                      darkMode ? 'hover:bg-gray-600 text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {chatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setShowChat(false)}
                    className={`p-1 rounded hover:bg-gray-200 ${
                      darkMode ? 'hover:bg-gray-600 text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              {!chatMinimized && (
                <>
                  <div className="flex-1 p-3 overflow-y-auto max-h-72">
                    <div className="space-y-3">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div className={`max-w-xs px-3 py-2 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-green-600 text-white'
                              : darkMode
                              ? 'bg-gray-700 text-gray-200'
                              : 'bg-gray-200 text-gray-800'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 opacity-70`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className={`p-3 border-t ${
                    darkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className={`flex-1 px-3 py-2 rounded-full text-sm border ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!chatMessage.trim()}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default SocialProfileDesign;