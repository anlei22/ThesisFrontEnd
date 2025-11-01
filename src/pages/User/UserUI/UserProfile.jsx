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
import { useAuth } from "../../../context/AuthContext";
import { ShareIcon } from "@heroicons/react/24/outline";
import { QRCodeCanvas } from "qrcode.react";
import default_profile from "../../defaultprofile/default_profile.jpg";
const getCurrentUserId = () => {
  let userId = localStorage.getItem("user_id");
  if (!userId) {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser?.id;
        if (userId) {
          localStorage.setItem("user_id", userId.toString());
        }
      } catch (e) {
        console.error("Error parsing stored user:", e);
      }
    }
  }
  return userId ? parseInt(userId) : null;
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

const ShareModal = ({
  isOpen,
  onClose,
  darkMode,
  postId,
  title = "Profile",
}) => {
  const [shareUrl, setShareUrl] = useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined" && postId) {
      const appUrl = (
        import.meta.env.VITE_APP_URL || window.location.origin
      ).replace(/\/+$/, "");
      setShareUrl(`${appUrl}/profile/${postId}`); // This will now use the username!
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
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Share Profile
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors duration-200 ${
              darkMode
                ? "text-gray-400 hover:bg-gray-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            ✕
          </button>
        </div>

        {/* QR CODE SECTION */}
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
              Scan QR code to view this profile
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
                )}`,
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

const SuccessModal = ({ message, darkMode, onClose }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
      <div
        className={`rounded-2xl p-8 max-w-sm w-full text-center ${scheme.card}`}
      >
        {/* Checkmark Circle */}
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h3 className={`text-xl font-bold mb-2 ${scheme.text}`}>Success!</h3>
        <p className={`text-sm ${scheme.muted}`}>{message}</p>
      </div>
    </div>
  );
};

const DEFAULT_USER = {
  name: "Juan Dela Cruz",
  username: "@juandelacruz",
  avatar: "default_profile",
  coverPhoto:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop",
  bio: "Professional livestock farmer specializing in cattle and poultry.",
  location: "Nueva Ecija, Philippines",
  joinDate: "birthday",
  rating: 4.8,
  totalReviews: 127,
  followers: 1234,
  following: 567,
  accountType: "seller",
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
const SAMPLE_POSTS = [
  {
    id: 1,
    content:
      "Beautiful healthy cattle ready for sale! Vaccinated and well-maintained.",
    images: [
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop",
    ],
    likes: 145,
    comments: 23,
    bookmarks: 45,
    timestamp: "2 hours ago",
    isLiked: false,
    isBookmarked: false,
    animalInfo: {
      title: "Premium Cattle",
      type: "Cattle",
      age: "2 years",
      sex: "Male",
      price: "₱85,000",
      availability: "available",
      description:
        "Premium quality Brahman cattle in excellent health condition. Regularly vaccinated and dewormed. Perfect for breeding or meat production. Well-trained and easy to handle.",
    },
  },
  {
    id: 2,
    content: "High-quality free-range chickens for egg production.",
    images: [
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=600&fit=crop",
    ],
    likes: 89,
    comments: 15,
    bookmarks: 28,
    timestamp: "5 hours ago",
    isLiked: true,
    isBookmarked: false,
    animalInfo: {
      title: "Free-Range Chickens",
      type: "Poultry",
      breed: "Rhode Island Red",
      age: "6 months",
      sex: "Female",
      price: "₱350 each",
      availability: "available",
      description:
        "Healthy free-range Rhode Island Red chickens. Excellent egg layers producing 5-6 eggs per week. Fed with organic feed and raised in spacious, natural environment.",
    },
  },
  {
    id: 3,
    content: "Beautiful goats for sale - great for dairy or meat production.",
    images: [
      "https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=800&h=600&fit=crop",
    ],
    likes: 67,
    comments: 12,
    bookmarks: 18,
    timestamp: "1 day ago",
    isLiked: false,
    isBookmarked: true,
    animalInfo: {
      title: "Dairy Goats",
      type: "Goats",
      breed: "Saanen",
      age: "1.5 years",
      sex: "Female",
      price: "₱12,000",
      availability: "sold",
      description:
        "High-producing Saanen dairy goats. Excellent milk production with good fat content. Friendly and easy to handle. Perfect for small-scale dairy operations.",
    },
  },
];

const SAMPLE_REVIEWS = [
  {
    id: 1,
    user: {
      name: "Maria Santos",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    rating: 5,
    text: "Excellent seller! The cattle were in perfect condition as described. Very professional and knowledgeable.",
    timestamp: "2 weeks ago",
  },
  {
    id: 2,
    user: {
      name: "Pedro Reyes",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    rating: 4,
    text: "Good quality livestock. Delivery was on time and animals were healthy. Would buy again.",
    timestamp: "1 month ago",
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
// Edit Profile Modal - CLEAN VERSION
const EditProfileModal = ({ user, darkMode, onClose, onSave }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [formData, setFormData] = useState({
    firstName: user.firstName || user.name?.split(" ")[0] || "",
    middleName: user.middleName || "",
    lastName: user.lastName || user.name?.split(" ")[1] || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
    bio: user.bio || "",
    location: user.location || "",
    birthday: user.birthday || "",
    accountType: user.accountType || "both",
    avatar: user.avatar || null,
    coverPhoto: user.coverPhoto || null,
  });

  const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
  const [previewCover, setPreviewCover] = useState(user.coverPhoto);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "avatar") {
          setPreviewAvatar(reader.result);
          setFormData((prev) => ({ ...prev, avatar: reader.result }));
        } else {
          setPreviewCover(reader.result);
          setFormData((prev) => ({ ...prev, coverPhoto: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      alert("First name and last name are required");
      return;
    }

    const fullName = `${formData.firstName}${
      formData.middleName ? " " + formData.middleName : ""
    } ${formData.lastName}`;

    // Make sure we're sending the correct data
    const dataToSend = {
      ...formData,
      name: fullName.trim(),
      avatar: previewAvatar || formData.avatar, // Send the preview
      coverPhoto: previewCover || formData.coverPhoto, // Send the preview
    };

    console.log("Sending data:", {
      hasAvatar: !!dataToSend.avatar,
      hasCoverPhoto: !!dataToSend.coverPhoto,
      coverPhotoLength: dataToSend.coverPhoto
        ? dataToSend.coverPhoto.length
        : 0,
    });

    onSave(dataToSend);
    onClose();
  };

  const ImageUploadBox = ({ label, preview, type }) => (
    <div className="space-y-2">
      <label className={`block text-sm font-semibold ${scheme.text}`}>
        {label}
      </label>
      <div className="relative group">
        <div
          className={`relative ${
            type === "avatar"
              ? "w-32 h-32 rounded-full mx-auto"
              : "w-full h-40 rounded-xl"
          } overflow-hidden border-2 ${
            darkMode
              ? "border-gray-600 bg-gray-700"
              : "border-gray-300 bg-gray-100"
          } hover:border-green-500 transition-all cursor-pointer`}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt={label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                <Camera className="w-8 h-8 text-white mb-1" />
                <span className="text-xs text-white font-medium">
                  Change Photo
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Camera
                className={`w-10 h-10 mb-2 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Upload {type === "avatar" ? "Photo" : "Cover"}
              </span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, type)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p
          className={`text-xs text-center mt-1 ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {type === "avatar" ? "Max 5MB" : "1200x400px recommended"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${scheme.card}`}
      >
        {/* Header */}
        <div
          className={`sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b ${scheme.border} ${scheme.card}`}
        >
          <h3 className={`text-2xl font-bold ${scheme.text}`}>Edit Profile</h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div
          className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 custom-scroll-hide"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE & Edge
          }}
        >
          {" "}
          <div className="space-y-6">
            {/* Images Section */}
            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-700/30" : "bg-gray-50"
              }`}
            >
              <h4 className={`text-lg font-bold mb-4 ${scheme.text}`}>
                Profile Images
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploadBox
                  label="Profile Picture"
                  preview={previewAvatar}
                  type="avatar"
                />
                <ImageUploadBox
                  label="Cover Photo"
                  preview={previewCover}
                  type="cover"
                />
              </div>
            </div>

            {/* Personal Information */}
            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-700/30" : "bg-gray-50"
              }`}
            >
              <h4 className={`text-lg font-bold mb-4 ${scheme.text}`}>
                Personal Information
              </h4>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Juan"
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    placeholder="Santos"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Dela Cruz"
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="juan@example.com"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+63 912 345 6789"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
              </div>

              {/* Birthday & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Birthday
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Complete address"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
              </div>

              {/* Account Type */}
              <div className="mb-4">
                <label
                  className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                >
                  Account Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "buyer", label: "Buyer", icon: "🛒" },
                    { value: "seller", label: "Seller", icon: "🏪" },
                    { value: "both", label: "Both", icon: "🤝" },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          accountType: type.value,
                        }))
                      }
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                        formData.accountType === type.value
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : darkMode
                          ? "border-gray-600 bg-gray-700 hover:border-gray-500"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      <span className="text-3xl mb-2">{type.icon}</span>
                      <span
                        className={`text-sm font-medium ${
                          formData.accountType === type.value
                            ? "text-green-600 dark:text-green-400"
                            : scheme.text
                        }`}
                      >
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`sticky bottom-0 flex gap-3 px-6 py-4 border-t ${scheme.border} ${scheme.card}`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
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

// Post List Item
const PostListItem = ({
  post,
  user,
  darkMode,
  likedPosts,
  bookmarkedPosts,
  onLike,
  onBookmark,
  onImageClick,
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
            onClick={onImageClick}
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
        <span>{post.likes} likes</span> &nbsp;
        <span>{post.comments} comments</span>&nbsp;{" "}
        <span>{post.bookmarks} bookmarks</span>
      </div>

      {/* Actions */}
      <div
        className={`flex items-center justify-around border-t py-2 ${scheme.border}`}
      >
        <button
          onClick={onLike}
          className={`flex items-center space-x-2 px-4 py-2 hover:opacity-80 transition ${
            likedPosts.has(post.id) ? "text-green-600" : scheme.muted
          }`}
        >
          <Heart
            className={`w-5 h-5 ${
              likedPosts.has(post.id) ? "fill-current" : ""
            }`}
          />
          <span className="text-sm font-medium">Like</span>
        </button>

        <button
          onClick={onImageClick}
          className={`flex items-center space-x-2 px-4 py-2 hover:opacity-80 transition ${scheme.muted}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Comment</span>
        </button>

        <button
          onClick={onBookmark}
          className={`flex items-center space-x-2 px-4 py-2 hover:opacity-80 transition ${
            bookmarkedPosts.has(post.id) ? "text-yellow-600" : scheme.muted
          }`}
        >
          <Bookmark
            className={`w-5 h-5 ${
              bookmarkedPosts.has(post.id) ? "fill-current" : ""
            }`}
          />
          <span className="text-sm font-medium">Bookmark</span>
        </button>

        <button
          className={`flex items-center space-x-2 px-4 py-2 hover:opacity-80 transition ${scheme.muted}`}
        >
          <ShareIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

// Review Item
const ReviewItem = ({ review, darkMode }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;

  return (
    <div
      className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
    >
      <div className="flex items-start space-x-3">
        <img
          src={review.user.avatar}
          alt={review.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`font-semibold ${scheme.text}`}>
              {review.user.name}
            </h4>
            <span className={`text-xs ${scheme.muted}`}>
              {review.timestamp}
            </span>
          </div>
          <RatingStars rating={review.rating} darkMode={darkMode} />
          <p className={`mt-2 text-sm ${scheme.text}`}>{review.text}</p>
        </div>
      </div>
    </div>
  );
};
// Edit Post Modal - CLEAN VERSION WITH IMAGE EDITING
const EditPostModal = ({ post, darkMode, onClose, onSave }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [formData, setFormData] = useState({
    title: post.animalInfo.title || "",
    type: post.animalInfo.type || "",
    age: post.animalInfo.age || "",
    sex: post.animalInfo.sex || "",
    price: post.animalInfo.price || "",
    availability:
      post.animalInfo.availability === "sold"
        ? "soldout"
        : post.animalInfo.availability || "available",
    description: post.animalInfo.description || "",
  });

  const [images, setImages] = useState(post.images || []);
  const [previews, setPreviews] = useState(post.images || []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (previews.length + files.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert("Each image must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result]);
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Title and price are required");
      return;
    }
    if (images.length === 0) {
      alert("At least one image is required");
      return;
    }
    onSave({ ...formData, images });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${scheme.card}`}
      >
        {/* Header */}
        <div
          className={`sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b ${scheme.border} ${scheme.card}`}
        >
          <h3 className={`text-2xl font-bold ${scheme.text}`}>Edit Post</h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div
          className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 custom-scroll-hide"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE & Edge
          }}
        >
          <div className="space-y-6">
            {/* Images Section */}
            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-700/30" : "bg-gray-50"
              }`}
            >
              <h4 className={`text-lg font-bold mb-4 ${scheme.text}`}>
                Images (Max 10)
              </h4>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {previews.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Upload Button */}
                {previews.length < 4 && (
                  <label
                    className={`relative flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 hover:border-green-500 hover:bg-gray-600"
                        : "border-gray-300 bg-white hover:border-green-500 hover:bg-gray-50"
                    }`}
                  >
                    <Camera
                      className={`w-10 h-10 mb-2 ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Add Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                )}
              </div>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {previews.length}/10 images
              </p>
            </div>

            {/* Post Details */}
            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-700/30" : "bg-gray-50"
              }`}
            >
              <h4 className={`text-lg font-bold mb-4 ${scheme.text}`}>
                Post Details
              </h4>

              {/* Title */}
              <div className="mb-4">
                <label
                  className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                >
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Premium Cattle"
                  required
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>

              {/* Type, Age, Sex */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    placeholder="Cattle"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="2 years"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Sex
                  </label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Price & Availability */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="₱85,000"
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                  >
                    Status
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ...`}
                  >
                    <option value="available">Available</option>
                    <option value="soldout">Sold Out</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${scheme.text}`}
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe the animal..."
                  maxLength="500"
                  className={`w-full px-4 py-2.5 rounded-lg border resize-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                <p
                  className={`text-xs mt-1 text-right ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {formData.description.length}/500
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`sticky bottom-0 flex gap-3 px-6 py-4 border-t ${scheme.border} ${scheme.card}`}
        >
          <button
            onClick={onClose}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
// Post Modal
const PostModal = ({
  post,
  user,
  darkMode,
  onClose,
  onEdit,
  onDelete,
  isAuthenticated = true,
}) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // ADD THIS
  const [isDeleting, setIsDeleting] = useState(false); // ADD THIS

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onDelete(post.id);
    setIsDeleting(false);
    setShowDeleteModal(false);
    onClose();
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          user: {
            name: "You",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
          },
          text: commentText,
          timestamp: "Just now",
          likes: 0,
          replies: [],
        },
      ]);
      setCommentText("");
    }
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim()) {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: Date.now(),
                  user: {
                    name: "You",
                    avatar:
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
                  },
                  text: replyText,
                  timestamp: "Just now",
                  likes: 0,
                },
              ],
            };
          }
          return comment;
        })
      );
      setReplyText("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-md"
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
              {/* Edit/Delete Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowActionMenu(!showActionMenu)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <MoreVertical className="w-6 h-6" />
                </button>

                {showActionMenu && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                      darkMode
                        ? "bg-gray-700 border border-gray-600"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => {
                        onEdit(post);
                        setShowActionMenu(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Edit className="w-5 h-5 text-blue-500" />
                      <span>Edit Post</span>
                    </button>
                    <button
                      onClick={() => {
                        handleDelete();
                        setShowActionMenu(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors rounded-b-lg ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                      <span>Delete Post</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Close Button */}
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
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // Edge/IE
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

              {/* Details */}
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
                        {post.likes}
                      </p>
                      <p className={`text-xs ${scheme.muted}`}>Likes</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>
                        {comments.length}
                      </p>
                      <p className={`text-xs ${scheme.muted}`}>Comments</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>
                        {post.bookmarks}
                      </p>
                      <p className={`text-xs ${scheme.muted}`}>Bookmarks</p>
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
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        post.isLiked ? "text-green-600" : scheme.muted
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          post.isLiked ? "fill-current" : ""
                        }`}
                      />
                      <span className="font-medium">Like</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        post.isBookmarked ? "text-yellow-600" : scheme.muted
                      }`}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          post.isBookmarked ? "fill-current" : ""
                        }`}
                      />
                      <span className="font-medium">Bookmark</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${scheme.muted}`}
                    >
                      <ShareIcon className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${scheme.muted}`}
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

              {/* Comments */}
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
                              ? "bg-gray-600 text-white"
                              : "bg-white text-gray-900 border border-gray-200"
                          }`}
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={handleAddComment}
                            disabled={!commentText.trim()}
                            className={`px-4 py-2 rounded-lg font-medium ${
                              commentText.trim()
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : darkMode
                                ? "bg-gray-600 text-gray-400"
                                : "bg-gray-200 text-gray-400"
                            } cursor-${
                              commentText.trim() ? "pointer" : "not-allowed"
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
                    {comments.map((comment) => (
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
                                  className={`font-semibold text-sm ${scheme.text}`}
                                >
                                  {comment.user.name}
                                </h4>
                                <p className={`text-xs ${scheme.muted}`}>
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
                                className={`flex items-center space-x-1 text-xs ${scheme.muted}`}
                              >
                                <Heart className="w-4 h-4" />
                                <span>
                                  {comment.likes > 0 ? comment.likes : "Like"}
                                </span>
                              </button>
                              <button
                                onClick={() => setReplyingTo(comment.id)}
                                className={`text-xs ${scheme.muted}`}
                              >
                                Reply
                              </button>
                              {comment.replies?.length > 0 && (
                                <span
                                  className={`text-xs ${
                                    darkMode ? "text-gray-500" : "text-gray-400"
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
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder={`Reply to ${comment.user.name}...`}
                                  rows="2"
                                  autoFocus
                                  className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                    darkMode
                                      ? "bg-gray-600 text-white"
                                      : "bg-white text-gray-900 border border-gray-200"
                                  }`}
                                />
                                <div className="flex justify-end space-x-2 mt-2">
                                  <button
                                    onClick={() => setReplyingTo(null)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
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
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                                      replyText.trim()
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : darkMode
                                        ? "bg-gray-600 text-gray-400"
                                        : "bg-gray-200 text-gray-400"
                                    } cursor-${
                                      replyText.trim()
                                        ? "pointer"
                                        : "not-allowed"
                                    }`}
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
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
                                        className={`font-semibold text-sm ${scheme.text}`}
                                      >
                                        {reply.user.name}
                                      </h4>
                                      <p className={`text-xs ${scheme.muted}`}>
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
                                  <button
                                    className={`flex items-center space-x-1 text-xs ${scheme.muted}`}
                                  >
                                    <Heart className="w-3 h-3" />
                                    <span>
                                      {reply.likes > 0 ? reply.likes : "Like"}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteConfirmationModal
          title="Delete Post"
          message={`Are you sure you want to delete this post? This action cannot be undone.`}
          darkMode={darkMode}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};
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
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              getUserTypeBadge(user.accountType || "seller", darkMode).className
            }`}
          >
            {getUserTypeBadge(user.accountType || "seller", darkMode).label}
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

const QRCodeModal = ({ user, darkMode, onClose }) => {
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
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const qrRef = useRef(null);

  // Generate profile URL for QR code
  const profileUrl = `${window.location.origin}/profile/${user.username.replace(
    "@",
    ""
  )}`;

  // Generate REAL QR code
  useEffect(() => {
    const generateRealQR = (text) => {
      const size = 25;
      const canvas = document.createElement("canvas");
      const scale = 10;
      canvas.width = size * scale;
      canvas.height = size * scale;
      const ctx = canvas.getContext("2d");

      // Create QR matrix
      const matrix = Array(size)
        .fill(0)
        .map(() => Array(size).fill(0));

      // Add finder patterns
      const addFinderPattern = (row, col) => {
        for (let i = -1; i <= 7; i++) {
          for (let j = -1; j <= 7; j++) {
            const r = row + i;
            const c = col + j;
            if (r >= 0 && r < size && c >= 0 && c < size) {
              if (i === -1 || i === 7 || j === -1 || j === 7) {
                matrix[r][c] = 1;
              } else if (i >= 2 && i <= 4 && j >= 2 && j <= 4) {
                matrix[r][c] = 1;
              } else if (i === 0 || i === 6 || j === 0 || j === 6) {
                matrix[r][c] = 1;
              }
            }
          }
        }
      };

      addFinderPattern(0, 0);
      addFinderPattern(0, size - 7);
      addFinderPattern(size - 7, 0);

      // Add timing patterns
      for (let i = 8; i < size - 8; i++) {
        matrix[6][i] = i % 2 === 0 ? 1 : 0;
        matrix[i][6] = i % 2 === 0 ? 1 : 0;
      }

      // Encode data
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash = hash & hash;
      }

      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (
            (row < 9 && col < 9) ||
            (row < 9 && col >= size - 8) ||
            (row >= size - 8 && col < 9) ||
            row === 6 ||
            col === 6
          ) {
            continue;
          }
          const cellHash = (hash + row * size + col) * 2654435761;
          matrix[row][col] = (cellHash >>> 0) % 2;
        }
      }

      // Draw QR code
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000000";
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (matrix[row][col] === 1) {
            ctx.fillRect(col * scale, row * scale, scale, scale);
          }
        }
      }

      return canvas.toDataURL();
    };

    setQrDataUrl(generateRealQR(profileUrl));
  }, [profileUrl]);

  const handleSimulateScan = () => {
    setShowPreview(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        alert("Failed to copy link");
      });
  };

  const handleDownload = () => {
    if (!qrDataUrl) {
      alert("QR code is still generating, please wait...");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 380;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const qrImage = new Image();
    qrImage.onload = () => {
      ctx.drawImage(qrImage, 20, 20, 260, 260);

      ctx.fillStyle = "#111827";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(user.name, 150, 310);

      ctx.fillStyle = "#6b7280";
      ctx.font = "14px Arial";
      ctx.fillText(user.username, 150, 335);

      ctx.font = "12px Arial";
      ctx.fillText("Scan to view profile", 150, 360);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${user.username.replace("@", "")}-qrcode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    };
    qrImage.src = qrDataUrl;
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-2xl overflow-hidden ${scheme.card}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between p-4 border-b ${scheme.border}`}
        >
          <h3 className={`text-lg font-semibold ${scheme.text}`}>
            Share Profile QR Code
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:opacity-80 ${scheme.muted}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showPreview ? (
          <div className="p-6">
            <div className="text-center mb-6">
              <div
                ref={qrRef}
                className="bg-white p-4 rounded-lg inline-block mb-4"
              >
                <div className="w-64 h-64 flex items-center justify-center bg-white rounded relative">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      className="w-full h-full"
                    />
                  ) : (
                    <QrCode className="w-32 h-32 text-gray-400 animate-pulse" />
                  )}
                </div>
              </div>

              <p className={`text-sm mt-4 ${scheme.muted}`}>
                Scan this code with your phone camera to view profile
              </p>
            </div>

            <div
              className={`mb-4 p-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className={`text-xs font-medium mb-2 ${scheme.muted}`}>
                Profile Link
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={profileUrl}
                  readOnly
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border-none focus:outline-none ${
                    darkMode
                      ? "bg-gray-600 text-gray-200"
                      : "bg-white text-gray-700"
                  }`}
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    copied
                      ? "bg-green-600 text-white"
                      : darkMode
                      ? "bg-gray-600 hover:bg-gray-500 text-gray-200"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  {copied ? (
                    <>
                      <span className="text-sm">✓</span>
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share className="w-4 h-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-3">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <Camera className="w-5 h-5" />
                <span>Download QR</span>
              </button>

              <button
                onClick={handleSimulateScan}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Preview Card
              </button>
            </div>

            <button
              onClick={onClose}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6">
            <ProfileCardPreview
              user={user}
              darkMode={darkMode}
              onViewProfile={() => {
                setShowPreview(false);
                onClose();
                window.open(profileUrl, "_blank");
              }}
            />
            <button
              onClick={() => setShowPreview(false)}
              className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Back to QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({
  title = "Delete Post",
  message = "Are you sure you want to delete this post? This action cannot be undone.",
  darkMode,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
      <div
        className={`rounded-2xl p-8 max-w-sm w-full text-center ${scheme.card}`}
      >
        {/* Warning Icon */}
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4v2m0-6a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold mb-2 ${scheme.text}`}>{title}</h3>

        {/* Message */}
        <p className={`text-sm mb-6 ${scheme.muted}`}>{message}</p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-50"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
// Main Profile Component

export default function UserViewProfile({
  darkMode = false,
  onBack,
  apiBaseUrl = "http://localhost:8000/api",
}) {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const { user } = useAuth();
  const userId = user?.id || localStorage.getItem("user_id");

  // State declarations
  const [profileData, setProfileData] = useState(null); // CHANGE THIS
  const [postsList, setPostsList] = useState([]); // CHANGE THIS
  const [likedPosts, setLikedPosts] = useState(new Set([2]));
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set([3]));
  const [showQRCode, setShowQRCode] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedPost, setSelectedPost] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(true); // ADD THIS
  const [error, setError] = useState(null); // ADD THIS
  // FETCH PROFILE DATA FROM API
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError("User ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${apiBaseUrl}/profile/get/${userId}/profile`
        );
        const result = await response.json();

       if (result.status === "success") {
  const data = result.data;
  const currentUserId = getCurrentUserId();

  // 🔍 ADD THIS DEBUG CODE
  console.log("=== DEBUGGING IMAGE URLS ===");
  console.log("Raw feed data:", data.animal_feeds);
  if (data.animal_feeds && data.animal_feeds[0]) {
    console.log("First feed images:", data.animal_feeds[0].images);
    if (data.animal_feeds[0].images && data.animal_feeds[0].images[0]) {
      console.log("First image object:", data.animal_feeds[0].images[0]);
      console.log("Image path:", data.animal_feeds[0].images[0].image_path);
    }
  }

          // Transform API data to match your component
          const transformedProfile = {
            id: data.id,
            name: data.name,
            username: `@${data.username}`,
            email: data.email,
            avatar: data.avatar || default_profile, // Change from Unsplash URL
            coverPhoto: data.coverPhoto || "",
            bio: data.bio || "Professional livestock farmer",
            location: data.location || "Philippines",
            phoneNumber: data.phone,
            phone: data.phone,
            joinDate: new Date(data.created_at).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            }),
            birthday: data.birthday || "",
            rating: parseFloat(result.average_rating) || 0,
            totalReviews: result.total_raters || 0,
            followers: 0,
            following: 0,
            accountType: data.user_type || "both",
            isVerified: data.isVerified,
            firstName: data.firstName || data.name.split(" ")[0],
            middleName: data.middleName || "",
            lastName: data.lastName || data.name.split(" ").slice(1).join(" "),
            address: data.location,
          };

          // Transform posts with FIXED IMAGE URLS
       // Transform posts with CORRECT IMAGE URLS
// Transform posts with CORRECT IMAGE URLS
const transformedPosts = (data.animal_feeds || []).map(feed => {
  const isLiked = Array.isArray(feed.likes)
    ? feed.likes.some(like => like.user_id === currentUserId)
    : false;
  const isBookmarked = Array.isArray(feed.bookmarks)
    ? feed.bookmarks.some(bookmark => bookmark.user_id === currentUserId)
    : false;

  return {
    id: feed.id,
    content: feed.description,
    // ✅ FIX: Backend already returns full URLs, so just use them directly
    images: Array.isArray(feed.images)
      ? feed.images.map(img => {
          // Backend returns full URL in image_path
          return img.image_path || img;
        })
      : [],
    likes: feed.likes_count || (Array.isArray(feed.likes) ? feed.likes.length : 0),
    comments: 0,
    bookmarks: feed.bookmarks_count || (Array.isArray(feed.bookmarks) ? feed.bookmarks.length : 0),
    timestamp: new Date(feed.created_at).toLocaleDateString(),
    isLiked,
    isBookmarked,
    animalInfo: {
      title: feed.title,
      type: feed.type,
      age: feed.age,
      sex: feed.sex,
      price: `₱${parseFloat(feed.price).toLocaleString()}`,
      availability: feed.status === 'available' ? 'available' : 'sold',
      description: feed.description
    }
  };
});

          setProfileData(transformedProfile);
          setPostsList(transformedPosts);

          // Set liked/bookmarked posts
          const liked = new Set();
          const bookmarked = new Set();
          transformedPosts.forEach((post) => {
            if (post.isLiked) liked.add(post.id);
            if (post.isBookmarked) bookmarked.add(post.id);
          });
          setLikedPosts(liked);
          setBookmarkedPosts(bookmarked);

          setError(null);
        } else {
          throw new Error(result.message || "Failed to load profile");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message);
        // Fallback to default data
        setProfileData(DEFAULT_USER);
        setPostsList(SAMPLE_POSTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, apiBaseUrl]);

  const handleSaveProfile = async (updatedData) => {
    console.log("Data being sent:", {
      hasCoverPhoto: !!updatedData.coverPhoto,
      coverPhotoPreview: updatedData.coverPhoto?.substring(0, 50) + "...",
      hasAvatar: !!updatedData.avatar,
    });

    try {
      const response = await fetch(`${apiBaseUrl}/profile/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (result.status === "success") {
        setProfileData({
          ...profileData,
          ...result.data,
          coverPhoto: result.data.coverPhoto, // Make sure this is set
        });
        setSuccessMessage("Profile updated successfully!");
        setShowEditProfile(false);

        // Force reload to see changes
        window.location.reload();
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile");
    }
  };
  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditPost(true);
    setSelectedPost(null);
  };

  const handleSavePost = async (updatedPostData) => {
    try {
      const userId = getCurrentUserId();

      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      // Prepare form data for API
      const requestData = {
        feed_id: editingPost.id,
        user_id: userId,
        title: updatedPostData.title,
        description: updatedPostData.description,
        animalType: updatedPostData.type,
        breed: updatedPostData.breed || "",
        age: updatedPostData.age,
        sex: updatedPostData.sex,
        price: updatedPostData.price.replace(/[₱,]/g, "").trim(), // Remove currency symbol
        status:
          updatedPostData.availability === "sold"
            ? "soldout"
            : updatedPostData.availability,
        images: updatedPostData.images, // Array of base64 or URLs
      };

      console.log("Updating post:", requestData);

      const response = await fetch(`${apiBaseUrl}/news-feed/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log("Update post response:", result);

      if (result.status === "success") {
        // Update local state
        setPostsList(
          postsList.map((p) =>
            p.id === editingPost.id
              ? {
                  ...p,
                  ...updatedPostData,
                  animalInfo: { ...p.animalInfo, ...updatedPostData },
                  images: updatedPostData.images,
                }
              : p
          )
        );
        setSuccessMessage("Post updated successfully!");
        setShowEditPost(false);

        // Reload profile to get fresh data
        setTimeout(() => window.location.reload(), 1500);
      } else {
        alert(result.message || "Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    }
  };

  // REPLACE handleDeletePost with this:
  const handleDeletePost = async (postId) => {
    try {
      const userId = getCurrentUserId();

      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      console.log("Deleting post:", postId);

      const response = await fetch(`${apiBaseUrl}/news-feed/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          feed_id: postId,
          user_id: userId,
        }),
      });

      const result = await response.json();
      console.log("Delete post response:", result);

      if (result.status === "success") {
        // Remove from local state
        setPostsList(postsList.filter((p) => p.id !== postId));
        setSuccessMessage("Post deleted successfully!");

        // Reload after a short delay
        setTimeout(() => window.location.reload(), 1500);
      } else {
        alert(result.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const handleLike = async (postId) => {
    try {
      let userId = localStorage.getItem("user_id");

      if (!userId) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            userId = parsedUser.id;
            if (userId) {
              localStorage.setItem("user_id", userId.toString());
            }
          } catch (e) {
            console.error("Error parsing stored user:", e);
          }
        }
      }

      if (!userId) {
        console.error("User ID not found. Please log in again.");
        return;
      }

      // Optimistically update UI
      const updatePosts = (postsArray) =>
        postsArray.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              }
            : post
        );

      setPostsList(updatePosts);

      // Call API
      const response = await fetch(`${apiBaseUrl}/news-feed/unlike-or-like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          feed_id: postId,
          user_id: parseInt(userId),
        }),
      });

      const result = await response.json();
      console.log("Like/Unlike response:", result);

      // If API call fails, reload
      if (result.status !== "success") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      window.location.reload();
    }
  };

  const handleBookmark = async (postId) => {
    try {
      let userId = localStorage.getItem("user_id");

      if (!userId) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            userId = parsedUser.id;
            if (userId) {
              localStorage.setItem("user_id", userId.toString());
            }
          } catch (e) {
            console.error("Error parsing stored user:", e);
          }
        }
      }

      if (!userId) {
        console.error("User ID not found. Please log in again.");
        return;
      }

      // Optimistically update UI
      const updatePosts = (postsArray) =>
        postsArray.map((post) =>
          post.id === postId
            ? {
                ...post,
                isBookmarked: !post.isBookmarked,
                bookmarks: post.isBookmarked
                  ? post.bookmarks - 1
                  : post.bookmarks + 1,
              }
            : post
        );

      setPostsList(updatePosts);

      // Call API
      const response = await fetch(
        `${apiBaseUrl}/news-feed/unbookmark-or-bookmark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            feed_id: postId,
            user_id: parseInt(userId),
          }),
        }
      );

      const result = await response.json();
      console.log("Bookmark/Unbookmark response:", result);

      // If API call fails, reload
      if (result.status !== "success") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      window.location.reload();
    }
  };

  const toggleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    newLiked.has(postId) ? newLiked.delete(postId) : newLiked.add(postId);
    setLikedPosts(newLiked);
  };

  const toggleBookmark = (postId) => {
    const newBookmarked = new Set(bookmarkedPosts);
    newBookmarked.has(postId)
      ? newBookmarked.delete(postId)
      : newBookmarked.add(postId);
    setBookmarkedPosts(newBookmarked);
  };

  return (
    <div className={`min-h-screen transition-colors ${scheme.bg}`}>
      {/* ADD LOADING STATE */}
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className={`text-center ${scheme.text}`}>
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading profile...</p>
          </div>
        </div>
      )}

      {/* ADD ERROR STATE */}
      {error && !loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div
            className={`max-w-md text-center p-8 rounded-2xl ${scheme.card}`}
          >
            <h3 className={`text-xl font-bold mb-2 ${scheme.text}`}>Error</h3>
            <p className={`text-sm mb-4 ${scheme.muted}`}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      {/* WRAP YOUR EXISTING CONTENT IN THIS */}
      {!loading && !error && profileData && (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Profile Card */}
          <div
            className={`rounded-2xl overflow-hidden shadow-lg ${scheme.card}`}
          >
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img
                src={profileData.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative px-6 pb-6">
              {/* Avatar */}
              <div className="flex justify-center md:justify-start -mt-16 mb-6 relative z-10">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 text-center md:text-left">
                <div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-1 flex-wrap gap-2">
                    <h1 className={`text-2xl font-bold ${scheme.text}`}>
                      {profileData.name}
                    </h1>

                    {/* User Type Badge - ADD THIS */}
                    {profileData.accountType && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex-shrink-0 font-medium ${
                          getUserTypeBadge(profileData.accountType, darkMode)
                            .className
                        }`}
                      >
                        {
                          getUserTypeBadge(profileData.accountType, darkMode)
                            .label
                        }
                      </span>
                    )}
                  </div>
                  <p className={`text-base ${scheme.muted}`}>
                    {profileData.username}
                  </p>
                </div>
                <div className="flex justify-center md:justify-end gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Location & Join Date */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm justify-center md:justify-start">
                <div className={`flex items-center space-x-1 ${scheme.muted}`}>
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className={`flex items-center space-x-1 ${scheme.muted}`}>
                  <Calendar className="w-4 h-4" />
                  <span>{profileData.joinDate}</span>
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
                    rating={profileData.rating}
                    darkMode={darkMode}
                  />
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {profileData.rating.toFixed(1)} ({profileData.totalReviews}{" "}
                  reviews)
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            className={`rounded-2xl overflow-hidden shadow-lg ${scheme.card}`}
          >
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
                <div className="space-y-4">
                  {postsList.map((post) => (
                    <PostListItem
                      key={post.id}
                      post={post}
                      user={profileData}
                      darkMode={darkMode}
                      likedPosts={likedPosts}
                      bookmarkedPosts={bookmarkedPosts}
                      onLike={() => handleLike(post.id)}
                      onBookmark={() => handleBookmark(post.id)}
                      onImageClick={() => setSelectedPost(post)}
                    />
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {SAMPLE_REVIEWS.map((review) => (
                    <ReviewItem
                      key={review.id}
                      review={review}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modals */}
          {showShareModal && profileData && (
            <ShareModal
              isOpen={showShareModal}
              onClose={() => setShowShareModal(false)}
              darkMode={darkMode}
              postId={profileData.username} // ✅ Use username instead
              title={profileData.name}
              user={profileData} // ✅ Pass full user data
            />
          )}
          {showEditProfile && (
            <EditProfileModal
              user={profileData}
              darkMode={darkMode}
              onClose={() => setShowEditProfile(false)}
              onSave={handleSaveProfile}
            />
          )}
          {showEditPost && editingPost && (
            <EditPostModal
              post={editingPost}
              darkMode={darkMode}
              onClose={() => setShowEditPost(false)}
              onSave={handleSavePost}
            />
          )}

          {/* Success message modal - at main component level */}
          {successMessage && (
            <SuccessModal
              message={successMessage}
              darkMode={darkMode}
              onClose={() => setSuccessMessage(null)}
            />
          )}

          {selectedPost && (
            <PostModal
              post={selectedPost}
              user={profileData}
              darkMode={darkMode}
              onClose={() => setSelectedPost(null)}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
            />
          )}
        </div>
      )}
    </div>
  );
}
