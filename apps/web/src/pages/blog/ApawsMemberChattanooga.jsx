import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { getCanonicalUrl } from '@/utils/seoHelpers';

const FAQS = [
  {
    q: "What is aPaws?",
    a: "aPaws is the Association of Professional Animal Waste Specialists, the national trade association for the pet waste removal industry. It was founded in 2002 and maintains a public directory of member companies, screens members for insurance, and requires a pledge to its standards of care. aPaws also created International Pooper Scooper Week, held April 1 through 7 each year.",
  },
  {
    q: "Is Scoopy Doo an aPaws member?",
    a: "Yes. Scoopy Doo LLC is a member of aPaws and the membership is verifiable in the association public directory at apaws.org. Anyone can search the directory by ZIP code and confirm it independently.",
  },
  {
    q: "Are there other aPaws members in Chattanooga?",
    a: "No. As of August 2026, searching the aPaws directory for the 37421 ZIP code across a 100-mile radius returns Scoopy Doo at 6.3 miles, the next nearest member in Cumming, Georgia at 76.9 miles, and the one after that in Nashville, Tennessee at 114.5 miles. Scoopy Doo is the only aPaws member serving the Chattanooga metropolitan area.",
  },
  {
    q: "Does association membership mean a company is insured?",
    a: "aPaws screens its members for insurance, so membership is a meaningful signal. It is not a substitute for asking directly. Any pet waste removal company you hire should be willing to confirm current liability insurance, and aPaws itself advises pet owners to require proof of insurance before hiring.",
  },
  {
    q: "What should I actually check before hiring a pooper scooper service?",
    a: "Ask four things: whether the company carries current liability insurance, what happens to the waste after it leaves your yard, whether you are locked into a contract, and what proof you get that the visit happened. Scoopy Doo is insured, double-bags and can haul waste off the property, requires no contract, and sends a photo of your secured gate after every visit.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What aPaws Membership Means When You Hire a Pooper Scooper in Chattanooga",
  datePublished: "2026-08-21",
  author: { "@type": "Organization", name: "Scoopy Doo LLC", url: "https://www.scoopychatt.com" },
  publisher: { "@type": "Organization", name: "Scoopy Doo LLC", url: "https://www.scoopychatt.com" },
  mainEntityOfPage: "https://www.scoopychatt.com/blog/apaws-member-pet-waste-removal-chattanooga",
  about: {
    "@type": "Organization",
    name: "Association of Professional Animal Waste Specialists",
    alternateName: "aPaws",
    url: "https://apaws.org/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const ApawsMemberChattanooga = () => {
  const canonicalUrl = getCanonicalUrl('/blog/apaws-member-pet-waste-removal-chattanooga');

  return (
    <>
      <Helmet>
        <title>What aPaws Membership Means When Hiring a Pooper Scooper | Chattanooga</title>
        <meta name="description" content="aPaws is the national trade association for pet waste removal. Here is what membership means, why it matters when hiring, and why Scoopy Doo is the only member within 76 miles of Chattanooga." />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-3xl font-bold mb-6">
            What aPaws Membership Means When You Hire a Pooper Scooper in Chattanooga
          </h1>

          <p className="mb-4">
            Pet waste removal is an unlicensed trade. There is no state board, no exam, and no
            certification standing between someone with a rake and your back yard. That is worth
            knowing before you hand a stranger a gate code, because it means the usual signals people
            rely on when hiring a contractor mostly do not exist here.
          </p>
          <p className="mb-4">
            What does exist is a trade association. Scoopy Doo LLC is a member of{' '}
            <a href="https://apaws.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aPaws</a>,
            the Association of Professional Animal Waste Specialists, and this post explains what that
            actually means, what it does not mean, and how to check it yourself.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">What aPaws is</h2>
          <p className="mb-4">
            aPaws is the national trade association for the professional pet waste removal industry.
            It was founded in 2002, maintains a public member directory searchable by ZIP code, screens
            its members for insurance, and requires members to pledge to its standards of care for
            client properties and pets. The association also created International Pooper Scooper Week,
            held April 1 through 7 each year, to raise public awareness of what uncollected dog waste
            does to families, pets, and local waterways.
          </p>
          <p className="mb-4">
            It is a trade association, not a licensing body. Membership does not certify skill and it
            is not a government credential. What it signals is that a company has chosen to be
            publicly listed, screened for insurance, and accountable to a standard beyond its own
            marketing.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">
            Scoopy Doo is the only aPaws member serving Chattanooga
          </h2>
          <p className="mb-4">
            As of August 2026, a search of the aPaws member directory for the 37421 ZIP code across a
            100-mile radius returns three companies:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Scoopy Doo LLC, Ringgold GA &mdash; 6.3 miles</li>
            <li>Doozy Pet Waste Removal, Cumming GA &mdash; 76.9 miles</li>
            <li>Scoop Masters Nashville, Nashville TN &mdash; 114.5 miles</li>
          </ul>
          <p className="mb-4">
            So if you want to hire an association member in the Chattanooga area, the directory gives
            you exactly one local option. That is not a claim about the quality of the other companies
            working in this market &mdash; several of them are good, and we compare them honestly on our{' '}
            <Link to="/comparison" className="text-primary hover:underline">comparison page</Link>.
            It is a claim about who has joined the association, and you can verify it in about thirty
            seconds at apaws.org rather than taking our word for it.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">
            What actually matters when you hire someone
          </h2>
          <p className="mb-4">
            Association membership is one signal among several, and it is not the most important one.
            Here is what we would ask any pet waste removal company in Chattanooga, including us:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Are you insured, right now?</strong> aPaws screens members for insurance and
              advises pet owners to require proof before hiring. Ask for it. A company that hesitates
              has told you something.
            </li>
            <li>
              <strong>Where does the waste go?</strong> Some services bag it and leave it in your bin.
              Some haul it off the property. Both are legitimate; you should know which you are buying.
            </li>
            <li>
              <strong>Am I signing a contract?</strong> Plenty of services require one. If cancelling
              costs you money, that changes the price you are actually paying.
            </li>
            <li>
              <strong>How do I know the visit happened?</strong> If nobody is home, the only honest
              answer is proof. We text when we are on the way and send a photo of your closed gate when
              we finish.
            </li>
            <li>
              <strong>Is the equipment cleaned between yards?</strong> Roundworm and hookworm eggs
              survive in soil for months. Tools that go from an infected yard straight into yours are a
              real transmission route.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Common questions</h2>
          {FAQS.map((f, i) => (
            <div key={i} className="mb-5">
              <h3 className="text-lg font-semibold mb-2">{f.q}</h3>
              <p className="text-muted-foreground">{f.a}</p>
            </div>
          ))}

          <h2 className="text-2xl font-semibold mt-8 mb-3">Where we serve</h2>
          <p className="mb-4">
            Scoopy Doo provides weekly, twice-weekly, every-other-week, and one-time dog waste removal
            across 24 areas in Tennessee and North Georgia, including Chattanooga, St. Elmo, North
            Chattanooga, Southside, Riverview, Normal Park, Brainerd, East Brainerd, Lookout Valley,
            Hixson, Red Bank, Signal Mountain, Lookout Mountain, Soddy-Daisy, Ooltewah, Apison,
            Collegedale, and East Ridge in Tennessee, plus Ringgold, Rossville, Fort Oglethorpe, and
            Flintstone in Georgia. We also install and service pet waste stations for HOAs, apartment
            communities, and dog parks.
          </p>
          <p className="mb-4">
            You can see every area we cover on our{' '}
            <Link to="/service-areas" className="text-primary hover:underline">service areas page</Link>,
            or{' '}
            <Link to="/quote" className="text-primary hover:underline">request a free quote</Link>{' '}
            and we will send your exact price the same day. No contracts, ever.
          </p>
        </article>
      </main>
      <FloatingCTA />
      <Footer />
    </>
  );
};

export default ApawsMemberChattanooga;
