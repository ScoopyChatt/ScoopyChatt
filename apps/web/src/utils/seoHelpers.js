
export const getCanonicalUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://scoopychatt.com${cleanPath === '/' ? '' : cleanPath}`;
};

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://scoopychatt.com/#business",
    "name": "Scoopy Doo LLC",
    "alternateName": "Scoopy Chatt",
    "url": "https://scoopychatt.com",
    "telephone": "+14236005040",
    "email": "info@scoopychatt.com",
    "priceRange": "$",
    "image": "https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/7f889d94bae15b826df9c1daf461a7b9.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chattanooga",
      "addressRegion": "TN",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Chattanooga", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Chattanooga,_Tennessee" },
      { "@type": "City", "name": "Ringgold", "addressRegion": "GA", "sameAs": "https://en.wikipedia.org/wiki/Ringgold,_Georgia" },
      { "@type": "City", "name": "Signal Mountain", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Signal_Mountain,_Tennessee" },
      { "@type": "City", "name": "Ooltewah", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Ooltewah,_Tennessee" },
      { "@type": "City", "name": "Soddy-Daisy", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Soddy-Daisy,_Tennessee" },
      { "@type": "City", "name": "East Ridge", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/East_Ridge,_Tennessee" },
      { "@type": "City", "name": "Rossville", "addressRegion": "GA", "sameAs": "https://en.wikipedia.org/wiki/Rossville,_Georgia" },
      { "@type": "City", "name": "Fort Oglethorpe", "addressRegion": "GA", "sameAs": "https://en.wikipedia.org/wiki/Fort_Oglethorpe,_Georgia" }
    ],
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61578292444117",
      "https://www.instagram.com/scoopychatt/",
      "https://www.yelp.com/biz/scoopy-doo-ringgold"
    ]
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
