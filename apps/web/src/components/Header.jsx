import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Services sit under one menu on desktop so the quote button stands out; the blog
// lives in the footer. On phones the links scroll in one row, so they stay flat.
const serviceLinks = [
  { name: 'Recurring Scooping', path: '/services' },
  { name: 'One-Time Cleanup', path: '/one-time-cleanup' },
  { name: 'Commercial & HOA', path: '/commercial' },
  { name: 'Doggy Doors', path: '/doggy-doors' },
  { name: 'How It Works', path: '/how-it-works' },
];

const topLinks = [
  { name: 'Pricing', path: '/pricing' },
  { name: 'Service Areas', path: '/service-areas' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Contact', path: '/contact' },
];

const mobileLinks = [
  { name: 'Services', path: '/services' },
  ...topLinks.slice(0, 3),
  { name: 'One-Time Cleanup', path: '/one-time-cleanup' },
  { name: 'Doggy Doors', path: '/doggy-doors' },
  { name: 'How It Works', path: '/how-it-works' },
  topLinks[3],
];

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const servicesActive = serviceLinks.some((l) => isActive(l.path));
  const linkClass = (active) =>
    `px-3 py-2 text-sm font-semibold whitespace-nowrap rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 ${
      active ? 'text-primary bg-primary/10' : 'text-foreground hover:text-primary hover:bg-muted'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-36">
        <div className="flex flex-col lg:flex-row items-center justify-between py-3 lg:h-20 lg:py-0 gap-3 lg:gap-0">

          {/* Logo & CTA Row (Mobile view keeps them inline) */}
          <div className="flex items-center justify-between w-full lg:w-auto shrink-0 lg:mr-10">
            <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90 outline-none rounded-md focus-visible:ring-2 focus-visible:ring-primary">
              <img
                src="/scoopy-logo-160.webp"
                srcSet="/scoopy-logo-160.webp 160w, /scoopy-logo.webp 400w"
                sizes="75px"
                alt="Scoopy Doo pet waste removal logo"
                width="400"
                height="373"
                className="w-[60px] md:w-[75px] h-auto object-contain"
              />
            </Link>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-3">
              <a href="tel:423-600-5040" className="text-primary hover:text-primary/80 transition-colors p-2" aria-label="Call 423-600-5040">
                <Phone className="h-5 w-5" />
              </a>
              <Button asChild size="sm" className="bg-primary text-primary-foreground font-bold shadow-md h-9">
                <Link to="/quote">Get My Instant Price</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation: one scrolling row */}
          <nav className="flex lg:hidden items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar w-full min-w-0 -mx-4 px-4 pb-1" aria-label="Main Navigation">
            {mobileLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(isActive(link.path))}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center gap-1" aria-label="Main Navigation">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className={linkClass(servicesActive) + ' inline-flex items-center gap-1'}>
                Services <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[13rem] p-2">
                {serviceLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link to={link.path} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium">
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {topLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(isActive(link.path))}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            <a
              href="tel:423-600-5040"
              className="flex items-center space-x-2 px-3 py-2 text-sm font-bold text-foreground hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>423-600-5040</span>
            </a>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] h-12 px-6 rounded-xl font-bold shadow-md">
              <Link to="/quote">Get My Instant Price</Link>
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
