
import React from &rsquo;react&rsquo;;
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from &rdquo;@/components/ui/accordion&rdquo;;

const FAQAccordion = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <Accordion type=&rdquo;single&rdquo; collapsible className=&rdquo;w-full&rdquo;>
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className=&rdquo;border-border&rdquo;>
          <AccordionTrigger className=&rdquo;text-left text-lg font-semibold hover:text-primary transition-colors&rdquo;>
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className=&rdquo;text-muted-foreground text-base leading-relaxed&rdquo;>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
