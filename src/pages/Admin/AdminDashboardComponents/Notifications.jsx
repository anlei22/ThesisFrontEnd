import React, { useState, useEffect } from "react";
import {
  User,
  Flag,
  X,
  Trash2,
  AlertCircle,
  Loader2,
  UserPlus,
  PlusSquare,
  Activity,
  FileText,
  Mail,
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const formatTimestamp = (dateString) => {
    if (!dateString) return 'Unknown time';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const fetchReports = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/reports', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.status}`);
      }

      const data = await response.json();
      
      const transformedNotifications = data.map((report) => ({
  id: report.id,
  type: "report",
  title: "Content Reported",
  message: `${report.reporter?.name || 'Unknown user'} reported "${report.post?.title || 'Unknown post'}" for ${report.reason}`,
  timestamp: formatTimestamp(report.created_at),
  isRead: false,
  data: {
    postId: report.post_id,
    postTitle: report.post?.title || `Post #${report.post_id}`,
    postDescription: report.post?.description || '',
    postAuthor: report.post?.author?.name || 'Unknown',
    postAuthorEmail: report.post?.author?.email || '',
    postAuthorId: report.post?.author?.id || null,
    reportedBy: report.reporter?.name || 'Unknown',
    reportedByEmail: report.reporter?.email || '',
    reportedById: report.reported_by,
    reason: report.reason,
    description: report.description,
    reportDate: report.created_at,
  },
}));


      setNotifications(transformedNotifications);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching reports:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const notificationTypes = ["all", "user_registration", "report", "user_activity"];

  const filteredNotifications = notifications.filter(
    (n) => notificationFilter === "all" || n.type === notificationFilter
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const showDeleteConfirmation = (notification, e) => {
    e.stopPropagation();
    setNotificationToDelete(notification);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!notificationToDelete) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`https://thesis-backend-main-oin9yk.laravel.cloud/api/reports/delete/${notificationToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete report');
      }

      if (selectedNotification?.id === notificationToDelete.id) {
        closeModal();
      }

      setNotifications((prev) =>
        prev.filter((n) => n.id !== notificationToDelete.id)
      );

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (err) {
      console.error('Error deleting report:', err);
      alert('Failed to delete report. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setNotificationToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setNotificationToDelete(null);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  const getNotificationIcon = (type, data) => {
    switch (type) {
      case "user_registration":
        return <UserPlus className="w-5 h-5 text-blue-600" />;
      case "report":
        return <Flag className="w-5 h-5 text-red-600" />;
      case "user_activity":
        if (data?.action === "post_created") {
          return <PlusSquare className="w-5 h-5 text-green-600" />;
        } else if (data?.action === "multiple_posts") {
          return <AlertCircle className="w-5 h-5 text-orange-600" />;
        }
        return <Activity className="w-5 h-5 text-green-600" />;
      default:
        return <User className="w-5 h-5 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Reports</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchReports}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-gray-50 p-4">
      {showSuccessMessage && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Report Deleted</h3>
            <p className="text-gray-600 text-sm">The report has been successfully removed.</p>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 -mx-4 px-4 mb-6">
        <div className="py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col space-y-2">
              <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-slate-900">
                Reports
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Insights and summaries of your animal marketplace
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
                >
                  Mark All Read
                </button>
              )}
              <div className="text-xs sm:text-sm text-slate-500">
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="text-gray-400 mb-2">
              <Flag className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">No reports found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`bg-white p-3 sm:p-4 rounded-xl shadow-sm cursor-pointer border-l-4 transition-all duration-200 hover:shadow-md group ${
                !notification.isRead ? "border-red-500 bg-red-50/20" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type, notification.data)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Reported by: {notification.data.reportedBy}
                      </span>
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => showDeleteConfirmation(notification, e)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Enhanced Modal with Reporter and Post Author Details */}
      {showModal && selectedNotification && (
    <div class="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-40 p-2 sm:p-4">

   <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] sm:max-h-[90vh] overflow-hidden shadow-2xl mx-2 mt-8 sm:mx-0">
            <header className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                {getNotificationIcon(selectedNotification.type, selectedNotification.data)}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  {selectedNotification.title}
                </h3>
              </div>
            </header>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
              {/* Report Details */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Report Details</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Flag className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Reason</p>
                      <p className="text-base text-gray-900">{selectedNotification.data.reason}</p>
                    </div>
                  </div>
                  {selectedNotification.data.description && (
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">Description</p>
                        <p className="text-base text-gray-900">{selectedNotification.data.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reported By Section */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Reported By</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{selectedNotification.data.reportedBy}</p>
                      {selectedNotification.data.reportedByEmail && (
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" />
                          {selectedNotification.data.reportedByEmail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Details Section */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Reported Post</h4>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700">Post Title</p>
                    <p className="text-base font-semibold text-gray-900">{selectedNotification.data.postTitle}</p>
                  </div>
                  <div className="flex items-start gap-3 pt-3 border-t border-orange-100">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Post Author</p>
                      <p className="font-semibold text-gray-900">{selectedNotification.data.postAuthor}</p>
                      {selectedNotification.data.postAuthorEmail && (
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" />
                          {selectedNotification.data.postAuthorEmail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-t border-gray-200 bg-gray-50 gap-3 sm:gap-0">
              <span className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                {selectedNotification.timestamp}
              </span>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
                <button
                  onClick={(e) => showDeleteConfirmation(selectedNotification, e)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm flex-1 sm:flex-initial"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={closeModal}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm flex-1 sm:flex-initial"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && notificationToDelete && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Report</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Are you sure you want to delete this report? This action cannot be undone.
              </p>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notificationToDelete.type, notificationToDelete.data)}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {notificationToDelete.title}
                    </h4>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {notificationToDelete.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;