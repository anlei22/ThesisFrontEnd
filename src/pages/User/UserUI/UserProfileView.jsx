import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  QrCode,
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  MoreHorizontal,
  Send,
  X,
  Camera,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Flag,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { ShareIcon } from "@heroicons/react/24/outline";
import ProfileQRModal from "../../../components/profileQrModal";
import { QRCodeCanvas } from "qrcode.react";
import { apiPost } from "../../../context/utils/apiPost";
import { apiPostFormData } from "../../../context/utils/apiFormData";
import { apiGet } from "../../../context/utils/apiGet";

import default_profile from "../../defaultprofile/default_profile.jpg";

const ShareModal = ({
  isOpen,
  onClose,
  darkMode,
  postId,
  title = "Animal Post",
}) => {
  const [shareUrl, setShareUrl] = useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined" && postId) {
      const appUrl = (
        import.meta.env.VITE_APP_URL || window.location.origin
      ).replace(/\/+$/, "");
      setShareUrl(`${appUrl}/post/${postId}`);
    }
  }, [postId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg p-6 w-full max-w-md mx-auto ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <ShareIcon
              className={`w-6 h-6 ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            />
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Share Post
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors duration-200 ${
              darkMode
                ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            ✕
          </button>
        </div>

        <p
          className={`text-sm mb-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {title}
        </p>

        {/* QR CODE SECTION - NEW! */}
        {shareUrl && (
          <div className="text-center mb-6">
            <div
              className={`inline-block p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <QRCodeCanvas
                value={shareUrl}
                size={200}
                bgColor={darkMode ? "#1f2937" : "#ffffff"}
                fgColor={darkMode ? "#10b981" : "#059669"}
                level="H"
                includeMargin={true}
              />
            </div>
            <p
              className={`text-sm mt-2 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Scan QR code to view this post
            </p>
          </div>
        )}

        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Share Link
          </label>
          <div className="flex">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className={`flex-1 px-3 py-2 text-sm rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
            />
            <button
              onClick={copyToClipboard}
              className={`px-3 py-2 rounded-r-lg border border-l-0 transition-colors duration-200 ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700 border-green-600 text-white"
                  : "bg-green-500 hover:bg-green-600 border-green-500 text-white"
              }`}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`,
                "_blank"
              )
            }
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Facebook
          </button>
          <button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl
                )}&text=${encodeURIComponent(title)}`,
                "_blank"
              )
            }
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              darkMode
                ? "bg-sky-600 hover:bg-sky-700 text-white"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

const COLORS = {
  dark: {
    bg: "bg-gray-900",
    card: "bg-gray-800",
    text: "text-white",
    muted: "text-gray-400",
    border: "border-gray-700",
  },
  light: {
    bg: "bg-gray-50",
    card: "bg-white",
    text: "text-gray-900",
    muted: "text-gray-600",
    border: "border-gray-200",
  },
};

const DEFAULT_USER = {
  name: "Juan Dela Cruz",
  username: "@juandelacruz",
  avatar: default_profile, // Change this line
  coverPhoto: "",
  bio: "Professional livestock farmer specializing in cattle and poultry.",
  location: "Nueva Ecija, Philippines",
  joinDate: "Joined March 2023",
  rating: 4.8,
  totalReviews: 127,
  followers: 1234,
  following: 567,
  isVerified: true,
  specialties: ["Cattle", "Poultry", "Goats"],
};

const SAMPLE_POSTS = [
  {
    id: 1,
    content:
      "Beautiful healthy cattle ready for sale! Vaccinated and well-maintained.",
    avatar: default_profile, // Change this line
    likes: 145,
    comments: 23,
    bookmarks: 45,
    timestamp: "2 hours ago",
    isLiked: false,
    isBookmarked: false,
    animalInfo: {
      title: "Premium Cattle",
      type: "Cattle",
      breed: "Brahman",
      age: "2 years",
      sex: "Male",
      price: "₱85,000",
      availability: "available",
      description:
        "Premium quality Brahman cattle in excellent health condition. Regularly vaccinated and dewormed. Perfect for breeding or meat production. Well-trained and easy to handle.",
    },
  },
];

const SAMPLE_REVIEWS = [
  {
    id: 1,
    user: {
      name: "Maria Santos",
      avatar: default_profile, // Change this line
    },
    rating: 5,
    text: "Excellent seller! The cattle were in perfect condition as described. Very professional and knowledgeable.",
    timestamp: "2 weeks ago",
  },
];

const INITIAL_COMMENTS = [
  {
    id: 1,
    user: {
      name: "Maria Santos",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    text: "Interested in this cattle! Can you provide more details about vaccination records?",
    timestamp: "1 hour ago",
    likes: 3,
    replies: [
      {
        id: 101,
        user: {
          name: "Juan Dela Cruz",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        },
        text: "Hi Maria! Yes, all vaccination records are available. I can send them to you.",
        timestamp: "45 minutes ago",
        likes: 1,
      },
    ],
  },
];

// Rating Stars
const RatingStars = ({ rating, darkMode }) => (
  <div className="flex items-center space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating || 0)
            ? "text-yellow-400 fill-current"
            : darkMode
            ? "text-gray-600"
            : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

// Post Grid Item
const PostGridItem = ({ post, onClick }) => (
  <button
    onClick={onClick}
    className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
  >
    <img
      src={post.images[0]}
      alt={post.animalInfo.title}
      className="w-full h-full object-cover transition-transform group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
      <div className="opacity-0 group-hover:opacity-100 text-white flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Heart className="w-5 h-5 fill-current" />
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  </button>
);

// Profile Card Preview Component (shown when QR is scanned)
const ProfileCardPreview = ({ user, darkMode, onViewProfile }) => {
  const COLORS = {
    dark: {
      bg: "bg-gray-900",
      card: "bg-gray-800",
      text: "text-white",
      muted: "text-gray-400",
      border: "border-gray-700",
    },
    light: {
      bg: "bg-gray-50",
      card: "bg-white",
      text: "text-gray-900",
      muted: "text-gray-600",
      border: "border-gray-200",
    },
  };

  const scheme = darkMode ? COLORS.dark : COLORS.light;

  return (
    <div
      className={`w-full max-w-sm rounded-2xl overflow-hidden shadow-xl ${scheme.card}`}
    >
      {/* Cover Photo */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={user.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center -mt-16 mb-4 px-6">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
          {user.isVerified && (
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 pb-6 text-center">
        <h2 className={`text-xl font-bold mb-1 ${scheme.text}`}>{user.name}</h2>
        <p className={`text-sm mb-2 ${scheme.muted}`}>{user.username}</p>

        {/* Seller/Buyer Badge */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Verified Seller
          </span>
        </div>

        {/* Location */}
        <div
          className={`flex items-center justify-center space-x-1 mb-4 ${scheme.muted}`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{user.location}</span>
        </div>

        {/* Rating */}
        <div
          className={`flex items-center justify-center space-x-2 mb-6 p-3 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <RatingStars rating={user.rating} darkMode={darkMode} />
          <span className={`text-sm font-medium ${scheme.text}`}>
            {user.rating.toFixed(1)} ({user.totalReviews} reviews)
          </span>
        </div>

        {/* Contact Button */}
        <button
          onClick={onViewProfile}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>View Full Profile</span>
        </button>
      </div>
    </div>
  );
};
const getUserTypeBadge = (type, darkMode) => {
  const types = {
    buyer: {
      light: "bg-purple-100 text-purple-600",
      dark: "bg-purple-600 text-purple-100",
      label: "Buyer",
    },
    seller: {
      light: "bg-blue-100 text-blue-600",
      dark: "bg-blue-600 text-blue-100",
      label: "Seller",
    },
    both: {
      light: "bg-green-100 text-green-600",
      dark: "bg-green-600 text-green-100",
      label: "Buyer & Seller",
    },
  };

  const typeConfig = types[type] || types.both;
  return {
    className: darkMode ? typeConfig.dark : typeConfig.light,
    label: typeConfig.label,
  };
};
// QR Code Modal Component

// Post List Item
// CORRECT: PostListItem Component with Share Button
const PostListItem = ({
  post,
  user,
  darkMode,
  likedPosts,
  bookmarkedPosts,
  onLike,
  onBookmark,
  onImageClick,
  onShare, // ✅ ADD THIS PROP
}) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  

  return (
    <div
      className={`rounded-lg border overflow-hidden relative ${scheme.card} ${scheme.border}`}
    >
      {/* Diagonal Ribbon */}
      {post.animalInfo && (
        <div className="absolute top-0 right-0 w-32 h-35 overflow-hidden z-10">
          <div
            className={`absolute top-4 right-[-32px] w-40 h-8 transform rotate-45 text-center text-white text-xs font-bold leading-8 shadow-lg ${
              post.animalInfo.availability === "available"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {post.animalInfo.availability === "available"
              ? "AVAILABLE"
              : "SOLD OUT"}
          </div>
        </div>
      )}

      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-1">
                <h3 className={`font-semibold ${scheme.text}`}>{user.name}</h3>
                {user.isVerified && (
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className={`text-sm ${scheme.muted}`}>{post.timestamp}</p>
            </div>
          </div>
          <button
            className={`p-2 rounded-full hover:opacity-80 ${scheme.muted}`}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        {post.animalInfo && (
          <div className="mt-4">
            <h3
              className={`text-lg font-semibold mb-1 text-center ${
                darkMode ? "text-green-200" : "text-green-800"
              }`}
            >
              {post.animalInfo.title}
            </h3>

            {post.animalInfo.description && (
              <div className="mb-2 text-center">
                <p
                  className={`text-sm leading-relaxed ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {post.animalInfo.description}
                </p>
              </div>
            )}

            <div className="flex justify-center items-center">
              <span
                className={`text-lg font-bold ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                {post.animalInfo.price}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Images */}
      {post.images?.length > 0 && (
        <div className="px-6 pb-4">
          <div
            className={`grid gap-2 rounded-lg overflow-hidden cursor-pointer hover:opacity-95 transition-opacity ${
              post.images.length === 1
                ? "grid-cols-1"
                : post.images.length === 2
                ? "grid-cols-2"
                : post.images.length === 3
                ? "grid-cols-2"
                : "grid-cols-2"
            }`}
            onClick={() => onImageClick(post)}
          >
            {post.images.slice(0, 4).map((image, i) => (
              <div
                key={i}
                className={`relative ${
                  post.images.length === 3 && i === 0 ? "row-span-2" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`Post ${i}`}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "200px", maxHeight: "400px" }}
                />
                {i === 3 && post.images.length > 4 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">
                      +{post.images.length - 4}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div
        className={`px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-sm ${scheme.muted}`}
      >
        <span>{post.likes} likes</span> &nbsp;{" "}
        <span>{post.comments} comments</span> &nbsp;{" "}
        <span>{post.bookmarks} bookmarks</span>
      </div>

      {/* Actions */}
      <div
        className={`flex items-center justify-around border-t py-2 ${scheme.border}`}
      >
        {/* Like Button */}
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            post.isLiked
              ? darkMode
                ? "text-green-400 bg-gray-700"
                : "text-green-600 bg-green-50"
              : darkMode
              ? "text-gray-400 hover:bg-gray-700 hover:text-green-400"
              : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              post.isLiked ? "fill-current scale-110" : ""
            }`}
          />
          <span className="text-sm font-medium"></span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => onImageClick(post)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            darkMode
              ? "text-gray-400 hover:bg-gray-700 hover:text-blue-400"
              : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium"></span>
        </button>

        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark(post.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            post.isBookmarked
              ? darkMode
                ? "text-yellow-400 bg-gray-700"
                : "text-yellow-600 bg-yellow-50"
              : darkMode
              ? "text-gray-400 hover:bg-gray-700 hover:text-yellow-400"
              : "text-gray-600 hover:bg-gray-100 hover:text-yellow-600"
          }`}
        >
          <Bookmark
            className={`w-5 h-5 transition-all ${
              post.isBookmarked ? "fill-current scale-110" : ""
            }`}
          />
          <span className="text-sm font-medium"></span>
        </button>

        {/* Share Button */}
        <button
          onClick={() => onShare(post)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            darkMode
              ? "text-gray-400 hover:bg-gray-700 hover:text-green-400"
              : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
          }`}
        >
          <ShareIcon className="w-5 h-5" />
          <span className="text-sm font-medium"></span>
        </button>
      </div>
    </div>
  );
};

// Review Item (robust to missing user object)
const ReviewItem = ({ review, darkMode }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;

  const raterName = review?.user?.name || review?.name || "Anonymous";
  const avatarUrl =
    review?.user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(raterName)}&background=6ee7b7&color=000`;
  const text = review?.text || review?.feedback || "";
  const rawTimestamp = review?.timestamp || review?.created_at || "";

  // Format timestamps: show relative time for recent dates, otherwise a short human date.
  let formattedTimestamp = rawTimestamp;
  if (rawTimestamp && rawTimestamp !== "just now") {
    const parsed = new Date(rawTimestamp);
    if (!Number.isNaN(parsed.getTime())) {
      const now = new Date();
      const diffSeconds = Math.floor((now - parsed) / 1000);
      if (diffSeconds < 60) {
        formattedTimestamp = `${diffSeconds}s ago`;
      } else if (diffSeconds < 3600) {
        formattedTimestamp = `${Math.floor(diffSeconds / 60)}m ago`;
      } else if (diffSeconds < 86400) {
        formattedTimestamp = `${Math.floor(diffSeconds / 3600)}h ago`;
      } else {
        formattedTimestamp = parsed.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
    }
  }

  return (
    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
      <div className="flex items-start space-x-3">
        <img src={avatarUrl} alt={raterName} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`font-semibold ${scheme.text}`}>{raterName}</h4>
            <span className={`text-xs ${scheme.muted}`}>{formattedTimestamp}</span>
          </div>
          <RatingStars rating={review?.rating || 0} darkMode={darkMode} />
          <p className={`mt-2 text-sm ${scheme.text}`}>{text}</p>
        </div>
      </div>
    </div>
  );
};

// Post Modal
// ✅ Update PostModal function signature
const PostModal = ({
  post,
  user,
  darkMode,
  onClose,
  isAuthenticated = true,
  onShare,
  postComments,
  setPostComments,
  onLike, // ✅ ADD THIS
  onBookmark, // ✅ ADD THIS
}) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportComment, setReportComment] = useState("");

  // ✅ FIX 1: Use post's like/bookmark state
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked || false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [bookmarks, setBookmarks] = useState(post?.bookmarks || 0);
  const [commentLikes, setCommentLikes] = useState({});




  const reportReasons = [
    "Spam or misleading",
    "Inappropriate content",
    "False information",
    "Animal welfare concerns",
    "Scam or fraud",
    "Other",
  ];

  const getCurrentUserId = () => {
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userId = parsedUser?.id;
        } catch (e) {}
      }
    }
    return userId ? parseInt(userId) : null;
  };

  useEffect(() => {
    if (post?.id && postComments[post.id]) {
      setComments(postComments[post.id]);

      // Initialize like counts for all comments and replies
      const likes = {};
      postComments[post.id].forEach((comment) => {
        likes[comment.id] = comment.likes || 0;
        if (comment.replies) {
          comment.replies.forEach((reply) => {
            likes[reply.id] = reply.likes || 0;
          });
        }
      });
      setCommentLikes(likes);
    }
  }, [post?.id, postComments]);
  // ✅ FETCH PROFILE DATA FROM API

  // ADD THIS useEffect near the top with other useState (around line 1100)
  // Sync modal state with parent post state
  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked || false);
      setIsBookmarked(post.isBookmarked || false);
      setLikes(post.likes || 0);
      setBookmarks(post.bookmarks || 0);
    }
  }, [
    post?.id,
    post?.isLiked,
    post?.isBookmarked,
    post?.likes,
    post?.bookmarks,
  ]);

  const handleLike = async () => {
    if (onLike) {
      // Call parent handler which updates everything
      await onLike(post.id);
    }
  };
  // Handle Bookmark
  const handleBookmark = async () => {
    if (onBookmark) {
      // Call parent handler which updates everything
      await onBookmark(post.id);
    }
  };
  // Handle Like Comment
  const handleCommentLike = (commentId) => {
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1,
    }));
  };

  // Handle Like Reply
  const handleReplyLike = (replyId) => {
    setCommentLikes((prev) => ({
      ...prev,
      [replyId]: (prev[replyId] || 0) + 1,
    }));
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    const userId = getCurrentUserId();
    if (!userId) {
      alert("Please log in to comment");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("feed_id", post.id);
    formData.append("comments", commentText);

    try {
      const response = await apiPostFormData("add/add-comment", formData, true);

      const newComment = {
        id: response.data?.id || Date.now(),
        user: {
          name: "You",
          avatar:
            "https://ui-avatars.com/api/?name=You&background=10b981&color=fff",
        },
        text: commentText,
        timestamp: "Just now",
        likes: 0,
        replies: [],
      };

      // ✅ Update both local state and parent state
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      setPostComments((prev) => ({
        ...prev,
        [post.id]: updatedComments,
      }));

      setCommentLikes((prev) => ({
        ...prev,
        [newComment.id]: 0,
      }));

      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment");
    }
  };
  // Add Reply
  const handleAddReply = async (commentId) => {
    if (!replyText.trim()) return;

    const userId = getCurrentUserId();
    if (!userId) {
      alert("Please log in to reply");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("reply", replyText);
    formData.append("comment_section_id", commentId);

    try {
      const response = await apiPostFormData(
        `comments/reply/${commentId}`,
        formData,
        true
      );

      const newReply = {
        id: response.data?.id || Date.now(),
        user: {
          name: "You",
          avatar:
            "https://ui-avatars.com/api/?name=You&background=10b981&color=fff",
        },
        text: replyText,
        timestamp: "Just now",
        likes: 0,
      };

      // ✅ Update comments with new reply
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      });

      setComments(updatedComments);
      setPostComments((prev) => ({
        ...prev,
        [post.id]: updatedComments,
      }));

      setCommentLikes((prev) => ({
        ...prev,
        [newReply.id]: 0,
      }));

      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      console.error("Error adding reply:", err);
      alert("Failed to add reply");
    }
  };

  const handleReportSubmit = async () => {
    if (!reportReason) {
      alert("Please select a reason for reporting");
      return;
    }

    const userId = getCurrentUserId();
    if (!userId) {
      alert("You must be logged in to report a post");
      return;
    }

    const fd = new FormData();
    fd.append("post_id", post?.id ?? "");
    fd.append("reason", reportReason);
    fd.append("description", reportComment || "");
    fd.append("report_by", userId);

    try {
      const res = await apiPostFormData("reports/create", fd, true);
      alert("Thank you for your report. We will review it shortly.");
      setShowReportModal(false);
      setShowReportMenu(false);
      setReportReason("");
      setReportComment("");
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("An error occurred while sending the report.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />

        <div
          className={`relative rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${scheme.card}`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-6 border-b ${scheme.border}`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className={`text-xl font-semibold ${scheme.text}`}>
                  {post.animalInfo.title}
                </h2>
                <div className="flex items-center space-x-4 mt-1">
                  <p className={scheme.muted}>by {user.name}</p>
                  <span className={scheme.muted}>•</span>
                  <p className={`text-sm ${scheme.muted}`}>{post.timestamp}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setShowReportMenu(!showReportMenu)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <MoreVertical className="w-6 h-6" />
                  </button>

                  {showReportMenu && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                        darkMode
                          ? "bg-gray-700 border border-gray-600"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setShowReportModal(true);
                          setShowReportMenu(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors ${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Flag className="w-5 h-5 text-red-500" />
                        <span>Report Post</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={onClose}
                className={`p-2 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className="overflow-y-auto max-h-[calc(90vh-120px)]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="p-6">
              {/* Images */}
              {post.images && post.images.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    <img
                      src={post.images[currentImageIndex]}
                      alt={post.animalInfo.title}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                    {post.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev === 0 ? post.images.length - 1 : prev - 1
                            )
                          }
                          className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg ${
                            darkMode
                              ? "bg-gray-700 bg-opacity-80"
                              : "bg-white bg-opacity-80"
                          }`}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev === post.images.length - 1 ? 0 : prev + 1
                            )
                          }
                          className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg ${
                            darkMode
                              ? "bg-gray-700 bg-opacity-80"
                              : "bg-white bg-opacity-80"
                          }`}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                          {post.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full ${
                                index === currentImageIndex
                                  ? "bg-white"
                                  : "bg-white bg-opacity-50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {post.images.length > 1 && (
                    <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                      {post.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                            index === currentImageIndex
                              ? "border-green-500"
                              : darkMode
                              ? "border-gray-600"
                              : "border-gray-200"
                          }`}
                        >
                          <img
                            src={image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className={`text-lg font-medium mb-3 ${scheme.text}`}>
                  Description
                </h3>
                <p
                  className={`leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {post.animalInfo.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-5">
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>
                      Animal Type
                    </h4>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode
                          ? "bg-green-900 text-green-200"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {post.animalInfo.type}
                    </span>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>
                      Age & Sex
                    </h4>
                    <p className={darkMode ? "text-gray-400" : "text-gray-700"}>
                      {post.animalInfo.age} • {post.animalInfo.sex}
                    </p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>
                      Status
                    </h4>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        post.animalInfo.availability === "available"
                          ? darkMode
                            ? "bg-green-900 text-green-200"
                            : "bg-green-100 text-green-800"
                          : darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {post.animalInfo.availability}
                    </span>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>
                      Location
                    </h4>
                    <div className="flex items-start space-x-2">
                      <MapPin
                        className={`w-4 h-4 ${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {user.location}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>
                      Price
                    </h4>
                    <p className="text-lg font-bold text-green-600">
                      {post.animalInfo.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {isAuthenticated && (
                <div
                  className={`flex items-center justify-between p-4 rounded-lg mb-6 ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>
                        {likes}
                      </p>
                      <p className={`text-xs ${scheme.muted}`}>Likes</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>
                        {bookmarks}
                      </p>
                      <p className={`text-xs ${scheme.muted}`}>Bookmarks</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>
                        {comments.length}
                      </p>
                      <p className={`text-xs ${scheme.muted}`}>Comments</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div
                className={`flex items-center p-3 rounded-lg mb-6 border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } ${isAuthenticated ? "justify-around" : "justify-between"}`}
              >
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isLiked
                          ? darkMode
                            ? "text-green-400 bg-gray-600"
                            : "text-green-600 bg-green-100"
                          : darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {isLiked ? (
                        <Heart className="w-5 h-5 fill-current" />
                      ) : (
                        <Heart className="w-5 h-5" />
                      )}
                      <span className="font-medium">Like</span>
                    </button>
                    <button
                      onClick={handleBookmark}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isBookmarked
                          ? darkMode
                            ? "text-yellow-400 bg-gray-600"
                            : "text-yellow-600 bg-yellow-100"
                          : darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {isBookmarked ? (
                        <Bookmark className="w-5 h-5 fill-current" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                      <span className="font-medium">Bookmark</span>
                    </button>
                    <button
                      onClick={() => onShare(post)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Share className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onShare(post)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Share className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                    <div
                      className={`text-center px-4 py-2 text-sm ${scheme.muted}`}
                    >
                      Login to like, comment & save
                    </div>
                  </>
                )}
              </div>

              {/* Comments Section */}
              {isAuthenticated && (
                <div className={`border-t pt-4 ${scheme.border}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${scheme.text}`}>
                    Comments ({comments.length})
                  </h3>

                  {/* Add Comment */}
                  <div className="mb-6">
                    <div
                      className={`flex space-x-3 p-3 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold">U</span>
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Write a comment..."
                          rows="3"
                          className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            darkMode
                              ? "bg-gray-600 text-white placeholder-gray-400"
                              : "bg-white text-gray-900 placeholder-gray-500 border border-gray-200"
                          }`}
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={handleAddComment}
                            disabled={!commentText.trim()}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              commentText.trim()
                                ? darkMode
                                  ? "bg-green-600 hover:bg-green-700 text-white"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                                : darkMode
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id}>
                          <div
                            className={`flex space-x-3 p-3 rounded-lg ${
                              darkMode ? "bg-gray-700" : "bg-gray-50"
                            }`}
                          >
                            <img
                              src={comment.user.avatar}
                              alt={comment.user.name}
                              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <h4
                                    className={`font-semibold text-sm ${
                                      darkMode ? "text-white" : "text-gray-900"
                                    }`}
                                  >
                                    {comment.user.name}
                                  </h4>
                                  <p
                                    className={`text-xs ${
                                      darkMode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {comment.timestamp}
                                  </p>
                                </div>
                              </div>
                              <p
                                className={`text-sm mb-2 ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {comment.text}
                              </p>

                              <div className="flex items-center space-x-4">
                                <button
                                  onClick={() => handleCommentLike(comment.id)}
                                  className={`flex items-center space-x-1 text-xs transition-colors ${
                                    darkMode
                                      ? "text-gray-400 hover:text-green-400"
                                      : "text-gray-600 hover:text-green-600"
                                  }`}
                                >
                                  <Heart className="w-4 h-4" />
                                  <span>
                                    {(commentLikes[comment.id] || 0) > 0
                                      ? commentLikes[comment.id]
                                      : "Like"}
                                  </span>
                                </button>

                                <button
                                  onClick={() => setReplyingTo(comment.id)}
                                  className={`text-xs transition-colors ${
                                    darkMode
                                      ? "text-gray-400 hover:text-green-400"
                                      : "text-gray-600 hover:text-green-600"
                                  }`}
                                >
                                  Reply
                                </button>

                                {comment.replies &&
                                  comment.replies.length > 0 && (
                                    <span
                                      className={`text-xs ${
                                        darkMode
                                          ? "text-gray-500"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      {comment.replies.length}{" "}
                                      {comment.replies.length === 1
                                        ? "reply"
                                        : "replies"}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          {/* Reply Input */}
                          {replyingTo === comment.id && (
                            <div
                              className={`ml-12 mt-2 p-3 rounded-lg ${
                                darkMode ? "bg-gray-700" : "bg-gray-50"
                              }`}
                            >
                              <div className="flex space-x-3">
                                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-semibold text-xs">
                                    U
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <textarea
                                    value={replyText}
                                    onChange={(e) =>
                                      setReplyText(e.target.value)
                                    }
                                    placeholder={`Reply to ${comment.user.name}...`}
                                    rows="2"
                                    autoFocus
                                    className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                      darkMode
                                        ? "bg-gray-600 text-white placeholder-gray-400"
                                        : "bg-white text-gray-900 placeholder-gray-500 border border-gray-200"
                                    }`}
                                  />
                                  <div className="flex justify-end space-x-2 mt-2">
                                    <button
                                      onClick={() => setReplyingTo(null)}
                                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                        darkMode
                                          ? "bg-gray-600 hover:bg-gray-500 text-gray-300"
                                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                      }`}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleAddReply(comment.id)}
                                      disabled={!replyText.trim()}
                                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                        replyText.trim()
                                          ? darkMode
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-green-500 hover:bg-green-600 text-white"
                                          : darkMode
                                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                      }`}
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Replies List */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-12 mt-2 space-y-2">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className={`flex space-x-3 p-3 rounded-lg ${
                                    darkMode ? "bg-gray-700" : "bg-gray-50"
                                  }`}
                                >
                                  <img
                                    src={reply.user.avatar}
                                    alt={reply.user.name}
                                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <div>
                                        <h4
                                          className={`font-semibold text-sm ${
                                            darkMode
                                              ? "text-white"
                                              : "text-gray-900"
                                          }`}
                                        >
                                          {reply.user.name}
                                        </h4>
                                        <p
                                          className={`text-xs ${
                                            darkMode
                                              ? "text-gray-400"
                                              : "text-gray-500"
                                          }`}
                                        >
                                          {reply.timestamp}
                                        </p>
                                      </div>
                                    </div>
                                    <p
                                      className={`text-sm mb-2 ${
                                        darkMode
                                          ? "text-gray-300"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {reply.text}
                                    </p>

                                    {/* ✅ ADD THIS - Like button */}
                                    <button
                                      onClick={() => handleReplyLike(reply.id)}
                                      className={`flex items-center space-x-1 text-xs transition-colors ${
                                        darkMode
                                          ? "text-gray-400 hover:text-green-400"
                                          : "text-gray-600 hover:text-green-600"
                                      }`}
                                    >
                                      <Heart className="w-3 h-3" />
                                      <span>
                                        {(commentLikes[reply.id] || 0) > 0
                                          ? commentLikes[reply.id]
                                          : "Like"}
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div
                        className={`text-center py-8 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <p>No comments yet. Be the first to comment!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowReportModal(false)}
            />

            <div
              className={`relative rounded-2xl shadow-xl max-w-md w-full ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between p-6 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h2
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Report Post
                </h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Help us understand what's wrong with this post.
                </p>

                <div className="mb-4">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Reason for reporting <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {reportReasons.map((reason) => (
                      <label
                        key={reason}
                        className={`flex items-center p-3 rounded-lg cursor-pointer ${
                          reportReason === reason
                            ? darkMode
                              ? "bg-red-900 bg-opacity-30 border-2 border-red-500"
                              : "bg-red-50 border-2 border-red-500"
                            : darkMode
                            ? "bg-gray-700 hover:bg-gray-600 border-2 border-gray-600"
                            : "bg-gray-50 hover:bg-gray-100 border-2 border-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="reportReason"
                          value={reason}
                          checked={reportReason === reason}
                          onChange={(e) => setReportReason(e.target.value)}
                          className="mr-3"
                        />
                        <span
                          className={`text-sm ${
                            darkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {reason}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Additional details (optional)
                  </label>
                  <textarea
                    value={reportComment}
                    onChange={(e) => setReportComment(e.target.value)}
                    placeholder="Provide more information..."
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      darkMode
                        ? "bg-gray-700 text-white placeholder-gray-400 border border-gray-600"
                        : "bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300"
                    }`}
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowReportModal(false);
                      setReportReason("");
                      setReportComment("");
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportSubmit}
                    disabled={!reportReason}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium ${
                      reportReason
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : darkMode
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Report Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Message Modal
const MessageModal = ({ user, darkMode, onClose }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      text: "Hi! Interested in your livestock.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Thank you! What animals are you looking for?",
      time: "10:32 AM",
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "user",
          text: message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg rounded-2xl overflow-hidden ${scheme.card}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between p-4 border-b ${scheme.border}`}
        >
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className={`font-semibold ${scheme.text}`}>{user.name}</h4>
              <span className="text-xs text-green-500">Online</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:opacity-80 ${scheme.muted}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`p-4 border-t flex items-center space-x-2 ${scheme.border}`}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className={`flex-1 px-4 py-2 rounded-full text-sm border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Profile Component
export default function UserViewProfile({
  user,
  userPosts = [],
  darkMode = false,
  onBack,
  onMessage,
}) {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const currentUser = user || DEFAULT_USER;

  // ✅ ALL useState HOOKS AT THE TOP
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPostToShare, setSelectedPostToShare] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(
    currentUser.followers || 0
  );
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [showQRCode, setShowQRCode] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState("list");
  const [selectedPost, setSelectedPost] = useState(null);
  const [postComments, setPostComments] = useState({});

  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  // Keep SAMPLE_REVIEWS as fallback until a successful fetch replaces them
  const [userReviews, setUserReviews] = useState(SAMPLE_REVIEWS);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);
  const [reviewsAverage, setReviewsAverage] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(null);
  // ✅ State for posts list
  const [postsList, setPostsList] = useState([]);

  // ✅ Initialize posts from props
  useEffect(() => {
    const initialPosts =
      user?.posts?.length > 0
        ? user.posts
        : userPosts.length > 0
        ? userPosts
        : SAMPLE_POSTS;
    // Avoid unnecessary state updates which can cause render loops
    const areSameLength = postsList.length === initialPosts.length;
    const isSameContent = areSameLength
      ? initialPosts.every((p, idx) => {
          const existing = postsList[idx];
          return (
            existing &&
            existing.id === p.id &&
            existing.isLiked === p.isLiked &&
            existing.isBookmarked === p.isBookmarked &&
            existing.likes === p.likes &&
            existing.bookmarks === p.bookmarks
          );
        })
      : false;

    if (!isSameContent) {
      setPostsList(initialPosts);

      // Initialize liked/bookmarked sets
      const liked = new Set();
      const bookmarked = new Set();

      initialPosts.forEach((post) => {
        if (post.isLiked) liked.add(post.id);
        if (post.isBookmarked) bookmarked.add(post.id);
      });

      setLikedPosts(liked);
      setBookmarkedPosts(bookmarked);
    }
  }, [user?.posts, userPosts]);

  useEffect(() => {
    const initialComments = {};
    postsList.forEach((post) => {
      if (post.comments && Array.isArray(post.comments)) {
        initialComments[post.id] = post.comments;
      }
    });
    setPostComments(initialComments);
  }, [postsList]);

  // Fetch ratings/feedback for the displayed user (safe: only include token when present)
  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      if (!user || !user.id) return;
      setReviewsLoading(true);
      setReviewsError(null);

      try {
        const hasToken = !!localStorage.getItem('login-token');
        const data = await apiGet(`ratings-feedback/get/${user.id}`, hasToken);

        if (!mounted) return;

        // Map backend response to the local review shape
        const mapped = (data.data || []).map((item) => ({
          id: item.id,
          // If backend doesn't return a rater name, show anonymous
          name: item.rater_name || item.raters_name || 'Anonymous',
          user: item.rater || null,
          rating: item.rating,
          text: item.feedback || item.text || '',
          feedback: item.feedback,
          timestamp: item.created_at || item.timestamp || '',
        }));

        if (mapped.length > 0) {
          setUserReviews(mapped);
        }

        setReviewsAverage(data.average_rating ? parseFloat(data.average_rating) : null);
        setReviewsCount(Array.isArray(data.data) ? data.data.length : 0);
      } catch (err) {
        console.warn('Could not fetch reviews:', err.message || err);
        if (mounted) setReviewsError(err.message || 'Failed to load reviews');
        // keep existing SAMPLE_REVIEWS as fallback
      } finally {
        if (mounted) setReviewsLoading(false);
      }
    };

    fetchReviews();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  // ✅ Helper function
  const getCurrentUserId = () => {
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userId = parsedUser?.id;
        } catch (e) {}
      }
    }
    return userId ? parseInt(userId) : null;
  };

  // ✅ HANDLERS
  const handleShareClick = (post) => {
    setSelectedPostToShare(post);
    setShowShareModal(true);
  };
  const toggleLike = async (postId) => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        alert("Please log in to like posts");
        return;
      }

      // Find the post
      const post = postsList.find((p) => p.id === postId);
      if (!post) return;

      // Use post.isLiked instead of likedPosts Set
      const wasLiked = post.isLiked;

      // Update posts list immediately
      const updatedPosts = postsList.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked: !wasLiked,
              likes: wasLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      );
      setPostsList(updatedPosts);

      // Update likedPosts Set for tracking
      const newLiked = new Set(likedPosts);
      if (wasLiked) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      setLikedPosts(newLiked);

      // API call
      const response = await apiPost(
        "news-feed/unlike-or-like",
        {
          feed_id: postId,
          user_id: userId,
        },
        true
      );

      if (response.status !== "success") {
        // Revert on failure - restore original state
        const revertedPosts = postsList.map((p) =>
          p.id === postId
            ? {
                ...p,
                isLiked: wasLiked,
                likes: post.likes,
              }
            : p
        );
        setPostsList(revertedPosts);
        setLikedPosts(likedPosts);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert on error - find original post again
      const originalPost = postsList.find((p) => p.id === postId);
      if (originalPost) {
        const revertedPosts = postsList.map((p) =>
          p.id === postId ? originalPost : p
        );
        setPostsList(revertedPosts);
        setLikedPosts(likedPosts);
      }
    }
  };

  const toggleBookmark = async (postId) => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        alert("Please log in to bookmark posts");
        return;
      }

      // Find the post
      const post = postsList.find((p) => p.id === postId);
      if (!post) return;

      // Use post.isBookmarked instead of bookmarkedPosts Set
      const wasBookmarked = post.isBookmarked;

      // Update posts list immediately
      const updatedPosts = postsList.map((p) =>
        p.id === postId
          ? {
              ...p,
              isBookmarked: !wasBookmarked,
              bookmarks: wasBookmarked ? p.bookmarks - 1 : p.bookmarks + 1,
            }
          : p
      );
      setPostsList(updatedPosts);

      // Update bookmarkedPosts Set for tracking
      const newBookmarked = new Set(bookmarkedPosts);
      if (wasBookmarked) {
        newBookmarked.delete(postId);
      } else {
        newBookmarked.add(postId);
      }
      setBookmarkedPosts(newBookmarked);

      // API call
      const response = await apiPost(
        "news-feed/unbookmark-or-bookmark",
        {
          feed_id: postId,
          user_id: userId,
        },
        true
      );

      if (response.status !== "success") {
        // Revert on failure - restore original state
        const revertedPosts = postsList.map((p) =>
          p.id === postId
            ? {
                ...p,
                isBookmarked: wasBookmarked,
                bookmarks: post.bookmarks,
              }
            : p
        );
        setPostsList(revertedPosts);
        setBookmarkedPosts(bookmarkedPosts);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      // Revert on error
      const originalPost = postsList.find((p) => p.id === postId);
      if (originalPost) {
        const revertedPosts = postsList.map((p) =>
          p.id === postId ? originalPost : p
        );
        setPostsList(revertedPosts);
        setBookmarkedPosts(bookmarkedPosts);
      }
    }
  };
const handleSubmitReview = async () => {
  const raterId = getCurrentUserId();

  if (!raterId) {
    alert("Please log in to write a review");
    return;
  }

  if (reviewRating === 0 || !reviewText.trim()) {
    alert("Please add a star rating and write a review");
    return;
  }

  try {
    // Determine feed_id to associate the review with. The backend requires a valid feed id.
    // Prefer a selected post in the UI, otherwise fall back to the first post in postsList.
    const feedId = (typeof selectedPost !== 'undefined' && selectedPost)?.id || (postsList && postsList.length > 0 ? postsList[0].id : null);

    if (!feedId) {
      // Backend validation requires feed_id to exist in animal_feed_tables.
      alert("Please select a post/feed to associate this review with before submitting.");
      return;
    }

    // Prepare payload expected by backend: feed_id, rating, feedback, user_id (the user being rated), raters (the reviewer id)
    const payload = {
      feed_id: feedId,
      user_id: currentUser?.id, // the user being reviewed
      raters: raterId, // the reviewer (backend expects 'raters')
      rating: reviewRating,
      feedback: reviewText,
    };

    // Call backend endpoint
    const response = await apiPost("ratings-feedback/add", payload, true);

    // Expect response.success or response.status; be resilient
    if (response && (response.success || response.status === "success" || response.code === 200)) {
      // Add review locally for immediate UI feedback
      const newReview = {
        id: (userReviews?.length || 0) + 1,
        user: {
          name: "You",
          avatar: "https://ui-avatars.com/api/?name=You&background=10b981&color=fff",
        },
        rating: reviewRating,
        text: reviewText,
        timestamp: "just now",
      };

      setUserReviews([newReview, ...(userReviews || [])]);
      setReviewRating(0);
      setReviewText("");

      // Optionally notify the user
      alert("Review submitted successfully!");
    } else {
      console.error("Unexpected response from ratings-feedback/add:", response);
      alert("Failed to submit review");
    }
  } catch (error) {
    console.error("Error submitting review to ratings-feedback/add:", error);
    alert("Failed to submit review");
  }
};
  // ✅ CONDITIONAL RETURNS (after all hooks and variable declarations)
  if (user?.loading) {
    return (
      <div
        className={`min-h-screen transition-colors ${scheme.bg} flex items-center justify-center`}
      >
        <p className={scheme.text}>Loading...</p>
      </div>
    );
  }

  if (user?.error) {
    return (
      <div className={`min-h-screen transition-colors ${scheme.bg}`}>
        <p className={`text-red-500 p-4`}>Error: {user.error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${scheme.bg}`}>
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            darkMode
              ? "text-gray-400 hover:bg-gray-800 hover:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className={`rounded-2xl overflow-hidden shadow-lg ${scheme.card}`}>
          {/* Cover Photo */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            {currentUser.coverPhoto ? (
              <img
                src={currentUser.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              />
            )}
          </div>

          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start -mt-16 mb-6 relative z-10">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
            </div>

            {/* Header */}
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 text-center md:text-left">
              <div>
                {/* Name + Verified Badge + User Type Badge */}
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-1 flex-wrap gap-2">
                  <h1 className={`text-2xl font-bold ${scheme.text}`}>
                    {currentUser.name}
                  </h1>

                  {/* User Type Badge */}
                  {currentUser.user_type && (
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        getUserTypeBadge(currentUser.user_type, darkMode)
                          .className
                      }`}
                    >
                      {getUserTypeBadge(currentUser.user_type, darkMode).label}
                    </span>
                  )}
                </div>

                {/* Username */}
                <p className={`text-base ${scheme.muted}`}>
                  {currentUser.username}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center md:justify-end gap-2 mt-4 md:mt-0">
                <button
                  onClick={async () => {
                    if (typeof onMessage === "function") {
                      await onMessage(currentUser.id);
                    } else {
                      setShowMessageModal(true);
                    }
                  }}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </div>
            </div>

            {/* Location & Join Date */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm justify-center md:justify-start">
              <div className={`flex items-center space-x-1 ${scheme.muted}`}>
                <MapPin className="w-4 h-4" />
                <span>{currentUser.location}</span>
              </div>
              <div className={`flex items-center space-x-1 ${scheme.muted}`}>
                <Calendar className="w-4 h-4" />
                <span>{currentUser.joinDate}</span>
              </div>
            </div>

            {/* Rating */}
            <div
              className={`p-4 rounded-lg text-center max-w-md mx-auto ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-1 mb-1">
                <RatingStars
                  rating={typeof reviewsAverage === 'number' ? reviewsAverage : currentUser.rating}
                  darkMode={darkMode}
                />
              </div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {(typeof reviewsAverage === 'number' ? reviewsAverage : currentUser.rating).toFixed(1)} ({typeof reviewsCount === 'number' ? reviewsCount : currentUser.totalReviews} reviews)
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-2xl overflow-hidden shadow-lg ${scheme.card}`}>
          <div className={`border-b ${scheme.border}`}>
            <div className="flex justify-between items-center px-6">
              <nav className="flex space-x-8">
                {["posts", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? "border-green-500 text-green-600"
                        : `border-transparent ${scheme.muted}`
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "posts" && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {postsList.map((post) => (
                  <div key={post.id}>
                    {viewMode === "grid" ? (
                      <PostGridItem
                        post={post}
                        onClick={() => setSelectedPost(post)}
                      />
                    ) : (
                      <PostListItem
                        post={post}
                        user={currentUser}
                        darkMode={darkMode}
                        likedPosts={likedPosts}
                        bookmarkedPosts={bookmarkedPosts}
                        onLike={toggleLike}
                        onBookmark={toggleBookmark}
                        onImageClick={setSelectedPost}
                        onShare={handleShareClick} // ✅ ADD THIS
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

      {activeTab === "reviews" && (
  <div className="space-y-4">
    {/* Existing reviews */}
    {reviewsLoading ? (
      <div className={`text-center py-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading reviews...</div>
    ) : reviewsError ? (
      <div className={`text-center py-6 text-red-500`}>Error loading reviews: {reviewsError}</div>
    ) : userReviews && userReviews.length > 0 ? (
      userReviews.map((review) => (
        <ReviewItem key={review.id} review={review} darkMode={darkMode} />
      ))
    ) : (
      <div className={`text-center py-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        No reviews yet.
      </div>
    )}

    {/* Divider */}
    <hr
      className={`my-4 ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    />

    {/* Write a new review */}
    <div
      className={`p-6 rounded-lg border-2 ${
        darkMode 
          ? "bg-gray-800 border-gray-700" 
          : "bg-white border-gray-100"
      }`}
    >
      <h4
        className={`text-base font-semibold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Write a Review
      </h4>

      {/* Star Rating Section */}
      <div className="mb-4">
        <p
          className={`text-sm font-medium mb-2 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Rate this seller
        </p>
        <div className="flex gap-2 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setReviewRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition"
            >
              <Star
                size={32}
                className={`cursor-pointer transition ${
                  star <= (hoverRating || reviewRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : darkMode
                    ? "text-gray-600"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
          {reviewRating > 0 && (
            <span className={`ml-2 font-semibold text-lg ${
              darkMode ? "text-yellow-400" : "text-yellow-500"
            }`}>
              {reviewRating}.0
            </span>
          )}
        </div>
      </div>

      {/* Review Text Area */}
      <div className="mb-4">
        <p
          className={`text-sm font-medium mb-2 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Share your experience
        </p>
        <textarea
          rows="4"
          placeholder="Tell others what you think about this seller..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className={`w-full p-3 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2 transition ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400"
          }`}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitReview}
        className="w-full px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition transform hover:scale-105 active:scale-95"
      >
        Send Review
      </button>
    </div>
  </div>
)}
          </div>
        </div>

        {/* Modals */}
        {showQRCode && (
          <ProfileQRModal
            user={currentUser}
            darkMode={darkMode}
            onClose={() => setShowQRCode(false)}
          />
        )}
        {showMessageModal && (
          <MessageModal
            user={currentUser}
            darkMode={darkMode}
            onClose={() => setShowMessageModal(false)}
          />
        )}
        {selectedPost && (
          <PostModal
            post={
              postsList.find((p) => p.id === selectedPost.id) || selectedPost
            }
            user={currentUser}
            darkMode={darkMode}
            onClose={() => setSelectedPost(null)}
            onShare={handleShareClick}
            postComments={postComments}
            setPostComments={setPostComments}
            onLike={toggleLike}
            onBookmark={toggleBookmark}
          />
        )}
        {showShareModal && selectedPostToShare && (
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            darkMode={darkMode}
            postId={selectedPostToShare.id}
            title={selectedPostToShare.animalInfo?.title || "Animal Post"}
          />
        )}
      </div>
    </div>
  );
}
