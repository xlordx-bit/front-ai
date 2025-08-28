import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  LogIn, 
  UserPlus, 
  LogOut, 
  MessageSquare, 
  Image, 
  PenTool, 
  Users, 
  ChevronRight,
  Sparkles,
  Bot
} from 'lucide-react'

const AnimatedSidebar = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const menuItems = [
    {
      icon: MessageSquare,
      label: 'Text Chat',
      description: 'Chat with AI',
      path: '/text-chat',
      color: 'from-blue-500 to-sky-500'
    },
    {
      icon: Image,
      label: 'Image Generator',
      description: 'Create images',
      path: '/image-gen',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: PenTool,
      label: 'AI Writer',
      description: 'Write content',
      path: '/ai-writer',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      label: 'Friend Chat',
      description: 'Casual conversation',
      path: '/friend-chat',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div 
      className={`fixed left-0 top-0 h-full z-40 transition-all duration-700 ease-in-out ${
        isExpanded ? 'w-96' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Sidebar Background */}
      <div className="h-full backdrop-blur-md bg-white/10 border-r border-white/20 shadow-xl">
        
        {/* Header Section */}
        <div className={`border-b border-white/10 transition-all duration-700 ${isExpanded ? 'p-3' : 'p-2'}`}>
          <div className="flex items-center justify-center min-w-0">
            <div className={`backdrop-blur-md bg-white/20 border border-white/20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 transition-all duration-700 ease-out transform hover:scale-110 ${
              isExpanded ? 'w-20 h-20' : 'w-14 h-14'
            }`}>
              <img 
                src="/Gemini_Generated_Image_asu2q3asu2q3asu2-removebg-preview.png" 
                alt="Matrix Gear AI" 
                className={`object-contain flex-shrink-0 transition-all duration-700 ease-out ${
                  isExpanded ? 'w-16 h-16' : 'w-10 h-10'
                }`}
              />
            </div>
            <div className={`transition-all duration-700 ease-out flex-1 min-w-0 ml-3 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <h2 className="text-gray-800 font-bold text-lg truncate">Matrix Gear AI</h2>
              <p className="text-gray-600 text-sm truncate">Your AI Assistant</p>
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className={`border-b border-white/10 transition-all duration-700 ${isExpanded ? 'p-3' : 'p-2'}`}>
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center min-w-0">
                <div className={`bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-700 ease-out transform hover:scale-110 hover:rotate-12 ${
                  isExpanded ? 'w-12 h-12' : 'w-12 h-12'
                }`}>
                  <User size={isExpanded ? 20 : 18} className="text-white flex-shrink-0 transition-all duration-700" />
                </div>
                <div className={`transition-all duration-700 ease-out flex-1 min-w-0 ml-3 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  <p className="text-gray-800 font-medium text-sm truncate">{user.email}</p>
                  <p className="text-green-600 text-xs font-semibold">Online</p>
                </div>
              </div>
              {isExpanded && (
                <button
                  onClick={handleLogout}
                  className="w-full backdrop-blur-md bg-red-500/15 hover:bg-red-500/25 border border-red-400/20 rounded-lg px-3 py-2 transition-all duration-500 ease-out transform hover:scale-105 flex items-center gap-2 text-gray-800"
                >
                  <LogOut size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center min-w-0">
                <div className={`bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-700 ease-out transform hover:scale-110 hover:rotate-12 ${
                  isExpanded ? 'w-12 h-12' : 'w-12 h-12'
                }`}>
                  <User size={isExpanded ? 20 : 18} className="text-white flex-shrink-0 transition-all duration-700" />
                </div>
                <div className={`transition-all duration-700 ease-out flex-1 min-w-0 ml-3 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  <p className="text-gray-800 font-medium text-sm">Guest Mode</p>
                  <p className="text-gray-600 text-xs">Limited features</p>
                </div>
              </div>
              {isExpanded && (
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full backdrop-blur-md bg-blue-500/15 hover:bg-blue-500/25 border border-blue-400/20 rounded-lg px-3 py-2 transition-all duration-500 ease-out transform hover:scale-105 flex items-center gap-2 text-gray-800"
                  >
                    <LogIn size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                    <span className="text-sm font-medium">Sign In</span>
                  </button>
                  <button
                    onClick={() => navigate('/login?mode=signup')}
                    className="w-full backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-sky-500/20 hover:from-blue-500/30 hover:to-sky-500/30 border border-blue-400/20 rounded-lg px-3 py-2 transition-all duration-500 ease-out transform hover:scale-105 flex items-center gap-2 text-gray-800"
                  >
                    <UserPlus size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                    <span className="text-sm font-medium">Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className={`space-y-2 transition-all duration-700 ${isExpanded ? 'p-3' : 'p-2'}`}>
          <div className={`transition-all duration-700 ease-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-blue-500 animate-pulse" />
              <span className="text-gray-800 font-semibold text-sm">AI Features</span>
            </div>
          </div>

          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="w-full group relative overflow-hidden backdrop-blur-md bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-1"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`flex items-center min-w-0 transition-all duration-700 ease-out ${isExpanded ? 'p-2 justify-start' : 'p-2 justify-center'}`}>
                  <div className={`bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 transition-all duration-700 ease-out transform group-hover:scale-110 group-hover:rotate-6 ${
                    isExpanded ? 'w-12 h-12' : 'w-12 h-12'
                  }`}>
                    <Icon size={isExpanded ? 24 : 20} className="text-white flex-shrink-0 transition-all duration-500 group-hover:rotate-12" />
                  </div>
                  <div className={`ml-3 transition-all duration-700 ease-out flex-1 min-w-0 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <p className="text-gray-800 font-medium text-sm text-left truncate">{item.label}</p>
                    <p className="text-gray-600 text-xs text-left truncate">{item.description}</p>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className={`text-gray-500 ml-auto transition-all duration-700 ease-out flex-shrink-0 ${
                      isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    } group-hover:translate-x-2 group-hover:scale-125`} 
                  />
                </div>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>
              </button>
            )
          })}
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <div className={`transition-all duration-700 ease-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center">
              <p className="text-gray-600 text-xs">Powered by Matrix Gear AI</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 text-xs font-mono font-semibold">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimatedSidebar
