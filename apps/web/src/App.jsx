
import React, { useEffect, Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ChatWidgetGate from '@/components/ChatWidgetGate.jsx';

import { useGTM } from '@/hooks/useGTM.js';
import { usePixel } from '@/hooks/usePixel.js';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';

// Lazy loaded pages for code splitting
const CoreServicePage = React.lazy(() => import('@/pages/CoreServicePage.jsx'));
const NearMePage = React.lazy(() => import('@/pages/NearMePage.jsx'));
const CostCalculatorPage = React.lazy(() => import('@/pages/CostCalculatorPage.jsx'));
const OneTimeCleanupPage = React.lazy(() => import('@/pages/OneTimeCleanupPage.jsx'));
const ServicesPage = React.lazy(() => import('@/pages/ServicesPage.jsx'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage.jsx'));
const PressPage = React.lazy(() => import('@/pages/PressPage.jsx'));
const FAQPage = React.lazy(() => import('@/pages/FAQPage.jsx'));
const ComparisonPage = React.lazy(() => import('@/pages/ComparisonPage.jsx'));
const QuoteRequestPage = React.lazy(() => import('@/pages/QuoteRequestPage.jsx'));
const ThankYouPage = React.lazy(() => import('@/pages/ThankYouPage.jsx'));
const SpringSpecialPage = React.lazy(() => import('@/pages/SpringSpecialPage.jsx'));
const DoggyDoorsPage = React.lazy(() => import('@/pages/DoggyDoorsPage.jsx'));
const DoggyDoorsBookingPage = React.lazy(() => import('@/pages/DoggyDoorsBookingPage.jsx'));
const PrivacyPolicyPage = React.lazy(() => import('@/pages/PrivacyPolicyPage.jsx'));
const TermsOfServicePage = React.lazy(() => import('@/pages/TermsOfServicePage.jsx'));
const PetSafeChecklistLandingPage = React.lazy(() => import('@/pages/PetSafeChecklistLandingPage.jsx'));
const DogParkGuideLandingPage = React.lazy(() => import('@/pages/DogParkGuideLandingPage.jsx'));
const DogPoopRemovalPage = React.lazy(() => import('@/pages/DogPoopRemovalPage.jsx'));
const PetWasteRemovalPage = React.lazy(() => import('@/pages/PetWasteRemovalPage.jsx'));
const DogPoopScoopingPage = React.lazy(() => import('@/pages/DogPoopScoopingPage.jsx'));
const YardCleanupPage = React.lazy(() => import('@/pages/YardCleanupPage.jsx'));
const ServiceAreasPage = React.lazy(() => import('@/pages/ServiceAreasPage.jsx'));
const PricingPage = React.lazy(() => import('@/pages/PricingPage.jsx'));
const CommercialPage = React.lazy(() => import('@/pages/CommercialPage.jsx'));
const ReviewsPage = React.lazy(() => import('@/pages/ReviewsPage.jsx'));

// Location Template for dynamic routing
const LocationTemplate = React.lazy(() => import('@/components/LocationTemplate.jsx'));

// Blogs
const BlogListPage = React.lazy(() => import('@/pages/BlogListPage.jsx'));

// Specific/Working Blog Pages (Live)
const HowOftenCleanYard = React.lazy(() => import('@/pages/blog/HowOftenCleanYardPage.jsx'));
const PodcastBlogPost = React.lazy(() => import('@/pages/blog/PodcastBlogPost.jsx'));
const ChattanoogaHomeownersPage = React.lazy(() => import('@/pages/blog/ChattanoogaHomeownersPage.jsx'));
const CommercialPetWastePage = React.lazy(() => import('@/pages/blog/CommercialPetWastePage.jsx'));
const FallYardCareChecklistChattanooga = React.lazy(() => import('@/pages/blog/FallYardCareChecklistChattanooga.jsx'));
const MovingToChattanoogaWithADog = React.lazy(() => import('@/pages/blog/MovingToChattanoogaWithADog.jsx'));
const BlogSignalMountain = React.lazy(() => import('@/pages/blog/BlogSignalMountainPage.jsx'));
const BlogSoddyDaisy = React.lazy(() => import('@/pages/blog/BlogSoddyDaisyPage.jsx'));
const DogPoopCleanupSummerHeat = React.lazy(() => import('@/pages/blog/DogPoopCleanupSummerHeatChattanooga.jsx'));
const DogPoopLawsChattanooga = React.lazy(() => import('@/pages/blog/DogPoopLawsChattanooga.jsx'));
const WhatPetWasteRemovalIncludesChattanooga = React.lazy(() => import('@/pages/blog/WhatPetWasteRemovalIncludesChattanooga.jsx'));
const DogParksChattanooga = React.lazy(() => import('@/pages/blog/DogParksChattanoogaPage.jsx'));
const WinterDogPoopCleanupChattanooga = React.lazy(() => import('@/pages/blog/WinterDogPoopCleanupChattanooga.jsx'));
const PooperScooperCostChattanooga = React.lazy(() => import('@/pages/blog/PooperScooperCostChattanooga.jsx'));
const NorthGeorgiaDogPoopRemoval = React.lazy(() => import('@/pages/blog/NorthGeorgiaDogPoopRemoval.jsx'));
const OneTimeDogPoopCleanupChattanooga = React.lazy(() => import('@/pages/blog/OneTimeDogPoopCleanupChattanooga.jsx'));
const HOAPetWasteRemovalChattanooga = React.lazy(() => import('@/pages/blog/HOAPetWasteRemovalChattanooga.jsx'));
const DogDoorInstallationChattanooga = React.lazy(() => import('@/pages/blog/DogDoorInstallationChattanooga.jsx'));
const WeeklyVsBiweeklyDogPoopServiceChattanooga = React.lazy(() => import('@/pages/blog/WeeklyVsBiweeklyDogPoopServiceChattanooga.jsx'));
const PetWasteStationsApartmentsHOAsChattanooga = React.lazy(() => import('@/pages/blog/PetWasteStationsApartmentsHOAsChattanooga.jsx'));
const YardCleanupBeforePartyChattanoogaNorthGeorgia = React.lazy(() => import('@/pages/blog/YardCleanupBeforePartyChattanoogaNorthGeorgia.jsx'));
const DogPoopSmellInYardChattanooga = React.lazy(() => import('@/pages/blog/DogPoopSmellInYardChattanooga.jsx'));
const NewPuppyOwnerGuideChattanooga = React.lazy(() => import('@/pages/blog/NewPuppyOwnerGuideChattanooga.jsx'));
const YardCleanupBeforeSellingHomeChattanooga = React.lazy(() => import('@/pages/blog/YardCleanupBeforeSellingHomeChattanooga.jsx'));

// Blog posts that shipped as components but were never routed (they used to fall
// through to /blog/:slug and render an empty template titled "undefined")
const ProfessionalWasteRemovalBenefits = React.lazy(() => import('@/pages/blog/BlogArticle1_ProfessionalWasteRemovalBenefits.jsx'));
const SeasonalPetCareTips = React.lazy(() => import('@/pages/blog/BlogArticle2_SeasonalPetCareTips.jsx'));
const HealthBenefitsYardCleanup = React.lazy(() => import('@/pages/blog/BlogArticle3_HealthBenefitsYardCleanup.jsx'));
const CustomerSuccessStories = React.lazy(() => import('@/pages/blog/BlogArticle4_CustomerSuccessStories.jsx'));
const DIYVsProfessional = React.lazy(() => import('@/pages/blog/BlogArticle5_DIYVsProfessional.jsx'));
const LawnHealthAndPetWaste = React.lazy(() => import('@/pages/blog/BlogArticle6_LawnHealthAndPetWaste.jsx'));
const HealthRisksOfPetWaste = React.lazy(() => import('@/pages/blog/BlogArticle7_HealthRisksOfPetWaste.jsx'));
const PetWasteManagementGuide = React.lazy(() => import('@/pages/blog/BlogArticle8_PetWasteManagementGuide.jsx'));
const HowOftenScoopDogPoopChattanooga = React.lazy(() => import('@/pages/blog/HowOftenScoopDogPoopChattanooga.jsx'));
const IsDogWasteBadForLawn = React.lazy(() => import('@/pages/blog/IsDogWasteBadForLawn.jsx'));
const IsDogPoopHurtingYourChattanoogaYard = React.lazy(() => import('@/pages/blog/IsDogPoopHurtingYourChattanoogaYard.jsx'));
const BestPooperScooperServicesChattanooga = React.lazy(() => import('@/pages/blog/BestPooperScooperServicesChattanooga.jsx'));
const SpringPetCareChecklist = React.lazy(() => import('@/pages/blog/SpringPetCareChecklist.jsx'));
const ApawsMemberChattanooga = React.lazy(() => import('@/pages/blog/ApawsMemberChattanooga.jsx'));

// Media / Utilities
const PodcastPage = React.lazy(() => import('@/pages/PodcastPage.jsx'));
const RedditOAuthCallbackPage = React.lazy(() => import('@/pages/RedditOAuthCallbackPage.jsx'));
const QuickBooksOAuthCallbackPage = React.lazy(() => import('@/pages/QuickBooksOAuthCallbackPage.jsx'));

// Sitemap Route
const SitemapXML = React.lazy(() => import('@/pages/SitemapXML.jsx'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage.jsx'));
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
      </Helmet>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <ScrollToTop />
        <ChatWidgetGate />
      <RouteTracker />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/sitemap.xml" element={<SitemapXML />} />

          <Route path="/" element={<CoreServicePage />} />
          <Route path="/near-me" element={<NearMePage />} />
          <Route path="/one-time-cleanup" element={<OneTimeCleanupPage />} />
          <Route path="/cost-calculator" element={<CostCalculatorPage />} />

          <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/commercial" element={<CommercialPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/quote" element={<QuoteRequestPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/spring-special" element={<SpringSpecialPage />} />
          <Route path="/doggy-doors" element={<DoggyDoorsPage />} />
          <Route path="/doggy-doors/book" element={<DoggyDoorsBookingPage />} />
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
          <Route path="/blog/chattanooga-pet-waste-removal-homeowners" element={<ChattanoogaHomeownersPage />} />
          <Route path="/blog/commercial-pet-waste-removal-chattanooga" element={<CommercialPetWastePage />} />
        <Route path="/blog/fall-yard-care-checklist-chattanooga" element={<FallYardCareChecklistChattanooga />} />
      <Route path="/blog/moving-to-chattanooga-with-a-dog" element={<MovingToChattanoogaWithADog />} />
          <Route path="/blog/how-often-clean-yard" element={<HowOftenCleanYard />} />
          <Route path="/blog/podcast-blog" element={<PodcastBlogPost />} />
          <Route path="/blog/signal-mountain" element={<BlogSignalMountain />} />
          <Route path="/blog/soddy-daisy" element={<BlogSoddyDaisy />} />
          <Route path="/blog/dog-poop-cleanup-chattanooga-summer-heat" element={<DogPoopCleanupSummerHeat />} />
          <Route path="/blog/dog-poop-laws-chattanooga" element={<DogPoopLawsChattanooga />} />
          <Route path="/blog/what-pet-waste-removal-includes-chattanooga" element={<WhatPetWasteRemovalIncludesChattanooga />} />
          <Route path="/blog/best-dog-parks-chattanooga-tn" element={<DogParksChattanooga />} />
          <Route path="/blog/winter-dog-poop-cleanup-chattanooga" element={<WinterDogPoopCleanupChattanooga />} />
          
          <Route path="/blog/pooper-scooper-cost-chattanooga" element={<PooperScooperCostChattanooga />} />
          <Route path="/blog/dog-poop-removal-north-georgia" element={<NorthGeorgiaDogPoopRemoval />} />
          <Route path="/blog/one-time-dog-poop-cleanup-chattanooga" element={<OneTimeDogPoopCleanupChattanooga />} />
          <Route path="/blog/hoa-pet-waste-removal-chattanooga" element={<HOAPetWasteRemovalChattanooga />} />
          <Route path="/blog/dog-door-installation-chattanooga" element={<DogDoorInstallationChattanooga />} />
          <Route path="/blog/weekly-vs-biweekly-dog-poop-service-chattanooga" element={<WeeklyVsBiweeklyDogPoopServiceChattanooga />} />
          <Route path="/blog/pet-waste-stations-apartments-hoas-chattanooga" element={<PetWasteStationsApartmentsHOAsChattanooga />} />
          <Route path="/blog/yard-cleanup-before-a-party-chattanooga" element={<YardCleanupBeforePartyChattanoogaNorthGeorgia />} />
          <Route path="/blog/how-to-get-rid-of-dog-poop-smell-in-yard-chattanooga" element={<DogPoopSmellInYardChattanooga />} />
<Route path="/blog/new-puppy-pet-waste-removal-chattanooga" element={<NewPuppyOwnerGuideChattanooga />} />
<Route path="/blog/yard-cleanup-before-selling-home-chattanooga" element={<YardCleanupBeforeSellingHomeChattanooga />} />
          <Route path="/blog/professional-waste-removal-benefits" element={<ProfessionalWasteRemovalBenefits />} />
          <Route path="/blog/seasonal-pet-care-tips" element={<SeasonalPetCareTips />} />
          <Route path="/blog/health-benefits-yard-cleanup" element={<HealthBenefitsYardCleanup />} />
          <Route path="/blog/customer-success-stories" element={<CustomerSuccessStories />} />
          <Route path="/blog/diy-vs-professional" element={<DIYVsProfessional />} />
          <Route path="/blog/lawn-health-and-pet-waste" element={<LawnHealthAndPetWaste />} />
          <Route path="/blog/health-risks-of-pet-waste" element={<HealthRisksOfPetWaste />} />
          <Route path="/blog/pet-waste-management-guide" element={<PetWasteManagementGuide />} />
          <Route path="/blog/how-often-scoop-dog-poop-chattanooga" element={<HowOftenScoopDogPoopChattanooga />} />
          <Route path="/blog/is-dog-waste-bad-for-lawn" element={<IsDogWasteBadForLawn />} />
          <Route path="/blog/is-dog-poop-hurting-your-chattanooga-yard" element={<IsDogPoopHurtingYourChattanoogaYard />} />
          <Route path="/blog/best-pooper-scooper-services-chattanooga" element={<BestPooperScooperServicesChattanooga />} />
          <Route path="/blog/spring-pet-care-checklist" element={<SpringPetCareChecklist />} />
          <Route path="/blog/apaws-member-pet-waste-removal-chattanooga" element={<ApawsMemberChattanooga />} />

          <Route path="/how-it-works" element={<HowItWorksPage />} />

          <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </Suspense>
      
      <Toaster />
    </Router>
  );
}

export default App;
