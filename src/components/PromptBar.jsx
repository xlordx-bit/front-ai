// src/components/PromptBar.tsx
import React from 'react';

function PromptBar() {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Enter your prompt..."
        className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm placeholder-white/50 text-white outline-none"
      />
    </div>
  );
}

export default PromptBar;
