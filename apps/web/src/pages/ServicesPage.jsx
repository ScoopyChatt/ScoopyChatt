import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { CheckCircle2, AlertTriangle, Building2, Leaf, Droplets, CalendarCheck, RotateCcw, Star, Sparkles } from &rsquo;lucide-react&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import ServiceCard from &rsquo;@/components/ServiceCard.jsx&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { getCanonicalUrl } from &rsquo;@/utils/seoHelpers.js&rsquo;;

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className=&rdquo;text-center mb-12&rdquo;>
    {Icon && <div className=&rdquo;inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4&rdquo;><Icon className=&rdquo;w-7 h-7 text-primary&rdquo; /></div>}
    <h2 className=&rdquo;text-3xl md:text-4xl font-bold text-foreground mb-4&rdquo;>{title}</h2>
    {subtitle && <p className=&rdquo;text-lg text-muted-foreground max-w-2xl mx-auto&rdquo;>{subtitle}</p>}
  </div>
);

const ServicesPage = () => {
  const canonicalUrl = getCanonicalUrl(&rsquo;/services&rsquo;);

  const plans = [
    {
      title: &rsquo;Weekly Service&rsquo;,
      description: &rdquo;Our most popular option. We visit once a week and remove all waste from your yard &mdash; every time, without fail.&rdquo;,
      benefits: [&rsquo;Prevents buildup and odor between visits&rsquo;, &rsquo;Best for homes with 2+ dogs&rsquo;, &rsquo;Scheduled to the same day each week&rsquo;, &rsquo;Waste hauled fully off property&rsquo;],
      mostPopular: true
    },
    {
      title: &rsquo;2X Weekly Service&rsquo;,
      description: &rdquo;For high-traffic yards and multi-dog households that need maximum cleanliness.&rdquo;,
      benefits: [&rsquo;Two visits per week&rsquo;, &rsquo;Maximum yard cleanliness&rsquo;, &rsquo;Ideal for 3+ dogs or large yards&rsquo;, &rsquo;Great for families with young kids&rsquo;],
    },
    {
      title: &rsquo;Bi-Weekly Service&rsquo;,
      description: &rdquo;A great balance of cleanliness and value for smaller yards or single-dog homes.&rdquo;,
      benefits: [&rsquo;Every two weeks&rsquo;, &rsquo;Thorough grid-pattern cleanup&rsquo;, &rsquo;Waste removed from property&rsquo;, &rsquo;Easy online scheduling&rsquo;],
    },
    {
      title: &rsquo;One-Time Cleanup&rsquo;,
      description: &rdquo;No commitment required. Perfect for moving, events, seasonal resets, or first-time visitors.&rdquo;,
      benefits: [&rsquo;Comprehensive deep cleanup&rsquo;, &rsquo;No recurring commitment&rsquo;, &rsquo;Fast scheduling&rsquo;, &rsquo;Same thorough process as recurring service&rsquo;],
    }
  ];

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <Helmet>
        <title>Pet Waste Removal Services in Chattanooga, TN | Scoopy Doo</title>
        <meta name=&rdquo;description&rdquo; content=&rdquo;Weekly, bi-weekly, one-time, commercial, and HOA pet waste removal in Chattanooga, TN. Professional dog poop scooping with online quotes, on-the-way texts, and gate photo confirmation.&rdquo; />
        <link rel=&rdquo;canonical&rdquo; href={canonicalUrl} />
        <meta property=&rdquo;og:title&rdquo; content=&rdquo;Pet Waste Removal Services in Chattanooga, TN | Scoopy Doo&rdquo; />
        <meta property=&rdquo;og:description&rdquo; content=&rdquo;Weekly, bi-weekly, one-time, commercial, and HOA pet waste removal in Chattanooga, TN. Get your free quote today.&rdquo; />
        <meta property=&rdquo;og:url&rdquo; content={canonicalUrl} />
      </Helmet>

      <Header />

      <main className=&rdquo;flex-grow&rdquo;>

        {/* Hero */}
        <section className=&rdquo;py-20 px-4 bg-gradient-to-b from-primary/5 to-background text-center&rdquo;>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=&rdquo;max-w-3xl mx-auto&rdquo;>
            <span className=&rdquo;inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-6&rdquo;>Chattanooga, TN</span>
            <h1 className=&rdquo;text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight&rdquo;>
                Pet Waste Removal Services in Chattanooga, TN
              </h1>
            <p className=&rdquo;text-lg md:text-xl text-muted-foreground mb-8&rdquo;>Weekly, bi-weekly, one-time, commercial, and HOA service &mdash; all with online quotes, on-the-way texts, and gate photo confirmation. No contracts, ever.</p>
            <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;rounded-xl px-8 h-14 text-base font-bold&rdquo;>
              <Link to=&rdquo;/quote&rdquo;>Get Your Free Quote</Link>
            </Button>
          </motion.div>
        </section>

        {/* Service Plans */}
        <section className=&rdquo;py-24 bg-muted/30 border-y border-border/50&rdquo;>
          <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <SectionHeader icon={CalendarCheck} title=&rdquo;Recurring Service Plans&rdquo; subtitle=&rdquo;Pick the frequency that fits your household. All plans include waste removal from the property, on-the-way text alerts, and gate photo confirmation.&rdquo; />
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-8 mb-12&rdquo;>
              {plans.map((plan, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <ServiceCard {...plan} />
                </motion.div>
              ))}
            </div>
            <div className=&rdquo;text-center&rdquo;>
              <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;rounded-xl px-8 h-12 font-bold&rdquo;>
                <Link to=&rdquo;/quote&rdquo;>Get Pricing for My Yard</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* One-Time and First-Time */}
        <section className=&rdquo;py-24 bg-background&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <SectionHeader icon={RotateCcw} title=&rdquo;One-Time & First-Time Cleanups&rdquo; subtitle=&rdquo;Not ready for recurring service? No problem. We offer standalone cleanups for any situation.&rdquo; />
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-8&rdquo;>
              <div className=&rdquo;bg-card border border-border rounded-2xl p-8&rdquo;>
                <h3 className=&rdquo;text-2xl font-bold text-foreground mb-3&rdquo;>One-Time Cleanup</h3>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>Perfect for moving in or out, hosting an event, seasonal yard resets, or just trying us out before committing to regular service. Same thorough grid-pattern process as recurring visits &mdash; all waste removed from the property.</p>
                <ul className=&rdquo;space-y-2 mb-6&rdquo;>
                  {[&rdquo;No commitment or contract required&rdquo;, &rdquo;Waste fully removed from property&rdquo;, &rdquo;Gate secured and photo sent when done&rdquo;, &rdquo;Usually scheduled within 2-5 days&rdquo;].map((item, i) => (
                    <li key={i} className=&rdquo;flex items-center gap-2 text-sm text-foreground&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary flex-shrink-0&rdquo; />{item}</li>
                  ))}
                </ul>
                <Button asChild variant=&rdquo;outline&rdquo; className=&rdquo;w-full rounded-xl font-semibold&rdquo;>
                  <Link to=&rdquo;/one-time-cleanup&rdquo;>Learn More About One-Time Service</Link>
                </Button>
              </div>
              <div className=&rdquo;bg-card border border-border rounded-2xl p-8&rdquo;>
                <h3 className=&rdquo;text-2xl font-bold text-foreground mb-3&rdquo;>First-Time Deep Clean</h3>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>If your yard has been unmanaged for weeks or months, we start with a thorough deep clean to get it back to baseline before beginning regular service. Overgrown yards and accumulated waste are never a problem &mdash; we handle it all.</p>
                <ul className=&rdquo;space-y-2 mb-6&rdquo;>
                  {[&rdquo;Handles heavily accumulated waste&rdquo;, &rdquo;Grid-pattern search covers every inch&rdquo;, &rdquo;Fresh start before recurring service begins&rdquo;, &rdquo;Priced based on yard size and waste level&rdquo;].map((item, i) => (
                    <li key={i} className=&rdquo;flex items-center gap-2 text-sm text-foreground&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary flex-shrink-0&rdquo; />{item}</li>
                  ))}
                </ul>
                <Button asChild variant=&rdquo;outline&rdquo; className=&rdquo;w-full rounded-xl font-semibold&rdquo;>
                  <Link to=&rdquo;/quote&rdquo;>Request a First-Time Cleanup</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial */}
        <section className=&rdquo;py-24 bg-muted/30 border-y border-border/50&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <SectionHeader icon={Building2} title=&rdquo;Commercial Pet Waste Removal&rdquo; subtitle=&rdquo;Professional service for businesses, apartment communities, dog parks, and multi-property accounts.&rdquo; />
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-12 items-start&rdquo;>
              <div>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>Scoopy Doo serves commercial properties throughout the Chattanooga metro and North Georgia. We work with apartment complexes, HOA communities, veterinary offices, dog daycares, pet-friendly businesses, and municipal dog parks to maintain clean, safe outdoor environments.</p>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>Commercial pet waste management is about more than aesthetics &mdash; it is about liability, tenant satisfaction, and regulatory compliance. Unmanaged pet waste in shared spaces creates health risks and generates resident complaints. Professional, scheduled service is the most reliable solution.</p>
                <ul className=&rdquo;space-y-3&rdquo;>
                  {[
                    &rdquo;Apartment complexes and multi-family communities&rdquo;,
                    &rdquo;HOA common areas, dog-walking paths, and green spaces&rdquo;,
                    &rdquo;Veterinary offices and pet care facilities&rdquo;,
                    &rdquo;Dog daycares and boarding facilities&rdquo;,
                    &rdquo;Municipal and private dog parks&rdquo;,
                    &rdquo;Corporate campuses with pet-friendly policies&rdquo;
                  ].map((item, i) => (
                    <li key={i} className=&rdquo;flex items-start gap-2 text-sm text-foreground&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary flex-shrink-0 mt-0.5&rdquo; />{item}</li>
                  ))}
                </ul>
              </div>
              <div className=&rdquo;bg-card border border-border rounded-2xl p-8&rdquo;>
                <h3 className=&rdquo;text-xl font-bold text-foreground mb-4&rdquo;>What Commercial Service Includes</h3>
                <ul className=&rdquo;space-y-4&rdquo;>
                  {[
                    { title: &rdquo;Flexible scheduling&rdquo;, desc: &rdquo;Daily, several times per week, or weekly &mdash; based on usage levels.&rdquo; },
                    { title: &rdquo;Complete waste removal&rdquo;, desc: &rdquo;All waste hauled off-site, not collected into on-site bins.&rdquo; },
                    { title: &rdquo;Equipment sanitation&rdquo;, desc: &rdquo;Tools sanitized between every property to prevent contamination.&rdquo; },
                    { title: &rdquo;Service records&rdquo;, desc: &rdquo;Documentation of every visit for HOA boards and property managers.&rdquo; },
                    { title: &rdquo;Direct billing&rdquo;, desc: &rdquo;Invoice-based billing for commercial accounts.&rdquo; }
                  ].map((item, i) => (
                    <li key={i} className=&rdquo;border-b border-border last:border-0 pb-4 last:pb-0&rdquo;>
                      <div className=&rdquo;font-semibold text-foreground text-sm&rdquo;>{item.title}</div>
                      <div className=&rdquo;text-muted-foreground text-sm&rdquo;>{item.desc}</div>
                    </li>
                  ))}
                </ul>
                <Button asChild className=&rdquo;w-full rounded-xl font-bold mt-6&rdquo;>
                  <Link to=&rdquo;/quote&rdquo;>Request Commercial Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* HOA and Pet Waste Stations */}
        <section className=&rdquo;py-24 bg-background&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <SectionHeader icon={Sparkles} title=&rdquo;HOA & Apartment Pet Waste Stations&rdquo; subtitle=&rdquo;We install, stock, and service pet waste stations so your community stays compliant and clean &mdash; with zero effort from management.&rdquo; />
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-12 items-start&rdquo;>
              <div>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>Pet waste stations &mdash; the bag dispensers and waste receptacles you see in well-managed communities &mdash; are only effective if they are stocked and emptied consistently. Scoopy Doo provides full-service station management so HOA boards and property managers can set it and forget it.</p>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>Communities with active pet waste programs see fewer complaints, higher resident satisfaction, and better compliance with pet policies. We help Chattanooga area HOAs build and maintain programs that actually work.</p>
                <ul className=&rdquo;space-y-3&rdquo;>
                  {[
                    &rdquo;Station placement consulting for new communities&rdquo;,
                    &rdquo;Bag restocking on regular scheduled visits&rdquo;,
                    &rdquo;Waste receptacle emptying and removal&rdquo;,
                    &rdquo;Common area cleanup around stations&rdquo;,
                    &rdquo;Service documentation for HOA records&rdquo;,
                    &rdquo;Flat-rate commercial pricing for easy budgeting&rdquo;
                  ].map((item, i) => (
                    <li key={i} className=&rdquo;flex items-start gap-2 text-sm text-foreground&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary flex-shrink-0 mt-0.5&rdquo; />{item}</li>
                  ))}
                </ul>
              </div>
              <div className=&rdquo;space-y-4&rdquo;>
                <div className=&rdquo;bg-primary/5 border border-primary/20 rounded-2xl p-6&rdquo;>
                  <h3 className=&rdquo;font-bold text-foreground mb-2&rdquo;>For HOA Boards</h3>
                  <p className=&rdquo;text-muted-foreground text-sm&rdquo;>We work directly with HOA boards on scheduling, invoicing, and service documentation. If you are struggling with pet waste rule enforcement, professional service in common areas is the fastest path to compliance.</p>
                </div>
                <div className=&rdquo;bg-primary/5 border border-primary/20 rounded-2xl p-6&rdquo;>
                  <h3 className=&rdquo;font-bold text-foreground mb-2&rdquo;>For Property Managers</h3>
                  <p className=&rdquo;text-muted-foreground text-sm&rdquo;>Reduce resident complaints and protect property values with a consistent pet waste program. We handle scheduling, execution, and documentation &mdash; you handle everything else.</p>
                </div>
                <Button asChild className=&rdquo;w-full rounded-xl font-bold&rdquo;>
                  <Link to=&rdquo;/quote&rdquo;>Get HOA or Apartment Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Deodorizing and Sanitizing */}
        <section className=&rdquo;py-24 bg-muted/30 border-y border-border/50&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <SectionHeader icon={Droplets} title=&rdquo;Deodorizing & Yard Sanitizing&rdquo; subtitle=&rdquo;Remove odors and kill bacteria in the ground &mdash; not just the waste itself.&rdquo; />
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-12 items-center&rdquo;>
              <div>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>Pet waste removal eliminates the source of the problem, but the bacteria and odor compounds it leaves behind in the soil can persist long after the waste is gone. Deodorizing and sanitizing treatments neutralize those residual effects and leave your yard genuinely clean &mdash; not just visually clean.</p>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>This service is especially valuable for yards with years of accumulated contamination, areas near patios or high-traffic zones, or properties being prepared for sale or events. Ask about adding it to your regular service plan.</p>
                <ul className=&rdquo;space-y-3&rdquo;>
                  {[
                    &rdquo;Neutralizes odor compounds in soil and grass&rdquo;,
                    &rdquo;Kills bacteria and pathogens left after removal&rdquo;,
                    &rdquo;Safe for pets, children, and lawn health&rdquo;,
                    &rdquo;Especially effective near patios and high-use areas&rdquo;,
                    &rdquo;Can be added to recurring service visits&rdquo;,
                    &rdquo;Recommended for first-time or deep-clean situations&rdquo;
                  ].map((item, i) => (
                    <li key={i} className=&rdquo;flex items-start gap-2 text-sm text-foreground&rdquo;><CheckCircle2 className=&rdquo;w-4 h-4 text-primary flex-shrink-0 mt-0.5&rdquo; />{item}</li>
                  ))}
                </ul>
              </div>
              <div className=&rdquo;bg-card border border-border rounded-2xl p-8 text-center&rdquo;>
                <Droplets className=&rdquo;w-16 h-16 text-primary mx-auto mb-4 opacity-80&rdquo; />
                <h3 className=&rdquo;text-xl font-bold text-foreground mb-3&rdquo;>Ask About Add-On Sanitizing</h3>
                <p className=&rdquo;text-muted-foreground text-sm mb-6&rdquo;>Deodorizing and sanitizing is available as a standalone service or as an add-on to any recurring plan. Mention it when requesting your quote.</p>
                <Button asChild className=&rdquo;w-full rounded-xl font-bold&rdquo;>
                  <Link to=&rdquo;/quote&rdquo;>Request a Quote with Sanitizing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Health and Safety */}
        <section className=&rdquo;py-24 bg-background&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <SectionHeader icon={AlertTriangle} title=&rdquo;Why Pet Waste Is a Health and Safety Issue&rdquo; subtitle=&rdquo;Dog waste is not just unpleasant. It is classified by the EPA as a pollutant &mdash; and it creates real risks for your family.&rdquo; />
            <div className=&rdquo;grid grid-cols-1 md:grid-cols-3 gap-6 mb-12&rdquo;>
              {[
                {
                  title: &rdquo;It carries dangerous pathogens&rdquo;,
                  body: &rdquo;A single gram of dog waste contains up to 23 million fecal coliform bacteria. Dog waste also commonly carries roundworms, hookworms, giardia, E. coli, and salmonella &mdash; many of which can infect humans, especially children who play on the ground.&rdquo;
                },
                {
                  title: &rdquo;It damages your lawn&rdquo;,
                  body: &rdquo;Dog waste is highly acidic and kills grass on contact, creating the brown dead spots you see in yards. Unlike cattle manure, dog waste is not a fertilizer &mdash; it is a toxin that degrades soil health and destroys turf over time.&rdquo;
                },
                {
                  title: &rdquo;It pollutes local waterways&rdquo;,
                  body: &rdquo;Rain washes dog waste from yards into storm drains that flow directly to rivers, lakes, and streams. The EPA lists dog waste alongside herbicides and insecticides as a major nonpoint source of water pollution. In Chattanooga, that means the Tennessee River.&rdquo;
                }
              ].map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className=&rdquo;bg-card border border-border rounded-2xl p-6&rdquo;>
                  <AlertTriangle className=&rdquo;w-8 h-8 text-amber-500 mb-4&rdquo; />
                  <h3 className=&rdquo;text-lg font-bold text-foreground mb-3&rdquo;>{card.title}</h3>
                  <p className=&rdquo;text-muted-foreground text-sm leading-relaxed&rdquo;>{card.body}</p>
                </motion.div>
              ))}
            </div>
            <div className=&rdquo;bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center max-w-3xl mx-auto&rdquo;>
              <h3 className=&rdquo;text-2xl font-bold text-foreground mb-4&rdquo;>The Safest Yard Is a Clean Yard</h3>
              <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>Regular professional pet waste removal eliminates the bacteria, parasite risk, and environmental pollution associated with unmanaged dog waste. It is the single most effective thing you can do to make your yard genuinely safe for your children and pets.</p>
              <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;rounded-xl px-8 font-bold&rdquo;>
                <Link to=&rdquo;/quote&rdquo;>Start Weekly Service Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Lawn and environment benefits */}
        <section className=&rdquo;py-16 bg-primary/5 px-4&rdquo;>
          <div className=&rdquo;max-w-5xl mx-auto&rdquo;>
            <div className=&rdquo;flex justify-center gap-1 mb-6&rdquo;>
              {[...Array(5)].map((_, i) => <Star key={i} className=&rdquo;w-5 h-5 fill-yellow-400 text-yellow-400&rdquo; />)}
            </div>
            <blockquote className=&rdquo;text-xl md:text-2xl font-medium text-foreground text-center italic mb-4 max-w-3xl mx-auto&rdquo;>
              &rdquo;I had dead patches everywhere from years of dog waste. After six months of weekly service the grass is recovering and the kids actually use the yard again.&rdquo;
            </blockquote>
            <p className=&rdquo;text-center text-muted-foreground&rdquo;>&mdash; Ooltewah customer, weekly service since 2024</p>
          </div>
        </section>

        {/* Final CTA */}
        <section className=&rdquo;py-20 px-4 bg-primary text-primary-foreground text-center&rdquo;>
          <div className=&rdquo;max-w-2xl mx-auto&rdquo;>
            <h2 className=&rdquo;text-3xl md:text-4xl font-extrabold mb-4&rdquo;>Ready to Reclaim Your Yard?</h2>
            <p className=&rdquo;text-lg opacity-90 mb-8&rdquo;>Get a free quote in under 2 minutes. We serve all of Chattanooga and surrounding areas including Hixson, Ooltewah, East Brainerd, Signal Mountain, Red Bank, East Ridge, Soddy-Daisy, Ringgold, Fort Oglethorpe, Rossville, and Lookout Mountain.</p>
            <div className=&rdquo;flex flex-col sm:flex-row gap-4 justify-center&rdquo;>
              <Button asChild size=&rdquo;lg&rdquo; variant=&rdquo;secondary&rdquo; className=&rdquo;rounded-xl px-10 h-14 text-base font-bold&rdquo;>
                <Link to=&rdquo;/quote&rdquo;>Get My Free Quote</Link>
              </Button>
              <Button asChild size=&rdquo;lg&rdquo; variant=&rdquo;outline&rdquo; className=&rdquo;rounded-xl px-10 h-14 text-base font-bold border-white/40 text-white hover:bg-white/10&rdquo;>
                <a href=&rdquo;tel:423-600-5040&rdquo;>Call (423) 600-5040</a>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
