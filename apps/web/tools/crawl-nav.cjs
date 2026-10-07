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
  ['/quote', 'Get a free quote'],
];

const locations = loadLocations();
let html = '<nav aria-label="Site">' +
  '<ul>' + MAIN.map((l) => '<li><a href="' + l[0] + '">' + l[1] + '</a></li>').join('') + '</ul>' +
  '</nav>';
if (locations.length) {
  html += '<nav aria-label="Areas we serve"><h2>Areas We Serve</h2><ul>' +
    locations.map((l) => '<li><a href="/service/' + l.slug + '">Dog poop removal in ' + l.name + '</a></li>').join('') +
    '</ul></nav>';
}
// Site-wide guarantee line, matching the React footer.
const guarantee = require('../src/data/guarantee.json');
html += '<p><strong>' + guarantee.entity + ':</strong> ' + guarantee.short + '</p><p>' + guarantee.tagline + '</p>';
module.exports = html;
