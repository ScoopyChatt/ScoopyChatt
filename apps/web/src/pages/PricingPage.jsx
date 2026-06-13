
import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import PricingTable from &rsquo;@/components/PricingTable.jsx&rsquo;;
import FAQAccordion from &rsquo;@/components/FAQAccordion.jsx&rsquo;;
import CTAButton from &rsquo;@/components/CTAButton.jsx&rsquo;;
import { generatePriceRangeSchema } from &rsquo;@/utils/schemaGenerators.js&rsquo;;

const PricingPage = () => {
  const priceRangeSchema = generatePriceRangeSchema(&rdquo;Dog Poop Removal Service&rdquo;, &rdquo;16&rdquo;, &rdquo;150&rdquo;, &rdquo;USD&rdquo;);

  const pricingTiers = [
    {
      name: &rdquo;2X Weekly Service&rdquo;,
      description: &rdquo;Twice weekly professional cleaning for homes that need more frequent maintenance.&rdquo;,
      price: &rdquo;16&rdquo;,
      frequency: &rdquo;per visit / 1st dog&rdquo;,
      benefits: [&rdquo;Cleaned twice per week&rdquo;, &rdquo;Maximum yard cleanliness&rdquo;, &rdquo;Text alert when en route&rdquo;, &rdquo;Gates always secured&rdquo;]
    },
    {
      name: &rdquo;Weekly Service&rdquo;,
      description: &rdquo;Consistent yard maintenance for a spotless lawn.&rdquo;,
      price: &rdquo;20&rdquo;,
      frequency: &rdquo;per visit / 1st dog&rdquo;,
      benefits: [&rdquo;Cleaned once every week&rdquo;, &rdquo;Perfect for 1-2 dogs&rdquo;, &rdquo;Detailed grid walk&rdquo;, &rdquo;Eco-friendly disposal&rdquo;],
      recommended: true
    },
    {
      name: &rdquo;Bi-Weekly Service&rdquo;,
      description: &rdquo;For small dogs or large yards.&rdquo;,
      price: &rdquo;28&rdquo;,
      frequency: &rdquo;per visit / 1st dog&rdquo;,
      benefits: [&rdquo;Cleaned every other week&rdquo;, &rdquo;Budget-friendly option&rdquo;, &rdquo;Detailed grid walk&rdquo;, &rdquo;Gates always secured&rdquo;]
    },
    {
      name: &rdquo;One-Time Cleanup&rdquo;,
      description: &rdquo;Deep clean for events or seasonal refresh.&rdquo;,
      price: &rdquo;75&rdquo;,
      frequency: &rdquo;base starting price&rdquo;,
      benefits: [&rdquo;Comprehensive deep clean&rdquo;, &rdquo;Removal of all accumulated waste&rdquo;, &rdquo;Before event prep&rdquo;, &rdquo;No ongoing commitment&rdquo;]
    }
  ];

  const faqs = [
    { question: &rdquo;Are there any hidden fees or contracts?&rdquo;, answer: &rdquo;No! We believe in transparent pricing. There are no contracts, and you can cancel or pause service anytime.&rdquo; },
    { question: &rdquo;How does billing work?&rdquo;, answer: &rdquo;We securely keep a card on file and bill automatically after each service is completed. You&rsquo;ll receive a receipt via email.&rdquo; },
    { question: &rdquo;Does the price change if I have multiple dogs?&rdquo;, answer: &rdquo;Yes, our base rates shown above are for 1 dog. We charge a small additional fee per extra dog to account for the additional waste and time required to thoroughly clean your yard.&rdquo; },
    { question: &rdquo;What if my yard is overgrown or very large?&rdquo;, answer: &rdquo;We provide custom quotes for significantly oversized yards or properties with tall grass/weeds that make scooping significantly more difficult.&rdquo; },
    { question: &rdquo;Do you charge extra for initial cleanups?&rdquo;, answer: &rdquo;If it has been a long time since the yard was last cleaned, an initial spring-cleaning fee may apply to get your yard to a maintainable baseline before regular visit rates kick in.&rdquo; }
  ];

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <SEOHead 
        path=&rdquo;/pricing&rdquo;
        schema={[priceRangeSchema]}
      />
      
      <Header />

      <main className=&rdquo;flex-grow&rdquo;>
        <section className=&rdquo;pt-24 pb-16 bg-muted/20 border-b border-border&rdquo;>
          <div className=&rdquo;container-shell text-center max-w-3xl mx-auto&rdquo;>
            <h1 className=&rdquo;mb-6&rdquo;>Simple, Transparent Pricing</h1>
            <p className=&rdquo;text-xl text-muted-foreground&rdquo;>
              Fair rates based on your yard size and number of dogs. No contracts, cancel anytime.
            </p>
          </div>
        </section>

        <section className=&rdquo;section-spacing&rdquo;>
          <div className=&rdquo;container-shell max-w-5xl&rdquo;>
            <PricingTable tiers={pricingTiers} />
          </div>
        </section>

        <section className=&rdquo;section-spacing bg-card border-y border-border&rdquo;>
          <div className=&rdquo;container-shell max-w-3xl&rdquo;>
            <h2 className=&rdquo;text-center mb-10&rdquo;>Frequently Asked Questions</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section className=&rdquo;py-20 text-center&rdquo;>
          <div className=&rdquo;container-shell&rdquo;>
            <h2 className=&rdquo;mb-6&rdquo;>Need a custom quote?</h2>
            <p className=&rdquo;text-muted-foreground mb-8 text-lg&rdquo;>Every yard is unique. Let us give you an exact price tailored to your property.</p>
            <CTAButton>Get Your Exact Price Now</CTAButton>
          </div>
        </section>
      </main>

      
      <nav aria-label=&rdquo;Scoopy Doo site navigation&rdquo; className=&rdquo;py-8 border-t border-border bg-muted/20&rdquo;>
        <div className=&rdquo;max-w-5xl mx-auto px-4 text-center&rdquo;>
          <p className=&rdquo;text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3&rdquo;>Explore Scoopy Doo</p>
          <ul className=&rdquo;flex flex-wrap justify-center gap-x-6 gap-y-2 list-none m-0 p-0&rdquo;>
            <li><Link to=&rdquo;/&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Home</Link></li>
            <li><Link to=&rdquo;/services&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Services</Link></li>
            <li><Link to=&rdquo;/pricing&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Pricing</Link></li>
            <li><Link to=&rdquo;/quote&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Get a Quote</Link></li>
            <li><Link to=&rdquo;/faq&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>FAQ</Link></li>
            <li><Link to=&rdquo;/reviews&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Reviews</Link></li>
            <li><Link to=&rdquo;/service-areas&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Service Areas</Link></li>
            <li><Link to=&rdquo;/blog&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Blog</Link></li>
          </ul>
        </div>
      </nav>
      <Footer />
    </div>
  );
};

export default PricingPage;
