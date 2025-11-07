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
        {(user.accountType || user.user_type) && (
          <div className="flex justify-center mb-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                getUserTypeBadge(user.accountType || user.user_type, darkMode).className
              }`}
            >
              {getUserTypeBadge(user.accountType || user.user_type, darkMode).label}
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
    
    // Check if it's /view/:username or /profile/:username
    const viewIndex = parts.indexOf('view');
    const profileIndex = parts.indexOf('profile');
    
    if (viewIndex !== -1) {
      return parts[viewIndex + 1] || null;
    } else if (profileIndex !== -1) {
      return parts[profileIndex + 1] || null;
    }
    
    return null;
  };

  // Check if we're on the preview route (QR code view)
  const isPreviewMode = window.location.pathname.includes('/view/');

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

        const cleanUsername = username.replace('@', '');
        const apiUrl = `https://thesis-backend-main-oin9yk.laravel.cloud/api/profile/get-by-username/${cleanUsername}`;
        
        console.log('Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Profile not found (${response.status})`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response from server');
        }
        
        const result = await response.json();

        if (result.status === 'success') {
          const data = result.data;

          const transformedUser = {
            id: data.id,
            name: data.name,
            username: `@${data.username}`,
            email: data.email,
            avatar: data.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
            coverPhoto: data.coverPhoto || 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop',
            bio: data.bio || 'AgriConnect User',
            location: data.location || 'Philippines',
            rating: parseFloat(result.average_rating) || 0,
            totalReviews: result.total_raters || 0,
            isVerified: data.isVerified || false,
            accountType: data.user_type || 'seller',
            user_type: data.user_type || 'seller'
          };

          setUser(transformedUser);
          setError(null);
        } else {
          throw new Error(result.message || 'Failed to load profile');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleViewFullProfile = () => {
    // Force full page reload to main page
    window.location.href = window.location.origin + '/';
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
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

  // Error State
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
        {/* Profile Card */}
        <ProfileCardPreview
          user={user}
          darkMode={darkMode}
          onViewProfile={handleViewFullProfile}
        />

        {/* Info message for preview mode */}
        {isPreviewMode && (
          <div className={`mt-4 p-3 rounded-lg text-center text-xs ${
            darkMode ? 'bg-green-900 bg-opacity-20 text-green-300' : 'bg-green-50 text-green-700'
          }`}>
            📱 Scanned from QR Code - Click "View Full Profile" to explore more
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileViewPage;