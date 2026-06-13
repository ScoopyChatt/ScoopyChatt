
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

const DogPoopScoopingPage = () => {
  const faqs = [
    { question: &rdquo;What does a dog poop scooping visit include?&rdquo;, answer: &rdquo;A full grid-walk of your yard, scooping and bagging all waste, hauling it away for eco-friendly disposal, an on-the-way text before we arrive, and a photo of your secured gate when we finish.&rdquo; },
    { question: &rdquo;Do you scoop in the rain?&rdquo;, answer: &rdquo;Yes. We service on your scheduled day, rain or shine, so your yard stays clean no matter the weather.&rdquo; },
    { question: &rdquo;Will you close my gate?&rdquo;, answer: &rdquo;Always. We are careful with gates and pets on every visit, and we send you a photo of the secured gate when the job is done.&rdquo; },
    { question: &rdquo;What if I have a large or wooded yard?&rdquo;, answer: &rdquo;We grid-walk your yard regardless of size and quote based on the space and number of dogs, so you get a fair, accurate price.&rdquo; },
    { question: &rdquo;Can I change my schedule later?&rdquo;, answer: &rdquo;Anytime. There are no contracts and no penalties. You can adjust, pause, or cancel your scooping schedule whenever you need to.&rdquo; }
  ];

  return (
    <>
      <SEOHead path=&rdquo;/dog-poop-scooping-chattanooga&rdquo; faqData={faqs} />

      <div className=&rdquo;min-h-screen flex flex-col&rdquo;>
        <Header />

        <main className=&rdquo;flex-1&rdquo;>
          <section className=&rdquo;py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;grid grid-cols-1 lg:grid-cols-2 gap-12 items-center&rdquo;>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <h1 className=&rdquo;text-4xl md:text-5xl font-bold leading-tight mb-6 text-balance&rdquo;>
                    Dog Poop Scooping Service in Chattanooga, TN
                  </h1>
                  <p className=&rdquo;text-lg text-muted-foreground mb-8 leading-relaxed&rdquo;>
                    Scooping poop is nobody&rsquo;s favorite chore, so hand it to us. Scoopy Doo delivers thorough, consistent dog poop scooping across the Chattanooga area. We show up on schedule, grid-walk every inch of your yard, and text you when the job is done.
                  </p>
                  <ul className=&rdquo;space-y-4 mb-8&rdquo;>
                    {[&rsquo;No Contracts Required&rsquo;, &rsquo;Fully Insured Team&rsquo;, &rsquo;Text Notifications On Route&rsquo;, &rsquo;Secure Gate Closing&rsquo;].map((item, i) => (
                      <li key={i} className=&rdquo;flex items-center text-foreground&rdquo;>
                        <CheckCircle2 className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0&rdquo; />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg&rdquo;>
                    <Link to=&rdquo;/quote&rdquo;>Get a Free Quote <ArrowRight className=&rdquo;ml-2 w-5 h-5&rdquo; /></Link>
                  </Button>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className=&rdquo;relative aspect-video rounded-2xl overflow-hidden shadow-2xl&rdquo;>
                  <img src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/a31a7ef9578ab021774966b3677f99c1.jpg&rdquo; alt=&rdquo;Professional dog poop scooping service in Chattanooga, TN&rdquo; className=&rdquo;w-full h-full object-cover&rdquo; />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section className=&rdquo;py-20&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-6 text-balance&rdquo;>The Pooper Scooper Service Chattanooga Relies On</h2>
              <p className=&rdquo;text-lg text-muted-foreground mb-5 leading-relaxed&rdquo;>
                Our dog poop scooping service is built around three things you can count on: we show up on schedule, we cover every inch of your yard, and we leave it cleaner than we found it. You get a heads-up text when we are on the way and a photo of your secured gate when we are done, so you know your yard is clean before you even look outside.
              </p>
              <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>
                Locally owned and fully insured, Scoopy Doo makes pet waste one less thing to think about. Pick a schedule that fits your dogs and your life, and we handle the rest, with no contracts and the freedom to change anytime.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className=&rdquo;py-20 bg-muted/30 border-y border-border&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;text-center max-w-2xl mx-auto mb-14&rdquo;>
                <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance&rdquo;>How Our Scooping Process Works</h2>
                <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>Simple, reliable, and surprisingly satisfying.</p>
              </div>
              <div className=&rdquo;grid grid-cols-1 md:grid-cols-3 gap-6&rdquo;>
                <div className=&rdquo;bg-background p-8 rounded-2xl border border-border&rdquo;>
                  <Clock className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                  <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>1. Pick Your Schedule</h3>
                  <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>Choose weekly, twice-weekly, or bi-weekly service online in minutes, whatever fits your yard and your dogs.</p>
                </div>
                <div className=&rdquo;bg-background p-8 rounded-2xl border border-border&rdquo;>
                  <Shield className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                  <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>2. We Grid-Walk & Scoop</h3>
                  <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>We methodically cover your whole yard in a grid so nothing gets missed, then scoop, bag, and haul it away.</p>
                </div>
                <div className=&rdquo;bg-background p-8 rounded-2xl border border-border&rdquo;>
                  <CheckCircle2 className=&rdquo;w-10 h-10 text-primary mb-4&rdquo; />
                  <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>3. We Text You Done</h3>
                  <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>You get a photo of your secured gate and a note that your yard is clean. Missed a spot? We re-clean within 24 hours, free.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Band */}
          <section className=&rdquo;py-20&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance&rdquo;>Straightforward Scooping Prices</h2>
              <p className=&rdquo;text-lg text-muted-foreground mb-8 leading-relaxed&rdquo;>
                Weekly scooping starts at $20 per visit for your first dog, with twice-weekly service from $16 and bi-weekly from $28. Each additional dog is a small add-on. Get your exact price online in about two minutes.
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
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-10 text-center text-balance&rdquo;>Dog Poop Scooping FAQs</h2>
              <FAQAccordion faqs={faqs} />
            </div>
          </section>

          {/* Service Areas */}
          <section className=&rdquo;py-20&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
              <MapPin className=&rdquo;w-10 h-10 text-primary mx-auto mb-4&rdquo; />
              <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance&rdquo;>Scooping Yards Across Chattanooga</h2>
              <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>
                We scoop in Chattanooga, Hixson, Ooltewah, Signal Mountain, Red Bank, East Brainerd, East Ridge, Soddy-Daisy, Collegedale, and Cleveland, TN, plus Ringgold, Rossville, and Fort Oglethorpe, GA. Check your address when you request a free quote.
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

export default DogPoopScoopingPage;
