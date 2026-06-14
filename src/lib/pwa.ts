import { registerSW } from "virtual:pwa-register";

export function registerPWA() {
  if (typeof window === "undefined") return;
  // Only register in production builds, and never inside an iframe preview.
  if (!import.meta.env.PROD) return;
  if (window.self !== window.top) return;
  registerSW({ immediate: true });
}
