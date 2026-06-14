import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

export default function OfflineBadge() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  if (online) return null;
  return (
    <div className="flex items-center gap-1 rounded-full bg-card border border-border px-2.5 py-1 text-[11px] text-muted">
      <WifiOff className="size-3" /> Offline
    </div>
  );
}
