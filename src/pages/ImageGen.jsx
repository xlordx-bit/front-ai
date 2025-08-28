// src/pages/ImageGen.jsx
import React, { useState } from 'react';
import { ArrowLeft, Image, Wand2, Download, Share2, Heart, Sparkles, Zap, Camera, Upload, Palette } from 'lucide-react';
import { apiService } from '../services/api';

function ImageGen() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('realistic');

  const styles = [
    { id: 'realistic', name: 'Realistic', emoji: '📸', desc: 'Photo-realistic vibes' },
    { id: 'anime', name: 'Anime', emoji: '🎌', desc: 'Kawaii energy' },
    { id: 'cartoon', name: 'Cartoon', emoji: '🎨', desc: 'Fun & colorful' },
    { id: 'cyberpunk', name: 'Cyberpunk', emoji: '🌆', desc: 'Neon city vibes' },
    { id: 'fantasy', name: 'Fantasy', emoji: '🧙', desc: 'Magical realms' },
    { id: 'minimalist', name: 'Minimal', emoji: '⚪', desc: 'Clean aesthetic' },
  ];

  const promptSuggestions = [
    "Aesthetic neon city at night with purple vibes ✨",
    "Cute robot cat wearing headphones 🎧",
    "Dreamy sunset over crystal mountains 🌅",
    "Cozy coffee shop in a magical forest ☕",
    "Futuristic bedroom with holographic plants 🪴",
    "Y2K aesthetic computer setup with rainbows 🌈"
  ];

  const trendingPrompts = [
    "Dark academia library with floating books 📚",
    "Vaporwave aesthetic swimming pool 🏊‍♀️", 
    "Cottagecore kitchen with fairy lights ✨",
    "Cyberpunk street food market 🍜",
    "Retro arcade filled with neon lights 🕹️",
    "Space cafe with galaxy view windows 🌌"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    try {
      // Add style to the prompt for better results
      const enhancedPrompt = selectedStyle === 'realistic' 
        ? prompt 
        : `${prompt}, ${selectedStyle} style`;
      
      // Call the backend API using the service
      const data = await apiService.generateImage(enhancedPrompt);
      
      if (data.error) {
        console.error('Image generation error:', data.error);
        // Fallback to placeholder for demo
        const newImage = {
          id: Date.now(),
          prompt: prompt,
          style: selectedStyle,
          url: `https://picsum.photos/512/512?random=${Date.now()}`,
          timestamp: new Date(),
          likes: Math.floor(Math.random() * 100),
          error: data.error
        };
        setGeneratedImages(prev => [newImage, ...prev]);
      } else if (data.success && data.image_base64) {
        // Use the actual generated image
        const newImage = {
          id: Date.now(),
          prompt: prompt,
          style: selectedStyle,
          url: `data:image/png;base64,${data.image_base64}`,
          timestamp: new Date(),
          likes: Math.floor(Math.random() * 100)
        };
        setGeneratedImages(prev => [newImage, ...prev]);
      } else {
        // Fallback to placeholder
        const newImage = {
          id: Date.now(),
          prompt: prompt,
          style: selectedStyle,
          url: `https://picsum.photos/512/512?random=${Date.now()}`,
          timestamp: new Date(),
          likes: Math.floor(Math.random() * 100),
          error: 'No image data received'
        };
        setGeneratedImages(prev => [newImage, ...prev]);
      }
    } catch (error) {
      console.error('Error calling backend:', error);
      // Fallback to placeholder for demo
      const newImage = {
        id: Date.now(),
        prompt: prompt,
        style: selectedStyle,
        url: `https://picsum.photos/512/512?random=${Date.now()}`,
        timestamp: new Date(),
        likes: Math.floor(Math.random() * 100),
        error: 'Failed to connect to backend'
      };
      setGeneratedImages(prev => [newImage, ...prev]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-100 text-gray-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-indigo-500/10"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-100/20"></div>

      {/* Floating particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full floating-particle opacity-40"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-sky-400 rounded-full floating-particle opacity-30" style={{animationDelay: '1s'}}></div>

      {/* Header */}
      <div className="bg-white/40 backdrop-blur-xl border-b border-blue-300/30 p-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className="p-2 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/70 transition-all duration-300 hover:scale-110 border border-blue-200/50"
            >
              <ArrowLeft size={20} className="text-blue-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl animate-pulse shadow-lg">
                <Image size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Image Generator</h1>
                <p className="text-xs text-blue-500 font-mono">Create Visuals</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs border border-blue-200/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600 font-mono">READY</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 pb-32">
        {/* Input Section */}
        <div className="bg-white/50 backdrop-blur-xl border border-blue-300/30 rounded-3xl p-6 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
            <Wand2 size={24} className="text-blue-500" />
            Create Your Vision ✨
          </h2>
          
          {/* Prompt Input */}
          <div className="mb-6">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your aesthetic vision... Be as creative as you want! 💫"
                className="w-full bg-white/60 backdrop-blur-xl border border-blue-300/40 rounded-2xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:border-blue-400/50 transition-all duration-300 shadow-sm"
                rows="3"
              />
              <div className="absolute right-3 top-3">
                <Palette size={20} className="text-blue-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Style Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
              <Sparkles size={16} className="text-blue-500" />
              Choose Your Aesthetic
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 text-center border shadow-sm ${
                    selectedStyle === style.id
                      ? 'bg-gradient-to-r from-blue-500 to-sky-500 border-blue-400/50 text-white'
                      : 'bg-white/60 backdrop-blur-sm border-blue-300/40 hover:border-blue-400/50 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{style.emoji}</div>
                  <div className="text-xs font-bold">{style.name}</div>
                  <div className={`text-xs font-mono ${selectedStyle === style.id ? 'text-white/80' : 'text-gray-500'}`}>{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Ideas */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-600 flex items-center gap-1">
              <Zap size={14} className="text-blue-500" />
              Trending Ideas:
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {trendingPrompts.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs hover:bg-white/80 transition-all duration-300 hover:scale-105 border border-blue-300/30 hover:border-blue-400/50 text-gray-700"
                >
                  🔥 {suggestion}
                </button>
              ))}
            </div>
            <h3 className="text-sm font-semibold mb-2 text-gray-600 flex items-center gap-1">
              <Sparkles size={14} className="text-blue-500" />
              Quick Starters:
            </h3>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs hover:bg-white/80 transition-all duration-300 hover:scale-105 border border-blue-300/30 hover:border-blue-400/50 text-gray-700"
                >
                  ✨ {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white shadow-lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Creating Magic...
                </>
              ) : (
                <>
                  <Camera size={20} />
                  Generate Image
                </>
              )}
            </button>
            <button className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300 border border-blue-300/30 shadow-sm">
              <Upload size={20} className="text-blue-500" />
            </button>
          </div>
        </div>

        {/* Generated Images Gallery */}
        {generatedImages.length > 0 && (
          <div className="bg-white/50 backdrop-blur-xl border border-blue-300/30 rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <Image size={24} className="text-blue-500" />
              Your Creations ({generatedImages.length}) 🎨
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image) => (
                <div key={image.id} className="group">
                  <div className="bg-white/60 backdrop-blur-sm border border-blue-300/30 rounded-2xl p-4 hover:border-blue-400/50 transition-all duration-300 shadow-sm">
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex gap-2">
                          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:scale-110 transition-all duration-300 shadow-sm">
                            <Download size={16} className="text-gray-700" />
                          </button>
                          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:scale-110 transition-all duration-300 shadow-sm">
                            <Share2 size={16} className="text-gray-700" />
                          </button>
                          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:scale-110 transition-all duration-300 shadow-sm">
                            <Heart size={16} className="text-gray-700" />
                          </button>
                        </div>
                      </div>
                      {/* Like count */}
                      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
                        <Heart size={12} className="text-pink-500" />
                        {image.likes}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {image.prompt}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-purple-600">{image.style}</span>
                        <span className="text-gray-500 font-mono">
                          {image.timestamp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {generatedImages.length === 0 && !isGenerating && (
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse shadow-lg">
                <Image size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">Ready to Create Something Epic? ✨</h3>
              <p className="text-gray-600">
                Describe your vision above and watch the magic happen! No cap! 🔥
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="fixed bottom-0 left-0 right-0 text-center py-4 bg-white/40 backdrop-blur-xl border-t border-blue-300/30 shadow-sm">
        <p className="text-xs text-blue-500 font-mono flex items-center justify-center gap-1">
          <Zap size={12} className="text-blue-500" />
          Powered by Matrix Gear AI • Creating aesthetic vibes since forever 💅
        </p>
      </div>
    </div>
  );
}

export default ImageGen;
