import React from 'react';
import { cn } from '@/lib/utils.js';

// BBB seal and aPaws membership, shown small next to the quote form where a stranger
// decides whether to hand over a phone number. Plain images, no links, so the paid
// landing page keeps its no-exit rule. The linked versions live in the footer.
const TrustBadges = ({ className }) => (
  <div className={cn('flex items-center justify-center gap-5', className)}>
    <img
      src="https://seal-chattanooga.bbb.org/logo/sehzbum/bbb-80013696.png"
      alt="Scoopy Doo, LLC BBB Business Review"
      loading="lazy"
      className="h-10 w-auto"
    />
    <img
      src="/images/apaws-proud-member.webp"
      alt="aPaws Proud Member - Association of Professional Animal Waste Specialists"
      width="220"
      height="104"
      loading="lazy"
      className="h-10 w-auto"
    />
  </div>
);

export default TrustBadges;
