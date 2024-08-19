/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006FEE',
        primaryHover: '#005BC4',
        primaryDisable: '#99C7FB',
        secondary: '#E4E4E7',
        secondaryHover: '#D4D4D8',
        danger: '#dc3545',
        dangerHover: '#c82333'
      }
    },
  },
  plugins: [],
}