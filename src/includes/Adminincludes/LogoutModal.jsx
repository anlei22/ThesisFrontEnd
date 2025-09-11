// Logout Modal Component
const LogoutConfirmModal = ({ isOpen, onClose, onConfirm, darkMode = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`relative w-full max-w-md rounded-lg shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className={`w-6 h-6 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-500'
            }`} />
            <h2 className={`text-xl font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Confirm Logout
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className={`text-sm mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Are you sure you want to logout? You'll need to login again to access all features.
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};