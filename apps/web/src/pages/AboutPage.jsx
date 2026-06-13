import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { CheckCircle2, Star, Heart, Shield, Phone } from &rsquo;lucide-react&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { getCanonicalUrl } from &rsquo;@/utils/seoHelpers.js&rsquo;;
import { generateLocalBusinessSchema } from &rsquo;@/utils/schemaGenerators.js&rsquo;;

const AboutPage = () => {
  const canonicalUrl = getCanonicalUrl(&rsquo;/about&rsquo;);

  const stats = [
    { value: &rdquo;80+&rdquo;, label: &rdquo;Five-Star Google Reviews&rdquo; },
    { value: &rdquo;2&rdquo;, label: &rdquo;Branded Service Vehicles&rdquo; },
    { value: &rdquo;17+&rdquo;, label: &rdquo;Communities Served&rdquo; },
    { value: &rdquo;100%&rdquo;, label: &rdquo;Satisfaction Guarantee&rdquo; },
  ];

  const values = [
    { title: &rdquo;We show up, every time&rdquo;, body: &rdquo;Rain, cold, heat &mdash; we are on your route every scheduled week without exception. Our customers never have to wonder if we showed up.&rdquo; },
    { title: &rdquo;We treat your property with respect&rdquo;, body: &rdquo;We close and photograph your gate after every visit. We sanitize our equipment between every yard. We haul all waste off your property entirely.&rdquo; },
    { title: &rdquo;We are genuinely local&rdquo;, body: &rdquo;We live in the Chattanooga area. We know the neighborhoods, the terrain, and the community. This is not a franchise &mdash; it is our business and our reputation.&rdquo; },
    { title: &rdquo;No contracts, no games&rdquo;, body: &rdquo;We earn your business every single week. There are no lock-in contracts, no cancellation fees, and no confusing pricing. You get what you pay for and nothing you did not agree to.&rdquo; },
  ];

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <Helmet>
        <title>About Scoopy Doo | Chattanooga Pet Waste Removal</title>
        <meta name=&rdquo;description&rdquo; content=&rdquo;Meet Scoopy Doo LLC &mdash; Chattanooga&rsquo;s locally owned father and daughter pet waste removal company. 80+ five-star reviews, two branded service vehicles, serving 17+ communities.&rdquo; />
        <link rel=&rdquo;canonical&rdquo; href={canonicalUrl} />
        <meta property=&rdquo;og:title&rdquo; content=&rdquo;About Scoopy Doo | Chattanooga Pet Waste Removal&rdquo; />
        <meta property=&rdquo;og:description&rdquo; content=&rdquo;Meet Scoopy Doo LLC &mdash; Chattanooga&rsquo;s locally owned father and daughter pet waste removal company.&rdquo; />
        <meta property=&rdquo;og:url&rdquo; content={canonicalUrl} />
        <script type=&rdquo;application/ld+json&rdquo;>{JSON.stringify(generateLocalBusinessSchema())}</script>
      </Helmet>

      <Header />

      <main className=&rdquo;flex-grow&rdquo;>

        {/* Hero */}
        <section className=&rdquo;py-20 px-4 bg-gradient-to-b from-primary/5 to-background text-center&rdquo;>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=&rdquo;max-w-3xl mx-auto&rdquo;>
            <span className=&rdquo;inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-6&rdquo;>Locally Owned</span>
            <h1 className=&rdquo;text-4xl md:text-5xl font-extrabold text-foreground mb-6&rdquo;>
                About Scoopy Doo &mdash; Chattanooga, TN Pet Waste Removal Company
              </h1>
            <p className=&rdquo;text-lg md:text-xl text-muted-foreground&rdquo;>A father and daughter business built on showing up, doing the work right, and making Chattanooga yards a little cleaner every week.</p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className=&rdquo;py-12 bg-card border-y border-border&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center&rdquo;>
            {stats.map((s, i) => (
              <div key={i}>
                <div className=&rdquo;text-3xl md:text-4xl font-extrabold text-primary mb-1&rdquo;>{s.value}</div>
                <div className=&rdquo;text-sm text-muted-foreground&rdquo;>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className=&rdquo;py-20 px-4&rdquo;>
          <div className=&rdquo;max-w-4xl mx-auto&rdquo;>
            <div className=&rdquo;grid grid-cols-1 lg:grid-cols-2 gap-12 items-center&rdquo;>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className=&rdquo;text-3xl font-bold text-foreground mb-6&rdquo;>Our Story</h2>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-4&rdquo;>Scoopy Doo LLC was founded by a Chattanooga father and daughter who saw a real need in their community &mdash; and decided to fill it. What started as a simple idea has grown into a service that hundreds of Chattanooga families rely on every week.</p>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-4&rdquo;>We run two branded service vehicles across 17+ communities in the Chattanooga metro area and North Georgia. Our team shows up in uniform, follows a systematic grid-pattern process on every yard, and never cuts corners &mdash; because this is our community too, and our name is on every truck.</p>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>We built the business around a simple promise: make it easy. Online quotes. Online payment. A text when we are on the way. A photo of your secured gate when we are done. No contracts. No surprises.</p>
                <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;rounded-xl px-8 font-bold&rdquo;>
                  <Link to=&rdquo;/quote&rdquo;>Get Your Free Quote</Link>
                </Button>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className=&rdquo;space-y-4&rdquo;>
                {/* Team photo &mdash; Chattanooga mural */}
                <div className=&rdquo;rounded-2xl overflow-hidden border border-border shadow-lg aspect-[4/3] bg-muted flex items-center justify-center&rdquo;>
                  <img
                    src=&rdquo;/team-chattanooga-mural.jpg&rdquo;
                    alt=&rdquo;Scoopy Doo LLC owners &mdash; father and daughter team &mdash; in front of the Chattanooga Scenic City mural&rdquo;
                    className=&rdquo;w-full h-full object-cover&rdquo;
                    onError={(e) => { e.target.style.display=&rsquo;none&rsquo;; e.target.nextSibling.style.display=&rsquo;flex&rsquo;; }}
                  />
                  <div style={{display:&rsquo;none&rsquo;}} className=&rdquo;w-full h-full items-center justify-center text-muted-foreground text-sm p-8 text-center&rdquo;>
                    <span>Father and daughter owners &mdash; Chattanooga, TN</span>
                  </div>
                </div>
                <div className=&rdquo;grid grid-cols-2 gap-4&rdquo;>
                  <div className=&rdquo;rounded-xl overflow-hidden border border-border shadow aspect-square bg-muted&rdquo;>
                    <img src=&rdquo;/truck-scoopydoo.jpg&rdquo; alt=&rdquo;Scoopy Doo branded service truck&rdquo; className=&rdquo;w-full h-full object-cover&rdquo; />
                  </div>
                  <div className=&rdquo;rounded-xl overflow-hidden border border-border shadow aspect-square bg-muted&rdquo;>
                    <img src=&rdquo;/team-uniforms.jpg&rdquo; alt=&rdquo;Scoopy Doo team in uniform&rdquo; className=&rdquo;w-full h-full object-cover&rdquo; />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className=&rdquo;py-16 bg-primary/5 px-4&rdquo;>
          <div className=&rdquo;max-w-4xl mx-auto text-center&rdquo;>
            <div className=&rdquo;flex justify-center gap-1 mb-4&rdquo;>
              {[...Array(5)].map((_, i) => <Star key={i} className=&rdquo;w-6 h-6 fill-yellow-400 text-yellow-400&rdquo; />)}
            </div>
            <h2 className=&rdquo;text-2xl font-bold text-foreground mb-2&rdquo;>80+ Five-Star Google Reviews</h2>
            <p className=&rdquo;text-muted-foreground mb-8&rdquo;>Hundreds of Chattanooga families trust us with their yards every week. Here is what they say.</p>
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-3 gap-6 text-left&rdquo;>
              {[
                { quote: &rdquo;I have two big dogs and a small yard. Scoopy Doo shows up every week without fail &mdash; I literally never think about it anymore.&rdquo;, author: &rdquo;Sarah M.&rdquo;, location: &rdquo;Highland Park&rdquo; },
                { quote: &rdquo;Our HOA was getting complaints about dog waste in the common areas. Scoopy Doo solved it in week one. We have had zero complaints since.&rdquo;, author: &rdquo;HOA Board&rdquo;, location: &rdquo;Cambridge Square, Ooltewah&rdquo; },
                { quote: &rdquo;I was skeptical at first but after the first visit I was sold. They get every single spot. My yard looks better than it has in years.&rdquo;, author: &rdquo;Tony R.&rdquo;, location: &rdquo;East Ridge&rdquo; },
              ].map((review, i) => (
                <div key={i} className=&rdquo;bg-card border border-border rounded-2xl p-6&rdquo;>
                  <div className=&rdquo;flex gap-0.5 mb-3&rdquo;>{[...Array(5)].map((_, j) => <Star key={j} className=&rdquo;w-4 h-4 fill-yellow-400 text-yellow-400&rdquo; />)}</div>
                  <p className=&rdquo;text-foreground text-sm leading-relaxed mb-4 italic&rdquo;>&rdquo;{review.quote}&rdquo;</p>
                  <div className=&rdquo;text-xs text-muted-foreground font-medium&rdquo;>{review.author} &mdash; {review.location}</div>
                </div>
              ))}
            </div>
            <div className=&rdquo;mt-8&rdquo;>
              <a href=&rdquo;https://share.google/sOBVeLPqRabhfffPg&rdquo; target=&rdquo;_blank&rdquo; rel=&rdquo;noopener noreferrer&rdquo; className=&rdquo;inline-flex items-center gap-2 text-primary hover:underline font-semibold&rdquo;>
                <Star className=&rdquo;w-4 h-4 fill-yellow-400 text-yellow-400&rdquo; />
                Read all our Google reviews
              </a>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className=&rdquo;py-20 px-4&rdquo;>
          <div className=&rdquo;max-w-4xl mx-auto&rdquo;>
            <h2 className=&rdquo;text-3xl font-bold text-foreground text-center mb-12&rdquo;>What We Stand For</h2>
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-6&rdquo;>
              {values.map((v, i) => (
                <div key={i} className=&rdquo;flex gap-4 bg-card border border-border rounded-2xl p-6&rdquo;>
                  <div className=&rdquo;w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0&rdquo;>
                    <CheckCircle2 className=&rdquo;w-5 h-5 text-primary&rdquo; />
                  </div>
                  <div>
                    <h3 className=&rdquo;font-bold text-foreground mb-2&rdquo;>{v.title}</h3>
                    <p className=&rdquo;text-muted-foreground text-sm leading-relaxed&rdquo;>{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* In action photos */}
        <section className=&rdquo;py-12 bg-muted/30 px-4&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto&rdquo;>
            <h2 className=&rdquo;text-2xl font-bold text-foreground text-center mb-8&rdquo;>Scoopy Doo In Action</h2>
            <div className=&rdquo;grid grid-cols-2 md:grid-cols-4 gap-4&rdquo;>
              {[
                { src: &rdquo;/images/service-action-yard.jpg&rdquo;, alt: &rdquo;Scoopy Doo technician cleaning a Chattanooga yard&rdquo; },
                { src: &rdquo;/images/service-bags-removed.jpg&rdquo;, alt: &rdquo;Waste double-bagged and removed from property&rdquo; },
                { src: &rdquo;/images/service-luxury-home.jpg&rdquo;, alt: &rdquo;Scoopy Doo servicing a luxury property&rdquo; },
                { src: &rdquo;/images/happy-customers.jpg&rdquo;, alt: &rdquo;Happy Scoopy Doo customers with clean yard&rdquo; },
              ].map((img, i) => (
                <div key={i} className=&rdquo;rounded-xl overflow-hidden border border-border shadow aspect-square bg-muted&rdquo;>
                  <img src={img.src} alt={img.alt} className=&rdquo;w-full h-full object-cover&rdquo; loading=&rdquo;lazy&rdquo; />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className=&rdquo;py-20 px-4 bg-primary text-primary-foreground text-center&rdquo;>
          <div className=&rdquo;max-w-2xl mx-auto&rdquo;>
            <h2 className=&rdquo;text-3xl font-extrabold mb-4&rdquo;>Ready to Meet Your New Yard Crew?</h2>
            <p className=&rdquo;text-lg opacity-90 mb-8&rdquo;>Get a free quote in under 2 minutes. We respond the same day.</p>
            <div className=&rdquo;flex flex-col sm:flex-row gap-4 justify-center&rdquo;>
              <Button asChild size=&rdquo;lg&rdquo; variant=&rdquo;secondary&rdquo; className=&rdquo;rounded-xl px-8 h-14 font-bold&rdquo;>
                <Link to=&rdquo;/quote&rdquo;>Get My Free Quote</Link>
              </Button>
              <Button asChild size=&rdquo;lg&rdquo; variant=&rdquo;outline&rdquo; className=&rdquo;rounded-xl px-8 h-14 font-bold border-white/40 text-white hover:bg-white/10&rdquo;>
                <a href=&rdquo;tel:423-600-5040&rdquo;><Phone className=&rdquo;mr-2 w-4 h-4&rdquo; />Call (423) 600-5040</a>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
