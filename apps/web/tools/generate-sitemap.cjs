#!/usr/bin/env node
// Generates sitemap.xml into dist/apps/web/ at build time.
// Vercel serves static files before applying rewrites, so this takes precedence
// over the React SPA rewrite and gives Google real XML.
//
// Every URL listed here must be a route in src/App.jsx and must be allowed by the
// 404 middleware — tools/verify-routes.cjs checks that on every build. A sitemap
// URL with no matching route is what produced the 12 blog pages Google crawled as
// empty "undefined | Scoopy Doo" documents.
//
// No <lastmod>/<priority>: both were emitted as "today" for every URL on every
// deploy, which tells Google the entire site changed daily. An unreliable lastmod
// is worse than none, and Google has never used <priority>.

const fs = require('fs');
const path = require('path');

const { PAGES, SERVICE_AREAS, BLOG_POSTS } = require('./route-manifest.cjs');

const BASE = 'https://www.scoopychatt.com';

const urls = [
  ...PAGES,
  ...SERVICE_AREAS.map((slug) => '/service/' + slug),
  ...BLOG_POSTS.map((slug) => '/blog/' + slug),
].map((route) => BASE + (route === '/' ? '/' : route));

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const url of urls) {
  xml += '  <url>\n    <loc>' + escapeXml(url) + '</loc>\n  </url>\n';
}
xml += '</urlset>\n';

const distDir = path.join(process.cwd(), 'dist', 'apps', 'web');
if (!fs.existsSync(distDir)) {
  console.error('Sitemap generate: ' + distDir + ' does not exist - the web build did not run');
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log('Sitemap generated: ' + urls.length + ' URLs -> dist/apps/web/sitemap.xml');
