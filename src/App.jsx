// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TextChat from './pages/TextChat';
import ImageGen from './pages/ImageGen';
import AIWriter from './pages/AIWriter';
import FriendChat from './pages/FriendChat';
import Login from './pages/Login';
import AboutVersion from './pages/AboutVersion';
import ConnectionStatus from './components/ConnectionStatus';
import TopNavigation from './components/TopNavigation';
import ProtectedRoute from './components/ProtectedRoute';
import OptionalProtectedRoute from './components/OptionalProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-sky-400/20 to-indigo-400/20"></div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-32 right-20 w-3 h-3 bg-sky-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
          
          {/* Remove Top Navigation - only show on login page if needed */}
          
          <div>
            <ConnectionStatus />
            
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <OptionalProtectedRoute>
                  <Home />
                </OptionalProtectedRoute>
              } />
              <Route path="/text-chat" element={
                <OptionalProtectedRoute>
                  <TextChat />
                </OptionalProtectedRoute>
              } />
              <Route path="/image-gen" element={
                <OptionalProtectedRoute>
                  <ImageGen />
                </OptionalProtectedRoute>
              } />
              <Route path="/ai-writer" element={
                <OptionalProtectedRoute>
                  <AIWriter />
                </OptionalProtectedRoute>
              } />
              <Route path="/friend-chat" element={
                <OptionalProtectedRoute>
                  <FriendChat />
                </OptionalProtectedRoute>
              } />
              <Route path="/about-version" element={<AboutVersion />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
