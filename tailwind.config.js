/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        arabic: ["Amiri", "serif"],
        bangla: ["'Noto Serif Bengali'", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        gold: "var(--gold)",
        card: "var(--card)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};
