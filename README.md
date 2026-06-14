# Zikr Reminder

Daily Islamic companion PWA — duahs, tasbih counter, verse & hadith of the day. English & Bangla. **Works fully offline, no account, no backend.**

Pure Vite + React + TypeScript + Tailwind. Deploys anywhere static (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, your own server).

## Local development

```bash
npm install
npm run dev          # http://localhost:8080
npm run build        # produces dist/
npm run preview      # preview the production build
```

No environment variables. No secrets. No setup.

## Deploy to Netlify

### Option A — Drag & drop (easiest)
1. `npm install && npm run build`
2. Open https://app.netlify.com/drop
3. Drag the `dist/` folder onto the page. Done.

### Option B — From GitHub
1. Push this folder to a new GitHub repository.
2. Netlify → **Add new site → Import from Git** → choose the repo.
3. Netlify auto-detects `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy**.

`netlify.toml` and `public/_redirects` both contain the SPA fallback, so deep links like `/zikr` and `/library` work after refresh.

## Other hosts
- **Vercel**: import the repo. Framework preset: Vite. No other config needed.
- **GitHub Pages**: `npm run build` then serve `dist/` (set base path in `vite.config.ts` if hosting under a sub-path).
- **Cloudflare Pages**: build = `npm run build`, output = `dist`.

## App Store / Play Store (optional)
This is a PWA. Wrap it with https://www.pwabuilder.com/ — paste your deployed URL and download the Android (AAB) or iOS Xcode project.

## Project structure
```
src/
  pages/          # Today, Zikr, Library, Progress, Settings, etc.
  components/     # UI shell + reusable bits
  data/           # Bundled JSON content (duahs, zikrs, ayahs, hadiths, names)
  lib/            # IndexedDB storage, i18n, theme, PWA registration
  hooks/
public/           # manifest, icons, _redirects
```

All user data (counts, completions, streaks, settings, custom theme, language) is stored locally in **IndexedDB**. Nothing ever leaves the device.

## Editing content
Edit the JSON files in `src/data/` and rebuild. Schemas are inferred at the import site.

## License
MIT
