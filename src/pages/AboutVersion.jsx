import React from 'react';

const AboutVersion = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 px-2">
    <div className="bg-white/90 p-12 rounded-3xl shadow-2xl border-2 border-blue-300/60 max-w-2xl w-full text-left animate-fade-in">
  <h1 className="text-4xl font-extrabold mb-6 text-blue-700 text-center">About Version 1.0.0</h1>
      <div className="mb-8 text-lg leading-relaxed">
        <p className="mb-4">
          <span className="font-semibold">Matrix Gear AI Version 1.0.0</span> is the first major public release of our next-generation AI chat and creative platform. This version is designed to empower users with advanced AI tools for communication, creativity, and productivity.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-inner mb-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-600">What's Included in Version 1?</h2>
          <ul className="list-disc list-inside text-base ml-4">
            <li className="mb-2"><b>Text Chat:</b> Chat with an advanced AI assistant for help, ideas, and conversation.</li>
            <li className="mb-2"><b>Image Generation (Beta):</b> Create images from text prompts using cutting-edge AI models.</li>
            <li className="mb-2"><b>Friend Chat:</b> Enjoy casual, friendly conversations with a more playful AI persona.</li>
            <li className="mb-2"><b>AI Writer:</b> Generate creative content, stories, and more (experimental).</li>
            <li className="mb-2"><b>Modern UI:</b> Beautiful, responsive design with dark/light themes and smooth animations.</li>
            <li className="mb-2"><b>Guest Mode:</b> Try the app without signing in, with limited features.</li>
            <li className="mb-2"><b>Protected Routes:</b> Secure access to features for registered users.</li>
            <li className="mb-2"><b>Pop-up Notifications:</b> Friendly popups for upcoming features and guest mode info.</li>
            <li className="mb-2"><b>Performance:</b> Fast, reliable backend powered by FastAPI and Uvicorn.</li>
            <li className="mb-2"><b>Mobile Ready:</b> Optimized for use on phones, tablets, and desktops.</li>
            <li className="mb-2"><b>Open Beta:</b> This is an early release—expect rapid updates and new features soon!</li>
          </ul>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-inner mb-6">
          <h2 className="text-xl font-bold mb-2 text-yellow-700">Known Limitations</h2>
          <ul className="list-disc list-inside text-base ml-4">
            <li className="mb-2">Chat saving and history features are coming soon.</li>
            <li className="mb-2">Sign in and sign up are not yet available for all users.</li>
            <li className="mb-2">Some features (attachments, mic, more options) are in development.</li>
            <li className="mb-2">AI Writer and Image Gen are experimental and may have errors.</li>
          </ul>
        </div>
        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl shadow-inner mb-6">
          <h2 className="text-xl font-bold mb-2 text-green-700">What's Next?</h2>
          <ul className="list-disc list-inside text-base ml-4">
            <li className="mb-2">User accounts, chat history, and cloud sync</li>
            <li className="mb-2">Voice and file attachments</li>
            <li className="mb-2">More AI personalities and creative tools</li>
            <li className="mb-2">Performance and accessibility improvements</li>
            <li className="mb-2">Your feedback helps shape the future—thank you for trying Matrix Gear AI!</li>
          </ul>
        </div>
        <p className="text-base text-blue-500 mt-4">Release date: August 2025</p>
      </div>
    </div>
  </div>
);

export default AboutVersion;
