
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Heart, Shield, Star, Phone, MapPin, Users, Sparkles, Podcast, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import ReviewsSection from '@/components/ReviewsSection.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';

const AboutPage = () => {
  const canonicalUrl = getCanonicalUrl('/about');
  const pageTitle = "About Scoopy Doo | Chattanooga Pet Waste Removal";
  const pageDesc = "Meet Scoopy Doo LLC, Chattanooga's locally owned pet waste removal company. Learn our story, values, and commitment to clean, safe yards.";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <Header />

      <main className="flex-1 pb-24 md:pb-0">
        <section className="pt-24 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance text-foreground" style={{ letterSpacing: '-0.02em' }}>
                About Scoopy Doo
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-[55ch] mx-auto font-medium">
                A local, family-owned business dedicated to keeping Chattanooga's yards clean, safe, and ready for family time.
              </p>
            </motion.div>
          </div>
        </section>

        <ReviewsSection />

        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance text-foreground">
                  Our Founding Story
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Scoopy Doo was born out of a simple realization: families love their dogs, but nobody loves the mess they leave behind. Founded by the father-daughter team of Brandon and Leighton Carter, our company started with a shared vision to solve a messy problem for our neighbors in the Greater Chattanooga area.
                  </p>
                  <p>
                    As lifelong pet owners, Brandon and Leighton understood the struggle of balancing busy work schedules, family life, and yard maintenance. They saw an opportunity to build a service that didn't just clean yards, but actually gave families their weekends back.
                  </p>
                  <p>
                    What started as a small local route has grown through hard work, dedication, and word-of-mouth from thrilled customers who finally have a clean, odor-free outdoor space to enjoy.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square md:aspect-[4/3] bg-muted rounded-3xl overflow-hidden relative shadow-xl">
                  <img 
                    src="https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/e9b38f4dbba3e29cdaace3b9a77c339a.jpg" 
                    alt="Brandon Carter in red Scoopy Doo shirt and his daughter Leighton Carter holding yellow Scoopy Doo business cards with QR codes" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-2xl shadow-lg border border-border max-w-xs hidden md:block">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-bold text-foreground">Family First</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Founded by Brandon & Leighton Carter</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="relative order-2 md:order-1">
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border bg-muted group">
                  <img 
                    src="https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg"
                    alt="Scoopy Doo LLC founder Brandon Carter and daughter Leighton"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <Link 
                      to="/podcast" 
                      className="w-16 h-16 md:w-20 md:h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group-hover:bg-primary/90"
                      aria-label="Play podcast episode"
                    >
                      <PlayCircle className="w-8 h-8 md:w-10 md:h-10" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 text-center md:text-left">
                <div className="inline-flex items-center justify-center md:justify-start px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
                  <Podcast className="w-4 h-4 mr-2" /> Featured Media
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
                  Hear Directly From Our Founder
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-prose">
                  Want to know more about why we started Scoopy Doo and the hidden benefits of professional pet waste management? Brandon recently sat down for an exclusive podcast interview to discuss our journey, mission, and the health risks families face with uncleaned yards.
                </p>
                <Button asChild size="lg" className="bg-[#FF9E30] text-white hover:bg-[#FF9E30]/90 rounded-xl h-14 px-8 text-lg font-semibold transition-all active:scale-[0.98]">
                  <Link to="/podcast" className="flex items-center justify-center md:justify-start">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Listen to the Recent Podcast Episode
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What Drives Us</h2>
              <p className="text-lg text-muted-foreground">
                As a local family business, our values are rooted in our community and our love for pets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col h-full">
                <Users className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Father-Daughter Operated</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  We aren't a faceless national franchise. When you hire Scoopy Doo, you're supporting a local father-daughter team who genuinely cares about the quality of work provided to our neighbors. We treat your yard with the same respect we treat our own.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col h-full">
                <MapPin className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Local Chattanooga Focus</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  We live here, we work here, and we play here. Our deep roots in the Chattanooga area mean we understand the local climate, the seasonal challenges of yard maintenance, and the standard of hospitality our community expects.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col h-full">
                <Shield className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Trust & Reliability</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  We know that inviting a service provider onto your property requires trust. We show up when we say we will, we secure your gates before we leave, and we communicate transparently every step of the way.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col h-full">
                <Sparkles className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Uncompromising Quality</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  We don't just do a quick sweep. Our meticulous grid-walking technique ensures no pile is left behind. We sanitize our tools between every yard to protect your pets from cross-contamination.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Star className="w-12 h-12 mx-auto mb-8 text-primary-foreground/80" />
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-balance">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed font-medium text-primary-foreground/90">
              "To provide families with clean, safe, and sanitary outdoor spaces where children can play freely, pets can roam safely, and homeowners can reclaim their valuable time."
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wide uppercase">
                Chattanooga's Largest Pet Waste Removal Company
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground text-balance leading-tight">
                Call the #1 pet waste removal company in the Chattanooga area for your #2 problem!
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to take back your backyard? Brandon, Leighton, and the rest of our team are standing by to help.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <a href="tel:423-600-5040">
                    <Phone className="mr-2 h-5 w-5" />
                    423-600-5040
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl border-2" asChild>
                  <a href="https://scoopychatt.com" target="_blank" rel="noopener noreferrer">
                    scoopychatt.com
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default AboutPage;
