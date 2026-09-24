
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Globe, Facebook, Instagram, Home, ShieldCheck, Award } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-100 text-slate-600 py-12 md:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src="/scoopy-logo.webp"
              alt="Scoopy Doo - Professional Pooper Scooper Service Logo"
              width="400"
              height="373"
              loading="lazy"
              className="w-32 h-auto bg-white/10 rounded-lg p-2"
            />
            <p className="text-sm text-slate-500 leading-relaxed">
              Professional pet waste removal service making yards cleaner, safer, and more enjoyable for families and their pets. We are your trusted poop pick up company.
            </p>
            {/* Social Media Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=61578292444117" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/scoopychatt/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@scoopy.doo.llc4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
              >
                {/* lucide dropped brand icons, so this one is inline */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.76.12v-3.2a5.78 5.78 0 0 0-.76-.05A5.78 5.78 0 0 0 4.08 15.4a5.78 5.78 0 0 0 5.78 5.78 5.78 5.78 0 0 0 5.78-5.78V9.01a7.35 7.35 0 0 0 4.29 1.38V7.3a4.29 4.29 0 0 1-3.33-1.48z" />
                </svg>
              </a>
              <a
                href="https://www.reddit.com/r/PetWastePros/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join r/PetWastePros on Reddit"
                title="r/PetWastePros"
                className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-[#ff4500] hover:text-white transition-all duration-200 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z"/></svg>
              </a>
              <a
                href="https://www.yelp.com/biz/scoopy-doo-ringgold"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Review us on Yelp"
                className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-[#d32323] hover:text-white transition-all duration-200 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.16 12.73l-4.46 1.44a1.2 1.2 0 0 1-1.52-.79 1.2 1.2 0 0 1 .08-.92l2.23-4.08a.5.5 0 0 1 .68-.19c1.98 1.08 3.14 2.66 3 4.54zm-5.1 3.57l3.61 3.06a.5.5 0 0 1 .06.7c-1.22 1.51-2.97 2.2-4.86 1.83a1.2 1.2 0 0 1-.97-1.39l.71-4.63a1.2 1.2 0 0 1 1.45-.57zm-3.6-.38l-4.7.35a1.2 1.2 0 0 1-1.27-1.1c-.12-1.9.65-3.7 2.21-4.9a.5.5 0 0 1 .7.08l2.93 3.72a1.2 1.2 0 0 1-.87 1.85zM9.1 10.1l-3.43-3.3a.5.5 0 0 1 0-.71C7 4.76 8.85 4.2 10.7 4.6a1.2 1.2 0 0 1 .94 1.41L10.34 9.6a1.2 1.2 0 0 1-1.24.5zm2.44 1.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"/></svg>
              </a>
              <a 
                href="https://www.bing.com/maps?ss=ypid.YNF8F072A96778C51B" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Find us on Bing"
                className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-[#0078d4] hover:text-white transition-all duration-200 active:scale-95"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a 
                href="https://nextdoor.com/page/scoopy-doo-llc-ringgold-ga" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Find us on Nextdoor"
                className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-[#8ED500] hover:text-white transition-all duration-200 active:scale-95"
              >
                <Home className="w-5 h-5" />
              </a>
              <a 
                href="https://www.bbb.org/us/ga/ringgold/profile/pet-waste-removal/scoopy-doo-llc-0483-80013696" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View our BBB Accredited Business profile (A- rating)"
                className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-[#0072ce] hover:text-white transition-all duration-200 active:scale-95"
              >
                <ShieldCheck className="w-5 h-5" />
              </a>
              <a
                href="https://apaws.org/search/details.aspx?id=3031"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View our aPaws member listing (Association of Professional Animal Waste Specialists)"
                className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-[#2e7d32] hover:text-white transition-all duration-200 active:scale-95"
              >
                <Award className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary transition-colors text-sm">Home</Link></li>
<li><Link to="/pricing" className="hover:text-primary transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors text-sm">Dog Poop Removal</Link></li>
              <li><Link to="/near-me" className="hover:text-primary transition-colors text-sm">Service Areas</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors text-sm">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:text-primary transition-colors text-sm">Pooper Scooper Service</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors text-sm">Dog Poop Removal</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors text-sm">Pet Waste Removal</Link></li>
              <li><Link to="/one-time-cleanup" className="hover:text-primary transition-colors text-sm">One-Time Poop Pick Up Service</Link></li>
              <li><Link to="/doggy-doors" className="hover:text-primary transition-colors text-sm">Doggy Door Installation</Link></li>
              <li><Link to="/commercial" className="hover:text-primary transition-colors text-sm">Commercial &amp; HOA Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm">(423) 600-5040</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm">info@scoopychatt.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Serving Chattanooga, TN and North Georgia, including Ringgold, Rossville, and Fort Oglethorpe, GA</span>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm">24/7 Always available for service</span>
              </li>
              <li className="flex items-start">
                <a href="https://share.google/sOBVeLPqRabhfffPg" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors text-sm">
                  <Globe className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span>Google My Business</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Scoopy Doo LLC. All rights reserved.
          </p>
          <a href="https://www.bbb.org/us/ga/ringgold/profile/pet-waste-removal/scoopy-doo-llc-0483-80013696/#sealclick" id="bbblink" className="sehzbum" target="_blank" rel="nofollow noopener">
            <img src="https://seal-chattanooga.bbb.org/logo/sehzbum/bbb-80013696.png" style={{ border: 0, maxHeight: "60px" }} alt="Scoopy Doo, LLC BBB Business Review" />
          </a>
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://apaws.org/search/details.aspx?id=3031"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scoopy Doo LLC member listing at aPaws, the Association of Professional Animal Waste Specialists"
            >
              <img
                src="/images/apaws-proud-member.png"
                alt="aPaws Proud Member - Association of Professional Animal Waste Specialists"
                width="220"
                height="104"
                loading="lazy"
                className="h-auto w-[180px] sm:w-[220px]"
              />
            </a>
            <p className="text-xs text-slate-500 text-center">
              Proud member of aPaws, the Association of Professional Animal Waste Specialists
            </p>
          </div>
          <div className="flex space-x-4 text-sm text-slate-500">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
