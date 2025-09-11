const API_URL = import.meta.env.VITE_BACKEND_URI;
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiGet = async (endpoint, includeToken = false) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': includeToken ? `Bearer ${localStorage.getItem('login-token')}` : undefined,
        'X-API-Key': API_KEY,
        'login-token': includeToken ? localStorage.getItem('login-token') : undefined
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, { headers });
        if (!response.ok) {
            // If the response is 401, throw a specific error for unauthorized
            if (response.status === 401) {
                throw new Error('401 Unauthorized: User authentication failed');
            }
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}