import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URI;
const API_KEY = import.meta.env.VITE_API_KEY;


const ConnectionContext = createContext();

export const useConnection = () => useContext(ConnectionContext);

export const ConnectionProvider = ({ baseUrl, children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Generic request function using axios
    const request = useCallback(
        async (endpoint, options = {}) => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios({
                    url: `${API_URL}${endpoint}`,
                    method: options.method || 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`,
                        'X-API-Key': API_KEY,
                        ...(options.headers || {}),
                    },
                    data: options.data || undefined,
                    params: options.params || undefined,
                });
                return response.data;
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Request failed');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [baseUrl]
    );

    return (
        <ConnectionContext.Provider value={{ request, loading, error }}>
            {children}
        </ConnectionContext.Provider>
    );
};