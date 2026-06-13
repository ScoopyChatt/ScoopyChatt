
import React from &rsquo;react&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;

const GoogleReviewsElfsight = () => {
  return (
    <section className=&rdquo;py-16 md:py-24 bg-muted/20 border-y border-border/50 overflow-hidden&rdquo;>
      <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className=&rdquo;text-center mb-12&rdquo;
        >
          <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground&rdquo;>
            What Our Customers Say
          </h2>
          <p className=&rdquo;text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed&rdquo;>
            Don&rsquo;t just take our word for it. See why pet owners across Chattanooga trust Scoopy Doo to keep their yards clean.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=&rdquo;w-full flex justify-center min-h-[300px]&rdquo;
        >
          <div 
            className=&rdquo;w-full&rdquo;
            dangerouslySetInnerHTML={{ 
              __html: &rsquo;<script src=&rdquo;https://elfsightcdn.com/platform.js&rdquo; async></script><div class=&rdquo;elfsight-app-8240dd2e-e144-493a-add7-52c8fd1b05f7&rdquo; data-elfsight-app-lazy></div>&rsquo; 
            }} 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviewsElfsight;
