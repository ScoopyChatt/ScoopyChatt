
import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { ArrowRight, Shield, CheckCircle2, Leaf, ClipboardCheck, ExternalLink } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import ServiceCard from &rsquo;@/components/ServiceCard.jsx&rsquo;;
import FloatingCTA from &rsquo;@/components/FloatingCTA.jsx&rsquo;;
import PetSafeChecklistCTA from &rsquo;@/components/PetSafeChecklistCTA.jsx&rsquo;;
import CustomGoogleReviewsCarousel from &rsquo;@/components/CustomGoogleReviewsCarousel.jsx&rsquo;;
import { getCanonicalUrl } from &rsquo;@/utils/seoHelpers.js&rsquo;;

const HomePage = () => {
  const services = [{
    title: &rsquo;Weekly Service&rsquo;,
    description: &rsquo;Keep your yard consistently clean with our most popular dog waste removal option.&rsquo;,
    benefits: [&rsquo;Scheduled weekly visits&rsquo;, &rsquo;Complete yard cleanup&rsquo;, &rsquo;Waste disposal included&rsquo;, &rsquo;Flexible scheduling&rsquo;],
    mostPopular: true
  }, {
    title: &rsquo;2X Weekly Service&rsquo;,
    description: &rsquo;Twice weekly professional cleaning service for homes that need more frequent pet waste removal.&rsquo;,
    benefits: [&rsquo;Two visits per week&rsquo;, &rsquo;Maximum yard cleanliness&rsquo;, &rsquo;Perfect for multiple pets&rsquo;, &rsquo;Ideal for high-traffic yards&rsquo;]
  }, {
    title: &rsquo;Bi-Weekly Service&rsquo;,
    description: &rsquo;Perfect balance of cleanliness and affordability for smaller yards needing a scoop poop service.&rsquo;,
    benefits: [&rsquo;Every two weeks service&rsquo;, &rsquo;Thorough yard inspection&rsquo;, &rsquo;Eco-friendly disposal&rsquo;, &rsquo;Easy online booking&rsquo;]
  }, {
    title: &rsquo;One-Time Cleanup&rsquo;,
    description: &rsquo;Deep cleaning pooper scooper service for special occasions or seasonal needs.&rsquo;,
    benefits: [&rsquo;Comprehensive cleanup&rsquo;, &rsquo;Same-day availability&rsquo;, &rsquo;No commitment required&rsquo;, &rsquo;Perfect for events&rsquo;]
  }];

  const canonicalUrl = getCanonicalUrl(&rsquo;/&rsquo;);

  return (
    <>
      <Helmet>
        <title>Dog Poop Removal & Pooper Scooper Service | Chattanooga TN</title>
        <meta name=&rdquo;description&rdquo; content=&rdquo;Professional dog poop removal & pooper scooper service in Chattanooga, TN. Reliable weekly pet waste cleanup. Get your free quote from Scoopy Doo today.&rdquo; />
        <link rel=&rdquo;canonical&rdquo; href={canonicalUrl} />
        <meta property=&rdquo;og:title&rdquo; content=&rdquo;Dog Poop Removal & Pooper Scooper Service | Chattanooga TN&rdquo; />
        <meta property=&rdquo;og:description&rdquo; content=&rdquo;Professional dog poop removal & pooper scooper service in Chattanooga, TN. Reliable weekly pet waste cleanup. Get your free quote from Scoopy Doo today.&rdquo; />
        <meta property=&rdquo;og:url&rdquo; content={canonicalUrl} />
        <meta name=&rdquo;twitter:card&rdquo; content=&rdquo;summary&rdquo; />
      </Helmet>

      <div className=&rdquo;min-h-screen flex flex-col&rdquo;>
        <Header />

        <main className=&rdquo;flex-1 relative pb-24 md:pb-0&rdquo;>
          <section className=&rdquo;relative flex flex-col items-center bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-24 pb-12&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center&rdquo;>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }} 
                className=&rdquo;w-full flex justify-center mb-8&rdquo;
              >
                <img 
                  src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/7f889d94bae15b826df9c1daf461a7b9.png&rdquo; 
                  alt=&rdquo;Scoopy Doo LLC - Professional dog poop removal service in Chattanooga&rdquo; 
                  title=&rdquo;Scoopy Doo Pet Waste Removal Logo&rdquo;
                  className=&rdquo;w-[180px] md:w-[220px] h-auto object-contain&rdquo;
                  loading=&rdquo;eager&rdquo;
                  fetchPriority=&rdquo;high&rdquo;
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className=&rdquo;w-full max-w-4xl mx-auto mb-10 px-4 sm:px-0&rdquo;
              >
                <div className=&rdquo;relative aspect-[4/3] sm:aspect-video md:aspect-[2.35/1] overflow-hidden rounded-2xl shadow-2xl border border-border/50 bg-muted&rdquo;>
                  <img
                    src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/a31a7ef9578ab021774966b3677f99c1.jpg&rdquo;
                    alt=&rdquo;Professional pooper scooper service cleaning a yard in Chattanooga, TN&rdquo;
                    title=&rdquo;Dog Poop Removal Service in Action&rdquo;
                    className=&rdquo;w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700&rdquo;
                    loading=&rdquo;eager&rdquo;
                    fetchPriority=&rdquo;high&rdquo;
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }} 
                className=&rdquo;max-w-4xl mx-auto text-center mt-4 mb-16&rdquo;
              >
                <h1 className=&rdquo;text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance&rdquo; style={{ letterSpacing: &rsquo;-0.02em&rsquo; }}>
                  Dog Poop Removal in Chattanooga, TN
                </h1>
                <p className=&rdquo;text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 max-w-[65ch] mx-auto&rdquo;>
                  Spend more time enjoying your yard and less time cleaning it. Our reliable <Link to=&rdquo;/services&rdquo; className=&rdquo;text-primary hover:underline&rdquo;>pooper scooper service</Link> keeps your outdoor space clean, safe, and ready for your family and pets. We specialize in professional <Link to=&rdquo;/dog-poop-removal-chattanooga&rdquo; className=&rdquo;text-primary hover:underline&rdquo;>dog poop removal</Link> and comprehensive <Link to=&rdquo;/pet-waste-removal-chattanooga&rdquo; className=&rdquo;text-primary hover:underline&rdquo;>pet waste removal</Link> services.
                </p>
                <p className=&rdquo;text-base font-medium text-primary mb-10&rdquo;>
                  Proudly Serving the Chattanooga Tennessee Metro Area
                </p>
                <div className=&rdquo;flex flex-col sm:flex-row gap-4 justify-center items-center&rdquo;>
                  <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-[#FF9E30] text-white hover:bg-[#FF9E30]/90 transition-all duration-200 active:scale-[0.98] h-14 px-8 text-lg rounded-xl shadow-xl w-full sm:w-auto&rdquo;>
                    <Link to=&rdquo;/quote&rdquo; className=&rdquo;flex items-center&rdquo;>
                      <ClipboardCheck className=&rdquo;mr-2 h-5 w-5&rdquo; />
                      Get Your Free Pooper Scooper Quote
                    </Link>
                  </Button>
                  <Button asChild size=&rdquo;lg&rdquo; variant=&rdquo;outline&rdquo; className=&rdquo;transition-all duration-200 active:scale-[0.98] h-14 px-8 text-lg rounded-xl w-full sm:w-auto bg-background/50 backdrop-blur-sm&rdquo;>
                    <Link to=&rdquo;/services&rdquo;>Explore Our Services</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          <section className=&rdquo;py-10 bg-card border-y border-border/50&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;grid grid-cols-2 lg:grid-cols-4 gap-6 text-center&rdquo;>
                <div className=&rdquo;flex flex-col items-center gap-2 p-4&rdquo;>
                  <span className=&rdquo;text-3xl&rdquo;>⭐</span>
                  <div className=&rdquo;font-extrabold text-lg text-foreground&rdquo;>5-Star Rated</div>
                  <div className=&rdquo;text-sm text-muted-foreground&rdquo;>on Google Reviews</div>
                </div>
                <div className=&rdquo;flex flex-col items-center gap-2 p-4&rdquo;>
                  <span className=&rdquo;text-3xl&rdquo;>👨‍👧</span>
                  <div className=&rdquo;font-extrabold text-lg text-foreground&rdquo;>Family Owned</div>
                  <div className=&rdquo;text-sm text-muted-foreground&rdquo;>Local father & daughter team</div>
                </div>
                <div className=&rdquo;flex flex-col items-center gap-2 p-4&rdquo;>
                  <span className=&rdquo;text-3xl&rdquo;>📍</span>
                  <div className=&rdquo;font-extrabold text-lg text-foreground&rdquo;>17+ Communities</div>
                  <div className=&rdquo;text-sm text-muted-foreground&rdquo;>Chattanooga metro & North GA</div>
                </div>
                <div className=&rdquo;flex flex-col items-center gap-2 p-4&rdquo;>
                  <span className=&rdquo;text-3xl&rdquo;>🚫</span>
                  <div className=&rdquo;font-extrabold text-lg text-foreground&rdquo;>No Contracts</div>
                  <div className=&rdquo;text-sm text-muted-foreground&rdquo;>Cancel or change anytime</div>
                </div>
              </div>
              <div className=&rdquo;mt-6 pt-6 border-t border-border/50 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground&rdquo;>
                <span className=&rdquo;flex items-center gap-1.5&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary&rdquo; /> Online quotes & payment</span>
                <span className=&rdquo;flex items-center gap-1.5&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary&rdquo; /> On-the-way text before every visit</span>
                <span className=&rdquo;flex items-center gap-1.5&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary&rdquo; /> Gate photo sent when done</span>
                <span className=&rdquo;flex items-center gap-1.5&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary&rdquo; /> Residential, commercial & HOA service</span>
                <span className=&rdquo;flex items-center gap-1.5&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary&rdquo; /> Fully insured & equipment sanitized</span>
              </div>
            </div>
          </section>

          <section className=&rdquo;py-24 bg-background border-b border-border/50 overflow-hidden&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5 }} 
                className=&rdquo;text-center mb-16&rdquo;
              >
                <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-6 text-balance&rdquo;>What Our Customers Say</h2>
                <p className=&rdquo;text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed&rdquo;>
                  Don&rsquo;t just take our word for it. See why pet owners across Chattanooga trust us with their yards.
                </p>
              </motion.div>
              
              <CustomGoogleReviewsCarousel />
            </div>
          </section>

          <section className=&rdquo;py-24 bg-muted/30 border-b border-border/50&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className=&rdquo;text-center mb-16&rdquo;>
                <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-6 text-balance&rdquo;>Expert Dog Poop Scooping & Pet Waste Removal</h2>
                <p className=&rdquo;text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed&rdquo;>
                  Choose the service plan that fits your needs. As a leading poop pick up company, we provide custom quotes for all our clients. Whether you need regular dog waste removal or a <Link to=&rdquo;/one-time-cleanup&rdquo; className=&rdquo;text-primary hover:underline&rdquo;>one-time scoop poop service</Link>, we&rsquo;ve got you covered.
                </p>
              </motion.div>

              <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-8 mb-12&rdquo;>
                {services.map((service, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <ServiceCard {...service} />
                  </motion.div>
                ))}
              </div>

              <div className=&rdquo;text-center&rdquo;>
                <Button asChild variant=&rdquo;outline&rdquo; size=&rdquo;lg&rdquo; className=&rdquo;transition-all duration-200 active:scale-[0.98] h-12 px-8 rounded-xl bg-background&rdquo;>
                  <Link to=&rdquo;/quote&rdquo; className=&rdquo;flex items-center&rdquo;>
                    Ready to get started? Request a Quote <ArrowRight className=&rdquo;ml-2 h-4 w-4&rdquo; />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className=&rdquo;py-24 bg-background border-b border-border/50&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;grid grid-cols-1 lg:grid-cols-2 gap-12 items-center&rdquo;>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                  <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-6 text-balance&rdquo;>About Scoopy Doo</h2>
                  <p className=&rdquo;text-lg text-muted-foreground mb-6 leading-relaxed&rdquo;>
                    Scoopy Doo LLC was founded with a simple mission: to give Chattanooga homeowners their weekends back. We understand that while you love your dogs, cleaning up after them is a chore that often falls to the bottom of the to-do list.
                  </p>
                  <p className=&rdquo;text-lg text-muted-foreground mb-8 leading-relaxed&rdquo;>
                    As a locally owned and operated business, we take pride in serving our community. From <Link to=&rdquo;/service/hixson&rdquo; className=&rdquo;text-primary hover:underline&rdquo;>dog poop removal in Hixson</Link> to <Link to=&rdquo;/service/ooltewah&rdquo; className=&rdquo;text-primary hover:underline&rdquo;>pet waste cleanup in Ooltewah</Link>, our dedicated team ensures your yard is safe, sanitary, and ready for play.
                  </p>
                  <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-xl&rdquo;>
                    <Link to=&rdquo;/about&rdquo;>Learn More About Us</Link>
                  </Button>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className=&rdquo;relative aspect-video rounded-2xl overflow-hidden shadow-xl&rdquo;>
                  <img src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg&rdquo; alt=&rdquo;Scoopy Doo founder and team&rdquo; title=&rdquo;About Scoopy Doo LLC&rdquo; className=&rdquo;w-full h-full object-cover&rdquo; loading=&rdquo;lazy&rdquo; />
                </motion.div>
              </div>
            </div>
          </section>

          <section className=&rdquo;py-16 bg-muted/20 border-b border-border/50&rdquo;>
            <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
              <h3 className=&rdquo;text-2xl font-bold mb-8&rdquo;>Areas We Serve</h3>
              <div className=&rdquo;flex flex-wrap justify-center gap-4&rdquo;>
                <Link to=&rdquo;/service/hixson&rdquo; className=&rdquo;px-4 py-2 bg-card border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors&rdquo;>Hixson</Link>
                <Link to=&rdquo;/service/red-bank&rdquo; className=&rdquo;px-4 py-2 bg-card border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors&rdquo;>Red Bank</Link>
                <Link to=&rdquo;/service/signal-mountain&rdquo; className=&rdquo;px-4 py-2 bg-card border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors&rdquo;>Signal Mountain</Link>
                <Link to=&rdquo;/service/ooltewah&rdquo; className=&rdquo;px-4 py-2 bg-card border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors&rdquo;>Ooltewah</Link>
                <Link to=&rdquo;/service/east-brainerd&rdquo; className=&rdquo;px-4 py-2 bg-card border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors&rdquo;>East Brainerd</Link>
                <Link to=&rdquo;/service/ringgold&rdquo; className=&rdquo;px-4 py-2 bg-card border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors&rdquo;>Ringgold, GA</Link>
                <Link to=&rdquo;/service/cleveland&rdquo; className=&rdquo;px-4 py-2 bg-card border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors&rdquo;>Cleveland, TN</Link>
              </div>
            </div>
          </section>

          <PetSafeChecklistCTA />

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
                  See what our customers are saying and connect with us on Google Business Profile
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

export default HomePage;
