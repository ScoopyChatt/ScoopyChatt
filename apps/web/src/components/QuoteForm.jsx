import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, MapPin } from 'lucide-react';

const SERVICE_AREA = {
  '37302': 'Apison',
  '37315': 'Collegedale',
  '37336': 'Lookout Mountain',
  '37341': 'Lupton City',
  '37343': 'Hixson',
  '37363': 'Ooltewah',
  '37377': 'Signal Mountain',
  '37379': 'Soddy-Daisy',
  '37402': 'Downtown Chattanooga',
  '37403': 'the Southside',
  '37404': 'Highland Park',
  '37405': 'North Chattanooga',
  '37406': 'East Chattanooga',
  '37407': 'Alton Park',
  '37408': 'Jefferson Heights',
  '37409': 'St. Elmo',
  '37410': 'South Chattanooga',
  '37411': 'Brainerd',
  '37412': 'East Ridge',
  '37415': 'Red Bank',
  '37416': 'Harrison',
  '37419': 'Lookout Valley',
  '37421': 'East Brainerd',
  '30707': 'Chickamauga',
  '30725': 'Flintstone',
  '30736': 'Ringgold',
  '30741': 'Rossville',
  '30742': 'Fort Oglethorpe',
};

const WEBHOOK_URL =
  import.meta.env.VITE_QUOTE_WEBHOOK_URL ||
  'https://hook.us2.make.com/nsb476cxnhmejirr5aq6em1ce4royvla';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  serviceZipCode: z.string().regex(/^\d{5}$/, 'Must be a valid 5-digit zip code'),
  serviceType: z.string().min(1, 'Please select a service type'),
  numberOfDogs: z.string().min(1, 'Please select the number of dogs'),
  additionalNotes: z.string().optional(),
});

const QuoteForm = () => {
  const navigate = useNavigate();
  const honeypotRef = useRef(null);

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
  const matchedArea = isCompleteZip ? SERVICE_AREA[zipValue] : undefined;

  const onSubmit = async (values) => {
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
      service_area: SERVICE_AREA[values.serviceZipCode] || '',
      in_service_area: !!SERVICE_AREA[values.serviceZipCode],
      company_website: '',
      source: 'scoopychatt.com/quote',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      submitted_at: new Date().toISOString(),
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

      toast.success('Quote request sent! We will be in touch shortly.');
      form.reset();
      navigate('/thank-you');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Connection failed. Please call or text us at 423-600-5040.');
    }
  };

  const onError = () => {
    toast.error('Please fill in all required fields correctly.');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* Honeypot - hidden from humans; bots fill it and get dropped */}
        <input ref={honeypotRef} type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
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
                    placeholder="(555) 123-4567" 
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
            name="serviceZipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Zip Code *</FormLabel>
                <FormControl>
                  <Input 
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="e.g. 37402" 
                    className="text-foreground" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
                <AnimatePresence mode="wait">
                  {isCompleteZip && matchedArea && (
                    <motion.div key="matched" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="mt-2 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <span>Great news - we service <strong>{matchedArea}</strong> ({zipValue}) regularly! We can easily fit you in, and we will confirm your service day when we send your quote.</span>
                    </motion.div>
                  )}
                  {isCompleteZip && !matchedArea && (
                    <motion.div key="unmatched" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="mt-2 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>We serve the greater Chattanooga and North Georgia area. Send your details and we will confirm your service day with your quote.</span>
                    </motion.div>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-foreground">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="twice-weekly">2X Weekly Service</SelectItem>
                    <SelectItem value="weekly">Weekly Service</SelectItem>
                    <SelectItem value="biweekly">Bi-Weekly Service</SelectItem>
                    <SelectItem value="onetime">One-Time Cleanup</SelectItem>
                    <SelectItem value="custom">Custom Service</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-foreground">
                      <SelectValue placeholder="Select number of dogs" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Dog' : 'Dogs'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your yard size, gate access, or any special requirements..." 
                  className="text-foreground resize-none" 
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            {isSubmitting ? 'Submitting...' : 'Request Free Quote'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuoteForm;
