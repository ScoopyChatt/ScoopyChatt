
import React from &rsquo;react&rsquo;;
import { Link, useLocation } from &rsquo;react-router-dom&rsquo;;
import { Phone } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;

const Header = () => {
  const location = useLocation();

  const mainLinks = [
    { name: &rsquo;Home&rsquo;, path: &rsquo;/&rsquo; },
    { name: &rsquo;Dog Poop Removal&rsquo;, path: &rsquo;/services&rsquo; },
    { name: &rsquo;How It Works&rsquo;, path: &rsquo;/how-it-works&rsquo; },
    { name: &rsquo;Service Areas&rsquo;, path: &rsquo;/near-me&rsquo; },
    { name: &rsquo;One-Time Cleanup&rsquo;, path: &rsquo;/one-time-cleanup&rsquo; },
    { name: &rsquo;Blog&rsquo;, path: &rsquo;/blog&rsquo; },
    { name: &rsquo;Contact&rsquo;, path: &rsquo;/quote&rsquo; }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className=&rdquo;sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm&rdquo;>
      <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
        <div className=&rdquo;flex flex-col lg:flex-row items-center justify-between py-3 lg:h-20 lg:py-0 gap-3 lg:gap-0&rdquo;>
          
          {/* Logo & CTA Row (Mobile view keeps them inline) */}
          <div className=&rdquo;flex items-center justify-between w-full lg:w-auto&rdquo;>
            <Link to=&rdquo;/&rdquo; className=&rdquo;flex items-center space-x-2 transition-opacity hover:opacity-90 outline-none rounded-md focus-visible:ring-2 focus-visible:ring-primary&rdquo;>
              <img 
                src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/7f889d94bae15b826df9c1daf461a7b9.png&rdquo; 
                alt=&rdquo;Scoopy Chatt pet waste removal logo&rdquo; 
                className=&rdquo;w-[60px] md:w-[75px] h-auto object-contain&rdquo;
              />
            </Link>
            
            {/* Mobile Actions */}
            <div className=&rdquo;flex lg:hidden items-center space-x-3&rdquo;>
              <a href=&rdquo;tel:423-600-5040&rdquo; className=&rdquo;text-primary hover:text-primary/80 transition-colors p-2&rdquo;>
                <Phone className=&rdquo;h-5 w-5&rdquo; />
              </a>
              <Button asChild size=&rdquo;sm&rdquo; className=&rdquo;bg-primary text-primary-foreground font-bold shadow-md h-9&rdquo;>
                <Link to=&rdquo;/quote&rdquo;>Get Quote</Link>
              </Button>
            </div>
          </div>

          {/* Horizontal Navigation */}
          <nav className=&rdquo;flex items-center justify-start lg:justify-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar w-full lg:w-auto -mx-4 px-4 lg:mx-0 lg:px-0 pb-1 lg:pb-0&rdquo; aria-label=&rdquo;Main Navigation&rdquo;>
            {mainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 sm:px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 ${
                  isActive(link.path) ? &rsquo;text-primary bg-primary/10&rsquo; : &rsquo;text-foreground hover:text-primary hover:bg-muted&rsquo;
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className=&rdquo;hidden lg:flex items-center space-x-4&rdquo;>
            <a
              href=&rdquo;tel:423-600-5040&rdquo;
              className=&rdquo;flex items-center space-x-2 px-3 py-2 text-sm font-bold text-foreground hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg&rdquo;
            >
              <Phone className=&rdquo;h-4 w-4 text-primary&rdquo; />
              <span>423-600-5040</span>
            </a>
            <Button asChild size=&rdquo;lg&rdquo; className=&rdquo;bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] h-12 px-6 rounded-xl font-bold shadow-md&rdquo;>
              <Link to=&rdquo;/quote&rdquo;>Get Free Quote</Link>
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
