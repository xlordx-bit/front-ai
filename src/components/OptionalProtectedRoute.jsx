import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const OptionalProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-blue-600 mt-4 text-center font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // Allow access regardless of authentication status
  return children
}

export default OptionalProtectedRoute
