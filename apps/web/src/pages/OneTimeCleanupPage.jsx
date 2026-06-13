
import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { CheckCircle2, Calendar, Sparkles } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import FloatingCTA from &rsquo;@/components/FloatingCTA.jsx&rsquo;;
import ReviewsSection from &rsquo;@/components/ReviewsSection.jsx&rsquo;;
import { getCanonicalUrl } from &rsquo;@/utils/seoHelpers.js&rsquo;;

const OneTimeCleanupPage = () => {
  const canonicalUrl = getCanonicalUrl(&rsquo;/one-time-cleanup&rsquo;);
  const pageTitle = &rdquo;One-Time Dog Poop Cleanup in Chattanooga, TN | Scoopy Doo&rdquo;;
  const pageDesc = &rdquo;Overgrown yard? Get a one-time dog poop cleanup in Chattanooga, TN. Perfect for spring cleaning, move-outs, or first-time service. Book online.&rdquo;;

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name=&rdquo;description&rdquo; content={pageDesc} />
        <link rel=&rdquo;canonical&rdquo; href={canonicalUrl} />
        <meta property=&rdquo;og:title&rdquo; content={pageTitle} />
        <meta property=&rdquo;og:description&rdquo; content={pageDesc} />
        <meta property=&rdquo;og:url&rdquo; content={canonicalUrl} />
        <meta name=&rdquo;twitter:card&rdquo; content=&rdquo;summary&rdquo; />
      </Helmet>

      <Header />

      <main className=&rdquo;flex-1 pb-24 md:pb-0&rdquo;>
        <section className=&rdquo;pt-24 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5 relative overflow-hidden&rdquo;>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10&rdquo;>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className=&rdquo;text-center max-w-3xl mx-auto&rdquo;
            >
              <h1 className=&rdquo;text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance text-foreground&rdquo; style={{ letterSpacing: &rsquo;-0.02em&rsquo; }}>
                One-Time Dog Waste Cleanup in Chattanooga, TN &mdash; No Contract Required
              </h1>
              <p className=&rdquo;text-xl text-muted-foreground leading-relaxed max-w-[55ch] mx-auto font-medium mb-8&rdquo;>
                Perfect for special events, spring cleaning, or just getting your yard back to a manageable state.
              </p>
              <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg&rdquo;>
                <Link to=&rdquo;/quote&rdquo;>Get a Free Quote</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className=&rdquo;py-20&rdquo;>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-3 gap-8&rdquo;>
              <div className=&rdquo;bg-card p-8 rounded-2xl shadow-sm border border-border text-center&rdquo;>
                <Calendar className=&rdquo;w-12 h-12 text-primary mx-auto mb-6&rdquo; />
                <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>Special Events</h3>
                <p className=&rdquo;text-muted-foreground&rdquo;>Hosting a party or family gathering? We&rsquo;ll make sure your yard is spotless and odor-free before guests arrive.</p>
              </div>
              <div className=&rdquo;bg-card p-8 rounded-2xl shadow-sm border border-border text-center&rdquo;>
                <Sparkles className=&rdquo;w-12 h-12 text-primary mx-auto mb-6&rdquo; />
                <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>Spring Cleaning</h3>
                <p className=&rdquo;text-muted-foreground&rdquo;>Clear away months of accumulated winter waste and get your lawn ready for the warmer months.</p>
              </div>
              <div className=&rdquo;bg-card p-8 rounded-2xl shadow-sm border border-border text-center&rdquo;>
                <CheckCircle2 className=&rdquo;w-12 h-12 text-primary mx-auto mb-6&rdquo; />
                <h3 className=&rdquo;text-xl font-bold mb-3&rdquo;>No Commitment</h3>
                <p className=&rdquo;text-muted-foreground&rdquo;>Try our service with absolutely no long-term commitment. Just a thorough, professional cleanup when you need it.</p>
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default OneTimeCleanupPage;
