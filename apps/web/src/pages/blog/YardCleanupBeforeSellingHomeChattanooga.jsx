import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, CheckCircle2, Home } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { Button } from '@/components/ui/button';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';

const YardCleanupBeforeSellingHomeChattanooga = () => {
const faqs = [
{
question: "Do I really need to clean up dog waste before showings?",
answer: "Yes. Buyers and their agents notice yard odor and waste immediately, often before they even walk in the front door. A dirty yard can make a buyer question how well the rest of the home was maintained, even if the inside is spotless."
},
{
question: "How far in advance should I book a pre-listing cleanup?",
answer: "Most Scoopy Doo customers can start within 2 to 5 days of requesting a quote, so booking about a week before your first showings or listing photos gives enough buffer. If your yard has not been cleaned in a while, plan for a one-time deep cleanup first."
},
{
question: "Should I switch to recurring service while my home is listed?",
answer: "Many sellers do. Homes can sit on the market for weeks, and a single cleanup will not stay clean if dogs are still using the yard. Weekly or twice-weekly service keeps the yard photo-ready and showing-ready for as long as your home is listed."
},
{
question: "Does Scoopy Doo work with real estate agents and stagers?",
answer: "Yes. We regularly coordinate cleanup timing around listing photos and showings for Chattanooga homeowners and their agents. There are no contracts, so you can book exactly the visits you need and stop once the home sells."
}
];

return (
<div className="flex flex-col min-h-screen">
<SEOHead
title="Do You Need to Clean Up Dog Waste Before Selling Your Chattanooga Home?"
description="Selling a home in Chattanooga? Here is why yard cleanup and pet waste removal matter before listing photos and showings, plus a pre-listing checklist and pricing."
canonicalUrl={`${CANONICAL_BASE_URL}/blog/yard-cleanup-before-selling-home-chattanooga`}
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
August 19, 2026
</span>
<span className="inline-flex items-center gap-1">
<User className="h-4 w-4" />
Scoopy Doo Team
</span>
</div>

<h1 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
Do You Need to Clean Up Dog Waste Before Selling Your Chattanooga Home?
</h1>

<p className="text-lg text-muted-foreground mb-6">
If you are listing a home in Chattanooga or North Georgia and you have a dog, the yard is doing more work than you think. Buyers walk the yard before they ever knock on the door, agents take listing photos outside first, and a single missed pile of waste can undercut an otherwise great showing. Here is why pre-listing yard cleanup matters, what to check before your first showing, and how professional pet waste removal fits into the selling timeline.
</p>

<h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground flex items-center gap-2">
<Home className="h-6 w-6 text-primary" />
Why Pet Waste Matters When You Are Selling
</h2>
<p className="text-muted-foreground mb-4">
Curb appeal starts outside, and so does the buyer walkthrough. Real estate photographers and agents typically shoot the exterior and backyard first, which means any waste, dead grass patches, or odor gets documented before the home is even on the market. Dog waste left in a yard for weeks can also kill or yellow grass, so a yard that looks fine on Monday can show brown patches by the time photos are scheduled. In Chattanooga's heat and humidity, odor from uncollected waste builds faster than most sellers expect, and that is one of the first things a buyer notices walking through a side gate or backyard.
</p>

<h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
What Buyers and Agents Actually Notice
</h2>
<p className="text-muted-foreground mb-6">
Listing photos are permanent. Once professional photos are taken, that yard is what every online buyer sees until the home sells, whether it was cleaned that morning or not. Open houses and showings add a second layer: buyers and their agents walk the fence line, check the yard for pets or kids, and a bad smell or visible waste during a showing is hard to recover from in the same visit. It also raises a question sellers do not want buyers asking: what else around the property has been neglected.
</p>

<h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
Pre-Listing Yard Checklist
</h2>
<ul className="space-y-3 mb-6">
{[
"Book a full yard cleanup before your listing photos are scheduled, not the same morning.",
"Check fence lines, under decks, and behind sheds, the spots waste tends to collect and get missed.",
"If the yard has not been cleaned in a while, start with a one-time deep cleanup rather than a single quick pass.",
"Plan for ongoing service if your home will be listed for more than a week or two, since a one-time visit will not stay clean if dogs are still using the yard.",
"Address any dead or yellow grass patches early. Grass damaged by waste can take time to recover before photos.",
"Time a cleanup 1 to 2 days before any scheduled showing or open house."
].map((item, i) => (
<li key={i} className="flex items-start gap-3">
<CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
<span className="text-muted-foreground">{item}</span>
</li>
))}
</ul>

<h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
When to Schedule Cleanup Around Your Listing
</h2>
<p className="text-muted-foreground mb-6">
Most Scoopy Doo customers can start service within 2 to 5 days of requesting a quote, so it is worth booking as soon as you know your listing date. If your home will be on the market for a few weeks, a single cleanup is rarely enough. Weekly or twice-weekly service through the listing period keeps the yard consistently ready for last-minute showings, which real estate agents in Chattanooga often schedule with only a day or two of notice.
</p>

<h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
After the Sale: Handing Off a Clean Yard
</h2>
<p className="text-muted-foreground mb-6">
A clean yard at closing is a small thing that leaves a good last impression, especially if the buyers are inheriting your dog's old stomping grounds. Scheduling a final cleanup right before closing or your last walkthrough is an easy way to hand the property off looking its best, without adding it to your own moving checklist.
</p>

<div className="bg-card border border-border rounded-2xl p-6 shadow-md mb-10">
<h2 className="text-2xl font-semibold mb-4 text-foreground">
Let Scoopy Doo Handle It Before Your Listing Goes Live
</h2>
<p className="text-muted-foreground mb-4">
We scoop. You relax. Scoopy Doo offers dog waste removal across Chattanooga and North Georgia with flexible scheduling and no contracts:
</p>
<ul className="space-y-2 mb-4 text-muted-foreground">
<li>Weekly service from $20 per visit (one dog)</li>
<li>Twice-weekly service from $18 per visit</li>
<li>Bi-weekly service from $33 per visit</li>
<li>One-time pre-listing cleanup from $85</li>
</ul>
<p className="text-muted-foreground mb-6">
Every visit includes a gate photo so you know we were there and closed up behind us, plus an on-the-way text before we arrive. No contracts, no long-term commitment, so you can book exactly what your listing timeline needs and stop once the home sells.
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

export default YardCleanupBeforeSellingHomeChattanooga;
