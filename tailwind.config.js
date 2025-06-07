/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables toggling dark mode via 'dark' class
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#40f9b5", // main minty green
          dark: "#34c3a1",    // darker shade for hover/active/dark mode
        },
      },
    },
  },
  plugins: [],
}
