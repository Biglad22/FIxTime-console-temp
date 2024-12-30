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
      borderRadius:{
        'radius' : '0.67rem'
      },
      colors:{
        'high': 'rgb(255,255,255)',
        'medium': 'rgba(255,255,255,0.6)',
        'low': 'rgba(255,255,255, 0.3)',
        'surface' : '#2A2A2A',
        'card' : '#262626',
        'accent' : '#29EEFF'
      },
      width:{
        'prompt-width' : 'calc(100% - 2.66rem)'
      }
    },
  },
  plugins: [],
}

