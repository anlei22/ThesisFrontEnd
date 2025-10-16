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
          setUsers(data.users || []);
          console.log('✅ Users Found:', data.users);
        } else {
          setError(data.message || 'Failed to search users');
        }
      } catch (err) {
        console.error('Error searching users:', err);
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