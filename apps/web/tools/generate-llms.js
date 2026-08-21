#!/usr/bin/env node
import fs from "fs";
import path from "path";

// Static manifest approach: no JSX parsing, no encoding issues.
// Update this list when new pages are added to inject-seo.cjs.
// Excluded: OAuth callback routes and utility routes.

const SUMMARY =
  "Scoopy Doo LLC is a locally owned pet waste removal company serving Chattanooga, TN " +
  "and surrounding areas including Hixson, Red Bank, Signal Mountain, Ooltewah, East Brainerd, " +
  "Soddy-Daisy, East Ridge, Lookout Mountain (TN), and Ringgold, Rossville, " +
  "Flintstone, and Fort Oglethorpe (GA). Services include weekly, bi-weekly, one-time, " +
  "commercial, and HOA dog poop removal and yard cleanup. Every visit includes on-the-way " +
  "text notifications and a gate photo confirmation. Scoopy Doo LLC is a BBB Accredited Business "  +
  "(A- rating) and a member of aPaws, the Association of Professional Animal Waste Specialists, the "  +
  "national trade association for the professional pet waste removal industry. No contracts required -- get a free " +
  "online quote at scoopychatt.com/quote.";

const BASE = "https://www.scoopychatt.com";

// [url, title, description]
const PAGES = [
  ["/", "Dog Poop Removal & Pooper Scooper Service | Chattanooga TN", "Professional dog poop removal and pooper scooper service in Chattanooga, TN. Reliable weekly pet waste cleanup with online quotes, on-the-way texts, and gate photo confirmation."],
  ["/services", "Pet Waste Removal Services in Chattanooga, TN | Scoopy Doo", "Weekly, bi-weekly, one-time, commercial, and HOA pet waste removal in Chattanooga, TN. Professional dog poop scooping with online quotes and gate photo confirmation."],
  ["/service-areas", "Service Areas | Pet Waste Removal Around Chattanooga, TN", "Scoopy Doo serves Chattanooga, Hixson, Red Bank, Signal Mountain, Ooltewah, East Brainerd, Soddy-Daisy, East Ridge, Lookout Mountain (TN), and Ringgold, Rossville, Flintstone, Fort Oglethorpe (GA)."],
  ["/about", "About Scoopy Doo | Chattanooga Pet Waste Removal", "Meet Scoopy Doo LLC, Chattanooga's locally owned pet waste removal company. Learn about our mission, service standards, and why hundreds of families trust us weekly."],
  ["/faq", "Pet Waste Removal FAQs | Scoopy Doo Chattanooga", "Answers to common questions about dog poop removal in Chattanooga: pricing, scheduling, service area, what to expect on each visit, and more."],
  ["/comparison", "Pet Waste Removal Services Compared in Chattanooga, TN (2026) | Scoopy Doo", "Side-by-side comparison of Chattanooga pet waste removal companies (Scoopy Doo, ChattaPoo, PooTagic, Doo Doo Blues, Cooper Scoopers, Scoop Smart) by service area, frequency, and pricing."],
  ["/press", "Scoopy Doo in the News | Press and Media Coverage | Chattanooga Pet Waste Removal", "News coverage of Scoopy Doo LLC, the largest pet waste removal company in the Chattanooga area, featured in the Chattanoogan in June 2026."],
  ["/quote", "Get a Free Pet Waste Removal Quote | Chattanooga, TN", "Get a fast, free quote for dog poop removal in Chattanooga, TN. No contracts required."],
  ["/one-time-cleanup", "One-Time Dog Poop Cleanup in Chattanooga, TN | Scoopy Doo", "Get a one-time dog poop cleanup in Chattanooga, TN. Perfect for spring cleaning, first-time service, or move-out yard prep."],
  ["/how-it-works", "How It Works | Scoopy Doo Pet Waste Removal Chattanooga", "Easy online quotes, secure online payment, on-the-way texts, and gate photo proof after every visit. Working with Scoopy Doo is simple."],
  ["/doggy-doors", "Professional Dog Door Installation in Chattanooga, TN | Scoopy Doo Doggy Doors", "Professional dog door installation in Chattanooga and North Georgia. Good, Better, and Best options, professionally measured and installed. Starting at $529 installed."],
  ["/near-me", "Pooper Scooper Service Near Me in Chattanooga, TN", "Looking for a pooper scooper service near you in Chattanooga? Scoopy Doo offers reliable local dog waste removal."],
  ["/blog", "Pet Waste and Dog Care Blog | Scoopy Doo Chattanooga", "Tips on pet waste removal, yard health, and dog care for Chattanooga homeowners."],
  ["/dog-poop-removal-chattanooga", "Dog Poop Removal in Chattanooga, TN | Scoopy Doo LLC", "Professional dog poop removal in Chattanooga, TN. Dependable weekly service, fully insured."],
  ["/pet-waste-removal-chattanooga", "Pet Waste Removal in Chattanooga, TN | Scoopy Doo", "Expert pet waste removal in Chattanooga, TN for homes, HOAs and businesses. Request a free quote."],
  ["/dog-poop-scooping-chattanooga", "Dog Poop Scooping Service in Chattanooga, TN | Scoopy Doo", "Reliable dog poop scooping in Chattanooga, TN. Weekly and bi-weekly pooper scooper service."],
  ["/yard-cleanup-chattanooga", "Yard Cleanup for Pet Owners in Chattanooga, TN | Scoopy Doo", "Complete yard cleanup for pet owners in Chattanooga, TN. Book a one-time or recurring cleanup."],
  ["/privacy-policy", "Privacy Policy | Scoopy Doo LLC", "Privacy policy for Scoopy Doo LLC, the pet waste removal company serving Chattanooga, TN."],
  ["/terms-of-service", "Terms of Service | Scoopy Doo LLC", "Terms of service for Scoopy Doo LLC pet waste removal in Chattanooga, TN."],
  ["/blog/apaws-member-pet-waste-removal-chattanooga", "What aPaws Membership Means When Hiring a Pooper Scooper | Chattanooga", "aPaws is the national trade association for pet waste removal. What membership means, why it matters when hiring, and why Scoopy Doo is the only member within 76 miles of Chattanooga."],
  ["/blog/professional-waste-removal-benefits", "Benefits of Professional Pet Waste Removal | Scoopy Doo Chattanooga", "Why professional dog waste removal is safer and more thorough than DIY. Scoopy Doo serves Chattanooga and surrounding areas weekly."],
  ["/blog/seasonal-pet-care-tips", "Seasonal Pet Care Tips for Chattanooga Dog Owners | Scoopy Doo", "Keep your yard clean and safe year-round with seasonal pet waste tips from Scoopy Doo LLC in Chattanooga, TN."],
  ["/blog/health-benefits-yard-cleanup", "Health Benefits of Regular Yard Cleanup for Pet Owners | Scoopy Doo", "Regular dog waste removal protects your family from bacteria and parasites. Learn why weekly cleanup matters for Chattanooga homeowners."],
  ["/blog/customer-success-stories", "Customer Success Stories | Scoopy Doo Pet Waste Removal Chattanooga", "Real stories from Chattanooga homeowners and HOAs who rely on Scoopy Doo for weekly pet waste removal."],
  ["/blog/diy-vs-professional", "DIY vs Professional Dog Waste Removal | Scoopy Doo Chattanooga", "Compare DIY pet waste cleanup to professional pooper scooper service in Chattanooga, TN. See which option saves time and money."],
  ["/blog/lawn-health-and-pet-waste", "How Pet Waste Affects Your Lawn Health | Scoopy Doo Chattanooga", "Dog waste kills grass and harms soil. Learn how regular professional cleanup protects your Chattanooga lawn from long-term damage."],
  ["/blog/health-risks-of-pet-waste", "Health Risks of Unmanaged Pet Waste | Scoopy Doo Chattanooga", "Dog waste carries bacteria, hookworms, roundworms, and giardia. Learn the health risks and how Scoopy Doo protects Chattanooga families."],
  ["/blog/pet-waste-management-guide", "The Complete Pet Waste Management Guide for Dog Owners | Scoopy Doo", "Everything Chattanooga dog owners need about pet waste management -- frequency, disposal, health risks, and professional service options."],
  ["/blog/how-often-scoop-dog-poop-chattanooga", "How Often Should You Scoop Dog Poop in Chattanooga? | Scoopy Doo", "Weekly scooping is the gold standard. Learn why cleanup frequency matters for lawn health and family safety in Chattanooga, TN."],
  ["/blog/dog-poop-laws-chattanooga", "Is It Illegal to Not Pick Up Dog Poop in Chattanooga? | Scoopy Doo", "Chattanooga City Code Chapter 7 requires owners to pick up after their dogs. What the law says, the fines, and how HOA rules go further."],
  ["/blog/spring-pet-care-checklist", "Spring Pet Care Checklist for Chattanooga Dog Owners | Scoopy Doo", "Spring in Chattanooga means wet yards hiding months of pet waste. Use this checklist to get your yard cleaned up and ready."],
  ["/blog/is-dog-waste-bad-for-lawn", "Is Dog Waste Bad for Your Lawn? | Scoopy Doo Chattanooga", "Yes -- dog waste kills grass and damages soil. Learn what it does to your Chattanooga yard and how professional cleanup helps."],
  ["/blog/best-pooper-scooper-services-chattanooga", "Best Pooper Scooper Services in Chattanooga, TN | Scoopy Doo", "Looking for the best dog poop removal in Chattanooga? Online quotes, on-the-way texts, gate photo confirmation. No contracts."],
  ["/blog/is-dog-poop-hurting-your-chattanooga-yard", "Is Dog Poop Hurting Your Chattanooga Yard? | Scoopy Doo", "Dog waste damages grass and soil over time. Find out if your Chattanooga yard is being harmed and how Scoopy Doo can help."],
  ["/blog/chattanooga-pet-waste-removal-homeowners", "Pet Waste Removal Guide for Chattanooga Homeowners | Scoopy Doo", "A complete guide for Chattanooga homeowners on pet waste management -- health risks, lawn damage, waterway protection, and professional service."],
  ["/blog/commercial-pet-waste-removal-chattanooga", "Commercial Pet Waste Removal in Chattanooga, TN | Scoopy Doo", "Professional pet waste removal for apartments, HOAs, and businesses in Chattanooga. Flexible scheduling, no contracts."],
  ["/blog/how-often-clean-yard", "How Often Should You Clean Your Yard of Dog Waste? | Scoopy Doo", "Weekly is the gold standard. Learn the right cleanup frequency based on your dog count, yard size, and Chattanooga season."],
  ["/blog/signal-mountain", "Pet Waste Removal Tips for Signal Mountain, TN | Scoopy Doo Blog", "Scoopy Doo serves Signal Mountain with thorough yard cleanup. We handle larger lots and wooded terrain every week."],
  ["/blog/soddy-daisy", "Pet Waste Removal in Soddy-Daisy, TN | Scoopy Doo Blog", "Scoopy Doo serves Soddy-Daisy and Chickamauga Lake area homeowners. Waterfront cleanup protects the lake and your family."],
  ["/pricing", "Dog Poop Removal Pricing in Chattanooga, TN | Scoopy Doo", "Simple, transparent pricing for weekly, twice-weekly, bi-weekly, and one-time dog poop removal in Chattanooga TN. Weekly from $20 per visit. No contracts, no hidden fees."],
  ["/commercial", "Commercial and HOA Pet Waste Removal in Chattanooga, TN | Scoopy Doo", "Commercial and HOA pet waste removal in Chattanooga TN. Scheduled cleanup and pet waste stations for apartments, HOAs, dog parks, and businesses. Fully insured, no contracts."],
  ["/reviews", "Scoopy Doo Reviews | 90 Five-Star Reviews in Chattanooga, TN", "See why Chattanooga trusts Scoopy Doo for pet waste removal. 90 five-star Google reviews from homeowners across Chattanooga and North Georgia."],
  ["/podcast", "The Scoopy Doo Podcast | Chattanooga Pet Waste Removal", "Behind the scenes of Scoopy Doo LLC, the father-daughter pet waste removal company serving Chattanooga TN and North Georgia."],
  ["/cost-calculator", "Dog Poop Cost Calculator | Chattanooga TN | Scoopy Doo", "Estimate weekly, twice-weekly, and one-time pooper scooper pricing in Chattanooga and North Georgia, then get a free exact quote from Scoopy Doo."],
  ["/spring-special", "Spring Special: Buy 2 Months, Get 1 Free | Scoopy Doo", "Limited-time Chattanooga spring special from Scoopy Doo."],
  ["/pet-safe-checklist", "Pet-Safe Yard Checklist | Scoopy Doo Chattanooga", "A free pet-safe yard checklist for Chattanooga dog owners."],
  ["/dog-park-guide", "Chattanooga Dog Park Guide for Dog Owners | Scoopy Doo", "Discover Chattanooga's best dog parks. A local guide from Scoopy Doo."],
  ["/blog/dog-poop-cleanup-chattanooga-summer-heat", "Dog Poop Cleanup in Chattanooga During Hot, Humid Weather | Scoopy Doo", "Summer heat and humidity make dog waste more dangerous. Learn why Chattanooga yards need regular cleanup during the hot months and how Scoopy Doo can help."],
  ["/blog/best-dog-parks-chattanooga-tn", "7 Best Dog Parks in Chattanooga, TN (2026 Guide) | Scoopy Doo", "The best dog parks in Chattanooga TN for 2026, including Barks and Tails, Greenway Farms, and Bark City, with verified hours and addresses."],
  ["/blog/winter-dog-poop-cleanup-chattanooga", "Winter Dog Poop Cleanup in Chattanooga: Why You Still Need Scooping Service | Scoopy Doo", "Cold weather does not break down dog waste. Here is why Chattanooga yards still need pet waste removal through winter, and what happens if you skip it."],
  ["/blog/fall-yard-care-checklist-chattanooga", "Fall Yard Care Checklist for Chattanooga Dog Owners | Scoopy Doo", "Falling leaves hide dog waste and rain washes it into storm drains. Here is a fall yard care checklist for Chattanooga and North Georgia dog owners."],
  ["/blog/hoa-pet-waste-removal-chattanooga", "HOA Pet Waste Removal in Chattanooga: A Guide for Community Boards | Scoopy Doo", "Scoopy Doo handles pet waste removal for HOAs, condo associations, and apartment communities across Chattanooga and North Georgia."],
  ["/blog/dog-door-installation-chattanooga", "Dog Door Installation in Chattanooga, TN: Cost & Guide | Scoopy Doo", "How much does dog door installation cost in Chattanooga? Good, Better, and Best options from $529 installed, professionally measured, sealed, and tested."],
  ["/blog/one-time-dog-poop-cleanup-chattanooga", "One-Time Dog Poop Cleanup in Chattanooga: Cost and How It Works | Scoopy Doo", "One-time dog poop cleanups in Chattanooga start at $85. Here is what is included, when it makes sense, and how to book a single visit."],
  ["/blog/weekly-vs-biweekly-dog-poop-service-chattanooga", "Weekly vs Every-Other-Week Dog Poop Service in Chattanooga | Scoopy Doo", "Weekly service is $20 per visit and every-other-week is $33 per visit for one dog, $1,040 vs $858 per year. How to choose a schedule by dog count, yard size, and season."],
  ["/blog/pet-waste-stations-apartments-hoas-chattanooga", "Pet Waste Stations for Chattanooga Apartments and HOAs | Scoopy Doo", "Pet waste stations are $299 per station installed and $10 per station per week to service. How many an apartment community or HOA needs, where to place them, and what scheduled servicing includes."],
  ["/blog/how-to-get-rid-of-dog-poop-smell-in-yard-chattanooga", "How to Get Rid of Dog Poop Smell in a Chattanooga Yard | Scoopy Doo", "The odor comes from the soil, not the waste. Remove everything, soak the affected areas heavily, wait two or three days. Deodorizing treatment is $20 per visit when that is not enough."],
  ["/blog/yard-cleanup-before-a-party-chattanooga", "One-Time Yard Cleanup Before a Party in Chattanooga and North Georgia | Scoopy Doo", "One-time cleanups start at $85. Book one to two days before the event, mow first, and water heavily used areas afterward to handle summer smell."],
  ["/blog/new-puppy-pet-waste-removal-chattanooga", "New Puppy Owner Guide: Pet Waste Cleanup in Chattanooga | Scoopy Doo", "Bringing home a new puppy in Chattanooga? Here is how to set up a pet waste cleanup routine, why it matters for house training and health, and what professional service costs."],
  ["/blog/yard-cleanup-before-selling-home-chattanooga", "Do You Need to Clean Up Dog Waste Before Selling Your Chattanooga Home? | Scoopy Doo", "Selling a home in Chattanooga? Here is why yard cleanup and pet waste removal matter before listing photos and showings, plus a pre-listing checklist and pricing."],
  ["/blog/pooper-scooper-cost-chattanooga", "How Much Does Pooper Scooper Service Cost in Chattanooga? | Scoopy Doo", "Scoopy Doo weekly service starts at $20 per visit for one dog. 2026 pricing for weekly, every-other-week, and one-time pet waste removal in Chattanooga TN."],
  ["/blog/dog-poop-removal-north-georgia", "Pet Waste Removal in Ringgold, Rossville and North Georgia | Scoopy Doo", "Scoopy Doo serves Ringgold, Rossville, Fort Oglethorpe, and Flintstone GA. Same weekly pet waste removal as Chattanooga. Starting at $20/visit. No contracts."],
  ["/blog/podcast-blog", "Scoopy Doo Discusses Pet Waste Management on a Recent Podcast | Scoopy Doo", "Scoopy Doo father-daughter team discusses pet waste management, lawn health, and building a pet waste removal company in Chattanooga."],
];

// Location/service-area pages
const GA_LOCS = new Set(["ringgold", "rossville", "flintstone", "fort-oglethorpe"]);
const LOC_SLUGS = [
  "chattanooga", "hixson", "red-bank", "signal-mountain", "ooltewah", "east-brainerd",
  "soddy-daisy", "apison", "collegedale", "highland-park", "downtown",
  "east-ridge", "lookout-mountain",
  "st-elmo", "north-chattanooga", "southside", "lookout-valley", "riverview",
  "normal-park", "brainerd",
  "ringgold", "rossville", "flintstone", "fort-oglethorpe"
];

for (const slug of LOC_SLUGS) {
  const city = slug.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  const state = GA_LOCS.has(slug) ? "GA" : "TN";
  PAGES.push([
    "/service/" + slug,
    "Dog Poop Removal in " + city + ", " + state + " | Scoopy Doo",
    "Professional pet waste removal in " + city + ", " + state + ". Weekly and bi-weekly pooper scooper service from Scoopy Doo. Get your free online quote today."
  ]);
}

function main() {
  const lines = [
    "# Scoopy Doo LLC - Pet Waste Removal in Chattanooga, TN and North Georgia",
    "",
    SUMMARY,
    "",
    "## Pages"
  ];

  for (const [url, title, desc] of PAGES) {
    lines.push("- [" + title + "](" + BASE + url + "): " + desc);
  }

  const outputPath = path.join(process.cwd(), "public", "llms.txt");
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf8");
  console.log("llms.txt written: " + PAGES.length + " pages");
}

const isMain = import.meta.url === ("file://" + process.argv[1]);
if (isMain) {
  main();
}
