import React from "react";
import {
  Star,
  MapPin,
  MessageCircle,
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Package,
  Shield,
} from "lucide-react";

const UserProfileView = ({ user, onBack, darkMode }) => {
  if (!user) return null;

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

  const userLocation = locations.find((loc) => loc.id === user.location);

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-lg`}>
      {/* Header with Back Button */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className={`p-2 rounded-full hover:bg-gray-100 ${
              darkMode ? "hover:bg-gray-700 text-gray-400" : "text-gray-500"
            } transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            User Profile
          </h2>
        </div>

        {/* Profile Header */}
        <div className="flex items-start gap-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-green-200 dark:ring-green-600"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.type === "seller"
                    ? darkMode
                      ? "bg-blue-600 text-blue-100"
                      : "bg-blue-100 text-blue-600"
                    : darkMode
                    ? "bg-purple-600 text-purple-100"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {user.type === "seller" ? "Seller" : "Buyer"}
              </span>
            </div>

            <div
              className={`flex items-center gap-2 mb-3 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{userLocation?.name}</span>
            </div>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(user.rating)
                      ? "text-yellow-400 fill-current"
                      : darkMode
                      ? "text-gray-600"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span
                className={`ml-2 font-semibold ${
                  darkMode ? "text-yellow-400" : "text-yellow-600"
                }`}
              >
                {user.rating} / 5.0
              </span>
              <span
                className={`ml-2 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                (Based on customer reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Stats Cards for Sellers */}
        {user.type === "seller" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Package
                  className={`w-5 h-5 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Total Listings
                </span>
              </div>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.totalListings}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield
                  className={`w-5 h-5 ${
                    darkMode ? "text-green-400" : "text-green-600"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Trust Score
                </span>
              </div>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {Math.round(user.rating * 20)}%
              </p>
            </div>
          </div>
        )}

        {/* Specialties for Sellers */}
        {user.type === "seller" && user.specialties && (
          <div>
            <h4
              className={`text-lg font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Specialties
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode
                      ? "bg-green-600 text-green-100"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div>
          <h4
            className={`text-lg font-semibold mb-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Contact Information
          </h4>
          <div className="space-y-3">
            <div
              className={`flex items-center gap-3 p-3 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <Phone
                className={`w-5 h-5 ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
              />
              <span
                className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                +63 912 345 6789
              </span>
            </div>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <Mail
                className={`w-5 h-5 ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
              />
              <span
                className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {user.name.toLowerCase().replace(/\s+/g, ".")}@email.com
              </span>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div>
          <div
            className={`flex items-center gap-3 p-3 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <Calendar
              className={`w-5 h-5 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Member since
              </span>
              <p
                className={`font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                January 2023
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              darkMode
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            Send Message
          </button>
          <button
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors border-2 ${
              darkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            View Listings
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;