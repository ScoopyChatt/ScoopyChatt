import React from &rsquo;react&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { Calendar, ArrowRight, PlayCircle, Podcast } from &rsquo;lucide-react&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import FloatingCTA from &rsquo;@/components/FloatingCTA.jsx&rsquo;;
import ReviewsSection from &rsquo;@/components/ReviewsSection.jsx&rsquo;;

const BlogPage = () => {
  const posts = [
    {
      title: &rdquo;Pet Waste Management: A Guide for Busy Pet Owners&rdquo;,
      excerpt: &rdquo;A comprehensive guide for busy pet owners on managing yard waste, the benefits of professional cleanup, and how to reclaim your weekends.&rdquo;,
      date: &rdquo;May 9, 2026&rdquo;,
      slug: &rdquo;/blog/pet-waste-management-guide&rdquo;
    },
    {
      title: &rdquo;The Hidden Health Risks of Pet Waste in Your Yard&rdquo;,
      excerpt: &rdquo;Discover the hidden health risks of pet waste, including parasites and bacteria, and learn how professional pet waste removal keeps your yard safe.&rdquo;,
      date: &rdquo;May 9, 2026&rdquo;,
      slug: &rdquo;/blog/health-risks-pet-waste&rdquo;
    },
    {
      title: &rdquo;Why Regular Pet Waste Removal is Essential for Your Lawn&rsquo;s Health&rdquo;,
      excerpt: &rdquo;Learn how pet waste causes nitrogen burn and damages your grass, and discover why professional pet waste removal is essential for maintaining a healthy lawn.&rdquo;,
      date: &rdquo;May 9, 2026&rdquo;,
      slug: &rdquo;/blog/lawn-health-pet-waste&rdquo;
    },
    {
      title: &rsquo;DIY vs. Professional Pet Waste Removal: Which is Right for You?&rsquo;,
      excerpt: &rsquo;Compare the hidden costs, time investments, and health risks of cleaning your own yard versus hiring a professional service.&rsquo;,
      date: &rsquo;April 28, 2026&rsquo;,
      slug: &rsquo;/blog/diy-vs-professional&rsquo;
    },
    {
      title: &rsquo;Real Results: Scoopy Chatt Customer Success Stories&rsquo;,
      excerpt: &rsquo;Read how professional pet waste removal solved real problems for families, busy professionals, and pet owners across the Chattanooga area.&rsquo;,
      date: &rsquo;April 24, 2026&rsquo;,
      slug: &rsquo;/blog/customer-success-stories&rsquo;
    },
    {
      title: &rsquo;The Critical Health Benefits of Regular Yard Cleanup&rsquo;,
      excerpt: &rsquo;Discover why regular pet waste removal is crucial for protecting your family from bacteria and keeping your dogs healthy.&rsquo;,
      date: &rsquo;April 21, 2026&rsquo;,
      slug: &rsquo;/blog/health-benefits-yard-cleanup&rsquo;
    },
    {
      title: &rsquo;Seasonal Pet Care Guide for Chattanooga Residents&rsquo;,
      excerpt: &rsquo;From summer heat to winter freezes, learn how to protect your pet and maintain a clean, safe yard year-round.&rsquo;,
      date: &rsquo;April 18, 2026&rsquo;,
      slug: &rsquo;/blog/seasonal-pet-care-tips&rsquo;
    },
    {
      title: &rsquo;The True Value of Professional Pet Waste Removal&rsquo;,
      excerpt: &rsquo;Discover why hiring a professional pet waste removal service is about more than just convenience. Learn about the health risks and cost benefits.&rsquo;,
      date: &rsquo;April 15, 2026&rsquo;,
      slug: &rsquo;/blog/professional-waste-removal-benefits&rsquo;
    },
    {
      title: &rsquo;How Often Should You Clean Your Yard? Pet Waste Removal Guide&rsquo;,
      excerpt: &rsquo;Learn how often you should schedule pet waste removal and yard cleaning to keep your outdoor space safe and sanitary.&rsquo;,
      date: &rsquo;April 10, 2026&rsquo;,
      slug: &rsquo;/blog/how-often-clean-yard&rsquo;
    },
    {
      title: &rsquo;Benefits of Professional Pet Waste Removal&rsquo;,
      excerpt: &rsquo;Discover the top health benefits and time-saving advantages of hiring a professional pet waste removal service.&rsquo;,
      date: &rsquo;April 5, 2026&rsquo;,
      slug: &rsquo;/blog/benefits&rsquo;
    },
    {
      title: &rsquo;Pet Waste Removal in Signal Mountain&rsquo;,
      excerpt: &rsquo;Learn why Scoopy Chatt is the preferred pet waste removal service for residents of Signal Mountain, TN.&rsquo;,
      date: &rsquo;March 28, 2026&rsquo;,
      slug: &rsquo;/blog/signal-mountain&rsquo;
    },
    {
      title: &rsquo;Pet Waste Removal in Soddy Daisy&rsquo;,
      excerpt: &rsquo;Discover reliable and affordable pet waste removal services in Soddy Daisy, TN with Scoopy Chatt.&rsquo;,
      date: &rsquo;March 20, 2026&rsquo;,
      slug: &rsquo;/blog/soddy-daisy&rsquo;
    }
  ];

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <Helmet>
        <title>Blog & Resources | Chattanooga Pet Waste Removal</title>
        <meta name=&rsquo;description&rsquo; content=&rsquo;Read tips, news, and insights about yard cleanup and pet waste management in Chattanooga.&rsquo; />
      </Helmet>

      <Header />

      <main className=&rdquo;flex-1 pb-24 md:pb-0&rdquo;>
        <section className=&rdquo;pt-20 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5&rdquo;>
          <div className=&rdquo;max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className=&rdquo;text-4xl md:text-5xl font-bold mb-6 text-balance tracking-tight&rdquo;>
                Scoopy Chatt Blog
              </h1>
              <p className=&rdquo;text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto&rdquo;>
                Tips, guides, and news about keeping your yard clean, safe, and pet-friendly.
              </p>
            </motion.div>
          </div>
        </section>

        <ReviewsSection />

        <section className=&rdquo;py-12 border-b border-border bg-muted/20&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className=&rdquo;podcast-card&rdquo;
            >
              <div className=&rdquo;grid grid-cols-1 md:grid-cols-2&rdquo;>
                <div className=&rdquo;relative aspect-video bg-muted&rdquo;>
                  <img 
                    src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg&rdquo; 
                    alt=&rdquo;Scoopy Doo Founder Brandon Carter and daughter Leighton holding branded signs in front of Chattanooga scenic city mural&rdquo;
                    className=&rdquo;absolute inset-0 w-full h-full object-cover&rdquo;
                  />
                  <div className=&rdquo;absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold tracking-wide uppercase border border-white/20&rdquo;>
                    <Podcast className=&rdquo;w-3 h-3 mr-2&rdquo; /> Featured Podcast
                  </div>
                  <div className=&rdquo;absolute inset-0 bg-black/10 flex items-center justify-center group pointer-events-none&rdquo;>
                    <div className=&rdquo;w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform&rdquo;>
                      <PlayCircle className=&rdquo;w-8 h-8&rdquo; />
                    </div>
                  </div>
                </div>
                <div className=&rdquo;p-8 md:p-10 flex flex-col justify-center&rdquo;>
                  <div className=&rdquo;flex items-center text-sm text-muted-foreground mb-4&rdquo;>
                    <Calendar className=&rdquo;h-4 w-4 mr-2&rdquo; />
                    May 15, 2026
                  </div>
                  <h2 className=&rdquo;text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight&rdquo;>
                    <Link to=&rdquo;/blog/podcast-episode&rdquo; className=&rdquo;hover:text-primary transition-colors&rdquo;>
                      Scoopy Doo LLC Founder Discusses Pet Waste Management on Recent Podcast
                    </Link>
                  </h2>
                  <p className=&rdquo;text-muted-foreground mb-8 line-clamp-3&rdquo;>
                    Listen to founder Brandon Carter share insights on the hidden dangers of pet waste, maintaining a healthy yard, and how a family business is reclaiming weekends for Chattanooga residents.
                  </p>
                  <Link to=&rdquo;/blog/podcast-episode&rdquo; className=&rdquo;inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors mt-auto&rdquo;>
                    Listen to Episode <ArrowRight className=&rdquo;h-4 w-4 ml-2&rdquo; />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className=&rdquo;py-16&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-8&rdquo;>
              {posts.map((post, index) => (
                <motion.article 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className=&rdquo;bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full&rdquo;
                >
                  <div className=&rdquo;flex items-center text-sm text-muted-foreground mb-4&rdquo;>
                    <Calendar className=&rdquo;h-4 w-4 mr-2&rdquo; />
                    {post.date}
                  </div>
                  <h2 className=&rdquo;text-xl font-bold text-foreground mb-4 line-clamp-2&rdquo;>
                    <Link to={post.slug} className=&rdquo;hover:text-primary transition-colors&rdquo;>
                      {post.title}
                    </Link>
                  </h2>
                  <p className=&rdquo;text-muted-foreground mb-8 line-clamp-3 flex-grow&rdquo;>
                    {post.excerpt}
                  </p>
                  <Link to={post.slug} className=&rdquo;inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors mt-auto&rdquo;>
                    Read More <ArrowRight className=&rdquo;h-4 w-4 ml-2&rdquo; />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default BlogPage;