import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import NewsFeed from "./UserUI/NewsFeed";
import ChatInterface from "./UserUI/ChatInterface";
import UserProfile from "./UserUI/UserProfile";
import CreatePostModal from "./UserUI/CreatePostModal";
import UserProfileView from "./UserUI/UserProfileView"; // Import the separated component
import { AuthProvider } from "../../context/AuthContext";
import {
  Star,
  Search,
  Filter,
  Dog,
  Cat,
  Bird,
  Fish,
  Rabbit,
  ChevronDown,
  ChevronUp,
  MapPin,
  MessageCircle,
  X,
  Send,
  Bot,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Award,
  Users,
  Home,
  User,
  Phone,
  Mail,
  Calendar,
  Package,
  Shield,
  ArrowLeft,
} from "lucide-react";

// Modal Component
const Modal = ({ isOpen, onClose, children, darkMode = false }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const Mainboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileTab, setMobileTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // POST Filter states (for filtering posts in main content)
  const [postCategory, setPostCategory] = useState("all");
  const [postLocation, setPostLocation] = useState("all");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // USER Search states (for searching users)
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userSearchType, setUserSearchType] = useState("both"); // 'sellers', 'buyers', 'both'
  const [showUserResults, setShowUserResults] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // User Profile states - MODIFIED: Remove modal, add view state
  const [viewingUserProfile, setViewingUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Chat states
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Top Participants states
  const [participantsTab, setParticipantsTab] = useState("sellers");

  // Categories with icons
  const categories = [
    { id: "all", name: "All Animals", icon: Filter },
    { id: "baboy", name: "Baboy", icon: Filter },
    { id: "baka", name: "Baka", icon: Filter },
    { id: "bangus", name: "Bangus", icon: Fish },
    { id: "galunggong", name: "Galunggong", icon: Fish },
    { id: "kambing", name: "Kambing", icon: Filter },
    { id: "kalabaw", name: "Kalabaw", icon: Filter },
    { id: "kalapati", name: "Kalapati", icon: Bird },
    { id: "manok", name: "Manok", icon: Filter },
    { id: "pato", name: "Pato / Itik", icon: Bird },
    { id: "rabbit", name: "Rabbit", icon: Rabbit },
    { id: "sugpo", name: "Sugpo / Hipon", icon: Fish },
    { id: "tambakol", name: "Tambakol", icon: Fish },
    { id: "tilapia", name: "Tilapia", icon: Fish },
    { id: "tulingan", name: "Tulingan", icon: Fish },
  ];

  // Barangay locations
  const locations = [
    { id: "all", name: "All Locations" },
    { id: "abelo", name: "Abelo" },
    { id: "alas-as", name: "Alas-as" },
    { id: "balete", name: "Balete" },
    { id: "baluk-baluk", name: "Baluk-baluk" },
    { id: "bancoro", name: "Bancoro" },
    { id: "bangin", name: "Bangin" },
    { id: "calangay", name: "Calangay" },
    { id: "hipit", name: "Hipit" },
    { id: "maabud-north", name: "Maabud North" },
    { id: "maabud-south", name: "Maabud South" },
    { id: "munlawin", name: "Munlawin" },
    { id: "pansipit", name: "Pansipit" },
    { id: "poblacion", name: "Poblacion" },
    { id: "pulang-bato", name: "Pulang-Bato" },
    { id: "santo-nino", name: "Santo Niño" },
    { id: "sinturisan", name: "Sinturisan" },
    { id: "tagudtod", name: "Tagudtod" },
    { id: "talang", name: "Talang" },
  ];

  // All users data (sellers and buyers combined)
  const allUsers = [
    // Sellers
    {
      name: "Clark Oclarit",
      avatar: "https://i.pravatar.cc/100?img=1",
      rating: 4.8,
      totalListings: 120,
      specialties: ["baboy", "baka"],
      location: "abelo",
      type: "seller",
    },
    {
      name: "Joshbee Mendoza Atienza",
      avatar: "https://i.pravatar.cc/100?img=2",
      rating: 4.9,
      totalListings: 95,
      specialties: ["bangus", "tilapia"],
      location: "alas-as",
      type: "seller",
    },
    {
      name: "Justine Roco",
      avatar: "https://i.pravatar.cc/100?img=3",
      rating: 4.7,
      totalListings: 200,
      specialties: ["kambing", "kalabaw"],
      location: "balete",
      type: "seller",
    },
    {
      name: "Angela Encarnacion",
      avatar: "https://i.pravatar.cc/100?img=4",
      rating: 5.0,
      totalListings: 75,
      specialties: ["kalapati", "manok"],
      location: "baluk-baluk",
      type: "seller",
    },
    {
      name: "Venus De Ramos",
      avatar: "https://i.pravatar.cc/100?img=5",
      rating: 4.6,
      totalListings: 60,
      specialties: ["pato", "rabbit"],
      location: "bancoro",
      type: "seller",
    },
    {
      name: "John Lei Sabangan",
      avatar: "https://i.pravatar.cc/100?img=6",
      rating: 4.6,
      totalListings: 60,
      specialties: ["pato", "rabbit"],
      location: "bancoro",
      type: "seller",
    },
    // Buyers
    {
      name: "Julie Zummer Carable",
      avatar: "https://i.pravatar.cc/100?img=11",
      rating: 4.9,
      location: "munlawin",
      type: "buyer",
    },
    {
      name: "Benedict Alcayde",
      avatar: "https://i.pravatar.cc/100?img=12",
      rating: 4.8,
      location: "pansipit",
      type: "buyer",
    },
    {
      name: "Kurth Jerby",
      avatar: "https://i.pravatar.cc/100?img=13",
      rating: 4.7,
      location: "poblacion",
      type: "buyer",
    },
    {
      name: "Carmella Pineda",
      avatar: "https://i.pravatar.cc/100?img=14",
      rating: 4.6,
      location: "pulang-bato",
      type: "buyer",
    },
    {
      name: "Zindel Arella",
      avatar: "https://i.pravatar.cc/100?img=15",
      rating: 4.5,
      location: "santo-nino",
      type: "buyer",
    },
  ];

  // Filter users based on search
  const filteredUsers = React.useMemo(() => {
    if (!userSearchTerm.trim()) return [];

    return allUsers
      .filter((user) => {
        // Filter by search term
        const nameMatch = user.name
          .toLowerCase()
          .includes(userSearchTerm.toLowerCase());

        // Filter by user type
        const typeMatch =
          userSearchType === "both" || user.type === userSearchType;

        return nameMatch && typeMatch;
      })
      .slice(0, 8); // Limit to 8 results
  }, [userSearchTerm, userSearchType]);

  // MODIFIED: Function to handle user profile view in main content
  const handleViewUserProfile = (user) => {
    setSelectedUser(user);
    setViewingUserProfile(true);
    // Clear search when viewing profile
    setUserSearchTerm("");
    setShowUserResults(false);
  };

  // MODIFIED: Function to go back from user profile
  const handleBackFromUserProfile = () => {
    setViewingUserProfile(false);
    setSelectedUser(null);
  };

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Show/hide user search results
  useEffect(() => {
    setShowUserResults(userSearchTerm.trim().length > 0);
  }, [userSearchTerm]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCategoryDropdown(false);
      setShowLocationDropdown(false);
      if (!userSearchTerm) {
        setShowUserResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [userSearchTerm]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCreatePost = () => {
    setShowCreatePost(true);
  };

  // MODIFIED: Updated renderMainContent to use imported component
  const renderMainContent = () => {
    switch (activeTab) {
      case "home":
        // Check if viewing user profile
        if (viewingUserProfile && selectedUser) {
          return (
            <UserProfileView
              user={selectedUser}
              onBack={handleBackFromUserProfile}
              darkMode={darkMode}
            />
          );
        }
        // Pass post filters to NewsFeed
        return (
          <NewsFeed
            darkMode={darkMode}
            onCreatePost={handleCreatePost}
            categoryFilter={postCategory}
            locationFilter={postLocation}
          />
        );
      case "chat":
        return <ChatInterface darkMode={darkMode} />;
      case "profile":
        return <UserProfile darkMode={darkMode} />;
      default:
        return <NewsFeed darkMode={darkMode} onCreatePost={handleCreatePost} />;
    }
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.id === postCategory
  );
  const selectedLocationData = locations.find((loc) => loc.id === postLocation);

  // Helper function for rank badges
  const getRankBadge = (index) => {
    if (index === 0)
      return {
        color: "bg-yellow-400 text-yellow-900",
        border: "border-yellow-400",
      };
    if (index === 1)
      return { color: "bg-gray-400 text-gray-900", border: "border-gray-400" };
    if (index === 2)
      return {
        color: "bg-orange-400 text-orange-900",
        border: "border-orange-400",
      };
    return { color: "", border: "border-transparent" };
  };

  // Get sellers and buyers for top participants
  const sellers = allUsers
    .filter((user) => user.type === "seller")
    .slice(0, 10);
  const buyers = allUsers.filter((user) => user.type === "buyer").slice(0, 10);
  const currentParticipants = participantsTab === "sellers" ? sellers : buyers;

  // Mobile Search Interface - Updated with profile click handler
  const MobileSearchInterface = () => (
    <div className="space-y-4">
      {/* Post Filters Card */}
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3
            className={`font-semibold flex items-center gap-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <Filter className="w-5 h-5" />
            Filter Posts
          </h3>
        </div>

        <div className="p-4 space-y-4">
          {/* Category Filter */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Category
            </label>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCategoryDropdown(!showCategoryDropdown);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <selectedCategoryData.icon className="w-4 h-4" />
                  <span>{selectedCategoryData?.name}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showCategoryDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCategoryDropdown && (
                <div
                  className={`absolute top-full left-0 w-full mt-1 ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  } border-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  } rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto`}
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setPostCategory(category.id);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 text-left hover:${
                        darkMode ? "bg-gray-600" : "bg-gray-50"
                      } ${
                        postCategory === category.id
                          ? darkMode
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-700"
                          : darkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Location
            </label>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLocationDropdown(!showLocationDropdown);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedLocationData?.name}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showLocationDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showLocationDropdown && (
                <div
                  className={`absolute top-full left-0 w-full mt-1 ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  } border-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  } rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto`}
                >
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => {
                        setPostLocation(location.id);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 text-left hover:${
                        darkMode ? "bg-gray-600" : "bg-gray-50"
                      } ${
                        postLocation === location.id
                          ? darkMode
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-700"
                          : darkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{location.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Search Card */}
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3
            className={`font-semibold flex items-center gap-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <User className="w-5 h-5" />
            Search Users
          </h3>
        </div>

        <div className="p-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search for users..."
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-colors text-base ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500"
              } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
            />
            {userSearchTerm && (
              <button
                onClick={() => setUserSearchTerm("")}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results */}
          {showUserResults && (
            <div className="mt-4 space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
                  const userLocation = locations.find(
                    (loc) => loc.id === user.location
                  );
                  return (
                    <div
                      key={index}
                      onClick={() => handleViewUserProfile(user)}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        darkMode
                          ? "border-gray-600 bg-gray-700 hover:bg-gray-650"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-medium text-sm ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {user.name}
                            </h4>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                user.type === "seller"
                                  ? darkMode
                                    ? "bg-blue-600 text-blue-100"
                                    : "bg-blue-100 text-blue-600"
                                  : darkMode
                                  ? "bg-purple-600 text-purple-100"
                                  : "bg-purple-100 text-purple-600"
                              }`}
                            >
                              {user.type}
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-1 text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <MapPin className="w-3 h-3" />
                            <span>{userLocation?.name}</span>
                            <Star className="w-3 h-3 text-yellow-400 fill-current ml-2" />
                            <span>{user.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  className={`text-center py-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No users found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <AuthProvider>
      <div
        className={`min-h-screen w-full transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-green-50"
        }`}
      >
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onCreatePost={handleCreatePost}
        />

        {/* Page Layout */}
        <div className="w-full">
          {activeTab === "home" ? (
            <>
              {/* Mobile Tab Navigation - Only visible on small screens */}
              <div
                className={`lg:hidden sticky top-16 z-40 border-b transition-colors ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex">
                  <button
                    onClick={() => {
                      setMobileTab("home");
                      // Reset user profile view when switching tabs
                      if (viewingUserProfile) {
                        setViewingUserProfile(false);
                        setSelectedUser(null);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      mobileTab === "home"
                        ? darkMode
                          ? "bg-green-600 text-white border-b-2 border-green-400"
                          : "bg-green-50 text-green-600 border-b-2 border-green-500"
                        : darkMode
                        ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileTab("search");
                      // Reset user profile view when switching tabs
                      if (viewingUserProfile) {
                        setViewingUserProfile(false);
                        setSelectedUser(null);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      mobileTab === "search"
                        ? darkMode
                          ? "bg-green-600 text-white border-b-2 border-green-400"
                          : "bg-green-50 text-green-600 border-b-2 border-green-500"
                        : darkMode
                        ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* Mobile Content */}
              <div className="lg:hidden px-4 py-4">
                {mobileTab === "home" ? (
                  renderMainContent()
                ) : (
                  <MobileSearchInterface />
                )}
              </div>

              {/* Desktop Layout - Hidden on mobile */}
              <div className="hidden lg:flex gap-[20px] mt-6 px-6 lg:px-12">
                {/* LEFT ASIDE - Post Filters & User Search - Hide when viewing profile */}
                {!viewingUserProfile && (
                  <aside className="w-90 mt-6 space-y-4 sticky top-6 h-fit">
                    {/* User Search Card */}
                    <div
                      className={`${
                        darkMode ? "bg-gray-800" : "bg-white"
                      } rounded-lg shadow-sm p-6`}
                    >
                      <h3
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        } mb-4 flex items-center gap-2`}
                      >
                        <User className="w-5 h-5" />
                        Search Users
                      </h3>

                      {/* Search Input */}
                      <div className="relative mb-4">
                        <Search
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Search for users..."
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                          className={`w-full pl-10 pr-10 py-2 rounded-lg border transition-colors ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500"
                          } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                        />
                        {userSearchTerm && (
                          <button
                            onClick={() => setUserSearchTerm("")}
                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                              darkMode
                                ? "text-gray-400 hover:text-gray-200"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Search Results */}
                      {showUserResults && (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => {
                              const userLocation = locations.find(
                                (loc) => loc.id === user.location
                              );
                              return (
                                <div
                                  key={index}
                                  onClick={() => handleViewUserProfile(user)}
                                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                                    darkMode
                                      ? "border-gray-600 bg-gray-700 hover:bg-gray-650"
                                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={user.avatar}
                                      alt={user.name}
                                      className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4
                                          className={`font-medium text-sm truncate ${
                                            darkMode
                                              ? "text-white"
                                              : "text-gray-900"
                                          }`}
                                        >
                                          {user.name}
                                        </h4>
                                        <span
                                          className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                                            user.type === "seller"
                                              ? darkMode
                                                ? "bg-blue-600 text-blue-100"
                                                : "bg-blue-100 text-blue-600"
                                              : darkMode
                                              ? "bg-purple-600 text-purple-100"
                                              : "bg-purple-100 text-purple-600"
                                          }`}
                                        >
                                          {user.type}
                                        </span>
                                      </div>
                                      <div
                                        className={`flex items-center gap-1 text-xs ${
                                          darkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        <MapPin className="w-3 h-3" />
                                        <span className="truncate">
                                          {userLocation?.name}
                                        </span>
                                        <Star className="w-3 h-3 text-yellow-400 fill-current ml-2" />
                                        <span>{user.rating}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div
                              className={`text-center py-4 text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              No users found
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div
                      className={`${
                        darkMode ? "bg-gray-800" : "bg-white"
                      } rounded-lg shadow-sm p-6`}
                    >
                      <h3
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        } mb-4 flex items-center gap-2`}
                      >
                        <Filter className="w-5 h-5" />
                        Filter Posts
                      </h3>

                      {/* Category Dropdown */}
                      <div className="mb-4 relative">
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Category
                        </label>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowCategoryDropdown(!showCategoryDropdown);
                              setShowLocationDropdown(false);
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                              darkMode
                                ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                                : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <selectedCategoryData.icon className="w-4 h-4" />
                              <span>{selectedCategoryData?.name}</span>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                showCategoryDropdown ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {showCategoryDropdown && (
                            <div
                              className={`absolute top-full left-0 w-full mt-1 ${
                                darkMode ? "bg-gray-700" : "bg-white"
                              } border ${
                                darkMode ? "border-gray-600" : "border-gray-300"
                              } rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto`}
                            >
                              {categories.map((category) => (
                                <button
                                  key={category.id}
                                  onClick={() => {
                                    setPostCategory(category.id);
                                    setShowCategoryDropdown(false);
                                  }}
                                  className={`w-full flex items-center space-x-3 p-3 text-left hover:${
                                    darkMode ? "bg-gray-600" : "bg-gray-50"
                                  } ${
                                    postCategory === category.id
                                      ? darkMode
                                        ? "bg-green-600 text-white"
                                        : "bg-green-100 text-green-700"
                                      : darkMode
                                      ? "text-gray-300"
                                      : "text-gray-700"
                                  }`}
                                >
                                  <category.icon className="w-4 h-4" />
                                  <span>{category.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Location Dropdown */}
                      <div className="relative">
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Location
                        </label>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLocationDropdown(!showLocationDropdown);
                              setShowCategoryDropdown(false);
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                              darkMode
                                ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                                : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{selectedLocationData?.name}</span>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                showLocationDropdown ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {showLocationDropdown && (
                            <div
                              className={`absolute top-full left-0 w-full mt-1 ${
                                darkMode ? "bg-gray-700" : "bg-white"
                              } border ${
                                darkMode ? "border-gray-600" : "border-gray-300"
                              } rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto`}
                            >
                              {locations.map((location) => (
                                <button
                                  key={location.id}
                                  onClick={() => {
                                    setPostLocation(location.id);
                                    setShowLocationDropdown(false);
                                  }}
                                  className={`w-full flex items-center space-x-3 p-3 text-left hover:${
                                    darkMode ? "bg-gray-600" : "bg-gray-50"
                                  } ${
                                    postLocation === location.id
                                      ? darkMode
                                        ? "bg-green-600 text-white"
                                        : "bg-green-100 text-green-700"
                                      : darkMode
                                      ? "text-gray-300"
                                      : "text-gray-700"
                                  }`}
                                >
                                  <MapPin className="w-4 h-4" />
                                  <span>{location.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </aside>
                )}

                {/* MAIN CONTENT - Full width when viewing profile */}
                <main className={viewingUserProfile ? "flex-1" : "flex-1"}>
                  {renderMainContent()}
                </main>

                {/* RIGHT ASIDE - Top Participants - Hide when viewing profile */}
                {!viewingUserProfile && (
                  <aside className="w-[24rem] mt-6">
                    <div
                      className={`${
                        darkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-100"
                      } rounded-xl shadow-lg border sticky top-6 h-[600px] flex flex-col overflow-hidden`}
                    >
                      {/* Header */}
                      <div
                        className={`p-6 border-b ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`p-2 rounded-lg ${
                                darkMode ? "bg-green-600" : "bg-green-100"
                              }`}
                            >
                              <TrendingUp
                                className={`w-5 h-5 ${
                                  darkMode ? "text-white" : "text-green-600"
                                }`}
                              />
                            </div>
                            <h3
                              className={`font-bold text-xl ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Top Participants
                            </h3>
                          </div>
                          <div
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {currentParticipants.length} {participantsTab}
                          </div>
                        </div>

                        {/* Tab Navigation */}
                        <div
                          className={`flex p-1 rounded-lg ${
                            darkMode ? "bg-gray-700" : "bg-gray-100"
                          }`}
                        >
                          <button
                            onClick={() => setParticipantsTab("sellers")}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                              participantsTab === "sellers"
                                ? darkMode
                                  ? "bg-green-600 text-white shadow-sm"
                                  : "bg-white text-green-600 shadow-sm"
                                : darkMode
                                ? "text-gray-400 hover:text-gray-200"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            <DollarSign className="w-4 h-4" />
                            Sellers
                          </button>
                          <button
                            onClick={() => setParticipantsTab("buyers")}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                              participantsTab === "buyers"
                                ? darkMode
                                  ? "bg-green-600 text-white shadow-sm"
                                  : "bg-white text-green-600 shadow-sm"
                                : darkMode
                                ? "text-gray-400 hover:text-gray-200"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Buyers
                          </button>
                        </div>
                      </div>

                      {/* Participants List */}
                      <div className="flex-1 overflow-y-auto">
                        <div className="p-4 space-y-3">
                          {currentParticipants.map((user, index) => {
                            const userLocation = locations?.find(
                              (loc) => loc.id === user.location
                            );
                            const rankBadge = getRankBadge(index);

                            return (
                              <div
                                key={`${participantsTab}-${index}`}
                                onClick={() => handleViewUserProfile(user)}
                                className={`${
                                  darkMode
                                    ? "bg-gray-700 hover:bg-gray-650"
                                    : "bg-gray-50 hover:bg-gray-100"
                                } rounded-xl p-4 border-l-4 ${
                                  rankBadge.border
                                } transition-all duration-200 hover:shadow-md group cursor-pointer`}
                              >
                                <div className="flex items-center gap-4">
                                  {/* Clean Rank Number - Separate from profile */}
                                  <div className="flex-shrink-0 w-8 flex justify-center">
                                    <span
                                      className={`font-bold text-lg ${
                                        index < 3
                                          ? index === 0
                                            ? darkMode
                                              ? "text-yellow-400"
                                              : "text-yellow-500"
                                            : index === 1
                                            ? darkMode
                                              ? "text-gray-300"
                                              : "text-gray-400"
                                            : darkMode
                                            ? "text-amber-600"
                                            : "text-amber-700"
                                          : darkMode
                                          ? "text-gray-400"
                                          : "text-gray-500"
                                      } transition-all`}
                                    >
                                      {index + 1}
                                    </span>
                                  </div>

                                  {/* Profile Card */}
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    {/* Avatar - Clean without badge */}
                                    <div className="flex-shrink-0">
                                      <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-offset-transparent group-hover:ring-green-400 transition-all"
                                      />
                                    </div>

                                    {/* User Info */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between mb-1">
                                        <h4
                                          className={`font-semibold text-sm truncate ${
                                            darkMode
                                              ? "text-white"
                                              : "text-gray-900"
                                          }`}
                                        >
                                          {user.name}
                                        </h4>
                                      </div>

                                      {/* Location */}
                                      <div
                                        className={`flex items-center gap-1 text-xs mb-2 ${
                                          darkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        <MapPin className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">
                                          {userLocation?.name ||
                                            "Unknown Location"}
                                        </span>
                                      </div>

                                      {/* Rating */}
                                      <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`w-3 h-3 ${
                                              i < Math.floor(user.rating)
                                                ? "text-yellow-400 fill-current"
                                                : darkMode
                                                ? "text-gray-600"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                        <span
                                          className={`text-xs font-medium ml-1 ${
                                            darkMode
                                              ? "text-yellow-400"
                                              : "text-yellow-600"
                                          }`}
                                        >
                                          {user.rating}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </aside>
                )}
              </div>
            </>
          ) : (
            // For Chat & Profile -> Different layouts
            <div className={activeTab === "profile" ? "max-w-3xl mx-auto px-4 lg:px-0" : "w-full px-4 lg:px-6"}>
              {renderMainContent()}
            </div>
          )}
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <CreatePostModal
            darkMode={darkMode}
            onClose={() => setShowCreatePost(false)}
          />
        )}
      </div>
    </AuthProvider>
  );
};

export default Mainboard;