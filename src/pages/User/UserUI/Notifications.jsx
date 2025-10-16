import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';

export default function Notifications() {
  const darkMode = false;
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: 'Sarah Anderson',
      avatar: '👩',
      action: 'liked your post',
      time: '2 hours ago',
      type: 'like',
      icon: '❤️',
      isRead: false
    },
    {
      id: 2,
      user: 'James Wilson',
      avatar: '👨',
      action: 'commented on your post',
      time: '4 hours ago',
      type: 'comment',
      icon: '💬',
      isRead: false
    },
    {
      id: 3,
      user: 'Emma Davis',
      avatar: '👩‍🦰',
      action: 'shared your post',
      time: '1 day ago',
      type: 'share',
      icon: '🔄',
      isRead: false
    },
    {
      id: 4,
      user: 'Michael Chen',
      avatar: '👨‍💼',
      action: 'bookmarked your post',
      time: '2 days ago',
      type: 'bookmark',
      icon: '🔖',
      isRead: false
    },
      {
      id: 8,
      user: 'Michael Chen',
      avatar: '👨‍💼',
      action: 'bookmarked your post',
      time: '2 days ago',
      type: 'bookmark',
      icon: '🔖',
      isRead: false
    },
      {
      id: 7,
      user: 'Michael Chen',
      avatar: '👨‍💼',
      action: 'bookmarked your post',
      time: '2 days ago',
      type: 'bookmark',
      icon: '🔖',
      isRead: false
    },
      {
      id: 6,
      user: 'Michael Chen',
      avatar: '👨‍💼',
      action: 'bookmarked your post',
      time: '2 days ago',
      type: 'bookmark',
      icon: '🔖',
      isRead: false
    },
    {
      id: 5,
      user: 'Lisa Johnson',
      avatar: '👱‍♀️',
      action: 'started following you',
      time: '3 days ago',
      type: 'follow',
      icon: '👥',
      isRead: false
    }
    
  ]);

  const removeNotification = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const getNotificationColor = (type) => {
    const colors = {
      like: 'bg-red-50 border-red-300',
      comment: 'bg-blue-50 border-blue-300',
      share: 'bg-green-50 border-green-300',
      bookmark: 'bg-purple-50 border-purple-300',
      follow: 'bg-indigo-50 border-indigo-300'
    };
    return colors[type] || 'bg-slate-50 border-slate-200';
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - appears below navbar */}
      <div className="sticky top-0 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="text-slate-900" size={28} />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Notifications
              </h1>
            </div>

            {notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 rounded-lg font-medium text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-lg text-slate-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notif => (
              <div
                key={notif.id}
                className={`${getNotificationColor(notif.type)} rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer ${
                  notif.isRead ? 'border border-slate-200 bg-slate-50' : 'border'
                }`}
              >
                <div 
                  className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
                  onClick={() => removeNotification(notif.id)}
                >
                  <div className="text-2xl md:text-3xl flex-shrink-0">{notif.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold text-slate-900">{notif.user}</span>
                      <span className="text-slate-700"> {notif.action}</span>
                    </p>
                    <p className="text-xs mt-1 text-slate-500">{notif.time}</p>
                  </div>
                </div>

                <button
                  onClick={() => removeNotification(notif.id)}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-400 transition-colors flex-shrink-0 ml-2"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}