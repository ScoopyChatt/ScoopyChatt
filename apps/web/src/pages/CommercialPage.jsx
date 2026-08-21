import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import ReviewsSection from '@/components/ReviewsSection.jsx';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import SEOHead from '@/components/SEOHead.jsx';

const segments = [
  {
    name: 'HOAs and Neighborhoods',
    tagline: 'Cleaner common areas, happier residents.',
    features: [
      'Scheduled common-area and green-space cleanup',
      'Pet waste station installation and restocking',
      'Fewer complaints and cleaner walking paths',
      'Simple monthly billing, no long-term contract',
    ],
  },
  {
    name: 'Apartments and Multifamily',
    tagline: 'A cleaner property that leases itself.',
    features: [
      'Regular grounds and dog-run cleanup',
      'Waste station setup, bags, and restocking',
      'Flexible schedules for any property size',
      'Reliable service your residents will notice',
    ],
  },
  {
    name: 'Businesses and Dog Parks',
    tagline: 'A clean, safe space for staff and visitors.',
    features: [
      'Dog parks, offices, and dog-friendly businesses',
      'Scheduled routes that fit your hours',
      'Safer, more sanitary shared spaces',
      'One dependable local team, fully insured',
    ],
  },
];

const faqs = [
  {
    question: 'Do you offer contracts for commercial properties?',
    answer: 'We keep it flexible. Most commercial and HOA clients use simple month-to-month scheduling with no long-term contract required. If your property needs a formal agreement, we are happy to work with you.',
  },
  {
    question: 'Do you install and maintain pet waste stations?',
    answer: 'Yes. Pet waste stations start at $299 per station installed, which covers the station, post, mounting, and initial bag stock. Servicing is $10 per station per week, which covers restocking bags, emptying and re-lining the receptacle, and hauling the waste off site so it never overflows. This is one of the most popular add-ons for apartments and HOAs.',
  },
  {
    question: 'How is commercial pricing determined?',
    answer: 'Pet waste stations are $299 per station installed and $10 per station per week to service, so a four-station community runs $40 a week. The common-area sweep alongside them is quoted per property based on size and frequency, and yard deodorizing is available at $20 per visit. Reach out for a free walkthrough and a custom quote.',
  },
  {
    question: 'What areas do you cover for commercial service?',
    answer: 'We serve the entire Chattanooga metro and North Georgia, including Hixson, Ooltewah, East Brainerd, Red Bank, Signal Mountain, Ringgold, Rossville, and Fort Oglethorpe, with no extra charge for Georgia.',
  },
  {
    question: 'Are you insured?',
    answer: 'Yes, Scoopy Doo is fully insured. Property managers and HOA boards can request proof of insurance before service begins.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Commercial and HOA Pet Waste Removal',
  provider: { '@id': 'https://www.scoopychatt.com/#business' },
  areaServed: [
    { '@type': 'City', name: 'Chattanooga', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'Hixson', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'Red Bank', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'Signal Mountain', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'Ooltewah', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'East Brainerd', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'Soddy-Daisy', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'East Ridge', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'Collegedale', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'Apison', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'Lookout Mountain', containedInPlace: 'Tennessee' },
    { '@type': 'City', name: 'Ringgold', containedInPlace: 'Georgia' },
    { '@type': 'City', name: 'Rossville', containedInPlace: 'Georgia' },
    { '@type': 'City', name: 'Fort Oglethorpe', containedInPlace: 'Georgia' },
    { '@type': 'City', name: 'Flintstone', containedInPlace: 'Georgia' },
  ],
  description:
    'Commercial and HOA pet waste removal in Chattanooga, TN. Scheduled cleanup and pet waste stations for apartments, HOAs, dog parks, and businesses. Fully insured with no long-term contracts.',
  url: 'https://www.scoopychatt.com/commercial',
};

export default function CommercialPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        path="/commercial"
        title="Commercial and HOA Pet Waste Removal in Chattanooga, TN | Scoopy Doo"
        description="Commercial and HOA pet waste removal in Chattanooga, TN. Scheduled cleanup and pet waste stations for apartments, HOAs, dog parks, and businesses. Fully insured, no contracts. Free quote."
        faqData={faqs}
        schema={serviceSchema}
      />

      <Header />

      <main>
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance text-foreground">
                Commercial and HOA Pet Waste Removal in Chattanooga, TN
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-[60ch] mx-auto font-medium mb-8">
                Dependable, fully insured pet waste removal for apartments, HOAs, dog parks, and businesses across Chattanooga and North Georgia. Scheduled cleanup, pet waste stations, and no long-term contracts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg"
                >
                  <Link to="/quote">Request a Commercial Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl">
                  <a href="tel:423-600-5040">Call or Text 423-600-5040</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-foreground">
              Built for Every Kind of Property
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              From a single apartment community to a full HOA, we build a schedule that keeps your grounds clean and your residents happy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {segments.map((s) => (
                <div key={s.name} className="bg-card p-8 rounded-2xl shadow-sm border border-border text-left flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{s.name}</h3>
                  <p className="text-muted-foreground mb-6">{s.tagline}</p>
                  <ul className="space-y-3 flex-grow">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-foreground">
                        <span className="text-primary font-bold mt-0.5">&#10003;</span>
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/20 border-y border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-foreground">
              Why Property Managers Choose Scoopy Doo
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We are a locally owned, full-time pet waste removal company, not a side hustle. That means systems, reliability, and a team you can count on week after week.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-xl font-bold mb-3">Reliable and full-time</h3>
                <p className="text-muted-foreground">Locally owned and operated with real systems. Your property gets serviced on schedule, every time.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-xl font-bold mb-3">Fully insured</h3>
                <p className="text-muted-foreground">Proof of insurance available on request, so your board or ownership can sign off with confidence.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-xl font-bold mb-3">Waste stations included</h3>
                <p className="text-muted-foreground">Stations start at $299 installed and $10 per station per week to service. We stock and empty them on schedule so they never overflow and residents always have bags.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-xl font-bold mb-3">Flexible, no long contracts</h3>
                <p className="text-muted-foreground">Simple month-to-month scheduling that scales with your property and your budget.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <figure>
              <blockquote className="text-lg text-muted-foreground italic leading-relaxed">
                &ldquo;Scoopy Doo does a great job collecting at our community! Thank you for the
                attention to detail and keeping our apartments clean!&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-foreground">
                &mdash; Populus Waterside, property manager
              </figcaption>
            </figure>
          </div>
        </section>

        <ReviewsSection />

        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-foreground">
              Commercial and HOA Questions
            </h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
              Let us handle the mess
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-[50ch] mx-auto">
              Get a free walkthrough and a custom quote for your property. Call or text 423-600-5040, or request a quote online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg"
              >
                <Link to="/quote">Request a Commercial Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl">
                <a href="tel:423-600-5040">Call or Text 423-600-5040</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border bg-muted/20">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Planning pet waste stations for your property?</h2>
            <p className="text-muted-foreground mb-4">
              A practical starting point is one station for every 40 to 50 pet-friendly units,
              placed so no resident walks more than about 150 feet off their normal dog-walking
              route. Stations are $299 each installed and $10 per station per week to service, and
              the servicing is the part that matters: an empty bag dispenser or an overflowing
              receptacle teaches residents the rule is not enforced.
            </p>
            <p>
              <Link to="/blog/pet-waste-stations-apartments-hoas-chattanooga" className="text-primary hover:underline font-semibold">
                Read the full guide to pet waste stations for Chattanooga apartments and HOAs
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
