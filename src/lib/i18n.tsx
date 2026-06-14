import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSettings, saveSettings } from "./storage";

type Lang = "en" | "bn";
const dict = {
  en: {
    today: "Today", zikr: "Zikr", library: "Library", progress: "Progress", settings: "Settings",
    verse_of_day: "Verse of the day", hadith_of_day: "Hadith of the day", daily_duahs: "Daily duahs",
    morning: "Good morning", afternoon: "Good afternoon", evening: "Good evening", night: "Peaceful night",
    target: "Target", reset: "Reset", complete: "Complete", language: "Language", theme: "Theme",
    light: "Light", dark: "Dark", english: "English", bangla: "Bangla", haptics: "Haptics",
    custom_palette: "Custom palette", background: "Background", ink: "Text", accent: "Accent",
    presets: "Presets", apply: "Apply", reset_palette: "Reset palette", offline: "Offline",
    duahs: "Duahs", names: "99 Names", ayahs: "Ayahs", hadiths: "Hadiths", count: "Count",
    completed_today: "Completed today", streak: "Day streak", total_count: "Total count", tap_to_count: "Tap to count",
  },
  bn: {
    today: "আজ", zikr: "যিকর", library: "লাইব্রেরি", progress: "অগ্রগতি", settings: "সেটিংস",
    verse_of_day: "আজকের আয়াত", hadith_of_day: "আজকের হাদিস", daily_duahs: "দৈনিক দোয়া",
    morning: "শুভ সকাল", afternoon: "শুভ দুপুর", evening: "শুভ সন্ধ্যা", night: "শুভ রাত্রি",
    target: "লক্ষ্য", reset: "রিসেট", complete: "সম্পন্ন", language: "ভাষা", theme: "থিম",
    light: "আলো", dark: "অন্ধকার", english: "ইংরেজি", bangla: "বাংলা", haptics: "কম্পন",
    custom_palette: "নিজের প্যালেট", background: "পটভূমি", ink: "লেখা", accent: "রঙ",
    presets: "প্রিসেট", apply: "প্রয়োগ", reset_palette: "প্যালেট রিসেট", offline: "অফলাইন",
    duahs: "দোয়া", names: "৯৯ নাম", ayahs: "আয়াত", hadiths: "হাদিস", count: "গণনা",
    completed_today: "আজ সম্পন্ন", streak: "দিনের ধারাবাহিকতা", total_count: "মোট গণনা", tap_to_count: "গণনা করতে ট্যাপ করুন",
  },
} as const;

type Key = keyof typeof dict.en;
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string };
const I18nCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    getSettings().then((s) => setLangState(s.language));
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    saveSettings({ language: l });
  };
  const t = (k: Key) => (dict[lang] as any)[k] ?? (dict.en as any)[k] ?? k;
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useT = () => useContext(I18nCtx);
