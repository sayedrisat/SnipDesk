/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        vault: {
          bg: "#080808",
          surface: "#111111",
          card: "#161616",
          border: "#2a2a2a",
          text: "#f5f5f5",
          muted: "#a1a1aa",
          accent: "#8b5cf6",
          accentSoft: "#7f77dd",
          success: "#22c55e",
          warning: "#f59e0b",
        },
      },
      boxShadow: {
        glow: "0 14px 42px rgba(139, 92, 246, 0.12)",
        drawer: "-24px 0 70px rgba(0, 0, 0, 0.58)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
