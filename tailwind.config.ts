import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8f6",
          100: "#feece7",
          500: "#f05a28",
          600: "#e04815",
          700: "#c23608",
          purple: "#635bff",
        },
        cashback: {
          DEFAULT: "#10b981",
          light: "#ecfdf5",
          dark: "#047857",
        }
      },
    },
  },
  plugins: [],
};
export default config;
