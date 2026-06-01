
import React, { useEffect, Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ScoopyHelperWidget from '@/components/ScoopyHelperWidget.jsx';

import { useGTM } from '@/hooks/useGTM.js';
import { usePixel } from '@/hooks/usePixel.js';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';
import { generateLocalBusinessSchema } from '@/utils/seoHelpers.js';

// Lazy loaded pages for code splitting
const CoreServicePage = React.lazy(() => import('@/pages/CoreServicePage.jsx'));
const NearMePage = React.lazy(() => import('@/pages/NearMePage.jsx'));
const OneTimeCleanupPage = React.lazy(() => import('@/pages/OneTimeCleanupPage.jsx'));
const ServicesPage = React.lazy(() => import('@/pages/ServicesPage.jsx'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage.jsx'));
const FAQPage = React.lazy(() => import('@/pages/FAQPage.jsx'));
const QuoteRequestPage = React.lazy(() => import('@/pages/QuoteRequestPage.jsx'));
const ThankYouPage = React.lazy(() => import('@/pages/ThankYouPage.jsx'));
const SpringSpecialPage = React.lazy(() => import('@/pages/SpringSpecialPage.jsx'));
const PrivacyPolicyPage = React.lazy(() => import('@/pages/PrivacyPolicyPage.jsx'));
const TermsOfServicePage = React.lazy(() => import('@/pages/TermsOfServicePage.jsx'));
const PetSafeChecklistLandingPage = React.lazy(() => import('@/pages/PetSafeChecklistLandingPage.jsx'));
const DogParkGuideLandingPage = React.lazy(() => import('@/pages/DogParkGuideLandingPage.jsx'));
const DogPoopRemovalPage = React.lazy(() => import('@/pages/DogPoopRemovalPage.jsx'));
const PetWasteRemovalPage = React.lazy(() => import('@/pages/PetWasteRemovalPage.jsx'));
const DogPoopScoopingPage = React.lazy(() => import('@/pages/DogPoopScoopingPage.jsx'));
const YardCleanupPage = React.lazy(() => import('@/pages/YardCleanupPage.jsx'));
const ServiceAreasPage = React.lazy(() => import('@/pages/ServiceAreasPage.jsx'));

// Location Template for dynamic routing
const LocationTemplate = React.lazy(() => import('@/components/LocationTemplate.jsx'));

// Blogs
const BlogListPage = React.lazy(() => import('@/pages/BlogListPage.jsx'));
const BlogPostTemplate = React.lazy(() => import('@/components/BlogPostTemplate.jsx'));

// Specific/Working Blog Pages (Live)
const HowOftenCleanYard = React.lazy(() => import('@/pages/blog/HowOftenCleanYardPage.jsx'));
const PodcastBlogPost = React.lazy(() => import('@/pages/blog/PodcastBlogPost.jsx'));
const BlogArticle1 = React.lazy(() => import('@/pages/blog/BlogArticle1_ProfessionalWasteRemovalBenefits.jsx'));
const BlogArticle2 = React.lazy(() => import('@/pages/blog/BlogArticle2_SeasonalPetCareTips.jsx'));
const BlogArticle3 = React.lazy(() => import('@/pages/blog/BlogArticle3_HealthBenefitsYardCleanup.jsx'));
const BlogArticle4 = React.lazy(() => import('@/pages/blog/BlogArticle4_CustomerSuccessStories.jsx'));
const BlogArticle5 = React.lazy(() => import('@/pages/blog/BlogArticle5_DIYVsProfessional.jsx'));
const BlogArticle6 = React.lazy(() => import('@/pages/blog/BlogArticle6_LawnHealthAndPetWaste.jsx'));
const BlogArticle7 = React.lazy(() => import('@/pages/blog/BlogArticle7_HealthRisksOfPetWaste.jsx'));
const BlogArticle8 = React.lazy(() => import('@/pages/blog/BlogArticle8_PetWasteManagementGuide.jsx'));
const HowOftenScoopDogPoopChattanooga = React.lazy(() => import('@/pages/blog/HowOftenScoopDogPoopChattanooga.jsx'));
const HowItWorksPage = React.lazy(() => import('@/pages/HowItWorksPage.jsx'));
const SpringPetCareChecklist = React.lazy(() => import('@/pages/blog/SpringPetCareChecklist.jsx'));
const IsDogWasteBadForLawn = React.lazy(() => import('@/pages/blog/IsDogWasteBadForLawn.jsx'));
const BestPooperScooperServicesChattanooga = React.lazy(() => import('@/pages/blog/BestPooperScooperServicesChattanooga.jsx'));
const IsDogPoopHurtingYourChattanoogaYard = React.lazy(() => import('@/pages/blog/IsDogPoopHurtingYourChattanoogaYard.jsx'));

const ChattanoogaHomeownersPage = React.lazy(() => import('@/pages/blog/ChattanoogaHomeownersPage.jsx'));
const CommercialPetWastePage = React.lazy(() => import('@/pages/blog/CommercialPetWastePage.jsx'));
const BlogSignalMountain = React.lazy(() => import('@/pages/blog/BlogSignalMountainPage.jsx'));
const BlogSoddyDaisy = React.lazy(() => import('@/pages/blog/BlogSoddyDaisyPage.jsx'));

// Media / Utilities
const PodcastPage = React.lazy(() => import('@/pages/PodcastPage.jsx'));
const RedditOAuthCallbackPage = React.lazy(() => import('@/pages/RedditOAuthCallbackPage.jsx'));
const QuickBooksOAuthCallbackPage = React.lazy(() => import('@/pages/QuickBooksOAuthCallbackPage.jsx'));

// Sitemap Route
const SitemapXML = React.lazy(() => import('@/pages/SitemapXML.jsx'));

const RouteTracker = () => {
  const location = useLocation();
  const { trackPageView } = usePixel();

  useEffect(() => {
    trackPageView();
  }, [location, trackPageView]);

  return null;
};

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-muted-foreground font-medium">Loading...</p>
    </div>
  </div>
);




function App() {
  useGTM('GTM-59B5PDXS');

  return (
    <Router>
      <Helmet>
        <meta property="og:title" content="Scoopy Doo LLC" />
        <meta property="og:description" content="Scoopy Doo, Chattanooga Pet Waste Removal" />
        <meta property="og:image" content="https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_BASE_URL} />
        <script type="application/ld+json">
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
          <Route path="/sitemap.xml" element={<SitemapXML />} />

          <Route path="/" element={<CoreServicePage />} />
          <Route path="/near-me" element={<NearMePage />} />
          <Route path="/one-time-cleanup" element={<OneTimeCleanupPage />} />

          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/quote" element={<QuoteRequestPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/spring-special" element={<SpringSpecialPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          
          <Route path="/dog-poop-removal-chattanooga" element={<DogPoopRemovalPage />} />
          <Route path="/pet-waste-removal-chattanooga" element={<PetWasteRemovalPage />} />
          <Route path="/dog-poop-scooping-chattanooga" element={<DogPoopScoopingPage />} />
          <Route path="/yard-cleanup-chattanooga" element={<YardCleanupPage />} />

          <Route path="/pet-safe-checklist" element={<PetSafeChecklistLandingPage />} />
          <Route path="/dog-park-guide" element={<DogParkGuideLandingPage />} />
          
          <Route path="/podcast" element={<PodcastPage />} />

          <Route path="/reddit-oauth-callback" element={<RedditOAuthCallbackPage />} />
          <Route path="/qb-oauth-callback" element={<QuickBooksOAuthCallbackPage />} />
          
          <Route path="/service-areas" element={<ServiceAreasPage />} />
          <Route path="/service/:slug" element={<LocationTemplate />} />

          <Route path="/blog" element={<BlogListPage />} />
                                      <Route path="/blog/professional-waste-removal-benefits" element={<BlogArticle1 />} />
              <Route path="/blog/seasonal-pet-care-tips" element={<BlogArticle2 />} />
              <Route path="/blog/health-benefits-yard-cleanup" element={<BlogArticle3 />} />
              <Route path="/blog/customer-success-stories" element={<BlogArticle4 />} />
              <Route path="/blog/diy-vs-professional" element={<BlogArticle5 />} />
              <Route path="/blog/lawn-health-and-pet-waste" element={<BlogArticle6 />} />
              <Route path="/blog/health-risks-of-pet-waste" element={<BlogArticle7 />} />
              <Route path="/blog/pet-waste-management-guide" element={<BlogArticle8 />} />
              <Route path="/blog/how-often-scoop-dog-poop-chattanooga" element={<HowOftenScoopDogPoopChattanooga />} />
                            <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/blog/spring-pet-care-checklist" element={<SpringPetCareChecklist />} />
              <Route path="/blog/is-dog-waste-bad-for-lawn" element={<IsDogWasteBadForLawn />} />
              <Route path="/blog/best-pooper-scooper-services-chattanooga" element={<BestPooperScooperServicesChattanooga />} />
              <Route path="/blog/is-dog-poop-hurting-your-chattanooga-yard" element={<IsDogPoopHurtingYourChattanoogaYard />} />
              <Route path="/blog/chattanooga-pet-waste-removal-homeowners" element={<ChattanoogaHomeownersPage />} />
          <Route path="/blog/commercial-pet-waste-removal-chattanooga" element={<CommercialPetWastePage />} />
          <Route path="/blog/how-often-clean-yard" element={<HowOftenCleanYard />} />
          <Route path="/blog/podcast-blog" element={<PodcastBlogPost />} />
          <Route path="/blog/signal-mountain" element={<BlogSignalMountain />} />
          <Route path="/blog/soddy-daisy" element={<BlogSoddyDaisy />} />
          
          <Route path="/blog/:slug" element={<BlogPostTemplate />} />

          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
                <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="text-primary hover:underline font-bold">Back to home</a>
              </div>
            </div>
          } />
        </Routes>
      </Suspense>
      
      <ScoopyHelperWidget />
      <Toaster />
    </Router>
  );
}

export default App;
