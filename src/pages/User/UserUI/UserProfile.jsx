import React, { useState, useEffect } from 'react';
import { 
  StarIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ShareIcon,
  CameraIcon,
  PencilIcon,
  MapPinIcon,
  CalendarIcon,
  LinkIcon,
  UserCircleIcon,
  QrCodeIcon,
  XMarkIcon,
  CheckIcon,
  PhoneIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  UserIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, ShieldCheckIcon as ShieldCheckSolid } from '@heroicons/react/24/solid';

// Mock useAuth hook for demo
const useAuth = () => ({
  user: {
    name: "Alex Johnson",
    email: "alex@example.com"
  },
  isAuthenticated: true,
  logout: () => console.log('Logout')
});

// Mock LoginModal component
const LoginModal = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login Required</h2>
        <button onClick={onClose} className="px-4 py-2 bg-green-600 text-white rounded-lg">Close</button>
      </div>
    </div>
  );
};

const UserProfile = ({ darkMode = false }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(4.2);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    phone: '',
    age: '',
    gender: '',
    birthdate: '',
    userType: 'both', // 'buyer', 'seller', 'both'
    animalsInterested: [],
    avatar: '',
    coverPhoto: ''
  });

  const { user: authUser, isAuthenticated, logout } = useAuth();

  // Initialize form with user data
  useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        name: "Alex Johnson",
        email: "alex@example.com",
        bio: "Animal lover and wildlife enthusiast. Welcome to my profile! 🐾",
        location: "San Fernando, Central Luzon, PH",
        website: "alexwildlife.com",
        phone: "+63 912 345 6789",
        age: "28",
        gender: "Male",
        birthdate: "1995-06-15",
        userType: "both",
        animalsInterested: ["Dogs", "Cats", "Birds"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        coverPhoto: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=300&fit=crop"
      };
      setEditForm(userData);
      setProfileData(userData);
      setPhoneVerified(true); // Mock verified status
    }
  }, [isAuthenticated]);

  const user = isAuthenticated && profileData ? {
    ...profileData,
    username: `@${(profileData.name || "user").toLowerCase().replace(/\s+/g, '')}`,
    joinDate: "Joined June 2023",
    followers: 156,
    following: 89,
    posts: 23,
    rating: averageRating,
    totalReviews: 12,
    isVerified: phoneVerified
  } : {
    name: "Guest User",
    username: "@guest",
    bio: "Please login to view your profile",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=300&fit=crop",
    location: "Unknown",
    joinDate: "Not logged in",
    website: "example.com",
    followers: 0,
    following: 0,
    posts: 0,
    rating: 0,
    totalReviews: 0,
    isVerified: false,
    userType: 'both'
  };

  const animalOptions = [
    "Dogs", "Cats", "Birds", "Fish", "Rabbits", "Hamsters", 
    "Guinea Pigs", "Reptiles", "Horses", "Farm Animals", "Exotic Pets"
  ];

  const userPosts = [
    {
      id: 1,
      content: "Just captured this amazing shot of a red fox in Yellowstone! The early morning light was perfect. 🦊",
      images: ["https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=400&fit=crop"],
      likes: 234,
      comments: 18,
      timestamp: "2 days ago",
      animalInfo: {
        title: "Beautiful Red Fox Photography",
        type: "Wildlife Photography",
        price: "$150",
        availability: "available"
      }
    },
    {
      id: 2,
      content: "Volunteer day at the local animal shelter. These puppies are looking for forever homes! 🐕❤️",
      images: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop"
      ],
      likes: 456,
      comments: 32,
      timestamp: "5 days ago",
      animalInfo: {
        title: "Adorable Rescue Puppies",
        type: "Dog",
        price: "Free",
        availability: "available"
      }
    }
  ];

  const reviews = [
    {
      id: 1,
      reviewer: "Sarah Johnson",
      reviewerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
      rating: 4.5,
      comment: "Alex is amazing with animals! Helped me find the perfect rescue dog for my family.",
      timestamp: "1 week ago"
    },
    {
      id: 2,
      reviewer: "Mike Chen",
      reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 3.75,
      comment: "Great photographer and passionate about wildlife conservation. Highly recommend!",
      timestamp: "2 weeks ago"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnimalInterestToggle = (animal) => {
    setEditForm(prev => ({
      ...prev,
      animalsInterested: prev.animalsInterested.includes(animal)
        ? prev.animalsInterested.filter(a => a !== animal)
        : [...prev.animalsInterested, animal]
    }));
  };

  const handleImageUpload = (type) => {
    // Mock image upload - in real app, this would handle file selection and upload
    const mockImageUrl = type === 'avatar' 
      ? `https://images.unsplash.com/photo-${Date.now()}?w=150&h=150&fit=crop&crop=face`
      : `https://images.unsplash.com/photo-${Date.now()}?w=800&h=300&fit=crop`;
    
    setEditForm(prev => ({
      ...prev,
      [type]: mockImageUrl
    }));
  };

  const handleSaveProfile = () => {
    // Mock API call
    setLoading(true);
    setTimeout(() => {
      setProfileData(editForm);
      setLoading(false);
      setShowEditProfile(false);
      // Show success message
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handlePhoneVerification = () => {
    if (verificationCode === '123456') { // Mock verification
      setPhoneVerified(true);
      setShowPhoneVerification(false);
      alert('Phone number verified successfully!');
    } else {
      alert('Invalid verification code. Try 123456 for demo.');
    }
  };

  const generateQRCode = () => {
    // Mock QR code generation - in real app, use a QR code library
    const qrData = `https://animalapp.com/profile/${user.username}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      
      if (starValue <= rating) {
        return (
          <StarIconSolid key={index} className="w-5 h-5 text-yellow-400" />
        );
      }
      
      if (starValue - rating < 1) {
        const percent = Math.round((rating - Math.floor(rating)) * 100);
        return (
          <div key={index} className="relative w-5 h-5">
            <StarIconSolid className="w-5 h-5 absolute text-gray-300" />
            <div 
              className="absolute overflow-hidden" 
              style={{ width: `${percent}%`, height: '100%' }}
            >
              <StarIconSolid className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        );
      }
      
      return (
        <StarIconSolid key={index} className="w-5 h-5 text-gray-300" />
      );
    });
  };

  const renderUserTypeBadge = (userType) => {
    const badges = {
      buyer: { icon: ShoppingCartIcon, text: 'Buyer', color: 'blue' },
      seller: { icon: BuildingStorefrontIcon, text: 'Seller', color: 'green' },
      both: { icon: UserIcon, text: 'Buyer & Seller', color: 'purple' }
    };

    const badge = badges[userType] || badges.both;
    const Icon = badge.icon;

    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        badge.color === 'blue' ? (darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700') :
        badge.color === 'green' ? (darkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700') :
        (darkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700')
      }`}>
        <Icon className="w-3 h-3 mr-1" />
        {badge.text}
      </div>
    );
  };

  return (
    <div className="w-full py-4 sm:py-6 flex justify-center">
      <div className="w-full max-w-4xl px-2 sm:px-0">
        
        {!isAuthenticated ? (
          <div className={`text-center py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
            <div className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <UserCircleIcon className="w-20 h-20 mx-auto mb-4 text-gray-400" />
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Profile Access Required
              </h2>
              <p>Please login to view your profile and manage your posts.</p>
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Login to Continue
            </button>
          </div>
        ) : loading ? (
          <div className={`text-center py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
            <div className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Loading Profile
              </h2>
              <p>Please wait while we fetch your profile data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Cover Photo */}
            <div className="relative h-48 sm:h-64 md:h-80 rounded-t-lg overflow-hidden">
              <img
                src={user.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <button 
                onClick={() => handleImageUpload('coverPhoto')}
                className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
              >
                <CameraIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Profile Header */}
            <div className={`relative px-3 sm:px-6 pb-4 sm:pb-6 transition-colors duration-300 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Avatar */}
              <div className="flex justify-center sm:justify-start">
                <div className="relative -mt-12 sm:-mt-16 md:-mt-20">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover"
                  />
                  <button 
                    onClick={() => handleImageUpload('avatar')}
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-green-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-green-600 transition-colors duration-200"
                  >
                    <CameraIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="mt-3 sm:mt-4 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1">
                      <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {user.name}
                      </h1>
                      {user.isVerified && (
                        <ShieldCheckSolid className="w-6 h-6 text-blue-500" title="Verified Account" />
                      )}
                    </div>
                    <p className={`text-base sm:text-lg ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {user.username}
                    </p>
                    
                    {/* User Type Badge */}
                    <div className="flex justify-center sm:justify-start mt-2">
                      {renderUserTypeBadge(user.userType)}
                    </div>
                    
                    {/* Animals Interested */}
                    {user.animalsInterested && user.animalsInterested.length > 0 && (
                      <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-1">
                        {user.animalsInterested.slice(0, 3).map((animal, index) => (
                          <span key={index} className={`text-xs px-2 py-1 rounded-md ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {animal}
                          </span>
                        ))}
                        {user.animalsInterested.length > 3 && (
                          <span className={`text-xs px-2 py-1 rounded-md ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            +{user.animalsInterested.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 sm:mt-0 flex justify-center sm:justify-end space-x-2 sm:space-x-3">
                    <button
                      onClick={() => setShowQRCode(true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                        darkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      <QrCodeIcon className="w-4 h-4 inline mr-2" />
                      QR Code
                    </button>
                    <button
                      onClick={() => setShowEditProfile(true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                        darkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      <PencilIcon className="w-4 h-4 inline mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Bio */}
                <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {user.bio}
                </p>

                {/* Details */}
                <div className={`mt-4 flex flex-wrap gap-4 text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {user.joinDate}
                  </div>
                  {user.phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="w-4 h-4 mr-1" />
                      {user.phone}
                      {user.isVerified && <CheckIcon className="w-3 h-3 ml-1 text-green-500" />}
                    </div>
                  )}
                </div>

                {/* Rating - Enhanced & Centered */}
                <div className="mt-8 mb-2 flex flex-col items-center">
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-center mb-2">
                      {renderStars(user.rating).map((star, index) => (
                        <div key={index} className="transform scale-175 mx-1.5">
                          {star}
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <span className={`text-4xl font-bold ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {user.rating.toFixed(1)}
                      </span>
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {user.totalReviews > 0 
                          ? `Based on ${user.totalReviews} ${user.totalReviews === 1 ? 'review' : 'reviews'}`
                          : 'No reviews yet'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className={`border-b transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex justify-center sm:justify-start px-6">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-4 py-3 font-medium border-b-2 transition-colors duration-300 ${
                    activeTab === 'posts'
                      ? darkMode
                        ? 'border-green-400 text-green-400'
                        : 'border-green-500 text-green-600'
                      : darkMode
                        ? 'border-transparent text-gray-400 hover:text-gray-300'
                        : 'border-transparent text-gray-600 hover:text-gray-700'
                  }`}
                >
                  Posts
                </button>
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`px-4 py-3 font-medium border-b-2 transition-colors duration-300 ${
                    activeTab === 'listings'
                      ? darkMode
                        ? 'border-green-400 text-green-400'
                        : 'border-green-500 text-green-600'
                      : darkMode
                        ? 'border-transparent text-gray-400 hover:text-gray-300'
                        : 'border-transparent text-gray-600 hover:text-gray-700'
                  }`}
                >
                  Listings
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 py-3 font-medium border-b-2 transition-colors duration-300 ${
                    activeTab === 'reviews'
                      ? darkMode
                        ? 'border-green-400 text-green-400'
                        : 'border-green-500 text-green-600'
                      : darkMode
                        ? 'border-transparent text-gray-400 hover:text-gray-300'
                        : 'border-transparent text-gray-600 hover:text-gray-700'
                  }`}
                >
                  Feedback
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={`transition-colors duration-300 ${
              darkMode ? 'bg-gray-900' : 'bg-green-50'
            }`}>
              {activeTab === 'posts' ? (
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-12">
                    <h3 className={`text-lg font-semibold mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Recent Posts
                    </h3>
                    <div className="space-y-8">
                      {userPosts.map((post) => (
                        <div key={post.id} className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-green-100'
                        }`}>
                          <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={user.avatar} 
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                              />
                              <div>
                                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h4>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.timestamp}</p>
                              </div>
                            </div>
                            
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              post.animalInfo.availability === 'available'
                                ? darkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700'
                                : darkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-700'
                            }`}>
                              {post.animalInfo.availability === 'available' ? 'Available' : 'Sold'}
                            </div>
                          </div>
                          
                          <div className="px-5 pb-2">
                            <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {post.animalInfo.title}
                            </h3>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                {post.animalInfo.price}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                {post.animalInfo.type}
                              </span>
                            </div>
                            
                            <p className={`text-sm leading-relaxed mb-3 ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {post.content}
                            </p>
                          </div>
                          
                          {post.images && post.images.length > 0 && (
                            <div className="relative">
                              <img
                                src={post.images[0]}
                                alt={post.animalInfo.title}
                                className="w-full h-72 object-cover"
                              />
                            </div>
                          )}
                          
                          <div className={`px-5 py-4 flex items-center justify-between border-t ${
                            darkMode ? 'border-gray-700' : 'border-gray-100'
                          }`}>
                            <div className="flex items-center space-x-6">
                              <button className={`flex items-center space-x-1 group ${
                                darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                              }`}>
                                <HeartIcon className="w-5 h-5 group-hover:fill-current" />
                                <span className="text-sm">{post.likes}</span>
                              </button>
                              
                              <button className={`flex items-center space-x-1 ${
                                darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'
                              }`}>
                                <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                                <span className="text-sm">{post.comments}</span>
                              </button>
                              
                              <button className={`flex items-center space-x-1 ${
                                darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-500'
                              }`}>
                                <ShareIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeTab === 'listings' ? (
                <div className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    My Listings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userPosts.map((post) => (
                      <div key={post.id} className={`rounded-xl overflow-hidden shadow-md ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'
                      }`}>
                        <div className="relative h-48">
                          <img
                            src={post.images[0]}
                            alt={post.animalInfo.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            post.animalInfo.availability === 'available'
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}>
                            {post.animalInfo.availability === 'available' ? 'Available' : 'Sold'}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className={`font-medium text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {post.animalInfo.title}
                          </h4>
                          <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {post.content}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                              {post.animalInfo.price}
                            </span>
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {post.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <h3 className={`text-lg font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Reviews & Feedback ({reviews.length})
                  </h3>
                  
                  {reviews.map((review) => (
                    <div key={review.id} className={`rounded-lg border p-4 transition-colors duration-300 ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.reviewerAvatar}
                          alt={review.reviewer}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-semibold ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {review.reviewer}
                            </h4>
                            <span className={`text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {review.timestamp}
                            </span>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            {renderStars(review.rating)}
                            <span className={`ml-2 text-sm font-medium ${
                              darkMode ? 'text-green-400' : 'text-green-600'
                            }`}>
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                          
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="sticky top-0 bg-inherit border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Edit Profile
                  </h2>
                  <button
                    onClick={() => setShowEditProfile(false)}
                    className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Pictures Section */}
                <div className="space-y-4">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Profile Pictures
                  </h3>
                  
                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={editForm.avatar || user.avatar}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Profile Picture
                      </label>
                      <div className="mt-1">
                        <button
                          onClick={() => handleImageUpload('avatar')}
                          className="text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                        >
                          Change Avatar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cover Photo */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Cover Photo
                    </label>
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <img
                        src={editForm.coverPhoto || user.coverPhoto}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleImageUpload('coverPhoto')}
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition-opacity"
                      >
                        <CameraIcon className="w-6 h-6 mr-2" />
                        Change Cover
                      </button>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number
                    </label>
                    <div className="flex">
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        className={`flex-1 px-3 py-2 border rounded-l-md ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="Enter phone number"
                      />
                      <button
                        onClick={() => setShowPhoneVerification(true)}
                        className={`px-3 py-2 border-l-0 border rounded-r-md ${
                          phoneVerified 
                            ? 'bg-green-600 text-white border-green-600' 
                            : darkMode
                              ? 'bg-gray-600 text-gray-300 border-gray-600 hover:bg-gray-500'
                              : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
                        }`}
                        disabled={phoneVerified}
                      >
                        {phoneVerified ? <CheckIcon className="w-4 h-4" /> : 'Verify'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={editForm.age}
                      onChange={handleInputChange}
                      min="16"
                      max="100"
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Enter your age"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={editForm.gender}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Birth Date
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      value={editForm.birthdate}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Location & Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Enter your location"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={editForm.website}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-md ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Tell us about yourself and your interest in animals"
                  />
                </div>

                {/* User Type */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    I am interested in:
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'buyer', label: 'Buying animals', icon: ShoppingCartIcon },
                      { value: 'seller', label: 'Selling animals', icon: BuildingStorefrontIcon },
                      { value: 'both', label: 'Both buying and selling', icon: UserIcon }
                    ].map((option) => {
                      const Icon = option.icon;
                      return (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="userType"
                            value={option.value}
                            checked={editForm.userType === option.value}
                            onChange={handleInputChange}
                            className="text-green-600"
                          />
                          <Icon className="w-5 h-5 text-gray-500" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {option.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Animals Interested */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Animals I'm interested in:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {animalOptions.map((animal) => (
                      <label key={animal} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editForm.animalsInterested.includes(animal)}
                          onChange={() => handleAnimalInterestToggle(animal)}
                          className="text-green-600"
                        />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {animal}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowEditProfile(false)}
                    className={`px-4 py-2 border rounded-md ${
                      darkMode
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phone Verification Modal */}
        {showPhoneVerification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-center">
                <PhoneIcon className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Verify Phone Number
                </h2>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We've sent a verification code to {editForm.phone}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md text-center ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Demo: Use code "123456"
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowPhoneVerification(false)}
                    className={`flex-1 px-4 py-2 border rounded-md ${
                      darkMode
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePhoneVerification}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`max-w-sm w-full p-6 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="mb-4">
                <QrCodeIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  My Profile QR Code
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Share this QR code for others to view your profile
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <img
                  src={generateQRCode()}
                  alt="Profile QR Code"
                  className="w-48 h-48"
                />
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    // Mock download functionality
                    alert('QR code downloaded!');
                  }}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Download QR Code
                </button>
                <button
                  onClick={() => setShowQRCode(false)}
                  className={`w-full px-4 py-2 border rounded-md ${
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default UserProfile;