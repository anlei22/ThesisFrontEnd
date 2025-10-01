import React, { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, User, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Added this import
import { useAuth } from "../context/AuthContext";

const LoginModal = ({
  isOpen,
  onClose,
  darkMode,
  onForgotPassword,   // 👈 new prop
  onCreateAccount     // 👈 new prop (can be removed if not needed)
}) => {  // ✅ close props destructure here

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate(); // ✅ Added this hook

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email) && formData.email !== "admin") {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4 && formData.password !== "admin") {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onClose();
        setFormData({ email: "", password: "" });
      } else {
        setErrors({ general: result.error || "Login failed" });
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle create account navigation
  const handleCreateAccount = () => {
    onClose(); // Close the modal first
    navigate("/Register"); // Then navigate to register page
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
     <div
  className={`relative w-full max-w-lg max-h-[80vh] rounded-2xl shadow-2xl overflow-y-auto transition-all duration-300 ${
    darkMode
      ? "bg-gray-900 border border-gray-700"
      : "bg-white border border-gray-200"
  }`}
  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
>
        {/* Close Button */}
        <div className="flex justify-end pt-4 pr-4">
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-all duration-200 ${
              darkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        {/* Header with Logo, Text, and Welcome Back */}
        <div className="flex flex-col items-center justify-center pt-2 pb-6 px-8">
          {/* Logo + MarketHUB */}
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:space-x-4">
            {/* Logo */}
            <svg
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 mb-2 sm:mb-0"
            >
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="url(#gradientBg)"
                stroke="#2563eb"
                strokeWidth="2"
              />
              <defs>
                <linearGradient
                  id="gradientBg"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#3b82f6", stopOpacity: 0.1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#1d4ed8", stopOpacity: 0.2 }}
                  />
                </linearGradient>
                <linearGradient
                  id="pawGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" style={{ stopColor: "#059669" }} />
                  <stop offset="100%" style={{ stopColor: "#047857" }} />
                </linearGradient>
              </defs>

              {/* Tricycle + Paw */}
              <path
                d="M25 45 L35 45 L40 75 L75 75 L80 55 L45 55"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="45" cy="85" r="4" fill="#2563eb" />
              <circle cx="70" cy="85" r="4" fill="#2563eb" />

              <ellipse
                cx="60"
                cy="55"
                rx="8"
                ry="10"
                fill="url(#pawGradient)"
              />
              <ellipse cx="52" cy="42" rx="4" ry="6" fill="url(#pawGradient)" />
              <ellipse cx="60" cy="38" rx="4" ry="6" fill="url(#pawGradient)" />
              <ellipse cx="68" cy="42" rx="4" ry="6" fill="url(#pawGradient)" />
              <ellipse cx="75" cy="48" rx="3" ry="5" fill="url(#pawGradient)" />

              {/* Heart */}
              <path
                d="M45 25 C42 22, 37 22, 37 28 C37 32, 45 40, 45 40 S53 32, 53 28 C53 22, 48 22, 45 25 Z"
                fill="#ef4444"
                opacity="0.8"
              />
            </svg>

            {/* Welcome Back + Subtitle */}

            {/* MarketHUB Text */}
            <h1
              className={`text-2xl sm:text-3xl font-bold text-center sm:text-left ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Animal <span className="text-green-600">MarketHUB</span>
            </h1>
          </div>

          {/* Welcome Back + Subtitle */}
          <h2
            className={`text-2xl font-bold mb-1 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Welcome Back!
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-center">
            Sign in to your account
          </p>
        </div>

        {/* Error */}
        {errors.general && (
          <div
            className={`mx-8 mb-4 p-4 rounded-xl border ${
              darkMode
                ? "bg-red-900/20 border-red-800/30 text-red-400"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="text-sm font-medium">{errors.general}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label
              className={`block text-sm font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <div className="relative">
              <UserIcon
                className={`w-5 h-5 absolute left-3 top-3.5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500/20"
                } ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              className={`block text-sm font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className={`w-5 h-5 absolute left-3 top-3.5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500/20"
                } ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-3.5 transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onForgotPassword} // 👈 go to Forgot Password file
              className={`text-sm font-semibold transition-colors duration-200 hover:underline ${
                darkMode
                  ? "text-green-400 hover:text-green-300"
                  : "text-green-600 hover:text-green-700"
              }`}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed scale-95"
                : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-500/30 active:scale-95 shadow-lg"
            } text-white`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-4 ${
                  darkMode
                    ? "bg-gray-900 text-gray-400"
                    : "bg-white text-gray-500"
                }`}
              >
                or
              </span>
            </div>
          </div>

          {/* Create Account */}
          <div className="text-center">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Don't have an account?
            </p>
            <button
              type="button"
              onClick={handleCreateAccount} // ✅ Now uses the proper function
              className={`mt-2 text-lg font-semibold transition-colors duration-200 hover:underline ${
                darkMode
                  ? "text-green-400 hover:text-green-300"
                  : "text-green-600 hover:text-green-700"
              }`}
            >
              Create Account
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginModal;