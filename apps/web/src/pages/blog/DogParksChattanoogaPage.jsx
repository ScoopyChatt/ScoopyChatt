
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Clock, CheckCircle2, Star, ArrowRight, Dog } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import { Button } from '@/components/ui/button';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';

const pageTitle = "7 Best Dog Parks in Chattanooga, TN (2026 Guide)";
const pageDesc = "Discover the 7 best dog parks in Chattanooga, TN for 2026 — off-leash areas, addresses, hours, amenities, and tips for keeping your home yard just as clean.";
const canonicalPath = "/blog/best-dog-parks-chattanooga-tn";
const publishDate = "2026-06-07";
const authorName = "Scoopy Doo LLC";

const parks = [
  {
    id: "barks-and-tails",
    number: 1,
    name: "Barks and Tails Dog Park",
    location: "Northeast Chattanooga (Enterprise South Nature Park)",
    address: "190 Still Hollow Loop Road, Chattanooga, TN 37416",
    phone: "423-209-5350",
    hours: "7:00 AM to 8:30 PM daily",
    cost: "Free",
    tag: "Newest and Best-Equipped",
    tagColor: "bg-primary/10 text-primary",
    highlights: [
      "1.2 acres — one of the largest in the area",
      "Splash pad and sandbox (unique to this park)",
      "Agility equipment and shaded benches",
      "On-site dog wash station",
      "Pet waste stations with free bags",
      "Access to 40 miles of trails in Enterprise South Nature Park",
    ],
    description: "Opened in 2023, Barks and Tails is the newest and most feature-packed public dog park in Chattanooga. Tucked inside the sprawling Enterprise South Nature Park in northeast Chattanooga, it covers 1.2 acres with amenities you will not find anywhere else in town — including a splash pad and a sandbox. After your dog is done playing, the on-site wash station lets you clean up before heading home. If you live near Ooltewah or East Brainerd, this is your closest top-tier park.",
    serviceLink: "/service/ooltewah",
    serviceName: "Ooltewah",
  },
  {
    id: "heritage-park",
    number: 2,
    name: "Jack Benson Heritage Park Dog Park",
    location: "East Brainerd, Chattanooga",
    address: "1428 Jenkins Road, Chattanooga, TN 37421",
    phone: "423-643-7866",
    hours: "Dawn to dusk daily",
    cost: "Free",
    tag: "Best for Active Dogs",
    tagColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    highlights: [
      "Separate zones for large and small dogs",
      "Agility equipment and water access",
      "Double-gated entries for safety",
      "Natural grass surface",
      "22-acre park with walking track and shade",
      "Shaded benches for owners",
    ],
    description: "Heritage Park is one of the most well-maintained free dog parks in Chattanooga, located in East Brainerd. It features separate zones for large and small dogs, both with double-gated entrances so your pup cannot bolt while you enter. The surrounding 22-acre park is ideal for a post-play walk on the shaded track. If you live in East Brainerd or Apison, this is your neighborhood park.",
    serviceLink: "/service/east-brainerd",
    serviceName: "East Brainerd",
  },
  {
    id: "red-bank",
    number: 3,
    name: "Red Bank Dog Park at White Oak Park",
    location: "Red Bank, TN",
    address: "798 Ben Miller Parkway, Red Bank, TN 37415",
    phone: "423-877-1103",
    hours: "Dawn to dusk daily",
    cost: "Free",
    tag: "Best in North Chattanooga",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    highlights: [
      "Separate areas for small and large dogs",
      "Accessible walkway between zones",
      "Pet waste stations with complimentary bags",
      "Water stations in each play area",
      "Quiet, shaded gazebo for owners",
      "Connected to White Oak Park walking path",
    ],
    description: "Nestled inside White Oak Park in Red Bank, this quiet, shaded dog park is beloved by north Chattanooga locals. Both the large-dog and small-dog zones have complimentary waste bags and water stations. A paved accessible walkway between zones makes this one of the most ADA-friendly dog parks in the area. Hixson, Red Bank, and Signal Mountain residents will find this an easy stop.",
    serviceLink: "/service/red-bank",
    serviceName: "Red Bank",
  },
  {
    id: "greenway-farms",
    number: 4,
    name: "Greenway Farms Dog Park",
    location: "Hixson, TN",
    address: "Hixson, TN 37343",
    phone: "423-643-6311",
    hours: "7:00 AM to 9:00 PM daily",
    cost: "Free",
    tag: "Best Nature Setting",
    tagColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    highlights: [
      "3 acres of fenced off-leash space",
      "Natural wooded terrain — great for sniffers",
      "Separate zones for small and large dogs",
      "Double-gated entries",
      "Water stations (warm months)",
      "Set inside 180-acre Greenway Farm Park with creek trail",
    ],
    description: "Greenway Farms Dog Park sits inside the gorgeous 180-acre Greenway Farm Park in Hixson, along the North Chickamauga Creek Conservancy. At 3 acres, it is one of the larger parks in the area, and its natural wooded terrain makes it a hit with dogs who love to sniff and explore. The park has fewer built-in amenities than Barks and Tails, but the nature setting more than makes up for it. Perfect for Hixson and Soddy-Daisy dog owners.",
    serviceLink: "/service/hixson",
    serviceName: "Hixson",
  },
  {
    id: "chew-chew",
    number: 5,
    name: "Chattanooga Chew Chew Canine Park",
    location: "Downtown Chattanooga",
    address: "1801 Carter Street, Chattanooga, TN 37408",
    phone: "423-757-2076",
    hours: "7:00 AM to 8:00 PM daily",
    cost: "Free (paid parking nearby)",
    tag: "Best Downtown Option",
    tagColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    highlights: [
      "Located in the heart of downtown",
      "Fire hydrants, tunnels, and climbing structures",
      "Agility equipment and tire hoops",
      "Separate zones for large and small dogs",
      "Summer water fountains",
      "Walking distance to Chattanooga Market",
    ],
    description: "Chattanooga Chew Chew Canine Park is the only dog park right in the middle of downtown Chattanooga, sitting adjacent to Chattanooga Market and the Skate Park. It punches above its weight with fire hydrants, tunnels, agility structures, and tire hoops — all free to use. It is the go-to spot for Southside and downtown residents and visitors who want to wear their dog out before dinner on the waterfront.",
    serviceLink: "/service/chattanooga",
    serviceName: "Chattanooga",
  },
  {
    id: "play-wash-pint",
    number: 6,
    name: "Play Wash Pint",
    location: "Southside Chattanooga",
    address: "113 Johnson Street, Chattanooga, TN 37408",
    phone: "423-643-2275",
    hours: "12:00 PM to 9:00 PM daily (members: 10 AM Sat/Sun)",
    cost: "Day pass or membership required",
    tag: "Best Premium Experience",
    tagColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    highlights: [
      "12,000 sq ft of turf play areas (large + small dog zones)",
      "Indoor and outdoor bar with 60 rotating beers",
      "Professional self-wash station with supplies provided",
      "Breed-specific playgroups and events",
      "Ranger staff on duty at all times",
      "Pools, misters, and heaters by season",
    ],
    description: "Play Wash Pint is in a category of its own. This members-only dog park and bar on the Southside combines 12,000 square feet of turf play space with an indoor/outdoor bar, a professional self-wash station, and a full-time ranger staff. Dogs must be vaccinated, spayed/neutered if over one year, and at least 4 months old. If you want a premium, fully staffed experience — and you enjoy a cold beer while your dog runs — this is the place.",
    serviceLink: "/service/chattanooga",
    serviceName: "Chattanooga",
  },
  {
    id: "bark-city",
    number: 7,
    name: "Bark City Dog Park",
    location: "Fort Oglethorpe, GA",
    address: "Fort Oglethorpe, GA 30742",
    phone: null,
    hours: "Dawn to dusk daily",
    cost: "Free",
    tag: "Best in North Georgia",
    tagColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    highlights: [
      "Free and fully fenced",
      "Separate zones for big and small dogs",
      "Small agility course",
      "Water access and shaded benches",
      "Open and friendly community vibe",
      "Easy drive from Ringgold and Rossville",
    ],
    description: "Just across the Georgia line in Fort Oglethorpe, Bark City Dog Park is a free, spacious, community-run park that is well worth the short drive from Ringgold or Rossville. It has separate big and small dog zones, a basic agility course, water access, and shaded seating. The vibe is relaxed and welcoming — great for dogs who need space without the stimulation of a busier park.",
    serviceLink: "/service/ringgold",
    serviceName: "Ringgold and Fort Oglethorpe",
  },
];

const faqs = [
  {
    question: "Are all dog parks in Chattanooga free?",
    answer: "Most are free, including Barks and Tails, Heritage Park, Red Bank, Greenway Farms, and Chattanooga Chew Chew Canine Park. Play Wash Pint is the exception — it requires a day pass or membership, but offers a premium experience with ranger staff, a self-wash station, and an on-site bar.",
  },
  {
    question: "Which Chattanooga dog park is best for small dogs?",
    answer: "All seven parks on this list have separate zones for small dogs. Greenway Farms in Hixson is especially popular for smaller dogs because of its quiet, natural setting. Red Bank Dog Park is also great for small dogs, with a peaceful atmosphere and complimentary waste bags.",
  },
  {
    question: "Which dog park in Chattanooga has the most amenities?",
    answer: "Barks and Tails Dog Park in northeast Chattanooga is the most feature-rich free park, with a splash pad, sandbox, agility equipment, dog wash station, and access to 40 miles of trails. Play Wash Pint wins overall for premium amenities if you are open to a membership.",
  },
  {
    question: "Are Chattanooga dog parks open year-round?",
    answer: "Yes, all of the parks listed are open year-round. Note that water stations at some parks (like Greenway Farms) are only available during warm months. Barks and Tails opens at 7 AM daily; most parks operate dawn to dusk.",
  },
  {
    question: "My dog just visited a dog park — how do I keep my yard clean too?",
    answer: "After regular park visits, dogs tend to do more of their business at home too. Scoopy Doo handles weekly, bi-weekly, and one-time yard cleanups throughout the Chattanooga area and North Georgia — so you never have to worry about it. Get a free quote at scoopychatt.com.",
  },
];

const DogParksChattanoogaPage = () => {
  const canonicalUrl = getCanonicalUrl(canonicalPath);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": pageDesc,
    "datePublished": publishDate,
    "dateModified": publishDate,
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://www.scoopychatt.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Scoopy Doo LLC",
      "url": "https://www.scoopychatt.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.scoopychatt.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.scoopychatt.com/blog" },
      { "@type": "ListItem", "position": 3, "name": pageTitle, "item": canonicalUrl }
    ]
  };

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
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-grow">

        {/* Hero */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl opacity-50" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-3xl opacity-50" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-6">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-slate-300">Dog Parks Chattanooga</span>
              </nav>
              <div className="inline-flex items-center space-x-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/30">
                <MapPin className="w-4 h-4" />
                <span>Chattanooga, TN Guide</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 text-balance leading-tight">
                7 Best Dog Parks in Chattanooga, TN
                <span className="block text-primary mt-1">(2026 Guide)</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed max-w-3xl">
                Chattanooga is one of the most dog-friendly cities in the Southeast. From a splash pad and sandbox in northeast Chattanooga to a dog park bar on the Southside, here are the seven best places to let your pup run free in 2026 — with verified hours, addresses, and what makes each one worth the trip.
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span>By Scoopy Doo LLC</span>
                <span>|</span>
                <span>Updated June 2026</span>
                <span>|</span>
                <span>7 min read</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Nav */}
        <section className="py-8 bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Jump to a Park</p>
            <div className="flex flex-wrap gap-2">
              {parks.map(park => (
                <a
                  key={park.id}
                  href={`#${park.id}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-background border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  {park.number}. {park.name.split(" ")[0]} {park.name.split(" ")[1]}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              With thousands of dog owners living across Hamilton County, the demand for quality off-leash spaces has never been higher. The good news: Chattanooga has invested heavily in dog-friendly infrastructure over the past few years, and the options are genuinely excellent.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you are in Hixson, downtown, East Brainerd, or just across the Georgia line in Ringgold, there is a great dog park within easy driving distance. Here is everything you need to know — verified hours, real addresses, what to expect, and which neighborhoods each park serves best.
            </p>
          </motion.div>
        </section>

        {/* Parks */}
        <section className="pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {parks.map((park, index) => (
            <motion.article
              key={park.id}
              id={park.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Card Header */}
              <div className="bg-slate-950 px-8 py-6 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-black text-primary/30 leading-none">{park.number}</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${park.tagColor}`}>
                      {park.tag}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">{park.name}</h2>
                  <p className="text-slate-400 mt-1 flex items-center gap-1.5 text-sm">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    {park.location}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <p className="text-muted-foreground leading-relaxed mb-8">{park.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Highlights */}
                  <div>
                    <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Highlights</h3>
                    <ul className="space-y-2">
                      {park.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Visitor Info</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{park.address}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{park.hours}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Admission: {park.cost}</span>
                        </div>
                        {park.phone && (
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <a href={`tel:${park.phone}`} className="hover:text-primary transition-colors">{park.phone}</a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Scoopy Doo serves {park.serviceName}.</span>{" "}
                        Live nearby? We handle weekly yard cleanup so your yard stays as clean as the park.
                      </p>
                      <Link to={park.serviceLink} className="inline-flex items-center gap-1 text-sm text-primary font-semibold mt-2 hover:underline">
                        Learn about service in {park.serviceName} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        {/* Tip Section */}
        <section className="py-16 bg-muted/30 border-y border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Dog Park Etiquette: A Quick Refresher
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Pick up immediately — don't rely on the park's waste stations being stocked",
                  "Keep vaccinations current and bring proof if required (Play Wash Pint enforces this)",
                  "Remove retractable leashes before entering the off-leash area",
                  "Watch your dog at all times — no phone scrolling while your dog plays",
                  "If your dog is sick or in heat, skip the visit and come back next week",
                  "Spayed or neutered dogs over 1 year old are required at Play Wash Pint",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 bg-background rounded-xl p-4 border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-bold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-2xl mb-6">
                <Dog className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Keep Your Home Yard as Clean as the Park
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Dog parks are great for your pup, but regular visits mean more cleanup at home too.
                Scoopy Doo handles weekly, bi-weekly, and one-time yard cleanups across Chattanooga,
                Hixson, Red Bank, East Brainerd, Ringgold, and surrounding areas. We scoop, bag, and
                dispose — so your yard is always ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-xl shadow-lg">
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-slate-700 text-white hover:bg-slate-800 h-14 px-8 text-lg rounded-xl">
                  <Link to="/service-areas">View All Service Areas</Link>
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-6">
                Serving Chattanooga, Hixson, Red Bank, East Brainerd, Ooltewah, Ringgold, Rossville, and more.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default DogParksChattanoogaPage;
