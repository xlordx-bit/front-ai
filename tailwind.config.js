/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      colors: {
        // Updated for white and bluish theme
        'neon-pink': '#ec4899', // More muted pink
        'neon-blue': '#3b82f6', // Classic blue
        'neon-purple': '#6366f1', // Indigo
        'neon-green': '#10b981', // Emerald green
        'dark-bg': '#f8fafc', // Light gray instead of dark
        'glass-white': 'rgba(255, 255, 255, 0.6)',
        'glass-dark': 'rgba(59, 130, 246, 0.1)',
        // Additional blue variants
        'sky-light': '#e0f2fe',
        'blue-glass': 'rgba(59, 130, 246, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

