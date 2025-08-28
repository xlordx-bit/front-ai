import React, { useState } from 'react'
import BottomPopup from '../components/BottomPopup';
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, Home } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  // Check URL params to determine if it's signup mode
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('mode') === 'signup') {
      setIsLogin(false)
    }
  }, [])

  // Instead of real sign in/up, show popup
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-sky-400/10 to-indigo-400/10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Skip to Home Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 4000);
          }}
          className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl px-6 py-3 hover:bg-white/30 transition-all duration-300 shadow-lg group"
        >
          <div className="flex items-center gap-2 text-blue-700">
            <Home size={18} />
            <span className="font-medium">Skip to App</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </button>
      </div>

      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-sky-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto h-20 w-20 flex items-center justify-center mb-4 backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl shadow-lg">
                <img 
                  src="/Gemini_Generated_Image_asu2q3asu2q3asu2-removebg-preview.png" 
                  alt="Matrix Gear AI" 
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Welcome Back' : 'Join Matrix Gear'}
              </h2>
              <p className="text-blue-600/80 font-medium">
                {isLogin ? 'Sign in to continue your AI journey' : 'Create your account and explore AI'}
              </p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Sparkles size={16} className="text-blue-500" />
                <span className="text-sm text-gray-600">Powered by Advanced AI</span>
                <Sparkles size={16} className="text-blue-500" />
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-blue-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl w-full pl-10 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-blue-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl w-full pl-10 pr-12 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-500 hover:text-blue-500 transition-colors" />
                    ) : (
                      <Eye size={18} className="text-gray-500 hover:text-blue-500 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="backdrop-blur-xl bg-red-100/60 border border-red-200/50 rounded-xl p-3">
                  <p className="text-red-700 text-sm font-medium text-center">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full backdrop-blur-xl bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <User size={18} />
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    </>
                  )}
                </div>
              </button>

              {/* Toggle Login/Signup */}
              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                  onClick={() => {
                    setShowPopup(true);
                    setTimeout(() => setShowPopup(false), 4000);
                  }}
                >
                  {isLogin 
                    ? "Don't have an account? Create one" 
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-600">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="text-center mt-6">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm font-medium">Matrix Gear AI</span>
              <Sparkles size={16} className="text-blue-400" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
      <BottomPopup
        message={isLogin ? 'Sign in feature coming soon!' : 'Sign up feature coming soon!'}
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </div>
  )
}

export default Login
