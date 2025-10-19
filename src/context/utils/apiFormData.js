// utils/apiFormData.js
const API_URL = import.meta.env.VITE_BACKEND_URI;
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiPostFormData = async (endpoint, formData, includeToken = false) => {
    const headers = {
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
        body: formData
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
};
