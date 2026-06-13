import React from &rsquo;react&rsquo;;
import { Star } from &rsquo;lucide-react&rsquo;;

const GoogleBusinessFeedWidget = () => {
  return (
    <div className=&rdquo;flex justify-center mb-8&rdquo;>
      <div className=&rdquo;inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow duration-200&rdquo;>
        <div className=&rdquo;flex gap-1&rdquo;>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className=&rdquo;h-5 w-5 fill-amber-400 text-amber-400&rdquo;
              aria-hidden=&rdquo;true&rdquo;
            />
          ))}
        </div>
        <span className=&rdquo;text-sm font-semibold text-foreground&rdquo;>
          85+ 5-Star Reviews
        </span>
      </div>
    </div>
  );
};

export default GoogleBusinessFeedWidget;