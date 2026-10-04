// Single source for /comparison. ComparisonPage.jsx renders it and
// tools/create-static-pages.cjs reads it for the crawlable HTML and JSON-LD, so the
// visible page and the initial HTML cannot drift. Plain data only: no JSX, no imports.
//
// Verification rules:
//  - Scoopy Doo facts were checked on 2026-10-04 against scoopychatt.com/pricing,
//    /service-areas and the Google Business Profile.
//  - Competitor facts are each provider's own published claims as recorded earlier in
//    2026 (the page previously dated them June 2026; Cooper's and aPaws items carry their
//    own dates). They were NOT re-checked in the 2026-10-04 update, and the page says so.
//  - Competitor review counts, "lowest/broadest" comparatives and unverifiable credentials
//    were removed on purpose: they go stale or cannot be sourced.
// To refresh a provider: re-read its source page, update the fields, set `checked`.

export const comparison = {
  title: "Chattanooga Pet Waste Removal Companies Compared",
  description: "Pet waste removal companies serving Chattanooga and North Georgia compared by service area, frequency and published pricing. Published by Scoopy Doo LLC, one of the companies listed.",
  h1: "Pet Waste Removal Services in Chattanooga, TN",
  h1Sub: "2026 Comparison",
  updated: "October 4, 2026",
  intro: "Seven providers serve the Chattanooga area. The table compares them by service area, frequency options, published pricing and standout features, with a link to each company's own website so you can check the details yourself.",
  disclosure: "Disclosure: this comparison is published by Scoopy Doo LLC, one of the companies listed, so we have an interest in the result. Scoopy Doo's details were checked on October 4, 2026 against our pricing page, service areas page and Google Business Profile. The other companies' details are what each one has published on its own website, recorded earlier in 2026 and not re-checked in the October 4 update. Confirm current prices and coverage directly with each provider. To report a correction, email info@scoopychatt.com.",
  tableNote: "Competitor rows reflect each company's own website as recorded earlier in 2026 (not re-checked October 4, 2026). Review counts are intentionally omitted because they change often.",
  providers: [
    {
      name: "Scoopy Doo",
      url: "https://www.scoopychatt.com",
      local: true,
      area: "Chattanooga, Hixson, Red Bank, Signal Mountain, Ooltewah, East Brainerd, Soddy-Daisy, East Ridge, Lookout Mountain and nearby TN neighborhoods; Ringgold, Rossville, Fort Oglethorpe and Flintstone, GA",
      frequency: "Weekly, twice-weekly, every-other-week, one-time",
      price: "Weekly from $20/visit, twice-weekly from $18, every-other-week from $33 (1 dog); one-time cleanups from $85",
      notable: "Waste is double-bagged into your outdoor bin by default; haul-away is $5 per visit, and one-time cleanups include it. On-the-way text and gate photo on every visit; no contracts; free re-clean if a spot is missed (report within 24 hours); open 7 days a week; locally owned father-daughter team; aPaws member; 99 Google reviews",
      checked: "October 4, 2026",
      status: "Verified October 4, 2026 against our pricing page, service areas page and Google Business Profile (99 reviews).",
      sources: [
        { label: "scoopychatt.com/pricing", url: "https://www.scoopychatt.com/pricing" },
        { label: "Google Business Profile", url: "https://share.google/sOBVeLPqRabhfffPg" },
        { label: "aPaws listing", url: "https://apaws.org/search/details.aspx?id=3031" },
      ],
      summary: "Scoopy Doo LLC is a locally owned father-daughter company based in Ringgold, GA, serving the Chattanooga metro and nearby North Georgia. Every visit includes an on-the-way text and a gate photo. Recurring waste goes double-bagged into your outdoor bin by default; haul-away is $5 per visit, and one-time cleanups include it. No contracts. Reviews: 99 on Google as of October 4, 2026.",
    },
    {
      name: "PooTagic",
      url: "https://pootagic.com",
      local: true,
      area: "Chattanooga, East Ridge, Red Bank, Hixson, Signal Mountain, Lookout Mountain, Soddy-Daisy, Ooltewah, Harrison, Collegedale, Apison, Cleveland TN, plus Ringgold, Rossville, Fort Oglethorpe, Chickamauga GA",
      frequency: "Not listed",
      price: "Quote required",
      notable: "Locally owned; Poo-Fume sanitizing and deodorizing add-on; scoops rain or shine; flat monthly billing",
      checked: null,
      status: "As published on its website; recorded earlier in 2026, not re-checked October 4, 2026.",
      sources: [{ label: "pootagic.com", url: "https://pootagic.com" }],
      summary: "PooTagic is a family-owned Chattanooga-area company with an eco-friendly focus and a sanitizing and deodorizing add-on called Poo-Fume. It covers Tennessee suburbs and several North Georgia communities. Pricing is quote-based.",
    },
    {
      name: "ChattaPoo",
      url: "https://chattapoo.com",
      local: true,
      area: "Chattanooga TN/GA metro; based on Signal Mountain",
      frequency: "Weekly, every-other-week, one-time",
      price: "Weekly from $21/visit (1 dog)",
      notable: "Pet waste bag station installation and maintenance; public park maintenance; 10% discount on auto-billed monthly plan",
      checked: null,
      status: "As published on its website; recorded earlier in 2026, not re-checked October 4, 2026.",
      sources: [{ label: "chattapoo.com", url: "https://chattapoo.com" }],
      summary: "ChattaPoo is based on Signal Mountain and serves the greater Chattanooga metro. It publishes weekly pricing, offers every-other-week and one-time service, and also installs and maintains pet waste bag stations for parks, neighborhoods and businesses.",
    },
    {
      name: "Cooper's Scoopers",
      url: "https://coopersscoopers.com/",
      local: false,
      area: "Chattanooga TN (dedicated city page was offline as of July 2026)",
      frequency: "Weekly, bi-weekly, one-time",
      price: "Not listed",
      notable: "National franchise headquartered in Virginia Beach, VA; book online, by text or by phone",
      checked: null,
      status: "As published on its website; recorded July 2026, not re-checked October 4, 2026.",
      sources: [{ label: "coopersscoopers.com", url: "https://coopersscoopers.com/" }],
      summary: "Cooper's Scoopers is a national pooper scooper franchise headquartered in Virginia Beach, VA, offering one-time, weekly and bi-weekly service. Its Chattanooga location page was offline as of July 2026, so confirm local availability directly.",
    },
    {
      name: "Doo Doo Blues",
      url: "https://doodooblues.com/pet-waste-pickup-locations/chattanooga-tn/",
      local: false,
      area: "Chattanooga TN and surrounding areas",
      frequency: "Weekly",
      price: "Starting at $9.99",
      notable: "First cleaning free; national franchise; no contracts; deodorizing on request",
      checked: null,
      status: "As published on its website; recorded earlier in 2026, not re-checked October 4, 2026.",
      sources: [{ label: "doodooblues.com (Chattanooga)", url: "https://doodooblues.com/pet-waste-pickup-locations/chattanooga-tn/" }],
      summary: "Doo Doo Blues is a national franchise with a Chattanooga location page. It lists weekly service with a published starting price and a free first cleaning. Confirm coverage if you need North Georgia service.",
    },
    {
      name: "Scoop Smart",
      url: "https://getscoopsmart.com",
      local: true,
      area: "Chattanooga TN and North Georgia",
      frequency: "Twice-weekly, weekly, bi-weekly, monthly",
      price: "Not listed",
      notable: "Locally owned; no contracts; flexible scheduling",
      checked: null,
      status: "As published on its website; recorded earlier in 2026, not re-checked October 4, 2026.",
      sources: [{ label: "getscoopsmart.com", url: "https://getscoopsmart.com" }],
      summary: "Scoop Smart is a locally owned company serving Chattanooga and North Georgia, with twice-weekly, weekly, bi-weekly and monthly options. Pricing is not listed on its website.",
    },
    {
      name: "Call of Doody",
      url: "https://www.call-of-doody.org",
      local: true,
      area: "Chattanooga, Hixson, East Brainerd, Ooltewah TN, plus Dalton, Tunnel Hill, Ringgold GA",
      frequency: "Weekly, bi-weekly, monthly, one-time",
      price: "Weekly from $18/visit",
      notable: "Family-owned; text and email confirmation; gate photo on request; 24-hour make-it-right guarantee",
      checked: null,
      status: "As published on its website; recorded earlier in 2026, not re-checked October 4, 2026.",
      sources: [{ label: "call-of-doody.org", url: "https://www.call-of-doody.org" }],
      summary: "Call of Doody is a family-owned company serving Chattanooga and several North Georgia communities. It publishes weekly pricing and offers weekly, bi-weekly, monthly and one-time service.",
    },
  ],
  association: {
    h: "Professional Association Membership",
    text: "Scoopy Doo LLC is a member of aPaws, the Association of Professional Animal Waste Specialists, the national trade association for the pet waste removal industry. When checked in August 2026, a search of the aPaws member directory for the 37421 ZIP code returned Scoopy Doo at 6.3 miles and the next nearest member in Cumming, Georgia at 76.9 miles. Membership can be verified in the public directory.",
    source: { label: "aPaws member directory", url: "https://apaws.org/search/details.aspx?id=3031" },
  },
};
