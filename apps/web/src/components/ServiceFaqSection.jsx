import React from 'react';
import { serviceFaqs } from '@/data/serviceFaqs.js';

// Visible Q&A block for a service page. The same data is written into the prerendered HTML
// by tools/service-faqs.cjs, so crawlers and visitors read identical answers.
const ServiceFaqSection = ({ route }) => {
  const block = serviceFaqs[route];
  if (!block) return null;
  return (
    <section className="py-12 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">{block.heading}</h2>
        {block.items.map((f) => (
          <div key={f.q} className="mb-5">
            <h3 className="text-lg font-semibold text-foreground mb-1">{f.q}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFaqSection;
