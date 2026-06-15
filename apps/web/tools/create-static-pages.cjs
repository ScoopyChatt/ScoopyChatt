'use strict';
var fs = require('fs');
var path = require('path');
var DIST = path.join(__dirname, '..', '..', '..', 'dist', 'apps', 'web');
var logs = [];
function log(msg) { logs.push(msg); console.log(msg); }
log('DIST=' + DIST);
log('exists=' + fs.existsSync(DIST));
var distIndex = path.join(DIST, 'index.html');
log('index exists=' + fs.existsSync(distIndex));
var compDir = path.join(DIST, 'comparison');
log('compDir=' + compDir);
log('compDir exists before=' + fs.existsSync(compDir));
try {
  fs.mkdirSync(compDir, { recursive: true });
  log('mkdirSync ok');
} catch(e) { log('mkdirSync ERROR: ' + e.message); }
try {
  fs.writeFileSync(path.join(compDir, 'index.html'), '<html><head><title>CSP TEST comparison</title></head><body><h1>CSP test comparison page</h1></body></html>');
  log('writeFileSync ok');
} catch(e) { log('writeFileSync ERROR: ' + e.message); }
var faqDir = path.join(DIST, 'faq');
log('faqDir exists=' + fs.existsSync(faqDir));
try {
  fs.writeFileSync(path.join(faqDir, 'index.html'), '<html><head><title>CSP TEST faq</title></head><body><h1>CSP test faq page</h1></body></html>');
  log('faq write ok');
} catch(e) { log('faq write ERROR: ' + e.message); }
logs.push('done');
fs.writeFileSync(path.join(DIST, 'csp-log.txt'), logs.join('\n'));