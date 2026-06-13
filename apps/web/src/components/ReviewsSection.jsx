
import React, { useState, useEffect, useCallback } from &rsquo;react&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import useEmblaCarousel from &rsquo;embla-carousel-react&rsquo;;
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare as MessageSquareOff } from &rsquo;lucide-react&rsquo;;
import { Avatar, AvatarFallback } from &rsquo;@/components/ui/avatar&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import apiServerClient from &rsquo;@/lib/apiServerClient.js&rsquo;;

const formatDate = (dateString) => {
  if (!dateString) return &rsquo;&rsquo;;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return &rsquo;&rsquo;;
    return date.toLocaleDateString(&rsquo;en-US&rsquo;, {
      year: &rsquo;numeric&rsquo;,
      month: &rsquo;short&rsquo;,
      day: &rsquo;numeric&rsquo;
    });
  } catch {
    return &rsquo;&rsquo;;
  }
};

const getInitials = (name) => {
  if (!name || name === &rsquo;Anonymous&rsquo;) return &rsquo;U&rsquo;;
  const parts = name.split(&rsquo; &rsquo;).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const ReviewsSection = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackReviews, setFallbackReviews] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: &rsquo;start&rsquo;, loop: true, skipSnaps: false });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    // 1. Fetch fallback data in the background just in case
    apiServerClient.fetch(&rsquo;/google-reviews&rsquo;)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.reviews)) {
          setFallbackReviews(data.reviews);
        }
      })
      .catch(err => console.error(&rsquo;[ReviewsSection] Failed to fetch fallback reviews:&rsquo;, err));

    // 2. Inject Elfsight script safely
    const scriptId = &rsquo;elfsight-script&rsquo;;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement(&rsquo;script&rsquo;);
      script.id = scriptId;
      script.src = &rsquo;https://elfsightcdn.com/platform.js&rsquo;;
      script.async = true;
      script.onerror = () => setShowFallback(true);
      document.body.appendChild(script);
    }

    // 3. Setup a timeout to check if Elfsight actually rendered anything
    // (It often fails in preview environments or due to adblockers)
    const checkTimer = setTimeout(() => {
      const widget = document.querySelector(&rsquo;.elfsight-app-8240dd2e-e144-493a-add7-52c8fd1b05f7&rsquo;);
      if (!widget || widget.children.length === 0) {
        setShowFallback(true);
      }
    }, 3500);

    return () => clearTimeout(checkTimer);
  }, []);

  return (
    <section className=&rdquo;py-24 bg-muted/20 border-y border-border/50 overflow-hidden&rdquo;>
      <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className=&rdquo;text-center mb-12&rdquo;
        >
          <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground tracking-tight&rdquo;>
            What Our Customers Say
          </h2>
          <p className=&rdquo;text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed&rdquo;>
            See why pet owners across Chattanooga trust Scoopy Doo to keep their yards clean, safe, and fresh.
          </p>
        </motion.div>

        {/* Elfsight Widget Wrapper */}
        <div className={`w-full flex justify-center transition-opacity duration-500 ${showFallback ? &rsquo;hidden&rsquo; : &rsquo;block min-h-[300px]&rsquo;}`}>
          <div className=&rdquo;elfsight-app-8240dd2e-e144-493a-add7-52c8fd1b05f7 w-full&rdquo; data-elfsight-app-lazy></div>
        </div>

        {/* Custom Fallback Carousel (Shown if Elfsight fails to render) */}
        {showFallback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=&rdquo;mt-4 relative&rdquo;
          >
            {fallbackReviews.length > 0 ? (
              <>
                <div className=&rdquo;overflow-hidden cursor-grab active:cursor-grabbing&rdquo; ref={emblaRef}>
                  <div className=&rdquo;flex -ml-6 py-4&rdquo;>
                    {fallbackReviews.map((review, idx) => (
                      <div key={idx} className=&rdquo;flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6&rdquo;>
                        <div className=&rdquo;bg-card rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md border border-border/50 flex flex-col relative group transition-all duration-300 h-full&rdquo;>
                          <Quote className=&rdquo;absolute top-6 right-6 w-8 h-8 text-muted/20 rotate-180 transition-transform group-hover:scale-110 duration-500 pointer-events-none&rdquo; />
                          
                          <div className=&rdquo;flex items-center gap-4 mb-5 relative z-10&rdquo;>
                            <Avatar className=&rdquo;h-12 w-12 border border-primary/10 shadow-sm&rdquo;>
                              <AvatarFallback className=&rdquo;bg-primary/5 text-primary font-bold text-base&rdquo;>
                                {getInitials(review.author)}
                              </AvatarFallback>
                            </Avatar>
                            <div className=&rdquo;flex-1 min-w-0&rdquo;>
                              <h4 className=&rdquo;font-semibold text-foreground text-base truncate pr-8&rdquo;>{review.author}</h4>
                              <div className=&rdquo;flex text-yellow-400 mt-1&rdquo;>
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? &rsquo;fill-current text-yellow-500&rsquo; : &rsquo;text-muted-foreground/30&rsquo;}`} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className=&rdquo;flex-1 relative z-10&rdquo;>
                            <p className=&rdquo;text-muted-foreground text-base leading-relaxed line-clamp-4&rdquo;>
                              &rdquo;{review.text}&rdquo;
                            </p>
                          </div>
                          
                          {review.date && (
                            <div className=&rdquo;mt-6 pt-4 border-t border-border/50 text-xs text-muted-foreground font-medium tracking-wide uppercase relative z-10 shrink-0&rdquo;>
                              {formatDate(review.date)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className=&rdquo;flex items-center justify-center gap-4 mt-8&rdquo;>
                  <Button 
                    variant=&rdquo;outline&rdquo; 
                    size=&rdquo;icon&rdquo; 
                    onClick={scrollPrev} 
                    className=&rdquo;rounded-full w-12 h-12 border-border/50 hover:bg-muted active:scale-[0.98] transition-all shadow-sm&rdquo;
                    aria-label=&rdquo;Previous reviews&rdquo;
                  >
                    <ChevronLeft className=&rdquo;w-5 h-5&rdquo; />
                  </Button>
                  <Button 
                    variant=&rdquo;outline&rdquo; 
                    size=&rdquo;icon&rdquo; 
                    onClick={scrollNext} 
                    className=&rdquo;rounded-full w-12 h-12 border-border/50 hover:bg-muted active:scale-[0.98] transition-all shadow-sm&rdquo;
                    aria-label=&rdquo;Next reviews&rdquo;
                  >
                    <ChevronRight className=&rdquo;w-5 h-5&rdquo; />
                  </Button>
                </div>
              </>
            ) : (
              <div className=&rdquo;text-center py-16 bg-card rounded-2xl border border-border/50 shadow-sm&rdquo;>
                <MessageSquareOff className=&rdquo;mx-auto w-12 h-12 text-muted-foreground mb-4&rdquo; />
                <h3 className=&rdquo;text-lg font-medium text-foreground mb-2&rdquo;>No reviews available</h3>
                <p className=&rdquo;text-muted-foreground&rdquo;>Check back later to see what our customers have to say.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
