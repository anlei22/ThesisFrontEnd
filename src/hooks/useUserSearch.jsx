import { useState, useEffect } from 'react';

const useUserSearch = (searchTerm, userType = 'both') => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchUsers = async () => {
      if (!searchTerm || searchTerm.trim().length < 2) {
        setUsers([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URI || 'http://127.0.0.1:8000/api/';
        const apiKey = import.meta.env.VITE_API_KEY;
        
        const response = await fetch(
          `${apiUrl}news-feed/users/search?search=${encodeURIComponent(searchTerm)}&type=${userType}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to search users: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          // ✅ Transform users to ensure consistent data structure
          const transformedUsers = (data.users || []).map(user => {
            // Map user_type to type for consistency
            const userTypeValue = user.user_type || user.type || 'buyer';
            
            return {
              id: user.id,
              name: user.name,
              username: user.username,
              bio: user.bio || 'No bio available',
              location: user.location || 'No location set',
              avatar: user.avatar,
              rating: parseFloat(user.rating || 0),
              totalReviews: user.totalReviews || 0,
              type: userTypeValue, // ✅ Normalized type field
              user_type: userTypeValue, // ✅ Keep both for compatibility
              isVerified: user.isVerified || false
            };
          });

          setUsers(transformedUsers);
          console.log('✅ Users Found:', transformedUsers);
          console.log('✅ First user type:', transformedUsers[0]?.type);
        } else {
          setError(data.message || 'Failed to search users');
        }
      } catch (err) {
        console.error('❌ Error searching users:', err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, userType]);

  return { users, loading, error };
};

export default useUserSearch;