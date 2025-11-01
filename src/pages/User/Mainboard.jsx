import React, { useState, useEffect } from "react";
import useUserSearch from "../../hooks/useUserSearch";
import useApiConnection from "../../context/ApiConnection";
import Navbar from "../../components/Navbar";
import NewsFeed from "./UserUI/NewsFeed";
import ChatInterface from "./UserUI/ChatInterface";
import UserProfile from "./UserUI/UserProfile";
import CreatePostModal from "./UserUI/CreatePostModal";
import UserProfileView from "./UserUI/UserProfileView";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import LoginModal from "../../components/LoginModal";
import Bookmark from "./UserUI/Bookmark";
import Notifications from "./UserUI/Notifications";
import fetchUserProfile from "../../services/profileApi";

import {
  Star,
  Search,
  Filter,
  Fish,
  Bird,
  Rabbit,
  ChevronDown,
  MapPin,
  X,
  TrendingUp,
  Home,
  User,
} from "lucide-react";
import { apiPostFormData } from "../../context/utils/apiFormData";

const Modal = ({ isOpen, onClose, children, darkMode = false }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ✅ Clean, no extra state
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
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [mobileTab, setMobileTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // POST Filter states
  const [postCategory, setPostCategory] = useState("all");
  const [postLocation, setPostLocation] = useState("all");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // USER Search states
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userSearchType, setUserSearchType] = useState("both");
  const [showUserResults, setShowUserResults] = useState(false);

  // User Profile states
  const [viewingUserProfile, setViewingUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { users: apiUsers, loading: usersLoading } = useUserSearch(
    userSearchTerm,
    userSearchType
  );

  // Categories with icons
  const categories = [
    { id: "all", name: "All Animals", icon: Filter, apiName: null },
    { id: "baboy", name: "Baboy", icon: Filter, apiName: "Pig" },
    { id: "baka", name: "Baka", icon: Filter, apiName: "Cow" },
    { id: "bangus", name: "Bangus", icon: Fish, apiName: "Bangus" },
    { id: "galunggong", name: "Galunggong", icon: Fish, apiName: "Galunggong" },
    { id: "kambing", name: "Kambing", icon: Filter, apiName: "Goat" },
    { id: "kalabaw", name: "Kalabaw", icon: Filter, apiName: "Carabao" },
    { id: "kalapati", name: "Kalapati", icon: Bird, apiName: "Kalapati" },
    { id: "manok", name: "Manok", icon: Filter, apiName: "Chiken" },
    { id: "rabbit", name: "Rabbit", icon: Rabbit, apiName: "Rabbit" },
    { id: "tilapia", name: "Tilapia", icon: Fish, apiName: "Tilapia" },
    { id: "tulingan", name: "Tulingan", icon: Fish, apiName: "Tulingan" },
  ];
  const selectedCategory = categories.find((cat) => cat.id === postCategory);
  const apiCategoryName = selectedCategory?.apiName || postCategory;

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
  const filteredUsers = React.useMemo(() => {
    if (!apiUsers || apiUsers.length === 0) return [];
    return apiUsers.slice(0, 8);
  }, [apiUsers]);

  // Ensure API key is set
  useEffect(() => {
    if (!import.meta.env.VITE_API_KEY) {
      console.warn("⚠️ VITE_API_KEY not set in .env.local");
    }
  }, []);

  // Fetch news feed data to get top performers
  const { data: newsFeedData, loading: newsFeedLoading } = useApiConnection(
    "news-feed/GetAllNewsFeed"
  );

  // Extract top performers from API response
  const [topPerformers, setTopPerformers] = useState([]);

  useEffect(() => {
    const fetchTopPerformersWithDetails = async () => {
      if (newsFeedData && newsFeedData.top_performer) {
        const performers = Array.isArray(newsFeedData.top_performer)
          ? newsFeedData.top_performer
          : [newsFeedData.top_performer];
        console.log("🔍 First performer raw data:", performers[0]);
        console.log("🔍 Avatar field:", performers[0]?.avatar);
        console.log(
          "🔍 Profile picture field:",
          performers[0]?.profile_picture
        );
        console.log("🔍 All available fields:", Object.keys(performers[0]));
        // ✅ Fetch full profile for each performer to get accurate location
        const performersWithDetails = await Promise.all(
          performers.map(async (performer) => {
            try {
              // Fetch complete user profile (includes accurate location)
              const { user: profileUser } = await fetchUserProfile(
                performer.id
              );

              return {
                id: performer.id,
                name: `${performer.FirstName || "Unknown"} ${
                  performer.LastName || "User"
                }`,
                avatar: (() => {
                  if (performer.profile_picture) {
                    const baseUrl =
                      import.meta.env.VITE_BACKEND_URI?.replace("/api/", "") ||
                      "http://127.0.0.1:8000";
                    return `${baseUrl}/storage/profile_pictures/${performer.profile_picture}`;
                  }
                 return default_profile;  // ✅ Use default_profile instead
                })(),
                rating: parseFloat(performer.average_rating || 0),
                location:
                  profileUser.location ||
                  performer.location ||
                  "Unknown Location", // ✅ Use profile location first
                type:
                  performer.Role === "Super"
                    ? "admin"
                    : (performer.Role || "User").toLowerCase(),
                username: performer.Username || "unknown",
                user_type: performer.user_type || "user",
                email: performer.Email || "",
                isVerified: !!performer.email_verified_at,
                ratings: performer.ratings || [],
               coverPhoto: profileUser.coverPhoto || "" 
              };
            } catch (error) {
              console.warn(
                `⚠️ Could not fetch details for performer ${performer.id}:`,
                error
              );
              // Fallback to basic data if profile fetch fails
              return {
                id: performer.id,
                name: `${performer.FirstName || "Unknown"} ${
                  performer.LastName || "User"
                }`,
                avatar: (() => {
                  if (performer.profile_picture) {
                    const baseUrl =
                      import.meta.env.VITE_BACKEND_URI?.replace("/api/", "") ||
                      "http://127.0.0.1:8000";
                    return `${baseUrl}/storage/profile_pictures/${performer.profile_picture}`;
                  }
                  return `https://ui-avatars.com/api/?name=${
                    performer.FirstName || "U"
                  }+${performer.LastName || "U"}&background=10b981&color=fff`;
                })(),
                rating: parseFloat(performer.average_rating || 0),
                location: performer.location || "Unknown Location",
                type:
                  performer.Role === "Super"
                    ? "admin"
                    : (performer.Role || "User").toLowerCase(),
                username: performer.Username || "unknown",
                user_type: performer.user_type || "user",
                email: performer.Email || "",
                isVerified: !!performer.email_verified_at,
                ratings: performer.ratings || [],
                 coverPhoto: ""  // ✅ Add this line - empty cover photo
              };
              
            }
          })
        );

        const sortedPerformers = performersWithDetails
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);

        setTopPerformers(sortedPerformers);
      }
    };

    fetchTopPerformersWithDetails();
  }, [newsFeedData]);

  const handleViewUserProfile = async (user) => {
    try {
      console.log("🔍 Viewing profile for user:", user.id, user.name);

      // Show loading state immediately
      setViewingUserProfile(true);
      setSelectedUser({
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
         coverPhoto: "",  // ✅ ADD THIS LINE
        loading: true,
      });

      // Fetch real profile data from API
      const { user: profileUser, userPosts } = await fetchUserProfile(user.id);

      console.log("✅ Profile fetched successfully:", {
        user: profileUser.name,
        posts: userPosts.length,
        rating: profileUser.rating,
      });

      // Update with real data
      setSelectedUser({
        ...profileUser,
        // Preserve avatar from search if profile doesn't have one
        avatar: profileUser.avatar || user.avatar,
        location: profileUser.location || user.location,
           coverPhoto: profileUser.coverPhoto || "",  // ✅ ADD THIS LINE
        posts: userPosts, // Add posts to user object
        

        loading: false,
      });

      // Clear search
      setUserSearchTerm("");
      setShowUserResults(false);
      setMobileTab("home");
    } catch (error) {
      console.error("❌ Error loading user profile:", error);

      // Show error state but keep basic info
      setSelectedUser({
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        bio: "Failed to load profile details. Please try again.",
        location: user.location || "Philippines",
        rating: user.rating || 0,
        totalReviews: user.totalReviews || 0,
        joinDate: "Member",
        followers: 0,
        following: 0,
        isVerified: false,
        specialties: [],
        posts: [],
        error: true,
        loading: false,
      });

      // Show user-friendly error message
      alert("Unable to load full profile. Showing limited information.");
    }
  };

  const handleBackFromUserProfile = () => {
    setViewingUserProfile(false);
    setSelectedUser(null);
  };

  // Create conversation and navigate to chat tab
  const startConversation = async (receiverId) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setShowLoginModal(true);
      return;
    }

    const fd = new FormData();
    fd.append("receiver_id", receiverId);

    try {
      const endpoint = `chat/conversations/${userId}/create`;
      const res = await apiPostFormData(endpoint, fd, true);
      if (res && (res.status === "success" || res.success === true)) {
        // Close profile view and switch to chat tab
        setViewingUserProfile(false);
        setSelectedUser(null);
        setActiveTab("chat");
      } else {
        console.warn("Create conversation response:", res);
      }
    } catch (err) {
      console.error("Error creating conversation:", err);
    }
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

  const renderMainContent = () => {
    switch (activeTab) {
      case "home":
        if (viewingUserProfile && selectedUser) {
          return (
            <UserProfileView
              user={selectedUser}
              onBack={handleBackFromUserProfile}
              darkMode={darkMode}
              onMessage={startConversation}
            />
          );
        }
        return (
          <NewsFeed
            darkMode={darkMode}
            onCreatePost={handleCreatePost}
            postCategory={
              apiCategoryName === postCategory ? postCategory : apiCategoryName
            }
            postLocation={postLocation}
          />
        );
      case "chat":
        return <ChatInterface darkMode={darkMode} />;
      case "profile":
        return <UserProfile darkMode={darkMode} />;
      case "bookmarks":
        return <Bookmark darkMode={darkMode} />;
      case "notifications":
        return <Notifications darkMode={darkMode} />;
      default:
        return <NewsFeed darkMode={darkMode} onCreatePost={handleCreatePost} />;
    }
  };
  const selectedCategoryData = categories.find(
    (cat) => cat.id === postCategory
  );
  const selectedLocationData = locations.find((loc) => loc.id === postLocation);

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

  // Mobile Search Interface
  const MobileSearchInterface = () => (
    <div className="space-y-4">
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
                  style={{
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // Edge/IE
                  }}
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
              onChange={(e) => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                  return;
                }
                setUserSearchTerm(e.target.value);
              }}
              onClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                }
              }}
              className={`w-full pl-10 pr-10 py-2 rounded-lg border transition-colors ${
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

          {showUserResults && (
            <div
              className="space-y-2 max-h-64 overflow-hidden"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // Edge/IE
              }}
            >
              {usersLoading ? (
                <div
                  className={`text-center py-4 text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Searching...
                </div>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
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
                                darkMode ? "text-white" : "text-gray-900"
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
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <MapPin className="w-3 h-3" />
                            {/* FIXED: Changed from user.address to user.location */}
                            <span className="truncate">
                              {user.location || "No location set"}
                            </span>
                            <Star className="w-3 h-3 text-yellow-400 fill-current ml-2" />
                            <span>{user.rating || 0}</span>
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
              <div
                className={`hidden lg:flex gap-5 px-6 lg:px-12 ${
                  !viewingUserProfile ? "h-[680px] overflow-hidden" : ""
                }`}
              >
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
                          onChange={(e) => {
                            if (!isAuthenticated) return;
                            setUserSearchTerm(e.target.value);
                          }}
                          onFocus={(e) => {
                            if (!isAuthenticated) {
                              setShowLoginModal(true);
                              e.target.blur();
                            }
                          }}
                          readOnly={!isAuthenticated}
                          className={`w-full pl-10 pr-10 py-2 rounded-lg border transition-colors ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500"
                          } focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                            !isAuthenticated ? "cursor-pointer opacity-70" : ""
                          }`}
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

                      {showUserResults && (
                        <div
                          className="space-y-2 max-h-60 overflow-y-auto"
                          style={{
                            scrollbarWidth: "none", // Firefox
                            msOverflowStyle: "none", // Edge/IE
                          }}
                        >
                          {usersLoading ? (
                            <div
                              className={`text-center py-4 text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Searching...
                            </div>
                          ) : filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => {
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
                                            (user.user_type || user.type) ===
                                            "seller"
                                              ? darkMode
                                                ? "bg-blue-600 text-blue-100"
                                                : "bg-blue-100 text-blue-600"
                                              : (user.user_type ||
                                                  user.type) === "buyer"
                                              ? darkMode
                                                ? "bg-purple-600 text-purple-100"
                                                : "bg-purple-100 text-purple-600"
                                              : darkMode
                                              ? "bg-green-600 text-green-100"
                                              : "bg-green-100 text-green-600"
                                          }`}
                                        >
                                          {user.user_type || user.type}
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
                                        {/* FIXED: Changed from user.address to user.location */}
                                        <span className="truncate">
                                          {user.location || "No location set"}
                                        </span>
                                        <Star className="w-3 h-3 text-yellow-400 fill-current ml-2" />
                                        <span>{user.rating || 0}</span>
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

                    {/* Filter Posts Card */}
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
                              style={{
                                scrollbarWidth: "none", // Firefox
                                msOverflowStyle: "none", // Edge/IE
                              }}
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
                              style={{
                                scrollbarWidth: "none", // Firefox
                                msOverflowStyle: "none", // Edge/IE
                              }}
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

                {/* RIGHT ASIDE - Top Performers - Hide when viewing profile */}
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
                              Top Performers
                            </h3>
                          </div>
                          <div
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {topPerformers.length}{" "}
                            {topPerformers.length === 1
                              ? "performer"
                              : "performers"}
                          </div>
                        </div>
                      </div>

                      {/* Top Performers List */}
                      <div
                        className="flex-1 overflow-y-auto"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <div className="p-4 space-y-3">
                          {newsFeedLoading ? (
                            <div className="flex items-center justify-center py-8">
                              <div
                                className={`text-sm ${
                                  darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                Loading...
                              </div>
                            </div>
                          ) : topPerformers.length > 0 ? (
                            topPerformers.map((performer, index) => {
                              const rankBadge = getRankBadge(index);

                              return (
                                <div
                                  key={`performer-${performer.id}`}
                                  className={`${
                                    darkMode
                                      ? "bg-gray-700 hover:bg-gray-650"
                                      : "bg-gray-50 hover:bg-gray-100"
                                  } rounded-xl p-4 border-l-4 ${
                                    rankBadge.border
                                  } transition-all duration-200 hover:shadow-md group cursor-pointer`}
                                >
                                  <div className="flex items-center gap-4">
                                    {/* Rank Number */}
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
                                      {/* Avatar with Crown for #1 */}
                                      <div className="flex-shrink-0 relative">
                                        <img
                                          src={performer.avatar}
                                          alt={performer.name}
                                          className={`w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-offset-transparent transition-all ${
                                            index === 0
                                              ? "ring-yellow-400 group-hover:ring-yellow-500"
                                              : "group-hover:ring-green-400"
                                          }`}
                                        />
                                        {index === 0 && (
                                          <div className="absolute -top-1 -right-1">
                                            <svg
                                              className="w-5 h-5 text-yellow-500"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                          </div>
                                        )}
                                      </div>

                                      {/* User Info */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h4
                                            className={`font-semibold text-sm truncate ${
                                              darkMode
                                                ? "text-white"
                                                : "text-gray-900"
                                            }`}
                                          >
                                            {performer.name}
                                          </h4>
                                          {performer.isVerified && (
                                            <svg
                                              className="w-4 h-4 text-green-500 flex-shrink-0"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          )}
                                        </div>

                                        {/* Location */}
                                        {/* Location - ✅ FIXED */}
                                        <div
                                          className={`flex items-center gap-1 text-xs mb-2 ${
                                            darkMode
                                              ? "text-gray-400"
                                              : "text-gray-500"
                                          }`}
                                        >
                                          <MapPin className="w-3 h-3 flex-shrink-0" />
                                          <span className="truncate">
                                            {performer.location ||
                                              "No location set"}{" "}
                                            {/* ✅ USE performer.location */}
                                          </span>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1">
                                          {[...Array(5)].map((_, i) => (
                                            <Star
                                              key={i}
                                              className={`w-3 h-3 ${
                                                i < Math.floor(performer.rating)
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
                                            {performer.rating.toFixed(1)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div
                              className={`text-center py-8 ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              <TrendingUp
                                className={`w-12 h-12 mx-auto mb-2 ${
                                  darkMode ? "text-gray-600" : "text-gray-300"
                                }`}
                              />
                              <p className="text-sm">
                                No top performers available
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </aside>
                )}
              </div>
            </>
          ) : (
            // For Chat & Profile -> Different layouts
            <div
              className={
                activeTab === "profile"
                  ? "max-w-3xl mx-auto px-4 lg:px-0"
                  : "w-full px-4 lg:px-6"
              }
            >
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
        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          darkMode={darkMode}
        />
      </div>
    </AuthProvider>
  );
};

export default Mainboard;
