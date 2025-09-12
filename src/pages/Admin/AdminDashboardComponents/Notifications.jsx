import React, { useState } from "react";
import { User, AlertTriangle, X, Trash2 } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "user_registration",
      title: "New User Registration",
      message: "Sarah Johnson has registered and needs approval",
      timestamp: "2 minutes ago",
      isRead: false,
      priority: "high",
      data: { userId: 1, userName: "Sarah Johnson", email: "sarah@example.com" }
    },
    {
      id: 2,
      type: "report",
      title: "Content Reported",
      message: "Post 'Golden Retriever Available' has been reported for inappropriate content",
      timestamp: "15 minutes ago",
      isRead: false,
      priority: "high",
      data: { postId: 123, reportedBy: "John Doe", reason: "Inappropriate content" }
    },
    {
      id: 3,
      type: "user_activity",
      title: "User Activity Alert",
      message: "Unusual login activity detected for user Mike Chen",
      timestamp: "1 hour ago",
      isRead: true,
      priority: "medium",
      data: { userId: 2, userName: "Mike Chen", loginLocation: "New York, USA" }
    }
  ]);
  
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState("all");

  const notificationTypes = ["all", "user_registration", "report", "user_activity"];

  const filteredNotifications = notifications.filter(n =>
    notificationFilter === "all" || n.type === notificationFilter
  );

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (selectedNotification?.id === id) {
      closeModal();
    }
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'user_registration':
        return <User className="w-5 h-5 text-blue-600" />;
      case 'report':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'user_activity':
        return <User className="w-5 h-5 text-green-600" />;
      default:
        return <User className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatFilterName = (type) => {
    if (type === "all") return "All Notifications";
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Notifications</h2>
        <div className="text-sm text-gray-500">
          {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {notificationTypes.map(type => (
          <button
            key={type}
            onClick={() => setNotificationFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              notificationFilter === type 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {formatFilterName(type)}
          </button>
        ))}
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
              className={`bg-white p-4 rounded-xl shadow-sm cursor-pointer border-l-4 transition-all duration-200 hover:shadow-md group ${
                !notification.isRead ? 'border-blue-500 bg-blue-50/20' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                    {notification.priority}
                  </span>
                  <button
                    onClick={(e) => deleteNotification(notification.id, e)}
                    className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <header className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {getNotificationIcon(selectedNotification.type)}
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedNotification.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    deleteNotification(selectedNotification.id, e);
                    closeModal();
                  }}
                  className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors duration-200"
                  title="Delete notification"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={closeModal} 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedNotification.priority)}`}>
                  {selectedNotification.priority} priority
                </span>
                <span className="text-sm text-gray-500">
                  {selectedNotification.timestamp}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {selectedNotification.message}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Additional Data
                </h4>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap overflow-x-auto">
                  {JSON.stringify(selectedNotification.data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;