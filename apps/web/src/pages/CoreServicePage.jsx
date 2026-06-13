
import React from &rsquo;react&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { CheckCircle2, Shield, Clock, ChevronDown } from &rsquo;lucide-react&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import CTAButton from &rsquo;@/components/CTAButton.jsx&rsquo;;
import LocationSection from &rsquo;@/components/LocationSection.jsx&rsquo;;
import { generateServiceSchema } from &rsquo;@/utils/schemaGenerators.js&rsquo;;

const faqs = [
  {
    question: &rdquo;What is Scoopy Doo and what does the service include?&rdquo;,
    answer: &rdquo;Scoopy Doo LLC is Chattanooga&rsquo;s locally owned dog poop removal and pooper scooper service. Every visit includes a full grid-pattern yard sweep, double-bagged waste removal hauled off your property, gate closure, and a photo confirmation sent to you. No contracts &mdash; cancel or change anytime.&rdquo;
  },
  {
    question: &rdquo;How does Scoopy Doo pet waste removal work?&rdquo;,
    answer: &rdquo;It&rsquo;s simple: request a free quote online, we send you pricing based on yard size and number of dogs, and you pick a schedule. We show up on your day, text you when we&rsquo;re on the way, clean the entire yard, close your gate, and send a photo when done. Payment is handled online &mdash; no checks, no phone tag.&rdquo;
  },
  {
    question: &rdquo;Do you offer a scoopy poopy service near Chattanooga, TN?&rdquo;,
    answer: &rdquo;Yes &mdash; Scoopy Doo provides professional pooper scooper and scoopy poopy service throughout the Chattanooga metro including Hixson, Red Bank, Signal Mountain, Ooltewah, East Brainerd, Lookout Mountain, Soddy-Daisy, and North Georgia communities like Ringgold, Rossville, and Fort Oglethorpe.&rdquo;
  },
  {
    question: &rdquo;How often should I schedule dog waste removal?&rdquo;,
    answer: &rdquo;Weekly service is our most popular option and works well for most one- or two-dog households. We also offer 2x weekly service for high-traffic yards and multiple dogs, bi-weekly for lower-use yards, and one-time cleanups if you need to start fresh before beginning a regular schedule.&rdquo;
  },
  {
    question: &rdquo;Is Scoopy Doo dog waste removal safe for kids and pets?&rdquo;,
    answer: &rdquo;Yes. We sanitize all scooping equipment between every yard to prevent cross-contamination. We never use harmful chemicals in your yard, and we haul all waste fully off the property. A clean yard is a safer yard &mdash; dog waste carries bacteria and parasites that are hazardous to children and other animals.&rdquo;
  },
  {
    question: &rdquo;How much does pooper scooper service cost in Chattanooga?&rdquo;,
    answer: &rdquo;Pricing is based on yard size and the number of dogs. Most Chattanooga homeowners pay between $15&ndash;$30 per weekly visit. The fastest way to get your exact price is to submit a free quote request &mdash; we respond the same day, usually within a few hours.&rdquo;
  },
  {
    question: &rdquo;Do you service HOAs and apartment communities?&rdquo;,
    answer: &rdquo;Yes. We service HOA common areas, dog-walking paths, and pet waste stations in addition to individual residential homes. We can invoice HOA boards directly and maintain visit records for compliance documentation.&rdquo;
  }
];

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className=&rdquo;border border-border rounded-xl overflow-hidden&rdquo;>
      <button
        className=&rdquo;w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-foreground hover:bg-muted/40 transition-colors&rdquo;
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${open ? &rsquo;rotate-180&rsquo; : &rsquo;&rsquo;}`} />
      </button>
      {open && (
        <div className=&rdquo;px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border/50 pt-4&rdquo;>
          {answer}
        </div>
      )}
    </div>
  );
};

const CoreServicePage = () => {
  const serviceSchema = generateServiceSchema(
    &rdquo;Dog Poop Removal&rdquo;,
    &rdquo;Professional weekly, bi-weekly, and one-time pet waste removal services.&rdquo;,
    &rdquo;Chattanooga Metro&rdquo;,
    &rdquo;$$&rdquo;
  );

  const faqSchema = {
    &rdquo;@context&rdquo;: &rdquo;https://schema.org&rdquo;,
    &rdquo;@type&rdquo;: &rdquo;FAQPage&rdquo;,
    &rdquo;mainEntity&rdquo;: faqs.map(f => ({
      &rdquo;@type&rdquo;: &rdquo;Question&rdquo;,
      &rdquo;name&rdquo;: f.question,
      &rdquo;acceptedAnswer&rdquo;: {
        &rdquo;@type&rdquo;: &rdquo;Answer&rdquo;,
        &rdquo;text&rdquo;: f.answer
      }
    }))
  };

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <SEOHead
        path=&rdquo;/&rdquo;
        schema={[serviceSchema, faqSchema]}
      />
      <Helmet>
        <script src=&rdquo;https://elfsightcdn.com/platform.js&rdquo; async></script>
      </Helmet>

      <Header />

      <main className=&rdquo;flex-grow&rdquo;>
        {/* Hero Section */}
        <section className=&rdquo;relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-muted/30&rdquo;>
          <div className=&rdquo;absolute inset-0 bg-[url(&rsquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/a31a7ef9578ab021774966b3677f99c1.jpg&rsquo;)] bg-cover bg-center opacity-5 mix-blend-multiply&rdquo;></div>
          <div className=&rdquo;container-shell relative z-10 text-center max-w-4xl mx-auto&rdquo;>
            <h1 className=&rdquo;mb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance&rdquo;>Professional Dog Poop Removal & Pooper Scooper Service</h1>

            <div className=&rdquo;mb-10 mx-auto max-w-3xl&rdquo;>
              <img
                src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/img_8567-OZjoO.jpeg&rdquo;
                alt=&rdquo;Dog waste removal service in action in Chattanooga, TN&rdquo;
                title=&rdquo;Scoopy Doo Professional Dog Poop Removal &mdash; Chattanooga, TN&rdquo;
                className=&rdquo;w-full h-auto rounded-2xl shadow-2xl border border-border/50 object-cover&rdquo;
                loading=&rdquo;eager&rdquo;
                fetchPriority=&rdquo;high&rdquo;
              />
            </div>

            <p className=&rdquo;text-xl text-muted-foreground mb-10 mx-auto leading-relaxed&rdquo;>
              Reclaim your yard and your free time. Our professional dog waste removal services keep your outdoor spaces clean, sanitary, and ready for family fun. We scoop poop professionally so you don&rsquo;t have to.
            </p>
            <div className=&rdquo;flex flex-col sm:flex-row justify-center gap-4&rdquo;>
              <CTAButton size=&rdquo;lg&rdquo; className=&rdquo;h-14 px-8 text-lg w-full sm:w-auto&rdquo;>Get Your Free Quote</CTAButton>
              <CTAButton size=&rdquo;lg&rdquo; variant=&rdquo;outline&rdquo; to=&rdquo;/services&rdquo; className=&rdquo;h-14 px-8 text-lg w-full sm:w-auto bg-background/50 backdrop-blur&rdquo;>View Services</CTAButton>
            </div>
          </div>
        </section>

        {/* Benefits Zig-Zag */}
        <section className=&rdquo;section-spacing&rdquo;>
          <div className=&rdquo;container-shell&rdquo;>
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20&rdquo;>
              <div className=&rdquo;order-2 md:order-1&rdquo;>
                <h2 className=&rdquo;mb-6 text-3xl font-bold&rdquo;>Pet Waste Removal Benefits</h2>
                <p className=&rdquo;text-lg text-muted-foreground mb-6 leading-relaxed&rdquo;>
                  Leaving pet waste to accumulate isn&rsquo;t just an eyesore&mdash;it&rsquo;s a health hazard. As a dedicated poop pick up company, we know that dog waste carries harmful bacteria and parasites that can infect other pets and children.
                </p>
                <ul className=&rdquo;space-y-4 mb-8&rdquo;>
                  <li className=&rdquo;flex items-center text-foreground font-medium&rdquo;>
                    <CheckCircle2 className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0&rdquo; />
                    <h3 className=&rdquo;text-base font-medium inline m-0&rdquo;>Consistent dog poop removal prevents lawn spots</h3>
                  </li>
                  <li className=&rdquo;flex items-center text-foreground font-medium&rdquo;>
                    <CheckCircle2 className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0&rdquo; />
                    <h3 className=&rdquo;text-base font-medium inline m-0&rdquo;>Eliminates foul yard odors</h3>
                  </li>
                  <li className=&rdquo;flex items-center text-foreground font-medium&rdquo;>
                    <CheckCircle2 className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0&rdquo; />
                    <h3 className=&rdquo;text-base font-medium inline m-0&rdquo;>Proper pet waste management reduces disease risk</h3>
                  </li>
                  <li className=&rdquo;flex items-center text-foreground font-medium&rdquo;>
                    <CheckCircle2 className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0&rdquo; />
                    <h3 className=&rdquo;text-base font-medium inline m-0&rdquo;>Eco-friendly waste disposal</h3>
                  </li>
                </ul>
              </div>
              <div className=&rdquo;order-1 md:order-2&rdquo;>
                <div className=&rdquo;aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border bg-muted&rdquo;>
                  <img
                    src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/img_9013-HYtyH.jpeg&rdquo;
                    alt=&rdquo;Professional pooper scooper equipment used by Scoopy Doo in Chattanooga&rdquo;
                    title=&rdquo;Professional Pet Waste Removal Equipment &mdash; Scoopy Doo LLC&rdquo;
                    className=&rdquo;w-full h-full object-cover&rdquo;
                    loading=&rdquo;lazy&rdquo;
                    decoding=&rdquo;async&rdquo;
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className=&rdquo;section-spacing bg-card border-y border-border&rdquo;>
          <div className=&rdquo;container-shell&rdquo;>
            <div className=&rdquo;text-center max-w-2xl mx-auto mb-16&rdquo;>
              <h2 className=&rdquo;mb-4 text-3xl font-bold&rdquo;>Why Choose Our Pooper Scooper Service?</h2>
              <p className=&rdquo;text-muted-foreground text-lg leading-relaxed&rdquo;>We pride ourselves on reliability, thoroughness, and treating your yard like our own.</p>
            </div>
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-3 gap-6&rdquo;>
              <div className=&rdquo;md:col-span-2 bg-muted p-8 rounded-2xl border border-border&rdquo;>
                <Shield className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                <h3 className=&rdquo;mb-3 text-xl font-bold&rdquo;>Our Dog Poop Scooping Process</h3>
                <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>If we ever miss a spot, let us know within 24 hours and we&rsquo;ll come back and re-clean it at no extra charge. We meticulously grid-walk your yard to ensure nothing is missed during our pet waste removal visits.</p>
              </div>
              <div className=&rdquo;bg-muted p-8 rounded-2xl border border-border&rdquo;>
                <Clock className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                <h3 className=&rdquo;mb-3 text-xl font-bold&rdquo;>Reliable Scheduling</h3>
                <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>We show up on your scheduled day, rain or shine. No guessing when your yard will be clean.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Testimonial - Elfsight Google Reviews Widget */}
        <section className=&rdquo;py-24 bg-background&rdquo;>
          <div className=&rdquo;container-shell max-w-4xl&rdquo;>
            <h2 className=&rdquo;text-center mb-12 text-3xl font-bold&rdquo;>What Our Customers Say</h2>
            <div className=&rdquo;elfsight-app-8240dd2e-e144-493a-add7-52c8fd1b05f7&rdquo; data-elfsight-app-lazy></div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className=&rdquo;py-24 bg-muted/30 border-t border-border&rdquo;>
          <div className=&rdquo;container-shell max-w-3xl mx-auto&rdquo;>
            <div className=&rdquo;text-center mb-12&rdquo;>
              <h2 className=&rdquo;text-3xl font-bold mb-4&rdquo;>Frequently Asked Questions</h2>
              <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>
                Everything you need to know about Scoopy Doo&rsquo;s dog poop removal and pooper scooper service in Chattanooga, TN.
              </p>
            </div>
            <div className=&rdquo;space-y-3&rdquo;>
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        <LocationSection />

        {/* Final CTA */}
        <section className=&rdquo;py-24 bg-primary text-primary-foreground text-center px-4&rdquo;>
          <div className=&rdquo;max-w-3xl mx-auto&rdquo;>
            <h2 className=&rdquo;text-primary-foreground mb-6 text-3xl md:text-4xl font-bold&rdquo;>Ready to Ditch the Pooper Scooper?</h2>
            <p className=&rdquo;text-xl font-medium text-primary-foreground/90 mb-10 leading-relaxed&rdquo;>
              Get a customized, transparent quote in minutes. No contracts, cancel anytime.
            </p>
            <CTAButton variant=&rdquo;outline&rdquo; className=&rdquo;bg-background text-foreground border-transparent hover:bg-background/90&rdquo; size=&rdquo;lg&rdquo;>
              Request Your Free Quote
            </CTAButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoreServicePage;
