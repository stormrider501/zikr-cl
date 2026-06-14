import { Link } from "react-router-dom";
import zikrs from "@/data/zikrs.json";
import { useT } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { getZikrSessions, todayStr, type ZikrSession } from "@/lib/storage";

export default function Zikr() {
  const { t, lang } = useT();
  const [sessions, setSessions] = useState<ZikrSession[]>([]);
  useEffect(() => {
    getZikrSessions().then(setSessions);
  }, []);
  const today = todayStr();
  const countFor = (id: string) =>
    sessions.find((s) => s.zikr_id === id && s.date === today)?.count ?? 0;

  return (
    <div className="px-4 pt-6">
      <h1 className="font-display text-3xl text-center mb-1">{t("zikr")}</h1>
      <p className="ornament text-xs text-muted text-center mb-6">Tasbih</p>
      <div className="space-y-2">
        {zikrs.map((z) => {
          const count = countFor(z.id);
          return (
            <Link
              key={z.id}
              to={`/zikr/${z.id}`}
              className="block rounded-2xl bg-card border border-border p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium truncate">{z.translit}</p>
                  <p className={`text-xs text-muted ${lang === "bn" ? "font-bangla" : ""}`}>
                    {lang === "bn" ? z.bn : z.en}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-arabic text-xl">{z.arabic}</p>
                  <p className="text-[11px] text-muted">
                    {count}/{z.target}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
