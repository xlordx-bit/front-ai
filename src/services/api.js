// src/services/api.js
const API_BASE_URL = 'my-backend-ai-dy77.onrender.com';

export const apiService = {
  // Text generation API call
  generateText: async (prompt) => {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in generateText:', error);
      throw error;
    }
  },

  // Image generation API call
  generateImage: async (prompt) => {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in generateImage:', error);
      throw error;
    }
  },

  // AI Writer API call
  generateWriter: async (prompt, type, wordCount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai-writer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt, 
          writing_type: type, 
          word_count: wordCount 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in generateWriter:', error);
      throw error;
    }
  },

  // Friend Chat API call
  chatFriend: async (message, conversationHistory = []) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat-friend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message, 
          conversation_history: conversationHistory 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in chatFriend:', error);
      throw error;
    }
  },

  // Health check
  checkHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      return response.ok;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }
};
