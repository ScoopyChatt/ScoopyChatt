#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

// Static manifest approach: no JSX parsing, no encoding issues.
// Title/description pairs come from seo-page-manifest.cjs (shared with
// inject-seo.cjs) so a rewrite there doesn't leave llms.txt stale.
// Excluded: OAuth callback routes and utility routes.

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { pages: manifestPages } = require(path.join(__dirname, "seo-page-manifest.cjs"));

const SUMMARY =
  "Scoopy Doo LLC is a locally owned pet waste removal company serving Chattanooga, TN " +
  "and surrounding areas including Hixson, Red Bank, Signal Mountain, Ooltewah, East Brainerd, " +
  "Soddy-Daisy, East Ridge, Lookout Mountain (TN), and Ringgold, Rossville, " +
  "Flintstone, and Fort Oglethorpe (GA). Services include weekly, bi-weekly, one-time, " +
  "commercial, and HOA dog poop removal and yard cleanup. Every visit includes on-the-way " +
  "text notifications and a gate photo confirmation. Scoopy Doo LLC is a BBB Accredited Business "  +
  "(A- rating) and a member of aPaws, the Association of Professional Animal Waste Specialists, the "  +
  "national trade association for the professional pet waste removal industry. No contracts required -- get a free " +
  "online quote at scoopychatt.com/quote.";

const BASE = "https://www.scoopychatt.com";

// [url, title, description], built from the shared manifest so this list
// can't drift from what inject-seo.cjs actually ships on each page.
const PAGES = Object.entries(manifestPages).map(([url, [title, desc]]) => [url, title, desc]);

// Location/service-area pages
const NEIGHBORHOODS = {
  "st-elmo": ["St. Elmo", "the historic neighborhood at the foot of Lookout Mountain"],
  "north-chattanooga": ["North Chattanooga", "the Northshore, near Frazier Avenue and Coolidge Park"],
  "southside": ["Southside", "the Main Street district south of downtown"],
  "lookout-valley": ["Lookout Valley", "west of Lookout Mountain along the I-24 corridor"],
  "riverview": ["Riverview", "an established North Chattanooga neighborhood"],
  "normal-park": ["Normal Park", "a family neighborhood in North Chattanooga"],
  "brainerd": ["Brainerd", "East Chattanooga along the Brainerd Road corridor"],
  "downtown": ["Downtown Chattanooga", "the city center"],
  "highland-park": ["Highland Park", "a historic neighborhood just east of downtown"],
};

const GA_LOCS = new Set(["ringgold", "rossville", "flintstone", "fort-oglethorpe"]);
const LOC_SLUGS = [
  "chattanooga", "hixson", "red-bank", "signal-mountain", "ooltewah", "east-brainerd",
  "soddy-daisy", "apison", "collegedale", "highland-park", "downtown",
  "east-ridge", "lookout-mountain",
  "st-elmo", "north-chattanooga", "southside", "lookout-valley", "riverview",
  "normal-park", "brainerd",
  "ringgold", "rossville", "flintstone", "fort-oglethorpe"
];

for (const slug of LOC_SLUGS) {
  const city = slug.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  const state = GA_LOCS.has(slug) ? "GA" : "TN";
  var override = NEIGHBORHOODS[slug];
  if (override) {
    PAGES.push([
      "/service/" + slug,
      "Dog Poop Removal in " + override[0] + (override[0].indexOf("Chattanooga") >= 0 ? ", TN" : ", Chattanooga TN") + " | Scoopy Doo",
      "Professional pet waste removal in " + override[0] + ", " + override[1] +
        ". Weekly, twice-weekly, every-other-week, and one-time dog waste removal from Scoopy Doo. Free online quote."
    ]);
  } else {
    PAGES.push([
      "/service/" + slug,
      "Dog Poop Removal in " + city + ", " + state + " | Scoopy Doo",
      "Professional pet waste removal in " + city + ", " + state + ". Weekly and bi-weekly pooper scooper service from Scoopy Doo. Get your free online quote today."
    ]);
  }
}

function main() {
  const lines = [
    "# Scoopy Doo LLC - Pet Waste Removal in Chattanooga, TN and North Georgia",
    "",
    SUMMARY,
    "",
    "## Pages"
  ];

  for (const [url, title, desc] of PAGES) {
    lines.push("- [" + title + "](" + BASE + url + "): " + desc);
  }

  const outputPath = path.join(process.cwd(), "public", "llms.txt");
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf8");
  console.log("llms.txt written: " + PAGES.length + " pages");
}

const isMain = import.meta.url === ("file://" + process.argv[1]);
if (isMain) {
  main();
}
