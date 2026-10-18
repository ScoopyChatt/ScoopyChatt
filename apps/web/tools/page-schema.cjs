'use strict';
// Page-level structured data for the static pages that carried only the site-wide
// LocalBusiness/WebSite schema: a WebPage node of the right kind (AboutPage, CollectionPage,
// ContactPage...) and a BreadcrumbList. Runs after inject-seo.cjs, create-static-pages.cjs
// and prerender.mjs, and only adds what a page is missing, so pages that already have their
// own page type or breadcrumbs are left alone.
const fs = require('fs');
const path = require('path');
const { PAGES } = require('./route-manifest.cjs');

const BASE = 'https://www.scoopychatt.com';
const DIST = path.join(__dirname, '..', '..', '..', 'dist', 'apps', 'web');

// Anything not listed is a plain WebPage.
const PAGE_TYPE = {
  '/about': 'AboutPage',
  '/blog': 'CollectionPage',
  '/service-areas': 'CollectionPage',
  '/press': 'CollectionPage',
  '/reviews': 'CollectionPage',
  '/quote': 'ContactPage',
};
// Types that already describe the page itself; a page with one of these gets no WebPage node.
const OWN_TYPES = new Set(['WebPage', 'AboutPage', 'CollectionPage', 'ContactPage', 'FAQPage',
  'ItemPage', 'Article', 'BlogPosting', 'NewsArticle', 'Blog']);
// Site-wide nodes that appear on every page and say nothing about this one.
const SITE_WIDE_IDS = new Set([BASE + '/#business', BASE + '/#website']);

const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'");
const ld = (o) => '<script type="application/ld+json">' + JSON.stringify(o) + '</' + 'script>';

function topTypes(html) {
  const types = new Set();
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j; try { j = JSON.parse(m[1]); } catch (e) { continue; }
    for (const node of [].concat(j['@graph'] || j)) {
      if (!node || SITE_WIDE_IDS.has(node['@id'])) continue;
      for (const t of [].concat(node['@type'] || [])) types.add(t);
    }
  }
  return types;
}

// The /blog page lists its posts as an ItemList, read from the prebuilt /blog HTML so it
// matches the visible list exactly.
function blogItems(html) {
  const items = [];
  const re = /<a href="(\/blog\/[^"]+)">[\s\S]*?<h2>([\s\S]*?)<\/h2>/g;
  let m;
  while ((m = re.exec(html))) {
    items.push({ '@type': 'ListItem', position: items.length + 1, url: BASE + m[1], name: dec(m[2].replace(/<[^>]+>/g, '')) });
  }
  return items;
}

let added = 0;
for (const route of PAGES) {
  if (route === '/') continue;
  const file = path.join(DIST, route.slice(1), 'index.html');
  if (!fs.existsSync(file)) { console.warn('[page-schema] WARNING no prebuilt HTML for ' + route); continue; }
  let html = fs.readFileSync(file, 'utf8');
  const types = topTypes(html);
  const title = dec((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = dec((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const url = BASE + route;
  const name = title.split(' | ')[0].trim();
  let extra = '';

  if (![...types].some((t) => OWN_TYPES.has(t))) {
    const page = {
      '@context': 'https://schema.org', '@type': PAGE_TYPE[route] || 'WebPage', '@id': url + '#webpage',
      url, name: title, description: desc, inLanguage: 'en-US',
      isPartOf: { '@id': BASE + '/#website' }, about: { '@id': BASE + '/#business' },
      breadcrumb: { '@id': url + '#breadcrumb' },
    };
    if (route === '/blog') {
      const items = blogItems(html);
      if (items.length) page.mainEntity = { '@type': 'ItemList', numberOfItems: items.length, itemListElement: items };
    }
    extra += ld(page);
  }
  if (!types.has('BreadcrumbList')) {
    extra += ld({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': url + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    });
  }
  if (!extra) continue;
  html = html.replace('</head>', extra + '</head>');
  fs.writeFileSync(file, html);
  added++;
}
console.log('[page-schema] added page schema or breadcrumbs to ' + added + ' pages');
