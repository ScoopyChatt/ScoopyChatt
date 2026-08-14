'use strict';
var fs = require('fs');
var path = require('path');
var stats = require('../config/review-stats.json');
var ROOT = path.join(__dirname, '..');
var count = String(stats.reviewCount);

var TARGETS = [
  { file: 'index.html', patterns: [
    [/("reviewCount":")\d+(")/g, '$1' + count + '$2']
  ]},
  { file: 'tools/inject-seo.cjs', patterns: [
    [/(\d+)(\+ Google reviews)/g, count + '$2'],
    [/("reviewCount":")\d+(")/g, '$1' + count + '$2'],
    [/(\d+)( five-star reviews)/g, count + '$2']
  ]},
  { file: 'tools/create-static-pages.cjs', patterns: [
    [/(\d+)(\+ Google reviews)/g, count + '$2'],
    [/(over )\d+( Google reviews)/g, '$1' + count + '$2'],
    [/(\d+)( Five-Star Reviews)/g, count + '$2'],
    [/(\d+)( five-star Google reviews)/g, count + '$2'],
    [/(has )\d+( five-star reviews)/g, '$1' + count + '$2']
  ]},
  { file: 'src/utils/schemaGenerators.js', patterns: [
    [/("reviewCount":\s*")\d+(")/g, '$1' + count + '$2']
  ]},
  { file: 'src/pages/HomePage.jsx', patterns: [
    [/(with )\d+(\+ Google reviews)/g, '$1' + count + '$2'],
    [/(more than )\d+( Google reviews)/g, '$1' + count + '$2']
  ]},
  { file: 'src/pages/PressPage.jsx', patterns: [
    [/(\d+)( five-star reviews)/g, count + '$2']
  ]},
  { file: 'src/pages/ComparisonPage.jsx', patterns: [
    [/(Scoopy Doo has )\d+( Google reviews)/g, '$1' + count + '$2'],
    [/(local father-daughter team; )\d+(")/g, '$1' + count + '$2']
  ]}
];

var changedFiles = [];
TARGETS.forEach(function (t) {
  var fp = path.join(ROOT, t.file);
  if (!fs.existsSync(fp)) return;
  var content = fs.readFileSync(fp, 'utf8');
  var original = content;
  t.patterns.forEach(function (p) {
    content = content.replace(p[0], p[1]);
  });
  if (content !== original) {
    fs.writeFileSync(fp, content, 'utf8');
    changedFiles.push(t.file);
  }
});

console.log('[sync-review-count] reviewCount=' + count + ' updated files: ' + (changedFiles.join(', ') || 'none'));
