# Content + SEO Plan — August 2026

Scope: bottom-of-funnel content for scoopychatt.com. Built entirely in this repo.
No reciprocal link exchanges, link pools, or third-party auto-publishing tools are
part of this plan.

Pricing referenced throughout comes from `apps/web/src/pages/PricingPage.jsx`:
weekly $20/visit (1st dog), twice-weekly $18/visit, every-other-week $33/visit,
one-time cleanup from $85, plus the add-on rates in section 5.

---

## 1. Competitor landscape (verified August 2026)

Competitor facts below were gathered from public search results in August 2026 and
cross-checked against the July 2026 data already in `create-static-pages.cjs`. The
egress proxy in this environment blocks direct fetches of competitor domains, so
these are search-result-level facts, not full-site crawls. Treat published prices as
"last seen" and re-verify before quoting them on a customer-facing page.

| Competitor | Type | Published pricing | Notable |
|---|---|---|---|
| PooTagic (pootagic.com) | Local, family-owned | Quote-based, flat monthly billing | Ranks above us for core local terms. "Poo-Fume" deodorizing/sanitizing add-on. Scoops rain or shine. Broad TN + North GA coverage. |
| ChattaPoo (chattapoo.com) | Local, Signal Mountain | Weekly $21/visit, EOW $28/visit, one-time $45 (first 20 min, +$10/10 min) | Sells and maintains pet waste bag stations; 10% discount on auto-billed monthly plan. |
| Call of Doody (callofdoodytn.com) | Local, family-owned | Weekly from $18, bi-weekly $25, monthly $45 | First service free. Haul-away $5/visit, yard deodorizing $15/visit. Serves Dalton, Tunnel Hill, Ringgold GA. |
| Scoop Smart (getscoopsmart.com) | Local | Not published | Broadest frequency menu: twice-weekly, weekly, bi-weekly, monthly. No contracts. |
| Doggie Doos of Chatt (doggiedoosofchatt.com) | Local | First-time cleanups ~$35–50 | Newer entrant, TN + North GA. |
| Doo Doo Blues / Cooper's Scoopers | National franchises | Doo Doo Blues from $9.99; Cooper's not published | Franchise operations, thinner local content. |

### What this tells us

1. **Almost nobody publishes real numbers.** Three of six competitors publish no
   pricing at all. Our per-visit rates in plain text are a durable advantage for
   both AI citation and price-comparison searches — keep leaning on it.
2. **Deodorizing is a published add-on for two competitors.** We offer it too — there
   is a section on `/services` — but it had no price and no blog content behind it.
   Now priced at $20/visit. That is above Call of Doody at $15/visit, so the pitch
   has to be the treatment and the transparency, not the number. Post A7 is the
   remaining gap.
3. **Waste stations are a real commercial differentiator** that ChattaPoo markets
   and we offer but barely write about. Fixed by post #2 below.
4. **Competitors bill flat monthly; we bill per visit.** Nobody has written the
   "per-visit vs flat monthly" explainer. That is a decision-stage keyword nobody owns.
5. **"First service free" is Call of Doody's and Doo Doo Blues' hook.** Our honest
   counter is no contracts plus a one-time cleanup you can stop after.

---

## 2. Content plan by pillar

Priority is a judgment call based on purchase intent, revenue per conversion, and
how thin the competing content is — not on search-volume estimates, which are not
verifiable from this environment. **P1** = build next, **P2** = this quarter,
**P3** = backlog.

### Pillar A — Weekly / bi-weekly residential (recurring revenue)

| # | Title | Target keyword | Priority |
|---|---|---|---|
| A1 | Weekly vs Every-Other-Week Dog Poop Service in Chattanooga: Which One Do You Actually Need? | weekly vs bi-weekly dog poop removal chattanooga | **P1 — DRAFTED** |
| A2 | Pooper Scooper Pricing for 2, 3, or 4 Dogs in Chattanooga: What Extra Dogs Actually Cost | pooper scooper price for 3 dogs chattanooga | P1 |
| A3 | Per-Visit vs Flat Monthly Billing for Pet Waste Removal: Which Costs Less? | pet waste removal monthly vs per visit pricing | P1 |
| A4 | Switching Pooper Scooper Services in Chattanooga: How to Change Without a Gap in Service | switching pet waste removal company chattanooga | P2 |
| A5 | Why the First Cleanup Costs More: Initial Cleanup Fees Explained | initial cleanup fee pooper scooper service | P2 |
| A6 | Do I Need to Be Home for Pooper Scooper Service? Gate Access, Dogs Outside, and Locked Fences | do I need to be home pooper scooper | P2 |
| A7 | How to Get Rid of Dog Poop Smell in a Chattanooga Yard (What Actually Works) | how to get rid of dog poop smell in yard | **P1 — DRAFTED** |
| A8 | Can I Pause Pet Waste Removal While I Travel? | pause pooper scooper service vacation | P3 |
| A9 | Weekly Dog Poop Removal in Hixson and Red Bank: Cost and Scheduling | weekly dog poop pickup hixson tn | P3 |
| A10 | Is a Pooper Scooper Service Worth It? A Straight Cost-vs-Time Answer | is pooper scooper service worth it | P3 |

### Pillar B — One-time cleanup (fast conversion, gateway to recurring)

| # | Title | Target keyword | Priority |
|---|---|---|---|
| B1 | One-Time Yard Cleanup Before a Party in Chattanooga or North Georgia: When to Book and What It Costs | one time yard cleanup before a party north georgia | **P1 — DRAFTED** |
| B2 | Move-Out Dog Waste Cleanup in Chattanooga: Protecting Your Rental Deposit | dog poop cleanup before move out rental chattanooga | P1 |
| B3 | Cleaning Up a Yard That Has Gone Six Months or More: What a Deep Cleanup Involves | neglected yard dog poop deep clean cost | P1 |
| B4 | One-Time Cleanup vs Starting Weekly Service: Which Is Cheaper for You? | one time vs weekly pooper scooper cost | P2 |
| B5 | Inherited a Messy Yard? Move-In Dog Waste Cleanup in Chattanooga | move in yard cleanup previous owner dog waste | P2 |
| B6 | Last-Minute Yard Cleanup: How Fast Can Someone Come Out in Chattanooga? | same week dog poop cleanup chattanooga | P2 |
| B7 | Spring Thaw Cleanup: Why March Is the Biggest One-Time Cleanup Month | spring dog poop cleanup chattanooga | P3 |
| B8 | One-Time Cleanup for a Graduation Party or Wedding Shower | graduation party yard cleanup chattanooga | P3 |
| B9 | Do I Need to Mow Before a One-Time Dog Waste Cleanup? | mow before pooper scooper service | P3 |
| B10 | What a One-Time Cleanup Costs in Ringgold and Fort Oglethorpe GA | one time dog poop cleanup ringgold ga | P3 |

### Pillar C — Commercial (highest ticket)

| # | Title | Target keyword | Priority |
|---|---|---|---|
| C1 | Pet Waste Stations for Chattanooga Apartments and HOAs: Placement, Servicing, and Cost | pet waste station installation chattanooga | **P1 — DRAFTED** |
| C2 | Dog Park Maintenance for Apartment Communities in Chattanooga: What a Service Contract Covers | apartment dog park cleaning service chattanooga | P1 |
| C3 | What a Commercial Pet Waste Removal Quote Actually Includes | commercial pet waste removal cost chattanooga | P1 |
| C4 | Certificate of Insurance, W-9, and Vendor Onboarding for Pet Waste Removal | pet waste removal vendor certificate of insurance | P2 |
| C5 | Pet Waste and Storm Drains: What Chattanooga Commercial Properties Should Know | commercial property pet waste stormwater chattanooga | P2 |
| C6 | Pet Waste Removal for Veterinary Clinics, Kennels, and Doggy Daycares | kennel doggy daycare waste removal chattanooga | P2 |
| C7 | How Often Should a Commercial Property Be Serviced? | commercial pet waste removal frequency | P3 |
| C8 | Pet Waste Removal for Chattanooga Breweries, Patios, and Pet-Friendly Businesses | pet friendly business waste removal chattanooga | P3 |
| C9 | Adding Pet Waste Removal to a Grounds Maintenance Contract | grounds maintenance pet waste add on | P3 |
| C10 | Commercial Pet Waste Removal in Ringgold, Fort Oglethorpe, and Rossville GA | commercial pet waste removal north georgia | P3 |

### Pillar D — HOA / property management (multi-year contracts, board-driven)

| # | Title | Target keyword | Priority |
|---|---|---|---|
| D1 | How to Get Pet Waste Removal Approved by Your HOA Board (With a Budget Template) | hoa pet waste removal board approval | P1 |
| D2 | What Pet Waste Removal Costs Per Unit for a Chattanooga HOA | hoa pet waste removal cost per unit | P1 |
| D3 | Enforcing a Pet Waste Policy Without Fining Residents | hoa dog waste policy enforcement | P2 |
| D4 | Writing a Pet Waste Clause Into HOA Rules and Lease Addenda | hoa pet waste rules lease addendum | P2 |
| D5 | DNA Testing vs Scheduled Cleanup: Which Actually Fixes an HOA Pet Waste Problem? | hoa dog dna testing pet waste alternative | P2 |
| D6 | Comparing Pet Waste Removal Vendors: What Boards Should Ask | questions to ask pet waste removal vendor hoa | P2 |
| D7 | Pet Waste Removal for Condo Associations With Limited Common Areas | condo association pet waste removal | P3 |
| D8 | Seasonal Budgeting for HOA Grounds and Pet Waste | hoa grounds budget pet waste line item | P3 |
| D9 | Handling Resident Pet Waste Complaints: A Property Manager Script | resident dog poop complaint property manager | P3 |
| D10 | HOA Pet Waste Removal in North Georgia Communities | hoa pet waste removal ringgold ga | P3 |

---

## 3. Drafted this pass

| Post | Slug | Pillar | Service page linking back |
|---|---|---|---|
| How to Get Rid of Dog Poop Smell in a Chattanooga Yard | `/blog/how-to-get-rid-of-dog-poop-smell-in-yard-chattanooga` | A | `/services` |
| Weekly vs Every-Other-Week Dog Poop Service in Chattanooga | `/blog/weekly-vs-biweekly-dog-poop-service-chattanooga` | A | `/services`, `/pricing` |
| Pet Waste Stations for Chattanooga Apartments and HOAs | `/blog/pet-waste-stations-apartments-hoas-chattanooga` | C + D | `/commercial` |
| One-Time Yard Cleanup Before a Party | `/blog/yard-cleanup-before-a-party-chattanooga` | B | `/one-time-cleanup` |

---

## 4. AI-citation questions and where each is answered

These are answered in plain, visible body text — not only in JSON-LD — and appear in
both the React page and the prerendered crawlable HTML that non-JS AI crawlers read.

| Customer question to an AI assistant | Answered on |
|---|---|
| "How much does it cost to have someone pick up dog poop every week in Chattanooga?" | `/blog/weekly-vs-biweekly-dog-poop-service-chattanooga`, `/pricing`, `/faq` |
| "Is every-other-week pooper scooper service enough, or do I need weekly?" | `/blog/weekly-vs-biweekly-dog-poop-service-chattanooga`, `/services` |
| "Can someone clean up my yard before a party this weekend in North Georgia?" | `/blog/yard-cleanup-before-a-party-chattanooga`, `/one-time-cleanup` |
| "Who installs and maintains dog waste stations for apartment complexes near Chattanooga?" | `/blog/pet-waste-stations-apartments-hoas-chattanooga`, `/commercial` |
| "Do pet waste removal companies in Chattanooga require a contract?" | `/faq`, `/comparison`, all three new posts |

---

## 5. Published pricing (source of truth)

From `apps/web/src/pages/PricingPage.jsx` plus the two add-on rates confirmed by
Brandon in August 2026. Every page and schema block on the site should agree with
this table; if a rate changes, grep for the figure rather than editing one page.

| Item | Rate |
|---|---|
| Weekly | $20 per visit, first dog |
| Twice weekly | $18 per visit, first dog |
| Every other week | $33 per visit, first dog |
| One-time cleanup | from $85 |
| Yard deodorizing and sanitizing | $20 per visit |
| Pet waste station | from $299 per station installed |
| Pet waste station servicing | $10 per station per week |
| Common-area sweep, commercial and HOA | quoted per property |

Note on positioning: Call of Doody publishes yard deodorizing at $15/visit, below
our $20. Our advantage there is that ours is priced in public and theirs requires a
call — worth not picking a price fight we do not win on the number alone.

## 6. Open items for Brandon

- **Next P1s with no draft:** A2 (multi-dog pricing), A3 (per-visit vs flat monthly
  billing), B2 (move-out / rental deposit), B3 (neglected yard deep clean), C2
  (apartment dog park contracts), C3 (what a commercial quote includes), D1 (getting
  board approval), D2 (HOA cost per unit).
- **A3 is the sharpest of those.** Every competitor that publishes anything bills a
  flat monthly rate; we bill per visit. Nobody has written that comparison, and it is
  the exact question a buyer asks when PooTagic quotes them a flat monthly number.
- **Competitor prices in the comparison page are July 2026 vintage.** They still
  match what search results show, but they should be re-verified quarterly.
- **The comparison page does not list our add-on rates.** Now that stations and
  deodorizing are priced, the table could carry them — worth doing when the
  quarterly competitor re-verification happens.
