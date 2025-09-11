import React, { useState } from "react";

const Notifications = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState("all");

  const notifications = [
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
    }
    // Add more notifications as needed
  ];

  const notificationTypes = ["all", "user_registration", "report", "system", "user_activity", "content", "payment"];

  const filteredNotifications = notifications.filter(n =>
    notificationFilter === "all" || n.type === notificationFilter
  );

  const markAsRead = (id) => {
    notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
    if (!notification.isRead) markAsRead(notification.id);
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

  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const AlertIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <point cx="12" cy="17"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {notificationTypes.map(type => (
          <button
            key={type}
            onClick={() => setNotificationFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              notificationFilter === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type === "all" ? "All Notifications" : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.map(n => (
          <div
            key={n.id}
            onClick={() => handleNotificationClick(n)}
            className={`bg-white p-4 rounded-xl shadow cursor-pointer border-l-4 ${
              !n.isRead ? 'border-blue-500 bg-blue-50/30' : 'border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {n.type === 'user_registration' && <UserIcon />}
                {n.type === 'report' && <AlertIcon />}
                <h3 className="font-semibold">{n.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(n.priority)}`}>
                {n.priority}
              </span>
            </div>
            <p className="text-gray-600">{n.message}</p>
            <p className="text-sm text-gray-500">{n.timestamp}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <header className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">{selectedNotification.title}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full">
                <CloseIcon />
              </button>
            </header>
            <div className="p-6">
              <p className="text-gray-700 mb-4">{selectedNotification.message}</p>
              <p className="text-sm text-gray-500 mb-6">{selectedNotification.timestamp}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
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



