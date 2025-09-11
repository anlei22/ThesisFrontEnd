import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiPost } from './utils/apiPost';  

// Create the AuthContext
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user data on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Fake credentials for testing
  

  const login = async (email, password) => {
    try {
     const result = await apiPost('login', { email, password });
      
      if (result.status !== 'success') {
        return { success: false, error: result.message || 'Login failed' };
      }
       localStorage.setItem('login-token', result.remember_token);
       localStorage.setItem('role', result.role);
       localStorage.setItem('username', result.name);
       const userData = { email, role: result.role, name: result.name };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true, user: userData };
      
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error during login' };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, automatically "register" any user
      const userData = {
        id: Date.now(),
        name,
        username: `@${name.toLowerCase().replace(/\s+/g, '')}`,
        email,
        role: 'user',
        bio: `Animal lover and new member of AnimalHub! 🐾`,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        coverPhoto: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=300&fit=crop',
        location: 'Location not set',
        joinDate: `Joined ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
        website: 'mywebsite.com',
        followers: 0,
        following: 0,
        posts: 0,
        rating: 5.0,
        totalReviews: 0
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('login-token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.clear();
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
