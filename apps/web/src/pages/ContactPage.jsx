import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';
import { WEBHOOK_URL } from '@/components/QuoteForm.jsx';
import { getAdClickIds } from '@/utils/adClickIds.js';
import { isValidUsPhone, isValidEmail, PHONE_ERROR } from '@/utils/contactValidation.js';

// A short "just ask a question" form, separate from the quote form, for people who
// are not ready for a price: existing customers, HOA and property managers, doggy
// door shoppers. It posts to the same Make webhook as the quote form with
// lead_stage "Question" so it can be told apart from quote requests.

const TOPICS = [
  'General question',
  'I am already a customer',
  'HOA, apartment or business',
  'Doggy doors',
  'Something else',
];

const field = 'mt-1';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', topic: TOPICS[0], message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) {
      setSent(true);
      return;
    }
    if (form.name.trim().length < 2) {
      toast.error('Please enter your name.');
      return;
    }
    if (!isValidUsPhone(form.phone)) {
      toast.error(PHONE_ERROR + '.');
      return;
    }
    if (form.email && !isValidEmail(form.email)) {
      toast.error('Please check your email address, or leave it blank.');
      return;
    }
    if (form.message.trim().length < 5) {
      toast.error('Please type your question.');
      return;
    }

    setSubmitting(true);
    const payload = {
      full_name: form.name.trim(),
      phone: form.phone,
      email: form.email.trim(),
      question_topic: form.topic,
      additional_notes: `[${form.topic}] ${form.message.trim()}`,
      message: form.message.trim(),
      lead_stage: 'Question',
      company_website: '',
      source: 'scoopychatt.com/contact',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      submitted_at: new Date().toISOString(),
      ...getAdClickIds(),
    };
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed with status ' + res.status);
      setSent(true);
    } catch (err) {
      console.error('Contact form error:', err);
      toast.error('That did not go through. Please call or text us at 423-600-5040.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Scoopy Doo | Ask a Question | Chattanooga, TN"
        description="Questions about dog poop removal, HOA service or doggy doors in Chattanooga? Call or text 423-600-5040, email info@scoopychatt.com, or send us a message."
        canonicalUrl={`${CANONICAL_BASE_URL}/contact`}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">Ask Us a Question</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Not ready for a price yet? Send a quick message and a real person from our family team will get back to you.
                Looking for pricing instead? <Link to="/quote" className="text-primary font-semibold hover:underline">Get your instant price</Link>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <a href="tel:423-600-5040" className="flex items-start gap-4 p-5 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                  <Phone className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Call</p>
                    <p className="text-muted-foreground">(423) 600-5040</p>
                  </div>
                </a>
                <a href="sms:+14236005040" className="flex items-start gap-4 p-5 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Text</p>
                    <p className="text-muted-foreground">(423) 600-5040</p>
                  </div>
                </a>
                <a href="mailto:info@scoopychatt.com" className="flex items-start gap-4 p-5 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                  <Mail className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">info@scoopychatt.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/50">
                  <Clock className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Hours</p>
                    <p className="text-muted-foreground">Mon-Fri 7am-8pm, Sat-Sun 9am-9pm</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 bg-card rounded-3xl border border-border/50 shadow-sm p-6 md:p-8">
                {sent ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Message sent</h2>
                    <p className="text-muted-foreground">
                      Thanks, {form.name.trim().split(' ')[0] || 'friend'}. We will text or call you at the number you gave us.
                      If it is urgent, call or text (423) 600-5040.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <input
                      type="text"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      aria-hidden="true"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="contact-name">Name</Label>
                        <Input id="contact-name" name="name" autoComplete="name" value={form.name} onChange={change} className={field} required />
                      </div>
                      <div>
                        <Label htmlFor="contact-phone">Phone</Label>
                        <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="e.g. 423-555-0100" value={form.phone} onChange={change} className={field} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email (optional)</Label>
                      <Input id="contact-email" name="email" type="email" autoComplete="email" value={form.email} onChange={change} className={field} />
                    </div>
                    <div>
                      <Label htmlFor="contact-topic">What is it about?</Label>
                      <select
                        id="contact-topic"
                        name="topic"
                        value={form.topic}
                        onChange={change}
                        className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                      >
                        {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Your question</Label>
                      <Textarea id="contact-message" name="message" rows={5} value={form.message} onChange={change} className={field} required />
                    </div>
                    <Button type="submit" size="lg" disabled={submitting} className="w-full font-bold text-base">
                      {submitting ? 'Sending...' : 'Send My Question'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
