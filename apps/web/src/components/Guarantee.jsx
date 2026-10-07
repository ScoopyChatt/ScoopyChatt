import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import guarantee from '@/data/guarantee.json';

// The No-Poop-Left-Behind Guarantee. Wording lives in src/data/guarantee.json,
// which the build tools (inject-seo, create-static-pages, generate-llms) also read,
// so the on-page text, the prerendered HTML and the schema never drift apart.
export { guarantee };

// Compact pill: guarantee name plus the short wording. For hero areas, next to
// CTAs and submit buttons. tone="onPrimary" for use on bg-primary sections.
export const GuaranteeBadge = ({ tone = 'light', className }) => (
  <p
    className={cn(
      'inline-flex max-w-full items-start sm:items-center gap-2 rounded-2xl sm:rounded-full border px-4 py-2 text-sm leading-snug text-left sm:text-center',
      tone === 'onPrimary'
        ? 'border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground'
        : 'border-primary/30 bg-primary/5 text-foreground',
      className
    )}
  >
    <ShieldCheck
      className={cn('h-5 w-5 flex-shrink-0', tone === 'onPrimary' ? 'text-primary-foreground' : 'text-primary')}
      aria-hidden="true"
    />
    <span>
      <strong className="font-semibold">{guarantee.entity}:</strong> {guarantee.short}
    </span>
  </p>
);

// Full card: guarantee name as a heading plus the full wording, with the
// "No contracts..." tagline underneath when showTagline is set.
export const GuaranteeBanner = ({ headingLevel = 'h2', showTagline = false, className }) => {
  const Heading = headingLevel;
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8 text-center sm:text-left',
        className
      )}
    >
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <Heading className="mb-2 text-2xl font-bold text-foreground">{guarantee.name}</Heading>
        <p className="text-lg text-foreground">{guarantee.full}</p>
        {showTagline && (
          <p className="mt-3 text-sm font-medium text-muted-foreground">{guarantee.tagline}</p>
        )}
      </div>
    </div>
  );
};

// One line of plain text: the tagline pairing.
export const GuaranteeTagline = ({ className }) => (
  <p className={cn('text-sm font-medium', className)}>{guarantee.tagline}</p>
);
