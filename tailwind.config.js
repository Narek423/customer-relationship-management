/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-red": "rgb(var(--theme-red) / <alpha-value>)",
        "theme-purple": "rgb(var(--theme-purple) / <alpha-value>)",
        "theme-yellow": "rgb(var(--theme-yellow) / <alpha-value>)",
        "theme-accent-blue": "rgb(var(--theme-accent-blue) / <alpha-value>)",
        "theme-accent-blue-light":
          "rgb(var(--theme-accent-blue-light) / <alpha-value>)",
        "theme-accent-blue-dark":
          "rgb(var(--theme-accent-blue-dark) / <alpha-value>)",
        "theme-black": "rgb(var(--theme-black) / <alpha-value>)",
        "theme-green": "rgb(var(--theme-green) / <alpha-value>)",
        "theme-dark-blue-text":
          "rgb(var(--theme-dark-blue-text) / <alpha-value>)",
        "theme-table-black": "rgb(var(--theme-table-black) / <alpha-value>)",
        "theme-gray": "rgb(var(--theme-gray) / <alpha-value>)",
        "theme-table-gray": "rgb(var(--theme-table-gray) / <alpha-value>)",
        "theme-icon-gray": "rgb(var(--theme-icon-gray) / <alpha-value>)",
        "theme-white": "rgb(var(--theme-white) / <alpha-value>)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
