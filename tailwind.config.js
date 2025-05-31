/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bento-purple': '#E8E1FF',
        'bento-blue': '#E1F3FF', 
        'bento-green': '#E1FFE8',
        'bento-yellow': '#FFF9E1',
        'bento-pink': '#FFE1F3',
        'bento-orange': '#FFE8E1'
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
} 
