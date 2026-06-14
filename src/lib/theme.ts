import type { CustomTheme } from "./storage";

export function applyTheme(mode: "light" | "dark", custom: CustomTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");

  // Remove all aesthetic theme classes first
  root.classList.remove("theme-desert", "theme-river", "theme-moonlit");

  if (custom) {
    root.style.setProperty("--bg", custom.bg);
    root.style.setProperty("--ink", custom.ink);
    root.style.setProperty("--gold", custom.gold);

    // Apply aesthetic theme class if present
    if (custom.aesthetic) {
      root.classList.add(`theme-${custom.aesthetic}`);
    }
  } else {
    root.style.removeProperty("--bg");
    root.style.removeProperty("--ink");
    root.style.removeProperty("--gold");
  }
}

export const PRESETS: { name: string; emoji: string; description: string; theme: { bg: string; ink: string; gold: string; aesthetic?: string } }[] = [
  { name: "Parchment", emoji: "📜", description: "Classic warm parchment", theme: { bg: "#f7f1e1", ink: "#2a2418", gold: "#b8893d" } },
  { name: "Emerald", emoji: "🌿", description: "Calm forest green", theme: { bg: "#eef7f1", ink: "#0f2e22", gold: "#0f7c52" } },
  { name: "Midnight", emoji: "🌙", description: "Deep midnight blue", theme: { bg: "#0f1422", ink: "#e8ecf5", gold: "#7aa2ff" } },
  { name: "Rose", emoji: "🌹", description: "Soft rose blush", theme: { bg: "#fbf0ee", ink: "#3a1c1c", gold: "#c2466f" } },
  { name: "Slate", emoji: "🏔️", description: "Serene slate grey", theme: { bg: "#eef1f5", ink: "#1e2a3a", gold: "#3a6ea5" } },
];

export const AESTHETIC_THEMES: { name: string; key: string; emoji: string; description: string; theme: { bg: string; ink: string; gold: string; aesthetic: string } }[] = [
  {
    name: "Desert Oasis",
    key: "desert",
    emoji: "🌴",
    description: "Palm trees, golden dunes & sun-baked horizon",
    theme: { bg: "#f5deb3", ink: "#3b2107", gold: "#c8860a", aesthetic: "desert" },
  },
  {
    name: "River & Greenfield",
    key: "river",
    emoji: "🌊",
    description: "Lush meadows meeting a winding river",
    theme: { bg: "#e8f5e9", ink: "#1b3a2d", gold: "#2e7d32", aesthetic: "river" },
  },
  {
    name: "Moonlit Night",
    key: "moonlit",
    emoji: "✨",
    description: "Twinkling stars in a deep indigo sky",
    theme: { bg: "#0d0d2b", ink: "#e8eaf6", gold: "#ffd700", aesthetic: "moonlit" },
  },
];
