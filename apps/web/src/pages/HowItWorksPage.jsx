import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { ClipboardList, CalendarCheck, MessageSquare, Camera, CreditCard, ShieldCheck, ChevronDown, ChevronUp, Star } from &rsquo;lucide-react&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { CANONICAL_BASE_URL } from &rsquo;@/config/seoConfig.js&rsquo;;

const steps = [
  {
    number: &rsquo;01&rsquo;,
    icon: ClipboardList,
    title: &rsquo;Get a Free Quote Online&rsquo;,
    desc: &rdquo;No phone calls, no waiting on hold. Fill out our quick form with your zip code, number of dogs, and yard size and we send back your price, usually within a few hours.&rdquo;,
    highlight: &rdquo;100% online &mdash; quote, schedule, and pay without picking up the phone.&rdquo;,
    color: &rsquo;bg-blue-500/10 text-blue-600&rsquo;,
  },
  {
    number: &rsquo;02&rsquo;,
    icon: CreditCard,
    title: &rsquo;Pick a Plan & Pay Online&rsquo;,
    desc: &rdquo;Choose weekly, bi-weekly, or one-time service. Pay securely online &mdash; no checks, no cash at the door. We send your confirmation and put you on the schedule.&rdquo;,
    highlight: &rdquo;Secure online payment. No contracts. Cancel anytime.&rdquo;,
    color: &rsquo;bg-green-500/10 text-green-600&rsquo;,
  },
  {
    number: &rsquo;03&rsquo;,
    icon: MessageSquare,
    title: &rsquo;We Text You On the Way&rsquo;,
    desc: &rdquo;Before every visit, you get a text letting you know we are heading to your yard. No surprise visits, no wondering if we showed up. You are always in the loop.&rdquo;,
    highlight: &rdquo;Heads-up text before every single visit so you are never caught off guard.&rdquo;,
    color: &rsquo;bg-purple-500/10 text-purple-600&rsquo;,
  },
  {
    number: &rsquo;04&rsquo;,
    icon: ShieldCheck,
    title: &rsquo;We Scoop Every Inch&rsquo;,
    desc: &rdquo;Our techs walk your entire yard in a systematic grid &mdash; no shortcuts, no missed spots. All waste is double-bagged and hauled away from your property.&rdquo;,
    highlight: &rdquo;Full yard coverage. Waste removed from property. Equipment sanitized between every yard.&rdquo;,
    color: &rsquo;bg-amber-500/10 text-amber-600&rsquo;,
  },
  {
    number: &rsquo;05&rsquo;,
    icon: Camera,
    title: &rsquo;Gate Photo Sent When Done&rsquo;,
    desc: &rdquo;When we finish, we close and secure your gate and send you a photo as proof. You know your yard is clean and your gate is locked without having to check yourself.&rdquo;,
    highlight: &rdquo;Photo confirmation of your secured gate sent straight to your phone after every visit.&rdquo;,
    color: &rsquo;bg-rose-500/10 text-rose-600&rsquo;,
  },
];

const perks = [
  { icon: &rsquo;💻&rsquo;, label: &rsquo;Online Quotes&rsquo;, desc: &rsquo;Fast pricing with no phone tag&rsquo; },
  { icon: &rsquo;💳&rsquo;, label: &rsquo;Online Payment&rsquo;, desc: &rsquo;Secure, no contracts, cancel anytime&rsquo; },
  { icon: &rsquo;📱&rsquo;, label: &rsquo;On the Way Texts&rsquo;, desc: &rsquo;Heads-up before every single visit&rsquo; },
  { icon: &rsquo;📸&rsquo;, label: &rsquo;Gate Photo Proof&rsquo;, desc: &rsquo;Photo of your secured gate when done&rsquo; },
  { icon: &rsquo;🧹&rsquo;, label: &rsquo;Full Yard Coverage&rsquo;, desc: &rsquo;Grid-pattern &mdash; zero missed spots&rsquo; },
  { icon: &rsquo;🗑️&rsquo;, label: &rsquo;Waste Removed&rsquo;, desc: &rsquo;Hauled away, not left by the gate&rsquo; },
];

const faqs = [
  { q: &rsquo;Do I need to be home during the service?&rsquo;, a: &rdquo;No. We just need access to your backyard &mdash; an unlocked gate or a code you provide. Most customers are at work when we show up. You get an on-the-way text before we arrive and a gate photo when we are done.&rdquo; },
  { q: &rsquo;How does the gate photo work?&rsquo;, a: &rdquo;After every visit, our tech closes and latches your gate, then snaps a photo and texts it to you. It is your confirmation that the job is done and your yard is secure.&rdquo; },
  { q: &rsquo;When do I get the on-the-way text?&rsquo;, a: &rdquo;We send it when we are en route to your address, so you have a few minutes notice. It lets you know we are coming without you having to guess which day or time.&rdquo; },
  { q: &rsquo;Can I pay online?&rsquo;, a: &rdquo;Yes &mdash; everything is handled online. You request a quote, receive pricing by email, and pay securely online before service begins. No checks, no cash, no awkward in-person payment.&rdquo; },
  { q: &rsquo;Is there a contract?&rsquo;, a: &rdquo;No contracts, ever. You can pause, change, or cancel your service at any time.&rdquo; },
  { q: &rsquo;What if it rains on my service day?&rsquo;, a: &rdquo;We show up rain or shine. Weather does not cancel your service &mdash; rainy days are actually when cleanup matters most, since runoff carries bacteria across your lawn.&rdquo; },
  { q: &rsquo;Do you service my neighborhood?&rsquo;, a: &rdquo;We cover all of Chattanooga and surrounding areas: Hixson, Ooltewah, East Brainerd, Signal Mountain, Red Bank, Soddy-Daisy, Ringgold, Cleveland, Highland Park, Apison, Collegedale, Fort Oglethorpe, Rossville, and more.&rdquo; },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className=&rdquo;border border-border rounded-xl overflow-hidden&rdquo;>
      <button onClick={() => setOpen(!open)} className=&rdquo;w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors&rdquo;>
        <span className=&rdquo;font-semibold text-foreground pr-4&rdquo;>{q}</span>
        {open ? <ChevronUp className=&rdquo;w-5 h-5 text-primary flex-shrink-0&rdquo; /> : <ChevronDown className=&rdquo;w-5 h-5 text-muted-foreground flex-shrink-0&rdquo; />}
      </button>
      {open && <div className=&rdquo;px-5 pb-5 text-muted-foreground leading-relaxed&rdquo;>{a}</div>}
    </div>
  );
};

const HowItWorksPage = () => (
  <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
    <SEOHead
      title=&rdquo;How It Works | Scoopy Doo Pet Waste Removal Chattanooga&rdquo;
      description=&rdquo;Easy online quotes, secure online payment, on-the-way texts, and gate photo proof after every visit. Working with Scoopy Doo is simple.&rdquo;
      canonicalUrl={CANONICAL_BASE_URL + &rsquo;/how-it-works&rsquo;}
    />
    <Header />
    <main className=&rdquo;flex-grow&rdquo;>

      <section className=&rdquo;py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background text-center&rdquo;>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=&rdquo;max-w-3xl mx-auto&rdquo;>
          <span className=&rdquo;inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-6&rdquo;>Ridiculously Easy</span>
          <h1 className=&rdquo;text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight&rdquo;>Working With Us Is Simple</h1>
          <p className=&rdquo;text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto&rdquo;>Online quotes. Online payment. A text before we arrive. A photo of your secured gate when we leave. You do not have to do anything except enjoy your yard.</p>
          <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;rounded-xl px-8 h-14 text-base font-bold&rdquo;>
            <Link to=&rdquo;/quote&rdquo;>Get Your Free Quote</Link>
          </Button>
        </motion.div>
      </section>

      <section className=&rdquo;py-12 px-4 bg-card border-y border-border&rdquo;>
        <div className=&rdquo;max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center&rdquo;>
          {perks.map((p, i) => (
            <div key={i} className=&rdquo;flex flex-col items-center gap-2&rdquo;>
              <span className=&rdquo;text-3xl&rdquo;>{p.icon}</span>
              <div className=&rdquo;font-bold text-sm text-foreground&rdquo;>{p.label}</div>
              <div className=&rdquo;text-xs text-muted-foreground&rdquo;>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className=&rdquo;py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto&rdquo;>
        <h2 className=&rdquo;text-3xl font-bold text-foreground text-center mb-14&rdquo;>From Quote to Clean Yard in 5 Steps</h2>
        <div className=&rdquo;space-y-6&rdquo;>
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className=&rdquo;flex gap-6 bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow&rdquo;>
              <div className=&rdquo;flex-shrink-0 z-10&rdquo;>
                <div className={&rsquo;w-14 h-14 rounded-2xl flex items-center justify-center &rsquo; + step.color}>
                  <step.icon className=&rdquo;w-7 h-7&rdquo; />
                </div>
              </div>
              <div className=&rdquo;flex-grow&rdquo;>
                <div className=&rdquo;text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1&rdquo;>Step {step.number}</div>
                <h3 className=&rdquo;text-xl font-bold text-foreground mb-2&rdquo;>{step.title}</h3>
                <p className=&rdquo;text-muted-foreground leading-relaxed mb-3&rdquo;>{step.desc}</p>
                <div className=&rdquo;inline-block bg-muted rounded-lg px-4 py-2 text-sm font-medium text-foreground&rdquo;>{step.highlight}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className=&rdquo;py-14 bg-primary/5 px-4&rdquo;>
        <div className=&rdquo;max-w-3xl mx-auto text-center&rdquo;>
          <div className=&rdquo;flex justify-center gap-1 mb-4&rdquo;>
            {[...Array(5)].map((_, i) => <Star key={i} className=&rdquo;w-6 h-6 fill-yellow-400 text-yellow-400&rdquo; />)}
          </div>
          <blockquote className=&rdquo;text-xl md:text-2xl font-medium text-foreground italic mb-4&rdquo;>
            &rdquo;I love getting the picture of my closed gate &mdash; it gives me total peace of mind.&rdquo;
          </blockquote>
          <cite className=&rdquo;text-muted-foreground not-italic&rdquo;>&mdash; Chattanooga customer, weekly service</cite>
        </div>
      </section>

      <section className=&rdquo;py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto&rdquo;>
        <h2 className=&rdquo;text-3xl font-bold text-foreground text-center mb-12&rdquo;>Common Questions</h2>
        <div className=&rdquo;space-y-3&rdquo;>
          {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
        </div>
      </section>

      <section className=&rdquo;py-20 px-4 bg-primary text-primary-foreground text-center&rdquo;>
        <div className=&rdquo;max-w-2xl mx-auto&rdquo;>
          <h2 className=&rdquo;text-3xl md:text-4xl font-extrabold mb-4&rdquo;>Ready? It Takes 2 Minutes.</h2>
          <p className=&rdquo;text-lg opacity-90 mb-8&rdquo;>Get a free quote online right now. No phone calls, no commitments. Just a clean yard.</p>
          <Button asChild size=&rdquo;lg&rdquo; variant=&rdquo;secondary&rdquo; className=&rdquo;rounded-xl px-10 h-14 text-base font-bold&rdquo;>
            <Link to=&rdquo;/quote&rdquo;>Get My Free Quote</Link>
          </Button>
        </div>
      </section>

    </main>
    <Footer />
  </div>
);

export default HowItWorksPage;
