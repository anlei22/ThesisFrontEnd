import { useState, useEffect } from 'react';

const useTopSellers = (limit = 10) => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URI || 'http://127.0.0.1:8000/api/';
        
        const response = await fetch(
          `${apiUrl}news-feed/users/top-sellers?limit=${limit}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch top sellers: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          setSellers(data.users || []);
        } else {
          setError(data.message || 'Failed to fetch top sellers');
        }
      } catch (err) {
        console.error('Error fetching top sellers:', err);
        setError(err.message);
        setSellers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, [limit]);

  return { sellers, loading, error };
};

export default useTopSellers;