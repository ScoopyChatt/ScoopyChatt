import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';

const DogPoopLawsChattanooga = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Is It Illegal to Not Pick Up Dog Poop in Chattanooga?"
        description="Yes, Chattanooga law requires dog owners to pick up after their pets. Here is what City Code Chapter 7 says, the fines you could face, and how to stay compliant."
        canonicalUrl={`${CANONICAL_BASE_URL}/blog/dog-poop-laws-chattanooga`}
      />
      <Header />

      <main className="flex-grow py-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Link>

          <header className="mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Local Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8 leading-tight">
              Is It Illegal to Not Pick Up Dog Poop in Chattanooga? (2026 Guide)
            </h1>
            <div className="flex flex-wrap items-center text-muted-foreground text-base gap-6 border-y border-border py-4">
              <div className="flex items-center font-medium">
                <User className="w-5 h-5 mr-2 text-primary" />
                Scoopy Doo Team
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                July 2026
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
            <p className="text-xl leading-relaxed"><strong>Short answer: yes.</strong> Chattanooga city law requires dog owners to clean up after their pets. Chapter 7 of the Chattanooga City Code (Animals and Fowl) makes it unlawful to allow your animal to create unsanitary conditions, and the city ordinance summary published by McKamey Animal Center states that owners must immediately and properly dispose of pet waste. Ignore it and you can be cited.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">What Chattanooga City Law Actually Says</h2>
            <p>Chattanooga regulates pets under Chapter 7 of the City Code. Two rules matter for dog waste. First, owners are required to pick up and properly dispose of waste their dog leaves behind, which applies any time your dog is off your property: sidewalks, greenways, parks, trails, and other people&apos;s yards. Second, the code prohibits allowing an animal to cause unsanitary conditions, which can apply even on your own property if waste piles up enough to create odor, flies, or runoff that affects neighbors.</p>
            <p>Enforcement in Chattanooga is handled by McKamey Animal Center, which serves as the city&apos;s animal services department. Officers respond to complaints, and repeat problems can escalate from a warning to a citation to a court date.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">What Are the Penalties?</h2>
            <p>In Tennessee, fines for violating a municipal ordinance are generally capped at $50 per violation, but court costs get added on top, which typically pushes the real cost of a citation well past the fine itself. Each day a violation continues can count as a separate offense, so an ignored problem can stack up quickly. And if your dog is also off leash when the waste complaint happens, that is a separate violation with its own consequences, including possible impoundment at McKamey after repeat offenses.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Do You Have to Pick Up Poop in Your Own Yard?</h2>
            <p>Nobody from the city is patrolling backyards with a clipboard. But the unsanitary conditions rule means your own yard is not a legal free-for-all. If accumulated waste creates persistent odor, attracts flies and rodents, or washes into a neighboring yard or storm drain, a neighbor complaint can bring code enforcement to your door. In practice, the yards that generate complaints are the ones that have gone weeks or months without cleanup.</p>
            <p>There is also a practical threshold: one dog produces roughly 250 pounds of waste per year. Skip a month of cleanup with two dogs and you are looking at 40+ pounds sitting in the grass. For what that does to your lawn and your family&apos;s health, see our guide on the <Link to="/blog/health-risks-of-pet-waste" className="text-primary font-medium hover:underline">health risks of pet waste</Link>.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">What About Hamilton County and North Georgia?</h2>
            <p>Outside Chattanooga city limits, the rules vary by jurisdiction but the theme is the same. Hamilton County and the smaller cities around Chattanooga, including East Ridge, Red Bank, Signal Mountain, and Soddy-Daisy, all have animal control or nuisance provisions that cover accumulated pet waste.</p>
            <p>Across the state line, Fort Oglethorpe and Catoosa County regulate animals under Chapter 14 of their respective codes, and Ringgold and Walker County have similar animal control and nuisance ordinances. If you live in North Georgia, the safe assumption is the same as in Tennessee: pick up after your dog in public, and do not let waste accumulate at home. Scoopy Doo services <Link to="/blog/pet-waste-removal-north-georgia" className="text-primary font-medium hover:underline">both sides of the state line</Link> at the same rates.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">HOA and Apartment Rules Are Often Stricter Than City Law</h2>
            <p>If you live in a neighborhood with an HOA or in an apartment community, the city ordinance is your floor, not your ceiling. HOA fines for pet waste violations commonly run $25 to $100 per incident, and many Chattanooga-area apartment communities now use DNA-matching programs that swab every resident dog and match unscooped waste to its owner, with fines charged straight to your account. The largest of those programs, PooPrints, is run by a company based right up the road in Knoxville.</p>
            <p>Property managers dealing with waste problems across common areas have a different option: our <Link to="/blog/commercial-pet-waste-removal-chattanooga" className="text-primary font-medium hover:underline">commercial and HOA service</Link> keeps shared spaces clean on a schedule.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Why These Laws Exist</h2>
            <p>Pet waste ordinances are not about tidiness. The EPA classifies pet waste as a water pollutant in the same category as oil and toxic chemicals. Chattanooga averages more than 50 inches of rain per year, and every storm washes bacteria like E. coli, Salmonella, and Giardia from un-scooped yards into storm drains that empty, untreated, into Chattanooga Creek and the Tennessee River. Waste left on the ground also spreads hookworm and roundworm eggs that stay infectious in soil for years, which is exactly where kids and dogs play.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4">The Easy Way to Stay Legal (and Complaint-Free)</h2>
            <p>Compliance is simple: carry bags on walks, and keep your own yard on a regular cleanup schedule. If scooping is the chore that keeps slipping, that is literally what we do. Scoopy Doo is Chattanooga&apos;s locally owned pooper scooper service. Weekly service starts at $20 per visit for one dog, one-time cleanups start at $85, and we cover greater Chattanooga and North Georgia. We scoop in a grid pattern so nothing gets missed, haul the waste away entirely, and text you a photo of your closed gate when we are done. Curious what it costs for your yard? See our <Link to="/blog/pooper-scooper-cost-chattanooga" className="text-primary font-medium hover:underline">2026 pricing guide</Link>.</p>

            <div className="mt-10 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-lg font-semibold text-foreground mb-2">Never think about dog poop laws again</p>
              <p className="mb-4">Get a fast, free quote and let Scoopy Doo keep your yard clean, legal, and neighbor-approved.</p>
              <Link to="/quote" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                Get a free quote from Scoopy Doo →
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default DogPoopLawsChattanooga;
