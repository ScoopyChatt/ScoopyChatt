
export const getCanonicalUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://scoopychatt.com${cleanPath === '/' ? '' : cleanPath}`;
};

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Scoopy Doo LLC",
    "url": "https://scoopychatt.com",
    "areaServed": "Chattanooga, TN and surrounding areas",
    "telephone": "423-600-5040",
    "image": "https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg",
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
