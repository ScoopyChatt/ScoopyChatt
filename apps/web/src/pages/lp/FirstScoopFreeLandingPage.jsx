import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Camera, MessageSquare, ShieldCheck } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm.jsx';
import { GuaranteeBadge } from '@/components/Guarantee.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';
import { testimonials } from '@/data/testimonials.js';

// Paid-traffic landing page (Google Ads). Deliberately has no Header, Footer or
// outbound links: the logo is a plain image and the only exits are the form and
// the phone number. Noindex in three places (Helmet here, the built HTML via
// seo-page-manifest.cjs, and the sitemap exclusion list in verify-routes.cjs).

// Only these plans qualify for the offer, so only these appear in the form.
const OFFER_SERVICES = ['weekly', 'twice-weekly'];

const PHONE_DISPLAY = '423-600-5040';
const PHONE_HREF = 'tel:+14236005040';

const trust = [
  { icon: Camera, text: 'Gate photo sent to your phone after every visit' },
  { icon: MessageSquare, text: 'On-the-way text before we arrive' },
];

const steps = [
  { n: '1', title: 'Get your quote', body: 'Fill out the form above. We reply the same day with your exact price.' },
  { n: '2', title: 'Pick your day', body: 'Choose weekly or 2X-weekly service. No contracts, cancel anytime.' },
  { n: '3', title: 'Relax', body: 'We scoop, secure the gate and text you a photo. One visit is credited against your first month.' },
];

// Real Google reviews, verbatim, from the shared testimonials file.
const quoteAuthors = ['Richard Hadden', 'Deidre Whitmire', 'Melody Scarborough'];
const reviews = quoteAuthors
  .map((name) => testimonials.find((t) => t.author === name))
  .filter(Boolean);

const cities = [
  'Chattanooga', 'Hixson', 'Red Bank', 'Signal Mountain', 'Ooltewah', 'East Brainerd',
  'Soddy-Daisy', 'East Ridge', 'Lookout Mountain', 'Apison', 'Collegedale',
  'Ringgold, GA', 'Rossville, GA', 'Flintstone, GA', 'Fort Oglethorpe, GA',
];

const CallButton = ({ className = '' }) => (
  <a
    href={PHONE_HREF}
    className={`inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3 font-bold text-secondary-foreground shadow-sm ${className}`}
  >
    <Phone className="h-5 w-5" aria-hidden="true" />
    <span>{PHONE_DISPLAY}</span>
  </a>
);

const FirstScoopFreeLandingPage = () => {
  const canonicalUrl = getCanonicalUrl('/lp/first-scoop-free');

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Your First Scoop Is Free | Scoopy Doo Chattanooga</title>
        <meta name="description" content="New weekly and 2X-weekly customers get their first scoop free. Chattanooga and North Georgia. No contracts." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2">
          <img
            src="/scoopy-logo.webp"
            alt="Scoopy Doo pet waste removal"
            width="400"
            height="373"
            className="h-12 w-auto"
          />
          <CallButton className="px-4 py-2 text-sm" />
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-primary/10 to-background px-4 pb-8 pt-6">
          <div className="mx-auto max-w-xl">
            <h1 className="text-center text-4xl font-extrabold leading-tight text-foreground text-balance">
              Your First Scoop Is FREE
            </h1>
            <p className="mx-auto mt-3 max-w-[40ch] text-center text-base font-medium text-muted-foreground">
              Sign up for weekly or 2X-weekly service and your first visit is on us. Chattanooga &amp; North Georgia. No contracts.
            </p>
            <div className="mt-5 rounded-2xl border border-primary/20 bg-card p-5 shadow-lg">
              <QuoteForm allowedServices={OFFER_SERVICES} />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              New customers only. Buy your full first month and one visit is credited.
            </p>
            <div className="mt-5 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Prefer to talk? Call us:</p>
              <CallButton className="w-full text-lg sm:w-auto" />
            </div>
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="mx-auto max-w-xl space-y-3">
            {trust.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <p className="font-medium text-foreground">{text}</p>
              </div>
            ))}
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="mb-2 font-medium text-foreground">100% satisfaction guarantee</p>
                <GuaranteeBadge />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 px-4 py-10">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-foreground">How it works</h2>
            <ol className="space-y-5">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{s.n}</span>
                  <div>
                    <h3 className="font-bold text-foreground">{s.title}</h3>
                    <p className="text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-foreground">What our customers say</h2>
            <div className="space-y-4">
              {reviews.map((r) => (
                <figure key={r.author} className="rounded-xl border border-border bg-card p-5">
                  <div className="mb-2 text-lg text-[#fbbc04]" aria-label="5 out of 5 stars">★★★★★</div>
                  <blockquote className="text-foreground">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-sm text-muted-foreground">{r.author}, Google review</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 px-4 py-10">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Areas we serve</h2>
            <p className="text-muted-foreground">{cities.join(' · ')}</p>
            <div className="mt-6">
              <CallButton className="w-full text-lg sm:w-auto" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FirstScoopFreeLandingPage;
