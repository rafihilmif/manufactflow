import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f6f0",
          100: "#e8eddf",
          200: "#d1dbbf",
          300: "#b0c490",
          400: "#8bae66",
          500: "#628141",
          600: "#516a36",
          700: "#3f522b",
          800: "#2d3a1f",
          900: "#1e2815",
        },
        accent: {
          DEFAULT: "#604181",
          light: "#7a5aa0",
          dark: "#4a3261",
        },
      },
    },
  },
  plugins: [],
};

export default config;
