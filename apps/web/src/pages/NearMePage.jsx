
import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import CTAButton from &rsquo;@/components/CTAButton.jsx&rsquo;;
import TestimonialCard from &rsquo;@/components/TestimonialCard.jsx&rsquo;;
import LocationSection from &rsquo;@/components/LocationSection.jsx&rsquo;;

const NearMePage = () => {
  const localReviews = [
    { author: &rdquo;Michael T.&rdquo;, location: &rdquo;Signal Mountain&rdquo;, quote: &rdquo;Fast, local, and incredibly dependable. The best scooping service near me.&rdquo; },
    { author: &rdquo;Jessica R.&rdquo;, location: &rdquo;Hixson&rdquo;, quote: &rdquo;Love supporting a local business that does exactly what they promise.&rdquo; },
    { author: &rdquo;David P.&rdquo;, location: &rdquo;East Brainerd&rdquo;, quote: &rdquo;They always lock the gate and leave the yard spotless. Highly recommended in the area.&rdquo; }
  ];

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <SEOHead path=&rdquo;/near-me&rdquo; />
      
      <Header />

      <main className=&rdquo;flex-grow&rdquo;>
        <section className=&rdquo;pt-24 pb-16 bg-card border-b border-border&rdquo;>
          <div className=&rdquo;container-shell text-center max-w-4xl mx-auto&rdquo;>
            <h1 className=&rdquo;mb-6 text-foreground&rdquo;>Pooper Scooper Service Near Me in Chattanooga, TN</h1>
            <p className=&rdquo;text-xl text-muted-foreground mb-8&rdquo;>
              We&rsquo;re your local, neighborhood pet waste removal experts. Proudly serving Chattanooga and surrounding areas so you never have to search for a scooper again.
            </p>
            <CTAButton>Check My Zip Code</CTAButton>
          </div>
        </section>

        <LocationSection />

        <section className=&rdquo;section-spacing bg-background&rdquo;>
          <div className=&rdquo;container-shell&rdquo;>
            <h2 className=&rdquo;text-center mb-12&rdquo;>Trusted by Neighbors Near You</h2>
            <div className=&rdquo;testimonial-masonry&rdquo;>
              {localReviews.map((review, i) => (
                <div key={i} className=&rdquo;break-inside-avoid&rdquo;>
                  <TestimonialCard {...review} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className=&rdquo;py-20 bg-muted/50 border-t border-border&rdquo;>
          <div className=&rdquo;container-shell text-center max-w-2xl&rdquo;>
            <h2 className=&rdquo;mb-6&rdquo;>Local Service, Professional Standards</h2>
            <p className=&rdquo;text-muted-foreground mb-8 text-lg&rdquo;>
              Being local means we understand the area, the weather, and our community. We respond quickly and provide a level of service national franchises can&rsquo;t match.
            </p>
            <CTAButton variant=&rdquo;default&rdquo;>Hire Your Local Scooper</CTAButton>
          </div>
        </section>
      </main>

      
      <nav aria-label=&rdquo;Scoopy Doo site navigation&rdquo; className=&rdquo;py-8 border-t border-border bg-muted/20&rdquo;>
        <div className=&rdquo;max-w-5xl mx-auto px-4 text-center&rdquo;>
          <p className=&rdquo;text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3&rdquo;>Explore Scoopy Doo</p>
          <ul className=&rdquo;flex flex-wrap justify-center gap-x-6 gap-y-2 list-none m-0 p-0&rdquo;>
            <li><Link to=&rdquo;/&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Home</Link></li>
            <li><Link to=&rdquo;/services&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Services</Link></li>
            <li><Link to=&rdquo;/pricing&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Pricing</Link></li>
            <li><Link to=&rdquo;/quote&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Get a Quote</Link></li>
            <li><Link to=&rdquo;/faq&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>FAQ</Link></li>
            <li><Link to=&rdquo;/reviews&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Reviews</Link></li>
            <li><Link to=&rdquo;/service-areas&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Service Areas</Link></li>
            <li><Link to=&rdquo;/blog&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Blog</Link></li>
          </ul>
        </div>
      </nav>
      <Footer />
    </div>
  );
};

export default NearMePage;
