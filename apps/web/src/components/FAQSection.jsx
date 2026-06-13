import React from &rsquo;react&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from &rsquo;@/components/ui/accordion&rsquo;;
import { getFaqData } from &rsquo;@/data/faqData.js&rsquo;;

const FAQSection = ({ location = &rsquo;Chattanooga&rsquo;, showHeader = true }) => {
  const faqCategories = getFaqData(location);

  return (
    <section className=&rdquo;py-16 md:py-24 bg-background&rdquo;>
      <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
        {showHeader && (
          <div className=&rdquo;text-center mb-16&rdquo;>
            <h2 className=&rdquo;text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight&rdquo;>
              Frequently Asked Questions
            </h2>
            <p className=&rdquo;text-lg text-muted-foreground max-w-2xl mx-auto&rdquo;>
              Everything you need to know about our professional pet waste removal services in {location}.
            </p>
          </div>
        )}

        {faqCategories.map((category, categoryIndex) => (
          <motion.div 
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: &rdquo;-100px&rdquo; }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className=&rdquo;mb-12&rdquo;
          >
            <h3 className=&rdquo;text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border/50&rdquo;>
              {category.title}
            </h3>
            
            <Accordion type=&rdquo;single&rdquo; collapsible className=&rdquo;w-full space-y-4&rdquo;>
              {category.faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${categoryIndex}-${index}`}
                  className=&rdquo;bg-card border border-border rounded-xl px-6 shadow-sm data-[state=open]:border-primary/20 data-[state=open]:shadow-md transition-all duration-200&rdquo;
                >
                  <AccordionTrigger className=&rdquo;text-left text-lg font-semibold text-foreground hover:text-primary py-6&rdquo;>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className=&rdquo;text-muted-foreground leading-relaxed pb-6 text-base&rdquo;>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;