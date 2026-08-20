import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { TIERS } from '@/data/doggyDoorTiers.js';
import {
  SERVICE_AREA,
  sanitizeStreetAddress,
  GOOGLE_PLACES_API_KEY,
  SERVICE_AREA_CENTER,
  WEBHOOK_URL,
  JOBBER_ZAPIER_URL,
} from '@/components/QuoteForm.jsx';

const DOOR_LOCATIONS = [
  'Exterior door',
  'Wall',
  'Sliding glass door',
  'Not sure yet',
];

const INSTALL_WINDOWS = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekends',
  'Flexible - whatever is soonest',
];

const DoggyDoorsBookingPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const tierKey = params.get('tier');
  const tier = TIERS.find((t) => t.key === tierKey) || TIERS[1];

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    zip: '',
    dog: '',
    doorLocation: '',
    installWindow: '',
    notes: '',
  });
  const [streetAddress, setStreetAddress] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Address autocomplete state - mirrors QuoteForm so Jobber gets the same clean
  // street-only value. See sanitizeStreetAddress in QuoteForm for why this matters.
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressFieldRef = useRef(null);
  const addressDebounceRef = useRef(null);
  const addressRequestIdRef = useRef(0);
  const skipNextAutocompleteRef = useRef(false);

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  useEffect(() => {
    if (addressDebounceRef.current) clearTimeout(addressDebounceRef.current);
    if (skipNextAutocompleteRef.current) {
      skipNextAutocompleteRef.current = false;
      return;
    }
    const query = streetAddress.trim();
    if (query.length < 4) {
      setAddressSuggestions([]);
      return;
    }
    const requestId = ++addressRequestIdRef.current;
    addressDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
            'X-Goog-FieldMask':
              'suggestions.placePrediction.placeId,suggestions.placePrediction.structuredFormat',
          },
          body: JSON.stringify({
            input: query,
            includedRegionCodes: ['us'],
            locationBias: { circle: { center: SERVICE_AREA_CENTER, radius: 50000.0 } },
          }),
        });
        if (requestId !== addressRequestIdRef.current) return;
        if (!res.ok) {
          setAddressSuggestions([]);
          return;
        }
        const data = await res.json();
        const preds = (data.suggestions || [])
          .map((s) => s.placePrediction)
          .filter(Boolean)
          .map((p) => ({
            placeId: p.placeId,
            mainText: p.structuredFormat?.mainText?.text || '',
            secondaryText: p.structuredFormat?.secondaryText?.text || '',
          }))
          .filter((p) => p.mainText);
        setAddressSuggestions(preds);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Address autocomplete error:', err);
        if (requestId === addressRequestIdRef.current) setAddressSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(addressDebounceRef.current);
  }, [streetAddress]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (addressFieldRef.current && !addressFieldRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectSuggestion = (s) => {
    skipNextAutocompleteRef.current = true;
    setStreetAddress(s.mainText);
    setAddressSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;

    if (!form.name || !form.email || !form.phone) {
      toast.error('Please fill in your name, email, and phone.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (form.zip.length !== 5 || !SERVICE_AREA[form.zip]) {
      toast.error(
        "Sorry - Scoopy Doo is not in your service area yet. We serve the greater Chattanooga, TN and North Georgia area. If you think this is a mistake, call or text 423-600-5040."
      );
      return;
    }
    const street = sanitizeStreetAddress(streetAddress, form.zip);
    if (street.length < 5) {
      toast.error('Please enter your street address so we can schedule the install.');
      return;
    }

    setSubmitting(true);
    const entry = SERVICE_AREA[form.zip];
    const detailLines = [
      `Tier: ${tier.name} - ${tier.product} ($${tier.price} installed)`,
      `Door location: ${form.doorLocation || 'Not specified'}`,
      `Dog: ${form.dog || 'Not specified'}`,
      `Preferred install window: ${form.installWindow || 'Flexible'}`,
    ];
    if (form.notes) detailLines.push(`Customer notes: ${form.notes}`);
    const installSummary = detailLines.join('\n');
    const payload = {
      full_name: form.name,
      email: form.email,
      phone: form.phone,
      service_zip: form.zip,
      street_address: street,
      service_type: 'doggy-door-install',
      service_label: `Doggy Door Installation - ${tier.name} (${tier.product})`,
      quoted_price: tier.price,
      base_price: tier.price,
      door_tier: tier.name,
      door_product: tier.product,
      door_location: form.doorLocation || 'Not specified',
      dog_breed_weight: form.dog || 'Not specified',
      preferred_install_window: form.installWindow || 'Flexible',
      // The install details also go out as one preformatted block. The individual
      // fields above stay for anyone mapping them separately, but this means a
      // single mapped field carries everything needed to do the job.
      additional_notes: installSummary,
      customer_notes: form.notes || '',
      service_area: entry ? entry.area : '',
      route_day: entry && entry.day ? entry.day : '',
      number_of_dogs: '',
      take_away: 'No',
      ready_to_book: true,
      lead_stage: 'Ready to Book',
      company_website: '',
      source: 'scoopychatt.com/doggy-doors/book',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      submitted_at: new Date().toISOString(),
    };

    const postJson = (url) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    // Zapier catch hooks reject the application/json CORS preflight from browsers,
    // so send form-encoded (a simple request, no preflight) - same as QuoteForm.
    const postForm = (url) =>
      fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(
          Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, String(v)]))
        ),
      });

    try {
      await Promise.allSettled([postJson(WEBHOOK_URL), postForm(JOBBER_ZAPIER_URL)]);
    } catch (err) {
      console.error(err);
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Schedule', {
        content_name: `Doggy Door Install Booked - ${tier.name}`,
        value: tier.price,
        currency: 'USD',
      });
    }
    setSubmitting(false);
    navigate('/thank-you');
  };

  const field = 'w-full';

  return (
    <>
      <SEOHead path="/doggy-doors/book" />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                to="/doggy-doors"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to options
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 text-balance">
                  Book Your Doggy Door Install
                </h1>
                <p className="text-muted-foreground mb-8">
                  Tell us where you are and we will confirm your install date. No payment today -
                  we measure, install, and bill you after the job is done.
                </p>

                {/* Chosen tier summary */}
                <div className="bg-card border border-border rounded-3xl shadow-xl p-6 mb-8">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-xs font-bold tracking-wide uppercase text-primary mb-1">
                        Your selection
                      </div>
                      <div className="text-xl font-bold text-foreground">{tier.name}</div>
                      <div className="text-sm text-muted-foreground">{tier.product}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-foreground">${tier.price}</div>
                      <div className="text-sm text-muted-foreground">installed</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                    {TIERS.map((t) => (
                      <Link
                        key={t.key}
                        to={`/doggy-doors/book?tier=${t.key}`}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                          t.key === tier.key
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {t.name} ${t.price}
                      </Link>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-3xl shadow-xl p-6 md:p-8 space-y-5"
                >
                  {/* Honeypot - hidden from real visitors */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={form.name} onChange={change} className={field} required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" type="tel" value={form.phone} onChange={change} className={field} required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={change} className={field} required />
                  </div>

                  <div ref={addressFieldRef} className="relative">
                    <Label htmlFor="street">Street address</Label>
                    <Input
                      id="street"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      onFocus={() => addressSuggestions.length && setShowSuggestions(true)}
                      placeholder="Start typing your address"
                      autoComplete="off"
                      className={field}
                      required
                    />
                    {showSuggestions && addressSuggestions.length > 0 && (
                      <ul className="absolute z-20 mt-1 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                        {addressSuggestions.map((s) => (
                          <li key={s.placeId}>
                            <button
                              type="button"
                              onClick={() => selectSuggestion(s)}
                              className="w-full text-left px-4 py-2.5 hover:bg-muted flex items-start gap-2"
                            >
                              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>
                                <span className="block text-sm font-medium text-foreground">{s.mainText}</span>
                                <span className="block text-xs text-muted-foreground">{s.secondaryText}</span>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="zip">ZIP code</Label>
                      <Input id="zip" name="zip" inputMode="numeric" maxLength={5} value={form.zip} onChange={change} className={field} required />
                    </div>
                    <div>
                      <Label htmlFor="installWindow">Preferred install window</Label>
                      <select
                        id="installWindow"
                        name="installWindow"
                        value={form.installWindow}
                        onChange={change}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                      >
                        <option value="">Choose one</option>
                        {INSTALL_WINDOWS.map((w) => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="doorLocation">Where should it go?</Label>
                      <select
                        id="doorLocation"
                        name="doorLocation"
                        value={form.doorLocation}
                        onChange={change}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                      >
                        <option value="">Choose one</option>
                        {DOOR_LOCATIONS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="dog">Dog breed and weight</Label>
                      <Input id="dog" name="dog" value={form.dog} onChange={change} placeholder="Golden retriever, 65 lbs" className={field} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Anything else? (optional)</Label>
                    <Textarea id="notes" name="notes" value={form.notes} onChange={change} rows={3} className={field} />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full bg-primary text-primary-foreground font-bold h-12 rounded-xl shadow-md"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      `Book ${tier.name} - $${tier.price} installed`
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    We confirm your install date within 1 business day. Nothing is charged today.
                  </p>
                </form>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DoggyDoorsBookingPage;
