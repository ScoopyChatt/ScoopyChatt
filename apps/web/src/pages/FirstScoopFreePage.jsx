import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from '@/components/motion.jsx';
import { Gift, CreditCard, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import ReviewsSection from '@/components/ReviewsSection.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';
import { GuaranteeBadge } from '@/components/Guarantee.jsx';

const steps = [
  { icon: CalendarCheck, title: "1. See your instant price", body: "Enter your zip, plan and number of dogs. Your exact price shows up right away." },
  { icon: CreditCard, title: "2. Pay your first month", body: "Choose weekly or twice-weekly service and purchase your entire first month up front." },
  { icon: Gift, title: "3. One visit comes off", body: "The price of one visit is credited against that first month, so your first scoop is on us." },
];

const faqs = [
  { q: "Who qualifies for the first scoop free offer?", a: "Every new Scoopy Doo customer who signs up for weekly or twice-weekly service qualifies. Every-other-week and one-time cleanups are not included. There is nothing to apply for and no code to enter." },
  { q: "How does the free scoop work?", a: "You purchase your entire first month of service. To receive the credit, the full first month must be purchased. One visit is then credited against it, so you get a free first scoop." },
  { q: "Is there a contract?", a: "No. There are no contracts and no cancellation fees. You can pause or cancel any time." },
  { q: "What do I get on every visit?", a: "An on-the-way text, a full grid-pattern sweep of the yard, double-bagged waste placed in your outdoor bin (haul-away is $5 per visit), and a gate photo when we are done." },
];

const FirstScoopFreePage = () => {
  const canonicalUrl = getCanonicalUrl('/first-scoop-free');
  const pageTitle = "First Scoop Free: Dog Poop Removal in Chattanooga";
  const pageDesc = "New customers on weekly or twice-weekly service get their first scoop free: buy the full first month and one visit is credited. No contracts.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      <main className="flex-1 pb-24 md:pb-0">
        <section className="pt-24 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance text-foreground" style={{ letterSpacing: '-0.02em' }}>
                Your First Scoop Is on Us. Dog Poop Removal in Chattanooga, TN
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-[55ch] mx-auto font-medium mb-8">
                Sign up for weekly or twice-weekly service, purchase your entire first month, and we credit one visit. Open to every new customer in Chattanooga and North Georgia.
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg">
                <Link to="/quote">Claim My Free First Scoop</Link>
              </Button>
              <div className="mt-6">
                <GuaranteeBadge />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How the free first scoop works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((s) => (
                <div key={s.title} className="bg-card p-8 rounded-2xl shadow-sm border border-border text-center">
                  <s.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border bg-muted/20">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">What every visit includes</h2>
            <ul className="space-y-3 text-muted-foreground">
              {["An on-the-way text before we arrive", "A full grid-pattern sweep of your yard", "Waste double-bagged into your outdoor bin (haul-away is $5 per visit)", "Gate secured and a photo sent when we are done", "No contracts, cancel any time"].map((item) => (
                <li key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
            <p className="mt-6 text-muted-foreground">
              See our <Link to="/pricing" className="text-primary hover:underline font-semibold">published pricing</Link> or check the <Link to="/service-areas" className="text-primary hover:underline font-semibold">areas we serve</Link>.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">First scoop free FAQ</h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-bold text-lg mb-1">{f.q}</h3>
                  <p className="text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ReviewsSection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default FirstScoopFreePage;
