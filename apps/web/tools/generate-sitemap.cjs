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
// <lastmod> used to be emitted as "today" for every URL on every deploy, which
// tells Google the entire site changed daily - an unreliable lastmod is worse
// than none, so it was removed entirely. It is back now, sourced from real dates
// (see generate-page-dates.cjs, which must run before this script): the page's
// own recorded publish/update date where the source discloses one, otherwise
// this repo's git history for that page's source file. A route with no reliable
// date in page-dates.json gets no <lastmod> tag at all rather than a guess.
// No <priority> - Google has never used it.

const fs = require('fs');
const path = require('path');

const { PAGES, SERVICE_AREAS, BLOG_POSTS } = require('./route-manifest.cjs');

const BASE = 'https://www.scoopychatt.com';

const pageDatesPath = path.join(__dirname, 'page-dates.json');
const pageDates = fs.existsSync(pageDatesPath) ? JSON.parse(fs.readFileSync(pageDatesPath, 'utf8')) : {};
const LOCATIONS_LASTMOD = pageDates.__locations__ ? pageDates.__locations__.modified : null;

const routes = [
  ...PAGES,
  ...SERVICE_AREAS.map((slug) => '/service/' + slug),
  ...BLOG_POSTS.map((slug) => '/blog/' + slug),
];

function lastmodFor(route) {
  if (pageDates[route]) return pageDates[route].modified;
  if (route.indexOf('/service/') === 0) return LOCATIONS_LASTMOD;
  return null;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const route of routes) {
  const url = BASE + (route === '/' ? '/' : route);
  const lastmod = lastmodFor(route);
  xml += '  <url>\n    <loc>' + escapeXml(url) + '</loc>\n';
  if (lastmod) xml += '    <lastmod>' + lastmod + '</lastmod>\n';
  xml += '  </url>\n';
}
xml += '</urlset>\n';

const distDir = path.join(process.cwd(), 'dist', 'apps', 'web');
if (!fs.existsSync(distDir)) {
  console.error('Sitemap generate: ' + distDir + ' does not exist - the web build did not run');
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log('Sitemap generated: ' + routes.length + ' URLs -> dist/apps/web/sitemap.xml');
