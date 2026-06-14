import { useEffect, useState } from "react";
import { getZikrSessions, todayStr, type ZikrSession } from "@/lib/storage";
import { useT } from "@/lib/i18n";

function computeStreak(sessions: ZikrSession[]): number {
  const dates = new Set(sessions.filter((s) => s.count > 0).map((s) => s.date));
  let streak = 0;
  const d = new Date();
  for (;;) {
    const key = d.toISOString().slice(0, 10);
    if (dates.has(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

export default function Progress() {
  const { t } = useT();
  const [sessions, setSessions] = useState<ZikrSession[]>([]);
  useEffect(() => {
    getZikrSessions().then(setSessions);
  }, []);
  const today = todayStr();
  const todays = sessions.filter((s) => s.date === today);
  const totalToday = todays.reduce((a, s) => a + s.count, 0);
  const totalAll = sessions.reduce((a, s) => a + s.count, 0);
  const streak = computeStreak(sessions);

  return (
    <div className="px-4 pt-6">
      <h1 className="font-display text-3xl text-center mb-6">{t("progress")}</h1>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat label={t("streak")} value={streak} />
        <Stat label={t("completed_today")} value={totalToday} />
        <Stat label={t("total_count")} value={totalAll} />
      </div>
      <div className="rounded-2xl bg-card border border-border p-4">
        <p className="text-xs uppercase tracking-wider text-muted mb-3">Last 14 days</p>
        <div className="flex justify-between items-end gap-1 h-24">
          {Array.from({ length: 14 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (13 - i));
            const key = d.toISOString().slice(0, 10);
            const total = sessions
              .filter((s) => s.date === key)
              .reduce((a, s) => a + s.count, 0);
            const max = 200;
            const h = Math.min(100, (total / max) * 100);
            return (
              <div key={key} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gold"
                  style={{ height: `${h}%`, minHeight: total ? 4 : 1 }}
                />
                <span className="text-[9px] text-muted">{d.getDate()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4 text-center">
      <p className="text-2xl font-display text-gold">{value}</p>
      <p className="text-[11px] text-muted mt-1">{label}</p>
    </div>
  );
}
