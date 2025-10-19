// ApiConnection.jsx
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URI;
const API_KEY = import.meta.env.VITE_API_KEY;

const useApiConnection = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    if (!endpoint) return;

    try {
      setLoading(true);
      setError(null);

      const url = `${API_URL}${endpoint}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json',
          'login-token': localStorage.getItem('login-token') || ''
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching API data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [endpoint]);

  return { data, error, loading, refetch };
};

export default useApiConnection;
