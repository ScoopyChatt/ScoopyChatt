// Puts the real article text into the prebuilt HTML of every blog post, and the real post
// list into /blog.
//
// This is a React SPA with no server rendering, so a crawler that does not run JavaScript
// (GPTBot, ClaudeBot, PerplexityBot) used to see only the H1, a one-line summary and the
// site nav on each post. This step renders each post's React component at build time and
// writes its article into dist/blog/<slug>/index.html, so the text a bot reads is exactly
// the text a visitor reads, and it cannot drift as posts are edited.
//
// Runs after inject-seo.cjs and create-static-pages.cjs (which own <head>), and only
// replaces what is inside #root. React replaces that markup on mount, as before.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HERE, '..');
const DIST = path.join(WEB, '..', '..', 'dist', 'apps', 'web');
const OUT = path.join(WEB, '.prerender');
const { BLOG_POSTS } = require('./route-manifest.cjs');
const CRAWL_NAV = require('./crawl-nav.cjs');

await build({
  configFile: path.join(WEB, 'vite.config.js'),
  root: WEB,
  logLevel: 'warn',
  publicDir: false,
  // Bundle every dependency so Node never has to resolve CommonJS/ESM interop itself.
  ssr: { noExternal: true },
  build: { ssr: path.join(WEB, 'src', 'prerender', 'entry.jsx'), outDir: OUT, emptyOutDir: true },
});
const { render } = await import(pathToFileURL(path.join(OUT, 'entry.js')).href);

// Keep only the text structure of the article. Classes, wrappers, icons, buttons and
// images go; headings, paragraphs, lists, tables, quotes and links stay. The result is
// flat markup with no <div>, which the other build steps rely on inside #root.
const KEEP = new Set(['h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'b', 'i',
  'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'dl', 'dt', 'dd', 'figcaption']);
function clean(html) {
  let s = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|svg|button|form|noscript|iframe|nav|select|textarea)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<(img|input|link|meta|source|hr)\b[^>]*>/gi, '');
  s = s.replace(/<\/?([a-zA-Z0-9]+)\b([^>]*)>/g, (m, tag, attrs) => {
    const t = tag.toLowerCase();
    if (!KEEP.has(t)) return ' ';
    if (m[1] === '/') return '</' + t + '>';
    if (t === 'a') {
      const href = (attrs.match(/\shref="([^"]*)"/) || [])[1];
      return href ? '<a href="' + href + '">' : '<a>';
    }
    return t === 'br' ? '<br>' : '<' + t + '>';
  });
  s = s.replace(/\s+/g, ' ')
    .replace(/<(p|li|h[1-4]|strong|em|a|td|th)>\s*<\/\1>/g, '')
    .replace(/<(ul|ol)>\s*<\/\1>/g, '')
    .replace(/\s*(<\/?(?:h[1-4]|p|ul|ol|li|table|thead|tbody|tr|blockquote|dl|dt|dd)>)\s*/g, '$1');
  return s.trim();
}

function articleOf(html) {
  // The post body: <main> where the page has one, else <article>, else the whole render.
  // Some posts put their H1 in a hero above <article>, so take the first that holds it.
  // <main> and <article> already leave out the site header and footer; the whole-render
  // fallback has them cut here. A post's own <header> (its title block) is kept.
  const pick = (tag) => {
    const a = html.indexOf('<' + tag);
    const b = html.lastIndexOf('</' + tag + '>');
    return a >= 0 && b > a ? html.slice(a, b) : null;
  };
  const whole = html.replace(/<(header|footer)\b[\s\S]*?<\/\1>/g, '');
  const parts = [pick('main'), pick('article'), whole].filter(Boolean);
  return parts.find((p) => /<h1\b/.test(p)) || parts[0];
}

// #root holds only flat markup today, but match the closing tag by counting divs anyway.
function replaceRoot(page, inner) {
  const open = '<div id="root">';
  const a = page.indexOf(open);
  if (a < 0) return null;
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = a + open.length;
  let depth = 1; let m;
  while ((m = re.exec(page))) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (depth === 0) return page.slice(0, a) + open + inner + page.slice(m.index);
  }
  return null;
}

// /blog too, so its prebuilt HTML carries the full list of post links, not just a heading.
const ROUTES = ['/blog'].concat(BLOG_POSTS.map((slug) => '/blog/' + slug));
let done = 0; const problems = [];
for (const route of ROUTES) {
  const file = path.join(DIST, route.slice(1), 'index.html');
  try {
    if (!fs.existsSync(file)) { problems.push(route + ': no prebuilt HTML'); continue; }
    const article = clean(articleOf(await render(route)));
    const h1s = (article.match(/<h1>/g) || []).length;
    const words = article.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    if (h1s !== 1 || words < 150) { problems.push(route + ': ' + h1s + ' h1, ' + words + ' words, kept old copy'); continue; }
    const page = fs.readFileSync(file, 'utf8');
    const crumb = (page.match(/<nav aria-label="breadcrumb">[\s\S]*?<\/nav>/) || [''])[0];
    const out = replaceRoot(page, crumb + article + CRAWL_NAV);
    if (!out) { problems.push(route + ': no #root'); continue; }
    fs.writeFileSync(file, out);
    done++;
  } catch (e) {
    problems.push(route + ': ' + e.message);
  }
}
fs.rmSync(OUT, { recursive: true, force: true });
console.log('[prerender] wrote full content for ' + done + ' of ' + ROUTES.length + ' blog pages');
// Warn-only, like verify-routes.cjs: a post that fails keeps its old summary, the deploy goes on.
for (const p of problems) console.warn('[prerender] WARNING ' + p);
process.exit(0);
