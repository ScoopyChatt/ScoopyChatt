#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

// FAQ data for the keyword landing pages. Kept in sync with the visible
// FAQAccordion content on each page so the FAQPage schema matches what users see.
const landingFaqs = {
  '/dog-poop-removal-chattanooga': [
    { question: "How much does dog poop removal cost in Chattanooga?", answer: "Weekly dog poop removal starts at $20 per visit for your first dog, with twice-weekly service from $16 per visit and bi-weekly from $28. One-time cleanups start at $75. Each additional dog is a small add-on. You will see an exact price before you commit." },
    { question: "How often should I schedule dog poop removal?", answer: "Most one and two dog homes do best with weekly visits, which keeps bacteria and odor in check and protects your lawn. Busy or multi-dog yards often prefer twice-weekly service, while smaller dogs or larger lots can work well bi-weekly." },
    { question: "Do I need to be home for service?", answer: "No. As long as we can safely access your yard, you do not need to be there. We send an on-the-way text before every visit and a photo of your secured gate when we finish." },
    { question: "What if my yard has not been cleaned in a while?", answer: "No problem. We start with a one-time initial cleanup to get your yard back to a clean baseline, then keep it that way on your regular schedule." },
    { question: "Is there a contract?", answer: "Never. There are no contracts and you can pause or cancel anytime. You stay because your yard is always clean, not because you are locked in." }
  ],
  '/pet-waste-removal-chattanooga': [
    { question: "Do you offer pet waste removal for HOAs and apartment communities?", answer: "Yes. We provide common-area pet waste removal for HOAs, condos, and apartment communities, and we can install and restock pet waste stations. Request a custom community quote and we will tailor a plan to your property." },
    { question: "How do you price homes with multiple dogs?", answer: "Our base rates cover your first dog, with a small add-on per additional pet to account for the extra waste and time. You will always see the full price before you commit." },
    { question: "Is pet waste really a health risk?", answer: "Yes. Pet waste can carry roundworms, hookworms, giardia, and E. coli that affect both pets and people, and it pollutes local waterways. Regular removal is the simplest way to reduce that risk." },
    { question: "How do you dispose of the waste?", answer: "We bag the waste and haul it away for responsible, eco-friendly disposal. Nothing is left behind in your cans unless you prefer it that way." },
    { question: "Do you sanitize between properties?", answer: "Yes. We sanitize our equipment between yards so we never carry bacteria from one property to the next, keeping every visit safe and hygienic." }
  ],
  '/dog-poop-scooping-chattanooga': [
    { question: "What does a dog poop scooping visit include?", answer: "A full grid-walk of your yard, scooping and bagging all waste, hauling it away for eco-friendly disposal, an on-the-way text before we arrive, and a photo of your secured gate when we finish." },
    { question: "Do you scoop in the rain?", answer: "Yes. We service on your scheduled day, rain or shine, so your yard stays clean no matter the weather." },
    { question: "Will you close my gate?", answer: "Always. We are careful with gates and pets on every visit, and we send you a photo of the secured gate when the job is done." },
    { question: "What if I have a large or wooded yard?", answer: "We grid-walk your yard regardless of size and quote based on the space and number of dogs, so you get a fair, accurate price." },
    { question: "Can I change my schedule later?", answer: "Anytime. There are no contracts and no penalties. You can adjust, pause, or cancel your scooping schedule whenever you need to." }
  ],
  '/yard-cleanup-chattanooga': [
    { question: "How much does a one-time yard cleanup cost in Chattanooga?", answer: "One-time dog waste yard cleanups start at $75 and are quoted based on your yard size and how much waste has accumulated. You will get an exact price before we begin." },
    { question: "My yard is really bad. Is that a problem?", answer: "Not at all. Heavily overdue yards are exactly what one-time cleanups are for. We grid-walk the whole space and get it back to a clean baseline in a single visit." },
    { question: "Do I have to sign up for recurring service?", answer: "No. The cleanup is fully standalone. If you would like to keep the results, ongoing weekly or bi-weekly service is one click away, with no contracts." },
    { question: "How long does a cleanup take?", answer: "It depends on yard size and buildup, but most one-time cleanups are completed in a single same-day visit." },
    { question: "Where does the waste go?", answer: "We bag everything and haul it away for responsible, eco-friendly disposal. Nothing is left behind." }
  ]
};

function buildFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };
}

function faqScriptTag(faqs) {
  // Escape "<" to avoid any chance of breaking out of the <script> element.
  const json = JSON.stringify(buildFaqSchema(faqs)).replace(/</g, '\\u003c');
  return '<script type="application/ld+json">' + json + '</script>';
}

(async () => {
try {
const BASE = 'https://www.scoopychatt.com';
const distDir = path.join(process.cwd(), 'dist', 'apps', 'web');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.log('SEO inject: dist/apps/web/index.html not found, skipping (build cache active)');
  process.exit(0);
}

const template = fs.readFileSync(templatePath, 'utf-8');

const routes = {
  '/': ['Dog Poop Removal & Pooper Scooper Service | Chattanooga TN', 'Professional dog poop removal & pooper scooper service in Chattanooga, TN. Reliable weekly pet waste cleanup. Get your free quote from Scoopy Doo today.'],
  '/services': ['Pet Waste Removal Services in Chattanooga, TN | Scoopy Doo', 'Weekly, bi-weekly & one-time dog poop removal in Chattanooga. See what Scoopy Doo offers and book today.'],
  '/near-me': ['Pooper Scooper Service Near Me in Chattanooga, TN', 'Looking for a pooper scooper service near you in Chattanooga? Scoopy Doo offers reliable local dog waste removal.'],
  '/one-time-cleanup': ['One-Time Dog Poop Cleanup in Chattanooga, TN | Scoopy Doo', 'Get a one-time dog poop cleanup in Chattanooga, TN. Perfect for spring cleaning or first-time service.'],
  '/how-it-works': ['How It Works | Scoopy Doo Pet Waste Removal Chattanooga', 'Easy online quotes, secure online payment, on-the-way texts, and gate photo proof after every visit. Working with Scoopy Doo is simple.'],
  '/dog-poop-removal-chattanooga': ['Dog Poop Removal in Chattanooga, TN | Scoopy Doo LLC', 'Professional dog poop removal in Chattanooga, TN. Dependable weekly service, fully insured.'],
  '/pet-waste-removal-chattanooga': ['Pet Waste Removal in Chattanooga, TN | Scoopy Doo', 'Expert pet waste removal in Chattanooga, TN for homes, HOAs & businesses. Request a free quote.'],
  '/dog-poop-scooping-chattanooga': ['Dog Poop Scooping Service in Chattanooga, TN | Scoopy Doo', 'Reliable dog poop scooping in Chattanooga, TN. Weekly and bi-weekly pooper scooper service.'],
  '/yard-cleanup-chattanooga': ['Yard Cleanup for Pet Owners in Chattanooga, TN | Scoopy Doo', 'Complete yard cleanup for pet owners in Chattanooga, TN. Book a one-time or recurring cleanup.'],
  '/service-areas': ['Service Areas | Pet Waste Removal Around Chattanooga, TN', 'Scoopy Doo serves Chattanooga and surrounding areas. See the neighborhoods we cover.'],
  '/about': ['About Scoopy Doo | Chattanooga Pet Waste Removal', "Meet Scoopy Doo LLC, Chattanooga's locally owned pet waste removal company."],
  '/faq': ['Pet Waste Removal FAQs | Scoopy Doo Chattanooga', 'Answers to common questions about dog poop removal in Chattanooga: pricing, scheduling, and more.'],
  '/quote': ['Get a Free Pet Waste Removal Quote | Chattanooga, TN', 'Get a fast, free quote for dog poop removal in Chattanooga, TN.'],
  '/spring-special': ['Spring Special: Buy 2 Months, Get 1 Free | Scoopy Doo', 'Limited-time Chattanooga spring special from Scoopy Doo.'],
  '/pet-safe-checklist': ['Pet-Safe Yard Checklist | Scoopy Doo Chattanooga', 'A free pet-safe yard checklist for Chattanooga dog owners.'],
  '/dog-park-guide': ['Chattanooga Dog Park Guide for Dog Owners | Scoopy Doo', "Discover Chattanooga's best dog parks. A local guide from Scoopy Doo."],
  '/blog': ['Pet Waste & Dog Care Blog | Scoopy Doo Chattanooga', 'Tips on pet waste removal, yard health, and dog care for Chattanooga homeowners.'],
  '/privacy-policy': ['Privacy Policy | Scoopy Doo LLC', 'Privacy policy for Scoopy Doo LLC.'],
  '/terms-of-service': ['Terms of Service | Scoopy Doo LLC', 'Terms of service for Scoopy Doo LLC pet waste removal.'],
  '/blog/professional-waste-removal-benefits': ['Benefits of Professional Pet Waste Removal | Scoopy Doo Chattanooga', 'Why professional dog waste removal is safer and more thorough than DIY. Scoopy Doo serves Chattanooga and surrounding areas weekly.'],
  '/blog/seasonal-pet-care-tips': ['Seasonal Pet Care Tips for Chattanooga Dog Owners | Scoopy Doo', 'Keep your yard clean and safe year-round with seasonal pet waste tips from Scoopy Doo LLC in Chattanooga, TN.'],
  '/blog/health-benefits-yard-cleanup': ['Health Benefits of Regular Yard Cleanup for Pet Owners | Scoopy Doo', 'Regular dog waste removal protects your family from bacteria and parasites. Learn why weekly cleanup matters for Chattanooga homeowners.'],
  '/blog/customer-success-stories': ['Customer Success Stories | Scoopy Doo Pet Waste Removal Chattanooga', 'Real stories from Chattanooga homeowners and HOAs who rely on Scoopy Doo for weekly pet waste removal.'],
  '/blog/diy-vs-professional': ['DIY vs Professional Dog Waste Removal | Scoopy Doo Chattanooga', 'Compare DIY pet waste cleanup to professional pooper scooper service in Chattanooga, TN. See which option saves time and money.'],
  '/blog/lawn-health-and-pet-waste': ['How Pet Waste Affects Your Lawn Health | Scoopy Doo Chattanooga', 'Dog waste kills grass and harms soil. Learn how regular professional cleanup protects your Chattanooga lawn from long-term damage.'],
  '/blog/health-risks-of-pet-waste': ['Health Risks of Unmanaged Pet Waste | Scoopy Doo Chattanooga', 'Dog waste carries bacteria, hookworms, roundworms, and giardia. Learn the health risks and how Scoopy Doo protects Chattanooga families.'],
  '/blog/pet-waste-management-guide': ['The Complete Pet Waste Management Guide for Dog Owners | Scoopy Doo', 'Everything Chattanooga dog owners need about pet waste management â frequency, disposal, health risks, and professional service options.'],
  '/blog/how-often-scoop-dog-poop-chattanooga': ['How Often Should You Scoop Dog Poop in Chattanooga? | Scoopy Doo', 'Weekly scooping is the gold standard. Learn why cleanup frequency matters for lawn health and family safety in Chattanooga, TN.'],
  '/blog/spring-pet-care-checklist': ['Spring Pet Care Checklist for Chattanooga Dog Owners | Scoopy Doo', 'Spring in Chattanooga means wet yards hiding months of pet waste. Use this checklist to get your yard cleaned up and ready.'],
  '/blog/is-dog-waste-bad-for-lawn': ['Is Dog Waste Bad for Your Lawn? | Scoopy Doo Chattanooga', 'Yes â dog waste kills grass and damages soil. Learn what it does to your Chattanooga yard and how professional cleanup helps.'],
  '/blog/best-pooper-scooper-services-chattanooga': ['Best Pooper Scooper Services in Chattanooga, TN | Scoopy Doo', 'Looking for the best dog poop removal in Chattanooga? Online quotes, on-the-way texts, gate photo confirmation. No contracts.'],
  '/blog/is-dog-poop-hurting-your-chattanooga-yard': ['Is Dog Poop Hurting Your Chattanooga Yard? | Scoopy Doo', 'Dog waste damages grass and soil over time. Find out if your Chattanooga yard is being harmed and how Scoopy Doo can help.'],
  '/blog/chattanooga-pet-waste-removal-homeowners': ['Pet Waste Removal Guide for Chattanooga Homeowners | Scoopy Doo', 'A complete guide for Chattanooga homeowners on pet waste management â health risks, lawn damage, waterway protection, and professional service.'],
  '/blog/commercial-pet-waste-removal-chattanooga': ['Commercial Pet Waste Removal in Chattanooga, TN | Scoopy Doo', 'Professional pet waste removal for apartments, HOAs, and businesses in Chattanooga. Flexible scheduling, no contracts.'],
  '/blog/how-often-clean-yard': ['How Often Should You Clean Your Yard of Dog Waste? | Scoopy Doo', 'Weekly is the gold standard. Learn the right cleanup frequency based on your dog count, yard size, and Chattanooga season.'],
  '/blog/podcast-blog': ['Scoopy Doo on the Podcast | The Chattanooga Pet Waste Removal Story', 'Hear the Scoopy Doo LLC founder discuss starting a pet waste removal business in Chattanooga, TN.'],
  '/blog/signal-mountain': ['Pet Waste Removal Tips for Signal Mountain, TN | Scoopy Doo Blog', 'Scoopy Doo serves Signal Mountain with thorough yard cleanup. We handle larger lots and wooded terrain every week.'],
  '/blog/soddy-daisy': ['Pet Waste Removal in Soddy-Daisy, TN | Scoopy Doo Blog', 'Scoopy Doo serves Soddy-Daisy and Chickamauga Lake area homeowners. Waterfront cleanup protects the lake and your family.'],
  '/blog/best-dog-parks-chattanooga-tn': ['7 Best Dog Parks in Chattanooga, TN (2026 Guide) | Scoopy Doo', 'Discover the 7 best dog parks in Chattanooga, TN for 2026 — off-leash areas, addresses, hours, amenities, and tips for keeping your yard clean.'],
};

const gaLocations = new Set(['ringgold','rossville','flintstone','fort-oglethorpe']);
const locationPages = [
  'chattanooga','hixson','red-bank','signal-mountain','ooltewah','east-brainerd',
  'soddy-daisy','cleveland','apison','collegedale','highland-park','downtown',
  'east-ridge','lookout-mountain',
  'ringgold','rossville','flintstone','fort-oglethorpe'
];
locationPages.forEach(loc => {
  const city = loc.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  const state = gaLocations.has(loc) ? 'GA' : 'TN';
  routes['/service/' + loc] = [
    'Dog Poop Removal ' + city + ' ' + state + ' | Scoopy Doo',
    'Professional pet waste removal in ' + city + ', ' + state + '. Weekly & bi-weekly pooper scooper service. Get your free quote today.'
  ];
});

// Build the map of routes that should receive FAQPage JSON-LD.
const faqByRoute = Object.assign({}, landingFaqs);

// Pull the canonical /faq questions from the source data so the schema stays
// in sync with the visible FAQ content. Non-fatal if it cannot be loaded.
try {
  const faqDataUrl = pathToFileURL(path.join(__dirname, '..', 'src', 'data', 'faqData.js')).href;
  const faqMod = await import(faqDataUrl);
  if (faqMod && typeof faqMod.getFaqData === 'function') {
    const sections = faqMod.getFaqData('Chattanooga');
    const allFaqs = sections.flatMap(s => s.faqs);
    if (allFaqs.length) {
      faqByRoute['/faq'] = allFaqs;
    }
  }
} catch (e) {
  console.error('SEO inject: could not load faqData for /faq schema:', e.message);
}

function injectMeta(html, title, desc, canonical) {
  return html
    .replace(/<title>[^<]*<\/title>/, '<title>' + title + '<\/title>')
    .replace(/(<meta name="description" content=")[^"]*(")/,'$1' + desc + '$2')
    .replace(/(<link rel="canonical" href=")[^"]*(")/,'$1' + canonical + '$2')
    .replace(/(<meta property="og:title" content=")[^"]*(")/,'$1' + title + '$2')
    .replace(/(<meta property="og:description" content=")[^"]*(")/,'$1' + desc + '$2')
    .replace(/(<meta property="og:url" content=")[^"]*(")/,'$1' + canonical + '$2')
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/,'$1' + title + '$2')
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/,'$1' + desc + '$2');
}

let count = 0;
for (const [route, [title, desc]] of Object.entries(routes)) {
  const canonical = BASE + route;
  let html = injectMeta(template, title, desc, canonical);
  if (faqByRoute[route]) {
    html = html.replace('</head>', '    ' + faqScriptTag(faqByRoute[route]) + '\n  </head>');
  }
  const dirPath = path.join(distDir, route);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'index.html'), html);
  count++;
}
console.log('SEO inject complete: ' + count + ' pages.');
} catch(e) {
  console.error('SEO inject warning:', e.message);
  process.exit(0);
}
})();
