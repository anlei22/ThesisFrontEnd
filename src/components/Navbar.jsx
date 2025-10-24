import React, { useState, useRef, useEffect } from 'react';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  PlusIcon,
  BookmarkIcon,
  BellIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  ChatBubbleLeftRightIcon as ChatIconSolid,
  UserCircleIcon as UserIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  BellIcon as BellIconSolid
} from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './Register';
import LogoutConfirmModal from './LogoutConfirmModal';


const Navbar = ({ activeTab, setActiveTab, darkMode, toggleDarkMode, onCreatePost }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState('login');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuth();
  
  const role = user?.role || '';
  const profileDropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && showMobileSidebar) {
        setShowMobileSidebar(false);
      }
    };

    if (showProfileDropdown || showMobileSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, showMobileSidebar]);

  const navItems = [
    { id: 'home', icon: HomeIcon, iconSolid: HomeIconSolid, label: 'Home' },
    ...(isAuthenticated ? [
      { id: 'chat', icon: ChatBubbleLeftRightIcon, iconSolid: ChatIconSolid, label: 'Chat' },
      { id: 'bookmarks', icon: BookmarkIcon, iconSolid: BookmarkIconSolid, label: 'Bookmarks' },
    ] : []),
    { id: 'profile', icon: UserCircleIcon, iconSolid: UserIconSolid, label: 'Profile' },
  ];

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

  const handleNavItemClick = (itemId) => {
    setActiveTab(itemId);
    setShowMobileSidebar(false);
  };

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
      
      <circle cx="60" cy="60" r="45" fill="url(#gradientBg)" stroke="#2563eb" strokeWidth="2"/>
      
      <path d="M25 45 L35 45 L40 75 L75 75 L80 55 L45 55" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
      
      <circle cx="45" cy="85" r="4" fill="#2563eb"/>
      <circle cx="70" cy="85" r="4" fill="#2563eb"/>
      
      <ellipse cx="60" cy="55" rx="8" ry="10" fill="url(#pawGradient)"/>
      
      <ellipse cx="52" cy="42" rx="4" ry="6" fill="url(#pawGradient)"/>
      <ellipse cx="60" cy="38" rx="4" ry="6" fill="url(#pawGradient)"/>
      <ellipse cx="68" cy="42" rx="4" ry="6" fill="url(#pawGradient)"/>
      <ellipse cx="75" cy="48" rx="3" ry="5" fill="url(#pawGradient)"/>
      
      <path d="M45 25 C42 22, 37 22, 37 28 C37 32, 45 40, 45 40 S53 32, 53 28 C53 22, 48 22, 45 25 Z" 
            fill="#ef4444" 
            opacity="0.8"/>
    </svg>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div 
className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"

          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      <nav className={`sticky top-0 z-50 border-b w-full transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-green-100'
      }`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + App Name */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                darkMode ? 'bg-white' : 'bg-white'
              }`}>
                <AnimalMarketHubLogo size={48} />
              </div>

              <span className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-green-800'
              }`}>
                Animal MarketHub
              </span>
            </div>

            {/* Right side - Burger Menu + Actions */}
            <div className="flex items-center space-x-2">
              {/* Desktop Navigation Items */}
              <div className="hidden lg:flex items-center space-x-1 sm:space-x-2">
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

              {/* Mobile Burger Menu */}
              <button 
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  darkMode
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                }`}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`lg:hidden fixed top-16 right-0 w-80 max-w-[80vw] h-[calc(100vh-4rem)] shadow-xl border-l flex flex-col z-50 transform transition-transform duration-300 ${
          showMobileSidebar ? 'translate-x-0' : 'translate-x-full'
        } ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className={`mb-6 pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Navigation</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Animal MarketHub</p>
          </div>
          
          {/* Navigation Items */}
          {navItems.map((item) => {
            const IconComponent = activeTab === item.id ? item.iconSolid : item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.id === 'profile' && !isAuthenticated) {
                    handleShowLogin();
                    setShowMobileSidebar(false);
                  } else {
                    handleNavItemClick(item.id);
                  }
                }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeTab === item.id 
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-50 text-green-700 border-r-2 border-green-600"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                }`}
              >
                <IconComponent className={`w-5 h-5 ${
                  activeTab === item.id ? "scale-110" : ""
                }`} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            );
          })}

          {isAuthenticated && (
            <>
              <div className={`border-t my-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>

              {/* Create Post */}
              <div
                onClick={() => {
                  onCreatePost();
                  setShowMobileSidebar(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  darkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium text-sm">Create Post</span>
              </div>

              <div className={`border-t my-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>

              {/* Profile Menu Items */}
              {(role === 'Super' || role === 'Admin') && (
                <div
                  onClick={() => {
                    window.location.href = '/Admin/Dashboard';
                    setShowMobileSidebar(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium text-sm">Admin Dashboard</span>
                </div>
              )}

              <div
                onClick={() => {
                  handleLogoutClick();
                  setShowMobileSidebar(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  darkMode
                    ? "text-red-400 hover:bg-gray-800"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <>
              <div className={`border-t my-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
              
              <button
                onClick={() => {
                  handleShowLogin();
                  setShowMobileSidebar(false);
                }}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Login
              </button>
            </>
          )}

          <div className={`border-t my-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>

          {/* Dark Mode Toggle in Sidebar */}
          <div
            onClick={toggleDarkMode}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              darkMode
                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
            }`}
          >
            {darkMode ? (
              <>
                <SunIcon className="w-5 h-5" />
                <span className="font-medium text-sm">Light Mode</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5" />
                <span className="font-medium text-sm">Dark Mode</span>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Auth Modals */}
      {showAuthModal && (
        <>
          {authModalType === 'login' ? (
            <LoginModal
              isOpen={showAuthModal}
              onClose={handleCloseAuthModal}
              onForgotPassword={() => {
                console.log('Forgot password clicked');
              }}
              onCreateAccount={handleShowRegister}
              darkMode={darkMode}
            />
          ) : (
            <RegisterModal
              isOpen={showAuthModal}
              onClose={handleCloseAuthModal}
              onSwitchToLogin={handleShowLogin}
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
    </>
  );
};

// Helper Icons
const LogOut = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const Settings = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default Navbar;