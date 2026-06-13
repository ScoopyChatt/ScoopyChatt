
import React from &rsquo;react&rsquo;;
import { CheckCircle2, Star, MapPin } from &rsquo;lucide-react&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;

const DogParkGuideLandingPage = () => {
  return (
    <div className=&rdquo;min-h-screen bg-background font-sans selection:bg-primary/20&rdquo;>
      <SEOHead path=&rdquo;/dog-park-guide&rdquo; />

      {/* Hero Section */}
      <section className=&rdquo;pt-16 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center&rdquo;>
        <div className=&rdquo;inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-6&rdquo;>
          <MapPin className=&rdquo;w-4 h-4&rdquo; />
          <span>Chattanooga, TN Local Guide</span>
        </div>
        <h1 className=&rdquo;text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance mb-6 max-w-4xl mx-auto leading-tight&rdquo;>
          Discover Chattanooga&rsquo;s Best Kept Secrets for Dog Owners!
        </h1>
        <p className=&rdquo;text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance&rdquo;>
          Stop guessing where to take your pup. Get our exclusive, fully-detailed guide to the best off-leash areas and hidden gems around the Scenic City&mdash;absolutely free.
        </p>
      </section>

      {/* Two-Column Feature Section */}
      <section className=&rdquo;py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto&rdquo;>
        <div className=&rdquo;grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center&rdquo;>
          {/* Image */}
          <div className=&rdquo;relative order-2 lg:order-1&rdquo;>
            <div className=&rdquo;absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl transform -rotate-3 scale-[1.02] -z-10&rdquo;></div>
            <img 
              src=&rdquo;https://images.unsplash.com/photo-1702573391190-85feea21409c&rdquo; 
              alt=&rdquo;Happy dog running in a sunny park in Chattanooga&rdquo; 
              className=&rdquo;rounded-3xl shadow-xl w-full object-cover aspect-[4/3]&rdquo;
            />
          </div>

          {/* Content */}
          <div className=&rdquo;order-1 lg:order-2&rdquo;>
            <h2 className=&rdquo;text-3xl font-bold text-foreground mb-8&rdquo;>
              Your Free Guide Includes:
            </h2>
            <ul className=&rdquo;space-y-6&rdquo;>
              {[
                &rdquo;A complete map of 6 premier off-leash parks&rdquo;,
                &rdquo;Insider tips on water access, shaded areas, and amenities&rdquo;,
                &rdquo;Hidden gem parks that most locals don&rsquo;t even know about&rdquo;,
                &rdquo;Perfect park day planning checklists and safety tips&rdquo;
              ].map((item, i) => (
                <li key={i} className=&rdquo;flex items-start gap-4&rdquo;>
                  <div className=&rdquo;flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1&rdquo;>
                    <CheckCircle2 className=&rdquo;w-5 h-5 text-primary&rdquo; />
                  </div>
                  <span className=&rdquo;text-lg text-foreground/90 leading-relaxed font-medium&rdquo;>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className=&rdquo;py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5 mt-12&rdquo;>
        <div className=&rdquo;max-w-3xl mx-auto&rdquo;>
          <div className=&rdquo;text-center mb-10&rdquo;>
            <h2 className=&rdquo;text-3xl md:text-4xl font-bold text-foreground mb-4&rdquo;>
              Get Your Free Guide Now!
            </h2>
            <p className=&rdquo;text-lg text-muted-foreground&rdquo;>
              Enter your details below and we&rsquo;ll send the guide straight to your inbox.
            </p>
          </div>
          
          <div className=&rdquo;bg-card rounded-3xl shadow-lg border border-border overflow-hidden p-2 md:p-6&rdquo;>
            <div className=&rdquo;relative w-full h-[800px] md:h-[700px] rounded-2xl overflow-hidden bg-background&rdquo;>
              <iframe 
                src=&rdquo;https://forms.gle/sa9We3nEZvaMc9h37&rdquo; 
                className=&rdquo;absolute inset-0 w-full h-full border-0&rdquo;
                title=&rdquo;Get Your Free Guide&rdquo;
                loading=&rdquo;lazy&rdquo;
              >
                Loading form...
              </iframe>
            </div>
            <div className=&rdquo;mt-4 text-center&rdquo;>
              <a 
                href=&rdquo;https://forms.gle/sa9We3nEZvaMc9h37&rdquo; 
                target=&rdquo;_blank&rdquo; 
                rel=&rdquo;noopener noreferrer&rdquo;
                className=&rdquo;inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors shadow-sm&rdquo;
              >
                Having trouble seeing the form? Click here
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className=&rdquo;py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center&rdquo;>
        <h2 className=&rdquo;text-2xl md:text-3xl font-bold text-foreground mb-8&rdquo;>
          Join Hundreds of Happy Chattanooga Pet Owners
        </h2>
        
        <div className=&rdquo;flex flex-col items-center justify-center gap-4&rdquo;>
          <div className=&rdquo;flex gap-1&rdquo;>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className=&rdquo;w-8 h-8 fill-accent text-accent&rdquo; />
            ))}
          </div>
          <div className=&rdquo;text-xl font-bold text-foreground&rdquo;>5.0 Average Rating</div>
          <p className=&rdquo;text-muted-foreground&rdquo;>Based on Google Reviews from local dog parents</p>
        </div>
      </section>


      {/* SEO Content Section */}
      <section className=&rdquo;py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto&rdquo;>
        <h2 className=&rdquo;text-3xl font-bold text-foreground mb-6&rdquo;>Chattanooga&rsquo;s Best Dog Parks & Off-Leash Areas</h2>
        <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>
          Chattanooga is one of the most dog-friendly cities in Tennessee. From the Tennessee River waterfront to the mountain trails above the city, the Scenic City has no shortage of places to let your dog run, explore, and socialize. Here&rsquo;s your local insider guide to the best spots.
        </p>

        <h3 className=&rdquo;text-2xl font-semibold text-foreground mb-4&rdquo;>Tennessee Riverpark Dog-Friendly Trail</h3>
        <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>
          Stretching over 10 miles along the Tennessee River, the Riverpark is Chattanooga&rsquo;s most popular outdoor recreation area. Dogs are welcome on leashes throughout the paved trail system. You&rsquo;ll find water fountains, restrooms, and plenty of shaded areas &mdash; perfect for longer walks on hot Tennessee summer days. The trail connects Chickamauga Dam all the way to downtown, passing through several neighborhood greenways along the way.
        </p>

        <h3 className=&rdquo;text-2xl font-semibold text-foreground mb-4&rdquo;>Warner Park & Stringer&rsquo;s Ridge</h3>
        <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>
          Located just minutes from downtown, Warner Park and Stringer&rsquo;s Ridge offer miles of wooded hiking trails where leashed dogs are welcome. The ridge trails provide stunning views of the city and the Tennessee River valley. These natural areas are ideal for dogs who love to sniff, explore, and get their paws dirty. After a muddy trail hike, a proper yard cleanup back home becomes especially important.
        </p>

        <h3 className=&rdquo;text-2xl font-semibold text-foreground mb-4&rdquo;>East Brainerd and Ooltewah Dog-Friendly Parks</h3>
        <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>
          The suburban neighborhoods of East Brainerd, Ooltewah, and Collegedale are home to several community parks and greenways where dogs are welcome on leash. The East Brainerd Greenway is a favorite among local dog owners, offering a flat, paved path through a quiet residential corridor. These neighborhoods are also among Scoopy Doo&rsquo;s most popular service areas for weekly pet waste removal.
        </p>

        <h3 className=&rdquo;text-2xl font-semibold text-foreground mb-4&rdquo;>Signal Mountain and Lookout Mountain Trails</h3>
        <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>
          For the adventurous dog owner, the mountain communities above Chattanooga offer world-class trail access. Signal Mountain has miles of forest paths connecting to the Cumberland Trail, while Lookout Mountain features trails through Point Park and Reflection Riding Arboretum. Dogs must be leashed in most of these areas, and always bring water &mdash; the mountain trails are more strenuous than flatland walks.
        </p>

        <h3 className=&rdquo;text-2xl font-semibold text-foreground mb-4&rdquo;>Keep Your Yard Clean Between Park Visits</h3>
        <p className=&rdquo;text-muted-foreground leading-relaxed mb-6&rdquo;>
          All those dog park adventures mean your yard gets a workout too. Pet waste left on your lawn creates bacteria, attracts pests, and can make your yard unsafe for children and other pets. Scoopy Doo provides weekly, bi-weekly, and one-time yard cleanup services throughout Chattanooga and surrounding communities &mdash; so your yard stays as clean as the parks you love to visit.
        </p>
        <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>
          Download our free Chattanooga Dog Park Guide above for a complete list of locations, hours, rules, and insider tips from local dog owners who&rsquo;ve explored every corner of the Scenic City with their four-legged companions.
        </p>
      </section>
    </div>
  );
};

export default DogParkGuideLandingPage;
