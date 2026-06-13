import React from &rsquo;react&rsquo;;
import { useNavigate } from &rsquo;react-router-dom&rsquo;;
import { useForm } from &rsquo;react-hook-form&rsquo;;
import { zodResolver } from &rsquo;@hookform/resolvers/zod&rsquo;;
import * as z from &rsquo;zod&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { Input } from &rsquo;@/components/ui/input&rsquo;;
import { Textarea } from &rsquo;@/components/ui/textarea&rsquo;;
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from &rsquo;@/components/ui/select&rsquo;;
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from &rsquo;@/components/ui/form&rsquo;;
import { toast } from &rsquo;sonner&rsquo;;
import apiServerClient from &rsquo;@/lib/apiServerClient.js&rsquo;;

const formSchema = z.object({
  name: z.string().min(2, &rsquo;Name must be at least 2 characters&rsquo;),
  email: z.string().email(&rsquo;Please enter a valid email address&rsquo;),
  phone: z.string().min(10, &rsquo;Please enter a valid phone number&rsquo;),
  serviceZipCode: z.string().regex(/^\d{5}$/, &rsquo;Must be a valid 5-digit zip code&rsquo;),
  serviceType: z.string().min(1, &rsquo;Please select a service type&rsquo;),
  numberOfDogs: z.string().min(1, &rsquo;Please select the number of dogs&rsquo;),
  additionalNotes: z.string().optional(),
});

const QuoteForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: &rsquo;onChange&rsquo;,
    defaultValues: {
      name: &rsquo;&rsquo;,
      email: &rsquo;&rsquo;,
      phone: &rsquo;&rsquo;,
      serviceZipCode: &rsquo;&rsquo;,
      serviceType: &rsquo;&rsquo;,
      numberOfDogs: &rsquo;&rsquo;,
      additionalNotes: &rsquo;&rsquo;,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values) => {
    try {
      // Ensure numberOfDogs is sent as a number if needed by the backend, 
      // though Zapier often accepts strings. We will cast it based on standard practices.
      const submitData = {
        ...values,
        numberOfDogs: parseInt(values.numberOfDogs, 10),
      };

      const response = await apiServerClient.fetch(&rsquo;/quote-webhook&rsquo;, {
        method: &rsquo;POST&rsquo;,
        headers: { &rsquo;Content-Type&rsquo;: &rsquo;application/json&rsquo; },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        let errorMessage = &rsquo;Failed to submit quote request&rsquo;;
        try {
          const errorData = await response.json();
          if (errorData.error) errorMessage = errorData.error;
        } catch (e) {
          // If response is not JSON, fallback to generic error
        }
        throw new Error(errorMessage);
      }
      
      // Await successful response parsing as per requirements
      await response.json();
      
      toast.success(&rsquo;Quote submitted successfully&rsquo;);
      form.reset();
      
      // Redirect to thank you page after successful submission
      navigate(&rsquo;/thank-you&rsquo;);
    } catch (error) {
      console.error(&rsquo;Submission error:&rsquo;, error);
      toast.error(error.message || &rsquo;Connection failed. Please try again.&rsquo;);
    }
  };

  const onError = () => {
    toast.error(&rsquo;Please fill in all required fields correctly.&rsquo;);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className=&rdquo;space-y-6&rdquo;>
        <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-6&rdquo;>
          <FormField
            control={form.control}
            name=&rdquo;name&rdquo;
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder=&rdquo;Enter your full name&rdquo; 
                    className=&rdquo;text-foreground&rdquo; 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name=&rdquo;email&rdquo;
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input 
                    type=&rdquo;email&rdquo; 
                    placeholder=&rdquo;your.email@example.com&rdquo; 
                    className=&rdquo;text-foreground&rdquo; 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name=&rdquo;phone&rdquo;
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input 
                    type=&rdquo;tel&rdquo; 
                    placeholder=&rdquo;(555) 123-4567&rdquo; 
                    className=&rdquo;text-foreground&rdquo; 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name=&rdquo;serviceZipCode&rdquo;
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Zip Code *</FormLabel>
                <FormControl>
                  <Input 
                    inputMode=&rdquo;numeric&rdquo;
                    maxLength={5}
                    placeholder=&rdquo;e.g. 37402&rdquo; 
                    className=&rdquo;text-foreground&rdquo; 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name=&rdquo;serviceType&rdquo;
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className=&rdquo;text-foreground&rdquo;>
                      <SelectValue placeholder=&rdquo;Select a service&rdquo; />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value=&rdquo;twice-weekly&rdquo;>2X Weekly Service</SelectItem>
                    <SelectItem value=&rdquo;weekly&rdquo;>Weekly Service</SelectItem>
                    <SelectItem value=&rdquo;biweekly&rdquo;>Bi-Weekly Service</SelectItem>
                    <SelectItem value=&rdquo;onetime&rdquo;>One-Time Cleanup</SelectItem>
                    <SelectItem value=&rdquo;custom&rdquo;>Custom Service</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name=&rdquo;numberOfDogs&rdquo;
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Dogs *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className=&rdquo;text-foreground&rdquo;>
                      <SelectValue placeholder=&rdquo;Select number of dogs&rdquo; />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? &rsquo;Dog&rsquo; : &rsquo;Dogs&rsquo;}
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
          name=&rdquo;additionalNotes&rdquo;
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder=&rdquo;Tell us about your yard size, gate access, or any special requirements...&rdquo; 
                  className=&rdquo;text-foreground resize-none&rdquo; 
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
          className=&rdquo;relative&rdquo; 
          onClick={() => {
            if (!isValid && !isSubmitting) {
              toast.error(&rsquo;Please fill in all required fields correctly.&rsquo;);
              form.trigger();
            }
          }}
        >
          <Button 
            type=&rdquo;submit&rdquo; 
            disabled={!isValid || isSubmitting} 
            className=&rdquo;w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed&rdquo;
          >
            {isSubmitting ? &rsquo;Submitting...&rsquo; : &rsquo;Request Free Quote&rsquo;}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuoteForm;