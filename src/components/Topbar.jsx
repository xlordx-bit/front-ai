// src/components/Topbar.jsx
import React, { useState } from 'react';
import { Power, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Topbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-3">
        <img 
          src="/Gemini_Generated_Image_asu2q3asu2q3asu2-removebg-preview.png" 
          alt="Matrix Gear AI" 
          className="h-12 w-12" 
        />
        <div className="text-white">
          <h1 className="text-lg font-bold">Matrix Gear AI</h1>
          {user ? (
            <p className="text-sm opacity-80">Welcome, {user?.email}</p>
          ) : (
            <p className="text-sm opacity-80">Guest Mode - Sign in for full features</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {user ? (
          <>
            <button
              onClick={() => setOpen(!open)}
              className={`p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-500 ${
                open ? 'rotate-90 scale-110' : ''
              }`}
            >
              <Power size={24} className="text-white" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-all duration-300"
              title="Logout"
            >
              <LogOut size={20} className="text-white" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setOpen(!open)}
              className={`p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-500 ${
                open ? 'rotate-90 scale-110' : ''
              }`}
            >
              <Power size={24} className="text-white" />
            </button>

            <button
              onClick={handleLogin}
              className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl px-4 py-2 hover:bg-white/30 transition-all duration-300 shadow-lg"
              title="Login / Sign Up"
            >
              <div className="flex items-center gap-2 text-white">
                <User size={18} />
                <span className="font-medium">Sign In</span>
              </div>
            </button>
          </>
        )}
      </div>

      {open && (
        <div className="absolute top-20 right-10 backdrop-blur-xl bg-white/20 border border-white/30 p-4 rounded-xl shadow-lg">
          <p className="text-white font-semibold mb-3">Choose a Mode</p>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              📝 <span>Text Chat</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              🖼️ <span>Image Generator</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              ✍️ <span>AI Writer</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              👥 <span>Friend Chat</span>
            </li>
          </ul>
          {!user && (
            <div className="mt-4 pt-3 border-t border-white/20">
              <p className="text-white/60 text-xs mb-2">Sign in for chat history & more features</p>
              <button
                onClick={handleLogin}
                className="w-full backdrop-blur-xl bg-blue-500/30 hover:bg-blue-500/40 border border-blue-400/30 rounded-lg px-3 py-2 text-white text-sm font-medium transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Topbar;
