// src/pages/FriendChat.jsx
import React, { useState, useRef, useEffect } from 'react';
import BottomPopup from '../components/BottomPopup';
import { Send, ArrowLeft, MessageCircle, Heart, Coffee, Smile, MoreHorizontal, ThumbsUp } from 'lucide-react';
import { apiService } from '../services/api';

function FriendChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'friend',
      content: "Hey there! 😊 What's up? I'm here to chat about whatever's on your mind!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setShowPopup(true);
    const timer = setTimeout(() => setShowPopup(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const goBack = () => {
    window.history.back();
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
    
    // Add to conversation history for context
    const newHistory = [
      ...conversationHistory,
      { role: 'user', content: inputMessage }
    ];
    setConversationHistory(newHistory);

    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call the backend friend chat API
      const data = await apiService.chatFriend(currentMessage, newHistory);
      
      let friendResponseText;
      if (data.error) {
        friendResponseText = `Oops! Something went wrong 😅 ${data.error}`;
      } else {
        friendResponseText = data.response || "Sorry, I'm having trouble thinking right now! 🤔";
      }

      const friendMessage = {
        id: messages.length + 2,
        type: 'friend',
        content: friendResponseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, friendMessage]);
      
      // Add friend response to history
      setConversationHistory(prev => [
        ...prev,
        { role: 'assistant', content: friendResponseText }
      ]);

    } catch (error) {
      console.error('Error in friend chat:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'friend',
        content: "Hey, I'm having some connection issues right now! 📶 Can you try again in a sec?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
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

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'friend',
        content: "Fresh start! 🌟 What would you like to talk about?",
        timestamp: new Date()
      }
    ]);
    setConversationHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-gray-800 relative overflow-hidden">
      <BottomPopup
        message="Save chat feature coming soon!"
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10"></div>
      </div>
      
      {/* Floating hearts and emojis */}
      <div className="absolute top-10 left-10 text-2xl opacity-20 animate-bounce">💕</div>
      <div className="absolute top-32 right-20 text-xl opacity-15 animate-pulse">😊</div>
      <div className="absolute bottom-32 left-16 text-lg opacity-10 animate-bounce" style={{animationDelay: '1s'}}>☕</div>

      {/* Header */}
      <div className="bg-white/40 backdrop-blur-xl border-b border-orange-200/30 p-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className="p-2 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/70 transition-all duration-300 hover:scale-110 border border-orange-200/50"
            >
              <ArrowLeft size={20} className="text-orange-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl animate-pulse shadow-lg">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Friend Chat</h1>
                <p className="text-xs text-orange-500 font-mono">Casual & Friendly 💭</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="text-xs bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-orange-600 border border-orange-200/50 hover:bg-white/70 transition-all"
            >
              New Chat
            </button>
            {/* Online status removed */}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/60 backdrop-blur-xl text-gray-800 border border-orange-200/30 shadow-sm'
              }`}>
                {/* Message content */}
                <div className="flex items-start gap-2">
                  {message.type === 'friend' && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                        <Heart size={12} className="text-white" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={`text-sm leading-relaxed ${
                      message.type === 'user' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {message.content}
                    </p>
                    <div className={`flex items-center gap-1 mt-2 text-xs ${
                      message.type === 'user' ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {message.type === 'user' && <ThumbsUp size={10} className="text-orange-200" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-orange-200/30 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Heart size={12} className="text-white" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/40 backdrop-blur-xl border-t border-orange-200/30 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind... 💭"
                className="w-full bg-white/60 backdrop-blur-xl border border-orange-300/40 rounded-2xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:border-orange-400/50 transition-all duration-300 shadow-sm"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <div className="absolute right-3 top-3 flex items-center gap-1">
                <Coffee size={16} className="text-orange-400 opacity-50" />
              </div>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="text-center mt-2">
            <p className="text-xs text-orange-500 font-mono flex items-center justify-center gap-1">
              <Heart size={12} className="text-pink-500" />
              Your friendly AI companion • Always here to listen 😊
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendChat;
