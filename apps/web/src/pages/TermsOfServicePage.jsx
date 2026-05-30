
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Clock, CreditCard, AlertCircle, FileText } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';

const TermsOfServicePage = () => {
  const lastUpdated = "May 8, 2026";
  const canonicalUrl = getCanonicalUrl('/terms-of-service');
  const pageTitle = "Terms of Service | Scoopy Doo Pet Waste Removal";
  const pageDesc = "Read the terms of service and user agreement for Scoopy Doo pet waste removal services in Chattanooga.";

  const sections = [
    {
      id: "introduction",
      title: "1. Acceptance of Terms",
      icon: <FileText className="w-6 h-6 text-primary" />,
      content: (
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Welcome to Scoopy Chatt (doing business as "Scoopy Doo Pet Waste Removal"). By accessing our website, booking our services, or interacting with our platform, you agree to be bound by these Terms of Service. 
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Please read these terms carefully. If you do not agree with any part of these terms, you may not use our services. We reserve the right to update or modify these terms at any time, and continued use of our services constitutes acceptance of those changes.
          </p>
        </>
      )
    },
    {
      id: "service-description",
      title: "2. Service Description and Terms",
      icon: <Shield className="w-6 h-6 text-primary" />,
      content: (
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            We provide professional pet waste removal services for residential and commercial properties in the Greater Chattanooga Metro Area. Our standard service includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>Scheduled visits (weekly, bi-weekly, or one-time) to locate and remove pet waste.</li>
            <li>Secure bagging and off-site disposal or disposal in your designated outdoor receptacle, depending on your selected service plan.</li>
            <li>Sanitization of tools and equipment between yards to prevent cross-contamination.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Service schedules may occasionally shift due to severe weather, holidays, or unexpected routing adjustments. We will notify you promptly if a scheduled visit must be moved.
          </p>
        </>
      )
    },
    {
      id: "user-responsibilities",
      title: "3. User Responsibilities and Conduct",
      icon: <AlertCircle className="w-6 h-6 text-primary" />,
      content: (
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            To ensure the safety of our technicians and the efficiency of our service, we ask that clients adhere to the following guidelines:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li><strong>Yard Access:</strong> Gates must be unlocked on your scheduled service day. If we cannot access your yard, we will attempt to contact you, but the visit may be skipped and charged as normal.</li>
            <li><strong>Aggressive Pets:</strong> For the safety of our team, aggressive or overly protective dogs must be kept inside during our visit. If a technician feels unsafe, we reserve the right to leave the property and skip the service for that day.</li>
            <li><strong>Overgrown Grass/Leaves:</strong> We cannot guarantee the removal of waste that is hidden in tall grass, heavy leaf cover, or debris. Yards must be reasonably maintained.</li>
          </ul>
        </>
      )
    },
    {
      id: "payment-terms",
      title: "4. Payment Terms and Billing",
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      content: (
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Services are billed securely via our automated payment processing system. By placing a card on file, you authorize us to charge for recurring services.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li><strong>Recurring Billing:</strong> Regular service plans are billed either per-visit or monthly in advance, depending on your chosen agreement.</li>
            <li><strong>One-Time Cleanups:</strong> Payment for one-time or initial spring cleanups is required upon completion of the service.</li>
            <li><strong>Declined Payments:</strong> Services will be paused if payment methods fail. A small late fee may be applied to accounts more than 15 days past due.</li>
          </ul>
        </>
      )
    },
    {
      id: "cancellation",
      title: "5. Cancellation and Refund Policy",
      icon: <Clock className="w-6 h-6 text-primary" />,
      content: (
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            You may cancel your recurring service at any time with no long-term contracts or cancellation fees. 
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            We require a 24-hour notice prior to your next scheduled service to pause or cancel. If a cancellation is requested less than 24 hours before a visit, that specific visit may still be charged. We do not offer partial refunds for mid-billing cycle cancellations, but we will complete the remaining services paid for.
          </p>
        </>
      )
    },
    {
      id: "liability",
      title: "6. Limitation of Liability",
      icon: <Shield className="w-6 h-6 text-primary" />,
      content: (
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            While we take the utmost care while on your property, Scoopy Chatt is not liable for existing property damage, unsecured gates resulting in escaped pets (though we double-check all gates upon exit), or health issues occurring in your pets.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our liability for any direct damages arising from our service shall be strictly limited to the amount paid by you for the specific service visit in question.
          </p>
        </>
      )
    },
    {
      id: "modifications",
      title: "7. Modifications to Terms",
      icon: <FileText className="w-6 h-6 text-primary" />,
      content: (
        <p className="text-muted-foreground leading-relaxed">
          We reserve the right to modify these Terms of Service at any time. Significant changes to billing, service structure, or policies will be communicated to active clients via the email address on file. Continued use of our services following any changes indicates your acceptance of the new terms.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <Header />

      <main className="flex-grow">
        <section className="bg-primary/5 border-b border-primary/10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight text-balance"
            >
              Terms of Service
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Please read these terms carefully before using our pet waste removal services.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-background border border-border text-sm font-medium text-muted-foreground"
            >
              Last Updated: {lastUpdated}
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div 
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"
                >
                  <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-border">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    {section.content}
                  </div>
                </motion.div>
              ))}

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-primary/5 rounded-2xl p-8 border border-primary/20"
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  8. Contact Information
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  If you have any questions or concerns regarding these terms, please don't hesitate to contact our support team. We're here to help!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-background rounded-xl p-4 flex items-center space-x-3 border border-border shadow-sm">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-bold text-foreground">423-600-5040</p>
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-4 flex items-center space-x-3 border border-border shadow-sm">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</p>
                      <p className="text-sm font-bold text-foreground">Chattanooga, TN</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
