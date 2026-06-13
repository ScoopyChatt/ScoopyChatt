import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { ArrowRight, BookOpen } from &rsquo;lucide-react&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;
import { CANONICAL_BASE_URL } from &rsquo;@/config/seoConfig.js&rsquo;;

const allPosts = [
  { slug: &rsquo;/blog/how-often-scoop-dog-poop-chattanooga&rsquo;, title: &rsquo;How Often Should You Scoop Dog Poop in Chattanooga?&rsquo;, desc: &rsquo;Most vets and yard experts say at least once a week. Here\&rsquo;s why &mdash; and how Scoopy Doo makes it effortless.&rsquo;, date: &rsquo;Jun 2026&rsquo;, cat: &rsquo;Yard Tips&rsquo; },
  { slug: &rsquo;/blog/is-dog-poop-hurting-your-chattanooga-yard&rsquo;, title: &rsquo;Is Dog Poop Hurting Your Chattanooga Yard?&rsquo;, desc: &rsquo;Dog poop doesn\&rsquo;t just smell bad &mdash; it kills grass, spreads parasites, and pollutes local water.&rsquo;, date: &rsquo;Jun 2026&rsquo;, cat: &rsquo;Lawn Health&rsquo; },
  { slug: &rsquo;/blog/chattanooga-pet-waste-removal-homeowners&rsquo;, title: &rsquo;Why Chattanooga Homeowners Are Hiring Pet Waste Removal Services&rsquo;, desc: &rsquo;Discover why more Chattanooga families are turning to professional pet waste removal to protect their yards.&rsquo;, date: &rsquo;May 2026&rsquo;, cat: &rsquo;Homeowner Tips&rsquo; },
  { slug: &rsquo;/blog/commercial-pet-waste-removal-chattanooga&rsquo;, title: &rsquo;Pet Waste Removal for HOAs, Apartments & Commercial Properties&rsquo;, desc: &rsquo;Professional pet waste management solutions for multi-unit properties and commercial spaces in Chattanooga.&rsquo;, date: &rsquo;May 2026&rsquo;, cat: &rsquo;Commercial&rsquo; },
  { slug: &rsquo;/blog/is-dog-waste-bad-for-lawn&rsquo;, title: &rsquo;Is Dog Waste Bad for Your Lawn?&rsquo;, desc: &rsquo;The truth about dog waste and lawn health &mdash; and what you can do to protect your grass.&rsquo;, date: &rsquo;May 2026&rsquo;, cat: &rsquo;Lawn Health&rsquo; },
  { slug: &rsquo;/blog/best-pooper-scooper-services-chattanooga&rsquo;, title: &rsquo;Best Pooper Scooper Services in Chattanooga&rsquo;, desc: &rsquo;A guide to finding the right dog waste removal service for your Chattanooga home.&rsquo;, date: &rsquo;Apr 2026&rsquo;, cat: &rsquo;Local Guide&rsquo; },
  { slug: &rsquo;/blog/professional-waste-removal-benefits&rsquo;, title: &rsquo;The True Value of Professional Pet Waste Removal&rsquo;, desc: &rsquo;Why hiring a professional pooper scooper service is worth every penny for your yard, family, and peace of mind.&rsquo;, date: &rsquo;Apr 2026&rsquo;, cat: &rsquo;Services&rsquo; },
  { slug: &rsquo;/blog/health-risks-of-pet-waste&rsquo;, title: &rsquo;The Hidden Health Risks of Pet Waste in Your Yard&rsquo;, desc: &rsquo;Dog waste harbors dangerous pathogens &mdash; here\&rsquo;s what you need to know to keep your family safe.&rsquo;, date: &rsquo;Mar 2026&rsquo;, cat: &rsquo;Health&rsquo; },
  { slug: &rsquo;/blog/lawn-health-and-pet-waste&rsquo;, title: &rsquo;Why Regular Pet Waste Removal is Essential for Your Lawn&rsquo;, desc: &rsquo;How dog waste damages your grass over time &mdash; and how consistent cleanup prevents permanent lawn damage.&rsquo;, date: &rsquo;Mar 2026&rsquo;, cat: &rsquo;Lawn Health&rsquo; },
  { slug: &rsquo;/blog/health-benefits-yard-cleanup&rsquo;, title: &rsquo;The Critical Health Benefits of Regular Yard Cleanup&rsquo;, desc: &rsquo;Bacteria from pet waste can persist in soil for years. Learn how regular scooping protects your whole family.&rsquo;, date: &rsquo;Feb 2026&rsquo;, cat: &rsquo;Health&rsquo; },
  { slug: &rsquo;/blog/diy-vs-professional&rsquo;, title: &rsquo;DIY vs. Professional Pet Waste Removal: Which is Right for You?&rsquo;, desc: &rsquo;Comparing the cost, convenience, and results of doing it yourself versus hiring Scoopy Doo.&rsquo;, date: &rsquo;Feb 2026&rsquo;, cat: &rsquo;Services&rsquo; },
  { slug: &rsquo;/blog/seasonal-pet-care-tips&rsquo;, title: &rsquo;Seasonal Pet Care Guide for Chattanooga Residents&rsquo;, desc: &rsquo;How to keep your yard clean and your pets healthy through every season in the Tennessee Valley.&rsquo;, date: &rsquo;Jan 2026&rsquo;, cat: &rsquo;Tips&rsquo; },
  { slug: &rsquo;/blog/pet-waste-management-guide&rsquo;, title: &rsquo;Pet Waste Management: A Guide for Busy Pet Owners&rsquo;, desc: &rsquo;A practical guide to managing pet waste &mdash; from daily habits to professional services.&rsquo;, date: &rsquo;Jan 2026&rsquo;, cat: &rsquo;Tips&rsquo; },
  { slug: &rsquo;/blog/spring-pet-care-checklist&rsquo;, title: &rsquo;Spring Pet Care Checklist for Chattanooga Dog Owners&rsquo;, desc: &rsquo;Get your yard spring-ready with this complete checklist for Chattanooga pet owners.&rsquo;, date: &rsquo;Dec 2025&rsquo;, cat: &rsquo;Tips&rsquo; },
  { slug: &rsquo;/blog/how-often-clean-yard&rsquo;, title: &rsquo;How Often Should You Clean Your Yard of Pet Waste?&rsquo;, desc: &rsquo;Expert guidance on cleanup frequency based on dog count, yard size, and Chattanooga\&rsquo;s climate.&rsquo;, date: &rsquo;Nov 2025&rsquo;, cat: &rsquo;Yard Tips&rsquo; },
  { slug: &rsquo;/blog/signal-mountain&rsquo;, title: &rsquo;Pet Waste Removal in Signal Mountain, TN&rsquo;, desc: &rsquo;Scoopy Doo now serves Signal Mountain residents with reliable weekly and bi-weekly dog waste removal.&rsquo;, date: &rsquo;Nov 2025&rsquo;, cat: &rsquo;Service Areas&rsquo; },
  { slug: &rsquo;/blog/soddy-daisy&rsquo;, title: &rsquo;Pet Waste Removal in Soddy-Daisy, TN&rsquo;, desc: &rsquo;Professional dog poop removal service available throughout Soddy-Daisy and surrounding communities.&rsquo;, date: &rsquo;Oct 2025&rsquo;, cat: &rsquo;Service Areas&rsquo; },
];

const BlogListPage = () => (
  <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
    <SEOHead title=&rdquo;Pet Waste & Dog Care Blog | Scoopy Doo Chattanooga&rdquo; description=&rdquo;Tips on pet waste removal, yard health, and dog care for Chattanooga homeowners from the Scoopy Doo blog.&rdquo; canonicalUrl={`${CANONICAL_BASE_URL}/blog`} />
    <Header />
    <main className=&rdquo;flex-grow py-20&rdquo;>
      <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
        <div className=&rdquo;text-center mb-16 max-w-3xl mx-auto&rdquo;>
          <div className=&rdquo;inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6&rdquo;><BookOpen className=&rdquo;w-7 h-7&rdquo; /></div>
          <h1 className=&rdquo;text-4xl md:text-5xl font-extrabold text-foreground mb-4&rdquo;>
                Chattanooga Pet Care Tips and Dog Owner Resources | Scoopy Doo Blog
              </h1>
          <p className=&rdquo;text-lg text-muted-foreground&rdquo;>Tips on pet waste removal, yard health, and dog care for Chattanooga homeowners.</p>
        </div>
        <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8&rdquo;>
          {allPosts.map((post) => (
            <Link key={post.slug} to={post.slug} className=&rdquo;group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1&rdquo;>
              <div className=&rdquo;p-6 flex flex-col flex-grow&rdquo;>
                <span className=&rdquo;inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit&rdquo;>{post.cat}</span>
                <h2 className=&rdquo;text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug&rdquo;>{post.title}</h2>
                <p className=&rdquo;text-muted-foreground text-sm flex-grow leading-relaxed&rdquo;>{post.desc}</p>
                <div className=&rdquo;flex items-center justify-between mt-6 pt-4 border-t border-border&rdquo;>
                  <span className=&rdquo;text-xs text-muted-foreground&rdquo;>{post.date}</span>
                  <span className=&rdquo;inline-flex items-center text-primary text-sm font-semibold gap-1 group-hover:gap-2 transition-all&rdquo;>Read <ArrowRight className=&rdquo;w-4 h-4&rdquo; /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default BlogListPage;
