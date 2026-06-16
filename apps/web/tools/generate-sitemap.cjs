#!/usr/bin/env node
// Generates a static sitemap.xml into dist/apps/web/ at build time.
// Vercel serves static files before applying rewrites, so this takes
// precedence over the React SPA rewrite and gives Google real XML.

const fs = require('fs');
const path = require('path');

try {
const BASE = 'https://www.scoopychatt.com';
const today = new Date().toISOString().split('T')[0];

const urls = [
  // Core pages
  { loc: BASE + '/',                               priority: '1.0', changefreq: 'weekly'  },
  { loc: BASE + '/services',                       priority: '0.9', changefreq: 'monthly' },
  { loc: BASE + '/quote',                          priority: '0.9', changefreq: 'monthly' },
  { loc: BASE + '/faq',                            priority: '0.8', changefreq: 'monthly' },
  { loc: BASE + '/about',                          priority: '0.7', changefreq: 'monthly' },
  { loc: BASE + '/service-areas',                  priority: '0.8', changefreq: 'monthly' },
  { loc: BASE + '/near-me',                        priority: '0.8', changefreq: 'monthly' },
  { loc: BASE + '/one-time-cleanup',               priority: '0.8', changefreq: 'monthly' },
  { loc: BASE + '/how-it-works',                   priority: '0.7', changefreq: 'monthly' },
  { loc: BASE + '/dog-poop-removal-chattanooga',   priority: '0.9', changefreq: 'monthly' },
  { loc: BASE + '/pet-waste-removal-chattanooga',  priority: '0.9', changefreq: 'monthly' },
  { loc: BASE + '/dog-poop-scooping-chattanooga',  priority: '0.8', changefreq: 'monthly' },
  { loc: BASE + '/yard-cleanup-chattanooga',       priority: '0.8', changefreq: 'monthly' },
  { loc: BASE + '/spring-special',                 priority: '0.6', changefreq: 'monthly' },
  { loc: BASE + '/pet-safe-checklist',             priority: '0.6', changefreq: 'monthly' },
  { loc: BASE + '/dog-park-guide',                 priority: '0.6', changefreq: 'monthly' },
  { loc: BASE + '/privacy-policy',                 priority: '0.3', changefreq: 'yearly'  },
  { loc: BASE + '/terms-of-service',               priority: '0.3', changefreq: 'yearly'  },

  // Location pages
  ...['chattanooga','hixson','red-bank','signal-mountain','ooltewah','east-brainerd',
      'soddy-daisy','east-ridge','lookout-mountain','downtown','highland-park',
      'cleveland','apison','collegedale','ringgold','rossville','flintstone','fort-oglethorpe'
  ].map(loc => ({ loc: BASE + '/service/' + loc, priority: '0.8', changefreq: 'monthly' })),

  // Blog listing
  { loc: BASE + '/blog', priority: '0.8', changefreq: 'weekly' },

  // Blog posts
  ...([
    'dog-poop-cleanup-chattanooga-summer-heat',
    'how-often-scoop-dog-poop-chattanooga',
    'is-dog-poop-hurting-your-chattanooga-yard',
    'chattanooga-pet-waste-removal-homeowners',
    'commercial-pet-waste-removal-chattanooga',
    'is-dog-waste-bad-for-lawn',
    'best-pooper-scooper-services-chattanooga',
    'professional-waste-removal-benefits',
    'health-risks-of-pet-waste',
    'lawn-health-and-pet-waste',
    'health-benefits-yard-cleanup',
    'diy-vs-professional',
    'seasonal-pet-care-tips',
    'pet-waste-management-guide',
    'how-often-clean-yard',
    'spring-pet-care-checklist',
    'signal-mountain',
    'soddy-daisy',
  ].map(slug => ({ loc: BASE + '/blog/' + slug, priority: '0.7', changefreq: 'monthly' }))),
  '/blog/pooper-scooper-cost-chattanooga',
  '/blog/pet-waste-removal-north-georgia',
];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const url of urls) {
  xml += '  <url>\n';
  xml += '    <loc>' + escapeXml(url.loc) + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>' + url.changefreq + '</changefreq>\n';
  xml += '    <priority>' + url.priority + '</priority>\n';
  xml += '  </url>\n';
}
xml += '</urlset>';

const distDir = path.join(process.cwd(), 'dist', 'apps', 'web');
if (!fs.existsSync(distDir)) {
  console.log('Sitemap generate: dist not found, skipping');
  process.exit(0);
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log('Static sitemap generated: ' + urls.length + ' URLs -> dist/apps/web/sitemap.xml');
} catch (e) {
  console.error('Sitemap generate warning:', e.message);
  process.exit(0);
}
