import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { Phone, CalendarCheck } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;

const FloatingCTA = () => {
  return (
    <div className=&rdquo;fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]&rdquo;>
      <div className=&rdquo;flex items-center justify-between gap-4 max-w-7xl mx-auto&rdquo;>
        <a href=&rdquo;tel:423-600-5040&rdquo; className=&rdquo;flex items-center justify-center gap-2 flex-1 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors&rdquo;>
          <Phone className=&rdquo;h-4 w-4 text-primary&rdquo; />
          423-600-5040
        </a>
        <Button asChild className=&rdquo;flex-1 bg-[#FF9E30] text-white hover:bg-[#FF9E30]/90 shadow-lg active:scale-95 transition-transform&rdquo;>
          <Link to=&rdquo;/quote&rdquo;>
            <CalendarCheck className=&rdquo;h-4 w-4 mr-2&rdquo; />
            Get Quote
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FloatingCTA;