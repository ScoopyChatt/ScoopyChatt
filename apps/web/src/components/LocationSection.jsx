import React from &rsquo;react&rsquo;;
import { MapPin } from &rsquo;lucide-react&rsquo;;
import ServiceAreaGrid from &rsquo;@/components/ServiceAreaGrid.jsx&rsquo;;
import CTAButton from &rsquo;@/components/CTAButton.jsx&rsquo;;
import { serviceAreas } from &rsquo;@/data/serviceAreas.js&rsquo;;
const LocationSection = () => {
  return <section className=&rdquo;section-spacing bg-muted/30 border-y border-border&rdquo;>
      <div className=&rdquo;container-shell&rdquo;>
        <div className=&rdquo;grid grid-cols-1 lg:grid-cols-12 gap-12 items-start&rdquo;>
          <div className=&rdquo;lg:col-span-4 sticky top-24&rdquo;>
            <div className=&rdquo;inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase&rdquo;>
              <MapPin className=&rdquo;w-4 h-4 mr-2&rdquo; />
              Service Areas
            </div>
            <h2 className=&rdquo;mb-6&rdquo;>Serving Chattanooga & Surrounding Communities</h2>
            <p className=&rdquo;text-muted-foreground mb-8&rdquo;>
              We provide professional dog waste removal services across the Greater Chattanooga area. Check our list to see if we&rsquo;re currently scooping in your neighborhood.
            </p>
            <CTAButton to=&rdquo;/quote&rdquo; className=&rdquo;w-full sm:w-auto&rdquo;>Check Availability</CTAButton>
          </div>
          
          <div className=&rdquo;lg:col-span-8&rdquo;>
            <ServiceAreaGrid areas={serviceAreas} />
          </div>
        </div>
      </div>
    </section>;
};
export default LocationSection;