
export const CANONICAL_BASE_URL = 'https://www.scoopychatt.com';

export const seoConfig = {
  businessName: 'Scoopy Doo',
  legalName: 'Scoopy Doo LLC',
  phone: '423-600-5040',
  email: 'info@scoopychatt.com',
  address: {
    streetAddress: '100 Market Street',
    addressLocality: 'Chattanooga',
    addressRegion: 'TN',
    postalCode: '37402',
    addressCountry: 'US'
  },
  geo: {
    latitude: '35.0456',
    longitude: '-85.3097'
  },
  businessHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00'
    }
  ],
  socialProfiles: [
    'https://facebook.com/scoopychatt',
    'https://instagram.com/scoopychatt'
  ],
  defaultImage: 'https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg',
  defaultDescription: 'Professional pet waste removal and dog poop scooping services in Chattanooga, TN. Reliable, eco-friendly, and fully insured.',
  pages: {
    home: {
      title: 'Pet Waste Removal Chattanooga TN | Scoopy Doo',
      description: 'Professional pet waste removal and dog poop scooping services in Chattanooga, TN. Twice-weekly, weekly, bi-weekly, and one-time cleanups available. Get a free quote!',
      canonical: `${CANONICAL_BASE_URL}/`,
      ogType: 'website'
    },
    pricing: {
      title: 'Pricing | Pet Waste Removal Service Plans | Scoopy Doo',
      description: 'View affordable pricing for dog poop removal services in Chattanooga. Transparent rates for twice-weekly, weekly, bi-weekly, and one-time cleanups. No hidden fees.',
      canonical: `${CANONICAL_BASE_URL}/pricing`,
      ogType: 'website'
    },
    faq: {
      title: 'FAQ | Pet Waste Removal Answers | Scoopy Doo Chattanooga',
      description: 'Answers to frequently asked questions about our dog poop removal services, pricing, scheduling, and service areas in the Chattanooga metro area.',
      canonical: `${CANONICAL_BASE_URL}/faq`,
      ogType: 'website'
    },
    'chattanooga-location': {
      title: 'Dog Poop Removal Chattanooga TN | Professional Pet Waste Service',
      description: 'Top-rated dog poop removal in Chattanooga, TN. We keep your yard clean, safe, and pet-waste free. Reliable, eco-friendly pooper scooper service.',
      canonical: `${CANONICAL_BASE_URL}/dog-poop-removal-chattanooga`,
      ogType: 'website'
    },
    services: {
      title: 'Pet Waste Removal Services | Dog Poop Cleanup | Scoopy Doo',
      description: 'Explore our dog poop removal service plans. From weekly maintenance to one-time deep cleans, we keep your Chattanooga yard spotless.',
      canonical: `${CANONICAL_BASE_URL}/services`,
      ogType: 'website'
    },
    about: {
      title: 'About Us | Scoopy Doo Pet Waste Removal Chattanooga',
      description: 'Learn about Scoopy Doo LLC, Chattanooga\'s trusted local pet waste removal company. Dedicated to giving you back your yard and your time.',
      canonical: `${CANONICAL_BASE_URL}/about`,
      ogType: 'website'
    },
    reviews: {
      title: 'Customer Reviews | Scoopy Doo Pet Waste Removal',
      description: 'Read reviews from hundreds of satisfied dog owners in Chattanooga who trust Scoopy Doo for their weekly pet waste removal needs.',
      canonical: `${CANONICAL_BASE_URL}/reviews`,
      ogType: 'website'
    },
    'service-areas': {
      title: 'Service Areas | Dog Poop Removal Coverage | Scoopy Doo',
      description: 'We provide professional dog poop removal services across the Chattanooga metro area, including Hixson, Red Bank, Ooltewah, and North Georgia.',
      canonical: `${CANONICAL_BASE_URL}/service-areas`,
      ogType: 'website'
    },
    blog: {
      title: 'Pet Care & Yard Health Blog | Scoopy Doo Chattanooga',
      description: 'Read the latest tips on dog care, lawn maintenance, and the benefits of professional pet waste removal from the experts at Scoopy Doo.',
      canonical: `${CANONICAL_BASE_URL}/blog`,
      ogType: 'website'
    },
    'location-hixson': {
      title: 'Dog Poop Removal Hixson TN | Pet Waste Service | Scoopy Doo',
      description: 'Reliable dog poop scooping and pet waste removal services for homeowners in Hixson, TN. Affordable weekly plans and no long-term contracts.',
      canonical: `${CANONICAL_BASE_URL}/service/hixson`,
      ogType: 'website'
    },
    'location-red-bank': {
      title: 'Dog Poop Removal Red Bank TN | Scoopy Doo',
      description: 'Keep your Red Bank yard free of dog waste. Scoopy Doo provides expert pooper scooper services in Red Bank, TN. Get your free quote today.',
      canonical: `${CANONICAL_BASE_URL}/service/red-bank`,
      ogType: 'website'
    },
    'location-ooltewah': {
      title: 'Dog Poop Removal Ooltewah TN | Expert Pet Waste Cleanup',
      description: 'Professional pooper scooper services in Ooltewah, TN. We pick up where your dog left off, leaving you with a clean, safe lawn.',
      canonical: `${CANONICAL_BASE_URL}/service/ooltewah`,
      ogType: 'website'
    },
    'location-east-brainerd': {
      title: 'Dog Poop Removal East Brainerd TN | Scoopy Doo',
      description: 'Trusted dog waste removal services in East Brainerd, TN. Weekly yard cleanups to protect your family and pets from harmful bacteria.',
      canonical: `${CANONICAL_BASE_URL}/service/east-brainerd`,
      ogType: 'website'
    },
    'service-weekly': {
      title: 'Weekly Dog Poop Removal Service | Scoopy Doo Chattanooga',
      description: 'Our most popular service! Keep your yard consistently clean with our affordable weekly dog poop removal plans in Chattanooga.',
      canonical: `${CANONICAL_BASE_URL}/services#weekly`,
      ogType: 'website'
    },
    'service-one-time': {
      title: 'One-Time Yard Cleanup | Dog Poop Removal | Scoopy Doo',
      description: 'Need a deep clean before a party or spring reset? Our one-time pet waste removal service gets your yard back in top shape fast.',
      canonical: `${CANONICAL_BASE_URL}/one-time-cleanup`,
      ogType: 'website'
    }
  }
};
