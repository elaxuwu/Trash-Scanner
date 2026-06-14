# Trash-Scanner

## No Backend Needed

This app is **100% front-end**. The `server/` folder is just a tiny static file host — it does not run any AI, database, or app logic. All waste analysis happens directly in your browser by calling OpenAI, OpenRouter, or Gemini over HTTPS using your own API key.

You only need a static file server because modern browsers block key features on `file://` URLs:

- **Camera access** (`getUserMedia`) — required for scanning items
- **Service Worker** (`sw.js`) — required for PWA install and offline caching
- **Web App Manifest** — required for "Add to Home Screen"
- **Strict CORS rules** on some browsers

Anything that gives the app an `http://localhost` or `https://` origin will work.

## Run Locally

Pick **any one** of the options below. They all do the exact same job.

### Option 1: Bundled Node server (default)

Open a terminal in the project folder:

```powershell
cd "C:\Users\hkhan\OneDrive\Documents\LazyNotes\Trash-Scanner"
```

Start the local static server:

```powershell
node server/local-server.js 8000
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

You can verify the server with:

```text
http://127.0.0.1:8000/health
```

Keep the terminal open while testing. If port `8000` is already in use, choose another port:

```powershell
node server/local-server.js 5500
```

Then open:

```text
http://127.0.0.1:5500/index.html
```

On Windows, you can also run:

```powershell
.\server\start-server.bat
```

The helper uses port `8000` by default, shows the exact URL, keeps the terminal window open, and prints clear errors if Node.js is missing or the server cannot start. To use another port:

```powershell
.\server\start-server.bat 5500
```

### Option 2: Python (no Node.js required)

If you have Python 3 installed:

```bash
cd Trash-Scanner
python -m http.server 8000
```

Then open `http://127.0.0.1:8000/index.html`.

### Option 3: npx (no install required)

If you have Node.js but don't want to use the bundled `server/` folder:

```bash
cd Trash-Scanner
npx serve . -l 8000
```

or

```bash
npx http-server . -p 8000
```

Then open the URL it prints (usually `http://127.0.0.1:8000/index.html`).

### Option 4: VS Code Live Server extension

Install the **Live Server** extension by Ritwick Dey, then right-click `index.html` → **Open with Live Server**. The browser opens automatically.

### Option 5: Drop into a static host

The `Trash-Scanner` folder is a fully static site. You can upload it as-is to:

- GitHub Pages
- Netlify Drop
- Cloudflare Pages
- Vercel
- Any web host that serves static files

No build step, no backend, no env vars required.

## Troubleshooting Old Cached UI

If a normal browser shows an old UI while another browser shows the newest app:

1. Open DevTools.
2. Go to **Application**.
3. Open **Service Workers** and click **Unregister** for this site.
4. Open **Storage** and click **Clear site data**.
5. Hard reload the page.
6. Or use **Settings → Clear Local Cache** inside the app.
7. Or open:

```text
http://127.0.0.1:8000/index.html?v=latest
```

If Opera still shows stale content, disable Opera VPN/proxy or test in Chrome/Edge.

## Cache and PWA Behavior

- Local development on `localhost`, `127.0.0.1`, or `[::1]` disables app service workers so old cached UI does not hide current local files.
- The local Node server sends `Cache-Control: no-store, no-cache, must-revalidate` headers for local testing.
- Production still uses the service worker for PWA caching, offline fallback, `skipWaiting()`, `clients.claim()`, and old app cache cleanup.
- **Settings → Clear Local Cache** clears only this app's `recyclecheck-*` Cache Storage entries and unregisters this app's service worker scope. It does not delete scan history, achievements, quiz stats, API keys, language/theme settings, or other localStorage progress.
- Full offline PWA support currently depends on network access for CDN-hosted dependencies such as Tailwind CSS, Phosphor Icons, Chart.js, and Confetti. To make offline mode complete, vendor or bundle those assets locally.

## Version Bump Checklist

When shipping a new frontend version, update all of these together:

1. `APP_VERSION` in `script.js`
2. `APP_VERSION` in `sw.js`
3. Asset query strings in `index.html`
4. The service worker pre-cache URLs in `sw.js`
5. The visible app version marker in `index.html`
