import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08090c",
        panel: "#12141a",
        accent: "#f7931a"
      }
    }
  },
  plugins: []
};

export default config;
