/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#141414',
          obsidian: '#1C1B1A',
          cream: '#FCFBF9',
          ivory: '#F7F5F0',
          sand: '#EFECE6',
          gold: '#C5A880',
          'gold-light': '#E8DCB8',
          'gold-dark': '#A08050',
          rose: '#8C6D62',
          emerald: '#1B4D3E',
          'emerald-light': '#E8F5E9',
          charcoal: '#2D2D2D',
          muted: '#737373',
        },
      },
      fontFamily: {
        serif: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'orbit-slow': 'orbit 8s linear infinite',
        'orbit-fast': 'orbit 4s linear infinite',
        'orbit-reverse': 'orbit-reverse 6s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'unlock-burst': 'unlockBurst 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(197, 168, 128, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 16px rgba(197, 168, 128, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        unlockBurst: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(28, 27, 26, 0.08), 0 4px 6px -2px rgba(28, 27, 26, 0.03)',
        'luxury-hover': '0 20px 40px -10px rgba(28, 27, 26, 0.15), 0 8px 10px -4px rgba(28, 27, 26, 0.05)',
        'gold-glow': '0 0 25px rgba(197, 168, 128, 0.35)',
      },
    },
  },
  plugins: [],
};
