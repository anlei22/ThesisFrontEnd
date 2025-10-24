import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserViewProfile from './UserProfileView';
import useApiConnection from '../../../context/ApiConnection';

// Fallback sample user if API fails
const FALLBACK_USER = {
  name: 'User',
  username: '@user',
  avatar: 'https://ui-avatars.com/api/?name=User&background=10b981&color=fff',
  coverPhoto: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop',
  bio: 'Livestock farmer',
  location: 'Philippines',
  joinDate: 'Member',
  rating: 0,
  totalReviews: 0,
  followers: 0,
  following: 0,
  isVerified: false,
  specialties: []
};

export default function ProfileViewPage({ darkMode = false }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch all users from API
  const { data: usersData, loading: usersLoading } = useApiConnection('users/GetAllUsers');
  
  useEffect(() => {
    if (usersData && usersData.users) {
      // Find user by username (remove @ symbol for matching)
      const cleanUsername = username.toLowerCase().replace('@', '');
      
      const foundUser = usersData.users.find(user => 
        (user.Username || '').toLowerCase() === cleanUsername ||
        (user.FirstName + user.LastName).toLowerCase().replace(/\s+/g, '') === cleanUsername
      );
      
      if (foundUser) {
        // Transform API user data to match component format
        const transformedUser = {
          id: foundUser.id,
          name: `${foundUser.FirstName || 'Unknown'} ${foundUser.LastName || 'User'}`,
          username: `@${foundUser.Username || cleanUsername}`,
          avatar: foundUser.profile_picture || 
            `https://ui-avatars.com/api/?name=${foundUser.FirstName || 'U'}+${foundUser.LastName || 'U'}&background=10b981&color=fff`,
          coverPhoto: foundUser.cover_photo || 
            'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop',
          bio: foundUser.bio || 'Livestock farmer',
          location: foundUser.location || 'Philippines',
          joinDate: foundUser.created_at ? 
            `Joined ${new Date(foundUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}` : 
            'Member',
          rating: parseFloat(foundUser.average_rating || 0),
          totalReviews: foundUser.ratings?.length || 0,
          followers: foundUser.followers_count || 0,
          following: foundUser.following_count || 0,
          isVerified: !!foundUser.email_verified_at,
          specialties: foundUser.specialties || [],
          user_type: foundUser.user_type || 'user',
          email: foundUser.Email || ''
        };
        
        setUserData(transformedUser);
      } else {
        // User not found, use fallback
        console.warn(`User @${username} not found`);
        setUserData({
          ...FALLBACK_USER,
          username: `@${username}`,
          name: username
        });
      }
      
      setLoading(false);
    }
  }, [usersData, username]);
  
  // Fetch user's posts (you'll need to implement this endpoint)
  // For now using empty array
  useEffect(() => {
    // TODO: Fetch user's posts from API
    // const { data: postsData } = useApiConnection(`posts/GetUserPosts/${userId}`);
    setUserPosts([]);
  }, [username]);
  
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  if (loading || usersLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-green-50'
      }`}>
        <div className="text-center">
          <div className={`text-lg font-medium ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Loading profile...
          </div>
        </div>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-green-50'
      }`}>
        <div className="text-center">
          <div className={`text-lg font-medium mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            User not found
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <UserViewProfile 
      user={userData}
      userPosts={userPosts}
      darkMode={darkMode}
      onBack={handleBack}
    />
  );
}