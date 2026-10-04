# SEO / GEO / AEO completion report — scoopychatt.com

Date: October 4, 2026. Production commits: `fff6f49` (PR #14) and `7298e76` (PR #15), both deployed to
production and READY on Vercel (`dpl_J5beGH84aEE2S7gT99knsntkuhYB`, `dpl_7RZ5BwuwSDB64s9BNHnTBUeTqpMQ`).

**How to read this.** Three lists: *Completed and verified*, *Still needed (dependency named)*, and
*Unverified*. Nothing in the second or third list is marked done.

## Access limits that shaped the work

- The two audit reports at `/Users/extremerides/Desktop/Scoopy Doo/...` are on your Mac and were not reachable from the
  cloud session. Drive held only an older May 2026 audit (score 23/100, superseded). The findings were taken from the audit
  text you pasted earlier in this session, which I checked against the repo item by item.
- The cloud sandbox cannot open scoopychatt.com, competitor sites, Google, or Bing. Production was checked through the
  Vercel fetch tool (reads the live site) and through a post-deploy GitHub Action that drives a real browser against production.
- No Search Console, Google Business Profile, analytics, or Bing account access.

## 1. Completed and verified

| # | Item | What changed | Evidence |
|---|---|---|---|
| 1a | `/comparison` disposal terms | Bin by default, haul-away $5/visit, one-time includes it. Same wording fixed in `ServicesPage`, the summer-heat post and two crawler blocks. | Production raw HTML of `/comparison` fetched; contains "haul-away is $5 per visit, and one-time cleanups include it". No "hauled fully off" claim remains (checked raw + rendered locally). |
| 1b | "Only provider serving both TN and North Georgia" | Claim removed. | Absent from production `/comparison` raw HTML. |
| 1c | Publisher disclosure | Visible and in raw HTML: published by Scoopy Doo LLC, one of the companies listed; how to report a correction. | Production raw HTML. |
| 1d | Sources in initial HTML and rendered page | Every provider has a link to its own site; Scoopy Doo's sources: pricing page, Google Business Profile, aPaws listing. Status text beside each row. One data file (`comparisonData.js`) feeds both. | Production raw HTML shows all 7 provider links; local browser check confirmed identical text in raw and rendered. |
| 1e | Scoopy Doo's own facts verified | Pricing checked against `/pricing`; 99 Google reviews and hours checked against your GBP screenshot (Oct 4). aPaws result dated August 2026. | Dated "October 4, 2026" on the page. |
| 1f | Review counts | Competitor review counts removed (they go stale). Scoopy Doo's 99 kept, dated. | Production raw HTML. |
| 2 | `/service/hixson` | Harrison, Wolftever Creek, Town Creek and Shallowford Road moved out of the neighborhood list into "Nearby Areas We Also Serve". Neighborhoods now: Middle Valley, Thrasher Pike area, Curtain Pole Road area, Hixson Pike corridor, Highway 153 corridor. | Production raw HTML. See "Still needed" for the geography caveat. |
| 3 | Titles | Raw HTML and browser-rendered titles disagreed on **49 of 96 pages** (descriptions on a similar number). Added `scripts/meta-check.cjs` and `rendered-meta.json`; the build now writes the rendered title/description into the raw HTML. Shortened the 10 rendered titles most likely to truncate (e.g. 99 → 67 characters). Neighborhood-page titles now end "\| Scoopy Doo" instead of "\| Scoopy Doo Pet Waste Removal". No blind character cap: 26 titles of 61–71 characters were left alone. | Local real-browser check: **96 of 96 routes, 0 raw-vs-rendered differences, 0 duplicate tags**. Production re-check: see section 4. |
| 3b | Bug found by that check | `/blog/podcast-blog` rendered canonical `/blog/undefined`. Fixed. | Local check passes on that route. |
| 4 | Service pages | `/commercial`, `/near-me`, `/one-time-cleanup`, `/doggy-doors` each gained a Q&A block answering open customer questions, using only facts already on the site (`serviceFaqs.js`). No case study, testimonial or result was invented. | Production raw HTML of `/commercial` and `/near-me` fetched and contains the new blocks; local check confirmed all four in raw and rendered. |
| 5 | Business facts and hours | Footer, homepage schema and generated schema all say Mon–Fri 7am–8pm, Sat–Sun 9am–9pm; GBP shows the same plus "Online service hours: Open 24 hours". Phone 423-600-5040, Ringgold base, founders, LLC name consistent. Old Inc. phone/address: 0 hits. Dalton as a service area: 0 hits (appears only as a competitor's coverage). | Repo grep; production schema read from fetched HTML; user confirmed footer live earlier. |
| 6a | Crawl links | Every prerendered page has the site-wide nav and area links (was zero on key pages). | Production raw HTML: nav + 24 area links present. |
| 6b | Sitemap | 96 URLs, all with `www` canonical host, guide included, no redirects or noindex pages. | Production `sitemap.xml` fetched. |
| 6c | Guardrails added | `verify-meta.yml` runs the raw-vs-rendered browser check against production after each website deploy. IndexNow also runs after each website deploy. | Workflow files in repo. |

## 2. Still needed

| Item | Why it is open | Exact dependency |
|---|---|---|
| Competitor price/coverage verification | Competitor sites could not be opened. The page now says their details were recorded earlier in 2026 and were **not** re-checked Oct 4. Fields are kept in `comparisonData.js`. | A browser session that can open the 6 competitor sites; update each row's fields and set `checked`. |
| Hixson geography | No map access. Town Creek and Shallowford Road could not be placed, so they are labelled "nearby", which is accurate either way. | Your confirmation of which of those four areas are Hixson. |
| Commercial case study | No approved evidence. The one existing quote (Populus Waterside) was left as is. | Written permission and real figures from a client. |
| Hours/online-booking policy | Matches your GBP, but I cannot confirm it is your policy. | Your yes/no. |
| Search Console: manual actions, indexing, sitemap coverage, query-to-page overlap | No account access. Gmail showed no Search Console or manual-action emails in the last 120 days (weak evidence only). | Search Console access or an export of Pages, Manual actions, Links and Performance. |
| Suspicious backlinks (307 of 323 anchors) | No access to the link data; provenance is unknown. **No disavow was prepared or recommended.** | The link export, plus whether any SEO vendor was ever paid. |
| GBP and other listings (Yelp, Nextdoor, Petworks, BBB, Facebook, Apple/Bing Places) | Only the GBP hours screenshot was available. | Listing exports or access. |
| Core Web Vitals | No field or lab measurements available from the sandbox. | Search Console CWV report or PageSpeed/CrUX output. |
| AI visibility baseline | No existing prompt log (Drive and Gmail had none). Nothing was fabricated. | Run the 10 prompts in `docs/GEO-AUDIT.md`; record platform, date, mentions, citations. |
| Bing "Blocked" on `/comparison` and `/service/hixson` | Bing-side; re-check about a week after IndexNow submission. | Bing Webmaster Tools. |

## 3. Unverified (do not rely on)

- Competitor facts on `/comparison` (see above).
- Hixson "nearby" labels beyond what is stated.
- Full-sitemap production crawl of internal links: done on the local build (0 broken among 97 pages) but not on every production URL; production spot-checks only.
- Quote flow in production: not exercised (no fake submissions). Locally the form renders all fields and the submit button is gated; nothing was sent.
- Footer hours in the production JavaScript bundle (the footer is rendered by React); confirmed live by you earlier and in the local build.

## 4. Production verification detail

Production URLs fetched and read: `/comparison`, `/service/hixson`, `/commercial`, `/near-me`, `/sitemap.xml`
(all HTTP 200, no-cache or revalidate headers, served by Vercel at `www.scoopychatt.com`).

**Production browser check (raw HTML vs rendered page, all 96 sitemap URLs).** The first post-deploy run did not finish:
it waited on third-party widgets (chat, reviews, pixels) on every page. The script now loads only the site's own origin
and times out per page (fix in the PR that adds this report). The same check passes on the local build of this exact code:
**96 of 96 routes, 0 differences in title, description or canonical, 0 duplicate head tags.** A manual re-run against
production is pending; its result is recorded in the "Update" line below. Until then, production-wide raw-vs-rendered
agreement is **unverified**, though the five pages read from production above matched their local builds.

Update: (pending)


## 5. Files changed (PR #14 and #15)

`apps/web/src/data/comparisonData.js`, `serviceFaqs.js`, `locations.js`; `components/ServiceFaqSection.jsx`,
`LocationTemplate.jsx`; pages `ComparisonPage`, `CommercialPage`, `NearMePage`, `OneTimeCleanupPage`, `DoggyDoorsPage`,
`PressPage`, `ServicesPage`, and 9 blog posts (titles, disposal wording, canonical); `apps/web/tools/inject-seo.cjs`,
`create-static-pages.cjs`, `service-faqs.cjs`, `seo-page-manifest.cjs`, `rendered-meta.json`; `scripts/meta-check.cjs`;
`.github/workflows/verify-meta.yml` (also adds a 20-minute timeout and origin-only loading).
