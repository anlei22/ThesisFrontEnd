import React, { useState, useRef, useEffect } from 'react';
import { 
  PaperAirplaneIcon,
  PhotoIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/outline';

const ChatInterface = ({ darkMode }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
      lastMessage: "The golden retriever is so cute! 🐕",
      timestamp: "2m ago",
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          sender: "Sarah Johnson",
          content: "Hi! I saw your post about the rescued animals",
          timestamp: "10:30 AM",
          isMe: false
        },
        {
          id: 2,
          sender: "You",
          content: "Yes! We're always looking for volunteers",
          timestamp: "10:32 AM",
          isMe: true
        },
        {
          id: 3,
          sender: "Sarah Johnson",
          content: "I'd love to help! I have experience with dogs",
          timestamp: "10:35 AM",
          isMe: false
        },
        {
          id: 4,
          sender: "Sarah Johnson",
          content: "The golden retriever is so cute! 🐕",
          timestamp: "10:37 AM",
          isMe: false
        }
      ]
    },
    {
      id: 2,
      name: "Wildlife Center",
      avatar: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=40&h=40&fit=crop&crop=center",
      lastMessage: "Thanks for sharing our owl rescue story!",
      timestamp: "1h ago",
      unread: 0,
      online: true,
      messages: [
        {
          id: 1,
          sender: "Wildlife Center",
          content: "Thanks for sharing our owl rescue story!",
          timestamp: "9:15 AM",
          isMe: false
        },
        {
          id: 2,
          sender: "You",
          content: "Of course! The work you do is amazing",
          timestamp: "9:20 AM",
          isMe: true
        }
      ]
    },
    {
      id: 3,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      lastMessage: "My cat is being extra mischievous today 😸",
      timestamp: "3h ago",
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          sender: "Mike Chen",
          content: "My cat is being extra mischievous today 😸",
          timestamp: "8:45 AM",
          isMe: false
        },
        {
          id: 2,
          sender: "You",
          content: "Haha, what did Luna do now?",
          timestamp: "8:50 AM",
          isMe: true
        }
      ]
    },
    {
      id: 4,
      name: "Animal Sanctuary",
      avatar: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=40&h=40&fit=crop&crop=center",
      lastMessage: "Would you like to visit this weekend?",
      timestamp: "5h ago",
      unread: 1,
      online: true,
      messages: [
        {
          id: 1,
          sender: "Animal Sanctuary",
          content: "We're having an open house this weekend",
          timestamp: "7:30 AM",
          isMe: false
        },
        {
          id: 2,
          sender: "Animal Sanctuary",
          content: "Would you like to visit this weekend?",
          timestamp: "7:32 AM",
          isMe: false
        }
      ]
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // Here you would typically send the message to your backend
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen max-h-[calc(100vh-4rem)]">
      {/* Chat Sidebar */}
      <div className={`${
        selectedChat ? 'hidden md:block' : 'block'
      } w-full md:w-80 border-r flex flex-col transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'
      }`}>
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 border-b border-opacity-50">
          <h2 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Messages
          </h2>
          
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer transition-colors duration-200 border-b ${
                selectedChat?.id === chat.id
                  ? darkMode
                    ? 'bg-green-700 border-gray-600'
                    : 'bg-green-100 border-green-200'
                  : darkMode
                    ? 'hover:bg-gray-700 border-gray-700'
                    : 'hover:bg-green-50 border-green-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold truncate ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {chat.name}
                    </h3>
                    <span className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {chat.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${
        selectedChat ? 'block' : 'hidden md:block'
      } flex-1 flex flex-col`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className={`p-3 sm:p-4 border-b flex items-center justify-between transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'
            }`}>
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Back button for mobile */}
                <button
                  onClick={() => setSelectedChat(null)}
                  className={`md:hidden p-1.5 rounded-full transition-colors duration-300 ${
                    darkMode
                      ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-green-100 hover:text-green-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className={`font-semibold text-sm sm:text-base ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedChat.name}
                  </h3>
                  <p className={`text-xs sm:text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {selectedChat.online ? 'Active now' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button className={`p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                    : 'text-gray-600 hover:bg-green-100 hover:text-green-600'
                }`}>
                  <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className={`p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                    : 'text-gray-600 hover:bg-green-100 hover:text-green-600'
                }`}>
                  <VideoCameraIcon className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-full transition-colors duration-300 ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                    : 'text-gray-600 hover:bg-green-100 hover:text-green-600'
                }`}>
                  <InformationCircleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 transition-colors duration-300 ${
              darkMode ? 'bg-gray-900' : 'bg-green-50'
            }`}>
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.isMe
                      ? darkMode
                        ? 'bg-green-600 text-white'
                        : 'bg-green-500 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-white text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isMe
                        ? 'text-green-100'
                        : darkMode
                          ? 'text-gray-400'
                          : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className={`p-4 border-t transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'
            }`}>
              <div className="flex items-end space-x-3">
                <button className={`p-2 rounded-full transition-colors duration-300 ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                    : 'text-gray-600 hover:bg-green-100 hover:text-green-600'
                }`}>
                  <PhotoIcon className="w-5 h-5" />
                </button>
                
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows="1"
                    className={`w-full px-4 py-2 rounded-2xl border transition-colors duration-300 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
                
                <button className={`p-2 rounded-full transition-colors duration-300 ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                    : 'text-gray-600 hover:bg-green-100 hover:text-green-600'
                }`}>
                  <FaceSmileIcon className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`p-2 rounded-full transition-colors duration-300 ${
                    message.trim()
                      ? darkMode
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-500'
                        : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className={`flex-1 flex items-center justify-center transition-colors duration-300 ${
            darkMode ? 'bg-gray-900' : 'bg-green-50'
          }`}>
            <div className="text-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? 'bg-gray-700' : 'bg-green-100'
              }`}>
                <ChatBubbleOvalLeftIcon className={`w-12 h-12 ${
                  darkMode ? 'text-gray-400' : 'text-green-500'
                }`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Select a conversation
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Choose from your existing conversations or start a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
