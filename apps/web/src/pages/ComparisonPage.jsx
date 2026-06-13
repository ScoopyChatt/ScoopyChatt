import React from &rsquo;react&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import FloatingCTA from &rsquo;@/components/FloatingCTA.jsx&rsquo;;
import { getCanonicalUrl } from &rsquo;@/utils/seoHelpers.js&rsquo;;

const services = [
  {
    name: &rdquo;Scoopy Doo&rdquo;,
    url: &rdquo;https://www.scoopychatt.com&rdquo;,
    local: true,
    area: &rdquo;Chattanooga + 13 TN suburbs + Ringgold, Rossville, Fort Oglethorpe, Flintstone GA&rdquo;,
    frequency: &rdquo;Weekly, bi-weekly, one-time&rdquo;,
    price: &rdquo;$16/visit&rdquo;,
    notable: &rdquo;7-day availability; on-the-way texts standard; gate photo after every visit standard; waste hauled off property; no contracts; local father-daughter team&rdquo;,
  },
  {
    name: &rdquo;PooTagic&rdquo;,
    url: &rdquo;https://pootagic.com&rdquo;,
    local: true,
    area: &rdquo;Chattanooga + suburbs + Ringgold, Rossville, Fort Oglethorpe GA&rdquo;,
    frequency: &rdquo;Not listed&rdquo;,
    price: &rdquo;Quote required&rdquo;,
    notable: &rdquo;Local family-owned; eco-friendly practices; Poo-Fume sanitizing add-on&rdquo;,
  },
  {
    name: &rdquo;Cooper&rsquo;s Scoopers&rdquo;,
    url: &rdquo;https://coopersscoopers.com/chattanooga-tn/&rdquo;,
    local: false,
    area: &rdquo;Chattanooga, Hixson, Signal Mountain, Lookout Mountain + rural TN areas&rdquo;,
    frequency: &rdquo;Weekly, bi-weekly, one-time&rdquo;,
    price: &rdquo;Not listed&rdquo;,
    notable: &rdquo;Franchise chain; deodorizing add-on available&rdquo;,
  },
  {
    name: &rdquo;Doo Doo Blues&rdquo;,
    url: &rdquo;https://doodooblues.com/pet-waste-pickup-locations/chattanooga-tn/&rdquo;,
    local: false,
    area: &rdquo;Chattanooga TN (North Georgia not listed)&rdquo;,
    frequency: &rdquo;Weekly, bi-weekly&rdquo;,
    price: &rdquo;Starting $9.99&rdquo;,
    notable: &rdquo;First cleaning free; national franchise; no contracts; sanitizes before each yard&rdquo;,
  },
  {
    name: &rdquo;Scoop Smart&rdquo;,
    url: &rdquo;https://getscoopsmart.com&rdquo;,
    local: true,
    area: &rdquo;Chattanooga TN + North Georgia&rdquo;,
    frequency: &rdquo;Weekly, bi-weekly, monthly, twice-weekly&rdquo;,
    price: &rdquo;Not listed&rdquo;,
    notable: &rdquo;Locally owned; no contracts; background-checked staff; flexible scheduling&rdquo;,
  },
  {
    name: &rdquo;Call of Doody&rdquo;,
    url: &rdquo;https://www.call-of-doody.org&rdquo;,
    local: true,
    area: &rdquo;Chattanooga TN + Dalton, Ringgold, Tunnel Hill GA&rdquo;,
    frequency: &rdquo;Weekly, bi-weekly, monthly&rdquo;,
    price: &rdquo;$18/visit weekly&rdquo;,
    notable: &rdquo;Family-owned; text/email confirmation standard; gate photo on request; 24-hr make-it-right guarantee; licensed and insured&rdquo;,
  },
];

const descriptions = [
  {
    name: &rdquo;Scoopy Doo&rdquo;,
    text: &rdquo;Scoopy Doo is a locally owned father-daughter team and the only provider on this list with confirmed service across both Tennessee suburbs and North Georgia Catoosa and Walker County communities. On-the-way texts and gate photo confirmation are standard on every visit, not add-ons. Waste is hauled fully off the property. Service runs 7 days a week with no contracts.&rdquo;,
  },
  {
    name: &rdquo;PooTagic&rdquo;,
    text: &rdquo;PooTagic is a family-owned Chattanooga-area company with an eco-friendly focus and a professional sanitizing and deodorizing add-on service called Poo-Fume. They cover several North Georgia communities alongside their Tennessee areas. Pricing is not listed publicly on their website.&rdquo;,
  },
  {
    name: &rdquo;Cooper&rsquo;s Scoopers&rdquo;,
    text: &rdquo;Cooper&rsquo;s Scoopers is a franchise operation with a Chattanooga-area location. They cover the city and several Tennessee communities including Hixson, Signal Mountain, and Lookout Mountain, plus some rural TN areas. A deodorizing add-on is available. Pricing was not listed on their site at the time this page was written.&rdquo;,
  },
  {
    name: &rdquo;Doo Doo Blues&rdquo;,
    text: &rdquo;Doo Doo Blues is a national franchise operating across dozens of cities in the Southeast. Their published starting rate of $9.99 is the lowest on this list, and the first cleaning is free. Their Chattanooga location serves Tennessee only. Their listed Georgia markets do not include Chattanooga-area communities, so confirm coverage before signing up if you need North Georgia service.&rdquo;,
  },
  {
    name: &rdquo;Scoop Smart&rdquo;,
    text: &rdquo;Scoop Smart is a locally owned Chattanooga business offering more frequency options than most competitors, including twice-weekly service. No contracts or cancellation fees. Pricing is not listed on their website.&rdquo;,
  },
  {
    name: &rdquo;Call of Doody&rdquo;,
    text: &rdquo;Call of Doody is a family-owned operation run by Mindie and Davy Hunt, serving Chattanooga and several North Georgia communities including Dalton and Ringgold. Pricing is published transparently on their site. Text and email confirmations are standard; gate photos are available on request. They offer a 24-hour make-it-right guarantee and are licensed and insured.&rdquo;,
  },
];

const ComparisonPage = () => {
  const canonicalUrl = getCanonicalUrl(&rsquo;/comparison&rsquo;);
  const title = &rdquo;Pet Waste Removal Services in Chattanooga, TN &mdash; 2026 Comparison | Scoopy Doo&rdquo;;
  const desc = &rdquo;Side-by-side comparison of pet waste removal services in Chattanooga TN and North Georgia: pricing, service areas, frequency options, and notable features for 6 local providers.&rdquo;;

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <Helmet>
        <title>{title}</title>
        <meta name=&rdquo;description&rdquo; content={desc} />
        <link rel=&rdquo;canonical&rdquo; href={canonicalUrl} />
        <meta property=&rdquo;og:title&rdquo; content={title} />
        <meta property=&rdquo;og:description&rdquo; content={desc} />
        <meta property=&rdquo;og:url&rdquo; content={canonicalUrl} />
      </Helmet>

      <Header />

      <main className=&rdquo;flex-grow pb-24 md:pb-0&rdquo;>
        <section className=&rdquo;py-16 md:py-24 bg-primary/5&rdquo;>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <h1 className=&rdquo;text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight&rdquo; style={{ letterSpacing: &rsquo;-0.02em&rsquo; }}>
              Pet Waste Removal Services in Chattanooga, TN
              <span className=&rdquo;block text-2xl md:text-3xl font-semibold text-muted-foreground mt-2&rdquo;>2026 Comparison</span>
            </h1>
            <p className=&rdquo;text-lg text-muted-foreground max-w-3xl mt-4&rdquo;>
              Six providers currently operating in the Chattanooga area, compared by service area, frequency options, published pricing, and standout features. Pricing marked &rdquo;Not listed&rdquo; was not published on the provider&rsquo;s website as of June 2026.
            </p>
          </div>
        </section>

        <section className=&rdquo;py-12&rdquo;>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <div className=&rdquo;overflow-x-auto rounded-lg border border-border shadow-sm&rdquo;>
              <table className=&rdquo;w-full text-sm text-left&rdquo;>
                <thead className=&rdquo;bg-muted text-muted-foreground text-xs tracking-wider&rdquo;>
                  <tr>
                    <th className=&rdquo;px-4 py-3 font-semibold&rdquo;>Service</th>
                    <th className=&rdquo;px-4 py-3 font-semibold&rdquo;>Service area</th>
                    <th className=&rdquo;px-4 py-3 font-semibold&rdquo;>Frequency options</th>
                    <th className=&rdquo;px-4 py-3 font-semibold&rdquo;>Starting price</th>
                    <th className=&rdquo;px-4 py-3 font-semibold&rdquo;>Notable</th>
                  </tr>
                </thead>
                <tbody className=&rdquo;divide-y divide-border&rdquo;>
                  {services.map((s, i) => (
                    <tr key={i} className={s.name === &rdquo;Scoopy Doo&rdquo; ? &rdquo;bg-primary/5&rdquo; : &rdquo;bg-background&rdquo;}>
                      <td className=&rdquo;px-4 py-4 whitespace-nowrap&rdquo;>
                        <a href={s.url} target=&rdquo;_blank&rdquo; rel=&rdquo;noopener noreferrer&rdquo; className=&rdquo;text-primary hover:underline font-semibold&rdquo;>
                          {s.name}
                        </a>
                        {s.local && (
                          <span className=&rdquo;ml-2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded&rdquo;>Local</span>
                        )}
                      </td>
                      <td className=&rdquo;px-4 py-4 text-sm text-foreground&rdquo;>{s.area}</td>
                      <td className=&rdquo;px-4 py-4 text-sm text-foreground whitespace-nowrap&rdquo;>{s.frequency}</td>
                      <td className=&rdquo;px-4 py-4 text-sm text-foreground whitespace-nowrap&rdquo;>{s.price}</td>
                      <td className=&rdquo;px-4 py-4 text-sm text-muted-foreground&rdquo;>{s.notable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className=&rdquo;mt-3 text-xs text-muted-foreground&rdquo;>
              Table reflects publicly available information as of June 2026. Contact each provider directly for current pricing and availability in your neighborhood.
            </p>
          </div>
        </section>

        <section className=&rdquo;py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
          <h2 className=&rdquo;text-2xl font-bold text-foreground mb-8&rdquo;>About Each Service</h2>
          <div className=&rdquo;grid gap-6 md:grid-cols-2&rdquo;>
            {descriptions.map((d, i) => (
              <div key={i} className=&rdquo;rounded-lg border border-border p-5 bg-background&rdquo;>
                <h3 className=&rdquo;font-semibold text-foreground mb-2&rdquo;>{d.name}</h3>
                <p className=&rdquo;text-sm text-muted-foreground leading-relaxed&rdquo;>{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className=&rdquo;py-12 bg-primary/5&rdquo;>
          <div className=&rdquo;max-w-2xl mx-auto px-4 text-center&rdquo;>
            <h2 className=&rdquo;text-2xl font-bold text-foreground mb-3&rdquo;>Get a Free Quote from Scoopy Doo</h2>
            <p className=&rdquo;text-muted-foreground mb-6&rdquo;>
              Serving Chattanooga TN and North Georgia &mdash; weekly, bi-weekly, and one-time service with no contracts. On-the-way texts and gate photo confirmation included on every visit.
            </p>
            <Link
              to=&rdquo;/quoterequest&rdquo;
              className=&rdquo;inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors&rdquo;
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
