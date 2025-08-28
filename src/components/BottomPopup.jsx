import React from 'react';

const BottomPopup = ({ message, show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95vw] max-w-xs sm:max-w-md">
      <div className="bg-blue-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-lg flex flex-wrap items-center gap-2 sm:gap-3 animate-fade-in text-sm sm:text-base">
        <span className="font-semibold break-words flex-1">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 sm:ml-4 px-2 sm:px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold transition text-xs sm:text-base"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BottomPopup;
