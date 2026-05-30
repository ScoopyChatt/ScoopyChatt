
import React from 'react';
import SEOHead from '@/components/SEOHead.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CTAButton from '@/components/CTAButton.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import LocationSection from '@/components/LocationSection.jsx';

const NearMePage = () => {
  const localReviews = [
    { author: "Michael T.", location: "Signal Mountain", quote: "Fast, local, and incredibly dependable. The best scooping service near me." },
    { author: "Jessica R.", location: "Hixson", quote: "Love supporting a local business that does exactly what they promise." },
    { author: "David P.", location: "East Brainerd", quote: "They always lock the gate and leave the yard spotless. Highly recommended in the area." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead path="/near-me" />
      
      <Header />

      <main className="flex-grow">
        <section className="pt-24 pb-16 bg-card border-b border-border">
          <div className="container-shell text-center max-w-4xl mx-auto">
            <h1 className="mb-6 text-foreground">Pooper Scooper Service Near Me in Chattanooga, TN</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're your local, neighborhood pet waste removal experts. Proudly serving Chattanooga and surrounding areas so you never have to search for a scooper again.
            </p>
            <CTAButton>Check My Zip Code</CTAButton>
          </div>
        </section>

        <LocationSection />

        <section className="section-spacing bg-background">
          <div className="container-shell">
            <h2 className="text-center mb-12">Trusted by Neighbors Near You</h2>
            <div className="testimonial-masonry">
              {localReviews.map((review, i) => (
                <div key={i} className="break-inside-avoid">
                  <TestimonialCard {...review} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50 border-t border-border">
          <div className="container-shell text-center max-w-2xl">
            <h2 className="mb-6">Local Service, Professional Standards</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Being local means we understand the area, the weather, and our community. We respond quickly and provide a level of service national franchises can't match.
            </p>
            <CTAButton variant="default">Hire Your Local Scooper</CTAButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NearMePage;
