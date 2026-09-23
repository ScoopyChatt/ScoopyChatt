// Per-city meta descriptions, read from src/data/locations.js so the React app,
// the prerendered HTML (inject-seo.cjs) and llms.txt (generate-llms.js) all use
// the same hand-written text instead of one template per city.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '../src/data/locations.js'), 'utf8');
const str = '("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')';
const re = new RegExp('slug:\\s*["\']([^"\']+)["\'][\\s\\S]*?seoDescription:\\s*' + str, 'g');

const descriptions = {};
let m;
// m[2] is a JS string literal from our own source file; evaluate it as one.
while ((m = re.exec(src))) descriptions[m[1]] = Function('return ' + m[2])();

module.exports = descriptions;
