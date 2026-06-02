/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f7f0", // очень светлый золотисто-зеленый
          100: "#e8ede0",
          200: "#d1dbc1",
          300: "#bac9a2",
          400: "#a3b783",
          500: "#8ca564", // основной зеленый
          600: "#6b7d4a", // темнее
          700: "#4a5533", // еще темнее
          800: "#2a301d", // почти черный с зеленым
          900: "#1a1f12", // самый темный
        },
        gold: {
          50: "#fef9e6",
          100: "#fdf0cc",
          200: "#fbe199",
          300: "#f9d266",
          400: "#f7c333",
          500: "#f5b400", // основной золотой
          600: "#c49000",
          700: "#936c00",
          800: "#624800",
          900: "#312400",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
