import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettings, saveSettings } from "@/lib/storage";
import { applyTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  useEffect(() => {
    getSettings().then((s) => setMode(s.theme));
  }, []);
  const toggle = async () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    const s = await saveSettings({ theme: next });
    applyTheme(next, s.custom_theme);
  };
  return (
    <button
      onClick={toggle}
      className="size-9 rounded-full bg-card border border-border flex items-center justify-center shadow"
      aria-label="Toggle theme"
    >
      {mode === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}
