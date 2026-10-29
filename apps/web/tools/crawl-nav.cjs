'use strict';
// Site-wide links for the prerendered HTML. The React header and footer only exist after
// JavaScript runs, so a crawler that does not run it saw pages with no links at all.
// This block is appended inside #root on every prerendered page; React replaces it on mount.
// City names come from src/data/locations.js so the list cannot drift from the real pages.
const fs = require('fs');
const path = require('path');

function loadLocations() {
  try {
    const src = fs.readFileSync(path.join(__dirname, '../src/data/locations.js'), 'utf8')
      .replace('export const locations =', 'module.exports =');
    const mod = { exports: null };
    Function('module', src)(mod);
    return mod.exports;
  } catch (e) {
    console.warn('[crawl-nav] could not load locations.js: ' + e.message);
    return [];
  }
}

const MAIN = [
  ['/', 'Home'],
  ['/services', 'Pet waste removal services'],
  ['/pricing', 'Pricing'],
  ['/commercial', 'Commercial, HOA and apartment service'],
  ['/service-areas', 'Service areas'],
  ['/how-it-works', 'How it works'],
  ['/about', 'About Scoopy Doo LLC'],
  ['/reviews', 'Reviews'],
  ['/faq', 'FAQ'],
  ['/comparison', 'Compare pet waste removal companies'],
  ['/guides/how-to-choose-pet-waste-removal-company-chattanooga', 'How to choose a pet waste removal company'],
  ['/blog', 'Blog'],
  ['/press', 'Press'],
  ['/contact', 'Contact us'],
  ['/quote', 'Get a free quote'],
];

// Service and offer pages. These had no links in the prebuilt HTML at all, so to a crawler
// that does not run JavaScript they existed only in the sitemap.
const SERVICES = [
  ['/dog-poop-removal-chattanooga', 'Dog poop removal in Chattanooga'],
  ['/pet-waste-removal-chattanooga', 'Pet waste removal in Chattanooga'],
  ['/dog-poop-scooping-chattanooga', 'Dog poop scooping in Chattanooga'],
  ['/yard-cleanup-chattanooga', 'Yard cleanup in Chattanooga'],
  ['/one-time-cleanup', 'One-time yard cleanup'],
  ['/first-scoop-free', 'First scoop free'],
  ['/cost-calculator', 'Cost calculator'],
  ['/near-me', 'Pooper scooper near me'],
  ['/doggy-doors', 'Doggy door installation'],
  ['/podcast', 'Podcast'],
  ['/pet-safe-checklist', 'Pet-safe yard checklist'],
  ['/dog-park-guide', 'Chattanooga dog park guide'],
];
const LEGAL = [
  ['/privacy-policy', 'Privacy policy'],
  ['/terms-of-service', 'Terms of service'],
];
const list = (links) => '<ul>' + links.map((l) => '<li><a href="' + l[0] + '">' + l[1] + '</a></li>').join('') + '</ul>';

const locations = loadLocations();
let html = '<nav aria-label="Site">' + list(MAIN) + '</nav>' +
  '<nav aria-label="Services"><h2>Services</h2>' + list(SERVICES) + '</nav>';
if (locations.length) {
  html += '<nav aria-label="Areas we serve"><h2>Areas We Serve</h2><ul>' +
    locations.map((l) => '<li><a href="/service/' + l.slug + '">Dog poop removal in ' + l.name + '</a></li>').join('') +
    '</ul></nav>';
}
// Site-wide guarantee line, matching the React footer.
const guarantee = require('../src/data/guarantee.json');
html += '<nav aria-label="Legal">' + list(LEGAL) + '</nav>';
// Name and phone on every page, matching the schema (consistent NAP for local search).
html += '<p>Scoopy Doo LLC, pet waste removal in Chattanooga and North Georgia. Call or text <a href="tel:+14236005040">423-600-5040</a>.</p>';
html += '<p><strong>' + guarantee.entity + ':</strong> ' + guarantee.short + '</p><p>' + guarantee.tagline + '</p>';
module.exports = html;
