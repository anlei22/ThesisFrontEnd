import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon ,} from "@heroicons/react/24/outline";

const SharedPostView = ({ darkMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);

  // Get API URL from environment
  const API_URL = import.meta.env.VITE_BACKEND_URI || "https://thesis-backend-main-oin9yk.laravel.cloud/api";
  const STORAGE_URL = import.meta.env.VITE_BACKEND_URI?.replace('/api', '') || "https://thesis-backend-main-oin9yk.laravel.cloud";
useEffect(() => {
  const fetchPost = async () => {
    try {
      if (!id) {
        setError("No post ID provided");
        setLoading(false);
        return;
      }

      // Remove trailing slashes from env variables
      const API_URL = (import.meta.env.VITE_BACKEND_URI || "https://thesis-backend-main-oin9yk.laravel.cloud/api").replace(/\/+$/, '');
      const STORAGE_URL = API_URL.replace('/api', '');
      
      console.log("🔍 Fetching post ID:", id);
      console.log("📡 API URL:", `${API_URL}/news-feed/get/${id}`);
      console.log("💾 Storage URL:", STORAGE_URL);

      const response = await fetch(`${API_URL}/news-feed/get/${id}`);
      
      console.log("📨 Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ API Response:", data);

      if (data.status === "success" && data.data) {
        // Transform the data to include full image URLs
        const transformedPost = {
          ...data.data,
          images: (data.data.images || []).map((imagePath) => {
            // Handle different image path formats
            if (typeof imagePath === 'string') {
              if (imagePath.startsWith('http')) {
                return imagePath;
              }
              return `${STORAGE_URL}/uploads/news_feed/${imagePath}`;
            }
            if (imagePath.image_path) {
              if (imagePath.image_path.startsWith('http')) {
                return imagePath.image_path;
              }
              return `${STORAGE_URL}/uploads/news_feed/${imagePath.image_path}`;
            }
            return `${STORAGE_URL}/uploads/news_feed/${imagePath}`;
          })
        };
        
        console.log("🖼️ Transformed images:", transformedPost.images);
        setPost(transformedPost);
        setError(null);
      } else {
        setError(data.message || "Failed to load post");
      }
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  fetchPost();
}, [id]);

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Date unknown";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${darkMode ? "border-green-400" : "border-green-600"}`}></div>
          <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Loading post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="text-center px-4">
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Post Not Found
          </h2>
          <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {error || "The post you are looking for does not exist."}
          </p>
          <button
            onClick={() => navigate('/')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              darkMode
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const images = post.images || [];
  const hasMultipleImages = images.length > 1;

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} py-8 px-4`}>
      <div className="max-w-3xl mx-auto">
      

        {/* Main Card */}
        <div className={`rounded-lg overflow-hidden shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          
          {/* User Info */}
          <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center space-x-3">
              <img
                src={
                  post.creator?.profile_picture ||
                  `https://ui-avatars.com/api/?name=${post.creator?.FirstName}+${post.creator?.LastName}&background=10b981&color=fff`
                }
                alt={post.creator?.FirstName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {post.creator?.FirstName} {post.creator?.LastName}
                  </h2>
                  {post.creator?.email_verified_at && (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {formatTimestamp(post.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="relative bg-black">
              <img
                src={images[currentImageIndex]}
                alt={post.title}
                className="w-full h-96 object-contain"
                onError={(e) => {
                  console.error('Image load error:', images[currentImageIndex]);
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />

              {hasMultipleImages && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-black shadow-lg"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-black shadow-lg"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </div>

                  {/* Thumbnails */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? "border-green-400 ring-2 ring-green-400 scale-110"
                              : "border-gray-600 hover:border-gray-400"
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
                  </div>
                </>
              )}
            </div>
          )}

          {/* Post Details */}
          <div className="p-6">
            {/* Title */}
            <h1 className={`text-3xl font-bold mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`}>
              {post.title}
            </h1>

            {/* Status Badge */}
            {post.status && (
              <div className="mb-4">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium capitalize ${
                  post.status === "available"
                    ? darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"
                    : darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"
                }`}>
                  {post.status}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <h3 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Price
              </h3>
              <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {post.price === "0" || post.price === 0 || !post.price
                  ? "Free"
                  : `₱${parseFloat(post.price).toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </p>
            </div>

            {/* Description */}
            {post.description && (
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Description
                </h3>
                <p className={`leading-relaxed whitespace-pre-wrap ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {post.description}
                </p>
              </div>
            )}

            {/* Details Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              {/* Left Column */}
              <div className="space-y-4">
                {post.animal_type && (
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Animal Type
                    </h4>
                    <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"
                    }`}>
                      {post.animal_type?.name || "Not specified"}
                    </p>
                  </div>
                )}

                {post.breed && (
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Breed
                    </h4>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      {post.breed}
                    </p>
                  </div>
                )}

                {post.age && (
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Age
                    </h4>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      {post.age} years old
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {post.sex && (
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Sex
                    </h4>
                    <p className={`capitalize ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {post.sex}
                    </p>
                  </div>
                )}

                {post.location && (
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Location
                    </h4>
                    <div className="flex items-start space-x-2">
                      <MapPinIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                      <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        {post.location}
                      </p>
                    </div>
                  </div>
                )}

                {(post.count_likes > 0 || post.count_bookmarks > 0) && (
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Engagement
                    </h4>
                    <div className="flex items-center space-x-4">
                      <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        ❤️ {post.count_likes || 0} likes
                      </span>
                      <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        🔖 {post.count_bookmarks || 0} saves
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Section */}
            <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Interested in this {post.animal_type?.name || "animal"}?
              </h3>
              <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Contact {post.creator?.FirstName} {post.creator?.LastName} to learn more
              </p>
              <button 
                onClick={() => navigate('/')}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                View More Animals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedPostView;