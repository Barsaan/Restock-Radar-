/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#00FFFF',
        dark: {
          100: '#1E1E1E',
          200: '#181818',
          300: '#121212',
        },
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.2)',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
};