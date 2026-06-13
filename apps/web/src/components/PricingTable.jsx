
import React from &rsquo;react&rsquo;;
import { CheckCircle2, Info } from &rsquo;lucide-react&rsquo;;
import CTAButton from &rsquo;@/components/CTAButton.jsx&rsquo;;
import { cn } from &rsquo;@/lib/utils.js&rsquo;;

const PricingTable = ({ tiers }) => {
  return (
    <div className=&rdquo;space-y-6&rdquo;>
      {tiers.map((tier, index) => (
        <div 
          key={index} 
          className={cn(
            &rdquo;pricing-row relative overflow-hidden&rdquo;,
            tier.recommended ? &rdquo;border-2 border-primary shadow-md&rdquo; : &rdquo;&rdquo;
          )}
        >
          {tier.recommended && (
            <div className=&rdquo;absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider z-10&rdquo;>
              Most Popular
            </div>
          )}
          
          <div className=&rdquo;lg:w-1/4&rdquo;>
            <h3 className=&rdquo;text-xl md:text-2xl font-bold text-foreground mb-2&rdquo;>{tier.name}</h3>
            <p className=&rdquo;text-muted-foreground text-sm&rdquo;>{tier.description}</p>
          </div>
          
          <div className=&rdquo;lg:w-1/4 flex flex-col&rdquo;>
            <div className=&rdquo;flex items-baseline text-foreground&rdquo;>
              <span className=&rdquo;text-sm font-semibold mt-1 mr-1 text-muted-foreground&rdquo;>Starts at</span>
              <span className=&rdquo;text-3xl md:text-4xl font-extrabold tabular-numbers-pricing&rdquo;>${tier.price}</span>
            </div>
            <span className=&rdquo;text-muted-foreground font-medium text-sm mt-1&rdquo;>{tier.frequency}</span>
          </div>
          
          <div className=&rdquo;lg:w-1/3&rdquo;>
            <ul className=&rdquo;space-y-2&rdquo;>
              {tier.benefits.map((benefit, bIndex) => (
                <li key={bIndex} className=&rdquo;flex items-start text-sm text-foreground&rdquo;>
                  <CheckCircle2 className=&rdquo;w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5&rdquo; />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className=&rdquo;lg:w-1/6 flex justify-end w-full&rdquo;>
            <CTAButton to=&rdquo;/quote&rdquo; variant={tier.recommended ? &rdquo;default&rdquo; : &rdquo;outline&rdquo;} className=&rdquo;w-full&rdquo;>
              Get Quote
            </CTAButton>
          </div>
        </div>
      ))}
      
      <div className=&rdquo;bg-muted p-6 rounded-2xl flex items-start space-x-4 border border-border&rdquo;>
        <Info className=&rdquo;w-6 h-6 text-primary flex-shrink-0 mt-1&rdquo; />
        <p className=&rdquo;text-sm text-muted-foreground&rdquo;>
          <strong>Pricing Note:</strong> Prices listed are starting rates per visit for an average-sized yard with 1 dog. Additional dogs and significantly oversized yards may incur a small additional fee per visit.
        </p>
      </div>
    </div>
  );
};

export default PricingTable;
