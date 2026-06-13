
import React from &rsquo;react&rsquo;;
import { Star } from &rsquo;lucide-react&rsquo;;

const TestimonialCard = ({ quote, author, location, rating = 5 }) => {
  return (
    <div className=&rdquo;bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border h-full flex flex-col&rdquo;>
      <div className=&rdquo;flex mb-4&rdquo;>
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className=&rdquo;w-5 h-5 fill-primary text-primary&rdquo; />
        ))}
      </div>
      <blockquote className=&rdquo;text-lg text-foreground font-medium italic mb-6 flex-grow leading-relaxed&rdquo;>
        &rdquo;{quote}&rdquo;
      </blockquote>
      <div className=&rdquo;mt-auto pt-4 border-t border-border/50&rdquo;>
        <div className=&rdquo;font-bold text-foreground&rdquo;>{author}</div>
        <div className=&rdquo;text-sm text-muted-foreground&rdquo;>{location}</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
