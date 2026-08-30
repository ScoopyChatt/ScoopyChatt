# CLAUDE.md — Scoopy Doo LLC Website Project

> Last updated: 2026-08-21. Read this at the start of every session.

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
- **Node version:** 24.x (Vercel dashboard setting — do NOT add nodeVersion to vercel.json, it is an invalid property that breaks builds)
- **Build command in vercel.json:** `npm install --prefix apps/web && npm run build --prefix apps/web && node apps/web/tools/inject-seo.cjs && node apps/web/tools/generate-sitemap.cjs && node apps/web/tools/create-static-pages.cjs && node apps/web/tools/verify-routes.cjs`
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

### Dependencies — install with --prefix, always

`apps/web/package-lock.json` is committed and pins all 557 packages. Without it every deploy re-resolved ~72 caret ranges against whatever was newest at build time, so a dependency could break a deploy with no change on our side.

**Always install with `npm install --prefix apps/web`. Never run a bare `npm install` from the repo root.**

The root package.json declares `workspaces: ["apps/*"]`, so npm run from the repo root (or from inside apps/web without --prefix) resolves through workspaces and ignores `apps/web/package-lock.json` — it will write a *second, competing* `package-lock.json` at the root. Vercel's buildCommand uses `--prefix apps/web`, which treats apps/web as standalone and reads the committed lockfile. Only the apps/web one is real; never commit a root lockfile.

Same reason `npm ci` fails from inside apps/web: it walks up to the workspace root and finds no lockfile there.

Adding or upgrading a package: `npm install <pkg> --prefix apps/web`, then commit the lockfile change with the code. On a merge conflict in the lockfile, do not hand-edit — delete it, re-run the install, commit the regenerated file.

apps/api on Railway has no lockfile yet and carries the same drift risk.

---

## CRITICAL: JSX String Rules

Never use straight apostrophes inside single-quoted JS strings. This caused a multi-hour build failure.

```js
// WRONG — syntax error, string ends at "don'"
desc: 'You don't need to be home.'

// CORRECT — use double quotes when string contains apostrophes
desc: "You don't need to be home."
```

Always use double-quoted strings for any string that contains contractions or apostrophes.

---

## Adding a New Page — Checklist

A page has to be registered in **eight** places. Miss one and the failure is usually
silent: the page works when you click it locally and is broken for crawlers.

**Always:**

1. Create the component — `apps/web/src/pages/YourPage.jsx`, or
   `apps/web/src/pages/blog/YourPost.jsx` for a blog post. Copy the imports from a
   sibling file rather than writing them from memory.
2. `apps/web/src/App.jsx` — lazy import **and** `<Route>`. Two separate edits.
3. `apps/web/tools/route-manifest.cjs` — add the slug to `PAGES`, `SERVICE_AREAS`, or
   `BLOG_POSTS`. This is the source of truth: `generate-sitemap.cjs` and
   `verify-routes.cjs` both read it, so the sitemap follows automatically.
4. `middleware.js` (repo root) — same list, same slug. **The one that gets missed.**
   The middleware 404s anything outside its allowlist, so without this the React route
   works in a browser while the edge serves Googlebot a 404. Invisible locally.
5. `apps/web/tools/inject-seo.cjs` — `routes` object, `['<title>', '<meta description>']`.
   Skip it and the page inherits the homepage title tag.
6. `apps/web/tools/create-static-pages.cjs` — the crawlable prerendered body. This is a
   React SPA with no SSR, so without it a crawler sees an empty shell.
7. `apps/web/tools/generate-llms.js` — `PAGES`, so AI crawlers can find it. This is the
   GEO surface; it is what ChatGPT and Perplexity read.
8. `apps/web/src/utils/sitemapGenerator.js` — `liveBlogSlugs`, for blog posts. Powers the
   runtime `/sitemap.xml` route in `SitemapXML.jsx`, which is separate from the generated
   file in step 3. Both need the slug.

**When it applies:**

- `apps/web/src/components/Header.jsx` — nav link, for top-level pages.
- `apps/web/src/pages/BlogListPage.jsx` — `allPosts`, for blog posts, or the post exists
  but nothing links to it.
- `apps/web/src/config/seoMetadata.js` — only for pages using `<SEOHead path="..." />`.
  Pages that set their own `<Helmet>` (most blog posts) do not need it.
- Richer SEO for a commercial page: `inject-seo.cjs` also has an `SC` object (crawlable
  content block) and a `SCHEMA` object (JSON-LD). Attach `aggregateRating` to nothing but
  the canonical business node — reference it as
  `"provider":{"@id":"https://www.scoopychatt.com/#business"}` rather than inlining a copy,
  or Search Console flags duplicate ratings.

**Then verify — do not skip this:**

```
npm install --prefix apps/web && npm run build --prefix apps/web \
  && node apps/web/tools/inject-seo.cjs \
  && node apps/web/tools/generate-sitemap.cjs \
  && node apps/web/tools/create-static-pages.cjs \
  && node apps/web/tools/verify-routes.cjs
```

`verify-routes.cjs` cross-checks the manifest against App.jsx and middleware.js and
catches steps 2, 3 and 4 — it exits non-zero and names the offending URL. It cannot see
steps 5 through 8, so check those by hand: after the build, confirm
`dist/apps/web/<slug>/index.html` exists and carries the right `<title>` and canonical.

There is no `apps/web/public/sitemap.xml`. The sitemap is generated into `dist` by
`generate-sitemap.cjs` from the route manifest; editing a static file would do nothing.

---

## SEO Architecture

React SPA with no SSR. Per-page SEO via two layers:
1. Build-time: inject-seo.cjs post-build script creates /route/index.html per route with correct title + meta tags
2. Runtime: react-helmet-async updates tags for navigation within the app

inject-seo.cjs must be updated every time a new page is added, or that page gets the homepage title tag.

GA cities (must NOT say TN): ringgold, rossville, flintstone, fort-oglethorpe

---

## Known Issues & Status

### Build
- Root cause of all build failures: HowItWorksPage.jsx had apostrophes inside single-quoted JS strings — FIXED at commit 64888dc
- nodeVersion is NOT a valid vercel.json property — causes immediate schema validation failure. Set Node version in Vercel dashboard (currently 24.x).
- Build takes 17-20 seconds when healthy. If build fails in under 12 seconds, it is a syntax error or config issue, not a code logic problem.

### SEO (Active problems)
- Soft 404s / apex-vs-www fragmentation — FIXED at commit 8d5be3f / cfe6603 / d1006e6 (Aug 26, 2026) via `middleware.js` (repo root): Edge Middleware that runs before any vercel.json routing, returns a real HTTP 404 for any path not on its `known` allowlist (PAGES/BLOG_POSTS/SERVICE_AREAS + legacy .php/.html/.aspx-style paths) instead of letting the SPA catch-all serve 200 for everything, and force-redirects apex `scoopychatt.com` → `www.scoopychatt.com` plus http→https on every request. Do not re-add a separate www/apex redirect or wildcard-junk-path handling in vercel.json — middleware.js already runs first and anything added there would be dead code (learned this the hard way — see commit 3e86ab7). Deployed and live; Search Console's count lags the fix since Google has to re-crawl before it drops. As of Aug 29 2026: Soft 404 at 105,906, "Crawled – currently not indexed" at 73,622, "Blocked by robots.txt" at 99,017, "Not found (404)" at 528,894 — down from ~109,860 pre-fix on the soft-404 count specifically, "Validation: Started" on the recrawl. Give it several more weeks before assuming the middleware isn't matching correctly.
- /dp/ and other spam URL floods (`/dp/*` Amazon-style junk, `/shop/*`, `/products/*`, `/contents/*` fake ASP.NET-storefront junk, e.g. `storeSearch/KeepCriteriaInput.aspx`) — bot/scraper traffic hitting the domain with fake product-page URLs, not a real site-structure problem, and not something a sitemap or internal link is generating (Search Console shows no referring sitemap or page for these). `/dp/*` gets a dedicated 410 Gone via `api/dp-gone.js` (rewrite in vercel.json); everything else not on middleware.js's allowlist gets a generic 404 from middleware itself, which is sufficient — don't add per-pattern handling for new junk prefixes you spot in Search Console, they're already covered. Search Console removals submitted manually by Brandon as needed.
- Ringgold TN bug — fixed in inject-seo.cjs (GA state set correctly for Georgia cities)

### Chatbot
- Uses gemini-2.5-flash (1.5 and 2.0 unavailable for this API key)
- Lead capture simplified: no PocketBase, just sets isLeadCaptured=true
- SSE format: {type:'content', data:{content:'...'}}

### Email
- SMTP blocked by Railway — uses Resend HTTP API instead
- Sending from info@scoopychatt.com (verify domain in Resend dashboard if failing)

---

## Service Area Pages

Dynamic route: /service/:slug via LocationTemplate.jsx → src/data/locations.js

Active slugs: chattanooga, hixson, red-bank, signal-mountain, ooltewah, east-brainerd, soddy-daisy, apison, collegedale, highland-park, downtown, east-ridge, lookout-mountain, st-elmo, north-chattanooga, southside, lookout-valley, riverview, normal-park, brainerd, ringgold (GA), rossville (GA), flintstone (GA), fort-oglethorpe (GA)

Cleveland TN is NOT a service area. It was removed in Aug 2026 and /service/cleveland 301s to /service-areas. Do not re-add it to city lists or schema.

---

## How It Works Page

Located at /how-it-works. Key differentiators to always emphasize:
- 100% online: quote and pay online, no phone calls
- On-the-way text before every visit
- Gate photo sent when done (gate secured + photo to phone)
- No contracts, cancel anytime

---

## SEO TODO (Priority Order)

1. ~~Fix 109K soft 404s~~ — DONE, see Known Issues above. Monitor Search Console for the count to drop over the following weeks; don't rebuild this unless it's still ~109K after a real re-crawl window.
2. Build commercial pages: HOA pet waste, apartment dog park, pet waste station
3. More local-intent blog posts
4. Verify Resend domain at resend.com/domains
5. Update Google Business Profile URL to www.scoopychatt.com
6. After every deploy: Search Console URL Inspection → Request Indexing for key pages
