
import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { MapPin, Phone, Mail, Clock, Globe, Facebook, Instagram } from &rsquo;lucide-react&rsquo;;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className=&rdquo;bg-slate-950 text-slate-300 py-12 md:py-16 mt-auto&rdquo;>
      <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
        <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12&rdquo;>
          {/* Brand */}
          <div className=&rdquo;space-y-4&rdquo;>
            <img 
              src=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/7f889d94bae15b826df9c1daf461a7b9.png&rdquo; 
              alt=&rdquo;Scoopy Chatt - Professional Pooper Scooper Service Logo&rdquo; 
              className=&rdquo;w-32 h-auto bg-white/10 rounded-lg p-2&rdquo; 
            />
            <p className=&rdquo;text-sm text-slate-400 leading-relaxed&rdquo;>
              Professional pet waste removal service making yards cleaner, safer, and more enjoyable for families and their pets. We are your trusted poop pick up company.
            </p>
            {/* Social Media Links */}
            <div className=&rdquo;flex items-center gap-4 pt-2&rdquo;>
              <a 
                href=&rdquo;https://www.facebook.com/profile.php?id=61578292444117&rdquo; 
                target=&rdquo;_blank&rdquo; 
                rel=&rdquo;noopener noreferrer&rdquo;
                aria-label=&rdquo;Follow us on Facebook&rdquo;
                className=&rdquo;inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:bg-primary hover:text-white transition-all duration-200 active:scale-95&rdquo;
              >
                <Facebook className=&rdquo;w-5 h-5&rdquo; />
              </a>
              <a 
                href=&rdquo;https://www.instagram.com/scoopychatt/&rdquo; 
                target=&rdquo;_blank&rdquo; 
                rel=&rdquo;noopener noreferrer&rdquo;
                aria-label=&rdquo;Follow us on Instagram&rdquo;
                className=&rdquo;inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:bg-primary hover:text-white transition-all duration-200 active:scale-95&rdquo;
              >
                <Instagram className=&rdquo;w-5 h-5&rdquo; />
              </a>
              <a 
                href=&rdquo;https://www.yelp.com/biz/scoopy-doo-ringgold&rdquo;
                target=&rdquo;_blank&rdquo; 
                rel=&rdquo;noopener noreferrer&rdquo;
                aria-label=&rdquo;Review us on Yelp&rdquo;
                className=&rdquo;inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:bg-[#d32323] hover:text-white transition-all duration-200 active:scale-95&rdquo;
              >
                <svg className=&rdquo;w-5 h-5&rdquo; viewBox=&rdquo;0 0 24 24&rdquo; fill=&rdquo;currentColor&rdquo; aria-hidden=&rdquo;true&rdquo;><path d=&rdquo;M20.16 12.73l-4.46 1.44a1.2 1.2 0 0 1-1.52-.79 1.2 1.2 0 0 1 .08-.92l2.23-4.08a.5.5 0 0 1 .68-.19c1.98 1.08 3.14 2.66 3 4.54zm-5.1 3.57l3.61 3.06a.5.5 0 0 1 .06.7c-1.22 1.51-2.97 2.2-4.86 1.83a1.2 1.2 0 0 1-.97-1.39l.71-4.63a1.2 1.2 0 0 1 1.45-.57zm-3.6-.38l-4.7.35a1.2 1.2 0 0 1-1.27-1.1c-.12-1.9.65-3.7 2.21-4.9a.5.5 0 0 1 .7.08l2.93 3.72a1.2 1.2 0 0 1-.87 1.85zM9.1 10.1l-3.43-3.3a.5.5 0 0 1 0-.71C7 4.76 8.85 4.2 10.7 4.6a1.2 1.2 0 0 1 .94 1.41L10.34 9.6a1.2 1.2 0 0 1-1.24.5zm2.44 1.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z&rdquo;/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className=&rdquo;text-white font-bold text-lg mb-4&rdquo;>Quick Links</h3>
            <ul className=&rdquo;space-y-2&rdquo;>
              <li><Link to=&rdquo;/&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>Home</Link></li>
              <li><Link to=&rdquo;/services&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>Dog Poop Removal</Link></li>
              <li><Link to=&rdquo;/near-me&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>Service Areas</Link></li>
              <li><Link to=&rdquo;/blog&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>Blog</Link></li>
              <li><Link to=&rdquo;/faq&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>FAQ</Link></li>
              <li><Link to=&rdquo;/about&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className=&rdquo;text-white font-bold text-lg mb-4&rdquo;>Our Services</h3>
            <ul className=&rdquo;space-y-2&rdquo;>
              <li><Link to=&rdquo;/services&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>Pooper Scooper Service</Link></li>
              <li><Link to=&rdquo;/services&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>Dog Poop Removal</Link></li>
              <li><Link to=&rdquo;/services&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>Pet Waste Removal</Link></li>
              <li><Link to=&rdquo;/one-time-cleanup&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>One-Time Poop Pick Up Service</Link></li>
              <li><Link to=&rdquo;/services&rdquo; className=&rdquo;hover:text-primary transition-colors text-sm&rdquo;>Commercial Pet Waste Management</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className=&rdquo;text-white font-bold text-lg mb-4&rdquo;>Contact Us</h3>
            <ul className=&rdquo;space-y-4&rdquo;>
              <li className=&rdquo;flex items-start&rdquo;>
                <Phone className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5&rdquo; />
                <span className=&rdquo;text-sm&rdquo;>(423) 600-5040</span>
              </li>
              <li className=&rdquo;flex items-start&rdquo;>
                <Mail className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5&rdquo; />
                <span className=&rdquo;text-sm&rdquo;>info@scoopychatt.com</span>
              </li>
              <li className=&rdquo;flex items-start&rdquo;>
                <MapPin className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5&rdquo; />
                <span className=&rdquo;text-sm&rdquo;>Chattanooga, TN & Surrounding Areas</span>
              </li>
              <li className=&rdquo;flex items-start&rdquo;>
                <Clock className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5&rdquo; />
                <span className=&rdquo;text-sm&rdquo;>24/7 Always available for ð service</span>
              </li>
              <li className=&rdquo;flex items-start&rdquo;>
                <a href=&rdquo;https://share.google/sOBVeLPqRabhfffPg&rdquo; target=&rdquo;_blank&rdquo; rel=&rdquo;noopener noreferrer&rdquo; className=&rdquo;flex items-center hover:text-primary transition-colors text-sm&rdquo;>
                  <Globe className=&rdquo;w-5 h-5 text-primary mr-3 flex-shrink-0&rdquo; />
                  <span>Google My Business</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className=&rdquo;pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4&rdquo;>
          <p className=&rdquo;text-sm text-slate-500&rdquo;>
            &copy; {currentYear} Scoopy Doo LLC. All rights reserved.
          </p>
          <div className=&rdquo;flex space-x-4 text-sm text-slate-500&rdquo;>
            <Link to=&rdquo;/privacy-policy&rdquo; className=&rdquo;hover:text-white transition-colors&rdquo;>Privacy Policy</Link>
            <Link to=&rdquo;/terms-of-service&rdquo; className=&rdquo;hover:text-white transition-colors&rdquo;>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
