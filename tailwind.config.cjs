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
      }
    },
  },
  plugins: [],
}
