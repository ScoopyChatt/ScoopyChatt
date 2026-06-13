
import React from &rsquo;react&rsquo;;
import { CheckCircle2, Star } from &rsquo;lucide-react&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;

const PetSafeChecklistLandingPage = () => {
  const checklistItems = [
    &rdquo;The 5 most common garden plants that are toxic to dogs&rdquo;,
    &rdquo;A simple trick to secure any fence from digging or climbing&rdquo;,
    &rdquo;How to choose lawn care products that are 100% pet-safe&rdquo;,
    &rdquo;The #1 health reason to keep your yard free of pet waste&rdquo;
  ];

  return (
    <>
      <SEOHead path=&rdquo;/pet-safe-checklist&rdquo; />

      <main className=&rdquo;min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 overflow-hidden relative&rdquo;>
        {/* Background Pattern */}
        <div className=&rdquo;absolute inset-0 bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none&rdquo; />
        
        {/* Decorative background glows */}
        <div className=&rdquo;absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none&rdquo; />
        <div className=&rdquo;absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none&rdquo; />

        <div className=&rdquo;max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10&rdquo;>
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=&rdquo;text-center mb-16&rdquo;
          >
            {/* Prominent Headline for FREE DOWNLOAD */}
            <div className=&rdquo;inline-block mb-8&rdquo;>
              <span className=&rdquo;block text-3xl md:text-4xl lg:text-5xl font-black text-primary uppercase tracking-widest drop-shadow-sm&rdquo;>
                Free Download
              </span>
              <div className=&rdquo;h-1.5 w-1/3 bg-primary mx-auto mt-4 rounded-full opacity-30&rdquo;></div>
            </div>
            
            <h1 className=&rdquo;text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-foreground mb-6&rdquo; style={{ letterSpacing: &rsquo;-0.02em&rsquo; }}>
              Create the Perfect Yard for Your Pet
            </h1>
            <p className=&rdquo;text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed&rdquo;>
              Tired of a messy lawn? Worried about pet safety? Download our FREE checklist and learn the secrets to creating a beautiful outdoor space that&rsquo;s safe for your family and your furry friends.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className=&rdquo;grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20&rdquo;>
            
            {/* Left Column: Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className=&rdquo;flex flex-col space-y-8&rdquo;
            >
              {/* Scoopy Chatt Logo Graphic */}
              <div className=&rdquo;relative rounded-3xl overflow-hidden shadow-lg border border-border/60 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-12 aspect-[4/3]&rdquo;>
                <div className=&rdquo;absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0,transparent_100%)] pointer-events-none&rdquo; />
                <img 
                  src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/7f889d94bae15b826df9c1daf461a7b9.png&rdquo; 
                  alt=&rdquo;Scoopy Chatt Logo&rdquo; 
                  className=&rdquo;w-full max-w-[260px] md:max-w-[300px] h-auto object-contain relative z-10 drop-shadow-sm transition-transform duration-700 hover:scale-105&rdquo;
                />
              </div>

              {/* Checklist Content */}
              <div className=&rdquo;bg-card border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden&rdquo;>
                <div className=&rdquo;absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none&rdquo; />
                
                <h2 className=&rdquo;text-2xl font-bold text-foreground mb-6 relative z-10&rdquo;>Inside, You&rsquo;ll Discover:</h2>
                <ul className=&rdquo;space-y-5 relative z-10&rdquo;>
                  {checklistItems.map((item, index) => (
                    <li key={index} className=&rdquo;flex items-start&rdquo;>
                      <div className=&rdquo;bg-primary/10 rounded-full p-1 mr-4 shrink-0 mt-0.5&rdquo;>
                        <CheckCircle2 className=&rdquo;w-5 h-5 text-primary&rdquo; />
                      </div>
                      <span className=&rdquo;text-foreground/90 leading-relaxed font-medium&rdquo;>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Google Form Iframe */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className=&rdquo;bg-card rounded-3xl shadow-xl border border-border/80 overflow-hidden relative min-h-[700px] flex flex-col&rdquo;
            >
              <div className=&rdquo;bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-5 border-b border-border&rdquo;>
                <h3 className=&rdquo;text-lg font-bold text-foreground text-center&rdquo;>
                  Where should we send your checklist?
                </h3>
              </div>
              <div className=&rdquo;flex-grow w-full h-[800px] -mt-4 bg-white&rdquo;>
                <iframe 
                  src=&rdquo;https://docs.google.com/forms/d/e/1FAIpQLScbaF6PTn8ALcU4yePXrUkrvhotEg5ywJtp86DvFx-gJxwy2Q/viewform?usp=publish-editor&rdquo; 
                  className=&rdquo;w-full h-full border-0&rdquo;
                  title=&rdquo;Pet-Safe Yard Checklist Signup Form&rdquo;
                  aria-label=&rdquo;Signup form for free checklist&rdquo;
                  marginHeight=&rdquo;0&rdquo; 
                  marginWidth=&rdquo;0&rdquo;
                >
                  Loading&hellip;
                </iframe>
              </div>
            </motion.div>
          </div>

          {/* Social Proof Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className=&rdquo;bg-secondary/5 border border-secondary/20 rounded-[2rem] p-10 md:p-14 text-center max-w-4xl mx-auto shadow-sm relative overflow-hidden&rdquo;
          >
            <div className=&rdquo;absolute inset-0 bg-white/40 dark:bg-black/20 pointer-events-none&rdquo; />
            <div className=&rdquo;relative z-10&rdquo;>
              <h2 className=&rdquo;text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance&rdquo;>
                Join Hundreds of Happy Pet Owners in Chattanooga!
              </h2>
              <div className=&rdquo;flex flex-col items-center justify-center space-y-4&rdquo;>
                <div className=&rdquo;flex items-center space-x-1.5 bg-white dark:bg-card px-4 py-2 rounded-full shadow-sm border border-border&rdquo;>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className=&rdquo;w-6 h-6 fill-[#F59E0B] text-[#F59E0B]&rdquo; />
                  ))}
                </div>
                <p className=&rdquo;text-lg font-semibold text-foreground/80&rdquo;>
                  85+ Five-Star Reviews on Google
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
};

export default PetSafeChecklistLandingPage;
