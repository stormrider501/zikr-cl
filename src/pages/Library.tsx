import { useState } from "react";
import { Link } from "react-router-dom";
import duahs from "@/data/duahs.json";
import names from "@/data/names.json";
import ayahs from "@/data/ayahs.json";
import hadiths from "@/data/hadiths.json";
import { useT } from "@/lib/i18n";

type Tab = "duahs" | "names" | "ayahs" | "hadiths";

export default function Library() {
  const { t, lang } = useT();
  const [tab, setTab] = useState<Tab>("duahs");
  const tabs: { key: Tab; label: string }[] = [
    { key: "duahs", label: t("duahs") },
    { key: "names", label: t("names") },
    { key: "ayahs", label: t("ayahs") },
    { key: "hadiths", label: t("hadiths") },
  ];

  return (
    <div className="px-4 pt-6">
      <h1 className="font-display text-3xl text-center mb-4">{t("library")}</h1>
      <div className="flex gap-1 overflow-x-auto pb-2 mb-3 -mx-1 px-1">
        {tabs.map((x) => (
          <button
            key={x.key}
            onClick={() => setTab(x.key)}
            className={`px-3 py-1.5 rounded-full text-sm shrink-0 border ${
              tab === x.key ? "bg-gold text-white border-gold" : "border-border bg-card"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      {tab === "duahs" && (
        <div className="space-y-2">
          {duahs.map((d) => (
            <Link key={d.id} to={`/duah/${d.id}`} className="block rounded-xl bg-card border border-border p-4">
              <p className={`font-medium ${lang === "bn" ? "font-bangla" : ""}`}>
                {lang === "bn" ? d.title_bn : d.title_en}
              </p>
              <p className="font-arabic text-right text-lg mt-1">{d.arabic}</p>
            </Link>
          ))}
        </div>
      )}

      {tab === "names" && (
        <div className="grid grid-cols-2 gap-2">
          {names.map((n) => (
            <div key={n.n} className="rounded-xl bg-card border border-border p-3 text-center">
              <p className="text-[11px] text-muted">{n.n}</p>
              <p className="font-arabic text-2xl my-1">{n.arabic}</p>
              <p className="text-sm font-medium">{n.translit}</p>
              <p className="text-xs text-muted">{n.en}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "ayahs" && (
        <div className="space-y-2">
          {ayahs.map((a) => (
            <div key={`${a.surah}-${a.ayah}`} className="rounded-xl bg-card border border-border p-4">
              <p className="font-arabic text-xl text-right">{a.arabic}</p>
              <p className={`text-sm mt-2 ${lang === "bn" ? "font-bangla" : ""}`}>
                {lang === "bn" ? a.bn : a.en}
              </p>
              <p className="text-[11px] text-muted mt-1">Surah {a.surah} : {a.ayah}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "hadiths" && (
        <div className="space-y-2">
          {hadiths.map((h) => (
            <div key={h.id} className="rounded-xl bg-card border border-border p-4">
              <p className={`text-sm ${lang === "bn" ? "font-bangla" : ""}`}>
                {lang === "bn" ? h.bn : h.en}
              </p>
              <p className="text-[11px] text-muted mt-1">— {h.source}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
