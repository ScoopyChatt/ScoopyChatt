'use strict';
// Canonical [title, description] pairs for every static (non-location) route.
// inject-seo.cjs (build-time meta injection) and generate-llms.js (llms.txt for
// AI crawlers) both read this list so a title/description rewrite only has to
// happen in one place. Location pages (/service/<city>) are generated
// separately in each of those two files, since their title/description
// patterns differ slightly between the two use cases.
const pages = {
  '/press': ['Scoopy Doo in the News | Chattanooga Pet Waste Removal', 'See news coverage of Scoopy Doo LLC, the largest pet waste removal company in the Chattanooga area. Featured in the Chattanoogan and on WDEF News 12.'],
  '/': ['Pet Waste & Dog Poop Removal | Chattanooga TN | Scoopy Doo', 'Pet waste removal & dog poop pickup in Chattanooga TN & North Georgia. 5-star rated with 90+ Google reviews. Weekly service from $20 per visit. Free quotes.'],
  '/services': ['Dog Poop Removal Services in Chattanooga, TN | From $20', 'Weekly dog poop removal in Chattanooga from $20/visit, plus one-time, commercial, and HOA service. No contracts, gate photo after every visit. Free quote.'],
  '/podcast': ["The Scoopy Doo Podcast | Chattanooga Pet Waste Removal", "Behind the scenes of Scoopy Doo LLC, the father-daughter pet waste removal company serving Chattanooga TN and North Georgia."],
  '/near-me': ['Pooper Scooper Near Me in Chattanooga, TN | From $20', 'Local pooper scooper serving Chattanooga and North Georgia from $20/visit. Free same-day quotes, on-the-way texts, gate photo confirmation, no contracts.'],
  '/one-time-cleanup': ['One-Time Dog Poop Cleanup in Chattanooga | From $85', 'Yard overrun with dog poop? One-time cleanup in Chattanooga starts at $85, covers up to 3 dogs, includes haul-away. Most bookings scheduled in 2-5 days.'],
  "/cost-calculator": ["Dog Poop Cost Calculator | Chattanooga TN | Scoopy Doo", "Estimate weekly, twice-weekly, and one-time pooper scooper pricing in Chattanooga and North Georgia, then get a free exact quote from Scoopy Doo."],
  '/how-it-works': ['How Dog Poop Removal Works in Chattanooga | Scoopy Doo', 'See the 4 steps behind Scoopy Doo dog poop removal in Chattanooga: free quote, we scoop, an on-the-way text, and a gate photo when done. No contracts.'],
  '/comparison': ['Chattanooga Pet Waste Removal Companies Compared', 'Comparing pet waste removal in Chattanooga? See how Scoopy Doo stacks up against PooTagic, ChattaPoo, and Doo Doo Blues on price and features. Updated 2026.'],
  '/doggy-doors': ['Dog Door & Pet Door Installation in Chattanooga, TN | Scoopy Doo', 'Dog door and pet door installation in Chattanooga, TN and North Georgia. Locally owned, not a franchise. Set pricing from $529 installed, no quote calls.'],
  '/dog-poop-removal-chattanooga': ['Dog Poop Removal in Chattanooga, TN | Scoopy Doo LLC', 'Professional dog poop removal in Chattanooga, TN. Dependable weekly service, fully insured.'],
  '/pet-waste-removal-chattanooga': ['Pet Waste Removal in Chattanooga, TN | Scoopy Doo', 'Expert pet waste removal in Chattanooga, TN for homes, HOAs & businesses. Request a free quote.'],
  '/dog-poop-scooping-chattanooga': ['Dog Poop Scooping Service in Chattanooga, TN | Scoopy Doo', "Dog poop scooping in Chattanooga from $20 a visit weekly. On-the-way text, gate photo when done, and a free re-clean if we miss a spot. Get a free quote."],
  '/yard-cleanup-chattanooga': ['Yard Cleanup for Pet Owners in Chattanooga, TN | Scoopy Doo', 'One-time dog waste yard cleanup in Chattanooga from $85 with free haul-away, or ongoing service from $20 a visit. Great for move-ins and spring cleans.'],
  '/service-areas': ['Service Areas | Dog Poop Removal Coverage | Scoopy Doo', 'We provide professional dog poop removal services across the Chattanooga metro area, including Hixson, Red Bank, Ooltewah, and North Georgia.'],
  '/about': ['About Scoopy Doo | Chattanooga Pet Waste Removal', "Meet Scoopy Doo LLC - Chattanooga's locally owned father and daughter pet waste removal company. 80+ five-star reviews, two branded service vehicles, serving 17+ communities."],
  '/faq': ['Pet Waste Removal FAQs | Scoopy Doo Chattanooga', 'Answers to common questions about dog poop removal in Chattanooga: pricing, scheduling, and more.'],
  '/commercial': ['Commercial Pet Waste Removal in Chattanooga, TN', 'Scheduled pet waste removal for Chattanooga apartments, HOAs and businesses. Stations from $299 installed, $10/week to service. Insured, no contracts.'],
  '/pricing': ['Dog Poop Removal Pricing in Chattanooga | From $20', 'Chattanooga dog poop removal pricing: weekly from $20/visit, twice-weekly $18, every-other-week $33, one-time from $85. No contracts. Get your free quote.'],
  '/reviews': ['Scoopy Doo Reviews | 90 Five-Star Reviews in Chattanooga, TN', 'See why Chattanooga trusts Scoopy Doo for pet waste removal. 90 five-star Google reviews from homeowners across Chattanooga and North Georgia.'],
  '/quote': ['Get a Free Pet Waste Removal Quote | Chattanooga, TN', 'Get a fast, free quote for dog poop removal in Chattanooga, TN.'],
  '/spring-special': ['Spring Special: Buy 2 Months, Get 1 Free | Scoopy Doo', "Scoopy Doo's spring special for Chattanooga pet owners: buy 2 months of dog waste removal, get 1 month free. Limited time offer."],
  '/pet-safe-checklist': ['Pet-Safe Yard Checklist | Scoopy Doo Chattanooga', 'Free pet-safe yard checklist for Chattanooga dog owners: toxic plants to avoid, fence-securing tips, and pet-safe lawn care product picks.'],
  '/dog-park-guide': ['Chattanooga Dog Park Guide for Dog Owners | Scoopy Doo', "Free guide to Chattanooga's best dog parks, including Tennessee Riverpark, Warner Park, and Signal Mountain's Cumberland Trail. Maps and local tips."],
  '/blog': ['Pet Waste & Dog Care Blog | Scoopy Doo Chattanooga', 'Chattanooga pet care tips: yard health, dog waste removal, seasonal guides, and local resources for dog owners from the Scoopy Doo blog.'],
  '/privacy-policy': ['Privacy Policy | Scoopy Doo LLC', 'Privacy policy for Scoopy Doo LLC.'],
  '/terms-of-service': ['Terms of Service | Scoopy Doo LLC', 'Terms of service for Scoopy Doo LLC pet waste removal.'],
  '/blog/apaws-member-pet-waste-removal-chattanooga': ["What aPaws Membership Means When Hiring | Scoopy Doo", "aPaws is the national trade association for pet waste removal. What membership means, why it matters when hiring, and why Scoopy Doo is the only member within 76 miles of Chattanooga."],
  '/blog/no-contact-pet-waste-removal-chattanooga': ["Do You Need to Be Home for Dog Poop Removal? | Scoopy Doo", "No, Scoopy Doo does not require you to be home. See exactly how our no-contact pooper scooper service works in Chattanooga and North Georgia, with gate photos and on-the-way texts."],
  '/blog/professional-waste-removal-benefits': ['Benefits of Professional Pet Waste Removal | Scoopy Doo', 'Why professional dog waste removal is safer and more thorough than DIY. Scoopy Doo serves Chattanooga and surrounding areas weekly.'],
  '/blog/winter-dog-poop-cleanup-chattanooga': ['Winter Dog Poop Cleanup in Chattanooga | Scoopy Doo', 'Cold weather does not stop dog waste from piling up. Learn why Chattanooga yards need winter pet waste removal and what Scoopy Doo service costs from 18 dollars a visit.'],
  '/blog/dog-friendly-trails-chattanooga': ['Best Dog-Friendly Trails in Chattanooga | Scoopy Doo', 'A local guide to the best dog-friendly trails in Chattanooga and North Georgia, plus leash rules and tips for keeping your yard clean after the hike.'],
  '/blog/seasonal-pet-care-tips': ['Seasonal Pet Care Tips for Chattanooga Dog Owners | Scoopy Doo', 'Keep your yard clean and safe year-round with seasonal pet waste tips from Scoopy Doo LLC in Chattanooga, TN.'],
  '/blog/health-benefits-yard-cleanup': ['Health Benefits of Regular Yard Cleanup | Scoopy Doo', 'Regular dog waste removal protects your family from bacteria and parasites. Learn why weekly cleanup matters for Chattanooga homeowners.'],
  '/blog/customer-success-stories': ['Customer Success Stories | Scoopy Doo', 'Real stories from Chattanooga homeowners and HOAs who rely on Scoopy Doo for weekly pet waste removal.'],
  '/blog/diy-vs-professional': ['DIY vs Professional Dog Waste Removal | Scoopy Doo', 'Compare DIY pet waste cleanup to professional pooper scooper service in Chattanooga, TN. See which option saves time and money.'],
  '/blog/lawn-health-and-pet-waste': ['How Pet Waste Affects Your Lawn Health | Scoopy Doo', 'Dog waste kills grass and harms soil. Learn how regular professional cleanup protects your Chattanooga lawn from long-term damage.'],
  '/blog/health-risks-of-pet-waste': ['Health Risks of Unmanaged Pet Waste | Scoopy Doo', 'Dog waste carries bacteria, hookworms, roundworms, and giardia. Learn the health risks and how Scoopy Doo protects Chattanooga families.'],
  '/blog/pet-waste-management-guide': ['The Complete Pet Waste Management Guide | Scoopy Doo', 'Everything Chattanooga dog owners need about pet waste management - frequency, disposal, health risks, and professional service options.'],
  '/blog/how-often-scoop-dog-poop-chattanooga': ['How Often Should You Scoop Dog Poop in Chattanooga? | Scoopy Doo', 'Weekly scooping is the gold standard. Learn why cleanup frequency matters for lawn health and family safety in Chattanooga, TN.'],
  '/blog/spring-pet-care-checklist': ['Spring Pet Care Checklist for Chattanooga Dog Owners | Scoopy Doo', 'Spring in Chattanooga means wet yards hiding months of pet waste. Use this checklist to get your yard cleaned up and ready.'],
  '/blog/is-dog-waste-bad-for-lawn': ['Is Dog Waste Bad for Your Lawn? | Scoopy Doo Chattanooga', 'Yes - dog waste kills grass and damages soil. Learn what it does to your Chattanooga yard and how professional cleanup helps.'],
  '/blog/best-pooper-scooper-services-chattanooga': ['Best Pooper Scooper Services in Chattanooga, TN | Scoopy Doo', 'Looking for the best dog poop removal in Chattanooga? Online quotes, on-the-way texts, gate photo confirmation. No contracts.'],
  '/blog/is-dog-poop-hurting-your-chattanooga-yard': ['Is Dog Poop Hurting Your Chattanooga Yard? | Scoopy Doo', 'Dog waste damages grass and soil over time. Find out if your Chattanooga yard is being harmed and how Scoopy Doo can help.'],
  '/blog/chattanooga-pet-waste-removal-homeowners': ['Pet Waste Removal Guide for Chattanooga Homeowners | Scoopy Doo', 'A complete guide for Chattanooga homeowners on pet waste management - health risks, lawn damage, waterway protection, and professional service.'],
  '/blog/commercial-pet-waste-removal-chattanooga': ['Commercial Pet Waste Removal in Chattanooga, TN | Scoopy Doo', 'Professional pet waste removal for apartments, HOAs, and businesses in Chattanooga. Flexible scheduling, no contracts.'],
  '/blog/fall-yard-care-checklist-chattanooga': ['Fall Yard Care Checklist for Chattanooga Dog Owners | Scoopy Doo', 'A fall pet waste and yard care checklist for Chattanooga dog owners. Learn why leaf season makes cleanup harder and how professional dog poop removal helps.'],
  '/blog/moving-to-chattanooga-with-a-dog': ['Moving to Chattanooga With a Dog: New Resident Guide | Scoopy Doo', 'New to Chattanooga with a dog? Get local tips on neighborhoods, yard care, and pet waste rules, plus how professional dog poop removal makes settling in easier.'],
  '/blog/how-often-clean-yard': ['How Often Should You Clean Your Yard of Dog Waste? | Scoopy Doo', 'Weekly is the gold standard. Learn the right cleanup frequency based on your dog count, yard size, and Chattanooga season.'],
  '/blog/podcast-blog': ['Scoopy Doo on the Podcast | Chattanooga Pet Waste', 'Hear the Scoopy Doo LLC founder discuss starting a pet waste removal business in Chattanooga, TN.'],
  '/blog/signal-mountain': ['Pet Waste Removal Tips for Signal Mountain, TN | Scoopy Doo Blog', 'Scoopy Doo serves Signal Mountain with thorough yard cleanup. We handle larger lots and wooded terrain every week.'],
  '/blog/dog-poop-cleanup-chattanooga-summer-heat': ['Dog Poop Cleanup in Chattanooga Summer Heat | Scoopy Doo', 'Summer heat and humidity make dog waste more dangerous. Learn why Chattanooga yards need regular cleanup during the hot months and how Scoopy Doo can help.'],
  '/blog/dog-poop-laws-chattanooga': ['Is Dog Poop Pickup Required in Chattanooga? | Scoopy Doo', 'Yes, Chattanooga law requires dog owners to pick up after their pets. Here is what City Code Chapter 7 says, the fines you could face, and how to stay compliant.'],
  '/blog/soddy-daisy': ['Pet Waste Removal in Soddy-Daisy, TN | Scoopy Doo Blog', 'Scoopy Doo serves Soddy-Daisy and Chickamauga Lake area homeowners. Waterfront cleanup protects the lake and your family.'],
  '/blog/multiple-dogs-yard-cleanup-chattanooga': ['Multi-Dog Yard Cleanup in Chattanooga | Scoopy Doo', 'How multiple dogs change yard cleanup in Chattanooga: how much waste to expect, how often to scoop, and what multi-dog pooper scooper service costs. Weekly from $20 a visit, no contracts. Call 423-600-5040.'],
  '/blog/one-time-dog-poop-cleanup-chattanooga': ['One-Time Dog Poop Cleanup: Cost & How It Works | Scoopy Doo', 'What a one-time dog poop cleanup costs in Chattanooga, when to book one, and how it works. One-time yard cleanups from $85 with no contract. Call 423-600-5040.'],
  '/blog/fall-flea-tick-season-chattanooga': ['Fall Flea and Tick Season in Chattanooga | Scoopy Doo', 'Chattanooga falls stay warm long after colder regions cool down, keeping fleas and ticks active into November. See why regular dog poop removal helps and what it costs, from $20 a visit.'],
  '/blog/hoa-pet-waste-removal-chattanooga': ['HOA Pet Waste Removal in Chattanooga: A Board Guide | Scoopy Doo', 'How HOA and community pet waste removal works in Chattanooga: what is included, how pricing is quoted, and how to set up service for common areas and dog stations. Call 423-600-5040.'],
  '/blog/dog-door-installation-chattanooga': ['Dog Door Installation in Chattanooga: Cost & Guide | Scoopy Doo', 'How much does dog door installation cost in Chattanooga? Good, Better, and Best options from $529 installed, professionally measured, sealed, and tested. Call 423-600-5040.'],
  '/blog/weekly-vs-biweekly-dog-poop-service-chattanooga': ['Weekly vs Every-Other-Week Dog Poop Service | Scoopy Doo', 'Weekly dog poop removal in Chattanooga is $20 per visit and every-other-week is $33 per visit, about $15 a month apart for twice the visits. How to pick the right schedule.'],
  '/blog/pet-waste-stations-apartments-hoas-chattanooga': ['Pet Waste Stations for Apartments and HOAs | Scoopy Doo', 'How many pet waste stations a Chattanooga apartment community or HOA needs, where to place them, what scheduled servicing includes, and how commercial pricing is quoted.'],
  '/blog/how-to-get-rid-of-dog-poop-smell-in-yard-chattanooga': ['How to Get Rid of Dog Poop Smell in Your Yard | Scoopy Doo', 'Why a Chattanooga yard still smells after you scoop, what actually clears it (remove, then soak), and when a $20 deodorizing treatment is worth paying for.'],
  '/blog/yard-cleanup-before-a-party-chattanooga': ['One-Time Yard Cleanup Before a Party | Scoopy Doo', 'Hosting a cookout or graduation? One-time dog poop cleanups start at $85. How far ahead to book, what gets done, and how to handle yard smell in summer humidity.'],
  '/blog/new-puppy-pet-waste-removal-chattanooga': ['New Puppy Owner Guide: Pet Waste Cleanup | Scoopy Doo', 'Bringing home a new puppy in Chattanooga? Here is how to set up a pet waste cleanup routine, why it matters for house training and health, and what professional service costs.'],
  '/blog/dog-poop-removal-north-georgia': ["Dog Poop Removal in Ringgold and North Georgia | Scoopy Doo", "Scoopy Doo provides dog poop removal in Ringgold, Rossville, Fort Oglethorpe, and Flintstone GA. Weekly service from $20 per visit, no contracts required."],
  '/blog/yard-cleanup-before-selling-home-chattanooga': ["Clean Up Dog Waste Before Selling Your Home | Scoopy Doo", "Selling a home in Chattanooga? Here is why yard cleanup and pet waste removal matter before listing photos and showings, plus a pre-listing checklist and pricing."],
  '/blog/what-pet-waste-removal-includes-chattanooga': ["What Does Pet Waste Removal Actually Include? | Scoopy Doo", "Pet waste removal in Chattanooga TN covers weekly yard scooping, double-bagging, and gate photo confirmation. What is included, what it costs, and who offers it."],
  '/blog/best-dog-parks-chattanooga-tn': ["7 Best Dog Parks in Chattanooga, TN (2026 Guide) | Scoopy Doo", "The best dog parks in Chattanooga TN for 2026, including Barks and Tails, Greenway Farms, and Bark City, with verified hours and addresses."],
  '/blog/pooper-scooper-cost-chattanooga': ["How Much Does Pooper Scooper Service Cost? | Scoopy Doo", "Scoopy Doo weekly service starts at $20 per visit for one dog. 2026 pricing for weekly, every-other-week, and one-time pet waste removal in Chattanooga TN."],
};

// Routes that stay live and reachable but must never be indexed. Setting
// noindex only through <SEOHead noindex> is not enough: that runs in React, so
// the HTML the crawler is served has no robots tag at all. inject-seo.cjs reads
// this list and writes a real <meta name="robots"> into the built file.
// Keep these out of route-manifest.cjs (sitemap) and generate-llms.js too.
const noindex = [
  '/spring-special',
];

module.exports = { pages, noindex };
