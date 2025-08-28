// src/components/Sidebar.tsx
import React from 'react';

function Sidebar() {
  return (
    <div className="w-56 bg-white/10 backdrop-blur-md p-4 flex flex-col gap-4 rounded-2xl m-4">
      <h2 className="text-2xl font-bold text-white mb-6">Menu</h2>
      <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">📝 Text Chat</button>
      <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">🖼️ Image Gen</button>
    </div>
  );
}

export default Sidebar;
