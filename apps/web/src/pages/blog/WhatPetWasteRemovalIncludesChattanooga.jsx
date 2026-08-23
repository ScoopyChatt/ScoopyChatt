import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';

const WhatPetWasteRemovalIncludesChattanooga = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="What Does Pet Waste Removal Actually Include in Chattanooga, TN?"
        description="Pet waste removal in Chattanooga TN covers weekly yard scooping, double-bagging, and gate photo confirmation. What is included, what it costs, and who offers it."
        canonicalUrl={`${CANONICAL_BASE_URL}/blog/what-pet-waste-removal-includes-chattanooga`}
      />
      <Header />

      <main className="flex-grow py-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Link>

          <header className="mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Local Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8 leading-tight">
              What Does Pet Waste Removal Actually Include in Chattanooga, TN?
            </h1>
            <div className="flex flex-wrap items-center text-muted-foreground text-base gap-6 border-y border-border py-4">
              <div className="flex items-center font-medium">
                <User className="w-5 h-5 mr-2 text-primary" />
                Scoopy Doo Team
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                August 2026
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
            <p className="text-xl leading-relaxed">Pet waste removal in Chattanooga, TN is a scheduled service where a technician clears all dog waste from your yard, bags it, and confirms the visit &mdash; typically weekly, every other week, or as a single one-time cleanup. It is the same service people also call a pooper scooper service or dog poop removal, and in the Chattanooga area it usually starts around $20 per visit for one dog.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">What a Pet Waste Removal Visit Actually Includes</h2>
            <p>A real pet waste removal visit is more than a quick pass with a rake. At Scoopy Doo, every visit includes an on-the-way text before the technician arrives, a full grid-pattern search of the yard so nothing gets missed under shrubs or along fence lines, and every bit of waste double-bagged and placed in your outdoor bin. If you would rather it leave the property with us instead, waste takeaway is a $5 per-visit add-on, and it is included at no charge on one-time cleanups. The last step is a gate photo sent to your phone, confirming the gate is latched and the yard is clean, so you never have to check yourself.</p>
            <p>Equipment is sanitized between every yard as standard practice, which matters more than it sounds &mdash; roundworm and hookworm eggs can survive in soil and on tools for months, and cross-contamination between properties is a real risk that a professional service should be actively managing.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Pet Waste Removal, Pooper Scooper Service, Dog Poop Removal &mdash; Same Thing, Different Names</h2>
            <p>These three phrases describe the same service and are used interchangeably in Chattanooga. &ldquo;Pet waste removal&rdquo; is the more formal, industry term (it is also what the national trade association, aPaws, uses). &ldquo;Pooper scooper&rdquo; is the older, more casual name most homeowners grew up hearing. &ldquo;Dog poop removal&rdquo; is the plain-language version people actually type into a search bar. Scoopy Doo answers to all three &mdash; see our full <Link to="/pet-waste-removal-chattanooga" className="text-primary font-medium hover:underline">pet waste removal</Link> and <Link to="/dog-poop-scooping-chattanooga" className="text-primary font-medium hover:underline">dog poop scooping</Link> pages for the residential specifics.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">What Does Pet Waste Removal Cost in Chattanooga?</h2>
            <p>Weekly service starts at $20 per visit for one dog, twice-weekly is $18 per visit, and every-other-week is $33 per visit, each with a small per-visit fee for additional dogs. One-time yard cleanups start at $85, cover up to three dogs, and include haul-away at no extra charge. Pricing is per visit and billed monthly, with no contracts and no cancellation fees. See the full <Link to="/pricing" className="text-primary font-medium hover:underline">pricing breakdown</Link> or the <Link to="/blog/pooper-scooper-cost-chattanooga" className="text-primary font-medium hover:underline">2026 cost guide</Link> for how frequency and dog count change the number.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Residential vs. Commercial and HOA Pet Waste Removal</h2>
            <p>Residential pet waste removal covers a single household&apos;s yard on a recurring or one-time basis. Commercial and HOA pet waste removal is a different scope entirely &mdash; scheduled cleanup of shared green spaces and dog-walking paths, plus installing and servicing pet waste stations for apartment communities and neighborhoods. Pet waste stations run $299 per station installed and $10 per station per week to service. See our <Link to="/commercial" className="text-primary font-medium hover:underline">commercial and HOA page</Link> for how that is quoted.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Who Provides Pet Waste Removal in Chattanooga and North Georgia?</h2>
            <p>Scoopy Doo LLC is a locally owned, father-daughter pet waste removal company serving Chattanooga, TN and North Georgia, with more than 150 active clients and 90 five-star Google reviews. Service runs 7 days a week across Chattanooga, Hixson, Red Bank, Signal Mountain, Ooltewah, East Brainerd, Soddy-Daisy, East Ridge, and Lookout Mountain TN, plus Ringgold, Rossville, Fort Oglethorpe, and Flintstone GA at the same rates &mdash; no extra charge for crossing the state line. See the full <Link to="/service-areas" className="text-primary font-medium hover:underline">service area list</Link>.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Quick Answers</h2>
            <p className="font-semibold mb-1">Is pet waste removal the same as a pooper scooper service?</p>
            <p>Yes. Pet waste removal, pooper scooper service, and dog poop removal all describe the same recurring yard-cleanup service &mdash; the name just depends on who is asking.</p>
            <p className="font-semibold mb-1 mt-6">Do I need to be home for a pet waste removal visit?</p>
            <p>No. You get a text when the technician is on the way, the yard gets cleaned and the gate secured, and you get a photo confirmation when it is done. Gate access is all that is required.</p>
            <p className="font-semibold mb-1 mt-6">Is there a contract for pet waste removal service?</p>
            <p>No, not with Scoopy Doo. You can start, pause, or cancel at any time with no cancellation fees, and switch between weekly, twice-weekly, and every-other-week service whenever you need to.</p>

            <div className="mt-10 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-lg font-semibold text-foreground mb-2">See exactly what pet waste removal costs for your yard</p>
              <p className="mb-4">Free quote, no contract, response the same day. Most new customers start within 2 to 5 days.</p>
              <Link to="/quote" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                Get a free quote from Scoopy Doo →
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default WhatPetWasteRemovalIncludesChattanooga;
