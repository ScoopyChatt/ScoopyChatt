import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, CheckCircle2, MapPin } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { Button } from '@/components/ui/button';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';

const MovingToChattanoogaWithADog = () => {
  const faqs = [
    {
      question: "Does Scoopy Doo serve my new neighborhood?",
      answer: "Most likely, yes. We serve Chattanooga neighborhoods including Downtown, North Chattanooga, St. Elmo, Southside, Riverview, Normal Park, Lookout Valley, and Brainerd, plus surrounding communities such as Hixson, Ooltewah, East Brainerd, Red Bank, East Ridge, Signal Mountain, Lookout Mountain, Soddy-Daisy, Collegedale, and Apison. We also serve North Georgia towns including Ringgold, Rossville, Fort Oglethorpe, and Flintstone."
    },
    {
      question: "We just moved in and the yard already has old waste from the previous owners or tenants, can you help?",
      answer: "Yes. A one-time cleanup starting at $85 clears out built-up waste so you are starting fresh, whether that is from a previous pet owner, a vacant rental, or a home that has been empty during your move."
    },
    {
      question: "I am renting, do I need to sign a contract?",
      answer: "No. Scoopy Doo never requires contracts. That matters for new residents and renters especially, since you can start service right when you move in and pause, change, or cancel it later if your lease or plans change."
    },
    {
      question: "I am not sure how often I will need service yet, what should I do?",
      answer: "Start wherever makes sense, whether that is a one-time move-in cleanup or a weekly plan, and adjust from there. Many new residents start with weekly or bi-weekly visits during their first month and switch once they know their yard and their dog's habits."
    },
    {
      question: "Do Chattanooga apartments and HOAs have pet waste rules?",
      answer: "Many apartment communities and HOAs in the Chattanooga area do require residents to pick up after their dogs in shared spaces, and some have designated pet waste stations. Check your lease or HOA documents when you move in, and a regular removal service makes staying on top of those rules easy."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Moving to Chattanooga With a Dog: New Resident Guide | Scoopy Doo"
        description="New to Chattanooga with a dog? Get local tips on neighborhoods, yard care, and pet waste rules, plus how professional dog poop removal makes settling in easier."
        canonicalUrl={`${CANONICAL_BASE_URL}/blog/moving-to-chattanooga-with-a-dog`}
      />
      <Header />

      <main className="flex-grow py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              August 26, 2026
            </span>
            <span className="inline-flex items-center gap-1">
              <User className="h-4 w-4" />
              Scoopy Doo Team
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
            Moving to Chattanooga With a Dog: A New Resident's Yard and Pet Waste Guide
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Between unpacking boxes, changing your address, and finding a new vet, a move to Chattanooga with a dog comes with its own checklist. The yard rarely makes that list until the first week is over and waste has already piled up. Here is what new residents should know about the local area, the climate, and keeping a new yard clean from day one.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Getting to Know Chattanooga's Dog-Friendly Areas
          </h2>
          <p className="text-muted-foreground mb-4">
            Chattanooga spreads across a mix of city neighborhoods and suburban communities, and dog owners land in all of them. Inside the city, popular spots for new residents include Downtown, North Chattanooga, St. Elmo, Southside, Riverview, Normal Park, Lookout Valley, and Brainerd. Just outside the city, Hixson, Ooltewah, East Brainerd, Red Bank, East Ridge, Signal Mountain, Lookout Mountain, Soddy-Daisy, Collegedale, and Apison are common landing spots for families with yards and dogs. Across the state line, Ringgold, Rossville, Fort Oglethorpe, and Flintstone round out North Georgia. Scoopy Doo provides pet waste removal in all of these areas, so wherever your move lands you, a clean yard is one less thing to figure out.
          </p>
          <p className="text-muted-foreground mb-4">
            Part of what draws new residents here in the first place is how outdoor-friendly the area is. The Riverwalk, the trails along Lookout Mountain and Signal Mountain, and dog parks scattered around the city mean your dog will likely spend a lot more time outside than in a lot of other cities. That is a good thing for a new dog owner, but it also means yards see heavier use from day one, and a yard that gets used more needs a cleanup routine sooner rather than later.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
            What Is Different About Yard Care Here
          </h2>
          <p className="text-muted-foreground mb-4">
            If you are coming from a drier or colder climate, Chattanooga's humidity and clay-heavy soil take some adjustment. Waste does not break down as quickly in dense red clay as it does in sandier soil, and warm, humid stretches from spring through early fall make it a stronger source of odor and bacteria if it sits for more than a day or two. Heavy rain is common here as well, and uncollected waste washes into yards, storm drains, and nearby creeks more easily than most new residents expect. Ticks and fleas are also active for a longer stretch of the year in this climate, and pet waste left in the yard is one of the things that draws them in.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
            Pet Waste Rules to Know as a New Resident
          </h2>
          <p className="text-muted-foreground mb-4">
            Many apartment communities and HOAs across Chattanooga and North Georgia require residents to pick up after their dogs, both in shared common areas and in individual yards, and some post signage or provide designated waste stations. Requirements vary by community, so it is worth checking your lease or HOA documents in your first week. If you are moving into a single-family home outside an HOA, keeping the yard clean is still the best way to protect your own lawn and avoid complaints from neighbors while you are still getting to know the area.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            Settling Into Your New Yard
          </h2>
          <p className="text-muted-foreground mb-4">
            Before your dog spends much time outside, walk the yard for anything left behind by a previous pet, tenant, or homeowner, especially near fence lines and under shrubs where waste tends to collect out of sight. Pick a spot for bags and a trash can near the door you use most so cleanup becomes a habit right away rather than something you mean to get to later. If moving week is already full, this is also a reasonable first thing to hand off, since a single cleanup gets the yard to a clean starting point without adding another task to your list.
          </p>
          <p className="text-muted-foreground mb-4">
            It also helps to figure out your yard boundaries early, especially if you moved from a home with a smaller lot or no yard at all. Chattanooga and North Georgia lots vary quite a bit in size and slope, and low spots that collect rain after a storm are also the spots where waste tends to sit longest and smell worst. Spend a few minutes during your first rainy week noting where water pools, and keep that area on your radar for more frequent cleanup.
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-md mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Let Scoopy Doo Handle It While You Settle In
            </h2>
            <p className="text-muted-foreground mb-4">
              We scoop. You relax. Scoopy Doo offers dog waste removal across Chattanooga and North Georgia with flexible scheduling and no contracts, which makes it easy to start service the same week you move in:
            </p>
            <ul className="space-y-2 mb-4 text-muted-foreground">
              <li>Weekly service from $20 per visit (one dog)</li>
              <li>Twice-weekly service from $18 per visit</li>
              <li>Bi-weekly service from $33 per visit</li>
              <li>One-time move-in cleanup from $85</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Every visit includes a gate photo so you know we were there and closed up behind us, plus an on-the-way text before we arrive. No contracts, no long-term commitment, just a clean yard on the schedule you choose, which is ideal while you are still deciding how long you will be in a rental or getting used to a new home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl">
                <a href="tel:4236005040">Call (423) 600-5040</a>
              </Button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MovingToChattanoogaWithADog;
