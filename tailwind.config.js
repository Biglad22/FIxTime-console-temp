/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", 'sans-serif'],
      },
      colors:{
        'high': 'rgb(255,255,255)',
        'medium': 'rgba(255,255,255,0.6)',
        'low': 'rgba(255,255,255, 0.3)',
        'surface' : '#2A2A2A',
        'accent' : '#29EEFF'
      },
      width:{
        'prompt-width' : 'calc(100% - 2.66rem)'
      }
    },
  },
  plugins: [],
}

