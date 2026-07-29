import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, CheckCircle2, Leaf } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { Button } from '@/components/ui/button';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';

const FallYardCareChecklistChattanooga = () => {
  const faqs = [
    {
      question: "How often should I clean up dog waste in the fall?",
      answer: "Once leaves start falling, we recommend checking your yard at least once a week, and twice a week if you have more than one dog. Fallen leaves hide waste, so it gets stepped on, tracked inside, and mowed into the yard more easily than in other seasons."
    },
    {
      question: "Will Scoopy Doo clean around fallen leaves?",
      answer: "Yes. Our technicians work around leaf cover on every visit. If leaf piles are especially heavy, we recommend a bi-weekly or weekly visit so waste does not get buried and missed."
    },
    {
      question: "Do I need to sign a contract for fall cleanup?",
      answer: "No. Scoopy Doo does not require contracts for any service, including seasonal or one-time fall cleanups. You can start, pause, or stop service whenever you need to."
    },
    {
      question: "Do you serve neighborhoods outside Chattanooga?",
      answer: "Yes. In addition to Chattanooga, we serve surrounding communities such as Collegedale, Cleveland, Signal Mountain, and Soddy-Daisy in Tennessee, plus North Georgia towns including Ringgold and Flintstone."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Fall Yard Care Checklist for Chattanooga Dog Owners"
        description="A fall pet waste and yard care checklist for Chattanooga dog owners. Learn why leaf season makes cleanup harder and how professional dog poop removal helps."
        canonicalUrl={`${CANONICAL_BASE_URL}/blog/fall-yard-care-checklist-chattanooga`}
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
              July 29, 2026
            </span>
            <span className="inline-flex items-center gap-1">
              <User className="h-4 w-4" />
              Scoopy Doo Team
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
            Fall Yard Care Checklist for Chattanooga Dog Owners
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            As temperatures drop across Chattanooga and North Georgia, yards change fast. Leaves pile up, dogs spend more time outside chasing them, and lawns get their last real chance to recover before winter. Pet waste does not slow down just because the season changed, and fall actually makes it harder to keep on top of. Here is what Chattanooga dog owners should watch for this season, and how to handle it.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            Why Fall Is a Tricky Season for Pet Waste
          </h2>
          <p className="text-muted-foreground mb-4">
            Once leaves start dropping in October and November, they cover the ground quickly, and waste hides underneath them. That means it gets stepped on, tracked into the house, or run over by a mower before anyone notices it. Rain is also more frequent in fall around Chattanooga, and uncollected waste that washes into storm drains or nearby creeks contributes to bacteria and runoff issues in local waterways. Cooler weather also means more foot traffic in the yard, from raking leaves to hosting football tailgates and outdoor gatherings, so a yard that is not clean gets noticed by more people, more often.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
            The Fall Yard Care Checklist
          </h2>
          <ul className="space-y-3 mb-6">
            {[
              "Walk and clear the yard before you rake. Raking waste into a leaf pile makes it far worse to deal with later.",
              "Increase pickup frequency as leaf cover builds. A once-a-week check in September may need to become twice a week by late October.",
              "Clear waste before mowing your final cuts of the season. A mower blade spreading waste across the lawn creates a bigger cleanup and can damage grass.",
              "If you are aerating or overseeding for a healthier spring lawn, clear the yard first. Waste left on the ground blocks seed-to-soil contact and can burn new grass.",
              "Check problem corners, like fence lines and under trees, where leaves and waste both tend to collect.",
              "Plan ahead for guests. If you host tailgates or fall gatherings, schedule a cleanup a day or two before, not the morning of."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
            How Often Should You Scoop in the Fall?
          </h2>
          <p className="text-muted-foreground mb-6">
            For most Chattanooga yards, weekly service is the minimum during fall, and twice-weekly is worth considering if you have more than one dog or heavy leaf cover. Waiting longer than a week lets waste build up under leaves, which makes it harder to find and worse for your lawn once it is finally cleared.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
            Do Not Forget Fall Pests
          </h2>
          <p className="text-muted-foreground mb-6">
            Cooler weather does not mean pests disappear in Tennessee and North Georgia. Ticks and fleas typically stay active until the first hard frost, and tall grass, leaf piles, and neglected corners of a yard give them places to hide. Dog waste left in the yard adds another reason for flies and other pests to stick around longer than they should. Keeping the yard clear through fall is a simple way to make outdoor time safer for both dogs and the people who use the yard.
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-md mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Let Scoopy Doo Handle It This Season
            </h2>
            <p className="text-muted-foreground mb-4">
              We scoop. You relax. Scoopy Doo offers dog waste removal across Chattanooga and North Georgia with flexible scheduling and no contracts:
            </p>
            <ul className="space-y-2 mb-4 text-muted-foreground">
              <li>Weekly service from $20 per visit (one dog)</li>
              <li>Twice-weekly service from $18 per visit</li>
              <li>Bi-weekly service from $33 per visit</li>
              <li>One-time fall cleanup from $85</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Every visit includes a gate photo so you know we were there and closed up behind us, plus an on-the-way text before we arrive. No contracts, no long-term commitment, just a clean yard on the schedule you choose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl">
                <a href="tel:423-600-5040">Call (423) 600-5040</a>
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

export default FallYardCareChecklistChattanooga;
