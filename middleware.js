// Vercel Edge Middleware: return a real HTTP 404 for URLs this site does not have.
//
// The SPA rewrite in vercel.json ("/(.*)" -> "/index.html") means every URL on the
// domain used to answer 200 OK with the app shell. Google files those as soft 404s
// (109,860 of them as of Aug 2026) and keeps re-crawling them. This runs before the
// rewrite and answers unknown paths with 404 so they get dropped from the index.
//
// Anything not matched here falls through untouched, so prerendered pages, static
// assets, API functions, and the vercel.json redirects behave exactly as before.
// If this file ever throws, the request continues — it fails open, never closed.

const PAGES = [
  '/',
  '/about',
  '/blog',
  '/commercial',
  '/comparison',
  '/cost-calculator',
  '/dog-park-guide',
  '/dog-poop-removal-chattanooga',
  '/dog-poop-scooping-chattanooga',
  '/doggy-doors',
  '/doggy-doors/book',
  '/faq',
  '/how-it-works',
  '/near-me',
  '/one-time-cleanup',
  '/pet-safe-checklist',
  '/pet-waste-removal-chattanooga',
  '/podcast',
  '/press',
  '/pricing',
  '/privacy-policy',
  '/qb-oauth-callback',
  '/quote',
  '/reddit-oauth-callback',
  '/reviews',
  '/service-areas',
  '/services',
  '/spring-special',
  '/terms-of-service',
  '/thank-you',
  '/yard-cleanup-chattanooga',
];

const BLOG_POSTS = [
  'best-dog-parks-chattanooga-tn',
  'best-pooper-scooper-services-chattanooga',
  'chattanooga-pet-waste-removal-homeowners',
  'commercial-pet-waste-removal-chattanooga',
  'customer-success-stories',
  'diy-vs-professional',
  'dog-poop-cleanup-chattanooga-summer-heat',
  'dog-poop-laws-chattanooga',
  'dog-poop-removal-north-georgia',
  'fall-yard-care-checklist-chattanooga',
  'health-benefits-yard-cleanup',
  'health-risks-of-pet-waste',
  'hoa-pet-waste-removal-chattanooga',
  'how-often-clean-yard',
  'how-often-scoop-dog-poop-chattanooga',
  'is-dog-poop-hurting-your-chattanooga-yard',
  'is-dog-waste-bad-for-lawn',
  'lawn-health-and-pet-waste',
  'new-puppy-pet-waste-removal-chattanooga',
  'one-time-dog-poop-cleanup-chattanooga',
  'pet-waste-management-guide',
  'podcast-blog',
  'pooper-scooper-cost-chattanooga',
  'professional-waste-removal-benefits',
  'seasonal-pet-care-tips',
  'signal-mountain',
  'soddy-daisy',
  'spring-pet-care-checklist',
  'winter-dog-poop-cleanup-chattanooga',
  'yard-cleanup-before-selling-home-chattanooga',
];

const SERVICE_AREAS = [
  'apison', 'chattanooga', 'cleveland', 'collegedale', 'downtown', 'east-brainerd',
  'east-ridge', 'flintstone', 'fort-oglethorpe', 'highland-park', 'hixson',
  'lookout-mountain', 'ooltewah', 'red-bank', 'ringgold', 'rossville',
  'signal-mountain', 'soddy-daisy',
];

// Sources of the vercel.json redirects and the /dp/* 410 handler. These must reach
// their handler rather than being answered with a 404 here.
const LEGACY = [
  '/about-us', '/our-services', '/contact', '/contact-us', '/service-area', '/quoterequest',
];

const known = new Set([
  ...PAGES,
  ...BLOG_POSTS.map((s) => `/blog/${s}`),
  ...SERVICE_AREAS.map((s) => `/service/${s}`),
  ...LEGACY,
]);

const NOT_FOUND_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Page Not Found | Scoopy Doo</title>
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
         font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; background:#fff; color:#1a1a1a; }
  .wrap { text-align:center; padding:2rem; max-width:34rem; }
  h1 { font-size:1.75rem; margin:0 0 .75rem; }
  p { color:#555; line-height:1.6; margin:0 0 1.5rem; }
  a { display:inline-block; margin:0 .35rem; padding:.7rem 1.4rem; border-radius:9999px;
      background:#16a34a; color:#fff; text-decoration:none; font-weight:600; }
  a.secondary { background:#fff; color:#16a34a; border:2px solid #16a34a; }
</style>
</head>
<body>
  <div class="wrap">
    <h1>Page not found</h1>
    <p>That page does not exist. Scoopy Doo provides pet waste removal across
       Chattanooga TN and North Georgia &mdash; start from the home page or grab a free quote.</p>
    <a href="/">Go to home page</a>
    <a class="secondary" href="/quote">Get a free quote</a>
  </div>
</body>
</html>`;

export default function middleware(request) {
  try {
    const { pathname } = new URL(request.url);

    // Static assets, API routes and Vercel internals are never our business.
    if (
      pathname.startsWith('/api/') ||
      pathname.startsWith('/assets/') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/_vercel/') ||
      pathname.startsWith('/dp/') ||
      pathname.includes('.')
    ) {
      return;
    }

    // Trailing slashes and legacy prefixed paths resolve to the same page.
    const normalized =
      pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

    if (known.has(normalized)) return;

    return new Response(NOT_FOUND_HTML, {
      status: 404,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'x-robots-tag': 'noindex, nofollow',
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    });
  } catch {
    // Never let a middleware error take the site down.
    return;
  }
}

export const config = {
  matcher: '/((?!api|assets|images|_vercel|.*\\.).*)',
};
