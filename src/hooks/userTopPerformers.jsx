import { useState, useEffect } from 'react';

const useTopPerformers = (limit = 10, userType = 'all') => {
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopPerformers = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URI || 'http://127.0.0.1:8000/api/';
        
        const response = await fetch(
          `${apiUrl}news-feed/users/top-performers?limit=${limit}&type=${userType}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch top performers: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          const transformedPerformers = (data.performers || []).map(performer => ({
            id: performer.id,
            name: performer.name,
            username: performer.username,
            location: performer.location || 'Unknown Location', // ✅ LOCATION
            avatar: performer.avatar,
            rating: parseFloat(performer.rating || 0),
            totalRatings: performer.totalRatings || 0,
            type: performer.user_type || performer.type || 'buyer',
            user_type: performer.user_type || performer.type || 'buyer', // ✅ USER_TYPE
            isVerified: performer.isVerified || false
          }));

          setPerformers(transformedPerformers);
          console.log('✅ Top Performers Loaded:', transformedPerformers);
        } else {
          setError(data.message || 'Failed to fetch top performers');
        }
      } catch (err) {
        console.error('❌ Error fetching top performers:', err);
        setError(err.message);
        setPerformers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPerformers();
  }, [limit, userType]);

  return { performers, loading, error };
};

export default useTopPerformers;