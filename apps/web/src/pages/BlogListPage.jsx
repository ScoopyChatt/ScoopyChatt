
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowRight, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { getCanonicalUrl, generateLocalBusinessSchema } from '@/utils/seoHelpers.js';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const records = await pb.collection('blog_posts').getList(1, 50, {
          sort: '-published_date',
          $autoCancel: false
        });
        
        const deadBlogSlugs = [
          'benefits', 'diy-vs-professional', 'health-risks-of-pet-waste', 
          'lawn-damage', 'parasite-risks', 'water-contamination', 'why-professional', 
          'bacteria-risks', 'pathogen-risks', 'pet-safety', 'family-safety', 'cost-comparison'
        ];
        
        const validPosts = records.items.filter(post => !deadBlogSlugs.includes(post.slug));
        
        setPosts(validPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const canonicalUrl = getCanonicalUrl('/blog');
  const pageTitle = "Pet Waste & Dog Care Blog | Scoopy Doo Chattanooga";
  const pageDesc = "Tips on pet waste removal, yard health, and dog care for Chattanooga homeowners from the Scoopy Doo blog.";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Resources & Guides
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-foreground tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Scoopy Doo Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Expert tips, local news, and comprehensive guides about keeping your yard clean, safe, and pet-friendly in the Chattanooga area.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-3xl p-8 text-center max-w-2xl mx-auto">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Oops! Something went wrong</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-muted/30 border border-border rounded-3xl p-12 text-center max-w-2xl mx-auto">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-bold text-foreground mb-3">No Posts Available</h3>
              <p className="text-muted-foreground text-lg">
                Check back later for new updates, tips, and insights about pet waste management!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                  {post.category && (
                    <div className="mb-6">
                      <span className="inline-block px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-xs font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  )}
                  
                  <h2 className="text-2xl font-bold text-foreground mb-4 line-clamp-3 text-balance group-hover:text-primary transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`} className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm before:absolute before:inset-0 relative">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground mb-8 line-clamp-3 flex-grow leading-relaxed text-base">
                    {post.meta_description || 'Read more about this topic in our full article.'}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {formatDate(post.published_date)}
                    </div>
                    <span className="inline-flex items-center font-bold text-primary group-hover:text-primary/80 transition-colors">
                      Read <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogListPage;
