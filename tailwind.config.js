/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          800: "#141E33",
        },
        "pmd-blue-50": "#eef1fa",
        "pmd-blue-100": "#d9e4ff",
        "pmd-blue-300": "#666a83",
        "pmd-blue-600": "#262a57",
        "pmd-blue-800": "#1e2140",
        "pmd-blue-900": "#151932",
        "pmd-red-600": "#f38a8b",
        "pmd-red-700": "#f87070",
      },
      screens: {
        "2xl": "1736px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  darkMode: "class",
};
