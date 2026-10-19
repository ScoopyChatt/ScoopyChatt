
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from '@/components/motion.jsx';
import { CheckCircle2, Phone, Mail, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { GuaranteeBadge } from '@/components/Guarantee.jsx';

const ThankYouPage = () => {
  // QuoteForm and the doggy door booking form pass a short recap of what was booked.
  const { state } = useLocation();
  const recap = state && Array.isArray(state.recap) ? state.recap : null;
  const isDoggyDoor = state && state.kind === 'doggy-door';

  return (
    <>
      <SEOHead path="/thank-you" noindex={true} />

      <div className="min-h-screen flex flex-col">
        <Header />

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
                What happens next: we will text you at the number you gave us to confirm your
                {isDoggyDoor ? ' install date' : ' first visit date'}.
              </p>
              <p className="text-muted-foreground mb-6">
                Nothing is charged today. Questions in the meantime? Call or text (423) 600-5040.
              </p>
              <div className="mb-12">
                <GuaranteeBadge />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-2xl">
                  <Phone className="w-6 h-6 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                  <a href="tel:423-600-5040" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    423-600-5040
                  </a>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-2xl">
                  <Mail className="w-6 h-6 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <a href="mailto:info@scoopychatt.com" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    info@scoopychatt.com
                  </a>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-2xl">
                  <Clock className="w-6 h-6 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                  <span className="text-muted-foreground">
                    Mon-Fri 7am-8pm, Sat-Sun 9am-9pm
                  </span>
                </div>
              </div>

              <Button asChild size="lg" variant="outline" className="transition-all duration-200 active:scale-[0.98] h-14 px-8 rounded-xl">
                <Link to="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Return to Home
                </Link>
              </Button>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ThankYouPage;
