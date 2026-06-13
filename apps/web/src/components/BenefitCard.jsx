import React from &rsquo;react&rsquo;;

const BenefitCard = ({ icon: Icon, title, description, variant = &rsquo;default&rsquo; }) => {
  return (
    <div className={`flex flex-col h-full rounded-xl p-6 transition-all duration-300 ${
      variant === &rsquo;elevated&rsquo; 
        ? &rsquo;bg-card shadow-lg hover:shadow-xl&rsquo; 
        : &rsquo;bg-muted hover:bg-muted/80&rsquo;
    }`}>
      <div className=&rdquo;flex items-center space-x-3 mb-4&rdquo;>
        <div className=&rdquo;flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center&rdquo;>
          <Icon className=&rdquo;h-6 w-6 text-primary&rdquo; />
        </div>
        <h3 className=&rdquo;text-lg font-semibold text-balance&rdquo;>{title}</h3>
      </div>
      <p className=&rdquo;text-sm text-muted-foreground leading-relaxed&rdquo;>
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;