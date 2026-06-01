#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

try {
const BASE = 'https://scoopychatt.com';
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
