import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#263238",
        muted: "#63706b",
        paper: "#fffdf8",
        mint: "#dff2e8",
        sage: "#7aa996",
        coral: "#f28b74",
        honey: "#f4c86a",
        skywash: "#7fa8c9",
      },
      boxShadow: {
        soft: "0 24px 60px rgba(38, 50, 56, 0.13)",
        button: "0 14px 32px rgba(38, 50, 56, 0.22)",
      },
      fontFamily: {
        sans: ["Microsoft YaHei", "PingFang SC", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
