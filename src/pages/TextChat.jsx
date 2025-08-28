// src/pages/TextChat.jsx
import React, { useState, useRef, useEffect } from 'react';

import BottomPopup from '../components/BottomPopup';
import { Send, ArrowLeft, Bot, User, Zap, Sparkles, MoreVertical, Mic, Paperclip, Trash2, History } from 'lucide-react';
import { apiService } from '../services/api';
import { formatMessage } from '../utils/messageFormatter.jsx';
import { useAuth } from '../contexts/AuthContext';
import { chatHistoryService } from '../services/chatHistory';

function TextChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history when component mounts
  useEffect(() => {
    setShowPopup(true);
    const timer = setTimeout(() => setShowPopup(false), 4000);
    const loadChatHistory = async () => {
      if (user?.id) {
        setIsLoadingHistory(true);
        const { data, error } = await chatHistoryService.getChatHistory(user.id, 'text');
        
        if (!error && data && data.length > 0) {
          // Convert database messages to component format
          const historyMessages = data.map((msg, index) => ({
            id: index + 1,
            type: msg.sender,
            content: msg.message,
            timestamp: new Date(msg.created_at)
          }));
          setMessages(historyMessages);
        } else {
          // Set default welcome message if no history
          setMessages([{
            id: 1,
            type: 'bot',
            content: "Hey bestie! 👋 I'm Matrix Gear AI and I'm literally SO excited to chat with you! What's the tea? ☕✨",
            timestamp: new Date()
          }]);
        }
        setIsLoadingHistory(false);
      } else {
        // Guest user - just show welcome message
        setMessages([{
          id: 1,
          type: 'bot',
          content: user ? "Hey bestie! 👋 I'm Matrix Gear AI and I'm literally SO excited to chat with you! What's the tea? ☕✨" : "Hi there! 👋 You're in guest mode. Sign in to save your chat history and unlock more features! 🔐✨",
          timestamp: new Date()
        }]);
        setIsLoadingHistory(false);
      }
    };

    loadChatHistory();
    return () => clearTimeout(timer);
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save message to database
  const saveMessageToHistory = async (message, sender) => {
    if (user?.id) {
      await chatHistoryService.saveMessage(user.id, message, sender, 'text');
    }
    // If no user, messages are not saved (guest mode)
  };

  // Clear chat history
  const clearChatHistory = async () => {
    if (user?.id && window.confirm('Are you sure you want to clear all chat history?')) {
      const { error } = await chatHistoryService.clearChatHistory(user.id, 'text');
      if (!error) {
        setMessages([{
          id: 1,
          type: 'bot',
          content: "Hey bestie! 👋 I'm Matrix Gear AI and I'm literally SO excited to chat with you! What's the tea? ☕✨",
          timestamp: new Date()
        }]);
      }
    } else if (!user?.id) {
      // Guest mode - just clear local messages
      if (window.confirm('Clear current conversation? (Note: You\'re in guest mode, so messages aren\'t saved anyway)')) {
        setMessages([{
          id: 1,
          type: 'bot',
          content: "Hi there! 👋 You're in guest mode. Sign in to save your chat history and unlock more features! 🔐✨",
          timestamp: new Date()
        }]);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Save user message to history
    await saveMessageToHistory(currentMessage, 'user');

    try {
      // Call the backend API using the service
      const data = await apiService.generateText(currentMessage);
      
      let aiResponseText;
      if (data.error) {
        aiResponseText = `Oops bestie! Something went wrong: ${data.error} 😅`;
      } else {
        aiResponseText = data.response || "Sorry, I couldn't generate a response right now! 🤖";
      }

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResponseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Save AI response to history
      await saveMessageToHistory(aiResponseText, 'bot');
    } catch (error) {
      console.error('Error calling backend:', error);
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: "Sorry bestie, I'm having trouble connecting to my brain right now! Try again in a bit! 🤖💭",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      
      // Save error response to history
      await saveMessageToHistory(errorResponse.content, 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const suggestions = [
    "📊 Create a comparison table of programming languages",
    "📝 Write a step-by-step tutorial for React hooks",
    "✨ Generate a pros and cons list for remote work",
    "🔥 Explain quantum computing in simple terms",
    "💡 Give me creative project ideas",
    "🎯 Create a study plan for learning Python"
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      isDarkTheme
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-100 text-black'
    }`}>
      <BottomPopup
        message="Save chat feature coming soon!"
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className={`absolute inset-0 ${
          isDarkTheme
            ? 'bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-400/20'
            : 'bg-gradient-to-r from-blue-400/20 via-sky-400/20 to-indigo-400/20'
        }`}></div>
      </div>
      <div className={`absolute inset-0 pointer-events-none ${
        isDarkTheme
          ? 'bg-gradient-radial from-transparent via-transparent to-gray-900/20'
          : 'bg-gradient-radial from-transparent via-transparent to-blue-100/20'
      }`}></div>

      {/* Floating particles */}
      <div className={`absolute top-4 left-4 w-2 h-2 rounded-full floating-particle opacity-40 ${
        isDarkTheme ? 'bg-blue-300' : 'bg-blue-400'
      }`}></div>
      <div className={`absolute top-20 right-8 w-3 h-3 rounded-full floating-particle opacity-30 ${
        isDarkTheme ? 'bg-purple-300' : 'bg-sky-400'
      }`} style={{animationDelay: '1s'}}></div>

      {/* Header */}
      <div className={`backdrop-blur-xl border-b px-2 sm:px-4 py-2 sm:py-4 sticky top-0 z-50 shadow-sm transition-all duration-500 ${
        isDarkTheme
          ? 'bg-gray-900/40 border-gray-600/30'
          : 'bg-white/40 border-blue-300/30'
      }`}>
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={goBack}
              className={`p-2 backdrop-blur-sm rounded-xl hover:scale-110 transition-all duration-300 border shadow-sm ${
                isDarkTheme
                  ? 'bg-gray-800/50 hover:bg-gray-700/60 border-gray-600/50 text-blue-400'
                  : 'bg-white/50 hover:bg-white/70 border-blue-200/50 text-blue-600'
              }`}
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl animate-pulse shadow-lg">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">AI Chat</h1>
                <p className={`text-xs font-mono ${isDarkTheme ? 'text-gray-300' : 'text-black'}`}>Smart Conversations</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Clear History Button */}
            <button
              onClick={clearChatHistory}
              className={`p-2 backdrop-blur-sm rounded-xl transition-all duration-300 border shadow-sm ${
                isDarkTheme
                  ? 'bg-gray-800/50 hover:bg-gray-700/60 border-gray-600/50'
                  : 'bg-white/50 hover:bg-white/70 border-blue-200/50'
              }`}
              title={user ? "Clear Chat History" : "Clear Current Conversation"}
              aria-label="Clear Chat"
            >
              <Trash2 size={15} className={isDarkTheme ? 'text-red-400' : 'text-red-500'} />
            </button>
            {/* Guest Mode Sign In Button */}
            {!user && (
              <button
                onClick={() => {
                  setShowPopup(true);
                  setTimeout(() => setShowPopup(false), 4000);
                }}
                className={`p-2 backdrop-blur-sm rounded-xl transition-all duration-300 border shadow-sm ${
                  isDarkTheme
                    ? 'bg-blue-600/50 hover:bg-blue-600/70 border-blue-500/50'
                    : 'bg-blue-500/50 hover:bg-blue-500/70 border-blue-400/50'
                }`}
                title="Sign In to Save Chat History"
                aria-label="Sign In"
              >
                <User size={15} className="text-white" />
              </button>
            )}
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`p-2 backdrop-blur-sm rounded-xl transition-all duration-300 border shadow-sm ${
                isDarkTheme
                  ? 'bg-gray-800/50 hover:bg-gray-700/60 border-gray-600/50'
                  : 'bg-white/50 hover:bg-white/70 border-blue-200/50'
              }`}
              title={isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {isDarkTheme ? (
                <span className="text-yellow-400">☀️</span>
              ) : (
                <span className="text-black">🌙</span>
              )}
            </button>
            <button className={`p-2 backdrop-blur-sm rounded-xl transition-all duration-300 border shadow-sm ${
              isDarkTheme
                ? 'bg-gray-800/50 hover:bg-gray-700/60 border-gray-600/50'
                : 'bg-white/50 hover:bg-white/70 border-blue-200/50'
            }`} aria-label="More Options">
              <MoreVertical size={15} className={isDarkTheme ? 'text-gray-300' : 'text-black'} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100vh-80px)] max-w-full sm:max-w-4xl mx-auto">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
          {isLoadingHistory ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Loading chat history...</span>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 sm:gap-3 animate-fade-in ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-sky-500' 
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                }`}>
                  {message.type === 'user' ? (
                    <User size={15} className="text-white" />
                  ) : (
                    <Bot size={15} className="text-white" />
                  )}
                </div>
                {/* Message Bubble */}
                <div className={`max-w-[85vw] sm:max-w-[70%] ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm border backdrop-blur-sm transition-all duration-500 text-xs sm:text-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white border-blue-400/30'
                      : isDarkTheme
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400/30'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-400/30'
                  }`}>
                    {message.type === 'bot' ? (
                      <div className={`prose prose-xs sm:prose-sm max-w-none ${
                        isDarkTheme ? 'prose-invert' : ''
                      }`} style={{ color: 'white' }}>
                        {formatMessage(message.content)}
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                  <span className={`text-[10px] sm:text-xs mt-1 px-2 font-mono transition-colors duration-500 ${
                    isDarkTheme ? 'text-gray-300' : 'text-black'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2 sm:gap-3 animate-fade-in">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <Bot size={15} className="text-white" />
              </div>
              <div className={`backdrop-blur-sm border px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm transition-all duration-500 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400/30'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-500 border-purple-400/30'
              }`}>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <span className={`ml-2 text-[10px] sm:text-xs transition-colors duration-500 text-white`}>AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Suggestions */}
        <div className={`p-2 sm:p-4 border-t backdrop-blur-sm transition-all duration-500 ${
          isDarkTheme
            ? 'border-gray-600/30 bg-gray-900/30'
            : 'border-blue-200/30 bg-white/30'
        }`}>
          {!user && (
            <div className={`mb-3 sm:mb-4 p-2 sm:p-3 backdrop-blur-xl rounded-xl border ${
              isDarkTheme
                ? 'bg-blue-900/30 border-blue-700/50'
                : 'bg-blue-100/60 border-blue-300/50'
            }`}>
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <User size={14} className="text-blue-500" />
                <span className={`text-xs sm:text-sm font-semibold ${
                  isDarkTheme ? 'text-blue-300' : 'text-blue-700'
                }`}>Guest Mode</span>
              </div>
              <p className={`text-[11px] sm:text-xs ${
                isDarkTheme ? 'text-blue-200/80' : 'text-blue-600/80'
              }`}>
                You're chatting as a guest. Messages won't be saved. 
                <button 
                  onClick={() => {
                    setShowPopup(true);
                    setTimeout(() => setShowPopup(false), 4000);
                  }}
                  className="ml-1 underline hover:no-underline font-medium"
                >
                  Sign in
                </button> to save chat history!
              </p>
            </div>
          )}
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <Sparkles size={14} className="text-blue-500" />
            <span className={`text-xs sm:text-sm font-semibold transition-colors duration-500 ${
              isDarkTheme ? 'text-gray-300' : 'text-black'
            }`}>Try asking about:</span>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className={`px-2 py-1 sm:px-3 sm:py-1 backdrop-blur-sm rounded-full text-[11px] sm:text-xs hover:scale-105 transition-all duration-300 border shadow-sm ${
                  isDarkTheme
                    ? 'bg-gray-800/60 hover:bg-gray-700/80 border-gray-600/30 text-gray-200'
                    : 'bg-white/60 hover:bg-white/80 border-blue-300/30 text-black'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        {/* Input Area */}
        <div className={`p-2 sm:p-4 backdrop-blur-xl border-t shadow-lg transition-all duration-500 ${
          isDarkTheme
            ? 'bg-gray-900/40 border-gray-600/30'
            : 'bg-white/40 border-blue-300/30'
        }`}>
          <div className="flex items-end gap-2 sm:gap-3 max-w-full sm:max-w-4xl mx-auto">
            <button className={`p-2 sm:p-3 backdrop-blur-sm rounded-xl transition-all duration-300 border shadow-sm ${
              isDarkTheme
                ? 'bg-gray-800/60 hover:bg-gray-700/80 border-gray-600/30'
                : 'bg-white/60 hover:bg-white/80 border-blue-300/30'
            }`} aria-label="Attach">
              <Paperclip size={18} className={isDarkTheme ? 'text-gray-300' : 'text-black'} />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... Ask me anything! ✨"
                className={`w-full backdrop-blur-sm border rounded-2xl px-3 py-2 sm:px-4 sm:py-3 pr-10 sm:pr-12 resize-none focus:outline-none transition-all duration-300 shadow-sm text-xs sm:text-base ${
                  isDarkTheme
                    ? 'bg-gray-800/60 border-gray-600/30 text-white placeholder-gray-400 focus:border-blue-400/50'
                    : 'bg-white/60 border-blue-300/30 text-black placeholder-black focus:border-blue-400/50'
                }`}
                rows="1"
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
              <button className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-blue-100'
              }`} aria-label="Mic">
                <Mic size={14} className={isDarkTheme ? 'text-gray-300' : 'text-black'} />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              aria-label="Send"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextChat;
