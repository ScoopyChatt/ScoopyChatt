#!/usr/bin/env node
// Cross-checks the route manifest against src/App.jsx and middleware.js.
//
// Three separate lists have to agree for a page to work: React Router has to have a
// route (or the page renders an empty template), the sitemap has to list it (or Google
// never sees it), and the 404 middleware has to allow it (or it answers 404). They
// drifted before — 12 sitemap URLs had no route and were crawled as blank pages — so
// the build now reports any mismatch.
//
// Warn-only by design: a stale list should never block a deploy that is otherwise fine.

const fs = require('fs');
const path = require('path');
const { PAGES, SERVICE_AREAS, BLOG_POSTS } = require('./route-manifest.cjs');

const webDir = path.join(__dirname, '..');
const repoRoot = path.join(webDir, '..', '..');

const sitemapRoutes = new Set([
  ...PAGES,
  ...SERVICE_AREAS.map((s) => '/service/' + s),
  ...BLOG_POSTS.map((s) => '/blog/' + s),
]);

const appSource = fs.readFileSync(path.join(webDir, 'src', 'App.jsx'), 'utf8');
const appRoutes = new Set(
  [...appSource.matchAll(/path="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((p) => p !== '*' && !p.includes(':') && p !== '/sitemap.xml')
);
// /service/:slug and /blog/:slug render from data files, so their slugs count as routed.
if (/path="\/service\/:slug"/.test(appSource)) SERVICE_AREAS.forEach((s) => appRoutes.add('/service/' + s));

const middlewareSource = fs.readFileSync(path.join(repoRoot, 'middleware.js'), 'utf8');
const allowed = new Set([
  ...[...middlewareSource.matchAll(/'(\/[^']*)'/g)].map((m) => m[1]),
  ...[...middlewareSource.matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]),
]);
function middlewareAllows(route) {
  if (allowed.has(route)) return true;
  const slug = route.replace(/^\/(blog|service)\//, '');
  return slug !== route && allowed.has(slug);
}

const problems = [];
for (const route of sitemapRoutes) {
  if (!appRoutes.has(route)) problems.push('in sitemap but has no route in App.jsx: ' + route);
  if (!middlewareAllows(route)) problems.push('in sitemap but middleware would 404 it: ' + route);
}
for (const route of appRoutes) {
  if (!middlewareAllows(route)) problems.push('routed in App.jsx but middleware would 404 it: ' + route);
}

if (problems.length) {
  console.warn('Route check: ' + problems.length + ' problem(s)');
  problems.forEach((p) => console.warn('  - ' + p));
} else {
  console.log('Route check: ' + sitemapRoutes.size + ' sitemap URLs, ' + appRoutes.size + ' app routes, all consistent');
}
