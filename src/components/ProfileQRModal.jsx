import React, { useState } from 'react';
import { X, Camera, MapPin, ShieldCheck, UserPlus, Share, Star } from 'lucide-react';
import { QRCodeCanvas } from "qrcode.react";

// Rating Stars Component
const RatingStars = ({ rating, darkMode }) => (
  <div className="flex items-center space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating || 0)
            ? 'text-yellow-400 fill-current'
            : darkMode
            ? 'text-gray-600'
            : 'text-gray-300'
        }`}
      />
    ))}
  </div>
);

// User Type Badge Helper Function
const getUserTypeBadge = (type, darkMode) => {
  const types = {
    buyer: {
      light: 'bg-purple-100 text-purple-600',
      dark: 'bg-purple-600 text-purple-100',
      label: 'Buyer'
    },
    seller: {
      light: 'bg-blue-100 text-blue-600',
      dark: 'bg-blue-600 text-blue-100',
      label: 'Seller'
    },
    both: {
      light: 'bg-green-100 text-green-600',
      dark: 'bg-green-600 text-green-100',
      label: 'Buyer & Seller'
    }
  };

  const typeConfig = types[type] || types.both;
  return {
    className: darkMode ? typeConfig.dark : typeConfig.light,
    label: typeConfig.label
  };
};

// Profile Card Preview Component
const ProfileCardPreview = ({ user, darkMode, onViewProfile }) => {
  const scheme = darkMode ? {
    card: 'bg-gray-800',
    text: 'text-white',
    muted: 'text-gray-400'
  } : {
    card: 'bg-white',
    text: 'text-gray-900',
    muted: 'text-gray-600'
  };

  return (
    <div className={`w-full max-w-sm rounded-2xl overflow-hidden shadow-xl ${scheme.card}`}>
      {/* Cover Photo */}
      <div className="relative h-32 overflow-hidden">
        <img 
          src={user.coverPhoto || 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop'} 
          alt="Cover" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center -mt-16 mb-4 px-6">
        <div className="relative">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
          {user.isVerified && (
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 pb-6 text-center">
        <h2 className={`text-xl font-bold mb-1 ${scheme.text}`}>{user.name}</h2>
        <p className={`text-sm mb-2 ${scheme.muted}`}>{user.username}</p>

        {/* User Type Badge - Accurate from user data */}
        {user.user_type && (
          <div className="flex justify-center mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              getUserTypeBadge(user.user_type, darkMode).className
            }`}>
              {getUserTypeBadge(user.user_type, darkMode).label}
            </span>
          </div>
        )}

        {/* Bio */}
        {user.bio && (
          <p className={`text-sm mb-4 ${scheme.muted}`}>{user.bio}</p>
        )}

        {/* Location */}
        {user.location && (
          <div className={`flex items-center justify-center space-x-1 mb-4 ${scheme.muted}`}>
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{user.location}</span>
          </div>
        )}

        {/* Rating */}
        {user.rating > 0 && (
          <div className={`flex items-center justify-center space-x-2 mb-6 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <RatingStars rating={user.rating} darkMode={darkMode} />
            <span className={`text-sm font-medium ${scheme.text}`}>
              {user.rating?.toFixed(1)} ({user.totalReviews || 0} reviews)
            </span>
          </div>
        )}

        {/* Specialties */}
        {user.specialties && user.specialties.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {user.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs ${
                    darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Button */}
        <button
          onClick={onViewProfile}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>View Full Profile</span>
        </button>
      </div>
    </div>
  );
};

// Main ProfileQR Modal Component
const ProfileQRModal = ({ user, darkMode, onClose }) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Generate profile URL
  React.useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const appUrl = window.location.origin.replace(/\/+$/, '');
      const username = user.username?.replace('@', '') || 'user';
      setProfileUrl(`${appUrl}/profile/${username}`);
    }
  }, [user]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy link");
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleViewProfile = () => {
    setShowPreview(false);
    onClose();
    window.open(profileUrl, '_blank');
  };

  const handleShare = (platform) => {
    const text = `Check out ${user.name}'s profile on AgriConnect`;
    const encodedUrl = encodeURIComponent(profileUrl);
    const encodedText = encodeURIComponent(text);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      messenger: `fb-messenger://share/?link=${encodedUrl}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Share
              className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`}
            />
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {showPreview ? 'Profile Preview' : 'Share Profile'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors duration-200 ${
              darkMode
                ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showPreview ? (
          <>
            {/* Title */}
            <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {user.name}'s Profile
            </p>

            {/* QR Code */}
            {profileUrl && (
              <div className="text-center mb-6">
                <div
                  className={`inline-block p-4 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <QRCodeCanvas
                    value={profileUrl}
                    size={200}
                    bgColor={darkMode ? "#374151" : "#ffffff"}
                    fgColor={darkMode ? "#10b981" : "#059669"}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p
                  className={`text-sm mt-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Scan QR code to view profile
                </p>
              </div>
            )}

            {/* Share URL */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Profile Link
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={profileUrl}
                  readOnly
                  className={`flex-1 px-3 py-2 text-sm rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-r-lg border border-l-0 transition-colors duration-200 ${
                    copied
                      ? "bg-green-600 hover:bg-green-700 border-green-600 text-white"
                      : darkMode
                        ? "bg-green-600 hover:bg-green-700 border-green-600 text-white"
                        : "bg-green-500 hover:bg-green-600 border-green-500 text-white"
                  }`}
                >
                  {copied ? (
                    <span className="text-sm font-medium">✓ Copied</span>
                  ) : (
                    <span className="text-sm font-medium">Copy</span>
                  )}
                </button>
              </div>
            </div>

            {/* Preview Button */}
            <div className="mb-4">
              <button
                onClick={handlePreview}
                className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                <Camera className="w-5 h-5" />
                <span>Preview Profile Card</span>
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="space-y-2">
              <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Share via:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="py-2 px-4 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="py-2 px-4 rounded-lg font-medium transition-colors bg-sky-500 hover:bg-sky-600 text-white text-sm"
                >
                  Twitter
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="py-2 px-4 rounded-lg font-medium transition-colors bg-green-500 hover:bg-green-600 text-white text-sm"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare('messenger')}
                  className="py-2 px-4 rounded-lg font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white text-sm"
                >
                  Messenger
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Preview Card */}
            <ProfileCardPreview
              user={user}
              darkMode={darkMode}
              onViewProfile={handleViewProfile}
            />
            <button
              onClick={() => setShowPreview(false)}
              className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Back to QR Code
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileQRModal;