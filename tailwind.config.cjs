/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cubic11': ['Cubic11', 'sans-serif']
      },
      transitionTimingFunction: {
        'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
      keyframes: {
        expand: {
          '0%, 25%': { transform: 'scale(0.75)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'expand': 'expand 500ms cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    },
  },
  plugins: [],
}
