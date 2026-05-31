#!/usr/bin/env node
// Post-build SEO injector: creates per-route HTML with correct meta tags
// Run after Vite build: node apps/web/tools/inject-seo.cjs

const fs = require('fs');
const path = require('path');
const BASE_URL = 'https://scoopychatt.com';

const routes = {
  '/services': { title: 'Pet Waste Removal Services in Chattanooga, TN | Scoopy Doo', desc: 'Weekly, bi-weekly & one-time dog poop removal in Chattanooga. See what Scoopy Doo offers and book today.' },
  '/near-me': { title: 'Pooper Scooper Service Near Me in Chattanooga, TN', desc: 'Looking for a pooper scooper service near you in Chattanooga? Scoopy Doo offers reliable local dog waste removal.' },
  '/one-time-cleanup': { title: 'One-Time Dog Poop Cleanup in Chattanooga, TN | Scoopy Doo', desc: 'Get a one-time dog poop cleanup in Chattanooga, TN. Perfect for spring cleaning or first-time service.' },
  '/dog-poop-removal-chattanooga': { title: 'Dog Poop Removal in Chattanooga, TN | Scoopy Doo LLC', desc: 'Professional dog poop removal in Chattanooga, TN. Dependable weekly service, fully insured.' },
  '/pet-waste-removal-chattanooga': { title: 'Pet Waste Removal in Chattanooga, TN | Scoopy Doo', desc: 'Expert pet waste removal in Chattanooga, TN for homes, HOAs & businesses. Request a free quote.' },
  '/dog-poop-scooping-chattanooga': { title: 'Dog Poop Scooping Service in Chattanooga, TN | Scoopy Doo', desc: 'Reliable dog poop scooping in Chattanooga, TN. Weekly and bi-weekly pooper scooper service.' },
  '/yard-cleanup-chattanooga': { title: 'Yard Cleanup for Pet Owners in Chattanooga, TN | Scoopy Doo', desc: 'Complete yard cleanup for pet owners in Chattanooga, TN. Book a one-time or recurring cleanup.' },
  '/service-areas': { title: 'Service Areas | Pet Waste Removal Around Chattanooga, TN', desc: 'Scoopy Doo serves Chattanooga and surrounding areas with dog waste removal.' },
  '/about': { title: 'About Scoopy Doo | Chattanooga Pet Waste Removal', desc: "Meet Scoopy Doo LLC, Chattanooga's locally owned pet waste removal company." },
  '/faq': { title: 'Pet Waste Removal FAQs | Scoopy Doo Chattanooga', desc: 'Answers to common questions about dog poop removal in Chattanooga: pricing, scheduling, and more.' },
  '/quote': { title: 'Get a Free Pet Waste Removal Quote | Chattanooga, TN', desc: "Get a fast, free quote for dog poop removal in Chattanooga, TN." },
  '/spring-special': { title: 'Spring Special: Buy 2 Months, Get 1 Free | Scoopy Doo', desc: 'Limited-time Chattanooga spring special from Scoopy Doo.' },
  '/podcast': { title: 'Scoopy Doo Founder on the Podcast | Chattanooga, TN', desc: "Hear the Scoopy Doo LLC founder share the story behind Chattanooga's pet waste removal service." },
  '/pet-safe-checklist': { title: 'Pet-Safe Yard Checklist | Scoopy Doo Chattanooga', desc: 'A free pet-safe yard checklist for Chattanooga dog owners.' },
  '/dog-park-guide': { title: 'Chattanooga Dog Park Guide for Dog Owners | Scoopy Doo', desc: "Discover Chattanooga's best dog parks. A local guide from the team at Scoopy Doo." },
  '/blog': { title: 'Pet Waste & Dog Care Blog | Scoopy Doo Chattanooga', desc: 'Tips on pet waste removal, yard health, and dog care for Chattanooga homeowners.' },
  '/privacy-policy': { title: 'Privacy Policy | Scoopy Doo LLC', desc: 'Privacy policy for Scoopy Doo LLC.' },
  '/terms-of-service': { title: 'Terms of Service | Scoopy Doo LLC', desc: 'Terms of service for Scoopy Doo LLC pet waste removal.' },
};

['hixson','red-bank','signal-mountain','ooltewah','east-brainerd','ringgold','cleveland','apison','collegedale','flintstone','highland-park','rossville','soddy-daisy','downtown'].forEach(loc => {
  const city = loc.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  routes['/service/' + loc] = { title: 'Pet Waste Removal in ' + city + ', TN | Scoopy Doo', desc: 'Professional dog poop removal in ' + city + ', TN. Weekly service available. Get your free quote.' };
});

['is-dog-waste-bad-for-lawn','best-pooper-scooper-services-chattanooga','spring-pet-care-checklist','why-chattanooga-homeowners-hiring-pet-waste-removal','pet-waste-removal-hoas-apartments-commercial-chattanooga'].forEach(slug => {
  routes['/blog/' + slug] = { title: slug.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ') + ' | Scoopy Doo', desc: 'Read the Scoopy Doo blog for tips on pet waste removal, yard care, and dog ownership in Chattanooga, TN.' };
});

const distDir = path.resolve(__dirname, '../../dist/apps/web');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
let count = 0;

for (const [route, meta] of Object.entries(routes)) {
  const canonical = BASE_URL + route;
  const html = template
    .replace(/<title>[^<]*<\/title>/, '<title>' + meta.title + '<\/title>')
    .replace(/<meta name="description" content="[^"]*"/, '<meta name="description" content="' + meta.desc + '"')
    .replace(/<link rel="canonical" href="[^"]*"/, '<link rel="canonical" href="' + canonical + '"')
    .replace(/<meta property="og:title" content="[^"]*"/, '<meta property="og:title" content="' + meta.title + '"')
    .replace(/<meta property="og:description" content="[^"]*"/, '<meta property="og:description" content="' + meta.desc + '"')
    .replace(/<meta property="og:url" content="[^"]*"/, '<meta property="og:url" content="' + canonical + '"');
  const dirPath = path.join(distDir, route);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'index.html'), html);
  count++;
}
console.log('SEO inject: ' + count + ' pages done.');
