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
- **Build command in vercel.json:** `bash scripts/build.sh` — the real chain (npm install, vite build, then the five SEO tools in order) lives in `scripts/build.sh`. It is NOT inline in vercel.json, because **`buildCommand` has a hard 256-character limit** — see Known Issues. Add new build steps to `scripts/build.sh`, never to vercel.json.
- **Output dir:** `dist/apps/web`
- **Path alias:** `@` = `apps/web/src/`

### Backend API — Express.js
- **Host:** Railway — project **`precious-surprise`**, service **`ScoopyChatt`**, live at
  `scoopychatt-production.up.railway.app`. Verified Sept 19, 2026.
  **A second Railway project named `dynamic-ambition` also contains a service called
  `ScoopyChatt`. It is crashed, has zero environment variables, and is NOT the live
  site** — an earlier version of this file named it as the API host, which sent a
  debugging session to the wrong place. Do not deploy to it or read config from it.
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
bash scripts/build.sh
```

That is the same chain Vercel runs, so if it passes locally the deploy should build.

`verify-routes.cjs` cross-checks the manifest against App.jsx and middleware.js and
catches steps 2, 3 and 4, in **both** directions — a page in the sitemap with no route,
and a routed page missing from the sitemap. **It is warn-only: it prints problems and
still exits 0**, deliberately, so a stale list never blocks an otherwise-fine deploy.
That means nothing fails the build — you have to actually read the output. A deliberate
sitemap omission goes in its `SITEMAP_EXCLUDED` list, which is also the list of every
route that is intentionally unindexed.

It cannot see steps 5 through 8, so check those by hand: after the build, confirm
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
- **`buildCommand` in vercel.json is capped at 256 characters.** Going over fails schema validation *instantly* — the deploy dies before any build runs, with `The vercel.json schema validation failed with the following message: buildCommand should NOT be longer than 256 characters`. This is silent in the worst way: `git push` succeeds, the local build passes, and GitHub looks healthy, so the site just quietly keeps serving the last good deploy. Four commits shipped to main this way in Sept 2026 (d135330 → cee82ad) and none reached production; an external audit read the stale site and reported the work as "not fixed." Fixed (Sept 19, 2026) by moving the chain into `scripts/build.sh`. Add build steps there, not to vercel.json. **After any deploy, confirm the deployment actually reached `READY` — a green push is not a green deploy.**
- Build takes 17-20 seconds when healthy. If build fails in under 12 seconds, it is a syntax error or config issue, not a code logic problem.

### SEO (Active problems)
- Soft 404s / apex-vs-www fragmentation — FIXED at commit 8d5be3f / cfe6603 / d1006e6 (Aug 26, 2026) via `middleware.js` (repo root): Edge Middleware that runs before any vercel.json routing, returns a real HTTP 404 for any path not on its `known` allowlist (PAGES/BLOG_POSTS/SERVICE_AREAS + legacy .php/.html/.aspx-style paths) instead of letting the SPA catch-all serve 200 for everything, and force-redirects apex `scoopychatt.com` → `www.scoopychatt.com` plus http→https on every request. Do not re-add a separate www/apex redirect or wildcard-junk-path handling in vercel.json — middleware.js already runs first and anything added there would be dead code (learned this the hard way — see commit 3e86ab7). Deployed and live; Search Console's count lags the fix since Google has to re-crawl before it drops. As of Aug 29 2026: Soft 404 at 105,906, "Crawled – currently not indexed" at 73,622, "Blocked by robots.txt" at 99,017, "Not found (404)" at 528,894 — down from ~109,860 pre-fix on the soft-404 count specifically, "Validation: Started" on the recrawl.

**VERIFIED WORKING Sept 19, 2026 — stop re-investigating this.** Soft 404 had moved
only 105,906 → 105,903 in three weeks, which looks like a broken fix. It is not.
Two checks settled it: (1) every junk pattern from Search Console was run through
`middleware.js` locally (`/shop/*`, `/products/*`, `/contents/*`, `*.aspx`, `*.php`,
`*.html`, `/wp-admin/`, unknown `/service/*` and `/blog/*` slugs) and all returned
404, while real pages, static assets, legacy redirect sources and apex→www
canonicalization all behaved correctly; (2) loading a junk URL on the live site
returns the middleware's own 404 page — bare, no site header, two green buttons —
rather than the SPA's `NotFoundPage`, which renders `<Header />`. **That visual
difference is the fastest way to re-confirm it: site nav present = middleware not
running; no nav = running.**

`robots.txt` was also checked and is not impeding the drain — it disallows only
`/reddit-oauth-callback`, `/qb-oauth-callback` and `/thank-you`. The 99K "Blocked by
robots.txt" entries are leftovers from the old Hostinger site's rules and will
recrawl into 404s like the rest.

So the count is purely a re-crawl timing problem. Google knows ~730K URLs on this
domain and deprioritizes known junk, so the long tail drains over months. The only
legitimate accelerator is re-running "Validate Fix" on the Soft 404 issue in Search
Console. Worth keeping in perspective: the real pages are indexed and ranking
position 1.0–2.4 for brand terms, so this backlog is cosmetic, not a blocker.
- /dp/ and other spam URL floods (`/dp/*` Amazon-style junk, `/shop/*`, `/products/*`, `/contents/*` fake ASP.NET-storefront junk, e.g. `storeSearch/KeepCriteriaInput.aspx`) — bot/scraper traffic hitting the domain with fake product-page URLs, not a real site-structure problem, and not something a sitemap or internal link is generating (Search Console shows no referring sitemap or page for these). `/dp/*` gets a dedicated 410 Gone via `api/dp-gone.js` (rewrite in vercel.json); everything else not on middleware.js's allowlist gets a generic 404 from middleware itself, which is sufficient — don't add per-pattern handling for new junk prefixes you spot in Search Console, they're already covered. Search Console removals submitted manually by Brandon as needed.
- Ringgold TN bug — fixed in inject-seo.cjs (GA state set correctly for Georgia cities)

### Chatbot
- Uses gemini-2.5-flash (1.5 and 2.0 unavailable for this API key)
- Lead capture simplified: no PocketBase, just sets isLeadCaptured=true
- SSE format: {type:'content', data:{content:'...'}}

### Email
- SMTP blocked by Railway — uses Resend HTTP API instead
- **Current live config (checked Sept 19, 2026), and it is fragile:**
  - `RESEND_FROM` = `Scoopy Doo <onboarding@resend.dev>` — Resend's **sandbox** sender,
    not an @scoopychatt.com address.
  - `BUSINESS_EMAIL` = `brandonwesleycarter@gmail.com`.
  - Resend's sandbox sender can only deliver to the Resend **account owner's own
    address**. Leads currently arrive because BUSINESS_EMAIL happens to be that
    address. Every email the API sends goes to BUSINESS_EMAIL — there are no
    customer-facing emails — so nothing is silently bouncing today.
- **Order matters when fixing this. Changing BUSINESS_EMAIL first will break lead
  delivery**, because the sandbox sender cannot deliver to info@scoopychatt.com.
  Correct sequence: (1) verify the `scoopychatt.com` domain in Resend (DNS records),
  (2) set `RESEND_FROM` to an address at that domain, (3) only then change
  `BUSINESS_EMAIL`, (4) send a test through each endpoint.
- **Fix before verifying the domain:** `apps/api/src/routes/chat-summary.js` takes
  `businessOwnerEmail` from the request body and sends to it. While the sandbox
  sender is in use that fails harmlessly, but once the domain is verified it becomes
  an open relay — anyone could POST arbitrary recipients. Drop that parameter and
  always use BUSINESS_EMAIL.

---

## Local SEO / Google Business Profile

Audited Sept 21, 2026. **The website is not the constraint on local visibility — the
GBP is.** Search Console (3 months) shows the homepage at 1,760 impressions and the
four keyword pages at 33 impressions with zero clicks combined, while
"dog poop removal near me" sits at average position 1.5 with **10 impressions in
three months**. Google barely shows the site for the commercial queries, which is a
map-pack problem, not an on-page one.

Map pack, searched from the Chattanooga metro:

| Query | Result |
|---|---|
| "dog poop removal near me" | #2 of 3 — PooTagic (49 reviews), **Scoopy Doo (98)**, The Poo Whisperer (11) |
| "pooper scooper chattanooga" | **Not in the pack — 9th.** PooTagic (49), Doggie Doos (3), Captain Scoop A Poop (0) |

**Reviews are not the limiting factor.** 98 five-star reviews loses to a competitor
with zero. Do not spend effort chasing more reviews to fix map-pack placement.

Most likely cause is category relevance: **primary category is "Waste management
service" — an industrial/commercial-waste category — and the secondary category slot
is empty.** Check what PooTagic uses (they rank #1 for both queries) and match it.
Distance is the other factor and is harder to move: the profile is based in Ringgold
GA while competitors sit inside Chattanooga.

**Never put keywords in the business name to chase this.** Competitors rank partly on
"Scoop"/"Poo" in their names, and Google does weight that, but renaming violates GBP
guidelines and risks suspension of a listing carrying 98 reviews.

### GBP service area vs the site — these disagree

GBP lists 18 cities. Differences that matter:

- **Cleveland is on the GBP but is NOT a service area** (see below — `/service/cleveland`
  301s to `/service-areas`). Remove it, or you are advertising work you have to decline.
- **On the site with full pages, missing from GBP:** East Brainerd, East Ridge,
  Rossville, Fort Oglethorpe, Flintstone.
- **On GBP with no presence on the site:** Dalton, Dunlap, Tunnel Hill, Graysville,
  McDonald, Harrison, Northshore.

Other profile state as of the audit: 98 reviews / 5.0, ~60 photos (latest 24 days
old), Posts roughly weekly (latest 5 days old), Services filled out with correct
pricing. Those are all healthy and are not what needs work.

### Unverified testimonials

Six named testimonials appear across the blog posts — "The Garcia Family from
Cleveland, TN" (a city not served, and it says "Scoopy Chatt"), "Sarah M. from Signal
Mountain", "John D. from Hixson", "Emily R. from Ringgold", "Michelle T. from
Ooltewah", "Robert M. from Soddy". They read like template filler from the original
site build. **Nobody has confirmed whether these are real customers.** If they are
not, they are fabricated social proof on live commercial pages and should be replaced
with quotes from the 98 genuine Google reviews. Flagged, deliberately not removed —
only Brandon can say.

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

Reordered Sept 21, 2026 against real Search Console and map-pack data. The site's
technical SEO is in good shape (SEO score 100 on PageSpeed, pages indexed, schema
valid). **The ceiling is local visibility, not the website.**

1. **Fix the GBP category** — primary is "Waste management service" with an empty
   secondary slot, and the profile misses the map pack for "pooper scooper
   chattanooga" behind businesses with 0 and 3 reviews. See Local SEO above. Free,
   fast, highest leverage of anything on this list.
2. **Reconcile the GBP service area with the site** — drop Cleveland, add East
   Brainerd, East Ridge, Rossville, Fort Oglethorpe, Flintstone.
3. **Confirm whether the blog testimonials are real customers**, and replace them
   with real Google review quotes if not. See Local SEO above.
4. Verify the `scoopychatt.com` domain in Resend, then fix `RESEND_FROM` — and read
   the ordering warning under Email first, or lead delivery breaks.
5. Drop the request-body recipient in `chat-summary.js` before that domain is
   verified, or the endpoint becomes an open relay.
6. More local-intent blog posts.
7. After every deploy: Search Console URL Inspection → Request Indexing for key pages.

~~Fix 109K soft 404s~~ — DONE and verified working; it is a re-crawl timing problem
now, not a code problem. ~~Build commercial pages~~ — DONE: `/commercial` plus three
HOA/apartment/station posts already exist. ~~Update GBP URL to www~~ — DONE, the
profile already points at `https://www.scoopychatt.com/`.

**Do not spend effort on:** more reviews (98 at 5.0 already loses to a competitor
with zero — it is not the lever), consolidating the overlapping Chattanooga pages
(they earn 33 impressions and zero clicks, so there is nothing to gain or lose), or
migrating the SPA to prerendering (the 12.8s mobile LCP is Lighthouse's simulated
slow-4G estimate; the observed breakdown sums to ~2.5s, and CrUX has no field data
either way).
