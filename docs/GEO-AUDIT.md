# GEO / SEO Audit — Scoopy Doo LLC

Audited 2026-10-04 against a local build (`bash scripts/build.sh`). The live site was not
reachable from the audit environment, so every "what crawlers see" statement below is from
the built `dist/` output, which is what Vercel serves.

## 1. What was wrong

The site was already strong. Findings, most important first:

- **No founding date anywhere.** `foundingDate` was missing from the business JSON-LD and the
  About page never said "founded 2025". Founding facts are what retrieval engines quote.
- **No quotable "company facts" block.** Facts (founders, base, client count, reviews, BBB,
  aPaws, insurance) were spread across prose paragraphs.
- **About-page copy contradicted the rest of the site:**
  - "We haul all waste off your property entirely" — pricing says waste goes in your bin by
    default and takeaway is $5/visit.
  - "Hundreds of Chattanooga families" — the verified figure is 150+ active clients.
  - "We live in the Chattanooga area" — the owners are based in Ringgold, GA.
- **No selection-research page.** Nothing answered "how do I choose a pet waste removal
  company", which is the query shape recommendation engines are asked.
- **`/comparison` had no structured data** for its provider table.
- **No `WebSite` node** in the JSON-LD.
- Older fix, already done before this audit: city pages gave crawlers about 225 words
  (now 500–630, PR #8).

## 2. What was changed

| Change | Where |
|---|---|
| `legalName` + `foundingDate: "2025"` on the business node; new `WebSite` node (`#website`, publisher = `#business`) | `apps/web/index.html` |
| "Scoopy Doo LLC at a Glance" facts block (visible + crawler HTML) | `AboutPage.jsx`, `inject-seo.cjs` (`/about`) |
| Fixed the three contradictory About lines above | `AboutPage.jsx`, `inject-seo.cjs` |
| New guide: `/guides/how-to-choose-pet-waste-removal-company-chattanooga` (9 criteria, how Scoopy Doo answers each, 4 FAQs; Article + Breadcrumb + FAQPage schema) | `ChooseGuidePage.jsx`, `data/chooseGuide.js`, `create-static-pages.cjs` |
| Guide registered in all required places | `App.jsx`, `route-manifest.cjs`, `middleware.js`, `seo-page-manifest.cjs` (feeds `inject-seo` and `llms.txt`) |
| Internal links to the guide from About and Comparison | `AboutPage.jsx`, `ComparisonPage.jsx` |
| `/comparison`: WebPage + ItemList (7 providers) + BreadcrumbList | `create-static-pages.cjs` |
| `llms.txt` summary now states founding year, Ringgold base, 150+ clients, 99 reviews, insured | `generate-llms.js` |
| Comparison CTA now links `/quote` directly (was a redirecting `/quoterequest`) | `ComparisonPage.jsx` |

The guide's content lives in one data file (`data/chooseGuide.js`) that both the React page and
the crawler HTML read, so they cannot drift.

## 3. Structured-data architecture

All entity facts hang off one node, `https://www.scoopychatt.com/#business`
(`LocalBusiness` + `ProfessionalService`) in `apps/web/index.html`. It carries name,
legalName, foundingDate, founders, telephone, areaServed (24 places), sameAs (11 profiles),
memberOf (aPaws), subjectOf (3 news items) and offer catalog. Other pages point at it by
`@id` (`provider`, `author`, `publisher`, comparison `ItemList`) instead of re-declaring it.
`WebSite` (`#website`) publishes from `#business`. Per-page schema: Service + Breadcrumb +
FAQPage on city pages, FAQPage on `/faq`/`/pricing`, Article on the guide, WebPage/ItemList on
`/comparison`, NewsArticle on `/press`.

Deliberately **not** restructured into one `@graph` or a separate `Organization` node: a second
entity node for the same company would split the signal, and `#business` is already referenced
across the site.

**Review markup:** `aggregateRating` (5.0 / 99) sits on the business node only. Google does not
show rich results for self-served reviews on LocalBusiness, so this will not earn stars, but it
is harmless and retrieval engines read it. If you want zero guideline risk, delete it; nothing
else depends on it.

## 4. Entity strategy

- One name everywhere: **Scoopy Doo LLC**. One phone: **+1-423-600-5040**. One host:
  `https://www.scoopychatt.com` (apex and http redirect to it in `middleware.js`).
- Facts stated identically on the homepage, About, `/press`, schema and `llms.txt`:
  founded 2025; Brandon and Leighton Carter; based in Ringgold, GA, serving the Chattanooga
  metro; 150+ active clients; 99 five-star Google reviews; BBB accredited; fully insured; aPaws
  member; no contracts.
- No street address is published. The schema `address` is Ringgold / GA / 30736 only (city,
  region, ZIP — no street), with Ringgold coordinates. See section 8 if you want that removed.
- The defunct "Scoopy Doo, Inc." and its phone number appear nowhere in the repo. The distinction
  is made by always using "LLC", the 423-600-5040 number, and the `foundingDate`.
- Not done: a separate central "entity.js" refactor. Facts are consistent today; rewiring
  every page to read from one file is a large change with real breakage risk for little gain.
  New content (the guide) uses a data file; the schema node is the de facto source of truth.

## 5. Location strategy

Kept the existing `/service/<slug>` URLs (24 pages, each with its own service description,
local context, neighborhoods, benefits and four FAQs from `data/locations.js`). Did **not**
create `/locations/<city>-tn/` duplicates — that would be doorway-style duplication and would
throw away URLs with indexing history. Dalton is not a service area anywhere; it only appears in
`/comparison` as a competitor's stated coverage.

## 6. Crawlability

- `robots.txt`: `User-agent: *` / `Allow: /`, disallows only the OAuth callbacks and
  `/thank-you`, references the sitemap. No AI crawler is blocked. **No crawler-specific rules
  were added**: current official crawler names could not be verified from this environment, and
  guessing them is worse than the open default. Re-check each vendor's docs before adding any.
- Sitemap: generated from `route-manifest.cjs` (96 URLs); the guide is included; `verify-routes`
  reports all consistent. `/spring-special` is intentionally noindexed and excluded.
- Every built page has exactly one self-canonical and valid JSON-LD; no duplicate titles or H1s
  across the 97 built pages (checked by script).
- Page bodies are in the initial HTML for every indexable route (build-time injection).
  One gap: `/blog/fall-leaves-hide-dog-poop-chattanooga` has no crawler-visible H1/body block.
- Jobber: no public Jobber mini-site is linked anywhere in the repo. The only Jobber references
  are the Zapier lead webhook in `QuoteForm.jsx` and `DoggyDoorsBookingPage.jsx`, which are
  functional and were left alone.

## 7. Intentionally not changed

- Homepage copy, titles and meta (already ranking; the homepage already states what/who/where/
  trust in its first block).
- "Largest pet waste removal company in Chattanooga" on `/about` and `/press`. It is an
  unverified superlative from the Chattanoogan headline. Keep it only where it quotes the
  article; consider removing it from your own claims unless you can substantiate it.
- Opening hours in the schema (Mo-Fr 07:00-20:00, Sa-Su 09:00-21:00) — confirm they are right.
- The six unverified blog testimonials (see CLAUDE.md).
- Pre-existing lint errors (5, in `Footer.jsx`, `CoreServicePage.jsx`, `PressPage.jsx`:
  `target="_blank"` without `noreferrer`). Identical before and after this work.

## 8. Remaining tasks only Brandon can do

1. **6AM City / NOOGAtoday**: send the article URL and publish date. It is not on the site, so I
   could not add it to `/press` without inventing details.
2. **Google Business Profile**: keep it a service-area business with the address hidden; remove
   Cleveland; add East Brainerd, East Ridge, Rossville, Fort Oglethorpe, Flintstone.
3. **Decide on the schema ZIP/coordinates**: if you do not want a Ringgold ZIP and coordinates in
   public markup, tell me and I will remove `postalCode` and `geo`.
4. **Bing Webmaster Tools**: verify the site, submit `sitemap.xml`, and use IndexNow. Several AI
   assistants retrieve through Bing or other third-party indexes; confirm which ones your target
   assistants use.
5. **Google Search Console**: Request Indexing for `/guides/how-to-choose-pet-waste-removal-company-chattanooga`,
   `/about`, `/comparison`, `/service/chattanooga`.
6. **Jobber**: in Jobber, unpublish the old public website (or set it to redirect/noindex) and
   check no Jobber page ranks for "Scoopy Doo". Redirects and canonicals for a Jobber-hosted
   site cannot be set from this repository.
7. Confirm the "Scoopy Doo, Inc." listings (old Yelp/Facebook/Google/aggregator entries at the
   closed business) are marked closed or claimed, so they stop competing with you.

## 9. Third-party citation cleanup

Make name, phone and URL identical (Scoopy Doo LLC / 423-600-5040 / scoopychatt.com) on: Google
Business Profile, Yelp (merge the Chattanooga and Ringgold listings), BBB, Facebook, Instagram,
TikTok, Nextdoor, Petworks, PoopPages, aPaws directory, Apple Business Connect, Bing Places,
Better Business Bureau, Chamber of Commerce. Remove or mark closed any listing for the old
company and its phone number.

## 10. Review and distribution strategy

Reviews are not what limits ranking (99 at 5.0). Keep a steady trickle of recent reviews that
mention the neighborhood and the service (not keywords), and reply to each. Ask satisfied HOA
and apartment contacts for a Google review naming the property type. Mirror the best reviews on
Yelp and Facebook, since AI engines cross-check platforms.

## 11. Media and backlink strategy

Pitch the father-daughter story (already covered by WDEF, the Chattanoogan, 6AM City) to Chattanooga
Times Free Press, Chattanooga Chamber, Chattanooga Pets/Humane Educational Society newsletters,
local HOA associations, and aPaws's own member news. Each earned link from a local publication is
worth more to retrieval engines than any on-site change.

## 12. AI query benchmark plan

Run monthly, in a fresh session with search enabled, in ChatGPT, Claude, Gemini and Perplexity.
Record: is Scoopy Doo named, in what position, which sources are cited, and which competitors
appear. Keep the log in a spreadsheet.

1. Find me the best pooper scooper in the Chattanooga area.
2. What is the best pet waste removal company in Chattanooga?
3. Recommend a dog poop removal service in Chattanooga.
4. Who has the best reviews for pet waste removal in Chattanooga?
5. What pooper scooper services operate in Chattanooga?
6. I live in Ooltewah. Who can clean dog poop from my yard?
7. Who provides pet waste removal in Hixson?
8. What company handles dog waste for Chattanooga apartment complexes?
9. Who installs and services pet waste stations in Chattanooga?
10. Compare pet waste removal companies in Chattanooga.

When a prompt fails, look at which URLs the engine cited instead and close that specific gap
(a missing listing, a missing fact, an uncited page).
