// src/pages/AIWriter.jsx
import React, { useState } from 'react';
import { ArrowLeft, PenTool, FileText, Quote, Mail, BookOpen, Heart, Lightbulb, Briefcase, User, Send, Download, Copy, Sparkles } from 'lucide-react';
import { apiService } from '../services/api';

function AIWriter() {
  const [selectedType, setSelectedType] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordCount, setWordCount] = useState(500);
  const [copySuccess, setCopySuccess] = useState(false);

  const writingTypes = [
    { 
      id: 'letter', 
      name: 'Letter', 
      icon: Mail, 
      emoji: '✉️', 
      desc: 'Personal or business letters',
      placeholder: 'Write a letter to...'
    },
    { 
      id: 'essay', 
      name: 'Essay', 
      icon: FileText, 
      emoji: '📝', 
      desc: 'Academic or opinion essays',
      placeholder: 'Write an essay about...'
    },
    { 
      id: 'quotes', 
      name: 'Quotes', 
      icon: Quote, 
      emoji: '💭', 
      desc: 'Inspirational quotes',
      placeholder: 'Generate quotes about...'
    },
    { 
      id: 'story', 
      name: 'Story', 
      icon: BookOpen, 
      emoji: '📚', 
      desc: 'Creative stories',
      placeholder: 'Write a story about...'
    },
    { 
      id: 'poem', 
      name: 'Poem', 
      icon: Heart, 
      emoji: '🎭', 
      desc: 'Poetry and verses',
      placeholder: 'Write a poem about...'
    },
    { 
      id: 'article', 
      name: 'Article', 
      icon: Lightbulb, 
      emoji: '💡', 
      desc: 'Blog posts and articles',
      placeholder: 'Write an article about...'
    },
    { 
      id: 'business', 
      name: 'Business', 
      icon: Briefcase, 
      emoji: '💼', 
      desc: 'Business documents',
      placeholder: 'Create a business document for...'
    },
    { 
      id: 'bio', 
      name: 'Biography', 
      icon: User, 
      emoji: '👤', 
      desc: 'Personal biographies',
      placeholder: 'Write a biography for...'
    }
  ];

  const goBack = () => {
    window.history.back();
  };

  const resetToTypeSelection = () => {
    setSelectedType('');
    setPrompt('');
    setGeneratedContent('');
    setCopySuccess(false);
    setWordCount(500);
  };

  const handleGenerate = async () => {
    if (!selectedType || !prompt.trim()) return;

    setIsGenerating(true);
    
    try {
      const enhancedPrompt = `Write a ${selectedType} about: ${prompt}. Target word count: approximately ${wordCount} words. Make it engaging and well-structured.`;
      
      const data = await apiService.generateWriter(enhancedPrompt, selectedType, wordCount);
      
      if (data.error) {
        setGeneratedContent(`Sorry! Something went wrong: ${data.error} 😅`);
      } else {
        setGeneratedContent(data.content || "Sorry, I couldn't generate content right now! 🤖");
      }
    } catch (error) {
      console.error('Error calling backend:', error);
      setGeneratedContent("Sorry, I'm having trouble connecting to my writing brain right now! Try again in a bit! 🤖💭");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generatedContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedType}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
                <PenTool size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">AI Writer</h1>
                <p className="text-xs text-blue-500 font-mono">Creative Writing Assistant</p>
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
        {!selectedType ? (
          /* Writing Type Selection */
          <div className="bg-white/50 backdrop-blur-xl border border-blue-300/30 rounded-3xl p-6 mb-6 shadow-lg">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
              <Sparkles size={24} className="text-blue-500" />
              Choose Your Writing Style ✨
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {writingTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className="group p-4 bg-white/60 backdrop-blur-sm border border-blue-300/30 rounded-2xl hover:border-blue-400/50 transition-all duration-300 hover:scale-105 shadow-sm text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg group-hover:animate-pulse">
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <span className="text-2xl">{type.emoji}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{type.name}</h3>
                    <p className="text-xs text-gray-600">{type.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Writing Interface */
          <div className="space-y-6">
            {/* Back to selection */}
            <button
              onClick={resetToTypeSelection}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-all duration-300 text-sm font-medium hover:bg-blue-100/50 px-4 py-2 rounded-xl border border-blue-300/40 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:scale-105"
            >
              <ArrowLeft size={16} />
              Back to writing types
            </button>

            {/* Input Section */}
            <div className="bg-white/50 backdrop-blur-xl border border-blue-300/30 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg">
                  {React.createElement(writingTypes.find(t => t.id === selectedType)?.icon || PenTool, { size: 20, className: "text-white" })}
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {writingTypes.find(t => t.id === selectedType)?.name} {writingTypes.find(t => t.id === selectedType)?.emoji}
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What would you like me to write?</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={writingTypes.find(t => t.id === selectedType)?.placeholder}
                    className="w-full bg-white/60 backdrop-blur-xl border border-blue-300/40 rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:border-blue-400/50 transition-all duration-300 shadow-sm"
                    rows="4"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Word Count</label>
                    <select
                      value={wordCount}
                      onChange={(e) => setWordCount(Number(e.target.value))}
                      className="bg-white/60 border border-blue-300/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400/50"
                    >
                      <option value={200}>200 words</option>
                      <option value={500}>500 words</option>
                      <option value={1000}>1000 words</option>
                      <option value={1500}>1500 words</option>
                      <option value={2000}>2000 words</option>
                    </select>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Writing...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Generate {writingTypes.find(t => t.id === selectedType)?.name}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <div className="bg-white/50 backdrop-blur-xl border border-blue-300/30 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Generated Content</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className={`p-2 backdrop-blur-sm rounded-lg transition-all duration-300 border flex items-center gap-1 ${
                        copySuccess 
                          ? 'bg-green-100/80 border-green-300/50 text-green-600' 
                          : 'bg-white/60 border-blue-300/30 text-blue-600 hover:bg-white/80'
                      }`}
                      title={copySuccess ? "Copied!" : "Copy to clipboard"}
                    >
                      {copySuccess ? (
                        <>
                          <div className="w-4 h-4 text-green-600">✓</div>
                          <span className="text-xs font-medium">Copied!</span>
                        </>
                      ) : (
                        <Copy size={16} className="text-blue-600" />
                      )}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all duration-300 border border-blue-300/30"
                      title="Download as text file"
                    >
                      <Download size={16} className="text-blue-600" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-2xl p-4 border border-blue-200/30 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
                    {generatedContent}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="fixed bottom-0 left-0 right-0 text-center py-4 bg-white/40 backdrop-blur-xl border-t border-blue-300/30 shadow-sm">
        <p className="text-xs text-blue-500 font-mono flex items-center justify-center gap-1">
          <PenTool size={12} className="text-blue-500" />
          Powered by Matrix Gear AI Writer • Creating content since forever ✍️
        </p>
      </div>
    </div>
  );
}

export default AIWriter;
