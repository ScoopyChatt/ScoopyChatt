
import React from &rsquo;react&rsquo;;
import { useParams, Link } from &rsquo;react-router-dom&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { MapPin, CheckCircle2, Loader2, AlertCircle, Star, MessageSquare } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from &rsquo;@/components/ui/accordion&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import FloatingCTA from &rsquo;@/components/FloatingCTA.jsx&rsquo;;
import FAQSection from &rsquo;@/components/FAQSection.jsx&rsquo;;
import ReviewsSection from &rsquo;@/components/ReviewsSection.jsx&rsquo;;
import { getCanonicalUrl } from &rsquo;@/utils/seoHelpers.js&rsquo;;
import { generateLocalBusinessSchema, generateFAQPageSchema, generateBreadcrumbSchema, generateLocationSchema } from &rsquo;@/utils/schemaGenerators.js&rsquo;;
import { locations } from &rsquo;@/data/locations.js&rsquo;;

const LocationTemplate = ({ city: propCity }) => {
  const { slug } = useParams();
  const citySlug = propCity || slug;

  const locationData = locations.find(l =>
    l.slug.toLowerCase() === citySlug?.toLowerCase() ||
    l.id.toLowerCase() === citySlug?.toLowerCase()
  );

  if (!citySlug) {
    return (
      <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
        <Header />
        <main className=&rdquo;flex-grow flex items-center justify-center&rdquo;>
          <div className=&rdquo;text-center flex flex-col items-center&rdquo;>
            <Loader2 className=&rdquo;w-10 h-10 text-primary animate-spin mb-4&rdquo; />
            <h2 className=&rdquo;text-2xl font-bold mb-2&rdquo;>Loading Location...</h2>
            <p className=&rdquo;text-muted-foreground&rdquo;>Please wait while we fetch the service area details.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!locationData) {
    return (
      <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
        <Header />
        <main className=&rdquo;flex-grow flex items-center justify-center py-20&rdquo;>
          <div className=&rdquo;text-center flex flex-col items-center max-w-md px-4&rdquo;>
            <AlertCircle className=&rdquo;w-12 h-12 text-destructive mb-4&rdquo; />
            <h2 className=&rdquo;text-2xl font-bold mb-2&rdquo;>Location Not Found</h2>
            <p className=&rdquo;text-muted-foreground mb-6&rdquo;>We could not find the service area you are looking for. We serve the greater Chattanooga area and North Georgia.</p>
            <Button asChild>
              <Link to=&rdquo;/service-areas&rdquo;>View All Service Areas</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { name, seoTitle, seoDescription, serviceDescription, localContext, neighborhoods, testimonial, benefits, faqItems } = locationData;
  const canonicalUrl = getCanonicalUrl(&rsquo;/service/&rsquo; + locationData.slug);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: &rsquo;Home&rsquo;, url: &rsquo;https://scoopychatt.com/&rsquo; },
    { name: &rsquo;Service Areas&rsquo;, url: &rsquo;https://scoopychatt.com/service-areas&rsquo; },
    { name: name, url: canonicalUrl }
  ]);
  const faqSchema = faqItems && faqItems.length > 0 ? generateFAQPageSchema(faqItems) : null;
  const locationSchema = generateLocationSchema(locationData);

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name=&rdquo;description&rdquo; content={seoDescription} />
        <link rel=&rdquo;canonical&rdquo; href={canonicalUrl} />
        <meta property=&rdquo;og:title&rdquo; content={seoTitle} />
        <meta property=&rdquo;og:description&rdquo; content={seoDescription} />
        <meta property=&rdquo;og:url&rdquo; content={canonicalUrl} />
        <meta name=&rdquo;twitter:card&rdquo; content=&rdquo;summary&rdquo; />
        <script type=&rdquo;application/ld+json&rdquo;>
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
        <script type=&rdquo;application/ld+json&rdquo;>
          {JSON.stringify(locationSchema)}
        </script>
        <script type=&rdquo;application/ld+json&rdquo;>
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {faqSchema && (
          <script type=&rdquo;application/ld+json&rdquo;>
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <Header />

      <main className=&rdquo;flex-grow&rdquo;>
        {/* Hero */}
        <section className=&rdquo;relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden bg-slate-950&rdquo;>
          <div className=&rdquo;absolute inset-0 overflow-hidden pointer-events-none&rdquo;>
            <div className=&rdquo;absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-primary/10 blur-3xl opacity-50 mix-blend-screen&rdquo; />
            <div className=&rdquo;absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-blue-900/20 blur-3xl opacity-50 mix-blend-screen&rdquo; />
          </div>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10&rdquo;>
            <div className=&rdquo;max-w-3xl&rdquo;>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className=&rdquo;inline-flex items-center space-x-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/30 shadow-sm&rdquo;>
                  <MapPin className=&rdquo;w-4 h-4&rdquo; />
                  <span>Now Serving {name} & Surrounding Areas</span>
                </div>
                <h1 className=&rdquo;text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 text-balance&rdquo; style={{ letterSpacing: &rsquo;-0.02em&rsquo; }}>
                  Dog Poop Removal in {name}
                </h1>
                <p className=&rdquo;text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl&rdquo;>
                  {serviceDescription}
                </p>
                <div className=&rdquo;flex flex-col sm:flex-row gap-4&rdquo;>
                  <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]&rdquo;>
                    <Link to=&rdquo;/quote&rdquo;>Get a Free Quote</Link>
                  </Button>
                  <Button asChild variant=&rdquo;outline&rdquo; size=&rdquo;lg&rdquo; className=&rdquo;bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white h-14 px-8 text-lg rounded-xl transition-all active:scale-[0.98]&rdquo;>
                    <a href=&rdquo;tel:423-600-5040&rdquo;>Call (423) 600-5040</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className=&rdquo;py-8 bg-card border-b border-border&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center&rdquo;>
            {[
              { icon: &rdquo;ð»&rdquo;, label: &rdquo;Online Quotes & Pay&rdquo; },
              { icon: &rdquo;ð±&rdquo;, label: &rdquo;On-the-Way Texts&rdquo; },
              { icon: &rdquo;ð¸&rdquo;, label: &rdquo;Gate Photo When Done&rdquo; },
              { icon: &rdquo;ð«&rdquo;, label: &rdquo;No Contracts&rdquo; },
            ].map((item, i) => (
              <div key={i} className=&rdquo;flex flex-col items-center gap-1&rdquo;>
                <span className=&rdquo;text-2xl&rdquo;>{item.icon}</span>
                <span className=&rdquo;text-xs font-semibold text-foreground&rdquo;>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Local Context */}
        {localContext && (
          <section className=&rdquo;py-16 bg-background&rdquo;>
            <div className=&rdquo;max-w-4xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <h2 className=&rdquo;text-2xl md:text-3xl font-bold text-foreground mb-6&rdquo;>Why {name} Pet Owners Need Professional Cleanup</h2>
              <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>{localContext}</p>
            </div>
          </section>
        )}

        {/* Neighborhoods */}
        {neighborhoods && neighborhoods.length > 0 && (
          <section className=&rdquo;py-12 bg-primary/5&rdquo;>
            <div className=&rdquo;max-w-4xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;flex items-center gap-3 mb-6&rdquo;>
                <MapPin className=&rdquo;w-6 h-6 text-primary flex-shrink-0&rdquo; />
                <h2 className=&rdquo;text-2xl font-bold text-foreground&rdquo;>Neighborhoods We Serve in {name}</h2>
              </div>
              <div className=&rdquo;flex flex-wrap gap-2&rdquo;>
                {neighborhoods.map((n, i) => (
                  <span key={i} className=&rdquo;px-3 py-1.5 bg-background border border-border rounded-full text-sm text-foreground font-medium&rdquo;>
                    {n}
                  </span>
                ))}
              </div>
              <p className=&rdquo;mt-4 text-sm text-muted-foreground&rdquo;>Not sure if we cover your street? <Link to=&rdquo;/quote&rdquo; className=&rdquo;text-primary hover:underline font-medium&rdquo;>Request a free quote</Link> and we will confirm your address.</p>
            </div>
          </section>
        )}

        {/* Benefits */}
        <section className=&rdquo;py-20 bg-background&rdquo;>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <div className=&rdquo;text-center mb-12&rdquo;>
              <h2 className=&rdquo;text-3xl font-bold mb-4&rdquo;>Why {name} Chooses Scoopy Doo</h2>
              <p className=&rdquo;text-muted-foreground max-w-2xl mx-auto&rdquo;>Professional, reliable pet waste removal with every detail handled for you.</p>
            </div>
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6&rdquo;>
              {benefits.map((benefit, index) => (
                <div key={index} className=&rdquo;bg-card p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4&rdquo;>
                  <div className=&rdquo;w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0&rdquo;>
                    <CheckCircle2 className=&rdquo;w-5 h-5 text-primary&rdquo; />
                  </div>
                  <p className=&rdquo;text-foreground font-medium leading-snug&rdquo;>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {testimonial && (
          <section className=&rdquo;py-14 bg-primary/5 px-4&rdquo;>
            <div className=&rdquo;max-w-3xl mx-auto text-center&rdquo;>
              <div className=&rdquo;flex justify-center gap-1 mb-4&rdquo;>
                {[...Array(5)].map((_, i) => <Star key={i} className=&rdquo;w-5 h-5 fill-yellow-400 text-yellow-400&rdquo; />)}
              </div>
              <blockquote className=&rdquo;text-xl md:text-2xl font-medium text-foreground italic mb-4&rdquo;>
                &rdquo;{testimonial.quote}&rdquo;
              </blockquote>
              <cite className=&rdquo;text-muted-foreground not-italic text-sm&rdquo;>&mdash; {testimonial.author}</cite>
            </div>
          </section>
        )}

        <ReviewsSection />

        {/* CTA banner */}
        <section className=&rdquo;py-12 bg-primary text-primary-foreground&rdquo;>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <div className=&rdquo;flex flex-col md:flex-row items-center justify-between gap-6&rdquo;>
              <div className=&rdquo;flex items-center space-x-4&rdquo;>
                <div className=&rdquo;bg-white/20 p-3 rounded-full&rdquo;>
                  <CheckCircle2 className=&rdquo;w-8 h-8 text-white&rdquo; />
                </div>
                <div>
                  <h2 className=&rdquo;text-2xl font-bold&rdquo;>Accepting New Clients in {name}</h2>
                  <p className=&rdquo;text-primary-foreground/80 text-lg&rdquo;>Online quote, fast scheduling, no contracts.</p>
                </div>
              </div>
              <Button asChild variant=&rdquo;secondary&rdquo; size=&rdquo;lg&rdquo; className=&rdquo;bg-white text-primary hover:bg-gray-100 h-12 px-8 rounded-xl font-semibold shadow-sm&rdquo;>
                <Link to=&rdquo;/quote&rdquo;>Get My Free Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faqItems && faqItems.length > 0 && (
          <section className=&rdquo;pt-20 pb-12 bg-background&rdquo;>
            <div className=&rdquo;max-w-4xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
              <div className=&rdquo;text-center mb-12&rdquo;>
                <h2 className=&rdquo;text-3xl font-bold text-foreground mb-4 tracking-tight&rdquo;>
                  {name} Pet Waste Removal FAQs
                </h2>
              </div>
              <Accordion type=&rdquo;single&rdquo; collapsible className=&rdquo;w-full space-y-4&rdquo;>
                {faqItems.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={&rdquo;item-&rdquo; + index}
                    className=&rdquo;bg-card border border-border rounded-xl px-6 shadow-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-200&rdquo;
                  >
                    <AccordionTrigger className=&rdquo;text-left text-lg font-semibold text-foreground hover:text-primary py-6&rdquo;>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className=&rdquo;text-muted-foreground leading-relaxed pb-6 text-base&rdquo;>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        <div className=&rdquo;border-t border-border/50&rdquo;>
          <FAQSection location={name} />
        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default LocationTemplate;
