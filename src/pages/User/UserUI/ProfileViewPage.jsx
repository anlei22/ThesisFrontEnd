import React, { useState, useEffect } from 'react';
import { MapPin, ShieldCheck, UserPlus, Star, Loader, AlertCircle, ArrowLeft } from 'lucide-react';

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

// User Type Badge Helper
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
const ProfileCardPreview = ({ user, darkMode, onViewFullProfile }) => {
  const scheme = darkMode
    ? {
        card: 'bg-gray-800',
        text: 'text-white',
        muted: 'text-gray-400'
      }
    : {
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

        {/* User Type Badge */}
        {user.user_type && (
          <div className="flex justify-center mb-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                getUserTypeBadge(user.user_type, darkMode).className
              }`}
            >
              {getUserTypeBadge(user.user_type, darkMode).label}
            </span>
          </div>
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
          <div
            className={`flex items-center justify-center space-x-2 mb-6 p-3 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <RatingStars rating={user.rating} darkMode={darkMode} />
            <span className={`text-sm font-medium ${scheme.text}`}>
              {user.rating.toFixed(1)} ({user.totalReviews || 0} reviews)
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
                    darkMode
                      ? 'bg-green-900 text-green-200'
                      : 'bg-green-100 text-green-800'
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
          onClick={onViewFullProfile}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>View Full Profile</span>
        </button>
      </div>
    </div>
  );
};

// Main ProfileViewPage Component
const ProfileViewPage = ({ darkMode = false }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract username from URL path
  const getUsernameFromPath = () => {
    const path = window.location.pathname;
    const parts = path.split('/');
    const usernameIndex = parts.indexOf('profile') + 1;
    return parts[usernameIndex] || null;
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const username = getUsernameFromPath();
      
      if (!username) {
        setError('No username provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to fetch from API
        const apiUrl = `/api/users/profile/${username}`;
        
        try {
          const response = await fetch(apiUrl);
          
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.log('API not available, using fallback data');
        }

        // Fallback: Create user data from username
        // This allows the preview to work even without API
        const displayName = username
          .replace('@', '')
          .replace(/-/g, ' ')
          .replace(/_/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        setUser({
          id: username,
          name: displayName,
          username: `@${username.replace('@', '')}`,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&size=400&background=10b981&color=fff`,
          coverPhoto: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop',
          bio: 'AgriConnect User - View full profile for more details.',
          location: '', // Will be empty in fallback, API should provide real location
          rating: 0,
          totalReviews: 0,
          isVerified: false,
          user_type: 'seller',
          specialties: []
        });

        setLoading(false);
      } catch (err) {
        console.error('Error in profile view:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

const handleViewFullProfile = () => {
  const username = getUsernameFromPath();
  window.location.href = `/`;
};


  const handleGoBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // If no history, go to home page
      window.location.href = '/';
    }
  };

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  // Loading State
  if (loading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="text-center">
          <Loader className={`w-12 h-12 animate-spin mx-auto mb-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          <p className={`text-lg font-medium ${textColor}`}>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error State (only show if NO user data at all)
  if (error && !user) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center p-4`}>
        <div className="text-center max-w-md">
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
          <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>Profile Not Found</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  // Main Profile View
  return (
    <div className={`min-h-screen ${bgColor} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        {/* Back Button */}
        

        {/* Profile Card */}
        <ProfileCardPreview
          user={user}
          darkMode={darkMode}
          onViewFullProfile={handleViewFullProfile}
        />



        {/* Info Notice if using fallback data */}
        {error && (
          <div className={`mt-4 p-3 rounded-lg text-center text-xs ${
            darkMode ? 'bg-yellow-900 bg-opacity-20 text-yellow-300' : 'bg-yellow-50 text-yellow-700'
          }`}>
            ℹ️ Showing preview. Login to see complete profile details.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileViewPage;