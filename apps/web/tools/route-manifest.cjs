// Single source of truth for every URL the site publishes.
//
// tools/generate-sitemap.cjs writes these into sitemap.xml and tools/verify-routes.cjs
// checks them against src/App.jsx and middleware.js on every build, so a page can no
// longer exist in one place and be missing from the others.

const PAGES = [
  '/',
  '/services',
  '/pricing',
  '/commercial',
  '/quote',
  '/comparison',
  '/reviews',
  '/faq',
  '/about',
  '/press',
  '/podcast',
  '/how-it-works',
  '/service-areas',
  '/near-me',
  '/one-time-cleanup',
  '/cost-calculator',
  '/doggy-doors',
  '/dog-poop-removal-chattanooga',
  '/pet-waste-removal-chattanooga',
  '/dog-poop-scooping-chattanooga',
  '/yard-cleanup-chattanooga',
  '/spring-special',
  '/pet-safe-checklist',
  '/dog-park-guide',
  '/blog',
  '/privacy-policy',
  '/terms-of-service',
];

const SERVICE_AREAS = [
  'chattanooga', 'hixson', 'red-bank', 'signal-mountain', 'ooltewah', 'east-brainerd',
  'soddy-daisy', 'east-ridge', 'lookout-mountain', 'downtown', 'highland-park',
  'apison', 'collegedale', 'ringgold', 'rossville', 'flintstone',
  'fort-oglethorpe',
  // Chattanooga neighborhoods covered on the aPaws member listing
  'st-elmo', 'north-chattanooga', 'southside', 'lookout-valley', 'riverview',
  'normal-park', 'brainerd',
];

const BLOG_POSTS = [
  'dog-poop-cleanup-chattanooga-summer-heat',
  'dog-poop-laws-chattanooga',
  'best-dog-parks-chattanooga-tn',
  'winter-dog-poop-cleanup-chattanooga',
  'fall-yard-care-checklist-chattanooga',
  'how-often-scoop-dog-poop-chattanooga',
  'is-dog-poop-hurting-your-chattanooga-yard',
  'chattanooga-pet-waste-removal-homeowners',
  'commercial-pet-waste-removal-chattanooga',
  'hoa-pet-waste-removal-chattanooga',
  'one-time-dog-poop-cleanup-chattanooga',
  'new-puppy-pet-waste-removal-chattanooga',
  'yard-cleanup-before-selling-home-chattanooga',
  'is-dog-waste-bad-for-lawn',
  'best-pooper-scooper-services-chattanooga',
  'pooper-scooper-cost-chattanooga',
  'dog-poop-removal-north-georgia',
  'professional-waste-removal-benefits',
  'health-risks-of-pet-waste',
  'lawn-health-and-pet-waste',
  'health-benefits-yard-cleanup',
  'diy-vs-professional',
  'seasonal-pet-care-tips',
  'pet-waste-management-guide',
  'how-often-clean-yard',
  'spring-pet-care-checklist',
  'customer-success-stories',
  'podcast-blog',
  'signal-mountain',
  'soddy-daisy',
  'dog-door-installation-chattanooga',
  'weekly-vs-biweekly-dog-poop-service-chattanooga',
  'pet-waste-stations-apartments-hoas-chattanooga',
  'yard-cleanup-before-a-party-chattanooga',
  'how-to-get-rid-of-dog-poop-smell-in-yard-chattanooga',
];

module.exports = { PAGES, SERVICE_AREAS, BLOG_POSTS };
