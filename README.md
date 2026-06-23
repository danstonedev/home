# DevPT — devpt.app

The master home page and hub for **DevPT**: a growing platform of simulation and
assessment tools for physical therapy education, built at the University of North
Dakota.

It's a single, self-contained static site (no build step) so it deploys to GitHub
Pages instantly and maps cleanly to the `devpt.app` custom domain.

## Stack

- `index.html` — markup & content (app cards live here)
- `styles.css` — dark / tech theme, UND-green accent
- `app.js` — scroll reveal, stat count-up, category filtering, card glow
- `CNAME` — custom domain (`devpt.app`)

Fonts (Space Grotesk + Inter) load from Google Fonts; everything else is local.

## Run locally

```bash
npm start          # serves at http://localhost:8080 (http-server, no caching)
```

Or just open `index.html` in a browser.

## Add an application

Copy a card block in `index.html` (inside `#appGrid`) and set:

- `href` — the app's live URL (use `target="_blank" rel="noopener noreferrer"`)
- `data-cat` — one or more of `simulation`, `anatomy`, `motion` (space-separated)
- icon, title, `card-tag`, description, and a `badge-live` / `badge-soon` badge

The category filter chips pick the new card up automatically via `data-cat`.

## Deploy

GitHub Pages, `main` branch root (repo: `danstonedev/home`).

1. Push to `main`.
2. Repo **Settings → Pages**: Source = `main` / root.
3. **Settings → Pages → Custom domain** = `devpt.app` (the `CNAME` file already sets this).
4. DNS for `devpt.app` (at your registrar):
   - `A` records for the apex `@` → GitHub Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `danstonedev.github.io`
5. Enable **Enforce HTTPS** once the certificate is issued.
