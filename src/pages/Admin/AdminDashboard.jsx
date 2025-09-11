import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Unauthorized401 from './Unauthorized401';
import { 
  LogOut, 
  AlertTriangle, 
  X,
  User,
  ChevronDown,
  ClipboardList,
  Settings,
  Home,
  Users,
  Store,
  Bell,
  FileText,
  Menu
} from 'lucide-react';

// Import page components
import Dashboard from "./AdminDashboardComponents/Dashboard";
import Listing from "./AdminDashboardComponents/Listing"
import Notifications from "./AdminDashboardComponents/Notifications"
import Reports from "./AdminDashboardComponents/Reports"
import UserAccountManagement from "./AdminDashboardComponents/UserAccountManagement"
import AdminAccountManagement from "./AdminDashboardComponents/AdminAccountManagement"

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

const AdminDashboard = () => {
  const { user, isLoading, logout } = useAuth();
  const role = (user && user.role) || localStorage.getItem('role') || '';
  const [show401, setShow401] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      if (role !== 'Super' && role !== 'Admin') {
        setShow401(true);
      } else {
        setShow401(false);
      }
    }
  }, [role, isLoading]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && showMobileSidebar) {
        setShowMobileSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileSidebar]);

  // Close mobile sidebar when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );
  }

  if (show401) {
    return <Unauthorized401 />;
  }

  const navItems = [
    { name: "Dashboard", icon: Home, component: Dashboard },
    { name: "Animal Listings", icon: Store, component: Listing },
    { name: "Notifications", icon: Bell, component: Notifications },
    { name: "Reports", icon: ClipboardList, component: Reports },
    { name: "User Account's Management", icon: Users, component: UserAccountManagement },
    { name: "Admin Account's Management", icon: User, component: AdminAccountManagement },
  ];

  const SelectedComponent = navItems.find(item => item.name === selected)?.component;
  
  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    logout();
    window.location.href = '/';
  };

  const handleNavItemClick = (itemName) => {
    setSelected(itemName);
    setShowMobileSidebar(false); // Close mobile sidebar when item is selected
  };

  const username = localStorage.getItem('username') || 'Admin';
  let roleTitle = '';
  if (role === 'Super') roleTitle = 'Super Administrator';
  else if (role === 'Admin') roleTitle = 'Administrator';

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-lg px-4 sm:px-6 flex justify-between items-center border-b z-50">
        {/* Left side - Logo and burger menu */}
        <div className="flex items-center gap-3">
          {/* Mobile burger menu */}
          <button 
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex items-center justify-center">
            <AnimalMarketHubLogo size={window.innerWidth < 640 ? 36 : 48} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Animal MarketHub</h1>
            <p className="text-xs sm:text-sm text-gray-500">Admin Dashboard</p>
          </div>
        </div>

        {/* Right side - User info and dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800 truncate max-w-32 lg:max-w-none">
                Welcome, {username}
              </p>
              <p className="text-xs text-gray-500">{roleTitle}</p>
            </div>
            <div 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
            >
              <User className="w-5 h-5 text-gray-600 sm:hidden" />
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                showDropdown ? 'rotate-180' : ''
              }`} />
            </div>
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* Mobile user info */}
              <div className="sm:hidden px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-800">{username}</p>
                <p className="text-xs text-gray-500">{roleTitle}</p>
              </div>
              <div
                onClick={() => { window.location.href = '/'; setShowDropdown(false); }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors duration-200 group"
              >
                <Home className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Go to Main Board</span>
              </div>
              <div className="border-t border-gray-200 my-2 mx-2"></div>
              <div
                onClick={() => { setShowLogoutModal(true); setShowDropdown(false); }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors duration-200 group"
              >
                <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">Logout</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-gray-200 flex flex-col z-40">
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setSelected(item.name)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selected === item.name 
                  ? "bg-green-50 text-green-700 border-r-2 border-green-600" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                selected === item.name ? "scale-110" : ""
              }`} />
              <span className="font-medium text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`lg:hidden fixed top-16 left-0 w-80 max-w-[80vw] h-[calc(100vh-4rem)] bg-white shadow-xl border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ${
          showMobileSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => handleNavItemClick(item.name)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selected === item.name 
                  ? "bg-green-50 text-green-700 border-r-2 border-green-600" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                selected === item.name ? "scale-110" : ""
              }`} />
              <span className="font-medium text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-4 sm:p-6">
        
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]">
            <div className="p-4 sm:p-6">
              {SelectedComponent ? <SelectedComponent /> : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🐾</div>
                    <p className="text-sm sm:text-base">Component for {selected} is loading...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        darkMode={false}
      />
    </div>
  );
};

// Logout Modal Component
const LogoutConfirmModal = ({ isOpen, onClose, onConfirm, darkMode = false }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`relative w-full max-w-md rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
            <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Confirm Logout</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <p className="text-sm mb-6 text-gray-600">Are you sure you want to logout?</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;