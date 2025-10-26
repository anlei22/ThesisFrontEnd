import React, { useState, useRef, useEffect } from 'react';
import {
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/outline';
import useApiConnection from '../../../context/ApiConnection';
import { apiPostFormData } from '../../../context/utils/apiFormData';

const ChatInterface = ({ darkMode }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, selectedMessages]);

  // Chats loaded from backend
  const [chats, setChats] = useState([]);
  const userId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;

  // Use the provided hook to fetch conversations for the current user
  const { data: convoResp, loading: convoLoading, error: convoError } = useApiConnection(
    userId ? `chat/conversations/${userId}` : null
  );

  // Fetch messages for the selected conversation
  const messagesEndpoint = selectedChat ? `chat/conversations/${selectedChat.id}/show-message` : null;
  const { data: messagesResp, loading: messagesLoading, error: messagesError, refetch: messagesRefetch } = useApiConnection(messagesEndpoint);

  // Map the backend response to the chat shape used by the UI
  useEffect(() => {
    if (!convoResp) return;

    try {
      if (convoResp.status === 'success' && Array.isArray(convoResp.data)) {
        const mapped = convoResp.data.map((item) => {
          const myId = userId ? parseInt(userId, 10) : null;
          const other = (item.customer_f_id === myId) ? item.customer_s : item.customer_f;
          const name = other ? `${other.FirstName || ''} ${other.LastName || ''}`.trim() : 'Unknown';

          return {
            id: item.id,
            name: name || 'Unknown',
            // generate a simple avatar via ui-avatars if no avatar provided
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=34d399&color=fff&size=128`,
            lastMessage: `${item.messages_count || 0} messages`,
            timestamp: item.updated_at ? new Date(item.updated_at).toLocaleString() : '',
            unread: 0,
            online: false,
            messages: []
          };
        });

        setChats(mapped);
      } else {
        // no conversations or unexpected format
        setChats([]);
      }
    } catch (err) {
      console.error('Error mapping conversations:', err);
      setChats([]);
    }
  }, [convoResp, userId]);

  // Map messages response to UI message objects
  useEffect(() => {
    if (!messagesResp) {
      setSelectedMessages([]);
      return;
    }

    try {
      if (messagesResp.status === 'success' && Array.isArray(messagesResp.messages)) {
        const mappedMsgs = messagesResp.messages.map((m) => ({
          id: m.id,
          senderId: m.sender_id,
          content: m.message,
          timestamp: m.created_at ? new Date(m.created_at).toLocaleString() : '',
          isMe: userId ? parseInt(userId, 10) === m.sender_id : false
        }));

        setSelectedMessages(mappedMsgs);
      } else {
        setSelectedMessages([]);
      }
    } catch (err) {
      console.error('Error mapping messages:', err);
      setSelectedMessages([]);
    }
  }, [messagesResp, userId]);

  // Auto-refresh messages while a conversation is selected
  useEffect(() => {
    if (!selectedChat || !messagesRefetch) return;

    // fetch immediately
    try {
      messagesRefetch();
    } catch (err) {
      console.error('Error fetching messages on select:', err);
    }

    const intervalId = setInterval(() => {
      try {
        messagesRefetch();
      } catch (err) {
        console.error('Error refetching messages:', err);
      }
    }, 5000); // poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [selectedChat, messagesRefetch]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (isSending) return; // prevent double sends
    if (!message.trim() || !selectedChat) return;

    setIsSending(true);

    // Prepare form data
    const fd = new FormData();
    fd.append('message', message.trim());
    fd.append('user_id', userId || '');

    try {
      // POST to backend using FormData helper; include auth token
      const endpoint = `chat/conversations/${selectedChat.id}/message`;
      const res = await apiPostFormData(endpoint, fd, true);

      // Optionally check response status
      if (res && (res.status === 'success' || res.success === true)) {
        // Clear input and stop loader immediately so user can continue typing
        setMessage('');
        setIsSending(false);

        // Fire-and-forget refetch so UI updates but doesn't block the send flow
        if (typeof messagesRefetch === 'function') {
          messagesRefetch().catch((e) => console.error('refetch after send failed', e));
        }
      } else {
        console.warn('Send message response:', res);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const canSend = message.trim() && !isSending;

  return (
    <div className="flex h-screen max-h-[calc(100vh-4rem)]">
      {/* Chat Sidebar */}
      <div className={`${selectedChat ? 'hidden md:block' : 'block'
        } w-full md:w-80 border-r flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'
        }`}>
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 border-b border-opacity-50">
          <h2 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Messages
          </h2>

          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base ${darkMode
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
              className={`p-4 cursor-pointer transition-colors duration-200 border-b ${selectedChat?.id === chat.id
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
                    <h3 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      {chat.name}
                    </h3>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                      {chat.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'
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
      <div className={`${selectedChat ? 'block' : 'hidden md:block'
        } flex-1 flex flex-col`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className={`p-3 sm:p-4 border-b flex items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'}`}>
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Back button for mobile */}
                <button
                  onClick={() => setSelectedChat(null)}
                  className={`md:hidden p-1.5 rounded-full transition-colors duration-300 ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-green-100 hover:text-green-600'}`}
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
                  <h3 className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedChat.name}
                  </h3>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedChat.online ? 'Active now' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-green-50'
              }`}>
              {selectedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.isMe
                    ? darkMode
                      ? 'bg-green-600 text-white'
                      : 'bg-green-500 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-white text-gray-900'
                    }`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isMe
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
            <div className={`p-4 border-t transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'
              }`}>
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows="1"
                    className={`w-full px-4 py-2 rounded-2xl border transition-colors duration-300 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
                      }`}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!canSend}
                  className={`p-2 rounded-full transition-colors duration-300 ${canSend
                    ? darkMode
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-500'
                      : 'bg-gray-200 text-gray-400'
                    }`}
                >
                  {isSending ? (
                    <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    <PaperAirplaneIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className={`flex-1 flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-green-50'
            }`}>
            <div className="text-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-gray-700' : 'bg-green-100'
                }`}>
                <ChatBubbleOvalLeftIcon className={`w-12 h-12 ${darkMode ? 'text-gray-400' : 'text-green-500'
                  }`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Select a conversation
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
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
