
import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { CheckCircle2, ArrowRight, ExternalLink, Shield, Clock, MapPin } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import FloatingCTA from &rsquo;@/components/FloatingCTA.jsx&rsquo;;
import ReviewsSection from &rsquo;@/components/ReviewsSection.jsx&rsquo;;
import FAQAccordion from &rsquo;@/components/FAQAccordion.jsx&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;

const PetWasteRemovalPage = () => {
  const faqs = [
    { question: &rdquo;Do you offer pet waste removal for HOAs and apartment communities?&rdquo;, answer: &rdquo;Yes. We provide common-area pet waste removal for HOAs, condos, and apartment communities, and we can install and restock pet waste stations. Request a custom community quote and we will tailor a plan to your property.&rdquo; },
    { question: &rdquo;How do you price homes with multiple dogs?&rdquo;, answer: &rdquo;Our base rates cover your first dog, with a small add-on per additional pet to account for the extra waste and time. You will always see the full price before you commit.&rdquo; },
    { question: &rdquo;Is pet waste really a health risk?&rdquo;, answer: &rdquo;Yes. Pet waste can carry roundworms, hookworms, giardia, and E. coli that affect both pets and people, and it pollutes local waterways. Regular removal is the simplest way to reduce that risk.&rdquo; },
    { question: &rdquo;How do you dispose of the waste?&rdquo;, answer: &rdquo;We bag the waste and haul it away for responsible, eco-friendly disposal. Nothing is left behind in your cans unless you prefer it that way.&rdquo; },
    { question: &rdquo;Do you sanitize between properties?&rdquo;, answer: &rdquo;Yes. We sanitize our equipment between yards so we never carry bacteria from one property to the next, keeping every visit safe and hygienic.&rdquo; }
  ];

  return (
    <>
      <SEOHead path=&rdquo;/pet-waste-removal-chattanooga&rdquo; faqData={faqs} />

      <div className=&rdquo;min-h-screen flex flex-col&rdquo;>
        <Header />

        <main className=&rdquo;flex-1&rdquo;>
          <section className=&rdquo;py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;grid grid-cols-1 lg:grid-cols-2 gap-12 items-center&rdquo;>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <h1 className=&rdquo;text-4xl md:text-5xl font-bold leading-tight mb-6 text-balance&rdquo;>
                    Expert Pet Waste Removal in Chattanooga, TN
                  </h1>
                  <p className=&rdquo;text-lg text-muted-foreground mb-8 leading-relaxed&rdquo;>
                    Pet waste is more than an eyesore, it is a health hazard. Our dedicated pet waste removal service keeps homes, multi-dog yards, HOAs, and apartment communities across Chattanooga clean, sanitary, and odor-free, so everyone can enjoy the outdoors safely.
                  </p>
                  <ul className=&rdquo;space-y-4 mb-8&rdquo;>
                    {[&rsquo;Affordable Rates&rsquo;, &rsquo;Reliable Scheduling&rsquo;, &rsquo;Sanitized Equipment&rsquo;, &rsquo;Serving 14+ Communities&rsquo;].map((item, i) => (
                      <li key={i} className=&rdquo;flex items-center text-foreground&rdquo;>
                        <CheckCircle2 className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0&rdquo; />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg&rdquo;>
                    <Link to=&rdquo;/quote&rdquo;>Book Service Now <ArrowRight className=&rdquo;ml-2 w-5 h-5&rdquo; /></Link>
                  </Button>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className=&rdquo;relative aspect-video rounded-2xl overflow-hidden shadow-2xl&rdquo;>
                  <img src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg&rdquo; alt=&rdquo;Pet waste removal service in action in Chattanooga, TN&rdquo; className=&rdquo;w-full h-full object-cover&rdquo; />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Intro / Benefits */}
          <section className=&rdquo;py-20&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-6 text-balance&rdquo;>Cleaner Yards, Healthier Homes and Communities</h2>
              <p className=&rdquo;text-lg text-muted-foreground mb-5 leading-relaxed&rdquo;>
                Left to accumulate, pet waste spreads bacteria and parasites that can harm pets and children, and it washes into Chattanooga waterways with every rain. Consistent pet waste removal protects your family, your pets, and your property, and it keeps shared spaces pleasant for everyone.
              </p>
              <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>
                Scoopy Doo is a locally owned company serving residential and commercial clients across the Greater Chattanooga area. From single-dog backyards to multi-pet households, HOAs, and apartment communities, we deliver thorough, eco-friendly pet waste management on a schedule that fits, with no contracts required.
              </p>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className=&rdquo;py-20 bg-muted/30 border-y border-border&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;text-center max-w-2xl mx-auto mb-14&rdquo;>
                <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance&rdquo;>Built for Every Property in Chattanooga</h2>
                <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>Residential or commercial, one dog or one hundred, we keep it clean.</p>
              </div>
              <div className=&rdquo;grid grid-cols-1 md:grid-cols-3 gap-6&rdquo;>
                <div className=&rdquo;bg-background p-8 rounded-2xl border border-border&rdquo;>
                  <Shield className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                  <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>Health-First, Sanitary Process</h3>
                  <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>We remove waste, then sanitize our equipment between properties so we never carry bacteria from one yard to the next.</p>
                </div>
                <div className=&rdquo;bg-background p-8 rounded-2xl border border-border&rdquo;>
                  <CheckCircle2 className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                  <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>HOAs & Communities Welcome</h3>
                  <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>Common-area service, pet waste station installation, and restocking available. One reliable vendor, consistent results.</p>
                </div>
                <div className=&rdquo;bg-background p-8 rounded-2xl border border-border&rdquo;>
                  <Clock className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                  <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>Reliable, On-Time Visits</h3>
                  <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>We arrive on your scheduled day, rain or shine, with an on-the-way text before every visit. Eco-friendly disposal included.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Band */}
          <section className=&rdquo;py-20&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance&rdquo;>Transparent Pricing for Homes & Businesses</h2>
              <p className=&rdquo;text-lg text-muted-foreground mb-8 leading-relaxed&rdquo;>
                Residential pet waste removal starts at $20 per weekly visit for your first dog, with easy add-ons for additional pets and twice-weekly service from $16 per visit. Multi-family, HOA, and commercial plans are quoted to your property size and station count. Request a tailored estimate today.
              </p>
              <div className=&rdquo;flex flex-col sm:flex-row gap-4 justify-center&rdquo;>
                <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg&rdquo;>
                  <Link to=&rdquo;/quote&rdquo;>Get Your Free Quote <ArrowRight className=&rdquo;ml-2 w-5 h-5&rdquo; /></Link>
                </Button>
                <Button asChild size=&rdquo;lg&rdquo; variant=&rdquo;outline&rdquo; className=&rdquo;h-14 px-8 text-lg rounded-xl&rdquo;>
                  <Link to=&rdquo;/pricing&rdquo;>See Full Pricing</Link>
                </Button>
              </div>
            </div>
          </section>

          <ReviewsSection />

          {/* FAQ */}
          <section className=&rdquo;py-20 bg-card border-y border-border&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-10 text-center text-balance&rdquo;>Pet Waste Removal FAQs</h2>
              <FAQAccordion faqs={faqs} />
            </div>
          </section>

          {/* Service Areas */}
          <section className=&rdquo;py-20&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
              <MapPin className=&rdquo;w-10 h-10 text-primary mx-auto mb-4&rdquo; />
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance&rdquo;>Serving Homes & Businesses Across Chattanooga</h2>
              <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>
                We serve Chattanooga, Hixson, Ooltewah, Signal Mountain, Red Bank, East Brainerd, East Ridge, Soddy-Daisy, Collegedale, and Cleveland, TN, plus Ringgold, Rossville, and Fort Oglethorpe, GA. Check your address when you request a free quote.
              </p>
            </div>
          </section>

          {/* Connect With Us Section */}
          <section className=&rdquo;py-20 bg-primary text-primary-foreground&rdquo;>
            <div className=&rdquo;max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-6 text-balance&rdquo;>Connect With Us</h2>
                <p className=&rdquo;text-lg text-primary-foreground/90 leading-relaxed mb-8 max-w-2xl mx-auto&rdquo;>
                  See what our customers are saying on Google Business Profile
                </p>
                <div className=&rdquo;flex flex-col sm:flex-row gap-4 justify-center items-center&rdquo;>
                  <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-background text-foreground hover:bg-background/90 transition-all duration-200 active:scale-[0.98] h-14 px-8 rounded-xl&rdquo;>
                    <a href=&rdquo;https://share.google/juT9kR9tE6VIxxUCj&rdquo; target=&rdquo;_blank&rdquo; rel=&rdquo;noopener noreferrer&rdquo; className=&rdquo;flex items-center&rdquo;>
                      <ExternalLink className=&rdquo;mr-2 h-5 w-5&rdquo; />
                      View on Google
                    </a>
                  </Button>
                  <Button asChild size=&rdquo;lg&rdquo; variant=&rdquo;outline&rdquo; className=&rdquo;border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-200 active:scale-[0.98] h-14 px-8 rounded-xl&rdquo;>
                    <Link to=&rdquo;/quote&rdquo;>Get a Free Quote</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingCTA />
      </div>
    </>
  );
};

export default PetWasteRemovalPage;
