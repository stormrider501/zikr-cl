import { useEffect, useMemo, useState } from "react";
import ayahs from "@/data/ayahs.json";
import hadiths from "@/data/hadiths.json";
import duahs from "@/data/duahs.json";
import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";

function greetingKey(): "morning" | "afternoon" | "evening" | "night" {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  if (h < 21) return "evening";
  return "night";
}

export default function Today() {
  const { t, lang } = useT();
  const [greet, setGreet] = useState<"morning" | "afternoon" | "evening" | "night">("morning");
  useEffect(() => setGreet(greetingKey()), []);

  const dayIndex = useMemo(() => {
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 0);
    return Math.floor((+d - +start) / 86400000);
  }, []);
  const ayah = ayahs[dayIndex % ayahs.length];
  const hadith = hadiths[dayIndex % hadiths.length];

  return (
    <div className="px-4 pt-6 space-y-6">
      <header className="text-center">
        <p className="text-sm text-muted">{t(greet)}</p>
        <h1 className="font-display text-3xl">{t("today")}</h1>
        <p className="ornament text-xs text-muted mt-1">Bismillah</p>
      </header>

      <section className="rounded-2xl bg-card border border-border p-5">
        <p className="text-[11px] uppercase tracking-wider text-muted mb-2">{t("verse_of_day")}</p>
        <p className="font-arabic text-2xl leading-loose text-right mb-2">{ayah.arabic}</p>
        <p className={`text-sm ${lang === "bn" ? "font-bangla" : ""}`}>
          {lang === "bn" ? ayah.bn : ayah.en}
        </p>
        <p className="text-[11px] text-muted mt-2">Surah {ayah.surah} : {ayah.ayah}</p>
      </section>

      <section className="rounded-2xl bg-card border border-border p-5">
        <p className="text-[11px] uppercase tracking-wider text-muted mb-2">{t("hadith_of_day")}</p>
        <p className={`text-sm ${lang === "bn" ? "font-bangla" : ""}`}>
          {lang === "bn" ? hadith.bn : hadith.en}
        </p>
        <p className="text-[11px] text-muted mt-2">— {hadith.source}</p>
      </section>

      <section>
        <p className="text-[11px] uppercase tracking-wider text-muted mb-2 px-1">{t("daily_duahs")}</p>
        <div className="space-y-2">
          {duahs.slice(0, 4).map((d) => (
            <Link
              to={`/duah/${d.id}`}
              key={d.id}
              className="block rounded-xl bg-card border border-border p-4"
            >
              <p className={`font-medium ${lang === "bn" ? "font-bangla" : ""}`}>
                {lang === "bn" ? d.title_bn : d.title_en}
              </p>
              <p className="font-arabic text-lg text-right mt-1">{d.arabic}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
