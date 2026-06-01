# CLAUDE.md — Scoopy Doo LLC Website Project

> Last updated: 2026-05-31. Read this at the start of every session.

---

## Business

**Company:** Scoopy Doo LLC — pet waste removal, Chattanooga TN  
**Owner:** Brandon Carter (brandon@scoopychatt.com)  
**Phone:** 423-600-5040  
**Live site:** https://www.scoopychatt.com  
**GitHub repo:** https://github.com/ScoopyChatt/ScoopyChatt  
**GitHub token:** stored in your session — do not commit to repo  
**Competitor reference:** pootagic.com (ranks above us for local terms)

---

## Architecture

### Frontend — Vite React SPA
- **Host:** Vercel (project: `scoopy-chatt`, account: `scoopychatts-projects`)
- **Root:** `apps/web/`
- **Node version:** 22.x (required — Vite 7 needs Node 20.19+, set in vercel.json)
- **Build command:** See vercel.json — runs `npm install`, then `npm run build --prefix apps/web`, then `node apps/web/tools/inject-seo.cjs`
- **Output dir:** `dist/apps/web`
- **Path alias:** `@` = `apps/web/src/`

### Backend API — Express.js
- **Host:** Railway (service: `dynamic-ambition`)
- **Root:** `apps/api/`, port 8080, entry: `node src/main.js`
- **Teardown enabled** on Railway — prevents duplicate active deployments
- **AI:** Google Gemini 2.5 Flash via REST API (v1 endpoint, not SDK)
- **Email:** Resend REST API (key in Railway env vars, NOT committed to repo)
- **SSE format for chatbot:** `{type:'content', data:{content:'...'}}`

### Database — PocketBase  
- **Host:** Railway (service: `precious-surprise`)
- **Root:** `apps/pocketbase/`
- **Volume:** `scoopychatt-volume` at `/app/pb_data` — CRITICAL, without this data wipes on restart
- **Admin credentials:** in Brandon's password manager

### Monorepo
```
ScoopyChatt/
├── apps/web/          # Vite React SPA
├── apps/api/          # Express.js API  
├── apps/pocketbase/   # PocketBase binary
├── vercel.json        # Vercel config — routing, redirects, build command
└── package.json       # npm workspaces root
```

---

## Adding a New Page — Checklist

Do ALL of these or the page will be missing SEO/nav/sitemap:

1. Create `apps/web/src/pages/YourPage.jsx`
2. Add lazy import + `<Route>` to `apps/web/src/App.jsx`
3. Add nav link to `apps/web/src/components/Header.jsx` (if needed)
4. Add entry to `apps/web/src/config/seoMetadata.js`
5. Add to routes object in `apps/web/tools/inject-seo.cjs`
6. Add URL to `apps/web/public/sitemap.xml`

---

## SEO Architecture

React SPA with no SSR. Per-page SEO via two layers:
1. **Build-time:** `inject-seo.cjs` post-build script creates `/route/index.html` per route with correct `<title>` + meta tags
2. **Runtime:** `react-helmet-async` updates tags for navigation within the app

**inject-seo.cjs must be updated** every time a new page is added, or that page gets the homepage title tag.

**GA cities** (must NOT say TN): ringgold, rossville, flintstone, fort-oglethorpe

---

## Known Issues & Status

### Build
- **Vercel builds failing since commit b35e68e** — fixed by adding `nodeVersion: "22.x"` to vercel.json (Vite 7 requires Node 20.19+)
- **Root npm install** now used instead of `--prefix` to properly handle workspaces

### SEO (Active problems)
- **109,106 Soft 404 pages** in Search Console — old Hostinger URLs crawled as HTTP 200 (SPA returns 200 for everything). Need wildcard redirects for old URL patterns.
- **/dp/ spam URLs** — 301 redirect added in vercel.json. Search Console removals submitted manually by Brandon.
- **Ringgold "TN" bug** — fixed in inject-seo.cjs (GA state set correctly for Georgia cities)

### Chatbot
- Uses `gemini-2.5-flash` (1.5 and 2.0 unavailable for this API key)
- Lead capture simplified: no PocketBase, just sets `isLeadCaptured=true`
- SSE format: `{type:'content', data:{content:'...'}}`

### Email
- SMTP blocked by Railway — uses Resend HTTP API instead
- Sending from info@scoopychatt.com (verify domain in Resend dashboard if failing)

---

## Service Area Pages

Dynamic route: `/service/:slug` → `LocationTemplate.jsx` → looks up `src/data/locations.js`

Active slugs: chattanooga, hixson, red-bank, signal-mountain, ooltewah, east-brainerd, soddy-daisy, cleveland, apison, collegedale, highland-park, downtown, east-ridge, lookout-mountain, ringgold (GA), rossville (GA), flintstone (GA), fort-oglethorpe (GA)

---

## How It Works Page

Located at `/how-it-works`. Key differentiators to always emphasize:
- 100% online: quote and pay online, no phone calls
- "On the way" text before every visit
- Gate photo sent when done (gate secured + photo to phone)
- No contracts, cancel anytime

---

## SEO TODO (Priority Order)

1. Fix 109K soft 404s — add wildcard redirects for old Hostinger URL patterns to homepage
2. Get builds deploying cleanly (Node 22 fix in progress)
3. Build commercial pages: HOA pet waste, apartment dog park, pet waste station
4. More local-intent blog posts
5. Verify Resend domain at resend.com/domains
6. Update Google Business Profile URL to www.scoopychatt.com
7. After every deploy: use Search Console URL Inspection → Request Indexing for key pages
