import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Poppins",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          purple: "#8500FF",
          deep: "#26005F",
          royal: "#140B79",
          blue: "#176BFF",
          pink: "#FF29D6",
          gold: "#FFC83D",
          light: "#F8F4FF",
          dark: "#0F0624",
          card: "rgba(255, 255, 255, 0.05)",
          cardBorder: "rgba(255, 255, 255, 0.12)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(circle at 50% 30%, rgba(133, 0, 255, 0.35) 0%, rgba(20, 11, 121, 0.2) 50%, transparent 80%)",
        "gold-gradient": "linear-gradient(135deg, #FFE259 0%, #FFA751 100%)",
        "purple-gradient": "linear-gradient(135deg, #8500FF 0%, #FF29D6 100%)",
        "blue-gradient": "linear-gradient(135deg, #176BFF 0%, #8500FF 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(133, 0, 255, 0.5)",
        "glow-gold": "0 0 25px -5px rgba(255, 200, 61, 0.5)",
        "glow-pink": "0 0 25px -5px rgba(255, 41, 214, 0.5)",
        "glow-blue": "0 0 25px -5px rgba(23, 107, 255, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
