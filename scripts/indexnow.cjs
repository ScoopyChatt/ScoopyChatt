#!/usr/bin/env node
'use strict';
// IndexNow: tells Bing (and other participating engines) that URLs changed.
//
//   node scripts/indexnow.cjs                 submit every URL in the live sitemap
//   node scripts/indexnow.cjs <url> [<url>]   submit just these URLs
//   node scripts/indexnow.cjs --dry-run ...   print what would be sent, send nothing
//
// The key is public by design: IndexNow proves ownership by fetching the key file from
// the site, so apps/web/public/<key>.txt must be live before any submission is accepted.
// Run this AFTER a deploy is live, never during the build (the key file and new pages
// would not be reachable yet). .github/workflows/indexnow.yml does that automatically.

const KEY = '8c4f7b7b75521dafd3f5b9192248e2b3';
const HOST = 'www.scoopychatt.com';
const BASE = 'https://' + HOST;
const KEY_LOCATION = BASE + '/' + KEY + '.txt';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry-run');
  let urls = args.filter((a) => a !== '--dry-run');

  if (!urls.length) {
    const res = await fetch(BASE + '/sitemap.xml');
    if (!res.ok) throw new Error('could not fetch sitemap.xml: HTTP ' + res.status);
    const xml = await res.text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  }
  urls = [...new Set(urls)].filter((u) => {
    try { return new URL(u).host === HOST; } catch (e) { return false; }
  });
  if (!urls.length) throw new Error('no URLs to submit');

  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : '';
  if (keyBody !== KEY) {
    throw new Error('key file at ' + KEY_LOCATION + ' is not live yet (HTTP ' + keyRes.status + '); deploy first');
  }

  console.log('IndexNow: ' + urls.length + ' URL(s)' + (dry ? ' [dry run]' : ''));
  if (dry) { urls.forEach((u) => console.log('  ' + u)); return; }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });
  // 200 = accepted, 202 = accepted pending key validation. Anything else is a failure.
  console.log('IndexNow response: HTTP ' + res.status + ' ' + (await res.text()).slice(0, 200));
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}

main().catch((e) => { console.error('IndexNow failed: ' + e.message); process.exit(1); });
