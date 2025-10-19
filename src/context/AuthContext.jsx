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
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Restore user_id to localStorage if it exists in the user object
      if (parsedUser.id && !localStorage.getItem('user_id')) {
        localStorage.setItem('user_id', parsedUser.id);
      }
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

      // Log the entire result to see what fields are available
      console.log('🔍 Full Login API Response:', JSON.stringify(result, null, 2));
      console.log('🔍 Available fields in result:', Object.keys(result));

      // Store authentication data
      localStorage.setItem('login-token', result.remember_token);
      localStorage.setItem('role', result.role);
      localStorage.setItem('username', result.name);

      // Try to find user ID in various possible fields
      const userId = result.user_id || result.id || result.userId || result.user?.id;

      console.log('🔍 Extracted userId:', userId);

      if (userId) {
        localStorage.setItem('user_id', userId.toString());
        console.log('✅ user_id stored in localStorage:', userId);
      } else {
        console.error('❌ No user_id found in login response. Full result:', result);
      }

      const userData = {
        email,
        role: result.role,
        name: result.name,
        id: userId
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      console.log('✅ Login successful. userData:', userData);

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
    localStorage.removeItem('user_id');
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
