
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

const DogPoopRemovalPage = () => {
  const faqs = [
    { question: &rdquo;How much does dog poop removal cost in Chattanooga?&rdquo;, answer: &rdquo;Weekly dog poop removal starts at $20 per visit for your first dog, with twice-weekly service from $16 per visit and bi-weekly from $28. One-time cleanups start at $75. Each additional dog is a small add-on. You will see an exact price before you commit.&rdquo; },
    { question: &rdquo;How often should I schedule dog poop removal?&rdquo;, answer: &rdquo;Most one and two dog homes do best with weekly visits, which keeps bacteria and odor in check and protects your lawn. Busy or multi-dog yards often prefer twice-weekly service, while smaller dogs or larger lots can work well bi-weekly.&rdquo; },
    { question: &rdquo;Do I need to be home for service?&rdquo;, answer: &rdquo;No. As long as we can safely access your yard, you do not need to be there. We send an on-the-way text before every visit and a photo of your secured gate when we finish.&rdquo; },
    { question: &rdquo;What if my yard has not been cleaned in a while?&rdquo;, answer: &rdquo;No problem. We start with a one-time initial cleanup to get your yard back to a clean baseline, then keep it that way on your regular schedule.&rdquo; },
    { question: &rdquo;Is there a contract?&rdquo;, answer: &rdquo;Never. There are no contracts and you can pause or cancel anytime. You stay because your yard is always clean, not because you are locked in.&rdquo; }
  ];

  return (
    <>
      <SEOHead path=&rdquo;/dog-poop-removal-chattanooga&rdquo; faqData={faqs} />

      <div className=&rdquo;min-h-screen flex flex-col&rdquo;>
        <Header />

        <main className=&rdquo;flex-1&rdquo;>
          <section className=&rdquo;py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;grid grid-cols-1 lg:grid-cols-2 gap-12 items-center&rdquo;>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <h1 className=&rdquo;text-4xl md:text-5xl font-bold leading-tight mb-6 text-balance&rdquo;>
                    Professional Dog Poop Removal in Chattanooga, TN
                  </h1>
                  <p className=&rdquo;text-lg text-muted-foreground mb-8 leading-relaxed&rdquo;>
                    Reclaim your yard and your weekends. Scoopy Doo provides reliable, eco-friendly dog poop removal for Chattanooga homeowners. We show up on your scheduled day, grid-walk every inch of your yard, and haul the mess away, so you can enjoy a clean, safe outdoor space with your family and pets.
                  </p>
                  <ul className=&rdquo;space-y-4 mb-8&rdquo;>
                    {[&rsquo;Weekly & Bi-Weekly Plans&rsquo;, &rsquo;One-Time Deep Cleans&rsquo;, &rsquo;Eco-Friendly Disposal&rsquo;, &rsquo;100% Satisfaction Guarantee&rsquo;].map((item, i) => (
                      <li key={i} className=&rdquo;flex items-center text-foreground&rdquo;>
                        <CheckCircle2 className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0&rdquo; />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg&rdquo;>
                    <Link to=&rdquo;/quote&rdquo;>Get Your Free Quote <ArrowRight className=&rdquo;ml-2 w-5 h-5&rdquo; /></Link>
                  </Button>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className=&rdquo;relative aspect-video rounded-2xl overflow-hidden shadow-2xl&rdquo;>
                  <img src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/a31a7ef9578ab021774966b3677f99c1.jpg&rdquo; alt=&rdquo;ScoopyChatt team providing dog poop removal services in Chattanooga, TN&rdquo; className=&rdquo;w-full h-full object-cover&rdquo; />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Intro / Benefits */}
          <section className=&rdquo;py-20&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-6 text-balance&rdquo;>Reliable Dog Waste Removal That Protects Your Yard and Your Family</h2>
              <p className=&rdquo;text-lg text-muted-foreground mb-5 leading-relaxed&rdquo;>
                Leaving dog waste to pile up is more than an eyesore. It carries bacteria and parasites that can harm pets and children, burns brown spots into your grass, and washes into Chattanooga creeks and rivers every time it rains. Consistent dog poop removal solves all of it, and it gives you back the time you would have spent scooping.
              </p>
              <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>
                Scoopy Doo is a locally owned pet waste removal company serving the Greater Chattanooga area. Whether you have one dog or five, we build a simple schedule around your yard and keep it spotless week after week, with no contracts and no surprises.
              </p>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className=&rdquo;py-20 bg-muted/30 border-y border-border&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;text-center max-w-2xl mx-auto mb-14&rdquo;>
                <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance&rdquo;>Why Chattanooga Homeowners Choose Scoopy Doo</h2>
                <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>Thorough, dependable, and refreshingly simple. Here is what every visit includes.</p>
              </div>
              <div className=&rdquo;grid grid-cols-1 md:grid-cols-3 gap-6&rdquo;>
                <div className=&rdquo;bg-background p-8 rounded-2xl border border-border&rdquo;>
                  <Shield className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                  <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>24-Hour Re-Clean Guarantee</h3>
                  <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>We meticulously grid-walk your entire yard so nothing gets missed. If we ever do miss a spot, let us know within 24 hours and we will come back and re-clean it free.</p>
                </div>
                <div className=&rdquo;bg-background p-8 rounded-2xl border border-border&rdquo;>
                  <Clock className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                  <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>Rain-or-Shine Reliability</h3>
                  <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>We show up on your scheduled day, every time. You get an on-the-way text before each visit and a photo of your secured gate when we are done.</p>
                </div>
                <div className=&rdquo;bg-background p-8 rounded-2xl border border-border&rdquo;>
                  <CheckCircle2 className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                  <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>No Contracts, Ever</h3>
                  <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>Quote and pay online in minutes. Flexible weekly or bi-weekly service with transparent pricing. Pause or cancel anytime.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Band */}
          <section className=&rdquo;py-20&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance&rdquo;>Simple, Transparent Pricing</h2>
              <p className=&rdquo;text-lg text-muted-foreground mb-8 leading-relaxed&rdquo;>
                Weekly dog poop removal starts at just $20 per visit for your first dog. Prefer more frequent service? Twice-weekly visits start at $16 each. On a budget or have a smaller dog? Bi-weekly service starts at $28. Every plan includes our detailed grid-walk, eco-friendly disposal, and the 24-hour re-clean guarantee.
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
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-10 text-center text-balance&rdquo;>Dog Poop Removal FAQs</h2>
              <FAQAccordion faqs={faqs} />
            </div>
          </section>

          {/* Service Areas */}
          <section className=&rdquo;py-20&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
              <MapPin className=&rdquo;w-10 h-10 text-primary mx-auto mb-4&rdquo; />
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance&rdquo;>Serving Chattanooga & Surrounding Communities</h2>
              <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>
                We provide dog poop removal across Chattanooga, Hixson, Ooltewah, Signal Mountain, Red Bank, East Brainerd, East Ridge, Soddy-Daisy, Collegedale, and Cleveland, TN, plus Ringgold, Rossville, and Fort Oglethorpe, GA. Check your address when you request a free quote.
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

export default DogPoopRemovalPage;
