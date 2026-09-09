import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, ArrowRight, CheckCircle2, Dog } from "lucide-react";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import FloatingCTA from "@/components/FloatingCTA.jsx";
import { getCanonicalUrl } from "@/utils/seoHelpers.js";

const pageTitle = "Best Dog-Friendly Trails in Chattanooga and North Georgia | Scoopy Doo";
const pageDesc = "A local guide to the best dog-friendly trails in Chattanooga and North Georgia, plus leash rules and tips for keeping your yard clean after the hike.";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best Dog-Friendly Hiking Trails in Chattanooga and North Georgia (Leash Rules Included)",
  "description": pageDesc,
  "author": { "@type": "Organization", "name": "Scoopy Doo LLC" },
  "publisher": { "@type": "Organization", "name": "Scoopy Doo LLC" },
  "datePublished": "2026-09-09"
};

export default function DogFriendlyTrailsChattanoogaPage() {
  const canonicalUrl = getCanonicalUrl("/blog/dog-friendly-trails-chattanooga");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-grow">
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
              <MapPin className="w-4 h-4" />
              Chattanooga & North Georgia
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Best Dog-Friendly Hiking Trails in Chattanooga and North Georgia (Leash Rules Included)
            </h1>
            <p className="text-lg text-muted-foreground">
              Chattanooga was built for dogs. Between the Tennessee Riverwalk, the ridges above
              downtown, and a quick drive into North Georgia, there's no shortage of places to
              burn off a Labrador's energy on a Saturday morning. Before you clip on the leash,
              it helps to know which trails welcome dogs, which ones require a leash (almost all
              of them), and where the one true off-leash spot in town actually is.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-3xl prose prose-lg">

            <h2 className="text-2xl font-bold mt-10 mb-4">Tennessee Riverwalk</h2>
            <p className="text-muted-foreground mb-6">
              The Riverwalk is the easiest yes on this list. It's a 16-mile paved path that runs
              along the Tennessee River, with access points stretching between Chickamauga Dam and
              the Tennessee Riverpark Wheland Foundry Trailhead in St. Elmo. It's flat, stroller
              and wheelchair friendly, and lined with benches and water fountains. Dogs are welcome
              on leash the entire way.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Stringers Ridge Park</h2>
            <p className="text-muted-foreground mb-6">
              This 92-acre park in North Chattanooga has a network of dirt and gravel trails with
              skyline views of downtown. It's popular with mountain bikers as well as hikers, so
              keep your dog leashed and close, especially on the narrower switchbacks near the top.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Renaissance Park</h2>
            <p className="text-muted-foreground mb-6">
              A pet-friendly 23-acre park on the North Shore, right along the river. Boardwalks,
              a pond, and easy walking loops make it a good option for older dogs or a shorter
              midday walk. Leashes are required.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Guild/Hardy Trail, Lookout Mountain</h2>
            <p className="text-muted-foreground mb-6">
              An old railroad bed dating back to the 1880s, with a wide path and a gentle grade
              that's easier on joints than most mountain trails. You can pick it up from Ochs
              Highway, Ruby Falls, or Cravens House. Shaded, scenic, and leash required.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Enterprise South Nature Park</h2>
            <p className="text-muted-foreground mb-6">
              Miles of multi-use trails through second-growth forest near the Volkswagen plant.
              It's popular with trail runners and mountain bikers, so leashed dogs are the rule
              here too, but there's plenty of room to spread out on a weekday morning.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Cloudland Canyon State Park, North Georgia</h2>
            <p className="text-muted-foreground mb-6">
              About 45 minutes south near Rising Fawn and Trenton, Georgia, Cloudland Canyon is
              worth the drive for the waterfall overlooks and canyon rim views alone. Dogs are
              welcome on leash on most trails; it's worth checking current pet rules before you
              go since a few backcountry or overlook areas can restrict pets seasonally.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Heritage Park Dog Park</h2>
            <p className="text-muted-foreground mb-6">
              If your dog needs to actually run, this is the spot. Heritage Park has separate
              fenced areas for large and small dogs, plus benches, shade, water stations, and
              agility equipment. It's one of the only places in Chattanooga where the leash
              legitimately comes off.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Chattanooga's Leash Law, Plain and Simple</h2>
            <p className="text-muted-foreground mb-6">
              Hamilton County requires dogs to be leashed in public spaces unless you're in a
              designated off-leash area, like Heritage Park's dog park. It doesn't matter how
              well-trained your dog is off leash at home. A leash keeps other hikers, kids,
              wildlife, and your own dog safer, and it's just good trail etiquette.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Leave No Trace: Pack It In, Pack It Out</h2>
            <p className="text-muted-foreground mb-6">
              Carry bags on every hike, even the short ones, and pack the waste out with you.
              Dog waste doesn't break down the way wildlife droppings do, and left on the trail
              it can wash into the creeks and streams that feed the Tennessee River. If you see
              an extra bag or two in your pocket, it's not a bad idea to grab it for a fellow
              hiker who forgot theirs.
            </p>

            <div className="bg-muted rounded-2xl p-8 mt-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Dog className="w-6 h-6 text-primary" />
                Coming Home to a Poop-Free Yard
              </h2>
              <p className="text-muted-foreground mb-4">
                After a muddy Saturday on the trail, the last thing you want to do is scoop the
                yard too. Scoopy Doo services Chattanooga and North Georgia neighborhoods from
                Hixson and Red Bank to East Brainerd, Ooltewah, Signal Mountain, and Ringgold.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Weekly service from $20/visit for one dog, twice-weekly from $18/visit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Bi-weekly service from $33/visit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>One-time cleanups from $85</span>
                </li>
                 <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>No contracts, a gate photo, and a text when we are on the way</span>
                </li>
              </ul>
              <Link
                to="/quoterequest"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Or call or text us at 423-600-5040. We scoop. You relax.
              </p>
            </div>

          </div>
        </section>
      </main>

      <FloatingCTA />
      <Footer />
    </div>
  );
}
