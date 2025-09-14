import React, { useState, useRef, useEffect } from 'react';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  UserCircleIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  ChatBubbleLeftRightIcon as ChatIconSolid,
  UserCircleIcon as UserIconSolid
} from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './Register';
import LogoutConfirmModal from './LogoutConfirmModal';

const Navbar = ({ activeTab, setActiveTab, darkMode, toggleDarkMode, onCreatePost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Unified modal state - this replaces your separate modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState('login'); // 'login' or 'register'
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  
  // Get role from user or localStorage
  const role = user?.role || localStorage.getItem('role');
  const profileDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const navItems = [
    { id: 'home', icon: HomeIcon, iconSolid: HomeIconSolid, label: 'Home' },
    ...(isAuthenticated ? [
      { id: 'chat', icon: ChatBubbleLeftRightIcon, iconSolid: ChatIconSolid, label: 'Chat' }
    ] : []),
    { id: 'profile', icon: UserCircleIcon, iconSolid: UserIconSolid, label: 'Profile' },
  ];

  // Modal handler functions
  const handleShowLogin = () => {
    setAuthModalType('login');
    setShowAuthModal(true);
  };

  const handleShowRegister = () => {
    setAuthModalType('register');
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
    // Reset to login when closing (optional)
    setTimeout(() => setAuthModalType('login'), 200);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setShowProfileDropdown(!showProfileDropdown);
    } else {
      handleShowLogin();
    }
  };

  const handleProfileMenuClick = () => {
    setActiveTab('profile');
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    logout();
    setActiveTab('home');
    setShowLogoutModal(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Logo Component
  const AnimalMarketHubLogo = ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:0.1}} />
          <stop offset="100%" style={{stopColor:'#1d4ed8', stopOpacity:0.2}} />
        </linearGradient>
        <linearGradient id="pawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#059669'}} />
          <stop offset="100%" style={{stopColor:'#047857'}} />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="60" cy="60" r="45" fill="url(#gradientBg)" stroke="#2563eb" strokeWidth="2"/>
      
      {/* Shopping cart outline */}
      <path d="M25 45 L35 45 L40 75 L75 75 L80 55 L45 55" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
      
      {/* Cart wheels */}
      <circle cx="45" cy="85" r="4" fill="#2563eb"/>
      <circle cx="70" cy="85" r="4" fill="#2563eb"/>
      
      {/* Paw print design */}
      {/* Main pad */}
      <ellipse cx="60" cy="55" rx="8" ry="10" fill="url(#pawGradient)"/>
      
      {/* Toe pads */}
      <ellipse cx="52" cy="42" rx="4" ry="6" fill="url(#pawGradient)"/>
      <ellipse cx="60" cy="38" rx="4" ry="6" fill="url(#pawGradient)"/>
      <ellipse cx="68" cy="42" rx="4" ry="6" fill="url(#pawGradient)"/>
      <ellipse cx="75" cy="48" rx="3" ry="5" fill="url(#pawGradient)"/>
      
      {/* Heart symbol for love/care */}
      <path d="M45 25 C42 22, 37 22, 37 28 C37 32, 45 40, 45 40 S53 32, 53 28 C53 22, 48 22, 45 25 Z" 
            fill="#ef4444" 
            opacity="0.8"/>
    </svg>
  );

  return (
    <nav className={`sticky top-0 z-50 border-b w-full transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-green-100'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + App Name */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Logo Background Circle */}
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                darkMode ? 'bg-white' : 'bg-white'
              }`}
            >
              <AnimalMarketHubLogo size={48} />
            </div>

            {/* App Name */}
            <span
              className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-green-800'
              }`}
            >
              Animal MarketHub
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const IconComponent = activeTab === item.id ? item.iconSolid : item.icon;
              const isProfileButton = item.id === 'profile';
              
              return (
                <div key={item.id} className="relative" ref={isProfileButton ? profileDropdownRef : null}>
                  <button
                    onClick={() => isProfileButton ? handleProfileClick() : setActiveTab(item.id)}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-300 relative ${
                      activeTab === item.id
                        ? darkMode
                          ? 'bg-green-600 text-white'
                          : 'bg-green-500 text-white'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                    }`}
                    title={item.label}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    {activeTab === item.id && (
                      <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                        darkMode ? 'bg-green-400' : 'bg-green-600'
                      }`} />
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileButton && isAuthenticated && showProfileDropdown && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <div className="py-1">
                        {/* Show Admin Dashboard only for Super or Admin */}
                        {(role === 'Super' || role === 'Admin') && (
                          <button
                            onClick={() => {
                              window.location.href = '/Admin/Dashboard';
                              setShowProfileDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                              darkMode
                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            Admin Dashboard
                          </button>
                        )}
                        <button
                          onClick={handleProfileMenuClick}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            darkMode
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          My Profile
                        </button>
                        <button
                          onClick={handleLogoutClick}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            darkMode
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Create Post Button - Only show when authenticated */}
            {isAuthenticated && (
              <button
                onClick={onCreatePost}
                className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                  darkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                title="Create Post"
              >
                <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Login Button - Only show when not authenticated */}
            {!isAuthenticated && (
              <button
                onClick={handleShowLogin}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Login
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Unified Auth Modal - This replaces your separate modals */}
     {showAuthModal && (
  <>
    {authModalType === 'login' ? (
      <LoginModal
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        onForgotPassword={() => {
          // Handle forgot password logic here
          console.log('Forgot password clicked');
          // You can add forgot password modal or redirect logic
        }}
        onCreateAccount={handleShowRegister} // ← This switches to register modal
        darkMode={darkMode}
      />
    ) : (
      <RegisterModal
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        onSwitchToLogin={handleShowLogin} // ← This switches back to login modal
        darkMode={darkMode}
      />
    )}
  </>
)}

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        darkMode={darkMode}
      />
    </nav>
  );
};

export default Navbar;