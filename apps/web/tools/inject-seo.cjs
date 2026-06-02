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
  '/blog/pet-waste-management-guide': ['The Complete Pet Waste Management Guide for Dog Owners | Scoopy Doo', 'Everything Chattanooga dog owners need about pet waste management — frequency, disposal, health risks, and professional service options.'],
  '/blog/how-often-scoop-dog-poop-chattanooga': ['How Often Should You Scoop Dog Poop in Chattanooga? | Scoopy Doo', 'Weekly scooping is the gold standard. Learn why cleanup frequency matters for lawn health and family safety in Chattanooga, TN.'],
  '/blog/spring-pet-care-checklist': ['Spring Pet Care Checklist for Chattanooga Dog Owners | Scoopy Doo', 'Spring in Chattanooga means wet yards hiding months of pet waste. Use this checklist to get your yard cleaned up and ready.'],
  '/blog/is-dog-waste-bad-for-lawn': ['Is Dog Waste Bad for Your Lawn? | Scoopy Doo Chattanooga', 'Yes — dog waste kills grass and damages soil. Learn what it does to your Chattanooga yard and how professional cleanup helps.'],
  '/blog/best-pooper-scooper-services-chattanooga': ['Best Pooper Scooper Services in Chattanooga, TN | Scoopy Doo', 'Looking for the best dog poop removal in Chattanooga? Online quotes, on-the-way texts, gate photo confirmation. No contracts.'],
  '/blog/is-dog-poop-hurting-your-chattanooga-yard': ['Is Dog Poop Hurting Your Chattanooga Yard? | Scoopy Doo', 'Dog waste damages grass and soil over time. Find out if your Chattanooga yard is being harmed and how Scoopy Doo can help.'],
  '/blog/chattanooga-pet-waste-removal-homeowners': ['Pet Waste Removal Guide for Chattanooga Homeowners | Scoopy Doo', 'A complete guide for Chattanooga homeowners on pet waste management — health risks, lawn damage, waterway protection, and professional service.'],
  '/blog/commercial-pet-waste-removal-chattanooga': ['Commercial Pet Waste Removal in Chattanooga, TN | Scoopy Doo', 'Professional pet waste removal for apartments, HOAs, and businesses in Chattanooga. Flexible scheduling, no contracts.'],
  '/blog/how-often-clean-yard': ['How Often Should You Clean Your Yard of Dog Waste? | Scoopy Doo', 'Weekly is the gold standard. Learn the right cleanup frequency based on your dog count, yard size, and Chattanooga season.'],
  '/blog/podcast-blog': ['Scoopy Doo on the Podcast | The Chattanooga Pet Waste Removal Story', 'Hear the Scoopy Doo LLC founder discuss starting a pet waste removal business in Chattanooga, TN.'],
  '/blog/signal-mountain': ['Pet Waste Removal Tips for Signal Mountain, TN | Scoopy Doo Blog', 'Scoopy Doo serves Signal Mountain with thorough yard cleanup. We handle larger lots and wooded terrain every week.'],
  '/blog/soddy-daisy': ['Pet Waste Removal in Soddy-Daisy, TN | Scoopy Doo Blog', 'Scoopy Doo serves Soddy-Daisy and Chickamauga Lake area homeowners. Waterfront cleanup protects the lake and your family.'],
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
  const html = injectMeta(template, title, desc, canonical);
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
