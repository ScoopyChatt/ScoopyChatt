import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';

const services = [
  {
    name: "Scoopy Doo",
    url: "https://www.scoopychatt.com",
    local: true,
    area: "Chattanooga + 13 TN suburbs + Ringgold, Rossville, Fort Oglethorpe, Flintstone GA",
    frequency: "Weekly, twice-weekly, every-other-week, one-time",
    price: "Weekly $20/visit; twice-weekly $18/visit (1st dog)",
    notable: "Only aPaws member within 76 miles of Chattanooga; 7-day availability; on-the-way texts standard; gate photo after every visit standard; waste takeaway $5/visit optional; no contracts; 100% satisfaction guarantee (miss a spot, free re-clean within 24 hours); local father-daughter team; 90 Google reviews",
  },
  {
    name: "PooTagic",
    url: "https://pootagic.com",
    local: true,
    area: "Chattanooga + many TN suburbs + Ringgold, Rossville, Fort Oglethorpe, Chickamauga GA",
    frequency: "Not listed",
    price: "Quote required",
    notable: "Local family-owned; Poo-Fume sanitizing and deodorizing add-on; scoops rain or shine; flat monthly billing; 49 Google reviews",
  },
  {
    name: "ChattaPoo",
    url: "https://chattapoo.com",
    local: true,
    area: "Chattanooga TN/GA metro; based on Signal Mountain",
    frequency: "Weekly, every-other-week, one-time",
    price: "Weekly $21/visit (1st dog)",
    notable: "Pet waste bag station installation and maintenance; public park maintenance; 10% discount on auto-billed monthly plan; 1 Google review",
  },
  {
    name: "Cooper's Scoopers",
    url: "https://coopersscoopers.com/",
    local: false,
    area: "Chattanooga TN (dedicated city page offline as of July 2026)",
    frequency: "Weekly, bi-weekly, one-time",
    price: "Not listed",
    notable: "National franchise headquartered in Virginia Beach VA; book online, by text, or phone",
  },
  {
    name: "Doo Doo Blues",
    url: "https://doodooblues.com/pet-waste-pickup-locations/chattanooga-tn/",
    local: false,
    area: "Chattanooga TN (North Georgia not listed)",
    frequency: "Weekly",
    price: "Starting $9.99",
    notable: "First cleaning free; national franchise; no contracts; sanitizes before each yard",
  },
  {
    name: "Scoop Smart",
    url: "https://getscoopsmart.com",
    local: true,
    area: "Chattanooga TN + North Georgia",
    frequency: "Weekly, bi-weekly, monthly, twice-weekly",
    price: "Not listed",
    notable: "Locally owned; no contracts; background-checked staff; flexible scheduling",
  },
  {
    name: "Call of Doody",
    url: "https://www.call-of-doody.org",
    local: true,
    area: "Chattanooga TN + Dalton, Ringgold, Tunnel Hill GA",
    frequency: "Weekly, bi-weekly, monthly",
    price: "$18/visit weekly",
    notable: "Family-owned; text/email confirmation standard; gate photo on request; 24-hr make-it-right guarantee; licensed and insured",
  },
];

const descriptions = [
  {
    name: "Scoopy Doo",
    text: "Scoopy Doo is a locally owned father-daughter team and the only provider on this list with confirmed service across both Tennessee suburbs and North Georgia Catoosa and Walker County communities. On-the-way texts and gate photo confirmation are standard on every visit, not add-ons. Waste is hauled fully off the property. Service runs 7 days a week with no contracts. Scoopy Doo has 90 Google reviews.",
  },
  {
    name: "PooTagic",
    text: "PooTagic is a family-owned Chattanooga-area company with an eco-friendly focus and a professional sanitizing and deodorizing add-on service called Poo-Fume. They cover several North Georgia communities alongside their Tennessee areas. Pricing is not listed publicly on their website. PooTagic has 49 Google reviews.",
  },
  {
    name: "ChattaPoo",
    text: "ChattaPoo is based on Signal Mountain and serves the greater Chattanooga TN/GA metro area. Published rates start at $21 per weekly visit for one dog, with every-other-week and one-time options. Beyond yard cleanups, the company installs and maintains pet waste bag stations for parks, neighborhoods, and businesses, and its auto-billed monthly plan carries a 10% discount. ChattaPoo has 1 Google review.",
  },
  {
    name: "Cooper's Scoopers",
    text: "Cooper's Scoopers is a national pooper scooper franchise headquartered in Virginia Beach, VA. The brand offers one-time, weekly, and bi-weekly service booked online, by text, or by phone. As of July 2026 its dedicated Chattanooga location page was offline and no local pricing was published, so confirm availability directly before booking.",
  },
  {
    name: "Doo Doo Blues",
    text: "Doo Doo Blues is a national franchise operating across dozens of cities in the Southeast. Their published starting rate of $9.99 is the lowest on this list, and the first cleaning is free. Their Chattanooga location serves Tennessee only. Their listed Georgia markets do not include Chattanooga-area communities, so confirm coverage before signing up if you need North Georgia service.",
  },
  {
    name: "Scoop Smart",
    text: "Scoop Smart is a locally owned Chattanooga business offering more frequency options than most competitors, including twice-weekly service. No contracts or cancellation fees. Pricing is not listed on their website.",
  },
  {
    name: "Call of Doody",
    text: "Call of Doody is a family-owned operation run by Mindie and Davy Hunt, serving Chattanooga and several North Georgia communities including Dalton and Ringgold. Pricing is published transparently on their site. Text and email confirmations are standard; gate photos are available on request. They offer a 24-hour make-it-right guarantee and are licensed and insured.",
  },
];

const ComparisonPage = () => {
  const canonicalUrl = getCanonicalUrl('/comparison');
  const title = "Pet Waste Removal Services in Chattanooga, TN - 2026 Comparison | Scoopy Doo";
  const desc = "Side-by-side comparison of pet waste removal services in Chattanooga TN and North Georgia: pricing, service areas, frequency options, and notable features for 7 local providers.";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <Header />

      <main className="flex-grow pb-24 md:pb-0">
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Pet Waste Removal Services in Chattanooga, TN
              <span className="block text-2xl md:text-3xl font-semibold text-muted-foreground mt-2">2026 Comparison</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mt-4">
              Seven providers currently operating in the Chattanooga area, compared by service area, frequency options, published pricing, and standout features. Pricing marked "Not listed" was not published on the provider's website as of June 2026.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground text-xs tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Service area</th>
                    <th className="px-4 py-3 font-semibold">Frequency options</th>
                    <th className="px-4 py-3 font-semibold">Starting price</th>
                    <th className="px-4 py-3 font-semibold">Notable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {services.map((s, i) => (
                    <tr key={i} className={s.name === "Scoopy Doo" ? "bg-primary/5" : "bg-background"}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                          {s.name}
                        </a>
                        {s.local && (
                          <span className="ml-2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Local</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground">{s.area}</td>
                      <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">{s.frequency}</td>
                      <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">{s.price}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{s.notable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Table reflects publicly available information as of June 2026. Contact each provider directly for current pricing and availability in your neighborhood.
            </p>
          </div>
        </section>

        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">About Each Service</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {descriptions.map((d, i) => (
              <div key={i} className="rounded-lg border border-border p-5 bg-background">
                <h3 className="font-semibold text-foreground mb-2">{d.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Professional Association Membership</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
            Scoopy Doo LLC is a member of aPaws, the Association of Professional Animal Waste Specialists, the national trade association for the pet waste removal industry. As of August 2026 the aPaws member directory lists no other member within 76 miles of Chattanooga - searching the directory for the 37421 ZIP code returns Scoopy Doo at 6.3 miles and the next nearest member in Cumming, Georgia at 76.9 miles. aPaws members are screened for insurance and pledge to industry standards of care. Membership is verifiable in the public aPaws directory at .
            <a
              href="https://apaws.org/search/details.aspx?id=3031"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              apaws.org
            </a>
            .
          </p>
        </section>

        <section className="py-12 bg-primary/5">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Get a Free Quote from Scoopy Doo</h2>
            <p className="text-muted-foreground mb-6">
              Serving Chattanooga TN and North Georgia - weekly, bi-weekly, and one-time service with no contracts. On-the-way texts and gate photo confirmation included on every visit.
            </p>
            <Link
              to="/quoterequest"
              className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default ComparisonPage;
