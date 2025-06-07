/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",  // enable class-based dark mode toggling
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#40f9b5",  // Planto.ai main minty green color
          dark: "#34c3a1",     // darker shade for hover/active/dark mode
        },
      },
    },
  },
  plugins: [],
}

export default config
