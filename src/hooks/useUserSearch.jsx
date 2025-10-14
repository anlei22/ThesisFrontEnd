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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:8000/api'}/users/search?search=${encodeURIComponent(searchTerm)}&type=${userType}`
        );

        if (!response.ok) {
          throw new Error('Failed to search users');
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          setUsers(data.users);
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
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, userType]);

  return { users, loading, error };
};

export default useUserSearch;