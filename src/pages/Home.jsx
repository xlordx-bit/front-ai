// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import BottomPopup from '../components/BottomPopup';
import { Power, Sparkles, Zap, Stars, Cpu, PenTool, MessageCircle, Menu, X, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [glitchText, setGlitchText] = useState('Matrix Gear AI');
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    setShowNavMenu(false);
  };

  // Glitch effect for text
  useEffect(() => {
    if (isHovered) {
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const originalText = 'Matrix Gear AI';
      let iterations = 0;
      
      const interval = setInterval(() => {
        setGlitchText(
          originalText
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('')
        );
        
        if (iterations >= originalText.length) {
          clearInterval(interval);
        }
        
        iterations += 1 / 3;
      }, 30);
      
      return () => clearInterval(interval);
    } else {
      setGlitchText('Matrix Gear AI');
    }
  }, [isHovered]);

  return (
    <div className="flex min-h-screen">
      {/* Navigation Button */}
      <button
        onClick={() => setShowNavMenu(!showNavMenu)}
        className="fixed top-6 left-6 z-50 p-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
      >
        {showNavMenu ? (
          <X size={24} className="text-gray-700" />
        ) : (
          <Menu size={24} className="text-gray-700" />
        )}
      </button>

      {/* Navigation Menu Overlay */}
      {showNavMenu && (
        <div className="fixed inset-0 z-40 backdrop-blur-md bg-black/20" onClick={() => setShowNavMenu(false)}>
          <div className="fixed left-6 top-20 backdrop-blur-xl bg-white/30 border border-white/30 rounded-3xl p-6 shadow-2xl w-80" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto h-16 w-16 flex items-center justify-center mb-4 backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl shadow-lg">
                <img 
                  src="/Gemini_Generated_Image_asu2q3asu2q3asu2-removebg-preview.png" 
                  alt="Matrix Gear AI" 
                  className="h-12 w-12 object-contain"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Matrix Gear AI</h2>
              <p className="text-gray-600 text-sm">Your AI Assistant</p>
            </div>

            {/* User Section */}
            {user ? (
              <div className="mb-6 p-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm truncate">{user.email}</p>
                    <p className="text-green-600 text-xs font-semibold">Online</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full backdrop-blur-md bg-red-500/15 hover:bg-red-500/25 border border-red-400/20 rounded-lg px-3 py-2 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-gray-800"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="mb-6 p-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Guest Mode</p>
                    <p className="text-gray-600 text-xs">Limited features</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setPopupMsg('Sign in feature coming soon!');
                      setShowPopup(true);
                      setTimeout(() => setShowPopup(false), 4000);
                    }}
                    className="w-full backdrop-blur-md bg-blue-500/15 hover:bg-blue-500/25 border border-blue-400/20 rounded-lg px-3 py-2 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-gray-800"
                  >
                    <LogIn size={16} />
                    <span className="text-sm font-medium">Sign In</span>
                  </button>
                  <button
                    onClick={() => {
                      setPopupMsg('Sign up feature coming soon!');
                      setShowPopup(true);
                      setTimeout(() => setShowPopup(false), 4000);
                    }}
                    className="w-full backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-sky-500/20 hover:from-blue-500/30 hover:to-sky-500/30 border border-blue-400/20 rounded-lg px-3 py-2 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-gray-800"
                  >
                    <UserPlus size={16} />
                    <span className="text-sm font-medium">Sign Up</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-3">
              <button
                onClick={() => { navigate('/text-chat'); setShowNavMenu(false); }}
                className="w-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl p-3 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800 font-medium text-sm">Text Chat</p>
                  <p className="text-gray-600 text-xs">Chat with AI</p>
                </div>
              </button>

              <button
                onClick={() => { navigate('/image-gen'); setShowNavMenu(false); }}
                className="w-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl p-3 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Stars size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800 font-medium text-sm">Image Generator</p>
                  <p className="text-gray-600 text-xs">Create images</p>
                </div>
              </button>

              <button
                onClick={() => { navigate('/ai-writer'); setShowNavMenu(false); }}
                className="w-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl p-3 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <PenTool size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800 font-medium text-sm">AI Writer</p>
                  <p className="text-gray-600 text-xs">Write content</p>
                </div>
              </button>

              <button
                onClick={() => { navigate('/friend-chat'); setShowNavMenu(false); }}
                className="w-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl p-3 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800 font-medium text-sm">Friend Chat</p>
                  <p className="text-gray-600 text-xs">Casual conversation</p>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/20 text-center">
              <p className="text-xs text-gray-600">Powered by Matrix Gear AI</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 text-xs font-mono font-semibold">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        
        {/* Main Brand Section */}
        <div className="text-center mb-12 animate-fade-in-down">
          {/* Logo with glow effect */}
          <div className="relative mb-6">
            <img 
              src="/Gemini_Generated_Image_asu2q3asu2q3asu2-removebg-preview.png" 
              alt="Matrix Gear AI" 
              className="h-40 md:h-56 lg:h-64 mx-auto animate-float filter drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-pink opacity-20 blur-xl rounded-full"></div>
          </div>

          {/* Brand Name with Glitch Effect */}
          <h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent mb-4 font-mono cursor-pointer select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {glitchText}
          </h1>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-600 mb-2 animate-fade-in-up">
            Next-Gen AI Experience 🚀
          </p>
          
          {/* Version Button */}
          <div className="mb-4">
            <button
              className="inline-block bg-gradient-to-r from-blue-500 to-sky-500 text-white text-xs font-mono px-3 py-1 rounded-full border border-blue-300/50 shadow-lg animate-pulse hover:scale-105 transition"
              onClick={() => navigate('/about-version')}
            >
              Version 1.0.0
            </button>
          </div>
          
          <div className="flex justify-center gap-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Sparkles size={14} className="text-blue-500" />
              Creative
            </span>
            <span className="flex items-center gap-1">
              <Zap size={14} className="text-sky-500" />
              Fast
            </span>
            <span className="flex items-center gap-1">
              <Stars size={14} className="text-indigo-500" />
              Intelligent
            </span>
          </div>
        </div>

        {/* Power Button with Cyber Design */}
        <div className="relative mb-8">
          <button
            onClick={handleClick}
            className={`group relative p-6 bg-white/50 backdrop-blur-xl rounded-full transition-all duration-500 hover:scale-110 btn-genz
              ${menuOpen ? 'animate-pulse' : 'hover:shadow-2xl'} 
              border-2 border-blue-400/30 hover:border-sky-500/50 shadow-lg`}
          >
            {/* Rotating border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 opacity-20 animate-spin-slow"></div>
            
            {/* Inner glow */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500/10 to-sky-500/10 group-hover:from-sky-500/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
            
            {/* Power icon */}
            <Power size={40} className="relative z-10 text-blue-600 group-hover:text-sky-600 transition-colors duration-300" />
            
            {/* CPU decoration */}
            <Cpu size={16} className="absolute top-1 right-1 text-indigo-500 opacity-60 animate-pulse" />
          </button>
          
          {/* Button label */}
          <p className="text-center mt-3 text-sm text-gray-500 font-mono">
            {menuOpen ? 'SYSTEM ONLINE' : 'ACTIVATE AI'}
          </p>
        </div>

        {/* Menu with Glassmorphism and Neon Effects */}
        {menuOpen && (
          <div className="animate-fade-in-up bg-white/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-blue-300/30 w-full max-w-md">
            {/* Menu Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Choose Your Power</h3>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>
            
            {/* Menu Buttons */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => navigate('/text-chat')}
                className="group relative btn-genz bg-white/60 backdrop-blur-sm hover:bg-white/80 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border border-blue-300/20 hover:border-sky-400/40 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl group-hover:animate-pulse shadow-sm">
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">Text Chat</p>
                      <p className="text-xs text-gray-600">AI Conversations</p>
                    </div>
                  </div>
                  <div className="text-2xl group-hover:animate-bounce">💬</div>
                </div>
              </button>

              <button 
                onClick={() => navigate('/image-gen')}
                className="group relative btn-genz bg-white/60 backdrop-blur-sm hover:bg-white/80 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border border-sky-300/20 hover:border-blue-400/40 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl group-hover:animate-pulse shadow-sm">
                      <Stars size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">Image Gen</p>
                      <p className="text-xs text-gray-600">Create Visuals</p>
                    </div>
                  </div>
                  <div className="text-2xl group-hover:animate-bounce">🎨</div>
                </div>
              </button>

              <button 
                onClick={() => navigate('/friend-chat')}
                className="group relative btn-genz bg-white/60 backdrop-blur-sm hover:bg-white/80 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border border-pink-300/20 hover:border-orange-400/40 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl group-hover:animate-pulse shadow-sm">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">Friend Chat</p>
                      <p className="text-xs text-gray-600">Casual & Friendly</p>
                    </div>
                  </div>
                  <div className="text-2xl group-hover:animate-bounce">😊</div>
                </div>
              </button>

              <button 
                onClick={() => navigate('/ai-writer')}
                className="group relative btn-genz bg-white/60 backdrop-blur-sm hover:bg-white/80 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border border-indigo-300/20 hover:border-purple-400/40 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl group-hover:animate-pulse shadow-sm">
                      <PenTool size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">AI Writer</p>
                      <p className="text-xs text-gray-600">Creative Writing</p>
                    </div>
                  </div>
                  <div className="text-2xl group-hover:animate-bounce">✍️</div>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-400/30 text-center">
              <p className="text-xs text-gray-500 font-mono">
                Powered by Matrix Gear Technology
              </p>
            </div>
          </div>
        )}

  {/* Status indicator removed */}
      </div>
      <BottomPopup
        message={popupMsg}
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}

export default Home;

