import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import FloatingCTA from &rsquo;@/components/FloatingCTA.jsx&rsquo;;
import FAQSection from &rsquo;@/components/FAQSection.jsx&rsquo;;
import ReviewsSection from &rsquo;@/components/ReviewsSection.jsx&rsquo;;
import { getCanonicalUrl } from &rsquo;@/utils/seoHelpers.js&rsquo;;
import { getFaqData } from &rsquo;@/data/faqData.js&rsquo;;

const FAQPage = () => {
const faqSections = getFaqData(&rsquo;Chattanooga&rsquo;);
const allFaqs = faqSections.flatMap(section => section.faqs);

const canonicalUrl = getCanonicalUrl(&rsquo;/faq&rsquo;);
const pageTitle = &rdquo;Pet Waste Removal FAQs | Scoopy Doo Chattanooga&rdquo;;
const pageDesc = &rdquo;Answers to common questions about dog poop removal in Chattanooga: pricing, scheduling, service areas, gate access, pets, and more.&rdquo;;

const faqSchema = JSON.stringify({
  &rdquo;@context&rdquo;: &rdquo;https://schema.org&rdquo;,
  &rdquo;@type&rdquo;: &rdquo;FAQPage&rdquo;,
  &rdquo;mainEntity&rdquo;: allFaqs.map(faq => ({
    &rdquo;@type&rdquo;: &rdquo;Question&rdquo;,
    &rdquo;name&rdquo;: faq.question,
    &rdquo;acceptedAnswer&rdquo;: {
      &rdquo;@type&rdquo;: &rdquo;Answer&rdquo;,
      &rdquo;text&rdquo;: faq.answer
    }
  }))
});

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
<script type=&rdquo;application/ld+json&rdquo;>{faqSchema}</script>
</Helmet>

<Header />

<main className=&rdquo;flex-grow pb-24 md:pb-0&rdquo;>
<section className=&rdquo;relative py-20 md:py-28 bg-primary/5 overflow-hidden&rdquo;>
<div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10&rdquo;>
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className=&rdquo;max-w-3xl mx-auto text-center&rdquo;
>
<h1 className=&rdquo;text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 text-balance&rdquo; style={{ letterSpacing: &rsquo;-0.02em&rsquo; }}>
                Frequently Asked Questions About Pet Waste Removal in Chattanooga, TN
              </h1>
<p className=&rdquo;text-xl text-muted-foreground leading-relaxed&rdquo;>
Everything you need to know about our professional pet waste removal services.
</p>
</motion.div>
</div>
</section>

<ReviewsSection />

<div className=&rdquo;md:mt-8&rdquo;>
<FAQSection location=&rdquo;Chattanooga&rdquo; showHeader={false} />
</div>
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
<FloatingCTA />
</div>
);
};

export default FAQPage;
