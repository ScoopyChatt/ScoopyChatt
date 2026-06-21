import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calculator, Calendar, CheckCircle2, ArrowRight, Dog, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';

const TAKEAWAY_FEE = 5;

const FREQUENCIES = [
  { id: 'twice', label: 'Twice a week', sub: 'Maximum freshness', base: 18, extra: 2, perMonth: 8.67 },
  { id: 'weekly', label: 'Weekly', sub: 'Most popular', base: 20, extra: 2, perMonth: 4.33 },
  { id: 'biweekly', label: 'Every other week', sub: 'Budget friendly', base: 33, extra: 3, perMonth: 2.17 },
  { id: 'onetime', label: 'One-time cleanup', sub: 'No commitment', base: 85, extra: 0, perMonth: 0 },
];

const money = (n) => '$' + Math.round(n);
const dogWord = (n) => (n === 1 ? 'dog' : 'dogs');
const dogLabel = (n) => (n === 4 ? '4 or more' : n);

const CostCalculatorPage = () => {
  const [dogs, setDogs] = useState(1);
  const [frequency, setFrequency] = useState('weekly');
  const [takeaway, setTakeaway] = useState(false);

  const f = FREQUENCIES.find((x) => x.id === frequency);
  const isOneTime = frequency === 'onetime';
  const takeawayOn = takeaway && !isOneTime;

  const perVisit = f.base + Math.max(0, dogs - 1) * f.extra + (takeawayOn ? TAKEAWAY_FEE : 0);
  const monthly = isOneTime ? 0 : perVisit * f.perMonth;

  const dogOptions = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Helmet>
        <title>Dog Poop Removal Cost Calculator | Chattanooga TN | Scoopy Doo</title>
        <meta name="description" content="Free dog poop removal cost calculator for Chattanooga TN. Estimate your twice-weekly, weekly, bi-weekly, or one-time pooper scooper service price by number of dogs." />
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
            See what professional pooper scooper service costs in Chattanooga and North Georgia. Pick your dogs and how often you want visits for an instant estimate. No email required.
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
              <div className="grid sm:grid-cols-2 gap-2">
                {FREQUENCIES.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFrequency(opt.id)}
                    className={
                      'p-3 rounded-xl border-2 text-left transition ' +
                      (frequency === opt.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-background hover:border-primary/50')
                    }
                  >
                    <span className="block font-bold">{opt.label}</span>
                    <span className="block text-xs text-muted-foreground">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {!isOneTime && (
              <div>
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">
                  <Truck className="w-4 h-4" /> Optional add-on
                </label>
                <button
                  type="button"
                  onClick={() => setTakeaway((v) => !v)}
                  className={
                    'w-full p-4 rounded-xl border-2 text-left transition flex items-center justify-between ' +
                    (takeaway
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/50')
                  }
                >
                  <span>
                    <span className="block font-bold">Waste takeaway (+$5 per visit)</span>
                    <span className="block text-xs text-muted-foreground">We haul the bagged waste completely off your property instead of leaving it in your bin.</span>
                  </span>
                  {takeaway && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                </button>
              </div>
            )}
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
                  <p className="opacity-90 mb-4">About {money(monthly)} per month for {dogLabel(dogs)} {dogWord(dogs)}, {f.label.toLowerCase()}{takeawayOn ? ', with waste takeaway included' : ''}.</p>
                </>
              )}

              {isOneTime && (
                <>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-5xl font-black">{money(f.base)}</span>
                    <span className="pb-1 text-lg opacity-80">starting</span>
                  </div>
                  <p className="opacity-90 mb-4">A single full-yard cleanup, starting at $85. Final price depends on yard size and how much buildup there is. Great before a party, a move, or starting recurring service.</p>
                </>
              )}

              <Link to="/quoterequest">
                <Button className="w-full bg-background text-foreground hover:bg-background/90 font-bold text-base py-6">
                  Get my exact free quote <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <p className="text-xs opacity-75 mt-3 text-center">No contracts. No cancellation fees. Locally owned.</p>
            </div>

            <div className="mt-4 bg-card border border-border rounded-2xl p-5 text-sm">
              <p className="font-bold mb-1">Every visit includes</p>
              <p className="text-muted-foreground">A full grid-pattern sweep of your yard, double-bagged waste, an on-the-way text, and a gate photo when done. Estimates here are a guide; your exact price is always confirmed free.</p>
            </div>
          </div>
        </div>

        <div className="mt-14 max-w-3xl mx-auto">
          <h2 className="text-2xl font-black mb-4">How much does dog poop removal cost in Chattanooga?</h2>
          <p className="text-muted-foreground mb-4">
            Most Chattanooga households pay between $18 and $36 per visit for recurring pooper scooper service, depending on how often they want visits and how many dogs they have. Scoopy Doo twice-weekly service starts at $18 per visit, weekly service starts at $20 per visit, and every-other-week service starts at $33 per visit, each plus a small charge for every additional dog. Optional waste takeaway, where we haul the bagged waste completely off your property, is $5 per visit. One-time yard cleanups start at $85.
          </p>
          <p className="text-muted-foreground mb-4">
            Every Scoopy Doo visit includes a full grid-pattern sweep of the yard, double-bagged waste, an on-the-way text, and a gate photo when the job is done. There are no contracts and no cancellation fees. Prices in this calculator are estimates; your final quote is confirmed free with no obligation.
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
