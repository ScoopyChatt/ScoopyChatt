import React from "react";
import SEOHead from "@/components/SEOHead.jsx";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import CTAButton from "@/components/CTAButton.jsx";
import { ExternalLink, Newspaper, Star } from "lucide-react";

const BASE = "https://www.scoopychatt.com";
const ARTICLE_URL = "https://www.chattanoogan.com/2026/6/23/520251/14-Year-Old-Entrepreneur-Builds.aspx";
const WDEF_URL = "https://www.wdef.com/scoopy-doo-llc-pet-waste-removal/";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Scoopy Doo in the News",
  "url": BASE + "/press",
  "description": "News coverage and press mentions of Scoopy Doo LLC, the largest pet waste removal company in the Chattanooga, TN area.",
  "about": {
    "@type": "LocalBusiness",
    "name": "Scoopy Doo LLC",
    "url": BASE,
    "telephone": "+1-423-600-5040",
    "areaServed": "Chattanooga, TN and North Georgia"
  }
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "14-Year-Old Entrepreneur Builds Chattanooga Largest Pet Waste Removal Company In Under A Year",
  "url": ARTICLE_URL,
  "datePublished": "2026-06-23",
  "image": "https://images.chattanoogan.com/2026/6/article.520251.jpg",
  "publisher": { "@type": "Organization", "name": "Chattanoogan.com", "url": "https://www.chattanoogan.com" },
  "about": { "@type": "LocalBusiness", "name": "Scoopy Doo LLC", "url": BASE },
  "mainEntityOfPage": ARTICLE_URL
};

const wdefArticleSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Scoopy Doo LLC, pet waste removal",
  "url": WDEF_URL,
  "datePublished": "2026-07-02",
  "author": { "@type": "Person", "name": "Mackenzie Johnson" },
  "publisher": { "@type": "NewsMediaOrganization", "name": "WDEF News 12", "url": "https://www.wdef.com" },
  "about": { "@type": "LocalBusiness", "name": "Scoopy Doo LLC", "url": BASE },
  "mainEntityOfPage": WDEF_URL
};

export default function PressPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        path="/press"
        title="Scoopy Doo in the News | Press and Media Coverage | Chattanooga Pet Waste Removal"
        description="See the news coverage of Scoopy Doo LLC, the largest pet waste removal company in the Chattanooga area. Featured in the Chattanoogan and on WDEF News 12."
        canonicalUrl={BASE + "/press"}
        schema={[collectionSchema, articleSchema, wdefArticleSchema]}
      />
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 text-primary font-semibold mb-4">
              <Newspaper className="w-5 h-5" /> Press &amp; Media
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Scoopy Doo in the News: Chattanooga&apos;s Largest Pet Waste Removal Company, Featured in the Chattanoogan and on WDEF News 12
            </h1>
            <p className="text-lg text-muted-foreground">
              Scoopy Doo LLC is the largest and fastest-growing pet waste removal company in the Chattanooga, TN area, serving more than 150 clients with 90 five-star reviews across Chattanooga and North Georgia.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <article className="border border-border rounded-2xl overflow-hidden shadow-sm">
              <img src="https://images.chattanoogan.com/2026/6/article.520251.jpg" alt="Scoopy Doo LLC featured in the Chattanoogan newspaper" className="w-full h-auto" loading="lazy" />
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="font-semibold text-foreground">Chattanoogan.com</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>June 23, 2026</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>Business</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  14-Year-Old Entrepreneur Builds Chattanooga&apos;s Largest Pet Waste Removal Company In Under A Year
                </h2>
                <p className="text-muted-foreground mb-5">
                  What started as a 14-year-old&apos;s idea to earn her own money has become the largest pet waste removal company in the Chattanooga area. In under a year, founder Leighton Carter grew Scoopy Doo LLC from a single customer to more than 150 active clients and 90 five-star reviews, with her dad Brandon supporting her along the way, serving dog owners, HOAs, apartment communities, and commercial properties across Chattanooga and North Georgia.
                </p>
                <a href={ARTICLE_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                  Read the full article on Chattanoogan.com <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>

            <article className="mt-8 border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="font-semibold text-foreground">WDEF News 12</span>
                  <span>&bull;</span>
                  <span>July 2, 2026</span>
                  <span>&bull;</span>
                  <span>Local News</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Father and Daughter Team Featured on WDEF News 12
                </h2>
                <p className="text-muted-foreground mb-5">
                  WDEF News 12 shared the story of how 14-year-old Leighton Carter came to her dad, Brandon, wanting to start her own company, and how Scoopy Doo LLC was born. The father and daughter team now run Scoopy Doo full-time, serving more than 150 customers across the Chattanooga area with a team of three, offering weekly, bi-weekly, and twice-a-week yard cleanings.
                </p>
                <a href={WDEF_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                  Watch the story on WDEF.com <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>

            <div className="mt-10 bg-muted/40 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-2" aria-label="Five star rating">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-foreground font-medium mb-4">
                Join 150+ Chattanooga and North Georgia neighbors who trust Scoopy Doo to keep their yards clean and safe.
              </p>
              <CTAButton to="/quote" size="lg">Get Your Free Quote</CTAButton>
            </div>

            <p className="mt-10 text-center text-sm text-muted-foreground">
              Press and media inquiries: <a href="mailto:info@scoopychatt.com" className="text-primary hover:underline">info@scoopychatt.com</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
