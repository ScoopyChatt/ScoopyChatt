#!/usr/bin/env node
'use strict';
// Compares what each page says in its raw HTML (what a non-JS crawler reads) with what the
// browser shows after React runs (what Google indexes and visitors see): title, meta
// description, canonical, and duplicate head tags. Uses a real Chromium.
//
//   node scripts/meta-check.cjs --base http://localhost:4173 --capture
//       Writes apps/web/tools/rendered-meta.json from the rendered pages. inject-seo.cjs and
//       create-static-pages.cjs then use those values for the raw HTML, so the two agree.
//   node scripts/meta-check.cjs --base https://www.scoopychatt.com
//       Verifies without writing. Exits 1 on any mismatch or duplicate tag.
//
// Needs playwright-core and a Chromium (set CHROMIUM_PATH if it is not on the default path):
//   npm i --no-save playwright-core
//   (local) cd dist/apps/web && python3 -m http.server 4173
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const BASE = (arg('--base', 'http://localhost:4173')).replace(/\/$/, '');
const CAPTURE = args.includes('--capture');
const SNAP = path.join(__dirname, '..', 'apps', 'web', 'tools', 'rendered-meta.json');
const BASE_HOST = BASE.includes('localhost');

const dec = (s) => (s == null ? s : s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim());
const norm = (u) => (u || '').replace(/\/$/, '');

(async () => {
  const sm = await (await fetch(BASE + '/sitemap.xml')).text();
  const routes = [...sm.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
  const ctx = await browser.newContext();
  if (BASE_HOST) await ctx.route('**/*', (r) => (/localhost/.test(r.request().url()) ? r.continue() : r.abort()));
  const snap = {}; const problems = [];
  for (const r of routes) {
    const url = BASE + r + (r.endsWith('/') ? '' : '/');
    const rawHtml = await (await fetch(url)).text();
    const g = (re) => dec((rawHtml.match(re) || [])[1] || null);
    const raw = { title: g(/<title>([\s\S]*?)<\/title>/), desc: g(/<meta name="description" content="([^"]*)"/), canon: g(/<link rel="canonical" href="([^"]*)"/) };
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(1500);
    const live = await page.evaluate(() => {
      const q = (s) => document.head.querySelectorAll(s).length;
      return { title: document.title, desc: document.head.querySelector('meta[name=description]')?.content || null,
        canon: document.head.querySelector('link[rel=canonical]')?.href || null,
        dup: { description: q('meta[name=description]'), canonical: q('link[rel=canonical]'), ogTitle: q('meta[property="og:title"]'), ogUrl: q('meta[property="og:url"]') } };
    });
    await page.close();
    snap[r] = { title: live.title, description: live.desc };
    if (raw.title !== live.title) problems.push(['title', r, raw.title, live.title]);
    if (raw.desc !== live.desc) problems.push(['description', r, raw.desc, live.desc]);
    if (norm(raw.canon) !== norm(live.canon)) problems.push(['canonical', r, raw.canon, live.canon]);
    Object.entries(live.dup).forEach(([k, v]) => { if (v > 1) problems.push(['duplicate ' + k, r, v, '']); });
  }
  await browser.close();
  if (CAPTURE) {
    fs.writeFileSync(SNAP, JSON.stringify(snap, null, 2) + '\n');
    console.log('captured rendered title/description for ' + routes.length + ' routes -> ' + path.relative(process.cwd(), SNAP));
    return;
  }
  console.log(routes.length + ' routes checked, ' + problems.length + ' problem(s)');
  problems.slice(0, 60).forEach((p) => console.log('  ' + JSON.stringify(p)));
  if (problems.length) process.exit(1);
})().catch((e) => { console.error(e.message); process.exit(2); });
