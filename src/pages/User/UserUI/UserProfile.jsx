import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share, Bookmark, QrCode, Star, MapPin, Calendar, ShieldCheck, MoreHorizontal, Send, X, Camera, UserPlus, ChevronLeft, ChevronRight, Grid, List, Flag, MoreVertical, Edit, Trash2  } from 'lucide-react';

// Constants
const COLORS = {
  dark: { bg: 'bg-gray-900', card: 'bg-gray-800', text: 'text-white', muted: 'text-gray-400', border: 'border-gray-700' },
  light: { bg: 'bg-gray-50', card: 'bg-white', text: 'text-gray-900', muted: 'text-gray-600', border: 'border-gray-200' }
};
const SuccessModal = ({ message, darkMode, onClose }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
<div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">

      <div className={`rounded-2xl p-8 max-w-sm w-full text-center ${scheme.card}`}>
        {/* Checkmark Circle */}
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h3 className={`text-xl font-bold mb-2 ${scheme.text}`}>Success!</h3>
        <p className={`text-sm ${scheme.muted}`}>{message}</p>
      </div>
    </div>
  );
};

const DEFAULT_USER = {
  name: 'Juan Dela Cruz',
  username: '@juandelacruz',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  coverPhoto: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop',
  bio: 'Professional livestock farmer specializing in cattle and poultry.',
  location: 'Nueva Ecija, Philippines',
  joinDate: 'Joined March 2023',
  rating: 4.8,
  totalReviews: 127,
  followers: 1234,
  following: 567,
  isVerified: true,
  specialties: ['Cattle', 'Poultry', 'Goats']
};

const SAMPLE_POSTS = [
  {
    id: 1,
    content: 'Beautiful healthy cattle ready for sale! Vaccinated and well-maintained.',
    images: ['https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop'],
    likes: 145,
    comments: 23,
    bookmarks: 45,
    timestamp: '2 hours ago',
    isLiked: false,
    isBookmarked: false,
    animalInfo: { 
      title: 'Premium Cattle', 
      type: 'Cattle', 
      breed: 'Brahman', 
      age: '2 years',
      sex: 'Male',
      price: '₱85,000', 
      availability: 'available',
      description: 'Premium quality Brahman cattle in excellent health condition. Regularly vaccinated and dewormed. Perfect for breeding or meat production. Well-trained and easy to handle.'
    }
  },
  {
    id: 2,
    content: 'High-quality free-range chickens for egg production.',
    images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=600&fit=crop'],
    likes: 89,
    comments: 15,
    bookmarks: 28,
    timestamp: '5 hours ago',
    isLiked: true,
    isBookmarked: false,
    animalInfo: { 
      title: 'Free-Range Chickens', 
      type: 'Poultry', 
      breed: 'Rhode Island Red', 
      age: '6 months',
      sex: 'Female',
      price: '₱350 each', 
      availability: 'available',
      description: 'Healthy free-range Rhode Island Red chickens. Excellent egg layers producing 5-6 eggs per week. Fed with organic feed and raised in spacious, natural environment.'
    }
  },
  {
    id: 3,
    content: 'Beautiful goats for sale - great for dairy or meat production.',
    images: ['https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=800&h=600&fit=crop'],
    likes: 67,
    comments: 12,
    bookmarks: 18,
    timestamp: '1 day ago',
    isLiked: false,
    isBookmarked: true,
    animalInfo: { 
      title: 'Dairy Goats', 
      type: 'Goats', 
      breed: 'Saanen', 
      age: '1.5 years',
      sex: 'Female',
      price: '₱12,000', 
      availability: 'sold',
      description: 'High-producing Saanen dairy goats. Excellent milk production with good fat content. Friendly and easy to handle. Perfect for small-scale dairy operations.'
    }
  }
];

const SAMPLE_REVIEWS = [
  {
    id: 1,
    user: { name: 'Maria Santos', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    rating: 5,
    text: 'Excellent seller! The cattle were in perfect condition as described. Very professional and knowledgeable.',
    timestamp: '2 weeks ago'
  },
  {
    id: 2,
    user: { name: 'Pedro Reyes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    rating: 4,
    text: 'Good quality livestock. Delivery was on time and animals were healthy. Would buy again.',
    timestamp: '1 month ago'
  }
];

const INITIAL_COMMENTS = [
  {
    id: 1,
    user: { name: 'Maria Santos', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    text: 'Interested in this cattle! Can you provide more details about vaccination records?',
    timestamp: '1 hour ago',
    likes: 3,
    replies: [
      {
        id: 101,
        user: { name: 'Juan Dela Cruz', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
        text: 'Hi Maria! Yes, all vaccination records are available. I can send them to you.',
        timestamp: '45 minutes ago',
        likes: 1
      }
    ]
  }
];

// Rating Stars
const RatingStars = ({ rating, darkMode }) => (
  <div className="flex items-center space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating || 0) ? 'text-yellow-400 fill-current' : darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
    ))}
  </div>
);

// Post List Item
const PostListItem = ({ post, user, darkMode, likedPosts, bookmarkedPosts, onLike, onBookmark, onImageClick }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  
  return (
    <div className={`rounded-lg border overflow-hidden relative ${scheme.card} ${scheme.border}`}>
      {/* Diagonal Ribbon */}
      {post.animalInfo && (
        <div className="absolute top-0 right-0 w-32 h-35 overflow-hidden z-10">
          <div className={`absolute top-4 right-[-32px] w-40 h-8 transform rotate-45 text-center text-white text-xs font-bold leading-8 shadow-lg ${
            post.animalInfo.availability === 'available' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {post.animalInfo.availability === 'available' ? 'AVAILABLE' : 'SOLD OUT'}
          </div>
        </div>
      )}

      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="flex items-center space-x-1">
                <h3 className={`font-semibold ${scheme.text}`}>{user.name}</h3>
                {user.isVerified && (
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className={`text-sm ${scheme.muted}`}>{post.timestamp}</p>
            </div>
          </div>
          <button className={`p-2 rounded-full hover:opacity-80 ${scheme.muted}`}>
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        {post.animalInfo && (
          <div className="mt-4">
            <h3 className={`text-lg font-semibold mb-1 text-center ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              {post.animalInfo.title}
            </h3>
            
            {post.animalInfo.description && (
              <div className="mb-2 text-center">
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {post.animalInfo.description}
                </p>
              </div>
            )}
            
            <div className="flex justify-center items-center">
              <span className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {post.animalInfo.price}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Images */}
      {post.images?.length > 0 && (
        <div className="px-6 pb-4">
          <div className={`grid gap-2 rounded-lg overflow-hidden cursor-pointer hover:opacity-95 transition-opacity ${
            post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : post.images.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
          }`} onClick={onImageClick}>
            {post.images.slice(0, 4).map((image, i) => (
              <div key={i} className={`relative ${post.images.length === 3 && i === 0 ? 'row-span-2' : ''}`}>
                <img src={image} alt={`Post ${i}`} className="w-full h-full object-cover" style={{ minHeight: '200px', maxHeight: '400px' }} />
                {i === 3 && post.images.length > 4 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">+{post.images.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className={`px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-sm ${scheme.muted}`}>
        <span>{post.likes} likes</span> • <span>{post.bookmarks} saves</span>
      </div>

      {/* Actions */}
      <div className={`flex items-center justify-around border-t py-2 ${scheme.border}`}>
        {[
          { icon: Heart, label: 'Like', action: onLike, active: likedPosts.has(post.id), color: 'text-green-600' },
          { icon: MessageCircle, label: 'Comment', action: onImageClick, color: 'text-blue-600' },
          { icon: Bookmark, label: 'Save', action: onBookmark, active: bookmarkedPosts.has(post.id), color: 'text-yellow-600' },
          { icon: Share, label: 'Share', action: () => {}, color: 'text-green-600' }
        ].map(({ icon: Icon, label, action, active, color }) => (
          <button key={label} onClick={action} className={`flex items-center space-x-2 px-4 py-2 hover:opacity-80 transition ${active ? color : scheme.muted}`}>
            <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Review Item
const ReviewItem = ({ review, darkMode }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  
  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="flex items-start space-x-3">
        <img src={review.user.avatar} alt={review.user.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`font-semibold ${scheme.text}`}>{review.user.name}</h4>
            <span className={`text-xs ${scheme.muted}`}>{review.timestamp}</span>
          </div>
          <RatingStars rating={review.rating} darkMode={darkMode} />
          <p className={`mt-2 text-sm ${scheme.text}`}>{review.text}</p>
        </div>
      </div>
    </div>
  );
};

// Replace lines 241-248 with this complete component:

// Edit Profile Modal
const EditProfileModal = ({ user, darkMode, onClose, onSave }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [formData, setFormData] = useState({
    firstName: user.firstName || user.name?.split(' ')[0] || '',
    lastName: user.lastName || user.name?.split(' ')[1] || '',
    username: user.username || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    address: user.address || '',
    bio: user.bio || '',
    location: user.location || '',
    specialties: user.specialties?.join(', ') || '',
    avatar: user.avatar || null,
    coverPhoto: user.coverPhoto || null
  });

  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'avatar') {
          setFormData(prev => ({ ...prev, avatar: reader.result }));
          setPreviewAvatar(reader.result);
        } else {
          setFormData(prev => ({ ...prev, coverPhoto: reader.result }));
          setPreviewCover(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      bio: formData.bio,
      location: formData.location,
    
      avatar: previewAvatar || formData.avatar,
      coverPhoto: previewCover || formData.coverPhoto
    });
    onClose();
  };

  return (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div
    className={`relative w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl overflow-y-auto transition-all duration-300 ${scheme.card} my-8`}
    onClick={(e) => e.stopPropagation()}
    style={{
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE/Edge
    }}
  >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${scheme.border}`}>
          <h3 className={`text-2xl font-bold ${scheme.text}`}>Edit Profile</h3>
          <button onClick={onClose} className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
<form
  onSubmit={handleSubmit}
  className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto"
  style={{
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // Edge/IE
  }}
>

          
          {/* Cover Photo Section */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${scheme.text}`}>Cover Photo</label>
            <div className={`relative h-32 rounded-lg border-2 border-dashed ${scheme.border} cursor-pointer overflow-hidden transition`}>
              {previewCover || formData.coverPhoto ? (
                <img src={previewCover || formData.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className={`w-6 h-6 ${scheme.text}`} />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'cover')}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Avatar Section */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${scheme.text}`}>Profile Picture</label>
            <div className={`relative w-24 h-24 rounded-full border-2 border-dashed ${scheme.border} cursor-pointer overflow-hidden transition`}>
              {previewAvatar || formData.avatar ? (
                <img src={previewAvatar || formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className={`w-5 h-5 ${scheme.text}`} />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'avatar')}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${scheme.text}`}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${scheme.text}`}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>

          {/* Username & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${scheme.text}`}>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${scheme.text}`}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>

          {/* Phone & Address */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${scheme.text}`}>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${scheme.text}`}>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${scheme.text}`}>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="3"
              className={`w-full px-4 py-2 rounded-lg border resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
          </div>

          {/* Location & Specialties */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${scheme.text}`}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
           
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// Edit Post Modal
const EditPostModal = ({ post, darkMode, onClose, onSave }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [formData, setFormData] = useState({
    title: post.animalInfo.title,
    description: post.animalInfo.description,
    type: post.animalInfo.type,
    breed: post.animalInfo.breed,
    age: post.animalInfo.age,
    sex: post.animalInfo.sex,
    price: post.animalInfo.price,
    availability: post.animalInfo.availability
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
<div
  className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
  onClick={onClose}
>

<div
  className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl ${scheme.card}`}
  onClick={(e) => e.stopPropagation()}
  style={{
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // Edge/IE
  }}
>
        <div className={`flex items-center justify-between p-6 border-b ${scheme.border} sticky top-0 ${scheme.card} z-10`}>
          <h3 className={`text-xl font-bold ${scheme.text}`}>Edit Post</h3>
          <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${scheme.text}`}>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${scheme.text}`}>Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${scheme.text}`}>Breed</label>
              <input
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({...formData, breed: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${scheme.text}`}>Age</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${scheme.text}`}>Sex</label>
              <select
                value={formData.sex}
                onChange={(e) => setFormData({...formData, sex: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${scheme.text}`}>Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${scheme.text}`}>Availability</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${scheme.text}`}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              className={`w-full px-4 py-2 rounded-lg border resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    
    </div>
    
  );
  
};

// Post Modal
const PostModal = ({ post, user, darkMode, onClose, onEdit, onDelete, isAuthenticated = true }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // ADD THIS
  const [isDeleting, setIsDeleting] = useState(false);  // ADD THIS

const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onDelete(post.id);
    setIsDeleting(false);
    setShowDeleteModal(false);
    onClose();
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments([...comments, {
        id: Date.now(),
        user: { name: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop' },
        text: commentText,
        timestamp: 'Just now',
        likes: 0,
        replies: []
      }]);
      setCommentText('');
    }
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim()) {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), {
              id: Date.now(),
              user: { name: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop' },
              text: replyText,
              timestamp: 'Just now',
              likes: 0
            }]
          };
        }
        return comment;
      }));
      setReplyText('');
      setReplyingTo(null);
    }
  };


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
<div
  className="fixed inset-0 bg-white/10 backdrop-blur-md"
  onClick={onClose}
/>


        <div className={`relative rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${scheme.card}`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${scheme.border}`}>
            <div className="flex items-center space-x-4">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h2 className={`text-xl font-semibold ${scheme.text}`}>{post.animalInfo.title}</h2>
                <div className="flex items-center space-x-4 mt-1">
                  <p className={scheme.muted}>by {user.name}</p>
                  <span className={scheme.muted}>•</span>
                  <p className={`text-sm ${scheme.muted}`}>{post.timestamp}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Edit/Delete Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowActionMenu(!showActionMenu)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <MoreVertical className="w-6 h-6" />
                </button>
                
                {showActionMenu && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                      darkMode
                        ? "bg-gray-700 border border-gray-600"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => {
                        onEdit(post);
                        setShowActionMenu(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Edit className="w-5 h-5 text-blue-500" />
                      <span>Edit Post</span>
                    </button>
                  <button
  onClick={() => {
    handleDelete();
    setShowActionMenu(false);
  }}
  className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors rounded-b-lg ${
    darkMode
      ? "text-gray-300 hover:bg-gray-600"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  <Trash2 className="w-5 h-5 text-red-500" />
  <span>Delete Post</span>
</button>
                  </div>
                )}
              </div>
              
              {/* Close Button */}
              <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
<div
  className="overflow-y-auto max-h-[calc(90vh-120px)]"
  style={{
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // Edge/IE
  }}
>
            <div className="p-6">
              {/* Images */}
              {post.images && post.images.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    <img src={post.images[currentImageIndex]} alt={post.animalInfo.title} className="w-full h-80 object-cover rounded-xl" />
                    {post.images.length > 1 && (
                      <>
                        <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? post.images.length - 1 : prev - 1)} 
                          className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 bg-opacity-80' : 'bg-white bg-opacity-80'}`}>
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => setCurrentImageIndex(prev => prev === post.images.length - 1 ? 0 : prev + 1)}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 bg-opacity-80' : 'bg-white bg-opacity-80'}`}>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                          {post.images.map((_, index) => (
                            <button key={index} onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {post.images.length > 1 && (
                    <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                      {post.images.map((image, index) => (
                        <button key={index} onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-green-500' : darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <img src={image} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className={`text-lg font-medium mb-3 ${scheme.text}`}>Description</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.animalInfo.description}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-5">
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Animal Type</h4>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                      {post.animalInfo.type}
                    </span>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Age & Sex</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>{post.animalInfo.age} • {post.animalInfo.sex}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Status</h4>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${post.animalInfo.availability === 'available' ? (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')}`}>
                      {post.animalInfo.availability}
                    </span>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Breed</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>{post.animalInfo.breed}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Location</h4>
                    <div className="flex items-start space-x-2">
                      <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.location}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Price</h4>
                    <p className="text-lg font-bold text-green-600">{post.animalInfo.price}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {isAuthenticated && (
                <div className={`flex items-center justify-between p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>{post.likes}</p>
                      <p className={`text-xs ${scheme.muted}`}>Likes</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>{post.bookmarks}</p>
                      <p className={`text-xs ${scheme.muted}`}>Bookmarks</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>{comments.length}</p>
                      <p className={`text-xs ${scheme.muted}`}>Comments</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={`flex items-center p-3 rounded-lg mb-6 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${isAuthenticated ? 'justify-around' : 'justify-between'}`}>
                {isAuthenticated ? (
                  <>
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${post.isLiked ? 'text-green-600' : scheme.muted}`}>
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">Like</span>
                    </button>
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${post.isBookmarked ? 'text-yellow-600' : scheme.muted}`}>
                      <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                      <span className="font-medium">Save</span>
                    </button>
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${scheme.muted}`}>
                      <Share className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${scheme.muted}`}>
                      <Share className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                    <div className={`text-center px-4 py-2 text-sm ${scheme.muted}`}>Login to like, comment & save</div>
                  </>
                )}
              </div>

              {/* Comments */}
              {isAuthenticated && (
                <div className={`border-t pt-4 ${scheme.border}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${scheme.text}`}>Comments ({comments.length})</h3>
                  
                  {/* Add Comment */}
                  <div className="mb-6">
                    <div className={`flex space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold">U</span>
                      </div>
                      <div className="flex-1">
                        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." rows="3"
                          className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900 border border-gray-200'}`} />
                        <div className="flex justify-end mt-2">
                          <button onClick={handleAddComment} disabled={!commentText.trim()}
                            className={`px-4 py-2 rounded-lg font-medium ${commentText.trim() ? 'bg-green-600 hover:bg-green-700 text-white' : (darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-400')} cursor-${commentText.trim() ? 'pointer' : 'not-allowed'}`}>
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {comments.map((comment) => (
                      <div key={comment.id}>
                        <div className={`flex space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <h4 className={`font-semibold text-sm ${scheme.text}`}>{comment.user.name}</h4>
                                <p className={`text-xs ${scheme.muted}`}>{comment.timestamp}</p>
                              </div>
                            </div>
                            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{comment.text}</p>
                            <div className="flex items-center space-x-4">
                              <button className={`flex items-center space-x-1 text-xs ${scheme.muted}`}>
                                <Heart className="w-4 h-4" />
                                <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
                              </button>
                              <button onClick={() => setReplyingTo(comment.id)} className={`text-xs ${scheme.muted}`}>Reply</button>
                              {comment.replies?.length > 0 && (
                                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                          <div className={`ml-12 mt-2 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex space-x-3">
                              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-xs">U</span>
                              </div>
                              <div className="flex-1">
                                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder={`Reply to ${comment.user.name}...`} rows="2" autoFocus
                                  className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900 border border-gray-200'}`} />
                                <div className="flex justify-end space-x-2 mt-2">
                                  <button onClick={() => setReplyingTo(null)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                                    Cancel
                                  </button>
                                  <button onClick={() => handleAddReply(comment.id)} disabled={!replyText.trim()}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${replyText.trim() ? 'bg-green-600 hover:bg-green-700 text-white' : (darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-400')} cursor-${replyText.trim() ? 'pointer' : 'not-allowed'}`}>
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="ml-12 mt-2 space-y-2">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className={`flex space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <img src={reply.user.avatar} alt={reply.user.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <div>
                                      <h4 className={`font-semibold text-sm ${scheme.text}`}>{reply.user.name}</h4>
                                      <p className={`text-xs ${scheme.muted}`}>{reply.timestamp}</p>
                                    </div>
                                  </div>
                                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reply.text}</p>
                                  <button className={`flex items-center space-x-1 text-xs ${scheme.muted}`}>
                                    <Heart className="w-3 h-3" />
                                    <span>{reply.likes > 0 ? reply.likes : 'Like'}</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
       {showDeleteModal && (
        <DeleteConfirmationModal
          title="Delete Post"
          message={`Are you sure you want to delete this post? This action cannot be undone.`}
          darkMode={darkMode}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

// QR Code Modal
const QRCodeModal = ({ user, darkMode, onClose }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://livestock-app.com/profile/${user.username}`)}`;

  return (  
<div
  className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
  onClick={onClose}
>

      <div className={`max-w-sm w-full p-6 rounded-2xl ${scheme.card}`} onClick={(e) => e.stopPropagation()}>
        <h3 className={`text-xl font-bold mb-4 text-center ${scheme.text}`}>Share Profile</h3>
        <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
          <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain" />
        </div>
        <p className={`text-sm text-center mb-4 ${scheme.muted}`}>Scan to view {user.name}'s profile</p>
        <div className="flex space-x-3">
          <button onClick={onClose} className={`flex-1 px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>Close</button>
          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">Download</button>
        </div>
      </div>
    </div>
  );
};
// Add this new component before your main UserViewProfile component

const DeleteConfirmationModal = ({ 
  title = "Delete Post", 
  message = "Are you sure you want to delete this post? This action cannot be undone.", 
  darkMode, 
  onConfirm, 
  onCancel,
  isLoading = false 
}) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;

  return (
<div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">

      <div className={`rounded-2xl p-8 max-w-sm w-full text-center ${scheme.card}`}>
        {/* Warning Icon */}
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0-6a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold mb-2 ${scheme.text}`}>{title}</h3>
        
        {/* Message */}
        <p className={`text-sm mb-6 ${scheme.muted}`}>{message}</p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50' 
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-50'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition disabled:opacity-50"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
// Main Profile Component
export default function UserViewProfile({ user, userPosts = [], darkMode = false, onBack }) {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const currentUser = user || DEFAULT_USER;
  const posts = userPosts.length > 0 ? userPosts : SAMPLE_POSTS;

  // State declarations
  const [profileData, setProfileData] = useState(currentUser);
  const [postsList, setPostsList] = useState(posts);
  const [likedPosts, setLikedPosts] = useState(new Set([2]));
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set([3]));
  const [showQRCode, setShowQRCode] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
const [selectedPost, setSelectedPost] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);



// Handler functions
// Handler functions
  const handleSaveProfile = (updatedData) => {
    setProfileData({
      ...profileData,
      ...updatedData
    });
    setSuccessMessage('Profile updated successfully!');
    setShowEditProfile(false);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditPost(true);
    setSelectedPost(null);
  };

  const handleSavePost = (updatedPostData) => {
    setPostsList(postsList.map(p => 
      p.id === editingPost.id 
        ? { ...p, animalInfo: { ...p.animalInfo, ...updatedPostData } }
        : p
    ));
    setSuccessMessage('Post updated successfully!');
    setShowEditPost(false);
  };

  const handleDeletePost = (postId) => {
    setPostsList(postsList.filter(p => p.id !== postId));
    setSuccessMessage('Post deleted successfully!');
  };


  const toggleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    newLiked.has(postId) ? newLiked.delete(postId) : newLiked.add(postId);
    setLikedPosts(newLiked);
  };

  const toggleBookmark = (postId) => {
    const newBookmarked = new Set(bookmarkedPosts);
    newBookmarked.has(postId) ? newBookmarked.delete(postId) : newBookmarked.add(postId);
    setBookmarkedPosts(newBookmarked);
  };



  return (
    <div className={`min-h-screen transition-colors ${scheme.bg}`}>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className={`rounded-2xl overflow-hidden shadow-lg ${scheme.card}`}>
          {/* Cover Photo */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img src={profileData.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          </div>
          
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start -mt-16 mb-6">
              <img src={profileData.avatar} alt={profileData.name} className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg" />
            </div>
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
                  <h1 className={`text-2xl font-bold ${scheme.text}`}>{profileData.name}</h1>
                  {profileData.isVerified && <ShieldCheck className="w-6 h-6 text-blue-500 fill-current" />}
                </div>
                <p className={`text-base ${scheme.muted}`}>{profileData.username}</p>
              </div>
              <div className="flex justify-center md:justify-end gap-2 mt-4 md:mt-0">
                <button onClick={() => setShowQRCode(true)} className={`px-4 py-2 rounded-lg font-medium transition ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  <QrCode className="w-4 h-4" />
                </button>
                <button onClick={() => setShowEditProfile(true)} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 mb-6">
              {[
                { label: 'Posts', value: postsList.length },
                { label: 'Followers', value: profileData.followers.toLocaleString() },
                { label: 'Following', value: (profileData.following || 0).toLocaleString() }
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className={`text-xl font-bold ${scheme.text}`}>{value}</div>
                  <div className={`text-sm ${scheme.muted}`}>{label}</div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p className={`mb-4 ${scheme.text} text-center md:text-left`}>{profileData.bio}</p>

            {/* Specialties */}
            {profileData.specialties?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                {profileData.specialties.map(specialty => (
                  <span key={specialty} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{specialty}</span>
                ))}
              </div>
            )}

            {/* Location & Join Date */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm justify-center md:justify-start">
              <div className={`flex items-center space-x-1 ${scheme.muted}`}><MapPin className="w-4 h-4" /><span>{profileData.location}</span></div>
              <div className={`flex items-center space-x-1 ${scheme.muted}`}><Calendar className="w-4 h-4" /><span>{profileData.joinDate}</span></div>
            </div>

            {/* Rating */}
            <div className={`p-4 rounded-lg text-center max-w-md mx-auto ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center justify-center space-x-1 mb-1">
                <RatingStars rating={profileData.rating} darkMode={darkMode} />
              </div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {profileData.rating.toFixed(1)} ({profileData.totalReviews} reviews)
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-2xl overflow-hidden shadow-lg ${scheme.card}`}>
          <div className={`border-b ${scheme.border}`}>
            <div className="flex justify-between items-center px-6">
              <nav className="flex space-x-8">
                {['posts', 'reviews'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab ? 'border-green-500 text-green-600' : `border-transparent ${scheme.muted}`}`}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'posts' && (
              <div className='space-y-4'>
                {postsList.map((post) => (
                  <PostListItem 
                    key={post.id}
                    post={post}
                    user={profileData}
                    darkMode={darkMode}
                    likedPosts={likedPosts}
                    bookmarkedPosts={bookmarkedPosts}
                    onLike={() => toggleLike(post.id)}
                    onBookmark={() => toggleBookmark(post.id)}
                    onImageClick={() => setSelectedPost(post)}
                  />
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {SAMPLE_REVIEWS.map((review) => (
                  <ReviewItem key={review.id} review={review} darkMode={darkMode} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
         {showQRCode && <QRCodeModal user={profileData} darkMode={darkMode} onClose={() => setShowQRCode(false)} />}
      {showEditProfile && <EditProfileModal user={profileData} darkMode={darkMode} onClose={() => setShowEditProfile(false)} onSave={handleSaveProfile} />}
      {showEditPost && editingPost && <EditPostModal post={editingPost} darkMode={darkMode} onClose={() => setShowEditPost(false)} onSave={handleSavePost} />}
      
      {/* Success message modal - at main component level */}
      {successMessage && (
        <SuccessModal 
          message={successMessage} 
          darkMode={darkMode} 
          onClose={() => setSuccessMessage(null)} 
        />
      )}

      {selectedPost && (
        <PostModal 
          post={selectedPost} 
          user={profileData} 
          darkMode={darkMode} 
          onClose={() => setSelectedPost(null)}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />
      )}
   
      </div>
    </div>
  );
}