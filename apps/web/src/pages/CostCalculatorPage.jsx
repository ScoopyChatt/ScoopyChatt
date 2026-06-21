import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calculator, Calendar, Sparkles, CheckCircle2, ArrowRight, Dog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';

const VISITS_PER_MONTH = { weekly: 4.33, biweekly: 2.17 };
const EXTRA_DOG_FEE = 4;
const CONDITION_FEE = { maintained: 0, moderate: 25, heavy: 50 };
const ONE_TIME_PRICE = { maintained: 75, moderate: 95, heavy: 120 };

const FREQUENCIES = [
  { id: 'weekly', label: 'Weekly', sub: 'Most popular' },
  { id: 'biweekly', label: 'Every other week', sub: 'Budget friendly' },
  { id: 'onetime', label: 'One-time cleanup', sub: 'No commitment' },
];

const CONDITIONS = [
  { id: 'maintained', label: 'Well maintained', sub: 'Cleaned within the last few weeks' },
  { id: 'moderate', label: 'Some buildup', sub: '1 to 3 months since last cleanup' },
  { id: 'heavy', label: 'Heavy buildup', sub: '4 plus months or never scooped' },
];

const money = (n) => '$' + Math.round(n);

const CostCalculatorPage = () => {
  const [dogs, setDogs] = useState(1);
  const [frequency, setFrequency] = useState('weekly');
  const [condition, setCondition] = useState('maintained');

  const isOneTime = frequency === 'onetime';
  const baseVisit = frequency === 'weekly' ? 16 : frequency === 'biweekly' ? 20 : 0;
  const perVisit = baseVisit + Math.max(0, dogs - 1) * EXTRA_DOG_FEE;
  const monthly = isOneTime ? 0 : perVisit * VISITS_PER_MONTH[frequency];
  const firstVisitFee = isOneTime ? 0 : CONDITION_FEE[condition];
  const oneTimeTotal = ONE_TIME_PRICE[condition] + Math.max(0, dogs - 1) * EXTRA_DOG_FEE;

  const dogOptions = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Helmet>
        <title>Dog Poop Removal Cost Calculator | Chattanooga TN | Scoopy Doo</title>
        <meta name="description" content="Free dog poop removal cost calculator for Chattanooga TN. Estimate your weekly, bi-weekly, or one-time pooper scooper service price by number of dogs and yard condition." />
        <link rel="canonical" href={getCanonicalUrl('/cost-calculator')} />
      </Helmet>

      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            Free instant estimate
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Dog Poop Removal Cost Calculator for Chattanooga, TN
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what professional pooper scooper service costs in Chattanooga and North Georgia. Pick your dogs, how often you want visits, and your yard condition for an instant estimate. No email required.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 space-y-8 bg-card border border-border rounded-2xl p-6 md:p-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">
                <Dog className="w-4 h-4" /> How many dogs?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {dogOptions.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setDogs(n)}
                    className={
                      'py-3 rounded-xl border-2 font-bold transition ' +
                      (dogs === n
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background hover:border-primary/50')
                    }
                  >
                    {n === 4 ? '4+' : n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" /> How often?
              </label>
              <div className="grid sm:grid-cols-3 gap-2">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFrequency(f.id)}
                    className={
                      'p-3 rounded-xl border-2 text-left transition ' +
                      (frequency === f.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-background hover:border-primary/50')
                    }
                  >
                    <span className="block font-bold">{f.label}</span>
                    <span className="block text-xs text-muted-foreground">{f.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">
                <Sparkles className="w-4 h-4" /> Yard condition right now
              </label>
              <div className="space-y-2">
                {CONDITIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCondition(c.id)}
                    className={
                      'w-full p-3 rounded-xl border-2 text-left transition flex items-center justify-between ' +
                      (condition === c.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-background hover:border-primary/50')
                    }
                  >
                    <span>
                      <span className="block font-bold">{c.label}</span>
                      <span className="block text-xs text-muted-foreground">{c.sub}</span>
                    </span>
                    {condition === c.id && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-wide opacity-80 mb-1">Your estimate</p>

              {!isOneTime && (
                <>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-5xl font-black">{money(perVisit)}</span>
                    <span className="pb-1 text-lg opacity-80">/ visit</span>
                  </div>
                  <p className="opacity-90 mb-4">About {money(monthly)} per month for {dogs === 4 ? '4 or more' : dogs} {dogs === 1 ? 'dog' : 'dogs'}, {frequency === 'weekly' ? 'weekly' : 'every other week'}.</p>
                  {firstVisitFee > 0 && (
                    <p className="text-sm bg-white/15 rounded-lg px-3 py-2 mb-4">
                      Plus a one-time first cleanup of about {money(firstVisitFee)} to get a {condition === 'heavy' ? 'heavily overgrown' : 'backed-up'} yard reset.
                    </p>
                  )}
                </>
              )}

              {isOneTime && (
                <>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-5xl font-black">{money(oneTimeTotal)}</span>
                    <span className="pb-1 text-lg opacity-80">one time</span>
                  </div>
                  <p className="opacity-90 mb-4">A single full-yard cleanup for {dogs === 4 ? '4 or more' : dogs} {dogs === 1 ? 'dog' : 'dogs'}. Great before a party, a move, or starting recurring service.</p>
                </>
              )}

              <Link to="/quoterequest">
                <Button className="w-full bg-background text-foreground hover:bg-background/90 font-bold text-base py-6">
                  Get my exact free quote <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <p className="text-xs opacity-75 mt-3 text-center">No contracts. No cancellation fees. Locally owned.</p>
            </div>

            {!isOneTime && (
              <div className="mt-4 bg-card border border-border rounded-2xl p-5 text-sm">
                <p className="font-bold mb-1">How Scoopy Doo compares</p>
                <p className="text-muted-foreground">National pooper scooper service averages roughly $86 to $95 per month. Weekly Scoopy Doo service starts around {money(16 * VISITS_PER_MONTH.weekly)} per month for one dog, with waste hauled completely off your property.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 max-w-3xl mx-auto">
          <h2 className="text-2xl font-black mb-4">How much does dog poop removal cost in Chattanooga?</h2>
          <p className="text-muted-foreground mb-4">
            Most Chattanooga households pay between $16 and $28 per visit for recurring pooper scooper service, depending on the number of dogs and how often the yard is cleaned. Scoopy Doo weekly service starts at $16 per visit for one dog and every-other-week service starts at $20 per visit. One-time yard cleanups start at $75 and rise with the amount of buildup. Prices in this calculator are estimates; your final quote is confirmed free with no obligation.
          </p>
          <p className="text-muted-foreground mb-4">
            Every Scoopy Doo visit includes a full grid-pattern sweep of the yard, double-bagged waste hauled completely off the property, an on-the-way text, and a gate photo when the job is done. There are no contracts and no cancellation fees.
          </p>
          <div className="bg-muted rounded-2xl p-6 text-center">
            <p className="font-bold text-lg mb-3">Ready for an exact price for your yard?</p>
            <Link to="/quoterequest">
              <Button className="bg-primary text-primary-foreground font-bold px-8 py-6 text-base">
                Request a free quote <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default CostCalculatorPage;
