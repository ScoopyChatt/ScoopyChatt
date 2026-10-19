
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from '@/components/motion.jsx';
import { CheckCircle2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';

const ThankYouPage = () => {
  // QuoteForm and the doggy door booking form pass a short recap of what was booked.
  const { state } = useLocation();
  const recap = state && Array.isArray(state.recap) ? state.recap : null;
  const isDoggyDoor = state && state.kind === 'doggy-door';

  // Conversion event for GTM / Google Ads / Meta. Only fires when a form actually sent
  // the person here (a refresh or a typed URL has no recap), so leads aren't double-counted.
  useEffect(() => {
    if (!recap || typeof window === 'undefined') return;
    const value = Number(state.value) || 0;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', lead_type: isDoggyDoor ? 'doggy_door' : 'quote', value, currency: 'USD' });
    if (window.fbq) window.fbq('track', 'Lead', { content_name: isDoggyDoor ? 'Doggy Door Booking' : 'Quote Start Date Request', value, currency: 'USD' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SEOHead path="/thank-you" noindex={true} />

      <div className="min-h-screen flex flex-col">
        {/* Stripped-down header: no site nav or quote button right after someone got a price. */}
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2">
            <Link to="/" aria-label="Scoopy Doo home">
              <img src="/scoopy-logo.webp" alt="Scoopy Doo pet waste removal logo" width="400" height="373" className="h-12 w-auto" />
            </Link>
            <a href="tel:423-600-5040" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-bold text-background">
              <Phone className="h-4 w-4" />
              423-600-5040
            </a>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl shadow-xl p-8 md:p-12 text-center border border-border/50"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance tracking-tight">
                {isDoggyDoor ? 'Your Install Request Is In' : 'Your Start Date Request Is In'}
              </h1>

              {recap && (
                <dl className="max-w-md mx-auto mb-6 text-left rounded-2xl border border-border/60 divide-y divide-border/60">
                  {recap.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 px-5 py-3">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium text-foreground text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <p className="text-lg font-medium text-foreground mb-2">
                What happens next: we will text you within 2 business hours to confirm your
                {isDoggyDoor ? ' install date' : ' first visit date'}.
              </p>
              <p className="text-muted-foreground mb-6">
                Nothing is charged today.
                {isDoggyDoor ? '' : ' Your first 4 weeks are billed once we confirm your first visit date, then every 4 weeks after that.'}
              </p>

              <Button asChild size="lg" className="h-auto min-h-14 w-full sm:w-auto whitespace-normal px-6 py-4 rounded-xl font-bold">
                <a href="sms:+14236005040" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Questions? Call or text (423) 600-5040
                </a>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                We reply Mon-Fri 7am-8pm and Sat-Sun 9am-9pm. <Link to="/" className="underline hover:text-foreground">Back to the home page</Link>
              </p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ThankYouPage;
