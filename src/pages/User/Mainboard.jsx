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

const handlePostCreated = () => {
  // Call refresh on NewsFeed
  // You'll need to expose this method via ref or callback
};
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



  // Top Participants states


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
    { id: "rabbit", name: "Rabbit", icon: Rabbit },
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

 // Updated allUsers array with sellers only
const allUsers = [
  {
    name: "Clark Oclarit",
    username: "@clarkoclarit",
    bio: "Experienced livestock seller specializing in pigs and cattle. Providing quality animals to farmers across Central Luzon for over 10 years.",
    location: "abelo",
    avatar: "https://i.pravatar.cc/150?img=1",
    coverPhoto: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=300&fit=crop",
    phone: "+63 912 345 6789",
    joinDate: "Joined June 2023",
    followers: 156,
    following: 89,
    posts: 45,
    rating: 4.8,
    totalReviews: 32,
    isVerified: true,
    userType: "seller",
    totalListings: 120,
    specialties: ["baboy", "baka"],
    type: "seller",
    userPosts: [],
    reviews: []
  },
  {
    name: "Joshbee Mendoza Atienza",
    username: "@joshbeemendozaatienza",
    bio: "Fish farming specialist with premium bangus and tilapia. Fresh from our ponds in Alas-as.",
    location: "alas-as",
    avatar: "https://i.pravatar.cc/150?img=2",
    coverPhoto: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=300&fit=crop",
    phone: "+63 923 456 7890",
    joinDate: "Joined June 2023",
    followers: 203,
    following: 67,
    posts: 32,
    rating: 4.9,
    totalReviews: 28,
    isVerified: true,
    userType: "seller",
    totalListings: 95,
    specialties: ["bangus", "tilapia"],
    type: "seller",
    userPosts: [],
    reviews: []
  },
  {
    name: "Maricel Bautista",
    username: "@maricelbautista",
    bio: "Dedicated goat farmer with premium quality breeding goats raised in Balete.",
    location: "balete",
    avatar: "https://i.pravatar.cc/150?img=7",
    coverPhoto: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=300&fit=crop",
    phone: "+63 911 234 5678",
    joinDate: "Joined June 2023",
    followers: 178,
    following: 54,
    posts: 22,
    rating: 4.7,
    totalReviews: 19,
    isVerified: true,
    userType: "seller",
    totalListings: 88,
    specialties: ["kambing"],
    type: "seller",
    userPosts: [],
    reviews: []
  },
  {
    name: "Rommel Dela Cruz",
    username: "@rommeldelacruz",
    bio: "Trusted cattle trader supplying premium beef cattle across Batangas and nearby provinces.",
    location: "san isidro",
    avatar: "https://i.pravatar.cc/150?img=8",
    coverPhoto: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=300&fit=crop",
    phone: "+63 922 345 6789",
    joinDate: "Joined June 2023",
    followers: 260,
    following: 98,
    posts: 39,
    rating: 4.8,
    totalReviews: 25,
    isVerified: true,
    userType: "seller",
    totalListings: 110,
    specialties: ["baka"],
    type: "seller",
    userPosts: [],
    reviews: []
  },
  {
    name: "Justine Roco",
    username: "@justineroco",
    bio: "Large-scale livestock breeder specializing in goats and water buffalo. Quality breeding stock available.",
    location: "balete",
    avatar: "https://i.pravatar.cc/150?img=3",
    coverPhoto: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=300&fit=crop",
    phone: "+63 934 567 8901",
    joinDate: "Joined June 2023",
    followers: 342,
    following: 124,
    posts: 67,
    rating: 4.7,
    totalReviews: 41,
    isVerified: true,
    userType: "seller",
    totalListings: 200,
    specialties: ["kambing", "kalabaw"],
    type: "seller",
    userPosts: [],
    reviews: []
  },
  {
    name: "Angela Encarnacion",
    username: "@angelaencarnacion",
    bio: "Premium poultry breeder specializing in pigeons and chickens. Award-winning bloodlines available.",
    location: "baluk-baluk",
    avatar: "https://i.pravatar.cc/150?img=4",
    coverPhoto: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=300&fit=crop",
    phone: "+63 945 678 9012",
    joinDate: "Joined June 2023",
    followers: 189,
    following: 93,
    posts: 28,
    rating: 5.0,
    totalReviews: 18,
    isVerified: true,
    userType: "seller",
    totalListings: 75,
    specialties: ["kalapati", "manok"],
    type: "seller",
    userPosts: [],
    reviews: []
  },
  {
    name: "Venus De Ramos",
    username: "@venusderamos",
    bio: "Specialty birds and rabbit breeder. Focusing on ducks and domestic rabbits for meat and breeding.",
    location: "bancoro",
    avatar: "https://i.pravatar.cc/150?img=5",
    coverPhoto: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=300&fit=crop",
    phone: "+63 956 789 0123",
    joinDate: "Joined June 2023",
    followers: 127,
    following: 76,
    posts: 21,
    rating: 4.6,
    totalReviews: 15,
    isVerified: false,
    userType: "seller",
    totalListings: 60,
    specialties: ["pato", "rabbit"],
    type: "seller",
    userPosts: [],
    reviews: []
  },
  {
    name: "John Lei Sabangan",
    username: "@johnleisabangan",
    bio: "Duck and rabbit farming specialist. Providing quality animals for sustainable farming in Bancoro.",
    location: "bancoro",
    avatar: "https://i.pravatar.cc/150?img=6",
    coverPhoto: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=300&fit=crop",
    phone: "+63 967 890 1234",
    joinDate: "Joined June 2023",
    followers: 143,
    following: 82,
    posts: 19,
    rating: 4.6,
    totalReviews: 12,
    isVerified: true,
    userType: "seller",
    totalListings: 60,
    specialties: ["pato", "rabbit"],
    type: "seller",
    userPosts: [],
    reviews: []
  },
  {
    name: "Eduardo Villanueva",
    username: "@eduardovillanueva",
    bio: "Sheep and goat farmer with a focus on organic livestock raising in San Luis.",
    location: "san luis",
    avatar: "https://i.pravatar.cc/150?img=9",
    coverPhoto: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=300&fit=crop",
    phone: "+63 935 678 9012",
    joinDate: "Joined June 2023",
    followers: 98,
    following: 45,
    posts: 15,
    rating: 4.5,
    totalReviews: 9,
    isVerified: false,
    userType: "seller",
    totalListings: 40,
    specialties: ["tupa", "kambing"],
    type: "seller",
    userPosts: [],
    reviews: []
  },
  {
    name: "Kristine Aguilar",
    username: "@kristineaguilar",
    bio: "Chicken and duck farming expert providing quality poultry for Batangas households.",
    location: "alas-as",
    avatar: "https://i.pravatar.cc/150?img=10",
    coverPhoto: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&h=300&fit=crop",
    phone: "+63 936 789 0124",
    joinDate: "Joined June 2023",
    followers: 154,
    following: 68,
    posts: 24,
    rating: 4.7,
    totalReviews: 14,
    isVerified: true,
    userType: "seller",
    totalListings: 55,
    specialties: ["manok", "pato"],
    type: "seller",
    userPosts: [],
    reviews: []
  }
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

  
  // Show/hide user search results - Fixed to persist when clicking results
  useEffect(() => {
    setShowUserResults(userSearchTerm.trim().length > 0);
  }, [userSearchTerm]);
 // Keep search results visible when viewing profile on mobile
  const handleMobileUserProfileView = (user) => {
    setSelectedUser(user);
    setViewingUserProfile(true);
    setMobileTab("home");
    // Don't clear search term to keep context
  };

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
        try {
          return (
           <NewsFeed
  darkMode={darkMode}
  onCreatePost={handleCreatePost}
  categoryFilter={postCategory}
  locationFilter={postLocation}
  />
          );
        } catch (error) {
          return (
            <div className={`p-6 rounded-lg ${darkMode ? "bg-red-900 text-white" : "bg-red-100 text-red-800"}`}>
              <h2 className="font-bold mb-2">Error rendering NewsFeed</h2>
              <pre className="whitespace-pre-wrap">{error.message}</pre>
            </div>
          );
        }
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
  onChange={(e) => {
    if (isAuthenticated) {
      setUserSearchTerm(e.target.value);
    } else {
      setShowLoginModal(true); // Show login form if not logged in
    }
  }}
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
              Top Sellers
            </h3>
          </div>
          <div
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {sellers.length} sellers
          </div>
        </div>
      </div>

      {/* Sellers List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {sellers.map((user, index) => {
            const userLocation = locations?.find(
              (loc) => loc.id === user.location
            );
            const rankBadge = getRankBadge(index);

            return (
              <div
                key={`seller-${index}`}
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
                  {/* Clean Rank Number */}
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
                    {/* Avatar */}
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