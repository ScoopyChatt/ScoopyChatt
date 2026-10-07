'use strict';
// The No-Poop-Left-Behind Guarantee for the prerendered HTML. Wording comes from
// src/data/guarantee.json, the same file the React components read, so the crawlable
// copy, the FAQPage schema and what visitors see can never say different things.
const guarantee = require('../src/data/guarantee.json');

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Short one-liner, matching <GuaranteeBadge />.
const badgeHtml = '<p><strong>' + esc(guarantee.entity) + ':</strong> ' + esc(guarantee.short) + '</p>';

// Full wording under its own heading, matching <GuaranteeBanner />. The <div> keeps the
// heading and text from reading as an <h2>question</h2><p>answer</p> pair, which the FAQ
// schema extractors in inject-seo.cjs and create-static-pages.cjs would otherwise pick up.
function bannerHtml(withTagline) {
  return '<h2>' + esc(guarantee.name) + '</h2><div><p>' + esc(guarantee.full) + '</p>' +
    (withTagline ? '<p>' + esc(guarantee.tagline) + '</p>' : '') + '</div>';
}

// The FAQ entry as visible Q&A, in the <h2>question</h2><p>answer</p> shape the
// /faq schema extractor reads.
const faqHtml = '<h2>' + esc(guarantee.faq.question) + '</h2><p>' + esc(guarantee.faq.answer) + '</p>';

const faqQuestion = {
  '@type': 'Question',
  name: guarantee.faq.question,
  acceptedAnswer: { '@type': 'Answer', text: guarantee.faq.answer }
};

// Append the guarantee question to every FAQPage JSON-LD block in an HTML string,
// unless that block already has it.
function addFaqToSchema(html) {
  return html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, function (all, open, body, close) {
    let data;
    try { data = JSON.parse(body); } catch (e) { return all; }
    if (!data || data['@type'] !== 'FAQPage' || !Array.isArray(data.mainEntity)) return all;
    if (data.mainEntity.some(function (q) { return q && q.name === guarantee.faq.question; })) return all;
    data.mainEntity.push(faqQuestion);
    return open + JSON.stringify(data) + close;
  });
}

module.exports = { guarantee, badgeHtml, bannerHtml, faqHtml, addFaqToSchema };
