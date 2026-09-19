#!/usr/bin/env node
'use strict';
// Builds a route -> {published, modified} date manifest from real sources, in
// priority order:
//   1. A datePublished/dateModified already recorded in the page's own source
//      (meta.datePublished, or a visible "Month D, YYYY" byline near the page's
//      Calendar/date UI).
//   2. Git commit history for that source file (first commit = published, last
//      commit = modified). This repo's clone is shallow, so for a file with no
//      commits inside the retained window, git has nothing real to offer - it is
//      skipped rather than reported as a fake "modified today" date.
//   3. If neither exists, the route is left out of the manifest. Callers must
//      fall back sensibly (no <lastmod>, no dateModified in schema) rather than
//      inventing a date - this is deliberate per the no-fabricated-dates rule.
//
// Output: apps/web/tools/page-dates.json, { "<route>": { "published": "YYYY-MM-DD", "modified": "YYYY-MM-DD" } }

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT = path.join(__dirname, '..', '..', '..');
const APP_JSX = path.join(__dirname, '..', 'src', 'App.jsx');
const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages');

function toISODate(iso) {
  return iso ? iso.slice(0, 10) : null;
}

function gitDates(absFilePath) {
  const rel = path.relative(REPO_ROOT, absFilePath);
  try {
    const log = execSync('git log --format=%cI -- ' + JSON.stringify(rel), { cwd: REPO_ROOT, encoding: 'utf8' }).trim();
    if (!log) return null;
    const dates = log.split('\n').filter(Boolean);
    return { published: toISODate(dates[dates.length - 1]), modified: toISODate(dates[0]) };
  } catch (e) {
    return null;
  }
}

// Try to find a real date already written into the page's own source.
function sourceDates(src) {
  var m = src.match(/datePublished:\s*["']([\d]{4}-[\d]{2}-[\d]{2})["']/);
  if (m) {
    var dm = src.match(/dateModified:\s*["']([\d]{4}-[\d]{2}-[\d]{2})["']/);
    return { published: m[1], modified: dm ? dm[1] : m[1] };
  }
  // Visible byline text like ">August 26, 2026<" near a date/Calendar UI element.
  var monthNames = 'January|February|March|April|May|June|July|August|September|October|November|December';
  var re = new RegExp('>\\s*(' + monthNames + ')\\s+(\\d{1,2}),\\s*(\\d{4})\\s*<');
  var vm = src.match(re);
  if (vm) {
    var monthIdx = monthNames.split('|').indexOf(vm[1]) + 1;
    var mm = String(monthIdx).padStart(2, '0');
    var dd = String(parseInt(vm[2], 10)).padStart(2, '0');
    var iso = vm[3] + '-' + mm + '-' + dd;
    return { published: iso, modified: iso };
  }
  // Abbreviated "Mon YYYY" byline near a Calendar icon, no day given - day
  // defaults to 01 since that is all the page itself discloses.
  var abbr = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec';
  var abbrIdx = { Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12 };
  var calRe = /<Calendar[\s\S]{0,120}?\/>[\s\S]{0,20}?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/;
  var cm = src.match(calRe);
  if (cm) {
    var mm2 = String(abbrIdx[cm[1]]).padStart(2, '0');
    var iso2 = cm[2] + '-' + mm2 + '-01';
    return { published: iso2, modified: iso2 };
  }
  return null;
}

function buildRouteFileMap() {
  const appSrc = fs.readFileSync(APP_JSX, 'utf8');
  const map = {};

  // React.lazy(() => import('@/pages/Foo.jsx')) assigned to ComponentName
  const lazyImports = {};
  const lazyRe = /const\s+(\w+)\s*=\s*React\.lazy\(\s*\(\)\s*=>\s*import\(['"]@\/pages\/([^'"]+)['"]\)\s*\)/g;
  let lm;
  while ((lm = lazyRe.exec(appSrc)) !== null) {
    lazyImports[lm[1]] = lm[2];
  }
  // Direct top-level imports: import Foo from '@/pages/Foo.jsx'
  const directRe = /^import\s+(\w+)\s+from\s+['"]@\/pages\/([^'"]+)['"]/gm;
  let dm2;
  while ((dm2 = directRe.exec(appSrc)) !== null) {
    lazyImports[dm2[1]] = dm2[2];
  }

  const routeRe = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)\s*\/>\}/g;
  let rm;
  while ((rm = routeRe.exec(appSrc)) !== null) {
    const routePath = rm[1];
    const component = rm[2];
    if (routePath.includes(':') || routePath === '*') continue;
    if (lazyImports[component]) {
      map[routePath] = path.join(PAGES_DIR, lazyImports[component]);
    }
  }
  return map;
}

// Guards against a very shallow CI clone (e.g. depth=1): if the repo only has a
// handful of commits visible, git log would report the same single date for
// almost every file, which is exactly the fake "everything changed today"
// problem this whole file exists to avoid. In that case, skip the git fallback
// entirely and rely only on dates the pages disclose themselves.
function gitHistoryLooksReliable() {
  try {
    const count = parseInt(execSync('git rev-list --count HEAD', { cwd: REPO_ROOT, encoding: 'utf8' }).trim(), 10);
    return count >= 5;
  } catch (e) {
    return false;
  }
}

function main() {
  const routeFileMap = buildRouteFileMap();
  const result = {};
  const trustGit = gitHistoryLooksReliable();
  let fromSource = 0, fromGit = 0, skipped = 0;

  for (const [route, filePath] of Object.entries(routeFileMap)) {
    if (!fs.existsSync(filePath)) { skipped++; continue; }
    const src = fs.readFileSync(filePath, 'utf8');
    let dates = sourceDates(src);
    if (dates) {
      fromSource++;
    } else if (trustGit) {
      dates = gitDates(filePath);
      if (dates) fromGit++;
      else { skipped++; continue; }
    } else {
      skipped++; continue;
    }
    result[route] = dates;
  }

  // City pages (/service/:slug) share one data file rather than their own route
  // in App.jsx, so they are not covered by the loop above. Stash its date under
  // a reserved key for generate-sitemap.cjs to use for all of them.
  if (trustGit) {
    const locationsFile = path.join(__dirname, '..', 'src', 'data', 'locations.js');
    if (fs.existsSync(locationsFile)) {
      const d = gitDates(locationsFile);
      if (d) result['__locations__'] = d;
    }
  }

  const outPath = path.join(__dirname, 'page-dates.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n');
  console.log('[page-dates] ' + Object.keys(result).length + ' routes dated (' + fromSource + ' from source, ' + fromGit + ' from git, ' + skipped + ' skipped - no reliable date found)' + (trustGit ? '' : ' [git history too shallow, git fallback disabled]'));
}

main();
