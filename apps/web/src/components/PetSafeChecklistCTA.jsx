import React, { useState } from &rsquo;react&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { toast } from &rsquo;sonner&rsquo;;
import { Loader2, Download, ShieldCheck } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { Input } from &rsquo;@/components/ui/input&rsquo;;
import { Label } from &rsquo;@/components/ui/label&rsquo;;
import pb from &rsquo;@/lib/pocketbaseClient&rsquo;;

const PetSafeChecklistCTA = () => {
  const [formData, setFormData] = useState({ name: &rsquo;&rsquo;, email: &rsquo;&rsquo; });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      await pb.collection(&rsquo;checklist_signups&rsquo;).create({
        name: formData.name,
        email: formData.email
      }, { $autoCancel: false });

      toast.success(&rsquo;Thank you! Check your email for the checklist.&rsquo;);
      setFormData({ name: &rsquo;&rsquo;, email: &rsquo;&rsquo; });
    } catch (error) {
      console.error(&rsquo;Checklist signup error:&rsquo;, error);
      toast.error(error.message || &rsquo;Something went wrong. Please try again.&rsquo;);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className=&rdquo;py-24 bg-background relative overflow-hidden&rdquo;>
      {/* Decorative background blur */}
      <div className=&rdquo;absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none&rdquo; />
      <div className=&rdquo;absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none&rdquo; />

      <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10&rdquo;>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=&rdquo;rounded-[2rem] overflow-hidden shadow-2xl border border-border bg-card flex flex-col lg:flex-row&rdquo;
        >
          {/* Left Column: Content and Form */}
          <div className=&rdquo;p-8 md:p-12 lg:p-16 lg:w-1/2 flex flex-col justify-center bg-card relative&rdquo;>
            <div className=&rdquo;inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-6 w-fit&rdquo;>
              <ShieldCheck className=&rdquo;w-4 h-4 mr-2&rdquo; />
              <span className=&rdquo;text-sm font-semibold tracking-wide&rdquo;>Free Download</span>
            </div>
            
            <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground tracking-tight&rdquo;>
              Get Your Free Pet-Safe Yard Checklist!
            </h2>
            
            <p className=&rdquo;text-muted-foreground text-lg mb-8 leading-relaxed&rdquo;>
              Tired of a messy lawn? Worried about pet safety? Download our FREE checklist, &rdquo;10 Tips for a Pet-Safe & Clean Yard,&rdquo; and learn the secrets to creating a beautiful outdoor space that&rsquo;s safe for your family and your furry friends.
            </p>

            <form onSubmit={handleSubmit} className=&rdquo;space-y-5 relative z-10&rdquo;>
              <div className=&rdquo;space-y-2&rdquo;>
                <Label htmlFor=&rdquo;name&rdquo; className=&rdquo;text-foreground font-medium&rdquo;>Your Name</Label>
                <Input 
                  id=&rdquo;name&rdquo;
                  name=&rdquo;name&rdquo;
                  type=&rdquo;text&rdquo; 
                  placeholder=&rdquo;Maya Chen&rdquo; 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  disabled={isSubmitting}
                  className=&rdquo;h-12 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-secondary&rdquo;
                />
              </div>
              
              <div className=&rdquo;space-y-2&rdquo;>
                <Label htmlFor=&rdquo;email&rdquo; className=&rdquo;text-foreground font-medium&rdquo;>Your Email Address</Label>
                <Input 
                  id=&rdquo;email&rdquo;
                  name=&rdquo;email&rdquo;
                  type=&rdquo;email&rdquo; 
                  placeholder=&rdquo;maya@example.com&rdquo; 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  disabled={isSubmitting}
                  className=&rdquo;h-12 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-secondary&rdquo;
                />
              </div>

              <Button 
                type=&rdquo;submit&rdquo; 
                size=&rdquo;lg&rdquo; 
                disabled={isSubmitting}
                className=&rdquo;w-full h-14 text-lg rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-secondary/20 mt-4&rdquo;
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className=&rdquo;mr-2 h-5 w-5 animate-spin&rdquo; />
                    Sending...
                  </>
                ) : (
                  <>
                    <Download className=&rdquo;mr-2 h-5 w-5&rdquo; />
                    Download My Free Checklist
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right Column: Visual */}
          <div className=&rdquo;lg:w-1/2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-full bg-muted&rdquo;>
            <img 
              src=&rdquo;https://images.unsplash.com/photo-1628040668080-ce0f5bccfa70&rdquo; 
              alt=&rdquo;happy dog playing in clean green yard&rdquo; 
              className=&rdquo;absolute inset-0 w-full h-full object-cover&rdquo;
            />
            {/* Subtle gradient overlay to blend image with the card on desktop */}
            <div className=&rdquo;absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-card lg:via-card/20 lg:to-transparent&rdquo; />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PetSafeChecklistCTA;