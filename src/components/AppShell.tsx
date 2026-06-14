import { NavLink } from "react-router-dom";
import { Home, Repeat, BookOpen, BarChart2, Settings as Cog } from "lucide-react";
import type { ReactNode } from "react";
import { useT } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";
import OfflineBadge from "./OfflineBadge";

export default function AppShell({ children }: { children: ReactNode }) {
  const { t } = useT();
  const nav = [
    { to: "/today", icon: Home, label: t("today") },
    { to: "/zikr", icon: Repeat, label: t("zikr") },
    { to: "/library", icon: BookOpen, label: t("library") },
    { to: "/progress", icon: BarChart2, label: t("progress") },
    { to: "/settings", icon: Cog, label: t("settings") },
  ];
  return (
    <div className="min-h-screen pb-20 bg-bg text-ink">
      <div className="fixed top-3 right-3 z-30 flex items-center gap-2">
        <OfflineBadge />
        <ThemeToggle />
      </div>
      <main className="max-w-md mx-auto">{children}</main>
      <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-border bg-card/90 backdrop-blur">
        <div className="max-w-md mx-auto grid grid-cols-5">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-[11px] ${
                  isActive ? "text-gold" : "text-muted"
                }`
              }
            >
              <n.icon className="size-5" />
              <span>{n.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
