/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0b0f19',
        foreground: '#e6e9ef',
        muted: '#9aa4b2',
        primary: {
          DEFAULT: '#7c5cff',
          500: '#8b70ff',
          600: '#6b46ff',
          700: '#5c3fff',
        },
        accent: '#00d4ff',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      borderRadius: {
        DEFAULT: '12px',
        'lg': '16px',
        'sm': '8px',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(124, 92, 255, 0.25)',
        'glow': '0 0 40px rgba(124, 92, 255, 0.5)',
        'hover': '0 20px 40px rgba(124, 92, 255, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 92, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 92, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
