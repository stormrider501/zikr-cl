import { get, set, createStore } from "idb-keyval";

const store = typeof window !== "undefined" ? createStore("zikr-reminder", "kv") : undefined;

async function kvGet<T>(k: string, fallback: T): Promise<T> {
  if (!store) return fallback;
  const v = await get<T>(k, store);
  return v ?? fallback;
}
async function kvSet<T>(k: string, v: T) {
  if (!store) return;
  await set(k, v, store);
}

// --- Settings ---
export type CustomTheme = { bg: string; ink: string; gold: string; aesthetic?: string } | null;
export type Settings = {
  theme: "light" | "dark";
  language: "en" | "bn";
  haptics: boolean;
  custom_theme: CustomTheme;
};
const DEFAULT_SETTINGS: Settings = {
  theme: "light",
  language: "en",
  haptics: true,
  custom_theme: null,
};
export const getSettings = () => kvGet<Settings>("settings", DEFAULT_SETTINGS);
export async function saveSettings(patch: Partial<Settings>) {
  const cur = await getSettings();
  const next = { ...cur, ...patch };
  await kvSet("settings", next);
  return next;
}

// --- Zikr sessions ---
export type ZikrSession = { zikr_id: string; date: string; count: number; target: number };
export const getZikrSessions = () => kvGet<ZikrSession[]>("zikr_sessions", []);
export async function setZikrSession(s: ZikrSession) {
  const all = await getZikrSessions();
  const i = all.findIndex((x) => x.zikr_id === s.zikr_id && x.date === s.date);
  if (i >= 0) all[i] = s;
  else all.push(s);
  await kvSet("zikr_sessions", all);
}

// --- Completions ---
export type Completion = { type: "duah" | "ayah" | "hadith"; id: string; date: string };
export const getCompletions = () => kvGet<Completion[]>("completions", []);
export async function toggleCompletion(c: Completion, done: boolean) {
  const all = await getCompletions();
  const i = all.findIndex((x) => x.type === c.type && x.id === c.id && x.date === c.date);
  if (done && i < 0) all.push(c);
  if (!done && i >= 0) all.splice(i, 1);
  await kvSet("completions", all);
}

export const todayStr = () => new Date().toISOString().slice(0, 10);
