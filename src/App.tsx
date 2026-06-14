import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { I18nProvider } from "./lib/i18n";
import { getSettings } from "./lib/storage";
import { applyTheme } from "./lib/theme";
import AppShell from "./components/AppShell";
import Today from "./pages/Today";
import Zikr from "./pages/Zikr";
import ZikrDetail from "./pages/ZikrDetail";
import Library from "./pages/Library";
import DuahDetail from "./pages/DuahDetail";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    getSettings().then((s) => {
      applyTheme(s.theme, s.custom_theme);
      setReady(true);
    });
  }, []);
  if (!ready) return null;
  return (
    <I18nProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/today" replace />} />
          <Route path="/today" element={<Today />} />
          <Route path="/zikr" element={<Zikr />} />
          <Route path="/zikr/:id" element={<ZikrDetail />} />
          <Route path="/library" element={<Library />} />
          <Route path="/duah/:id" element={<DuahDetail />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/today" replace />} />
        </Routes>
      </AppShell>
    </I18nProvider>
  );
}
