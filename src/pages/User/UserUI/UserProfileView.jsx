import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  QrCode, 
  Star, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  MoreHorizontal,
  Send,
  X,
  Camera,
  Grid,
  List,
  ArrowLeft,
  Users,
  UserPlus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SocialProfileDesign = ({ 
  user, 
  userPosts = [], 
  reviews = [], 
  darkMode = false, 
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [likedPosts, setLikedPosts] = useState(new Set([1]));
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set([2]));
  const [showQRCode, setShowQRCode] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
      sender: 'other',
      message: 'Hi! Thank you for your interest. What specific animals are you looking for?',
      timestamp: '10:32 AM'
    }
  ]);
  const [viewMode, setViewMode] = useState('grid');
  const chatEndRef = useRef(null);

  // Sample data if no user is provided
  const defaultUser = {
    name: 'Juan Dela Cruz',
    username: '@juandelacruz',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop',
    bio: 'Professional livestock farmer specializing in cattle and poultry. Providing high-quality animals to farmers across the region.',
    location: 'Nueva Ecija, Philippines',
    joinDate: 'Joined March 2023',
    rating: 4.8,
    totalReviews: 127,
    followers: 1234,
    following: 567,
    isVerified: true,
    userType: 'seller',
    specialties: ['Cattle', 'Poultry', 'Goats']
  };

  const samplePosts = [
    {
      id: 1,
      content: 'Beautiful healthy cattle ready for sale! These are well-maintained and vaccinated.',
      images: [
        'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop'
      ],
      likes: 145,
      comments: 23,
      bookmarks: 45,
      timestamp: '2 hours ago',
      animalInfo: {
        title: 'Premium Cattle',
        type: 'Cattle',
        breed: 'Brahman',
        age: '2 years',
        price: '₱85,000',
        availability: 'available'
      }
    },
    {
      id: 2,
      content: 'High-quality free-range chickens. Perfect for egg production and meat.',
      images: [
        'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=600&fit=crop'
      ],
      likes: 89,
      comments: 15,
      bookmarks: 28,
      timestamp: '5 hours ago',
      animalInfo: {
        title: 'Free-Range Chickens',
        type: 'Poultry',
        breed: 'Rhode Island Red',
        age: '6 months',
        price: '₱350 each',
        availability: 'available'
      }
    },
    {
      id: 3,
      content: 'Young goats available! Great for breeding or meat production.',
      images: [
        'https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'
      ],
      likes: 67,
      comments: 12,
      bookmarks: 19,
      timestamp: '1 day ago',
      animalInfo: {
        title: 'Young Goats',
        type: 'Goats',
        breed: 'Boer',
        age: '8 months',
        price: '₱12,000',
        availability: 'sold'
      }
    }
  ];

  const sampleReviews = [
    {
      id: 1,
      reviewer: 'Maria Santos',
      reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      comment: 'Excellent service! The cattle I purchased were healthy and well-maintained. Juan is very professional and knowledgeable.',
      timestamp: '1 week ago'
    },
    {
      id: 2,
      reviewer: 'Pedro Reyes',
      reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4.5,
      comment: 'Great experience buying chickens from Juan. They are healthy and productive. Highly recommended!',
      timestamp: '2 weeks ago'
    }
  ];

  const currentUser = user || defaultUser;
  const posts = userPosts.length > 0 ? userPosts : samplePosts;
  const userReviews = reviews.length > 0 ? reviews : sampleReviews;

  useEffect(() => {
    if (showMessageModal) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, showMessageModal]);

  const generateQRCode = () => {
    const profileUrl = `https://livestock-app.com/profile/${currentUser.username}`;
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
  };

  const toggleBookmark = (postId) => {
    const newBookmarkedPosts = new Set(bookmarkedPosts);
    if (newBookmarkedPosts.has(postId)) {
      newBookmarkedPosts.delete(postId);
    } else {
      newBookmarkedPosts.add(postId);
    }
    setBookmarkedPosts(newBookmarkedPosts);
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
    }
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
    setShowPostModal(true);
  };

  const nextImage = () => {
    if (selectedPost && selectedPost.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedPost.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedPost && selectedPost.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedPost.images.length - 1 : prev - 1
      );
    }
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className={`mb-4 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-white hover:bg-gray-50 text-gray-900 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}

        {/* Profile Card */}
        <div className={`rounded-2xl overflow-hidden shadow-lg ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Cover Photo */}
          <div className="relative h-48 md:h-64">
            <img
              src={currentUser.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <button className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start -mt-16 mb-4">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Name and Actions */}
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
                    <h1 className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {currentUser.name}
                    </h1>
                    {currentUser.isVerified && (
                      <ShieldCheck className="w-6 h-6 text-blue-500 fill-current" />
                    )}
                  </div>
                  <p className={`text-base ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {currentUser.username}
                  </p>
                </div>

                <div className="flex justify-center md:justify-end space-x-3">
                  <button
                    onClick={() => setShowQRCode(true)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    <QrCode className="w-4 h-4 inline mr-2" />
                    QR Code
                  </button>
                  <button
                    onClick={() => setShowMessageModal(true)}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
                  >
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Message
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start space-x-6 mb-4">
                <div className="text-center">
                  <div className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {posts.length}
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Posts
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {currentUser.followers?.toLocaleString() || '0'}
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Followers
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {currentUser.following?.toLocaleString() || '0'}
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Following
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className={`mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                {currentUser.bio}
              </p>

              {/* Specialties */}
              {currentUser.specialties && (
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {currentUser.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
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

              {/* Location & Join Date */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm mb-4">
                <div className={`flex items-center space-x-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  <MapPin className="w-4 h-4" />
                  <span>{currentUser.location}</span>
                </div>
                <div className={`flex items-center space-x-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  <Calendar className="w-4 h-4" />
                  <span>{currentUser.joinDate}</span>
                </div>
              </div>

              {/* Rating */}
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}>
                <div className="flex items-center space-x-1">
                  {renderStars(currentUser.rating)}
                </div>
                <span className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  {(currentUser.rating || 0).toFixed(1)} ({currentUser.totalReviews || 0} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`mt-6 rounded-2xl overflow-hidden shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center px-6">
              <nav className="flex space-x-8">
                {["posts", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? "border-green-500 text-green-600"
                        : `border-transparent ${
                            darkMode
                              ? "text-gray-400 hover:text-gray-300"
                              : "text-gray-500 hover:text-gray-700"
                          }`
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
              
              {activeTab === 'posts' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-green-600 text-white'
                        : darkMode
                        ? 'text-gray-400 hover:bg-gray-700'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-green-600 text-white'
                        : darkMode
                        ? 'text-gray-400 hover:bg-gray-700'
                        : 'text-gray-500 hover:bg-gray-100'
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
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-3 gap-4' 
                : 'space-y-4'
              }>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => viewMode === 'grid' && openPostModal(post)}
                    className={`${
                      viewMode === 'grid'
                        ? 'cursor-pointer aspect-square'
                        : ''
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      // Grid View
                      <div className="relative h-full rounded-lg overflow-hidden group">
                        <img
                          src={post.images[0]}
                          alt="Post"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="text-white flex space-x-6">
                            <div className="flex items-center space-x-2">
                              <Heart className="w-5 h-5 fill-current" />
                              <span className="font-semibold">{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="w-5 h-5 fill-current" />
                              <span className="font-semibold">{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <div className={`rounded-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                      }`}>
                        {/* Post Header */}
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={currentUser.avatar}
                              alt={currentUser.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="flex items-center space-x-1">
                                <h3 className={`font-semibold ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}>
                                  {currentUser.name}
                                </h3>
                                {currentUser.isVerified && (
                                  <ShieldCheck className="w-4 h-4 text-green-500 fill-current" />
                                )}
                              </div>
                              <p className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}>
                                {post.timestamp}
                              </p>
                            </div>
                          </div>
                          <button className={`p-2 rounded-full ${
                            darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                          }`}>
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Post Content */}
                        <div className="px-4 pb-4">
                          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {post.content}
                          </p>

                          {/* Animal Info */}
                          {post.animalInfo && (
                            <div className={`mt-3 p-3 rounded-lg ${
                              darkMode ? 'bg-gray-600' : 'bg-gray-50'
                            }`}>
                              <div className="flex justify-between items-start mb-2">
                                <h4 className={`font-semibold ${
                                  darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {post.animalInfo.title}
                                </h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  post.animalInfo.availability === 'available'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-red-500 text-white'
                                }`}>
                                  {post.animalInfo.availability.toUpperCase()}
                                </span>
                              </div>
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
                                <div className="text-green-600 font-semibold">
                                  {post.animalInfo.price}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Post Images */}
                        {post.images && post.images.length > 0 && (
                          <div 
                            onClick={() => openPostModal(post)}
                            className="cursor-pointer"
                          >
                            <img
                              src={post.images[0]}
                              alt="Post"
                              className="w-full h-80 object-cover"
                            />
                          </div>
                        )}

                        {/* Stats */}
                        <div className={`px-4 py-3 border-t flex justify-between text-sm ${
                          darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-600'
                        }`}>
                          <span>{post.likes} likes</span>
                          <div className="space-x-4">
                            <span>{post.comments} comments</span>
                            <span>{post.bookmarks} bookmarks</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className={`px-4 py-3 border-t flex justify-around ${
                          darkMode ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                              likedPosts.has(post.id)
                                ? 'text-red-500'
                                : darkMode
                                ? 'text-gray-400 hover:text-red-400'
                                : 'text-gray-600 hover:text-red-600'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">Like</span>
                          </button>
                          <button
                            onClick={() => setShowMessageModal(true)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                              darkMode
                                ? 'text-gray-400 hover:text-blue-400'
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Comment</span>
                          </button>
                          <button
                            onClick={() => toggleBookmark(post.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                              bookmarkedPosts.has(post.id)
                                ? 'text-yellow-500'
                                : darkMode
                                ? 'text-gray-400 hover:text-yellow-400'
                                : 'text-gray-600 hover:text-yellow-600'
                            }`}
                          >
                            <Bookmark className={`w-5 h-5 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">Save</span>
                          </button>
                          <button
                            onClick={() => setShowShareModal(true)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                              darkMode
                                ? 'text-gray-400 hover:text-green-400'
                                : 'text-gray-600 hover:text-green-600'
                            }`}
                          >
                            <Share className="w-5 h-5" />
                            <span className="text-sm font-medium">Share</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <div
                    key={review.id}
                    className={`border rounded-lg p-4 ${
                      darkMode
                        ? "border-gray-700 bg-gray-700"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={review.reviewerAvatar}
                        alt={review.reviewer}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {review.reviewer}
                          </h4>
                          <span className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}>
                            {review.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {renderStars(review.rating)}
                          <span className={`ml-2 text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}>
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* QR Code Modal */}
        {showQRCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowQRCode(false)}>
            <div className={`max-w-sm w-full p-6 rounded-2xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`} onClick={(e) => e.stopPropagation()}>
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
                  />
                </div>
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Scan this QR code to view {currentUser.name}'s profile
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowQRCode(false)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
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
                      link.download = `${currentUser.name}-profile-qr.png`;
                      link.click();
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
            <div className={`max-w-sm w-full p-6 rounded-2xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`} onClick={(e) => e.stopPropagation()}>
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
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }`}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`Check out this post from ${currentUser.name}!`);
                      setShowShareModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {showMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowMessageModal(false)}>
            <div className={`w-full max-w-lg rounded-2xl overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`} onClick={(e) => e.stopPropagation()}>
              {/* Chat Header */}
              <div className={`flex items-center justify-between p-4 border-b ${
                darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {currentUser.name}
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
                <button
                  onClick={() => setShowMessageModal(false)}
                  className={`p-2 rounded-full transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className={`max-w-xs px-4 py-2 rounded-2xl ${
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

              {/* Chat Input */}
              <div className={`p-4 border-t ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className={`flex-1 px-4 py-3 rounded-full text-sm border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!chatMessage.trim()}
                    className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Modal */}
        {showPostModal && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={() => setShowPostModal(false)}>
            <div className={`w-full max-w-5xl h-full max-h-[90vh] rounded-2xl overflow-hidden flex flex-col md:flex-row ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`} onClick={(e) => e.stopPropagation()}>
              {/* Left Side - Image */}
              <div className="md:w-2/3 bg-black flex items-center justify-center relative">
                {selectedPost.images && selectedPost.images.length > 0 && (
                  <>
                    <img
                      src={selectedPost.images[currentImageIndex]}
                      alt="Post"
                      className="max-h-full max-w-full object-contain"
                    />
                    {selectedPost.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          className="absolute left-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          className="absolute right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {selectedPost.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Right Side - Details */}
              <div className="md:w-1/3 flex flex-col">
                {/* Header */}
                <div className={`p-4 border-b flex items-center justify-between ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-1">
                        <h3 className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {currentUser.name}
                        </h3>
                        {currentUser.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-green-500 fill-current" />
                        )}
                      </div>
                      <p className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {selectedPost.timestamp}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPostModal(false)}
                    className={`p-2 rounded-full ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  <p className={`mb-4 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedPost.content}
                  </p>

                  {/* Animal Info */}
                  {selectedPost.animalInfo && (
                    <div className={`p-4 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className={`font-semibold text-lg ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {selectedPost.animalInfo.title}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedPost.animalInfo.availability === 'available'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                          {selectedPost.animalInfo.availability.toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className={`flex justify-between ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <span className="font-medium">Type:</span>
                          <span>{selectedPost.animalInfo.type}</span>
                        </div>
                        <div className={`flex justify-between ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <span className="font-medium">Breed:</span>
                          <span>{selectedPost.animalInfo.breed}</span>
                        </div>
                        <div className={`flex justify-between ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <span className="font-medium">Age:</span>
                          <span>{selectedPost.animalInfo.age}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-300 dark:border-gray-600">
                          <span className={`font-semibold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>Price:</span>
                          <span className="text-green-600 font-bold text-lg">
                            {selectedPost.animalInfo.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className={`px-4 py-3 border-t flex justify-between text-sm ${
                  darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'
                }`}>
                  <span>{selectedPost.likes} likes</span>
                  <div className="space-x-4">
                    <span>{selectedPost.comments} comments</span>
                    <span>{selectedPost.bookmarks} bookmarks</span>
                  </div>
                </div>

                {/* Actions */}
                <div className={`p-4 border-t flex justify-around ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(selectedPost.id); }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      likedPosts.has(selectedPost.id)
                        ? 'text-red-500'
                        : darkMode
                        ? 'text-gray-400 hover:text-red-400'
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedPosts.has(selectedPost.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowMessageModal(true); setShowPostModal(false); }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      darkMode
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(selectedPost.id); }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      bookmarkedPosts.has(selectedPost.id)
                        ? 'text-yellow-500'
                        : darkMode
                        ? 'text-gray-400 hover:text-yellow-400'
                        : 'text-gray-600 hover:text-yellow-600'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarkedPosts.has(selectedPost.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowShareModal(true); }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      darkMode
                        ? 'text-gray-400 hover:text-green-400'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialProfileDesign; 