
import React, { useEffect, Suspense } from &rsquo;react&rsquo;;
import { Route, Routes, BrowserRouter as Router, useLocation } from &rsquo;react-router-dom&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { Toaster } from &rsquo;@/components/ui/sonner&rsquo;;
import ScrollToTop from &rsquo;@/components/ScrollToTop.jsx&rsquo;;
import ScoopyHelperWidget from &rsquo;@/components/ScoopyHelperWidget.jsx&rsquo;;

import { useGTM } from &rsquo;@/hooks/useGTM.js&rsquo;;
import { usePixel } from &rsquo;@/hooks/usePixel.js&rsquo;;
import { CANONICAL_BASE_URL } from &rsquo;@/config/seoConfig.js&rsquo;;
import { generateLocalBusinessSchema } from &rsquo;@/utils/seoHelpers.js&rsquo;;

// Lazy loaded pages for code splitting
const CoreServicePage = React.lazy(() => import(&rsquo;@/pages/CoreServicePage.jsx&rsquo;));
const NearMePage = React.lazy(() => import(&rsquo;@/pages/NearMePage.jsx&rsquo;));
const OneTimeCleanupPage = React.lazy(() => import(&rsquo;@/pages/OneTimeCleanupPage.jsx&rsquo;));
const ServicesPage = React.lazy(() => import(&rsquo;@/pages/ServicesPage.jsx&rsquo;));
const AboutPage = React.lazy(() => import(&rsquo;@/pages/AboutPage.jsx&rsquo;));
const FAQPage = React.lazy(() => import(&rsquo;@/pages/FAQPage.jsx&rsquo;));
const ComparisonPage = React.lazy(() => import(&rsquo;@/pages/ComparisonPage.jsx&rsquo;));
const QuoteRequestPage = React.lazy(() => import(&rsquo;@/pages/QuoteRequestPage.jsx&rsquo;));
const ThankYouPage = React.lazy(() => import(&rsquo;@/pages/ThankYouPage.jsx&rsquo;));
const SpringSpecialPage = React.lazy(() => import(&rsquo;@/pages/SpringSpecialPage.jsx&rsquo;));
const PrivacyPolicyPage = React.lazy(() => import(&rsquo;@/pages/PrivacyPolicyPage.jsx&rsquo;));
const TermsOfServicePage = React.lazy(() => import(&rsquo;@/pages/TermsOfServicePage.jsx&rsquo;));
const PetSafeChecklistLandingPage = React.lazy(() => import(&rsquo;@/pages/PetSafeChecklistLandingPage.jsx&rsquo;));
const DogParkGuideLandingPage = React.lazy(() => import(&rsquo;@/pages/DogParkGuideLandingPage.jsx&rsquo;));
const DogPoopRemovalPage = React.lazy(() => import(&rsquo;@/pages/DogPoopRemovalPage.jsx&rsquo;));
const PetWasteRemovalPage = React.lazy(() => import(&rsquo;@/pages/PetWasteRemovalPage.jsx&rsquo;));
const DogPoopScoopingPage = React.lazy(() => import(&rsquo;@/pages/DogPoopScoopingPage.jsx&rsquo;));
const YardCleanupPage = React.lazy(() => import(&rsquo;@/pages/YardCleanupPage.jsx&rsquo;));
const ServiceAreasPage = React.lazy(() => import(&rsquo;@/pages/ServiceAreasPage.jsx&rsquo;));

// Location Template for dynamic routing
const LocationTemplate = React.lazy(() => import(&rsquo;@/components/LocationTemplate.jsx&rsquo;));

// Blogs
const BlogListPage = React.lazy(() => import(&rsquo;@/pages/BlogListPage.jsx&rsquo;));
const BlogPostTemplate = React.lazy(() => import(&rsquo;@/components/BlogPostTemplate.jsx&rsquo;));

// Specific/Working Blog Pages (Live)
const HowOftenCleanYard = React.lazy(() => import(&rsquo;@/pages/blog/HowOftenCleanYardPage.jsx&rsquo;));
const PodcastBlogPost = React.lazy(() => import(&rsquo;@/pages/blog/PodcastBlogPost.jsx&rsquo;));
const ChattanoogaHomeownersPage = React.lazy(() => import(&rsquo;@/pages/blog/ChattanoogaHomeownersPage.jsx&rsquo;));
const CommercialPetWastePage = React.lazy(() => import(&rsquo;@/pages/blog/CommercialPetWastePage.jsx&rsquo;));
const BlogSignalMountain = React.lazy(() => import(&rsquo;@/pages/blog/BlogSignalMountainPage.jsx&rsquo;));
const BlogSoddyDaisy = React.lazy(() => import(&rsquo;@/pages/blog/BlogSoddyDaisyPage.jsx&rsquo;));
const DogParksChattanooga = React.lazy(() => import(&rsquo;@/pages/blog/DogParksChattanoogaPage.jsx&rsquo;));

// Media / Utilities
const PodcastPage = React.lazy(() => import(&rsquo;@/pages/PodcastPage.jsx&rsquo;));
const RedditOAuthCallbackPage = React.lazy(() => import(&rsquo;@/pages/RedditOAuthCallbackPage.jsx&rsquo;));
const QuickBooksOAuthCallbackPage = React.lazy(() => import(&rsquo;@/pages/QuickBooksOAuthCallbackPage.jsx&rsquo;));

// Sitemap Route
const SitemapXML = React.lazy(() => import(&rsquo;@/pages/SitemapXML.jsx&rsquo;));
import HowItWorksPage from '@/pages/HowItWorksPage.jsx';

const RouteTracker = () => {
  const location = useLocation();
  const { trackPageView } = usePixel();

  useEffect(() => {
    trackPageView();
  }, [location, trackPageView]);

  return null;
};

const PageLoader = () => (
  <div className=&rdquo;min-h-screen flex items-center justify-center bg-background&rdquo;>
    <div className=&rdquo;animate-pulse flex flex-col items-center&rdquo;>
      <div className=&rdquo;w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4&rdquo;></div>
      <p className=&rdquo;text-muted-foreground font-medium&rdquo;>Loading...</p>
    </div>
  </div>
);

function App() {
  useGTM(&rsquo;GTM-59B5PDXS&rsquo;);

  return (
    <Router>
      <Helmet>
        <meta property=&rdquo;og:title&rdquo; content=&rdquo;Scoopy Doo LLC&rdquo; />
        <meta property=&rdquo;og:description&rdquo; content=&rdquo;Scoopy Doo, Chattanooga Pet Waste Removal&rdquo; />
        <meta property=&rdquo;og:image&rdquo; content=&rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg&rdquo; />
        <meta property=&rdquo;og:type&rdquo; content=&rdquo;website&rdquo; />
        <meta property=&rdquo;og:url&rdquo; content={CANONICAL_BASE_URL} />
        <script type=&rdquo;application/ld+json&rdquo;>
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
      </Helmet>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <ScrollToTop />
      <RouteTracker />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path=&rdquo;/sitemap.xml&rdquo; element={<SitemapXML />} />

          <Route path=&rdquo;/&rdquo; element={<CoreServicePage />} />
          <Route path=&rdquo;/near-me&rdquo; element={<NearMePage />} />
          <Route path=&rdquo;/one-time-cleanup&rdquo; element={<OneTimeCleanupPage />} />

          <Route path=&rdquo;/services&rdquo; element={<ServicesPage />} />
          <Route path=&rdquo;/about&rdquo; element={<AboutPage />} />
          <Route path=&rdquo;/faq&rdquo; element={<FAQPage />
          <Route path=&rdquo;/comparison&rdquo; element={<ComparisonPage />} />} />
          <Route path=&rdquo;/quote&rdquo; element={<QuoteRequestPage />} />
          <Route path=&rdquo;/thank-you&rdquo; element={<ThankYouPage />} />
          <Route path=&rdquo;/spring-special&rdquo; element={<SpringSpecialPage />} />
          <Route path=&rdquo;/privacy-policy&rdquo; element={<PrivacyPolicyPage />} />
          <Route path=&rdquo;/terms-of-service&rdquo; element={<TermsOfServicePage />} />
          
          <Route path=&rdquo;/dog-poop-removal-chattanooga&rdquo; element={<DogPoopRemovalPage />} />
          <Route path=&rdquo;/pet-waste-removal-chattanooga&rdquo; element={<PetWasteRemovalPage />} />
          <Route path=&rdquo;/dog-poop-scooping-chattanooga&rdquo; element={<DogPoopScoopingPage />} />
          <Route path=&rdquo;/yard-cleanup-chattanooga&rdquo; element={<YardCleanupPage />} />

          <Route path=&rdquo;/pet-safe-checklist&rdquo; element={<PetSafeChecklistLandingPage />} />
          <Route path=&rdquo;/dog-park-guide&rdquo; element={<DogParkGuideLandingPage />} />
          
          <Route path=&rdquo;/podcast&rdquo; element={<PodcastPage />} />

          <Route path=&rdquo;/reddit-oauth-callback&rdquo; element={<RedditOAuthCallbackPage />} />
          <Route path=&rdquo;/qb-oauth-callback&rdquo; element={<QuickBooksOAuthCallbackPage />} />
          
          <Route path=&rdquo;/service-areas&rdquo; element={<ServiceAreasPage />} />
          <Route path=&rdquo;/service/:slug&rdquo; element={<LocationTemplate />} />

          <Route path=&rdquo;/blog&rdquo; element={<BlogListPage />} />
          <Route path=&rdquo;/blog/chattanooga-pet-waste-removal-homeowners&rdquo; element={<ChattanoogaHomeownersPage />} />
          <Route path=&rdquo;/blog/commercial-pet-waste-removal-chattanooga&rdquo; element={<CommercialPetWastePage />} />
          <Route path=&rdquo;/blog/how-often-clean-yard&rdquo; element={<HowOftenCleanYard />} />
          <Route path=&rdquo;/blog/podcast-blog&rdquo; element={<PodcastBlogPost />} />
          <Route path=&rdquo;/blog/signal-mountain&rdquo; element={<BlogSignalMountain />} />
          <Route path=&rdquo;/blog/soddy-daisy&rdquo; element={<BlogSoddyDaisy />} />
          <Route path=&rdquo;/blog/best-dog-parks-chattanooga-tn&rdquo; element={<DogParksChattanooga />} />
          
          <Route path=&rdquo;/blog/:slug&rdquo; element={<BlogPostTemplate />} />

          <Route path=&rdquo;*&rdquo; element={
            <>
              <Helmet><meta name=&rdquo;robots&rdquo; content=&rdquo;noindex, nofollow&rdquo; /></Helmet>
              <div className=&rdquo;min-h-screen flex items-center justify-center bg-background&rdquo;>
              <div className=&rdquo;text-center&rdquo;>
                <h1 className=&rdquo;mb-4 text-4xl font-bold&rdquo;>404 - Page Not Found</h1>
                <p className=&rdquo;text-muted-foreground mb-6&rdquo;>The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
                <a href=&rdquo;/&rdquo; className=&rdquo;text-primary hover:underline font-bold&rdquo;>Back to home</a>
              </div>
            </div>
          </>
          } />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Routes>
      </Suspense>
      
      <ScoopyHelperWidget />
      <Toaster />
    </Router>
  );
}

export default App;
