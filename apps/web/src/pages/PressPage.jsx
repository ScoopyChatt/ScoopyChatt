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

const apawsReleaseSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Scoopy Doo LLC Joins aPaws, Becoming the Chattanooga Area's Only Member of the National Pet Waste Removal Trade Association",
  datePublished: "2026-08-21",
  author: { "@type": "Organization", name: "Scoopy Doo LLC", url: BASE },
  publisher: { "@type": "Organization", name: "Scoopy Doo LLC", url: BASE },
  mainEntityOfPage: BASE + "/press",
  about: {
    "@type": "Organization",
    name: "Association of Professional Animal Waste Specialists",
    alternateName: "aPaws",
    url: "https://apaws.org/",
  },
  articleSection: "Press Release",
  description:
    "Scoopy Doo LLC has joined aPaws, the Association of Professional Animal Waste Specialists. As of August 2026 the aPaws member directory lists no other member within 76 miles of Chattanooga.",
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
        schema={[apawsReleaseSchema, collectionSchema, articleSchema, wdefArticleSchema]}
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

        <section className="py-12 pb-0">
          <div className="container mx-auto px-4 max-w-3xl">
            <article className="border border-primary/30 bg-primary/5 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="font-semibold text-primary">Press Release</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>August 21, 2026</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>Ringgold, GA</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Scoopy Doo LLC Joins aPaws, Becoming the Chattanooga Area&apos;s Only Member of the National Pet Waste Removal Trade Association
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Scoopy Doo LLC, the pet waste removal company serving Chattanooga, Tennessee and North
                    Georgia, has joined aPaws, the Association of Professional Animal Waste Specialists. Founded
                    in 2002, aPaws is the national trade association for the professional pet waste removal
                    industry.
                  </p>
                  <p>
                    Scoopy Doo is currently the only aPaws member serving the Chattanooga metropolitan area. A
                    search of the public aPaws member directory for the 37421 ZIP code across a 100-mile radius
                    returns Scoopy Doo at 6.3 miles, with the next nearest member located in Cumming, Georgia at
                    76.9 miles and the one after that in Nashville, Tennessee at 114.5 miles. Chattanooga dog
                    owners who want to hire an association member locally have one option in the directory.
                  </p>
                  <p>
                    Membership is not automatic. aPaws screens members for insurance and requires a pledge to
                    the association&apos;s standards of care for client properties and pets. The association also
                    established International Pooper Scooper Week, held April 1 through 7 each year, to raise
                    public awareness of the health risks that uncollected dog waste poses to families, pets, and
                    local waterways.
                  </p>
                  <p>
                    Scoopy Doo LLC was founded by Leighton Carter, who started the company at 14 years old with a
                    single customer and grew it with her father Brandon into the largest pet waste removal company
                    in the Chattanooga area in under a year. The company was featured by the Chattanoogan in June
                    2026 and by WDEF News 12 in July 2026. It is a BBB Accredited Business with an A- rating and
                    holds 90 five-star reviews across more than 150 active clients.
                  </p>
                  <p>
                    Scoopy Doo provides weekly, twice-weekly, every-other-week, and one-time dog waste removal for
                    homes, HOAs, apartment communities, and commercial properties across 24 service areas in
                    Tennessee and North Georgia, along with pet waste station installation and servicing. Every
                    visit includes an on-the-way text, a full grid-pattern sweep of the yard, and a photo of the
                    secured gate when the visit is complete. No contracts are required.
                  </p>
                </div>
                <figure className="mt-6 border-l-4 border-primary/40 pl-5">
                  <blockquote className="text-muted-foreground italic">
                    &ldquo;Joining aPaws was an easy decision for us. When Leighton and I started Scoopy
                    Doo, we quickly realized that pet waste removal is becoming a real professional
                    service industry, but it&apos;s still young enough that the companies doing things the
                    right way have an opportunity to help shape what it becomes. We wanted to be part of
                    an organization that promotes professionalism, education, better operating standards,
                    and collaboration between companies across the country. We&apos;ve learned an
                    incredible amount building Scoopy Doo, and we&apos;re still learning every day. Being
                    part of aPaws gives us the opportunity to learn from other great operators, share what
                    has worked for us, and help raise the bar for the entire industry.&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-foreground">
                    &mdash; Brandon Carter, Owner, Scoopy Doo
                  </figcaption>
                </figure>

                <figure className="mt-6 border-l-4 border-primary/40 pl-5">
                  <blockquote className="text-muted-foreground italic">
                    &ldquo;What I like most about joining aPaws is that it connects us with other people
                    who are serious about building great businesses and making this industry better.
                    Scoopy Doo has grown incredibly fast, and I&apos;ve gotten to learn about marketing,
                    customer service, leadership, and entrepreneurship much earlier than I ever expected.
                    I think there&apos;s a lot we can learn from other aPaws members, but I also think we
                    have experiences and ideas we can contribute. It&apos;s exciting to be part of a
                    community that wants to see this industry grow and become even more professional.&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-foreground">
                    &mdash; Leighton Carter, President, Scoopy Doo
                  </figcaption>
                </figure>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="https://apaws.org/search/details.aspx?id=3031"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                  >
                    View the Scoopy Doo listing in the aPaws directory <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  Media contact: Brandon Carter, Scoopy Doo LLC &mdash; info@scoopychatt.com &bull; 423-600-5040
                </p>
              </div>
            </article>
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
