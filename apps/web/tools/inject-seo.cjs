#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

try {
const BASE = 'https://www.scoopychatt.com';
const distDir = path.join(process.cwd(), 'dist', 'apps', 'web');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.log('SEO inject: dist/apps/web/index.html not found, skipping (build cache active)');
  process.exit(0);
}

const template = fs.readFileSync(templatePath, 'utf-8');

// Static content for AI crawlers injected before </body>.
// React mounts to #root and renders on top; crawlers (no JS) read this directly.
const SC = {
  '/': '<main><h1>Dog Poop Removal &amp; Pooper Scooper Service in Chattanooga, TN</h1><p>Scoopy Doo LLC is a locally owned professional dog poop removal and pooper scooper service in Chattanooga, TN. We offer weekly, bi-weekly, one-time, commercial, and HOA pet waste cleanup 7 days a week in Chattanooga TN and North Georgia. Every visit includes an on-the-way text notification and a gate photo confirmation. No contracts required.</p><h2>Services</h2><ul><li>Weekly dog poop removal</li><li>Bi-weekly pooper scooper service</li><li>One-time yard cleanup</li><li>Commercial pet waste removal</li><li>HOA common area cleanup</li></ul><h2>Service Areas</h2><p>Chattanooga TN, Hixson TN, Red Bank TN, Signal Mountain TN, Ooltewah TN, East Brainerd TN, Soddy-Daisy TN, Cleveland TN, East Ridge TN, Lookout Mountain TN, Ringgold GA, Rossville GA, Flintstone GA, Fort Oglethorpe GA.</p><p>Father-daughter locally owned team. Fully insured. No contracts. Free quote at scoopychatt.com/quote.</p></main>',
  '/services': '<main><h1>Pet Waste Removal Services in Chattanooga, TN</h1><p>Scoopy Doo offers professional pet waste removal for homes, businesses, and HOAs in Chattanooga TN and North Georgia.</p><h2>Weekly Dog Poop Removal</h2><p>Most popular service. A technician visits once per week, removes all dog waste, texts on the way, and sends a gate photo after each visit. Pricing based on yard size and number of dogs -- free quote at scoopychatt.com/quote.</p><h2>Bi-Weekly Pooper Scooper Service</h2><p>Every two weeks. Ideal for smaller yards or fewer dogs.</p><h2>One-Time Yard Cleanup</h2><p>Single deep-clean visit. Perfect for spring cleanup, before a party, or as a first visit. Book at scoopychatt.com/one-time-cleanup.</p><h2>Commercial Pet Waste Removal</h2><p>Regular scheduled service for apartment complexes, dog parks, and businesses.</p><h2>HOA Common Area Cleanup</h2><p>Scheduled pet waste removal for shared green spaces and common areas.</p><p>All services include on-the-way texts and gate photo confirmation. No contracts.</p></main>',
  '/faq': '<main><h1>Pet Waste Removal FAQs -- Scoopy Doo Chattanooga</h1><h2>How much does dog poop removal cost in Chattanooga?</h2><p>Pricing depends on yard size, number of dogs, and frequency. Scoopy Doo provides free custom quotes at scoopychatt.com/quote -- no phone call required. No contracts or commitments.</p><h2>Do you serve North Georgia?</h2><p>Yes. Scoopy Doo serves Ringgold GA, Rossville GA, Flintstone GA, and Fort Oglethorpe GA in addition to Chattanooga and surrounding Tennessee cities.</p><h2>How often should I have my yard scooped?</h2><p>Weekly is the gold standard. It prevents waste buildup, protects your lawn from nitrogen damage, and eliminates bacteria and parasite risk.</p><h2>What happens during a Scoopy Doo visit?</h2><p>Your technician texts on the way so you can unlock the gate. They scoop all dog waste, bag and remove it, then send a gate photo confirmation. You never need to be home.</p><h2>Are there contracts?</h2><p>No. No long-term contracts. Pause or cancel service at any time.</p><h2>Is Scoopy Doo insured?</h2><p>Yes. Scoopy Doo LLC is fully insured.</p><h2>What areas do you serve?</h2><p>Chattanooga TN, Hixson TN, Red Bank TN, Signal Mountain TN, Ooltewah TN, East Brainerd TN, Soddy-Daisy TN, Cleveland TN, East Ridge TN, Lookout Mountain TN, Ringgold GA, Rossville GA, Flintstone GA, Fort Oglethorpe GA.</p></main>',
  '/service-areas': '<main><h1>Scoopy Doo Service Areas -- Chattanooga TN and North Georgia</h1><p>Scoopy Doo provides weekly, bi-weekly, and one-time dog poop removal across Chattanooga TN and surrounding communities.</p><h2>Tennessee</h2><ul><li>Chattanooga, TN</li><li>Hixson, TN</li><li>Red Bank, TN</li><li>Signal Mountain, TN</li><li>Ooltewah, TN</li><li>East Brainerd, TN</li><li>Soddy-Daisy, TN</li><li>Cleveland, TN</li><li>East Ridge, TN</li><li>Lookout Mountain, TN</li></ul><h2>North Georgia</h2><ul><li>Ringgold, GA</li><li>Rossville, GA</li><li>Flintstone, GA</li><li>Fort Oglethorpe, GA</li></ul><p>Free quote at scoopychatt.com/quote.</p></main>',
  '/about': '<main><h1>About Scoopy Doo -- Chattanooga Pet Waste Removal</h1><p>Scoopy Doo LLC is a locally owned, father-daughter pet waste removal company based in Chattanooga, TN. We provide reliable, professional pooper scooper service with on-the-way texts and gate photo confirmation after every visit. Fully insured. 7 days a week. No contracts.</p><p>We serve Chattanooga TN, Hixson, Red Bank, Signal Mountain, Ooltewah, East Brainerd, Soddy-Daisy, Cleveland, East Ridge, Lookout Mountain, and North Georgia including Ringgold, Rossville, Flintstone, and Fort Oglethorpe.</p><p>Free quote at scoopychatt.com/quote.</p></main>',
  '/how-it-works': '<main><h1>How Scoopy Doo Works -- Pet Waste Removal in Chattanooga</h1><p>Getting started is simple. No phone calls, no contracts.</p><h2>Step 1: Get a Free Online Quote</h2><p>Visit scoopychatt.com/quote, enter your address, yard size, and number of dogs, and get a custom quote online.</p><h2>Step 2: Choose Your Service</h2><p>Pick weekly, bi-weekly, or one-time service. All pricing is transparent, no long-term contracts.</p><h2>Step 3: We Come to You</h2><p>Your technician texts on the way so you can unlock the gate. We scoop all dog waste, bag and remove it. You never need to be home.</p><h2>Step 4: Gate Photo Confirmation</h2><p>After every visit we send a gate photo so you know exactly when we were there and the job is done.</p></main>',
  '/one-time-cleanup': '<main><h1>One-Time Dog Poop Cleanup in Chattanooga, TN</h1><p>Scoopy Doo offers one-time yard cleanups for Chattanooga TN and North Georgia homeowners -- no recurring service or contracts required.</p><h2>When to Book a One-Time Cleanup</h2><ul><li>Spring cleaning -- clear out winter waste buildup</li><li>Before a backyard party or event</li><li>First-time service to reset your yard</li><li>Move-in or move-out cleanup</li><li>After a long vacation</li></ul><p>Includes on-the-way text and gate photo confirmation. Free quote at scoopychatt.com/quote.</p></main>',
  '/near-me': '<main><h1>Pooper Scooper Service Near Me in Chattanooga, TN</h1><p>Scoopy Doo is a locally owned pet waste removal company serving Chattanooga TN and surrounding areas. Weekly, bi-weekly, and one-time dog poop removal with on-the-way texts and gate photo confirmation. No contracts. Free quote at scoopychatt.com/quote.</p><p>Service areas: Chattanooga, Hixson, Red Bank, Signal Mountain, Ooltewah, East Brainerd, Soddy-Daisy, Cleveland, East Ridge, Lookout Mountain (TN), Ringgold, Rossville, Flintstone, Fort Oglethorpe (GA).</p></main>',
  '/dog-poop-removal-chattanooga': '<main><h1>Dog Poop Removal in Chattanooga, TN</h1><p>Scoopy Doo LLC provides professional dog poop removal in Chattanooga, TN. Weekly, bi-weekly, and one-time pooper scooper service for homes, HOAs, and businesses. On-the-way text notifications and gate photo confirmation. Fully insured. No contracts. Free quote at scoopychatt.com/quote.</p></main>',
  '/pet-waste-removal-chattanooga': '<main><h1>Pet Waste Removal in Chattanooga, TN</h1><p>Scoopy Doo offers expert pet waste removal in Chattanooga, TN for homes, HOAs, and businesses. Weekly, bi-weekly, one-time, commercial, and HOA dog poop removal. On-the-way texts, gate photo confirmation, no contracts. Free quote at scoopychatt.com/quote.</p></main>',
  '/dog-poop-scooping-chattanooga': '<main><h1>Dog Poop Scooping Service in Chattanooga, TN</h1><p>Reliable dog poop scooping in Chattanooga, TN by Scoopy Doo LLC. Weekly and bi-weekly pooper scooper service with on-the-way texts and gate photo confirmation. No contracts. Free quote at scoopychatt.com/quote.</p></main>',
  '/yard-cleanup-chattanooga': '<main><h1>Yard Cleanup for Pet Owners in Chattanooga, TN</h1><p>Scoopy Doo provides complete yard cleanup for pet owners in Chattanooga, TN. One-time or recurring cleanup. On-the-way texts and gate photo confirmation. No contracts. Free quote at scoopychatt.com/quote.</p></main>',
};


// Extra JSON-LD schema blocks injected per route (in addition to LocalBusiness in index.html)
const SCHEMA = {
  '/faq': "<script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"How much does dog poop removal cost in Chattanooga?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Pricing depends on yard size, number of dogs, and service frequency. Scoopy Doo provides free custom quotes online at scoopychatt.com/quote. No contracts required.\"}},{\"@type\":\"Question\",\"name\":\"Does Scoopy Doo serve North Georgia?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Scoopy Doo serves Ringgold GA, Rossville GA, Flintstone GA, and Fort Oglethorpe GA in addition to Chattanooga TN and surrounding Tennessee communities.\"}},{\"@type\":\"Question\",\"name\":\"How often should I have my yard scooped?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Weekly service is the gold standard for most yards. It prevents waste buildup, protects your lawn from nitrogen damage, and eliminates bacteria and parasite risk.\"}},{\"@type\":\"Question\",\"name\":\"What happens during a Scoopy Doo visit?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Your technician texts you on the way so you can unlock the gate. They scoop all dog waste, bag and remove it, then send a gate photo confirmation when finished. You never need to be home.\"}},{\"@type\":\"Question\",\"name\":\"Are there contracts?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"No. Scoopy Doo has no long-term contracts. You can pause or cancel service at any time.\"}},{\"@type\":\"Question\",\"name\":\"Is Scoopy Doo insured?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Scoopy Doo LLC is fully insured.\"}},{\"@type\":\"Question\",\"name\":\"Do I need to be home during service?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"No. You just need the gate accessible. Scoopy Doo texts when on the way and sends a gate photo after each visit as confirmation.\"}},{\"@type\":\"Question\",\"name\":\"What areas does Scoopy Doo serve?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Scoopy Doo serves Chattanooga TN, Hixson TN, Red Bank TN, Signal Mountain TN, Ooltewah TN, East Brainerd TN, Soddy-Daisy TN, Cleveland TN, East Ridge TN, Lookout Mountain TN, Ringgold GA, Rossville GA, Flintstone GA, and Fort Oglethorpe GA.\"}}]}</script>",
  '/services': "<script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"Service\",\"serviceType\":\"Pet Waste Removal\",\"provider\":{\"@type\":\"ProfessionalService\",\"name\":\"Scoopy Doo LLC\",\"url\":\"https://www.scoopychatt.com\"},\"areaServed\":[{\"@type\":\"City\",\"name\":\"Chattanooga\"},{\"@type\":\"City\",\"name\":\"Hixson\"},{\"@type\":\"City\",\"name\":\"Red Bank\"},{\"@type\":\"City\",\"name\":\"Signal Mountain\"},{\"@type\":\"City\",\"name\":\"Ooltewah\"},{\"@type\":\"City\",\"name\":\"East Brainerd\"},{\"@type\":\"City\",\"name\":\"Soddy-Daisy\"},{\"@type\":\"City\",\"name\":\"Cleveland\"},{\"@type\":\"City\",\"name\":\"East Ridge\"},{\"@type\":\"City\",\"name\":\"Lookout Mountain\"},{\"@type\":\"City\",\"name\":\"Ringgold\"},{\"@type\":\"City\",\"name\":\"Rossville\"},{\"@type\":\"City\",\"name\":\"Flintstone\"},{\"@type\":\"City\",\"name\":\"Fort Oglethorpe\"}],\"hasOfferCatalog\":{\"@type\":\"OfferCatalog\",\"name\":\"Pet Waste Removal Services\",\"itemListElement\":[{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"Weekly Dog Poop Removal\",\"description\":\"Weekly scheduled pooper scooper service with on-the-way texts and gate photo confirmation.\"}},{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"Bi-Weekly Pooper Scooper Service\",\"description\":\"Every two weeks pet waste removal for residential yards.\"}},{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"One-Time Yard Cleanup\",\"description\":\"Single deep-clean visit for spring cleaning, events, or first-time service.\"}},{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"Commercial Pet Waste Removal\",\"description\":\"Regular scheduled service for apartments, dog parks, and businesses.\"}},{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"HOA Common Area Cleanup\",\"description\":\"Scheduled pet waste removal for shared green spaces and HOA common areas.\"}}]}}</script>"
};
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
  '/blog/professional-waste-removal-benefits': ['Benefits of Professional Pet Waste Removal | Scoopy Doo Chattanooga', 'Why professional dog waste removal is safer and more thorough than DIY.'],
  '/blog/seasonal-pet-care-tips': ['Seasonal Pet Care Tips for Chattanooga Dog Owners | Scoopy Doo', 'Keep your yard clean and safe year-round with seasonal pet waste tips from Scoopy Doo LLC.'],
  '/blog/health-benefits-yard-cleanup': ['Health Benefits of Regular Yard Cleanup for Pet Owners | Scoopy Doo', 'Regular dog waste removal protects your family from bacteria and parasites.'],
  '/blog/customer-success-stories': ['Customer Success Stories | Scoopy Doo Pet Waste Removal Chattanooga', 'Real stories from Chattanooga homeowners and HOAs who rely on Scoopy Doo.'],
  '/blog/diy-vs-professional': ['DIY vs Professional Dog Waste Removal | Scoopy Doo Chattanooga', 'Compare DIY pet waste cleanup to professional pooper scooper service in Chattanooga, TN.'],
  '/blog/lawn-health-and-pet-waste': ['How Pet Waste Affects Your Lawn Health | Scoopy Doo Chattanooga', 'Dog waste kills grass and harms soil. Learn how regular professional cleanup protects your lawn.'],
  '/blog/health-risks-of-pet-waste': ['Health Risks of Unmanaged Pet Waste | Scoopy Doo Chattanooga', 'Dog waste carries bacteria, hookworms, roundworms, and giardia.'],
  '/blog/pet-waste-management-guide': ['The Complete Pet Waste Management Guide for Dog Owners | Scoopy Doo', 'Everything Chattanooga dog owners need about pet waste management.'],
  '/blog/how-often-scoop-dog-poop-chattanooga': ['How Often Should You Scoop Dog Poop in Chattanooga? | Scoopy Doo', 'Weekly scooping is the gold standard for lawn health and family safety.'],
  '/blog/spring-pet-care-checklist': ['Spring Pet Care Checklist for Chattanooga Dog Owners | Scoopy Doo', 'Clear winter waste buildup and get your yard ready for spring.'],
  '/blog/is-dog-waste-bad-for-lawn': ['Is Dog Waste Bad for Your Lawn? | Scoopy Doo Chattanooga', 'Dog waste kills grass and damages soil. Learn how professional cleanup helps.'],
  '/blog/best-pooper-scooper-services-chattanooga': ['Best Pooper Scooper Services in Chattanooga, TN | Scoopy Doo', 'Online quotes, on-the-way texts, gate photo confirmation. No contracts.'],
  '/blog/is-dog-poop-hurting-your-chattanooga-yard': ['Is Dog Poop Hurting Your Chattanooga Yard? | Scoopy Doo', 'Dog waste damages grass and soil over time.'],
  '/blog/chattanooga-pet-waste-removal-homeowners': ['Pet Waste Removal Guide for Chattanooga Homeowners | Scoopy Doo', 'Complete guide on pet waste management for Chattanooga homeowners.'],
  '/blog/commercial-pet-waste-removal-chattanooga': ['Commercial Pet Waste Removal in Chattanooga, TN | Scoopy Doo', 'Pet waste removal for apartments, HOAs, and businesses. Flexible scheduling, no contracts.'],
  '/blog/how-often-clean-yard': ['How Often Should You Clean Your Yard of Dog Waste? | Scoopy Doo', 'Learn the right cleanup frequency for your yard size and dog count.'],
  '/blog/podcast-blog': ['Scoopy Doo on the Podcast | The Chattanooga Pet Waste Removal Story', 'Hear the Scoopy Doo LLC founder discuss starting a pet waste removal business.'],
  '/blog/signal-mountain': ['Pet Waste Removal Tips for Signal Mountain, TN | Scoopy Doo Blog', 'Scoopy Doo serves Signal Mountain with thorough yard cleanup every week.'],
  '/blog/soddy-daisy': ['Pet Waste Removal in Soddy-Daisy, TN | Scoopy Doo Blog', 'Scoopy Doo serves Soddy-Daisy and Chickamauga Lake area homeowners.'],
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
  SC['/service/' + loc] = '<main><h1>Dog Poop Removal in ' + city + ', ' + state + ' | Scoopy Doo</h1>' +
    '<p>Scoopy Doo LLC provides professional dog poop removal and pooper scooper service in ' + city + ', ' + state + '. ' +
    'We offer weekly, bi-weekly, and one-time pet waste cleanup. Every visit includes an on-the-way text notification and a gate photo confirmation. No contracts required.</p>' +
    '<p>Get a free quote at scoopychatt.com/quote or see all service areas at scoopychatt.com/service-areas.</p></main>';
});

// Use string concatenation to build tag strings -- avoids any slash-escaping issues
const BODY_CLOSE = '<' + '/body>';
const DIV_CLOSE = '<' + '/div>';

function injectMeta(html, title, desc, canonical, staticHtml, schemaHtml) {
  let result = html
    .replace(/<title>[^<]*<\/title>/, '<title>' + title + '<' + '/title>')
    .replace(/(<meta name="description" content=")[^"]*(")/,'$1' + desc + '$2')
    .replace(/(<link rel="canonical" href=")[^"]*(")/,'$1' + canonical + '$2')
    .replace(/(<meta property="og:title" content=")[^"]*(")/,'$1' + title + '$2')
    .replace(/(<meta property="og:description" content=")[^"]*(")/,'$1' + desc + '$2')
    .replace(/(<meta property="og:url" content=")[^"]*(")/,'$1' + canonical + '$2')
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/,'$1' + title + '$2')
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/,'$1' + desc + '$2');
  if (schemaHtml) {
    result = result.replace('</head>', schemaHtml + '</head>');
  }
  if (staticHtml) {
    result = result.replace(BODY_CLOSE,
      '<div id="scoopy-content" style="display:none" aria-hidden="true">' + staticHtml + DIV_CLOSE + BODY_CLOSE
    );
  }
  return result;
}

let count = 0;
for (const [route, [title, desc]] of Object.entries(routes)) {
  const canonical = BASE + route;
  const staticHtml = SC[route] || '';
  const schemaHtml = SCHEMA[route] || '';
  const html = injectMeta(template, title, desc, canonical, staticHtml, schemaHtml);
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
