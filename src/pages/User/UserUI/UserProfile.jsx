import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  MessageCircle,
  Share,
  Camera,
  Edit,
  MapPin,
  Calendar,
  User,
  QrCode,
  X,
  Phone,
  ShieldCheck,
  Users,
  Store,
  ShoppingCart,
  MoreVertical,
  Trash2,
  Bookmark, // Fixed: Added missing import
} from "lucide-react";

// Mock useAuth hook
const useAuth = () => ({
  user: { name: "Alex Johnson", email: "alex@example.com" },
  isAuthenticated: true,
  logout: () => console.log("Logout"),
});

// Login Modal Component
const LoginModal = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Login Required
        </h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Post Options Dropdown Component
const PostOptionsDropdown = ({ postId, onEdit, onDelete, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
          darkMode
            ? "text-gray-400 hover:text-gray-300"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute right-0 top-full mt-1 w-48 rounded-lg shadow-lg border z-20 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="py-1">
              <button
                onClick={() => {
                  onEdit(postId);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <Edit className="w-4 h-4" />
                <span>Edit Post</span>
              </button>
              <button
                onClick={() => {
                  onDelete(postId);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2 ${
                  darkMode
                    ? "text-red-400 hover:text-red-300"
                    : "text-red-600 hover:text-red-700"
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Post</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Edit Post Modal Component
const EditPostModal = ({ isOpen, onClose, post, onSave, darkMode }) => {
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editType, setEditType] = useState("");

  useEffect(() => {
    if (post) {
      setEditContent(post.content || "");
      setEditTitle(post.animalInfo?.title || "");
      setEditPrice(post.animalInfo?.price || "");
      setEditType(post.animalInfo?.type || "");
    }
  }, [post]);

  const handleSave = () => {
    const updatedPost = {
      ...post,
      content: editContent,
      animalInfo: {
        ...post.animalInfo,
        title: editTitle,
        price: editPrice,
        type: editType,
      },
    };
    onSave(updatedPost);
    onClose();
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="sticky top-0 bg-inherit border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Edit Post
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Post title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Price
              </label>
              <input
                type="text"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="$0"
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Type
              </label>
              <input
                type="text"
                value={editType}
                onChange={(e) => setEditType(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Animal type"
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows="4"
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Write your post content..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className={`px-4 py-2 border rounded-md ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Edit Profile Modal Component
const EditProfileModal = ({
  isOpen,
  onClose,
  editForm,
  setEditForm,
  onSave,
  loading,
  darkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div
        className={`w-full max-w-4xl my-2 sm:my-4 rounded-xl shadow-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="sticky top-0 bg-inherit border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Edit Profile
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Pictures */}
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={
                    editForm.profilePic ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <label className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Change Photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=150&h=150&fit=crop&crop=face`;
                        setEditForm((prev) => ({
                          ...prev,
                          profilePic: mockUrl,
                        }));
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Cover Photo
              </label>
              <div className="space-y-2">
                <img
                  src={
                    editForm.coverPhoto ||
                    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=300&fit=crop"
                  }
                  alt="Cover"
                  className="w-full h-32 rounded-lg object-cover"
                />
                <label className="cursor-pointer inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Change Cover
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&h=300&fit=crop`;
                        setEditForm((prev) => ({
                          ...prev,
                          coverPhoto: mockUrl,
                        }));
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={editForm.firstName}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter first name"
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={editForm.middleName}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    middleName: e.target.value,
                  }))
                }
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter middle name"
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="surname"
                value={editForm.surname}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, surname: e.target.value }))
                }
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={editForm.address}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, address: e.target.value }))
              }
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Enter full address"
              required
            />
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Birthday <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="birthday"
                value={editForm.birthday}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, birthday: e.target.value }))
                }
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={editForm.age}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, age: e.target.value }))
                }
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter age"
                min="13"
                max="120"
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Sex <span className="text-red-500">*</span>
              </label>
              <select
                name="sex"
                value={editForm.sex}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, sex: e.target.value }))
                }
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              >
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              User Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={editForm.role}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, role: e.target.value }))
              }
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            >
              <option value="">Select role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="both">Buyer & Seller</option>
            </select>
          </div>

          {/* Password Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3
              className={`text-lg font-medium mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Change Password
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={editForm.password}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className={`w-full px-3 py-2 border rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={editForm.confirmPassword}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className={`w-full px-3 py-2 border rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            {editForm.password &&
              editForm.confirmPassword &&
              editForm.password !== editForm.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  Passwords do not match
                </p>
              )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              disabled={loading}
              className={`px-4 py-2 border rounded-md ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              } disabled:opacity-50`}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`max-w-md w-full p-6 rounded-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="text-center">
          <Trash2 className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2
            className={`text-xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Delete Post
          </h2>
          <p
            className={`text-sm mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2 border rounded-md ${
              darkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Phone Verification Modal
const PhoneVerificationModal = ({
  isOpen,
  onClose,
  onVerify,
  verificationCode,
  setVerificationCode,
  darkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`max-w-md w-full p-6 rounded-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="text-center">
          <Phone className="w-12 h-12 mx-auto mb-4 text-green-500" />
          <h2
            className={`text-xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Verify Phone Number
          </h2>
          <p
            className={`text-sm mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Enter the verification code sent to your phone (use 123456 for demo)
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md text-center text-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Enter 6-digit code"
            maxLength="6"
          />

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2 border rounded-md ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onVerify}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// QR Code Modal
const QRCodeModal = ({ isOpen, onClose, user, darkMode }) => {
  if (!isOpen) return null;

  const generateQRCode = () => {
    const qrData = `https://animalapp.com/profile/${user.username}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      qrData
    )}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`max-w-md w-full p-6 rounded-xl text-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          My QR Code
        </h2>
        <div className="mb-4">
          <img
            src={generateQRCode()}
            alt="QR Code"
            className="w-48 h-48 mx-auto border rounded-lg"
          />
        </div>
        <p
          className={`text-sm mb-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Scan this code to view my profile
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Share Modal with QR Code
const ShareModal = ({ isOpen, onClose, post, user, darkMode }) => {
  if (!isOpen || !post) return null;

  const generateShareQRCode = () => {
    const shareData = `https://animalapp.com/post/${post.id}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      shareData
    )}`;
  };

  const shareUrl = `https://animalapp.com/post/${post.id}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`max-w-md w-full p-6 rounded-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Share Post
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="mb-4">
            <img
              src={generateShareQRCode()}
              alt="Share QR Code"
              className="w-48 h-48 mx-auto border rounded-lg"
            />
          </div>
          <p
            className={`text-sm mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Scan this code to view the post
          </p>
        </div>

        <div className="space-y-3">
          <div
            className={`p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p
              className={`text-sm font-mono break-all ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {shareUrl}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={copyToClipboard}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Copy Link
            </button>
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2 border rounded-lg ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserProfile = ({ darkMode = false }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [averageRating] = useState(4.2);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Edit form state
  const [editForm, setEditForm] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    bio: "",
    address: "",
    website: "",
    phone: "",
    age: "",
    sex: "",
    birthday: "",
    role: "both",
    animalsInterested: [],
    profilePic: "",
    coverPhoto: "",
    password: "",
    confirmPassword: "",
  });

  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      content:
        "Just captured this amazing shot of a red fox in Yellowstone! The early morning light was perfect.",
      images: [
        "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&h=400&fit=crop",
      ],
      likes: 234,
      comments: 18,
      timestamp: "2 days ago",
      animalInfo: {
        title: "Beautiful Red Fox Photography",
        type: "Wildlife Photography",
        price: "$150",
        availability: "available",
      },
    },
    {
      id: 2,
      content:
        "Volunteer day at the local animal shelter. These puppies are looking for forever homes!",
      images: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop",
      ],
      likes: 456,
      comments: 32,
      timestamp: "5 days ago",
      animalInfo: {
        title: "Adorable Rescue Puppies",
        type: "Dog",
        price: "Free",
        availability: "available",
      },
    },
  ]);

  const { user: authUser, isAuthenticated } = useAuth();

  // Initialize form with user data
  useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        firstName: "Alex",
        middleName: "",
        surname: "Johnson",
        email: "alex@example.com",
        bio: "Animal lover and wildlife enthusiast. Welcome to my profile!",
        address: "San Fernando, Central Luzon, PH",
        website: "alexwildlife.com",
        phone: "+63 912 345 6789",
        age: "28",
        sex: "male",
        birthday: "1995-06-15",
        role: "both",
        animalsInterested: ["Dogs", "Cats", "Birds"],
        profilePic:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        coverPhoto:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=300&fit=crop",
        password: "",
        confirmPassword: "",
      };
      setEditForm(userData);
      setProfileData(userData);
      setPhoneVerified(true);
    }
  }, [isAuthenticated]);

  const user =
    isAuthenticated && profileData
      ? {
          name: `${profileData.firstName} ${profileData.surname}`.trim(),
          username: `@${(profileData.firstName || "user").toLowerCase()}${(
            profileData.surname || ""
          ).toLowerCase()}`,
          bio: profileData.bio,
          location: profileData.address,
          avatar: profileData.profilePic,
          coverPhoto: profileData.coverPhoto,
          phone: profileData.phone,
          joinDate: "Joined June 2023",
          followers: 156,
          following: 89,
          posts: userPosts.length,
          rating: averageRating,
          totalReviews: 12,
          isVerified: phoneVerified,
          userType: profileData.role,
        }
      : {
          name: "Guest User",
          username: "@guest",
          bio: "Please login to view your profile",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          coverPhoto:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=300&fit=crop",
          location: "Unknown",
          joinDate: "Not logged in",
          followers: 0,
          following: 0,
          posts: 0,
          rating: 0,
          totalReviews: 0,
          isVerified: false,
          userType: "both",
        };

  const reviews = [
    {
      id: 1,
      reviewer: "Sarah Johnson",
      reviewerAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
      rating: 4.5,
      comment:
        "Alex is amazing with animals! Helped me find the perfect rescue dog for my family.",
      timestamp: "1 week ago",
    },
    {
      id: 2,
      reviewer: "Mike Chen",
      reviewerAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 3.75,
      comment:
        "Great photographer and passionate about wildlife conservation. Highly recommend!",
      timestamp: "2 weeks ago",
    },
  ];

  // Post management functions
  const handleEditPost = (postId) => {
    const post = userPosts.find((p) => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setShowEditPost(true);
    }
  };

  const handleDeletePost = (postId) => {
    setSelectedPost(userPosts.find((p) => p.id === postId));
    setShowDeleteConfirm(true);
  };

  const confirmDeletePost = () => {
    if (selectedPost) {
      setUserPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
    }
    setShowDeleteConfirm(false);
    setSelectedPost(null);
  };

  const handleSaveEditPost = (updatedPost) => {
    setUserPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  const toggleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
      setUserPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: p.likes - 1 } : p))
      );
    } else {
      newLikedPosts.add(postId);
      setUserPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
      );
    }
    setLikedPosts(newLikedPosts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const mockImageUrl =
        type === "profilePic"
          ? `https://images.unsplash.com/photo-${Date.now()}?w=150&h=150&fit=crop&crop=face`
          : `https://images.unsplash.com/photo-${Date.now()}?w=800&h=300&fit=crop`;

      setEditForm((prev) => ({
        ...prev,
        [type]: mockImageUrl,
      }));
    }
  };

  const handleSaveProfile = () => {
    setLoading(true);
    setTimeout(() => {
      setProfileData(editForm);
      setLoading(false);
      setShowEditProfile(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handlePhoneVerification = () => {
    if (verificationCode === "123456") {
      setPhoneVerified(true);
      setShowPhoneVerification(false);
      alert("Phone number verified successfully!");
    } else {
      alert("Invalid verification code. Try 123456 for demo.");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;

      if (starValue <= rating) {
        return (
          <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
        );
      }

      if (starValue - rating < 1) {
        const percent = Math.round((rating - Math.floor(rating)) * 100);
        return (
          <div key={index} className="relative w-5 h-5">
            <Star className="w-5 h-5 absolute text-gray-300 fill-current" />
            <div
              className="absolute overflow-hidden"
              style={{ width: `${percent}%`, height: "100%" }}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </div>
          </div>
        );
      }

      return (
        <Star key={index} className="w-5 h-5 text-gray-300 fill-current" />
      );
    });
  };

  const renderUserTypeBadge = (userType) => {
    const badges = {
      buyer: { icon: ShoppingCart, text: "Buyer", color: "blue" },
      seller: { icon: Store, text: "Seller", color: "green" },
      both: { icon: Users, text: "Buyer & Seller", color: "purple" },
    };

    const badge = badges[userType] || badges.both;
    const Icon = badge.icon;

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          badge.color === "blue"
            ? darkMode
              ? "bg-blue-900/50 text-blue-400"
              : "bg-blue-100 text-blue-700"
            : badge.color === "green"
            ? darkMode
              ? "bg-green-900/50 text-green-400"
              : "bg-green-100 text-green-700"
            : darkMode
            ? "bg-purple-900/50 text-purple-400"
            : "bg-purple-100 text-purple-700"
        }`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {badge.text}
      </div>
    );
  };

  return (
    <div className="w-full py-4 sm:py-6 flex justify-center min-h-screen">
      <div className="w-full max-w-4xl px-2 sm:px-4">
        {!isAuthenticated ? (
          <div
            className={`text-center py-20 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg`}
          >
            <div
              className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              <User className="w-20 h-20 mx-auto mb-4 text-gray-400" />
              <h2
                className={`text-2xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Profile Access Required
              </h2>
              <p>Please login to view your profile and manage your posts.</p>
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Login to Continue
            </button>
          </div>
        ) : loading ? (
          <div
            className={`text-center py-20 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg`}
          >
            <div
              className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2
                className={`text-2xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Loading Profile
              </h2>
              <p>Please wait while we fetch your profile data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Cover Photo */}
            <div className="relative h-48 sm:h-64 md:h-80 rounded-t-xl overflow-hidden shadow-lg">
              <img
                src={user.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Header */}
            <div
              className={`relative px-4 sm:px-6 pb-6 rounded-b-xl transition-colors duration-300 ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              {/* Avatar */}
              <div className="flex justify-center sm:justify-start">
                <div className="relative -mt-16 md:-mt-20">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="mt-4 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1">
                      <h1
                        className={`text-2xl sm:text-3xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {user.name}
                      </h1>
                      {user.isVerified && (
                        <ShieldCheck
                          className="w-6 h-6 text-blue-500 fill-current"
                          title="Verified Account"
                        />
                      )}
                    </div>
                    <p
                      className={`text-lg ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {user.username}
                    </p>

                    <div className="flex justify-center sm:justify-start mt-2">
                      {renderUserTypeBadge(user.userType)}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => setShowQRCode(true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                          : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                      }`}
                    >
                      <QrCode className="w-4 h-4 inline mr-2" />
                      QR Code
                    </button>
                    <button
                      onClick={() => setShowEditProfile(true)}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Edit className="w-4 h-4 inline mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                  <p
                    className={`text-base leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {user.bio}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm">
                  <div
                    className={`flex items-center space-x-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{user.joinDate}</span>
                  </div>
                  {!user.isVerified && (
                    <button
                      onClick={() => setShowPhoneVerification(true)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Verify Phone</span>
                    </button>
                  )}
                </div>
                <div className="mt-6 sm:grid-cols-2 gap-4 text-center max-w-md mx-auto">
                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      {renderStars(user.rating)}
                    </div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {user.rating.toFixed(1)} ({user.totalReviews} reviews)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div
              className={`mt-6 ${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg`}
            >
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {["posts", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab
                          ? "border-green-500 text-green-600"
                          : `border-transparent ${
                              darkMode
                                ? "text-gray-400 hover:text-gray-300"
                                : "text-gray-500 hover:text-gray-700"
                            } hover:border-gray-300`
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "posts" && (
                  <div className="space-y-4 sm:space-y-6">
                    {userPosts.length === 0 ? (
                      <div className="text-center py-12">
                        <div className={`text-gray-400 mb-4`}>
                          <Edit className="w-12 h-12 mx-auto" />
                        </div>
                        <h3
                          className={`text-lg font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          No posts yet
                        </h3>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Start sharing your animal experiences!
                        </p>
                      </div>
                    ) : (
                      userPosts.map((post) => (
                        <div
                          key={post.id}
                          className={`rounded-lg border transition-colors duration-300 ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700' 
                              : 'bg-white border-green-100'
                          }`}
                        >
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
                                  <div className="flex items-start space-x-2">
                                    {/* Left side: name + timestamp */}
                                    <div className="flex flex-col">
                                      <div className="flex items-center space-x-1">
                                        <h3
                                          className={`font-semibold ${
                                            darkMode ? "text-white" : "text-gray-900"
                                          }`}
                                        >
                                          {user.name}
                                        </h3>
                                        {user.isVerified && (
                                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                          </div>
                                        )}
                                      </div>
                                      {/* timestamp under the name */}
                                      <p
                                        className={`text-sm ${
                                          darkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                      >
                                        {post.timestamp}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <PostOptionsDropdown
                                postId={post.id}
                                onEdit={handleEditPost}
                                onDelete={handleDeletePost}
                                darkMode={darkMode}
                              />
                            </div>
                          </div>

                          {/* Post Content */}
                          <div className="px-6 pb-4">
                            {/* Post text content */}
                            {post.content && (
                              <p
                                className={`mb-4 text-base leading-relaxed ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {post.content}
                              </p>
                            )}
                            
                            {/* Animal Information Card */}
                            {post.animalInfo && (
                              <div className="mt-4">
                            
                                
                               
                                
                               
                              </div>
                            )}
                          </div>

                          {/* Post Images */}
                          {post.images && post.images.length > 0 && (
                            <div className="px-6 pb-4">
                              <div className={`grid gap-2 rounded-lg overflow-hidden ${
                                post.images.length === 1 ? 'grid-cols-1' :
                                post.images.length === 2 ? 'grid-cols-2' :
                                post.images.length === 3 ? 'grid-cols-2' :
                                'grid-cols-2'
                              }`}>
                                {post.images.slice(0, 4).map((image, index) => (
                                  <div key={index} className={`relative ${
                                    post.images.length === 3 && index === 0 ? 'row-span-2' : ''
                                  }`}>
                                    <img
                                      src={image}
                                      alt={`Post image ${index + 1}`}
                                      className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity duration-200"
                                      style={{ minHeight: '200px', maxHeight: '400px' }}
                                    />
                                    {index === 3 && post.images.length > 4 && (
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

                          {/* Post Stats */}
                          <div className={`px-3 sm:px-6 py-2 sm:py-3 border-t flex items-center justify-between ${
                            darkMode ? 'border-gray-700' : 'border-gray-100'
                          }`}>
                            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                {post.likes} likes
                              </span>
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                {post.comments || 0} comments
                              </span>
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                {post.bookmarks || 0} bookmarks
                              </span>
                            </div>
                          </div>

                          {/* Post Actions */}
                          <div className={`px-2 sm:px-6 py-2 sm:py-3 border-t flex items-center justify-around ${
                            darkMode ? 'border-gray-700' : 'border-gray-100'
                          }`}>
                            {/* Like Button */}
                            <button
                              onClick={() => toggleLike(post.id)}
                              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                                likedPosts.has(post.id)
                                  ? darkMode
                                    ? 'text-green-400 bg-gray-700'
                                    : 'text-green-600 bg-green-50'
                                  : darkMode
                                    ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
                              }`}
                            >
                              <Heart
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  likedPosts.has(post.id) ? "fill-current" : ""
                                }`}
                              />
                              <span className="font-medium text-xs sm:text-sm hidden sm:inline">Like</span>
                            </button>

                            {/* Chat Button */}
                            <button className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                              darkMode
                                ? 'text-gray-400 hover:bg-gray-700 hover:text-blue-400'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                            }`}>
                              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="font-medium text-xs sm:text-sm hidden sm:inline">Chat</span>
                            </button>

                            {/* Bookmark Button */}
                            <button 
                              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                                darkMode
                                  ? 'text-gray-400 hover:bg-gray-700 hover:text-yellow-400'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-yellow-600'
                              }`}
                            >
                              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="font-medium text-xs sm:text-sm hidden sm:inline">Save</span>
                            </button>

                            {/* Share Button */}
                            <button 
                              onClick={() => {
                                setSelectedPost(post);
                                setShowShareModal(true);
                              }}
                              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                                darkMode
                                  ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
                              }`}
                            >
                              <Share className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="font-medium text-xs sm:text-sm hidden sm:inline">
                                Share
                              </span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {reviews.length === 0 ? (
                      <div className="text-center py-12">
                        <div className={`text-gray-400 mb-4`}>
                          <Star className="w-12 h-12 mx-auto" />
                        </div>
                        <h3
                          className={`text-lg font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          No reviews yet
                        </h3>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Reviews from other users will appear here.
                        </p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className={`border rounded-lg p-6 transition-colors duration-300 ${
                            darkMode
                              ? "border-gray-700 bg-gray-700/50"
                              : "border-gray-200 bg-gray-50/50"
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.reviewerAvatar}
                              alt={review.reviewer}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4
                                  className={`font-medium ${
                                    darkMode ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {review.reviewer}
                                </h4>
                                <span
                                  className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  {review.timestamp}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 mb-3">
                                {renderStars(review.rating)}
                                <span
                                  className={`ml-2 text-sm font-medium ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  {review.rating.toFixed(1)}
                                </span>
                              </div>
                              <p
                                className={`text-base leading-relaxed ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Modals */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          darkMode={darkMode}
        />

        <EditProfileModal
          isOpen={showEditProfile}
          onClose={() => setShowEditProfile(false)}
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={handleSaveProfile}
          loading={loading}
          darkMode={darkMode}
        />

        <QRCodeModal
          isOpen={showQRCode}
          onClose={() => setShowQRCode(false)}
          user={user}
          darkMode={darkMode}
        />

        <ShareModal
          isOpen={showShareModal}
          onClose={() => {
            setShowShareModal(false);
            setSelectedPost(null);
          }}
          post={selectedPost}
          user={user}
          darkMode={darkMode}
        />

        <PhoneVerificationModal
          isOpen={showPhoneVerification}
          onClose={() => setShowPhoneVerification(false)}
          onVerify={handlePhoneVerification}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          darkMode={darkMode}
        />

        <EditPostModal
          isOpen={showEditPost}
          onClose={() => setShowEditPost(false)}
          post={selectedPost}
          onSave={handleSaveEditPost}
          darkMode={darkMode}
        />

        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDeletePost}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default UserProfile;