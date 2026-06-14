import { Link, useParams } from "react-router-dom";
import { ChevronLeft, RotateCcw } from "lucide-react";
import zikrs from "@/data/zikrs.json";
import { useEffect, useState } from "react";
import { getSettings, getZikrSessions, setZikrSession, todayStr } from "@/lib/storage";
import { useT } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function ZikrDetail() {
  const { id } = useParams();
  const { t, lang } = useT();
  const z = zikrs.find((x) => x.id === id);
  const [count, setCount] = useState(0);
  const [haptics, setHaptics] = useState(true);
  const date = todayStr();

  useEffect(() => {
    if (!z) return;
    Promise.all([getZikrSessions(), getSettings()]).then(([list, s]) => {
      const cur = list.find((x) => x.zikr_id === z.id && x.date === date)?.count ?? 0;
      setCount(cur);
      setHaptics(s.haptics);
    });
  }, [z, date]);

  if (!z) return <div className="p-6">Not found</div>;

  const inc = async () => {
    const next = count + 1;
    setCount(next);
    if (haptics && navigator.vibrate) navigator.vibrate(15);
    await setZikrSession({ zikr_id: z.id, date, count: next, target: z.target });
  };
  const reset = async () => {
    setCount(0);
    await setZikrSession({ zikr_id: z.id, date, count: 0, target: z.target });
  };

  const pct = Math.min(100, (count / z.target) * 100);

  return (
    <div className="px-4 pt-4 pb-8">
      <Link to="/zikr" className="inline-flex items-center text-sm text-muted mb-3">
        <ChevronLeft className="size-4" /> {t("zikr")}
      </Link>

      <div className="text-center mt-4">
        <p className="font-arabic text-3xl leading-loose">{z.arabic}</p>
        <p className="text-sm text-muted mt-1">{z.translit}</p>
        <p className={`text-sm mt-1 ${lang === "bn" ? "font-bangla" : ""}`}>
          {lang === "bn" ? z.bn : z.en}
        </p>
      </div>

      <div className="my-8 flex items-center justify-center">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={inc}
          className="relative size-64 rounded-full bg-card border border-border shadow-xl flex items-center justify-center"
          aria-label={t("tap_to_count")}
        >
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--border)" strokeWidth="3" />
            <circle
              cx="50" cy="50" r="46" fill="none"
              stroke="var(--gold)" strokeWidth="3"
              strokeDasharray={`${(pct / 100) * 289} 289`}
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center">
            <p className="text-6xl font-display">{count}</p>
            <p className="text-xs text-muted mt-1">{t("target")}: {z.target}</p>
          </div>
        </motion.button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
        >
          <RotateCcw className="size-4" /> {t("reset")}
        </button>
      </div>
    </div>
  );
}
