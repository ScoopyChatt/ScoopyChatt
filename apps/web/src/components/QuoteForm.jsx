import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { AnimatePresence, motion } from '@/components/motion.jsx';
import { CheckCircle2, MapPin } from 'lucide-react';
import { GuaranteeBadge } from '@/components/Guarantee.jsx';
import { getAdClickIds } from '@/utils/adClickIds.js';
import { isValidUsPhone, PHONE_ERROR, formatUsPhone, emailTypoSuggestion } from '@/utils/contactValidation.js';

export const SERVICE_AREA = {
  "37350": { area: "Lookout Mountain", day: "Tuesday" },
  "30750": { area: "Lookout Mountain", day: "Tuesday" },
  '37302': { area: 'Apison', day: 'Friday' },
  '37315': { area: 'Collegedale', day: null },
  '37336': { area: 'Lookout Mountain', day: null },
  '37341': { area: 'Lupton City', day: 'Thursday' },
  '37343': { area: 'Hixson', day: 'Wednesday' },
  '37363': { area: 'Ooltewah', day: 'Friday' },
  '37377': { area: 'Signal Mountain', day: 'Thursday' },
  '37379': { area: 'Soddy-Daisy', day: 'Wednesday' },
  '37402': { area: 'Downtown Chattanooga', day: null },
  '37403': { area: 'the Southside', day: null },
  '37404': { area: 'Highland Park', day: null },
  '37405': { area: 'North Chattanooga', day: 'Monday' },
  '37406': { area: 'East Chattanooga', day: 'Monday' },
  '37407': { area: 'Alton Park', day: null },
  '37408': { area: 'Jefferson Heights', day: 'Monday' },
  '37409': { area: 'St. Elmo', day: null },
  '37410': { area: 'South Chattanooga', day: null },
  '37411': { area: 'Brainerd', day: null },
  '37412': { area: 'East Ridge', day: 'Friday' },
  '37415': { area: 'Red Bank', day: 'Wednesday' },
  '37416': { area: 'Harrison', day: 'Thursday' },
  '37419': { area: 'Lookout Valley', day: 'Tuesday' },
  '37421': { area: 'East Brainerd', day: null },
  '30707': { area: 'Chickamauga', day: null },
  '30725': { area: 'Flintstone', day: null },
  '30736': { area: 'Ringgold', day: null },
  '30741': { area: 'Rossville', day: null },
  '30742': { area: 'Fort Oglethorpe', day: 'Thursday' },
};

// Real municipality per zip - matches the city lookup table already used on the
// Zapier side (Website Booking -> Jobber Lead Zap). Kept in sync manually; if that
// Zap's lookup table changes, update this too.
const REAL_CITY_BY_ZIP = {
  '30707': 'Chickamauga',
  '30725': 'Flintstone',
  '30736': 'Ringgold',
  '30741': 'Rossville',
  '30742': 'Fort Oglethorpe',
};
const cityForZip = (zip) => REAL_CITY_BY_ZIP[zip] || 'Chattanooga';

// Some customers type/paste their whole address (street + city + state + zip) into
// the street-address box instead of just the street. Jobber's property-creation API
// rejects a street1 value like that outright (confirmed 2026-07-29: a booking with
// street1 = "3312 Tarlton Ave. Chattanooga. TN 37410" errored the whole Zap and no
// Jobber quote was ever created). Strip a trailing city/state/zip the customer
// already gave us elsewhere so we always send Jobber a clean street-only value,
// regardless of how they formatted it.
export function sanitizeStreetAddress(raw, zip) {
  let s = (raw || '').trim();
  const city = cityForZip(zip);
  const patterns = [
    zip ? new RegExp('[\\s.,]+' + zip + '\\s*$') : null,
    new RegExp('[\\s.,]+(TN|GA)\\s*$', 'i'),
    new RegExp('[\\s.,]+' + city + '\\s*$', 'i'),
  ].filter(Boolean);
  let changed = true;
  let guard = 0;
  while (changed && guard < 6) {
    changed = false;
    for (const re of patterns) {
      const next = s.replace(re, '');
      if (next !== s) {
        s = next;
        changed = true;
      }
    }
    guard++;
  }
  return s.replace(/[.,\s]+$/, '').trim();
}

// Restricted (HTTP referrer: scoopychatt.com only) client-side key, Places API (New) enabled.
// Safe to ship in the bundle - the restriction, not secrecy, is what protects it.
export const GOOGLE_PLACES_API_KEY =
  import.meta.env.VITE_GOOGLE_PLACES_API_KEY ||
  'AIzaSyCPG4BafhslOYkpRx0ue3nB5mOkWZE5gAM';

// Center of the Chattanooga / North Georgia service area, used to bias Places
// Autocomplete suggestions toward addresses we actually service.
export const SERVICE_AREA_CENTER = { latitude: 35.0456, longitude: -85.3097 };

export const WEBHOOK_URL =
  import.meta.env.VITE_QUOTE_WEBHOOK_URL ||
  'https://hook.us2.make.com/nsb476cxnhmejirr5aq6em1ce4royvla';

export const JOBBER_ZAPIER_URL =
  import.meta.env.VITE_JOBBER_ZAPIER_URL ||
  'https://hooks.zapier.com/hooks/catch/3191509/444yusn/';

const PRICING = {
  'weekly': { base: 20, extra: 2, cadence: '/ visit', note: 'weekly service' },
  'twice-weekly': { base: 18, extra: 1, cadence: '/ visit', note: 'twice-weekly service' },
  'biweekly': { base: 33, extra: 3, cadence: '/ visit', note: 'every-other-week service' },
  'onetime': { base: 85, extra: 15, inc: 3, cadence: 'one-time', note: 'a one-time cleanup' },
};

// What the customer sees. "Bi-weekly" is avoided because many people read it as twice
// a week; SERVICE_LABELS below is what Jobber receives and is left unchanged.
const SERVICE_OPTIONS = [
  ['twice-weekly', 'Twice-a-Week Service'],
  ['weekly', 'Weekly Service'],
  ['biweekly', 'Every-Other-Week Service'],
  ['onetime', 'One-Time Cleanup'],
  ['custom', 'Custom Service'],
];

// Recurring plans are pre-billed every 4 weeks, so the card shows the first 4-week bill.
const VISITS_PER_4_WEEKS = { 'twice-weekly': 8, 'weekly': 4, 'biweekly': 2 };

// Fall onboarding special: new weekly and twice-weekly customers get one visit credited
// against their first 4 weeks. Empty this list when the special ends.
const FIRST_SCOOP_FREE_PLANS = ['weekly', 'twice-weekly'];

// The first 4-week bill for a recurring plan, with the free first visit taken off when it applies.
function firstBillFor(serviceType, price) {
  const visits = VISITS_PER_4_WEEKS[serviceType];
  if (!visits || !price) return null;
  const full = price * visits;
  const free = FIRST_SCOOP_FREE_PLANS.includes(serviceType);
  return { visits, full, free, first: free ? full - price : full };
}

const SERVICE_LABELS = {
  'weekly': 'Weekly Pet Waste Removal',
  'twice-weekly': 'Twice-Weekly Pet Waste Removal',
  'biweekly': 'Bi-Weekly Pet Waste Removal',
  'onetime': 'One-Time Yard Cleanup',
};

function computeQuote(serviceType, dogs, takeAway) {
  const p = PRICING[serviceType];
  const n = parseInt(dogs, 10) || 1;
  if (!p) return { price: null };
  const inc = p.inc || 1;
  const price = p.base + Math.max(0, n - inc) * p.extra + (takeAway ? 5 : 0);
  return { price, cadence: p.cadence, note: p.note, takeAway: !!takeAway };
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().refine(isValidUsPhone, PHONE_ERROR),
  serviceZipCode: z.string().regex(/^\d{5}$/, 'Must be a valid 5-digit zip code'),
  serviceType: z.string().min(1, 'Please select a service type'),
  numberOfDogs: z.string().min(1, 'Please select the number of dogs'),
  additionalNotes: z.string().optional(),
});

// allowedServices: optional list of serviceType values to offer in the dropdown
// (used by the paid landing page so only offer-eligible plans can be picked).
const QuoteForm = ({ allowedServices } = {}) => {
  const navigate = useNavigate();
  const honeypotRef = useRef(null);
  const [quote, setQuote] = useState(null);
  const resultRef = useRef(null);
  useEffect(() => {
    if (quote) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [quote]);
  const [takeAway, setTakeAway] = useState(false);
  const [manyDogs, setManyDogs] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // The price card repeats what the person picked, and the haul-away add-on lives on the
  // card so they see the price change instead of guessing at it before any price exists.
  const quoteSummary = () => {
    const v = form.getValues();
    const plan = ((SERVICE_OPTIONS.find(([val]) => val === v.serviceType) || [])[1] || 'Pet waste removal').replace(/ Service$/, '');
    const dogs = parseInt(v.numberOfDogs, 10) || 1;
    return plan + ', ' + dogs + (dogs === 1 ? ' dog' : ' dogs') + (takeAway ? ', with haul-away' : '') + '.';
  };
  const firstBill = () => {
    const bill = quote ? firstBillFor(form.getValues('serviceType'), quote.price) : null;
    if (!bill) return null;
    const { visits, full, free, first } = bill;
    return (
      <div className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-sm text-foreground">
        <p className="font-semibold">
          {'First 4 weeks: $' + first + ' for ' + visits + ' visits'}{free ? ', first scoop free' : ''}
        </p>
        <p className="text-muted-foreground">{'Billed upfront every 4 weeks. After that, $' + full + ' every 4 weeks.'}</p>
      </div>
    );
  };
  const changeTakeAway = (checked) => {
    setTakeAway(checked);
    const v = form.getValues();
    setQuote(computeQuote(v.serviceType, v.numberOfDogs, checked));
  };
  const [streetAddress, setStreetAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const addressFieldRef = useRef(null);
  const addressDebounceRef = useRef(null);
  const addressRequestIdRef = useRef(0);
  const skipNextAutocompleteRef = useRef(false);

  // Google Places Autocomplete (New) - suggests real addresses as the customer types
  // so we get a clean, validated street address instead of free-typed text (this is
  // what broke Jobber's property creation before - see sanitizeStreetAddress above).
  useEffect(() => {
    if (addressDebounceRef.current) clearTimeout(addressDebounceRef.current);
    if (skipNextAutocompleteRef.current) {
      // The streetAddress change that triggered this effect came from picking a
      // suggestion, not typing - don't immediately re-query and reopen the dropdown.
      skipNextAutocompleteRef.current = false;
      setSuggestionsLoading(false);
      return;
    }
    const query = streetAddress.trim();
    if (query.length < 4) {
      setAddressSuggestions([]);
      setSuggestionsLoading(false);
      return;
    }
    setSuggestionsLoading(true);
    const requestId = ++addressRequestIdRef.current;
    addressDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
            'X-Goog-FieldMask': 'suggestions.placePrediction.placeId,suggestions.placePrediction.structuredFormat',
          },
          body: JSON.stringify({
            input: query,
            includedRegionCodes: ['us'],
            locationBias: { circle: { center: SERVICE_AREA_CENTER, radius: 50000.0 } },
          }),
        });
        if (requestId !== addressRequestIdRef.current) return; // a newer keystroke superseded this request
        if (!res.ok) { setAddressSuggestions([]); return; }
        const data = await res.json();
        const preds = (data.suggestions || [])
          .map((s) => s.placePrediction)
          .filter(Boolean)
          .map((p) => ({
            placeId: p.placeId,
            mainText: p.structuredFormat && p.structuredFormat.mainText ? p.structuredFormat.mainText.text : '',
            secondaryText: p.structuredFormat && p.structuredFormat.secondaryText ? p.structuredFormat.secondaryText.text : '',
          }))
          .filter((p) => p.mainText);
        setAddressSuggestions(preds);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Address autocomplete error:', err);
        if (requestId === addressRequestIdRef.current) setAddressSuggestions([]);
      } finally {
        if (requestId === addressRequestIdRef.current) setSuggestionsLoading(false);
      }
    }, 300);
    return () => clearTimeout(addressDebounceRef.current);
  }, [streetAddress]);

  // Close the suggestions dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (addressFieldRef.current && !addressFieldRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectAddressSuggestion = (suggestion) => {
    // Just the street (main text) - we already have city/state/zip from the zip field,
    // and this keeps the value clean for Jobber regardless of what the full prediction contains.
    skipNextAutocompleteRef.current = true;
    setStreetAddress(suggestion.mainText);
    setAddressSuggestions([]);
    setShowSuggestions(false);
    checkAddressZip(suggestion.placeId);
  };

  // Look up the picked address's zip and warn if it doesn't match the zip the price was
  // quoted for, or falls outside the service area. Best effort: any failure shows nothing.
  const [addressZipNote, setAddressZipNote] = useState('');
  const checkAddressZip = async (placeId) => {
    setAddressZipNote('');
    try {
      const res = await fetch('https://places.googleapis.com/v1/places/' + encodeURIComponent(placeId), {
        headers: { 'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY, 'X-Goog-FieldMask': 'addressComponents' },
      });
      if (!res.ok) return;
      const data = await res.json();
      const zipPart = (data.addressComponents || []).find((c) => (c.types || []).includes('postal_code'));
      const placeZip = zipPart ? zipPart.shortText || zipPart.longText : '';
      if (!placeZip) return;
      const quotedZip = form.getValues('serviceZipCode');
      if (!SERVICE_AREA[placeZip]) {
        setAddressZipNote('That address looks like it is in zip ' + placeZip + ', which is outside our service area. Please double-check it, or call or text 423-600-5040.');
      } else if (placeZip !== quotedZip) {
        setAddressZipNote('That address looks like it is in zip ' + placeZip + ', not ' + quotedZip + '. Please double-check it. Your price does not change.');
      }
    } catch (err) {
      console.error('Address zip check error:', err);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceZipCode: '',
      serviceType: '',
      numberOfDogs: '',
      additionalNotes: '',
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const zipValue = form.watch('serviceZipCode');
  const isCompleteZip = (zipValue || '').length === 5;
  const areaEntry = isCompleteZip ? SERVICE_AREA[zipValue] : undefined;
  const matchedArea = areaEntry ? areaEntry.area : undefined;
  const matchedDay = areaEntry ? areaEntry.day : null;

  const sanitizedStreetAddress = sanitizeStreetAddress(streetAddress, zipValue);
  const isAddressValid = sanitizedStreetAddress.length >= 5;
  const addressWasTrimmed = sanitizedStreetAddress && sanitizedStreetAddress !== streetAddress.trim();

  const requestStart = async () => {
    if (!isAddressValid) {
      toast.error('Please enter your street address so we can schedule your visit.');
      return;
    }
    const v = form.getValues();
    const entry = SERVICE_AREA[v.serviceZipCode];
    const readyPayload = {
      full_name: v.name, email: v.email, phone: v.phone,
      service_zip: v.serviceZipCode, service_type: v.serviceType,
      street_address: sanitizedStreetAddress,
      number_of_dogs: parseInt(v.numberOfDogs, 10),
      service_area: entry ? entry.area : '',
      route_day: entry && entry.day ? entry.day : '',
      quoted_price: quote && quote.price ? quote.price : '',
      base_price: quote && quote.price != null ? quote.price - (takeAway ? 5 : 0) : '',
      takeaway_fee: takeAway ? 5 : 0,
      service_label: SERVICE_LABELS[v.serviceType] || 'Custom Pet Waste Removal Service',
      ready_to_book: true, lead_stage: 'Ready to Book', take_away: takeAway ? 'Yes (+$5/visit)' : 'No', company_website: '',
      source: 'scoopychatt.com/quote', submitted_at: new Date().toISOString(),
      ...getAdClickIds(),
    };
    const postJson = (url) => fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(readyPayload),
    });
    // Zapier catch hooks reject the application/json CORS preflight from browsers.
    // Send form-encoded (a simple request, no preflight) so the data actually lands.
    const postForm = (url) => fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(
        Object.fromEntries(Object.entries(readyPayload).map(([k, val]) => [k, String(val)]))
      ),
    });
    try {
      await Promise.allSettled([postJson(WEBHOOK_URL), postForm(JOBBER_ZAPIER_URL)]);
    } catch (error) { console.error(error); }
    const dogs = parseInt(v.numberOfDogs, 10);
    const bill = quote ? firstBillFor(v.serviceType, quote.price) : null;
    navigate('/thank-you', {
      state: {
        value: bill ? bill.first : (quote && quote.price) || 0,
        recap: [
          ['Plan', ((SERVICE_OPTIONS.find(([val]) => val === v.serviceType) || [])[1] || 'Pet waste removal') + (takeAway ? ', with haul-away' : '')],
          ['Dogs', String(dogs)],
          ['Price', quote && quote.price ? '$' + quote.price + ' ' + quote.cadence : 'Custom quote'],
          ...(bill ? [['First 4 weeks', '$' + bill.first + (bill.free ? ' (first scoop free)' : '')]] : []),
          ['Address', sanitizedStreetAddress + ', ' + v.serviceZipCode],
        ],
      },
    });
  };

  const onSubmit = async (values) => {
    // Service-area gate: reject out-of-area zips before submitting
    if (!SERVICE_AREA[values.serviceZipCode]) {
      alert("Sorry - Scoopy Doo is not in your service area yet. We currently serve the greater Chattanooga, TN and North Georgia area. If you think this is a mistake, please call or text us at 423-600-5040.");
      return;
    }
    // Honeypot: real people never fill this. If it has a value, drop silently.
    if (honeypotRef.current && honeypotRef.current.value) {
      form.reset();
      navigate('/thank-you');
      return;
    }

    const payload = {
      full_name: values.name,
      email: values.email,
      phone: values.phone,
      service_zip: values.serviceZipCode,
      service_type: values.serviceType,
      number_of_dogs: parseInt(values.numberOfDogs, 10),
      additional_notes: values.additionalNotes || '',
      quoted_price: computeQuote(values.serviceType, values.numberOfDogs, takeAway).price,
      lead_stage: 'New Website Lead',
      take_away: takeAway ? 'Yes (+$5/visit)' : 'No',
      service_area: SERVICE_AREA[values.serviceZipCode] ? SERVICE_AREA[values.serviceZipCode].area : '',
      route_day: SERVICE_AREA[values.serviceZipCode] && SERVICE_AREA[values.serviceZipCode].day ? SERVICE_AREA[values.serviceZipCode].day : '',
      in_service_area: !!SERVICE_AREA[values.serviceZipCode],
      company_website: '',
      source: 'scoopychatt.com/quote',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      submitted_at: new Date().toISOString(),
      ...getAdClickIds(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }

      setQuote(computeQuote(values.serviceType, values.numberOfDogs, takeAway));
      toast.success('Got it - here is your instant price!');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Connection failed. Please call or text us at 423-600-5040.');
    }
  };

  const onError = () => {
    toast.error('Please fill in all required fields correctly.');
  };

  if (quote) {
    const entry = SERVICE_AREA[form.getValues('serviceZipCode')];
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-1">Your instant price</p>
          {quote.price ? (
            <>
              <p ref={resultRef} className="text-4xl font-bold text-foreground">{'$' + quote.price}<span className="text-lg font-medium text-muted-foreground"> {quote.cadence}</span></p>
              <p className="text-sm text-muted-foreground mt-2">
                {quoteSummary()}{' '}
                <button type="button" onClick={() => setQuote(null)} className="font-semibold text-primary hover:underline">Edit</button>
              </p>
              {entry && entry.day && (
                <p className="text-sm text-muted-foreground mt-1">{'Our trucks are in ' + entry.area + ' on ' + entry.day + 's.'}</p>
              )}
              {PRICING[form.getValues('serviceType')] && form.getValues('serviceType') !== 'onetime' && (
                <label className="mt-3 flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-left cursor-pointer">
                  <input type="checkbox" checked={takeAway} onChange={(e) => changeTakeAway(e.target.checked)} className="mt-1 h-4 w-4 accent-orange-500" />
                  <span className="text-sm text-foreground">Haul the waste away for me <span className="font-semibold">(+$5 per visit)</span>. Otherwise we double-bag it and leave it in your bin.</span>
                </label>
              )}
              {firstBill()}
              <p className="text-xs text-muted-foreground mt-3">Most yards start the same week. If your yard is very overgrown, a one-time $85 initial cleanup may apply. We will confirm before your first visit.</p>
            </>
          ) : (
            <p className="text-xl font-semibold text-foreground">We will put together a custom quote for you.</p>
          )}
        </div>
        <div className="text-center">
          <GuaranteeBadge />
        </div>
        <div className="text-left relative" ref={addressFieldRef}>
            <label className="mb-1 block text-sm font-medium text-foreground">Street Address *</label>
            <input
              type="text"
              required
              autoComplete="off"
              value={streetAddress}
              onChange={(e) => { setStreetAddress(e.target.value); setAddressZipNote(''); }}
              onFocus={() => { if (addressSuggestions.length) setShowSuggestions(true); }}
              placeholder="Start typing your address..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
            {showSuggestions && (suggestionsLoading || addressSuggestions.length > 0) && (
              <div className="absolute z-10 mt-1 w-full rounded-md border border-input bg-background shadow-lg overflow-hidden">
                {suggestionsLoading && addressSuggestions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">Searching...</div>
                ) : (
                  addressSuggestions.map((s) => (
                    <button
                      type="button"
                      key={s.placeId}
                      onClick={() => selectAddressSuggestion(s)}
                      className="flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-accent/10 transition-colors"
                    >
                      <span className="text-foreground">{s.mainText}</span>
                      {s.secondaryText ? <span className="text-xs text-muted-foreground">{s.secondaryText}</span> : null}
                    </button>
                  ))
                )}
              </div>
            )}
            <p className="mt-1 text-xs text-muted-foreground">Pick your address from the dropdown, or type the street number and name only (no city, state, or zip - we already have those). We need this to schedule your first visit; it is not shared or used for anything else.</p>
            {addressZipNote ? (
              <p className="mt-1 text-sm font-medium text-orange-700 dark:text-orange-300">{addressZipNote}</p>
            ) : null}
            {addressWasTrimmed ? (
              <p className="mt-1 text-xs text-muted-foreground">We'll use: <span className="font-medium text-foreground">{sanitizedStreetAddress}</span></p>
            ) : null}
          </div>
          <div
            className="relative"
            onClick={() => {
              if (!isAddressValid) {
                toast.error('Please enter your street address so we can schedule your visit.');
              }
            }}
          >
            <Button onClick={requestStart} disabled={!isAddressValid} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed">Request my start date</Button>
          </div>
        <button type="button" onClick={() => setQuote(null)} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">Back to edit my details</button>
      </div>
    );
  }

  const serviceChoices = SERVICE_OPTIONS.filter(([value]) => !allowedServices || allowedServices.includes(value));
  const choiceClass = (selected) =>
    'rounded-xl border-2 px-3 py-3 text-left transition-colors ' +
    (selected ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* Honeypot - hidden from humans; bots fill it and get dropped */}
        <input ref={honeypotRef} type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        {/* Zip first: the "yes, we serve you" answer comes before any personal details. */}
        <FormField
          control={form.control}
          name="serviceZipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Zip Code *</FormLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="e.g. 37402"
                  className="text-foreground md:max-w-xs"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <AnimatePresence mode="wait">
                {isCompleteZip && matchedArea && (
                  <motion.p key="matched" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{'We serve ' + matchedArea + (matchedDay ? '. Trucks there on ' + matchedDay + 's.' : '.')}</span>
                  </motion.p>
                )}
                {isCompleteZip && !matchedArea && (
                  <motion.p key="unmatched" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>That zip is outside our service area right now. If you think we should reach you, call or text <a href="tel:+14236005040" className="font-semibold text-primary hover:underline">423-600-5040</a>.</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type *</FormLabel>
              <div role="radiogroup" className="grid grid-cols-2 gap-3">
                {serviceChoices.map(([value, label]) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={field.value === value}
                    key={value}
                    onClick={() => field.onChange(value)}
                    className={choiceClass(field.value === value)}
                  >
                    <span className="block text-sm font-semibold">{label.replace(/ Service$/, '')}</span>
                    <span className="block text-xs text-muted-foreground">
                      {PRICING[value] ? 'From $' + PRICING[value].base + (value === 'onetime' ? '' : ' / visit') : 'We price it for you'}
                    </span>
                  </button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfDogs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Dogs *</FormLabel>
              <div role="radiogroup" className="grid grid-cols-5 gap-2 sm:grid-cols-9">
                {['1', '2', '3', '4', '5', '6', '7', '8'].map((num) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={!manyDogs && field.value === num}
                    key={num}
                    onClick={() => { setManyDogs(false); field.onChange(num); }}
                    className={choiceClass(!manyDogs && field.value === num) + ' text-center font-semibold'}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  role="radio"
                  aria-checked={manyDogs}
                  onClick={() => { setManyDogs(true); field.onChange(''); }}
                  className={choiceClass(manyDogs) + ' text-center font-semibold'}
                >
                  9+
                </button>
              </div>
              {manyDogs ? (
                <p className="text-sm text-muted-foreground">
                  For 9 or more dogs, call or text <a href="tel:+14236005040" className="font-semibold text-primary hover:underline">423-600-5040</a> and we will price your yard for you.
                </p>
              ) : <FormMessage />}
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="text-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(423) 555-0100"
                    className="text-foreground"
                    {...field}
                    onChange={(e) => field.onChange(formatUsPhone(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="your.email@example.com"
                    className="text-foreground"
                    {...field}
                  />
                </FormControl>
                {emailTypoSuggestion(field.value) && (
                  <p className="text-sm text-muted-foreground">
                    {'Did you mean '}
                    <button type="button" className="font-semibold text-primary hover:underline" onClick={() => form.setValue('email', emailTypoSuggestion(field.value), { shouldValidate: true })}>
                      {emailTypoSuggestion(field.value)}
                    </button>
                    ?
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {showNotes || form.getValues('additionalNotes') ? (
          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Gate code, yard size, anything we should know..."
                    className="text-foreground resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <button type="button" onClick={() => setShowNotes(true)} className="text-sm font-semibold text-primary hover:underline">
            + Add a note (gate code, yard details)
          </button>
        )}

        {/* Wrapper div to capture clicks when button is disabled so we can show the toast */}
        <div 
          className="relative" 
          onClick={() => {
            if (!isValid && !isSubmitting) {
              toast.error('Please fill in all required fields correctly.');
              form.trigger();
            }
          }}
        >
          <Button 
            type="submit" 
            disabled={!isValid || isSubmitting} 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Getting your price...' : 'See My Instant Price'}
          </Button>
        </div>
        <div className="text-center">
          <GuaranteeBadge />
        </div>
      </form>
    </Form>
  );
};

export default QuoteForm;
