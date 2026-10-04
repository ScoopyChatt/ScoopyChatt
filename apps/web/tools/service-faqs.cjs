'use strict';
// Prerendered HTML for the extra Q&A blocks in src/data/serviceFaqs.js (see ServiceFaqSection.jsx).
const fs = require('fs');
const path = require('path');

let data = {};
try {
  const src = fs.readFileSync(path.join(__dirname, '../src/data/serviceFaqs.js'), 'utf8')
    .replace('export const serviceFaqs =', 'module.exports =');
  const mod = { exports: null };
  Function('module', src)(mod);
  data = mod.exports || {};
} catch (e) {
  console.warn('[service-faqs] could not load serviceFaqs.js: ' + e.message);
}
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

module.exports = function faqHtml(route) {
  const block = data[route];
  if (!block) return '';
  return '<h2>' + esc(block.heading) + '</h2>' +
    block.items.map((f) => '<h3>' + esc(f.q) + '</h3><p>' + esc(f.a) + '</p>').join('');
};
