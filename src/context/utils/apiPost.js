// utils/api.js
const API_URL = import.meta.env.VITE_BACKEND_URI;
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiPost = async (endpoint, body, includeToken = false) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  };

  if (includeToken) {
    const token = localStorage.getItem('login-token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['login-token'] = token;
    }
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};
