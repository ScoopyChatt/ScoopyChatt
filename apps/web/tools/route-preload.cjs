'use strict';
// Adds <link rel="modulepreload"> for each prerendered page's own JS chunks.
//
// Every page component is React.lazy() in App.jsx, so a visitor's browser used to fetch
// them in a waterfall: HTML, then the main bundle, and only once that had downloaded and
// run, the ~20 small chunks the page itself needs. The page's hero (its LCP element) can't
// render until that second wave lands, which on a slow phone connection is most of the LCP.
// Preloading the route's chunks from the HTML lets them download alongside the main bundle.
//
// Reads Vite's build manifest (vite.config.js sets build.manifest) and deletes it after,
// so it is not served publicly. Runs after every step that rewrites dist HTML.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, '..', '..', 'dist', 'apps', 'web');
const MANIFEST = path.join(DIST, '.vite', 'manifest.json');

if (!fs.existsSync(MANIFEST)) {
  console.warn('[route-preload] no build manifest at ' + MANIFEST + ', skipping');
  process.exit(0);
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

// Component name -> source file, from `const X = React.lazy(() => import('@/...'))`.
const app = fs.readFileSync(path.join(ROOT, 'src', 'App.jsx'), 'utf8');
const lazyFile = {};
for (const m of app.matchAll(/const\s+(\w+)\s*=\s*(?:React\.)?lazy\(\s*\(\)\s*=>\s*import\(\s*['"]@\/([^'"]+)['"]\s*\)\s*\)/g)) {
  lazyFile[m[1]] = 'src/' + m[2];
}
// Route path -> source file, from `<Route path="..." element={<X />} />`.
const routes = [];
for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)) {
  if (lazyFile[m[2]]) routes.push({ path: m[1], file: lazyFile[m[2]] });
}
function routeFile(urlPath) {
  const exact = routes.find((r) => r.path === urlPath);
  if (exact) return exact.file;
  const param = routes.find((r) => {
    if (!r.path.includes('/:')) return false;
    const re = new RegExp('^' + r.path.replace(/:[^/]+/g, '[^/]+') + '$');
    return re.test(urlPath);
  });
  return param ? param.file : null;
}

const entry = Object.values(manifest).find((c) => c.isEntry);
// Chunks the entry already pulls in statically; Vite preloads those itself.
const entryChunks = new Set();
(function collect(key) {
  const c = manifest[key];
  if (!c || entryChunks.has(c.file)) return;
  entryChunks.add(c.file);
  (c.imports || []).forEach(collect);
})(Object.keys(manifest).find((k) => manifest[k] === entry));

function chunksFor(srcFile) {
  const out = [];
  const seen = new Set();
  (function walk(key) {
    const c = manifest[key];
    if (!c || seen.has(key)) return;
    seen.add(key);
    if (!entryChunks.has(c.file)) out.push(c.file);
    (c.imports || []).forEach(walk);
  })(srcFile);
  return out;
}

function htmlFiles(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'assets' && !e.name.startsWith('.')) out = out.concat(htmlFiles(p)); }
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

let count = 0;
for (const file of htmlFiles(DIST)) {
  const rel = path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
  const urlPath = rel ? '/' + rel : '/';
  const src = routeFile(urlPath);
  if (!src || !manifest[src]) continue;
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('data-route-preload')) continue;
  const links = chunksFor(src)
    .map((f) => '<link rel="modulepreload" crossorigin href="/' + f + '" data-route-preload />')
    .join('');
  if (!links) continue;
  html = html.replace('</head>', links + '</head>');
  fs.writeFileSync(file, html);
  count++;
}

fs.rmSync(path.join(DIST, '.vite'), { recursive: true, force: true });
console.log('[route-preload] added route chunk preloads to ' + count + ' pages');
