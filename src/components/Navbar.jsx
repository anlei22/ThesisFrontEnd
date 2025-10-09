import React, { useState, useRef, useEffect } from 'react';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  UserCircleIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  PlusIcon,
  BookmarkIcon,
  TrashIcon,
  MapPinIcon,
  XMarkIcon,
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

// Bookmarks Dropdown Component
const BookmarksDropdown = ({ isOpen, onClose, darkMode, bookmarksRef }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState([
    { 
      id: 1, 
      name: 'Golden Retriever Puppy', 
      price: 800, 
      image: '/api/placeholder/100/100',
      animalType: 'Dog',
      address: '123 Pet Street, San Fernando, Central Luzon'
    },
    { 
      id: 2, 
      name: 'Persian Cat', 
      price: 500, 
      image: '/api/placeholder/100/100',
      animalType: 'Cat',
      address: '456 Meow Avenue, San Fernando, Central Luzon'
    }
  ]);

  const removeBookmark = (id) => {
    setBookmarkedItems(items => items.filter(item => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={bookmarksRef}
      className={`absolute right-0 mt-2 w-96 rounded-lg shadow-xl border z-40 max-h-104 overflow-hidden ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div className={`px-4 py-3 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Bookmarks ({bookmarkedItems.length})
          </h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bookmarks Items */}
      <div className="max-h-64 overflow-y-auto">
        {bookmarkedItems.length === 0 ? (
          <div className="text-center py-8 px-4">
            <BookmarkIcon className={`w-12 h-12 mx-auto mb-3 ${
              darkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No bookmarks yet
            </p>
          </div>
        ) : (
          <div className="p-2">
            {bookmarkedItems.map((item) => (
              <div key={item.id} className={`p-3 rounded-lg mb-2 border cursor-pointer transition-all hover:shadow-md ${
                darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}>
                <div className="flex items-start space-x-3">
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 
                      className={`font-medium text-sm mb-1 cursor-pointer hover:underline ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {item.name}
                    </h4>
                    
                    <div className={`text-xs mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="font-medium">Type:</span>
                        <span>{item.animalType}</span>
                      </div>
                      <div className="flex items-center space-x-1 truncate">
                        <MapPinIcon className="w-3 h-3 text-red-500 flex-shrink-0" />
                        <span className="truncate">{item.address}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold text-green-500`}>
                        ${item.price}
                      </span>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={`flex-1 px-2 py-1 rounded text-xs transition-colors ${
                          darkMode
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBookmark(item.id);
                        }}
                        className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                          darkMode
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        <TrashIcon className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Notifications Dropdown Component
const NotificationsDropdown = ({ isOpen, onClose, darkMode, notificationsRef }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'comment',
      user: 'Maria Santos',
      action: 'commented on your post',
      postTitle: 'Golden Retriever Puppy',
      timestamp: '2h ago',
      read: false,
      avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=10b981&color=fff'
    },
    {
      id: 2,
      type: 'like',
      user: 'Juan Dela Cruz',
      action: 'liked your post',
      postTitle: 'Persian Cat',
      timestamp: '4h ago',
      read: false,
      avatar: 'https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=3b82f6&color=fff'
    },
    {
      id: 3,
      type: 'bookmark',
      user: 'Anna Reyes',
      action: 'bookmarked your post',
      postTitle: 'Premium Dog Food',
      timestamp: '1d ago',
      read: true,
      avatar: 'https://ui-avatars.com/api/?name=Anna+Reyes&background=ec4899&color=fff'
    },
    {
      id: 4,
      type: 'comment',
      user: 'Pedro Garcia',
      action: 'replied to your comment',
      postTitle: 'Cat Adoption Event',
      timestamp: '2d ago',
      read: true,
      avatar: 'https://ui-avatars.com/api/?name=Pedro+Garcia&background=f59e0b&color=fff'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'comment':
        return '💬';
      case 'like':
        return '❤️';
      case 'bookmark':
        return '🔖';
      default:
        return '📢';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={notificationsRef}
      className={`absolute right-0 mt-2 w-96 rounded-lg shadow-xl border z-40 max-h-104 overflow-hidden ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div className={`px-4 py-3 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notifications Items */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-8 px-4">
            <BellIcon className={`w-12 h-12 mx-auto mb-3 ${
              darkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No notifications yet
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-4 transition-colors hover:bg-opacity-50 ${
                  notif.read
                    ? darkMode ? 'bg-gray-800' : 'bg-white'
                    : darkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <img 
                    src={notif.avatar}
                    alt={notif.user}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {notif.user}
                        </p>
                        <p className={`text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {notif.action}
                        </p>
                        <p className={`text-xs mt-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {notif.postTitle}
                        </p>
                        <p className={`text-xs mt-2 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {notif.timestamp}
                        </p>
                      </div>
                      
                      {/* Icon */}
                      <span className="text-lg ml-2">
                        {getNotificationIcon(notif.type)}
                      </span>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 mt-3">
                      {!notif.read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className={`text-xs px-2 py-1 rounded transition-colors ${
                            darkMode
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className={`text-xs px-2 py-1 rounded transition-colors ${
                          darkMode
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className={`px-4 py-3 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            className={`w-full text-sm font-medium py-2 rounded-lg transition-colors ${
              darkMode
                ? 'text-blue-400 hover:text-blue-300'
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            View All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ activeTab, setActiveTab, darkMode, toggleDarkMode, onCreatePost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState('login');
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showBookmarksDropdown, setShowBookmarksDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  const [bookmarkCount, setBookmarkCount] = useState(2);
  const [notificationCount, setNotificationCount] = useState(2);
  
  const { user, logout, isAuthenticated } = useAuth();
  
  const role = user?.role || '';
  const profileDropdownRef = useRef(null);
  const bookmarksDropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (bookmarksDropdownRef.current && !bookmarksDropdownRef.current.contains(event.target)) {
        setShowBookmarksDropdown(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target)) {
        setShowNotificationsDropdown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && showMobileSidebar) {
        setShowMobileSidebar(false);
      }
    };

    if (showProfileDropdown || showBookmarksDropdown || showNotificationsDropdown || showMobileSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, showBookmarksDropdown, showNotificationsDropdown, showMobileSidebar]);

  const navItems = [
    { id: 'home', icon: HomeIcon, iconSolid: HomeIconSolid, label: 'Home' },
    ...(isAuthenticated ? [
      { id: 'chat', icon: ChatBubbleLeftRightIcon, iconSolid: ChatIconSolid, label: 'Chat' }
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
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

                {/* Bookmarks Button - Show when logged in */}
                {isAuthenticated && (
                  <div className="relative" ref={bookmarksDropdownRef}>
                    <button
                      onClick={() => setShowBookmarksDropdown(!showBookmarksDropdown)}
                      className={`p-2 sm:p-3 rounded-full transition-all duration-300 relative ${
                        darkMode
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                      }`}
                      title="Bookmarks"
                    >
                      <BookmarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      {bookmarkCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                          {bookmarkCount > 9 ? '9+' : bookmarkCount}
                        </div>
                      )}
                    </button>

                    {/* Bookmarks Dropdown */}
                    <BookmarksDropdown
                      isOpen={showBookmarksDropdown}
                      onClose={() => setShowBookmarksDropdown(false)}
                      darkMode={darkMode}
                      bookmarksRef={bookmarksDropdownRef}
                    />
                  </div>
                )}

                {/* Notifications Button - Show when logged in */}
                {isAuthenticated && (
                  <div className="relative" ref={notificationsDropdownRef}>
                    <button
                      onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                      className={`p-2 sm:p-3 rounded-full transition-all duration-300 relative ${
                        darkMode
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                      }`}
                      title="Notifications"
                    >
                      <BellIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      {notificationCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                          {notificationCount > 9 ? '9+' : notificationCount}
                        </div>
                      )}
                    </button>

                    {/* Notifications Dropdown */}
                    <NotificationsDropdown
                      isOpen={showNotificationsDropdown}
                      onClose={() => setShowNotificationsDropdown(false)}
                      darkMode={darkMode}
                      notificationsRef={notificationsDropdownRef}
                    />
                  </div>
                )}

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
        className={`lg:hidden fixed top-16 right-0 w-80 max-w-[80vw] h-[calc(100vh-4rem)] bg-white shadow-xl border-l border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ${
          showMobileSidebar ? 'translate-x-0' : 'translate-x-full'
        } ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="mb-6 pb-4 border-b border-gray-200">
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
              
              {/* Bookmarks */}
              <div
                onClick={() => {
                  setShowBookmarksDropdown(!showBookmarksDropdown);
                }}
                className={`flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookmarkIcon className="w-5 h-5" />
                  <span className="font-medium text-sm">Bookmarks</span>
                </div>
                {bookmarkCount > 0 && (
                  <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {bookmarkCount > 9 ? '9+' : bookmarkCount}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div
                onClick={() => {
                  setShowNotificationsDropdown(!showNotificationsDropdown);
                }}
                className={`flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BellIcon className="w-5 h-5" />
                  <span className="font-medium text-sm">Notifications</span>
                </div>
                {notificationCount > 0 && (
                  <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </div>
                )}
              </div>

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

      {/* Unified Auth Modal - This replaces your separate modals */}
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

// Add missing LogOut icon import at the top
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