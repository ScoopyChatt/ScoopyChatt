
import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { Shield, Database, Lock, Eye, FileText, Bell, Phone, MapPin, MessageSquare } from &rsquo;lucide-react&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import FloatingCTA from &rsquo;@/components/FloatingCTA.jsx&rsquo;;
import { Card, CardContent } from &rsquo;@/components/ui/card&rsquo;;
import { getCanonicalUrl } from &rsquo;@/utils/seoHelpers.js&rsquo;;

const PrivacyPolicyPage = () => {
  const lastUpdated = &rdquo;June 7, 2026&rdquo;;
  const canonicalUrl = getCanonicalUrl(&rsquo;/privacy-policy&rsquo;);
  const pageTitle = &rdquo;Privacy Policy | Scoopy Doo Pet Waste Removal&rdquo;;
  const pageDesc = &rdquo;Read our privacy policy to understand how Scoopy Doo protects and uses your information while providing pet waste removal services.&rdquo;;

  const sections = [
    {
      id: &rdquo;information-collection&rdquo;,
      icon: Database,
      title: &rdquo;Information Collection&rdquo;,
      content: (
        <div className=&rdquo;space-y-4 text-muted-foreground leading-relaxed&rdquo;>
          <p>We collect information that you voluntarily provide to us when you request a quote, schedule a service, or contact our customer support. This information includes:</p>
          <ul className=&rdquo;list-disc pl-5 space-y-2&rdquo;>
            <li><strong className=&rdquo;text-foreground&rdquo;>Contact Information:</strong> Your name, email address, phone number, and physical address for service delivery.</li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Service Requests:</strong> Details about your yard size, gate access codes or instructions, and specific service preferences.</li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Pet Information:</strong> The number, breed, and names of your dogs to ensure our technicians approach your property with the right preparation and care.</li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Usage Data:</strong> Automatically collected information about how you interact with our website, such as IP addresses, browser types, and pages visited, to help us improve our digital experience.</li>
          </ul>
        </div>
      )
    },
    {
      id: &rdquo;how-we-use&rdquo;,
      icon: Eye,
      title: &rdquo;How We Use Your Information&rdquo;,
      content: (
        <div className=&rdquo;space-y-4 text-muted-foreground leading-relaxed&rdquo;>
          <p>Your information is primarily used to provide you with reliable, high-quality pet waste removal services. Specifically, we use your data to:</p>
          <ul className=&rdquo;list-disc pl-5 space-y-2&rdquo;>
            <li><strong className=&rdquo;text-foreground&rdquo;>Deliver Services:</strong> Route our technicians efficiently to your property and ensure they have the necessary access instructions.</li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Communication:</strong> Send you service reminders, &rdquo;on-the-way&rdquo; notifications, completion confirmations, and billing invoices.</li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Marketing &amp; Promotions:</strong> Occasionally send you special offers, referral discounts, or newsletters. <em className=&rdquo;text-foreground/80&rdquo;>You may opt out of marketing communications at any time by replying STOP to any text message or clicking the &rdquo;unsubscribe&rdquo; link in our emails.</em></li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Service Improvement:</strong> Analyze customer feedback and service patterns to enhance our offerings and training procedures.</li>
          </ul>
        </div>
      )
    },
    {
      id: &rdquo;sms-messaging&rdquo;,
      icon: MessageSquare,
      title: &rdquo;SMS & Text Messaging (A2P)&rdquo;,
      content: (
        <div className=&rdquo;space-y-4 text-muted-foreground leading-relaxed&rdquo;>
          <p>Scoopy Doo LLC sends automated text messages (SMS) to customers who provide their mobile phone number. By providing your phone number and requesting or scheduling service, you consent to receive text messages from us at the number provided.</p>

          <p><strong className=&rdquo;text-foreground&rdquo;>Types of messages we send:</strong></p>
          <ul className=&rdquo;list-disc pl-5 space-y-2&rdquo;>
            <li><strong className=&rdquo;text-foreground&rdquo;>Transactional / Service Messages:</strong> Appointment confirmations, &rdquo;on-the-way&rdquo; arrival notifications, post-service completion confirmations, and gate-closed photo alerts. These are sent in connection with your active service.</li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Account &amp; Billing Notifications:</strong> Invoice reminders, payment receipts, and account updates.</li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Promotional Messages:</strong> Seasonal specials, referral offers, and service announcements. These are sent only to customers who have not opted out.</li>
          </ul>

          <p><strong className=&rdquo;text-foreground&rdquo;>Message frequency:</strong> Message frequency varies. Transactional messages are sent around each scheduled service visit. Promotional messages are sent no more than 4 times per month.</p>

          <p><strong className=&rdquo;text-foreground&rdquo;>Message and data rates may apply.</strong> Standard SMS and data rates charged by your mobile carrier may apply to messages you send and receive from us.</p>

          <p><strong className=&rdquo;text-foreground&rdquo;>How to opt out:</strong> You may opt out of receiving text messages from us at any time by replying <strong>STOP</strong> to any message we send. After opting out, you will receive one final confirmation text, and then no further messages. To opt back in, reply <strong>START</strong> or contact us directly.</p>

          <p><strong className=&rdquo;text-foreground&rdquo;>Consent is not a condition of purchase.</strong> You are not required to consent to receiving promotional text messages as a condition of purchasing any services from Scoopy Doo LLC.</p>

          <p><strong className=&rdquo;text-foreground&rdquo;>No third-party sharing of mobile information:</strong> We do not sell, rent, or share your mobile phone number or SMS opt-in data with third parties or affiliates for their own marketing purposes. Mobile information collected through our SMS program will not be shared with any third party for marketing or promotional purposes.</p>

          <p>For help with our text messaging program, reply <strong>HELP</strong> to any message or contact us at <a href=&rdquo;tel:423-600-5040&rdquo; className=&rdquo;text-primary hover:underline&rdquo;>(423) 600-5040</a> or <a href=&rdquo;mailto:info@scoopychatt.com&rdquo; className=&rdquo;text-primary hover:underline&rdquo;>info@scoopychatt.com</a>.</p>
        </div>
      )
    },
    {
      id: &rdquo;data-protection&rdquo;,
      icon: Lock,
      title: &rdquo;Data Protection and Security&rdquo;,
      content: (
        <div className=&rdquo;space-y-4 text-muted-foreground leading-relaxed&rdquo;>
          <p>Scoopy Doo takes the security of your personal and property information seriously. We implement industry-standard physical, technical, and administrative security measures to protect your data from unauthorized access, alteration, or disclosure.</p>
          <p>This includes secure encryption for online payments (processed through verified third-party payment gateways; we do not store full credit card numbers on our servers) and strict access controls for our dispatch and routing software. We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy and to comply with our legal obligations.</p>
        </div>
      )
    },
    {
      id: &rdquo;third-party-sharing&rdquo;,
      icon: Shield,
      title: &rdquo;Third-Party Sharing&rdquo;,
      content: (
        <div className=&rdquo;space-y-4 text-muted-foreground leading-relaxed&rdquo;>
          <p><strong>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</strong></p>
          <p>We only share your information with trusted third-party service providers who assist us in operating our business, such as:</p>
          <ul className=&rdquo;list-disc pl-5 space-y-2&rdquo;>
            <li>Payment processors for secure billing.</li>
            <li>Routing and dispatch software providers to schedule our technicians.</li>
            <li>Email and SMS delivery services for service notifications.</li>
          </ul>
          <p>These providers are contractually obligated to keep your information confidential and use it solely for the specific services they perform for Scoopy Doo. Mobile opt-in data and consent are never shared with third parties for marketing purposes.</p>
        </div>
      )
    },
    {
      id: &rdquo;customer-rights&rdquo;,
      icon: FileText,
      title: &rdquo;Your Customer Rights&rdquo;,
      content: (
        <div className=&rdquo;space-y-4 text-muted-foreground leading-relaxed&rdquo;>
          <p>Depending on your jurisdiction, you may have specific rights regarding your personal data. At Scoopy Doo, we extend these fundamental rights to all our customers:</p>
          <ul className=&rdquo;list-disc pl-5 space-y-2&rdquo;>
            <li><strong className=&rdquo;text-foreground&rdquo;>Access:</strong> You have the right to request a copy of the personal information we hold about you.</li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Correction:</strong> You can request that we correct any inaccurate or incomplete information regarding your account or property details.</li>
            <li><strong className=&rdquo;text-foreground&rdquo;>Deletion:</strong> You may request the deletion of your personal data, subject to certain legal exceptions (e.g., retaining records for tax purposes or dispute resolution).</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the information provided at the bottom of this policy.</p>
        </div>
      )
    },
    {
      id: &rdquo;policy-updates&rdquo;,
      icon: Bell,
      title: &rdquo;Policy Updates&rdquo;,
      content: (
        <div className=&rdquo;space-y-4 text-muted-foreground leading-relaxed&rdquo;>
          <p>We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will notify you by updating the &rdquo;Last Updated&rdquo; date at the top of this policy and, where appropriate, sending a notification to the email address associated with your account. We encourage you to review this page periodically to stay informed about how we are protecting your information.</p>
        </div>
      )
    }
  ];

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name=&rdquo;description&rdquo; content={pageDesc} />
        <link rel=&rdquo;canonical&rdquo; href={canonicalUrl} />
        <meta property=&rdquo;og:title&rdquo; content={pageTitle} />
        <meta property=&rdquo;og:description&rdquo; content={pageDesc} />
        <meta property=&rdquo;og:url&rdquo; content={canonicalUrl} />
        <meta name=&rdquo;twitter:card&rdquo; content=&rdquo;summary&rdquo; />
      </Helmet>

      <Header />

      <main className=&rdquo;flex-grow pb-24 md:pb-0&rdquo;>
        <section className=&rdquo;pt-20 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/50&rdquo;>
          <div className=&rdquo;max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center&rdquo;>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className=&rdquo;inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6&rdquo;>
                <Shield className=&rdquo;w-8 h-8 text-primary&rdquo; />
              </div>
              <h1 className=&rdquo;text-4xl md:text-5xl font-bold mb-6 text-balance tracking-tight&rdquo;>
              Privacy Policy &mdash; How Scoopy Doo Protects Your Personal Information
            </h1>
              <p className=&rdquo;text-lg text-muted-foreground max-w-2xl mx-auto&rdquo;>
                At Scoopy Doo, we respect your privacy as much as we respect your yard. This policy outlines how we handle your personal information with care and security.
              </p>
              <p className=&rdquo;text-sm font-medium text-muted-foreground mt-6&rdquo;>
                Last Updated: {lastUpdated}
              </p>
            </motion.div>
          </div>
        </section>

        <section className=&rdquo;py-16 md:py-24&rdquo;>
          <div className=&rdquo;max-w-3xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className=&rdquo;prose prose-lg dark:prose-invert max-w-none mb-16&rdquo;
            >
              <p className=&rdquo;text-lg text-muted-foreground leading-relaxed&rdquo;>
                Welcome to Scoopy Doo (also operating as Scoopy Chatt). As Chattanooga&rsquo;s trusted pet waste removal service, we know that inviting us onto your property requires trust. Part of that trust involves being completely transparent about how we collect, use, and protect the personal information of our clients in Chattanooga, Tennessee, and the surrounding areas.
              </p>
            </motion.div>

            <div className=&rdquo;space-y-12&rdquo;>
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className=&rdquo;border-border/50 shadow-sm overflow-hidden&rdquo;>
                    <CardContent className=&rdquo;p-8&rdquo;>
                      <div className=&rdquo;flex items-center space-x-4 mb-6&rdquo;>
                        <div className=&rdquo;bg-primary/10 p-3 rounded-xl&rdquo;>
                          <section.icon className=&rdquo;w-6 h-6 text-primary&rdquo; />
                        </div>
                        <h2 className=&rdquo;text-2xl font-bold text-foreground m-0&rdquo;>{section.title}</h2>
                      </div>
                      {section.content}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className=&rdquo;mt-16 bg-card border border-border rounded-2xl p-8 shadow-md text-center&rdquo;
            >
              <h2 className=&rdquo;text-2xl font-bold text-foreground mb-4&rdquo;>Contact Information</h2>
              <p className=&rdquo;text-muted-foreground mb-8 max-w-lg mx-auto&rdquo;>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please don&rsquo;t hesitate to reach out to our team.
              </p>

              <div className=&rdquo;grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto&rdquo;>
                <a href=&rdquo;tel:423-600-5040&rdquo; className=&rdquo;flex flex-col items-center p-6 bg-muted/50 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors group&rdquo;>
                  <Phone className=&rdquo;w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform&rdquo; />
                  <span className=&rdquo;font-bold text-lg text-foreground group-hover:text-primary transition-colors&rdquo;>423-600-5040</span>
                  <span className=&rdquo;text-sm text-muted-foreground mt-1&rdquo;>Call or Text</span>
                </a>

                <div className=&rdquo;flex flex-col items-center p-6 bg-muted/50 rounded-xl&rdquo;>
                  <MapPin className=&rdquo;w-8 h-8 text-primary mb-3&rdquo; />
                  <span className=&rdquo;font-bold text-lg text-foreground&rdquo;>Chattanooga, TN</span>
                  <span className=&rdquo;text-sm text-muted-foreground mt-1&rdquo;>Local Headquarters</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </main>

      
      <nav aria-label=&rdquo;Scoopy Doo site navigation&rdquo; className=&rdquo;py-8 border-t border-border bg-muted/20&rdquo;>
        <div className=&rdquo;max-w-5xl mx-auto px-4 text-center&rdquo;>
          <p className=&rdquo;text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3&rdquo;>Explore Scoopy Doo</p>
          <ul className=&rdquo;flex flex-wrap justify-center gap-x-6 gap-y-2 list-none m-0 p-0&rdquo;>
            <li><Link to=&rdquo;/&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Home</Link></li>
            <li><Link to=&rdquo;/services&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Services</Link></li>
            <li><Link to=&rdquo;/pricing&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Pricing</Link></li>
            <li><Link to=&rdquo;/quote&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Get a Quote</Link></li>
            <li><Link to=&rdquo;/faq&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>FAQ</Link></li>
            <li><Link to=&rdquo;/reviews&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Reviews</Link></li>
            <li><Link to=&rdquo;/service-areas&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Service Areas</Link></li>
            <li><Link to=&rdquo;/blog&rdquo; className=&rdquo;text-primary hover:underline font-medium text-sm&rdquo;>Blog</Link></li>
          </ul>
        </div>
      </nav>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default PrivacyPolicyPage;
