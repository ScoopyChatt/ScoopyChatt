
import React from &rsquo;react&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { PlayCircle, Headphones, Podcast, Facebook, Twitter, Linkedin, Mail, CheckCircle2, ArrowRight } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import FloatingCTA from &rsquo;@/components/FloatingCTA.jsx&rsquo;;
import PodcastTranscript from &rsquo;@/components/PodcastTranscript.jsx&rsquo;;
import ReviewsSection from &rsquo;@/components/ReviewsSection.jsx&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;

const PodcastPage = () => {
  const schemaData = {
    &rdquo;@type&rdquo;: &rdquo;VideoObject&rdquo;,
    &rdquo;name&rdquo;: &rdquo;Scoopy Doo LLC Founder on Recent Podcast&rdquo;,
    &rdquo;description&rdquo;: &rdquo;Listen to the Scoopy Doo LLC founder discuss pet waste management, yard cleanup, and business insights on this recent podcast episode.&rdquo;,
    &rdquo;thumbnailUrl&rdquo;: &rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg&rdquo;,
    &rdquo;uploadDate&rdquo;: &rdquo;2026-05-15&rdquo;,
    &rdquo;duration&rdquo;: &rdquo;PT25M0S&rdquo;,
    &rdquo;embedUrl&rdquo;: &rdquo;https://www.youtube.com/embed/BlLL2Yzc5YI&rdquo;
  };

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <SEOHead 
        path=&rdquo;/podcast&rdquo;
        schema={schemaData} 
      />

      <Header />

      <main className=&rdquo;flex-1 pb-24 md:pb-0&rdquo;>
        <section className=&rdquo;pt-24 pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5&rdquo;>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <div className=&rdquo;grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center&rdquo;>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <div className=&rdquo;inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase border border-primary/20&rdquo;>
                  <PlayCircle className=&rdquo;w-4 h-4 mr-2&rdquo; /> Featured Episode
                </div>
                <h1 className=&rdquo;text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance text-foreground&rdquo;>
                  Scoopy Doo LLC Founder on Recent Podcast
                </h1>
                <p className=&rdquo;text-xl text-muted-foreground leading-relaxed mb-8 max-w-[55ch]&rdquo;>
                  Join founder Brandon Carter as he shares the origin story of Scoopy Doo, the hidden dangers of pet waste, and why professional yard cleanup is changing weekends for families in Chattanooga.
                </p>
                <div className=&rdquo;flex flex-wrap items-center gap-4 mb-8&rdquo;>
                  <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-[#FF9E30] text-white hover:bg-[#FF9E30]/90 transition-all active:scale-[0.98]&rdquo;>
                    <a href=&rdquo;#video-player&rdquo;>Watch Episode</a>
                  </Button>
                  <div className=&rdquo;flex items-center gap-3 ml-2 border-l border-border pl-6&rdquo;>
                    <a href=&rdquo;#&rdquo; className=&rdquo;text-muted-foreground hover:text-primary transition-colors&rdquo; aria-label=&rdquo;Spotify&rdquo;><Podcast className=&rdquo;w-6 h-6&rdquo; /></a>
                    <a href=&rdquo;#&rdquo; className=&rdquo;text-muted-foreground hover:text-primary transition-colors&rdquo; aria-label=&rdquo;Apple Podcasts&rdquo;><Headphones className=&rdquo;w-6 h-6&rdquo; /></a>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} id=&rdquo;video-player&rdquo; className=&rdquo;space-y-6&rdquo;>
                <div className=&rdquo;relative&rdquo;>
                  <img 
                    src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg&rdquo;
                    alt=&rdquo;Scoopy Doo LLC founder Brandon Carter and daughter Leighton holding branded signs in front of Chattanooga scenic city mural with bridge, riverboat, and train&rdquo;
                    className=&rdquo;w-full rounded-2xl shadow-xl border border-border object-cover&rdquo;
                  />
                </div>
                <div className=&rdquo;video-container&rdquo;>
                  <iframe 
                    width=&rdquo;100%&rdquo; 
                    height=&rdquo;100%&rdquo; 
                    src=&rdquo;https://www.youtube.com/embed/BlLL2Yzc5YI&rdquo; 
                    title=&rdquo;Scoopy Doo LLC Founder Interview&rdquo; 
                    frameBorder=&rdquo;0&rdquo; 
                    allow=&rdquo;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture&rdquo; 
                    allowFullScreen
                    className=&rdquo;absolute inset-0 w-full h-full object-cover&rdquo;
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ReviewsSection />

        <section className=&rdquo;py-20&rdquo;>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <div className=&rdquo;grid grid-cols-1 lg:grid-cols-3 gap-12&rdquo;>
              <div className=&rdquo;lg:col-span-2 space-y-12&rdquo;>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                  <h2 className=&rdquo;text-3xl font-bold mb-6 text-foreground&rdquo;>Episode Overview</h2>
                  <div className=&rdquo;prose prose-lg max-w-none text-muted-foreground&rdquo;>
                    <p>
                      In this in-depth conversation, we dive into what it really takes to run a successful pet waste removal business. Brandon shares how a simple realization about weekend chores turned into Chattanooga&rsquo;s top-rated cleanup service.
                    </p>
                    <h3 className=&rdquo;text-xl font-semibold text-foreground mt-8 mb-4&rdquo;>Key Takeaways</h3>
                    <ul className=&rdquo;space-y-3 list-none p-0&rdquo;>
                      {[
                        &rdquo;Why dog waste is toxic to your lawn and not a natural fertilizer.&rdquo;,
                        &rdquo;The exact health risks (bacteria and parasites) lingering in an uncleaned yard.&rdquo;,
                        &rdquo;How the father-daughter duo built a business focused on family time.&rdquo;,
                        &rdquo;The meticulous sanitization process that prevents cross-contamination.&rdquo;
                      ].map((item, i) => (
                        <li key={i} className=&rdquo;flex items-start&rdquo;>
                          <CheckCircle2 className=&rdquo;w-6 h-6 text-primary mr-3 shrink-0&rdquo; />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <PodcastTranscript />
                </motion.div>
              </div>

              <div className=&rdquo;space-y-8&rdquo;>
                <div className=&rdquo;bg-muted/50 p-6 rounded-2xl border border-border&rdquo;>
                  <h3 className=&rdquo;font-bold text-lg mb-4 text-foreground&rdquo;>Share this episode</h3>
                  <div className=&rdquo;flex gap-3&rdquo;>
                    <button className=&rdquo;social-share-btn&rdquo; aria-label=&rdquo;Share on Facebook&rdquo;><Facebook className=&rdquo;w-5 h-5&rdquo; /></button>
                    <button className=&rdquo;social-share-btn&rdquo; aria-label=&rdquo;Share on Twitter&rdquo;><Twitter className=&rdquo;w-5 h-5&rdquo; /></button>
                    <button className=&rdquo;social-share-btn&rdquo; aria-label=&rdquo;Share on LinkedIn&rdquo;><Linkedin className=&rdquo;w-5 h-5&rdquo; /></button>
                    <button className=&rdquo;social-share-btn&rdquo; aria-label=&rdquo;Share via Email&rdquo;><Mail className=&rdquo;w-5 h-5&rdquo; /></button>
                  </div>
                </div>

                <div className=&rdquo;bg-primary/5 p-8 rounded-2xl border border-primary/20 text-center&rdquo;>
                  <h3 className=&rdquo;font-bold text-2xl mb-4 text-foreground&rdquo;>Reclaim Your Weekend</h3>
                  <p className=&rdquo;text-muted-foreground mb-6&rdquo;>Inspired by the podcast? Let us handle the dirty work so you can enjoy your yard again.</p>
                  <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;w-full bg-[#FF9E30] text-white hover:bg-[#FF9E30]/90&rdquo;>
                    <Link to=&rdquo;/quote&rdquo;>Get a Free Quote <ArrowRight className=&rdquo;w-4 h-4 ml-2&rdquo; /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default PodcastPage;
