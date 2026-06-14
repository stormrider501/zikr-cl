import { useEffect, useState } from "react";
import { getSettings, saveSettings, type CustomTheme } from "@/lib/storage";
import { applyTheme, PRESETS, AESTHETIC_THEMES } from "@/lib/theme";
import { useT } from "@/lib/i18n";

export default function ThemePalette() {
  const { t } = useT();
  const [theme, setTheme] = useState<CustomTheme>(null);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [bg, setBg] = useState("#f7f1e1");
  const [ink, setInk] = useState("#2a2418");
  const [gold, setGold] = useState("#b8893d");
  const [activeAesthetic, setActiveAesthetic] = useState<string | undefined>(undefined);

  useEffect(() => {
    getSettings().then((s) => {
      setTheme(s.custom_theme);
      setMode(s.theme);
      if (s.custom_theme) {
        setBg(s.custom_theme.bg);
        setInk(s.custom_theme.ink);
        setGold(s.custom_theme.gold);
        setActiveAesthetic(s.custom_theme.aesthetic);
      }
    });
  }, []);

  const apply = async (ct: CustomTheme) => {
    setTheme(ct);
    const s = await saveSettings({ custom_theme: ct });
    applyTheme(s.theme, ct);
    setActiveAesthetic(ct?.aesthetic);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-5">
      <h3 className="font-display text-lg">{t("custom_palette")}</h3>

      {/* ── Aesthetic Themes ── */}
      <div>
        <p className="text-xs text-muted mb-3 font-medium uppercase tracking-wider">Aesthetic Themes</p>
        <div className="space-y-2">
          {AESTHETIC_THEMES.map((a) => {
            const isActive = activeAesthetic === a.key;
            return (
              <button
                key={a.key}
                onClick={() => {
                  setBg(a.theme.bg);
                  setInk(a.theme.ink);
                  setGold(a.theme.gold);
                  apply(a.theme);
                }}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all border ${
                  isActive
                    ? "border-[var(--gold)] shadow-md scale-[1.01]"
                    : "border-border hover:border-[var(--gold)] hover:shadow-sm"
                }`}
                style={
                  isActive
                    ? { background: `linear-gradient(135deg, ${a.theme.bg}cc, ${a.theme.bg}88)`, color: a.theme.ink }
                    : {}
                }
              >
                {/* Color swatch strip */}
                <span className="flex-shrink-0 flex rounded-lg overflow-hidden shadow-sm" style={{ width: 36, height: 36 }}>
                  <span className="flex-1" style={{ background: a.theme.bg }} />
                  <span className="flex-1" style={{ background: a.theme.gold }} />
                  <span className="flex-1" style={{ background: a.theme.ink }} />
                </span>

                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base leading-none">{a.emoji}</span>
                    <span className="font-medium text-sm">{a.name}</span>
                    {isActive && (
                      <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: a.theme.gold, color: "#fff" }}>
                        ACTIVE
                      </span>
                    )}
                  </span>
                  <span className="block text-xs opacity-60 mt-0.5 truncate">{a.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Classic Presets ── */}
      <div>
        <p className="text-xs text-muted mb-2 font-medium uppercase tracking-wider">{t("presets")}</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setBg(p.theme.bg);
                setInk(p.theme.ink);
                setGold(p.theme.gold);
                apply(p.theme);
              }}
              className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs hover:border-[var(--gold)] transition-colors"
            >
              <span className="flex">
                <span className="size-3 rounded-full" style={{ background: p.theme.bg }} />
                <span className="size-3 rounded-full -ml-1" style={{ background: p.theme.ink }} />
                <span className="size-3 rounded-full -ml-1" style={{ background: p.theme.gold }} />
              </span>
              <span>{p.emoji}</span>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Custom Color Pickers ── */}
      <div>
        <p className="text-xs text-muted mb-2 font-medium uppercase tracking-wider">Custom Colors</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t("background"), value: bg, set: setBg },
            { label: t("ink"), value: ink, set: setInk },
            { label: t("accent"), value: gold, set: setGold },
          ].map((row) => (
            <label key={row.label} className="text-xs">
              <span className="block text-muted mb-1">{row.label}</span>
              <input
                type="color"
                value={row.value}
                onChange={(e) => row.set(e.target.value)}
                className="w-full h-10 rounded-lg border border-border bg-card cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex gap-2">
        <button
          onClick={() => apply({ bg, ink, gold })}
          className="flex-1 rounded-full bg-gold text-white py-2 text-sm font-medium"
        >
          {t("apply")}
        </button>
        <button
          onClick={() => {
            apply(null);
            setActiveAesthetic(undefined);
          }}
          className="flex-1 rounded-full border border-border py-2 text-sm"
        >
          {t("reset_palette")}
        </button>
      </div>

      {/* ── Live Preview ── */}
      <div
        className="rounded-xl p-4 border transition-all duration-500"
        style={{ background: bg, color: ink, borderColor: gold + "66" }}
      >
        <p className="font-display text-xl mb-1">
          {activeAesthetic === "desert" && "🌴 Desert Oasis"}
          {activeAesthetic === "river" && "🌊 River & Greenfield"}
          {activeAesthetic === "moonlit" && "✨ Moonlit Night"}
          {!activeAesthetic && "Preview"}
        </p>
        <p className="text-sm opacity-70">سُبْحَانَ ٱللَّٰهِ</p>
        <button
          className="mt-2 rounded-full px-3 py-1 text-xs text-white font-medium"
          style={{ background: gold }}
        >
          Accent button
        </button>
      </div>
    </div>
  );
}
