import React from "react";
import { XMarkIcon, ShareIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { QRCodeCanvas } from "qrcode.react";

const ShareModal = ({ isOpen, onClose, darkMode, slug, title = "Animal Post" }) => {
  // Fix for Next.js / SSR
  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/post/${slug}` : "";

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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <ShareIcon
              className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`}
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
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code */}
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
            className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Scan QR code to view this post
          </p>
        </div>

        {/* Share URL */}
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
              <ClipboardIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
