import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, CalendarCheck, Star, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { Button } from '@/components/ui/button';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Get Your Free Quote',
    desc: 'Fill out our quick online form with your zip code, number of dogs, and yard size. We respond the same day — usually within a few hours. No contracts, no commitments required to get started.',
    detail: 'We serve all of Chattanooga and surrounding areas including Hixson, Ooltewah, East Brainerd, Signal Mountain, Red Bank, Soddy-Daisy, Ringgold, and Cleveland.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'We Schedule Your Service',
    desc: 'Pick a recurring plan — weekly, bi-weekly, or one-time — and we put you on the schedule. You don't need to be home. As long as we have access to your backyard, we take care of the rest.',
    detail: 'We'll send a reminder before each visit. If your gate is locked, just leave us a code or leave it unlocked on service day. We work around your preferences.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'We Scoop Every Inch',
    desc: 'Our technicians walk your entire yard in a systematic grid pattern — no shortcuts, no missed spots. We use sanitized equipment between every yard to prevent cross-contamination.',
    detail: 'All waste is double-bagged and removed from your property entirely. We don't leave bags at the gate. Your yard is left clean, and your trash can stays odor-free.',
  },
  {
    number: '04',
    icon: Star,
    title: 'Enjoy Your Clean Yard',
    desc: 'That's it. Your yard is clean, your family is safe, and you didn't have to do anything. We show up every week like clockwork so you never have to think about it again.',
    detail: 'Most customers tell us the same thing after their first visit: "I can't believe I waited this long." A clean yard changes how you use your outdoor space.',
  },
];

const faqs = [
  { q: 'Do I need to be home during the service?', a: 'No — as long as we have access to your backyard (unlocked gate or a code you provide), you don't need to be there. Most of our customers are at work when we show up.' },
  { q: 'What happens to the waste after you scoop it?', a: 'We double-bag all waste and haul it away from your property entirely. It goes in our disposal system — not your trash can, not left by the gate.' },
  { q: 'Do you service my neighborhood?', a: 'We cover all of Chattanooga and surrounding communities including Hixson, Ooltewah, East Brainerd, Signal Mountain, Red Bank, Soddy-Daisy, Ringgold, Cleveland, Highland Park, Apison, Collegedale, and more.' },
  { q: 'What if it rains on my service day?', a: 'We scoop in the rain. Weather doesn't cancel your service — we show up regardless. In fact, rainy days are when cleanup matters most, since runoff carries bacteria across your lawn.' },
  { q: 'How much does it cost?', a: 'Our pricing is based on dog count and service frequency. Weekly service for one dog starts at $20/visit. The fastest way to get exact pricing is to request a free quote — we respond the same day.' },
  { q: 'Is there a contract?', a: 'No contracts, ever. You can pause, change, or cancel your service at any time. We keep customers by doing a great job, not by locking them in.' },
  { q: 'Do you sanitize your equipment between yards?', a: 'Yes, always. We sanitize all scooping tools between every yard to prevent cross-contamination of bacteria and parasites. This is a standard part of our process, not an add-on.' },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors">
        <span className="font-semibold text-foreground pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
};

const HowItWorksPage = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEOHead
      title="How It Works | Scoopy Doo Pet Waste Removal Chattanooga"
      description="See how Scoopy Doo's dog waste removal service works — get a free quote, we schedule your service, scoop every inch, and you enjoy a clean yard. No contracts."
      canonicalUrl={`${CANONICAL_BASE_URL}/how-it-works`}
    />
    <Header />
    <main className="flex-grow">

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-6">Simple Process</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">How Scoopy Doo Works</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Four simple steps to a cleaner yard — and you barely have to lift a finger. No contracts, no hassle, no poop.</p>
          <Button asChild size="lg" className="rounded-xl px-8 h-14 text-base font-bold">
            <Link to="/quote">Get Your Free Quote →</Link>
          </Button>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-6 bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 md:w-2/3">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary/60 tracking-widest uppercase mb-1">Step {step.number}</div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">{step.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
              <div className="md:w-1/3 bg-primary/5 rounded-xl p-5 flex items-center">
                <p className="text-sm text-foreground/80 leading-relaxed italic">"{step.detail}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-16 bg-primary/5 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: '100%', label: 'Grid-pattern coverage' },
            { stat: 'Same day', label: 'Quote response' },
            { stat: 'No contracts', label: 'Ever — cancel anytime' },
            { stat: 'Year-round', label: 'Rain or shine service' },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-extrabold text-primary mb-1">{item.stat}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary/5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">Get a free quote in under 2 minutes. We serve all of Chattanooga and surrounding areas.</p>
          <Button asChild size="lg" className="rounded-xl px-10 h-14 text-base font-bold">
            <Link to="/quote">Get My Free Quote →</Link>
          </Button>
        </div>
      </section>

    </main>
    <Footer />
  </div>
);

export default HowItWorksPage;
