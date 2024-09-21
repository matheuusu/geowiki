/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        narnoor: ['Narnoor', 'system-ui'],
        montserrat: ['Montserrat', 'system-ui']
      },
      colors: {
        customGreen: {
          50: '#F2FFF4',  // menta claro
          100: '#E1F7E6',
          200: '#CFEFCE',
          300: '#BCE7B5',
          400: '#A8DFA0',
          500: '#90CB99', // verde claro
          600: '#80AF87', // verde médio
          700: '#6EA95F',
          800: '#5B924A',
          900: '#263829', // verde escuro
          950: '#18241A', // mais escuro
        },
      },
    },
  },
  plugins: [],
}