import React, { useState } from "react";
import { 
  User, 
  Flag, 
  X, 
  Trash2, 
  FileText, 
  Activity, 
  Bell, 
  MessageCircle,
  UserPlus,
  PlusSquare,
  AlertCircle,
  Check,
  Loader2
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    // User Registration Notifications
    {
      id: 1,
      type: "user_registration",
      title: "New User Registration",
      message: "Sarah Johnson has registered and needs approval",
      timestamp: "2 minutes ago",
      isRead: false,
      data: { 
        userId: 1, 
        userName: "Sarah Johnson", 
        email: "sarah@example.com", 
        registrationDate: "2024-09-14" 
      }
    },
    {
      id: 2,
      type: "user_registration",
      title: "New User Registration",
      message: "Michael Rodriguez has registered and needs approval",
      timestamp: "5 minutes ago",
      isRead: false,
      data: { 
        userId: 15, 
        userName: "Michael Rodriguez", 
        email: "michael.r@example.com", 
        registrationDate: "2024-09-14" 
      }
    },
    {
      id: 3,
      type: "user_registration",
      title: "New User Registration",
      message: "Emma Thompson has registered and needs approval",
      timestamp: "10 minutes ago",
      isRead: true,
      data: { 
        userId: 16, 
        userName: "Emma Thompson", 
        email: "emma.t@example.com", 
        registrationDate: "2024-09-14" 
      }
    },
    {
      id: 4,
      type: "user_registration",
      title: "New User Registration",
      message: "David Kim has registered and needs approval",
      timestamp: "20 minutes ago",
      isRead: true,
      data: { 
        userId: 17, 
        userName: "David Kim", 
        email: "david.kim@example.com", 
        registrationDate: "2024-09-14" 
      }
    },
    {
      id: 5,
      type: "user_registration",
      title: "New User Registration",
      message: "Lisa Anderson has registered and needs approval",
      timestamp: "30 minutes ago",
      isRead: false,
      data: { 
        userId: 18, 
        userName: "Lisa Anderson", 
        email: "lisa.anderson@example.com", 
        registrationDate: "2024-09-14" 
      }
    },

    // Report Notifications
    {
      id: 6,
      type: "report",
      title: "Content Reported",
      message: "Post 'Golden Retriever Available' has been reported for inappropriate content",
      timestamp: "15 minutes ago",
      isRead: false,
      data: { 
        postId: 123, 
        postTitle: "Golden Retriever Available", 
        reportedBy: "John Doe", 
        reason: "Inappropriate content", 
        reportDate: "2024-09-14" 
      }
    },
    {
      id: 7,
      type: "report",
      title: "Content Reported",
      message: "Post 'Selling iPhone 15 Pro' has been reported for spam",
      timestamp: "25 minutes ago",
      isRead: false,
      data: { 
        postId: 124, 
        postTitle: "Selling iPhone 15 Pro", 
        reportedBy: "Jane Smith", 
        reason: "Spam", 
        reportDate: "2024-09-14" 
      }
    },
    {
      id: 8,
      type: "report",
      title: "Content Reported",
      message: "Post 'Free Kittens - Good Home Only' has been reported for suspicious activity",
      timestamp: "35 minutes ago",
      isRead: true,
      data: { 
        postId: 125, 
        postTitle: "Free Kittens - Good Home Only", 
        reportedBy: "Alex Johnson", 
        reason: "Suspicious activity", 
        reportDate: "2024-09-14" 
      }
    },
    {
      id: 9,
      type: "report",
      title: "Content Reported",
      message: "Post 'Room for Rent Downtown' has been reported for fake listing",
      timestamp: "45 minutes ago",
      isRead: false,
      data: { 
        postId: 126, 
        postTitle: "Room for Rent Downtown", 
        reportedBy: "Maria Garcia", 
        reason: "Fake listing", 
        reportDate: "2024-09-14" 
      }
    },
    {
      id: 10,
      type: "report",
      title: "Content Reported",
      message: "Post '2019 Toyota Camry for Sale' has been reported for price manipulation",
      timestamp: "50 minutes ago",
      isRead: true,
      data: { 
        postId: 127, 
        postTitle: "2019 Toyota Camry for Sale", 
        reportedBy: "Robert Wilson", 
        reason: "Price manipulation", 
        reportDate: "2024-09-14" 
      }
    },

    // User Activity Notifications
    {
      id: 11,
      type: "user_activity",
      title: "New Post Created",
      message: "Mike Chen has posted 'Vintage Guitar Collection for Sale'",
      timestamp: "1 hour ago",
      isRead: true,
      data: { 
        userId: 2, 
        userName: "Mike Chen", 
        postId: 128, 
        postTitle: "Vintage Guitar Collection for Sale", 
        action: "post_created", 
        location: "New York, USA" 
      }
    },
    {
      id: 12,
      type: "user_activity",
      title: "New Post Created",
      message: "Jennifer Lopez has posted 'Handmade Jewelry - Custom Orders'",
      timestamp: "1.5 hours ago",
      isRead: false,
      data: { 
        userId: 19, 
        userName: "Jennifer Lopez", 
        postId: 129, 
        postTitle: "Handmade Jewelry - Custom Orders", 
        action: "post_created", 
        location: "Los Angeles, CA" 
      }
    },
    {
      id: 13,
      type: "user_activity",
      title: "New Post Created",
      message: "Thomas Brown has posted 'Professional Photography Services'",
      timestamp: "2 hours ago",
      isRead: true,
      data: { 
        userId: 20, 
        userName: "Thomas Brown", 
        postId: 130, 
        postTitle: "Professional Photography Services", 
        action: "post_created", 
        location: "Chicago, IL" 
      }
    },
    {
      id: 14,
      type: "user_activity",
      title: "Suspicious Activity Detected",
      message: "Multiple posts detected from user Amanda White in short timeframe",
      timestamp: "2.5 hours ago",
      isRead: false,
      data: { 
        userId: 21, 
        userName: "Amanda White", 
        action: "multiple_posts", 
        postCount: 5, 
        timeframe: "10 minutes", 
        location: "Miami, FL" 
      }
    },
    {
      id: 15,
      type: "user_activity",
      title: "New Post Created",
      message: "Carlos Martinez has posted 'Landscaping Services Available'",
      timestamp: "3 hours ago",
      isRead: true,
      data: { 
        userId: 22, 
        userName: "Carlos Martinez", 
        postId: 131, 
        postTitle: "Landscaping Services Available", 
        action: "post_created", 
        location: "Phoenix, AZ" 
      }
    }
  ]);
  
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState("all");
  
  // Delete confirmation states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Success message state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const notificationTypes = ["all", "user_registration", "report", "user_activity"];

  // Computed values
  const filteredNotifications = notifications.filter(n =>
    notificationFilter === "all" || n.type === notificationFilter
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const unreadCountByType = {
    all: unreadCount,
    user_registration: notifications.filter(n => n.type === "user_registration" && !n.isRead).length,
    report: notifications.filter(n => n.type === "report" && !n.isRead).length,
    user_activity: notifications.filter(n => n.type === "user_activity" && !n.isRead).length
  };

  // Event handlers
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const showDeleteConfirmation = (notification, e) => {
    e.stopPropagation();
    setNotificationToDelete(notification);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!notificationToDelete) return;
    
    setIsDeleting(true);
    
    // Close the main modal first if it's the same notification
    if (selectedNotification?.id === notificationToDelete.id) {
      closeModal();
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setNotifications(prev => prev.filter(n => n.id !== notificationToDelete.id));
    
    setIsDeleting(false);
    setShowDeleteConfirm(false);
    setNotificationToDelete(null);
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
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

  // Helper functions
  const getNotificationIcon = (type, data) => {
    switch (type) {
      case 'user_registration':
        return <UserPlus className="w-5 h-5 text-blue-600" />;
      case 'report':
        return <Flag className="w-5 h-5 text-red-600" />;
      case 'user_activity':
        if (data?.action === 'post_created') {
          return <PlusSquare className="w-5 h-5 text-green-600" />;
        } else if (data?.action === 'multiple_posts') {
          return <AlertCircle className="w-5 h-5 text-orange-600" />;
        }
        return <Activity className="w-5 h-5 text-green-600" />;
      default:
        return <User className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatFilterName = (type) => {
    if (type === "all") return "All Notifications";
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen m-2 sm:m-6 bg-gray-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4 transform transition-all duration-300 ease-in-out">
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Notification Deleted
              </h3>
              <p className="text-gray-600 text-sm">
                The notification has been successfully removed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="sticky top-0 pt-4 sm:pt-6 z-10 bg-white pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Bell className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h2>
              {unreadCount > 0 && (
                <div className="bg-red-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full min-w-[20px] sm:min-w-[24px] text-center">
                  {unreadCount}
                </div>
              )}
            </div>
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
            <div className="text-xs sm:text-sm text-gray-500">
              {filteredNotifications.length} notification
              {filteredNotifications.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

       
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="text-gray-400 mb-2">
              <User className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`bg-white p-3 sm:p-4 rounded-xl shadow-sm cursor-pointer border-l-4 transition-all duration-200 hover:shadow-md group ${
                !notification.isRead ? 'border-blue-500 bg-blue-50/20' : 'border-gray-200'
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
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
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

      {/* Main Notification Modal */}
      {showModal && selectedNotification && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-40 p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl mx-2 sm:mx-0">
            {/* Modal Header */}
            <header className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                {getNotificationIcon(selectedNotification.type, selectedNotification.data)}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  {selectedNotification.title}
                </h3>
              </div>
            </header>
            
            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto">
              <div className="flex items-start gap-3 mb-6">
                <div className="mt-1 hidden sm:block">
                  {getNotificationIcon(selectedNotification.type, selectedNotification.data)}
                </div>
                <p className="text-gray-700 leading-relaxed flex-1 text-sm sm:text-base">
                  {selectedNotification.message}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-t border-gray-200 bg-gray-50 gap-3 sm:gap-0">
              <span className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                {selectedNotification.timestamp}
              </span>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
                <button
                  onClick={(e) => showDeleteConfirmation(selectedNotification, e)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm flex-1 sm:flex-initial"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sm:inline">Delete</span>
                </button>
                <button
                  onClick={closeModal}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm flex-1 sm:flex-initial"
                >
                  <X className="w-4 h-4" />
                  <span className="sm:inline">Close</span>
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && notificationToDelete && (
<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl mx-4">
            {/* Confirmation Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Notification
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Are you sure you want to delete this notification? This action cannot be undone.
              </p>
            </div>
            
            {/* Confirmation Body */}
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
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

            {/* Confirmation Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
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