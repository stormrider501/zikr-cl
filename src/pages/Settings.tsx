import { useEffect, useState } from "react";
import { getSettings, saveSettings, type Settings } from "@/lib/storage";
import { applyTheme } from "@/lib/theme";
import { useT } from "@/lib/i18n";
import ThemePalette from "@/components/ThemePalette";

export default function SettingsPage() {
  const { t, setLang } = useT();
  const [s, setS] = useState<Settings | null>(null);
  useEffect(() => {
    getSettings().then(setS);
  }, []);
  if (!s) return null;

  const update = async (patch: Partial<Settings>) => {
    const next = await saveSettings(patch);
    setS(next);
    applyTheme(next.theme, next.custom_theme);
    if (patch.language) setLang(patch.language);
  };

  return (
    <div className="px-4 pt-6 space-y-4">
      <h1 className="font-display text-3xl text-center mb-2">{t("settings")}</h1>

      <Row label={t("language")}>
        <div className="flex gap-2">
          {(["en", "bn"] as const).map((l) => (
            <button
              key={l}
              onClick={() => update({ language: l })}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                s.language === l ? "bg-gold text-white border-gold" : "border-border bg-card"
              }`}
            >
              {l === "en" ? t("english") : t("bangla")}
            </button>
          ))}
        </div>
      </Row>

      <Row label={t("theme")}>
        <div className="flex gap-2">
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              onClick={() => update({ theme: m })}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                s.theme === m ? "bg-gold text-white border-gold" : "border-border bg-card"
              }`}
            >
              {m === "light" ? t("light") : t("dark")}
            </button>
          ))}
        </div>
      </Row>

      <Row label={t("haptics")}>
        <button
          onClick={() => update({ haptics: !s.haptics })}
          className={`px-3 py-1.5 rounded-full text-sm border ${
            s.haptics ? "bg-gold text-white border-gold" : "border-border bg-card"
          }`}
        >
          {s.haptics ? "On" : "Off"}
        </button>
      </Row>

      <ThemePalette />

      <p className="text-center text-[11px] text-muted pt-4">Zikr Reminder · v1.0</p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between gap-3">
      <span className="text-sm">{label}</span>
      {children}
    </div>
  );
}
