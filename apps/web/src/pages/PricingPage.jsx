
import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PricingTable from '@/components/PricingTable.jsx';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import CTAButton from '@/components/CTAButton.jsx';
import { generatePriceRangeSchema } from '@/utils/schemaGenerators.js';

const PricingPage = () => {
  const priceRangeSchema = generatePriceRangeSchema("Dog Poop Removal Service", "18", "150", "USD");

  const pricingTiers = [
    {
      name: "Bi-Weekly Service",
      description: "For small dogs or large yards.",
      price: "33",
      frequency: "per visit / 1st dog",
      benefits: ["Cleaned every other week", "Budget-friendly option", "Detailed grid walk", "Gates always secured"]
    },
    {
      name: "Weekly Service",
      description: "Consistent yard maintenance for a spotless lawn.",
      price: "20",
      frequency: "per visit / 1st dog",
      benefits: ["Cleaned once every week", "Perfect for 1-2 dogs", "Detailed grid walk", "Eco-friendly disposal"],
      recommended: true
    },
    {
      name: "2X Weekly Service",
      description: "Twice weekly professional cleaning for homes that need more frequent maintenance.",
      price: "18",
      frequency: "per visit / 1st dog",
      benefits: ["Cleaned twice per week", "Maximum yard cleanliness", "Text alert when en route", "Gates always secured"]
    },
    {
      name: "One-Time Cleanup",
      description: "Deep clean for events or seasonal refresh.",
      price: "85",
      frequency: "base starting price",
      benefits: ["Comprehensive deep clean", "Removal of all accumulated waste", "Before event prep", "No ongoing commitment"]
    }
  ];

  const faqs = [
    { question: "Are there any hidden fees or contracts?", answer: "No! We believe in transparent pricing. There are no contracts, and you can cancel or pause service anytime." },
    { question: "How does billing work?", answer: "We price per visit so the number is easy to compare, and we bill monthly. We securely keep a card on file, charge once a month for that month of service, and email you a receipt. There is no contract, so you can pause or cancel anytime." },
    { question: "Does the price change if I have multiple dogs?", answer: "Yes. The rates above include your first dog. Weekly service adds $2 per visit for each additional dog, twice-weekly adds $1, and every-other-week adds $3. So weekly service for two dogs is $22 per visit and for three dogs is $24 per visit." },
    { question: "What if my yard is overgrown or very large?", answer: "We provide custom quotes for significantly oversized yards or properties with tall grass/weeds that make scooping significantly more difficult." },
    { question: "Do you charge extra for initial cleanups?", answer: "If it has been a long time since the yard was last cleaned, an initial spring-cleaning fee may apply to get your yard to a maintainable baseline before regular visit rates kick in." },
    { question: "Do you offer yard deodorizing?", answer: "Yes. Deodorizing and sanitizing is $20 per visit. It neutralizes the odor compounds and bacteria left behind in the soil after the waste itself is removed, and it can be added to any recurring plan or to a one-time cleanup. It is most worthwhile for heavily used yards, areas near a patio, and yards being prepped for an event or a home sale." },
    { question: "What do pet waste stations cost for an HOA or apartment community?", answer: "Pet waste stations are $299 per station installed and $10 per station per week to service. Installation covers the station, post, mounting, and initial bag stock; servicing covers restocking, emptying, and hauling the waste off site each week. A four-station community runs $40 a week. Any common-area sweep alongside the stations is quoted separately after a free walkthrough." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        path="/pricing"
        faqData={faqs}
        schema={[priceRangeSchema]}
      />
      
      <Header />

      <main className="flex-grow">
        <section className="pt-24 pb-16 bg-muted/20 border-b border-border">
          <div className="container-shell text-center max-w-3xl mx-auto">
            <h1 className="mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground">
              Fair rates based on your yard size and number of dogs. No contracts, cancel anytime.
            </p>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-shell max-w-5xl">
            <PricingTable tiers={pricingTiers} />
            <div className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-3">Add-ons</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Waste takeaway - $5 per visit.</strong> By default we double-bag the waste and leave it in your outdoor bin. If you would rather it not go in your own cans, we haul it off the property instead.</li>
                <li><strong className="text-foreground">Additional dogs - $2 per visit weekly, $1 twice-weekly, $3 every-other-week.</strong> Your first dog is included in the rates above.</li>
                <li><strong className="text-foreground">Yard deodorizing and sanitizing - $20 per visit.</strong> Neutralizes the odor compounds and bacteria left in the soil after the waste is gone. Add it to any plan or to a one-time cleanup.</li>
                <li><strong className="text-foreground">Pet waste stations - from $299 per station installed, then $10 per station per week to service.</strong> For HOAs, apartment communities, and dog parks. Installation covers the station, post, mounting, and first stock of bags. Servicing covers weekly restocking, emptying, and off-site disposal.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-card border-y border-border">
          <div className="container-shell max-w-3xl">
            <h2 className="text-center mb-10">Frequently Asked Questions</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-shell max-w-3xl">
            <h2 className="mb-4">Weekly or every other week?</h2>
            <p className="text-muted-foreground mb-4">
              The per-visit rates make weekly look far more expensive than every-other-week, but
              they are much closer over a year: $1,040 for weekly versus $858 for every-other-week
              with one dog, a difference of about $15 a month for twice the visits. Every-other-week
              costs more per stop because two weeks of waste is a bigger job.
            </p>
            <p>
              <Link to="/blog/weekly-vs-biweekly-dog-poop-service-chattanooga" className="text-primary hover:underline font-semibold">
                See the full weekly vs every-other-week breakdown
              </Link>
            </p>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="container-shell">
            <h2 className="mb-6">Need a custom quote?</h2>
            <p className="text-muted-foreground mb-8 text-lg">Every yard is unique. Let us give you an exact price tailored to your property.</p>
            <CTAButton>Get Your Exact Price Now</CTAButton>
          </div>
        </section>
      </main>

      
      <nav aria-label="Scoopy Doo site navigation" className="py-8 border-t border-border bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Explore Scoopy Doo</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 list-none m-0 p-0">
            <li><Link to="/" className="text-primary hover:underline font-medium text-sm">Home</Link></li>
            <li><Link to="/services" className="text-primary hover:underline font-medium text-sm">Services</Link></li>
            <li><Link to="/pricing" className="text-primary hover:underline font-medium text-sm">Pricing</Link></li>
            <li><Link to="/quote" className="text-primary hover:underline font-medium text-sm">Get a Quote</Link></li>
            <li><Link to="/faq" className="text-primary hover:underline font-medium text-sm">FAQ</Link></li>
            <li><Link to="/reviews" className="text-primary hover:underline font-medium text-sm">Reviews</Link></li>
            <li><Link to="/service-areas" className="text-primary hover:underline font-medium text-sm">Service Areas</Link></li>
            <li><Link to="/blog" className="text-primary hover:underline font-medium text-sm">Blog</Link></li>
          </ul>
        </div>
      </nav>
      <Footer />
    </div>
  );
};

export default PricingPage;
