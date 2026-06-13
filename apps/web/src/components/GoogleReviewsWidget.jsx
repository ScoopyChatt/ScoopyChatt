import React, { useState, useEffect } from &rsquo;react&rsquo;;
import { motion, AnimatePresence } from &rsquo;framer-motion&rsquo;;
import { Star, AlertCircle, RefreshCw, ExternalLink, MessageSquare as MessageSquareOff, Quote, ChevronLeft, ChevronRight } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { Avatar, AvatarFallback } from &rsquo;@/components/ui/avatar&rsquo;;
import { Skeleton } from &rsquo;@/components/ui/skeleton&rsquo;;
import apiServerClient from &rsquo;@/lib/apiServerClient.js&rsquo;;

const ITEMS_PER_PAGE = 9;

const GoogleReviewsWidget = ({ limit }) => {
  const [reviewData, setReviewData] = useState({ overallRating: 0, totalReviews: 0, reviews: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiServerClient.fetch(&rsquo;/google-reviews&rsquo;);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed to fetch reviews (${response.status})`);
      }
      
      const data = await response.json(); 
      
      if (data && Array.isArray(data.reviews)) {
        setReviewData({
          overallRating: data.overallRating || 5,
          totalReviews: data.totalReviews || data.reviews.length,
          reviews: data.reviews
        });
      } else {
        throw new Error(&rsquo;Unexpected response format: Expected an object with a reviews array.&rsquo;);
      }
    } catch (err) {
      console.error(&rsquo;[GoogleReviewsWidget] Fetch error:&rsquo;, err);
      setError(err.message || &rsquo;An error occurred while loading reviews.&rsquo;);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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

  if (isLoading) {
    return (
      <section className=&rdquo;py-24 bg-muted/30 border-y border-border/50&rdquo;>
        <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
          <div className=&rdquo;flex flex-col items-center gap-4 mb-12&rdquo;>
            <Skeleton className=&rdquo;h-10 w-3/4 max-w-lg&rdquo; />
            <Skeleton className=&rdquo;h-6 w-1/2 max-w-md&rdquo; />
          </div>
          <div className=&rdquo;flex items-center gap-4 mb-10&rdquo;>
            <Skeleton className=&rdquo;h-14 w-14 rounded-full&rdquo; />
            <div className=&rdquo;space-y-2&rdquo;>
              <Skeleton className=&rdquo;h-8 w-24&rdquo; />
              <Skeleton className=&rdquo;h-4 w-48&rdquo; />
            </div>
          </div>
          <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6&rdquo;>
            {[...Array(6)].map((_, i) => (
              <div key={i} className=&rdquo;mb-6&rdquo;>
                <Skeleton className=&rdquo;h-64 w-full rounded-2xl&rdquo; />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className=&rdquo;py-24 bg-muted/30 border-y border-border/50&rdquo;>
        <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
          <div className=&rdquo;w-full bg-destructive/5 border border-destructive/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]&rdquo;>
            <AlertCircle className=&rdquo;w-12 h-12 text-destructive mb-4&rdquo; />
            <h3 className=&rdquo;text-lg font-semibold text-foreground mb-2&rdquo;>Unable to load reviews</h3>
            <p className=&rdquo;text-muted-foreground mb-6 max-w-md&rdquo;>
              {error}
            </p>
            <Button onClick={fetchReviews} variant=&rdquo;outline&rdquo; className=&rdquo;gap-2&rdquo;>
              <RefreshCw className=&rdquo;w-4 h-4&rdquo; />
              Retry Connection
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const { overallRating, totalReviews, reviews } = reviewData;
  const displayReviews = limit ? reviews.slice(0, limit) : reviews;
  
  if (!displayReviews || displayReviews.length === 0) {
    return (
      <section className=&rdquo;py-24 bg-muted/30 border-y border-border/50&rdquo;>
        <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
          <div className=&rdquo;w-full bg-card shadow-sm border border-border/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]&rdquo;>
            <MessageSquareOff className=&rdquo;w-12 h-12 text-muted-foreground mb-4&rdquo; />
            <h3 className=&rdquo;text-lg font-semibold text-foreground mb-2&rdquo;>No reviews found</h3>
            <p className=&rdquo;text-muted-foreground mb-6 max-w-md&rdquo;>
              Be the first to share your experience with Scoopy Doo!
            </p>
            <Button asChild>
              <a href=&rdquo;https://www.google.com/maps/place/ChIJS6mO-bZgYYgRba6PiaitAAM/reviews&rdquo; target=&rdquo;_blank&rdquo; rel=&rdquo;noopener noreferrer&rdquo;>
                Leave a Review
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(displayReviews.length / ITEMS_PER_PAGE);
  const currentReviews = limit ? displayReviews : displayReviews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    // Scroll to top of widget for better UX
    document.getElementById(&rsquo;reviews-widget-header&rsquo;)?.scrollIntoView({ behavior: &rsquo;smooth&rsquo;, block: &rsquo;start&rsquo; });
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
    document.getElementById(&rsquo;reviews-widget-header&rsquo;)?.scrollIntoView({ behavior: &rsquo;smooth&rsquo;, block: &rsquo;start&rsquo; });
  };

  return (
    <section className=&rdquo;py-24 bg-muted/30 border-y border-border/50 overflow-hidden relative&rdquo;>
      <div className=&rdquo;absolute inset-0 bg-[url(&rsquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/noise.png&rsquo;)] opacity-[0.01] mix-blend-multiply pointer-events-none&rdquo;></div>
      
      <div className=&rdquo;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10&rdquo; id=&rdquo;reviews-widget-header&rdquo;>
        
        {/* Header Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
          className=&rdquo;text-center mb-12&rdquo;
        >
          <h2 className=&rdquo;text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground tracking-tight&rdquo;>
            Trusted by Pet Parents Across Greater Chattanooga
          </h2>
          <p className=&rdquo;text-muted-foreground max-w-2xl mx-auto text-lg mb-8 leading-relaxed&rdquo;>
            See why our neighbors rate us 5 stars for keeping their yards fresh, safe, and poop-free.
          </p>
          <Button 
            asChild 
            size=&rdquo;lg&rdquo; 
            className=&rdquo;bg-[#FF9E30] text-white hover:bg-[#FF9E30]/90 transition-all duration-200 h-14 px-8 text-lg rounded-xl shadow-lg&rdquo;
          >
            <a 
              href=&rdquo;https://www.google.com/maps/place/ChIJS6mO-bZgYYgRba6PiaitAAM/reviews&rdquo; 
              target=&rdquo;_blank&rdquo; 
              rel=&rdquo;noopener noreferrer&rdquo;
              className=&rdquo;flex items-center gap-2&rdquo;
            >
              Leave Us a Review
              <ExternalLink className=&rdquo;w-5 h-5&rdquo; />
            </a>
          </Button>
        </motion.div>

        {/* Rating Summary */}
        <div className=&rdquo;flex flex-col sm:flex-row items-center justify-center md:justify-start mb-10 gap-4&rdquo;>
          <div className=&rdquo;flex items-center gap-4 bg-background px-6 py-4 rounded-2xl shadow-sm border border-border/50&rdquo;>
            <div className=&rdquo;bg-yellow-400/10 p-3 rounded-full flex-shrink-0&rdquo;>
              <Star className=&rdquo;w-8 h-8 text-yellow-500 fill-current&rdquo; />
            </div>
            <div>
              <div className=&rdquo;flex items-baseline gap-2&rdquo;>
                <span className=&rdquo;text-3xl font-bold text-foreground tabular-nums tracking-tight&rdquo;>
                  {overallRating}
                </span>
                <span className=&rdquo;text-muted-foreground font-medium&rdquo;>out of 5</span>
              </div>
              <p className=&rdquo;text-sm font-medium text-muted-foreground&rdquo;>Based on {totalReviews} Google reviews</p>
            </div>
          </div>
        </div>

        {/* Paginated Grid of Reviews */}
        <div className=&rdquo;min-h-[600px]&rdquo;>
          <AnimatePresence mode=&rdquo;wait&rdquo;>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className=&rdquo;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6&rdquo;
            >
              {currentReviews.map((review, index) => (
                <div 
                  key={`${review.author}-${index}`}
                  className=&rdquo;bg-card rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md border border-border/50 flex flex-col relative group transition-shadow duration-300 h-full&rdquo;
                >
                  <Quote className=&rdquo;absolute top-6 right-6 w-10 h-10 text-muted/30 rotate-180 transition-transform group-hover:scale-110 duration-500 pointer-events-none&rdquo; />
                  
                  <div className=&rdquo;flex items-center gap-4 mb-5 relative z-10&rdquo;>
                    <Avatar className=&rdquo;h-12 w-12 border border-primary/10 shadow-sm&rdquo;>
                      <AvatarFallback className=&rdquo;bg-primary/5 text-primary font-bold text-lg&rdquo;>
                        {getInitials(review.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div className=&rdquo;flex-1 min-w-0&rdquo;>
                      <h4 className=&rdquo;font-semibold text-foreground text-base truncate pr-8&rdquo;>{review.author}</h4>
                      <div className=&rdquo;flex text-yellow-400 mt-1&rdquo; aria-label={`Rating: ${review.rating} out of 5 stars`}>
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
                    <p className=&rdquo;text-muted-foreground text-base leading-relaxed whitespace-pre-wrap&rdquo;>
                      &rdquo;{review.text}&rdquo;
                    </p>
                  </div>
                  
                  {review.date && formatDate(review.date) && (
                    <div className=&rdquo;mt-6 pt-4 border-t border-border/50 text-xs text-muted-foreground font-medium tracking-wide uppercase relative z-10 shrink-0&rdquo;>
                      {formatDate(review.date)}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {!limit && totalPages > 1 && (
          <div className=&rdquo;flex items-center justify-center mt-12 gap-4&rdquo;>
            <Button
              variant=&rdquo;outline&rdquo;
              size=&rdquo;icon&rdquo;
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className=&rdquo;rounded-full w-12 h-12 border-border/50 hover:bg-muted&rdquo;
              aria-label=&rdquo;Previous page of reviews&rdquo;
            >
              <ChevronLeft className=&rdquo;w-5 h-5&rdquo; />
            </Button>
            
            <div className=&rdquo;flex items-center gap-2&rdquo;>
              <span className=&rdquo;text-sm font-medium text-foreground&rdquo;>Page {currentPage}</span>
              <span className=&rdquo;text-sm text-muted-foreground&rdquo;>of {totalPages}</span>
            </div>

            <Button
              variant=&rdquo;outline&rdquo;
              size=&rdquo;icon&rdquo;
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className=&rdquo;rounded-full w-12 h-12 border-border/50 hover:bg-muted&rdquo;
              aria-label=&rdquo;Next page of reviews&rdquo;
            >
              <ChevronRight className=&rdquo;w-5 h-5&rdquo; />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GoogleReviewsWidget;