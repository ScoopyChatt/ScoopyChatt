
import React, { useEffect, useState, useCallback } from &rsquo;react&rsquo;;
import useEmblaCarousel from &rsquo;embla-carousel-react&rsquo;;
import { Star, ChevronLeft, ChevronRight, AlertCircle, Quote } from &rsquo;lucide-react&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import apiServerClient from &rsquo;@/lib/apiServerClient.js&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { Skeleton } from &rsquo;@/components/ui/skeleton&rsquo;;
import { cn } from &rsquo;@/lib/utils.js&rsquo;;

const CustomGoogleReviewsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: &rsquo;start&rsquo;,
    skipSnaps: false
  });
  const [reviewsData, setReviewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiServerClient.fetch(&rsquo;/google-reviews&rsquo;);
      if (!res.ok) throw new Error(&rsquo;Failed to fetch Google reviews&rsquo;);
      const data = await res.json();
      setReviewsData(data);
    } catch (err) {
      console.error(&rsquo;Error fetching Google reviews:&rsquo;, err);
      setError(&rsquo;Unable to load reviews at this time.&rsquo;);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto-scroll functionality (5 seconds)
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (loading) {
    return (
      <div className=&rdquo;w-full relative px-4 sm:px-12&rdquo;>
        <div className=&rdquo;overflow-hidden&rdquo;>
          <div className=&rdquo;flex gap-6&rdquo;>
            {[1, 2, 3].map((i) => (
              <div key={i} className=&rdquo;flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0&rdquo;>
                <div className=&rdquo;bg-card border border-border rounded-2xl p-8 h-[300px] flex flex-col justify-between&rdquo;>
                  <Skeleton className=&rdquo;h-6 w-32 rounded-md mb-4&rdquo; />
                  <div className=&rdquo;space-y-3&rdquo;>
                    <Skeleton className=&rdquo;h-4 w-full&rdquo; />
                    <Skeleton className=&rdquo;h-4 w-full&rdquo; />
                    <Skeleton className=&rdquo;h-4 w-4/5&rdquo; />
                  </div>
                  <div className=&rdquo;flex items-center gap-4 mt-6&rdquo;>
                    <Skeleton className=&rdquo;w-12 h-12 rounded-xl&rdquo; />
                    <div className=&rdquo;space-y-2&rdquo;>
                      <Skeleton className=&rdquo;h-4 w-24&rdquo; />
                      <Skeleton className=&rdquo;h-3 w-16&rdquo; />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className=&rdquo;w-full max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-12 shadow-sm&rdquo;
      >
        <AlertCircle className=&rdquo;w-12 h-12 text-muted-foreground mx-auto mb-4&rdquo; />
        <h3 className=&rdquo;text-xl font-semibold mb-2&rdquo;>Reviews temporarily unavailable</h3>
        <p className=&rdquo;text-muted-foreground mb-6&rdquo;>{error}</p>
        <Button onClick={fetchReviews} variant=&rdquo;outline&rdquo; className=&rdquo;rounded-xl&rdquo;>
          Try Again
        </Button>
      </motion.div>
    );
  }

  const reviews = reviewsData?.reviews || [];

  if (reviews.length === 0) {
    return null; // Hide section gracefully if no reviews exist
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=&rdquo;relative w-full group&rdquo;
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Buttons (Desktop) */}
      <Button 
        variant=&rdquo;outline&rdquo; 
        size=&rdquo;icon&rdquo; 
        className=&rdquo;absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-border shadow-lg hidden sm:flex hover:bg-background hover:scale-110 transition-all duration-300&rdquo;
        onClick={scrollPrev}
        aria-label=&rdquo;Previous reviews&rdquo;
      >
        <ChevronLeft className=&rdquo;w-6 h-6 text-foreground&rdquo; />
      </Button>

      <Button 
        variant=&rdquo;outline&rdquo; 
        size=&rdquo;icon&rdquo; 
        className=&rdquo;absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-border shadow-lg hidden sm:flex hover:bg-background hover:scale-110 transition-all duration-300&rdquo;
        onClick={scrollNext}
        aria-label=&rdquo;Next reviews&rdquo;
      >
        <ChevronRight className=&rdquo;w-6 h-6 text-foreground&rdquo; />
      </Button>

      {/* Carousel Viewport */}
      <div className=&rdquo;overflow-hidden px-2 sm:px-4&rdquo; ref={emblaRef}>
        <div className=&rdquo;flex touch-pan-y -ml-4 sm:-ml-6&rdquo;>
          {reviews.map((review, index) => {
            // Determine rating to show
            const rating = review.rating || 5;
            
            return (
              <div 
                key={review.time || index} 
                className=&rdquo;flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 sm:pl-6&rdquo;
              >
                <div className=&rdquo;bg-card border border-border/60 hover:border-primary/30 transition-colors duration-300 p-8 rounded-2xl shadow-sm hover:shadow-md h-full flex flex-col relative overflow-hidden&rdquo;>
                  
                  {/* Decorative Quote Icon */}
                  <Quote className=&rdquo;absolute top-6 right-6 w-12 h-12 text-primary/5 -rotate-12 pointer-events-none&rdquo; />

                  {/* Stars */}
                  <div className=&rdquo;flex items-center gap-1 mb-6&rdquo;>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          &rdquo;w-5 h-5&rdquo;,
                          i < rating 
                            ? &rdquo;fill-[#fbbc04] text-[#fbbc04]&rdquo; 
                            : &rdquo;fill-muted text-muted&rdquo;
                        )} 
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className=&rdquo;text-foreground leading-relaxed mb-8 flex-grow&rdquo;>
                    &rdquo;{review.text}&rdquo;
                  </blockquote>

                  {/* Author Info */}
                  <div className=&rdquo;flex items-center gap-4 mt-auto pt-6 border-t border-border/40&rdquo;>
                    {review.profile_photo_url ? (
                      <img 
                        src={review.profile_photo_url} 
                        alt={`${review.author_name} profile`} 
                        className=&rdquo;w-12 h-12 rounded-xl object-cover&rdquo;
                        loading=&rdquo;lazy&rdquo;
                        referrerPolicy=&rdquo;no-referrer&rdquo;
                      />
                    ) : (
                      <div className=&rdquo;w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg&rdquo;>
                        {review.author_name?.charAt(0) || &rsquo;C&rsquo;}
                      </div>
                    )}
                    <div>
                      <h4 className=&rdquo;font-semibold text-foreground text-sm&rdquo;>
                        {review.author_name}
                      </h4>
                      <div className=&rdquo;text-xs text-muted-foreground flex items-center gap-1&rdquo;>
                        {review.relative_time_description || &rsquo;Customer&rsquo;} 
                        <span className=&rdquo;inline-block w-1 h-1 rounded-full bg-muted-foreground/30 mx-1&rdquo;></span>
                        Google Review
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation Indicators */}
      <div className=&rdquo;flex justify-center items-center gap-4 mt-8 sm:hidden&rdquo;>
        <Button variant=&rdquo;outline&rdquo; size=&rdquo;icon&rdquo; className=&rdquo;w-10 h-10 rounded-full&rdquo; onClick={scrollPrev}>
          <ChevronLeft className=&rdquo;w-5 h-5&rdquo; />
        </Button>
        <Button variant=&rdquo;outline&rdquo; size=&rdquo;icon&rdquo; className=&rdquo;w-10 h-10 rounded-full&rdquo; onClick={scrollNext}>
          <ChevronRight className=&rdquo;w-5 h-5&rdquo; />
        </Button>
      </div>
    </motion.div>
  );
};

export default CustomGoogleReviewsCarousel;
