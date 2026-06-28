/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#020810",
        surface: "#060f1e",
        "surface-raised": "#0a1628",
        primary: "#1a3a7a",
        "primary-bright": "#2a5acc",
        "primary-muted": "#60a8e8",
        "text-primary": "#d0e8ff",
        "text-secondary": "#5a8ab0",
        "text-muted": "#3a5a8a",
        success: "#60b8ff",
        warning: "#d4aa50",
        danger: "#e05a5a",
      },
    },
  },
  plugins: [],
};
