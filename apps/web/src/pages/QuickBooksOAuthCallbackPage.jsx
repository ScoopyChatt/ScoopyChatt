import React from &rsquo;react&rsquo;;
import { useSearchParams, Link } from &rsquo;react-router-dom&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { CheckCircle2, AlertCircle, Copy, Home } from &rsquo;lucide-react&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { toast } from &rsquo;sonner&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;

const QuickBooksOAuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get(&rsquo;code&rsquo;);
  const realmId = searchParams.get(&rsquo;realmId&rsquo;);
  const state = searchParams.get(&rsquo;state&rsquo;);
  const fullQuery = searchParams.toString();

  const handleCopyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      toast.success(&rsquo;Authorization code copied to clipboard!&rsquo;, {
        description: &rsquo;You can now paste this into your application.&rsquo;
      });
    }
  };

  return (
    <div className=&rdquo;min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8&rdquo;>
      <Helmet>
        <title>QuickBooks Authorization Callback</title>
        <meta name=&rdquo;robots&rdquo; content=&rdquo;noindex, nofollow&rdquo; />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=&rdquo;w-full max-w-2xl bg-card border border-border rounded-2xl shadow-xl overflow-hidden&rdquo;
      >
        <div className=&rdquo;p-8 sm:p-10&rdquo;>
          {code ? (
            <div className=&rdquo;space-y-8&rdquo;>
              <div className=&rdquo;text-center&rdquo;>
                <div className=&rdquo;mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6&rdquo;>
                  <CheckCircle2 className=&rdquo;w-8 h-8 text-success&rdquo; />
                </div>
                <h1 className=&rdquo;text-2xl sm:text-3xl font-bold text-foreground mb-4 font-heading&rdquo;>
                  Authorization Code Captured
                </h1>
                <p className=&rdquo;text-muted-foreground&rdquo;>
                  QuickBooks has successfully authorized your request.
                </p>
              </div>

              <div className=&rdquo;bg-background border border-border rounded-xl p-5 space-y-4&rdquo;>
                <div>
                  <h3 className=&rdquo;text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider&rdquo;>Authorization Code</h3>
                  <div className=&rdquo;flex flex-col sm:flex-row sm:items-center justify-between gap-4&rdquo;>
                    <p className=&rdquo;text-foreground font-mono text-sm break-all bg-muted/50 p-3 rounded-lg flex-1 border border-border/50&rdquo;>
                      {code}
                    </p>
                    <Button 
                      onClick={handleCopyCode}
                      className=&rdquo;shrink-0 flex items-center gap-2&rdquo;
                    >
                      <Copy className=&rdquo;w-4 h-4&rdquo; />
                      Copy Code
                    </Button>
                  </div>
                </div>

                {realmId && (
                  <div>
                    <h3 className=&rdquo;text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider&rdquo;>Realm ID</h3>
                    <p className=&rdquo;text-foreground font-mono text-sm break-all bg-muted/50 p-3 rounded-lg border border-border/50&rdquo;>
                      {realmId}
                    </p>
                  </div>
                )}

                {state && (
                  <div>
                    <h3 className=&rdquo;text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider&rdquo;>State</h3>
                    <p className=&rdquo;text-foreground font-mono text-sm break-all bg-muted/50 p-3 rounded-lg border border-border/50&rdquo;>
                      {state}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className=&rdquo;text-center space-y-6&rdquo;>
              <div className=&rdquo;mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6&rdquo;>
                <AlertCircle className=&rdquo;w-8 h-8 text-destructive&rdquo; />
              </div>
              <h1 className=&rdquo;text-2xl sm:text-3xl font-bold text-foreground mb-4 font-heading&rdquo;>
                Authorization Failed
              </h1>
              <div className=&rdquo;bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive font-medium text-sm text-left&rdquo;>
                Error: No authorization code received. Check the URL parameters.
              </div>
            </div>
          )}

          <div className=&rdquo;mt-8 pt-8 border-t border-border space-y-6&rdquo;>
            <div>
              <h3 className=&rdquo;text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider&rdquo;>Raw Query String (Debugging)</h3>
              <div className=&rdquo;w-full bg-background border border-border rounded-xl p-4 font-mono text-xs text-muted-foreground overflow-auto break-all&rdquo;>
                {fullQuery ? `?${fullQuery}` : &rsquo;No query parameters found.&rsquo;}
              </div>
            </div>

            <div className=&rdquo;flex justify-center&rdquo;>
              <Button asChild variant=&rdquo;outline&rdquo; className=&rdquo;gap-2&rdquo;>
                <Link to=&rdquo;/&rdquo;>
                  <Home className=&rdquo;w-4 h-4&rdquo; />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickBooksOAuthCallbackPage;