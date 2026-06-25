
export const getCanonicalUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://www.scoopychatt.com${cleanPath === '/' ? '' : cleanPath}`;
};

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.scoopychatt.com/#business",
    "name": "Scoopy Doo LLC",
    "url": "https://www.scoopychatt.com",
    "telephone": "423-600-5040",
    "email": "info@scoopychatt.com",
    "image": "https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg",
    "priceRange": "$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100 Market Street",
      "addressLocality": "Chattanooga",
      "addressRegion": "TN",
      "postalCode": "37402",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.0456",
      "longitude": "-85.3097"
    },
    "areaServed": ["Chattanooga TN","Hixson TN","Red Bank TN","Signal Mountain TN","Ooltewah TN","East Brainerd TN","Soddy-Daisy TN","Cleveland TN","East Ridge TN","Lookout Mountain TN","Collegedale TN","Apison TN","Ringgold GA","Rossville GA","Flintstone GA","Fort Oglethorpe GA"],
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "86"
    },
    "sameAs": ["https://facebook.com/scoopychatt","https://instagram.com/scoopychatt"]
  };
};

export const generateArticleSchema = (headline, description, author, datePublished, image, url) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author || "Scoopy Doo Team"
    },
    "datePublished": datePublished,
    "image": image || "https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg",
    "url": url
  };
};
