import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PawPrint,
  Wrench,
  Wifi,
  Lock,
  Ruler,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Star,
  PartyPopper,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import ReviewsSection from '@/components/ReviewsSection.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { TIERS } from '@/data/doggyDoorTiers.js';


const TIER_ICONS = { good: Wrench, better: Lock, best: Wifi };

const DoggyDoorsPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '' });
  const [honeypot, setHoneypot] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [chosenTier, setChosenTier] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const pricingRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendLead = async (address) => {
    try {
      await apiServerClient.fetch('/lead-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address,
        }),
      });
    } catch (err) {
      // Do not block the on-page experience if the notification email fails -
      // the visitor still sees their pricing either way.
      console.error('Failed to send doggy door lead email:', err);
    }
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (honeypot) {
      // Bot filled the hidden field - drop silently, do not unlock.
      return;
    }
    if (!form.name || !form.email || !form.phone || !form.zip) return;

    setSubmitting(true);
    await sendLead(`ZIP ${form.zip} - Doggy Door Founding Customer interest (pricing viewed)`);
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', { content_name: 'Doggy Door Pricing Unlock' });
    }
    setSubmitting(false);
    setUnlocked(true);
    setTimeout(() => {
      pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleChooseTier = async (tier) => {
    setChosenTier(tier.key);
    setConfirming(true);
    // Fire the lead notification, but never let it block the booking hand-off -
    // the customer must always reach the booking form.
    try {
      await sendLead(
        `ZIP ${form.zip} - Chose ${tier.name} tier ($${tier.price}, ${tier.product}) - Doggy Door Founding Customer`
      );
    } catch (err) {
      console.error('Lead notification failed (continuing to booking):', err);
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: `Doggy Door - ${tier.name}`,
        value: tier.price,
        currency: 'USD',
      });
    }
    setConfirming(false);
    navigate(`/doggy-doors/book?tier=${tier.key}`);
  };

  return (
    <>
      <SEOHead path="/doggy-doors" />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* HERO + LEAD GATE */}
          <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl -z-10" />
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl -z-10" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Copy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="rounded-3xl border border-border shadow-xl overflow-hidden mb-8">
                    <img
                      src="/images/doggy-doors-hero.jpg"
                      alt="Dog using a professionally installed Scoopy Doo Doggy Door with app-controlled smart collar access."
                      width={1376}
                      height={768}
                      loading="eager"
                      className="w-full h-auto block"
                    />
                  </div>

                  <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6 tracking-wide uppercase">
                    <PawPrint className="mr-2 h-4 w-4" />
                    New From Scoopy Doo - Founding Customer Launch
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 text-balance text-foreground" style={{ letterSpacing: '-0.02em' }}>
                    Your Dog Can Let Himself Out.
                  </h1>

                  <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8">
                    Introducing Scoopy Doo Doggy Doors: professionally installed dog doors for
                    Chattanooga and North Georgia homes. No guessing on size, no cutting into your
                    own house, no wondering if it is sealed right. We measure, we install, we test
                    it, and we clean up.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Professionally measured and installed for your dog',
                      'Good, Better, and Best options starting at $399 installed - no quote calls',
                      'You already trust us with your yard - now let us handle the door',
                    ].map((line, i) => (
                      <li key={i} className="flex items-start text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Lead gate form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="bg-card border border-border rounded-3xl shadow-xl p-6 md:p-8"
                >
                  <AnimatePresence mode="wait">
                    {!unlocked ? (
                      <motion.div
                        key="gate"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                          See Your Price
                        </h2>
                        <p className="text-sm text-muted-foreground mb-6">
                          Enter your info below to unlock pricing and your Founding Customer offer.
                        </p>

                        <form onSubmit={handleUnlock} className="space-y-4">
                          {/* Honeypot - hidden from real visitors */}
                          <input
                            type="text"
                            name="company_website"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            className="hidden"
                            tabIndex="-1"
                            autoComplete="off"
                          />

                          <div>
                            <Label htmlFor="dd-name">Name</Label>
                            <Input
                              id="dd-name"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="dd-email">Email</Label>
                            <Input
                              id="dd-email"
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="you@email.com"
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="dd-phone">Phone</Label>
                            <Input
                              id="dd-phone"
                              name="phone"
                              type="tel"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="423-555-0100"
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="dd-zip">Zip Code</Label>
                            <Input
                              id="dd-zip"
                              name="zip"
                              value={form.zip}
                              onChange={handleChange}
                              placeholder="37402"
                              required
                              className="mt-1"
                            />
                          </div>

                          <Button
                            type="submit"
                            size="lg"
                            disabled={submitting}
                            className="w-full font-bold text-base shadow-lg"
                          >
                            {submitting ? 'One Second...' : 'Show Me My Options'}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>

                          <p className="text-xs text-muted-foreground text-center">
                            We will text or email you about your Doggy Door quote. No spam, no obligation.
                          </p>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unlocked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center text-center py-6"
                      >
                        <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold text-foreground mb-2">You are in, {form.name.split(' ')[0]}!</h3>
                        <p className="text-muted-foreground">
                          Scroll down to see your Good, Better, and Best options.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="py-16 bg-muted/40">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Ruler, title: 'We Measure', desc: 'We measure your dog and the door, wall, or glass so the fit is right the first time.' },
                  { icon: Wrench, title: 'We Install', desc: 'Our team installs and weather-seals the door, then tests it before we leave.' },
                  { icon: Sparkles, title: 'We Clean Up', desc: 'We clean up the work area and show you exactly how the new door works.' },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING (revealed after unlock) */}
          <section ref={pricingRef} className="py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {!unlocked ? (
                <div className="text-center max-w-xl mx-auto">
                  <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">Pricing is Locked</h2>
                  <p className="text-muted-foreground">
                    Enter your info above to see your price.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center max-w-2xl mx-auto mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                      Good, Better, Best
                    </h2>
                    <p className="text-muted-foreground">
                      Every option is professionally installed by the Scoopy Doo team, sized and
                      sealed for your home. Pick the one that fits your dog and your budget.
                    </p>
                  </div>

                  {/* Founding customer banner */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto mb-12 bg-primary/10 border-2 border-primary/30 rounded-2xl p-6 flex items-start gap-4"
                  >
                    <PartyPopper className="w-7 h-7 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">
                        Founding Customer Offer - First 20 Installs Only
                      </h3>
                      <p className="text-sm text-foreground/90">
                        You already trust Scoopy Doo with your yard. Book as a Founding Customer and
                        get an extra perk on us. Choose Better and we will bump you up to Best, free.
                        Choose Good or Best and we will add a free 2-year Scoopy Doo installation and
                        electronics protection plan instead.
                      </p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                    {TIERS.map((tier, i) => {
                      const Icon = TIER_ICONS[tier.key];
                      const isChosen = chosenTier === tier.key;
                      return (
                        <motion.div
                          key={tier.key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className={`relative flex flex-col bg-card border rounded-3xl p-6 md:p-8 shadow-sm ${
                            tier.popular ? 'border-2 border-primary shadow-lg md:scale-105' : 'border-border'
                          }`}
                        >
                          {tier.popular && (
                            <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow">
                              Most Popular
                            </div>
                          )}

                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                            <Icon className="w-6 h-6" />
                          </div>

                          <h3 className="text-2xl font-extrabold text-foreground mb-1">{tier.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{tier.tagline}</p>

                          <div className="mb-4">
                            <span className="text-4xl font-extrabold text-foreground">${tier.price}</span>
                            <span className="text-muted-foreground text-sm ml-1">installed</span>
                            {tier.sizeNote && (
                              <p className="text-xs text-muted-foreground mt-1">{tier.sizeNote}</p>
                            )}
                          </div>

                          <p className="text-sm font-semibold text-foreground mb-4">{tier.product}</p>

                          <ul className="space-y-2 mb-8 flex-1">
                            {tier.features.map((f, fi) => (
                              <li key={fi} className="flex items-start text-sm text-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>

                          <Button
                            onClick={() => handleChooseTier(tier)}
                            variant={tier.popular ? 'default' : 'outline'}
                            size="lg"
                            disabled={confirming}
                            className="w-full font-bold"
                          >
                            {isChosen && confirming ? 'Opening booking...' : `Choose ${tier.name}`}
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>

                </>
              )}
            </div>
          </section>

          <ReviewsSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DoggyDoorsPage;
