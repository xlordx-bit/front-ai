// src/components/ConnectionStatus.jsx
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { apiService } from '../services/api';

function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      setIsChecking(true);
      try {
        const connected = await apiService.checkHealth();
        setIsConnected(connected);
      } catch (error) {
        setIsConnected(false);
      } finally {
        setIsChecking(false);
      }
    };

    // Check connection on mount
    checkConnection();

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono transition-all duration-300 backdrop-blur-sm border shadow-sm ${
        isConnected 
          ? 'bg-green-500/20 border-green-400/30 text-green-700' 
          : 'bg-red-500/20 border-red-400/30 text-red-700'
      }`}>
        {isChecking ? (
          <div className="w-3 h-3 border border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        ) : isConnected ? (
          <Wifi size={12} className="text-green-500" />
        ) : (
          <WifiOff size={12} className="text-red-500" />
        )}
        <span>
          {/* Backend status removed */}
        </span>
      </div>
    </div>
  );
}

export default ConnectionStatus;
