import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { CANONICAL_BASE_URL } from '@/config/seoConfig.js';

const allPosts = [
  { slug: '/blog/does-rain-wash-away-dog-poop-chattanooga', title: 'Does Rain Wash Away Dog Poop? What Chattanooga and North Georgia Yards Need to Know', desc: 'Rain does not make dog poop go away. What really happens to pet waste in a wet Chattanooga yard, and why weekly scooping still matters.', date: 'Oct 2026', cat: 'Yard Tips' },
  { slug: '/blog/dog-poop-attract-rodents-pests-chattanooga', title: 'Does Dog Poop Attract Rats and Other Pests in Chattanooga and North Georgia?', desc: 'Yes, dog poop can attract rodents, flies, and other pests. What to watch for in Chattanooga and North Georgia yards and how regular scooping helps.', date: 'Oct 2026', cat: 'Health' },
  { slug: '/blog/fall-leaves-hide-dog-poop-chattanooga', title: 'Fall Leaves Hiding Dog Poop in Your Chattanooga Yard? Here Is What to Do', desc: 'Leaf season buries dog waste in Chattanooga yards. The risks, how to find it, and how to keep the yard clean until spring.', date: 'Sep 2026', cat: 'Yard Tips' },
  { slug: '/blog/best-dog-parks-chattanooga-tn', title: '7 Best Dog Parks in Chattanooga, TN (2026 Guide)', desc: 'The best dog parks in Chattanooga for 2026, with off-leash areas, addresses, hours, amenities, and tips for keeping your own yard just as clean.', date: 'Sep 2026', cat: 'Local Guide' },
  { slug: '/blog/winter-dog-poop-cleanup-chattanooga', title: 'Winter Dog Poop Cleanup in Chattanooga: Why You Still Need Scooping Service When It Is Cold', desc: 'Cold weather does not stop dog waste from piling up. Why Chattanooga yards still need pet waste removal in winter.', date: 'Sep 2026', cat: 'Yard Tips' },
  { slug: '/blog/hoa-pet-waste-removal-chattanooga', title: 'HOA Pet Waste Removal in Chattanooga: A Guide for Community Boards and Property Managers', desc: 'How HOA and community pet waste removal works in Chattanooga: what is included, how pricing is quoted, and how to set up service for common areas.', date: 'Sep 2026', cat: 'Commercial' },
  { slug: '/blog/one-time-dog-poop-cleanup-chattanooga', title: 'One-Time Dog Poop Cleanup in Chattanooga: What It Costs and How It Works', desc: 'What a one-time dog poop cleanup costs in Chattanooga, when to book one, and how it works. From $85 with no contract.', date: 'Sep 2026', cat: 'One-Time' },
  { slug: '/blog/pooper-scooper-cost-chattanooga', title: 'How Much Does Pooper Scooper Service Cost in Chattanooga? (2026 Pricing Guide)', desc: '2026 pricing for weekly, every-other-week, and one-time pet waste removal in Chattanooga. Weekly service starts at $20 per visit for one dog.', date: 'Sep 2026', cat: 'Pricing' },
  { slug: '/blog/dog-poop-removal-north-georgia', title: 'Dog Poop Removal in Ringgold, Fort Oglethorpe and North Georgia', desc: 'Coverage, pricing, and how service works in Ringgold, Rossville, Fort Oglethorpe, and Flintstone GA. Weekly from $20 per visit.', date: 'Sep 2026', cat: 'Service Areas' },
  { slug: '/blog/podcast-blog', title: 'Scoopy Doo LLC Founder on a Pet Waste Management Podcast', desc: "Brandon Carter talks pet waste management, lawn health, and building Chattanooga's pet waste removal company.", date: 'Sep 2026', cat: 'Local Guide' },
  { slug: '/blog/yard-cleanup-before-selling-home-chattanooga', title: 'Do You Need to Clean Up Dog Waste Before Selling Your Chattanooga Home?', desc: 'Why yard cleanup matters before listing photos and showings, plus a pre-listing checklist and pricing.', date: 'Aug 2026', cat: 'Homeowner Tips' },
  { slug: '/blog/new-puppy-pet-waste-removal-chattanooga', title: 'New Puppy Owner Guide: Setting Up a Pet Waste Cleanup Routine in Chattanooga', desc: 'How to set up a pet waste cleanup routine for a new puppy, why it matters for house training and health, and what professional service costs.', date: 'Aug 2026', cat: 'Tips' },
  { slug: '/blog/fall-yard-care-checklist-chattanooga', title: 'Fall Yard Care Checklist for Chattanooga Dog Owners', desc: 'A fall pet waste and yard care checklist for Chattanooga dog owners, and why leaf season makes cleanup harder.', date: 'Jul 2026', cat: 'Yard Tips' },
  { slug: '/blog/eco-friendly-dog-waste-disposal-chattanooga', title: 'Eco-Friendly Dog Waste Disposal in Chattanooga: What Actually Works', desc: 'Trash, flushing, composting, digesters, or leaving it on the lawn: an honest look at each option for a Chattanooga yard, and what Scoopy Doo does with the waste it collects.', date: 'Sep 2026', cat: 'Yard Tips' },
  { slug: '/blog/dog-waste-removal-rental-properties-chattanooga', title: 'Who Handles Dog Waste at a Rental Property in Chattanooga, TN?', desc: 'Landlord or tenant: who handles dog waste cleanup at a Chattanooga rental, what uncleaned yards cost owners, and how Scoopy Doo services rental portfolios, from $20 a visit.', date: 'Sep 2026', cat: 'Commercial' },
  { slug: '/blog/fall-flea-tick-season-chattanooga', title: 'Fall Flea and Tick Season in Chattanooga: Why Yard Cleanup Matters More Than Ever', desc: 'Chattanooga falls stay warm long after colder regions cool down, keeping fleas and ticks active into November. See why regular dog poop removal helps and what it costs, from $20 a visit.', date: 'Sep 2026', cat: 'Yard Tips' },
  { slug: '/blog/dog-friendly-trails-chattanooga', title: 'Best Dog-Friendly Hiking Trails in Chattanooga and North Georgia (Leash Rules Included)', desc: 'A local guide to the best dog-friendly trails in Chattanooga and North Georgia, plus leash rules and tips for keeping your yard clean after the hike.', date: 'Sep 2026', cat: 'Local Guide' },
  { slug: '/blog/multiple-dogs-yard-cleanup-chattanooga', title: 'Two or Three Dogs? How Multiple Dogs Change Yard Cleanup in Chattanooga', desc: 'How much waste multiple dogs really produce, how often to scoop with two or three dogs, and what multi-dog pet waste removal costs in Chattanooga and North Georgia.', date: 'Sep 2026', cat: 'Local Guide' },
  { slug: '/blog/no-contact-pet-waste-removal-chattanooga', title: 'Do You Need to Be Home for Dog Poop Removal in Chattanooga?', desc: "No, Scoopy Doo does not require you to be home. See exactly how our no-contact pooper scooper service works in Chattanooga and North Georgia, with gate photos and on-the-way texts.", date: 'Sep 2026', cat: 'Guides' },
  { slug: '/blog/moving-to-chattanooga-with-a-dog', title: "Moving to Chattanooga With a Dog: A New Resident's Yard and Pet Waste Guide", desc: 'New to Chattanooga with a dog? Get local tips on neighborhoods, yard care, and pet waste rules, plus how professional dog poop removal makes settling in easier.', date: 'Aug 2026', cat: 'Local Guide' },
  { slug: '/blog/what-pet-waste-removal-includes-chattanooga', title: 'What Does Pet Waste Removal Actually Include in Chattanooga, TN?', desc: 'Pet waste removal covers weekly yard scooping, double-bagging, and gate photo confirmation. What is included, what it costs, and who offers it in Chattanooga and North Georgia.', date: 'Aug 2026', cat: 'Local Guide' },
  { slug: '/blog/apaws-member-pet-waste-removal-chattanooga', title: 'What aPaws Membership Means When You Hire a Pooper Scooper in Chattanooga', desc: "aPaws is the national trade association for pet waste removal. What membership means, and why Scoopy Doo is the only member within 76 miles of Chattanooga.", date: 'Aug 2026', cat: 'Guides' },
  { slug: '/blog/how-to-get-rid-of-dog-poop-smell-in-yard-chattanooga', title: 'How to Get Rid of Dog Poop Smell in a Chattanooga Yard (What Actually Works)', desc: 'The smell comes from the soil, not the waste. What actually clears it, what does not work, and when a $20 deodorizing treatment is worth paying for.', date: 'Aug 2026', cat: 'Yard Tips' },
  { slug: '/blog/weekly-vs-biweekly-dog-poop-service-chattanooga', title: 'Weekly vs Every-Other-Week Dog Poop Service in Chattanooga: Which Do You Need?', desc: 'Weekly is $20 per visit and every-other-week is $33 per visit for one dog. Over a year that is only about $15 a month apart for twice the visits. How to choose.', date: 'Aug 2026', cat: 'Pricing' },
  { slug: '/blog/pet-waste-stations-apartments-hoas-chattanooga', title: 'Pet Waste Stations for Chattanooga Apartments and HOAs: Placement, Servicing, and Cost', desc: 'How many stations a community needs, where to put them, what scheduled servicing includes, and how commercial and HOA pricing is quoted.', date: 'Aug 2026', cat: 'Commercial' },
  { slug: '/blog/yard-cleanup-before-a-party-chattanooga', title: 'One-Time Yard Cleanup Before a Party in Chattanooga or North Georgia', desc: 'Hosting a cookout or graduation? One-time cleanups start at $85. How far ahead to book, what gets done, and how to handle yard smell in August humidity.', date: 'Aug 2026', cat: 'One-Time' },
  { slug: '/blog/dog-door-installation-chattanooga', title: 'Dog Door Installation in Chattanooga, TN: Cost, Sizing & What to Expect', desc: 'How much does dog door installation cost in Chattanooga? Good, Better, and Best options from $529 installed, professionally measured, sealed, and tested.', date: 'Aug 2026', cat: 'Doggy Doors' },
{ slug: '/blog/dog-poop-laws-chattanooga', title: 'Is It Illegal to Not Pick Up Dog Poop in Chattanooga?', desc: 'Chattanooga city code requires owners to pick up after their dogs. Here is what the law says, what fines look like, and how HOA rules go further.', date: 'Jul 2026', cat: 'Local Guide' },
    { slug: '/blog/dog-poop-cleanup-chattanooga-summer-heat', title: 'Why Chattanooga Yards Need Regular Dog Poop Cleanup During Hot, Humid Weather', desc: 'Summer heat and humidity make dog waste smell worse, grow bacteria faster, and attract flies. Here is why Chattanooga dog owners need to stay on top of yard cleanup in summer.', date: 'Jun 2026', cat: 'Yard Tips' },
  { slug: '/blog/how-often-scoop-dog-poop-chattanooga', title: 'How Often Should You Scoop Dog Poop in Chattanooga?', desc: 'Most vets and yard experts say at least once a week. Here\'s why - and how Scoopy Doo makes it effortless.', date: 'Jun 2026', cat: 'Yard Tips' },
  { slug: '/blog/is-dog-poop-hurting-your-chattanooga-yard', title: 'Is Dog Poop Hurting Your Chattanooga Yard?', desc: 'Dog poop doesn\'t just smell bad - it kills grass, spreads parasites, and pollutes local water.', date: 'Jun 2026', cat: 'Lawn Health' },
  { slug: '/blog/chattanooga-pet-waste-removal-homeowners', title: 'Why Chattanooga Homeowners Are Hiring Pet Waste Removal Services', desc: 'Discover why more Chattanooga families are turning to professional pet waste removal to protect their yards.', date: 'May 2026', cat: 'Homeowner Tips' },
  { slug: '/blog/commercial-pet-waste-removal-chattanooga', title: 'Pet Waste Removal for HOAs, Apartments & Commercial Properties', desc: 'Professional pet waste management solutions for multi-unit properties and commercial spaces in Chattanooga.', date: 'May 2026', cat: 'Commercial' },
  { slug: '/blog/is-dog-waste-bad-for-lawn', title: 'Is Dog Waste Bad for Your Lawn?', desc: 'The truth about dog waste and lawn health - and what you can do to protect your grass.', date: 'May 2026', cat: 'Lawn Health' },
  { slug: '/blog/best-pooper-scooper-services-chattanooga', title: 'Best Pooper Scooper Services in Chattanooga', desc: 'A guide to finding the right dog waste removal service for your Chattanooga home.', date: 'Apr 2026', cat: 'Local Guide' },
  { slug: '/blog/professional-waste-removal-benefits', title: 'The True Value of Professional Pet Waste Removal', desc: 'Why hiring a professional pooper scooper service is worth every penny for your yard, family, and peace of mind.', date: 'Apr 2026', cat: 'Services' },
  { slug: '/blog/health-risks-of-pet-waste', title: 'The Hidden Health Risks of Pet Waste in Your Yard', desc: 'Dog waste harbors dangerous pathogens - here\'s what you need to know to keep your family safe.', date: 'Mar 2026', cat: 'Health' },
  { slug: '/blog/lawn-health-and-pet-waste', title: 'Why Regular Pet Waste Removal is Essential for Your Lawn', desc: 'How dog waste damages your grass over time - and how consistent cleanup prevents permanent lawn damage.', date: 'Mar 2026', cat: 'Lawn Health' },
  { slug: '/blog/health-benefits-yard-cleanup', title: 'The Critical Health Benefits of Regular Yard Cleanup', desc: 'Bacteria from pet waste can persist in soil for years. Learn how regular scooping protects your whole family.', date: 'Feb 2026', cat: 'Health' },
  { slug: '/blog/diy-vs-professional', title: 'DIY vs. Professional Pet Waste Removal: Which is Right for You?', desc: 'Comparing the cost, convenience, and results of doing it yourself versus hiring Scoopy Doo.', date: 'Feb 2026', cat: 'Services' },
  { slug: '/blog/seasonal-pet-care-tips', title: 'Seasonal Pet Care Guide for Chattanooga Residents', desc: 'How to keep your yard clean and your pets healthy through every season in the Tennessee Valley.', date: 'Jan 2026', cat: 'Tips' },
  { slug: '/blog/pet-waste-management-guide', title: 'Pet Waste Management: A Guide for Busy Pet Owners', desc: 'A practical guide to managing pet waste - from daily habits to professional services.', date: 'Jan 2026', cat: 'Tips' },
  { slug: '/blog/spring-pet-care-checklist', title: 'Spring Pet Care Checklist for Chattanooga Dog Owners', desc: 'Get your yard spring-ready with this complete checklist for Chattanooga pet owners.', date: 'Dec 2025', cat: 'Tips' },
  { slug: '/blog/how-often-clean-yard', title: 'How Often Should You Clean Your Yard of Pet Waste?', desc: 'Expert guidance on cleanup frequency based on dog count, yard size, and Chattanooga\'s climate.', date: 'Nov 2025', cat: 'Yard Tips' },
  { slug: '/blog/signal-mountain', title: 'Pet Waste Removal in Signal Mountain, TN', desc: 'Scoopy Doo now serves Signal Mountain residents with reliable weekly and bi-weekly dog waste removal.', date: 'Nov 2025', cat: 'Service Areas' },
  { slug: '/blog/soddy-daisy', title: 'Pet Waste Removal in Soddy-Daisy, TN', desc: 'Professional dog poop removal service available throughout Soddy-Daisy and surrounding communities.', date: 'Oct 2025', cat: 'Service Areas' },
];

// The posts carry fine-grained categories; the filter row groups them into a few topics.
const TOPICS = [
  ['All', null],
  ['Yard & Health', ['Yard Tips', 'Lawn Health', 'Tips', 'Homeowner Tips', 'Guides', 'Health']],
  ['Local Guides', ['Local Guide', 'Service Areas']],
  ['Pricing & Services', ['Pricing', 'Services', 'One-Time', 'Doggy Doors']],
  ['Commercial & HOA', ['Commercial']],
];
const PAGE_SIZE = 12;

// Card photos are real Scoopy Doo job photos in public/images/blog/cards. Each category
// draws from a pool in turn so neighboring cards don't repeat; a post can set its own `img`.
const PHOTO_POOLS = {
  yard: ['scooping-along-fence', 'scooping-flower-border', 'scooping-under-trees', 'scooper-front-yard', 'scooping-by-hydrangeas', 'scooping-garden-arch', 'scooping-patio-fountain'],
  dogs: ['dogs-playing-in-yard', 'scooper-at-work-side-yard', 'family-with-dogs', 'scooper-by-iron-fence', 'dog-with-family'],
  local: ['chattanooga-mural-team', 'scooping-by-the-pond', 'scoopy-doo-team', 'scooping-large-lawn'],
  service: ['scooping-large-lawn', 'scooping-fenced-yard', 'two-scoopers-at-gate'],
  commercial: ['scoopy-doo-truck', 'two-scoopers-at-gate', 'scoopy-doo-team'],
};
const CAT_POOL = {
  'Yard Tips': 'yard', 'Lawn Health': 'yard', Health: 'dogs', Tips: 'dogs', 'Homeowner Tips': 'dogs',
  'Local Guide': 'local', 'Service Areas': 'local', Guides: 'local',
  Pricing: 'service', Services: 'service', 'One-Time': 'service', 'Doggy Doors': 'dogs', Commercial: 'commercial',
};
const OWN_PHOTOS = {
  '/blog/does-rain-wash-away-dog-poop-chattanooga': '/images/blog/does-rain-wash-away-dog-poop-chattanooga.webp',
  '/blog/dog-poop-attract-rodents-pests-chattanooga': '/images/blog/dog-poop-attract-rodents-pests-chattanooga.webp',
  '/blog/fall-leaves-hide-dog-poop-chattanooga': '/images/blog/fall-leaves-yard-scooping-chattanooga.webp',
};
const used = {};
allPosts.forEach((p) => {
  if (OWN_PHOTOS[p.slug]) { p.img = OWN_PHOTOS[p.slug]; return; }
  const key = CAT_POOL[p.cat] || 'yard';
  const pool = PHOTO_POOLS[key];
  const n = used[key] || 0;
  used[key] = n + 1;
  p.img = '/images/blog/cards/' + pool[n % pool.length] + '.webp';
});

const BlogListPage = () => {
  const [topic, setTopic] = useState('All');
  const [shown, setShown] = useState(PAGE_SIZE);
  const cats = (TOPICS.find(([name]) => name === topic) || [])[1];
  const posts = cats ? allPosts.filter((p) => cats.includes(p.cat)) : allPosts;
  const pickTopic = (name) => { setTopic(name); setShown(PAGE_SIZE); };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Pet Waste & Dog Care Blog | Scoopy Doo Chattanooga" description="Chattanooga pet care tips: yard health, dog waste removal, seasonal guides, and local resources for dog owners from the Scoopy Doo blog." canonicalUrl={`${CANONICAL_BASE_URL}/blog`} />
      <Header />
      <main className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6"><BookOpen className="w-7 h-7" /></div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Chattanooga Pet Care Tips and Dog Owner Resources
            </h1>
            <p className="text-lg text-muted-foreground">Tips on pet waste removal, yard health, and dog care for Chattanooga homeowners.</p>
          </div>
          <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter posts by topic">
            {TOPICS.map(([name]) => (
              <button
                key={name}
                type="button"
                aria-pressed={topic === name}
                onClick={() => pickTopic(name)}
                className={'rounded-full border px-4 py-2 text-sm font-semibold transition-colors ' + (topic === name ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:border-primary/50')}
              >
                {name}
              </button>
            ))}
          </div>
          {/* Posts past the first page stay in the HTML (hidden) so crawlers still see every link. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link key={post.slug} to={post.slug} className={(i >= shown ? 'hidden ' : '') + 'group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1'}>
                <img
                  src={post.img}
                  alt=""
                  width="640"
                  height="400"
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover bg-muted"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">{post.cat}</span>
                  <h2 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h2>
                  <p className="text-muted-foreground text-sm flex-grow leading-relaxed">{post.desc}</p>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="inline-flex items-center text-primary text-sm font-semibold gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {shown < posts.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setShown(shown + PAGE_SIZE)}
                className="rounded-xl border-2 border-primary px-6 py-3 font-semibold text-foreground hover:bg-primary/10 transition-colors"
              >
                {'Show more posts (' + (posts.length - shown) + ' more)'}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListPage;
