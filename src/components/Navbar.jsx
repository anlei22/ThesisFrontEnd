import React, { useState, useRef, useEffect } from 'react';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  UserCircleIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  ShoppingCartIcon,
  TrashIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MapPinIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  ChatBubbleLeftRightIcon as ChatIconSolid,
  UserCircleIcon as UserIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid
} from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './Register';
import LogoutConfirmModal from './LogoutConfirmModal';

// Cart Item Detail Modal Component
const CartItemDetailModal = ({ item, isOpen, onClose, darkMode }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl rounded-lg shadow-xl max-h-[90vh] overflow-hidden ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {item.name}
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
          {/* Image */}
          <div className="mb-6">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-64 rounded-lg object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Description
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Animal Type:
                </span>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.animalType}
                </p>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Price:
                </span>
                <p className={`text-green-500 font-semibold`}>
                  ${item.price}
                </p>
              </div>
            </div>

            <div>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Location:
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <MapPinIcon className="w-4 h-4 text-red-500" />
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.address}
                </p>
              </div>
            </div>

            <div>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Seller Information:
              </span>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Contact: {item.sellerContact}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex space-x-3">
            <button
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                darkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              onClick={() => {
                console.log('Proceeding to buy:', item.name);
                onClose();
              }}
            >
              Buy Now - ${item.price}
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-medium border transition-colors ${
                darkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Dropdown Component
const CartDropdown = ({ isOpen, onClose, darkMode, cartRef }) => {
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: 'Golden Retriever Puppy', 
      price: 800, 
      quantity: 1, 
      image: '/api/placeholder/100/100',
      animalType: 'Dog',
      address: '123 Pet Street, San Fernando, Central Luzon',
      description: 'Beautiful and healthy golden retriever puppy, 3 months old, vaccinated and dewormed. Very playful and friendly with kids.',
      sellerContact: '+63 912 345 6789'
    },
    { 
      id: 2, 
      name: 'Persian Cat', 
      price: 500, 
      quantity: 1, 
      image: '/api/placeholder/100/100',
      animalType: 'Cat',
      address: '456 Meow Avenue, San Fernando, Central Luzon',
      description: 'Fluffy Persian cat, 1 year old, very calm and perfect for apartment living. Comes with all necessary documents.',
      sellerContact: '+63 917 234 5678'
    },
    { 
      id: 3, 
      name: 'Premium Dog Food', 
      price: 45, 
      quantity: 2, 
      image: '/api/placeholder/100/100',
      animalType: 'Pet Supplies',
      address: 'Pet Store Central, San Fernando, Central Luzon',
      description: 'High-quality premium dog food with all essential nutrients. Perfect for all dog breeds and ages.',
      sellerContact: '+63 918 345 6789'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetail, setShowItemDetail] = useState(false);

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowItemDetail(true);
  };

  const handleChatSeller = (item) => {
    console.log('Starting chat with seller for:', item.name);
    // Implement chat functionality here
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      <div 
        ref={cartRef}
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
              Shopping Cart ({cartItems.length})
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

        {/* Cart Items */}
        <div className="max-h-64 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 px-4">
              <ShoppingCartIcon className={`w-12 h-12 mx-auto mb-3 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="p-2">
              {cartItems.map((item) => (
                <div key={item.id} className={`p-3 rounded-lg mb-2 border cursor-pointer transition-all hover:shadow-md ${
                  darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}>
                  <div className="flex items-start space-x-3">
                    {/* Image */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      onClick={() => handleItemClick(item)}
                    />
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 
                        className={`font-medium text-sm mb-1 cursor-pointer hover:underline ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}
                        onClick={() => handleItemClick(item)}
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
                        {item.quantity > 1 && (
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Qty: {item.quantity}
                          </span>
                        )}
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChatSeller(item);
                          }}
                          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                            darkMode
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          <ChatBubbleOvalLeftEllipsisIcon className="w-3 h-3" />
                          <span>Chat</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.id);
                          }}
                          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                            darkMode
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-red-500 hover:bg-red-600 text-white'
                          }`}
                        >
                          <TrashIcon className="w-3 h-3" />
                          <span>Delete</span>
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
        {cartItems.length > 0 && (
          <div className={`px-4 py-3 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className={`flex justify-between items-center mb-3 font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <span>Total:</span>
              <span className="text-green-500">${total}</span>
            </div>
            <button
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              onClick={() => {
                console.log('Proceeding to checkout...');
                onClose();
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      <CartItemDetailModal
        item={selectedItem}
        isOpen={showItemDetail}
        onClose={() => setShowItemDetail(false)}
        darkMode={darkMode}
      />
    </>
  );
};

const Navbar = ({ activeTab, setActiveTab, darkMode, toggleDarkMode, onCreatePost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Unified modal state - this replaces your separate modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState('login'); // 'login' or 'register'
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  
  // Cart notification state - you can control this based on your cart logic
  const [cartItemCount, setCartItemCount] = useState(3); // Set to 3 for demo, connect to your cart system
  
  const { user, logout, isAuthenticated } = useAuth();
  
  // Get role from user or localStorage
  const role = user?.role || localStorage.getItem('role');
  const profileDropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
    };

    if (showProfileDropdown || showCartDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, showCartDropdown]);

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

  const handleCartClick = () => {
    setShowCartDropdown(!showCartDropdown);
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
    <>
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

              {/* Shopping Cart Button - Show when logged in */}
              {isAuthenticated && (
                <div className="relative" ref={cartDropdownRef}>
                  <button
                    onClick={handleCartClick}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-300 relative ${
                      darkMode
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                    }`}
                    title="Shopping Cart"
                  >
                    <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    {/* Cart notification badge */}
                    {cartItemCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                        {cartItemCount > 9 ? '9+' : cartItemCount}
                      </div>
                    )}
                  </button>

                  {/* Cart Dropdown */}
                  <CartDropdown
                    isOpen={showCartDropdown}
                    onClose={() => setShowCartDropdown(false)}
                    darkMode={darkMode}
                    cartRef={cartDropdownRef}
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
          </div>
        </div>
      </nav>

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
    </>
  );
};

export default Navbar;