import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { User, LogIn, UserPlus, LogOut, ChevronDown, Settings, History } from 'lucide-react'

const TopNavigation = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef(null)

  // Don't show on login page
  if (location.pathname === '/login') {
    return null
  }

  const handleLogout = async () => {
    await signOut()
    setShowUserMenu(false)
    navigate('/')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/Gemini_Generated_Image_asu2q3asu2q3asu2-removebg-preview.png" 
                alt="Matrix Gear AI" 
                className="h-10 w-10"
              />
              <div className="text-white">
                <h1 className="text-lg font-bold">Matrix Gear AI</h1>
              </div>
            </button>
          </div>

          {/* Right side - Auth buttons or user info */}
          <div className="flex items-center space-x-4">
            {user ? (
              /* Logged in state */
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl px-4 py-2 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="text-white">
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <ChevronDown size={16} className={`text-white transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-white/20">
                      <p className="text-white font-medium text-sm">Signed in as</p>
                      <p className="text-white/80 text-xs truncate">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        // Add settings navigation here if needed
                      }}
                      className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Settings size={14} />
                      <span className="text-sm">Settings</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        // Add chat history navigation here if needed
                      }}
                      className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-200 flex items-center gap-2"
                    >
                      <History size={14} />
                      <span className="text-sm">Chat History</span>
                    </button>
                    
                    <div className="border-t border-white/20 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-300 hover:bg-red-500/20 transition-colors duration-200 flex items-center gap-2"
                      >
                        <LogOut size={14} />
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in state */
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/login')}
                  className="backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl px-4 py-2 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 text-white">
                    <LogIn size={16} />
                    <span className="font-medium">Sign In</span>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/login?mode=signup')}
                  className="backdrop-blur-xl bg-gradient-to-r from-blue-500/80 to-sky-500/80 hover:from-blue-500 hover:to-sky-500 border border-blue-400/30 rounded-xl px-4 py-2 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 text-white">
                    <UserPlus size={16} />
                    <span className="font-medium">Sign Up</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNavigation
