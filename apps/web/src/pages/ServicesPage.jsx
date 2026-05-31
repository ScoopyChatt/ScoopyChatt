
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PlayCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import ReviewsSection from '@/components/ReviewsSection.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';

const ServicesPage = () => {
  const services = [
    {
      title: 'Weekly Service',
      mostPopular: true,
      description: 'Keep your yard consistently clean with our most popular service option.',
      benefits: [
        'Scheduled weekly visits at your preferred time',
        'Complete yard cleanup and inspection',
        'Waste disposal included in service',
        'Flexible scheduling and easy rescheduling',
        'Perfect for multiple pets or large yards'
      ]
    },
    {
      title: '2X Weekly Service',
      description: 'Keep your yard fresh and clean with twice-weekly service visits for maximum cleanliness.',
      benefits: [
        'Twice-weekly visits',
        'Consistent cleanliness',
        'Odor control',
        'Flexible scheduling',
        'Ideal for multiple pets'
      ]
    },
    {
      title: 'Bi-Weekly Service',
      description: 'Great balance of cleanliness and value for smaller yards or single-pet households.',
      benefits: [
        'Service every two weeks',
        'Thorough yard inspection and cleanup',
        'Eco-friendly waste disposal',
        'Easy online booking and management',
        'Ideal for smaller outdoor spaces'
      ]
    },
    {
      title: 'One-Time Cleanup',
      description: 'Deep cleaning service perfect for special occasions, seasonal needs, or trying our service.',
      benefits: [
        'Comprehensive yard cleanup',
        'Same-day or next-day availability',
        'No long-term commitment required',
        'Perfect for parties or events',
        'Great way to try our service'
      ]
    }
  ];

  const canonicalUrl = getCanonicalUrl('/services');
  const pageTitle = "Pet Waste Removal Services in Chattanooga, TN | Scoopy Doo";
  const pageDesc = "Weekly, bi-weekly & one-time dog poop removal, yard cleanup, and pet waste services in Chattanooga. See what Scoopy Doo offers and book today.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pb-24 md:pb-0">
          <section className="pt-12 pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-balance" style={{ letterSpacing: '-0.02em' }}>
                  Services
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-[65ch] mx-auto">
                  Choose the service plan that fits your needs. All plans include professional cleanup, eco-friendly disposal, and our satisfaction guarantee.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col h-full bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
                  >
                    <div className="p-1">
                      <ServiceCard {...service} />
                    </div>
                    
                    <div className="px-6 pb-6 mt-auto">
                      <div className="bg-muted/50 rounded-xl p-4 mb-4 border border-border/50 text-sm">
                        <Link to="/podcast" className="flex items-center text-foreground hover:text-primary transition-colors group">
                          <PlayCircle className="w-5 h-5 text-primary mr-2 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Hear from our founder about this service</span>
                          <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      </div>
                      <Button asChild className="w-full bg-[#FF9E30] text-white hover:bg-[#FF9E30]/90 h-12 rounded-xl text-base font-semibold">
                        <Link to="/quote">Book Now</Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <ReviewsSection />

          <section className="py-20 bg-accent text-accent-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">See What Our Customers Say</h2>
                <p className="text-lg text-accent-foreground/90 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Check out our Google Business Profile to read reviews and see why Chattanooga families trust us
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 transition-all duration-200 active:scale-[0.98] h-14 px-8 rounded-xl">
                    <a href="https://share.google/juT9kR9tE6VIxxUCj" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Google Business Profile
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10 transition-all duration-200 active:scale-[0.98] h-14 px-8 rounded-xl">
                    <Link to="/quote">Get a Free Quote</Link>
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

export default ServicesPage;
